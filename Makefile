# makefile for mtn-otel-sdk

PROJECT_NAME = mtn-otel-sdk
SRC_DIR = src
DIST_DIR = dist
MAINTAINER = Muutassim-Mukhtar

.PHONY: help
help:
        @echo "Usage: make [target]"
        @echo ""
        @echo "Available targets:"
        @echo "  install         Install dependencies"
        @echo "  build           Compile TypeScript to JavaScript"
        @echo "  clean           Remove build artifacts"
        @echo "  lint            Run linter (optional)"
        @echo "  link            Link this SDK globally for local testing"
        @echo "  test-app        Run a test app that uses this SDK"
        @echo "  dev             Install, build, and link (for local development)"
        @echo "  help            Show this help message"

.PHONY: install
install:
        npm install

.PHONY: build
build:
        npx tsc

.PHONY: clean
clean:
        rm -rf $(DIST_DIR)

.PHONY: lint
lint:
        npx eslint $(SRC_DIR) --ext .ts

.PHONY: link
link:
        npm link

.PHONY: test-app
test-app:
        cd ../test-app && npm link $(PROJECT_NAME) && npm start

.PHONY: dev
dev: install build link
