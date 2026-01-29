// product.js - обновленная версия с адаптивностью
export const initProductCarousel = () => {
  const container = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.slide');
  
  if (!container || slides.length === 0) return;
  
  let currentIndex = 0;
  let carouselInterval;
  
  // Функция для определения количества видимых слайдов
  const getSlidesPerView = () => {
    const width = window.innerWidth;
    if (width <= 576) return 1;
    if (width <= 992) return 2;
    if (width <= 1200) return 3;
    return 4;
  };
  
  // Функция для получения ширины слайда
  const getSlideWidth = () => {
    const slidesPerView = getSlidesPerView();
    const containerWidth = container.parentElement.offsetWidth;
    const margin = 20; // отступ между слайдами
    return (containerWidth / slidesPerView) - margin;
  };
  
  const moveToNextSlide = () => {
    const slideWidth = getSlideWidth();
    const slidesPerView = getSlidesPerView();
    
    // Плавный переход
    container.style.transition = 'left 0.5s ease-in-out';
    container.style.left = `-${slideWidth}px`;
    
    setTimeout(() => {
      // Сбрасываем анимацию
      container.style.transition = 'none';
      
      // Перемещаем первые N слайдов в конец (N = slidesPerView)
      for (let i = 0; i < slidesPerView; i++) {
        const slide = slides[(currentIndex + i) % slides.length];
        container.appendChild(slide);
      }
      
      // Сбрасываем позицию
      container.style.left = '0';
      
      // Обновляем индекс
      currentIndex = (currentIndex + slidesPerView) % slides.length;
      
      // Обновляем коллекцию слайдов
      const newSlides = document.querySelectorAll('.slide');
      slides.length = 0;
      newSlides.forEach(slide => slides.push(slide));
    }, 500);
  };
  
  // Инициализация
  const initCarousel = () => {
    container.style.left = '0';
    
    // Останавливаем предыдущий интервал
    if (carouselInterval) {
      clearInterval(carouselInterval);
    }
    
    // Запускаем с новыми настройками
    carouselInterval = setInterval(moveToNextSlide, 3000);
  };
  
  // Запускаем при загрузке
  initCarousel();
  
  // Переинициализируем при изменении размера окна
  window.addEventListener('resize', initCarousel);
  
  // Пауза при наведении
  container.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
  });
  
  container.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(moveToNextSlide, 3000);
  });
  
  // Для тач-устройств
  let touchStartX = 0;
  let touchEndX = 0;
  
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(carouselInterval);
  });
  
  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    carouselInterval = setInterval(moveToNextSlide, 3000);
  });
  
  const handleSwipe = () => {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      // Свайп влево - следующий слайд
      moveToNextSlide();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Свайп вправо - предыдущий слайд (можно реализовать)
      // Для простоты оставляем только вперед
    }
  };
};