import CollectionPage from "../CollectionPage";
import React from "react";
import {TableRenderOptions} from "auto-collection";
import SimpleTableContainer from "auto-collection/dist/Container/SimpleTableContainer";
import {CollectionPageDefaults} from "../../../Defaults/Page/CollectionPageDefaults";
import {TablePageOptions} from "./TablePageOptions";

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

    protected getRenderOptions = (): TableRenderOptions => {
        const overrideRenderOptionsConfig = this.getOptions().renderOptionsConfig ? this.getOptions().renderOptionsConfig : {};
        const config = {...CollectionPageDefaults.renderOptionsConfig, ...overrideRenderOptionsConfig};
        return this.getOptions().collectionRenderOptions ?? new TableRenderOptions(config);
    };

    public getOptions(): TablePageOptions {
        return super.getOptions();
    }
}