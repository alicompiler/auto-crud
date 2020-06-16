import {CrudContextValue} from "../../../../Root/CrudContext";
import {configure, mount} from "enzyme";
import React from "react";
import {TablePage} from "../../../../Page/CollectionPage/TablePage/TablePage";
import Adapter from "enzyme-adapter-react-16";
import {TableRenderOptions} from "auto-collection";
import {AutoCrudDefaults} from "../../../../Defaults/AutoCrudDefaults";
import {TablePageOptions} from "../../../../Page/CollectionPage/TablePage/TablePageOptions";
import {TestingPageUtils} from "../../../../Utils/TestingPageUtils";

configure({adapter: new Adapter()});


function getPageJSXComponent(context: any, name: any) {
    return <TablePage name={name} context={context} history={(() => null) as any}
                      location={{} as any}
                      match={{} as any}/>
}

function mountPage(context?: CrudContextValue, options?: TablePageOptions, state?: any, updateState?: any): TablePage {
    if (!context) {
        context = JSON.parse(JSON.stringify(TestingPageUtils.contextTemplate));
    }
    context!.updateState = updateState;
    context!.getState = () => ({uiState: {pages: {index: state ?? {}}}});
    context!.config.indexPage!.options = options ?? {}

    const pageWrapper = mount(getPageJSXComponent(context, 'index'));
    return pageWrapper.instance() as TablePage;
}


describe('TablePageTest', () => {

    it('should use render options from page options', function () {
        const page = mountPage(undefined , {collectionRenderOptions : {}});
        expect(page.getRenderOptions()).toEqual({});
    });

    it('should return render options from defaults', function () {
        const page = mountPage();
        page.getDefaultExtraColumns = jest.fn().mockReturnValue([]);
        const renderOptions = page.getRenderOptions();
        const config = {...AutoCrudDefaults.components.tableRenderOptionsConfig, orderBy: undefined, extraColumns: []};
        expect(renderOptions).toEqual(new TableRenderOptions(config));
    });

    it('should return render options from defaults with overriding options', function () {
        const page = mountPage(undefined, {
            renderOptionsConfig: {x: 1, y: 2}
        });
        page.getDefaultExtraColumns = jest.fn().mockReturnValue([]);
        const renderOptions = page.getRenderOptions();
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
        const page = mountPage(undefined, {renderOptionsConfig: {rowClassName: 'class-name'}});
        page.getDefaultExtraColumns = jest.fn().mockReturnValue([]);
        const renderOptions = page.getRenderOptions();
        expect(renderOptions).toEqual(new TableRenderOptions({
            ...AutoCrudDefaults.components.tableRenderOptionsConfig,
            orderBy : undefined,
            extraColumns : [],
            rowClassName: 'class-name'
        }));
    });

    it('should return default actions column', function () {
        const page = mountPage();
        const extraColumns = page.getDefaultExtraColumns();
        expect(String(extraColumns)).toEqual(String([AutoCrudDefaults.components.tableActionsColumn()]))
    });


});