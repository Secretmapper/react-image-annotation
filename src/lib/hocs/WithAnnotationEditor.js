import React, { PureComponent as Component } from 'react'

const initialState = () => ({
  showEditor: false,
  selection: null,
  geometry: null,
  data: {}
})

const withAnnotationEditor = () => DecoratedComponent => {
  class WithAnnotationEditor extends Component {
    state = initialState()

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

    setShowEditor = (showEditor) => {
      this.setState({ showEditor })
    }

    clearState = () => {
      this.setState(initialState())
    }

    render () {
      const hocProps = {
        annotation: {
          containerRef: this.setContainer,

          getContainerHeightRatio: this.getContainerHeightRatio,
          getContainerWidthRatio: this.getContainerWidthRatio,

          showEditor: this.state.showEditor,
          setShowEditor: this.setShowEditor,

          selection: this.state.selection,
          setSelection: this.setSelection,

          geometry: this.state.geometry,
          setGeometry: this.setGeometry,

          data: this.state.data,
          clearState: this.clearState
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
