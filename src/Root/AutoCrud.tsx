import * as React from 'react';
import {CrudContext} from "./CrudContext";
import {DefaultConfigInitializer} from "./ConfigInitializer/ConfigInitializer";
import CrudRootHeader from "../Components/CrudRootHeader/CrudRootHeader";
import CrudLayout from "./CrudLayout";
import {CrudConfig} from "./CrudConfig";
import {UIStateInitializer} from "./ConfigInitializer/UIStateInitializer";
import {PageOptionsModifier} from "../Page/PageConfigModifier/PageOptionsModifier";

class AutoCrud extends React.Component<CrudConfig, any> {

    static defaultProps = {
        layout: () => <CrudLayout/>,
        header: () => <CrudRootHeader/>,
    };


    constructor(props: CrudConfig) {
        super(props);
        const config = new DefaultConfigInitializer(this.props).initialize();
        const uiState = new UIStateInitializer(config).initialize();
        this.state = {state: {}, uiState: uiState, config: config};
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

    public getContextValue = () => {
        return {
            state: this.state,
            config: this.state.config,
            updateState: this.updateState,
            updatePageOptions: this.updatePageOptions,
            getState: () => this.state
        };
    }

    private updateState = (payload: any, afterCallback?: (state: any) => void) => {
        this.setState(payload, () => {
            afterCallback && afterCallback(this.state)
        });
    }

    private updatePageOptions = (pageName: string, options: any, afterUpdateCallback?: () => void) => {
        const optionsModifier = new PageOptionsModifier(this.state.config, pageName, options);
        const newConfig = optionsModifier.modify();
        this.setState({config: newConfig}, afterUpdateCallback);
    }
}

export default AutoCrud;