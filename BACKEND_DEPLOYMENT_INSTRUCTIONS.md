# Backend Deployment Instructions

## ⚠️ Important Note
The frontend on GitHub Pages (`https://Girivasanth-pro14.github.io/tribal-health-screening/`) cannot access `localhost:8000`. 

The backend MUST be deployed to a public URL for the prediction feature to work.

## Option 1: Deploy to Railway (Recommended)

### Prerequisites
- Railway account (free tier available): https://railway.app
- Railway CLI: `npm install -g @railway/cli`

### Steps

1. **Login to Railway**
   ```bash
   railway login
   ```

2. **Deploy from GitHub**
   ```bash
   cd tribal-health-screening-backend
   railway init
   ```
   - Select "Create a new project"
   - Select "Deploy from GitHub"

3. **Set up the deployment**
   ```bash
   railway link
   railway up
   ```

4. **Get your backend URL**
   - Go to Railway dashboard
   - Click your project
   - Find the "Deployment" tab
   - Copy the public URL (e.g., `https://tribal-health-prod.up.railway.app`)

### Update Frontend with Backend URL

Once you have the Railway URL:

1. Edit `/tribal-health-screening-backend/server.js` and add your Railway URL to CORS origins
2. Update the built JavaScript in `docs/static/js/main.c35df246.js`:
   ```bash
   sed -i '' 's|http://localhost:8000|https://YOUR-RAILWAY-URL|g' docs/static/js/main.c35df246.js
   ```
3. Commit and push to GitHub
4. GitHub Pages will rebuild and use the public backend URL

## Option 2: Deploy to Heroku

1. Create Heroku app: `heroku create your-app-name`
2. Deploy: `git push heroku main:main`
3. Get URL: `heroku open`
4. Update frontend with Heroku URL

## Option 3: Deploy to Render

1. Connect GitHub repo to Render
2. Create new Web Service
3. Select `tribal-health-screening-backend` as the service root
4. Deploy

## Testing Locally

To test the full application locally:

1. **Start Backend**
   ```bash
   cd tribal-health-screening-backend
   npm start
   ```

2. **Start Frontend (if needed)**
   ```bash
   cd tribal-health-screening
   npm start
   ```

3. **Access Frontend**
   - Go to http://localhost:3000 (local React dev server)
   - Backend will be at http://localhost:8000

## Current Status

- ✅ Backend: Running locally at http://localhost:8000
- ✅ Prediction API: Working (tested with curl)
- ✅ Frontend: Deployed to GitHub Pages at https://Girivasanth-pro14.github.io/tribal-health-screening
- ❌ Prediction on GitHub Pages: Not working (localhost not accessible from GitHub Pages)

## Next Steps

1. Deploy backend to Railway/Heroku/Render
2. Update API endpoint in built files
3. Test prediction feature on GitHub Pages
