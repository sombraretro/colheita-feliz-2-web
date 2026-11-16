import sharp from 'sharp';
import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const jobs = [
  { source: 'web/assets', output: 'web/assets' },
  { source: 'Cenario/PNG', output: 'web/Cenario/PNG' }
];
const report = {
  format: 'WebP',
  settings: { quality: 90, alphaQuality: 100, effort: 6 },
  files: []
};

for (const job of jobs) {
  const sourceDir = path.join(root, job.source);
  const outputDir = path.join(root, job.output);
  await mkdir(outputDir, { recursive: true });
  const names = (await readdir(sourceDir)).filter(name => /\.png$/i.test(name)).sort();

  for (const name of names) {
    const input = path.join(sourceDir, name);
    const output = path.join(outputDir, name.replace(/\.png$/i, '.webp'));
    const before = await stat(input);
    const inputMeta = await sharp(input).metadata();

    await sharp(input)
      .webp({ quality: 90, alphaQuality: 100, effort: 6, smartSubsample: true })
      .toFile(output);

    const outputMeta = await sharp(output).metadata();
    const after = await stat(output);
    if (inputMeta.width !== outputMeta.width || inputMeta.height !== outputMeta.height) {
      throw new Error(`Dimensões divergentes após conversão: ${job.source}/${name}`);
    }
    const inputStats = inputMeta.hasAlpha ? await sharp(input).stats() : null;
    const sourceHasTransparency = !!inputStats && inputStats.channels.at(-1).min < 255;
    if (sourceHasTransparency && !outputMeta.hasAlpha) {
      throw new Error(`Transparência real não preservada: ${job.source}/${name}`);
    }

    report.files.push({
      source: `${job.source}/${name}`,
      output: `${job.output}/${name.replace(/\.png$/i, '.webp')}`,
      width: inputMeta.width,
      height: inputMeta.height,
      alpha: !!inputMeta.hasAlpha,
      sourceBytes: before.size,
      webpBytes: after.size,
      savedBytes: before.size - after.size,
      savedPercent: Number(((before.size - after.size) / before.size * 100).toFixed(2))
    });
  }
}


const remoteAssets = [
  { url: 'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/animals/cavalo/cavalo.png', output: 'web/assets/legacy-cavalo.webp', publicPath: '/assets/legacy-cavalo.webp' },
  { url: 'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/animals/cachorro-robo/cachorro-robo.png', output: 'web/assets/legacy-cachorro-robo.webp', publicPath: '/assets/legacy-cachorro-robo.webp' },
  { url: 'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/animals/pavao/pavao-aberto.png', output: 'web/assets/legacy-pavao.webp', publicPath: '/assets/legacy-pavao.webp' },
  { url: 'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/animals/cabra/cabra.png', output: 'web/assets/legacy-cabra.webp', publicPath: '/assets/legacy-cabra.webp' },
  { url: 'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/icons/moeda-comum.png', output: 'web/assets/legacy-moeda-comum.webp', publicPath: '/assets/legacy-moeda-comum.webp' },
  { url: 'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/icons/moeda-verde.png', output: 'web/assets/legacy-moeda-verde.webp', publicPath: '/assets/legacy-moeda-verde.webp' },
  { url: 'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/background/background.png', output: 'web/assets/legacy-background.webp', publicPath: '/assets/legacy-background.webp' },
  { url: 'https://raw.githubusercontent.com/dabb3/colheita-feliz-public/299dd2d05754a97bccbc0e7b0a86db3c5c8d4396/assets/classic/background/background-night.png', output: 'web/assets/legacy-background-night.webp', publicPath: '/assets/legacy-background-night.webp' },
  { url: 'https://raw.githubusercontent.com/sombraretro/colheita-feliz-2-web/main/Forest/Floresta.jpg', output: 'web/Forest/Floresta.webp', publicPath: '/Forest/Floresta.webp' },
  { url: 'https://raw.githubusercontent.com/sombraretro/colheita-feliz-2-web/3ce64423590ea3ea6b630b9cf96d351a21ddb75a/Cenario/Area%20da%20Fazenda.jpg', output: 'web/Cenario/Area-da-Fazenda.webp', publicPath: '/Cenario/Area-da-Fazenda.webp' },
  { url: 'https://raw.githubusercontent.com/sombraretro/colheita-feliz-2-web/main/Cenario/Area%20do%20Rio.jpg', output: 'web/Cenario/Area-do-Rio.webp', publicPath: '/Cenario/Area-do-Rio.webp' },
  { url: 'https://raw.githubusercontent.com/sombraretro/colheita-feliz-2-web/main/Cenario/Area%20do%20Pomar%20e%20Mata.jpg', output: 'web/Cenario/Area-do-Pomar-e-Mata.webp', publicPath: '/Cenario/Area-do-Pomar-e-Mata.webp' },
  { url: 'https://raw.githubusercontent.com/sombraretro/colheita-feliz-2-web/main/Cenario/PNG/RedePesca.png', output: 'web/Cenario/PNG/RedePesca.webp', publicPath: '/Cenario/PNG/RedePesca.webp' }
];

for (const asset of remoteAssets) {
  const response = await fetch(asset.url);
  if (!response.ok) throw new Error(`Falha ao baixar imagem remota: ${asset.url} (${response.status})`);
  const inputBuffer = Buffer.from(await response.arrayBuffer());
  const inputMeta = await sharp(inputBuffer).metadata();
  const output = path.join(root, asset.output);
  await mkdir(path.dirname(output), { recursive: true });
  await sharp(inputBuffer)
    .webp({ quality: 90, alphaQuality: 100, effort: 6, smartSubsample: true })
    .toFile(output);
  const outputMeta = await sharp(output).metadata();
  const inputStats = inputMeta.hasAlpha ? await sharp(inputBuffer).stats() : null;
  const sourceHasTransparency = !!inputStats && inputStats.channels.at(-1).min < 255;
  if (inputMeta.width !== outputMeta.width || inputMeta.height !== outputMeta.height) {
    throw new Error(`Dimensões divergentes após conversão: ${asset.url}`);
  }
  if (sourceHasTransparency && !outputMeta.hasAlpha) {
    throw new Error(`Transparência real não preservada: ${asset.url}`);
  }
  const after = await stat(output);
  report.files.push({
    source: asset.url,
    output: asset.output,
    width: inputMeta.width,
    height: inputMeta.height,
    alpha: sourceHasTransparency,
    sourceBytes: inputBuffer.length,
    webpBytes: after.size,
    savedBytes: inputBuffer.length - after.size,
    savedPercent: Number(((inputBuffer.length - after.size) / inputBuffer.length * 100).toFixed(2))
  });
}

const totalBefore = report.files.reduce((sum, file) => sum + file.sourceBytes, 0);
const totalAfter = report.files.reduce((sum, file) => sum + file.webpBytes, 0);
report.summary = {
  converted: report.files.length,
  sourceBytes: totalBefore,
  webpBytes: totalAfter,
  savedBytes: totalBefore - totalAfter,
  savedPercent: Number(((totalBefore - totalAfter) / totalBefore * 100).toFixed(2))
};

// Switch only assets that are part of this repository and are generated above.
const appPath = path.join(root, 'web/app.js');
let app = await readFile(appPath, 'utf8');
app = app.replace('href="/assets/${name}.png"', 'href="/assets/${name}.webp"');
for (const name of ['grama-textura', 'arvore', 'casa']) {
  app = app.replaceAll(`/assets/${name}.png`, `/assets/${name}.webp`);
}
for (const file of report.files.filter(file => file.source.startsWith('Cenario/PNG/'))) {
  const name = path.basename(file.source);
  const remote = `https://raw.githubusercontent.com/sombraretro/colheita-feliz-2-web/main/Cenario/PNG/${name}`;
  app = app.replaceAll(remote, `/Cenario/PNG/${name.replace(/\.png$/i, '.webp')}`);
}
for (const asset of remoteAssets) app = app.replaceAll(asset.url, asset.publicPath);
await writeFile(appPath, app);

const htmlPath = path.join(root, 'web/index.html');
let html = await readFile(htmlPath, 'utf8');
const huntPack = 'https://raw.githubusercontent.com/sombraretro/colheita-feliz-2-web/main/Cenario/PNG/MochilaCaca.png';
html = html.replaceAll(huntPack, '/Cenario/PNG/MochilaCaca.webp');
for (const asset of remoteAssets) html = html.replaceAll(asset.url, asset.publicPath);
html = html.replaceAll('20261116-optimization-v16', '20261116-images-v20');
html = html.replaceAll('20261116-images-v17', '20261116-images-v20');
await writeFile(htmlPath, html);

const swPath = path.join(root, 'web/sw.js');
let sw = await readFile(swPath, 'utf8');
sw = sw.replaceAll('20261116-optimization-v16', '20261116-images-v20');
sw = sw.replaceAll('20261116-images-v17', '20261116-images-v20');
sw = sw.replaceAll('cf2-shell-20261116-images-v17', 'cf2-shell-20261116-images-v20');
sw = sw.replaceAll('cf2-shell-20261116-optimization-v16', 'cf2-shell-20261116-images-v20');
await writeFile(swPath, sw);

await writeFile(
  path.join(root, 'web/asset-optimization-report.json'),
  JSON.stringify({ ...report, summary: { ...report.summary, sourceBytesMB: Number((totalBefore / 1048576).toFixed(2)), webpBytesMB: Number((totalAfter / 1048576).toFixed(2)) } }, null, 2) + '\n'
);

console.log(JSON.stringify(report.summary, null, 2));
for (const file of report.files) {
  console.log(`${file.savedPercent}%  ${file.source} -> ${file.output}`);
}
