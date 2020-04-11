import IForm from "react-auto-form-core/dist/Form/IForm";
import * as React from "react";

export interface IFormPageDefaults {
    form: {
        renderOptions: {
            form: {
                renderButton: (form: IForm) => any;
            }
        },
        httpMethod: "get" | "post" | "put" | "patch" | "delete"
    }
    localization: {
        save: string;
    }
}

export const FormPageDefault: IFormPageDefaults = {
    form: {
        renderOptions: {
            form: {
                renderButton: form => <button className='rounded px-8 py-4' onClick={form.submit}>
                    {FormPageDefault.localization.save}
                </button>
            }
        },
        httpMethod: "post"
    },
    localization: {
        save: 'Save'
    }
};