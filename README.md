# splunk-otel-distribution-sandbox
A sandbox to test Splunk otel distribution

## Prerequisites

Start the Open Telemetry collector with zipkin and jeager as default exporters:

```bash
docker-compose up -d
```

## Scenarios

### Run basic test

Run service:

```bash
> OTEL_SERVICE_NAME='basic-test' node -r @splunk/otel/instrument ./basic-test.js
```

Results:

```bash
curl -X GET http://127.0.0.1:4040/hello
world
```

## Run hapi server test

Run service:

```bash
> OTEL_SERVICE_NAME='hapi-server-test' node -r @splunk/otel/instrument hapi-server-test
```

Results:

```bash
curl -X POST -d @./package.json http://127.0.0.1:4040/hello
world
```

## Run hapi server test with manual bootstrap

Run service:

```bash
> node -r ./manual-boostrap.js hapi-server-test
```

Results:

```bash
curl -X POST -d @./package.json http://127.0.0.1:4040/hello
world
```