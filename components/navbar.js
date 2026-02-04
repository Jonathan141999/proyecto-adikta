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
            <li><a href="productos.html" class="${this.isActive('productos.html')}" data-i18n="nav_products">Productos</a></li>
            <li><a href="servicios.html" class="${this.isActive('servicios.html')}" data-i18n="nav_services">Servicios</a></li>
            <li><a href="nosotros.html" class="${this.isActive('nosotros.html')}" data-i18n="nav_about">Nosotros</a></li>
            <li><a href="contacto.html" class="${this.isActive('contacto.html')}" data-i18n="nav_contact">Contacto</a></li>
          </ul>
          <button id="langSwitch" aria-label="Change language" class="lang-switch-button"></button>
        </nav>
      </header>
    `;

    // Ensure lang.js is loaded and functions are available
    // And call setLanguage after the button is in the DOM
    if (typeof setLanguage === 'function' && typeof currentLang !== 'undefined') {
      // Initialize language for the navbar content and the button itself
      setLanguage(currentLang);
    }
  }

  isActive(page) {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path === page ? 'active' : '';
  }
}

customElements.define('custom-navbar', CustomNavbar);

