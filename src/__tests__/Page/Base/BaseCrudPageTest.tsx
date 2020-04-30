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
    updateState: () => null,
    updatePageOptions: () => null,
    getState: () => null
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

        const _context = {...context};
        _context.getState = jest.fn().mockReturnValue({uiState: {pages: {index: {someKey: 'someValue'}}}});
        const page = mount(<SimpleBaseCrudPage name={'index'}
                                               context={_context}
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
        _context.getState = jest.fn().mockReturnValue({uiState: {pages: {index: {}}}})
        _context.updateState = (payload: any) => {
            const uiState = {..._context.getState().uiState};
            uiState.pages.index = {x: 'Y'};
            expect(payload).toEqual({uiState: uiState});
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

    it('should update page options', function (done) {
        const _context = JSON.parse(JSON.stringify(context));
        let callback = jest.fn();
        _context.updatePageOptions = (pageName: string, newOptions: any, afterCallback: () => void) => {
            expect(pageName).toEqual('index');
            expect(newOptions).toEqual({x: '1'});
            expect(afterCallback).toBe(callback);
            done();
        }

        const page = mount(<SimpleBaseCrudPage name={'index'}
                                               context={_context}
                                               history={(() => '') as any}
                                               location={{} as any}
                                               match={{} as any}/>);

        const pageInstance: BaseCrudPage = page.instance() as any;
        pageInstance.updateOptions({x: '1'}, callback);
    });


    it('should navigate home', function (done) {
        const history: any = {
            push: () => {
                done();
            }
        };


        const component = mount(<SimpleBaseCrudPage name={'index'}
                                                    context={context}
                                                    history={history}
                                                    location={{} as any}
                                                    match={{} as any}/>);
        const page: BaseCrudPage = component.instance() as any;
        page.navigateToHome();
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

    describe('Toolbar', () => {
        it('should render null for toolbar when set to null in config', function () {
            const _context = JSON.parse(JSON.stringify(context));
            _context.config.indexPage.toolbar = null;
            const page = mount(<SimpleBaseCrudPage name={'index'}
                                                   context={_context}
                                                   history={(() => '') as any}
                                                   location={{} as any}
                                                   match={{} as any}/>).instance() as BaseCrudPage;

            expect(page.renderToolbar()).toBeNull();
        });

        it('should render toolbar using function in config', function () {
            const _context = JSON.parse(JSON.stringify(context));
            _context.config.indexPage.toolbar = (page: BaseCrudPage) => page.props.name;
            const page = mount(<SimpleBaseCrudPage name={'index'}
                                                   context={_context}
                                                   history={(() => '') as any}
                                                   location={{} as any}
                                                   match={{} as any}/>).instance() as BaseCrudPage;

            expect(page.renderToolbar()).toEqual('index');
        });


        it('should render null as default toolbar renderer', function () {
            const page = mount(<SimpleBaseCrudPage name={'index'}
                                                   context={context}
                                                   history={(() => '') as any}
                                                   location={{} as any}
                                                   match={{} as any}/>).instance() as BaseCrudPage;
            expect(page.renderToolbar()).toBeNull();
        });
    })


});