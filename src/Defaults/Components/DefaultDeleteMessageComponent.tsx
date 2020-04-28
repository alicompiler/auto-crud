import MessageWithActionsComponent from "../../Components/MessageWithActionsComponent/MessageWithActionsComponent";
import React from "react";
import {AutoCrudDefaults} from "../../Page/AutoCrudDefaults";

export function DefaultDeleteMessageComponent(props: { disabled: boolean, handleDelete: () => any, handleCancel: () => any }) {
    const {disabled, handleCancel, handleDelete} = props;
    return <MessageWithActionsComponent disabled={disabled}
                                        mainAction={{
                                            className: AutoCrudDefaults.classNames.delete_action,
                                            text: AutoCrudDefaults.localization.delete,
                                            handle: handleDelete
                                        }}
                                        cancelAction={{
                                            text: AutoCrudDefaults.localization.cancel,
                                            handle: handleCancel
                                        }}
                                        message={AutoCrudDefaults.localization.are_you_sure_of_delete}/>
}