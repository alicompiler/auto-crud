import React from "react";
import {SingleActionMessage} from "./SingleActionMessage";
import {AutoCrudDefaults} from "../../Page/AutoCrudDefaults";

interface Props {
    message: string;
    actionText: string;
    onAction: () => void;
    actionClassName?: string;
}

export function SuccessMessageComponent(props: Props) {
    const actionClassName = props.actionClassName ?? AutoCrudDefaults.classNames.components.successMessage.action;
    return <SingleActionMessage message={props.message}
                                wrapperClassName={AutoCrudDefaults.classNames.components.successMessage.wrapper}
                                actionClassName={actionClassName}
                                actionText={props.actionText}
                                onAction={props.onAction}/>
}