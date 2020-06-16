import React, {Component} from 'react';
import {CrudContext, CrudContextValue} from "../../Root/CrudContext";
import TitleComponent from "./TitleComponent";
import {withRouter} from 'react-router-dom';
import {AutoCrudDefaults} from "../../Defaults/AutoCrudDefaults";


interface Props {
    history: any;
    match: any;
    location: any;
}

class CrudRootHeaderComponent extends Component<Props> {

    render() {
        return (
            <div>
                <div className={`__auto_crud_header ${AutoCrudDefaults.classNames.curdRootHeader.wrapper}`}>
                    <TitleComponent/>
                    <div>
                        {this.renderHomeButton()}
                    </div>
                </div>
                <div className={AutoCrudDefaults.classNames.divider}/>
            </div>
        );
    }

    public renderHomeButton = () => {
        return AutoCrudDefaults.components.renderCrudHeaderHomeButton(this.props.history.push , this.getContext());
    };

    protected getContext = (): CrudContextValue => {
        return this.context;
    }
}

CrudRootHeaderComponent.contextType = CrudContext;

export default withRouter(CrudRootHeaderComponent);