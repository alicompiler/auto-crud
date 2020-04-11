import * as React from 'react';
import {CrudContext} from "../config/CrudContext";
import {CrudConfig} from "../config/Config";
import SimpleRouterCrudLayout from "./SimpleRouterCrudLayout";
import {DefaultConfigFixer} from "../config/ConfigFixer/ConfigFixer";
import CrudRootHeader from "../components/CrudRootHeader/CrudRootHeader";


class CrudRoot extends React.Component<CrudConfig, any> {

    static defaultProps = {
        layout: () => <SimpleRouterCrudLayout/>,
        header: () => <CrudRootHeader/>,
    };

    private readonly config: CrudConfig;

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
        const header = this.props.header!();

        return (
            <div className={'__curd-root'}>
                <CrudContext.Provider value={{
                    state: this.state,
                    config: this.config,
                    updateState: (payload: any) => this.setState(payload)
                }}>
                    {header}
                    {layout}
                </CrudContext.Provider>
            </div>
        );
    }
}

export default CrudRoot;