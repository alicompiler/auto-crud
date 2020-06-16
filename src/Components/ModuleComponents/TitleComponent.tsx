import React, {Component} from 'react';
import {CrudContext, CrudContextValue} from "../../Root/CrudContext";
import {AutoCrudDefaults} from "../../Defaults/AutoCrudDefaults";

class TitleComponent extends Component {

    render() {
        const title = this.getContext().config.mainTitle;
        const subtitle = this.getContext().state.pageTitle;
        return (
            <div className={AutoCrudDefaults.classNames.titleWrapper}>
                {
                    title && <h2 className={AutoCrudDefaults.classNames.title}>{title}</h2>
                }
                {
                    subtitle && this.renderSubtitle(title, subtitle)
                }
            </div>
        );
    }

    protected renderSubtitle = (title: string | undefined, subtitle: string) => {
        return <>
            {title && this.renderSeparator()}
            <p className={AutoCrudDefaults.classNames.subtitle}>{subtitle}</p>
        </>;
    }

    protected renderSeparator = () => {
        return <span className={AutoCrudDefaults.classNames.titleSeparator}>|</span>;
    }

    public getContext = (): CrudContextValue => this.context;
}

TitleComponent.contextType = CrudContext;
export default TitleComponent;