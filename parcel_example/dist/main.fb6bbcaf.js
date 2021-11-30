// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utils/print.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printDateDiff = printDateDiff;
exports.printError = printError;
exports.printErrorTimer = printErrorTimer;
exports.printTimer = printTimer;
var resultParagraph = document.getElementById('output');
var resultParagraphTimer = document.getElementById('outputTimer');

function printError(errorText) {
  resultParagraph.innerHTML = "\n    <span style=\"color: red;\">\n        ".concat(errorText, "\n    </span>\n    ");
}

function printErrorTimer(errorTextTimer) {
  resultParagraphTimer.innerHTML = "\n    <span style=\"color: red;\">\n        ".concat(errorTextTimer, "\n    </span>\n    ");
}

function printDateDiff(_ref) {
  var years = _ref.years,
      months = _ref.months,
      days = _ref.days;
  resultParagraph.innerHTML = "\n    \u0413\u043E\u0434\u044B: ".concat(years, "\n    \u041C\u0435\u0441\u044F\u0446\u044B: ").concat(months, "\n    \u0414\u043D\u0438: ").concat(days, "\n    ");
}

function printTimer(_ref2) {
  var hours = _ref2.hours,
      minutes = _ref2.minutes,
      seconds = _ref2.seconds;
  resultParagraphTimer.innerHTML = "\n    \u0427\u0430\u0441\u044B: ".concat(hours, "\n    \u041C\u0438\u043D\u0443\u0442\u044B: ").concat(minutes, "\n    \u0421\u0435\u043A\u0443\u043D\u0434\u044B: ").concat(seconds, "\n    ");
}
},{}],"libs/luxon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Zone = exports.VERSION = exports.SystemZone = exports.Settings = exports.InvalidZone = exports.Interval = exports.Info = exports.IANAZone = exports.FixedOffsetZone = exports.Duration = exports.DateTime = void 0;
var _excluded = ["base"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e30) { throw _e30; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e31) { didErr = true; err = _e31; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var e = /*#__PURE__*/function (_Error) {
  _inherits(e, _Error);

  var _super = _createSuper(e);

  function e() {
    _classCallCheck(this, e);

    return _super.apply(this, arguments);
  }

  return e;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var r = /*#__PURE__*/function (_e2) {
  _inherits(r, _e2);

  var _super2 = _createSuper(r);

  function r(e) {
    _classCallCheck(this, r);

    return _super2.call(this, "Invalid DateTime: ".concat(e.toMessage()));
  }

  return r;
}(e);

var n = /*#__PURE__*/function (_e3) {
  _inherits(n, _e3);

  var _super3 = _createSuper(n);

  function n(e) {
    _classCallCheck(this, n);

    return _super3.call(this, "Invalid Interval: ".concat(e.toMessage()));
  }

  return n;
}(e);

var s = /*#__PURE__*/function (_e4) {
  _inherits(s, _e4);

  var _super4 = _createSuper(s);

  function s(e) {
    _classCallCheck(this, s);

    return _super4.call(this, "Invalid Duration: ".concat(e.toMessage()));
  }

  return s;
}(e);

var N = /*#__PURE__*/function (_e5) {
  _inherits(N, _e5);

  var _super5 = _createSuper(N);

  function N() {
    _classCallCheck(this, N);

    return _super5.apply(this, arguments);
  }

  return N;
}(e);

var i = /*#__PURE__*/function (_e6) {
  _inherits(i, _e6);

  var _super6 = _createSuper(i);

  function i(e) {
    _classCallCheck(this, i);

    return _super6.call(this, "Invalid unit ".concat(e));
  }

  return i;
}(e);

var a = /*#__PURE__*/function (_e7) {
  _inherits(a, _e7);

  var _super7 = _createSuper(a);

  function a() {
    _classCallCheck(this, a);

    return _super7.apply(this, arguments);
  }

  return a;
}(e);

var o = /*#__PURE__*/function (_e8) {
  _inherits(o, _e8);

  var _super8 = _createSuper(o);

  function o() {
    _classCallCheck(this, o);

    return _super8.call(this, "Zone is an abstract class");
  }

  return o;
}(e);

var t = "numeric",
    u = "short",
    l = "long";
var c = {
  year: t,
  month: t,
  day: t
},
    h = {
  year: t,
  month: u,
  day: t
},
    d = {
  year: t,
  month: u,
  day: t,
  weekday: u
},
    m = {
  year: t,
  month: l,
  day: t
},
    f = {
  year: t,
  month: l,
  day: t,
  weekday: l
},
    y = {
  hour: t,
  minute: t
},
    g = {
  hour: t,
  minute: t,
  second: t
},
    w = {
  hour: t,
  minute: t,
  second: t,
  timeZoneName: u
},
    p = {
  hour: t,
  minute: t,
  second: t,
  timeZoneName: l
},
    v = {
  hour: t,
  minute: t,
  hourCycle: "h23"
},
    T = {
  hour: t,
  minute: t,
  second: t,
  hourCycle: "h23"
},
    S = {
  hour: t,
  minute: t,
  second: t,
  hourCycle: "h23",
  timeZoneName: u
},
    b = {
  hour: t,
  minute: t,
  second: t,
  hourCycle: "h23",
  timeZoneName: l
},
    O = {
  year: t,
  month: t,
  day: t,
  hour: t,
  minute: t
},
    k = {
  year: t,
  month: t,
  day: t,
  hour: t,
  minute: t,
  second: t
},
    M = {
  year: t,
  month: u,
  day: t,
  hour: t,
  minute: t
},
    D = {
  year: t,
  month: u,
  day: t,
  hour: t,
  minute: t,
  second: t
},
    E = {
  year: t,
  month: u,
  day: t,
  weekday: u,
  hour: t,
  minute: t
},
    V = {
  year: t,
  month: l,
  day: t,
  hour: t,
  minute: t,
  timeZoneName: u
},
    I = {
  year: t,
  month: l,
  day: t,
  hour: t,
  minute: t,
  second: t,
  timeZoneName: u
},
    x = {
  year: t,
  month: l,
  day: t,
  weekday: l,
  hour: t,
  minute: t,
  timeZoneName: l
},
    C = {
  year: t,
  month: l,
  day: t,
  weekday: l,
  hour: t,
  minute: t,
  second: t,
  timeZoneName: l
};

function $(e) {
  return void 0 === e;
}

function Z(e) {
  return "number" == typeof e;
}

function F(e) {
  return "number" == typeof e && e % 1 == 0;
}

function L() {
  try {
    return "undefined" != typeof Intl && !!Intl.RelativeTimeFormat;
  } catch (e) {
    return !1;
  }
}

function z(e, r, n) {
  if (0 !== e.length) return e.reduce(function (e, t) {
    t = [r(t), t];
    return e && n(e[0], t[0]) === e[0] ? e : t;
  }, null)[1];
}

function q(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}

function A(e, t, r) {
  return F(e) && t <= e && e <= r;
}

function j(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var r = e < 0 ? "-" : "";
  var n = r ? -1 * e : e;
  var s;
  return s = n.toString().length < t ? ("0".repeat(t) + n).slice(-t) : n.toString(), "".concat(r).concat(s);
}

function _(e) {
  if (!$(e) && null !== e && "" !== e) return parseInt(e, 10);
}

function U(e) {
  if (!$(e) && null !== e && "" !== e) return parseFloat(e);
}

function H(e) {
  if (!$(e) && null !== e && "" !== e) {
    e = 1e3 * parseFloat("0." + e);
    return Math.floor(e);
  }
}

function W(e, t) {
  var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
  var n = Math.pow(10, t),
      s = r ? Math.trunc : Math.round;
  return s(e * n) / n;
}

function R(e) {
  return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0);
}

function P(e) {
  return R(e) ? 366 : 365;
}

function J(e, t) {
  var r,
      n,
      n = (r = t - 1) - (n = 12) * Math.floor(r / n) + 1;
  return 2 == n ? R(e + (t - n) / 12) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][n - 1];
}

function Y(e) {
  var t = Date.UTC(e.year, e.month - 1, e.day, e.hour, e.minute, e.second, e.millisecond);
  return e.year < 100 && 0 <= e.year && (t = new Date(t), t.setUTCFullYear(t.getUTCFullYear() - 1900)), +t;
}

function G(e) {
  var t = (e + Math.floor(e / 4) - Math.floor(e / 100) + Math.floor(e / 400)) % 7,
      e = e - 1,
      e = (e + Math.floor(e / 4) - Math.floor(e / 100) + Math.floor(e / 400)) % 7;
  return 4 == t || 3 == e ? 53 : 52;
}

function B(e) {
  return 99 < e ? e : 60 < e ? 1900 + e : 2e3 + e;
}

function Q(e, t, r) {
  var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var s = new Date(e),
      i = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  n && (i.timeZone = n);
  t = _objectSpread({
    timeZoneName: t
  }, i), t = new Intl.DateTimeFormat(r, t).formatToParts(s).find(function (e) {
    return "timezonename" === e.type.toLowerCase();
  });
  return t ? t.value : null;
}

function K(e, t) {
  var r = parseInt(e, 10);
  Number.isNaN(r) && (r = 0);
  t = parseInt(t, 10) || 0, t = r < 0 || Object.is(r, -0) ? -t : t;
  return 60 * r + t;
}

function X(e) {
  var t = Number(e);
  if ("boolean" == typeof e || "" === e || Number.isNaN(t)) throw new a("Invalid unit value ".concat(e));
  return t;
}

function ee(e, t) {
  var r = {};

  for (var _s in e) {
    var n;
    !q(e, _s) || null != (n = e[_s]) && (r[t(_s)] = X(n));
  }

  return r;
}

function te(e, t) {
  var r = Math.trunc(Math.abs(e / 60)),
      n = Math.trunc(Math.abs(e % 60)),
      s = 0 <= e ? "+" : "-";

  switch (t) {
    case "short":
      return "".concat(s).concat(j(r, 2), ":").concat(j(n, 2));

    case "narrow":
      return "".concat(s).concat(r).concat(0 < n ? ":".concat(n) : "");

    case "techie":
      return "".concat(s).concat(j(r, 2)).concat(j(n, 2));

    default:
      throw new RangeError("Value format ".concat(t, " is out of range for property format"));
  }
}

function re(e) {
  return r = e, ["hour", "minute", "second", "millisecond"].reduce(function (e, t) {
    return e[t] = r[t], e;
  }, {});
  var r;
}

var ne = /[A-Za-z_+-]{1,256}(:?\/[A-Za-z0-9_+-]{1,256}(\/[A-Za-z0-9_+-]{1,256})?)?/;
var se = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    ie = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    ae = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

function oe(e) {
  switch (e) {
    case "narrow":
      return [].concat(ae);

    case "short":
      return [].concat(ie);

    case "long":
      return [].concat(se);

    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    default:
      return null;
  }
}

var ue = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    le = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    ce = ["M", "T", "W", "T", "F", "S", "S"];

function he(e) {
  switch (e) {
    case "narrow":
      return [].concat(ce);

    case "short":
      return [].concat(le);

    case "long":
      return [].concat(ue);

    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];

    default:
      return null;
  }
}

var de = ["AM", "PM"],
    me = ["Before Christ", "Anno Domini"],
    fe = ["BC", "AD"],
    ye = ["B", "A"];

function ge(e) {
  switch (e) {
    case "narrow":
      return [].concat(ye);

    case "short":
      return [].concat(fe);

    case "long":
      return [].concat(me);

    default:
      return null;
  }
}

function we(e, t) {
  var r = "";

  var _iterator = _createForOfIteratorHelper(e),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _n = _step.value;
      _n.literal ? r += _n.val : r += t(_n.val);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return r;
}

var pe = {
  D: c,
  DD: h,
  DDD: m,
  DDDD: f,
  t: y,
  tt: g,
  ttt: w,
  tttt: p,
  T: v,
  TT: T,
  TTT: S,
  TTTT: b,
  f: O,
  ff: M,
  fff: V,
  ffff: x,
  F: k,
  FF: D,
  FFF: I,
  FFFF: C
};

var ve = /*#__PURE__*/function () {
  function ve(e, t) {
    _classCallCheck(this, ve);

    this.opts = t, this.loc = e, this.systemLoc = null;
  }

  _createClass(ve, [{
    key: "formatWithSystemDefault",
    value: function formatWithSystemDefault(e, t) {
      null === this.systemLoc && (this.systemLoc = this.loc.redefaultToSystem());
      var r = this.systemLoc.dtFormatter(e, _objectSpread(_objectSpread({}, this.opts), t));
      return r.format();
    }
  }, {
    key: "formatDateTime",
    value: function formatDateTime(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var r = this.loc.dtFormatter(e, _objectSpread(_objectSpread({}, this.opts), t));
      return r.format();
    }
  }, {
    key: "formatDateTimeParts",
    value: function formatDateTimeParts(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var r = this.loc.dtFormatter(e, _objectSpread(_objectSpread({}, this.opts), t));
      return r.formatToParts();
    }
  }, {
    key: "resolvedOptions",
    value: function resolvedOptions(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var r = this.loc.dtFormatter(e, _objectSpread(_objectSpread({}, this.opts), t));
      return r.resolvedOptions();
    }
  }, {
    key: "num",
    value: function num(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (this.opts.forceSimple) return j(e, t);

      var r = _objectSpread({}, this.opts);

      return 0 < t && (r.padTo = t), this.loc.numberFormatter(r).format(e);
    }
  }, {
    key: "formatDateTimeFromString",
    value: function formatDateTimeFromString(r, e) {
      var _this = this;

      var n = "en" === this.loc.listingMode(),
          t = this.loc.outputCalendar && "gregory" !== this.loc.outputCalendar,
          s = function s(e, t) {
        return _this.loc.extract(r, e, t);
      },
          i = function i(e) {
        return r.isOffsetFixed && 0 === r.offset && e.allowZ ? "Z" : r.isValid ? r.zone.formatOffset(r.ts, e.format) : "";
      },
          a = function a() {
        return n ? function (e) {
          return de[e.hour < 12 ? 0 : 1];
        }(r) : s({
          hour: "numeric",
          hourCycle: "h12"
        }, "dayperiod");
      },
          o = function o(e, t) {
        return n ? function (e, t) {
          return oe(t)[e.month - 1];
        }(r, e) : s(t ? {
          month: e
        } : {
          month: e,
          day: "numeric"
        }, "month");
      },
          u = function u(e, t) {
        return n ? function (e, t) {
          return he(t)[e.weekday - 1];
        }(r, e) : s(t ? {
          weekday: e
        } : {
          weekday: e,
          month: "long",
          day: "numeric"
        }, "weekday");
      },
          l = function l(e) {
        var t = ve.macroTokenToFormatOpts(e);
        return t ? _this.formatWithSystemDefault(r, t) : e;
      },
          c = function c(e) {
        return n ? function (e, t) {
          return ge(t)[e.year < 0 ? 0 : 1];
        }(r, e) : s({
          era: e
        }, "era");
      };

      return we(ve.parseFormat(e), function (e) {
        switch (e) {
          case "S":
            return _this.num(r.millisecond);

          case "u":
          case "SSS":
            return _this.num(r.millisecond, 3);

          case "s":
            return _this.num(r.second);

          case "ss":
            return _this.num(r.second, 2);

          case "uu":
            return _this.num(Math.floor(r.millisecond / 10), 2);

          case "uuu":
            return _this.num(Math.floor(r.millisecond / 100));

          case "m":
            return _this.num(r.minute);

          case "mm":
            return _this.num(r.minute, 2);

          case "h":
            return _this.num(r.hour % 12 == 0 ? 12 : r.hour % 12);

          case "hh":
            return _this.num(r.hour % 12 == 0 ? 12 : r.hour % 12, 2);

          case "H":
            return _this.num(r.hour);

          case "HH":
            return _this.num(r.hour, 2);

          case "Z":
            return i({
              format: "narrow",
              allowZ: _this.opts.allowZ
            });

          case "ZZ":
            return i({
              format: "short",
              allowZ: _this.opts.allowZ
            });

          case "ZZZ":
            return i({
              format: "techie",
              allowZ: _this.opts.allowZ
            });

          case "ZZZZ":
            return r.zone.offsetName(r.ts, {
              format: "short",
              locale: _this.loc.locale
            });

          case "ZZZZZ":
            return r.zone.offsetName(r.ts, {
              format: "long",
              locale: _this.loc.locale
            });

          case "z":
            return r.zoneName;

          case "a":
            return a();

          case "d":
            return t ? s({
              day: "numeric"
            }, "day") : _this.num(r.day);

          case "dd":
            return t ? s({
              day: "2-digit"
            }, "day") : _this.num(r.day, 2);

          case "c":
            return _this.num(r.weekday);

          case "ccc":
            return u("short", !0);

          case "cccc":
            return u("long", !0);

          case "ccccc":
            return u("narrow", !0);

          case "E":
            return _this.num(r.weekday);

          case "EEE":
            return u("short", !1);

          case "EEEE":
            return u("long", !1);

          case "EEEEE":
            return u("narrow", !1);

          case "L":
            return t ? s({
              month: "numeric",
              day: "numeric"
            }, "month") : _this.num(r.month);

          case "LL":
            return t ? s({
              month: "2-digit",
              day: "numeric"
            }, "month") : _this.num(r.month, 2);

          case "LLL":
            return o("short", !0);

          case "LLLL":
            return o("long", !0);

          case "LLLLL":
            return o("narrow", !0);

          case "M":
            return t ? s({
              month: "numeric"
            }, "month") : _this.num(r.month);

          case "MM":
            return t ? s({
              month: "2-digit"
            }, "month") : _this.num(r.month, 2);

          case "MMM":
            return o("short", !1);

          case "MMMM":
            return o("long", !1);

          case "MMMMM":
            return o("narrow", !1);

          case "y":
            return t ? s({
              year: "numeric"
            }, "year") : _this.num(r.year);

          case "yy":
            return t ? s({
              year: "2-digit"
            }, "year") : _this.num(r.year.toString().slice(-2), 2);

          case "yyyy":
            return t ? s({
              year: "numeric"
            }, "year") : _this.num(r.year, 4);

          case "yyyyyy":
            return t ? s({
              year: "numeric"
            }, "year") : _this.num(r.year, 6);

          case "G":
            return c("short");

          case "GG":
            return c("long");

          case "GGGGG":
            return c("narrow");

          case "kk":
            return _this.num(r.weekYear.toString().slice(-2), 2);

          case "kkkk":
            return _this.num(r.weekYear, 4);

          case "W":
            return _this.num(r.weekNumber);

          case "WW":
            return _this.num(r.weekNumber, 2);

          case "o":
            return _this.num(r.ordinal);

          case "ooo":
            return _this.num(r.ordinal, 3);

          case "q":
            return _this.num(r.quarter);

          case "qq":
            return _this.num(r.quarter, 2);

          case "X":
            return _this.num(Math.floor(r.ts / 1e3));

          case "x":
            return _this.num(r.ts);

          default:
            return l(e);
        }
      });
    }
  }, {
    key: "formatDurationFromString",
    value: function formatDurationFromString(e, t) {
      var _this2 = this;

      var r = function r(e) {
        switch (e[0]) {
          case "S":
            return "millisecond";

          case "s":
            return "second";

          case "m":
            return "minute";

          case "h":
            return "hour";

          case "d":
            return "day";

          case "M":
            return "month";

          case "y":
            return "year";

          default:
            return null;
        }
      },
          n = ve.parseFormat(t),
          s = n.reduce(function (e, _ref) {
        var t = _ref.literal,
            r = _ref.val;
        return t ? e : e.concat(r);
      }, []),
          i = e.shiftTo.apply(e, _toConsumableArray(s.map(r).filter(function (e) {
        return e;
      })));

      return we(n, (a = i, function (e) {
        var t = r(e);
        return t ? _this2.num(a.get(t), e.length) : e;
      }));
      var a;
    }
  }], [{
    key: "create",
    value: function create(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new ve(e, t);
    }
  }, {
    key: "parseFormat",
    value: function parseFormat(t) {
      var r = null,
          n = "",
          s = !1;
      var i = [];

      for (var _e9 = 0; _e9 < t.length; _e9++) {
        var a = t.charAt(_e9);
        "'" === a ? (0 < n.length && i.push({
          literal: s,
          val: n
        }), r = null, n = "", s = !s) : s || a === r ? n += a : (0 < n.length && i.push({
          literal: !1,
          val: n
        }), n = a, r = a);
      }

      return 0 < n.length && i.push({
        literal: s,
        val: n
      }), i;
    }
  }, {
    key: "macroTokenToFormatOpts",
    value: function macroTokenToFormatOpts(e) {
      return pe[e];
    }
  }]);

  return ve;
}();

var Te = /*#__PURE__*/function () {
  function Te(e, t) {
    _classCallCheck(this, Te);

    this.reason = e, this.explanation = t;
  }

  _createClass(Te, [{
    key: "toMessage",
    value: function toMessage() {
      return this.explanation ? "".concat(this.reason, ": ").concat(this.explanation) : this.reason;
    }
  }]);

  return Te;
}();

var Se = /*#__PURE__*/function () {
  function Se() {
    _classCallCheck(this, Se);
  }

  _createClass(Se, [{
    key: "type",
    get: function get() {
      throw new o();
    }
  }, {
    key: "name",
    get: function get() {
      throw new o();
    }
  }, {
    key: "isUniversal",
    get: function get() {
      throw new o();
    }
  }, {
    key: "offsetName",
    value: function offsetName(e, t) {
      throw new o();
    }
  }, {
    key: "formatOffset",
    value: function formatOffset(e, t) {
      throw new o();
    }
  }, {
    key: "offset",
    value: function offset(e) {
      throw new o();
    }
  }, {
    key: "equals",
    value: function equals(e) {
      throw new o();
    }
  }, {
    key: "isValid",
    get: function get() {
      throw new o();
    }
  }]);

  return Se;
}();

exports.Zone = Se;
var be = null;

var Oe = /*#__PURE__*/function (_Se) {
  _inherits(Oe, _Se);

  var _super9 = _createSuper(Oe);

  function Oe() {
    _classCallCheck(this, Oe);

    return _super9.apply(this, arguments);
  }

  _createClass(Oe, [{
    key: "type",
    get: function get() {
      return "system";
    }
  }, {
    key: "name",
    get: function get() {
      return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
  }, {
    key: "isUniversal",
    get: function get() {
      return !1;
    }
  }, {
    key: "offsetName",
    value: function offsetName(e, _ref2) {
      var t = _ref2.format,
          r = _ref2.locale;
      return Q(e, t, r);
    }
  }, {
    key: "formatOffset",
    value: function formatOffset(e, t) {
      return te(this.offset(e), t);
    }
  }, {
    key: "offset",
    value: function offset(e) {
      return -new Date(e).getTimezoneOffset();
    }
  }, {
    key: "equals",
    value: function equals(e) {
      return "system" === e.type;
    }
  }, {
    key: "isValid",
    get: function get() {
      return !0;
    }
  }], [{
    key: "instance",
    get: function get() {
      return null === be && (be = new Oe()), be;
    }
  }]);

  return Oe;
}(Se);

exports.SystemZone = Oe;
var ke = RegExp("^".concat(ne.source, "$"));
var Me = {};
var Ne = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
var De = {};

var Ee = /*#__PURE__*/function (_Se2) {
  _inherits(Ee, _Se2);

  var _super10 = _createSuper(Ee);

  function Ee(e) {
    var _this3;

    _classCallCheck(this, Ee);

    _this3 = _super10.call(this), _this3.zoneName = e, _this3.valid = Ee.isValidZone(e);
    return _this3;
  }

  _createClass(Ee, [{
    key: "type",
    get: function get() {
      return "iana";
    }
  }, {
    key: "name",
    get: function get() {
      return this.zoneName;
    }
  }, {
    key: "isUniversal",
    get: function get() {
      return !1;
    }
  }, {
    key: "offsetName",
    value: function offsetName(e, _ref3) {
      var t = _ref3.format,
          r = _ref3.locale;
      return Q(e, t, r, this.name);
    }
  }, {
    key: "formatOffset",
    value: function formatOffset(e, t) {
      return te(this.offset(e), t);
    }
  }, {
    key: "offset",
    value: function offset(e) {
      var t = new Date(e);
      if (isNaN(t)) return NaN;

      var r = (o = this.name, Me[o] || (Me[o] = new Intl.DateTimeFormat("en-US", {
        hour12: !1,
        timeZone: o,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })), Me[o]),
          _ref4 = (r.formatToParts ? function (e, t) {
        var r = e.formatToParts(t),
            n = [];

        for (var _e10 = 0; _e10 < r.length; _e10++) {
          var _r$_e = r[_e10],
              s = _r$_e.type,
              i = _r$_e.value,
              s = Ne[s];
          $(s) || (n[s] = parseInt(i, 10));
        }

        return n;
      } : function (e, t) {
        var r = e.format(t).replace(/\u200E/g, ""),
            _$exec = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(r),
            _$exec2 = _slicedToArray(_$exec, 7),
            n = _$exec2[1],
            s = _$exec2[2],
            i = _$exec2[3],
            e = _$exec2[4],
            t = _$exec2[5],
            r = _$exec2[6];

        return [i, n, s, e, t, r];
      })(r, t),
          _ref5 = _slicedToArray(_ref4, 6),
          n = _ref5[0],
          s = _ref5[1],
          i = _ref5[2],
          a = _ref5[3],
          e = _ref5[4],
          o = _ref5[5],
          r = +t,
          t = r % 1e3;

      return (Y({
        year: n,
        month: s,
        day: i,
        hour: 24 === a ? 0 : a,
        minute: e,
        second: o,
        millisecond: 0
      }) - (r -= 0 <= t ? t : 1e3 + t)) / 6e4;
    }
  }, {
    key: "equals",
    value: function equals(e) {
      return "iana" === e.type && e.name === this.name;
    }
  }, {
    key: "isValid",
    get: function get() {
      return this.valid;
    }
  }], [{
    key: "create",
    value: function create(e) {
      return De[e] || (De[e] = new Ee(e)), De[e];
    }
  }, {
    key: "resetCache",
    value: function resetCache() {
      De = {}, Me = {};
    }
  }, {
    key: "isValidSpecifier",
    value: function isValidSpecifier(e) {
      return !(!e || !e.match(ke));
    }
  }, {
    key: "isValidZone",
    value: function isValidZone(e) {
      if (!e) return !1;

      try {
        return new Intl.DateTimeFormat("en-US", {
          timeZone: e
        }).format(), !0;
      } catch (e) {
        return !1;
      }
    }
  }]);

  return Ee;
}(Se);

exports.IANAZone = Ee;
var Ve = null;

var Ie = /*#__PURE__*/function (_Se3) {
  _inherits(Ie, _Se3);

  var _super11 = _createSuper(Ie);

  function Ie(e) {
    var _this4;

    _classCallCheck(this, Ie);

    _this4 = _super11.call(this), _this4.fixed = e;
    return _this4;
  }

  _createClass(Ie, [{
    key: "type",
    get: function get() {
      return "fixed";
    }
  }, {
    key: "name",
    get: function get() {
      return 0 === this.fixed ? "UTC" : "UTC".concat(te(this.fixed, "narrow"));
    }
  }, {
    key: "offsetName",
    value: function offsetName() {
      return this.name;
    }
  }, {
    key: "formatOffset",
    value: function formatOffset(e, t) {
      return te(this.fixed, t);
    }
  }, {
    key: "isUniversal",
    get: function get() {
      return !0;
    }
  }, {
    key: "offset",
    value: function offset() {
      return this.fixed;
    }
  }, {
    key: "equals",
    value: function equals(e) {
      return "fixed" === e.type && e.fixed === this.fixed;
    }
  }, {
    key: "isValid",
    get: function get() {
      return !0;
    }
  }], [{
    key: "utcInstance",
    get: function get() {
      return null === Ve && (Ve = new Ie(0)), Ve;
    }
  }, {
    key: "instance",
    value: function instance(e) {
      return 0 === e ? Ie.utcInstance : new Ie(e);
    }
  }, {
    key: "parseSpecifier",
    value: function parseSpecifier(e) {
      if (e) {
        e = e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
        if (e) return new Ie(K(e[1], e[2]));
      }

      return null;
    }
  }]);

  return Ie;
}(Se);

exports.FixedOffsetZone = Ie;

var xe = /*#__PURE__*/function (_Se4) {
  _inherits(xe, _Se4);

  var _super12 = _createSuper(xe);

  function xe(e) {
    var _this5;

    _classCallCheck(this, xe);

    _this5 = _super12.call(this), _this5.zoneName = e;
    return _this5;
  }

  _createClass(xe, [{
    key: "type",
    get: function get() {
      return "invalid";
    }
  }, {
    key: "name",
    get: function get() {
      return this.zoneName;
    }
  }, {
    key: "isUniversal",
    get: function get() {
      return !1;
    }
  }, {
    key: "offsetName",
    value: function offsetName() {
      return null;
    }
  }, {
    key: "formatOffset",
    value: function formatOffset() {
      return "";
    }
  }, {
    key: "offset",
    value: function offset() {
      return NaN;
    }
  }, {
    key: "equals",
    value: function equals() {
      return !1;
    }
  }, {
    key: "isValid",
    get: function get() {
      return !1;
    }
  }]);

  return xe;
}(Se);

exports.InvalidZone = xe;

function Ce(e, t) {
  if ($(e) || null === e) return t;
  if (e instanceof Se) return e;
  if ("string" != typeof e) return Z(e) ? Ie.instance(e) : "object" == _typeof(e) && e.offset && "number" == typeof e.offset ? e : new xe(e);
  var r = e.toLowerCase();
  return "local" === r || "system" === r ? t : "utc" === r || "gmt" === r ? Ie.utcInstance : Ee.isValidSpecifier(r) ? Ee.create(e) : Ie.parseSpecifier(r) || new xe(e);
}

var $e = function $e() {
  return Date.now();
},
    Ze = "system",
    Fe = null,
    Le = null,
    ze = null,
    qe;

var Ae = /*#__PURE__*/function () {
  function Ae() {
    _classCallCheck(this, Ae);
  }

  _createClass(Ae, null, [{
    key: "now",
    get: function get() {
      return $e;
    },
    set: function set(e) {
      $e = e;
    }
  }, {
    key: "defaultZone",
    get: function get() {
      return Ce(Ze, Oe.instance);
    },
    set: function set(e) {
      Ze = e;
    }
  }, {
    key: "defaultLocale",
    get: function get() {
      return Fe;
    },
    set: function set(e) {
      Fe = e;
    }
  }, {
    key: "defaultNumberingSystem",
    get: function get() {
      return Le;
    },
    set: function set(e) {
      Le = e;
    }
  }, {
    key: "defaultOutputCalendar",
    get: function get() {
      return ze;
    },
    set: function set(e) {
      ze = e;
    }
  }, {
    key: "throwOnInvalid",
    get: function get() {
      return qe;
    },
    set: function set(e) {
      qe = e;
    }
  }, {
    key: "resetCaches",
    value: function resetCaches() {
      Ge.resetCache(), Ee.resetCache();
    }
  }]);

  return Ae;
}();

exports.Settings = Ae;
var je = {};

function _e(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var r = JSON.stringify([e, t]);
  var n = je[r];
  return n || (n = new Intl.DateTimeFormat(e, t), je[r] = n), n;
}

var Ue = {};
var He = {};
var We = null;

function Re(e, t, r, n, s) {
  r = e.listingMode(r);
  return "error" === r ? null : ("en" === r ? n : s)(t);
}

var Pe = /*#__PURE__*/function () {
  function Pe(e, t, r) {
    _classCallCheck(this, Pe);

    if (this.padTo = r.padTo || 0, this.floor = r.floor || !1, !t) {
      var _n2 = {
        useGrouping: !1
      };
      0 < r.padTo && (_n2.minimumIntegerDigits = r.padTo), this.inf = function (e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var r = JSON.stringify([e, t]);
        var n = Ue[r];
        return n || (n = new Intl.NumberFormat(e, t), Ue[r] = n), n;
      }(e, _n2);
    }
  }

  _createClass(Pe, [{
    key: "format",
    value: function format(e) {
      if (this.inf) {
        var t = this.floor ? Math.floor(e) : e;
        return this.inf.format(t);
      }

      return j(this.floor ? Math.floor(e) : W(e, 3), this.padTo);
    }
  }]);

  return Pe;
}();

var Je = /*#__PURE__*/function () {
  function Je(e, t, r) {
    _classCallCheck(this, Je);

    this.opts = r;
    var n;
    var s;
    e.zone.isUniversal ? (s = 0 <= (s = e.offset / 60 * -1) ? "Etc/GMT+".concat(s) : "Etc/GMT".concat(s), 0 !== e.offset && Ee.create(s).valid ? (n = s, this.dt = e) : (n = "UTC", r.timeZoneName ? this.dt = e : this.dt = 0 === e.offset ? e : Wr.fromMillis(e.ts + 60 * e.offset * 1e3))) : "system" === e.zone.type ? this.dt = e : (this.dt = e, n = e.zone.name);

    var i = _objectSpread({}, this.opts);

    n && (i.timeZone = n), this.dtf = _e(t, i);
  }

  _createClass(Je, [{
    key: "format",
    value: function format() {
      return this.dtf.format(this.dt.toJSDate());
    }
  }, {
    key: "formatToParts",
    value: function formatToParts() {
      return this.dtf.formatToParts(this.dt.toJSDate());
    }
  }, {
    key: "resolvedOptions",
    value: function resolvedOptions() {
      return this.dtf.resolvedOptions();
    }
  }]);

  return Je;
}();

var Ye = /*#__PURE__*/function () {
  function Ye(e, t, r) {
    _classCallCheck(this, Ye);

    this.opts = _objectSpread({
      style: "long"
    }, r), !t && L() && (this.rtf = function (e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var r = t.base,
          n = _objectWithoutProperties(t, _excluded);

      var s = JSON.stringify([e, n]);
      var i = He[s];
      return i || (i = new Intl.RelativeTimeFormat(e, t), He[s] = i), i;
    }(e, r));
  }

  _createClass(Ye, [{
    key: "format",
    value: function format(e, t) {
      return this.rtf ? this.rtf.format(e, t) : function (e, t) {
        var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "always";
        var n = arguments.length > 3 ? arguments[3] : undefined;
        return function (t) {
          var s = {
            years: ["year", "yr."],
            quarters: ["quarter", "qtr."],
            months: ["month", "mo."],
            weeks: ["week", "wk."],
            days: ["day", "day", "days"],
            hours: ["hour", "hr."],
            minutes: ["minute", "min."],
            seconds: ["second", "sec."]
          },
              i = -1 === ["hours", "minutes", "seconds"].indexOf(e);

          if ("auto" === r && i) {
            var a = "days" === e;

            switch (t) {
              case 1:
                return a ? "tomorrow" : "next ".concat(s[e][0]);

              case -1:
                return a ? "yesterday" : "last ".concat(s[e][0]);

              case 0:
                return a ? "today" : "this ".concat(s[e][0]);
            }
          }

          var o = Object.is(t, -0) || t < 0,
              i = 1 === (r = Math.abs(t)),
              t = s[e],
              i = n ? !i && t[2] || t[1] : i ? s[e][0] : e;
          return o ? "".concat(r, " ").concat(i, " ago") : "in ".concat(r, " ").concat(i);
        }(t);
      }(t, e, this.opts.numeric, "long" !== this.opts.style);
    }
  }, {
    key: "formatToParts",
    value: function formatToParts(e, t) {
      return this.rtf ? this.rtf.formatToParts(e, t) : [];
    }
  }]);

  return Ye;
}();

var Ge = /*#__PURE__*/function () {
  function Ge(e, t, r, n) {
    _classCallCheck(this, Ge);

    var _ref6 = function (e) {
      if (-1 === (n = e.indexOf("-u-"))) return [e];
      {
        var _t2;

        var r = e.substring(0, n);

        try {
          _t2 = _e(e).resolvedOptions();
        } catch (e) {
          _t2 = _e(r).resolvedOptions();
        }

        var _t3 = _t2,
            n = _t3.numberingSystem,
            e = _t3.calendar;
        return [r, n, e];
      }
    }(e),
        _ref7 = _slicedToArray(_ref6, 3),
        s = _ref7[0],
        i = _ref7[1],
        e = _ref7[2];

    this.locale = s, this.numberingSystem = t || i || null, this.outputCalendar = r || e || null, this.intl = (i = this.locale, r = this.numberingSystem, ((e = this.outputCalendar) || r) && (i += "-u", e && (i += "-ca-".concat(e)), r && (i += "-nu-".concat(r))), i), this.weekdaysCache = {
      format: {},
      standalone: {}
    }, this.monthsCache = {
      format: {},
      standalone: {}
    }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = n, this.fastNumbersCached = null;
  }

  _createClass(Ge, [{
    key: "fastNumbers",
    get: function get() {
      var e;
      return null == this.fastNumbersCached && (this.fastNumbersCached = (!(e = this).numberingSystem || "latn" === e.numberingSystem) && ("latn" === e.numberingSystem || !e.locale || e.locale.startsWith("en") || "latn" === new Intl.DateTimeFormat(e.intl).resolvedOptions().numberingSystem)), this.fastNumbersCached;
    }
  }, {
    key: "listingMode",
    value: function listingMode() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var t = this.isEnglish(),
          r = !(null !== this.numberingSystem && "latn" !== this.numberingSystem || null !== this.outputCalendar && "gregory" !== this.outputCalendar);
      return t && r ? "en" : "intl";
    }
  }, {
    key: "clone",
    value: function clone(e) {
      return e && 0 !== Object.getOwnPropertyNames(e).length ? Ge.create(e.locale || this.specifiedLocale, e.numberingSystem || this.numberingSystem, e.outputCalendar || this.outputCalendar, e.defaultToEN || !1) : this;
    }
  }, {
    key: "redefaultToEN",
    value: function redefaultToEN() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.clone(_objectSpread(_objectSpread({}, e), {}, {
        defaultToEN: !0
      }));
    }
  }, {
    key: "redefaultToSystem",
    value: function redefaultToSystem() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.clone(_objectSpread(_objectSpread({}, e), {}, {
        defaultToEN: !1
      }));
    }
  }, {
    key: "months",
    value: function months(r) {
      var _this6 = this;

      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
      return Re(this, r, e, oe, function () {
        var t = n ? {
          month: r,
          day: "numeric"
        } : {
          month: r
        },
            e = n ? "format" : "standalone";
        return _this6.monthsCache[e][r] || (_this6.monthsCache[e][r] = function (t) {
          var r = [];

          for (var _e11 = 1; _e11 <= 12; _e11++) {
            var n = Wr.utc(2016, _e11, 1);
            r.push(t(n));
          }

          return r;
        }(function (e) {
          return _this6.extract(e, t, "month");
        })), _this6.monthsCache[e][r];
      });
    }
  }, {
    key: "weekdays",
    value: function weekdays(r) {
      var _this7 = this;

      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
      return Re(this, r, e, he, function () {
        var t = n ? {
          weekday: r,
          year: "numeric",
          month: "long",
          day: "numeric"
        } : {
          weekday: r
        },
            e = n ? "format" : "standalone";
        return _this7.weekdaysCache[e][r] || (_this7.weekdaysCache[e][r] = function (t) {
          var r = [];

          for (var _e12 = 1; _e12 <= 7; _e12++) {
            var n = Wr.utc(2016, 11, 13 + _e12);
            r.push(t(n));
          }

          return r;
        }(function (e) {
          return _this7.extract(e, t, "weekday");
        })), _this7.weekdaysCache[e][r];
      });
    }
  }, {
    key: "meridiems",
    value: function meridiems() {
      var _this8 = this;

      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
      return Re(this, void 0, e, function () {
        return de;
      }, function () {
        if (!_this8.meridiemCache) {
          var _t4 = {
            hour: "numeric",
            hourCycle: "h12"
          };
          _this8.meridiemCache = [Wr.utc(2016, 11, 13, 9), Wr.utc(2016, 11, 13, 19)].map(function (e) {
            return _this8.extract(e, _t4, "dayperiod");
          });
        }

        return _this8.meridiemCache;
      });
    }
  }, {
    key: "eras",
    value: function eras(e) {
      var _this9 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      return Re(this, e, t, ge, function () {
        var t = {
          era: e
        };
        return _this9.eraCache[e] || (_this9.eraCache[e] = [Wr.utc(-40, 1, 1), Wr.utc(2017, 1, 1)].map(function (e) {
          return _this9.extract(e, t, "era");
        })), _this9.eraCache[e];
      });
    }
  }, {
    key: "extract",
    value: function extract(e, t, r) {
      var n = this.dtFormatter(e, t),
          s = n.formatToParts(),
          i = s.find(function (e) {
        return e.type.toLowerCase() === r;
      });
      return i ? i.value : null;
    }
  }, {
    key: "numberFormatter",
    value: function numberFormatter() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Pe(this.intl, e.forceSimple || this.fastNumbers, e);
    }
  }, {
    key: "dtFormatter",
    value: function dtFormatter(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Je(e, this.intl, t);
    }
  }, {
    key: "relFormatter",
    value: function relFormatter() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Ye(this.intl, this.isEnglish(), e);
    }
  }, {
    key: "isEnglish",
    value: function isEnglish() {
      return "en" === this.locale || "en-us" === this.locale.toLowerCase() || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
    }
  }, {
    key: "equals",
    value: function equals(e) {
      return this.locale === e.locale && this.numberingSystem === e.numberingSystem && this.outputCalendar === e.outputCalendar;
    }
  }], [{
    key: "fromOpts",
    value: function fromOpts(e) {
      return Ge.create(e.locale, e.numberingSystem, e.outputCalendar, e.defaultToEN);
    }
  }, {
    key: "create",
    value: function create(e, t, r) {
      var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      e = e || Ae.defaultLocale, n = e || (n ? "en-US" : We || (We = new Intl.DateTimeFormat().resolvedOptions().locale, We)), t = t || Ae.defaultNumberingSystem, r = r || Ae.defaultOutputCalendar;
      return new Ge(n, t, r, e);
    }
  }, {
    key: "resetCache",
    value: function resetCache() {
      We = null, je = {}, Ue = {}, He = {};
    }
  }, {
    key: "fromObject",
    value: function fromObject() {
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          e = _ref8.locale,
          t = _ref8.numberingSystem,
          r = _ref8.outputCalendar;

      return Ge.create(e, t, r);
    }
  }]);

  return Ge;
}();

function Be() {
  for (var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++) {
    e[_key] = arguments[_key];
  }

  e = e.reduce(function (e, t) {
    return e + t.source;
  }, "");
  return RegExp("^".concat(e, "$"));
}

function Qe() {
  for (var _len2 = arguments.length, e = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    e[_key2] = arguments[_key2];
  }

  return function (i) {
    return e.reduce(function (_ref9, n) {
      var _ref10 = _slicedToArray(_ref9, 3),
          e = _ref10[0],
          t = _ref10[1],
          r = _ref10[2];

      return function (r, n) {
        var _n3 = n(i, r),
            _n4 = _slicedToArray(_n3, 3),
            s = _n4[0],
            n = _n4[1],
            r = _n4[2];

        return [_objectSpread(_objectSpread({}, e), s), t || n, r];
      }(r, n);
    }, [{}, null, 1]).slice(0, 2);
  };
}

function Ke(e) {
  if (null == e) return [null, null];

  for (var _len3 = arguments.length, t = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    t[_key3 - 1] = arguments[_key3];
  }

  for (var _i2 = 0, _t5 = t; _i2 < _t5.length; _i2++) {
    var _t5$_i = _slicedToArray(_t5[_i2], 2),
        r = _t5$_i[0],
        n = _t5$_i[1];

    r = r.exec(e);
    if (r) return n(r);
  }

  return [null, null];
}

function Xe() {
  for (var _len4 = arguments.length, s = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    s[_key4] = arguments[_key4];
  }

  return function (e, t) {
    var r = {};
    var n;

    for (n = 0; n < s.length; n++) {
      r[s[n]] = _(e[t + n]);
    }

    return [r, null, t + n];
  };
}

var et = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
    tt = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,
    rt = RegExp("".concat(tt.source).concat(et.source, "?")),
    u = RegExp("(?:T".concat(rt.source, ")?")),
    t = Xe("weekYear", "weekNumber", "weekDay"),
    l = Xe("year", "ordinal"),
    et = RegExp("".concat(tt.source, " ?(?:").concat(et.source, "|(").concat(ne.source, "))?")),
    ne = RegExp("(?: ".concat(et.source, ")?"));
exports.VERSION = et;

function nt(e, t, r) {
  t = e[t];
  return $(t) ? r : _(t);
}

function st(e, t) {
  return [{
    year: nt(e, t),
    month: nt(e, t + 1, 1),
    day: nt(e, t + 2, 1)
  }, null, t + 3];
}

function it(e, t) {
  return [{
    hours: nt(e, t, 0),
    minutes: nt(e, t + 1, 0),
    seconds: nt(e, t + 2, 0),
    milliseconds: H(e[t + 3])
  }, null, t + 4];
}

function at(e, t) {
  var r = !e[t] && !e[t + 1],
      e = K(e[t + 1], e[t + 2]);
  return [{}, r ? null : Ie.instance(e), t + 3];
}

function ot(e, t) {
  return [{}, e[t] ? Ee.create(e[t]) : null, t + 1];
}

var ut = RegExp("^T?".concat(tt.source, "$")),
    lt = /^-?P(?:(?:(-?\d{1,9}(?:\.\d{1,9})?)Y)?(?:(-?\d{1,9}(?:\.\d{1,9})?)M)?(?:(-?\d{1,9}(?:\.\d{1,9})?)W)?(?:(-?\d{1,9}(?:\.\d{1,9})?)D)?(?:T(?:(-?\d{1,9}(?:\.\d{1,9})?)H)?(?:(-?\d{1,9}(?:\.\d{1,9})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,9}))?S)?)?)$/;

function ct(e) {
  var _e13 = e,
      _e14 = _slicedToArray(_e13, 9),
      t = _e14[0],
      r = _e14[1],
      n = _e14[2],
      s = _e14[3],
      i = _e14[4],
      a = _e14[5],
      o = _e14[6],
      u = _e14[7],
      l = _e14[8];

  var c = "-" === t[0];
  e = u && "-" === u[0], t = function t(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    return void 0 !== e && (t || e && c) ? -e : e;
  };
  return [{
    years: t(U(r)),
    months: t(U(n)),
    weeks: t(U(s)),
    days: t(U(i)),
    hours: t(U(a)),
    minutes: t(U(o)),
    seconds: t(U(u), "-0" === u),
    milliseconds: t(H(l), e)
  }];
}

var ht = {
  GMT: 0,
  EDT: -240,
  EST: -300,
  CDT: -300,
  CST: -360,
  MDT: -360,
  MST: -420,
  PDT: -420,
  PST: -480
};

function dt(e, t, r, n, s, i, a) {
  var o = {
    year: 2 === t.length ? B(_(t)) : _(t),
    month: ie.indexOf(r) + 1,
    day: _(n),
    hour: _(s),
    minute: _(i)
  };
  return a && (o.second = _(a)), e && (o.weekday = 3 < e.length ? ue.indexOf(e) + 1 : le.indexOf(e) + 1), o;
}

var mt = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;

function ft(e) {
  var _e15 = e,
      _e16 = _slicedToArray(_e15, 12),
      t = _e16[1],
      r = _e16[2],
      n = _e16[3],
      s = _e16[4],
      i = _e16[5],
      a = _e16[6],
      o = _e16[7],
      u = _e16[8],
      l = _e16[9],
      c = _e16[10],
      e = _e16[11],
      o = dt(t, s, n, r, i, a, o);

  var h;
  return h = u ? ht[u] : l ? 0 : K(c, e), [o, new Ie(h)];
}

var yt = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
    gt = /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
    wt = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;

function pt(e) {
  var _e17 = e,
      _e18 = _slicedToArray(_e17, 8),
      t = _e18[1],
      r = _e18[2],
      n = _e18[3],
      s = _e18[4],
      i = _e18[5],
      a = _e18[6],
      e = _e18[7];

  return [dt(t, s, n, r, i, a, e), Ie.utcInstance];
}

function vt(e) {
  var _e19 = e,
      _e20 = _slicedToArray(_e19, 8),
      t = _e20[1],
      r = _e20[2],
      n = _e20[3],
      s = _e20[4],
      i = _e20[5],
      a = _e20[6],
      e = _e20[7];

  return [dt(t, e, r, n, s, i, a), Ie.utcInstance];
}

var Tt = Be(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, u),
    St = Be(/(\d{4})-?W(\d\d)(?:-?(\d))?/, u),
    bt = Be(/(\d{4})-?(\d{3})/, u),
    Ot = Be(rt),
    kt = Qe(st, it, at),
    Mt = Qe(t, it, at),
    Nt = Qe(l, it, at),
    Dt = Qe(it, at);
var Et = Qe(it);
var Vt = Be(/(\d{4})-(\d\d)-(\d\d)/, ne),
    It = Be(et),
    xt = Qe(st, it, at, ot),
    Ct = Qe(it, at, ot);

var $t = {
  weeks: {
    days: 7,
    hours: 168,
    minutes: 10080,
    seconds: 604800,
    milliseconds: 6048e5
  },
  days: {
    hours: 24,
    minutes: 1440,
    seconds: 86400,
    milliseconds: 864e5
  },
  hours: {
    minutes: 60,
    seconds: 3600,
    milliseconds: 36e5
  },
  minutes: {
    seconds: 60,
    milliseconds: 6e4
  },
  seconds: {
    milliseconds: 1e3
  }
},
    Zt = _objectSpread({
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 8760,
    minutes: 525600,
    seconds: 31536e3,
    milliseconds: 31536e6
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 2184,
    minutes: 131040,
    seconds: 7862400,
    milliseconds: 78624e5
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 720,
    minutes: 43200,
    seconds: 2592e3,
    milliseconds: 2592e6
  }
}, $t),
    Ft = 365.2425,
    Lt = 30.436875,
    zt = _objectSpread({
  years: {
    quarters: 4,
    months: 12,
    weeks: Ft / 7,
    days: Ft,
    hours: 24 * Ft,
    minutes: 525949.2,
    seconds: 525949.2 * 60,
    milliseconds: 525949.2 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: Ft / 28,
    days: Ft / 4,
    hours: 24 * Ft / 4,
    minutes: 131487.3,
    seconds: 525949.2 * 60 / 4,
    milliseconds: 7889237999.999999
  },
  months: {
    weeks: Lt / 7,
    days: Lt,
    hours: 24 * Lt,
    minutes: 43829.1,
    seconds: 2629746,
    milliseconds: 2629746e3
  }
}, $t),
    qt = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"],
    At = qt.slice(0).reverse();

function jt(e, t) {
  var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
  e = {
    values: r ? t.values : _objectSpread(_objectSpread({}, e.values), t.values || {}),
    loc: e.loc.clone(t.loc),
    conversionAccuracy: t.conversionAccuracy || e.conversionAccuracy
  };
  return new Ut(e);
}

function _t(e, t, r, n, s) {
  var i = e[s][r],
      a = t[r] / i,
      a = !(Math.sign(a) === Math.sign(n[s])) && 0 !== n[s] && Math.abs(a) <= 1 ? (e = a) < 0 ? Math.floor(e) : Math.ceil(e) : Math.trunc(a);
  n[s] += a, t[r] -= a * i;
}

var Ut = /*#__PURE__*/function () {
  function Ut(e) {
    _classCallCheck(this, Ut);

    var t = "longterm" === e.conversionAccuracy || !1;
    this.values = e.values, this.loc = e.loc || Ge.create(), this.conversionAccuracy = t ? "longterm" : "casual", this.invalid = e.invalid || null, this.matrix = t ? zt : Zt, this.isLuxonDuration = !0;
  }

  _createClass(Ut, [{
    key: "locale",
    get: function get() {
      return this.isValid ? this.loc.locale : null;
    }
  }, {
    key: "numberingSystem",
    get: function get() {
      return this.isValid ? this.loc.numberingSystem : null;
    }
  }, {
    key: "toFormat",
    value: function toFormat(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      t = _objectSpread(_objectSpread({}, t), {}, {
        floor: !1 !== t.round && !1 !== t.floor
      });
      return this.isValid ? ve.create(this.loc, t).formatDurationFromString(this, e) : "Invalid Duration";
    }
  }, {
    key: "toObject",
    value: function toObject() {
      return this.isValid ? _objectSpread({}, this.values) : {};
    }
  }, {
    key: "toISO",
    value: function toISO() {
      if (!this.isValid) return null;
      var e = "P";
      return 0 !== this.years && (e += this.years + "Y"), 0 === this.months && 0 === this.quarters || (e += this.months + 3 * this.quarters + "M"), 0 !== this.weeks && (e += this.weeks + "W"), 0 !== this.days && (e += this.days + "D"), 0 === this.hours && 0 === this.minutes && 0 === this.seconds && 0 === this.milliseconds || (e += "T"), 0 !== this.hours && (e += this.hours + "H"), 0 !== this.minutes && (e += this.minutes + "M"), 0 === this.seconds && 0 === this.milliseconds || (e += W(this.seconds + this.milliseconds / 1e3, 3) + "S"), "P" === e && (e += "T0S"), e;
    }
  }, {
    key: "toISOTime",
    value: function toISOTime() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!this.isValid) return null;
      var t = this.toMillis();
      if (t < 0 || 864e5 <= t) return null;
      e = _objectSpread({
        suppressMilliseconds: !1,
        suppressSeconds: !1,
        includePrefix: !1,
        format: "extended"
      }, e);
      var r = this.shiftTo("hours", "minutes", "seconds", "milliseconds");
      var n = "basic" === e.format ? "hhmm" : "hh:mm";
      e.suppressSeconds && 0 === r.seconds && 0 === r.milliseconds || (n += "basic" === e.format ? "ss" : ":ss", e.suppressMilliseconds && 0 === r.milliseconds || (n += ".SSS"));
      var s = r.toFormat(n);
      return e.includePrefix && (s = "T" + s), s;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toISO();
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.toISO();
    }
  }, {
    key: "toMillis",
    value: function toMillis() {
      return this.as("milliseconds");
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.toMillis();
    }
  }, {
    key: "plus",
    value: function plus(e) {
      if (!this.isValid) return this;
      var t = Ut.fromDurationLike(e),
          r = {};

      var _iterator2 = _createForOfIteratorHelper(qt),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _n5 = _step2.value;
          (q(t.values, _n5) || q(this.values, _n5)) && (r[_n5] = t.get(_n5) + this.get(_n5));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return jt(this, {
        values: r
      }, !0);
    }
  }, {
    key: "minus",
    value: function minus(e) {
      if (!this.isValid) return this;
      var t = Ut.fromDurationLike(e);
      return this.plus(t.negate());
    }
  }, {
    key: "mapUnits",
    value: function mapUnits(e) {
      if (!this.isValid) return this;
      var t = {};

      for (var _i3 = 0, _Object$keys = Object.keys(this.values); _i3 < _Object$keys.length; _i3++) {
        var _r2 = _Object$keys[_i3];
        t[_r2] = X(e(this.values[_r2], _r2));
      }

      return jt(this, {
        values: t
      }, !0);
    }
  }, {
    key: "get",
    value: function get(e) {
      return this[Ut.normalizeUnit(e)];
    }
  }, {
    key: "set",
    value: function set(e) {
      return this.isValid ? jt(this, {
        values: _objectSpread(_objectSpread({}, this.values), ee(e, Ut.normalizeUnit))
      }) : this;
    }
  }, {
    key: "reconfigure",
    value: function reconfigure() {
      var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          e = _ref11.locale,
          t = _ref11.numberingSystem,
          r = _ref11.conversionAccuracy;

      var n = this.loc.clone({
        locale: e,
        numberingSystem: t
      }),
          s = {
        loc: n
      };
      return r && (s.conversionAccuracy = r), jt(this, s);
    }
  }, {
    key: "as",
    value: function as(e) {
      return this.isValid ? this.shiftTo(e).get(e) : NaN;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      if (!this.isValid) return this;
      var r,
          n,
          e = this.toObject();
      return r = this.matrix, n = e, At.reduce(function (e, t) {
        return $(n[t]) ? e : (e && _t(r, n, e, n, t), t);
      }, null), jt(this, {
        values: e
      }, !0);
    }
  }, {
    key: "shiftTo",
    value: function shiftTo() {
      for (var _len5 = arguments.length, e = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        e[_key5] = arguments[_key5];
      }

      if (!this.isValid) return this;
      if (0 === e.length) return this;
      e = e.map(function (e) {
        return Ut.normalizeUnit(e);
      });
      var t = {},
          r = {},
          n = this.toObject();
      var s;

      var _iterator3 = _createForOfIteratorHelper(qt),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _a = _step3.value;

          if (0 <= e.indexOf(_a)) {
            s = _a;
            var _e21 = 0;

            for (var _o in r) {
              _e21 += this.matrix[_o][_a] * r[_o], r[_o] = 0;
            }

            Z(n[_a]) && (_e21 += n[_a]);
            var i = Math.trunc(_e21);
            t[_a] = i, r[_a] = _e21 - i;

            for (var _u in n) {
              qt.indexOf(_u) > qt.indexOf(_a) && _t(this.matrix, n, _u, t, _a);
            }
          } else Z(n[_a]) && (r[_a] = n[_a]);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      for (var _l in r) {
        0 !== r[_l] && (t[s] += _l === s ? r[_l] : r[_l] / this.matrix[s][_l]);
      }

      return jt(this, {
        values: t
      }, !0).normalize();
    }
  }, {
    key: "negate",
    value: function negate() {
      if (!this.isValid) return this;
      var e = {};

      for (var _i4 = 0, _Object$keys2 = Object.keys(this.values); _i4 < _Object$keys2.length; _i4++) {
        var _t6 = _Object$keys2[_i4];
        e[_t6] = -this.values[_t6];
      }

      return jt(this, {
        values: e
      }, !0);
    }
  }, {
    key: "years",
    get: function get() {
      return this.isValid ? this.values.years || 0 : NaN;
    }
  }, {
    key: "quarters",
    get: function get() {
      return this.isValid ? this.values.quarters || 0 : NaN;
    }
  }, {
    key: "months",
    get: function get() {
      return this.isValid ? this.values.months || 0 : NaN;
    }
  }, {
    key: "weeks",
    get: function get() {
      return this.isValid ? this.values.weeks || 0 : NaN;
    }
  }, {
    key: "days",
    get: function get() {
      return this.isValid ? this.values.days || 0 : NaN;
    }
  }, {
    key: "hours",
    get: function get() {
      return this.isValid ? this.values.hours || 0 : NaN;
    }
  }, {
    key: "minutes",
    get: function get() {
      return this.isValid ? this.values.minutes || 0 : NaN;
    }
  }, {
    key: "seconds",
    get: function get() {
      return this.isValid ? this.values.seconds || 0 : NaN;
    }
  }, {
    key: "milliseconds",
    get: function get() {
      return this.isValid ? this.values.milliseconds || 0 : NaN;
    }
  }, {
    key: "isValid",
    get: function get() {
      return null === this.invalid;
    }
  }, {
    key: "invalidReason",
    get: function get() {
      return this.invalid ? this.invalid.reason : null;
    }
  }, {
    key: "invalidExplanation",
    get: function get() {
      return this.invalid ? this.invalid.explanation : null;
    }
  }, {
    key: "equals",
    value: function equals(e) {
      if (!this.isValid || !e.isValid) return !1;
      if (!this.loc.equals(e.loc)) return !1;

      var _iterator4 = _createForOfIteratorHelper(qt),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _n6 = _step4.value;
          if (t = this.values[_n6], r = e.values[_n6], !(void 0 === t || 0 === t ? void 0 === r || 0 === r : t === r)) return !1;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      var t, r;
      return !0;
    }
  }], [{
    key: "fromMillis",
    value: function fromMillis(e, t) {
      return Ut.fromObject({
        milliseconds: e
      }, t);
    }
  }, {
    key: "fromObject",
    value: function fromObject(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (null == e || "object" != _typeof(e)) throw new a("Duration.fromObject: argument expected to be an object, got ".concat(null === e ? "null" : _typeof(e)));
      return new Ut({
        values: ee(e, Ut.normalizeUnit),
        loc: Ge.fromObject(t),
        conversionAccuracy: t.conversionAccuracy
      });
    }
  }, {
    key: "fromDurationLike",
    value: function fromDurationLike(e) {
      if (Z(e)) return Ut.fromMillis(e);
      if (Ut.isDuration(e)) return e;
      if ("object" == _typeof(e)) return Ut.fromObject(e);
      throw new a("Unknown duration argument ".concat(e, " of type ").concat(_typeof(e)));
    }
  }, {
    key: "fromISO",
    value: function fromISO(e, t) {
      var _Ke = Ke(e, [lt, ct]),
          _Ke2 = _slicedToArray(_Ke, 1),
          r = _Ke2[0];

      return r ? Ut.fromObject(r, t) : Ut.invalid("unparsable", "the input \"".concat(e, "\" can't be parsed as ISO 8601"));
    }
  }, {
    key: "fromISOTime",
    value: function fromISOTime(e, t) {
      var _Ke3 = Ke(e, [ut, Et]),
          _Ke4 = _slicedToArray(_Ke3, 1),
          r = _Ke4[0];

      return r ? Ut.fromObject(r, t) : Ut.invalid("unparsable", "the input \"".concat(e, "\" can't be parsed as ISO 8601"));
    }
  }, {
    key: "invalid",
    value: function invalid(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!e) throw new a("need to specify a reason the Duration is invalid");
      t = e instanceof Te ? e : new Te(e, t);
      if (Ae.throwOnInvalid) throw new s(t);
      return new Ut({
        invalid: t
      });
    }
  }, {
    key: "normalizeUnit",
    value: function normalizeUnit(e) {
      var t = {
        year: "years",
        years: "years",
        quarter: "quarters",
        quarters: "quarters",
        month: "months",
        months: "months",
        week: "weeks",
        weeks: "weeks",
        day: "days",
        days: "days",
        hour: "hours",
        hours: "hours",
        minute: "minutes",
        minutes: "minutes",
        second: "seconds",
        seconds: "seconds",
        millisecond: "milliseconds",
        milliseconds: "milliseconds"
      }[e && e.toLowerCase()];
      if (!t) throw new i(e);
      return t;
    }
  }, {
    key: "isDuration",
    value: function isDuration(e) {
      return e && e.isLuxonDuration || !1;
    }
  }]);

  return Ut;
}();

exports.Duration = Ut;
var Ht = "Invalid Interval";

var Wt = /*#__PURE__*/function () {
  function Wt(e) {
    _classCallCheck(this, Wt);

    this.s = e.start, this.e = e.end, this.invalid = e.invalid || null, this.isLuxonInterval = !0;
  }

  _createClass(Wt, [{
    key: "start",
    get: function get() {
      return this.isValid ? this.s : null;
    }
  }, {
    key: "end",
    get: function get() {
      return this.isValid ? this.e : null;
    }
  }, {
    key: "isValid",
    get: function get() {
      return null === this.invalidReason;
    }
  }, {
    key: "invalidReason",
    get: function get() {
      return this.invalid ? this.invalid.reason : null;
    }
  }, {
    key: "invalidExplanation",
    get: function get() {
      return this.invalid ? this.invalid.explanation : null;
    }
  }, {
    key: "length",
    value: function length() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "milliseconds";
      return this.isValid ? this.toDuration(e).get(e) : NaN;
    }
  }, {
    key: "count",
    value: function count() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "milliseconds";
      if (!this.isValid) return NaN;
      var t = this.start.startOf(e),
          r = this.end.startOf(e);
      return Math.floor(r.diff(t, e).get(e)) + 1;
    }
  }, {
    key: "hasSame",
    value: function hasSame(e) {
      return !!this.isValid && (this.isEmpty() || this.e.minus(1).hasSame(this.s, e));
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.s.valueOf() === this.e.valueOf();
    }
  }, {
    key: "isAfter",
    value: function isAfter(e) {
      return !!this.isValid && this.s > e;
    }
  }, {
    key: "isBefore",
    value: function isBefore(e) {
      return !!this.isValid && this.e <= e;
    }
  }, {
    key: "contains",
    value: function contains(e) {
      return !!this.isValid && this.s <= e && this.e > e;
    }
  }, {
    key: "set",
    value: function set() {
      var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          e = _ref12.start,
          t = _ref12.end;

      return this.isValid ? Wt.fromDateTimes(e || this.s, t || this.e) : this;
    }
  }, {
    key: "splitAt",
    value: function splitAt() {
      var _this10 = this;

      if (!this.isValid) return [];

      for (var _len6 = arguments.length, e = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        e[_key6] = arguments[_key6];
      }

      var t = e.map(Rr).filter(function (e) {
        return _this10.contains(e);
      }).sort(),
          r = [];
      var n = this.s,
          s = 0;

      for (; n < this.e;) {
        var i = t[s] || this.e,
            i = +i > +this.e ? this.e : i;
        r.push(Wt.fromDateTimes(n, i)), n = i, s += 1;
      }

      return r;
    }
  }, {
    key: "splitBy",
    value: function splitBy(e) {
      var t = Ut.fromDurationLike(e);
      if (!this.isValid || !t.isValid || 0 === t.as("milliseconds")) return [];
      var r = this.s,
          n = 1,
          s;
      var i = [];

      for (; r < this.e;) {
        var a = this.start.plus(t.mapUnits(function (e) {
          return e * n;
        }));
        s = +a > +this.e ? this.e : a, i.push(Wt.fromDateTimes(r, s)), r = s, n += 1;
      }

      return i;
    }
  }, {
    key: "divideEqually",
    value: function divideEqually(e) {
      return this.isValid ? this.splitBy(this.length() / e).slice(0, e) : [];
    }
  }, {
    key: "overlaps",
    value: function overlaps(e) {
      return this.e > e.s && this.s < e.e;
    }
  }, {
    key: "abutsStart",
    value: function abutsStart(e) {
      return !!this.isValid && +this.e == +e.s;
    }
  }, {
    key: "abutsEnd",
    value: function abutsEnd(e) {
      return !!this.isValid && +e.e == +this.s;
    }
  }, {
    key: "engulfs",
    value: function engulfs(e) {
      return !!this.isValid && this.s <= e.s && this.e >= e.e;
    }
  }, {
    key: "equals",
    value: function equals(e) {
      return !(!this.isValid || !e.isValid) && this.s.equals(e.s) && this.e.equals(e.e);
    }
  }, {
    key: "intersection",
    value: function intersection(e) {
      if (!this.isValid) return this;
      var t = (this.s > e.s ? this : e).s,
          e = (this.e < e.e ? this : e).e;
      return e <= t ? null : Wt.fromDateTimes(t, e);
    }
  }, {
    key: "union",
    value: function union(e) {
      if (!this.isValid) return this;
      var t = (this.s < e.s ? this : e).s,
          e = (this.e > e.e ? this : e).e;
      return Wt.fromDateTimes(t, e);
    }
  }, {
    key: "difference",
    value: function difference() {
      var _this11 = this;

      for (var _len7 = arguments.length, e = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        e[_key7] = arguments[_key7];
      }

      return Wt.xor([this].concat(e)).map(function (e) {
        return _this11.intersection(e);
      }).filter(function (e) {
        return e && !e.isEmpty();
      });
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.isValid ? "[".concat(this.s.toISO(), " \u2013 ").concat(this.e.toISO(), ")") : Ht;
    }
  }, {
    key: "toISO",
    value: function toISO(e) {
      return this.isValid ? "".concat(this.s.toISO(e), "/").concat(this.e.toISO(e)) : Ht;
    }
  }, {
    key: "toISODate",
    value: function toISODate() {
      return this.isValid ? "".concat(this.s.toISODate(), "/").concat(this.e.toISODate()) : Ht;
    }
  }, {
    key: "toISOTime",
    value: function toISOTime(e) {
      return this.isValid ? "".concat(this.s.toISOTime(e), "/").concat(this.e.toISOTime(e)) : Ht;
    }
  }, {
    key: "toFormat",
    value: function toFormat(e) {
      var _ref13 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref13$separator = _ref13.separator,
          t = _ref13$separator === void 0 ? " – " : _ref13$separator;

      return this.isValid ? "".concat(this.s.toFormat(e)).concat(t).concat(this.e.toFormat(e)) : Ht;
    }
  }, {
    key: "toDuration",
    value: function toDuration(e, t) {
      return this.isValid ? this.e.diff(this.s, e, t) : Ut.invalid(this.invalidReason);
    }
  }, {
    key: "mapEndpoints",
    value: function mapEndpoints(e) {
      return Wt.fromDateTimes(e(this.s), e(this.e));
    }
  }], [{
    key: "invalid",
    value: function invalid(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!e) throw new a("need to specify a reason the Interval is invalid");
      t = e instanceof Te ? e : new Te(e, t);
      if (Ae.throwOnInvalid) throw new n(t);
      return new Wt({
        invalid: t
      });
    }
  }, {
    key: "fromDateTimes",
    value: function fromDateTimes(e, t) {
      var r = Rr(e),
          n = Rr(t),
          e = (e = n, (t = r) && t.isValid ? e && e.isValid ? e < t ? Wt.invalid("end before start", "The end of an interval must be after its start, but you had start=".concat(t.toISO(), " and end=").concat(e.toISO())) : null : Wt.invalid("missing or invalid end") : Wt.invalid("missing or invalid start"));
      return null == e ? new Wt({
        start: r,
        end: n
      }) : e;
    }
  }, {
    key: "after",
    value: function after(e, t) {
      var r = Ut.fromDurationLike(t),
          n = Rr(e);
      return Wt.fromDateTimes(n, n.plus(r));
    }
  }, {
    key: "before",
    value: function before(e, t) {
      var r = Ut.fromDurationLike(t),
          n = Rr(e);
      return Wt.fromDateTimes(n.minus(r), n);
    }
  }, {
    key: "fromISO",
    value: function fromISO(e, s) {
      var _split = (e || "").split("/", 2),
          _split2 = _slicedToArray(_split, 2),
          i = _split2[0],
          a = _split2[1];

      if (i && a) {
        var _e22, _t7;

        try {
          _e22 = Wr.fromISO(i, s), _t7 = _e22.isValid;
        } catch (a) {
          _t7 = !1;
        }

        var _r3, _n7;

        try {
          _r3 = Wr.fromISO(a, s), _n7 = _r3.isValid;
        } catch (a) {
          _n7 = !1;
        }

        if (_t7 && _n7) return Wt.fromDateTimes(_e22, _r3);

        if (_t7) {
          var o = Ut.fromISO(a, s);
          if (o.isValid) return Wt.after(_e22, o);
        } else if (_n7) {
          s = Ut.fromISO(i, s);
          if (s.isValid) return Wt.before(_r3, s);
        }
      }

      return Wt.invalid("unparsable", "the input \"".concat(e, "\" can't be parsed as ISO 8601"));
    }
  }, {
    key: "isInterval",
    value: function isInterval(e) {
      return e && e.isLuxonInterval || !1;
    }
  }, {
    key: "merge",
    value: function merge(e) {
      var _e$sort$reduce = e.sort(function (e, t) {
        return e.s - t.s;
      }).reduce(function (_ref14, r) {
        var _ref15 = _slicedToArray(_ref14, 2),
            e = _ref15[0],
            t = _ref15[1];

        return t ? t.overlaps(r) || t.abutsStart(r) ? [e, t.union(r)] : [e.concat([t]), r] : [e, r];
      }, [[], null]),
          _e$sort$reduce2 = _slicedToArray(_e$sort$reduce, 2),
          t = _e$sort$reduce2[0],
          r = _e$sort$reduce2[1];

      return r && t.push(r), t;
    }
  }, {
    key: "xor",
    value: function xor(e) {
      var _Array$prototype;

      var t = null,
          r = 0;

      var n = [],
          s = e.map(function (e) {
        return [{
          time: e.s,
          type: "s"
        }, {
          time: e.e,
          type: "e"
        }];
      }),
          i = (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, _toConsumableArray(s)),
          a = i.sort(function (e, t) {
        return e.time - t.time;
      });

      var _iterator5 = _createForOfIteratorHelper(a),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _o2 = _step5.value;
          r += "s" === _o2.type ? 1 : -1, t = 1 === r ? _o2.time : (t && +t != +_o2.time && n.push(Wt.fromDateTimes(t, _o2.time)), null);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      return Wt.merge(n);
    }
  }]);

  return Wt;
}();

exports.Interval = Wt;

var Rt = /*#__PURE__*/function () {
  function Rt() {
    _classCallCheck(this, Rt);
  }

  _createClass(Rt, null, [{
    key: "hasDST",
    value: function hasDST() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Ae.defaultZone;
      var t = Wr.now().setZone(e).set({
        month: 12
      });
      return !e.isUniversal && t.offset !== t.set({
        month: 6
      }).offset;
    }
  }, {
    key: "isValidIANAZone",
    value: function isValidIANAZone(e) {
      return Ee.isValidSpecifier(e) && Ee.isValidZone(e);
    }
  }, {
    key: "normalizeZone",
    value: function normalizeZone(e) {
      return Ce(e, Ae.defaultZone);
    }
  }, {
    key: "months",
    value: function months() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "long";

      var _ref16 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref16$locale = _ref16.locale,
          t = _ref16$locale === void 0 ? null : _ref16$locale,
          _ref16$numberingSyste = _ref16.numberingSystem,
          r = _ref16$numberingSyste === void 0 ? null : _ref16$numberingSyste,
          _ref16$locObj = _ref16.locObj,
          n = _ref16$locObj === void 0 ? null : _ref16$locObj,
          _ref16$outputCalendar = _ref16.outputCalendar,
          s = _ref16$outputCalendar === void 0 ? "gregory" : _ref16$outputCalendar;

      return (n || Ge.create(t, r, s)).months(e);
    }
  }, {
    key: "monthsFormat",
    value: function monthsFormat() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "long";

      var _ref17 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref17$locale = _ref17.locale,
          t = _ref17$locale === void 0 ? null : _ref17$locale,
          _ref17$numberingSyste = _ref17.numberingSystem,
          r = _ref17$numberingSyste === void 0 ? null : _ref17$numberingSyste,
          _ref17$locObj = _ref17.locObj,
          n = _ref17$locObj === void 0 ? null : _ref17$locObj,
          _ref17$outputCalendar = _ref17.outputCalendar,
          s = _ref17$outputCalendar === void 0 ? "gregory" : _ref17$outputCalendar;

      return (n || Ge.create(t, r, s)).months(e, !0);
    }
  }, {
    key: "weekdays",
    value: function weekdays() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "long";

      var _ref18 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref18$locale = _ref18.locale,
          t = _ref18$locale === void 0 ? null : _ref18$locale,
          _ref18$numberingSyste = _ref18.numberingSystem,
          r = _ref18$numberingSyste === void 0 ? null : _ref18$numberingSyste,
          _ref18$locObj = _ref18.locObj,
          n = _ref18$locObj === void 0 ? null : _ref18$locObj;

      return (n || Ge.create(t, r, null)).weekdays(e);
    }
  }, {
    key: "weekdaysFormat",
    value: function weekdaysFormat() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "long";

      var _ref19 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref19$locale = _ref19.locale,
          t = _ref19$locale === void 0 ? null : _ref19$locale,
          _ref19$numberingSyste = _ref19.numberingSystem,
          r = _ref19$numberingSyste === void 0 ? null : _ref19$numberingSyste,
          _ref19$locObj = _ref19.locObj,
          n = _ref19$locObj === void 0 ? null : _ref19$locObj;

      return (n || Ge.create(t, r, null)).weekdays(e, !0);
    }
  }, {
    key: "meridiems",
    value: function meridiems() {
      var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref20$locale = _ref20.locale,
          e = _ref20$locale === void 0 ? null : _ref20$locale;

      return Ge.create(e).meridiems();
    }
  }, {
    key: "eras",
    value: function eras() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "short";

      var _ref21 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref21$locale = _ref21.locale,
          t = _ref21$locale === void 0 ? null : _ref21$locale;

      return Ge.create(t, null, "gregory").eras(e);
    }
  }, {
    key: "features",
    value: function features() {
      return {
        relative: L()
      };
    }
  }]);

  return Rt;
}();

exports.Info = Rt;

function Pt(e, t) {
  var r = function r(e) {
    return e.toUTC(0, {
      keepLocalTime: !0
    }).startOf("day").valueOf();
  },
      e = r(t) - r(e);

  return Math.floor(Ut.fromMillis(e).as("days"));
}

function Jt(e, t, r, n) {
  var _Ut$fromMillis;

  var _ref22 = function (t, r, e) {
    var n, s;
    var i = {};
    var a, o;

    for (var _i5 = 0, _arr2 = [["years", function (e, t) {
      return t.year - e.year;
    }], ["quarters", function (e, t) {
      return t.quarter - e.quarter;
    }], ["months", function (e, t) {
      return t.month - e.month + 12 * (t.year - e.year);
    }], ["weeks", function (e, t) {
      t = Pt(e, t);
      return (t - t % 7) / 7;
    }], ["days", Pt]]; _i5 < _arr2.length; _i5++) {
      var _arr2$_i = _slicedToArray(_arr2[_i5], 2);

      n = _arr2$_i[0];
      s = _arr2$_i[1];

      if (0 <= e.indexOf(n)) {
        a = n;

        var _e23 = s(t, r);

        o = t.plus(_defineProperty({}, n, _e23)), o > r ? (t = t.plus(_defineProperty({}, n, _e23 - 1)), --_e23) : t = o, i[n] = _e23;
      }
    }

    return [t, i, o, a];
  }(e, t, r),
      _ref23 = _slicedToArray(_ref22, 4),
      s = _ref23[0],
      i = _ref23[1],
      a = _ref23[2],
      o = _ref23[3];

  e = t - s, r = r.filter(function (e) {
    return 0 <= ["hours", "minutes", "seconds", "milliseconds"].indexOf(e);
  });
  0 === r.length && (a < t && (a = s.plus(_defineProperty({}, o, 1))), a !== s && (i[o] = (i[o] || 0) + e / (a - s)));
  t = Ut.fromObject(i, n);
  return 0 < r.length ? (_Ut$fromMillis = Ut.fromMillis(e, n)).shiftTo.apply(_Ut$fromMillis, _toConsumableArray(r)).plus(t) : t;
}

var Yt = {
  arab: "[٠-٩]",
  arabext: "[۰-۹]",
  bali: "[᭐-᭙]",
  beng: "[০-৯]",
  deva: "[०-९]",
  fullwide: "[０-９]",
  gujr: "[૦-૯]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[០-៩]",
  knda: "[೦-೯]",
  laoo: "[໐-໙]",
  limb: "[᥆-᥏]",
  mlym: "[൦-൯]",
  mong: "[᠐-᠙]",
  mymr: "[၀-၉]",
  orya: "[୦-୯]",
  tamldec: "[௦-௯]",
  telu: "[౦-౯]",
  thai: "[๐-๙]",
  tibt: "[༠-༩]",
  latn: "\\d"
},
    Gt = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
},
    Bt = Yt.hanidec.replace(/[\[|\]]/g, "").split("");

function Qt(_ref24) {
  var e = _ref24.numberingSystem;
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  return new RegExp("".concat(Yt[e || "latn"]).concat(t));
}

var Kt = "missing Intl.DateTimeFormat.formatToParts support";

function Xt(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (e) {
    return e;
  };
  return {
    regex: e,
    deser: function deser(_ref25) {
      var _ref26 = _slicedToArray(_ref25, 1),
          e = _ref26[0];

      return t(function (t) {
        var r = parseInt(t, 10);

        if (isNaN(r)) {
          r = "";

          for (var _e24 = 0; _e24 < t.length; _e24++) {
            var n = t.charCodeAt(_e24);
            if (-1 !== t[_e24].search(Yt.hanidec)) r += Bt.indexOf(t[_e24]);else for (var _a2 in Gt) {
              var _Gt$_a = _slicedToArray(Gt[_a2], 2),
                  s = _Gt$_a[0],
                  i = _Gt$_a[1];

              s <= n && n <= i && (r += n - s);
            }
          }

          return parseInt(r, 10);
        }

        return r;
      }(e));
    }
  };
}

var er = "( |".concat(String.fromCharCode(160), ")"),
    tr = new RegExp(er, "g");

function rr(e) {
  return e.replace(/\./g, "\\.?").replace(tr, er);
}

function nr(e) {
  return e.replace(/\./g, "").replace(tr, " ").toLowerCase();
}

function sr(e, r) {
  return null === e ? null : {
    regex: RegExp(e.map(rr).join("|")),
    deser: function deser(_ref27) {
      var _ref28 = _slicedToArray(_ref27, 1),
          t = _ref28[0];

      return e.findIndex(function (e) {
        return nr(t) === nr(e);
      }) + r;
    }
  };
}

function ir(e, t) {
  return {
    regex: e,
    deser: function deser(_ref29) {
      var _ref30 = _slicedToArray(_ref29, 3),
          e = _ref30[1],
          t = _ref30[2];

      return K(e, t);
    },
    groups: t
  };
}

function ar(e) {
  return {
    regex: e,
    deser: function deser(_ref31) {
      var _ref32 = _slicedToArray(_ref31, 1),
          e = _ref32[0];

      return e;
    }
  };
}

var or = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour: {
    numeric: "h",
    "2-digit": "hh"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  }
};
var ur = null;

function lr(e, t) {
  if (e.literal) return e;
  var r = ve.macroTokenToFormatOpts(e.val);
  if (!r) return e;
  var n = ve.create(t, r),
      s = n.formatDateTimeParts((ur = ur || Wr.fromMillis(1555555555555), ur)),
      i = s.map(function (e) {
    return function (e, t) {
      var _e25 = e,
          r = _e25.type,
          e = _e25.value;
      if ("literal" === r) return {
        literal: !0,
        val: e
      };
      t = t[r];
      var n = or[r];
      return "object" == _typeof(n) && (n = n[t]), n ? {
        literal: !1,
        val: n
      } : void 0;
    }(e, r);
  });
  return i.includes(void 0) ? e : i;
}

function cr(t, e, r) {
  var _Array$prototype2;

  var n = (l = ve.parseFormat(r), a = t, (_Array$prototype2 = Array.prototype).concat.apply(_Array$prototype2, _toConsumableArray(l.map(function (e) {
    return lr(e, a);
  })))),
      s = n.map(function (e) {
    return function (t, r) {
      var n = Qt(r),
          s = Qt(r, "{2}"),
          i = Qt(r, "{3}"),
          a = Qt(r, "{4}"),
          o = Qt(r, "{6}"),
          u = Qt(r, "{1,2}"),
          l = Qt(r, "{1,3}"),
          c = Qt(r, "{1,6}"),
          h = Qt(r, "{1,9}"),
          d = Qt(r, "{2,4}"),
          m = Qt(r, "{4,6}"),
          f = function f(e) {
        return {
          regex: RegExp(e.val.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")),
          deser: function deser(_ref33) {
            var _ref34 = _slicedToArray(_ref33, 1),
                e = _ref34[0];

            return e;
          },
          literal: !0
        };
      },
          e = function (e) {
        if (t.literal) return f(e);

        switch (e.val) {
          case "G":
            return sr(r.eras("short", !1), 0);

          case "GG":
            return sr(r.eras("long", !1), 0);

          case "y":
            return Xt(c);

          case "yy":
            return Xt(d, B);

          case "yyyy":
            return Xt(a);

          case "yyyyy":
            return Xt(m);

          case "yyyyyy":
            return Xt(o);

          case "M":
            return Xt(u);

          case "MM":
            return Xt(s);

          case "MMM":
            return sr(r.months("short", !0, !1), 1);

          case "MMMM":
            return sr(r.months("long", !0, !1), 1);

          case "L":
            return Xt(u);

          case "LL":
            return Xt(s);

          case "LLL":
            return sr(r.months("short", !1, !1), 1);

          case "LLLL":
            return sr(r.months("long", !1, !1), 1);

          case "d":
            return Xt(u);

          case "dd":
            return Xt(s);

          case "o":
            return Xt(l);

          case "ooo":
            return Xt(i);

          case "HH":
            return Xt(s);

          case "H":
            return Xt(u);

          case "hh":
            return Xt(s);

          case "h":
            return Xt(u);

          case "mm":
            return Xt(s);

          case "m":
          case "q":
            return Xt(u);

          case "qq":
            return Xt(s);

          case "s":
            return Xt(u);

          case "ss":
            return Xt(s);

          case "S":
            return Xt(l);

          case "SSS":
            return Xt(i);

          case "u":
            return ar(h);

          case "uu":
            return ar(u);

          case "uuu":
            return Xt(n);

          case "a":
            return sr(r.meridiems(), 0);

          case "kkkk":
            return Xt(a);

          case "kk":
            return Xt(d, B);

          case "W":
            return Xt(u);

          case "WW":
            return Xt(s);

          case "E":
          case "c":
            return Xt(n);

          case "EEE":
            return sr(r.weekdays("short", !1, !1), 1);

          case "EEEE":
            return sr(r.weekdays("long", !1, !1), 1);

          case "ccc":
            return sr(r.weekdays("short", !0, !1), 1);

          case "cccc":
            return sr(r.weekdays("long", !0, !1), 1);

          case "Z":
          case "ZZ":
            return ir(new RegExp("([+-]".concat(u.source, ")(?::(").concat(s.source, "))?")), 2);

          case "ZZZ":
            return ir(new RegExp("([+-]".concat(u.source, ")(").concat(s.source, ")?")), 2);

          case "z":
            return ar(/[a-z_+-/]{1,256}?/i);

          default:
            return f(e);
        }
      }(t) || {
        invalidReason: Kt
      };

      return e.token = t, e;
    }(e, t);
  }),
      i = s.find(function (e) {
    return e.invalidReason;
  });
  var a;
  if (i) return {
    input: e,
    tokens: n,
    invalidReason: i.invalidReason
  };

  var o = "^".concat((c = s).map(function (e) {
    return e.regex;
  }).reduce(function (e, t) {
    return "".concat(e, "(").concat(t.source, ")");
  }, ""), "$"),
      u = c,
      r = RegExp(o, "i"),
      _ref35 = function (e, t, r) {
    var n = e.match(t);

    if (n) {
      var _s2 = {};
      var _e26 = 1;

      for (var _i6 in r) {
        if (q(r, _i6)) {
          var _a3 = r[_i6],
              _o3 = _a3.groups ? _a3.groups + 1 : 1;

          !_a3.literal && _a3.token && (_s2[_a3.token.val[0]] = _a3.deser(n.slice(_e26, _e26 + _o3))), _e26 += _o3;
        }
      }

      return [n, _s2];
    }

    return [n, {}];
  }(e, r, u),
      _ref36 = _slicedToArray(_ref35, 2),
      l = _ref36[0],
      c = _ref36[1],
      _ref37 = c ? function (n) {
    var e;
    return e = $(n.Z) ? $(n.z) ? null : Ee.create(n.z) : new Ie(n.Z), $(n.q) || (n.M = 3 * (n.q - 1) + 1), $(n.h) || (n.h < 12 && 1 === n.a ? n.h += 12 : 12 === n.h && 0 === n.a && (n.h = 0)), 0 === n.G && n.y && (n.y = -n.y), $(n.u) || (n.S = H(n.u)), [Object.keys(n).reduce(function (e, t) {
      var r = function (e) {
        switch (e) {
          case "S":
            return "millisecond";

          case "s":
            return "second";

          case "m":
            return "minute";

          case "h":
          case "H":
            return "hour";

          case "d":
            return "day";

          case "o":
            return "ordinal";

          case "L":
          case "M":
            return "month";

          case "y":
            return "year";

          case "E":
          case "c":
            return "weekday";

          case "W":
            return "weekNumber";

          case "k":
            return "weekYear";

          case "q":
            return "quarter";

          default:
            return null;
        }
      }(t);

      return r && (e[r] = n[t]), e;
    }, {}), e];
  }(c) : [null, null],
      _ref38 = _slicedToArray(_ref37, 2),
      o = _ref38[0],
      u = _ref38[1];

  if (q(c, "a") && q(c, "H")) throw new N("Can't include meridiem when specifying 24-hour format");
  return {
    input: e,
    tokens: n,
    regex: r,
    rawMatches: l,
    matches: c,
    result: o,
    zone: u
  };
}

var hr = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    dr = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

function mr(e, t) {
  return new Te("unit out of range", "you specified ".concat(t, " (of type ").concat(_typeof(t), ") as a ").concat(e, ", which is invalid"));
}

function fr(e, t, r) {
  r = new Date(Date.UTC(e, t - 1, r)).getUTCDay();
  return 0 === r ? 7 : r;
}

function yr(e, t, r) {
  return r + (R(e) ? dr : hr)[t - 1];
}

function gr(e, t) {
  var r = R(e) ? dr : hr,
      n = r.findIndex(function (e) {
    return e < t;
  }),
      s = t - r[n];
  return {
    month: n + 1,
    day: s
  };
}

function wr(e) {
  var t = e.year,
      r = e.month,
      n = e.day,
      s = yr(t, r, n),
      n = fr(t, r, n);
  var i = Math.floor((s - n + 10) / 7),
      a;
  return i < 1 ? (a = t - 1, i = G(a)) : i > G(t) ? (a = t + 1, i = 1) : a = t, _objectSpread({
    weekYear: a,
    weekNumber: i,
    weekday: n
  }, re(e));
}

function pr(e) {
  var t = e.weekYear,
      r = e.weekNumber,
      n = e.weekday,
      s = fr(t, 1, 4),
      i = P(t);
  var a = 7 * r + n - s - 3,
      o;
  a < 1 ? (o = t - 1, a += P(o)) : a > i ? (o = t + 1, a -= P(t)) : o = t;

  var _gr = gr(o, a),
      i = _gr.month,
      t = _gr.day;

  return _objectSpread({
    year: o,
    month: i,
    day: t
  }, re(e));
}

function vr(e) {
  var t = e.year,
      r = e.month,
      n = e.day;
  return _objectSpread({
    year: t,
    ordinal: yr(t, r, n)
  }, re(e));
}

function Tr(e) {
  var t = e.year,
      r = e.ordinal,
      _gr2 = gr(t, r),
      n = _gr2.month,
      r = _gr2.day;

  return _objectSpread({
    year: t,
    month: n,
    day: r
  }, re(e));
}

function Sr(e) {
  var t = F(e.year),
      r = A(e.month, 1, 12),
      n = A(e.day, 1, J(e.year, e.month));
  return t ? r ? !n && mr("day", e.day) : mr("month", e.month) : mr("year", e.year);
}

function br(e) {
  var _e27 = e,
      t = _e27.hour,
      r = _e27.minute,
      n = _e27.second,
      s = _e27.millisecond,
      i = A(t, 0, 23) || 24 === t && 0 === r && 0 === n && 0 === s,
      a = A(r, 0, 59),
      o = A(n, 0, 59),
      e = A(s, 0, 999);
  return i ? a ? o ? !e && mr("millisecond", s) : mr("second", n) : mr("minute", r) : mr("hour", t);
}

var Or = "Invalid DateTime";

function kr(e) {
  return new Te("unsupported zone", "the zone \"".concat(e.name, "\" is not supported"));
}

function Mr(e) {
  return null === e.weekData && (e.weekData = wr(e.c)), e.weekData;
}

function Nr(e, t) {
  e = {
    ts: e.ts,
    zone: e.zone,
    c: e.c,
    o: e.o,
    loc: e.loc,
    invalid: e.invalid
  };
  return new Wr(_objectSpread(_objectSpread(_objectSpread({}, e), t), {}, {
    old: e
  }));
}

function Dr(e, t, r) {
  var n = e - 60 * t * 1e3;
  var s = r.offset(n);
  if (t === s) return [n, t];
  n -= 60 * (s - t) * 1e3;
  r = r.offset(n);
  return s === r ? [n, s] : [e - 60 * Math.min(s, r) * 1e3, Math.max(s, r)];
}

function Er(e, t) {
  e += 60 * t * 1e3;
  var r = new Date(e);
  return {
    year: r.getUTCFullYear(),
    month: r.getUTCMonth() + 1,
    day: r.getUTCDate(),
    hour: r.getUTCHours(),
    minute: r.getUTCMinutes(),
    second: r.getUTCSeconds(),
    millisecond: r.getUTCMilliseconds()
  };
}

function Vr(e, t, r) {
  return Dr(Y(e), t, r);
}

function Ir(e, t) {
  var r = e.o,
      n = e.c.year + Math.trunc(t.years),
      s = e.c.month + Math.trunc(t.months) + 3 * Math.trunc(t.quarters),
      s = _objectSpread(_objectSpread({}, e.c), {}, {
    year: n,
    month: s,
    day: Math.min(e.c.day, J(n, s)) + Math.trunc(t.days) + 7 * Math.trunc(t.weeks)
  }),
      t = Ut.fromObject({
    years: t.years - Math.trunc(t.years),
    quarters: t.quarters - Math.trunc(t.quarters),
    months: t.months - Math.trunc(t.months),
    weeks: t.weeks - Math.trunc(t.weeks),
    days: t.days - Math.trunc(t.days),
    hours: t.hours,
    minutes: t.minutes,
    seconds: t.seconds,
    milliseconds: t.milliseconds
  }).as("milliseconds");

  var _Dr = Dr(Y(s), r, e.zone),
      _Dr2 = _slicedToArray(_Dr, 2),
      i = _Dr2[0],
      a = _Dr2[1];

  return 0 !== t && (i += t, a = e.zone.offset(i)), {
    ts: i,
    o: a
  };
}

function xr(e, t, r, n, s) {
  var i = r.setZone,
      a = r.zone;

  if (e && 0 !== Object.keys(e).length) {
    var _o4 = t || a,
        _u2 = Wr.fromObject(e, _objectSpread(_objectSpread({}, r), {}, {
      zone: _o4
    }));

    return i ? _u2 : _u2.setZone(a);
  }

  return Wr.invalid(new Te("unparsable", "the input \"".concat(s, "\" can't be parsed as ").concat(n)));
}

function Cr(e, t) {
  var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
  return e.isValid ? ve.create(Ge.create("en-US"), {
    allowZ: r,
    forceSimple: !0
  }).formatDateTimeFromString(e, t) : null;
}

function $r(e, _ref39) {
  var _ref39$suppressSecond = _ref39.suppressSeconds,
      t = _ref39$suppressSecond === void 0 ? !1 : _ref39$suppressSecond,
      _ref39$suppressMillis = _ref39.suppressMilliseconds,
      r = _ref39$suppressMillis === void 0 ? !1 : _ref39$suppressMillis,
      n = _ref39.includeOffset,
      _ref39$includePrefix = _ref39.includePrefix,
      s = _ref39$includePrefix === void 0 ? !1 : _ref39$includePrefix,
      _ref39$includeZone = _ref39.includeZone,
      i = _ref39$includeZone === void 0 ? !1 : _ref39$includeZone,
      _ref39$spaceZone = _ref39.spaceZone,
      a = _ref39$spaceZone === void 0 ? !1 : _ref39$spaceZone,
      _ref39$format = _ref39.format,
      o = _ref39$format === void 0 ? "extended" : _ref39$format;
  var u = "basic" === o ? "HHmm" : "HH:mm";
  t && 0 === e.second && 0 === e.millisecond || (u += "basic" === o ? "ss" : ":ss", r && 0 === e.millisecond || (u += ".SSS")), (i || n) && a && (u += " "), i ? u += "z" : n && (u += "basic" === o ? "ZZZ" : "ZZ");
  var l = Cr(e, u);
  return s && (l = "T" + l), l;
}

var Zr = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
},
    Fr = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
},
    Lr = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
},
    zr = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
    qr = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"],
    Ar = ["year", "ordinal", "hour", "minute", "second", "millisecond"];

function jr(e) {
  var t = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[e.toLowerCase()];
  if (!t) throw new i(e);
  return t;
}

function _r(e, t) {
  var r = Ce(t.zone, Ae.defaultZone),
      n = Ge.fromObject(t),
      s = Ae.now();
  var i, a;
  if ($(e.year)) i = s;else {
    var _iterator6 = _createForOfIteratorHelper(zr),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var _o5 = _step6.value;
        $(e[_o5]) && (e[_o5] = Zr[_o5]);
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    t = Sr(e) || br(e);
    if (t) return Wr.invalid(t);
    t = r.offset(s);

    var _Vr = Vr(e, t, r);

    var _Vr2 = _slicedToArray(_Vr, 2);

    i = _Vr2[0];
    a = _Vr2[1];
  }
  return new Wr({
    ts: i,
    zone: r,
    loc: n,
    o: a
  });
}

function Ur(t, n, s) {
  var i = !!$(s.round) || s.round,
      e = function e(_e28, t) {
    _e28 = W(_e28, i || s.calendary ? 0 : 2, !0);
    var r = n.loc.clone(s).relFormatter(s);
    return r.format(_e28, t);
  },
      r = function r(e) {
    return s.calendary ? n.hasSame(t, e) ? 0 : n.startOf(e).diff(t.startOf(e), e).get(e) : n.diff(t, e).get(e);
  };

  if (s.unit) return e(r(s.unit), s.unit);

  var _iterator7 = _createForOfIteratorHelper(s.units),
      _step7;

  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var _o6 = _step7.value;
      var a = r(_o6);
      if (1 <= Math.abs(a)) return e(a, _o6);
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }

  return e(n < t ? -0 : 0, s.units[s.units.length - 1]);
}

function Hr(e) {
  var t = {},
      r;
  return r = 0 < e.length && "object" == _typeof(e[e.length - 1]) ? (t = e[e.length - 1], Array.from(e).slice(0, e.length - 1)) : Array.from(e), [t, r];
}

var Wr = /*#__PURE__*/function () {
  function Wr(e) {
    var _ref40;

    _classCallCheck(this, Wr);

    var t = e.zone || Ae.defaultZone;
    var r = e.invalid || (Number.isNaN(e.ts) ? new Te("invalid input") : null) || (t.isValid ? null : kr(t));
    this.ts = $(e.ts) ? Ae.now() : e.ts;
    var n = null,
        s = null;
    var i;
    r || (e.old && e.old.ts === this.ts && e.old.zone.equals(t) ? (_ref40 = [e.old.c, e.old.o], n = _ref40[0], s = _ref40[1], _ref40) : (i = t.offset(this.ts), n = Er(this.ts, i), r = Number.isNaN(n.year) ? new Te("invalid input") : null, n = r ? null : n, s = r ? null : i)), this._zone = t, this.loc = e.loc || Ge.create(), this.invalid = r, this.weekData = null, this.c = n, this.o = s, this.isLuxonDateTime = !0;
  }

  _createClass(Wr, [{
    key: "get",
    value: function get(e) {
      return this[e];
    }
  }, {
    key: "isValid",
    get: function get() {
      return null === this.invalid;
    }
  }, {
    key: "invalidReason",
    get: function get() {
      return this.invalid ? this.invalid.reason : null;
    }
  }, {
    key: "invalidExplanation",
    get: function get() {
      return this.invalid ? this.invalid.explanation : null;
    }
  }, {
    key: "locale",
    get: function get() {
      return this.isValid ? this.loc.locale : null;
    }
  }, {
    key: "numberingSystem",
    get: function get() {
      return this.isValid ? this.loc.numberingSystem : null;
    }
  }, {
    key: "outputCalendar",
    get: function get() {
      return this.isValid ? this.loc.outputCalendar : null;
    }
  }, {
    key: "zone",
    get: function get() {
      return this._zone;
    }
  }, {
    key: "zoneName",
    get: function get() {
      return this.isValid ? this.zone.name : null;
    }
  }, {
    key: "year",
    get: function get() {
      return this.isValid ? this.c.year : NaN;
    }
  }, {
    key: "quarter",
    get: function get() {
      return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
    }
  }, {
    key: "month",
    get: function get() {
      return this.isValid ? this.c.month : NaN;
    }
  }, {
    key: "day",
    get: function get() {
      return this.isValid ? this.c.day : NaN;
    }
  }, {
    key: "hour",
    get: function get() {
      return this.isValid ? this.c.hour : NaN;
    }
  }, {
    key: "minute",
    get: function get() {
      return this.isValid ? this.c.minute : NaN;
    }
  }, {
    key: "second",
    get: function get() {
      return this.isValid ? this.c.second : NaN;
    }
  }, {
    key: "millisecond",
    get: function get() {
      return this.isValid ? this.c.millisecond : NaN;
    }
  }, {
    key: "weekYear",
    get: function get() {
      return this.isValid ? Mr(this).weekYear : NaN;
    }
  }, {
    key: "weekNumber",
    get: function get() {
      return this.isValid ? Mr(this).weekNumber : NaN;
    }
  }, {
    key: "weekday",
    get: function get() {
      return this.isValid ? Mr(this).weekday : NaN;
    }
  }, {
    key: "ordinal",
    get: function get() {
      return this.isValid ? vr(this.c).ordinal : NaN;
    }
  }, {
    key: "monthShort",
    get: function get() {
      return this.isValid ? Rt.months("short", {
        locObj: this.loc
      })[this.month - 1] : null;
    }
  }, {
    key: "monthLong",
    get: function get() {
      return this.isValid ? Rt.months("long", {
        locObj: this.loc
      })[this.month - 1] : null;
    }
  }, {
    key: "weekdayShort",
    get: function get() {
      return this.isValid ? Rt.weekdays("short", {
        locObj: this.loc
      })[this.weekday - 1] : null;
    }
  }, {
    key: "weekdayLong",
    get: function get() {
      return this.isValid ? Rt.weekdays("long", {
        locObj: this.loc
      })[this.weekday - 1] : null;
    }
  }, {
    key: "offset",
    get: function get() {
      return this.isValid ? +this.o : NaN;
    }
  }, {
    key: "offsetNameShort",
    get: function get() {
      return this.isValid ? this.zone.offsetName(this.ts, {
        format: "short",
        locale: this.locale
      }) : null;
    }
  }, {
    key: "offsetNameLong",
    get: function get() {
      return this.isValid ? this.zone.offsetName(this.ts, {
        format: "long",
        locale: this.locale
      }) : null;
    }
  }, {
    key: "isOffsetFixed",
    get: function get() {
      return this.isValid ? this.zone.isUniversal : null;
    }
  }, {
    key: "isInDST",
    get: function get() {
      return !this.isOffsetFixed && (this.offset > this.set({
        month: 1
      }).offset || this.offset > this.set({
        month: 5
      }).offset);
    }
  }, {
    key: "isInLeapYear",
    get: function get() {
      return R(this.year);
    }
  }, {
    key: "daysInMonth",
    get: function get() {
      return J(this.year, this.month);
    }
  }, {
    key: "daysInYear",
    get: function get() {
      return this.isValid ? P(this.year) : NaN;
    }
  }, {
    key: "weeksInWeekYear",
    get: function get() {
      return this.isValid ? G(this.weekYear) : NaN;
    }
  }, {
    key: "resolvedLocaleOptions",
    value: function resolvedLocaleOptions() {
      var _this12 = this;

      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return function (e) {
        var _ve$create$resolvedOp = ve.create(_this12.loc.clone(e), e).resolvedOptions(_this12),
            t = _ve$create$resolvedOp.locale,
            r = _ve$create$resolvedOp.numberingSystem,
            e = _ve$create$resolvedOp.calendar;

        return {
          locale: t,
          numberingSystem: r,
          outputCalendar: e
        };
      }(e);
    }
  }, {
    key: "toUTC",
    value: function toUTC() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.setZone(Ie.instance(e), t);
    }
  }, {
    key: "toLocal",
    value: function toLocal() {
      return this.setZone(Ae.defaultZone);
    }
  }, {
    key: "setZone",
    value: function setZone(t) {
      var _ref41 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref41$keepLocalTime = _ref41.keepLocalTime,
          r = _ref41$keepLocalTime === void 0 ? !1 : _ref41$keepLocalTime,
          _ref41$keepCalendarTi = _ref41.keepCalendarTime,
          n = _ref41$keepCalendarTi === void 0 ? !1 : _ref41$keepCalendarTi;

      if ((t = Ce(t, Ae.defaultZone)).equals(this.zone)) return this;

      if (t.isValid) {
        var _Vr3, _Vr4;

        var _e29 = this.ts;
        return (r || n) && (r = t.offset(this.ts), n = this.toObject(), (_Vr3 = Vr(n, r, t), _Vr4 = _slicedToArray(_Vr3, 1), _e29 = _Vr4[0], _Vr3)), Nr(this, {
          ts: _e29,
          zone: t
        });
      }

      return Wr.invalid(kr(t));
    }
  }, {
    key: "reconfigure",
    value: function reconfigure() {
      var _ref42 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          e = _ref42.locale,
          t = _ref42.numberingSystem,
          r = _ref42.outputCalendar;

      r = this.loc.clone({
        locale: e,
        numberingSystem: t,
        outputCalendar: r
      });
      return Nr(this, {
        loc: r
      });
    }
  }, {
    key: "setLocale",
    value: function setLocale(e) {
      return this.reconfigure({
        locale: e
      });
    }
  }, {
    key: "set",
    value: function set(e) {
      if (!this.isValid) return this;
      var t = ee(e, jr),
          r = !$(t.weekYear) || !$(t.weekNumber) || !$(t.weekday),
          n = !$(t.ordinal),
          s = !$(t.year),
          i = !$(t.month) || !$(t.day),
          e = t.weekYear || t.weekNumber;
      if ((s || i || n) && e) throw new N("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
      if (i && n) throw new N("Can't mix ordinal dates with month/day");
      var a;
      r ? a = pr(_objectSpread(_objectSpread({}, wr(this.c)), t)) : $(t.ordinal) ? (a = _objectSpread(_objectSpread({}, this.toObject()), t), $(t.day) && (a.day = Math.min(J(a.year, a.month), a.day))) : a = Tr(_objectSpread(_objectSpread({}, vr(this.c)), t));

      var _Vr5 = Vr(a, this.o, this.zone),
          _Vr6 = _slicedToArray(_Vr5, 2),
          r = _Vr6[0],
          t = _Vr6[1];

      return Nr(this, {
        ts: r,
        o: t
      });
    }
  }, {
    key: "plus",
    value: function plus(e) {
      return this.isValid ? Nr(this, Ir(this, Ut.fromDurationLike(e))) : this;
    }
  }, {
    key: "minus",
    value: function minus(e) {
      return this.isValid ? Nr(this, Ir(this, Ut.fromDurationLike(e).negate())) : this;
    }
  }, {
    key: "startOf",
    value: function startOf(e) {
      if (!this.isValid) return this;
      var t = {},
          r = Ut.normalizeUnit(e);

      switch (r) {
        case "years":
          t.month = 1;

        case "quarters":
        case "months":
          t.day = 1;

        case "weeks":
        case "days":
          t.hour = 0;

        case "hours":
          t.minute = 0;

        case "minutes":
          t.second = 0;

        case "seconds":
          t.millisecond = 0;
      }

      return "weeks" === r && (t.weekday = 1), "quarters" === r && (e = Math.ceil(this.month / 3), t.month = 3 * (e - 1) + 1), this.set(t);
    }
  }, {
    key: "endOf",
    value: function endOf(e) {
      return this.isValid ? this.plus(_defineProperty({}, e, 1)).startOf(e).minus(1) : this;
    }
  }, {
    key: "toFormat",
    value: function toFormat(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.isValid ? ve.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this, e) : Or;
    }
  }, {
    key: "toLocaleString",
    value: function toLocaleString() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : c;
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.isValid ? ve.create(this.loc.clone(t), e).formatDateTime(this) : Or;
    }
  }, {
    key: "toLocaleParts",
    value: function toLocaleParts() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.isValid ? ve.create(this.loc.clone(e), e).formatDateTimeParts(this) : [];
    }
  }, {
    key: "toISO",
    value: function toISO() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.isValid ? "".concat(this.toISODate(e), "T").concat(this.toISOTime(e)) : null;
    }
  }, {
    key: "toISODate",
    value: function toISODate() {
      var _ref43 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref43$format = _ref43.format,
          e = _ref43$format === void 0 ? "extended" : _ref43$format;

      var t = "basic" === e ? "yyyyMMdd" : "yyyy-MM-dd";
      return 9999 < this.year && (t = "+" + t), Cr(this, t);
    }
  }, {
    key: "toISOWeekDate",
    value: function toISOWeekDate() {
      return Cr(this, "kkkk-'W'WW-c");
    }
  }, {
    key: "toISOTime",
    value: function toISOTime() {
      var _ref44 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref44$suppressMillis = _ref44.suppressMilliseconds,
          e = _ref44$suppressMillis === void 0 ? !1 : _ref44$suppressMillis,
          _ref44$suppressSecond = _ref44.suppressSeconds,
          t = _ref44$suppressSecond === void 0 ? !1 : _ref44$suppressSecond,
          _ref44$includeOffset = _ref44.includeOffset,
          r = _ref44$includeOffset === void 0 ? !0 : _ref44$includeOffset,
          _ref44$includePrefix = _ref44.includePrefix,
          n = _ref44$includePrefix === void 0 ? !1 : _ref44$includePrefix,
          _ref44$format = _ref44.format,
          s = _ref44$format === void 0 ? "extended" : _ref44$format;

      return $r(this, {
        suppressSeconds: t,
        suppressMilliseconds: e,
        includeOffset: r,
        includePrefix: n,
        format: s
      });
    }
  }, {
    key: "toRFC2822",
    value: function toRFC2822() {
      return Cr(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
    }
  }, {
    key: "toHTTP",
    value: function toHTTP() {
      return Cr(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
    }
  }, {
    key: "toSQLDate",
    value: function toSQLDate() {
      return Cr(this, "yyyy-MM-dd");
    }
  }, {
    key: "toSQLTime",
    value: function toSQLTime() {
      var _ref45 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref45$includeOffset = _ref45.includeOffset,
          e = _ref45$includeOffset === void 0 ? !0 : _ref45$includeOffset,
          _ref45$includeZone = _ref45.includeZone,
          t = _ref45$includeZone === void 0 ? !1 : _ref45$includeZone;

      return $r(this, {
        includeOffset: e,
        includeZone: t,
        spaceZone: !0
      });
    }
  }, {
    key: "toSQL",
    value: function toSQL() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.isValid ? "".concat(this.toSQLDate(), " ").concat(this.toSQLTime(e)) : null;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.isValid ? this.toISO() : Or;
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.toMillis();
    }
  }, {
    key: "toMillis",
    value: function toMillis() {
      return this.isValid ? this.ts : NaN;
    }
  }, {
    key: "toSeconds",
    value: function toSeconds() {
      return this.isValid ? this.ts / 1e3 : NaN;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toISO();
    }
  }, {
    key: "toBSON",
    value: function toBSON() {
      return this.toJSDate();
    }
  }, {
    key: "toObject",
    value: function toObject() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!this.isValid) return {};

      var t = _objectSpread({}, this.c);

      return e.includeConfig && (t.outputCalendar = this.outputCalendar, t.numberingSystem = this.loc.numberingSystem, t.locale = this.loc.locale), t;
    }
  }, {
    key: "toJSDate",
    value: function toJSDate() {
      return new Date(this.isValid ? this.ts : NaN);
    }
  }, {
    key: "diff",
    value: function diff(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "milliseconds";
      var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!this.isValid || !e.isValid) return Ut.invalid("created by diffing an invalid DateTime");
      r = _objectSpread({
        locale: this.locale,
        numberingSystem: this.numberingSystem
      }, r);
      var n = (t = t, (Array.isArray(t) ? t : [t]).map(Ut.normalizeUnit)),
          s = e.valueOf() > this.valueOf(),
          i = s ? this : e,
          a = s ? e : this,
          o = Jt(i, a, n, r);
      return s ? o.negate() : o;
    }
  }, {
    key: "diffNow",
    value: function diffNow() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "milliseconds";
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.diff(Wr.now(), e, t);
    }
  }, {
    key: "until",
    value: function until(e) {
      return this.isValid ? Wt.fromDateTimes(this, e) : this;
    }
  }, {
    key: "hasSame",
    value: function hasSame(e, t) {
      if (!this.isValid) return !1;
      var r = e.valueOf();
      var n = this.setZone(e.zone, {
        keepLocalTime: !0
      });
      return n.startOf(t) <= r && r <= n.endOf(t);
    }
  }, {
    key: "equals",
    value: function equals(e) {
      return this.isValid && e.isValid && this.valueOf() === e.valueOf() && this.zone.equals(e.zone) && this.loc.equals(e.loc);
    }
  }, {
    key: "toRelative",
    value: function toRelative() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!this.isValid) return null;
      var t = e.base || Wr.fromObject({}, {
        zone: this.zone
      }),
          r = e.padding ? this < t ? -e.padding : e.padding : 0;
      var n = ["years", "months", "days", "hours", "minutes", "seconds"],
          s = e.unit;
      return Array.isArray(e.unit) && (n = e.unit, s = void 0), Ur(t, this.plus(r), _objectSpread(_objectSpread({}, e), {}, {
        numeric: "always",
        units: n,
        unit: s
      }));
    }
  }, {
    key: "toRelativeCalendar",
    value: function toRelativeCalendar() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.isValid ? Ur(e.base || Wr.fromObject({}, {
        zone: this.zone
      }), this, _objectSpread(_objectSpread({}, e), {}, {
        numeric: "auto",
        units: ["years", "months", "days"],
        calendary: !0
      })) : null;
    }
  }], [{
    key: "now",
    value: function now() {
      return new Wr({});
    }
  }, {
    key: "local",
    value: function local() {
      var _Hr = Hr(arguments),
          _Hr2 = _slicedToArray(_Hr, 2),
          e = _Hr2[0],
          t = _Hr2[1],
          _t8 = t,
          _t9 = _slicedToArray(_t8, 7),
          r = _t9[0],
          n = _t9[1],
          s = _t9[2],
          i = _t9[3],
          a = _t9[4],
          o = _t9[5],
          t = _t9[6];

      return _r({
        year: r,
        month: n,
        day: s,
        hour: i,
        minute: a,
        second: o,
        millisecond: t
      }, e);
    }
  }, {
    key: "utc",
    value: function utc() {
      var _Hr3 = Hr(arguments),
          _Hr4 = _slicedToArray(_Hr3, 2),
          e = _Hr4[0],
          t = _Hr4[1],
          _t10 = _slicedToArray(t, 7),
          r = _t10[0],
          n = _t10[1],
          s = _t10[2],
          i = _t10[3],
          a = _t10[4],
          o = _t10[5],
          u = _t10[6];

      return e.zone = Ie.utcInstance, _r({
        year: r,
        month: n,
        day: s,
        hour: i,
        minute: a,
        second: o,
        millisecond: u
      }, e);
    }
  }, {
    key: "fromJSDate",
    value: function fromJSDate(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var r = "[object Date]" === Object.prototype.toString.call(e) ? e.valueOf() : NaN;
      if (Number.isNaN(r)) return Wr.invalid("invalid input");
      e = Ce(t.zone, Ae.defaultZone);
      return e.isValid ? new Wr({
        ts: r,
        zone: e,
        loc: Ge.fromObject(t)
      }) : Wr.invalid(kr(e));
    }
  }, {
    key: "fromMillis",
    value: function fromMillis(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (Z(e)) return e < -864e13 || 864e13 < e ? Wr.invalid("Timestamp out of range") : new Wr({
        ts: e,
        zone: Ce(t.zone, Ae.defaultZone),
        loc: Ge.fromObject(t)
      });
      throw new a("fromMillis requires a numerical input, but received a ".concat(_typeof(e), " with value ").concat(e));
    }
  }, {
    key: "fromSeconds",
    value: function fromSeconds(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (Z(e)) return new Wr({
        ts: 1e3 * e,
        zone: Ce(t.zone, Ae.defaultZone),
        loc: Ge.fromObject(t)
      });
      throw new a("fromSeconds requires a numerical input");
    }
  }, {
    key: "fromObject",
    value: function fromObject(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      e = e || {};
      var r = Ce(t.zone, Ae.defaultZone);
      if (!r.isValid) return Wr.invalid(kr(r));
      var n = Ae.now(),
          s = r.offset(n),
          i = ee(e, jr),
          a = !$(i.ordinal),
          o = !$(i.year),
          u = !$(i.month) || !$(i.day),
          l = o || u,
          c = i.weekYear || i.weekNumber,
          h = Ge.fromObject(t);
      if ((l || a) && c) throw new N("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
      if (u && a) throw new N("Can't mix ordinal dates with month/day");
      var d = c || i.weekday && !l;
      var m,
          f,
          y = Er(n, s);
      d ? (m = qr, f = Fr, y = wr(y)) : a ? (m = Ar, f = Lr, y = vr(y)) : (m = zr, f = Zr);
      var g = !1;

      var _iterator8 = _createForOfIteratorHelper(m),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _M = _step8.value;
          $(i[_M]) ? g ? i[_M] = f[_M] : i[_M] = y[_M] : g = !0;
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      var w,
          p,
          v,
          T,
          w = (d ? (p = i, v = F(p.weekYear), t = A(p.weekNumber, 1, G(p.weekYear)), T = A(p.weekday, 1, 7), v ? t ? !T && mr("weekday", p.weekday) : mr("week", p.week) : mr("weekYear", p.weekYear)) : a ? (w = i, T = F(w.year), p = A(w.ordinal, 1, P(w.year)), T ? !p && mr("ordinal", w.ordinal) : mr("year", w.year)) : Sr(i)) || br(i);
      if (w) return Wr.invalid(w);

      var S = d ? pr(i) : a ? Tr(i) : i,
          _Vr7 = Vr(S, s, r),
          _Vr8 = _slicedToArray(_Vr7, 2),
          b = _Vr8[0],
          O = _Vr8[1],
          k = new Wr({
        ts: b,
        zone: r,
        o: O,
        loc: h
      });

      return i.weekday && l && e.weekday !== k.weekday ? Wr.invalid("mismatched weekday", "you can't specify both a weekday of ".concat(i.weekday, " and a date of ").concat(k.toISO())) : k;
    }
  }, {
    key: "fromISO",
    value: function fromISO(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _Ke5 = Ke(e, [Tt, kt], [St, Mt], [bt, Nt], [Ot, Dt]),
          _Ke6 = _slicedToArray(_Ke5, 2),
          r = _Ke6[0],
          n = _Ke6[1];

      return xr(r, n, t, "ISO 8601", e);
    }
  }, {
    key: "fromRFC2822",
    value: function fromRFC2822(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _Ke7 = Ke(e.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim(), [mt, ft]),
          _Ke8 = _slicedToArray(_Ke7, 2),
          r = _Ke8[0],
          n = _Ke8[1];

      return xr(r, n, t, "RFC 2822", e);
    }
  }, {
    key: "fromHTTP",
    value: function fromHTTP(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return function (e) {
        var _Ke9 = Ke(e, [yt, pt], [gt, pt], [wt, vt]),
            _Ke10 = _slicedToArray(_Ke9, 2),
            r = _Ke10[0],
            e = _Ke10[1];

        return xr(r, e, t, "HTTP", t);
      }(e);
    }
  }, {
    key: "fromFormat",
    value: function fromFormat(e, t) {
      var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if ($(e) || $(t)) throw new a("fromFormat requires an input string and a format");

      var _r$locale = r.locale,
          n = _r$locale === void 0 ? null : _r$locale,
          _r$numberingSystem = r.numberingSystem,
          s = _r$numberingSystem === void 0 ? null : _r$numberingSystem,
          _ref46 = function (e, t, r) {
        var _cr = cr(e, t, r),
            e = _cr.result,
            t = _cr.zone,
            r = _cr.invalidReason;

        return [e, t, r];
      }(Ge.fromOpts({
        locale: n,
        numberingSystem: s,
        defaultToEN: !0
      }), e, t),
          _ref47 = _slicedToArray(_ref46, 3),
          i = _ref47[0],
          n = _ref47[1],
          s = _ref47[2];

      return s ? Wr.invalid(s) : xr(i, n, r, "format ".concat(t), e);
    }
  }, {
    key: "fromString",
    value: function fromString(e, t) {
      var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return Wr.fromFormat(e, t, r);
    }
  }, {
    key: "fromSQL",
    value: function fromSQL(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _Ke11 = Ke(e, [Vt, xt], [It, Ct]),
          _Ke12 = _slicedToArray(_Ke11, 2),
          r = _Ke12[0],
          n = _Ke12[1];

      return xr(r, n, t, "SQL", e);
    }
  }, {
    key: "invalid",
    value: function invalid(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!e) throw new a("need to specify a reason the DateTime is invalid");
      t = e instanceof Te ? e : new Te(e, t);
      if (Ae.throwOnInvalid) throw new r(t);
      return new Wr({
        invalid: t
      });
    }
  }, {
    key: "isDateTime",
    value: function isDateTime(e) {
      return e && e.isLuxonDateTime || !1;
    }
  }, {
    key: "min",
    value: function min() {
      for (var _len8 = arguments.length, e = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        e[_key8] = arguments[_key8];
      }

      if (!e.every(Wr.isDateTime)) throw new a("min requires all arguments be DateTimes");
      return z(e, function (e) {
        return e.valueOf();
      }, Math.min);
    }
  }, {
    key: "max",
    value: function max() {
      for (var _len9 = arguments.length, e = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        e[_key9] = arguments[_key9];
      }

      if (!e.every(Wr.isDateTime)) throw new a("max requires all arguments be DateTimes");
      return z(e, function (e) {
        return e.valueOf();
      }, Math.max);
    }
  }, {
    key: "fromFormatExplain",
    value: function fromFormatExplain(e, t) {
      var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return function (r) {
        var _r4 = r,
            _r4$locale = _r4.locale,
            n = _r4$locale === void 0 ? null : _r4$locale,
            _r4$numberingSystem = _r4.numberingSystem,
            r = _r4$numberingSystem === void 0 ? null : _r4$numberingSystem;
        return cr(Ge.fromOpts({
          locale: n,
          numberingSystem: r,
          defaultToEN: !0
        }), e, t);
      }(r);
    }
  }, {
    key: "fromStringExplain",
    value: function fromStringExplain(e, t) {
      var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return Wr.fromFormatExplain(e, t, r);
    }
  }, {
    key: "DATE_SHORT",
    get: function get() {
      return c;
    }
  }, {
    key: "DATE_MED",
    get: function get() {
      return h;
    }
  }, {
    key: "DATE_MED_WITH_WEEKDAY",
    get: function get() {
      return d;
    }
  }, {
    key: "DATE_FULL",
    get: function get() {
      return m;
    }
  }, {
    key: "DATE_HUGE",
    get: function get() {
      return f;
    }
  }, {
    key: "TIME_SIMPLE",
    get: function get() {
      return y;
    }
  }, {
    key: "TIME_WITH_SECONDS",
    get: function get() {
      return g;
    }
  }, {
    key: "TIME_WITH_SHORT_OFFSET",
    get: function get() {
      return w;
    }
  }, {
    key: "TIME_WITH_LONG_OFFSET",
    get: function get() {
      return p;
    }
  }, {
    key: "TIME_24_SIMPLE",
    get: function get() {
      return v;
    }
  }, {
    key: "TIME_24_WITH_SECONDS",
    get: function get() {
      return T;
    }
  }, {
    key: "TIME_24_WITH_SHORT_OFFSET",
    get: function get() {
      return S;
    }
  }, {
    key: "TIME_24_WITH_LONG_OFFSET",
    get: function get() {
      return b;
    }
  }, {
    key: "DATETIME_SHORT",
    get: function get() {
      return O;
    }
  }, {
    key: "DATETIME_SHORT_WITH_SECONDS",
    get: function get() {
      return k;
    }
  }, {
    key: "DATETIME_MED",
    get: function get() {
      return M;
    }
  }, {
    key: "DATETIME_MED_WITH_SECONDS",
    get: function get() {
      return D;
    }
  }, {
    key: "DATETIME_MED_WITH_WEEKDAY",
    get: function get() {
      return E;
    }
  }, {
    key: "DATETIME_FULL",
    get: function get() {
      return V;
    }
  }, {
    key: "DATETIME_FULL_WITH_SECONDS",
    get: function get() {
      return I;
    }
  }, {
    key: "DATETIME_HUGE",
    get: function get() {
      return x;
    }
  }, {
    key: "DATETIME_HUGE_WITH_SECONDS",
    get: function get() {
      return C;
    }
  }]);

  return Wr;
}();

exports.DateTime = Wr;

function Rr(e) {
  if (Wr.isDateTime(e)) return e;
  if (e && e.valueOf && Z(e.valueOf())) return Wr.fromJSDate(e);
  if (e && "object" == _typeof(e)) return Wr.fromObject(e);
  throw new a("Unknown datetime argument: ".concat(e, ", of type ").concat(_typeof(e)));
}

exports.VERSION = et = "2.1.1";
},{}],"utils/getDateDiff.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _luxon = require("../libs/luxon.js");

var _default = function _default(dateFrom, dateTo) {
  if (dateFrom < dateTo) {
    var _ref = [dateTo, dateFrom];
    dateFrom = _ref[0];
    dateTo = _ref[1];
  }

  var dateFromObj = _luxon.DateTime.fromISO(dateFrom);

  var dateToObj = _luxon.DateTime.fromISO(dateTo);

  var diff = dateFromObj.diff(dateToObj, ['years', 'months', 'days']).toObject();
  return diff;
};

exports.default = _default;
},{"../libs/luxon.js":"libs/luxon.js"}],"pages/dateCalc.js":[function(require,module,exports) {
"use strict";

var _print = require("../utils/print.js");

var _getDateDiff = _interopRequireDefault(require("../utils/getDateDiff.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var form = document.getElementById("calcDate");

form.onsubmit = function (event) {
  event.preventDefault();
  var formData = new FormData(form);
  var dateFrom = formData.get("dateFrom");
  var dateTo = formData.get("dateTo");

  if (!dateFrom || !dateTo) {
    (0, _print.printError)("Ошибка, заполните оба поля!");
    return;
  }

  var dateDiff = (0, _getDateDiff.default)(dateFrom, dateTo);
  (0, _print.printDateDiff)(dateDiff);
};
},{"../utils/print.js":"utils/print.js","../utils/getDateDiff.js":"utils/getDateDiff.js"}],"utils/visibility.js":[function(require,module,exports) {
var buttonDateCalc = document.getElementById("dateCalcBtn");
var buttonTimer = document.getElementById("timerBtn");
var dateBlock = document.getElementById("dateCalcBlock");
var timerBlock = document.getElementById("timerBlock");

buttonDateCalc.onclick = function () {
  buttonDateCalc.classList.add("isSelected");
  buttonTimer.classList.remove("isSelected");
  dateBlock.classList.add("show");
  timerBlock.classList.remove("show");
};

buttonTimer.onclick = function () {
  buttonTimer.classList.add("isSelected");
  buttonDateCalc.classList.remove("isSelected");
  timerBlock.classList.add("show");
  dateBlock.classList.remove("show");
};
},{}],"libs/howler.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
(function () {
  'use strict';
  /** Global Methods **/

  /***************************************************************************/

  /**
   * Create the global controller. All contained methods and properties apply
   * to all sounds that are currently playing or will be in the future.
   */

  var HowlerGlobal = function HowlerGlobal() {
    this.init();
  };

  HowlerGlobal.prototype = {
    /**
     * Initialize the global Howler object.
     * @return {Howler}
     */
    init: function init() {
      var self = this || Howler; // Create a global ID counter.

      self._counter = 1000; // Pool of unlocked HTML5 Audio objects.

      self._html5AudioPool = [];
      self.html5PoolSize = 10; // Internal properties.

      self._codecs = {};
      self._howls = [];
      self._muted = false;
      self._volume = 1;
      self._canPlayEvent = 'canplaythrough';
      self._navigator = typeof window !== 'undefined' && window.navigator ? window.navigator : null; // Public properties.

      self.masterGain = null;
      self.noAudio = false;
      self.usingWebAudio = true;
      self.autoSuspend = true;
      self.ctx = null; // Set to false to disable the auto audio unlocker.

      self.autoUnlock = true; // Setup the various state values for global tracking.

      self._setup();

      return self;
    },

    /**
     * Get/set the global volume for all sounds.
     * @param  {Float} vol Volume from 0.0 to 1.0.
     * @return {Howler/Float}     Returns self or current volume.
     */
    volume: function volume(vol) {
      var self = this || Howler;
      vol = parseFloat(vol); // If we don't have an AudioContext created yet, run the setup.

      if (!self.ctx) {
        setupAudioContext();
      }

      if (typeof vol !== 'undefined' && vol >= 0 && vol <= 1) {
        self._volume = vol; // Don't update any of the nodes if we are muted.

        if (self._muted) {
          return self;
        } // When using Web Audio, we just need to adjust the master gain.


        if (self.usingWebAudio) {
          self.masterGain.gain.setValueAtTime(vol, Howler.ctx.currentTime);
        } // Loop through and change volume for all HTML5 audio nodes.


        for (var i = 0; i < self._howls.length; i++) {
          if (!self._howls[i]._webAudio) {
            // Get all of the sounds in this Howl group.
            var ids = self._howls[i]._getSoundIds(); // Loop through all sounds and change the volumes.


            for (var j = 0; j < ids.length; j++) {
              var sound = self._howls[i]._soundById(ids[j]);

              if (sound && sound._node) {
                sound._node.volume = sound._volume * vol;
              }
            }
          }
        }

        return self;
      }

      return self._volume;
    },

    /**
     * Handle muting and unmuting globally.
     * @param  {Boolean} muted Is muted or not.
     */
    mute: function mute(muted) {
      var self = this || Howler; // If we don't have an AudioContext created yet, run the setup.

      if (!self.ctx) {
        setupAudioContext();
      }

      self._muted = muted; // With Web Audio, we just need to mute the master gain.

      if (self.usingWebAudio) {
        self.masterGain.gain.setValueAtTime(muted ? 0 : self._volume, Howler.ctx.currentTime);
      } // Loop through and mute all HTML5 Audio nodes.


      for (var i = 0; i < self._howls.length; i++) {
        if (!self._howls[i]._webAudio) {
          // Get all of the sounds in this Howl group.
          var ids = self._howls[i]._getSoundIds(); // Loop through all sounds and mark the audio node as muted.


          for (var j = 0; j < ids.length; j++) {
            var sound = self._howls[i]._soundById(ids[j]);

            if (sound && sound._node) {
              sound._node.muted = muted ? true : sound._muted;
            }
          }
        }
      }

      return self;
    },

    /**
     * Handle stopping all sounds globally.
     */
    stop: function stop() {
      var self = this || Howler; // Loop through all Howls and stop them.

      for (var i = 0; i < self._howls.length; i++) {
        self._howls[i].stop();
      }

      return self;
    },

    /**
     * Unload and destroy all currently loaded Howl objects.
     * @return {Howler}
     */
    unload: function unload() {
      var self = this || Howler;

      for (var i = self._howls.length - 1; i >= 0; i--) {
        self._howls[i].unload();
      } // Create a new AudioContext to make sure it is fully reset.


      if (self.usingWebAudio && self.ctx && typeof self.ctx.close !== 'undefined') {
        self.ctx.close();
        self.ctx = null;
        setupAudioContext();
      }

      return self;
    },

    /**
     * Check for codec support of specific extension.
     * @param  {String} ext Audio file extention.
     * @return {Boolean}
     */
    codecs: function codecs(ext) {
      return (this || Howler)._codecs[ext.replace(/^x-/, '')];
    },

    /**
     * Setup various state values for global tracking.
     * @return {Howler}
     */
    _setup: function _setup() {
      var self = this || Howler; // Keeps track of the suspend/resume state of the AudioContext.

      self.state = self.ctx ? self.ctx.state || 'suspended' : 'suspended'; // Automatically begin the 30-second suspend process

      self._autoSuspend(); // Check if audio is available.


      if (!self.usingWebAudio) {
        // No audio is available on this system if noAudio is set to true.
        if (typeof Audio !== 'undefined') {
          try {
            var test = new Audio(); // Check if the canplaythrough event is available.

            if (typeof test.oncanplaythrough === 'undefined') {
              self._canPlayEvent = 'canplay';
            }
          } catch (e) {
            self.noAudio = true;
          }
        } else {
          self.noAudio = true;
        }
      } // Test to make sure audio isn't disabled in Internet Explorer.


      try {
        var test = new Audio();

        if (test.muted) {
          self.noAudio = true;
        }
      } catch (e) {} // Check for supported codecs.


      if (!self.noAudio) {
        self._setupCodecs();
      }

      return self;
    },

    /**
     * Check for browser support for various codecs and cache the results.
     * @return {Howler}
     */
    _setupCodecs: function _setupCodecs() {
      var self = this || Howler;
      var audioTest = null; // Must wrap in a try/catch because IE11 in server mode throws an error.

      try {
        audioTest = typeof Audio !== 'undefined' ? new Audio() : null;
      } catch (err) {
        return self;
      }

      if (!audioTest || typeof audioTest.canPlayType !== 'function') {
        return self;
      }

      var mpegTest = audioTest.canPlayType('audio/mpeg;').replace(/^no$/, ''); // Opera version <33 has mixed MP3 support, so we need to check for and block it.

      var ua = self._navigator ? self._navigator.userAgent : '';
      var checkOpera = ua.match(/OPR\/([0-6].)/g);
      var isOldOpera = checkOpera && parseInt(checkOpera[0].split('/')[1], 10) < 33;
      var checkSafari = ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1;
      var safariVersion = ua.match(/Version\/(.*?) /);
      var isOldSafari = checkSafari && safariVersion && parseInt(safariVersion[1], 10) < 15;
      self._codecs = {
        mp3: !!(!isOldOpera && (mpegTest || audioTest.canPlayType('audio/mp3;').replace(/^no$/, ''))),
        mpeg: !!mpegTest,
        opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
        ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
        oga: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
        wav: !!(audioTest.canPlayType('audio/wav; codecs="1"') || audioTest.canPlayType('audio/wav')).replace(/^no$/, ''),
        aac: !!audioTest.canPlayType('audio/aac;').replace(/^no$/, ''),
        caf: !!audioTest.canPlayType('audio/x-caf;').replace(/^no$/, ''),
        m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
        m4b: !!(audioTest.canPlayType('audio/x-m4b;') || audioTest.canPlayType('audio/m4b;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
        mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
        weba: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')),
        webm: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')),
        dolby: !!audioTest.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ''),
        flac: !!(audioTest.canPlayType('audio/x-flac;') || audioTest.canPlayType('audio/flac;')).replace(/^no$/, '')
      };
      return self;
    },

    /**
     * Some browsers/devices will only allow audio to be played after a user interaction.
     * Attempt to automatically unlock audio on the first user interaction.
     * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
     * @return {Howler}
     */
    _unlockAudio: function _unlockAudio() {
      var self = this || Howler; // Only run this if Web Audio is supported and it hasn't already been unlocked.

      if (self._audioUnlocked || !self.ctx) {
        return;
      }

      self._audioUnlocked = false;
      self.autoUnlock = false; // Some mobile devices/platforms have distortion issues when opening/closing tabs and/or web views.
      // Bugs in the browser (especially Mobile Safari) can cause the sampleRate to change from 44100 to 48000.
      // By calling Howler.unload(), we create a new AudioContext with the correct sampleRate.

      if (!self._mobileUnloaded && self.ctx.sampleRate !== 44100) {
        self._mobileUnloaded = true;
        self.unload();
      } // Scratch buffer for enabling iOS to dispose of web audio buffers correctly, as per:
      // http://stackoverflow.com/questions/24119684


      self._scratchBuffer = self.ctx.createBuffer(1, 1, 22050); // Call this method on touch start to create and play a buffer,
      // then check if the audio actually played to determine if
      // audio has now been unlocked on iOS, Android, etc.

      var unlock = function unlock(e) {
        // Create a pool of unlocked HTML5 Audio objects that can
        // be used for playing sounds without user interaction. HTML5
        // Audio objects must be individually unlocked, as opposed
        // to the WebAudio API which only needs a single activation.
        // This must occur before WebAudio setup or the source.onended
        // event will not fire.
        while (self._html5AudioPool.length < self.html5PoolSize) {
          try {
            var audioNode = new Audio(); // Mark this Audio object as unlocked to ensure it can get returned
            // to the unlocked pool when released.

            audioNode._unlocked = true; // Add the audio node to the pool.

            self._releaseHtml5Audio(audioNode);
          } catch (e) {
            self.noAudio = true;
            break;
          }
        } // Loop through any assigned audio nodes and unlock them.


        for (var i = 0; i < self._howls.length; i++) {
          if (!self._howls[i]._webAudio) {
            // Get all of the sounds in this Howl group.
            var ids = self._howls[i]._getSoundIds(); // Loop through all sounds and unlock the audio nodes.


            for (var j = 0; j < ids.length; j++) {
              var sound = self._howls[i]._soundById(ids[j]);

              if (sound && sound._node && !sound._node._unlocked) {
                sound._node._unlocked = true;

                sound._node.load();
              }
            }
          }
        } // Fix Android can not play in suspend state.


        self._autoResume(); // Create an empty buffer.


        var source = self.ctx.createBufferSource();
        source.buffer = self._scratchBuffer;
        source.connect(self.ctx.destination); // Play the empty buffer.

        if (typeof source.start === 'undefined') {
          source.noteOn(0);
        } else {
          source.start(0);
        } // Calling resume() on a stack initiated by user gesture is what actually unlocks the audio on Android Chrome >= 55.


        if (typeof self.ctx.resume === 'function') {
          self.ctx.resume();
        } // Setup a timeout to check that we are unlocked on the next event loop.


        source.onended = function () {
          source.disconnect(0); // Update the unlocked state and prevent this check from happening again.

          self._audioUnlocked = true; // Remove the touch start listener.

          document.removeEventListener('touchstart', unlock, true);
          document.removeEventListener('touchend', unlock, true);
          document.removeEventListener('click', unlock, true);
          document.removeEventListener('keydown', unlock, true); // Let all sounds know that audio has been unlocked.

          for (var i = 0; i < self._howls.length; i++) {
            self._howls[i]._emit('unlock');
          }
        };
      }; // Setup a touch start listener to attempt an unlock in.


      document.addEventListener('touchstart', unlock, true);
      document.addEventListener('touchend', unlock, true);
      document.addEventListener('click', unlock, true);
      document.addEventListener('keydown', unlock, true);
      return self;
    },

    /**
     * Get an unlocked HTML5 Audio object from the pool. If none are left,
     * return a new Audio object and throw a warning.
     * @return {Audio} HTML5 Audio object.
     */
    _obtainHtml5Audio: function _obtainHtml5Audio() {
      var self = this || Howler; // Return the next object from the pool if one exists.

      if (self._html5AudioPool.length) {
        return self._html5AudioPool.pop();
      } //.Check if the audio is locked and throw a warning.


      var testPlay = new Audio().play();

      if (testPlay && typeof Promise !== 'undefined' && (testPlay instanceof Promise || typeof testPlay.then === 'function')) {
        testPlay.catch(function () {
          console.warn('HTML5 Audio pool exhausted, returning potentially locked audio object.');
        });
      }

      return new Audio();
    },

    /**
     * Return an activated HTML5 Audio object to the pool.
     * @return {Howler}
     */
    _releaseHtml5Audio: function _releaseHtml5Audio(audio) {
      var self = this || Howler; // Don't add audio to the pool if we don't know if it has been unlocked.

      if (audio._unlocked) {
        self._html5AudioPool.push(audio);
      }

      return self;
    },

    /**
     * Automatically suspend the Web Audio AudioContext after no sound has played for 30 seconds.
     * This saves processing/energy and fixes various browser-specific bugs with audio getting stuck.
     * @return {Howler}
     */
    _autoSuspend: function _autoSuspend() {
      var self = this;

      if (!self.autoSuspend || !self.ctx || typeof self.ctx.suspend === 'undefined' || !Howler.usingWebAudio) {
        return;
      } // Check if any sounds are playing.


      for (var i = 0; i < self._howls.length; i++) {
        if (self._howls[i]._webAudio) {
          for (var j = 0; j < self._howls[i]._sounds.length; j++) {
            if (!self._howls[i]._sounds[j]._paused) {
              return self;
            }
          }
        }
      }

      if (self._suspendTimer) {
        clearTimeout(self._suspendTimer);
      } // If no sound has played after 30 seconds, suspend the context.


      self._suspendTimer = setTimeout(function () {
        if (!self.autoSuspend) {
          return;
        }

        self._suspendTimer = null;
        self.state = 'suspending'; // Handle updating the state of the audio context after suspending.

        var handleSuspension = function handleSuspension() {
          self.state = 'suspended';

          if (self._resumeAfterSuspend) {
            delete self._resumeAfterSuspend;

            self._autoResume();
          }
        }; // Either the state gets suspended or it is interrupted.
        // Either way, we need to update the state to suspended.


        self.ctx.suspend().then(handleSuspension, handleSuspension);
      }, 30000);
      return self;
    },

    /**
     * Automatically resume the Web Audio AudioContext when a new sound is played.
     * @return {Howler}
     */
    _autoResume: function _autoResume() {
      var self = this;

      if (!self.ctx || typeof self.ctx.resume === 'undefined' || !Howler.usingWebAudio) {
        return;
      }

      if (self.state === 'running' && self.ctx.state !== 'interrupted' && self._suspendTimer) {
        clearTimeout(self._suspendTimer);
        self._suspendTimer = null;
      } else if (self.state === 'suspended' || self.state === 'running' && self.ctx.state === 'interrupted') {
        self.ctx.resume().then(function () {
          self.state = 'running'; // Emit to all Howls that the audio has resumed.

          for (var i = 0; i < self._howls.length; i++) {
            self._howls[i]._emit('resume');
          }
        });

        if (self._suspendTimer) {
          clearTimeout(self._suspendTimer);
          self._suspendTimer = null;
        }
      } else if (self.state === 'suspending') {
        self._resumeAfterSuspend = true;
      }

      return self;
    }
  }; // Setup the global audio controller.

  var Howler = new HowlerGlobal();
  /** Group Methods **/

  /***************************************************************************/

  /**
   * Create an audio group controller.
   * @param {Object} o Passed in properties for this group.
   */

  var Howl = function Howl(o) {
    var self = this; // Throw an error if no source is provided.

    if (!o.src || o.src.length === 0) {
      console.error('An array of source files must be passed with any new Howl.');
      return;
    }

    self.init(o);
  };

  Howl.prototype = {
    /**
     * Initialize a new Howl group object.
     * @param  {Object} o Passed in properties for this group.
     * @return {Howl}
     */
    init: function init(o) {
      var self = this; // If we don't have an AudioContext created yet, run the setup.

      if (!Howler.ctx) {
        setupAudioContext();
      } // Setup user-defined default properties.


      self._autoplay = o.autoplay || false;
      self._format = typeof o.format !== 'string' ? o.format : [o.format];
      self._html5 = o.html5 || false;
      self._muted = o.mute || false;
      self._loop = o.loop || false;
      self._pool = o.pool || 5;
      self._preload = typeof o.preload === 'boolean' || o.preload === 'metadata' ? o.preload : true;
      self._rate = o.rate || 1;
      self._sprite = o.sprite || {};
      self._src = typeof o.src !== 'string' ? o.src : [o.src];
      self._volume = o.volume !== undefined ? o.volume : 1;
      self._xhr = {
        method: o.xhr && o.xhr.method ? o.xhr.method : 'GET',
        headers: o.xhr && o.xhr.headers ? o.xhr.headers : null,
        withCredentials: o.xhr && o.xhr.withCredentials ? o.xhr.withCredentials : false
      }; // Setup all other default properties.

      self._duration = 0;
      self._state = 'unloaded';
      self._sounds = [];
      self._endTimers = {};
      self._queue = [];
      self._playLock = false; // Setup event listeners.

      self._onend = o.onend ? [{
        fn: o.onend
      }] : [];
      self._onfade = o.onfade ? [{
        fn: o.onfade
      }] : [];
      self._onload = o.onload ? [{
        fn: o.onload
      }] : [];
      self._onloaderror = o.onloaderror ? [{
        fn: o.onloaderror
      }] : [];
      self._onplayerror = o.onplayerror ? [{
        fn: o.onplayerror
      }] : [];
      self._onpause = o.onpause ? [{
        fn: o.onpause
      }] : [];
      self._onplay = o.onplay ? [{
        fn: o.onplay
      }] : [];
      self._onstop = o.onstop ? [{
        fn: o.onstop
      }] : [];
      self._onmute = o.onmute ? [{
        fn: o.onmute
      }] : [];
      self._onvolume = o.onvolume ? [{
        fn: o.onvolume
      }] : [];
      self._onrate = o.onrate ? [{
        fn: o.onrate
      }] : [];
      self._onseek = o.onseek ? [{
        fn: o.onseek
      }] : [];
      self._onunlock = o.onunlock ? [{
        fn: o.onunlock
      }] : [];
      self._onresume = []; // Web Audio or HTML5 Audio?

      self._webAudio = Howler.usingWebAudio && !self._html5; // Automatically try to enable audio.

      if (typeof Howler.ctx !== 'undefined' && Howler.ctx && Howler.autoUnlock) {
        Howler._unlockAudio();
      } // Keep track of this Howl group in the global controller.


      Howler._howls.push(self); // If they selected autoplay, add a play event to the load queue.


      if (self._autoplay) {
        self._queue.push({
          event: 'play',
          action: function action() {
            self.play();
          }
        });
      } // Load the source file unless otherwise specified.


      if (self._preload && self._preload !== 'none') {
        self.load();
      }

      return self;
    },

    /**
     * Load the audio file.
     * @return {Howler}
     */
    load: function load() {
      var self = this;
      var url = null; // If no audio is available, quit immediately.

      if (Howler.noAudio) {
        self._emit('loaderror', null, 'No audio support.');

        return;
      } // Make sure our source is in an array.


      if (typeof self._src === 'string') {
        self._src = [self._src];
      } // Loop through the sources and pick the first one that is compatible.


      for (var i = 0; i < self._src.length; i++) {
        var ext, str;

        if (self._format && self._format[i]) {
          // If an extension was specified, use that instead.
          ext = self._format[i];
        } else {
          // Make sure the source is a string.
          str = self._src[i];

          if (typeof str !== 'string') {
            self._emit('loaderror', null, 'Non-string found in selected audio sources - ignoring.');

            continue;
          } // Extract the file extension from the URL or base64 data URI.


          ext = /^data:audio\/([^;,]+);/i.exec(str);

          if (!ext) {
            ext = /\.([^.]+)$/.exec(str.split('?', 1)[0]);
          }

          if (ext) {
            ext = ext[1].toLowerCase();
          }
        } // Log a warning if no extension was found.


        if (!ext) {
          console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
        } // Check if this extension is available.


        if (ext && Howler.codecs(ext)) {
          url = self._src[i];
          break;
        }
      }

      if (!url) {
        self._emit('loaderror', null, 'No codec support for selected audio sources.');

        return;
      }

      self._src = url;
      self._state = 'loading'; // If the hosting page is HTTPS and the source isn't,
      // drop down to HTML5 Audio to avoid Mixed Content errors.

      if (window.location.protocol === 'https:' && url.slice(0, 5) === 'http:') {
        self._html5 = true;
        self._webAudio = false;
      } // Create a new sound object and add it to the pool.


      new Sound(self); // Load and decode the audio data for playback.

      if (self._webAudio) {
        loadBuffer(self);
      }

      return self;
    },

    /**
     * Play a sound or resume previous playback.
     * @param  {String/Number} sprite   Sprite name for sprite playback or sound id to continue previous.
     * @param  {Boolean} internal Internal Use: true prevents event firing.
     * @return {Number}          Sound ID.
     */
    play: function play(sprite, internal) {
      var self = this;
      var id = null; // Determine if a sprite, sound id or nothing was passed

      if (typeof sprite === 'number') {
        id = sprite;
        sprite = null;
      } else if (typeof sprite === 'string' && self._state === 'loaded' && !self._sprite[sprite]) {
        // If the passed sprite doesn't exist, do nothing.
        return null;
      } else if (typeof sprite === 'undefined') {
        // Use the default sound sprite (plays the full audio length).
        sprite = '__default'; // Check if there is a single paused sound that isn't ended.
        // If there is, play that sound. If not, continue as usual.

        if (!self._playLock) {
          var num = 0;

          for (var i = 0; i < self._sounds.length; i++) {
            if (self._sounds[i]._paused && !self._sounds[i]._ended) {
              num++;
              id = self._sounds[i]._id;
            }
          }

          if (num === 1) {
            sprite = null;
          } else {
            id = null;
          }
        }
      } // Get the selected node, or get one from the pool.


      var sound = id ? self._soundById(id) : self._inactiveSound(); // If the sound doesn't exist, do nothing.

      if (!sound) {
        return null;
      } // Select the sprite definition.


      if (id && !sprite) {
        sprite = sound._sprite || '__default';
      } // If the sound hasn't loaded, we must wait to get the audio's duration.
      // We also need to wait to make sure we don't run into race conditions with
      // the order of function calls.


      if (self._state !== 'loaded') {
        // Set the sprite value on this sound.
        sound._sprite = sprite; // Mark this sound as not ended in case another sound is played before this one loads.

        sound._ended = false; // Add the sound to the queue to be played on load.

        var soundId = sound._id;

        self._queue.push({
          event: 'play',
          action: function action() {
            self.play(soundId);
          }
        });

        return soundId;
      } // Don't play the sound if an id was passed and it is already playing.


      if (id && !sound._paused) {
        // Trigger the play event, in order to keep iterating through queue.
        if (!internal) {
          self._loadQueue('play');
        }

        return sound._id;
      } // Make sure the AudioContext isn't suspended, and resume it if it is.


      if (self._webAudio) {
        Howler._autoResume();
      } // Determine how long to play for and where to start playing.


      var seek = Math.max(0, sound._seek > 0 ? sound._seek : self._sprite[sprite][0] / 1000);
      var duration = Math.max(0, (self._sprite[sprite][0] + self._sprite[sprite][1]) / 1000 - seek);
      var timeout = duration * 1000 / Math.abs(sound._rate);
      var start = self._sprite[sprite][0] / 1000;
      var stop = (self._sprite[sprite][0] + self._sprite[sprite][1]) / 1000;
      sound._sprite = sprite; // Mark the sound as ended instantly so that this async playback
      // doesn't get grabbed by another call to play while this one waits to start.

      sound._ended = false; // Update the parameters of the sound.

      var setParams = function setParams() {
        sound._paused = false;
        sound._seek = seek;
        sound._start = start;
        sound._stop = stop;
        sound._loop = !!(sound._loop || self._sprite[sprite][2]);
      }; // End the sound instantly if seek is at the end.


      if (seek >= stop) {
        self._ended(sound);

        return;
      } // Begin the actual playback.


      var node = sound._node;

      if (self._webAudio) {
        // Fire this when the sound is ready to play to begin Web Audio playback.
        var playWebAudio = function playWebAudio() {
          self._playLock = false;
          setParams();

          self._refreshBuffer(sound); // Setup the playback params.


          var vol = sound._muted || self._muted ? 0 : sound._volume;
          node.gain.setValueAtTime(vol, Howler.ctx.currentTime);
          sound._playStart = Howler.ctx.currentTime; // Play the sound using the supported method.

          if (typeof node.bufferSource.start === 'undefined') {
            sound._loop ? node.bufferSource.noteGrainOn(0, seek, 86400) : node.bufferSource.noteGrainOn(0, seek, duration);
          } else {
            sound._loop ? node.bufferSource.start(0, seek, 86400) : node.bufferSource.start(0, seek, duration);
          } // Start a new timer if none is present.


          if (timeout !== Infinity) {
            self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
          }

          if (!internal) {
            setTimeout(function () {
              self._emit('play', sound._id);

              self._loadQueue();
            }, 0);
          }
        };

        if (Howler.state === 'running' && Howler.ctx.state !== 'interrupted') {
          playWebAudio();
        } else {
          self._playLock = true; // Wait for the audio context to resume before playing.

          self.once('resume', playWebAudio); // Cancel the end timer.

          self._clearTimer(sound._id);
        }
      } else {
        // Fire this when the sound is ready to play to begin HTML5 Audio playback.
        var playHtml5 = function playHtml5() {
          node.currentTime = seek;
          node.muted = sound._muted || self._muted || Howler._muted || node.muted;
          node.volume = sound._volume * Howler.volume();
          node.playbackRate = sound._rate; // Some browsers will throw an error if this is called without user interaction.

          try {
            var play = node.play(); // Support older browsers that don't support promises, and thus don't have this issue.

            if (play && typeof Promise !== 'undefined' && (play instanceof Promise || typeof play.then === 'function')) {
              // Implements a lock to prevent DOMException: The play() request was interrupted by a call to pause().
              self._playLock = true; // Set param values immediately.

              setParams(); // Releases the lock and executes queued actions.

              play.then(function () {
                self._playLock = false;
                node._unlocked = true;

                if (!internal) {
                  self._emit('play', sound._id);
                } else {
                  self._loadQueue();
                }
              }).catch(function () {
                self._playLock = false;

                self._emit('playerror', sound._id, 'Playback was unable to start. This is most commonly an issue ' + 'on mobile devices and Chrome where playback was not within a user interaction.'); // Reset the ended and paused values.


                sound._ended = true;
                sound._paused = true;
              });
            } else if (!internal) {
              self._playLock = false;
              setParams();

              self._emit('play', sound._id);
            } // Setting rate before playing won't work in IE, so we set it again here.


            node.playbackRate = sound._rate; // If the node is still paused, then we can assume there was a playback issue.

            if (node.paused) {
              self._emit('playerror', sound._id, 'Playback was unable to start. This is most commonly an issue ' + 'on mobile devices and Chrome where playback was not within a user interaction.');

              return;
            } // Setup the end timer on sprites or listen for the ended event.


            if (sprite !== '__default' || sound._loop) {
              self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
            } else {
              self._endTimers[sound._id] = function () {
                // Fire ended on this audio node.
                self._ended(sound); // Clear this listener.


                node.removeEventListener('ended', self._endTimers[sound._id], false);
              };

              node.addEventListener('ended', self._endTimers[sound._id], false);
            }
          } catch (err) {
            self._emit('playerror', sound._id, err);
          }
        }; // If this is streaming audio, make sure the src is set and load again.


        if (node.src === 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA') {
          node.src = self._src;
          node.load();
        } // Play immediately if ready, or wait for the 'canplaythrough'e vent.


        var loadedNoReadyState = window && window.ejecta || !node.readyState && Howler._navigator.isCocoonJS;

        if (node.readyState >= 3 || loadedNoReadyState) {
          playHtml5();
        } else {
          self._playLock = true;
          self._state = 'loading';

          var listener = function listener() {
            self._state = 'loaded'; // Begin playback.

            playHtml5(); // Clear this listener.

            node.removeEventListener(Howler._canPlayEvent, listener, false);
          };

          node.addEventListener(Howler._canPlayEvent, listener, false); // Cancel the end timer.

          self._clearTimer(sound._id);
        }
      }

      return sound._id;
    },

    /**
     * Pause playback and save current position.
     * @param  {Number} id The sound ID (empty to pause all in group).
     * @return {Howl}
     */
    pause: function pause(id) {
      var self = this; // If the sound hasn't loaded or a play() promise is pending, add it to the load queue to pause when capable.

      if (self._state !== 'loaded' || self._playLock) {
        self._queue.push({
          event: 'pause',
          action: function action() {
            self.pause(id);
          }
        });

        return self;
      } // If no id is passed, get all ID's to be paused.


      var ids = self._getSoundIds(id);

      for (var i = 0; i < ids.length; i++) {
        // Clear the end timer.
        self._clearTimer(ids[i]); // Get the sound.


        var sound = self._soundById(ids[i]);

        if (sound && !sound._paused) {
          // Reset the seek position.
          sound._seek = self.seek(ids[i]);
          sound._rateSeek = 0;
          sound._paused = true; // Stop currently running fades.

          self._stopFade(ids[i]);

          if (sound._node) {
            if (self._webAudio) {
              // Make sure the sound has been created.
              if (!sound._node.bufferSource) {
                continue;
              }

              if (typeof sound._node.bufferSource.stop === 'undefined') {
                sound._node.bufferSource.noteOff(0);
              } else {
                sound._node.bufferSource.stop(0);
              } // Clean up the buffer source.


              self._cleanBuffer(sound._node);
            } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
              sound._node.pause();
            }
          }
        } // Fire the pause event, unless `true` is passed as the 2nd argument.


        if (!arguments[1]) {
          self._emit('pause', sound ? sound._id : null);
        }
      }

      return self;
    },

    /**
     * Stop playback and reset to start.
     * @param  {Number} id The sound ID (empty to stop all in group).
     * @param  {Boolean} internal Internal Use: true prevents event firing.
     * @return {Howl}
     */
    stop: function stop(id, internal) {
      var self = this; // If the sound hasn't loaded, add it to the load queue to stop when capable.

      if (self._state !== 'loaded' || self._playLock) {
        self._queue.push({
          event: 'stop',
          action: function action() {
            self.stop(id);
          }
        });

        return self;
      } // If no id is passed, get all ID's to be stopped.


      var ids = self._getSoundIds(id);

      for (var i = 0; i < ids.length; i++) {
        // Clear the end timer.
        self._clearTimer(ids[i]); // Get the sound.


        var sound = self._soundById(ids[i]);

        if (sound) {
          // Reset the seek position.
          sound._seek = sound._start || 0;
          sound._rateSeek = 0;
          sound._paused = true;
          sound._ended = true; // Stop currently running fades.

          self._stopFade(ids[i]);

          if (sound._node) {
            if (self._webAudio) {
              // Make sure the sound's AudioBufferSourceNode has been created.
              if (sound._node.bufferSource) {
                if (typeof sound._node.bufferSource.stop === 'undefined') {
                  sound._node.bufferSource.noteOff(0);
                } else {
                  sound._node.bufferSource.stop(0);
                } // Clean up the buffer source.


                self._cleanBuffer(sound._node);
              }
            } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
              sound._node.currentTime = sound._start || 0;

              sound._node.pause(); // If this is a live stream, stop download once the audio is stopped.


              if (sound._node.duration === Infinity) {
                self._clearSound(sound._node);
              }
            }
          }

          if (!internal) {
            self._emit('stop', sound._id);
          }
        }
      }

      return self;
    },

    /**
     * Mute/unmute a single sound or all sounds in this Howl group.
     * @param  {Boolean} muted Set to true to mute and false to unmute.
     * @param  {Number} id    The sound ID to update (omit to mute/unmute all).
     * @return {Howl}
     */
    mute: function mute(muted, id) {
      var self = this; // If the sound hasn't loaded, add it to the load queue to mute when capable.

      if (self._state !== 'loaded' || self._playLock) {
        self._queue.push({
          event: 'mute',
          action: function action() {
            self.mute(muted, id);
          }
        });

        return self;
      } // If applying mute/unmute to all sounds, update the group's value.


      if (typeof id === 'undefined') {
        if (typeof muted === 'boolean') {
          self._muted = muted;
        } else {
          return self._muted;
        }
      } // If no id is passed, get all ID's to be muted.


      var ids = self._getSoundIds(id);

      for (var i = 0; i < ids.length; i++) {
        // Get the sound.
        var sound = self._soundById(ids[i]);

        if (sound) {
          sound._muted = muted; // Cancel active fade and set the volume to the end value.

          if (sound._interval) {
            self._stopFade(sound._id);
          }

          if (self._webAudio && sound._node) {
            sound._node.gain.setValueAtTime(muted ? 0 : sound._volume, Howler.ctx.currentTime);
          } else if (sound._node) {
            sound._node.muted = Howler._muted ? true : muted;
          }

          self._emit('mute', sound._id);
        }
      }

      return self;
    },

    /**
     * Get/set the volume of this sound or of the Howl group. This method can optionally take 0, 1 or 2 arguments.
     *   volume() -> Returns the group's volume value.
     *   volume(id) -> Returns the sound id's current volume.
     *   volume(vol) -> Sets the volume of all sounds in this Howl group.
     *   volume(vol, id) -> Sets the volume of passed sound id.
     * @return {Howl/Number} Returns self or current volume.
     */
    volume: function volume() {
      var self = this;
      var args = arguments;
      var vol, id; // Determine the values based on arguments.

      if (args.length === 0) {
        // Return the value of the groups' volume.
        return self._volume;
      } else if (args.length === 1 || args.length === 2 && typeof args[1] === 'undefined') {
        // First check if this is an ID, and if not, assume it is a new volume.
        var ids = self._getSoundIds();

        var index = ids.indexOf(args[0]);

        if (index >= 0) {
          id = parseInt(args[0], 10);
        } else {
          vol = parseFloat(args[0]);
        }
      } else if (args.length >= 2) {
        vol = parseFloat(args[0]);
        id = parseInt(args[1], 10);
      } // Update the volume or return the current volume.


      var sound;

      if (typeof vol !== 'undefined' && vol >= 0 && vol <= 1) {
        // If the sound hasn't loaded, add it to the load queue to change volume when capable.
        if (self._state !== 'loaded' || self._playLock) {
          self._queue.push({
            event: 'volume',
            action: function action() {
              self.volume.apply(self, args);
            }
          });

          return self;
        } // Set the group volume.


        if (typeof id === 'undefined') {
          self._volume = vol;
        } // Update one or all volumes.


        id = self._getSoundIds(id);

        for (var i = 0; i < id.length; i++) {
          // Get the sound.
          sound = self._soundById(id[i]);

          if (sound) {
            sound._volume = vol; // Stop currently running fades.

            if (!args[2]) {
              self._stopFade(id[i]);
            }

            if (self._webAudio && sound._node && !sound._muted) {
              sound._node.gain.setValueAtTime(vol, Howler.ctx.currentTime);
            } else if (sound._node && !sound._muted) {
              sound._node.volume = vol * Howler.volume();
            }

            self._emit('volume', sound._id);
          }
        }
      } else {
        sound = id ? self._soundById(id) : self._sounds[0];
        return sound ? sound._volume : 0;
      }

      return self;
    },

    /**
     * Fade a currently playing sound between two volumes (if no id is passed, all sounds will fade).
     * @param  {Number} from The value to fade from (0.0 to 1.0).
     * @param  {Number} to   The volume to fade to (0.0 to 1.0).
     * @param  {Number} len  Time in milliseconds to fade.
     * @param  {Number} id   The sound id (omit to fade all sounds).
     * @return {Howl}
     */
    fade: function fade(from, to, len, id) {
      var self = this; // If the sound hasn't loaded, add it to the load queue to fade when capable.

      if (self._state !== 'loaded' || self._playLock) {
        self._queue.push({
          event: 'fade',
          action: function action() {
            self.fade(from, to, len, id);
          }
        });

        return self;
      } // Make sure the to/from/len values are numbers.


      from = Math.min(Math.max(0, parseFloat(from)), 1);
      to = Math.min(Math.max(0, parseFloat(to)), 1);
      len = parseFloat(len); // Set the volume to the start position.

      self.volume(from, id); // Fade the volume of one or all sounds.

      var ids = self._getSoundIds(id);

      for (var i = 0; i < ids.length; i++) {
        // Get the sound.
        var sound = self._soundById(ids[i]); // Create a linear fade or fall back to timeouts with HTML5 Audio.


        if (sound) {
          // Stop the previous fade if no sprite is being used (otherwise, volume handles this).
          if (!id) {
            self._stopFade(ids[i]);
          } // If we are using Web Audio, let the native methods do the actual fade.


          if (self._webAudio && !sound._muted) {
            var currentTime = Howler.ctx.currentTime;
            var end = currentTime + len / 1000;
            sound._volume = from;

            sound._node.gain.setValueAtTime(from, currentTime);

            sound._node.gain.linearRampToValueAtTime(to, end);
          }

          self._startFadeInterval(sound, from, to, len, ids[i], typeof id === 'undefined');
        }
      }

      return self;
    },

    /**
     * Starts the internal interval to fade a sound.
     * @param  {Object} sound Reference to sound to fade.
     * @param  {Number} from The value to fade from (0.0 to 1.0).
     * @param  {Number} to   The volume to fade to (0.0 to 1.0).
     * @param  {Number} len  Time in milliseconds to fade.
     * @param  {Number} id   The sound id to fade.
     * @param  {Boolean} isGroup   If true, set the volume on the group.
     */
    _startFadeInterval: function _startFadeInterval(sound, from, to, len, id, isGroup) {
      var self = this;
      var vol = from;
      var diff = to - from;
      var steps = Math.abs(diff / 0.01);
      var stepLen = Math.max(4, steps > 0 ? len / steps : len);
      var lastTick = Date.now(); // Store the value being faded to.

      sound._fadeTo = to; // Update the volume value on each interval tick.

      sound._interval = setInterval(function () {
        // Update the volume based on the time since the last tick.
        var tick = (Date.now() - lastTick) / len;
        lastTick = Date.now();
        vol += diff * tick; // Round to within 2 decimal points.

        vol = Math.round(vol * 100) / 100; // Make sure the volume is in the right bounds.

        if (diff < 0) {
          vol = Math.max(to, vol);
        } else {
          vol = Math.min(to, vol);
        } // Change the volume.


        if (self._webAudio) {
          sound._volume = vol;
        } else {
          self.volume(vol, sound._id, true);
        } // Set the group's volume.


        if (isGroup) {
          self._volume = vol;
        } // When the fade is complete, stop it and fire event.


        if (to < from && vol <= to || to > from && vol >= to) {
          clearInterval(sound._interval);
          sound._interval = null;
          sound._fadeTo = null;
          self.volume(to, sound._id);

          self._emit('fade', sound._id);
        }
      }, stepLen);
    },

    /**
     * Internal method that stops the currently playing fade when
     * a new fade starts, volume is changed or the sound is stopped.
     * @param  {Number} id The sound id.
     * @return {Howl}
     */
    _stopFade: function _stopFade(id) {
      var self = this;

      var sound = self._soundById(id);

      if (sound && sound._interval) {
        if (self._webAudio) {
          sound._node.gain.cancelScheduledValues(Howler.ctx.currentTime);
        }

        clearInterval(sound._interval);
        sound._interval = null;
        self.volume(sound._fadeTo, id);
        sound._fadeTo = null;

        self._emit('fade', id);
      }

      return self;
    },

    /**
     * Get/set the loop parameter on a sound. This method can optionally take 0, 1 or 2 arguments.
     *   loop() -> Returns the group's loop value.
     *   loop(id) -> Returns the sound id's loop value.
     *   loop(loop) -> Sets the loop value for all sounds in this Howl group.
     *   loop(loop, id) -> Sets the loop value of passed sound id.
     * @return {Howl/Boolean} Returns self or current loop value.
     */
    loop: function loop() {
      var self = this;
      var args = arguments;
      var loop, id, sound; // Determine the values for loop and id.

      if (args.length === 0) {
        // Return the grou's loop value.
        return self._loop;
      } else if (args.length === 1) {
        if (typeof args[0] === 'boolean') {
          loop = args[0];
          self._loop = loop;
        } else {
          // Return this sound's loop value.
          sound = self._soundById(parseInt(args[0], 10));
          return sound ? sound._loop : false;
        }
      } else if (args.length === 2) {
        loop = args[0];
        id = parseInt(args[1], 10);
      } // If no id is passed, get all ID's to be looped.


      var ids = self._getSoundIds(id);

      for (var i = 0; i < ids.length; i++) {
        sound = self._soundById(ids[i]);

        if (sound) {
          sound._loop = loop;

          if (self._webAudio && sound._node && sound._node.bufferSource) {
            sound._node.bufferSource.loop = loop;

            if (loop) {
              sound._node.bufferSource.loopStart = sound._start || 0;
              sound._node.bufferSource.loopEnd = sound._stop; // If playing, restart playback to ensure looping updates.

              if (self.playing(ids[i])) {
                self.pause(ids[i], true);
                self.play(ids[i], true);
              }
            }
          }
        }
      }

      return self;
    },

    /**
     * Get/set the playback rate of a sound. This method can optionally take 0, 1 or 2 arguments.
     *   rate() -> Returns the first sound node's current playback rate.
     *   rate(id) -> Returns the sound id's current playback rate.
     *   rate(rate) -> Sets the playback rate of all sounds in this Howl group.
     *   rate(rate, id) -> Sets the playback rate of passed sound id.
     * @return {Howl/Number} Returns self or the current playback rate.
     */
    rate: function rate() {
      var self = this;
      var args = arguments;
      var rate, id; // Determine the values based on arguments.

      if (args.length === 0) {
        // We will simply return the current rate of the first node.
        id = self._sounds[0]._id;
      } else if (args.length === 1) {
        // First check if this is an ID, and if not, assume it is a new rate value.
        var ids = self._getSoundIds();

        var index = ids.indexOf(args[0]);

        if (index >= 0) {
          id = parseInt(args[0], 10);
        } else {
          rate = parseFloat(args[0]);
        }
      } else if (args.length === 2) {
        rate = parseFloat(args[0]);
        id = parseInt(args[1], 10);
      } // Update the playback rate or return the current value.


      var sound;

      if (typeof rate === 'number') {
        // If the sound hasn't loaded, add it to the load queue to change playback rate when capable.
        if (self._state !== 'loaded' || self._playLock) {
          self._queue.push({
            event: 'rate',
            action: function action() {
              self.rate.apply(self, args);
            }
          });

          return self;
        } // Set the group rate.


        if (typeof id === 'undefined') {
          self._rate = rate;
        } // Update one or all volumes.


        id = self._getSoundIds(id);

        for (var i = 0; i < id.length; i++) {
          // Get the sound.
          sound = self._soundById(id[i]);

          if (sound) {
            // Keep track of our position when the rate changed and update the playback
            // start position so we can properly adjust the seek position for time elapsed.
            if (self.playing(id[i])) {
              sound._rateSeek = self.seek(id[i]);
              sound._playStart = self._webAudio ? Howler.ctx.currentTime : sound._playStart;
            }

            sound._rate = rate; // Change the playback rate.

            if (self._webAudio && sound._node && sound._node.bufferSource) {
              sound._node.bufferSource.playbackRate.setValueAtTime(rate, Howler.ctx.currentTime);
            } else if (sound._node) {
              sound._node.playbackRate = rate;
            } // Reset the timers.


            var seek = self.seek(id[i]);
            var duration = (self._sprite[sound._sprite][0] + self._sprite[sound._sprite][1]) / 1000 - seek;
            var timeout = duration * 1000 / Math.abs(sound._rate); // Start a new end timer if sound is already playing.

            if (self._endTimers[id[i]] || !sound._paused) {
              self._clearTimer(id[i]);

              self._endTimers[id[i]] = setTimeout(self._ended.bind(self, sound), timeout);
            }

            self._emit('rate', sound._id);
          }
        }
      } else {
        sound = self._soundById(id);
        return sound ? sound._rate : self._rate;
      }

      return self;
    },

    /**
     * Get/set the seek position of a sound. This method can optionally take 0, 1 or 2 arguments.
     *   seek() -> Returns the first sound node's current seek position.
     *   seek(id) -> Returns the sound id's current seek position.
     *   seek(seek) -> Sets the seek position of the first sound node.
     *   seek(seek, id) -> Sets the seek position of passed sound id.
     * @return {Howl/Number} Returns self or the current seek position.
     */
    seek: function seek() {
      var self = this;
      var args = arguments;
      var seek, id; // Determine the values based on arguments.

      if (args.length === 0) {
        // We will simply return the current position of the first node.
        if (self._sounds.length) {
          id = self._sounds[0]._id;
        }
      } else if (args.length === 1) {
        // First check if this is an ID, and if not, assume it is a new seek position.
        var ids = self._getSoundIds();

        var index = ids.indexOf(args[0]);

        if (index >= 0) {
          id = parseInt(args[0], 10);
        } else if (self._sounds.length) {
          id = self._sounds[0]._id;
          seek = parseFloat(args[0]);
        }
      } else if (args.length === 2) {
        seek = parseFloat(args[0]);
        id = parseInt(args[1], 10);
      } // If there is no ID, bail out.


      if (typeof id === 'undefined') {
        return 0;
      } // If the sound hasn't loaded, add it to the load queue to seek when capable.


      if (typeof seek === 'number' && (self._state !== 'loaded' || self._playLock)) {
        self._queue.push({
          event: 'seek',
          action: function action() {
            self.seek.apply(self, args);
          }
        });

        return self;
      } // Get the sound.


      var sound = self._soundById(id);

      if (sound) {
        if (typeof seek === 'number' && seek >= 0) {
          // Pause the sound and update position for restarting playback.
          var playing = self.playing(id);

          if (playing) {
            self.pause(id, true);
          } // Move the position of the track and cancel timer.


          sound._seek = seek;
          sound._ended = false;

          self._clearTimer(id); // Update the seek position for HTML5 Audio.


          if (!self._webAudio && sound._node && !isNaN(sound._node.duration)) {
            sound._node.currentTime = seek;
          } // Seek and emit when ready.


          var seekAndEmit = function seekAndEmit() {
            // Restart the playback if the sound was playing.
            if (playing) {
              self.play(id, true);
            }

            self._emit('seek', id);
          }; // Wait for the play lock to be unset before emitting (HTML5 Audio).


          if (playing && !self._webAudio) {
            var emitSeek = function emitSeek() {
              if (!self._playLock) {
                seekAndEmit();
              } else {
                setTimeout(emitSeek, 0);
              }
            };

            setTimeout(emitSeek, 0);
          } else {
            seekAndEmit();
          }
        } else {
          if (self._webAudio) {
            var realTime = self.playing(id) ? Howler.ctx.currentTime - sound._playStart : 0;
            var rateSeek = sound._rateSeek ? sound._rateSeek - sound._seek : 0;
            return sound._seek + (rateSeek + realTime * Math.abs(sound._rate));
          } else {
            return sound._node.currentTime;
          }
        }
      }

      return self;
    },

    /**
     * Check if a specific sound is currently playing or not (if id is provided), or check if at least one of the sounds in the group is playing or not.
     * @param  {Number}  id The sound id to check. If none is passed, the whole sound group is checked.
     * @return {Boolean} True if playing and false if not.
     */
    playing: function playing(id) {
      var self = this; // Check the passed sound ID (if any).

      if (typeof id === 'number') {
        var sound = self._soundById(id);

        return sound ? !sound._paused : false;
      } // Otherwise, loop through all sounds and check if any are playing.


      for (var i = 0; i < self._sounds.length; i++) {
        if (!self._sounds[i]._paused) {
          return true;
        }
      }

      return false;
    },

    /**
     * Get the duration of this sound. Passing a sound id will return the sprite duration.
     * @param  {Number} id The sound id to check. If none is passed, return full source duration.
     * @return {Number} Audio duration in seconds.
     */
    duration: function duration(id) {
      var self = this;
      var duration = self._duration; // If we pass an ID, get the sound and return the sprite length.

      var sound = self._soundById(id);

      if (sound) {
        duration = self._sprite[sound._sprite][1] / 1000;
      }

      return duration;
    },

    /**
     * Returns the current loaded state of this Howl.
     * @return {String} 'unloaded', 'loading', 'loaded'
     */
    state: function state() {
      return this._state;
    },

    /**
     * Unload and destroy the current Howl object.
     * This will immediately stop all sound instances attached to this group.
     */
    unload: function unload() {
      var self = this; // Stop playing any active sounds.

      var sounds = self._sounds;

      for (var i = 0; i < sounds.length; i++) {
        // Stop the sound if it is currently playing.
        if (!sounds[i]._paused) {
          self.stop(sounds[i]._id);
        } // Remove the source or disconnect.


        if (!self._webAudio) {
          // Set the source to 0-second silence to stop any downloading (except in IE).
          self._clearSound(sounds[i]._node); // Remove any event listeners.


          sounds[i]._node.removeEventListener('error', sounds[i]._errorFn, false);

          sounds[i]._node.removeEventListener(Howler._canPlayEvent, sounds[i]._loadFn, false);

          sounds[i]._node.removeEventListener('ended', sounds[i]._endFn, false); // Release the Audio object back to the pool.


          Howler._releaseHtml5Audio(sounds[i]._node);
        } // Empty out all of the nodes.


        delete sounds[i]._node; // Make sure all timers are cleared out.

        self._clearTimer(sounds[i]._id);
      } // Remove the references in the global Howler object.


      var index = Howler._howls.indexOf(self);

      if (index >= 0) {
        Howler._howls.splice(index, 1);
      } // Delete this sound from the cache (if no other Howl is using it).


      var remCache = true;

      for (i = 0; i < Howler._howls.length; i++) {
        if (Howler._howls[i]._src === self._src || self._src.indexOf(Howler._howls[i]._src) >= 0) {
          remCache = false;
          break;
        }
      }

      if (cache && remCache) {
        delete cache[self._src];
      } // Clear global errors.


      Howler.noAudio = false; // Clear out `self`.

      self._state = 'unloaded';
      self._sounds = [];
      self = null;
      return null;
    },

    /**
     * Listen to a custom event.
     * @param  {String}   event Event name.
     * @param  {Function} fn    Listener to call.
     * @param  {Number}   id    (optional) Only listen to events for this sound.
     * @param  {Number}   once  (INTERNAL) Marks event to fire only once.
     * @return {Howl}
     */
    on: function on(event, fn, id, once) {
      var self = this;
      var events = self['_on' + event];

      if (typeof fn === 'function') {
        events.push(once ? {
          id: id,
          fn: fn,
          once: once
        } : {
          id: id,
          fn: fn
        });
      }

      return self;
    },

    /**
     * Remove a custom event. Call without parameters to remove all events.
     * @param  {String}   event Event name.
     * @param  {Function} fn    Listener to remove. Leave empty to remove all.
     * @param  {Number}   id    (optional) Only remove events for this sound.
     * @return {Howl}
     */
    off: function off(event, fn, id) {
      var self = this;
      var events = self['_on' + event];
      var i = 0; // Allow passing just an event and ID.

      if (typeof fn === 'number') {
        id = fn;
        fn = null;
      }

      if (fn || id) {
        // Loop through event store and remove the passed function.
        for (i = 0; i < events.length; i++) {
          var isId = id === events[i].id;

          if (fn === events[i].fn && isId || !fn && isId) {
            events.splice(i, 1);
            break;
          }
        }
      } else if (event) {
        // Clear out all events of this type.
        self['_on' + event] = [];
      } else {
        // Clear out all events of every type.
        var keys = Object.keys(self);

        for (i = 0; i < keys.length; i++) {
          if (keys[i].indexOf('_on') === 0 && Array.isArray(self[keys[i]])) {
            self[keys[i]] = [];
          }
        }
      }

      return self;
    },

    /**
     * Listen to a custom event and remove it once fired.
     * @param  {String}   event Event name.
     * @param  {Function} fn    Listener to call.
     * @param  {Number}   id    (optional) Only listen to events for this sound.
     * @return {Howl}
     */
    once: function once(event, fn, id) {
      var self = this; // Setup the event listener.

      self.on(event, fn, id, 1);
      return self;
    },

    /**
     * Emit all events of a specific type and pass the sound id.
     * @param  {String} event Event name.
     * @param  {Number} id    Sound ID.
     * @param  {Number} msg   Message to go with event.
     * @return {Howl}
     */
    _emit: function _emit(event, id, msg) {
      var self = this;
      var events = self['_on' + event]; // Loop through event store and fire all functions.

      for (var i = events.length - 1; i >= 0; i--) {
        // Only fire the listener if the correct ID is used.
        if (!events[i].id || events[i].id === id || event === 'load') {
          setTimeout(function (fn) {
            fn.call(this, id, msg);
          }.bind(self, events[i].fn), 0); // If this event was setup with `once`, remove it.

          if (events[i].once) {
            self.off(event, events[i].fn, events[i].id);
          }
        }
      } // Pass the event type into load queue so that it can continue stepping.


      self._loadQueue(event);

      return self;
    },

    /**
     * Queue of actions initiated before the sound has loaded.
     * These will be called in sequence, with the next only firing
     * after the previous has finished executing (even if async like play).
     * @return {Howl}
     */
    _loadQueue: function _loadQueue(event) {
      var self = this;

      if (self._queue.length > 0) {
        var task = self._queue[0]; // Remove this task if a matching event was passed.

        if (task.event === event) {
          self._queue.shift();

          self._loadQueue();
        } // Run the task if no event type is passed.


        if (!event) {
          task.action();
        }
      }

      return self;
    },

    /**
     * Fired when playback ends at the end of the duration.
     * @param  {Sound} sound The sound object to work with.
     * @return {Howl}
     */
    _ended: function _ended(sound) {
      var self = this;
      var sprite = sound._sprite; // If we are using IE and there was network latency we may be clipping
      // audio before it completes playing. Lets check the node to make sure it
      // believes it has completed, before ending the playback.

      if (!self._webAudio && sound._node && !sound._node.paused && !sound._node.ended && sound._node.currentTime < sound._stop) {
        setTimeout(self._ended.bind(self, sound), 100);
        return self;
      } // Should this sound loop?


      var loop = !!(sound._loop || self._sprite[sprite][2]); // Fire the ended event.

      self._emit('end', sound._id); // Restart the playback for HTML5 Audio loop.


      if (!self._webAudio && loop) {
        self.stop(sound._id, true).play(sound._id);
      } // Restart this timer if on a Web Audio loop.


      if (self._webAudio && loop) {
        self._emit('play', sound._id);

        sound._seek = sound._start || 0;
        sound._rateSeek = 0;
        sound._playStart = Howler.ctx.currentTime;
        var timeout = (sound._stop - sound._start) * 1000 / Math.abs(sound._rate);
        self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
      } // Mark the node as paused.


      if (self._webAudio && !loop) {
        sound._paused = true;
        sound._ended = true;
        sound._seek = sound._start || 0;
        sound._rateSeek = 0;

        self._clearTimer(sound._id); // Clean up the buffer source.


        self._cleanBuffer(sound._node); // Attempt to auto-suspend AudioContext if no sounds are still playing.


        Howler._autoSuspend();
      } // When using a sprite, end the track.


      if (!self._webAudio && !loop) {
        self.stop(sound._id, true);
      }

      return self;
    },

    /**
     * Clear the end timer for a sound playback.
     * @param  {Number} id The sound ID.
     * @return {Howl}
     */
    _clearTimer: function _clearTimer(id) {
      var self = this;

      if (self._endTimers[id]) {
        // Clear the timeout or remove the ended listener.
        if (typeof self._endTimers[id] !== 'function') {
          clearTimeout(self._endTimers[id]);
        } else {
          var sound = self._soundById(id);

          if (sound && sound._node) {
            sound._node.removeEventListener('ended', self._endTimers[id], false);
          }
        }

        delete self._endTimers[id];
      }

      return self;
    },

    /**
     * Return the sound identified by this ID, or return null.
     * @param  {Number} id Sound ID
     * @return {Object}    Sound object or null.
     */
    _soundById: function _soundById(id) {
      var self = this; // Loop through all sounds and find the one with this ID.

      for (var i = 0; i < self._sounds.length; i++) {
        if (id === self._sounds[i]._id) {
          return self._sounds[i];
        }
      }

      return null;
    },

    /**
     * Return an inactive sound from the pool or create a new one.
     * @return {Sound} Sound playback object.
     */
    _inactiveSound: function _inactiveSound() {
      var self = this;

      self._drain(); // Find the first inactive node to recycle.


      for (var i = 0; i < self._sounds.length; i++) {
        if (self._sounds[i]._ended) {
          return self._sounds[i].reset();
        }
      } // If no inactive node was found, create a new one.


      return new Sound(self);
    },

    /**
     * Drain excess inactive sounds from the pool.
     */
    _drain: function _drain() {
      var self = this;
      var limit = self._pool;
      var cnt = 0;
      var i = 0; // If there are less sounds than the max pool size, we are done.

      if (self._sounds.length < limit) {
        return;
      } // Count the number of inactive sounds.


      for (i = 0; i < self._sounds.length; i++) {
        if (self._sounds[i]._ended) {
          cnt++;
        }
      } // Remove excess inactive sounds, going in reverse order.


      for (i = self._sounds.length - 1; i >= 0; i--) {
        if (cnt <= limit) {
          return;
        }

        if (self._sounds[i]._ended) {
          // Disconnect the audio source when using Web Audio.
          if (self._webAudio && self._sounds[i]._node) {
            self._sounds[i]._node.disconnect(0);
          } // Remove sounds until we have the pool size.


          self._sounds.splice(i, 1);

          cnt--;
        }
      }
    },

    /**
     * Get all ID's from the sounds pool.
     * @param  {Number} id Only return one ID if one is passed.
     * @return {Array}    Array of IDs.
     */
    _getSoundIds: function _getSoundIds(id) {
      var self = this;

      if (typeof id === 'undefined') {
        var ids = [];

        for (var i = 0; i < self._sounds.length; i++) {
          ids.push(self._sounds[i]._id);
        }

        return ids;
      } else {
        return [id];
      }
    },

    /**
     * Load the sound back into the buffer source.
     * @param  {Sound} sound The sound object to work with.
     * @return {Howl}
     */
    _refreshBuffer: function _refreshBuffer(sound) {
      var self = this; // Setup the buffer source for playback.

      sound._node.bufferSource = Howler.ctx.createBufferSource();
      sound._node.bufferSource.buffer = cache[self._src]; // Connect to the correct node.

      if (sound._panner) {
        sound._node.bufferSource.connect(sound._panner);
      } else {
        sound._node.bufferSource.connect(sound._node);
      } // Setup looping and playback rate.


      sound._node.bufferSource.loop = sound._loop;

      if (sound._loop) {
        sound._node.bufferSource.loopStart = sound._start || 0;
        sound._node.bufferSource.loopEnd = sound._stop || 0;
      }

      sound._node.bufferSource.playbackRate.setValueAtTime(sound._rate, Howler.ctx.currentTime);

      return self;
    },

    /**
     * Prevent memory leaks by cleaning up the buffer source after playback.
     * @param  {Object} node Sound's audio node containing the buffer source.
     * @return {Howl}
     */
    _cleanBuffer: function _cleanBuffer(node) {
      var self = this;
      var isIOS = Howler._navigator && Howler._navigator.vendor.indexOf('Apple') >= 0;

      if (Howler._scratchBuffer && node.bufferSource) {
        node.bufferSource.onended = null;
        node.bufferSource.disconnect(0);

        if (isIOS) {
          try {
            node.bufferSource.buffer = Howler._scratchBuffer;
          } catch (e) {}
        }
      }

      node.bufferSource = null;
      return self;
    },

    /**
     * Set the source to a 0-second silence to stop any downloading (except in IE).
     * @param  {Object} node Audio node to clear.
     */
    _clearSound: function _clearSound(node) {
      var checkIE = /MSIE |Trident\//.test(Howler._navigator && Howler._navigator.userAgent);

      if (!checkIE) {
        node.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      }
    }
  };
  /** Single Sound Methods **/

  /***************************************************************************/

  /**
   * Setup the sound object, which each node attached to a Howl group is contained in.
   * @param {Object} howl The Howl parent group.
   */

  var Sound = function Sound(howl) {
    this._parent = howl;
    this.init();
  };

  Sound.prototype = {
    /**
     * Initialize a new Sound object.
     * @return {Sound}
     */
    init: function init() {
      var self = this;
      var parent = self._parent; // Setup the default parameters.

      self._muted = parent._muted;
      self._loop = parent._loop;
      self._volume = parent._volume;
      self._rate = parent._rate;
      self._seek = 0;
      self._paused = true;
      self._ended = true;
      self._sprite = '__default'; // Generate a unique ID for this sound.

      self._id = ++Howler._counter; // Add itself to the parent's pool.

      parent._sounds.push(self); // Create the new node.


      self.create();
      return self;
    },

    /**
     * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
     * @return {Sound}
     */
    create: function create() {
      var self = this;
      var parent = self._parent;
      var volume = Howler._muted || self._muted || self._parent._muted ? 0 : self._volume;

      if (parent._webAudio) {
        // Create the gain node for controlling volume (the source will connect to this).
        self._node = typeof Howler.ctx.createGain === 'undefined' ? Howler.ctx.createGainNode() : Howler.ctx.createGain();

        self._node.gain.setValueAtTime(volume, Howler.ctx.currentTime);

        self._node.paused = true;

        self._node.connect(Howler.masterGain);
      } else if (!Howler.noAudio) {
        // Get an unlocked Audio object from the pool.
        self._node = Howler._obtainHtml5Audio(); // Listen for errors (http://dev.w3.org/html5/spec-author-view/spec.html#mediaerror).

        self._errorFn = self._errorListener.bind(self);

        self._node.addEventListener('error', self._errorFn, false); // Listen for 'canplaythrough' event to let us know the sound is ready.


        self._loadFn = self._loadListener.bind(self);

        self._node.addEventListener(Howler._canPlayEvent, self._loadFn, false); // Listen for the 'ended' event on the sound to account for edge-case where
        // a finite sound has a duration of Infinity.


        self._endFn = self._endListener.bind(self);

        self._node.addEventListener('ended', self._endFn, false); // Setup the new audio node.


        self._node.src = parent._src;
        self._node.preload = parent._preload === true ? 'auto' : parent._preload;
        self._node.volume = volume * Howler.volume(); // Begin loading the source.

        self._node.load();
      }

      return self;
    },

    /**
     * Reset the parameters of this sound to the original state (for recycle).
     * @return {Sound}
     */
    reset: function reset() {
      var self = this;
      var parent = self._parent; // Reset all of the parameters of this sound.

      self._muted = parent._muted;
      self._loop = parent._loop;
      self._volume = parent._volume;
      self._rate = parent._rate;
      self._seek = 0;
      self._rateSeek = 0;
      self._paused = true;
      self._ended = true;
      self._sprite = '__default'; // Generate a new ID so that it isn't confused with the previous sound.

      self._id = ++Howler._counter;
      return self;
    },

    /**
     * HTML5 Audio error listener callback.
     */
    _errorListener: function _errorListener() {
      var self = this; // Fire an error event and pass back the code.

      self._parent._emit('loaderror', self._id, self._node.error ? self._node.error.code : 0); // Clear the event listener.


      self._node.removeEventListener('error', self._errorFn, false);
    },

    /**
     * HTML5 Audio canplaythrough listener callback.
     */
    _loadListener: function _loadListener() {
      var self = this;
      var parent = self._parent; // Round up the duration to account for the lower precision in HTML5 Audio.

      parent._duration = Math.ceil(self._node.duration * 10) / 10; // Setup a sprite if none is defined.

      if (Object.keys(parent._sprite).length === 0) {
        parent._sprite = {
          __default: [0, parent._duration * 1000]
        };
      }

      if (parent._state !== 'loaded') {
        parent._state = 'loaded';

        parent._emit('load');

        parent._loadQueue();
      } // Clear the event listener.


      self._node.removeEventListener(Howler._canPlayEvent, self._loadFn, false);
    },

    /**
     * HTML5 Audio ended listener callback.
     */
    _endListener: function _endListener() {
      var self = this;
      var parent = self._parent; // Only handle the `ended`` event if the duration is Infinity.

      if (parent._duration === Infinity) {
        // Update the parent duration to match the real audio duration.
        // Round up the duration to account for the lower precision in HTML5 Audio.
        parent._duration = Math.ceil(self._node.duration * 10) / 10; // Update the sprite that corresponds to the real duration.

        if (parent._sprite.__default[1] === Infinity) {
          parent._sprite.__default[1] = parent._duration * 1000;
        } // Run the regular ended method.


        parent._ended(self);
      } // Clear the event listener since the duration is now correct.


      self._node.removeEventListener('ended', self._endFn, false);
    }
  };
  /** Helper Methods **/

  /***************************************************************************/

  var cache = {};
  /**
   * Buffer a sound from URL, Data URI or cache and decode to audio source (Web Audio API).
   * @param  {Howl} self
   */

  var loadBuffer = function loadBuffer(self) {
    var url = self._src; // Check if the buffer has already been cached and use it instead.

    if (cache[url]) {
      // Set the duration from the cache.
      self._duration = cache[url].duration; // Load the sound into this Howl.

      loadSound(self);
      return;
    }

    if (/^data:[^;]+;base64,/.test(url)) {
      // Decode the base64 data URI without XHR, since some browsers don't support it.
      var data = atob(url.split(',')[1]);
      var dataView = new Uint8Array(data.length);

      for (var i = 0; i < data.length; ++i) {
        dataView[i] = data.charCodeAt(i);
      }

      decodeAudioData(dataView.buffer, self);
    } else {
      // Load the buffer from the URL.
      var xhr = new XMLHttpRequest();
      xhr.open(self._xhr.method, url, true);
      xhr.withCredentials = self._xhr.withCredentials;
      xhr.responseType = 'arraybuffer'; // Apply any custom headers to the request.

      if (self._xhr.headers) {
        Object.keys(self._xhr.headers).forEach(function (key) {
          xhr.setRequestHeader(key, self._xhr.headers[key]);
        });
      }

      xhr.onload = function () {
        // Make sure we get a successful response back.
        var code = (xhr.status + '')[0];

        if (code !== '0' && code !== '2' && code !== '3') {
          self._emit('loaderror', null, 'Failed loading audio file with status: ' + xhr.status + '.');

          return;
        }

        decodeAudioData(xhr.response, self);
      };

      xhr.onerror = function () {
        // If there is an error, switch to HTML5 Audio.
        if (self._webAudio) {
          self._html5 = true;
          self._webAudio = false;
          self._sounds = [];
          delete cache[url];
          self.load();
        }
      };

      safeXhrSend(xhr);
    }
  };
  /**
   * Send the XHR request wrapped in a try/catch.
   * @param  {Object} xhr XHR to send.
   */


  var safeXhrSend = function safeXhrSend(xhr) {
    try {
      xhr.send();
    } catch (e) {
      xhr.onerror();
    }
  };
  /**
   * Decode audio data from an array buffer.
   * @param  {ArrayBuffer} arraybuffer The audio data.
   * @param  {Howl}        self
   */


  var decodeAudioData = function decodeAudioData(arraybuffer, self) {
    // Fire a load error if something broke.
    var error = function error() {
      self._emit('loaderror', null, 'Decoding audio data failed.');
    }; // Load the sound on success.


    var success = function success(buffer) {
      if (buffer && self._sounds.length > 0) {
        cache[self._src] = buffer;
        loadSound(self, buffer);
      } else {
        error();
      }
    }; // Decode the buffer into an audio source.


    if (typeof Promise !== 'undefined' && Howler.ctx.decodeAudioData.length === 1) {
      Howler.ctx.decodeAudioData(arraybuffer).then(success).catch(error);
    } else {
      Howler.ctx.decodeAudioData(arraybuffer, success, error);
    }
  };
  /**
   * Sound is now loaded, so finish setting everything up and fire the loaded event.
   * @param  {Howl} self
   * @param  {Object} buffer The decoded buffer sound source.
   */


  var loadSound = function loadSound(self, buffer) {
    // Set the duration.
    if (buffer && !self._duration) {
      self._duration = buffer.duration;
    } // Setup a sprite if none is defined.


    if (Object.keys(self._sprite).length === 0) {
      self._sprite = {
        __default: [0, self._duration * 1000]
      };
    } // Fire the loaded event.


    if (self._state !== 'loaded') {
      self._state = 'loaded';

      self._emit('load');

      self._loadQueue();
    }
  };
  /**
   * Setup the audio context when available, or switch to HTML5 Audio mode.
   */


  var setupAudioContext = function setupAudioContext() {
    // If we have already detected that Web Audio isn't supported, don't run this step again.
    if (!Howler.usingWebAudio) {
      return;
    } // Check if we are using Web Audio and setup the AudioContext if we are.


    try {
      if (typeof AudioContext !== 'undefined') {
        Howler.ctx = new AudioContext();
      } else if (typeof webkitAudioContext !== 'undefined') {
        Howler.ctx = new webkitAudioContext();
      } else {
        Howler.usingWebAudio = false;
      }
    } catch (e) {
      Howler.usingWebAudio = false;
    } // If the audio context creation still failed, set using web audio to false.


    if (!Howler.ctx) {
      Howler.usingWebAudio = false;
    } // Check if a webview is being used on iOS8 or earlier (rather than the browser).
    // If it is, disable Web Audio as it causes crashing.


    var iOS = /iP(hone|od|ad)/.test(Howler._navigator && Howler._navigator.platform);

    var appVersion = Howler._navigator && Howler._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);

    var version = appVersion ? parseInt(appVersion[1], 10) : null;

    if (iOS && version && version < 9) {
      var safari = /safari/.test(Howler._navigator && Howler._navigator.userAgent.toLowerCase());

      if (Howler._navigator && !safari) {
        Howler.usingWebAudio = false;
      }
    } // Create and expose the master GainNode when using Web Audio (useful for plugins or advanced usage).


    if (Howler.usingWebAudio) {
      Howler.masterGain = typeof Howler.ctx.createGain === 'undefined' ? Howler.ctx.createGainNode() : Howler.ctx.createGain();
      Howler.masterGain.gain.setValueAtTime(Howler._muted ? 0 : Howler._volume, Howler.ctx.currentTime);
      Howler.masterGain.connect(Howler.ctx.destination);
    } // Re-run the setup on Howler.


    Howler._setup();
  }; // Add support for AMD (Asynchronous Module Definition) libraries such as require.js.


  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return {
        Howler: Howler,
        Howl: Howl
      };
    });
  } // Add support for CommonJS libraries such as browserify.


  if (typeof exports !== 'undefined') {
    exports.Howler = Howler;
    exports.Howl = Howl;
  } // Add to global in Node.js (for testing, etc).


  if (typeof global !== 'undefined') {
    global.HowlerGlobal = HowlerGlobal;
    global.Howler = Howler;
    global.Howl = Howl;
    global.Sound = Sound;
  } else if (typeof window !== 'undefined') {
    // Define globally in case AMD is not available or unused.
    window.HowlerGlobal = HowlerGlobal;
    window.Howler = Howler;
    window.Howl = Howl;
    window.Sound = Sound;
  }
})();
/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */


(function () {
  'use strict'; // Setup default properties.

  HowlerGlobal.prototype._pos = [0, 0, 0];
  HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];
  /** Global Methods **/

  /***************************************************************************/

  /**
   * Helper method to update the stereo panning position of all current Howls.
   * Future Howls will not use this value unless explicitly set.
   * @param  {Number} pan A value of -1.0 is all the way left and 1.0 is all the way right.
   * @return {Howler/Number}     Self or current stereo panning value.
   */

  HowlerGlobal.prototype.stereo = function (pan) {
    var self = this; // Stop right here if not using Web Audio.

    if (!self.ctx || !self.ctx.listener) {
      return self;
    } // Loop through all Howls and update their stereo panning.


    for (var i = self._howls.length - 1; i >= 0; i--) {
      self._howls[i].stereo(pan);
    }

    return self;
  };
  /**
   * Get/set the position of the listener in 3D cartesian space. Sounds using
   * 3D position will be relative to the listener's position.
   * @param  {Number} x The x-position of the listener.
   * @param  {Number} y The y-position of the listener.
   * @param  {Number} z The z-position of the listener.
   * @return {Howler/Array}   Self or current listener position.
   */


  HowlerGlobal.prototype.pos = function (x, y, z) {
    var self = this; // Stop right here if not using Web Audio.

    if (!self.ctx || !self.ctx.listener) {
      return self;
    } // Set the defaults for optional 'y' & 'z'.


    y = typeof y !== 'number' ? self._pos[1] : y;
    z = typeof z !== 'number' ? self._pos[2] : z;

    if (typeof x === 'number') {
      self._pos = [x, y, z];

      if (typeof self.ctx.listener.positionX !== 'undefined') {
        self.ctx.listener.positionX.setTargetAtTime(self._pos[0], Howler.ctx.currentTime, 0.1);
        self.ctx.listener.positionY.setTargetAtTime(self._pos[1], Howler.ctx.currentTime, 0.1);
        self.ctx.listener.positionZ.setTargetAtTime(self._pos[2], Howler.ctx.currentTime, 0.1);
      } else {
        self.ctx.listener.setPosition(self._pos[0], self._pos[1], self._pos[2]);
      }
    } else {
      return self._pos;
    }

    return self;
  };
  /**
   * Get/set the direction the listener is pointing in the 3D cartesian space.
   * A front and up vector must be provided. The front is the direction the
   * face of the listener is pointing, and up is the direction the top of the
   * listener is pointing. Thus, these values are expected to be at right angles
   * from each other.
   * @param  {Number} x   The x-orientation of the listener.
   * @param  {Number} y   The y-orientation of the listener.
   * @param  {Number} z   The z-orientation of the listener.
   * @param  {Number} xUp The x-orientation of the top of the listener.
   * @param  {Number} yUp The y-orientation of the top of the listener.
   * @param  {Number} zUp The z-orientation of the top of the listener.
   * @return {Howler/Array}     Returns self or the current orientation vectors.
   */


  HowlerGlobal.prototype.orientation = function (x, y, z, xUp, yUp, zUp) {
    var self = this; // Stop right here if not using Web Audio.

    if (!self.ctx || !self.ctx.listener) {
      return self;
    } // Set the defaults for optional 'y' & 'z'.


    var or = self._orientation;
    y = typeof y !== 'number' ? or[1] : y;
    z = typeof z !== 'number' ? or[2] : z;
    xUp = typeof xUp !== 'number' ? or[3] : xUp;
    yUp = typeof yUp !== 'number' ? or[4] : yUp;
    zUp = typeof zUp !== 'number' ? or[5] : zUp;

    if (typeof x === 'number') {
      self._orientation = [x, y, z, xUp, yUp, zUp];

      if (typeof self.ctx.listener.forwardX !== 'undefined') {
        self.ctx.listener.forwardX.setTargetAtTime(x, Howler.ctx.currentTime, 0.1);
        self.ctx.listener.forwardY.setTargetAtTime(y, Howler.ctx.currentTime, 0.1);
        self.ctx.listener.forwardZ.setTargetAtTime(z, Howler.ctx.currentTime, 0.1);
        self.ctx.listener.upX.setTargetAtTime(xUp, Howler.ctx.currentTime, 0.1);
        self.ctx.listener.upY.setTargetAtTime(yUp, Howler.ctx.currentTime, 0.1);
        self.ctx.listener.upZ.setTargetAtTime(zUp, Howler.ctx.currentTime, 0.1);
      } else {
        self.ctx.listener.setOrientation(x, y, z, xUp, yUp, zUp);
      }
    } else {
      return or;
    }

    return self;
  };
  /** Group Methods **/

  /***************************************************************************/

  /**
   * Add new properties to the core init.
   * @param  {Function} _super Core init method.
   * @return {Howl}
   */


  Howl.prototype.init = function (_super) {
    return function (o) {
      var self = this; // Setup user-defined default properties.

      self._orientation = o.orientation || [1, 0, 0];
      self._stereo = o.stereo || null;
      self._pos = o.pos || null;
      self._pannerAttr = {
        coneInnerAngle: typeof o.coneInnerAngle !== 'undefined' ? o.coneInnerAngle : 360,
        coneOuterAngle: typeof o.coneOuterAngle !== 'undefined' ? o.coneOuterAngle : 360,
        coneOuterGain: typeof o.coneOuterGain !== 'undefined' ? o.coneOuterGain : 0,
        distanceModel: typeof o.distanceModel !== 'undefined' ? o.distanceModel : 'inverse',
        maxDistance: typeof o.maxDistance !== 'undefined' ? o.maxDistance : 10000,
        panningModel: typeof o.panningModel !== 'undefined' ? o.panningModel : 'HRTF',
        refDistance: typeof o.refDistance !== 'undefined' ? o.refDistance : 1,
        rolloffFactor: typeof o.rolloffFactor !== 'undefined' ? o.rolloffFactor : 1
      }; // Setup event listeners.

      self._onstereo = o.onstereo ? [{
        fn: o.onstereo
      }] : [];
      self._onpos = o.onpos ? [{
        fn: o.onpos
      }] : [];
      self._onorientation = o.onorientation ? [{
        fn: o.onorientation
      }] : []; // Complete initilization with howler.js core's init function.

      return _super.call(this, o);
    };
  }(Howl.prototype.init);
  /**
   * Get/set the stereo panning of the audio source for this sound or all in the group.
   * @param  {Number} pan  A value of -1.0 is all the way left and 1.0 is all the way right.
   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
   * @return {Howl/Number}    Returns self or the current stereo panning value.
   */


  Howl.prototype.stereo = function (pan, id) {
    var self = this; // Stop right here if not using Web Audio.

    if (!self._webAudio) {
      return self;
    } // If the sound hasn't loaded, add it to the load queue to change stereo pan when capable.


    if (self._state !== 'loaded') {
      self._queue.push({
        event: 'stereo',
        action: function action() {
          self.stereo(pan, id);
        }
      });

      return self;
    } // Check for PannerStereoNode support and fallback to PannerNode if it doesn't exist.


    var pannerType = typeof Howler.ctx.createStereoPanner === 'undefined' ? 'spatial' : 'stereo'; // Setup the group's stereo panning if no ID is passed.

    if (typeof id === 'undefined') {
      // Return the group's stereo panning if no parameters are passed.
      if (typeof pan === 'number') {
        self._stereo = pan;
        self._pos = [pan, 0, 0];
      } else {
        return self._stereo;
      }
    } // Change the streo panning of one or all sounds in group.


    var ids = self._getSoundIds(id);

    for (var i = 0; i < ids.length; i++) {
      // Get the sound.
      var sound = self._soundById(ids[i]);

      if (sound) {
        if (typeof pan === 'number') {
          sound._stereo = pan;
          sound._pos = [pan, 0, 0];

          if (sound._node) {
            // If we are falling back, make sure the panningModel is equalpower.
            sound._pannerAttr.panningModel = 'equalpower'; // Check if there is a panner setup and create a new one if not.

            if (!sound._panner || !sound._panner.pan) {
              setupPanner(sound, pannerType);
            }

            if (pannerType === 'spatial') {
              if (typeof sound._panner.positionX !== 'undefined') {
                sound._panner.positionX.setValueAtTime(pan, Howler.ctx.currentTime);

                sound._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime);

                sound._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime);
              } else {
                sound._panner.setPosition(pan, 0, 0);
              }
            } else {
              sound._panner.pan.setValueAtTime(pan, Howler.ctx.currentTime);
            }
          }

          self._emit('stereo', sound._id);
        } else {
          return sound._stereo;
        }
      }
    }

    return self;
  };
  /**
   * Get/set the 3D spatial position of the audio source for this sound or group relative to the global listener.
   * @param  {Number} x  The x-position of the audio source.
   * @param  {Number} y  The y-position of the audio source.
   * @param  {Number} z  The z-position of the audio source.
   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
   * @return {Howl/Array}    Returns self or the current 3D spatial position: [x, y, z].
   */


  Howl.prototype.pos = function (x, y, z, id) {
    var self = this; // Stop right here if not using Web Audio.

    if (!self._webAudio) {
      return self;
    } // If the sound hasn't loaded, add it to the load queue to change position when capable.


    if (self._state !== 'loaded') {
      self._queue.push({
        event: 'pos',
        action: function action() {
          self.pos(x, y, z, id);
        }
      });

      return self;
    } // Set the defaults for optional 'y' & 'z'.


    y = typeof y !== 'number' ? 0 : y;
    z = typeof z !== 'number' ? -0.5 : z; // Setup the group's spatial position if no ID is passed.

    if (typeof id === 'undefined') {
      // Return the group's spatial position if no parameters are passed.
      if (typeof x === 'number') {
        self._pos = [x, y, z];
      } else {
        return self._pos;
      }
    } // Change the spatial position of one or all sounds in group.


    var ids = self._getSoundIds(id);

    for (var i = 0; i < ids.length; i++) {
      // Get the sound.
      var sound = self._soundById(ids[i]);

      if (sound) {
        if (typeof x === 'number') {
          sound._pos = [x, y, z];

          if (sound._node) {
            // Check if there is a panner setup and create a new one if not.
            if (!sound._panner || sound._panner.pan) {
              setupPanner(sound, 'spatial');
            }

            if (typeof sound._panner.positionX !== 'undefined') {
              sound._panner.positionX.setValueAtTime(x, Howler.ctx.currentTime);

              sound._panner.positionY.setValueAtTime(y, Howler.ctx.currentTime);

              sound._panner.positionZ.setValueAtTime(z, Howler.ctx.currentTime);
            } else {
              sound._panner.setPosition(x, y, z);
            }
          }

          self._emit('pos', sound._id);
        } else {
          return sound._pos;
        }
      }
    }

    return self;
  };
  /**
   * Get/set the direction the audio source is pointing in the 3D cartesian coordinate
   * space. Depending on how direction the sound is, based on the `cone` attributes,
   * a sound pointing away from the listener can be quiet or silent.
   * @param  {Number} x  The x-orientation of the source.
   * @param  {Number} y  The y-orientation of the source.
   * @param  {Number} z  The z-orientation of the source.
   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
   * @return {Howl/Array}    Returns self or the current 3D spatial orientation: [x, y, z].
   */


  Howl.prototype.orientation = function (x, y, z, id) {
    var self = this; // Stop right here if not using Web Audio.

    if (!self._webAudio) {
      return self;
    } // If the sound hasn't loaded, add it to the load queue to change orientation when capable.


    if (self._state !== 'loaded') {
      self._queue.push({
        event: 'orientation',
        action: function action() {
          self.orientation(x, y, z, id);
        }
      });

      return self;
    } // Set the defaults for optional 'y' & 'z'.


    y = typeof y !== 'number' ? self._orientation[1] : y;
    z = typeof z !== 'number' ? self._orientation[2] : z; // Setup the group's spatial orientation if no ID is passed.

    if (typeof id === 'undefined') {
      // Return the group's spatial orientation if no parameters are passed.
      if (typeof x === 'number') {
        self._orientation = [x, y, z];
      } else {
        return self._orientation;
      }
    } // Change the spatial orientation of one or all sounds in group.


    var ids = self._getSoundIds(id);

    for (var i = 0; i < ids.length; i++) {
      // Get the sound.
      var sound = self._soundById(ids[i]);

      if (sound) {
        if (typeof x === 'number') {
          sound._orientation = [x, y, z];

          if (sound._node) {
            // Check if there is a panner setup and create a new one if not.
            if (!sound._panner) {
              // Make sure we have a position to setup the node with.
              if (!sound._pos) {
                sound._pos = self._pos || [0, 0, -0.5];
              }

              setupPanner(sound, 'spatial');
            }

            if (typeof sound._panner.orientationX !== 'undefined') {
              sound._panner.orientationX.setValueAtTime(x, Howler.ctx.currentTime);

              sound._panner.orientationY.setValueAtTime(y, Howler.ctx.currentTime);

              sound._panner.orientationZ.setValueAtTime(z, Howler.ctx.currentTime);
            } else {
              sound._panner.setOrientation(x, y, z);
            }
          }

          self._emit('orientation', sound._id);
        } else {
          return sound._orientation;
        }
      }
    }

    return self;
  };
  /**
   * Get/set the panner node's attributes for a sound or group of sounds.
   * This method can optionall take 0, 1 or 2 arguments.
   *   pannerAttr() -> Returns the group's values.
   *   pannerAttr(id) -> Returns the sound id's values.
   *   pannerAttr(o) -> Set's the values of all sounds in this Howl group.
   *   pannerAttr(o, id) -> Set's the values of passed sound id.
   *
   *   Attributes:
   *     coneInnerAngle - (360 by default) A parameter for directional audio sources, this is an angle, in degrees,
   *                      inside of which there will be no volume reduction.
   *     coneOuterAngle - (360 by default) A parameter for directional audio sources, this is an angle, in degrees,
   *                      outside of which the volume will be reduced to a constant value of `coneOuterGain`.
   *     coneOuterGain - (0 by default) A parameter for directional audio sources, this is the gain outside of the
   *                     `coneOuterAngle`. It is a linear value in the range `[0, 1]`.
   *     distanceModel - ('inverse' by default) Determines algorithm used to reduce volume as audio moves away from
   *                     listener. Can be `linear`, `inverse` or `exponential.
   *     maxDistance - (10000 by default) The maximum distance between source and listener, after which the volume
   *                   will not be reduced any further.
   *     refDistance - (1 by default) A reference distance for reducing volume as source moves further from the listener.
   *                   This is simply a variable of the distance model and has a different effect depending on which model
   *                   is used and the scale of your coordinates. Generally, volume will be equal to 1 at this distance.
   *     rolloffFactor - (1 by default) How quickly the volume reduces as source moves from listener. This is simply a
   *                     variable of the distance model and can be in the range of `[0, 1]` with `linear` and `[0, ∞]`
   *                     with `inverse` and `exponential`.
   *     panningModel - ('HRTF' by default) Determines which spatialization algorithm is used to position audio.
   *                     Can be `HRTF` or `equalpower`.
   *
   * @return {Howl/Object} Returns self or current panner attributes.
   */


  Howl.prototype.pannerAttr = function () {
    var self = this;
    var args = arguments;
    var o, id, sound; // Stop right here if not using Web Audio.

    if (!self._webAudio) {
      return self;
    } // Determine the values based on arguments.


    if (args.length === 0) {
      // Return the group's panner attribute values.
      return self._pannerAttr;
    } else if (args.length === 1) {
      if (_typeof(args[0]) === 'object') {
        o = args[0]; // Set the grou's panner attribute values.

        if (typeof id === 'undefined') {
          if (!o.pannerAttr) {
            o.pannerAttr = {
              coneInnerAngle: o.coneInnerAngle,
              coneOuterAngle: o.coneOuterAngle,
              coneOuterGain: o.coneOuterGain,
              distanceModel: o.distanceModel,
              maxDistance: o.maxDistance,
              refDistance: o.refDistance,
              rolloffFactor: o.rolloffFactor,
              panningModel: o.panningModel
            };
          }

          self._pannerAttr = {
            coneInnerAngle: typeof o.pannerAttr.coneInnerAngle !== 'undefined' ? o.pannerAttr.coneInnerAngle : self._coneInnerAngle,
            coneOuterAngle: typeof o.pannerAttr.coneOuterAngle !== 'undefined' ? o.pannerAttr.coneOuterAngle : self._coneOuterAngle,
            coneOuterGain: typeof o.pannerAttr.coneOuterGain !== 'undefined' ? o.pannerAttr.coneOuterGain : self._coneOuterGain,
            distanceModel: typeof o.pannerAttr.distanceModel !== 'undefined' ? o.pannerAttr.distanceModel : self._distanceModel,
            maxDistance: typeof o.pannerAttr.maxDistance !== 'undefined' ? o.pannerAttr.maxDistance : self._maxDistance,
            refDistance: typeof o.pannerAttr.refDistance !== 'undefined' ? o.pannerAttr.refDistance : self._refDistance,
            rolloffFactor: typeof o.pannerAttr.rolloffFactor !== 'undefined' ? o.pannerAttr.rolloffFactor : self._rolloffFactor,
            panningModel: typeof o.pannerAttr.panningModel !== 'undefined' ? o.pannerAttr.panningModel : self._panningModel
          };
        }
      } else {
        // Return this sound's panner attribute values.
        sound = self._soundById(parseInt(args[0], 10));
        return sound ? sound._pannerAttr : self._pannerAttr;
      }
    } else if (args.length === 2) {
      o = args[0];
      id = parseInt(args[1], 10);
    } // Update the values of the specified sounds.


    var ids = self._getSoundIds(id);

    for (var i = 0; i < ids.length; i++) {
      sound = self._soundById(ids[i]);

      if (sound) {
        // Merge the new values into the sound.
        var pa = sound._pannerAttr;
        pa = {
          coneInnerAngle: typeof o.coneInnerAngle !== 'undefined' ? o.coneInnerAngle : pa.coneInnerAngle,
          coneOuterAngle: typeof o.coneOuterAngle !== 'undefined' ? o.coneOuterAngle : pa.coneOuterAngle,
          coneOuterGain: typeof o.coneOuterGain !== 'undefined' ? o.coneOuterGain : pa.coneOuterGain,
          distanceModel: typeof o.distanceModel !== 'undefined' ? o.distanceModel : pa.distanceModel,
          maxDistance: typeof o.maxDistance !== 'undefined' ? o.maxDistance : pa.maxDistance,
          refDistance: typeof o.refDistance !== 'undefined' ? o.refDistance : pa.refDistance,
          rolloffFactor: typeof o.rolloffFactor !== 'undefined' ? o.rolloffFactor : pa.rolloffFactor,
          panningModel: typeof o.panningModel !== 'undefined' ? o.panningModel : pa.panningModel
        }; // Update the panner values or create a new panner if none exists.

        var panner = sound._panner;

        if (panner) {
          panner.coneInnerAngle = pa.coneInnerAngle;
          panner.coneOuterAngle = pa.coneOuterAngle;
          panner.coneOuterGain = pa.coneOuterGain;
          panner.distanceModel = pa.distanceModel;
          panner.maxDistance = pa.maxDistance;
          panner.refDistance = pa.refDistance;
          panner.rolloffFactor = pa.rolloffFactor;
          panner.panningModel = pa.panningModel;
        } else {
          // Make sure we have a position to setup the node with.
          if (!sound._pos) {
            sound._pos = self._pos || [0, 0, -0.5];
          } // Create a new panner node.


          setupPanner(sound, 'spatial');
        }
      }
    }

    return self;
  };
  /** Single Sound Methods **/

  /***************************************************************************/

  /**
   * Add new properties to the core Sound init.
   * @param  {Function} _super Core Sound init method.
   * @return {Sound}
   */


  Sound.prototype.init = function (_super) {
    return function () {
      var self = this;
      var parent = self._parent; // Setup user-defined default properties.

      self._orientation = parent._orientation;
      self._stereo = parent._stereo;
      self._pos = parent._pos;
      self._pannerAttr = parent._pannerAttr; // Complete initilization with howler.js core Sound's init function.

      _super.call(this); // If a stereo or position was specified, set it up.


      if (self._stereo) {
        parent.stereo(self._stereo);
      } else if (self._pos) {
        parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
      }
    };
  }(Sound.prototype.init);
  /**
   * Override the Sound.reset method to clean up properties from the spatial plugin.
   * @param  {Function} _super Sound reset method.
   * @return {Sound}
   */


  Sound.prototype.reset = function (_super) {
    return function () {
      var self = this;
      var parent = self._parent; // Reset all spatial plugin properties on this sound.

      self._orientation = parent._orientation;
      self._stereo = parent._stereo;
      self._pos = parent._pos;
      self._pannerAttr = parent._pannerAttr; // If a stereo or position was specified, set it up.

      if (self._stereo) {
        parent.stereo(self._stereo);
      } else if (self._pos) {
        parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
      } else if (self._panner) {
        // Disconnect the panner.
        self._panner.disconnect(0);

        self._panner = undefined;

        parent._refreshBuffer(self);
      } // Complete resetting of the sound.


      return _super.call(this);
    };
  }(Sound.prototype.reset);
  /** Helper Methods **/

  /***************************************************************************/

  /**
   * Create a new panner node and save it on the sound.
   * @param  {Sound} sound Specific sound to setup panning on.
   * @param {String} type Type of panner to create: 'stereo' or 'spatial'.
   */


  var setupPanner = function setupPanner(sound, type) {
    type = type || 'spatial'; // Create the new panner node.

    if (type === 'spatial') {
      sound._panner = Howler.ctx.createPanner();
      sound._panner.coneInnerAngle = sound._pannerAttr.coneInnerAngle;
      sound._panner.coneOuterAngle = sound._pannerAttr.coneOuterAngle;
      sound._panner.coneOuterGain = sound._pannerAttr.coneOuterGain;
      sound._panner.distanceModel = sound._pannerAttr.distanceModel;
      sound._panner.maxDistance = sound._pannerAttr.maxDistance;
      sound._panner.refDistance = sound._pannerAttr.refDistance;
      sound._panner.rolloffFactor = sound._pannerAttr.rolloffFactor;
      sound._panner.panningModel = sound._pannerAttr.panningModel;

      if (typeof sound._panner.positionX !== 'undefined') {
        sound._panner.positionX.setValueAtTime(sound._pos[0], Howler.ctx.currentTime);

        sound._panner.positionY.setValueAtTime(sound._pos[1], Howler.ctx.currentTime);

        sound._panner.positionZ.setValueAtTime(sound._pos[2], Howler.ctx.currentTime);
      } else {
        sound._panner.setPosition(sound._pos[0], sound._pos[1], sound._pos[2]);
      }

      if (typeof sound._panner.orientationX !== 'undefined') {
        sound._panner.orientationX.setValueAtTime(sound._orientation[0], Howler.ctx.currentTime);

        sound._panner.orientationY.setValueAtTime(sound._orientation[1], Howler.ctx.currentTime);

        sound._panner.orientationZ.setValueAtTime(sound._orientation[2], Howler.ctx.currentTime);
      } else {
        sound._panner.setOrientation(sound._orientation[0], sound._orientation[1], sound._orientation[2]);
      }
    } else {
      sound._panner = Howler.ctx.createStereoPanner();

      sound._panner.pan.setValueAtTime(sound._stereo, Howler.ctx.currentTime);
    }

    sound._panner.connect(sound._node); // Update the connections.


    if (!sound._paused) {
      sound._parent.pause(sound._id, true).play(sound._id, true);
    }
  };
})();
},{}],"pages/timer.js":[function(require,module,exports) {
"use strict";

require("../utils/visibility.js");

var _print = require("../utils/print.js");

require("../libs/howler.js");

var form = document.getElementById("timer");

form.onsubmit = function (event) {
  event.preventDefault();
  document.getElementById("startBtn").disabled = true;
  var formData = new FormData(form);
  var hours = formData.get("hours");
  var minutes = formData.get("minutes");
  var seconds = formData.get("seconds");

  if (!hours || !minutes || !seconds || minutes >= 60 || seconds >= 60 || hours < 0 || minutes < 0 || seconds < 0) {
    (0, _print.printErrorTimer)("Ошибка, некорректное значение времени");
    return;
  }

  var timer = setInterval(function () {
    seconds--;

    if (seconds == -1 & minutes != 0) {
      minutes--;
      seconds = 59;
    }

    if (seconds == 0 & minutes == 0) {
      hours--;
      seconds = 59;
      minutes = 59;
    }

    document.getElementById("stopBtn").onclick = function () {
      clearInterval(timer);
      document.getElementById("startBtn").disabled = false;
    };

    (0, _print.printTimer)({
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }, 1000);
  var sound = new Howl({
    src: ['/sounds/sound.mp3']
  });
  sound.play();
};
},{"../utils/visibility.js":"utils/visibility.js","../utils/print.js":"utils/print.js","../libs/howler.js":"libs/howler.js"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"img.png":[function(require,module,exports) {
module.exports = "/img.ff8e9d7c.png";
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

require("../pages/dateCalc.js");

require("../pages/timer.js");

require("../style.css");

var _img = _interopRequireDefault(require("../img.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_img.default);
},{"../pages/dateCalc.js":"pages/dateCalc.js","../pages/timer.js":"pages/timer.js","../style.css":"style.css","../img.png":"img.png"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49964" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map