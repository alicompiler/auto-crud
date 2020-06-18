import React from "react";
import {AutoCrudDefaults} from "./AutoCrudDefaults";
import FieldConfig from "react-auto-form-core/dist/Field/FieldConfig";
import TextField from "raf-tailwind-components/dist/TextField/TextField";

export interface IConfirmationDefaults {
    messageClassName: string;
    formWrapperClassName: string;
    codeLength: number;
    characters: string;

    field: () => FieldConfig;
    renderConfirmationCodeElement: (code: string | null) => any;
    confirmationCodeElementClassName: string;
}

export const confirmationDefaults  : IConfirmationDefaults ={
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
    renderConfirmationCodeElement: (code: string | null) => <span className={AutoCrudDefaults.confirmation.confirmationCodeElementClassName}>{code}</span>

}