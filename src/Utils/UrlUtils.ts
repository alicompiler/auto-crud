export class UrlUtils {

    public static getUrl(endpointRoot: string, url: string | (() => string) | undefined, defaultUrl?: string): string {
        if (typeof url === "string") {
            return `${endpointRoot}${url}`;
        } else if (typeof url === "function") {
            return url();
        }

        if (defaultUrl){
            return defaultUrl;
        }

        return endpointRoot;
    }
}