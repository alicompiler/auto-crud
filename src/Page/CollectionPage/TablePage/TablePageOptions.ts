import {CollectionPageOptions} from "../CollectionPageOptions";
import {Column} from "auto-collection/src/Config/Table/Column";

export interface TablePageOptions extends CollectionPageOptions {
    orderBy? : string[] | ((columns: Column[]) => string[]);
    extraColumns? : any[];
}