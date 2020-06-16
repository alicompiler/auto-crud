import React from "react";
import {AutoCrudDefaults} from "../../Defaults/AutoCrudDefaults";

interface Props {
    message: string;
    wrapperClassName: string;
    actionClassName: string;
    actionText: string;
    onAction: () => void;

}

export function SingleActionMessage(props: Props) {
    return <div className={props.wrapperClassName}>
        <p className={AutoCrudDefaults.classNames.components.singleActionMessage.message}>{props.message}</p>
        <button onClick={props.onAction} className={props.actionClassName}>
            {props.actionText}
        </button>
    </div>
}