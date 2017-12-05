(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["react"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by joe on 16/9/2.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var DragScroll = function (_React$Component) {
	  _inherits(DragScroll, _React$Component);

	  function DragScroll(props) {
	    _classCallCheck(this, DragScroll);

	    var _this = _possibleConstructorReturn(this, (DragScroll.__proto__ || Object.getPrototypeOf(DragScroll)).call(this, props));

	    _this.state = {
	      data: props.dataSource,
	      dragging: false
	    };
	    return _this;
	  }

	  _createClass(DragScroll, [{
	    key: "render",
	    value: function render() {
	      var sytle = null;
	      if (this.props.height && this.props.width) {
	        sytle = { style: { height: this.props.height, width: this.props.width, overflow: 'auto' } };
	      }
	      return _react2.default.createElement(
	        "div",
	        _extends({ className: this.props.className }, sytle, {
	          onMouseUp: this.mouseUpHandle.bind(this),
	          onMouseMove: this.mouseMoveHandle.bind(this),
	          ref: "container" }),
	        this.props.children && this.renderChildren(this.props.children)
	      );
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      window.addEventListener('mouseup', this.mouseUpHandle.bind(this));
	      window.addEventListener('mousemove', this.mouseMoveHandle.bind(this));
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      window.removeEventListener('mouseup', this.mouseUpHandle.bind(this));
	      window.removeEventListener('mousemove', this.mouseMoveHandle.bind(this));
	    }
	  }, {
	    key: "mouseUpHandle",
	    value: function mouseUpHandle(e) {
	      if (this.state.dragging) {
	        this.state.dragging = false;
	        this.setState(this.state);
	      }
	    }
	  }, {
	    key: "mouseDownHandle",
	    value: function mouseDownHandle(e) {
	      if (!this.state.dragging) {
	        this.state.dragging = true;
	        this.setState(this.state);
	        this.lastClientX = e.clientX;
	        this.lastClientY = e.clientY;
	        e.preventDefault();
	      }
	    }
	  }, {
	    key: "mouseMoveHandle",
	    value: function mouseMoveHandle(e) {
	      if (this.state.dragging) {
	        this.refs.container.scrollLeft -= -this.lastClientX + (this.lastClientX = e.clientX);
	        this.refs.container.scrollTop -= -this.lastClientY + (this.lastClientY = e.clientY);
	      }
	    }
	  }, {
	    key: "renderChildren",
	    value: function renderChildren(dom, type) {
	      var _this2 = this;

	      if (this.isArray(dom)) {
	        return dom.map(function (item, index) {
	          return _react2.default.cloneElement(item, {
	            key: item.key || index,
	            onMouseUp: _this2.mouseUpHandle.bind(_this2),
	            onMouseDown: _this2.mouseDownHandle.bind(_this2)
	          });
	        });
	      } else if ('object' == (typeof dom === "undefined" ? "undefined" : _typeof(dom))) {
	        return _react2.default.cloneElement(dom, {
	          onMouseUp: this.mouseUpHandle.bind(this),
	          onMouseDown: this.mouseDownHandle.bind(this)
	        });
	      }
	    }
	  }, {
	    key: "isArray",
	    value: function isArray(object) {
	      return object && (typeof object === "undefined" ? "undefined" : _typeof(object)) === 'object' && typeof object.length === 'number' && typeof object.splice === 'function' &&
	      //判断length属性是否是可枚举的 对于数组 将得到false
	      !object.propertyIsEnumerable('length');
	    }
	  }]);

	  return DragScroll;
	}(_react2.default.Component);

	exports.default = DragScroll;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ])
});
;