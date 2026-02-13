///Задачи

// 1. Создайте функцию, которая отвечает на вопрос «Играете ли вы на банджо?».
// Если ваше имя начинается с буквы «Р» или строчной «r», значит, вы играете на банджо!

// Функция принимает имя в качестве единственного аргумента и возвращает одну из следующих строк:

// name + " plays banjo"
// name + " does not play banjo"
// Указанные имена всегда являются корректными строками.

// Решение:
function areYouPlayingBanjo(name) {
  return name + (name[0].toLowerCase() === 'r' ? " plays banjo" : " does not play banjo");
}


//===================================================================

// 2. const chai = require('chai');
// const assert = chai.assert;

// describe("Example Tests", function() {
//   it("betterThanAverage([2, 3], 5) should return True", function() {
//     assert.strictEqual(betterThanAverage([2, 3], 5), true);
//   });

//   it("betterThanAverage([100, 40, 34, 57, 29, 72, 57, 88], 75) should return True", function() {
//     assert.strictEqual(betterThanAverage([100, 40, 34, 57, 29, 72, 57, 88], 75), true);
//   });

//   it("betterThanAverage([12, 23, 34, 45, 56, 67, 78, 89, 90], 9) should return False", function() {
//     assert.strictEqual(betterThanAverage([12, 23, 34, 45, 56, 67, 78, 89, 90], 9), false);
//   });

//   it("betterThanAverage([41, 75, 72, 56, 80, 82, 81, 33], 50) should return False", function() {
//     assert.strictEqual(betterThanAverage([41, 75, 72, 56, 80, 82, 81, 33], 50), false);
//   });

//   it("betterThanAverage([29, 55, 74, 60, 11, 90, 67, 28], 21) should return False", function() {
//     assert.strictEqual(betterThanAverage([29, 55, 74, 60, 11, 90, 67, 28], 21), false);
//   });

//   it("betterThanAverage([50, 50, 50], 50) should return False", function() {
 //    assert.strictEqual(betterThanAverage([50, 50, 50], 50), false);
//   });
// }); Вы получаете массив с результатами тестов ваших одноклассников. Теперь вычислите среднее значение и сравните свой результат!

// Верните true, если вы лучше, и false в противном случае!

// Примечание:
// Ваши баллы не включены в общий список баллов вашего класса. Не забудьте их при подсчёте среднего балла!

// Решение:

function betterThanAverage(classPoints, yourPoints) {
  // Вычисляем сумму баллов одноклассников
  const classSum = classPoints.reduce((acc, points) => acc + points, 0);

  // Вычисляем среднее значение включая ваш результат
  const average = (classSum + yourPoints) / (classPoints.length + 1);

  // Сравниваем ваш результат со средним
  return yourPoints > average;
}

// Тестируем функцию и выводим результаты в консоль
console.log("Результаты тестов:");
console.log("------------------");

const test1 = betterThanAverage([2, 3], 5);
console.log(`betterThanAverage([2, 3], 5) → ${test1} (должно быть true)`);

const test2 = betterThanAverage([100, 40, 34, 57, 29, 72, 57, 88], 75);
console.log(`betterThanAverage([100, 40, 34, 57, 29, 72, 57, 88], 75) → ${test2} (должно быть true)`);

const test3 = betterThanAverage([12, 23, 34, 45, 56, 67, 78, 89, 90], 9);
console.log(`betterThanAverage([12, 23, 34, 45, 56, 67, 78, 89, 90], 9) → ${test3} (должно быть false)`);

const test4 = betterThanAverage([41, 75, 72, 56, 80, 82, 81, 33], 50);
console.log(`betterThanAverage([41, 75, 72, 56, 80, 82, 81, 33], 50) → ${test4} (должно быть false)`);

const test5 = betterThanAverage([29, 55, 74, 60, 11, 90, 67, 28], 21);
console.log(`betterThanAverage([29, 55, 74, 60, 11, 90, 67, 28], 21) → ${test5} (должно быть false)`);

const test6 = betterThanAverage([50, 50, 50], 50);
console.log(`betterThanAverage([50, 50, 50], 50) → ${test6} (должно быть false)`);

//===================================================================

// 3. Ваша задача — написать две функции (max и min или maximum и minimum и т. д., в зависимости от языка программирования), которые принимают на вход список целых чисел и возвращают наибольшее и наименьшее число из этого списка соответственно. Каждая функция возвращает одно число.

// Примеры (ввод —> вывод)
// * [4,6,2,1,9,63,-134,566]         -> max = 566, min = -134
// * [-52, 56, 30, 29, -54, 0, -110] -> min = -110, max = 56
// * [42, 54, 65, 87, 0]             -> min = 0, max = 87
// * [5]                             -> min = 5, max = 5
// Примечания
// Вы можете считать, что пустых массивов/векторов не будет.

// Решение:
function min(arr) {
  return Math.min(...arr);
}

function max(arr) {
  return Math.max(...arr);
}

// Тесты из задания
console.log("Тесты из условия:");
console.log("max([4,6,2,1,9,63,-134,566]) =", max([4,6,2,1,9,63,-134,566])); // 566
console.log("min([4,6,2,1,9,63,-134,566]) =", min([4,6,2,1,9,63,-134,566])); // -134
console.log("min([-52, 56, 30, 29, -54, 0, -110]) =", min([-52, 56, 30, 29, -54, 0, -110])); // -110
console.log("max([-52, 56, 30, 29, -54, 0, -110]) =", max([-52, 56, 30, 29, -54, 0, -110])); // 56
console.log("min([42, 54, 65, 87, 0]) =", min([42, 54, 65, 87, 0])); // 0
console.log("max([42, 54, 65, 87, 0]) =", max([42, 54, 65, 87, 0])); // 87
console.log("min([5]) =", min([5])); // 5
console.log("max([5]) =", max([5])); // 5

//===================================================================

// 4. Напишите функцию, которая разбивает строку на части и преобразует ее в массив слов.

//Примеры (ввод ==> вывод):
//"Robin Singh" ==> ["Robin", "Singh"]

//"I love arrays they are my favorite" ==> ["I", "love", "arrays", "they", "are", "my", "favorite"]

// Решение:
function stringToArray(string) {
  return string.split(' ');
}

// Тесты из задания
console.log(stringToArray("Robin Singh")); // ["Robin", "Singh"]
console.log(stringToArray("I love arrays they are my favorite")); // ["I", "love", "arrays", "they", "are", "my", "favorite"]

//===================================================================

// 5. Для заданного набора чисел верните аддитивно противоположные значения для каждого из них. Все положительные числа станут отрицательными, а отрицательные — положительными.

// [1, 2, 3, 4, 5] --> [-1, -2, -3, -4, -5]
// [1, -2, 3, -4, 5] --> [-1, 2, -3, 4, -5]
// [] --> []
// Можно предположить, что все значения являются целыми числами. Не изменяйте входной массив.

// Решение:
function invert(array) {
  return array.map(num => -num);
}

// Тесты из задания
console.log(invert([1, 2, 3, 4, 5]));      // [-1, -2, -3, -4, -5]
console.log(invert([1, -2, 3, -4, 5]));    // [-1, 2, -3, 4, -5]
console.log(invert([]));                  // []

// Дополнительные тесты
console.log(invert([0]));                 // [0]
console.log(invert([-1, -2, -3]));        // [1, 2, 3]
console.log(invert([10, -20, 30]));       // [-10, 20, -30]

//===================================================================

// 6. Пишите код как можно быстрее! Вам нужно удвоить число и вернуть его.

// Решение:

function doubleInteger(num) {
  return num * 2;
}

// Тесты
console.log(doubleInteger(2)); // 4
console.log(doubleInteger(5)); // 10
console.log(doubleInteger(0)); // 0
console.log(doubleInteger(-3)); // -6

//===================================================================

// 7.Ваша задача — создать функцию, которая выполняет четыре основные математические операции.

// Функция должна принимать три аргумента: операция (строка/символ), значение1 (число), значение2 (число).
// Функция должна возвращать результат применения выбранной операции к числам.

// Примеры: (Оператор, значение1, значение2) —> вывод
// ('+', 4, 7) --> 11
// ('-', 15, 18) --> -3
// ('*', 5, 5) --> 25
// ('/', 49, 7) --> 7

// Решение:
function basicOp(operation, value1, value2) {
  switch(operation) {
    case '+': return value1 + value2;
    case '-': return value1 - value2;
    case '*': return value1 * value2;
    case '/': return value1 / value2;
    default: return 'Invalid operation';
  }
}

// Тесты
console.log(basicOp('+', 4, 7));   // 11
console.log(basicOp('-', 15, 18)); // -3
console.log(basicOp('*', 5, 5));   // 25
console.log(basicOp('/', 49, 7));  // 7

// Дополнительные тесты
console.log(basicOp('+', 10, 20)); // 30
console.log(basicOp('-', 100, 1)); // 99
console.log(basicOp('*', 8, 9));   // 72
console.log(basicOp('/', 81, 9));  // 9

//===================================================================

// 8. Напишите функцию, которая преобразует введенную строку в верхний регистр.

// Решение:
function makeUpperCase(str) {
  return str.toUpperCase();
}

// Тесты
console.log(makeUpperCase("hello"));     // "HELLO"
console.log(makeUpperCase("Hello World")); // "HELLO WORLD"
console.log(makeUpperCase("123 abc"));   // "123 ABC"
console.log(makeUpperCase(""));          // ""
console.log(makeUpperCase("already UPPER")); // "ALREADY UPPER"

//===================================================================

// 9. Напишите функцию, которая удаляет пробелы из строки, а затем возвращает полученную строку.

// Примеры (Вход -> Выход):

// "8 j 8   mBliB8g  imjB8B8  jl  B" -> "8j8mBliB8gimjB8B8jlB"
// "8 8 Bi fk8h B 8 BB8B B B  B888 c hl8 BhB fd" -> "88Bifk8hB8BB8BBBB888chl8BhBfd"
// "8aaaaa dddd r     " -> "8aaaaaddddr"

// Решение:
function noSpace(str) {
  return str.split(' ').join('');
}

// Тесты из задания
console.log(noSpace("8 j 8   mBliB8g  imjB8B8  jl  B"));
// "8j8mBliB8gimjB8B8jlB"

console.log(noSpace("8 8 Bi fk8h B 8 BB8B B B  B888 c hl8 BhB fd"));
// "88Bifk8hB8BB8BBBB888chl8BhBfd"

console.log(noSpace("8aaaaa dddd r     "));
// "8aaaaaddddr"

// Дополнительные тесты
console.log(noSpace("Hello World!"));     // "HelloWorld!"
console.log(noSpace("a b c d e"));        // "abcde"
console.log(noSpace(""));                // ""

//===================================================================

// 10.В этой ката нужно умножить заданное число на восемь, если оно чётное, и на девять, если оно нечётное.

// Решение:
function simpleMultiplication(number) {
  return number % 2 === 0 ? number * 8 : number * 9;
}

// Тесты
console.log(simpleMultiplication(2));  // 16 (2 * 8)
console.log(simpleMultiplication(3));  // 27 (3 * 9)
console.log(simpleMultiplication(4));  // 32
console.log(simpleMultiplication(5));  // 45
console.log(simpleMultiplication(0));  // 0 (0 * 8)
console.log(simpleMultiplication(1));  // 9
console.log(simpleMultiplication(7));  // 63
console.log(simpleMultiplication(10)); // 80