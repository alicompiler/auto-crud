import BaseCrudPage from "../../Base/BaseCrudPage/BaseCrudPage";
import {KeyValueComponent} from "react-keyvalue-ui";
import React from "react";
import {DetailsPageOptions} from "./DetailsPageOptions";
import {AutoCrudDefaults} from "../../../Defaults/AutoCrudDefaults";
import {PageActionRenderer} from "../../Base/ActionRenderer/PageActionRenderer";

class DetailsPage extends BaseCrudPage {
    public renderContent(): any {
        const item = this.getItem();
        if (!item) {
            return this.renderNoItem();
        }


        return <div>

            {this.renderActions()}

            <KeyValueComponent item={item}/>

        </div>;
    }

    private renderActions = () => {
        const actionRenderer = new PageActionRenderer(this.getContext(), this.getItem(), this.props.history.push, ["details"]);
        return <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                {actionRenderer.render()}
            </div>
            <div className={AutoCrudDefaults.classNames.divider}/>
        </div>
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