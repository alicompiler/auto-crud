import {AxiosRequestConfig} from "axios";
import DeletePage from "./CrudDeletePage";
import {BasePageOptions} from "../../PageConfig";

export interface DeletePageOptions extends BasePageOptions {
    deleteRequest?: {
        method?: "get" | "post" | "delete" | "put" | "patch";
        url?: string | (() => string);
        requestConfig?: AxiosRequestConfig;
    };

    keyValueProps?: any;

    renderMessage?: (page: DeletePage) => any;
    renderNoItem?: (page: DeletePage) => any;

}