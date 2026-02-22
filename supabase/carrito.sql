-- ═══════════════════════════════════════════════════════════════════════════
-- 🛒 SCRIPT DE CARRITO DE COMPRAS - SUPABASE
-- ═══════════════════════════════════════════════════════════════════════════
-- Ejecutar en: Supabase > SQL Editor > New Query
-- Este archivo NO toca el formulario de contacto existente
-- ═══════════════════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════════════════
-- 📦 TABLA: PRODUCTOS
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.productos (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  categoria VARCHAR(100),
  imagen_url VARCHAR(500),
  stock INT DEFAULT 1,
  icono VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

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
-- Política: Permitir lectura pública de productos
-- ─────────────────────────────────────────────────────────────────────────

CREATE POLICY "Allow public read productos" 
ON public.productos 
FOR SELECT USING (true);

-- ─────────────────────────────────────────────────────────────────────────
-- Política: Permitir insertar clientes públicamente
-- ─────────────────────────────────────────────────────────────────────────

CREATE POLICY "Allow public insert clientes" 
ON public.clientes 
FOR INSERT WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────────
-- Política: Permitir insertar pedidos públicamente
-- ─────────────────────────────────────────────────────────────────────────

CREATE POLICY "Allow public insert pedidos" 
ON public.pedidos 
FOR INSERT WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────────
-- Política: Permitir insertar detalles de pedidos públicamente
-- ─────────────────────────────────────────────────────────────────────────

CREATE POLICY "Allow public insert detalles_pedido" 
ON public.detalles_pedido 
FOR INSERT WITH CHECK (true);

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
