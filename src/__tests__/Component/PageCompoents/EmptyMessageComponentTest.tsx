import EnzymeAdapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import React from "react";
import {EmptyMessageComponent} from "../../../Components/PageComponents/EmptyMessageComponent";
import {AutoCrudDefaults} from "../../../Defaults/AutoCrudDefaults";

configure({adapter: new EnzymeAdapter()});


describe('EmptyMessageComponent', () => {

    it('should use passed message', function () {
        const component = mount(<EmptyMessageComponent message={'some message'}/>);
        const p = component.find('p').getElement();
        expect(p.props.children).toEqual('some message');
    });

    it('should action with default class name', function () {
        const component = mount(<EmptyMessageComponent action={{
            onClick : () => undefined,
            text : 'Test'
        }} message={'some message'}/>);
        const button = component.find('button').getElement();
        expect(button.props.className).toEqual(AutoCrudDefaults.classNames.components.emptyMessage.action);
    });

})