import {ConfirmationUtils} from "../../../Page/Base/Confirmation/ConfirmationUtils";
import {ConfirmationOptions} from "../../../Page/Base/Confirmation/ConfirmationOptions";
import {AutoCrudDefaults} from "../../../Defaults/AutoCrudDefaults";

function getMockedPage(options: ConfirmationOptions = {}): any {
    return {
        getOptions: () => ({confirmation: options})
    };
}

function getConfirmationUtils(options: ConfirmationOptions = {}): ConfirmationUtils {
    return new ConfirmationUtils(getMockedPage(options));
}

describe('ConfirmationUtils', function () {

    it('should return null when confirmationRequired option is not set to true', function () {
        const utils = getConfirmationUtils();
        expect(utils.renderConfirmationForm()).toEqual(null);
    });

    it('should not return null when confirmationRequired option set to true', function () {
        const utils = getConfirmationUtils({required: true});
        expect(utils.renderConfirmationForm()).not.toEqual(null);
    });


    it('should return default confirmation form render options', function () {
        const utils = getConfirmationUtils();
        const options = utils.getConfirmationFormRenderOptions();
        expect(options).toEqual({
            field: AutoCrudDefaults.confirmation.field(),
            confirmationFormWrapperClassName: AutoCrudDefaults.confirmation.formWrapperClassName,
            messageClassName: AutoCrudDefaults.confirmation.messageClassName,
            confirmationMessage: AutoCrudDefaults.localization.confirmation_message
        });
    });

    it('should return confirmation FormRenderOptions from page options', function () {
        const utils = getConfirmationUtils({
            codeField: true as any,
            wrapperClassName: true as any,
            message: true as any,
            messageClassName: true as any
        });

        const options = utils.getConfirmationFormRenderOptions();
        expect(options).toEqual({
            field: true,
            confirmationFormWrapperClassName: true,
            messageClassName: true,
            confirmationMessage: true
        });
    });


    it('should return generate confirmation code ', function () {
        const utils = getConfirmationUtils()
        utils.currentConfirmationCode = null;
        const code = utils.getConfirmationCode();
        expect(code).toEqual(utils.currentConfirmationCode);
        expect(utils.currentConfirmationCode).toBeTruthy();
    });

    it('should return current code when there is code already ', function () {
        const utils = getConfirmationUtils();
        utils.currentConfirmationCode = 'ABC';
        const code = utils.getConfirmationCode();
        expect(code).toEqual('ABC');
        expect(utils.currentConfirmationCode).toEqual('ABC');
    });

    it('should use code generator from page options', function () {
        const utils = getConfirmationUtils({generateCode: () => 'ABC'})
        const code = utils.getConfirmationCode();
        expect(code).toEqual('ABC');
    });


    it('should render code element using default component', function () {
        const utils = getConfirmationUtils();
        utils.currentConfirmationCode = 'ABC';
        const codeElementComponent = utils.renderConfirmationCodeElement();
        expect(codeElementComponent).toEqual(AutoCrudDefaults.confirmation.renderConfirmationCodeElement('ABC'));
    });


    it('should render code element using page options', function () {
        const utils = getConfirmationUtils({renderCodeElement: (code: string | null) => code})
        utils.currentConfirmationCode = 'XXX';
        const element = utils.renderConfirmationCodeElement();
        expect(element).toEqual('XXX');
    });

    it('should return confirm false when confirmation code not equal to input', function () {
        const utils = getConfirmationUtils();
        utils.currentConfirmationCode = 'ABC';
        utils.confirmationForm = {collect: () => ({getData: () => ({confirmation: 'AXX'})})} as any;
        expect(utils.confirm()).toEqual(false);
    });


    it('should confirm true when no confirmation form available', function () {
        const utils = getConfirmationUtils();
        expect(utils.confirm()).toEqual(true);
    });


});