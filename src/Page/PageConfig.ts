import BaseCrudPage from "./Base/BaseCrudPage";
import {ConfirmationOptions} from "./Base/Confirmation/ConfirmationOptions";

export interface PageConfig {
    name?: string;
    route?: string;
    pageComponent?: any;
    skip?: boolean;
    options?: BasePageOptions;
    toolbar?: ((page: BaseCrudPage) => any) | null
}

export interface BasePageOptions {

    onLoadAction?: (page: BaseCrudPage) => Promise<any>;
    afterOnLoadAction?: (result: any, page: BaseCrudPage) => void;
    onDestroyAction?: (page: BaseCrudPage) => void;

    initialState?: any;
    pageTitle?: string;

    confirmation? : ConfirmationOptions;

    [propName: string]: any;
}
