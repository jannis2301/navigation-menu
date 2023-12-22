import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
    },
  },
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
      reporter: ['clover', 'html'],
      reportsDirectory: 'target/clover',
    },
    reporters: ['junit', 'default'],
    outputFile: './target/surefire-reports/junit.xml',
  },
  plugins: [
    dts({
      include: './src',
      outDir: './dist/types',
    }),
  ],
});
