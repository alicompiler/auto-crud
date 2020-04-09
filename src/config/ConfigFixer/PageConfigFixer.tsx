import {CrudConfig, PageConfig, PageConfigComponent} from "../Config";
import {ConfigFixer} from "./ConfigFixer";
import CrudCreatePage from "../../_page/CrudCreatePage";
import CrudUpdatePage from "../../_page/CrudUpdatePage";
import CrudDeletePage from "../../_page/CrudDeletePage";
import CrudIndexPage from "../../_page/CrudIndexPage";

export class PageConfigFixer implements ConfigFixer {


    public fix(config: CrudConfig): CrudConfig {
        return {
            ...config,
            indexPage: this.getIndexPageConfig(config),
            createPage: this.getCreatePageConfig(config),
            editPage: this.getEditPageConfig(config),
            deletePage: this.getDeletePage(config),
            pages: this.getCustomPagesConfig(config)
        };
    }

    protected getIndexPageConfig(config: CrudConfig) {
        const defaultRoute = `${config.routeRoot}`;
        const defaultSkip = false;
        const defaultPageComponent: PageConfigComponent = {as: CrudIndexPage};
        const indexPageConfig = {...(config.indexPage ?? {}), route: ''};
        return this.getPageConfig(config, indexPageConfig, 'index', defaultRoute, defaultSkip, defaultPageComponent);

    }

    protected getCreatePageConfig(config: CrudConfig): PageConfig {
        const defaultRoute = `${config.routeRoot}/create`;
        const defaultSkip = false;
        const defaultPageComponent: PageConfigComponent = {as: CrudCreatePage};
        return this.getPageConfig(config, config.createPage, 'create', defaultRoute, defaultSkip, defaultPageComponent);
    }


    protected getEditPageConfig(config: CrudConfig): PageConfig {
        const defaultRoute = `${config.routeRoot}/edit`;
        const defaultSkip = false;
        const defaultPageComponent = {as: CrudUpdatePage};
        return this.getPageConfig(config, config.editPage, 'edit', defaultRoute, defaultSkip, defaultPageComponent);
    }

    protected getDeletePage(config: CrudConfig): PageConfig {
        const defaultRoute = `${config.routeRoot}/remove`;
        const defaultSkip = false;
        const defaultPageComponent = {as: CrudDeletePage};
        return this.getPageConfig(config, config.editPage, 'delete', defaultRoute, defaultSkip, defaultPageComponent);
    }

    protected getCustomPagesConfig(config: CrudConfig): PageConfig[] {
        if (!config.pages) return [];

        const pageConfigArr: PageConfig[] = [];
        for (let pageConfig of config.pages) {
            if (!pageConfig.name) throw Error(`Custom page has no name`);
            if (!pageConfig.route) throw Error(`Page ${pageConfig.name} has no route`);
            if (!pageConfig.pageComponent) throw Error(`Page ${pageConfig.name} has no PageComponent`);
            pageConfigArr.push(this.getPageConfig(config, pageConfig,
                pageConfig.name, pageConfig.route, false, pageConfig.pageComponent)
            );
        }

        return pageConfigArr;
    }

    protected getPageConfig(config: CrudConfig,
                            pageConfig: PageConfig | undefined,
                            name: string,
                            defaultRoute: string,
                            defaultSkip: boolean,
                            defaultPageComponent: PageConfigComponent): PageConfig {
        if (!pageConfig) {
            return {
                name: name,
                route: defaultRoute,
                skip: defaultSkip,
                pageComponent: defaultPageComponent,
                options: {}
            }
        }

        return {
            name: name,
            route: `${config.routeRoot}${pageConfig.route}` ?? defaultRoute,
            skip: pageConfig.skip ?? defaultSkip,
            pageComponent: pageConfig.pageComponent ?? defaultPageComponent,
            options: pageConfig.options ?? {}
        };
    }


}