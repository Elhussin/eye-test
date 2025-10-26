### install gh-pages
bun add gh-pages --dev

"homepage": "https://YOUR_USERNAME.github.io/REPO_NAME",

<!-- 
    // "dev": "vite",
    // "build": "tsc -b && vite build",
    // "lint": "eslint .",
    // "preview": "vite preview" -->


    "scripts": {
  "dev": "bun run vite",
  "build": "vite build",
  "predeploy": "bun run build",
  "deploy": "gh-pages -d dist"
}
