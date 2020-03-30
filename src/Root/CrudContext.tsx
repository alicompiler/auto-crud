import * as React from "react";
import {ContextConfig, CrudConfig} from "../config/Config";

export function getInitialState(config: CrudConfig, setState: (payload: any) => any): ContextConfig {

    const updateState = (payload: any) => setState({...payload});

    return {
        config: config,
        modals: {},
        state: {},
        updateState: updateState,
        setState: setState,
    }
}

const defaultValue: ContextConfig = undefined as any;
export const CrudContext = React.createContext(defaultValue);

