import {ProgressIndicator} from "../components/ProgressIndicator/ProgressIndicator";
import React from "react";
import {ErrorMessageComponent} from "../components/ErrorMessageComponent/ErrorMessageComponent";
import {DefaultDeleteMessageComponent} from "../Defaults/Components/DefaultDeleteMessageComponent";
import {SuccessMessageComponent} from "../components/SuccessMessageComponent/SuccessMessageComponent";
import FieldConfig from "react-auto-form-core/dist/Field/FieldConfig";
import TextField from "raf-tailwind-components/dist/TextField/TextField";

export interface IAutoCrudDefaults {
    classNames: {
        main_action: string;
        cancel_action: string;
        delete_action: string;
    };

    localization: {
        confirmation_fail_message: string;
        confirmation_message: string;

        fail_to_delete_message: string;
        are_you_sure_of_delete: string;
        delete_success_message: string;


        cancel: string;
        delete: string;
        main: string;
        confirmation: string;
    };


    components: {
        deleteMessage: (props: any) => any;
        progressIndicator: (props?: any) => any;
        errorMessage: (props?: any) => any;
        successMessage: (props?: any) => any;
    };

    confirmation: {
        messageClassName: string;
        formWrapperClassName: string;
        codeLength: number;
        characters: string;

        field: () => FieldConfig;
        renderConfirmationCodeElement: (code: string | null) => any;
        confirmationCodeElementClassName: string;
    }
}

export const AutoCrudDefaults: IAutoCrudDefaults = {
    localization: {
        confirmation_fail_message: 'confirmation code is not correct',
        confirmation_message: 'enter confirmation code',
        fail_to_delete_message: 'delete action failed, check your internet connection and try again',
        are_you_sure_of_delete: 'are you sure of the delete action?',
        delete_success_message: 'data has been deleted!',
        cancel: 'Cancel',
        delete: 'Delete',
        main: 'Main',
        confirmation: 'Confirmation'
    },
    classNames: {
        main_action: 'rounded py-2 px-4 bg-gray-700 text-white',
        cancel_action: 'rounded py-2 px-4 bg-gray-200 text-black',
        delete_action: 'rounded py-2 px-4 bg-red-400 text-white',
    },


    components: {
        deleteMessage: (props: any) => <DefaultDeleteMessageComponent disabled={props.disabled}
                                                                      handleCancel={props.handleCancel}
                                                                      handleDelete={props.handleDelete}/>,
        progressIndicator: (props: any = {}) => <ProgressIndicator {...props}/>,
        errorMessage: (props: any = {}) => <ErrorMessageComponent {...props} />,
        successMessage: (props: any = {}) => <SuccessMessageComponent {...props}/>
    },
    confirmation: {
        characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        formWrapperClassName: 'my-4 w-4/12',
        messageClassName: 'text-xl my-2',
        codeLength: 6,
        field: () => ({
            name: 'confirmation',
            as: TextField,
            placeholder: AutoCrudDefaults.localization.confirmation
        }),
        confirmationCodeElementClassName: 'p-2 rounded bg-blue-200 text-black mx-2',
        renderConfirmationCodeElement: (code: string | null) => <span
            className={AutoCrudDefaults.confirmation.confirmationCodeElementClassName}>{code}</span>
    },
}