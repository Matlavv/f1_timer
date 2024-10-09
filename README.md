# F1 Timer Project

## Description

This project is a full-stack application for managing F1 race timings. It includes a Node.js API, a MongoDB database, and a Next.js frontend.

## Project Structure

- **API**: Node.js with TypeScript running on port `3001`
- **Database**: MongoDB running in a Docker container on port `27017`
- **Frontend**: Next.js running on port `3000`

## Getting Started

### Prerequisites

- Docker
- Node.js
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:Matlavv/MDS_API_timer.git
   cd f1_timer
   ```

2. **Start the project**

   ```bash
   docker compose up --build
   ```

## API Documentation

### Using the API in Bruno

To test the API using Bruno, follow these steps:

1. **Import the API folder:**

   - Open Bruno.
   - Click on the "Import" button.
   - Select the `F1_TIMER_API` folder from your project directory.

2. **Run the API requests:**

   - Ensure the API server is running by executing `docker compose up --build`.
   - In Bruno, navigate to the imported `F1_TIMER_API` collection.
   - Select the desired endpoint and click "Send" to test the API.

The API documentation is available via Swagger at:
[http://localhost:3001/api-docs/](http://localhost:3001/api-docs/)
