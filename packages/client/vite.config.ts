import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import monacoEditorPluginModule from 'vite-plugin-monaco-editor';

const isObjectWithDefaultFunction = (module: unknown): module is { default: typeof monacoEditorPluginModule } => (
  module != null &&
  typeof module === 'object' &&
  'default' in module &&
  typeof module.default === 'function'
)

const monacoEditorPlugin = isObjectWithDefaultFunction(monacoEditorPluginModule)
  ? monacoEditorPluginModule.default
  : monacoEditorPluginModule


export default defineConfig({
  plugins: [react(), monacoEditorPlugin({})],

  resolve: {
    alias: {
      '@src': resolve(__dirname, './src/'),
      '@components': resolve(__dirname, './src/components/'),
      '@interface': resolve(__dirname, './src/interface/'),
      '@css': resolve(__dirname, './src/css/'),
      '@shad': resolve(__dirname, './src/shadcn/'),
    },
  },

  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'api'),
      },
    },
  },
})
