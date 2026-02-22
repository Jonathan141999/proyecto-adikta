// ═════════════════════════════════════════════════════
// 📊 INTEGRACIÓN CON SUPABASE
// ═════════════════════════════════════════════════════

// Importar Supabase desde CDN (se carga en el HTML)
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

const SUPABASE_URL = 'https://hphghoydkkkczgtunxpa.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwaGdob3lka2trY3pndHVueHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NzEyMTMsImV4cCI6MjA4NzM0NzIxM30.KQEbuXWNianZ3Aybc1kXuMNH4LkY6ab5fvWdTeoONSM';

// Crear cliente de Supabase
const { createClient } = window.supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─────────────────────────────────────────────────────
// 💾 GUARDAR PEDIDO EN SUPABASE
// ─────────────────────────────────────────────────────

async function guardarPedidoEnSupabase(datosCliente, itemsCarrito) {
  try {
    console.log("📤 Enviando pedido a Supabase...");

    // 1️⃣ Crear o buscar cliente
    let cliente = await supabaseClient
      .from("clientes")
      .select("id")
      .eq("whatsapp", datosCliente.whatsapp)
      .single();

    let clienteId;

    if (cliente.data) {
      // Cliente existe
      clienteId = cliente.data.id;
      console.log("✓ Cliente existente:", clienteId);
    } else {
      // Crear nuevo cliente
      const { data: nuevoCliente, error: errorCliente } = await supabaseClient
        .from("clientes")
        .insert([{
          nombre: datosCliente.nombre,
          whatsapp: datosCliente.whatsapp,
          email: datosCliente.email || null
        }])
        .select();

      if (errorCliente) throw errorCliente;
      clienteId = nuevoCliente[0].id;
      console.log("✓ Nuevo cliente creado:", clienteId);
    }

    // 2️⃣ Crear pedido
    const total = itemsCarrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    const { data: pedido, error: errorPedido } = await supabaseClient
      .from("pedidos")
      .insert([{
        cliente_id: clienteId,
        total: total,
        metodo_pago: "whatsapp",
        estado: "pendiente",
        notas: `Pedido de ${datosCliente.nombre}`
      }])
      .select();

    if (errorPedido) throw errorPedido;
    const pedidoId = pedido[0].id;
    console.log("✓ Pedido creado:", pedidoId);

    // 3️⃣ Crear detalles del pedido
    const detalles = itemsCarrito.map(item => ({
      pedido_id: pedidoId,
      producto_id: item.id,
      cantidad: item.cantidad,
      precio_unitario: item.precio
    }));

    const { error: errorDetalles } = await supabaseClient
      .from("detalles_pedido")
      .insert(detalles);

    if (errorDetalles) throw errorDetalles;
    console.log("✓ Detalles guardados");

    return {
      exito: true,
      pedidoId: pedidoId,
      mensaje: `Pedido #${pedidoId} registrado correctamente`
    };

  } catch (error) {
    console.error("❌ Error al guardar pedido:", error);
    return {
      exito: false,
      mensaje: "Error al procesar el pedido. Intenta de nuevo.",
      error: error.message
    };
  }
}

// ─────────────────────────────────────────────────────
// 📖 OBTENER PRODUCTOS DE SUPABASE (OPCIONAL)
// ─────────────────────────────────────────────────────

async function obtenerProductosDeSupabase() {
  try {
    const { data, error } = await supabaseClient
      .from("productos")
      .select("*");

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

// ─────────────────────────────────────────────────────
// 📊 VER PEDIDOS (PARA ADMIN)
// ─────────────────────────────────────────────────────

async function verPedidos() {
  try {
    const { data, error } = await supabaseClient
      .from("pedidos")
      .select(`
        id,
        total,
        estado,
        fecha_pedido,
        clientes(nombre, whatsapp),
        detalles_pedido(cantidad, precio_unitario, productos(nombre))
      `)
      .order("fecha_pedido", { ascending: false });

    if (error) throw error;
    console.table(data);
    return data;
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    return [];
  }
}

// ─────────────────────────────────────────────────────
// 🔄 ACTUALIZAR ESTADO DEL PEDIDO
// ─────────────────────────────────────────────────────

async function actualizarEstadoPedido(pedidoId, nuevoEstado) {
  try {
    const { error } = await supabaseClient
      .from("pedidos")
      .update({ estado: nuevoEstado })
      .eq("id", pedidoId);

    if (error) throw error;
    console.log(`✓ Pedido ${pedidoId} actualizado a ${nuevoEstado}`);
  } catch (error) {
    console.error("Error al actualizar pedido:", error);
  }
}

// ─────────────────────────────────────────────────────
// 🪶 EXPORTAR PARA MÓDULOS
// ─────────────────────────────────────────────────────
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    guardarPedidoEnSupabase,
    obtenerProductosDeSupabase,
    verPedidos,
    actualizarEstadoPedido,
    supabaseClient
  };
}
