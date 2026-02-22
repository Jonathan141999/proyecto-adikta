// ═════════════════════════════════════════════════════════
// 🛒 CARRITO GLOBAL - Agregar a todas las páginas
// ═════════════════════════════════════════════════════════
// Este script inyecta el modal de carrito y botones flotantes
// en todas las páginas de forma automática

document.addEventListener("DOMContentLoaded", () => {
  // Solo si no está ya el carrito (para no duplicar)
  if (document.getElementById("cart-overlay")) return;

  // Crear contenedor de carrito 
  const isEn = (window.currentLang === 'en' || document.documentElement.lang === 'en' || window.location.pathname.includes('/en/'));

  const labels = {
    cart_h: isEn ? "Your Cart" : "Tu Carrito",
    cart_sub: isEn ? "items" : "productos",
    checkout_h: isEn ? "Finalize Order" : "Finalizar Pedido",
    checkout_p: isEn ? "Please complete your details to register the order and coordinate via WhatsApp." : "Por favor, completa tus datos para registrar el pedido y coordinar por WhatsApp.",
    label_name: isEn ? "Full Name *" : "Nombre Completo *",
    label_wsp: isEn ? "WhatsApp Number *" : "Número de WhatsApp *",
    label_email: isEn ? "Email address (Optional)" : "Correo electrónico (Opcional)",
    btn_confirm: isEn ? "Confirm and Send to WhatsApp 🚀" : "Confirmar y enviar a WhatsApp 🚀"
  };

  const cartHTML = `
    <!-- 🛒 CART MODAL -->
    <div class="overlay" id="cart-overlay" onclick="cerrarCarritoBg(event)">
      <div class="cart-modal" onclick="event.stopPropagation()">
        <button class="modal-close-btn" onclick="cerrarCarrito()">✕</button>
        <div class="cart-h">${labels.cart_h} <span id="cart-sub">0 ${labels.cart_sub}</span></div>
        <div id="cart-body"></div>
      </div>
    </div>

    <!-- ⚠️ WHATSAPP CHOICE MODAL -->
    <div class="overlay" id="wsp-choice-overlay">
      <div class="cart-modal choice-modal">
        <div class="cart-h" style="font-size: 1.5rem; justify-content: center; margin-bottom: 1rem;">
          ${isEn ? 'How can we help you?' : '¿Cómo podemos ayudarte?'}
        </div>
        <p style="text-align: center; margin-bottom: 2rem; color: var(--text-muted);">
          ${isEn ? 'You have items in your cart. Would you like to consult or continue with your purchase?' : 'Tienes productos en tu carrito. ¿Deseas realizar una consulta o continuar con tu compra?'}
        </p>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <button class="btn-payment whatsapp-btn" onclick="continuarWhatsAppConsulta()" style="justify-content: center;">
            <div class="payment-icon-box whatsapp-box"><i class="fa-brands fa-whatsapp"></i></div>
            <span>${isEn ? 'Chat with us' : 'Chatear con nosotros'}</span>
          </button>
          <button class="btn-wsp-pay" onclick="continuarCompraNavegacion()">
            ${isEn ? 'Continue with Purchase 🛒' : 'Continuar con la Compra 🛒'}
          </button>
        </div>
        <button class="modal-close-btn" onclick="cerrarWspChoice()">✕</button>
      </div>
    </div>

    <!-- 📋 CHECKOUT FORM MODAL -->
    <div class="overlay" id="checkout-overlay" onclick="cerrarCheckoutBg(event)">
      <div class="cart-modal" onclick="event.stopPropagation()">
        <button class="modal-close-btn" onclick="cerrarCheckout()">✕</button>
        <div class="cart-h">${labels.checkout_h}</div>
        <p style="color: var(--muted); font-size: 0.85rem; margin-bottom: 1.5rem;">${labels.checkout_p}</p>
        
        <form id="checkout-form" class="checkout-form">
          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.75rem; color: var(--muted); margin-bottom: 0.4rem; text-transform: uppercase;">${labels.label_name}</label>
            <input type="text" id="checkout-nombre" required placeholder="${isEn ? 'E.g. John Doe' : 'Ej. Roberto Méndez'}" style="width: 100%; padding: 0.8rem; border-radius: 10px; background: var(--panel); border: 1px solid var(--border); color: var(--text);">
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.75rem; color: var(--muted); margin-bottom: 0.4rem; text-transform: uppercase;">${labels.label_wsp}</label>
            <input type="tel" id="checkout-whatsapp" required placeholder="${isEn ? 'E.g. 0983868358' : 'Ej. 0983868358'}" style="width: 100%; padding: 0.8rem; border-radius: 10px; background: var(--panel); border: 1px solid var(--border); color: var(--text);">
          </div>
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-size: 0.75rem; color: var(--muted); margin-bottom: 0.4rem; text-transform: uppercase;">${labels.label_email}</label>
            <input type="email" id="checkout-email" placeholder="${isEn ? 'client@example.com' : 'cliente@ejemplo.com'}" style="width: 100%; padding: 0.8rem; border-radius: 10px; background: var(--panel); border: 1px solid var(--border); color: var(--text);">
          </div>
          <button type="submit" class="btn-wsp-pay" id="confirmar-pedido-btn">
            ${labels.btn_confirm}
          </button>
        </form>
      </div>
    </div>

    <!-- 🔔 TOAST NOTIFICATIONS -->
    <div id="toast"></div>

    <!-- 🛒 CART FLOAT BUTTON (Only visible on product pages) -->
    <button class="cart-float" onclick="abrirCarrito()" title="${isEn ? 'Open cart' : 'Abrir carrito'}" id="cart-float-btn" style="display: none;">
      <span style="font-size: 1.6rem;">🛒</span>
      <span class="cart-float-count" id="cart-count-badge">0</span>
    </button>

    <!-- 💬 WHATSAPP FLOAT BUTTON -->
    <button class="wsp-float" onclick="abrirWhatsApp()" title="${isEn ? 'Contact by WhatsApp' : 'Contactar por WhatsApp'}">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </button>
  `;

  // Inyectar antes del cierre de body
  document.body.insertAdjacentHTML("beforeend", cartHTML);

  // Mostrar botón del carrito solo en páginas de productos
  const isProductPage = window.location.pathname.includes("productos.html") ||
    window.location.pathname.includes("products.html");
  const cartBtn = document.getElementById("cart-float-btn");
  if (cartBtn && isProductPage) {
    cartBtn.style.display = "flex";
  }

  // Agregar CSS si no existe
  if (!document.querySelector("link[href*='carrito.css']")) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    const scriptSrc = document.querySelector("script[src*='carrito-global.js']")?.src || "";
    if (scriptSrc.includes("/js/")) {
      link.href = scriptSrc.replace("/js/carrito-global.js", "/css/carrito.css");
    } else {
      link.href = "../assets/css/carrito.css";
    }
    document.head.appendChild(link);
  }

  // Manejar el envío del formulario de checkout
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (typeof carrito !== 'undefined') {
        const datos = {
          nombre: document.getElementById("checkout-nombre").value,
          whatsapp: document.getElementById("checkout-whatsapp").value,
          email: document.getElementById("checkout-email").value
        };
        carrito.finalizarCompra(datos);
      }
    });
  }
});

// Función para abrir WhatsApp
function abrirWhatsApp() {
  const WHATSAPP_NUMERO = "593983868358";

  // Si estamos en la página de productos, abrimos el carrito directamente
  const isProductPage = window.location.pathname.includes("productos.html") || window.location.pathname.includes("products.html");

  if (typeof carrito !== 'undefined' && carrito.items.length > 0) {
    if (isProductPage) {
      abrirCarrito();
    } else {
      // Si estamos en otra página, mostramos el choice modal
      abrirWspChoice();
    }
  } else {
    // Si no hay carrito o está vacío, simple consulta o ir a catálogo
    continuarWhatsAppConsulta();
  }
}

function abrirWspChoice() {
  const overlay = document.getElementById("wsp-choice-overlay");
  if (overlay) {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function cerrarWspChoice() {
  const overlay = document.getElementById("wsp-choice-overlay");
  if (overlay) {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function continuarWhatsAppConsulta() {
  const WHATSAPP_NUMERO = "593983868358";
  const mensaje = "Hola, me gustaría consultar sobre tus productos. 💻";
  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
  cerrarWspChoice();
}

function continuarCompraNavegacion() {
  const isEn = (window.currentLang === 'en' || document.documentElement.lang === 'en' || window.location.pathname.includes('/en/'));
  const target = isEn ? "../en/products.html#catalog" : "../es/productos.html#catalog";
  window.location.href = target;
  cerrarWspChoice();
}

// Funciones adicionales de control si no están en carrito.js
function abrirCheckout() {
  const overlay = document.getElementById("checkout-overlay");
  if (overlay) {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function cerrarCheckout() {
  const overlay = document.getElementById("checkout-overlay");
  if (overlay) {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function cerrarCheckoutBg(e) {
  if (e.target === document.getElementById("checkout-overlay")) cerrarCheckout();
}
