import {
  RectangleSelector,
  PointSelector,
  PolygonSelector,
  OvalSelector,
  LineSelector
} from '../../src/selectors'

export default {
  annotations: [
    {
      geometry: {
        type: RectangleSelector.TYPE,
        x: 25,
        y: 31,
        xPx: 176,
        yPx: 160,
        width: 21,
        height: 35
      },
      color: 'blue',
      data: {
        text: 'Annotate!',
        id: 1
      }
    },
    {
      data: {
        text: 'Line!',
        id: 4
      },
      color: 'brown',
      geometry: {
        type: 'LINE',
        x: 10.928571428571429,
        y: 28.299999999999997,
        x1: 10.928571428571429,
        y1: 31.900000000000002,
        x2: 21.357142857142858,
        y2: 28.299999999999997,
        xPx: 77,
        yPx: 160,
        x2Px: 150,
        y2Px: 142,
        widthPx: 73,
        heightPx: 18,
        width: 10.428571428571429,
        height: 0
      }
    },
    {
      geometry: {
        type: 'POLYGON',
        x: 41.214285714285715,
        y: 3.5000000000000004,
        width: 22.857142857142854,
        height: 20.8,
        points: [
          { x: 41.214285714285715, xPx: 288.5, yPx: 83.5, y: 16.7 },
          {
            x: 54.785714285714285,
            xPx: 383.5,
            yPx: 17.5,
            y: 3.5000000000000004
          },
          { x: 64.07142857142857, xPx: 448.5, yPx: 36.5, y: 7.3 },
          { x: 45.357142857142854, xPx: 317.5, yPx: 121.5, y: 24.3 },
          { x: 49.5, xPx: 346.5, yPx: 394.5, y: 78.9 }
        ]
      },
      color: 'red',
      data: {
        text: 'polygon!',
        id: 5
      }
    },
    {
      geometry: {
        x: 86.92857142857143,
        xPx: 608.5,
        yPx: 245.5,
        y: 49.1,
        width: 0,
        height: 0,
        type: PointSelector.TYPE
      },
      color: 'brown',
      data: {
        text: 'POINT!',
        id: 3
      }
    },
    {
      geometry: {
        type: OvalSelector.TYPE,
        x: 53,
        y: 33,
        xPx: 375,
        yPx: 165,
        width: 17.5,
        height: 28
      },
      color: 'red',
      data: {
        text: 'OVAL',
        id: 2
      }
    }
  ]
}
