import React, {Component} from 'react';
import {CrudContextValue, CrudContext} from "../Root/CrudContext";


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

    private getContext = (): CrudContextValue => {
        return this.context;
    };
}

CrudModalContainer.contextType = CrudContext;

export default CrudModalContainer;