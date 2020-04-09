import CollectionPage from "../../../Page/CollectionPage/CollectionPage";
import * as React from "react";
import {LoadingSpinner} from "../../../UtilsComponents/LoadingSpinner/LoadingSpinner";

interface Props {
    page: CollectionPage;
    className?: string;
    style?: any;
    injectedProps?: any;
}

export default function CollectionPageLoadingComponent(props: Props) {
    const className = props.className ?? 'p-8 flex items-center justify-center text-center rounded bg-white';
    const style = props.style ?? {};
    const injectedProps = props.injectedProps ?? {};
    const page = props.page;
    return <div className={className} style={style} {...injectedProps}>
        <LoadingSpinner/>
        <br/>
        <p className={'text-lg'}>{page.getLocalization().loading_data}</p>
    </div>
}