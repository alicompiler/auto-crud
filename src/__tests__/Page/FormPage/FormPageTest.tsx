import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import FormPage from "../../../Page/FormPage/FormPage";
import {AutoCrudDefaults} from "../../../Defaults/AutoCrudDefaults";
import TestingPageBuilder from "../../../Utils/TestingPageBuilder";


configure({adapter: new Adapter()});

let ref: FormPage = null as any;

describe('FormPage', () => {

    it('should get render options from  options', function () {
        new TestingPageBuilder()
            .setPageIndex('indexPage').setPageName('index')
            .setRefCallback(r => ref = r)
            .setComponent(FormPage)
            .setOptions({renderOptions: {test: 'test'}})
            .setPageState({})
            .mount()
        expect(ref.getFormRenderOptions().toString()).toBe({test: 'test'}.toString());
    });

    it('should get render options from defaults', function () {
        new TestingPageBuilder()
            .setPageIndex('indexPage').setPageName('index')
            .setRefCallback(r => ref = r)
            .setComponent(FormPage)
            .setPageState({})
            .mount()
        expect(ref.getFormRenderOptions()).toBe(AutoCrudDefaults.pages.formPage.renderOptions);
    });

    describe('onFail', () => {
        it('should set error when creating fails', function (done) {
            const mockedUpdateState = (payload: any) => {
                expect(payload).toEqual({uiState: {pages: {index: {__error: mockedError}}}});
                done();
            }
            const mockedError = 'MOCKED ERROR';

            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(FormPage).setRefCallback(r => ref = r)
                .setUpdateState(mockedUpdateState)
                .setPageState({})
                .mount();

            const config = ref.getDefaultSubmitConfig();
            config?.onFail?.(mockedError);
        });

        it('should use onFail hook and stop execution', function () {
            const mockedUpdateState = () => {
                throw Error("this should never be called")
            }
            const mockedError = 'MOCKED ERROR';

            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(FormPage).setRefCallback(r => ref = r)
                .setUpdateState(mockedUpdateState)
                .setPageState({})
                .setOptions({onFail: () => false})
                .mount();

            const config = ref.getDefaultSubmitConfig();
            config?.onFail?.(mockedError);
        });

        it('should use onFail hook and continue execution', function (done) {
            const mockedError = 'MOCKED ERROR';
            const onFail = (page: FormPage, error: any) => {
                expect(page).toEqual(ref);
                expect(error).toEqual(mockedError);
                return true;
            }
            const mockedUpdateState = (payload: any) => {
                expect(payload).toEqual({uiState: {pages: {index: {__error: mockedError}}}});
                done();
            }
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(FormPage).setRefCallback(r => ref = r)
                .setUpdateState(mockedUpdateState)
                .setPageState({})
                .setOptions({onFail: onFail})
                .mount();

            const config = ref.getDefaultSubmitConfig();
            config?.onFail?.(mockedError);
        });
    });

    describe('onSuccess', () => {

        it('should clear form and clear error state when creating succeed', function (done) {
            const mockedUpdateState = (payload: any) => {
                expect(payload).toEqual({uiState: {pages: {index: {__error: null}}}});
                done();
            }

            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(FormPage).setRefCallback(r => ref = r)
                .setUpdateState(mockedUpdateState)
                .setPageState({})
                .setDefaultFields()
                .mount();
            ref.getFormRef()?.getRegisteredField('test')?.setValue('ali');

            const config = ref?.getDefaultSubmitConfig();
            config?.onSuccess?.(undefined as any);
            expect(ref.getFormRef()?.collect().getData()).toEqual({test: ''});
        });

        it('should clear form and clear error state when creating succeed and stop execution', function (done) {
            const mockedResponse: any = "mocked response";
            const onSuccess = (page: FormPage, response: any) => {
                expect(page).toEqual(ref);
                expect(response).toEqual(mockedResponse);
                done();
                return false;
            }
            const mockedUpdateState = () => {
                throw Error("this should never be called");
            }

            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(FormPage).setRefCallback(r => ref = r)
                .setUpdateState(mockedUpdateState)
                .setPageState({})
                .setOptions({onSuccess: onSuccess})
                .setDefaultFields()
                .mount();
            ref.getFormRef()?.getRegisteredField('test')?.setValue('ali');

            const config = ref?.getDefaultSubmitConfig();
            config?.onSuccess?.(mockedResponse);
            expect(ref.getFormRef()?.collect().getData()).toEqual({test: 'ali'});
        });

        it('should clear form and clear error state when creating succeed and continue execution', function (done) {
            const mockedResponse: any = "mocked response";
            const onSuccess = (page: FormPage, response: any) => {
                expect(page).toEqual(ref);
                expect(response).toEqual(mockedResponse);
                return true;
            }
            const mockedUpdateState = (payload:any) => {
                expect(payload).toEqual({uiState: {pages: {index: {__error: null}}}});
                done();
            }

            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setRefCallback(r => ref = r)
                .setComponent(FormPage)
                .setUpdateState(mockedUpdateState)
                .setPageState({})
                .setOptions({onSuccess: onSuccess})
                .setDefaultFields()
                .mount();

            ref.getFormRef()?.getRegisteredField('test')?.setValue('ali');

            const config = ref?.getDefaultSubmitConfig();
            config?.onSuccess?.(mockedResponse);
            expect(ref.getFormRef()?.collect().getData()).toEqual({test: ''});
        });

    });

})
