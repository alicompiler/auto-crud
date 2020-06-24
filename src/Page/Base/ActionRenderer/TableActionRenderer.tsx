import {ActionPair, BaseActionRenderer} from "./BaseActionRenderer";
import {ActionConfig} from "./ActionConfig";

export class TableActionRenderer extends BaseActionRenderer {
    protected getHighOrderRender(action: ActionConfig): any {
        return action.renderInTable;
    }

    protected shouldBeHidden(action: ActionPair): boolean {
        if (action.action.hideInTable === undefined) {
            return false;
        }
        return action.action.hideInTable;
    }
}