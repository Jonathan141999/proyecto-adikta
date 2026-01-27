// Carrusel de Misión/Visión/Valores - Estilo Ant Design
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".mv-slide");
  const dots = document.querySelectorAll(".mv-dot");
  const prevBtn = document.querySelector(".mv-arrow.left");
  const nextBtn = document.querySelector(".mv-arrow.right");
  const carousel = document.querySelector(".mv-carousel");

  if (!slides.length || !carousel) return;

  let currentIndex = 0;
  let isAnimating = false;

  function changeSlide(newIndex) {
    if (isAnimating || newIndex === currentIndex) return;

    isAnimating = true;

    // Quitar slide actual
    slides[currentIndex].classList.remove("active");
    if (dots[currentIndex]) dots[currentIndex].classList.remove("active");

    // Intervalo vacío para transición
    setTimeout(() => {
      currentIndex = newIndex;

      slides[currentIndex].classList.add("active");
      if (dots[currentIndex]) dots[currentIndex].classList.add("active");

      // Permitir siguiente animación
      setTimeout(() => {
        isAnimating = false;
      }, 400);
    }, 200);
  }

  // Dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      changeSlide(index);
    });
  });

  // Flechas
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const nextIndex = (currentIndex + 1) % slides.length;
      changeSlide(nextIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      changeSlide(prevIndex);
    });
  }

  // Swipe móvil
  let startX = 0;
  let endX = 0;

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeDistance = startX - endX;

    if (Math.abs(swipeDistance) < 50) return;
    if (isAnimating) return;

    if (swipeDistance > 0) {
      // Swipe izquierda → siguiente
      const nextIndex = (currentIndex + 1) % slides.length;
      changeSlide(nextIndex);
    } else {
      // Swipe derecha → anterior
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      changeSlide(prevIndex);
    }
  }

  // Auto-play opcional (comentado por defecto)
  // setInterval(() => {
  //   const nextIndex = (currentIndex + 1) % slides.length;
  //   changeSlide(nextIndex);
  // }, 5000);
});
