import glsl from 'vite-plugin-glsl'

export default {
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
                main: 'index.html',
                metal: 'metallicheskaya-konstrukciya.html',
                bania: 'sroitelstvo-bani.html',
                veranda: 'veranda-terrasa.html',
                privacy: 'privacy-policy.html',
            }
        }
    },
    plugins: 
    [
        glsl()
    ]
}