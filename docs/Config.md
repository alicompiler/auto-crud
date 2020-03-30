    
AutoCrud Config
    
    {
        operations: any[];
        pages: any[];
        modals: any[];
        collections: any[];
    }
    
    
Context Config    
    
    {
        config: CrudConfig;
        state: State;
        modals: any;
        updateState: (state: Partial<State>) => Partial<State>;
        setState: (state: State) => State;
    }
    
    
    