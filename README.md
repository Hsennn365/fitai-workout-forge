# FitAI Workout Forge

FitAI Workout Forge is a React + TypeScript application that generates personalized workout plans using user biometrics. It’s designed for fitness enthusiasts and trainers who want custom routines delivered instantly in a sleek, responsive interface.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Installation](#installation)
   * [Development](#development)
4. [Project Structure](#project-structure)
5. [Contributing](#contributing)
6. [Deployment](#deployment)
7. [FAQ](#faq)
8. [License](#license)

---

## Features

* **Biometric Input**: Collect age, height, weight, and activity level.
* **AI-Driven Plans**: Instantly generate tailored workout routines.
* **Responsive UI**: Works seamlessly on mobile, tablet, and desktop.
* **Light & Dark Mode**: Toggle themes with Tailwind CSS.
* **Persistent Settings**: Store user preferences locally.

## Tech Stack

* **Framework**: React + TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS + shadcn-ui
* **State Management**: React Context (or your choice)

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (Recommended: LTS)
* [npm](https://npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
# Clone the repo
git clone <YOUR_GIT_URL>
cd fitai-workout-forge

# Install dependencies
npm install  # or yarn install
```

### Development

```bash
# Start the dev server
npm run dev  # or yarn dev
```

Open your browser at `http://localhost:5173` (default port) to view the app.

---

## Project Structure

```
├── public/           # Static assets and index.html
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Route-based pages
│   ├── context/      # React Context providers
│   ├── hooks/        # Custom React hooks
│   ├── styles/       # Global styles and Tailwind config
│   ├── utils/        # Helper functions
│   └── main.tsx      # App entry point
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-awesome-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-awesome-feature`
5. Open a Pull Request and describe your changes.

Please follow conventional commits and ensure your code passes linting and formatting.

---

## Deployment

You can deploy to any static host (Netlify, Vercel, GitHub Pages). For example, with Vercel:

```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy
vercel
```

---

## FAQ

**Q**: How do I change the primary theme colors?
**A**: Edit `tailwind.config.ts` under `theme.extend.colors` and restart the dev server.

**Q**: Where are user settings stored?
**A**: In `localStorage` under the key `fitai-settings`.

---

## License

Released under the MIT License. See [LICENSE](LICENSE) for details.
