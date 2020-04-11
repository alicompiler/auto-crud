import React, {Component} from 'react';
import {ContextConfig, CrudContext} from "../../config/CrudContext";

class TitleComponent extends Component {

    render() {
        const title = this.getContext().config.mainTitle;
        const subtitle = this.getContext().state.pageTitle;
        return (
            <div className={'flex p-2'}>
                {
                    title && <h2 className={'text-xl text-gray-700'}>{title}</h2>
                }
                {
                    subtitle && <>
                        {title && <span className={'text-black font-bold text-xl mx-4'}>|</span>}
                        <p className={'text-xl text-gray-500'}>{subtitle}</p>
                    </>
                }
            </div>
        );
    }


    protected getContext = (): ContextConfig => this.context;
}

TitleComponent.contextType = CrudContext;
export default TitleComponent;