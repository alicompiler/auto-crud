import React from "react";
import {KeyValueComponent} from "react-keyvalue-ui";
import Axios from "axios";
import {DeletePageOptions} from "./DeletePageOptions";
import {AutoCrudDefaults} from "../../AutoCrudDefaults";
import StatefulCrudPage from "../../Base/StatefulCrudPage";

class DeletePage extends StatefulCrudPage {

    getDefaultPageTitle = () => AutoCrudDefaults.pageTitles.delete;

    protected renderMainContent(): any {
        const item = this.getState().__item;
        const keyValueProps = this.getKeyValueProps();

        if (!item) {
            return this.renderNoItemMessage();
        }

        return <div>
            {this.confirmationUtils.renderConfirmationForm()}
            {this.renderDeleteMessage()}
            <KeyValueComponent item={item} {...keyValueProps}/>
        </div>
    }

    public getKeyValueProps = () => {
        return this.getOptions().keyValueProps ?? {};
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

    private renderDeleteMessage = () => {
        const render = this.getOptions().renderMessage;
        if (render) {
            return render(this);
        }

        return AutoCrudDefaults.components.deleteMessage({
            disabled: this.getState().__loading,
            handleDelete: () => this.handleDelete(),
            handleCancel: () => this.navigateToHome()
        });
    }

    public handleDelete = async () => {

        this.updateLoadingErrorSuccess(undefined, null, null);

        if (!this.confirmationUtils.confirm()) {
            return;
        }

        try {
            this.updateLoadingErrorSuccess(true, null, null);
            await Axios({method: this.getMethod(), url: this.getDeleteUrl(), ...this.getConfig()});
            this.updateLoadingErrorSuccess(false, null, AutoCrudDefaults.localization.delete_success_message);
        } catch {
            this.updateLoadingErrorSuccess(false, AutoCrudDefaults.localization.fail_to_delete_message, null);
        }
    }

    public getConfig = () => {
        return this.getOptions().deleteRequest?.requestConfig ?? {};
    }

    public getMethod = () => {
        return this.getOptions().deleteRequest?.method ?? AutoCrudDefaults.httpMethods.deleteRequest;
    }

    public getDeleteUrl = () => {
        const root = this.getContext().config.endpointRoot;
        const url = this.getOptions().deleteRequest?.url;
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