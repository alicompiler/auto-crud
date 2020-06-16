import {TablePage} from "../../CollectionPage/TablePage/TablePage";
import React from "react";
import ToolbarComponent from "../../../Components/PageComponents/ToolbarComponent";
import ToolbarNavigationAction from "../../../Defaults/Components/ToolbarNavigationAction";
import {IndexPageOptions} from "./IndexPageOptions";
import {AutoCrudDefaults} from "../../../Defaults/AutoCrudDefaults";

export class IndexPage extends TablePage {

    public renderContent(): any {
        return <div>
            {this.renderCollectionContainer()}
        </div>
    }

    getDefaultPageTitle = () => AutoCrudDefaults.pageTitles.index;

    protected renderDefaultToolbar = () => {
        return <ToolbarComponent onSearch={this.onSearch}
                                 noSearch={this.getOptions().noSearch}
                                 searchInputClassName={this.getOptions().searchInputClassName}
                                 wrapperClassName={this.getOptions().toolbarWrapperClassName}
                                 page={this}
                                 searchInputPlaceholder={this.getOptions().searchInputPlaceholder ?? AutoCrudDefaults.localization.search}
                                 actions={this.getToolbarAction()}/>
    }

    protected onSearch = (value: string) => {
        const onSearch = this.getOptions().onSearch;
        onSearch ? onSearch(value, this) : this.defaultOnSearch(value);
    };

    public defaultOnSearch(value: string): void {
        let endpointRoot = this.getContext().config.endpointRoot;
        const url = AutoCrudDefaults.endpoints.search(value, endpointRoot);
        this.updateDataSourceUrl(url);
    }

    public updateDataSourceUrl = (url: string) => {
        this.updateOptions({...this.getOptions(), dataSourceUrl: () => url}, () => {
            this.forceUpdate(() => this.getCollectionContainerRef()!.startDataFetch());
        });
    }

    public getToolbarAction = () => {
        const toolbarActions = this.getOptions().toolbarActions;
        if (toolbarActions) {
            return toolbarActions.map(action => () => action(this));
        }
        return [
            () => <ToolbarNavigationAction icon={AutoCrudDefaults.classNames.toolbarActions.createNavigationIcon}
                                           buttonClassName={AutoCrudDefaults.classNames.toolbarActions.createButtonClassName}
                                           navigateTo={this.pageConfigUtils.getPageConfigByName('create').route!}/>,

            () => <button className={AutoCrudDefaults.classNames.toolbarActions.refreshButtonClassName}
                          onClick={() => this.getCollectionContainerRef()?.startDataFetch()}>
                <i className={AutoCrudDefaults.classNames.toolbarActions.refreshButtonIcon}/>
            </button>
        ];
    };

    public getOptions(): IndexPageOptions {
        return super.getOptions();
    }

}