!(function () {
  let tasksHtmlBtn = document.getElementById("tasks"),
    tasksJsBtn = document.getElementById("tasks2"),
    tasksPhpBtn = document.getElementById("tasksPhp"),
    diplomBtn = document.getElementById("diplom"),
    tasksHtmlBlock = document.getElementById("tasksBlock"),
    tasksJsBlock = document.getElementById("tasksBlock2"),
    tasksPhpBlock = document.getElementById("tasksPhpBlock"),
    diplomBlock = document.getElementById("diplomBlock"),
    burger = document.getElementById("burger"),
    sidebar = document.getElementById("sidebar"),
    overlay = document.getElementById("overlay"),
    body = document.getElementById("body");

  // Функция для скрытия всех блоков
  function hideAllBlocks() {
    tasksHtmlBlock.classList.add("hidden");
    tasksJsBlock.classList.add("hidden");
    tasksPhpBlock.classList.add("hidden");
    diplomBlock.classList.add("hidden");
  }

  // Функция для снятия активности со всех кнопок
  function removeActiveFromAll() {
    tasksHtmlBtn.classList.remove("active");
    tasksJsBtn.classList.remove("active");
    tasksPhpBtn.classList.remove("active");
    diplomBtn.classList.remove("active");
  }

  // Обработчик для кнопки HTML
  tasksHtmlBtn.onclick = function() {
    removeActiveFromAll();
    this.classList.add("active");
    hideAllBlocks();
    tasksHtmlBlock.classList.remove("hidden");
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
    body.classList.remove("overflow");
  };

  // Обработчик для кнопки JS
  tasksJsBtn.onclick = function() {
    removeActiveFromAll();
    this.classList.add("active");
    hideAllBlocks();
    tasksJsBlock.classList.remove("hidden");
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
    body.classList.remove("overflow");
  };

  // Обработчик для кнопки PHP
  tasksPhpBtn.onclick = function() {
    removeActiveFromAll();
    this.classList.add("active");
    hideAllBlocks();
    tasksPhpBlock.classList.remove("hidden");
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
    body.classList.remove("overflow");
  };

  // Обработчик для кнопки Диплом
  diplomBtn.onclick = function() {
    removeActiveFromAll();
    this.classList.add("active");
    hideAllBlocks();
    diplomBlock.classList.remove("hidden");
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
    body.classList.remove("overflow");
  };

  // Обработчик для бургер-меню
  burger.onclick = function() {
    body.classList.toggle("overflow");
    overlay.classList.toggle("show");
    sidebar.classList.toggle("show");
  };
})();
