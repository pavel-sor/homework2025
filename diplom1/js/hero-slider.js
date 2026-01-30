export const heroSlider = () => {
  return new Swiper(".hero__slider", {
    slidesPerView: 1,
    centeredSlides: false,
    loop: true,
    mousewheel: {
      forceToAxis: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
    },
    navigation: {
      prevEl: ".hero__slider-button--prev",
      nextEl: ".hero__slider-button--next",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 500,
  });
};