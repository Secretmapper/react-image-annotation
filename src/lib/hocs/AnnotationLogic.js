import React, { PureComponent as Component } from 'react'

const annotationLogic = (key = 'annotation') => DecoratedComponent => {
  class AnnotationLogic extends Component {
    state = {
      data: null,
      geometry: null
    }

    setSelectionGeometry = (geometry) => {
      this.setState({ geometry })
    }

    render () {
      const hocProps = {
        [key]: {
          data: this.state.data,
          geometry: this.state.geometry
        },
        disableSelect: !!this.state.geometry,
        isEditing: !!this.state.geometry,
        setSelectionGeometry: this.setSelectionGeometry
      }

      return (
        <DecoratedComponent
          {...this.props}
          {...hocProps}
        />
      )
    }
  }

  AnnotationLogic.displayName = `AnnnotationLogic(${DecoratedComponent.displayName})`

  return AnnotationLogic
}

export default annotationLogic
