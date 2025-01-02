import React, { useEffect, useState } from "react";
import { fetchData } from "../api";
import EditForm from "./EditForm";

const DataList = () => {
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchData(false); // Chỉ lấy dữ liệu chưa duyệt
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        loadData();
    }, []);

    return (
        <div>
            <h2>Danh Sách Dữ Liệu</h2>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <strong>Prompt:</strong> {item.prompt}
                        <button onClick={() => setSelectedData(item)}>Chỉnh sửa</button>
                    </li>
                ))}
            </ul>
            {selectedData && <EditForm data={selectedData} onClose={() => setSelectedData(null)} />}
        </div>
    );
};

export default DataList;
