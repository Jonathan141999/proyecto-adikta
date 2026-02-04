# ADIKTA — Sitio Web Corporativo

**Jonathan Alquinga**

---

## 🎯 Sobre el Proyecto

Este proyecto web representa el lanzamiento oficial de la marca **ADIKTA** al mercado internacional. Surgido inicialmente como trabajo universitario, el proyecto evolucionó hasta convertirse en una iniciativa real y operativa: **la página web de ADIKTA está actualmente en producción**, sirviendo como plataforma digital oficial de la marca para clientes nacionales e internacionales.

ADIKTA es una marca ecuatoriana de tecnología con más de **11 años de experiencia** en el sector, especializada en soluciones de cómputo para hogar, educación y negocios. El sitio web está diseñado para posicionar la marca a escala regional y global, con presencia de aliados estratégicos como **REPRESMUNDIAL CIA. LTDA.** y **TECINTEC**.

---

## 📄 Páginas del Sitio

| Página | Archivo | Descripción |
|--------|---------|-------------|
| **Inicio** | `index.html` | Landing principal con hero, soluciones (Laptops, Servicio Técnico, Nosotros), servicios destacados, productos destacados, métricas de impacto (años, clientes, proyectos, equipos vendidos), testimonios de clientes corporativos (MSP, Cancillería, CELEC EP) y sección de confianza. |
| **Productos** | `productos.html` | Catálogo de productos con grid de tarjetas, ordenamiento (reciente, precio), paginación y acceso al catálogo PDF. Incluye Laptops, RAM, SSD/HDD, fuentes, monitores y periféricos. |
| **Servicios** | `servicios.html` | Presentación de servicios IT: Soporte Técnico Especializado, Ciberseguridad Proactiva, Soluciones Cloud Nativa y Consultoría/Outsourcing. Diseño con secciones numeradas y CTA. |
| **Nosotros** | `nosotros.html` | Quiénes somos, historia, trayectoria (11+ años), estadísticas (clientes, proyectos), propuesta de valor (equipos Pro, garantía, acompañamiento), carrusel Misión/Visión/Valores y enlace a contacto. |
| **Contacto** | `contacto.html` | Formulario de contacto, ubicación, teléfono, correo (informacion@adiktapc.net), horarios, redes sociales, oficina central (Rio San Pedro y Rio Conambo) y puntos de atención (Valle de Tumbaco - REPRESMUNDIAL). |
| **Términos y Privacidad** | `legal.html` | Términos y condiciones de uso, propiedad intelectual, política de privacidad, recopilación de información, seguridad y cumplimiento legal. |

---

## 🛠 Tecnologías

- **HTML5** — Estructura semántica
- **Tailwind CSS** — Estilos y diseño responsivo
- **JavaScript (Vanilla)** — Componentes web personalizados, i18n, interactividad
- **Font Awesome 6** — Iconografía
- **Google Fonts (Plus Jakarta Sans)** — Tipografía corporativa

---

## 📁 Estructura del Proyecto

```
proyecto-adikta/
├── index.html          # Página principal
├── productos.html      # Catálogo de productos
├── servicios.html      # Servicios IT
├── nosotros.html       # Sobre la empresa
├── contacto.html       # Formulario y ubicación
├── legal.html          # Términos y privacidad
├── assets/
│   ├── css/            # Estilos (common, index, productos, servicios, contacto, etc.)
│   ├── img/            # Imágenes (heroes, productos, logo)
│   ├── js/             # Scripts (lang.js, carousel, counters, pdf-modal, mobile-menu)
│   └── pdf/            # Catálogo (Fichas.pdf)
└── components/
    ├── navbar.js       # Barra de navegación reutilizable
    └── footer.js       # Pie de página reutilizable
```

---

## ✨ Características Principales

- **Soporte multidioma (ES/EN)** — Intercambio de idioma en la navegación mediante `lang.js`
- **Componentes reutilizables** — `<custom-navbar>` y `<custom-footer>` como Web Components
- **Menú Alianzas** — Dropdown con enlaces a REPRESMUNDIAL y TECINTEC
- **Modal de catálogo PDF** — Visualización de fichas técnicas en pantalla
- **Animaciones de contadores** — Métricas de impacto animadas
- **Carrusel Misión/Visión/Valores** — En la página Nosotros
- **Diseño responsivo** — Menú móvil y layout adaptativo
- **SEO básico** — Meta tags, títulos y descripciones por página

---

## 🚀 Cómo Ejecutar

1. Clonar o descargar el repositorio
2. Abrir `index.html` en un navegador, o
3. Usar un servidor local (por ejemplo, con Live Server en VS Code)

No se requieren dependencias adicionales; los estilos se cargan vía CDN (Tailwind, Font Awesome).

---

## 📞 Contacto del Proyecto

- **Correo:** informacion@adiktapc.net  
- **Teléfono:** 02 2046 510  

---

*© 2026 ADIKTA — Representaciones Internacionales REPRES MUNDIAL CÍA. LTDA. Todos los derechos reservados.*
