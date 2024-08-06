<?php
// Ваш API-ключ и IP-адрес пользователя
// URL для запроса к API ipify
$apiUrl = 'https://api.ipify.org?format=json';

// Инициализируем cURL сессию
$curl = curl_init();
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

// Устанавливаем опции запроса
curl_setopt_array($curl, array(
    CURLOPT_URL => $apiUrl,        // Устанавливаем URL для запроса
    CURLOPT_RETURNTRANSFER => true // Включаем возврат результата запроса в виде строки
));

// Выполняем запрос и сохраняем ответ
$response = curl_exec($curl);
$responseData = json_decode($response, true); // Декодируем JSON-ответ в массив

$api_key = '447101F4AC0051415D4AE0F3AA23778D';
$user_ip =  $responseData['ip'];

// URL-адрес API
$url = "https://api.ip2location.io/?key={$api_key}&ip={$user_ip}";

// Получение ответа от API
$response = file_get_contents($url);

// Парсинг JSON-ответа  
$data = json_decode($response, true);
$city = isset($data['region_name']) ? $data['region_name'] : 'Unknown';


// Возвращаем ответ в формате JSON
$response_city = ['region_name' => $city];
echo json_encode($response_city);
?>
