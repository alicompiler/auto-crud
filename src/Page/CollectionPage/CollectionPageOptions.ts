import CollectionPage from "./CollectionPage";

export interface CollectionPageOptions {
    refreshButton?: boolean | ((page: CollectionPage) => any);
    renderTotal?: boolean | ((page: CollectionPage) => any);
    collectionContainer: any;
}