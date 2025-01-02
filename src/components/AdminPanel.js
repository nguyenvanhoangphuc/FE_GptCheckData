import React, { useState } from "react";
import { uploadData, downloadData } from "../services/api";

function AdminPanel({ token, logout }) {
  const [file, setFile] = useState(null);

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
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default AdminPanel;
