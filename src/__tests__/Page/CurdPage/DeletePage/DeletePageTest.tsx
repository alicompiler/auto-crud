import {TestingPageUtils} from "../../../../Utils/TestingPageUtils";
import DeletePage from "../../../../Page/CrudPage/Delete/DeletePage";
import {CrudContextValue} from "../../../../Root/CrudContext";
import EnzymeAdapter from "enzyme-adapter-react-16";
import {configure} from "enzyme";
import {AutoCrudDefaults} from "../../../../Defaults/AutoCrudDefaults";

configure({adapter: new EnzymeAdapter()});

let pageRef: DeletePage = null as any;

function mountPage(context?: CrudContextValue, options: any = {}, state: any = {}) {
    if (!context) {
        context = TestingPageUtils.cloneContextForCrudPage(TestingPageUtils.contextTemplate, 'deletePage', []);
    }
    context.config.deletePage!.options = options;
    context.getState = () => ({uiState: {pages: {delete: state}}});

    return TestingPageUtils.mountPage('deletePage',
        'delete',
        DeletePage,
        'DeletePage',
        (ref: any) => pageRef = ref,
        context);
}

describe('DeletePage', () => {


    it('should render delete message', function () {
        let __loadingState = true;
        let {wrapper} = mountPage(undefined, {}, {__loading: __loadingState, __item: {test: 'Value'}});
        const deleteMessageComponent = wrapper.find('DeleteMessageComponent').getElement();
        expect(deleteMessageComponent.props.disabled).toEqual(__loadingState);
        pageRef.handleAction = jest.fn();
        pageRef.navigateToHome = jest.fn();

        deleteMessageComponent.props.handleDelete();
        deleteMessageComponent.props.handleCancel();
        expect(pageRef.handleAction).toBeCalled();
        expect(pageRef.navigateToHome).toBeCalled()

    });

    it('should return default page title', function () {
        mountPage();
        expect(pageRef.getDefaultPageTitle()).toEqual(AutoCrudDefaults.pageTitles.delete);
    });

    it('should return default http method', function () {
        mountPage();
        expect(pageRef.getDefaultHttpMethod()).toEqual(AutoCrudDefaults.httpMethods.deleteRequest);
    });

    it('should return default localizations', function () {
        mountPage();
        expect(pageRef.getDefaultLocalization()).toEqual({
            errorMessage: AutoCrudDefaults.localization.fail_to_delete_message,
            successMessage: AutoCrudDefaults.localization.delete_success_message
        });
    });

})