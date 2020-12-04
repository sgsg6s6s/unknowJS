"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) { return typeof obj; };
  } else {
    _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
  }
  return _typeof(obj);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype,
    { constructor: { value: subClass, writable: true, configurable: true } }
  );
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  const hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    const Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      const NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o);
}

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); }
}

function _defineProperties(target, props) {
  for (let i = 0; i < props.length; i++) {
    const descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}

const A = /*#__PURE__*/function () {
  function A() {
    _classCallCheck(this, A);

    this.name = 1;
  }

  _createClass(A, [{
    key: "print",
    value: function print() {
      //
    }
  }]);

  return A;
}();

_defineProperty(A, "num", 1);

const B = /*#__PURE__*/function (_A) {
  _inherits(B, _A);

  const _super = _createSuper(B);

  function B() {
    let _this;

    _classCallCheck(this, B);

    _this.name = 2;
    _this.age = 3;
    return _possibleConstructorReturn(_this);
  }

  _createClass(B, [{
    key: "say",
    value: function say() {
      //
    }
  }]);

  return B;
}(A);

_defineProperty(B, "num", 1);