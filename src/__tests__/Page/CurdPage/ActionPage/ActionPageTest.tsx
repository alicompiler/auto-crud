import {configure} from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import AxiosAdapter from "axios-mock-adapter";
import Axios from "axios";
import {AutoCrudDefaults} from "../../../../Defaults/AutoCrudDefaults";
import {ActionPage} from "../../../../Page/Base/ActionPage/ActionPage";
import TestingPageBuilder from "../../../../Utils/TestingPageBuilder";

configure({adapter: new EnzymeAdapter()});

let ref: ActionPage = null as any;

describe('ActionPage', () => {

    describe('rendering', () => {

        it('should render default message', async function () {
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage').setPageState({__item: {}})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .mount();
            const messageComponent = ref.renderMessageComponent();
            expect(messageComponent).toEqual(null);
        });

        it('should use messageRender from options', function () {
            const renderMessage = jest.fn().mockReturnValue('Message');
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage').setPageState({__item: {}})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .setOptions({renderMessage: renderMessage})
                .mount();
            const messageComponent = ref.renderMessageComponent();
            expect(messageComponent).toEqual('Message');
            expect(renderMessage).toBeCalledWith({}, ref);
        });

        it('should render noItem message when __item not set', function () {
            const wrapper = new TestingPageBuilder().setPageName('index').setPageIndex('indexPage').setPageState({})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .mount();

            const noItemMessageComponent = wrapper.find('NoItemMessageComponent').getElement();
            ref.navigateToHome = jest.fn();
            noItemMessageComponent.props.onAction();
            expect(ref.navigateToHome).toBeCalled();
        });

        it('should render use renderNoItem from options', function () {
            const renderNoItem = jest.fn().mockReturnValue('No Item');
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage').setPageState({})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .setOptions({renderNoItem: renderNoItem})
                .mount();
            const renderNoItemMessage = ref.renderNoItemMessage();
            expect(renderNoItemMessage).toEqual('No Item');
            expect(renderNoItem).toBeCalledWith(ref);
        });

        it('should use empty object for KeyValueProps by default', function () {
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage').setPageState({})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .mount();
            expect(ref.getKeyValueProps()).toEqual({});
        });

        it('should use KeyValueProps from options', function () {
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage').setPageState({})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .setOptions({keyValueProps: {test: 'test'}})
                .mount();
            expect(ref.getKeyValueProps()).toEqual({test: 'test'});
        });

        it('should render use renderAfterMessage from options', function () {
            const mockedRenderAfterMessage = jest.fn().mockReturnValue('After Message');
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage').setPageState({__item: {}})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .setOptions({renderAfterMessage: mockedRenderAfterMessage})
                .mount();
            const renderAfterMessage = ref.renderAfterMessage();
            expect(renderAfterMessage).toEqual('After Message');
            expect(mockedRenderAfterMessage).toBeCalledWith({}, ref);
        });

    });

    describe('handling action', () => {

        it('should handle action with success', function (done) {
            const adapter = new AxiosAdapter(Axios);
            new TestingPageBuilder().setPageIndex('indexPage').setPageName('index').setPageState({})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .mount();

            const url = ref.getUrl();
            adapter.onAny(url).reply(200);
            ref.updateLoadingErrorSuccess = jest.fn();
            ref.handleAction().then(() => {
                expect(ref.updateLoadingErrorSuccess).toBeCalledTimes(3);
                expect(ref.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(1, undefined, null, null);
                expect(ref.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(2, true, null, null);
                expect(ref.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(3, false, null, AutoCrudDefaults.localization.operation_done_successfully);
                done();
            });
        });

        it('should handle action with error', function (done) {
            const adapter = new AxiosAdapter(Axios);
            new TestingPageBuilder().setPageIndex('indexPage').setPageName('index').setPageState({})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .mount();
            const url = ref.getUrl();
            adapter.onAny(url).networkError();
            ref.updateLoadingErrorSuccess = jest.fn();
            ref.handleAction().then(() => {
                expect(ref.updateLoadingErrorSuccess).toBeCalledTimes(3);
                expect(ref.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(1, undefined, null, null);
                expect(ref.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(2, true, null, null);
                expect(ref.updateLoadingErrorSuccess).toHaveBeenNthCalledWith(3, false, AutoCrudDefaults.localization.operation_failed, null);
                done()
            });
        });

        it('should handle action with no confirmation', function () {
            new TestingPageBuilder().setPageIndex('indexPage').setPageName('index').setPageState({})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .mount();

            ref.confirm = jest.fn().mockReturnValue(false);
            ref.updateLoadingErrorSuccess = jest.fn();
            ref.handleAction();
            expect(ref.updateLoadingErrorSuccess).toBeCalledWith(undefined, null, null);
        });

        it('should use handleAction from options', function (done) {
            const mockedHandleAction = jest.fn().mockReturnValue(new Promise(resolve => resolve()));
            new TestingPageBuilder().setPageIndex('indexPage').setPageName('index').setPageState({})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .setOptions({handleAction: mockedHandleAction})
                .setUpdateState(jest.fn())
                .mount();

            ref.handleAction().then(() => {
                expect(mockedHandleAction).toBeCalledWith(ref);
                done();
            })
        });

    });

    describe('options and defaults', () => {
        it('should use defaults', function () {
            new TestingPageBuilder().setPageIndex('indexPage').setPageName('index').setPageState({})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .mount();
            expect(ref.getHttpRequestConfig()).toEqual({});
            expect(ref.getHttpMethod()).toEqual(AutoCrudDefaults.httpMethods.actionPageMethod);
        });

        it('should use options', function () {
            const mockedConfig: any = {someKey: 'someValue'};
            new TestingPageBuilder().setPageIndex('indexPage').setPageName('index').setPageState({})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .setOptions({httpRequest: {config: mockedConfig, method: 'post'}})
                .mount();
            expect(ref.getHttpRequestConfig()).toEqual(mockedConfig);
            expect(ref.getHttpMethod()).toEqual("post");
        });

        it('should return url using options as string', function () {
            const root = TestingPageBuilder.contextTemplate.config.endpointRoot;
            new TestingPageBuilder().setPageIndex('indexPage').setPageName('index').setPageState({})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .setOptions({httpRequest: {url: 'action'}})
                .mount();
            expect(ref.getUrl()).toEqual(root + "action");
        });

        it('should return url using options as function', function () {
            new TestingPageBuilder().setPageIndex('indexPage').setPageName('index').setPageState({})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .setOptions({httpRequest: {url: () => 'action'}})
                .mount();
            expect(ref.getUrl()).toEqual("action");
        });

        it('should return default url', function () {
            const root = TestingPageBuilder.contextTemplate.config.endpointRoot;
            new TestingPageBuilder().setPageIndex('indexPage').setPageName('index').setPageState({})
                .setComponent(ActionPage)
                .setRefCallback(r => ref = r)
                .mount();
            expect(ref.getUrl()).toEqual(root);
        });

    });

});