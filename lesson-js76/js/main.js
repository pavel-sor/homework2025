"use strict";

const todoKeys = {
  id: "id",
  text: "text",
  is_completed: "is_completed",
};

const todos = [];

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

// js/main.js

// Получаем элементы
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const todosContainer = document.querySelector('.todos');

// Функция для создания элемента todo
function createTodoElement(text) {
  const li = document.createElement('li');
  li.className = 'todo';

  li.innerHTML = `
    <div class="todo-text">${text}</div>
    <div class="todo-actions">
      <button class="button-complete button">✓</button>
      <button class="button-delete button">✕</button>
    </div>
  `;

  return li;
}

// Функция для обработки создания todo
function handleCreateTodo(event) {
  event.preventDefault(); // Предотвращаем отправку формы

  const text = input.value.trim(); // Получаем текст из input и удаляем пробелы по краям

  if (text === '') {
    alert('Пожалуйста, введите задачу');
    return;
  }

  // Создаем новый элемент todo
  const todoElement = createTodoElement(text);

  // Добавляем обработчики для кнопок внутри todo
  const completeButton = todoElement.querySelector('.button-complete');
  const deleteButton = todoElement.querySelector('.button-delete');

  // Обработчик для кнопки завершения
  completeButton.addEventListener('click', () => {
    todoElement.classList.toggle('completed');
  });

  // Обработчик для кнопки удаления
  deleteButton.addEventListener('click', () => {
    todoElement.remove();
  });

  // Добавляем todo в контейнер
  todosContainer.appendChild(todoElement);

  // Очищаем input
  input.value = '';

  // Возвращаем фокус на input
  input.focus();
}

// Добавляем обработчик отправки формы
form.addEventListener('submit', handleCreateTodo);

// Добавляем обработчик для существующего todo (если он есть в разметке)
const existingTodo = document.querySelector('.todo');
if (existingTodo) {
  const completeButton = existingTodo.querySelector('.button-complete');
  const deleteButton = existingTodo.querySelector('.button-delete');

  completeButton.addEventListener('click', () => {
    existingTodo.classList.toggle('completed');
  });

  deleteButton.addEventListener('click', () => {
    existingTodo.remove();
  });
}