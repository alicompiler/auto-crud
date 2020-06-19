import CreatePage from "../../../Page/CrudPage/Create/CreatePage";
import {CrudConfig} from "../../../Root/CrudConfig";
import UpdatePage from "../../../Page/CrudPage/Update/UpdatePage";
import DeletePage from "../../../Page/CrudPage/Delete/DeletePage";
import DetailsPage from "../../../Page/CrudPage/Details/DetailsPage";
import {DefaultPageConfigModifier} from "../../../Page/PageConfigModifier/DefaultPageConfigModifier";

describe('Page Config Initializer', () => {

    const baseConfig: any = {routeRoot: '/root'};

    it('should get default create page config', function () {
        const modifier = new DefaultPageConfigModifier(baseConfig);
        const newConfig = modifier.modify();
        const createPageConfig = newConfig.createPage!;
        expect(createPageConfig.route).toEqual('/root/create');
        expect(createPageConfig.skip).toEqual(false);
        expect(createPageConfig.name).toEqual('create');
        expect(createPageConfig.pageComponent).toEqual(CreatePage);
        expect(createPageConfig.options).toEqual({});
    });

    it('should get create page config from crud config', function () {
        const MockedPage = {};
        const pageOptions = {test: 'option'};
        const config: CrudConfig = {
            ...baseConfig, createPage: {
                name: 'create-page',
                pageComponent: MockedPage,
                options: pageOptions,
                route: '/add',
                skip: true
            }
        };
        const modifier = new DefaultPageConfigModifier(config);
        const newConfig = modifier.modify();
        const createPageConfig = newConfig.createPage!;
        expect(createPageConfig.route).toEqual('/root/add');
        expect(createPageConfig.skip).toEqual(true);
        expect(createPageConfig.name).toEqual('create-page');
        expect(createPageConfig.pageComponent).toBe(MockedPage);
        expect(createPageConfig.options).toEqual(pageOptions);
    });

    it('should get default update page config', function () {
        const modifier = new DefaultPageConfigModifier(baseConfig);
        const newConfig = modifier.modify();
        const editPageConfig = newConfig.updatePage!;
        expect(editPageConfig.route).toEqual('/root/edit');
        expect(editPageConfig.skip).toEqual(false);
        expect(editPageConfig.name).toEqual('update');
        expect(editPageConfig.pageComponent).toEqual(UpdatePage);
        expect(editPageConfig.options).toEqual({});
    });

    it('should get update page config from crud config', function () {
        const testOptions: any = {test: 'option'};
        const MockedPage = {};
        const config: CrudConfig = {
            ...baseConfig, updatePage: {
                options: testOptions,
                pageComponent: MockedPage,
                skip: true,
                route: '/update'
            }
        };
        const modifier = new DefaultPageConfigModifier(config);
        const newConfig = modifier.modify();
        const editPageConfig = newConfig.updatePage!;
        expect(editPageConfig.route).toEqual('/root/update');
        expect(editPageConfig.skip).toEqual(true);
        expect(editPageConfig.name).toEqual('update');
        expect(editPageConfig.options).toEqual(testOptions);
        expect(editPageConfig.pageComponent).toBe(MockedPage);
    });

    it('should get default delete page config', function () {
        const modifier = new DefaultPageConfigModifier(baseConfig);
        const newConfig = modifier.modify();
        const deletePageConfig = newConfig.deletePage!;
        expect(deletePageConfig.route).toEqual('/root/remove');
        expect(deletePageConfig.skip).toEqual(false);
        expect(deletePageConfig.name).toEqual('delete');
        expect(deletePageConfig.options).toEqual({});
        expect(deletePageConfig.pageComponent).toEqual(DeletePage);
    });

    it('should get delete page config from crud config', function () {

        const MockedPage = {};
        const options = {test: 'options'};
        const config: CrudConfig = {
            ...baseConfig, deletePage: {
                skip: true, route: '/delete', options: options, pageComponent: MockedPage
            }
        };
        const modifier = new DefaultPageConfigModifier(config);
        const newConfig = modifier.modify();
        const deletePageConfig = newConfig.deletePage!;
        expect(deletePageConfig.route).toEqual('/root/delete');
        expect(deletePageConfig.skip).toEqual(true);
        expect(deletePageConfig.name).toEqual('delete');
        expect(deletePageConfig.options).toEqual(options);
        expect(deletePageConfig.pageComponent).toBe(MockedPage);
    });

    it('should get default details page config', function () {
        const modifier = new DefaultPageConfigModifier(baseConfig);
        const newConfig = modifier.modify();
        const detailsPage = newConfig.detailsPage!;
        expect(detailsPage.route).toEqual('/root/details');
        expect(detailsPage.skip).toEqual(false);
        expect(detailsPage.name).toEqual('details');
        expect(detailsPage.options).toEqual({});
        expect(detailsPage.pageComponent).toEqual(DetailsPage);
    });

    it('should get details page config from crud config', function () {

        const MockedPage = {};
        const options = {test: 'options'};
        const config: CrudConfig = {
            ...baseConfig, detailsPage: {
                skip: true, route: '/:id(\\d+)', options: options, pageComponent: MockedPage
            }
        };
        const modifier = new DefaultPageConfigModifier(config);
        const newConfig = modifier.modify();
        const deletePageConfig = newConfig.detailsPage!;
        expect(deletePageConfig.route).toEqual('/root/:id(\\d+)');
        expect(deletePageConfig.skip).toEqual(true);
        expect(deletePageConfig.name).toEqual('details');
        expect(deletePageConfig.options).toEqual(options);
        expect(deletePageConfig.pageComponent).toBe(MockedPage);
    });

    it('should get custom page config from crud config', function () {
        const MockedPage = {};
        const options = {test: 'options'};
        const config = {
            ...baseConfig, pages: [
                {route: '/page-1', name: 'page-one', pageComponent: MockedPage},
                {route: '/page-2', name: 'page-two', pageComponent: MockedPage, options: options},
            ]
        };

        const modifier = new DefaultPageConfigModifier(config);
        const newConfig = modifier.modify();
        const pages = newConfig.pages!;
        expect(pages[0].name).toEqual('page-one');
        expect(pages[0].skip).toEqual(false);
        expect(pages[0].route).toEqual('/root/page-1');
        expect(pages[0].pageComponent).toBe(MockedPage);
        expect(pages[0].options).toEqual({});

        expect(pages[1].name).toEqual('page-two');
        expect(pages[1].skip).toEqual(false);
        expect(pages[1].route).toEqual('/root/page-2');
        expect(pages[1].pageComponent).toBe(MockedPage);
        expect(pages[1].options).toBe(options);
    });

    it('should get page config from curd config if exists else get default', function () {
        const MockedPage = {};
        const pageOptions = {test: 'option'};
        const config: CrudConfig = {
            ...baseConfig,
            createPage: {name: 'create-page', pageComponent: MockedPage, options: pageOptions, route: '/add',},
            updatePage: {name: 'update-page', options: pageOptions, route: '/update'},
            deletePage: {name: 'delete-page', options: pageOptions},
            indexPage: {name: 'index-page'}
        };
        const modifier = new DefaultPageConfigModifier(config);
        const newConfig = modifier.modify();
        expect(newConfig.createPage!.skip).toEqual(false);
        expect(newConfig.updatePage!.pageComponent).toEqual(UpdatePage);
        expect(newConfig.deletePage!.route).toEqual('/root/remove');
        expect(newConfig.indexPage!.options).toEqual({});
    });

    it('should throw error when custom page does not provide name', function () {
        const config = {
            ...baseConfig, pages: [{route: '/page-1', pageComponent: CreatePage}]
        };
        const modifier = new DefaultPageConfigModifier(config);
        expect(() => modifier.modify()).toThrowError('Custom page has no name');
    });

    it('should throw error when custom page does not provide route', function () {
        const config = {
            ...baseConfig, pages: [{name: 'custom-page', pageComponent: CreatePage}]
        };
        const modifier = new DefaultPageConfigModifier(config);
        expect(() => modifier.modify()).toThrowError('Page custom-page has no route');
    });

    it('should throw error when custom page does not provide pageComponent', function () {
        const config = {
            ...baseConfig, pages: [{name: 'custom-page', route: '/test'}]
        };
        const modifier = new DefaultPageConfigModifier(config);
        expect(() => modifier.modify()).toThrowError('Page custom-page has no PageComponent');
    });

    it('should get empty array for pages when no custom pages provided', function () {
        const modifier = new DefaultPageConfigModifier(baseConfig);
        const newConfig = modifier.modify();
        expect(newConfig.pages).toHaveLength(0);
    });

});