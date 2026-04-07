# MoroSystems Assessment — Playwright Test Suite

## Prerequisites

- **Node.js** v22+
- **Google Chrome** installed (used by Chromium projects)
- **[todo-be](https://github.com/morosystems/todo-be)** checked out locally at `../todo-be` (required for API tests only)

## Setup

```bash
npm install
npx playwright install
```

## Running UI Tests

```bash
# Chromium desktop (headed, keeps browser open on failure)
npm run test:careers:headed

# Chromium desktop (headless)
npm run test:chromium

# Firefox desktop (will fail because of google engine, described in https://github.com/DariaBor/-MoroSystems_assessment/blob/undefined/playwright.config.ts#L22-L23)
npm run test:firefox

# Safari desktop (will fail because of google engine, described in https://github.com/DariaBor/-MoroSystems_assessment/blob/undefined/playwright.config.ts#L22-L23)
npm run test:safari
```

## Running API Tests

Start the todo-be server first:

```bash
cd ../todo-be && npm install && npm start
```

Then in this repo:

```bash
npm run test:api
```

To regenerate the API schema after backend changes:

```bash
npm run generate:api
```

## Reports

```bash
npm run report
```
