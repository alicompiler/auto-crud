import React from 'react';
import CrudPage from "./CrudPage";

class CrudCreatePage extends CrudPage {
    protected renderContent(): any {
        return <>
            Create Crud Page
            TODO : SHOULD DISPLAY CREATE FORM FROM CONFIG (PAGE OPTIONS)
        </>
    }
}

export default CrudCreatePage;