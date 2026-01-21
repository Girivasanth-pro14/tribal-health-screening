# 🚂 RAILWAY DEPLOYMENT GUIDE - STEP BY STEP

## ✅ Quick Deploy (5 Minutes)

### Step 1: Go to Railway
Open: https://railway.app

### Step 2: Sign Up (or Login)
- Click "Sign Up"
- Click "GitHub"
- Authorize Railway
- Done!

### Step 3: Create New Project
- Click "Create New"
- Select "Deploy from GitHub repo"

### Step 4: Choose Repository
- Search: `tribal-health-screening`
- Select: `Girivasanth-pro14/tribal-health-screening`
- Authorize if asked

### Step 5: Configure Deployment
- **Root Directory:** `tribal-health-screening-backend`
- **Auto-Deploy:** ON (recommended)
- Click "Create"

### Step 6: Wait for Deployment
- Railway deploys automatically (~2-5 minutes)
- You'll see logs updating in real-time
- Wait for "Deployment successful" message

### Step 7: Get Your URL
- Click on your deployment
- Go to Settings → Domains
- Copy the URL (e.g., `https://tribal-health-prod.up.railway.app`)

### Step 8: Test It Works
```bash
# Copy/paste this command:
curl https://YOUR-RAILWAY-URL/health
```

Expected response:
```json
{"status": "healthy", "models_loaded": true}
```

### Step 9: Update Frontend
**Important:** Now tell the frontend where the backend is!

#### Option A: Edit Online in GitHub
1. Go to: https://github.com/Girivasanth-pro14/tribal-health-screening
2. Navigate to: `docs/static/js/main.c35df246.js`
3. Click edit (pencil icon)
4. Find: `http://localhost:8000`
5. Replace with: `https://YOUR-RAILWAY-URL`
6. Commit changes
7. GitHub Pages auto-updates (~1 minute)

#### Option B: Edit Locally
```bash
cd tribal-health-screening
# Replace localhost:8000 with your Railway URL in the main.c35df246.js file
sed -i '' 's|http://localhost:8000|https://YOUR-RAILWAY-URL|g' docs/static/js/main.c35df246.js

# Commit and push
git add docs/static/js/main.c35df246.js
git commit -m "Update API endpoint to Railway"
git push origin main
```

### Step 10: Test Predictions!
1. Go to: https://Girivasanth-pro14.github.io/tribal-health-screening/
2. Click "Doctor Dashboard"
3. Upload a medical image
4. Click "Analyze"
5. Should see prediction! 🎉

---

## 📋 VERIFICATION CHECKLIST

- [ ] Railway account created
- [ ] Project deployed to Railway
- [ ] Railway URL obtained
- [ ] Backend health check passes
- [ ] Frontend API URL updated in code
- [ ] Changes pushed to GitHub
- [ ] GitHub Pages reloaded
- [ ] Predictions working on GitHub Pages
- [ ] Error messages display correctly

---

## 🔗 YOUR URLS AFTER DEPLOYMENT

| Component | URL |
|-----------|-----|
| Frontend | https://Girivasanth-pro14.github.io/tribal-health-screening/ |
| Backend | https://YOUR-RAILWAY-URL |
| GitHub Repo | https://github.com/Girivasanth-pro14/tribal-health-screening |

---

## ⚙️ RAILWAY ENVIRONMENT VARIABLES

Railway automatically detects and uses:
- `Node.js` as runtime
- `PORT=8080` (or random available port)
- `npm start` as startup command

No setup needed! Railway handles it all.

---

## 🐛 TROUBLESHOOTING

### Railway Deployment Failed
- Check logs: Click on deployment, see red errors
- Common issues:
  - Missing `package.json` (should be there)
  - Missing `server.js` (should be there)
  - Wrong root directory (should be `tribal-health-screening-backend`)

**Solution:** Fix issue locally, push to GitHub, Railway auto-retries

### Predictions Still Don't Work After Railway
- Check if you updated the API URL in `docs/static/js/main.c35df246.js`
- Clear browser cache: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Hard refresh GitHub Pages to load new build

### Backend Returns 500 Error
- Check Railway logs for error messages
- Common causes: Missing dependencies, wrong environment variables
- Solution: `npm install` and check `requirements.txt`

### CORS Error in Browser
- Your Railway URL must be in `server.js` CORS list
- Check: `server.js` line with `origins: [`
- Add your Railway URL if missing:
  ```javascript
  origins: [
    'http://localhost:3000',
    'http://localhost:8000',
    'https://Girivasanth-pro14.github.io',
    'https://YOUR-RAILWAY-URL'  // Add this line
  ]
  ```
- Redeploy to Railway with updated code

---

## 📊 EXPECTED LOGS

When deployment succeeds, you'll see:

```
🚀 Deployment started
↓ Building...
✓ Installing dependencies
✓ Running npm start
✓ Listening on port 8080
✓ Health check passed
✓ Deployment successful
🎉 Your app is live!
```

---

## 💰 RAILWAY PRICING

- **Free tier:** Sufficient for this app!
- No credit card required initially
- Generous limits for hobby projects
- Pay-as-you-go if you exceed free tier

---

## 🚀 NEXT STEPS AFTER DEPLOYMENT

1. **Share your app:**
   - GitHub Pages URL works worldwide
   - No login required for patients
   - Doctor login required for advanced features

2. **Monitor performance:**
   - Check Railway dashboard for usage
   - View logs if issues occur
   - Get alerts if app goes down

3. **Update backend (if needed):**
   - Edit `tribal-health-screening-backend/server.js` locally
   - Commit and push to GitHub
   - Railway auto-redeploys with new code

4. **Scale up (optional):**
   - Add database for persistent data
   - Integrate real ML models
   - Add authentication system
   - Add admin dashboard

---

## 🎯 QUICK RECAP

| Step | Time | Status |
|------|------|--------|
| Create Railway account | 2 min | ⏳ Do this |
| Deploy backend | 5 min | ⏳ Do this |
| Get Railway URL | 1 min | ⏳ Do this |
| Update frontend URL | 2 min | ⏳ Do this |
| Test predictions | 1 min | ⏳ Do this |
| **TOTAL** | **11 min** | 🎉 Ready! |

---

## 📞 SUPPORT

- **Railway Docs:** https://railway.app/docs
- **GitHub Pages:** https://pages.github.com
- **Express.js:** https://expressjs.com
- **React:** https://react.dev

---

## ✨ CONGRATULATIONS!

Once you complete this guide, your medical screening app will be:
- ✅ Live on GitHub Pages
- ✅ Backend deployed worldwide
- ✅ Predictions working
- ✅ Ready for production

You've got this! 🚀

**Last Step:** Go to https://railway.app and click "Create New" 🎯
