import { mount } from 'enzyme'
import { expect } from 'chai'
import React from 'react'

import { PolygonSelector as selector } from '../../src/selectors'

function createPolygon ({ points } = { points: [{x: 10, y: 10}, {x: 90, y: 10}, {x: 50, y: 90}] }) {
  return {
    points
  }
}

describe('PolygonSelector', () => {
  describe('TYPE', () => {
    it('should be a defined string', () => {
      expect(selector.TYPE).to.be.a('string')
    })
  })

  describe('intersects', () => {
    it('should return true when point is on top left of geometry', () => {
      expect(
        selector.intersects({ x: 10, y: 10 }, createPolygon())
      ).to.be.true
    })
    it('should return true when point is on top right of geometry', () => {
      expect(
        selector.intersects({ x: 90, y: 10 }, createPolygon())
      ).to.be.true
    })
    it('should return true when point is on bottom left of geometry', () => {
      expect(
        selector.intersects({ x: 40, y: 60 }, createPolygon())
      ).to.be.true
    })
    it('should return true when point is on bottom right of geometry', () => {
      expect(
        selector.intersects({ x: 60, y: 60 }, createPolygon())
      ).to.be.true
    })
    it('should return true when point is on bottom center of geometry', () => {
      expect(
        selector.intersects({ x: 50, y: 90 }, createPolygon())
      ).to.be.true
    })
    it('should return true when point is inside geometry', () => {
      expect(
        selector.intersects({ x: 50, y: 50 }, createPolygon())
      ).to.be.true
    })
    it('should return false when point is outside of geometry', () => {
      expect(selector.intersects({ x: 0, y: 0 }, createPolygon())).to.be.false
      expect(selector.intersects({ x: 100, y: 0 }, createPolygon())).to.be.false
      expect(selector.intersects({ x: 0, y: 100 }, createPolygon())).to.be.false
      expect(selector.intersects({ x: 100, y: 100 }, createPolygon())).to.be.false
      expect(selector.intersects({ x: 10, y: 20 }, createPolygon())).to.be.false
      expect(selector.intersects({ x: 90, y: 20 }, createPolygon())).to.be.false
    })
  })

  describe('area', () => {
    it('should return geometry area', () => {
      expect(selector.area(createPolygon())).to.equal(3200)
    })
  })

  describe('methods', () => {
    xit('should be defined')
  })
})
