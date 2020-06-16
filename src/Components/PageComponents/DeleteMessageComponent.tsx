import ActionMessageComponent from "./ActionMessageComponent";
import React from "react";
import {AutoCrudDefaults} from "../../Defaults/AutoCrudDefaults";

export function DeleteMessageComponent(props: { disabled: boolean, handleDelete: () => any, handleCancel: () => any }) {
    const {disabled, handleCancel, handleDelete} = props;

    return <ActionMessageComponent disabled={disabled}
                                   mainAction={{
                                            className: AutoCrudDefaults.classNames.delete_action,
                                            text: AutoCrudDefaults.localization.delete,
                                            handle: handleDelete
                                        }}
                                   cancelAction={{
                                            className: AutoCrudDefaults.classNames.cancel_action,
                                            text: AutoCrudDefaults.localization.cancel,
                                            handle: handleCancel
                                        }}
                                   message={AutoCrudDefaults.localization.are_you_sure_of_delete}/>
}