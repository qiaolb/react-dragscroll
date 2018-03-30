/**
 * Created by joe on 16/9/2.
 */

import React from "react";

export default class DragScroll extends React.Component {
  static computeStyle(props) {
    if (props.height && props.width) {
      return {style: {height: props.height, width: props.width, overflow: 'auto'}};
    }
    return null;
  }
  container;
  constructor(props) {
    super(props);
    this.state = {
      data: props.dataSource,
      dragging: false,
      containerStyle: DragScroll.computeStyle(props),
    };

    this.mouseDownHandle = this.mouseDownHandle.bind(this);
    this.mouseMoveHandle = this.mouseMoveHandle.bind(this);
    this.mouseUpHandle = this.mouseUpHandle.bind(this);
  }
  
  render() {
    return <div className={this.props.className} {...this.state.containerStyle}
                onMouseUp={this.mouseUpHandle}
                onMouseMove={this.mouseMoveHandle}
                ref={(e) => {this.container = e;}}>
      {this.props.children && this.renderChildren(this.props.children)}
    </div>;
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.mouseUpHandle);
    window.addEventListener('mousemove', this.mouseMoveHandle);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.containerStyle 
      || (prevState.containerStyle.style.height !== nextProps.height 
      || prevState.containerStyle.style.width !== nextProps.width)) {
     return { containerStyle: DragScroll.computeStyle(nextProps) };
    }
    return null;
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.mouseUpHandle);
    window.removeEventListener('mousemove', this.mouseMoveHandle);
  }

  mouseUpHandle(e) {
    if (this.state.dragging) {
      this.state.dragging = false;
      this.setState(this.state);
    }
  }

  mouseDownHandle(e) {
    if (!this.state.dragging) {
      this.state.dragging = true;
      this.setState(this.state);
      this.lastClientX = e.clientX;
      this.lastClientY = e.clientY;
      e.preventDefault();
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

  renderChildren(dom, type) {
    if (this.isArray(dom)) {
      return dom.map((item, index) => {
        return React.cloneElement(item, {
          key: item.key || index,
          onMouseUp: this.mouseUpHandle,
          onMouseDown: this.mouseDownHandle
        });
      });
    } else if ('object' == typeof dom) {
      return React.cloneElement(dom, {
        onMouseUp: this.mouseUpHandle,
        onMouseDown: this.mouseDownHandle
      });
    }
  }

  isArray(object){
    return  object && typeof object==='object' &&
      typeof object.length==='number' &&
      typeof object.splice==='function' &&
      //判断length属性是否是可枚举的 对于数组 将得到false
      !(object.propertyIsEnumerable('length'));
  }
}
