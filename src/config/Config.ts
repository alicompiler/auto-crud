import {ReactElement} from "react";
import CrudLayoutBase from "../root/CrudLayoutBase";
import BaseCrudPage from "../Page/Base/BaseCrudPage";
import FieldConfig from "react-auto-form-core/dist/Field/FieldConfig";

export interface PageConfigComponent {
    as: any
}

export interface PageOption {
    onLoadAction?: (page: BaseCrudPage) => Promise<any>;
    afterOnLoadAction?: (result: any, page: BaseCrudPage) => void;
    onDestroyAction?: (page: BaseCrudPage) => void;

    initialState?: any;
    pageTitle?: string;

    [propName: string]: any;
}

export interface PageConfig {
    name?: string;
    route?: string;
    pageComponent?: PageConfigComponent;
    skip?: boolean;
    options?: PageOption;
}


export interface CrudConfig {
    name: string;
    endpointRoot: string;
    routeRoot: string;
    operations: any[];
    pages?: PageConfig[];
    indexPage?: PageConfig;
    createPage?: PageConfig;
    editPage?: PageConfig;
    deletePage?: PageConfig;

    modals: any[];
    collections: any[];

    mainTitle?: string;

    fields: FieldConfig[];

    layout?: () => ReactElement<CrudLayoutBase>;
    header?: () => any;
}




