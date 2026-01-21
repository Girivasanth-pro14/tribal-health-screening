# Deploy React App to GitHub Pages

## Quick Setup (3 Steps)

### Step 1: Update package.json
Your `tribal-health-screening/package.json` already has been updated with:
```json
"homepage": "https://Girivasanth-pro14.github.io/tribal-health-screening",
"scripts": {
  "deploy": "npm run build && gh-pages -d build"
}
```

### Step 2: Install gh-pages locally
```bash
cd /Users/girivasanth/Documents/ezyZip/tribal-health-screening
npm install --save-dev gh-pages
git add package.json package-lock.json
git commit -m "Add gh-pages dependency"
git push origin main
```

### Step 3: Deploy
```bash
npm run deploy
```

This will:
1. Build your React app
2. Push the `build/` folder to GitHub's `gh-pages` branch
3. GitHub automatically serves it at: https://Girivasanth-pro14.github.io/tribal-health-screening

## Manual GitHub Pages Setup (Alternative)

If you prefer manual deployment:

1. Go to: https://github.com/Girivasanth-pro14/tribal-health-screening/settings/pages
2. Under "Source":
   - Branch: select `main`
   - Folder: select `tribal-health-screening/build`
3. Click "Save"
4. Build locally: `cd tribal-health-screening && npm run build`
5. Deploy: `gh-pages -d build`

## Verify Deployment
Your site will be available at:
👉 https://Girivasanth-pro14.github.io/tribal-health-screening

(May take 2-3 minutes on first deployment)

## Important Notes
- Make sure your backend API is running before testing the app
- The frontend will call your backend at the configured API URL
- For production, you'll need to update `REACT_APP_API_URL` environment variable
