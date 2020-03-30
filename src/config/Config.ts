import {ReactElement} from "react";
import CrudLayoutBase from "../root/CrudLayoutBase";
import CrudPage from "../page/CrudPage";


export interface PageConfig {
    name?: string;
    route?: string;
    pageComponent?: () => ReactElement<CrudPage>;
    skip?: boolean;
}


export interface CrudConfig {
    name: string;
    routeRoot: string;
    operations: any[];
    pages?: PageConfig[];
    createPage?: PageConfig;
    editPage?: PageConfig;
    deletePage?: PageConfig;

    modals: any[];
    collections: any[];

    layout?: () => ReactElement<CrudLayoutBase>;
    indexPage?: () => ReactElement;
}


interface ModalState {
    open: boolean;
}

export interface ContextConfig<State = any> {
    config: CrudConfig;
    state: State;
    modals: {
        [modalName: string]: ModalState
    };
    updateState: (payload: Partial<State>) => Partial<State>;
    setState: (state: State) => State;
}