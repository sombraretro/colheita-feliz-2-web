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
await writeFile(appPath, app);

const htmlPath = path.join(root, 'web/index.html');
let html = await readFile(htmlPath, 'utf8');
const huntPack = 'https://raw.githubusercontent.com/sombraretro/colheita-feliz-2-web/main/Cenario/PNG/MochilaCaca.png';
html = html.replaceAll(huntPack, '/Cenario/PNG/MochilaCaca.webp');
html = html.replaceAll('20261116-optimization-v16', '20261116-images-v17');
await writeFile(htmlPath, html);

const swPath = path.join(root, 'web/sw.js');
let sw = await readFile(swPath, 'utf8');
sw = sw.replaceAll('20261116-optimization-v16', '20261116-images-v17');
sw = sw.replaceAll('cf2-shell-20261116-optimization-v16', 'cf2-shell-20261116-images-v17');
await writeFile(swPath, sw);

await writeFile(
  path.join(root, 'web/asset-optimization-report.json'),
  JSON.stringify({ ...report, summary: { ...report.summary, sourceBytesMB: Number((totalBefore / 1048576).toFixed(2)), webpBytesMB: Number((totalAfter / 1048576).toFixed(2)) } }, null, 2) + '\n'
);

console.log(JSON.stringify(report.summary, null, 2));
for (const file of report.files) {
  console.log(`${file.savedPercent}%  ${file.source} -> ${file.output}`);
}
