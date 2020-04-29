import {CrudConfig} from "../CrudConfig";
import {MainConfigInitializer} from "./MainConfigInitializer";
import {DefaultPageConfigModifier} from "../../Page/PageConfigModifier/DefaultPageConfigModifier";

export interface ConfigInitializer {
    initialize(config: CrudConfig): CrudConfig;
}

export class DefaultConfigInitializer {
    private readonly config: CrudConfig;

    constructor(config: CrudConfig) {
        this.config = config;
    }

    public initialize() {
        let config = this.config;
        config = new MainConfigInitializer().initialize(config);
        config = new DefaultPageConfigModifier(config).modify();
        return config;
    }
}


