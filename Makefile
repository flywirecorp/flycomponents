.PHONY: up down reload test test-watch bash watch logs e2e build build-docs

up:
	docker-compose up --build -d dev

down:
	docker-compose down

reload:
	make down
	make up

test:
	docker-compose run --rm dev npm run test

test-watch:
	docker-compose run --rm dev npm run test:watch

bash:
	docker-compose exec dev bash

watch:
	docker-compose run --rm dev npm run test:watch

logs:
	docker-compose logs -f dev

build:
	docker-compose run --rm dev npm run build

build-docs:
	docker-compose run --rm dev npm run build:docs

default: up
