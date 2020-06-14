import {TestingPageUtils} from "../../../TestingUtils/TestingPageUtils";
import {DeletePageOptions} from "../../../../Page/CrudPage/DeletePage/DeletePageOptions";
import DeletePage from "../../../../Page/CrudPage/DeletePage/CrudDeletePage";
import {configure} from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import AxiosAdapter from "axios-mock-adapter";
import Axios from "axios";
import {AutoCrudDefaults} from "../../../../Page/AutoCrudDefaults";

configure({adapter: new EnzymeAdapter()});

let pageRef: DeletePage = null as any;

function getMountedComponent(options?: DeletePageOptions, state: any = {}) {
    const context = TestingPageUtils.cloneContextForPage(TestingPageUtils.contextTemplate, 'deletePage', [], options);
    context.getState = () => ({uiState: {pages: {delete: state}}});
    return TestingPageUtils.getMountedPage('deletePage', 'delete', DeletePage, 'DeletePage', (ref: any) => pageRef = ref, context);
}

describe('CrudDeletePage', () => {

    describe('rendering', () => {

        it('should render default message', async function () {
            const {wrapper} = getMountedComponent(undefined, {__loading: true, __item: {}});
            const deleteMessageComponent = wrapper.find('DeleteMessageComponent').getElement();
            pageRef.handleDelete = jest.fn();
            pageRef.navigateToHome = jest.fn();
            expect(deleteMessageComponent.props.disabled).toEqual(true);
            deleteMessageComponent.props.handleDelete();
            deleteMessageComponent.props.handleCancel();
            expect(pageRef.handleDelete).toBeCalled();
            expect(pageRef.navigateToHome).toBeCalled();
        });


        it('should use messageRender from options', function () {
            const renderMessage = jest.fn().mockReturnValue(null);
            getMountedComponent({renderMessage: renderMessage}, {__loading: true, __item: {}});
            expect(renderMessage).toBeCalledWith(pageRef);
        });

        it('should render noItem message when __item not set', function () {
            const {wrapper} = getMountedComponent(undefined, {__loading: true});
            const noItemMessageComponent = wrapper.find('NoItemMessageComponent').getElement();
            pageRef.navigateToHome = jest.fn();
            noItemMessageComponent.props.onAction();
            expect(pageRef.navigateToHome).toBeCalled();
        });

        it('should render use renderNoItem from options', function () {
            const renderNoItem = jest.fn().mockReturnValue(null);
            getMountedComponent({renderNoItem: renderNoItem}, {__loading: true});
            expect(renderNoItem).toBeCalledWith(pageRef);
        });

        it('should use empty object for KeyValueProps', function () {
            getMountedComponent(undefined, {__loading: true, __item: {}});
            expect(pageRef.getKeyValueProps()).toEqual({});
        });

        it('should use KeyValueProps from options', function () {
            getMountedComponent({keyValueProps: {test: true}}, {__item: {}});
            expect(pageRef.getKeyValueProps()).toEqual({test: true});
        });

    });

    describe('handling delete', () => {

        it('should handle delete with success', function (done) {
            const adapter = new AxiosAdapter(Axios);
            getMountedComponent();
            const url = pageRef.getDeleteUrl();
            adapter.onAny(url).reply(200);
            pageRef.updateLoadingErrorSuccess = jest.fn();
            pageRef.handleDelete().then(() => {
                expect(pageRef.updateLoadingErrorSuccess).toBeCalledTimes(3);
                expect(pageRef.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(1, undefined, null, null);
                expect(pageRef.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(2, true, null, null);
                expect(pageRef.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(3, false, null, AutoCrudDefaults.localization.delete_success_message);
                done();
            });
        });

        it('should handle delete with error', function (done) {
            const adapter = new AxiosAdapter(Axios);
            getMountedComponent();
            const url = pageRef.getDeleteUrl();
            adapter.onAny(url).networkError();
            pageRef.updateLoadingErrorSuccess = jest.fn();
            pageRef.handleDelete().then(() => {
                expect(pageRef.updateLoadingErrorSuccess).toBeCalledTimes(3);
                expect(pageRef.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(1, undefined, null, null);
                expect(pageRef.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(2, true, null, null);
                expect(pageRef.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(3, false, AutoCrudDefaults.localization.fail_to_delete_message, null);
                done()
            });
        });

        it('should handle delete with no confirmation', function () {
            getMountedComponent();
            pageRef.confirm = jest.fn().mockReturnValue(false);
            pageRef.updateLoadingErrorSuccess = jest.fn();
            pageRef.handleDelete();
            expect(pageRef.updateLoadingErrorSuccess).toBeCalledTimes(1);
        });

    });

    describe('options and defaults', () => {
        it('should use defaults', function () {
            getMountedComponent();
            expect(pageRef.getConfig()).toEqual({});
            expect(pageRef.getMethod()).toEqual(AutoCrudDefaults.httpMethods.deleteRequest);
        });

        it('should use options', function () {
            const mockedConfig: any = {someKey: 'someValue'};
            getMountedComponent({deleteRequest: {method: "post", requestConfig: mockedConfig}});
            expect(pageRef.getConfig()).toEqual(mockedConfig);
            expect(pageRef.getMethod()).toEqual("post");
        });

        it('should return url using options as string', function () {
            const root = TestingPageUtils.contextTemplate.config.endpointRoot;
            getMountedComponent({deleteRequest: {url: 'delete'}});
            expect(pageRef.getDeleteUrl()).toEqual(root + "delete");
        });

        it('should return url using options as function', function () {
            getMountedComponent({deleteRequest: {url: () => "delete"}});
            expect(pageRef.getDeleteUrl()).toEqual("delete");
        });

        it('should return url using options as function', function () {
            const root = TestingPageUtils.contextTemplate.config.endpointRoot;
            getMountedComponent();
            expect(pageRef.getDeleteUrl()).toEqual(root);
        });

    });

    it('should return default page title', function () {
        getMountedComponent();
        expect(pageRef.getDefaultPageTitle()).toEqual(AutoCrudDefaults.pageTitles.delete);
    });

});