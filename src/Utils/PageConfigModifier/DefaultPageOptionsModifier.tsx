import {BasePageConfigModifier} from "./PageConfigModifier";
import {PageConfig} from "../../Page/PageConfig";
import {BasePageOptions} from "../../Page/Base/BaseCrudPage/BasePageOptions";

export class DefaultPageOptionsModifier extends BasePageConfigModifier {

    private static handlePage<T extends BasePageOptions = BasePageOptions>(pageConfig: any, defaultOptions: T): PageConfig {
        const currentOptions = pageConfig.options ?? {};
        const newOptions = DefaultPageOptionsModifier.mergeOptions(defaultOptions, currentOptions);
        return {...pageConfig, options: newOptions}
    }

    private static mergeOptions<T extends BasePageOptions = BasePageOptions>(defaultOptions: T, currentOptions: T) {
        const defaultActions = defaultOptions.action ?? {};
        const currentActions = currentOptions.action ?? {};
        return {
            ...defaultOptions, ...currentOptions,
            action: {...defaultActions, ...currentActions}
        }
    }

    handleCreatePage(): PageConfig {
        return DefaultPageOptionsModifier.handlePage(this.getConfig().createPage!, {});
    }

    handleDeletePage(): PageConfig {
        return DefaultPageOptionsModifier.handlePage(this.getConfig().deletePage!, {
            action: {
                actionClassName: 'inline-flex items-center justify-center bg-red-400 px-4 py-2 rounded w-16 text-white',
                icon: "fas fa-trash text-xl",
            }
        });
    }


    handleDetailsPage(): PageConfig {
        return DefaultPageOptionsModifier.handlePage(this.getConfig().detailsPage!, {
            action: {
                actionClassName: 'inline-flex items-center justify-center bg-blue-400 px-4 py-2 rounded w-16 text-white',
                icon: "fas fa-info text-xl",
            }
        });
    }

    handleIndexPage(): PageConfig {
        return DefaultPageOptionsModifier.handlePage(this.getConfig().indexPage!, {});
    }


    handleUpdatePage(): PageConfig {
        return DefaultPageOptionsModifier.handlePage(this.getConfig().updatePage!, {
            action: {
                actionClassName: 'inline-flex items-center justify-center bg-yellow-400 px-4 py-2 rounded w-16 text-white',
                icon: "fas fa-pen text-xl",
            }
        });
    }

    handleOtherPages(): PageConfig[] {
        const pages = this.getConfig().pages!;
        return pages.map(page => DefaultPageOptionsModifier.handlePage(page, {}));
    }

}