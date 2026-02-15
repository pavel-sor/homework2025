"use strict";

import { todos, createTodo } from "./model.js";
import {
  initRenderer,
  renderAllTodos,
  addSingleTodoToList,
  showEmptyMessage,
} from "./renderer.js";
import { addTodoEventListeners, setupFormHandler } from "./events.js";
import { MAX_TODO_LENGTH } from "./constants.js";

// DOM элементы
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const todosContainer = document.querySelector(".todos");

// Инициализация рендерера
initRenderer(todosContainer);

// Функция для добавления обработчиков ко всем существующим задачам
const addEventListenersToAllTodos = () => {
  const todoElements = document.querySelectorAll(".todo");
  todoElements.forEach((element) => {
    const todoId = parseInt(element.dataset.id);
    if (!isNaN(todoId)) {
      addTodoEventListeners(element, null, (todoId) => {
        if (todos.length === 0) {
          showEmptyMessage();
        }
      });
    }
  });
};

// Обработка создания новой задачи
const handleCreateTodo = (text) => {
  if (text.length > MAX_TODO_LENGTH) {
    alert(`Задача не может быть длиннее ${MAX_TODO_LENGTH} символов`);
    return;
  }

  const newTodo = createTodo(text);
  const todoElement = addSingleTodoToList(newTodo);

  if (todoElement) {
    addTodoEventListeners(todoElement, null, (todoId) => {
      if (todos.length === 0) {
        showEmptyMessage();
      }
    });
  }

  input.value = "";
  input.focus();
};

// Инициализация приложения
export const initializeApp = () => {
  renderAllTodos(todos);
  addEventListenersToAllTodos();

  // Настраиваем обработчик формы
  if (form && input) {
    setupFormHandler(form, input, handleCreateTodo);
  }

  if (input) {
    input.focus();
  }

  console.log("Приложение запущено");
  console.log("Загруженные задачи:", todos);
};
