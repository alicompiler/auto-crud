import {DeleteMessageComponent} from "../../Components/PageComponents/DeleteMessageComponent";
import {ProgressIndicator} from "../../Components/Core/ProgressIndicator/ProgressIndicator";
import {ErrorMessageComponent} from "../../Components/ErrorMessageComponent/ErrorMessageComponent";
import {SuccessMessageComponent} from "../../Components/SuccessMessageComponent/SuccessMessageComponent";
import React from "react";
import {NoItemMessageComponent} from "../../Components/PageComponents/NoItemMessageComponent";
import {AutoCrudDefaults} from "../../Page/AutoCrudDefaults";

export interface IDefaultsComponent {
    deleteMessage: (props: any) => any;
    progressIndicator: (props?: any) => any;
    errorMessage: (props?: any) => any;
    successMessage: (props?: any) => any;
    noItem: (props: any) => any;
}

export const componentsDefault: IDefaultsComponent = {
    deleteMessage: (props: any) => <DeleteMessageComponent disabled={props.disabled}
                                                           handleCancel={props.handleCancel}
                                                           handleDelete={props.handleDelete}/>,

    progressIndicator: (props: any = {}) => <ProgressIndicator {...props}/>,
    errorMessage: (props: any = {}) => <ErrorMessageComponent {...props} />,
    successMessage: (props: any = {}) => <SuccessMessageComponent {...props}/>,

    noItem: (props: any) => <NoItemMessageComponent message={AutoCrudDefaults.localization.no_item_selected}
                                                    onAction={props.onAction}/>
}