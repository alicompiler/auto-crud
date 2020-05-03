import React from 'react';
import BaseCrudPageWithStatus from "./BaseCrudPageWithStatus";
import {AutoCrudDefaults} from "../AutoCrudDefaults";
import IForm from "react-auto-form-core/dist/Form/IForm";
import Form from "react-auto-form-core/dist/Form/Form";
import {ConfirmationPageOptions} from "./ConfirmationPageOptions";

abstract class BaseCrudPageWithConfirmationAndStatus extends BaseCrudPageWithStatus {
    public currentConfirmationCode: string | null = null;
    public confirmationForm: IForm | null = null;


    public renderConfirmationForm = () => {
        if (!this.getOptions().confirmationRequired) {
            return null;
        }

        const {field, confirmationFormWrapperClassName, messageClassName, confirmationMessage} = this.getConfirmationFormRenderOptions();

        return <div className={confirmationFormWrapperClassName}>
            <p className={messageClassName}>{confirmationMessage} {this.renderConfirmationCodeElement()}</p>
            <Form ref={ref => this.confirmationForm = ref}
                  renderOptions={{
                      form: {renderButton: () => null}
                  }}
                  fields={[field]}/>
        </div>;
    }

    public getConfirmationFormRenderOptions() {
        const field = this.getOptions().confirmationCodeField ?? AutoCrudDefaults.confirmation.field();
        const confirmationFormWrapperClassName = this.getOptions().confirmationWrapperClassName ?? AutoCrudDefaults.confirmation.formWrapperClassName;
        const messageClassName = this.getOptions().confirmationMessageClassName ?? AutoCrudDefaults.confirmation.messageClassName;
        const confirmationMessage = this.getOptions().confirmationMessage ?? AutoCrudDefaults.localization.confirmation_message;
        return {field, confirmationFormWrapperClassName, messageClassName, confirmationMessage};
    }

    public renderConfirmationCodeElement = () => {
        const code = this.getConfirmationCode();
        const renderConfirmationElement = this.getOptions().renderConfirmationCodeElement ?? AutoCrudDefaults.confirmation.renderConfirmationCodeElement;
        return renderConfirmationElement(code);
    }


    public getConfirmationCode = () => {
        let confirmationCode: string | null;
        if (this.currentConfirmationCode === null) {
            confirmationCode = this.generateRandomConfirmationCode();
            this.currentConfirmationCode = confirmationCode;
        } else {
            confirmationCode = this.currentConfirmationCode;
        }
        return confirmationCode;
    }


    public generateRandomConfirmationCode = (): string | null => {
        if (this.getOptions().generateConfirmationCode) {
            return this.getOptions().generateConfirmationCode!(this);
        }

        let buffer = '';
        const characters = this.getOptions().confirmationCharacters ?? AutoCrudDefaults.confirmation.characters;
        const codeLength = this.getOptions().confirmationCodeLength ?? AutoCrudDefaults.confirmation.codeLength;
        for (let i = 0; i < codeLength; i++) {
            buffer += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return buffer;
    }


    public confirm = () => {
        if (this.confirmationForm && this.currentConfirmationCode !== this.confirmationForm.collect().getData()['confirmation']) {
            this.updateLoadingErrorSuccess(undefined, AutoCrudDefaults.localization.confirmation_fail_message, undefined);
            return false;
        }
        return true;
    }

    public getOptions(): ConfirmationPageOptions {
        return super.getOptions();
    }
}

export default BaseCrudPageWithConfirmationAndStatus;