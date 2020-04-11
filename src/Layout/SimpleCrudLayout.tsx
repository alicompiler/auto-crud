import React from 'react';
import CrudLayoutBase from "./CrudLayoutBase";
import {CrudContextValue, CrudContext} from "../Root/CrudContext";

export class SimpleCrudLayout extends CrudLayoutBase {
    protected renderContent(): any {
        return <>
            <h1>{this.getContext().config.name}</h1>
            <hr/>
        </>
    }

    private getContext = (): CrudContextValue => {
        return this.context;
    }
}

SimpleCrudLayout.contextType = CrudContext;