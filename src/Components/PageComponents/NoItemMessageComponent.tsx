import React from "react";
import {SingleActionMessage} from "./SingleActionMessage";
import {AutoCrudDefaults} from "../../Defaults/AutoCrudDefaults";

interface Props {
    message: string;
    onAction: () => void;
}

export function NoItemMessageComponent(props: Props) {
    return <SingleActionMessage message={props.message}
                                actionClassName={AutoCrudDefaults.classNames.components.noItemComponent.action}
                                actionText={AutoCrudDefaults.localization.main}
                                onAction={props.onAction}
                                wrapperClassName={AutoCrudDefaults.classNames.components.noItemComponent.wrapper}/>;
}