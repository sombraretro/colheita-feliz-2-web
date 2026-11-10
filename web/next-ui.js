/* Colheita Feliz 2 · base de interface da próxima etapa.
   Permanece desativada na 1.9.0: a navegação atual não é alterada. */
(() => {
  const labels = {
    inspect: 'Selecionar / inspecionar',
    hoe: 'Enxada',
    seed: 'Plantar sementes',
    water: 'Regar',
    fertilizer: 'Aplicar fertilizante',
    weed: 'Retirar ervas daninhas',
    pest: 'Retirar pragas',
    hand: 'Colher'
  };

  function init() {
    const menu = document.querySelector('.side-menu');
    const toggle = document.querySelector('[data-sidebar-toggle]');
    if (menu && toggle) {
      const close = () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      };
      toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape') close();
      });
      document.addEventListener('click', event => {
        if (!menu.contains(event.target) && !toggle.contains(event.target)) close();
      });
    }

    document.querySelectorAll('.tool-bar .tool[data-tool]').forEach(button => {
      const label = labels[button.dataset.tool];
      if (!label) return;
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.classList.add('tool-icon-ready');
    });
  }

  window.CF2NextUI = { init };
  if (document.documentElement.dataset.cf2NextUi === 'enabled') init();
})();
