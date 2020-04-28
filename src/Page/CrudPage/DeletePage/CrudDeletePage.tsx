import BaseCrudPage from "../../Base/BaseCrudPage";
import React from "react";
import {KeyValueComponent} from "react-keyvalue-ui";
import {FormPageDefault} from "../../../Defaults/Page/FormPageDefaults";
import Axios from "axios";
import {DeletePageOptions} from "./DeletePageOptions";
import IForm from "react-auto-form-core/dist/Form/IForm";
import Form from "react-auto-form-core/dist/Form/Form";
import {AutoCrudDefaults} from "../../AutoCrudDefaults";

class DeletePage extends BaseCrudPage {

    private confirmationForm: IForm | null = null;
    private currentConfirmationCode: string | null = null;

    getDefaultPageTitle = () => FormPageDefault.titles.delete_page;

    protected renderContent(): any {
        const item = this.getState().__item ?? {};
        const keyValueProps = this.getOptions().keyValueProps ?? {};
        const isLoading = this.getState().__deleting;
        const errorMessage = this.getState().__errorMessage;

        return <div>

            {errorMessage && AutoCrudDefaults.errorMessage({message: errorMessage})}

            {isLoading && AutoCrudDefaults.progressIndicator()}

            {this.renderConfirmationForm()}

            {this.renderDeleteMessage()}

            <KeyValueComponent item={item} {...keyValueProps}/>

        </div>
    }

    private renderConfirmationForm = () => {
        // noinspection PointlessBooleanExpressionJS
        if (this.getOptions().confirmationRequired === false) {
            return null;
        }

        const field = FormPageDefault.defaultConfirmationField;
        const confirmationFormWrapperClassName = FormPageDefault.confirmationFormWrapperClassName;
        const messageClassName = FormPageDefault.confirmationMessageClassName;
        const confirmationMessage = FormPageDefault.localization.confirmation_message;

        let confirmationCode: string | null;
        if (this.currentConfirmationCode === null) {
            confirmationCode = this.getConfirmationCode();
            this.currentConfirmationCode = confirmationCode;
        } else {
            confirmationCode = this.currentConfirmationCode;
        }

        const confirmationNode = confirmationCode === null ? null : this.getConfirmationCodeNode(confirmationCode);
        this.currentConfirmationCode = confirmationCode;

        return <div className={confirmationFormWrapperClassName}>
            <p className={messageClassName}>{confirmationMessage} {confirmationNode}</p>
            <Form ref={ref => this.confirmationForm = ref} renderOptions={{
                form: {
                    renderButton: () => null
                }
            }}
                  fields={[field()]}/>
        </div>;
    }

    private getConfirmationCodeNode = (code: string) => {
        return FormPageDefault.renderConfirmationCode(code);
    }


    public getConfirmationCode = (): string | null => {
        if (this.getOptions().generateConfirmationCode) {
            return this.getOptions().generateConfirmationCode!(this);
        }
        return this.generateRandomConfirmationCode();
    }


    private generateRandomConfirmationCode = () => {
        let buffer = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const codeLength = this.getOptions().codeLength ?? FormPageDefault.confirmationCodeLength;
        for (let i = 0; i < codeLength; i++) {
            buffer += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return buffer;
    }

    private renderDeleteMessage = () => {
        const render = this.getOptions().renderMessage;
        if (render) {
            return render(this);
        }

        return AutoCrudDefaults.components.deleteMessage({
            disabled: this.getState().__deleting,
            handleDelete: this.handleDelete,
            handleCancel: () => this.navigateToHome()
        });
    }

    public handleDelete = async () => {

        this.updateState({__errorMessage: null, __success: null}, () => this.forceUpdate());

        if (!this.confirmationForm || this.currentConfirmationCode !== this.confirmationForm.collect().getData()['confirmation']) {
            this.updateState({
                __errorMessage: AutoCrudDefaults.localization.confirmation_fail_message
            }, () => this.forceUpdate());
            return;
        }

        const method = this.getOptions().deleteRequest?.method ?? FormPageDefault.form.methods.delete;
        const url = this.getDeleteUrl();
        const config = this.getOptions().deleteRequest?.requestConfig ?? {};

        try {
            this.updateState({__deleting: true, __success: null});
            await Axios({method: method, url: url, ...config});
            this.updateState({__deleting: false, __success: true}, () => this.forceUpdate());
        } catch (e) {
            this.updateState({
                __errorMessage: AutoCrudDefaults.localization.fail_to_delete_message,
                __deleting: false,
                __success: false
            }, () => this.forceUpdate());
        }
    }

    public getDeleteUrl = () => {
        const root = this.getContext().config.endpointRoot;
        const url = this.getOptions().url;
        if (typeof url === "string") {
            return `${root}${url}`;
        } else if (typeof url === "function") {
            return url();
        }
        return root;
    }

    public getOptions(): DeletePageOptions {
        return super.getOptions();
    }
}

export default DeletePage;


//TODO : refresh confirmation code