export type HttpMethod = "get" | "post" | "delete" | "put" | "patch"

export interface IDefaultsHttpMethod {
    actionPageMethod: HttpMethod;
    createRequest: HttpMethod,
    updateRequest: HttpMethod,
    deleteRequest: HttpMethod,
}


export const httpMethodDefaults: IDefaultsHttpMethod = {
    actionPageMethod : "post",
    createRequest: "post",
    deleteRequest: "delete",
    updateRequest: "put"
}