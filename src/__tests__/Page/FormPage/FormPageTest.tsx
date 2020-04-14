import React from "react";
import {CrudContextValue} from "../../../Root/CrudContext";

import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import FormPage from "../../../Page/FormPage/FormPage";
import {FormPageDefault} from "../../../Defaults/Page/FormPageDefaults";


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
    return <FormPage name={name} context={context} history={(() => null) as any}
                     location={{} as any}
                     match={{} as any}/>
}

function getPageInstance(context: any, name: string = 'index'): FormPage {
    const pageWrapper = mount(getPageJSXComponent(context, name));
    return pageWrapper.instance() as FormPage;
}


describe('FormPage', () => {

    it('should get render options from  options', function () {
        const _context: CrudContextValue = JSON.parse(JSON.stringify(context));
        const renderOptions: any = {
            x: 1,
            y: 2
        };
        _context.config.indexPage!.options = {
            renderOptions: renderOptions
        }
        const page = getPageInstance(_context);
        expect(page.getFormRenderOptions()).toBe(renderOptions);
    });

    it('should get render options from defaults', function () {
        const page = getPageInstance(context);
        expect(page.getFormRenderOptions()).toEqual(FormPageDefault.form.renderOptions);
    });
})
