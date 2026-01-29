export default class BurgerMenu {
	constructor(config, headerFixedInstance = null) {
		// Сохраняем конфигурацию
		this.config = config;
		
		// Получаем элементы DOM с селекторами из конфига
		this.burgerButton = document.querySelector(`.${this.config.BURGER}`);
		this.burgerMenu = document.querySelector(`.${this.config.HEADER_MENU}`);
		this.body = document.querySelector(`.${this.config.PAGE_BODY}`);
		this.headerFixedInstance = headerFixedInstance;
		this.main = document.querySelector(`.${this.config.MAIN}`) || null;
		
		// Отладочная информация
		console.log('BurgerMenu initialization:', {
			burgerButton: this.burgerButton,
			burgerMenu: this.burgerMenu,
			body: this.body,
			config: this.config
		});

		// Проверяем наличие обязательных элементов
		if (!this.burgerButton || !this.burgerMenu || !this.body) {
			console.error('Missing DOM elements:', {
				burgerButton: !this.burgerButton,
				burgerMenu: !this.burgerMenu,
				body: !this.body
			});
			throw new Error('Required DOM elements are missing.');
		}

		// Определяем мобильную вью
		this.isMobileView = window.innerWidth <= this.config.BREAKPOINT;
		this.isOpen = false;
		this.touchStartX = 0;
		this.touchEndX = 0;

		// Привязываем контекст для обработчиков
		this.onBurgerClick = this.onBurgerClick.bind(this);
		this.onBodyClick = this.onBodyClick.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
		this.onLinkClick = this.onLinkClick.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.closeMenu = this.closeMenu.bind(this);

		// Инициализация
		this.manageEvents();
		window.addEventListener('resize', this.onWindowResize);
		
		// Добавляем обработчик клавиатуры
		document.addEventListener('keydown', this.onKeyDown);
		
		// Инициализируем ссылки в меню
		this.initMenuLinks();
	}

	manageEvents() {
		if (this.isMobileView) {
			this.initEvents();
		} else {
			this.removeEvents();
			this.closeMenu(); // Закрываем меню при переходе на десктоп
		}
	}

	initEvents() {
		// Click events
		this.burgerButton.addEventListener('click', this.onBurgerClick);
		this.body.addEventListener('click', this.onBodyClick);

		// Touch events для свайпа
		this.burgerMenu.addEventListener('touchstart', this.handleTouchStart, { passive: true });
		this.burgerMenu.addEventListener('touchmove', this.handleTouchMove, { passive: true });
		this.burgerMenu.addEventListener('touchend', this.handleTouchEnd);
	}

	removeEvents() {
		// Click events
		this.burgerButton.removeEventListener('click', this.onBurgerClick);
		this.body.removeEventListener('click', this.onBodyClick);

		// Touch events
		this.burgerMenu.removeEventListener('touchstart', this.handleTouchStart);
		this.burgerMenu.removeEventListener('touchmove', this.handleTouchMove);
		this.burgerMenu.removeEventListener('touchend', this.handleTouchEnd);
	}

	onWindowResize() {
		const isNowMobileView = window.innerWidth <= this.config.BREAKPOINT;

		if (this.isMobileView !== isNowMobileView) {
			this.isMobileView = isNowMobileView;
			this.manageEvents();
		}
	}

	// Инициализация обработчиков для ссылок в меню
	initMenuLinks() {
		const menuLinks = this.burgerMenu.querySelectorAll(`.${this.config.MENU_LINK}`);
		menuLinks.forEach(link => {
			link.addEventListener('click', this.onLinkClick);
		});
	}

	// Обработчик клика по ссылке в меню
	onLinkClick(event) {
		const link = event.currentTarget;
		const hasDropdown = link.parentElement.classList.contains('menu__item--dropdown');
		
		// Если это ссылка с dropdown на мобильном
		if (hasDropdown && this.isMobileView) {
			event.preventDefault();
			this.toggleDropdown(link);
		} 
		// Если это обычная ссылка на мобильном
		else if (this.isMobileView && this.isOpen) {
			// Закрываем меню после клика на обычную ссылку
			setTimeout(() => {
				this.closeMenu();
			}, 300);
		}
	}

	// Переключение dropdown в мобильном меню
	toggleDropdown(link) {
		const dropdown = link.nextElementSibling;
		if (dropdown && dropdown.classList.contains('dropdown-menu')) {
			// Закрываем другие dropdown
			const allDropdowns = this.burgerMenu.querySelectorAll('.dropdown-menu');
			allDropdowns.forEach(drop => {
				if (drop !== dropdown) {
					drop.classList.remove('dropdown-menu--open');
					const parentLink = drop.previousElementSibling;
					if (parentLink) {
						parentLink.classList.remove('menu__link--open');
					}
				}
			});
			
			// Переключаем текущий dropdown
			dropdown.classList.toggle('dropdown-menu--open');
			link.classList.toggle('menu__link--open');
			
			// Анимация стрелки
			const arrow = link.querySelector('.menu__link-arrow');
			if (arrow) {
				if (dropdown.classList.contains('dropdown-menu--open')) {
					arrow.style.transform = 'rotate(180deg)';
				} else {
					arrow.style.transform = 'rotate(0deg)';
				}
			}
		}
	}

	// Основной обработчик клика по бургеру
	onBurgerClick(event) {
		event.stopPropagation();
		
		if (this.isOpen) {
			this.closeMenu();
		} else {
			this.openMenu();
		}
	}

	openMenu() {
		console.log('Opening burger menu');
		
		this.burgerButton.classList.add(this.config.BURGER_OPEN);
		this.burgerButton.setAttribute('aria-label', this.config.lABEL.CLOSE);
		this.burgerButton.setAttribute('aria-expanded', 'true');
		
		this.burgerMenu.classList.add(this.config.HEADER_MENU_OPEN);
		this.body.classList.add(this.config.PAGE_BODY_NO_SCROLL);
		
		this.isOpen = true;

		// Отключаем pointer-events для main контента
		if (this.main) {
			this.main.style.pointerEvents = 'none';
		}

		// Управляем фиксированным header
		if (this.headerFixedInstance) {
			this.headerFixedInstance.removeFixedClass();
		}
		
		// Фокусируемся на первом элементе меню для доступности
		setTimeout(() => {
			const firstLink = this.burgerMenu.querySelector('.menu__link');
			if (firstLink) {
				firstLink.focus();
			}
		}, 100);
	}

	closeMenu() {
		console.log('Closing burger menu');
		
		this.burgerButton.classList.remove(this.config.BURGER_OPEN);
		this.burgerButton.setAttribute('aria-label', this.config.lABEL.OPEN);
		this.burgerButton.setAttribute('aria-expanded', 'false');
		
		this.burgerMenu.classList.remove(this.config.HEADER_MENU_OPEN);
		this.body.classList.remove(this.config.PAGE_BODY_NO_SCROLL);
		
		this.isOpen = false;

		// Восстанавливаем pointer-events
		if (this.main) {
			this.main.style.pointerEvents = '';
		}

		// Восстанавливаем фиксированный header
		if (this.headerFixedInstance) {
			this.headerFixedInstance.updateFixedClass();
		}
		
		// Закрываем все dropdown
		const dropdowns = this.burgerMenu.querySelectorAll('.dropdown-menu');
		dropdowns.forEach(dropdown => {
			dropdown.classList.remove('dropdown-menu--open');
		});
		
		const dropdownLinks = this.burgerMenu.querySelectorAll('.menu__link');
		dropdownLinks.forEach(link => {
			link.classList.remove('menu__link--open');
			const arrow = link.querySelector('.menu__link-arrow');
			if (arrow) {
				arrow.style.transform = 'rotate(0deg)';
			}
		});
		
		// Возвращаем фокус на бургер
		this.burgerButton.focus();
	}

	isBurgerMenuOpen() {
		return this.isOpen;
	}

	onBodyClick(event) {
		// Если меню открыто и клик был вне меню и не по бургеру
		if (this.isOpen && 
			!this.burgerMenu.contains(event.target) && 
			!this.burgerButton.contains(event.target)) {
			this.closeMenu();
		}
	}

	// Обработчик клавиатуры (ESC для закрытия меню)
	onKeyDown(event) {
		if (event.key === 'Escape' && this.isOpen) {
			this.closeMenu();
		}
		
		// Tab для навигации по меню
		if (event.key === 'Tab' && this.isOpen) {
			this.handleTabNavigation(event);
		}
	}

	// Обработка навигации Tab внутри меню
	handleTabNavigation(event) {
		const focusableElements = this.burgerMenu.querySelectorAll(
			'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
		);
		
		if (focusableElements.length === 0) return;
		
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];
		
		// Если shift + tab на первом элементе
		if (event.shiftKey && document.activeElement === firstElement) {
			event.preventDefault();
			lastElement.focus();
		} 
		// Если tab на последнем элементе
		else if (!event.shiftKey && document.activeElement === lastElement) {
			event.preventDefault();
			firstElement.focus();
		}
	}

	// Touch events для свайпа
	handleTouchStart(event) {
		if (!this.isOpen || !this.isMobileView) return;
		this.touchStartX = event.touches[0].clientX;
		this.burgerMenu.style.transition = 'none';
	}

	handleTouchMove(event) {
		if (!this.isOpen || !this.isMobileView) return;
		
		const currentX = event.touches[0].clientX;
		const diffX = this.touchStartX - currentX;
		
		// Свайп вправо для закрытия
		if (diffX > 0) {
			const translateX = Math.min(diffX, 300);
			this.burgerMenu.style.transform = `translateX(-${translateX}px)`;
		}
	}

	handleTouchEnd(event) {
		if (!this.isOpen || !this.isMobileView) return;
		
		this.touchEndX = event.changedTouches[0].clientX;
		const swipeDistance = this.touchStartX - this.touchEndX;
		
		// Сбрасываем transform и включаем transition обратно
		this.burgerMenu.style.transition = '';
		this.burgerMenu.style.transform = '';
		
		// Если свайп достаточно длинный (больше 70px)
		if (swipeDistance > 70) {
			this.closeMenu();
		}
	}

	// Деструктор для очистки
	destroy() {
		this.removeEvents();
		window.removeEventListener('resize', this.onWindowResize);
		document.removeEventListener('keydown', this.onKeyDown);
		
		// Удаляем обработчики с ссылок
		const menuLinks = this.burgerMenu.querySelectorAll(`.${this.config.MENU_LINK}`);
		menuLinks.forEach(link => {
			link.removeEventListener('click', this.onLinkClick);
		});
	}
}