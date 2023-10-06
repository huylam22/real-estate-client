import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.COOKIE_DOMAIN": JSON.stringify(process.env.COOKIE_DOMAIN),
    "process.env.VITE_AWS_S3_BUCKET_DOMAIN": JSON.stringify(
      process.env.VITE_AWS_S3_BUCKET_DOMAIN
    ),
  },
  server: {
    open: true,
    origin: "http://localhost:8080",
  },
});
