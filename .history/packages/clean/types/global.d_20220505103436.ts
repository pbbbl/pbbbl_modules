export {}
declare global {
    declare function clean<T>(objectOrArray: T, cleanOptions?: CleanOptions): Partial<T>;
    export default clean;
    type CleanOptions = {
        keys?: string|string[];
        values?: string|string[];
        preset?: "json" | "firestore";
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
