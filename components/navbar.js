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
            <li><a href="index.html" class="${this.isActive('index.html')}">Inicio</a></li>
            <li><a href="productos.html" class="${this.isActive('productos.html')}">Productos</a></li>
            <li><a href="servicios.html" class="${this.isActive('servicios.html')}">Servicios</a></li>
            <li><a href="soporte.html" class="${this.isActive('soporte.html')}">Soporte</a></li>
            <li><a href="nosotros.html" class="${this.isActive('nosotros.html')}">Nosotros</a></li>
            <li><a href="contacto.html" class="${this.isActive('contacto.html')}">Contacto</a></li>
          </ul>
        </nav>
      </header>
    `;
  }

  isActive(page) {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path === page ? 'active' : '';
  }
}

customElements.define('custom-navbar', CustomNavbar);

