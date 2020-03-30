export interface CrudConfig {
    operations: any[];
    pages: any[];
    modals: any[];
    collections: any[];
}


export interface ContextConfig<State = any> {
    config: CrudConfig;
    state: State;
    modals: any;
    updateState: (payload: Partial<State>) => Partial<State>;
    setState: (state: State) => State;
}