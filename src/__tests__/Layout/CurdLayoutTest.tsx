import * as React from "react";
import {configure, mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import {BrowserRouter} from "react-router-dom";
import CrudLayout from "../../Layout/CrudLayout";
import {CrudContext, getInitialState} from "../../Root/CrudContext";

configure({adapter: new Adapter()});

describe('CurdLayout', () => {
    it('should match snapshot', function () {
        const component = shallow(<BrowserRouter>
            <CrudContext.Provider value={getInitialState({name: '', endpointRoot: '', fields: []})}>
                <CrudLayout/>
            </CrudContext.Provider>
        </BrowserRouter>);

        expect(component).toMatchSnapshot();
    });
});