import {CrudContextValue} from "../../../Root/CrudContext";
import PageConfigUtils from "../../../Page/Base/PageConfigUtils";

describe('PageConfigUtils', () => {

    const context: CrudContextValue = {
        config: {
            name: 'test',
            endpointRoot: '',
            fields: [],
            indexPage: {name: 'index', options: {someKey: 'someValue'}},
            updatePage: {name: 'update'},
            detailsPage: {name: 'details'},
            deletePage: {name: 'delete', route: '/delete'},
            createPage: {name: 'createPage'},
            pages: [
                {name: 'page-one'},
                {name: 'page-two', route: '/page-two'}
            ]
        },
        state: {},
        updateState: () => null,
        getState: () => null
    }

    let utils: PageConfigUtils;

    beforeEach(() => {
        utils = new PageConfigUtils(context);
    })

    it('should get page config by name', function () {
        const indexPageConfig = utils.getPageConfigByName('index');
        const pageOneConfig = utils.getPageConfigByName('page-one');
        expect(indexPageConfig).toEqual(context.config.indexPage);
        expect(pageOneConfig).toEqual(context.config.pages![0]);
    });

    it('should get page state', function () {
        const updatePageState = utils.getPageState('update');
        const pageTwoState = utils.getPageState('page-two');
        expect(updatePageState).toEqual({x: 'Update'});
        expect(pageTwoState).toEqual({x: 'SOME VALUE'});
    });

    it('should update page state', function (done) {
        const _context = JSON.parse(JSON.stringify(context));
        _context.updateState = (payload: any) => {
            // const uiState = _context.ui;
            // uiState.pages['create'] = {x: 'Create'};
            // expect(payload).toEqual({ui: uiState});
            done();
        }

        const utils = new PageConfigUtils(_context);
        utils.updatePageState('create', {x: 'Create'});
    });

});