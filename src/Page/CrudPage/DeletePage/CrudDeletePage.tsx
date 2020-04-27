import FormPage from "../../FormPage/FormPage";
import BaseCrudPage from "../../Base/BaseCrudPage";
import React from "react";
import {KeyValueComponent} from "react-keyvalue-ui";
import {FormPageDefault} from "../../../Defaults/Page/FormPageDefaults";

class DeletePage extends BaseCrudPage {

    getDefaultPageTitle = () => FormPageDefault.titles.delete_page;

    protected renderContent(): any {
        const item = this.getState().__item ?? {};
        const keyValueProps = this.getOptions().keyValueProps ?? {};
        const isLoading = this.getState().deleting;
        return <div>

            {
                isLoading && <h1>Deleting...</h1>
            }

            {
                this.renderDeleteMessage()
            }

            <KeyValueComponent item={item} {...keyValueProps}/>

        </div>
    }

    private renderDeleteMessage = () => {
        const render = this.getOptions().renderMessage;
        if (render) {
            return render(this);
        }

        const defaultRender = FormPageDefault.renderDeleteMessage;
        return defaultRender(this);
    }

    handleDelete = () => {
        this.updateState({deleting: true}, () => {
            this.forceUpdate();
            //todo : send delete request
            //mocking delete
            setTimeout(() => {
                this.updateState({deleting: false}, () => this.forceUpdate());
            }, 2000)
        });
    }
}

export default DeletePage;