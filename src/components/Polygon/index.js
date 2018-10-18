import React from 'react'
// import styled from 'styled-components'
import LineTo from 'react-lineto';

// const Container = styled.div`
//   border: dashed 2px black;
//   box-shadow: 0px 0px 1px 1px white inset;
//   box-sizing: border-box;
//   transition: box-shadow 0.21s ease-in-out;
// `

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
          <LineTo
            key={i + "_" + item.x + "_" + item.y + "_" + prevItem.x + "_" + prevItem.y}
            from="linesContainer"
            fromAnchor={item.x + "% " + item.y + "%"}
            to="linesContainer"
            toAnchor={prevItem.x + "% " + prevItem.y + "%"}
          />
        )
      })}
    </div>
  )

  // return (
  //   <Container
  //     className={props.className}
  //     style={{
  //       position: 'absolute',
  //       left: `${geometry.x}%`,
  //       top: `${geometry.y}%`,
  //       height: `${geometry.height}%`,
  //       width: `${geometry.width}%`,
  //       boxShadow: props.active && '0 0 1px 1px yellow inset',
  //       ...props.style
  //     }}
  //   />
  // )
}

Polygon.defaultProps = {
  className: '',
  style: {}
}

export default Polygon
