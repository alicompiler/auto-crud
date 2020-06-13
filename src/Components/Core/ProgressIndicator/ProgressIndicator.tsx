import * as React from "react";
import "./style.css";
import {AutoCrudDefaults} from "../../../Page/AutoCrudDefaults";

interface Props {
    height?: number;
    bgColor?: string;
    progressColor?: string;
}

export function ProgressIndicator(props: Props) {
    const height = props.height ?? AutoCrudDefaults.componentsConfig.progressIndicator.height;
    const bgColor = props.bgColor ?? AutoCrudDefaults.componentsConfig.progressIndicator.bgColor;
    const progressColor = props.progressColor ?? AutoCrudDefaults.componentsConfig.progressIndicator.progressColor;

    return <div className="__progress-bar" style={{backgroundColor: bgColor, height: height}}>
        <div className="__progress-bar-value" style={{backgroundColor: progressColor}}/>
    </div>
}


//many thanks to : https://codepen.io/tmac/pen/QgVRKb