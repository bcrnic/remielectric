import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// GitHub Pages serves public/404.html for deep links, which redirects to
// "/?p=<original path>". Restore that path before the router reads the URL.
const redirectedPath = new URLSearchParams(window.location.search).get("p");
if (redirectedPath) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  window.history.replaceState(null, "", `${base}${redirectedPath}`);
}

createRoot(document.getElementById("root")!).render(<App />);
