'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

var _Editor = require('./Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _FancyRectangle = require('./FancyRectangle');

var _FancyRectangle2 = _interopRequireDefault(_FancyRectangle);

var _Rectangle = require('./Rectangle');

var _Rectangle2 = _interopRequireDefault(_Rectangle);

var _Oval = require('./Oval');

var _Oval2 = _interopRequireDefault(_Oval);

var _Content = require('./Content');

var _Content2 = _interopRequireDefault(_Content);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _selectors = require('../selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  innerRef: function innerRef() {},
  onChange: function onChange() {},
  onSubmit: function onSubmit() {},
  type: _selectors.RectangleSelector.TYPE,
  selectors: [_selectors.RectangleSelector, _selectors.PointSelector, _selectors.OvalSelector],
  disableAnnotation: false,
  disableSelector: false,
  disableEditor: false,
  disableOverlay: false,
  activeAnnotationComparator: function activeAnnotationComparator(a, b) {
    return a === b;
  },
  renderSelector: function renderSelector(_ref) {
    var annotation = _ref.annotation;

    switch (annotation.geometry.type) {
      case _selectors.RectangleSelector.TYPE:
        return _react2.default.createElement(_FancyRectangle2.default, {
          annotation: annotation
        });
      case _selectors.PointSelector.TYPE:
        return _react2.default.createElement(_Point2.default, {
          annotation: annotation
        });
      case _selectors.OvalSelector.TYPE:
        return _react2.default.createElement(_Oval2.default, {
          annotation: annotation
        });
      default:
        return null;
    }
  },
  renderEditor: function renderEditor(_ref2) {
    var annotation = _ref2.annotation,
        onChange = _ref2.onChange,
        onSubmit = _ref2.onSubmit;
    return _react2.default.createElement(_Editor2.default, {
      annotation: annotation,
      onChange: onChange,
      onSubmit: onSubmit
    });
  },
  renderHighlight: function renderHighlight(_ref3) {
    var key = _ref3.key,
        annotation = _ref3.annotation,
        active = _ref3.active;

    switch (annotation.geometry.type) {
      case _selectors.RectangleSelector.TYPE:
        return _react2.default.createElement(_Rectangle2.default, {
          key: key,
          annotation: annotation,
          active: active
        });
      case _selectors.PointSelector.TYPE:
        return _react2.default.createElement(_Point2.default, {
          key: key,
          annotation: annotation,
          active: active
        });
      case _selectors.OvalSelector.TYPE:
        return _react2.default.createElement(_Oval2.default, {
          key: key,
          annotation: annotation,
          active: active
        });
      default:
        return null;
    }
  },
  renderContent: function renderContent(_ref4) {
    var key = _ref4.key,
        annotation = _ref4.annotation;
    return _react2.default.createElement(_Content2.default, {
      key: key,
      annotation: annotation
    });
  },
  renderOverlay: function renderOverlay(_ref5) {
    var type = _ref5.type,
        annotation = _ref5.annotation;

    switch (type) {
      case _selectors.PointSelector.TYPE:
        return _react2.default.createElement(
          _Overlay2.default,
          null,
          'Click to Annotate'
        );
      default:
        return _react2.default.createElement(
          _Overlay2.default,
          null,
          'Click and Drag to Annotate'
        );
    }
  }
};
module.exports = exports['default'];