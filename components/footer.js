class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="footer-columns">
          <div>
            <h4>Adikt@ PC</h4>
            <p>Soluciones tecnológicas para hogar, estudio y negocio.</p>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li>Teléfono: 02 2046 510</li>
              <li>WhatsApp: +593 98 3868 358</li>
              <li>Email: informacion@represmundial.com</li>
            </ul>
          </div>
          <div>
            <h4>Enlaces</h4>
            <ul>
              <li><a href="productos.html">Productos</a></li>
              <li><a href="servicios.html">Servicios</a></li>
              <li><a href="soporte.html">Soporte</a></li>
              <li><a href="nosotros.html">Nosotros</a></li>
              <li><a href="legal.html">Términos y privacidad</a></li>
            </ul>
          </div>
        </div>
        <p class="footer-bottom">©2026 Adikt@ PC. Todos los derechos reservados.</p>
      </footer>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);

