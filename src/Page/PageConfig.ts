import BaseCrudPage from "./Base/BaseCrudPage/BaseCrudPage";
import {BasePageOptions} from "./Base/BaseCrudPage/BasePageOptions";

export interface PageConfig {
    name?: string;
    route?: string;
    pageComponent?: any;
    skip?: boolean;
    options?: BasePageOptions;
    toolbar?: ((page: BaseCrudPage) => any) | null
}

