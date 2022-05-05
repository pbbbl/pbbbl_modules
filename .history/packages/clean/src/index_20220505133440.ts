import configs from './configs';
const defaultOptions:CleanOptions = configs._default;
import {isUndefined} from '@pbbbl/is';
function clean(valueToClean, option={...defaultOptions}){
    if(!options){
        options = {...defaultOptions};
    } else {
        options = createOptions(options);
    }
    if(options.isUndefined && isUndefined(obj)){
        return;
    }
    let obj:any = isUndefined(valueToClean) ? undefined : valueToClean;

    // const configId = options.configId;
    // const config = is.undefined(configs[configId]) ? configs._default : configs[configId];
    // options = {
    //     ...defaultOptions,
    //     ...config,
    //     ...options,
    // };
    const config = options;



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

function createOptions (config:CleanOptions=configs._default):CleanOptions{
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
        Object.keys(defaultConfig).forEach(key=>{
            if(typeof config[key] != 'undefined' && typeof config[key] === typeof defaultConfig[key]){
                output[key] = config[key];
            } else {
                delete output[key];
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
