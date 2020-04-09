import React from 'react';
import {CollectionContainer, DataSource, KeyExtractor} from "auto-collection";
import BaseCrudPage from "../Base/BaseCrudPage";
import {CollectionPageDefaults} from "../../Defaults/Page/CollectionPageDefaults";


abstract class CollectionPage extends BaseCrudPage {

    private collectionContainerRef: CollectionContainer | null = null;

    protected renderContent(): any {
        return <div>
            {
                this.renderCollectionContainer()
            }
        </div>
    }

    protected abstract renderCollectionContainer(): any;

    protected setCollectionContainerRef(ref: CollectionContainer | null): void {
        this.collectionContainerRef = ref;
    };

    protected getDataSource(): DataSource<any, any> {
        return this.getOptions().dataSource;
    }

    protected getKeyExtractor(): KeyExtractor {
        return this.getOptions().getKeyExtractor;
    }

    private renderCallback = (optionRender: any, defaultRender: any): any => {
        if (optionRender) {
            return optionRender(this);
        }
        if (defaultRender) {
            return defaultRender(this);
        }
        return undefined;
    };

    protected renderErrorMessage = (): (() => any) | undefined => {
        return this.renderCallback(this.getOptions().renderError, CollectionPageDefaults.renderError);
    };

    protected renderLoading = (): (() => any) | undefined => {
        return this.renderCallback(this.getOptions().renderLoading, CollectionPageDefaults.renderLoading);
    };

    protected renderEmpty = (): (() => any) | undefined => {
        return this.renderCallback(this.getOptions().renderEmpty, CollectionPageDefaults.renderEmpty);
    };

    public getLocalization = () => {
        const localization = this.getOptions().localization ?? {};
        return {
            loading_data: localization.loading_data ?? CollectionPageDefaults.localization.loading_data,
            fail_to_fetch_data: localization.fail_to_fetch_data ?? CollectionPageDefaults.localization.fail_to_fetch_data,
            data_empty: localization.data_empty ?? CollectionPageDefaults.localization.empty_data,
            try_again: localization.try_again ?? CollectionPageDefaults.localization.try_again,
        }
    };

    public getCollectionRef = (): CollectionContainer | null => {
        return this.collectionContainerRef;
    };

    public restart = (): void => {
        this.getCollectionRef()?.startDataFetch();
    }
}

export default CollectionPage;