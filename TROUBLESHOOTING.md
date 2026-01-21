# Troubleshooting Guide - Prediction Analysis Failed

## ❌ Problem: "Failed to analyze X-ray"

### Root Cause
The frontend on GitHub Pages cannot reach the backend API at `http://localhost:8000` because:
- GitHub Pages runs in the browser on GitHub's servers
- localhost:8000 is only accessible from your local machine
- This creates a network isolation issue

---

## ✅ Solution 1: Deploy Backend to Public Server (Recommended)

### Using Railway (Easiest)

1. **Go to Railway.app**
   - https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "Create New"
   - Select "Deploy from GitHub repo"
   - Choose `tribal-health-screening`

3. **Configure**
   - Set root directory: `tribal-health-screening-backend`
   - Railway will auto-detect Node.js and start the server

4. **Get Your URL**
   - Go to Settings → Domains
   - Copy your Railway URL (e.g., `https://tribal-health-prod.up.railway.app`)

5. **Update Frontend API**
   - Edit `docs/static/js/main.c35df246.js`
   - Replace all `http://localhost:8000` with your Railway URL
   - Commit and push to GitHub

### Using Heroku

```bash
# Install Heroku CLI
brew install heroku

# Login
heroku login

# Create app
heroku create tribal-health-backend

# Set buildpack
heroku buildpacks:set heroku/nodejs --app tribal-health-backend

# Deploy
git push heroku main

# Get URL
heroku open --app tribal-health-backend
```

---

## ✅ Solution 2: Test Locally

If you want to test predictions locally:

### Run Frontend & Backend Locally

**Terminal 1 - Backend:**
```bash
cd tribal-health-screening-backend
npm start
# Runs at http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd tribal-health-screening
npm start
# Runs at http://localhost:3000
```

Access the app at: **http://localhost:3000**

Predictions will work because both are on the same machine!

---

## ✅ Solution 3: Quick Test Without Rebuilding

If you just want to verify the backend works:

```bash
# Test backend health
curl http://localhost:8000/health

# Test prediction
curl -F "file=@/path/to/image.jpg" http://localhost:8000/api/predict | jq .
```

---

## 📋 Current Status

| Component | Location | Status |
|-----------|----------|--------|
| Frontend | https://Girivasanth-pro14.github.io/tribal-health-screening | ✅ Working |
| Backend | http://localhost:8000 | ✅ Working locally |
| Predictions | GitHub Pages | ❌ Can't access localhost |
| Predictions | localhost:3000 | ✅ Would work |
| Predictions | After Railway deploy | ✅ Will work |

---

## 🔍 Checking Your Setup

### Check Backend is Running
```bash
curl http://localhost:8000/health
```
Expected response:
```json
{
  "status": "healthy",
  "models_loaded": true
}
```

### Check Frontend
```bash
curl https://Girivasanth-pro14.github.io/tribal-health-screening/
```
Should return the HTML page (or 200 status)

### Test Prediction Endpoint
```bash
curl -F "file=@/tmp/test_image.png" http://localhost:8000/api/predict
```
Should return diagnosis data like:
```json
{
  "success": true,
  "disease": "PNEUMONIA",
  "confidence": 85.2,
  ...
}
```

---

## 🚀 Recommended Next Steps

1. **Deploy backend to Railway** (5 minutes)
2. **Update frontend API URL** (2 minutes)  
3. **Test predictions on GitHub Pages** (1 minute)

That's it! Your predictions will be live worldwide! 🎉

---

## 📞 Support

**Backend won't start?**
```bash
cd tribal-health-screening-backend
npm install
npm start
```

**Frontend not loading?**
- Clear browser cache
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Check: https://Girivasanth-pro14.github.io/tribal-health-screening

**Still having issues?**
- Check logs: `npm start` in backend folder
- Check browser console: F12 → Console tab
- Verify CORS: Check if origin is in `server.js` CORS list
