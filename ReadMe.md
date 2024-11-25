```markdown
# Credore E-commerce

Credore E-commerce is a robust e-commerce application built with Node.js, Express, Prisma, PostgreSQL, and Docker. This README provides instructions on how to set up and run the project.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
  - [Docker Setup](#docker-setup)
  - [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [Health Check](#health-check)
- [License](#license)

---

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v20.x)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Setup

### Docker Setup

To start the application using Docker, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/BhagabanGhadai/Credore-ecommerce.git
   cd Credore-ecommerce
   ```

2. Build and run the Docker containers:
   ```bash
   docker-compose build
   docker-compose up -d
   ```

3. Verify the health-check route:  
   Open your browser or use a tool like `curl` to access:
   ```bash
   http://localhost:8080/health-check
   ```

---

### Local Setup

To start the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/BhagabanGhadai/Credore-ecommerce.git
   cd Credore-ecommerce
   ```

2. Configure environment variables:  
   Copy the `.env.sample` file to `.env` and update the variables as needed:
   ```bash
   cp .env.sample .env
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run Prisma migrations:
   ```bash
   npm run migrate:dev
   ```

5. Start the application:
   ```bash
   npm run dev
   ```

6. Verify the health-check route:  
   Open your browser or use a tool like `curl` to access:
   ```bash
   http://localhost:8080/health-check
   ```

---

## Environment Variables

The `.env.sample` file contains the following environment variables:

```plaintext
DATABASE_URL="postgresql://postgres:12asdf34@db:5432/ecommerce?schema=public"
PORT="8080"
JWT_ACCESS_SECRET="OBIEFFDYIODHOIHONWIOWHIOHD"
JWT_REFRESH_SECRET="KOUIGUIIOOLBHJVYUVUIOIOUI"
JWT_ACCESS_EXPIRES="60m"
JWT_REFRESH_EXPIRES="7d"
NODE_ENV="dev"
SALT_ROUND=10
CACHE_EXPIRATION=3600
```

Make sure to update these variables in your `.env` file to match your local setup.

---

## Health Check

To check if the application is running correctly, access the health-check route:

```bash
http://localhost:8080/health-check
```

---
