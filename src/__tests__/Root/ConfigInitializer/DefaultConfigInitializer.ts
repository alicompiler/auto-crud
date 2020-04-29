import {CrudConfig} from "../../../Root/CrudConfig";
import {MainConfigInitializer} from "../../../Root/ConfigInitializer/MainConfigInitializer";
import {DefaultConfigInitializer} from "../../../Root/ConfigInitializer/ConfigInitializer";
import {DefaultPageConfigModifier} from "../../../Page/PageConfigModifier/DefaultPageConfigModifier";

describe('DefaultConfigInitializer', () => {

    it('should get initialize config', function () {
        const config: CrudConfig = {name: 'books', endpointRoot: '', fields: []};

        const newConfig = new DefaultConfigInitializer(config).initialize();

        let expectedConfig = new MainConfigInitializer().initialize(config);
        expectedConfig = {...expectedConfig, ...new DefaultPageConfigModifier(expectedConfig).modify()};

        expect(newConfig).toEqual(expectedConfig);
    });

})