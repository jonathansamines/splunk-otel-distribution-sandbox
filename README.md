# splunk-otel-distribution-sandbox
A sandbox to test Splunk otel distribution

## Prerequisites

Start the Open Telemetry collector with zipkin and jeager as default exporters:

```bash
docker-compose up -d
```

## Scenarios

### Run basic test

```bash
> OTEL_SERVICE_NAME='basic-test' node -r @splunk/otel/instrument ./basic-test.js
ok
```
