import {CrudConfig} from "../CrudConfig";
import {MainConfigInitializer} from "./MainConfigInitializer";
import {DefaultPageConfigModifier} from "../../Page/PageConfigModifier/DefaultPageConfigModifier";
import {DefaultPageOptionsModifier} from "../../Page/PageConfigModifier/DefaultPageOptionsModifier";

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
        console.log(config);
        config = new DefaultPageConfigModifier(config).modify();
        console.log(config);
        config = new DefaultPageOptionsModifier(config).modify();
        console.log(config);
        return config;
    }
}


