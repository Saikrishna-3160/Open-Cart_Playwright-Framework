# 🎭 OpenCart Playright Automation Framework

A scalable **UI & API test automation framework** built using **Playwright, JavaScript, and TypeScript** for the OpenCart application.

This framework follows modern automation best practices including **Page Object Model (POM)**, **fixtures-based authentication**, **multi-environment execution**, and **GitHub Actions CI/CD reporting**.

---

## 🚀 Key Features

✅ Playwright UI automation with Type safety (TypeScript)
✅ Multi-environment execution (Dev, QA, Stage, Prod)
✅ Cross-browser testing
✅ Page Object Model (POM) architecture
✅ Reusable fixtures for user authentication
✅ API testing with multiple authentication strategies
✅ Allure & Playright HTML reports
✅ GitHub Actions CI/CD integration
✅ GitHub Pages report publishing

---

## 🏗️ Framework Architecture

```
.
├── .github/workflows     → CI/CD pipelines
├── data                  → Test data & payloads
├── fixtures              → Reusable login & test fixtures
├── pages                 → Page Object Models
├── schemas               → API schemas & validations
├── tests                 → UI & API test cases
├── utils                 → Utilities & helpers
├── playwright.config.*   → Environment specific configs
└── package.json
```

---

## 🌍 Environment Configuration

This framework supports multiple environments:

* **dev**
* **qa**
* **stage**
* **prod**

Each environment has its own configuration:

```
playwright.config.dev.ts
playwright.config.qa.ts
playwright.config.stage.ts
playwright.config.prod.ts
```

### ▶ Run tests for a specific environment

```bash
npx playwright test --config=playwright.config.qa.ts
```

---

## 🌐 Browser Support

Run tests across:

* Chromium
* Google Chrome
* Microsoft Edge
* Firefox
* WebKit

Example:

```bash
npx playwright test --project="Google Chrome"
```

---

## 🔐 Fixtures & Authentication

Reusable fixtures enable login for different user roles.

### Example Usage

```ts
test('User dashboard', async ({ loggedInUser }) => {
  await loggedInUser.openDashboard();
});
```

Benefits:

✔ Eliminates repeated login steps
✔ Faster test execution
✔ Clean test design

---

## 🔌 API Testing

API validations are implemented using Playwright’s request context.

### Supported Authentication Types

✔ Bearer Token
✔ OAuth
✔ OAuth 2.0

### Example

```ts
const response = await request.get('/api/orders', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
expect(response.ok()).toBeTruthy();
```

---

## 🧪 Running Tests

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install
```

### Run all tests

```bash
npx playwright test
```

### Run environment specific tests

```bash
npx playwright test --config=playwright.config.qa.ts
```

### Run in headed mode

```bash
npx playwright test --headed
```

---

## 📊 Test Reports

### Playwright HTML Report

```bash
npx playwright show-report
```

### Allure Report

```bash
allure generate allure-results --clean -o allure-report
allure open allure-report
```

---

## ⚙️ CI/CD Integration

GitHub Actions pipeline supports:

✅ Manual environment & browser selection
✅ Cached Playwright browsers
✅ Artifact storage (reports, screenshots, videos)
✅ Allure report generation
✅ GitHub Pages report hosting

### Trigger Workflow

Go to:

**Actions → Playwright Manual Run → Run workflow**

Select:

* Environment
* Browser

---

## 🌐 GitHub Pages Reports

After workflow execution:

```
https://<username>.github.io/<repo-name>/
```

Example:

```
https://saikrishna-3160.github.io/Open-Cart_Playwright-Framework/
```

---

## 🧩 Design Patterns Used

✔ Page Object Model (POM)
✔ Fixture-based dependency injection
✔ Environment-driven configuration
✔ Reusable utilities & helpers
✔ API schema validation

---

## 📈 Future Enhancements

* Parallel execution optimization
* Visual regression testing
* Docker container execution
* Performance testing integration
* Slack/Teams notifications

---

## 👤 Author

**Sai Krishna**

Automation Test Engineer focused on building scalable and maintainable test frameworks.

---

## ⭐ If you find this useful

Give this repository a ⭐ to support the project!

---
