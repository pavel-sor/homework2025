// order-size-modal.js
export default class OrderSizeModal {
  constructor() {
    this.modal = null;
    this.isOpen = false;
    this.lastActiveElement = null;
    this.speed = 300;
    this.selectedSize = null;
    this.availableSizes = [];

    this.init();
  }

  init() {
    this.getAvailableSizes();
    this.createModalContainer();
    this.createModalHTML();
    this.bindEvents();
  }

  getAvailableSizes() {
    // Получаем контейнер с размерами под заказ
    const sizesSections = document.querySelectorAll('.product__sizes');
    let toOrderSizes = [];

    // Ищем секцию с заголовком "Размеры под заказ"
    sizesSections.forEach(section => {
      const title = section.querySelector('.product__sizes-title--to-order');
      if (title) {
        // Нашли секцию с размерами под заказ
        const sizesList = section.querySelector('.product__sizes-list');
        if (sizesList) {
          toOrderSizes = sizesList.querySelectorAll('.product__sizes-button[disabled]');
        }
      }
    });

    this.availableSizes = Array.from(toOrderSizes).map(button => ({
      size: button.textContent.trim(),
      isActive: button.classList.contains('product__sizes-button--active')
    }));

    // Находим активный размер, если есть
    const activeSize = this.availableSizes.find(item => item.isActive);
    if (activeSize) {
      this.selectedSize = activeSize.size;
    }
  }

  createModalContainer() {
    let modalContainer = document.querySelector('.modal');

    if (!modalContainer) {
      modalContainer = document.createElement('div');
      modalContainer.className = 'modal';
      document.body.appendChild(modalContainer);
    }

    this.modal = modalContainer;
  }

  createModalHTML() {
    const existingOrderModal = this.modal.querySelector('[data-modal-window="order-size"]');

    if (existingOrderModal) {
      this.modalWindow = existingOrderModal;
      this.updateSizesInModal();
      return;
    }

    const modalHTML = `
      <div class="modal__window modal-order-size" data-modal-window="order-size">
        <button class="modal__close" aria-label="Закрыть" title="Закрыть" data-modal-close>
          <svg width="24" height="24">
            <use href="./icons/sprite.svg#cross"></use>
          </svg>
        </button>
        <div class="modal__content modal-order-size__content">
          <h3 class="modal-order-size__title title-sm">Заказ размера под заказ</h3>
          <p class="modal-order-size__subtitle">Выберите размер и оставьте свои контакты</p>

          <form class="modal-order-size__form">
            <div class="modal-order-size__form-group">
              <label class="modal-order-size__label">
                <span class="modal-order-size__label-text">Желаемый размер *</span>
                <div class="modal-order-size__sizes" data-order-sizes>
                  <!-- Размеры будут добавлены динамически -->
                </div>
              </label>
            </div>

            <div class="modal-order-size__form-group">
              <label class="modal-order-size__label">
                <span class="modal-order-size__label-text">Ваше имя *</span>
                <input
                  class="modal-order-size__input"
                  type="text"
                  placeholder="Иван Иванов"
                  name="name"
                  required
                />
              </label>
            </div>

            <div class="modal-order-size__form-group">
              <label class="modal-order-size__label">
                <span class="modal-order-size__label-text">Телефон *</span>
                <input
                  class="modal-order-size__input"
                  type="tel"
                  placeholder="+7 (999) 999-99-99"
                  name="phone"
                  required
                />
              </label>
            </div>

            <div class="modal-order-size__form-group">
              <label class="modal-order-size__label">
                <span class="modal-order-size__label-text">Email</span>
                <input
                  class="modal-order-size__input"
                  type="email"
                  placeholder="example@mail.com"
                  name="email"
                />
              </label>
            </div>

            <div class="modal-order-size__form-group">
              <label class="modal-order-size__checkbox-label">
                <input type="checkbox" name="agree" class="modal-order-size__checkbox" required>
                <span class="modal-order-size__checkbox-text">Я согласен на обработку персональных данных</span>
              </label>
            </div>

            <button type="submit" class="modal-order-size__submit">Отправить заявку</button>
          </form>
        </div>
      </div>
    `;

    this.modal.insertAdjacentHTML('beforeend', modalHTML);
    this.modalWindow = this.modal.querySelector('[data-modal-window="order-size"]');

    // Добавляем размеры в модальное окно
    this.updateSizesInModal();
  }

  updateSizesInModal() {
    const sizesContainer = this.modalWindow.querySelector('[data-order-sizes]');
    if (!sizesContainer) return;

    // Обновляем список размеров
    this.getAvailableSizes();

    if (this.availableSizes.length === 0) {
      sizesContainer.innerHTML = '<p class="modal-order-size__no-sizes">В данный момент нет размеров под заказ</p>';
      return;
    }

    const sizesHTML = this.availableSizes.map(item => `
      <label class="modal-order-size__size-label">
        <input
          type="radio"
          name="size"
          value="${item.size}"
          class="modal-order-size__size-radio"
          ${item.isActive ? 'checked' : ''}
          required
        >
        <span class="modal-order-size__size-text">${item.size}</span>
      </label>
    `).join('');

    sizesContainer.innerHTML = sizesHTML;
  }

  bindEvents() {
    // Ссылки "Заказать размер"
    const orderLinks = document.querySelectorAll('.product__sizes-order-link');

    orderLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        // Обновляем доступные размеры перед открытием
        this.getAvailableSizes();

        // Если модальное окно уже создано, обновляем размеры
        if (this.modalWindow) {
          this.updateSizesInModal();
        }

        this.open();
      });
    });

    // Обновляем размеры при изменении на странице
    const sizesList = document.querySelector('[data-sizes="list"]');
    if (sizesList) {
      sizesList.addEventListener('click', () => {
        this.availableSizes = [];
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
    const form = this.modal.querySelector('.modal-order-size__form');
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

    if (!formData.size) {
      errors.size = "Выберите размер";
    }

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

    if (!formData.agree) {
      errors.agree = "Необходимо согласие на обработку данных";
    }

    return errors;
  }

  showErrors(errors) {
    // Очищаем предыдущие ошибки
    this.modalWindow.querySelectorAll('[data-error]').forEach(el => {
      el.textContent = '';
    });
    this.modalWindow.querySelectorAll('.error').forEach(el => {
      el.classList.remove('error');
    });

    // Показываем новые ошибки
    Object.keys(errors).forEach((field) => {
      if (field === 'size') {
        const sizesContainer = this.modalWindow.querySelector('[data-order-sizes]');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'modal-order-size__form-error';
        errorDiv.setAttribute('data-error', 'size');
        errorDiv.textContent = errors[field];
        sizesContainer.parentNode.appendChild(errorDiv);
      } else if (field === 'agree') {
        const checkboxLabel = this.modalWindow.querySelector('.modal-order-size__checkbox-label');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'modal-order-size__form-error';
        errorDiv.setAttribute('data-error', 'agree');
        errorDiv.textContent = errors[field];
        checkboxLabel.parentNode.appendChild(errorDiv);
      } else {
        const input = this.modalWindow.querySelector(`[name="${field}"]`);
        if (input) {
          input.classList.add('error');

          let errorDiv = input.parentNode.querySelector('[data-error]');
          if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'modal-order-size__form-error';
            errorDiv.setAttribute('data-error', field);
            input.parentNode.appendChild(errorDiv);
          }
          errorDiv.textContent = errors[field];
        }
      }
    });
  }

  clearErrors() {
    this.modalWindow.querySelectorAll('[data-error]').forEach(el => {
      el.textContent = '';
    });
    this.modalWindow.querySelectorAll('.error').forEach(el => {
      el.classList.remove('error');
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.clearErrors();

    const form = e.target;
    const sizeInput = form.querySelector('input[name="size"]:checked');
    const nameInput = form.querySelector('[name="name"]');
    const phoneInput = form.querySelector('[name="phone"]');
    const emailInput = form.querySelector('[name="email"]');
    const agreeInput = form.querySelector('[name="agree"]');

    const formData = {
      size: sizeInput ? sizeInput.value : '',
      name: nameInput ? nameInput.value.trim() : '',
      phone: phoneInput ? phoneInput.value.trim() : '',
      email: emailInput ? emailInput.value.trim() : '',
      agree: agreeInput ? agreeInput.checked : false
    };

    const errors = this.validateForm(formData);

    if (Object.keys(errors).length > 0) {
      this.showErrors(errors);
      return;
    }

    const submitButton = form.querySelector('[type="submit"]');
    submitButton.classList.add('modal-order-size__submit--loading');
    submitButton.disabled = true;

    try {
      // Имитация отправки на сервер
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Показываем сообщение об успехе
      this.showSuccess();

      console.log("Заявка отправлена:", formData);

    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.");
    } finally {
      submitButton.classList.remove('modal-order-size__submit--loading');
      submitButton.disabled = false;
    }
  }

  showSuccess() {
    const content = this.modalWindow.querySelector('.modal-order-size__content');

    content.innerHTML = `
      <div class="modal-order-size__success">
        <svg class="modal-order-size__success-icon" viewBox="0 0 24 24" width="80" height="80">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
        <h3 class="modal-order-size__success-title">Спасибо за заявку!</h3>
        <p class="modal-order-size__success-text">Наш менеджер свяжется с вами для уточнения деталей заказа</p>
        <button class="modal-order-size__submit" data-modal-close>Продолжить</button>
      </div>
    `;
  }

  open() {
    this.lastActiveElement = document.activeElement;

    // Перед открытием обновляем размеры
    this.getAvailableSizes();
    if (this.modalWindow) {
      this.updateSizesInModal();
    }

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