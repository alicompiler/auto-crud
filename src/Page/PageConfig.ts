import BaseCrudPage from "./Base/BaseCrudPage";


export interface PageConfig {
    name?: string;
    route?: string;
    pageComponent?: any;
    // skip used to not include page route in main router switch
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

    [propName: string]: any;
}

