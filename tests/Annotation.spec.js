import { mount } from 'enzyme'
import { expect } from 'chai'
import React from 'react'

import Annotation from '../src/components/Annotation'

const requiredProps = {
  annotations: []
}

describe('Annotation', () => {
  describe('render', () => {
    it('renders <Annotation />', () => {
      const wrapper = mount(<Annotation {...requiredProps} />)
      expect(wrapper.find('Annotation')).to.have.length(1)
    })
  })
})
