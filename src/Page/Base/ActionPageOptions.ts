import {ActionPage} from "./ActionPage";
import {BasePageOptions} from "../PageConfig";
import {HttpMethod} from "../../Defaults/DefaultsHttpMethod";
import {AxiosRequestConfig} from "axios";

export interface ActionPageOptions extends BasePageOptions {
    handleAction?: (page: ActionPage) => Promise<any>;
    errorMessage?: string;
    successMessage?: string;
    renderNoItem?: (page : ActionPage) => any;
    renderAfterMessage?: (item: any, page: ActionPage) => any;
    httpRequest?: {
        method?: HttpMethod,
        config?: AxiosRequestConfig,
        url?: string | (() => string);
    }

    keyValueProps?: any;
}