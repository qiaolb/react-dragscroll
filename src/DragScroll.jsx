import React, { useState, useCallback, useRef, useMemo } from "react";

export default function DragScroll({ className, children, mobileDisabled = true }) {

    const [dragging, setDragging] = useState(false);
    const [lastPosition, setPosition] = useState({ x: 0, y: 0 });
    const container = useRef(null);

    const isMobile = useMemo(() => {
        return isDeviceMobile();
    }, []);

    const mouseUp = useCallback(() => {
        if (dragging) {
            setDragging(false);
        }
    }, [dragging]);

    const mouseDown = useCallback(e => {
        if (dragging === false) {
            setDragging(true);
            setPosition({ x: e.clientX, y: e.clientY });
        }
    }, [dragging]);
    const mouseMove = useCallback(e => {
        if (dragging) {
            container.current.scrollLeft -= (-lastPosition.x + e.clientX);
            container.current.scrollTop -= (-lastPosition.y + e.clientY);
            setPosition({ x: e.clientX, y: e.clientY });
        }
    }, [container, dragging, lastPosition]);

    if (mobileDisabled && isMobile) {
        return <div className={className}>{children}</div>
    }

    return (
        <div className={className}
            onMouseUp={mouseUp}
            onMouseDown={mouseDown}
            onMouseMove={mouseMove}
            ref={container}>
            {children}
        </div>
    );

}


function isDeviceMobile() {
    return window.matchMedia("(max-width: 992px)").matches;
}
