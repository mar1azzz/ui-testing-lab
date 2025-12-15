# DemoQA UI Automation (Playwright)

UI test automation project for https://demoqa.com using Playwright and Page Object Model.
## Local tests run report
<img width="1911" height="970" alt="ui report" src="https://github.com/user-attachments/assets/a694a1e2-354f-4908-833c-fc0c215dc72f" />

<img width="1171" height="892" alt="junit report" src="https://github.com/user-attachments/assets/59f04032-fb5a-4f95-9903-245afe03f12e" />


---

## Tech Stack
- Playwright
- JavaScript (Node.js)
- Faker (test data generation)
- GitHub Actions (CI/CD)

---

## Project Structure

src/pages – Page Object classes
src/data – Test data factories and constants
tests – Test scenarios
.github/workflows – CI configuration

---

## Installation

```bash
npm install
npx playwright install
```

---

## Run Tests

```bash
Run all tests
npm test
```

Run tests in headed mode
```bash
npx playwright test --headed
```

Run tests by keyword (tag)
```bash
npm test -- --grep @runThis
```

Parallel Execution
```bash
set WORKERS=4
npm test
```

Screen Resolution Configuration
1920x1080
```bash
set VIEWPORT_WIDTH=1920
set VIEWPORT_HEIGHT=1080
npm test
```

1366x768
```bash
set VIEWPORT_WIDTH=1366
set VIEWPORT_HEIGHT=768
npm test
```

---

## Reports and Artifacts

Local

HTML report:
```bash
npx playwright show-report
```
CI (GitHub Actions)

Artifacts are available after each run:

- HTML report

- JUnit report

- Screenshots and traces (on failures)

---

## CI/CD

Tests are executed automatically:

- On Pull Requests

- On push to main

- Daily via scheduled run

Browsers:

- Chromium

- Firefox
