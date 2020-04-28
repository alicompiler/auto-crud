import React from "react";
import {KeyValueComponent} from "react-keyvalue-ui";
import {FormPageDefault} from "../../../Defaults/Page/FormPageDefaults";
import Axios from "axios";
import {DeletePageOptions} from "./DeletePageOptions";
import {AutoCrudDefaults} from "../../AutoCrudDefaults";
import BaseCrudPageWidthConfirmationAndStatus from "../../Base/BaseCrudPageWidthConfirmationAndStatus";

class DeletePage extends BaseCrudPageWidthConfirmationAndStatus {


    getDefaultPageTitle = () => FormPageDefault.titles.delete_page;


    protected renderMainContent(): any {
        const item = this.getState().__item ?? {};
        const keyValueProps = this.getOptions().keyValueProps ?? {};

        return <div>
            {this.renderConfirmationForm()}
            {this.renderDeleteMessage()}
            <KeyValueComponent item={item} {...keyValueProps}/>
        </div>
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

        this.updateLoadingErrorSuccess(undefined, null, null);

        if (!this.confirm()) {
            return;
        }

        const method = this.getOptions().deleteRequest?.method ?? FormPageDefault.form.methods.delete;
        const url = this.getDeleteUrl();
        const config = this.getOptions().deleteRequest?.requestConfig ?? {};

        try {
            this.updateLoadingErrorSuccess(true, null, null);
            await Axios({method: method, url: url, ...config});
            this.updateLoadingErrorSuccess(true, null, AutoCrudDefaults.localization.delete_success_message);
        } catch {
            this.updateLoadingErrorSuccess(false, AutoCrudDefaults.localization.fail_to_delete_message, null);
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
//TODO : display delete message