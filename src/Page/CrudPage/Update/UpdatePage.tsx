import {AutoCrudDefaults} from "../../../Defaults/AutoCrudDefaults";
import FormPage from "../../FormPage/FormPage";

class UpdatePage extends FormPage {

    public getDefaultHttpMethod = (): string => AutoCrudDefaults.httpMethods.updateRequest;

    public getDefaultPageTitle = () => AutoCrudDefaults.pageTitles.update;
    
}

export default UpdatePage;