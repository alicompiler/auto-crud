import React from "react";

interface Props {
    message: string;
    action?: {
        onClick: () => void;
        text: string;
        className?: string;
    }
}

export function SuccessMessageComponent(props: Props) {
    const {message} = props;
    const {action} = props;
    return <div className={'p-4 bg-teal-400 text-white flex items-center flex-col justify-center'}>
        <p className={'text-xl'}>{message}</p>
        {
            action &&
            <button onClick={action.onClick}
                    className={action.className ?? 'rounded mt-2 text-black bg-teal-300 px-4 py-2'}>
                {action.text}
            </button>
        }
    </div>
}