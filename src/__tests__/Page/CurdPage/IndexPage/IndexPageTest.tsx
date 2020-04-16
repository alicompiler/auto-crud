import React from "react";

import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import {CrudContextValue} from "../../../../Root/CrudContext";
import {IndexPage} from "../../../../Page/CrudPage/Index/IndexPage";

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
    updateState: () => null,
    updatePageOptions: () => null
}

function getPageJSXComponent(context: any, name: any) {
    return <IndexPage name={name} context={context} history={(() => null) as any}
                      location={{} as any}
                      match={{} as any}/>
}

function getPageInstance(context: any, name: string = 'index'): IndexPage {
    const pageWrapper = mount(getPageJSXComponent(context, name));
    return pageWrapper.instance() as IndexPage;
}

