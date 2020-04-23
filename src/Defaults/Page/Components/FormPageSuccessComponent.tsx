import * as React from "react";
import FormPage from "../../../Page/FormPage/FormPage";

interface Props {
    page: FormPage;
    className?: string;
    style?: any;
    injectedProps?: any;
}

export default function FormPageSuccessComponent(props: Props) {
    const className = props.className ?? 'p-8 flex items-center justify-center text-center rounded bg-teal-400';
    const style = props.style ?? {};
    const injectedProps = props.injectedProps ?? {};
    const page = props.page;

    return <div className={className} style={style} {...injectedProps}>
        <p className={'text-xl text-center'}>{page.getLocalizations().success_message}</p>
    </div>
}