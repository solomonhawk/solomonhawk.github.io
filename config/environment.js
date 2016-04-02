var path = require('path')

exports.root = path.resolve(__dirname, '..')

exports.isDevelopment = process.env.NODE_ENV === 'development'

exports.babel = {
  "presets" : [
    "es2015",
    "stage-1",
    "react"
  ],
  "plugins": [
    "transform-object-assign",
    "transform-runtime"
  ],
  "env": {
    "development": {
      "presets": [
        "react-hmre"
      ]
    }
  }
}
