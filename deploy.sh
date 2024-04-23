#!/bin/bash

if [ "$1" = "up" ]; then

  cd set_daily_closer/src
  go build -o ../bin/daily_closer . 
  cd ../../
  cp set_daily_closer/bin/daily_closer web_app
  docker compose up --build --force-recreate --no-deps -d
  rm -rf web_app/daily_closer
  
elif [ "$1" = "down" ]; then

  docker compose down -v

elif [ "$1" = "clean" ]; then

  docker compose down --rmi all -v 
fi




