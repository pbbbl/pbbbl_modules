export {}
declare global {
    export declare function clean<T>(objectOrArray: T, cleanOptions?: CleanOptions): Partial<T>;
    export export default clean;
    export type CleanOptions = {
        keys?: string|string[];
        values?: string|string[];
        preset?:  "default"|"json" | "firestore";
        isEmpty?: boolean;
        isEmptyArray?: boolean;
        isEmptyObject?: boolean;
        isEmptyString?: boolean;
        isNaN?: boolean;
        isCallable?: boolean,
        isNull?: boolean;
        isUndefined?: boolean;
    };

}
//# sourceMappingURL=global.d.ts.map
