'use strict';

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(['\n  border: solid 3px white;\n  border-radius: 50%;\n  box-sizing: border-box;\n  box-shadow:\n    0 0 0 1px rgba(0,0,0,0.3),\n    0 0 0 2px rgba(0,0,0,0.2),\n    0 5px 4px rgba(0,0,0,0.4);\n  height: 16px;\n  position: absolute;\n  transform: translate3d(-50%, -50%, 0);\n  width: 16px;\n'], ['\n  border: solid 3px white;\n  border-radius: 50%;\n  box-sizing: border-box;\n  box-shadow:\n    0 0 0 1px rgba(0,0,0,0.3),\n    0 0 0 2px rgba(0,0,0,0.2),\n    0 5px 4px rgba(0,0,0,0.4);\n  height: 16px;\n  position: absolute;\n  transform: translate3d(-50%, -50%, 0);\n  width: 16px;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var Container = _styledComponents2.default.div(_templateObject);

function Point(props) {
  var geometry = props.annotation.geometry;

  if (!geometry) return null;

  return _react2.default.createElement(Container, {
    style: {
      top: geometry.y + '%',
      left: geometry.x + '%'
    }
  });
}

exports.default = Point;
module.exports = exports['default'];