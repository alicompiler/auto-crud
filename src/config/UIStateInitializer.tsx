import {CrudConfig} from "./Config";
import {UIState} from "./CrudContext";

export class UIStateInitializer {

    private readonly config: CrudConfig;

    constructor(config: CrudConfig) {
        this.config = config;
    }

    public initialize(): UIState {
        return {
            pages: this.getPagesState(),
            modals: {}
        };
    }

    protected getPagesState(): any {
        const pagesState: { [pageName: string]: any } = {};

        pagesState[this.config.indexPage!.name!] = this.config.indexPage!.options?.initialState ?? {};
        pagesState[this.config.createPage!.name!] = this.config.createPage!.options?.initialState ?? {};
        pagesState[this.config.editPage!.name!] = this.config.editPage!.options?.initialState ?? {};
        pagesState[this.config.deletePage!.name!] = this.config.deletePage!.options?.initialState ?? {};

        for (let page of this.config.pages!) {
            pagesState[page.name!] = page.options?.initialState ?? {}
        }
        return pagesState;
    }

}