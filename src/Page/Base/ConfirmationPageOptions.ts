import {BasePageOptions} from "../PageConfig";
import FieldConfig from "react-auto-form-core/dist/Field/FieldConfig";
import BaseCrudPageWithConfirmationAndStatus from "./BaseCrudPageWithConfirmationAndStatus";

export interface ConfirmationPageOptions extends BasePageOptions {
    confirmationRequired?: boolean;
    confirmationCodeField?: FieldConfig;
    confirmationWrapperClassName?: string;
    confirmationMessage?: string;
    generateConfirmationCode?: (page: BaseCrudPageWithConfirmationAndStatus) => string | null;
    confirmationCodeLength?: number;
    confirmationCharacters?: string;
    renderConfirmationCodeElement?: (code: string | null) => any;
}