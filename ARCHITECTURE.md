# Architecture Documentation

## Overview

Terminology is a minimal SaaS skeleton for managing glossaries and terms. This document outlines the architectural principles and design decisions.

## Routing

The application uses Next.js 14 App Router with two routes:

- `/` - Landing page
- `/dashboard` - Dashboard page

**Rules:**
- Only these two routes exist in the current implementation
- No additional routes should be added without updating this document
- All navigation is handled via Next.js `Link` component

## Component Structure

### Principle: Keep Components Small

Components should follow the single responsibility principle:

- Each component has one clear purpose
- Break down complex UI into smaller, reusable pieces
- Maximum 150-200 lines per component (guideline, not strict rule)

### Component Organization

```
components/
├── ui/              # shadcn/ui primitives (Button, Card, Input, Table, etc.)
└── dashboard-nav.tsx # Custom components
```

**Rules:**
- UI primitives live in `components/ui/`
- Custom application components live in `components/`
- Page-specific components can be co-located in `app/[route]/` if not reused

### Loading & Empty States

All data-driven components must handle:

1. **Loading state**: Show skeleton or spinner while fetching
2. **Empty state**: Show helpful message when no data exists
3. **Error state**: Show user-friendly error messages

Example pattern:
```typescript
{isLoading ? (
  <div>Loading...</div>
) : data.length === 0 ? (
  <div>No items yet</div>
) : (
  <DataDisplay data={data} />
)}
```

## Styling

### Tailwind CSS Configuration

- **Spacing system**: 8px base unit (space-2 = 8px, space-4 = 16px, etc.)
- **Container**: Responsive max-width container with horizontal padding
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)

**Rules:**
- Use Tailwind utility classes for styling
- Use `cn()` utility from `lib/utils.ts` for conditional classes
- Avoid inline styles unless absolutely necessary
- Follow 8px spacing system consistently

### Design System

- **Colors**: Slate palette for neutral tones
- **Typography**: System font stack via Next.js Font
- **Components**: shadcn/ui for consistent design language

## Future Feature Placeholders

The dashboard navigation includes placeholders for:

1. **Glossaries**: Manage multiple glossaries
2. **Terms**: Add, edit, and organize terms
3. **Export**: Export glossaries in various formats

**Rules for implementing these features:**
- Each feature should have its own page under `/dashboard/[feature]`
- Shared logic should be extracted to `lib/` utilities
- State management should be added only when needed (Context API or Zustand)
- Data fetching should use React Server Components where possible

## Dependencies

### Core
- Next.js 13.5.1
- React 18.2.0
- TypeScript 5.2.2

### UI & Styling
- Tailwind CSS 3.3.3
- shadcn/ui (Radix UI primitives)
- Lucide React (icons)

### Rules
- No additional dependencies without justification
- Prefer native Web APIs over third-party libraries
- Keep bundle size minimal

## Data Management

### Current State
- No database integration
- No authentication
- No external API calls

### Future Considerations
When adding data persistence:
- Use Supabase for database (already available)
- Implement proper error handling
- Add loading states
- Consider optimistic updates for better UX

## Code Standards

### TypeScript
- Use strict mode
- Define interfaces for all data structures
- Avoid `any` type
- Use type inference where appropriate

### File Naming
- Components: `kebab-case.tsx`
- Pages: Next.js convention (`page.tsx`, `layout.tsx`)
- Utilities: `kebab-case.ts`

### Imports
- Use absolute imports with `@/` prefix
- Group imports: React → Next.js → Third-party → Local

## Testing Strategy (Future)

When adding tests:
- Unit tests for utilities and helpers
- Integration tests for components
- E2E tests for critical user flows
- Use React Testing Library + Jest or Vitest

## Performance Considerations

- Use Next.js Server Components by default
- Add `'use client'` only when needed (hooks, interactivity)
- Optimize images with Next.js `<Image>` component
- Lazy load heavy components with `dynamic()`

## Security (Future)

When adding authentication:
- Use Supabase Auth
- Implement Row Level Security (RLS)
- Validate all user inputs
- Sanitize data before display
- Use environment variables for secrets

## Deployment

The application is ready to deploy to:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

Build command: `npm run build`
Start command: `npm start`

## Changelog

### v0.1.0 - Initial Skeleton
- Landing page with CTA
- Dashboard with navigation placeholders
- shadcn/ui integration
- Responsive layout
- TypeScript setup
