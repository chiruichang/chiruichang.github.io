# Chirui Chang — Academic Homepage

Source for [chiruichang.github.io](https://chiruichang.github.io/), the academic homepage of Chirui Chang.

## Local preview

```bash
pnpm install
pnpm run dev
```

## Production build

```bash
pnpm install --frozen-lockfile
pnpm run build
pnpm run preview
```

## Deployment

The workflow in `.github/workflows/deploy.yml` builds and deploys the site to GitHub Pages whenever `main` is updated.
