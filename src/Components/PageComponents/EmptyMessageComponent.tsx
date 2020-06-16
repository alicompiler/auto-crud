import React from "react";
import {AutoCrudDefaults} from "../../Defaults/AutoCrudDefaults";

interface Props {
    message: string;
    action?: {
        onClick: () => void;
        text: string;
        className?: string;
    }
}

export function EmptyMessageComponent(props: Props) {
    const {message} = props;
    const {action} = props;
    let actionClassName = action?.className ?? AutoCrudDefaults.classNames.components.emptyMessage.action;
    return <div className={AutoCrudDefaults.classNames.components.emptyMessage.wrapper}>
        <p className={AutoCrudDefaults.classNames.components.emptyMessage.message}>{message}</p>
        {
            action &&
            <button onClick={action.onClick} className={actionClassName}>
                {action.text}
            </button>
        }
    </div>;
}