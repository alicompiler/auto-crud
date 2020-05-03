import {configure, mount} from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import BaseCrudPageWithConfirmationAndStatus from "../../../Page/Base/BaseCrudPageWithConfirmationAndStatus";
import {CrudContextValue} from "../../../Root/CrudContext";
import {AutoCrudDefaults} from "../../../Page/AutoCrudDefaults";

configure({adapter: new Adapter()});

class SimpleCrudPageWithConfirmationAndStatus extends BaseCrudPageWithConfirmationAndStatus {
    protected renderMainContent(): any {
        return null;
    }
}

describe('BaseCrudPageWithConfirmationAndStatus', () => {

    const context: CrudContextValue = {
        getState: () => null,
        updatePageOptions: () => null,
        updateState: () => null,
        state: {},
        config: {
            indexPage: {name: 'index'},
            createPage: {name: 'create'},
            updatePage: {name: 'update'},
            deletePage: {name: 'delete'},
            detailsPage: {name: 'details'},
            pages: [],
            endpointRoot: '',
            name: 'test',
            fields: [],
        }
    }


    it('should return null when confirmationRequired option is not set to true', function () {
        const _context = {...context, getState: () => ({uiState: {pages: {index: {}}}})};
        const page = mount(<SimpleCrudPageWithConfirmationAndStatus name={'index'}
                                                                    context={_context}
                                                                    history={null as any} location={null as any}
                                                                    match={null as any}/>);
        const instance: BaseCrudPageWithConfirmationAndStatus = page.instance() as any;
        expect(instance.renderConfirmationForm()).toEqual(null);
    });

    it('should not return null when confirmationRequired option set to true', function () {
        const _context = {
            ...context,
            config: {
                ...context.config, indexPage: {
                    name: 'index',
                    options: {confirmationRequired: true}
                },
            },
            getState: () => ({uiState: {pages: {index: {}}}})
        };
        const page = mount(<SimpleCrudPageWithConfirmationAndStatus name={'index'}
                                                                    context={_context}
                                                                    history={null as any} location={null as any}
                                                                    match={null as any}/>);
        const instance: BaseCrudPageWithConfirmationAndStatus = page.instance() as any;
        expect(instance.renderConfirmationForm()).not.toEqual(null);
    });

    it('should return default confirmation form render options', function () {
        const _context = {...context, getState: () => ({uiState: {pages: {index: {}}}})};
        const page = mount(<SimpleCrudPageWithConfirmationAndStatus name={'index'}
                                                                    context={_context}
                                                                    history={null as any} location={null as any}
                                                                    match={null as any}/>);
        const instance: BaseCrudPageWithConfirmationAndStatus = page.instance() as any;
        const options = instance.getConfirmationFormRenderOptions();
        expect(options).toEqual({
            field: AutoCrudDefaults.confirmation.field(),
            confirmationFormWrapperClassName: AutoCrudDefaults.confirmation.formWrapperClassName,
            messageClassName: AutoCrudDefaults.confirmation.messageClassName,
            confirmationMessage: AutoCrudDefaults.localization.confirmation_message
        });
    });

    it('should return confirmation FormRenderOptions from page options', function () {
        const _context = {
            ...context, config: {
                ...context.config, indexPage: {
                    name: 'index',
                    options: {
                        confirmationCodeField: true,
                        confirmationWrapperClassName: true,
                        confirmationMessage: true,
                        confirmationMessageClassName: true
                    }
                }
            }, getState: () => ({uiState: {pages: {index: {}}}})
        };
        const page = mount(<SimpleCrudPageWithConfirmationAndStatus name={'index'}
                                                                    context={_context}
                                                                    history={null as any} location={null as any}
                                                                    match={null as any}/>);
        const instance: BaseCrudPageWithConfirmationAndStatus = page.instance() as any;
        const options = instance.getConfirmationFormRenderOptions();
        expect(options).toEqual({
            field: true,
            confirmationFormWrapperClassName: true,
            messageClassName: true,
            confirmationMessage: true
        });
    });


    it('should return generate confirmation code ', function () {
        const _context = {...context, getState: () => ({uiState: {pages: {index: {}}}})};
        const page = mount(<SimpleCrudPageWithConfirmationAndStatus name={'index'}
                                                                    context={_context}
                                                                    history={null as any} location={null as any}
                                                                    match={null as any}/>);
        const instance: BaseCrudPageWithConfirmationAndStatus = page.instance() as any;
        instance.currentConfirmationCode = null;
        const code = instance.getConfirmationCode();
        expect(code).toEqual(instance.currentConfirmationCode);
        expect(instance.currentConfirmationCode).toBeTruthy();
    });


    it('should return current code when there is code already ', function () {
        const _context = {...context, getState: () => ({uiState: {pages: {index: {}}}})};
        const page = mount(<SimpleCrudPageWithConfirmationAndStatus name={'index'}
                                                                    context={_context}
                                                                    history={null as any} location={null as any}
                                                                    match={null as any}/>);
        const instance: BaseCrudPageWithConfirmationAndStatus = page.instance() as any;
        instance.currentConfirmationCode = 'ABC';
        const code = instance.getConfirmationCode();
        expect(code).toEqual('ABC');
        expect(instance.currentConfirmationCode).toEqual('ABC');
    });

    it('should use code generator from page options', function () {
        const _context = {
            ...context, config: {
                ...context.config, indexPage: {
                    name: 'index',
                    options: {
                        generateConfirmationCode: () => 'ABC'
                    }
                }
            }, getState: () => ({uiState: {pages: {index: {}}}})
        };

        const page = mount(<SimpleCrudPageWithConfirmationAndStatus name={'index'}
                                                                    context={_context}
                                                                    history={null as any} location={null as any}
                                                                    match={null as any}/>);
        const instance: BaseCrudPageWithConfirmationAndStatus = page.instance() as any;
        const code = instance.getConfirmationCode();
        expect(code).toEqual('ABC')
    });


    it('should render code element using default component', function () {
        const _context = {...context, getState: () => ({uiState: {pages: {index: {}}}})};
        const page = mount(<SimpleCrudPageWithConfirmationAndStatus name={'index'}
                                                                    context={_context}
                                                                    history={null as any} location={null as any}
                                                                    match={null as any}/>);
        const instance: BaseCrudPageWithConfirmationAndStatus = page.instance() as any;
        instance.currentConfirmationCode = 'ABC';
        const codeElementComponent = instance.renderConfirmationCodeElement();
        expect(codeElementComponent).toEqual(AutoCrudDefaults.confirmation.renderConfirmationCodeElement('ABC'));
    });

    it('should render code element using page options', function () {
        const _context = {
            ...context, config: {
                ...context.config, indexPage: {
                    name: 'index',
                    options: {
                        renderConfirmationCodeElement: (code: string) => code
                    }
                }
            }, getState: () => ({uiState: {pages: {index: {}}}})
        };

        const page = mount(<SimpleCrudPageWithConfirmationAndStatus name={'index'}
                                                                    context={_context}
                                                                    history={null as any} location={null as any}
                                                                    match={null as any}/>);
        const instance: BaseCrudPageWithConfirmationAndStatus = page.instance() as any;
        instance.currentConfirmationCode = 'XXX';
        const element = instance.renderConfirmationCodeElement();
        expect(element).toEqual('XXX');
    });


    it('should return confirm false when confirmation code not equal to input', function () {
        const _context = {...context, getState: () => ({uiState: {pages: {index: {}}}})};
        const page = mount(<SimpleCrudPageWithConfirmationAndStatus name={'index'}
                                                                    context={_context}
                                                                    history={null as any} location={null as any}
                                                                    match={null as any}/>);
        const instance: BaseCrudPageWithConfirmationAndStatus = page.instance() as any;
        instance.currentConfirmationCode = 'ABC';
        instance.confirmationForm = {collect: () => ({getData: () => ({confirmation: 'AXX'})})} as any;
        instance.updateLoadingErrorSuccess = jest.fn();
        expect(instance.confirm()).toEqual(false);
        expect(instance.updateLoadingErrorSuccess).toBeCalledWith(undefined, AutoCrudDefaults.localization.confirmation_fail_message, undefined);
    });

    it('should confirm true when no confirmation form available', function () {
        const _context = {...context, getState: () => ({uiState: {pages: {index: {}}}})};
        const page = mount(<SimpleCrudPageWithConfirmationAndStatus name={'index'}
                                                                    context={_context}
                                                                    history={null as any} location={null as any}
                                                                    match={null as any}/>);
        const instance: BaseCrudPageWithConfirmationAndStatus = page.instance() as any;
        expect(instance.confirm()).toEqual(true);
    });

});