const {camelCase} = require('change-case-all');
const camel = camelCase;

const mod = {
    name: 'common',
    id: 'common-id',
    camelId: camel('common-id'),

    version: '2', // version
}

console.log({mod})

const getMod = ()=>{
    console.log({mod})
    return mod;
};
module.exports = {
    mod,
    getMod,
    default: getMod,
}
