import React from 'react';
import BaseCrudPage from "./BaseCrudPage";
import {AutoCrudDefaults} from "../../Defaults/AutoCrudDefaults";

abstract class StatefulCrudPage extends BaseCrudPage {

    public renderContent(): any {
        if (this.getSuccessMessage()) {
            return <div className={'__status-page-wrapper'}>
                {this.renderSuccessMessageComponent()}
            </div>
        }

        return <div className={'__status-page-wrapper'}>
            {this.isLoading() && this.renderLoadingComponent()}
            {this.getErrorMessage() && this.renderErrorMessageComponent()}
            {this.renderMainContent()}
        </div>
    }

    protected abstract renderMainContent(): any;


    public isLoading = () => this.getState().__loading;
    public renderLoadingComponent = () => {
        return AutoCrudDefaults.components.progressIndicator();
    }

    public getErrorMessage = () => this.getState().__errorMessage;
    public renderErrorMessageComponent = () => {
        return AutoCrudDefaults.components.errorMessage(this.getErrorMessageComponentProps());
    }
    public getErrorMessageComponentProps = () => ({message: this.getErrorMessage()});


    public getSuccessMessage = () => this.getState().__successMessage;
    public renderSuccessMessageComponent = () => {
        return AutoCrudDefaults.components.successMessage(this.getSuccessMessageComponentProps());
    }

    public getSuccessMessageComponentProps = () => ({
        message: this.getSuccessMessage(),
        actionText: AutoCrudDefaults.localization.main,
        onAction: () => {
            this.resetState();
            this.navigateToHome();
        },
    });


    protected resetState() {
        this.updateState({__successMessage: undefined, __loading: undefined, __errorMessage: undefined});
    }

    public updateLoadingErrorSuccess = (loading?: boolean | null, errorMessage?: string | null, successMessage?: string | null, afterCallback?: () => void) => {
        const payload: any = {};
        if (loading !== undefined) payload.__loading = loading;
        if (errorMessage !== undefined) payload.__errorMessage = errorMessage;
        if (successMessage !== undefined) payload.__successMessage = successMessage;
        this.updateState(payload, afterCallback);
    }

}

export default StatefulCrudPage;