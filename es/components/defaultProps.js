import React from 'react';

import Point from './Point';
import Editor from './Editor';
import FancyRectangle from './FancyRectangle';
import Rectangle from './Rectangle';
import Oval from './Oval';
import Content from './Content';
import Overlay from './Overlay';

import { RectangleSelector, PointSelector, OvalSelector } from '../selectors';

export default {
  innerRef: function innerRef() {},
  onChange: function onChange() {},
  onSubmit: function onSubmit() {},
  type: RectangleSelector.TYPE,
  selectors: [RectangleSelector, PointSelector, OvalSelector],
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
      case RectangleSelector.TYPE:
        return React.createElement(FancyRectangle, {
          annotation: annotation
        });
      case PointSelector.TYPE:
        return React.createElement(Point, {
          annotation: annotation
        });
      case OvalSelector.TYPE:
        return React.createElement(Oval, {
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
    return React.createElement(Editor, {
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
      case RectangleSelector.TYPE:
        return React.createElement(Rectangle, {
          key: key,
          annotation: annotation,
          active: active
        });
      case PointSelector.TYPE:
        return React.createElement(Point, {
          key: key,
          annotation: annotation,
          active: active
        });
      case OvalSelector.TYPE:
        return React.createElement(Oval, {
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
    return React.createElement(Content, {
      key: key,
      annotation: annotation
    });
  },
  renderOverlay: function renderOverlay(_ref5) {
    var type = _ref5.type,
        annotation = _ref5.annotation;

    switch (type) {
      case PointSelector.TYPE:
        return React.createElement(
          Overlay,
          null,
          'Click to Annotate'
        );
      default:
        return React.createElement(
          Overlay,
          null,
          'Click and Drag to Annotate'
        );
    }
  }
};