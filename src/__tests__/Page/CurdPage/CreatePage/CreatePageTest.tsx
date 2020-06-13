import React from "react";
import {CrudContextValue} from "../../../../Root/CrudContext";
import {IndexPage} from "../../../../Page/CrudPage/Index/IndexPage";
import {MemoryRouter} from "react-router-dom";
import {configure, mount} from "enzyme";
import CreatePage from "../../../../Page/CrudPage/Create/CreatePage";
import Adapter from "enzyme-adapter-react-16";
import TextField from "react-auto-form-core/dist/DefaultElement/TextField";
import {FormPageOptions} from "../../../../Page/FormPage/FormPageOptions";
import {AutoCrudDefaults} from "../../../../Page/AutoCrudDefaults";

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
    updateState: () => null,
    updatePageOptions: () => null,
    getState: () => null
}


let pageRef: CreatePage | null;

function getPageJSXComponent(context: any, name: any) {
    return <MemoryRouter>
        <CreatePage ref={ref => pageRef = ref} name={name} context={context} history={(() => null) as any}
                    location={{} as any}
                    match={{} as any}/>
    </MemoryRouter>
}

function getMountedPage(context: any, name: string = 'create') {
    const pageWrapper = mount(getPageJSXComponent(context, name));
    const page: any = pageWrapper.find('CreatePage').getElement();
    return {
        wrapper: pageWrapper,
        page: page as IndexPage
    };
}

describe('CreatePageTest', () => {

    describe('onFail', () => {
        it('should set error when creating fails', function (done) {
            const _context = getNewContext();
            _context.updateState = (payload: any) => {
                expect(payload).toEqual({uiState: {pages: {create: {error: "MOCKED ERROR"}}}});
                done();
            }
            getMountedPage(_context);
            const config = pageRef?.getDefaultSubmitConfig();
            const error = 'MOCKED ERROR';
            config?.onFail?.(error);
        });

        it('should use onFail hook and stop execution', function () {
            const _context = getNewContext({onFail: () => false});
            _context.updateState = () => {
                //THIS SHOULD NEVER BE CALLED
                expect(1).toEqual(2);
            }

            getMountedPage(_context);
            const config = pageRef?.getDefaultSubmitConfig();
            const error = 'MOCKED ERROR';
            config?.onFail?.(error);
        });

        it('should use onFail hook and continue execution', function (done) {
            let mockedError = 'MOCKED ERROR';
            const _context = getNewContext({
                onFail: (page, error) => {
                    expect(page).toEqual(pageRef);
                    expect(error).toEqual(mockedError);
                    return true;
                }
            });
            _context.updateState = (payload: any) => {
                //THIS SHOULD NEVER BE CALLED
                expect(payload).toEqual({uiState: {pages: {create: {error: mockedError}}}});
                done();
            };
            _context.getState = () => ({uiState: {pages: {create: {}}}});


            getMountedPage(_context);
            const config = pageRef?.getDefaultSubmitConfig();
            config?.onFail?.(mockedError);
        });
    });

    describe('onSuccess', () => {

        it('should clear form and clear error state when creating succeed', function (done) {
            const _context = getNewContext();
            _context.updateState = (payload: any) => {
                expect(payload).toEqual({uiState: {pages: {create: {error: null}}}});
                done();
            }
            getMountedPage(_context);
            const formRef = pageRef?.getFormRef()!;
            formRef.getRegisteredField('test')?.setValue('ali');

            const config = pageRef?.getDefaultSubmitConfig();
            config?.onSuccess?.(undefined as any);
            expect(formRef.collect().getData()).toEqual({test: ''});
        });

        it('should clear form and clear error state when creating succeed and stop execution', function (done) {
            const mockedResponse = "mocked response";
            const _context = getNewContext({
                onSuccess: (page, response) => {
                    expect(page).toEqual(pageRef);
                    expect(response).toEqual(mockedResponse);
                    done();
                    return false;
                }
            });

            _context.updateState = (payload: any) => {
                //SHOULD NEVER BE CALLED
                expect(1).toEqual(2);
            }

            getMountedPage(_context);
            const formRef = pageRef?.getFormRef()!;
            formRef.getRegisteredField('test')?.setValue('ali');

            const config = pageRef?.getDefaultSubmitConfig();
            config?.onSuccess?.(mockedResponse as any);
            expect(formRef.collect().getData()).toEqual({test: 'ali'});
        });

        it('should clear form and clear error state when creating succeed and continue execution', function (done) {
            const mockedResponse = "mocked response";

            const _context = getNewContext({
                onSuccess: (page, response) => {
                    expect(page).toEqual(pageRef);
                    expect(response).toEqual(mockedResponse);
                    return true;
                }
            });
            _context.updateState = (payload: any) => {
                done();
                expect(payload).toEqual({uiState: {pages: {create: {error: null}}}});
            }

            getMountedPage(_context);
            const formRef = pageRef?.getFormRef()!;
            formRef.getRegisteredField('test')?.setValue('x');

            const config = pageRef?.getDefaultSubmitConfig();
            config?.onSuccess?.(mockedResponse as any);
            expect(formRef.collect().getData()).toEqual({test: ''});
        });

    });

    it('should return default page title', function () {
        getMountedPage(getNewContext());
        expect(pageRef?.getDefaultPageTitle()).toEqual(AutoCrudDefaults.pageTitles.create);
    });

    it('should return default http method', function () {
        getMountedPage(getNewContext());
        expect(pageRef?.getDefaultHttpMethod()).toEqual(AutoCrudDefaults.httpMethods.createRequest);
    });

    function getNewContext(options?: FormPageOptions) {
        const _context = JSON.parse(JSON.stringify(context));
        let pageOptions = {pageTitle: ''};
        if (options) {
            pageOptions = {...pageOptions, ...options};
        }
        _context.config.createPage.options = pageOptions;
        _context.config.fields = [{as: TextField, name: 'test'}];
        _context.getState = () => ({uiState: {pages: {}}});
        return _context;
    }
});