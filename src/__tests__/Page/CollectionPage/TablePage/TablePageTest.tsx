import {configure} from "enzyme";
import {TablePage} from "../../../../Page/CollectionPage/TablePage/TablePage";
import Adapter from "enzyme-adapter-react-16";
import {TableRenderOptions} from "auto-collection";
import {AutoCrudDefaults} from "../../../../Defaults/AutoCrudDefaults";
import TestingPageBuilder from "../../../../Utils/TestingPageBuilder";

configure({adapter: new Adapter()});


let ref: TablePage = null as any;

describe('TablePageTest', () => {

    it('should use render options from page options', function () {
        new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
            .setOptions({collectionRenderOptions: {}})
            .setRefCallback(r => ref = r)
            .setComponent(TablePage)
            .mount()
        expect(ref.getRenderOptions()).toEqual({});
    });

    it('should return render options from defaults', function () {
        new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
            .setRefCallback(r => ref = r)
            .setComponent(TablePage)
            .mount()

        ref.getDefaultExtraColumns = jest.fn().mockReturnValue([]);
        const renderOptions = ref.getRenderOptions();
        const config = {...AutoCrudDefaults.components.tableRenderOptionsConfig, orderBy: undefined, extraColumns: []};
        expect(renderOptions).toEqual(new TableRenderOptions(config));
    });

    it('should return render options from defaults with overriding options', function () {
        new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
            .setRefCallback(r => ref = r)
            .setComponent(TablePage)
            .setOptions({renderOptionsConfig: {x: 1, y: 2}})
            .mount()

        ref.getDefaultExtraColumns = jest.fn().mockReturnValue([]);
        const renderOptions = ref.getRenderOptions();
        const config = {
            ...AutoCrudDefaults.components.tableRenderOptionsConfig,
            orderBy: undefined,
            extraColumns: [],
            x: 1,
            y: 2
        };
        expect(renderOptions).toEqual(new TableRenderOptions(config));
    });

    it('should return render options from defaults overriding passed config from options', function () {
        new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
            .setRefCallback(r => ref = r)
            .setComponent(TablePage)
            .setOptions({renderOptionsConfig: {rowClassName: 'class-name'}})
            .mount()

        ref.getDefaultExtraColumns = jest.fn().mockReturnValue([]);
        const renderOptions = ref.getRenderOptions();
        expect(renderOptions).toEqual(new TableRenderOptions({
            ...AutoCrudDefaults.components.tableRenderOptionsConfig,
            orderBy: undefined,
            extraColumns: [],
            rowClassName: 'class-name'
        }));
    });

    it('should return default actions column', function () {
        const builder = new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
            .setRefCallback(r => ref = r)
            .setComponent(TablePage)
            .setOptions({renderOptionsConfig: {rowClassName: 'class-name'}});

        builder.mount();
        const context = builder.buildContext();

        const extraColumns = ref.getDefaultExtraColumns();
        expect(String(extraColumns)).toEqual(String([AutoCrudDefaults.components.tableActionsColumn(context)]))
    });


});