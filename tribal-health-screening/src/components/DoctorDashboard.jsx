import React, { useState, useRef } from 'react';
import './DoctorDashboard.css';

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
      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
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
      alert('Failed to analyze X-ray. Please try again.');
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
    <div className="doctor-dashboard">
      {/* Header */}
      <div className="dashboard-header">
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

      <div className="dashboard-content">
        {/* Upload Section */}
        <div className="upload-section">
          <h2><i className="fas fa-upload"></i> Upload X-Ray Image</h2>
          
          <div 
            className="upload-area"
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

          <div className="upload-actions">
            <button 
              className="analyze-btn"
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
              <button className="clear-btn" onClick={clearResults}>
                <i className="fas fa-times"></i> Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        {prediction && (
          <div className="results-section">
            <h2><i className="fas fa-chart-line"></i> Analysis Results</h2>
            
            <div className="result-card">
              <div className="diagnosis-header">
                <div 
                  className="diagnosis-badge"
                  style={{ backgroundColor: getDiagnosisColor(prediction.disease) }}
                >
                  {prediction.disease}
                </div>
                <div className="confidence-score">
                  Confidence: {prediction.confidence.toFixed(1)}%
                </div>
              </div>

              <div className="result-details">
                <div className="detail-item">
                  <strong>Severity Level:</strong>
                  <span className={`severity ${getSeverityLevel(prediction.disease).toLowerCase()}`}>
                    {getSeverityLevel(prediction.disease)}
                  </span>
                </div>
                
                <div className="detail-item">
                  <strong>Timestamp:</strong>
                  <span>{prediction.timestamp}</span>
                </div>
              </div>

              {/* Probability Breakdown */}
              <div className="probability-breakdown">
                <h4>Probability Breakdown:</h4>
                {Object.entries(prediction.probabilities).map(([disease, prob]) => (
                  <div key={disease} className="prob-item">
                    <span className="disease-name">{disease}</span>
                    <div className="prob-bar">
                      <div 
                        className="prob-fill"
                        style={{ 
                          width: `${prob}%`,
                          backgroundColor: getDiagnosisColor(disease)
                        }}
                      ></div>
                    </div>
                    <span className="prob-value">{prob.toFixed(1)}%</span>
                  </div>
                ))}
              </div>

              {/* Medical Findings */}
              {prediction.findings && (
                <div className="medical-findings">
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
                <div className="recommendations">
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
          <div className="recent-scans">
            <h2><i className="fas fa-history"></i> Recent Scans</h2>
            <div className="scans-list">
              {recentScans.map((scan) => (
                <div key={scan.id} className="scan-item">
                  <div className="scan-info">
                    <strong>{scan.filename}</strong>
                    <small>{scan.timestamp}</small>
                  </div>
                  <div className="scan-result">
                    <span 
                      className="diagnosis-tag"
                      style={{ backgroundColor: getDiagnosisColor(scan.diagnosis) }}
                    >
                      {scan.diagnosis}
                    </span>
                    <span className="confidence">{scan.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;