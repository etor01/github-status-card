# GitHub Status Card

A lightweight embeddable status card that reflects a developer's **daily GitHub activity** based on commit volume. The card can be integrated into any frontend project (portfolio sites, developer dashboards, personal websites) to give a real-time signal of whether the developer is likely **available, busy, or deep in work**.

The package works by querying the GitHub API for commits authored by a specific user within the current day and mapping that activity to a simple presence indicator.

---

# Overview

Many developers want a simple way to communicate their current **availability or focus level** without manually updating a status message.

This package provides an automated approach:

- It reads commit activity from GitHub.
- It calculates the number of commits made within the current day.
- It derives a status indicator from that activity.
- It renders a compact UI card that can be embedded anywhere in a frontend application.

The result is a dynamic activity badge that updates based on the developer's coding activity.

---

# Status Logic

The status is derived from the number of commits authored by the user during the current day.

| Commits Today | Status | Meaning |
|---|---|---|
| 0 – 5 | Available | Developer likely has capacity to respond |
| 6 – 19 | Late to Reply | Developer is actively working |
| 20+ | Not Available | Developer is in deep work mode |

These thresholds will be configurable in future versions.

---

# Example

```tsx
import { StatusCard } from "github-status-card";

function Portfolio() {
  return (
    <StatusCard
      username="yourGithubUsername"
      repos={[
        "yourname/portfolio",
        "yourname/backend-api",
        "yourname/project-x"
      ]}
    />
  );
}
```

**Example display:**

```bash

@username
Available

Commits today: 3
Date: 2026-03-09

```

the colored indicator reflects the computed avalability state

---

## Features

- Lightweight embeddable UI card
- GitHub commit activity tracking
- Daily availability inference
- React component interface
- TypeScript support with generated typings
- Works with multiple repositories
- Supports authenticated and unauthenticated GitHub API usage
  
---

## Installation

```bash
npm install github-status-card
```

or 

```bash
yarn add github-status-card
```

---

## Basic Usage

```ts
import { StatusCard } from "github-status-card"; //import the StatusCard component into your app screen or page

export default function App() {
  return (
    //add it to your app like this, replace the username/github repos with your own
    <StatusCard
      username="torname"
      repos={[
        "torname/portfolio",
        "torname/api",
        "torname/recipe-app"
      ]}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|--- | --- | --- | --- |
| username | string | **yes** | GitHub username whose commits will be tracked |
| repos | string [ ] | **yes** | List of repositories in owner/repo format |
| token | string | no | GitHub personal access token |
| date | string | no | Specific date in YYYY-MM-DD format |
| className | string | no | Custom CSS class for styling |

---

## Repository Format

`Repositories must be provided using the format: `

```bash
owner/repository 
#github.com/yourname/repo-name
```

## How it works

The package performs the following sequence:

1. Determine the UTC start and end time of the current day.
2. Query the GitHub commits API for each provided repository.
3. Filter commits authored by the specified user.
4. Count commits across all repositories.
5. Convert the count into a status indicator.
6. Render the UI card.
Internally it uses asynchronous requests to the GitHub REST API.

## Architecture

The library seperate the logic and presentation.

```bash
src
│
├── core
│   ├── github.ts
│   ├── status.ts
│   ├── types.ts
│   └── utils.ts
│
├── react
│   └── StatusCard.tsx
│
└── index.ts
```

### Core Layer

Handles:

- GitHub API calls
- commit aggregation
- status derivation

### UI Layer

Handles:

- rendering
- loading states
- status indicator
- styling

---

## Styling

`The component ships with a minimal  default style. You can override styles using custom classes. Example below;`

```tsx
<StatusCard
  username="username"
  repos={["username/project"]}
  className="my-custom-card" //your own custom classes here
/>
```

## Rate Limits

Github imposes strict API rate limits.
Unautheticated requests:
` 60 requests per hour per IP `
Authenticated requests:
`5000 requests per hour`
If your app receives significant traffic, you should use a GitHub personal access token.
Example;

```tsx
<StatusCard
  username="username"
  repos={["username/project"]}
  token={process.env.NEXT_PUBLIC_GITHUB_TOKEN}
/>
```

## Security Note

Avoid exposing private GitHub tokens in client-side code. Place your tokens in your `.env` files and ensure you dont push it to github either.

---

### Limitations

`Commits Must Meet GitHub Contribution Criteria`

**GitHub may not count certain commits as contributions if:**

- they are made in forks
- they use an unlinked email
- they are not in the repository’s default branch
- they are not in the gh-pages branch

#### Private Contributions

Private commits are not visible without authenticated access.

#### Contribution Delay

GitHub contribution data may take time to appear.
Recent commits may not immediately appear in activity results.

---
### Development

This is an Open Source project, you can clone and modify it for your own need. 
How to clone the repository;

```bash
git clone https://github.com/yourname/github-status-card
cd github-status-card
```

Install dependencies:

```bash
npm install
```

Build the package:

```bash
npm run build
```

Development watch mode:

```bash
npm run dev
```

#### Project Scripts

- build : Build the package
- dev :  Watch mode for the development

## Future Improvements

Future version of this library should include;

- theme customization
- non-React adapters
- server helpers for Next.js
- commit history visualization
- GitHub GraphQL support
- additional activity metrics (PRs, issues, reviews)
- configurable thresholds

## Contributing

Contributions are welcome.
To contribute:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

**Please ensure code is properly typed and documented.**

### License

MIT License

### Summary

GitHub Status Card provides a simple automated way to communicate developer availability based on GitHub activity.

Instead of manually updating status messages, the card derives a presence indicator directly from commit activity and exposes it through a clean embeddable UI component