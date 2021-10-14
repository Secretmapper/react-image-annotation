import { MouseEvent, TouchEvent } from 'react';

const getMouseRelativeCoordinates = (e: MouseEvent) => {
  // nativeEvent.offsetX gives inconsistent results when dragging
  // up and to the left rather than the more natural down and to the
  // right. The reason could be browser implementation (it is still experimental)
  // or it could be that nativeEvent offsets are based on target rather than
  // currentTarget.
  // To keep consistent behavior of the selector use the bounding client rect.
  const rect = e.currentTarget.getBoundingClientRect();
  const offsetX = e.clientX - rect.x;
  const offsetY = e.clientY - rect.y;

  return {
    x: (offsetX / rect.width) * 100,
    y: (offsetY / rect.height) * 100,
  };
};

const clamp = (a: number, b: number, i: number) => Math.max(a, Math.min(b, i));

const getTouchRelativeCoordinates = (e: TouchEvent) => {
  const touch = e.targetTouches[0];

  const boundingRect = e.currentTarget.getBoundingClientRect();
  // https://idiallo.com/javascript/element-postion
  // https://stackoverflow.com/questions/25630035/javascript-getboundingclientrect-changes-while-scrolling
  const offsetX = touch.pageX - boundingRect.left;
  const offsetY = touch.pageY - (boundingRect.top + window.scrollY);

  return {
    x: clamp(0, 100, (offsetX / boundingRect.width) * 100),
    y: clamp(0, 100, (offsetY / boundingRect.height) * 100),
  };
};

const getCoordPercentage = (
  e: MouseEvent | TouchEvent,
): { x: number | null; y?: number | null } => {
  if (isTouchEvent(e)) {
    if (isValidTouchEvent(e)) {
      isTouchMoveEvent(e) && e.preventDefault();
      return getTouchRelativeCoordinates(e as TouchEvent);
    } else {
      return {
        x: null,
      };
    }
  } else {
    return getMouseRelativeCoordinates(e as MouseEvent);
  }
};

const isTouchEvent = (e: any) => e.targetTouches !== undefined;
const isValidTouchEvent = (e: any) => e.targetTouches.length === 1;
const isTouchMoveEvent = (e: any) => e.type === 'touchmove';

export {
  getMouseRelativeCoordinates as getOffsetCoordPercentage,
  getCoordPercentage,
};
