import {ActionPage} from "./ActionPage";
import {AutoCrudDefaults} from "../../Defaults/AutoCrudDefaults";

export default class ToggleActionPage extends ActionPage {
    
    protected renderDefaultMessageComponent = () => {
        return AutoCrudDefaults.components.toggleMessage({
            disabled: this.getState().__loading,
            handleToggle: () => this.handleAction(),
            handleCancel: () => this.navigateToHome()
        });
    };
}