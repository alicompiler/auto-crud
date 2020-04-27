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

    getDefaultPageTitle = () => FormPageDefault.titles.delete_page;

    protected renderContent(): any {
        const item = this.getState().__item ?? {};
        const keyValueProps = this.getOptions().keyValueProps ?? {};
        const isLoading = this.getState().deleting;
        return <div>

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
        const confirmationCode = this.getConfirmationCode();
        const confirmationNode = confirmationCode === null ? null : this.getConfirmationCodeNode(confirmationCode);

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

        const defaultRender = FormPageDefault.renderDeleteMessage;
        return defaultRender(this);
    }

    public handleDelete = async () => {
        const method = this.getOptions().deleteRequest?.method ?? FormPageDefault.form.methods.delete;
        const url = this.getDeleteUrl();
        const config = this.getOptions().deleteRequest?.requestConfig ?? {};

        try {
            this.updateState({deleting: true, success: null});
            await Axios({
                method: method,
                url: url,
                ...config
            });
            this.updateState({deleting: false, success: true});
        } catch (e) {
            this.updateState({fail: e, deleting: false, success: false});
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