import EnzymeAdapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import React from "react";
import {AutoCrudDefaults} from "../../Defaults/AutoCrudDefaults";
import DefaultActionColumn from "../../Components/ModuleComponents/DefaultActionColumn";

configure({adapter: new EnzymeAdapter()});


describe('Defaults', () => {
    it('should return from page button class name', function () {
        const className = AutoCrudDefaults.classNames.formPage.button();
        expect(className).toEqual(`rounded px-4 py-2 w-24 border text-lg
                          hover:text-xl hover:font-bold 
                          transition duration-500 ease-in-out 
                          disabled:bg-gray-100 disabled:text-gray-400 
                          ${AutoCrudDefaults.classNames.formPage.buttonColoring} ${AutoCrudDefaults.classNames.formPage.extra}`)
    });

    it('should handle action for curd root home button', function () {
        const func = jest.fn();
        const context :any = {config : {routeRoot : '/root'}};
        const button = AutoCrudDefaults.components.renderCrudHeaderHomeButton(func , context);
        // noinspection TypeScriptValidateJSTypes
        button.props.onClick();
        expect(func).toBeCalledWith('/root');
    });

    it('should handle action for default form render options with valid = true', function () {
        const mockedForm :any = {isLoading : () => true , validate: () => true , submit : jest.fn()};
        const component = mount(AutoCrudDefaults.pages.formPage.renderOptions.form?.renderButton?.(mockedForm));
        // noinspection TypeScriptValidateJSTypes
        component.find('button').getElement().props.onClick();
        expect(mockedForm.submit).toBeCalled();
    });


    it('should handle action for default form render options with valid = false', function () {
        const mockedForm :any = {isLoading : () => true , validate: () => false , submit : jest.fn()};
        const component = mount(AutoCrudDefaults.pages.formPage.renderOptions.form?.renderButton?.(mockedForm));
        // noinspection TypeScriptValidateJSTypes
        component.find('button').getElement().props.onClick();
        expect(mockedForm.submit).not.toBeCalled();
    });

    it('should use table actions column', function () {
        const actionsColumn = AutoCrudDefaults.components.tableActionsColumn();
        const cell = actionsColumn.renderCell?.('' , {} , 1);
        expect(cell).toEqual(<DefaultActionColumn item={{}} />);
    });
});