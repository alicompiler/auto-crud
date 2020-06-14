import {AxiosRequestConfig} from "axios";
import {ConfirmationOptions} from "../../Base/Confirmation/ConfirmationOptions";

export interface DeletePageOptions extends ConfirmationOptions {
    deleteRequest?: {
        method?: "get" | "post" | "delete" | "put" | "patch";
        url?: string | (() => string);
        requestConfig?: AxiosRequestConfig;
    };

}