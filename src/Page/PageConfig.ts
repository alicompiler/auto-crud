import BaseCrudPage from "./Base/BaseCrudPage/BaseCrudPage";
import {CrudContextValue} from "../Root/CrudContext";
import {BasePageOptions} from "./Base/BaseCrudPage/BasePageOptions";

export interface PageConfig {
    name?: string;
    route?: string;
    pageComponent?: any;
    skip?: boolean;
    options?: BasePageOptions;
    toolbar?: ((page: BaseCrudPage) => any) | null
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