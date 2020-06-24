import {CrudContextValue} from "../../../Root/CrudContext";
import {PageConfig} from "../../PageConfig";

export interface ActionConfig {
    hideInTable?: boolean;
    hideInPage?: boolean;
    render?: (context: CrudContextValue, page: PageConfig, item: any) => any;
    renderInPage?: (context: CrudContextValue, page: PageConfig, item: any) => any;
    renderInTable?: (context: CrudContextValue, page: PageConfig, item: any) => any;
    handleAction?: (context: CrudContextValue, page: PageConfig, item: any) => void;
    icon?: string;
    text?: string;
    actionClassName?: string;
}