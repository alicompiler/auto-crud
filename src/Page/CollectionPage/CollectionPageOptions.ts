import {PageOption} from "../../config/Config";
import {KeyExtractor} from "auto-collection";

export interface CollectionPageOptions extends PageOption {
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