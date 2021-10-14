import { getCoordPercentage } from './../utils/offsetCoordinates';
import { IAnnotation, IGeometry, IPoint } from 'types/types';
import { MouseEvent, TouchEvent } from 'react';

const square = (n: number) => Math.pow(n, 2);

export const TYPE = 'OVAL';

export function intersects({ x, y }: IPoint, geometry: IGeometry) {
  const rx = geometry.width / 2;
  const ry = geometry.height / 2;
  const h = geometry.x + rx;
  const k = geometry.y + ry;

  const value = square(x - h) / square(rx) + square(y - k) / square(ry);

  return value <= 1;
}

export function area(geometry: IGeometry) {
  const rx = geometry.width / 2;
  const ry = geometry.height / 2;

  return Math.PI * rx * ry;
}

export const methods = {
  onTouchStart(annotation: IAnnotation, e: TouchEvent) {
    return pointerDown(annotation, e);
  },
  onTouchEnd(annotation: IAnnotation, e: TouchEvent) {
    return pointerUp(annotation, e);
  },
  onTouchMove(annotation: IAnnotation, e: TouchEvent) {
    return pointerMove(annotation, e);
  },
  onMouseDown(annotation: IAnnotation, e: MouseEvent) {
    return pointerDown(annotation, e);
  },
  onMouseUp(annotation: IAnnotation, e: MouseEvent) {
    return pointerUp(annotation, e);
  },
  onMouseMove(annotation: IAnnotation, e: MouseEvent) {
    return pointerMove(annotation, e);
  },
};

function pointerDown(annotation: IAnnotation, e: TouchEvent | MouseEvent) {
  if (!annotation.selection) {
    const { x: anchorX, y: anchorY } = getCoordPercentage(e);

    return {
      ...annotation,
      selection: {
        ...(annotation.selection ?? {}),
        mode: 'SELECTING',
        anchorX,
        anchorY,
      },
    };
  } else {
    return {};
  }
  return annotation;
}

function pointerUp(annotation: IAnnotation, e: TouchEvent | MouseEvent) {
  if (annotation.selection) {
    const { geometry } = annotation;

    if (!geometry) {
      return {};
    }

    switch (annotation.selection.mode) {
      case 'SELECTING':
        return {
          ...annotation,
          selection: {
            ...annotation.selection,
            showEditor: true,
            mode: 'EDITING',
          },
        };
      default:
        break;
    }
  }
  return annotation;
}

function pointerMove(annotation: IAnnotation, e: TouchEvent | MouseEvent) {
  if (annotation.selection && annotation.selection.mode === 'SELECTING') {
    const { anchorX, anchorY } = annotation.selection;
    const { x: newX, y: newY } = getCoordPercentage(e);
    const width = newX! - anchorX!;
    const height = newY! - anchorY!;

    return {
      ...annotation,
      geometry: {
        ...annotation.geometry,
        type: TYPE,
        x: width > 0 ? anchorX : newX,
        y: height > 0 ? anchorY : newY,
        width: Math.abs(width),
        height: Math.abs(height),
      },
    };
  }
  return annotation;
}

export default {
  TYPE,
  intersects,
  area,
  methods,
};
