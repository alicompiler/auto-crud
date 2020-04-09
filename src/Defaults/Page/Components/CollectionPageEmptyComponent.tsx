import CollectionPage from "../../../Page/CollectionPage/CollectionPage";
import * as React from "react";

interface Props {
    page: CollectionPage;
    className?: string;
    style?: any;
    injectedProps?: any;
    action?: (page: CollectionPage) => any;
    actionText?: string;
}

export default function CollectionPageEmptyComponent(props: Props) {
    const className = props.className ?? 'p-8 flex items-center justify-center text-center rounded bg-blue-400';
    const style = props.style ?? {};
    const injectedProps = props.injectedProps ?? {};
    const page = props.page;

    return <div className={className} style={style} {...injectedProps}>
        <p className={'text-lg'}>{page.getLocalization().fail_to_fetch_data}</p>
        <br/>
        {
            props.action &&
            <EmptyComponentAction className={'p-4 rounded bg-blue-200 text-black'}
                                  actionText={props.actionText ?? page.getLocalization().try_again}
                                  onAction={() => props.action!(page)}/>
        }
    </div>
}

interface ErrorComponentProps {
    onAction: () => void;
    actionText: string;
    className: string;
}

function EmptyComponentAction(props: ErrorComponentProps) {
    return <button className={props.className} onClick={props.onAction}>
        {props.actionText}
    </button>
}