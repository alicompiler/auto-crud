import {IndexPage} from "./IndexPage";
import {TablePageOptions} from "../../CollectionPage/TablePage/TablePageOptions";

export interface IndexPageOptions extends TablePageOptions {
    noSearch?: boolean;
    onSearch?: (value: string, page: IndexPage) => void;
    searchInputPlaceholder?: string;
    searchInputClassName?: string;

    toolbarActions?: ((page: IndexPage) => any)[];
    toolbarWrapperClassName?: string;
}