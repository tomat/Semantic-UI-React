'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _Icon = require('../../elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DropdownHeader(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      icon = props.icon;

  var classes = (0, _classnames2.default)('header', className);
  var rest = (0, _lib.getUnhandledProps)(DropdownHeader, props);
  var ElementType = (0, _lib.getElementType)(DropdownHeader, props);

  if (children) {
    return _react2.default.createElement(
      ElementType,
      _extends({}, rest, { className: classes }),
      children
    );
  }

  return _react2.default.createElement(
    ElementType,
    _extends({}, rest, { className: classes }),
    _Icon2.default.create(icon),
    content
  );
}

DropdownHeader._meta = {
  name: 'DropdownHeader',
  parent: 'Dropdown',
  type: _lib.META.TYPES.MODULE
};

DropdownHeader.propTypes = {
  /** An element type to render as (string or function) */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _react.PropTypes.node,

  /** Additional classes. */
  className: _react.PropTypes.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Shorthand for Icon. */
  icon: _lib.customPropTypes.itemShorthand
};

exports.default = DropdownHeader;