
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
    
    const root = createRoot(rootElement);
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
renderApp();
