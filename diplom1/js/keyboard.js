// keyboard.js
export const initKeyboardSearch = () => {
  // Получаем элементы
  const searchInput = document.getElementById('searchInput');
  const suggestionButtons = document.querySelectorAll('.keyboard__search-item');

  // Проверяем, существуют ли элементы
  if (searchInput && suggestionButtons.length > 0) {
    // Добавляем обработчик для каждой кнопки
    suggestionButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Получаем текст из кнопки и убираем лишние пробелы
        const buttonText = button.textContent.trim();
        
        // Заполняем поле поиска
        searchInput.value = buttonText;
        
        // Фокусируемся на поле ввода
        searchInput.focus();
        
        // Добавляем класс для стилизации активной кнопки
        suggestionButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Можно добавить отправку формы или другие действия
        console.log(`Search for: ${buttonText}`);
        
        // Дополнительно: если есть форма, можно отправить её
        // const searchForm = searchInput.closest('form');
        // if (searchForm) searchForm.submit();
      });
    });
    
    // Очищаем активный класс при ручном вводе
    searchInput.addEventListener('input', () => {
      suggestionButtons.forEach(btn => btn.classList.remove('active'));
      
      // Автоматически подсвечиваем кнопки с похожим текстом
      const inputText = searchInput.value.toLowerCase().trim();
      if (inputText) {
        suggestionButtons.forEach(btn => {
          const btnText = btn.textContent.toLowerCase().trim();
          if (btnText.includes(inputText)) {
            btn.classList.add('highlight');
          } else {
            btn.classList.remove('highlight');
          }
        });
      } else {
        suggestionButtons.forEach(btn => btn.classList.remove('highlight'));
      }
    });
    
    // Очищаем highlight при потере фокуса (опционально)
    searchInput.addEventListener('blur', () => {
      setTimeout(() => {
        suggestionButtons.forEach(btn => btn.classList.remove('highlight'));
      }, 200);
    });
    
    console.log('Keyboard search functionality initialized');
  } else {
    console.warn('Search elements not found');
  }
};

// Для отладки можно также добавить экспорт по умолчанию
// export default initKeyboardSearch;