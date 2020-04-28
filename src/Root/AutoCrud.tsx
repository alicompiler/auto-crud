import * as React from 'react';
import {CrudContext} from "./CrudContext";
import {DefaultConfigInitializer} from "./ConfigInitializer/ConfigInitializer";
import CrudRootHeader from "../Components/CrudRootHeader/CrudRootHeader";
import CrudLayout from "../Layout/CrudLayout";
import {CrudConfig} from "./CrudConfig";
import {UIStateInitializer} from "./ConfigInitializer/UIStateInitializer";


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

    private getContextValue = () => {
        return {
            state: this.state,
            config: this.state.config,
            updateState: (payload: any, afterCallback?: (state: any) => void) => {
                this.setState(payload, () => {
                    afterCallback && afterCallback(this.state)
                });
            },
            updatePageOptions: this.updatePageOptions,
            getState: () => this.state
        };
    }

    private updatePageOptions = (pageName: string, options: any, afterUpdateCallback?: () => void) => {


        const config = {...this.state.config};

        if (config.indexPage.name === pageName) {
            config.indexPage.options = options;
        }
        if (config.createPage.name === pageName) {
            config.createPage.options = options;
        }
        if (config.updatePage.name === pageName) {
            config.updatePage.options = options;
        }
        if (config.deletePage.name === pageName) {
            config.indexPage.options = options;
        }
        if (config.detailsPage.name === pageName) {
            config.indexPage.options = options;
        }

        config.pages = config.pages.map((page: any) => {
            if (page.name === pageName)
                return {...page, options: options};
            return {...page};
        });

        this.setState({config: config}, afterUpdateCallback);
    }
}

export default AutoCrud;