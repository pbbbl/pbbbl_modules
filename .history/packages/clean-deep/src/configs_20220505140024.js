const configs = {
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
};

export default configs;
