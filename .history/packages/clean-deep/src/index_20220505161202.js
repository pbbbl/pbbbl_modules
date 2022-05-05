const transform = require('lodash.transform');
const deepFreeze = require('deep-freeze')
const {copy} = require('copy-anything');
const isJSON = require('is-json');
const {
  isDefined,
  isString,
  isUndefined,
  isObject,
  isArray,
  isEmptyString,
  isEmptyArray,
  isEmptyObject,
  isNull,
  isNaN,
  isActualNaN,
  isFunction,
  isTrue
} = require('@pbbbl/is');
const configs = createConfigs();
const defaultOptions = configs._default;
/**
 * @param {*} valueToClean - Object or Array to clean.
 * @param {*} options - Clean options.
 * @property {"default" | "json" | "firestore"} [config="default"] - Config to use.
 * @property {string[]} [keys] - Keys to remove from `valueToClean`.
 * @property {any[]} [values] - Values to remove from `valueToClean`.
 * @property {boolean} [isNaN=false] - Remove NaN values (all non-numerical values).
 * @property {boolean} [isNull=false] - Remove null values.
 * @property {boolean} [isUndefined=true] - Remove undefined values.
 * @property {boolean} [isError=true] - Remove Error values.
 * @property {boolean} [isFunction=true] - Remove Function values.
 * @property {boolean} [isEmpty=false] - Remove empty values.
 * @property {boolean} [isEmptyArray=false] - Remove empty arrays.
 * @property {boolean} [isEmptyObject=false] - Remove empty objects.
 * @property {boolean} [isEmptyString=false] - Remove empty strings.
 * @returns {*} - Cleaned value.
 */
function clean(valueToClean, options = { ...defaultOptions }, isRecurse=false) {
    if(!isRecurse){

        if (!options) {
          options = { ...defaultOptions };
        } else {
          options = createOptions(options);
        }
    }
  let object = isUndefined(valueToClean) ? undefined : valueToClean;

  const config = options;
  const transformEach = isDefined(config.transformEach) && isFunction(config.transformEach) ? config.transformEach : null
    const og = deepFreeze(copy({
        root:object,
        config,
    }))
  return transform(object, (result, value, key) => {
    // parse json if possible
    if(isString(value) && isJSON(value)){
        try {
            const parsed = JSON.parse(value);
            result[key] = parsed;
            value = parsed;
        } catch {
            // do nothing
        }
    }
    // run custom transformEach if available
    if(isDefined(transformEach) && isFunction(transformEach)){
        // const current = deepFreeze(copy(result));
        const current = isArray(result) ? [...result] : isObject(result) ? {...result} : result;
        const transformArgs = deepFreeze([...copy([value,key]),{current,...og}]);
        const transformed = transformEach(...transformArgs);
        if(isUndefined(transformed)){
            value = undefined;
        } else {
            value = transformed;
        }
    }

    // Exclude specific keys.
    /**
     * @type {false|string[]} configKeys [configKeys=false] - Keys array to remove.
     * @type {false|any[]} configValues [configValues=false] - Values array to remove.
     * @type {boolean} configIsNaN [configIsNaN=false] - Remove NaN values (all non-numerical values).
     * @type {boolean} configIsNull [configIsNull=false] - Remove null values.
     * @type {boolean} configIsUndefined [configIsUndefined=true] - Remove undefined values.
     * @type {boolean} configIsError [configIsError=true] - Remove Error values.
     * @type {boolean} configIsFunction [configIsFunction=true] - Remove Function values.
     * @type {boolean} configIsEmpty [configIsEmpty=false] - Remove empty values. (All empty arrays, objects, and empty strings)
     * @type {boolean} configIsEmptyArray [configIsEmptyArray=false] - Remove empty arrays.
     * @type {boolean} configIsEmptyObject [configIsEmptyObject=false] - Remove empty objects.
     * @type {boolean} configIsEmptyString [configIsEmptyString=false] - Remove empty strings. Checked after trim.
     */
    const configKeys =isDefined(config.keys) && config.keys && !isEmptyArray(config.keys)
    ? config.keys
    : false;
    const configValues =isDefined(config.values) && config.values && !isEmptyArray(config.values)
    ? config.values
    : false;
    const configIsNaN =isDefined(config.isNaN) && isTrue(config.isNaN);
    const configIsNull =isDefined(config.isNull) && isTrue(config.isNull);
    const configIsUndefined =isUndefined(config.isUndefined) || (isDefined(config.isUndefined) && (isTrue(config.isUndefined)  || config.isUndefined !== false));
    const configIsFunction =isUndefined(config.isFunction) || (isDefined(config.isFunction) && (isTrue(config.isFunction) || config.isFunction !== false));
    const configIsError =isUndefined(config.isError) || (isDefined(config.isError) && (isTrue(config.isError) || config.isError !== false));
    const configIsEmpty = isDefined(config.isEmpty) && isTrue(config.isEmpty);
    const configIsEmptyArray = configIsEmpty || (isDefined(config.isEmptyArray) && isTrue(config.isEmptyArray));
    const configIsEmptyObject = configIsEmpty || (isDefined(config.isEmptyObject) && isTrue(config.isEmptyObject));
    const configIsEmptyString = configIsEmpty || (isDefined(config.isEmptyString) && isTrue(config.isEmptyString));
    const isRecursable = isDefined(value) && ((isObject(value) && !isEmptyObject(value))|| (isArray(value) && !isEmptyArray(value)));
    
    // Exclude specific keys.
    if (configKeys && configKeys.includes(key)) {
        console.log('\nRemoving key\n', key,'\n',value,'\n....\n');
        return;
    }
    // Recurse into arrays and objects.
    if (isRecursable){
        console.log('recurse @', key);
        value = clean(value, options, true);
    }
    
    // Exclude specific values.
    if (configValues && configValues.includes(value)) {
        console.log('\nRemoving value\n', key,'\n',value,'\n....\n');
        return;
    }

    
    // Exclude empty objects.
    if (configIsEmptyObject && isObject(value) && isEmptyObject(value)) {
        console.log('\nRemoving empty object\n', key,'\n',value,'\n....\n');
      return;
    }
    // Exclude empty arrays.
    if (configIsEmptyArray && isArray(value) && isEmptyArray(value)) {
        console.log('\nRemoving empty array\n', key,'\n',value,'\n....\n');
      return;
    }
    // Exclude empty strings.
    if (configIsEmptyString && isString(value) && isEmptyString(value)) {
        console.log('\nRemoving empty string\n', key,'\n',value,'\n....\n');
        return;
    }

    // Exclude NaN values.
    // const NaNValues = typeof config.isNaN !== 'undefined' && config.isNaN === true;
    if (configIsNaN && isNaN(value)) {
        console.log('\nRemoving NaN\n', key,'\n',value,'\n....\n');
        return;
    }

    // Exclude functions.
    if (configIsFunction && isFunction(value)) {
        console.log('\nRemoving function\n', key,'\n',value,'\n....\n');
        return;
    }

    // Exclude null values.
    const nullValues = isDefined(config.isNull) && config.isNull === true;
    if (configIsNull && isNull(value)) {
        console.log('\nRemoving null\n', key,'\n',value,'\n....\n');
        return;
    }

    // Exclude undefined values.

    if (configIsUndefined &&  isUndefined(value)) {
        console.log('\nRemoving undefined\n', key,'\n',value,'\n....\n');
      return;
    }
    // Exclude error values.

    if (configIsError &&   value instanceof Error) {
        console.log('\nRemoving error\n', key,'\n',value,'\n....\n');
        return;
    }

    // Append when recursing arrays.
    
    if (isArray(result)) {
      console.log("append recursive array", { value });
      return result.push(value);
    }

    result[key] = value;
  });
}
function createConfigs() {
    const buildConfig = (id,overrides, allFalse=false)=>{
        const c= {
            config: id, //config?: undefined | "default" | "json";
            configId: id, //configId?: undefined | "default" | "json";
            isUndefined: allFalse ? false: true, //isUndefined?:boolean;
            isError: allFalse ? false:true, //isError?:boolean;
            isFunction:  allFalse ? false:true, //isFunction?:boolean;
            keys: [], //keys?: string[];
            values: [], //values?: any[],
            isNaN: false, //isNaN?:boolean;
            isNull: false, //isNull?:boolean;
            isEmpty: false, //isEmpty?:boolean;
            isEmptyArray: false, //isEmptyArray?:boolean;
            isEmptyObject: false, //isEmptyObject?:boolean;
            isEmptyString: false, //isEmptyString?:boolean;
            isJson: false, //isJson?:boolean;
            transformEach:null, //transformEach?:null | ((value: any, key: string,ctx:{root:any,current:any,config:any}) => any);
            parseJson: true, //parseJson?:boolean;
            ...overrides
        }
        return c
    }
  return {
    custom: buildConfig('custom',{},true),
    firestore: buildConfig('firestore',{},false),
    default: buildConfig('default',{},false),
    json: buildConfig('json',{
        isNull: true
    },false),
  };
}
function createOptions(config = configs.default) {
    let rootConfigId = (config.id || config.configId || 'default').toLowerCase();
    let rootConfig;
    if(typeof configs[rootConfigId] === 'undefined') {
        rootConfigId = 'default';
        rootConfig = configs.default;
    } else {
        rootConfig = configs[rootConfigId];
    }
    const output = { ...rootConfig, ...config };
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
  clean,
});
try {
    const testError = new Error('testError');
  const tests = {
    custom: clean({
        a: 1,
        b: undefined,
        c: null,
        d: testError,
        e: () => {},
        f: {
            a: 1,
        b: undefined,
        c: null,
        d: testError,
        e: () => {},
        },
        g: [1, undefined, null, testError, () => {}],
    },{config:'custom'}),
    parseAndTransform: clean({
        a: {alreadyParsed:true},
        b: JSON.stringify({alreadyParsed:false,keyToTransform:'not transformed'}),
    },{id:'default',transformEach:(value,key)=>{
        console.log('transformEach',{value,key});
        if(key === 'keyToTransform') {
            return 'transformed';
        }
    }}),
    parseJson: clean({
        a: {alreadyParsed:true},
        b: JSON.stringify({alreadyParsed:false}),
    },{id:'default'}),
    cleanNaN: clean(
      {
        removed: '1',
        kept: 2,
      },
      { isNaN: true }
    ),
    cleanNull: clean(
      {
        removed: null,
        kept: true,
      },
      { isNull: true }
    ),
    cleanUndefined: clean(
      {
        removed: undefined,
        kept: true,
      },
      { isUndefined: true }
    ),
    cleanError: clean(
      {
        removed: testError,
        kept: true,
      },
      { isError: true }
    ),
    cleanFunction: clean(
      {
        removed: function() {},
        kept: true,
      },
      { isFunction: true }
    ),
    cleanEmpty: clean(
      {
        removedString: '',
        removedObject: {},
        removedArray: [],
        keptString: 'kept',
        keptObject: { kept: true },
        keptArray: ['kept'],
      },
      { isEmpty: true }
    ),
    cleanArray: clean(
      {
        removed: [],
        kept: ['kept'],
      },
      { isEmptyArray: true }
    ),
    cleanArray: clean(
      {
        removed: {},
        kept: { isKept: true },
      },
      { isEmptyObject: true }
    ),
    cleanEmptyString: clean(
      {
        removed: '    ',
        kept: 'kept',
      },
      { isEmptyString: true }
    ),
    cleanKeys: clean(
      {
        removeKey: 'removeKey',
        keptKey: 'keptKey',
        obj: {
          keptKey: 'keptKey',
          removeKey: 'removeKey',
        },
      },
      { keys: ['removeKey'] }
    ),
    cleanValues: clean(
      {
        removed: 'removeValue',
        kept: 'keptValue',
        obj: {
          kept: 'keptValue',
          removed: 'removeValue',
        },
      },
      { values: ['removeValue'] }
    ),
  };
  console.log('cleaned', tests);
} catch (error) {
  console.warn(error);
}
