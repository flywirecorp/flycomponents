.PHONY: up down test bash logs e2e

up:
	docker-compose up --build -d docs

down:
	docker-compose down

test:
	docker-compose run --rm docs yarn test

bash:
	docker-compose exec docs bash

logs:
	docker-compose logs -f docs

default: up
