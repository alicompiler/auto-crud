import React from 'react';
import BaseCrudPage, {BaseCrudPageProps} from "./BaseCrudPage";

class CrudPage<T extends BaseCrudPageProps = BaseCrudPageProps> extends BaseCrudPage<T> {
    protected renderContent(): any {
        return <>
            Crud Page
        </>
    }
}

export default CrudPage;