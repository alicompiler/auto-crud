import React, {Component} from 'react';
import PageConfigUtils from "./PageConfigUtils";
import H from "history";
import {CrudContextValue} from "../../Root/CrudContext";
import {BasePageOptions, PageConfig} from "../PageConfig";
import {ConfirmationUtils} from "./Confirmation/ConfirmationUtils";

export interface BaseCrudPageProps {
    name: string;
    context: CrudContextValue;
    history: H.History;
    location: H.Location;
    match: any;
}

export default abstract class BaseCrudPage<T extends BaseCrudPageProps = BaseCrudPageProps> extends Component<BaseCrudPageProps> {

    protected pageConfigUtils: PageConfigUtils;
    protected currentPageConfig: PageConfig;
    protected confirmationUtils : ConfirmationUtils;

    protected constructor(props: BaseCrudPageProps) {
        super(props);
        this.pageConfigUtils = new PageConfigUtils(this.props.context);
        this.currentPageConfig = this.pageConfigUtils.getPageConfigByName(this.props.name);
        this.confirmationUtils = new ConfirmationUtils(this);
    }

    protected getConfirmationUtils() : ConfirmationUtils {
        return this.confirmationUtils;
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
        this.setPageTitle();
    }

    protected setPageTitle = () => {
        const pageTitle = this.getOptions().pageTitle ?? this.getDefaultPageTitle();
        if (pageTitle) {
            this.getContext().updateState({pageTitle: pageTitle});
        }
    }

    protected getDefaultPageTitle = (): (string | undefined) => {
        return undefined;
    }

    componentWillUnmount(): void {
        const onDestroyAction = this.getOptions().onDestroyAction;
        if (onDestroyAction) {
            onDestroyAction(this);
        }
    }

    render() {
        return (
            <div className={`__curd-page`}>
                {
                    this.renderToolbar()
                }
                <br/>
                {
                    this.renderContent()
                }
            </div>
        );
    }

    public abstract renderContent(): any;

    public renderToolbar = (): any => {
        if (this.currentPageConfig.toolbar === null)
            return null;
        if (this.currentPageConfig.toolbar) {
            return this.currentPageConfig.toolbar(this);
        }

        return this.renderDefaultToolbar();
    }

    protected renderDefaultToolbar = (): any => null;

    public getOptions(): BasePageOptions {
        return this.currentPageConfig.options ?? {};
    }

    public getState(): any {
        return this.pageConfigUtils.getPageState(this.props.name);
    }

    public updateState(payload: any, afterCallback?: (state: any) => void): void {
        this.pageConfigUtils.updatePageState(this.props.name, payload, afterCallback);
    }

    public updateStateForced(payload: any, afterCallback?: (state: any) => void): void {
        this.updateState(payload, (state: any) => {
            this.forceUpdate();
            afterCallback && afterCallback(state);
        })
    }

    public getContext = (): CrudContextValue => {
        return this.props.context;
    }

    public updateOptions = (newOptions: any, afterUpdateCallback?: () => void) => {
        this.getContext().updatePageOptions(this.props.name, newOptions, afterUpdateCallback);
    }

    public navigateToHome = () => {
        const indexPageRoute = this.getContext().config.indexPage!.route!;
        this.props.history.push(indexPageRoute);
    }
}
