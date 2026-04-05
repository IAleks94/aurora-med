import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      env: {
        VITE_EMAILJS_SERVICE_ID: 'test_service',
        VITE_EMAILJS_TEMPLATE_ID: 'test_template',
        VITE_EMAILJS_PUBLIC_KEY: 'test_public_key',
      },
    },
  }),
)
