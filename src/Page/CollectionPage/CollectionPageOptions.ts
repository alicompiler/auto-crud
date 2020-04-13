import {AxiosFetchOption, DataSource, KeyExtractor} from "auto-collection";
import {BasePageOptions} from "../PageConfig";
import CollectionPage from "./CollectionPage";

export interface CollectionPageOptions extends BasePageOptions {
    onFetchFail?: () => void;
    onFetchStart?: () => void;
    onFetchDone?: () => void;
    renderErrorMessage?: () => any;
    renderLoading?: () => any;
    renderEmpty?: () => any;
    keyExtractor?: KeyExtractor;
    renderOptionsConfig?: any;

    dataSource?: (page: CollectionPage) => DataSource<any, any>;
    dataSourceUrl?: string | ((page: CollectionPage) => string);
    dataSourceOptions?: AxiosFetchOption;

    collectionRenderOptions?: any;
}