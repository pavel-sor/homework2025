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

// При помощи метода querySelector получаем элементы .form, .input и .todos
// Создаем функцию createTodoElement(text), которая будет создавать todo в виде разметки
// Создаем функцию handleCreateTodo(todos, text), которая будет вызывать createTodo и createTodoElement
// Получаем элементы .form, .input и .todos
// DOM элементы
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const todosContainer = document.querySelector('.todos');

// Проверка наличия контейнера
if (!todosContainer) {
  console.error('Контейнер .todos не найден в HTML');
}

// Создание элемента todo из текста
function createTodoElement(text) {
  const li = document.createElement('li');
  li.className = 'todo';

  li.innerHTML = `
    <div class="todo-text">${text}</div>
    <div class="todo-actions">
      <button class="button-complete button" title="Выполнено">✓</button>
      <button class="button-delete button" title="Удалить">✕</button>
    </div>
  `;

  return li;
}

// Добавление обработчиков к элементу todo
function addTodoEventListeners(todoElement) {
  const completeButton = todoElement.querySelector('.button-complete');
  const deleteButton = todoElement.querySelector('.button-delete');
  const todoId = parseInt(todoElement.dataset.id);

  completeButton.addEventListener('click', () => {
    const updatedTodo = completeTodoById(todos, todoId);
    if (updatedTodo) {
      todoElement.classList.toggle('completed');
    }
  });

  deleteButton.addEventListener('click', () => {
    deleteTodoById(todos, todoId);
    todoElement.remove();

    // Если задач не осталось, можно показать сообщение
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
    const todoElement = createTodoElement(todo[todoKeys.text]);
    todoElement.dataset.id = todo[todoKeys.id];

    if (todo[todoKeys.is_completed]) {
      todoElement.classList.add('completed');
    }

    addTodoEventListeners(todoElement);
    todosContainer.appendChild(todoElement);
  });
}

// Обработка создания новой задачи
function handleCreateTodo(event) {
  event.preventDefault();

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
form.addEventListener('submit', handleCreateTodo);

// Инициализация
initializeDemoTodo();
input.focus(); // Устанавливаем фокус на поле ввода