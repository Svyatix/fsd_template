import { defineConfig } from '@rsbuild/core'
import react from '@rsbuild/plugin-react'
import moduleFederation from '@rsbuild/plugin-module-federation'
import path from 'path'

const mfe = moduleFederation({
  name: 'fsdRemote',
  filename: 'remoteEntry.js',
  exposes: {
    './MicroApp': './src/mfe/MicroApp.tsx',
    './MicroRoutes': './src/mfe/MicroRoutes.tsx',
    './StoreProvider': './src/app/providers', // optional: reuse store from host or our provider
  },
  shared: {
    react: { singleton: true, eager: false, requiredVersion: false },
    'react-dom': { singleton: true, eager: false, requiredVersion: false },
    'react-router-dom': { singleton: true, eager: false, requiredVersion: false },
    'react-redux': { singleton: true, eager: false, requiredVersion: false },
    '@reduxjs/toolkit': { singleton: true, eager: false, requiredVersion: false },
    'styled-components': { singleton: true, eager: false, requiredVersion: false },
  }
})

export default defineConfig({
  plugins: [
    react({
      swcPluginOptions: { styledComponents: true } as any
    }),
    mfe
  ],
  source: {
    entry: { index: './src/main.tsx' },
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@shared': path.resolve(__dirname, 'src/shared')
    }
  },
  html: { template: './public/index.html', title: 'FSD Remote (Router + MF)' },
  dev: { port: 5173, open: true }
})