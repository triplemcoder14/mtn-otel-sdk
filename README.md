#  mtn-otel-sdk

 zero-config otel tracing library for Node.js/TypeScript apps at MTN.

---

##  Purpose

`mtn-otel-sdk` allows developers to **add observability** (distributed tracing) to their Node.js applications with **minimal code and no deep knowledge of OpenTelemetry**.

It wraps and configures the OpenTelemetry SDK with sane defaults, exporters, and auto-instrumentations for popular Node.js libraries like Express, HTTP, and more.

---

## Features

- one line setup for OpenTelemetry tracing
- automatic context propagation
- OTLP trace exporting (e.g., to otel collector, jaeger, etc.)
-  auto-instrumentation for HTTP, Express, gRPC, and more
- configurable via `.env` or environment variables
- graceful shutdown handling

---

## Installation

### Option 1: From internal registry

```
npm install mtn-otel-sdk
```

### Option 2: From local path

```
npm install /path/to/mtn-otel-sdk
```

## Quick Start

1. Import and initialize tracing early

In your entry file (e.g., server.ts, app.ts, main.ts):
```
import { initTelemetry } from 'mtn-otel-sdk';

initTelemetry();
```
Thats it! Your app is now emitting traces for supported libraries.

## Comfiguration

Use environment variables (or a .env file) to configure the SDK.

| Env Variable                  | Description                                  | Default                                 |
| ----------------------------- |----------------------------------------------| --------------------------------------- |
| `OTEL_SERVICE_NAME`           | Name of your service (shown in Kibana, etc.) | `unnamed-node-service`                  |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Where to export traces via OTLP HTTP         | `http://localhost:4318/v1/traces`       |
| `OTEL_LOG_LEVEL`              | OpenTelemetry internal logging level         | `info` (`debug`, `warn`, `error`, etc.) |


### Example .env:

```
OTEL_SERVICE_NAME=payments-api
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318/v1/traces
OTEL_LOG_LEVEL=info
```

## Supported Auto-Instrumentations
Automatically instruments the following libraries:
- http, https

- express

- fs, dns

- grpc
