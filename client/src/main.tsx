import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// MirageJS отключен для использования реального API

createRoot(document.getElementById("root")!).render(<App />);
