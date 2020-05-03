import BaseCrudPage from "../../Base/BaseCrudPage";
import {KeyValueComponent} from "react-keyvalue-ui";
import React from "react";

class DetailsPage extends BaseCrudPage {
    public renderContent(): any {
        const item = this.getState().__item ?? {};
        return <KeyValueComponent item={item}/>
    }
}

export default DetailsPage;