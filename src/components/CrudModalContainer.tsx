import React, {Component} from 'react';
import {CrudContext} from "../root/CrudContext";
import {ContextConfig} from "../config/Config";


interface Props {
    name: string;
}

class CrudModalContainer extends Component<Props> {
    render() {
        const modalConfig = this.getModalConfig();

        return (
            <div>

            </div>
        );
    }

    private getContext = (): ContextConfig => {
        return this.context;
    };

    private getModalConfig = () => {
        return this.getContext().modals[this.props.name];
    }
}

CrudModalContainer.contextType = CrudContext;

export default CrudModalContainer;