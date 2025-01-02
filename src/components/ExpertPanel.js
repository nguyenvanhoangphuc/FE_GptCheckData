import React, { useState, useEffect } from "react";
import { fetchData, updateData } from "../services/api";
import "../css/ExpertPanel.css"; // Import file CSS

function ExpertPanel({ token, logout }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchedData = await fetchData(token);
                setData(fetchedData);
            } catch (error) {
                alert("Failed to load data.");
            }
        };
        loadData();
    }, [token]);

    const handleUpdate = async (id, updatedItem) => {
        try {
            await updateData(id, updatedItem, token);

            // Ẩn mục đã lưu bằng cách loại bỏ nó khỏi danh sách
            setData((prevData) => prevData.filter((item) => item.id !== id));

            alert("Data updated successfully!");
        } catch (error) {
            alert("Failed to update data.");
        }
    };

    return (
        <div className="expert-panel">
            <h2 className="panel-title">Expert Panel</h2>
            {data.length === 0 ? (
                <p className="no-data-message">No data to review.</p>
            ) : (
                data.map((item) => (
                    <div key={item.id} className="data-item">
                        <p className="data-prompt"><strong>Prompt:</strong> {item.prompt}</p>
                        <textarea
                            defaultValue={item.llm_response}
                            onChange={(e) => (item.llm_response = e.target.value)}
                            className="data-textarea"
                        />
                        <textarea
                            defaultValue={item.llm_explaination}
                            onChange={(e) => (item.llm_explaination = e.target.value)}
                            className="data-textarea"
                        />
                        <button
                            onClick={() => handleUpdate(item.id, item)}
                            className="save-button"
                        >
                            Save
                        </button>
                    </div>
                ))
            )}
            {/* Nút Logout cố định */}
            <button onClick={logout} className="logout-button">Logout</button>
        </div>
    );
}

export default ExpertPanel;
