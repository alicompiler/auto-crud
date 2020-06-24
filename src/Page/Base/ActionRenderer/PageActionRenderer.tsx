import {ActionPair, BaseActionRenderer} from "./BaseActionRenderer";
import {CrudContextValue} from "../../../Root/CrudContext";
import {ActionConfig} from "./ActionConfig";

export class PageActionRenderer extends BaseActionRenderer {
    private readonly skip: string[];

    constructor(context: CrudContextValue, item: any, push: (location: any) => void, skip: string[] = []) {
        super(context, item, push);
        this.skip = skip;
    }

    protected getHighOrderRender(action: ActionConfig): any {
        return action.renderInPage;
    }

    protected filterAndOrder(actionPair: ActionPair[]): ActionPair[] {
        return actionPair.filter(a => !this.skip.includes(a.page.name!));
    }

    protected shouldBeHidden(action: ActionPair): boolean {
        if (action.action.hideInPage === undefined) {
            return false;
        }
        return action.action.hideInPage;
    }
}