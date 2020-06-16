import React from "react";
import {CrudContextValue} from "../../../Root/CrudContext";

import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import CollectionPage from "../../../Page/CollectionPage/CollectionPage";
import {IndexedKeyExtractor, PropertyKeyExtractor, SimpleDataSource} from "auto-collection";
import {AutoCrudDefaults} from "../../../Defaults/AutoCrudDefaults";
import {CollectionPageOptions} from "../../../Page/CollectionPage/CollectionPageOptions";
import {TestingPageUtils} from "../../TestingUtils/TestingPageUtils";


configure({adapter: new Adapter()});

class SimpleCollectionPage extends CollectionPage {

    protected renderCollectionContainer(): any {
        return <div data-testid={'simple-collection-container'}
                    ref={ref => this.setCollectionContainerRef(ref as any)}/>
    }
}

function getPageJSXComponent(context: any, name: any) {
    return <SimpleCollectionPage name={name} context={context} history={(() => null) as any}
                                 location={{} as any}
                                 match={{} as any}/>
}

function mountPage(context?: CrudContextValue, options?: CollectionPageOptions, state?: any, updateState?: any): SimpleCollectionPage {
    if (!context) {
        context = JSON.parse(JSON.stringify(TestingPageUtils.contextTemplate));
    }
    context!.updateState = updateState;
    context!.getState = () => ({uiState: {pages: {index: state ?? {}}}});
    context!.config.indexPage!.options = options ?? {}

    const pageWrapper = mount(getPageJSXComponent(context, 'index'));
    return pageWrapper.instance() as SimpleCollectionPage;
}

describe('CollectionContainer', () => {

    describe('DataSource', () => {

        it('should get DataSource from options', function () {
            const dataSource = new SimpleDataSource([]);
            const page = mountPage(undefined, {dataSource: () => dataSource});
            expect(page.getDataSource()).toBe(dataSource);
        });

        it('should get default DataSource', function () {
            const page = mountPage();
            const dataSource = page.getDataSource();
            expect(dataSource.getOptions()).toEqual({
                method: AutoCrudDefaults.httpMethods.collectionRequest,
                url: TestingPageUtils.contextTemplate.config.endpointRoot
            });
        });

        it('should get default DataSource with override options', function () {
            const overrideOptions: any = {x: 1, y: 2};
            const page = mountPage(undefined, {dataSourceOptions: overrideOptions});
            const dataSource = page.getDataSource();
            expect(dataSource.getOptions()).toEqual({
                method: AutoCrudDefaults.httpMethods.collectionRequest,
                url: TestingPageUtils.contextTemplate.config.endpointRoot,
                ...overrideOptions
            });

        });

        it('should get default DataSource with url passed as string', function () {
            const page = mountPage(undefined, {dataSourceUrl: 'some url'});
            const dataSource = page.getDataSource();
            expect(dataSource.getOptions().url)
                .toEqual(`${TestingPageUtils.contextTemplate.config.endpointRoot}some url`);
        });

        it('should get default DataSource with url passed as function', function () {
            const page = mountPage(undefined, {dataSourceUrl: () => 'some url'});
            const dataSource = page.getDataSource();
            expect(dataSource.getOptions().url).toEqual('some url');
        });

        it('should get default url for DataSource', function () {
            const page = mountPage();
            const dataSource = page.getDataSource();
            expect(dataSource.getOptions().url).toEqual(TestingPageUtils.contextTemplate.config.endpointRoot);

        });

    });

    describe('KeyExtractor', () => {
        it('should get_context keyExtractor from config', function () {
            const keyExtractor = new PropertyKeyExtractor('x');
            const page = mountPage(undefined, {keyExtractor: keyExtractor});
            expect(page.getKeyExtractor()).toBe(keyExtractor);
        });

        it('should get default key extractor', function () {
            const page = mountPage();
            expect(page.getKeyExtractor()).toBeInstanceOf(IndexedKeyExtractor);
        });
    });

    describe('localization', () => {
        it('should get localizations from options', function () {
            const page = mountPage(undefined, {
                localization: {
                    data_empty: 'EMPTY',
                    fail_to_fetch_data: 'FAIL',
                    loading_data: 'LOADING',
                    refresh: 'REFRESH',
                    try_again: 'AGAIN'
                }
            });

            expect(page.getLocalization()).toEqual({
                try_again: 'AGAIN',
                fail_to_fetch_data: 'FAIL',
                data_empty: 'EMPTY',
                loading_data: 'LOADING',
                refresh: 'REFRESH'
            });
        });

        it('should get default localizations', function () {
            const localization = {
                try_again: AutoCrudDefaults.localization.try_again,
                data_empty: AutoCrudDefaults.localization.data_empty,
                fail_to_fetch_data: AutoCrudDefaults.localization.fail_to_fetch_data,
                loading_data: AutoCrudDefaults.localization.loading_data,
                refresh: AutoCrudDefaults.localization.refresh
            };
            const page = mountPage(undefined , {localization : localization});
            expect(page.getLocalization()).toEqual(localization);
        });
    });

    describe('render callbacks', () => {
        it('should get default renderError', function () {
            const page = mountPage();
            const rendered = page.renderErrorMessage();
            page.restart = jest.fn();
            // noinspection TypeScriptValidateJSTypes
            rendered.props.action.onClick();
            expect(page.restart).toBeCalled();
        });

        it('should get renderError from options', function () {
            const page = mountPage(undefined, {
                renderErrorMessage: p => {
                    expect(p).toEqual(page);
                    return null;
                }
            });
            const rendered = page.renderErrorMessage();
            expect(rendered).toEqual(null);
        });

        it('should get default renderLoading', function () {
            const page = mountPage();
            const expected = AutoCrudDefaults.components.progressIndicator();
            const rendered = page.renderLoading();
            expect(rendered).toEqual(expected);
        });

        it('should get renderLoading from options', function () {
            const page = mountPage(undefined, {
                renderLoading: p => {
                    expect(p).toEqual(page);
                    return null;
                }
            });
            const rendered = page.renderLoading();
            expect(rendered).toEqual(null);
        });

        it('should get default renderEmpty', function () {
            const page = mountPage();
            const rendered = page.renderEmpty();
            page.restart = jest.fn();
            // noinspection TypeScriptValidateJSTypes
            rendered.props.action.onClick();
            expect(page.restart).toBeCalled();
        });

        it('should get renderEmpty from options', function () {
            const page = mountPage(undefined, {
                renderEmpty: p => {
                    expect(p).toEqual(page);
                    return null;
                }
            });
            const rendered = page.renderEmpty();
            expect(rendered).toEqual(null);
        });
    });

    it('should set/get collectionContainerRef', function () {
        const page = mountPage();
        const mockedRef: any = {};
        page.setCollectionContainerRef(mockedRef);
        expect(page.getCollectionContainerRef()).toEqual(mockedRef);
    });

    it('should handle restart', function () {
        const page = mountPage();
        const mockedCollectionContainer :any = {startDataFetch : jest.fn()};
        page.getCollectionContainerRef = jest.fn().mockReturnValue(mockedCollectionContainer);
        page.restart();
        expect(mockedCollectionContainer.startDataFetch).toBeCalled();
    });

});
