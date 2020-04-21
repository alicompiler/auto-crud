import React from 'react';
import {AxiosDataSource, CollectionContainer, DataSource, IndexedKeyExtractor, KeyExtractor} from "auto-collection";
import BaseCrudPage from "../Base/BaseCrudPage";
import {CollectionPageDefaults} from "../../Defaults/Page/CollectionPageDefaults";
import {CollectionPageOptions} from "./CollectionPageOptions";


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

    public getDataSource(): DataSource<any, any> {
        if (this.getOptions().dataSource)
            return this.getOptions().dataSource!(this);
        return this.getDefaultDataSource();
    }

    protected getDefaultDataSource(): DataSource<any, any> {
        const overrideOptions = this.getOptions().dataSourceOptions ?? {};
        return new AxiosDataSource({
            method: 'get',
            url: this.getDataSourceUrl(),
            ...overrideOptions
        });
    }

    protected getDataSourceUrl(): string {
        const url = this.getOptions().dataSourceUrl;
        if (typeof url === "string")
            return `${this.getContext().config.endpointRoot}${url}`;
        else if (typeof url === "function")
            return url(this);

        return this.getUrlWhenNoAnyMatchFound();
    }

    protected getUrlWhenNoAnyMatchFound(): string {
        return this.getContext().config.endpointRoot;
    }

    public getKeyExtractor(): KeyExtractor {
        const keyExtractor = this.getOptions().keyExtractor;
        if (keyExtractor)
            return keyExtractor;
        return new IndexedKeyExtractor();
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

    public renderErrorMessage = (): (() => any) | undefined => {
        return this.renderCallback(this.getOptions().renderError, CollectionPageDefaults.renderError);
    };

    public renderLoading = (): (() => any) | undefined => {
        return this.renderCallback(this.getOptions().renderLoading, CollectionPageDefaults.renderLoading);
    };

    public renderEmpty = (): (() => any) | undefined => {
        return this.renderCallback(this.getOptions().renderEmpty, CollectionPageDefaults.renderEmpty);
    };

    public getLocalization = () => {
        const localization = this.getOptions().localization ?? {};
        return {
            loading_data: localization.loading_data ?? CollectionPageDefaults.localization.loading_data,
            fail_to_fetch_data: localization.fail_to_fetch_data ?? CollectionPageDefaults.localization.fail_to_fetch_data,
            data_empty: localization.data_empty ?? CollectionPageDefaults.localization.data_empty,
            try_again: localization.try_again ?? CollectionPageDefaults.localization.try_again,
        }
    };

    public getCollectionRef = (): CollectionContainer | null => {
        return this.collectionContainerRef;
    };

    public restart = (): void => {
        this.getCollectionRef()?.startDataFetch();
    }

    public getOptions(): CollectionPageOptions {
        return super.getOptions();
    }
}

export default CollectionPage;