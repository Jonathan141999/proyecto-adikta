// Contadores animados estilo Ant Design
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".impact-card h3");
  let activated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let current = 0;
      const increment = target / 160; // Velocidad de animación

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = "+" + Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = "+" + target.toLocaleString();
        }
      };

      updateCounter();
    });
  };

  const impactSection = document.querySelector(".impact");
  if (impactSection) {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !activated) {
          animateCounters();
          activated = true;
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(impactSection);
  }
});
