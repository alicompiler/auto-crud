import {BaseSubmitConfigGenerator as SubmitConfigGenerator} from "../../../Page/FormPage/BaseSubmitConfigGenerator";

describe('SubmitConfigGenerator', () => {


    const getMockedFormPage = (context: any, options: any): any => {
        return {
            getContext: () => context,
            getDefaultHttpMethod: () => 'post',
            getDefaultSubmitConfig: () => ({}),
            getOptions: () => options
        }
    }

    it('should return submit config from options', function () {
        const context: any = {config: {endpointRoot: '/api/'}}
        const options: any = {
            submitConfig: {method: 'delete', url: '/test'}
        };

        const generator = new SubmitConfigGenerator(getMockedFormPage(context, options));
        const config = generator.generate();
        expect(config).toEqual({method: 'delete', url: '/test'});
    });

    it('should generate submit config from defaults', function () {
        const context: any = {config: {endpointRoot: '/api/'}}
        const options: any = {};

        const generator = new SubmitConfigGenerator(getMockedFormPage(context, options));
        const config = generator.generate();

        expect(config).toEqual({
            method: 'post',
            url: context.config.endpointRoot
        });
    });


    it('should generate submit config using url(string) from options', function () {
        const context: any = {config: {endpointRoot: '/api/'}}
        const options: any = {url: 'some-url'};

        const generator = new SubmitConfigGenerator(getMockedFormPage(context, options));
        const config = generator.generate();

        expect(config).toEqual({
            method: 'post',
            url: context.config.endpointRoot + "some-url"
        });
    });

    it('should generate submit config using url(function) from options', function () {
        const context: any = {config: {endpointRoot: '/api/', name: 'test'}}
        const options: any = {url: (context: any) => context.config.name};

        const generator = new SubmitConfigGenerator(getMockedFormPage(context, options));
        const config = generator.generate();

        expect(config).toEqual({
            method: 'post',
            url: 'test'
        });
    });


    it('should generate submit config using urlPostfix from options', function () {
        const context: any = {config: {endpointRoot: '/api/', name: 'test'}}
        const options: any = {urlPostfix: 'xyz'};

        const generator = new SubmitConfigGenerator(getMockedFormPage(context, options));
        const config = generator.generate();

        expect(config).toEqual({
            method: 'post',
            url: context.config.endpointRoot + 'xyz'
        });
    });


    it('should generate submit config using overrideSubmitConfig in options', function () {
        const context: any = {config: {endpointRoot: '/api/', name: 'test'}}
        const options: any = {overrideSubmitConfig: {method: 'put', changeLoadingState: true}};

        const generator = new SubmitConfigGenerator(getMockedFormPage(context, options));
        const config = generator.generate();

        expect(config).toEqual({
            method: 'put',
            url: context.config.endpointRoot,
            changeLoadingState: true
        });
    });


})