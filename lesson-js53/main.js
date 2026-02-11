// Задание 1.
// Дан массив пользователей:
// const users = [
//   { name: 'Alex', age: 24, isAdmin: false },
//   { name: 'Bob', age: 13, isAdmin: false },
//   { name: 'John', age: 31, isAdmin: true },
//   { name: 'Jane', age: 20, isAdmin: false },
//]
// Добавьте в конец массива двух пользователей:
// { name: 'Ann', age: 19, isAdmin: false },
// { name: 'Jack', age: 43, isAdmin: true }
//]
// Решение:
const users = [
  { name: 'Alex', age: 24, isAdmin: false },
  { name: 'Bob', age: 13, isAdmin: false },
  { name: 'John', age: 31, isAdmin: true },
  { name: 'Jane', age: 20, isAdmin: false },
];

users.push({ name: 'Ann', age: 19, isAdmin: false });
users.push({ name: 'Jack', age: 43, isAdmin: true });

console.log(users);


// Задание 2.
// Используя массив пользователей users из предыдущего задания,
// напишите функцию getUserAverageAge(users),
// которая возвращает средний возраст пользователей.

// Решение:
function getUserAverageAge(users) {
  const totalAge = users.reduce((sum, user) => sum + user.age, 0);
  return totalAge / users.length;
}

console.log(getUserAverageAge(users)); //25

// Задание 3.
// Используя массив пользователей users из предыдущего задания,
// напишите функцию getAllAdmins(users), которая возвращает массив всех администраторов.

// Решение:
function getAllAdmins(users) {
  return users.filter(user => user.isAdmin === true);
}

console.log(getAllAdmins(users));
//{ name: 'John', age: 31, isAdmin: true },
//  { name: 'Jack', age: 43, isAdmin: true }

// Задание 4.
// Напишите функцию first(arr, n),
// которая возвращает первые n элементов массива. Если n == 0,
// возвращается пустой массив [], если n == undefined, то возвращается массив с первым элементом.

// Решение:
function first(arr, n) {
  if (n === 0) {
    return [];
  }
  if (n === undefined) {
    return [arr[0]];
  }
  return arr.slice(0, n);
}
console.log(first(users, 3));
// [{ name: 'Alex', ... }, { name: 'Bob', ... }, { name: 'John', ... }]

console.log(first(users, 0));
// []

console.log(first(users));
// [{ name: 'Alex', age: 24, isAdmin: false }]

console.log(first(users, 2));
// [{ name: 'Alex', ... }, { name: 'Bob', ... }]