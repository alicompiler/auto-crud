import {TestingPageUtils} from "../../../TestingUtils/TestingPageUtils";
import DetailsPage from "../../../../Page/CrudPage/Details/DetailsPage";
import EnzymeAdapter from "enzyme-adapter-react-16";
import {configure} from "enzyme";
import {DetailsPageOptions} from "../../../../Page/CrudPage/Details/DetailsPageOptions";

configure({adapter: new EnzymeAdapter()})
let pageRef: DetailsPage = null as any;

function getMountedPage(context?: any, state: any = {}, options?: DetailsPageOptions) {
    if (!context) {
        context = TestingPageUtils.cloneContextForCrudPage(TestingPageUtils.contextTemplate, 'detailsPage', [], options);
    }
    context.getState = () => ({uiState: {pages: {details: state}}})
    return TestingPageUtils.getMountedPage('detailsPage',
        'details',
        DetailsPage,
        'DetailsPage',
        (ref: any) => pageRef = ref,
        context);
}

describe('DetailsPage', () => {

    it('should return item', function () {
        const item = {id: 1, title: 'Testing'};
        getMountedPage(undefined, {__item: item});
        expect(pageRef.getItem()).toEqual(item);
    });

    it('should render noItem when __item is not set', function () {
        const {wrapper} = getMountedPage();
        pageRef.navigateToHome = jest.fn();
        let noItemComponent = wrapper.find('NoItemMessageComponent').getElement();
        noItemComponent.props.onAction();
        expect(pageRef.navigateToHome).toBeCalled();
    });

    it('should use custom render for noItem from options', function () {
        const customRender = jest.fn().mockReturnValue(null);
        getMountedPage(undefined, undefined, {
            renderNoItem: customRender
        });
        expect(customRender).toBeCalledWith(pageRef);
    });
})