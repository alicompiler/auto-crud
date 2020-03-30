import {CrudConfig} from "../Config";
import {PageConfigFixer} from "./PageConfigFixer";

export interface ConfigFixer {
    fix(config: CrudConfig): CrudConfig;
}

export class DefaultConfigFixer {
    private readonly config: CrudConfig;
    private readonly fixers: ConfigFixer[];

    constructor(config: CrudConfig) {
        this.config = config;
        this.fixers = [
            new PageConfigFixer()
        ];
    }

    public fix() {
        let config = {...this.config};
        for (let fixer of this.fixers) {
            config = {...config, ...fixer.fix(this.config)};
        }
        return config;
    }
}


