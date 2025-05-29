<?php
function publishToRabbitMQ($mensagem) {
    require_once __DIR__ . '/vendor/autoload.php';
    $connection = new PhpAmqpLib\Connection\AMQPStreamConnection('rabbitmq', 5672, 'guest', 'guest');
    $channel = $connection->channel();
    $channel->queue_declare('logistics', false, false, false, false);
    $msg = new PhpAmqpLib\Message\AMQPMessage(json_encode(['mensagem' => $mensagem]));
    $channel->basic_publish($msg, '', 'logistics');
    $channel->close();
    $connection->close();
    return true;
}