# Behisebe

A Fun web application to track my daily expenses.



Future plans include -
1. React UI and Express backend
2. Deploy it as a microservice application

<!-- For Dev ENV -->

docker run -d -p 3306:3306 --name mysql-dev -e MYSQL_ROOT_PASSWORD=sergey -e MYSQL_DATABASE=Behisebe -e MYSQL_USER=sergey -e MYSQL_PASSWORD=sergey mysql:8.0

<!-- Openssl  -->

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt