import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import SimpleCurdApp from "./example/SimpleCurdApp";
import "./example/style/compiled-style.css";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <SimpleCurdApp/>
            </BrowserRouter>
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
