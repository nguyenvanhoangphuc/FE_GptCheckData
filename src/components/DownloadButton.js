import React from "react";
import { downloadData } from "../api";

const DownloadButton = () => {
    const handleDownload = async () => {
        try {
            const response = await downloadData();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "reviewed_data.json");
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error(error);
        }
    };

    return <button onClick={handleDownload}>Tải Dữ Liệu Đã Duyệt</button>;
};

export default DownloadButton;
