#!/bin/bash

case "$1" in
    dev)
        docker-compose stop

        docker-compose build && docker-compose up -d  --remove-orphans
        ;;
    logs)
        docker-compose logs --tail 30 -f reservations-api-service
        ;;
    stop)
        docker-compose stop
        ;;
  *)
        echo "Usage: service.sh {prod|dev|logs|stop}" >&2
        exit 1
        ;;
esac

exit 0