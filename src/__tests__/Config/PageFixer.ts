import {PageConfigFixer} from "../../config/ConfigFixer/PageConfigFixer";

describe('_page fixer', () => {

    const baseConfig: any = {routeRoot: '/root'};

    it('should fix create _page Config when no createPage property exists', function () {
        const fixer = new PageConfigFixer();
        const newConfig = fixer.fix(baseConfig);
        const createPageConfig = newConfig.createPage!;
        expect(createPageConfig.route).toEqual('/root/create');
        expect(createPageConfig.skip).toEqual(false);
        expect(createPageConfig.name).toEqual('create');
    });

    it('should fix create _page Config with overriding properties from createPage property', function () {
        const config: any = {
            ...baseConfig, createPage: {skip: true, route: '/add'}
        };
        const fixer = new PageConfigFixer();
        const newConfig = fixer.fix(config);
        const createPageConfig = newConfig.createPage!;
        expect(createPageConfig.route).toEqual('/root/add');
        expect(createPageConfig.skip).toEqual(true);
        expect(createPageConfig.name).toEqual('create');
    });


    it('should fix edit _page Config when no createPage property exists', function () {
        const fixer = new PageConfigFixer();
        const newConfig = fixer.fix(baseConfig);
        const editPageConfig = newConfig.editPage!;
        expect(editPageConfig.route).toEqual('/root/edit');
        expect(editPageConfig.skip).toEqual(false);
        expect(editPageConfig.name).toEqual('edit');
    });

    it('should fix edit _page Config with overriding properties from editPage property', function () {
        const config: any = {
            ...baseConfig, editPage: {skip: true, route: '/update'}
        };
        const fixer = new PageConfigFixer();
        const newConfig = fixer.fix(config);
        const editPageConfig = newConfig.editPage!;
        expect(editPageConfig.route).toEqual('/root/update');
        expect(editPageConfig.skip).toEqual(true);
        expect(editPageConfig.name).toEqual('edit');
    });


    it('should fix delete _page Config when no deletePage property exists', function () {
        const fixer = new PageConfigFixer();
        const newConfig = fixer.fix(baseConfig);
        const deletePageConfig = newConfig.deletePage!;
        expect(deletePageConfig.route).toEqual('/root/remove');
        expect(deletePageConfig.skip).toEqual(false);
        expect(deletePageConfig.name).toEqual('delete');
    });

    it('should fix delete _page Config with overriding properties from deletePage property', function () {
        const config: any = {
            ...baseConfig, editPage: {skip: true, route: '/delete'}
        };
        const fixer = new PageConfigFixer();
        const newConfig = fixer.fix(config);
        const deletePageConfig = newConfig.deletePage!;
        expect(deletePageConfig.route).toEqual('/root/delete');
        expect(deletePageConfig.skip).toEqual(true);
        expect(deletePageConfig.name).toEqual('delete');
    });

    it('should fix custom pages', function () {
        const config = {
            ...baseConfig, pages: [
                {route: '/test-_page-1', name: '_page-1', pageComponent: () => null},
                {route: '/test-_page-2', name: '_page-2', pageComponent: () => null},
            ]
        };

        const fixer = new PageConfigFixer();
        const newConfig = fixer.fix(config);
        const pages = newConfig.pages!;
        expect(pages[0].name).toEqual('_page-1');
        expect(pages[0].skip).toEqual(false);
        expect(pages[0].route).toEqual('/root/test-_page-1');
        expect(typeof pages[0].pageComponent).toBe("function");

        expect(pages[1].name).toEqual('_page-2');
        expect(pages[1].skip).toEqual(false);
        expect(pages[1].route).toEqual('/root/test-_page-2');
        expect(typeof pages[1].pageComponent).toBe("function");
    });

});