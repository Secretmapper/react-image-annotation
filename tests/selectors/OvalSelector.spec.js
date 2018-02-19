import { mount } from 'enzyme'
import { expect } from 'chai'
import React from 'react'

import { OvalSelector as selector } from '../../src/selectors'

function createOval ({ x, y, width, height } = { x: 10, y: 10, width: 20, height: 10 }) {
  return {
    x, y, width, height
  }
}

describe('OvalSelector', () => {
  describe('TYPE', () => {
    it('should be a defined string', () => {
      expect(selector.TYPE).to.be.a('string')
    })
  })

  describe('intersects', () => {
    it('should return true when point is inside geometry', () => {
      expect(
        selector.intersects({ x: 15, y: 15 }, createOval())
      ).to.be.true

      const x = 15
      const y = 17
      expect(
        selector.intersects({ x, y }, createOval())
      ).to.be.true
    })
    it('should return false when point is outside of geometry', () => {
      expect(selector.intersects({ x: 0, y: 0 }, createOval())).to.be.false
      expect(selector.intersects({ x: 10, y: 0 }, createOval())).to.be.false
      expect(selector.intersects({ x: 0, y: 10 }, createOval())).to.be.false
      expect(selector.intersects({ x: 30, y: 30 }, createOval())).to.be.false
    })
  })

  describe('area', () => {
    it('should return geometry area', () => {
      expect(selector.area(createOval())).to.equal(157.07963267948966)
    })
  })

  describe('methods', () => {
    xit('should be defined')
  })
})
