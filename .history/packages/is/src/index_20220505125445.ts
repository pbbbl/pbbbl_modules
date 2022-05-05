

'use strict';

/**!
 * is
 * the definitive JavaScript type testing library
 *
 * @copyright 2013-2014 Enrico Marino / Jordan Harband
 * @license MIT
 */

var objProto = Object.prototype;
var owns = objProto.hasOwnProperty;
var toStr = objProto.toString;
var symbolValueOf:any;
if (typeof Symbol === 'function') {
  symbolValueOf = Symbol.prototype.valueOf;
}
var bigIntValueOf:any;
if (typeof BigInt === 'function') {
  bigIntValueOf = BigInt.prototype.valueOf;
}
function isActualNaN (value:any):boolean {
  return value !== value;
};

var base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
var hexRegex = /^[A-Fa-f0-9]+$/;



/**
 * Test general.
 */

/**
 * isType
 * Test if `value` is a type of `type`.
 *
 * @param {*} value value to test
 * @param {String} type type
 * @return {Boolean} true if `value` is a type of `type`, false otherwise
 * @api public
 */

 function isType(value:any, type:string):boolean {
    return typeof value === type;
};

/**
 * isA
 * Test if `value` is a type of `type`.
 *
 * @param {*} value value to test
 * @param {String} type type
 * @return {Boolean} true if `value` is a type of `type`, false otherwise
 * @api public
 */

function isA(value:any, type:string):boolean {
    return isType(value, type);
};


/**
 * isDefined
 * Test if `value` is defined.
 *
 * @param {*} value value to test
 * @return {Boolean} true if 'value' is defined, false otherwise
 * @api public
 */

function isDefined (value:any):boolean {
  return typeof value !== 'undefined';
};

/**
 * isEmptyString
 * @param {*} value value to test
 * @param {Boolean} [trimmed=true] should trim the value
 * @returns {Boolean} true if `value` is an empty string, false otherwise
 */
function isEmptyString(value:any, trimmed:boolean = true):boolean {
    if(typeof value === 'string'){
        if(trimmed){
            const str = value.replace(/\s/g, '');
            return str.length === 0?true:false;
        } else {
            return value.length === 0 ? true:false;
        }
    }else {
        return false;
    }
}

/**
 * isEmpty
 * Test if `value` is empty.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is empty, false otherwise
 * @api public
 */
function isEmpty(value:any):boolean {
    return isEmptyObject(value) || isEmptyArray(value) || isEmptyString(value) || false;
}

/**
 * isEqual
 * Test if `value` is equal to `other`.
 *
 * @param {*} value value to test
 * @param {*} other value to compare with
 * @return {Boolean} true if `value` is equal to `other`, false otherwise
 */
function isEqual(value:any, other:any):boolean {
    if (value === other) {
        return true;
      }
    
      var type = toStr.call(value);
      var key;
    
      if (type !== toStr.call(other)) {
        return false;
      }
    
      if (isObject(value) && isObject(other)) {
          if(isEmptyObject(value) && isEmptyObject(other)){
            return true;
          } else {
                for (key in value) {
                    if (Object.hasOwnProperty.call(other, key) && !isEqual(value[key], other[key])) {
                        return false;
                    }
                }
                return true;
          }
      }
    
      if (isArray(value) && isArray(other)) {
          if(isEmptyArray(value) && isEmptyArray(other)){
            return true;
          } else {

              key = value.length;
              if (key !== other.length) {
                return false;
              }
              while (key--) {
                if (!isEqual(value[key], other[key])) {
                  return false;
                }
              }
              return true;
          }
      }
    
      if (type === '[object Function]') {
        return value.prototype === other.prototype;
      }
    
      if (type === '[object Date]') {
        return value.getTime() === other.getTime();
      }
    
      return false;
}
/**
 * isHosted
 * Test if `value` is hosted by `host`.
 *
 * @param {*} value to test
 * @param {*} host host to test with
 * @return {Boolean} true if `value` is hosted by `host`, false otherwise
 * @api public
 */

function isHosted (value:any, host:any):boolean {
  var type = typeof host[value];
  var isNonHostType = type === 'undefined' || type === 'boolean' || type === 'number' || type === 'string';
  return type === 'object' ? !!host[value] : !isNonHostType;
}

/**
 * isInstance
 * Test if `value` is an instance of `constructor`.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an instance of `constructor`
 * @api public
 */

function isInstance (value:any, constructor:any):boolean {
    return value instanceof constructor;
}
/**
 * isInstanceOf
 * Test if `value` is an instance of `constructor`.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an instance of `constructor`
 * @api public
 */
function isInstanceOf (value:any, constructor:any):boolean {
  return value instanceof constructor;
}

/**
 * isNull
 * Test if `value` is null.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is null, false otherwise
 * @api public
 */

function isNull (value:any):boolean {
    return value === null;
};
/**
 * isNil
 * Test if `value` is null.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is null, false otherwise
 * @api public
 */
function isNil (value:any):boolean {
  return value === null;
};

/**
 * isUndefined
 * Test if `value` is undefined.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is undefined, false otherwise
 * @api public
 */

function isUndefined (value:any):boolean {
  return typeof value === 'undefined';
};

/**
 * isUndef
 * Test if `value` is undefined.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is undefined, false otherwise
 * @api public
 */

 function isUndef (value:any):boolean {
    return typeof value === 'undefined';
  };

/**
 * Test arguments.
 */

/**
 * isArguments
 * Test if `value` is an arguments object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 * @api public
 */

 function isArguments (value:any):boolean {
  var isStandardArguments = toStr.call(value) === '[object Arguments]';
  var isOldArguments = !isArray(value) && isArrayLike(value) && isObject(value) && isFunction(value.callee);
  return isStandardArguments || isOldArguments;
};

/**
 * Test array.
 */

/**
 * isArray
 * Test if 'value' is an array.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an array, false otherwise
 * @api public
 */

 function isArray(value:any):boolean {
    return typeof value === 'object' && value !== null && Array.isArray(value);
}

/**
 * isArgumentsEmpty
 * Test if `value` is an empty arguments object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an empty arguments object, false otherwise
 * @api public
 */
function isArgumentsEmpty (value:any):boolean {
  return isArguments(value) && value.length === 0;
};

/**
 * isEmptyArguments
 * Test if `value` is an empty arguments object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an empty arguments object, false otherwise
 * @api public
 */
function isEmptyArguments (value:any):boolean {
  return isArguments(value) && value.length === 0;
};

/**
 * isEmptyArray
 * Test if `value` is an empty array.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an empty array, false otherwise
 * @api public
 */
function isEmptyArray(value:any):boolean {
    return typeof value === 'object' && value !== null && Array.isArray(value) && value.length === 0;
}
/**
 * isArrayEmpty
 * Test if `value` is an empty array.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an empty array, false otherwise
 * @api public
 */
function isArrayEmpty(value:any):boolean {
     return isEmptyArray(value);
 }

/**
 * isArrayLike
 * Test if `value` is an arraylike object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 * @api public
 */

 function isArrayLike (value:any):boolean {
  return !!value && !isBool(value)
    && owns.call(value, 'length')
    && isFinite(value.length)
    && isNumber(value.length)
    && value.length >= 0;
};

/**
 * Test boolean.
 */

/**
 * isBool
 * Test if `value` is a boolean.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a boolean, false otherwise
 * @api public
 */

function isBool (value:any):boolean {
  return toStr.call(value) === '[object Boolean]';
};
/**
 * isBoolean
 * Test if `value` is a boolean.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a boolean, false otherwise
 * @api public
 */

function isBoolean (value:any):boolean {
  return toStr.call(value) === '[object Boolean]';
};

/**
 * isFalse
 * Test if `value` is false.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is false, false otherwise
 * @api public
 */

function isFalse(value:any):boolean {
  return isBool(value) && Boolean(Number(value)) === false;
};

/**
 * isTrue
 * Test if `value` is true.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is true, false otherwise
 * @api public
 */

function isTrue(value:any):boolean {
  return isBool(value) && Boolean(Number(value)) === true;
};

/**
 * Test date.
 */

/**
 * isDate
 * Test if `value` is a date.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a date, false otherwise
 * @api public
 */

function isDate(value:any):boolean {
  return toStr.call(value) === '[object Date]';
};

/**
 * isDateValid
 * Test if `value` is a valid date.
 *
 * @param {*} value value to test
 * @returns {Boolean} true if `value` is a valid date, false otherwise
 */
function isDateValid(value:any):boolean {
  return isDate(value) && !isNaN(Number(value));
};

/**
 * isValidDate
 * Test if `value` is a valid date.
 *
 * @param {*} value value to test
 * @returns {Boolean} true if `value` is a valid date, false otherwise
 */
 function isValidDate(value:any):boolean {
    return isDate(value) && !isNaN(Number(value));
  };
  
/**
 * Test element.
 */

/**
 * isElement
 * Test if `value` is an html element.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an HTML Element, false otherwise
 * @api public
 */

 function isElement (value:any):boolean {
  return value !== undefined
    && typeof HTMLElement !== 'undefined'
    && value instanceof HTMLElement
    && value.nodeType === 1;
};

/**
 * Test error.
 */

/**
 * isError
 * Test if `value` is an error object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an error object, false otherwise
 * @api public
 */

function isError (value:any):boolean {
  return toStr.call(value) === '[object Error]';
};

/**
 * Test function.
 */

/**
 * isFunction
 * Test if `value` is a function.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a function, false otherwise
 * @api public
 */

function isFunction (value:any):boolean {
  var isAlert = typeof window !== 'undefined' && value === window.alert;
  if (isAlert) {
    return true;
  }
  var str = toStr.call(value);
  return str === '[object Function]' || str === '[object GeneratorFunction]' || str === '[object AsyncFunction]';
};

/**
 * isFn
 * Test if `value` is a function.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a function, false otherwise
 * @api public
 */

 function isFn (value:any):boolean {
     return isFunction(value);
  };
/**
 * Test number.
 */

/**
 * isNumber
 * Test if `value` is a number.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a number, false otherwise
 * @api public
 */

function isNumber (value:any):boolean {
  return toStr.call(value) === '[object Number]';
};

/**
 * isInfinite
 * Test if `value` is positive or negative infinity.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is positive or negative Infinity, false otherwise
 * @api public
 */
function isInfinite (value:any):boolean {
  return value === Infinity || value === -Infinity;
};

/**
 * isDecimal
 * Test if `value` is a decimal number.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a decimal number, false otherwise
 * @api public
 */

function isDecimal (value:any):boolean {
  return isNumber(value) && !isActualNaN(value) && !isInfinite(value) && value % 1 !== 0;
};

/**
 * isDivisibleBy
 * Test if `value` is divisible by `n`.
 *
 * @param {Number} value value to test
 * @param {Number} n dividend
 * @return {Boolean} true if `value` is divisible by `n`, false otherwise
 * @api public
 */

function isDivisibleBy (value:any, n:number):boolean {
  var isDividendInfinite = isInfinite(value);
  var isDivisorInfinite = isInfinite(n);
  var isNonZeroNumber = isNumber(value) && !isActualNaN(value) && isNumber(n) && !isActualNaN(n) && n !== 0;
  return isDividendInfinite || isDivisorInfinite || (isNonZeroNumber && value % n === 0);
};

/**
 * isInt
 * Test if `value` is an integer.
 *
 * @param value to test
 * @return {Boolean} true if `value` is an integer, false otherwise
 * @api public
 */

function isInt (value:any):boolean {
  return isNumber(value) && !isActualNaN(value) && value % 1 === 0;
};
/**
 * isInteger
 * Test if `value` is an integer.
 *
 * @param value to test
 * @return {Boolean} true if `value` is an integer, false otherwise
 * @api public
 */

function isInteger (value:any):boolean {
  return isNumber(value) && !isActualNaN(value) && value % 1 === 0;
};

/**
 * isMaximum
 * Test if `value` is greater than 'others' values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is greater than `others` values
 * @api public
 */

function isMaximum (value:any, others:any[]):boolean {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!isArrayLike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value < others[len]) {
      return false;
    }
  }

  return true;
};

/**
 * isMinimum
 * Test if `value` is less than `others` values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is less than `others` values
 * @api public
 */

function isMinimum (value:any, others:any[]):boolean {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!isArrayLike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value > others[len]) {
      return false;
    }
  }

  return true;
};

/**
 * isNaN
 * Test if `value` is not a number.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is not a number, false otherwise
 * @api public
 */

  function isNaN (value:any):boolean {
  return !isNumber(value) || value !== value;
};

/**
 * isEven
 * Test if `value` is an even number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an even number, false otherwise
 * @api public
 */

function isEven(value:any)  {
  return isInfinite(value) || (isNumber(value) && value === value && value % 2 === 0);
};

/**
 * isOdd
 * Test if `value` is an odd number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an odd number, false otherwise
 * @api public
 */

function isOdd (value:any):boolean {
  return isInfinite(value) || (isNumber(value) && value === value && value % 2 !== 0);
};

/**
 * isGe
 * Test if `value` is greater than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

function isGe (value:any,other:any):boolean {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !isInfinite(value) && !isInfinite(other) && value >= other;
};

/**
 * isGt
 * Test if `value` is greater than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

function isGt (value:any,other:any):boolean {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !isInfinite(value) && !isInfinite(other) && value > other;
};

/**
 * isLe
 * Test if `value` is less than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if 'value' is less than or equal to 'other'
 * @api public
 */

function isLe(value:any,other:any):boolean {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !isInfinite(value) && !isInfinite(other) && value <= other;
};

/**
 * isLt
 * Test if `value` is less than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if `value` is less than `other`
 * @api public
 */

function isLt (value:any,other:any):boolean {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !isInfinite(value) && !isInfinite(other) && value < other;
};

/**
 * isWithin
 * Test if `value` is within `start` and `finish`.
 *
 * @param {Number} value value to test
 * @param {Number} start lower bound
 * @param {Number} finish upper bound
 * @return {Boolean} true if 'value' is is within 'start' and 'finish'
 * @api public
 */
 function isWithin (value:number, start:number, finish:number):boolean {
  if (isActualNaN(value) || isActualNaN(start) || isActualNaN(finish)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!isNumber(value) || !isNumber(start) || !isNumber(finish)) {
    throw new TypeError('all arguments must be numbers');
  }
  var isAnyInfinite = isInfinite(value) || isInfinite(start) || isInfinite(finish);
  return isAnyInfinite || (value >= start && value <= finish);
};

/**
 * Test object.
 */

/**
 * isObject
 * Test if `value` is an object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an object, false otherwise
 * @api public
 */
function isObject(value:any):boolean {
  return toStr.call(value) === '[object Object]';
};
/**
 * isEmptyObject
 * Test if `value` is an object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an empty object (`{}`), false otherwise
 * @api public
 */
function isEmptyObject(value:any):boolean {
    if(typeof value === 'object' && value !== null && toStr.call(value) === '[object Object]'){
        try {
            const keys = Object.keys(value);
            if(keys && keys?.length > 0){
                return false;
            } else {
                return true;
            }
        } catch {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * isPrimitive
 * Test if `value` is a primitive.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a primitive, false otherwise
 * @api public
 */
function isPrimitive(value:any):boolean {
  if (!value) {
    return true;
  }
  if (typeof value === 'object' || isObject(value) || isFunction(value) || isArray(value)) {
    return false;
  }
  return true;
};

/**
 * isHash
 * Test if `value` is a hash - a plain object literal.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a hash, false otherwise
 * @api public
 */

function isHash(value:any):boolean {
  return isObject(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
};

/**
 * Test regexp.
 */

/**
 * isRegexp
 * Test if `value` is a regular expression.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a regexp, false otherwise
 * @api public
 */

function isRegexp (value:any):boolean {
  return toStr.call(value) === '[object RegExp]';
};

/**
 * Test string.
 */

/**
 * isString
 * Test if `value` is a string.
 *
 * @param {*} value value to test
 * @return {Boolean} true if 'value' is a string, false otherwise
 * @api public
 */

function isString (value:any):boolean {
  return typeof value === 'string';
};

/**
 * isStringEmpty
 * @param {*} value value to test
 * @param {Boolean} [trimmed=true] should trim the value
 * @returns {Boolean} true if `value` is an empty string, false otherwise
 */
function isStringEmpty(value:any):boolean {
    return isEmptyString(value)
}

/**
 * Test base64 string.
 */

/**
 * isBase64
 * Test if `value` is a valid base64 encoded string.
 *
 * @param {*} value value to test
 * @return {Boolean} true if 'value' is a base64 encoded string, false otherwise
 * @api public
 */

function isBase64 (value:any):boolean {
  return isString(value) && (!value.length || base64Regex.test(value));
};

/**
 * Test base64 string.
 */

/**
 * isHex
 * Test if `value` is a valid hex encoded string.
 *
 * @param {*} value value to test
 * @return {Boolean} true if 'value' is a hex encoded string, false otherwise
 * @api public
 */

function isHex(value:any):boolean {
  return isString(value) && (!value.length || hexRegex.test(value));
};

/**
 * isSymbol
 * Test if `value` is an ES6 Symbol
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a Symbol, false otherise
 * @api public
 */

 function isSymbol (value:any):boolean {
  return typeof Symbol === 'function' && toStr.call(value) === '[object Symbol]' && typeof symbolValueOf.call(value) === 'symbol';
};

/**
 * isBigInt
 * Test if `value` is an ES-proposed BigInt
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a BigInt, false otherise
 * @api public
 */

function isBigInt (value:any):boolean {
  return typeof BigInt === 'function' && toStr.call(value) === '[object BigInt]' && typeof bigIntValueOf.call(value) === 'bigint';
};


export {
    
isActualNaN,
isType,
isA,
isDefined,
isEmptyString,
isEmpty,
isEqual,
isHosted,
isInstance,
isInstanceOf,
isNull,
isNil,
isUndefined,
isUndef,
isArguments,
isArray,
isArgumentsEmpty,
isEmptyArguments,
isEmptyArray,
isArrayEmpty,
isArrayLike,
isBool,
isBoolean,
isFalse,
isTrue,
isDate,
isDateValid,
isValidDate,
isElement,
isError,
isFunction,
isFn,
isNumber,
isInfinite,
isDecimal,
isDivisibleBy,
isInt,
isInteger,
isMaximum,
isMinimum,
isNaN,
isEven,
isOdd,
isGe,
isGt,
isLe,
isLt,
isWithin,
isObject,
isEmptyObject,
isPrimitive,
isHash,
isRegexp,
isString,
isStringEmpty,
isBase64,
isHex,
isSymbol,
isBigInt,
}
