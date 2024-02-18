# Reservations Api Service

## Environment variables

```bash
# Fill all env variables which are written in file .env-example and put them in file .env
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
  ├─ common/
  ├─ modules/
  ├─ schemas/
  ├─ app.module
  ├─ main
```
