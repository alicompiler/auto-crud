import * as React from "react";
import {CrudConfig} from "./Config";
import {DefaultConfigFixer} from "./ConfigFixer/ConfigFixer";
import {UIStateInitializer} from "./UIStateInitializer";

export interface ContextConfig<State = any> {
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

export function getInitialState(config: CrudConfig): Omit<ContextConfig, "updateState"> {
    const updatedConfig = new DefaultConfigFixer(config).fix();
    const uiState = new UIStateInitializer(updatedConfig).initialize();
    return {
        config: updatedConfig,
        ui: uiState,
        state: {
            pageTitle: ''
        }
    }
}

const defaultValue: ContextConfig = undefined as any;

export const CrudContext = React.createContext(defaultValue as any);

