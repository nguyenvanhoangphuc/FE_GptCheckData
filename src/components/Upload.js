import React, { useState } from "react";
import { uploadData } from "../api";

const Upload = () => {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        if (!file) return alert("Vui lòng chọn file!");
        try {
            await uploadData(file);
            alert("Upload thành công!");
        } catch (error) {
            alert("Upload thất bại!");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Upload Dữ Liệu</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default Upload;
