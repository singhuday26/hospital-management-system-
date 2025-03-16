
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Simple error boundary for the entire app
const renderApp = () => {
  try {
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      console.error("Root element not found");
      return;
    }
    
    // Clear the loading indicator
    rootElement.innerHTML = '';
    
    const root = createRoot(rootElement);
    
    // Use requestIdleCallback for non-critical initialization
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Initialize non-critical app features
        // This can include analytics, monitoring, etc.
        console.log("Non-critical features initialized");
      });
    }
    
    root.render(<App />);
    console.log("App rendered successfully");
  } catch (error) {
    console.error("Failed to render app:", error);
    // Display a fallback error message in the DOM
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif;">
          <h2>Something went wrong</h2>
          <p>The application failed to load. Please try refreshing the page.</p>
          <p style="color: #666; margin-top: 10px;">Error: ${error instanceof Error ? error.message : String(error)}</p>
        </div>
      `;
    }
  }
};

// Execute app rendering
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
