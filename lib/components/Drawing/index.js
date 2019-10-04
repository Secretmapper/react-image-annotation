'use strict';

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(['\n  display: block;\n\n  width: 100%;\n  height: 100%;\n  box-shadow: 0px 0px 1px 1px white inset;\n'], ['\n  display: block;\n\n  width: 100%;\n  height: 100%;\n  box-shadow: 0px 0px 1px 1px white inset;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var Container = _styledComponents2.default.svg(_templateObject);

function Drawing(props) {
  var prepareData = function prepareData() {
    if (geometry.coordinates.length > 0) {
      var cords = ['M ' + geometry.coordinates[0].x + ' ' + geometry.coordinates[0].y];
      geometry.coordinates.forEach(function (i, ind) {
        if (ind % 2 === 0) {
          cords.push(' L ' + i.x + ' ' + i.y);
        }
      });

      return cords.join(' ');
    }
  };
  var geometry = props.annotation.geometry;

  if (!geometry) return null;

  return _react2.default.createElement(
    Container,
    {
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none',
      className: props.className },
    _react2.default.createElement('path', { d: prepareData(), stroke: 'black', strokeWidth: 1, fill: 'none' })
  );
}

exports.default = Drawing;
module.exports = exports['default'];