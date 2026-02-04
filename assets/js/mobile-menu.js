document.addEventListener("DOMContentLoaded", () => {
  const mobileBtn = document.querySelector(".mobile-menu-btn");

  function attachMenuHandlers(navRoot) {
    const navMenu = navRoot ? navRoot.querySelector('ul') : null;

    mobileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const opening = !navRoot.classList.contains("active");
      navRoot.classList.toggle("active");
      mobileBtn.classList.toggle("active");
      if (opening) {
        navRoot.style.display = 'flex';
      } else {
        navRoot.style.removeProperty('display');
      }
      console.debug('mobile-menu: toggled active=', navRoot.classList.contains('active'));
    });

    document.addEventListener("click", (e) => {
      if (!mobileBtn.contains(e.target) && !navRoot.contains(e.target)) {
        navRoot.classList.remove("active");
        mobileBtn.classList.remove("active");
        navRoot.style.removeProperty('display');
      }
    });

    if (navMenu) {
      navMenu.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  }

  let attempts = 0;
  function findNav() {
    const navRoot = document.querySelector('.main-nav');
    if (mobileBtn && navRoot) {
      attachMenuHandlers(navRoot);
      return;
    }
    attempts += 1;
    if (attempts < 20) {
      setTimeout(findNav, 100);
    } else {
      console.warn('mobile-menu: .main-nav or .mobile-menu-btn not found');
    }
  }

  findNav();
});
