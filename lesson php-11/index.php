<?php
// Подключаем все файлы
require_once 'output.php';
require_once 'output-cycle.php';
require_once 'counter-even.php';

echo "<h1>Все задания в одном файле</h1>";

echo "<h2>Задание 1: Одиночные элементы</h2>";
createHtmlElement('h1', 'Заголовок первого уровня');
createHtmlElement('p', 'Это абзац текста');

echo "<h2>Задание 2: Множественные элементы</h2>";
createHtmlElementCycle('p', 'Абзац', 3);

echo "<h2>Задание 3: Четные числа из массива</h2>";
// Здесь уже выполнится код из counter-even.php
?>