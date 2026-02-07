// Задача 1.
// Создайте объект person с несколькими свойствами, содержащими информацию о вас. Затем выведите значения этих свойств в консоль.

// Решение:
const person = {
    name: "Павел",
    age: 43,
    city: "Сочи",
    profession: "Разработчик",
    hobbies: ["программирование", "чтение", "путешествия"],
    isStudent: false
};

console.log("\nВся информация одним объектом:");
console.log(person);

// Задача 2.
// Создайте функцию isEmpty, которая проверяет является ли переданный объект пустым. Если объект пуст - верните true, в противном случае false.

// Решение:
function isEmpty(obj) {
    // Проверка и вывод результата
    const result = Object.keys(obj || {}).length === 0;
    console.log(`Объект ${JSON.stringify(obj)} ${result ? 'пустой' : 'не пустой'}`);
    return result;
}

// Пример использования
const obj1 = {};
const obj2 = {x: 10};
const obj3 = {a: 1, b: 2, c: 3};

console.log("=== Пример ===");
isEmpty(obj1);
isEmpty(obj2);
isEmpty(obj3);

// Задача 3.
// Создайте объект task с несколькими свойствами: title, description, isCompleted.
// Напишите функцию cloneAndModify(object, modifications), которая с помощью оператора spread создает копию объекта и применяет изменения из объекта modifications.
// Затем с помощью цикла for in выведите все свойства полученного объекта.

// Решение:
// Создаем объект task
const task = {
  title: 'Изучить JavaScript',
  description: 'Повторить методы объектов и функции',
  isCompleted: false,
  priority: 'high'
};

// Функция для клонирования и модификации объекта
function cloneAndModify(object, modifications) {
  return {
    ...object,  // Создаем поверхностную копию исходного объекта
    ...modifications  // Применяем изменения (перезаписываем свойства)
  };
}

// Создаем объект с изменениями
const modifications = {
  isCompleted: true,
  priority: 'medium',
  deadline: '2024-12-31'
};

// Клонируем и модифицируем объект
const modifiedTask = cloneAndModify(task, modifications);

// Выводим все свойства полученного объекта с помощью цикла for...in
console.log('Все свойства модифицированного объекта:');
for (const property in modifiedTask) {
  console.log(`${property}: ${modifiedTask[property]}`);
}

// Для сравнения выведем исходный объект
console.log('\nИсходный объект (для сравнения):');
for (const property in task) {
  console.log(`${property}: ${task[property]}`);
}

// Задача 4.
// Создайте функцию callAllMethods, которая принимает объект и вызывает все его методы.

// Пример использования:
// const myObject = {
//     method1() {
//         console.log('Метод 1 вызван');
//     },
//     method2() {
//         console.log('Метод 2 вызван');
//     },
//     property: 'Это не метод'
// };
// callAllMethods(myObject);

// Решение:
function callAllMethods(object) {
  for (const key in object) {
    // Проверяем, является ли свойство функцией
    if (typeof object[key] === 'function') {
      // Вызываем метод
      object[key]();
    }
  }
}

// Пример использования:
const myObject = {
  method1() {
    console.log('Метод 1 вызван');
  },
  method2() {
    console.log('Метод 2 вызван');
  },
  property: 'Это не метод'
};

callAllMethods(myObject);
