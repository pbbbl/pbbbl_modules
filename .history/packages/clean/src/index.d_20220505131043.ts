export declare function clean <T>(object: T, options?: CleanOptions): Partial<T>;

export type CleanOptions = {
    config?: undefined | "default" | "json";
    configId?: undefined | "default" | "json";
    keys?: string[];
    values?: any[],
    isNaN?:boolean;
    isNull?:boolean;
    isUndefined?:boolean;
    isError?:boolean;
    isFunction?:boolean;
    isEmpty?:boolean;
    isEmptyArray?:boolean;
    isEmptyObject?:boolean;
    isEmptyString?:boolean;
    

}
