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
        updatePageOptions: () => null,
        updateState: () => null,
        getState: () => null
    }


    it('should get page config by name', function () {
        const utils = new PageConfigUtils(context);
        const indexPageConfig = utils.getPageConfigByName('index');
        const pageOneConfig = utils.getPageConfigByName('page-one');
        expect(indexPageConfig).toEqual(context.config.indexPage);
        expect(pageOneConfig).toEqual(context.config.pages![0]);
    });

    it('should get page state', function () {
        const mockGetState = jest.fn().mockReturnValue({
            uiState: {
                pages: {
                    update: {x: 'Update'},
                    'page-two': {x: 'SOME VALUE'}
                }
            }
        });
        const utils = new PageConfigUtils({...context, getState: mockGetState});
        const updatePageState = utils.getPageState('update');
        const pageTwoState = utils.getPageState('page-two');
        expect(updatePageState).toEqual({x: 'Update'});
        expect(pageTwoState).toEqual({x: 'SOME VALUE'});
    });

    it('should update page state', function (done) {
        const _context = JSON.parse(JSON.stringify(context));
        _context.getState = jest.fn().mockReturnValue({uiState: {pages: {create: {}}}})
        _context.updateState = (payload: any) => {
            expect(payload).toEqual({uiState: {pages: {create: {x: 'Create'}}}});
            done();
        }

        const utils = new PageConfigUtils(_context);
        utils.updatePageState('create', {x: 'Create'});
    });

});