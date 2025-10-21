# Terminology SaaS

A minimal terminology management SaaS skeleton built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## Prerequisites

- Node.js >= 18
- npm or yarn

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── page.tsx           # Landing page (/)
│   ├── dashboard/
│   │   └── page.tsx       # Dashboard page (/dashboard)
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   └── dashboard-nav.tsx  # Dashboard navigation
└── lib/
    └── utils.ts           # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Features

- Landing page with call-to-action
- Dashboard with navigation placeholders
- Responsive design with Tailwind CSS
- shadcn/ui component library
- TypeScript for type safety

## Tech Stack

- **Framework**: Next.js 13.5.1 (App Router)
- **Language**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.3
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.
