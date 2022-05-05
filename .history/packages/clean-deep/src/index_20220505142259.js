
const transform = require('lodash.transform');
const {isDefined,isString,isUndefined,isObject,isArray,isEmptyString,isEmptyArray,isEmptyObject,isNull,isNaN, isActualNaN} = require('@pbbbl/is');
const configs = createConfigs();
const defaultOptions = configs._default;
function clean(valueToClean, options={...defaultOptions}){
    if(!options){
        options = {...defaultOptions};
    } else {
        options = createOptions(options);
    }
    if(options.isUndefined && isUndefined(valueToClean)){
        return;
    }
    let object = isUndefined(valueToClean) ? undefined : valueToClean;

    const config = options;


    return transform(object, (result, value, key) => {
        // Exclude specific keys.
        const keys = isDefined(config.keys) && config.keys && !isEmptyArray(config.keys) ? config.keys : false;
        if (keys && config.keys.includes(key)) {
            return;
        }
        const values = isDefined(config.values) && config.values && !isEmptyArray(config.values) ? config.values : false;
        // Exclude specific values.
        if (values && config.values.includes(value)) {
            return;
        }

        // Recurse into arrays and objects.
        if (isArray(value) && !isEmptyArray(value) || (isObject(value) && !isEmptyObject(value) && !isNull(value))) {
            value = clean(value, options);
        }

        const emptyValues = isDefined(config.isEmpty);

        // Exclude empty objects.
        // console.log({ emptyObjects, isPlainObject: isPlainObject(value), isEmpty: isEmpty(value) });
        const emptyObjects = emptyValues || (isDefined(config.isEmptyObject) && config.isEmptyObject===true);
        if (isObject(value) && emptyObjects && isEmptyObject(value)) {
            // console.log("emptyObjects", { value });
            return;
        }
        // // Exclude empty arrays.
        const emptyArrays = emptyValues || (isDefined(config.isEmptyArray) && config.isEmptyArray===true);
        if (isArray(value) && emptyArrays && isEmptyArray(value)) {
            // console.log("emptyObjects", { value });
            return;
        }
        // if (config.isEmptyArray && is.array(value) && (is.empty(value) || is.array.empty(value))) {
        //     return;
        // }
        const emptyStrings = emptyValues || (isDefined(config.isEmptyString) && config.isEmptyString===true);
        if (isString(value) && emptyStrings && isEmptyString(value)) {
            return;
        }

        // Exclude NaN values.
        const NaNValues = (isDefined(config.isNaN) && config.isNaN===true);
        if (NaNValues && isNaN(value)) {
            return;
        }

        // Exclude functions.
        const functions = (isDefined(config.isFunction) && config.isFunction===true);
        if (functions && typeof value == "function") {
            // console.log("functions", { value });
            return;
        }

        // Exclude null values.
        const nullValues = (isDefined(config.isNull) && config.isNull===true);
        if (nullValues && value === null) {
            // console.log("nullValues", { value });
            return;
        }

        // Exclude undefined values.
        const undefinedValues = (isDefined(config.isUndefined) && config.isUndefined===true);
        if (undefinedValues && value === undefined) {
            // console.log("undefined", { value: value || undefined });
            return;
        }

        // Append when recursing arrays.

        if (isArray(result)) {
            // console.log("append recursive array", { value });
            return result.push(value);
        }

        result[key] = value;
    });
};
function createConfigs(){
    return  {
        firestore: {
          config: 'firestore', //config?: undefined | "default" | "json";
          configId: 'firestore', //configId?: undefined | "default" | "json";
          keys: [], //keys?: string[];
          values: [], //values?: any[],
          isNaN: true, //isNaN?:boolean;
          isNull: false, //isNull?:boolean;
          isUndefined: true, //isUndefined?:boolean;
          isError: true, //isError?:boolean;
          isFunction: true, //isFunction?:boolean;
          isEmpty: false, //isEmpty?:boolean;
          isEmptyArray: false, //isEmptyArray?:boolean;
          isEmptyObject: false, //isEmptyObject?:boolean;
          isEmptyString: false, //isEmptyString?:boolean;
        },
        _default: {
          config: 'default', //config?: undefined | "default" | "json";
          configId: 'default', //configId?: undefined | "default" | "json";
          keys: [], //keys?: string[];
          values: [], //values?: any[],
          isNaN: true, //isNaN?:boolean;
          isNull: false, //isNull?:boolean;
          isUndefined: true, //isUndefined?:boolean;
          isError: true, //isError?:boolean;
          isFunction: true, //isFunction?:boolean;
          isEmpty: false, //isEmpty?:boolean;
          isEmptyArray: false, //isEmptyArray?:boolean;
          isEmptyObject: false, //isEmptyObject?:boolean;
          isEmptyString: false, //isEmptyString?:boolean;
        },
        json: {
          config: 'json', //config?: undefined | "default" | "json";
          configId: 'json', //configId?: undefined | "default" | "json";
          keys: [], //keys?: string[];
          values: [], //values?: any[],
          isNaN: true, //isNaN?:boolean;
          isNull: true, //isNull?:boolean;
          isUndefined: true, //isUndefined?:boolean;
          isError: true, //isError?:boolean;
          isFunction: true, //isFunction?:boolean;
          isEmpty: false, //isEmpty?:boolean;
          isEmptyArray: false, //isEmptyArray?:boolean;
          isEmptyObject: false, //isEmptyObject?:boolean;
          isEmptyString: false, //isEmptyString?:boolean;
        },
      }
}
function createOptions (config=configs._default){
    let output = {...configs._default,...config};
    if(typeof config.config == 'string'){
        switch(config.config){
            case 'json':
                output= configs.json;
                break;
            case 'firestore':
                output= configs.firestore;
                break;
            default:
                output= configs._default;
                break;
        }
        // return output;
    } 
        Object.keys(defaultOptions).forEach(key=>{
            if(typeof config[key] !== 'undefined' && typeof config[key] === typeof defaultOptions[key]){
                output[key] = config[key];
            } else {
                output[key] = defaultOptions[key];
            }
        })

        if(typeof config.values === 'object' && Array.isArray(config.values)){
            if(!(config.values?.length > 0)){
                delete output.values;
            }
        }

        if(typeof config.keys === 'object' && Array.isArray(config.keys)){
            if(!(config.keys?.length > 0)){
                delete output.keys;
            }
        }
        return output;
}
// 
// 
// 
// EXPORT
module.exports = clean;

// 
// 
// 
// 
console.log({
    clean
})
try {

const tests = {
    cleanNaN: clean({
        removed:'1',
        kept:2
    },{isNaN:true}),
    cleanNull: clean({
        removed:null,
        kept:true
    },{isNull:true}),
    cleanUndefined: clean({
        removed:undefined,
        kept:true
    },{isUndefined:true}),
    cleanError: clean({
        removed:new Error('test-error'),
        kept: true
    },{isError:true}),
    cleanFunction: clean({
        removed:function(){},
        kept: true
    },{isFunction:true}),
    cleanEmpty: clean({
        removedString:'',
        removedObject:{},
        removedArray:[],
keptString:'kept',
keptObject:{kept:true},
keptArray:['kept']
    },{isEmpty:true}),
    cleanArray: clean({
        removed:[],
kept:['kept']
    },{isEmptyArray:true}),
    cleanArray: clean({
        removed:{},
        kept: {isKept:true}
    },{isEmptyObject:true}),
    cleanEmptyString: clean({
        removed:'    ',
        kept: 'kept'
    },{isEmptyString:true}),
    cleanKeys: clean({
        removeKey: 'removeKey',
        keptKey: 'keptKey',
        obj: {
            keptKey: 'keptKey',
            removeKey: 'removeKey'
        }
    },{keys:['removeKey']}),
    cleanValues: clean({
        removed: 'removeValue',
        kept: 'keptValue',
        obj: {
            kept: 'keptValue',
            removed: 'removeValue'
        }
    },{values:['removeValue']}),


};
console.log('cleaned',tests)
} catch (error) {
    console.warn(error)
}
