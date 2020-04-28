import React, {Component} from 'react';
import {CrudContextValue, CrudContext} from "../../Root/CrudContext";
import TitleComponent from "../TitleComponent/TitleComponent";
import {CrudRootHeaderDefault as Defaults} from "../../Defaults/Components/CrudRootHeaderDefautlts";
import {withRouter} from 'react-router-dom';


interface Props {
    history: any;
    match: any;
    location: any;
}

class CrudRootHeader extends Component<Props> {

    render() {
        return (
            <div>
                <div className={`__auto_crud_header ${Defaults.wrapperClassName}`}
                     style={{display: 'flex', justifyContent: 'space-between', padding: 6, alignItems: 'center'}}>
                    <TitleComponent/>
                    <div>
                        {this.renderHomeButton()}
                    </div>
                </div>
                <div className={'my-2 h-px w-full bg-gray-300'}/>
            </div>
        );
    }

    protected renderHomeButton = () => {
        if (Defaults.renderButton)
            return Defaults.renderButton();
        return <button className={`${Defaults.homeButtonClassName}`}
                       onClick={() => this.props.history.push(this.getContext().config.routeRoot)}>
            <i className={`${Defaults.homeButtonIconClassName}`}/>
        </button>
    };

    protected getContext = (): CrudContextValue => {
        return this.context;
    }
}

CrudRootHeader.contextType = CrudContext;

export default withRouter(CrudRootHeader);