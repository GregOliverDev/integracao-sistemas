<?php
error_reporting(E_ALL & ~E_DEPRECATED);
require_once __DIR__ . '/rabbitmq.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

if ($method === 'GET' && $uri === '/equipments') {
    echo json_encode([
        ['id' => 1, 'nome' => 'Guindaste'],
        ['id' => 2, 'nome' => 'Esteira'],
        ['id' => 3, 'nome' => 'Empilhadeira']
    ]);
    exit;
}

if ($method === 'POST' && $uri === '/dispatch') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || !isset($input['mensagem'])) {
        http_response_code(400);
        echo json_encode(['erro' => 'Mensagem obrigatória']);
        exit;
    }
    $result = publishToRabbitMQ($input['mensagem']);
    echo json_encode(['status' => $result ? 'ok' : 'erro']);
    exit;
}

http_response_code(404);
echo json_encode(['erro' => 'Endpoint não encontrado']);