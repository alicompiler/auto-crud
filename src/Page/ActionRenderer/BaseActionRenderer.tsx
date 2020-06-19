import {CrudContextValue} from "../../Root/CrudContext";
import {ActionConfig, PageConfig} from "../PageConfig";
import React from "react";
import PageConfigUtils from "../Base/PageConfigUtils";

export interface ActionPair {
    action: ActionConfig;
    page: PageConfig;
}

export abstract class BaseActionRenderer {
    private readonly context: CrudContextValue;
    private readonly item: any;
    private readonly push: (location: any) => void;

    constructor(context: CrudContextValue, item: any, push: (location: any) => void) {
        this.context = context;
        this.item = item;
        this.push = push;
    }

    public render(): any {
        const pages = this.getPagesWithActions();
        const actions = this.getActionsOfPages(pages);
        return this.renderActions(actions);
    }

    protected getPagesWithActions(): PageConfig[] {
        const context = this.context;
        const pages: PageConfig[] = [];
        !context.config.detailsPage?.skip && pages.push(context.config.detailsPage!);
        !context.config.updatePage?.skip && pages.push(context.config.updatePage!);
        !context.config.deletePage?.skip && pages.push(context.config.deletePage!);

        for (let page of context.config.pages!) {
            if (!page.skip) {
                pages.push(page);
            }
        }
        return pages;
    }

    protected getActionsOfPages(pages: PageConfig[]): ActionPair[] {
        const actions: ActionPair[] = [];
        for (let page of pages) {
            const action = page.options?.action;
            if (action) {
                actions.push({action, page});
            }
        }
        return this.filterAndOrder(actions.filter(a => !this.shouldBeHidden(a)));
    }

    protected filterAndOrder(actionPair: ActionPair[]): ActionPair[] {
        return actionPair;
    }

    private renderActions(actions: ActionPair[]): any {
        const context = this.context;
        return actions.map((actionPair, index) => {
            const action = actionPair.action;
            const page = actionPair.page;
            let customRender = this.getHighOrderRender(action) ?? action.render;
            const rendered = customRender ? customRender(context, page, this.item) : this.defaultRender(page, action);
            return <React.Fragment key={index}>
                {rendered} <span style={{display: 'inline-block', width: 4}}/>
            </React.Fragment>
        });
    }

    protected abstract shouldBeHidden(action: ActionPair): boolean;

    protected abstract getHighOrderRender(action: ActionConfig): any;

    private defaultRender = (page: PageConfig, action: ActionConfig) => {
        const handleAction = action.handleAction ?? this.defaultHandleAction;
        return <button className={action.className} onClick={() => handleAction(this.context, page, this.item)}>
            {action.icon && <i className={action.icon}/>}
            {action.text && action.text}
        </button>
    }

    private defaultHandleAction = (context: CrudContextValue, page: PageConfig) => {
        const pageUtils = new PageConfigUtils(context);
        pageUtils.updatePageState(page.name!, {__item: this.item});
        this.push(page.route!);
    }

}