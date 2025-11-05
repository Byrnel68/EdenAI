# Eden AI — Interactive One-Pager Poster

An interactive React component showcasing Eden AI's unified API platform for accessing multiple AI providers.

## For Team Members — Quick Start

### 1. Clone the Repository

```bash
# Clone from GitLab
git clone https://gitlab.scss.tcd.ie/byrnel68/edenai.git
cd edenai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:3000**

Open [http://localhost:3000](http://localhost:3000) in your browser to view the interactive poster.

### 4. Making Changes

1. Create a new branch for your work:
   ```bash
   git checkout -b your-name/feature-description
   ```

2. Make your changes to the code

3. Test your changes locally (the dev server auto-reloads)

4. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push origin your-name/feature-description
   ```

5. Create a Merge Request on GitLab to merge your changes into `main`

## Project Overview

This project demonstrates an **AI API Integrator** platform that unifies and simplifies access to AI APIs across providers (text, vision, speech). The interactive poster includes:

- Market growth visualization with sourced data points
- Provider comparison cards with flip-to-view insights
- Strategic planning framework
- Integration examples for major AI providers

## Features

- 📊 **Interactive Market Chart**: Hover over data points to see exact values and sources
- 🔄 **Flip Cards**: Click provider cards to view integration insights
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Built with Framer Motion and Tailwind CSS

## Tech Stack

- React
- TypeScript (via JSX)
- Framer Motion (animations)
- Recharts (data visualization)
- Tailwind CSS (styling)
- shadcn/ui components

## Getting Started

### Prerequisites

- **Node.js 18+** (check with `node --version`)
- **npm** (comes with Node.js) or **yarn**

### Installation

```bash
# Install all dependencies
npm install
```

This will install:
- Next.js (React framework)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Recharts (charts)
- shadcn/ui components
- All other required packages

### Development

```bash
# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

**Note:** The server will automatically reload when you save changes to any file!

### Other Useful Commands

```bash
# Build for production
npm run build

# Start production server (after building)
npm start

# Run linting
npm run lint
```

## Project Structure

```
edenai/
├── app/                          # Next.js app directory
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                   # React components
│   └── ui/                      # shadcn/ui components
│       ├── card.tsx
│       ├── badge.tsx
│       ├── switch.tsx
│       └── accordion.tsx
├── lib/                          # Utility functions
│   └── utils.ts
├── eden_ai_interactive_one_pager_poster_sourced.tsx  # Main component
└── package.json                  # Dependencies
```

## Project Team

- James McNamee
- Laurie Byrne
- Fiachra Tobin
- Micheal Buckley
- Ashwine Tirouvaroul
- Natalia Sulatska

## Sources

All market data and insights are sourced from:
- [Precedence Research — AI API Market 2024–2034](https://www.precedenceresearch.com/ai-api-market)
- [Grand View Research — AI API Market to 2030](https://www.grandviewresearch.com/industry-analysis/ai-api-market-report)
- [Eden AI — Open Source Aggregator](https://www.edenai.co/post/open-source-ai-apis-aggregator-by-eden-ai)

## License

Built for demonstration purposes.
