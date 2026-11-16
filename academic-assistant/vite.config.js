import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// MOCKUP: sin proxy hacia ningún backend.
export default defineConfig({
  plugins: [react()],
});
