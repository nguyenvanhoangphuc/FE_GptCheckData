import React from "react";
import Upload from "./components/Upload";
import DataList from "./components/DataList";
import DownloadButton from "./components/DownloadButton";

function App() {
    return (
        <div>
            <h1>LLM Data Review</h1>
            <Upload />
            <DataList />
            <DownloadButton />
        </div>
    );
}

export default App;
