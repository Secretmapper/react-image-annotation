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

    setGeometry = (geometry) => {
      this.setState({ geometry })
    }

    setSelection = (selection) => {
      this.setState({ selection })
    }

    setData = (data) => {
      this.setState({ data })
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
          showEditor: this.state.showEditor,
          setShowEditor: this.setShowEditor,

          selection: this.state.selection,
          setSelection: this.setSelection,

          geometry: this.state.geometry,
          setGeometry: this.setGeometry,

          data: this.state.data,
          setData: this.setData,

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
