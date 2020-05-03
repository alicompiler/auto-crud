import IForm from "react-auto-form-core/dist/Form/IForm";
import * as React from "react";

export interface IFormPageDefaults {


    form: {
        buttonExtraClasses: string;
        buttonColoring: string;
        buttonClassName: () => string;
        renderOptions: {
            form?: {
                buttonText?: string;
                renderButton?: (form: IForm) => any;
            }
        },
        httpMethod: "get" | "post" | "put" | "patch" | "delete",
        methods: {
            create: "get" | "post" | "put" | "patch" | "delete",
            update: "get" | "post" | "put" | "patch" | "delete",
            delete: "get" | "post" | "put" | "patch" | "delete",
        }
    }
    localization: {
        save: string;
        loading_message: string;
        error_message: string;
        success_message: string;
        are_you_sure_of_delete: string;
        delete: string;
        cancel: string;
        confirmation: string;
        confirmation_message: string;
    },
    titles: {
        create_page: string;
        update_page: string;
        delete_page: string;
    };
}

export const FormPageDefault: IFormPageDefaults = {

    form: {
        buttonExtraClasses: '',
        buttonColoring: 'bg-gray-400 text-gray-900',
        buttonClassName: () => `rounded px-4 py-2 w-24 border text-lg
                          hover:text-xl hover:font-bold 
                          transition duration-500 ease-in-out 
                          disabled:bg-gray-100 disabled:text-gray-400 
                          ${FormPageDefault.form.buttonColoring} ${FormPageDefault.form.buttonExtraClasses}`,
        renderOptions: {
            form: {

                renderButton: form => <div className={'p-2'}>
                    <button disabled={form.isLoading()}
                            className={FormPageDefault.form.buttonClassName()}
                            onClick={() => {
                                if (form.validate())
                                    form.submit();
                            }}>
                        {FormPageDefault.localization.save}
                    </button>
                </div>
            }
        },
        httpMethod: "post",
        methods: {
            create: 'post',
            delete: 'delete',
            update: 'put',
        }
    },
    localization: {
        save: 'Save',
        error_message: 'Operation Failed',
        loading_message: 'Loading...',
        success_message: 'Done Successfully',
        are_you_sure_of_delete: 'Are sure of the delete action ?',
        delete: 'Delete',
        cancel: 'Cancel',
        confirmation: 'Confirmation',
        confirmation_message: 'Enter Confirmation Code'
    },
    titles: {
        create_page: 'Create',
        delete_page: 'Delete',
        update_page: 'Edit',
    }
};