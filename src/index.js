import React from 'react';
import ReactDOM from 'react-dom';
import CrudRoot from "./root/CrudRoot";

function App() {
    return (
        <div className="App">
            <CrudRoot name={'books'} routerRoot={'/books'}
                      collections={[]} modals={[]} operations={[]} pages={[]}/>
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
