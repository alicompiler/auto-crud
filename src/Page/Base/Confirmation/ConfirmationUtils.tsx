import BaseCrudPage from "../BaseCrudPage";
import {AutoCrudDefaults} from "../../AutoCrudDefaults";
import React from "react";
import {ConfirmationOptions} from "./ConfirmationOptions";
import IForm from "react-auto-form-core/dist/Form/IForm";
import Form from "react-auto-form-core/dist/Form/Form";

export class ConfirmationUtils {

    private readonly page: BaseCrudPage;
    private currentConfirmationCode: string | null = null;
    private confirmationForm: IForm | null = null;

    constructor(page: BaseCrudPage) {
        this.page = page;
    }

    public renderConfirmationForm = () => {
        if (!this.getConfirmationOptions().confirmationRequired) {
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
        const field = this.getConfirmationOptions().confirmationCodeField ?? AutoCrudDefaults.confirmation.field();
        const confirmationFormWrapperClassName = this.getConfirmationOptions().confirmationWrapperClassName ?? AutoCrudDefaults.confirmation.formWrapperClassName;
        const messageClassName = this.getConfirmationOptions().confirmationMessageClassName ?? AutoCrudDefaults.confirmation.messageClassName;
        const confirmationMessage = this.getConfirmationOptions().confirmationMessage ?? AutoCrudDefaults.localization.confirmation_message;
        return {field, confirmationFormWrapperClassName, messageClassName, confirmationMessage};
    }

    public renderConfirmationCodeElement = () => {
        const code = this.getConfirmationCode();
        const renderConfirmationElement = this.getConfirmationOptions().renderConfirmationCodeElement ?? AutoCrudDefaults.confirmation.renderConfirmationCodeElement;
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
        if (this.getConfirmationOptions().generateConfirmationCode) {
            return this.getConfirmationOptions().generateConfirmationCode!(this.page);
        }

        let buffer = '';
        const characters = this.getConfirmationOptions().confirmationCharacters ?? AutoCrudDefaults.confirmation.characters;
        const codeLength = this.getConfirmationOptions().confirmationCodeLength ?? AutoCrudDefaults.confirmation.codeLength;
        for (let i = 0; i < codeLength; i++) {
            buffer += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return buffer;
    }


    public confirm = () => {
        return !(this.confirmationForm && this.currentConfirmationCode !== this.confirmationForm.collect().getData()['confirmation']);

    }

    private getConfirmationOptions(): ConfirmationOptions {
        return this.page.getOptions().confirmation ?? {};
    }
}