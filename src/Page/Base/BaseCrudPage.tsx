import React, {Component} from 'react';
import {PageConfig, PageOption} from "../../config/Config";
import PageConfigUtils from "../../utils/PageConfigUtils";
import H from "history";
import {ContextConfig} from "../../config/CrudContext";

export interface BaseCrudPageProps {
    name: string;
    context: ContextConfig;
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

    protected getOptions(): PageOption {
        return this.currentPageConfig.options ?? {};
    }

    protected getState(): any {
        return this.pageConfigUtils.getPageState(this.props.name);
    }

    protected updateState(payload: any): void {
        this.pageConfigUtils.updatePageState(this.props.name, payload);
    }


    protected getContext = (): ContextConfig => {
        return this.props.context;
    }
}

export default BaseCrudPage;