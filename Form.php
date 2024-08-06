<?php


$Num1= 25 ;
$Num2= 25 ;


?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Синхронный калькулятор</title>
</head>
<body>

<input type="number" id="first_number" placeholder="Введите первое число"><br>
<input type="number" id="second_number" placeholder="Введите второе число"><br>
<div id="result">Результат: </div>

<script>
// Получаем ссылки на элементы DOM
var firstNumberInput = document.getElementById('first_number');
var secondNumberInput = document.getElementById('second_number');
var resultElement = document.getElementById('result');

// Обработчик события для поля ввода первого числа
firstNumberInput.addEventListener('input', function () {
    updateResult();
});

// Обработчик события для поля ввода второго числа
secondNumberInput.addEventListener('input', function () {
    updateResult();
});

// Функция для обновления результата калькуляции
function updateResult() {
    // Получаем значения из полей ввода
    var firstNumber = parseFloat(firstNumberInput.value) || 0;
    var secondNumber = parseFloat(secondNumberInput.value) || 0;
    var Number1 = <?php echo $Num1 ?>;
    var Number2 = <?php echo $Num2 ?>;


    // Выполняем калькуляцию
    var result = firstNumber + secondNumber + Number1 + Number2;

    // Обновляем результат калькуляции
    resultElement.textContent = 'Результат: ' + result;
}
</script>

</body>
</html>
