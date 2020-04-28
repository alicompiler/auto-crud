import React from "react";

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
    return <div className={'p-4 bg-red-400 text-white flex items-center flex-col justify-center'}>
        <p className={'text-xl'}>{message}</p>
        {
            action &&
            <button onClick={action.onClick} className={action.className ?? 'rounded bg-red-200 px-4 py-2'}>
                {action.text}
            </button>
        }
    </div>
}