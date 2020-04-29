import {BasePageConfigModifier} from "./PageConfigModifier";
import {PageConfig} from "../PageConfig";
import {CrudConfig} from "../../Root/CrudConfig";

export class PageOptionsModifier extends BasePageConfigModifier {

    private readonly overrideOptions: any;
    private readonly pageName: string;

    constructor(config: CrudConfig, pageName: string, options: any) {
        super(config);
        this.overrideOptions = options;
        this.pageName = pageName;
    }

    private handlePage(pageConfig: any): PageConfig {
        if (pageConfig.name !== this.pageName) {
            return pageConfig;
        }
        const currentOptions = pageConfig.options ?? {};
        return {...pageConfig, options: {...currentOptions, ...this.overrideOptions}}
    }

    handleCreatePage(): PageConfig {
        return this.handlePage(this.getConfig().createPage!);
    }

    handleDeletePage(): PageConfig {
        return this.handlePage(this.getConfig().deletePage!);
    }

    handleDetailsPage(): PageConfig {
        return this.handlePage(this.getConfig().detailsPage!);
    }

    handleIndexPage(): PageConfig {
        return this.handlePage(this.getConfig().indexPage!);
    }

    handleUpdatePage(): PageConfig {
        return this.handlePage(this.getConfig().updatePage!);
    }

    handleOtherPages(): PageConfig[] {
        const pages = this.getConfig().pages!;
        return pages.map(page => this.handlePage(page));
    }
}