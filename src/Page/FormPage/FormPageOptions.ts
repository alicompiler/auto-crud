import {PageOption} from "../../config/Config";
import IField from "react-auto-form-core/dist/Field/IField";
import IForm from "react-auto-form-core/dist/Form/IForm";
import {FormServices, RenderConfig} from "react-auto-form-core/dist/Form/FormProps";

export interface FormPageOptions extends PageOption {
    initialValues?: any;
    formListeners?: { [eventName: string]: (form: IForm, payload: any) => void };
    onAnyValueChangeListener?: (key: string, value: any, field: IField, form: IForm) => void;
    services?: FormServices;
    submitConfig?: any;
    renderOptions?: any;

    renderConfig?: RenderConfig;
    fields?: (string | string[])[];

    url?: string;
}