import CreatePage from "../../../../Page/CrudPage/Create/CreatePage";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import UpdatePage from "../../../../Page/CrudPage/Update/UpdatePage";
import {AutoCrudDefaults} from "../../../../Defaults/AutoCrudDefaults";
import {TestingPageUtils} from "../../../TestingUtils/TestingPageUtils";
import {FormPageOptions} from "../../../../Page/FormPage/FormPageOptions";

configure({adapter: new Adapter()});


let pageRef: CreatePage | null;

function getMountedPage(context?: any) {
    return TestingPageUtils.getMountedPage('updatePage', 'update', UpdatePage, 'UpdatePage', (ref: any) => pageRef = ref, context);
}

function getNewContext(options?: FormPageOptions) {
    return TestingPageUtils.cloneContextForFormPage('updatePage', undefined, undefined, options);
}


describe('UpdatePage', () => {

    it('should return default page title', function () {
        getMountedPage();
        expect(pageRef?.getDefaultPageTitle()).toEqual(AutoCrudDefaults.pageTitles.update);
    });

    it('should return default update request http method', function () {
        getMountedPage();
        expect(pageRef?.getDefaultHttpMethod()).toEqual(AutoCrudDefaults.httpMethods.updateRequest);
    });

    it('should return initial state', function () {
        const _context = getNewContext();
        const mockedItem = {test: true};
        _context.getState = () => ({uiState: {pages: {update: {__item: mockedItem}}}});
        getMountedPage(_context);
        const initialState = pageRef?.getInitialValues();
        expect(initialState).toEqual(mockedItem);
    });

    it('should return empty object when __item is not set', function () {
        const _context = getNewContext();
        _context.getState = () => ({uiState: {pages: {update: {}}}});
        getMountedPage(_context);
        const initialState = pageRef?.getInitialValues();
        expect(initialState).toEqual({});
    });

    it('should return http method from options', function () {
        getMountedPage(getNewContext({httpMethod: 'post'}));
        expect(pageRef?.getDefaultHttpMethod()).toEqual('post');
    });

});