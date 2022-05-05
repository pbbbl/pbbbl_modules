
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./clean.cjs.production.min.js')
} else {
  module.exports = require('./clean.cjs.development.js')
}
