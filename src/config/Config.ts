import {ReactElement} from "react";
import CrudLayoutBase from "../root/CrudLayoutBase";

export interface CrudConfig {
    name: string;
    routeRoot : string;
    operations: any[];
    pages: any[];
    modals: any[];
    collections: any[];

    layout?: () => ReactElement<CrudLayoutBase>;
    indexPage?: () => ReactElement;
}


export interface ContextConfig<State = any> {
    config: CrudConfig;
    state: State;
    modals: any;
    updateState: (payload: Partial<State>) => Partial<State>;
    setState: (state: State) => State;
}