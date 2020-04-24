import React from "react";
import {withRouter} from "react-router-dom";
import {CrudContext, CrudContextValue} from "../../Root/CrudContext";
import {PageConfig} from "../../Page/PageConfig";
import PageConfigUtils from "../../Page/Base/PageConfigUtils";

class DefaultActionColumn extends React.Component<any> {
    render(): React.ReactNode {
        return <CrudContext.Consumer>
            {
                (value: CrudContextValue) => {
                    const detailsPage = value.config.detailsPage!;
                    const updatePage = value.config.updatePage!;
                    const deletePage = value.config.deletePage!;


                    return <td className={'p-2 flex justify-end items-center'}>
                        {
                            (!detailsPage.skip) &&
                            <button
                                className={'inline-flex items-center justify-center bg-blue-400 px-4 py-2 rounded w-16 text-white'}
                                onClick={() => this.navigateCallback(value, detailsPage)}>
                                <i className={'fas fa-info text-xl'}/>
                            </button>
                        }
                        <span className={'w-4 h-px inline-block'}/>
                        {
                            (!updatePage.skip) &&
                            <button
                                className={'inline-flex items-center justify-center bg-yellow-400 px-4 py-2 rounded w-16 text-white'}
                                onClick={() => this.navigateCallback(value, updatePage)}>
                                <i className={'fas fa-pen text-xl'}/>
                            </button>
                        }
                        <span className={'w-4 h-px inline-block'}/>
                        {
                            (!deletePage.skip) &&
                            <button
                                className={'inline-flex items-center justify-center bg-red-400 px-4 py-2 rounded w-16 text-white'}
                                onClick={() => this.navigateCallback(value, deletePage)}>
                                <i className={'fas fa-trash text-xl'}/>
                            </button>
                        }
                    </td>

                }
            }
        </CrudContext.Consumer>
    }

    private navigateCallback = (context: CrudContextValue, page: PageConfig) => {
        const pageUtils = new PageConfigUtils(context);
        pageUtils.updatePageState(page.name!, {__item: this.props.item});
        this.props.history.push(page.route!);
    }

    private static getPageRoute(page: PageConfig): string | false {
        if (page.skip)
            return false;
        return page.route!;
    }

}


export default withRouter(DefaultActionColumn);