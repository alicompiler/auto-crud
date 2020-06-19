import RoutesExtractor from "../../Root/RoutesExtractor";
import {IndexPage} from "../../Page/CrudPage/Index/IndexPage";
import CreatePage from "../../Page/CrudPage/Create/CreatePage";
import UpdatePage from "../../Page/CrudPage/Update/UpdatePage";
import DeletePage from "../../Page/CrudPage/Delete/DeletePage";
import DetailsPage from "../../Page/CrudPage/Details/DetailsPage";

describe('RouteExtractor', () => {

    const context: any = {
        config: {
            name: 'test', endpointRoot: '', fields: [],
            indexPage: {name: 'index', options: {}, skip: false, pageComponent: IndexPage, route: '/'},
            createPage: {name: 'create', options: {}, skip: false, pageComponent: CreatePage, route: '/create'},
            updatePage: {name: 'update', options: {}, skip: false, pageComponent: UpdatePage, route: '/update'},
            deletePage: {name: 'delete', options: {}, skip: false, pageComponent: DeletePage, route: '/delete'},
            detailsPage: {name: 'details', options: {}, skip: false, pageComponent: DetailsPage, route: '/details'},
            pages: []
        },
        state: {}, ui: {pages: {}, modals: {}}, updateState: () => null,
    };

    it('should extract routes from context', function () {
        const routesExtractor = new RoutesExtractor(context);
        const routes = routesExtractor.getRoutes();

        expect(routes).toHaveLength(5);
        expect(routes[0].key).toEqual('index');
        expect(routes[0].props.exact).toEqual(true);
        expect(routes[0].props.path).toEqual('/');
        expect(typeof routes[0].props.component).toEqual('function');

        expect(routes[1].key).toEqual('create');
        expect(routes[1].props.exact).toEqual(true);
        expect(routes[1].props.path).toEqual('/create');
        expect(typeof routes[1].props.component).toEqual('function');

        expect(routes[2].key).toEqual('update');
        expect(routes[2].props.exact).toEqual(true);
        expect(routes[2].props.path).toEqual('/update');
        expect(typeof routes[2].props.component).toEqual('function');

        expect(routes[3].key).toEqual('delete');
        expect(routes[3].props.exact).toEqual(true);
        expect(routes[3].props.path).toEqual('/delete');
        expect(typeof routes[3].props.component).toEqual('function');

        expect(routes[4].key).toEqual('details');
        expect(routes[4].props.exact).toEqual(true);
        expect(routes[4].props.path).toEqual('/details');
        expect(typeof routes[4].props.component).toEqual('function');
    });

    it('should skip flagged pages', function () {
        const _context: any = JSON.parse(JSON.stringify(context));
        _context.config.indexPage.skip = true;
        _context.config.createPage.skip = true;
        _context.config.updatePage.skip = true;
        _context.config.deletePage.skip = true;
        _context.config.detailsPage.skip = true;

        const routes = new RoutesExtractor(_context).getRoutes();
        expect(routes).toHaveLength(1);
        expect(routes[0].key).toEqual('index');
    });

    it('should extract routes for custom pages', function () {
        const _context = JSON.parse(JSON.stringify(context));
        _context.config.pages = [
            {name: 'page-1', route: '/page-one', pageComponent: IndexPage},
        ];

        const routes = new RoutesExtractor(_context).getRoutes();

        expect(routes).toHaveLength(6);
        expect(routes[5].props.path).toEqual('/page-one');
        expect(routes[5].props.exact).toEqual(true);
        expect(routes[5].key).toEqual('page-1');
        expect(typeof routes[5].props.component).toEqual('function');


    });

    // noinspection DuplicatedCode
    it('should skip flagged custom pages', function () {
        const _context = JSON.parse(JSON.stringify(context));
        _context.config.pages = [
            {name: 'page-1', route: '/page-one', pageComponent: IndexPage},
            {name: 'page-2', route: '/page-two', skip: true, pageComponent: IndexPage},
        ];

        const routes = new RoutesExtractor(_context).getRoutes();

        expect(routes).toHaveLength(6);
        expect(routes[5].key).toEqual('page-1');
        expect(routes[5].props.path).toEqual('/page-one');
        expect(routes[5].props.exact).toEqual(true);
        expect(typeof routes[5].props.component).toEqual('function');
    });

});