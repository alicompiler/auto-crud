import {getInitialState} from "../../Root/CrudContext";
import {CrudConfig} from "../../Root/CrudConfig";
import {DefaultConfigInitializer} from "../../Root/ConfigInitializer/ConfigInitializer";
import {UIStateInitializer} from "../../config/UIStateInitializer";

describe('crud context', () => {

    it('should get initial state', function () {
        const props: CrudConfig = {name: 'test', endpointRoot: '/', fields: []};
        const initialState = getInitialState(props);

        const config = new DefaultConfigInitializer(props).initialize();
        const uiState = new UIStateInitializer(config).initialize();

        expect(initialState).toEqual({
            config: config,
            state: {
                pageTitle: '',
            },
            ui: uiState
        });
    });

});