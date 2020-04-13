import BaseCrudPage from "../../../Page/Base/BaseCrudPage";
import React from "react";
import {CrudContextValue} from "../../../Root/CrudContext";

import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";


configure({adapter: new Adapter()});


class SimpleBaseCrudPage extends BaseCrudPage {
    protected renderContent(): any {
        return <div data-testid={"simple-base-crud-page"}/>
    }
}

const context: CrudContextValue = {
    config: {
        name: 'text',
        fields: [],
        endpointRoot: '',
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


describe('BaseCrudPage', () => {

    // noinspection DuplicatedCode
    let container: Element | null = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container!);
        container!.remove();
        container = null;
    });

    it('should call onLoadAction,afterOnLoadAction', function (done) {
        const _context = JSON.parse(JSON.stringify(context));
        _context.config.indexPage.options = {
            onLoadAction: () => {
                return new Promise<any>(resolve => resolve('some value'));
            },
            afterOnLoadAction: (result: any) => {
                expect(result).toEqual('some value');
                done();
            }
        };

        mount(<SimpleBaseCrudPage name={'index'}
                                  context={_context}
                                  history={(() => '') as any}
                                  location={{} as any}
                                  match={{} as any}/>);

    });

    it('should set page title', function (done) {
        const _context = JSON.parse(JSON.stringify(context));
        _context.updateState = (payload: any) => {
            expect(payload).toEqual({pageTitle: 'Index Page'});
            done();
        }
        _context.config.indexPage.options = {
            pageTitle: 'Index Page'
        };

        mount(<SimpleBaseCrudPage name={'index'}
                                  context={_context}
                                  history={(() => '') as any}
                                  location={{} as any}
                                  match={{} as any}/>);


    });

    it('should call onDestroyAction', function (done: any) {
        const _context = JSON.parse(JSON.stringify(context));
        _context.config.indexPage.options = {
            onDestroyAction: () => {
                done();
            }
        };

        act(() => {
            render(<SimpleBaseCrudPage name={'index'}
                                       context={_context}
                                       history={(() => '') as any}
                                       location={{} as any}
                                       match={{} as any}/>, container);
        });


        unmountComponentAtNode(container!);

    });


    it('should return options as empty object when no options provided in config', function () {
        const _context = JSON.parse(JSON.stringify(context));
        _context.config.indexPage.options = undefined;

        const page = mount(<SimpleBaseCrudPage name={'index'}
                                               context={_context}
                                               history={(() => '') as any}
                                               location={{} as any}
                                               match={{} as any}/>);
        const pageInstance: BaseCrudPage = page.instance() as any;
        expect(pageInstance.getOptions()).toEqual({});
    });
    it('should return options defined in config', function () {
        const _context = JSON.parse(JSON.stringify(context));
        _context.config.indexPage.options = {x: 'Index'};

        const page = mount(<SimpleBaseCrudPage name={'index'}
                                               context={_context}
                                               history={(() => '') as any}
                                               location={{} as any}
                                               match={{} as any}/>);
        const pageInstance: BaseCrudPage = page.instance() as any;
        expect(pageInstance.getOptions()).toEqual({x: 'Index'});
    });

    it('should get page state', function () {

        const page = mount(<SimpleBaseCrudPage name={'index'}
                                               context={context}
                                               history={(() => '') as any}
                                               location={{} as any}
                                               match={{} as any}/>);
        const pageInstance: BaseCrudPage = page.instance() as any;
        expect(pageInstance.getState()).toEqual({someKey: 'someValue'});
    });

    it('should return context', function () {

        const page = mount(<SimpleBaseCrudPage name={'index'}
                                               context={context}
                                               history={(() => '') as any}
                                               location={{} as any}
                                               match={{} as any}/>);
        const pageInstance: BaseCrudPage = page.instance() as any;
        expect(pageInstance.getContext()).toBe(context);
    });

    it('should updatePageState', function (done) {
        const _context = JSON.parse(JSON.stringify(context));
        _context.updateState = (payload: any) => {
            const uiState = {..._context.ui};
            uiState.pages.index = {x: 'Y', someKey: 'someValue'};
            expect(payload).toEqual({ui: uiState});
            done();
        }

        const page = mount(<SimpleBaseCrudPage name={'index'}
                                               context={_context}
                                               history={(() => '') as any}
                                               location={{} as any}
                                               match={{} as any}/>);

        const pageInstance: BaseCrudPage = page.instance() as any;
        pageInstance.updateState({x: 'Y'});
    });


    it('should render content', function () {
        act(() => {
            render(<SimpleBaseCrudPage name={'index'}
                                       context={context}
                                       history={(() => '') as any}
                                       location={{} as any}
                                       match={{} as any}/>, container);
        });

        const content = container!.querySelector('div[data-testid="simple-base-crud-page"]');
        expect(content).toBeTruthy();
    });
});