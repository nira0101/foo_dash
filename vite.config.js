// vite.config.js
const { resolve } = require('path')

module.exports = {
    base: "./",
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html')
        
      }
    }
  }
}