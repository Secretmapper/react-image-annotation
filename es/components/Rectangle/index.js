var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n  border: dashed 2px black;\n  box-shadow: 0px 0px 1px 1px white inset;\n  box-sizing: border-box;\n  transition: box-shadow 0.21s ease-in-out;\n'], ['\n  border: dashed 2px black;\n  box-shadow: 0px 0px 1px 1px white inset;\n  box-sizing: border-box;\n  transition: box-shadow 0.21s ease-in-out;\n']);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from 'react';
import styled from 'styled-components';

var Container = styled.div(_templateObject);

function Rectangle(props) {
  var geometry = props.annotation.geometry;

  if (!geometry) return null;

  return React.createElement(Container, {
    className: props.className,
    style: _extends({
      position: 'absolute',
      left: geometry.x + '%',
      top: geometry.y + '%',
      height: geometry.height + '%',
      width: geometry.width + '%',
      boxShadow: props.active && '0 0 1px 1px yellow inset'
    }, props.style)
  });
}

Rectangle.defaultProps = {
  className: '',
  style: {}
};

export default Rectangle;