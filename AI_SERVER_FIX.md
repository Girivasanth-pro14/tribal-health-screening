# AI Server Connection - Troubleshooting & Fix

## Issue: "Failed to connect to AI server"

### Root Cause
The frontend was configured to use an ngrok URL (`https://fa638b3ad6e1.ngrok-free.app`) but:
1. The ngrok tunnel for the backend was not active
2. ngrok free tier only allows 1 simultaneous tunnel
3. The frontend ngrok tunnel was running on port 3000 instead

### ✅ Solution Applied

#### 1. Updated Environment Configuration
Changed `.env` file from ngrok URL to localhost:
```
REACT_APP_API_URL=http://localhost:8000
```

#### 2. Restarted Frontend
- Stopped old frontend instance
- Started new instance with updated environment
- Frontend now on: `http://localhost:3001` (or `http://192.168.1.6:3001`)

#### 3. Verified Backend Connection
✅ Backend health check successful:
```bash
$ curl http://localhost:8000/health
{
  "status": "healthy",
  "models_loaded": true
}
```

## Current Setup - WORKING ✅

| Component | URL | Status |
|-----------|-----|--------|
| Frontend | http://localhost:3001 | ✅ Running |
| Backend | http://localhost:8000 | ✅ Running |
| AI Models | ResNet, DenseNet, EfficientNet | ✅ Loaded |
| Connection | localhost:3001 → localhost:8000 | ✅ Connected |

## How to Use

### 1. Access the Application
```
http://localhost:3001
```

### 2. Test AI Prediction
1. Click on "Doctor Dashboard" (or login as doctor)
2. Upload a chest X-ray image (JPG/PNG format)
3. The image will be processed by AI models
4. Results will show diagnosis and confidence

### 3. Monitor Connections
Check backend logs for incoming requests:
```bash
# You'll see requests like:
INFO: 127.0.0.1:xxxxx - "POST /api/predict HTTP/1.1" 200 OK
```

## For Production Deployment

### Option 1: ngrok Exposure (Development/Testing)
```bash
# Terminal 1: Backend tunnel
ngrok http 8000

# Terminal 2: Frontend tunnel
ngrok http 3001

# Update .env with ngrok URL
REACT_APP_API_URL=https://YOUR_NGROK_BACKEND_URL.ngrok-free.app
```

### Option 2: Production (Netlify + Railway)
1. Deploy frontend to Netlify
2. Deploy backend to Railway
3. Update .env with Railway backend URL:
```
REACT_APP_API_URL=https://your-backend.railway.app
```

## Verification Checklist

✅ Backend running on port 8000
✅ Frontend running on port 3001
✅ Models loaded successfully
✅ CORS configured for localhost
✅ Environment variable correctly set
✅ Health endpoint responding

## If Issue Persists

### 1. Check Backend is Running
```bash
ps aux | grep uvicorn
# Should show: python -m uvicorn main:app --host 127.0.0.1 --port 8000
```

### 2. Check Frontend Environment Variable
```bash
# In browser console, run:
console.log(process.env.REACT_APP_API_URL)
# Should output: http://localhost:8000
```

### 3. Check Network Connectivity
```bash
curl -v http://localhost:8000/health
# Should return: {"status":"healthy","models_loaded":true}
```

### 4. Check Browser Console
- Open DevTools (F12)
- Go to Console tab
- Check for specific error messages
- Look for CORS errors if trying to access from different origin

### 5. Restart Everything
```bash
# Kill all processes
pkill -f "uvicorn\|npm start\|ngrok"

# Restart backend
cd tribal-health-screening/backend
source ../../venv/bin/activate
python -m uvicorn main:app --host 127.0.0.1 --port 8000 &

# Restart frontend
cd tribal-health-screening
npm start
```

## File Changes Made

1. `.env` - Updated API URL from ngrok to localhost
2. Frontend restarted to pick up environment changes

## Next Steps

The system is now working locally! To enable ngrok exposure for remote access:
1. Start backend ngrok tunnel (only 1 allowed on free tier)
2. Update .env with the new ngrok URL
3. Restart frontend

Or proceed with production deployment using Netlify + Railway (no ngrok needed).
