# Tribal Health Screening - Live Setup Summary

## ✅ Current Status

### Services Running
1. **Frontend React App** - ✅ Running
   - Local URL: http://localhost:3000
   - Network URL: http://10.212.91.40:3000
   - Port: 3000

2. **Backend FastAPI Server** - ✅ Running
   - Local URL: http://127.0.0.1:8000
   - Port: 8000
   - Models: ✅ All models loaded successfully
     - ResNet (resnet_final.keras)
     - DenseNet (densenet.keras)
     - EfficientNet (efficientnet.keras)

3. **ngrok Backend Tunnel** - ✅ Active
   - Status: Connected and listening
   - Access: Check ngrok dashboard at http://127.0.0.1:4041
   - Note: URL may regenerate on reconnection

## 🔌 Connection Details

### Frontend to Backend Connection
- Frontend configured to use: `process.env.REACT_APP_API_URL`
- Environment file: `.env` (contains ngrok URL)
- Fallback: If env var not set, defaults to `http://localhost:8000`

### CORS Settings (Updated)
Backend now accepts requests from:
- http://localhost:3000 ✅
- http://127.0.0.1:3000 ✅
- https://*.ngrok-free.app ✅
- https://*.ngrok.io ✅

## 📦 Dependencies Installed

### Frontend
- React 18.2.0
- React i18next (internationalization)
- Leaflet (maps)
- React Leaflet
- React Scripts 5.0.1

### Backend
- FastAPI 0.104.1
- Uvicorn 0.24.0
- Pydantic
- TensorFlow (for ML models)
- NumPy
- Pillow (image processing)
- Python-multipart (file uploads)

## 🚀 Deployment Files Created

1. `.github/workflows/deploy-netlify.yml` - GitHub Actions workflow
2. `backend/Dockerfile` - Docker configuration for backend
3. `backend/.dockerignore` - Docker ignore patterns
4. `railway.json` - Railway deployment configuration
5. `.env` - Environment variables (frontend)
6. `DEPLOYMENT.md` - Complete deployment guide

## 🔗 Local Access Points

| Service | URL | Status |
|---------|-----|--------|
| Frontend | http://localhost:3000 | ✅ Active |
| Frontend (Network) | http://10.212.91.40:3000 | ✅ Active |
| Backend | http://127.0.0.1:8000 | ✅ Active |
| Backend Health | http://127.0.0.1:8000/health | ✅ Active |
| ngrok Dashboard | http://127.0.0.1:4041 | ✅ Available |

## 📡 API Endpoints (Backend)

### Available Endpoints
```
GET  /                    - Root endpoint
GET  /health             - Health check (returns status & model status)
POST /api/predict        - Upload X-ray image for AI diagnosis
GET  /api/recent-scans   - Get mock recent scan history
```

### Example API Calls
```bash
# Health check
curl http://127.0.0.1:8000/health

# Upload X-ray (requires image file)
curl -X POST http://127.0.0.1:8000/api/predict \
  -F "file=@path/to/xray.jpg"

# Get recent scans
curl http://127.0.0.1:8000/api/recent-scans
```

## 🛠️ How to Use Current Setup

### Test locally
1. Open frontend: http://localhost:3000
2. Upload a chest X-ray image in the Doctor Dashboard
3. The image will be sent to the backend and analyzed by AI models
4. Results will be displayed on the Results tab

### Access via ngrok
1. Get current ngrok URL from: http://127.0.0.1:4041
2. Update `.env` file with the new URL if it changes
3. Frontend will automatically use the ngrok URL

## ⚙️ Configuration Files

### `.env` (Frontend Environment)
```
REACT_APP_API_URL=https://fa638b3ad6e1.ngrok-free.app
```
Update this when ngrok URL changes.

### `backend/main.py` (CORS Configuration)
Already configured to accept:
- Local development servers
- ngrok tunnels
- Any future production domains

## 📊 Process Overview

```
User Upload (Frontend:3000)
    ↓
[CORS Check] ✅
    ↓
HTTP POST to Backend (Port 8000 / ngrok URL)
    ↓
[FastAPI Handler]
    ↓
Image Processing & Preprocessing
    ↓
[AI Model Ensemble]
├─ ResNet
├─ DenseNet
└─ EfficientNet
    ↓
[Prediction Aggregation]
    ↓
JSON Response with:
- Disease diagnosis
- Confidence percentage
- Medical findings
- Recommendations
    ↓
Display Results (Frontend)
```

## 🔄 Next Steps for Production Deployment

1. **Get Netlify Credentials**
   - Sign up at netlify.com
   - Create site and get NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID

2. **Set GitHub Secrets**
   - NETLIFY_AUTH_TOKEN
   - NETLIFY_SITE_ID
   - REACT_APP_API_URL (production backend URL)

3. **Deploy Backend to Railway/Heroku**
   - Push code to GitHub
   - Railway/Heroku will automatically build and deploy

4. **Update CORS in Production**
   - Once you have production URLs, update main.py

5. **Push to GitHub**
   - GitHub Actions will automatically deploy frontend to Netlify

## ⚠️ Important Notes

### ngrok Free Tier Limitations
- Only 1 simultaneous tunnel
- Session timeout: 2 hours
- URL regenerates on reconnection
- Upgrade plan for unlimited tunnels

### Current Workaround
- Backend: Exposed via ngrok ✅
- Frontend: Local development (can also use ngrok but limited)

### For Production
- Frontend: Netlify (unlimited bandwidth)
- Backend: Railway or Heroku (persistent deployment)
- Both with proper SSL certificates

## 🆘 Troubleshooting

### Frontend can't connect to backend
- Check `.env` file has correct API URL
- Verify ngrok tunnel is still active
- Check browser console for specific error
- Try local connection: http://127.0.0.1:8000/health

### ngrok URL changed
- Check http://127.0.0.1:4041 for current URL
- Update `.env` file with new URL
- Restart frontend (npm start)

### Models not loading
- Verify model files exist: backend/models/*.keras
- Check TensorFlow is installed: pip list | grep tensorflow
- Check logs for file path errors

## 📝 Files Modified

1. `/tribal-health-screening/.env` - Added
2. `/tribal-health-screening/src/components/DoctorDashboard.jsx` - Updated API URL
3. `/tribal-health-screening/backend/main.py` - Updated CORS
4. `/tribal-health-screening/backend/requirements.txt` - Added dependencies
5. Multiple deployment config files created

## ✨ Ready for Testing!

The system is now:
- ✅ Fully connected (Frontend ↔ Backend)
- ✅ Exposed via ngrok (accessible from anywhere)
- ✅ Ready for deployment
- ✅ Configured for production use

**To access**: http://localhost:3000
