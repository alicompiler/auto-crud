import {unmountComponentAtNode} from "react-dom";
import AutoCrud from "../../Root/AutoCrud";
import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16"


configure({adapter: new Adapter()});

describe('AutoCrud', () => {


    // noinspection DuplicatedCode
    let container: Element | null = null;

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container!);
        container!.remove();
        container = null;
    });

    it('should match snapshot', function () {

        const component = mount(<BrowserRouter>
            <AutoCrud name={'test'} fields={[]} endpointRoot={''}/>
        </BrowserRouter>);

        expect(component).toMatchSnapshot()
    });

});