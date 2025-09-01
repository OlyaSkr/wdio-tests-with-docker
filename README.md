# 🧪 WDIO Tests with Docker and Allure Reporting

This repository contains automated UI tests using **WebdriverIO**, executed inside **Docker** containers. It uses **Allure** for test reporting and **GitHub Actions** for Continuous Integration.

---

## 📁 Project Structure

```bash
├── config/ # WebdriverIO browser configurations
├── data/ # Test data in JSON format
├── specs/ # Test specifications
├── test/
│ └── pageobjects/ # Page Object files
├── package.json # Project dependencies and scripts

```

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/OlyaSkr/wdio-tests-with-docker.git
cd wdio-tests-with-docker
```

## 🧪 Run Tests

### Run tests in Docker (Chrome and Firefox browsers)

```bash
docker-compose up --build
```

Tests will run automatically, and results will be saved in allure-results.

### Running tests locally

To run tests without Docker, install dependencies and use npm scripts:

```bash
npm install
npm run test:all
```

### Running tests in specific browsers

package.json includes scripts to run tests in specific browsers:

```bash
| Command                         | Description                        |
| ------------------------------- | ---------------------------------- |
| `npm run test:chrome`           | Run tests in Chrome                |
| `npm run test:chrome:headless`  | Run tests in Chrome headless mode  |
| `npm run test:firefox`          | Run tests in Firefox               |
| `npm run test:firefox:headless` | Run tests in Firefox headless mode |
| `npm run test:edge`             | Run tests in Microsoft Edge        |
| `npm run test:edge:headless`    | Run tests in Edge headless mode    |

```

## 📊 Generating Allure Report Locally

To generate and view the test report locally:

```bash
npm run allure:report:generate
npm run allure:open
```

- Report is generated in the allure-report directory and opens in your default browser.

## 🐳 Docker commands

- Start Docker containers (tests + Selenium Grid):

```bash
npm run docker:up
```

- Stop Docker containers:

```bash
npm run docker:down
```

- Run tests inside Docker:

```bash
npm run test:docker
```

- Rebuild Docker images and run tests:

```bash
npm run test:docker:build
```

## ⚙️ GitHub Actions Workflow

The CI pipeline is defined in .github/workflows/wdio-docker-tests.yml.

It includes the following steps:

- ✅ Checkout source code

- ⚙️ Setup Node.js environment

- 📦 Install dependencies

- 🐳 Run Docker containers

- 🧪 Execute tests (with error tolerance)

- 📈 Generate Allure report

- 📤 Upload report as artifact

## 📦 Dependencies

- WebdriverIO

- Allure Reporter

- Docker

- GitHub Actions

## 📬 Notes

- Make sure Docker is installed and running, and you have permissions to run containers.

- For local runs without Docker, ensure Node.js is installed.

- If you encounter permission issues deleting or creating the allure-results or allure-report folders, check that no processes are locking these folders.
