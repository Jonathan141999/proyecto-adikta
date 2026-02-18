// assets/js/productos.js

document.addEventListener('DOMContentLoaded', () => {
  // 1. Diccionario de traducciones estáticas UI
  const i18n = {
    es: {
      category_aio: 'EDICIÓN CORPORATIVA AIO',
      category_desktop: 'EDICIÓN PC ESCRITORIO',
      category_laptop: 'EDICIÓN PORTÁTIL',
      product_default: 'PRODUCTO',
      no_products: 'No hay productos para mostrar en esta categoría.',
      tab_all: 'Todos',
      tab_aio: 'All in One',
      tab_desktop: 'Computadores PC',
      tab_laptop: 'Portátiles',
      modal_download_btn: 'Descargar Ficha Técnica',
      modal_view_details: 'Ver detalles',
      badge_performance: 'Rendimiento',
      badge_performance_value: 'Alto Nivel',
      badge_warranty: 'Garantía',
      badge_warranty_value: '3 Años',
      section_processor: 'Rendimiento y Procesador',
      section_connectivity: 'Conectividad y Expansión',
      section_storage: 'Almacenamiento y Memoria',
      section_display: 'Pantalla',
      section_monitor: 'Monitor',
      section_accessories: 'Accesorios Incluidos',
      spec_brand: 'Marca Procesador',
      spec_model: 'Modelo',
      spec_cores: 'Núcleos / Hilos',
      spec_turbo: 'Frecuencia Turbo',
      spec_cache: 'Caché L3',
      spec_class: 'Clase de equipo',
      spec_chipset: 'Motherboard Chipset',
      spec_network: 'Red LAN & Wireless',
      spec_security: 'Seguridad',
      label_ports: 'Puertos Disponibles',
      label_ram: 'MEMORIA RAM',
      label_storage: 'ALMACENAMIENTO',
      spec_size: 'Tamaño',
      spec_panel: 'Tipo de Panel',
      spec_video_input: 'Entrada de Video',
      spec_mouse_keyboard: 'Mouse y Teclado',
      spec_extra: 'Accesorios Adicionales',
      spec_notes: 'Notas',
      val_included: 'Incluidos',
      val_none: 'Ninguno',
      val_cores: 'Núcleos',
      val_threads: 'Hilos',
      val_expandable: 'Expandible'
    },
    en: {
      category_aio: 'AIO CORPORATE EDITION',
      category_desktop: 'DESKTOP PC EDITION',
      category_laptop: 'LAPTOP EDITION',
      product_default: 'PRODUCT',
      no_products: 'No products to display in this category.',
      tab_all: 'All',
      tab_aio: 'All in One',
      tab_desktop: 'Desktop PCs',
      tab_laptop: 'Laptops',
      modal_download_btn: 'Download Spec Sheet',
      modal_view_details: 'View Details',
      badge_performance: 'Performance',
      badge_performance_value: 'High Level',
      badge_warranty: 'Warranty',
      badge_warranty_value: '3 Years',
      section_processor: 'Performance & Processor',
      section_connectivity: 'Connectivity & Expansion',
      section_storage: 'Storage & Memory',
      section_display: 'Display',
      section_monitor: 'Monitor',
      section_accessories: 'Included Accessories',
      spec_brand: 'Processor Brand',
      spec_model: 'Model',
      spec_cores: 'Cores / Threads',
      spec_turbo: 'Turbo Frequency',
      spec_cache: 'L3 Cache',
      spec_class: 'Equipment Class',
      spec_chipset: 'Motherboard Chipset',
      spec_network: 'LAN & Wireless Network',
      spec_security: 'Security',
      label_ports: 'Available Ports',
      label_ram: 'RAM MEMORY',
      label_storage: 'STORAGE',
      spec_size: 'Size',
      spec_panel: 'Panel Type',
      spec_video_input: 'Video Input',
      spec_mouse_keyboard: 'Mouse & Keyboard',
      spec_extra: 'Additional Accessories',
      spec_notes: 'Notes',
      val_included: 'Included',
      val_none: 'None',
      val_cores: 'Cores',
      val_threads: 'Threads',
      val_expandable: 'Expandable'
    }
  };

  // Diccionario de reemplazos para contenido técnico (ES -> EN)
  const specReplacements = [
    // Títulos y Categorías
    { es: /Computador/gi, en: 'Computer' },
    { es: /Todo en Uno/gi, en: 'All in One' },
    { es: /Ordenador/gi, en: 'Computer' },
    { es: /Portátil|Portatil/gi, en: 'Laptop' },
    { es: /Escritorio/gi, en: 'Desktop' },
    { es: /Software Privado/gi, en: 'Private Software' },
    { es: /Software Libre/gi, en: 'Free Software' },
    { es: /Modelo/gi, en: 'Model' },
    { es: /Corporativa/gi, en: 'Corporate' },
    { es: /Hogar/gi, en: 'Home' },
    { es: /Educación|Educacion/gi, en: 'Education' },

    // Conectividad y Puertos
    { es: /Puerto de Red/gi, en: 'Network Port' },
    { es: /Puerto/gi, en: 'Port' },
    { es: /tarjeta Wireless/gi, en: 'Wireless Card' },
    { es: /Inalámbrico|Inalambrico/gi, en: 'Wireless' },
    { es: /Alámbrico|Alambrico/gi, en: 'Wired' },
    { es: /Lector de tarjetas/gi, en: 'Card Reader' },

    // Pantalla y Video
    { es: /borde delgado/gi, en: 'thin bezel' },
    { es: /Anti-Reflejo/gi, en: 'Anti-Glare' },
    { es: /pulgadas/gi, en: 'inches' },

    // Periféricos y Accesorios
    { es: /audífono\/micrófono/gi, en: 'headphone/microphone' },
    { es: /Teclado/gi, en: 'Keyboard' },
    { es: /Mouse/gi, en: 'Mouse' },
    { es: /Cámara Web|Camara Web/gi, en: 'Webcam' },
    { es: /MicrófoNo|Microfono/gi, en: 'Microphone' },
    { es: /Parlantes/gi, en: 'Speakers' },
    { es: /interna/gi, en: 'internal' },
    { es: /interNos/gi, en: 'internal' }, // Cubre typo en JSON
    { es: /incorporado/gi, en: 'built-in' },
    { es: /integrados/gi, en: 'integrated' },

    // Palabras comunes / Notas
    { es: /El /g, en: 'The ' }, // Espacio para evitar coincidencias parciales
    { es: / y /g, en: ' and ' },
    { es: /deberán ser/gi, en: 'must be' },
    { es: /la misma marca/gi, en: 'the same brand' },
    { es: /Sí|Si/gi, en: 'Yes' },
    { es: /No/gi, en: 'No' },
    { es: /Generación|Generacion/gi, en: 'Generation' }
  ];

  function getLang() {
    return document.documentElement.lang || 'es';
  }

  // 1. Traducir claves estáticas de UI
  function t(key) {
    const lang = getLang();
    return (i18n[lang] || i18n['es'])[key] || key;
  }

  // 2. Traducir contenido dinámico del JSON (sólo si estamos en inglés)
  function tSpecs(text) {
    if (!text) return '';
    const strText = String(text);
    if (getLang() === 'es') return strText; // En español devolver original

    let translated = strText;
    specReplacements.forEach(rep => {
      translated = translated.replace(rep.es, rep.en);
    });
    return translated;
  }

  const productsGrid = document.getElementById('products-grid');
  const tabs = document.querySelectorAll('.tab-btn');
  const modalOverlay = document.getElementById('product-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  let allProducts = {};
  let flatProductsList = [];
  let currentMainFilter = 'original';
  let currentSubFilter = 'all';

  // --- Carga de Datos ---
  fetch('/assets/json/fichas_adikta.json')
    .then(response => {
      if (!response.ok) {
        return fetch('../assets/json/fichas_adikta.json').then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        });
      }
      return response.json();
    })
    .then(data => {
      allProducts = data;
      flatProductsList = flattenProducts(data);
      console.log('Productos cargados:', flatProductsList.length);

      if (flatProductsList.length === 0) {
        productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">${t('no_products')}</p>`;
      } else {
        restoreFilterState();
      }
    })
    .catch(error => {
      console.error('Error cargando productos:', error);
      if (productsGrid) {
        productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: red;">Error cargando catálogo. Por favor verifique la conexión.</p>`;
      }
    });

  function restoreFilterState() {
    const savedMain = localStorage.getItem('activeProductFilter');
    const savedSub = localStorage.getItem('activeSubFilter');

    if (savedMain && savedMain !== 'original') {
      const targetTab = document.querySelector(`.tab-btn[data-filter="${savedMain}"]`);
      if (targetTab) {
        tabs.forEach(t => t.classList.remove('active'));
        targetTab.classList.add('active');
        currentMainFilter = savedMain;

        updateSubTabs(savedMain);

        if (savedSub && savedSub !== 'all') {
          const subTab = document.querySelector(`.subtab-btn[data-subfilter="${savedSub}"]`);
          if (subTab) {
            document.querySelectorAll('.subtab-btn').forEach(btn => btn.classList.remove('active'));
            subTab.classList.add('active');
            currentSubFilter = savedSub;
          }
        }
        filterAndRender();
      }
    }
  }

  function flattenProducts(data) {
    const list = [];
    const root = data.productos || data;
    const keysMap = {
      'todo_en_uno': 'computadores_todo_en_uno',
      'escritorio': 'computadores_escritorio',
      'portatiles': 'computadores_portatiles'
    };

    if (root.software_libre) {
      ['todo_en_uno', 'escritorio'].forEach(sub => {
        const jsonKey = keysMap[sub];
        if (root.software_libre[jsonKey]) {
          root.software_libre[jsonKey].forEach(p => {
            if (p.id) p.id = String(p.id);
            list.push({ ...p, _category: 'software_libre', _subcategory: sub });
          });
        }
      });
    }

    if (root.software_privado) {
      ['todo_en_uno', 'escritorio', 'portatiles'].forEach(sub => {
        const jsonKey = keysMap[sub];
        if (root.software_privado[jsonKey]) {
          root.software_privado[jsonKey].forEach(p => {
            if (p.id) p.id = String(p.id);
            list.push({ ...p, _category: 'software_privado', _subcategory: sub });
          });
        }
      });
    }
    return list;
  }

  function getProductImage(product) {
    if (product.id && product.id.includes('lap')) return '../assets/img/laptop.jpg';
    if (product.id && product.id.includes('aio')) return '../assets/img/monitor.jpg';
    if (product.id && product.id.includes('est')) return '../assets/img/hdd.jpg';
    return '../assets/img/hdd.jpg';
  }

  function getCategoryLabel(subcategory) {
    const map = {
      'todo_en_uno': 'category_aio',
      'escritorio': 'category_desktop',
      'portatiles': 'category_laptop'
    };
    return t(map[subcategory] || 'product_default');
  }

  function renderProducts(products) {
    productsGrid.innerHTML = '';
    if (!products || products.length === 0) {
      productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">${t('no_products')}</p>`;
      return;
    }
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card dynamic-card';

      const image = getProductImage(product);
      const categoryLabel = getCategoryLabel(product._subcategory);

      card.innerHTML = `
        <div class="product-media media-wrapper">
          <img alt="${product.nombre}" class="product-image" src="${image}" />
        </div>
        <div class="card-body">
          <p class="product-category">${categoryLabel}</p>
          <h3 class="product-title">${tSpecs(product.nombre)}</h3>
          <ul class="product-features">
             <li>${tSpecs(formatSpecValue(product.procesador, 'marca'))} ${tSpecs(formatSpecValue(product.procesador, 'modelo'))}</li>
             <li>${tSpecs(formatSpecValue(product.memoria_ram, 'capacidad'))}</li>
             <li>${tSpecs(formatSpecValue(product.almacenamiento, 'capacidad'))}</li>
          </ul>
          <button class="product-cta w-full" data-id="${product.id}" onclick="openModal('${product.id}')">${t('modal_view_details')}</button>
        </div>
      `;
      productsGrid.appendChild(card);
    });
  }

  function formatSpecValue(obj, key) {
    if (!obj) return '';
    return obj[key] || '';
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      currentMainFilter = filter;
      currentSubFilter = 'all';

      if (filter === 'original') {
        localStorage.removeItem('activeProductFilter');
        localStorage.removeItem('activeSubFilter');
        window.location.reload();
      } else {
        localStorage.setItem('activeProductFilter', filter);
        localStorage.setItem('activeSubFilter', 'all');
        updateSubTabs(filter);
        filterAndRender();
      }
    });
  });

  function updateSubTabs(mainFilter) {
    const tabsContainer = document.querySelector('.product-tabs');
    const existingSubTabs = document.querySelector('.subcategory-tabs');
    if (existingSubTabs) existingSubTabs.remove();

    if (mainFilter === 'original') return;

    const subcategoryContainer = document.createElement('div');
    subcategoryContainer.className = 'subcategory-tabs';

    const hasPortatiles = mainFilter === 'software_privado';

    subcategoryContainer.innerHTML = `
      <button class="subtab-btn active" data-subfilter="all">${t('tab_all')}</button>
      <button class="subtab-btn" data-subfilter="todo_en_uno">${t('tab_aio')}</button>
      <button class="subtab-btn" data-subfilter="escritorio">${t('tab_desktop')}</button>
      ${hasPortatiles ? `<button class="subtab-btn" data-subfilter="portatiles">${t('tab_laptop')}</button>` : ''}
    `;

    tabsContainer.insertAdjacentElement('afterend', subcategoryContainer);

    const subTabs = subcategoryContainer.querySelectorAll('.subtab-btn');
    subTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        subTabs.forEach(sb => sb.classList.remove('active'));
        btn.classList.add('active');
        currentSubFilter = btn.dataset.subfilter;

        localStorage.setItem('activeSubFilter', currentSubFilter);

        filterAndRender();
      });
    });
  }

  function filterAndRender() {
    let filtered = flatProductsList.filter(p => p._category === currentMainFilter);
    if (currentSubFilter !== 'all') {
      filtered = filtered.filter(p => p._subcategory === currentSubFilter);
    }
    renderProducts(filtered);
  }

  window.openModal = openModal;

  function openModal(productId) {
    const product = flatProductsList.find(p => p.id === productId);
    if (!product) return;

    const image = getProductImage(product);
    const categoryLabel = getCategoryLabel(product._subcategory);
    const productName = tSpecs(product.nombre); // Intento de traducir partes del nombre si aplica

    const modalHtml = `
      <div class="modal-content-wrapper">
        <div class="modal-left">
          <img src="${image}" alt="${product.nombre}" class="modal-product-image">
          <div>
            <span class="modal-product-badge">${categoryLabel}</span>
            <h2 class="modal-product-title">${productName}</h2>
            <p class="modal-product-subtitle">${tSpecs(product.modelo) || ''}</p>
            <button class="modal-download-btn">
              <span class="material-symbols-outlined">download</span>
              ${t('modal_download_btn')}
            </button>
          </div>
          <div class="modal-info-badges">
            <div class="modal-info-badge">
              <div class="modal-info-badge-icon performance">⚡</div>
              <div class="modal-info-badge-text">
                <span class="modal-info-badge-label">${t('badge_performance')}</span>
                <span class="modal-info-badge-value">${t('badge_performance_value')}</span>
              </div>
            </div>
            <div class="modal-info-badge">
              <div class="modal-info-badge-icon warranty">✓</div>
              <div class="modal-info-badge-text">
                <span class="modal-info-badge-label">${t('badge_warranty')}</span>
                <span class="modal-info-badge-value">${t('badge_warranty_value')}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-right">
          ${generateProcessorSection(product)}
          ${generateConnectivitySection(product)}
          ${generateStorageSection(product)}
          ${generateDisplaySection(product)}
          ${generateAccessoriesSection(product)}
        </div>
      </div>
    `;

    modalBody.innerHTML = modalHtml;
    modalOverlay.classList.add('active');
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // --- Functions Generators (Usando tSpecs) ---

  function generateProcessorSection(product) {
    const p = product.procesador || {};
    return `
      <div class="modal-section">
        <div class="modal-section-header">
          <span class="modal-section-icon">⚙️</span>
          <h3 class="modal-section-title">${t('section_processor')}</h3>
        </div>
        <div class="modal-spec-grid">
          <div class="modal-spec-item">
            <span class="label">${t('spec_brand')}</span>
            <span class="value">${p.marca || '-'}</span>
          </div>
          <div class="modal-spec-item">
            <span class="label">${t('spec_model')}</span>
            <span class="value">${p.modelo || '-'}</span>
          </div>
          <div class="modal-spec-item">
            <span class="label">${t('spec_cores')}</span>
            <span class="value">${p.nucleos || '-'} ${t('val_cores')} / ${p.hilos || '-'} ${t('val_threads')}</span>
          </div>
          <div class="modal-spec-item">
            <span class="label">${t('spec_turbo')}</span>
            <span class="value">${p.frecuencia_turbo_max || p.frecuencia_turbo || '-'}</span>
          </div>
          <div class="modal-spec-item">
            <span class="label">${t('spec_cache')}</span>
            <span class="value">${p.cache || '-'}</span>
          </div>
          <div class="modal-spec-item">
            <span class="label">${t('spec_class')}</span>
            <span class="value">${tSpecs(p.clase || product.clase || 'Corporativa')}</span>
          </div>
        </div>
      </div>
    `;
  }

  function generateConnectivitySection(product) {
    const m = product.motherboard || {};
    const ports = (m.puertos || []).map(port =>
      `<span class="port-badge">${tSpecs(port)}</span>`
    ).join('');

    return `
      <div class="modal-section">
        <div class="modal-section-header">
          <span class="modal-section-icon">🔌</span>
          <h3 class="modal-section-title">${t('section_connectivity')}</h3>
        </div>
        <div class="modal-spec-grid">
          <div class="modal-spec-item">
            <span class="label">${t('spec_chipset')}</span>
            <span class="value">${m.chipset || '-'}</span>
          </div>
          <div class="modal-spec-item">
            <span class="label">${t('spec_network')}</span>
            <span class="value">${tSpecs(m.red_lan || m.red || '-')}</span>
          </div>
          <div class="modal-spec-item full-width">
            <span class="label">${t('spec_security')}</span>
            <span class="value">${tSpecs(m.seguridad || '-')}</span>
          </div>
        </div>
        
        <div class="modal-ports-container">
          <span class="label" style="display:block; margin-bottom:0.5rem; color:var(--text-light); font-size:0.75rem;">${t('label_ports')}</span>
          <div class="ports-list">
            ${ports || '<span class="value">-</span>'}
          </div>
        </div>
      </div>
    `;
  }

  function generateStorageSection(product) {
    return `
      <div class="modal-section">
        <div class="modal-section-header">
          <span class="modal-section-icon">💾</span>
          <h3 class="modal-section-title">${t('section_storage')}</h3>
        </div>
        <div class="modal-highlight-cards">
          ${product.memoria_ram ? `
          <div class="modal-highlight-card">
            <div class="modal-highlight-icon-wrapper ram">
              <span class="material-symbols-outlined">memory</span>
            </div>
            <div class="modal-highlight-content">
              <span class="modal-highlight-label">${t('label_ram')}</span>
              <span class="modal-highlight-value">${product.memoria_ram.capacidad || product.memoria_ram.instalada || ''}</span>
              <span class="modal-highlight-sub">${(product.memoria_ram.expandible || product.memoria_ram.expandible_minima) ? tSpecs('Expandible') : ''}</span>
            </div>
          </div>
          ` : ''}
          
          ${product.almacenamiento ? `
          <div class="modal-highlight-card">
            <div class="modal-highlight-icon-wrapper storage">
              <span class="material-symbols-outlined">hard_drive</span>
            </div>
            <div class="modal-highlight-content">
              <span class="modal-highlight-label">${t('label_storage')}</span>
              <span class="modal-highlight-value">${product.almacenamiento.capacidad || ''}</span>
              <span class="modal-highlight-sub">${product.almacenamiento.tipo || ''}</span>
            </div>
          </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function generateDisplaySection(product) {
    if (!product.pantalla && !product.monitor) return '';
    const d = product.pantalla || product.monitor;

    return `
      <div class="modal-section">
        <div class="modal-section-header">
          <span class="modal-section-icon">🖥️</span>
          <h3 class="modal-section-title">${product.pantalla ? t('section_display') : t('section_monitor')}</h3>
        </div>
        <div class="modal-spec-grid">
          <div class="modal-spec-item">
            <span class="label">${t('spec_size')}</span>
            <span class="value">${tSpecs(d.tamaño || d.tamano || '-')}</span>
          </div>
          <div class="modal-spec-item">
            <span class="label">${t('spec_panel')}</span>
            <span class="value">${d.tipo || d.tipo_panel || '-'}</span>
          </div>
          ${d.entrada_video ? `
          <div class="modal-spec-item">
            <span class="label">${t('spec_video_input')}</span>
            <span class="value">${tSpecs(d.entrada_video)}</span>
          </div>` : ''}
        </div>
      </div>
    `;
  }

  function generateAccessoriesSection(product) {
    const acc = product.accesorios || [];
    let accText = '';

    if (Array.isArray(acc)) {
      accText = acc.map(item => tSpecs(item)).join(', ');
    } else {
      accText = acc.mouse_teclado ? tSpecs(acc.mouse_teclado) : t('val_none');
    }

    return `
      <div class="modal-section">
        <div class="modal-section-header">
          <span class="modal-section-icon">🎁</span>
          <h3 class="modal-section-title">${t('section_accessories')}</h3>
        </div>
        <div class="modal-spec-grid">
          <div class="modal-spec-item full-width">
            <span class="label">${t('spec_extra')}</span>
            <span class="value">${accText}</span>
          </div>
          <div class="modal-spec-item full-width">
            <span class="label">${t('spec_notes')}</span>
            <span class="value">${tSpecs(product.nota || product.notas || '-')}</span>
          </div>
        </div>
      </div>
    `;
  }
});
