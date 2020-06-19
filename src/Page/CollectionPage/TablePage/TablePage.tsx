import CollectionPage from "../CollectionPage";
import React from "react";
import {TableRenderOptions} from "auto-collection";
import SimpleTableContainer from "auto-collection/dist/Container/SimpleTableContainer";
import {TablePageOptions} from "./TablePageOptions";
import {AutoCrudDefaults} from "../../../Defaults/AutoCrudDefaults";

export class TablePage extends CollectionPage {
    protected renderCollectionContainer(): any {
        return <SimpleTableContainer ref={ref => this.setCollectionContainerRef(ref)}
                                     dataSource={this.getDataSource()}
                                     collectionOptions={this.getRenderOptions()}
                                     onFetchFail={this.getOptions().onFetchFail}
                                     onFetchStart={this.getOptions().onFetchStart}
                                     onFetchDone={this.getOptions().onFetchDone}
                                     renderError={this.renderErrorMessage}
                                     renderLoading={this.renderLoading}
                                     renderEmpty={this.renderEmpty}
                                     keyExtractor={this.getKeyExtractor()}
        />
    }

    public getRenderOptions = (): TableRenderOptions => {
        if (this.getOptions().collectionRenderOptions) {
            return this.getOptions().collectionRenderOptions;
        }

        const overrideRenderOptionsConfig = this.getOptions().renderOptionsConfig ?? {};
        let extraColumns = this.getOptions().extraColumns ?? this.getDefaultExtraColumns();
        const config = {
            ...AutoCrudDefaults.components.tableRenderOptionsConfig,
            orderBy: this.getOptions().orderBy,
            extraColumns: extraColumns,
            ...overrideRenderOptionsConfig
        };
        return new TableRenderOptions(config);
    };


    public getDefaultExtraColumns = () => {
        return [
            AutoCrudDefaults.components.tableActionsColumn(this.getContext()),
        ]
    }

    public getOptions(): TablePageOptions {
        return super.getOptions();
    }
}