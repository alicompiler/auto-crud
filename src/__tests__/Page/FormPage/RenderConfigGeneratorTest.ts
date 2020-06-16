import {FormRenderConfigGenerator} from "../../../Page/FormPage/FormRenderConfigGenerator";
import {FormPageOptions} from "../../../Page/FormPage/FormPageOptions";

function getMockedFormPage(context: any, options: any): any {
    return {
        getContext: () => context,
        getOptions: () => options
    }
}

describe('RenderConfigGeneratorTest', () => {

    const context: any = {
        config: {
            fields: [
                {name: 'id'}, {name: 'name'}, {name: 'age'}, {name: 'address'}, {name: 'level'}
            ]
        }
    }

    it('should generate render config from options', function () {
        const options: FormPageOptions = {
            renderConfig: [{name: 'x', as: 'text'}, {name: 'y', as: 'password'}]
        };

        const generator = new FormRenderConfigGenerator(getMockedFormPage(context, options));
        const config = generator.generate();
        expect(config).toEqual([{name: 'x', as: 'text'}, {name: 'y', as: 'password'}]);
    });


    it('should generate render config from fields name', function () {
        const options: FormPageOptions = {
            fields: ['id', ['name', 'age'], 'level']
        };
        const generator = new FormRenderConfigGenerator(getMockedFormPage(context, options));
        const config = generator.generate();
        expect(config).toEqual([
            {name: 'id'},
            [{name: 'name'}, {name: 'age'}],
            {name: 'level'}
        ]);
    });

    it('should throw error when field name does not exists', function () {
        let options = {fields: ['xyz']};
        const generator = new FormRenderConfigGenerator(getMockedFormPage(context, options));
        expect(() => generator.generate()).toThrowError("Field 'xyz' doesn't exists");
    });

    it('should generate render config from all fields defined context config', function () {
        const generator = new FormRenderConfigGenerator(getMockedFormPage(context, {}));
        const config = generator.generate();
        expect(config).toEqual(context.config.fields);
    });
});