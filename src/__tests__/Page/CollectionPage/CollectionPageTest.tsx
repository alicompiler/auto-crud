import React from "react";

import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import CollectionPage from "../../../Page/CollectionPage/CollectionPage";
import {AxiosDataSource, IndexedKeyExtractor, PropertyKeyExtractor, SimpleDataSource} from "auto-collection";
import {AutoCrudDefaults} from "../../../Defaults/AutoCrudDefaults";
import TestingPageBuilder from "../../../Utils/TestingPageBuilder";


configure({adapter: new Adapter()});

class SimpleCollectionPage extends CollectionPage {

    protected renderCollectionContainer(): any {
        return <div data-testid={'simple-collection-container'}
                    ref={ref => this.setCollectionContainerRef(ref as any)}/>
    }
}

let ref: CollectionPage = null as any;


describe('CollectionContainer', () => {

    describe('DataSource', () => {

        it('should get DataSource from options', function () {
            const dataSource = new SimpleDataSource([]);
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .setOptions({dataSource: () => dataSource})
                .mount()
            expect(ref.getDataSource()).toBe(dataSource);
        });

        it('should get default DataSource', function () {
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .mount();
            const dataSource = ref.getDataSource();
            expect(dataSource).toEqual(new AxiosDataSource({
                method: AutoCrudDefaults.httpMethods.collectionRequest as any,
                url: TestingPageBuilder.contextTemplate.config.endpointRoot
            }));
        });

        it('should get default DataSource with override options', function () {
            const overrideOptions: any = {x: 1, y: 2};

            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .setOptions({dataSourceOptions: overrideOptions})
                .mount();

            const dataSource = ref.getDataSource();
            expect(dataSource).toEqual(new AxiosDataSource({
                method: AutoCrudDefaults.httpMethods.collectionRequest,
                url: TestingPageBuilder.contextTemplate.config.endpointRoot,
                ...overrideOptions
            }));

        });

        it('should get default DataSource with url passed as string', function () {
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .setOptions({dataSourceUrl: 'some url'})
                .mount();
            const dataSource = ref.getDataSource();
            expect(dataSource.getOptions().url)
                .toEqual(`${TestingPageBuilder.contextTemplate.config.endpointRoot}some url`);
        });

        it('should get default DataSource with url passed as function', function () {
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .setOptions({dataSourceUrl: () => 'some url'})
                .mount();
            const dataSource = ref.getDataSource();
            expect(dataSource.getOptions().url).toEqual('some url');
        });

        it('should get default url for DataSource', function () {
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .mount();
            const dataSource = ref.getDataSource();
            expect(dataSource.getOptions().url).toEqual(TestingPageBuilder.contextTemplate.config.endpointRoot);

        });

    });

    describe('KeyExtractor', () => {
        it('should get_context keyExtractor from options', function () {
            const keyExtractor = new PropertyKeyExtractor('x');
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .setOptions({keyExtractor: keyExtractor})
                .mount();
            expect(ref.getKeyExtractor()).toBe(keyExtractor);
        });

        it('should get default key extractor', function () {
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .mount();
            expect(ref.getKeyExtractor()).toBeInstanceOf(IndexedKeyExtractor);
        });
    });

    describe('localization', () => {

        it('should get localizations from options', function () {
            let localization = {
                data_empty: 'EMPTY',
                fail_to_fetch_data: 'FAIL',
                loading_data: 'LOADING',
                refresh: 'REFRESH',
                try_again: 'AGAIN'
            };

            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .setOptions({localization: localization})
                .mount();

            expect(ref.getLocalization()).toEqual(localization);
        });

        it('should get default localizations', function () {
            const localization = {
                try_again: AutoCrudDefaults.localization.try_again,
                data_empty: AutoCrudDefaults.localization.data_empty,
                fail_to_fetch_data: AutoCrudDefaults.localization.fail_to_fetch_data,
                loading_data: AutoCrudDefaults.localization.loading_data,
                refresh: AutoCrudDefaults.localization.refresh
            };
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .setOptions({localization: localization})
                .mount();
            expect(ref.getLocalization()).toEqual(localization);
        });
    });

    describe('render callbacks', () => {
        it('should get default renderError', function () {
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .mount();
            const rendered = ref.renderErrorMessage();
            ref.restart = jest.fn();
            // noinspection TypeScriptValidateJSTypes
            rendered.props.action.onClick();
            expect(ref.restart).toBeCalled();
        });

        it('should get renderError from options', function () {
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .setOptions({
                    renderErrorMessage: (p: any) => {
                        expect(p).toEqual(ref);
                        return 'Error';
                    }
                })
                .mount();
            const rendered = ref.renderErrorMessage();
            expect(rendered).toEqual('Error');
        });

        it('should get default renderLoading', function () {
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .mount();
            const expected = AutoCrudDefaults.components.progressIndicator();
            const rendered = ref.renderLoading();
            expect(rendered).toEqual(expected);
        });

        it('should get renderLoading from options', function () {
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .setOptions({
                    renderLoading: (p: any) => {
                        expect(p).toEqual(ref);
                        return 'Loading';
                    }
                })
                .mount();

            const rendered = ref.renderLoading();
            expect(rendered).toEqual('Loading');
        });

        it('should get default renderEmpty', function () {
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .mount();
            const rendered = ref.renderEmpty();
            ref.restart = jest.fn();
            // noinspection TypeScriptValidateJSTypes
            rendered.props.action.onClick();
            expect(ref.restart).toBeCalled();
        });

        it('should get renderEmpty from options', function () {
            new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
                .setComponent(SimpleCollectionPage)
                .setRefCallback(r => ref = r)
                .setOptions({
                    renderEmpty: (p: any) => {
                        expect(p).toEqual(ref);
                        return 'Empty';
                    }
                })
                .mount();

            const rendered = ref.renderEmpty();
            expect(rendered).toEqual('Empty');
        });
    });

    it('should set/get collectionContainerRef', function () {
        new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
            .setComponent(SimpleCollectionPage)
            .setRefCallback(r => ref = r)
            .mount();
        const mockedContainer: any = {};
        ref.setCollectionContainerRef(mockedContainer);
        expect(ref.getCollectionContainerRef()).toEqual(mockedContainer);
    });

    it('should handle restart', function () {
        new TestingPageBuilder().setPageName('index').setPageIndex('indexPage')
            .setComponent(SimpleCollectionPage)
            .setRefCallback(r => ref = r)
            .mount();
        const mockedCollectionContainer: any = {startDataFetch: jest.fn()};
        ref.setCollectionContainerRef(mockedCollectionContainer);
        ref.restart();
        expect(mockedCollectionContainer.startDataFetch).toBeCalled();
    });

});
