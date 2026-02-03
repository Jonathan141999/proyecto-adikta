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

    slides[currentIndex].classList.remove("active");
    if (dots[currentIndex]) dots[currentIndex].classList.remove("active");

    setTimeout(() => {
      currentIndex = newIndex;

      slides[currentIndex].classList.add("active");
      if (dots[currentIndex]) dots[currentIndex].classList.add("active");

      setTimeout(() => {
        isAnimating = false;
      }, 400);
    }, 200);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      changeSlide(index);
    });
  });

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
      const nextIndex = (currentIndex + 1) % slides.length;
      changeSlide(nextIndex);
    } else {
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      changeSlide(prevIndex);
    }
  }
});
