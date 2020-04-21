import {SubmitConfig} from "raf-axios-submitter/dist/SubmitConfig"
import FormPage from "./FormPage";

export class BaseSubmitConfigGenerator {

    private readonly formPage: FormPage;

    constructor(formPage: FormPage) {
        this.formPage = formPage;
    }

    public generate(): SubmitConfig {
        const pageOptions = this.formPage.getOptions();

        if (pageOptions.submitConfig) {
            return pageOptions.submitConfig;
        }

        const overrideConfig = pageOptions.overrideSubmitConfig ?? {};
        const httpMethod = this.formPage.getDefaultHttpMethod();
        const defaultSubmitConfig = this.formPage.getDefaultSubmitConfig();

        return {
            url: this.getUrl(),
            method: httpMethod,
            ...defaultSubmitConfig,
            ...overrideConfig
        }
    }

    protected getUrl(): string {
        const options = this.formPage.getOptions();
        const context = this.formPage.getContext();

        if (options.url) {
            const url = options.url;
            if (typeof url === "string")
                return `${context.config.endpointRoot}${url}`;
            if (typeof url === "function")
                return url(context);
        }
        const urlPostfix = options.urlPostfix ?? '';
        return context.config.endpointRoot + urlPostfix;
    }
}