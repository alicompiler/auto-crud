import {BasePageConfigModifier} from "./PageConfigModifier";
import {PageConfig} from "../../Page/PageConfig";
import {IndexPage} from "../../Page/CrudPage/Index/IndexPage";
import CreatePage from "../../Page/CrudPage/Create/CreatePage";
import UpdatePage from "../../Page/CrudPage/Update/UpdatePage";
import DeletePage from "../../Page/CrudPage/Delete/DeletePage";
import DetailsPage from "../../Page/CrudPage/Details/DetailsPage";

export class DefaultPageConfigModifier extends BasePageConfigModifier {
    handleCreatePage(): PageConfig {
        const defaultRoute = `${this.getConfig().routeRoot}/create`;
        const defaultPageComponent: any = CreatePage;
        return this.getPageConfig(this.getConfig().createPage, 'create', defaultRoute, defaultPageComponent);
    }

    handleDeletePage(): PageConfig {
        const defaultRoute = `${this.getConfig().routeRoot}/remove`;
        const defaultPageComponent: any = DeletePage;
        return this.getPageConfig(this.getConfig().deletePage, 'delete', defaultRoute, defaultPageComponent);
    }

    handleDetailsPage(): PageConfig {
        const defaultRoute = `${this.getConfig().routeRoot}/details`;
        const defaultPageComponent = DetailsPage;
        return this.getPageConfig(this.getConfig().detailsPage, 'details', defaultRoute, defaultPageComponent);
    }

    handleIndexPage(): PageConfig {
        const defaultRoute = this.getConfig().routeRoot!;
        const defaultPageComponent: any = IndexPage;
        return this.getPageConfig(this.getConfig().indexPage, 'index', defaultRoute, defaultPageComponent);
    }

    handleOtherPages(): PageConfig[] {
        const pages = this.getConfig().pages;
        if (!pages)
            return [];
        return pages.map(pageConfig => {
            if (!pageConfig.name) throw Error(`Custom page has no name`);
            if (!pageConfig.route) throw Error(`Page ${pageConfig.name} has no route`);
            if (!pageConfig.pageComponent) throw Error(`Page ${pageConfig.name} has no PageComponent`);
            return this.getPageConfig(pageConfig, pageConfig.name, pageConfig.route, pageConfig.pageComponent);
        });
    }

    handleUpdatePage(): PageConfig {
        const defaultRoute = `${this.getConfig().routeRoot}/edit`;
        const defaultPageComponent: any = UpdatePage;
        return this.getPageConfig(this.getConfig().updatePage, 'update', defaultRoute, defaultPageComponent);
    }

    private getPageConfig(passedConfig: PageConfig | undefined, defaultName: string, defaultRoute: string, defaultComponent: any): PageConfig {
        passedConfig = passedConfig ?? {};
        return {
            name: passedConfig.name ?? defaultName,
            route: passedConfig.route ? `${this.getConfig().routeRoot}${passedConfig.route}` : defaultRoute,
            skip: passedConfig.skip ?? false,
            pageComponent: passedConfig.pageComponent ?? defaultComponent,
            options: passedConfig.options ?? {}
        };
    }

}