import {TestingPageUtils} from "../../../TestingUtils/TestingPageUtils";
import {configure} from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import AxiosAdapter from "axios-mock-adapter";
import Axios from "axios";
import {AutoCrudDefaults} from "../../../../Page/AutoCrudDefaults";
import {ActionPage} from "../../../../Page/Base/ActionPage";
import {ActionPageOptions} from "../../../../Page/Base/ActionPageOptions";

configure({adapter: new EnzymeAdapter()});

let pageRef: ActionPage = null as any;

function getMountedComponent(options?: ActionPageOptions, state: any = {}, updateState?: any) {
    const page = {
        options: options ?? {},
        name: 'action',
    }
    const context = TestingPageUtils.cloneContextForExtraPage(page);
    context.getState = () => ({uiState: {pages: {action: state}}});
    context.updateState = updateState;
    return TestingPageUtils.mountExtraPage(
        ActionPage,
        "ActionPage",
        "action",
        page,
        (ref: any) => pageRef = ref,
        context
    );
}

describe('ActionPage', () => {

    describe('rendering', () => {

        it('should render default message', async function () {
            getMountedComponent(undefined, {__loading: true, __item: {}});
            const messageComponent = pageRef.renderMessageComponent();
            expect(messageComponent).toEqual(null);
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

        it('should render use renderAfterMessage from options', function () {
            const renderAfterMessage = jest.fn().mockReturnValue(null);
            const mockedItem: any = {test: 'value'};
            getMountedComponent({renderAfterMessage: renderAfterMessage}, {__item: mockedItem});
            expect(renderAfterMessage).toBeCalledWith(mockedItem, pageRef);
            expect(renderAfterMessage()).toEqual(null);
        });

    });

    describe('handling action', () => {

        it('should handle action with success', function (done) {
            const adapter = new AxiosAdapter(Axios);
            getMountedComponent();
            const url = pageRef.getUrl();
            adapter.onAny(url).reply(200);
            pageRef.updateLoadingErrorSuccess = jest.fn();
            pageRef.handleAction().then(() => {
                expect(pageRef.updateLoadingErrorSuccess).toBeCalledTimes(3);
                expect(pageRef.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(1, undefined, null, null);
                expect(pageRef.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(2, true, null, null);
                expect(pageRef.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(3, false, null, AutoCrudDefaults.localization.operation_done_successfully);
                done();
            });
        });

        it('should handle action with error', function (done) {
            const adapter = new AxiosAdapter(Axios);
            getMountedComponent();
            const url = pageRef.getUrl();
            adapter.onAny(url).networkError();
            pageRef.updateLoadingErrorSuccess = jest.fn();
            pageRef.handleAction().then(() => {
                expect(pageRef.updateLoadingErrorSuccess).toBeCalledTimes(3);
                expect(pageRef.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(1, undefined, null, null);
                expect(pageRef.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(2, true, null, null);
                expect(pageRef.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(3, false, AutoCrudDefaults.localization.operation_failed, null);
                done()
            });
        });

        it('should handle action with no confirmation', function () {
            getMountedComponent();
            pageRef.confirm = jest.fn().mockReturnValue(false);
            pageRef.updateLoadingErrorSuccess = jest.fn();
            pageRef.handleAction();
            expect(pageRef.updateLoadingErrorSuccess).toBeCalledTimes(1);
        });

        it('should use handleAction from options', function (done) {
            const mockedHandleAction = jest.fn().mockReturnValue(new Promise(resolve => resolve()));
            getMountedComponent({handleAction: mockedHandleAction}, undefined, () => undefined);
            pageRef.handleAction().then(() => {
                expect(mockedHandleAction).toBeCalledWith(pageRef);
                done();
            })
        });

    });

    describe('options and defaults', () => {
        it('should use defaults', function () {
            getMountedComponent();
            expect(pageRef.getHttpRequestConfig()).toEqual({});
            expect(pageRef.getHttpMethod()).toEqual(AutoCrudDefaults.httpMethods.actionPageMethod);
        });

        it('should use options', function () {
            const mockedConfig: any = {someKey: 'someValue'};
            getMountedComponent({httpRequest: {method: "post", config: mockedConfig}});
            expect(pageRef.getHttpRequestConfig()).toEqual(mockedConfig);
            expect(pageRef.getHttpMethod()).toEqual("post");
        });

        it('should return url using options as string', function () {
            const root = TestingPageUtils.contextTemplate.config.endpointRoot;
            getMountedComponent({httpRequest: {url: 'action'}});
            expect(pageRef.getUrl()).toEqual(root + "action");
        });

        it('should return url using options as function', function () {
            getMountedComponent({httpRequest: {url: () => "action"}});
            expect(pageRef.getUrl()).toEqual("action");
        });

        it('should return url using options as function', function () {
            const root = TestingPageUtils.contextTemplate.config.endpointRoot;
            getMountedComponent();
            expect(pageRef.getUrl()).toEqual(root);
        });

    });

});