const clean = require('@pbbbl/clean-deep');
const {copy} = require('copy-anything');
const {isArray, isEmptyArray, isDefined,isObject} = require('@pbbbl/is');
const isJSON = require('is-json');
/**
 * @param {*} value
 * @param {*} options
 */
const stringify = (value,replacer=null,space=null)=>{
    // let rest = [JSONfn,JSONOptions];
    if(!isDefined(value)){
        return;
    }
    // let args = []
    // if(isArray(rest) && rest?.length > 0){
    //     args = [...rest];
    // }   
    const copied = copy({value});
    const cleaned = clean(copied, {config:'json'});
    value = cleaned.value;
    try {
        if(isObject(value) || isArray(value)){
            const args = [value,replacer,space].map(x=>x ? x : null);
            return JSON.stringify(value,replacer,space);
        } else {
            if(isDefined(value)){
                return value;
            } else {
                return;
            }
        }
    } catch (details){
        const error ={message:'Error at @pbbbl/stringify stringify(): This is likely not an error with @pbbbl/stringify, but with JSON.stringify See below for more details...\n',details};
        console.warn(error);
        return;
    }
}
const parse= (text,reviver=null)=>{
    if(isJSON(text)){
        try {
            const args = [text,reviver].map(x=>x ? x : null);
            return JSON.parse(text);
        } catch (details){
            const error ={message:'Error at @pbbbl/stringify parse(): This is likely not an error with @pbbbl/stringify, but with JSON.parse See below for more details...\n',details};
            console.warn(error);
            return text;
        }
    } else {
        throw new Error('@pbbbl/stringify parse(): This is not a valid JSON string created by @pbbbl/stringify stringify()');
    }
}
module.exports = {
    stringify,
    parse
}

// const tests = {
//  test0:stringify({
//      testId:0,
//         name: 'name',
//         age: 1,
//         undef:undefined,
//         nullval:null,
//         fnVal: function(){},
//         jsonVal: JSON.stringify({
//             name: 'name',
//         })
//     }),
//     test1:stringify({
//         testId:1,
//         name: 'name',
//         age: 1,
//     })
// }
// Object.keys(tests).forEach(key=>console.log(`${key}\n`,tests[key]));
