<?php
// Функция для вывода нескольких HTML элементов с помощью цикла
function createHtmlElementCycle($tag, $content, $count) {
    // Проверяем, что количество - положительное число
    if (!is_numeric($count) || $count <= 0) {
        echo "Ошибка: количество должно быть положительным числом";
        return;
    }

    // Очищаем тег от потенциально опасных символов
    $tag = strip_tags($tag);

    // Цикл для вывода указанного количества элементов
    for ($i = 1; $i <= $count; $i++) {
        echo "<$tag>$content $i</$tag>";
        // Можно добавить перенос строки для читаемости HTML кода
        echo "\n";
    }
}

// Альтернативная версия с возможностью нумерации или без
function createHtmlElementCycleAdvanced($tag, $content, $count, $showNumbers = true) {
    if (!is_numeric($count) || $count <= 0) {
        echo "Ошибка: количество должно быть положительным числом";
        return;
    }

    $tag = strip_tags($tag);

    for ($i = 1; $i <= $count; $i++) {
        if ($showNumbers) {
            echo "<$tag>$content $i</$tag>\n";
        } else {
            echo "<$tag>$content</$tag>\n";
        }
    }
}
?>