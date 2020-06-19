import BaseCrudPage from "./Base/BaseCrudPage";
import {ConfirmationOptions} from "./Base/Confirmation/ConfirmationOptions";
import {CrudContextValue} from "../Root/CrudContext";

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

    confirmation?: ConfirmationOptions;

    action?: ActionConfig;

    [propName: string]: any;
}

export interface ActionConfig {
    hideInTable?: boolean;
    hideInPage?: boolean;
    render?: (context: CrudContextValue, page: PageConfig, item: any) => any;
    renderInPage?: (context: CrudContextValue, page: PageConfig, item: any) => any;
    renderInTable?: (context: CrudContextValue, page: PageConfig, item: any) => any;
    handleAction?: (context: CrudContextValue, page: PageConfig, item: any) => void;
    icon?: string;
    text?: string;
    colorClass?: string;
    className?: string;
}