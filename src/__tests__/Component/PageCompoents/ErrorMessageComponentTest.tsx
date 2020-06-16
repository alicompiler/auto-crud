import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import {ErrorMessageComponent} from "../../../Components/PageComponents/ErrorMessageComponent";
import {AutoCrudDefaults} from "../../../Defaults/AutoCrudDefaults";

configure({adapter: new Adapter()});


describe('ErrorMessageComponent', () => {
    it('should render action if defined', function () {
        const wrapper = mount(<ErrorMessageComponent message={'test message'} action={{
            text: 'action',
            onClick: () => undefined
        }}/>);
        const button = wrapper.find("button").getElement();
        expect(button).toBeTruthy();
    });

    it('should not render action if defined', function () {
        const wrapper = mount(<ErrorMessageComponent message={'test message'}/>);
        const button = wrapper.find("button").getElements()[0];
        expect(button).toBeFalsy();
    });

    it('should use default action class name', function () {
        const wrapper = mount(<ErrorMessageComponent message={'test message'} action={{
            text: 'action',
            onClick: () => undefined
        }}/>);
        const button = wrapper.find("button").getElement();
        const className = button.props.className;
        expect(className).toEqual(AutoCrudDefaults.classNames.components.errorMessage.action);
    });

    it('should use passed action class name', function () {
        const wrapper = mount(<ErrorMessageComponent message={'test message'} action={{
            text: 'action',
            className : 'test class',
            onClick: () => undefined
        }}/>);
        const button = wrapper.find("button").getElement();
        const className = button.props.className;
        expect(className).toEqual('test class');
    });
});