import {CrudContextValue} from "../../Root/CrudContext";
import {FormPageOptions} from "./FormPageOptions";
import {RenderConfig} from "react-auto-form-core/dist/Form/FormProps";

export class FormRenderConfigGenerator {
    private readonly context: CrudContextValue;
    private readonly options: FormPageOptions;

    constructor(context: CrudContextValue, options: FormPageOptions) {
        this.context = context;
        this.options = options;
    }

    public generate(): RenderConfig {
        if (this.options.renderConfig)
            return this.options.renderConfig;

        const fieldsName = this.options.fields;
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
        return this.context.config.fields;
    };

    protected getFieldByName = (name: string) => {
        for (let field of this.getAllFields()) {
            if (field.name === name)
                return field;
        }
        throw Error(`Field '${name}' doesn't exists`);
    }
}