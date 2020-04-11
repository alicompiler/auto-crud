import {ContextConfig} from "../../config/CrudContext";
import {SubmitConfig} from "raf-axios-submitter/dist/SubmitConfig"
import {FormPageOptions} from "./FormPageOptions";
import {IFormPageDefaults} from "../../Defaults/Page/FormPageDefaults";

export class SubmitConfigGenerator {
    private readonly context: ContextConfig;
    private readonly options: FormPageOptions;
    private readonly defaults: any;

    constructor(context: ContextConfig, options: FormPageOptions, defaults: IFormPageDefaults,) {
        this.context = context;
        this.options = options;
        this.defaults = defaults ?? {};
    }

    public generate(): SubmitConfig {
        return {
            url: this.getUrl(),
            method: this.defaults.form.httpMethod
        }
    }

    protected getUrl(): string {
        if (this.options.url)
            return this.options.url;
        const urlPostfix = this.options.urlPostfix ?? '';
        return this.context.config.endpointRoot + (`/${urlPostfix}` ?? '');
    }
}