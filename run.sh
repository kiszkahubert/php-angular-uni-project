#!/bin/bash

docker start php-db
docker start apache-php
ng serve &
cd ./backend && node server.js &