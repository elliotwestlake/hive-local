var kc = Object.defineProperty;
var Sc = (e, t, n) => t in e ? kc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ir = (e, t, n) => Sc(e, typeof t != "symbol" ? t + "" : t, n);
var ls = { exports: {} }, sl = {}, os = { exports: {} }, R = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bn = Symbol.for("react.element"), Nc = Symbol.for("react.portal"), _c = Symbol.for("react.fragment"), jc = Symbol.for("react.strict_mode"), Cc = Symbol.for("react.profiler"), Ec = Symbol.for("react.provider"), zc = Symbol.for("react.context"), Pc = Symbol.for("react.forward_ref"), Tc = Symbol.for("react.suspense"), Lc = Symbol.for("react.memo"), Mc = Symbol.for("react.lazy"), Vi = Symbol.iterator;
function Rc(e) {
  return e === null || typeof e != "object" ? null : (e = Vi && e[Vi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var is = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, as = Object.assign, ss = {};
function fn(e, t, n) {
  this.props = e, this.context = t, this.refs = ss, this.updater = n || is;
}
fn.prototype.isReactComponent = {};
fn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
fn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function us() {
}
us.prototype = fn.prototype;
function Zo(e, t, n) {
  this.props = e, this.context = t, this.refs = ss, this.updater = n || is;
}
var Jo = Zo.prototype = new us();
Jo.constructor = Zo;
as(Jo, fn.prototype);
Jo.isPureReactComponent = !0;
var Qi = Array.isArray, cs = Object.prototype.hasOwnProperty, qo = { current: null }, ds = { key: !0, ref: !0, __self: !0, __source: !0 };
function fs(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) cs.call(t, r) && !ds.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var s = Array(a), d = 0; d < a; d++) s[d] = arguments[d + 2];
    l.children = s;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: bn, type: e, key: o, ref: i, props: l, _owner: qo.current };
}
function Oc(e, t) {
  return { $$typeof: bn, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function bo(e) {
  return typeof e == "object" && e !== null && e.$$typeof === bn;
}
function $c(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Ki = /\/+/g;
function zl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? $c("" + e.key) : t.toString(36);
}
function _r(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else switch (o) {
    case "string":
    case "number":
      i = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case bn:
        case Nc:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + zl(i, 0) : r, Qi(l) ? (n = "", e != null && (n = e.replace(Ki, "$&/") + "/"), _r(l, t, n, "", function(d) {
    return d;
  })) : l != null && (bo(l) && (l = Oc(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Ki, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Qi(e)) for (var a = 0; a < e.length; a++) {
    o = e[a];
    var s = r + zl(o, a);
    i += _r(o, t, n, s, l);
  }
  else if (s = Rc(e), typeof s == "function") for (e = s.call(e), a = 0; !(o = e.next()).done; ) o = o.value, s = r + zl(o, a++), i += _r(o, t, n, s, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function ar(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return _r(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Dc(e) {
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
var fe = { current: null }, jr = { transition: null }, Fc = { ReactCurrentDispatcher: fe, ReactCurrentBatchConfig: jr, ReactCurrentOwner: qo };
function ps() {
  throw Error("act(...) is not supported in production builds of React.");
}
R.Children = { map: ar, forEach: function(e, t, n) {
  ar(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return ar(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return ar(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!bo(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
R.Component = fn;
R.Fragment = _c;
R.Profiler = Cc;
R.PureComponent = Zo;
R.StrictMode = jc;
R.Suspense = Tc;
R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Fc;
R.act = ps;
R.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = as({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = qo.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (s in t) cs.call(t, s) && !ds.hasOwnProperty(s) && (r[s] = t[s] === void 0 && a !== void 0 ? a[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    a = Array(s);
    for (var d = 0; d < s; d++) a[d] = arguments[d + 2];
    r.children = a;
  }
  return { $$typeof: bn, type: e.type, key: l, ref: o, props: r, _owner: i };
};
R.createContext = function(e) {
  return e = { $$typeof: zc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Ec, _context: e }, e.Consumer = e;
};
R.createElement = fs;
R.createFactory = function(e) {
  var t = fs.bind(null, e);
  return t.type = e, t;
};
R.createRef = function() {
  return { current: null };
};
R.forwardRef = function(e) {
  return { $$typeof: Pc, render: e };
};
R.isValidElement = bo;
R.lazy = function(e) {
  return { $$typeof: Mc, _payload: { _status: -1, _result: e }, _init: Dc };
};
R.memo = function(e, t) {
  return { $$typeof: Lc, type: e, compare: t === void 0 ? null : t };
};
R.startTransition = function(e) {
  var t = jr.transition;
  jr.transition = {};
  try {
    e();
  } finally {
    jr.transition = t;
  }
};
R.unstable_act = ps;
R.useCallback = function(e, t) {
  return fe.current.useCallback(e, t);
};
R.useContext = function(e) {
  return fe.current.useContext(e);
};
R.useDebugValue = function() {
};
R.useDeferredValue = function(e) {
  return fe.current.useDeferredValue(e);
};
R.useEffect = function(e, t) {
  return fe.current.useEffect(e, t);
};
R.useId = function() {
  return fe.current.useId();
};
R.useImperativeHandle = function(e, t, n) {
  return fe.current.useImperativeHandle(e, t, n);
};
R.useInsertionEffect = function(e, t) {
  return fe.current.useInsertionEffect(e, t);
};
R.useLayoutEffect = function(e, t) {
  return fe.current.useLayoutEffect(e, t);
};
R.useMemo = function(e, t) {
  return fe.current.useMemo(e, t);
};
R.useReducer = function(e, t, n) {
  return fe.current.useReducer(e, t, n);
};
R.useRef = function(e) {
  return fe.current.useRef(e);
};
R.useState = function(e) {
  return fe.current.useState(e);
};
R.useSyncExternalStore = function(e, t, n) {
  return fe.current.useSyncExternalStore(e, t, n);
};
R.useTransition = function() {
  return fe.current.useTransition();
};
R.version = "18.3.1";
os.exports = R;
var P = os.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ic = P, Uc = Symbol.for("react.element"), Ac = Symbol.for("react.fragment"), Bc = Object.prototype.hasOwnProperty, Hc = Ic.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Wc = { key: !0, ref: !0, __self: !0, __source: !0 };
function hs(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) Bc.call(t, r) && !Wc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Uc, type: e, key: o, ref: i, props: l, _owner: Hc.current };
}
sl.Fragment = Ac;
sl.jsx = hs;
sl.jsxs = hs;
ls.exports = sl;
var u = ls.exports, ms = { exports: {} }, Ne = {}, vs = { exports: {} }, gs = {};
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
  function t(E, L) {
    var M = E.length;
    E.push(L);
    e: for (; 0 < M; ) {
      var X = M - 1 >>> 1, ee = E[X];
      if (0 < l(ee, L)) E[X] = L, E[M] = ee, M = X;
      else break e;
    }
  }
  function n(E) {
    return E.length === 0 ? null : E[0];
  }
  function r(E) {
    if (E.length === 0) return null;
    var L = E[0], M = E.pop();
    if (M !== L) {
      E[0] = M;
      e: for (var X = 0, ee = E.length, lr = ee >>> 1; X < lr; ) {
        var Nt = 2 * (X + 1) - 1, El = E[Nt], _t = Nt + 1, or = E[_t];
        if (0 > l(El, M)) _t < ee && 0 > l(or, El) ? (E[X] = or, E[_t] = M, X = _t) : (E[X] = El, E[Nt] = M, X = Nt);
        else if (_t < ee && 0 > l(or, M)) E[X] = or, E[_t] = M, X = _t;
        else break e;
      }
    }
    return L;
  }
  function l(E, L) {
    var M = E.sortIndex - L.sortIndex;
    return M !== 0 ? M : E.id - L.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var i = Date, a = i.now();
    e.unstable_now = function() {
      return i.now() - a;
    };
  }
  var s = [], d = [], v = 1, m = null, h = 3, x = !1, S = !1, _ = !1, T = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(E) {
    for (var L = n(d); L !== null; ) {
      if (L.callback === null) r(d);
      else if (L.startTime <= E) r(d), L.sortIndex = L.expirationTime, t(s, L);
      else break;
      L = n(d);
    }
  }
  function g(E) {
    if (_ = !1, p(E), !S) if (n(s) !== null) S = !0, jl(y);
    else {
      var L = n(d);
      L !== null && Cl(g, L.startTime - E);
    }
  }
  function y(E, L) {
    S = !1, _ && (_ = !1, f(z), z = -1), x = !0;
    var M = h;
    try {
      for (p(L), m = n(s); m !== null && (!(m.expirationTime > L) || E && !$()); ) {
        var X = m.callback;
        if (typeof X == "function") {
          m.callback = null, h = m.priorityLevel;
          var ee = X(m.expirationTime <= L);
          L = e.unstable_now(), typeof ee == "function" ? m.callback = ee : m === n(s) && r(s), p(L);
        } else r(s);
        m = n(s);
      }
      if (m !== null) var lr = !0;
      else {
        var Nt = n(d);
        Nt !== null && Cl(g, Nt.startTime - L), lr = !1;
      }
      return lr;
    } finally {
      m = null, h = M, x = !1;
    }
  }
  var j = !1, w = null, z = -1, O = 5, N = -1;
  function $() {
    return !(e.unstable_now() - N < O);
  }
  function W() {
    if (w !== null) {
      var E = e.unstable_now();
      N = E;
      var L = !0;
      try {
        L = w(!0, E);
      } finally {
        L ? J() : (j = !1, w = null);
      }
    } else j = !1;
  }
  var J;
  if (typeof c == "function") J = function() {
    c(W);
  };
  else if (typeof MessageChannel < "u") {
    var We = new MessageChannel(), _l = We.port2;
    We.port1.onmessage = W, J = function() {
      _l.postMessage(null);
    };
  } else J = function() {
    T(W, 0);
  };
  function jl(E) {
    w = E, j || (j = !0, J());
  }
  function Cl(E, L) {
    z = T(function() {
      E(e.unstable_now());
    }, L);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(E) {
    E.callback = null;
  }, e.unstable_continueExecution = function() {
    S || x || (S = !0, jl(y));
  }, e.unstable_forceFrameRate = function(E) {
    0 > E || 125 < E ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : O = 0 < E ? Math.floor(1e3 / E) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(s);
  }, e.unstable_next = function(E) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var L = 3;
        break;
      default:
        L = h;
    }
    var M = h;
    h = L;
    try {
      return E();
    } finally {
      h = M;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(E, L) {
    switch (E) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        E = 3;
    }
    var M = h;
    h = E;
    try {
      return L();
    } finally {
      h = M;
    }
  }, e.unstable_scheduleCallback = function(E, L, M) {
    var X = e.unstable_now();
    switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? X + M : X) : M = X, E) {
      case 1:
        var ee = -1;
        break;
      case 2:
        ee = 250;
        break;
      case 5:
        ee = 1073741823;
        break;
      case 4:
        ee = 1e4;
        break;
      default:
        ee = 5e3;
    }
    return ee = M + ee, E = { id: v++, callback: L, priorityLevel: E, startTime: M, expirationTime: ee, sortIndex: -1 }, M > X ? (E.sortIndex = M, t(d, E), n(s) === null && E === n(d) && (_ ? (f(z), z = -1) : _ = !0, Cl(g, M - X))) : (E.sortIndex = ee, t(s, E), S || x || (S = !0, jl(y))), E;
  }, e.unstable_shouldYield = $, e.unstable_wrapCallback = function(E) {
    var L = h;
    return function() {
      var M = h;
      h = L;
      try {
        return E.apply(this, arguments);
      } finally {
        h = M;
      }
    };
  };
})(gs);
vs.exports = gs;
var Vc = vs.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qc = P, Se = Vc;
function k(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ys = /* @__PURE__ */ new Set(), Dn = {};
function Ft(e, t) {
  ln(e, t), ln(e + "Capture", t);
}
function ln(e, t) {
  for (Dn[e] = t, e = 0; e < t.length; e++) ys.add(t[e]);
}
var Ge = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), to = Object.prototype.hasOwnProperty, Kc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Yi = {}, Xi = {};
function Yc(e) {
  return to.call(Xi, e) ? !0 : to.call(Yi, e) ? !1 : Kc.test(e) ? Xi[e] = !0 : (Yi[e] = !0, !1);
}
function Xc(e, t, n, r) {
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
function Gc(e, t, n, r) {
  if (t === null || typeof t > "u" || Xc(e, t, n, r)) return !0;
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
function pe(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var oe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  oe[e] = new pe(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  oe[t] = new pe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  oe[e] = new pe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  oe[e] = new pe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  oe[e] = new pe(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  oe[e] = new pe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  oe[e] = new pe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  oe[e] = new pe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  oe[e] = new pe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ei = /[\-:]([a-z])/g;
function ti(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ei,
    ti
  );
  oe[t] = new pe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ei, ti);
  oe[t] = new pe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ei, ti);
  oe[t] = new pe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  oe[e] = new pe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
oe.xlinkHref = new pe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  oe[e] = new pe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ni(e, t, n, r) {
  var l = oe.hasOwnProperty(t) ? oe[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Gc(t, n, l, r) && (n = null), r || l === null ? Yc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var be = Qc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, sr = Symbol.for("react.element"), At = Symbol.for("react.portal"), Bt = Symbol.for("react.fragment"), ri = Symbol.for("react.strict_mode"), no = Symbol.for("react.profiler"), xs = Symbol.for("react.provider"), ws = Symbol.for("react.context"), li = Symbol.for("react.forward_ref"), ro = Symbol.for("react.suspense"), lo = Symbol.for("react.suspense_list"), oi = Symbol.for("react.memo"), tt = Symbol.for("react.lazy"), ks = Symbol.for("react.offscreen"), Gi = Symbol.iterator;
function mn(e) {
  return e === null || typeof e != "object" ? null : (e = Gi && e[Gi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var K = Object.assign, Pl;
function Nn(e) {
  if (Pl === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Pl = t && t[1] || "";
  }
  return `
` + Pl + e;
}
var Tl = !1;
function Ll(e, t) {
  if (!e || Tl) return "";
  Tl = !0;
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
      } catch (d) {
        var r = d;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (d) {
        r = d;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (d) {
        r = d;
      }
      e();
    }
  } catch (d) {
    if (d && r && typeof d.stack == "string") {
      for (var l = d.stack.split(`
`), o = r.stack.split(`
`), i = l.length - 1, a = o.length - 1; 1 <= i && 0 <= a && l[i] !== o[a]; ) a--;
      for (; 1 <= i && 0 <= a; i--, a--) if (l[i] !== o[a]) {
        if (i !== 1 || a !== 1)
          do
            if (i--, a--, 0 > a || l[i] !== o[a]) {
              var s = `
` + l[i].replace(" at new ", " at ");
              return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
            }
          while (1 <= i && 0 <= a);
        break;
      }
    }
  } finally {
    Tl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Nn(e) : "";
}
function Zc(e) {
  switch (e.tag) {
    case 5:
      return Nn(e.type);
    case 16:
      return Nn("Lazy");
    case 13:
      return Nn("Suspense");
    case 19:
      return Nn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ll(e.type, !1), e;
    case 11:
      return e = Ll(e.type.render, !1), e;
    case 1:
      return e = Ll(e.type, !0), e;
    default:
      return "";
  }
}
function oo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Bt:
      return "Fragment";
    case At:
      return "Portal";
    case no:
      return "Profiler";
    case ri:
      return "StrictMode";
    case ro:
      return "Suspense";
    case lo:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case ws:
      return (e.displayName || "Context") + ".Consumer";
    case xs:
      return (e._context.displayName || "Context") + ".Provider";
    case li:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case oi:
      return t = e.displayName || null, t !== null ? t : oo(e.type) || "Memo";
    case tt:
      t = e._payload, e = e._init;
      try {
        return oo(e(t));
      } catch {
      }
  }
  return null;
}
function Jc(e) {
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
      return oo(t);
    case 8:
      return t === ri ? "StrictMode" : "Mode";
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
function gt(e) {
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
function Ss(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function qc(e) {
  var t = Ss(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, o = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(i) {
      r = "" + i, o.call(this, i);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(i) {
      r = "" + i;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function ur(e) {
  e._valueTracker || (e._valueTracker = qc(e));
}
function Ns(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Ss(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Dr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function io(e, t) {
  var n = t.checked;
  return K({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Zi(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = gt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function _s(e, t) {
  t = t.checked, t != null && ni(e, "checked", t, !1);
}
function ao(e, t) {
  _s(e, t);
  var n = gt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? so(e, t.type, n) : t.hasOwnProperty("defaultValue") && so(e, t.type, gt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Ji(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function so(e, t, n) {
  (t !== "number" || Dr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var _n = Array.isArray;
function qt(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + gt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function uo(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(k(91));
  return K({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function qi(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(k(92));
      if (_n(n)) {
        if (1 < n.length) throw Error(k(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: gt(n) };
}
function js(e, t) {
  var n = gt(t.value), r = gt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function bi(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Cs(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function co(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Cs(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var cr, Es = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (cr = cr || document.createElement("div"), cr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = cr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Fn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var En = {
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
}, bc = ["Webkit", "ms", "Moz", "O"];
Object.keys(En).forEach(function(e) {
  bc.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), En[t] = En[e];
  });
});
function zs(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || En.hasOwnProperty(e) && En[e] ? ("" + t).trim() : t + "px";
}
function Ps(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = zs(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var ed = K({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function fo(e, t) {
  if (t) {
    if (ed[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(k(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(k(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(k(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(k(62));
  }
}
function po(e, t) {
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
var ho = null;
function ii(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var mo = null, bt = null, en = null;
function ea(e) {
  if (e = nr(e)) {
    if (typeof mo != "function") throw Error(k(280));
    var t = e.stateNode;
    t && (t = pl(t), mo(e.stateNode, e.type, t));
  }
}
function Ts(e) {
  bt ? en ? en.push(e) : en = [e] : bt = e;
}
function Ls() {
  if (bt) {
    var e = bt, t = en;
    if (en = bt = null, ea(e), t) for (e = 0; e < t.length; e++) ea(t[e]);
  }
}
function Ms(e, t) {
  return e(t);
}
function Rs() {
}
var Ml = !1;
function Os(e, t, n) {
  if (Ml) return e(t, n);
  Ml = !0;
  try {
    return Ms(e, t, n);
  } finally {
    Ml = !1, (bt !== null || en !== null) && (Rs(), Ls());
  }
}
function In(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = pl(n);
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
  if (n && typeof n != "function") throw Error(k(231, t, typeof n));
  return n;
}
var vo = !1;
if (Ge) try {
  var vn = {};
  Object.defineProperty(vn, "passive", { get: function() {
    vo = !0;
  } }), window.addEventListener("test", vn, vn), window.removeEventListener("test", vn, vn);
} catch {
  vo = !1;
}
function td(e, t, n, r, l, o, i, a, s) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (v) {
    this.onError(v);
  }
}
var zn = !1, Fr = null, Ir = !1, go = null, nd = { onError: function(e) {
  zn = !0, Fr = e;
} };
function rd(e, t, n, r, l, o, i, a, s) {
  zn = !1, Fr = null, td.apply(nd, arguments);
}
function ld(e, t, n, r, l, o, i, a, s) {
  if (rd.apply(this, arguments), zn) {
    if (zn) {
      var d = Fr;
      zn = !1, Fr = null;
    } else throw Error(k(198));
    Ir || (Ir = !0, go = d);
  }
}
function It(e) {
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
function $s(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function ta(e) {
  if (It(e) !== e) throw Error(k(188));
}
function od(e) {
  var t = e.alternate;
  if (!t) {
    if (t = It(e), t === null) throw Error(k(188));
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
        if (o === n) return ta(l), e;
        if (o === r) return ta(l), t;
        o = o.sibling;
      }
      throw Error(k(188));
    }
    if (n.return !== r.return) n = l, r = o;
    else {
      for (var i = !1, a = l.child; a; ) {
        if (a === n) {
          i = !0, n = l, r = o;
          break;
        }
        if (a === r) {
          i = !0, r = l, n = o;
          break;
        }
        a = a.sibling;
      }
      if (!i) {
        for (a = o.child; a; ) {
          if (a === n) {
            i = !0, n = o, r = l;
            break;
          }
          if (a === r) {
            i = !0, r = o, n = l;
            break;
          }
          a = a.sibling;
        }
        if (!i) throw Error(k(189));
      }
    }
    if (n.alternate !== r) throw Error(k(190));
  }
  if (n.tag !== 3) throw Error(k(188));
  return n.stateNode.current === n ? e : t;
}
function Ds(e) {
  return e = od(e), e !== null ? Fs(e) : null;
}
function Fs(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Fs(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Is = Se.unstable_scheduleCallback, na = Se.unstable_cancelCallback, id = Se.unstable_shouldYield, ad = Se.unstable_requestPaint, G = Se.unstable_now, sd = Se.unstable_getCurrentPriorityLevel, ai = Se.unstable_ImmediatePriority, Us = Se.unstable_UserBlockingPriority, Ur = Se.unstable_NormalPriority, ud = Se.unstable_LowPriority, As = Se.unstable_IdlePriority, ul = null, Be = null;
function cd(e) {
  if (Be && typeof Be.onCommitFiberRoot == "function") try {
    Be.onCommitFiberRoot(ul, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var $e = Math.clz32 ? Math.clz32 : pd, dd = Math.log, fd = Math.LN2;
function pd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (dd(e) / fd | 0) | 0;
}
var dr = 64, fr = 4194304;
function jn(e) {
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
function Ar(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var a = i & ~l;
    a !== 0 ? r = jn(a) : (o &= i, o !== 0 && (r = jn(o)));
  } else i = n & ~l, i !== 0 ? r = jn(i) : o !== 0 && (r = jn(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - $e(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function hd(e, t) {
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
function md(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - $e(o), a = 1 << i, s = l[i];
    s === -1 ? (!(a & n) || a & r) && (l[i] = hd(a, t)) : s <= t && (e.expiredLanes |= a), o &= ~a;
  }
}
function yo(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Bs() {
  var e = dr;
  return dr <<= 1, !(dr & 4194240) && (dr = 64), e;
}
function Rl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function er(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - $e(t), e[t] = n;
}
function vd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - $e(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function si(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - $e(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var I = 0;
function Hs(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Ws, ui, Vs, Qs, Ks, xo = !1, pr = [], ut = null, ct = null, dt = null, Un = /* @__PURE__ */ new Map(), An = /* @__PURE__ */ new Map(), rt = [], gd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function ra(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ut = null;
      break;
    case "dragenter":
    case "dragleave":
      ct = null;
      break;
    case "mouseover":
    case "mouseout":
      dt = null;
      break;
    case "pointerover":
    case "pointerout":
      Un.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      An.delete(t.pointerId);
  }
}
function gn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = nr(t), t !== null && ui(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function yd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ut = gn(ut, e, t, n, r, l), !0;
    case "dragenter":
      return ct = gn(ct, e, t, n, r, l), !0;
    case "mouseover":
      return dt = gn(dt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Un.set(o, gn(Un.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, An.set(o, gn(An.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Ys(e) {
  var t = Et(e.target);
  if (t !== null) {
    var n = It(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = $s(n), t !== null) {
          e.blockedOn = t, Ks(e.priority, function() {
            Vs(n);
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
function Cr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = wo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ho = r, n.target.dispatchEvent(r), ho = null;
    } else return t = nr(n), t !== null && ui(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function la(e, t, n) {
  Cr(e) && n.delete(t);
}
function xd() {
  xo = !1, ut !== null && Cr(ut) && (ut = null), ct !== null && Cr(ct) && (ct = null), dt !== null && Cr(dt) && (dt = null), Un.forEach(la), An.forEach(la);
}
function yn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, xo || (xo = !0, Se.unstable_scheduleCallback(Se.unstable_NormalPriority, xd)));
}
function Bn(e) {
  function t(l) {
    return yn(l, e);
  }
  if (0 < pr.length) {
    yn(pr[0], e);
    for (var n = 1; n < pr.length; n++) {
      var r = pr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ut !== null && yn(ut, e), ct !== null && yn(ct, e), dt !== null && yn(dt, e), Un.forEach(t), An.forEach(t), n = 0; n < rt.length; n++) r = rt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < rt.length && (n = rt[0], n.blockedOn === null); ) Ys(n), n.blockedOn === null && rt.shift();
}
var tn = be.ReactCurrentBatchConfig, Br = !0;
function wd(e, t, n, r) {
  var l = I, o = tn.transition;
  tn.transition = null;
  try {
    I = 1, ci(e, t, n, r);
  } finally {
    I = l, tn.transition = o;
  }
}
function kd(e, t, n, r) {
  var l = I, o = tn.transition;
  tn.transition = null;
  try {
    I = 4, ci(e, t, n, r);
  } finally {
    I = l, tn.transition = o;
  }
}
function ci(e, t, n, r) {
  if (Br) {
    var l = wo(e, t, n, r);
    if (l === null) Wl(e, t, r, Hr, n), ra(e, r);
    else if (yd(l, e, t, n, r)) r.stopPropagation();
    else if (ra(e, r), t & 4 && -1 < gd.indexOf(e)) {
      for (; l !== null; ) {
        var o = nr(l);
        if (o !== null && Ws(o), o = wo(e, t, n, r), o === null && Wl(e, t, r, Hr, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Wl(e, t, r, null, n);
  }
}
var Hr = null;
function wo(e, t, n, r) {
  if (Hr = null, e = ii(r), e = Et(e), e !== null) if (t = It(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = $s(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Hr = e, null;
}
function Xs(e) {
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
      switch (sd()) {
        case ai:
          return 1;
        case Us:
          return 4;
        case Ur:
        case ud:
          return 16;
        case As:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ot = null, di = null, Er = null;
function Gs() {
  if (Er) return Er;
  var e, t = di, n = t.length, r, l = "value" in ot ? ot.value : ot.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return Er = l.slice(e, 1 < r ? 1 - r : void 0);
}
function zr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function hr() {
  return !0;
}
function oa() {
  return !1;
}
function _e(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(o) : o[a]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? hr : oa, this.isPropagationStopped = oa, this;
  }
  return K(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = hr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = hr);
  }, persist: function() {
  }, isPersistent: hr }), t;
}
var pn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, fi = _e(pn), tr = K({}, pn, { view: 0, detail: 0 }), Sd = _e(tr), Ol, $l, xn, cl = K({}, tr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: pi, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== xn && (xn && e.type === "mousemove" ? (Ol = e.screenX - xn.screenX, $l = e.screenY - xn.screenY) : $l = Ol = 0, xn = e), Ol);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : $l;
} }), ia = _e(cl), Nd = K({}, cl, { dataTransfer: 0 }), _d = _e(Nd), jd = K({}, tr, { relatedTarget: 0 }), Dl = _e(jd), Cd = K({}, pn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Ed = _e(Cd), zd = K({}, pn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Pd = _e(zd), Td = K({}, pn, { data: 0 }), aa = _e(Td), Ld = {
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
}, Md = {
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
}, Rd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Od(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Rd[e]) ? !!t[e] : !1;
}
function pi() {
  return Od;
}
var $d = K({}, tr, { key: function(e) {
  if (e.key) {
    var t = Ld[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = zr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Md[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: pi, charCode: function(e) {
  return e.type === "keypress" ? zr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? zr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Dd = _e($d), Fd = K({}, cl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), sa = _e(Fd), Id = K({}, tr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: pi }), Ud = _e(Id), Ad = K({}, pn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Bd = _e(Ad), Hd = K({}, cl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Wd = _e(Hd), Vd = [9, 13, 27, 32], hi = Ge && "CompositionEvent" in window, Pn = null;
Ge && "documentMode" in document && (Pn = document.documentMode);
var Qd = Ge && "TextEvent" in window && !Pn, Zs = Ge && (!hi || Pn && 8 < Pn && 11 >= Pn), ua = " ", ca = !1;
function Js(e, t) {
  switch (e) {
    case "keyup":
      return Vd.indexOf(t.keyCode) !== -1;
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
function qs(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Ht = !1;
function Kd(e, t) {
  switch (e) {
    case "compositionend":
      return qs(t);
    case "keypress":
      return t.which !== 32 ? null : (ca = !0, ua);
    case "textInput":
      return e = t.data, e === ua && ca ? null : e;
    default:
      return null;
  }
}
function Yd(e, t) {
  if (Ht) return e === "compositionend" || !hi && Js(e, t) ? (e = Gs(), Er = di = ot = null, Ht = !1, e) : null;
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
      return Zs && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Xd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function da(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Xd[e.type] : t === "textarea";
}
function bs(e, t, n, r) {
  Ts(r), t = Wr(t, "onChange"), 0 < t.length && (n = new fi("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Tn = null, Hn = null;
function Gd(e) {
  cu(e, 0);
}
function dl(e) {
  var t = Qt(e);
  if (Ns(t)) return e;
}
function Zd(e, t) {
  if (e === "change") return t;
}
var eu = !1;
if (Ge) {
  var Fl;
  if (Ge) {
    var Il = "oninput" in document;
    if (!Il) {
      var fa = document.createElement("div");
      fa.setAttribute("oninput", "return;"), Il = typeof fa.oninput == "function";
    }
    Fl = Il;
  } else Fl = !1;
  eu = Fl && (!document.documentMode || 9 < document.documentMode);
}
function pa() {
  Tn && (Tn.detachEvent("onpropertychange", tu), Hn = Tn = null);
}
function tu(e) {
  if (e.propertyName === "value" && dl(Hn)) {
    var t = [];
    bs(t, Hn, e, ii(e)), Os(Gd, t);
  }
}
function Jd(e, t, n) {
  e === "focusin" ? (pa(), Tn = t, Hn = n, Tn.attachEvent("onpropertychange", tu)) : e === "focusout" && pa();
}
function qd(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return dl(Hn);
}
function bd(e, t) {
  if (e === "click") return dl(t);
}
function ef(e, t) {
  if (e === "input" || e === "change") return dl(t);
}
function tf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Fe = typeof Object.is == "function" ? Object.is : tf;
function Wn(e, t) {
  if (Fe(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!to.call(t, l) || !Fe(e[l], t[l])) return !1;
  }
  return !0;
}
function ha(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ma(e, t) {
  var n = ha(e);
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
    n = ha(n);
  }
}
function nu(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? nu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function ru() {
  for (var e = window, t = Dr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Dr(e.document);
  }
  return t;
}
function mi(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function nf(e) {
  var t = ru(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && nu(n.ownerDocument.documentElement, n)) {
    if (r !== null && mi(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = ma(n, o);
        var i = ma(
          n,
          r
        );
        l && i && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var rf = Ge && "documentMode" in document && 11 >= document.documentMode, Wt = null, ko = null, Ln = null, So = !1;
function va(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  So || Wt == null || Wt !== Dr(r) || (r = Wt, "selectionStart" in r && mi(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Ln && Wn(Ln, r) || (Ln = r, r = Wr(ko, "onSelect"), 0 < r.length && (t = new fi("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Wt)));
}
function mr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Vt = { animationend: mr("Animation", "AnimationEnd"), animationiteration: mr("Animation", "AnimationIteration"), animationstart: mr("Animation", "AnimationStart"), transitionend: mr("Transition", "TransitionEnd") }, Ul = {}, lu = {};
Ge && (lu = document.createElement("div").style, "AnimationEvent" in window || (delete Vt.animationend.animation, delete Vt.animationiteration.animation, delete Vt.animationstart.animation), "TransitionEvent" in window || delete Vt.transitionend.transition);
function fl(e) {
  if (Ul[e]) return Ul[e];
  if (!Vt[e]) return e;
  var t = Vt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in lu) return Ul[e] = t[n];
  return e;
}
var ou = fl("animationend"), iu = fl("animationiteration"), au = fl("animationstart"), su = fl("transitionend"), uu = /* @__PURE__ */ new Map(), ga = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function wt(e, t) {
  uu.set(e, t), Ft(t, [e]);
}
for (var Al = 0; Al < ga.length; Al++) {
  var Bl = ga[Al], lf = Bl.toLowerCase(), of = Bl[0].toUpperCase() + Bl.slice(1);
  wt(lf, "on" + of);
}
wt(ou, "onAnimationEnd");
wt(iu, "onAnimationIteration");
wt(au, "onAnimationStart");
wt("dblclick", "onDoubleClick");
wt("focusin", "onFocus");
wt("focusout", "onBlur");
wt(su, "onTransitionEnd");
ln("onMouseEnter", ["mouseout", "mouseover"]);
ln("onMouseLeave", ["mouseout", "mouseover"]);
ln("onPointerEnter", ["pointerout", "pointerover"]);
ln("onPointerLeave", ["pointerout", "pointerover"]);
Ft("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ft("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ft("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ft("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ft("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ft("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Cn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), af = new Set("cancel close invalid load scroll toggle".split(" ").concat(Cn));
function ya(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, ld(r, t, void 0, e), e.currentTarget = null;
}
function cu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var a = r[i], s = a.instance, d = a.currentTarget;
        if (a = a.listener, s !== o && l.isPropagationStopped()) break e;
        ya(l, a, d), o = s;
      }
      else for (i = 0; i < r.length; i++) {
        if (a = r[i], s = a.instance, d = a.currentTarget, a = a.listener, s !== o && l.isPropagationStopped()) break e;
        ya(l, a, d), o = s;
      }
    }
  }
  if (Ir) throw e = go, Ir = !1, go = null, e;
}
function A(e, t) {
  var n = t[Eo];
  n === void 0 && (n = t[Eo] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (du(t, e, 2, !1), n.add(r));
}
function Hl(e, t, n) {
  var r = 0;
  t && (r |= 4), du(n, e, r, t);
}
var vr = "_reactListening" + Math.random().toString(36).slice(2);
function Vn(e) {
  if (!e[vr]) {
    e[vr] = !0, ys.forEach(function(n) {
      n !== "selectionchange" && (af.has(n) || Hl(n, !1, e), Hl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[vr] || (t[vr] = !0, Hl("selectionchange", !1, t));
  }
}
function du(e, t, n, r) {
  switch (Xs(t)) {
    case 1:
      var l = wd;
      break;
    case 4:
      l = kd;
      break;
    default:
      l = ci;
  }
  n = l.bind(null, t, n, e), l = void 0, !vo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Wl(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var i = r.tag;
    if (i === 3 || i === 4) {
      var a = r.stateNode.containerInfo;
      if (a === l || a.nodeType === 8 && a.parentNode === l) break;
      if (i === 4) for (i = r.return; i !== null; ) {
        var s = i.tag;
        if ((s === 3 || s === 4) && (s = i.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
        i = i.return;
      }
      for (; a !== null; ) {
        if (i = Et(a), i === null) return;
        if (s = i.tag, s === 5 || s === 6) {
          r = o = i;
          continue e;
        }
        a = a.parentNode;
      }
    }
    r = r.return;
  }
  Os(function() {
    var d = o, v = ii(n), m = [];
    e: {
      var h = uu.get(e);
      if (h !== void 0) {
        var x = fi, S = e;
        switch (e) {
          case "keypress":
            if (zr(n) === 0) break e;
          case "keydown":
          case "keyup":
            x = Dd;
            break;
          case "focusin":
            S = "focus", x = Dl;
            break;
          case "focusout":
            S = "blur", x = Dl;
            break;
          case "beforeblur":
          case "afterblur":
            x = Dl;
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
            x = ia;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            x = _d;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            x = Ud;
            break;
          case ou:
          case iu:
          case au:
            x = Ed;
            break;
          case su:
            x = Bd;
            break;
          case "scroll":
            x = Sd;
            break;
          case "wheel":
            x = Wd;
            break;
          case "copy":
          case "cut":
          case "paste":
            x = Pd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            x = sa;
        }
        var _ = (t & 4) !== 0, T = !_ && e === "scroll", f = _ ? h !== null ? h + "Capture" : null : h;
        _ = [];
        for (var c = d, p; c !== null; ) {
          p = c;
          var g = p.stateNode;
          if (p.tag === 5 && g !== null && (p = g, f !== null && (g = In(c, f), g != null && _.push(Qn(c, g, p)))), T) break;
          c = c.return;
        }
        0 < _.length && (h = new x(h, S, null, n, v), m.push({ event: h, listeners: _ }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", x = e === "mouseout" || e === "pointerout", h && n !== ho && (S = n.relatedTarget || n.fromElement) && (Et(S) || S[Ze])) break e;
        if ((x || h) && (h = v.window === v ? v : (h = v.ownerDocument) ? h.defaultView || h.parentWindow : window, x ? (S = n.relatedTarget || n.toElement, x = d, S = S ? Et(S) : null, S !== null && (T = It(S), S !== T || S.tag !== 5 && S.tag !== 6) && (S = null)) : (x = null, S = d), x !== S)) {
          if (_ = ia, g = "onMouseLeave", f = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (_ = sa, g = "onPointerLeave", f = "onPointerEnter", c = "pointer"), T = x == null ? h : Qt(x), p = S == null ? h : Qt(S), h = new _(g, c + "leave", x, n, v), h.target = T, h.relatedTarget = p, g = null, Et(v) === d && (_ = new _(f, c + "enter", S, n, v), _.target = p, _.relatedTarget = T, g = _), T = g, x && S) t: {
            for (_ = x, f = S, c = 0, p = _; p; p = Ut(p)) c++;
            for (p = 0, g = f; g; g = Ut(g)) p++;
            for (; 0 < c - p; ) _ = Ut(_), c--;
            for (; 0 < p - c; ) f = Ut(f), p--;
            for (; c--; ) {
              if (_ === f || f !== null && _ === f.alternate) break t;
              _ = Ut(_), f = Ut(f);
            }
            _ = null;
          }
          else _ = null;
          x !== null && xa(m, h, x, _, !1), S !== null && T !== null && xa(m, T, S, _, !0);
        }
      }
      e: {
        if (h = d ? Qt(d) : window, x = h.nodeName && h.nodeName.toLowerCase(), x === "select" || x === "input" && h.type === "file") var y = Zd;
        else if (da(h)) if (eu) y = ef;
        else {
          y = qd;
          var j = Jd;
        }
        else (x = h.nodeName) && x.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (y = bd);
        if (y && (y = y(e, d))) {
          bs(m, y, n, v);
          break e;
        }
        j && j(e, h, d), e === "focusout" && (j = h._wrapperState) && j.controlled && h.type === "number" && so(h, "number", h.value);
      }
      switch (j = d ? Qt(d) : window, e) {
        case "focusin":
          (da(j) || j.contentEditable === "true") && (Wt = j, ko = d, Ln = null);
          break;
        case "focusout":
          Ln = ko = Wt = null;
          break;
        case "mousedown":
          So = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          So = !1, va(m, n, v);
          break;
        case "selectionchange":
          if (rf) break;
        case "keydown":
        case "keyup":
          va(m, n, v);
      }
      var w;
      if (hi) e: {
        switch (e) {
          case "compositionstart":
            var z = "onCompositionStart";
            break e;
          case "compositionend":
            z = "onCompositionEnd";
            break e;
          case "compositionupdate":
            z = "onCompositionUpdate";
            break e;
        }
        z = void 0;
      }
      else Ht ? Js(e, n) && (z = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (z = "onCompositionStart");
      z && (Zs && n.locale !== "ko" && (Ht || z !== "onCompositionStart" ? z === "onCompositionEnd" && Ht && (w = Gs()) : (ot = v, di = "value" in ot ? ot.value : ot.textContent, Ht = !0)), j = Wr(d, z), 0 < j.length && (z = new aa(z, e, null, n, v), m.push({ event: z, listeners: j }), w ? z.data = w : (w = qs(n), w !== null && (z.data = w)))), (w = Qd ? Kd(e, n) : Yd(e, n)) && (d = Wr(d, "onBeforeInput"), 0 < d.length && (v = new aa("onBeforeInput", "beforeinput", null, n, v), m.push({ event: v, listeners: d }), v.data = w));
    }
    cu(m, t);
  });
}
function Qn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Wr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = In(e, n), o != null && r.unshift(Qn(e, o, l)), o = In(e, t), o != null && r.push(Qn(e, o, l))), e = e.return;
  }
  return r;
}
function Ut(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function xa(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var a = n, s = a.alternate, d = a.stateNode;
    if (s !== null && s === r) break;
    a.tag === 5 && d !== null && (a = d, l ? (s = In(n, o), s != null && i.unshift(Qn(n, s, a))) : l || (s = In(n, o), s != null && i.push(Qn(n, s, a)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var sf = /\r\n?/g, uf = /\u0000|\uFFFD/g;
function wa(e) {
  return (typeof e == "string" ? e : "" + e).replace(sf, `
`).replace(uf, "");
}
function gr(e, t, n) {
  if (t = wa(t), wa(e) !== t && n) throw Error(k(425));
}
function Vr() {
}
var No = null, _o = null;
function jo(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Co = typeof setTimeout == "function" ? setTimeout : void 0, cf = typeof clearTimeout == "function" ? clearTimeout : void 0, ka = typeof Promise == "function" ? Promise : void 0, df = typeof queueMicrotask == "function" ? queueMicrotask : typeof ka < "u" ? function(e) {
  return ka.resolve(null).then(e).catch(ff);
} : Co;
function ff(e) {
  setTimeout(function() {
    throw e;
  });
}
function Vl(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Bn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Bn(t);
}
function ft(e) {
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
function Sa(e) {
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
var hn = Math.random().toString(36).slice(2), Ae = "__reactFiber$" + hn, Kn = "__reactProps$" + hn, Ze = "__reactContainer$" + hn, Eo = "__reactEvents$" + hn, pf = "__reactListeners$" + hn, hf = "__reactHandles$" + hn;
function Et(e) {
  var t = e[Ae];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ze] || n[Ae]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Sa(e); e !== null; ) {
        if (n = e[Ae]) return n;
        e = Sa(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function nr(e) {
  return e = e[Ae] || e[Ze], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Qt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(k(33));
}
function pl(e) {
  return e[Kn] || null;
}
var zo = [], Kt = -1;
function kt(e) {
  return { current: e };
}
function B(e) {
  0 > Kt || (e.current = zo[Kt], zo[Kt] = null, Kt--);
}
function U(e, t) {
  Kt++, zo[Kt] = e.current, e.current = t;
}
var yt = {}, ue = kt(yt), ve = kt(!1), Mt = yt;
function on(e, t) {
  var n = e.type.contextTypes;
  if (!n) return yt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function ge(e) {
  return e = e.childContextTypes, e != null;
}
function Qr() {
  B(ve), B(ue);
}
function Na(e, t, n) {
  if (ue.current !== yt) throw Error(k(168));
  U(ue, t), U(ve, n);
}
function fu(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(k(108, Jc(e) || "Unknown", l));
  return K({}, n, r);
}
function Kr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || yt, Mt = ue.current, U(ue, e), U(ve, ve.current), !0;
}
function _a(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(k(169));
  n ? (e = fu(e, t, Mt), r.__reactInternalMemoizedMergedChildContext = e, B(ve), B(ue), U(ue, e)) : B(ve), U(ve, n);
}
var Qe = null, hl = !1, Ql = !1;
function pu(e) {
  Qe === null ? Qe = [e] : Qe.push(e);
}
function mf(e) {
  hl = !0, pu(e);
}
function St() {
  if (!Ql && Qe !== null) {
    Ql = !0;
    var e = 0, t = I;
    try {
      var n = Qe;
      for (I = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Qe = null, hl = !1;
    } catch (l) {
      throw Qe !== null && (Qe = Qe.slice(e + 1)), Is(ai, St), l;
    } finally {
      I = t, Ql = !1;
    }
  }
  return null;
}
var Yt = [], Xt = 0, Yr = null, Xr = 0, je = [], Ce = 0, Rt = null, Ke = 1, Ye = "";
function jt(e, t) {
  Yt[Xt++] = Xr, Yt[Xt++] = Yr, Yr = e, Xr = t;
}
function hu(e, t, n) {
  je[Ce++] = Ke, je[Ce++] = Ye, je[Ce++] = Rt, Rt = e;
  var r = Ke;
  e = Ye;
  var l = 32 - $e(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - $e(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, Ke = 1 << 32 - $e(t) + l | n << l | r, Ye = o + e;
  } else Ke = 1 << o | n << l | r, Ye = e;
}
function vi(e) {
  e.return !== null && (jt(e, 1), hu(e, 1, 0));
}
function gi(e) {
  for (; e === Yr; ) Yr = Yt[--Xt], Yt[Xt] = null, Xr = Yt[--Xt], Yt[Xt] = null;
  for (; e === Rt; ) Rt = je[--Ce], je[Ce] = null, Ye = je[--Ce], je[Ce] = null, Ke = je[--Ce], je[Ce] = null;
}
var ke = null, we = null, H = !1, Oe = null;
function mu(e, t) {
  var n = Ee(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function ja(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ke = e, we = ft(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ke = e, we = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Rt !== null ? { id: Ke, overflow: Ye } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ee(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ke = e, we = null, !0) : !1;
    default:
      return !1;
  }
}
function Po(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function To(e) {
  if (H) {
    var t = we;
    if (t) {
      var n = t;
      if (!ja(e, t)) {
        if (Po(e)) throw Error(k(418));
        t = ft(n.nextSibling);
        var r = ke;
        t && ja(e, t) ? mu(r, n) : (e.flags = e.flags & -4097 | 2, H = !1, ke = e);
      }
    } else {
      if (Po(e)) throw Error(k(418));
      e.flags = e.flags & -4097 | 2, H = !1, ke = e;
    }
  }
}
function Ca(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ke = e;
}
function yr(e) {
  if (e !== ke) return !1;
  if (!H) return Ca(e), H = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !jo(e.type, e.memoizedProps)), t && (t = we)) {
    if (Po(e)) throw vu(), Error(k(418));
    for (; t; ) mu(e, t), t = ft(t.nextSibling);
  }
  if (Ca(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(k(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              we = ft(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      we = null;
    }
  } else we = ke ? ft(e.stateNode.nextSibling) : null;
  return !0;
}
function vu() {
  for (var e = we; e; ) e = ft(e.nextSibling);
}
function an() {
  we = ke = null, H = !1;
}
function yi(e) {
  Oe === null ? Oe = [e] : Oe.push(e);
}
var vf = be.ReactCurrentBatchConfig;
function wn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(k(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(k(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var a = l.refs;
        i === null ? delete a[o] : a[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(k(284));
    if (!n._owner) throw Error(k(290, e));
  }
  return e;
}
function xr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(k(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Ea(e) {
  var t = e._init;
  return t(e._payload);
}
function gu(e) {
  function t(f, c) {
    if (e) {
      var p = f.deletions;
      p === null ? (f.deletions = [c], f.flags |= 16) : p.push(c);
    }
  }
  function n(f, c) {
    if (!e) return null;
    for (; c !== null; ) t(f, c), c = c.sibling;
    return null;
  }
  function r(f, c) {
    for (f = /* @__PURE__ */ new Map(); c !== null; ) c.key !== null ? f.set(c.key, c) : f.set(c.index, c), c = c.sibling;
    return f;
  }
  function l(f, c) {
    return f = vt(f, c), f.index = 0, f.sibling = null, f;
  }
  function o(f, c, p) {
    return f.index = p, e ? (p = f.alternate, p !== null ? (p = p.index, p < c ? (f.flags |= 2, c) : p) : (f.flags |= 2, c)) : (f.flags |= 1048576, c);
  }
  function i(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function a(f, c, p, g) {
    return c === null || c.tag !== 6 ? (c = ql(p, f.mode, g), c.return = f, c) : (c = l(c, p), c.return = f, c);
  }
  function s(f, c, p, g) {
    var y = p.type;
    return y === Bt ? v(f, c, p.props.children, g, p.key) : c !== null && (c.elementType === y || typeof y == "object" && y !== null && y.$$typeof === tt && Ea(y) === c.type) ? (g = l(c, p.props), g.ref = wn(f, c, p), g.return = f, g) : (g = $r(p.type, p.key, p.props, null, f.mode, g), g.ref = wn(f, c, p), g.return = f, g);
  }
  function d(f, c, p, g) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== p.containerInfo || c.stateNode.implementation !== p.implementation ? (c = bl(p, f.mode, g), c.return = f, c) : (c = l(c, p.children || []), c.return = f, c);
  }
  function v(f, c, p, g, y) {
    return c === null || c.tag !== 7 ? (c = Lt(p, f.mode, g, y), c.return = f, c) : (c = l(c, p), c.return = f, c);
  }
  function m(f, c, p) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = ql("" + c, f.mode, p), c.return = f, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case sr:
          return p = $r(c.type, c.key, c.props, null, f.mode, p), p.ref = wn(f, null, c), p.return = f, p;
        case At:
          return c = bl(c, f.mode, p), c.return = f, c;
        case tt:
          var g = c._init;
          return m(f, g(c._payload), p);
      }
      if (_n(c) || mn(c)) return c = Lt(c, f.mode, p, null), c.return = f, c;
      xr(f, c);
    }
    return null;
  }
  function h(f, c, p, g) {
    var y = c !== null ? c.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number") return y !== null ? null : a(f, c, "" + p, g);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case sr:
          return p.key === y ? s(f, c, p, g) : null;
        case At:
          return p.key === y ? d(f, c, p, g) : null;
        case tt:
          return y = p._init, h(
            f,
            c,
            y(p._payload),
            g
          );
      }
      if (_n(p) || mn(p)) return y !== null ? null : v(f, c, p, g, null);
      xr(f, p);
    }
    return null;
  }
  function x(f, c, p, g, y) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return f = f.get(p) || null, a(c, f, "" + g, y);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case sr:
          return f = f.get(g.key === null ? p : g.key) || null, s(c, f, g, y);
        case At:
          return f = f.get(g.key === null ? p : g.key) || null, d(c, f, g, y);
        case tt:
          var j = g._init;
          return x(f, c, p, j(g._payload), y);
      }
      if (_n(g) || mn(g)) return f = f.get(p) || null, v(c, f, g, y, null);
      xr(c, g);
    }
    return null;
  }
  function S(f, c, p, g) {
    for (var y = null, j = null, w = c, z = c = 0, O = null; w !== null && z < p.length; z++) {
      w.index > z ? (O = w, w = null) : O = w.sibling;
      var N = h(f, w, p[z], g);
      if (N === null) {
        w === null && (w = O);
        break;
      }
      e && w && N.alternate === null && t(f, w), c = o(N, c, z), j === null ? y = N : j.sibling = N, j = N, w = O;
    }
    if (z === p.length) return n(f, w), H && jt(f, z), y;
    if (w === null) {
      for (; z < p.length; z++) w = m(f, p[z], g), w !== null && (c = o(w, c, z), j === null ? y = w : j.sibling = w, j = w);
      return H && jt(f, z), y;
    }
    for (w = r(f, w); z < p.length; z++) O = x(w, f, z, p[z], g), O !== null && (e && O.alternate !== null && w.delete(O.key === null ? z : O.key), c = o(O, c, z), j === null ? y = O : j.sibling = O, j = O);
    return e && w.forEach(function($) {
      return t(f, $);
    }), H && jt(f, z), y;
  }
  function _(f, c, p, g) {
    var y = mn(p);
    if (typeof y != "function") throw Error(k(150));
    if (p = y.call(p), p == null) throw Error(k(151));
    for (var j = y = null, w = c, z = c = 0, O = null, N = p.next(); w !== null && !N.done; z++, N = p.next()) {
      w.index > z ? (O = w, w = null) : O = w.sibling;
      var $ = h(f, w, N.value, g);
      if ($ === null) {
        w === null && (w = O);
        break;
      }
      e && w && $.alternate === null && t(f, w), c = o($, c, z), j === null ? y = $ : j.sibling = $, j = $, w = O;
    }
    if (N.done) return n(
      f,
      w
    ), H && jt(f, z), y;
    if (w === null) {
      for (; !N.done; z++, N = p.next()) N = m(f, N.value, g), N !== null && (c = o(N, c, z), j === null ? y = N : j.sibling = N, j = N);
      return H && jt(f, z), y;
    }
    for (w = r(f, w); !N.done; z++, N = p.next()) N = x(w, f, z, N.value, g), N !== null && (e && N.alternate !== null && w.delete(N.key === null ? z : N.key), c = o(N, c, z), j === null ? y = N : j.sibling = N, j = N);
    return e && w.forEach(function(W) {
      return t(f, W);
    }), H && jt(f, z), y;
  }
  function T(f, c, p, g) {
    if (typeof p == "object" && p !== null && p.type === Bt && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case sr:
          e: {
            for (var y = p.key, j = c; j !== null; ) {
              if (j.key === y) {
                if (y = p.type, y === Bt) {
                  if (j.tag === 7) {
                    n(f, j.sibling), c = l(j, p.props.children), c.return = f, f = c;
                    break e;
                  }
                } else if (j.elementType === y || typeof y == "object" && y !== null && y.$$typeof === tt && Ea(y) === j.type) {
                  n(f, j.sibling), c = l(j, p.props), c.ref = wn(f, j, p), c.return = f, f = c;
                  break e;
                }
                n(f, j);
                break;
              } else t(f, j);
              j = j.sibling;
            }
            p.type === Bt ? (c = Lt(p.props.children, f.mode, g, p.key), c.return = f, f = c) : (g = $r(p.type, p.key, p.props, null, f.mode, g), g.ref = wn(f, c, p), g.return = f, f = g);
          }
          return i(f);
        case At:
          e: {
            for (j = p.key; c !== null; ) {
              if (c.key === j) if (c.tag === 4 && c.stateNode.containerInfo === p.containerInfo && c.stateNode.implementation === p.implementation) {
                n(f, c.sibling), c = l(c, p.children || []), c.return = f, f = c;
                break e;
              } else {
                n(f, c);
                break;
              }
              else t(f, c);
              c = c.sibling;
            }
            c = bl(p, f.mode, g), c.return = f, f = c;
          }
          return i(f);
        case tt:
          return j = p._init, T(f, c, j(p._payload), g);
      }
      if (_n(p)) return S(f, c, p, g);
      if (mn(p)) return _(f, c, p, g);
      xr(f, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, c !== null && c.tag === 6 ? (n(f, c.sibling), c = l(c, p), c.return = f, f = c) : (n(f, c), c = ql(p, f.mode, g), c.return = f, f = c), i(f)) : n(f, c);
  }
  return T;
}
var sn = gu(!0), yu = gu(!1), Gr = kt(null), Zr = null, Gt = null, xi = null;
function wi() {
  xi = Gt = Zr = null;
}
function ki(e) {
  var t = Gr.current;
  B(Gr), e._currentValue = t;
}
function Lo(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function nn(e, t) {
  Zr = e, xi = Gt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (me = !0), e.firstContext = null);
}
function Pe(e) {
  var t = e._currentValue;
  if (xi !== e) if (e = { context: e, memoizedValue: t, next: null }, Gt === null) {
    if (Zr === null) throw Error(k(308));
    Gt = e, Zr.dependencies = { lanes: 0, firstContext: e };
  } else Gt = Gt.next = e;
  return t;
}
var zt = null;
function Si(e) {
  zt === null ? zt = [e] : zt.push(e);
}
function xu(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Si(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Je(e, r);
}
function Je(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var nt = !1;
function Ni(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function wu(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Xe(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function pt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, D & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Je(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Si(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Je(e, n);
}
function Pr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, si(e, n);
  }
}
function za(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, o = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var i = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        o === null ? l = o = i : o = o.next = i, n = n.next;
      } while (n !== null);
      o === null ? l = o = t : o = o.next = t;
    } else l = o = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function Jr(e, t, n, r) {
  var l = e.updateQueue;
  nt = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var s = a, d = s.next;
    s.next = null, i === null ? o = d : i.next = d, i = s;
    var v = e.alternate;
    v !== null && (v = v.updateQueue, a = v.lastBaseUpdate, a !== i && (a === null ? v.firstBaseUpdate = d : a.next = d, v.lastBaseUpdate = s));
  }
  if (o !== null) {
    var m = l.baseState;
    i = 0, v = d = s = null, a = o;
    do {
      var h = a.lane, x = a.eventTime;
      if ((r & h) === h) {
        v !== null && (v = v.next = {
          eventTime: x,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var S = e, _ = a;
          switch (h = t, x = n, _.tag) {
            case 1:
              if (S = _.payload, typeof S == "function") {
                m = S.call(x, m, h);
                break e;
              }
              m = S;
              break e;
            case 3:
              S.flags = S.flags & -65537 | 128;
            case 0:
              if (S = _.payload, h = typeof S == "function" ? S.call(x, m, h) : S, h == null) break e;
              m = K({}, m, h);
              break e;
            case 2:
              nt = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [a] : h.push(a));
      } else x = { eventTime: x, lane: h, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, v === null ? (d = v = x, s = m) : v = v.next = x, i |= h;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        h = a, a = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (s = m), l.baseState = s, l.firstBaseUpdate = d, l.lastBaseUpdate = v, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    $t |= i, e.lanes = i, e.memoizedState = m;
  }
}
function Pa(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(k(191, l));
      l.call(r);
    }
  }
}
var rr = {}, He = kt(rr), Yn = kt(rr), Xn = kt(rr);
function Pt(e) {
  if (e === rr) throw Error(k(174));
  return e;
}
function _i(e, t) {
  switch (U(Xn, t), U(Yn, e), U(He, rr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : co(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = co(t, e);
  }
  B(He), U(He, t);
}
function un() {
  B(He), B(Yn), B(Xn);
}
function ku(e) {
  Pt(Xn.current);
  var t = Pt(He.current), n = co(t, e.type);
  t !== n && (U(Yn, e), U(He, n));
}
function ji(e) {
  Yn.current === e && (B(He), B(Yn));
}
var V = kt(0);
function qr(e) {
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
var Kl = [];
function Ci() {
  for (var e = 0; e < Kl.length; e++) Kl[e]._workInProgressVersionPrimary = null;
  Kl.length = 0;
}
var Tr = be.ReactCurrentDispatcher, Yl = be.ReactCurrentBatchConfig, Ot = 0, Q = null, q = null, te = null, br = !1, Mn = !1, Gn = 0, gf = 0;
function ie() {
  throw Error(k(321));
}
function Ei(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Fe(e[n], t[n])) return !1;
  return !0;
}
function zi(e, t, n, r, l, o) {
  if (Ot = o, Q = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Tr.current = e === null || e.memoizedState === null ? kf : Sf, e = n(r, l), Mn) {
    o = 0;
    do {
      if (Mn = !1, Gn = 0, 25 <= o) throw Error(k(301));
      o += 1, te = q = null, t.updateQueue = null, Tr.current = Nf, e = n(r, l);
    } while (Mn);
  }
  if (Tr.current = el, t = q !== null && q.next !== null, Ot = 0, te = q = Q = null, br = !1, t) throw Error(k(300));
  return e;
}
function Pi() {
  var e = Gn !== 0;
  return Gn = 0, e;
}
function Ue() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return te === null ? Q.memoizedState = te = e : te = te.next = e, te;
}
function Te() {
  if (q === null) {
    var e = Q.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = q.next;
  var t = te === null ? Q.memoizedState : te.next;
  if (t !== null) te = t, q = e;
  else {
    if (e === null) throw Error(k(310));
    q = e, e = { memoizedState: q.memoizedState, baseState: q.baseState, baseQueue: q.baseQueue, queue: q.queue, next: null }, te === null ? Q.memoizedState = te = e : te = te.next = e;
  }
  return te;
}
function Zn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Xl(e) {
  var t = Te(), n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = q, l = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      l.next = o.next, o.next = i;
    }
    r.baseQueue = l = o, n.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var a = i = null, s = null, d = o;
    do {
      var v = d.lane;
      if ((Ot & v) === v) s !== null && (s = s.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var m = {
          lane: v,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        s === null ? (a = s = m, i = r) : s = s.next = m, Q.lanes |= v, $t |= v;
      }
      d = d.next;
    } while (d !== null && d !== o);
    s === null ? i = r : s.next = a, Fe(r, t.memoizedState) || (me = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = s, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, Q.lanes |= o, $t |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Gl(e) {
  var t = Te(), n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    Fe(o, t.memoizedState) || (me = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function Su() {
}
function Nu(e, t) {
  var n = Q, r = Te(), l = t(), o = !Fe(r.memoizedState, l);
  if (o && (r.memoizedState = l, me = !0), r = r.queue, Ti(Cu.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || te !== null && te.memoizedState.tag & 1) {
    if (n.flags |= 2048, Jn(9, ju.bind(null, n, r, l, t), void 0, null), ne === null) throw Error(k(349));
    Ot & 30 || _u(n, t, l);
  }
  return l;
}
function _u(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function ju(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Eu(t) && zu(e);
}
function Cu(e, t, n) {
  return n(function() {
    Eu(t) && zu(e);
  });
}
function Eu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Fe(e, n);
  } catch {
    return !0;
  }
}
function zu(e) {
  var t = Je(e, 1);
  t !== null && De(t, e, 1, -1);
}
function Ta(e) {
  var t = Ue();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Zn, lastRenderedState: e }, t.queue = e, e = e.dispatch = wf.bind(null, Q, e), [t.memoizedState, e];
}
function Jn(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Pu() {
  return Te().memoizedState;
}
function Lr(e, t, n, r) {
  var l = Ue();
  Q.flags |= e, l.memoizedState = Jn(1 | t, n, void 0, r === void 0 ? null : r);
}
function ml(e, t, n, r) {
  var l = Te();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (q !== null) {
    var i = q.memoizedState;
    if (o = i.destroy, r !== null && Ei(r, i.deps)) {
      l.memoizedState = Jn(t, n, o, r);
      return;
    }
  }
  Q.flags |= e, l.memoizedState = Jn(1 | t, n, o, r);
}
function La(e, t) {
  return Lr(8390656, 8, e, t);
}
function Ti(e, t) {
  return ml(2048, 8, e, t);
}
function Tu(e, t) {
  return ml(4, 2, e, t);
}
function Lu(e, t) {
  return ml(4, 4, e, t);
}
function Mu(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Ru(e, t, n) {
  return n = n != null ? n.concat([e]) : null, ml(4, 4, Mu.bind(null, t, e), n);
}
function Li() {
}
function Ou(e, t) {
  var n = Te();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ei(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function $u(e, t) {
  var n = Te();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ei(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Du(e, t, n) {
  return Ot & 21 ? (Fe(n, t) || (n = Bs(), Q.lanes |= n, $t |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, me = !0), e.memoizedState = n);
}
function yf(e, t) {
  var n = I;
  I = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Yl.transition;
  Yl.transition = {};
  try {
    e(!1), t();
  } finally {
    I = n, Yl.transition = r;
  }
}
function Fu() {
  return Te().memoizedState;
}
function xf(e, t, n) {
  var r = mt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Iu(e)) Uu(t, n);
  else if (n = xu(e, t, n, r), n !== null) {
    var l = de();
    De(n, e, r, l), Au(n, t, r);
  }
}
function wf(e, t, n) {
  var r = mt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Iu(e)) Uu(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, a = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = a, Fe(a, i)) {
        var s = t.interleaved;
        s === null ? (l.next = l, Si(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = xu(e, t, l, r), n !== null && (l = de(), De(n, e, r, l), Au(n, t, r));
  }
}
function Iu(e) {
  var t = e.alternate;
  return e === Q || t !== null && t === Q;
}
function Uu(e, t) {
  Mn = br = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Au(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, si(e, n);
  }
}
var el = { readContext: Pe, useCallback: ie, useContext: ie, useEffect: ie, useImperativeHandle: ie, useInsertionEffect: ie, useLayoutEffect: ie, useMemo: ie, useReducer: ie, useRef: ie, useState: ie, useDebugValue: ie, useDeferredValue: ie, useTransition: ie, useMutableSource: ie, useSyncExternalStore: ie, useId: ie, unstable_isNewReconciler: !1 }, kf = { readContext: Pe, useCallback: function(e, t) {
  return Ue().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Pe, useEffect: La, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Lr(
    4194308,
    4,
    Mu.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Lr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Lr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ue();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ue();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = xf.bind(null, Q, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ue();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ta, useDebugValue: Li, useDeferredValue: function(e) {
  return Ue().memoizedState = e;
}, useTransition: function() {
  var e = Ta(!1), t = e[0];
  return e = yf.bind(null, e[1]), Ue().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Q, l = Ue();
  if (H) {
    if (n === void 0) throw Error(k(407));
    n = n();
  } else {
    if (n = t(), ne === null) throw Error(k(349));
    Ot & 30 || _u(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, La(Cu.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Jn(9, ju.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Ue(), t = ne.identifierPrefix;
  if (H) {
    var n = Ye, r = Ke;
    n = (r & ~(1 << 32 - $e(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Gn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = gf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Sf = {
  readContext: Pe,
  useCallback: Ou,
  useContext: Pe,
  useEffect: Ti,
  useImperativeHandle: Ru,
  useInsertionEffect: Tu,
  useLayoutEffect: Lu,
  useMemo: $u,
  useReducer: Xl,
  useRef: Pu,
  useState: function() {
    return Xl(Zn);
  },
  useDebugValue: Li,
  useDeferredValue: function(e) {
    var t = Te();
    return Du(t, q.memoizedState, e);
  },
  useTransition: function() {
    var e = Xl(Zn)[0], t = Te().memoizedState;
    return [e, t];
  },
  useMutableSource: Su,
  useSyncExternalStore: Nu,
  useId: Fu,
  unstable_isNewReconciler: !1
}, Nf = { readContext: Pe, useCallback: Ou, useContext: Pe, useEffect: Ti, useImperativeHandle: Ru, useInsertionEffect: Tu, useLayoutEffect: Lu, useMemo: $u, useReducer: Gl, useRef: Pu, useState: function() {
  return Gl(Zn);
}, useDebugValue: Li, useDeferredValue: function(e) {
  var t = Te();
  return q === null ? t.memoizedState = e : Du(t, q.memoizedState, e);
}, useTransition: function() {
  var e = Gl(Zn)[0], t = Te().memoizedState;
  return [e, t];
}, useMutableSource: Su, useSyncExternalStore: Nu, useId: Fu, unstable_isNewReconciler: !1 };
function Me(e, t) {
  if (e && e.defaultProps) {
    t = K({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Mo(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : K({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var vl = { isMounted: function(e) {
  return (e = e._reactInternals) ? It(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = de(), l = mt(e), o = Xe(r, l);
  o.payload = t, n != null && (o.callback = n), t = pt(e, o, l), t !== null && (De(t, e, l, r), Pr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = de(), l = mt(e), o = Xe(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = pt(e, o, l), t !== null && (De(t, e, l, r), Pr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = de(), r = mt(e), l = Xe(n, r);
  l.tag = 2, t != null && (l.callback = t), t = pt(e, l, r), t !== null && (De(t, e, r, n), Pr(t, e, r));
} };
function Ma(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Wn(n, r) || !Wn(l, o) : !0;
}
function Bu(e, t, n) {
  var r = !1, l = yt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Pe(o) : (l = ge(t) ? Mt : ue.current, r = t.contextTypes, o = (r = r != null) ? on(e, l) : yt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = vl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Ra(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && vl.enqueueReplaceState(t, t.state, null);
}
function Ro(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Ni(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = Pe(o) : (o = ge(t) ? Mt : ue.current, l.context = on(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Mo(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && vl.enqueueReplaceState(l, l.state, null), Jr(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function cn(e, t) {
  try {
    var n = "", r = t;
    do
      n += Zc(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Zl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Oo(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var _f = typeof WeakMap == "function" ? WeakMap : Map;
function Hu(e, t, n) {
  n = Xe(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    nl || (nl = !0, Vo = r), Oo(e, t);
  }, n;
}
function Wu(e, t, n) {
  n = Xe(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Oo(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Oo(e, t), typeof r != "function" && (ht === null ? ht = /* @__PURE__ */ new Set([this]) : ht.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function Oa(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new _f();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = If.bind(null, e, t, n), t.then(e, e));
}
function $a(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Da(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Xe(-1, 1), t.tag = 2, pt(n, t, 1))), n.lanes |= 1), e);
}
var jf = be.ReactCurrentOwner, me = !1;
function ce(e, t, n, r) {
  t.child = e === null ? yu(t, null, n, r) : sn(t, e.child, n, r);
}
function Fa(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return nn(t, l), r = zi(e, t, n, r, o, l), n = Pi(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qe(e, t, l)) : (H && n && vi(t), t.flags |= 1, ce(e, t, r, l), t.child);
}
function Ia(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Ui(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Vu(e, t, o, r, l)) : (e = $r(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Wn, n(i, r) && e.ref === t.ref) return qe(e, t, l);
  }
  return t.flags |= 1, e = vt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Vu(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Wn(o, r) && e.ref === t.ref) if (me = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (me = !0);
    else return t.lanes = e.lanes, qe(e, t, l);
  }
  return $o(e, t, n, r, l);
}
function Qu(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, U(Jt, xe), xe |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, U(Jt, xe), xe |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, U(Jt, xe), xe |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, U(Jt, xe), xe |= r;
  return ce(e, t, l, n), t.child;
}
function Ku(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function $o(e, t, n, r, l) {
  var o = ge(n) ? Mt : ue.current;
  return o = on(t, o), nn(t, l), n = zi(e, t, n, r, o, l), r = Pi(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qe(e, t, l)) : (H && r && vi(t), t.flags |= 1, ce(e, t, n, l), t.child);
}
function Ua(e, t, n, r, l) {
  if (ge(n)) {
    var o = !0;
    Kr(t);
  } else o = !1;
  if (nn(t, l), t.stateNode === null) Mr(e, t), Bu(t, n, r), Ro(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, a = t.memoizedProps;
    i.props = a;
    var s = i.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = Pe(d) : (d = ge(n) ? Mt : ue.current, d = on(t, d));
    var v = n.getDerivedStateFromProps, m = typeof v == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    m || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== r || s !== d) && Ra(t, i, r, d), nt = !1;
    var h = t.memoizedState;
    i.state = h, Jr(t, r, i, l), s = t.memoizedState, a !== r || h !== s || ve.current || nt ? (typeof v == "function" && (Mo(t, n, v, r), s = t.memoizedState), (a = nt || Ma(t, n, a, r, h, s, d)) ? (m || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), i.props = r, i.state = s, i.context = d, r = a) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, wu(e, t), a = t.memoizedProps, d = t.type === t.elementType ? a : Me(t.type, a), i.props = d, m = t.pendingProps, h = i.context, s = n.contextType, typeof s == "object" && s !== null ? s = Pe(s) : (s = ge(n) ? Mt : ue.current, s = on(t, s));
    var x = n.getDerivedStateFromProps;
    (v = typeof x == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== m || h !== s) && Ra(t, i, r, s), nt = !1, h = t.memoizedState, i.state = h, Jr(t, r, i, l);
    var S = t.memoizedState;
    a !== m || h !== S || ve.current || nt ? (typeof x == "function" && (Mo(t, n, x, r), S = t.memoizedState), (d = nt || Ma(t, n, d, r, h, S, s) || !1) ? (v || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, S, s), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, S, s)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = S), i.props = r, i.state = S, i.context = s, r = d) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Do(e, t, n, r, o, l);
}
function Do(e, t, n, r, l, o) {
  Ku(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && _a(t, n, !1), qe(e, t, o);
  r = t.stateNode, jf.current = t;
  var a = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = sn(t, e.child, null, o), t.child = sn(t, null, a, o)) : ce(e, t, a, o), t.memoizedState = r.state, l && _a(t, n, !0), t.child;
}
function Yu(e) {
  var t = e.stateNode;
  t.pendingContext ? Na(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Na(e, t.context, !1), _i(e, t.containerInfo);
}
function Aa(e, t, n, r, l) {
  return an(), yi(l), t.flags |= 256, ce(e, t, n, r), t.child;
}
var Fo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Io(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Xu(e, t, n) {
  var r = t.pendingProps, l = V.current, o = !1, i = (t.flags & 128) !== 0, a;
  if ((a = i) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), U(V, l & 1), e === null)
    return To(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = xl(i, r, 0, null), e = Lt(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Io(n), t.memoizedState = Fo, e) : Mi(t, i));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return Cf(e, t, i, r, a, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, a = l.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = vt(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? o = vt(a, o) : (o = Lt(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? Io(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = Fo, r;
  }
  return o = e.child, e = o.sibling, r = vt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Mi(e, t) {
  return t = xl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function wr(e, t, n, r) {
  return r !== null && yi(r), sn(t, e.child, null, n), e = Mi(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Cf(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Zl(Error(k(422))), wr(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = xl({ mode: "visible", children: r.children }, l, 0, null), o = Lt(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && sn(t, e.child, null, i), t.child.memoizedState = Io(i), t.memoizedState = Fo, o);
  if (!(t.mode & 1)) return wr(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, o = Error(k(419)), r = Zl(o, r, void 0), wr(e, t, i, r);
  }
  if (a = (i & e.childLanes) !== 0, me || a) {
    if (r = ne, r !== null) {
      switch (i & -i) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Je(e, l), De(r, e, l, -1));
    }
    return Ii(), r = Zl(Error(k(421))), wr(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Uf.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, we = ft(l.nextSibling), ke = t, H = !0, Oe = null, e !== null && (je[Ce++] = Ke, je[Ce++] = Ye, je[Ce++] = Rt, Ke = e.id, Ye = e.overflow, Rt = t), t = Mi(t, r.children), t.flags |= 4096, t);
}
function Ba(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Lo(e.return, t, n);
}
function Jl(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function Gu(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (ce(e, t, r.children, n), r = V.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Ba(e, n, t);
      else if (e.tag === 19) Ba(e, n, t);
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
  if (U(V, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && qr(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Jl(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && qr(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Jl(t, !0, n, null, o);
      break;
    case "together":
      Jl(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Mr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function qe(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), $t |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(k(153));
  if (t.child !== null) {
    for (e = t.child, n = vt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = vt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Ef(e, t, n) {
  switch (t.tag) {
    case 3:
      Yu(t), an();
      break;
    case 5:
      ku(t);
      break;
    case 1:
      ge(t.type) && Kr(t);
      break;
    case 4:
      _i(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      U(Gr, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (U(V, V.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Xu(e, t, n) : (U(V, V.current & 1), e = qe(e, t, n), e !== null ? e.sibling : null);
      U(V, V.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Gu(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), U(V, V.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Qu(e, t, n);
  }
  return qe(e, t, n);
}
var Zu, Uo, Ju, qu;
Zu = function(e, t) {
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
Uo = function() {
};
Ju = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Pt(He.current);
    var o = null;
    switch (n) {
      case "input":
        l = io(e, l), r = io(e, r), o = [];
        break;
      case "select":
        l = K({}, l, { value: void 0 }), r = K({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = uo(e, l), r = uo(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Vr);
    }
    fo(n, r);
    var i;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var a = l[d];
      for (i in a) a.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Dn.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in r) {
      var s = r[d];
      if (a = l != null ? l[d] : void 0, r.hasOwnProperty(d) && s !== a && (s != null || a != null)) if (d === "style") if (a) {
        for (i in a) !a.hasOwnProperty(i) || s && s.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in s) s.hasOwnProperty(i) && a[i] !== s[i] && (n || (n = {}), n[i] = s[i]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = s;
      else d === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, a = a ? a.__html : void 0, s != null && a !== s && (o = o || []).push(d, s)) : d === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(d, "" + s) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Dn.hasOwnProperty(d) ? (s != null && d === "onScroll" && A("scroll", e), o || a === s || (o = [])) : (o = o || []).push(d, s));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
qu = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function kn(e, t) {
  if (!H) switch (e.tailMode) {
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
function ae(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function zf(e, t, n) {
  var r = t.pendingProps;
  switch (gi(t), t.tag) {
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
      return ae(t), null;
    case 1:
      return ge(t.type) && Qr(), ae(t), null;
    case 3:
      return r = t.stateNode, un(), B(ve), B(ue), Ci(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (yr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Oe !== null && (Yo(Oe), Oe = null))), Uo(e, t), ae(t), null;
    case 5:
      ji(t);
      var l = Pt(Xn.current);
      if (n = t.type, e !== null && t.stateNode != null) Ju(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(k(166));
          return ae(t), null;
        }
        if (e = Pt(He.current), yr(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Ae] = t, r[Kn] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              A("cancel", r), A("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              A("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Cn.length; l++) A(Cn[l], r);
              break;
            case "source":
              A("error", r);
              break;
            case "img":
            case "image":
            case "link":
              A(
                "error",
                r
              ), A("load", r);
              break;
            case "details":
              A("toggle", r);
              break;
            case "input":
              Zi(r, o), A("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, A("invalid", r);
              break;
            case "textarea":
              qi(r, o), A("invalid", r);
          }
          fo(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var a = o[i];
            i === "children" ? typeof a == "string" ? r.textContent !== a && (o.suppressHydrationWarning !== !0 && gr(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (o.suppressHydrationWarning !== !0 && gr(
              r.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Dn.hasOwnProperty(i) && a != null && i === "onScroll" && A("scroll", r);
          }
          switch (n) {
            case "input":
              ur(r), Ji(r, o, !0);
              break;
            case "textarea":
              ur(r), bi(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Vr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Cs(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[Ae] = t, e[Kn] = r, Zu(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = po(n, r), n) {
              case "dialog":
                A("cancel", e), A("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                A("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Cn.length; l++) A(Cn[l], e);
                l = r;
                break;
              case "source":
                A("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                A(
                  "error",
                  e
                ), A("load", e), l = r;
                break;
              case "details":
                A("toggle", e), l = r;
                break;
              case "input":
                Zi(e, r), l = io(e, r), A("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = K({}, r, { value: void 0 }), A("invalid", e);
                break;
              case "textarea":
                qi(e, r), l = uo(e, r), A("invalid", e);
                break;
              default:
                l = r;
            }
            fo(n, l), a = l;
            for (o in a) if (a.hasOwnProperty(o)) {
              var s = a[o];
              o === "style" ? Ps(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && Es(e, s)) : o === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Fn(e, s) : typeof s == "number" && Fn(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Dn.hasOwnProperty(o) ? s != null && o === "onScroll" && A("scroll", e) : s != null && ni(e, o, s, i));
            }
            switch (n) {
              case "input":
                ur(e), Ji(e, r, !1);
                break;
              case "textarea":
                ur(e), bi(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + gt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? qt(e, !!r.multiple, o, !1) : r.defaultValue != null && qt(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Vr);
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
      return ae(t), null;
    case 6:
      if (e && t.stateNode != null) qu(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(k(166));
        if (n = Pt(Xn.current), Pt(He.current), yr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ae] = t, (o = r.nodeValue !== n) && (e = ke, e !== null)) switch (e.tag) {
            case 3:
              gr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && gr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ae] = t, t.stateNode = r;
      }
      return ae(t), null;
    case 13:
      if (B(V), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (H && we !== null && t.mode & 1 && !(t.flags & 128)) vu(), an(), t.flags |= 98560, o = !1;
        else if (o = yr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(k(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(k(317));
            o[Ae] = t;
          } else an(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ae(t), o = !1;
        } else Oe !== null && (Yo(Oe), Oe = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || V.current & 1 ? b === 0 && (b = 3) : Ii())), t.updateQueue !== null && (t.flags |= 4), ae(t), null);
    case 4:
      return un(), Uo(e, t), e === null && Vn(t.stateNode.containerInfo), ae(t), null;
    case 10:
      return ki(t.type._context), ae(t), null;
    case 17:
      return ge(t.type) && Qr(), ae(t), null;
    case 19:
      if (B(V), o = t.memoizedState, o === null) return ae(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) kn(o, !1);
      else {
        if (b !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = qr(e), i !== null) {
            for (t.flags |= 128, kn(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return U(V, V.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && G() > dn && (t.flags |= 128, r = !0, kn(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = qr(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), kn(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !H) return ae(t), null;
        } else 2 * G() - o.renderingStartTime > dn && n !== 1073741824 && (t.flags |= 128, r = !0, kn(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = G(), t.sibling = null, n = V.current, U(V, r ? n & 1 | 2 : n & 1), t) : (ae(t), null);
    case 22:
    case 23:
      return Fi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? xe & 1073741824 && (ae(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ae(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(k(156, t.tag));
}
function Pf(e, t) {
  switch (gi(t), t.tag) {
    case 1:
      return ge(t.type) && Qr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return un(), B(ve), B(ue), Ci(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return ji(t), null;
    case 13:
      if (B(V), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(k(340));
        an();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return B(V), null;
    case 4:
      return un(), null;
    case 10:
      return ki(t.type._context), null;
    case 22:
    case 23:
      return Fi(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var kr = !1, se = !1, Tf = typeof WeakSet == "function" ? WeakSet : Set, C = null;
function Zt(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    Y(e, t, r);
  }
  else n.current = null;
}
function Ao(e, t, n) {
  try {
    n();
  } catch (r) {
    Y(e, t, r);
  }
}
var Ha = !1;
function Lf(e, t) {
  if (No = Br, e = ru(), mi(e)) {
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
        var i = 0, a = -1, s = -1, d = 0, v = 0, m = e, h = null;
        t: for (; ; ) {
          for (var x; m !== n || l !== 0 && m.nodeType !== 3 || (a = i + l), m !== o || r !== 0 && m.nodeType !== 3 || (s = i + r), m.nodeType === 3 && (i += m.nodeValue.length), (x = m.firstChild) !== null; )
            h = m, m = x;
          for (; ; ) {
            if (m === e) break t;
            if (h === n && ++d === l && (a = i), h === o && ++v === r && (s = i), (x = m.nextSibling) !== null) break;
            m = h, h = m.parentNode;
          }
          m = x;
        }
        n = a === -1 || s === -1 ? null : { start: a, end: s };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (_o = { focusedElem: e, selectionRange: n }, Br = !1, C = t; C !== null; ) if (t = C, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, C = e;
  else for (; C !== null; ) {
    t = C;
    try {
      var S = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (S !== null) {
            var _ = S.memoizedProps, T = S.memoizedState, f = t.stateNode, c = f.getSnapshotBeforeUpdate(t.elementType === t.type ? _ : Me(t.type, _), T);
            f.__reactInternalSnapshotBeforeUpdate = c;
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
          throw Error(k(163));
      }
    } catch (g) {
      Y(t, t.return, g);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, C = e;
      break;
    }
    C = t.return;
  }
  return S = Ha, Ha = !1, S;
}
function Rn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Ao(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function gl(e, t) {
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
function Bo(e) {
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
function bu(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, bu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ae], delete t[Kn], delete t[Eo], delete t[pf], delete t[hf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function ec(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Wa(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || ec(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ho(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Vr));
  else if (r !== 4 && (e = e.child, e !== null)) for (Ho(e, t, n), e = e.sibling; e !== null; ) Ho(e, t, n), e = e.sibling;
}
function Wo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Wo(e, t, n), e = e.sibling; e !== null; ) Wo(e, t, n), e = e.sibling;
}
var re = null, Re = !1;
function et(e, t, n) {
  for (n = n.child; n !== null; ) tc(e, t, n), n = n.sibling;
}
function tc(e, t, n) {
  if (Be && typeof Be.onCommitFiberUnmount == "function") try {
    Be.onCommitFiberUnmount(ul, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      se || Zt(n, t);
    case 6:
      var r = re, l = Re;
      re = null, et(e, t, n), re = r, Re = l, re !== null && (Re ? (e = re, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : re.removeChild(n.stateNode));
      break;
    case 18:
      re !== null && (Re ? (e = re, n = n.stateNode, e.nodeType === 8 ? Vl(e.parentNode, n) : e.nodeType === 1 && Vl(e, n), Bn(e)) : Vl(re, n.stateNode));
      break;
    case 4:
      r = re, l = Re, re = n.stateNode.containerInfo, Re = !0, et(e, t, n), re = r, Re = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!se && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && Ao(n, t, i), l = l.next;
        } while (l !== r);
      }
      et(e, t, n);
      break;
    case 1:
      if (!se && (Zt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        Y(n, t, a);
      }
      et(e, t, n);
      break;
    case 21:
      et(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (se = (r = se) || n.memoizedState !== null, et(e, t, n), se = r) : et(e, t, n);
      break;
    default:
      et(e, t, n);
  }
}
function Va(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Tf()), t.forEach(function(r) {
      var l = Af.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Le(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, a = i;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            re = a.stateNode, Re = !1;
            break e;
          case 3:
            re = a.stateNode.containerInfo, Re = !0;
            break e;
          case 4:
            re = a.stateNode.containerInfo, Re = !0;
            break e;
        }
        a = a.return;
      }
      if (re === null) throw Error(k(160));
      tc(o, i, l), re = null, Re = !1;
      var s = l.alternate;
      s !== null && (s.return = null), l.return = null;
    } catch (d) {
      Y(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) nc(t, e), t = t.sibling;
}
function nc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Le(t, e), Ie(e), r & 4) {
        try {
          Rn(3, e, e.return), gl(3, e);
        } catch (_) {
          Y(e, e.return, _);
        }
        try {
          Rn(5, e, e.return);
        } catch (_) {
          Y(e, e.return, _);
        }
      }
      break;
    case 1:
      Le(t, e), Ie(e), r & 512 && n !== null && Zt(n, n.return);
      break;
    case 5:
      if (Le(t, e), Ie(e), r & 512 && n !== null && Zt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Fn(l, "");
        } catch (_) {
          Y(e, e.return, _);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, a = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          a === "input" && o.type === "radio" && o.name != null && _s(l, o), po(a, i);
          var d = po(a, o);
          for (i = 0; i < s.length; i += 2) {
            var v = s[i], m = s[i + 1];
            v === "style" ? Ps(l, m) : v === "dangerouslySetInnerHTML" ? Es(l, m) : v === "children" ? Fn(l, m) : ni(l, v, m, d);
          }
          switch (a) {
            case "input":
              ao(l, o);
              break;
            case "textarea":
              js(l, o);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var x = o.value;
              x != null ? qt(l, !!o.multiple, x, !1) : h !== !!o.multiple && (o.defaultValue != null ? qt(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : qt(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Kn] = o;
        } catch (_) {
          Y(e, e.return, _);
        }
      }
      break;
    case 6:
      if (Le(t, e), Ie(e), r & 4) {
        if (e.stateNode === null) throw Error(k(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (_) {
          Y(e, e.return, _);
        }
      }
      break;
    case 3:
      if (Le(t, e), Ie(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Bn(t.containerInfo);
      } catch (_) {
        Y(e, e.return, _);
      }
      break;
    case 4:
      Le(t, e), Ie(e);
      break;
    case 13:
      Le(t, e), Ie(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || ($i = G())), r & 4 && Va(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (se = (d = se) || v, Le(t, e), se = d) : Le(t, e), Ie(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !v && e.mode & 1) for (C = e, v = e.child; v !== null; ) {
          for (m = C = v; C !== null; ) {
            switch (h = C, x = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Rn(4, h, h.return);
                break;
              case 1:
                Zt(h, h.return);
                var S = h.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount();
                  } catch (_) {
                    Y(r, n, _);
                  }
                }
                break;
              case 5:
                Zt(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Ka(m);
                  continue;
                }
            }
            x !== null ? (x.return = h, C = x) : Ka(m);
          }
          v = v.sibling;
        }
        e: for (v = null, m = e; ; ) {
          if (m.tag === 5) {
            if (v === null) {
              v = m;
              try {
                l = m.stateNode, d ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (a = m.stateNode, s = m.memoizedProps.style, i = s != null && s.hasOwnProperty("display") ? s.display : null, a.style.display = zs("display", i));
              } catch (_) {
                Y(e, e.return, _);
              }
            }
          } else if (m.tag === 6) {
            if (v === null) try {
              m.stateNode.nodeValue = d ? "" : m.memoizedProps;
            } catch (_) {
              Y(e, e.return, _);
            }
          } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
            m.child.return = m, m = m.child;
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            v === m && (v = null), m = m.return;
          }
          v === m && (v = null), m.sibling.return = m.return, m = m.sibling;
        }
      }
      break;
    case 19:
      Le(t, e), Ie(e), r & 4 && Va(e);
      break;
    case 21:
      break;
    default:
      Le(
        t,
        e
      ), Ie(e);
  }
}
function Ie(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (ec(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(k(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Fn(l, ""), r.flags &= -33);
          var o = Wa(e);
          Wo(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, a = Wa(e);
          Ho(e, a, i);
          break;
        default:
          throw Error(k(161));
      }
    } catch (s) {
      Y(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Mf(e, t, n) {
  C = e, rc(e);
}
function rc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; C !== null; ) {
    var l = C, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || kr;
      if (!i) {
        var a = l.alternate, s = a !== null && a.memoizedState !== null || se;
        a = kr;
        var d = se;
        if (kr = i, (se = s) && !d) for (C = l; C !== null; ) i = C, s = i.child, i.tag === 22 && i.memoizedState !== null ? Ya(l) : s !== null ? (s.return = i, C = s) : Ya(l);
        for (; o !== null; ) C = o, rc(o), o = o.sibling;
        C = l, kr = a, se = d;
      }
      Qa(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, C = o) : Qa(e);
  }
}
function Qa(e) {
  for (; C !== null; ) {
    var t = C;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            se || gl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !se) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Me(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Pa(t, o, r);
            break;
          case 3:
            var i = t.updateQueue;
            if (i !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              Pa(t, i, n);
            }
            break;
          case 5:
            var a = t.stateNode;
            if (n === null && t.flags & 4) {
              n = a;
              var s = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  s.autoFocus && n.focus();
                  break;
                case "img":
                  s.src && (n.src = s.src);
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
              var d = t.alternate;
              if (d !== null) {
                var v = d.memoizedState;
                if (v !== null) {
                  var m = v.dehydrated;
                  m !== null && Bn(m);
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
            throw Error(k(163));
        }
        se || t.flags & 512 && Bo(t);
      } catch (h) {
        Y(t, t.return, h);
      }
    }
    if (t === e) {
      C = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, C = n;
      break;
    }
    C = t.return;
  }
}
function Ka(e) {
  for (; C !== null; ) {
    var t = C;
    if (t === e) {
      C = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, C = n;
      break;
    }
    C = t.return;
  }
}
function Ya(e) {
  for (; C !== null; ) {
    var t = C;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            gl(4, t);
          } catch (s) {
            Y(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              Y(t, l, s);
            }
          }
          var o = t.return;
          try {
            Bo(t);
          } catch (s) {
            Y(t, o, s);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Bo(t);
          } catch (s) {
            Y(t, i, s);
          }
      }
    } catch (s) {
      Y(t, t.return, s);
    }
    if (t === e) {
      C = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, C = a;
      break;
    }
    C = t.return;
  }
}
var Rf = Math.ceil, tl = be.ReactCurrentDispatcher, Ri = be.ReactCurrentOwner, ze = be.ReactCurrentBatchConfig, D = 0, ne = null, Z = null, le = 0, xe = 0, Jt = kt(0), b = 0, qn = null, $t = 0, yl = 0, Oi = 0, On = null, he = null, $i = 0, dn = 1 / 0, Ve = null, nl = !1, Vo = null, ht = null, Sr = !1, it = null, rl = 0, $n = 0, Qo = null, Rr = -1, Or = 0;
function de() {
  return D & 6 ? G() : Rr !== -1 ? Rr : Rr = G();
}
function mt(e) {
  return e.mode & 1 ? D & 2 && le !== 0 ? le & -le : vf.transition !== null ? (Or === 0 && (Or = Bs()), Or) : (e = I, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Xs(e.type)), e) : 1;
}
function De(e, t, n, r) {
  if (50 < $n) throw $n = 0, Qo = null, Error(k(185));
  er(e, n, r), (!(D & 2) || e !== ne) && (e === ne && (!(D & 2) && (yl |= n), b === 4 && lt(e, le)), ye(e, r), n === 1 && D === 0 && !(t.mode & 1) && (dn = G() + 500, hl && St()));
}
function ye(e, t) {
  var n = e.callbackNode;
  md(e, t);
  var r = Ar(e, e === ne ? le : 0);
  if (r === 0) n !== null && na(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && na(n), t === 1) e.tag === 0 ? mf(Xa.bind(null, e)) : pu(Xa.bind(null, e)), df(function() {
      !(D & 6) && St();
    }), n = null;
    else {
      switch (Hs(r)) {
        case 1:
          n = ai;
          break;
        case 4:
          n = Us;
          break;
        case 16:
          n = Ur;
          break;
        case 536870912:
          n = As;
          break;
        default:
          n = Ur;
      }
      n = dc(n, lc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function lc(e, t) {
  if (Rr = -1, Or = 0, D & 6) throw Error(k(327));
  var n = e.callbackNode;
  if (rn() && e.callbackNode !== n) return null;
  var r = Ar(e, e === ne ? le : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ll(e, r);
  else {
    t = r;
    var l = D;
    D |= 2;
    var o = ic();
    (ne !== e || le !== t) && (Ve = null, dn = G() + 500, Tt(e, t));
    do
      try {
        Df();
        break;
      } catch (a) {
        oc(e, a);
      }
    while (!0);
    wi(), tl.current = o, D = l, Z !== null ? t = 0 : (ne = null, le = 0, t = b);
  }
  if (t !== 0) {
    if (t === 2 && (l = yo(e), l !== 0 && (r = l, t = Ko(e, l))), t === 1) throw n = qn, Tt(e, 0), lt(e, r), ye(e, G()), n;
    if (t === 6) lt(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Of(l) && (t = ll(e, r), t === 2 && (o = yo(e), o !== 0 && (r = o, t = Ko(e, o))), t === 1)) throw n = qn, Tt(e, 0), lt(e, r), ye(e, G()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(k(345));
        case 2:
          Ct(e, he, Ve);
          break;
        case 3:
          if (lt(e, r), (r & 130023424) === r && (t = $i + 500 - G(), 10 < t)) {
            if (Ar(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              de(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Co(Ct.bind(null, e, he, Ve), t);
            break;
          }
          Ct(e, he, Ve);
          break;
        case 4:
          if (lt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - $e(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = G() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Rf(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Co(Ct.bind(null, e, he, Ve), r);
            break;
          }
          Ct(e, he, Ve);
          break;
        case 5:
          Ct(e, he, Ve);
          break;
        default:
          throw Error(k(329));
      }
    }
  }
  return ye(e, G()), e.callbackNode === n ? lc.bind(null, e) : null;
}
function Ko(e, t) {
  var n = On;
  return e.current.memoizedState.isDehydrated && (Tt(e, t).flags |= 256), e = ll(e, t), e !== 2 && (t = he, he = n, t !== null && Yo(t)), e;
}
function Yo(e) {
  he === null ? he = e : he.push.apply(he, e);
}
function Of(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!Fe(o(), l)) return !1;
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
function lt(e, t) {
  for (t &= ~Oi, t &= ~yl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - $e(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Xa(e) {
  if (D & 6) throw Error(k(327));
  rn();
  var t = Ar(e, 0);
  if (!(t & 1)) return ye(e, G()), null;
  var n = ll(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = yo(e);
    r !== 0 && (t = r, n = Ko(e, r));
  }
  if (n === 1) throw n = qn, Tt(e, 0), lt(e, t), ye(e, G()), n;
  if (n === 6) throw Error(k(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ct(e, he, Ve), ye(e, G()), null;
}
function Di(e, t) {
  var n = D;
  D |= 1;
  try {
    return e(t);
  } finally {
    D = n, D === 0 && (dn = G() + 500, hl && St());
  }
}
function Dt(e) {
  it !== null && it.tag === 0 && !(D & 6) && rn();
  var t = D;
  D |= 1;
  var n = ze.transition, r = I;
  try {
    if (ze.transition = null, I = 1, e) return e();
  } finally {
    I = r, ze.transition = n, D = t, !(D & 6) && St();
  }
}
function Fi() {
  xe = Jt.current, B(Jt);
}
function Tt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, cf(n)), Z !== null) for (n = Z.return; n !== null; ) {
    var r = n;
    switch (gi(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Qr();
        break;
      case 3:
        un(), B(ve), B(ue), Ci();
        break;
      case 5:
        ji(r);
        break;
      case 4:
        un();
        break;
      case 13:
        B(V);
        break;
      case 19:
        B(V);
        break;
      case 10:
        ki(r.type._context);
        break;
      case 22:
      case 23:
        Fi();
    }
    n = n.return;
  }
  if (ne = e, Z = e = vt(e.current, null), le = xe = t, b = 0, qn = null, Oi = yl = $t = 0, he = On = null, zt !== null) {
    for (t = 0; t < zt.length; t++) if (n = zt[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var i = o.next;
        o.next = l, r.next = i;
      }
      n.pending = r;
    }
    zt = null;
  }
  return e;
}
function oc(e, t) {
  do {
    var n = Z;
    try {
      if (wi(), Tr.current = el, br) {
        for (var r = Q.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        br = !1;
      }
      if (Ot = 0, te = q = Q = null, Mn = !1, Gn = 0, Ri.current = null, n === null || n.return === null) {
        b = 1, qn = t, Z = null;
        break;
      }
      e: {
        var o = e, i = n.return, a = n, s = t;
        if (t = le, a.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var d = s, v = a, m = v.tag;
          if (!(v.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var h = v.alternate;
            h ? (v.updateQueue = h.updateQueue, v.memoizedState = h.memoizedState, v.lanes = h.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var x = $a(i);
          if (x !== null) {
            x.flags &= -257, Da(x, i, a, o, t), x.mode & 1 && Oa(o, d, t), t = x, s = d;
            var S = t.updateQueue;
            if (S === null) {
              var _ = /* @__PURE__ */ new Set();
              _.add(s), t.updateQueue = _;
            } else S.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              Oa(o, d, t), Ii();
              break e;
            }
            s = Error(k(426));
          }
        } else if (H && a.mode & 1) {
          var T = $a(i);
          if (T !== null) {
            !(T.flags & 65536) && (T.flags |= 256), Da(T, i, a, o, t), yi(cn(s, a));
            break e;
          }
        }
        o = s = cn(s, a), b !== 4 && (b = 2), On === null ? On = [o] : On.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var f = Hu(o, s, t);
              za(o, f);
              break e;
            case 1:
              a = s;
              var c = o.type, p = o.stateNode;
              if (!(o.flags & 128) && (typeof c.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (ht === null || !ht.has(p)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var g = Wu(o, a, t);
                za(o, g);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      sc(n);
    } catch (y) {
      t = y, Z === n && n !== null && (Z = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function ic() {
  var e = tl.current;
  return tl.current = el, e === null ? el : e;
}
function Ii() {
  (b === 0 || b === 3 || b === 2) && (b = 4), ne === null || !($t & 268435455) && !(yl & 268435455) || lt(ne, le);
}
function ll(e, t) {
  var n = D;
  D |= 2;
  var r = ic();
  (ne !== e || le !== t) && (Ve = null, Tt(e, t));
  do
    try {
      $f();
      break;
    } catch (l) {
      oc(e, l);
    }
  while (!0);
  if (wi(), D = n, tl.current = r, Z !== null) throw Error(k(261));
  return ne = null, le = 0, b;
}
function $f() {
  for (; Z !== null; ) ac(Z);
}
function Df() {
  for (; Z !== null && !id(); ) ac(Z);
}
function ac(e) {
  var t = cc(e.alternate, e, xe);
  e.memoizedProps = e.pendingProps, t === null ? sc(e) : Z = t, Ri.current = null;
}
function sc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Pf(n, t), n !== null) {
        n.flags &= 32767, Z = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        b = 6, Z = null;
        return;
      }
    } else if (n = zf(n, t, xe), n !== null) {
      Z = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      Z = t;
      return;
    }
    Z = t = e;
  } while (t !== null);
  b === 0 && (b = 5);
}
function Ct(e, t, n) {
  var r = I, l = ze.transition;
  try {
    ze.transition = null, I = 1, Ff(e, t, n, r);
  } finally {
    ze.transition = l, I = r;
  }
  return null;
}
function Ff(e, t, n, r) {
  do
    rn();
  while (it !== null);
  if (D & 6) throw Error(k(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(k(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (vd(e, o), e === ne && (Z = ne = null, le = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Sr || (Sr = !0, dc(Ur, function() {
    return rn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = ze.transition, ze.transition = null;
    var i = I;
    I = 1;
    var a = D;
    D |= 4, Ri.current = null, Lf(e, n), nc(n, e), nf(_o), Br = !!No, _o = No = null, e.current = n, Mf(n), ad(), D = a, I = i, ze.transition = o;
  } else e.current = n;
  if (Sr && (Sr = !1, it = e, rl = l), o = e.pendingLanes, o === 0 && (ht = null), cd(n.stateNode), ye(e, G()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (nl) throw nl = !1, e = Vo, Vo = null, e;
  return rl & 1 && e.tag !== 0 && rn(), o = e.pendingLanes, o & 1 ? e === Qo ? $n++ : ($n = 0, Qo = e) : $n = 0, St(), null;
}
function rn() {
  if (it !== null) {
    var e = Hs(rl), t = ze.transition, n = I;
    try {
      if (ze.transition = null, I = 16 > e ? 16 : e, it === null) var r = !1;
      else {
        if (e = it, it = null, rl = 0, D & 6) throw Error(k(331));
        var l = D;
        for (D |= 4, C = e.current; C !== null; ) {
          var o = C, i = o.child;
          if (C.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var s = 0; s < a.length; s++) {
                var d = a[s];
                for (C = d; C !== null; ) {
                  var v = C;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Rn(8, v, o);
                  }
                  var m = v.child;
                  if (m !== null) m.return = v, C = m;
                  else for (; C !== null; ) {
                    v = C;
                    var h = v.sibling, x = v.return;
                    if (bu(v), v === d) {
                      C = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = x, C = h;
                      break;
                    }
                    C = x;
                  }
                }
              }
              var S = o.alternate;
              if (S !== null) {
                var _ = S.child;
                if (_ !== null) {
                  S.child = null;
                  do {
                    var T = _.sibling;
                    _.sibling = null, _ = T;
                  } while (_ !== null);
                }
              }
              C = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, C = i;
          else e: for (; C !== null; ) {
            if (o = C, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Rn(9, o, o.return);
            }
            var f = o.sibling;
            if (f !== null) {
              f.return = o.return, C = f;
              break e;
            }
            C = o.return;
          }
        }
        var c = e.current;
        for (C = c; C !== null; ) {
          i = C;
          var p = i.child;
          if (i.subtreeFlags & 2064 && p !== null) p.return = i, C = p;
          else e: for (i = c; C !== null; ) {
            if (a = C, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  gl(9, a);
              }
            } catch (y) {
              Y(a, a.return, y);
            }
            if (a === i) {
              C = null;
              break e;
            }
            var g = a.sibling;
            if (g !== null) {
              g.return = a.return, C = g;
              break e;
            }
            C = a.return;
          }
        }
        if (D = l, St(), Be && typeof Be.onPostCommitFiberRoot == "function") try {
          Be.onPostCommitFiberRoot(ul, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      I = n, ze.transition = t;
    }
  }
  return !1;
}
function Ga(e, t, n) {
  t = cn(n, t), t = Hu(e, t, 1), e = pt(e, t, 1), t = de(), e !== null && (er(e, 1, t), ye(e, t));
}
function Y(e, t, n) {
  if (e.tag === 3) Ga(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Ga(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ht === null || !ht.has(r))) {
        e = cn(n, e), e = Wu(t, e, 1), t = pt(t, e, 1), e = de(), t !== null && (er(t, 1, e), ye(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function If(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = de(), e.pingedLanes |= e.suspendedLanes & n, ne === e && (le & n) === n && (b === 4 || b === 3 && (le & 130023424) === le && 500 > G() - $i ? Tt(e, 0) : Oi |= n), ye(e, t);
}
function uc(e, t) {
  t === 0 && (e.mode & 1 ? (t = fr, fr <<= 1, !(fr & 130023424) && (fr = 4194304)) : t = 1);
  var n = de();
  e = Je(e, t), e !== null && (er(e, t, n), ye(e, n));
}
function Uf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), uc(e, n);
}
function Af(e, t) {
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
      throw Error(k(314));
  }
  r !== null && r.delete(t), uc(e, n);
}
var cc;
cc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ve.current) me = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return me = !1, Ef(e, t, n);
    me = !!(e.flags & 131072);
  }
  else me = !1, H && t.flags & 1048576 && hu(t, Xr, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Mr(e, t), e = t.pendingProps;
      var l = on(t, ue.current);
      nn(t, n), l = zi(null, t, r, e, l, n);
      var o = Pi();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ge(r) ? (o = !0, Kr(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Ni(t), l.updater = vl, t.stateNode = l, l._reactInternals = t, Ro(t, r, e, n), t = Do(null, t, r, !0, o, n)) : (t.tag = 0, H && o && vi(t), ce(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Mr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Hf(r), e = Me(r, e), l) {
          case 0:
            t = $o(null, t, r, e, n);
            break e;
          case 1:
            t = Ua(null, t, r, e, n);
            break e;
          case 11:
            t = Fa(null, t, r, e, n);
            break e;
          case 14:
            t = Ia(null, t, r, Me(r.type, e), n);
            break e;
        }
        throw Error(k(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Me(r, l), $o(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Me(r, l), Ua(e, t, r, l, n);
    case 3:
      e: {
        if (Yu(t), e === null) throw Error(k(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, wu(e, t), Jr(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = cn(Error(k(423)), t), t = Aa(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = cn(Error(k(424)), t), t = Aa(e, t, r, n, l);
          break e;
        } else for (we = ft(t.stateNode.containerInfo.firstChild), ke = t, H = !0, Oe = null, n = yu(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (an(), r === l) {
            t = qe(e, t, n);
            break e;
          }
          ce(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return ku(t), e === null && To(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, jo(r, l) ? i = null : o !== null && jo(r, o) && (t.flags |= 32), Ku(e, t), ce(e, t, i, n), t.child;
    case 6:
      return e === null && To(t), null;
    case 13:
      return Xu(e, t, n);
    case 4:
      return _i(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = sn(t, null, r, n) : ce(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Me(r, l), Fa(e, t, r, l, n);
    case 7:
      return ce(e, t, t.pendingProps, n), t.child;
    case 8:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, U(Gr, r._currentValue), r._currentValue = i, o !== null) if (Fe(o.value, i)) {
          if (o.children === l.children && !ve.current) {
            t = qe(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var a = o.dependencies;
          if (a !== null) {
            i = o.child;
            for (var s = a.firstContext; s !== null; ) {
              if (s.context === r) {
                if (o.tag === 1) {
                  s = Xe(-1, n & -n), s.tag = 2;
                  var d = o.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var v = d.pending;
                    v === null ? s.next = s : (s.next = v.next, v.next = s), d.pending = s;
                  }
                }
                o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Lo(
                  o.return,
                  n,
                  t
                ), a.lanes |= n;
                break;
              }
              s = s.next;
            }
          } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (i = o.return, i === null) throw Error(k(341));
            i.lanes |= n, a = i.alternate, a !== null && (a.lanes |= n), Lo(i, n, t), i = o.sibling;
          } else i = o.child;
          if (i !== null) i.return = o;
          else for (i = o; i !== null; ) {
            if (i === t) {
              i = null;
              break;
            }
            if (o = i.sibling, o !== null) {
              o.return = i.return, i = o;
              break;
            }
            i = i.return;
          }
          o = i;
        }
        ce(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, nn(t, n), l = Pe(l), r = r(l), t.flags |= 1, ce(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Me(r, t.pendingProps), l = Me(r.type, l), Ia(e, t, r, l, n);
    case 15:
      return Vu(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Me(r, l), Mr(e, t), t.tag = 1, ge(r) ? (e = !0, Kr(t)) : e = !1, nn(t, n), Bu(t, r, l), Ro(t, r, l, n), Do(null, t, r, !0, e, n);
    case 19:
      return Gu(e, t, n);
    case 22:
      return Qu(e, t, n);
  }
  throw Error(k(156, t.tag));
};
function dc(e, t) {
  return Is(e, t);
}
function Bf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ee(e, t, n, r) {
  return new Bf(e, t, n, r);
}
function Ui(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Hf(e) {
  if (typeof e == "function") return Ui(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === li) return 11;
    if (e === oi) return 14;
  }
  return 2;
}
function vt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ee(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function $r(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") Ui(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case Bt:
      return Lt(n.children, l, o, t);
    case ri:
      i = 8, l |= 8;
      break;
    case no:
      return e = Ee(12, n, t, l | 2), e.elementType = no, e.lanes = o, e;
    case ro:
      return e = Ee(13, n, t, l), e.elementType = ro, e.lanes = o, e;
    case lo:
      return e = Ee(19, n, t, l), e.elementType = lo, e.lanes = o, e;
    case ks:
      return xl(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case xs:
          i = 10;
          break e;
        case ws:
          i = 9;
          break e;
        case li:
          i = 11;
          break e;
        case oi:
          i = 14;
          break e;
        case tt:
          i = 16, r = null;
          break e;
      }
      throw Error(k(130, e == null ? e : typeof e, ""));
  }
  return t = Ee(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Lt(e, t, n, r) {
  return e = Ee(7, e, r, t), e.lanes = n, e;
}
function xl(e, t, n, r) {
  return e = Ee(22, e, r, t), e.elementType = ks, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ql(e, t, n) {
  return e = Ee(6, e, null, t), e.lanes = n, e;
}
function bl(e, t, n) {
  return t = Ee(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Wf(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Rl(0), this.expirationTimes = Rl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Rl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Ai(e, t, n, r, l, o, i, a, s) {
  return e = new Wf(e, t, n, a, s), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Ee(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ni(o), e;
}
function Vf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: At, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function fc(e) {
  if (!e) return yt;
  e = e._reactInternals;
  e: {
    if (It(e) !== e || e.tag !== 1) throw Error(k(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ge(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(k(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ge(n)) return fu(e, n, t);
  }
  return t;
}
function pc(e, t, n, r, l, o, i, a, s) {
  return e = Ai(n, r, !0, e, l, o, i, a, s), e.context = fc(null), n = e.current, r = de(), l = mt(n), o = Xe(r, l), o.callback = t ?? null, pt(n, o, l), e.current.lanes = l, er(e, l, r), ye(e, r), e;
}
function wl(e, t, n, r) {
  var l = t.current, o = de(), i = mt(l);
  return n = fc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Xe(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = pt(l, t, i), e !== null && (De(e, l, i, o), Pr(e, l, i)), i;
}
function ol(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Za(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Bi(e, t) {
  Za(e, t), (e = e.alternate) && Za(e, t);
}
function Qf() {
  return null;
}
var hc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Hi(e) {
  this._internalRoot = e;
}
kl.prototype.render = Hi.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(k(409));
  wl(e, t, null, null);
};
kl.prototype.unmount = Hi.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Dt(function() {
      wl(null, e, null, null);
    }), t[Ze] = null;
  }
};
function kl(e) {
  this._internalRoot = e;
}
kl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Qs();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < rt.length && t !== 0 && t < rt[n].priority; n++) ;
    rt.splice(n, 0, e), n === 0 && Ys(e);
  }
};
function Wi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Sl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Ja() {
}
function Kf(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = ol(i);
        o.call(d);
      };
    }
    var i = pc(t, r, e, 0, null, !1, !1, "", Ja);
    return e._reactRootContainer = i, e[Ze] = i.current, Vn(e.nodeType === 8 ? e.parentNode : e), Dt(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var d = ol(s);
      a.call(d);
    };
  }
  var s = Ai(e, 0, !1, null, null, !1, !1, "", Ja);
  return e._reactRootContainer = s, e[Ze] = s.current, Vn(e.nodeType === 8 ? e.parentNode : e), Dt(function() {
    wl(t, s, n, r);
  }), s;
}
function Nl(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var s = ol(i);
        a.call(s);
      };
    }
    wl(t, i, e, l);
  } else i = Kf(n, t, e, l, r);
  return ol(i);
}
Ws = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = jn(t.pendingLanes);
        n !== 0 && (si(t, n | 1), ye(t, G()), !(D & 6) && (dn = G() + 500, St()));
      }
      break;
    case 13:
      Dt(function() {
        var r = Je(e, 1);
        if (r !== null) {
          var l = de();
          De(r, e, 1, l);
        }
      }), Bi(e, 1);
  }
};
ui = function(e) {
  if (e.tag === 13) {
    var t = Je(e, 134217728);
    if (t !== null) {
      var n = de();
      De(t, e, 134217728, n);
    }
    Bi(e, 134217728);
  }
};
Vs = function(e) {
  if (e.tag === 13) {
    var t = mt(e), n = Je(e, t);
    if (n !== null) {
      var r = de();
      De(n, e, t, r);
    }
    Bi(e, t);
  }
};
Qs = function() {
  return I;
};
Ks = function(e, t) {
  var n = I;
  try {
    return I = e, t();
  } finally {
    I = n;
  }
};
mo = function(e, t, n) {
  switch (t) {
    case "input":
      if (ao(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = pl(r);
            if (!l) throw Error(k(90));
            Ns(r), ao(r, l);
          }
        }
      }
      break;
    case "textarea":
      js(e, n);
      break;
    case "select":
      t = n.value, t != null && qt(e, !!n.multiple, t, !1);
  }
};
Ms = Di;
Rs = Dt;
var Yf = { usingClientEntryPoint: !1, Events: [nr, Qt, pl, Ts, Ls, Di] }, Sn = { findFiberByHostInstance: Et, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Xf = { bundleType: Sn.bundleType, version: Sn.version, rendererPackageName: Sn.rendererPackageName, rendererConfig: Sn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: be.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ds(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Sn.findFiberByHostInstance || Qf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Nr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Nr.isDisabled && Nr.supportsFiber) try {
    ul = Nr.inject(Xf), Be = Nr;
  } catch {
  }
}
Ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Yf;
Ne.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Wi(t)) throw Error(k(200));
  return Vf(e, t, null, n);
};
Ne.createRoot = function(e, t) {
  if (!Wi(e)) throw Error(k(299));
  var n = !1, r = "", l = hc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Ai(e, 1, !1, null, null, n, !1, r, l), e[Ze] = t.current, Vn(e.nodeType === 8 ? e.parentNode : e), new Hi(t);
};
Ne.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(k(188)) : (e = Object.keys(e).join(","), Error(k(268, e)));
  return e = Ds(t), e = e === null ? null : e.stateNode, e;
};
Ne.flushSync = function(e) {
  return Dt(e);
};
Ne.hydrate = function(e, t, n) {
  if (!Sl(t)) throw Error(k(200));
  return Nl(null, e, t, !0, n);
};
Ne.hydrateRoot = function(e, t, n) {
  if (!Wi(e)) throw Error(k(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = hc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = pc(t, null, e, 1, n ?? null, l, !1, o, i), e[Ze] = t.current, Vn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new kl(t);
};
Ne.render = function(e, t, n) {
  if (!Sl(t)) throw Error(k(200));
  return Nl(null, e, t, !1, n);
};
Ne.unmountComponentAtNode = function(e) {
  if (!Sl(e)) throw Error(k(40));
  return e._reactRootContainer ? (Dt(function() {
    Nl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ze] = null;
    });
  }), !0) : !1;
};
Ne.unstable_batchedUpdates = Di;
Ne.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Sl(n)) throw Error(k(200));
  if (e == null || e._reactInternals === void 0) throw Error(k(38));
  return Nl(e, t, n, !1, r);
};
Ne.version = "18.3.1-next-f1338f8080-20240426";
function mc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(mc);
    } catch (e) {
      console.error(e);
    }
}
mc(), ms.exports = Ne;
var Gf = ms.exports, vc, qa = Gf;
vc = qa.createRoot, qa.hydrateRoot;
const eo = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
], gc = { heat: "Heating", water: "Hot water" }, xt = (e) => String((e == null ? void 0 : e.message) ?? e);
function yc(e, t, n) {
  const [r, l] = P.useState(!1), [o, i] = P.useState(null);
  return { busy: r, result: o, send: async (s, d) => {
    l(!0);
    try {
      await e().callWS({ entry_id: t, channel: n, ...s }), i({ kind: "ok", text: d });
    } catch (v) {
      i({ kind: "error", text: xt(v) });
    } finally {
      l(!1);
    }
  } };
}
const at = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`;
function F({ name: e, className: t }) {
  return /* @__PURE__ */ u.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("ha-icon", { icon: `mdi:${e}` }) });
}
const Zf = [15, 30, 45, 60, 90, 120, 180, 240, 360];
function Jf({
  getHass: e,
  device: t,
  limits: n,
  status: r
}) {
  return /* @__PURE__ */ u.jsx("div", { className: "stack", children: t.channels.map((l) => /* @__PURE__ */ u.jsx(
    qf,
    {
      getHass: e,
      entryId: t.entry_id,
      channel: l,
      limits: n,
      info: r[l]
    },
    `${t.entry_id}-${l}`
  )) });
}
function qf({
  getHass: e,
  entryId: t,
  channel: n,
  limits: r,
  info: l
}) {
  const o = n === "water", i = (l == null ? void 0 : l.status) ?? null, { busy: a, result: s, send: d } = yc(e, t, n), [v, m] = P.useState(20), [h, x] = P.useState((l == null ? void 0 : l.boost_minutes) ?? 30), [S, _] = P.useState((l == null ? void 0 : l.boost_temperature) ?? 21);
  P.useEffect(() => {
    l && x(l.boost_minutes);
  }, [l == null ? void 0 : l.boost_minutes]), P.useEffect(() => {
    l && _(l.boost_temperature);
  }, [l == null ? void 0 : l.boost_temperature]), P.useEffect(() => {
    (i == null ? void 0 : i.mode) === "manual" && i.setpoint != null && i.setpoint >= r.boost_min_temp && m(i.setpoint);
  }, [i == null ? void 0 : i.mode, i == null ? void 0 : i.setpoint]);
  const T = (y) => d(
    { type: "hive_local/mode", mode: y, ...y === "manual" && !o ? { setpoint: v } : {} },
    y === "schedule" ? "Following the schedule" : y === "off" ? "Turned off" : o ? "Always on" : `Holding ${v}°`
  ), f = [
    { id: "schedule", label: "Schedule", icon: "calendar-clock", hint: "Follow the schedule on the receiver" },
    o ? { id: "manual", label: "Always on", icon: "water-boiler", hint: "Keep the hot water on" } : { id: "manual", label: "Manual", icon: "hand-back-right", hint: "Hold one temperature" },
    { id: "off", label: "Off", icon: "power", hint: o ? "No hot water" : "Frost protection only" }
  ], c = (i == null ? void 0 : i.mode) === "boost", p = (y) => Math.min(r.heat_max, Math.max(r.boost_min_temp, Math.round(y * 2) / 2)), g = [.../* @__PURE__ */ new Set([...Zf, h])].filter((y) => y <= r.boost_max_minutes).sort((y, j) => y - j);
  return /* @__PURE__ */ u.jsxs("section", { className: `card ${n}`, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ u.jsx(F, { name: o ? "water-boiler" : "radiator", className: "title-icon" }),
        /* @__PURE__ */ u.jsx("h2", { children: gc[n] })
      ] }),
      !i && /* @__PURE__ */ u.jsx("span", { className: "muted", children: "Waiting for the receiver…" })
    ] }),
    /* @__PURE__ */ u.jsx("h3", { children: "Mode" }),
    /* @__PURE__ */ u.jsx("div", { className: "mode-grid", children: f.map((y) => /* @__PURE__ */ u.jsxs(
      "button",
      {
        className: `mode-tile ${(i == null ? void 0 : i.mode) === y.id ? "on" : ""}`,
        disabled: a,
        onClick: () => T(y.id),
        children: [
          /* @__PURE__ */ u.jsx(F, { name: y.icon }),
          /* @__PURE__ */ u.jsx("span", { className: "mode-label", children: y.label }),
          /* @__PURE__ */ u.jsx("span", { className: "muted small", children: y.hint })
        ]
      },
      y.id
    )) }),
    !o && (i == null ? void 0 : i.mode) === "manual" && /* @__PURE__ */ u.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ u.jsx("span", { className: "muted", children: "Hold at" }),
      /* @__PURE__ */ u.jsx(Xo, { value: v, onChange: (y) => m(p(y)) }),
      i.setpoint !== v && /* @__PURE__ */ u.jsx("button", { className: "primary", disabled: a, onClick: () => T("manual"), children: "Apply" })
    ] }),
    /* @__PURE__ */ u.jsx("h3", { children: "Boost" }),
    c ? /* @__PURE__ */ u.jsxs("div", { className: "boost-live", children: [
      /* @__PURE__ */ u.jsx(F, { name: "rocket-launch", className: "boost-icon" }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsxs("div", { className: "boost-title", children: [
          "Boosting",
          !o && (i == null ? void 0 : i.setpoint) != null ? ` to ${i.setpoint}°` : ""
        ] }),
        /* @__PURE__ */ u.jsx("div", { className: "muted", children: (i == null ? void 0 : i.boost_remaining) != null ? `${at(i.boost_remaining)} left` : "Time left unknown" })
      ] }),
      /* @__PURE__ */ u.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ u.jsx("button", { disabled: a, onClick: () => d({ type: "hive_local/cancel_boost" }, "Boost cancelled"), children: "Cancel boost" })
    ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("div", { className: "chips", role: "radiogroup", "aria-label": "Boost duration", children: g.map((y) => /* @__PURE__ */ u.jsx("button", { role: "radio", "aria-checked": y === h, className: `chip-btn ${y === h ? "on" : ""}`, onClick: () => x(y), children: at(y) }, y)) }),
      /* @__PURE__ */ u.jsxs("div", { className: "inline-row", children: [
        !o && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx("span", { className: "muted", children: "Temperature" }),
          /* @__PURE__ */ u.jsx(Xo, { value: S, onChange: (y) => _(p(y)) })
        ] }),
        /* @__PURE__ */ u.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ u.jsxs(
          "button",
          {
            className: "primary",
            disabled: a,
            onClick: () => d(
              { type: "hive_local/boost", minutes: h, ...o ? {} : { temperature: S } },
              `Boosting for ${at(h)}`
            ),
            children: [
              /* @__PURE__ */ u.jsx(F, { name: "rocket-launch" }),
              " Boost ",
              at(h)
            ]
          }
        )
      ] })
    ] }),
    s && /* @__PURE__ */ u.jsx("div", { className: `status ${s.kind}`, children: s.text })
  ] });
}
function Xo({ value: e, onChange: t }) {
  return /* @__PURE__ */ u.jsxs("div", { className: "stepper", children: [
    /* @__PURE__ */ u.jsx("button", { className: "round", onClick: () => t(e - 0.5), "aria-label": "Lower", children: /* @__PURE__ */ u.jsx(F, { name: "minus" }) }),
    /* @__PURE__ */ u.jsxs("span", { className: "stepper-value", children: [
      e.toFixed(1),
      "°"
    ] }),
    /* @__PURE__ */ u.jsx("button", { className: "round", onClick: () => t(e + 0.5), "aria-label": "Raise", children: /* @__PURE__ */ u.jsx(F, { name: "plus" }) })
  ] });
}
const bf = '<defs><linearGradient id="hl-mark-g" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#FFB547"/><stop offset="1" stop-color="#FF5A1F"/></linearGradient></defs><polygon points="256,62 452,222 452,446 60,446 60,222" fill="url(#hl-mark-g)" stroke="url(#hl-mark-g)" stroke-width="56" stroke-linejoin="round"/><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" fill="#fff" transform="translate(256 292) scale(10) translate(-12 -12)"/>';
function ba({ size: e = 28 }) {
  return /* @__PURE__ */ u.jsx(
    "svg",
    {
      className: "logo-mark",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      "aria-hidden": "true",
      dangerouslySetInnerHTML: { __html: bf }
    }
  );
}
const es = 5, ep = 30, tp = 135, xc = 270, il = 80, ts = (e) => Math.min(1, Math.max(0, (e - es) / (ep - es)));
function Go(e) {
  const t = (tp + xc * e) * Math.PI / 180;
  return { x: 100 + il * Math.cos(t), y: 100 + il * Math.sin(t) };
}
function ns(e, t) {
  const n = Go(e), r = Go(t), l = xc * (t - e) > 180 ? 1 : 0;
  return `M ${n.x} ${n.y} A ${il} ${il} 0 ${l} 1 ${r.x} ${r.y}`;
}
function np({
  current: e,
  target: t,
  state: n,
  caption: r
}) {
  const l = e != null ? Go(ts(e)) : null;
  return /* @__PURE__ */ u.jsxs("div", { className: `dial ${n}`, children: [
    /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 200 200", role: "img", "aria-label": r, children: [
      /* @__PURE__ */ u.jsx("path", { className: "track", d: ns(0, 1) }),
      t != null && n !== "off" && /* @__PURE__ */ u.jsx("path", { className: "value", d: ns(0, Math.max(5e-3, ts(t))) }),
      l && /* @__PURE__ */ u.jsx("circle", { className: "dot", cx: l.x, cy: l.y, r: "7" })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "dial-center", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "dial-temp", children: [
        e != null ? e.toFixed(1) : "–",
        /* @__PURE__ */ u.jsx("span", { className: "unit", children: "°C" })
      ] }),
      /* @__PURE__ */ u.jsx("div", { className: "dial-caption", children: r })
    ] })
  ] });
}
function rp({
  getHass: e,
  devices: t,
  status: n,
  onOpen: r
}) {
  return /* @__PURE__ */ u.jsx("div", { className: "grid", children: t.flatMap(
    (l) => l.channels.map((o) => {
      var i;
      return /* @__PURE__ */ u.jsx(
        op,
        {
          getHass: e,
          device: l,
          channel: o,
          info: (i = n[l.entry_id]) == null ? void 0 : i[o],
          showDevice: t.length > 1,
          onOpen: () => r(l.entry_id)
        },
        `${l.entry_id}-${o}`
      );
    })
  ) });
}
const lp = {
  schedule: "calendar-clock",
  manual: "hand-back-right",
  off: "power",
  boost: "rocket-launch"
};
function op({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  showDevice: l,
  onOpen: o
}) {
  var c;
  const i = n === "water", a = (r == null ? void 0 : r.status) ?? null, { busy: s, result: d, send: v } = yc(e, t.entry_id, n), m = !!a && a.mode !== "off" && a.heating, h = !a || a.mode === "off" ? "off" : m ? "heating" : "idle", x = !i && (a == null ? void 0 : a.setpoint) != null && a.setpoint <= 1, S = i || (a == null ? void 0 : a.setpoint) == null ? null : x ? (r == null ? void 0 : r.frost_temperature) ?? null : a.setpoint, _ = [
    { id: "schedule", label: "Schedule" },
    { id: "manual", label: i ? "Always on" : "Manual" },
    { id: "off", label: "Off" }
  ], T = (r == null ? void 0 : r.boost_minutes) ?? 30;
  let f = "Waiting for the receiver…";
  return a && (a.mode === "off" ? f = "Off" : i ? f = m ? "Heating water" : "Not heating" : f = `${m ? "Heating" : "Idle"}${S != null ? ` · ${x ? "frost" : "target"} ${S}°` : ""}`), /* @__PURE__ */ u.jsxs("section", { className: `card channel ${n} ${h}`, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ u.jsx(F, { name: i ? "water-boiler" : "radiator", className: "title-icon" }),
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("h2", { children: gc[n] }),
          l && /* @__PURE__ */ u.jsx("div", { className: "muted small", children: t.name })
        ] })
      ] }),
      a && /* @__PURE__ */ u.jsxs("span", { className: `chip mode-${a.mode}`, children: [
        /* @__PURE__ */ u.jsx(F, { name: lp[a.mode] }),
        a.mode === "boost" ? a.boost_remaining != null ? `Boost · ${at(a.boost_remaining)} left` : "Boost" : (c = _.find((p) => p.id === a.mode)) == null ? void 0 : c.label
      ] })
    ] }),
    i ? /* @__PURE__ */ u.jsxs("div", { className: `water-state ${h}`, children: [
      /* @__PURE__ */ u.jsx("div", { className: "water-orb", children: /* @__PURE__ */ u.jsx(F, { name: h === "off" ? "water-boiler-off" : "water-boiler" }) }),
      /* @__PURE__ */ u.jsx("div", { className: "dial-caption", children: f })
    ] }) : /* @__PURE__ */ u.jsx(np, { current: (a == null ? void 0 : a.current_temperature) ?? null, target: S, state: h, caption: f }),
    /* @__PURE__ */ u.jsx("div", { className: "segmented full", children: _.map((p) => /* @__PURE__ */ u.jsx(
      "button",
      {
        className: (a == null ? void 0 : a.mode) === p.id ? "on" : "",
        disabled: s || !a,
        onClick: () => v({ type: "hive_local/mode", mode: p.id }, p.id === "schedule" ? "Following the schedule" : p.label),
        children: p.label
      },
      p.id
    )) }),
    /* @__PURE__ */ u.jsxs("div", { className: "card-actions", children: [
      (a == null ? void 0 : a.mode) === "boost" ? /* @__PURE__ */ u.jsxs("button", { className: "boost-btn cancel", disabled: s, onClick: () => v({ type: "hive_local/cancel_boost" }, "Boost cancelled"), children: [
        /* @__PURE__ */ u.jsx(F, { name: "close" }),
        " Cancel boost"
      ] }) : /* @__PURE__ */ u.jsxs(
        "button",
        {
          className: "boost-btn",
          disabled: s || !a,
          onClick: () => v({ type: "hive_local/boost" }, `Boosting for ${at(T)}`),
          children: [
            /* @__PURE__ */ u.jsx(F, { name: "rocket-launch" }),
            " Boost ",
            at(T),
            !i && r ? ` · ${r.boost_temperature}°` : ""
          ]
        }
      ),
      /* @__PURE__ */ u.jsxs("button", { className: "ghost", onClick: o, children: [
        "More ",
        /* @__PURE__ */ u.jsx(F, { name: "chevron-right" })
      ] })
    ] }),
    (d == null ? void 0 : d.kind) === "error" && /* @__PURE__ */ u.jsx("div", { className: "status error", children: d.text })
  ] });
}
const ip = {
  heat: { schedule: "Schedule", manual: "Manual", off: "Off", boost: "Boost" },
  water: { schedule: "Schedule", manual: "Always on", off: "Off", boost: "Boost" }
};
function ap(e, t) {
  if (!t) return "Waiting for the receiver…";
  const n = t.mode === "boost" && t.boost_remaining != null ? `Boost · ${at(t.boost_remaining)} left` : ip[e][t.mode] ?? t.mode;
  return e === "water" ? `${n} · ${t.heating ? "heating water" : "idle"}` : `${t.current_temperature == null ? "–" : `${t.current_temperature.toFixed(1)}°`} · ${n}${t.heating ? " · heating" : ""}`;
}
function sp({ devices: e, status: t, channel: n, onOpen: r }) {
  return /* @__PURE__ */ u.jsx("div", { className: "grid", children: e.map((l) => {
    var i, a;
    const o = (a = (i = t[l.entry_id]) == null ? void 0 : i[n]) == null ? void 0 : a.status;
    return /* @__PURE__ */ u.jsxs("button", { className: `card receiver-card ${n}`, onClick: () => r(l.entry_id), children: [
      /* @__PURE__ */ u.jsx(F, { name: n === "water" ? "water-boiler" : "radiator", className: "title-icon" }),
      /* @__PURE__ */ u.jsxs("span", { className: "receiver-text", children: [
        /* @__PURE__ */ u.jsx("span", { className: "receiver-name", children: l.name }),
        /* @__PURE__ */ u.jsx("span", { className: "muted small", children: ap(n, o) })
      ] }),
      (o == null ? void 0 : o.heating) && /* @__PURE__ */ u.jsx("span", { className: "dot-heating", "aria-label": "Heating" }),
      /* @__PURE__ */ u.jsx(F, { name: "chevron-right" })
    ] }, l.entry_id);
  }) });
}
const up = 20, al = (e) => e == null ? "–" : `${e.toFixed(1)}°`;
function cp({ getHass: e }) {
  const [t, n] = P.useState(null), [r, l] = P.useState([]), [o, i] = P.useState(null), [a, s] = P.useState("");
  return P.useEffect(() => {
    const d = e().connection.subscribeMessage(
      (v) => {
        n(v.rooms), l(v.receivers);
      },
      { type: "hive_local/rooms/subscribe" }
    );
    return d.catch((v) => s(xt(v))), () => {
      d.then((v) => v()).catch(() => {
      });
    };
  }, [e]), a ? /* @__PURE__ */ u.jsx("div", { className: "status error", children: a }) : t ? /* @__PURE__ */ u.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "rooms-head", children: [
      /* @__PURE__ */ u.jsx("p", { className: "muted", children: "Group your Hive radiator valves into rooms, on ZHA or Zigbee2MQTT. Add a temperature sensor to a room for a better reading than the valves' own." }),
      o !== "new" && /* @__PURE__ */ u.jsxs("button", { className: "primary", onClick: () => i("new"), children: [
        /* @__PURE__ */ u.jsx(F, { name: "plus" }),
        " Add room"
      ] })
    ] }),
    o === "new" && /* @__PURE__ */ u.jsx(rs, { getHass: e, onDone: () => i(null) }),
    !t.length && o !== "new" && /* @__PURE__ */ u.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ u.jsx(F, { name: "home-thermometer-outline" }),
      /* @__PURE__ */ u.jsx("p", { children: "No rooms yet. Add a room and pick its Hive radiator valves." })
    ] }),
    dp(t, r).map(([d, v]) => /* @__PURE__ */ u.jsxs("section", { className: "zone", children: [
      d && /* @__PURE__ */ u.jsx("h3", { children: d }),
      /* @__PURE__ */ u.jsx("div", { className: "grid", children: v.map(
        (m) => o !== "new" && (o == null ? void 0 : o.id) === m.id ? /* @__PURE__ */ u.jsx(rs, { getHass: e, room: m, onDone: () => i(null) }, m.id) : /* @__PURE__ */ u.jsx(fp, { getHass: e, room: m, onEdit: () => i(m) }, m.id)
      ) })
    ] }, d ?? "all"))
  ] }) : null;
}
function dp(e, t) {
  if (t.length <= 1) return e.length ? [[null, e]] : [];
  const n = t.map((l) => [`Heated by ${l.name}`, e.filter((o) => o.receiver === l.entry_id)]).filter(([, l]) => l.length), r = e.filter((l) => !t.some((o) => o.entry_id === l.receiver));
  return r.length && n.push(["Receiver not set", r]), n;
}
function fp({ getHass: e, room: t, onEdit: n }) {
  var m;
  const [r, l] = P.useState(null), [o, i] = P.useState(null), a = P.useRef(), s = r ?? t.target ?? ((m = t.target_range) == null ? void 0 : m[1]) ?? 20, d = (h) => {
    const x = Math.min(35, Math.max(5, h));
    l(x), i(null), window.clearTimeout(a.current), a.current = window.setTimeout(async () => {
      try {
        const S = await e().callWS({
          type: "hive_local/rooms/set_target",
          room_id: t.id,
          temperature: x
        });
        if (S.failed.length) {
          const _ = t.valve_states.filter((T) => S.failed.includes(T.entity_id)).map((T) => T.name);
          i({ kind: "error", text: `Didn't take on ${_.join(", ")}. It may be asleep; try again shortly.` });
        }
      } catch (S) {
        i({ kind: "error", text: xt(S) });
      } finally {
        l(null);
      }
    }, 700);
  }, v = t.temperature_source === "sensor" ? t.sensor_name : t.temperature_source === "valves" ? t.valve_states.filter((h) => h.available).length === 1 ? "From the valve" : "Average of the valves" : "No reading";
  return /* @__PURE__ */ u.jsxs("section", { className: `card room ${t.heating ? "heating" : ""}`, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ u.jsx(F, { name: "home-thermometer-outline", className: "title-icon" }),
        /* @__PURE__ */ u.jsx("h2", { children: t.name })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "chips", children: [
        t.heating ? /* @__PURE__ */ u.jsxs("span", { className: "chip heating", children: [
          /* @__PURE__ */ u.jsx(F, { name: "fire" }),
          " Heating"
        ] }) : /* @__PURE__ */ u.jsx("span", { className: "chip", children: "Idle" }),
        /* @__PURE__ */ u.jsx("button", { className: "ghost round", onClick: n, "aria-label": `Edit ${t.name}`, children: /* @__PURE__ */ u.jsx(F, { name: "pencil-outline" }) })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "room-now", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsxs("div", { className: "room-temp", children: [
          t.current_temperature == null ? "–" : t.current_temperature.toFixed(1),
          /* @__PURE__ */ u.jsx("span", { className: "unit", children: "°C" })
        ] }),
        /* @__PURE__ */ u.jsx("div", { className: "muted small", children: v })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "room-target", children: [
        /* @__PURE__ */ u.jsx("span", { className: "muted small", children: t.target_range && r == null ? `Valves set to ${al(t.target_range[0])}–${al(t.target_range[1])}` : "Target" }),
        /* @__PURE__ */ u.jsx(Xo, { value: s, onChange: d })
      ] })
    ] }),
    /* @__PURE__ */ u.jsx("ul", { className: "valves", children: t.valve_states.map((h) => /* @__PURE__ */ u.jsx(pp, { valve: h, heating: t.heating_valves.includes(h.entity_id) }, h.entity_id)) }),
    o && /* @__PURE__ */ u.jsx("div", { className: `status ${o.kind}`, children: o.text })
  ] });
}
function pp({ valve: e, heating: t }) {
  const n = e.battery == null ? null : Number(e.battery), r = n != null && !Number.isNaN(n) && n <= up;
  return /* @__PURE__ */ u.jsxs("li", { className: `valve ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ u.jsx(F, { name: t ? "fire" : "radiator", className: t ? "valve-icon heating" : "valve-icon" }),
    /* @__PURE__ */ u.jsx("span", { className: "valve-name", children: e.name }),
    e.available ? /* @__PURE__ */ u.jsxs("span", { className: "valve-temps", children: [
      al(e.current_temperature),
      " ",
      /* @__PURE__ */ u.jsxs("span", { className: "muted", children: [
        "→ ",
        al(e.target)
      ] })
    ] }) : /* @__PURE__ */ u.jsx("span", { className: "chip", children: "Unavailable" }),
    n != null && !Number.isNaN(n) && /* @__PURE__ */ u.jsxs("span", { className: `battery ${r ? "low" : ""}`, title: r ? "Battery low" : "Battery", children: [
      /* @__PURE__ */ u.jsx(F, { name: r ? "battery-alert-variant-outline" : "battery-outline" }),
      " ",
      Math.round(n),
      "%"
    ] })
  ] });
}
function rs({ getHass: e, room: t, onDone: n }) {
  const [r, l] = P.useState(null), [o, i] = P.useState((t == null ? void 0 : t.receiver) ?? ""), [a, s] = P.useState((t == null ? void 0 : t.name) ?? ""), [d, v] = P.useState(new Set((t == null ? void 0 : t.valves) ?? [])), [m, h] = P.useState((t == null ? void 0 : t.sensor) ?? ""), [x, S] = P.useState(!1), [_, T] = P.useState(!1), [f, c] = P.useState("");
  P.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/candidates" }).then(l).catch((w) => c(xt(w)));
  }, [e]);
  const p = ((r == null ? void 0 : r.receivers.length) ?? 0) > 1, g = async (w) => {
    S(!0), c("");
    try {
      await e().callWS(w), n();
    } catch (z) {
      c(xt(z)), S(!1);
    }
  }, y = (w) => v((z) => {
    const O = new Set(z);
    return O.has(w) ? O.delete(w) : O.add(w), O;
  }), j = /* @__PURE__ */ new Map();
  for (const w of (r == null ? void 0 : r.valves) ?? []) j.set(w.area ?? "No area", [...j.get(w.area ?? "No area") ?? [], w]);
  return /* @__PURE__ */ u.jsxs("section", { className: "card room-editor", children: [
    /* @__PURE__ */ u.jsx("h2", { children: t ? `Edit ${t.name}` : "New room" }),
    /* @__PURE__ */ u.jsxs(
      "form",
      {
        className: "stack",
        onSubmit: (w) => {
          w.preventDefault(), g({
            type: "hive_local/rooms/save",
            ...t ? { room_id: t.id } : {},
            name: a,
            valves: [...d],
            sensor: m || null,
            receiver: o || null
          });
        },
        children: [
          /* @__PURE__ */ u.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ u.jsx("span", { children: "Name" }),
            /* @__PURE__ */ u.jsx("input", { id: `room-name-${(t == null ? void 0 : t.id) ?? "new"}`, type: "text", value: a, maxLength: 40, placeholder: "Lounge", onChange: (w) => s(w.target.value) })
          ] }),
          /* @__PURE__ */ u.jsxs("fieldset", { className: "field", children: [
            /* @__PURE__ */ u.jsx("legend", { children: "Hive radiator valves" }),
            !r && !f && /* @__PURE__ */ u.jsx("span", { className: "muted small", children: "Loading…" }),
            r && !r.valves.length && /* @__PURE__ */ u.jsx("span", { className: "muted small", children: "No Hive radiator valves found. Pair them with ZHA or Zigbee2MQTT first." }),
            [...j].map(([w, z]) => /* @__PURE__ */ u.jsxs("div", { className: "checklist", children: [
              /* @__PURE__ */ u.jsx("span", { className: "muted small", children: w }),
              z.map((O) => /* @__PURE__ */ u.jsxs("label", { className: "pick", children: [
                /* @__PURE__ */ u.jsx("input", { type: "checkbox", checked: d.has(O.entity_id), onChange: () => y(O.entity_id) }),
                " ",
                O.name
              ] }, O.entity_id))
            ] }, w))
          ] }),
          /* @__PURE__ */ u.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ u.jsx("span", { children: "Room temperature from" }),
            /* @__PURE__ */ u.jsxs("select", { id: `room-sensor-${(t == null ? void 0 : t.id) ?? "new"}`, value: m, onChange: (w) => h(w.target.value), children: [
              /* @__PURE__ */ u.jsx("option", { value: "", children: "The valves (their average)" }),
              ((r == null ? void 0 : r.sensors) ?? []).map((w) => /* @__PURE__ */ u.jsxs("option", { value: w.entity_id, children: [
                w.name,
                w.area ? ` · ${w.area}` : ""
              ] }, w.entity_id))
            ] })
          ] }),
          p && /* @__PURE__ */ u.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ u.jsx("span", { children: "Heated by" }),
            /* @__PURE__ */ u.jsxs("select", { id: `room-receiver-${(t == null ? void 0 : t.id) ?? "new"}`, value: o, onChange: (w) => i(w.target.value), children: [
              /* @__PURE__ */ u.jsx("option", { value: "", disabled: !0, children: "Choose the receiver for this room's radiators" }),
              r.receivers.map((w) => /* @__PURE__ */ u.jsx("option", { value: w.entry_id, children: w.name }, w.entry_id))
            ] })
          ] }),
          f && /* @__PURE__ */ u.jsx("div", { className: "status error", children: f }),
          /* @__PURE__ */ u.jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ u.jsx("button", { className: "primary", type: "submit", disabled: x || !a.trim() || !d.size || p && !o, children: t ? "Save" : "Add room" }),
            /* @__PURE__ */ u.jsx("button", { type: "button", className: "ghost", onClick: n, disabled: x, children: "Cancel" }),
            /* @__PURE__ */ u.jsx("span", { className: "spacer" }),
            t && (_ ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
              /* @__PURE__ */ u.jsxs("span", { className: "muted small", children: [
                "Delete ",
                t.name,
                "? The valves aren't changed."
              ] }),
              /* @__PURE__ */ u.jsx("button", { type: "button", className: "danger", disabled: x, onClick: () => g({ type: "hive_local/rooms/delete", room_id: t.id }), children: "Delete" }),
              /* @__PURE__ */ u.jsx("button", { type: "button", className: "ghost", onClick: () => T(!1), children: "Keep" })
            ] }) : /* @__PURE__ */ u.jsxs("button", { type: "button", className: "danger", onClick: () => T(!0), disabled: x, children: [
              /* @__PURE__ */ u.jsx(F, { name: "delete-outline" }),
              " Delete room"
            ] }))
          ] })
        ]
      }
    )
  ] });
}
const hp = ["monday", "tuesday", "wednesday", "thursday", "friday"], mp = ["saturday", "sunday"], vp = (e) => e[0].toUpperCase() + e.slice(1, 3), st = (e) => {
  const [t, n] = e.split(":").map(Number);
  return t * 60 + n;
};
function gp({
  getHass: e,
  device: t,
  channel: n,
  limits: r
}) {
  const [l, o] = P.useState({}), [i, a] = P.useState({}), [s, d] = P.useState("monday"), [v, m] = P.useState({ kind: "idle" }), h = t.entry_id, x = n === "water", S = JSON.stringify(l) !== JSON.stringify(i), _ = P.useCallback(async () => {
    m({ kind: "busy", text: "Reading from receiver…" });
    try {
      const N = await e().callWS({
        type: "hive_local/get",
        entry_id: h,
        channel: n
      });
      o(N.schedule), a(N.schedule);
      const $ = Object.keys(N.schedule).length;
      m(
        N.complete ? { kind: "ok", text: "Schedule read from receiver" } : $ ? { kind: "error", text: `Only got ${$}/7 days — try reading again` } : { kind: "error", text: "No reply. On Zigbee2MQTT, check the receiver's friendly name; on ZHA, check the receiver is online." }
      );
    } catch (N) {
      m({ kind: "error", text: xt(N) });
    }
  }, [h, n, e]);
  P.useEffect(() => {
    _();
  }, [_]);
  const T = async () => {
    m({ kind: "busy", text: "Writing to receiver…" });
    try {
      const N = await e().callWS({
        type: "hive_local/set",
        entry_id: h,
        channel: n,
        schedule: l
      });
      o(N.schedule), a(N.schedule), m({
        kind: "ok",
        text: `Sent ${N.commands} command${N.commands === 1 ? "" : "s"}. Read back to confirm the receiver kept it.`
      });
    } catch (N) {
      m({ kind: "error", text: xt(N) });
    }
  }, f = l[s] ?? [], c = r.max_transitions, p = (N) => o(($) => ({ ...$, [s]: [...N].sort((W, J) => st(W.time) - st(J.time)) })), g = () => {
    const N = f[f.length - 1], $ = N ? yp(f, st(N.time) + 60) : "06:00", W = x ? r.water_on : (N == null ? void 0 : N.setpoint) ?? 20;
    p([...f, { time: $, setpoint: W }]);
  }, y = (N) => o(($) => {
    const W = { ...$ };
    for (const J of N) W[J] = f.map((We) => ({ ...We }));
    return W;
  }), j = P.useMemo(() => {
    const N = Object.values(l).flat().map(($) => $.setpoint).filter(($) => $ > r.heat_min);
    return { lo: Math.min(15, ...N), hi: Math.max(24, ...N) };
  }, [l, r.heat_min]), w = eo[((/* @__PURE__ */ new Date()).getDay() + 6) % 7], z = xp();
  return /* @__PURE__ */ u.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ u.jsxs("section", { className: `card ${n}`, children: [
      /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "title", children: [
          /* @__PURE__ */ u.jsx(F, { name: x ? "water-boiler" : "radiator", className: "title-icon" }),
          /* @__PURE__ */ u.jsxs("div", { children: [
            /* @__PURE__ */ u.jsx("h2", { children: x ? "Hot water schedule" : "Heating schedule" }),
            /* @__PURE__ */ u.jsx("div", { className: "muted small", children: "Stored on the receiver, so it keeps running without HA." })
          ] })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: "toolbar", children: [
          S && /* @__PURE__ */ u.jsx("span", { className: "chip unsaved", children: "Unsaved changes" }),
          /* @__PURE__ */ u.jsxs("button", { onClick: _, disabled: v.kind === "busy", children: [
            /* @__PURE__ */ u.jsx(F, { name: "download" }),
            " Read"
          ] }),
          /* @__PURE__ */ u.jsxs("button", { className: "primary", onClick: T, disabled: !S || v.kind === "busy", children: [
            /* @__PURE__ */ u.jsx(F, { name: "upload" }),
            " Write to receiver"
          ] })
        ] })
      ] }),
      v.text && /* @__PURE__ */ u.jsx("div", { className: `status ${v.kind}`, children: v.text }),
      /* @__PURE__ */ u.jsxs("div", { className: "week", children: [
        eo.map((N) => /* @__PURE__ */ u.jsxs("button", { className: `row ${N === s ? "selected" : ""}`, onClick: () => d(N), children: [
          /* @__PURE__ */ u.jsx("span", { className: `day ${N === w ? "today" : ""}`, children: vp(N) }),
          /* @__PURE__ */ u.jsx(
            wp,
            {
              transitions: l[N],
              isWater: x,
              limits: r,
              range: j,
              now: N === w ? z : null
            }
          )
        ] }, N)),
        /* @__PURE__ */ u.jsxs("div", { className: "row hours-row", children: [
          /* @__PURE__ */ u.jsx("span", { className: "day" }),
          /* @__PURE__ */ u.jsx("div", { className: "hours", children: [0, 3, 6, 9, 12, 15, 18, 21, 24].map((N) => /* @__PURE__ */ u.jsx("span", { style: { left: `${N / 24 * 100}%` }, children: String(N).padStart(2, "0") }, N)) })
        ] })
      ] }),
      !x && /* @__PURE__ */ u.jsxs("div", { className: "legend", children: [
        /* @__PURE__ */ u.jsx("span", { className: "muted small", children: "Cooler" }),
        /* @__PURE__ */ u.jsx("span", { className: "legend-bar" }),
        /* @__PURE__ */ u.jsx("span", { className: "muted small", children: "Warmer" }),
        /* @__PURE__ */ u.jsx("span", { className: "legend-off" }),
        /* @__PURE__ */ u.jsx("span", { className: "muted small", children: "Off (1°)" })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("section", { className: "card", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ u.jsx("h2", { children: s[0].toUpperCase() + s.slice(1) }),
        /* @__PURE__ */ u.jsxs("span", { className: "chip", children: [
          f.length,
          "/",
          c,
          " events"
        ] })
      ] }),
      f.length === 0 && /* @__PURE__ */ u.jsx("p", { className: "muted", children: "No events for this day yet." }),
      /* @__PURE__ */ u.jsx("div", { className: "events", children: f.map((N, $) => /* @__PURE__ */ u.jsxs("div", { className: "transition", children: [
        /* @__PURE__ */ u.jsx(
          "span",
          {
            className: "swatch",
            style: { background: x ? N.setpoint >= r.water_on ? "var(--hl-water)" : "var(--hl-off-fill)" : wc(N.setpoint, j, r) }
          }
        ),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            type: "time",
            value: N.time,
            onChange: (W) => p(f.map((J, We) => We === $ ? { ...J, time: W.target.value } : J))
          }
        ),
        x ? /* @__PURE__ */ u.jsxs("div", { className: "segmented", children: [
          ["on", "off"].map((W) => {
            const J = W === "on" ? r.water_on : r.water_off;
            return /* @__PURE__ */ u.jsx(
              "button",
              {
                className: N.setpoint === J ? "on" : "",
                onClick: () => p(f.map((We, _l) => _l === $ ? { ...We, setpoint: J } : We)),
                children: W === "on" ? "On" : "Off"
              },
              W
            );
          }),
          N.setpoint !== r.water_on && N.setpoint !== r.water_off && /* @__PURE__ */ u.jsxs("span", { className: "muted raw", title: "Value read from the receiver doesn't match WATER_ON/WATER_OFF in const.py", children: [
            N.setpoint,
            "°?"
          ] })
        ] }) : /* @__PURE__ */ u.jsxs("div", { className: "stepper", children: [
          /* @__PURE__ */ u.jsx("button", { className: "round", onClick: () => O($, -0.5), "aria-label": "Lower", children: /* @__PURE__ */ u.jsx(F, { name: "minus" }) }),
          /* @__PURE__ */ u.jsx("span", { className: "stepper-value", children: N.setpoint <= r.heat_min ? "Off" : `${N.setpoint.toFixed(1)}°` }),
          /* @__PURE__ */ u.jsx("button", { className: "round", onClick: () => O($, 0.5), "aria-label": "Raise", children: /* @__PURE__ */ u.jsx(F, { name: "plus" }) })
        ] }),
        /* @__PURE__ */ u.jsx("button", { className: "round danger", onClick: () => p(f.filter((W, J) => J !== $)), "aria-label": "Remove", children: /* @__PURE__ */ u.jsx(F, { name: "delete-outline" }) })
      ] }, $)) }),
      /* @__PURE__ */ u.jsxs("div", { className: "actions", children: [
        /* @__PURE__ */ u.jsxs("button", { onClick: g, disabled: f.length >= c, children: [
          /* @__PURE__ */ u.jsx(F, { name: "plus" }),
          " Add event"
        ] }),
        /* @__PURE__ */ u.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ u.jsx("span", { className: "muted small", children: "Copy this day to" }),
        /* @__PURE__ */ u.jsxs("div", { className: "segmented", children: [
          /* @__PURE__ */ u.jsx("button", { onClick: () => y(hp), disabled: !f.length, children: "Weekdays" }),
          /* @__PURE__ */ u.jsx("button", { onClick: () => y(mp), disabled: !f.length, children: "Weekend" }),
          /* @__PURE__ */ u.jsx("button", { onClick: () => y([...eo]), disabled: !f.length, children: "All" })
        ] })
      ] })
    ] })
  ] });
  function O(N, $) {
    p(
      f.map(
        (W, J) => J === N ? { ...W, setpoint: Math.min(r.heat_max, Math.max(r.heat_min, Math.round((W.setpoint + $) * 2) / 2)) } : W
      )
    );
  }
}
function yp(e, t) {
  const n = new Set(e.map((l) => st(l.time)));
  let r = Math.min(t, 23 * 60 + 30);
  for (; n.has(r) && r < 1439; ) r += 15;
  return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function xp() {
  const e = () => {
    const r = /* @__PURE__ */ new Date();
    return r.getHours() * 60 + r.getMinutes();
  }, [t, n] = P.useState(e);
  return P.useEffect(() => {
    const r = setInterval(() => n(e()), 6e4);
    return () => clearInterval(r);
  }, []), t;
}
function wc(e, t, n) {
  if (e <= n.heat_min) return "var(--hl-off-fill)";
  const r = Math.min(1, Math.max(0, (e - t.lo) / Math.max(1, t.hi - t.lo)));
  return `hsl(${Math.round(42 - 34 * r)} ${Math.round(88 + 4 * r)}% ${Math.round(64 - 14 * r)}%)`;
}
function wp({
  transitions: e,
  isWater: t,
  limits: n,
  range: r,
  now: l
}) {
  const o = l != null && /* @__PURE__ */ u.jsx("i", { className: "now", style: { left: `${l / 1440 * 100}%` } });
  if (!(e != null && e.length)) return /* @__PURE__ */ u.jsx("div", { className: "timeline empty", children: o });
  const i = [...e].sort((s, d) => st(s.time) - st(d.time)), a = [{ time: "00:00", setpoint: i[i.length - 1].setpoint }, ...i];
  return /* @__PURE__ */ u.jsxs("div", { className: "timeline", children: [
    a.map((s, d) => {
      const v = st(s.time), m = d + 1 < a.length ? st(a[d + 1].time) : 1440;
      if (m <= v) return null;
      const h = t ? s.setpoint < n.water_on : s.setpoint <= n.heat_min;
      return /* @__PURE__ */ u.jsx(
        "span",
        {
          className: h ? "off" : "",
          title: `${s.time} → ${t ? h ? "Off" : "On" : h ? "Off" : `${s.setpoint}°`}`,
          style: {
            left: `${v / 1440 * 100}%`,
            width: `${(m - v) / 1440 * 100}%`,
            background: h ? void 0 : t ? "var(--hl-water)" : wc(s.setpoint, r, n)
          },
          children: !t && !h && m - v >= 120 ? `${s.setpoint}°` : ""
        },
        d
      );
    }),
    o
  ] });
}
const kp = [
  { id: "overview", label: "Overview", icon: "view-dashboard-outline" },
  { id: "rooms", label: "Rooms", icon: "home-thermometer-outline" },
  { id: "heat", label: "Heating", icon: "radiator" },
  { id: "water", label: "Hot water", icon: "water-boiler" },
  { id: "controls", label: "Boost & mode", icon: "tune-variant" }
];
function Sp({ getHass: e, narrow: t, onToggleMenu: n }) {
  const [r, l] = P.useState([]), [o, i] = P.useState(null), [a, s] = P.useState({}), [d, v] = P.useState("overview"), [m, h] = P.useState(null), [x, S] = P.useState("");
  P.useEffect(() => {
    e().callWS({ type: "hive_local/devices" }).then((p) => {
      l(p.devices), i(p.limits);
    }).catch((p) => S(xt(p)));
    const c = e().connection.subscribeMessage(
      (p) => s(p.status),
      { type: "hive_local/subscribe" }
    );
    return () => {
      c.then((p) => p()).catch(() => {
      });
    };
  }, [e]);
  const _ = (c, p, g) => {
    if (c.length <= 1)
      return c.map((j) => /* @__PURE__ */ u.jsxs("section", { className: "receiver-section", children: [
        r.length > 1 && /* @__PURE__ */ u.jsx("div", { className: "receiver-crumb", children: /* @__PURE__ */ u.jsx("h2", { children: j.name }) }),
        g(j)
      ] }, j.entry_id));
    const y = c.find((j) => j.entry_id === m);
    return y ? /* @__PURE__ */ u.jsxs("section", { className: "receiver-section", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "receiver-crumb", children: [
        /* @__PURE__ */ u.jsxs("button", { className: "ghost", onClick: () => h(null), children: [
          /* @__PURE__ */ u.jsx(F, { name: "chevron-left" }),
          " All receivers"
        ] }),
        /* @__PURE__ */ u.jsx("h2", { children: y.name })
      ] }),
      g(y)
    ] }) : /* @__PURE__ */ u.jsx(sp, { devices: c, status: a, channel: p, onOpen: h });
  }, T = r.some((c) => c.channels.includes("water")), f = kp.filter((c) => c.id !== "water" || T);
  return /* @__PURE__ */ u.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ u.jsxs("header", { children: [
      /* @__PURE__ */ u.jsxs("div", { className: "toolbar-row", children: [
        t && /* @__PURE__ */ u.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ u.jsx(F, { name: "menu" }) }),
        /* @__PURE__ */ u.jsx(ba, {}),
        /* @__PURE__ */ u.jsx("h1", { children: "Hive Local" }),
        /* @__PURE__ */ u.jsx("span", { className: "spacer" })
      ] }),
      /* @__PURE__ */ u.jsx("nav", { className: "tabs", role: "tablist", children: f.map((c) => /* @__PURE__ */ u.jsxs("button", { role: "tab", "aria-selected": c.id === d, className: c.id === d ? "on" : "", onClick: () => v(c.id), children: [
        /* @__PURE__ */ u.jsx(F, { name: c.icon }),
        /* @__PURE__ */ u.jsx("span", { children: c.label })
      ] }, c.id)) })
    ] }),
    /* @__PURE__ */ u.jsxs("main", { children: [
      x && /* @__PURE__ */ u.jsx("div", { className: "status error", children: x }),
      !r.length && !x && /* @__PURE__ */ u.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ u.jsx(ba, { size: 56 }),
        /* @__PURE__ */ u.jsx("p", { children: "No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local." })
      ] }),
      d === "overview" && /* @__PURE__ */ u.jsx(rp, { getHass: e, devices: r, status: a, onOpen: (c) => {
        v("controls"), h(c);
      } }),
      d === "rooms" && r.length > 0 && /* @__PURE__ */ u.jsx(cp, { getHass: e }),
      (d === "heat" || d === "water") && o && _(
        r.filter((c) => c.channels.includes(d)),
        d,
        (c) => /* @__PURE__ */ u.jsx(gp, { getHass: e, device: c, channel: d, limits: o }, `${c.entry_id}-${d}`)
      ),
      d === "controls" && o && _(r, "heat", (c) => /* @__PURE__ */ u.jsx(Jf, { getHass: e, device: c, limits: o, status: a[c.entry_id] ?? {} }))
    ] })
  ] });
}
const Np = (
  /* css */
  `
:host {
  --hl-heat: var(--state-climate-heat-color, #ff8100);
  --hl-water: var(--state-water_heater-color, #2196f3);
  --hl-idle: var(--secondary-text-color, #727272);
  --hl-off: var(--disabled-text-color, #9e9e9e);
  --hl-off-fill: color-mix(in srgb, var(--secondary-text-color, #888) 18%, transparent);
  --hl-radius: var(--ha-card-border-radius, 16px);
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

/* Header: toolbar + tabs, like HA's own panels */
header { position: sticky; top: 0; z-index: 2; background: var(--app-header-background-color, var(--primary-color)); color: var(--app-header-text-color, #fff); border-bottom: var(--app-header-border-bottom, none); }
.toolbar-row { display: flex; align-items: center; gap: 10px; height: 56px; padding: 0 16px; }
.toolbar-row h1 { font-size: 20px; font-weight: 400; margin: 0; }
.toolbar-row .brand { --mdc-icon-size: 24px; opacity: .9; }
.logo-mark { display: block; flex: none; }
.empty-state .logo-mark { opacity: .9; }
.toolbar-row .menu { background: transparent; border: 0; color: inherit; padding: 8px; margin-left: -8px; border-radius: 50%; }
.toolbar-row .menu:hover { background: rgba(255,255,255,.12); }
.tabs { display: flex; gap: 2px; padding: 0 8px; overflow-x: auto; scrollbar-width: none; }
.tabs button { flex: none; display: inline-flex; align-items: center; gap: 8px; border: 0; border-radius: 0; background: transparent; color: inherit; opacity: .72; padding: 12px 14px 10px; border-bottom: 2px solid transparent; font-weight: 500; letter-spacing: .01em; }
.tabs button:hover { opacity: .95; background: rgba(255,255,255,.06); }
.tabs button.on { opacity: 1; border-bottom-color: currentColor; }
.tabs .icon-wrap { --mdc-icon-size: 18px; }

main { max-width: 1040px; margin: 0 auto; padding: 20px 16px 32px; display: flex; flex-direction: column; gap: 16px; }
.stack { display: flex; flex-direction: column; gap: 16px; }

/* Cards */
.card { background: var(--card-background-color); border-radius: var(--hl-radius); box-shadow: var(--ha-card-box-shadow, 0 1px 3px rgba(0,0,0,.08)); border: 1px solid var(--divider-color); padding: 18px; display: flex; flex-direction: column; gap: 14px; }
.card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.title { display: flex; align-items: center; gap: 12px; }
.title-icon { width: 40px; height: 40px; border-radius: 12px; --mdc-icon-size: 22px; background: color-mix(in srgb, var(--hl-accent, var(--primary-color)) 14%, transparent); color: var(--hl-accent, var(--primary-color)); }
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
.segmented button.on { background: var(--card-background-color); color: var(--primary-text-color); box-shadow: 0 1px 3px rgba(0,0,0,.15); font-weight: 500; }
.segmented .raw { padding: 7px 10px; }

.chip { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; padding: 4px 10px; border-radius: 999px; background: var(--hl-soft); color: var(--secondary-text-color); white-space: nowrap; }
.chip .icon-wrap { --mdc-icon-size: 14px; }
.chip.mode-boost { background: color-mix(in srgb, var(--hl-heat) 16%, transparent); color: var(--hl-heat); }
.water .chip.mode-boost { background: color-mix(in srgb, var(--hl-water) 16%, transparent); color: var(--hl-water); }
.chip.unsaved { background: color-mix(in srgb, var(--warning-color, #ffa600) 18%, transparent); color: var(--warning-color, #ffa600); }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip-btn { border-radius: 999px; padding: 6px 14px; }
.chip-btn.on { background: color-mix(in srgb, var(--hl-accent, var(--primary-color)) 16%, transparent); border-color: var(--hl-accent, var(--primary-color)); color: var(--hl-accent, var(--primary-color)); font-weight: 500; }

.status { padding: 10px 14px; border-radius: 10px; font-size: 14px; background: var(--hl-soft); }
.status.ok { background: color-mix(in srgb, var(--success-color, #43a047) 14%, transparent); }
.status.error { background: color-mix(in srgb, var(--error-color, #db4437) 14%, transparent); color: var(--error-color); }
.status.busy { opacity: .8; }

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 48px 16px; color: var(--secondary-text-color); }
.empty-state .icon-wrap { --mdc-icon-size: 48px; opacity: .5; }

/* Overview */
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
.channel { gap: 16px; }
.dial { position: relative; width: 100%; max-width: 240px; margin: 0 auto -28px; aspect-ratio: 1; }
.dial svg { width: 100%; height: 100%; display: block; }
.dial path { fill: none; stroke-width: 12; stroke-linecap: round; }
.dial .track { stroke: var(--hl-soft); }
.dial .value { stroke: var(--hl-heat); transition: d .4s; }
.dial.idle .value { stroke: color-mix(in srgb, var(--hl-heat) 45%, var(--card-background-color)); }
.dial .dot { fill: var(--card-background-color); stroke: var(--primary-text-color); stroke-width: 3; }
.dial-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; }
.dial-temp { font-size: 44px; font-weight: 300; font-variant-numeric: tabular-nums; line-height: 1; }
.dial-temp .unit { font-size: 18px; margin-left: 2px; color: var(--secondary-text-color); vertical-align: top; }
.dial-caption { font-size: 14px; color: var(--secondary-text-color); text-align: center; }
.dial.heating .dial-caption { color: var(--hl-heat); font-weight: 500; }
.water-state { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; min-height: 200px; }
.water-orb { width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--hl-soft); color: var(--hl-off); --mdc-icon-size: 52px; transition: background .3s, color .3s, box-shadow .3s; }
/* The icon's own wrapper sets 20px, so size it there. */
.water-orb .icon-wrap { --mdc-icon-size: 52px; }
.water-state.idle .water-orb { background: color-mix(in srgb, var(--hl-water) 12%, transparent); color: var(--hl-water); }
.water-state.heating .water-orb { background: var(--hl-water); color: #fff; box-shadow: 0 0 0 10px color-mix(in srgb, var(--hl-water) 15%, transparent); }
.water-state.heating .dial-caption { color: var(--hl-water); font-weight: 500; }
.card-actions { display: flex; align-items: center; gap: 8px; }
.boost-btn { flex: 1; border-color: transparent; background: color-mix(in srgb, var(--hl-accent) 14%, transparent); color: var(--hl-accent); font-weight: 500; }
.boost-btn:hover:not(:disabled) { background: color-mix(in srgb, var(--hl-accent) 22%, transparent); }
.boost-btn.cancel { background: var(--hl-soft); color: var(--primary-text-color); }

/* Boost & mode */
.mode-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.mode-tile { flex-direction: column; align-items: flex-start; gap: 4px; padding: 14px; border-radius: 14px; text-align: left; height: 100%; }
.mode-tile .icon-wrap { --mdc-icon-size: 22px; color: var(--secondary-text-color); margin-bottom: 4px; }
.mode-tile .mode-label { font-weight: 500; }
.mode-tile.on { border-color: var(--hl-accent); background: color-mix(in srgb, var(--hl-accent) 10%, transparent); }
.mode-tile.on .icon-wrap { color: var(--hl-accent); }
.boost-live { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; padding: 14px; border-radius: 14px; background: color-mix(in srgb, var(--hl-accent) 10%, transparent); }
.boost-icon { width: 44px; height: 44px; border-radius: 50%; background: var(--hl-accent); color: #fff; --mdc-icon-size: 22px; }
.boost-title { font-weight: 500; }
.stepper { display: inline-flex; align-items: center; gap: 4px; padding: 2px; border-radius: 999px; background: var(--hl-soft); }
.stepper button.round { border-color: transparent; background: transparent; width: 32px; height: 32px; }
.stepper button.round:hover { background: var(--card-background-color); }
.stepper-value { min-width: 56px; text-align: center; font-variant-numeric: tabular-nums; font-weight: 500; }

/* Schedule */
.week { display: flex; flex-direction: column; gap: 4px; }
.row { display: grid; grid-template-columns: 44px 1fr; align-items: center; gap: 10px; padding: 4px 6px; border: 1px solid transparent; border-radius: 10px; background: transparent; text-align: left; }
.row.selected { border-color: var(--primary-color); background: color-mix(in srgb, var(--primary-color) 6%, transparent); }
.hours-row, .hours-row:hover { cursor: default; background: transparent !important; padding-top: 0; }
.day { font-size: 13px; color: var(--secondary-text-color); font-weight: 500; }
.day.today { color: var(--primary-color); }
.timeline { position: relative; height: 30px; border-radius: 8px; overflow: hidden; background: var(--hl-off-fill);
  background-image: repeating-linear-gradient(to right, transparent 0 calc(12.5% - 1px), color-mix(in srgb, var(--divider-color) 70%, transparent) calc(12.5% - 1px) 12.5%); }
.timeline span { position: absolute; top: 0; bottom: 0; color: #fff; font-size: 11px; font-weight: 500; display: flex; align-items: center; padding-left: 6px; border-right: 2px solid var(--card-background-color); white-space: nowrap; overflow: hidden; text-shadow: 0 1px 2px rgba(0,0,0,.25); }
.timeline span.off { background: transparent; border-right-color: transparent; }
.timeline .now { position: absolute; top: -2px; bottom: -2px; width: 2px; margin-left: -1px; background: var(--primary-text-color); box-shadow: 0 0 0 1px var(--card-background-color); z-index: 1; }
.hours { position: relative; height: 14px; font-size: 11px; color: var(--secondary-text-color); }
.hours span { position: absolute; transform: translateX(-50%); }
.hours span:first-child { transform: none; }
.hours span:last-child { transform: translateX(-100%); }
.legend { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.legend-bar { width: 120px; height: 8px; border-radius: 4px; background: linear-gradient(to right, hsl(42 88% 64%), hsl(8 92% 50%)); }
.legend-off { width: 16px; height: 8px; border-radius: 4px; background: var(--hl-off-fill); margin-left: 12px; }
.events { display: flex; flex-direction: column; }
.transition { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid var(--divider-color); }
.transition:last-child { border-bottom: 0; }
.transition .danger { margin-left: auto; }
.swatch { width: 10px; height: 32px; border-radius: 5px; flex: none; }

/* Rooms */
.receiver-section { display: flex; flex-direction: column; gap: 12px; }
.receiver-crumb { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.receiver-crumb h2 { margin: 0; }
.receiver-crumb button { padding-left: 4px; }
.receiver-card { flex-direction: row; align-items: center; gap: 14px; text-align: left; font: inherit; color: inherit; cursor: pointer; }
.receiver-card.heat { --hl-accent: var(--hl-heat); }
.receiver-card.water { --hl-accent: var(--hl-water); }
.receiver-card:hover { border-color: var(--hl-accent); }
.receiver-text { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
.receiver-name { font-size: 17px; font-weight: 500; }
.dot-heating { width: 10px; height: 10px; border-radius: 50%; background: var(--hl-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hl-accent) 20%, transparent); flex: none; }
.zone { display: flex; flex-direction: column; gap: 10px; }
.zone h3 { margin: 4px 0 0; }
.rooms-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.rooms-head p { margin: 0; max-width: 65ch; }
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

@media (max-width: 600px) {
  main { padding: 12px 8px 24px; gap: 12px; }
  .card { padding: 14px; }
  .grid { grid-template-columns: 1fr; }
  .mode-grid { grid-template-columns: 1fr; }
  .mode-tile { flex-direction: row; align-items: center; gap: 10px; }
  .mode-tile .icon-wrap { margin: 0; }
  .mode-tile .small { margin-left: auto; text-align: right; }
  /* Labels always visible on phones; drop the icons to make room. */
  .tabs { padding: 0 4px; }
  .tabs { gap: 0; }
  .tabs button { padding: 12px 7px 10px; font-size: 12.5px; letter-spacing: 0; }
  .tabs .icon-wrap { display: none; }
}
`
);
class _p extends HTMLElement {
  constructor() {
    super(...arguments);
    ir(this, "_hass");
    ir(this, "_narrow", !1);
    ir(this, "_root");
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
      r.textContent = Np;
      const l = document.createElement("div");
      n.append(r, l), this._root = vc(l);
    }
    this._render();
  }
  disconnectedCallback() {
    var n, r;
    (n = this._root) == null || n.unmount(), this._root = void 0, (r = this.shadowRoot) == null || r.replaceChildren();
  }
  _render() {
    !this._root || !this._hass || this._root.render(
      /* @__PURE__ */ u.jsx(
        Sp,
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
customElements.get("hive-local-panel") || customElements.define("hive-local-panel", _p);
