import React, { useState, useEffect } from "react";
import { fetchData, updateData } from "../services/api";

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
        <div>
            <h2>Expert Panel</h2>
            {data.length === 0 ? (
                <p>No data to review.</p>
            ) : (
                data.map((item) => (
                    <div key={item.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
                        <p><strong>Prompt:</strong> {item.prompt}</p>
                        <textarea
                            defaultValue={item.llm_response}
                            onChange={(e) => (item.llm_response = e.target.value)}
                            style={{ width: "100%", height: "60px", marginBottom: "10px" }}
                        />
                        <textarea
                            defaultValue={item.llm_explaination}
                            onChange={(e) => (item.llm_explaination = e.target.value)}
                            style={{ width: "100%", height: "60px", marginBottom: "10px" }}
                        />
                        <button onClick={() => handleUpdate(item.id, item)}>Save</button>
                    </div>
                ))
            )}
            <div>
                <button onClick={logout} style={{ marginTop: "20px" }}>Logout</button>
            </div>
        </div>
    );
}

export default ExpertPanel;
