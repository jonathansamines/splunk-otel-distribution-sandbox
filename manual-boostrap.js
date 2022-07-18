'use strict';

const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { startTracing } = require('@splunk/otel');

startTracing({
    serviceName: 'hapi-server-test',
    tracerConfig: {
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: 'override-hapi-server-test',
            [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
        })
    },
    spanExporterFactory(options) {
        return new OTLPTraceExporter();
    },
    spanProcessorFactory(options) {
        const exporter = options.spanExporterFactory(options);
        return new SimpleSpanProcessor(exporter);
    }
});