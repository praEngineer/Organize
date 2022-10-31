/*!
  * Bootstrap v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _get = function get(_x11, _x12, _x13) { var _again = true; _function: while (_again) { var object = _x11, property = _x12, receiver = _x13; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x11 = parent; _x12 = property; _x13 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e();
})(undefined, function () {
  "use strict";var t = "transitionend",
      e = function e(t) {
    var e = t.getAttribute("data-bs-target");if (!e || "#" === e) {
      var _i3 = t.getAttribute("href");if (!_i3 || !_i3.includes("#") && !_i3.startsWith(".")) return null;_i3.includes("#") && !_i3.startsWith("#") && (_i3 = "#" + _i3.split("#")[1]), e = _i3 && "#" !== _i3 ? _i3.trim() : null;
    }return e;
  },
      i = function i(t) {
    var i = e(t);return i && document.querySelector(i) ? i : null;
  },
      n = function n(t) {
    var i = e(t);return i ? document.querySelector(i) : null;
  },
      s = function s(e) {
    e.dispatchEvent(new Event(t));
  },
      o = function o(t) {
    return !(!t || "object" != typeof t) && (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType);
  },
      r = function r(t) {
    return o(t) ? t.jquery ? t[0] : t : "string" == typeof t && t.length > 0 ? document.querySelector(t) : null;
  },
      a = function a(t) {
    if (!o(t) || 0 === t.getClientRects().length) return !1;var e = "visible" === getComputedStyle(t).getPropertyValue("visibility"),
        i = t.closest("details:not([open])");if (!i) return e;if (i !== t) {
      var _e2 = t.closest("summary");if (_e2 && _e2.parentNode !== i) return !1;if (null === _e2) return !1;
    }return e;
  },
      l = function l(t) {
    return !t || t.nodeType !== Node.ELEMENT_NODE || !!t.classList.contains("disabled") || (void 0 !== t.disabled ? t.disabled : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled"));
  },
      c = function c(_x14) {
    var _again2 = true;

    _function2: while (_again2) {
      var t = _x14;
      _again2 = false;
      if (!document.documentElement.attachShadow) return null;if ("function" == typeof t.getRootNode) {
        var _e3 = t.getRootNode();return _e3 instanceof ShadowRoot ? _e3 : null;
      }if (t instanceof ShadowRoot) {
        return t;
      } else {
        if (t.parentNode) {
          _x14 = t.parentNode;
          _again2 = true;
          _e3 = undefined;
          continue _function2;
        } else {
          return null;
        }
      }
    }
  },
      h = function h() {},
      d = function d(t) {
    t.offsetHeight;
  },
      u = function u() {
    return window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null;
  },
      f = [],
      p = function p() {
    return "rtl" === document.documentElement.dir;
  },
      g = function g(t) {
    var e;e = function () {
      var e = u();if (e) {
        (function () {
          var i = t.NAME,
              n = e.fn[i];e.fn[i] = t.jQueryInterface, e.fn[i].Constructor = t, e.fn[i].noConflict = function () {
            return e.fn[i] = n, t.jQueryInterface;
          };
        })();
      }
    }, "loading" === document.readyState ? (f.length || document.addEventListener("DOMContentLoaded", function () {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = f[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _t3 = _step.value;
          _t3();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }), f.push(e)) : e();
  },
      m = function m(t) {
    "function" == typeof t && t();
  },
      _ = function _(e, i) {
    var n = arguments.length <= 2 || arguments[2] === undefined ? !0 : arguments[2];
    if (!n) return void m(e);var o = (function (t) {
      if (!t) return 0;
      var _window$getComputedStyle = window.getComputedStyle(t);

      var e = _window$getComputedStyle.transitionDuration;
      var i = _window$getComputedStyle.transitionDelay;
      var n = Number.parseFloat(e),
          s = Number.parseFloat(i);return n || s ? (e = e.split(",")[0], i = i.split(",")[0], 1e3 * (Number.parseFloat(e) + Number.parseFloat(i))) : 0;
    })(i) + 5;var r = !1;var a = function a(_ref) {
      var n = _ref.target;
      n === i && (r = !0, i.removeEventListener(t, a), m(e));
    };i.addEventListener(t, a), setTimeout(function () {
      r || s(i);
    }, o);
  },
      b = function b(t, e, i, n) {
    var s = t.length;var o = t.indexOf(e);return -1 === o ? !i && n ? t[s - 1] : t[0] : (o += i ? 1 : -1, n && (o = (o + s) % s), t[Math.max(0, Math.min(o, s - 1))]);
  },
      v = /[^.]*(?=\..*)\.|.*/,
      y = /\..*/,
      w = /::\d+$/,
      A = {};var E = 1;var T = { mouseenter: "mouseover", mouseleave: "mouseout" },
      C = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);function O(t, e) {
    return e && e + "::" + E++ || t.uidEvent || E++;
  }function x(t) {
    var e = O(t);return t.uidEvent = e, A[e] = A[e] || {}, A[e];
  }function k(t, e) {
    var i = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    return Object.values(t).find(function (t) {
      return t.callable === e && t.delegationSelector === i;
    });
  }function L(t, e, i) {
    var n = "string" == typeof e,
        s = n ? i : e || i;var o = N(t);return C.has(o) || (o = t), [n, s, o];
  }function D(t, e, i, n, s) {
    if ("string" != typeof e || !t) return;
    var _L = L(e, i, n);

    var _L2 = _slicedToArray(_L, 3);

    var o = _L2[0];
    var r = _L2[1];
    var a = _L2[2];
    if (e in T) {
      var _t4 = function t(_t2) {
        return function (e) {
          if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget)) return _t2.call(this, e);
        };
      };r = _t4(r);
    }var l = x(t),
        c = l[a] || (l[a] = {}),
        h = k(c, r, o ? i : null);if (h) return void (h.oneOff = h.oneOff && s);var d = O(r, e.replace(v, "")),
        u = o ? (function (t, e, i) {
      return function n(s) {
        var o = t.querySelectorAll(e);for (var _r = s.target; _r && _r !== this; _r = _r.parentNode) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = o[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _a = _step2.value;
              if (_a === _r) return j(s, { delegateTarget: _r }), n.oneOff && P.off(t, s.type, e, i), i.apply(_r, [s]);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      };
    })(t, i, r) : (function (t, e) {
      return function i(n) {
        return j(n, { delegateTarget: t }), i.oneOff && P.off(t, n.type, e), e.apply(t, [n]);
      };
    })(t, r);u.delegationSelector = o ? i : null, u.callable = r, u.oneOff = s, u.uidEvent = d, c[d] = u, t.addEventListener(a, u, o);
  }function S(t, e, i, n, s) {
    var o = k(e[i], n, s);o && (t.removeEventListener(i, o, Boolean(s)), delete e[i][o.uidEvent]);
  }function I(t, e, i, n) {
    var s = e[i] || {};var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = Object.keys(s)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _o = _step3.value;
        if (_o.includes(n)) {
          var _n3 = s[_o];S(t, e, i, _n3.callable, _n3.delegationSelector);
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }function N(t) {
    return t = t.replace(y, ""), T[t] || t;
  }var P = { on: function on(t, e, i, n) {
      D(t, e, i, n, !1);
    }, one: function one(t, e, i, n) {
      D(t, e, i, n, !0);
    }, off: function off(t, e, i, n) {
      if ("string" != typeof e || !t) return;
      var _L3 = L(e, i, n);

      var _L32 = _slicedToArray(_L3, 3);

      var s = _L32[0];
      var o = _L32[1];
      var r = _L32[2];var a = r !== e;var l = x(t);var c = l[r] || {};var h = e.startsWith(".");if (void 0 === o) {
        if (h) {
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = Object.keys(l)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var _i4 = _step4.value;
              I(t, l, _i4, e.slice(1));
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                _iterator4["return"]();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = Object.keys(c)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _i5 = _step5.value;
            var _n4 = _i5.replace(w, "");if (!a || e.includes(_n4)) {
              var _e4 = c[_i5];S(t, l, r, _e4.callable, _e4.delegationSelector);
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
              _iterator5["return"]();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      } else {
        if (!Object.keys(c).length) return;S(t, l, r, o, s ? i : null);
      }
    }, trigger: function trigger(t, e, i) {
      if ("string" != typeof e || !t) return null;var n = u();var s = null,
          o = !0,
          r = !0,
          a = !1;e !== N(e) && n && (s = n.Event(e, i), n(t).trigger(s), o = !s.isPropagationStopped(), r = !s.isImmediatePropagationStopped(), a = s.isDefaultPrevented());var l = new Event(e, { bubbles: o, cancelable: !0 });return l = j(l, i), a && l.preventDefault(), r && t.dispatchEvent(l), l.defaultPrevented && s && s.preventDefault(), l;
    } };function j(t, e) {
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      var _loop = function () {
        var _step6$value = _slicedToArray(_step6.value, 2);

        var i = _step6$value[0];
        var n = _step6$value[1];
        try {
          t[i] = n;
        } catch (e) {
          Object.defineProperty(t, i, { configurable: !0, get: function get() {
              return n;
            } });
        }
      };

      for (var _iterator6 = Object.entries(e || {})[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
          _iterator6["return"]();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    return t;
  }var M = new Map(),
      H = { set: function set(t, e, i) {
      M.has(t) || M.set(t, new Map());var n = M.get(t);n.has(e) || 0 === n.size ? n.set(e, i) : console.error("Bootstrap doesn't allow more than one instance per element. Bound instance: " + Array.from(n.keys())[0] + ".");
    }, get: function get(t, e) {
      return M.has(t) && M.get(t).get(e) || null;
    }, remove: function remove(t, e) {
      if (!M.has(t)) return;var i = M.get(t);i["delete"](e), 0 === i.size && M["delete"](t);
    } };function $(t) {
    if ("true" === t) return !0;if ("false" === t) return !1;if (t === Number(t).toString()) return Number(t);if ("" === t || "null" === t) return null;if ("string" != typeof t) return t;try {
      return JSON.parse(decodeURIComponent(t));
    } catch (e) {
      return t;
    }
  }function W(t) {
    return t.replace(/[A-Z]/g, function (t) {
      return "-" + t.toLowerCase();
    });
  }var B = { setDataAttribute: function setDataAttribute(t, e, i) {
      t.setAttribute("data-bs-" + W(e), i);
    }, removeDataAttribute: function removeDataAttribute(t, e) {
      t.removeAttribute("data-bs-" + W(e));
    }, getDataAttributes: function getDataAttributes(t) {
      if (!t) return {};var e = {},
          i = Object.keys(t.dataset).filter(function (t) {
        return t.startsWith("bs") && !t.startsWith("bsConfig");
      });var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = i[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _n5 = _step7.value;
          var _i6 = _n5.replace(/^bs/, "");_i6 = _i6.charAt(0).toLowerCase() + _i6.slice(1, _i6.length), e[_i6] = $(t.dataset[_n5]);
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return e;
    }, getDataAttribute: function getDataAttribute(t, e) {
      return $(t.getAttribute("data-bs-" + W(e)));
    } };
  var F = (function () {
    function F() {
      _classCallCheck(this, F);
    }

    _createClass(F, [{
      key: "_getConfig",
      value: function _getConfig(t) {
        return t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
      }
    }, {
      key: "_configAfterMerge",
      value: function _configAfterMerge(t) {
        return t;
      }
    }, {
      key: "_mergeConfigObj",
      value: function _mergeConfigObj(t, e) {
        var i = o(e) ? B.getDataAttribute(e, "config") : {};return _extends({}, this.constructor.Default, "object" == typeof i ? i : {}, o(e) ? B.getDataAttributes(e) : {}, "object" == typeof t ? t : {});
      }
    }, {
      key: "_typeCheckConfig",
      value: function _typeCheckConfig(t) {
        var e = arguments.length <= 1 || arguments[1] === undefined ? this.constructor.DefaultType : arguments[1];
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = Object.keys(e)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var _n6 = _step8.value;
            var _s = e[_n6],
                _r2 = t[_n6],
                _a2 = o(_r2) ? "element" : null == (i = _r2) ? "" + i : Object.prototype.toString.call(i).match(/\s([a-z]+)/i)[1].toLowerCase();if (!new RegExp(_s).test(_a2)) throw new TypeError(this.constructor.NAME.toUpperCase() + ": Option \"" + _n6 + "\" provided type \"" + _a2 + "\" but expected type \"" + _s + "\".");
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
              _iterator8["return"]();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }

        var i;
      }
    }], [{
      key: "Default",
      get: function get() {
        return {};
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return {};
      }
    }, {
      key: "NAME",
      get: function get() {
        throw new Error('You have to implement the static method "NAME", for each component!');
      }
    }]);

    return F;
  })();

  var z = (function (_F) {
    _inherits(z, _F);

    function z(t, e) {
      _classCallCheck(this, z);

      _get(Object.getPrototypeOf(z.prototype), "constructor", this).call(this), (t = r(t)) && (this._element = t, this._config = this._getConfig(e), H.set(this._element, this.constructor.DATA_KEY, this));
    }

    _createClass(z, [{
      key: "dispose",
      value: function dispose() {
        H.remove(this._element, this.constructor.DATA_KEY), P.off(this._element, this.constructor.EVENT_KEY);var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = Object.getOwnPropertyNames(this)[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var _t5 = _step9.value;
            this[_t5] = null;
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9["return"]) {
              _iterator9["return"]();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }
      }
    }, {
      key: "_queueCallback",
      value: function _queueCallback(t, e) {
        var i = arguments.length <= 2 || arguments[2] === undefined ? !0 : arguments[2];
        _(t, e, i);
      }
    }, {
      key: "_getConfig",
      value: function _getConfig(t) {
        return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
      }
    }], [{
      key: "getInstance",
      value: function getInstance(t) {
        return H.get(r(t), this.DATA_KEY);
      }
    }, {
      key: "getOrCreateInstance",
      value: function getOrCreateInstance(t) {
        var e = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        return this.getInstance(t) || new this(t, "object" == typeof e ? e : null);
      }
    }, {
      key: "eventName",
      value: function eventName(t) {
        return "" + t + this.EVENT_KEY;
      }
    }, {
      key: "VERSION",
      get: function get() {
        return "5.2.2";
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return "bs." + this.NAME;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return "." + this.DATA_KEY;
      }
    }]);

    return z;
  })(F);

  var q = function q(t) {
    var e = arguments.length <= 1 || arguments[1] === undefined ? "hide" : arguments[1];
    var i = "click.dismiss" + t.EVENT_KEY,
        s = t.NAME;P.on(document, i, "[data-bs-dismiss=\"" + s + "\"]", function (i) {
      if ((["A", "AREA"].includes(this.tagName) && i.preventDefault(), l(this))) return;var o = n(this) || this.closest("." + s);t.getOrCreateInstance(o)[e]();
    });
  };
  var R = (function (_z) {
    _inherits(R, _z);

    function R() {
      _classCallCheck(this, R);

      _get(Object.getPrototypeOf(R.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(R, [{
      key: "close",
      value: function close() {
        var _this = this;

        if (P.trigger(this._element, "close.bs.alert").defaultPrevented) return;this._element.classList.remove("show");var t = this._element.classList.contains("fade");this._queueCallback(function () {
          return _this._destroyElement();
        }, this._element, t);
      }
    }, {
      key: "_destroyElement",
      value: function _destroyElement() {
        this._element.remove(), P.trigger(this._element, "closed.bs.alert"), this.dispose();
      }
    }], [{
      key: "jQueryInterface",
      value: function jQueryInterface(t) {
        return this.each(function () {
          var e = R.getOrCreateInstance(this);if ("string" == typeof t) {
            if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError("No method named \"" + t + "\"");e[t](this);
          }
        });
      }
    }, {
      key: "NAME",
      get: function get() {
        return "alert";
      }
    }]);

    return R;
  })(z);

  q(R, "close"), g(R);var V = '[data-bs-toggle="button"]';
  var K = (function (_z2) {
    _inherits(K, _z2);

    function K() {
      _classCallCheck(this, K);

      _get(Object.getPrototypeOf(K.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(K, [{
      key: "toggle",
      value: function toggle() {
        this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"));
      }
    }], [{
      key: "jQueryInterface",
      value: function jQueryInterface(t) {
        return this.each(function () {
          var e = K.getOrCreateInstance(this);"toggle" === t && e[t]();
        });
      }
    }, {
      key: "NAME",
      get: function get() {
        return "button";
      }
    }]);

    return K;
  })(z);

  P.on(document, "click.bs.button.data-api", V, function (t) {
    t.preventDefault();var e = t.target.closest(V);K.getOrCreateInstance(e).toggle();
  }), g(K);var Q = { find: function find(t) {
      var _ref2;

      var e = arguments.length <= 1 || arguments[1] === undefined ? document.documentElement : arguments[1];
      return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(Element.prototype.querySelectorAll.call(e, t)));
    }, findOne: function findOne(t) {
      var e = arguments.length <= 1 || arguments[1] === undefined ? document.documentElement : arguments[1];
      return Element.prototype.querySelector.call(e, t);
    }, children: function children(t, e) {
      var _ref3;

      return (_ref3 = []).concat.apply(_ref3, _toConsumableArray(t.children)).filter(function (t) {
        return t.matches(e);
      });
    }, parents: function parents(t, e) {
      var i = [];var n = t.parentNode.closest(e);for (; n;) i.push(n), n = n.parentNode.closest(e);return i;
    }, prev: function prev(t, e) {
      var i = t.previousElementSibling;for (; i;) {
        if (i.matches(e)) return [i];i = i.previousElementSibling;
      }return [];
    }, next: function next(t, e) {
      var i = t.nextElementSibling;for (; i;) {
        if (i.matches(e)) return [i];i = i.nextElementSibling;
      }return [];
    }, focusableChildren: function focusableChildren(t) {
      var e = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map(function (t) {
        return t + ":not([tabindex^=\"-\"])";
      }).join(",");return this.find(e, t).filter(function (t) {
        return !l(t) && a(t);
      });
    } },
      X = { endCallback: null, leftCallback: null, rightCallback: null },
      Y = { endCallback: "(function|null)", leftCallback: "(function|null)", rightCallback: "(function|null)" };
  var U = (function (_F2) {
    _inherits(U, _F2);

    function U(t, e) {
      _classCallCheck(this, U);

      _get(Object.getPrototypeOf(U.prototype), "constructor", this).call(this), this._element = t, t && U.isSupported() && (this._config = this._getConfig(e), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents());
    }

    _createClass(U, [{
      key: "dispose",
      value: function dispose() {
        P.off(this._element, ".bs.swipe");
      }
    }, {
      key: "_start",
      value: function _start(t) {
        this._supportPointerEvents ? this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX) : this._deltaX = t.touches[0].clientX;
      }
    }, {
      key: "_end",
      value: function _end(t) {
        this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), m(this._config.endCallback);
      }
    }, {
      key: "_move",
      value: function _move(t) {
        this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX;
      }
    }, {
      key: "_handleSwipe",
      value: function _handleSwipe() {
        var t = Math.abs(this._deltaX);if (t <= 40) return;var e = t / this._deltaX;this._deltaX = 0, e && m(e > 0 ? this._config.rightCallback : this._config.leftCallback);
      }
    }, {
      key: "_initEvents",
      value: function _initEvents() {
        var _this2 = this;

        this._supportPointerEvents ? (P.on(this._element, "pointerdown.bs.swipe", function (t) {
          return _this2._start(t);
        }), P.on(this._element, "pointerup.bs.swipe", function (t) {
          return _this2._end(t);
        }), this._element.classList.add("pointer-event")) : (P.on(this._element, "touchstart.bs.swipe", function (t) {
          return _this2._start(t);
        }), P.on(this._element, "touchmove.bs.swipe", function (t) {
          return _this2._move(t);
        }), P.on(this._element, "touchend.bs.swipe", function (t) {
          return _this2._end(t);
        }));
      }
    }, {
      key: "_eventIsPointerPenTouch",
      value: function _eventIsPointerPenTouch(t) {
        return this._supportPointerEvents && ("pen" === t.pointerType || "touch" === t.pointerType);
      }
    }], [{
      key: "isSupported",
      value: function isSupported() {
        return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
      }
    }, {
      key: "Default",
      get: function get() {
        return X;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return Y;
      }
    }, {
      key: "NAME",
      get: function get() {
        return "swipe";
      }
    }]);

    return U;
  })(F);

  var G = "next",
      J = "prev",
      Z = "left",
      tt = "right",
      et = "slid.bs.carousel",
      it = "carousel",
      nt = "active",
      st = { ArrowLeft: tt, ArrowRight: Z },
      ot = { interval: 5e3, keyboard: !0, pause: "hover", ride: !1, touch: !0, wrap: !0 },
      rt = { interval: "(number|boolean)", keyboard: "boolean", pause: "(string|boolean)", ride: "(boolean|string)", touch: "boolean", wrap: "boolean" };
  var at = (function (_z3) {
    _inherits(at, _z3);

    function at(t, e) {
      _classCallCheck(this, at);

      _get(Object.getPrototypeOf(at.prototype), "constructor", this).call(this, t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = Q.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride === it && this.cycle();
    }

    _createClass(at, [{
      key: "next",
      value: function next() {
        this._slide(G);
      }
    }, {
      key: "nextWhenVisible",
      value: function nextWhenVisible() {
        !document.hidden && a(this._element) && this.next();
      }
    }, {
      key: "prev",
      value: function prev() {
        this._slide(J);
      }
    }, {
      key: "pause",
      value: function pause() {
        this._isSliding && s(this._element), this._clearInterval();
      }
    }, {
      key: "cycle",
      value: function cycle() {
        var _this3 = this;

        this._clearInterval(), this._updateInterval(), this._interval = setInterval(function () {
          return _this3.nextWhenVisible();
        }, this._config.interval);
      }
    }, {
      key: "_maybeEnableCycle",
      value: function _maybeEnableCycle() {
        var _this4 = this;

        this._config.ride && (this._isSliding ? P.one(this._element, et, function () {
          return _this4.cycle();
        }) : this.cycle());
      }
    }, {
      key: "to",
      value: function to(t) {
        var _this5 = this;

        var e = this._getItems();if (t > e.length - 1 || t < 0) return;if (this._isSliding) return void P.one(this._element, et, function () {
          return _this5.to(t);
        });var i = this._getItemIndex(this._getActive());if (i === t) return;var n = t > i ? G : J;this._slide(n, e[t]);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this._swipeHelper && this._swipeHelper.dispose(), _get(Object.getPrototypeOf(at.prototype), "dispose", this).call(this);
      }
    }, {
      key: "_configAfterMerge",
      value: function _configAfterMerge(t) {
        return t.defaultInterval = t.interval, t;
      }
    }, {
      key: "_addEventListeners",
      value: function _addEventListeners() {
        var _this6 = this;

        this._config.keyboard && P.on(this._element, "keydown.bs.carousel", function (t) {
          return _this6._keydown(t);
        }), "hover" === this._config.pause && (P.on(this._element, "mouseenter.bs.carousel", function () {
          return _this6.pause();
        }), P.on(this._element, "mouseleave.bs.carousel", function () {
          return _this6._maybeEnableCycle();
        })), this._config.touch && U.isSupported() && this._addTouchEventListeners();
      }
    }, {
      key: "_addTouchEventListeners",
      value: function _addTouchEventListeners() {
        var _this7 = this;

        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = Q.find(".carousel-item img", this._element)[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var _t6 = _step10.value;
            P.on(_t6, "dragstart.bs.carousel", function (t) {
              return t.preventDefault();
            });
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10["return"]) {
              _iterator10["return"]();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }

        var t = { leftCallback: function leftCallback() {
            return _this7._slide(_this7._directionToOrder(Z));
          }, rightCallback: function rightCallback() {
            return _this7._slide(_this7._directionToOrder(tt));
          }, endCallback: function endCallback() {
            "hover" === _this7._config.pause && (_this7.pause(), _this7.touchTimeout && clearTimeout(_this7.touchTimeout), _this7.touchTimeout = setTimeout(function () {
              return _this7._maybeEnableCycle();
            }, 500 + _this7._config.interval));
          } };this._swipeHelper = new U(this._element, t);
      }
    }, {
      key: "_keydown",
      value: function _keydown(t) {
        if (/input|textarea/i.test(t.target.tagName)) return;var e = st[t.key];e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
      }
    }, {
      key: "_getItemIndex",
      value: function _getItemIndex(t) {
        return this._getItems().indexOf(t);
      }
    }, {
      key: "_setActiveIndicatorElement",
      value: function _setActiveIndicatorElement(t) {
        if (!this._indicatorsElement) return;var e = Q.findOne(".active", this._indicatorsElement);e.classList.remove(nt), e.removeAttribute("aria-current");var i = Q.findOne("[data-bs-slide-to=\"" + t + "\"]", this._indicatorsElement);i && (i.classList.add(nt), i.setAttribute("aria-current", "true"));
      }
    }, {
      key: "_updateInterval",
      value: function _updateInterval() {
        var t = this._activeElement || this._getActive();if (!t) return;var e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);this._config.interval = e || this._config.defaultInterval;
      }
    }, {
      key: "_slide",
      value: function _slide(t) {
        var _this8 = this;

        var e = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        if (this._isSliding) return;var i = this._getActive(),
            n = t === G,
            s = e || b(this._getItems(), i, n, this._config.wrap);if (s === i) return;var o = this._getItemIndex(s),
            r = function r(e) {
          return P.trigger(_this8._element, e, { relatedTarget: s, direction: _this8._orderToDirection(t), from: _this8._getItemIndex(i), to: o });
        };if (r("slide.bs.carousel").defaultPrevented) return;if (!i || !s) return;var a = Boolean(this._interval);this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = s;var l = n ? "carousel-item-start" : "carousel-item-end",
            c = n ? "carousel-item-next" : "carousel-item-prev";s.classList.add(c), d(s), i.classList.add(l), s.classList.add(l), this._queueCallback(function () {
          s.classList.remove(l, c), s.classList.add(nt), i.classList.remove(nt, c, l), _this8._isSliding = !1, r(et);
        }, i, this._isAnimated()), a && this.cycle();
      }
    }, {
      key: "_isAnimated",
      value: function _isAnimated() {
        return this._element.classList.contains("slide");
      }
    }, {
      key: "_getActive",
      value: function _getActive() {
        return Q.findOne(".active.carousel-item", this._element);
      }
    }, {
      key: "_getItems",
      value: function _getItems() {
        return Q.find(".carousel-item", this._element);
      }
    }, {
      key: "_clearInterval",
      value: function _clearInterval() {
        this._interval && (clearInterval(this._interval), this._interval = null);
      }
    }, {
      key: "_directionToOrder",
      value: function _directionToOrder(t) {
        return p() ? t === Z ? J : G : t === Z ? G : J;
      }
    }, {
      key: "_orderToDirection",
      value: function _orderToDirection(t) {
        return p() ? t === J ? Z : tt : t === J ? tt : Z;
      }
    }], [{
      key: "jQueryInterface",
      value: function jQueryInterface(t) {
        return this.each(function () {
          var e = at.getOrCreateInstance(this, t);if ("number" != typeof t) {
            if ("string" == typeof t) {
              if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError("No method named \"" + t + "\"");e[t]();
            }
          } else e.to(t);
        });
      }
    }, {
      key: "Default",
      get: function get() {
        return ot;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return rt;
      }
    }, {
      key: "NAME",
      get: function get() {
        return "carousel";
      }
    }]);

    return at;
  })(z);

  P.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", function (t) {
    var e = n(this);if (!e || !e.classList.contains(it)) return;t.preventDefault();var i = at.getOrCreateInstance(e),
        s = this.getAttribute("data-bs-slide-to");return s ? (i.to(s), void i._maybeEnableCycle()) : "next" === B.getDataAttribute(this, "slide") ? (i.next(), void i._maybeEnableCycle()) : (i.prev(), void i._maybeEnableCycle());
  }), P.on(window, "load.bs.carousel.data-api", function () {
    var t = Q.find('[data-bs-ride="carousel"]');var _iteratorNormalCompletion11 = true;
    var _didIteratorError11 = false;
    var _iteratorError11 = undefined;

    try {
      for (var _iterator11 = t[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
        var _e5 = _step11.value;
        at.getOrCreateInstance(_e5);
      }
    } catch (err) {
      _didIteratorError11 = true;
      _iteratorError11 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion11 && _iterator11["return"]) {
          _iterator11["return"]();
        }
      } finally {
        if (_didIteratorError11) {
          throw _iteratorError11;
        }
      }
    }
  }), g(at);var lt = "show",
      ct = "collapse",
      ht = "collapsing",
      dt = '[data-bs-toggle="collapse"]',
      ut = { parent: null, toggle: !0 },
      ft = { parent: "(null|element)", toggle: "boolean" };
  var pt = (function (_z4) {
    _inherits(pt, _z4);

    function pt(t, e) {
      var _this9 = this;

      _classCallCheck(this, pt);

      _get(Object.getPrototypeOf(pt.prototype), "constructor", this).call(this, t, e), this._isTransitioning = !1, this._triggerArray = [];var n = Q.find(dt);var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = n[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var _t7 = _step12.value;
          var _e6 = i(_t7),
              _n7 = Q.find(_e6).filter(function (t) {
            return t === _this9._element;
          });null !== _e6 && _n7.length && this._triggerArray.push(_t7);
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12["return"]) {
            _iterator12["return"]();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }

      this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
    }

    _createClass(pt, [{
      key: "toggle",
      value: function toggle() {
        this._isShown() ? this.hide() : this.show();
      }
    }, {
      key: "show",
      value: function show() {
        var _this10 = this;

        if (this._isTransitioning || this._isShown()) return;var t = [];if ((this._config.parent && (t = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter(function (t) {
          return t !== _this10._element;
        }).map(function (t) {
          return pt.getOrCreateInstance(t, { toggle: !1 });
        })), t.length && t[0]._isTransitioning)) return;if (P.trigger(this._element, "show.bs.collapse").defaultPrevented) return;var _iteratorNormalCompletion13 = true;
        var _didIteratorError13 = false;
        var _iteratorError13 = undefined;

        try {
          for (var _iterator13 = t[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var _e7 = _step13.value;
            _e7.hide();
          }
        } catch (err) {
          _didIteratorError13 = true;
          _iteratorError13 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion13 && _iterator13["return"]) {
              _iterator13["return"]();
            }
          } finally {
            if (_didIteratorError13) {
              throw _iteratorError13;
            }
          }
        }

        var e = this._getDimension();this._element.classList.remove(ct), this._element.classList.add(ht), this._element.style[e] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;var i = "scroll" + (e[0].toUpperCase() + e.slice(1));this._queueCallback(function () {
          _this10._isTransitioning = !1, _this10._element.classList.remove(ht), _this10._element.classList.add(ct, lt), _this10._element.style[e] = "", P.trigger(_this10._element, "shown.bs.collapse");
        }, this._element, !0), this._element.style[e] = this._element[i] + "px";
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this11 = this;

        if (this._isTransitioning || !this._isShown()) return;if (P.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;var t = this._getDimension();this._element.style[t] = this._element.getBoundingClientRect()[t] + "px", d(this._element), this._element.classList.add(ht), this._element.classList.remove(ct, lt);var _iteratorNormalCompletion14 = true;
        var _didIteratorError14 = false;
        var _iteratorError14 = undefined;

        try {
          for (var _iterator14 = this._triggerArray[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
            var _t8 = _step14.value;
            var _e8 = n(_t8);_e8 && !this._isShown(_e8) && this._addAriaAndCollapsedClass([_t8], !1);
          }
        } catch (err) {
          _didIteratorError14 = true;
          _iteratorError14 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion14 && _iterator14["return"]) {
              _iterator14["return"]();
            }
          } finally {
            if (_didIteratorError14) {
              throw _iteratorError14;
            }
          }
        }

        this._isTransitioning = !0, this._element.style[t] = "", this._queueCallback(function () {
          _this11._isTransitioning = !1, _this11._element.classList.remove(ht), _this11._element.classList.add(ct), P.trigger(_this11._element, "hidden.bs.collapse");
        }, this._element, !0);
      }
    }, {
      key: "_isShown",
      value: function _isShown() {
        var t = arguments.length <= 0 || arguments[0] === undefined ? this._element : arguments[0];
        return t.classList.contains(lt);
      }
    }, {
      key: "_configAfterMerge",
      value: function _configAfterMerge(t) {
        return t.toggle = Boolean(t.toggle), t.parent = r(t.parent), t;
      }
    }, {
      key: "_getDimension",
      value: function _getDimension() {
        return this._element.classList.contains("collapse-horizontal") ? "width" : "height";
      }
    }, {
      key: "_initializeChildren",
      value: function _initializeChildren() {
        if (!this._config.parent) return;var t = this._getFirstLevelChildren(dt);var _iteratorNormalCompletion15 = true;
        var _didIteratorError15 = false;
        var _iteratorError15 = undefined;

        try {
          for (var _iterator15 = t[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
            var _e9 = _step15.value;
            var _t9 = n(_e9);_t9 && this._addAriaAndCollapsedClass([_e9], this._isShown(_t9));
          }
        } catch (err) {
          _didIteratorError15 = true;
          _iteratorError15 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion15 && _iterator15["return"]) {
              _iterator15["return"]();
            }
          } finally {
            if (_didIteratorError15) {
              throw _iteratorError15;
            }
          }
        }
      }
    }, {
      key: "_getFirstLevelChildren",
      value: function _getFirstLevelChildren(t) {
        var e = Q.find(":scope .collapse .collapse", this._config.parent);return Q.find(t, this._config.parent).filter(function (t) {
          return !e.includes(t);
        });
      }
    }, {
      key: "_addAriaAndCollapsedClass",
      value: function _addAriaAndCollapsedClass(t, e) {
        if (t.length) {
          var _iteratorNormalCompletion16 = true;
          var _didIteratorError16 = false;
          var _iteratorError16 = undefined;

          try {
            for (var _iterator16 = t[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
              var _i7 = _step16.value;
              _i7.classList.toggle("collapsed", !e), _i7.setAttribute("aria-expanded", e);
            }
          } catch (err) {
            _didIteratorError16 = true;
            _iteratorError16 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion16 && _iterator16["return"]) {
                _iterator16["return"]();
              }
            } finally {
              if (_didIteratorError16) {
                throw _iteratorError16;
              }
            }
          }
        }
      }
    }], [{
      key: "jQueryInterface",
      value: function jQueryInterface(t) {
        var e = {};return "string" == typeof t && /show|hide/.test(t) && (e.toggle = !1), this.each(function () {
          var i = pt.getOrCreateInstance(this, e);if ("string" == typeof t) {
            if (void 0 === i[t]) throw new TypeError("No method named \"" + t + "\"");i[t]();
          }
        });
      }
    }, {
      key: "Default",
      get: function get() {
        return ut;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return ft;
      }
    }, {
      key: "NAME",
      get: function get() {
        return "collapse";
      }
    }]);

    return pt;
  })(z);

  P.on(document, "click.bs.collapse.data-api", dt, function (t) {
    ("A" === t.target.tagName || t.delegateTarget && "A" === t.delegateTarget.tagName) && t.preventDefault();var e = i(this),
        n = Q.find(e);var _iteratorNormalCompletion17 = true;
    var _didIteratorError17 = false;
    var _iteratorError17 = undefined;

    try {
      for (var _iterator17 = n[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
        var _t10 = _step17.value;
        pt.getOrCreateInstance(_t10, { toggle: !1 }).toggle();
      }
    } catch (err) {
      _didIteratorError17 = true;
      _iteratorError17 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion17 && _iterator17["return"]) {
          _iterator17["return"]();
        }
      } finally {
        if (_didIteratorError17) {
          throw _iteratorError17;
        }
      }
    }
  }), g(pt);var gt = "top",
      mt = "bottom",
      _t = "right",
      bt = "left",
      vt = "auto",
      yt = [gt, mt, _t, bt],
      wt = "start",
      At = "end",
      Et = "clippingParents",
      Tt = "viewport",
      Ct = "popper",
      Ot = "reference",
      xt = yt.reduce(function (t, e) {
    return t.concat([e + "-" + wt, e + "-" + At]);
  }, []),
      kt = [].concat(yt, [vt]).reduce(function (t, e) {
    return t.concat([e, e + "-" + wt, e + "-" + At]);
  }, []),
      Lt = "beforeRead",
      Dt = "read",
      St = "afterRead",
      It = "beforeMain",
      Nt = "main",
      Pt = "afterMain",
      jt = "beforeWrite",
      Mt = "write",
      Ht = "afterWrite",
      $t = [Lt, Dt, St, It, Nt, Pt, jt, Mt, Ht];function Wt(t) {
    return t ? (t.nodeName || "").toLowerCase() : null;
  }function Bt(t) {
    if (null == t) return window;if ("[object Window]" !== t.toString()) {
      var e = t.ownerDocument;return e && e.defaultView || window;
    }return t;
  }function Ft(t) {
    return t instanceof Bt(t).Element || t instanceof Element;
  }function zt(t) {
    return t instanceof Bt(t).HTMLElement || t instanceof HTMLElement;
  }function qt(t) {
    return "undefined" != typeof ShadowRoot && (t instanceof Bt(t).ShadowRoot || t instanceof ShadowRoot);
  }var Rt = { name: "applyStyles", enabled: !0, phase: "write", fn: function fn(t) {
      var e = t.state;Object.keys(e.elements).forEach(function (t) {
        var i = e.styles[t] || {},
            n = e.attributes[t] || {},
            s = e.elements[t];zt(s) && Wt(s) && (Object.assign(s.style, i), Object.keys(n).forEach(function (t) {
          var e = n[t];!1 === e ? s.removeAttribute(t) : s.setAttribute(t, !0 === e ? "" : e);
        }));
      });
    }, effect: function effect(t) {
      var e = t.state,
          i = { popper: { position: e.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };return Object.assign(e.elements.popper.style, i.popper), e.styles = i, e.elements.arrow && Object.assign(e.elements.arrow.style, i.arrow), function () {
        Object.keys(e.elements).forEach(function (t) {
          var n = e.elements[t],
              s = e.attributes[t] || {},
              o = Object.keys(e.styles.hasOwnProperty(t) ? e.styles[t] : i[t]).reduce(function (t, e) {
            return t[e] = "", t;
          }, {});zt(n) && Wt(n) && (Object.assign(n.style, o), Object.keys(s).forEach(function (t) {
            n.removeAttribute(t);
          }));
        });
      };
    }, requires: ["computeStyles"] };function Vt(t) {
    return t.split("-")[0];
  }var Kt = Math.max,
      Qt = Math.min,
      Xt = Math.round;function Yt() {
    var t = navigator.userAgentData;return null != t && t.brands ? t.brands.map(function (t) {
      return t.brand + "/" + t.version;
    }).join(" ") : navigator.userAgent;
  }function Ut() {
    return !/^((?!chrome|android).)*safari/i.test(Yt());
  }function Gt(t, e, i) {
    void 0 === e && (e = !1), void 0 === i && (i = !1);var n = t.getBoundingClientRect(),
        s = 1,
        o = 1;e && zt(t) && (s = t.offsetWidth > 0 && Xt(n.width) / t.offsetWidth || 1, o = t.offsetHeight > 0 && Xt(n.height) / t.offsetHeight || 1);var r = (Ft(t) ? Bt(t) : window).visualViewport,
        a = !Ut() && i,
        l = (n.left + (a && r ? r.offsetLeft : 0)) / s,
        c = (n.top + (a && r ? r.offsetTop : 0)) / o,
        h = n.width / s,
        d = n.height / o;return { width: h, height: d, top: c, right: l + h, bottom: c + d, left: l, x: l, y: c };
  }function Jt(t) {
    var e = Gt(t),
        i = t.offsetWidth,
        n = t.offsetHeight;return Math.abs(e.width - i) <= 1 && (i = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), { x: t.offsetLeft, y: t.offsetTop, width: i, height: n };
  }function Zt(t, e) {
    var i = e.getRootNode && e.getRootNode();if (t.contains(e)) return !0;if (i && qt(i)) {
      var n = e;do {
        if (n && t.isSameNode(n)) return !0;n = n.parentNode || n.host;
      } while (n);
    }return !1;
  }function te(t) {
    return Bt(t).getComputedStyle(t);
  }function ee(t) {
    return ["table", "td", "th"].indexOf(Wt(t)) >= 0;
  }function ie(t) {
    return ((Ft(t) ? t.ownerDocument : t.document) || window.document).documentElement;
  }function ne(t) {
    return "html" === Wt(t) ? t : t.assignedSlot || t.parentNode || (qt(t) ? t.host : null) || ie(t);
  }function se(t) {
    return zt(t) && "fixed" !== te(t).position ? t.offsetParent : null;
  }function oe(t) {
    for (var e = Bt(t), i = se(t); i && ee(i) && "static" === te(i).position;) i = se(i);return i && ("html" === Wt(i) || "body" === Wt(i) && "static" === te(i).position) ? e : i || (function (t) {
      var e = /firefox/i.test(Yt());if (/Trident/i.test(Yt()) && zt(t) && "fixed" === te(t).position) return null;var i = ne(t);for (qt(i) && (i = i.host); zt(i) && ["html", "body"].indexOf(Wt(i)) < 0;) {
        var n = te(i);if ("none" !== n.transform || "none" !== n.perspective || "paint" === n.contain || -1 !== ["transform", "perspective"].indexOf(n.willChange) || e && "filter" === n.willChange || e && n.filter && "none" !== n.filter) return i;i = i.parentNode;
      }return null;
    })(t) || e;
  }function re(t) {
    return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
  }function ae(t, e, i) {
    return Kt(t, Qt(e, i));
  }function le(t) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, t);
  }function ce(t, e) {
    return e.reduce(function (e, i) {
      return e[i] = t, e;
    }, {});
  }var he = { name: "arrow", enabled: !0, phase: "main", fn: function fn(t) {
      var e,
          i = t.state,
          n = t.name,
          s = t.options,
          o = i.elements.arrow,
          r = i.modifiersData.popperOffsets,
          a = Vt(i.placement),
          l = re(a),
          c = [bt, _t].indexOf(a) >= 0 ? "height" : "width";if (o && r) {
        var h = (function (t, e) {
          return le("number" != typeof (t = "function" == typeof t ? t(Object.assign({}, e.rects, { placement: e.placement })) : t) ? t : ce(t, yt));
        })(s.padding, i),
            d = Jt(o),
            u = "y" === l ? gt : bt,
            f = "y" === l ? mt : _t,
            p = i.rects.reference[c] + i.rects.reference[l] - r[l] - i.rects.popper[c],
            g = r[l] - i.rects.reference[l],
            m = oe(o),
            _ = m ? "y" === l ? m.clientHeight || 0 : m.clientWidth || 0 : 0,
            b = p / 2 - g / 2,
            v = h[u],
            y = _ - d[c] - h[f],
            w = _ / 2 - d[c] / 2 + b,
            A = ae(v, w, y),
            E = l;i.modifiersData[n] = ((e = {})[E] = A, e.centerOffset = A - w, e);
      }
    }, effect: function effect(t) {
      var e = t.state,
          i = t.options.element,
          n = void 0 === i ? "[data-popper-arrow]" : i;null != n && ("string" != typeof n || (n = e.elements.popper.querySelector(n))) && Zt(e.elements.popper, n) && (e.elements.arrow = n);
    }, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };function de(t) {
    return t.split("-")[1];
  }var ue = { top: "auto", right: "auto", bottom: "auto", left: "auto" };function fe(t) {
    var e,
        i = t.popper,
        n = t.popperRect,
        s = t.placement,
        o = t.variation,
        r = t.offsets,
        a = t.position,
        l = t.gpuAcceleration,
        c = t.adaptive,
        h = t.roundOffsets,
        d = t.isFixed,
        u = r.x,
        f = void 0 === u ? 0 : u,
        p = r.y,
        g = void 0 === p ? 0 : p,
        m = "function" == typeof h ? h({ x: f, y: g }) : { x: f, y: g };f = m.x, g = m.y;var _ = r.hasOwnProperty("x"),
        b = r.hasOwnProperty("y"),
        v = bt,
        y = gt,
        w = window;if (c) {
      var A = oe(i),
          E = "clientHeight",
          T = "clientWidth";A === Bt(i) && "static" !== te(A = ie(i)).position && "absolute" === a && (E = "scrollHeight", T = "scrollWidth"), (s === gt || (s === bt || s === _t) && o === At) && (y = mt, g -= (d && A === w && w.visualViewport ? w.visualViewport.height : A[E]) - n.height, g *= l ? 1 : -1), s !== bt && (s !== gt && s !== mt || o !== At) || (v = _t, f -= (d && A === w && w.visualViewport ? w.visualViewport.width : A[T]) - n.width, f *= l ? 1 : -1);
    }var C,
        O = Object.assign({ position: a }, c && ue),
        x = !0 === h ? (function (t) {
      var e = t.x,
          i = t.y,
          n = window.devicePixelRatio || 1;return { x: Xt(e * n) / n || 0, y: Xt(i * n) / n || 0 };
    })({ x: f, y: g }) : { x: f, y: g };return f = x.x, g = x.y, l ? Object.assign({}, O, ((C = {})[y] = b ? "0" : "", C[v] = _ ? "0" : "", C.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + g + "px)" : "translate3d(" + f + "px, " + g + "px, 0)", C)) : Object.assign({}, O, ((e = {})[y] = b ? g + "px" : "", e[v] = _ ? f + "px" : "", e.transform = "", e));
  }var pe = { name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: function fn(t) {
      var e = t.state,
          i = t.options,
          n = i.gpuAcceleration,
          s = void 0 === n || n,
          o = i.adaptive,
          r = void 0 === o || o,
          a = i.roundOffsets,
          l = void 0 === a || a,
          c = { placement: Vt(e.placement), variation: de(e.placement), popper: e.elements.popper, popperRect: e.rects.popper, gpuAcceleration: s, isFixed: "fixed" === e.options.strategy };null != e.modifiersData.popperOffsets && (e.styles.popper = Object.assign({}, e.styles.popper, fe(Object.assign({}, c, { offsets: e.modifiersData.popperOffsets, position: e.options.strategy, adaptive: r, roundOffsets: l })))), null != e.modifiersData.arrow && (e.styles.arrow = Object.assign({}, e.styles.arrow, fe(Object.assign({}, c, { offsets: e.modifiersData.arrow, position: "absolute", adaptive: !1, roundOffsets: l })))), e.attributes.popper = Object.assign({}, e.attributes.popper, { "data-popper-placement": e.placement });
    }, data: {} };var ge = { passive: !0 };var me = { name: "eventListeners", enabled: !0, phase: "write", fn: function fn() {}, effect: function effect(t) {
      var e = t.state,
          i = t.instance,
          n = t.options,
          s = n.scroll,
          o = void 0 === s || s,
          r = n.resize,
          a = void 0 === r || r,
          l = Bt(e.elements.popper),
          c = [].concat(e.scrollParents.reference, e.scrollParents.popper);return o && c.forEach(function (t) {
        t.addEventListener("scroll", i.update, ge);
      }), a && l.addEventListener("resize", i.update, ge), function () {
        o && c.forEach(function (t) {
          t.removeEventListener("scroll", i.update, ge);
        }), a && l.removeEventListener("resize", i.update, ge);
      };
    }, data: {} };var _e = { left: "right", right: "left", bottom: "top", top: "bottom" };function be(t) {
    return t.replace(/left|right|bottom|top/g, function (t) {
      return _e[t];
    });
  }var ve = { start: "end", end: "start" };function ye(t) {
    return t.replace(/start|end/g, function (t) {
      return ve[t];
    });
  }function we(t) {
    var e = Bt(t);return { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
  }function Ae(t) {
    return Gt(ie(t)).left + we(t).scrollLeft;
  }function Ee(t) {
    var e = te(t),
        i = e.overflow,
        n = e.overflowX,
        s = e.overflowY;return (/auto|scroll|overlay|hidden/.test(i + s + n)
    );
  }function Te(_x15) {
    var _again3 = true;

    _function3: while (_again3) {
      var t = _x15;
      _again3 = false;
      if (["html", "body", "#document"].indexOf(Wt(t)) >= 0) {
        return t.ownerDocument.body;
      } else {
        if (zt(t) && Ee(t)) {
          return t;
        } else {
          _x15 = ne(t);
          _again3 = true;
          continue _function3;
        }
      }
    }
  }function Ce(t, e) {
    var i;void 0 === e && (e = []);var n = Te(t),
        s = n === (null == (i = t.ownerDocument) ? void 0 : i.body),
        o = Bt(n),
        r = s ? [o].concat(o.visualViewport || [], Ee(n) ? n : []) : n,
        a = e.concat(r);return s ? a : a.concat(Ce(ne(r)));
  }function Oe(t) {
    return Object.assign({}, t, { left: t.x, top: t.y, right: t.x + t.width, bottom: t.y + t.height });
  }function xe(t, e, i) {
    return e === Tt ? Oe((function (t, e) {
      var i = Bt(t),
          n = ie(t),
          s = i.visualViewport,
          o = n.clientWidth,
          r = n.clientHeight,
          a = 0,
          l = 0;if (s) {
        o = s.width, r = s.height;var c = Ut();(c || !c && "fixed" === e) && (a = s.offsetLeft, l = s.offsetTop);
      }return { width: o, height: r, x: a + Ae(t), y: l };
    })(t, i)) : Ft(e) ? (function (t, e) {
      var i = Gt(t, !1, "fixed" === e);return i.top = i.top + t.clientTop, i.left = i.left + t.clientLeft, i.bottom = i.top + t.clientHeight, i.right = i.left + t.clientWidth, i.width = t.clientWidth, i.height = t.clientHeight, i.x = i.left, i.y = i.top, i;
    })(e, i) : Oe((function (t) {
      var e,
          i = ie(t),
          n = we(t),
          s = null == (e = t.ownerDocument) ? void 0 : e.body,
          o = Kt(i.scrollWidth, i.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0),
          r = Kt(i.scrollHeight, i.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0),
          a = -n.scrollLeft + Ae(t),
          l = -n.scrollTop;return "rtl" === te(s || i).direction && (a += Kt(i.clientWidth, s ? s.clientWidth : 0) - o), { width: o, height: r, x: a, y: l };
    })(ie(t)));
  }function ke(t) {
    var e,
        i = t.reference,
        n = t.element,
        s = t.placement,
        o = s ? Vt(s) : null,
        r = s ? de(s) : null,
        a = i.x + i.width / 2 - n.width / 2,
        l = i.y + i.height / 2 - n.height / 2;switch (o) {case gt:
        e = { x: a, y: i.y - n.height };break;case mt:
        e = { x: a, y: i.y + i.height };break;case _t:
        e = { x: i.x + i.width, y: l };break;case bt:
        e = { x: i.x - n.width, y: l };break;default:
        e = { x: i.x, y: i.y };}var c = o ? re(o) : null;if (null != c) {
      var h = "y" === c ? "height" : "width";switch (r) {case wt:
          e[c] = e[c] - (i[h] / 2 - n[h] / 2);break;case At:
          e[c] = e[c] + (i[h] / 2 - n[h] / 2);}
    }return e;
  }function Le(t, e) {
    void 0 === e && (e = {});var i = e,
        n = i.placement,
        s = void 0 === n ? t.placement : n,
        o = i.strategy,
        r = void 0 === o ? t.strategy : o,
        a = i.boundary,
        l = void 0 === a ? Et : a,
        c = i.rootBoundary,
        h = void 0 === c ? Tt : c,
        d = i.elementContext,
        u = void 0 === d ? Ct : d,
        f = i.altBoundary,
        p = void 0 !== f && f,
        g = i.padding,
        m = void 0 === g ? 0 : g,
        _ = le("number" != typeof m ? m : ce(m, yt)),
        b = u === Ct ? Ot : Ct,
        v = t.rects.popper,
        y = t.elements[p ? b : u],
        w = (function (t, e, i, n) {
      var s = "clippingParents" === e ? (function (t) {
        var e = Ce(ne(t)),
            i = ["absolute", "fixed"].indexOf(te(t).position) >= 0 && zt(t) ? oe(t) : t;return Ft(i) ? e.filter(function (t) {
          return Ft(t) && Zt(t, i) && "body" !== Wt(t);
        }) : [];
      })(t) : [].concat(e),
          o = [].concat(s, [i]),
          r = o[0],
          a = o.reduce(function (e, i) {
        var s = xe(t, i, n);return e.top = Kt(s.top, e.top), e.right = Qt(s.right, e.right), e.bottom = Qt(s.bottom, e.bottom), e.left = Kt(s.left, e.left), e;
      }, xe(t, r, n));return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
    })(Ft(y) ? y : y.contextElement || ie(t.elements.popper), l, h, r),
        A = Gt(t.elements.reference),
        E = ke({ reference: A, element: v, strategy: "absolute", placement: s }),
        T = Oe(Object.assign({}, v, E)),
        C = u === Ct ? T : A,
        O = { top: w.top - C.top + _.top, bottom: C.bottom - w.bottom + _.bottom, left: w.left - C.left + _.left, right: C.right - w.right + _.right },
        x = t.modifiersData.offset;if (u === Ct && x) {
      var k = x[s];Object.keys(O).forEach(function (t) {
        var e = [_t, mt].indexOf(t) >= 0 ? 1 : -1,
            i = [gt, mt].indexOf(t) >= 0 ? "y" : "x";O[t] += k[i] * e;
      });
    }return O;
  }function De(t, e) {
    void 0 === e && (e = {});var i = e,
        n = i.placement,
        s = i.boundary,
        o = i.rootBoundary,
        r = i.padding,
        a = i.flipVariations,
        l = i.allowedAutoPlacements,
        c = void 0 === l ? kt : l,
        h = de(n),
        d = h ? a ? xt : xt.filter(function (t) {
      return de(t) === h;
    }) : yt,
        u = d.filter(function (t) {
      return c.indexOf(t) >= 0;
    });0 === u.length && (u = d);var f = u.reduce(function (e, i) {
      return e[i] = Le(t, { placement: i, boundary: s, rootBoundary: o, padding: r })[Vt(i)], e;
    }, {});return Object.keys(f).sort(function (t, e) {
      return f[t] - f[e];
    });
  }var Se = { name: "flip", enabled: !0, phase: "main", fn: function fn(t) {
      var e = t.state,
          i = t.options,
          n = t.name;if (!e.modifiersData[n]._skip) {
        for (var s = i.mainAxis, o = void 0 === s || s, r = i.altAxis, a = void 0 === r || r, l = i.fallbackPlacements, c = i.padding, h = i.boundary, d = i.rootBoundary, u = i.altBoundary, f = i.flipVariations, p = void 0 === f || f, g = i.allowedAutoPlacements, m = e.options.placement, _ = Vt(m), b = l || (_ !== m && p ? (function (t) {
          if (Vt(t) === vt) return [];var e = be(t);return [ye(t), e, ye(e)];
        })(m) : [be(m)]), v = [m].concat(b).reduce(function (t, i) {
          return t.concat(Vt(i) === vt ? De(e, { placement: i, boundary: h, rootBoundary: d, padding: c, flipVariations: p, allowedAutoPlacements: g }) : i);
        }, []), y = e.rects.reference, w = e.rects.popper, A = new Map(), E = !0, T = v[0], C = 0; C < v.length; C++) {
          var O = v[C],
              x = Vt(O),
              k = de(O) === wt,
              L = [gt, mt].indexOf(x) >= 0,
              D = L ? "width" : "height",
              S = Le(e, { placement: O, boundary: h, rootBoundary: d, altBoundary: u, padding: c }),
              I = L ? k ? _t : bt : k ? mt : gt;y[D] > w[D] && (I = be(I));var N = be(I),
              P = [];if ((o && P.push(S[x] <= 0), a && P.push(S[I] <= 0, S[N] <= 0), P.every(function (t) {
            return t;
          }))) {
            T = O, E = !1;break;
          }A.set(O, P);
        }if (E) for (var j = function j(t) {
          var e = v.find(function (e) {
            var i = A.get(e);if (i) return i.slice(0, t).every(function (t) {
              return t;
            });
          });if (e) return T = e, "break";
        }, M = p ? 3 : 1; M > 0 && "break" !== j(M); M--);e.placement !== T && (e.modifiersData[n]._skip = !0, e.placement = T, e.reset = !0);
      }
    }, requiresIfExists: ["offset"], data: { _skip: !1 } };function Ie(t, e, i) {
    return void 0 === i && (i = { x: 0, y: 0 }), { top: t.top - e.height - i.y, right: t.right - e.width + i.x, bottom: t.bottom - e.height + i.y, left: t.left - e.width - i.x };
  }function Ne(t) {
    return [gt, _t, mt, bt].some(function (e) {
      return t[e] >= 0;
    });
  }var Pe = { name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: function fn(t) {
      var e = t.state,
          i = t.name,
          n = e.rects.reference,
          s = e.rects.popper,
          o = e.modifiersData.preventOverflow,
          r = Le(e, { elementContext: "reference" }),
          a = Le(e, { altBoundary: !0 }),
          l = Ie(r, n),
          c = Ie(a, s, o),
          h = Ne(l),
          d = Ne(c);e.modifiersData[i] = { referenceClippingOffsets: l, popperEscapeOffsets: c, isReferenceHidden: h, hasPopperEscaped: d }, e.attributes.popper = Object.assign({}, e.attributes.popper, { "data-popper-reference-hidden": h, "data-popper-escaped": d });
    } },
      je = { name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: function fn(t) {
      var e = t.state,
          i = t.options,
          n = t.name,
          s = i.offset,
          o = void 0 === s ? [0, 0] : s,
          r = kt.reduce(function (t, i) {
        return t[i] = (function (t, e, i) {
          var n = Vt(t),
              s = [bt, gt].indexOf(n) >= 0 ? -1 : 1,
              o = "function" == typeof i ? i(Object.assign({}, e, { placement: t })) : i,
              r = o[0],
              a = o[1];return r = r || 0, a = (a || 0) * s, [bt, _t].indexOf(n) >= 0 ? { x: a, y: r } : { x: r, y: a };
        })(i, e.rects, o), t;
      }, {}),
          a = r[e.placement],
          l = a.x,
          c = a.y;null != e.modifiersData.popperOffsets && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += c), e.modifiersData[n] = r;
    } },
      Me = { name: "popperOffsets", enabled: !0, phase: "read", fn: function fn(t) {
      var e = t.state,
          i = t.name;e.modifiersData[i] = ke({ reference: e.rects.reference, element: e.rects.popper, strategy: "absolute", placement: e.placement });
    }, data: {} },
      He = { name: "preventOverflow", enabled: !0, phase: "main", fn: function fn(t) {
      var e = t.state,
          i = t.options,
          n = t.name,
          s = i.mainAxis,
          o = void 0 === s || s,
          r = i.altAxis,
          a = void 0 !== r && r,
          l = i.boundary,
          c = i.rootBoundary,
          h = i.altBoundary,
          d = i.padding,
          u = i.tether,
          f = void 0 === u || u,
          p = i.tetherOffset,
          g = void 0 === p ? 0 : p,
          m = Le(e, { boundary: l, rootBoundary: c, padding: d, altBoundary: h }),
          _ = Vt(e.placement),
          b = de(e.placement),
          v = !b,
          y = re(_),
          w = "x" === y ? "y" : "x",
          A = e.modifiersData.popperOffsets,
          E = e.rects.reference,
          T = e.rects.popper,
          C = "function" == typeof g ? g(Object.assign({}, e.rects, { placement: e.placement })) : g,
          O = "number" == typeof C ? { mainAxis: C, altAxis: C } : Object.assign({ mainAxis: 0, altAxis: 0 }, C),
          x = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null,
          k = { x: 0, y: 0 };if (A) {
        if (o) {
          var L,
              D = "y" === y ? gt : bt,
              S = "y" === y ? mt : _t,
              I = "y" === y ? "height" : "width",
              N = A[y],
              P = N + m[D],
              j = N - m[S],
              M = f ? -T[I] / 2 : 0,
              H = b === wt ? E[I] : T[I],
              $ = b === wt ? -T[I] : -E[I],
              W = e.elements.arrow,
              B = f && W ? Jt(W) : { width: 0, height: 0 },
              F = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : { top: 0, right: 0, bottom: 0, left: 0 },
              z = F[D],
              q = F[S],
              R = ae(0, E[I], B[I]),
              V = v ? E[I] / 2 - M - R - z - O.mainAxis : H - R - z - O.mainAxis,
              K = v ? -E[I] / 2 + M + R + q + O.mainAxis : $ + R + q + O.mainAxis,
              Q = e.elements.arrow && oe(e.elements.arrow),
              X = Q ? "y" === y ? Q.clientTop || 0 : Q.clientLeft || 0 : 0,
              Y = null != (L = null == x ? void 0 : x[y]) ? L : 0,
              U = N + K - Y,
              G = ae(f ? Qt(P, N + V - Y - X) : P, N, f ? Kt(j, U) : j);A[y] = G, k[y] = G - N;
        }if (a) {
          var J,
              Z = "x" === y ? gt : bt,
              tt = "x" === y ? mt : _t,
              et = A[w],
              it = "y" === w ? "height" : "width",
              nt = et + m[Z],
              st = et - m[tt],
              ot = -1 !== [gt, bt].indexOf(_),
              rt = null != (J = null == x ? void 0 : x[w]) ? J : 0,
              at = ot ? nt : et - E[it] - T[it] - rt + O.altAxis,
              lt = ot ? et + E[it] + T[it] - rt - O.altAxis : st,
              ct = f && ot ? (function (t, e, i) {
            var n = ae(t, e, i);return n > i ? i : n;
          })(at, et, lt) : ae(f ? at : nt, et, f ? lt : st);A[w] = ct, k[w] = ct - et;
        }e.modifiersData[n] = k;
      }
    }, requiresIfExists: ["offset"] };function $e(t, e, i) {
    void 0 === i && (i = !1);var n,
        s,
        o = zt(e),
        r = zt(e) && (function (t) {
      var e = t.getBoundingClientRect(),
          i = Xt(e.width) / t.offsetWidth || 1,
          n = Xt(e.height) / t.offsetHeight || 1;return 1 !== i || 1 !== n;
    })(e),
        a = ie(e),
        l = Gt(t, r, i),
        c = { scrollLeft: 0, scrollTop: 0 },
        h = { x: 0, y: 0 };return (o || !o && !i) && (("body" !== Wt(e) || Ee(a)) && (c = (n = e) !== Bt(n) && zt(n) ? { scrollLeft: (s = n).scrollLeft, scrollTop: s.scrollTop } : we(n)), zt(e) ? ((h = Gt(e, !0)).x += e.clientLeft, h.y += e.clientTop) : a && (h.x = Ae(a))), { x: l.left + c.scrollLeft - h.x, y: l.top + c.scrollTop - h.y, width: l.width, height: l.height };
  }function We(t) {
    var e = new Map(),
        i = new Set(),
        n = [];function s(t) {
      i.add(t.name), [].concat(t.requires || [], t.requiresIfExists || []).forEach(function (t) {
        if (!i.has(t)) {
          var n = e.get(t);n && s(n);
        }
      }), n.push(t);
    }return t.forEach(function (t) {
      e.set(t.name, t);
    }), t.forEach(function (t) {
      i.has(t.name) || s(t);
    }), n;
  }var Be = { placement: "bottom", modifiers: [], strategy: "absolute" };function Fe() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];return !e.some(function (t) {
      return !(t && "function" == typeof t.getBoundingClientRect);
    });
  }function ze(t) {
    void 0 === t && (t = {});var e = t,
        i = e.defaultModifiers,
        n = void 0 === i ? [] : i,
        s = e.defaultOptions,
        o = void 0 === s ? Be : s;return function (t, e, i) {
      void 0 === i && (i = o);var s,
          r,
          a = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Be, o), modifiersData: {}, elements: { reference: t, popper: e }, attributes: {}, styles: {} },
          l = [],
          c = !1,
          h = { state: a, setOptions: function setOptions(i) {
          var s = "function" == typeof i ? i(a.options) : i;d(), a.options = Object.assign({}, o, a.options, s), a.scrollParents = { reference: Ft(t) ? Ce(t) : t.contextElement ? Ce(t.contextElement) : [], popper: Ce(e) };var r,
              c,
              u = (function (t) {
            var e = We(t);return $t.reduce(function (t, i) {
              return t.concat(e.filter(function (t) {
                return t.phase === i;
              }));
            }, []);
          })((r = [].concat(n, a.options.modifiers), c = r.reduce(function (t, e) {
            var i = t[e.name];return t[e.name] = i ? Object.assign({}, i, e, { options: Object.assign({}, i.options, e.options), data: Object.assign({}, i.data, e.data) }) : e, t;
          }, {}), Object.keys(c).map(function (t) {
            return c[t];
          })));return a.orderedModifiers = u.filter(function (t) {
            return t.enabled;
          }), a.orderedModifiers.forEach(function (t) {
            var e = t.name,
                i = t.options,
                n = void 0 === i ? {} : i,
                s = t.effect;if ("function" == typeof s) {
              var o = s({ state: a, name: e, instance: h, options: n });l.push(o || function () {});
            }
          }), h.update();
        }, forceUpdate: function forceUpdate() {
          if (!c) {
            var t = a.elements,
                e = t.reference,
                i = t.popper;if (Fe(e, i)) {
              a.rects = { reference: $e(e, oe(i), "fixed" === a.options.strategy), popper: Jt(i) }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach(function (t) {
                return a.modifiersData[t.name] = Object.assign({}, t.data);
              });for (var n = 0; n < a.orderedModifiers.length; n++) if (!0 !== a.reset) {
                var s = a.orderedModifiers[n],
                    o = s.fn,
                    r = s.options,
                    l = void 0 === r ? {} : r,
                    d = s.name;"function" == typeof o && (a = o({ state: a, options: l, name: d, instance: h }) || a);
              } else a.reset = !1, n = -1;
            }
          }
        }, update: (s = function () {
          return new Promise(function (t) {
            h.forceUpdate(), t(a);
          });
        }, function () {
          return r || (r = new Promise(function (t) {
            Promise.resolve().then(function () {
              r = void 0, t(s());
            });
          })), r;
        }), destroy: function destroy() {
          d(), c = !0;
        } };if (!Fe(t, e)) return h;function d() {
        l.forEach(function (t) {
          return t();
        }), l = [];
      }return h.setOptions(i).then(function (t) {
        !c && i.onFirstUpdate && i.onFirstUpdate(t);
      }), h;
    };
  }var qe = ze(),
      Re = ze({ defaultModifiers: [me, Me, pe, Rt] }),
      Ve = ze({ defaultModifiers: [me, Me, pe, Rt, je, Se, He, he, Pe] });var Ke = Object.freeze(Object.defineProperty({ __proto__: null, popperGenerator: ze, detectOverflow: Le, createPopperBase: qe, createPopper: Ve, createPopperLite: Re, top: gt, bottom: mt, right: _t, left: bt, auto: vt, basePlacements: yt, start: wt, end: At, clippingParents: Et, viewport: Tt, popper: Ct, reference: Ot, variationPlacements: xt, placements: kt, beforeRead: Lt, read: Dt, afterRead: St, beforeMain: It, main: Nt, afterMain: Pt, beforeWrite: jt, write: Mt, afterWrite: Ht, modifierPhases: $t, applyStyles: Rt, arrow: he, computeStyles: pe, eventListeners: me, flip: Se, hide: Pe, offset: je, popperOffsets: Me, preventOverflow: He }, Symbol.toStringTag, { value: "Module" })),
      Qe = "dropdown",
      Xe = "ArrowUp",
      Ye = "ArrowDown",
      Ue = "click.bs.dropdown.data-api",
      Ge = "keydown.bs.dropdown.data-api",
      Je = "show",
      Ze = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
      ti = Ze + ".show",
      ei = ".dropdown-menu",
      ii = p() ? "top-end" : "top-start",
      ni = p() ? "top-start" : "top-end",
      si = p() ? "bottom-end" : "bottom-start",
      oi = p() ? "bottom-start" : "bottom-end",
      ri = p() ? "left-start" : "right-start",
      ai = p() ? "right-start" : "left-start",
      li = { autoClose: !0, boundary: "clippingParents", display: "dynamic", offset: [0, 2], popperConfig: null, reference: "toggle" },
      ci = { autoClose: "(boolean|string)", boundary: "(string|element)", display: "string", offset: "(array|string|function)", popperConfig: "(null|object|function)", reference: "(string|element|object)" };
  var hi = (function (_z5) {
    _inherits(hi, _z5);

    function hi(t, e) {
      _classCallCheck(this, hi);

      _get(Object.getPrototypeOf(hi.prototype), "constructor", this).call(this, t, e), this._popper = null, this._parent = this._element.parentNode, this._menu = Q.next(this._element, ei)[0] || Q.prev(this._element, ei)[0] || Q.findOne(ei, this._parent), this._inNavbar = this._detectNavbar();
    }

    _createClass(hi, [{
      key: "toggle",
      value: function toggle() {
        return this._isShown() ? this.hide() : this.show();
      }
    }, {
      key: "show",
      value: function show() {
        if (l(this._element) || this._isShown()) return;var t = { relatedTarget: this._element };if (!P.trigger(this._element, "show.bs.dropdown", t).defaultPrevented) {
          if ((this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav"))) {
            var _iteratorNormalCompletion18 = true;
            var _didIteratorError18 = false;
            var _iteratorError18 = undefined;

            try {
              for (var _iterator18 = (_ref4 = []).concat.apply(_ref4, _toConsumableArray(document.body.children))[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                var _ref4;

                var _t11 = _step18.value;
                P.on(_t11, "mouseover", h);
              }
            } catch (err) {
              _didIteratorError18 = true;
              _iteratorError18 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion18 && _iterator18["return"]) {
                  _iterator18["return"]();
                }
              } finally {
                if (_didIteratorError18) {
                  throw _iteratorError18;
                }
              }
            }
          }this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Je), this._element.classList.add(Je), P.trigger(this._element, "shown.bs.dropdown", t);
        }
      }
    }, {
      key: "hide",
      value: function hide() {
        if (l(this._element) || !this._isShown()) return;var t = { relatedTarget: this._element };this._completeHide(t);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this._popper && this._popper.destroy(), _get(Object.getPrototypeOf(hi.prototype), "dispose", this).call(this);
      }
    }, {
      key: "update",
      value: function update() {
        this._inNavbar = this._detectNavbar(), this._popper && this._popper.update();
      }
    }, {
      key: "_completeHide",
      value: function _completeHide(t) {
        if (!P.trigger(this._element, "hide.bs.dropdown", t).defaultPrevented) {
          if ("ontouchstart" in document.documentElement) {
            var _iteratorNormalCompletion19 = true;
            var _didIteratorError19 = false;
            var _iteratorError19 = undefined;

            try {
              for (var _iterator19 = (_ref5 = []).concat.apply(_ref5, _toConsumableArray(document.body.children))[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                var _ref5;

                var _t12 = _step19.value;
                P.off(_t12, "mouseover", h);
              }
            } catch (err) {
              _didIteratorError19 = true;
              _iteratorError19 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion19 && _iterator19["return"]) {
                  _iterator19["return"]();
                }
              } finally {
                if (_didIteratorError19) {
                  throw _iteratorError19;
                }
              }
            }
          }this._popper && this._popper.destroy(), this._menu.classList.remove(Je), this._element.classList.remove(Je), this._element.setAttribute("aria-expanded", "false"), B.removeDataAttribute(this._menu, "popper"), P.trigger(this._element, "hidden.bs.dropdown", t);
        }
      }
    }, {
      key: "_getConfig",
      value: function _getConfig(t) {
        if ("object" == typeof (t = _get(Object.getPrototypeOf(hi.prototype), "_getConfig", this).call(this, t)).reference && !o(t.reference) && "function" != typeof t.reference.getBoundingClientRect) throw new TypeError(Qe.toUpperCase() + ": Option \"reference\" provided type \"object\" without a required \"getBoundingClientRect\" method.");return t;
      }
    }, {
      key: "_createPopper",
      value: function _createPopper() {
        if (void 0 === Ke) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");var t = this._element;"parent" === this._config.reference ? t = this._parent : o(this._config.reference) ? t = r(this._config.reference) : "object" == typeof this._config.reference && (t = this._config.reference);var e = this._getPopperConfig();this._popper = Ve(t, this._menu, e);
      }
    }, {
      key: "_isShown",
      value: function _isShown() {
        return this._menu.classList.contains(Je);
      }
    }, {
      key: "_getPlacement",
      value: function _getPlacement() {
        var t = this._parent;if (t.classList.contains("dropend")) return ri;if (t.classList.contains("dropstart")) return ai;if (t.classList.contains("dropup-center")) return "top";if (t.classList.contains("dropdown-center")) return "bottom";var e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();return t.classList.contains("dropup") ? e ? ni : ii : e ? oi : si;
      }
    }, {
      key: "_detectNavbar",
      value: function _detectNavbar() {
        return null !== this._element.closest(".navbar");
      }
    }, {
      key: "_getOffset",
      value: function _getOffset() {
        var _this12 = this;

        var t = this._config.offset;
        return "string" == typeof t ? t.split(",").map(function (t) {
          return Number.parseInt(t, 10);
        }) : "function" == typeof t ? function (e) {
          return t(e, _this12._element);
        } : t;
      }
    }, {
      key: "_getPopperConfig",
      value: function _getPopperConfig() {
        var t = { placement: this._getPlacement(), modifiers: [{ name: "preventOverflow", options: { boundary: this._config.boundary } }, { name: "offset", options: { offset: this._getOffset() } }] };return (this._inNavbar || "static" === this._config.display) && (B.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{ name: "applyStyles", enabled: !1 }]), _extends({}, t, "function" == typeof this._config.popperConfig ? this._config.popperConfig(t) : this._config.popperConfig);
      }
    }, {
      key: "_selectMenuItem",
      value: function _selectMenuItem(_ref6) {
        var t = _ref6.key;
        var e = _ref6.target;
        var i = Q.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter(function (t) {
          return a(t);
        });i.length && b(i, e, t === Ye, !i.includes(e)).focus();
      }
    }], [{
      key: "jQueryInterface",
      value: function jQueryInterface(t) {
        return this.each(function () {
          var e = hi.getOrCreateInstance(this, t);if ("string" == typeof t) {
            if (void 0 === e[t]) throw new TypeError("No method named \"" + t + "\"");e[t]();
          }
        });
      }
    }, {
      key: "clearMenus",
      value: function clearMenus(t) {
        if (2 === t.button || "keyup" === t.type && "Tab" !== t.key) return;var e = Q.find(ti);var _iteratorNormalCompletion20 = true;
        var _didIteratorError20 = false;
        var _iteratorError20 = undefined;

        try {
          for (var _iterator20 = e[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
            var _i8 = _step20.value;
            var _e10 = hi.getInstance(_i8);if (!_e10 || !1 === _e10._config.autoClose) continue;var _n8 = t.composedPath(),
                _s2 = _n8.includes(_e10._menu);if (_n8.includes(_e10._element) || "inside" === _e10._config.autoClose && !_s2 || "outside" === _e10._config.autoClose && _s2) continue;if (_e10._menu.contains(t.target) && ("keyup" === t.type && "Tab" === t.key || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;var _o2 = { relatedTarget: _e10._element };"click" === t.type && (_o2.clickEvent = t), _e10._completeHide(_o2);
          }
        } catch (err) {
          _didIteratorError20 = true;
          _iteratorError20 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion20 && _iterator20["return"]) {
              _iterator20["return"]();
            }
          } finally {
            if (_didIteratorError20) {
              throw _iteratorError20;
            }
          }
        }
      }
    }, {
      key: "dataApiKeydownHandler",
      value: function dataApiKeydownHandler(t) {
        var e = /input|textarea/i.test(t.target.tagName),
            i = "Escape" === t.key,
            n = [Xe, Ye].includes(t.key);if (!n && !i) return;if (e && !i) return;t.preventDefault();var s = this.matches(Ze) ? this : Q.prev(this, Ze)[0] || Q.next(this, Ze)[0] || Q.findOne(Ze, t.delegateTarget.parentNode),
            o = hi.getOrCreateInstance(s);if (n) return t.stopPropagation(), o.show(), void o._selectMenuItem(t);o._isShown() && (t.stopPropagation(), o.hide(), s.focus());
      }
    }, {
      key: "Default",
      get: function get() {
        return li;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return ci;
      }
    }, {
      key: "NAME",
      get: function get() {
        return Qe;
      }
    }]);

    return hi;
  })(z);

  P.on(document, Ge, Ze, hi.dataApiKeydownHandler), P.on(document, Ge, ei, hi.dataApiKeydownHandler), P.on(document, Ue, hi.clearMenus), P.on(document, "keyup.bs.dropdown.data-api", hi.clearMenus), P.on(document, Ue, Ze, function (t) {
    t.preventDefault(), hi.getOrCreateInstance(this).toggle();
  }), g(hi);var di = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
      ui = ".sticky-top",
      fi = "padding-right",
      pi = "margin-right";
  var gi = (function () {
    function gi() {
      _classCallCheck(this, gi);

      this._element = document.body;
    }

    _createClass(gi, [{
      key: "getWidth",
      value: function getWidth() {
        var t = document.documentElement.clientWidth;return Math.abs(window.innerWidth - t);
      }
    }, {
      key: "hide",
      value: function hide() {
        var t = this.getWidth();this._disableOverFlow(), this._setElementAttributes(this._element, fi, function (e) {
          return e + t;
        }), this._setElementAttributes(di, fi, function (e) {
          return e + t;
        }), this._setElementAttributes(ui, pi, function (e) {
          return e - t;
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, fi), this._resetElementAttributes(di, fi), this._resetElementAttributes(ui, pi);
      }
    }, {
      key: "isOverflowing",
      value: function isOverflowing() {
        return this.getWidth() > 0;
      }
    }, {
      key: "_disableOverFlow",
      value: function _disableOverFlow() {
        this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
      }
    }, {
      key: "_setElementAttributes",
      value: function _setElementAttributes(t, e, i) {
        var _this13 = this;

        var n = this.getWidth();this._applyManipulationCallback(t, function (t) {
          if (t !== _this13._element && window.innerWidth > t.clientWidth + n) return;_this13._saveInitialAttribute(t, e);var s = window.getComputedStyle(t).getPropertyValue(e);t.style.setProperty(e, i(Number.parseFloat(s)) + "px");
        });
      }
    }, {
      key: "_saveInitialAttribute",
      value: function _saveInitialAttribute(t, e) {
        var i = t.style.getPropertyValue(e);i && B.setDataAttribute(t, e, i);
      }
    }, {
      key: "_resetElementAttributes",
      value: function _resetElementAttributes(t, e) {
        this._applyManipulationCallback(t, function (t) {
          var i = B.getDataAttribute(t, e);null !== i ? (B.removeDataAttribute(t, e), t.style.setProperty(e, i)) : t.style.removeProperty(e);
        });
      }
    }, {
      key: "_applyManipulationCallback",
      value: function _applyManipulationCallback(t, e) {
        if (o(t)) e(t);else {
          var _iteratorNormalCompletion21 = true;
          var _didIteratorError21 = false;
          var _iteratorError21 = undefined;

          try {
            for (var _iterator21 = Q.find(t, this._element)[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
              var _i9 = _step21.value;
              e(_i9);
            }
          } catch (err) {
            _didIteratorError21 = true;
            _iteratorError21 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion21 && _iterator21["return"]) {
                _iterator21["return"]();
              }
            } finally {
              if (_didIteratorError21) {
                throw _iteratorError21;
              }
            }
          }
        }
      }
    }]);

    return gi;
  })();

  var mi = "show",
      _i = "mousedown.bs.backdrop",
      bi = { className: "modal-backdrop", clickCallback: null, isAnimated: !1, isVisible: !0, rootElement: "body" },
      vi = { className: "string", clickCallback: "(function|null)", isAnimated: "boolean", isVisible: "boolean", rootElement: "(element|string)" };
  var yi = (function (_F3) {
    _inherits(yi, _F3);

    function yi(t) {
      _classCallCheck(this, yi);

      _get(Object.getPrototypeOf(yi.prototype), "constructor", this).call(this), this._config = this._getConfig(t), this._isAppended = !1, this._element = null;
    }

    _createClass(yi, [{
      key: "show",
      value: function show(t) {
        if (!this._config.isVisible) return void m(t);this._append();var e = this._getElement();this._config.isAnimated && d(e), e.classList.add(mi), this._emulateAnimation(function () {
          m(t);
        });
      }
    }, {
      key: "hide",
      value: function hide(t) {
        var _this14 = this;

        this._config.isVisible ? (this._getElement().classList.remove(mi), this._emulateAnimation(function () {
          _this14.dispose(), m(t);
        })) : m(t);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this._isAppended && (P.off(this._element, _i), this._element.remove(), this._isAppended = !1);
      }
    }, {
      key: "_getElement",
      value: function _getElement() {
        if (!this._element) {
          var _t13 = document.createElement("div");_t13.className = this._config.className, this._config.isAnimated && _t13.classList.add("fade"), this._element = _t13;
        }return this._element;
      }
    }, {
      key: "_configAfterMerge",
      value: function _configAfterMerge(t) {
        return t.rootElement = r(t.rootElement), t;
      }
    }, {
      key: "_append",
      value: function _append() {
        var _this15 = this;

        if (this._isAppended) return;var t = this._getElement();this._config.rootElement.append(t), P.on(t, _i, function () {
          m(_this15._config.clickCallback);
        }), this._isAppended = !0;
      }
    }, {
      key: "_emulateAnimation",
      value: function _emulateAnimation(t) {
        _(t, this._getElement(), this._config.isAnimated);
      }
    }], [{
      key: "Default",
      get: function get() {
        return bi;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return vi;
      }
    }, {
      key: "NAME",
      get: function get() {
        return "backdrop";
      }
    }]);

    return yi;
  })(F);

  var wi = ".bs.focustrap",
      Ai = "backward",
      Ei = { autofocus: !0, trapElement: null },
      Ti = { autofocus: "boolean", trapElement: "element" };
  var Ci = (function (_F4) {
    _inherits(Ci, _F4);

    function Ci(t) {
      _classCallCheck(this, Ci);

      _get(Object.getPrototypeOf(Ci.prototype), "constructor", this).call(this), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null;
    }

    _createClass(Ci, [{
      key: "activate",
      value: function activate() {
        var _this16 = this;

        this._isActive || (this._config.autofocus && this._config.trapElement.focus(), P.off(document, wi), P.on(document, "focusin.bs.focustrap", function (t) {
          return _this16._handleFocusin(t);
        }), P.on(document, "keydown.tab.bs.focustrap", function (t) {
          return _this16._handleKeydown(t);
        }), this._isActive = !0);
      }
    }, {
      key: "deactivate",
      value: function deactivate() {
        this._isActive && (this._isActive = !1, P.off(document, wi));
      }
    }, {
      key: "_handleFocusin",
      value: function _handleFocusin(t) {
        var e = this._config.trapElement;
        if (t.target === document || t.target === e || e.contains(t.target)) return;var i = Q.focusableChildren(e);0 === i.length ? e.focus() : this._lastTabNavDirection === Ai ? i[i.length - 1].focus() : i[0].focus();
      }
    }, {
      key: "_handleKeydown",
      value: function _handleKeydown(t) {
        "Tab" === t.key && (this._lastTabNavDirection = t.shiftKey ? Ai : "forward");
      }
    }], [{
      key: "Default",
      get: function get() {
        return Ei;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return Ti;
      }
    }, {
      key: "NAME",
      get: function get() {
        return "focustrap";
      }
    }]);

    return Ci;
  })(F);

  var Oi = "hidden.bs.modal",
      xi = "show.bs.modal",
      ki = "modal-open",
      Li = "show",
      Di = "modal-static",
      Si = { backdrop: !0, focus: !0, keyboard: !0 },
      Ii = { backdrop: "(boolean|string)", focus: "boolean", keyboard: "boolean" };
  var Ni = (function (_z6) {
    _inherits(Ni, _z6);

    function Ni(t, e) {
      _classCallCheck(this, Ni);

      _get(Object.getPrototypeOf(Ni.prototype), "constructor", this).call(this, t, e), this._dialog = Q.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new gi(), this._addEventListeners();
    }

    _createClass(Ni, [{
      key: "toggle",
      value: function toggle(t) {
        return this._isShown ? this.hide() : this.show(t);
      }
    }, {
      key: "show",
      value: function show(t) {
        var _this17 = this;

        this._isShown || this._isTransitioning || P.trigger(this._element, xi, { relatedTarget: t }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(ki), this._adjustDialog(), this._backdrop.show(function () {
          return _this17._showElement(t);
        }));
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this18 = this;

        this._isShown && !this._isTransitioning && (P.trigger(this._element, "hide.bs.modal").defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Li), this._queueCallback(function () {
          return _this18._hideModal();
        }, this._element, this._isAnimated())));
      }
    }, {
      key: "dispose",
      value: function dispose() {
        var _arr = [window, this._dialog];
        for (var _i2 = 0; _i2 < _arr.length; _i2++) {
          var _t14 = _arr[_i2];P.off(_t14, ".bs.modal");
        }this._backdrop.dispose(), this._focustrap.deactivate(), _get(Object.getPrototypeOf(Ni.prototype), "dispose", this).call(this);
      }
    }, {
      key: "handleUpdate",
      value: function handleUpdate() {
        this._adjustDialog();
      }
    }, {
      key: "_initializeBackDrop",
      value: function _initializeBackDrop() {
        return new yi({ isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated() });
      }
    }, {
      key: "_initializeFocusTrap",
      value: function _initializeFocusTrap() {
        return new Ci({ trapElement: this._element });
      }
    }, {
      key: "_showElement",
      value: function _showElement(t) {
        var _this19 = this;

        document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;var e = Q.findOne(".modal-body", this._dialog);e && (e.scrollTop = 0), d(this._element), this._element.classList.add(Li), this._queueCallback(function () {
          _this19._config.focus && _this19._focustrap.activate(), _this19._isTransitioning = !1, P.trigger(_this19._element, "shown.bs.modal", { relatedTarget: t });
        }, this._dialog, this._isAnimated());
      }
    }, {
      key: "_addEventListeners",
      value: function _addEventListeners() {
        var _this20 = this;

        P.on(this._element, "keydown.dismiss.bs.modal", function (t) {
          if ("Escape" === t.key) return _this20._config.keyboard ? (t.preventDefault(), void _this20.hide()) : void _this20._triggerBackdropTransition();
        }), P.on(window, "resize.bs.modal", function () {
          _this20._isShown && !_this20._isTransitioning && _this20._adjustDialog();
        }), P.on(this._element, "mousedown.dismiss.bs.modal", function (t) {
          P.one(_this20._element, "click.dismiss.bs.modal", function (e) {
            _this20._element === t.target && _this20._element === e.target && ("static" !== _this20._config.backdrop ? _this20._config.backdrop && _this20.hide() : _this20._triggerBackdropTransition());
          });
        });
      }
    }, {
      key: "_hideModal",
      value: function _hideModal() {
        var _this21 = this;

        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(function () {
          document.body.classList.remove(ki), _this21._resetAdjustments(), _this21._scrollBar.reset(), P.trigger(_this21._element, Oi);
        });
      }
    }, {
      key: "_isAnimated",
      value: function _isAnimated() {
        return this._element.classList.contains("fade");
      }
    }, {
      key: "_triggerBackdropTransition",
      value: function _triggerBackdropTransition() {
        var _this22 = this;

        if (P.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) return;var t = this._element.scrollHeight > document.documentElement.clientHeight,
            e = this._element.style.overflowY;"hidden" === e || this._element.classList.contains(Di) || (t || (this._element.style.overflowY = "hidden"), this._element.classList.add(Di), this._queueCallback(function () {
          _this22._element.classList.remove(Di), _this22._queueCallback(function () {
            _this22._element.style.overflowY = e;
          }, _this22._dialog);
        }, this._dialog), this._element.focus());
      }
    }, {
      key: "_adjustDialog",
      value: function _adjustDialog() {
        var t = this._element.scrollHeight > document.documentElement.clientHeight,
            e = this._scrollBar.getWidth(),
            i = e > 0;if (i && !t) {
          var _t15 = p() ? "paddingLeft" : "paddingRight";this._element.style[_t15] = e + "px";
        }if (!i && t) {
          var _t16 = p() ? "paddingRight" : "paddingLeft";this._element.style[_t16] = e + "px";
        }
      }
    }, {
      key: "_resetAdjustments",
      value: function _resetAdjustments() {
        this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
      }
    }], [{
      key: "jQueryInterface",
      value: function jQueryInterface(t, e) {
        return this.each(function () {
          var i = Ni.getOrCreateInstance(this, t);if ("string" == typeof t) {
            if (void 0 === i[t]) throw new TypeError("No method named \"" + t + "\"");i[t](e);
          }
        });
      }
    }, {
      key: "Default",
      get: function get() {
        return Si;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return Ii;
      }
    }, {
      key: "NAME",
      get: function get() {
        return "modal";
      }
    }]);

    return Ni;
  })(z);

  P.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', function (t) {
    var _this23 = this;

    var e = n(this);["A", "AREA"].includes(this.tagName) && t.preventDefault(), P.one(e, xi, function (t) {
      t.defaultPrevented || P.one(e, Oi, function () {
        a(_this23) && _this23.focus();
      });
    });var i = Q.findOne(".modal.show");i && Ni.getInstance(i).hide(), Ni.getOrCreateInstance(e).toggle(this);
  }), q(Ni), g(Ni);var Pi = "show",
      ji = "showing",
      Mi = "hiding",
      Hi = ".offcanvas.show",
      $i = "hidePrevented.bs.offcanvas",
      Wi = "hidden.bs.offcanvas",
      Bi = { backdrop: !0, keyboard: !0, scroll: !1 },
      Fi = { backdrop: "(boolean|string)", keyboard: "boolean", scroll: "boolean" };
  var zi = (function (_z7) {
    _inherits(zi, _z7);

    function zi(t, e) {
      _classCallCheck(this, zi);

      _get(Object.getPrototypeOf(zi.prototype), "constructor", this).call(this, t, e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
    }

    _createClass(zi, [{
      key: "toggle",
      value: function toggle(t) {
        return this._isShown ? this.hide() : this.show(t);
      }
    }, {
      key: "show",
      value: function show(t) {
        var _this24 = this;

        this._isShown || P.trigger(this._element, "show.bs.offcanvas", { relatedTarget: t }).defaultPrevented || (this._isShown = !0, this._backdrop.show(), this._config.scroll || new gi().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(ji), this._queueCallback(function () {
          _this24._config.scroll && !_this24._config.backdrop || _this24._focustrap.activate(), _this24._element.classList.add(Pi), _this24._element.classList.remove(ji), P.trigger(_this24._element, "shown.bs.offcanvas", { relatedTarget: t });
        }, this._element, !0));
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this25 = this;

        this._isShown && (P.trigger(this._element, "hide.bs.offcanvas").defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(Mi), this._backdrop.hide(), this._queueCallback(function () {
          _this25._element.classList.remove(Pi, Mi), _this25._element.removeAttribute("aria-modal"), _this25._element.removeAttribute("role"), _this25._config.scroll || new gi().reset(), P.trigger(_this25._element, Wi);
        }, this._element, !0)));
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this._backdrop.dispose(), this._focustrap.deactivate(), _get(Object.getPrototypeOf(zi.prototype), "dispose", this).call(this);
      }
    }, {
      key: "_initializeBackDrop",
      value: function _initializeBackDrop() {
        var _this26 = this;

        var t = Boolean(this._config.backdrop);return new yi({ className: "offcanvas-backdrop", isVisible: t, isAnimated: !0, rootElement: this._element.parentNode, clickCallback: t ? function () {
            "static" !== _this26._config.backdrop ? _this26.hide() : P.trigger(_this26._element, $i);
          } : null });
      }
    }, {
      key: "_initializeFocusTrap",
      value: function _initializeFocusTrap() {
        return new Ci({ trapElement: this._element });
      }
    }, {
      key: "_addEventListeners",
      value: function _addEventListeners() {
        var _this27 = this;

        P.on(this._element, "keydown.dismiss.bs.offcanvas", function (t) {
          "Escape" === t.key && (_this27._config.keyboard ? _this27.hide() : P.trigger(_this27._element, $i));
        });
      }
    }], [{
      key: "jQueryInterface",
      value: function jQueryInterface(t) {
        return this.each(function () {
          var e = zi.getOrCreateInstance(this, t);if ("string" == typeof t) {
            if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError("No method named \"" + t + "\"");e[t](this);
          }
        });
      }
    }, {
      key: "Default",
      get: function get() {
        return Bi;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return Fi;
      }
    }, {
      key: "NAME",
      get: function get() {
        return "offcanvas";
      }
    }]);

    return zi;
  })(z);

  P.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', function (t) {
    var _this28 = this;

    var e = n(this);if ((["A", "AREA"].includes(this.tagName) && t.preventDefault(), l(this))) return;P.one(e, Wi, function () {
      a(_this28) && _this28.focus();
    });var i = Q.findOne(Hi);i && i !== e && zi.getInstance(i).hide(), zi.getOrCreateInstance(e).toggle(this);
  }), P.on(window, "load.bs.offcanvas.data-api", function () {
    var _iteratorNormalCompletion22 = true;
    var _didIteratorError22 = false;
    var _iteratorError22 = undefined;

    try {
      for (var _iterator22 = Q.find(Hi)[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
        var _t17 = _step22.value;
        zi.getOrCreateInstance(_t17).show();
      }
    } catch (err) {
      _didIteratorError22 = true;
      _iteratorError22 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion22 && _iterator22["return"]) {
          _iterator22["return"]();
        }
      } finally {
        if (_didIteratorError22) {
          throw _iteratorError22;
        }
      }
    }
  }), P.on(window, "resize.bs.offcanvas", function () {
    var _iteratorNormalCompletion23 = true;
    var _didIteratorError23 = false;
    var _iteratorError23 = undefined;

    try {
      for (var _iterator23 = Q.find("[aria-modal][class*=show][class*=offcanvas-]")[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
        var _t18 = _step23.value;
        "fixed" !== getComputedStyle(_t18).position && zi.getOrCreateInstance(_t18).hide();
      }
    } catch (err) {
      _didIteratorError23 = true;
      _iteratorError23 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion23 && _iterator23["return"]) {
          _iterator23["return"]();
        }
      } finally {
        if (_didIteratorError23) {
          throw _iteratorError23;
        }
      }
    }
  }), q(zi), g(zi);var qi = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
      Ri = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
      Vi = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
      Ki = function Ki(t, e) {
    var i = t.nodeName.toLowerCase();return e.includes(i) ? !qi.has(i) || Boolean(Ri.test(t.nodeValue) || Vi.test(t.nodeValue)) : e.filter(function (t) {
      return t instanceof RegExp;
    }).some(function (t) {
      return t.test(i);
    });
  },
      Qi = { "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i], a: ["target", "href", "title", "rel"], area: [], b: [], br: [], col: [], code: [], div: [], em: [], hr: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], i: [], img: ["src", "srcset", "alt", "title", "width", "height"], li: [], ol: [], p: [], pre: [], s: [], small: [], span: [], sub: [], sup: [], strong: [], u: [], ul: [] },
      Xi = { allowList: Qi, content: {}, extraClass: "", html: !1, sanitize: !0, sanitizeFn: null, template: "<div></div>" },
      Yi = { allowList: "object", content: "object", extraClass: "(string|function)", html: "boolean", sanitize: "boolean", sanitizeFn: "(null|function)", template: "string" },
      Ui = { entry: "(string|element|function|null)", selector: "(string|element)" };
  var Gi = (function (_F5) {
    _inherits(Gi, _F5);

    function Gi(t) {
      _classCallCheck(this, Gi);

      _get(Object.getPrototypeOf(Gi.prototype), "constructor", this).call(this), this._config = this._getConfig(t);
    }

    _createClass(Gi, [{
      key: "getContent",
      value: function getContent() {
        var _this29 = this;

        return Object.values(this._config.content).map(function (t) {
          return _this29._resolvePossibleFunction(t);
        }).filter(Boolean);
      }
    }, {
      key: "hasContent",
      value: function hasContent() {
        return this.getContent().length > 0;
      }
    }, {
      key: "changeContent",
      value: function changeContent(t) {
        return this._checkContent(t), this._config.content = _extends({}, this._config.content, t), this;
      }
    }, {
      key: "toHtml",
      value: function toHtml() {
        var _e$classList;

        var t = document.createElement("div");t.innerHTML = this._maybeSanitize(this._config.template);var _iteratorNormalCompletion24 = true;
        var _didIteratorError24 = false;
        var _iteratorError24 = undefined;

        try {
          for (var _iterator24 = Object.entries(this._config.content)[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
            var _step24$value = _slicedToArray(_step24.value, 2);

            var _e11 = _step24$value[0];
            var _i10 = _step24$value[1];
            this._setContent(t, _i10, _e11);
          }
        } catch (err) {
          _didIteratorError24 = true;
          _iteratorError24 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion24 && _iterator24["return"]) {
              _iterator24["return"]();
            }
          } finally {
            if (_didIteratorError24) {
              throw _iteratorError24;
            }
          }
        }

        var e = t.children[0],
            i = this._resolvePossibleFunction(this._config.extraClass);return i && (_e$classList = e.classList).add.apply(_e$classList, _toConsumableArray(i.split(" "))), e;
      }
    }, {
      key: "_typeCheckConfig",
      value: function _typeCheckConfig(t) {
        _get(Object.getPrototypeOf(Gi.prototype), "_typeCheckConfig", this).call(this, t), this._checkContent(t.content);
      }
    }, {
      key: "_checkContent",
      value: function _checkContent(t) {
        var _iteratorNormalCompletion25 = true;
        var _didIteratorError25 = false;
        var _iteratorError25 = undefined;

        try {
          for (var _iterator25 = Object.entries(t)[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
            var _step25$value = _slicedToArray(_step25.value, 2);

            var _e12 = _step25$value[0];
            var _i11 = _step25$value[1];
            _get(Object.getPrototypeOf(Gi.prototype), "_typeCheckConfig", this).call(this, { selector: _e12, entry: _i11 }, Ui);
          }
        } catch (err) {
          _didIteratorError25 = true;
          _iteratorError25 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion25 && _iterator25["return"]) {
              _iterator25["return"]();
            }
          } finally {
            if (_didIteratorError25) {
              throw _iteratorError25;
            }
          }
        }
      }
    }, {
      key: "_setContent",
      value: function _setContent(t, e, i) {
        var n = Q.findOne(i, t);n && ((e = this._resolvePossibleFunction(e)) ? o(e) ? this._putElementInTemplate(r(e), n) : this._config.html ? n.innerHTML = this._maybeSanitize(e) : n.textContent = e : n.remove());
      }
    }, {
      key: "_maybeSanitize",
      value: function _maybeSanitize(t) {
        return this._config.sanitize ? (function (t, e, i) {
          var _ref7;

          if (!t.length) return t;if (i && "function" == typeof i) return i(t);var n = new window.DOMParser().parseFromString(t, "text/html"),
              s = (_ref7 = []).concat.apply(_ref7, _toConsumableArray(n.body.querySelectorAll("*")));var _iteratorNormalCompletion26 = true;
          var _didIteratorError26 = false;
          var _iteratorError26 = undefined;

          try {
            for (var _iterator26 = s[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
              var _ref8;

              var _t19 = _step26.value;
              var _i12 = _t19.nodeName.toLowerCase();if (!Object.keys(e).includes(_i12)) {
                _t19.remove();continue;
              }var _n9 = (_ref8 = []).concat.apply(_ref8, _toConsumableArray(_t19.attributes)),
                  _s3 = [].concat(e["*"] || [], e[_i12] || []);var _iteratorNormalCompletion27 = true;
              var _didIteratorError27 = false;
              var _iteratorError27 = undefined;

              try {
                for (var _iterator27 = _n9[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
                  var _e13 = _step27.value;
                  Ki(_e13, _s3) || _t19.removeAttribute(_e13.nodeName);
                }
              } catch (err) {
                _didIteratorError27 = true;
                _iteratorError27 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion27 && _iterator27["return"]) {
                    _iterator27["return"]();
                  }
                } finally {
                  if (_didIteratorError27) {
                    throw _iteratorError27;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError26 = true;
            _iteratorError26 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion26 && _iterator26["return"]) {
                _iterator26["return"]();
              }
            } finally {
              if (_didIteratorError26) {
                throw _iteratorError26;
              }
            }
          }

          return n.body.innerHTML;
        })(t, this._config.allowList, this._config.sanitizeFn) : t;
      }
    }, {
      key: "_resolvePossibleFunction",
      value: function _resolvePossibleFunction(t) {
        return "function" == typeof t ? t(this) : t;
      }
    }, {
      key: "_putElementInTemplate",
      value: function _putElementInTemplate(t, e) {
        if (this._config.html) return e.innerHTML = "", void e.append(t);e.textContent = t.textContent;
      }
    }], [{
      key: "Default",
      get: function get() {
        return Xi;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return Yi;
      }
    }, {
      key: "NAME",
      get: function get() {
        return "TemplateFactory";
      }
    }]);

    return Gi;
  })(F);

  var Ji = new Set(["sanitize", "allowList", "sanitizeFn"]),
      Zi = "fade",
      tn = "show",
      en = ".modal",
      nn = "hide.bs.modal",
      sn = "hover",
      on = "focus",
      rn = { AUTO: "auto", TOP: "top", RIGHT: p() ? "left" : "right", BOTTOM: "bottom", LEFT: p() ? "right" : "left" },
      an = { allowList: Qi, animation: !0, boundary: "clippingParents", container: !1, customClass: "", delay: 0, fallbackPlacements: ["top", "right", "bottom", "left"], html: !1, offset: [0, 0], placement: "top", popperConfig: null, sanitize: !0, sanitizeFn: null, selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', title: "", trigger: "hover focus" },
      ln = { allowList: "object", animation: "boolean", boundary: "(string|element)", container: "(string|element|boolean)", customClass: "(string|function)", delay: "(number|object)", fallbackPlacements: "array", html: "boolean", offset: "(array|string|function)", placement: "(string|function)", popperConfig: "(null|object|function)", sanitize: "boolean", sanitizeFn: "(null|function)", selector: "(string|boolean)", template: "string", title: "(string|element|function)", trigger: "string" };
  var cn = (function (_z8) {
    _inherits(cn, _z8);

    function cn(t, e) {
      _classCallCheck(this, cn);

      if (void 0 === Ke) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");_get(Object.getPrototypeOf(cn.prototype), "constructor", this).call(this, t, e), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
    }

    _createClass(cn, [{
      key: "enable",
      value: function enable() {
        this._isEnabled = !0;
      }
    }, {
      key: "disable",
      value: function disable() {
        this._isEnabled = !1;
      }
    }, {
      key: "toggleEnabled",
      value: function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      }
    }, {
      key: "toggle",
      value: function toggle() {
        this._isEnabled && (this._activeTrigger.click = !this._activeTrigger.click, this._isShown() ? this._leave() : this._enter());
      }
    }, {
      key: "dispose",
      value: function dispose() {
        clearTimeout(this._timeout), P.off(this._element.closest(en), nn, this._hideModalHandler), this.tip && this.tip.remove(), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), _get(Object.getPrototypeOf(cn.prototype), "dispose", this).call(this);
      }
    }, {
      key: "show",
      value: function show() {
        var _this30 = this;

        if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");if (!this._isWithContent() || !this._isEnabled) return;var t = P.trigger(this._element, this.constructor.eventName("show")),
            e = (c(this._element) || this._element.ownerDocument.documentElement).contains(this._element);if (t.defaultPrevented || !e) return;this.tip && (this.tip.remove(), this.tip = null);var i = this._getTipElement();this._element.setAttribute("aria-describedby", i.getAttribute("id"));var n = this._config.container;
        if ((this._element.ownerDocument.documentElement.contains(this.tip) || (n.append(i), P.trigger(this._element, this.constructor.eventName("inserted"))), this._popper ? this._popper.update() : this._popper = this._createPopper(i), i.classList.add(tn), "ontouchstart" in document.documentElement)) {
          var _iteratorNormalCompletion28 = true;
          var _didIteratorError28 = false;
          var _iteratorError28 = undefined;

          try {
            for (var _iterator28 = (_ref9 = []).concat.apply(_ref9, _toConsumableArray(document.body.children))[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
              var _ref9;

              var _t20 = _step28.value;
              P.on(_t20, "mouseover", h);
            }
          } catch (err) {
            _didIteratorError28 = true;
            _iteratorError28 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion28 && _iterator28["return"]) {
                _iterator28["return"]();
              }
            } finally {
              if (_didIteratorError28) {
                throw _iteratorError28;
              }
            }
          }
        }this._queueCallback(function () {
          P.trigger(_this30._element, _this30.constructor.eventName("shown")), !1 === _this30._isHovered && _this30._leave(), _this30._isHovered = !1;
        }, this.tip, this._isAnimated());
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this31 = this;

        if (!this._isShown()) return;if (P.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) return;var t = this._getTipElement();if ((t.classList.remove(tn), "ontouchstart" in document.documentElement)) {
          var _iteratorNormalCompletion29 = true;
          var _didIteratorError29 = false;
          var _iteratorError29 = undefined;

          try {
            for (var _iterator29 = (_ref10 = []).concat.apply(_ref10, _toConsumableArray(document.body.children))[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
              var _ref10;

              var _t21 = _step29.value;
              P.off(_t21, "mouseover", h);
            }
          } catch (err) {
            _didIteratorError29 = true;
            _iteratorError29 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion29 && _iterator29["return"]) {
                _iterator29["return"]();
              }
            } finally {
              if (_didIteratorError29) {
                throw _iteratorError29;
              }
            }
          }
        }this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, this._isHovered = null, this._queueCallback(function () {
          _this31._isWithActiveTrigger() || (_this31._isHovered || t.remove(), _this31._element.removeAttribute("aria-describedby"), P.trigger(_this31._element, _this31.constructor.eventName("hidden")), _this31._disposePopper());
        }, this.tip, this._isAnimated());
      }
    }, {
      key: "update",
      value: function update() {
        this._popper && this._popper.update();
      }
    }, {
      key: "_isWithContent",
      value: function _isWithContent() {
        return Boolean(this._getTitle());
      }
    }, {
      key: "_getTipElement",
      value: function _getTipElement() {
        return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip;
      }
    }, {
      key: "_createTipElement",
      value: function _createTipElement(t) {
        var e = this._getTemplateFactory(t).toHtml();if (!e) return null;e.classList.remove(Zi, tn), e.classList.add("bs-" + this.constructor.NAME + "-auto");var i = (function (t) {
          do {
            t += Math.floor(1e6 * Math.random());
          } while (document.getElementById(t));return t;
        })(this.constructor.NAME).toString();return e.setAttribute("id", i), this._isAnimated() && e.classList.add(Zi), e;
      }
    }, {
      key: "setContent",
      value: function setContent(t) {
        this._newContent = t, this._isShown() && (this._disposePopper(), this.show());
      }
    }, {
      key: "_getTemplateFactory",
      value: function _getTemplateFactory(t) {
        return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new Gi(_extends({}, this._config, { content: t, extraClass: this._resolvePossibleFunction(this._config.customClass) })), this._templateFactory;
      }
    }, {
      key: "_getContentForTemplate",
      value: function _getContentForTemplate() {
        return { ".tooltip-inner": this._getTitle() };
      }
    }, {
      key: "_getTitle",
      value: function _getTitle() {
        return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
      }
    }, {
      key: "_initializeOnDelegatedTarget",
      value: function _initializeOnDelegatedTarget(t) {
        return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig());
      }
    }, {
      key: "_isAnimated",
      value: function _isAnimated() {
        return this._config.animation || this.tip && this.tip.classList.contains(Zi);
      }
    }, {
      key: "_isShown",
      value: function _isShown() {
        return this.tip && this.tip.classList.contains(tn);
      }
    }, {
      key: "_createPopper",
      value: function _createPopper(t) {
        var e = "function" == typeof this._config.placement ? this._config.placement.call(this, t, this._element) : this._config.placement,
            i = rn[e.toUpperCase()];return Ve(this._element, t, this._getPopperConfig(i));
      }
    }, {
      key: "_getOffset",
      value: function _getOffset() {
        var _this32 = this;

        var t = this._config.offset;
        return "string" == typeof t ? t.split(",").map(function (t) {
          return Number.parseInt(t, 10);
        }) : "function" == typeof t ? function (e) {
          return t(e, _this32._element);
        } : t;
      }
    }, {
      key: "_resolvePossibleFunction",
      value: function _resolvePossibleFunction(t) {
        return "function" == typeof t ? t.call(this._element) : t;
      }
    }, {
      key: "_getPopperConfig",
      value: function _getPopperConfig(t) {
        var _this33 = this;

        var e = { placement: t, modifiers: [{ name: "flip", options: { fallbackPlacements: this._config.fallbackPlacements } }, { name: "offset", options: { offset: this._getOffset() } }, { name: "preventOverflow", options: { boundary: this._config.boundary } }, { name: "arrow", options: { element: "." + this.constructor.NAME + "-arrow" } }, { name: "preSetPlacement", enabled: !0, phase: "beforeMain", fn: function fn(t) {
              _this33._getTipElement().setAttribute("data-popper-placement", t.state.placement);
            } }] };return _extends({}, e, "function" == typeof this._config.popperConfig ? this._config.popperConfig(e) : this._config.popperConfig);
      }
    }, {
      key: "_setListeners",
      value: function _setListeners() {
        var _this34 = this;

        var t = this._config.trigger.split(" ");var _iteratorNormalCompletion30 = true;
        var _didIteratorError30 = false;
        var _iteratorError30 = undefined;

        try {
          for (var _iterator30 = t[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
            var _e14 = _step30.value;
            if ("click" === _e14) P.on(this._element, this.constructor.eventName("click"), this._config.selector, function (t) {
              _this34._initializeOnDelegatedTarget(t).toggle();
            });else if ("manual" !== _e14) {
              var _t22 = _e14 === sn ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"),
                  _i13 = _e14 === sn ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");P.on(this._element, _t22, this._config.selector, function (t) {
                var e = _this34._initializeOnDelegatedTarget(t);e._activeTrigger["focusin" === t.type ? on : sn] = !0, e._enter();
              }), P.on(this._element, _i13, this._config.selector, function (t) {
                var e = _this34._initializeOnDelegatedTarget(t);e._activeTrigger["focusout" === t.type ? on : sn] = e._element.contains(t.relatedTarget), e._leave();
              });
            }
          }
        } catch (err) {
          _didIteratorError30 = true;
          _iteratorError30 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion30 && _iterator30["return"]) {
              _iterator30["return"]();
            }
          } finally {
            if (_didIteratorError30) {
              throw _iteratorError30;
            }
          }
        }

        this._hideModalHandler = function () {
          _this34._element && _this34.hide();
        }, P.on(this._element.closest(en), nn, this._hideModalHandler);
      }
    }, {
      key: "_fixTitle",
      value: function _fixTitle() {
        var t = this._element.getAttribute("title");t && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", t), this._element.setAttribute("data-bs-original-title", t), this._element.removeAttribute("title"));
      }
    }, {
      key: "_enter",
      value: function _enter() {
        var _this35 = this;

        this._isShown() || this._isHovered ? this._isHovered = !0 : (this._isHovered = !0, this._setTimeout(function () {
          _this35._isHovered && _this35.show();
        }, this._config.delay.show));
      }
    }, {
      key: "_leave",
      value: function _leave() {
        var _this36 = this;

        this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout(function () {
          _this36._isHovered || _this36.hide();
        }, this._config.delay.hide));
      }
    }, {
      key: "_setTimeout",
      value: function _setTimeout(t, e) {
        clearTimeout(this._timeout), this._timeout = setTimeout(t, e);
      }
    }, {
      key: "_isWithActiveTrigger",
      value: function _isWithActiveTrigger() {
        return Object.values(this._activeTrigger).includes(!0);
      }
    }, {
      key: "_getConfig",
      value: function _getConfig(t) {
        var e = B.getDataAttributes(this._element);var _iteratorNormalCompletion31 = true;
        var _didIteratorError31 = false;
        var _iteratorError31 = undefined;

        try {
          for (var _iterator31 = Object.keys(e)[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
            var _t23 = _step31.value;
            Ji.has(_t23) && delete e[_t23];
          }
        } catch (err) {
          _didIteratorError31 = true;
          _iteratorError31 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion31 && _iterator31["return"]) {
              _iterator31["return"]();
            }
          } finally {
            if (_didIteratorError31) {
              throw _iteratorError31;
            }
          }
        }

        return t = _extends({}, e, "object" == typeof t && t ? t : {}), t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
      }
    }, {
      key: "_configAfterMerge",
      value: function _configAfterMerge(t) {
        return t.container = !1 === t.container ? document.body : r(t.container), "number" == typeof t.delay && (t.delay = { show: t.delay, hide: t.delay }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), t;
      }
    }, {
      key: "_getDelegateConfig",
      value: function _getDelegateConfig() {
        var t = {};for (var _e15 in this._config) {
          this.constructor.Default[_e15] !== this._config[_e15] && (t[_e15] = this._config[_e15]);
        }return t.selector = !1, t.trigger = "manual", t;
      }
    }, {
      key: "_disposePopper",
      value: function _disposePopper() {
        this._popper && (this._popper.destroy(), this._popper = null);
      }
    }], [{
      key: "jQueryInterface",
      value: function jQueryInterface(t) {
        return this.each(function () {
          var e = cn.getOrCreateInstance(this, t);if ("string" == typeof t) {
            if (void 0 === e[t]) throw new TypeError("No method named \"" + t + "\"");e[t]();
          }
        });
      }
    }, {
      key: "Default",
      get: function get() {
        return an;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return ln;
      }
    }, {
      key: "NAME",
      get: function get() {
        return "tooltip";
      }
    }]);

    return cn;
  })(z);

  g(cn);var hn = _extends({}, cn.Default, { content: "", offset: [0, 8], placement: "right", template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>', trigger: "click" }),
      dn = _extends({}, cn.DefaultType, { content: "(null|string|element|function)" });
  var un = (function (_cn) {
    _inherits(un, _cn);

    function un() {
      _classCallCheck(this, un);

      _get(Object.getPrototypeOf(un.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(un, [{
      key: "_isWithContent",
      value: function _isWithContent() {
        return this._getTitle() || this._getContent();
      }
    }, {
      key: "_getContentForTemplate",
      value: function _getContentForTemplate() {
        return { ".popover-header": this._getTitle(), ".popover-body": this._getContent() };
      }
    }, {
      key: "_getContent",
      value: function _getContent() {
        return this._resolvePossibleFunction(this._config.content);
      }
    }], [{
      key: "jQueryInterface",
      value: function jQueryInterface(t) {
        return this.each(function () {
          var e = un.getOrCreateInstance(this, t);if ("string" == typeof t) {
            if (void 0 === e[t]) throw new TypeError("No method named \"" + t + "\"");e[t]();
          }
        });
      }
    }, {
      key: "Default",
      get: function get() {
        return hn;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return dn;
      }
    }, {
      key: "NAME",
      get: function get() {
        return "popover";
      }
    }]);

    return un;
  })(cn);

  g(un);var fn = "click.bs.scrollspy",
      pn = "active",
      gn = "[href]",
      mn = { offset: null, rootMargin: "0px 0px -25%", smoothScroll: !1, target: null, threshold: [.1, .5, 1] },
      _n = { offset: "(number|null)", rootMargin: "string", smoothScroll: "boolean", target: "element", threshold: "array" };
  var bn = (function (_z9) {
    _inherits(bn, _z9);

    function bn(t, e) {
      _classCallCheck(this, bn);

      _get(Object.getPrototypeOf(bn.prototype), "constructor", this).call(this, t, e), this._targetLinks = new Map(), this._observableSections = new Map(), this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }, this.refresh();
    }

    _createClass(bn, [{
      key: "refresh",
      value: function refresh() {
        this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();var _iteratorNormalCompletion32 = true;
        var _didIteratorError32 = false;
        var _iteratorError32 = undefined;

        try {
          for (var _iterator32 = this._observableSections.values()[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
            var _t24 = _step32.value;
            this._observer.observe(_t24);
          }
        } catch (err) {
          _didIteratorError32 = true;
          _iteratorError32 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion32 && _iterator32["return"]) {
              _iterator32["return"]();
            }
          } finally {
            if (_didIteratorError32) {
              throw _iteratorError32;
            }
          }
        }
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this._observer.disconnect(), _get(Object.getPrototypeOf(bn.prototype), "dispose", this).call(this);
      }
    }, {
      key: "_configAfterMerge",
      value: function _configAfterMerge(t) {
        return t.target = r(t.target) || document.body, t.rootMargin = t.offset ? t.offset + "px 0px -30%" : t.rootMargin, "string" == typeof t.threshold && (t.threshold = t.threshold.split(",").map(function (t) {
          return Number.parseFloat(t);
        })), t;
      }
    }, {
      key: "_maybeEnableSmoothScroll",
      value: function _maybeEnableSmoothScroll() {
        var _this37 = this;

        this._config.smoothScroll && (P.off(this._config.target, fn), P.on(this._config.target, fn, gn, function (t) {
          var e = _this37._observableSections.get(t.target.hash);if (e) {
            t.preventDefault();var _i14 = _this37._rootElement || window,
                _n10 = e.offsetTop - _this37._element.offsetTop;if (_i14.scrollTo) return void _i14.scrollTo({ top: _n10, behavior: "smooth" });_i14.scrollTop = _n10;
          }
        }));
      }
    }, {
      key: "_getNewObserver",
      value: function _getNewObserver() {
        var _this38 = this;

        var t = { root: this._rootElement, threshold: this._config.threshold, rootMargin: this._config.rootMargin };return new IntersectionObserver(function (t) {
          return _this38._observerCallback(t);
        }, t);
      }
    }, {
      key: "_observerCallback",
      value: function _observerCallback(t) {
        var _this39 = this;

        var e = function e(t) {
          return _this39._targetLinks.get("#" + t.target.id);
        },
            i = function i(t) {
          _this39._previousScrollData.visibleEntryTop = t.target.offsetTop, _this39._process(e(t));
        },
            n = (this._rootElement || document.documentElement).scrollTop,
            s = n >= this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop = n;var _iteratorNormalCompletion33 = true;
        var _didIteratorError33 = false;
        var _iteratorError33 = undefined;

        try {
          for (var _iterator33 = t[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
            var _o3 = _step33.value;
            if (!_o3.isIntersecting) {
              this._activeTarget = null, this._clearActiveClass(e(_o3));continue;
            }var _t25 = _o3.target.offsetTop >= this._previousScrollData.visibleEntryTop;if (s && _t25) {
              if ((i(_o3), !n)) return;
            } else s || _t25 || i(_o3);
          }
        } catch (err) {
          _didIteratorError33 = true;
          _iteratorError33 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion33 && _iterator33["return"]) {
              _iterator33["return"]();
            }
          } finally {
            if (_didIteratorError33) {
              throw _iteratorError33;
            }
          }
        }
      }
    }, {
      key: "_initializeTargetsAndObservables",
      value: function _initializeTargetsAndObservables() {
        this._targetLinks = new Map(), this._observableSections = new Map();var t = Q.find(gn, this._config.target);var _iteratorNormalCompletion34 = true;
        var _didIteratorError34 = false;
        var _iteratorError34 = undefined;

        try {
          for (var _iterator34 = t[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
            var _e16 = _step34.value;
            if (!_e16.hash || l(_e16)) continue;var _t26 = Q.findOne(_e16.hash, this._element);a(_t26) && (this._targetLinks.set(_e16.hash, _e16), this._observableSections.set(_e16.hash, _t26));
          }
        } catch (err) {
          _didIteratorError34 = true;
          _iteratorError34 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion34 && _iterator34["return"]) {
              _iterator34["return"]();
            }
          } finally {
            if (_didIteratorError34) {
              throw _iteratorError34;
            }
          }
        }
      }
    }, {
      key: "_process",
      value: function _process(t) {
        this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(pn), this._activateParents(t), P.trigger(this._element, "activate.bs.scrollspy", { relatedTarget: t }));
      }
    }, {
      key: "_activateParents",
      value: function _activateParents(t) {
        if (t.classList.contains("dropdown-item")) Q.findOne(".dropdown-toggle", t.closest(".dropdown")).classList.add(pn);else {
          var _iteratorNormalCompletion35 = true;
          var _didIteratorError35 = false;
          var _iteratorError35 = undefined;

          try {
            for (var _iterator35 = Q.parents(t, ".nav, .list-group")[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
              var _e17 = _step35.value;
              var _iteratorNormalCompletion36 = true;
              var _didIteratorError36 = false;
              var _iteratorError36 = undefined;

              try {
                for (var _iterator36 = Q.prev(_e17, ".nav-link, .nav-item > .nav-link, .list-group-item")[Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
                  var _t27 = _step36.value;
                  _t27.classList.add(pn);
                }
              } catch (err) {
                _didIteratorError36 = true;
                _iteratorError36 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion36 && _iterator36["return"]) {
                    _iterator36["return"]();
                  }
                } finally {
                  if (_didIteratorError36) {
                    throw _iteratorError36;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError35 = true;
            _iteratorError35 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion35 && _iterator35["return"]) {
                _iterator35["return"]();
              }
            } finally {
              if (_didIteratorError35) {
                throw _iteratorError35;
              }
            }
          }
        }
      }
    }, {
      key: "_clearActiveClass",
      value: function _clearActiveClass(t) {
        t.classList.remove(pn);var e = Q.find("[href].active", t);var _iteratorNormalCompletion37 = true;
        var _didIteratorError37 = false;
        var _iteratorError37 = undefined;

        try {
          for (var _iterator37 = e[Symbol.iterator](), _step37; !(_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done); _iteratorNormalCompletion37 = true) {
            var _t28 = _step37.value;
            _t28.classList.remove(pn);
          }
        } catch (err) {
          _didIteratorError37 = true;
          _iteratorError37 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion37 && _iterator37["return"]) {
              _iterator37["return"]();
            }
          } finally {
            if (_didIteratorError37) {
              throw _iteratorError37;
            }
          }
        }
      }
    }], [{
      key: "jQueryInterface",
      value: function jQueryInterface(t) {
        return this.each(function () {
          var e = bn.getOrCreateInstance(this, t);if ("string" == typeof t) {
            if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError("No method named \"" + t + "\"");e[t]();
          }
        });
      }
    }, {
      key: "Default",
      get: function get() {
        return mn;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return _n;
      }
    }, {
      key: "NAME",
      get: function get() {
        return "scrollspy";
      }
    }]);

    return bn;
  })(z);

  P.on(window, "load.bs.scrollspy.data-api", function () {
    var _iteratorNormalCompletion38 = true;
    var _didIteratorError38 = false;
    var _iteratorError38 = undefined;

    try {
      for (var _iterator38 = Q.find('[data-bs-spy="scroll"]')[Symbol.iterator](), _step38; !(_iteratorNormalCompletion38 = (_step38 = _iterator38.next()).done); _iteratorNormalCompletion38 = true) {
        var _t29 = _step38.value;
        bn.getOrCreateInstance(_t29);
      }
    } catch (err) {
      _didIteratorError38 = true;
      _iteratorError38 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion38 && _iterator38["return"]) {
          _iterator38["return"]();
        }
      } finally {
        if (_didIteratorError38) {
          throw _iteratorError38;
        }
      }
    }
  }), g(bn);var vn = "ArrowLeft",
      yn = "ArrowRight",
      wn = "ArrowUp",
      An = "ArrowDown",
      En = "active",
      Tn = "fade",
      Cn = "show",
      On = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
      xn = ".nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role=\"tab\"]:not(.dropdown-toggle), " + On;
  var kn = (function (_z10) {
    _inherits(kn, _z10);

    function kn(t) {
      var _this40 = this;

      _classCallCheck(this, kn);

      _get(Object.getPrototypeOf(kn.prototype), "constructor", this).call(this, t), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), P.on(this._element, "keydown.bs.tab", function (t) {
        return _this40._keydown(t);
      }));
    }

    _createClass(kn, [{
      key: "show",
      value: function show() {
        var t = this._element;if (this._elemIsActive(t)) return;var e = this._getActiveElem(),
            i = e ? P.trigger(e, "hide.bs.tab", { relatedTarget: t }) : null;P.trigger(t, "show.bs.tab", { relatedTarget: e }).defaultPrevented || i && i.defaultPrevented || (this._deactivate(e, t), this._activate(t, e));
      }
    }, {
      key: "_activate",
      value: function _activate(t, e) {
        var _this41 = this;

        t && (t.classList.add(En), this._activate(n(t)), this._queueCallback(function () {
          "tab" === t.getAttribute("role") ? (t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), _this41._toggleDropDown(t, !0), P.trigger(t, "shown.bs.tab", { relatedTarget: e })) : t.classList.add(Cn);
        }, t, t.classList.contains(Tn)));
      }
    }, {
      key: "_deactivate",
      value: function _deactivate(t, e) {
        var _this42 = this;

        t && (t.classList.remove(En), t.blur(), this._deactivate(n(t)), this._queueCallback(function () {
          "tab" === t.getAttribute("role") ? (t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), _this42._toggleDropDown(t, !1), P.trigger(t, "hidden.bs.tab", { relatedTarget: e })) : t.classList.remove(Cn);
        }, t, t.classList.contains(Tn)));
      }
    }, {
      key: "_keydown",
      value: function _keydown(t) {
        if (![vn, yn, wn, An].includes(t.key)) return;t.stopPropagation(), t.preventDefault();var e = [yn, An].includes(t.key),
            i = b(this._getChildren().filter(function (t) {
          return !l(t);
        }), t.target, e, !0);i && (i.focus({ preventScroll: !0 }), kn.getOrCreateInstance(i).show());
      }
    }, {
      key: "_getChildren",
      value: function _getChildren() {
        return Q.find(xn, this._parent);
      }
    }, {
      key: "_getActiveElem",
      value: function _getActiveElem() {
        var _this43 = this;

        return this._getChildren().find(function (t) {
          return _this43._elemIsActive(t);
        }) || null;
      }
    }, {
      key: "_setInitialAttributes",
      value: function _setInitialAttributes(t, e) {
        this._setAttributeIfNotExists(t, "role", "tablist");var _iteratorNormalCompletion39 = true;
        var _didIteratorError39 = false;
        var _iteratorError39 = undefined;

        try {
          for (var _iterator39 = e[Symbol.iterator](), _step39; !(_iteratorNormalCompletion39 = (_step39 = _iterator39.next()).done); _iteratorNormalCompletion39 = true) {
            var _t30 = _step39.value;
            this._setInitialAttributesOnChild(_t30);
          }
        } catch (err) {
          _didIteratorError39 = true;
          _iteratorError39 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion39 && _iterator39["return"]) {
              _iterator39["return"]();
            }
          } finally {
            if (_didIteratorError39) {
              throw _iteratorError39;
            }
          }
        }
      }
    }, {
      key: "_setInitialAttributesOnChild",
      value: function _setInitialAttributesOnChild(t) {
        t = this._getInnerElement(t);var e = this._elemIsActive(t),
            i = this._getOuterElement(t);t.setAttribute("aria-selected", e), i !== t && this._setAttributeIfNotExists(i, "role", "presentation"), e || t.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t, "role", "tab"), this._setInitialAttributesOnTargetPanel(t);
      }
    }, {
      key: "_setInitialAttributesOnTargetPanel",
      value: function _setInitialAttributesOnTargetPanel(t) {
        var e = n(t);e && (this._setAttributeIfNotExists(e, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(e, "aria-labelledby", "#" + t.id));
      }
    }, {
      key: "_toggleDropDown",
      value: function _toggleDropDown(t, e) {
        var i = this._getOuterElement(t);if (!i.classList.contains("dropdown")) return;var n = function n(t, _n2) {
          var s = Q.findOne(t, i);s && s.classList.toggle(_n2, e);
        };n(".dropdown-toggle", En), n(".dropdown-menu", Cn), i.setAttribute("aria-expanded", e);
      }
    }, {
      key: "_setAttributeIfNotExists",
      value: function _setAttributeIfNotExists(t, e, i) {
        t.hasAttribute(e) || t.setAttribute(e, i);
      }
    }, {
      key: "_elemIsActive",
      value: function _elemIsActive(t) {
        return t.classList.contains(En);
      }
    }, {
      key: "_getInnerElement",
      value: function _getInnerElement(t) {
        return t.matches(xn) ? t : Q.findOne(xn, t);
      }
    }, {
      key: "_getOuterElement",
      value: function _getOuterElement(t) {
        return t.closest(".nav-item, .list-group-item") || t;
      }
    }], [{
      key: "jQueryInterface",
      value: function jQueryInterface(t) {
        return this.each(function () {
          var e = kn.getOrCreateInstance(this);if ("string" == typeof t) {
            if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError("No method named \"" + t + "\"");e[t]();
          }
        });
      }
    }, {
      key: "NAME",
      get: function get() {
        return "tab";
      }
    }]);

    return kn;
  })(z);

  P.on(document, "click.bs.tab", On, function (t) {
    ["A", "AREA"].includes(this.tagName) && t.preventDefault(), l(this) || kn.getOrCreateInstance(this).show();
  }), P.on(window, "load.bs.tab", function () {
    var _iteratorNormalCompletion40 = true;
    var _didIteratorError40 = false;
    var _iteratorError40 = undefined;

    try {
      for (var _iterator40 = Q.find('.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]')[Symbol.iterator](), _step40; !(_iteratorNormalCompletion40 = (_step40 = _iterator40.next()).done); _iteratorNormalCompletion40 = true) {
        var _t31 = _step40.value;
        kn.getOrCreateInstance(_t31);
      }
    } catch (err) {
      _didIteratorError40 = true;
      _iteratorError40 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion40 && _iterator40["return"]) {
          _iterator40["return"]();
        }
      } finally {
        if (_didIteratorError40) {
          throw _iteratorError40;
        }
      }
    }
  }), g(kn);var Ln = "hide",
      Dn = "show",
      Sn = "showing",
      In = { animation: "boolean", autohide: "boolean", delay: "number" },
      Nn = { animation: !0, autohide: !0, delay: 5e3 };
  var Pn = (function (_z11) {
    _inherits(Pn, _z11);

    function Pn(t, e) {
      _classCallCheck(this, Pn);

      _get(Object.getPrototypeOf(Pn.prototype), "constructor", this).call(this, t, e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
    }

    _createClass(Pn, [{
      key: "show",
      value: function show() {
        var _this44 = this;

        P.trigger(this._element, "show.bs.toast").defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove(Ln), d(this._element), this._element.classList.add(Dn, Sn), this._queueCallback(function () {
          _this44._element.classList.remove(Sn), P.trigger(_this44._element, "shown.bs.toast"), _this44._maybeScheduleHide();
        }, this._element, this._config.animation));
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this45 = this;

        this.isShown() && (P.trigger(this._element, "hide.bs.toast").defaultPrevented || (this._element.classList.add(Sn), this._queueCallback(function () {
          _this45._element.classList.add(Ln), _this45._element.classList.remove(Sn, Dn), P.trigger(_this45._element, "hidden.bs.toast");
        }, this._element, this._config.animation)));
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this._clearTimeout(), this.isShown() && this._element.classList.remove(Dn), _get(Object.getPrototypeOf(Pn.prototype), "dispose", this).call(this);
      }
    }, {
      key: "isShown",
      value: function isShown() {
        return this._element.classList.contains(Dn);
      }
    }, {
      key: "_maybeScheduleHide",
      value: function _maybeScheduleHide() {
        var _this46 = this;

        this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(function () {
          _this46.hide();
        }, this._config.delay)));
      }
    }, {
      key: "_onInteraction",
      value: function _onInteraction(t, e) {
        switch (t.type) {case "mouseover":case "mouseout":
            this._hasMouseInteraction = e;break;case "focusin":case "focusout":
            this._hasKeyboardInteraction = e;}if (e) return void this._clearTimeout();var i = t.relatedTarget;this._element === i || this._element.contains(i) || this._maybeScheduleHide();
      }
    }, {
      key: "_setListeners",
      value: function _setListeners() {
        var _this47 = this;

        P.on(this._element, "mouseover.bs.toast", function (t) {
          return _this47._onInteraction(t, !0);
        }), P.on(this._element, "mouseout.bs.toast", function (t) {
          return _this47._onInteraction(t, !1);
        }), P.on(this._element, "focusin.bs.toast", function (t) {
          return _this47._onInteraction(t, !0);
        }), P.on(this._element, "focusout.bs.toast", function (t) {
          return _this47._onInteraction(t, !1);
        });
      }
    }, {
      key: "_clearTimeout",
      value: function _clearTimeout() {
        clearTimeout(this._timeout), this._timeout = null;
      }
    }], [{
      key: "jQueryInterface",
      value: function jQueryInterface(t) {
        return this.each(function () {
          var e = Pn.getOrCreateInstance(this, t);if ("string" == typeof t) {
            if (void 0 === e[t]) throw new TypeError("No method named \"" + t + "\"");e[t](this);
          }
        });
      }
    }, {
      key: "Default",
      get: function get() {
        return Nn;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return In;
      }
    }, {
      key: "NAME",
      get: function get() {
        return "toast";
      }
    }]);

    return Pn;
  })(z);

  return q(Pn), g(Pn), { Alert: R, Button: K, Carousel: at, Collapse: pt, Dropdown: hi, Modal: Ni, Offcanvas: zi, Popover: un, ScrollSpy: bn, Tab: kn, Toast: Pn, Tooltip: cn };
});
//# sourceMappingURL=bootstrap.bundle.min.js.map

