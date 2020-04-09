import * as React from 'react';
import {Component} from 'react';

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

}

export default CrudLayoutBase;