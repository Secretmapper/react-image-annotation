'use strict';

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(['\n  padding: 8px 16px;\n\n  textarea {\n    border: 0;\n    font-size: 14px;\n    margin: 6px 0;\n    min-height: 60px;\n    outline: 0;\n  }\n'], ['\n  padding: 8px 16px;\n\n  textarea {\n    border: 0;\n    font-size: 14px;\n    margin: 6px 0;\n    min-height: 60px;\n    outline: 0;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  background: whitesmoke;\n  border: 0;\n  box-sizing: border-box;\n  color: #363636;\n  cursor: pointer;\n  font-size: 1rem;\n  margin: 0;\n  outline: 0;\n  padding: 8px 16px;\n  text-align: center;\n  text-shadow: 0 1px 0 rgba(0,0,0,0.1);\n  width: 100%;\n\n  transition: background 0.21s ease-in-out;\n\n  &:focus, &:hover {\n    background: #eeeeee;\n  }\n'], ['\n  background: whitesmoke;\n  border: 0;\n  box-sizing: border-box;\n  color: #363636;\n  cursor: pointer;\n  font-size: 1rem;\n  margin: 0;\n  outline: 0;\n  padding: 8px 16px;\n  text-align: center;\n  text-shadow: 0 1px 0 rgba(0,0,0,0.1);\n  width: 100%;\n\n  transition: background 0.21s ease-in-out;\n\n  &:focus, &:hover {\n    background: #eeeeee;\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var Inner = _styledComponents2.default.div(_templateObject);

var Button = _styledComponents2.default.div(_templateObject2);

function TextEditor(props) {
  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      Inner,
      null,
      _react2.default.createElement('textarea', {
        placeholder: 'Write description',
        onFocus: props.onFocus,
        onBlur: props.onBlur,
        onChange: props.onChange,
        value: props.value
      })
    ),
    props.value && _react2.default.createElement(
      Button,
      {
        onClick: props.onSubmit
      },
      'Submit'
    )
  );
}

exports.default = TextEditor;
module.exports = exports['default'];