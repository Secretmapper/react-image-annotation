import React, { PureComponent as Component } from 'react'

const withAnnotationEditor = () => DecoratedComponent => {
  class WithAnnotationEditor extends Component {
    state = {
      selection: null,
      geometry: null,
      data: null
    }

    setContainer = el => {
      this.container = el
    }

    getContainerHeightRatio = (value) => {
      return (value / this.container.height) * 100
    }

    getContainerWidthRatio = (value) => {
      return (value / this.container.width) * 100
    }

    setGeometry = (geometry) => {
      this.setState({ geometry })
    }

    setSelection = (selection) => {
      this.setState({ selection })
    }

    render () {
      const hocProps = {
        annotation: {
          containerRef: this.setContainer,

          getContainerHeightRatio: this.getContainerHeightRatio,
          getContainerWidthRatio: this.getContainerWidthRatio,

          isSelecting: !!this.state.selection,
          selection: this.state.selection,
          setSelection: this.setSelection,

          geometry: this.state.geometry,
          setGeometry: this.setGeometry
        }
      }

      return (
        <DecoratedComponent
          {...this.props}
          {...hocProps}
        />
      )
    }
  }

  WithAnnotationEditor.displayName = `WithAnnotationEditor(${DecoratedComponent.displayName})`

  return WithAnnotationEditor
}

export default withAnnotationEditor
