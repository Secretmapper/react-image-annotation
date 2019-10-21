import { getCoordPercentage } from '../utils/offsetCoordinates'
export const TYPE = 'LINE'

export function intersects({ x, y }, geometry) {
	if (x < geometry.x) return false
	if (y < geometry.y) return false
	if (x > geometry.x + geometry.width) return false
	if (y > geometry.y + geometry.height) return false

	return false
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
			const { anchorXpX, anchorYpX } = annotation.selection
			const { x: newX, y: newY } = getCoordPercentage(e)
			const newXpX = e.nativeEvent.offsetX
			const newYpX = e.nativeEvent.offsetY
			const widthPx = newXpX - anchorXpX
			const heightPx = newYpX - anchorYpX
			const width = newX - anchorX
			const height = newY - anchorY
			let angle = (Math.atan(widthPx / heightPx) * 180) / Math.PI
			if (heightPx < 0) {
				angle += 180
			} else if (heightPx > 0 && widthPx < 0) {
				angle += 360
			}
			const hypotenuse = Math.hypot(heightPx, widthPx)

			return {
				...annotation,
				geometry: {
					...annotation.geometry,
					type: TYPE,
					x: anchorX,
					xPx: anchorXpX,
					yPx: anchorYpX,
					y: anchorY,
					x2: newX,
					y2: newY,
					x2Px: newXpX,
					y2Px: newYpX,
					angle: angle,
					hypotenuse: hypotenuse,
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
