import FieldConfig from "react-auto-form-core/dist/Field/FieldConfig";
import BaseCrudPage from "../BaseCrudPage/BaseCrudPage";
import {BasePageOptions} from "../BaseCrudPage/BasePageOptions";

export interface ConfirmationOptions extends BasePageOptions {
    required?: boolean;
    codeField?: FieldConfig;
    wrapperClassName?: string;
    message?: string;
    messageClassName?: string;
    generateCode?: (page: BaseCrudPage) => string | null;
    codeLength?: number;
    characters?: string;
    renderCodeElement?: (code: string | null) => any;
}