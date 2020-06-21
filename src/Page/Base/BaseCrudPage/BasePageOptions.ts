import BaseCrudPage from "./BaseCrudPage";
import {ConfirmationOptions} from "../Confirmation/ConfirmationOptions";
import {ActionConfig} from "../../PageConfig";

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