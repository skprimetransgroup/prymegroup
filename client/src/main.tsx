import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerServiceWorker } from "./utils/pwa";

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for PWA functionality
registerServiceWorker();
