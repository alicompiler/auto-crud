import {getInitialState} from "../../root/CrudContext";

describe('crud context', () => {

    it('should get initial state', function () {
        const props: any = {};
        const setState = jest.fn();

        const initialState = getInitialState(props, setState);

        const {updateState, ...initialStateWithoutUpdateStateFunction} = initialState;

        expect(initialStateWithoutUpdateStateFunction).toEqual({
            config: props,
            modals: {},
            state: {},
            setState: setState,
        });

        updateState({});
        expect(setState).toBeCalledWith({});
    });

});