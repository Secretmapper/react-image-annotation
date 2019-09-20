const getCoordPercentage = e => ({
	x: (e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * 100,
	y: (e.nativeEvent.offsetY / e.currentTarget.offsetHeight) * 100
})

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
				selection: {
					...annotation.selection,
					mode: 'SELECTING',
					anchorX,
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
			const width = newX - anchorX
			const height = newY - anchorY
			let angle = (Math.atan(width / height) * 180) / Math.PI
			if (height < 0) {
				angle += 180
			} else if (height > 0 && width < 0) {
				angle += 360
			}
			const hypotenuse = Math.hypot(height, width)
			// console.log(
			// 	'width',
			// 	width,
			// 	'height',
			// 	height,
			// 	'hypotenuse',
			// 	hypotenuse
			// )
			console.log('anchorX', anchorX, 'anchorY', anchorY)
			// console.log('newX', newX, 'newY', newY)
			// console.log(angle)
			return {
				...annotation,
				geometry: {
					...annotation.geometry,
					type: TYPE,
					x: anchorX,
					y: anchorY,
					angle: angle,
					hypotenuse: hypotenuse,
					width: width,
					height: height
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
