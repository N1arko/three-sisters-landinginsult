import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const envBase = process.env.VITE_BASE;
  const base = envBase
    ? (envBase.endsWith("/") ? envBase : envBase + "/")
    : (mode === "production" ? "/three-sisters/" : "/");

  return {
    base,
    plugins: [react()],
    resolve: { alias: { "@": path.resolve(__dirname, "src") } }
  };
});
