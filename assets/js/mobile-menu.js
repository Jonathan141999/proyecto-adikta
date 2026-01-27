// Menú hamburguesa responsive estilo Ant Design
document.addEventListener("DOMContentLoaded", () => {
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".main-nav ul");

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("active");
      mobileBtn.classList.toggle("active");
    });

    // Cerrar al hacer click fuera
    document.addEventListener("click", (e) => {
      if (!mobileBtn.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        mobileBtn.classList.remove("active");
      }
    });

    // Evitar cierre al tocar dentro del menú
    navMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
});
