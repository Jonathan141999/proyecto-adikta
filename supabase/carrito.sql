-- ═══════════════════════════════════════════════════════════════════════════
-- 🛒 SCRIPT DE CARRITO DE COMPRAS - SUPABASE
-- ═══════════════════════════════════════════════════════════════════════════
-- Ejecutar en: Supabase > SQL Editor > New Query
-- Este archivo NO toca el formulario de contacto existente
-- ═══════════════════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.productos (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nombre VARCHAR(255) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  categoria VARCHAR(100),
  icono VARCHAR(50),
  imagen VARCHAR(255),
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════════════════
-- 📝 DATOS DE EJEMPLO: PRODUCTOS
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO public.productos (nombre, precio, categoria, icono, imagen, stock) VALUES
('Adikt@ Laptop Pro 15"', 980.00, 'Laptops', '💻', 'laptop.jpg', 100),
('DDR4 16GB 3200MHz', 155.00, 'Memorias', '💾', 'memoria-ram.jpg', 100),
('SSD NVMe 1TB', 80.00, 'Almacenamiento', '💾', 'm.2-ssd.jpg', 100),
('HDD 2TB 7200RPM', 180.00, 'Almacenamiento', '💾', 'hhd.jpg', 100),
('PSU 650W Gold', 150.00, 'Fuentes', '⚡', 'fuente.jpg', 100),
('Monitor 24" Full HD', 150.00, 'Monitores', '🖥️', 'monitor.jpg', 100),
('Teclado mecánico RGB', 50.00, 'Periféricos', '⌨️', 'teclado.jpg', 100);

-- ═══════════════════════════════════════════════════════════════════════════
-- 👤 TABLA: CLIENTES
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.clientes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  whatsapp VARCHAR(20) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════════════════
-- 📋 TABLA: PEDIDOS
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.pedidos (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  cliente_id BIGINT REFERENCES public.clientes(id) ON DELETE CASCADE,
  total DECIMAL(10,2) NOT NULL,
  estado VARCHAR(50) DEFAULT 'pendiente',
  metodo_pago VARCHAR(50),
  notas TEXT,
  fecha_pedido TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════════════════
-- 📦 TABLA: DETALLES_PEDIDO (Líneas del carrito)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.detalles_pedido (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  pedido_id BIGINT REFERENCES public.pedidos(id) ON DELETE CASCADE,
  producto_id BIGINT REFERENCES public.productos(id) ON DELETE CASCADE,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED
);

-- ═══════════════════════════════════════════════════════════════════════════
-- 🔐 ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detalles_pedido ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────────────────────────────────
-- Políticas para CLIENTES
-- ─────────────────────────────────────────────────────────────────────────
CREATE POLICY "Allow public select clientes" ON public.clientes FOR SELECT USING (true);
CREATE POLICY "Allow public insert clientes" ON public.clientes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update clientes" ON public.clientes FOR UPDATE USING (true);

-- ─────────────────────────────────────────────────────────────────────────
-- Políticas para PEDIDOS
-- ─────────────────────────────────────────────────────────────────────────
CREATE POLICY "Allow public select pedidos" ON public.pedidos FOR SELECT USING (true);
CREATE POLICY "Allow public insert pedidos" ON public.pedidos FOR INSERT WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────────
-- Políticas para DETALLES_PEDIDO
-- ─────────────────────────────────────────────────────────────────────────
CREATE POLICY "Allow public select detalles_pedido" ON public.detalles_pedido FOR SELECT USING (true);
CREATE POLICY "Allow public insert detalles_pedido" ON public.detalles_pedido FOR INSERT WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────────
-- Política: Permitir lectura pública de productos
-- ─────────────────────────────────────────────────────────────────────────
CREATE POLICY "Allow public read productos" ON public.productos FOR SELECT USING (true);

-- ═══════════════════════════════════════════════════════════════════════════
-- ✅ TABLAS CREADAS EXITOSAMENTE
-- ═══════════════════════════════════════════════════════════════════════════
-- 
-- Resumen:
-- ✓ productos - Catálogo de productos
-- ✓ clientes - Información de compradores
-- ✓ pedidos - Órdenes de compra
-- ✓ detalles_pedido - Líneas de cada pedido
--
-- Relaciones:
-- clientes → pedidos (1:N)
-- productos → detalles_pedido (1:N)
-- pedidos → detalles_pedido (1:N)
--
-- ═══════════════════════════════════════════════════════════════════════════
