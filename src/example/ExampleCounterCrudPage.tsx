import React from 'react';
import CrudPage from "../Page/Base/CrudPage";

class ExampleCounterCrudPage extends CrudPage {
    protected renderContent(): any {
        return <>
            <h1>Counter : {this.getState().counter}</h1>
            <hr/>
            <button onClick={() => this.updateState({counter: this.getState().counter + 1})}>PLUS</button>
            <button onClick={() => this.updateState({counter: this.getState().counter - 1})}>MINUS</button>
        </>
    }
}

export default ExampleCounterCrudPage;