import {BasePageOptions} from "../../PageConfig";
import {AxiosRequestConfig} from "axios";
import DeletePage from "./CrudDeletePage";

export interface DeletePageOptions extends BasePageOptions {
    deleteRequest?: {
        method?: "get" | "post" | "delete" | "put" | "patch";
        url?: string | (() => string);
        requestConfig?: AxiosRequestConfig;
    };

    confirmationRequired?: boolean;
    generateConfirmationCode?: (page: DeletePage) => string | null;
    codeLength? : number;
}