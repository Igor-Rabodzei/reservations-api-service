# Reservations Api Service

## Environment variables

```bash
# Need to fill dev.env file or create .env and fill it
MONGO_CONNECTION_URL=""
JWT_ACCESS_TOKEN_SECRET=""
```

## Running the app

```bash
# development
$ ./service dev

# production mode
$ ./service prod

# watch logs
$ ./service logs

# run mongo migrations
# (requirements: before need to run service.sh script to run api and mongo)
$ docker exec -it reservations-api-reservations-api-service-1 migrate-mongo up
```

## Project architecture

```bash
migrations/
config/
src/
  ├─ config/
  ├─ common/
  ├─ modules/
  ├─ schemas/
  ├─ app.module
  ├─ main
```
