import React, {Component} from 'react';
import {AutoCrudDefaults} from "../../Defaults/AutoCrudDefaults";


interface Props {
    message: string;
    wrapperClassName?: string;
    disabled: boolean;

    mainAction: {
        text: string;
        handle: () => void;
        className?: string;
    };

    cancelAction?: {
        text?: string;
        handle: () => void;
        className?: string;
    }
}

class ActionMessageComponent extends Component<Props> {
    render() {
        const {message, wrapperClassName, disabled, cancelAction, mainAction} = this.props;

        return (
            <div className={wrapperClassName ?? ''}>

                <p className={AutoCrudDefaults.classNames.components.messageWithActions.message}>{message}</p>

                <button disabled={disabled} onClick={mainAction.handle}
                        className={mainAction.className ?? AutoCrudDefaults.classNames.main_action}>{mainAction.text}</button>

                <span className={'h-px inline-block w-2 px-4'}/>

                {
                    cancelAction &&
                    <button disabled={disabled} onClick={cancelAction.handle}
                            className={cancelAction.className ?? AutoCrudDefaults.classNames.cancel_action}>
                        {cancelAction.text ?? AutoCrudDefaults.localization.cancel}
                    </button>
                }

            </div>
        );
    }
}

export default ActionMessageComponent;