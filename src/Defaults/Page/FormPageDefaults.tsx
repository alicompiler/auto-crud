import IForm from "react-auto-form-core/dist/Form/IForm";
import * as React from "react";
import FormPage from "../../Page/FormPage/FormPage";
import FormPageSuccessComponent from "./Components/FormPageSuccessComponent";
import FormPageErrorComponent from "./Components/FormPageErrorComponent";
import DeletePage from "../../Page/CrudPage/DeletePage/CrudDeletePage";
import FieldConfig from "react-auto-form-core/dist/Field/FieldConfig";
import TextField from "raf-tailwind-components/dist/TextField/TextField";

export interface IFormPageDefaults {
    confirmationCodeNodeClassName: string;
    confirmationCodeLength: number;
    confirmationFormWrapperClassName: string;
    confirmationMessageClassName: string;
    renderDeleteMessage: (page: DeletePage) => any;

    renderLoading: ((page: FormPage) => any);
    renderError: ((page: FormPage) => any);
    renderSuccess: ((page: FormPage) => any);

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
    defaultConfirmationField: () => FieldConfig;

    renderConfirmationCode: (code: string) => any;
}

export const FormPageDefault: IFormPageDefaults = {


    renderDeleteMessage: (page) => {
        const loading = page.getState().deleting;
        return <div className={'mb-4'}>
            <p className={'text-xl font-bold'}>{FormPageDefault.localization.are_you_sure_of_delete}</p>
            <button disabled={loading} onClick={() => page.handleDelete()}
                    className={'rounded py-2 px-4 bg-red-400'}>{FormPageDefault.localization.delete}</button>
            <button disabled={loading} onClick={() => page.navigateToHome()}
                    className={'rounded py-2 px-4 bg-gray-400'}>{FormPageDefault.localization.cancel}</button>
        </div>
    },

    renderLoading: () => <div>TODO : Horizontal Loading Progress</div>,
    renderError: page => <FormPageErrorComponent page={page}/>,
    renderSuccess: page => <FormPageSuccessComponent page={page}/>,

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
    },
    defaultConfirmationField: () => ({
        name: 'confirmation',
        as: TextField,
        placeholder: FormPageDefault.localization.confirmation
    }),
    confirmationFormWrapperClassName: 'my-4 w-full',
    confirmationMessageClassName: 'text-xl my-2',
    confirmationCodeLength: 6,
    confirmationCodeNodeClassName: 'p-2 rounded bg-red-400 text-white',
    renderConfirmationCode: (code) => <span className={FormPageDefault.confirmationCodeNodeClassName}>{code}</span>
};