import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import './index.css';
import Usersprocessprovider from './Context/AllUsers';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Usersprocessprovider>
      <App />
    </Usersprocessprovider>
  </StrictMode>
);
