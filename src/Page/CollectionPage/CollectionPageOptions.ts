import {KeyExtractor} from "auto-collection";
import {BasePageOptions} from "../PageConfig";

export interface CollectionPageOptions extends BasePageOptions {
    onFetchFail?: () => void;
    onFetchStart?: () => void;
    onFetchDone?: () => void;
    renderErrorMessage?: () => any;
    renderLoading?: () => any;
    renderEmpty?: () => any;
    keyExtractor?: KeyExtractor;
    renderOptionsConfig?: any;
    collectionRenderOptions?: any;
}