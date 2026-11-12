/* Colheita Feliz 2 · menu lateral recolhível e ferramentas acessíveis. */
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
    if (document.documentElement.dataset.cf2NextUiInitialized === 'true') return;
    document.documentElement.dataset.cf2NextUiInitialized = 'true';
    const menu = document.querySelector('.side-menu');
    const toggles = [...document.querySelectorAll('[data-sidebar-toggle]')];
    if (menu && toggles.length) {
      let lastToggle = toggles[0];
      const syncToggles = open => {
        toggles.forEach(toggle => {
          toggle.setAttribute('aria-expanded', String(open));
          toggle.setAttribute('aria-label', open ? 'Fechar menu lateral' : 'Abrir menu lateral');
        });
      };
      const close = ({restoreFocus = false} = {}) => {
        menu.classList.remove('is-open');
        syncToggles(false);
        if (restoreFocus) lastToggle.focus();
      };
      const open = toggle => {
        lastToggle = toggle;
        menu.classList.add('is-open');
        syncToggles(true);
      };
      toggles.forEach(toggle => {
        toggle.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          if (menu.classList.contains('is-open')) close();
          else open(toggle);
        });
      });
      menu.addEventListener('click', event => {
        if (event.target.closest('button')) close();
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && menu.classList.contains('is-open')) close({restoreFocus: true});
      });
      document.addEventListener('click', event => {
        if (!menu.contains(event.target) && !toggles.some(toggle => toggle.contains(event.target))) close();
      });
      syncToggles(false);
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
  init();
})();
