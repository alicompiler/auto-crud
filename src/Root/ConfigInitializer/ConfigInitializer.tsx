import {CrudConfig} from "../CrudConfig";
import {PageConfigInitializer} from "./PageConfigInitializer";
import {MainConfigInitializer} from "./MainConfigInitializer";

export interface ConfigInitializer {
    initialize(config: CrudConfig): CrudConfig;
}

export class DefaultConfigInitializer {
    private readonly config: CrudConfig;
    private readonly fixers: ConfigInitializer[];

    constructor(config: CrudConfig) {
        this.config = config;
        this.fixers = [
            new MainConfigInitializer(),
            new PageConfigInitializer()
        ];
    }

    public initialize() {
        return this.fixers.reduce(
            (accumulator: any, fixer: ConfigInitializer) => ({...accumulator, ...fixer.initialize(accumulator)}),
            {...this.config}
        );
    }
}


