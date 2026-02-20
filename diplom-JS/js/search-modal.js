// search-modal.js
export default class SearchModal {
  constructor() {
    this.modal = null;
    this.isOpen = false;
    this.lastActiveElement = null;
    this.speed = 300;
    this.searchTimeout = null;

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
  // Проверяем, не создано ли уже окно поиска
  const existingSearchModal = this.modal.querySelector('[data-modal-window="search"]');

  if (existingSearchModal) {
    this.modalWindow = existingSearchModal;
    return;
  }

  const modalHTML = `
    <div class="modal__window modal-search" data-modal-window="search">
      <button class="modal__close" aria-label="Закрыть" title="Закрыть" data-modal-close>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <div class="modal__content modal-search__content">
        <h3 class="modal-search__title title-sm">Поиск</h3>
        <p class="modal-search__subtitle">Введите название модели или ключевое слово</p>

        <div class="modal-search__form">
          <div class="modal-search__input-wrapper">
            <svg class="modal-search__search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              class="modal-search__input"
              placeholder="Например: Air Mag, Air Jordan..."
              autofocus
            />
            <button class="modal-search__clear" aria-label="Очистить поиск" title="Очистить">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="modal-search__results" data-search-results>
          <div class="modal-search__initial">
            <svg class="modal-search__initial-icon" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <p class="modal-search__initial-text">Начните вводить текст для поиска</p>
          </div>
        </div>

        <div class="modal-search__popular">
          <h4 class="modal-search__popular-title">Популярные запросы:</h4>
          <div class="modal-search__popular-tags">
            <button class="modal-search__popular-tag" data-search-tag="Air Mag">Air Mag</button>
            <button class="modal-search__popular-tag" data-search-tag="Кроссовки">Кроссовки</button>
            <button class="modal-search__popular-tag" data-search-tag="Air Jordan">Air Jordan</button>
            <button class="modal-search__popular-tag" data-search-tag="Dunk">Dunk</button>
            <button class="modal-search__popular-tag" data-search-tag="Yeezy">Yeezy</button>
          </div>
        </div>
      </div>
    </div>
  `;

  this.modal.insertAdjacentHTML('beforeend', modalHTML);
  this.modalWindow = this.modal.querySelector('[data-modal-window="search"]');
}

  bindEvents() {
    // Кнопка поиска в хедере
    const searchButton = document.querySelector('.header__actions-button[title="Поиск"]');
    if (searchButton) {
      searchButton.addEventListener('click', (e) => {
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

    // Поиск при вводе текста
    const searchInput = this.modalWindow.querySelector('.modal-search__input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e));
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleSearch(e);
        }
      });
    }

    // Очистка поиска
    const clearButton = this.modalWindow.querySelector('.modal-search__clear');
    if (clearButton) {
      clearButton.addEventListener('click', () => this.clearSearch());
    }

    // Клик по популярным тегам
    const popularTags = this.modalWindow.querySelectorAll('[data-search-tag]');
    popularTags.forEach(tag => {
      tag.addEventListener('click', (e) => {
        const searchTerm = e.target.dataset.searchTag;
        const searchInput = this.modalWindow.querySelector('.modal-search__input');
        if (searchInput) {
          searchInput.value = searchTerm;
          this.handleSearch({ target: searchInput });
        }
      });
    });
  }

  handleSearch(e) {
    const searchTerm = e.target.value.trim().toLowerCase();
    const resultsContainer = this.modalWindow.querySelector('[data-search-results]');
    const clearButton = this.modalWindow.querySelector('.modal-search__clear');

    // Показываем/скрываем кнопку очистки
    if (clearButton) {
      clearButton.style.display = searchTerm.length > 0 ? 'flex' : 'none';
    }

    // Очищаем предыдущий таймаут
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Если поисковый запрос пустой, показываем начальный экран
    if (searchTerm.length === 0) {
      resultsContainer.innerHTML = `
        <div class="modal-search__initial">
          <svg class="modal-search__initial-icon" width="60" height="60">
            <use href="./icons/sprite.svg#search"></use>
          </svg>
          <p class="modal-search__initial-text">Начните вводить текст для поиска</p>
        </div>
      `;
      return;
    }

    // Показываем индикатор загрузки
    resultsContainer.innerHTML = `
      <div class="modal-search__loading">
        <div class="modal-search__spinner"></div>
        <p>Поиск...</p>
      </div>
    `;

    // Имитация задержки поиска
    this.searchTimeout = setTimeout(() => {
      this.performSearch(searchTerm, resultsContainer);
    }, 500);
  }

  performSearch(searchTerm, resultsContainer) {
    // Здесь должен быть реальный поиск по вашему каталогу
    // Пока делаем имитацию поиска по топ-моделям
    const mockProducts = [
      { name: 'Nike Air Mag', category: 'Air Mag', url: '#air-mag', image: './images/nike-air-mag-1.png' },
      { name: 'Nike Air Yeezy 2 "Red October"', category: 'Air Yeezy', url: '#', image: './images/top-models/top-model-1.png' },
      { name: 'Wings x Air Jordan 1', category: 'Air Jordan', url: '#', image: './images/top-models/top-model-2.png' },
      { name: 'Nike Dunk SB Low Yellow Lobster', category: 'Dunk', url: '#', image: './images/top-models/top-model-3.png' },
      { name: 'DJ Khaled x Air Jordan 3 "Grateful"', category: 'Air Jordan', url: '#', image: './images/top-models/top-model-4.png' },
      { name: 'Nike SB Dunk Low Freddy Krueger', category: 'Dunk', url: '#', image: './images/top-models/top-model-5.png' },
      { name: 'Air Jordan 10 x OVO', category: 'Air Jordan', url: '#', image: './images/top-models/top-model-6.png' },
      { name: 'Air Jordan 12 Flu-Game', category: 'Air Jordan', url: '#', image: './images/top-models/top-model-7.png' },
      { name: 'Air Jordan 1 "Shattered Backboard" 1985', category: 'Air Jordan', url: '#', image: './images/top-models/top-model-8.png' },
      { name: 'Kanye West Nike Air Yeezy 1 "Prototype"', category: 'Air Yeezy', url: '#', image: './images/top-models/top-model-9.png' }
    ];

    // Фильтруем товары по поисковому запросу
    const results = mockProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );

    if (results.length === 0) {
      // Нет результатов
      resultsContainer.innerHTML = `
        <div class="modal-search__no-results">
          <svg class="modal-search__no-results-icon" width="60" height="60">
            <use href="./icons/sprite.svg#search"></use>
          </svg>
          <p class="modal-search__no-results-text">Ничего не найдено</p>
          <p class="modal-search__no-results-subtext">Попробуйте изменить поисковый запрос</p>
        </div>
      `;
    } else {
      // Показываем результаты
      const resultsHTML = results.map(product => `
        <a href="${product.url}" class="modal-search__result-item" onclick="this.closest('.modal').classList.remove('modal--open'); document.body.classList.remove('page__body--no-scroll');">
          <div class="modal-search__result-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          </div>
          <div class="modal-search__result-info">
            <div class="modal-search__result-name">${product.name}</div>
            <div class="modal-search__result-category">${product.category}</div>
          </div>
          <svg class="modal-search__result-arrow" width="20" height="20">
            <use href="./icons/main-sprite.svg#arrow-right"></use>
          </svg>
        </a>
      `).join('');

      resultsContainer.innerHTML = `
        <div class="modal-search__results-list">
          ${resultsHTML}
        </div>
        <div class="modal-search__results-count">Найдено: ${results.length} товаров</div>
      `;
    }
  }

  clearSearch() {
    const searchInput = this.modalWindow.querySelector('.modal-search__input');
    const resultsContainer = this.modalWindow.querySelector('[data-search-results]');
    const clearButton = this.modalWindow.querySelector('.modal-search__clear');

    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }

    if (clearButton) {
      clearButton.style.display = 'none';
    }

    if (resultsContainer) {
      resultsContainer.innerHTML = `
        <div class="modal-search__initial">
          <svg class="modal-search__initial-icon" width="60" height="60">
            <use href="./icons/sprite.svg#search"></use>
          </svg>
          <p class="modal-search__initial-text">Начните вводить текст для поиска</p>
        </div>
      `;
    }
  }

  open() {
    this.lastActiveElement = document.activeElement;

    this.modal.classList.add('modal--open');
    this.modalWindow.classList.add('modal__window--open');
    this.isOpen = true;

    document.body.classList.add('page__body--no-scroll');

    // Автоматически фокусируемся на поле ввода
    setTimeout(() => {
      const searchInput = this.modalWindow.querySelector('.modal-search__input');
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  }

  close() {
    this.modal.classList.remove('modal--open');
    this.modalWindow.classList.remove('modal__window--open');
    this.isOpen = false;

    document.body.classList.remove('page__body--no-scroll');

    // Очищаем поиск при закрытии
    this.clearSearch();

    if (this.lastActiveElement && document.body.contains(this.lastActiveElement)) {
      this.lastActiveElement.focus();
    }
  }
}