import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import SimpleCrudApp from "./__example/SimpleCrudApp";
import {setRafDefaults} from "raf-defaults/dist/setup"

setRafDefaults();

function App() {
    return (
        <div className="App" style={{padding: 8}}>
            <BrowserRouter>
                <SimpleCrudApp/>
            </BrowserRouter>
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
