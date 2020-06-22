import {TestingPageUtils} from "../../../../Utils/TestingPageUtils";
import EnzymeAdapter from "enzyme-adapter-react-16";
import {configure} from "enzyme";
import {ActionPageOptions} from "../../../../Page/Base/ActionPage/ActionPageOptions";
import ToggleActionPage from "../../../../Page/Base/ToggleActionPage";

configure({adapter: new EnzymeAdapter()});

let pageRef: ToggleActionPage = null as any;

function mountPage(options?: ActionPageOptions, state: any = {}, updateState?: any) {
    const page = {
        options: options ?? {},
        name: 'toggle',
    }
    const context = TestingPageUtils.cloneContextForExtraPage(page);
    context.getState = () => ({uiState: {pages: {toggle: state}}});
    context.updateState = updateState;
    return TestingPageUtils.mountExtraPage(
        ToggleActionPage,
        "ToggleActionPage",
        "toggle",
        page,
        (ref: any) => pageRef = ref,
        context
    );
}

describe('ToggleActionPage', () => {


    it('should render toggle message', function () {
        let __loadingState = true;
        let {wrapper} = mountPage( {}, {__loading: __loadingState, __item: {test: 'Value'}});
        const toggleMessage = wrapper.find('ToggleMessageComponent').getElement();
        expect(toggleMessage.props.disabled).toEqual(__loadingState);
        pageRef.handleAction = jest.fn();
        pageRef.navigateToHome = jest.fn();

        toggleMessage.props.handleToggle();
        toggleMessage.props.handleCancel();
        expect(pageRef.handleAction).toBeCalled();
        expect(pageRef.navigateToHome).toBeCalled();
    });


})