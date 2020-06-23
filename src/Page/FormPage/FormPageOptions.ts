import IField from "react-auto-form-core/dist/Field/IField";
import IForm from "react-auto-form-core/dist/Form/IForm";
import {FormServices, RenderConfig} from "react-auto-form-core/dist/Form/FormProps";
import {CrudContextValue} from "../../Root/CrudContext";
import FormPage from "./FormPage";
import {AxiosResponse} from "axios";
import {BasePageOptions} from "../Base/BaseCrudPage/BasePageOptions";

export interface FormPageOptions extends BasePageOptions {
    initialValues?: any;
    formListeners?: { [eventName: string]: (form: IForm, payload: any) => void };
    onAnyValueChangeListener?:  (key: string, value: any, field: IField, form: IForm) => void;
    services?: FormServices;
    submitConfig?: any;
    overrideSubmitConfig?: any;
    renderOptions?: any;

    renderConfig?: RenderConfig;
    fields?: (string | string[])[];

    onFail?: (page: FormPage, error: any) => any;
    onSuccess?: (page: FormPage, response: AxiosResponse) => any;

    url?: string | ((context: CrudContextValue) => string);
    httpMethod?: string;
}