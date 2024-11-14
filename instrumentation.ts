/*instrumentation.ts*/
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { Resource } from '@opentelemetry/resources';
import * as dotenv from 'dotenv';

const { ATTR_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');

dotenv.config();

const otlpEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces';
const serviceName = process.env.SERVICE_NAME || 'unknown-service';


diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);
const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: otlpEndpoint, // Pointing to the OpenTelemetry Collector
  }),
  instrumentations: [getNodeAutoInstrumentations()],
  resource: new Resource({
    [ATTR_SERVICE_NAME]: serviceName, // Replace with your service name
  }),
});

sdk.start();
