# financial_tracker
Financial Tracker App

## Install
```
$ docker-compose up --build
$ docker-compose exec backend rails db:create
$ docker-compose exec backend rails db:migrate
$ docker-compose exec backend rails db:seed
```

## Run
```
$ docker-compose up
```

### Enter Rails console
```
$ docker-compose exec backend rails c
```
