import {ProgressIndicator} from "../components/ProgressIndicator/ProgressIndicator";
import React from "react";

export interface IAutoCrudDefaults {
    progressIndicator: () => any;
}

export const AutoCrudDefaults: IAutoCrudDefaults = {
    progressIndicator: () => <ProgressIndicator/>
}