import { getCoordPercentage } from '../utils/offsetCoordinates'
export const TYPE = 'LINE'

export function intersects({ x, y }, geometry) {
	if (x < geometry.x) return false
	if (y < geometry.y) return false
	if (x > geometry.x + geometry.width) return false
	if (y > geometry.y + geometry.height) return false

	return true
}

export function area(geometry) {
	return geometry.height * geometry.width
}

export const methods = {
	onMouseDown(annotation, e) {
		if (!annotation.selection) {
			const { x: anchorX, y: anchorY } = getCoordPercentage(e)

			return {
				...annotation,
				id: Math.random(),
				selection: {
					...annotation.selection,
					mode: 'SELECTING',
					anchorX,
					anchorXpX: e.nativeEvent.offsetX,
					anchorYpX: e.nativeEvent.offsetY,
					anchorY
				}
			}
		} else {
			return {}
		}

		return annotation
	},

	onMouseUp(annotation, e) {
		if (annotation.selection) {
			const { selection, geometry } = annotation

			if (!geometry) {
				return {}
			}

			switch (annotation.selection.mode) {
				case 'SELECTING':
					return {
						...annotation,

						selection: {
							...annotation.selection,
							showEditor: true,
							mode: 'EDITING'
						}
					}
				default:
					break
			}
		}

		return annotation
	},

	onMouseMove(annotation, e) {
		if (annotation.selection && annotation.selection.mode === 'SELECTING') {
			const { anchorX, anchorY } = annotation.selection
			const { x: newX, y: newY } = getCoordPercentage(e)

			const { anchorXpX, anchorYpX } = annotation.selection
			const newXpX = e.nativeEvent.offsetX
			const newYpX = e.nativeEvent.offsetY
			const x = anchorX < newX ? anchorX : newX
			const y = anchorY < newY ? anchorY : newY
			const x1 = anchorX
			const y1 = anchorY
			const x2 = newX
			const y2 = newY

			const xPx = anchorXpX
			const yPx = anchorYpX
			const x2Px = newXpX
			const y2Px = newYpX
			const widthPx = xPx - x2Px
			const heightPx = yPx - y2Px
			const width = x - x2
			const height = y - y2

			return {
				...annotation,
				id: Math.random(),
				geometry: {
					...annotation.geometry,
					type: TYPE,
					x,
					y,
					x1,
					y1,
					x2,
					y2,
					xPx,
					yPx,
					x2Px,
					y2Px,
					widthPx: Math.abs(widthPx),
					heightPx: Math.abs(heightPx),
					width: Math.abs(width),
					height: Math.abs(height)
				}
			}
		}

		return annotation
	}
}

export default {
	TYPE,
	intersects,
	area,
	methods
}
