import {CrudConfig} from "../../Root/CrudConfig";
import {UIStateInitializer} from "../../Root/ConfigInitializer/UIStateInitializer";

describe('UIStateInitializer', () => {

    it('should get pages state as empty object when no initialState in config', function () {
        const config: CrudConfig = {
            name: 'test',
            endpointRoot: '',
            fields: [],
            indexPage: {name: 'index'},
            createPage: {name: 'create'},
            deletePage: {name: 'delete'},
            detailsPage: {name: 'details'},
            updatePage: {name: 'update'},
            pages: [
                {name: 'page'}
            ],
        }
        const initializer = new UIStateInitializer(config);
        const uiState = initializer.initialize();

        expect(uiState.pages['index']).toEqual({});
        expect(uiState.pages['create']).toEqual({});
        expect(uiState.pages['delete']).toEqual({});
        expect(uiState.pages['details']).toEqual({});
        expect(uiState.pages['update']).toEqual({});
        expect(uiState.pages['page']).toEqual({});
    });

    it('should get pages state from initialState in config', function () {
        const config: CrudConfig = {
            name: 'test',
            endpointRoot: '',
            fields: [],
            indexPage: {name: 'index', options: {initialState: {x: 'A'}}},
            createPage: {name: 'create', options: {initialState: {x: 'B'}}},
            deletePage: {name: 'delete', options: {initialState: {x: 'C'}}},
            detailsPage: {name: 'details', options: {initialState: {x: 'D'}}},
            updatePage: {name: 'update', options: {initialState: {x: 'E'}}},
            pages: [
                {name: 'custom-page', options: {initialState: {x: 'Custom'}}}
            ],
        }
        const initializer = new UIStateInitializer(config);
        const uiState = initializer.initialize();

        expect(uiState.pages['index']).toEqual({x: 'A'});
        expect(uiState.pages['create']).toEqual({x: 'B'});
        expect(uiState.pages['delete']).toEqual({x: 'C'});
        expect(uiState.pages['details']).toEqual({x: 'D'});
        expect(uiState.pages['update']).toEqual({x: 'E'});
        expect(uiState.pages['custom-page']).toEqual({x: 'Custom'});
    });

});