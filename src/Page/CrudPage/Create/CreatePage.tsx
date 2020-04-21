import FormPage from "../../FormPage/FormPage";
import {SubmitConfig} from "raf-axios-submitter/dist/SubmitConfig"
import {AxiosResponse} from "axios";
import {FormPageDefault} from "../../../Defaults/Page/FormPageDefaults";

class CreatePage extends FormPage {

    getDefaultSubmitConfig(): Partial<SubmitConfig> {
        const onFail = this.getOptions().onFail;
        const onSuccess = this.getOptions().onSuccess;
        return {
            onFail: (e: any) => onFail && onFail(this, e),
            onSuccess: (response: AxiosResponse) => onSuccess && onSuccess(this, response),
            changeLoadingStatus: true,
        }
    }

    public getDefaultHttpMethod = (): string => this.getOptions().httpMethod ?? FormPageDefault.form.httpMethod

}

export default CreatePage;