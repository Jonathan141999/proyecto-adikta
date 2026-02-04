document.addEventListener('DOMContentLoaded', function () {
  // Create modal markup
  const modalHtml = `
    <div class="pdf-modal-overlay" style="display:none;">
      <div class="pdf-modal" role="dialog" aria-modal="true" aria-label="Catálogo PDF">
        <button class="pdf-modal-close" aria-label="Cerrar catálogo">✕</button>
        <div class="pdf-modal-body">
          <iframe class="pdf-iframe" src="" frameborder="0" width="100%" height="100%"></iframe>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const overlay = document.querySelector('.pdf-modal-overlay');
  const modal = document.querySelector('.pdf-modal');
  const iframe = document.querySelector('.pdf-iframe');
  const closeBtn = document.querySelector('.pdf-modal-close');

  function openPdf(url) {
    if (!url) return;
    iframe.src = url + '#toolbar=0&navpanes=0&scrollbar=1';
    overlay.style.display = 'flex';
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => modal.classList.add('open'), 10);
  }

  function closePdf() {
    modal.classList.remove('open');
    setTimeout(() => {
      overlay.style.display = 'none';
      iframe.src = '';
      document.documentElement.style.removeProperty('overflow');
    }, 200);
  }

  // Attach to links with class .open-catalog
  document.querySelectorAll('a.open-catalog').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const pdf = el.getAttribute('data-pdf') || el.href;
      openPdf(pdf);
    });
  });

  overlay.addEventListener('click', function (ev) { if (ev.target === overlay) closePdf(); });
  closeBtn.addEventListener('click', closePdf);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePdf(); });
});
