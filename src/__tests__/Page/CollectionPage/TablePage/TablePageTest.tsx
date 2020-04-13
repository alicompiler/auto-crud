import {CrudContextValue} from "../../../../Root/CrudContext";
import {configure, mount} from "enzyme";
import React from "react";
import {TablePage} from "../../../../Page/CollectionPage/TablePage/TablePage";
import Adapter from "enzyme-adapter-react-16";
import {CollectionPageDefaults} from "../../../../Defaults/Page/CollectionPageDefaults";
import {TableRenderOptions} from "auto-collection";

configure({adapter: new Adapter()});

const context: CrudContextValue = {
    config: {
        name: 'text',
        fields: [],
        endpointRoot: '/base-api/',
        indexPage: {name: 'index'},
        createPage: {name: 'create'},
        updatePage: {name: 'update'},
        deletePage: {name: 'delete'},
        detailsPage: {name: 'details'},
        pages: [],
    },
    state: {},
    ui: {pages: {index: {someKey: 'someValue'}}, modals: {}},
    updateState: () => null
}

function getPageJSXComponent(context: any, name: any) {
    return <TablePage name={name} context={context} history={(() => null) as any}
                      location={{} as any}
                      match={{} as any}/>
}

function getPageInstance(context: any, name: string = 'index'): TablePage {
    const pageWrapper = mount(getPageJSXComponent(context, name));
    return pageWrapper.instance() as TablePage;
}


describe('TablePageTest', () => {

    it('should return render options from defaults', function () {
        const page = getPageInstance(context);
        const renderOptions = page.getRenderOptions();
        expect(renderOptions).toEqual(new TableRenderOptions(CollectionPageDefaults.renderOptionsConfig));
    });

    it('should return render options from defaults overriding passed config from options', function () {
        const _context = JSON.parse(JSON.stringify(context));
        _context.config.indexPage.options = {
            renderOptionsConfig: {rowClassName: 'class-name'}
        };
        const page = getPageInstance(_context);
        const renderOptions = page.getRenderOptions();
        expect(renderOptions).toEqual(new TableRenderOptions({
            ...CollectionPageDefaults.renderOptionsConfig,
            rowClassName: 'class-name'
        }));
    });


});