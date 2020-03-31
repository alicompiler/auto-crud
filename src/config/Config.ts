import {ReactElement} from "react";
import CrudLayoutBase from "../root/CrudLayoutBase";


export interface PageConfigComponent {
    as: any
}

export interface PageConfig {
    name?: string;
    route?: string;
    pageComponent?: PageConfigComponent;
    skip?: boolean;
    options?: any;
}


export interface CrudConfig {
    name: string;
    routeRoot: string;
    operations: any[];
    pages?: PageConfig[];
    indexPage?: PageConfig;
    createPage?: PageConfig;
    editPage?: PageConfig;
    deletePage?: PageConfig;

    modals: any[];
    collections: any[];

    layout?: () => ReactElement<CrudLayoutBase>;
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