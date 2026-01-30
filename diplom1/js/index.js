import HeaderFixed from "./header.js";
import BurgerMenu from "./burger.js";
import Modal from "./modal.js";
import { heroSlider } from "./hero-slider.js";
import { initProductCarousel } from "./product.js";
import { initKeyboardSearch } from "./keyboard.js";

try {
  const headerFixed = new HeaderFixed({
    HEADER: "header",
    HEADER_FIXED: "header--fixed",
  });

  new BurgerMenu(
    {
      BURGER: "burger",
      BURGER_OPEN: "burger--open",
      HEADER_MENU: "header__menu",
      HEADER_MENU_OPEN: "menu--open",
      lABEL: {
        OPEN: "Открыть меню",
        CLOSE: "Закрыть меню",
      },
      PAGE_BODY: "page__body",
      PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
      MENU_LINK: "menu__link",
      BREAKPOINT: 768,
    },
    headerFixed,
  );

   new Modal({
    PAGE_BODY: "page__body",
      PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
  });

  // Инициализируем слайдер после загрузки DOM
  document.addEventListener("DOMContentLoaded", () => {
    heroSlider();
    initProductCarousel(); // Инициализируем карусель продуктов
    initKeyboardSearch();
  });


  
} catch (error) {
  console.error(error);
}
