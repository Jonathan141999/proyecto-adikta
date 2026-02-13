class CustomFooter extends HTMLElement {
  getPagePath(page) {
    const lang = document.documentElement.lang === "en" ? "en" : "es";
    const toEn = {
      "productos.html": "products.html",
      "servicios.html": "services.html",
      "nosotros.html": "about.html",
      "contacto.html": "contact.html",
      "legal.html": "terms.html"
    };
    const toEs = {
      "products.html": "productos.html",
      "services.html": "servicios.html",
      "about.html": "nosotros.html",
      "contact.html": "contacto.html",
      "terms.html": "legal.html"
    };
    return lang === "en" ? (toEn[page] || page) : (toEs[page] || page);
  }

  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-col footer-brand">
            <h4 data-i18n="footer_brand_title">Adikt@ PC</h4>
            <p data-i18n="footer_brand_description">Soluciones tecnolÃ³gicas integrales para el hogar, estudio y negocio. Calidad y confianza en cada equipo.</p>
          </div>

          <div class="footer-col footer-nav">
            <h5 data-i18n="footer_nav_title">NAVEGACIÃ“N</h5>
            <ul>
              <li><a href="${this.getPagePath('index.html')}" data-i18n="nav_home">Inicio</a></li>
              <li><a href="${this.getPagePath('productos.html')}" data-i18n="nav_products">Productos</a></li>
              <li><a href="${this.getPagePath('servicios.html')}" data-i18n="nav_services">Servicios</a></li>
              <li><a href="${this.getPagePath('nosotros.html')}" data-i18n="nav_about">Nosotros</a></li>
            </ul>
          </div>

          <div class="footer-col footer-contact">
            <h5 data-i18n="footer_contact_title">CONTACTO ECUADOR</h5>
            <ul>
              <li><i class="fa-solid fa-phone"></i> +(593) 2-204-6510</li>
              <li><i class="fa-brands fa-whatsapp"></i> +(593) 99 252 0315</li>
              <li><i class="fa-solid fa-envelope"></i> informacion@adiktapc.net</li>
            
            <h5 data-i18n="footer_contact_title_1">CONTACTO USA</h5>
              <li><i class="fa-solid fa-phone"></i> +1 (645) 223-5620 </li>
              <li><i class="fa-solid fa-envelope"></i> informacion@adiktapc.net</li>
            </ul>
          </div>

          <div class="footer-col footer-support">
            <h5 data-i18n="footer_support_title">SOPORTE</h5>
            <ul>
              <li><a href="${this.getPagePath('legal.html')}" data-i18n="footer_warranty_link">GarantÃ­a</a></li>
              <li><a href="${this.getPagePath('legal.html')}" data-i18n="footer_terms_link">TÃ©rminos y condiciones</a></li>
              <li><a href="${this.getPagePath('legal.html')}" data-i18n="footer_privacy_link">PolÃ­tica de Privacidad</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-bottom-left" data-i18n="footer_copyright_left">Â© 2026 Adikt@ PC â€” Representaciones Internacionales REPRESMUNDIAL CÃA. LTDA.</div>
          <div class="footer-bottom-right" data-i18n="footer_copyright_right">Todos los derechos reservados.</div>
        </div>
      </footer>
    `;
    // If lang.js hasn't loaded yet, wait a moment and apply translations when available
    if (typeof window.setLanguage !== 'function') {
      const _waitLangFooter = setInterval(function () {
        if (typeof window.setLanguage === 'function') {
          try { window.setLanguage(window.currentLang || document.documentElement.lang || 'es'); } catch (e) {}
          clearInterval(_waitLangFooter);
        }
      }, 80);
    }
    // Also listen for the lang ready event
    window.addEventListener('lang:ready', function (ev) {
      try {
        const lang = (ev && ev.detail && ev.detail.lang) ? ev.detail.lang : (window.currentLang || document.documentElement.lang || 'es');
        if (typeof window.setLanguage === 'function') window.setLanguage(lang);
      } catch (e) {}
    });
  }
}

customElements.define('custom-footer', CustomFooter);


