import FormPage from "../../FormPage/FormPage";
import {SubmitConfig} from "raf-axios-submitter/dist/SubmitConfig"
import {AxiosResponse} from "axios";
import {AutoCrudDefaults} from "../../../Defaults/AutoCrudDefaults";

class CreatePage extends FormPage {

    getDefaultSubmitConfig(): Partial<SubmitConfig> {
        const onFail = this.getOptions().onFail;
        const onSuccess = this.getOptions().onSuccess;
        return {
            onFail: (e: any) => {
                let hookResult = undefined;
                onFail && (hookResult = onFail(this, e));
                if (hookResult === false) {
                    return;
                }
                this.updateStateForced({error: e});
            },
            onSuccess: (response: AxiosResponse) => {
                let hookResult = undefined;
                onSuccess && (hookResult = onSuccess(this, response));
                if (hookResult === false) {
                    return;
                }
                this.getFormRef()!.clear();
                this.updateStateForced({error: null});
            },
            changeLoadingStatus: true,
        }
    }

    public getDefaultHttpMethod = (): string => this.getOptions().httpMethod ?? AutoCrudDefaults.httpMethods.createRequest;

    public getDefaultPageTitle = () => AutoCrudDefaults.pageTitles.create;

}

export default CreatePage;