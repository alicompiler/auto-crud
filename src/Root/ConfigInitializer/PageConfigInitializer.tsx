import {CrudConfig} from "../CrudConfig";
import {ConfigFixer} from "./ConfigFixer";
import CreatePage from "../../Page/CrudPage/Create/CreatePage";
import UpdatePage from "../../Page/CrudPage/Update/UpdatePage";
import DeletePage from "../../Page/CrudPage/DeletePage/CrudDeletePage";
import {IndexPage} from "../../Page/CrudPage/Index/IndexPage";
import {PageConfig} from "../../Page/PageConfig";
import DetailsPage from "../../Page/CrudPage/Details/DetailsPage";

export class PageConfigInitializer implements ConfigFixer {

    public fix(config: CrudConfig): CrudConfig {
        return {
            ...config,
            indexPage: this.getIndexPageConfig(config),
            createPage: this.getCreatePageConfig(config),
            updatePage: this.getEditPageConfig(config),
            deletePage: this.getDeletePage(config),
            detailsPage: this.getDetailsPage(config),
            pages: this.getCustomPagesConfig(config)
        };
    }

    protected getIndexPageConfig(config: CrudConfig) {
        const defaultRoute = `${config.routeRoot}`;
        const defaultSkip = false;
        const defaultPageComponent: any = IndexPage;
        const indexPageConfig = {...(config.indexPage ?? {}), route: ''};
        return this.getPageConfigOrDefaultsConfig(config, indexPageConfig, 'index', defaultRoute, defaultSkip, defaultPageComponent);

    }

    protected getCreatePageConfig(config: CrudConfig): PageConfig {
        const defaultRoute = `${config.routeRoot}/create`;
        const defaultSkip = false;
        const defaultPageComponent: any = CreatePage;
        return this.getPageConfigOrDefaultsConfig(config, config.createPage, 'create', defaultRoute, defaultSkip, defaultPageComponent);
    }


    protected getEditPageConfig(config: CrudConfig): PageConfig {
        const defaultRoute = `${config.routeRoot}/edit`;
        const defaultSkip = false;
        const defaultPageComponent: any = UpdatePage;
        return this.getPageConfigOrDefaultsConfig(config, config.updatePage, 'edit', defaultRoute, defaultSkip, defaultPageComponent);
    }

    protected getDeletePage(config: CrudConfig): PageConfig {
        const defaultRoute = `${config.routeRoot}/remove`;
        const defaultSkip = false;
        const defaultPageComponent: any = DeletePage;
        return this.getPageConfigOrDefaultsConfig(config, config.deletePage, 'delete', defaultRoute, defaultSkip, defaultPageComponent);
    }

    protected getDetailsPage(config: CrudConfig): PageConfig {
        const defaultRoute = `${config.routeRoot}/details/:key`;
        const defaultSkip = false;
        const defaultPageComponent = DetailsPage;
        return this.getPageConfigOrDefaultsConfig(config, config.updatePage, 'delete', defaultRoute, defaultSkip, defaultPageComponent);
    }

    protected getCustomPagesConfig(config: CrudConfig): PageConfig[] {
        if (!config.pages) return [];

        const pageConfigArr: PageConfig[] = [];
        for (let pageConfig of config.pages) {
            if (!pageConfig.name) throw Error(`Custom page has no name`);
            if (!pageConfig.route) throw Error(`Page ${pageConfig.name} has no route`);
            if (!pageConfig.pageComponent) throw Error(`Page ${pageConfig.name} has no PageComponent`);
            pageConfigArr.push(this.getPageConfigOrDefaultsConfig(config, pageConfig,
                pageConfig.name, pageConfig.route, false, pageConfig.pageComponent)
            );
        }

        return pageConfigArr;
    }

    protected getPageConfigOrDefaultsConfig(config: CrudConfig,
                                            pageConfig: PageConfig | undefined,
                                            name: string,
                                            defaultRoute: string,
                                            defaultSkip: boolean,
                                            defaultPageComponent: any): PageConfig {
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
            route: pageConfig.route ? `${config.routeRoot}${pageConfig.route}` : defaultRoute,
            skip: pageConfig.skip ?? defaultSkip,
            pageComponent: pageConfig.pageComponent ?? defaultPageComponent,
            options: pageConfig.options ?? {}
        };
    }


}