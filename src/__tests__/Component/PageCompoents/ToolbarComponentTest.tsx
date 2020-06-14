import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import ToolbarComponent from "../../../Components/Toolbar/ToolbarComponent";

configure({adapter: new Adapter()});


describe('ToolbarComponent', () => {

    describe('search', () => {
        it('should render search input', function () {
            const wrapper = mount(<ToolbarComponent/>);
            const input = wrapper.find('input').getElement();
            expect(input).toBeTruthy();
        });

        it('should no render search input when noSearch is set to true', function () {
            const wrapper = mount(<ToolbarComponent noSearch/>);
            const input = wrapper.find('input').getElements()[0];
            expect(input).toBeFalsy();
        });

        it('should handle change of input', function () {
            const wrapper = mount(<ToolbarComponent/>);
            const input = wrapper.find('input').getElement();
            input.props.onChange({target: {value: 'test'}});
            expect(wrapper.state()).toEqual({searchValue: 'test'});
        });

        it('should handle key press', function () {
            const onSearchMock = jest.fn();
            const wrapper = mount(<ToolbarComponent onSearch={onSearchMock}/>);
            const input = wrapper.find('input').getElement();
            wrapper.setState({searchValue: 'test'});
            input.props.onKeyUp({key: 'ESC'} as any);
            expect(onSearchMock).not.toBeCalled();
            input.props.onKeyUp({key: 'Enter'} as any);
            expect(onSearchMock).toBeCalledWith('test');
        });

        it('should handle not call onSearch when it is not defined', function () {
            const onSearchMock = jest.fn();
            const wrapper = mount(<ToolbarComponent/>);
            const input = wrapper.find('input').getElement();
            input.props.onKeyUp({key: 'Enter'} as any);
            expect(onSearchMock).not.toBeCalled();
        });
    });

    describe('actions', () => {

        it('should render null for actions when it not defined', function () {
            const wrapper = mount(<ToolbarComponent/>);
            const instance = wrapper.instance() as ToolbarComponent;
            expect(instance.renderActions()).toEqual(null);
        });

        it('should render use actions from props', function () {
            const action1 = jest.fn().mockReturnValue(null);
            const action2 = jest.fn().mockReturnValue(null);
            const mockedPage : any = {};
            const wrapper = mount(<ToolbarComponent actions={[action1 , action2]} page={mockedPage}/>);
            const instance = wrapper.instance() as ToolbarComponent;
            instance.renderActions();
            expect(action1).toBeCalledWith(mockedPage);
            expect(action2).toBeCalledWith(mockedPage);
        });

    });

});