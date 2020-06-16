import IForm from "react-auto-form-core/dist/Form/IForm";
import * as React from "react";
import {AutoCrudDefaults} from "./AutoCrudDefaults";

export interface IDefaultsPage {
    formPage: {
        renderOptions: {
            form?: {
                buttonText?: string;
                renderButton?: (form: IForm) => any;
            }
        }
    }
}

export const pageDefaults: IDefaultsPage = {
    formPage: {
        renderOptions: {
            form: {
                renderButton: form => <div className={'p-2'}>
                    <button disabled={form.isLoading()}
                            className={AutoCrudDefaults.classNames.formPage.button()}
                            onClick={() => {
                                if (form.validate())
                                    form.submit();
                            }}>
                        {AutoCrudDefaults.localization.save}
                    </button>
                </div>
            }
        }
    }
}