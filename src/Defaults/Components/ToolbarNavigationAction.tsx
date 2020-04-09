import React from "react";
import {withRouter} from "react-router-dom";

interface Props {
    buttonClassName?: string;
    text?: string;
    icon?: string;
    navigateTo: string;
    history: any;
    location: any;
    match: any;
}

function ToolbarNavigationAction(props: Props) {
    const buttonClassName: string = props.buttonClassName ?? 'p-2 rounded';
    return <button className={buttonClassName} onClick={() => props.history.push(props.navigateTo)}>
        {
            props.icon && <i className={props.icon}/>
        }
        {
            props.text ?? <span className={'text-lg text-bold'}>{props.text}</span>
        }
    </button>
}

export default withRouter(ToolbarNavigationAction)