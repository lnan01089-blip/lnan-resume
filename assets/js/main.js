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

  /* ---------- Project galleries ---------- */
  const PROJECT_MAX_IMAGES = 8;
  const NOTE_MAX_LENGTH = 80;
  const GALLERY_STORAGE_PREFIX = 'nresume:gallery:';
  /* PUBLISHED_GALLERIES_START */
  const PROJECT_GALLERIES = {
    stashly: {
      label: 'Stashly 书柜 App',
      type: '项目图片 · 产品 / AI Coding',
      title: 'Stashly 书柜 App',
      desc: '针对实体书存放在不同柜子和收纳盒中、查找位置不便的问题，设计与实际存储方式对应的管理结构，实现书籍与存放位置的关联；使用 Claude 辅助编写和修改代码，实现书柜、收纳盒与书籍的管理，并支持本地存储和离线使用；根据实际使用情况发现问题，借助 AI 排查和修复代码，逐步完善功能。',
      images: [
        { src: 'assets/img/project-stashly-1.webp', alt: 'Stashly 书柜 App 项目封面', caption: '项目封面' },
        { src: 'assets/img/project-stashly-2.webp', alt: 'Stashly 书柜 App 项目封面细节', caption: '封面细节' }
      ]
    },
    research: {
      label: '既有建筑绿色改造研究',
      type: '项目图片 · 研究 / 国家自然科学基金',
      title: '既有建筑绿色改造研究',
      desc: '围绕既有建筑绿色改造相关问题开展研究，参与研究资料整理、理论分析、数据分析及论文撰写工作；以第一作者发表核心论文 2 篇、三作 1 篇，参与 3 部著作编写。',
      images: [
        { src: 'assets/img/project-research-1.webp', alt: '既有建筑绿色改造研究项目封面', caption: '项目封面' },
        { src: 'assets/img/project-research-2.webp', alt: '既有建筑绿色改造研究项目封面细节', caption: '封面细节' }
      ]
    },
    site: {
      label: "N'RESUME 个人主页",
      type: '项目图片 · 个人主页 / 网页搭建',
      title: "N'RESUME 个人主页",
      desc: '以原生 HTML / CSS / JavaScript 搭建的单页个人求职主页，串联关于、教育、工作、项目、校园、技能、兴趣与联系方式；含平滑滚动、章节高亮、多图灯箱与浏览器内图片预览。',
      images: [
        { src: 'assets/img/project-site-1.webp', alt: "N'RESUME 个人主页桌面端首页", caption: '桌面端首页' },
        { src: 'assets/img/project-site-2.webp', alt: "N'RESUME 个人主页项目经历", caption: '项目经历' },
        { src: 'assets/img/project-site-3.webp', alt: "N'RESUME 个人主页移动端页面", caption: '移动端页面' }
      ]
    }
  };
  /* PUBLISHED_GALLERIES_END */

  const projectStates = new Map();
  Object.entries(PROJECT_GALLERIES).forEach(([key, definition]) => {
    projectStates.set(key, {
      key,
      label: definition.label,
      type: definition.type,
      title: definition.title,
      desc: definition.desc,
      defaults: definition.images.map((image) => ({ ...image })),
      images: definition.images.map((image) => ({ ...image })),
      custom: false,
      trigger: $(`[data-project-gallery="${key}"]`),
      preview: null,
      countEl: null,
      managerEl: null
    });
  });

  function cleanNote(value) {
    return typeof value === 'string'
      ? value.replace(/\s+/g, ' ').trim().slice(0, NOTE_MAX_LENGTH)
      : '';
  }

  function readStoredGallery(key) {
    try {
      const raw = localStorage.getItem(GALLERY_STORAGE_PREFIX + key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return null;
      return parsed.map((entry) => {
        if (typeof entry === 'string' && entry) {
          return { src: entry, alt: '', caption: '', legacy: true };
        }
        if (!entry || typeof entry !== 'object' || typeof entry.src !== 'string' || !entry.src) {
          return null;
        }
        return {
          src: entry.src,
          alt: typeof entry.alt === 'string' ? entry.alt : '',
          caption: cleanNote(entry.caption || entry.note || '')
        };
      }).filter(Boolean);
    } catch (error) {
      return null;
    }
  }

  function saveStoredGallery(key, images) {
    try {
      localStorage.setItem(GALLERY_STORAGE_PREFIX + key, JSON.stringify(images.map((image) => ({
        src: image.src,
        alt: image.alt || '',
        caption: cleanNote(image.caption)
      }))));
      return true;
    } catch (error) {
      return false;
    }
  }

  function removeStoredGallery(key) {
    try { localStorage.removeItem(GALLERY_STORAGE_PREFIX + key); }
    catch (error) { /* storage can be unavailable; preview still works */ }
  }

  function storedGalleryImages(project, stored) {
    return stored.slice(0, PROJECT_MAX_IMAGES).map((image, index) => {
      const fallback = image.legacy
        ? project.defaults.find((item) => item.src === image.src)
        : null;
      return {
        src: image.src,
        alt: image.alt || (fallback && fallback.alt) || `${project.title} 项目图片 ${index + 1}`,
        caption: cleanNote(image.caption || (fallback && fallback.caption))
      };
    });
  }

  function updateProjectGalleryUI(project) {
    const count = project.images.length;
    if (project.preview) {
      project.preview.src = count ? project.images[0].src : '';
      project.preview.alt = '';
    }
    if (project.countEl) project.countEl.textContent = String(count);
    if (project.trigger) {
      project.trigger.classList.toggle('is-empty', count === 0);
      project.trigger.disabled = count === 0;
      project.trigger.setAttribute('aria-label', `查看${project.title}的项目图片，共 ${count} 张`);
    }
  }

  function hydrateProjectStates() {
    projectStates.forEach((project) => {
      if (project.trigger) {
        project.preview = $('[data-gallery-preview]', project.trigger);
        project.countEl = $('[data-gallery-count]', project.trigger);
      }
      const stored = readStoredGallery(project.key);
      if (stored && stored.length) {
        project.images = storedGalleryImages(project, stored);
        project.custom = true;
      }
      updateProjectGalleryUI(project);
    });
  }

  hydrateProjectStates();

  /* ---------- Project text editing (local preview) ---------- */
  const PROJECT_TEXT_STORAGE_PREFIX = 'nresume:project-text:';
  const projectTextCards = new Map();
  const projectTextSaveTimers = new Map();
  const projectGrid = $('.project-grid');
  const projectSection = $('#projects');
  const projectTextEditBtn = $('#projectTextEdit');
  const projectTextBar = $('#projectEditBar');
  const projectTextResetBtn = $('#projectTextReset');
  const projectTextOpenBtn = $('#projectTextOpen');
  let projectTextEditing = false;

  function projectFieldLimit(field) {
    if (field === 'desc') return 400;
    if (field === 'title') return 80;
    if (field === 'result') return 100;
    if (field === 'type') return 60;
    if (field.endsWith('-suffix')) return 6;
    if (field.endsWith('-num')) return 14;
    if (field.startsWith('metric-')) return 24;
    if (field.startsWith('tag-')) return 24;
    return 80;
  }

  function projectFieldLabel(field) {
    if (field === 'type') return '项目类型';
    if (field === 'title') return '项目名称';
    if (field === 'desc') return '项目描述';
    if (field === 'result') return '项目成果';
    if (field.endsWith('-num')) return '项目数据';
    if (field.endsWith('-suffix')) return '数据单位';
    if (field.startsWith('metric-')) return '数据说明';
    if (field.startsWith('tag-')) return '项目标签';
    return '项目文字';
  }

  function cleanProjectText(value, max) {
    return typeof value === 'string'
      ? value.replace(/\s+/g, ' ').trim().slice(0, max)
      : '';
  }

  function readStoredProjectText(key) {
    try {
      const raw = localStorage.getItem(PROJECT_TEXT_STORAGE_PREFIX + key);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
      const values = {};
      Object.entries(parsed).forEach(([field, value]) => {
        if (typeof value === 'string') values[field] = value;
      });
      return values;
    } catch (error) {
      return {};
    }
  }

  function saveStoredProjectText(project) {
    const values = {};
    project.fields.forEach((field, key) => {
      if (project.textOverrides[key]) values[key] = project.textOverrides[key];
    });
    try {
      if (Object.keys(values).length) {
        localStorage.setItem(PROJECT_TEXT_STORAGE_PREFIX + project.key, JSON.stringify(values));
      } else {
        localStorage.removeItem(PROJECT_TEXT_STORAGE_PREFIX + project.key);
      }
      project.textCustom = Object.keys(values).length > 0;
      return true;
    } catch (error) {
      return false;
    }
  }

  function removeStoredProjectText(key) {
    try { localStorage.removeItem(PROJECT_TEXT_STORAGE_PREFIX + key); }
    catch (error) { /* storage can be unavailable; editing still works */ }
  }

  function cancelProjectTextSave(project) {
    const timer = projectTextSaveTimers.get(project.key);
    if (timer) window.clearTimeout(timer);
    projectTextSaveTimers.delete(project.key);
  }

  function scheduleProjectTextSave(project) {
    cancelProjectTextSave(project);
    const timer = window.setTimeout(() => {
      projectTextSaveTimers.delete(project.key);
      if (!saveStoredProjectText(project)) {
        showToast('文字已修改，但浏览器存储空间不足，刷新后可能丢失');
      }
    }, 400);
    projectTextSaveTimers.set(project.key, timer);
  }

  function flushProjectTextSave(project) {
    cancelProjectTextSave(project);
    if (!saveStoredProjectText(project)) {
      showToast('文字已修改，但浏览器存储空间不足，刷新后可能丢失');
    }
  }

  function flushAllProjectTextSaves() {
    projectTextCards.forEach((project) => flushProjectTextSave(project));
  }

  function syncProjectManagerLabels(project) {
    if (!project.managerEl || !project.managerEl.isConnected) return;
    const label = $('.img-gallery__label', project.managerEl);
    if (label) label.textContent = project.label;
    const reset = $('[data-gallery-reset]', project.managerEl);
    if (reset) reset.setAttribute('aria-label', `恢复「${project.label}」的默认图片`);
    $$('[data-gallery-replace]', project.managerEl).forEach((button) => {
      button.setAttribute('aria-label', `替换「${project.label}」的第 ${Number(button.dataset.index) + 1} 张图片`);
    });
    $$('[data-gallery-remove]', project.managerEl).forEach((button) => {
      button.setAttribute('aria-label', `移除「${project.label}」的第 ${Number(button.dataset.index) + 1} 张图片`);
    });
    const add = $('[data-gallery-add]', project.managerEl);
    if (add) add.setAttribute('aria-label', `向「${project.label}」添加图片`);
  }

  function syncProjectTextState(project) {
    const title = cleanProjectText(project.textOverrides.title, projectFieldLimit('title'))
      || project.defaultTitle;
    const type = cleanProjectText(project.textOverrides.type, projectFieldLimit('type'));
    const desc = cleanProjectText(project.textOverrides.desc, projectFieldLimit('desc'));

    project.title = title;
    project.label = title || project.defaultLabel;
    project.type = type ? `项目图片 · ${type}` : project.defaultType;
    project.desc = desc || project.defaultDesc;

    updateProjectGalleryUI(project);
    syncProjectManagerLabels(project);
  }

  function applyProjectTextFieldValues(project) {
    project.fields.forEach((field, key) => {
      field.textContent = project.textOverrides[key] || project.textDefaults[key] || '';
    });
  }

  function projectFromField(field) {
    const card = field.closest('[data-project-card]');
    return card ? projectStates.get(card.getAttribute('data-project-card')) : null;
  }

  function refreshProjectFieldAria(project) {
    project.fields.forEach((item, itemKey) => {
      if (item.getAttribute('aria-label')) {
        item.setAttribute('aria-label', `编辑${projectFieldLabel(itemKey)}：${project.label}`);
      }
    });
  }

  function updateProjectTextOverride(project, field, value, commit) {
    const key = field.getAttribute('data-project-field');
    const limit = projectFieldLimit(key);
    const next = cleanProjectText(value, limit);
    if (next && next !== project.textDefaults[key]) project.textOverrides[key] = next;
    else delete project.textOverrides[key];

    if (commit) {
      const display = project.textOverrides[key] || project.textDefaults[key] || '';
      if (field.textContent !== display) field.textContent = display;
      flushProjectTextSave(project);
      syncProjectTextState(project);
      refreshProjectFieldAria(project);
    } else {
      scheduleProjectTextSave(project);
    }
  }

  function commitProjectField(field) {
    if (!field || !field.matches || !field.matches('[data-project-field]')) return;
    const project = projectFromField(field);
    if (project) updateProjectTextOverride(project, field, field.textContent, true);
  }

  function insertPlainTextAtCaret(field, text) {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) {
      field.textContent += text;
      return;
    }
    const range = selection.getRangeAt(0);
    if (!field.contains(range.commonAncestorContainer)) {
      field.textContent += text;
      return;
    }
    range.deleteContents();
    const node = document.createTextNode(text);
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function setProjectEditing(on) {
    if (!projectGrid || !projectTextEditBtn || on === projectTextEditing) return;

    if (!on) commitProjectField(document.activeElement);

    projectTextEditing = on;
    projectGrid.classList.toggle('is-text-editing', on);
    projectTextEditBtn.setAttribute('aria-pressed', String(on));
    projectTextEditBtn.textContent = on ? '完成编辑' : '编辑文字';
    if (projectTextBar) projectTextBar.hidden = !on;

    projectTextCards.forEach((project) => {
      project.fields.forEach((field, key) => {
        if (on) {
          field.setAttribute('contenteditable', 'true');
          field.setAttribute('spellcheck', 'false');
          field.setAttribute('role', 'textbox');
          field.setAttribute('aria-label', `编辑${projectFieldLabel(key)}：${project.label}`);
        } else {
          field.removeAttribute('contenteditable');
          field.removeAttribute('spellcheck');
          field.removeAttribute('role');
          field.removeAttribute('aria-label');
        }
      });
      if (!on) {
        applyProjectTextFieldValues(project);
        flushProjectTextSave(project);
        syncProjectTextState(project);
      }
    });

    showToast(on ? '已进入项目文字编辑，修改会自动保存' : '项目文字已保存');
  }

  $$('[data-project-card]').forEach((card) => {
    const project = projectStates.get(card.getAttribute('data-project-card'));
    if (!project) return;
    const fields = new Map();
    $$('[data-project-field]', card).forEach((field) => {
      const key = field.getAttribute('data-project-field');
      if (key && !fields.has(key)) fields.set(key, field);
    });
    project.card = card;
    project.fields = fields;
    project.defaultType = project.type;
    project.defaultTitle = project.title;
    project.defaultDesc = project.desc;
    project.defaultLabel = project.label;
    project.textDefaults = {};
    fields.forEach((field, key) => {
      project.textDefaults[key] = cleanProjectText(field.textContent, projectFieldLimit(key));
    });
    projectTextCards.set(project.key, project);
  });

  projectTextCards.forEach((project) => {
    const stored = readStoredProjectText(project.key);
    const overrides = {};
    Object.entries(stored).forEach(([key, value]) => {
      if (!project.fields.has(key)) return;
      const cleaned = cleanProjectText(value, projectFieldLimit(key));
      if (cleaned && cleaned !== project.textDefaults[key]) overrides[key] = cleaned;
    });
    project.textOverrides = overrides;
    applyProjectTextFieldValues(project);
    syncProjectTextState(project);
  });

  if (projectGrid) {
    projectGrid.addEventListener('input', (event) => {
      if (!projectTextEditing) return;
      const field = event.target && event.target.closest
        ? event.target.closest('[data-project-field]')
        : null;
      if (!field) return;
      const project = projectFromField(field);
      if (project) {
        updateProjectTextOverride(project, field, field.textContent, false);
        syncProjectTextState(project);
        refreshProjectFieldAria(project);
      }
    });

    projectGrid.addEventListener('focusout', (event) => {
      if (!projectTextEditing) return;
      const field = event.target && event.target.closest
        ? event.target.closest('[data-project-field]')
        : null;
      if (!field) return;
      commitProjectField(field);
    });

    projectGrid.addEventListener('keydown', (event) => {
      if (!projectTextEditing) return;
      const field = event.target && event.target.closest
        ? event.target.closest('[data-project-field]')
        : null;
      if (!field) return;
      if (event.key === 'Enter') {
        event.preventDefault();
        commitProjectField(field);
        field.blur();
      }
      if (event.key === 'Tab') commitProjectField(field);
    });

    projectGrid.addEventListener('beforeinput', (event) => {
      if (!projectTextEditing) return;
      const field = event.target && event.target.closest
        ? event.target.closest('[data-project-field]')
        : null;
      if (!field) return;
      if (event.inputType === 'insertParagraph' || event.inputType === 'insertLineBreak') {
        event.preventDefault();
        commitProjectField(field);
        field.blur();
      }
    });

    projectGrid.addEventListener('paste', (event) => {
      if (!projectTextEditing) return;
      const field = event.target && event.target.closest
        ? event.target.closest('[data-project-field]')
        : null;
      if (!field) return;
      event.preventDefault();
      const text = ((event.clipboardData && event.clipboardData.getData('text/plain')) || '')
        .replace(/\s+/g, ' ')
        .slice(0, projectFieldLimit(field.getAttribute('data-project-field')));
      if (!text) return;
      insertPlainTextAtCaret(field, text);
      const project = projectFromField(field);
      if (project) {
        updateProjectTextOverride(project, field, field.textContent, false);
        syncProjectTextState(project);
        refreshProjectFieldAria(project);
      }
    });

    document.addEventListener('pointerdown', (event) => {
      if (!projectTextEditing) return;
      const active = document.activeElement;
      if (!active || !active.matches || !active.matches('[data-project-field]')) return;
      if (active === event.target || active.contains(event.target)) return;
      commitProjectField(active);
    }, true);
  }

  if (projectTextEditBtn) {
    projectTextEditBtn.hidden = false;
    projectTextEditBtn.addEventListener('click', () => setProjectEditing(!projectTextEditing));
  }

  if (projectTextOpenBtn) {
    projectTextOpenBtn.hidden = false;
    projectTextOpenBtn.addEventListener('click', () => {
      if (!projectTextEditing) setProjectEditing(true);
      if (projectSection) {
        projectSection.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
      if (projectTextEditBtn) projectTextEditBtn.focus({ preventScroll: true });
    });
  }

  if (projectTextResetBtn) {
    projectTextResetBtn.addEventListener('click', () => {
      projectTextCards.forEach((project) => {
        cancelProjectTextSave(project);
        project.textOverrides = {};
        applyProjectTextFieldValues(project);
        removeStoredProjectText(project.key);
        syncProjectTextState(project);
      });
      showToast('已恢复默认项目文字');
    });
  }

  window.addEventListener('beforeunload', flushAllProjectTextSaves);

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
  const lightboxStage = $('#lightboxStage');
  const lightboxType = $('#lightboxType');
  const lightboxTitle = $('#lightboxTitle');
  const lightboxDesc = $('#lightboxDesc');
  const lightboxCaption = $('#lightboxCaption');
  const lightboxClose = $('#lightboxClose');
  const lightboxPrev = $('#lightboxPrev');
  const lightboxNext = $('#lightboxNext');
  const lightboxCounter = $('#lightboxCounter');
  const lightboxIndexEl = $('#lightboxIndex');
  const lightboxTotalEl = $('#lightboxTotal');
  const lightboxThumbs = $('#lightboxThumbs');
  const lightboxStatus = $('#lightboxStatus');
  let lightboxLastFocus = null;
  let lightboxGallery = [];
  let lightboxIndex = 0;
  let lightboxBase = {};
  let swipeStartX = null;
  let swipeStartY = null;
  let swipePointerId = null;

  function renderLightboxThumbs() {
    if (!lightboxThumbs) return;
    lightboxThumbs.textContent = '';
    if (lightboxGallery.length <= 1) {
      lightboxThumbs.hidden = true;
      return;
    }
    lightboxGallery.forEach((image, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'lightbox__thumb';
      button.dataset.lightboxThumb = String(index);
      const note = cleanNote(image.caption);
      button.setAttribute('aria-label', `查看第 ${index + 1} 张图片${note ? '：' + note : ''}`);
      const thumb = document.createElement('img');
      thumb.src = image.src;
      thumb.alt = '';
      thumb.loading = 'lazy';
      thumb.decoding = 'async';
      button.appendChild(thumb);
      lightboxThumbs.appendChild(button);
    });
    lightboxThumbs.hidden = false;
    updateLightboxThumbs();
  }

  function updateLightboxThumbs() {
    if (!lightboxThumbs) return;
    $$('[data-lightbox-thumb]', lightboxThumbs).forEach((button, index) => {
      const active = index === lightboxIndex;
      button.classList.toggle('is-active', active);
      if (active) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
  }

  function preloadLightboxNeighbors() {
    const total = lightboxGallery.length;
    if (total < 2) return;
    [lightboxIndex - 1, lightboxIndex + 1].forEach((index) => {
      const neighbor = lightboxGallery[(index + total) % total];
      if (!neighbor) return;
      const preload = new Image();
      preload.src = neighbor.src;
    });
  }

  function renderLightboxImage(options = {}) {
    const image = lightboxGallery[lightboxIndex] || null;
    const isGallery = lightboxGallery.length > 1;
    if (lightbox) lightbox.classList.toggle('is-gallery', isGallery);
    if (!image) return;

    if (lightboxImg) {
      lightboxImg.src = image.src;
      lightboxImg.alt = image.alt || lightboxBase.title || '';
      if (isGallery || !image.width) lightboxImg.removeAttribute('width');
      else lightboxImg.setAttribute('width', image.width);
      if (isGallery || !image.height) lightboxImg.removeAttribute('height');
      else lightboxImg.setAttribute('height', image.height);
      if (options.animate && !reduceMotion) {
        lightboxImg.classList.remove('is-switching');
        void lightboxImg.offsetWidth;
        lightboxImg.classList.add('is-switching');
      }
    }

    if (lightboxPrev) lightboxPrev.hidden = !isGallery;
    if (lightboxNext) lightboxNext.hidden = !isGallery;
    if (lightboxCounter) lightboxCounter.hidden = !isGallery;
    if (lightboxIndexEl) lightboxIndexEl.textContent = String(lightboxIndex + 1);
    if (lightboxTotalEl) lightboxTotalEl.textContent = String(lightboxGallery.length);

    const note = cleanNote(image.caption);
    if (lightboxCaption) {
      lightboxCaption.textContent = note;
      lightboxCaption.hidden = !note;
    }
    if (lightboxStatus) {
      lightboxStatus.textContent = isGallery
        ? `第 ${lightboxIndex + 1} 张，共 ${lightboxGallery.length} 张${note ? '：' + note : ''}`
        : '';
    }

    updateLightboxThumbs();
    preloadLightboxNeighbors();
  }

  function goToLightboxImage(index, focusThumb = false) {
    const total = lightboxGallery.length;
    if (total < 2) return;
    lightboxIndex = ((index % total) + total) % total;
    renderLightboxImage({ animate: true });
    if (focusThumb && lightboxThumbs) {
      const thumb = $(`[data-lightbox-thumb="${lightboxIndex}"]`, lightboxThumbs);
      if (thumb) thumb.focus({ preventScroll: true });
    }
  }

  function openLightbox(data, trigger) {
    if (!lightbox) return;
    const images = Array.isArray(data.images)
      ? data.images.filter((image) => image && image.src)
      : (data.img ? [{
        src: data.img,
        alt: data.alt || data.title || '',
        caption: cleanNote(data.caption),
        width: data.width,
        height: data.height
      }] : []);
    if (!images.length) return;

    if (menuOpen) closeMenu(false);
    if (imagePanelOpen) closeImageManager(false);
    lightboxLastFocus = trigger || document.activeElement;
    lightboxOpen = true;
    lightboxBase = data;
    lightboxGallery = images;
    lightboxIndex = 0;

    if (lightboxType) lightboxType.textContent = data.type || '';
    if (lightboxTitle) lightboxTitle.textContent = data.title || '';
    if (lightboxDesc) {
      lightboxDesc.textContent = data.desc || '';
      lightboxDesc.hidden = !data.desc;
    }

    renderLightboxThumbs();
    renderLightboxImage();
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

  function openProjectGallery(project) {
    if (!project || !project.images.length) return;
    openLightbox({
      images: project.images,
      type: project.type,
      title: project.title,
      desc: project.desc
    }, project.trigger);
  }

  function closeLightbox(restoreFocus = true) {
    if (!lightbox || !lightboxOpen) return;
    lightboxOpen = false;
    swipeStartX = null;
    swipeStartY = null;
    swipePointerId = null;
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

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => goToLightboxImage(lightboxIndex - 1));
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => goToLightboxImage(lightboxIndex + 1));
  }
  if (lightboxThumbs) {
    lightboxThumbs.addEventListener('click', (event) => {
      if (!event.target || typeof event.target.closest !== 'function') return;
      const thumb = event.target.closest('[data-lightbox-thumb]');
      if (!thumb) return;
      goToLightboxImage(Number(thumb.dataset.lightboxThumb));
    });
  }

  if (lightboxStage) {
    lightboxStage.addEventListener('pointerdown', (event) => {
      if (!lightboxOpen || lightboxGallery.length < 2 || event.button !== 0) return;
      if (event.target && event.target.closest && event.target.closest('button')) return;
      swipeStartX = event.clientX;
      swipeStartY = event.clientY;
      swipePointerId = event.pointerId;
      try { lightboxStage.setPointerCapture(event.pointerId); }
      catch (error) { /* pointer capture is a progressive enhancement */ }
    });
    lightboxStage.addEventListener('pointerup', (event) => {
      if (swipeStartX === null || event.pointerId !== swipePointerId) return;
      const deltaX = event.clientX - swipeStartX;
      const deltaY = event.clientY - swipeStartY;
      swipeStartX = null;
      swipeStartY = null;
      swipePointerId = null;
      if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        goToLightboxImage(lightboxIndex + (deltaX < 0 ? 1 : -1));
      }
    });
    lightboxStage.addEventListener('pointercancel', () => {
      swipeStartX = null;
      swipeStartY = null;
      swipePointerId = null;
    });
  }

  projectStates.forEach((project) => {
    if (!project.trigger) return;
    project.trigger.addEventListener('click', () => openProjectGallery(project));
  });

  if (lightboxImg) {
    lightboxImg.addEventListener('animationend', () => lightboxImg.classList.remove('is-switching'));
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
      } else if (projectTextEditing) {
        event.preventDefault();
        setProjectEditing(false);
        if (projectTextEditBtn) projectTextEditBtn.focus({ preventScroll: true });
      }
      return;
    }
    if (lightboxOpen && lightboxGallery.length > 1) {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToLightboxImage(lightboxIndex + 1);
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToLightboxImage(lightboxIndex - 1);
        return;
      }
      if (event.key === 'Home') {
        event.preventDefault();
        goToLightboxImage(0);
        return;
      }
      if (event.key === 'End') {
        event.preventDefault();
        goToLightboxImage(lightboxGallery.length - 1);
        return;
      }
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
  const imageManagerExport = $('#imageManagerExport');
  const imageManagerOpenBtn = $('#imageManagerOpen');
  const IMAGE_STORAGE_PREFIX = 'nresume:image:';
  const NOTE_STORAGE_PREFIX = 'nresume:note:';
  const IMAGE_SLOT_DEFS = [
    { key: 'avatar', group: '头像与 IP', label: '个人头像', spec: '1:1 · 建议 720 × 720' },
    { key: 'mascot-head', group: '头像与 IP', label: '圆形 IP 头像', spec: '透明背景 · 方形' },
    { key: 'mascot-body', group: '头像与 IP', label: '全身 IP 小人', spec: '透明背景 · 竖图' },
    { key: 'life-1', group: '兴趣爱好', label: '跳舞 · Dancing', spec: '3:4 竖图' },
    { key: 'life-2', group: '兴趣爱好', label: '烹饪 · Cooking', spec: '3:4 竖图' },
    { key: 'life-3', group: '兴趣爱好', label: '烘焙 · Baking', spec: '3:4 竖图' },
    { key: 'life-4', group: '兴趣爱好', label: '羽毛球 · Badminton', spec: '3:4 竖图' }
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
      custom: false,
      note: ''
    };
  }).filter(Boolean);
  const imageSlotMap = new Map(imageSlots.map((slot) => [slot.key, slot]));
  const pendingNoteSaves = new Map();
  let fileRequest = null;
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

  function readStoredNote(key) {
    try { return cleanNote(localStorage.getItem(NOTE_STORAGE_PREFIX + key)); }
    catch (error) { return ''; }
  }

  function saveStoredNote(key, note) {
    try {
      const value = cleanNote(note);
      if (value) localStorage.setItem(NOTE_STORAGE_PREFIX + key, value);
      else localStorage.removeItem(NOTE_STORAGE_PREFIX + key);
      return true;
    } catch (error) {
      return false;
    }
  }

  function removeStoredNote(key) {
    try { localStorage.removeItem(NOTE_STORAGE_PREFIX + key); }
    catch (error) { /* storage can be unavailable; preview still works */ }
  }

  function scheduleNoteSave(key, callback) {
    cancelNoteSave(key);
    const timer = window.setTimeout(() => {
      pendingNoteSaves.delete(key);
      if (!callback()) showToast('备注已更新，但浏览器存储空间不足，刷新后可能丢失');
    }, 450);
    pendingNoteSaves.set(key, { timer, callback });
  }

  function flushNoteSave(key) {
    const pending = pendingNoteSaves.get(key);
    if (!pending) return;
    window.clearTimeout(pending.timer);
    pendingNoteSaves.delete(key);
    if (!pending.callback()) showToast('备注已更新，但浏览器存储空间不足，刷新后可能丢失');
  }

  function cancelNoteSave(key) {
    const pending = pendingNoteSaves.get(key);
    if (!pending) return;
    window.clearTimeout(pending.timer);
    pendingNoteSaves.delete(key);
  }

  function flushAllNoteSaves() {
    [...pendingNoteSaves.keys()].forEach(flushNoteSave);
  }

  function applySlotNote(slot) {
    const note = cleanNote(slot.note);
    if (slot.img) {
      if (note) slot.img.title = note;
      else slot.img.removeAttribute('title');
    }
    if (slot.trigger) {
      if (note) slot.trigger.title = note;
      else slot.trigger.removeAttribute('title');
    }
    if (slot.resetBtn) slot.resetBtn.hidden = !(slot.custom || note);
  }

  function updateImageSlotUI(slot) {
    if (slot.thumbImg) slot.thumbImg.src = slot.img.src;
    if (slot.card) slot.card.classList.toggle('has-custom', slot.custom);
    if (slot.resetBtn) slot.resetBtn.hidden = !(slot.custom || cleanNote(slot.note));
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

  function buildSingleSlotCard(slot) {
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

    const noteLabel = document.createElement('label');
    noteLabel.className = 'img-slot__note';
    const noteInput = document.createElement('input');
    noteInput.type = 'text';
    noteInput.maxLength = NOTE_MAX_LENGTH;
    noteInput.value = slot.note || '';
    noteInput.placeholder = slot.group === '兴趣爱好' ? '备注，会显示在弹窗中' : '添加图片备注…';
    noteInput.dataset.slotNote = slot.key;
    noteInput.setAttribute('aria-label', `${slot.label}的图片备注`);
    noteLabel.appendChild(noteInput);

    card.append(thumb, info, actions, noteLabel);
    slot.card = card;
    slot.thumbImg = thumbImg;
    slot.resetBtn = reset;
    updateImageSlotUI(slot);
    return card;
  }

  function buildGalleryBlock(project) {
    const block = document.createElement('section');
    block.className = 'img-gallery';
    block.dataset.galleryBlock = project.key;

    const head = document.createElement('header');
    head.className = 'img-gallery__head';
    const info = document.createElement('div');
    const label = document.createElement('p');
    label.className = 'img-gallery__label';
    label.textContent = project.label;
    const spec = document.createElement('p');
    spec.className = 'img-gallery__spec';
    spec.textContent = `${project.images.length} 张 · 最多 ${PROJECT_MAX_IMAGES} 张 · 建议 16:10 横图`;
    info.append(label, spec);

    const headActions = document.createElement('div');
    headActions.className = 'img-gallery__head-actions';
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'img-slot__reset';
    reset.dataset.galleryReset = project.key;
    reset.textContent = '恢复默认';
    reset.hidden = !project.custom;
    reset.setAttribute('aria-label', `恢复「${project.label}」的默认图片`);
    headActions.appendChild(reset);
    head.append(info, headActions);

    const grid = document.createElement('div');
    grid.className = 'img-gallery__grid';

    project.images.forEach((image, index) => {
      const item = document.createElement('figure');
      item.className = 'img-gallery__item';

      const thumbWrap = document.createElement('div');
      thumbWrap.className = 'img-gallery__thumb';
      const thumb = document.createElement('img');
      thumb.src = image.src;
      thumb.alt = '';
      thumb.loading = 'lazy';
      thumb.decoding = 'async';

      const indexBadge = document.createElement('span');
      indexBadge.className = 'img-gallery__index';
      indexBadge.textContent = `图片 ${index + 1}`;

      const actions = document.createElement('div');
      actions.className = 'img-gallery__actions';
      const replace = document.createElement('button');
      replace.type = 'button';
      replace.className = 'img-gallery__action';
      replace.dataset.galleryReplace = project.key;
      replace.dataset.index = String(index);
      replace.textContent = '替换';
      replace.setAttribute('aria-label', `替换「${project.label}」的第 ${index + 1} 张图片`);
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'img-gallery__action img-gallery__action--muted';
      remove.dataset.galleryRemove = project.key;
      remove.dataset.index = String(index);
      remove.textContent = '移除';
      remove.disabled = project.images.length <= 1;
      remove.setAttribute('aria-label', `移除「${project.label}」的第 ${index + 1} 张图片`);
      if (remove.disabled) remove.title = '至少保留一张图片';
      actions.append(replace, remove);
      thumbWrap.append(thumb, indexBadge, actions);

      const noteLabel = document.createElement('label');
      noteLabel.className = 'img-gallery__note';
      const noteInput = document.createElement('input');
      noteInput.type = 'text';
      noteInput.maxLength = NOTE_MAX_LENGTH;
      noteInput.value = image.caption || '';
      noteInput.placeholder = '备注，如：首页 / 数据看板';
      noteInput.dataset.galleryNote = project.key;
      noteInput.dataset.galleryIndex = String(index);
      noteInput.setAttribute('aria-label', `第 ${index + 1} 张图片的备注`);
      noteLabel.appendChild(noteInput);

      item.append(thumbWrap, noteLabel);
      grid.appendChild(item);
    });

    if (project.images.length < PROJECT_MAX_IMAGES) {
      const add = document.createElement('button');
      add.type = 'button';
      add.className = 'img-gallery__add';
      add.dataset.galleryAdd = project.key;
      add.setAttribute('aria-label', `向「${project.label}」添加图片`);
      const plus = document.createElement('span');
      plus.className = 'img-gallery__add-icon';
      plus.setAttribute('aria-hidden', 'true');
      plus.textContent = '+';
      const text = document.createElement('span');
      text.textContent = '添加图片';
      add.append(plus, text);
      grid.appendChild(add);
    }

    block.append(head, grid);
    project.managerEl = block;
    return block;
  }

  function buildImageManager() {
    if (!imageManagerBody) return;
    const groups = new Map();
    imageSlots.forEach((slot) => {
      if (!groups.has(slot.group)) groups.set(slot.group, []);
      groups.get(slot.group).push(slot);
    });

    ['头像与 IP', '项目图片', '兴趣爱好'].forEach((groupName) => {
      const group = document.createElement('section');
      group.className = 'img-manager__group';

      const title = document.createElement('h3');
      title.className = 'img-manager__group-title';
      title.textContent = groupName;
      group.appendChild(title);

      if (groupName === '项目图片') {
        const list = document.createElement('div');
        list.className = 'img-gallery-list';
        projectStates.forEach((project) => list.appendChild(buildGalleryBlock(project)));
        group.appendChild(list);
      } else {
        const grid = document.createElement('div');
        grid.className = 'img-manager__grid';
        (groups.get(groupName) || []).forEach((slot) => grid.appendChild(buildSingleSlotCard(slot)));
        group.appendChild(grid);
      }

      imageManagerBody.appendChild(group);
    });
  }

  function renderProjectGalleryManager(project) {
    if (!project.managerEl || !project.managerEl.parentNode) return;
    const current = project.managerEl;
    const next = buildGalleryBlock(project);
    current.replaceWith(next);
  }

  function restoreProjectManagerFocus(project, action, index = 0) {
    window.requestAnimationFrame(() => {
      let target = null;
      if (action === 'replace') {
        target = $(`[data-gallery-replace="${project.key}"][data-index="${index}"]`, imageManager);
      }
      if (!target) target = $(`[data-gallery-add="${project.key}"]`, imageManager);
      if (target) target.focus({ preventScroll: true });
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
    flushAllNoteSaves();
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
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    return new Promise((resolve, reject) => {
      if (!file || acceptedTypes.indexOf(file.type) === -1) {
        reject(new Error('type'));
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        reject(new Error('size'));
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
    fileRequest = { mode: 'single', slot, trigger: trigger || null };
    imageManagerInput.multiple = false;
    imageManagerInput.value = '';
    imageManagerInput.click();
  }

  function chooseGalleryImage(mode, project, index, trigger) {
    if (!project || !imageManagerInput) return;
    fileRequest = { mode, project, index, trigger: trigger || null };
    imageManagerInput.multiple = mode === 'gallery-add';
    imageManagerInput.value = '';
    imageManagerInput.click();
  }

  function resetImageSlot(key) {
    const slot = imageSlotMap.get(key);
    if (!slot) return;
    cancelNoteSave(`slot:${key}`);
    restoreImage(slot);
    removeStoredImage(key);
    removeStoredNote(key);
    slot.note = '';
    applySlotNote(slot);
    updateImageSlotUI(slot);
    const noteInput = imageManager ? $(`[data-slot-note="${key}"]`, imageManager) : null;
    if (noteInput) noteInput.value = '';
    window.requestAnimationFrame(() => {
      const choose = imageManager ? $(`[data-slot-choose="${key}"]`, imageManager) : null;
      if (choose) choose.focus({ preventScroll: true });
    });
    showToast(`已恢复「${slot.label}」的默认图片和备注`);
  }

  function resetProjectGallery(project) {
    if (!project) return;
    cancelNoteSave(`gallery:${project.key}`);
    project.images = project.defaults.map((image) => ({ ...image }));
    project.custom = false;
    removeStoredGallery(project.key);
    updateProjectGalleryUI(project);
    renderProjectGalleryManager(project);
    restoreProjectManagerFocus(project, 'add');
    showToast(`已恢复「${project.label}」的默认图片和备注`);
  }

  function removeProjectImage(project, index) {
    if (project.images.length <= 1) {
      showToast('项目至少保留一张图片');
      return;
    }
    project.images.splice(index, 1);
    project.custom = true;
    const saved = saveStoredGallery(project.key, project.images);
    updateProjectGalleryUI(project);
    renderProjectGalleryManager(project);
    restoreProjectManagerFocus(project, 'replace', Math.min(index, project.images.length - 1));
    showToast(saved
      ? '已移除这张项目图片'
      : '已移除，但浏览器存储空间不足，刷新后会恢复默认');
  }

  function replaceProjectImage(project, index, dataUrl) {
    const previous = project.images[index] || {};
    project.images[index] = {
      src: dataUrl,
      alt: `${project.title} 项目图片 ${index + 1}`,
      caption: previous.caption || ''
    };
    project.custom = true;
    const saved = saveStoredGallery(project.key, project.images);
    updateProjectGalleryUI(project);
    renderProjectGalleryManager(project);
    restoreProjectManagerFocus(project, 'replace', index);
    showToast(saved
      ? `已替换「${project.label}」的第 ${index + 1} 张图片`
      : '已预览，但浏览器存储空间不足，刷新后会恢复默认');
  }

  function addProjectImages(project, dataUrls) {
    const room = PROJECT_MAX_IMAGES - project.images.length;
    if (room <= 0) return { added: 0, saved: true };
    const additions = dataUrls.slice(0, room).map((src, index) => ({
      src,
      alt: `${project.title} 项目图片 ${project.images.length + index + 1}`,
      caption: ''
    }));
    project.images = project.images.concat(additions);
    project.custom = true;
    const saved = saveStoredGallery(project.key, project.images);
    updateProjectGalleryUI(project);
    renderProjectGalleryManager(project);
    restoreProjectManagerFocus(project, 'add');
    return { added: additions.length, saved };
  }

  function handleNoteEdit(input, commit) {
    if (!input || typeof input.getAttribute !== 'function') return;
    const slotKey = input.getAttribute('data-slot-note');
    if (slotKey) {
      const slot = imageSlotMap.get(slotKey);
      if (!slot) return;
      let value = input.value.slice(0, NOTE_MAX_LENGTH);
      if (commit) {
        value = cleanNote(value);
        if (input.value !== value) input.value = value;
      }
      slot.note = value;
      applySlotNote(slot);
      if (commit) flushNoteSave(`slot:${slotKey}`);
      else scheduleNoteSave(`slot:${slotKey}`, () => saveStoredNote(slotKey, slot.note));
      return;
    }

    const projectKey = input.getAttribute('data-gallery-note');
    if (!projectKey) return;
    const project = projectStates.get(projectKey);
    const index = Number(input.getAttribute('data-gallery-index'));
    if (!project || !project.images[index]) return;
    let value = input.value.slice(0, NOTE_MAX_LENGTH);
    if (commit) {
      value = cleanNote(value);
      if (input.value !== value) input.value = value;
    }
    project.images[index].caption = value;
    project.custom = true;
    const reset = imageManager ? $(`[data-gallery-reset="${project.key}"]`, imageManager) : null;
    if (reset) reset.hidden = false;
    if (commit) flushNoteSave(`gallery:${project.key}`);
    else scheduleNoteSave(`gallery:${project.key}`, () => saveStoredGallery(project.key, project.images));
  }

  imageSlots.forEach((slot) => {
    slot.note = readStoredNote(slot.key) || cleanNote(slot.img.dataset.note || '');
    applySlotNote(slot);
  });
  buildImageManager();
  imageSlots.forEach((slot) => {
    const stored = readStoredImage(slot.key);
    if (stored) applyImage(slot, stored);
    else updateImageSlotUI(slot);
  });
  window.addEventListener('beforeunload', flushAllNoteSaves);

  function collectPageSnapshot() {
    flushAllNoteSaves();
    flushAllProjectTextSaves();

    const slots = {};
    imageSlots.forEach((slot) => {
      slots[slot.key] = {
        src: slot.img.getAttribute('src') || '',
        note: cleanNote(slot.note),
        alt: slot.img.getAttribute('alt') || ''
      };
    });

    const galleries = {};
    projectStates.forEach((project, key) => {
      galleries[key] = project.images.map((image) => ({
        src: image.src,
        alt: image.alt || '',
        caption: cleanNote(image.caption)
      }));
    });

    const projectText = {};
    const projectMeta = {};
    projectTextCards.forEach((project, key) => {
      const fields = {};
      project.fields.forEach((field, fieldKey) => {
        fields[fieldKey] = cleanProjectText(field.textContent, projectFieldLimit(fieldKey));
      });
      projectText[key] = fields;
      projectMeta[key] = {
        label: project.label,
        type: project.type,
        title: project.title,
        desc: project.desc
      };
    });

    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      origin: location.origin,
      slots,
      galleries,
      projectText,
      projectMeta
    };
  }

  function snapshotHasChanges() {
    if (imageSlots.some((slot) => slot.custom || cleanNote(slot.note))) return true;
    if ([...projectStates.values()].some((project) => project.custom)) return true;
    return [...projectTextCards.values()].some((project) => {
      if (Object.keys(project.textOverrides || {}).length) return true;
      let changed = false;
      project.fields.forEach((field, fieldKey) => {
        const value = cleanProjectText(field.textContent, projectFieldLimit(fieldKey));
        if (value !== project.textDefaults[fieldKey]) changed = true;
      });
      return changed;
    });
  }

  function exportPageSnapshot() {
    if (!snapshotHasChanges()) {
      showToast('当前浏览器里还没有改过的内容');
      return;
    }

    const snapshot = collectPageSnapshot();
    const now = new Date();
    const pad = (value) => String(value).padStart(2, '0');
    const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nresume-edits-${stamp}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 2000);
    showToast('已导出修改文件，请把它放入项目文件夹');
  }

  if (imageManagerExport) {
    imageManagerExport.addEventListener('click', exportPageSnapshot);
  }

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
      if (reset) {
        resetImageSlot(reset.getAttribute('data-slot-reset'));
        return;
      }
      const galleryAdd = event.target.closest('[data-gallery-add]');
      if (galleryAdd) {
        chooseGalleryImage('gallery-add', projectStates.get(galleryAdd.dataset.galleryAdd), null, galleryAdd);
        return;
      }
      const galleryReplace = event.target.closest('[data-gallery-replace]');
      if (galleryReplace) {
        chooseGalleryImage(
          'gallery-replace',
          projectStates.get(galleryReplace.dataset.galleryReplace),
          Number(galleryReplace.dataset.index),
          galleryReplace
        );
        return;
      }
      const galleryRemove = event.target.closest('[data-gallery-remove]');
      if (galleryRemove) {
        removeProjectImage(
          projectStates.get(galleryRemove.dataset.galleryRemove),
          Number(galleryRemove.dataset.index)
        );
        return;
      }
      const galleryReset = event.target.closest('[data-gallery-reset]');
      if (galleryReset) {
        resetProjectGallery(projectStates.get(galleryReset.dataset.galleryReset));
      }
    });

    imageManagerBody.addEventListener('input', (event) => {
      handleNoteEdit(event.target, false);
    });
    imageManagerBody.addEventListener('change', (event) => {
      handleNoteEdit(event.target, true);
    });
  }

  if (imageManagerResetAll) {
    imageManagerResetAll.addEventListener('click', () => {
      let changed = false;
      imageSlots.forEach((slot) => {
        cancelNoteSave(`slot:${slot.key}`);
        if (slot.custom || cleanNote(slot.note)) changed = true;
        restoreImage(slot);
        slot.note = '';
        applySlotNote(slot);
        updateImageSlotUI(slot);
        removeStoredImage(slot.key);
        removeStoredNote(slot.key);
        const noteInput = imageManager ? $(`[data-slot-note="${slot.key}"]`, imageManager) : null;
        if (noteInput) noteInput.value = '';
      });
      projectStates.forEach((project) => {
        cancelNoteSave(`gallery:${project.key}`);
        if (project.custom) changed = true;
        project.images = project.defaults.map((image) => ({ ...image }));
        project.custom = false;
        removeStoredGallery(project.key);
        updateProjectGalleryUI(project);
        renderProjectGalleryManager(project);
      });
      showToast(changed ? '已恢复全部默认图片和备注' : '当前已经是默认图片和备注');
    });
  }

  if (imageManagerInput) {
    const imageErrorMessages = {
      type: '请选择 JPG / PNG / WebP / AVIF 图片',
      size: '图片超过 20MB，请换一张',
      read: '图片读取失败，请换一张试试'
    };

    imageManagerInput.addEventListener('cancel', () => {
      const request = fileRequest;
      fileRequest = null;
      imageManagerInput.value = '';
      if (!request) return;
      if (request.mode === 'single') {
        if (request.trigger && document.contains(request.trigger)) {
          request.trigger.focus({ preventScroll: true });
        }
      } else {
        restoreProjectManagerFocus(
          request.project,
          request.mode === 'gallery-add' ? 'add' : 'replace',
          request.index || 0
        );
      }
    });

    imageManagerInput.addEventListener('change', async () => {
      const request = fileRequest;
      const files = Array.from(imageManagerInput.files || []);
      fileRequest = null;
      imageManagerInput.value = '';
      if (!request || !files.length) return;

      if (request.mode === 'single') {
        try {
          const dataUrl = await readImageFile(files[0], request.slot);
          applyImage(request.slot, dataUrl);
          const saved = saveStoredImage(request.slot.key, dataUrl);
          showToast(saved
            ? `已替换「${request.slot.label}」`
            : '已预览，但浏览器存储空间不足，刷新后会恢复默认');
        } catch (error) {
          showToast(imageErrorMessages[error.message] || '图片读取失败，请换一张试试');
        }
        if (request.trigger && document.contains(request.trigger)) {
          request.trigger.focus({ preventScroll: true });
        }
        return;
      }

      const project = request.project;
      if (!project) return;

      if (request.mode === 'gallery-replace') {
        try {
          const dataUrl = await readImageFile(files[0], null);
          replaceProjectImage(project, request.index, dataUrl);
        } catch (error) {
          showToast(imageErrorMessages[error.message] || '图片读取失败，请换一张试试');
          restoreProjectManagerFocus(project, 'replace', request.index || 0);
        }
        return;
      }

      if (request.mode === 'gallery-add') {
        const room = PROJECT_MAX_IMAGES - project.images.length;
        if (room <= 0) {
          showToast(`每个项目最多 ${PROJECT_MAX_IMAGES} 张图片`);
          restoreProjectManagerFocus(project, 'add');
          return;
        }
        const selected = files.slice(0, room);
        const extra = files.length - selected.length;
        showToast(`正在处理 ${selected.length} 张图片…`);
        const dataUrls = [];
        let failed = 0;
        let firstError = '';
        for (const file of selected) {
          try {
            dataUrls.push(await readImageFile(file, null));
          } catch (error) {
            failed += 1;
            if (!firstError) firstError = error.message;
          }
        }
        if (dataUrls.length) {
          const result = addProjectImages(project, dataUrls);
          let message = result.saved
            ? `已添加 ${result.added} 张项目图片`
            : `已预览 ${result.added} 张图片，但浏览器存储空间不足，刷新后会恢复默认`;
          const notes = [];
          if (failed) notes.push(`${failed} 张读取失败`);
          if (extra > 0) notes.push(`${extra} 张超过 ${PROJECT_MAX_IMAGES} 张上限未添加`);
          if (notes.length) message += `；${notes.join('；')}`;
          showToast(message);
        } else {
          showToast(imageErrorMessages[firstError] || '图片读取失败，请换一张试试');
          restoreProjectManagerFocus(project, 'add');
        }
      }
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

  /* ---------- Life deck ---------- */
  const deck = $('#lifeDeck');
  const deckStage = $('.deck-stage');
  const deckToggle = $('#deckToggle');
  const deckCards = $$('.deck-card');
  const lifeStatus = $('#lifeStatus');
  const MAX_VISIBLE_DEPTH = 4;
  let deckSpread = false;

  function renderDeck(announce = false) {
    if (deck) deck.classList.toggle('is-spread', deckSpread);
    if (deckStage) deckStage.classList.toggle('is-spread', deckSpread);

    deckCards.forEach((card, index) => {
      const label = `${card.dataset.title} ${card.dataset.desc}`;
      card.style.setProperty('--i', index);
      card.classList.toggle('is-top', !deckSpread && index === 0);
      card.classList.toggle('is-out', !deckSpread && index >= MAX_VISIBLE_DEPTH);

      if (deckSpread) {
        card.tabIndex = -1;
        card.removeAttribute('aria-hidden');
        card.removeAttribute('aria-label');
      } else {
        const stackedAway = index >= MAX_VISIBLE_DEPTH;
        card.tabIndex = stackedAway ? -1 : 0;
        if (stackedAway) card.setAttribute('aria-hidden', 'true');
        else card.removeAttribute('aria-hidden');
        card.setAttribute('aria-label', `展开全部兴趣图片：${label}`);
      }
    });

    if (deckToggle) {
      deckToggle.setAttribute('aria-expanded', String(deckSpread));
      const toggleLabel = deckToggle.querySelector('.deck-toggle__label');
      const toggleIcon = deckToggle.querySelector('.deck-toggle__icon');
      if (toggleLabel) toggleLabel.textContent = deckSpread ? '收起' : '展开';
      if (toggleIcon) toggleIcon.textContent = deckSpread ? '↙' : '↗';
    }

    if (lifeStatus && announce) {
      lifeStatus.textContent = deckSpread
        ? '已展开全部 4 张兴趣图片'
        : '已收起兴趣卡牌';
    }
  }

  function setDeckSpread(spread) {
    if (deckSpread === spread) return;
    deckSpread = spread;
    renderDeck(true);
  }

  deckCards.forEach((card) => {
    card.addEventListener('click', () => {
      if (!deckSpread) setDeckSpread(true);
    });
  });

  if (deckToggle) {
    deckToggle.addEventListener('click', () => setDeckSpread(!deckSpread));
  }

  if (deck) renderDeck();

  /* ---------- Expose a tiny reset for bfcache ---------- */
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    if (lightboxOpen) closeLightbox(false);
    if (menuOpen) closeMenu(false);
  });
})();
