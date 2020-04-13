import {CrudContextValue} from "../../Root/CrudContext";
import {PageConfig} from "../PageConfig";

export default class PageConfigUtils {

    private readonly context: CrudContextValue;
    private readonly allPages: { [pageName: string]: PageConfig };

    constructor(context: CrudContextValue) {
        this.context = context;
        this.allPages = this.generateAllPagesObject();
    }

    private generateAllPagesObject(): { [pageName: string]: PageConfig } {
        const allPagesObject: any = {};
        allPagesObject[this.context.config.indexPage!.name!] = this.context.config.indexPage;
        allPagesObject[this.context.config.createPage!.name!] = this.context.config.createPage;
        allPagesObject[this.context.config.updatePage!.name!] = this.context.config.updatePage;
        allPagesObject[this.context.config.deletePage!.name!] = this.context.config.deletePage;
        for (let page of this.context.config.pages!) {
            allPagesObject[page.name!] = page;
        }
        return allPagesObject;
    }

    public getPageConfigByName(name: string): PageConfig {
        return this.allPages[name];
    }

    public getPageState(name: string): any {
        const state = this.context.ui.pages[name];
        return state ?? {};
    }

    public updatePageState(name: string, payload: any): void {
        const state = this.getPageState(name);
        const newState = {...state, ...payload};
        const {updateState} = this.context;
        const ui = {...this.context.ui};
        const pages = {...ui.pages};
        pages[name] = newState;
        updateState({ui: {...ui, pages: pages}});
    }

}