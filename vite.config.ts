
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'sonner@2.0.3': 'sonner',
        'react-hook-form@7.55.0': 'react-hook-form',
        'figma:asset/f09504e3babe55c7f6109c2b0c5764f04d3e3de5.png': path.resolve(__dirname, './src/assets/f09504e3babe55c7f6109c2b0c5764f04d3e3de5.png'),
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });