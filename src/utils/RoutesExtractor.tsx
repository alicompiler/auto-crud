import {ContextConfig, PageConfig} from "../config/Config";
import React from "react";
import {Route} from "react-router-dom";

export default class RoutesExtractor {

    private context: ContextConfig;

    constructor(context: ContextConfig) {
        this.context = context;
    }

    getRoutes = () => {
        return this.getRouteOptions().map(option => <Route key={option.name}
                                                           exact={option.exact}
                                                           component={option.component}
                                                           path={option.path}/>)
    };

    protected getRouteOptions = () => {
        //note that every optional property for page config is available after fixing
        const options: any[] = [];

        if (!this.context.config.createPage?.skip)
            options.push(this.getRouteOptionForPage(this.context.config.createPage!));
        if (!this.context.config.editPage?.skip)
            options.push(this.getRouteOptionForPage(this.context.config.editPage!));
        if (!this.context.config.deletePage?.skip)
            options.push(this.getRouteOptionForPage(this.context.config.deletePage!));
        for (let pageConfig of this.context.config.pages!) {
            if (!pageConfig.skip)
                options.push(this.getRouteOptionForPage(pageConfig));
        }

        return options;
    };

    protected getRouteOptionForPage = (pageConfig: PageConfig) => {
        //note that every optional property for page config is available after fixing
        return {
            name: pageConfig.name!,
            path: pageConfig.route!,
            exact: true,
            component: pageConfig.pageComponent!
        }
    }

}