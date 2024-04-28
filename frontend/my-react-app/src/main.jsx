import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap App component with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
