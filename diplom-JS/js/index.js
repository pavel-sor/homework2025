import HeaderFixed from './header.js';
import BurgerMenu from './burger.js';
import CartModal from './cart-modal.js';
import OrderModal from './order-modal.js';
import OrderSizeModal from './order-size-modal.js';
import SearchModal from './search-modal.js'; // новый импорт
import { productSlider } from './product-slider.js';
import { sizes } from './sizes.js';

try {
  const headerFixed = new HeaderFixed({
    HEADER: 'header',
    HEADER_FIXED: 'header--fixed',
  });

  new BurgerMenu(
    {
      BURGER: 'burger',
      BURGER_OPEN: 'burger--open',
      HEADER_MENU: 'header__menu',
      HEADER_MENU_OPEN: 'header__menu--open',
      lABEL: {
        OPEN: 'Открыть меню',
        CLOSE: 'Закрыть меню',
      },
      PAGE_BODY: 'page__body',
      PAGE_BODY_NO_SCROLL: 'page__body--no-scroll',
      MENU_LINK: 'menu__link',
      BREAKPOINT: 768,
      MAIN: 'main',
    },
    headerFixed,
  );

  // Инициализация модального окна для кнопки "Сделать заказ" в хедере
  new OrderModal();

  // Инициализация модального окна для ссылки "Заказать размер"
  new OrderSizeModal();

  // Инициализация модального окна поиска
  new SearchModal();

  // Инициализация модального окна корзины
  const cartModal = new CartModal({
    PAGE_BODY: 'page__body',
    PAGE_BODY_NO_SCROLL: 'page__body--no-scroll',
    CART_MODAL_WINDOW: 'cart',
    API_URL: 'https://jsonplaceholder.typicode.com/posts'
  });

  productSlider();

  // Инициализация sizes с интеграцией корзины
  const sizesAPI = sizes({
    onAddToCart: (item) => {
      console.log('Adding to cart from sizes:', item);
      if (cartModal) {
        cartModal.addItem(item);
      } else {
        console.error('cartModal is not initialized');
      }
    },
    onOpenCart: () => {
      console.log('Opening cart from sizes');
      if (cartModal) {
        cartModal.open();
      } else {
        console.error('cartModal is not initialized');
      }
    }
  });

  // Для отладки
  window.cartModal = cartModal;
  window.sizesAPI = sizesAPI;

} catch (error) {
  console.error('Application error:', error);
}