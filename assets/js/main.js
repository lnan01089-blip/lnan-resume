/* ==========================================================================
   廖楠 · 个人求职主页 — interactions
   ========================================================================== */
(function () {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const header = $('#siteHeader');
  const main = $('#main');
  const footer = $('.site-footer');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
  window.__revealReady = true;

  /* ---------- Header scrolled state ---------- */
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav section ---------- */
  const navLinks = $$('.nav__link');
  const navMap = new Map(
    navLinks.map((link) => [link.getAttribute('href').slice(1), link])
  );
  const sections = $$('main section[id]');

  function setActiveNav(id) {
    navLinks.forEach((link) => {
      const active = link === navMap.get(id);
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    }, { rootMargin: '-42% 0px -54% 0px', threshold: 0 });
    sections.forEach((section) => navObserver.observe(section));
  }

  /* ---------- Experience accordion ---------- */
  const expCards = $$('.exp-card');
  const expButtons = expCards.map((card) => $('.exp-card__head', card));
  const expPanels = expCards.map((card) => $('.exp-card__panel', card));
  let expResizeTimer;

  function setPanelState(index, open, animate = true) {
    const card = expCards[index];
    const button = expButtons[index];
    const panel = expPanels[index];
    if (!card || !panel || !button) return;

    button.setAttribute('aria-expanded', String(open));
    panel.inert = !open;

    if (open) {
      card.classList.add('is-open');
      if (!animate) {
        panel.style.transition = 'none';
        panel.style.maxHeight = panel.scrollHeight + 'px';
        requestAnimationFrame(() => { panel.style.transition = ''; });
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    } else {
      if (animate) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        void panel.offsetHeight;
      }
      card.classList.remove('is-open');
      panel.style.maxHeight = '0px';
    }
  }

  function closeOthers(currentIndex) {
    expCards.forEach((card, index) => {
      if (index !== currentIndex && card.classList.contains('is-open')) {
        setPanelState(index, false, true);
      }
    });
  }

  function initAccordion() {
    expCards.forEach((card, index) => {
      const open = card.classList.contains('is-open');
      setPanelState(index, open, false);
    });
  }

  expButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const isOpen = expCards[index].classList.contains('is-open');
      if (isOpen) {
        setPanelState(index, false, true);
      } else {
        closeOthers(index);
        setPanelState(index, true, true);
      }
    });
  });

  initAccordion();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      expCards.forEach((card, index) => {
        if (card.classList.contains('is-open')) {
          expPanels[index].style.maxHeight = expPanels[index].scrollHeight + 'px';
        }
      });
    });
  }
  window.addEventListener('resize', () => {
    clearTimeout(expResizeTimer);
    expResizeTimer = setTimeout(() => {
      expCards.forEach((card, index) => {
        if (card.classList.contains('is-open')) {
          expPanels[index].style.maxHeight = expPanels[index].scrollHeight + 'px';
        }
      });
    }, 120);
  });

  /* ---------- Toast ---------- */
  const toast = $('#toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
  }

  /* ---------- Overlay state (menu / lightbox) ---------- */
  const siteHeader = $('#siteHeader');
  const menuToggle = $('.menu-toggle');
  const mobileMenu = $('#mobileMenu');
  const menuClose = $('#menuClose');
  const lightbox = $('#lightbox');
  let menuOpen = false;
  let lightboxOpen = false;

  function syncInert() {
    const overlayOpen = menuOpen || lightboxOpen;
    if (main) main.inert = overlayOpen;
    if (footer) footer.inert = overlayOpen;
    if (siteHeader) siteHeader.inert = overlayOpen;
    document.body.classList.toggle('is-locked', overlayOpen);
  }

  function trapFocus(container, event) {
    if (event.key !== 'Tab') return;
    const focusables = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', container)
      .filter((el) => el.getClientRects().length > 0);
    if (!focusables.length) {
      event.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (event.shiftKey) {
      if (active === first || !container.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else if (active === last || !container.contains(active)) {
      event.preventDefault();
      first.focus();
    }
  }

  /* ---------- Mobile menu ---------- */
  let menuLastFocus = null;
  let menuFocusTimer = null;
  let lightboxFocusTimer = null;

  function setMenuLabel(open) {
    if (!menuToggle) return;
    menuToggle.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    const label = $('.sr-only', menuToggle);
    if (label) label.textContent = open ? '关闭菜单' : '打开菜单';
  }

  function openMenu() {
    if (!mobileMenu || menuOpen) return;
    if (lightboxOpen) closeLightbox(false);
    menuOpen = true;
    menuLastFocus = (document.activeElement && document.activeElement !== document.body)
      ? document.activeElement
      : menuToggle;
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenu.inert = false;
    setMenuLabel(true);
    syncInert();
    if (menuClose) {
      void mobileMenu.offsetHeight;
      menuClose.focus({ preventScroll: true });
      clearTimeout(menuFocusTimer);
      menuFocusTimer = setTimeout(() => {
        if (menuOpen && !mobileMenu.contains(document.activeElement)) {
          menuClose.focus({ preventScroll: true });
        }
      }, 140);
    }
  }

  function closeMenu(restoreFocus = true) {
    if (!mobileMenu || !menuOpen) return;
    menuOpen = false;
    clearTimeout(menuFocusTimer);
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.inert = true;
    setMenuLabel(false);
    syncInert();
    if (restoreFocus && menuLastFocus && typeof menuLastFocus.focus === 'function') {
      menuLastFocus.focus({ preventScroll: true });
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      if (menuOpen) closeMenu();
      else openMenu();
    });
  }
  if (menuClose) menuClose.addEventListener('click', () => closeMenu());

  if (mobileMenu) {
    $$('a[href]', mobileMenu).forEach((link) => {
      link.addEventListener('click', () => closeMenu(false));
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080 && menuOpen) closeMenu(false);
  });

  /* ---------- Lightbox ---------- */
  const lightboxImg = $('#lightboxImg');
  const lightboxType = $('#lightboxType');
  const lightboxTitle = $('#lightboxTitle');
  const lightboxDesc = $('#lightboxDesc');
  const lightboxClose = $('#lightboxClose');
  let lightboxLastFocus = null;

  function openLightbox(data, trigger) {
    if (!lightbox) return;
    if (menuOpen) closeMenu(false);
    lightboxLastFocus = trigger || document.activeElement;
    lightboxOpen = true;

    if (lightboxImg) {
      lightboxImg.src = data.img || '';
      lightboxImg.alt = data.alt || data.title || '';
    }
    if (lightboxType) lightboxType.textContent = data.type || '';
    if (lightboxTitle) lightboxTitle.textContent = data.title || '';
    if (lightboxDesc) {
      lightboxDesc.textContent = data.desc || '';
      lightboxDesc.hidden = !data.desc;
    }

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.inert = false;
    syncInert();
    if (lightboxClose) {
      void lightbox.offsetHeight;
      lightboxClose.focus({ preventScroll: true });
      clearTimeout(lightboxFocusTimer);
      lightboxFocusTimer = setTimeout(() => {
        if (lightboxOpen && !lightbox.contains(document.activeElement)) {
          lightboxClose.focus({ preventScroll: true });
        }
      }, 140);
    }
  }

  function closeLightbox(restoreFocus = true) {
    if (!lightbox || !lightboxOpen) return;
    lightboxOpen = false;
    clearTimeout(lightboxFocusTimer);
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.inert = true;
    syncInert();
    if (restoreFocus && lightboxLastFocus && typeof lightboxLastFocus.focus === 'function') {
      lightboxLastFocus.focus({ preventScroll: true });
    }
  }

  if (lightbox) {
    $$('[data-close]', lightbox).forEach((el) => {
      el.addEventListener('click', () => closeLightbox());
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (lightboxOpen) {
        event.preventDefault();
        closeLightbox();
      } else if (menuOpen) {
        event.preventDefault();
        closeMenu();
      }
      return;
    }
    if (event.key === 'Tab') {
      if (lightboxOpen) trapFocus(lightbox, event);
      else if (menuOpen) trapFocus(mobileMenu, event);
    }
  });

  /* ---------- Copy email ---------- */
  $$('.copy-email').forEach((button) => {
    button.addEventListener('click', async () => {
      const email = button.dataset.email || '';
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        showToast('邮箱已复制');
      } catch (error) {
        const helper = document.createElement('textarea');
        helper.value = email;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        let copied = false;
        try { copied = document.execCommand('copy'); } catch (e) { copied = false; }
        helper.remove();
        showToast(copied ? '邮箱已复制' : '复制失败，请手动选择邮箱');
      }
    });
  });

  /* ---------- Portfolio ---------- */
  const pfFilters = $$('.filter-pill');
  const pfTabs = $$('.pf-tab');
  const pfPanels = $$('.pf-panel');
  const pfStatus = $('#pfStatus');

  function activateTab(tab, focus = false) {
    pfTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    pfPanels.forEach((panel) => {
      const active = panel.id === tab.getAttribute('aria-controls');
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
    if (focus) tab.focus();
    if (pfStatus) pfStatus.textContent = `当前作品：${tab.textContent.trim()}`;
  }

  function applyFilter(filter) {
    pfFilters.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    let activeTab = $('.pf-tab.is-active');
    pfTabs.forEach((tab) => {
      const matches = filter === 'all' || tab.dataset.cat === filter;
      tab.hidden = !matches;
    });

    const visibleTabs = pfTabs.filter((tab) => !tab.hidden);
    if (activeTab && activeTab.hidden && visibleTabs.length) {
      activateTab(visibleTabs[0]);
    }
    if (pfStatus && visibleTabs.length) {
      pfStatus.textContent = `显示 ${visibleTabs.length} 个作品条目`;
    }
  }

  pfFilters.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter || 'all'));
  });

  pfTabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
      const visibleTabs = pfTabs.filter((item) => !item.hidden);
      const currentIndex = visibleTabs.indexOf(tab);
      let nextIndex = null;

      if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % visibleTabs.length;
      else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + visibleTabs.length) % visibleTabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = visibleTabs.length - 1;

      if (nextIndex !== null) {
        event.preventDefault();
        activateTab(visibleTabs[nextIndex], true);
      }
    });
  });

  pfPanels.forEach((panel) => { panel.hidden = !panel.classList.contains('is-active'); });
  const initiallyActiveTab = $('.pf-tab.is-active');
  if (initiallyActiveTab) activateTab(initiallyActiveTab);

  $$('.pf-panel__cover').forEach((button) => {
    button.addEventListener('click', () => {
      openLightbox({
        img: button.dataset.img,
        alt: button.dataset.alt,
        title: button.dataset.title,
        type: button.dataset.type,
        desc: button.dataset.desc
      }, button);
    });
  });

  /* ---------- Life deck ---------- */
  const deck = $('#lifeDeck');
  const deckCards = $$('.deck-card');
  const lifeFilters = $$('.life-filter');
  const lifeStatus = $('#lifeStatus');
  let lifeFilter = 'all';
  let deckOrder = deckCards.slice();
  const MAX_VISIBLE_DEPTH = 4;

  function visibleDeckCards() {
    return deckOrder.filter((card) => lifeFilter === 'all' || card.dataset.cat === lifeFilter);
  }

  function renderDeck() {
    const visible = visibleDeckCards();

    deckCards.forEach((card) => {
      if (!visible.includes(card)) {
        card.hidden = true;
        card.classList.remove('is-top');
        card.classList.add('is-out');
        card.style.setProperty('--i', MAX_VISIBLE_DEPTH);
        return;
      }
      card.hidden = false;
      card.classList.remove('is-top');
    });

    visible.forEach((card, index) => {
      card.style.setProperty('--i', index);
      card.classList.toggle('is-top', index === 0);
      card.classList.toggle('is-out', index >= MAX_VISIBLE_DEPTH);
    });

    if (lifeStatus) {
      lifeStatus.textContent = `显示 ${visible.length} 张生活切片`;
    }
  }

  function bringToFront(card) {
    const visible = visibleDeckCards();
    if (!visible.includes(card) || visible[0] === card) return;
    deckOrder = [card].concat(deckOrder.filter((item) => item !== card));
    renderDeck();
  }

  lifeFilters.forEach((button) => {
    button.addEventListener('click', () => {
      lifeFilter = button.dataset.lifeFilter || 'all';
      lifeFilters.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      renderDeck();
    });
  });

  deckCards.forEach((card) => {
    card.addEventListener('click', () => {
      const visible = visibleDeckCards();
      if (visible[0] === card) {
        openLightbox({
          img: card.dataset.img,
          alt: card.querySelector('img') ? card.querySelector('img').alt : card.dataset.title,
          title: card.dataset.title,
          type: card.dataset.type,
          desc: card.dataset.desc
        }, card);
      } else {
        bringToFront(card);
      }
    });
    card.addEventListener('focus', () => {
      if (card.matches(':focus-visible')) bringToFront(card);
    });
  });

  if (deck) renderDeck();

  /* ---------- Expose a tiny reset for bfcache ---------- */
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    if (lightboxOpen) closeLightbox(false);
    if (menuOpen) closeMenu(false);
  });
})();
