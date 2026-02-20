export default class CartModal {
  constructor(config) {
    this.config = {
      MODAL_WRAPPER: "modal",
      CART_MODAL_WINDOW: "cart",
      API_URL: "https://jsonplaceholder.typicode.com/posts",
      PAGE_BODY: "page__body",
      PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
      ...config,
    };

    this.modal = document.querySelector(`.${this.config.MODAL_WRAPPER}`);
    this.body = document.querySelector(`.${this.config.PAGE_BODY}`);
    this.cartItems = [];
    this.isOpen = false;
    this.modalWindow = null;
    this.handleContainerClick = this.handleContainerClick.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.phoneMask = this.phoneMask.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    if (!this.modal) {
      throw new Error("Modal element is missing.");
    }

    this.init();
  }

  init() {
    // Создаем контейнер модального окна, если его нет
    this.createModalContainer();
    this.createCartModalHTML();
    this.bindEvents();
    this.loadCartFromStorage();
  }

  createModalContainer() {
    if (!this.modal) {
      const modalContainer = document.createElement('div');
      modalContainer.className = this.config.MODAL_WRAPPER;
      document.body.appendChild(modalContainer);
      this.modal = modalContainer;
    }
  }

  createCartModalHTML() {
    const existingCartModal = this.modal.querySelector(
      `[data-modal-window="${this.config.CART_MODAL_WINDOW}"]`,
    );

    if (existingCartModal) {
      this.modalWindow = existingCartModal;
      return;
    }

    const modalHTML = `
    <div class="modal__window modal-cart" data-modal-window="${this.config.CART_MODAL_WINDOW}">
      <button class="modal__close" aria-label="Закрыть" title="Закрыть" data-modal-close>
        <svg width="24" height="24">
          <use href="./icons/sprite.svg#cross"></use>
        </svg>
      </button>
      <div class="modal__content modal-cart__content">
        <h3 class="modal-cart__title">Корзина</h3>
        <div class="modal-cart__items" data-cart-items></div>
        <div class="modal-cart__total" data-cart-total>
          <span>Итого:</span>
          <span class="modal-cart__total-price" data-cart-total-price>0 ₽</span>
        </div>
        <form class="modal-cart__form" data-cart-form novalidate autocomplete="off">
          <div class="modal-cart__form-group">
            <label class="modal-cart__form-label">Ваше имя *</label>
            <input type="text" class="modal-cart__form-input" name="name" placeholder="Введите ваше имя" required autocomplete="off">
            <div class="modal-cart__form-error" data-error="name"></div>
          </div>
          <div class="modal-cart__form-group">
            <label class="modal-cart__form-label">Телефон *</label>
            <input type="text" class="modal-cart__form-input" name="phone" required placeholder="+7 (___) ___ __ __" inputmode="numeric" autocomplete="off">
            <div class="modal-cart__form-error" data-error="phone"></div>
          </div>
          <div class="modal-cart__form-group">
            <label class="modal-cart__form-label">Email</label>
            <input type="email" class="modal-cart__form-input" name="email" placeholder="example@domain.com" autocomplete="off">
            <div class="modal-cart__form-error" data-error="email"></div>
          </div>
          <div class="modal-cart__form-group">
            <label class="modal-cart__form-label">Адрес доставки *</label>
            <input type="text" class="modal-cart__form-input" name="address" placeholder="Введите адрес доставки" required autocomplete="off">
            <div class="modal-cart__form-error" data-error="address"></div>
          </div>
          <button type="submit" class="modal-cart__form-submit" data-cart-submit>Оформить заказ</button>
        </form>
      </div>
    </div>
  `;

    this.modal.insertAdjacentHTML("beforeend", modalHTML);
    this.modalWindow = this.modal.querySelector(
      `[data-modal-window="${this.config.CART_MODAL_WINDOW}"]`,
    );
  }

  restoreForm() {
    const content = this.modal.querySelector(".modal-cart__content");

    const formHTML = `
    <h3 class="modal-cart__title">Корзина</h3>
    <div class="modal-cart__items" data-cart-items></div>
    <div class="modal-cart__total" data-cart-total>
      <span>Итого:</span>
      <span class="modal-cart__total-price" data-cart-total-price>0 ₽</span>
    </div>
    <form class="modal-cart__form" data-cart-form novalidate autocomplete="off">
      <div class="modal-cart__form-group">
        <label class="modal-cart__form-label">Ваше имя *</label>
        <input type="text" class="modal-cart__form-input" name="name" placeholder="Введите ваше имя" required autocomplete="off">
        <div class="modal-cart__form-error" data-error="name"></div>
      </div>
      <div class="modal-cart__form-group">
        <label class="modal-cart__form-label">Телефон *</label>
        <input type="text" class="modal-cart__form-input" name="phone" required placeholder="+7 (___) ___ __ __" inputmode="numeric" autocomplete="off">
        <div class="modal-cart__form-error" data-error="phone"></div>
      </div>
      <div class="modal-cart__form-group">
        <label class="modal-cart__form-label">Email</label>
        <input type="email" class="modal-cart__form-input" name="email" placeholder="example@domain.com" autocomplete="off">
        <div class="modal-cart__form-error" data-error="email"></div>
      </div>
      <div class="modal-cart__form-group">
        <label class="modal-cart__form-label">Адрес доставки *</label>
        <input type="text" class="modal-cart__form-input" name="address" placeholder="Введите адрес доставки" required autocomplete="off">
        <div class="modal-cart__form-error" data-error="address"></div>
      </div>
      <button type="submit" class="modal-cart__form-submit" data-cart-submit>Оформить заказ</button>
    </form>
  `;

    content.innerHTML = formHTML;

    const form = this.modal.querySelector("[data-cart-form]");
    if (form) {
      form.addEventListener("submit", this.handleSubmit);
    }

    const phoneInput = this.modal.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener("input", this.phoneMask);
    }
  }

  bindEvents() {
    const cartButtons = document.querySelectorAll("[data-cart-button]");
    cartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Закрытие по клику на оверлей
    this.modal.addEventListener('click', this.handleOverlayClick);

    // Закрытие по Escape
    document.addEventListener('keydown', this.handleEscapeKey);

    // Закрытие по кнопке закрытия (делегирование)
    this.modal.addEventListener('click', (e) => {
      if (e.target.closest('[data-modal-close]')) {
        this.close();
      }
    });

    const form = this.modal.querySelector("[data-cart-form]");
    if (form) {
      form.addEventListener("submit", this.handleSubmit);
    }

    const phoneInput = this.modal.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener("input", this.phoneMask);
    }
  }

  handleOverlayClick(e) {
    if (e.target === this.modal && this.isOpen) {
      this.close();
    }
  }

  handleEscapeKey(e) {
    if (e.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  phoneMask(e) {
    let input = e.target;
    let value = input.value.replace(/\D/g, "");
    let formattedValue = "";

    if (value.length > 0) {
      if (value.startsWith("8") || value.startsWith("7")) {
        formattedValue = "+7";
        const restDigits = value.substring(1);

        if (restDigits.length > 0) {
          formattedValue += " (" + restDigits.substring(0, 3);
          if (restDigits.length >= 4) {
            formattedValue += ") " + restDigits.substring(3, 6);
            if (restDigits.length >= 7) {
              formattedValue += " " + restDigits.substring(6, 8);
              if (restDigits.length >= 9) {
                formattedValue += " " + restDigits.substring(8, 10);
              }
            }
          }
        }
      }
    }

    input.value = formattedValue;
  }

  addItem(item) {
    const existingItemIndex = this.cartItems.findIndex(
      (i) => i.id === item.id && i.size === item.size,
    );

    if (existingItemIndex !== -1) {
      this.cartItems[existingItemIndex].quantity += 1;
    } else {
      this.cartItems.push({
        ...item,
        quantity: 1,
      });
    }

    this.saveCartToStorage();
    this.updateCartDisplay();
    this.updateCartCounter();
  }

  removeItem(itemId, size) {
    this.cartItems = this.cartItems.filter(
      (item) => !(item.id === itemId && item.size === size),
    );

    this.saveCartToStorage();
    this.updateCartDisplay();
    this.updateCartCounter();
  }

  updateQuantity(itemId, size, delta) {
    const itemIndex = this.cartItems.findIndex(
      (i) => i.id === itemId && i.size === size,
    );

    if (itemIndex !== -1) {
      const newQuantity = this.cartItems[itemIndex].quantity + delta;

      if (newQuantity <= 0) {
        this.removeItem(itemId, size);
      } else {
        this.cartItems[itemIndex].quantity = newQuantity;
        this.saveCartToStorage();
        this.updateCartDisplay();
        this.updateCartCounter();
      }
    }
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }

  getTotalItems() {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateCartDisplay() {
    const container = this.modal.querySelector("[data-cart-items]");
    const totalElement = this.modal.querySelector("[data-cart-total-price]");

    if (!container) return;

    if (this.cartItems.length === 0) {
      container.innerHTML = `
        <div class="modal-cart__empty">
          <svg class="modal-cart__empty-icon" width="60" height="60" viewBox="0 0 24 24">
            <use href="./icons/sprite.svg#cart"></use>
          </svg>
          <p>Корзина пуста</p>
        </div>
      `;
      totalElement.textContent = "0 ₽";
      return;
    }

    container.innerHTML = this.cartItems
      .map(
        (item) => `
      <div class="modal-cart__item" data-cart-item="${item.id}" data-size="${item.size}">
        <img src="${item.image || "./images/nike-air-mag-1.png"}" alt="${item.title}" class="modal-cart__item-img">
        <div class="modal-cart__item-info">
          <div class="modal-cart__item-title">${item.title}</div>
          <div class="modal-cart__item-size">Размер: ${item.size}</div>
          <div class="modal-cart__item-price">${item.price.toLocaleString()} ₽</div>
          <div class="modal-cart__item-quantity">
            <button class="modal-cart__item-quantity-btn" data-quantity="decrease" ${item.quantity <= 1 ? "disabled" : ""}>-</button>
            <span>${item.quantity}</span>
            <button class="modal-cart__item-quantity-btn" data-quantity="increase">+</button>
          </div>
        </div>
        <button class="modal-cart__item-remove" data-remove-item title="Удалить товар">×</button>
      </div>
    `,
      )
      .join("");

    totalElement.textContent = `${this.getTotalPrice().toLocaleString()} ₽`;

    container.removeEventListener("click", this.handleContainerClick);
    container.addEventListener("click", this.handleContainerClick);
  }

  handleContainerClick(e) {
    const target = e.target;

    if (target.closest("[data-remove-item]")) {
      e.preventDefault();
      e.stopPropagation();

      const item = target.closest("[data-cart-item]");
      if (!item) return;

      const id = item.dataset.cartItem;
      const size = item.dataset.size;

      item.style.transition = "all 0.3s ease";
      item.style.opacity = "0";
      item.style.transform = "translateX(20px)";

      setTimeout(() => {
        this.removeItem(parseInt(id), size);
      }, 300);
    }

    if (target.closest('[data-quantity="decrease"]')) {
      e.preventDefault();
      e.stopPropagation();

      const item = target.closest("[data-cart-item]");
      if (!item) return;

      const id = item.dataset.cartItem;
      const size = item.dataset.size;

      this.updateQuantity(parseInt(id), size, -1);
    }

    if (target.closest('[data-quantity="increase"]')) {
      e.preventDefault();
      e.stopPropagation();

      const item = target.closest("[data-cart-item]");
      if (!item) return;

      const id = item.dataset.cartItem;
      const size = item.dataset.size;

      this.updateQuantity(parseInt(id), size, 1);
    }
  }

  updateCartCounter() {
    const counters = document.querySelectorAll("[data-cart-counter]");
    const totalItems = this.getTotalItems();

    counters.forEach((counter) => {
      counter.textContent = totalItems;
      counter.style.display = totalItems > 0 ? "flex" : "none";
    });
  }

  saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
  }

  loadCartFromStorage() {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          this.cartItems = parsedCart.filter(
            (item) => item && typeof item === "object" && item.id && item.size,
          );
        } else {
          this.cartItems = [];
          localStorage.removeItem("cart");
        }
      } catch (e) {
        this.cartItems = [];
        localStorage.removeItem("cart");
      }
    } else {
      this.cartItems = [];
    }

    this.updateCartDisplay();
    this.updateCartCounter();
  }

  clearCart() {
    this.cartItems = [];
    this.saveCartToStorage();
    this.updateCartDisplay();
    this.updateCartCounter();
  }

  validateForm(formData) {
    const errors = {};

    if (!formData.name) {
      errors.name = "Введите имя";
    } else if (formData.name.length < 2) {
      errors.name = "Имя должно содержать минимум 2 символа";
    }

    if (!formData.phone) {
      errors.phone = "Введите телефон";
    } else {
      const digitsOnly = formData.phone.replace(/\D/g, "");
      if (digitsOnly.length < 11) {
        errors.phone = "Введите полный номер телефона";
      }
    }

    if (!formData.address) {
      errors.address = "Введите адрес доставки";
    } else if (formData.address.length < 5) {
      errors.address = "Введите полный адрес";
    }

    return errors;
  }

  showErrors(errors) {
    Object.keys(errors).forEach((field) => {
      const errorElement = this.modal.querySelector(`[data-error="${field}"]`);
      const input = this.modal.querySelector(`[name="${field}"]`);

      if (errorElement) {
        errorElement.textContent = errors[field];
      }

      if (input) {
        input.classList.add("error");
      }
    });
  }

  clearErrors() {
    this.modal
      .querySelectorAll("[data-error]")
      .forEach((el) => (el.textContent = ""));
    this.modal.querySelectorAll(".modal-cart__form-input").forEach((input) => {
      input.classList.remove("error");
    });
  }

async handleSubmit(e) {
  e.preventDefault();

  console.log("Форма отправлена"); // Для отладки

  this.clearErrors();

  // Просто получаем значения напрямую из формы
  const form = e.target;
  const nameInput = form.querySelector('[name="name"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const addressInput = form.querySelector('[name="address"]');
  const emailInput = form.querySelector('[name="email"]');

  console.log("Поля формы:", { nameInput, phoneInput, addressInput }); // Для отладки

  if (!nameInput || !phoneInput || !addressInput) {
    console.error("Не все поля найдены");
    alert("Ошибка: не все поля найдены");
    return;
  }

  const nameValue = nameInput.value;
  const phoneValue = phoneInput.value;
  const addressValue = addressInput.value;
  const emailValue = emailInput ? emailInput.value : "";

  console.log("Значения полей:", { nameValue, phoneValue, addressValue }); // Для отладки

  // Очень простая валидация
  let hasErrors = false;

  if (!nameValue || nameValue.trim() === "") {
    const errorElement = this.modal.querySelector('[data-error="name"]');
    if (errorElement) {
      errorElement.textContent = "Введите имя";
    }
    nameInput.classList.add("error");
    hasErrors = true;
  }

  if (!phoneValue || phoneValue.trim() === "") {
    const errorElement = this.modal.querySelector('[data-error="phone"]');
    if (errorElement) {
      errorElement.textContent = "Введите телефон";
    }
    phoneInput.classList.add("error");
    hasErrors = true;
  }

  if (!addressValue || addressValue.trim() === "") {
    const errorElement = this.modal.querySelector('[data-error="address"]');
    if (errorElement) {
      errorElement.textContent = "Введите адрес";
    }
    addressInput.classList.add("error");
    hasErrors = true;
  }

  if (hasErrors) {
    console.log("Есть ошибки валидации");
    return;
  }

  console.log("Валидация пройдена");

  const formData = {
    name: nameValue.trim(),
    phone: phoneValue.trim(),
    address: addressValue.trim(),
    email: emailValue.trim(),
    items: this.cartItems,
    total: this.getTotalPrice(),
  };

  console.log("Данные для отправки:", formData);

  const submitButton = form.querySelector("[data-cart-submit]");
  submitButton.classList.add("modal-cart__form-submit--loading");
  submitButton.disabled = true;

  try {
    // Имитация отправки на сервер
    await new Promise(resolve => setTimeout(resolve, 1500));

    this.showSuccess();
    this.cartItems = [];
    this.saveCartToStorage();
    this.updateCartCounter();

    console.log("Заказ успешно отправлен");

  } catch (error) {
    console.error("Ошибка:", error);
    alert("Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже.");
  } finally {
    submitButton.classList.remove("modal-cart__form-submit--loading");
    submitButton.disabled = false;
  }
}

  showSuccess() {
    const content = this.modal.querySelector(".modal-cart__content");

    content.innerHTML = `
      <div class="modal-cart__success">
        <svg class="modal-cart__success-icon" viewBox="0 0 24 24" width="60" height="60">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
        <h3 class="modal-cart__success-title">Спасибо за заказ!</h3>
        <p class="modal-cart__success-text">Наш менеджер свяжется с вами</p>
        <button class="modal-cart__form-submit" data-modal-close>Продолжить</button>
      </div>
    `;
  }

  open() {
    this.restoreForm();

    this.modal.classList.add("modal--open");
    this.modalWindow.classList.add("modal__window--open");
    this.isOpen = true;

    if (this.body && this.config.PAGE_BODY_NO_SCROLL) {
      this.body.classList.add(this.config.PAGE_BODY_NO_SCROLL);
    }

    this.updateCartDisplay();
  }

  close() {
    this.modal.classList.remove("modal--open");

    if (this.modalWindow) {
      this.modalWindow.classList.remove("modal__window--open");
    }

    this.isOpen = false;

    if (this.body && this.config.PAGE_BODY_NO_SCROLL) {
      this.body.classList.remove(this.config.PAGE_BODY_NO_SCROLL);
    }
  }
}