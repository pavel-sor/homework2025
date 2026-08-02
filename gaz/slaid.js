(function () {
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let current = 0;
    const total = slides.length;
    let autoPlayTimer = null;
    let isTransitioning = false;

    function checkImagesLoaded() {
        const images = document.querySelectorAll('.slide-bg');
        let loadedCount = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
            slider.classList.add('loaded');
            return;
        }

        images.forEach(img => {
            if (img.complete) {
                loadedCount++;
            } else {
                img.addEventListener('load', function () {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        slider.classList.add('loaded');
                    }
                });
                img.addEventListener('error', function () {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        slider.classList.add('loaded');
                    }
                });
            }
        });

        if (loadedCount === totalImages) {
            slider.classList.add('loaded');
        }
    }

    checkImagesLoaded();

    function goTo(index) {
        if (isTransitioning) return;
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        if (index === current) return;

        isTransitioning = true;

        const currentSlide = slides[current];
        const nextSlide = slides[index];

        currentSlide.classList.remove('active');
        dots[current].classList.remove('active');
        nextSlide.classList.add('active');
        dots[index].classList.add('active');

        const bg = nextSlide.querySelector('.slide-bg');
        if (bg) {
            bg.style.animation = 'none';
            void bg.offsetWidth;
            bg.style.animation = '';
        }

        const title = nextSlide.querySelector('.slide-title');
        const desc = nextSlide.querySelector('.slide-desc');
        const btn = nextSlide.querySelector('.slide-btn');

        if (title) {
            title.style.animation = 'none';
            void title.offsetWidth;
            title.style.animation = '';
        }
        if (desc) {
            desc.style.animation = 'none';
            void desc.offsetWidth;
            desc.style.animation = '';
        }
        if (btn) {
            btn.style.animation = 'none';
            void btn.offsetWidth;
            btn.style.animation = '';
        }

        current = index;

        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    function nextSlide() {
        goTo(current + 1);
        resetAutoPlay();
    }

    function prevSlide() {
        goTo(current - 1);
        resetAutoPlay();
    }

    prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        prevSlide();
    });

    nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        nextSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function (e) {
            e.preventDefault();
            goTo(index);
            resetAutoPlay();
        });
    });

    function startAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
        // АВТОПЕРЕКЛЮЧЕНИЕ КАЖДЫЕ 20 СЕКУНД
        autoPlayTimer = setInterval(function () {
            if (!isTransitioning) {
                nextSlide();
            }
        }, 15000);
        console.log('Автоплей запущен, интервал 20 секунд');
    }

    function resetAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
        startAutoPlay();
    }

    // ЗАПУСКАЕМ АВТОПЛЕЙ СРАЗУ ПОСЛЕ ЗАГРУЗКИ СТРАНИЦЫ
    setTimeout(function () {
        if (slider.classList.contains('loaded')) {
            startAutoPlay();
        } else {
            slider.classList.add('loaded');
            startAutoPlay();
        }
    }, 500);

    // ДУБЛИРУЕМ ЗАПУСК ПРИ ЗАГРУЗКЕ ИЗОБРАЖЕНИЙ
    if (slider.classList.contains('loaded')) {
        startAutoPlay();
    } else {
        const observer = new MutationObserver(function () {
            if (slider.classList.contains('loaded')) {
                startAutoPlay();
                observer.disconnect();
            }
        });
        observer.observe(slider, { attributes: true, attributeFilter: ['class'] });
    }

    const container = document.getElementById('slider');
    container.addEventListener('mouseenter', function () {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
            console.log('Автоплей остановлен (наведение)');
        }
    });

    container.addEventListener('mouseleave', function () {
        if (slider.classList.contains('loaded')) {
            startAutoPlay();
            console.log('Автоплей возобновлен (уход мыши)');
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoPlay();
        }
    }, { passive: true });

})();