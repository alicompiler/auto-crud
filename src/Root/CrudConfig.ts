import FieldConfig from "react-auto-form-core/dist/Field/FieldConfig";
import {PageConfig} from "../Page/PageConfig";

export interface CrudConfig {
    name: string;
    endpointRoot: string;
    routeRoot: string;
    pages?: PageConfig[];
    indexPage?: PageConfig;
    createPage?: PageConfig;
    updatePage?: PageConfig;
    deletePage?: PageConfig;
    detailsPage?: PageConfig;


    mainTitle?: string;
    fields: FieldConfig[];
    layout?: () => any;
    header?: () => any;
}




