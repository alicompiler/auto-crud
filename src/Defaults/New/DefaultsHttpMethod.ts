export type HttpMethod = "get" | "post" | "delete" | "put" | "patch"

export interface IDefaultsHttpMethod {
    createRequest: HttpMethod,
    updateRequest: HttpMethod,
    deleteRequest: HttpMethod,
}


export const httpMethodDefaults: IDefaultsHttpMethod = {
    createRequest: "post",
    deleteRequest: "delete",
    updateRequest: "put"
}