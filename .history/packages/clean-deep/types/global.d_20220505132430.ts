export {}
declare global {

    declare function clean <T>(valueToClean?: T, options?: CleanOptions): Partial<T>;
    export default clean;
    

    type CleanOptions = {
        config?: undefined | "default" | "json"|"firestore";
        configId?: undefined | "default" | "json"|"firestore";
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
}    
