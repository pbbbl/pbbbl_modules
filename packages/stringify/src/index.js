const clean = require('@pbbbl/clean-deep');
const {copy} = require('copy-anything');
const {isArray, isEmptyArray, isDefined,isObject} = require('@pbbbl/is');
const isJSON = require('is-json');
/**
 * @param {*} value
 * @param {*} replacer
 * @param {*} space
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
            const spaceArgs = [space].filter(x=>x ? true : false);
            const replacerArgs = [replacer].filter(x=>x ? true : false);
            return JSON.stringify(value,...replacerArgs,...spaceArgs);
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

/**
 * 
 * @param {*} text 
 * @param {*} reviver 
 * @returns 
 */
const parse= (text,reviver=null)=>{
    if(isJSON(text)){
        try {


            const reviverArgs = [reviver].filter(x=>x ? true : false);
            return JSON.parse(text,...reviverArgs);

            // return JSON.parse(text,reviver);
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
//     },null)
// }
// Object.keys(tests).forEach(key=>console.log(`${key}\n`,tests[key]));
