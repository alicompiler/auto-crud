import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {SuccessMessageComponent} from "../../../Components/PageComponents/SuccessMessageComponent";
import React from "react";
import {AutoCrudDefaults} from "../../../Page/AutoCrudDefaults";

configure({adapter: new Adapter()});

describe('SuccessMessageComponent', () => {

    it('should use default class name', function () {
        const component = mount(<SuccessMessageComponent message={'test'} actionText={''} onAction={() => undefined}/>);
        const message = component.find('SingleActionMessage').getElement();
        expect(message.props.actionClassName).toEqual(AutoCrudDefaults.classNames.components.successMessage.action);
    });

    it('should use passed class name', function () {
        const component = mount(<SuccessMessageComponent message={'test'} actionClassName={'test'} actionText={''} onAction={() => undefined}/>);
        const message = component.find('SingleActionMessage').getElement();
        expect(message.props.actionClassName).toEqual('test');
    });

});