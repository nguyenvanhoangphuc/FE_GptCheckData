import React, { useState } from "react";
import { updateData } from "../api";

const EditForm = ({ data, onClose }) => {
    const [llmResponse, setLlmResponse] = useState(data.llm_response);
    const [llmExplanation, setLlmExplanation] = useState(data.llm_explaination);

    const handleSave = async () => {
        try {
            await updateData(data.id, {llm_response: llmResponse, llm_explaination: llmExplanation });
            alert("Cập nhật thành công!");
            onClose();
        } catch (error) {
            alert("Cập nhật thất bại!");
            console.error(error);
        }
    };

    return (
        <div>
            <h3>Chỉnh Sửa Dữ Liệu</h3>
            <label>Response:</label>
            <textarea value={llmResponse} onChange={(e) => setLlmResponse(e.target.value)} />
            <label>Explanation:</label>
            <textarea value={llmExplanation} onChange={(e) => setLlmExplanation(e.target.value)} />
            <button onClick={handleSave}>Lưu</button>
            <button onClick={onClose}>Đóng</button>
        </div>
    );
};

export default EditForm;
