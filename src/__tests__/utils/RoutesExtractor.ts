import RoutesExtractor from "../../utils/RoutesExtractor";

describe('route extractor', () => {
    it('should extract routes from Config', function () {

        const config: any = {
            createPage: {route: '/Root/create', name: 'create', pageComponent: () => null, skip: false},
            editPage: {route: '/Root/edit', name: 'edit', pageComponent: () => null, skip: false},
            deletePage: {route: '/Root/remove', name: 'delete', pageComponent: () => null, skip: false},
            pages: [
                {route: '/Root/_page-1', name: '_page-1', pageComponent: () => null, skip: false},
                {route: '/Root/_page-2', name: '_page-2', pageComponent: () => null, skip: false}
            ],
        };

        const context: any = {config: config};
        const extractor = new RoutesExtractor(context);
        const routes = extractor.getRoutes();
        expect(routes).toHaveLength(5);
        expect(routes[0].key).toEqual('create');
        expect(routes[0].props.path).toEqual('/Root/create');
        expect(routes[0].props.exact).toEqual(true);
        expect(typeof routes[0].props.component).toBe('function');

        expect(routes[1].key).toEqual('edit');
        expect(routes[1].props.path).toEqual('/Root/edit');
        expect(routes[1].props.exact).toEqual(true);
        expect(typeof routes[1].props.component).toBe('function');

        expect(routes[2].key).toEqual('delete');
        expect(routes[2].props.path).toEqual('/Root/remove');
        expect(routes[2].props.exact).toEqual(true);
        expect(typeof routes[2].props.component).toBe('function');

        expect(routes[3].key).toEqual('_page-1');
        expect(routes[3].props.path).toEqual('/Root/_page-1');
        expect(routes[3].props.exact).toEqual(true);
        expect(typeof routes[3].props.component).toBe('function');
    });

    it('should skip route with skip property set to true', function () {
        const config: any = {
            createPage: {route: '/Root/create', name: 'create', pageComponent: () => null, skip: true},
            editPage: {route: '/Root/edit', name: 'edit', pageComponent: () => null, skip: true},
            deletePage: {route: '/Root/remove', name: 'delete', pageComponent: () => null, skip: true},
            pages: [
                {route: '/Root/_page-1', name: '_page-1', pageComponent: () => null, skip: false},
                {route: '/Root/_page-2', name: '_page-2', pageComponent: () => null, skip: true}
            ],
        };
        const context: any = {config: config};
        const extractor = new RoutesExtractor(context);
        const routes = extractor.getRoutes();

        expect(routes).toHaveLength(1);

    });
});