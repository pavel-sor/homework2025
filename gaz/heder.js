// ========================================
// ПОЯВЛЕНИЕ ХЕДЕРА ПРИ СКРОЛЛЕ
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    let scrollThreshold = 50; // Пикселей для появления
    let isHeaderVisible = false;

    function handleScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        
        if (scrollY > scrollThreshold && !isHeaderVisible) {
            header.classList.add('header-visible');
            isHeaderVisible = true;
        } else if (scrollY <= scrollThreshold && isHeaderVisible) {
            header.classList.remove('header-visible');
            isHeaderVisible = false;
        }
    }

    // Оптимизация производительности (throttle)
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Проверка при загрузке (если страница уже прокручена)
    handleScroll();
});