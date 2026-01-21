// API Configuration
// Update this with your Railway backend URL when deployed

const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://tribal-health-backend.up.railway.app'
    : 'http://localhost:8000');

export const API_ENDPOINTS = {
  predict: `${API_BASE_URL}/api/predict`,
  health: `${API_BASE_URL}/health`,
  recentScans: `${API_BASE_URL}/api/recent-scans`,
};

export default API_BASE_URL;
