'use strict';

exports.__esModule = true;
exports.defaultProps = undefined;

var _defaultProps = require('./components/defaultProps');

Object.defineProperty(exports, 'defaultProps', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_defaultProps).default;
  }
});

var _Annotation = require('./components/Annotation');

var _Annotation2 = _interopRequireDefault(_Annotation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Annotation2.default;