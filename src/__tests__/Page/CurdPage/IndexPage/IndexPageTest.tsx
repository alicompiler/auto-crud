import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import {IndexPage} from "../../../../Page/CrudPage/Index/IndexPage";
import {TestingPageUtils} from "../../../../Utils/TestingPageUtils";


configure({adapter: new Adapter()});


let pageRef: IndexPage | null;


function getMountedPage(context?: any) {
    if (!context){
        context = TestingPageUtils.contextTemplate;
    }
    context!.updateState = () => undefined;
    return TestingPageUtils.mountPage('indexPage', 'index', IndexPage, 'IndexPage', (ref: any) => pageRef = ref, context);
}

function getNewContext(options?: any) {
    return TestingPageUtils.cloneContextForFormPage('indexPage', undefined, undefined, options);
}

describe('IndexPage', () => {

    it('should call passed onSearch', function (done) {
        const _context = getNewContext();
        _context.config.indexPage!.options = {
            onSearch: (value: any) => {
                expect(value).toEqual('ali');
                done()
            }
        }
        const {wrapper} = getMountedPage(_context);
        const input = wrapper.find('input').getElement();
        input.props.onChange({target: {value: 'ali'}} as any);
        input.props.onKeyUp({key: 'Enter'} as any);
    });

    it('should call default onSearch', function (done) {
        const {wrapper} = getMountedPage();
        const input = wrapper.find('input').getElement();
        pageRef!.defaultOnSearch = (value: any) => {
            expect(value).toEqual('ali');
            done();
        }
        input.props.onChange({target: {value: 'ali'}} as any);
        input.props.onKeyUp({key: 'Enter'} as any);
    });


    it('should call default onSearch', function (done) {
        const _context = getNewContext();
        _context.updatePageOptions = (pageName: string, options: any) => {
            expect(pageName).toEqual('index');
            const expectedUrl = _context.config.endpointRoot + "search?query=" + encodeURI('ali');
            expect(options.dataSourceUrl()).toEqual(expectedUrl);
            done();
        }
        const {wrapper} = getMountedPage(_context);
        const input = wrapper.find('input').getElement();
        input.props.onChange({target: {value: 'ali'}} as any);
        input.props.onKeyUp({key: 'Enter'} as any);
    });

    it('should get toolbar actions from options', function () {
        const mockedAction1 = jest.fn();
        const mockedAction2 = jest.fn();
        const mockedAction3 = jest.fn();
        const mockedAction4 = jest.fn();

        const _context = getNewContext();
        _context.config.indexPage!.options = {
            toolbarActions: [mockedAction1, mockedAction2, mockedAction3, mockedAction4]
        }

        getMountedPage(_context);
        expect(pageRef!.getToolbarAction()).toHaveLength(4);
    });

    it('should get default toolbar actions', function () {
        getMountedPage();
        expect(pageRef!.getToolbarAction()).toHaveLength(2);
    });


})