import {ProgressIndicator} from "../components/ProgressIndicator/ProgressIndicator";
import React from "react";
import {ErrorMessageComponent} from "../components/ErrorMessageComponent/ErrorMessageComponent";
import {DefaultDeleteMessageComponent} from "../Defaults/Components/DefaultDeleteMessageComponent";

export interface IAutoCrudDefaults {
    classNames: {
        main_action: string;
        cancel_action: string;
        delete_action: string;
    };
    progressIndicator: () => any;
    errorMessage: (props: any) => any;

    localization: {
        confirmation_fail_message: string;
        fail_to_delete_message: string;
        are_you_sure_of_delete: string;

        cancel: string;
        delete: string;
    };


    components: {
        deleteMessage: (props: any) => any;
    };
}

export const AutoCrudDefaults: IAutoCrudDefaults = {
    progressIndicator: () => <ProgressIndicator/>,
    errorMessage: props => <ErrorMessageComponent {...props} />,

    localization: {
        confirmation_fail_message: 'confirmation code is not correct',
        fail_to_delete_message: 'delete action failed, check your internet connection and try again',
        are_you_sure_of_delete: 'are you sure of the delete action?',
        cancel: 'Cancel',
        delete: 'Delete',
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
    }
}