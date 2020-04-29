import {PageOptionsModifier} from "../../../Page/PageConfigModifier/PageOptionsModifier";
import {CrudConfig} from "../../../Root/CrudConfig";

describe('PageOptionsModifier', () => {

    const config: CrudConfig = {
        indexPage: {name: 'index', options: {}},
        updatePage: {name: 'update', options: {someKey: 'Value'}},
        detailsPage: {name: 'details', options: {actions: []}},
        deletePage: {name: 'delete'},
        createPage: {name: 'create'},
        pages: [
            {name: 'page-one', options: {}},
            {name: 'page-two', options: {two: true}},
            {name: 'page-three'},
        ],
        endpointRoot: '',
        fields: [],
        name: 'test'
    }

    it('should modify index page options', function () {
        const modifier = new PageOptionsModifier(config, 'index', {newOptions: true});
        const newConfig = modifier.modify();
        const expectedConfig = {...config};
        expectedConfig.indexPage!.options = {newOptions: true};
        expect(newConfig).toEqual(expectedConfig);
    });

    it('should modify create page options', function () {
        const modifier = new PageOptionsModifier(config, 'create', {newOptions: true});
        const newConfig = modifier.modify();
        const expectedConfig = {...config};
        expectedConfig.createPage!.options = {newOptions: true};
        expect(newConfig).toEqual(expectedConfig);
    });

    it('should modify update page options', function () {
        const modifier = new PageOptionsModifier(config, 'update', {newOptions: true});
        const newConfig = modifier.modify();
        const expectedConfig = {...config};
        expectedConfig.updatePage!.options = {newOptions: true, someKey: 'Value'};
        expect(newConfig).toEqual(expectedConfig);
    });

    it('should modify details page options', function () {
        const modifier = new PageOptionsModifier(config, 'details', {newOptions: true});
        const newConfig = modifier.modify();
        const expectedConfig = {...config};
        expectedConfig.detailsPage!.options = {newOptions: true, actions: []};
        expect(newConfig).toEqual(expectedConfig);
    });

    it('should modify delete page options', function () {
        const modifier = new PageOptionsModifier(config, 'delete', {newOptions: true});
        const newConfig = modifier.modify();
        const expectedConfig = {...config};
        expectedConfig.deletePage!.options = {newOptions: true};
        expect(newConfig).toEqual(expectedConfig);
    });


    it('should modify page-one page options', function () {
        const modifier = new PageOptionsModifier(config, 'page-one', {newOptions: true});
        const newConfig = modifier.modify();
        const expectedConfig = {...config};
        expectedConfig.pages![0].options = {newOptions: true};
        expect(newConfig).toEqual(expectedConfig);
    });


    it('should modify page-one page options', function () {
        const modifier = new PageOptionsModifier(config, 'page-two', {newOptions: true});
        const newConfig = modifier.modify();
        const expectedConfig = {...config};
        expectedConfig.pages![1].options = {newOptions: true, two: true};
        expect(newConfig).toEqual(expectedConfig);
    });

    it('should modify page-three page options', function () {
        const modifier = new PageOptionsModifier(config, 'page-three', {newOptions: true});
        const newConfig = modifier.modify();
        const expectedConfig = {...config};
        expectedConfig.pages![2].options = {newOptions: true};
        expect(newConfig).toEqual(expectedConfig);
    });
})