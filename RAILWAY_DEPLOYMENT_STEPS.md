# 🚂 Deploy Backend to Railway - RIGHT NOW

## ✅ Your Backend is Ready!

Verified:
- ✅ `server.js` exists and is configured
- ✅ `package.json` with all dependencies
- ✅ CORS configured for GitHub Pages
- ✅ Health check endpoint working
- ✅ Prediction endpoint working

---

## 🎯 DO THIS NOW (10 Minutes Total)

### Step 1: Open Railway Dashboard
Go to: https://railway.app

### Step 2: Sign In (or Create Account)
- Click "Sign Up"
- Choose "GitHub" 
- Authorize Railway to access your GitHub account

### Step 3: Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"

### Step 4: Select Your Repository
- Search for: `tribal-health-screening`
- Click on: `Girivasanth-pro14/tribal-health-screening`
- Authorize if Railway asks

### Step 5: Configure Deployment
Railway will ask for settings:
- **Root Directory:** Type: `tribal-health-screening-backend`
- **Auto Deploy:** Turn ON (so updates auto-deploy)
- Click "Create"

⏳ **Wait 2-5 minutes for deployment to complete...**

### Step 6: Find Your URL
Once deployed:
1. Click on your project name
2. Go to "Settings" tab
3. Look for "Domains"
4. Copy your Railway URL (looks like: `https://tribal-health-prod-xyz.up.railway.app`)

### Step 7: Test Your URL Works
Copy this command and replace `YOUR-RAILWAY-URL`:
```bash
curl https://YOUR-RAILWAY-URL/health
```

Should return:
```json
{"status":"healthy","models_loaded":true}
```

### Step 8: Update Frontend
Now tell your frontend where the backend is!

Go to: https://github.com/Girivasanth-pro14/tribal-health-screening

Navigate to: `docs/static/js/main.c35df246.js`

Click the ✏️ (edit) button:

**Find:** `http://localhost:8000`
**Replace:** Your Railway URL from Step 6

Click "Commit changes"

⏳ **Wait 30 seconds for GitHub Pages to update...**

### Step 9: Test Predictions!
Go to: https://Girivasanth-pro14.github.io/tribal-health-screening/

1. Click "Doctor Dashboard"
2. Upload any image
3. Click "Analyze"
4. Should see: Disease prediction + Confidence score ✅

---

## ⏱️ Timeline

| Step | Time | What |
|------|------|------|
| 1-5 | 5 min | Deploy to Railway (mostly waiting) |
| 6-7 | 2 min | Get URL and test |
| 8 | 2 min | Update frontend |
| 9 | 1 min | Test predictions |
| **TOTAL** | **10 min** | 🎉 DONE! |

---

## 🆘 Stuck?

### "I can't find the deployment settings"
- Make sure you're in your Railway project dashboard
- Look for "Settings" tab (not "Environments")

### "Railway says 'Build failed'"
- This shouldn't happen if everything is configured
- Check the logs in Railway dashboard
- Most common: wrong root directory (should be `tribal-health-screening-backend`)

### "I get a 404 error from Railway"
- Railway is still deploying (wait 2-3 minutes)
- Or the deployment actually failed (check logs)

### "Predictions still don't work"
- Did you update the frontend API URL?
- Hard refresh browser: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows)
- Clear browser cache

### "CORS error in browser console"
- You might not have updated the API URL correctly
- Check that it's a valid Railway URL (https://...)
- Make sure you replaced ALL instances of `localhost:8000`

---

## 📋 Verification Checklist

Before you say it's done, verify:

- [ ] Went to https://railway.app
- [ ] Created new project from your GitHub repo
- [ ] Set root directory to `tribal-health-screening-backend`
- [ ] Waited for "Deployment successful"
- [ ] Got your Railway URL
- [ ] Tested with `curl` - got healthy response
- [ ] Updated `docs/static/js/main.c35df246.js` on GitHub
- [ ] Replaced `localhost:8000` with Railway URL
- [ ] Pushed changes to GitHub
- [ ] Waited 30 seconds for GitHub Pages to update
- [ ] Tested predictions on GitHub Pages - IT WORKS! ✅

---

## 🎉 After Deployment

Your app is now:
- **Frontend:** https://Girivasanth-pro14.github.io/tribal-health-screening/
- **Backend:** https://your-railway-url (from Railway dashboard)
- **Both:** Accessible worldwide 🌍

Anyone can use it from anywhere!

---

## 📍 Key URLs

**Your Repository:**
```
https://github.com/Girivasanth-pro14/tribal-health-screening
```

**Your GitHub Pages:**
```
https://Girivasanth-pro14.github.io/tribal-health-screening/
```

**Your Backend (after deployment):**
```
https://YOUR-RAILWAY-URL-HERE
```

**Railway Dashboard:**
```
https://railway.app/dashboard
```

---

## 💡 Pro Tips

1. **Auto-deploy:** Railway auto-deploys when you push to GitHub (if enabled)
2. **Free tier:** Railway free tier is plenty for this app
3. **Logs:** Check Railway logs if something breaks
4. **No credit card:** Unless you exceed free tier limits

---

## 🚀 READY?

**Go to https://railway.app and deploy!**

You've got all the tools, just need to click a few buttons. 10 minutes and you're done! 

Let me know when:
1. Deployment is complete
2. You have your Railway URL
3. You need help updating the frontend

Good luck! 🎯
