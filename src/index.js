import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import SimpleCurdApp from "./example/SimpleCurdApp";
import "./example/style/compiled-style.css";
import {setRafDefaults} from "raf-defaults/dist/setup"

setRafDefaults();

function App() {
    return (
        <div className="App" style={{padding: 8}}>
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
