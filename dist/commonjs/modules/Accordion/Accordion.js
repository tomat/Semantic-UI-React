'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _Icon = require('../../elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _AccordionContent = require('./AccordionContent');

var _AccordionContent2 = _interopRequireDefault(_AccordionContent);

var _AccordionTitle = require('./AccordionTitle');

var _AccordionTitle2 = _interopRequireDefault(_AccordionTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An accordion allows users to toggle the display of sections of content
 */
var Accordion = function (_Component) {
  _inherits(Accordion, _Component);

  function Accordion() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Accordion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.handleTitleClick = function (e, index) {
      var onTitleClick = _this.props.onTitleClick;
      var activeIndex = _this.state.activeIndex;


      _this.trySetState({
        activeIndex: index === activeIndex ? -1 : index
      });
      if (onTitleClick) onTitleClick(e, index);
    }, _this.renderChildren = function () {
      var children = _this.props.children;
      var activeIndex = _this.state.activeIndex;


      return _react.Children.map(children, function (child, i) {
        var isTitle = child.type === _AccordionTitle2.default;
        var isContent = child.type === _AccordionContent2.default;

        if (isTitle) {
          var isActive = (0, _has3.default)(child, 'props.active') ? child.props.active : activeIndex === i;
          var onClick = function onClick(e) {
            _this.handleTitleClick(e, i);
            if (child.props.onClick) child.props.onClick(e, i);
          };
          return (0, _react.cloneElement)(child, _extends({}, child.props, { active: isActive, onClick: onClick }));
        }

        if (isContent) {
          // content must be the a sibling too title
          // it is active if the active title index that precedes it is active
          var _isActive = (0, _has3.default)(child, 'props.active') ? child.props.active : activeIndex === i - 1;
          return (0, _react.cloneElement)(child, _extends({}, child.props, { active: _isActive }));
        }

        return child;
      });
    }, _this.renderPanels = function () {
      var panels = _this.props.panels;
      var activeIndex = _this.state.activeIndex;

      var children = [];

      (0, _each3.default)(panels, function (panel, i) {
        var isActive = (0, _has3.default)(panel, 'active') ? panel.active : activeIndex === i;

        var onClick = function onClick(e) {
          _this.handleTitleClick(e, i);
          if (panel.onClick) panel.onClick(e, i);
        };

        children.push(_react2.default.createElement(
          _AccordionTitle2.default,
          { key: panel.title + '-title', active: isActive, onClick: onClick },
          _react2.default.createElement(_Icon2.default, { name: 'dropdown' }),
          panel.title
        ));
        children.push(_react2.default.createElement(
          _AccordionContent2.default,
          { key: panel.title + '-content', active: isActive },
          panel.content
        ));
      });

      return children;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Accordion, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Accordion.prototype.__proto__ || Object.getPrototypeOf(Accordion.prototype), 'componentWillMount', this).call(this);
      // TODO AutoControlledComponent should consider default prop values when trySetState is called before mount.
      // Otherwise, on first render we're allowed to set state for a prop that might have a default.
      // The default prop should always win on first render.
      // This default check should then be removed.
      if (!this.props.defaultActiveIndex) {
        this.trySetState({ activeIndex: -1 });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          fluid = _props.fluid,
          inverted = _props.inverted,
          panels = _props.panels,
          styled = _props.styled;


      var classes = (0, _classnames2.default)('ui', (0, _lib.useKeyOnly)(fluid, 'fluid'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(styled, 'styled'), 'accordion', className);
      var rest = (0, _omit3.default)(this.props, (0, _keys3.default)(Accordion.propTypes));
      var ElementType = (0, _lib.getElementType)(Accordion, this.props);

      return _react2.default.createElement(
        ElementType,
        _extends({}, rest, { className: classes }),
        panels ? this.renderPanels() : this.renderChildren()
      );
    }
  }]);

  return Accordion;
}(_lib.AutoControlledComponent);

Accordion.autoControlledProps = ['activeIndex'];
Accordion.propTypes = {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Index of the currently active panel. */
  activeIndex: _react.PropTypes.number,

  /** Primary content. */
  children: _react.PropTypes.node,

  /** Additional classes. */
  className: _react.PropTypes.string,

  /** Initial activeIndex value. */
  defaultActiveIndex: _react.PropTypes.number,

  /** Format to take up the width of it's container. */
  fluid: _react.PropTypes.bool,

  /** Format for dark backgrounds. */
  inverted: _react.PropTypes.bool,

  /** Called with (event, index) when a panel title is clicked. */
  onTitleClick: _react.PropTypes.func,

  /**
   * Create simple accordion panels from an array of { text: <string>, content: <string> } objects.
   * Object can optionally define an `active` key to open/close the panel.
   * Mutually exclusive with children.
   * TODO: AccordionPanel should be a sub-component
   */
  panels: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _react.PropTypes.arrayOf(_react.PropTypes.shape({
    active: _react.PropTypes.bool,
    title: _react.PropTypes.string,
    content: _react.PropTypes.string,
    onClick: _react.PropTypes.func
  }))]),

  /** Adds some basic styling to accordion panels. */
  styled: _react.PropTypes.bool
};
Accordion._meta = {
  name: 'Accordion',
  type: _lib.META.TYPES.MODULE
};
Accordion.Content = _AccordionContent2.default;
Accordion.Title = _AccordionTitle2.default;
exports.default = Accordion;