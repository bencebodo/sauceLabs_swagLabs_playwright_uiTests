# 🎭 SauceLabs E2E Automation Framework

This is a professional **Playwright (TypeScript)** based end-to-end automation portfolio project. It uses the [SauceDemo](https://www.saucedemo.com/) website as a test environment to demonstrate a scalable, maintainable, and industry-standard automation architecture.

## Key Features

* **Service-Oriented Architecture:** Pure Page Objects are decoupled from the test logic by a Service Layer, which coordinates business flows (e.g., the checkout process).
* **Web-First Assertions:** The project eliminates "flaky" tests by relying on Playwright's automatic waiting mechanisms and asynchronous assertions instead of static logic checks.
* **Dockerized CI/CD:** Full Jenkins pipeline integration running within the official Playwright Docker container for environment consistency.
* **Advanced Reporting:** Support for both the built-in Playwright HTML report and comprehensive **Allure Reports**.

## Project Structure

The project follows a strict **Separation of Concerns** (SoC) principle:

```yaml
src/
  ├── components/    # Reusable UI elements (e.g., ProductComponent)
  ├── domain/models/ # Interfaces and type definitions (Domain Models)
  ├── pages/         # Atomic Page Objects (Locators and basic actions only)
  ├── services/      # Business logic and coordination of complex flows
  ├── tests/         
  │   ├── fixtures/  # Custom Playwright Fixtures (Dependency Injection)
  │   └── *.spec.ts  # Actual test cases
  └── utils/         # Helper functions (e.g., numeric-utils for price parsing)
```
## Technology Stack
Framework: Playwright v1.58.2

Language: TypeScript

CI/CD: Jenkins (Pipeline-as-Code)

Reporting: Allure Report & Playwright HTML

Infrastructure: Docker (Ubuntu Jammy based image)

## CI/CD Pipeline (Jenkins)
The project includes a Jenkinsfile that automates the following steps:

Environment Setup: Spin up the official mcr.microsoft.com/playwright:v1.58.2-jammy Docker container.

Deterministic Install: Use npm ci to ensure 100% reproducible dependency installation.

GitHub Integration: Real-time status updates (PENDING/SUCCESS/FAILURE) sent back to GitHub commits.

Artifact Management: Automatic archiving of videos, trace files, and Allure results upon failure.

## Local Execution
Install dependencies:

```bash
npm ci
```
Run tests (Headless mode):

```bash
npx playwright test
```
Generate and open Allure Report:

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```
Author: 
Bence Bodo | Automation QA 