/* ==========================================================================
   N'RESUME · 廖楠的个人主页 — interactions
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
  let imagePanelOpen = false;

  function syncInert() {
    const overlayOpen = menuOpen || lightboxOpen || imagePanelOpen;
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
    if (imagePanelOpen) closeImageManager(false);
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
    if (imagePanelOpen) closeImageManager(false);
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
      if (imagePanelOpen) {
        event.preventDefault();
        closeImageManager();
      } else if (lightboxOpen) {
        event.preventDefault();
        closeLightbox();
      } else if (menuOpen) {
        event.preventDefault();
        closeMenu();
      }
      return;
    }
    if (event.key === 'Tab') {
      if (imagePanelOpen) trapFocus(imageManager, event);
      else if (lightboxOpen) trapFocus(lightbox, event);
      else if (menuOpen) trapFocus(mobileMenu, event);
    }
  });

  /* ---------- Image manager (local preview) ---------- */
  const imageManager = $('#imageManager');
  const imageManagerBody = $('#imageManagerBody');
  const imageManagerInput = $('#imageManagerInput');
  const imageManagerClose = $('#imageManagerClose');
  const imageManagerDone = $('#imageManagerDone');
  const imageManagerResetAll = $('#imageManagerResetAll');
  const imageManagerOpenBtn = $('#imageManagerOpen');
  const IMAGE_STORAGE_PREFIX = 'nresume:image:';
  const IMAGE_SLOT_DEFS = [
    { key: 'avatar', group: '头像与 IP', label: '个人头像', spec: '1:1 · 建议 720 × 720' },
    { key: 'mascot-head', group: '头像与 IP', label: '圆形 IP 头像', spec: '透明背景 · 方形' },
    { key: 'mascot-body', group: '头像与 IP', label: '全身 IP 小人', spec: '透明背景 · 竖图' },
    { key: 'work-stashly', group: '作品封面', label: 'Stashly 书柜 App', spec: '16:10 横图' },
    { key: 'work-research', group: '作品封面', label: '绿色改造研究', spec: '16:10 横图' },
    { key: 'work-media', group: '作品封面', label: '校园新媒体', spec: '16:10 横图' },
    { key: 'pf-site', group: '作品封面', label: "N'RESUME 主页", spec: '16:10 横图' },
    { key: 'life-1', group: '生活切片', label: 'City walk · 城市散步', spec: '3:4 竖图' },
    { key: 'life-2', group: '生活切片', label: 'Coffee · 周末咖啡', spec: '3:4 竖图' },
    { key: 'life-6', group: '生活切片', label: 'Build mode · 做产品', spec: '3:4 竖图' },
    { key: 'life-3', group: '生活切片', label: 'Night read · 夜读', spec: '3:4 竖图' },
    { key: 'life-5', group: '生活切片', label: 'Exhibition · 看展', spec: '3:4 竖图' },
    { key: 'life-4', group: '生活切片', label: 'On the road · 出行', spec: '3:4 竖图' }
  ];
  const imageSlots = IMAGE_SLOT_DEFS.map((def) => {
    const img = $(`img[data-img-slot="${def.key}"]`);
    if (!img) return null;
    const trigger = img.closest('button[data-img]');
    return {
      ...def,
      img,
      trigger,
      originalSrc: img.getAttribute('src') || '',
      originalSrcset: img.getAttribute('srcset'),
      originalLightboxSrc: trigger ? trigger.getAttribute('data-img') : null,
      custom: false
    };
  }).filter(Boolean);
  const imageSlotMap = new Map(imageSlots.map((slot) => [slot.key, slot]));
  let activeImageSlot = null;
  let activeImageTrigger = null;
  let imageManagerLastFocus = null;
  let imageManagerFocusTimer = null;

  function readStoredImage(key) {
    try { return localStorage.getItem(IMAGE_STORAGE_PREFIX + key); }
    catch (error) { return null; }
  }

  function saveStoredImage(key, dataUrl) {
    try {
      localStorage.setItem(IMAGE_STORAGE_PREFIX + key, dataUrl);
      return true;
    } catch (error) {
      return false;
    }
  }

  function removeStoredImage(key) {
    try { localStorage.removeItem(IMAGE_STORAGE_PREFIX + key); }
    catch (error) { /* storage can be unavailable; preview still works */ }
  }

  function updateImageSlotUI(slot) {
    if (slot.thumbImg) slot.thumbImg.src = slot.img.src;
    if (slot.card) slot.card.classList.toggle('has-custom', slot.custom);
    if (slot.resetBtn) slot.resetBtn.hidden = !slot.custom;
  }

  function applyImage(slot, dataUrl) {
    slot.img.src = dataUrl;
    if (slot.img.hasAttribute('srcset')) slot.img.removeAttribute('srcset');
    if (slot.trigger) slot.trigger.dataset.img = dataUrl;
    slot.custom = true;
    updateImageSlotUI(slot);
  }

  function restoreImage(slot) {
    slot.img.src = slot.originalSrc;
    if (slot.originalSrcset) slot.img.setAttribute('srcset', slot.originalSrcset);
    if (slot.trigger && slot.originalLightboxSrc) slot.trigger.dataset.img = slot.originalLightboxSrc;
    slot.custom = false;
    updateImageSlotUI(slot);
  }

  function buildImageManager() {
    if (!imageManagerBody) return;
    const groups = new Map();
    imageSlots.forEach((slot) => {
      if (!groups.has(slot.group)) groups.set(slot.group, []);
      groups.get(slot.group).push(slot);
    });

    groups.forEach((slots, groupName) => {
      const group = document.createElement('section');
      group.className = 'img-manager__group';

      const title = document.createElement('h3');
      title.className = 'img-manager__group-title';
      title.textContent = groupName;

      const grid = document.createElement('div');
      grid.className = 'img-manager__grid';

      slots.forEach((slot) => {
        const card = document.createElement('article');
        card.className = 'img-slot';

        const thumb = document.createElement('div');
        thumb.className = 'img-slot__thumb';
        const thumbImg = document.createElement('img');
        thumbImg.alt = '';
        thumbImg.loading = 'lazy';
        thumbImg.decoding = 'async';
        thumb.appendChild(thumbImg);

        const info = document.createElement('div');
        const label = document.createElement('p');
        label.className = 'img-slot__label';
        label.textContent = slot.label;
        const spec = document.createElement('p');
        spec.className = 'img-slot__spec';
        spec.textContent = slot.spec;
        info.append(label, spec);

        const actions = document.createElement('div');
        actions.className = 'img-slot__actions';
        const choose = document.createElement('button');
        choose.type = 'button';
        choose.className = 'img-slot__choose';
        choose.dataset.slotChoose = slot.key;
        choose.textContent = '选择图片';
        const reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'img-slot__reset';
        reset.dataset.slotReset = slot.key;
        reset.textContent = '恢复默认';
        reset.hidden = true;
        actions.append(choose, reset);

        card.append(thumb, info, actions);
        grid.appendChild(card);
        slot.card = card;
        slot.thumbImg = thumbImg;
        slot.resetBtn = reset;
        updateImageSlotUI(slot);
      });

      group.append(title, grid);
      imageManagerBody.appendChild(group);
    });
  }

  function openImageManager() {
    if (!imageManager || imagePanelOpen) return;
    if (menuOpen) closeMenu(false);
    if (lightboxOpen) closeLightbox(false);
    imagePanelOpen = true;
    imageManagerLastFocus = (document.activeElement && document.activeElement !== document.body)
      ? document.activeElement
      : imageManagerOpenBtn;
    imageManager.classList.add('is-open');
    imageManager.setAttribute('aria-hidden', 'false');
    imageManager.inert = false;
    syncInert();
    if (imageManagerClose) {
      void imageManager.offsetHeight;
      imageManagerClose.focus({ preventScroll: true });
      clearTimeout(imageManagerFocusTimer);
      imageManagerFocusTimer = setTimeout(() => {
        if (imagePanelOpen && !imageManager.contains(document.activeElement)) {
          imageManagerClose.focus({ preventScroll: true });
        }
      }, 140);
    }
  }

  function closeImageManager(restoreFocus = true) {
    if (!imageManager || !imagePanelOpen) return;
    imagePanelOpen = false;
    clearTimeout(imageManagerFocusTimer);
    imageManager.classList.remove('is-open');
    imageManager.setAttribute('aria-hidden', 'true');
    imageManager.inert = true;
    syncInert();
    if (restoreFocus && imageManagerLastFocus && typeof imageManagerLastFocus.focus === 'function') {
      imageManagerLastFocus.focus({ preventScroll: true });
    }
  }

  function readImageFile(file, slot) {
    const isMascot = Boolean(slot && slot.key.indexOf('mascot-') === 0);
    return new Promise((resolve, reject) => {
      if (!file || !file.type || !file.type.startsWith('image/')) {
        reject(new Error('type'));
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        reject(new Error('size'));
        return;
      }
      if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
        if (file.size > 2.5 * 1024 * 1024) {
          reject(new Error('vector-size'));
          return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('read'));
        reader.readAsDataURL(file);
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const maxSide = 1200;
        const sourceWidth = image.naturalWidth || 1;
        const sourceHeight = image.naturalHeight || 1;
        const scale = Math.min(1, maxSide / Math.max(sourceWidth, sourceHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(sourceWidth * scale));
        canvas.height = Math.max(1, Math.round(sourceHeight * scale));
        const context = canvas.getContext('2d');
        if (!context) {
          reject(new Error('read'));
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        let dataUrl = '';
        try { dataUrl = canvas.toDataURL('image/webp', .84); } catch (error) { dataUrl = ''; }
        if (!dataUrl || dataUrl.indexOf('data:image/webp') !== 0) {
          try {
            dataUrl = isMascot
              ? canvas.toDataURL('image/png')
              : canvas.toDataURL('image/jpeg', .86);
          } catch (error) {
            dataUrl = '';
          }
        }
        if (!dataUrl) {
          reject(new Error('read'));
          return;
        }
        resolve(dataUrl);
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('read'));
      };
      image.src = objectUrl;
    });
  }

  function chooseImage(key, trigger) {
    const slot = imageSlotMap.get(key);
    if (!slot || !imageManagerInput) return;
    activeImageSlot = slot;
    activeImageTrigger = trigger || null;
    imageManagerInput.value = '';
    imageManagerInput.click();
  }

  function resetImageSlot(key) {
    const slot = imageSlotMap.get(key);
    if (!slot) return;
    restoreImage(slot);
    removeStoredImage(key);
    showToast(`已恢复「${slot.label}」的默认图片`);
  }

  buildImageManager();
  imageSlots.forEach((slot) => {
    const stored = readStoredImage(slot.key);
    if (stored) applyImage(slot, stored);
    else updateImageSlotUI(slot);
  });

  if (imageManagerOpenBtn) {
    imageManagerOpenBtn.hidden = false;
    imageManagerOpenBtn.addEventListener('click', openImageManager);
  }

  if (imageManager) {
    $$('[data-img-close]', imageManager).forEach((element) => {
      element.addEventListener('click', () => closeImageManager());
    });
  }

  if (imageManagerDone) {
    imageManagerDone.addEventListener('click', () => closeImageManager());
  }

  if (imageManagerBody) {
    imageManagerBody.addEventListener('click', (event) => {
      if (!event.target || typeof event.target.closest !== 'function') return;
      const choose = event.target.closest('[data-slot-choose]');
      if (choose) {
        chooseImage(choose.getAttribute('data-slot-choose'), choose);
        return;
      }
      const reset = event.target.closest('[data-slot-reset]');
      if (reset) resetImageSlot(reset.getAttribute('data-slot-reset'));
    });
  }

  if (imageManagerResetAll) {
    imageManagerResetAll.addEventListener('click', () => {
      let changed = false;
      imageSlots.forEach((slot) => {
        if (slot.custom) {
          restoreImage(slot);
          changed = true;
        }
        removeStoredImage(slot.key);
      });
      showToast(changed ? '已恢复全部默认图片' : '当前已经是默认图片');
    });
  }

  if (imageManagerInput) {
    imageManagerInput.addEventListener('change', async () => {
      const slot = activeImageSlot;
      const trigger = activeImageTrigger;
      const file = imageManagerInput.files && imageManagerInput.files[0];
      activeImageSlot = null;
      activeImageTrigger = null;
      if (!slot || !file) {
        imageManagerInput.value = '';
        return;
      }
      try {
        const dataUrl = await readImageFile(file, slot);
        applyImage(slot, dataUrl);
        const saved = saveStoredImage(slot.key, dataUrl);
        showToast(saved
          ? `已替换「${slot.label}」`
          : '已预览，但浏览器存储空间不足，刷新后会恢复默认');
      } catch (error) {
        const messages = {
          type: '请选择图片文件',
          size: '图片超过 20MB，请换一张',
          'vector-size': 'GIF / SVG 请控制在 2.5MB 以内',
          read: '图片读取失败，请换一张试试'
        };
        showToast(messages[error.message] || '图片读取失败，请换一张试试');
      }
      imageManagerInput.value = '';
      if (trigger && document.contains(trigger)) trigger.focus({ preventScroll: true });
    });
  }

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
