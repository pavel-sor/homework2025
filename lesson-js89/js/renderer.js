
"use strict";

import { todoKeys, EMPTY_MESSAGE_TEXT } from "./constants.js";

let todosContainer = null;

export const initRenderer = (container) => {
  todosContainer = container;
  if (!todosContainer) {
    console.error("Контейнер .todos не найден в HTML");
  }
  return todosContainer;
};

// Функция для отображения пустого списка
export const showEmptyMessage = () => {
  if (!todosContainer) return;

  todosContainer.innerHTML = "";
  const emptyMessage = document.createElement("li");
  emptyMessage.textContent = EMPTY_MESSAGE_TEXT;
  emptyMessage.className = "empty-message"; // используем класс из CSS
  todosContainer.appendChild(emptyMessage);
};

// Функция для создания элемента задачи
export const createTodoElement = (todo) => {
  const li = document.createElement("li");
  li.className = "todo";
  li.dataset.id = todo[todoKeys.id];

  li.innerHTML = `
    <div class="todo-text">${todo[todoKeys.text]}</div>
    <div class="todo-actions">
      <button class="button-complete button" title="Выполнено">✓</button>
      <button class="button-delete button" title="Удалить">✕</button>
    </div>
  `;

  if (todo[todoKeys.is_completed]) {
    li.classList.add("completed");
  }

  return li;
};

// Функция для полного рендеринга всех задач
export const renderAllTodos = (todos) => {
  if (!todosContainer) return;

  if (todos.length === 0) {
    showEmptyMessage();
    return;
  }

  todosContainer.innerHTML = "";
  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todosContainer.appendChild(todoElement);
  });

  console.log("Текущие задачи:", todos);
  return todosContainer.children;
};

// Функция для добавления одной новой задачи
export const addSingleTodoToList = (todo) => {
  if (!todosContainer) return null;

  // Если список пуст и есть сообщение, очищаем его
  const emptyMessage = todosContainer.querySelector(".empty-message");
  if (emptyMessage) {
    todosContainer.innerHTML = "";
  }

  const todoElement = createTodoElement(todo);
  todosContainer.appendChild(todoElement);
  return todoElement;
};
