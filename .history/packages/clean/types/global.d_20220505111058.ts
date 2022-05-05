export {}
declare global {
    export declare function clean<T>(objectOrArray: T, cleanOptions?: CleanOptions): Partial<T>;
    export export default clean;
    export type CleanOptions = {
        preset?:  "default"|"json" | "firestore";
        keys?: string|string[];
        values?: string|string[];
        // isEmpty?: boolean;
        // isEmptyArray?: boolean;
        // isEmptyObject?: boolean;
        // isEmptyString?: boolean;
        // isNaN?: boolean;
        // isCallable?: boolean,
        // isUndefined?: boolean;
        // is options
        // isCircular?: boolean;
        isJson?: boolean;
        isA?: boolean;
        isType?: boolean;
        isDefined?: boolean;
        isEmpty?: boolean;
        isEqual?: boolean;
        isHosted?: boolean;
        isInstance?: boolean;
        isInstanceof?: boolean;
        isNil?: boolean;
        isNull?: boolean;
        isUndef?: boolean;
        isUndefined?: boolean;
        isArgs?: boolean;
        isArguments?: boolean;
        isArgsEmpty?: boolean;
        isArray?: boolean;
        isArrayEmpty?: boolean;
        isEmptyArray?: boolean;
        isArraylike?: boolean;
        isBool?: boolean;
        isBoolean?: boolean;
        isFalse?: boolean;
        isTrue?: boolean;
        isDate?: boolean;
        isElement?: boolean;
        isError?: boolean;
        isFn?: boolean;
        isFunction?: boolean;
        isNumber?: boolean;
        isInfinite?: boolean;
        isDecimal?: boolean;
        isDivisibleBy?: boolean;
        isInteger?: boolean;
        isInt?: boolean;
        isMaximum?: boolean;
        isMaximum?: boolean;
        isMinimum?: boolean;
        isNan?: boolean;
        isEven?: boolean;
        isOdd?: boolean;
        isGe?: boolean;
        isGt?: boolean;
        isLe?: boolean;
        isLt?: boolean;
        isWithin?: boolean;
        isObject?: boolean;
        isObjectEmpty?: boolean;
        isEmptyObject?: boolean;
        isRegexp?: boolean;
        isString?: boolean;
        isEmptyString?: boolean;
        isStringEmpty?: boolean;
        isBase64?: boolean;
        isHex?: boolean;
        isSymbol?: boolean;
        isBigint?: boolean;


        
        
        isString?: boolean;
        isBoolean?: boolean;
        isNumber?: boolean;
        isObject?: boolean;
        isArray?: boolean;
        isUndefined?: boolean;
        isEmpty?: boolean;
        isEmptyArray?: boolean;
        isEmptyObject?: boolean;
        isEmptyString?: boolean;
        isNaN?: boolean;
        isUndefined?: boolean;

    };

}
//# sourceMappingURL=global.d.ts.map



/*

isA = is.a,                                                         // (value, type):
isType = is.type,                                                   // (value, type:
isDefined = is.defined,                                             // (value)
isEmpty = is.empty,                                                 // (value)
isEqual = is.equal,                                                 // (value, other:
isHosted = is.hosted,                                               // (value, host:
isInstance = is.instance,                                           // (value, constructor)
isInstanceof = is.instance,                                         // (value, constructor)
isNil = is.nil,                                                     // (value)
isNull = is.nil,                                                    // (value)
isUndef = is.undef,                                                 // (value)
isUndefined = is.undef,                                             // (value)
isArgs = is.args,                                                   // (value)
isArguments = is.args,                                              // (value)
isArgsEmpty = is.args.empty                                                 mpty // (value)
isArray = is.array,                                                 // (value)
isArrayEmpty = is.array.empty                                               mpty // (value)
isEmptyArray = is.array.empty                                               mpty // (value)
isArraylike = is.arraylike,                                         // (value)
isBool = is.bool,                                                   // (value)
isBoolean = is.bool,                                             // (value)
isFalse = is.false,                                                 // (value)
isTrue = is.true,                                                   // (value)
isDate = is.date,                                                   // (value)
isElement = is.element,                                             // (value)
isError = is.error,                                                 // (value)
isFn = is.fn,                                                       // (value)
isFunction = is.fn,                                           // (value)
isNumber = is.number,                                               // (value)
isInfinite = is.infinite,                                           // (value)
isDecimal = is.decimal,                                             // (value)
isDivisibleBy = is.divisibleBy,                                     // (value, n:
isInteger = is.int,                                             // (value)
isInt = is.int,                                                     // (value)
isMaximum = is.maximum,                                             // (value, others:
isMaximum = is.max,                                             // (value, others:
isMinimum = is.min,                                             // (value, others:
isNan = is.nan,                                                     // (value)
isEven = is.even,                                                   // (value)
isOdd = is.odd,                                                     // (value)
isGe = is.ge,                                                       // (value, other:
isGt = is.gt,                                                       // (value, other:
isLe = is.le,                                                       // (value, other:
isLt = is.lt,                                                       // (value, other:
isWithin = is.within,                                               // (value, start, finish:
isObject = is.object,                                               // (value)
isObjectEmpty = isEmptyObject,                                               // (value)
isEmptyObject = isEmptyObject,                                               // (value)
isRegexp = is.regexp,                                               // (value)
isString = is.string,                                               // (value)
isEmptyString = isEmptyString,                                               // (value)
isStringEmpty = isEmptyString,                                               // (value)
isBase64 = is.base64,                                               // (value)
isHex = is.hex,                                                     // (value)
isSymbol = is.symbol,                                               // (value)
isBigint = is.bigint,                                               // (value)










arguments



array



boolean




date

element

error

function


number
















object

regexp

string

encoded binary





*/
