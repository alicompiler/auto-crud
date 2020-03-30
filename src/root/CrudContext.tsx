import * as React from "react";
import {ContextConfig, CrudConfig} from "../config/Config";
import {DefaultConfigFixer} from "../config/ConfigFixer/ConfigFixer";

export function getInitialState(config: CrudConfig, setState: (payload: any) => any): ContextConfig {

    const updateState = (payload: any) => setState({...payload});

    return {
        config: new DefaultConfigFixer(config).fix(),
        modals: {},
        state: {},
        updateState: updateState,
        setState: setState,
    }
}

const defaultValue: ContextConfig = undefined as any;

export const CrudContext = React.createContext(defaultValue);

