// ===== СКРИПТ ДЛЯ БУРГЕР-МЕНЮ =====
document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burgerBtn');
    const navList = document.querySelector('.nav-list');
    const body = document.body;
    
    if (burgerBtn && navList) {
      // Функция открытия/закрытия меню
      function toggleMenu() {
        burgerBtn.classList.toggle('active');
        navList.classList.toggle('open');
        body.classList.toggle('menu-open'); // Блокировка скролла
      }
      
      // Клик по бургеру
      burgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
      });
      
      // Закрытие меню при клике на ссылку
      const navLinks = navList.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          if (navList.classList.contains('open')) {
            toggleMenu();
          }
        });
      });
      
      // Закрытие при клике вне меню
      document.addEventListener('click', function(e) {
        if (navList.classList.contains('open')) {
          const isClickInside = navList.contains(e.target) || burgerBtn.contains(e.target);
          if (!isClickInside) {
            toggleMenu();
          }
        }
      });
      
      // Закрытие при нажатии Escape
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navList.classList.contains('open')) {
          toggleMenu();
        }
      });
    }
  });