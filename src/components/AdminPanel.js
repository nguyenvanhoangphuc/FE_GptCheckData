import React, { useState, useEffect } from "react";
import { uploadData, downloadData, fetchReviewedData } from "../services/api";

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
    <div>
      <h2>Admin Panel</h2>
      <div>
        <label>Upload File:</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div>
        <button onClick={handleDownload}>Download Processed Data</button>
      </div>
      <h3>Reviewed Data</h3>
      { reviewedData.length === 0 ? (
        <p>No reviewed data available.</p>
      ) : (
        <table>
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
      )
      }
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default AdminPanel;