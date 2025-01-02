import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

// export const login = async (username, password) => {
//   const response = await axios.post(`${API_BASE_URL}/token`, {
//     username,
//     password,
//   });
//   return response.data;
// };

export const login = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await axios.post(`${API_BASE_URL}/token`, formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data;
};

export const getUserInfo = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const uploadData = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  await axios.post(`${API_BASE_URL}/upload/`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const downloadData = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/download/`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "data.json");
  document.body.appendChild(link);
  link.click();
};

export const fetchData = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/data/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateData = async (id, data, token) => {
  await axios.put(`${API_BASE_URL}/data/${id}/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchReviewedData = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/reviewed_data/`, {
      headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};