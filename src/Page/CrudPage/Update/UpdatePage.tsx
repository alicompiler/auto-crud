import CreatePage from "../Create/CreatePage";
import {FormPageDefault} from "../../../Defaults/Page/FormPageDefaults";

class UpdatePage extends CreatePage {

    public getDefaultHttpMethod = (): string => this.getOptions().httpMethod ?? FormPageDefault.form.methods.update;

    public getDefaultPageTitle = () => FormPageDefault.titles.update_page;


    public getInitialValues = () => {
        const item = this.getState().__item;
        return {...item};
    }

}

export default UpdatePage;