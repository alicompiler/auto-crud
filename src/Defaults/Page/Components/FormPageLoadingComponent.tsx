import * as React from "react";
import {LoadingSpinner} from "../../../Components/LoadingSpinner/LoadingSpinner";
import FormPage from "../../../Page/FormPage/FormPage";

interface Props {
    page: FormPage;
    className?: string;
    style?: any;
    injectedProps?: any;
}

export default function FormPageLoadingComponent(props: Props) {
    const className = props.className ?? 'p-8 flex flex-col items-center justify-center text-center rounded bg-white';
    const style = props.style ?? {};
    const injectedProps = props.injectedProps ?? {};
    const page = props.page;
    return <div className={className} style={style} {...injectedProps}>
        <LoadingSpinner/>
        <br/>
        <p className={'text-lg'}>{page.getLocalizations().loading_message}</p>
    </div>
}