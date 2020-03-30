import React, {Component} from 'react';

interface Props {
    name: string;
    renderContent: (passedState: any, handleClose: any, name: string) => React.ReactNode | null;

    wrapper?: (content: any, props: Props) => any;
    dimmerWrapper?: ((content: any, props: Props) => any) | false;
    panelWrapper?: ((content: any, props: Props) => any) | false;

    closeOnOutsideClick?: boolean;
    closeOnEscape?: boolean;

    closeButton?: ((handleClose: any, props: Props) => any) | false;
    closeButtonPosition?: "top" | "bottom" | "none"

    open: boolean;

    passedState: any;

    handleClose: () => void;
}

export class Modal extends Component<Props> {


    static defaultProps: Partial<Props> = {
        closeOnOutsideClick: true,
        closeOnEscape: true,
        closeButtonPosition: "top"
    };

    render() {

        if (!this.props.open) {
            return null;
        }

        let content = this.props.renderContent(this.props.passedState ?? {}, this.handleClose, this.props.name);

        if (this.props.panelWrapper === undefined) {
            content = this.wrapInPanel(content);
        } else if (this.props.panelWrapper) {
            content = this.props.panelWrapper(content, this.props);
        }

        if (this.props.dimmerWrapper === undefined) {
            content = this.wrapInDimmer(content);
        } else if (this.props.dimmerWrapper) {
            content = this.props.dimmerWrapper(content, this.props);
        }

        if (this.props.wrapper) {
            content = this.props.wrapper(content, this.props);
        }

        return content;
    }

    private handleClose = () => {
        this.props.handleClose();
    };

    private wrapInDimmer = (content: any) => {

        let closeButton = null;
        if (this.props.closeButton === undefined || this.props.closeButton) {
            closeButton = this.closeButton();
        }

        return <div onClick={() => this.props.closeOnOutsideClick && this.handleClose()}
                    onKeyUp={e => e.key === "Esc" && this.props.closeOnEscape && this.handleClose()}
                    className="p-8 box-content animated fadeIn flex items-center fixed justify-center w-full h-screen z-50 inset-0 overflow-auto bg-smoke-dark">
            <div className={'flex items-center flex-col justify-center'}>
                {this.props.closeButtonPosition === "top" && closeButton}
                {content}
                {this.props.closeButtonPosition === "bottom" && closeButton}
            </div>
        </div>;
    };

    private closeButton = () => {
        return <svg className="h-12 w-12 fill-current text-white hover:text-gray-500" role="button"
                    onClick={this.handleClose}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
        </svg>
    };

    private wrapInPanel = (content: any) => {
        return <div onClick={e => e.stopPropagation()}
                    className="animated fadeInUp shadow-inner bottom-0 inset-x-0 align-top m-auto p-8 bg-white rounded w-full h-auto shadow flex flex-col">
            {
                content
            }
        </div>
    }


}