import { mount } from 'enzyme'
import { expect } from 'chai'
import React from 'react'

import { RectangleSelector as selector } from '../../src/selectors'

function createRect ({ x, y, width, height } = { x: 10, y: 10, width: 10, height: 10 }) {
  return {
    x, y, width, height
  }
}

describe('RectangleSelector', () => {
  describe('TYPE', () => {
    it('should be a defined string', () => {
      expect(selector.TYPE).to.be.a('string')
    })
  })

  describe('intersects', () => {
    it('should return true when point is on top left of geometry', () => {
      expect(
        selector.intersects({ x: 10, y: 10 }, createRect())
      ).to.be.true
    })
    it('should return true when point is on top right of geometry', () => {
      expect(
        selector.intersects({ x: 20, y: 10 }, createRect())
      ).to.be.true
    })
    it('should return true when point is on bottom left of geometry', () => {
      expect(
        selector.intersects({ x: 10, y: 20 }, createRect())
      ).to.be.true
    })
    it('should return true when point is on bottom right of geometry', () => {
      expect(
        selector.intersects({ x: 20, y: 20 }, createRect())
      ).to.be.true
    })
    it('should return true when point is inside geometry', () => {
      expect(
        selector.intersects({ x: 15, y: 15 }, createRect())
      ).to.be.true
    })
    it('should return false when point is outside of geometry', () => {
      expect(selector.intersects({ x: 0, y: 0 }, createRect())).to.be.false
      expect(selector.intersects({ x: 10, y: 0 }, createRect())).to.be.false
      expect(selector.intersects({ x: 0, y: 10 }, createRect())).to.be.false
      expect(selector.intersects({ x: 30, y: 30 }, createRect())).to.be.false
    })
  })

  describe('area', () => {
    it('should return geometry area', () => {
      expect(selector.area(createRect({ width: 10, height: 10 }))).to.equal(100)
    })
  })

  describe('methods', () => {
    xit('should be defined')
  })
})
