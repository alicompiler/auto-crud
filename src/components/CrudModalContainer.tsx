import React, {Component} from 'react';
import {ContextConfig, CrudContext} from "../config/CrudContext";


interface Props {
    name: string;
}

class CrudModalContainer extends Component<Props> {
    render() {

        return (
            <div>

            </div>
        );
    }

    private getContext = (): ContextConfig => {
        return this.context;
    };
}

CrudModalContainer.contextType = CrudContext;

export default CrudModalContainer;