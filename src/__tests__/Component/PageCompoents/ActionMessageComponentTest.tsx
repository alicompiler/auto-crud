import EnzymeAdapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import ActionMessageComponent from "../../../Components/PageComponents/ActionMessageComponent";
import React from "react";
import {AutoCrudDefaults} from "../../../Defaults/AutoCrudDefaults";

configure({adapter: new EnzymeAdapter()});

describe('ActionMessageComponent', () => {

    it('should use defaults', function () {
        const component = mount(<ActionMessageComponent message={''} disabled={false}
                                                        mainAction={{
                                                            handle: () => undefined,
                                                            text: 'Main'
                                                        }}/>);
        const wrapper = component.find('div').getElements()[0];
        const messageP = component.find('p').getElement();
        const buttons = component.find('button').getElements();
        const span = component.find('span').getElement();
        expect(wrapper.props.className).toEqual('');
        expect(messageP.props.className).toEqual(AutoCrudDefaults.classNames.components.messageWithActions.message);
        expect(buttons).toHaveLength(1);
        expect(span.props.className).toEqual(AutoCrudDefaults.classNames.span_horizontal_divider);
        expect(buttons[0].props.className).toEqual(AutoCrudDefaults.classNames.main_action);
    });

    it('should use passed props', function () {
        const component = mount(<ActionMessageComponent message={''} disabled={false}
                                                        wrapperClassName={'wrapper-class-name'}
                                                        mainAction={{
                                                            handle: () => undefined,
                                                            className: 'main-class-name',
                                                            text: 'Main'
                                                        }}/>);
        const wrapper = component.find('div').getElements()[0];
        const buttons = component.find('button').getElements();
        expect(wrapper.props.className).toEqual('wrapper-class-name');
        expect(buttons[0].props.className).toEqual('main-class-name');
    });

    it('should use cancel action with default', function () {
        const component = mount(<ActionMessageComponent message={''} disabled={false}
                                                        cancelAction={{
                                                            handle: () => undefined,
                                                        }}
                                                        mainAction={{
                                                            handle: () => undefined,
                                                            text: 'Main'
                                                        }}/>);
        const buttons = component.find('button').getElements();
        expect(buttons).toHaveLength(2);
        expect(buttons[1].props.className).toEqual(AutoCrudDefaults.classNames.cancel_action);
        expect(buttons[1].props.children).toEqual(AutoCrudDefaults.localization.cancel);
    });


    it('should use cancel action with passed props', function () {
        const component = mount(<ActionMessageComponent message={''} disabled={false}
                                                        cancelAction={{
                                                            handle: () => undefined,
                                                            text: 'XYZ',
                                                            className: 'cancel-class-name'
                                                        }}
                                                        mainAction={{
                                                            handle: () => undefined,
                                                            text: 'Main'
                                                        }}/>);
        const buttons = component.find('button').getElements();
        expect(buttons).toHaveLength(2);
        expect(buttons[1].props.className).toEqual('cancel-class-name');
        expect(buttons[1].props.children).toEqual('XYZ');
    });

});