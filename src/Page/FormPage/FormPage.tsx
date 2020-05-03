import React from 'react';
import BaseCrudPage from "../Base/BaseCrudPage";
import Form from "react-auto-form-core/dist/Form/Form";
import {RenderConfig} from "react-auto-form-core/dist/Form/FormProps";
import {FormPageOptions} from "./FormPageOptions";
import {FormPageDefault} from "../../Defaults/Page/FormPageDefaults";
import {FormRenderConfigGenerator} from "./FormRenderConfigGenerator";
import {BaseSubmitConfigGenerator} from "./BaseSubmitConfigGenerator";
import {SubmitConfig} from "raf-axios-submitter/dist/SubmitConfig"
import BaseCrudPageWithStatus from "../Base/BaseCrudPageWithStatus";

class FormPage extends BaseCrudPageWithStatus {

    protected formRef: Form | null = null;

    public renderMainContent(): any {
        return <div className={'__curd-form-page'}>
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
}

export default FormPage;