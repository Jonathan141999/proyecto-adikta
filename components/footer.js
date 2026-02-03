class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-col footer-brand">
            <h4>Adikt@ PC</h4>
            <p>Soluciones tecnológicas integrales para el hogar, estudio y negocio. Calidad y confianza en cada equipo.</p>
          </div>

          <div class="footer-col footer-nav">
            <h5>NAVEGACIÓN</h5>
            <ul>
              <li><a href="index.html">Inicio</a></li>
              <li><a href="productos.html">Productos</a></li>
              <li><a href="servicios.html">Servicios</a></li>
              <li><a href="nosotros.html">Nosotros</a></li>
            </ul>
          </div>

          <div class="footer-col footer-contact">
            <h5>CONTACTO</h5>
            <ul>
              <li><i class="fa-solid fa-phone"></i> 02 2046 510</li>
              <li><i class="fa-brands fa-whatsapp"></i> +593 98 3868 358</li>
              <li><i class="fa-solid fa-envelope"></i> informacion@represmundial.com</li>
            </ul>
          </div>

          <div class="footer-col footer-support">
            <h5>SOPORTE</h5>
            <ul>
              <li><a href="legal.html">Garantía</a></li>
              <li><a href="legal.html">Términos y condiciones</a></li>
              <li><a href="legal.html">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-bottom-left">© 2026 Adikt@ PC — Representaciones Internacionales REPRES MUNDIAL CÍA. LTDA.</div>
          <div class="footer-bottom-right">Todos los derechos reservados.</div>
        </div>
      </footer>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);

