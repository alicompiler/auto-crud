import React from 'react';
import BaseCrudPage from "../Base/BaseCrudPage";
import Form from "react-auto-form-core/dist/Form/Form";
import {RenderConfig} from "react-auto-form-core/dist/Form/FormProps";
import {FormPageOptions} from "./FormPageOptions";
import {FormPageDefault} from "../../Defaults/Page/FormPageDefaults";
import {SubmitConfigGenerator} from "./SubmitConfigGenerator";
import {FormRenderConfigGenerator} from "./FormRenderConfigGenerator";

class FormPage extends BaseCrudPage {
    protected renderContent(): any {
        return <div className={'__curd-form-page'}>
            {this.renderForm()}
        </div>
    }

    protected renderForm = () => {
        return <Form fields={this.getFields()}
                     initialValues={this.getInitialValues()}
                     on={this.getFormListeners()}
                     onAnyValueChanged={this.getOnAnyValueChangeListener()}
                     services={this.getFormServices()}
                     renderOptions={this.getFormRenderOptions()}
                     submitConfig={this.getSubmitConfig()}/>
    }


    protected getFields = (): RenderConfig => {
        return new FormRenderConfigGenerator(this.getContext(), this.getOptions()).generate();
    };

    public getFormRenderOptions = () => {
        if (this.getOptions().renderOptions)
            return this.getOptions().renderOptions;
        return FormPageDefault.form.renderOptions;
    };

    protected getInitialValues = () => {
        return this.getOptions().initialValues;
    };

    protected getFormListeners = () => {
        return this.getOptions().formListeners;
    };

    protected getOnAnyValueChangeListener = () => {
        return this.getOptions().onAnyValueChangeListener;
    };

    protected getFormServices = () => {
        return this.getOptions().services;
    };

    protected getSubmitConfig = () => {
        const generator = new SubmitConfigGenerator(this.getContext(), this.getOptions(), FormPageDefault);
        return generator.generate();
    };

    public getOptions(): FormPageOptions {
        return super.getOptions();
    }
}

export default FormPage;