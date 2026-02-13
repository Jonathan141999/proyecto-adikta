class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <div class="logo">
          <img src="../assets/img/logo.jpeg" alt="Repres Mundial Cia. Ltda. - Adikt@ PC">
        </div>
        <button class="mobile-menu-btn" aria-label="Abrir menu">
          <i class="fa-solid fa-bars"></i>
        </button>
        <nav class="main-nav">
          <ul>
            <li><a href="${this.getLangPath('index.html')}" class="${this.isActive('index.html')}" data-i18n="nav_home">Inicio</a></li>
            <li class="nav-item dropdown" id="alianzasNav">
              <a href="#" class="dropdown-toggle" id="alianzasToggle" aria-haspopup="true" aria-expanded="false"><span data-i18n="nav_alliances">Alianzas</span> <i class="fa-solid fa-caret-down"></i></a>
              <div class="dropdown-menu alianzas-panel" role="menu" aria-label="Alianzas Panel">
                <div class="alianzas-content">
                  <div class="alianzas-list">
                    <div class="alianza-entry">
                      <a class="alliance-item" href="https://represmundial.com/" target="_blank" rel="noopener">REPRESMUNDIAL CIA. LTDA.</a>
                      <div class="alliance-info">Rio Conambo e5-05 Quito - Ecuador<br>Telefono: +593 2046510</div>
                    </div>
                    <div class="alianza-entry">
                      <a class="alliance-item" href="https://tecintec.com/" target="_blank" rel="noopener">TECINTEC</a>
                      <div class="alliance-info">1861 NW S River Dr, Miami, FL, 33125 Terrazas, Ofic.2301<br>Telefonos: +1 (645) 223-5620 / +593 2046796</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li><a href="${this.getLangPath('productos.html')}" class="${this.isActive('productos.html')}" data-i18n="nav_products">Productos</a></li>
            <li><a href="${this.getLangPath('servicios.html')}" class="${this.isActive('servicios.html')}" data-i18n="nav_services">Servicios</a></li>
            <li><a href="${this.getLangPath('nosotros.html')}" class="${this.isActive('nosotros.html')}" data-i18n="nav_about">Nosotros</a></li>
            <li><a href="${this.getLangPath('contacto.html')}" class="${this.isActive('contacto.html')}" data-i18n="nav_contact">Contacto</a></li>
          </ul>

          <div class="lang-switcher" id="langSwitcher">
            <button id="langSwitch" type="button" aria-label="Cambiar idioma / Change language" class="lang-trigger" aria-haspopup="true" aria-expanded="false">
              <span class="lang-flag lang-flag-es" id="langCurrentFlag" aria-hidden="true"></span>
              <span class="lang-current-label" id="langCurrentLabel">ES</span>
              <i class="fa-solid fa-chevron-down lang-chevron" aria-hidden="true"></i>
            </button>
            <div class="lang-menu" id="langMenu" role="menu" aria-label="Language selector">
              <button type="button" class="lang-option" data-lang-option="es" role="menuitem">
                <span class="lang-flag lang-flag-es" aria-hidden="true"></span>
                <span class="lang-option-label">Espanol</span>
              </button>
              <button type="button" class="lang-option" data-lang-option="en" role="menuitem">
                <span class="lang-flag lang-flag-en" aria-hidden="true"></span>
                <span class="lang-option-label">English</span>
              </button>
            </div>
          </div>
        </nav>
      </header>
    `;

    const langSwitcher = this.querySelector('#langSwitcher');
    const langBtn = this.querySelector('#langSwitch');
    const langCurrentFlag = this.querySelector('#langCurrentFlag');
    const langCurrentLabel = this.querySelector('#langCurrentLabel');
    const langOptions = this.querySelectorAll('[data-lang-option]');

    if (langSwitcher && langBtn) {
      const LANG_META = {
        es: { flagClass: 'lang-flag-es', code: 'ES' },
        en: { flagClass: 'lang-flag-en', code: 'EN' }
      };

      function updateLangUI() {
        const current = (typeof window.currentLang === 'string' && window.currentLang === 'en') ? 'en' : 'es';
        const meta = LANG_META[current];
        if (langCurrentFlag) langCurrentFlag.className = 'lang-flag ' + meta.flagClass;
        if (langCurrentLabel) langCurrentLabel.textContent = meta.code;
        langOptions.forEach(function (opt) {
          const isActive = opt.getAttribute('data-lang-option') === current;
          opt.classList.toggle('active', isActive);
        });
      }

      function closeLangMenu() {
        langSwitcher.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      }

      function openLangMenu() {
        langSwitcher.classList.add('open');
        langBtn.setAttribute('aria-expanded', 'true');
      }

      updateLangUI();

      langBtn.addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        if (langSwitcher.classList.contains('open')) closeLangMenu();
        else openLangMenu();
      });

      langOptions.forEach(function (opt) {
        opt.addEventListener('click', function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          const targetLang = opt.getAttribute('data-lang-option');
          closeLangMenu();
          if (typeof window.setLanguage === 'function' && targetLang) {
            window.setLanguage(targetLang, { redirect: true });
          }
        });
      });

      document.addEventListener('click', function (ev) {
        if (!langSwitcher.contains(ev.target)) {
          closeLangMenu();
        }
      });

      window.addEventListener('lang:ready', updateLangUI);
    }

    const alianzasNav = this.querySelector('#alianzasNav');
    const alianzasToggle = this.querySelector('#alianzasToggle');
    const alianzasPanel = this.querySelector('.alianzas-panel');
    if (alianzasNav && alianzasToggle && alianzasPanel) {
      let alianzasCloseTimer = null;
      function openAlianzas() {
        clearTimeout(alianzasCloseTimer);
        alianzasNav.classList.add('open');
        alianzasToggle.setAttribute('aria-expanded', 'true');
      }
      function scheduleCloseAlianzas() {
        clearTimeout(alianzasCloseTimer);
        alianzasCloseTimer = setTimeout(function () {
          alianzasNav.classList.remove('open');
          alianzasToggle.setAttribute('aria-expanded', 'false');
        }, 450);
      }

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
        it.addEventListener('mouseenter', function () {
          clearTimeout(alianzasCloseTimer);
          it.classList.add('hover');
        });
        it.addEventListener('mouseleave', function () {
          it.classList.remove('hover');
          scheduleCloseAlianzas();
        });
      });

      document.addEventListener('click', function (ev) {
        if (!alianzasNav.contains(ev.target)) {
          alianzasNav.classList.remove('open');
          alianzasToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  getLangPath(page) {
    const currentLang = document.documentElement.lang;
    if (window.location.protocol === 'file:') {
      return `../${currentLang}/${page}`;
    }
    return `/${currentLang}/${page}`;
  }

  isActive(page) {
    const currentPathname = window.location.pathname;
    const pathSegments = currentPathname.startsWith('/') ? currentPathname.substring(1).split('/') : currentPathname.split('/');
    const currentPageName = pathSegments[pathSegments.length - 1];

    return currentPageName === page ? 'active' : '';
  }
}

customElements.define('custom-navbar', CustomNavbar);
