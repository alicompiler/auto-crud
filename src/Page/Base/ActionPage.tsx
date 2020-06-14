import StatefulCrudPage from "./StatefulCrudPage";
import {KeyValueComponent} from "react-keyvalue-ui";
import {AutoCrudDefaults} from "../AutoCrudDefaults";
import React from "react";
import {ActionPageOptions} from "./ActionPageOptions";
import Axios from "axios";

export interface ActionPageLocalization {
    errorMessage: string;
    successMessage: string;
}

export abstract class ActionPage extends StatefulCrudPage {

    protected renderMainContent(): any {
        const item = this.getItem();

        if (!item) {
            return this.renderNoItemMessage();
        }

        return <div>
            {this.confirmationUtils.renderConfirmationForm()}
            {this.renderMessageComponent()}
            {this.renderAfterMessage()}
        </div>
    }

    public renderNoItemMessage = () => {
        const render = this.getOptions().renderNoItem;
        if (render) {
            return render(this);
        }
        return AutoCrudDefaults.components.noItem({
            onAction: () => this.navigateToHome()
        });
    }

    public renderMessageComponent = () => {
        const render = this.getOptions().renderMessage;
        if (render) {
            return render(this);
        }
        return this.renderDefaultMessageComponent();
    }

    protected renderDefaultMessageComponent = () => null;

    public renderAfterMessage(): any {
        const afterMessageRender = this.getOptions().renderAfterMessage;
        if (afterMessageRender) {
            return afterMessageRender(this.getItem(), this);
        }
        return this.renderDefaultAfterMessage();
    }

    public getKeyValueProps = () => {
        return this.getOptions().keyValueProps ?? {};
    }

    protected renderDefaultAfterMessage() {
        const item = this.getItem();
        const keyValueProps = this.getKeyValueProps();
        return <KeyValueComponent item={item} {...keyValueProps}/>
    }

    public handleAction = async () => {
        this.updateLoadingErrorSuccess(undefined, null, null);
        if (!this.confirm()) {
            return;
        }

        this.updateLoadingErrorSuccess(true, null, null);
        try {
            const action = this.getHandleAction();
            await action()
            this.updateLoadingErrorSuccess(false, null, this.getLocalization().successMessage);
        } catch {
            this.updateLoadingErrorSuccess(false, this.getLocalization().errorMessage, null);
        }
    }

    public confirm() {
        return this.confirmationUtils.confirm();
    }

    public getHandleAction(): any {
        const actionHandler = this.getOptions().handleAction;
        if (actionHandler) {
            return actionHandler(this);
        }
        return this.getDefaultHandleAction;
    }

    public getDefaultHandleAction = (): Promise<any> => {
        return Axios({
            method: this.getHttpMethod(),
            url: this.getUrl(),
            ...this.getHttpRequestConfig()
        });
    }

    public getLocalization(): ActionPageLocalization {
        return {
            errorMessage: this.getOptions().errorMessage ?? this.getDefaultLocalization().errorMessage,
            successMessage: this.getOptions().successMessage ?? this.getDefaultLocalization().successMessage
        }
    }

    public getDefaultLocalization(): ActionPageLocalization {
        return {
            errorMessage: AutoCrudDefaults.localization.operation_failed,
            successMessage: AutoCrudDefaults.localization.operation_done_successfully,
        }
    }

    public getHttpRequestConfig = () => {
        return this.getOptions().httpRequest?.config ?? this.getDefaultHttpRequestConfig();
    }

    public getDefaultHttpRequestConfig = () => ({});

    public getHttpMethod = () => {
        return this.getOptions().deleteRequest?.method ?? this.getDefaultHttpMethod();
    }

    protected getDefaultHttpMethod = () => AutoCrudDefaults.httpMethods.actionPageMethod;

    public getUrl = () => {
        const root = this.getContext().config.endpointRoot;
        const url = this.getOptions().httpRequest?.url;
        if (typeof url === "string") {
            return `${root}${url}`;
        } else if (typeof url === "function") {
            return url();
        }
        return this.getDefaultUrl();
    }

    public getDefaultUrl = () => this.getContext().config.endpointRoot;

    getOptions(): ActionPageOptions {
        return super.getOptions();
    }

    public getItem() {
        return this.getState().__item;
    }

}