# Event Management Application

This project is a Fullstack Event Management application developed using Java with Spring Boot for the backend and React with Next.js and Material UI for the frontend. The application allows users to create, read, update, and delete events, with full CRUD functionality.

## Table of Contents

- [Event Management Application](#event-management-application)
  - [Table of Contents](#table-of-contents)
  - [Backend](#backend)
    - [Endpoints](#endpoints)
    - [Technologies Used](#technologies-used)
    - [Validation \& Error Handling](#validation--error-handling)
  - [Frontend](#frontend)
    - [Features](#features)
    - [Technologies Used](#technologies-used-1)
  - [Database](#database)
  - [Running the Application](#running-the-application)
    - [Backend](#backend-1)
      - [Java](#java)
      - [PostgreSQL](#postgresql)
    - [Frontend](#frontend-1)
  - [Technical Decisions](#technical-decisions)

## Backend

The backend is built with **Spring Boot** and uses **JPA** for object-relational mapping. The backend exposes RESTful API endpoints to perform CRUD operations on events.

### Endpoints

- **POST** `/events` - Create a new event
- **GET** `/events` - Retrieve all events
- **GET** `/events/{id}` - Retrieve a specific event by ID
- **PUT** `/events/{id}` - Update an existing event
- **DELETE** `/events/{id}` - Delete an event

### Technologies Used

- **Spring Boot**: RESTful API development
- **JPA (Java Persistence API)**: ORM for database interaction
- **Lombok**: Reduces boilerplate code (e.g., getters, setters, constructors)
- **Flyway**: Database migration tool for version control
- **Spring Web**: Provides HTTP-based services for the REST API

### Validation & Error Handling

- The application validates that `endDate` is not earlier than `startDate`.
- The application returns proper HTTP responses, such as **400 Bad Request** for invalid data.

## Frontend

The frontend is built using **React** with **Next.js** for server-side rendering and routing, combined with **Material UI** for styling.

### Features

- Users can create, view, edit, and delete events.
- Event details include: title, start date, end date, price, and status.
- The application uses React Hooks for state management.

### Technologies Used

- **React**: Frontend framework for building UI components
- **Next.js**: Server-side rendering for improved performance and SEO
- **Material UI**: Component library for consistent UI styling
- **React Hooks**: Managing component state and side effects

## Database

- **PostgreSQL**: Chosen for its reliability and compatibility with JPA/Hibernate, and it supports SQL operations efficiently. It is particularly well-suited for strongly-typed languages like Java, as it integrates smoothly with JPA/Hibernate and ensures type safety and consistency across data operations.
- **Flyway**: Used for managing database migrations.

## Running the Application

### Backend

#### Java

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Navigate to the backend directory and build the application:

   ```bash
   mvn clean install
   ```

3. Clone the repository:
   ```bash
   mvn spring-boot:run
   ```

#### PostgreSQL

1. Install PostgreSQL (if not already installed):
   - Follow the installation guide for your operating system.
2. Create a Database:
   - After installing PostgreSQL, create a database for the application:

```bash
psql -U postgres
CREATE DATABASE event_management;
```

3. Configure the application.properties:
   - Update the database connection details in the src/main/resources/application.properties file:

```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/event_management
spring.datasource.username=postgres
spring.datasource.password=<your_password>
spring.jpa.hibernate.ddl-auto=update
spring.flyway.enabled=true
```

4. Run the Spring Boot application again to apply database migrations and start the service:

```bash
mvnw spring-boot:run
```

The application will automatically create the necessary tables in the PostgreSQL database using Flyway migrations.

### Frontend

1. Navigate to the frontend directory:

   ```bash
    cd frontend
   ```

2. Install the necessary dependencies:

   ```bash
    pnpm install
   ```

3. Run the Next.js application:
   ```bash
    pnpm run dev
   ```

## Technical Decisions

- **Database**: PostgreSQL was chosen for its reliability, compatibility with JPA/Hibernate, and its efficient support for SQL operations. It is particularly well-suited for strongly-typed languages like Java, as it integrates smoothly with JPA/Hibernate and ensures type safety and consistency across data operations.
- **Styling**: Material UI was used for its comprehensive and customizable component library, which fits well with modern frontend development.
- **Flyway**: Used for database migration management to handle schema changes effectively and ensure consistent database state across environments.
