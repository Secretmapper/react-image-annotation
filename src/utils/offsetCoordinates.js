function getOffsetCoordinates(e, container) {
    // nativeEvent.offsetX gives inconsistent results when dragging
    // up and to the left rather than the more natural down and to the
    // right. The reason could be browser implementation (it is still experimental)
    // or it could be that nativeEvent offsets are based on target rather than
    // currentTarget.
    // To keep consistent behavior of the selector use the bounding client rect.
    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.x;
    const offsetY = e.clientY - rect.y;
    return ({
        offsetX: offsetX,
        offsetY: offsetY
    });
}

function getOffsetCoordPercentage(e, container) {
    const { offsetX, offsetY } = getOffsetCoordinates(e, container);
    return {
        x: offsetX / container.offsetWidth * 100,
        y: offsetY / container.offsetHeight * 100
    };
}

function getCoordPercentage(e) {    
    return getOffsetCoordPercentage(e, e.currentTarget);
}


export { getOffsetCoordPercentage, getCoordPercentage };