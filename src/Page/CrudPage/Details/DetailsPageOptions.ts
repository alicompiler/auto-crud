import DetailsPage from "./DetailsPage";
import {BasePageOptions} from "../../Base/BaseCrudPage/BasePageOptions";

export interface DetailsPageOptions extends BasePageOptions {
    renderNoItem? : (page : DetailsPage) => any;
}