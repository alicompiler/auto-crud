import React from 'react';
import {AxiosDataSource, CollectionContainer, DataSource, IndexedKeyExtractor, KeyExtractor} from "auto-collection";
import BaseCrudPage from "../Base/BaseCrudPage";
import {CollectionPageOptions} from "./CollectionPageOptions";
import {AutoCrudDefaults} from "../../Defaults/AutoCrudDefaults";


abstract class CollectionPage extends BaseCrudPage {

    private collectionContainerRef: CollectionContainer | null = null;

    public renderContent(): any {
        return <div className={'__collection-page'}>
            {
                this.renderCollectionContainer()
            }
        </div>
    }

    protected abstract renderCollectionContainer(): any;

    public setCollectionContainerRef(ref: CollectionContainer | null): void {
        this.collectionContainerRef = ref;
    };

    public getCollectionContainerRef = (): CollectionContainer | null => {
        return this.collectionContainerRef;
    };

    public getDataSource(): DataSource<any, any> {
        if (this.getOptions().dataSource)
            return this.getOptions().dataSource!(this);
        return this.getDefaultDataSource();
    }

    protected getDefaultDataSource(): DataSource<any, any> {
        const overrideOptions = this.getOptions().dataSourceOptions ?? {};
        return new AxiosDataSource({
            method: AutoCrudDefaults.httpMethods.collectionRequest as any,
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

        return this.getDefaultDataSourceUrl();
    }

    protected getDefaultDataSourceUrl(): string {
        return this.getContext().config.endpointRoot;
    }

    public getKeyExtractor(): KeyExtractor {
        const keyExtractor = this.getOptions().keyExtractor;
        if (keyExtractor)
            return keyExtractor;
        return this.getDefaultKeyExtractor();
    }

    protected getDefaultKeyExtractor(): KeyExtractor {
        return new IndexedKeyExtractor();
    }

    public renderErrorMessage = (): any => {
        const customRender = this.getOptions().renderErrorMessage;
        if (customRender) {
            return customRender(this);
        }
        return AutoCrudDefaults.components.errorMessage({
            message: this.getLocalization().fail_to_fetch_data,
            action: {
                text: this.getLocalization().try_again,
                onClick: () => this.restart(),
            }
        })
    };

    public renderLoading = (): any => {
        const customRender = this.getOptions().renderLoading;
        if (customRender) {
            return customRender(this);
        }
        return AutoCrudDefaults.components.progressIndicator()
    };

    public renderEmpty = (): any => {
        const customRender = this.getOptions().renderEmpty;
        if (customRender) {
            return customRender(this);
        }
        return AutoCrudDefaults.components.emptyMessage({
            message: this.getLocalization().data_empty,
            action: {
                onClick: () => this.restart(),
                text: this.getLocalization().refresh
            }
        });
    };

    public getLocalization = () => {
        const localization = this.getOptions().localization ?? {};
        return {
            loading_data: localization.loading_data ?? AutoCrudDefaults.localization.loading_data,
            fail_to_fetch_data: localization.fail_to_fetch_data ?? AutoCrudDefaults.localization.fail_to_fetch_data,
            data_empty: localization.data_empty ?? AutoCrudDefaults.localization.data_empty,
            try_again: localization.try_again ?? AutoCrudDefaults.localization.try_again,
            refresh: localization.refresh ?? AutoCrudDefaults.localization.refresh,
        }
    };

    public restart = (): void => {
        this.getCollectionContainerRef()?.startDataFetch();
    }

    public getOptions(): CollectionPageOptions {
        return super.getOptions();
    }
}

export default CollectionPage;