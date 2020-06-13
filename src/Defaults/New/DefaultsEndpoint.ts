export interface IDefaultsEndpoint {
    search: (value: string, endpointRoot: string) => string;
}

export const endpointDefaults: IDefaultsEndpoint = {
    search: ((value, endpointRoot) => `${endpointRoot}search?query=${encodeURI(value)}`)
}