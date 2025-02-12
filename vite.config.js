import {resolve} from 'path'
import {defineConfig} from 'vite'

import { copy } from 'vite-plugin-copy';
import glsl from 'vite-plugin-glsl';

const src = resolve(__dirname, 'src')


export default defineConfig({
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true, // Add sourcemap
        rollupOptions: {
            input: {
              main: resolve(src, 'index.html'),
              metal: resolve(src, 'metallicheskaya-konstrukciya/index.html'),
              bania: resolve(src, 'stroitelstvo-bani/index.html'),
              veranda: resolve(src, 'veranda-terrasa/index.html'),
              privacy: resolve(src, 'privacy-policy/index.html'),
        }
        }
    },
    plugins: 
    [
        glsl(),
        copy({
            targets: [
                { src: 'sitemap/sitemap.xml', dest: 'dist' }, // Укажите правильный исходный путь
                { src: 'robot.txt', dest: 'dist' } // Укажите правильный исходный путь
            ],
            hook: 'writeBundle' // копирование после сборки проекта
        })
    ]
});