import * as React from 'react';
import {CrudContext} from "../config/CrudContext";
import {CrudConfig} from "../config/Config";
import SimpleRouterCrudLayout from "./SimpleRouterCrudLayout";
import {DefaultConfigFixer} from "../config/ConfigFixer/ConfigFixer";


class CrudRoot extends React.Component<CrudConfig, any> {

    static defaultProps = {
        layout: () => <SimpleRouterCrudLayout/>
    };

    private config: CrudConfig;


    constructor(props: CrudConfig) {
        super(props);
        this.state = {
            state: {},
            uiState: {}
        };
        this.config = new DefaultConfigFixer(this.props).fix();

    }


    render() {
        const layout = this.props.layout!();

        return (
            <div className={'__curd-root'}>
                <CrudContext.Provider value={{
                    state: this.state,
                    config: this.config,
                    updateState: (payload: any) => this.setState(payload)
                }}>
                    {layout}
                </CrudContext.Provider>
            </div>
        );
    }
}

export default CrudRoot;