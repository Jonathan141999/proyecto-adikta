class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <div class="logo">
          <img src="assets/img/logo.jpeg" alt="Repres Mundial Cia. Ltda. - Adikt@ PC">
        </div>
        <button class="mobile-menu-btn" aria-label="Abrir menú">
          <i class="fa-solid fa-bars"></i>
        </button>
        <nav class="main-nav">
          <ul>
            <li><a href="index.html" class="${this.isActive('index.html')}" data-i18n="nav_home">Inicio</a></li>
            <li class="nav-item dropdown" id="alianzasNav">
              <a href="#" class="dropdown-toggle" id="alianzasToggle" aria-haspopup="true" aria-expanded="false"><span data-i18n="nav_alliances">Alianzas</span> <i class="fa-solid fa-caret-down"></i></a>
              <div class="dropdown-menu alianzas-panel" role="menu" aria-label="Alianzas Panel">
                <div class="alianzas-content">
                  <div class="alianzas-list">
                    <div class="alianza-entry">
                      <a class="alliance-item" href="https://represmundial.com/" target="_blank" rel="noopener">REPRESMUNDIAL CIA. LTDA.</a>
                      <div class="alliance-info">Rio Conambo e5-05 Quito - Ecuador<br>Teléfono: +593 2046510</div>
                    </div>
                    <div class="alianza-entry">
                      <a class="alliance-item" href="https://tecintec.com/" target="_blank" rel="noopener">TECINTEC</a>
                      <div class="alliance-info">1861 NW S River Dr, Miami, FL, 33125 Terrazas, Ofic.2301<br>Teléfonos:  +1 (645) 223-5620 / +593 2046796 </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li><a href="productos.html" class="${this.isActive('productos.html')}" data-i18n="nav_products">Productos</a></li>
            <li><a href="servicios.html" class="${this.isActive('servicios.html')}" data-i18n="nav_services">Servicios</a></li>
            <li><a href="nosotros.html" class="${this.isActive('nosotros.html')}" data-i18n="nav_about">Nosotros</a></li>
            <li><a href="contacto.html" class="${this.isActive('contacto.html')}" data-i18n="nav_contact">Contacto</a></li>
          </ul>
          <button id="langSwitch" type="button" aria-label="Cambiar idioma / Change language" class="lang-switch-button"><span class="lang-switch-text">EN</span></button>
        </nav>
      </header>
    `;

    if (typeof setLanguage === 'function' && typeof currentLang !== 'undefined') {
      setLanguage(currentLang);
    }

    // If lang.js wasn't loaded yet, wait briefly until setLanguage is available and apply
    if (typeof window.setLanguage !== 'function') {
      const _waitLang = setInterval(function () {
        if (typeof window.setLanguage === 'function') {
          try { window.setLanguage(window.currentLang || document.documentElement.lang || 'es'); } catch (e) {}
          clearInterval(_waitLang);
        }
      }, 80);
    }
    // React to explicit lang ready event when available
    window.addEventListener('lang:ready', function (ev) {
      try {
        const lang = (ev && ev.detail && ev.detail.lang) ? ev.detail.lang : (window.currentLang || document.documentElement.lang || 'es');
        if (typeof window.setLanguage === 'function') window.setLanguage(lang);
        updateBtnText();
      } catch (e) {}
    });

    const langBtn = this.querySelector('#langSwitch');
    if (langBtn) {
      langBtn.type = 'button';
      const updateBtnText = function () {
        const text = (typeof window.currentLang !== 'undefined' && window.currentLang === 'en') ? 'ES' : 'EN';
        const textEl = langBtn.querySelector('.lang-switch-text');
        if (textEl) textEl.textContent = text;
        else langBtn.textContent = text;
      };
      updateBtnText();
      langBtn.addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        if (typeof window.setLanguage === 'function') {
          const next = window.currentLang === 'es' ? 'en' : 'es';
          window.setLanguage(next);
          updateBtnText();
        }
      });
    }

    const navRoot = this.querySelector('.main-nav');
    const alianzasNav = this.querySelector('#alianzasNav');
    const alianzasToggle = this.querySelector('#alianzasToggle');
    const alianzasPanel = this.querySelector('.alianzas-panel');
    if (alianzasNav && alianzasToggle && alianzasPanel) {
      let alianzasCloseTimer = null;
      function openAlianzas() { clearTimeout(alianzasCloseTimer); alianzasNav.classList.add('open'); alianzasToggle.setAttribute('aria-expanded', 'true'); }
      function scheduleCloseAlianzas() { clearTimeout(alianzasCloseTimer); alianzasCloseTimer = setTimeout(function () { alianzasNav.classList.remove('open'); alianzasToggle.setAttribute('aria-expanded', 'false'); }, 450); }

      alianzasToggle.addEventListener('click', function (e) {
        e.preventDefault();
        if (alianzasNav.classList.contains('open')) {
          alianzasNav.classList.remove('open');
          alianzasToggle.setAttribute('aria-expanded', 'false');
        } else {
          openAlianzas();
        }
      });

      alianzasPanel.addEventListener('mouseenter', openAlianzas);
      alianzasPanel.addEventListener('mouseleave', scheduleCloseAlianzas);

      const items = alianzasPanel.querySelectorAll('.alliance-item');
      items.forEach(function (it) {
        it.addEventListener('mouseenter', function () { clearTimeout(alianzasCloseTimer); it.classList.add('hover'); });
        it.addEventListener('mouseleave', function () { it.classList.remove('hover'); scheduleCloseAlianzas(); });
      });

      document.addEventListener('click', function (ev) {
        if (!alianzasNav.contains(ev.target)) {
          alianzasNav.classList.remove('open');
          alianzasToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  isActive(page) {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path === page ? 'active' : '';
  }
}

customElements.define('custom-navbar', CustomNavbar);

