import {ProgressIndicator} from "../../../Components/Core/ProgressIndicator/ProgressIndicator";
import React from "react";
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {configure, mount} from "enzyme";
import {AutoCrudDefaults} from "../../../Defaults/AutoCrudDefaults";

configure({adapter: new EnzymeAdapter()});


describe('ProgressIndicator', () => {

    it('should use passed props', function () {
        const component = mount(<ProgressIndicator height={10} bgColor={'red'} progressColor={'blue'}/>);
        const divs = component.find('div').getElements();
        const wrapper = divs[0];
        const progress = divs[1];
        expect(wrapper.props.style).toEqual({height: 10, backgroundColor: 'red'});
        expect(progress.props.style).toEqual({backgroundColor: 'blue'});
    });

    it('should use defaults when no props provided', function () {
        const component = mount(<ProgressIndicator/>);
        const divs = component.find('div').getElements();
        const wrapper = divs[0];
        const progress = divs[1];
        expect(wrapper.props.style).toEqual({
            height: AutoCrudDefaults.componentsConfig.progressIndicator.height
            , backgroundColor: AutoCrudDefaults.componentsConfig.progressIndicator.bgColor
        });
        expect(progress.props.style).toEqual({backgroundColor: AutoCrudDefaults.componentsConfig.progressIndicator.progressColor});
    });

})