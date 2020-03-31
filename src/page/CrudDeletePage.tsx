import React from 'react';
import CrudPage from "./CrudPage";

class CrudDeletePage extends CrudPage {
    protected renderContent(): any {
        return <>
            Delete Crud Page
            TODO : SHOULD DISPLAY DELETE FORM FROM CONFIG (PAGE OPTIONS)
        </>
    }
}

export default CrudDeletePage;