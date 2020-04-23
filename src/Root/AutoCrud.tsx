import * as React from 'react';
import {CrudContext} from "./CrudContext";
import {DefaultConfigInitializer} from "./ConfigInitializer/ConfigInitializer";
import CrudRootHeader from "../components/CrudRootHeader/CrudRootHeader";
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
            updateState: (payload: any) => {
                this.setState(payload, () => {
                    console.log('after state update : ', this.state);
                });
            },
            updatePageOptions: this.updatePageOptions,
            getState: () => this.state
        };
    }

    private updatePageOptions = (pageName: string, options: any, afterUpdateCallback?: () => void) => {

        //todo : cleanup

        if (this.state.config.indexPage.name === pageName) {
            this.state.config.indexPage.options = options;
        }
        if (this.state.config.createPage.name === pageName) {
            this.state.config.indexPage.options = options;
        }
        if (this.state.config.updatePage.name === pageName) {
            this.state.config.indexPage.options = options;
        }
        if (this.state.config.deletePage.name === pageName) {
            this.state.config.indexPage.options = options;
        }
        if (this.state.config.detailsPage.name === pageName) {
            this.state.config.indexPage.options = options;
        }

        this.state.config.pages = this.state.config.pages.map((page: any) => {
            if (page.name === pageName)
                return {...page, options: options};
            return {...page};
        });

        this.setState({config: {...this.state.config}}, afterUpdateCallback);
    }
}

export default AutoCrud;