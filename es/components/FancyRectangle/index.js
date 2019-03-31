var _templateObject = _taggedTemplateLiteralLoose(['\n  background: rgba(0, 0, 0, 0.2);\n  position: absolute;\n'], ['\n  background: rgba(0, 0, 0, 0.2);\n  position: absolute;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n'], ['\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n']);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from 'react';
import styled from 'styled-components';

var Box = styled.div(_templateObject);

var Container = styled.div(_templateObject2);

function FancyRectangle(props) {
  var geometry = props.annotation.geometry;


  if (!geometry) return null;

  return React.createElement(
    Container,
    {
      className: props.className,
      style: props.style
    },
    React.createElement(Box, {
      style: {
        height: geometry.y + '%',
        width: '100%'
      }
    }),
    React.createElement(Box, {
      style: {
        top: geometry.y + '%',
        height: geometry.height + '%',
        width: geometry.x + '%'
      }
    }),
    React.createElement(Box, {
      style: {
        top: geometry.y + '%',
        left: geometry.x + geometry.width + '%',
        height: geometry.height + '%',
        width: 100 - (geometry.x + geometry.width) + '%'
      }
    }),
    React.createElement(Box, {
      style: {
        top: geometry.y + geometry.height + '%',
        height: 100 - (geometry.y + geometry.height) + '%',
        width: '100%'
      }
    })
  );
}

FancyRectangle.defaultProps = {
  className: '',
  style: {}
};

export default FancyRectangle;