const clean = require('@pbbbl/clean-deep');
const {copy} = require('copy-anything');
const {isArray, isEmptyArray, isDefined} = require('@pbbbl/is');
const isJSON = require('is-json');
const stringify = (value,...rest)=>{
    if(!isDefined(value)){
        return;
    }
    let args = []
    if(isArray(rest) && rest?.length > 0){
        args = [...rest];
    }   
    const copied = copy({value});
    const cleaned = clean(copied, {config:'json'});
    value = cleaned.value;
    try {
        if(isObject(value) || isArray(value)){
            return JSON.stringify(value,null,args[0]);
        } else {
            if(isDefined(value)){
                return value;
            } else {
                return;
            }
        }
    } catch (error){
        throw new Error('Error at @pbbbl/stringify.stringify: This is likely not an error with @pbbbl/stringify, but with JSON.stringify See below for more details...\n'+error);
    }
}
const parse= (stringified)=>{
    if(isJSON(stringified)){
        return JSON.parse(stringified);
    } else {
        throw new Error('Error at @pbbbl/stringify.parse: This is likely not an error with @pbbbl/stringify, but with JSON.parse See below for more details...\n'+error);
    }
}
module.exports = {
    stringify,
    parse
}

const tests = [
 stringify({
     testId:0,
        name: 'name',
        age: 1,
        undef:undefined,
        nullval:null,
        fnVal: function(){},
        jsonVal: JSON.stringify({
            name: 'name',
        })
    }),
    stringify({
        testId:1,
        name: 'name',
        age: 1,
    })
]
