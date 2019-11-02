function getOffsetCoordPercentage(e, container) {
    // nativeEvent.offsetX gives inconsistent results when dragging
    // up and to the left rather than the more natural down and to the
    // right. The reason could be browser implementation (it is still experimental)
    // or it could be that nativeEvent offsets are based on target rather than
    // currentTarget.
    // To keep consistent behavior of the selector use the bounding client rect.
    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.x;
    const offsetY = e.clientY - rect.y;

    return {
        x: offsetX / rect.width * 100,
        y: offsetY / rect.height * 100
    };
}

function getCoordPercentage(e) {
    return getOffsetCoordPercentage(e, e.currentTarget);
}


export { getOffsetCoordPercentage, getCoordPercentage };