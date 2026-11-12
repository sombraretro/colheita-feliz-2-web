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
          else {
            document.querySelector('.more-menu')?.classList.remove('is-open');
            document.querySelectorAll('[data-more-toggle]').forEach(moreToggle => {
              moreToggle.setAttribute('aria-expanded', 'false');
              moreToggle.setAttribute('aria-label', 'Abrir mais opções');
            });
            open(toggle);
          }
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


    const moreMenu = document.querySelector('.more-menu');
    const moreToggles = [...document.querySelectorAll('[data-more-toggle]')];
    if (moreMenu && moreToggles.length) {
      let touchScroll = null;
      moreMenu.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'touch' || moreMenu.scrollHeight <= moreMenu.clientHeight) return;
        touchScroll = { id: event.pointerId, startY: event.clientY, startTop: moreMenu.scrollTop, moved: false };
      }, { passive: true });
      moreMenu.addEventListener('pointermove', event => {
        if (!touchScroll || touchScroll.id !== event.pointerId) return;
        const delta = event.clientY - touchScroll.startY;
        if (!touchScroll.moved && Math.abs(delta) < 6) return;
        if (!touchScroll.moved) {
          touchScroll.moved = true;
          try { moreMenu.setPointerCapture(event.pointerId); } catch {}
        }
        moreMenu.scrollTop = touchScroll.startTop - delta;
        event.preventDefault();
      }, { passive: false });
      const finishTouchScroll = event => {
        if (touchScroll && touchScroll.id === event.pointerId) touchScroll = null;
      };
      moreMenu.addEventListener('pointerup', finishTouchScroll);
      moreMenu.addEventListener('pointercancel', finishTouchScroll);
      const syncMoreToggles = open => moreToggles.forEach(toggle => {
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fechar mais opções' : 'Abrir mais opções');
      });
      const closeMore = () => {
        moreMenu.classList.remove('is-open');
        syncMoreToggles(false);
      };
      moreToggles.forEach(toggle => toggle.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const opening = !moreMenu.classList.contains('is-open');
        if (opening) {
          document.querySelector('.side-menu')?.classList.remove('is-open');
          document.querySelectorAll('[data-sidebar-toggle]').forEach(sideToggle => {
            sideToggle.setAttribute('aria-expanded', 'false');
            sideToggle.setAttribute('aria-label', 'Abrir menu lateral');
          });
        }
        moreMenu.classList.toggle('is-open', opening);
        syncMoreToggles(opening);
      }));
      moreMenu.addEventListener('click', event => {
        if (event.target.closest('button')) closeMore();
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMore();
      });
      document.addEventListener('click', event => {
        if (!moreMenu.contains(event.target) && !moreToggles.some(toggle => toggle.contains(event.target))) closeMore();
      });
      syncMoreToggles(false);
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
