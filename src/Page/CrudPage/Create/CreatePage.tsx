import FormPage from "../../FormPage/FormPage";
import {AutoCrudDefaults} from "../../../Defaults/AutoCrudDefaults";

class CreatePage extends FormPage {

    public getDefaultPageTitle = () => AutoCrudDefaults.pageTitles.create;

}

export default CreatePage;