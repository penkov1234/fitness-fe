'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var PrevArrow = (function (_Component) {
  _inherits(PrevArrow, _Component);

  function PrevArrow() {
    _classCallCheck(this, PrevArrow);

    _Component.apply(this, arguments);
  }

  PrevArrow.prototype.render = function render() {
    var _context;

    var _props = this.props;
    var activeClassName = _props.activeClassName;
    var inactiveClassName = _props.inactiveClassName;
    var currentSlide = _props.currentSlide;
    var infinite = _props.infinite;

    var className = currentSlide === 0 && infinite === false ? inactiveClassName : activeClassName;
    var style = className !== '' ? null : {
      width: 0,
      height: 0,
      borderBottom: 'solid 30px transparent',
      borderTop: 'solid 30px transparent',
      borderRight: 'solid 40px #795548'
    };

    return _react2['default'].createElement('div', { className: className, style: style, onClick: (_context = this.props).handleClick.bind(_context) });
  };

  _createClass(PrevArrow, null, [{
    key: 'propTypes',
    value: {
      handleClick: _react.PropTypes.func,
      currentSlide: _react.PropTypes.number,
      activeClassName: _react.PropTypes.string,
      inactiveClassName: _react.PropTypes.string,
      infinite: _react.PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      activeClassName: '',
      inactiveClassName: ''
    },
    enumerable: true
  }]);

  return PrevArrow;
})(_react.Component);

var NextArrow = (function (_Component2) {
  _inherits(NextArrow, _Component2);

  function NextArrow() {
    _classCallCheck(this, NextArrow);

    _Component2.apply(this, arguments);
  }

  NextArrow.prototype.render = function render() {
    var _context2;

    var _props2 = this.props;
    var activeClassName = _props2.activeClassName;
    var inactiveClassName = _props2.inactiveClassName;
    var currentSlide = _props2.currentSlide;
    var _props3 = this.props;
    var infinite = _props3.infinite;
    var slideCount = _props3.slideCount;

    var className = currentSlide + 1 === slideCount && infinite === false ? inactiveClassName : activeClassName;
    var style = className !== '' ? null : {
      width: 0,
      height: 0,
      borderBottom: 'solid 30px transparent',
      borderTop: 'solid 30px transparent',
      borderLeft: 'solid 40px #795548'
    };

    return _react2['default'].createElement('div', { className: className, style: style, onClick: (_context2 = this.props).handleClick.bind(_context2) });
  };

  _createClass(NextArrow, null, [{
    key: 'propTypes',
    value: {
      handleClick: _react.PropTypes.func,
      currentSlide: _react.PropTypes.number,
      activeClassName: _react.PropTypes.string,
      inactiveClassName: _react.PropTypes.string,
      infinite: _react.PropTypes.bool,
      slideCount: _react.PropTypes.number
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      activeClassName: '',
      inactiveClassName: ''
    },
    enumerable: true
  }]);

  return NextArrow;
})(_react.Component);

exports.PrevArrow = PrevArrow;
exports.NextArrow = NextArrow;