import {AxiosFetchOption, DataSource, KeyExtractor} from "auto-collection";
import CollectionPage from "./CollectionPage";
import {BasePageOptions} from "../Base/BaseCrudPage/BasePageOptions";

export interface CollectionPageOptions extends BasePageOptions {
    onFetchFail?: () => void;
    onFetchStart?: () => void;
    onFetchDone?: () => void;
    renderErrorMessage?: (page: CollectionPage) => any;
    renderLoading?: (page: CollectionPage) => any;
    renderEmpty?: (page: CollectionPage) => any;
    keyExtractor?: KeyExtractor;
    renderOptionsConfig?: any;

    dataSource?: (page: CollectionPage) => DataSource<any, any>;
    dataSourceUrl?: string | ((page: CollectionPage) => string);
    dataSourceOptions?: AxiosFetchOption;

    collectionRenderOptions?: any;

    localization?: {
        loading_data?: string;
        fail_to_fetch_data?: string;
        data_empty?: string;
        try_again?: string;
        refresh?: string;
    }
}