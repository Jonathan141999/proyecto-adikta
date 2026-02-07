class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-col footer-brand">
            <h4 data-i18n="footer_brand_title">Adikt@ PC</h4>
            <p data-i18n="footer_brand_description">Soluciones tecnológicas integrales para el hogar, estudio y negocio. Calidad y confianza en cada equipo.</p>
          </div>

          <div class="footer-col footer-nav">
            <h5 data-i18n="footer_nav_title">NAVEGACIÓN</h5>
            <ul>
              <li><a href="index.html" data-i18n="nav_home">Inicio</a></li>
              <li><a href="productos.html" data-i18n="nav_products">Productos</a></li>
              <li><a href="servicios.html" data-i18n="nav_services">Servicios</a></li>
              <li><a href="nosotros.html" data-i18n="nav_about">Nosotros</a></li>
            </ul>
          </div>

          <div class="footer-col footer-contact">
            <h5 data-i18n="footer_contact_title">CONTACTO</h5>
            <ul>
              <li><i class="fa-solid fa-phone"></i> 02 2046 510</li>
              <li><i class="fa-brands fa-whatsapp"></i> +593 98 3868 358</li>
              <li><i class="fa-solid fa-envelope"></i> informacion@adiktapc.net</li>
            </ul>
          </div>

          <div class="footer-col footer-support">
            <h5 data-i18n="footer_support_title">SOPORTE</h5>
            <ul>
              <li><a href="legal.html" data-i18n="footer_warranty_link">Garantía</a></li>
              <li><a href="legal.html" data-i18n="footer_terms_link">Términos y condiciones</a></li>
              <li><a href="legal.html" data-i18n="footer_privacy_link">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-bottom-left" data-i18n="footer_copyright_left">© 2026 Adikt@ PC — Representaciones Internacionales REPRES MUNDIAL CÍA. LTDA.</div>
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

