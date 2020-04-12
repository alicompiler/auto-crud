import React, {Component} from 'react';
import {CrudContext, CrudContextValue} from "../Root/CrudContext";
import {Switch} from "react-router-dom";
import RoutesExtractor from "./RoutesExtractor";


class CrudLayout extends Component {

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

    protected getContext = (): CrudContextValue => this.context;

}

CrudLayout.contextType = CrudContext;

export default CrudLayout;