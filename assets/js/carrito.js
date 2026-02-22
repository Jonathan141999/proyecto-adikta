// ═════════════════════════════════════════════════════
// 🛒 CARRITO DE COMPRAS — Sistema Completo
// ═════════════════════════════════════════════════════

const WHATSAPP_NUMERO = "593983868358"; // 👈 REEMPLAZA CON TU NÚMERO

// ─────────────────────────────────────────────────────
// 💾 CARRITOS EN LOCALSTORAGE
// ─────────────────────────────────────────────────────

class Carrito {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("carrito")) || [];
  }

  agregar(producto) {
    // Verificar si el producto ya existe en el carrito
    const existe = this.items.find(item => item.id === producto.id);

    if (existe) {
      existe.cantidad += 1;
    } else {
      this.items.push({
        ...producto,
        uid: String(Date.now() + Math.random()),
        cantidad: 1
      });
    }

    this.guardar();
    this.mostrarToast(`✓ ${producto.nombre} agregado al carrito`);
  }

  remover(uid) {
    this.items = this.items.filter(item => String(item.uid) !== String(uid));
    this.guardar();
    this.renderizar();
  }

  actualizar(uid, cantidad) {
    const item = this.items.find(item => String(item.uid) === String(uid));
    if (item) {
      item.cantidad = Math.max(1, cantidad);
      this.guardar();
      this.renderizar();
    }
  }

  limpiar() {
    this.items = [];
    this.guardar();
    this.renderizar();
  }

  guardar() {
    localStorage.setItem("carrito", JSON.stringify(this.items));
    this.actualizarUI();
  }

  obtenerTotal() {
    return this.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  mostrarToast(msj) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msj;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  actualizarUI() {
    const contador = document.getElementById("cart-count");
    if (contador) {
      contador.textContent = this.items.length;
    }
    actualizarBadgeCarrito();
  }

  renderizar() {
    const contenedor = document.getElementById("cart-body");

    if (!contenedor) return;

    const total = this.obtenerTotal();

    // Actualizar subcabecera con conteo
    const subheader = document.getElementById("cart-sub");
    if (subheader) {
      const isEn = (window.currentLang === 'en' || document.documentElement.lang === 'en' || window.location.pathname.includes('/en/'));
      subheader.textContent = `${this.items.length} ${isEn ? 'items' : 'productos'}`;
    }

    if (this.items.length === 0) {
      contenedor.innerHTML = `
        <div class="empty-cart">
          <div class="empty-cart-icon">🛒</div>
          <p>Tu carrito está vacío.<br>Agrega productos para continuar.</p>
        </div>`;
      return;
    }

    const summaryItems = this.items.map(item => `
      <div class="citem">
        <div class="citem-icon">${item.icon || "📦"}</div>
        <div class="citem-info">
          <div class="citem-name">${item.nombre}</div>
          <div class="citem-price">$${item.precio.toFixed(2)}</div>
          <div class="citem-controls">
            <button onclick="carrito.actualizar('${item.uid}', ${item.cantidad - 1})">−</button>
            <span class="citem-count">${item.cantidad}</span>
            <button onclick="carrito.actualizar('${item.uid}', ${item.cantidad + 1})">+</button>
          </div>
        </div>
        <button class="citem-rm" onclick="carrito.remover('${item.uid}')" title="Eliminar">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `).join("");

    contenedor.innerHTML = `
      <div class="cart-items">
        ${summaryItems}
      </div>
      <div class="cart-total-row">
        <span class="cart-total-label">TOTAL A PAGAR</span>
        <span class="cart-total-val">$${total.toFixed(2)} <small>USD</small></span>
      </div>
      <div class="pay-title">ELIGE TU MÉTODO DE PAGO</div>
      <div class="pay-options">
        <button class="btn-payment" onclick="carrito.pagarPorWhatsApp()">
          <div class="payment-icon-box whatsapp-box"><i class="fa-brands fa-whatsapp"></i></div>
          <span>WhatsApp</span>
        </button>
        <button class="btn-payment" onclick="carrito.pagarPorTransferencia()">
          <div class="payment-icon-box bank-box"><i class="fa-solid fa-building-columns"></i></div>
          <span>Transferencia Bancaria</span>
        </button>
        <button class="btn-payment" onclick="carrito.pagarPorDeposito()">
          <div class="payment-icon-box deposit-box"><i class="fa-solid fa-money-bill-transfer"></i></div>
          <span>Depósito en Efectivo</span>
        </button>
        <button class="btn-payment" onclick="carrito.pagarEnPersona()">
          <div class="payment-icon-box cash-box"><i class="fa-solid fa-hand-holding-dollar"></i></div>
          <span>Pago en Persona</span>
        </button>
        <p class="pay-note">Elige tu método preferido y coordinaremos los detalles contigo.</p>
      </div>
    `;
  }

  pagarPorWhatsApp() {
    if (this.items.length === 0) {
      this.mostrarToast("⚠️ Carrito vacío");
      return;
    }
    cerrarCarrito();
    abrirCheckout();
  }

  async finalizarCompra(datosCliente) {
    const btn = document.getElementById("confirmar-pedido-btn");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Procesando...";
    }

    // 1. Guardar en Supabase
    const resultado = await guardarPedidoEnSupabase(datosCliente, this.items);

    if (resultado.exito) {
      // 2. Preparar mensaje de WhatsApp
      let mensaje = `🛒 *NUEVO PEDIDO ADIKTA #${resultado.pedidoId}*\n\n`;
      mensaje += `👤 *Cliente:* ${datosCliente.nombre}\n`;
      mensaje += `📱 *WhatsApp:* ${datosCliente.whatsapp}\n\n`;
      mensaje += "📋 *Detalles del pedido:*\n";

      this.items.forEach(item => {
        mensaje += `• ${item.nombre} × ${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}\n`;
      });

      const total = this.obtenerTotal();
      mensaje += `\n💰 *Total: $${total.toFixed(2)} USD*\n\n`;
      mensaje += "Me gustaría coordinar el pago y la entrega. 🚀";

      const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, "_blank");

      // 3. Limpiar y cerrar
      this.limpiar();
      this.mostrarToast("✓ Pedido registrado. Redirigiendo a WhatsApp...");
      cerrarCheckout();
    } else {
      this.mostrarToast("❌ Error al guardar pedido. Intenta de nuevo.");
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Confirmar y enviar a WhatsApp 🚀";
      }
    }
  }

  pagarPorTransferencia() {
    if (this.items.length === 0) {
      this.mostrarToast("⚠️ Carrito vacío");
      return;
    }

    let mensaje = "🛒 *NUEVO PEDIDO ADIKTA - TRANSFERENCIA BANCARIA*\n\n";
    let detalles = "📋 *Detalles del pedido:*\n\n";

    this.items.forEach(item => {
      detalles += `• ${item.nombre} × ${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}\n`;
    });

    const total = this.obtenerTotal();
    mensaje += detalles;
    mensaje += `\n💰 *Total: $${total.toFixed(2)} USD*\n\n`;
    mensaje += "Deseo pagar por transferencia bancaria. ¿Cuáles son los datos de la cuenta? 🏦";

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");

    this.limpiar();
    this.mostrarToast("✓ Pedido enviado. Carrito vaciado.");
    cerrarCarrito();
  }

  pagarPorDeposito() {
    if (this.items.length === 0) {
      this.mostrarToast("⚠️ Carrito vacío");
      return;
    }

    let mensaje = "🛒 *NUEVO PEDIDO ADIKTA - DEPÓSITO EN EFECTIVO*\n\n";
    let detalles = "📋 *Detalles del pedido:*\n\n";

    this.items.forEach(item => {
      detalles += `• ${item.nombre} × ${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}\n`;
    });

    const total = this.obtenerTotal();
    mensaje += detalles;
    mensaje += `\n💰 *Total: $${total.toFixed(2)} USD*\n\n`;
    mensaje += "Deseo pagar por depósito en efectivo. ¿Cuáles son los datos para el depósito? 💰";

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");

    this.limpiar();
    this.mostrarToast("✓ Pedido enviado. Carrito vaciado.");
    cerrarCarrito();
  }

  pagarEnPersona() {
    if (this.items.length === 0) {
      this.mostrarToast("⚠️ Carrito vacío");
      return;
    }

    let mensaje = "🛒 *NUEVO PEDIDO ADIKTA - PAGO EN PERSONA*\n\n";
    let detalles = "📋 *Detalles del pedido:*\n\n";

    this.items.forEach(item => {
      detalles += `• ${item.nombre} × ${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}\n`;
    });

    const total = this.obtenerTotal();
    mensaje += detalles;
    mensaje += `\n💰 *Total: $${total.toFixed(2)} USD*\n\n`;
    mensaje += "Deseo pagar en persona. ¿Cuál es el mejor lugar y horario para retirar? 📍";

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");

    this.limpiar();
    this.mostrarToast("✓ Pedido enviado. Carrito vaciado.");
    cerrarCarrito();
  }
}

// ─────────────────────────────────────────────────────
// 🪟 CONTROLES DE MODAL
// ─────────────────────────────────────────────────────

function actualizarBadgeCarrito() {
  if (typeof carrito === 'undefined') return;
  const badge = document.getElementById("cart-count-badge");
  if (!badge) return;
  const totalItems = carrito.items.length;
  badge.textContent = totalItems > 0 ? totalItems : "0";
}

function abrirCarrito() {
  carrito.renderizar();
  const overlay = document.getElementById("cart-overlay");
  if (overlay) {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function cerrarCarrito() {
  const overlay = document.getElementById("cart-overlay");
  if (overlay) {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function cerrarCarritoBg(e) {
  if (e.target === document.getElementById("cart-overlay")) cerrarCarrito();
}

// ─────────────────────────────────────────────────────
// 🔧 INICIALIZACIÓN DE BOTONES
// ─────────────────────────────────────────────────────

// 🎯 VARIABLE GLOBAL PARA LA INSTANCIA DE CARRITO
let carrito;

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Inicializar carrito cuando el DOM está completamente cargado
  carrito = new Carrito();
  carrito.actualizarUI();
  actualizarBadgeCarrito();

  // Agregar evento a todos los botones "Agregar al carrito"
  document.querySelectorAll(".btn-add-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const productoJSON = btn.dataset.producto;
      const producto = JSON.parse(productoJSON);
      carrito.agregar(producto);
    });
  });

  // Evento del carrito
  const cartBtn = document.querySelector(".cart-btn");
  if (cartBtn) {
    cartBtn.addEventListener("click", abrirCarrito);
  }

  // Cerrar con overlay
  const cartOverlay = document.getElementById("cart-overlay");
  if (cartOverlay) {
    cartOverlay.addEventListener("click", cerrarCarritoBg);
  }

  // Cerrar con botón X
  const closeBtn = document.querySelector(".cart-modal .modal-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", cerrarCarrito);
  }
});

// ─────────────────────────────────────────────────────
// 🪶 EXPORTAR PARA MÓDULOS
// ─────────────────────────────────────────────────────
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Carrito, carrito };
}
