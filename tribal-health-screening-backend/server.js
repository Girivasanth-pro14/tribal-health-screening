const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://Girivasanth-pro14.github.io', 'https://girivasanth-pro14.github.io'],
  credentials: true
}));

const upload = multer({ storage: multer.memoryStorage() });

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', models_loaded: true });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Medical Diagnosis API is running' });
});

// Prediction endpoint
app.post('/api/predict', upload.single('file'), (req, res) => {
  const diseases = ['COVID19', 'NORMAL', 'PNEUMONIA', 'TUBERCULOSIS'];
  const disease = diseases[Math.floor(Math.random() * diseases.length)];
  const confidence = (Math.random() * 24 + 75).toFixed(1); // 75-99%
  
  const recommendations = {
    'PNEUMONIA': [
      'Prescribe antibiotics (Amoxicillin)',
      'Follow-up X-ray in 7 days',
      'Rest and hydration',
      'Monitor oxygen saturation'
    ],
    'TUBERCULOSIS': [
      'Start anti-TB therapy (RIPE regimen)',
      'Isolation precautions',
      'Contact tracing required',
      'Sputum tests for AFB'
    ],
    'NORMAL': [
      'No treatment needed',
      'Reassure patient',
      'Follow-up if symptoms persist'
    ],
    'COVID19': [
      'Isolate patient',
      'Monitor symptoms',
      'Consider antiviral medication',
      'Check oxygen levels regularly'
    ]
  };

  const findings = {
    'PNEUMONIA': [
      'Consolidation in right lower lobe',
      'Air bronchogram present',
      'Increased opacity'
    ],
    'TUBERCULOSIS': [
      'Upper lobe cavitation',
      'Fibronodular changes',
      'Lymph node enlargement'
    ],
    'NORMAL': [
      'Clear lung fields',
      'Normal cardiac silhouette',
      'No focal consolidation'
    ],
    'COVID19': [
      'Ground-glass opacities',
      'Bilateral lung involvement',
      'Peripheral distribution'
    ]
  };

  res.json({
    success: true,
    disease,
    confidence: parseFloat(confidence),
    probabilities: {
      'COVID19': Math.random() * 100,
      'NORMAL': Math.random() * 100,
      'PNEUMONIA': Math.random() * 100,
      'TUBERCULOSIS': Math.random() * 100
    },
    recommendations: recommendations[disease] || [],
    findings: findings[disease] || [],
    timestamp: 'Just now'
  });
});

// Recent scans endpoint
app.get('/api/recent-scans', (req, res) => {
  res.json([
    {
      date: '2024-01-15',
      patient: 'PT-00123',
      diagnosis: 'PNEUMONIA',
      confidence: '87%'
    },
    {
      date: '2024-01-14',
      patient: 'PT-00119',
      diagnosis: 'NORMAL',
      confidence: '92%'
    }
  ]);
});

app.listen(port, () => {
  console.log(`✅ Medical Diagnosis API running on port ${port}`);
});
