import React, {Component} from 'react';
import {CrudContext} from "./CrudContext";
import {ContextConfig} from "../config/Config";
import {Switch} from "react-router-dom";
import RoutesExtractor from "../utils/RoutesExtractor";

class SimpleRouterCrudLayout extends Component {
    render() {
        return (
            <div>
                <h1>Router Layout</h1>
                {
                    this.getRouterSwitch()
                }
            </div>
        );
    }


    protected getRouterSwitch = () => {
        const routesExtractor = new RoutesExtractor(this.getContext());
        return <Switch>
            {routesExtractor.getRoutes()}
        </Switch>
    };

    protected getContext = (): ContextConfig => this.context;

}

SimpleRouterCrudLayout.contextType = CrudContext;

export default SimpleRouterCrudLayout;