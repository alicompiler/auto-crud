import {CrudConfig} from "../../../Root/CrudConfig";
import {MainConfigInitializer} from "../../../Utils/ConfigInitializer/MainConfigInitializer";

describe('MainConfigInitializer', () => {

    it('should get route from name config', function () {
        const config: CrudConfig = {name: 'books', endpointRoot: '', fields: []};
        const initializer = new MainConfigInitializer();
        const newConfig = initializer.initialize(config);
        expect(newConfig.routeRoot).toEqual('/books');
    });

    it('should use route from config', function () {
        const config: CrudConfig = {name: 'books', routeRoot: '/my-books', endpointRoot: '', fields: []};
        const initializer = new MainConfigInitializer();
        const newConfig = initializer.initialize(config);
        expect(newConfig.routeRoot).toEqual('/my-books');
    });


});