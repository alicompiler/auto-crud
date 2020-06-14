import {AxiosRequestConfig} from "axios";
import {ConfirmationPageOptions} from "../../Base/ConfirmationPageOptions";
import DeletePage from "./CrudDeletePage";

export interface DeletePageOptions extends ConfirmationPageOptions {
    deleteRequest?: {
        method?: "get" | "post" | "delete" | "put" | "patch";
        url?: string | (() => string);
        requestConfig?: AxiosRequestConfig;
    };

    keyValueProps?: any;

    renderMessage?: (page: DeletePage) => any;
    renderNoItem?: (page: DeletePage) => any;

}