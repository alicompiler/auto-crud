import {AxiosRequestConfig} from "axios";
import {ConfirmationPageOptions} from "../../Base/ConfirmationPageOptions";

export interface DeletePageOptions extends ConfirmationPageOptions {
    deleteRequest?: {
        method?: "get" | "post" | "delete" | "put" | "patch";
        url?: string | (() => string);
        requestConfig?: AxiosRequestConfig;
    };

}