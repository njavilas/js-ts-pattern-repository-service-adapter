SRC=src/index.ts
DIST=dist
TS_CONFIG=tsconfig.json

install:
	npm install

dev:
	npx tsx watch $(SRC)

start:
	npx tsx $(SRC)

build:
	npx tsc --project $(TS_CONFIG)

run: build
	node $(DIST)/index.js

clean:
	rm -rf $(DIST)

lint:
	npx eslint . --ext .ts

format:
	npx prettier --write .

.PHONY: install dev start build run clean lint format
