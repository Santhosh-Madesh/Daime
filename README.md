# Daime

Daime is a backend project built as a modern Node.js API for a cinema and theatre management system. The project is currently under construction, but it is being developed with a strong emphasis on clean architecture, maintainability, and test-driven development.

## Overview

This repository is designed to showcase a professional software engineering approach rather than just a simple CRUD application. The goal is to build a scalable backend that separates business rules from infrastructure concerns, making the codebase easier to evolve, test, and extend.

## What the project is doing

Daime is structured around core domain concepts such as:

- Users and authentication
- Cities
- Theatres
- Screens
- Movies
- Shows
and more entities to be implemented

The API is being developed to support the management of these entities in a modular and organized way.

## Architecture approach

The project follows a Clean Architecture-inspired structure with clear separation of responsibilities:

- Domain layer
  - Entities such as the core business objects
  - Use cases that contain the application rules

- Adapter layer
  - Controllers for handling requests
  - Routes for mapping HTTP endpoints

- Frameworks and infrastructure layer
  - Express for the server
  - Mongoose for MongoDB integration
  - JWT and bcrypt for authentication and security

This separation helps keep the business logic independent from external frameworks and makes the code easier to maintain and test.

## Testing philosophy

The project also follows a Test-Driven Development mindset.

- Unit tests are organized by domain area under the tests folder
- Jest is used as the test framework
- Use cases are written and validated with focused tests to improve reliability

This approach reflects a professional engineering standard and demonstrates commitment to quality, regression prevention, and long-term maintainability.

## Tech stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Jest for testing

## Project structure

- adapters: HTTP controllers and route adapters
- domain: entities, repositories, and use cases
- frameworks: concrete implementations for express, persistence, auth, and middleware
- tests: domain-focused test suites

## Current status

⚠️ This project is still under construction.

Some core modules and flows are already implemented, and the foundation for the architecture and testing strategy is in place. However, the project is not yet complete and should be considered a work in progress rather than a production-ready solution.

## Getting started

Install dependencies:

```bash
npm install
```

Run the tests:

```bash
npm test
```

Start the development server:

```bash
npm run dev
```

## Notes

This repository is intended to reflect strong software design habits and a portfolio-ready backend structure. The combination of Clean Architecture, modular domain design, and TDD makes it a solid example of disciplined development practice.
