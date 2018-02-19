import { mount } from 'enzyme'
import { expect } from 'chai'
import React from 'react'

import { PointSelector as selector } from '../../src/selectors'

function createPoint ({ x, y } = { x: 10, y: 10 }) {
  return { x, y }
}

function createContainer({ width, height } = { width: 100, height: 100 }) {
  return { width, height }
}

describe('PoinntSelector', () => {
  describe('TYPE', () => {
    it('should be a defined string', () => {
      expect(selector.TYPE).to.be.a('string')
    })
  })

  describe('intersects', () => {
    it('should return true when point is inside geometry', () => {
      expect(
        selector.intersects({ x: 10, y: 10 }, createPoint(), createContainer())
      ).to.be.true
    })
    it('should return false when point is outside of geometry', () => {
      expect(selector.intersects({ x: 0, y: 0 }, createPoint(), createContainer())).to.be.false
      expect(selector.intersects({ x: 10, y: 0 }, createPoint(), createContainer())).to.be.false
      expect(selector.intersects({ x: 0, y: 10 }, createPoint(), createContainer())).to.be.false
      expect(selector.intersects({ x: 30, y: 30 }, createPoint(), createContainer())).to.be.false
    })
  })

  describe('area', () => {
    it('should return geometry area', () => {
      expect(
        selector.area(createPoint(), createContainer())
      ).to.equal(36)
    })
    it('should return geometry area based on container', () => {
      expect(
        selector.area(createPoint(), createContainer({ width: 200, height: 200 }))
      ).to.equal(9)
    })
  })

  describe('methods', () => {
    xit('should be defined')
  })
})
