import {DeleteMessageComponent} from "../../Components/PageComponents/DeleteMessageComponent";
import {ProgressIndicator} from "../../Components/Core/ProgressIndicator/ProgressIndicator";
import {ErrorMessageComponent} from "../../Components/PageComponents/ErrorMessageComponent";
import {SuccessMessageComponent} from "../../Components/PageComponents/SuccessMessageComponent";
import React from "react";
import {NoItemMessageComponent} from "../../Components/PageComponents/NoItemMessageComponent";
import {AutoCrudDefaults} from "../../Page/AutoCrudDefaults";
import {ToggleMessageComponent} from "../../Components/PageComponents/ToggleMessageComponent";
import {CrudContextValue} from "../../Root/CrudContext";

export interface IDefaultsComponent {
    deleteMessage: (props: any) => any;
    toggleMessage: (props: any) => any;
    progressIndicator: (props?: any) => any;
    errorMessage: (props?: any) => any;
    successMessage: (props?: any) => any;
    noItem: (props: any) => any;

    renderCrudHeaderHomeButton: (pushFunc: any, context: CrudContextValue) => any;
}

export const componentsDefault: IDefaultsComponent = {
    deleteMessage: (props: any) => <DeleteMessageComponent disabled={props.disabled}
                                                           handleCancel={props.handleCancel}
                                                           handleDelete={props.handleDelete}/>,

    toggleMessage: (props: any) => <ToggleMessageComponent disabled={props.disabled}
                                                           handleCancel={props.handleCancel}
                                                           handleToggle={props.handleToggle}/>,

    progressIndicator: (props: any = {}) => <ProgressIndicator {...props}/>,
    errorMessage: (props: any = {}) => <ErrorMessageComponent {...props} />,
    successMessage: (props: any = {}) => <SuccessMessageComponent {...props}/>,

    noItem: (props: any) => <NoItemMessageComponent message={AutoCrudDefaults.localization.no_item_selected}
                                                    onAction={props.onAction}/>,

    renderCrudHeaderHomeButton: (pushFunc, context) => <button className={AutoCrudDefaults.classNames.curdRootHeader.homeButton}
                                                               onClick={() => pushFunc(context.config.routeRoot)}>
        <i className={AutoCrudDefaults.classNames.curdRootHeader.homeButtonIcon}/>
    </button>
}