import * as React from "react";
import {CrudConfig} from "./CrudConfig";
import {DefaultConfigInitializer} from "./ConfigInitializer/ConfigInitializer";
import {UIStateInitializer} from "./ConfigInitializer/UIStateInitializer";

export interface CrudContextValue<State = any> {
    config: CrudConfig;
    state: State;
    ui: UIState;
    updateState: (payload: Partial<State>) => void;
}

export interface UIState {
    pages: {
        [pageName: string]: any;
    };
    modals: {
        [modalName: string]: any;
    };
}

export function getInitialState(config: CrudConfig): Omit<CrudContextValue, "updateState"> {
    const updatedConfig = new DefaultConfigInitializer(config).initialize();
    const uiState = new UIStateInitializer(updatedConfig).initialize();
    return {
        config: updatedConfig,
        ui: uiState,
        state: {
            pageTitle: ''
        }
    }
}

const defaultValue: CrudContextValue = undefined as any;
export const CrudContext = React.createContext(defaultValue as any);

