import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./index.css";
import { UsersProcessProvider } from "./Context/AllUsers.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <UsersProcessProvider>
        <App />
      </UsersProcessProvider>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
