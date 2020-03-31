import React, {Component} from 'react';
import {ContextConfig, PageConfig} from "../config/Config";
import PageConfigUtils from "../utils/PageConfigUtils";

interface Props {
    name: string;
    context: ContextConfig;
}

abstract class BaseCrudPage extends Component<Props> {

    protected pageConfigUtils: PageConfigUtils;
    protected currentPageConfig: PageConfig;

    protected constructor(props: Props) {
        super(props);
        this.pageConfigUtils = new PageConfigUtils(this.props.context);
        this.currentPageConfig = this.pageConfigUtils.getPageConfigByName(this.props.name);
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

    protected getOptions(): any {
        return this.currentPageConfig.options ?? {};
    }
}

export default BaseCrudPage;