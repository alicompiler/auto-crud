import {CrudConfig} from "../../Root/CrudConfig";
import {PageConfig} from "../../Page/PageConfig";

export interface PageConfigModifier {
    getConfig(): CrudConfig;

    modify(): CrudConfig;

    handleIndexPage(): PageConfig;

    handleCreatePage(): PageConfig;

    handleUpdatePage(): PageConfig;

    handleDeletePage(): PageConfig;

    handleDetailsPage(): PageConfig;

    handleOtherPages(): PageConfig[];
}


export abstract class BasePageConfigModifier implements PageConfigModifier {
    protected config: CrudConfig;

    constructor(config: CrudConfig) {
        this.config = {...config};
    }

    getConfig(): CrudConfig {
        return this.config;
    }

    modify(): CrudConfig {
        return {
            ...this.getConfig(),
            indexPage: this.handleIndexPage(),
            createPage: this.handleCreatePage(),
            updatePage: this.handleUpdatePage(),
            deletePage: this.handleDeletePage(),
            detailsPage: this.handleDetailsPage(),
            pages: this.handleOtherPages()
        };
    }


    abstract handleIndexPage(): PageConfig;

    abstract handleCreatePage(): PageConfig;

    abstract handleUpdatePage(): PageConfig;

    abstract handleDeletePage(): PageConfig;

    abstract handleDetailsPage(): PageConfig;

    abstract handleOtherPages(): PageConfig[];
}