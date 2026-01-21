# Quick Start Guide

## Current Live Setup ✅

### Access Points
- **Frontend**: http://localhost:3000
- **Backend**: http://127.0.0.1:8000
- **ngrok Dashboard**: http://127.0.0.1:4041

### Services Status
✅ Frontend (React) - Running on port 3000
✅ Backend (FastAPI) - Running on port 8000
✅ Models - All loaded (ResNet, DenseNet, EfficientNet)
✅ ngrok - Tunnel active for backend exposure

## Accessing the Application

### From This Machine
1. Open browser: http://localhost:3000
2. You'll see the Tribal Health Screening application
3. Login as Doctor to test X-ray upload functionality

### From Network (Same WiFi)
- Use: http://10.212.91.40:3000

### From Internet (Anywhere)
- Use the ngrok frontend tunnel URL (generate if needed)
- Or wait for deployment to Netlify (see deployment docs)

## Testing the AI Prediction

1. Go to http://localhost:3000
2. Click "Doctor Dashboard" or login as doctor
3. Upload a chest X-ray image (JPG/PNG)
4. AI models will analyze it
5. Results show: Diagnosis, Confidence, Findings, Recommendations

## Key API Endpoints

```bash
# Health check
curl http://127.0.0.1:8000/health

# Upload X-ray for diagnosis
curl -X POST http://127.0.0.1:8000/api/predict \
  -F "file=@yourxray.jpg"

# Get recent scans history
curl http://127.0.0.1:8000/api/recent-scans
```

## Deployment (One-Click)

### Frontend (Netlify)
1. Push to GitHub
2. GitHub Actions automatically deploys to Netlify
3. Configure secrets: NETLIFY_AUTH_TOKEN, NETLIFY_SITE_ID

### Backend (Railway)
1. Sign up at railway.app
2. Connect GitHub repository
3. Railway detects Dockerfile and deploys
4. Get public URL from Railway dashboard

See `DEPLOYMENT.md` for detailed instructions.

## Environment Variables

### Frontend (.env file)
```
REACT_APP_API_URL=https://YOUR_BACKEND_URL
```

### Backend (Environment variables needed for production)
- `DATABASE_URL` (if using database)
- `SECRET_KEY` (for security)

## Troubleshooting

### Frontend can't connect to backend?
```bash
# Check if backend is running
curl http://127.0.0.1:8000/health

# Check ngrok tunnel status
curl -s http://127.0.0.1:4041/api/tunnels | jq .tunnels[0].public_url
```

### ngrok URL changed?
- Get new URL from http://127.0.0.1:4041
- Update `.env` file
- Restart frontend

### Models not loading?
```bash
# Check if models exist
ls -la tribal-health-screening/backend/models/

# Check Python dependencies
pip list | grep -E "tensorflow|keras"
```

## File Locations

```
tribal-health-screening/
├── src/                    # Frontend React code
├── public/                 # Frontend static files
├── backend/               # Backend FastAPI code
│   ├── main.py           # Main API server
│   ├── predict.py        # AI model code
│   ├── models/           # Model files (.keras)
│   └── requirements.txt   # Python dependencies
├── .env                   # Environment variables
├── package.json           # Frontend dependencies
├── netlify.toml          # Netlify config
├── railway.json          # Railway config
└── .github/workflows/    # GitHub Actions
```

## Commands Reference

```bash
# Start backend
cd tribal-health-screening/backend
source ../../venv/bin/activate
python -m uvicorn main:app --host 127.0.0.1 --port 8000

# Start frontend
cd tribal-health-screening
npm start

# Start ngrok tunnel
ngrok http 8000

# Build frontend for production
npm run build

# Check logs
tail -f tribal-health-screening/backend/logs.txt
```

## Support

For detailed deployment guide: See `DEPLOYMENT.md`
For full setup summary: See `SETUP_SUMMARY.md`

---

**System Ready!** 🚀 You can now:
- Use the app locally
- Expose services via ngrok
- Deploy to Netlify & Railway
- Share with team members
