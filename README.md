
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
- **Monitoring**: Sentry.io, Google Analytics, Web Vitals

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
   VITE_SENTRY_DSN=your_sentry_dsn
   VITE_GA_MEASUREMENT_ID=your_ga_measurement_id
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
   - `VITE_SENTRY_DSN`
   - `VITE_GA_MEASUREMENT_ID`

4. Deploy!

## Production Monitoring Guide

### Error Monitoring with Sentry

MediCare uses Sentry.io for error tracking and monitoring in production. To access and interpret error data:

1. **Dashboard Access**: Access the Sentry dashboard at [https://sentry.io](https://sentry.io) with your organization credentials
2. **Error Investigation**: When errors occur, Sentry captures:
   - Stack traces with source maps for precise error location
   - User information and session data
   - Browser/device information
   - Custom context provided by our implementation

3. **Alert Configuration**: Set up alert rules in Sentry for immediate notification of:
   - New error types
   - Error frequency thresholds
   - Performance degradation

### Performance Monitoring

The application monitors Web Vitals metrics for performance tracking:

1. **Core Web Vitals**:
   - Largest Contentful Paint (LCP): Loading performance
   - First Input Delay (FID): Interactivity
   - Cumulative Layout Shift (CLS): Visual stability

2. **Additional Metrics**:
   - First Contentful Paint (FCP)
   - Time to First Byte (TTFB)
   - Custom application metrics

3. **Performance Data Access**:
   - Google Analytics: Access through the GA dashboard
   - Sentry Performance: Access through the Sentry dashboard

### User Analytics

Google Analytics is integrated to track user behavior and engagement:

1. **Dashboard Access**: Sign in to [Google Analytics](https://analytics.google.com)
2. **Key Metrics Tracked**:
   - Page views and navigation patterns
   - Feature usage and engagement
   - User retention and session duration
   - Conversion metrics (based on configured goals)

### Security Headers

The application uses strict security headers configured in `vercel.json`:

1. **Content Security Policy (CSP)**: Restricts resource loading to trusted sources
2. **X-Content-Type-Options**: Prevents MIME type sniffing
3. **X-Frame-Options**: Prevents clickjacking attacks
4. **X-XSS-Protection**: Additional XSS protection layer
5. **Referrer Policy**: Controls referrer information leakage
6. **Permissions Policy**: Restricts browser feature usage

### Caching Strategy

Optimized caching is configured based on asset types:

1. **Static Assets**: Long-term caching (1 year) with immutable flag
2. **Images**: 24-hour caching
3. **API Responses**: Managed via React Query with staleTime configuration

### Maintenance Best Practices

1. **Regular Monitoring Checks**:
   - Review Sentry errors daily
   - Check Web Vitals weekly for performance regressions
   - Analyze user analytics monthly for patterns and opportunities

2. **Update Procedures**:
   - When deploying updates, monitor error rates closely for 24 hours
   - Check performance metrics before/after significant changes
   - Create baseline reports to track improvements over time

3. **Security Maintenance**:
   - Review and update CSP headers when adding new resources
   - Regularly test for new security vulnerabilities
   - Update dependencies regularly to patch security issues

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
