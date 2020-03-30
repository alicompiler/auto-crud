import * as React from 'react';
import {CrudContext, getInitialState} from "./CrudContext";
import {ContextConfig, CrudConfig} from "../config/Config";
import CrudLayout from "./CrudLayout";


class CrudRoot extends React.Component<CrudConfig, ContextConfig> {

    constructor(props: CrudConfig) {
        super(props);
        this.state = getInitialState(props, this.setState);
    }

    render() {
        return (
            <div className={'__curd-root'}>
                <CrudContext.Provider value={this.state}>
                    <CrudLayout/>
                </CrudContext.Provider>
            </div>
        );
    }
}

export default CrudRoot;