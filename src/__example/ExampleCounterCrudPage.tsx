import React from 'react';
import BaseCrudPage from "../Page/Base/BaseCrudPage";

class ExampleCounterCrudPage extends BaseCrudPage {
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