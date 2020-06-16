import {classNameDefaults, IDefaultsClassName} from "./DefaultsClassName";
import {endpointDefaults, IDefaultsEndpoint} from "./DefaultsEndpoint";
import {IDefaultsPageTitle, pageTitleDefaults} from "./DefaultsPageTitle";
import {httpMethodDefaults, IDefaultsHttpMethod} from "./DefaultsHttpMethod";
import {componentsDefault, IDefaultsComponent} from "./DefaultsComponent";
import {IDefaultsPage, pageDefaults} from "./DefaultsPage";
import {IDefaultLocalization, localizationDefaults} from "./DefaultsLocalization";
import {componentConfigDefaults, IComponentConfigDefaults} from "./ComponentConfigDefaults";
import {confirmationDefaults, IConfirmationDefaults} from "./ConfirmationDefaults";

export interface IAutoCrudDefaults {
    classNames: IDefaultsClassName;
    endpoints: IDefaultsEndpoint;
    pageTitles: IDefaultsPageTitle;
    httpMethods: IDefaultsHttpMethod;
    components: IDefaultsComponent;
    pages: IDefaultsPage;
    localization: IDefaultLocalization;
    componentsConfig: IComponentConfigDefaults;
    confirmation: IConfirmationDefaults;
}

export const AutoCrudDefaults: IAutoCrudDefaults = {
    localization: localizationDefaults,
    pages: pageDefaults,
    httpMethods: httpMethodDefaults,
    classNames: classNameDefaults,
    endpoints: endpointDefaults,
    pageTitles: pageTitleDefaults,
    components: componentsDefault,
    componentsConfig: componentConfigDefaults,
    confirmation: confirmationDefaults,
}