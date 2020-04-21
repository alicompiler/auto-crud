import React from 'react';
import BaseCrudPage from "../Base/BaseCrudPage";
import Form from "react-auto-form-core/dist/Form/Form";
import {RenderConfig} from "react-auto-form-core/dist/Form/FormProps";
import {FormPageOptions} from "./FormPageOptions";
import {FormPageDefault} from "../../Defaults/Page/FormPageDefaults";
import {FormRenderConfigGenerator} from "./FormRenderConfigGenerator";
import {BaseSubmitConfigGenerator} from "./BaseSubmitConfigGenerator";

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

    public getInitialValues = () => {
        return this.getOptions().initialValues;
    };

    public getFormListeners = () => {
        return this.getOptions().formListeners;
    };

    public getOnAnyValueChangeListener = () => {
        return this.getOptions().onAnyValueChangeListener;
    };

    public getFormServices = () => {
        return this.getOptions().services;
    };

    public getSubmitConfig = () => {
        const generator = new BaseSubmitConfigGenerator(this);
        return generator.generate();
    };

    public getDefaultHttpMethod = () => FormPageDefault.form.httpMethod;

    public getDefaultSubmitConfig = () => ({});

    public getOptions(): FormPageOptions {
        return super.getOptions();
    }
}

export default FormPage;