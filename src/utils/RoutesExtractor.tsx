import {PageConfig} from "../config/Config";
import React from "react";
import {Route, RouteComponentProps} from "react-router-dom";
import {ContextConfig} from "../config/CrudContext";

export default class RoutesExtractor {

    private readonly context: ContextConfig;

    constructor(context: ContextConfig) {
        this.context = context;
    }

    getRoutes = () => {
        return this.getRouteOptions().map(option => <Route key={option.name}
                                                           exact={option.exact}
                                                           component={this.getComponent(option)}
                                                           path={option.path}/>)
    };

    protected getComponent(option: any) {
        const Page = option.component.as;
        return (route: RouteComponentProps) => <Page name={option.name}
                                                     history={route.history}
                                                     location={route.location}
                                                     match={route.match}
                                                     context={this.context}/>
    }

    protected getRouteOptions = () => {
        //note that every optional property for _page Config is available after fixing
        const options: any[] = [];

        options.push(this.getRouteOptionForPage(this.context.config.indexPage!));

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
        //note that every optional property for _page Config is available after fixing
        return {
            name: pageConfig.name!,
            path: pageConfig.route!,
            exact: true,
            component: pageConfig.pageComponent!
        }
    }

}