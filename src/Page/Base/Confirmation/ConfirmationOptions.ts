import {BasePageOptions} from "../../PageConfig";
import FieldConfig from "react-auto-form-core/dist/Field/FieldConfig";
import BaseCrudPage from "../BaseCrudPage";

export interface ConfirmationOptions extends BasePageOptions {
    confirmationRequired?: boolean;
    confirmationCodeField?: FieldConfig;
    confirmationWrapperClassName?: string;
    confirmationMessage?: string;
    confirmationMessageClassName?: string;
    generateConfirmationCode?: (page: BaseCrudPage) => string | null;
    confirmationCodeLength?: number;
    confirmationCharacters?: string;
    renderConfirmationCodeElement?: (code: string | null) => any;
}