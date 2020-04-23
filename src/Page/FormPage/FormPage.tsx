import React from 'react';
import BaseCrudPage from "../Base/BaseCrudPage";
import Form from "react-auto-form-core/dist/Form/Form";
import {RenderConfig} from "react-auto-form-core/dist/Form/FormProps";
import {FormPageOptions} from "./FormPageOptions";
import {FormPageDefault} from "../../Defaults/Page/FormPageDefaults";
import {FormRenderConfigGenerator} from "./FormRenderConfigGenerator";
import {BaseSubmitConfigGenerator} from "./BaseSubmitConfigGenerator";
import {SubmitConfig} from "raf-axios-submitter/dist/SubmitConfig"

class FormPage extends BaseCrudPage {

    protected formRef: Form | null = null;

    protected renderContent(): any {
        return <div className={'__curd-form-page'}>
            {this.getState().loading && this.renderLoading()}
            {this.getState().error && this.renderError()}
            {this.getState().success && this.renderSuccess()}
            {this.renderForm()}
        </div>
    }

    protected renderForm = () => {
        return <Form ref={ref => this.formRef = ref} fields={this.getFields()}
                     initialValues={this.getInitialValues()}
                     on={this.getFormListeners()}
                     onAnyValueChanged={this.getOnAnyValueChangeListener()}
                     services={this.getFormServices()}
                     renderOptions={this.getFormRenderOptions()}
                     submitConfig={this.getSubmitConfig()}/>
    }


    protected renderError = () => {
        if (this.getOptions().renderError) {
            return this.getOptions().renderError!(this)
        }
        return FormPageDefault.renderError(this);
    }

    protected renderLoading = () => {
        if (this.getOptions().renderLoading)
            return this.getOptions().renderLoading!(this);
        return FormPageDefault.renderLoading(this);
    }

    protected renderSuccess = () => {
        if (this.getOptions().renderSuccess)
            return this.getOptions().renderSuccess!(this);
        return FormPageDefault.renderSuccess(this);
    }

    public getFormRef = () => {
        return this.formRef;
    }


    protected getFields = (): RenderConfig => {
        return new FormRenderConfigGenerator(this).generate();
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

    public getDefaultHttpMethod = (): string => FormPageDefault.form.httpMethod;

    public getDefaultSubmitConfig(): Partial<SubmitConfig> {
        return {};
    }

    public getOptions(): FormPageOptions {
        return super.getOptions();
    }

    public getLocalizations() {
        return {
            success_message: this.getOptions().success_message ?? FormPageDefault.localization.success_message,
            error_message: this.getOptions().error_message ?? FormPageDefault.localization.error_message,
            loading_message: this.getOptions().loading_message ?? FormPageDefault.localization.loading_message
        }
    }
}

export default FormPage;