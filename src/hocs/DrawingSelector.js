const MARGIN = 12
export const TYPE = 'DRAWING'
const marginToPercentage = container => ({
	marginX: (MARGIN / container.width) * 100,
	marginY: (MARGIN / container.height) * 100
})
export function intersects({ x, y }, geometry, container) {
	const { marginX, marginY } = marginToPercentage(container)
	if (x < geometry.boxX - marginX) {
		return false
	}
	if (y < geometry.boxY - marginY) {
		return false
	}
	if (x > geometry.boxX + geometry.boxWidth + marginX) {
		return false
	}

	if (y > geometry.boxY + geometry.boxHeight + marginY) {
		return false
	}

	return true
}

export function area(geometry, container) {
	return geometry.boxHeight * geometry.boxWidth
}

export const methods = {
	onMouseDown: (annotation, e) => {
		return onPointerDown(annotation, e)
	},
	onMouseMove: (annotation, e) => {
		return onPointerMove(annotation, e)
	},
	onMouseUp: (annotation, e) => {
		return onPointerUp(annotation, e)
	},
	onTouchStart: (annotation, e) => {
		return onPointerDown(annotation, e)
	},
	onTouchMove: (annotation, e) => {
		return onPointerMove(annotation, e)
	},
	onTouchEnd: (annotation, e) => {
		return onPointerUp(annotation, e)
	}
}

function onPointerDown(annotation, e) {
	if (!annotation.geometry) {
		console.log('GG')
		const newPoint = relativeCoordinatesForEvent(e)
		return {
			...annotation,
			selection: {
				...annotation.selection,
				showEditor: false,
				mode: 'SELECTING'
			},
			geometry: {
				coordinates: [],
				x: newPoint.x,
				y: newPoint.y,
				boxX: newPoint.x,
				boxY: newPoint.y,
				boxHeight: 0,
				boxWidth: 0,
				type: TYPE
			},
			data: {
				id: Math.random()
			}
		}
	} else {
		return {}
	}
}

function onPointerMove(annotation, e) {
	if (annotation.selection && annotation.selection.mode === 'SELECTING') {
		let { y, boxX, boxY, boxHeight, boxWidth } = annotation.geometry
		const newPoint = relativeCoordinatesForEvent(e)
		if (newPoint.y < y || !y) {
			y = newPoint.y
		}
		if (newPoint.y < boxY || !boxY) {
			boxHeight += boxY - newPoint.y
			boxY = newPoint.y
		} else if (newPoint.y > boxY + boxHeight || !boxHeight) {
			boxHeight = newPoint.y - boxY
		}
		if (newPoint.x < boxX || !boxX) {
			boxWidth += boxX - newPoint.x
			boxX = newPoint.x
		} else if (newPoint.x > boxX + boxWidth || !boxWidth) {
			boxWidth = newPoint.x - boxX
		}

		const middle = annotation.geometry.coordinates.reduce(
			(prev, curr) => ({
				x: prev.x + curr.x,
				y: prev.y + curr.y
			}),
			{ x: 0, y: 0 }
		)
		middle.x /= annotation.geometry.coordinates.length
		middle.y /= annotation.geometry.coordinates.length

		return {
			...annotation,
			selection: {
				...annotation.selection,
				showEditor: false,
				mode: 'SELECTING'
			},
			geometry: {
				coordinates: [
					...annotation.geometry.coordinates,
					relativeCoordinatesForEvent(e)
				],
				x: middle.x,
				y,
				boxX,
				boxY,
				boxHeight,
				boxWidth,
				// ...getCoordPercentage(e),
				type: TYPE
			}
		}
	} else {
		return annotation
	}
}
function onPointerUp(annotation, e) {
	if (annotation.selection) {
		const { geometry } = annotation

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
}

function relativeCoordinatesForEvent(e) {
	if (isTouchEvent(e)) {
		if (isValidTouchEvent(e)) {
			e.preventDefault()
			return getTouchRelativeCoordinates(e)
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	} else {
		return getMouseRelativeCoordinates(e)
	}
}

const isTouchEvent = e => e.targetTouches !== undefined
const isValidTouchEvent = e => e.targetTouches.length === 1
const getTouchRelativeCoordinates = e => {
	const touch = e.targetTouches[0]
	const boundingRect = e.currentTarget.getBoundingClientRect()
	const offsetX = touch.pageX - boundingRect.left
	const offsetY = touch.pageY - (boundingRect.top + window.scrollY)

	return {
		x: (offsetX / boundingRect.width) * 100,
		y: (offsetY / boundingRect.height) * 100
	}
}
function getMouseRelativeCoordinates(e) {
	return {
		x: (e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * 100,
		y: (e.nativeEvent.offsetY / e.currentTarget.offsetHeight) * 100
	}
}

export default {
	TYPE,
	intersects,
	area,
	methods
}
