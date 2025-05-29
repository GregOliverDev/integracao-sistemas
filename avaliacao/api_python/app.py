from flask import Flask, request, jsonify
from cache.redis_client import redis_client
from rabbitmq.consumer import run_consumer_in_thread
import pika
import json
import threading

app = Flask(__name__)

@app.route('/event', methods=['POST'])
def add_event():
    event = request.json
    redis_client.rpush('events', json.dumps(event))
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
        channel = connection.channel()
        channel.queue_declare(queue='eventos')
        channel.basic_publish(exchange='', routing_key='eventos', body=json.dumps(event))
        connection.close()
    except Exception as e:
        print(f'Erro ao publicar no RabbitMQ: {e}')
    return jsonify({'status': 'Evento recebido'}), 201

@app.route('/events', methods=['GET'])
def get_events():
    events = redis_client.lrange('events', 0, -1)
    logistics = redis_client.lrange('logistics', 0, -1)
    return jsonify({
        "events": [json.loads(e) for e in events],
        "logistics": [json.loads(m) for m in logistics]
    })

def consume_logistics():
    def callback(ch, method, properties, body):
        try:
            redis_client.rpush('logistics', body.decode())
            print(f"Mensagem logística recebida: {body.decode()}")
        except Exception as e:
            print(f"Erro ao salvar mensagem logística: {e}")

    connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
    channel = connection.channel()
    channel.queue_declare(queue='logistics')
    channel.basic_consume(queue='logistics', on_message_callback=callback, auto_ack=True)
    print("Consumidor de logística iniciado.")
    channel.start_consuming()

if __name__ == '__main__':
    threading.Thread(target=consume_logistics, daemon=True).start()
    app.run(host='0.0.0.0', port=5000)