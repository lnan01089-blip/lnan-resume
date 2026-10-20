/* =========================================================
   廖楠 personal job-seeking homepage · 交互脚本
   原生 JavaScript，无第三方依赖
   ========================================================= */
(function () {
  "use strict";

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function getFocusable(container) {
    return $$(focusableSelector, container).filter(
      (el) => !el.hasAttribute("hidden") && el.getAttribute("aria-hidden") !== "true"
    );
  }

  function trapFocus(event, container) {
    if (event.key !== "Tab") return;
    const items = getFocusable(container);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (!container.contains(active)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function syncUiState() {
    const lightboxOpen = $("#lightbox")?.classList.contains("is-open") || false;
    const menuOpen = $("#mobileMenu")?.classList.contains("is-open") || false;
    const locked = lightboxOpen || menuOpen;
    const main = $("#main");
    const footer = $(".site-footer");
    const header = $("#siteHeader");
    if (main) main.inert = locked;
    if (footer) footer.inert = locked;
    if (header) header.inert = lightboxOpen;
    document.body.style.overflow = locked ? "hidden" : "";
  }

  /* ---------- 滚动进度条 ---------- */
  const progress = $("#scrollProgress");
  function updateProgress() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    const ratio = max > 0 ? scrolled / max : 0;
    progress.style.transform = "scaleX(" + ratio + ")";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------- 入场动画 ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const revObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            revObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => revObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- 章节高亮 + 导航 ---------- */
  const sections = $$("main section[id]");
  const navLinks = $$(".nav__link");
  const mobileLinks = $$(".mobile-menu__link");

  function setActive(id) {
    navLinks.forEach((l) => {
      const active = l.dataset.target === id;
      l.classList.toggle("is-active", active);
      if (active) l.setAttribute("aria-current", "location");
      else l.removeAttribute("aria-current");
    });
    mobileLinks.forEach((l) => {
      const active = l.getAttribute("href") === "#" + id;
      l.classList.toggle("is-active", active);
      if (active) l.setAttribute("aria-current", "location");
      else l.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window) {
    const secObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => secObserver.observe(s));
  }

  /* ---------- 经历手风琴（一次仅展开一项） ---------- */
  const accItems = $$(".acc-item");
  function setPanel(item, open) {
    const panel = $(".acc-panel", item);
    const head = $(".acc-head", item);
    if (open) {
      item.classList.add("is-open");
      head.setAttribute("aria-expanded", "true");
      panel.style.maxHeight = panel.scrollHeight + "px";
    } else {
      item.classList.remove("is-open");
      head.setAttribute("aria-expanded", "false");
      panel.style.maxHeight = "0px";
    }
  }
  accItems.forEach((item) => {
    const head = $(".acc-head", item);
    head.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");
      accItems.forEach((other) => setPanel(other, false));
      if (willOpen) setPanel(item, true);
    });
  });
  // 初始化：展开默认项（延迟以确保布局完成）
  window.addEventListener("load", () => {
    const openItem = $(".acc-item.is-open");
    if (openItem) setPanel(openItem, true);
    // 窗口变化时重新计算展开项高度
    window.addEventListener("resize", () => {
      const cur = $(".acc-item.is-open .acc-panel");
      if (cur) cur.style.maxHeight = cur.scrollHeight + "px";
    });
  });

  /* ---------- 作品灯箱 ---------- */
  const lightbox = $("#lightbox");
  const lbImg = $("#lightboxImg");
  const lbType = $("#lightboxType");
  const lbTitle = $("#lightboxTitle");
  const lbDesc = $("#lightboxDesc");
  const lbClose = $("#lightboxClose");
  let lastFocused = null;

  function openLightbox(card) {
    lastFocused = card;
    if (card.dataset.img) lbImg.src = card.dataset.img;
    else lbImg.removeAttribute("src");
    lbImg.alt = card.dataset.title || "";
    lbType.textContent = card.dataset.type || "";
    lbTitle.textContent = card.dataset.title || "";
    lbDesc.textContent = card.dataset.detail || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    syncUiState();
    requestAnimationFrame(() => lbClose.focus({ preventScroll: true }));
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    syncUiState();
    if (lastFocused) lastFocused.focus({ preventScroll: true });
  }
  $$(".pf-card").forEach((card) => {
    card.addEventListener("click", () => openLightbox(card));
  });
  $$("[data-close]", lightbox).forEach((el) =>
    el.addEventListener("click", closeLightbox)
  );
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    else trapFocus(e, lightbox);
  });

  /* ---------- 生活区筛选 ---------- */
  const filterBtns = $$(".filter__btn");
  const lifeItems = $$(".life-item");
  const filterStatus = $("#filterStatus");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      let visible = 0;
      filterBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
      lifeItems.forEach((item) => {
        const show = f === "all" || item.dataset.cat === f;
        item.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });
      if (filterStatus) filterStatus.textContent = "显示 " + visible + " 张生活切片";
    });
  });

  /* ---------- 复制邮箱 ---------- */
  const toast = $("#toast");
  let toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-show"), 2200);
  }
  const copyBtn = $("#copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.dataset.email;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const ta = document.createElement("textarea");
          ta.value = email;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        showToast("已复制邮箱：" + email);
      } catch (err) {
        showToast("复制失败，请手动复制：" + email);
      }
    });
  }

  /* ---------- 移动端菜单 ---------- */
  const menuToggle = $("#menuToggle");
  const mobileMenu = $("#mobileMenu");
  let menuLastFocus = null;

  function toggleMenu(force, restoreFocus) {
    const open = force !== undefined ? force : !mobileMenu.classList.contains("is-open");
    const shouldRestore = restoreFocus !== false;
    if (open) menuLastFocus = document.activeElement;
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    menuToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    syncUiState();
    if (open) {
      requestAnimationFrame(() => {
        const first = $(".mobile-menu__link", mobileMenu);
        if (first) first.focus({ preventScroll: true });
      });
    } else if (shouldRestore) {
      const target = menuLastFocus && menuLastFocus !== document.body ? menuLastFocus : menuToggle;
      if (target && typeof target.focus === "function") target.focus({ preventScroll: true });
    }
  }
  menuToggle.addEventListener("click", () => toggleMenu());
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = (link.getAttribute("href") || "").slice(1);
      const target = targetId ? document.getElementById(targetId) : null;
      toggleMenu(false, false);
      if (target) {
        target.setAttribute("tabindex", "-1");
        requestAnimationFrame(() => target.focus({ preventScroll: true }));
      }
    });
  });
  document.addEventListener("keydown", (e) => {
    if (!mobileMenu.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      e.preventDefault();
      toggleMenu(false);
      return;
    }
    trapFocus(e, mobileMenu);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && mobileMenu.classList.contains("is-open")) {
      toggleMenu(false, false);
    }
  });
})();
