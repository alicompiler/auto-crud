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

export function ErrorMessageComponent(props: Props) {
    const {message} = props;
    const {action} = props;
    let actionClassName = action?.className ?? AutoCrudDefaults.classNames.components.errorMessage.action;
    return <div className={AutoCrudDefaults.classNames.components.errorMessage.wrapper}>
        <p className={'text-xl'}>{message}</p>
        {
            action &&
            <button onClick={action.onClick} className={actionClassName}>
                {action.text}
            </button>
        }
    </div>;
}