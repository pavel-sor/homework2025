"use strict";

const todoKeys = {
  id: "id",
  text: "text",
  is_completed: "is_completed",
};

let todos = [];

const errTodoNotFound = todoId => `Todo with id ${todoId} not found`;

const getNewTodoId = todos =>
  todos.reduce((maxId, todo) => Math.max(maxId, todo[todoKeys.id]), 0) + 1;

const createTodo = (todos, text) => {
  const newTodo = {
    [todoKeys.id]: getNewTodoId(todos),
    [todoKeys.text]: text,
    [todoKeys.is_completed]: false,
  };
  todos.push(newTodo);
  return newTodo;
};

const completeTodoById = (todos, todoId) => {
  const todo = todos.find(todo => todo[todoKeys.id] === todoId);

  if (!todo) {
    console.error(errTodoNotFound(todoId));
    return null;
  }
  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
  return todo;
};

const deleteTodoById = (todos, todoId) => {
  const todoIndex = todos.findIndex(todo => todo[todoKeys.id] === todoId);
  if (todoIndex === -1) {
    console.error(errTodoNotFound(todoId));
    return todos;
  }
  todos.splice(todoIndex, 1);
  return todos;
};

// DOM элементы
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const todosContainer = document.querySelector('.todos');

// Проверка наличия контейнера
if (!todosContainer) {
  console.error('Контейнер .todos не найден в HTML');
}

// Создание элемента todo из текста с ID
function createTodoElement(todo) {
  const li = document.createElement('li');
  li.className = 'todo';
  li.dataset.id = todo[todoKeys.id]; // Устанавливаем ID сразу при создании

  li.innerHTML = `
    <div class="todo-text">${todo[todoKeys.text]}</div>
    <div class="todo-actions">
      <button class="button-complete button" title="Выполнено">✓</button>
      <button class="button-delete button" title="Удалить">✕</button>
    </div>
  `;

  if (todo[todoKeys.is_completed]) {
    li.classList.add('completed');
  }

  return li;
}

// Добавление обработчиков к элементу todo
function addTodoEventListeners(todoElement) {
  const completeButton = todoElement.querySelector('.button-complete');
  const deleteButton = todoElement.querySelector('.button-delete');
  const todoId = parseInt(todoElement.dataset.id);

  // Проверяем, что ID существует
  if (isNaN(todoId)) {
    console.error('ID задачи не найден в data-id');
    return;
  }

  completeButton.addEventListener('click', () => {
    const updatedTodo = completeTodoById(todos, todoId);
    if (updatedTodo) {
      todoElement.classList.toggle('completed');
      console.log(`Задача ${todoId} обновлена`, updatedTodo);
    }
  });

  deleteButton.addEventListener('click', () => {
    deleteTodoById(todos, todoId);
    todoElement.remove();
    console.log(`Задача ${todoId} удалена`);

    if (todos.length === 0) {
      console.log('Список дел пуст');
    }
  });
}

// Рендеринг всех задач из массива
function renderTodos() {
  if (!todosContainer) return;

  todosContainer.innerHTML = '';

  todos.forEach(todo => {
    const todoElement = createTodoElement(todo);
    addTodoEventListeners(todoElement);
    todosContainer.appendChild(todoElement);
  });
  
  console.log('Текущие задачи:', todos);
}

// Обработка создания новой задачи
function handleCreateTodo(event) {
  event.preventDefault();
  
  // Проверяем наличие input
  if (!input) {
    console.error('Поле ввода .input не найдено в HTML');
    alert('Ошибка: поле ввода не найдено');
    return;
  }

  const text = input.value.trim();

  if (text === '') {
    alert('Пожалуйста, введите задачу');
    return;
  }

  if (text.length > 100) {
    alert('Задача не может быть длиннее 100 символов');
    return;
  }

  createTodo(todos, text);
  renderTodos();

  input.value = '';
  input.focus();
}

// Инициализация демо-задачи
function initializeDemoTodo() {
  if (todos.length === 0) {
    createTodo(todos, "Задача 1");
    renderTodos();
  }
}

// Добавляем обработчик отправки формы
if (form) {
  form.addEventListener('submit', handleCreateTodo);
} else {
  console.error('Форма .form не найдена');
}

// Инициализация
console.log('Приложение запущено');
initializeDemoTodo();

if (input) {
  input.focus(); // Устанавливаем фокус на поле ввода
} else {
  console.error('Поле ввода .input не найдено при инициализации');
}
