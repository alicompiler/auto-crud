import {configure} from "enzyme";
import CreatePage from "../../../../Page/CrudPage/Create/CreatePage";
import Adapter from "enzyme-adapter-react-16";
import {FormPageOptions} from "../../../../Page/FormPage/FormPageOptions";
import {AutoCrudDefaults} from "../../../../Defaults/AutoCrudDefaults";
import {TestingPageUtils} from "../../../../Utils/TestingPageUtils";

configure({adapter: new Adapter()});

let pageRef: CreatePage | null;

function getMountedPage(context?: any) {
    return TestingPageUtils.getMountedPage('createPage', 'create', CreatePage, 'CreatePage', (ref: any) => pageRef = ref, context);
}

function getNewContext(options?: FormPageOptions) {
    return TestingPageUtils.cloneContextForFormPage('createPage' , undefined , undefined , options);
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

            _context.updateState = () => {
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
        getMountedPage();
        expect(pageRef?.getDefaultPageTitle()).toEqual(AutoCrudDefaults.pageTitles.create);
    });

    it('should return default http method', function () {
        getMountedPage();
        expect(pageRef?.getDefaultHttpMethod()).toEqual(AutoCrudDefaults.httpMethods.createRequest);
    });

    it('should return http method from options', function () {
        getMountedPage(getNewContext({httpMethod : 'put'}));
        expect(pageRef?.getDefaultHttpMethod()).toEqual('put');
    });

});