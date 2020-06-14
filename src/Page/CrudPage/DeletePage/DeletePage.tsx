import {AutoCrudDefaults} from "../../AutoCrudDefaults";
import {ActionPage, ActionPageLocalization} from "../../Base/ActionPage";

class DeletePage extends ActionPage {

    getDefaultPageTitle = () => AutoCrudDefaults.pageTitles.delete;

    public renderDefaultMessageComponent = () => {
        return AutoCrudDefaults.components.deleteMessage({
            disabled: this.getState().__loading,
            handleDelete: () => this.handleAction(),
            handleCancel: () => this.navigateToHome()
        });
    }

    public getDefaultHttpMethod = () => AutoCrudDefaults.httpMethods.deleteRequest;

    public getDefaultLocalization(): ActionPageLocalization {
        return {
            successMessage: AutoCrudDefaults.localization.delete_success_message,
            errorMessage: AutoCrudDefaults.localization.fail_to_delete_message
        }
    }

}

export default DeletePage;