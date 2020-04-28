import {ProgressIndicator} from "../components/ProgressIndicator/ProgressIndicator";
import React from "react";
import {ErrorMessageComponent} from "../components/ErrorMessageComponent/ErrorMessageComponent";
import {DefaultDeleteMessageComponent} from "../Defaults/Components/DefaultDeleteMessageComponent";
import {SuccessMessageComponent} from "../components/SuccessMessageComponent/SuccessMessageComponent";

export interface IAutoCrudDefaults {
    classNames: {
        main_action: string;
        cancel_action: string;
        delete_action: string;
    };

    localization: {
        confirmation_fail_message: string;


        fail_to_delete_message: string;
        are_you_sure_of_delete: string;
        delete_success_message: string;


        cancel: string;
        delete: string;
        main: string;
    };


    components: {
        deleteMessage: (props: any) => any;
        progressIndicator: (props?: any) => any;
        errorMessage: (props?: any) => any;
        successMessage: (props?: any) => any;
    };
}

export const AutoCrudDefaults: IAutoCrudDefaults = {
    localization: {
        confirmation_fail_message: 'confirmation code is not correct',
        fail_to_delete_message: 'delete action failed, check your internet connection and try again',
        are_you_sure_of_delete: 'are you sure of the delete action?',
        delete_success_message: 'data has been deleted!',
        cancel: 'Cancel',
        delete: 'Delete',
        main: 'Main'
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
    }
}