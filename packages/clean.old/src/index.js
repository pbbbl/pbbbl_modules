const is = require("is");

/**
 * Module dependencies.
 */

const isEmpty = require("lodash.isempty");
const isPlainObject = require("lodash.isplainobject");
const transform = require("lodash.transform");

/**
 * Export `clean` function.
 */
const defaultOptions = {
    cleanKeys: [],
    cleanValues: [],
    emptyArrays: true,
    emptyObjects: true,
    emptyStrings: true,
    functions: true,
    NaNValues: true,
    nullValues: true,
    undefinedValues: true,
    configId: null
};
const configs = {
    _default: { ...defaultOptions },
    json: {
        cleanKeys: [],
        cleanValues: [],
        emptyArrays: false,
        emptyObjects: false,
        emptyStrings: false,
        functions: true,
        NaNValues: true,
        nullValues: true,
        undefinedValues: true,
        configId: "json",
    },
};
/**
    function clean(dataToClean:{[x:string]:any}, options:{
        
        cleanKeys: string[] | undefined;  
        cleanValues: string[] | undefined; 
        emptyArrays: boolean | undefined; 
        emptyObjects: boolean | undefined; 
        emptyStrings: boolean | undefined; 
        functions: boolean | undefined; 
        NaNValues: boolean | undefined; 
        nullValues: boolean | undefined; 
        undefinedValues: boolean | undefined; 

        configId: string | null | undefined;

    }):Object|null; 
 */
const clean = (dataToClean, options)=>{
    const object = dataToClean;
    options = options ? options : { ...defaultOptions, configId: "_default" };
    const configId = options.configId;
    const config = is.undefined(configs[configId]) ? configs._default : configs[configId];
    options = {
        ...defaultOptions,
        ...config,
        ...options,
    };
    let { cleanKeys, cleanValues, emptyArrays, emptyObjects, emptyStrings, functions, NaNValues, nullValues, undefinedValues } = options;

    // console.log({ configId: options.configId, config });

    return transform(object, (result, value, key) => {
        // Exclude specific keys.

        if (cleanKeys.includes(key)) {
            return;
        }

        // Recurse into arrays and objects.
        if (is.array(value) || (is.object(value) && !is.nil(value))) {
            value = clean(value, options);
        }

        // Exclude specific values.
        if (cleanValues.includes(value)) {
            return;
        }

        // Exclude empty objects.
        // console.log({ emptyObjects, isPlainObject: isPlainObject(value), isEmpty: isEmpty(value) });
        if (emptyObjects && isPlainObject(value) && isEmpty(value)) {
            // console.log("emptyObjects", { value });
            return;
        }

        // Exclude empty arrays.
        if (emptyArrays && is.array(value) && (is.empty(value) || is.array.empty(value))) {
            return;
        }

        if (emptyStrings && isEmptyString(value)) {
            return;
        }

        // Exclude NaN values.
        if (NaNValues && Number.isNaN(value)) {
            // console.log("NaNValues", { value });
            return;
        }

        // Exclude functions.
        if (functions && typeof value == "function") {
            // console.log("functions", { value });
            return;
        }

        // Exclude null values.
        if (nullValues && value === null) {
            // console.log("nullValues", { value });
            return;
        }

        // Exclude undefined values.
        if (undefinedValues && value === undefined) {
            // console.log("undefined", { value: value || undefined });
            return;
        }

        // Append when recursing arrays.
        if (Array.isArray(result)) {
            // console.log("append recursive array", { value });
            return result.push(value);
        }

        result[key] = value;
    });
};

function isEmptyString(value) {
    const str = is.string(value) ? `${value}` : false;
    return str ? is.empty(str) || is.empty(str.replace(/\s/g, "")) : false;
}

// input
var cleanExport = function f(dataToClean, options) {
    return clean(dataToClean, options);
};
cleanExport.clean = clean;

module.exports = cleanExport;


// function isEmptyObject(obj=null){
//     if(typeof obj !== 'object'){
//         return false;
//     }
//     if(obj===null){
//         return false;
//     }
//     if(is.array(obj)){
//         return false;
//     }
//     try {
//         const keys = Object.keys(obj);
//         if(!keys || !(keys.length>0)){
//             return true;
//         } else {
//             return false;

//         }
//     } catch {
//         return false;
//     }

// }
// function isEmptyArray(arr=[]){
//     if(is.array(arr)){
//         if(is.array.empty(arr)){
//             return true;
//         }
//     }
// }
