import {IndexPage} from "./IndexPage";
import {TablePageOptions} from "../../CollectionPage/TablePage/TablePageOptions";

export interface IndexPageOptions extends TablePageOptions {
    onSearch?: (value: string, page: IndexPage) => void;
    toolbarActions?: ((page: IndexPage) => any)[];
    searchInputPlaceholder?: string;
    noSearch?: boolean;
    searchInputClassName?: string;
    toolbarWrapperClassName?: string;
}