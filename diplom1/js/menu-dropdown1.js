// Функция для выпадающего меню
document.addEventListener('DOMContentLoaded', function() {
    console.log('Menu dropdown script loaded');
    
    const dropdownItems = document.querySelectorAll('.menu__item--dropdown');
    console.log('Dropdown items found:', dropdownItems.length);
    
    dropdownItems.forEach(item => {
        const menuLink = item.querySelector('.menu__link');
        const dropdownMenu = item.querySelector('.dropdown-menu');
        const arrow = item.querySelector('.menu__link-arrow');
        
        if (!menuLink || !dropdownMenu) {
            console.error('Dropdown elements not found');
            return;
        }
        
        // Открытие/закрытие при клике на мобильных
        menuLink.addEventListener('click', function(e) {
            if (window.innerWidth < 1024) {
                e.preventDefault();
                e.stopPropagation();
                
                // Закрываем все остальные открытые меню
                document.querySelectorAll('.dropdown-menu--open').forEach(openMenu => {
                    if (openMenu !== dropdownMenu) {
                        openMenu.classList.remove('dropdown-menu--open');
                    }
                });
                
                // Переключаем текущее меню
                dropdownMenu.classList.toggle('dropdown-menu--open');
                
                // Просто показываем/скрываем стрелку без поворота
                if (arrow) {
                    arrow.classList.toggle('menu__link-arrow--open');
                }
            }
        });
        
        // Закрытие при клике вне меню (только для мобильных)
        document.addEventListener('click', function(e) {
            if (window.innerWidth < 1024 && !item.contains(e.target)) {
                dropdownMenu.classList.remove('dropdown-menu--open');
                if (arrow) {
                    arrow.classList.remove('menu__link-arrow--open');
                }
            }
        });
        
        // Для десктопа - hover события
        if (window.innerWidth >= 1024) {
            item.addEventListener('mouseenter', function() {
                dropdownMenu.classList.add('dropdown-menu--open');
                if (arrow) {
                    arrow.classList.add('menu__link-arrow--open');
                }
            });
            
            item.addEventListener('mouseleave', function() {
                dropdownMenu.classList.remove('dropdown-menu--open');
                if (arrow) {
                    arrow.classList.remove('menu__link-arrow--open');
                }
            });
        }
    });
    
    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        // Закрываем все меню при изменении размера
        document.querySelectorAll('.dropdown-menu--open').forEach(menu => {
            menu.classList.remove('dropdown-menu--open');
        });
        document.querySelectorAll('.menu__link-arrow--open').forEach(arrow => {
            arrow.classList.remove('menu__link-arrow--open');
        });
    });
});