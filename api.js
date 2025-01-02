import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const uploadData = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(`${API_BASE_URL}/upload/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const fetchData = async (reviewed) => {
    return axios.get(`${API_BASE_URL}/data/`, { params: { reviewed } });
};

export const updateData = async (id, updatedData) => {
    return axios.put(`${API_BASE_URL}/data/${id}/`, updatedData);
};

export const downloadData = async () => {
    return axios.get(`${API_BASE_URL}/download/`, {
        responseType: "blob",
    });
};
