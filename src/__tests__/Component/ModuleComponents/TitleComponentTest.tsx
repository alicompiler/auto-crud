import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import TitleComponent from "../../../Components/ModuleComponent/TitleComponent";
import {CrudContext} from "../../../Root/CrudContext";

configure({adapter: new Adapter()});

describe('SuccessMessageComponent', () => {

    it('should render title only', function () {
        const wrapper = mount(<CrudContext.Provider value={{config: {mainTitle: 'Test'}, state: {}}}>
            <TitleComponent/>
        </CrudContext.Provider>);
        const title = wrapper.find('h2').getElement();
        expect(title.props.children).toEqual("Test");
        const subTitle = wrapper.find('p').getElements()[0];
        expect(subTitle).toBeFalsy();
    });

    it('should render subtitle only', function () {
        const wrapper = mount(<CrudContext.Provider value={{config: {}, state: {pageTitle: 'Page Title'}}}>
            <TitleComponent/>
        </CrudContext.Provider>);
        const title = wrapper.find('h2').getElements()[0];
        expect(title).toBeFalsy();
        const subTitle = wrapper.find('p').getElement();
        expect(subTitle.props.children).toEqual("Page Title");
    });

    it('should render title and subtitle', function () {
        const wrapper = mount(<CrudContext.Provider
            value={{config: {mainTitle: 'Test'}, state: {pageTitle: 'Page Title'}}}>
            <TitleComponent/>
        </CrudContext.Provider>);
        const title = wrapper.find('h2').getElement();
        expect(title.props.children).toEqual("Test");
        const subTitle = wrapper.find('p').getElement();
        expect(subTitle.props.children).toEqual("Page Title");
        const separator = wrapper.find('span').getElement();
        expect(separator).toBeTruthy();
    });

});