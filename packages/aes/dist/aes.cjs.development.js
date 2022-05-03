'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var crypto = require('crypto');
var serialize = _interopDefault(require('serialize-javascript'));

var Aes = /*#__PURE__*/require('aes-256-gcm');
var serializeOptions = {
  ignoreFunction: true
};
var delimiter = "PB13A35";

function encrypt(decrypted, secret) {
  if (typeof decrypted == 'undefined') throw new Error("decrypted is undefined");

  if (typeof secret != 'string' || secret == null) {
    secret = crypto.randomBytes(16).toString('hex');
  }

  var obj = {
    DECRYPTED: decrypted
  };
  var serialized = '';

  try {
    serialized = JSON.stringify(obj);
  } catch (_unused) {
    serialized = serialize(obj, serializeOptions);
  }

  var res = Aes.encrypt(serialized, secret);
  var encrypted = "" + res.ciphertext + delimiter + res.iv + delimiter + res.tag;
  return encrypted;
}

function decrypt(encrypted, secret) {
  var _encrypted$split = encrypted.split(delimiter),
      ciphertext = _encrypted$split[0],
      iv = _encrypted$split[1],
      tag = _encrypted$split[2];

  var serialized = Aes.decrypt(ciphertext, iv, tag, secret);
  var deserialized = eval('(' + serialized + ')');
  return deserialized.DECRYPTED;
}

exports.decrypt = decrypt;
exports.encrypt = encrypt;
//# sourceMappingURL=aes.cjs.development.js.map
