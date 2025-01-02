import React, { useState, useEffect } from "react";
import { uploadData, downloadData, fetchReviewedData } from "../services/api";
import "../css/AdminPanel.css";

function AdminPanel({ token, logout }) {
  const [file, setFile] = useState(null);
  const [reviewedData, setReviewedData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchReviewedData(token);
        setReviewedData(fetchedData);
      } catch (error) {
        alert("Failed to load reviewed data.");
      }
    };
    loadData();
  }, [token]);

  const handleUpload = async () => {
    if (file) {
      await uploadData(file, token);
      alert("Data uploaded successfully!");
    }
  };

  const handleDownload = async () => {
    await downloadData(token);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Panel</h2>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="admin-actions">
        <div className="upload-section">
          <label htmlFor="fileInput" className="upload-label">
            Upload File:
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="upload-input"
          />
          <button onClick={handleUpload} className="action-button">
            Upload
          </button>
        </div>
        <button onClick={handleDownload} className="action-button">
          Download Processed Data
        </button>
      </div>
      <h3>Reviewed Data</h3>
      {reviewedData.length === 0 ? (
        <p className="no-data">No reviewed data available.</p>
      ) : (
        <table className="reviewed-data-table">
          <thead>
            <tr>
              <th>Prompt</th>
              <th>Response</th>
              <th>Explanation</th>
              <th>Reviewed By</th>
            </tr>
          </thead>
          <tbody>
            {reviewedData.map((item) => (
              <tr key={item.id}>
                <td>{item.prompt}</td>
                <td>{item.llm_response}</td>
                <td>{item.llm_explaination}</td>
                <td>{item.reviewed_by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPanel;
