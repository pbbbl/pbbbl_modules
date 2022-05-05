const transform = require('lodash.transform');
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
  isFunction
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

  return transform(object, (result, value, key) => {
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
    const configIsUndefined =isUndefined(config.isUndefined) || (isDefined(config.isUndefined) && isTrue(config.isUndefined));
    const configIsError =isUndefined(config.isError) || (isDefined(config.isError) && isTrue(config.isError));
    const configIsFunction =isUndefined(config.isFunction) || (isDefined(config.isFunction) && isTrue(config.isFunction));
    const configIsEmpty =isDefined(config.isEmpty) && isTrue(config.isEmpty);
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

    if (configIsUndefined && config.isUndefined !== false && isUndefined(value)) {
        console.log('\nRemoving undefined\n', key,'\n',value,'\n....\n');
      return;
    }
    // Exclude error values.

    if (configIsError && value instanceof Error) {
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
  return {
    firestore: {
      config: 'firestore', //config?: undefined | "default" | "json";
      configId: 'firestore', //configId?: undefined | "default" | "json";
      keys: [], //keys?: string[];
      values: [], //values?: any[],
      isNaN: false, //isNaN?:boolean;
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
      isNaN: false, //isNaN?:boolean;
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
      isNaN: false, //isNaN?:boolean;
      isNull: true, //isNull?:boolean;
      isUndefined: true, //isUndefined?:boolean;
      isError: true, //isError?:boolean;
      isFunction: true, //isFunction?:boolean;
      isEmpty: false, //isEmpty?:boolean;
      isEmptyArray: false, //isEmptyArray?:boolean;
      isEmptyObject: false, //isEmptyObject?:boolean;
      isEmptyString: false, //isEmptyString?:boolean;
    },
  };
}
function createOptions(config = configs._default) {
  let output = { ...configs._default, ...config };
  if (typeof config.config == 'string') {
    switch (config.config) {
      case 'json':
        output = configs.json;
        break;
      case 'firestore':
        output = configs.firestore;
        break;
      default:
        output = configs._default;
        break;
    }
    // return output;
  }
  Object.keys(defaultOptions).forEach(key => {
    if (
      typeof config[key] !== 'undefined' &&
      typeof config[key] === typeof defaultOptions[key]
    ) {
      output[key] = config[key];
    // } else {
    //   output[key] = defaultOptions[key];
    }
  });

  if (typeof config.values === 'object' && Array.isArray(config.values)) {
    if (!(config.values?.length > 0)) {
      delete output.values;
    }
  }

  if (typeof config.keys === 'object' && Array.isArray(config.keys)) {
    if (!(config.keys?.length > 0)) {
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

// console.log({
//   clean,
// });
// try {
//     const testError = new Error('testError');
//   const tests = {
//     cleanNaN: clean(
//       {
//         removed: '1',
//         kept: 2,
//       },
//       { isNaN: true }
//     ),
//     cleanNull: clean(
//       {
//         removed: null,
//         kept: true,
//       },
//       { isNull: true }
//     ),
//     cleanUndefined: clean(
//       {
//         removed: undefined,
//         kept: true,
//       },
//       { isUndefined: true }
//     ),
//     cleanError: clean(
//       {
//         removed: testError,
//         kept: true,
//       },
//       { isError: true }
//     ),
//     cleanFunction: clean(
//       {
//         removed: function() {},
//         kept: true,
//       },
//       { isFunction: true }
//     ),
//     cleanEmpty: clean(
//       {
//         removedString: '',
//         removedObject: {},
//         removedArray: [],
//         keptString: 'kept',
//         keptObject: { kept: true },
//         keptArray: ['kept'],
//       },
//       { isEmpty: true }
//     ),
//     cleanArray: clean(
//       {
//         removed: [],
//         kept: ['kept'],
//       },
//       { isEmptyArray: true }
//     ),
//     cleanArray: clean(
//       {
//         removed: {},
//         kept: { isKept: true },
//       },
//       { isEmptyObject: true }
//     ),
//     cleanEmptyString: clean(
//       {
//         removed: '    ',
//         kept: 'kept',
//       },
//       { isEmptyString: true }
//     ),
//     cleanKeys: clean(
//       {
//         removeKey: 'removeKey',
//         keptKey: 'keptKey',
//         obj: {
//           keptKey: 'keptKey',
//           removeKey: 'removeKey',
//         },
//       },
//       { keys: ['removeKey'] }
//     ),
//     cleanValues: clean(
//       {
//         removed: 'removeValue',
//         kept: 'keptValue',
//         obj: {
//           kept: 'keptValue',
//           removed: 'removeValue',
//         },
//       },
//       { values: ['removeValue'] }
//     ),
//   };
//   console.log('cleaned', tests);
// } catch (error) {
//   console.warn(error);
// }
