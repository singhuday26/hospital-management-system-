
# MediCare - Hospital Management System

A comprehensive healthcare management system built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Patient Management**: Track patient information, medical history, and visits
- **Appointment Scheduling**: Manage doctor appointments and scheduling
- **Doctor Directory**: Comprehensive doctor profiles and availability
- **Dashboard Analytics**: Visual reports on hospital performance metrics
- **Role-based Access Control**: Different permissions for staff and administrators

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query for data fetching
- **Routing**: React Router DOM
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher

### Local Development

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd medicare
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:8080`

### Building for Production

1. Generate a production build
   ```bash
   npm run build
   ```

2. Preview the production build locally
   ```bash
   npm run preview
   ```

### Deployment on Vercel

1. Push your code to a GitHub repository

2. Connect your repository to Vercel

3. Configure the environment variables in the Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

4. Deploy!

## Performance Optimizations

- Code splitting with React.lazy and Suspense
- Memoization of components with React.memo
- Image optimization
- Bundle size optimization

## Browser Compatibility

Tested and optimized for:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

The application is designed to meet WCAG AA accessibility standards, including:
- Proper semantic HTML
- ARIA attributes where needed
- Keyboard navigation
- Color contrast requirements

## License

[MIT](LICENSE)
