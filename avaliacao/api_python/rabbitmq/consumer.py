import pika
import threading
import time
from cache.redis_client import redis_client
import json

def eventos_callback(ch, method, properties, body):
    event = body.decode()
    print(f"Evento recebido do RabbitMQ: {event}")
    redis_client.rpush('events', event)

def logistics_callback(ch, method, properties, body):
    msg = body.decode()
    print(f"Mensagem logística recebida do RabbitMQ: {msg}")
    redis_client.rpush('logistics', msg)

def start_consumer():
    while True:
        try:
            connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
            break
        except pika.exceptions.AMQPConnectionError:
            print("Aguardando RabbitMQ ficar disponível...")
            time.sleep(3)
    channel = connection.channel()
    channel.queue_declare(queue='eventos')
    channel.queue_declare(queue='logistics')
    channel.basic_consume(queue='eventos', on_message_callback=eventos_callback, auto_ack=True)
    channel.basic_consume(queue='logistics', on_message_callback=logistics_callback, auto_ack=True)
    print('RabbitMQ consumer started...')
    channel.start_consuming()

def run_consumer_in_thread():
    thread = threading.Thread(target=start_consumer, daemon=True)
    thread.start()