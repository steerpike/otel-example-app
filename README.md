# Basic observability app

## Overview
This repository showcases a very basic Node.js application that has been auto-instrumented with the OpenTelemetry SDK. It includes a Docker Compose setup that defines a basic OpenTelemetry Collector and a command-line tool `(otel-tui)` for viewing emitted telemetry. The purpose of this setup is to provide developers with a clear pathway to integrating observability into their development lifecycle, allowing them to see traces, logs, and metrics directly from their locally developed apps in a command-line viewer.

## Features
* Auto-instrumented Node.js application using OpenTelemetry SDK.
* OpenTelemetry Collector for receiving and processing telemetry data.
* Command-line tool (otel-tui) for viewing telemetry data.
* Docker Compose setup for easy deployment and configuration.

## Prerequisites
* Docker
* Docker Compose
* Node.js, npm and npx (for running the Node.js application locally)

## Setup and Running

1. Clone the repo
```
git clone <repository-url>
cd <repository-directory>
```
2. Configure Environment Variables
Create a `.env` file in the root of the project and add the following environment variables:
```
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318/v1/traces
SERVICE_NAME=my-service-name
```
Replace my-service-name with the actual name of your service.
3. Build and Run the Docker Containers
Use Docker Compose to build and run the containers:
`docker-compose up -d`
This will start the OpenTelemetry Collector and the `otel-tui` command-line tool.
4. Run the Node.js Application
The node application is *not* included in the docker-compose config specifically to mirror the more consistent pattern within Nine's development teams of running node applications directly rather than within docker configurations.
Install the dependencies and start the Node.js application:
```
npm install
npx ts-node --require ./instrumentation.ts app.ts
```
5. View Telemetry Data
Open a terminal and attach to the `otel-tui` container to view the telemetry data:
`docker attach otel-tui`
Visit `http://localhost:8080/rolldice` in your browser.
You should see traces, logs, and metrics emitted by your Node.js application in the command-line viewer.

## Explanation of Key Files
`instrumentation.ts`
This file sets up the OpenTelemetry SDK for the Node.js application, configuring the OTLP trace exporter and setting the service name from environment variables.

`otel-collector-config.yaml`
This file configures the OpenTelemetry Collector to receive telemetry data over gRPC and HTTP protocols and export it to the otel-tui command-line tool and a debug exporter.

`docker-compose.yml`
This file defines the Docker services for the OpenTelemetry Collector and the otel-tui command-line tool, mapping the necessary ports and volumes.
