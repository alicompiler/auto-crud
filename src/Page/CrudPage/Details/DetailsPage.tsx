import BaseCrudPage from "../../Base/BaseCrudPage";
import {KeyValueComponent} from "react-keyvalue-ui";
import React from "react";
import {DetailsPageOptions} from "./DetailsPageOptions";
import {AutoCrudDefaults} from "../../AutoCrudDefaults";

class DetailsPage extends BaseCrudPage {
    public renderContent(): any {
        const item = this.getItem();
        if (!item) {
            return this.renderNoItem();
        }
        return <KeyValueComponent item={item}/>;
    }

    private renderNoItem = () => {
        const customRender = this.getOptions().renderNoItem;
        if (customRender) {
            return customRender(this);
        }
        return AutoCrudDefaults.components.noItem({onAction: () => this.navigateToHome()});
    }

    public getItem = () => {
        return this.getState().__item;
    }

    public getOptions(): DetailsPageOptions {
        return super.getOptions();
    }
}

export default DetailsPage;