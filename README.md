# Webhook Ingestion Service

A backend service built with **NestJS**, **TypeScript**, and **MongoDB** for receiving and persisting webhook events in a generic and scalable way.

The application is designed to accept payloads from different providers without requiring a predefined schema for the webhook content, making it flexible enough to support multiple integrations through a single endpoint.

## Features

* Generic webhook ingestion
* Dynamic `source` parameter support
* Flexible payload persistence
* MongoDB integration with Mongoose
* Input validation using `class-validator`
* Global exception handling
* Structured error responses
* Health check endpoint
* Environment-based configuration
* Clean and modular architecture

## Tech Stack

* Node.js
* TypeScript
* NestJS
* MongoDB
* Mongoose
* Docker
* Docker Compose
* class-validator
* class-transformer

## Project Structure

```src/
│
├── common/
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── types/
│   └── utils/
│
├── config/
│   └── env/
│       └── configuration.ts
│
├── database/
│   └── database.module.ts
│
├── modules/
│   ├── health/
│   │   ├── controller/
│   │   │   └── health.controller.ts
│   │   ├── service/
│   │   │   └── health.service.ts
│   │   └── health.module.ts
│   │
│   └── webhook/
│       ├── controller/
│       │   └── webhook.controller.ts
│       ├── dto/
│       │   └── create-webhook.dto.ts
│       ├── enums/
│       ├── repository/
│       │   └── webhook.repository.ts
│       ├── schema/
│       │   └── webhook-event.schema.ts
│       ├── service/
│       │   └── webhook.service.ts
│       ├── types/
│       │   └── create-webhook-event.type.ts
│       └── webhook.module.ts
│
├── app.module.ts
└── main.ts
```

## Architecture

The project follows a layered architecture with clearly separated responsibilities.

### Controller

* Receives HTTP requests
* Validates incoming data
* Delegates business logic to the service layer

### Service

* Encapsulates business rules
* Coordinates application flow
* Delegates persistence operations to the repository

### Repository

* Responsible for database interaction
* Persists webhook events using Mongoose

### Global Exception Filter

* Centralizes exception handling
* Produces standardized error responses
* Logs unexpected failures

## Prerequisites

Before running the project, make sure you have installed:

* Node.js
* npm
* Docker
* Docker Compose

---

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=3000

MONGODB_URI=mongodb://admin:admin@localhost:27017/webhook-events?authSource=admin
```

Alternatively, copy the example file:

```bash
cp .env.example .env
```

and adjust the values according to your local environment.

---

## Installation

Install the project dependencies:

```bash
npm install
```

---

## Running MongoDB with Docker

Start the database using Docker Compose:

```bash
docker compose up -d
```

To stop the containers:

```bash
docker compose down
```

---

## Running the Application

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run build
npm run start:prod
```

The application will be available at:

```text
http://localhost:3000
```

---

## Health Check

Health endpoint:

```http
GET /health
```

Example response:

```json
{
  "status": "ok"
}
```

---

## Configuration Notes

The application uses environment variables for configuration and connects to MongoDB through Mongoose.

Database persistence is handled through a dedicated repository layer, keeping business logic separated from persistence concerns and making the project easier to maintain and extend.

## API

### Receive Webhook

Persists a webhook event received from any external source system.

**Endpoint**

```http
POST /webhooks/:source
```

| Parameter | Type     | Description                        |
| --------- | -------- | ---------------------------------- |
| `source`  | `string` | Identifier of the webhook provider |

### Request Body

Since this service is designed to be generic, the application does **not** enforce a predefined schema for the webhook payload.

The request body must contain a single field: `payload`, which must be a valid JSON object.

Example:

```json
{
  "payload": {
    "event": "example.event",
    ...
  }
}
```

Any valid object can be sent inside `payload` and will be persisted.

---

## Validation

The application validates the incoming request to ensure that:

* `payload` exists in the request body
* `payload` is a valid JSON object

No validation is performed on the internal structure of the `payload`, allowing integration with different webhook providers without requiring schema changes.

---

## Error Handling

The project uses a global exception filter to provide standardized error responses.

Example:

```json
{
  "statusCode": 400,
  "timestamp": "2026-06-10T15:30:00.000Z",
  "path": "/webhooks/github",
  "method": "POST",
  "message": [
    "payload must be an object"
  ]
}
```

Unexpected internal errors are logged while avoiding the exposure of implementation details to API consumers.

---

## Testing

Run unit tests:

```bash
npm run test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Generate coverage report:

```bash
npm run test:cov
```

---

## Design Decisions

Some architectural decisions adopted in this project include:

* Layered architecture (Controller → Service → Repository) to ensure clear separation of concerns
* Generic webhook ingestion model designed to accept events from multiple providers without schema coupling
* Lightweight event structure with minimal enforced fields (`source`, `payload`) to maximize flexibility
* Optional `eventType` extraction to improve observability and enable basic event categorization
* Optional `headers` persistence to support traceability and debugging when provided by the source system
* Separation between business logic and persistence to keep the service maintainable and testable
* Centralized exception handling for consistent API error responses
* Environment-based configuration for deployment flexibility
* Modular project structure to support future scalability and feature expansion

---

## Future Improvements

Potential enhancements include:

* Automated unit tests
* End-to-end test coverage
* Payload size limits
* Authentication and request signature validation
* Idempotency support
* Rate limiting
* Metrics and observability
* Retry and dead-letter queue mechanisms
* Event streaming integration

---

## License

This project is available under the MIT License.
