import IField from "react-auto-form-core/dist/Field/IField";
import IForm from "react-auto-form-core/dist/Form/IForm";
import {FormServices, RenderConfig} from "react-auto-form-core/dist/Form/FormProps";
import {BasePageOptions} from "../PageConfig";

export interface FormPageOptions extends BasePageOptions {
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