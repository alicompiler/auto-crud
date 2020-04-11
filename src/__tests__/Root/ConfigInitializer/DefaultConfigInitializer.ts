import {CrudConfig} from "../../../Root/CrudConfig";
import {MainConfigInitializer} from "../../../Root/ConfigInitializer/MainConfigInitializer";
import {PageConfigInitializer} from "../../../Root/ConfigInitializer/PageConfigInitializer";
import {DefaultConfigInitializer} from "../../../Root/ConfigInitializer/ConfigInitializer";

describe('DefaultConfigInitializer', () => {

    it('should get initialize config', function () {
        const config: CrudConfig = {name: 'books', endpointRoot: '', fields: []};

        const newConfig = new DefaultConfigInitializer(config).initialize();

        let expectedConfig = new MainConfigInitializer().initialize(config);
        expectedConfig = {...expectedConfig, ...new PageConfigInitializer().initialize(expectedConfig)};

        expect(newConfig).toEqual(expectedConfig);
    });

})