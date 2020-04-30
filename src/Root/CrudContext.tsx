import * as React from "react";
import {CrudConfig} from "./CrudConfig";

export interface CrudContextValue<State = any> {
    config: CrudConfig;
    state: State;
    updateState: (payload: Partial<State>, afterCallback?: (state: any) => void) => void;
    updatePageOptions: (pageName: string, options: any, afterUpdateCallback?: () => void) => void;
    getState: () => any;
}

export interface UIState {
    pages: {
        [pageName: string]: any;
    };
    modals: {
        [modalName: string]: any;
    };
}

const defaultValue: CrudContextValue = undefined as any;
export const CrudContext = React.createContext(defaultValue as any);

