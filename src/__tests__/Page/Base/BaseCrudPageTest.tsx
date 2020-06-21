import BaseCrudPage from "../../../Page/Base/BaseCrudPage/BaseCrudPage";
import React from "react";

import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import TestingPageBuilder from "../../../Utils/TestingPageBuilder";


configure({adapter: new Adapter()});


class SimpleBaseCrudPage extends BaseCrudPage {
    public renderContent(): any {
        return <div data-testid={"simple-base-crud-page"}/>
    }
}

describe('BaseCrudPage', () => {

    let ref: SimpleBaseCrudPage = null as any;

    describe('hooks', () => {

        it('should call onLoadAction', function (done) {

            new TestingPageBuilder()
                .setPageIndex('indexPage')
                .setPageName('index')
                .setComponent(SimpleBaseCrudPage)
                .setRefCallback((r: any) => ref = r)
                .setOptions({
                    onLoadAction: () => {
                        done();
                        return new Promise<any>(resolve => resolve('some value'));
                    },
                })
                .mount();

        });

        it('should call afterOnLoadAction', function (done) {

            new TestingPageBuilder()
                .setPageIndex('indexPage')
                .setPageName('index')
                .setComponent(SimpleBaseCrudPage)
                .setRefCallback((r: any) => ref = r)
                .setOptions({
                    onLoadAction: () => {
                        return new Promise<any>(resolve => resolve('some value'));
                    },
                    afterOnLoadAction: (result: any) => {
                        expect(result).toEqual('some value');
                        done();
                    },
                })
                .mount();
        });

        it('should call onDestroy', function () {
            const onDestroy = jest.fn();
            new TestingPageBuilder()
                .setPageIndex('indexPage')
                .setPageName('index')
                .setComponent(SimpleBaseCrudPage)
                .setRefCallback((r: any) => ref = r)
                .setOptions({onDestroyAction: onDestroy})
                .mount();
            ref.componentWillUnmount();
            expect(onDestroy).toBeCalled();
        });

    });

    it('should set page title', function (done) {
        const updateState = (payload: any) => {
            expect(payload).toEqual({pageTitle: 'Index Page'});
            done();
        };
        new TestingPageBuilder()
            .setUpdateState(updateState)
            .setOptions({pageTitle: 'Index Page'})
            .setPageName('index')
            .setPageIndex('indexPage')
            .setComponent(SimpleBaseCrudPage)
            .mount();
    });

    describe('state and options', () => {

        it('should return options as empty object when no options provided in config', function () {
            new TestingPageBuilder()
                .setPageIndex("indexPage")
                .setPageName('index')
                .setOptions(undefined as any)
                .setComponent(SimpleBaseCrudPage)
                .setRefCallback((r: any) => ref = r)
                .mount();
            expect(ref.getOptions()).toEqual({});
        });

        it('should return options defined in config', function () {
            new TestingPageBuilder()
                .setPageIndex("indexPage")
                .setPageName('index')
                .setOptions({test: 'test'})
                .setComponent(SimpleBaseCrudPage)
                .setRefCallback((r: any) => ref = r)
                .mount();
            expect(ref.getOptions()).toEqual({test: 'test'});
        });

        it('should get page state', function () {
            const mockedGetState = jest.fn().mockReturnValue({uiState: {pages: {index: {someKey: 'someValue'}}}});
            new TestingPageBuilder()
                .setPageIndex("indexPage")
                .setPageName('index')
                .setGetState(mockedGetState)
                .setOptions(undefined as any)
                .setComponent(SimpleBaseCrudPage)
                .setRefCallback((r: any) => ref = r)
                .mount();
            expect(ref.getOptions()).toEqual({});
            expect(ref.getState()).toEqual({someKey: 'someValue'});
        });

        it('should return context', function () {
            new TestingPageBuilder()
                .setContext(TestingPageBuilder.contextTemplate)
                .setPageIndex("indexPage")
                .setPageName('index')
                .setComponent(SimpleBaseCrudPage)
                .setRefCallback((r: any) => ref = r)
                .mount();
            expect(ref.getContext()).toEqual(TestingPageBuilder.contextTemplate);
        });

        it('should updatePageState', function (done) {

            const afterCallback = jest.fn();
            const mockedGetState = jest.fn().mockReturnValue({uiState: {pages: {index: {}}}});
            const mockedUpdateState = (payload: any, callback: any) => {
                const uiState = mockedGetState();
                uiState.uiState.pages.index = {test: 'test'};
                expect(payload).toEqual(uiState);
                callback();
                expect(afterCallback).toBeCalled();
                done();
            }

            new TestingPageBuilder()
                .setPageIndex("indexPage")
                .setUpdateState(mockedUpdateState)
                .setGetState(mockedGetState)
                .setPageName('index')
                .setComponent(SimpleBaseCrudPage)
                .setRefCallback((r: any) => ref = r)
                .mount();
            ref.updateState({test: 'test'}, afterCallback);

        });

        it('should update page options', function (done) {
            const afterCallback = jest.fn();
            const mockedUpdatePageOptions = (pageName: string, newOptions: any, callback: () => void) => {
                expect(pageName).toEqual('index');
                expect(newOptions).toEqual({test: 'test'});
                expect(callback).toBe(afterCallback);
                done();
            }

            new TestingPageBuilder()
                .setPageIndex("indexPage")
                .setUpdatePageOptions(mockedUpdatePageOptions)
                .setPageName('index')
                .setComponent(SimpleBaseCrudPage)
                .setRefCallback((r: any) => ref = r)
                .mount();
            ref.updateOptions({test: 'test'}, afterCallback);
        });
    });

    it('should navigate home', function (done) {
        const history: any = {
            push: () => {
                done();
            }
        };
        new TestingPageBuilder()
            .setPageIndex("indexPage")
            .setPageName('index')
            .setComponent(SimpleBaseCrudPage)
            .setRefCallback((r: any) => ref = r)
            .setHistoryProp(history)
            .mount();
        ref.navigateToHome();
    });

    describe('Toolbar', () => {
        it('should render null for toolbar when set to null in config', function () {
            new TestingPageBuilder()
                .setPageIndex("indexPage")
                .setPageName('index')
                .setComponent(SimpleBaseCrudPage)
                .setRefCallback((r: any) => ref = r)
                .setToolbar(null)
                .mount();
            expect(ref.renderToolbar()).toBeNull();
        });

        it('should render toolbar using function in config', function () {
            new TestingPageBuilder()
                .setPageIndex("indexPage")
                .setPageName('index')
                .setComponent(SimpleBaseCrudPage)
                .setRefCallback((r: any) => ref = r)
                .setToolbar(() => 'toolbar')
                .mount();
            expect(ref.renderToolbar()).toEqual('toolbar');
        });

        it('should render null as default toolbar renderer', function () {
            new TestingPageBuilder()
                .setPageIndex("indexPage")
                .setPageName('index')
                .setComponent(SimpleBaseCrudPage)
                .setRefCallback((r: any) => ref = r)
                .mount();
            expect(ref.renderToolbar()).toBeNull();
        });
    });

});