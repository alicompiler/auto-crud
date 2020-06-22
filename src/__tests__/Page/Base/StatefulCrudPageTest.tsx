import {configure} from "enzyme";
import StatefulCrudPage from "../../../Page/Base/StatefulCrudPage";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import TestingPageBuilder from "../../../Utils/TestingPageBuilder";

configure({adapter: new Adapter()});

class SimpleStatefulPage extends StatefulCrudPage {
    protected renderMainContent(): any {
        return null;
    }
}

function mockStatusMethodsAndCallRenderContent(instance: StatefulCrudPage) {
    instance.renderSuccessMessageComponent = jest.fn().mockReturnValue(null);
    instance.renderErrorMessageComponent = jest.fn().mockReturnValue(null);
    instance.renderLoadingComponent = jest.fn().mockReturnValue(null);
    instance.renderContent();
}

let ref: StatefulCrudPage = null as any;

describe('StatefulCrudPage', () => {

    it('should return loading/error/success state', function () {

        let pageState = {
            __loading: true,
            __successMessage: 'success message',
            __errorMessage: 'error message'
        };

        new TestingPageBuilder()
            .setPageName('index')
            .setPageIndex('indexPage')
            .setComponent(SimpleStatefulPage)
            .setPageState(pageState)
            .setRefCallback(r => ref = r)
            .mount()

        expect(ref.isLoading()).toEqual(true);
        expect(ref.getSuccessMessage()).toEqual('success message');
        expect(ref.getErrorMessage()).toEqual('error message');
    });

    describe('update state', () => {

        it('should update loading/success/error state', function (done) {

            let mockedCallback = jest.fn();
            let mockedUpdateState = (payload: any, callback: any) => {
                const indexState = payload.uiState.pages.index;
                expect(indexState).toEqual({
                    __loading: false,
                    __errorMessage: 'E',
                    __successMessage: 'S'
                });
                callback();
                expect(mockedCallback).toBeCalled();
                done();
            };


            new TestingPageBuilder()
                .setPageName('index')
                .setPageIndex('indexPage')
                .setComponent(SimpleStatefulPage)
                .setRefCallback(r => ref = r)
                .setPageState({})
                .setUpdateState(mockedUpdateState)
                .mount()

            ref.updateLoadingErrorSuccess(false, 'E', 'S', mockedCallback);
        });

        it('should not add to payload when value is undefined', function (done) {
            let pageState = {__loading: true, __errorMessage: 'error', __successMessage: 'success'};
            const mockedUpdateState = (payload: any) => {
                const indexState = payload.uiState.pages.index;
                expect(indexState).toEqual(pageState);
                done();
            }
            new TestingPageBuilder()
                .setPageName('index')
                .setPageIndex('indexPage')
                .setComponent(SimpleStatefulPage)
                .setRefCallback(r => ref = r)
                .setPageState(pageState)
                .setUpdateState(mockedUpdateState)
                .mount();
            ref.updateLoadingErrorSuccess(undefined, undefined, undefined);
        });

        it('should add to payload when value is null', function (done) {
            let pageState = {__loading: true, __errorMessage: 'error', __successMessage: 'success'};
            const mockedUpdateState = (payload: any) => {
                const indexState = payload.uiState.pages.index;
                expect(indexState).toEqual({__loading: null, __errorMessage: null, __successMessage: null});
                done();
            }
            new TestingPageBuilder()
                .setPageName('index')
                .setPageIndex('indexPage')
                .setComponent(SimpleStatefulPage)
                .setRefCallback(r => ref = r)
                .setPageState(pageState)
                .setUpdateState(mockedUpdateState)
                .mount();
            ref.updateLoadingErrorSuccess(null, null, null);

        });

    });

    describe('render status component', () => {

        it('should render success when successMessage has value', function () {
            const state = {__loading: null, __errorMessage: null, __successMessage: 'S'};
            new TestingPageBuilder()
                .setPageIndex('indexPage').setPageName('index').setPageState(state)
                .setComponent(SimpleStatefulPage)
                .setRefCallback(r => ref = r)
                .mount();

            mockStatusMethodsAndCallRenderContent(ref);

            expect(ref.renderErrorMessageComponent).not.toBeCalled();
            expect(ref.renderLoadingComponent).not.toBeCalled();
            expect(ref.renderSuccessMessageComponent).toBeCalled();
        });

        it('should render loading/error when loading/errorMessage has value', function () {

            const state = {__loading: true, __errorMessage: 'E', __successMessage: null};
            new TestingPageBuilder()
                .setPageIndex('indexPage').setPageName('index').setPageState(state)
                .setComponent(SimpleStatefulPage)
                .setRefCallback(r => ref = r)
                .mount();

            mockStatusMethodsAndCallRenderContent(ref);

            expect(ref.renderErrorMessageComponent).toBeCalled();
            expect(ref.renderLoadingComponent).toBeCalled();
            expect(ref.renderSuccessMessageComponent).not.toBeCalled();

        });

        it('should navigate home when success button clicked', function () {
            const state = {__loading: null, __errorMessage: null, __successMessage: 'success'};
            const wrapper = new TestingPageBuilder()
                .setPageIndex('indexPage').setPageName('index').setPageState(state)
                .setComponent(SimpleStatefulPage)
                .setRefCallback(r => ref = r)
                .mount();

            ref.navigateToHome = jest.fn();
            ref.updateLoadingErrorSuccess = jest.fn();

            const button = wrapper.find('button').getElement();
            button.props.onClick(null as any);
            expect(ref.navigateToHome).toBeCalled();
            expect(ref.updateLoadingErrorSuccess).toBeCalledWith(null, null, null);
        });

    });

})