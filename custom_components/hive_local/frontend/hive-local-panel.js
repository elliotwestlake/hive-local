var Ic = Object.defineProperty;
var Ac = (e, t, n) => t in e ? Ic(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var gr = (e, t, n) => Ac(e, typeof t != "symbol" ? t + "" : t, n);
var va = { exports: {} }, kl = {}, xa = { exports: {} }, O = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cr = Symbol.for("react.element"), Uc = Symbol.for("react.portal"), Bc = Symbol.for("react.fragment"), Wc = Symbol.for("react.strict_mode"), Hc = Symbol.for("react.profiler"), Vc = Symbol.for("react.provider"), Qc = Symbol.for("react.context"), Kc = Symbol.for("react.forward_ref"), Yc = Symbol.for("react.suspense"), Gc = Symbol.for("react.memo"), Xc = Symbol.for("react.lazy"), ns = Symbol.iterator;
function Zc(e) {
  return e === null || typeof e != "object" ? null : (e = ns && e[ns] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ya = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, wa = Object.assign, ka = {};
function yn(e, t, n) {
  this.props = e, this.context = t, this.refs = ka, this.updater = n || ya;
}
yn.prototype.isReactComponent = {};
yn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
yn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ja() {
}
ja.prototype = yn.prototype;
function oi(e, t, n) {
  this.props = e, this.context = t, this.refs = ka, this.updater = n || ya;
}
var ii = oi.prototype = new ja();
ii.constructor = oi;
wa(ii, yn.prototype);
ii.isPureReactComponent = !0;
var rs = Array.isArray, Na = Object.prototype.hasOwnProperty, si = { current: null }, Sa = { key: !0, ref: !0, __self: !0, __source: !0 };
function _a(e, t, n) {
  var r, l = {}, o = null, s = null;
  if (t != null) for (r in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (o = "" + t.key), t) Na.call(t, r) && !Sa.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var u = Array(a), c = 0; c < a; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: cr, type: e, key: o, ref: s, props: l, _owner: si.current };
}
function Jc(e, t) {
  return { $$typeof: cr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ai(e) {
  return typeof e == "object" && e !== null && e.$$typeof === cr;
}
function qc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var ls = /\/+/g;
function Ol(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? qc("" + e.key) : t.toString(36);
}
function Fr(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else switch (o) {
    case "string":
    case "number":
      s = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case cr:
        case Uc:
          s = !0;
      }
  }
  if (s) return s = e, l = l(s), e = r === "" ? "." + Ol(s, 0) : r, rs(l) ? (n = "", e != null && (n = e.replace(ls, "$&/") + "/"), Fr(l, t, n, "", function(c) {
    return c;
  })) : l != null && (ai(l) && (l = Jc(l, n + (!l.key || s && s.key === l.key ? "" : ("" + l.key).replace(ls, "$&/") + "/") + e)), t.push(l)), 1;
  if (s = 0, r = r === "" ? "." : r + ":", rs(e)) for (var a = 0; a < e.length; a++) {
    o = e[a];
    var u = r + Ol(o, a);
    s += Fr(o, t, n, u, l);
  }
  else if (u = Zc(e), typeof u == "function") for (e = u.call(e), a = 0; !(o = e.next()).done; ) o = o.value, u = r + Ol(o, a++), s += Fr(o, t, n, u, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return s;
}
function vr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Fr(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function ed(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ge = { current: null }, Dr = { transition: null }, td = { ReactCurrentDispatcher: ge, ReactCurrentBatchConfig: Dr, ReactCurrentOwner: si };
function ba() {
  throw Error("act(...) is not supported in production builds of React.");
}
O.Children = { map: vr, forEach: function(e, t, n) {
  vr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return vr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return vr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!ai(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
O.Component = yn;
O.Fragment = Bc;
O.Profiler = Hc;
O.PureComponent = oi;
O.StrictMode = Wc;
O.Suspense = Yc;
O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = td;
O.act = ba;
O.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = wa({}, e.props), l = e.key, o = e.ref, s = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, s = si.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (u in t) Na.call(t, u) && !Sa.hasOwnProperty(u) && (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    a = Array(u);
    for (var c = 0; c < u; c++) a[c] = arguments[c + 2];
    r.children = a;
  }
  return { $$typeof: cr, type: e.type, key: l, ref: o, props: r, _owner: s };
};
O.createContext = function(e) {
  return e = { $$typeof: Qc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Vc, _context: e }, e.Consumer = e;
};
O.createElement = _a;
O.createFactory = function(e) {
  var t = _a.bind(null, e);
  return t.type = e, t;
};
O.createRef = function() {
  return { current: null };
};
O.forwardRef = function(e) {
  return { $$typeof: Kc, render: e };
};
O.isValidElement = ai;
O.lazy = function(e) {
  return { $$typeof: Xc, _payload: { _status: -1, _result: e }, _init: ed };
};
O.memo = function(e, t) {
  return { $$typeof: Gc, type: e, compare: t === void 0 ? null : t };
};
O.startTransition = function(e) {
  var t = Dr.transition;
  Dr.transition = {};
  try {
    e();
  } finally {
    Dr.transition = t;
  }
};
O.unstable_act = ba;
O.useCallback = function(e, t) {
  return ge.current.useCallback(e, t);
};
O.useContext = function(e) {
  return ge.current.useContext(e);
};
O.useDebugValue = function() {
};
O.useDeferredValue = function(e) {
  return ge.current.useDeferredValue(e);
};
O.useEffect = function(e, t) {
  return ge.current.useEffect(e, t);
};
O.useId = function() {
  return ge.current.useId();
};
O.useImperativeHandle = function(e, t, n) {
  return ge.current.useImperativeHandle(e, t, n);
};
O.useInsertionEffect = function(e, t) {
  return ge.current.useInsertionEffect(e, t);
};
O.useLayoutEffect = function(e, t) {
  return ge.current.useLayoutEffect(e, t);
};
O.useMemo = function(e, t) {
  return ge.current.useMemo(e, t);
};
O.useReducer = function(e, t, n) {
  return ge.current.useReducer(e, t, n);
};
O.useRef = function(e) {
  return ge.current.useRef(e);
};
O.useState = function(e) {
  return ge.current.useState(e);
};
O.useSyncExternalStore = function(e, t, n) {
  return ge.current.useSyncExternalStore(e, t, n);
};
O.useTransition = function() {
  return ge.current.useTransition();
};
O.version = "18.3.1";
xa.exports = O;
var _ = xa.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nd = _, rd = Symbol.for("react.element"), ld = Symbol.for("react.fragment"), od = Object.prototype.hasOwnProperty, id = nd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, sd = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ca(e, t, n) {
  var r, l = {}, o = null, s = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (r in t) od.call(t, r) && !sd.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: rd, type: e, key: o, ref: s, props: l, _owner: id.current };
}
kl.Fragment = ld;
kl.jsx = Ca;
kl.jsxs = Ca;
va.exports = kl;
var i = va.exports, Ea = { exports: {} }, Ee = {}, za = { exports: {} }, Ta = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(T, F) {
    var E = T.length;
    T.push(F);
    e: for (; 0 < E; ) {
      var M = E - 1 >>> 1, D = T[M];
      if (0 < l(D, F)) T[M] = F, T[E] = D, E = M;
      else break e;
    }
  }
  function n(T) {
    return T.length === 0 ? null : T[0];
  }
  function r(T) {
    if (T.length === 0) return null;
    var F = T[0], E = T.pop();
    if (E !== F) {
      T[0] = E;
      e: for (var M = 0, D = T.length, ne = D >>> 1; M < ne; ) {
        var re = 2 * (M + 1) - 1, jn = T[re], We = re + 1, Et = T[We];
        if (0 > l(jn, E)) We < D && 0 > l(Et, jn) ? (T[M] = Et, T[We] = E, M = We) : (T[M] = jn, T[re] = E, M = re);
        else if (We < D && 0 > l(Et, E)) T[M] = Et, T[We] = E, M = We;
        else break e;
      }
    }
    return F;
  }
  function l(T, F) {
    var E = T.sortIndex - F.sortIndex;
    return E !== 0 ? E : T.id - F.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var s = Date, a = s.now();
    e.unstable_now = function() {
      return s.now() - a;
    };
  }
  var u = [], c = [], v = 1, g = null, m = 3, x = !1, w = !1, k = !1, b = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(T) {
    for (var F = n(c); F !== null; ) {
      if (F.callback === null) r(c);
      else if (F.startTime <= T) r(c), F.sortIndex = F.expirationTime, t(u, F);
      else break;
      F = n(c);
    }
  }
  function h(T) {
    if (k = !1, p(T), !w) if (n(u) !== null) w = !0, ot(y);
    else {
      var F = n(c);
      F !== null && Ct(h, F.startTime - T);
    }
  }
  function y(T, F) {
    w = !1, k && (k = !1, f(j), j = -1), x = !0;
    var E = m;
    try {
      for (p(F), g = n(u); g !== null && (!(g.expirationTime > F) || T && !I()); ) {
        var M = g.callback;
        if (typeof M == "function") {
          g.callback = null, m = g.priorityLevel;
          var D = M(g.expirationTime <= F);
          F = e.unstable_now(), typeof D == "function" ? g.callback = D : g === n(u) && r(u), p(F);
        } else r(u);
        g = n(u);
      }
      if (g !== null) var ne = !0;
      else {
        var re = n(c);
        re !== null && Ct(h, re.startTime - F), ne = !1;
      }
      return ne;
    } finally {
      g = null, m = E, x = !1;
    }
  }
  var S = !1, z = null, j = -1, N = 5, P = -1;
  function I() {
    return !(e.unstable_now() - P < N);
  }
  function R() {
    if (z !== null) {
      var T = e.unstable_now();
      P = T;
      var F = !0;
      try {
        F = z(!0, T);
      } finally {
        F ? J() : (S = !1, z = null);
      }
    } else S = !1;
  }
  var J;
  if (typeof d == "function") J = function() {
    d(R);
  };
  else if (typeof MessageChannel < "u") {
    var xe = new MessageChannel(), bt = xe.port2;
    xe.port1.onmessage = R, J = function() {
      bt.postMessage(null);
    };
  } else J = function() {
    b(R, 0);
  };
  function ot(T) {
    z = T, S || (S = !0, J());
  }
  function Ct(T, F) {
    j = b(function() {
      T(e.unstable_now());
    }, F);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(T) {
    T.callback = null;
  }, e.unstable_continueExecution = function() {
    w || x || (w = !0, ot(y));
  }, e.unstable_forceFrameRate = function(T) {
    0 > T || 125 < T ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : N = 0 < T ? Math.floor(1e3 / T) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return m;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(T) {
    switch (m) {
      case 1:
      case 2:
      case 3:
        var F = 3;
        break;
      default:
        F = m;
    }
    var E = m;
    m = F;
    try {
      return T();
    } finally {
      m = E;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(T, F) {
    switch (T) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        T = 3;
    }
    var E = m;
    m = T;
    try {
      return F();
    } finally {
      m = E;
    }
  }, e.unstable_scheduleCallback = function(T, F, E) {
    var M = e.unstable_now();
    switch (typeof E == "object" && E !== null ? (E = E.delay, E = typeof E == "number" && 0 < E ? M + E : M) : E = M, T) {
      case 1:
        var D = -1;
        break;
      case 2:
        D = 250;
        break;
      case 5:
        D = 1073741823;
        break;
      case 4:
        D = 1e4;
        break;
      default:
        D = 5e3;
    }
    return D = E + D, T = { id: v++, callback: F, priorityLevel: T, startTime: E, expirationTime: D, sortIndex: -1 }, E > M ? (T.sortIndex = E, t(c, T), n(u) === null && T === n(c) && (k ? (f(j), j = -1) : k = !0, Ct(h, E - M))) : (T.sortIndex = D, t(u, T), w || x || (w = !0, ot(y))), T;
  }, e.unstable_shouldYield = I, e.unstable_wrapCallback = function(T) {
    var F = m;
    return function() {
      var E = m;
      m = F;
      try {
        return T.apply(this, arguments);
      } finally {
        m = E;
      }
    };
  };
})(Ta);
za.exports = Ta;
var ad = za.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ud = _, Ce = ad;
function C(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var $a = /* @__PURE__ */ new Set(), Kn = {};
function Wt(e, t) {
  dn(e, t), dn(e + "Capture", t);
}
function dn(e, t) {
  for (Kn[e] = t, e = 0; e < t.length; e++) $a.add(t[e]);
}
var et = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), co = Object.prototype.hasOwnProperty, cd = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, os = {}, is = {};
function dd(e) {
  return co.call(is, e) ? !0 : co.call(os, e) ? !1 : cd.test(e) ? is[e] = !0 : (os[e] = !0, !1);
}
function pd(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function fd(e, t, n, r) {
  if (t === null || typeof t > "u" || pd(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function ve(e, t, n, r, l, o, s) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = s;
}
var ae = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ae[e] = new ve(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ae[t] = new ve(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ae[e] = new ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ae[e] = new ve(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ae[e] = new ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ae[e] = new ve(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ae[e] = new ve(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ae[e] = new ve(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ae[e] = new ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ui = /[\-:]([a-z])/g;
function ci(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ui,
    ci
  );
  ae[t] = new ve(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ui, ci);
  ae[t] = new ve(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ui, ci);
  ae[t] = new ve(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ae[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ae.xlinkHref = new ve("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ae[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function di(e, t, n, r) {
  var l = ae.hasOwnProperty(t) ? ae[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (fd(t, n, l, r) && (n = null), r || l === null ? dd(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var lt = ud.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, xr = Symbol.for("react.element"), Qt = Symbol.for("react.portal"), Kt = Symbol.for("react.fragment"), pi = Symbol.for("react.strict_mode"), po = Symbol.for("react.profiler"), Pa = Symbol.for("react.provider"), La = Symbol.for("react.context"), fi = Symbol.for("react.forward_ref"), fo = Symbol.for("react.suspense"), ho = Symbol.for("react.suspense_list"), hi = Symbol.for("react.memo"), st = Symbol.for("react.lazy"), Ma = Symbol.for("react.offscreen"), ss = Symbol.iterator;
function Nn(e) {
  return e === null || typeof e != "object" ? null : (e = ss && e[ss] || e["@@iterator"], typeof e == "function" ? e : null);
}
var G = Object.assign, Il;
function Pn(e) {
  if (Il === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Il = t && t[1] || "";
  }
  return `
` + Il + e;
}
var Al = !1;
function Ul(e, t) {
  if (!e || Al) return "";
  Al = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (c) {
        var r = c;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (c) {
        r = c;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (var l = c.stack.split(`
`), o = r.stack.split(`
`), s = l.length - 1, a = o.length - 1; 1 <= s && 0 <= a && l[s] !== o[a]; ) a--;
      for (; 1 <= s && 0 <= a; s--, a--) if (l[s] !== o[a]) {
        if (s !== 1 || a !== 1)
          do
            if (s--, a--, 0 > a || l[s] !== o[a]) {
              var u = `
` + l[s].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= s && 0 <= a);
        break;
      }
    }
  } finally {
    Al = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Pn(e) : "";
}
function hd(e) {
  switch (e.tag) {
    case 5:
      return Pn(e.type);
    case 16:
      return Pn("Lazy");
    case 13:
      return Pn("Suspense");
    case 19:
      return Pn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ul(e.type, !1), e;
    case 11:
      return e = Ul(e.type.render, !1), e;
    case 1:
      return e = Ul(e.type, !0), e;
    default:
      return "";
  }
}
function mo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Kt:
      return "Fragment";
    case Qt:
      return "Portal";
    case po:
      return "Profiler";
    case pi:
      return "StrictMode";
    case fo:
      return "Suspense";
    case ho:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case La:
      return (e.displayName || "Context") + ".Consumer";
    case Pa:
      return (e._context.displayName || "Context") + ".Provider";
    case fi:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case hi:
      return t = e.displayName || null, t !== null ? t : mo(e.type) || "Memo";
    case st:
      t = e._payload, e = e._init;
      try {
        return mo(e(t));
      } catch {
      }
  }
  return null;
}
function md(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return mo(t);
    case 8:
      return t === pi ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function kt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Ra(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function gd(e) {
  var t = Ra(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, o = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(s) {
      r = "" + s, o.call(this, s);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(s) {
      r = "" + s;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function yr(e) {
  e._valueTracker || (e._valueTracker = gd(e));
}
function Fa(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Ra(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Xr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function go(e, t) {
  var n = t.checked;
  return G({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function as(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = kt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Da(e, t) {
  t = t.checked, t != null && di(e, "checked", t, !1);
}
function vo(e, t) {
  Da(e, t);
  var n = kt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? xo(e, t.type, n) : t.hasOwnProperty("defaultValue") && xo(e, t.type, kt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function us(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function xo(e, t, n) {
  (t !== "number" || Xr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Ln = Array.isArray;
function ln(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + kt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function yo(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(C(91));
  return G({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function cs(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(C(92));
      if (Ln(n)) {
        if (1 < n.length) throw Error(C(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: kt(n) };
}
function Oa(e, t) {
  var n = kt(t.value), r = kt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ds(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ia(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function wo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ia(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var wr, Aa = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (wr = wr || document.createElement("div"), wr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = wr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Yn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Fn = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, vd = ["Webkit", "ms", "Moz", "O"];
Object.keys(Fn).forEach(function(e) {
  vd.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Fn[t] = Fn[e];
  });
});
function Ua(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Fn.hasOwnProperty(e) && Fn[e] ? ("" + t).trim() : t + "px";
}
function Ba(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Ua(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var xd = G({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function ko(e, t) {
  if (t) {
    if (xd[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(C(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(C(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(C(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(C(62));
  }
}
function jo(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var No = null;
function mi(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var So = null, on = null, sn = null;
function ps(e) {
  if (e = fr(e)) {
    if (typeof So != "function") throw Error(C(280));
    var t = e.stateNode;
    t && (t = bl(t), So(e.stateNode, e.type, t));
  }
}
function Wa(e) {
  on ? sn ? sn.push(e) : sn = [e] : on = e;
}
function Ha() {
  if (on) {
    var e = on, t = sn;
    if (sn = on = null, ps(e), t) for (e = 0; e < t.length; e++) ps(t[e]);
  }
}
function Va(e, t) {
  return e(t);
}
function Qa() {
}
var Bl = !1;
function Ka(e, t, n) {
  if (Bl) return e(t, n);
  Bl = !0;
  try {
    return Va(e, t, n);
  } finally {
    Bl = !1, (on !== null || sn !== null) && (Qa(), Ha());
  }
}
function Gn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = bl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(C(231, t, typeof n));
  return n;
}
var _o = !1;
if (et) try {
  var Sn = {};
  Object.defineProperty(Sn, "passive", { get: function() {
    _o = !0;
  } }), window.addEventListener("test", Sn, Sn), window.removeEventListener("test", Sn, Sn);
} catch {
  _o = !1;
}
function yd(e, t, n, r, l, o, s, a, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (v) {
    this.onError(v);
  }
}
var Dn = !1, Zr = null, Jr = !1, bo = null, wd = { onError: function(e) {
  Dn = !0, Zr = e;
} };
function kd(e, t, n, r, l, o, s, a, u) {
  Dn = !1, Zr = null, yd.apply(wd, arguments);
}
function jd(e, t, n, r, l, o, s, a, u) {
  if (kd.apply(this, arguments), Dn) {
    if (Dn) {
      var c = Zr;
      Dn = !1, Zr = null;
    } else throw Error(C(198));
    Jr || (Jr = !0, bo = c);
  }
}
function Ht(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Ya(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function fs(e) {
  if (Ht(e) !== e) throw Error(C(188));
}
function Nd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Ht(e), t === null) throw Error(C(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (r = l.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return fs(l), e;
        if (o === r) return fs(l), t;
        o = o.sibling;
      }
      throw Error(C(188));
    }
    if (n.return !== r.return) n = l, r = o;
    else {
      for (var s = !1, a = l.child; a; ) {
        if (a === n) {
          s = !0, n = l, r = o;
          break;
        }
        if (a === r) {
          s = !0, r = l, n = o;
          break;
        }
        a = a.sibling;
      }
      if (!s) {
        for (a = o.child; a; ) {
          if (a === n) {
            s = !0, n = o, r = l;
            break;
          }
          if (a === r) {
            s = !0, r = o, n = l;
            break;
          }
          a = a.sibling;
        }
        if (!s) throw Error(C(189));
      }
    }
    if (n.alternate !== r) throw Error(C(190));
  }
  if (n.tag !== 3) throw Error(C(188));
  return n.stateNode.current === n ? e : t;
}
function Ga(e) {
  return e = Nd(e), e !== null ? Xa(e) : null;
}
function Xa(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Xa(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Za = Ce.unstable_scheduleCallback, hs = Ce.unstable_cancelCallback, Sd = Ce.unstable_shouldYield, _d = Ce.unstable_requestPaint, Z = Ce.unstable_now, bd = Ce.unstable_getCurrentPriorityLevel, gi = Ce.unstable_ImmediatePriority, Ja = Ce.unstable_UserBlockingPriority, qr = Ce.unstable_NormalPriority, Cd = Ce.unstable_LowPriority, qa = Ce.unstable_IdlePriority, jl = null, Ke = null;
function Ed(e) {
  if (Ke && typeof Ke.onCommitFiberRoot == "function") try {
    Ke.onCommitFiberRoot(jl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ae = Math.clz32 ? Math.clz32 : $d, zd = Math.log, Td = Math.LN2;
function $d(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (zd(e) / Td | 0) | 0;
}
var kr = 64, jr = 4194304;
function Mn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function el(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, s = n & 268435455;
  if (s !== 0) {
    var a = s & ~l;
    a !== 0 ? r = Mn(a) : (o &= s, o !== 0 && (r = Mn(o)));
  } else s = n & ~l, s !== 0 ? r = Mn(s) : o !== 0 && (r = Mn(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Ae(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Pd(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Ld(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var s = 31 - Ae(o), a = 1 << s, u = l[s];
    u === -1 ? (!(a & n) || a & r) && (l[s] = Pd(a, t)) : u <= t && (e.expiredLanes |= a), o &= ~a;
  }
}
function Co(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function eu() {
  var e = kr;
  return kr <<= 1, !(kr & 4194240) && (kr = 64), e;
}
function Wl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function dr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ae(t), e[t] = n;
}
function Md(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Ae(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function vi(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Ae(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var U = 0;
function tu(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var nu, xi, ru, lu, ou, Eo = !1, Nr = [], ft = null, ht = null, mt = null, Xn = /* @__PURE__ */ new Map(), Zn = /* @__PURE__ */ new Map(), ut = [], Rd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function ms(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ft = null;
      break;
    case "dragenter":
    case "dragleave":
      ht = null;
      break;
    case "mouseover":
    case "mouseout":
      mt = null;
      break;
    case "pointerover":
    case "pointerout":
      Xn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Zn.delete(t.pointerId);
  }
}
function _n(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = fr(t), t !== null && xi(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Fd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ft = _n(ft, e, t, n, r, l), !0;
    case "dragenter":
      return ht = _n(ht, e, t, n, r, l), !0;
    case "mouseover":
      return mt = _n(mt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Xn.set(o, _n(Xn.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Zn.set(o, _n(Zn.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function iu(e) {
  var t = Pt(e.target);
  if (t !== null) {
    var n = Ht(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ya(n), t !== null) {
          e.blockedOn = t, ou(e.priority, function() {
            ru(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Or(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = zo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      No = r, n.target.dispatchEvent(r), No = null;
    } else return t = fr(n), t !== null && xi(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function gs(e, t, n) {
  Or(e) && n.delete(t);
}
function Dd() {
  Eo = !1, ft !== null && Or(ft) && (ft = null), ht !== null && Or(ht) && (ht = null), mt !== null && Or(mt) && (mt = null), Xn.forEach(gs), Zn.forEach(gs);
}
function bn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Eo || (Eo = !0, Ce.unstable_scheduleCallback(Ce.unstable_NormalPriority, Dd)));
}
function Jn(e) {
  function t(l) {
    return bn(l, e);
  }
  if (0 < Nr.length) {
    bn(Nr[0], e);
    for (var n = 1; n < Nr.length; n++) {
      var r = Nr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ft !== null && bn(ft, e), ht !== null && bn(ht, e), mt !== null && bn(mt, e), Xn.forEach(t), Zn.forEach(t), n = 0; n < ut.length; n++) r = ut[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ut.length && (n = ut[0], n.blockedOn === null); ) iu(n), n.blockedOn === null && ut.shift();
}
var an = lt.ReactCurrentBatchConfig, tl = !0;
function Od(e, t, n, r) {
  var l = U, o = an.transition;
  an.transition = null;
  try {
    U = 1, yi(e, t, n, r);
  } finally {
    U = l, an.transition = o;
  }
}
function Id(e, t, n, r) {
  var l = U, o = an.transition;
  an.transition = null;
  try {
    U = 4, yi(e, t, n, r);
  } finally {
    U = l, an.transition = o;
  }
}
function yi(e, t, n, r) {
  if (tl) {
    var l = zo(e, t, n, r);
    if (l === null) ql(e, t, r, nl, n), ms(e, r);
    else if (Fd(l, e, t, n, r)) r.stopPropagation();
    else if (ms(e, r), t & 4 && -1 < Rd.indexOf(e)) {
      for (; l !== null; ) {
        var o = fr(l);
        if (o !== null && nu(o), o = zo(e, t, n, r), o === null && ql(e, t, r, nl, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else ql(e, t, r, null, n);
  }
}
var nl = null;
function zo(e, t, n, r) {
  if (nl = null, e = mi(r), e = Pt(e), e !== null) if (t = Ht(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ya(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return nl = e, null;
}
function su(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (bd()) {
        case gi:
          return 1;
        case Ja:
          return 4;
        case qr:
        case Cd:
          return 16;
        case qa:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var dt = null, wi = null, Ir = null;
function au() {
  if (Ir) return Ir;
  var e, t = wi, n = t.length, r, l = "value" in dt ? dt.value : dt.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === l[o - r]; r++) ;
  return Ir = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Ar(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Sr() {
  return !0;
}
function vs() {
  return !1;
}
function ze(e) {
  function t(n, r, l, o, s) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = s, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(o) : o[a]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Sr : vs, this.isPropagationStopped = vs, this;
  }
  return G(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Sr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Sr);
  }, persist: function() {
  }, isPersistent: Sr }), t;
}
var wn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, ki = ze(wn), pr = G({}, wn, { view: 0, detail: 0 }), Ad = ze(pr), Hl, Vl, Cn, Nl = G({}, pr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ji, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Cn && (Cn && e.type === "mousemove" ? (Hl = e.screenX - Cn.screenX, Vl = e.screenY - Cn.screenY) : Vl = Hl = 0, Cn = e), Hl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Vl;
} }), xs = ze(Nl), Ud = G({}, Nl, { dataTransfer: 0 }), Bd = ze(Ud), Wd = G({}, pr, { relatedTarget: 0 }), Ql = ze(Wd), Hd = G({}, wn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Vd = ze(Hd), Qd = G({}, wn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Kd = ze(Qd), Yd = G({}, wn, { data: 0 }), ys = ze(Yd), Gd = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Xd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Zd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Jd(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Zd[e]) ? !!t[e] : !1;
}
function ji() {
  return Jd;
}
var qd = G({}, pr, { key: function(e) {
  if (e.key) {
    var t = Gd[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Ar(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Xd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ji, charCode: function(e) {
  return e.type === "keypress" ? Ar(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Ar(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), ep = ze(qd), tp = G({}, Nl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ws = ze(tp), np = G({}, pr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ji }), rp = ze(np), lp = G({}, wn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), op = ze(lp), ip = G({}, Nl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), sp = ze(ip), ap = [9, 13, 27, 32], Ni = et && "CompositionEvent" in window, On = null;
et && "documentMode" in document && (On = document.documentMode);
var up = et && "TextEvent" in window && !On, uu = et && (!Ni || On && 8 < On && 11 >= On), ks = " ", js = !1;
function cu(e, t) {
  switch (e) {
    case "keyup":
      return ap.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function du(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Yt = !1;
function cp(e, t) {
  switch (e) {
    case "compositionend":
      return du(t);
    case "keypress":
      return t.which !== 32 ? null : (js = !0, ks);
    case "textInput":
      return e = t.data, e === ks && js ? null : e;
    default:
      return null;
  }
}
function dp(e, t) {
  if (Yt) return e === "compositionend" || !Ni && cu(e, t) ? (e = au(), Ir = wi = dt = null, Yt = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return uu && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var pp = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Ns(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!pp[e.type] : t === "textarea";
}
function pu(e, t, n, r) {
  Wa(r), t = rl(t, "onChange"), 0 < t.length && (n = new ki("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var In = null, qn = null;
function fp(e) {
  Nu(e, 0);
}
function Sl(e) {
  var t = Zt(e);
  if (Fa(t)) return e;
}
function hp(e, t) {
  if (e === "change") return t;
}
var fu = !1;
if (et) {
  var Kl;
  if (et) {
    var Yl = "oninput" in document;
    if (!Yl) {
      var Ss = document.createElement("div");
      Ss.setAttribute("oninput", "return;"), Yl = typeof Ss.oninput == "function";
    }
    Kl = Yl;
  } else Kl = !1;
  fu = Kl && (!document.documentMode || 9 < document.documentMode);
}
function _s() {
  In && (In.detachEvent("onpropertychange", hu), qn = In = null);
}
function hu(e) {
  if (e.propertyName === "value" && Sl(qn)) {
    var t = [];
    pu(t, qn, e, mi(e)), Ka(fp, t);
  }
}
function mp(e, t, n) {
  e === "focusin" ? (_s(), In = t, qn = n, In.attachEvent("onpropertychange", hu)) : e === "focusout" && _s();
}
function gp(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Sl(qn);
}
function vp(e, t) {
  if (e === "click") return Sl(t);
}
function xp(e, t) {
  if (e === "input" || e === "change") return Sl(t);
}
function yp(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Be = typeof Object.is == "function" ? Object.is : yp;
function er(e, t) {
  if (Be(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!co.call(t, l) || !Be(e[l], t[l])) return !1;
  }
  return !0;
}
function bs(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Cs(e, t) {
  var n = bs(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = bs(n);
  }
}
function mu(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? mu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function gu() {
  for (var e = window, t = Xr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Xr(e.document);
  }
  return t;
}
function Si(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function wp(e) {
  var t = gu(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && mu(n.ownerDocument.documentElement, n)) {
    if (r !== null && Si(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = Cs(n, o);
        var s = Cs(
          n,
          r
        );
        l && s && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== s.node || e.focusOffset !== s.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(s.node, s.offset)) : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var kp = et && "documentMode" in document && 11 >= document.documentMode, Gt = null, To = null, An = null, $o = !1;
function Es(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  $o || Gt == null || Gt !== Xr(r) || (r = Gt, "selectionStart" in r && Si(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), An && er(An, r) || (An = r, r = rl(To, "onSelect"), 0 < r.length && (t = new ki("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Gt)));
}
function _r(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Xt = { animationend: _r("Animation", "AnimationEnd"), animationiteration: _r("Animation", "AnimationIteration"), animationstart: _r("Animation", "AnimationStart"), transitionend: _r("Transition", "TransitionEnd") }, Gl = {}, vu = {};
et && (vu = document.createElement("div").style, "AnimationEvent" in window || (delete Xt.animationend.animation, delete Xt.animationiteration.animation, delete Xt.animationstart.animation), "TransitionEvent" in window || delete Xt.transitionend.transition);
function _l(e) {
  if (Gl[e]) return Gl[e];
  if (!Xt[e]) return e;
  var t = Xt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in vu) return Gl[e] = t[n];
  return e;
}
var xu = _l("animationend"), yu = _l("animationiteration"), wu = _l("animationstart"), ku = _l("transitionend"), ju = /* @__PURE__ */ new Map(), zs = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Nt(e, t) {
  ju.set(e, t), Wt(t, [e]);
}
for (var Xl = 0; Xl < zs.length; Xl++) {
  var Zl = zs[Xl], jp = Zl.toLowerCase(), Np = Zl[0].toUpperCase() + Zl.slice(1);
  Nt(jp, "on" + Np);
}
Nt(xu, "onAnimationEnd");
Nt(yu, "onAnimationIteration");
Nt(wu, "onAnimationStart");
Nt("dblclick", "onDoubleClick");
Nt("focusin", "onFocus");
Nt("focusout", "onBlur");
Nt(ku, "onTransitionEnd");
dn("onMouseEnter", ["mouseout", "mouseover"]);
dn("onMouseLeave", ["mouseout", "mouseover"]);
dn("onPointerEnter", ["pointerout", "pointerover"]);
dn("onPointerLeave", ["pointerout", "pointerover"]);
Wt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Wt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Wt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Wt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Wt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Wt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Rn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Sp = new Set("cancel close invalid load scroll toggle".split(" ").concat(Rn));
function Ts(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, jd(r, t, void 0, e), e.currentTarget = null;
}
function Nu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var s = r.length - 1; 0 <= s; s--) {
        var a = r[s], u = a.instance, c = a.currentTarget;
        if (a = a.listener, u !== o && l.isPropagationStopped()) break e;
        Ts(l, a, c), o = u;
      }
      else for (s = 0; s < r.length; s++) {
        if (a = r[s], u = a.instance, c = a.currentTarget, a = a.listener, u !== o && l.isPropagationStopped()) break e;
        Ts(l, a, c), o = u;
      }
    }
  }
  if (Jr) throw e = bo, Jr = !1, bo = null, e;
}
function H(e, t) {
  var n = t[Fo];
  n === void 0 && (n = t[Fo] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Su(t, e, 2, !1), n.add(r));
}
function Jl(e, t, n) {
  var r = 0;
  t && (r |= 4), Su(n, e, r, t);
}
var br = "_reactListening" + Math.random().toString(36).slice(2);
function tr(e) {
  if (!e[br]) {
    e[br] = !0, $a.forEach(function(n) {
      n !== "selectionchange" && (Sp.has(n) || Jl(n, !1, e), Jl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[br] || (t[br] = !0, Jl("selectionchange", !1, t));
  }
}
function Su(e, t, n, r) {
  switch (su(t)) {
    case 1:
      var l = Od;
      break;
    case 4:
      l = Id;
      break;
    default:
      l = yi;
  }
  n = l.bind(null, t, n, e), l = void 0, !_o || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function ql(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var s = r.tag;
    if (s === 3 || s === 4) {
      var a = r.stateNode.containerInfo;
      if (a === l || a.nodeType === 8 && a.parentNode === l) break;
      if (s === 4) for (s = r.return; s !== null; ) {
        var u = s.tag;
        if ((u === 3 || u === 4) && (u = s.stateNode.containerInfo, u === l || u.nodeType === 8 && u.parentNode === l)) return;
        s = s.return;
      }
      for (; a !== null; ) {
        if (s = Pt(a), s === null) return;
        if (u = s.tag, u === 5 || u === 6) {
          r = o = s;
          continue e;
        }
        a = a.parentNode;
      }
    }
    r = r.return;
  }
  Ka(function() {
    var c = o, v = mi(n), g = [];
    e: {
      var m = ju.get(e);
      if (m !== void 0) {
        var x = ki, w = e;
        switch (e) {
          case "keypress":
            if (Ar(n) === 0) break e;
          case "keydown":
          case "keyup":
            x = ep;
            break;
          case "focusin":
            w = "focus", x = Ql;
            break;
          case "focusout":
            w = "blur", x = Ql;
            break;
          case "beforeblur":
          case "afterblur":
            x = Ql;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            x = xs;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            x = Bd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            x = rp;
            break;
          case xu:
          case yu:
          case wu:
            x = Vd;
            break;
          case ku:
            x = op;
            break;
          case "scroll":
            x = Ad;
            break;
          case "wheel":
            x = sp;
            break;
          case "copy":
          case "cut":
          case "paste":
            x = Kd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            x = ws;
        }
        var k = (t & 4) !== 0, b = !k && e === "scroll", f = k ? m !== null ? m + "Capture" : null : m;
        k = [];
        for (var d = c, p; d !== null; ) {
          p = d;
          var h = p.stateNode;
          if (p.tag === 5 && h !== null && (p = h, f !== null && (h = Gn(d, f), h != null && k.push(nr(d, h, p)))), b) break;
          d = d.return;
        }
        0 < k.length && (m = new x(m, w, null, n, v), g.push({ event: m, listeners: k }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (m = e === "mouseover" || e === "pointerover", x = e === "mouseout" || e === "pointerout", m && n !== No && (w = n.relatedTarget || n.fromElement) && (Pt(w) || w[tt])) break e;
        if ((x || m) && (m = v.window === v ? v : (m = v.ownerDocument) ? m.defaultView || m.parentWindow : window, x ? (w = n.relatedTarget || n.toElement, x = c, w = w ? Pt(w) : null, w !== null && (b = Ht(w), w !== b || w.tag !== 5 && w.tag !== 6) && (w = null)) : (x = null, w = c), x !== w)) {
          if (k = xs, h = "onMouseLeave", f = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (k = ws, h = "onPointerLeave", f = "onPointerEnter", d = "pointer"), b = x == null ? m : Zt(x), p = w == null ? m : Zt(w), m = new k(h, d + "leave", x, n, v), m.target = b, m.relatedTarget = p, h = null, Pt(v) === c && (k = new k(f, d + "enter", w, n, v), k.target = p, k.relatedTarget = b, h = k), b = h, x && w) t: {
            for (k = x, f = w, d = 0, p = k; p; p = Vt(p)) d++;
            for (p = 0, h = f; h; h = Vt(h)) p++;
            for (; 0 < d - p; ) k = Vt(k), d--;
            for (; 0 < p - d; ) f = Vt(f), p--;
            for (; d--; ) {
              if (k === f || f !== null && k === f.alternate) break t;
              k = Vt(k), f = Vt(f);
            }
            k = null;
          }
          else k = null;
          x !== null && $s(g, m, x, k, !1), w !== null && b !== null && $s(g, b, w, k, !0);
        }
      }
      e: {
        if (m = c ? Zt(c) : window, x = m.nodeName && m.nodeName.toLowerCase(), x === "select" || x === "input" && m.type === "file") var y = hp;
        else if (Ns(m)) if (fu) y = xp;
        else {
          y = gp;
          var S = mp;
        }
        else (x = m.nodeName) && x.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (y = vp);
        if (y && (y = y(e, c))) {
          pu(g, y, n, v);
          break e;
        }
        S && S(e, m, c), e === "focusout" && (S = m._wrapperState) && S.controlled && m.type === "number" && xo(m, "number", m.value);
      }
      switch (S = c ? Zt(c) : window, e) {
        case "focusin":
          (Ns(S) || S.contentEditable === "true") && (Gt = S, To = c, An = null);
          break;
        case "focusout":
          An = To = Gt = null;
          break;
        case "mousedown":
          $o = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          $o = !1, Es(g, n, v);
          break;
        case "selectionchange":
          if (kp) break;
        case "keydown":
        case "keyup":
          Es(g, n, v);
      }
      var z;
      if (Ni) e: {
        switch (e) {
          case "compositionstart":
            var j = "onCompositionStart";
            break e;
          case "compositionend":
            j = "onCompositionEnd";
            break e;
          case "compositionupdate":
            j = "onCompositionUpdate";
            break e;
        }
        j = void 0;
      }
      else Yt ? cu(e, n) && (j = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (j = "onCompositionStart");
      j && (uu && n.locale !== "ko" && (Yt || j !== "onCompositionStart" ? j === "onCompositionEnd" && Yt && (z = au()) : (dt = v, wi = "value" in dt ? dt.value : dt.textContent, Yt = !0)), S = rl(c, j), 0 < S.length && (j = new ys(j, e, null, n, v), g.push({ event: j, listeners: S }), z ? j.data = z : (z = du(n), z !== null && (j.data = z)))), (z = up ? cp(e, n) : dp(e, n)) && (c = rl(c, "onBeforeInput"), 0 < c.length && (v = new ys("onBeforeInput", "beforeinput", null, n, v), g.push({ event: v, listeners: c }), v.data = z));
    }
    Nu(g, t);
  });
}
function nr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function rl(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Gn(e, n), o != null && r.unshift(nr(e, o, l)), o = Gn(e, t), o != null && r.push(nr(e, o, l))), e = e.return;
  }
  return r;
}
function Vt(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function $s(e, t, n, r, l) {
  for (var o = t._reactName, s = []; n !== null && n !== r; ) {
    var a = n, u = a.alternate, c = a.stateNode;
    if (u !== null && u === r) break;
    a.tag === 5 && c !== null && (a = c, l ? (u = Gn(n, o), u != null && s.unshift(nr(n, u, a))) : l || (u = Gn(n, o), u != null && s.push(nr(n, u, a)))), n = n.return;
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var _p = /\r\n?/g, bp = /\u0000|\uFFFD/g;
function Ps(e) {
  return (typeof e == "string" ? e : "" + e).replace(_p, `
`).replace(bp, "");
}
function Cr(e, t, n) {
  if (t = Ps(t), Ps(e) !== t && n) throw Error(C(425));
}
function ll() {
}
var Po = null, Lo = null;
function Mo(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Ro = typeof setTimeout == "function" ? setTimeout : void 0, Cp = typeof clearTimeout == "function" ? clearTimeout : void 0, Ls = typeof Promise == "function" ? Promise : void 0, Ep = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ls < "u" ? function(e) {
  return Ls.resolve(null).then(e).catch(zp);
} : Ro;
function zp(e) {
  setTimeout(function() {
    throw e;
  });
}
function eo(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Jn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Jn(t);
}
function gt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Ms(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var kn = Math.random().toString(36).slice(2), Qe = "__reactFiber$" + kn, rr = "__reactProps$" + kn, tt = "__reactContainer$" + kn, Fo = "__reactEvents$" + kn, Tp = "__reactListeners$" + kn, $p = "__reactHandles$" + kn;
function Pt(e) {
  var t = e[Qe];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[tt] || n[Qe]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ms(e); e !== null; ) {
        if (n = e[Qe]) return n;
        e = Ms(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function fr(e) {
  return e = e[Qe] || e[tt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Zt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(C(33));
}
function bl(e) {
  return e[rr] || null;
}
var Do = [], Jt = -1;
function St(e) {
  return { current: e };
}
function V(e) {
  0 > Jt || (e.current = Do[Jt], Do[Jt] = null, Jt--);
}
function W(e, t) {
  Jt++, Do[Jt] = e.current, e.current = t;
}
var jt = {}, pe = St(jt), ke = St(!1), Ot = jt;
function pn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return jt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function je(e) {
  return e = e.childContextTypes, e != null;
}
function ol() {
  V(ke), V(pe);
}
function Rs(e, t, n) {
  if (pe.current !== jt) throw Error(C(168));
  W(pe, t), W(ke, n);
}
function _u(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(C(108, md(e) || "Unknown", l));
  return G({}, n, r);
}
function il(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || jt, Ot = pe.current, W(pe, e), W(ke, ke.current), !0;
}
function Fs(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(C(169));
  n ? (e = _u(e, t, Ot), r.__reactInternalMemoizedMergedChildContext = e, V(ke), V(pe), W(pe, e)) : V(ke), W(ke, n);
}
var Xe = null, Cl = !1, to = !1;
function bu(e) {
  Xe === null ? Xe = [e] : Xe.push(e);
}
function Pp(e) {
  Cl = !0, bu(e);
}
function _t() {
  if (!to && Xe !== null) {
    to = !0;
    var e = 0, t = U;
    try {
      var n = Xe;
      for (U = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Xe = null, Cl = !1;
    } catch (l) {
      throw Xe !== null && (Xe = Xe.slice(e + 1)), Za(gi, _t), l;
    } finally {
      U = t, to = !1;
    }
  }
  return null;
}
var qt = [], en = 0, sl = null, al = 0, Te = [], $e = 0, It = null, Ze = 1, Je = "";
function Tt(e, t) {
  qt[en++] = al, qt[en++] = sl, sl = e, al = t;
}
function Cu(e, t, n) {
  Te[$e++] = Ze, Te[$e++] = Je, Te[$e++] = It, It = e;
  var r = Ze;
  e = Je;
  var l = 32 - Ae(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - Ae(t) + l;
  if (30 < o) {
    var s = l - l % 5;
    o = (r & (1 << s) - 1).toString(32), r >>= s, l -= s, Ze = 1 << 32 - Ae(t) + l | n << l | r, Je = o + e;
  } else Ze = 1 << o | n << l | r, Je = e;
}
function _i(e) {
  e.return !== null && (Tt(e, 1), Cu(e, 1, 0));
}
function bi(e) {
  for (; e === sl; ) sl = qt[--en], qt[en] = null, al = qt[--en], qt[en] = null;
  for (; e === It; ) It = Te[--$e], Te[$e] = null, Je = Te[--$e], Te[$e] = null, Ze = Te[--$e], Te[$e] = null;
}
var be = null, _e = null, Q = !1, Ie = null;
function Eu(e, t) {
  var n = Pe(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Ds(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, be = e, _e = gt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, be = e, _e = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = It !== null ? { id: Ze, overflow: Je } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Pe(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, be = e, _e = null, !0) : !1;
    default:
      return !1;
  }
}
function Oo(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Io(e) {
  if (Q) {
    var t = _e;
    if (t) {
      var n = t;
      if (!Ds(e, t)) {
        if (Oo(e)) throw Error(C(418));
        t = gt(n.nextSibling);
        var r = be;
        t && Ds(e, t) ? Eu(r, n) : (e.flags = e.flags & -4097 | 2, Q = !1, be = e);
      }
    } else {
      if (Oo(e)) throw Error(C(418));
      e.flags = e.flags & -4097 | 2, Q = !1, be = e;
    }
  }
}
function Os(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  be = e;
}
function Er(e) {
  if (e !== be) return !1;
  if (!Q) return Os(e), Q = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Mo(e.type, e.memoizedProps)), t && (t = _e)) {
    if (Oo(e)) throw zu(), Error(C(418));
    for (; t; ) Eu(e, t), t = gt(t.nextSibling);
  }
  if (Os(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(C(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              _e = gt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      _e = null;
    }
  } else _e = be ? gt(e.stateNode.nextSibling) : null;
  return !0;
}
function zu() {
  for (var e = _e; e; ) e = gt(e.nextSibling);
}
function fn() {
  _e = be = null, Q = !1;
}
function Ci(e) {
  Ie === null ? Ie = [e] : Ie.push(e);
}
var Lp = lt.ReactCurrentBatchConfig;
function En(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(C(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(C(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(s) {
        var a = l.refs;
        s === null ? delete a[o] : a[o] = s;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(C(284));
    if (!n._owner) throw Error(C(290, e));
  }
  return e;
}
function zr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(C(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Is(e) {
  var t = e._init;
  return t(e._payload);
}
function Tu(e) {
  function t(f, d) {
    if (e) {
      var p = f.deletions;
      p === null ? (f.deletions = [d], f.flags |= 16) : p.push(d);
    }
  }
  function n(f, d) {
    if (!e) return null;
    for (; d !== null; ) t(f, d), d = d.sibling;
    return null;
  }
  function r(f, d) {
    for (f = /* @__PURE__ */ new Map(); d !== null; ) d.key !== null ? f.set(d.key, d) : f.set(d.index, d), d = d.sibling;
    return f;
  }
  function l(f, d) {
    return f = wt(f, d), f.index = 0, f.sibling = null, f;
  }
  function o(f, d, p) {
    return f.index = p, e ? (p = f.alternate, p !== null ? (p = p.index, p < d ? (f.flags |= 2, d) : p) : (f.flags |= 2, d)) : (f.flags |= 1048576, d);
  }
  function s(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function a(f, d, p, h) {
    return d === null || d.tag !== 6 ? (d = ao(p, f.mode, h), d.return = f, d) : (d = l(d, p), d.return = f, d);
  }
  function u(f, d, p, h) {
    var y = p.type;
    return y === Kt ? v(f, d, p.props.children, h, p.key) : d !== null && (d.elementType === y || typeof y == "object" && y !== null && y.$$typeof === st && Is(y) === d.type) ? (h = l(d, p.props), h.ref = En(f, d, p), h.return = f, h) : (h = Kr(p.type, p.key, p.props, null, f.mode, h), h.ref = En(f, d, p), h.return = f, h);
  }
  function c(f, d, p, h) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== p.containerInfo || d.stateNode.implementation !== p.implementation ? (d = uo(p, f.mode, h), d.return = f, d) : (d = l(d, p.children || []), d.return = f, d);
  }
  function v(f, d, p, h, y) {
    return d === null || d.tag !== 7 ? (d = Dt(p, f.mode, h, y), d.return = f, d) : (d = l(d, p), d.return = f, d);
  }
  function g(f, d, p) {
    if (typeof d == "string" && d !== "" || typeof d == "number") return d = ao("" + d, f.mode, p), d.return = f, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case xr:
          return p = Kr(d.type, d.key, d.props, null, f.mode, p), p.ref = En(f, null, d), p.return = f, p;
        case Qt:
          return d = uo(d, f.mode, p), d.return = f, d;
        case st:
          var h = d._init;
          return g(f, h(d._payload), p);
      }
      if (Ln(d) || Nn(d)) return d = Dt(d, f.mode, p, null), d.return = f, d;
      zr(f, d);
    }
    return null;
  }
  function m(f, d, p, h) {
    var y = d !== null ? d.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number") return y !== null ? null : a(f, d, "" + p, h);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case xr:
          return p.key === y ? u(f, d, p, h) : null;
        case Qt:
          return p.key === y ? c(f, d, p, h) : null;
        case st:
          return y = p._init, m(
            f,
            d,
            y(p._payload),
            h
          );
      }
      if (Ln(p) || Nn(p)) return y !== null ? null : v(f, d, p, h, null);
      zr(f, p);
    }
    return null;
  }
  function x(f, d, p, h, y) {
    if (typeof h == "string" && h !== "" || typeof h == "number") return f = f.get(p) || null, a(d, f, "" + h, y);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case xr:
          return f = f.get(h.key === null ? p : h.key) || null, u(d, f, h, y);
        case Qt:
          return f = f.get(h.key === null ? p : h.key) || null, c(d, f, h, y);
        case st:
          var S = h._init;
          return x(f, d, p, S(h._payload), y);
      }
      if (Ln(h) || Nn(h)) return f = f.get(p) || null, v(d, f, h, y, null);
      zr(d, h);
    }
    return null;
  }
  function w(f, d, p, h) {
    for (var y = null, S = null, z = d, j = d = 0, N = null; z !== null && j < p.length; j++) {
      z.index > j ? (N = z, z = null) : N = z.sibling;
      var P = m(f, z, p[j], h);
      if (P === null) {
        z === null && (z = N);
        break;
      }
      e && z && P.alternate === null && t(f, z), d = o(P, d, j), S === null ? y = P : S.sibling = P, S = P, z = N;
    }
    if (j === p.length) return n(f, z), Q && Tt(f, j), y;
    if (z === null) {
      for (; j < p.length; j++) z = g(f, p[j], h), z !== null && (d = o(z, d, j), S === null ? y = z : S.sibling = z, S = z);
      return Q && Tt(f, j), y;
    }
    for (z = r(f, z); j < p.length; j++) N = x(z, f, j, p[j], h), N !== null && (e && N.alternate !== null && z.delete(N.key === null ? j : N.key), d = o(N, d, j), S === null ? y = N : S.sibling = N, S = N);
    return e && z.forEach(function(I) {
      return t(f, I);
    }), Q && Tt(f, j), y;
  }
  function k(f, d, p, h) {
    var y = Nn(p);
    if (typeof y != "function") throw Error(C(150));
    if (p = y.call(p), p == null) throw Error(C(151));
    for (var S = y = null, z = d, j = d = 0, N = null, P = p.next(); z !== null && !P.done; j++, P = p.next()) {
      z.index > j ? (N = z, z = null) : N = z.sibling;
      var I = m(f, z, P.value, h);
      if (I === null) {
        z === null && (z = N);
        break;
      }
      e && z && I.alternate === null && t(f, z), d = o(I, d, j), S === null ? y = I : S.sibling = I, S = I, z = N;
    }
    if (P.done) return n(
      f,
      z
    ), Q && Tt(f, j), y;
    if (z === null) {
      for (; !P.done; j++, P = p.next()) P = g(f, P.value, h), P !== null && (d = o(P, d, j), S === null ? y = P : S.sibling = P, S = P);
      return Q && Tt(f, j), y;
    }
    for (z = r(f, z); !P.done; j++, P = p.next()) P = x(z, f, j, P.value, h), P !== null && (e && P.alternate !== null && z.delete(P.key === null ? j : P.key), d = o(P, d, j), S === null ? y = P : S.sibling = P, S = P);
    return e && z.forEach(function(R) {
      return t(f, R);
    }), Q && Tt(f, j), y;
  }
  function b(f, d, p, h) {
    if (typeof p == "object" && p !== null && p.type === Kt && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case xr:
          e: {
            for (var y = p.key, S = d; S !== null; ) {
              if (S.key === y) {
                if (y = p.type, y === Kt) {
                  if (S.tag === 7) {
                    n(f, S.sibling), d = l(S, p.props.children), d.return = f, f = d;
                    break e;
                  }
                } else if (S.elementType === y || typeof y == "object" && y !== null && y.$$typeof === st && Is(y) === S.type) {
                  n(f, S.sibling), d = l(S, p.props), d.ref = En(f, S, p), d.return = f, f = d;
                  break e;
                }
                n(f, S);
                break;
              } else t(f, S);
              S = S.sibling;
            }
            p.type === Kt ? (d = Dt(p.props.children, f.mode, h, p.key), d.return = f, f = d) : (h = Kr(p.type, p.key, p.props, null, f.mode, h), h.ref = En(f, d, p), h.return = f, f = h);
          }
          return s(f);
        case Qt:
          e: {
            for (S = p.key; d !== null; ) {
              if (d.key === S) if (d.tag === 4 && d.stateNode.containerInfo === p.containerInfo && d.stateNode.implementation === p.implementation) {
                n(f, d.sibling), d = l(d, p.children || []), d.return = f, f = d;
                break e;
              } else {
                n(f, d);
                break;
              }
              else t(f, d);
              d = d.sibling;
            }
            d = uo(p, f.mode, h), d.return = f, f = d;
          }
          return s(f);
        case st:
          return S = p._init, b(f, d, S(p._payload), h);
      }
      if (Ln(p)) return w(f, d, p, h);
      if (Nn(p)) return k(f, d, p, h);
      zr(f, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, d !== null && d.tag === 6 ? (n(f, d.sibling), d = l(d, p), d.return = f, f = d) : (n(f, d), d = ao(p, f.mode, h), d.return = f, f = d), s(f)) : n(f, d);
  }
  return b;
}
var hn = Tu(!0), $u = Tu(!1), ul = St(null), cl = null, tn = null, Ei = null;
function zi() {
  Ei = tn = cl = null;
}
function Ti(e) {
  var t = ul.current;
  V(ul), e._currentValue = t;
}
function Ao(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function un(e, t) {
  cl = e, Ei = tn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (we = !0), e.firstContext = null);
}
function Me(e) {
  var t = e._currentValue;
  if (Ei !== e) if (e = { context: e, memoizedValue: t, next: null }, tn === null) {
    if (cl === null) throw Error(C(308));
    tn = e, cl.dependencies = { lanes: 0, firstContext: e };
  } else tn = tn.next = e;
  return t;
}
var Lt = null;
function $i(e) {
  Lt === null ? Lt = [e] : Lt.push(e);
}
function Pu(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, $i(t)) : (n.next = l.next, l.next = n), t.interleaved = n, nt(e, r);
}
function nt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var at = !1;
function Pi(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Lu(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function qe(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function vt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, A & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, nt(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, $i(r)) : (t.next = l.next, l.next = t), r.interleaved = t, nt(e, n);
}
function Ur(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, vi(e, n);
  }
}
function As(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, o = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var s = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        o === null ? l = o = s : o = o.next = s, n = n.next;
      } while (n !== null);
      o === null ? l = o = t : o = o.next = t;
    } else l = o = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function dl(e, t, n, r) {
  var l = e.updateQueue;
  at = !1;
  var o = l.firstBaseUpdate, s = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var u = a, c = u.next;
    u.next = null, s === null ? o = c : s.next = c, s = u;
    var v = e.alternate;
    v !== null && (v = v.updateQueue, a = v.lastBaseUpdate, a !== s && (a === null ? v.firstBaseUpdate = c : a.next = c, v.lastBaseUpdate = u));
  }
  if (o !== null) {
    var g = l.baseState;
    s = 0, v = c = u = null, a = o;
    do {
      var m = a.lane, x = a.eventTime;
      if ((r & m) === m) {
        v !== null && (v = v.next = {
          eventTime: x,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var w = e, k = a;
          switch (m = t, x = n, k.tag) {
            case 1:
              if (w = k.payload, typeof w == "function") {
                g = w.call(x, g, m);
                break e;
              }
              g = w;
              break e;
            case 3:
              w.flags = w.flags & -65537 | 128;
            case 0:
              if (w = k.payload, m = typeof w == "function" ? w.call(x, g, m) : w, m == null) break e;
              g = G({}, g, m);
              break e;
            case 2:
              at = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, m = l.effects, m === null ? l.effects = [a] : m.push(a));
      } else x = { eventTime: x, lane: m, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, v === null ? (c = v = x, u = g) : v = v.next = x, s |= m;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        m = a, a = m.next, m.next = null, l.lastBaseUpdate = m, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (u = g), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = v, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        s |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Ut |= s, e.lanes = s, e.memoizedState = g;
  }
}
function Us(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(C(191, l));
      l.call(r);
    }
  }
}
var hr = {}, Ye = St(hr), lr = St(hr), or = St(hr);
function Mt(e) {
  if (e === hr) throw Error(C(174));
  return e;
}
function Li(e, t) {
  switch (W(or, t), W(lr, e), W(Ye, hr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : wo(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = wo(t, e);
  }
  V(Ye), W(Ye, t);
}
function mn() {
  V(Ye), V(lr), V(or);
}
function Mu(e) {
  Mt(or.current);
  var t = Mt(Ye.current), n = wo(t, e.type);
  t !== n && (W(lr, e), W(Ye, n));
}
function Mi(e) {
  lr.current === e && (V(Ye), V(lr));
}
var K = St(0);
function pl(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var no = [];
function Ri() {
  for (var e = 0; e < no.length; e++) no[e]._workInProgressVersionPrimary = null;
  no.length = 0;
}
var Br = lt.ReactCurrentDispatcher, ro = lt.ReactCurrentBatchConfig, At = 0, Y = null, ee = null, le = null, fl = !1, Un = !1, ir = 0, Mp = 0;
function ue() {
  throw Error(C(321));
}
function Fi(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Be(e[n], t[n])) return !1;
  return !0;
}
function Di(e, t, n, r, l, o) {
  if (At = o, Y = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Br.current = e === null || e.memoizedState === null ? Op : Ip, e = n(r, l), Un) {
    o = 0;
    do {
      if (Un = !1, ir = 0, 25 <= o) throw Error(C(301));
      o += 1, le = ee = null, t.updateQueue = null, Br.current = Ap, e = n(r, l);
    } while (Un);
  }
  if (Br.current = hl, t = ee !== null && ee.next !== null, At = 0, le = ee = Y = null, fl = !1, t) throw Error(C(300));
  return e;
}
function Oi() {
  var e = ir !== 0;
  return ir = 0, e;
}
function Ve() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return le === null ? Y.memoizedState = le = e : le = le.next = e, le;
}
function Re() {
  if (ee === null) {
    var e = Y.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ee.next;
  var t = le === null ? Y.memoizedState : le.next;
  if (t !== null) le = t, ee = e;
  else {
    if (e === null) throw Error(C(310));
    ee = e, e = { memoizedState: ee.memoizedState, baseState: ee.baseState, baseQueue: ee.baseQueue, queue: ee.queue, next: null }, le === null ? Y.memoizedState = le = e : le = le.next = e;
  }
  return le;
}
function sr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function lo(e) {
  var t = Re(), n = t.queue;
  if (n === null) throw Error(C(311));
  n.lastRenderedReducer = e;
  var r = ee, l = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var s = l.next;
      l.next = o.next, o.next = s;
    }
    r.baseQueue = l = o, n.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var a = s = null, u = null, c = o;
    do {
      var v = c.lane;
      if ((At & v) === v) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var g = {
          lane: v,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (a = u = g, s = r) : u = u.next = g, Y.lanes |= v, Ut |= v;
      }
      c = c.next;
    } while (c !== null && c !== o);
    u === null ? s = r : u.next = a, Be(r, t.memoizedState) || (we = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, Y.lanes |= o, Ut |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function oo(e) {
  var t = Re(), n = t.queue;
  if (n === null) throw Error(C(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var s = l = l.next;
    do
      o = e(o, s.action), s = s.next;
    while (s !== l);
    Be(o, t.memoizedState) || (we = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function Ru() {
}
function Fu(e, t) {
  var n = Y, r = Re(), l = t(), o = !Be(r.memoizedState, l);
  if (o && (r.memoizedState = l, we = !0), r = r.queue, Ii(Iu.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || le !== null && le.memoizedState.tag & 1) {
    if (n.flags |= 2048, ar(9, Ou.bind(null, n, r, l, t), void 0, null), oe === null) throw Error(C(349));
    At & 30 || Du(n, t, l);
  }
  return l;
}
function Du(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Y.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Y.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Ou(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Au(t) && Uu(e);
}
function Iu(e, t, n) {
  return n(function() {
    Au(t) && Uu(e);
  });
}
function Au(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Be(e, n);
  } catch {
    return !0;
  }
}
function Uu(e) {
  var t = nt(e, 1);
  t !== null && Ue(t, e, 1, -1);
}
function Bs(e) {
  var t = Ve();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: sr, lastRenderedState: e }, t.queue = e, e = e.dispatch = Dp.bind(null, Y, e), [t.memoizedState, e];
}
function ar(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Y.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Y.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Bu() {
  return Re().memoizedState;
}
function Wr(e, t, n, r) {
  var l = Ve();
  Y.flags |= e, l.memoizedState = ar(1 | t, n, void 0, r === void 0 ? null : r);
}
function El(e, t, n, r) {
  var l = Re();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ee !== null) {
    var s = ee.memoizedState;
    if (o = s.destroy, r !== null && Fi(r, s.deps)) {
      l.memoizedState = ar(t, n, o, r);
      return;
    }
  }
  Y.flags |= e, l.memoizedState = ar(1 | t, n, o, r);
}
function Ws(e, t) {
  return Wr(8390656, 8, e, t);
}
function Ii(e, t) {
  return El(2048, 8, e, t);
}
function Wu(e, t) {
  return El(4, 2, e, t);
}
function Hu(e, t) {
  return El(4, 4, e, t);
}
function Vu(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Qu(e, t, n) {
  return n = n != null ? n.concat([e]) : null, El(4, 4, Vu.bind(null, t, e), n);
}
function Ai() {
}
function Ku(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Fi(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Yu(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Fi(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Gu(e, t, n) {
  return At & 21 ? (Be(n, t) || (n = eu(), Y.lanes |= n, Ut |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, we = !0), e.memoizedState = n);
}
function Rp(e, t) {
  var n = U;
  U = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = ro.transition;
  ro.transition = {};
  try {
    e(!1), t();
  } finally {
    U = n, ro.transition = r;
  }
}
function Xu() {
  return Re().memoizedState;
}
function Fp(e, t, n) {
  var r = yt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Zu(e)) Ju(t, n);
  else if (n = Pu(e, t, n, r), n !== null) {
    var l = he();
    Ue(n, e, r, l), qu(n, t, r);
  }
}
function Dp(e, t, n) {
  var r = yt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Zu(e)) Ju(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var s = t.lastRenderedState, a = o(s, n);
      if (l.hasEagerState = !0, l.eagerState = a, Be(a, s)) {
        var u = t.interleaved;
        u === null ? (l.next = l, $i(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Pu(e, t, l, r), n !== null && (l = he(), Ue(n, e, r, l), qu(n, t, r));
  }
}
function Zu(e) {
  var t = e.alternate;
  return e === Y || t !== null && t === Y;
}
function Ju(e, t) {
  Un = fl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function qu(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, vi(e, n);
  }
}
var hl = { readContext: Me, useCallback: ue, useContext: ue, useEffect: ue, useImperativeHandle: ue, useInsertionEffect: ue, useLayoutEffect: ue, useMemo: ue, useReducer: ue, useRef: ue, useState: ue, useDebugValue: ue, useDeferredValue: ue, useTransition: ue, useMutableSource: ue, useSyncExternalStore: ue, useId: ue, unstable_isNewReconciler: !1 }, Op = { readContext: Me, useCallback: function(e, t) {
  return Ve().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Me, useEffect: Ws, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Wr(
    4194308,
    4,
    Vu.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Wr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Wr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ve();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ve();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Fp.bind(null, Y, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ve();
  return e = { current: e }, t.memoizedState = e;
}, useState: Bs, useDebugValue: Ai, useDeferredValue: function(e) {
  return Ve().memoizedState = e;
}, useTransition: function() {
  var e = Bs(!1), t = e[0];
  return e = Rp.bind(null, e[1]), Ve().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Y, l = Ve();
  if (Q) {
    if (n === void 0) throw Error(C(407));
    n = n();
  } else {
    if (n = t(), oe === null) throw Error(C(349));
    At & 30 || Du(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Ws(Iu.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, ar(9, Ou.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Ve(), t = oe.identifierPrefix;
  if (Q) {
    var n = Je, r = Ze;
    n = (r & ~(1 << 32 - Ae(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = ir++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Mp++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Ip = {
  readContext: Me,
  useCallback: Ku,
  useContext: Me,
  useEffect: Ii,
  useImperativeHandle: Qu,
  useInsertionEffect: Wu,
  useLayoutEffect: Hu,
  useMemo: Yu,
  useReducer: lo,
  useRef: Bu,
  useState: function() {
    return lo(sr);
  },
  useDebugValue: Ai,
  useDeferredValue: function(e) {
    var t = Re();
    return Gu(t, ee.memoizedState, e);
  },
  useTransition: function() {
    var e = lo(sr)[0], t = Re().memoizedState;
    return [e, t];
  },
  useMutableSource: Ru,
  useSyncExternalStore: Fu,
  useId: Xu,
  unstable_isNewReconciler: !1
}, Ap = { readContext: Me, useCallback: Ku, useContext: Me, useEffect: Ii, useImperativeHandle: Qu, useInsertionEffect: Wu, useLayoutEffect: Hu, useMemo: Yu, useReducer: oo, useRef: Bu, useState: function() {
  return oo(sr);
}, useDebugValue: Ai, useDeferredValue: function(e) {
  var t = Re();
  return ee === null ? t.memoizedState = e : Gu(t, ee.memoizedState, e);
}, useTransition: function() {
  var e = oo(sr)[0], t = Re().memoizedState;
  return [e, t];
}, useMutableSource: Ru, useSyncExternalStore: Fu, useId: Xu, unstable_isNewReconciler: !1 };
function De(e, t) {
  if (e && e.defaultProps) {
    t = G({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Uo(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : G({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var zl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Ht(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), l = yt(e), o = qe(r, l);
  o.payload = t, n != null && (o.callback = n), t = vt(e, o, l), t !== null && (Ue(t, e, l, r), Ur(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), l = yt(e), o = qe(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = vt(e, o, l), t !== null && (Ue(t, e, l, r), Ur(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = he(), r = yt(e), l = qe(n, r);
  l.tag = 2, t != null && (l.callback = t), t = vt(e, l, r), t !== null && (Ue(t, e, r, n), Ur(t, e, r));
} };
function Hs(e, t, n, r, l, o, s) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, s) : t.prototype && t.prototype.isPureReactComponent ? !er(n, r) || !er(l, o) : !0;
}
function ec(e, t, n) {
  var r = !1, l = jt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Me(o) : (l = je(t) ? Ot : pe.current, r = t.contextTypes, o = (r = r != null) ? pn(e, l) : jt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = zl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Vs(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && zl.enqueueReplaceState(t, t.state, null);
}
function Bo(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Pi(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = Me(o) : (o = je(t) ? Ot : pe.current, l.context = pn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Uo(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && zl.enqueueReplaceState(l, l.state, null), dl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function gn(e, t) {
  try {
    var n = "", r = t;
    do
      n += hd(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function io(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Wo(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Up = typeof WeakMap == "function" ? WeakMap : Map;
function tc(e, t, n) {
  n = qe(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    gl || (gl = !0, qo = r), Wo(e, t);
  }, n;
}
function nc(e, t, n) {
  n = qe(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Wo(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Wo(e, t), typeof r != "function" && (xt === null ? xt = /* @__PURE__ */ new Set([this]) : xt.add(this));
    var s = t.stack;
    this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
  }), n;
}
function Qs(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Up();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = tf.bind(null, e, t, n), t.then(e, e));
}
function Ks(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ys(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = qe(-1, 1), t.tag = 2, vt(n, t, 1))), n.lanes |= 1), e);
}
var Bp = lt.ReactCurrentOwner, we = !1;
function fe(e, t, n, r) {
  t.child = e === null ? $u(t, null, n, r) : hn(t, e.child, n, r);
}
function Gs(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return un(t, l), r = Di(e, t, n, r, o, l), n = Oi(), e !== null && !we ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, rt(e, t, l)) : (Q && n && _i(t), t.flags |= 1, fe(e, t, r, l), t.child);
}
function Xs(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Yi(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, rc(e, t, o, r, l)) : (e = Kr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var s = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : er, n(s, r) && e.ref === t.ref) return rt(e, t, l);
  }
  return t.flags |= 1, e = wt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function rc(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (er(o, r) && e.ref === t.ref) if (we = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (we = !0);
    else return t.lanes = e.lanes, rt(e, t, l);
  }
  return Ho(e, t, n, r, l);
}
function lc(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, W(rn, Se), Se |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, W(rn, Se), Se |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, W(rn, Se), Se |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, W(rn, Se), Se |= r;
  return fe(e, t, l, n), t.child;
}
function oc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ho(e, t, n, r, l) {
  var o = je(n) ? Ot : pe.current;
  return o = pn(t, o), un(t, l), n = Di(e, t, n, r, o, l), r = Oi(), e !== null && !we ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, rt(e, t, l)) : (Q && r && _i(t), t.flags |= 1, fe(e, t, n, l), t.child);
}
function Zs(e, t, n, r, l) {
  if (je(n)) {
    var o = !0;
    il(t);
  } else o = !1;
  if (un(t, l), t.stateNode === null) Hr(e, t), ec(t, n, r), Bo(t, n, r, l), r = !0;
  else if (e === null) {
    var s = t.stateNode, a = t.memoizedProps;
    s.props = a;
    var u = s.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Me(c) : (c = je(n) ? Ot : pe.current, c = pn(t, c));
    var v = n.getDerivedStateFromProps, g = typeof v == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    g || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== r || u !== c) && Vs(t, s, r, c), at = !1;
    var m = t.memoizedState;
    s.state = m, dl(t, r, s, l), u = t.memoizedState, a !== r || m !== u || ke.current || at ? (typeof v == "function" && (Uo(t, n, v, r), u = t.memoizedState), (a = at || Hs(t, n, a, r, m, u, c)) ? (g || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), s.props = r, s.state = u, s.context = c, r = a) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    s = t.stateNode, Lu(e, t), a = t.memoizedProps, c = t.type === t.elementType ? a : De(t.type, a), s.props = c, g = t.pendingProps, m = s.context, u = n.contextType, typeof u == "object" && u !== null ? u = Me(u) : (u = je(n) ? Ot : pe.current, u = pn(t, u));
    var x = n.getDerivedStateFromProps;
    (v = typeof x == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== g || m !== u) && Vs(t, s, r, u), at = !1, m = t.memoizedState, s.state = m, dl(t, r, s, l);
    var w = t.memoizedState;
    a !== g || m !== w || ke.current || at ? (typeof x == "function" && (Uo(t, n, x, r), w = t.memoizedState), (c = at || Hs(t, n, c, r, m, w, u) || !1) ? (v || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, w, u), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, w, u)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = w), s.props = r, s.state = w, s.context = u, r = c) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Vo(e, t, n, r, o, l);
}
function Vo(e, t, n, r, l, o) {
  oc(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return l && Fs(t, n, !1), rt(e, t, o);
  r = t.stateNode, Bp.current = t;
  var a = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && s ? (t.child = hn(t, e.child, null, o), t.child = hn(t, null, a, o)) : fe(e, t, a, o), t.memoizedState = r.state, l && Fs(t, n, !0), t.child;
}
function ic(e) {
  var t = e.stateNode;
  t.pendingContext ? Rs(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Rs(e, t.context, !1), Li(e, t.containerInfo);
}
function Js(e, t, n, r, l) {
  return fn(), Ci(l), t.flags |= 256, fe(e, t, n, r), t.child;
}
var Qo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ko(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function sc(e, t, n) {
  var r = t.pendingProps, l = K.current, o = !1, s = (t.flags & 128) !== 0, a;
  if ((a = s) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), W(K, l & 1), e === null)
    return Io(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, s = { mode: "hidden", children: s }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = s) : o = Pl(s, r, 0, null), e = Dt(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Ko(n), t.memoizedState = Qo, e) : Ui(t, s));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return Wp(e, t, s, r, a, l, n);
  if (o) {
    o = r.fallback, s = t.mode, l = e.child, a = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(s & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = wt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? o = wt(a, o) : (o = Dt(o, s, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, s = e.child.memoizedState, s = s === null ? Ko(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }, o.memoizedState = s, o.childLanes = e.childLanes & ~n, t.memoizedState = Qo, r;
  }
  return o = e.child, e = o.sibling, r = wt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Ui(e, t) {
  return t = Pl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Tr(e, t, n, r) {
  return r !== null && Ci(r), hn(t, e.child, null, n), e = Ui(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Wp(e, t, n, r, l, o, s) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = io(Error(C(422))), Tr(e, t, s, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Pl({ mode: "visible", children: r.children }, l, 0, null), o = Dt(o, l, s, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && hn(t, e.child, null, s), t.child.memoizedState = Ko(s), t.memoizedState = Qo, o);
  if (!(t.mode & 1)) return Tr(e, t, s, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, o = Error(C(419)), r = io(o, r, void 0), Tr(e, t, s, r);
  }
  if (a = (s & e.childLanes) !== 0, we || a) {
    if (r = oe, r !== null) {
      switch (s & -s) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      l = l & (r.suspendedLanes | s) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, nt(e, l), Ue(r, e, l, -1));
    }
    return Ki(), r = io(Error(C(421))), Tr(e, t, s, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = nf.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, _e = gt(l.nextSibling), be = t, Q = !0, Ie = null, e !== null && (Te[$e++] = Ze, Te[$e++] = Je, Te[$e++] = It, Ze = e.id, Je = e.overflow, It = t), t = Ui(t, r.children), t.flags |= 4096, t);
}
function qs(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ao(e.return, t, n);
}
function so(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function ac(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (fe(e, t, r.children, n), r = K.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && qs(e, n, t);
      else if (e.tag === 19) qs(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if (W(K, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && pl(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), so(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && pl(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      so(t, !0, n, null, o);
      break;
    case "together":
      so(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Hr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function rt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Ut |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(C(153));
  if (t.child !== null) {
    for (e = t.child, n = wt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = wt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Hp(e, t, n) {
  switch (t.tag) {
    case 3:
      ic(t), fn();
      break;
    case 5:
      Mu(t);
      break;
    case 1:
      je(t.type) && il(t);
      break;
    case 4:
      Li(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      W(ul, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (W(K, K.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? sc(e, t, n) : (W(K, K.current & 1), e = rt(e, t, n), e !== null ? e.sibling : null);
      W(K, K.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return ac(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), W(K, K.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, lc(e, t, n);
  }
  return rt(e, t, n);
}
var uc, Yo, cc, dc;
uc = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
Yo = function() {
};
cc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Mt(Ye.current);
    var o = null;
    switch (n) {
      case "input":
        l = go(e, l), r = go(e, r), o = [];
        break;
      case "select":
        l = G({}, l, { value: void 0 }), r = G({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = yo(e, l), r = yo(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ll);
    }
    ko(n, r);
    var s;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var a = l[c];
      for (s in a) a.hasOwnProperty(s) && (n || (n = {}), n[s] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Kn.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (a = l != null ? l[c] : void 0, r.hasOwnProperty(c) && u !== a && (u != null || a != null)) if (c === "style") if (a) {
        for (s in a) !a.hasOwnProperty(s) || u && u.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
        for (s in u) u.hasOwnProperty(s) && a[s] !== u[s] && (n || (n = {}), n[s] = u[s]);
      } else n || (o || (o = []), o.push(
        c,
        n
      )), n = u;
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, a = a ? a.__html : void 0, u != null && a !== u && (o = o || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Kn.hasOwnProperty(c) ? (u != null && c === "onScroll" && H("scroll", e), o || a === u || (o = [])) : (o = o || []).push(c, u));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
dc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function zn(e, t) {
  if (!Q) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function ce(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Vp(e, t, n) {
  var r = t.pendingProps;
  switch (bi(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ce(t), null;
    case 1:
      return je(t.type) && ol(), ce(t), null;
    case 3:
      return r = t.stateNode, mn(), V(ke), V(pe), Ri(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Er(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ie !== null && (ni(Ie), Ie = null))), Yo(e, t), ce(t), null;
    case 5:
      Mi(t);
      var l = Mt(or.current);
      if (n = t.type, e !== null && t.stateNode != null) cc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(C(166));
          return ce(t), null;
        }
        if (e = Mt(Ye.current), Er(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Qe] = t, r[rr] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              H("cancel", r), H("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              H("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Rn.length; l++) H(Rn[l], r);
              break;
            case "source":
              H("error", r);
              break;
            case "img":
            case "image":
            case "link":
              H(
                "error",
                r
              ), H("load", r);
              break;
            case "details":
              H("toggle", r);
              break;
            case "input":
              as(r, o), H("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, H("invalid", r);
              break;
            case "textarea":
              cs(r, o), H("invalid", r);
          }
          ko(n, o), l = null;
          for (var s in o) if (o.hasOwnProperty(s)) {
            var a = o[s];
            s === "children" ? typeof a == "string" ? r.textContent !== a && (o.suppressHydrationWarning !== !0 && Cr(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (o.suppressHydrationWarning !== !0 && Cr(
              r.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Kn.hasOwnProperty(s) && a != null && s === "onScroll" && H("scroll", r);
          }
          switch (n) {
            case "input":
              yr(r), us(r, o, !0);
              break;
            case "textarea":
              yr(r), ds(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = ll);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          s = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ia(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = s.createElement(n, { is: r.is }) : (e = s.createElement(n), n === "select" && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[Qe] = t, e[rr] = r, uc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (s = jo(n, r), n) {
              case "dialog":
                H("cancel", e), H("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                H("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Rn.length; l++) H(Rn[l], e);
                l = r;
                break;
              case "source":
                H("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                H(
                  "error",
                  e
                ), H("load", e), l = r;
                break;
              case "details":
                H("toggle", e), l = r;
                break;
              case "input":
                as(e, r), l = go(e, r), H("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = G({}, r, { value: void 0 }), H("invalid", e);
                break;
              case "textarea":
                cs(e, r), l = yo(e, r), H("invalid", e);
                break;
              default:
                l = r;
            }
            ko(n, l), a = l;
            for (o in a) if (a.hasOwnProperty(o)) {
              var u = a[o];
              o === "style" ? Ba(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Aa(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Yn(e, u) : typeof u == "number" && Yn(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Kn.hasOwnProperty(o) ? u != null && o === "onScroll" && H("scroll", e) : u != null && di(e, o, u, s));
            }
            switch (n) {
              case "input":
                yr(e), us(e, r, !1);
                break;
              case "textarea":
                yr(e), ds(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + kt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? ln(e, !!r.multiple, o, !1) : r.defaultValue != null && ln(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = ll);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return ce(t), null;
    case 6:
      if (e && t.stateNode != null) dc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(C(166));
        if (n = Mt(or.current), Mt(Ye.current), Er(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Qe] = t, (o = r.nodeValue !== n) && (e = be, e !== null)) switch (e.tag) {
            case 3:
              Cr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Cr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Qe] = t, t.stateNode = r;
      }
      return ce(t), null;
    case 13:
      if (V(K), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Q && _e !== null && t.mode & 1 && !(t.flags & 128)) zu(), fn(), t.flags |= 98560, o = !1;
        else if (o = Er(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(C(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(C(317));
            o[Qe] = t;
          } else fn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ce(t), o = !1;
        } else Ie !== null && (ni(Ie), Ie = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || K.current & 1 ? te === 0 && (te = 3) : Ki())), t.updateQueue !== null && (t.flags |= 4), ce(t), null);
    case 4:
      return mn(), Yo(e, t), e === null && tr(t.stateNode.containerInfo), ce(t), null;
    case 10:
      return Ti(t.type._context), ce(t), null;
    case 17:
      return je(t.type) && ol(), ce(t), null;
    case 19:
      if (V(K), o = t.memoizedState, o === null) return ce(t), null;
      if (r = (t.flags & 128) !== 0, s = o.rendering, s === null) if (r) zn(o, !1);
      else {
        if (te !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (s = pl(e), s !== null) {
            for (t.flags |= 128, zn(o, !1), r = s.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, s = o.alternate, s === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = s.childLanes, o.lanes = s.lanes, o.child = s.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = s.memoizedProps, o.memoizedState = s.memoizedState, o.updateQueue = s.updateQueue, o.type = s.type, e = s.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return W(K, K.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && Z() > vn && (t.flags |= 128, r = !0, zn(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = pl(s), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), zn(o, !0), o.tail === null && o.tailMode === "hidden" && !s.alternate && !Q) return ce(t), null;
        } else 2 * Z() - o.renderingStartTime > vn && n !== 1073741824 && (t.flags |= 128, r = !0, zn(o, !1), t.lanes = 4194304);
        o.isBackwards ? (s.sibling = t.child, t.child = s) : (n = o.last, n !== null ? n.sibling = s : t.child = s, o.last = s);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Z(), t.sibling = null, n = K.current, W(K, r ? n & 1 | 2 : n & 1), t) : (ce(t), null);
    case 22:
    case 23:
      return Qi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Se & 1073741824 && (ce(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ce(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(C(156, t.tag));
}
function Qp(e, t) {
  switch (bi(t), t.tag) {
    case 1:
      return je(t.type) && ol(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return mn(), V(ke), V(pe), Ri(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Mi(t), null;
    case 13:
      if (V(K), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(C(340));
        fn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return V(K), null;
    case 4:
      return mn(), null;
    case 10:
      return Ti(t.type._context), null;
    case 22:
    case 23:
      return Qi(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var $r = !1, de = !1, Kp = typeof WeakSet == "function" ? WeakSet : Set, L = null;
function nn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    X(e, t, r);
  }
  else n.current = null;
}
function Go(e, t, n) {
  try {
    n();
  } catch (r) {
    X(e, t, r);
  }
}
var ea = !1;
function Yp(e, t) {
  if (Po = tl, e = gu(), Si(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var l = r.anchorOffset, o = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, o.nodeType;
        } catch {
          n = null;
          break e;
        }
        var s = 0, a = -1, u = -1, c = 0, v = 0, g = e, m = null;
        t: for (; ; ) {
          for (var x; g !== n || l !== 0 && g.nodeType !== 3 || (a = s + l), g !== o || r !== 0 && g.nodeType !== 3 || (u = s + r), g.nodeType === 3 && (s += g.nodeValue.length), (x = g.firstChild) !== null; )
            m = g, g = x;
          for (; ; ) {
            if (g === e) break t;
            if (m === n && ++c === l && (a = s), m === o && ++v === r && (u = s), (x = g.nextSibling) !== null) break;
            g = m, m = g.parentNode;
          }
          g = x;
        }
        n = a === -1 || u === -1 ? null : { start: a, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Lo = { focusedElem: e, selectionRange: n }, tl = !1, L = t; L !== null; ) if (t = L, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, L = e;
  else for (; L !== null; ) {
    t = L;
    try {
      var w = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (w !== null) {
            var k = w.memoizedProps, b = w.memoizedState, f = t.stateNode, d = f.getSnapshotBeforeUpdate(t.elementType === t.type ? k : De(t.type, k), b);
            f.__reactInternalSnapshotBeforeUpdate = d;
          }
          break;
        case 3:
          var p = t.stateNode.containerInfo;
          p.nodeType === 1 ? p.textContent = "" : p.nodeType === 9 && p.documentElement && p.removeChild(p.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(C(163));
      }
    } catch (h) {
      X(t, t.return, h);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, L = e;
      break;
    }
    L = t.return;
  }
  return w = ea, ea = !1, w;
}
function Bn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Go(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Tl(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Xo(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function pc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, pc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Qe], delete t[rr], delete t[Fo], delete t[Tp], delete t[$p])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function fc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ta(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || fc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Zo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ll));
  else if (r !== 4 && (e = e.child, e !== null)) for (Zo(e, t, n), e = e.sibling; e !== null; ) Zo(e, t, n), e = e.sibling;
}
function Jo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Jo(e, t, n), e = e.sibling; e !== null; ) Jo(e, t, n), e = e.sibling;
}
var ie = null, Oe = !1;
function it(e, t, n) {
  for (n = n.child; n !== null; ) hc(e, t, n), n = n.sibling;
}
function hc(e, t, n) {
  if (Ke && typeof Ke.onCommitFiberUnmount == "function") try {
    Ke.onCommitFiberUnmount(jl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      de || nn(n, t);
    case 6:
      var r = ie, l = Oe;
      ie = null, it(e, t, n), ie = r, Oe = l, ie !== null && (Oe ? (e = ie, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ie.removeChild(n.stateNode));
      break;
    case 18:
      ie !== null && (Oe ? (e = ie, n = n.stateNode, e.nodeType === 8 ? eo(e.parentNode, n) : e.nodeType === 1 && eo(e, n), Jn(e)) : eo(ie, n.stateNode));
      break;
    case 4:
      r = ie, l = Oe, ie = n.stateNode.containerInfo, Oe = !0, it(e, t, n), ie = r, Oe = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!de && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, s = o.destroy;
          o = o.tag, s !== void 0 && (o & 2 || o & 4) && Go(n, t, s), l = l.next;
        } while (l !== r);
      }
      it(e, t, n);
      break;
    case 1:
      if (!de && (nn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        X(n, t, a);
      }
      it(e, t, n);
      break;
    case 21:
      it(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (de = (r = de) || n.memoizedState !== null, it(e, t, n), de = r) : it(e, t, n);
      break;
    default:
      it(e, t, n);
  }
}
function na(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Kp()), t.forEach(function(r) {
      var l = rf.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Fe(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, s = t, a = s;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            ie = a.stateNode, Oe = !1;
            break e;
          case 3:
            ie = a.stateNode.containerInfo, Oe = !0;
            break e;
          case 4:
            ie = a.stateNode.containerInfo, Oe = !0;
            break e;
        }
        a = a.return;
      }
      if (ie === null) throw Error(C(160));
      hc(o, s, l), ie = null, Oe = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (c) {
      X(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) mc(t, e), t = t.sibling;
}
function mc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Fe(t, e), He(e), r & 4) {
        try {
          Bn(3, e, e.return), Tl(3, e);
        } catch (k) {
          X(e, e.return, k);
        }
        try {
          Bn(5, e, e.return);
        } catch (k) {
          X(e, e.return, k);
        }
      }
      break;
    case 1:
      Fe(t, e), He(e), r & 512 && n !== null && nn(n, n.return);
      break;
    case 5:
      if (Fe(t, e), He(e), r & 512 && n !== null && nn(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Yn(l, "");
        } catch (k) {
          X(e, e.return, k);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, s = n !== null ? n.memoizedProps : o, a = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          a === "input" && o.type === "radio" && o.name != null && Da(l, o), jo(a, s);
          var c = jo(a, o);
          for (s = 0; s < u.length; s += 2) {
            var v = u[s], g = u[s + 1];
            v === "style" ? Ba(l, g) : v === "dangerouslySetInnerHTML" ? Aa(l, g) : v === "children" ? Yn(l, g) : di(l, v, g, c);
          }
          switch (a) {
            case "input":
              vo(l, o);
              break;
            case "textarea":
              Oa(l, o);
              break;
            case "select":
              var m = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var x = o.value;
              x != null ? ln(l, !!o.multiple, x, !1) : m !== !!o.multiple && (o.defaultValue != null ? ln(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : ln(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[rr] = o;
        } catch (k) {
          X(e, e.return, k);
        }
      }
      break;
    case 6:
      if (Fe(t, e), He(e), r & 4) {
        if (e.stateNode === null) throw Error(C(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (k) {
          X(e, e.return, k);
        }
      }
      break;
    case 3:
      if (Fe(t, e), He(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Jn(t.containerInfo);
      } catch (k) {
        X(e, e.return, k);
      }
      break;
    case 4:
      Fe(t, e), He(e);
      break;
    case 13:
      Fe(t, e), He(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Hi = Z())), r & 4 && na(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (de = (c = de) || v, Fe(t, e), de = c) : Fe(t, e), He(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !v && e.mode & 1) for (L = e, v = e.child; v !== null; ) {
          for (g = L = v; L !== null; ) {
            switch (m = L, x = m.child, m.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Bn(4, m, m.return);
                break;
              case 1:
                nn(m, m.return);
                var w = m.stateNode;
                if (typeof w.componentWillUnmount == "function") {
                  r = m, n = m.return;
                  try {
                    t = r, w.props = t.memoizedProps, w.state = t.memoizedState, w.componentWillUnmount();
                  } catch (k) {
                    X(r, n, k);
                  }
                }
                break;
              case 5:
                nn(m, m.return);
                break;
              case 22:
                if (m.memoizedState !== null) {
                  la(g);
                  continue;
                }
            }
            x !== null ? (x.return = m, L = x) : la(g);
          }
          v = v.sibling;
        }
        e: for (v = null, g = e; ; ) {
          if (g.tag === 5) {
            if (v === null) {
              v = g;
              try {
                l = g.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (a = g.stateNode, u = g.memoizedProps.style, s = u != null && u.hasOwnProperty("display") ? u.display : null, a.style.display = Ua("display", s));
              } catch (k) {
                X(e, e.return, k);
              }
            }
          } else if (g.tag === 6) {
            if (v === null) try {
              g.stateNode.nodeValue = c ? "" : g.memoizedProps;
            } catch (k) {
              X(e, e.return, k);
            }
          } else if ((g.tag !== 22 && g.tag !== 23 || g.memoizedState === null || g === e) && g.child !== null) {
            g.child.return = g, g = g.child;
            continue;
          }
          if (g === e) break e;
          for (; g.sibling === null; ) {
            if (g.return === null || g.return === e) break e;
            v === g && (v = null), g = g.return;
          }
          v === g && (v = null), g.sibling.return = g.return, g = g.sibling;
        }
      }
      break;
    case 19:
      Fe(t, e), He(e), r & 4 && na(e);
      break;
    case 21:
      break;
    default:
      Fe(
        t,
        e
      ), He(e);
  }
}
function He(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (fc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(C(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Yn(l, ""), r.flags &= -33);
          var o = ta(e);
          Jo(e, o, l);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo, a = ta(e);
          Zo(e, a, s);
          break;
        default:
          throw Error(C(161));
      }
    } catch (u) {
      X(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Gp(e, t, n) {
  L = e, gc(e);
}
function gc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; L !== null; ) {
    var l = L, o = l.child;
    if (l.tag === 22 && r) {
      var s = l.memoizedState !== null || $r;
      if (!s) {
        var a = l.alternate, u = a !== null && a.memoizedState !== null || de;
        a = $r;
        var c = de;
        if ($r = s, (de = u) && !c) for (L = l; L !== null; ) s = L, u = s.child, s.tag === 22 && s.memoizedState !== null ? oa(l) : u !== null ? (u.return = s, L = u) : oa(l);
        for (; o !== null; ) L = o, gc(o), o = o.sibling;
        L = l, $r = a, de = c;
      }
      ra(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, L = o) : ra(e);
  }
}
function ra(e) {
  for (; L !== null; ) {
    var t = L;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            de || Tl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !de) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : De(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Us(t, o, r);
            break;
          case 3:
            var s = t.updateQueue;
            if (s !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              Us(t, s, n);
            }
            break;
          case 5:
            var a = t.stateNode;
            if (n === null && t.flags & 4) {
              n = a;
              var u = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  u.autoFocus && n.focus();
                  break;
                case "img":
                  u.src && (n.src = u.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var c = t.alternate;
              if (c !== null) {
                var v = c.memoizedState;
                if (v !== null) {
                  var g = v.dehydrated;
                  g !== null && Jn(g);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(C(163));
        }
        de || t.flags & 512 && Xo(t);
      } catch (m) {
        X(t, t.return, m);
      }
    }
    if (t === e) {
      L = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, L = n;
      break;
    }
    L = t.return;
  }
}
function la(e) {
  for (; L !== null; ) {
    var t = L;
    if (t === e) {
      L = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, L = n;
      break;
    }
    L = t.return;
  }
}
function oa(e) {
  for (; L !== null; ) {
    var t = L;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Tl(4, t);
          } catch (u) {
            X(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              X(t, l, u);
            }
          }
          var o = t.return;
          try {
            Xo(t);
          } catch (u) {
            X(t, o, u);
          }
          break;
        case 5:
          var s = t.return;
          try {
            Xo(t);
          } catch (u) {
            X(t, s, u);
          }
      }
    } catch (u) {
      X(t, t.return, u);
    }
    if (t === e) {
      L = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, L = a;
      break;
    }
    L = t.return;
  }
}
var Xp = Math.ceil, ml = lt.ReactCurrentDispatcher, Bi = lt.ReactCurrentOwner, Le = lt.ReactCurrentBatchConfig, A = 0, oe = null, q = null, se = 0, Se = 0, rn = St(0), te = 0, ur = null, Ut = 0, $l = 0, Wi = 0, Wn = null, ye = null, Hi = 0, vn = 1 / 0, Ge = null, gl = !1, qo = null, xt = null, Pr = !1, pt = null, vl = 0, Hn = 0, ei = null, Vr = -1, Qr = 0;
function he() {
  return A & 6 ? Z() : Vr !== -1 ? Vr : Vr = Z();
}
function yt(e) {
  return e.mode & 1 ? A & 2 && se !== 0 ? se & -se : Lp.transition !== null ? (Qr === 0 && (Qr = eu()), Qr) : (e = U, e !== 0 || (e = window.event, e = e === void 0 ? 16 : su(e.type)), e) : 1;
}
function Ue(e, t, n, r) {
  if (50 < Hn) throw Hn = 0, ei = null, Error(C(185));
  dr(e, n, r), (!(A & 2) || e !== oe) && (e === oe && (!(A & 2) && ($l |= n), te === 4 && ct(e, se)), Ne(e, r), n === 1 && A === 0 && !(t.mode & 1) && (vn = Z() + 500, Cl && _t()));
}
function Ne(e, t) {
  var n = e.callbackNode;
  Ld(e, t);
  var r = el(e, e === oe ? se : 0);
  if (r === 0) n !== null && hs(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && hs(n), t === 1) e.tag === 0 ? Pp(ia.bind(null, e)) : bu(ia.bind(null, e)), Ep(function() {
      !(A & 6) && _t();
    }), n = null;
    else {
      switch (tu(r)) {
        case 1:
          n = gi;
          break;
        case 4:
          n = Ja;
          break;
        case 16:
          n = qr;
          break;
        case 536870912:
          n = qa;
          break;
        default:
          n = qr;
      }
      n = Sc(n, vc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function vc(e, t) {
  if (Vr = -1, Qr = 0, A & 6) throw Error(C(327));
  var n = e.callbackNode;
  if (cn() && e.callbackNode !== n) return null;
  var r = el(e, e === oe ? se : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = xl(e, r);
  else {
    t = r;
    var l = A;
    A |= 2;
    var o = yc();
    (oe !== e || se !== t) && (Ge = null, vn = Z() + 500, Ft(e, t));
    do
      try {
        qp();
        break;
      } catch (a) {
        xc(e, a);
      }
    while (!0);
    zi(), ml.current = o, A = l, q !== null ? t = 0 : (oe = null, se = 0, t = te);
  }
  if (t !== 0) {
    if (t === 2 && (l = Co(e), l !== 0 && (r = l, t = ti(e, l))), t === 1) throw n = ur, Ft(e, 0), ct(e, r), Ne(e, Z()), n;
    if (t === 6) ct(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Zp(l) && (t = xl(e, r), t === 2 && (o = Co(e), o !== 0 && (r = o, t = ti(e, o))), t === 1)) throw n = ur, Ft(e, 0), ct(e, r), Ne(e, Z()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(C(345));
        case 2:
          $t(e, ye, Ge);
          break;
        case 3:
          if (ct(e, r), (r & 130023424) === r && (t = Hi + 500 - Z(), 10 < t)) {
            if (el(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              he(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Ro($t.bind(null, e, ye, Ge), t);
            break;
          }
          $t(e, ye, Ge);
          break;
        case 4:
          if (ct(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var s = 31 - Ae(r);
            o = 1 << s, s = t[s], s > l && (l = s), r &= ~o;
          }
          if (r = l, r = Z() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Xp(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Ro($t.bind(null, e, ye, Ge), r);
            break;
          }
          $t(e, ye, Ge);
          break;
        case 5:
          $t(e, ye, Ge);
          break;
        default:
          throw Error(C(329));
      }
    }
  }
  return Ne(e, Z()), e.callbackNode === n ? vc.bind(null, e) : null;
}
function ti(e, t) {
  var n = Wn;
  return e.current.memoizedState.isDehydrated && (Ft(e, t).flags |= 256), e = xl(e, t), e !== 2 && (t = ye, ye = n, t !== null && ni(t)), e;
}
function ni(e) {
  ye === null ? ye = e : ye.push.apply(ye, e);
}
function Zp(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!Be(o(), l)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function ct(e, t) {
  for (t &= ~Wi, t &= ~$l, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ae(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ia(e) {
  if (A & 6) throw Error(C(327));
  cn();
  var t = el(e, 0);
  if (!(t & 1)) return Ne(e, Z()), null;
  var n = xl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Co(e);
    r !== 0 && (t = r, n = ti(e, r));
  }
  if (n === 1) throw n = ur, Ft(e, 0), ct(e, t), Ne(e, Z()), n;
  if (n === 6) throw Error(C(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, $t(e, ye, Ge), Ne(e, Z()), null;
}
function Vi(e, t) {
  var n = A;
  A |= 1;
  try {
    return e(t);
  } finally {
    A = n, A === 0 && (vn = Z() + 500, Cl && _t());
  }
}
function Bt(e) {
  pt !== null && pt.tag === 0 && !(A & 6) && cn();
  var t = A;
  A |= 1;
  var n = Le.transition, r = U;
  try {
    if (Le.transition = null, U = 1, e) return e();
  } finally {
    U = r, Le.transition = n, A = t, !(A & 6) && _t();
  }
}
function Qi() {
  Se = rn.current, V(rn);
}
function Ft(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Cp(n)), q !== null) for (n = q.return; n !== null; ) {
    var r = n;
    switch (bi(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && ol();
        break;
      case 3:
        mn(), V(ke), V(pe), Ri();
        break;
      case 5:
        Mi(r);
        break;
      case 4:
        mn();
        break;
      case 13:
        V(K);
        break;
      case 19:
        V(K);
        break;
      case 10:
        Ti(r.type._context);
        break;
      case 22:
      case 23:
        Qi();
    }
    n = n.return;
  }
  if (oe = e, q = e = wt(e.current, null), se = Se = t, te = 0, ur = null, Wi = $l = Ut = 0, ye = Wn = null, Lt !== null) {
    for (t = 0; t < Lt.length; t++) if (n = Lt[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var s = o.next;
        o.next = l, r.next = s;
      }
      n.pending = r;
    }
    Lt = null;
  }
  return e;
}
function xc(e, t) {
  do {
    var n = q;
    try {
      if (zi(), Br.current = hl, fl) {
        for (var r = Y.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        fl = !1;
      }
      if (At = 0, le = ee = Y = null, Un = !1, ir = 0, Bi.current = null, n === null || n.return === null) {
        te = 1, ur = t, q = null;
        break;
      }
      e: {
        var o = e, s = n.return, a = n, u = t;
        if (t = se, a.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, v = a, g = v.tag;
          if (!(v.mode & 1) && (g === 0 || g === 11 || g === 15)) {
            var m = v.alternate;
            m ? (v.updateQueue = m.updateQueue, v.memoizedState = m.memoizedState, v.lanes = m.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var x = Ks(s);
          if (x !== null) {
            x.flags &= -257, Ys(x, s, a, o, t), x.mode & 1 && Qs(o, c, t), t = x, u = c;
            var w = t.updateQueue;
            if (w === null) {
              var k = /* @__PURE__ */ new Set();
              k.add(u), t.updateQueue = k;
            } else w.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Qs(o, c, t), Ki();
              break e;
            }
            u = Error(C(426));
          }
        } else if (Q && a.mode & 1) {
          var b = Ks(s);
          if (b !== null) {
            !(b.flags & 65536) && (b.flags |= 256), Ys(b, s, a, o, t), Ci(gn(u, a));
            break e;
          }
        }
        o = u = gn(u, a), te !== 4 && (te = 2), Wn === null ? Wn = [o] : Wn.push(o), o = s;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var f = tc(o, u, t);
              As(o, f);
              break e;
            case 1:
              a = u;
              var d = o.type, p = o.stateNode;
              if (!(o.flags & 128) && (typeof d.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (xt === null || !xt.has(p)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var h = nc(o, a, t);
                As(o, h);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      kc(n);
    } catch (y) {
      t = y, q === n && n !== null && (q = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function yc() {
  var e = ml.current;
  return ml.current = hl, e === null ? hl : e;
}
function Ki() {
  (te === 0 || te === 3 || te === 2) && (te = 4), oe === null || !(Ut & 268435455) && !($l & 268435455) || ct(oe, se);
}
function xl(e, t) {
  var n = A;
  A |= 2;
  var r = yc();
  (oe !== e || se !== t) && (Ge = null, Ft(e, t));
  do
    try {
      Jp();
      break;
    } catch (l) {
      xc(e, l);
    }
  while (!0);
  if (zi(), A = n, ml.current = r, q !== null) throw Error(C(261));
  return oe = null, se = 0, te;
}
function Jp() {
  for (; q !== null; ) wc(q);
}
function qp() {
  for (; q !== null && !Sd(); ) wc(q);
}
function wc(e) {
  var t = Nc(e.alternate, e, Se);
  e.memoizedProps = e.pendingProps, t === null ? kc(e) : q = t, Bi.current = null;
}
function kc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Qp(n, t), n !== null) {
        n.flags &= 32767, q = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        te = 6, q = null;
        return;
      }
    } else if (n = Vp(n, t, Se), n !== null) {
      q = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      q = t;
      return;
    }
    q = t = e;
  } while (t !== null);
  te === 0 && (te = 5);
}
function $t(e, t, n) {
  var r = U, l = Le.transition;
  try {
    Le.transition = null, U = 1, ef(e, t, n, r);
  } finally {
    Le.transition = l, U = r;
  }
  return null;
}
function ef(e, t, n, r) {
  do
    cn();
  while (pt !== null);
  if (A & 6) throw Error(C(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(C(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Md(e, o), e === oe && (q = oe = null, se = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Pr || (Pr = !0, Sc(qr, function() {
    return cn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Le.transition, Le.transition = null;
    var s = U;
    U = 1;
    var a = A;
    A |= 4, Bi.current = null, Yp(e, n), mc(n, e), wp(Lo), tl = !!Po, Lo = Po = null, e.current = n, Gp(n), _d(), A = a, U = s, Le.transition = o;
  } else e.current = n;
  if (Pr && (Pr = !1, pt = e, vl = l), o = e.pendingLanes, o === 0 && (xt = null), Ed(n.stateNode), Ne(e, Z()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (gl) throw gl = !1, e = qo, qo = null, e;
  return vl & 1 && e.tag !== 0 && cn(), o = e.pendingLanes, o & 1 ? e === ei ? Hn++ : (Hn = 0, ei = e) : Hn = 0, _t(), null;
}
function cn() {
  if (pt !== null) {
    var e = tu(vl), t = Le.transition, n = U;
    try {
      if (Le.transition = null, U = 16 > e ? 16 : e, pt === null) var r = !1;
      else {
        if (e = pt, pt = null, vl = 0, A & 6) throw Error(C(331));
        var l = A;
        for (A |= 4, L = e.current; L !== null; ) {
          var o = L, s = o.child;
          if (L.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var c = a[u];
                for (L = c; L !== null; ) {
                  var v = L;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Bn(8, v, o);
                  }
                  var g = v.child;
                  if (g !== null) g.return = v, L = g;
                  else for (; L !== null; ) {
                    v = L;
                    var m = v.sibling, x = v.return;
                    if (pc(v), v === c) {
                      L = null;
                      break;
                    }
                    if (m !== null) {
                      m.return = x, L = m;
                      break;
                    }
                    L = x;
                  }
                }
              }
              var w = o.alternate;
              if (w !== null) {
                var k = w.child;
                if (k !== null) {
                  w.child = null;
                  do {
                    var b = k.sibling;
                    k.sibling = null, k = b;
                  } while (k !== null);
                }
              }
              L = o;
            }
          }
          if (o.subtreeFlags & 2064 && s !== null) s.return = o, L = s;
          else e: for (; L !== null; ) {
            if (o = L, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Bn(9, o, o.return);
            }
            var f = o.sibling;
            if (f !== null) {
              f.return = o.return, L = f;
              break e;
            }
            L = o.return;
          }
        }
        var d = e.current;
        for (L = d; L !== null; ) {
          s = L;
          var p = s.child;
          if (s.subtreeFlags & 2064 && p !== null) p.return = s, L = p;
          else e: for (s = d; L !== null; ) {
            if (a = L, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Tl(9, a);
              }
            } catch (y) {
              X(a, a.return, y);
            }
            if (a === s) {
              L = null;
              break e;
            }
            var h = a.sibling;
            if (h !== null) {
              h.return = a.return, L = h;
              break e;
            }
            L = a.return;
          }
        }
        if (A = l, _t(), Ke && typeof Ke.onPostCommitFiberRoot == "function") try {
          Ke.onPostCommitFiberRoot(jl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      U = n, Le.transition = t;
    }
  }
  return !1;
}
function sa(e, t, n) {
  t = gn(n, t), t = tc(e, t, 1), e = vt(e, t, 1), t = he(), e !== null && (dr(e, 1, t), Ne(e, t));
}
function X(e, t, n) {
  if (e.tag === 3) sa(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      sa(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (xt === null || !xt.has(r))) {
        e = gn(n, e), e = nc(t, e, 1), t = vt(t, e, 1), e = he(), t !== null && (dr(t, 1, e), Ne(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function tf(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = he(), e.pingedLanes |= e.suspendedLanes & n, oe === e && (se & n) === n && (te === 4 || te === 3 && (se & 130023424) === se && 500 > Z() - Hi ? Ft(e, 0) : Wi |= n), Ne(e, t);
}
function jc(e, t) {
  t === 0 && (e.mode & 1 ? (t = jr, jr <<= 1, !(jr & 130023424) && (jr = 4194304)) : t = 1);
  var n = he();
  e = nt(e, t), e !== null && (dr(e, t, n), Ne(e, n));
}
function nf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), jc(e, n);
}
function rf(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(C(314));
  }
  r !== null && r.delete(t), jc(e, n);
}
var Nc;
Nc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ke.current) we = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return we = !1, Hp(e, t, n);
    we = !!(e.flags & 131072);
  }
  else we = !1, Q && t.flags & 1048576 && Cu(t, al, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Hr(e, t), e = t.pendingProps;
      var l = pn(t, pe.current);
      un(t, n), l = Di(null, t, r, e, l, n);
      var o = Oi();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, je(r) ? (o = !0, il(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Pi(t), l.updater = zl, t.stateNode = l, l._reactInternals = t, Bo(t, r, e, n), t = Vo(null, t, r, !0, o, n)) : (t.tag = 0, Q && o && _i(t), fe(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Hr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = of(r), e = De(r, e), l) {
          case 0:
            t = Ho(null, t, r, e, n);
            break e;
          case 1:
            t = Zs(null, t, r, e, n);
            break e;
          case 11:
            t = Gs(null, t, r, e, n);
            break e;
          case 14:
            t = Xs(null, t, r, De(r.type, e), n);
            break e;
        }
        throw Error(C(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), Ho(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), Zs(e, t, r, l, n);
    case 3:
      e: {
        if (ic(t), e === null) throw Error(C(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, Lu(e, t), dl(t, r, null, n);
        var s = t.memoizedState;
        if (r = s.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: s.cache, pendingSuspenseBoundaries: s.pendingSuspenseBoundaries, transitions: s.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = gn(Error(C(423)), t), t = Js(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = gn(Error(C(424)), t), t = Js(e, t, r, n, l);
          break e;
        } else for (_e = gt(t.stateNode.containerInfo.firstChild), be = t, Q = !0, Ie = null, n = $u(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (fn(), r === l) {
            t = rt(e, t, n);
            break e;
          }
          fe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Mu(t), e === null && Io(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, s = l.children, Mo(r, l) ? s = null : o !== null && Mo(r, o) && (t.flags |= 32), oc(e, t), fe(e, t, s, n), t.child;
    case 6:
      return e === null && Io(t), null;
    case 13:
      return sc(e, t, n);
    case 4:
      return Li(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = hn(t, null, r, n) : fe(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), Gs(e, t, r, l, n);
    case 7:
      return fe(e, t, t.pendingProps, n), t.child;
    case 8:
      return fe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return fe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, s = l.value, W(ul, r._currentValue), r._currentValue = s, o !== null) if (Be(o.value, s)) {
          if (o.children === l.children && !ke.current) {
            t = rt(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var a = o.dependencies;
          if (a !== null) {
            s = o.child;
            for (var u = a.firstContext; u !== null; ) {
              if (u.context === r) {
                if (o.tag === 1) {
                  u = qe(-1, n & -n), u.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var v = c.pending;
                    v === null ? u.next = u : (u.next = v.next, v.next = u), c.pending = u;
                  }
                }
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Ao(
                  o.return,
                  n,
                  t
                ), a.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (o.tag === 10) s = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (s = o.return, s === null) throw Error(C(341));
            s.lanes |= n, a = s.alternate, a !== null && (a.lanes |= n), Ao(s, n, t), s = o.sibling;
          } else s = o.child;
          if (s !== null) s.return = o;
          else for (s = o; s !== null; ) {
            if (s === t) {
              s = null;
              break;
            }
            if (o = s.sibling, o !== null) {
              o.return = s.return, s = o;
              break;
            }
            s = s.return;
          }
          o = s;
        }
        fe(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, un(t, n), l = Me(l), r = r(l), t.flags |= 1, fe(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = De(r, t.pendingProps), l = De(r.type, l), Xs(e, t, r, l, n);
    case 15:
      return rc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), Hr(e, t), t.tag = 1, je(r) ? (e = !0, il(t)) : e = !1, un(t, n), ec(t, r, l), Bo(t, r, l, n), Vo(null, t, r, !0, e, n);
    case 19:
      return ac(e, t, n);
    case 22:
      return lc(e, t, n);
  }
  throw Error(C(156, t.tag));
};
function Sc(e, t) {
  return Za(e, t);
}
function lf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Pe(e, t, n, r) {
  return new lf(e, t, n, r);
}
function Yi(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function of(e) {
  if (typeof e == "function") return Yi(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === fi) return 11;
    if (e === hi) return 14;
  }
  return 2;
}
function wt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Pe(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Kr(e, t, n, r, l, o) {
  var s = 2;
  if (r = e, typeof e == "function") Yi(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else e: switch (e) {
    case Kt:
      return Dt(n.children, l, o, t);
    case pi:
      s = 8, l |= 8;
      break;
    case po:
      return e = Pe(12, n, t, l | 2), e.elementType = po, e.lanes = o, e;
    case fo:
      return e = Pe(13, n, t, l), e.elementType = fo, e.lanes = o, e;
    case ho:
      return e = Pe(19, n, t, l), e.elementType = ho, e.lanes = o, e;
    case Ma:
      return Pl(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Pa:
          s = 10;
          break e;
        case La:
          s = 9;
          break e;
        case fi:
          s = 11;
          break e;
        case hi:
          s = 14;
          break e;
        case st:
          s = 16, r = null;
          break e;
      }
      throw Error(C(130, e == null ? e : typeof e, ""));
  }
  return t = Pe(s, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Dt(e, t, n, r) {
  return e = Pe(7, e, r, t), e.lanes = n, e;
}
function Pl(e, t, n, r) {
  return e = Pe(22, e, r, t), e.elementType = Ma, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ao(e, t, n) {
  return e = Pe(6, e, null, t), e.lanes = n, e;
}
function uo(e, t, n) {
  return t = Pe(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function sf(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Wl(0), this.expirationTimes = Wl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Wl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Gi(e, t, n, r, l, o, s, a, u) {
  return e = new sf(e, t, n, a, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Pe(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Pi(o), e;
}
function af(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Qt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function _c(e) {
  if (!e) return jt;
  e = e._reactInternals;
  e: {
    if (Ht(e) !== e || e.tag !== 1) throw Error(C(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (je(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(C(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (je(n)) return _u(e, n, t);
  }
  return t;
}
function bc(e, t, n, r, l, o, s, a, u) {
  return e = Gi(n, r, !0, e, l, o, s, a, u), e.context = _c(null), n = e.current, r = he(), l = yt(n), o = qe(r, l), o.callback = t ?? null, vt(n, o, l), e.current.lanes = l, dr(e, l, r), Ne(e, r), e;
}
function Ll(e, t, n, r) {
  var l = t.current, o = he(), s = yt(l);
  return n = _c(n), t.context === null ? t.context = n : t.pendingContext = n, t = qe(o, s), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = vt(l, t, s), e !== null && (Ue(e, l, s, o), Ur(e, l, s)), s;
}
function yl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function aa(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Xi(e, t) {
  aa(e, t), (e = e.alternate) && aa(e, t);
}
function uf() {
  return null;
}
var Cc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Zi(e) {
  this._internalRoot = e;
}
Ml.prototype.render = Zi.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(C(409));
  Ll(e, t, null, null);
};
Ml.prototype.unmount = Zi.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Bt(function() {
      Ll(null, e, null, null);
    }), t[tt] = null;
  }
};
function Ml(e) {
  this._internalRoot = e;
}
Ml.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = lu();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ut.length && t !== 0 && t < ut[n].priority; n++) ;
    ut.splice(n, 0, e), n === 0 && iu(e);
  }
};
function Ji(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Rl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function ua() {
}
function cf(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = yl(s);
        o.call(c);
      };
    }
    var s = bc(t, r, e, 0, null, !1, !1, "", ua);
    return e._reactRootContainer = s, e[tt] = s.current, tr(e.nodeType === 8 ? e.parentNode : e), Bt(), s;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var c = yl(u);
      a.call(c);
    };
  }
  var u = Gi(e, 0, !1, null, null, !1, !1, "", ua);
  return e._reactRootContainer = u, e[tt] = u.current, tr(e.nodeType === 8 ? e.parentNode : e), Bt(function() {
    Ll(t, u, n, r);
  }), u;
}
function Fl(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var s = o;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var u = yl(s);
        a.call(u);
      };
    }
    Ll(t, s, e, l);
  } else s = cf(n, t, e, l, r);
  return yl(s);
}
nu = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Mn(t.pendingLanes);
        n !== 0 && (vi(t, n | 1), Ne(t, Z()), !(A & 6) && (vn = Z() + 500, _t()));
      }
      break;
    case 13:
      Bt(function() {
        var r = nt(e, 1);
        if (r !== null) {
          var l = he();
          Ue(r, e, 1, l);
        }
      }), Xi(e, 1);
  }
};
xi = function(e) {
  if (e.tag === 13) {
    var t = nt(e, 134217728);
    if (t !== null) {
      var n = he();
      Ue(t, e, 134217728, n);
    }
    Xi(e, 134217728);
  }
};
ru = function(e) {
  if (e.tag === 13) {
    var t = yt(e), n = nt(e, t);
    if (n !== null) {
      var r = he();
      Ue(n, e, t, r);
    }
    Xi(e, t);
  }
};
lu = function() {
  return U;
};
ou = function(e, t) {
  var n = U;
  try {
    return U = e, t();
  } finally {
    U = n;
  }
};
So = function(e, t, n) {
  switch (t) {
    case "input":
      if (vo(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = bl(r);
            if (!l) throw Error(C(90));
            Fa(r), vo(r, l);
          }
        }
      }
      break;
    case "textarea":
      Oa(e, n);
      break;
    case "select":
      t = n.value, t != null && ln(e, !!n.multiple, t, !1);
  }
};
Va = Vi;
Qa = Bt;
var df = { usingClientEntryPoint: !1, Events: [fr, Zt, bl, Wa, Ha, Vi] }, Tn = { findFiberByHostInstance: Pt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, pf = { bundleType: Tn.bundleType, version: Tn.version, rendererPackageName: Tn.rendererPackageName, rendererConfig: Tn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: lt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ga(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Tn.findFiberByHostInstance || uf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Lr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Lr.isDisabled && Lr.supportsFiber) try {
    jl = Lr.inject(pf), Ke = Lr;
  } catch {
  }
}
Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = df;
Ee.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ji(t)) throw Error(C(200));
  return af(e, t, null, n);
};
Ee.createRoot = function(e, t) {
  if (!Ji(e)) throw Error(C(299));
  var n = !1, r = "", l = Cc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Gi(e, 1, !1, null, null, n, !1, r, l), e[tt] = t.current, tr(e.nodeType === 8 ? e.parentNode : e), new Zi(t);
};
Ee.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(C(188)) : (e = Object.keys(e).join(","), Error(C(268, e)));
  return e = Ga(t), e = e === null ? null : e.stateNode, e;
};
Ee.flushSync = function(e) {
  return Bt(e);
};
Ee.hydrate = function(e, t, n) {
  if (!Rl(t)) throw Error(C(200));
  return Fl(null, e, t, !0, n);
};
Ee.hydrateRoot = function(e, t, n) {
  if (!Ji(e)) throw Error(C(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", s = Cc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = bc(t, null, e, 1, n ?? null, l, !1, o, s), e[tt] = t.current, tr(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Ml(t);
};
Ee.render = function(e, t, n) {
  if (!Rl(t)) throw Error(C(200));
  return Fl(null, e, t, !1, n);
};
Ee.unmountComponentAtNode = function(e) {
  if (!Rl(e)) throw Error(C(40));
  return e._reactRootContainer ? (Bt(function() {
    Fl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[tt] = null;
    });
  }), !0) : !1;
};
Ee.unstable_batchedUpdates = Vi;
Ee.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Rl(n)) throw Error(C(200));
  if (e == null || e._reactInternals === void 0) throw Error(C(38));
  return Fl(e, t, n, !1, r);
};
Ee.version = "18.3.1-next-f1338f8080-20240426";
function Ec() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ec);
    } catch (e) {
      console.error(e);
    }
}
Ec(), Ea.exports = Ee;
var ff = Ea.exports, zc, ca = ff;
zc = ca.createRoot, ca.hydrateRoot;
function $({ name: e, className: t }) {
  return /* @__PURE__ */ i.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("ha-icon", { icon: `mdi:${e}` }) });
}
const hf = '<defs><linearGradient id="hl-mark-g" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#FFB547"/><stop offset="1" stop-color="#FF5A1F"/></linearGradient></defs><polygon points="256,62 452,222 452,446 60,446 60,222" fill="url(#hl-mark-g)" stroke="url(#hl-mark-g)" stroke-width="56" stroke-linejoin="round"/><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" fill="#fff" transform="translate(256 292) scale(10) translate(-12 -12)"/>';
function da({ size: e = 28 }) {
  return /* @__PURE__ */ i.jsx(
    "svg",
    {
      className: "logo-mark",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      "aria-hidden": "true",
      dangerouslySetInnerHTML: { __html: hf }
    }
  );
}
const zt = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
], Vn = { heat: "Heating", water: "Hot water" }, mf = 3, Tc = (e) => e && typeof e == "object" && e.error && typeof e.error == "object" ? e.error : e, gf = (e) => {
  var t;
  return ((t = Tc(e)) == null ? void 0 : t.code) === mf;
}, me = (e) => {
  const t = Tc(e);
  if (typeof t == "string") return t;
  if (typeof (t == null ? void 0 : t.message) == "string" && t.message) return t.message;
  if ((t == null ? void 0 : t.code) !== void 0) return `Error: ${t.code}`;
  try {
    return JSON.stringify(t);
  } catch {
    return String(t);
  }
};
function $c(e, t, n) {
  const [r, l] = _.useState(!1), [o, s] = _.useState(null);
  return { busy: r, result: o, send: async (u, c) => {
    l(!0);
    try {
      await e().callWS({ entry_id: t, channel: n, ...u }), s({ kind: "ok", text: c });
    } catch (v) {
      s({ kind: "error", text: me(v) });
    } finally {
      l(!1);
    }
  } };
}
const vf = new Intl.DateTimeFormat(void 0, { weekday: "short" }), xf = new Intl.DateTimeFormat(void 0, { weekday: "short", day: "numeric", month: "short" }), yf = new Intl.DateTimeFormat(void 0, { hour: "2-digit", minute: "2-digit" });
function xn(e) {
  const t = typeof e == "string" ? new Date(e) : e;
  return Number.isNaN(t.getTime()) ? "" : `${((t.getTime() - Date.now()) / 864e5 < 6 ? vf : xf).format(t)} ${yf.format(t)}`;
}
const Rt = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, Mr = (e) => String(e).padStart(2, "0"), pa = (e) => `${e.getFullYear()}-${Mr(e.getMonth() + 1)}-${Mr(e.getDate())}T${Mr(e.getHours())}:${Mr(e.getMinutes())}`;
function wf({
  hasHeat: e,
  hasWater: t,
  frost: n,
  limits: r,
  busy: l,
  onGo: o,
  onClose: s
}) {
  const [a, u] = _.useState(() => {
    const f = /* @__PURE__ */ new Date();
    return f.setDate(f.getDate() + 7), f.setHours(14, 0, 0, 0), pa(f);
  }), [c, v] = _.useState(n), g = (r == null ? void 0 : r.boost_min_temp) ?? 5, m = (r == null ? void 0 : r.heat_max) ?? 32, x = (f) => Math.min(m, Math.max(g, Math.round(f * 2) / 2));
  _.useEffect(() => {
    const f = (d) => d.key === "Escape" && s();
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [s]);
  const w = new Date(a), k = !Number.isNaN(w.getTime()) && w.getTime() > Date.now() + 6e4, b = [e && `heating holds ${c.toFixed(1)}°`, t && "hot water is off"].filter(Boolean).join(" and ");
  return /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: (f) => {
    f.stopPropagation(), s();
  }, children: /* @__PURE__ */ i.jsxs("div", { className: "sheet heat", role: "dialog", "aria-modal": "true", "aria-label": "Away", onClick: (f) => f.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ i.jsx("h2", { children: "Away" }),
      /* @__PURE__ */ i.jsxs("span", { className: "muted", children: [
        "Until you're back, ",
        b,
        ". Then everything goes back to what it was doing."
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Back on" }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          className: "sheet-time",
          type: "datetime-local",
          value: a,
          min: pa(/* @__PURE__ */ new Date()),
          onChange: (f) => u(f.target.value)
        }
      )
    ] }),
    e && /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Heating while away" }),
      /* @__PURE__ */ i.jsxs("div", { className: "sheet-temp", children: [
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => v(x(c - 0.5)), "aria-label": "Lower", children: /* @__PURE__ */ i.jsx($, { name: "minus" }) }),
        /* @__PURE__ */ i.jsxs("span", { className: "sheet-temp-value", children: [
          c.toFixed(1),
          "°"
        ] }),
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => v(x(c + 0.5)), "aria-label": "Raise", children: /* @__PURE__ */ i.jsx($, { name: "plus" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("button", { className: "sheet-go", disabled: l || !k, onClick: () => o(w, c), children: k ? `Away until ${xn(w)}` : "Pick a time in the future" }),
    /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: s, children: "Cancel" })
  ] }) });
}
const kf = [30, 60, 120, 180];
function jf({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onOpenDevice: l,
  onOpenRoom: o
}) {
  const [s, a] = _.useState([]), [u, c] = _.useState("all");
  _.useEffect(() => {
    const x = e().connection.subscribeMessage((w) => a(w.rooms), {
      type: "hive_local/rooms/subscribe"
    });
    return () => {
      x.then((w) => w()).catch(() => {
      });
    };
  }, [e]);
  const v = t.flatMap((x) => x.channels.map((w) => {
    var k, b;
    return { d: x, c: w, s: ((b = (k = n[x.entry_id]) == null ? void 0 : k[w]) == null ? void 0 : b.status) ?? null };
  })), g = t.length > 1, m = [
    { id: "all", label: "All", icon: "" },
    { id: "heat", label: "Heating", icon: "radiator" },
    ...v.some(({ c: x }) => x === "water") ? [{ id: "water", label: "Hot water", icon: "water-boiler" }] : [],
    ...s.length ? [{ id: "rooms", label: "Rooms", icon: "home-thermometer-outline" }] : []
  ];
  return /* @__PURE__ */ i.jsx("div", { className: "home", children: t.length > 0 && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: "home-section", children: "Quick actions" }),
    /* @__PURE__ */ i.jsx(Nf, { getHass: e, devices: t, status: n, limits: r }),
    /* @__PURE__ */ i.jsx("h3", { className: "home-section", children: "Your devices" }),
    m.length > 2 && /* @__PURE__ */ i.jsx("div", { className: "pills", role: "tablist", "aria-label": "Show", children: m.map((x) => /* @__PURE__ */ i.jsxs("button", { role: "tab", "aria-selected": u === x.id, className: `pill ${u === x.id ? "on" : ""}`, onClick: () => c(x.id), children: [
      x.icon && /* @__PURE__ */ i.jsx($, { name: x.icon }),
      " ",
      x.label
    ] }, x.id)) }),
    /* @__PURE__ */ i.jsxs("div", { className: "device-grid", children: [
      v.filter(({ c: x }) => u === "all" || u === x).map(({ d: x, c: w }) => {
        var k;
        return /* @__PURE__ */ i.jsx(
          Pc,
          {
            getHass: e,
            device: x,
            channel: w,
            info: (k = n[x.entry_id]) == null ? void 0 : k[w],
            showDevice: g,
            limits: r,
            onOpen: () => l(x.entry_id, w)
          },
          `${x.entry_id}-${w}`
        );
      }),
      (u === "all" || u === "rooms") && s.map((x) => /* @__PURE__ */ i.jsx(Sf, { room: x, showReceiver: g, onOpen: () => o(x.id) }, x.id))
    ] })
  ] }) });
}
function Nf({ getHass: e, devices: t, status: n, limits: r }) {
  var f, d, p;
  const [l, o] = _.useState(null), [s, a] = _.useState(null), [u, c] = _.useState(!1), v = t.length > 1, g = async (h, y, S) => {
    o(h);
    try {
      for (const z of y) await e().callWS(z);
      return a({ ok: !0, text: S }), !0;
    } catch (z) {
      return a({ ok: !1, text: me(z) }), !1;
    } finally {
      o(null);
    }
  }, m = [], x = t.flatMap((h) => h.channels.map((y) => {
    var S;
    return { d: h, c: y, info: (S = n[h.entry_id]) == null ? void 0 : S[y] };
  })), w = x.map(({ info: h }) => h == null ? void 0 : h.holiday).find((h) => h), k = (f = x.find(({ c: h }) => h === "heat")) == null ? void 0 : f.info;
  w ? m.push({
    id: "holiday-end",
    label: `End holiday · away until ${xn(w.until)}`,
    icon: "home-import-outline",
    kind: "neutral",
    msgs: [{ type: "hive_local/holiday/cancel" }],
    done: "Welcome back: everything's back to what it was doing"
  }) : m.push({ id: "holiday", label: "Away until…", icon: "bag-suitcase", kind: "neutral", msgs: [], done: "", open: () => c(!0) });
  for (const h of t)
    for (const y of h.channels) {
      const S = (d = n[h.entry_id]) == null ? void 0 : d[y];
      if (((p = S == null ? void 0 : S.status) == null ? void 0 : p.mode) === "boost") continue;
      const z = Rt((S == null ? void 0 : S.boost_minutes) ?? 30), j = y === "water" ? "hot water" : "heating";
      m.push({
        id: `boost-${h.entry_id}-${y}`,
        label: `Boost ${j} · ${z}${v ? ` (${h.name})` : ""}`,
        icon: "rocket-launch",
        kind: y,
        msgs: [{ type: "hive_local/boost", entry_id: h.entry_id, channel: y }],
        done: `Boosting ${j} for ${z}`
      });
    }
  const b = t.flatMap(
    (h) => h.channels.filter((y) => {
      var z, j, N;
      const S = (N = (j = (z = n[h.entry_id]) == null ? void 0 : z[y]) == null ? void 0 : j.status) == null ? void 0 : N.mode;
      return S && S !== "schedule";
    }).map((y) => ({ d: h, c: y }))
  );
  return b.length && m.push({
    id: "schedule",
    label: "Everything back to schedule",
    icon: "calendar-clock",
    kind: "neutral",
    msgs: b.map(
      ({ d: h, c: y }) => {
        var S, z, j;
        return ((j = (z = (S = n[h.entry_id]) == null ? void 0 : S[y]) == null ? void 0 : z.status) == null ? void 0 : j.mode) === "boost" ? { type: "hive_local/cancel_boost", entry_id: h.entry_id, channel: y } : { type: "hive_local/mode", entry_id: h.entry_id, channel: y, mode: "schedule" };
      }
    ),
    done: "Back on the schedule"
  }), /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx("div", { className: "quick", children: m.map((h) => /* @__PURE__ */ i.jsxs("button", { className: `quick-action ${h.kind}`, disabled: l != null, onClick: () => h.open ? h.open() : g(h.id, h.msgs, h.done), children: [
      /* @__PURE__ */ i.jsx("span", { className: "quick-icon", children: /* @__PURE__ */ i.jsx($, { name: l === h.id ? "timer-sand" : h.icon }) }),
      /* @__PURE__ */ i.jsx("span", { className: "quick-label", children: h.label })
    ] }, h.id)) }),
    s && /* @__PURE__ */ i.jsx("div", { className: `status ${s.ok ? "ok" : "error"}`, children: s.text }),
    u && /* @__PURE__ */ i.jsx(
      wf,
      {
        hasHeat: x.some(({ c: h }) => h === "heat"),
        hasWater: x.some(({ c: h }) => h === "water"),
        frost: (k == null ? void 0 : k.frost_temperature) ?? 12,
        limits: r,
        busy: l != null,
        onGo: (h, y) => g("holiday", [{ type: "hive_local/holiday/set", until: h.toISOString(), temperature: y }], `Away until ${xn(h)}`).then(
          (S) => S && c(!1)
        ),
        onClose: () => c(!1)
      }
    )
  ] });
}
function Sf({ room: e, showReceiver: t, onOpen: n }) {
  const r = e.target != null ? `${e.target}°` : e.target_range ? `${e.target_range[0]}–${e.target_range[1]}°` : null, l = `${e.valves.length} valve${e.valves.length === 1 ? "" : "s"}`;
  return /* @__PURE__ */ i.jsx("section", { className: `card device room-device ${e.heating ? "heating" : "idle"}`, children: /* @__PURE__ */ i.jsxs("div", { className: "device-head", role: "button", tabIndex: 0, onClick: n, onKeyDown: (o) => o.key === "Enter" && n(), children: [
    /* @__PURE__ */ i.jsxs("div", { className: "device-row", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon room", children: /* @__PURE__ */ i.jsx($, { name: "home-thermometer-outline" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "device-name", children: [
        /* @__PURE__ */ i.jsx("span", { children: e.name }),
        /* @__PURE__ */ i.jsxs("span", { className: "muted small", children: [
          t && e.receiver_name ? `${e.receiver_name} · ${l}` : l,
          e.battery_low ? /* @__PURE__ */ i.jsxs("span", { className: "warn", children: [
            " · battery ",
            e.lowest_battery,
            "%"
          ] }) : e.unavailable.length ? /* @__PURE__ */ i.jsxs("span", { className: "warn", children: [
            " · ",
            e.unavailable.length,
            " not responding"
          ] }) : null
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("span", { className: "device-status", children: e.heating ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        "Heating to ",
        /* @__PURE__ */ i.jsx("b", { children: r }),
        " ",
        /* @__PURE__ */ i.jsx($, { name: "fire", className: "status-icon heat" })
      ] }) : r ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        "Target ",
        /* @__PURE__ */ i.jsx("b", { children: r })
      ] }) : "No target" })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "device-row", children: /* @__PURE__ */ i.jsxs("div", { className: "device-big", children: [
      e.current_temperature != null ? e.current_temperature.toFixed(1) : "–",
      /* @__PURE__ */ i.jsx("span", { children: "°" }),
      /* @__PURE__ */ i.jsx("small", { children: e.temperature_source === "sensor" ? "Actual" : "Valves" })
    ] }) })
  ] }) });
}
function Pc({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  showDevice: l,
  limits: o,
  onOpen: s,
  page: a = !1
}) {
  var We, Et, es, ts;
  const u = n === "water", c = (r == null ? void 0 : r.status) ?? null, { busy: v, result: g, send: m } = $c(e, t.entry_id, n), x = !!c && c.mode !== "off" && c.heating, w = !c || c.mode === "off" ? "off" : x ? "heating" : "idle", k = !u && (c == null ? void 0 : c.setpoint) != null && c.setpoint <= 1, b = u || (c == null ? void 0 : c.setpoint) == null ? null : k ? (r == null ? void 0 : r.frost_temperature) ?? null : c.setpoint, f = [
    { id: "schedule", label: "Schedule" },
    { id: "manual", label: u ? "Always on" : "Manual" },
    { id: "off", label: "Off" }
  ], d = (r == null ? void 0 : r.boost_minutes) ?? 30, p = (r == null ? void 0 : r.boost_temperature) ?? 21, [h, y] = _.useState(!1), S = (o == null ? void 0 : o.boost_min_temp) ?? 5, z = (o == null ? void 0 : o.heat_max) ?? 32, j = (B) => Math.min(z, Math.max(S, Math.round(B * 2) / 2)), N = [.../* @__PURE__ */ new Set([...kf, d])].filter((B) => B <= ((o == null ? void 0 : o.boost_max_minutes) ?? 360)).sort((B, mr) => B - mr), [P, I] = _.useState(null), R = _.useRef();
  _.useEffect(() => () => window.clearTimeout(R.current), []), _.useEffect(() => I(null), [c == null ? void 0 : c.setpoint, c == null ? void 0 : c.mode]);
  const J = !u && !!c && c.mode !== "off", xe = (B) => {
    const Dl = j((P ?? b ?? 20) + B);
    I(Dl), window.clearTimeout(R.current), R.current = window.setTimeout(() => {
      m({ type: "hive_local/target", temperature: Dl }, `Set to ${Dl}°`).then(
        () => window.setTimeout(() => I(null), 8e3)
      );
    }, 1200);
  }, bt = P ?? b, ot = (B, mr) => m({ type: "hive_local/boost", minutes: B, ...u ? {} : { temperature: mr } }, `Boosting for ${Rt(B)}`).then(
    () => y(!1)
  ), Ct = c ? c.mode === "boost" ? "Boost to" : k && P == null ? "Frost" : c.mode === "manual" ? "Hold at" : "Target" : "", T = (c == null ? void 0 : c.mode) === "boost", F = T ? ((We = r == null ? void 0 : r.preheat) == null ? void 0 : We.active_for) ?? null : null, E = F != null;
  let M = "Waiting for the receiver…";
  c && (c.mode === "off" ? M = "Off" : T ? M = u ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Boosting ",
    /* @__PURE__ */ i.jsx($, { name: "rocket-launch", className: "status-icon" })
  ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Boosting to ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      c.setpoint,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx($, { name: "rocket-launch", className: "status-icon" })
  ] }) : u ? M = x ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Heating water ",
    /* @__PURE__ */ i.jsx($, { name: "water", className: "status-icon" })
  ] }) : "Not heating now" : x ? M = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Heating to ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      b,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx($, { name: "fire", className: "status-icon" })
  ] }) : k ? M = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Frost protection ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      b,
      "°"
    ] })
  ] }) : M = b != null ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Target ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      b,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx($, { name: "check-circle-outline", className: "status-icon done" })
  ] }) : "Idle"), c && E && (M = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Pre-heating to ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      c.setpoint,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx($, { name: "sun-clock", className: "status-icon" })
  ] }));
  const D = (r == null ? void 0 : r.holiday) ?? null, ne = D ? `Away until ${xn(D.until)}` : null;
  c && D && !T && !x && (M = u ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Off while away ",
    /* @__PURE__ */ i.jsx($, { name: "bag-suitcase", className: "status-icon away" })
  ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Away ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      c.setpoint,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx($, { name: "bag-suitcase", className: "status-icon away" })
  ] }));
  const re = c ? ne && !T ? ne : E ? `Pre-heating for ${(Et = r == null ? void 0 : r.preheat) == null ? void 0 : Et.active_for}` : c.mode === "boost" ? c.boost_remaining != null ? `Boost · ${Rt(c.boost_remaining)} left` : "Boost" : c.mode === "schedule" ? "On schedule" : (es = f.find((B) => B.id === c.mode)) == null ? void 0 : es.label : "", jn = a;
  return /* @__PURE__ */ i.jsxs("section", { className: `card device ${n} ${w} ${a ? "page" : ""}`, children: [
    /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "device-head",
        ...a ? {} : { role: "button", tabIndex: 0, onClick: s, onKeyDown: (B) => B.key === "Enter" && B.target === B.currentTarget && (s == null ? void 0 : s()) },
        children: [
          /* @__PURE__ */ i.jsxs("div", { className: "device-row", children: [
            /* @__PURE__ */ i.jsx("span", { className: `device-icon ${n}`, children: /* @__PURE__ */ i.jsx($, { name: u ? "water-boiler" : "radiator" }) }),
            /* @__PURE__ */ i.jsxs("div", { className: "device-name", children: [
              /* @__PURE__ */ i.jsx("span", { children: Vn[n] }),
              /* @__PURE__ */ i.jsx("span", { className: "muted small", children: l ? `${t.name} · ${re}` : re })
            ] }),
            /* @__PURE__ */ i.jsx("span", { className: "device-status", children: M })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "device-row", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "device-big", children: [
              u ? c ? c.mode === "off" ? "Off" : x ? "On" : "Idle" : "–" : (c == null ? void 0 : c.current_temperature) != null ? c.current_temperature.toFixed(1) : "–",
              !u && /* @__PURE__ */ i.jsx("span", { children: "°" }),
              /* @__PURE__ */ i.jsx("small", { children: u ? "Now" : "Actual" })
            ] }),
            /* @__PURE__ */ i.jsxs(
              "button",
              {
                className: `device-action ${T ? "boosting" : ""}`,
                disabled: v || !c,
                onClick: (B) => {
                  B.stopPropagation(), y(!0);
                },
                children: [
                  /* @__PURE__ */ i.jsx($, { name: E ? "sun-clock" : "rocket-launch" }),
                  " ",
                  E ? "Pre-heating" : T ? "Boosting" : "Boost"
                ]
              }
            )
          ] })
        ]
      }
    ),
    jn && /* @__PURE__ */ i.jsxs("div", { className: "device-body", children: [
      !u && /* @__PURE__ */ i.jsxs("div", { className: "target-row", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "target-text", children: [
          /* @__PURE__ */ i.jsx("span", { className: "target-label", children: Ct || "Target" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: c ? D && c.mode === "manual" ? `While you're away, until ${xn(D.until)}` : c.mode === "off" ? "Turn the heating on to set a target" : c.mode === "schedule" ? "Until the next scheduled change" : c.mode === "boost" ? "Keeps the boost time left" : "Held until you change it" : "" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "target-control", children: [
          /* @__PURE__ */ i.jsx("button", { className: "round target-btn", disabled: !J, onClick: () => xe(-0.5), "aria-label": "Lower the target", children: /* @__PURE__ */ i.jsx($, { name: "minus" }) }),
          /* @__PURE__ */ i.jsx("span", { className: `target-value ${P != null ? "pending" : ""}`, children: bt != null && (c == null ? void 0 : c.mode) !== "off" ? `${bt.toFixed(1)}°` : "–" }),
          /* @__PURE__ */ i.jsx("button", { className: "round target-btn", disabled: !J, onClick: () => xe(0.5), "aria-label": "Raise the target", children: /* @__PURE__ */ i.jsx($, { name: "plus" }) })
        ] })
      ] }),
      D && /* @__PURE__ */ i.jsxs("div", { className: "holiday-row", children: [
        /* @__PURE__ */ i.jsx($, { name: "bag-suitcase" }),
        /* @__PURE__ */ i.jsxs("span", { className: "holiday-text", children: [
          ne,
          ", then back to ",
          D.restore_mode === "schedule" ? "the schedule" : (ts = f.find((B) => B.id === D.restore_mode)) == null ? void 0 : ts.label.toLowerCase()
        ] }),
        /* @__PURE__ */ i.jsx("button", { className: "ghost", disabled: v, onClick: () => m({ type: "hive_local/holiday/cancel" }, "Holiday ended"), children: "End" })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "segmented full", children: f.map((B) => /* @__PURE__ */ i.jsx(
        "button",
        {
          className: (c == null ? void 0 : c.mode) === B.id ? "on" : "",
          disabled: v || !c,
          onClick: () => m({ type: "hive_local/mode", mode: B.id }, B.id === "schedule" ? "Following the schedule" : B.label),
          children: B.label
        },
        B.id
      )) })
    ] }),
    (g == null ? void 0 : g.kind) === "error" && /* @__PURE__ */ i.jsx("div", { className: "status error", children: g.text }),
    h && /* @__PURE__ */ i.jsx(
      _f,
      {
        title: E ? "Pre-heating" : T ? "Boosting" : "Boost",
        subtitle: l ? `${t.name} · ${Vn[n]}` : Vn[n],
        water: u,
        boosting: T,
        preheatFor: F,
        remaining: (c == null ? void 0 : c.boost_remaining) ?? null,
        boostTarget: T ? (c == null ? void 0 : c.setpoint) ?? null : null,
        defaultMinutes: d,
        defaultTemp: p,
        durations: N,
        clampTemp: j,
        busy: v,
        onBoost: ot,
        onStop: () => m({ type: "hive_local/cancel_boost" }, "Boost cancelled").then(() => y(!1)),
        onClose: () => y(!1)
      }
    )
  ] });
}
function _f({
  title: e,
  subtitle: t,
  water: n,
  boosting: r,
  preheatFor: l,
  remaining: o,
  boostTarget: s,
  defaultMinutes: a,
  defaultTemp: u,
  durations: c,
  clampTemp: v,
  busy: g,
  onBoost: m,
  onStop: x,
  onClose: w
}) {
  const [k, b] = _.useState(a), [f, d] = _.useState(u);
  return _.useEffect(() => {
    const p = (h) => h.key === "Escape" && w();
    return window.addEventListener("keydown", p), () => window.removeEventListener("keydown", p);
  }, [w]), /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: (p) => {
    p.stopPropagation(), w();
  }, children: /* @__PURE__ */ i.jsxs("div", { className: `sheet ${n ? "water" : "heat"}`, role: "dialog", "aria-modal": "true", "aria-label": `${e} ${t}`, onClick: (p) => p.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ i.jsx("h2", { children: e }),
      /* @__PURE__ */ i.jsx("span", { className: "muted", children: t })
    ] }),
    r ? /* @__PURE__ */ i.jsxs("div", { className: "sheet-live", children: [
      /* @__PURE__ */ i.jsx($, { name: "clock-outline" }),
      /* @__PURE__ */ i.jsx("span", { children: l ? `Warming up${s != null ? ` to ${s}°` : ""} for ${l}, when your schedule changes` : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        o != null ? `${Rt(o)} left` : "Boosting",
        !n && s != null ? ` · to ${s}°` : ""
      ] }) })
    ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      !n && /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
        /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Temperature" }),
        /* @__PURE__ */ i.jsxs("div", { className: "sheet-temp", children: [
          /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => d(v(f - 0.5)), "aria-label": "Lower", children: /* @__PURE__ */ i.jsx($, { name: "minus" }) }),
          /* @__PURE__ */ i.jsxs("span", { className: "sheet-temp-value", children: [
            f.toFixed(1),
            "°"
          ] }),
          /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => d(v(f + 0.5)), "aria-label": "Raise", children: /* @__PURE__ */ i.jsx($, { name: "plus" }) })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
        /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "How long" }),
        /* @__PURE__ */ i.jsx("div", { className: "sheet-lengths", role: "radiogroup", "aria-label": "How long", children: c.map((p) => /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": p === k, className: p === k ? "on" : "", onClick: () => b(p), children: Rt(p) }, p)) })
      ] })
    ] }),
    r ? /* @__PURE__ */ i.jsxs("button", { className: "sheet-go stop", disabled: g, onClick: x, children: [
      /* @__PURE__ */ i.jsx("span", { className: "stop-square" }),
      " ",
      l ? "Stop pre-heating" : "Stop boost"
    ] }) : /* @__PURE__ */ i.jsx("button", { className: "sheet-go", disabled: g, onClick: () => m(k, f), children: n ? `Boost hot water for ${Rt(k)}` : `Boost to ${f.toFixed(1)}° for ${Rt(k)}` }),
    /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: w, children: "Cancel" })
  ] }) });
}
const bf = [60, 90, 120, 180];
function Cf({ getHass: e, device: t, info: n }) {
  const { busy: r, result: l, send: o } = $c(e, t.entry_id, "heat"), s = [.../* @__PURE__ */ new Set([...bf, n.max_lead])].sort((u, c) => u - c);
  let a;
  return n.enabled ? n.active_for ? a = `Pre-heating now, for ${n.active_for}.` : n.rate == null ? a = `Still learning how fast your home warms up (${n.warmups} of ${n.warmups_needed} warm-ups seen).` : n.schedule_known ? n.next ? a = `Next: starts ${n.next.start} to reach ${n.next.setpoint}° by ${n.next.at}.` : a = "Nothing to pre-heat for yet." : a = "Reading the heating schedule…" : a = "Start heating early, so it's warm by the time the schedule says.", /* @__PURE__ */ i.jsxs("section", { className: "card preheat", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "target-row", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "device-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: "sun-clock" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "target-text", children: [
          /* @__PURE__ */ i.jsx("span", { className: "target-label", children: "Pre-heat" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: a })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "segmented", role: "radiogroup", "aria-label": "Pre-heat", children: [!0, !1].map((u) => /* @__PURE__ */ i.jsx(
        "button",
        {
          role: "radio",
          "aria-checked": n.enabled === u,
          className: n.enabled === u ? "on" : "",
          disabled: r,
          onClick: () => o({ type: "hive_local/preheat", enabled: u }, u ? "Pre-heat on" : "Pre-heat off"),
          children: u ? "On" : "Off"
        },
        String(u)
      )) })
    ] }),
    n.enabled && /* @__PURE__ */ i.jsxs("div", { className: "target-row", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "target-text", children: [
        /* @__PURE__ */ i.jsx("span", { children: "Start at most" }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: n.rate != null ? `Your home warms about ${n.rate.toFixed(1)}° an hour` : "Before the scheduled time" })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "segmented", role: "radiogroup", "aria-label": "Start at most", children: s.map((u) => /* @__PURE__ */ i.jsx(
        "button",
        {
          role: "radio",
          "aria-checked": n.max_lead === u,
          className: n.max_lead === u ? "on" : "",
          disabled: r,
          onClick: () => o({ type: "hive_local/preheat", max_lead: u }, "Saved"),
          children: u % 60 ? `${u / 60} h`.replace(".5 h", "½ h") : `${u / 60} h`
        },
        u
      )) })
    ] }),
    (l == null ? void 0 : l.kind) === "error" && /* @__PURE__ */ i.jsx("div", { className: "status error", children: l.text })
  ] });
}
const Ef = ["monday", "tuesday", "wednesday", "thursday", "friday"], zf = ["saturday", "sunday"], $n = (e) => e[0].toUpperCase() + e.slice(1, 3), Yr = (e) => {
  const [t, n] = e.split(":").map(Number);
  return t * 60 + n;
};
function Tf({
  getHass: e,
  device: t,
  channel: n,
  limits: r,
  mode: l,
  preheatFor: o
}) {
  var F;
  const [s, a] = _.useState({}), [u, c] = _.useState({}), [v, g] = _.useState("monday"), [m, x] = _.useState({ kind: "idle" }), w = t.entry_id, k = n === "water", b = JSON.stringify(s) !== JSON.stringify(u), f = _.useCallback(async () => {
    x({ kind: "busy", text: "Reading from receiver…" });
    try {
      const E = await e().callWS({
        type: "hive_local/get",
        entry_id: w,
        channel: n
      });
      a(E.schedule), c(E.schedule);
      const M = Object.keys(E.schedule).length;
      x(
        E.complete ? { kind: "ok", text: "Schedule read from receiver" } : M ? { kind: "error", text: `Only got ${M}/7 days — try reading again` } : { kind: "error", text: "No reply. On Zigbee2MQTT, check the receiver's friendly name; on ZHA, check the receiver is online." }
      );
    } catch (E) {
      x({ kind: "error", text: me(E) });
    }
  }, [w, n, e]);
  _.useEffect(() => {
    f();
  }, [f]), _.useEffect(() => {
    if (m.kind !== "ok") return;
    const E = setTimeout(() => x({ kind: "idle" }), 4e3);
    return () => clearTimeout(E);
  }, [m]);
  const d = async () => {
    const E = Object.fromEntries(
      zt.filter((M) => {
        var D;
        return JSON.stringify(s[M]) !== JSON.stringify(u[M]) && ((D = s[M]) == null ? void 0 : D.length);
      }).map((M) => [M, s[M]])
    );
    if (Object.keys(E).length) {
      x({ kind: "busy", text: "Writing to receiver…" });
      try {
        const M = await e().callWS({
          type: "hive_local/set",
          entry_id: w,
          channel: n,
          schedule: E
        }), D = { ...s, ...M.schedule };
        a(D), c(D);
        const ne = Object.keys(M.schedule).map((re) => re[0].toUpperCase() + re.slice(1, 3));
        x({
          kind: "ok",
          text: `Wrote ${ne.join(", ")}. Read back to confirm the receiver kept it.`
        });
      } catch (M) {
        x({ kind: "error", text: me(M) });
      }
    }
  }, p = s[v] ?? [], h = r.max_transitions, y = (E) => a((M) => ({ ...M, [v]: [...E].sort((D, ne) => Yr(D.time) - Yr(ne.time)) })), S = () => {
    const E = p[p.length - 1], M = E ? $f(p, Yr(E.time) + 60) : "06:00", D = k ? r.water_on : (E == null ? void 0 : E.setpoint) ?? 20;
    y([...p, { time: M, setpoint: D }]);
  }, z = (E) => a((M) => {
    const D = { ...M };
    for (const ne of E) D[ne] = p.map((re) => ({ ...re }));
    return D;
  }), j = _.useMemo(() => {
    const E = Object.values(s).flat().map((M) => M.setpoint).filter((M) => M > r.heat_min);
    return { lo: Math.min(15, ...E), hi: Math.max(24, ...E) };
  }, [s, r.heat_min]), N = zt[((/* @__PURE__ */ new Date()).getDay() + 6) % 7], [P, I] = _.useState(null), [R, J] = _.useState(!1), xe = zt.filter((E) => JSON.stringify(s[E]) !== JSON.stringify(u[E])), bt = zt[(zt.indexOf(v) + 1) % 7], ot = (F = (s[bt] ?? [])[0]) == null ? void 0 : F.time, Ct = (E) => k ? E.setpoint < r.water_on : E.setpoint <= r.heat_min;
  let T = "Stored on the receiver, so it keeps running without Home Assistant.";
  return l === "schedule" ? T = "Your schedule is running." : l === "manual" ? T = `Your schedule isn't being used: ${k ? "hot water is always on" : "heating is on Manual"}.` : l === "off" ? T = `Your schedule isn't being used: ${k ? "hot water" : "heating"} is off.` : l === "boost" && o ? T = `Your schedule is running, starting early so it's warm by ${o}.` : l === "boost" && (T = "Boosting now. Your schedule carries on after the boost."), /* @__PURE__ */ i.jsxs("div", { className: "sched", children: [
    /* @__PURE__ */ i.jsx("p", { className: "sched-status muted", children: T }),
    /* @__PURE__ */ i.jsx("div", { className: "sched-days", role: "tablist", "aria-label": "Day", children: zt.map((E) => /* @__PURE__ */ i.jsxs(
      "button",
      {
        role: "tab",
        "aria-selected": E === v,
        "aria-label": E,
        className: `sched-day ${E === v ? "on" : ""} ${E === N ? "today" : ""}`,
        onClick: () => {
          g(E), I(null);
        },
        children: [
          E[0].toUpperCase(),
          xe.includes(E) && /* @__PURE__ */ i.jsx("i", { className: "sched-dot", "aria-label": "changed" })
        ]
      },
      E
    )) }),
    m.text && m.kind !== "idle" && /* @__PURE__ */ i.jsx("div", { className: `status ${m.kind}`, children: m.text }),
    /* @__PURE__ */ i.jsxs("div", { className: "sched-list", children: [
      p.length === 0 && /* @__PURE__ */ i.jsxs("p", { className: "muted sched-empty", children: [
        "Nothing scheduled on ",
        v[0].toUpperCase() + v.slice(1),
        " yet."
      ] }),
      p.map((E, M) => {
        var re;
        const D = ((re = p[M + 1]) == null ? void 0 : re.time) ?? (ot ? `${ot} (${$n(bt)})` : "00:00"), ne = Ct(E);
        return /* @__PURE__ */ i.jsxs("button", { className: "slot", onClick: () => I(M), children: [
          /* @__PURE__ */ i.jsx(
            "span",
            {
              className: `slot-badge ${ne ? "off" : ""}`,
              style: ne ? void 0 : { borderColor: k ? "var(--hl-brand)" : Pf(E.setpoint, j, r) },
              children: ne ? /* @__PURE__ */ i.jsx($, { name: k ? "power" : "snowflake" }) : k ? "On" : `${E.setpoint}°`
            }
          ),
          /* @__PURE__ */ i.jsxs("span", { className: "slot-time", children: [
            E.time,
            " – ",
            D
          ] }),
          /* @__PURE__ */ i.jsx($, { name: "chevron-right", className: "slot-chev" })
        ] }, M);
      }),
      /* @__PURE__ */ i.jsxs("button", { className: "slot slot-add", onClick: () => {
        S(), I(p.length);
      }, disabled: p.length >= h, children: [
        /* @__PURE__ */ i.jsx("span", { className: "slot-badge add", children: /* @__PURE__ */ i.jsx($, { name: "plus" }) }),
        /* @__PURE__ */ i.jsx("span", { className: "slot-time", children: p.length >= h ? `${h} times a day at most` : "Add a time" })
      ] })
    ] }),
    b && /* @__PURE__ */ i.jsxs("div", { className: "sched-save", children: [
      /* @__PURE__ */ i.jsx($, { name: "pencil-outline", className: "sched-save-icon" }),
      /* @__PURE__ */ i.jsx("span", { className: "sched-changed", title: `Changed: ${xe.map($n).join(", ")}`, children: "Unsaved changes" }),
      /* @__PURE__ */ i.jsx("button", { className: "sched-undo", onClick: () => {
        a(u), I(null);
      }, children: "Undo" }),
      /* @__PURE__ */ i.jsx("button", { className: "sched-write", onClick: d, disabled: m.kind === "busy", children: "Save" })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: `fab-wrap ${b ? "raised" : ""}`, children: [
      R && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx("div", { className: "fab-backdrop", onClick: () => J(!1) }),
        /* @__PURE__ */ i.jsxs("div", { className: "fab-menu", role: "menu", children: [
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            J(!1), f();
          }, disabled: m.kind === "busy", children: [
            /* @__PURE__ */ i.jsx($, { name: "download" }),
            " Read from the receiver"
          ] }),
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            J(!1), z(Ef);
          }, disabled: !p.length, children: [
            /* @__PURE__ */ i.jsx($, { name: "content-copy" }),
            " Copy ",
            $n(v),
            " to weekdays"
          ] }),
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            J(!1), z(zf);
          }, disabled: !p.length, children: [
            /* @__PURE__ */ i.jsx($, { name: "content-copy" }),
            " Copy ",
            $n(v),
            " to the weekend"
          ] }),
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            J(!1), z([...zt]);
          }, disabled: !p.length, children: [
            /* @__PURE__ */ i.jsx($, { name: "content-copy" }),
            " Copy ",
            $n(v),
            " to every day"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("button", { className: "fab", "aria-label": "More", "aria-expanded": R, onClick: () => J(!R), children: /* @__PURE__ */ i.jsx($, { name: R ? "close" : "dots-horizontal" }) })
    ] }),
    P != null && p[P] && /* @__PURE__ */ i.jsx(
      Lf,
      {
        slot: p[P],
        dayName: v[0].toUpperCase() + v.slice(1),
        isWater: k,
        limits: r,
        canDelete: !0,
        onChange: (E) => y(p.map((M, D) => D === P ? E : M)),
        onDelete: () => {
          y(p.filter((E, M) => M !== P)), I(null);
        },
        onClose: () => I(null)
      }
    )
  ] });
}
function $f(e, t) {
  const n = new Set(e.map((l) => Yr(l.time)));
  let r = Math.min(t, 23 * 60 + 30);
  for (; n.has(r) && r < 1439; ) r += 15;
  return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function Pf(e, t, n) {
  if (e <= n.heat_min) return "var(--hl-off-fill)";
  const r = Math.min(1, Math.max(0, (e - t.lo) / Math.max(1, t.hi - t.lo)));
  return `hsl(${Math.round(42 - 34 * r)} ${Math.round(88 + 4 * r)}% ${Math.round(64 - 14 * r)}%)`;
}
function Lf({
  slot: e,
  dayName: t,
  isWater: n,
  limits: r,
  canDelete: l,
  onChange: o,
  onDelete: s,
  onClose: a
}) {
  _.useEffect(() => {
    const g = (m) => m.key === "Escape" && a();
    return window.addEventListener("keydown", g), () => window.removeEventListener("keydown", g);
  }, [a]);
  const u = n ? e.setpoint < r.water_on : e.setpoint <= r.heat_min, c = (g) => Math.min(r.heat_max, Math.max(5, Math.round(g * 2) / 2)), v = u ? 20 : e.setpoint;
  return /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: a, children: /* @__PURE__ */ i.jsxs("div", { className: "sheet heat", role: "dialog", "aria-modal": "true", "aria-label": `Edit ${t} at ${e.time}`, onClick: (g) => g.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ i.jsx("h2", { children: e.time }),
      /* @__PURE__ */ i.jsx("span", { className: "muted", children: t })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Starts at" }),
      /* @__PURE__ */ i.jsx("input", { className: "sheet-time", type: "time", value: e.time, onChange: (g) => g.target.value && o({ ...e, time: g.target.value }) })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: n ? "Hot water" : "Heating" }),
      /* @__PURE__ */ i.jsxs("div", { className: "sheet-lengths", children: [
        /* @__PURE__ */ i.jsx("button", { className: u ? "" : "on", onClick: () => o({ ...e, setpoint: n ? r.water_on : v }), children: n ? "On" : "Heat to" }),
        /* @__PURE__ */ i.jsx("button", { className: u ? "on" : "", onClick: () => o({ ...e, setpoint: n ? r.water_off : r.heat_min }), children: "Off" })
      ] })
    ] }),
    !n && !u && /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Temperature" }),
      /* @__PURE__ */ i.jsxs("div", { className: "sheet-temp", children: [
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => o({ ...e, setpoint: c(e.setpoint - 0.5) }), "aria-label": "Lower", children: /* @__PURE__ */ i.jsx($, { name: "minus" }) }),
        /* @__PURE__ */ i.jsxs("span", { className: "sheet-temp-value", children: [
          e.setpoint.toFixed(1),
          "°"
        ] }),
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => o({ ...e, setpoint: c(e.setpoint + 0.5) }), "aria-label": "Raise", children: /* @__PURE__ */ i.jsx($, { name: "plus" }) })
      ] })
    ] }),
    !n && u && /* @__PURE__ */ i.jsx("p", { className: "muted small sheet-note", children: "Off means the thermostat only keeps the house above its frost protection temperature." }),
    /* @__PURE__ */ i.jsx("button", { className: "sheet-go", onClick: a, children: "Done" }),
    l && /* @__PURE__ */ i.jsxs("button", { className: "ghost sheet-cancel danger-text", onClick: s, children: [
      /* @__PURE__ */ i.jsx($, { name: "delete-outline" }),
      " Remove this time"
    ] })
  ] }) });
}
const fa = [
  { id: 1, label: "D", name: "Day" },
  { id: 7, label: "W", name: "Week" },
  { id: 30, label: "M", name: "Month" }
], Mf = 5 * 6e4, Gr = (e) => {
  const t = Math.round(e);
  return t < 60 ? `${t}m` : t % 60 ? `${Math.floor(t / 60)}h ${t % 60}m` : `${t / 60}h`;
}, qi = (e, t, n = 2) => {
  try {
    return e.toLocaleString([], { style: "currency", currency: t, maximumFractionDigits: n, minimumFractionDigits: 2 });
  } catch {
    return `${e.toFixed(n)} ${t}`;
  }
}, ri = (e, t) => qi(e, t, 4), li = (e, t) => new Date(e * 1e3).toLocaleDateString([], t), Rf = (e) => new Date(e * 1e3).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
function Ff(e, t, n) {
  if (n === 1) return li(e, { weekday: "short", day: "numeric", month: "short" });
  const r = t - 86400, l = new Date(e * 1e3), o = new Date(r * 1e3), s = (a) => a.toLocaleDateString([], { month: "short" });
  return l.getMonth() === o.getMonth() ? `${l.getDate()}–${o.getDate()} ${s(o)}` : `${l.getDate()} ${s(l)} – ${o.getDate()} ${s(o)}`;
}
const ha = (e) => e.filter((t) => t != null);
function Df(e) {
  if (e.period === 1) {
    const t = [];
    for (let n = 0; n < e.series.length; n += 4) {
      const r = e.series.slice(n, n + 4).filter((s) => s.heating != null);
      if (!r.length) continue;
      const l = ha(r.map((s) => s.current)), o = ha(e.series.slice(n, n + 4).map((s) => s.outdoor));
      t.push({
        key: e.series[n].t,
        label: [Rf(e.series[n].t), ""],
        minutes: r.reduce((s, a) => s + (a.heating ?? 0) * 15, 0),
        avg: l.length ? l.reduce((s, a) => s + a, 0) / l.length : null,
        min: l.length ? Math.min(...l) : null,
        max: l.length ? Math.max(...l) : null,
        outMin: o.length ? Math.min(...o) : null,
        outMax: o.length ? Math.max(...o) : null
      });
    }
    return t.reverse();
  }
  return e.days.filter((t) => t.heating_minutes != null).map((t) => ({
    key: t.start,
    label: [li(t.start, { weekday: "short" }), li(t.start, { day: "numeric" })],
    minutes: t.heating_minutes,
    avg: t.temp_avg,
    min: t.temp_min,
    max: t.temp_max,
    outMin: t.outdoor_min,
    outMax: t.outdoor_max
  })).reverse();
}
function Lc({ getHass: e, devices: t, channel: n }) {
  var I;
  const [r, l] = _.useState((I = t[0]) == null ? void 0 : I.entry_id), o = t.find((R) => R.entry_id === r) ?? t[0], s = n ?? "heat", [a, u] = _.useState(7), [c, v] = _.useState("time"), [g, m] = _.useState(0), [x, w] = _.useState(null), [k, b] = _.useState(""), [f, d] = _.useState(!0), p = s === "water", h = _.useCallback(() => {
    o && e().callWS({ type: "hive_local/stats", entry_id: o.entry_id, channel: s, days: a, offset: g }).then((R) => {
      w(R), b("");
    }).catch((R) => {
      gf(R) || b(me(R));
    }).finally(() => d(!1));
  }, [e, o, s, a, g]);
  if (_.useEffect(() => {
    var J;
    const R = e().connection;
    return (J = R.addEventListener) == null || J.call(R, "ready", h), () => {
      var xe;
      return (xe = R.removeEventListener) == null ? void 0 : xe.call(R, "ready", h);
    };
  }, [e, h]), _.useEffect(() => {
    if (d(!0), h(), g) return;
    const R = setInterval(h, Mf);
    return () => clearInterval(R);
  }, [h, g]), !o) return null;
  const y = x && x.period === a && x.offset === g ? x : null, S = y ? Df(y) : [], z = a === 1 ? "hour" : "day", j = !p && !!(y != null && y.outdoor), N = p ? null : (y == null ? void 0 : y.cost) ?? null, P = p || c === "cost" && !N && y ? "time" : c;
  return /* @__PURE__ */ i.jsxs("div", { className: "history", children: [
    !n && /* @__PURE__ */ i.jsx("h2", { className: "history-title", children: "Heating history" }),
    !n && t.length > 1 && /* @__PURE__ */ i.jsx("div", { className: "history-tabs", role: "tablist", children: t.map((R) => /* @__PURE__ */ i.jsx("button", { role: "tab", "aria-selected": R.entry_id === o.entry_id, className: R.entry_id === o.entry_id ? "on" : "", onClick: () => {
      l(R.entry_id), m(0);
    }, children: R.name }, R.entry_id)) }),
    /* @__PURE__ */ i.jsxs("div", { className: "history-controls", children: [
      /* @__PURE__ */ i.jsx("div", { className: "history-toggle", role: "radiogroup", "aria-label": "Period", children: fa.map((R) => /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": R.id === a, "aria-label": R.name, title: R.name, className: R.id === a ? "on" : "", onClick: () => {
        u(R.id), m(0);
      }, children: R.label }, R.id)) }),
      !p && /* @__PURE__ */ i.jsxs("div", { className: "history-toggle", role: "radiogroup", "aria-label": "Show", children: [
        /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": P === "time", title: "Time on", "aria-label": "Time on", className: `wide ${P === "time" ? "on" : ""}`, onClick: () => v("time"), children: /* @__PURE__ */ i.jsx($, { name: "clock-outline" }) }),
        /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": P === "temp", title: "Temperature", "aria-label": "Temperature", className: `wide ${P === "temp" ? "on" : ""}`, onClick: () => v("temp"), children: /* @__PURE__ */ i.jsx($, { name: "thermometer" }) }),
        (N || c === "cost") && /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": P === "cost", title: "Estimated cost", "aria-label": "Estimated cost", className: `wide ${P === "cost" ? "on" : ""}`, onClick: () => v("cost"), children: /* @__PURE__ */ i.jsx($, { name: "cash" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "history-date", children: [
      /* @__PURE__ */ i.jsx("button", { className: "round ghost", onClick: () => m(g + 1), "aria-label": "Earlier", children: /* @__PURE__ */ i.jsx($, { name: "chevron-left" }) }),
      /* @__PURE__ */ i.jsxs("span", { className: "history-range", children: [
        /* @__PURE__ */ i.jsx($, { name: "calendar-blank-outline" }),
        " ",
        y ? Ff(y.start, y.period_end, a) : "…"
      ] }),
      /* @__PURE__ */ i.jsx("button", { className: "round ghost", onClick: () => m(Math.max(0, g - 1)), disabled: g === 0, "aria-label": "Later", children: /* @__PURE__ */ i.jsx($, { name: "chevron-right" }) })
    ] }),
    k && /* @__PURE__ */ i.jsx("div", { className: "status error", children: k }),
    f && !y && /* @__PURE__ */ i.jsx("p", { className: "muted history-empty", children: "Loading…" }),
    y && !y.has_data && /* @__PURE__ */ i.jsxs("p", { className: "muted history-empty", children: [
      "No history for this ",
      fa.find((R) => R.id === a).name.toLowerCase(),
      ". Home Assistant keeps 10 days unless",
      " ",
      /* @__PURE__ */ i.jsx("code", { children: "purge_keep_days" }),
      " is raised."
    ] }),
    (y == null ? void 0 : y.has_data) && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx(If, { data: y, metric: P, water: p, units: z, rows: S, cost: N }),
      /* @__PURE__ */ i.jsxs("div", { className: "history-rows", children: [
        S.length > 0 && !p && /* @__PURE__ */ i.jsxs("div", { className: `history-key muted small ${j ? "with-outdoor" : ""}`, children: [
          j && /* @__PURE__ */ i.jsxs("span", { title: "Outside temperature", children: [
            /* @__PURE__ */ i.jsx($, { name: "weather-partly-cloudy" }),
            " Outside"
          ] }),
          /* @__PURE__ */ i.jsxs("span", { title: "Lowest and highest room temperature", children: [
            /* @__PURE__ */ i.jsx($, { name: "thermometer" }),
            " Low · high"
          ] })
        ] }),
        S.map((R) => /* @__PURE__ */ i.jsx(Bf, { row: R, metric: P, water: p, outdoor: j, cost: N, scale: Of(S, P, a) }, R.key))
      ] }),
      P === "cost" && N && /* @__PURE__ */ i.jsxs("p", { className: "history-hint muted small", children: [
        "An estimate: the boiler's time on × ",
        N.kw.toFixed(1),
        " kW × ",
        ri(N.price, N.currency),
        " per kWh, at today's price.",
        " ",
        N.basis === "meter" ? "The kW is the boiler's average while on, learned from your gas meter." : `The kW is 40% of the boiler's ${N.boiler_kw ?? "?"} kW rating, as a modulating boiler rarely runs flat out. Pick a gas meter in Settings for a closer figure.`
      ] }),
      !p && y.outdoor_entity == null && /* @__PURE__ */ i.jsx("p", { className: "history-hint muted small", children: "To see the temperature outside here, pick a weather entity or outdoor sensor in the Settings tab." })
    ] })
  ] });
}
function Of(e, t, n) {
  if (t === "time" || t === "cost") return { lo: 0, hi: Math.max(60, ...e.map((s) => s.minutes ?? 0)) };
  const r = e.map((s) => s.avg).filter((s) => s != null), l = r.length ? Math.floor(Math.min(...r)) - 2 : 10, o = r.length ? Math.ceil(Math.max(...r)) : 25;
  return { lo: l, hi: Math.max(o, l + 4) };
}
function If({ data: e, metric: t, water: n, units: r, rows: l, cost: o }) {
  const s = Math.max(1, l.filter((b) => b.minutes != null).length), a = e.previous, u = !!(a != null && a.has_data) && a.known_minutes >= 0.5 * e.known_minutes, c = u ? e.heating_minutes - a.heating_minutes : 0, v = e.temperature, g = (b) => o ? qi(b / 60 * o.per_hour, o.currency) : "–", [m, x, w, k] = t === "cost" ? ["Estimated cost", g(e.heating_minutes), `Average per ${r}`, g(e.heating_minutes / s)] : t === "time" ? [n ? "Hot water on" : "Boiler on", Gr(e.heating_minutes), `Average per ${r}`, Gr(e.heating_minutes / s)] : ["Average", v.avg != null ? `${v.avg.toFixed(1)}°` : "–", "Lowest – highest", v.min != null && v.max != null ? `${v.min.toFixed(1)}–${v.max.toFixed(1)}°` : "–"];
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs("div", { className: "history-summary", children: [
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("span", { className: "muted", children: m }),
        /* @__PURE__ */ i.jsx("b", { children: x })
      ] }),
      /* @__PURE__ */ i.jsx("i", {}),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("span", { className: "muted", children: w }),
        /* @__PURE__ */ i.jsx("b", { children: k })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("p", { className: "history-note muted small", children: [
      t === "time" && u && (Math.abs(c) < 1 ? "Same as the period before · " : `${Gr(Math.abs(c))} ${c > 0 ? "more" : "less"} than the period before · `),
      t === "cost" && o && u && (Math.abs(c) < 1 ? "Same as the period before · " : `${g(Math.abs(c))} ${c > 0 ? "more" : "less"} than the period before · `),
      "Fired up ",
      e.cycles,
      " time",
      e.cycles === 1 ? "" : "s",
      e.boosts ? ` · ${e.boosts} boost${e.boosts === 1 ? "" : "s"}` : "",
      t === "temp" && e.target_avg != null ? ` · average target ${e.target_avg.toFixed(1)}°` : "",
      !n && Af(e)
    ] })
  ] });
}
function Af(e) {
  var o, s;
  const t = (o = e.outdoor) == null ? void 0 : o.avg;
  if (t == null) return "";
  const n = (s = e.previous) == null ? void 0 : s.outdoor_avg, r = n != null ? t - n : null, l = r == null ? "" : Math.abs(r) < 0.5 ? ", about the same as the period before" : `, ${Math.abs(r).toFixed(0)}° ${r < 0 ? "colder" : "milder"} than the period before`;
  return ` · ${t.toFixed(0)}° outside${l}`;
}
function Uf(e, t) {
  if (e == null || t == null) return "–";
  const [n, r] = [e.toFixed(0), t.toFixed(0)];
  return n === r ? `${n}°` : `${n}–${r}°`;
}
function Bf({ row: e, metric: t, water: n, outdoor: r, cost: l, scale: o }) {
  const s = t === "temp" ? e.avg : e.minutes, a = s == null ? "–" : t === "time" ? Gr(s) : t === "cost" && l ? qi(s / 60 * l.per_hour, l.currency) : `${s.toFixed(1)}°`, u = s == null ? 0 : Math.max(0.02, Math.min(1, (s - o.lo) / (o.hi - o.lo || 1)));
  return /* @__PURE__ */ i.jsxs("div", { className: `history-row ${r ? "with-outdoor" : ""}`, children: [
    /* @__PURE__ */ i.jsxs("span", { className: "history-day", children: [
      e.label[0],
      " ",
      /* @__PURE__ */ i.jsx("span", { children: e.label[1] })
    ] }),
    /* @__PURE__ */ i.jsxs("span", { className: "history-bar", children: [
      s != null && s > 0 && /* @__PURE__ */ i.jsx("i", { style: { width: `${u * 100}%` } }),
      /* @__PURE__ */ i.jsx("span", { className: "history-value", children: a })
    ] }),
    r && /* @__PURE__ */ i.jsx("span", { className: "history-outdoor", title: "Lowest and highest outside temperature", children: Uf(e.outMin, e.outMax) }),
    !n && /* @__PURE__ */ i.jsxs("span", { className: "history-temps", title: "Lowest and highest room temperature", children: [
      e.min != null ? `${e.min.toFixed(0)}°` : "–",
      /* @__PURE__ */ i.jsx("span", { children: e.max != null ? `${e.max.toFixed(0)}°` : "–" })
    ] })
  ] });
}
const Wf = [
  { id: "control", label: "Control" },
  { id: "schedule", label: "Schedule" },
  { id: "history", label: "History" }
];
function Hf({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  limits: l,
  showDevice: o,
  tab: s,
  onTab: a,
  onBack: u
}) {
  var x, w;
  const [c, v] = _.useState(s === "schedule");
  _.useEffect(() => {
    s === "schedule" && v(!0);
  }, [s]);
  const g = r == null ? void 0 : r.status, m = [
    o ? t.name : null,
    g ? r != null && r.holiday && g.mode !== "boost" ? `Away until ${xn(r.holiday.until)}` : g.mode === "schedule" ? "On schedule" : g.mode === "boost" ? (x = r == null ? void 0 : r.preheat) != null && x.active_for ? `Pre-heating for ${r.preheat.active_for}` : "Boosting" : g.mode === "off" ? "Off" : n === "water" ? "Always on" : "Manual" : "Waiting for the receiver"
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ i.jsxs("div", { className: "device-page", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "page-head", children: [
      /* @__PURE__ */ i.jsx("button", { className: "round ghost", onClick: u, "aria-label": "Back to the overview", children: /* @__PURE__ */ i.jsx($, { name: "chevron-left" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "page-title", children: [
        /* @__PURE__ */ i.jsx("h2", { children: Vn[n] }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: m })
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "page-tabs", role: "tablist", children: Wf.map((k) => /* @__PURE__ */ i.jsx("button", { role: "tab", "aria-selected": k.id === s, className: k.id === s ? "on" : "", onClick: () => a(k.id), children: k.label }, k.id)) }),
    s === "control" && /* @__PURE__ */ i.jsx(Pc, { getHass: e, device: t, channel: n, info: r, showDevice: !1, limits: l, page: !0 }),
    s === "control" && n === "heat" && (r == null ? void 0 : r.preheat) && /* @__PURE__ */ i.jsx(Cf, { getHass: e, device: t, info: r.preheat }),
    c && /* @__PURE__ */ i.jsx("div", { hidden: s !== "schedule", children: /* @__PURE__ */ i.jsx(Tf, { getHass: e, device: t, channel: n, limits: l, mode: (g == null ? void 0 : g.mode) ?? null, preheatFor: (g == null ? void 0 : g.mode) === "boost" ? ((w = r == null ? void 0 : r.preheat) == null ? void 0 : w.active_for) ?? null : null }) }),
    s === "history" && /* @__PURE__ */ i.jsx(Lc, { getHass: e, devices: [t], channel: n })
  ] });
}
const Vf = 20, Qf = 6e4;
function Kf({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onOpenDevice: l
}) {
  const [o, s] = _.useState(null), [a, u] = _.useState(""), [c, v] = _.useState(!1), g = _.useCallback(() => {
    e().callWS({ type: "hive_local/rooms/valves" }).then((x) => s(x.valves)).catch((x) => u(me(x)));
  }, [e]);
  _.useEffect(() => {
    g();
    const x = setInterval(g, Qf);
    return () => clearInterval(x);
  }, [g]);
  const m = t.length > 1;
  return /* @__PURE__ */ i.jsxs("div", { className: "stack devices-page", children: [
    /* @__PURE__ */ i.jsx("h2", { className: "history-title", children: "Devices" }),
    a && /* @__PURE__ */ i.jsx("div", { className: "status error", children: a }),
    /* @__PURE__ */ i.jsxs("div", { className: "device-grid", children: [
      t.map((x) => /* @__PURE__ */ i.jsx(Gf, { device: x, status: n, onOpen: (w) => l(x.entry_id, w) }, x.entry_id)),
      o == null ? void 0 : o.map((x) => /* @__PURE__ */ i.jsx(Xf, { valve: x }, x.entity_id))
    ] }),
    o && !o.length && /* @__PURE__ */ i.jsx("p", { className: "muted", children: "No Hive radiator valves yet. Pair them with ZHA or Zigbee2MQTT and they'll show up here." }),
    m && /* @__PURE__ */ i.jsx("p", { className: "muted small", children: "Each receiver is a heating zone." }),
    /* @__PURE__ */ i.jsx("div", { className: "fab-wrap", children: /* @__PURE__ */ i.jsx("button", { className: "fab", "aria-label": "Add a device", onClick: () => v(!0), children: /* @__PURE__ */ i.jsx($, { name: "plus" }) }) }),
    c && /* @__PURE__ */ i.jsx(Zf, { onClose: () => v(!1) })
  ] });
}
const Yf = { z2m: "Zigbee2MQTT", zha: "ZHA" };
function Mc({ items: e }) {
  return /* @__PURE__ */ i.jsx("div", { className: "facts", children: e.map((t) => /* @__PURE__ */ i.jsxs("span", { className: `fact ${t.warn ? "warn" : ""}`, children: [
    /* @__PURE__ */ i.jsx($, { name: t.icon }),
    " ",
    t.text
  ] }, t.text)) });
}
function Rc({ online: e, text: t }) {
  return /* @__PURE__ */ i.jsxs("span", { className: `online ${e ? "" : "no"}`, children: [
    /* @__PURE__ */ i.jsx("i", {}),
    t ?? (e ? "Online" : "Not responding")
  ] });
}
function Gf({ device: e, status: t, onOpen: n }) {
  const r = e.channels.some((l) => {
    var o, s;
    return (s = (o = t[e.entry_id]) == null ? void 0 : o[l]) == null ? void 0 : s.status;
  });
  return /* @__PURE__ */ i.jsxs("section", { className: "card hw", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "hw-head", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: "radiator" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "device-name", children: [
        /* @__PURE__ */ i.jsx("span", { children: e.name }),
        /* @__PURE__ */ i.jsxs("span", { className: "muted small", children: [
          "Hive receiver",
          e.model ? ` · ${e.model}` : ""
        ] })
      ] }),
      /* @__PURE__ */ i.jsx(Rc, { online: r, text: r ? "Online" : "Waiting" })
    ] }),
    /* @__PURE__ */ i.jsx(
      Mc,
      {
        items: [
          { icon: "zigbee", text: Yf[e.transport ?? "z2m"] },
          { icon: "fire", text: e.channels.includes("water") ? "Heating and hot water" : "Heating only" }
        ]
      }
    ),
    /* @__PURE__ */ i.jsx("div", { className: "hw-links", children: e.channels.map((l) => /* @__PURE__ */ i.jsxs("button", { className: "hw-link", onClick: () => n(l), children: [
      Vn[l],
      " ",
      /* @__PURE__ */ i.jsx($, { name: "chevron-right" })
    ] }, l)) })
  ] });
}
function Xf({ valve: e }) {
  const t = e.battery != null && !Number.isNaN(Number(e.battery)) ? Number(e.battery) : null, n = t != null && t < Vf;
  return /* @__PURE__ */ i.jsxs("section", { className: `card hw ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ i.jsxs("div", { className: "hw-head", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: "thermostat" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "device-name", children: [
        /* @__PURE__ */ i.jsx("span", { children: e.name }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "Hive radiator valve" })
      ] }),
      /* @__PURE__ */ i.jsx(Rc, { online: e.available })
    ] }),
    /* @__PURE__ */ i.jsx(
      Mc,
      {
        items: [
          { icon: "home-outline", text: e.room ?? "Not in a room" },
          ...t != null ? [{ icon: n ? "battery-alert-variant-outline" : "battery-high", text: `Battery ${t}%`, warn: n }] : [],
          ...e.available && e.current_temperature != null ? [{ icon: "thermometer", text: `${Number(e.current_temperature).toFixed(1)}° now` }] : []
        ]
      }
    )
  ] });
}
function Zf({ onClose: e }) {
  const [t, n] = _.useState(!1);
  _.useEffect(() => {
    const l = (o) => o.key === "Escape" && e();
    return window.addEventListener("keydown", l), () => window.removeEventListener("keydown", l);
  }, [e]);
  const r = () => {
    history.pushState(null, "", "/config/integrations/dashboard/add?domain=hive_local"), window.dispatchEvent(new CustomEvent("location-changed")), e();
  };
  return /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: e, children: /* @__PURE__ */ i.jsxs("div", { className: "sheet heat", role: "dialog", "aria-modal": "true", "aria-label": "Add a device", onClick: (l) => l.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ i.jsx("div", { className: "sheet-title", children: /* @__PURE__ */ i.jsx("h2", { children: "Add a device" }) }),
    /* @__PURE__ */ i.jsxs("div", { className: "add-options", children: [
      /* @__PURE__ */ i.jsxs("button", { className: "add-option", onClick: r, children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: "radiator" }) }),
        /* @__PURE__ */ i.jsxs("span", { className: "add-text", children: [
          /* @__PURE__ */ i.jsx("b", { children: "Hive receiver" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "A boiler receiver (another heating zone). Opens Home Assistant's setup for Hive Local." })
        ] }),
        /* @__PURE__ */ i.jsx($, { name: "chevron-right" })
      ] }),
      /* @__PURE__ */ i.jsxs("button", { className: "add-option", onClick: () => n(!t), children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: "thermostat" }) }),
        /* @__PURE__ */ i.jsxs("span", { className: "add-text", children: [
          /* @__PURE__ */ i.jsx("b", { children: "Radiator valve" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: t ? "Pair it with ZHA or Zigbee2MQTT first (Settings → Devices & services). It then appears here, and you can put it in a room in the Settings tab." : "A Hive radiator valve (UK7004240)." })
        ] }),
        /* @__PURE__ */ i.jsx($, { name: t ? "chevron-up" : "chevron-down" })
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: e, children: "Close" })
  ] }) });
}
const Fc = 20, wl = (e) => e == null ? "–" : `${e.toFixed(1)}°`;
function Jf({ valve: e, heating: t }) {
  const n = e.battery == null ? null : Number(e.battery), r = n != null && !Number.isNaN(n) && n <= Fc;
  return /* @__PURE__ */ i.jsxs("li", { className: `valve ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ i.jsx($, { name: t ? "fire" : "radiator", className: t ? "valve-icon heating" : "valve-icon" }),
    /* @__PURE__ */ i.jsx("span", { className: "valve-name", children: e.name }),
    e.available ? /* @__PURE__ */ i.jsxs("span", { className: "valve-temps", children: [
      wl(e.current_temperature),
      " ",
      /* @__PURE__ */ i.jsxs("span", { className: "muted", children: [
        "→ ",
        wl(e.target)
      ] })
    ] }) : /* @__PURE__ */ i.jsx("span", { className: "chip", children: "Unavailable" }),
    n != null && !Number.isNaN(n) && /* @__PURE__ */ i.jsxs("span", { className: `battery ${r ? "low" : ""}`, title: r ? "Battery low" : "Battery", children: [
      /* @__PURE__ */ i.jsx($, { name: r ? "battery-alert-variant-outline" : "battery-outline" }),
      " ",
      Math.round(n),
      "%"
    ] })
  ] });
}
const qf = 8;
function eh({ getHass: e, valves: t, info: n, roomName: r, thisRoom: l, chosen: o, onToggle: s }) {
  const [a, u] = _.useState(null), [c, v] = _.useState(null), g = _.useRef();
  _.useEffect(() => () => window.clearTimeout(g.current), []);
  const [m, x] = _.useState(""), w = t.length > qf, k = m.trim().toLowerCase(), b = r.trim().toLowerCase(), f = (j) => !!b && (j.area ?? "").toLowerCase() === b, d = (j) => {
    var P;
    const N = (P = n.get(j.entity_id)) == null ? void 0 : P.room;
    return N && N !== l ? N : null;
  }, [p] = _.useState(() => new Set(o)), h = (j) => p.has(j.entity_id) ? 0 : f(j) ? 1 : d(j) ? 3 : 2, y = [...t].sort((j, N) => h(j) - h(N)), S = k ? y.filter((j) => j.name.toLowerCase().includes(k) || (j.area ?? "").toLowerCase().includes(k)) : y, z = async (j) => {
    v(null), u(j.entity_id);
    try {
      await e().callWS({ type: "hive_local/rooms/identify", entity_id: j.entity_id }), v({ kind: "ok", text: `${j.name} is flashing its light.` }), window.clearTimeout(g.current), g.current = window.setTimeout(() => {
        u(null), v(null);
      }, 1e4);
    } catch (N) {
      u(null), v({ kind: "error", text: me(N) });
    }
  };
  return t.length ? /* @__PURE__ */ i.jsxs("div", { className: "valve-picker", children: [
    w && /* @__PURE__ */ i.jsxs("label", { className: "valve-search", children: [
      /* @__PURE__ */ i.jsx($, { name: "magnify" }),
      /* @__PURE__ */ i.jsx("input", { type: "search", value: m, placeholder: "Search valves or areas", "aria-label": "Search valves or areas", onChange: (j) => x(j.target.value) }),
      m && /* @__PURE__ */ i.jsx("button", { type: "button", className: "ghost round", "aria-label": "Clear the search", onClick: () => x(""), children: /* @__PURE__ */ i.jsx($, { name: "close" }) })
    ] }),
    !S.length && k && /* @__PURE__ */ i.jsxs("span", { className: "muted small", children: [
      'No valves match "',
      m.trim(),
      '".'
    ] }),
    S.length > 0 && /* @__PURE__ */ i.jsx("div", { className: "valve-list", children: S.map((j) => {
      const N = n.get(j.entity_id), P = o.has(j.entity_id), I = (N == null ? void 0 : N.battery) == null ? null : Number(N.battery), R = I != null && !Number.isNaN(I), J = R && I <= Fc, xe = d(j);
      return /* @__PURE__ */ i.jsxs("div", { className: `valve-pick ${P ? "on" : ""}`, children: [
        /* @__PURE__ */ i.jsxs("button", { type: "button", role: "checkbox", "aria-checked": P, className: "valve-pick-main", onClick: () => s(j.entity_id), children: [
          /* @__PURE__ */ i.jsx("span", { className: `valve-check ${P ? "on" : ""}`, "aria-hidden": "true", children: P && /* @__PURE__ */ i.jsx($, { name: "check" }) }),
          /* @__PURE__ */ i.jsxs("span", { className: "valve-pick-text", children: [
            /* @__PURE__ */ i.jsx("span", { children: j.name }),
            /* @__PURE__ */ i.jsx("span", { className: "muted small", children: [j.area ?? "No area", xe ? `in ${xe}` : null].filter(Boolean).join(" · ") })
          ] }),
          /* @__PURE__ */ i.jsx("span", { className: "valve-pick-read small", children: N && !N.available ? "Not responding" : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
            (N == null ? void 0 : N.current_temperature) != null ? `${N.current_temperature.toFixed(1)}°` : "",
            R && /* @__PURE__ */ i.jsxs("span", { className: J ? "warn" : "", children: [
              (N == null ? void 0 : N.current_temperature) != null ? " · " : "",
              Math.round(I),
              "%"
            ] })
          ] }) })
        ] }),
        (N == null ? void 0 : N.identify) && /* @__PURE__ */ i.jsxs("button", { type: "button", className: `valve-find ${a === j.entity_id ? "on" : ""}`, onClick: () => z(j), disabled: a === j.entity_id, "aria-label": `Find ${j.name}: flash its light`, children: [
          /* @__PURE__ */ i.jsx($, { name: "lightbulb-on-outline" }),
          " ",
          /* @__PURE__ */ i.jsx("span", { className: "valve-find-label", children: a === j.entity_id ? "Flashing" : "Find" })
        ] })
      ] }, j.entity_id);
    }) }),
    c && /* @__PURE__ */ i.jsx("div", { className: `status ${c.kind} small`, children: c.text })
  ] }) : null;
}
function Dc({ dialog: e, label: t, onClose: n, children: r }) {
  return e ? /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: (l) => {
    l.stopPropagation(), n();
  }, children: /* @__PURE__ */ i.jsxs("div", { className: "sheet room-sheet room-editor", role: "dialog", "aria-modal": "true", "aria-label": t, onClick: (l) => l.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    r
  ] }) }) : /* @__PURE__ */ i.jsx("section", { className: "card room-editor", children: r });
}
function th(e) {
  return /* @__PURE__ */ i.jsx(Oc, { ...e, dialog: !0 });
}
function Oc({ getHass: e, room: t, onDone: n, dialog: r }) {
  _.useEffect(() => {
    if (!r) return;
    const N = (P) => P.key === "Escape" && n();
    return window.addEventListener("keydown", N), () => window.removeEventListener("keydown", N);
  }, [r, n]);
  const [l, o] = _.useState(null), [s, a] = _.useState((t == null ? void 0 : t.receiver) ?? ""), [u, c] = _.useState((t == null ? void 0 : t.name) ?? ""), [v, g] = _.useState(new Set((t == null ? void 0 : t.valves) ?? [])), [m, x] = _.useState((t == null ? void 0 : t.sensor) ?? ""), [w, k] = _.useState(!1), [b, f] = _.useState(!1), [d, p] = _.useState(""), [h, y] = _.useState(/* @__PURE__ */ new Map());
  _.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/candidates" }).then(o).catch((N) => p(me(N))), e().callWS({ type: "hive_local/rooms/valves" }).then((N) => y(new Map(N.valves.map((P) => [P.entity_id, P])))).catch(() => {
    });
  }, [e]);
  const S = ((l == null ? void 0 : l.receivers.length) ?? 0) > 1, z = async (N) => {
    k(!0), p("");
    try {
      await e().callWS(N), n();
    } catch (P) {
      p(me(P)), k(!1);
    }
  }, j = (N) => g((P) => {
    const I = new Set(P);
    return I.has(N) ? I.delete(N) : I.add(N), I;
  });
  return /* @__PURE__ */ i.jsxs(Dc, { dialog: !!r, label: t ? `Edit ${t.name}` : "New room", onClose: n, children: [
    /* @__PURE__ */ i.jsx("h2", { children: t ? `Edit ${t.name}` : "New room" }),
    /* @__PURE__ */ i.jsxs(
      "form",
      {
        className: "stack",
        onSubmit: (N) => {
          N.preventDefault(), z({
            type: "hive_local/rooms/save",
            ...t ? { room_id: t.id } : {},
            name: u,
            valves: [...v],
            sensor: m || null,
            receiver: s || null
          });
        },
        children: [
          /* @__PURE__ */ i.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ i.jsx("span", { children: "Name" }),
            /* @__PURE__ */ i.jsx("input", { id: `room-name-${(t == null ? void 0 : t.id) ?? "new"}`, type: "text", value: u, maxLength: 40, placeholder: "Lounge", onChange: (N) => c(N.target.value) })
          ] }),
          /* @__PURE__ */ i.jsxs("fieldset", { className: "field", children: [
            /* @__PURE__ */ i.jsxs("legend", { children: [
              "Hive radiator valves",
              v.size > 0 && /* @__PURE__ */ i.jsxs("span", { className: "valve-count", children: [
                v.size,
                " chosen"
              ] })
            ] }),
            !l && !d && /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "Loading…" }),
            l && !l.valves.length && /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "No Hive radiator valves found. Pair them with ZHA or Zigbee2MQTT first." }),
            /* @__PURE__ */ i.jsx(eh, { getHass: e, valves: (l == null ? void 0 : l.valves) ?? [], info: h, roomName: u, thisRoom: (t == null ? void 0 : t.name) ?? null, chosen: v, onToggle: j })
          ] }),
          /* @__PURE__ */ i.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ i.jsx("span", { children: "Room temperature from" }),
            /* @__PURE__ */ i.jsxs("select", { id: `room-sensor-${(t == null ? void 0 : t.id) ?? "new"}`, value: m, onChange: (N) => x(N.target.value), children: [
              /* @__PURE__ */ i.jsx("option", { value: "", children: "The valves (their average)" }),
              ((l == null ? void 0 : l.sensors) ?? []).map((N) => /* @__PURE__ */ i.jsxs("option", { value: N.entity_id, children: [
                N.name,
                N.area ? ` · ${N.area}` : ""
              ] }, N.entity_id))
            ] })
          ] }),
          S && /* @__PURE__ */ i.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ i.jsx("span", { children: "Heated by" }),
            /* @__PURE__ */ i.jsxs("select", { id: `room-receiver-${(t == null ? void 0 : t.id) ?? "new"}`, value: s, onChange: (N) => a(N.target.value), children: [
              /* @__PURE__ */ i.jsx("option", { value: "", disabled: !0, children: "Choose the receiver for this room's radiators" }),
              l.receivers.map((N) => /* @__PURE__ */ i.jsx("option", { value: N.entry_id, children: N.name }, N.entry_id))
            ] })
          ] }),
          d && /* @__PURE__ */ i.jsx("div", { className: "status error", children: d }),
          /* @__PURE__ */ i.jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ i.jsx("button", { className: "primary", type: "submit", disabled: w || !u.trim() || !v.size || S && !s, children: t ? "Save" : "Add room" }),
            /* @__PURE__ */ i.jsx("button", { type: "button", className: "ghost", onClick: n, disabled: w, children: "Cancel" }),
            /* @__PURE__ */ i.jsx("span", { className: "spacer" }),
            t && (b ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
              /* @__PURE__ */ i.jsxs("span", { className: "muted small", children: [
                "Delete ",
                t.name,
                "? The valves aren't changed."
              ] }),
              /* @__PURE__ */ i.jsx("button", { type: "button", className: "danger", disabled: w, onClick: () => z({ type: "hive_local/rooms/delete", room_id: t.id }), children: "Delete" }),
              /* @__PURE__ */ i.jsx("button", { type: "button", className: "ghost", onClick: () => f(!1), children: "Keep" })
            ] }) : /* @__PURE__ */ i.jsxs("button", { type: "button", className: "danger", onClick: () => f(!0), disabled: w, children: [
              /* @__PURE__ */ i.jsx($, { name: "delete-outline" }),
              " Delete room"
            ] }))
          ] })
        ]
      }
    )
  ] });
}
function nh({ getHass: e, roomId: t, several: n, onClose: r }) {
  var f;
  const [l, o] = _.useState(null), [s, a] = _.useState(!1), [u, c] = _.useState(null), [v, g] = _.useState(""), m = _.useRef();
  if (_.useEffect(() => {
    const d = e().connection.subscribeMessage(
      (p) => o(p.rooms.find((h) => h.id === t) ?? null),
      { type: "hive_local/rooms/subscribe" }
    );
    return () => {
      d.then((p) => p()).catch(() => {
      });
    };
  }, [e, t]), _.useEffect(() => {
    if (s) return;
    const d = (p) => p.key === "Escape" && r();
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, [r, s]), !l) return null;
  if (s) return /* @__PURE__ */ i.jsx(Oc, { getHass: e, room: l, onDone: () => a(!1), dialog: !0 });
  const x = u ?? l.target ?? ((f = l.target_range) == null ? void 0 : f[1]) ?? 20, w = (d) => {
    const p = Math.min(35, Math.max(5, d));
    c(p), g(""), window.clearTimeout(m.current), m.current = window.setTimeout(async () => {
      try {
        const h = await e().callWS({ type: "hive_local/rooms/set_target", room_id: l.id, temperature: p });
        if (h.failed.length) {
          const y = l.valve_states.filter((S) => h.failed.includes(S.entity_id)).map((S) => S.name);
          g(`Didn't take on ${y.join(", ")}. It may be asleep; try again shortly.`);
        }
      } catch (h) {
        g(me(h));
      } finally {
        c(null);
      }
    }, 700);
  }, k = `${l.valves.length} valve${l.valves.length === 1 ? "" : "s"}`, b = l.temperature_source === "sensor" ? l.sensor_name : l.temperature_source === "valves" ? "Average of the valves" : "No reading";
  return /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: (d) => {
    d.stopPropagation(), r();
  }, children: /* @__PURE__ */ i.jsxs("div", { className: "sheet heat room-sheet", role: "dialog", "aria-modal": "true", "aria-label": l.name, onClick: (d) => d.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ i.jsx("h2", { children: l.name }),
      /* @__PURE__ */ i.jsx("span", { className: "muted", children: [l.heating ? "Heating" : "Idle", n ? l.receiver_name : null, k].filter(Boolean).join(" · ") })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-live", children: [
      /* @__PURE__ */ i.jsx($, { name: l.heating ? "fire" : "thermometer", className: l.heating ? "heating" : "" }),
      /* @__PURE__ */ i.jsxs("span", { children: [
        /* @__PURE__ */ i.jsx("b", { children: l.current_temperature == null ? "–" : `${l.current_temperature.toFixed(1)}°` }),
        " ",
        /* @__PURE__ */ i.jsx("span", { className: "muted", children: b })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: l.target_range && u == null ? `Target (valves set to ${wl(l.target_range[0])}–${wl(l.target_range[1])})` : "Target" }),
      /* @__PURE__ */ i.jsxs("div", { className: "sheet-temp", children: [
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => w(x - 0.5), "aria-label": "Lower", children: /* @__PURE__ */ i.jsx($, { name: "minus" }) }),
        /* @__PURE__ */ i.jsxs("span", { className: "sheet-temp-value", children: [
          x.toFixed(1),
          "°"
        ] }),
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => w(x + 0.5), "aria-label": "Raise", children: /* @__PURE__ */ i.jsx($, { name: "plus" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Valves" }),
      /* @__PURE__ */ i.jsx("ul", { className: "valves", children: l.valve_states.map((d) => /* @__PURE__ */ i.jsx(Jf, { valve: d, heating: l.heating_valves.includes(d.entity_id) }, d.entity_id)) })
    ] }),
    v && /* @__PURE__ */ i.jsx("div", { className: "status error", children: v }),
    /* @__PURE__ */ i.jsxs("div", { className: "room-sheet-actions", children: [
      /* @__PURE__ */ i.jsxs("button", { className: "ghost", onClick: () => a(!0), children: [
        /* @__PURE__ */ i.jsx($, { name: "pencil-outline" }),
        " Edit room"
      ] }),
      /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: r, children: "Close" })
    ] })
  ] }) });
}
function rh(e) {
  const t = e.toLowerCase();
  return /lounge|living|sitting|family|snug/.test(t) ? "sofa-outline" : /bed|nursery|guest/.test(t) ? "bed-outline" : /kitchen|dining/.test(t) ? "silverware-fork-knife" : /landing|hall|stair/.test(t) ? "stairs" : /study|office/.test(t) ? "desk" : /bath|shower|en-?suite|wc|toilet/.test(t) ? "shower" : "home-thermometer-outline";
}
function lh({ getHass: e, onDone: t }) {
  const [n, r] = _.useState(null), [l, o] = _.useState(/* @__PURE__ */ new Map()), [s, a] = _.useState(/* @__PURE__ */ new Set()), [u, c] = _.useState({}), [v, g] = _.useState(!1), [m, x] = _.useState("");
  _.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/suggest" }).then((h) => {
      r(h), a(new Set(h.rooms.map((y, S) => S)));
    }).catch((h) => x(me(h))), e().callWS({ type: "hive_local/rooms/candidates" }).then((h) => o(new Map([...h.valves, ...h.sensors].map((y) => [y.entity_id, y.name])))).catch(() => {
    });
  }, [e]);
  const w = ((n == null ? void 0 : n.receivers.length) ?? 0) > 1, k = ((n == null ? void 0 : n.rooms) ?? []).map((h, y) => [h, y]).filter(([, h]) => s.has(h)), b = k.length > 0 && (!w || k.every(([, h]) => u[h])), f = ((n == null ? void 0 : n.rooms) ?? []).reduce((h, y) => h + y.valves.length, 0), d = async () => {
    g(!0), x("");
    try {
      for (const [h, y] of k)
        await e().callWS({ type: "hive_local/rooms/save", name: h.name, valves: h.valves, sensor: h.sensor, receiver: u[y] ?? null });
      t();
    } catch (h) {
      x(me(h)), g(!1);
    }
  }, p = (h) => a((y) => {
    const S = new Set(y);
    return S.has(h) ? S.delete(h) : S.add(h), S;
  });
  return /* @__PURE__ */ i.jsxs(Dc, { dialog: !0, label: "Set up your rooms", onClose: t, children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Set up your rooms" }),
    !n && !m && /* @__PURE__ */ i.jsx("p", { className: "muted setup-intro", children: "Looking for your valves…" }),
    n && !n.rooms.length && /* @__PURE__ */ i.jsx("p", { className: "muted setup-intro", children: "Every Hive radiator valve with an area is already in a room. Give the others an area in Home Assistant, or add rooms by hand." }),
    n && n.rooms.length > 0 && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs("p", { className: "muted setup-intro", children: [
        "Found ",
        f,
        " Hive radiator valve",
        f === 1 ? "" : "s",
        " in ",
        n.rooms.length,
        " area",
        n.rooms.length === 1 ? "" : "s",
        ". Pick the rooms to create. You can rename or change any of them later."
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "setup-list", children: n.rooms.map((h, y) => {
        const S = s.has(y), z = h.valves.map((N) => l.get(N) ?? N).join(", "), j = h.sensor ? `Temperature: ${l.get(h.sensor) ?? h.sensor}` : h.valves.length === 1 ? "Temperature: from the valve" : "Temperature: average of the valves";
        return /* @__PURE__ */ i.jsxs("div", { className: `setup-room ${S ? "on" : ""}`, children: [
          /* @__PURE__ */ i.jsxs("button", { type: "button", role: "checkbox", "aria-checked": S, className: "setup-room-main", onClick: () => p(y), children: [
            /* @__PURE__ */ i.jsx("span", { className: `valve-check ${S ? "on" : ""}`, "aria-hidden": "true", children: S && /* @__PURE__ */ i.jsx($, { name: "check" }) }),
            /* @__PURE__ */ i.jsxs("span", { className: "setup-room-text", children: [
              /* @__PURE__ */ i.jsx("span", { children: h.name }),
              /* @__PURE__ */ i.jsx("span", { className: "muted small", children: z }),
              /* @__PURE__ */ i.jsx("span", { className: "muted small", children: j })
            ] }),
            /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: rh(h.name) }) })
          ] }),
          w && S && /* @__PURE__ */ i.jsxs("select", { "aria-label": `Which receiver heats ${h.name}`, value: u[y] ?? "", onChange: (N) => c((P) => ({ ...P, [y]: N.target.value })), children: [
            /* @__PURE__ */ i.jsx("option", { value: "", disabled: !0, children: "Heated by…" }),
            n.receivers.map((N) => /* @__PURE__ */ i.jsx("option", { value: N.entry_id, children: N.name }, N.entry_id))
          ] })
        ] }, h.name);
      }) })
    ] }),
    m && /* @__PURE__ */ i.jsx("div", { className: "status error", children: m }),
    n && n.rooms.length > 0 && /* @__PURE__ */ i.jsx("button", { className: "sheet-go", style: { "--hl-accent": "var(--hl-brand)" }, disabled: v || !b, onClick: d, children: v ? "Creating…" : `Create ${k.length} room${k.length === 1 ? "" : "s"}` }),
    /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: t, disabled: v, children: n != null && n.rooms.length ? "I'll set them up myself" : "Close" })
  ] });
}
function oh({ getHass: e, devices: t, status: n }) {
  const [r, l] = _.useState(null), [o, s] = _.useState("");
  _.useEffect(() => {
    e().callWS({ type: "hive_local/settings" }).then(l).catch((c) => s(me(c)));
  }, [e]);
  const a = (c) => {
    l((v) => v && { ...v, ...c }), e().callWS({ type: "hive_local/settings/set", ...c }).then((v) => {
      l(v), s("");
    }).catch((v) => s(me(v)));
  }, u = (c) => a({ outdoor_entity: c || null });
  return /* @__PURE__ */ i.jsxs("div", { className: "settings", children: [
    /* @__PURE__ */ i.jsx("h2", { className: "history-title", children: "Settings" }),
    o && /* @__PURE__ */ i.jsx("div", { className: "status error", children: o }),
    /* @__PURE__ */ i.jsxs("section", { className: "settings-section", children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Outside temperature" }),
      /* @__PURE__ */ i.jsx("div", { className: "settings-group", children: /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: "weather-partly-cloudy" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: "Weather or outdoor sensor" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "Shown in the heating history, next to the boiler's time on." })
        ] }),
        /* @__PURE__ */ i.jsxs("select", { "aria-label": "Outside temperature", value: (r == null ? void 0 : r.outdoor_entity) ?? "", onChange: (c) => u(c.target.value), disabled: !r, children: [
          /* @__PURE__ */ i.jsx("option", { value: "", children: "None" }),
          ((r == null ? void 0 : r.outdoor_candidates) ?? []).map((c) => /* @__PURE__ */ i.jsxs("option", { value: c.entity_id, children: [
            c.name,
            c.area ? ` · ${c.area}` : ""
          ] }, c.entity_id))
        ] })
      ] }) })
    ] }),
    r && /* @__PURE__ */ i.jsx(ih, { data: r, save: a }),
    /* @__PURE__ */ i.jsx(ah, { getHass: e }),
    t.map((c) => /* @__PURE__ */ i.jsxs("section", { className: "settings-section", children: [
      /* @__PURE__ */ i.jsx("h3", { children: t.length > 1 ? c.name : "Receiver" }),
      /* @__PURE__ */ i.jsx("div", { className: "settings-group", children: c.channels.map((v) => {
        var g;
        return /* @__PURE__ */ i.jsx(ch, { getHass: e, device: c, channel: v, info: (g = n[c.entry_id]) == null ? void 0 : g[v] }, v);
      }) })
    ] }, c.entry_id))
  ] });
}
const ma = [6, 9, 12, 15, 18, 20, 24, 25, 28, 30, 32, 35, 40, 45, 50];
function ih({ data: e, save: t }) {
  const [n, r] = _.useState(null), l = _.useRef(null), o = _.useRef(), s = e.boiler_kw, a = (b) => {
    if (s == null) return t({ boiler_kw: 24 });
    const f = b > 0 ? ma.find((d) => d > s) : [...ma].reverse().find((d) => d < s);
    t({ boiler_kw: f ?? s });
  }, u = sh[e.currency], c = n ?? e.fixed_price, v = (b, f = 0) => {
    const d = l.current ?? e.fixed_price ?? 0.06, p = f > 15 ? 1e-3 : 1e-4, h = Math.max(0, Math.round((b > 0 ? Math.floor(d / p + 1e-6) + 1 : Math.ceil(d / p - 1e-6) - 1) * p * 1e4) / 1e4);
    l.current = h, r(h), window.clearTimeout(o.current), o.current = window.setTimeout(() => {
      t({ price_source: "fixed", fixed_price: h }), l.current = null, r(null);
    }, 800);
  }, g = (b) => (
    // A fixed price starts from whatever price was in use, so it's a few taps from right.
    t(b === "fixed" && e.fixed_price == null ? { price_source: b, fixed_price: e.price ?? 0.06 } : { price_source: b || null })
  ), m = e.fit, x = e.gas_meter ? m ? `Learned ${m.kw.toFixed(1)} kW while heating from ${m.days} days${m.baseline >= 0.5 ? ` (plus ${m.baseline.toFixed(0)} kWh a day for hot water and cooking)` : ""}.` : e.learned_at ? "Not enough yet: it needs at least 4 days of readings with the heating on. Checked every 6 hours." : "Learning from the last 14 days…" : "Learns the boiler's real average output from your gas use. Hot water and cooking on the same meter are allowed for.", w = (b) => b != null ? `${ri(b, e.currency)} per kWh` : null, k = e.price_source === "fixed" ? "Your unit rate, below." : e.price_source === "energy" && e.energy_price == null ? "The Energy dashboard has no gas price (or it can't be read)." : e.price_source && e.price_source !== "fixed" && e.price == null ? "That entity has no price right now." : w(e.price) ?? "Pick where the price comes from.";
  return /* @__PURE__ */ i.jsxs("section", { className: "settings-section", children: [
    /* @__PURE__ */ i.jsx("h3", { children: "Heating cost" }),
    /* @__PURE__ */ i.jsx("p", { className: "muted small settings-help", children: "An estimated cost in the heating history: the boiler's time on × its average output while on × the gas price. A modern boiler turns its flame down, so it averages well below its rating: a gas meter gives the real figure." }),
    /* @__PURE__ */ i.jsxs("div", { className: "settings-group", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: "meter-gas-outline" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: "Gas meter" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: x })
        ] }),
        /* @__PURE__ */ i.jsxs("select", { "aria-label": "Gas meter", value: e.gas_meter ?? "", onChange: (b) => t({ gas_meter: b.target.value || null }), children: [
          /* @__PURE__ */ i.jsx("option", { value: "", children: "None" }),
          e.gas_meter_candidates.map((b) => /* @__PURE__ */ i.jsxs("option", { value: b.entity_id, children: [
            b.name,
            b.area ? ` · ${b.area}` : ""
          ] }, b.entity_id))
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: "fire" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: "Boiler rating" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: e.output_basis === "meter" ? "Not needed while the gas meter gives the output." : `Its heating output in kW, from the manual or label (often 24–35 kW for a combi). Counted at ${Math.round(e.modulation * 100)}% without a gas meter.` })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-controls", children: [
          /* @__PURE__ */ i.jsx(Qn, { value: s != null ? `${s.toLocaleString()} kW` : "Not set", onLower: () => a(-1), onRaise: () => a(1) }),
          s != null && /* @__PURE__ */ i.jsx("button", { className: "ghost small", onClick: () => t({ boiler_kw: null }), children: "Clear" })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: "cash" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: "Gas price" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: k })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "settings-controls", children: /* @__PURE__ */ i.jsxs("select", { "aria-label": "Gas price", value: e.price_source ?? "", onChange: (b) => g(b.target.value), children: [
          /* @__PURE__ */ i.jsx("option", { value: "", children: "None" }),
          /* @__PURE__ */ i.jsx("option", { value: "energy", children: "Energy dashboard" }),
          /* @__PURE__ */ i.jsx("option", { value: "fixed", children: "Unit rate" }),
          e.price_candidates.map((b) => /* @__PURE__ */ i.jsxs("option", { value: b.entity_id, children: [
            b.name,
            " (",
            b.unit,
            ")"
          ] }, b.entity_id))
        ] }) })
      ] }),
      e.price_source === "fixed" && /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: "tag-outline" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: "Unit rate" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "From your bill or tariff: the gas price per kWh, without the standing charge." })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "settings-controls", children: /* @__PURE__ */ i.jsx(
          Qn,
          {
            value: c == null ? "–" : u ? `${(c * 100).toFixed(2)}${u}` : ri(c, e.currency),
            onLower: (b) => v(-1, b),
            onRaise: (b) => v(1, b),
            hold: !0
          }
        ) })
      ] })
    ] })
  ] });
}
const sh = { GBP: "p", EUR: "c", USD: "¢", CAD: "¢", AUD: "c", NZD: "c", IEP: "p" };
function ah({ getHass: e }) {
  const [t, n] = _.useState(null), [r, l] = _.useState([]), [o, s] = _.useState(null), [a, u] = _.useState(!1), [c, v] = _.useState(0);
  _.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/suggest" }).then((m) => v(m.rooms.length)).catch(() => {
    });
  }, [e, t]), _.useEffect(() => {
    const m = e().connection.subscribeMessage(
      (x) => {
        n(x.rooms), l(x.receivers);
      },
      { type: "hive_local/rooms/subscribe" }
    );
    return () => {
      m.then((x) => x()).catch(() => {
      });
    };
  }, [e]);
  const g = r.length > 1;
  return /* @__PURE__ */ i.jsxs("section", { className: "settings-section", children: [
    /* @__PURE__ */ i.jsx("h3", { children: "Rooms" }),
    /* @__PURE__ */ i.jsx("p", { className: "muted small settings-help", children: "Group your Hive radiator valves into rooms. Each room then has a card on the Overview." }),
    /* @__PURE__ */ i.jsxs("div", { className: "settings-group", children: [
      (t ?? []).map((m) => /* @__PURE__ */ i.jsxs("button", { className: "settings-row link", onClick: () => s(m.id), children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: "home-thermometer-outline" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: m.name }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: [
            `${m.valves.length} valve${m.valves.length === 1 ? "" : "s"}`,
            m.sensor_name ?? "temperature from the valves",
            g ? `heated by ${m.receiver_name}` : null
          ].filter(Boolean).join(" · ") })
        ] }),
        /* @__PURE__ */ i.jsx($, { name: "chevron-right", className: "settings-chevron" })
      ] }, m.id)),
      c > 0 && /* @__PURE__ */ i.jsxs("button", { className: "settings-row link add", onClick: () => u(!0), children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: "auto-fix" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: t != null && t.length ? "Add rooms from your areas" : "Set up rooms from your areas" }),
          /* @__PURE__ */ i.jsxs("span", { className: "muted small", children: [
            c,
            " area",
            c === 1 ? " has" : "s have",
            " Hive valves that aren't in a room yet"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("button", { className: "settings-row link add", onClick: () => s("new"), children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: "plus" }) }),
        /* @__PURE__ */ i.jsx("div", { className: "settings-text", children: /* @__PURE__ */ i.jsx("span", { children: "Add a room" }) })
      ] })
    ] }),
    a && /* @__PURE__ */ i.jsx(lh, { getHass: e, onDone: () => u(!1) }),
    o && /* @__PURE__ */ i.jsx(
      th,
      {
        getHass: e,
        room: o === "new" || t == null ? void 0 : t.find((m) => m.id === o),
        onDone: () => s(null)
      }
    )
  ] });
}
const uh = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, Rr = [15, 30, 45, 60, 90, 120, 180, 240, 360];
function ch({ getHass: e, device: t, channel: n, info: r }) {
  const [l, o] = _.useState(null), s = _.useRef(), a = l ?? r;
  if (!a) return null;
  const u = (g, m) => {
    const x = { ...a, [g]: m };
    o(x), window.clearTimeout(s.current), s.current = window.setTimeout(() => {
      e().callWS({ type: "hive_local/defaults", entry_id: t.entry_id, channel: n, [g]: m }).finally(() => o(null));
    }, 800);
  }, c = (g) => {
    const m = Rr.findIndex((w) => w >= a.boost_minutes), x = m < 0 ? Rr.length - 1 : m;
    return Rr[Math.min(Rr.length - 1, Math.max(0, x + g))];
  }, v = n === "water";
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: v ? "water-boiler" : "radiator" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
        /* @__PURE__ */ i.jsx("span", { children: v ? "Hot water boost" : "Heating boost" }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "What Boost does unless you choose otherwise." })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-controls", children: [
        /* @__PURE__ */ i.jsx(Qn, { label: "How long", value: uh(a.boost_minutes), onLower: () => u("boost_minutes", c(-1)), onRaise: () => u("boost_minutes", c(1)) }),
        !v && /* @__PURE__ */ i.jsx(Qn, { label: "Temperature", value: `${a.boost_temperature.toFixed(1)}°`, onLower: () => u("boost_temperature", Math.max(5, a.boost_temperature - 0.5)), onRaise: () => u("boost_temperature", Math.min(32, a.boost_temperature + 0.5)) })
      ] })
    ] }),
    !v && /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx($, { name: "snowflake" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
        /* @__PURE__ */ i.jsx("span", { children: "Frost protection" }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "The target shown while the schedule has the heating off. Only for display: the receiver isn't changed." })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "settings-controls", children: /* @__PURE__ */ i.jsx(Qn, { value: `${a.frost_temperature.toFixed(1)}°`, onLower: () => u("frost_temperature", Math.max(5, a.frost_temperature - 0.5)), onRaise: () => u("frost_temperature", Math.min(16, a.frost_temperature + 0.5)) }) })
    ] })
  ] });
}
function Qn({ label: e, value: t, onLower: n, onRaise: r, hold: l }) {
  const o = ga(n, l), s = ga(r, l);
  return /* @__PURE__ */ i.jsxs("div", { className: "adjust", children: [
    e && /* @__PURE__ */ i.jsx("span", { className: "muted small", children: e }),
    /* @__PURE__ */ i.jsxs("div", { className: "stepper", children: [
      /* @__PURE__ */ i.jsx("button", { className: "round", ...o, "aria-label": `Lower ${e ?? ""}`.trim(), children: /* @__PURE__ */ i.jsx($, { name: "minus" }) }),
      /* @__PURE__ */ i.jsx("span", { className: "stepper-value", children: t }),
      /* @__PURE__ */ i.jsx("button", { className: "round", ...s, "aria-label": `Raise ${e ?? ""}`.trim(), children: /* @__PURE__ */ i.jsx($, { name: "plus" }) })
    ] })
  ] });
}
function ga(e, t) {
  const n = _.useRef(e);
  n.current = e;
  const r = _.useRef(), l = () => window.clearTimeout(r.current);
  return _.useEffect(() => l, []), t ? {
    onPointerDown: (s) => {
      if (s.button !== 0) return;
      n.current(0);
      let a = 400, u = 0;
      const c = () => {
        u += 1, n.current(u), a = u < 5 ? 150 : u < 20 ? 70 : 30, r.current = window.setTimeout(c, a);
      };
      r.current = window.setTimeout(c, a);
    },
    onPointerUp: l,
    onPointerLeave: l,
    onPointerCancel: l,
    onContextMenu: (s) => s.preventDefault(),
    onClick: (s) => {
      s.detail === 0 && e(0);
    }
  } : { onClick: () => e(0) };
}
const dh = [
  { id: "overview", label: "Overview", icon: "view-dashboard-outline" },
  { id: "devices", label: "Devices", icon: "devices" },
  { id: "stats", label: "Stats", icon: "chart-box-outline" },
  { id: "settings", label: "Settings", icon: "tune-variant" }
];
function ph({ getHass: e, narrow: t, onToggleMenu: n }) {
  var z;
  const [r, l] = _.useState([]), [o, s] = _.useState(null), [a, u] = _.useState({}), [c, v] = _.useState("overview"), [g, m] = _.useState(null), [x, w] = _.useState("control"), [k, b] = _.useState(null), [f, d] = _.useState("");
  _.useEffect(() => {
    e().callWS({ type: "hive_local/devices" }).then((N) => {
      l(N.devices), s(N.limits);
    }).catch((N) => d(me(N)));
    const j = e().connection.subscribeMessage(
      (N) => u(N.status),
      { type: "hive_local/subscribe" }
    );
    return () => {
      j.then((N) => N()).catch(() => {
      });
    };
  }, [e]);
  const p = (j, N) => {
    m({ entry: j, channel: N }), w("control");
  }, h = (j) => {
    v(j), m(null), b(null);
  }, y = g && r.find((j) => j.entry_id === g.entry), S = dh;
  return /* @__PURE__ */ i.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ i.jsx("header", { children: /* @__PURE__ */ i.jsxs("div", { className: "toolbar-row", children: [
      t && /* @__PURE__ */ i.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ i.jsx($, { name: "menu" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ i.jsx(da, {}),
        /* @__PURE__ */ i.jsx("h1", { children: "Hive Local" })
      ] }),
      /* @__PURE__ */ i.jsx("nav", { className: "tabs", role: "tablist", children: S.map((j) => /* @__PURE__ */ i.jsxs("button", { role: "tab", "aria-selected": j.id === c, className: j.id === c ? "on" : "", onClick: () => h(j.id), children: [
        /* @__PURE__ */ i.jsx($, { name: j.icon }),
        /* @__PURE__ */ i.jsx("span", { children: j.label })
      ] }, j.id)) })
    ] }) }),
    /* @__PURE__ */ i.jsxs("main", { children: [
      f && /* @__PURE__ */ i.jsx("div", { className: "status error", children: f }),
      !r.length && !f && /* @__PURE__ */ i.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ i.jsx(da, { size: 56 }),
        /* @__PURE__ */ i.jsx("p", { children: "No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local." })
      ] }),
      y && o ? /* @__PURE__ */ i.jsx(
        Hf,
        {
          getHass: e,
          device: y,
          channel: g.channel,
          info: (z = a[y.entry_id]) == null ? void 0 : z[g.channel],
          limits: o,
          showDevice: r.length > 1,
          tab: x,
          onTab: w,
          onBack: () => m(null)
        },
        `${g.entry}-${g.channel}`
      ) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        c === "overview" && /* @__PURE__ */ i.jsx(jf, { getHass: e, devices: r, status: a, limits: o, onOpenDevice: p, onOpenRoom: b }),
        c === "devices" && r.length > 0 && /* @__PURE__ */ i.jsx(Kf, { getHass: e, devices: r, status: a, limits: o, onOpenDevice: p }),
        c === "stats" && r.length > 0 && /* @__PURE__ */ i.jsx(Lc, { getHass: e, devices: r }),
        c === "settings" && r.length > 0 && /* @__PURE__ */ i.jsx(oh, { getHass: e, devices: r, status: a })
      ] }),
      k && /* @__PURE__ */ i.jsx(
        nh,
        {
          getHass: e,
          roomId: k,
          several: r.length > 1,
          onClose: () => b(null)
        }
      )
    ] })
  ] });
}
const fh = (
  /* css */
  `
:host {
  /* One accent for everything that's on or active (heating, hot water, boosting, the selected tab):
     HA's heating orange. Heating and hot water share it. */
  --hl-brand: var(--state-climate-heat-color, #ff8100);
  --hl-heat: var(--hl-brand);
  /* Main buttons and selected chips use the accent too, not HA's blue. */
  --hl-accent: var(--hl-brand);
  --hl-water: var(--hl-brand);
  --hl-idle: var(--secondary-text-color, #727272);
  --hl-off: var(--disabled-text-color, #9e9e9e);
  --hl-off-fill: color-mix(in srgb, var(--secondary-text-color, #888) 18%, transparent);
  --hl-radius: 18px;
  --hl-soft: color-mix(in srgb, var(--primary-text-color, #000) 6%, transparent);
  display: block; height: 100%;
  background: var(--primary-background-color);
  color: var(--primary-text-color);
  font-family: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, Roboto, sans-serif));
  -webkit-font-smoothing: antialiased;
}
* { box-sizing: border-box; }
.panel { min-height: 100%; background: var(--primary-background-color); }
.icon-wrap { display: inline-flex; align-items: center; justify-content: center; line-height: 0; --mdc-icon-size: 20px; }
.spacer { flex: 1; }
.muted { color: var(--secondary-text-color); font-size: 14px; }
.small { font-size: 12px; }

/* Header: logo and title, with the tabs inline beside them (they wrap to a row of their own when there's no room) */
header { position: sticky; top: 0; z-index: 2; background: var(--app-header-background-color, var(--primary-color)); color: var(--app-header-text-color, #fff); border-bottom: var(--app-header-border-bottom, none); }
/* In the companion app HA already places the panel below the status bar / Dynamic Island,
   leaving that strip in its own colour. Paint the header's colour up into it, as HA's own
   top bars reach it. Nothing shows where there's no safe area (desktop, browsers). */
header::before { content: ""; position: absolute; left: 0; right: 0; bottom: 100%; height: env(safe-area-inset-top, 0px); background: inherit; pointer-events: none; }
.toolbar-row { display: flex; align-items: center; flex-wrap: wrap; column-gap: 20px; min-height: 56px; padding: 0 16px; }
.brand { display: flex; align-items: center; gap: 10px; height: 56px; flex: none; }
.toolbar-row h1 { font-size: 20px; font-weight: 400; margin: 0; white-space: nowrap; }
.logo-mark { display: block; flex: none; }
.empty-state .logo-mark { opacity: .9; }
.toolbar-row .menu { background: transparent; border: 0; color: inherit; padding: 8px; margin-left: -8px; margin-right: -10px; border-radius: 50%; }
.toolbar-row .menu:hover { background: rgba(255,255,255,.12); }
/* Pills. flex-shrink 0: when they don't fit beside the logo, the tabs wrap onto their own row instead of squashing. */
.tabs { display: flex; align-items: center; gap: 4px; flex: 1 0 auto; padding: 10px 0; margin: 0 -8px 0 -4px; overflow-x: auto; scrollbar-width: none; }
.tabs::-webkit-scrollbar { display: none; }
.tabs button { flex: none; display: inline-flex; align-items: center; gap: 8px; height: 36px; border: 0; border-radius: 999px; background: transparent; color: inherit; opacity: .75; padding: 0 14px; font-weight: 500; letter-spacing: .01em; }
.tabs button:hover:not(:disabled) { opacity: .95; background: color-mix(in srgb, currentColor 7%, transparent); }
.tabs button:active:not(:disabled) { transform: none; }
.tabs button.on, .tabs button.on:hover:not(:disabled) { opacity: 1; background: color-mix(in srgb, currentColor 13%, transparent); }
.tabs .icon-wrap { --mdc-icon-size: 18px; }

main { max-width: 1040px; margin: 0 auto; padding: 20px 16px 32px; display: flex; flex-direction: column; gap: 16px; }
.stack { display: flex; flex-direction: column; gap: 16px; }

/* Cards */
.card { background: var(--card-background-color); border-radius: var(--hl-radius); border: 1px solid var(--divider-color); padding: 18px; display: flex; flex-direction: column; gap: 14px; }
.card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.title { display: flex; align-items: center; gap: 12px; }
.title-icon { width: 40px; height: 40px; flex: none; border-radius: 10px; --mdc-icon-size: 22px; color: var(--secondary-text-color); background: var(--hl-soft); }
.card.heat { --hl-accent: var(--hl-heat); }
.card.water { --hl-accent: var(--hl-water); }
h2 { font-size: 18px; font-weight: 500; margin: 0; }
h3 { font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: .06em; color: var(--secondary-text-color); margin: 6px 0 -4px; }

/* Controls */
button { font: inherit; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 14px; border-radius: 10px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); cursor: pointer; transition: background .15s, border-color .15s, opacity .15s, transform .1s; }
button:hover:not(:disabled) { background: var(--hl-soft); }
button:active:not(:disabled) { transform: scale(.98); }
button:disabled { opacity: .45; cursor: default; }
button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
button.primary { background: var(--hl-accent, var(--primary-color)); color: var(--text-primary-color, #fff); border-color: transparent; }
button.primary:hover:not(:disabled) { background: var(--hl-accent, var(--primary-color)); filter: brightness(1.08); }
button.ghost { border-color: transparent; background: transparent; color: var(--secondary-text-color); padding-right: 6px; }
button.round { width: 36px; height: 36px; padding: 0; border-radius: 50%; }
button.danger { color: var(--error-color); border-color: transparent; background: transparent; }
select, input[type=time], input[type=text] { font: inherit; font-size: 14px; padding: 8px 10px; border-radius: 10px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); color-scheme: light dark; }
.toolbar, .actions, .inline-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.inline-row { gap: 12px; }

.segmented { display: inline-flex; padding: 3px; gap: 3px; border-radius: 12px; background: var(--hl-soft); }
.segmented.full { display: flex; }
.segmented.full button { flex: 1; }
.segmented button { border: 0; border-radius: 9px; background: transparent; padding: 7px 12px; color: var(--secondary-text-color); }
.segmented button.on { background: var(--card-background-color); color: var(--primary-text-color); font-weight: 500; }
.segmented .raw { padding: 7px 10px; }

.chip { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; padding: 4px 10px; border-radius: 999px; background: var(--hl-soft); color: var(--secondary-text-color); white-space: nowrap; }
.chip .icon-wrap { --mdc-icon-size: 14px; }
.chip.mode-boost { background: color-mix(in srgb, var(--hl-heat) 16%, transparent); color: var(--hl-heat); }
.water .chip.mode-boost { background: color-mix(in srgb, var(--hl-water) 16%, transparent); color: var(--hl-water); }
.chip.unsaved { background: color-mix(in srgb, var(--warning-color, #ffa600) 18%, transparent); color: var(--warning-color, #ffa600); }
.channel-switch { align-self: flex-start; }
.channel-switch .icon-wrap { --mdc-icon-size: 18px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip-btn { border-radius: 999px; padding: 6px 14px; }
.chip-btn.on { background: color-mix(in srgb, var(--hl-accent, var(--primary-color)) 16%, transparent); border-color: var(--hl-accent, var(--primary-color)); color: var(--hl-accent, var(--primary-color)); font-weight: 500; }

.status { padding: 10px 14px; border-radius: 10px; font-size: 14px; background: var(--hl-soft); }
.status.ok { background: color-mix(in srgb, var(--success-color, #43a047) 14%, transparent); }
.status.error { background: color-mix(in srgb, var(--error-color, #db4437) 14%, transparent); color: var(--error-color); }
.status.busy { opacity: .8; }

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 48px 16px; color: var(--secondary-text-color); }
.empty-state .icon-wrap { --mdc-icon-size: 48px; opacity: .5; }

/* Overview: quick actions, filter pills and device cards */
.home { display: flex; flex-direction: column; gap: 12px; }
.home-section { font-size: 19px; font-weight: 700; letter-spacing: -.01em; text-transform: none; letter-spacing: 0; color: var(--primary-text-color); margin: 6px 0 0; }
.quick { display: flex; gap: 10px; overflow-x: auto; scrollbar-width: none; padding: 2px 2px 6px; margin: 0 -2px; }
.quick::-webkit-scrollbar { display: none; }
.quick-action { flex: none; padding: 0; gap: 0; border-radius: 14px; overflow: hidden; align-items: stretch; background: var(--card-background-color); }
.quick-icon { padding-left: 14px; display: flex; align-items: center; justify-content: center; color: var(--secondary-text-color); }
.quick-icon .icon-wrap { --mdc-icon-size: 22px; }
.quick-label { padding: 14px 16px 14px 10px; white-space: nowrap; }
.pills { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding: 2px; }
.pills::-webkit-scrollbar { display: none; }
.pill { flex: none; border-radius: 999px; padding: 8px 16px; background: var(--card-background-color); }
.pill .icon-wrap { --mdc-icon-size: 18px; }
.pill.on, .pill.on:hover:not(:disabled) { background: var(--hl-brand); color: #fff; border-color: transparent; font-weight: 500; }
/* Cards in a row share its height. */
.device-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 12px; align-items: stretch; }
.card.device { padding: 0; gap: 0; overflow: hidden; height: 100%; }
.device-head { flex: 1; display: flex; flex-direction: column; gap: 12px; padding: 18px 18px 20px; cursor: pointer; outline: none; transition: background .15s; }
.device-head:hover { background: color-mix(in srgb, var(--primary-text-color) 3%, transparent); }
.device-head:focus-visible { box-shadow: inset 0 0 0 2px var(--primary-color); }
.device-row { display: flex; align-items: center; gap: 12px; }
/* Our own icon tile: a rounded square with the logo's warm gradient (not a diamond). */
/* Icons: grey, in a shaded rounded box. */
.device-icon { width: 40px; height: 40px; flex: none; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--secondary-text-color); background: var(--hl-soft); }
.device-icon .icon-wrap { --mdc-icon-size: 22px; }
.device-name { display: flex; flex-direction: column; min-width: 0; flex: 1; font-size: 17px; font-weight: 500; }
.device-name .small { font-weight: 400; }
.device-status { font-size: 14px; color: var(--secondary-text-color); white-space: nowrap; display: inline-flex; align-items: center; gap: 4px; }
.device-status b { color: var(--primary-text-color); font-weight: 600; }
.status-icon { --mdc-icon-size: 18px; color: var(--hl-heat); }
.water .status-icon { color: var(--hl-water); }
.device-big { flex: 1; font-size: 54px; font-weight: 400; line-height: 1; letter-spacing: -.02em; font-variant-numeric: tabular-nums; display: grid; grid-template-columns: auto 1fr; }
.device-big span { font-size: 30px; line-height: 1.1; }
.device-big small { grid-column: 1 / -1; font-size: 13px; letter-spacing: 0; color: var(--secondary-text-color); margin-top: 4px; font-weight: 400; }
.device-action { min-width: 120px; height: 50px; border-radius: 14px; border: 0; font-size: 17px; font-weight: 500; color: var(--hl-brand); background: color-mix(in srgb, var(--hl-brand) 12%, transparent); }
.device-action:hover:not(:disabled) { background: color-mix(in srgb, var(--hl-brand) 20%, transparent); }
.device-action.boosting, .device-action.boosting:hover:not(:disabled) { color: #fff; background: var(--hl-accent); }
.status-icon.done { color: var(--success-color, #43a047); }
.status-icon.away { color: var(--secondary-text-color); }
.stop-square { width: 16px; height: 16px; border-radius: 3px; background: currentColor; }
.device.heat { --hl-accent: var(--hl-heat); }
.device.water { --hl-accent: var(--hl-water); }
.device-name .warn { color: var(--warning-color, #ffa600); font-weight: 500; }


.device-body { display: flex; flex-direction: column; gap: 14px; padding: 4px 16px 16px; border-top: 1px solid var(--divider-color); }
.schedule-link { align-self: center; }

/* Boost sheet: slides up from the bottom on phones, a centred dialog on wider screens */
.sheet-backdrop { position: fixed; inset: 0; z-index: 10; display: flex; align-items: center; justify-content: center; padding: 16px; background: rgba(0,0,0,.45); animation: hl-fade .15s ease-out; }
.sheet { width: 100%; max-width: 440px; display: flex; flex-direction: column; gap: 18px; padding: 14px 20px 18px; border-radius: 24px; background: var(--card-background-color); color: var(--primary-text-color); }
.sheet.heat { --hl-accent: var(--hl-heat); }
.sheet.water { --hl-accent: var(--hl-water); }
.sheet-handle { align-self: center; width: 40px; height: 4px; border-radius: 2px; background: var(--divider-color); }
.sheet-title { display: flex; flex-direction: column; align-items: center; gap: 2px; text-align: center; }
.sheet-title h2 { font-size: 24px; }
.sheet-field { display: flex; flex-direction: column; gap: 10px; }
.sheet-label { font-size: 14px; color: var(--secondary-text-color); }
.sheet-temp { display: flex; align-items: center; gap: 12px; }
.sheet-step { width: 52px; height: 52px; flex: none; border-color: var(--divider-color); }
.sheet-step .icon-wrap { --mdc-icon-size: 24px; }
.sheet-temp-value { flex: 1; text-align: center; padding: 14px 0; border-radius: 18px; color: #fff; font-size: 44px; font-weight: 300; font-variant-numeric: tabular-nums; background: linear-gradient(135deg, #FF9F43, #F0532B); }
.sheet-lengths { display: grid; grid-template-columns: repeat(auto-fit, minmax(64px, 1fr)); gap: 8px; }
.sheet-lengths button { height: 46px; padding: 0 6px; border-radius: 12px; }
.sheet-lengths button.on, .sheet-lengths button.on:hover:not(:disabled) { background: var(--hl-accent); border-color: transparent; color: #fff; font-weight: 500; }
.sheet-live { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 18px; padding: 8px 0; }
.sheet-live .icon-wrap { --mdc-icon-size: 22px; color: var(--secondary-text-color); }
.sheet-go { height: 52px; border: 0; border-radius: 14px; font-size: 16px; font-weight: 600; color: #fff; background: var(--hl-accent); }
.sheet-go:hover:not(:disabled) { background: var(--hl-accent); filter: brightness(1.06); }
.sheet-go.stop { color: var(--error-color, #db4437); background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent); }
.sheet-cancel { align-self: center; padding: 8px 16px; font-size: 15px; }
@keyframes hl-fade { from { opacity: 0; } }
@keyframes hl-rise { from { transform: translateY(40px); opacity: 0; } }

/* Device controls (opened from a card) */
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
.channel { gap: 16px; }
.holiday-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; background: var(--hl-soft); }
.holiday-row > .icon-wrap { --mdc-icon-size: 20px; color: var(--secondary-text-color); }
.holiday-text { flex: 1; }
.holiday-row > button { padding: 6px 12px; }
.target-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding-top: 8px; }
.target-text { display: flex; flex-direction: column; gap: 2px; }
.target-label { font-size: 16px; font-weight: 500; }
.target-control { display: inline-flex; align-items: center; gap: 6px; padding: 4px; border-radius: 999px; background: var(--hl-soft); }
.target-btn { width: 44px; height: 44px; background: var(--card-background-color); }
.target-btn .icon-wrap { --mdc-icon-size: 22px; }
.target-value { min-width: 76px; text-align: center; font-size: 24px; font-weight: 500; font-variant-numeric: tabular-nums; }
.target-value.pending { color: var(--hl-heat); }
.card-actions { display: flex; align-items: center; gap: 8px; }

.stepper { background: var(--card-background-color); }
.stepper { display: inline-flex; align-items: center; gap: 4px; padding: 2px; border-radius: 999px; background: var(--hl-soft); }
.stepper button.round { border-color: transparent; background: transparent; width: 32px; height: 32px; }
.stepper button.round:hover { background: var(--card-background-color); }
.stepper-value { min-width: 56px; text-align: center; font-variant-numeric: tabular-nums; font-weight: 500; }

/* Schedule: a status line, a strip of day circles, and the day's time slots */
.sched { display: flex; flex-direction: column; gap: 14px; position: relative; padding-bottom: 72px; }

.sched-status { margin: 0; font-size: 14px; }
.sched-days { display: flex; justify-content: space-between; gap: 4px; padding: 12px 10px; border-radius: 16px; background: color-mix(in srgb, var(--hl-brand) 7%, var(--card-background-color)); border: 1px solid var(--divider-color); }
.sched-day { position: relative; width: 44px; height: 44px; padding: 0; border-radius: 50%; border: 2px solid transparent; background: transparent; font-size: 18px; font-weight: 500; color: var(--primary-text-color); }
.sched-day:hover:not(:disabled) { background: color-mix(in srgb, var(--hl-brand) 10%, transparent); }
.sched-day.today { border-color: var(--hl-brand); color: var(--hl-brand); }
.sched-day.on, .sched-day.on:hover:not(:disabled) { background: var(--hl-brand); border-color: var(--hl-brand); color: #fff; }
.sched-dot { position: absolute; top: 2px; right: 2px; width: 8px; height: 8px; border-radius: 50%; background: var(--warning-color, #ffa600); border: 2px solid var(--card-background-color); }
.sched-list { display: flex; flex-direction: column; gap: 4px; }
.sched-empty { margin: 8px 4px; }
.slot { justify-content: flex-start; gap: 18px; padding: 10px 8px; border: 0; border-radius: 16px; background: transparent; text-align: left; }
.slot:hover:not(:disabled) { background: var(--hl-soft); }
.slot-badge { width: 58px; height: 58px; flex: none; border-radius: 50%; border: 3px solid var(--hl-brand); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 500; color: var(--primary-text-color); font-variant-numeric: tabular-nums; }
.slot-badge.off { border-color: var(--divider-color); color: var(--secondary-text-color); }
.slot-badge.off .icon-wrap, .slot-badge.add .icon-wrap { --mdc-icon-size: 24px; }
.slot-badge.add { border: 2px dashed var(--divider-color); color: var(--secondary-text-color); }
.slot-time { flex: 1; font-size: 20px; font-variant-numeric: tabular-nums; }
.slot-add .slot-time { font-size: 16px; color: var(--secondary-text-color); }
.slot-chev { color: var(--secondary-text-color); }
/* Unwritten changes: a dark bar across the bottom, above the tab bar on phones. */
.sched-save { position: sticky; bottom: 16px; z-index: 2; display: flex; align-items: center; gap: 10px; padding: 8px 8px 8px 16px; border-radius: 16px; background: var(--primary-text-color); color: var(--card-background-color); }
.sched-save-icon { --mdc-icon-size: 20px; opacity: .8; }
.sched-undo { border: 0; background: transparent; color: inherit; opacity: .8; padding: 10px 12px; }
.sched-undo:hover:not(:disabled) { background: color-mix(in srgb, var(--card-background-color) 12%, transparent); opacity: 1; }
.sched-write { border: 0; border-radius: 12px; padding: 10px 20px; background: var(--hl-brand); color: #fff; font-weight: 600; }
.sched-write:hover:not(:disabled) { background: var(--hl-brand); filter: brightness(1.06); }
.fab-wrap.raised { bottom: 96px; }
.sched-changed { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 15px; }
.fab-wrap { position: fixed; right: 24px; bottom: 24px; z-index: 4; }
.fab { width: 56px; height: 56px; padding: 0; border-radius: 50%; border: 0; background: var(--hl-brand); color: #fff; }
.fab:hover:not(:disabled) { background: var(--hl-brand); filter: brightness(1.06); }
.fab .icon-wrap { --mdc-icon-size: 26px; }
.fab-backdrop { position: fixed; inset: 0; }
.fab-menu { position: absolute; right: 0; bottom: 66px; min-width: 260px; display: flex; flex-direction: column; padding: 6px; border-radius: 16px; background: var(--card-background-color); border: 1px solid var(--divider-color); }
.fab-menu button { justify-content: flex-start; gap: 10px; border: 0; border-radius: 10px; padding: 12px; background: transparent; }
.fab-menu button:hover:not(:disabled) { background: var(--hl-soft); }
.sheet-time { font: inherit; font-size: 28px; padding: 10px 14px; border-radius: 14px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); color-scheme: light dark; text-align: center; }
.sheet-note { margin: -6px 0 0; text-align: center; }
.room-sheet { max-height: calc(100vh - 32px); overflow-y: auto; }
.room-sheet .sheet-live .heating { color: var(--hl-heat); }
.room-sheet-actions { display: flex; justify-content: space-between; align-items: center; }
.room-sheet-actions .sheet-cancel { align-self: auto; }
.valve-count { margin-left: 8px; padding: 2px 8px; border-radius: 999px; font-size: 12px; background: color-mix(in srgb, var(--hl-brand) 14%, transparent); color: var(--hl-brand); }
.valve-picker { display: flex; flex-direction: column; gap: 8px; }
.valve-search { display: flex; align-items: center; gap: 8px; padding: 0 6px 0 12px; border-radius: 12px; background: var(--hl-soft); color: var(--secondary-text-color); --mdc-icon-size: 20px; }
.valve-search input { flex: 1; min-width: 0; font: inherit; font-size: 15px; padding: 10px 0; border: 0; background: transparent; color: var(--primary-text-color); outline: none; }
.valve-search input::-webkit-search-cancel-button { display: none; }
.valve-search .round { width: 30px; height: 30px; }
.valve-search:focus-within { outline: 2px solid var(--primary-color); outline-offset: 0; }
.valve-list { display: flex; flex-direction: column; border: 1px solid var(--divider-color); border-radius: 14px; overflow-y: auto; max-height: 300px; overscroll-behavior: contain; }
.valve-pick { flex: none; display: flex; align-items: center; gap: 8px; padding-right: 10px; }
.valve-pick + .valve-pick { border-top: 1px solid var(--divider-color); }
.valve-pick.on { background: color-mix(in srgb, var(--hl-brand) 7%, transparent); }
.valve-pick-main { flex: 1; min-width: 0; justify-content: flex-start; gap: 12px; padding: 11px 6px 11px 14px; border: 0; border-radius: 0; background: transparent; text-align: left; }
.valve-pick-main:hover:not(:disabled) { background: transparent; }
.valve-check { width: 22px; height: 22px; flex: none; border-radius: 50%; border: 1.5px solid var(--divider-color); display: flex; align-items: center; justify-content: center; --mdc-icon-size: 16px; color: #fff; }
.valve-check.on { background: var(--hl-brand); border-color: var(--hl-brand); }
.valve-pick-text { flex: 1; min-width: 0; display: flex; flex-direction: column; font-size: 14.5px; }
.valve-pick-read { color: var(--secondary-text-color); white-space: nowrap; font-variant-numeric: tabular-nums; }
.valve-pick .warn { color: var(--warning-color, #ffa600); }
.valve-find { flex: none; padding: 5px 10px; border-radius: 999px; font-size: 12.5px; color: var(--secondary-text-color); --mdc-icon-size: 16px; }
.valve-find.on, .valve-find.on:disabled { opacity: 1; border-color: var(--hl-brand); color: var(--hl-brand); background: color-mix(in srgb, var(--hl-brand) 10%, transparent); }
.setup-intro { text-align: center; margin: -6px 8px 0; line-height: 1.45; }
.setup-list { display: flex; flex-direction: column; gap: 8px; }
.setup-room { display: flex; flex-direction: column; gap: 8px; border: 1px solid var(--divider-color); border-radius: 14px; padding-bottom: 0; }
.setup-room.on { border-color: var(--hl-brand); background: color-mix(in srgb, var(--hl-brand) 6%, transparent); }
.setup-room.on select { margin: 0 14px 12px 48px; }
.setup-room-main { justify-content: flex-start; align-items: flex-start; gap: 12px; padding: 12px 14px; border: 0; background: transparent; text-align: left; }
.setup-room-main:hover:not(:disabled) { background: transparent; }
.setup-room-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; font-size: 15px; font-weight: 500; }
.setup-room-text .muted { font-weight: 400; }
.room-sheet.room-editor h2 { text-align: center; font-size: 22px; }
.danger-text { color: var(--error-color, #db4437); }

/* Rooms */
.dot-heating { width: 10px; height: 10px; border-radius: 50%; background: var(--hl-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hl-accent) 20%, transparent); flex: none; }
.zone { display: flex; flex-direction: column; gap: 10px; }
.zone h3 { margin: 4px 0 0; }
/* Room for the + button under the last room / device. */
.devices-page { padding-bottom: 72px; }
.add-options { display: flex; flex-direction: column; gap: 8px; }
.add-option { justify-content: flex-start; gap: 14px; padding: 14px; border-radius: 16px; text-align: left; }
.add-text { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.add-text b { font-size: 16px; font-weight: 500; }
.room.heating { --hl-accent: var(--hl-heat); }
.chip.heating { background: color-mix(in srgb, var(--hl-heat) 16%, transparent); color: var(--hl-heat); }
.room-now { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.room-temp { font-size: 44px; font-weight: 300; line-height: 1; font-variant-numeric: tabular-nums; }
.room-temp .unit { font-size: 18px; margin-left: 2px; color: var(--secondary-text-color); vertical-align: top; }
.room-target { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
.valves { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.valve { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-top: 1px solid var(--divider-color); font-size: 14px; }
.valve.off { opacity: .6; }
.valve-icon { color: var(--secondary-text-color); --mdc-icon-size: 18px; }
.valve-icon.heating { color: var(--hl-heat); }
.valve-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.valve-temps { font-variant-numeric: tabular-nums; white-space: nowrap; }
.battery { display: inline-flex; align-items: center; gap: 3px; font-size: 12px; color: var(--secondary-text-color); font-variant-numeric: tabular-nums; }
.battery .icon-wrap { --mdc-icon-size: 16px; }
.battery.low { color: var(--warning-color, #ffa600); font-weight: 500; }
.room-editor h2 { margin: 0; }
.field { display: flex; flex-direction: column; gap: 6px; border: 0; padding: 0; margin: 0; min-width: 0; }
.field > span, .field legend { font-size: 13px; font-weight: 500; color: var(--secondary-text-color); padding: 0; margin-bottom: 6px; }
.field input[type=text], .field select { width: 100%; max-width: 420px; }
.checklist { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 16px; padding: 6px 0; }
.checklist > .muted { width: 100%; }
.pick { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; cursor: pointer; }

/* A device's own page (heating or hot water), opened from its Overview card */
.device-page { display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 640px; margin: 0 auto; }
.device-page .history { max-width: none; }
.page-head { display: flex; align-items: center; gap: 6px; margin-left: -8px; }
.page-head .round { width: 44px; height: 44px; }
.page-head .round .icon-wrap { --mdc-icon-size: 26px; }
.page-title { display: flex; flex-direction: column; }
.page-title h2 { font-size: 24px; font-weight: 700; }
.page-tabs { margin-top: -6px; }
.card.device.page .device-head, .device-head.static { cursor: default; }
.device-head.static:hover { background: transparent; }
.room-device.off { opacity: .6; }
/* Devices tab: about the hardware, not controlling it */
.card.hw { gap: 12px; padding: 18px; }
.card.hw.off .device-name, .card.hw.off .facts { opacity: .6; }
.hw-head { display: flex; align-items: center; gap: 12px; }
.online { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--secondary-text-color); white-space: nowrap; }
.online i { width: 8px; height: 8px; border-radius: 50%; background: var(--success-color, #43a047); }
.online.no { color: var(--warning-color, #ffa600); }
.online.no i { background: var(--warning-color, #ffa600); }
.facts { display: flex; flex-wrap: wrap; gap: 6px; }
.fact { display: inline-flex; align-items: center; gap: 5px; padding: 5px 10px; border-radius: 999px; background: var(--hl-soft); font-size: 13px; color: var(--secondary-text-color); }
.fact .icon-wrap { --mdc-icon-size: 15px; }
.fact.warn { color: var(--warning-color, #ffa600); background: color-mix(in srgb, var(--warning-color, #ffa600) 14%, transparent); font-weight: 500; }
.hw-links { display: flex; gap: 8px; border-top: 1px solid var(--divider-color); margin: 0 -18px -18px; padding: 6px 8px; }
.hw-link { flex: 1; justify-content: space-between; border: 0; background: transparent; padding: 10px; font-weight: 500; }
.hw-link .icon-wrap { color: var(--secondary-text-color); }
/* The page title already names it. */
.card.device.page .device-icon, .card.device.page .device-name { display: none; }
.history-title { font-size: 24px; font-weight: 700; margin: 4px 0 -4px; }
.card.device.page .device-head:hover { background: transparent; }

/* Stats: heating history, after the Hive app's */
.history { display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 640px; margin: 0 auto; }
/* Underlined tabs: receivers on Stats, Control · Schedule · History on a device page. */
.history-tabs, .page-tabs { display: flex; border-bottom: 1px solid var(--divider-color); overflow-x: auto; scrollbar-width: none; }
.history-tabs button, .page-tabs button { flex: 1 0 auto; border: 0; border-radius: 0; background: transparent; padding: 12px 16px; color: var(--secondary-text-color); border-bottom: 2px solid transparent; margin-bottom: -1px; }
.history-tabs button.on, .page-tabs button.on { color: var(--hl-brand); border-bottom-color: var(--hl-brand); font-weight: 500; }
.history-controls { display: flex; justify-content: space-between; gap: 12px; }
.history-toggle { display: inline-flex; gap: 2px; padding: 4px; border-radius: 999px; background: var(--hl-soft); }
.history-toggle button { min-width: 44px; height: 40px; padding: 0 14px; border: 0; border-radius: 999px; background: transparent; font-weight: 600; color: var(--primary-text-color); }
.history-toggle button.wide { min-width: 60px; }
.history-toggle button.on, .history-toggle button.on:hover:not(:disabled) { background: var(--hl-brand); color: #fff; }
.history-toggle .icon-wrap { --mdc-icon-size: 22px; }
.history-date { display: flex; align-items: center; justify-content: space-between; }
.history-date .round { width: 40px; height: 40px; }
.history-range { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 999px; background: color-mix(in srgb, var(--hl-brand) 10%, transparent); color: var(--hl-brand); font-weight: 500; }
.history-range .icon-wrap { --mdc-icon-size: 18px; }
.history-summary { display: flex; align-items: center; padding: 22px 12px; border-radius: 18px; background: color-mix(in srgb, var(--hl-brand) 7%, var(--card-background-color)); border: 1px solid var(--divider-color); }
.history-summary > div { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; }
.history-summary b { font-size: 30px; font-weight: 500; letter-spacing: -.01em; font-variant-numeric: tabular-nums; }
.history-summary i { width: 1px; align-self: stretch; background: var(--divider-color); }
.history-note { margin: -6px 0 0; text-align: center; }
.history-empty { text-align: center; margin: 24px 0; }
.history-rows { display: flex; flex-direction: column; gap: 6px; }
.history-key { align-self: flex-end; display: inline-flex; align-items: center; gap: 4px; }
.history-key .icon-wrap { --mdc-icon-size: 16px; }
.history-row { display: grid; grid-template-columns: 64px 1fr auto; align-items: center; gap: 12px; min-height: 40px; }
.history-day { font-size: 15px; color: var(--secondary-text-color); white-space: nowrap; }
.history-day span { display: inline-block; min-width: 20px; margin-left: 4px; }
.history-bar { display: flex; align-items: center; gap: 8px; min-width: 0; }
.history-bar i { display: block; height: 14px; max-width: calc(100% - 64px); border-radius: 999px; background: var(--hl-brand); flex: none; }
.history-value { font-size: 15px; font-variant-numeric: tabular-nums; white-space: nowrap; }
.history-temps { display: inline-flex; gap: 10px; padding: 4px 10px; border-radius: 10px; background: var(--hl-soft); font-size: 13px; color: var(--secondary-text-color); font-variant-numeric: tabular-nums; }
.history-temps span { color: var(--primary-text-color); }
.history-row.with-outdoor { grid-template-columns: 64px 1fr auto auto; }
.history-key.with-outdoor { display: flex; justify-content: flex-end; gap: 16px; align-self: stretch; }
.history-key span { display: inline-flex; align-items: center; gap: 4px; }
.history-outdoor { min-width: 52px; text-align: right; font-size: 13px; color: var(--secondary-text-color); font-variant-numeric: tabular-nums; white-space: nowrap; }
.history-hint { text-align: center; margin: 0; }

/* Settings: grouped rows, like a phone's settings */
.settings { display: flex; flex-direction: column; gap: 24px; width: 100%; max-width: 640px; margin: 0 auto; }
.settings-section { display: flex; flex-direction: column; gap: 8px; }
.settings-section h3 { margin: 0 4px; font-size: 13px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; color: var(--secondary-text-color); }
.settings-help { margin: -2px 4px 2px; }
.settings-group { display: flex; flex-direction: column; border: 1px solid var(--divider-color); border-radius: var(--hl-radius); background: var(--card-background-color); overflow: hidden; }
.settings-row { display: flex; align-items: center; gap: 14px; padding: 14px 16px; min-height: 64px; flex-wrap: wrap; text-align: left; width: 100%; border: 0; border-radius: 0; background: transparent; justify-content: flex-start; transition: background .15s; }
.settings-group > * + * { border-top: 1px solid var(--divider-color); }
.settings-row.link:hover:not(:disabled) { background: var(--hl-soft); }
.settings-row.add .settings-text > span:first-child { color: var(--hl-brand); font-weight: 500; }
.settings-text { flex: 1 1 180px; display: flex; flex-direction: column; gap: 2px; min-width: 0; font-size: 15px; }
.settings-row select { max-width: 220px; }
.stepper .round { touch-action: manipulation; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; }
.settings-chevron { color: var(--secondary-text-color); }
.settings-controls { display: flex; gap: 16px; flex-wrap: wrap; margin-left: auto; }
.adjust { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.adjust .stepper-value { min-width: 72px; text-align: center; }
@media (max-width: 600px) { .settings-controls { width: 100%; justify-content: flex-end; } .valve-find-label { display: none; } .valve-find { width: 36px; height: 36px; padding: 0; } }
code { font-size: 12px; padding: 1px 5px; border-radius: 5px; background: var(--hl-soft); }

@media (max-width: 600px) {
  /* Room at the bottom for the tab bar (and the phone's home indicator). */
  main { padding: 12px 8px calc(88px + env(safe-area-inset-bottom)); gap: 12px; }
  .card { padding: 14px; }
  .grid { grid-template-columns: 1fr; }
  .device-grid { grid-template-columns: 1fr; }
    .device-big { font-size: 46px; }
  .sheet-backdrop { align-items: flex-end; padding: 0; }
  .fab-wrap { right: 16px; bottom: calc(84px + env(safe-area-inset-bottom)); }
  /* Above the bottom tab bar. */
  .sched-save { bottom: calc(84px + env(safe-area-inset-bottom)); }
  .fab-wrap.raised { bottom: calc(156px + env(safe-area-inset-bottom)); }
  .sheet { max-width: none; border-radius: 24px 24px 0 0; padding-bottom: calc(18px + env(safe-area-inset-bottom)); animation: hl-rise .2s ease-out; }
  /* Phones: the tabs become a bar along the bottom, in thumb reach. */
  .tabs { position: fixed; left: 0; right: 0; bottom: 0; z-index: 3; margin: 0; gap: 0; justify-content: space-around;
    padding: 6px 8px calc(6px + env(safe-area-inset-bottom)); overflow: visible;
    background: var(--card-background-color); color: var(--primary-text-color); border-top: 1px solid var(--divider-color); }
  .tabs button { flex: 1 1 0; flex-direction: column; gap: 2px; height: 54px; padding: 0; border-radius: 14px; font-size: 11.5px; letter-spacing: 0; opacity: .7; }
  .tabs button:hover:not(:disabled) { background: transparent; }
  .tabs button.on, .tabs button.on:hover:not(:disabled) { background: transparent; color: var(--hl-heat); opacity: 1; }
  .tabs .icon-wrap { --mdc-icon-size: 22px; padding: 3px 16px; border-radius: 999px; transition: background .15s; }
  .tabs button.on .icon-wrap { background: color-mix(in srgb, var(--hl-heat) 16%, transparent); }
}
`
);
class hh extends HTMLElement {
  constructor() {
    super(...arguments);
    gr(this, "_hass");
    gr(this, "_narrow", !1);
    gr(this, "_root");
  }
  set hass(n) {
    const r = !this._hass;
    this._hass = n, r && this._render();
  }
  set narrow(n) {
    n !== this._narrow && (this._narrow = n, this._render());
  }
  connectedCallback() {
    if (!this._root) {
      const n = this.shadowRoot ?? this.attachShadow({ mode: "open" }), r = document.createElement("style");
      r.textContent = fh;
      const l = document.createElement("div");
      n.append(r, l), this._root = zc(l);
    }
    this._render();
  }
  disconnectedCallback() {
    var n, r;
    (n = this._root) == null || n.unmount(), this._root = void 0, (r = this.shadowRoot) == null || r.replaceChildren();
  }
  _render() {
    !this._root || !this._hass || this._root.render(
      /* @__PURE__ */ i.jsx(
        ph,
        {
          getHass: () => this._hass,
          narrow: this._narrow,
          onToggleMenu: () => this.dispatchEvent(
            new Event("hass-toggle-menu", { bubbles: !0, composed: !0 })
          )
        }
      )
    );
  }
}
customElements.get("hive-local-panel") || customElements.define("hive-local-panel", hh);
