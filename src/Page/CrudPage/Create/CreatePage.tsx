import FormPage from "../../FormPage/FormPage";
import {SubmitConfig} from "raf-axios-submitter/dist/SubmitConfig"
import {AxiosResponse} from "axios";
import {FormPageDefault} from "../../../Defaults/Page/FormPageDefaults";

class CreatePage extends FormPage {

    getDefaultSubmitConfig(): Partial<SubmitConfig> {
        const onFail = this.getOptions().onFail;
        const onSuccess = this.getOptions().onSuccess;
        return {
            onFail: (e: any) => {
                let stop = undefined;
                onFail && (stop = onFail(this, e));
                if (stop === false) {
                    return;
                }
                this.updateState({error: e});
                setTimeout(() => {
                    this.forceUpdate();
                }, 1000);
            },
            onSuccess: (response: AxiosResponse) => {
                let stop = undefined;
                onSuccess && (stop = onSuccess(this, response));
                if (stop === false) {
                    return;
                }
                this.getFormRef()!.clear();
                this.updateState({error: null});
                this.forceUpdate()
            },
            changeLoadingStatus: true,
        }
    }

    public getDefaultHttpMethod = (): string => this.getOptions().httpMethod ?? FormPageDefault.form.methods.create;

    public getDefaultPageTitle = () => FormPageDefault.titles.create_page

}

export default CreatePage;