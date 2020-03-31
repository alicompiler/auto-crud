import React from 'react';
import BaseCrudPage from "./BaseCrudPage";

class CrudPage extends BaseCrudPage {
    protected renderContent(): any {
        return <>
            Crud Page
        </>
    }
}

export default CrudPage;