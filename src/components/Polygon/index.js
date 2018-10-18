import React from 'react'
import LineTo from 'react-lineto'
import './index.css'

function edgesFromPoints(points) {
  if (!points || points.length < 3) return [];

  const edges = [];
  for (let i = 0; i < points.length; ++i) {
    if (i + 1 === points.length) {
      edges.push(Math.hypot(points[0].x-points[i].x, points[0].y-points[i].y));
    } else {
      edges.push(Math.hypot(points[i + 1].x-points[i].x, points[i + 1].y-points[i].y));
    }
  }

  return edges;
}

function Polygon (props) {
  const { geometry } = props.annotation
  if (!geometry || !geometry.points || geometry.points.length < 3) return null

  return (
    <div
      className={`linesContainer ${props.className}`}
      style={{
        width: '100%',
        height: '100%',
        ...props.style
      }}
    >
      {geometry.points.map((item,i) => { // Iterate over points to create the edge lines
        let prevItem;
        if (i === 0) { // First point (links from last to first)
          prevItem = geometry.points[geometry.points.length - 1];
        } else {
          prevItem = geometry.points[i - 1];
        }
        return (
          // Note that each LineTo element must have a unique key (unique relative to the connected points)
          <LineTo
            key={i + "_" + item.x + "_" + item.y + "_" + prevItem.x + "_" + prevItem.y}
            from="linesContainer"
            fromAnchor={item.x + "% " + item.y + "%"}
            to="linesContainer"
            toAnchor={prevItem.x + "% " + prevItem.y + "%"}
            borderColor={'black'}
            borderStyle={'dashed'}
            borderWidth={2}
            className={(!props.active) ? "Polygon-LineTo" : "Polygon-LineToActive"}
          />
        )
      })}
    </div>
  )
}

Polygon.defaultProps = {
  className: '',
  style: {}
}

export default Polygon
