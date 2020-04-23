import {RenderConfig} from "react-auto-form-core/dist/Form/FormProps";
import FormPage from "./FormPage";

export class FormRenderConfigGenerator {

    private readonly formPage: FormPage;

    constructor(formPage: FormPage) {
        this.formPage = formPage;
    }

    public generate(): RenderConfig {
        const options = this.formPage.getOptions();
        if (options.renderConfig)
            return options.renderConfig;

        const fieldsName = options.fields;
        if (fieldsName) {
            return fieldsName.map(field => {
                if (Array.isArray(field)) {
                    return field.map(fieldInArr => this.getFieldByName(fieldInArr));
                }
                return this.getFieldByName(field);
            });
        }

        return this.getAllFields();
    }

    protected getAllFields = () => {
        const context = this.formPage.getContext();
        return context.config.fields;
    };

    protected getFieldByName = (name: string) => {
        for (let field of this.getAllFields()) {
            if (field.name === name)
                return field;
        }
        throw Error(`Field '${name}' doesn't exists`);
    }
}