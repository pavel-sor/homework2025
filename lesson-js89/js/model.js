
"use strict";

import { todoKeys } from "./constants.js";
import { getTodosFromLocalStorage, setTodosToLocalStorage } from "./storage.js";

// Состояние приложения
export let todos = getTodosFromLocalStorage();

const errTodoNotFound = (todoId) => `Todo with id ${todoId} not found`;

const getNewTodoId = (todos) =>
  todos.reduce((maxId, todo) => Math.max(maxId, todo[todoKeys.id]), 0) + 1;

export const createTodo = (text) => {
  const newTodo = {
    [todoKeys.id]: getNewTodoId(todos),
    [todoKeys.text]: text,
    [todoKeys.is_completed]: false,
  };
  todos.push(newTodo);
  setTodosToLocalStorage(todos);
  return newTodo;
};

export const completeTodoById = (todoId) => {
  const todo = todos.find((todo) => todo[todoKeys.id] === todoId);

  if (!todo) {
    console.error(errTodoNotFound(todoId));
    return null;
  }
  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
  setTodosToLocalStorage(todos);
  return todo;
};

export const deleteTodoById = (todoId) => {
  const todoIndex = todos.findIndex((todo) => todo[todoKeys.id] === todoId);
  if (todoIndex === -1) {
    console.error(errTodoNotFound(todoId));
    return false;
  }
  todos.splice(todoIndex, 1);
  setTodosToLocalStorage(todos);
  return true;
};
