
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./aes.cjs.production.min.js')
} else {
  module.exports = require('./aes.cjs.development.js')
}
