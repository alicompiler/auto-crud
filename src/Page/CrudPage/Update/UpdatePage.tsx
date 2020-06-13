import CreatePage from "../Create/CreatePage";
import {AutoCrudDefaults} from "../../AutoCrudDefaults";

class UpdatePage extends CreatePage {

    public getDefaultHttpMethod = (): string => this.getOptions().httpMethod ?? AutoCrudDefaults.httpMethods.updateRequest;

    public getDefaultPageTitle = () => AutoCrudDefaults.pageTitles.update;

    public getInitialValues = () => {
        const item = this.getState().__item ?? {};
        return {...item};
    }

}

export default UpdatePage;