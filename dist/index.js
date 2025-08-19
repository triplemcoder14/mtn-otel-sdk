"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTelemetry = initTelemetry;
require("dotenv/config");
const sdk_node_1 = require("@opentelemetry/sdk-node");
const exporter_trace_otlp_http_1 = require("@opentelemetry/exporter-trace-otlp-http");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const api_1 = require("@opentelemetry/api");
function initTelemetry() {
    const serviceName = process.env.OTEL_SERVICE_NAME || 'unnamed-node-service';
    const collectorUrl = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces';
    const logLevel = process.env.OTEL_LOG_LEVEL || 'info';
    api_1.diag.setLogger(new api_1.DiagConsoleLogger(), getLogLevel(logLevel));
    const traceExporter = new exporter_trace_otlp_http_1.OTLPTraceExporter({
        url: collectorUrl,
    });
    const sdk = new sdk_node_1.NodeSDK({
        traceExporter,
        serviceName,
        instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()],
    });
    sdk
        .start()
        .then(() => {
        console.log(`[mtn-otel-sdk] OpenTelemetry initialized for "${serviceName}"`);
    })
        .catch((error) => {
        console.error('[mtn-otel-sdk] Error initializing OpenTelemetry:', error);
    });
    // Graceful shutdown
    process.on('SIGTERM', () => sdk.shutdown());
    process.on('SIGINT', () => sdk.shutdown());
}
function getLogLevel(level) {
    switch (level.toLowerCase()) {
        case 'debug':
            return api_1.DiagLogLevel.DEBUG;
        case 'warn':
            return api_1.DiagLogLevel.WARN;
        case 'error':
            return api_1.DiagLogLevel.ERROR;
        case 'verbose':
            return api_1.DiagLogLevel.VERBOSE;
        default:
            return api_1.DiagLogLevel.INFO;
    }
}
