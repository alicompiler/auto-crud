import React, {Component} from 'react';
import PageConfigUtils from "./PageConfigUtils";
import H from "history";
import {CrudContextValue} from "../../Root/CrudContext";
import {BasePageOptions, PageConfig} from "../PageConfig";

export interface BaseCrudPageProps {
    name: string;
    context: CrudContextValue;
    history: H.History;
    location: H.Location;
    match: any;
}

abstract class BaseCrudPage<T extends BaseCrudPageProps = BaseCrudPageProps> extends Component<BaseCrudPageProps> {

    protected pageConfigUtils: PageConfigUtils;
    protected currentPageConfig: PageConfig;

    protected constructor(props: BaseCrudPageProps) {
        super(props);
        this.pageConfigUtils = new PageConfigUtils(this.props.context);
        this.currentPageConfig = this.pageConfigUtils.getPageConfigByName(this.props.name);
    }

    async componentDidMount(): Promise<void> {
        const onLoadAction = this.getOptions().onLoadAction;
        if (onLoadAction) {
            const result = await onLoadAction(this);
            const afterOnLoadAction = this.getOptions().afterOnLoadAction;
            if (afterOnLoadAction) {
                afterOnLoadAction(result, this);
            }
        }

        const pageTitle = this.getOptions().pageTitle;
        if (pageTitle) {
            this.getContext().updateState({pageTitle: pageTitle});
        }
    }

    componentWillUnmount(): void {
        const onDestroyAction = this.getOptions().onDestroyAction;
        if (onDestroyAction) {
            // noinspection JSIgnoredPromiseFromCall
            onDestroyAction(this);
        }
    }

    render() {
        return (
            <div className={`__curd-page`}>
                {
                    this.renderContent()
                }
            </div>
        );
    }

    protected abstract renderContent(): any;

    public getOptions(): BasePageOptions {
        return this.currentPageConfig.options ?? {};
    }

    public getState(): any {
        return this.pageConfigUtils.getPageState(this.props.name);
    }

    public updateState(payload: any): void {
        this.pageConfigUtils.updatePageState(this.props.name, payload);
    }

    public getContext = (): CrudContextValue => {
        return this.props.context;
    }
}

export default BaseCrudPage;