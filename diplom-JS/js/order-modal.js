// order-modal.js
export default class OrderModal {
  constructor() {
    this.modal = null;
    this.isOpen = false;
    this.lastActiveElement = null;
    this.speed = 300;

    this.init();
  }

  init() {
    this.createModalContainer();
    this.createModalHTML();
    this.bindEvents();
  }

  createModalContainer() {
    // Проверяем, существует ли уже контейнер для модальных окон
    let modalContainer = document.querySelector('.modal');

    if (!modalContainer) {
      modalContainer = document.createElement('div');
      modalContainer.className = 'modal';
      document.body.appendChild(modalContainer);
    }

    this.modal = modalContainer;
  }

  createModalHTML() {
    // Проверяем, не создано ли уже окно заказа
    const existingOrderModal = this.modal.querySelector('[data-modal-window="order"]');

    if (existingOrderModal) {
      this.modalWindow = existingOrderModal;
      return;
    }

    const modalHTML = `
      <div class="modal__window modal-order" data-modal-window="order">
        <button class="modal__close" aria-label="Закрыть" title="Закрыть" data-modal-close>
          <svg width="24" height="24">
            <use href="./icons/sprite.svg#cross"></use>
          </svg>
        </button>
        <div class="modal__content modal-order__content">
          <h3 class="modal-order__title title-sm">Сделать заказ</h3>
          <p class="modal-order__subtitle">Оставьте свои контакты, и мы свяжемся с вами для оформления заказа</p>

          <form class="modal-order__form">
            <div class="modal-order__form-group">
              <label class="modal-order__label">
                <span class="modal-order__label-text">Ваше имя *</span>
                <input
                  class="modal-order__input"
                  type="text"
                  placeholder="Иван Иванов"
                  name="name"
                  required
                />
              </label>
            </div>

            <div class="modal-order__form-group">
              <label class="modal-order__label">
                <span class="modal-order__label-text">Телефон *</span>
                <input
                  class="modal-order__input"
                  type="tel"
                  placeholder="+7 (999) 999-99-99"
                  name="phone"
                  required
                />
              </label>
            </div>

            <div class="modal-order__form-group">
              <label class="modal-order__label">
                <span class="modal-order__label-text">Email</span>
                <input
                  class="modal-order__input"
                  type="email"
                  placeholder="example@mail.com"
                  name="email"
                />
              </label>
            </div>

            <div class="modal-order__form-group">
              <label class="modal-order__label">
                <span class="modal-order__label-text">Модель *</span>
                <select class="modal-order__select" name="model" required>
                  <option value="" disabled selected>Выберите модель</option>
                  <option value="air-mag">Nike Air Mag</option>
                  <option value="air-yeezy">Nike Air Yeezy 2 "Red October"</option>
                  <option value="air-jordan">Wings x Air Jordan 1</option>
                  <option value="dunk-sb">Nike Dunk SB Low Yellow Lobster</option>
                  <option value="air-jordan-3">DJ Khaled x Air Jordan 3 "Grateful"</option>
                  <option value="dunk-freddy">Nike SB Dunk Low Freddy Krueger</option>
                  <option value="air-jordan-10">Air Jordan 10 x OVO</option>
                  <option value="air-jordan-12">Air Jordan 12 Flu-Game</option>
                  <option value="air-jordan-1">Air Jordan 1 "Shattered Backboard" 1985</option>
                  <option value="air-yeezy-1">Kanye West Nike Air Yeezy 1 "Prototype"</option>
                </select>
              </label>
            </div>

            <div class="modal-order__form-group">
              <span class="modal-order__label-text">Желаемый размер</span>
              <div class="modal-order__sizes">
                <label class="modal-order__size-label">
                  <input type="radio" name="size" value="36" class="modal-order__size-radio">
                  <span class="modal-order__size-text">36</span>
                </label>
                <label class="modal-order__size-label">
                  <input type="radio" name="size" value="37" class="modal-order__size-radio">
                  <span class="modal-order__size-text">37</span>
                </label>
                <label class="modal-order__size-label">
                  <input type="radio" name="size" value="38" class="modal-order__size-radio">
                  <span class="modal-order__size-text">38</span>
                </label>
                <label class="modal-order__size-label">
                  <input type="radio" name="size" value="39" class="modal-order__size-radio">
                  <span class="modal-order__size-text">39</span>
                </label>
                <label class="modal-order__size-label">
                  <input type="radio" name="size" value="40" class="modal-order__size-radio">
                  <span class="modal-order__size-text">40</span>
                </label>
                <label class="modal-order__size-label">
                  <input type="radio" name="size" value="41" class="modal-order__size-radio">
                  <span class="modal-order__size-text">41</span>
                </label>
                <label class="modal-order__size-label">
                  <input type="radio" name="size" value="42" class="modal-order__size-radio">
                  <span class="modal-order__size-text">42</span>
                </label>
                <label class="modal-order__size-label">
                  <input type="radio" name="size" value="43" class="modal-order__size-radio">
                  <span class="modal-order__size-text">43</span>
                </label>
                <label class="modal-order__size-label">
                  <input type="radio" name="size" value="44" class="modal-order__size-radio">
                  <span class="modal-order__size-text">44</span>
                </label>
                <label class="modal-order__size-label">
                  <input type="radio" name="size" value="45" class="modal-order__size-radio">
                  <span class="modal-order__size-text">45</span>
                </label>
                <label class="modal-order__size-label">
                  <input type="radio" name="size" value="46" class="modal-order__size-radio">
                  <span class="modal-order__size-text">46</span>
                </label>
                <label class="modal-order__size-label">
                  <input type="radio" name="size" value="47" class="modal-order__size-radio">
                  <span class="modal-order__size-text">47</span>
                </label>
              </div>
            </div>

            <div class="modal-order__form-group">
              <label class="modal-order__checkbox-label">
                <input type="checkbox" name="agree" class="modal-order__checkbox" required>
                <span class="modal-order__checkbox-text">Я согласен на обработку персональных данных</span>
              </label>
            </div>

            <button type="submit" class="modal-order__submit">Отправить заявку</button>
          </form>
        </div>
      </div>
    `;

    this.modal.insertAdjacentHTML('beforeend', modalHTML);
    this.modalWindow = this.modal.querySelector('[data-modal-window="order"]');
  }

  bindEvents() {
    // Кнопка в хедере
    const orderButton = document.querySelector('.header__order');
    if (orderButton) {
      orderButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    }

    // Закрытие по оверлею
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal && this.isOpen) {
        this.close();
      }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Закрытие по кнопке закрытия
    this.modal.addEventListener('click', (e) => {
      if (e.target.closest('[data-modal-close]')) {
        this.close();
      }
    });

    // Отправка формы
    const form = this.modal.querySelector('.modal-order__form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // Маска для телефона
    const phoneInput = this.modal.querySelector('input[name="phone"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => this.phoneMask(e));
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

  validateForm(formData) {
    const errors = {};

    if (!formData.name || formData.name.trim() === "") {
      errors.name = "Введите имя";
    }

    if (!formData.phone || formData.phone.trim() === "") {
      errors.phone = "Введите телефон";
    } else {
      const digitsOnly = formData.phone.replace(/\D/g, "");
      if (digitsOnly.length < 11) {
        errors.phone = "Введите полный номер телефона";
      }
    }

    if (!formData.model) {
      errors.model = "Выберите модель";
    }

    if (!formData.agree) {
      errors.agree = "Необходимо согласие на обработку данных";
    }

    return errors;
  }

  showErrors(errors) {
    // Очищаем предыдущие ошибки
    this.modalWindow.querySelectorAll('[data-error]').forEach(el => {
      el.remove();
    });
    this.modalWindow.querySelectorAll('.error').forEach(el => {
      el.classList.remove('error');
    });

    // Показываем новые ошибки
    Object.keys(errors).forEach((field) => {
      if (field === 'model') {
        const select = this.modalWindow.querySelector('[name="model"]');
        select.classList.add('error');

        const errorDiv = document.createElement('div');
        errorDiv.className = 'modal-order__form-error';
        errorDiv.setAttribute('data-error', field);
        errorDiv.textContent = errors[field];
        select.parentNode.appendChild(errorDiv);
      } else if (field === 'agree') {
        const checkboxLabel = this.modalWindow.querySelector('.modal-order__checkbox-label');

        const errorDiv = document.createElement('div');
        errorDiv.className = 'modal-order__form-error';
        errorDiv.setAttribute('data-error', field);
        errorDiv.textContent = errors[field];
        checkboxLabel.parentNode.appendChild(errorDiv);
      } else {
        const input = this.modalWindow.querySelector(`[name="${field}"]`);
        if (input) {
          input.classList.add('error');

          const errorDiv = document.createElement('div');
          errorDiv.className = 'modal-order__form-error';
          errorDiv.setAttribute('data-error', field);
          errorDiv.textContent = errors[field];
          input.parentNode.appendChild(errorDiv);
        }
      }
    });
  }

  clearErrors() {
    this.modalWindow.querySelectorAll('[data-error]').forEach(el => {
      el.remove();
    });
    this.modalWindow.querySelectorAll('.error').forEach(el => {
      el.classList.remove('error');
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.clearErrors();

    const form = e.target;
    const nameInput = form.querySelector('[name="name"]');
    const phoneInput = form.querySelector('[name="phone"]');
    const emailInput = form.querySelector('[name="email"]');
    const modelInput = form.querySelector('[name="model"]');
    const sizeInput = form.querySelector('input[name="size"]:checked');
    const agreeInput = form.querySelector('[name="agree"]');

    const formData = {
      name: nameInput ? nameInput.value.trim() : '',
      phone: phoneInput ? phoneInput.value.trim() : '',
      email: emailInput ? emailInput.value.trim() : '',
      model: modelInput ? modelInput.value : '',
      size: sizeInput ? sizeInput.value : '',
      agree: agreeInput ? agreeInput.checked : false
    };

    const errors = this.validateForm(formData);

    if (Object.keys(errors).length > 0) {
      this.showErrors(errors);
      return;
    }

    const submitButton = form.querySelector('[type="submit"]');
    submitButton.classList.add('modal-order__submit--loading');
    submitButton.disabled = true;

    try {
      // Имитация отправки на сервер
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Показываем сообщение об успехе
      this.showSuccess();

      console.log("Заказ отправлен:", formData);

    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже.");
    } finally {
      submitButton.classList.remove('modal-order__submit--loading');
      submitButton.disabled = false;
    }
  }

  showSuccess() {
    const content = this.modalWindow.querySelector('.modal-order__content');

    content.innerHTML = `
      <div class="modal-order__success">
        <svg class="modal-order__success-icon" viewBox="0 0 24 24" width="80" height="80">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
        <h3 class="modal-order__success-title">Спасибо за заказ!</h3>
        <p class="modal-order__success-text">Наш менеджер свяжется с вами в ближайшее время</p>
        <button class="modal-order__submit" data-modal-close>Продолжить</button>
      </div>
    `;
  }

  open() {
    this.lastActiveElement = document.activeElement;

    this.modal.classList.add('modal--open');
    this.modalWindow.classList.add('modal__window--open');
    this.isOpen = true;

    document.body.classList.add('page__body--no-scroll');
  }

  close() {
    this.modal.classList.remove('modal--open');
    this.modalWindow.classList.remove('modal__window--open');
    this.isOpen = false;

    document.body.classList.remove('page__body--no-scroll');

    if (this.lastActiveElement && document.body.contains(this.lastActiveElement)) {
      this.lastActiveElement.focus();
    }
  }
}