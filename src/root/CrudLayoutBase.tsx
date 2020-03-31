import * as React from 'react';
import {Component} from 'react';
import {ContextConfig} from "../config/Config";

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
        return <h1>NO INDEX PAGE</h1>;
    };

    protected getPages = (config: ContextConfig) => {
        return null;
    }

}

export default CrudLayoutBase;