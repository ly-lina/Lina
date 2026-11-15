# GitHub Pages

The GitHub Actions workflow builds and publishes this Vite app to:

https://ly-lina.github.io/Lina/

In the repository settings, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. The workflow runs on every push to `main`; its first run may take a few minutes. Check the **Actions** tab if the deployment fails.

For local development, run `npm install` and then `npm run dev`. The Vite development server uses `/`, while production builds use `/Lina/`.
