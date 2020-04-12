import * as React from 'react';
import {CrudContext} from "./CrudContext";
import {DefaultConfigInitializer} from "./ConfigInitializer/ConfigInitializer";
import CrudRootHeader from "../components/CrudRootHeader/CrudRootHeader";
import CrudLayout from "../Layout/CrudLayout";
import {CrudConfig} from "./CrudConfig";


class AutoCrud extends React.Component<CrudConfig, any> {

    static defaultProps = {
        layout: () => <CrudLayout/>,
        header: () => <CrudRootHeader/>,
    };

    private readonly config: CrudConfig;

    constructor(props: CrudConfig) {
        super(props);
        this.state = {state: {}, uiState: {}};
        this.config = new DefaultConfigInitializer(this.props).initialize();
    }


    render() {
        const layout = this.props.layout!();
        const header = this.props.header!();

        return (
            <div className={'__curd-Root'}>
                <CrudContext.Provider value={this.getContextValue()}>
                    {header}
                    {layout}
                </CrudContext.Provider>
            </div>
        );
    }

    private getContextValue = () => {
        return {
            state: this.state,
            config: this.config,
            updateState: (payload: any) => this.setState(payload)
        };
    }
}

export default AutoCrud;