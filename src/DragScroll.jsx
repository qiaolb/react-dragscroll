/**
 * Created by joe on 16/9/2.
 */

import React from "react";

class DragScroll extends React.Component {
    state = {
        data: props.dataSource,
        dragging: false
    };

    componentDidMount() {
        window.addEventListener('mouseup', this.mouseUpHandle.bind(this));
        window.addEventListener('mousemove', this.mouseMoveHandle.bind(this));
    }

    render() {
        let {
            children,
            style,
            ...etcProps,
        } = this.props;

        if (this.props.height && this.props.width) {
            sytle = {
                ...style,
                height: this.props.height,
                width: this.props.width,
                overflow: 'auto',
            };
        }
        return (
            <div
                {...etcProps}
                style={style}
                onMouseUp={this.mouseUpHandle.bind(this)}
                onMouseMove={this.mouseMoveHandle.bind(this)}
                ref={(r) => this.container = r}
            >
                {children && this.renderChildren(children)}
            </div>
        );
    }

    renderChildren(e) {
        return React.Children.map(e, (item, index) => 
            React.cloneElement(
                item,
                {
                    ...item.props,
                    key: item.key || index,
                    onMouseUp: this.mouseUpHandle.bind(this),
                    onMouseDown: this.mouseDownHandle.bind(this)
                }
            )
        );
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.mouseUpHandle.bind(this));
        window.removeEventListener('mousemove', this.mouseMoveHandle.bind(this));
    }

    mouseUpHandle(e) {
        if (this.state.dragging) {
            this.setState({ dragging: false });
        }
    }

    mouseDownHandle(e) {
        e.preventDefault();
        if (!this.state.dragging) {
            this.setState({ dragging: false });
            this.lastClientX = e.clientX;
            this.lastClientY = e.clientY;
        }
    }

    mouseMoveHandle(e) {
        if (this.state.dragging) {
            this.container.scrollLeft -=
                (-this.lastClientX + (this.lastClientX = e.clientX));
            this.container.scrollTop -=
                (-this.lastClientY + (this.lastClientY = e.clientY));
        }
    }
}

export default DragScroll;