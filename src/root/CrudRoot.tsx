import * as React from 'react';
import {CrudContext, getInitialState} from "./CrudContext";
import {ContextConfig, CrudConfig} from "../config/Config";
import SimpleRouterCrudLayout from "./SimpleRouterCrudLayout";


class CrudRoot extends React.Component<CrudConfig, ContextConfig> {

    static defaultProps = {
        layout: () => <SimpleRouterCrudLayout/>
    };

    constructor(props: CrudConfig) {
        super(props);
        this.state = getInitialState(props, this.setState);
    }

    render() {
        const layout = this.props.layout!();

        return (
            <div className={'__curd-root'}>
                <CrudContext.Provider value={this.state}>
                    {layout}
                </CrudContext.Provider>
            </div>
        );
    }
}

export default CrudRoot;