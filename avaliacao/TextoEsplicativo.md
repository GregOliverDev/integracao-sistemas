Criado 3 api usando as linguagens descritas com seus requests

[api_node](npm run start)
    [request{GET}](http://localhost:3000/sensor-data)
    [request{POST}](http://localhost:3000/alert)

No [node] foi usado rotas para configurar o [sensor-data] e [alert] cada rota sendo chamada na app.js 
dentro dos arquivos das rotas tem as funções de como deve ser feita a request.  
Na [sensor-data] chama a [sensorService] e nela faz a conexão com o redis e gera os dados aleatorios do sensor. 
Na [alert] faz a chamada do [POST] da api_python passando [sensorData] e [evento] gerados aleatoriamente.

[api_php]
    [request{GET}](http://localhost:8000/equipments)
    [request{POST}](http://localhost:8000/dispatch)
        [body]
            { "mensagem": "Envio urgente de equipamento" }

No [php] temos duas request [equipaments] que retorna uma lista de equipamentos mocados no codigo e temos o [POST]
do [dispatch] que apenas recebe uma mesagem no body e grava no [rabbitmq].

[api_python]
    [request{GET}](http://localhost:5000/events)
    [request{POST}](http://localhost:5000/event)

No [python] temos uma request que mostra todos os eventos que são salvos pela [api_node] juntamente com as mensagens da [api_php] e
uma request que é usada para salvar os eventos

[Inicialização]
    docker-compose up --build

Eu tive que usar docker compose pois o php e o python não funcionam na minha maquina
