import {BasePageOptions} from "../../PageConfig";
import DetailsPage from "./DetailsPage";

export interface DetailsPageOptions extends BasePageOptions {
    renderNoItem? : (page : DetailsPage) => any;
}