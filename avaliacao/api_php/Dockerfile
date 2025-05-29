FROM php:8.0-cli

WORKDIR /var/www/html

COPY index.php .
COPY rabbitmq.php .

RUN apt-get update && apt-get install -y unzip git \
    && docker-php-ext-install bcmath \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && composer require php-amqplib/php-amqplib

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000"]
