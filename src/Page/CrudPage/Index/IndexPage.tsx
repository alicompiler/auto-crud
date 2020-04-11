import {TablePage} from "../../CollectionPage/TablePage/TablePage";
import React from "react";
import ToolbarComponent from "../../../components/Toolbar/ToolbarComponent";
import ToolbarNavigationAction from "../../../Defaults/Components/ToolbarNavigationAction";
import {CollectionPageDefaults} from "../../../Defaults/Page/CollectionPageDefaults";
import {IndexPageOptions} from "./IndexPageOptions";

export class IndexPage extends TablePage {

    protected renderContent(): any {
        return <div>
            {this.renderToolbar()}
            <br/>
            {this.renderCollectionContainer()}
        </div>
    }


    protected renderToolbar = () => {
        return <ToolbarComponent onSearch={this.onSearch}
                                 noSearch={this.getOptions().noSearch}
                                 searchInputClassName={this.getOptions().searchInputClassName}
                                 wrapperClassName={this.getOptions().toolbarWrapperClassName}
                                 page={this}
                                 searchInputPlaceholder={this.getOptions().searchInputPlaceholder ?? CollectionPageDefaults.localization.search}
                                 actions={this.getToolbarAction()}/>
    };


    protected onSearch = (value: string) => {
        const onSearch = this.getOptions().onSearch;
        onSearch && onSearch(value, this);
    };

    protected getToolbarAction = () => {
        const toolbarActions = this.getOptions().toolbarActions;
        if (toolbarActions) {
            return toolbarActions.map(action => () => action(this));
        }
        return [
            () => <ToolbarNavigationAction icon={'fas fa-plus text-white'}
                                           buttonClassName={'bg-green-500 mx-2 rounded px-4 py-2 text-xl'}
                                           navigateTo={this.pageConfigUtils.getPageConfigByName('create').route!}/>,
            () => <button className={'bg-blue-500 mx-2 rounded px-4 py-2 text-xl'}
                          onClick={() => this.getCollectionRef()?.startDataFetch()}>
                <i className={'fas text-white fa-sync'}/>
            </button>
        ];
    };

    protected getOptions(): IndexPageOptions {
        return super.getOptions();
    }


}