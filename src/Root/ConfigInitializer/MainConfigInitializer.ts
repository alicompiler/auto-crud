import {ConfigInitializer} from "./ConfigInitializer";
import {CrudConfig} from "../CrudConfig";

export class MainConfigInitializer implements ConfigInitializer {
    initialize(config: CrudConfig): CrudConfig {
        return {
            routeRoot: `/${config.name}`,
            ...config
        };
    }
}