import {BasePageOptions} from "../PageConfig";
import FieldConfig from "react-auto-form-core/dist/Field/FieldConfig";
import BaseCrudPageWidthConfirmationAndStatus from "./BaseCrudPageWidthConfirmationAndStatus";

export interface ConfirmationPageOptions extends BasePageOptions {
    confirmationRequired?: boolean;
    confirmationCodeField?: FieldConfig;
    confirmationWrapperClassName?: string;
    confirmationMessage?: string;
    generateConfirmationCode?: (page: BaseCrudPageWidthConfirmationAndStatus) => string | null;
    confirmationCodeLength?: number;
    confirmationCharacters?: string;
    renderConfirmationCodeElement?: (code: string | null) => any;
}