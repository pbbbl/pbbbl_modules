export {}
declare global {

    export declare function clean <T>(objectOrArray: T, options?: CleanOptions): Partial<T>;
    export export default clean;
    

    export type CleanOptions = {
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
