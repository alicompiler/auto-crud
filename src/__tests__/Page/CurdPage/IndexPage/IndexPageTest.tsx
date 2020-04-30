import React from "react";

import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import {CrudContextValue} from "../../../../Root/CrudContext";
import {IndexPage} from "../../../../Page/CrudPage/Index/IndexPage";
import {MemoryRouter} from "react-router-dom";


configure({adapter: new Adapter()});

const context: CrudContextValue = {
    config: {
        name: 'text',
        fields: [],
        endpointRoot: '/base-api/',
        indexPage: {name: 'index'},
        createPage: {name: 'create'},
        updatePage: {name: 'update'},
        deletePage: {name: 'delete'},
        detailsPage: {name: 'details'},
        pages: [],
    },
    state: {},
    updateState: () => null,
    updatePageOptions: () => null,
    getState: () => null
}

let page: IndexPage | null;

function getPageJSXComponent(context: any, name: any) {
    return <MemoryRouter>
        <IndexPage ref={ref => page = ref} name={name} context={context} history={(() => null) as any}
                   location={{} as any}
                   match={{} as any}/>
    </MemoryRouter>
}

function getMountedPage(context: any, name: string = 'index') {
    const pageWrapper = mount(getPageJSXComponent(context, name));
    const page: any = pageWrapper.find('IndexPage').getElement();
    return {
        wrapper: pageWrapper,
        page: page as IndexPage
    };
}


describe('IndexPage', () => {

    it('should call passed onSearch', function (done) {
        const _context = JSON.parse(JSON.stringify(context));
        _context.config.indexPage.options = {
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
        const {wrapper} = getMountedPage(context);
        const input = wrapper.find('input').getElement();
        page!.defaultOnSearch = (value: any) => {
            expect(value).toEqual('ali');
            done();
        }
        input.props.onChange({target: {value: 'ali'}} as any);
        input.props.onKeyUp({key: 'Enter'} as any);
    });


    it('should call default onSearch', function (done) {
        const _context = JSON.parse(JSON.stringify(context));
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

        const _context = JSON.parse(JSON.stringify(context));
        _context.config.indexPage.options = {
            toolbarActions: [mockedAction1, mockedAction2, mockedAction3, mockedAction4]
        }

        getMountedPage(_context);
        expect(page!.getToolbarAction()).toHaveLength(4);
        //todo call these actions
    });

    it('should get default toolbar actions', function () {
        getMountedPage(context);
        expect(page!.getToolbarAction()).toHaveLength(2);
        //todo call these actions
    });


})