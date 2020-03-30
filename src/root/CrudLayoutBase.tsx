import * as React from 'react';
import {Component} from 'react';
import {ContextConfig} from "../config/Config";
import IndexPage from "../page/IndexPage";

abstract class CrudLayoutBase extends Component {

    render() {
        return (
            <div className={'__curd-layout'}>
                {
                    this.renderContent()
                }
            </div>
        );
    }

    protected abstract renderContent(): any;

    protected getIndexPage = (context: ContextConfig) => {
        const indexPage = context.config.indexPage ?? (() => <IndexPage/>);
        return indexPage();
    };

    protected getPages = (config: ContextConfig) => {
        return null;
    }

}

export default CrudLayoutBase;