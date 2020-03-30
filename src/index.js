import React from 'react';
import ReactDOM from 'react-dom';
import CrudRoot from "./root/CrudRoot";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <CrudRoot name={'books'} routeRoot={'/books'}
                          collections={[]} modals={[]} operations={[]} pages={[]}/>
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
