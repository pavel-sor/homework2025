export const sizes = (callbacks = {}) => {
  const sizesInStockList = document.querySelector('[data-sizes="list"]');
  const sizesInStockButtons = document.querySelectorAll('[data-sizes="button"]');
  const sizesToOrderButtons = document.querySelectorAll('.product__sizes .product__sizes-button[disabled]');
  const buyOneClickButton = document.querySelector('.product__buy-button');
  const addToCartButton = document.querySelector('.product__cart-button');
  const priceElement = document.querySelector('.product__price');

  let selectedSize = null;
  const basePrice = 36490;
  const productData = {
    id: 1,
    title: 'Nike Air Mag Back To Future',
    price: basePrice,
    image: './images/nike-air-mag-1.png'
  };

  // Форматирование цены
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  // Обработчик выбора размера
  const handleSizeClick = (event) => {
    const target = event.target;

    if (!target?.classList.contains("product__sizes-button")) return;
    if (target.disabled) return;

    sizesInStockButtons.forEach((button) =>
      button.classList.remove("product__sizes-button--active")
    );

    target.classList.add("product__sizes-button--active");
    selectedSize = target.textContent.trim();

    updateBuyButtonsState(true);
    console.log(`Выбран размер: ${selectedSize}`);
  };

  // Обновление состояния кнопок
  const updateBuyButtonsState = (enabled) => {
    if (buyOneClickButton) {
      if (enabled) {
        buyOneClickButton.removeAttribute('disabled');
      } else {
        buyOneClickButton.setAttribute('disabled', 'disabled');
      }
    }

    if (addToCartButton) {
      if (enabled) {
        addToCartButton.removeAttribute('disabled');
        addToCartButton.classList.remove('product__cart-button--disabled');
      } else {
        addToCartButton.setAttribute('disabled', 'disabled');
        addToCartButton.classList.add('product__cart-button--disabled');
      }
    }
  };

  // Обработчик покупки в 1 клик
  const handleBuyOneClick = () => {
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер');
      return;
    }

    // Добавляем товар в корзину
    if (callbacks.onAddToCart) {
      callbacks.onAddToCart({
        ...productData,
        size: selectedSize
      });
    }

    // Открываем корзину
    if (callbacks.onOpenCart) {
      callbacks.onOpenCart();
    }

    console.log(`Покупка в 1 клик: размер ${selectedSize}`);
  };

  // Обработчик добавления в корзину
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер');
      return;
    }

    if (callbacks.onAddToCart) {
      callbacks.onAddToCart({
        ...productData,
        size: selectedSize
      });
    }

    console.log(`Добавлено в корзину: размер ${selectedSize}, цена ${basePrice} ₽`);

    addToCartButton.classList.add('product__cart-button--added');
    setTimeout(() => {
      addToCartButton.classList.remove('product__cart-button--added');
    }, 500);
  };

  // Обработчик заказа размера под заказ
  const handleOrderSize = (event) => {
    const target = event.target;

    if (target.classList.contains('product__sizes-button') && target.disabled) {
      const size = target.textContent.trim();

      if (confirm(`Размер ${size} доступен под заказ. Хотите оформить предзаказ?`)) {
        console.log(`Предзаказ размера ${size}`);
      }
    }
  };

  // Инициализация состояния
  const initSizesState = () => {
    const defaultSize = Array.from(sizesInStockButtons).find(
      button => button.classList.contains('product__sizes-button--active')
    );

    if (defaultSize) {
      selectedSize = defaultSize.textContent.trim();
      updateBuyButtonsState(true);
    } else {
      updateBuyButtonsState(false);
    }
  };

  // Добавление обработчиков
  if (sizesInStockList) {
    sizesInStockList.addEventListener("click", handleSizeClick);
  }

  sizesToOrderButtons.forEach(button => {
    button.addEventListener('click', handleOrderSize);
  });

  if (buyOneClickButton) {
    buyOneClickButton.addEventListener('click', handleBuyOneClick);
  }

  if (addToCartButton) {
    addToCartButton.addEventListener('click', handleAddToCart);

    if (!selectedSize) {
      addToCartButton.classList.add('product__cart-button--disabled');
    }
  }

  initSizesState();

  return {
    getSelectedSize: () => selectedSize,
    resetSelection: () => {
      selectedSize = null;
      sizesInStockButtons.forEach(button =>
        button.classList.remove('product__sizes-button--active')
      );
      updateBuyButtonsState(false);
    },
    selectSize: (size) => {
      const buttonToSelect = Array.from(sizesInStockButtons).find(
        button => button.textContent.trim() === size.toString()
      );
      if (buttonToSelect && !buttonToSelect.disabled) {
        buttonToSelect.click();
      }
    }
  };
};
