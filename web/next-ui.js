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
    const menu = document.querySelector('.side-menu');
    const toggle = document.querySelector('[data-sidebar-toggle]');
    if (menu && toggle) {
      const close = ({restoreFocus = false} = {}) => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu lateral');
        if (restoreFocus) toggle.focus();
      };
      const open = () => {
        menu.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Fechar menu lateral');
      };
      toggle.addEventListener('click', () => {
        if (menu.classList.contains('is-open')) close();
        else open();
      });
      menu.addEventListener('click', event => {
        if (event.target.closest('button')) close();
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && menu.classList.contains('is-open')) close({restoreFocus: true});
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
