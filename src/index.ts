import 'dotenv/config';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

export function initTelemetry(): void {
  const serviceName = process.env.OTEL_SERVICE_NAME || 'unnamed-node-service';
  const collectorUrl = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces';
  const logLevel = process.env.OTEL_LOG_LEVEL || 'info';

  diag.setLogger(new DiagConsoleLogger(), getLogLevel(logLevel));

  const traceExporter = new OTLPTraceExporter({
    url: collectorUrl,
  });

  const sdk = new NodeSDK({
    traceExporter,
    serviceName,
    instrumentations: [getNodeAutoInstrumentations()],

  });
  try {
    sdk.start();
    console.log(`[mtn-otel-sdk] OpenTelemetry initialized for "${serviceName}"`);
  } catch (error: unknown) {
    console.error('[mtn-otel-sdk] Error initializing OpenTelemetry:', error);
  }

  // sdk
  //   .start()
  //   .then(() => {
  //     console.log(`[mtn-otel-sdk] OpenTelemetry initialized for "${serviceName}"`);
  //   })
  //   .catch((error) => {
  //     console.error('[mtn-otel-sdk] Error initializing OpenTelemetry:', error);
  //   });

  // gracefully shut down the sdk on process exit
  process.on('SIGTERM', () => sdk.shutdown());
  process.on('SIGINT', () => sdk.shutdown());
}

function getLogLevel(level: string): DiagLogLevel {
  switch (level.toLowerCase()) {
    case 'debug':
      return DiagLogLevel.DEBUG;
    case 'warn':
      return DiagLogLevel.WARN;
    case 'error':
      return DiagLogLevel.ERROR;
    case 'verbose':
      return DiagLogLevel.VERBOSE;
    default:
      return DiagLogLevel.INFO;
  }
}

