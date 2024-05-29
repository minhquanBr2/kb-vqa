import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  // // Load app-level env vars to node-level env vars.
  // process.env = {...process.env, ...loadEnv(mode, process.cwd(), "VITE_")};

  return defineConfig({
    plugins: [react()],
  preview: {
    host: true,             // expose the web in public addresses
    port: 8080,             // Use port 8080
  },
  // test: {
  //   global: true,
  //   environment: 'jsdom',
  //   setupFiles: './jest.setup.js',
  // }
  });
};