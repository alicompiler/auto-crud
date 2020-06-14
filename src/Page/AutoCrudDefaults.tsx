import React from "react";
import FieldConfig from "react-auto-form-core/dist/Field/FieldConfig";
import TextField from "raf-tailwind-components/dist/TextField/TextField";
import {classNameDefaults, IDefaultsClassName} from "../Defaults/New/DefaultsClassName";
import {endpointDefaults, IDefaultsEndpoint} from "../Defaults/New/DefaultsEndpoint";
import {IDefaultsPageTitle, pageTitleDefaults} from "../Defaults/New/DefaultsPageTitle";
import {httpMethodDefaults, IDefaultsHttpMethod} from "../Defaults/New/DefaultsHttpMethod";
import {componentsDefault, IDefaultsComponent} from "../Defaults/New/DefaultsComponent";

export interface IAutoCrudDefaults {
    classNames: IDefaultsClassName;
    endpoints: IDefaultsEndpoint;
    pageTitles: IDefaultsPageTitle;
    httpMethods: IDefaultsHttpMethod,
    components: IDefaultsComponent;

    localization: {
        confirmation_fail_message: string;
        confirmation_message: string;

        fail_to_delete_message: string;
        are_you_sure_of_delete: string;
        delete_success_message: string;

        no_item_selected: string;


        cancel: string;
        delete: string;
        main: string;
        confirmation: string;

        loading_data: string,
        fail_to_fetch_data: string,
        data_empty: string,
        try_again: string,
        search: string;
    };


    componentsConfig: {
        progressIndicator: {
            height: number,
            bgColor: string;
            progressColor: string;
        }
    }

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
        confirmation: 'Confirmation',
        data_empty: 'Data Empty',
        fail_to_fetch_data: 'Fail To Fetch Data',
        loading_data: 'Loading Data...',
        try_again: 'Try Again',
        search: 'Search',
        no_item_selected: 'No Item Selected'
    },


    httpMethods: httpMethodDefaults,
    classNames: classNameDefaults,
    endpoints: endpointDefaults,
    pageTitles: pageTitleDefaults,
    components: componentsDefault,

    componentsConfig: {
        progressIndicator: {
            height: 5, bgColor: 'rgba(5, 114, 206, 0.2)', progressColor: 'rgba(5, 114, 206)',
        }
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