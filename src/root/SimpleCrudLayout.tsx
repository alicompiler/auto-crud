import React from 'react';
import CrudLayoutBase from "./CrudLayoutBase";
import {ContextConfig, CrudContext} from "../config/CrudContext";

export class SimpleCrudLayout extends CrudLayoutBase {
    protected renderContent(): any {
        return <>
            <h1>{this.getContext().config.name}</h1>
            <hr/>
        </>
    }

    private getContext = (): ContextConfig => {
        return this.context;
    }
}

SimpleCrudLayout.contextType = CrudContext;