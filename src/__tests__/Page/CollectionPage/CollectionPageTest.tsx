import React from "react";
import {CrudContextValue} from "../../../Root/CrudContext";

import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import CollectionPage from "../../../Page/CollectionPage/CollectionPage";
import {IndexedKeyExtractor, PropertyKeyExtractor, SimpleDataSource} from "auto-collection";
import {CollectionPageDefaults} from "../../../Defaults/Page/CollectionPageDefaults";


configure({adapter: new Adapter()});


class SimpleCollectionPage extends CollectionPage {

    protected renderCollectionContainer(): any {
        return <div data-testid={'simple-collection-container'}
                    ref={ref => this.setCollectionContainerRef(ref as any)}/>
    }
}

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

function getPageJSXComponent(context: any, name: any) {
    return <SimpleCollectionPage name={name} context={context} history={(() => null) as any}
                                 location={{} as any}
                                 match={{} as any}/>
}

function getPageInstance(context: any, name: string = 'index'): SimpleCollectionPage {
    const pageWrapper = mount(getPageJSXComponent(context, name));
    return pageWrapper.instance() as SimpleCollectionPage;
}

describe('CollectionContainer', () => {

    describe('DataSource', () => {

        it('should get DataSource from config', function () {
            const _context: CrudContextValue = JSON.parse(JSON.stringify(context));
            const dataSource = new SimpleDataSource([]);
            _context.config.indexPage!.options = {
                dataSource: () => dataSource
            };

            const page = getPageInstance(_context);

            expect(page.getDataSource()).toBe(dataSource);
        });

        it('should get default DataSource', function () {
            const page = getPageInstance(context);
            const dataSource = page.getDataSource();
            expect(dataSource.getOptions()).toEqual({
                method: 'get',
                url: context.config.endpointRoot
            });
        });


        it('should get default DataSource with url passed as string', function () {
            const _context: CrudContextValue = JSON.parse(JSON.stringify(context));
            _context.config.indexPage!.options = {dataSourceUrl: 'some url'}
            const page = getPageInstance(_context);
            const dataSource = page.getDataSource();
            expect(dataSource.getOptions()).toEqual({
                method: 'get',
                url: `${_context.config.endpointRoot}some url`
            });
        });


        it('should get default DataSource with url passed as function', function () {
            const _context: CrudContextValue = JSON.parse(JSON.stringify(context));
            _context.config.indexPage!.options = {dataSourceUrl: () => 'some url'}
            const page = getPageInstance(_context);
            const dataSource = page.getDataSource();
            expect(dataSource.getOptions()).toEqual({
                method: 'get',
                url: `some url`
            });
        });

    });

    it('should get keyExtractor from config', function () {
        const _context = JSON.parse(JSON.stringify(context));
        const keyExtractor = new PropertyKeyExtractor('x');
        _context.config.indexPage.options = {keyExtractor: keyExtractor};
        const page = getPageInstance(_context);
        expect(page.getKeyExtractor()).toBe(keyExtractor);
    });

    it('should get default key extractor', function () {
        const page = getPageInstance(context);
        expect(page.getKeyExtractor()).toBeInstanceOf(IndexedKeyExtractor);
    });

    describe('render callbacks', () => {
        it('should get default renderError', function () {
            const page = getPageInstance(context);
            const expected = CollectionPageDefaults.renderError!(page);
            const rendered = page.renderErrorMessage();
            expect(String(expected)).toEqual(String(rendered));
        });

        it('should get renderError from config', function () {
            const _context = JSON.parse(JSON.stringify(context));
            const renderErrorMessage = () => <h1>ERROR MESSAGE</h1>
            _context.config.indexPage.options = {
                renderErrorMessage: renderErrorMessage
            };
            const page = getPageInstance(_context);
            const expected = renderErrorMessage();
            const rendered = page.renderErrorMessage();
            expect(String(expected)).toEqual(String(rendered));
        });


        it('should get default renderLoading', function () {
            const page = getPageInstance(context);
            const expected = CollectionPageDefaults.renderLoading!(page);
            const rendered = page.renderLoading();
            expect(String(expected)).toEqual(String(rendered));
        });

        it('should get renderLoading from config', function () {
            const _context = JSON.parse(JSON.stringify(context));
            const renderLoading = () => <h1>LOADING...</h1>
            _context.config.indexPage.options = {
                renderLoading: renderLoading
            };
            const page = getPageInstance(_context);
            const expected = renderLoading();
            const rendered = page.renderLoading();
            expect(String(expected)).toEqual(String(rendered));
        });


        it('should get default renderEmpty', function () {
            const page = getPageInstance(context);
            const expected = CollectionPageDefaults.renderEmpty!(page);
            const rendered = page.renderEmpty();
            expect(String(expected)).toEqual(String(rendered));
        });

        it('should get renderEmpty from config', function () {
            const _context = JSON.parse(JSON.stringify(context));
            const renderEmpty = () => <h1>Empty</h1>
            _context.config.indexPage.options = {
                renderEmpty: renderEmpty
            };
            const page = getPageInstance(_context);
            const expected = renderEmpty();
            const rendered = page.renderEmpty();
            expect(String(expected)).toEqual(String(rendered));
        });
    });

    it('should get default localizations', function () {
        const page = getPageInstance(context);
        expect(page.getLocalization()).toEqual({
            try_again: CollectionPageDefaults.localization.try_again,
            fail_to_fetch_data: CollectionPageDefaults.localization.fail_to_fetch_data,
            data_empty: CollectionPageDefaults.localization.data_empty,
            loading_data: CollectionPageDefaults.localization.loading_data
        });
    });

    it('should get default localizations', function () {
        const _context = JSON.parse(JSON.stringify(context));
        const localization = {
            try_again: 'Try',
            data_empty: 'Empty',
            fail_to_fetch_data: 'Failed',
            loading_data: 'Loading'
        };
        _context.config.indexPage.options = {localization: {...localization}}
        const page = getPageInstance(_context);
        expect(page.getLocalization()).toEqual(localization);
    });


});
