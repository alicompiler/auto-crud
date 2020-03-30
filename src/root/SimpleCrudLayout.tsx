import React from 'react';
import CrudLayoutBase from "./CrudLayoutBase";
import {CrudContext} from "./CrudContext";
import {ContextConfig} from "../config/Config";

export class SimpleCrudLayout extends CrudLayoutBase {
    protected renderContent(): any {
        return <>
            <h1>{this.getContext().config.name}</h1>
            <hr/>

            {
                this.getIndexPage(this.getContext())
            }
        </>
    }


    private getContext = (): ContextConfig => {
        return this.context;
    }
}

SimpleCrudLayout.contextType = CrudContext;