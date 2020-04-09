import React from 'react';
import CrudPage from "../Page/Base/CrudPage";

class CrudIndexPage extends CrudPage {
    renderContent() {
        return (
            <>
                THIS IS INDEX PAGE
                <br/>
                <button onClick={() => this.props.history.push(this.pageConfigUtils.getRouteForPage('create'))}>
                    CREATE
                </button>
                <br/>
                <button onClick={() => this.props.history.push(this.pageConfigUtils.getRouteForPage('edit'))}>
                    EDIT
                </button>
                <br/>
                <button onClick={() => this.props.history.push(this.pageConfigUtils.getRouteForPage('delete'))}>
                    DELETE
                </button>
                <br/>
            </>
        );
    }

}

export default CrudIndexPage;