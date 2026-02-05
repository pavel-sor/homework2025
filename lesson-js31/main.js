// Задача 1.
// Напишите функцию calculateFinalPrice, которая принимает базовую цену товара,
// процент скидки и налоговую ставку. Функция должна вычислять скидку,
// затем прибавлять налог и возвращать итоговую цену.

// Пример работы:
// console.log(calculateFinalPrice(100, 10, 0.2)); // 108
// console.log(calculateFinalPrice(100, 10, 0)); // 90

// Решение:
function calculateFinalPrice(basePrice, discountPercent, taxRate) {
  // Вычисляем сумму скидки
  const discountAmount = basePrice * (discountPercent / 100);
  // Вычисляем цену после скидки
  const priceAfterDiscount = basePrice - discountAmount;
  // Вычисляем налог
  const taxAmount = priceAfterDiscount * taxRate;
  // Итоговая цена
  const finalPrice = priceAfterDiscount + taxAmount;

  return finalPrice;
}

console.log(calculateFinalPrice(100, 10, 0.2)); // 108
console.log(calculateFinalPrice(100, 10, 0)); // 90
console.log(calculateFinalPrice(100, 10, 0.5)); // 135



// Задача 2.
// Напишите функцию checkAccess, которая принимает имя пользователя и пароль.
// Если имя пользователя равно "admin" и пароль равен "123456",
// функция должна возвращать строку "Доступ разрешен", иначе — "Доступ запрещен".

// Решение:
function checkAccess(username, password) {
  const isAdmin = username === "admin" && password === "123456";
  const isUserWithPass1 = username === "user" && password === "123456";
  const isUserWithPass2 = username === "user" && password === "password";

  if (isAdmin || isUserWithPass1 || isUserWithPass2) {
    return "Доступ разрешен";
  } else {
    return "Доступ запрещен";
  }
}

console.log(checkAccess("admin", "123456"));
// Вывод: "Доступ разрешен"

console.log(checkAccess("admin", "password"));
// Вывод: "Доступ запрещен"

console.log(checkAccess("user", "123456"));
// Вывод: "Доступ разрешен"

console.log(checkAccess("user", "password"));
// Вывод: "Доступ разрешен"

console.log(checkAccess("", ""));
// Вывод: "Доступ запрещен"



// Задача 3.
// Напишите функцию getTimeOfDay, которая принимает текущее время (число от 0 до 23)
// и возвращает строку:
// "Ночь" (с 0 до 5 часов),
// "Утро" (с 6 до 11 часов),
// "День" (с 12 до 17 часов),
// "Вечер" (с 18 до 23 часов).
// Если введённое значение не попадает в этот диапазон, возвращайте `"Некорректное время"`.

// Решение:
function getTimeOfDay(hour) {
  // Проверяем корректность входных данных
  if (typeof hour !== 'number' || hour < 0 || hour > 23 || !Number.isInteger(hour)) {
    return "Некорректное время";
  }

  // Определяем время суток
  if (hour >= 0 && hour <= 5) {
    return "Ночь";
  } else if (hour >= 6 && hour <= 11) {
    return "Утро";
  } else if (hour >= 12 && hour <= 17) {
    return "День";
  } else if (hour >= 18 && hour <= 23) {
    return "Вечер";
  }
}

// Примеры использования:

// Тест 1: Ночь
console.log(getTimeOfDay(0));   // "Ночь"
console.log(getTimeOfDay(3));   // "Ночь"
console.log(getTimeOfDay(5));   // "Ночь"

// Тест 2: Утро
console.log(getTimeOfDay(6));   // "Утро"
console.log(getTimeOfDay(9));   // "Утро"
console.log(getTimeOfDay(11));  // "Утро"

// Тест 3: День
console.log(getTimeOfDay(12));  // "День"
console.log(getTimeOfDay(15));  // "День"
console.log(getTimeOfDay(17));  // "День"

// Тест 4: Вечер
console.log(getTimeOfDay(18));  // "Вечер"
console.log(getTimeOfDay(20));  // "Вечер"
console.log(getTimeOfDay(23));  // "Вечер"

// Тест 5: Некорректные данные
console.log(getTimeOfDay(-1));  // "Некорректное время"
console.log(getTimeOfDay(24));  // "Некорректное время"
console.log(getTimeOfDay(25));  // "Некорректное время"
console.log(getTimeOfDay(5.5)); // "Некорректное время" (не целое число)
console.log(getTimeOfDay("12")); // "Некорректное время" (строка)
console.log(getTimeOfDay(null)); // "Некорректное время"
console.log(getTimeOfDay());     // "Некорректное время" (undefined)


// Задача 4.
// Напишите функцию findFirstEven, которая принимает два числа start и end и находит
// первое чётное число в указанном диапазоне.
// Если чётного числа в этом диапазоне нет, функция должна вернуть "Чётных чисел нет".

// Пример работы:
// console.log(findFirstEven(1, 10)); // 2
// console.log(findFirstEven(9, 9)); // "Чётных чисел нет"

// Решение:
function findFirstEven(start, end) {
  // Проверяем корректность входных данных
  if (typeof start !== 'number' || typeof end !== 'number' ||
      !Number.isInteger(start) || !Number.isInteger(end) ||
      start > end) {
    return "Некорректный диапазон";
  }

  // Перебираем числа в диапазоне от start до end
  for (let i = start; i <= end; i++) {
    // Проверяем, является ли число четным
    if (i % 2 === 0) {
      return i; // Возвращаем первое найденное четное число
    }
  }

  // Если четных чисел не найдено
  return "Чётных чисел нет";
}

// Примеры работы:

// Базовые тесты
console.log(findFirstEven(1, 10));   // 2
console.log(findFirstEven(9, 9));    // "Чётных чисел нет"
console.log(findFirstEven(2, 5));    // 2
console.log(findFirstEven(3, 7));    // 4
console.log(findFirstEven(10, 20));  // 10

// Граничные случаи
console.log(findFirstEven(0, 0));    // 0 (0 - четное число)
console.log(findFirstEven(1, 1));    // "Чётных чисел нет"
console.log(findFirstEven(2, 2));    // 2
console.log(findFirstEven(-5, -1));  // -4
console.log(findFirstEven(-3, 3));   // -2

// Некорректные данные
console.log(findFirstEven(10, 1));   // "Некорректный диапазон"
console.log(findFirstEven(1.5, 5));  // "Некорректный диапазон"
console.log(findFirstEven("1", 5));  // "Некорректный диапазон"
console.log(findFirstEven(1, "10")); // "Некорректный диапазон"
