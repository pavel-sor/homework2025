"use strict";

import { completeTodoById, deleteTodoById } from "./model.js";

export const addTodoEventListeners = (todoElement, onUpdate, onDelete) => {
  const completeButton = todoElement.querySelector(".button-complete");
  const deleteButton = todoElement.querySelector(".button-delete");
  const todoId = parseInt(todoElement.dataset.id);

  if (isNaN(todoId)) {
    console.error("ID задачи не найден в data-id");
    return;
  }

  if (completeButton) {
    completeButton.addEventListener("click", () => {
      const updatedTodo = completeTodoById(todoId);
      if (updatedTodo) {
        todoElement.classList.toggle("completed");
        console.log(`Задача ${todoId} обновлена`, updatedTodo);
        if (onUpdate) onUpdate(updatedTodo);
      }
    });
  }

  if (deleteButton) {
    deleteButton.addEventListener("click", () => {
      const deleted = deleteTodoById(todoId);
      if (deleted) {
        todoElement.remove();
        console.log(`Задача ${todoId} удалена`);
        if (onDelete) onDelete(todoId);
      }
    });
  }
};

export const setupFormHandler = (form, input, onSubmit) => {
  if (!form) {
    console.error("Форма .form не найдена");
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!input) {
      console.error("Поле ввода .input не найдено");
      alert("Ошибка: поле ввода не найдена");
      return;
    }

    const text = input.value.trim();

    if (text === "") {
      alert("Пожалуйста, введите задачу");
      return;
    }

    onSubmit(text);
  };

  form.addEventListener("submit", handleSubmit);

  // Возвращаем функцию для удаления обработчика
  return () => form.removeEventListener("submit", handleSubmit);
};