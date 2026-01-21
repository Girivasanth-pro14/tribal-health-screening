import React, { useState, useRef } from 'react';
import './DoctorDashboard.css';
import { API_ENDPOINTS } from '../config/api';

const DoctorDashboard = ({ onLogout }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentScans, setRecentScans] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPrediction(null);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPrediction(null);
    }
  };

  const analyzeScan = async () => {
    if (!selectedFile) {
      alert('Please select an X-ray image first');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(API_ENDPOINTS.predict, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setPrediction(result);
      
      // Add to recent scans
      const newScan = {
        id: Date.now(),
        filename: selectedFile.name,
        timestamp: new Date().toLocaleString(),
        diagnosis: result.disease,
        confidence: result.confidence.toFixed(1)
      };
      setRecentScans(prev => [newScan, ...prev.slice(0, 9)]);

    } catch (error) {
      console.error('Analysis error:', error);
      
      // Check if backend is unreachable
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        alert(`⚠️ Backend not reachable at ${API_ENDPOINTS.predict}\n\nThe backend needs to be deployed to a public server (Railway, Heroku, etc.) for predictions to work on GitHub Pages.\n\nFor now, you can:\n1. Run the backend locally: npm start in tribal-health-screening-backend/\n2. Use the app from http://localhost:3000 instead of GitHub Pages`);
      } else {
        alert(`❌ Analysis failed: ${error.message}\n\nPlease try again or contact support.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setSelectedFile(null);
    setPrediction(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getDiagnosisColor = (disease) => {
    const colors = {
      'NORMAL': '#28a745',
      'PNEUMONIA': '#ffc107',
      'TUBERCULOSIS': '#dc3545',
      'COVID19': '#fd7e14'
    };
    return colors[disease] || '#6c757d';
  };

  const getSeverityLevel = (disease) => {
    const levels = {
      'NORMAL': 'Normal',
      'PNEUMONIA': 'Moderate',
      'TUBERCULOSIS': 'High',
      'COVID19': 'High'
    };
    return levels[disease] || 'Unknown';
  };

  return (
    <div className="doctor-portal">
      {/* Header */}
      <div className="doctor-header">
        <div className="header-left">
          <h1><i className="fas fa-user-md"></i> Doctor Dashboard</h1>
          <p>AI-Powered Chest X-Ray Analysis</p>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={onLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      <div className="doctor-main">
        {/* Upload Section */}
        <div className="upload-card">
          <div className="upload-icon"><i className="fas fa-upload"></i></div>
          <h2>Analyze X-Ray Image</h2>
          
          <div 
            className="upload-zone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedFile ? (
              <div className="file-preview">
                <img 
                  src={URL.createObjectURL(selectedFile)} 
                  alt="X-ray preview" 
                  className="preview-image"
                />
                <p className="file-name">{selectedFile.name}</p>
              </div>
            ) : (
              <div className="upload-placeholder">
                <i className="fas fa-cloud-upload-alt"></i>
                <p>Drag & drop X-ray image here or click to browse</p>
                <small>Supports: JPG, PNG, JPEG</small>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          <div className="action-buttons">
            <button 
              className="action-btn"
              onClick={analyzeScan}
              disabled={!selectedFile || loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Analyzing...
                </>
              ) : (
                <>
                  <i className="fas fa-microscope"></i> Analyze X-Ray
                </>
              )}
            </button>
            
            {selectedFile && (
              <button className="delete-btn" onClick={clearResults}>
                <i className="fas fa-times"></i> Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        {prediction && (
          <div className="results-card">
            <div className="diagnosis-header">
              <h2><i className="fas fa-chart-line"></i> Analysis Results</h2>
            </div>
            
            <div className="diagnosis-header">
                <div 
                  className="diagnosis-badge"
                  style={{ backgroundColor: getDiagnosisColor(prediction.disease) }}
                >
                  {prediction.disease}
                </div>
                <div className="confidence-score">
                  <div className="confidence-label">Confidence Level</div>
                  <div className="confidence-value">{prediction.confidence.toFixed(1)}%</div>
                  <div className="confidence-bar">
                    <div 
                      className="confidence-fill"
                      style={{ width: `${prediction.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Probability Breakdown */}
              <div className="confidence-score">
                <h4>Probability Breakdown</h4>
                {Object.entries(prediction.probabilities).map(([disease, prob]) => (
                  <div key={disease} style={{marginBottom: '15px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px'}}>
                      <span className="confidence-label">{disease}</span>
                      <span className="confidence-value" style={{fontSize: '14px'}}>{prob.toFixed(1)}%</span>
                    </div>
                    <div className="confidence-bar">
                      <div 
                        className="confidence-fill"
                        style={{ 
                          width: `${prob}%`,
                          backgroundColor: getDiagnosisColor(disease)
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Medical Findings */}
              {prediction.findings && (
                <div className="findings-section">
                  <h4>Medical Findings:</h4>
                  <ul>
                    {prediction.findings.map((finding, index) => (
                      <li key={index}>{finding}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {prediction.recommendations && (
                <div className="recommendations-section">
                  <h4>Recommendations:</h4>
                  <ul>
                    {prediction.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Scans */}
        {recentScans.length > 0 && (
          <div className="history-section">
            <h2><i className="fas fa-history"></i> Recent Scans</h2>
            <div className="history-table-container">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Filename</th>
                    <th>Timestamp</th>
                    <th>Diagnosis</th>
                    <th>Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {recentScans.map((scan) => (
                    <tr key={scan.id}>
                      <td>{scan.filename}</td>
                      <td>{scan.timestamp}</td>
                      <td>
                        <span 
                          className="diagnosis-badge"
                          style={{ backgroundColor: getDiagnosisColor(scan.diagnosis) }}
                        >
                          {scan.diagnosis}
                        </span>
                      </td>
                      <td className="confidence-cell">{scan.confidence}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;