import ActionMessageComponent from "./ActionMessageComponent";
import React from "react";
import {AutoCrudDefaults} from "../../Defaults/AutoCrudDefaults";

export function ToggleMessageComponent(props: { disabled: boolean, handleToggle: () => any, handleCancel: () => any }) {
    const {disabled, handleCancel, handleToggle} = props;

    return <ActionMessageComponent disabled={disabled}
                                   mainAction={{
                                            className: AutoCrudDefaults.classNames.main_action,
                                            text: AutoCrudDefaults.localization.toggle,
                                            handle: handleToggle
                                        }}
                                   cancelAction={{
                                            className: AutoCrudDefaults.classNames.cancel_action,
                                            text: AutoCrudDefaults.localization.cancel,
                                            handle: handleCancel
                                        }}
                                   message={AutoCrudDefaults.localization.are_you_sure}/>
}