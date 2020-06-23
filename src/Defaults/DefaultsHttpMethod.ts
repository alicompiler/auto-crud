export type HttpMethod = "get" | "post" | "delete" | "put" | "patch"

export interface IDefaultsHttpMethod {
    collectionRequest: HttpMethod;
    actionPageMethod: HttpMethod;
    formPageMethod : HttpMethod;
    createRequest: HttpMethod,
    updateRequest: HttpMethod,
    deleteRequest: HttpMethod,
}


export const httpMethodDefaults: IDefaultsHttpMethod = {
    collectionRequest : "get",
    actionPageMethod : "post",
    createRequest: "post",
    formPageMethod : "post",
    deleteRequest: "delete",
    updateRequest: "put"
}