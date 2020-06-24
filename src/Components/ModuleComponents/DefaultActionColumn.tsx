import React from "react";
import {withRouter} from "react-router-dom";
import {TableActionRenderer} from "../../Page/Base/ActionRenderer/TableActionRenderer";


class DefaultActionColumn extends React.Component<any> {

    render() {
        const renderer = new TableActionRenderer(this.props.context, this.props.item, this.props.history.push);
        const actions = renderer.render();
        return <td className={'p-2 flex justify-end items-center'}>
            {actions}
        </td>
    }

}


export default withRouter(DefaultActionColumn);