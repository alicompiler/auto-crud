import {CrudContextValue} from "../../../Root/CrudContext";
import {configure, mount} from "enzyme";
import StatefulCrudPage from "../../../Page/Base/StatefulCrudPage";
import React from "react";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

class SimpleCrudPageWithStatus extends StatefulCrudPage {
    protected renderMainContent(): any {
        return null;
    }
}

describe('BaseCrudPageWithStatus', () => {

    const context: CrudContextValue = {
        getState: () => null,
        updatePageOptions: () => null,
        updateState: () => null,
        state: {},
        config: {
            indexPage: {name: 'index'},
            createPage: {name: 'create'},
            updatePage: {name: 'update'},
            deletePage: {name: 'delete'},
            detailsPage: {name: 'details'},
            pages: [],
            endpointRoot: '',
            name: 'test',
            fields: [],
        }
    }

    it('should return loading/error/success state', function () {
        const _context = {
            ...context, getState: () => {
                return {
                    uiState: {
                        pages: {
                            index: {
                                __loading: true,
                                __successMessage: 'success message',
                                __errorMessage: 'error message'
                            }
                        }
                    }
                }
            }
        }
        const page = mount(<SimpleCrudPageWithStatus name={'index'}
                                                     context={_context}
                                                     history={null as any}
                                                     location={null as any}
                                                     match={null}/>);
        const instance: StatefulCrudPage = page.instance() as any;

        expect(instance.isLoading()).toEqual(true);
        expect(instance.getSuccessMessage()).toEqual('success message');
        expect(instance.getErrorMessage()).toEqual('error message');
    });


    describe('Update Status', () => {

        it('should update loading/success/error state', function (done) {

            const callback = jest.fn();
            const _context = {
                ...context, updateState: (payload: any) => {
                    const indexState = payload.uiState.pages.index;
                    expect(indexState).toEqual({
                        __loading: false,
                        __errorMessage: 'E',
                        __successMessage: 'S'
                    });
                    done();
                },
                getState: () => ({uiState: {pages: {index: {}}}})
            }
            const page = mount(<SimpleCrudPageWithStatus name={'index'}
                                                         context={_context}
                                                         history={null as any}
                                                         location={null as any}
                                                         match={null}/>);
            const instance: StatefulCrudPage = page.instance() as any;
            instance.updateLoadingErrorSuccess(false, 'E', 'S', callback);
        });

        it('should not add to payload when value is undefined', function (done) {

            const _context = {
                ...context, updateState: (payload: any) => {
                    const indexState = payload.uiState.pages.index;
                    expect(indexState).toEqual({});
                    done();
                },
                getState: () => ({uiState: {pages: {index: {}}}})
            }
            const page = mount(<SimpleCrudPageWithStatus name={'index'}
                                                         context={_context}
                                                         history={null as any}
                                                         location={null as any}
                                                         match={null}/>);
            const instance: StatefulCrudPage = page.instance() as any;
            instance.updateLoadingErrorSuccess(undefined, undefined, undefined);
        });

        it('should add to payload when value is null', function (done) {

            const _context = {
                ...context, updateState: (payload: any) => {
                    const indexState = payload.uiState.pages.index;
                    expect(indexState).toEqual({__loading: null, __errorMessage: null, __successMessage: null});
                    done();
                },
                getState: () => ({uiState: {pages: {index: {}}}})
            }
            const page = mount(<SimpleCrudPageWithStatus name={'index'}
                                                         context={_context}
                                                         history={null as any}
                                                         location={null as any}
                                                         match={null}/>);
            const instance: StatefulCrudPage = page.instance() as any;
            instance.updateLoadingErrorSuccess(null, null, null);
        });

    });

    describe('Render Status Components', () => {

        it('should render success when successMessage has value', function () {

            const _context = {
                ...context,
                getState: () => ({
                    uiState: {
                        pages: {
                            index: {__loading: true, __errorMessage: 'E', __successMessage: 'S'}
                        }
                    }
                })
            }
            const page = mount(<SimpleCrudPageWithStatus name={'index'}
                                                         context={_context}
                                                         history={null as any}
                                                         location={null as any}
                                                         match={null}/>);
            const instance: StatefulCrudPage = page.instance() as any;
            mockStatusMethodsAndCallRenderContent(instance);

            expect(instance.renderErrorMessageComponent).not.toBeCalled();
            expect(instance.renderLoadingComponent).not.toBeCalled();
            expect(instance.renderSuccessMessageComponent).toBeCalled();

        });

        it('should render loading/error when loading/errorMessage has value', function () {

            const _context = {
                ...context,
                getState: () => ({
                    uiState: {
                        pages: {
                            create: {__loading: true, __errorMessage: 'E', __successMessage: null}
                        }
                    }
                })
            }
            const page = mount(<SimpleCrudPageWithStatus name={'create'}
                                                         context={_context}
                                                         history={null as any}
                                                         location={null as any}
                                                         match={null}/>);
            const instance: StatefulCrudPage = page.instance() as any;
            mockStatusMethodsAndCallRenderContent(instance);

            expect(instance.renderErrorMessageComponent).toBeCalled();
            expect(instance.renderLoadingComponent).toBeCalled();
            expect(instance.renderSuccessMessageComponent).not.toBeCalled();

        });

        it('should navigate home when success button clicked', function () {
            const _context = {
                ...context,
                getState: () => ({
                    uiState: {
                        pages: {
                            index: {__loading: true, __errorMessage: 'E', __successMessage: 'S'}
                        }
                    }
                })
            }
            const page = mount(<SimpleCrudPageWithStatus name={'index'}
                                                         context={_context}
                                                         history={null as any}
                                                         location={null as any}
                                                         match={null}/>);
            const instance: StatefulCrudPage = page.instance() as any;
            instance.navigateToHome = jest.fn();

            const button = page.find('button').getElement();
            button.props.onClick(null as any);
            expect(instance.navigateToHome).toBeCalled();
        });

        function mockStatusMethodsAndCallRenderContent(instance: StatefulCrudPage) {
            instance.renderSuccessMessageComponent = jest.fn().mockReturnValue(null);
            instance.renderErrorMessageComponent = jest.fn().mockReturnValue(null);
            instance.renderLoadingComponent = jest.fn().mockReturnValue(null);
            instance.renderContent();
        }
    });


})