import React, {Component} from 'react';
import {ContextConfig, CrudContext} from "../config/CrudContext";
import {Switch} from "react-router-dom";
import RoutesExtractor from "../utils/RoutesExtractor";
import TitleComponent from "../components/TitleComponent/TitleComponent";


class SimpleRouterCrudLayout extends Component {

    private previousSwitch: any = null;

    render() {
        return (
            <div>
                {
                    this.getRouterSwitch()
                }
            </div>
        );
    }


    protected getRouterSwitch = () => {
        if (this.previousSwitch)
            return this.previousSwitch;
        const routesExtractor = new RoutesExtractor(this.getContext());
        this.previousSwitch = <Switch>
            {routesExtractor.getRoutes()}
        </Switch>;
        return this.previousSwitch;
    };

    protected getContext = (): ContextConfig => this.context;

}

SimpleRouterCrudLayout.contextType = CrudContext;

export default SimpleRouterCrudLayout;