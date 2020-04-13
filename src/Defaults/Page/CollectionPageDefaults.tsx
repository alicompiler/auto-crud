import CollectionPage from "../../Page/CollectionPage/CollectionPage";
import CollectionPageLoadingComponent from "./Components/CollectionPageLoadingComponent";
import React from "react";
import CollectionPageErrorComponent from "./Components/CollectionPageErrorComponent";
import CollectionPageEmptyComponent from "./Components/CollectionPageEmptyComponent";

interface CollectionPageDefault {
    renderLoading: ((page: CollectionPage) => any) | undefined;
    renderError: ((page: CollectionPage) => any) | undefined;
    renderEmpty: ((page: CollectionPage) => any) | undefined;
    localization: {
        loading_data: string,
        fail_to_fetch_data: string,
        data_empty: string,
        try_again: string,
        search : string;
    },
    renderOptionsConfig: any;
}

export const CollectionPageDefaults: CollectionPageDefault = {
    renderLoading: page => <CollectionPageLoadingComponent page={page}/>,
    renderError: page => <CollectionPageErrorComponent page={page} action={page => page.restart()}/>,
    renderEmpty: page => <CollectionPageEmptyComponent page={page} action={page => page.restart()}/>,
    localization: {
        data_empty: 'Data Empty',
        fail_to_fetch_data: 'Fail To Fetch Data',
        loading_data: 'Loading Data...',
        try_again: 'Try Again',
        search : 'Search'
    },
    renderOptionsConfig: {
        collectionClassName: 'table-auto w-full',
        headerRowClassName: 'bg-gray-200 text-gray-700',
        rowClassName: 'border border-gray-200',
        cellClassName: 'p-2',
        headerCellClassName: 'p-2 text-lg border border-gray-100'
    }
};