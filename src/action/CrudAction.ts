export interface CrudAction<T = any, O = any> {
    execute(): Promise<T>;

    getOptions(): O;
}

