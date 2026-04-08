# Client Management Platform

A comprehensive Client Management Platform for Financial Advisors with a Spring Boot backend, Angular frontend, and automated testing framework.

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [API Documentation](#api-documentation)

## Project Overview

This project is a full-stack Client Management System designed for financial advisors to:
- Manage client information and details
- View comprehensive dashboards
- Perform CRUD operations on client records
- Secure authentication and authorization
- Comprehensive automated test coverage

## Architecture

The project follows a three-tier microservices architecture:

```
┌─────────────────────────────────────────┐
│     Frontend (Angular + Material)       │
│          frontend_cms_1/                │
└─────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────┐
│      Backend (Spring Boot + JWT)        │
│          backend_cms_1/                 │
└─────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────┐
│   Database (MySQL/PostgreSQL)           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Automation Tests (Cucumber + Selenium) │
│       automation_cms_1/                 │
└─────────────────────────────────────────┘
```

## Prerequisites

### Global Requirements
- **Java JDK 17+**
- **Maven 3.8+**
- **Node.js 18+ & npm**
- **Git**

### Backend Requirements
- Spring Boot 3.x
- MySQL 8.0+ or PostgreSQL 12+
- JWT (JSON Web Token) library

### Frontend Requirements
- Angular 18+
- Angular Material
- TypeScript 5.x

### Testing Requirements
- Selenium 4.20+
- Cucumber 7.16+
- TestNG 7.10+

## Project Structure

```
cms/
├── backend_cms_1/           # Spring Boot Backend REST API
│   ├── src/main/java/com/advisor/portal/
│   │   ├── controller/      # REST Controllers
│   │   ├── service/         # Business Logic
│   │   ├── repository/      # Data Access Layer
│   │   ├── entity/          # JPA Entities
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── security/        # JWT & Security Config
│   │   └── exception/       # Exception Handling
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── frontend_cms_1/          # Angular Frontend Application
│   ├── src/app/
│   │   ├── services/        # API Services
│   │   ├── components/      # UI Components
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── dashboard/
│   │   │   ├── client-details/
│   │   │   ├── client-form/
│   │   │   └── home/
│   │   ├── guards/          # Route Guards
│   │   ├── interceptors/    # HTTP Interceptors
│   │   └── app.routes.ts    # Route Configuration
│   ├── package.json
│   ├── angular.json
│   └── tsconfig.json
│
└── automation_cms_1/        # Cucumber BDD Test Automation
    ├── src/test/java/com/advisor/automation/
    │   ├── runners/         # Test Runners
    │   ├── steps/           # Step Definitions
    │   ├── pages/           # Page Object Models
    │   └── utils/           # Test Utilities
    ├── src/test/resources/
    │   └── features/        # Gherkin Feature Files
    ├── pom.xml
    └── testng.xml
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/eemanikrishna/ClientManagementPlatform.git
cd ClientManagementPlatform
```

### 2. Backend Setup (Spring Boot)

```bash
cd Backend

# Install dependencies
mvn clean install

# Configure database connection in application.properties
# Edit src/main/resources/application.properties
```

**application.properties example:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cms_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

jwt.secret=your-secret-key-here
jwt.expiration=86400000
```

### 3. Frontend Setup (Angular)

```bash
cd Frontend

# Install dependencies
npm install

# Run the Application
npm start
```

### 4. Test Automation Setup (Cucumber)

```bash
cd AutomationTesting

# Install dependencies
mvn clean install

# Update WebDriver paths if needed
# Configure base URL in properties or config files
```

## Running the Application

### Start Backend Server

```bash
cd Backend
mvn spring-boot:run
```

Backend will be available at: `http://localhost:8080`

### Start Frontend Development Server

```bash
cd Frontend
npm start
```

Frontend will be available at: `http://localhost:4200`

### Access the Application

1. Navigate to `http://localhost:4200`
2. Sign up for a new account or login with existing credentials
3. Navigate through the dashboard and manage clients

## Running Tests

### Run All Tests

```bash
cd Automation
mvn clean test
```

### Generate Test Reports

After running tests, reports are available at:
- **Cucumber HTML Report:** `target/cucumber-reports/cucumber.html`
- **Extent Report:** `target/extent-report/FinancialAdvisorPortal_AutomationReport.html`
- **TestNG Report:** `target/surefire-reports/index.html`

## API Documentation

### Authentication Endpoints

**POST** `/api/auth/signup`
```json
{
  "email": "advisor@example.com",
  "password": "securePassword",
  "name": "John Advisor"
}
```

**POST** `/api/auth/login`
```json
{
  "email": "advisor@example.com",
  "password": "securePassword"
}
```

### Client Endpoints

**GET** `/api/clients` - Get all clients

**GET** `/api/clients/{id}` - Get client details

**POST** `/api/clients` - Create new client
```json
{
  "name": "Client Name",
  "email": "client@example.com",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

**PUT** `/api/clients/{id}` - Update client

**DELETE** `/api/clients/{id}` - Delete client

## Feature Files Overview

### client_management.feature
Tests for client CRUD operations (Create, Read, Update, Delete)

### client_e2e_crud.feature
End-to-end testing scenarios for complete client management workflow

### dashboard.feature
Dashboard functionality and data display tests

## Test Features

The automation framework includes:
- **Page Object Model (POM)** pattern for maintainability
- **Data-driven testing** using Excel
- **Screenshot capture** on test failure
- **Extent Reports** integration
- **Cucumber BDD** for readable test scenarios
- **TestNG** for advanced test execution
