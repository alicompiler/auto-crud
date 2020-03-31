import {ContextConfig, PageConfig} from "../config/Config";

export default class PageConfigUtils {

    private readonly context: ContextConfig;
    private readonly allPages: { [pageName: string]: PageConfig };

    constructor(context: ContextConfig) {
        this.context = context;
        this.allPages = this.generateAllPagesObject();
    }

    private generateAllPagesObject(): { [pageName: string]: PageConfig } {
        const allPagesObject: any = {};
        allPagesObject[this.context.config.createPage!.name!] = this.context.config.createPage;
        allPagesObject[this.context.config.editPage!.name!] = this.context.config.editPage;
        allPagesObject[this.context.config.deletePage!.name!] = this.context.config.deletePage;
        for (let page of this.context.config.pages!) {
            allPagesObject[page.name!] = page;
        }
        return allPagesObject;
    }

    public getPageConfigByName(name: string): PageConfig {
        return this.allPages[name];
    }

}