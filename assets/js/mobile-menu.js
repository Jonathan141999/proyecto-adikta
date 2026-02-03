document.addEventListener("DOMContentLoaded", () => {
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".main-nav ul");

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("active");
      mobileBtn.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!mobileBtn.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        mobileBtn.classList.remove("active");
      }
    });

    navMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
});
