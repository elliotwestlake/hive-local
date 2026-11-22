var wc = Object.defineProperty;
var kc = (e, t, n) => t in e ? wc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var fr = (e, t, n) => kc(e, typeof t != "symbol" ? t + "" : t, n);
var rs = { exports: {} }, ml = {}, ls = { exports: {} }, O = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ir = Symbol.for("react.element"), Sc = Symbol.for("react.portal"), jc = Symbol.for("react.fragment"), Nc = Symbol.for("react.strict_mode"), _c = Symbol.for("react.profiler"), Cc = Symbol.for("react.provider"), Ec = Symbol.for("react.context"), zc = Symbol.for("react.forward_ref"), bc = Symbol.for("react.suspense"), Tc = Symbol.for("react.memo"), Pc = Symbol.for("react.lazy"), Wi = Symbol.iterator;
function Lc(e) {
  return e === null || typeof e != "object" ? null : (e = Wi && e[Wi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var os = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, is = Object.assign, as = {};
function gn(e, t, n) {
  this.props = e, this.context = t, this.refs = as, this.updater = n || os;
}
gn.prototype.isReactComponent = {};
gn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
gn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ss() {
}
ss.prototype = gn.prototype;
function Go(e, t, n) {
  this.props = e, this.context = t, this.refs = as, this.updater = n || os;
}
var Jo = Go.prototype = new ss();
Jo.constructor = Go;
is(Jo, gn.prototype);
Jo.isPureReactComponent = !0;
var Qi = Array.isArray, us = Object.prototype.hasOwnProperty, qo = { current: null }, cs = { key: !0, ref: !0, __self: !0, __source: !0 };
function ds(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) us.call(t, r) && !cs.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in s = e.defaultProps, s) l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: ir, type: e, key: o, ref: i, props: l, _owner: qo.current };
}
function Mc(e, t) {
  return { $$typeof: ir, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ei(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ir;
}
function $c(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Ki = /\/+/g;
function Pl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? $c("" + e.key) : t.toString(36);
}
function Tr(e, t, n, r, l) {
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
        case ir:
        case Sc:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + Pl(i, 0) : r, Qi(l) ? (n = "", e != null && (n = e.replace(Ki, "$&/") + "/"), Tr(l, t, n, "", function(c) {
    return c;
  })) : l != null && (ei(l) && (l = Mc(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Ki, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Qi(e)) for (var s = 0; s < e.length; s++) {
    o = e[s];
    var u = r + Pl(o, s);
    i += Tr(o, t, n, u, l);
  }
  else if (u = Lc(e), typeof u == "function") for (e = u.call(e), s = 0; !(o = e.next()).done; ) o = o.value, u = r + Pl(o, s++), i += Tr(o, t, n, u, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function pr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Tr(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Rc(e) {
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
var fe = { current: null }, Pr = { transition: null }, Dc = { ReactCurrentDispatcher: fe, ReactCurrentBatchConfig: Pr, ReactCurrentOwner: qo };
function fs() {
  throw Error("act(...) is not supported in production builds of React.");
}
O.Children = { map: pr, forEach: function(e, t, n) {
  pr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return pr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return pr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!ei(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
O.Component = gn;
O.Fragment = jc;
O.Profiler = _c;
O.PureComponent = Go;
O.StrictMode = Nc;
O.Suspense = bc;
O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Dc;
O.act = fs;
O.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = is({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = qo.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
    for (u in t) us.call(t, u) && !cs.hasOwnProperty(u) && (r[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    s = Array(u);
    for (var c = 0; c < u; c++) s[c] = arguments[c + 2];
    r.children = s;
  }
  return { $$typeof: ir, type: e.type, key: l, ref: o, props: r, _owner: i };
};
O.createContext = function(e) {
  return e = { $$typeof: Ec, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Cc, _context: e }, e.Consumer = e;
};
O.createElement = ds;
O.createFactory = function(e) {
  var t = ds.bind(null, e);
  return t.type = e, t;
};
O.createRef = function() {
  return { current: null };
};
O.forwardRef = function(e) {
  return { $$typeof: zc, render: e };
};
O.isValidElement = ei;
O.lazy = function(e) {
  return { $$typeof: Pc, _payload: { _status: -1, _result: e }, _init: Rc };
};
O.memo = function(e, t) {
  return { $$typeof: Tc, type: e, compare: t === void 0 ? null : t };
};
O.startTransition = function(e) {
  var t = Pr.transition;
  Pr.transition = {};
  try {
    e();
  } finally {
    Pr.transition = t;
  }
};
O.unstable_act = fs;
O.useCallback = function(e, t) {
  return fe.current.useCallback(e, t);
};
O.useContext = function(e) {
  return fe.current.useContext(e);
};
O.useDebugValue = function() {
};
O.useDeferredValue = function(e) {
  return fe.current.useDeferredValue(e);
};
O.useEffect = function(e, t) {
  return fe.current.useEffect(e, t);
};
O.useId = function() {
  return fe.current.useId();
};
O.useImperativeHandle = function(e, t, n) {
  return fe.current.useImperativeHandle(e, t, n);
};
O.useInsertionEffect = function(e, t) {
  return fe.current.useInsertionEffect(e, t);
};
O.useLayoutEffect = function(e, t) {
  return fe.current.useLayoutEffect(e, t);
};
O.useMemo = function(e, t) {
  return fe.current.useMemo(e, t);
};
O.useReducer = function(e, t, n) {
  return fe.current.useReducer(e, t, n);
};
O.useRef = function(e) {
  return fe.current.useRef(e);
};
O.useState = function(e) {
  return fe.current.useState(e);
};
O.useSyncExternalStore = function(e, t, n) {
  return fe.current.useSyncExternalStore(e, t, n);
};
O.useTransition = function() {
  return fe.current.useTransition();
};
O.version = "18.3.1";
ls.exports = O;
var b = ls.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oc = b, Fc = Symbol.for("react.element"), Ic = Symbol.for("react.fragment"), Ac = Object.prototype.hasOwnProperty, Uc = Oc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Bc = { key: !0, ref: !0, __self: !0, __source: !0 };
function ps(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) Ac.call(t, r) && !Bc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Fc, type: e, key: o, ref: i, props: l, _owner: Uc.current };
}
ml.Fragment = Ic;
ml.jsx = ps;
ml.jsxs = ps;
rs.exports = ml;
var a = rs.exports, hs = { exports: {} }, je = {}, ms = { exports: {} }, vs = {};
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
  function t(E, S) {
    var z = E.length;
    E.push(S);
    e: for (; 0 < z; ) {
      var R = z - 1 >>> 1, I = E[R];
      if (0 < l(I, S)) E[R] = S, E[z] = I, z = R;
      else break e;
    }
  }
  function n(E) {
    return E.length === 0 ? null : E[0];
  }
  function r(E) {
    if (E.length === 0) return null;
    var S = E[0], z = E.pop();
    if (z !== S) {
      E[0] = z;
      e: for (var R = 0, I = E.length, D = I >>> 1; R < D; ) {
        var _e = 2 * (R + 1) - 1, Ct = E[_e], Et = _e + 1, dr = E[Et];
        if (0 > l(Ct, z)) Et < I && 0 > l(dr, Ct) ? (E[R] = dr, E[Et] = z, R = Et) : (E[R] = Ct, E[_e] = z, R = _e);
        else if (Et < I && 0 > l(dr, z)) E[R] = dr, E[Et] = z, R = Et;
        else break e;
      }
    }
    return S;
  }
  function l(E, S) {
    var z = E.sortIndex - S.sortIndex;
    return z !== 0 ? z : E.id - S.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var i = Date, s = i.now();
    e.unstable_now = function() {
      return i.now() - s;
    };
  }
  var u = [], c = [], g = 1, p = null, v = 3, m = !1, y = !1, w = !1, T = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function h(E) {
    for (var S = n(c); S !== null; ) {
      if (S.callback === null) r(c);
      else if (S.startTime <= E) r(c), S.sortIndex = S.expirationTime, t(u, S);
      else break;
      S = n(c);
    }
  }
  function k(E) {
    if (w = !1, h(E), !y) if (n(u) !== null) y = !0, _t(_);
    else {
      var S = n(c);
      S !== null && Me(k, S.startTime - E);
    }
  }
  function _(E, S) {
    y = !1, w && (w = !1, f(P), P = -1), m = !0;
    var z = v;
    try {
      for (h(S), p = n(u); p !== null && (!(p.expirationTime > S) || E && !Z()); ) {
        var R = p.callback;
        if (typeof R == "function") {
          p.callback = null, v = p.priorityLevel;
          var I = R(p.expirationTime <= S);
          S = e.unstable_now(), typeof I == "function" ? p.callback = I : p === n(u) && r(u), h(S);
        } else r(u);
        p = n(u);
      }
      if (p !== null) var D = !0;
      else {
        var _e = n(c);
        _e !== null && Me(k, _e.startTime - S), D = !1;
      }
      return D;
    } finally {
      p = null, v = z, m = !1;
    }
  }
  var j = !1, x = null, P = -1, $ = 5, C = -1;
  function Z() {
    return !(e.unstable_now() - C < $);
  }
  function oe() {
    if (x !== null) {
      var E = e.unstable_now();
      C = E;
      var S = !0;
      try {
        S = x(!0, E);
      } finally {
        S ? Le() : (j = !1, x = null);
      }
    } else j = !1;
  }
  var Le;
  if (typeof d == "function") Le = function() {
    d(oe);
  };
  else if (typeof MessageChannel < "u") {
    var rt = new MessageChannel(), Nt = rt.port2;
    rt.port1.onmessage = oe, Le = function() {
      Nt.postMessage(null);
    };
  } else Le = function() {
    T(oe, 0);
  };
  function _t(E) {
    x = E, j || (j = !0, Le());
  }
  function Me(E, S) {
    P = T(function() {
      E(e.unstable_now());
    }, S);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(E) {
    E.callback = null;
  }, e.unstable_continueExecution = function() {
    y || m || (y = !0, _t(_));
  }, e.unstable_forceFrameRate = function(E) {
    0 > E || 125 < E ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : $ = 0 < E ? Math.floor(1e3 / E) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return v;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(E) {
    switch (v) {
      case 1:
      case 2:
      case 3:
        var S = 3;
        break;
      default:
        S = v;
    }
    var z = v;
    v = S;
    try {
      return E();
    } finally {
      v = z;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(E, S) {
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
    var z = v;
    v = E;
    try {
      return S();
    } finally {
      v = z;
    }
  }, e.unstable_scheduleCallback = function(E, S, z) {
    var R = e.unstable_now();
    switch (typeof z == "object" && z !== null ? (z = z.delay, z = typeof z == "number" && 0 < z ? R + z : R) : z = R, E) {
      case 1:
        var I = -1;
        break;
      case 2:
        I = 250;
        break;
      case 5:
        I = 1073741823;
        break;
      case 4:
        I = 1e4;
        break;
      default:
        I = 5e3;
    }
    return I = z + I, E = { id: g++, callback: S, priorityLevel: E, startTime: z, expirationTime: I, sortIndex: -1 }, z > R ? (E.sortIndex = z, t(c, E), n(u) === null && E === n(c) && (w ? (f(P), P = -1) : w = !0, Me(k, z - R))) : (E.sortIndex = I, t(u, E), y || m || (y = !0, _t(_))), E;
  }, e.unstable_shouldYield = Z, e.unstable_wrapCallback = function(E) {
    var S = v;
    return function() {
      var z = v;
      v = S;
      try {
        return E.apply(this, arguments);
      } finally {
        v = z;
      }
    };
  };
})(vs);
ms.exports = vs;
var Hc = ms.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vc = b, Se = Hc;
function N(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var gs = /* @__PURE__ */ new Set(), Hn = {};
function Bt(e, t) {
  cn(e, t), cn(e + "Capture", t);
}
function cn(e, t) {
  for (Hn[e] = t, e = 0; e < t.length; e++) gs.add(t[e]);
}
var Je = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ro = Object.prototype.hasOwnProperty, Wc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Yi = {}, Xi = {};
function Qc(e) {
  return ro.call(Xi, e) ? !0 : ro.call(Yi, e) ? !1 : Wc.test(e) ? Xi[e] = !0 : (Yi[e] = !0, !1);
}
function Kc(e, t, n, r) {
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
function Yc(e, t, n, r) {
  if (t === null || typeof t > "u" || Kc(e, t, n, r)) return !0;
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
var le = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  le[e] = new pe(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  le[t] = new pe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  le[e] = new pe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  le[e] = new pe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  le[e] = new pe(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  le[e] = new pe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  le[e] = new pe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  le[e] = new pe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  le[e] = new pe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ti = /[\-:]([a-z])/g;
function ni(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ti,
    ni
  );
  le[t] = new pe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ti, ni);
  le[t] = new pe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ti, ni);
  le[t] = new pe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  le[e] = new pe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
le.xlinkHref = new pe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  le[e] = new pe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ri(e, t, n, r) {
  var l = le.hasOwnProperty(t) ? le[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Yc(t, n, l, r) && (n = null), r || l === null ? Qc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var nt = Vc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, hr = Symbol.for("react.element"), Wt = Symbol.for("react.portal"), Qt = Symbol.for("react.fragment"), li = Symbol.for("react.strict_mode"), lo = Symbol.for("react.profiler"), ys = Symbol.for("react.provider"), xs = Symbol.for("react.context"), oi = Symbol.for("react.forward_ref"), oo = Symbol.for("react.suspense"), io = Symbol.for("react.suspense_list"), ii = Symbol.for("react.memo"), ot = Symbol.for("react.lazy"), ws = Symbol.for("react.offscreen"), Zi = Symbol.iterator;
function wn(e) {
  return e === null || typeof e != "object" ? null : (e = Zi && e[Zi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var K = Object.assign, Ll;
function bn(e) {
  if (Ll === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Ll = t && t[1] || "";
  }
  return `
` + Ll + e;
}
var Ml = !1;
function $l(e, t) {
  if (!e || Ml) return "";
  Ml = !0;
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
`), i = l.length - 1, s = o.length - 1; 1 <= i && 0 <= s && l[i] !== o[s]; ) s--;
      for (; 1 <= i && 0 <= s; i--, s--) if (l[i] !== o[s]) {
        if (i !== 1 || s !== 1)
          do
            if (i--, s--, 0 > s || l[i] !== o[s]) {
              var u = `
` + l[i].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= i && 0 <= s);
        break;
      }
    }
  } finally {
    Ml = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? bn(e) : "";
}
function Xc(e) {
  switch (e.tag) {
    case 5:
      return bn(e.type);
    case 16:
      return bn("Lazy");
    case 13:
      return bn("Suspense");
    case 19:
      return bn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = $l(e.type, !1), e;
    case 11:
      return e = $l(e.type.render, !1), e;
    case 1:
      return e = $l(e.type, !0), e;
    default:
      return "";
  }
}
function ao(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Qt:
      return "Fragment";
    case Wt:
      return "Portal";
    case lo:
      return "Profiler";
    case li:
      return "StrictMode";
    case oo:
      return "Suspense";
    case io:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case xs:
      return (e.displayName || "Context") + ".Consumer";
    case ys:
      return (e._context.displayName || "Context") + ".Provider";
    case oi:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case ii:
      return t = e.displayName || null, t !== null ? t : ao(e.type) || "Memo";
    case ot:
      t = e._payload, e = e._init;
      try {
        return ao(e(t));
      } catch {
      }
  }
  return null;
}
function Zc(e) {
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
      return ao(t);
    case 8:
      return t === li ? "StrictMode" : "Mode";
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
function xt(e) {
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
function ks(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Gc(e) {
  var t = ks(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function mr(e) {
  e._valueTracker || (e._valueTracker = Gc(e));
}
function Ss(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = ks(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Vr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function so(e, t) {
  var n = t.checked;
  return K({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Gi(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = xt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function js(e, t) {
  t = t.checked, t != null && ri(e, "checked", t, !1);
}
function uo(e, t) {
  js(e, t);
  var n = xt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? co(e, t.type, n) : t.hasOwnProperty("defaultValue") && co(e, t.type, xt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Ji(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function co(e, t, n) {
  (t !== "number" || Vr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Tn = Array.isArray;
function rn(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + xt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function fo(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
  return K({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function qi(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(N(92));
      if (Tn(n)) {
        if (1 < n.length) throw Error(N(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: xt(n) };
}
function Ns(e, t) {
  var n = xt(t.value), r = xt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ea(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function _s(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function po(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? _s(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var vr, Cs = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (vr = vr || document.createElement("div"), vr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = vr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Vn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Mn = {
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
}, Jc = ["Webkit", "ms", "Moz", "O"];
Object.keys(Mn).forEach(function(e) {
  Jc.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Mn[t] = Mn[e];
  });
});
function Es(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Mn.hasOwnProperty(e) && Mn[e] ? ("" + t).trim() : t + "px";
}
function zs(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Es(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var qc = K({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function ho(e, t) {
  if (t) {
    if (qc[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(N(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(N(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(N(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(N(62));
  }
}
function mo(e, t) {
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
var vo = null;
function ai(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var go = null, ln = null, on = null;
function ta(e) {
  if (e = ur(e)) {
    if (typeof go != "function") throw Error(N(280));
    var t = e.stateNode;
    t && (t = wl(t), go(e.stateNode, e.type, t));
  }
}
function bs(e) {
  ln ? on ? on.push(e) : on = [e] : ln = e;
}
function Ts() {
  if (ln) {
    var e = ln, t = on;
    if (on = ln = null, ta(e), t) for (e = 0; e < t.length; e++) ta(t[e]);
  }
}
function Ps(e, t) {
  return e(t);
}
function Ls() {
}
var Rl = !1;
function Ms(e, t, n) {
  if (Rl) return e(t, n);
  Rl = !0;
  try {
    return Ps(e, t, n);
  } finally {
    Rl = !1, (ln !== null || on !== null) && (Ls(), Ts());
  }
}
function Wn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = wl(n);
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
  if (n && typeof n != "function") throw Error(N(231, t, typeof n));
  return n;
}
var yo = !1;
if (Je) try {
  var kn = {};
  Object.defineProperty(kn, "passive", { get: function() {
    yo = !0;
  } }), window.addEventListener("test", kn, kn), window.removeEventListener("test", kn, kn);
} catch {
  yo = !1;
}
function ed(e, t, n, r, l, o, i, s, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (g) {
    this.onError(g);
  }
}
var $n = !1, Wr = null, Qr = !1, xo = null, td = { onError: function(e) {
  $n = !0, Wr = e;
} };
function nd(e, t, n, r, l, o, i, s, u) {
  $n = !1, Wr = null, ed.apply(td, arguments);
}
function rd(e, t, n, r, l, o, i, s, u) {
  if (nd.apply(this, arguments), $n) {
    if ($n) {
      var c = Wr;
      $n = !1, Wr = null;
    } else throw Error(N(198));
    Qr || (Qr = !0, xo = c);
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
function $s(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function na(e) {
  if (Ht(e) !== e) throw Error(N(188));
}
function ld(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Ht(e), t === null) throw Error(N(188));
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
        if (o === n) return na(l), e;
        if (o === r) return na(l), t;
        o = o.sibling;
      }
      throw Error(N(188));
    }
    if (n.return !== r.return) n = l, r = o;
    else {
      for (var i = !1, s = l.child; s; ) {
        if (s === n) {
          i = !0, n = l, r = o;
          break;
        }
        if (s === r) {
          i = !0, r = l, n = o;
          break;
        }
        s = s.sibling;
      }
      if (!i) {
        for (s = o.child; s; ) {
          if (s === n) {
            i = !0, n = o, r = l;
            break;
          }
          if (s === r) {
            i = !0, r = o, n = l;
            break;
          }
          s = s.sibling;
        }
        if (!i) throw Error(N(189));
      }
    }
    if (n.alternate !== r) throw Error(N(190));
  }
  if (n.tag !== 3) throw Error(N(188));
  return n.stateNode.current === n ? e : t;
}
function Rs(e) {
  return e = ld(e), e !== null ? Ds(e) : null;
}
function Ds(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ds(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Os = Se.unstable_scheduleCallback, ra = Se.unstable_cancelCallback, od = Se.unstable_shouldYield, id = Se.unstable_requestPaint, X = Se.unstable_now, ad = Se.unstable_getCurrentPriorityLevel, si = Se.unstable_ImmediatePriority, Fs = Se.unstable_UserBlockingPriority, Kr = Se.unstable_NormalPriority, sd = Se.unstable_LowPriority, Is = Se.unstable_IdlePriority, vl = null, We = null;
function ud(e) {
  if (We && typeof We.onCommitFiberRoot == "function") try {
    We.onCommitFiberRoot(vl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Fe = Math.clz32 ? Math.clz32 : fd, cd = Math.log, dd = Math.LN2;
function fd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (cd(e) / dd | 0) | 0;
}
var gr = 64, yr = 4194304;
function Pn(e) {
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
function Yr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var s = i & ~l;
    s !== 0 ? r = Pn(s) : (o &= i, o !== 0 && (r = Pn(o)));
  } else i = n & ~l, i !== 0 ? r = Pn(i) : o !== 0 && (r = Pn(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Fe(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function pd(e, t) {
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
function hd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - Fe(o), s = 1 << i, u = l[i];
    u === -1 ? (!(s & n) || s & r) && (l[i] = pd(s, t)) : u <= t && (e.expiredLanes |= s), o &= ~s;
  }
}
function wo(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function As() {
  var e = gr;
  return gr <<= 1, !(gr & 4194240) && (gr = 64), e;
}
function Dl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ar(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Fe(t), e[t] = n;
}
function md(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Fe(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function ui(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Fe(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var A = 0;
function Us(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Bs, ci, Hs, Vs, Ws, ko = !1, xr = [], dt = null, ft = null, pt = null, Qn = /* @__PURE__ */ new Map(), Kn = /* @__PURE__ */ new Map(), at = [], vd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function la(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      dt = null;
      break;
    case "dragenter":
    case "dragleave":
      ft = null;
      break;
    case "mouseover":
    case "mouseout":
      pt = null;
      break;
    case "pointerover":
    case "pointerout":
      Qn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Kn.delete(t.pointerId);
  }
}
function Sn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = ur(t), t !== null && ci(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function gd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return dt = Sn(dt, e, t, n, r, l), !0;
    case "dragenter":
      return ft = Sn(ft, e, t, n, r, l), !0;
    case "mouseover":
      return pt = Sn(pt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Qn.set(o, Sn(Qn.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Kn.set(o, Sn(Kn.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Qs(e) {
  var t = Pt(e.target);
  if (t !== null) {
    var n = Ht(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = $s(n), t !== null) {
          e.blockedOn = t, Ws(e.priority, function() {
            Hs(n);
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
function Lr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = So(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      vo = r, n.target.dispatchEvent(r), vo = null;
    } else return t = ur(n), t !== null && ci(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function oa(e, t, n) {
  Lr(e) && n.delete(t);
}
function yd() {
  ko = !1, dt !== null && Lr(dt) && (dt = null), ft !== null && Lr(ft) && (ft = null), pt !== null && Lr(pt) && (pt = null), Qn.forEach(oa), Kn.forEach(oa);
}
function jn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, ko || (ko = !0, Se.unstable_scheduleCallback(Se.unstable_NormalPriority, yd)));
}
function Yn(e) {
  function t(l) {
    return jn(l, e);
  }
  if (0 < xr.length) {
    jn(xr[0], e);
    for (var n = 1; n < xr.length; n++) {
      var r = xr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (dt !== null && jn(dt, e), ft !== null && jn(ft, e), pt !== null && jn(pt, e), Qn.forEach(t), Kn.forEach(t), n = 0; n < at.length; n++) r = at[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < at.length && (n = at[0], n.blockedOn === null); ) Qs(n), n.blockedOn === null && at.shift();
}
var an = nt.ReactCurrentBatchConfig, Xr = !0;
function xd(e, t, n, r) {
  var l = A, o = an.transition;
  an.transition = null;
  try {
    A = 1, di(e, t, n, r);
  } finally {
    A = l, an.transition = o;
  }
}
function wd(e, t, n, r) {
  var l = A, o = an.transition;
  an.transition = null;
  try {
    A = 4, di(e, t, n, r);
  } finally {
    A = l, an.transition = o;
  }
}
function di(e, t, n, r) {
  if (Xr) {
    var l = So(e, t, n, r);
    if (l === null) Ql(e, t, r, Zr, n), la(e, r);
    else if (gd(l, e, t, n, r)) r.stopPropagation();
    else if (la(e, r), t & 4 && -1 < vd.indexOf(e)) {
      for (; l !== null; ) {
        var o = ur(l);
        if (o !== null && Bs(o), o = So(e, t, n, r), o === null && Ql(e, t, r, Zr, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Ql(e, t, r, null, n);
  }
}
var Zr = null;
function So(e, t, n, r) {
  if (Zr = null, e = ai(r), e = Pt(e), e !== null) if (t = Ht(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = $s(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Zr = e, null;
}
function Ks(e) {
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
      switch (ad()) {
        case si:
          return 1;
        case Fs:
          return 4;
        case Kr:
        case sd:
          return 16;
        case Is:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ut = null, fi = null, Mr = null;
function Ys() {
  if (Mr) return Mr;
  var e, t = fi, n = t.length, r, l = "value" in ut ? ut.value : ut.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return Mr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function $r(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function wr() {
  return !0;
}
function ia() {
  return !1;
}
function Ne(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(o) : o[s]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? wr : ia, this.isPropagationStopped = ia, this;
  }
  return K(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = wr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = wr);
  }, persist: function() {
  }, isPersistent: wr }), t;
}
var yn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, pi = Ne(yn), sr = K({}, yn, { view: 0, detail: 0 }), kd = Ne(sr), Ol, Fl, Nn, gl = K({}, sr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: hi, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Nn && (Nn && e.type === "mousemove" ? (Ol = e.screenX - Nn.screenX, Fl = e.screenY - Nn.screenY) : Fl = Ol = 0, Nn = e), Ol);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Fl;
} }), aa = Ne(gl), Sd = K({}, gl, { dataTransfer: 0 }), jd = Ne(Sd), Nd = K({}, sr, { relatedTarget: 0 }), Il = Ne(Nd), _d = K({}, yn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Cd = Ne(_d), Ed = K({}, yn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), zd = Ne(Ed), bd = K({}, yn, { data: 0 }), sa = Ne(bd), Td = {
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
}, Pd = {
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
}, Ld = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Md(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Ld[e]) ? !!t[e] : !1;
}
function hi() {
  return Md;
}
var $d = K({}, sr, { key: function(e) {
  if (e.key) {
    var t = Td[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = $r(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Pd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: hi, charCode: function(e) {
  return e.type === "keypress" ? $r(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? $r(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Rd = Ne($d), Dd = K({}, gl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ua = Ne(Dd), Od = K({}, sr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: hi }), Fd = Ne(Od), Id = K({}, yn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Ad = Ne(Id), Ud = K({}, gl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Bd = Ne(Ud), Hd = [9, 13, 27, 32], mi = Je && "CompositionEvent" in window, Rn = null;
Je && "documentMode" in document && (Rn = document.documentMode);
var Vd = Je && "TextEvent" in window && !Rn, Xs = Je && (!mi || Rn && 8 < Rn && 11 >= Rn), ca = " ", da = !1;
function Zs(e, t) {
  switch (e) {
    case "keyup":
      return Hd.indexOf(t.keyCode) !== -1;
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
function Gs(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Kt = !1;
function Wd(e, t) {
  switch (e) {
    case "compositionend":
      return Gs(t);
    case "keypress":
      return t.which !== 32 ? null : (da = !0, ca);
    case "textInput":
      return e = t.data, e === ca && da ? null : e;
    default:
      return null;
  }
}
function Qd(e, t) {
  if (Kt) return e === "compositionend" || !mi && Zs(e, t) ? (e = Ys(), Mr = fi = ut = null, Kt = !1, e) : null;
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
      return Xs && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Kd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function fa(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Kd[e.type] : t === "textarea";
}
function Js(e, t, n, r) {
  bs(r), t = Gr(t, "onChange"), 0 < t.length && (n = new pi("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Dn = null, Xn = null;
function Yd(e) {
  uu(e, 0);
}
function yl(e) {
  var t = Zt(e);
  if (Ss(t)) return e;
}
function Xd(e, t) {
  if (e === "change") return t;
}
var qs = !1;
if (Je) {
  var Al;
  if (Je) {
    var Ul = "oninput" in document;
    if (!Ul) {
      var pa = document.createElement("div");
      pa.setAttribute("oninput", "return;"), Ul = typeof pa.oninput == "function";
    }
    Al = Ul;
  } else Al = !1;
  qs = Al && (!document.documentMode || 9 < document.documentMode);
}
function ha() {
  Dn && (Dn.detachEvent("onpropertychange", eu), Xn = Dn = null);
}
function eu(e) {
  if (e.propertyName === "value" && yl(Xn)) {
    var t = [];
    Js(t, Xn, e, ai(e)), Ms(Yd, t);
  }
}
function Zd(e, t, n) {
  e === "focusin" ? (ha(), Dn = t, Xn = n, Dn.attachEvent("onpropertychange", eu)) : e === "focusout" && ha();
}
function Gd(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return yl(Xn);
}
function Jd(e, t) {
  if (e === "click") return yl(t);
}
function qd(e, t) {
  if (e === "input" || e === "change") return yl(t);
}
function ef(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ae = typeof Object.is == "function" ? Object.is : ef;
function Zn(e, t) {
  if (Ae(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ro.call(t, l) || !Ae(e[l], t[l])) return !1;
  }
  return !0;
}
function ma(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function va(e, t) {
  var n = ma(e);
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
    n = ma(n);
  }
}
function tu(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? tu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function nu() {
  for (var e = window, t = Vr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Vr(e.document);
  }
  return t;
}
function vi(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function tf(e) {
  var t = nu(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && tu(n.ownerDocument.documentElement, n)) {
    if (r !== null && vi(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = va(n, o);
        var i = va(
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
var nf = Je && "documentMode" in document && 11 >= document.documentMode, Yt = null, jo = null, On = null, No = !1;
function ga(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  No || Yt == null || Yt !== Vr(r) || (r = Yt, "selectionStart" in r && vi(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), On && Zn(On, r) || (On = r, r = Gr(jo, "onSelect"), 0 < r.length && (t = new pi("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Yt)));
}
function kr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Xt = { animationend: kr("Animation", "AnimationEnd"), animationiteration: kr("Animation", "AnimationIteration"), animationstart: kr("Animation", "AnimationStart"), transitionend: kr("Transition", "TransitionEnd") }, Bl = {}, ru = {};
Je && (ru = document.createElement("div").style, "AnimationEvent" in window || (delete Xt.animationend.animation, delete Xt.animationiteration.animation, delete Xt.animationstart.animation), "TransitionEvent" in window || delete Xt.transitionend.transition);
function xl(e) {
  if (Bl[e]) return Bl[e];
  if (!Xt[e]) return e;
  var t = Xt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in ru) return Bl[e] = t[n];
  return e;
}
var lu = xl("animationend"), ou = xl("animationiteration"), iu = xl("animationstart"), au = xl("transitionend"), su = /* @__PURE__ */ new Map(), ya = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function kt(e, t) {
  su.set(e, t), Bt(t, [e]);
}
for (var Hl = 0; Hl < ya.length; Hl++) {
  var Vl = ya[Hl], rf = Vl.toLowerCase(), lf = Vl[0].toUpperCase() + Vl.slice(1);
  kt(rf, "on" + lf);
}
kt(lu, "onAnimationEnd");
kt(ou, "onAnimationIteration");
kt(iu, "onAnimationStart");
kt("dblclick", "onDoubleClick");
kt("focusin", "onFocus");
kt("focusout", "onBlur");
kt(au, "onTransitionEnd");
cn("onMouseEnter", ["mouseout", "mouseover"]);
cn("onMouseLeave", ["mouseout", "mouseover"]);
cn("onPointerEnter", ["pointerout", "pointerover"]);
cn("onPointerLeave", ["pointerout", "pointerover"]);
Bt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Bt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Bt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Bt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Bt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Bt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ln = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), of = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ln));
function xa(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, rd(r, t, void 0, e), e.currentTarget = null;
}
function uu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var s = r[i], u = s.instance, c = s.currentTarget;
        if (s = s.listener, u !== o && l.isPropagationStopped()) break e;
        xa(l, s, c), o = u;
      }
      else for (i = 0; i < r.length; i++) {
        if (s = r[i], u = s.instance, c = s.currentTarget, s = s.listener, u !== o && l.isPropagationStopped()) break e;
        xa(l, s, c), o = u;
      }
    }
  }
  if (Qr) throw e = xo, Qr = !1, xo = null, e;
}
function B(e, t) {
  var n = t[bo];
  n === void 0 && (n = t[bo] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (cu(t, e, 2, !1), n.add(r));
}
function Wl(e, t, n) {
  var r = 0;
  t && (r |= 4), cu(n, e, r, t);
}
var Sr = "_reactListening" + Math.random().toString(36).slice(2);
function Gn(e) {
  if (!e[Sr]) {
    e[Sr] = !0, gs.forEach(function(n) {
      n !== "selectionchange" && (of.has(n) || Wl(n, !1, e), Wl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Sr] || (t[Sr] = !0, Wl("selectionchange", !1, t));
  }
}
function cu(e, t, n, r) {
  switch (Ks(t)) {
    case 1:
      var l = xd;
      break;
    case 4:
      l = wd;
      break;
    default:
      l = di;
  }
  n = l.bind(null, t, n, e), l = void 0, !yo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Ql(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var i = r.tag;
    if (i === 3 || i === 4) {
      var s = r.stateNode.containerInfo;
      if (s === l || s.nodeType === 8 && s.parentNode === l) break;
      if (i === 4) for (i = r.return; i !== null; ) {
        var u = i.tag;
        if ((u === 3 || u === 4) && (u = i.stateNode.containerInfo, u === l || u.nodeType === 8 && u.parentNode === l)) return;
        i = i.return;
      }
      for (; s !== null; ) {
        if (i = Pt(s), i === null) return;
        if (u = i.tag, u === 5 || u === 6) {
          r = o = i;
          continue e;
        }
        s = s.parentNode;
      }
    }
    r = r.return;
  }
  Ms(function() {
    var c = o, g = ai(n), p = [];
    e: {
      var v = su.get(e);
      if (v !== void 0) {
        var m = pi, y = e;
        switch (e) {
          case "keypress":
            if ($r(n) === 0) break e;
          case "keydown":
          case "keyup":
            m = Rd;
            break;
          case "focusin":
            y = "focus", m = Il;
            break;
          case "focusout":
            y = "blur", m = Il;
            break;
          case "beforeblur":
          case "afterblur":
            m = Il;
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
            m = aa;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            m = jd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = Fd;
            break;
          case lu:
          case ou:
          case iu:
            m = Cd;
            break;
          case au:
            m = Ad;
            break;
          case "scroll":
            m = kd;
            break;
          case "wheel":
            m = Bd;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = zd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            m = ua;
        }
        var w = (t & 4) !== 0, T = !w && e === "scroll", f = w ? v !== null ? v + "Capture" : null : v;
        w = [];
        for (var d = c, h; d !== null; ) {
          h = d;
          var k = h.stateNode;
          if (h.tag === 5 && k !== null && (h = k, f !== null && (k = Wn(d, f), k != null && w.push(Jn(d, k, h)))), T) break;
          d = d.return;
        }
        0 < w.length && (v = new m(v, y, null, n, g), p.push({ event: v, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (v = e === "mouseover" || e === "pointerover", m = e === "mouseout" || e === "pointerout", v && n !== vo && (y = n.relatedTarget || n.fromElement) && (Pt(y) || y[qe])) break e;
        if ((m || v) && (v = g.window === g ? g : (v = g.ownerDocument) ? v.defaultView || v.parentWindow : window, m ? (y = n.relatedTarget || n.toElement, m = c, y = y ? Pt(y) : null, y !== null && (T = Ht(y), y !== T || y.tag !== 5 && y.tag !== 6) && (y = null)) : (m = null, y = c), m !== y)) {
          if (w = aa, k = "onMouseLeave", f = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (w = ua, k = "onPointerLeave", f = "onPointerEnter", d = "pointer"), T = m == null ? v : Zt(m), h = y == null ? v : Zt(y), v = new w(k, d + "leave", m, n, g), v.target = T, v.relatedTarget = h, k = null, Pt(g) === c && (w = new w(f, d + "enter", y, n, g), w.target = h, w.relatedTarget = T, k = w), T = k, m && y) t: {
            for (w = m, f = y, d = 0, h = w; h; h = Vt(h)) d++;
            for (h = 0, k = f; k; k = Vt(k)) h++;
            for (; 0 < d - h; ) w = Vt(w), d--;
            for (; 0 < h - d; ) f = Vt(f), h--;
            for (; d--; ) {
              if (w === f || f !== null && w === f.alternate) break t;
              w = Vt(w), f = Vt(f);
            }
            w = null;
          }
          else w = null;
          m !== null && wa(p, v, m, w, !1), y !== null && T !== null && wa(p, T, y, w, !0);
        }
      }
      e: {
        if (v = c ? Zt(c) : window, m = v.nodeName && v.nodeName.toLowerCase(), m === "select" || m === "input" && v.type === "file") var _ = Xd;
        else if (fa(v)) if (qs) _ = qd;
        else {
          _ = Gd;
          var j = Zd;
        }
        else (m = v.nodeName) && m.toLowerCase() === "input" && (v.type === "checkbox" || v.type === "radio") && (_ = Jd);
        if (_ && (_ = _(e, c))) {
          Js(p, _, n, g);
          break e;
        }
        j && j(e, v, c), e === "focusout" && (j = v._wrapperState) && j.controlled && v.type === "number" && co(v, "number", v.value);
      }
      switch (j = c ? Zt(c) : window, e) {
        case "focusin":
          (fa(j) || j.contentEditable === "true") && (Yt = j, jo = c, On = null);
          break;
        case "focusout":
          On = jo = Yt = null;
          break;
        case "mousedown":
          No = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          No = !1, ga(p, n, g);
          break;
        case "selectionchange":
          if (nf) break;
        case "keydown":
        case "keyup":
          ga(p, n, g);
      }
      var x;
      if (mi) e: {
        switch (e) {
          case "compositionstart":
            var P = "onCompositionStart";
            break e;
          case "compositionend":
            P = "onCompositionEnd";
            break e;
          case "compositionupdate":
            P = "onCompositionUpdate";
            break e;
        }
        P = void 0;
      }
      else Kt ? Zs(e, n) && (P = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      P && (Xs && n.locale !== "ko" && (Kt || P !== "onCompositionStart" ? P === "onCompositionEnd" && Kt && (x = Ys()) : (ut = g, fi = "value" in ut ? ut.value : ut.textContent, Kt = !0)), j = Gr(c, P), 0 < j.length && (P = new sa(P, e, null, n, g), p.push({ event: P, listeners: j }), x ? P.data = x : (x = Gs(n), x !== null && (P.data = x)))), (x = Vd ? Wd(e, n) : Qd(e, n)) && (c = Gr(c, "onBeforeInput"), 0 < c.length && (g = new sa("onBeforeInput", "beforeinput", null, n, g), p.push({ event: g, listeners: c }), g.data = x));
    }
    uu(p, t);
  });
}
function Jn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Gr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Wn(e, n), o != null && r.unshift(Jn(e, o, l)), o = Wn(e, t), o != null && r.push(Jn(e, o, l))), e = e.return;
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
function wa(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var s = n, u = s.alternate, c = s.stateNode;
    if (u !== null && u === r) break;
    s.tag === 5 && c !== null && (s = c, l ? (u = Wn(n, o), u != null && i.unshift(Jn(n, u, s))) : l || (u = Wn(n, o), u != null && i.push(Jn(n, u, s)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var af = /\r\n?/g, sf = /\u0000|\uFFFD/g;
function ka(e) {
  return (typeof e == "string" ? e : "" + e).replace(af, `
`).replace(sf, "");
}
function jr(e, t, n) {
  if (t = ka(t), ka(e) !== t && n) throw Error(N(425));
}
function Jr() {
}
var _o = null, Co = null;
function Eo(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var zo = typeof setTimeout == "function" ? setTimeout : void 0, uf = typeof clearTimeout == "function" ? clearTimeout : void 0, Sa = typeof Promise == "function" ? Promise : void 0, cf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Sa < "u" ? function(e) {
  return Sa.resolve(null).then(e).catch(df);
} : zo;
function df(e) {
  setTimeout(function() {
    throw e;
  });
}
function Kl(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Yn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Yn(t);
}
function ht(e) {
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
function ja(e) {
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
var xn = Math.random().toString(36).slice(2), Ve = "__reactFiber$" + xn, qn = "__reactProps$" + xn, qe = "__reactContainer$" + xn, bo = "__reactEvents$" + xn, ff = "__reactListeners$" + xn, pf = "__reactHandles$" + xn;
function Pt(e) {
  var t = e[Ve];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[qe] || n[Ve]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ja(e); e !== null; ) {
        if (n = e[Ve]) return n;
        e = ja(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function ur(e) {
  return e = e[Ve] || e[qe], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Zt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(N(33));
}
function wl(e) {
  return e[qn] || null;
}
var To = [], Gt = -1;
function St(e) {
  return { current: e };
}
function H(e) {
  0 > Gt || (e.current = To[Gt], To[Gt] = null, Gt--);
}
function U(e, t) {
  Gt++, To[Gt] = e.current, e.current = t;
}
var wt = {}, ue = St(wt), ve = St(!1), Ot = wt;
function dn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return wt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function ge(e) {
  return e = e.childContextTypes, e != null;
}
function qr() {
  H(ve), H(ue);
}
function Na(e, t, n) {
  if (ue.current !== wt) throw Error(N(168));
  U(ue, t), U(ve, n);
}
function du(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(N(108, Zc(e) || "Unknown", l));
  return K({}, n, r);
}
function el(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || wt, Ot = ue.current, U(ue, e), U(ve, ve.current), !0;
}
function _a(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(N(169));
  n ? (e = du(e, t, Ot), r.__reactInternalMemoizedMergedChildContext = e, H(ve), H(ue), U(ue, e)) : H(ve), U(ve, n);
}
var Ye = null, kl = !1, Yl = !1;
function fu(e) {
  Ye === null ? Ye = [e] : Ye.push(e);
}
function hf(e) {
  kl = !0, fu(e);
}
function jt() {
  if (!Yl && Ye !== null) {
    Yl = !0;
    var e = 0, t = A;
    try {
      var n = Ye;
      for (A = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ye = null, kl = !1;
    } catch (l) {
      throw Ye !== null && (Ye = Ye.slice(e + 1)), Os(si, jt), l;
    } finally {
      A = t, Yl = !1;
    }
  }
  return null;
}
var Jt = [], qt = 0, tl = null, nl = 0, Ce = [], Ee = 0, Ft = null, Xe = 1, Ze = "";
function bt(e, t) {
  Jt[qt++] = nl, Jt[qt++] = tl, tl = e, nl = t;
}
function pu(e, t, n) {
  Ce[Ee++] = Xe, Ce[Ee++] = Ze, Ce[Ee++] = Ft, Ft = e;
  var r = Xe;
  e = Ze;
  var l = 32 - Fe(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - Fe(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, Xe = 1 << 32 - Fe(t) + l | n << l | r, Ze = o + e;
  } else Xe = 1 << o | n << l | r, Ze = e;
}
function gi(e) {
  e.return !== null && (bt(e, 1), pu(e, 1, 0));
}
function yi(e) {
  for (; e === tl; ) tl = Jt[--qt], Jt[qt] = null, nl = Jt[--qt], Jt[qt] = null;
  for (; e === Ft; ) Ft = Ce[--Ee], Ce[Ee] = null, Ze = Ce[--Ee], Ce[Ee] = null, Xe = Ce[--Ee], Ce[Ee] = null;
}
var ke = null, we = null, V = !1, Oe = null;
function hu(e, t) {
  var n = ze(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Ca(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ke = e, we = ht(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ke = e, we = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Ft !== null ? { id: Xe, overflow: Ze } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = ze(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ke = e, we = null, !0) : !1;
    default:
      return !1;
  }
}
function Po(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Lo(e) {
  if (V) {
    var t = we;
    if (t) {
      var n = t;
      if (!Ca(e, t)) {
        if (Po(e)) throw Error(N(418));
        t = ht(n.nextSibling);
        var r = ke;
        t && Ca(e, t) ? hu(r, n) : (e.flags = e.flags & -4097 | 2, V = !1, ke = e);
      }
    } else {
      if (Po(e)) throw Error(N(418));
      e.flags = e.flags & -4097 | 2, V = !1, ke = e;
    }
  }
}
function Ea(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ke = e;
}
function Nr(e) {
  if (e !== ke) return !1;
  if (!V) return Ea(e), V = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Eo(e.type, e.memoizedProps)), t && (t = we)) {
    if (Po(e)) throw mu(), Error(N(418));
    for (; t; ) hu(e, t), t = ht(t.nextSibling);
  }
  if (Ea(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(N(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              we = ht(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      we = null;
    }
  } else we = ke ? ht(e.stateNode.nextSibling) : null;
  return !0;
}
function mu() {
  for (var e = we; e; ) e = ht(e.nextSibling);
}
function fn() {
  we = ke = null, V = !1;
}
function xi(e) {
  Oe === null ? Oe = [e] : Oe.push(e);
}
var mf = nt.ReactCurrentBatchConfig;
function _n(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(N(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(N(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var s = l.refs;
        i === null ? delete s[o] : s[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(N(284));
    if (!n._owner) throw Error(N(290, e));
  }
  return e;
}
function _r(e, t) {
  throw e = Object.prototype.toString.call(t), Error(N(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function za(e) {
  var t = e._init;
  return t(e._payload);
}
function vu(e) {
  function t(f, d) {
    if (e) {
      var h = f.deletions;
      h === null ? (f.deletions = [d], f.flags |= 16) : h.push(d);
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
    return f = yt(f, d), f.index = 0, f.sibling = null, f;
  }
  function o(f, d, h) {
    return f.index = h, e ? (h = f.alternate, h !== null ? (h = h.index, h < d ? (f.flags |= 2, d) : h) : (f.flags |= 2, d)) : (f.flags |= 1048576, d);
  }
  function i(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function s(f, d, h, k) {
    return d === null || d.tag !== 6 ? (d = to(h, f.mode, k), d.return = f, d) : (d = l(d, h), d.return = f, d);
  }
  function u(f, d, h, k) {
    var _ = h.type;
    return _ === Qt ? g(f, d, h.props.children, k, h.key) : d !== null && (d.elementType === _ || typeof _ == "object" && _ !== null && _.$$typeof === ot && za(_) === d.type) ? (k = l(d, h.props), k.ref = _n(f, d, h), k.return = f, k) : (k = Ur(h.type, h.key, h.props, null, f.mode, k), k.ref = _n(f, d, h), k.return = f, k);
  }
  function c(f, d, h, k) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== h.containerInfo || d.stateNode.implementation !== h.implementation ? (d = no(h, f.mode, k), d.return = f, d) : (d = l(d, h.children || []), d.return = f, d);
  }
  function g(f, d, h, k, _) {
    return d === null || d.tag !== 7 ? (d = Dt(h, f.mode, k, _), d.return = f, d) : (d = l(d, h), d.return = f, d);
  }
  function p(f, d, h) {
    if (typeof d == "string" && d !== "" || typeof d == "number") return d = to("" + d, f.mode, h), d.return = f, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case hr:
          return h = Ur(d.type, d.key, d.props, null, f.mode, h), h.ref = _n(f, null, d), h.return = f, h;
        case Wt:
          return d = no(d, f.mode, h), d.return = f, d;
        case ot:
          var k = d._init;
          return p(f, k(d._payload), h);
      }
      if (Tn(d) || wn(d)) return d = Dt(d, f.mode, h, null), d.return = f, d;
      _r(f, d);
    }
    return null;
  }
  function v(f, d, h, k) {
    var _ = d !== null ? d.key : null;
    if (typeof h == "string" && h !== "" || typeof h == "number") return _ !== null ? null : s(f, d, "" + h, k);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case hr:
          return h.key === _ ? u(f, d, h, k) : null;
        case Wt:
          return h.key === _ ? c(f, d, h, k) : null;
        case ot:
          return _ = h._init, v(
            f,
            d,
            _(h._payload),
            k
          );
      }
      if (Tn(h) || wn(h)) return _ !== null ? null : g(f, d, h, k, null);
      _r(f, h);
    }
    return null;
  }
  function m(f, d, h, k, _) {
    if (typeof k == "string" && k !== "" || typeof k == "number") return f = f.get(h) || null, s(d, f, "" + k, _);
    if (typeof k == "object" && k !== null) {
      switch (k.$$typeof) {
        case hr:
          return f = f.get(k.key === null ? h : k.key) || null, u(d, f, k, _);
        case Wt:
          return f = f.get(k.key === null ? h : k.key) || null, c(d, f, k, _);
        case ot:
          var j = k._init;
          return m(f, d, h, j(k._payload), _);
      }
      if (Tn(k) || wn(k)) return f = f.get(h) || null, g(d, f, k, _, null);
      _r(d, k);
    }
    return null;
  }
  function y(f, d, h, k) {
    for (var _ = null, j = null, x = d, P = d = 0, $ = null; x !== null && P < h.length; P++) {
      x.index > P ? ($ = x, x = null) : $ = x.sibling;
      var C = v(f, x, h[P], k);
      if (C === null) {
        x === null && (x = $);
        break;
      }
      e && x && C.alternate === null && t(f, x), d = o(C, d, P), j === null ? _ = C : j.sibling = C, j = C, x = $;
    }
    if (P === h.length) return n(f, x), V && bt(f, P), _;
    if (x === null) {
      for (; P < h.length; P++) x = p(f, h[P], k), x !== null && (d = o(x, d, P), j === null ? _ = x : j.sibling = x, j = x);
      return V && bt(f, P), _;
    }
    for (x = r(f, x); P < h.length; P++) $ = m(x, f, P, h[P], k), $ !== null && (e && $.alternate !== null && x.delete($.key === null ? P : $.key), d = o($, d, P), j === null ? _ = $ : j.sibling = $, j = $);
    return e && x.forEach(function(Z) {
      return t(f, Z);
    }), V && bt(f, P), _;
  }
  function w(f, d, h, k) {
    var _ = wn(h);
    if (typeof _ != "function") throw Error(N(150));
    if (h = _.call(h), h == null) throw Error(N(151));
    for (var j = _ = null, x = d, P = d = 0, $ = null, C = h.next(); x !== null && !C.done; P++, C = h.next()) {
      x.index > P ? ($ = x, x = null) : $ = x.sibling;
      var Z = v(f, x, C.value, k);
      if (Z === null) {
        x === null && (x = $);
        break;
      }
      e && x && Z.alternate === null && t(f, x), d = o(Z, d, P), j === null ? _ = Z : j.sibling = Z, j = Z, x = $;
    }
    if (C.done) return n(
      f,
      x
    ), V && bt(f, P), _;
    if (x === null) {
      for (; !C.done; P++, C = h.next()) C = p(f, C.value, k), C !== null && (d = o(C, d, P), j === null ? _ = C : j.sibling = C, j = C);
      return V && bt(f, P), _;
    }
    for (x = r(f, x); !C.done; P++, C = h.next()) C = m(x, f, P, C.value, k), C !== null && (e && C.alternate !== null && x.delete(C.key === null ? P : C.key), d = o(C, d, P), j === null ? _ = C : j.sibling = C, j = C);
    return e && x.forEach(function(oe) {
      return t(f, oe);
    }), V && bt(f, P), _;
  }
  function T(f, d, h, k) {
    if (typeof h == "object" && h !== null && h.type === Qt && h.key === null && (h = h.props.children), typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case hr:
          e: {
            for (var _ = h.key, j = d; j !== null; ) {
              if (j.key === _) {
                if (_ = h.type, _ === Qt) {
                  if (j.tag === 7) {
                    n(f, j.sibling), d = l(j, h.props.children), d.return = f, f = d;
                    break e;
                  }
                } else if (j.elementType === _ || typeof _ == "object" && _ !== null && _.$$typeof === ot && za(_) === j.type) {
                  n(f, j.sibling), d = l(j, h.props), d.ref = _n(f, j, h), d.return = f, f = d;
                  break e;
                }
                n(f, j);
                break;
              } else t(f, j);
              j = j.sibling;
            }
            h.type === Qt ? (d = Dt(h.props.children, f.mode, k, h.key), d.return = f, f = d) : (k = Ur(h.type, h.key, h.props, null, f.mode, k), k.ref = _n(f, d, h), k.return = f, f = k);
          }
          return i(f);
        case Wt:
          e: {
            for (j = h.key; d !== null; ) {
              if (d.key === j) if (d.tag === 4 && d.stateNode.containerInfo === h.containerInfo && d.stateNode.implementation === h.implementation) {
                n(f, d.sibling), d = l(d, h.children || []), d.return = f, f = d;
                break e;
              } else {
                n(f, d);
                break;
              }
              else t(f, d);
              d = d.sibling;
            }
            d = no(h, f.mode, k), d.return = f, f = d;
          }
          return i(f);
        case ot:
          return j = h._init, T(f, d, j(h._payload), k);
      }
      if (Tn(h)) return y(f, d, h, k);
      if (wn(h)) return w(f, d, h, k);
      _r(f, h);
    }
    return typeof h == "string" && h !== "" || typeof h == "number" ? (h = "" + h, d !== null && d.tag === 6 ? (n(f, d.sibling), d = l(d, h), d.return = f, f = d) : (n(f, d), d = to(h, f.mode, k), d.return = f, f = d), i(f)) : n(f, d);
  }
  return T;
}
var pn = vu(!0), gu = vu(!1), rl = St(null), ll = null, en = null, wi = null;
function ki() {
  wi = en = ll = null;
}
function Si(e) {
  var t = rl.current;
  H(rl), e._currentValue = t;
}
function Mo(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function sn(e, t) {
  ll = e, wi = en = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (me = !0), e.firstContext = null);
}
function Te(e) {
  var t = e._currentValue;
  if (wi !== e) if (e = { context: e, memoizedValue: t, next: null }, en === null) {
    if (ll === null) throw Error(N(308));
    en = e, ll.dependencies = { lanes: 0, firstContext: e };
  } else en = en.next = e;
  return t;
}
var Lt = null;
function ji(e) {
  Lt === null ? Lt = [e] : Lt.push(e);
}
function yu(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, ji(t)) : (n.next = l.next, l.next = n), t.interleaved = n, et(e, r);
}
function et(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var it = !1;
function Ni(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function xu(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ge(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function mt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, F & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, et(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, ji(r)) : (t.next = l.next, l.next = t), r.interleaved = t, et(e, n);
}
function Rr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ui(e, n);
  }
}
function ba(e, t) {
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
function ol(e, t, n, r) {
  var l = e.updateQueue;
  it = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var u = s, c = u.next;
    u.next = null, i === null ? o = c : i.next = c, i = u;
    var g = e.alternate;
    g !== null && (g = g.updateQueue, s = g.lastBaseUpdate, s !== i && (s === null ? g.firstBaseUpdate = c : s.next = c, g.lastBaseUpdate = u));
  }
  if (o !== null) {
    var p = l.baseState;
    i = 0, g = c = u = null, s = o;
    do {
      var v = s.lane, m = s.eventTime;
      if ((r & v) === v) {
        g !== null && (g = g.next = {
          eventTime: m,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var y = e, w = s;
          switch (v = t, m = n, w.tag) {
            case 1:
              if (y = w.payload, typeof y == "function") {
                p = y.call(m, p, v);
                break e;
              }
              p = y;
              break e;
            case 3:
              y.flags = y.flags & -65537 | 128;
            case 0:
              if (y = w.payload, v = typeof y == "function" ? y.call(m, p, v) : y, v == null) break e;
              p = K({}, p, v);
              break e;
            case 2:
              it = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, v = l.effects, v === null ? l.effects = [s] : v.push(s));
      } else m = { eventTime: m, lane: v, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, g === null ? (c = g = m, u = p) : g = g.next = m, i |= v;
      if (s = s.next, s === null) {
        if (s = l.shared.pending, s === null) break;
        v = s, s = v.next, v.next = null, l.lastBaseUpdate = v, l.shared.pending = null;
      }
    } while (!0);
    if (g === null && (u = p), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = g, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    At |= i, e.lanes = i, e.memoizedState = p;
  }
}
function Ta(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(N(191, l));
      l.call(r);
    }
  }
}
var cr = {}, Qe = St(cr), er = St(cr), tr = St(cr);
function Mt(e) {
  if (e === cr) throw Error(N(174));
  return e;
}
function _i(e, t) {
  switch (U(tr, t), U(er, e), U(Qe, cr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : po(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = po(t, e);
  }
  H(Qe), U(Qe, t);
}
function hn() {
  H(Qe), H(er), H(tr);
}
function wu(e) {
  Mt(tr.current);
  var t = Mt(Qe.current), n = po(t, e.type);
  t !== n && (U(er, e), U(Qe, n));
}
function Ci(e) {
  er.current === e && (H(Qe), H(er));
}
var W = St(0);
function il(e) {
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
var Xl = [];
function Ei() {
  for (var e = 0; e < Xl.length; e++) Xl[e]._workInProgressVersionPrimary = null;
  Xl.length = 0;
}
var Dr = nt.ReactCurrentDispatcher, Zl = nt.ReactCurrentBatchConfig, It = 0, Q = null, J = null, ee = null, al = !1, Fn = !1, nr = 0, vf = 0;
function ie() {
  throw Error(N(321));
}
function zi(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ae(e[n], t[n])) return !1;
  return !0;
}
function bi(e, t, n, r, l, o) {
  if (It = o, Q = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Dr.current = e === null || e.memoizedState === null ? wf : kf, e = n(r, l), Fn) {
    o = 0;
    do {
      if (Fn = !1, nr = 0, 25 <= o) throw Error(N(301));
      o += 1, ee = J = null, t.updateQueue = null, Dr.current = Sf, e = n(r, l);
    } while (Fn);
  }
  if (Dr.current = sl, t = J !== null && J.next !== null, It = 0, ee = J = Q = null, al = !1, t) throw Error(N(300));
  return e;
}
function Ti() {
  var e = nr !== 0;
  return nr = 0, e;
}
function He() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ee === null ? Q.memoizedState = ee = e : ee = ee.next = e, ee;
}
function Pe() {
  if (J === null) {
    var e = Q.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = J.next;
  var t = ee === null ? Q.memoizedState : ee.next;
  if (t !== null) ee = t, J = e;
  else {
    if (e === null) throw Error(N(310));
    J = e, e = { memoizedState: J.memoizedState, baseState: J.baseState, baseQueue: J.baseQueue, queue: J.queue, next: null }, ee === null ? Q.memoizedState = ee = e : ee = ee.next = e;
  }
  return ee;
}
function rr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Gl(e) {
  var t = Pe(), n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = J, l = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      l.next = o.next, o.next = i;
    }
    r.baseQueue = l = o, n.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var s = i = null, u = null, c = o;
    do {
      var g = c.lane;
      if ((It & g) === g) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var p = {
          lane: g,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (s = u = p, i = r) : u = u.next = p, Q.lanes |= g, At |= g;
      }
      c = c.next;
    } while (c !== null && c !== o);
    u === null ? i = r : u.next = s, Ae(r, t.memoizedState) || (me = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, Q.lanes |= o, At |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Jl(e) {
  var t = Pe(), n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    Ae(o, t.memoizedState) || (me = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function ku() {
}
function Su(e, t) {
  var n = Q, r = Pe(), l = t(), o = !Ae(r.memoizedState, l);
  if (o && (r.memoizedState = l, me = !0), r = r.queue, Pi(_u.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || ee !== null && ee.memoizedState.tag & 1) {
    if (n.flags |= 2048, lr(9, Nu.bind(null, n, r, l, t), void 0, null), te === null) throw Error(N(349));
    It & 30 || ju(n, t, l);
  }
  return l;
}
function ju(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Nu(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Cu(t) && Eu(e);
}
function _u(e, t, n) {
  return n(function() {
    Cu(t) && Eu(e);
  });
}
function Cu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ae(e, n);
  } catch {
    return !0;
  }
}
function Eu(e) {
  var t = et(e, 1);
  t !== null && Ie(t, e, 1, -1);
}
function Pa(e) {
  var t = He();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: rr, lastRenderedState: e }, t.queue = e, e = e.dispatch = xf.bind(null, Q, e), [t.memoizedState, e];
}
function lr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function zu() {
  return Pe().memoizedState;
}
function Or(e, t, n, r) {
  var l = He();
  Q.flags |= e, l.memoizedState = lr(1 | t, n, void 0, r === void 0 ? null : r);
}
function Sl(e, t, n, r) {
  var l = Pe();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (J !== null) {
    var i = J.memoizedState;
    if (o = i.destroy, r !== null && zi(r, i.deps)) {
      l.memoizedState = lr(t, n, o, r);
      return;
    }
  }
  Q.flags |= e, l.memoizedState = lr(1 | t, n, o, r);
}
function La(e, t) {
  return Or(8390656, 8, e, t);
}
function Pi(e, t) {
  return Sl(2048, 8, e, t);
}
function bu(e, t) {
  return Sl(4, 2, e, t);
}
function Tu(e, t) {
  return Sl(4, 4, e, t);
}
function Pu(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Lu(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Sl(4, 4, Pu.bind(null, t, e), n);
}
function Li() {
}
function Mu(e, t) {
  var n = Pe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && zi(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function $u(e, t) {
  var n = Pe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && zi(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Ru(e, t, n) {
  return It & 21 ? (Ae(n, t) || (n = As(), Q.lanes |= n, At |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, me = !0), e.memoizedState = n);
}
function gf(e, t) {
  var n = A;
  A = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Zl.transition;
  Zl.transition = {};
  try {
    e(!1), t();
  } finally {
    A = n, Zl.transition = r;
  }
}
function Du() {
  return Pe().memoizedState;
}
function yf(e, t, n) {
  var r = gt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Ou(e)) Fu(t, n);
  else if (n = yu(e, t, n, r), n !== null) {
    var l = de();
    Ie(n, e, r, l), Iu(n, t, r);
  }
}
function xf(e, t, n) {
  var r = gt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Ou(e)) Fu(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, s = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = s, Ae(s, i)) {
        var u = t.interleaved;
        u === null ? (l.next = l, ji(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = yu(e, t, l, r), n !== null && (l = de(), Ie(n, e, r, l), Iu(n, t, r));
  }
}
function Ou(e) {
  var t = e.alternate;
  return e === Q || t !== null && t === Q;
}
function Fu(e, t) {
  Fn = al = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Iu(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ui(e, n);
  }
}
var sl = { readContext: Te, useCallback: ie, useContext: ie, useEffect: ie, useImperativeHandle: ie, useInsertionEffect: ie, useLayoutEffect: ie, useMemo: ie, useReducer: ie, useRef: ie, useState: ie, useDebugValue: ie, useDeferredValue: ie, useTransition: ie, useMutableSource: ie, useSyncExternalStore: ie, useId: ie, unstable_isNewReconciler: !1 }, wf = { readContext: Te, useCallback: function(e, t) {
  return He().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Te, useEffect: La, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Or(
    4194308,
    4,
    Pu.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Or(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Or(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = He();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = He();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = yf.bind(null, Q, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = He();
  return e = { current: e }, t.memoizedState = e;
}, useState: Pa, useDebugValue: Li, useDeferredValue: function(e) {
  return He().memoizedState = e;
}, useTransition: function() {
  var e = Pa(!1), t = e[0];
  return e = gf.bind(null, e[1]), He().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Q, l = He();
  if (V) {
    if (n === void 0) throw Error(N(407));
    n = n();
  } else {
    if (n = t(), te === null) throw Error(N(349));
    It & 30 || ju(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, La(_u.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, lr(9, Nu.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = He(), t = te.identifierPrefix;
  if (V) {
    var n = Ze, r = Xe;
    n = (r & ~(1 << 32 - Fe(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = nr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = vf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, kf = {
  readContext: Te,
  useCallback: Mu,
  useContext: Te,
  useEffect: Pi,
  useImperativeHandle: Lu,
  useInsertionEffect: bu,
  useLayoutEffect: Tu,
  useMemo: $u,
  useReducer: Gl,
  useRef: zu,
  useState: function() {
    return Gl(rr);
  },
  useDebugValue: Li,
  useDeferredValue: function(e) {
    var t = Pe();
    return Ru(t, J.memoizedState, e);
  },
  useTransition: function() {
    var e = Gl(rr)[0], t = Pe().memoizedState;
    return [e, t];
  },
  useMutableSource: ku,
  useSyncExternalStore: Su,
  useId: Du,
  unstable_isNewReconciler: !1
}, Sf = { readContext: Te, useCallback: Mu, useContext: Te, useEffect: Pi, useImperativeHandle: Lu, useInsertionEffect: bu, useLayoutEffect: Tu, useMemo: $u, useReducer: Jl, useRef: zu, useState: function() {
  return Jl(rr);
}, useDebugValue: Li, useDeferredValue: function(e) {
  var t = Pe();
  return J === null ? t.memoizedState = e : Ru(t, J.memoizedState, e);
}, useTransition: function() {
  var e = Jl(rr)[0], t = Pe().memoizedState;
  return [e, t];
}, useMutableSource: ku, useSyncExternalStore: Su, useId: Du, unstable_isNewReconciler: !1 };
function Re(e, t) {
  if (e && e.defaultProps) {
    t = K({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function $o(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : K({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var jl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Ht(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = de(), l = gt(e), o = Ge(r, l);
  o.payload = t, n != null && (o.callback = n), t = mt(e, o, l), t !== null && (Ie(t, e, l, r), Rr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = de(), l = gt(e), o = Ge(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = mt(e, o, l), t !== null && (Ie(t, e, l, r), Rr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = de(), r = gt(e), l = Ge(n, r);
  l.tag = 2, t != null && (l.callback = t), t = mt(e, l, r), t !== null && (Ie(t, e, r, n), Rr(t, e, r));
} };
function Ma(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Zn(n, r) || !Zn(l, o) : !0;
}
function Au(e, t, n) {
  var r = !1, l = wt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Te(o) : (l = ge(t) ? Ot : ue.current, r = t.contextTypes, o = (r = r != null) ? dn(e, l) : wt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = jl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function $a(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && jl.enqueueReplaceState(t, t.state, null);
}
function Ro(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Ni(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = Te(o) : (o = ge(t) ? Ot : ue.current, l.context = dn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && ($o(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && jl.enqueueReplaceState(l, l.state, null), ol(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function mn(e, t) {
  try {
    var n = "", r = t;
    do
      n += Xc(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ql(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Do(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var jf = typeof WeakMap == "function" ? WeakMap : Map;
function Uu(e, t, n) {
  n = Ge(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    cl || (cl = !0, Qo = r), Do(e, t);
  }, n;
}
function Bu(e, t, n) {
  n = Ge(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Do(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Do(e, t), typeof r != "function" && (vt === null ? vt = /* @__PURE__ */ new Set([this]) : vt.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function Ra(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new jf();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Of.bind(null, e, t, n), t.then(e, e));
}
function Da(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Oa(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ge(-1, 1), t.tag = 2, mt(n, t, 1))), n.lanes |= 1), e);
}
var Nf = nt.ReactCurrentOwner, me = !1;
function ce(e, t, n, r) {
  t.child = e === null ? gu(t, null, n, r) : pn(t, e.child, n, r);
}
function Fa(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return sn(t, l), r = bi(e, t, n, r, o, l), n = Ti(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, tt(e, t, l)) : (V && n && gi(t), t.flags |= 1, ce(e, t, r, l), t.child);
}
function Ia(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Ai(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Hu(e, t, o, r, l)) : (e = Ur(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Zn, n(i, r) && e.ref === t.ref) return tt(e, t, l);
  }
  return t.flags |= 1, e = yt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Hu(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Zn(o, r) && e.ref === t.ref) if (me = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (me = !0);
    else return t.lanes = e.lanes, tt(e, t, l);
  }
  return Oo(e, t, n, r, l);
}
function Vu(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, U(nn, xe), xe |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, U(nn, xe), xe |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, U(nn, xe), xe |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, U(nn, xe), xe |= r;
  return ce(e, t, l, n), t.child;
}
function Wu(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Oo(e, t, n, r, l) {
  var o = ge(n) ? Ot : ue.current;
  return o = dn(t, o), sn(t, l), n = bi(e, t, n, r, o, l), r = Ti(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, tt(e, t, l)) : (V && r && gi(t), t.flags |= 1, ce(e, t, n, l), t.child);
}
function Aa(e, t, n, r, l) {
  if (ge(n)) {
    var o = !0;
    el(t);
  } else o = !1;
  if (sn(t, l), t.stateNode === null) Fr(e, t), Au(t, n, r), Ro(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, s = t.memoizedProps;
    i.props = s;
    var u = i.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Te(c) : (c = ge(n) ? Ot : ue.current, c = dn(t, c));
    var g = n.getDerivedStateFromProps, p = typeof g == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    p || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== r || u !== c) && $a(t, i, r, c), it = !1;
    var v = t.memoizedState;
    i.state = v, ol(t, r, i, l), u = t.memoizedState, s !== r || v !== u || ve.current || it ? (typeof g == "function" && ($o(t, n, g, r), u = t.memoizedState), (s = it || Ma(t, n, s, r, v, u, c)) ? (p || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), i.props = r, i.state = u, i.context = c, r = s) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, xu(e, t), s = t.memoizedProps, c = t.type === t.elementType ? s : Re(t.type, s), i.props = c, p = t.pendingProps, v = i.context, u = n.contextType, typeof u == "object" && u !== null ? u = Te(u) : (u = ge(n) ? Ot : ue.current, u = dn(t, u));
    var m = n.getDerivedStateFromProps;
    (g = typeof m == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== p || v !== u) && $a(t, i, r, u), it = !1, v = t.memoizedState, i.state = v, ol(t, r, i, l);
    var y = t.memoizedState;
    s !== p || v !== y || ve.current || it ? (typeof m == "function" && ($o(t, n, m, r), y = t.memoizedState), (c = it || Ma(t, n, c, r, v, y, u) || !1) ? (g || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, y, u), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, y, u)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && v === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && v === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = y), i.props = r, i.state = y, i.context = u, r = c) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && v === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && v === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Fo(e, t, n, r, o, l);
}
function Fo(e, t, n, r, l, o) {
  Wu(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && _a(t, n, !1), tt(e, t, o);
  r = t.stateNode, Nf.current = t;
  var s = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = pn(t, e.child, null, o), t.child = pn(t, null, s, o)) : ce(e, t, s, o), t.memoizedState = r.state, l && _a(t, n, !0), t.child;
}
function Qu(e) {
  var t = e.stateNode;
  t.pendingContext ? Na(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Na(e, t.context, !1), _i(e, t.containerInfo);
}
function Ua(e, t, n, r, l) {
  return fn(), xi(l), t.flags |= 256, ce(e, t, n, r), t.child;
}
var Io = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ao(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ku(e, t, n) {
  var r = t.pendingProps, l = W.current, o = !1, i = (t.flags & 128) !== 0, s;
  if ((s = i) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), U(W, l & 1), e === null)
    return Lo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = Cl(i, r, 0, null), e = Dt(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Ao(n), t.memoizedState = Io, e) : Mi(t, i));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null)) return _f(e, t, i, r, s, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, s = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = yt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? o = yt(s, o) : (o = Dt(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? Ao(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = Io, r;
  }
  return o = e.child, e = o.sibling, r = yt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Mi(e, t) {
  return t = Cl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Cr(e, t, n, r) {
  return r !== null && xi(r), pn(t, e.child, null, n), e = Mi(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function _f(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ql(Error(N(422))), Cr(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Cl({ mode: "visible", children: r.children }, l, 0, null), o = Dt(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && pn(t, e.child, null, i), t.child.memoizedState = Ao(i), t.memoizedState = Io, o);
  if (!(t.mode & 1)) return Cr(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var s = r.dgst;
    return r = s, o = Error(N(419)), r = ql(o, r, void 0), Cr(e, t, i, r);
  }
  if (s = (i & e.childLanes) !== 0, me || s) {
    if (r = te, r !== null) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, et(e, l), Ie(r, e, l, -1));
    }
    return Ii(), r = ql(Error(N(421))), Cr(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Ff.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, we = ht(l.nextSibling), ke = t, V = !0, Oe = null, e !== null && (Ce[Ee++] = Xe, Ce[Ee++] = Ze, Ce[Ee++] = Ft, Xe = e.id, Ze = e.overflow, Ft = t), t = Mi(t, r.children), t.flags |= 4096, t);
}
function Ba(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Mo(e.return, t, n);
}
function eo(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function Yu(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (ce(e, t, r.children, n), r = W.current, r & 2) r = r & 1 | 2, t.flags |= 128;
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
  if (U(W, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && il(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), eo(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && il(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      eo(t, !0, n, null, o);
      break;
    case "together":
      eo(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Fr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function tt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), At |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(N(153));
  if (t.child !== null) {
    for (e = t.child, n = yt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = yt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Cf(e, t, n) {
  switch (t.tag) {
    case 3:
      Qu(t), fn();
      break;
    case 5:
      wu(t);
      break;
    case 1:
      ge(t.type) && el(t);
      break;
    case 4:
      _i(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      U(rl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (U(W, W.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Ku(e, t, n) : (U(W, W.current & 1), e = tt(e, t, n), e !== null ? e.sibling : null);
      U(W, W.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Yu(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), U(W, W.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Vu(e, t, n);
  }
  return tt(e, t, n);
}
var Xu, Uo, Zu, Gu;
Xu = function(e, t) {
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
Zu = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Mt(Qe.current);
    var o = null;
    switch (n) {
      case "input":
        l = so(e, l), r = so(e, r), o = [];
        break;
      case "select":
        l = K({}, l, { value: void 0 }), r = K({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = fo(e, l), r = fo(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Jr);
    }
    ho(n, r);
    var i;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var s = l[c];
      for (i in s) s.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Hn.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (s = l != null ? l[c] : void 0, r.hasOwnProperty(c) && u !== s && (u != null || s != null)) if (c === "style") if (s) {
        for (i in s) !s.hasOwnProperty(i) || u && u.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in u) u.hasOwnProperty(i) && s[i] !== u[i] && (n || (n = {}), n[i] = u[i]);
      } else n || (o || (o = []), o.push(
        c,
        n
      )), n = u;
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, s = s ? s.__html : void 0, u != null && s !== u && (o = o || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Hn.hasOwnProperty(c) ? (u != null && c === "onScroll" && B("scroll", e), o || s === u || (o = [])) : (o = o || []).push(c, u));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
Gu = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Cn(e, t) {
  if (!V) switch (e.tailMode) {
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
function Ef(e, t, n) {
  var r = t.pendingProps;
  switch (yi(t), t.tag) {
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
      return ge(t.type) && qr(), ae(t), null;
    case 3:
      return r = t.stateNode, hn(), H(ve), H(ue), Ei(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Nr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Oe !== null && (Xo(Oe), Oe = null))), Uo(e, t), ae(t), null;
    case 5:
      Ci(t);
      var l = Mt(tr.current);
      if (n = t.type, e !== null && t.stateNode != null) Zu(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(N(166));
          return ae(t), null;
        }
        if (e = Mt(Qe.current), Nr(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Ve] = t, r[qn] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              B("cancel", r), B("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              B("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Ln.length; l++) B(Ln[l], r);
              break;
            case "source":
              B("error", r);
              break;
            case "img":
            case "image":
            case "link":
              B(
                "error",
                r
              ), B("load", r);
              break;
            case "details":
              B("toggle", r);
              break;
            case "input":
              Gi(r, o), B("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, B("invalid", r);
              break;
            case "textarea":
              qi(r, o), B("invalid", r);
          }
          ho(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var s = o[i];
            i === "children" ? typeof s == "string" ? r.textContent !== s && (o.suppressHydrationWarning !== !0 && jr(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (o.suppressHydrationWarning !== !0 && jr(
              r.textContent,
              s,
              e
            ), l = ["children", "" + s]) : Hn.hasOwnProperty(i) && s != null && i === "onScroll" && B("scroll", r);
          }
          switch (n) {
            case "input":
              mr(r), Ji(r, o, !0);
              break;
            case "textarea":
              mr(r), ea(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Jr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = _s(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[Ve] = t, e[qn] = r, Xu(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = mo(n, r), n) {
              case "dialog":
                B("cancel", e), B("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                B("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Ln.length; l++) B(Ln[l], e);
                l = r;
                break;
              case "source":
                B("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                B(
                  "error",
                  e
                ), B("load", e), l = r;
                break;
              case "details":
                B("toggle", e), l = r;
                break;
              case "input":
                Gi(e, r), l = so(e, r), B("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = K({}, r, { value: void 0 }), B("invalid", e);
                break;
              case "textarea":
                qi(e, r), l = fo(e, r), B("invalid", e);
                break;
              default:
                l = r;
            }
            ho(n, l), s = l;
            for (o in s) if (s.hasOwnProperty(o)) {
              var u = s[o];
              o === "style" ? zs(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Cs(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Vn(e, u) : typeof u == "number" && Vn(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Hn.hasOwnProperty(o) ? u != null && o === "onScroll" && B("scroll", e) : u != null && ri(e, o, u, i));
            }
            switch (n) {
              case "input":
                mr(e), Ji(e, r, !1);
                break;
              case "textarea":
                mr(e), ea(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + xt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? rn(e, !!r.multiple, o, !1) : r.defaultValue != null && rn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Jr);
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
      if (e && t.stateNode != null) Gu(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(N(166));
        if (n = Mt(tr.current), Mt(Qe.current), Nr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ve] = t, (o = r.nodeValue !== n) && (e = ke, e !== null)) switch (e.tag) {
            case 3:
              jr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && jr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ve] = t, t.stateNode = r;
      }
      return ae(t), null;
    case 13:
      if (H(W), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (V && we !== null && t.mode & 1 && !(t.flags & 128)) mu(), fn(), t.flags |= 98560, o = !1;
        else if (o = Nr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(N(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(N(317));
            o[Ve] = t;
          } else fn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ae(t), o = !1;
        } else Oe !== null && (Xo(Oe), Oe = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || W.current & 1 ? q === 0 && (q = 3) : Ii())), t.updateQueue !== null && (t.flags |= 4), ae(t), null);
    case 4:
      return hn(), Uo(e, t), e === null && Gn(t.stateNode.containerInfo), ae(t), null;
    case 10:
      return Si(t.type._context), ae(t), null;
    case 17:
      return ge(t.type) && qr(), ae(t), null;
    case 19:
      if (H(W), o = t.memoizedState, o === null) return ae(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) Cn(o, !1);
      else {
        if (q !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = il(e), i !== null) {
            for (t.flags |= 128, Cn(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return U(W, W.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && X() > vn && (t.flags |= 128, r = !0, Cn(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = il(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Cn(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !V) return ae(t), null;
        } else 2 * X() - o.renderingStartTime > vn && n !== 1073741824 && (t.flags |= 128, r = !0, Cn(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = X(), t.sibling = null, n = W.current, U(W, r ? n & 1 | 2 : n & 1), t) : (ae(t), null);
    case 22:
    case 23:
      return Fi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? xe & 1073741824 && (ae(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ae(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(N(156, t.tag));
}
function zf(e, t) {
  switch (yi(t), t.tag) {
    case 1:
      return ge(t.type) && qr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return hn(), H(ve), H(ue), Ei(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Ci(t), null;
    case 13:
      if (H(W), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(N(340));
        fn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return H(W), null;
    case 4:
      return hn(), null;
    case 10:
      return Si(t.type._context), null;
    case 22:
    case 23:
      return Fi(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Er = !1, se = !1, bf = typeof WeakSet == "function" ? WeakSet : Set, L = null;
function tn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    Y(e, t, r);
  }
  else n.current = null;
}
function Bo(e, t, n) {
  try {
    n();
  } catch (r) {
    Y(e, t, r);
  }
}
var Ha = !1;
function Tf(e, t) {
  if (_o = Xr, e = nu(), vi(e)) {
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
        var i = 0, s = -1, u = -1, c = 0, g = 0, p = e, v = null;
        t: for (; ; ) {
          for (var m; p !== n || l !== 0 && p.nodeType !== 3 || (s = i + l), p !== o || r !== 0 && p.nodeType !== 3 || (u = i + r), p.nodeType === 3 && (i += p.nodeValue.length), (m = p.firstChild) !== null; )
            v = p, p = m;
          for (; ; ) {
            if (p === e) break t;
            if (v === n && ++c === l && (s = i), v === o && ++g === r && (u = i), (m = p.nextSibling) !== null) break;
            p = v, v = p.parentNode;
          }
          p = m;
        }
        n = s === -1 || u === -1 ? null : { start: s, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Co = { focusedElem: e, selectionRange: n }, Xr = !1, L = t; L !== null; ) if (t = L, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, L = e;
  else for (; L !== null; ) {
    t = L;
    try {
      var y = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (y !== null) {
            var w = y.memoizedProps, T = y.memoizedState, f = t.stateNode, d = f.getSnapshotBeforeUpdate(t.elementType === t.type ? w : Re(t.type, w), T);
            f.__reactInternalSnapshotBeforeUpdate = d;
          }
          break;
        case 3:
          var h = t.stateNode.containerInfo;
          h.nodeType === 1 ? h.textContent = "" : h.nodeType === 9 && h.documentElement && h.removeChild(h.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(N(163));
      }
    } catch (k) {
      Y(t, t.return, k);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, L = e;
      break;
    }
    L = t.return;
  }
  return y = Ha, Ha = !1, y;
}
function In(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Bo(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Nl(e, t) {
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
function Ho(e) {
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
function Ju(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Ju(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ve], delete t[qn], delete t[bo], delete t[ff], delete t[pf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function qu(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Va(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || qu(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Vo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Jr));
  else if (r !== 4 && (e = e.child, e !== null)) for (Vo(e, t, n), e = e.sibling; e !== null; ) Vo(e, t, n), e = e.sibling;
}
function Wo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Wo(e, t, n), e = e.sibling; e !== null; ) Wo(e, t, n), e = e.sibling;
}
var ne = null, De = !1;
function lt(e, t, n) {
  for (n = n.child; n !== null; ) ec(e, t, n), n = n.sibling;
}
function ec(e, t, n) {
  if (We && typeof We.onCommitFiberUnmount == "function") try {
    We.onCommitFiberUnmount(vl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      se || tn(n, t);
    case 6:
      var r = ne, l = De;
      ne = null, lt(e, t, n), ne = r, De = l, ne !== null && (De ? (e = ne, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ne.removeChild(n.stateNode));
      break;
    case 18:
      ne !== null && (De ? (e = ne, n = n.stateNode, e.nodeType === 8 ? Kl(e.parentNode, n) : e.nodeType === 1 && Kl(e, n), Yn(e)) : Kl(ne, n.stateNode));
      break;
    case 4:
      r = ne, l = De, ne = n.stateNode.containerInfo, De = !0, lt(e, t, n), ne = r, De = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!se && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && Bo(n, t, i), l = l.next;
        } while (l !== r);
      }
      lt(e, t, n);
      break;
    case 1:
      if (!se && (tn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (s) {
        Y(n, t, s);
      }
      lt(e, t, n);
      break;
    case 21:
      lt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (se = (r = se) || n.memoizedState !== null, lt(e, t, n), se = r) : lt(e, t, n);
      break;
    default:
      lt(e, t, n);
  }
}
function Wa(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new bf()), t.forEach(function(r) {
      var l = If.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function $e(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, s = i;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 5:
            ne = s.stateNode, De = !1;
            break e;
          case 3:
            ne = s.stateNode.containerInfo, De = !0;
            break e;
          case 4:
            ne = s.stateNode.containerInfo, De = !0;
            break e;
        }
        s = s.return;
      }
      if (ne === null) throw Error(N(160));
      ec(o, i, l), ne = null, De = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (c) {
      Y(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) tc(t, e), t = t.sibling;
}
function tc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ($e(t, e), Be(e), r & 4) {
        try {
          In(3, e, e.return), Nl(3, e);
        } catch (w) {
          Y(e, e.return, w);
        }
        try {
          In(5, e, e.return);
        } catch (w) {
          Y(e, e.return, w);
        }
      }
      break;
    case 1:
      $e(t, e), Be(e), r & 512 && n !== null && tn(n, n.return);
      break;
    case 5:
      if ($e(t, e), Be(e), r & 512 && n !== null && tn(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Vn(l, "");
        } catch (w) {
          Y(e, e.return, w);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, s = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          s === "input" && o.type === "radio" && o.name != null && js(l, o), mo(s, i);
          var c = mo(s, o);
          for (i = 0; i < u.length; i += 2) {
            var g = u[i], p = u[i + 1];
            g === "style" ? zs(l, p) : g === "dangerouslySetInnerHTML" ? Cs(l, p) : g === "children" ? Vn(l, p) : ri(l, g, p, c);
          }
          switch (s) {
            case "input":
              uo(l, o);
              break;
            case "textarea":
              Ns(l, o);
              break;
            case "select":
              var v = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var m = o.value;
              m != null ? rn(l, !!o.multiple, m, !1) : v !== !!o.multiple && (o.defaultValue != null ? rn(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : rn(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[qn] = o;
        } catch (w) {
          Y(e, e.return, w);
        }
      }
      break;
    case 6:
      if ($e(t, e), Be(e), r & 4) {
        if (e.stateNode === null) throw Error(N(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (w) {
          Y(e, e.return, w);
        }
      }
      break;
    case 3:
      if ($e(t, e), Be(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Yn(t.containerInfo);
      } catch (w) {
        Y(e, e.return, w);
      }
      break;
    case 4:
      $e(t, e), Be(e);
      break;
    case 13:
      $e(t, e), Be(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Di = X())), r & 4 && Wa(e);
      break;
    case 22:
      if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (se = (c = se) || g, $e(t, e), se = c) : $e(t, e), Be(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !g && e.mode & 1) for (L = e, g = e.child; g !== null; ) {
          for (p = L = g; L !== null; ) {
            switch (v = L, m = v.child, v.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                In(4, v, v.return);
                break;
              case 1:
                tn(v, v.return);
                var y = v.stateNode;
                if (typeof y.componentWillUnmount == "function") {
                  r = v, n = v.return;
                  try {
                    t = r, y.props = t.memoizedProps, y.state = t.memoizedState, y.componentWillUnmount();
                  } catch (w) {
                    Y(r, n, w);
                  }
                }
                break;
              case 5:
                tn(v, v.return);
                break;
              case 22:
                if (v.memoizedState !== null) {
                  Ka(p);
                  continue;
                }
            }
            m !== null ? (m.return = v, L = m) : Ka(p);
          }
          g = g.sibling;
        }
        e: for (g = null, p = e; ; ) {
          if (p.tag === 5) {
            if (g === null) {
              g = p;
              try {
                l = p.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (s = p.stateNode, u = p.memoizedProps.style, i = u != null && u.hasOwnProperty("display") ? u.display : null, s.style.display = Es("display", i));
              } catch (w) {
                Y(e, e.return, w);
              }
            }
          } else if (p.tag === 6) {
            if (g === null) try {
              p.stateNode.nodeValue = c ? "" : p.memoizedProps;
            } catch (w) {
              Y(e, e.return, w);
            }
          } else if ((p.tag !== 22 && p.tag !== 23 || p.memoizedState === null || p === e) && p.child !== null) {
            p.child.return = p, p = p.child;
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            g === p && (g = null), p = p.return;
          }
          g === p && (g = null), p.sibling.return = p.return, p = p.sibling;
        }
      }
      break;
    case 19:
      $e(t, e), Be(e), r & 4 && Wa(e);
      break;
    case 21:
      break;
    default:
      $e(
        t,
        e
      ), Be(e);
  }
}
function Be(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (qu(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(N(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Vn(l, ""), r.flags &= -33);
          var o = Va(e);
          Wo(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, s = Va(e);
          Vo(e, s, i);
          break;
        default:
          throw Error(N(161));
      }
    } catch (u) {
      Y(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Pf(e, t, n) {
  L = e, nc(e);
}
function nc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; L !== null; ) {
    var l = L, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Er;
      if (!i) {
        var s = l.alternate, u = s !== null && s.memoizedState !== null || se;
        s = Er;
        var c = se;
        if (Er = i, (se = u) && !c) for (L = l; L !== null; ) i = L, u = i.child, i.tag === 22 && i.memoizedState !== null ? Ya(l) : u !== null ? (u.return = i, L = u) : Ya(l);
        for (; o !== null; ) L = o, nc(o), o = o.sibling;
        L = l, Er = s, se = c;
      }
      Qa(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, L = o) : Qa(e);
  }
}
function Qa(e) {
  for (; L !== null; ) {
    var t = L;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            se || Nl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !se) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Re(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Ta(t, o, r);
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
              Ta(t, i, n);
            }
            break;
          case 5:
            var s = t.stateNode;
            if (n === null && t.flags & 4) {
              n = s;
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
                var g = c.memoizedState;
                if (g !== null) {
                  var p = g.dehydrated;
                  p !== null && Yn(p);
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
            throw Error(N(163));
        }
        se || t.flags & 512 && Ho(t);
      } catch (v) {
        Y(t, t.return, v);
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
function Ka(e) {
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
function Ya(e) {
  for (; L !== null; ) {
    var t = L;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Nl(4, t);
          } catch (u) {
            Y(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              Y(t, l, u);
            }
          }
          var o = t.return;
          try {
            Ho(t);
          } catch (u) {
            Y(t, o, u);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Ho(t);
          } catch (u) {
            Y(t, i, u);
          }
      }
    } catch (u) {
      Y(t, t.return, u);
    }
    if (t === e) {
      L = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      s.return = t.return, L = s;
      break;
    }
    L = t.return;
  }
}
var Lf = Math.ceil, ul = nt.ReactCurrentDispatcher, $i = nt.ReactCurrentOwner, be = nt.ReactCurrentBatchConfig, F = 0, te = null, G = null, re = 0, xe = 0, nn = St(0), q = 0, or = null, At = 0, _l = 0, Ri = 0, An = null, he = null, Di = 0, vn = 1 / 0, Ke = null, cl = !1, Qo = null, vt = null, zr = !1, ct = null, dl = 0, Un = 0, Ko = null, Ir = -1, Ar = 0;
function de() {
  return F & 6 ? X() : Ir !== -1 ? Ir : Ir = X();
}
function gt(e) {
  return e.mode & 1 ? F & 2 && re !== 0 ? re & -re : mf.transition !== null ? (Ar === 0 && (Ar = As()), Ar) : (e = A, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ks(e.type)), e) : 1;
}
function Ie(e, t, n, r) {
  if (50 < Un) throw Un = 0, Ko = null, Error(N(185));
  ar(e, n, r), (!(F & 2) || e !== te) && (e === te && (!(F & 2) && (_l |= n), q === 4 && st(e, re)), ye(e, r), n === 1 && F === 0 && !(t.mode & 1) && (vn = X() + 500, kl && jt()));
}
function ye(e, t) {
  var n = e.callbackNode;
  hd(e, t);
  var r = Yr(e, e === te ? re : 0);
  if (r === 0) n !== null && ra(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && ra(n), t === 1) e.tag === 0 ? hf(Xa.bind(null, e)) : fu(Xa.bind(null, e)), cf(function() {
      !(F & 6) && jt();
    }), n = null;
    else {
      switch (Us(r)) {
        case 1:
          n = si;
          break;
        case 4:
          n = Fs;
          break;
        case 16:
          n = Kr;
          break;
        case 536870912:
          n = Is;
          break;
        default:
          n = Kr;
      }
      n = cc(n, rc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function rc(e, t) {
  if (Ir = -1, Ar = 0, F & 6) throw Error(N(327));
  var n = e.callbackNode;
  if (un() && e.callbackNode !== n) return null;
  var r = Yr(e, e === te ? re : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = fl(e, r);
  else {
    t = r;
    var l = F;
    F |= 2;
    var o = oc();
    (te !== e || re !== t) && (Ke = null, vn = X() + 500, Rt(e, t));
    do
      try {
        Rf();
        break;
      } catch (s) {
        lc(e, s);
      }
    while (!0);
    ki(), ul.current = o, F = l, G !== null ? t = 0 : (te = null, re = 0, t = q);
  }
  if (t !== 0) {
    if (t === 2 && (l = wo(e), l !== 0 && (r = l, t = Yo(e, l))), t === 1) throw n = or, Rt(e, 0), st(e, r), ye(e, X()), n;
    if (t === 6) st(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Mf(l) && (t = fl(e, r), t === 2 && (o = wo(e), o !== 0 && (r = o, t = Yo(e, o))), t === 1)) throw n = or, Rt(e, 0), st(e, r), ye(e, X()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          Tt(e, he, Ke);
          break;
        case 3:
          if (st(e, r), (r & 130023424) === r && (t = Di + 500 - X(), 10 < t)) {
            if (Yr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              de(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = zo(Tt.bind(null, e, he, Ke), t);
            break;
          }
          Tt(e, he, Ke);
          break;
        case 4:
          if (st(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - Fe(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = X() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Lf(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = zo(Tt.bind(null, e, he, Ke), r);
            break;
          }
          Tt(e, he, Ke);
          break;
        case 5:
          Tt(e, he, Ke);
          break;
        default:
          throw Error(N(329));
      }
    }
  }
  return ye(e, X()), e.callbackNode === n ? rc.bind(null, e) : null;
}
function Yo(e, t) {
  var n = An;
  return e.current.memoizedState.isDehydrated && (Rt(e, t).flags |= 256), e = fl(e, t), e !== 2 && (t = he, he = n, t !== null && Xo(t)), e;
}
function Xo(e) {
  he === null ? he = e : he.push.apply(he, e);
}
function Mf(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!Ae(o(), l)) return !1;
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
function st(e, t) {
  for (t &= ~Ri, t &= ~_l, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Fe(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Xa(e) {
  if (F & 6) throw Error(N(327));
  un();
  var t = Yr(e, 0);
  if (!(t & 1)) return ye(e, X()), null;
  var n = fl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = wo(e);
    r !== 0 && (t = r, n = Yo(e, r));
  }
  if (n === 1) throw n = or, Rt(e, 0), st(e, t), ye(e, X()), n;
  if (n === 6) throw Error(N(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Tt(e, he, Ke), ye(e, X()), null;
}
function Oi(e, t) {
  var n = F;
  F |= 1;
  try {
    return e(t);
  } finally {
    F = n, F === 0 && (vn = X() + 500, kl && jt());
  }
}
function Ut(e) {
  ct !== null && ct.tag === 0 && !(F & 6) && un();
  var t = F;
  F |= 1;
  var n = be.transition, r = A;
  try {
    if (be.transition = null, A = 1, e) return e();
  } finally {
    A = r, be.transition = n, F = t, !(F & 6) && jt();
  }
}
function Fi() {
  xe = nn.current, H(nn);
}
function Rt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, uf(n)), G !== null) for (n = G.return; n !== null; ) {
    var r = n;
    switch (yi(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && qr();
        break;
      case 3:
        hn(), H(ve), H(ue), Ei();
        break;
      case 5:
        Ci(r);
        break;
      case 4:
        hn();
        break;
      case 13:
        H(W);
        break;
      case 19:
        H(W);
        break;
      case 10:
        Si(r.type._context);
        break;
      case 22:
      case 23:
        Fi();
    }
    n = n.return;
  }
  if (te = e, G = e = yt(e.current, null), re = xe = t, q = 0, or = null, Ri = _l = At = 0, he = An = null, Lt !== null) {
    for (t = 0; t < Lt.length; t++) if (n = Lt[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var i = o.next;
        o.next = l, r.next = i;
      }
      n.pending = r;
    }
    Lt = null;
  }
  return e;
}
function lc(e, t) {
  do {
    var n = G;
    try {
      if (ki(), Dr.current = sl, al) {
        for (var r = Q.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        al = !1;
      }
      if (It = 0, ee = J = Q = null, Fn = !1, nr = 0, $i.current = null, n === null || n.return === null) {
        q = 1, or = t, G = null;
        break;
      }
      e: {
        var o = e, i = n.return, s = n, u = t;
        if (t = re, s.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, g = s, p = g.tag;
          if (!(g.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var v = g.alternate;
            v ? (g.updateQueue = v.updateQueue, g.memoizedState = v.memoizedState, g.lanes = v.lanes) : (g.updateQueue = null, g.memoizedState = null);
          }
          var m = Da(i);
          if (m !== null) {
            m.flags &= -257, Oa(m, i, s, o, t), m.mode & 1 && Ra(o, c, t), t = m, u = c;
            var y = t.updateQueue;
            if (y === null) {
              var w = /* @__PURE__ */ new Set();
              w.add(u), t.updateQueue = w;
            } else y.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Ra(o, c, t), Ii();
              break e;
            }
            u = Error(N(426));
          }
        } else if (V && s.mode & 1) {
          var T = Da(i);
          if (T !== null) {
            !(T.flags & 65536) && (T.flags |= 256), Oa(T, i, s, o, t), xi(mn(u, s));
            break e;
          }
        }
        o = u = mn(u, s), q !== 4 && (q = 2), An === null ? An = [o] : An.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var f = Uu(o, u, t);
              ba(o, f);
              break e;
            case 1:
              s = u;
              var d = o.type, h = o.stateNode;
              if (!(o.flags & 128) && (typeof d.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (vt === null || !vt.has(h)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var k = Bu(o, s, t);
                ba(o, k);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      ac(n);
    } catch (_) {
      t = _, G === n && n !== null && (G = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function oc() {
  var e = ul.current;
  return ul.current = sl, e === null ? sl : e;
}
function Ii() {
  (q === 0 || q === 3 || q === 2) && (q = 4), te === null || !(At & 268435455) && !(_l & 268435455) || st(te, re);
}
function fl(e, t) {
  var n = F;
  F |= 2;
  var r = oc();
  (te !== e || re !== t) && (Ke = null, Rt(e, t));
  do
    try {
      $f();
      break;
    } catch (l) {
      lc(e, l);
    }
  while (!0);
  if (ki(), F = n, ul.current = r, G !== null) throw Error(N(261));
  return te = null, re = 0, q;
}
function $f() {
  for (; G !== null; ) ic(G);
}
function Rf() {
  for (; G !== null && !od(); ) ic(G);
}
function ic(e) {
  var t = uc(e.alternate, e, xe);
  e.memoizedProps = e.pendingProps, t === null ? ac(e) : G = t, $i.current = null;
}
function ac(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = zf(n, t), n !== null) {
        n.flags &= 32767, G = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        q = 6, G = null;
        return;
      }
    } else if (n = Ef(n, t, xe), n !== null) {
      G = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      G = t;
      return;
    }
    G = t = e;
  } while (t !== null);
  q === 0 && (q = 5);
}
function Tt(e, t, n) {
  var r = A, l = be.transition;
  try {
    be.transition = null, A = 1, Df(e, t, n, r);
  } finally {
    be.transition = l, A = r;
  }
  return null;
}
function Df(e, t, n, r) {
  do
    un();
  while (ct !== null);
  if (F & 6) throw Error(N(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(N(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (md(e, o), e === te && (G = te = null, re = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || zr || (zr = !0, cc(Kr, function() {
    return un(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = be.transition, be.transition = null;
    var i = A;
    A = 1;
    var s = F;
    F |= 4, $i.current = null, Tf(e, n), tc(n, e), tf(Co), Xr = !!_o, Co = _o = null, e.current = n, Pf(n), id(), F = s, A = i, be.transition = o;
  } else e.current = n;
  if (zr && (zr = !1, ct = e, dl = l), o = e.pendingLanes, o === 0 && (vt = null), ud(n.stateNode), ye(e, X()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (cl) throw cl = !1, e = Qo, Qo = null, e;
  return dl & 1 && e.tag !== 0 && un(), o = e.pendingLanes, o & 1 ? e === Ko ? Un++ : (Un = 0, Ko = e) : Un = 0, jt(), null;
}
function un() {
  if (ct !== null) {
    var e = Us(dl), t = be.transition, n = A;
    try {
      if (be.transition = null, A = 16 > e ? 16 : e, ct === null) var r = !1;
      else {
        if (e = ct, ct = null, dl = 0, F & 6) throw Error(N(331));
        var l = F;
        for (F |= 4, L = e.current; L !== null; ) {
          var o = L, i = o.child;
          if (L.flags & 16) {
            var s = o.deletions;
            if (s !== null) {
              for (var u = 0; u < s.length; u++) {
                var c = s[u];
                for (L = c; L !== null; ) {
                  var g = L;
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      In(8, g, o);
                  }
                  var p = g.child;
                  if (p !== null) p.return = g, L = p;
                  else for (; L !== null; ) {
                    g = L;
                    var v = g.sibling, m = g.return;
                    if (Ju(g), g === c) {
                      L = null;
                      break;
                    }
                    if (v !== null) {
                      v.return = m, L = v;
                      break;
                    }
                    L = m;
                  }
                }
              }
              var y = o.alternate;
              if (y !== null) {
                var w = y.child;
                if (w !== null) {
                  y.child = null;
                  do {
                    var T = w.sibling;
                    w.sibling = null, w = T;
                  } while (w !== null);
                }
              }
              L = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, L = i;
          else e: for (; L !== null; ) {
            if (o = L, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                In(9, o, o.return);
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
          i = L;
          var h = i.child;
          if (i.subtreeFlags & 2064 && h !== null) h.return = i, L = h;
          else e: for (i = d; L !== null; ) {
            if (s = L, s.flags & 2048) try {
              switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  Nl(9, s);
              }
            } catch (_) {
              Y(s, s.return, _);
            }
            if (s === i) {
              L = null;
              break e;
            }
            var k = s.sibling;
            if (k !== null) {
              k.return = s.return, L = k;
              break e;
            }
            L = s.return;
          }
        }
        if (F = l, jt(), We && typeof We.onPostCommitFiberRoot == "function") try {
          We.onPostCommitFiberRoot(vl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      A = n, be.transition = t;
    }
  }
  return !1;
}
function Za(e, t, n) {
  t = mn(n, t), t = Uu(e, t, 1), e = mt(e, t, 1), t = de(), e !== null && (ar(e, 1, t), ye(e, t));
}
function Y(e, t, n) {
  if (e.tag === 3) Za(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Za(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (vt === null || !vt.has(r))) {
        e = mn(n, e), e = Bu(t, e, 1), t = mt(t, e, 1), e = de(), t !== null && (ar(t, 1, e), ye(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Of(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = de(), e.pingedLanes |= e.suspendedLanes & n, te === e && (re & n) === n && (q === 4 || q === 3 && (re & 130023424) === re && 500 > X() - Di ? Rt(e, 0) : Ri |= n), ye(e, t);
}
function sc(e, t) {
  t === 0 && (e.mode & 1 ? (t = yr, yr <<= 1, !(yr & 130023424) && (yr = 4194304)) : t = 1);
  var n = de();
  e = et(e, t), e !== null && (ar(e, t, n), ye(e, n));
}
function Ff(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), sc(e, n);
}
function If(e, t) {
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
      throw Error(N(314));
  }
  r !== null && r.delete(t), sc(e, n);
}
var uc;
uc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ve.current) me = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return me = !1, Cf(e, t, n);
    me = !!(e.flags & 131072);
  }
  else me = !1, V && t.flags & 1048576 && pu(t, nl, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Fr(e, t), e = t.pendingProps;
      var l = dn(t, ue.current);
      sn(t, n), l = bi(null, t, r, e, l, n);
      var o = Ti();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ge(r) ? (o = !0, el(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Ni(t), l.updater = jl, t.stateNode = l, l._reactInternals = t, Ro(t, r, e, n), t = Fo(null, t, r, !0, o, n)) : (t.tag = 0, V && o && gi(t), ce(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Fr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Uf(r), e = Re(r, e), l) {
          case 0:
            t = Oo(null, t, r, e, n);
            break e;
          case 1:
            t = Aa(null, t, r, e, n);
            break e;
          case 11:
            t = Fa(null, t, r, e, n);
            break e;
          case 14:
            t = Ia(null, t, r, Re(r.type, e), n);
            break e;
        }
        throw Error(N(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Oo(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Aa(e, t, r, l, n);
    case 3:
      e: {
        if (Qu(t), e === null) throw Error(N(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, xu(e, t), ol(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = mn(Error(N(423)), t), t = Ua(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = mn(Error(N(424)), t), t = Ua(e, t, r, n, l);
          break e;
        } else for (we = ht(t.stateNode.containerInfo.firstChild), ke = t, V = !0, Oe = null, n = gu(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (fn(), r === l) {
            t = tt(e, t, n);
            break e;
          }
          ce(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return wu(t), e === null && Lo(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Eo(r, l) ? i = null : o !== null && Eo(r, o) && (t.flags |= 32), Wu(e, t), ce(e, t, i, n), t.child;
    case 6:
      return e === null && Lo(t), null;
    case 13:
      return Ku(e, t, n);
    case 4:
      return _i(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = pn(t, null, r, n) : ce(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Fa(e, t, r, l, n);
    case 7:
      return ce(e, t, t.pendingProps, n), t.child;
    case 8:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, U(rl, r._currentValue), r._currentValue = i, o !== null) if (Ae(o.value, i)) {
          if (o.children === l.children && !ve.current) {
            t = tt(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var s = o.dependencies;
          if (s !== null) {
            i = o.child;
            for (var u = s.firstContext; u !== null; ) {
              if (u.context === r) {
                if (o.tag === 1) {
                  u = Ge(-1, n & -n), u.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var g = c.pending;
                    g === null ? u.next = u : (u.next = g.next, g.next = u), c.pending = u;
                  }
                }
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Mo(
                  o.return,
                  n,
                  t
                ), s.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (i = o.return, i === null) throw Error(N(341));
            i.lanes |= n, s = i.alternate, s !== null && (s.lanes |= n), Mo(i, n, t), i = o.sibling;
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
      return l = t.type, r = t.pendingProps.children, sn(t, n), l = Te(l), r = r(l), t.flags |= 1, ce(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Re(r, t.pendingProps), l = Re(r.type, l), Ia(e, t, r, l, n);
    case 15:
      return Hu(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Fr(e, t), t.tag = 1, ge(r) ? (e = !0, el(t)) : e = !1, sn(t, n), Au(t, r, l), Ro(t, r, l, n), Fo(null, t, r, !0, e, n);
    case 19:
      return Yu(e, t, n);
    case 22:
      return Vu(e, t, n);
  }
  throw Error(N(156, t.tag));
};
function cc(e, t) {
  return Os(e, t);
}
function Af(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function ze(e, t, n, r) {
  return new Af(e, t, n, r);
}
function Ai(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Uf(e) {
  if (typeof e == "function") return Ai(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === oi) return 11;
    if (e === ii) return 14;
  }
  return 2;
}
function yt(e, t) {
  var n = e.alternate;
  return n === null ? (n = ze(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Ur(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") Ai(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case Qt:
      return Dt(n.children, l, o, t);
    case li:
      i = 8, l |= 8;
      break;
    case lo:
      return e = ze(12, n, t, l | 2), e.elementType = lo, e.lanes = o, e;
    case oo:
      return e = ze(13, n, t, l), e.elementType = oo, e.lanes = o, e;
    case io:
      return e = ze(19, n, t, l), e.elementType = io, e.lanes = o, e;
    case ws:
      return Cl(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case ys:
          i = 10;
          break e;
        case xs:
          i = 9;
          break e;
        case oi:
          i = 11;
          break e;
        case ii:
          i = 14;
          break e;
        case ot:
          i = 16, r = null;
          break e;
      }
      throw Error(N(130, e == null ? e : typeof e, ""));
  }
  return t = ze(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Dt(e, t, n, r) {
  return e = ze(7, e, r, t), e.lanes = n, e;
}
function Cl(e, t, n, r) {
  return e = ze(22, e, r, t), e.elementType = ws, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function to(e, t, n) {
  return e = ze(6, e, null, t), e.lanes = n, e;
}
function no(e, t, n) {
  return t = ze(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Bf(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Dl(0), this.expirationTimes = Dl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Dl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Ui(e, t, n, r, l, o, i, s, u) {
  return e = new Bf(e, t, n, s, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = ze(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ni(o), e;
}
function Hf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Wt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function dc(e) {
  if (!e) return wt;
  e = e._reactInternals;
  e: {
    if (Ht(e) !== e || e.tag !== 1) throw Error(N(170));
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
    throw Error(N(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ge(n)) return du(e, n, t);
  }
  return t;
}
function fc(e, t, n, r, l, o, i, s, u) {
  return e = Ui(n, r, !0, e, l, o, i, s, u), e.context = dc(null), n = e.current, r = de(), l = gt(n), o = Ge(r, l), o.callback = t ?? null, mt(n, o, l), e.current.lanes = l, ar(e, l, r), ye(e, r), e;
}
function El(e, t, n, r) {
  var l = t.current, o = de(), i = gt(l);
  return n = dc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ge(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = mt(l, t, i), e !== null && (Ie(e, l, i, o), Rr(e, l, i)), i;
}
function pl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ga(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Bi(e, t) {
  Ga(e, t), (e = e.alternate) && Ga(e, t);
}
function Vf() {
  return null;
}
var pc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Hi(e) {
  this._internalRoot = e;
}
zl.prototype.render = Hi.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(N(409));
  El(e, t, null, null);
};
zl.prototype.unmount = Hi.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ut(function() {
      El(null, e, null, null);
    }), t[qe] = null;
  }
};
function zl(e) {
  this._internalRoot = e;
}
zl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Vs();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < at.length && t !== 0 && t < at[n].priority; n++) ;
    at.splice(n, 0, e), n === 0 && Qs(e);
  }
};
function Vi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function bl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Ja() {
}
function Wf(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = pl(i);
        o.call(c);
      };
    }
    var i = fc(t, r, e, 0, null, !1, !1, "", Ja);
    return e._reactRootContainer = i, e[qe] = i.current, Gn(e.nodeType === 8 ? e.parentNode : e), Ut(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var c = pl(u);
      s.call(c);
    };
  }
  var u = Ui(e, 0, !1, null, null, !1, !1, "", Ja);
  return e._reactRootContainer = u, e[qe] = u.current, Gn(e.nodeType === 8 ? e.parentNode : e), Ut(function() {
    El(t, u, n, r);
  }), u;
}
function Tl(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var s = l;
      l = function() {
        var u = pl(i);
        s.call(u);
      };
    }
    El(t, i, e, l);
  } else i = Wf(n, t, e, l, r);
  return pl(i);
}
Bs = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Pn(t.pendingLanes);
        n !== 0 && (ui(t, n | 1), ye(t, X()), !(F & 6) && (vn = X() + 500, jt()));
      }
      break;
    case 13:
      Ut(function() {
        var r = et(e, 1);
        if (r !== null) {
          var l = de();
          Ie(r, e, 1, l);
        }
      }), Bi(e, 1);
  }
};
ci = function(e) {
  if (e.tag === 13) {
    var t = et(e, 134217728);
    if (t !== null) {
      var n = de();
      Ie(t, e, 134217728, n);
    }
    Bi(e, 134217728);
  }
};
Hs = function(e) {
  if (e.tag === 13) {
    var t = gt(e), n = et(e, t);
    if (n !== null) {
      var r = de();
      Ie(n, e, t, r);
    }
    Bi(e, t);
  }
};
Vs = function() {
  return A;
};
Ws = function(e, t) {
  var n = A;
  try {
    return A = e, t();
  } finally {
    A = n;
  }
};
go = function(e, t, n) {
  switch (t) {
    case "input":
      if (uo(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = wl(r);
            if (!l) throw Error(N(90));
            Ss(r), uo(r, l);
          }
        }
      }
      break;
    case "textarea":
      Ns(e, n);
      break;
    case "select":
      t = n.value, t != null && rn(e, !!n.multiple, t, !1);
  }
};
Ps = Oi;
Ls = Ut;
var Qf = { usingClientEntryPoint: !1, Events: [ur, Zt, wl, bs, Ts, Oi] }, En = { findFiberByHostInstance: Pt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Kf = { bundleType: En.bundleType, version: En.version, rendererPackageName: En.rendererPackageName, rendererConfig: En.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: nt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Rs(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: En.findFiberByHostInstance || Vf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var br = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!br.isDisabled && br.supportsFiber) try {
    vl = br.inject(Kf), We = br;
  } catch {
  }
}
je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Qf;
je.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Vi(t)) throw Error(N(200));
  return Hf(e, t, null, n);
};
je.createRoot = function(e, t) {
  if (!Vi(e)) throw Error(N(299));
  var n = !1, r = "", l = pc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Ui(e, 1, !1, null, null, n, !1, r, l), e[qe] = t.current, Gn(e.nodeType === 8 ? e.parentNode : e), new Hi(t);
};
je.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(N(188)) : (e = Object.keys(e).join(","), Error(N(268, e)));
  return e = Rs(t), e = e === null ? null : e.stateNode, e;
};
je.flushSync = function(e) {
  return Ut(e);
};
je.hydrate = function(e, t, n) {
  if (!bl(t)) throw Error(N(200));
  return Tl(null, e, t, !0, n);
};
je.hydrateRoot = function(e, t, n) {
  if (!Vi(e)) throw Error(N(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = pc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = fc(t, null, e, 1, n ?? null, l, !1, o, i), e[qe] = t.current, Gn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new zl(t);
};
je.render = function(e, t, n) {
  if (!bl(t)) throw Error(N(200));
  return Tl(null, e, t, !1, n);
};
je.unmountComponentAtNode = function(e) {
  if (!bl(e)) throw Error(N(40));
  return e._reactRootContainer ? (Ut(function() {
    Tl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[qe] = null;
    });
  }), !0) : !1;
};
je.unstable_batchedUpdates = Oi;
je.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!bl(n)) throw Error(N(200));
  if (e == null || e._reactInternals === void 0) throw Error(N(38));
  return Tl(e, t, n, !1, r);
};
je.version = "18.3.1-next-f1338f8080-20240426";
function hc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(hc);
    } catch (e) {
      console.error(e);
    }
}
hc(), hs.exports = je;
var Yf = hs.exports, mc, qa = Yf;
mc = qa.createRoot, qa.hydrateRoot;
function M({ name: e, className: t }) {
  return /* @__PURE__ */ a.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ a.jsx("ha-icon", { icon: `mdi:${e}` }) });
}
const Xf = '<defs><linearGradient id="hl-mark-g" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#FFB547"/><stop offset="1" stop-color="#FF5A1F"/></linearGradient></defs><polygon points="256,62 452,222 452,446 60,446 60,222" fill="url(#hl-mark-g)" stroke="url(#hl-mark-g)" stroke-width="56" stroke-linejoin="round"/><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" fill="#fff" transform="translate(256 292) scale(10) translate(-12 -12)"/>';
function es({ size: e = 28 }) {
  return /* @__PURE__ */ a.jsx(
    "svg",
    {
      className: "logo-mark",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      "aria-hidden": "true",
      dangerouslySetInnerHTML: { __html: Xf }
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
], Bn = { heat: "Heating", water: "Hot water" }, Ue = (e) => String((e == null ? void 0 : e.message) ?? e);
function Zf(e, t, n) {
  const [r, l] = b.useState(!1), [o, i] = b.useState(null);
  return { busy: r, result: o, send: async (u, c) => {
    l(!0);
    try {
      await e().callWS({ entry_id: t, channel: n, ...u }), i({ kind: "ok", text: c });
    } catch (g) {
      i({ kind: "error", text: Ue(g) });
    } finally {
      l(!1);
    }
  } };
}
const $t = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, Gf = [30, 60, 120, 180];
function Jf({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onOpenDevice: l,
  onRooms: o
}) {
  const [i, s] = b.useState([]), [u, c] = b.useState("all");
  b.useEffect(() => {
    const m = e().connection.subscribeMessage((y) => s(y.rooms), {
      type: "hive_local/rooms/subscribe"
    });
    return () => {
      m.then((y) => y()).catch(() => {
      });
    };
  }, [e]);
  const g = t.flatMap((m) => m.channels.map((y) => {
    var w, T;
    return { d: m, c: y, s: ((T = (w = n[m.entry_id]) == null ? void 0 : w[y]) == null ? void 0 : T.status) ?? null };
  })), p = t.length > 1, v = [
    { id: "all", label: "All", icon: "" },
    { id: "heat", label: "Heating", icon: "radiator" },
    ...g.some(({ c: m }) => m === "water") ? [{ id: "water", label: "Hot water", icon: "water-boiler" }] : [],
    ...i.length ? [{ id: "rooms", label: "Rooms", icon: "home-thermometer-outline" }] : []
  ];
  return /* @__PURE__ */ a.jsx("div", { className: "home", children: t.length > 0 && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx("h3", { className: "home-section", children: "Quick actions" }),
    /* @__PURE__ */ a.jsx(qf, { getHass: e, devices: t, status: n }),
    /* @__PURE__ */ a.jsx("h3", { className: "home-section", children: "Your devices" }),
    v.length > 2 && /* @__PURE__ */ a.jsx("div", { className: "pills", role: "tablist", "aria-label": "Show", children: v.map((m) => /* @__PURE__ */ a.jsxs("button", { role: "tab", "aria-selected": u === m.id, className: `pill ${u === m.id ? "on" : ""}`, onClick: () => c(m.id), children: [
      m.icon && /* @__PURE__ */ a.jsx(M, { name: m.icon }),
      " ",
      m.label
    ] }, m.id)) }),
    /* @__PURE__ */ a.jsxs("div", { className: "device-grid", children: [
      g.filter(({ c: m }) => u === "all" || u === m).map(({ d: m, c: y }) => {
        var w;
        return /* @__PURE__ */ a.jsx(
          vc,
          {
            getHass: e,
            device: m,
            channel: y,
            info: (w = n[m.entry_id]) == null ? void 0 : w[y],
            showDevice: p,
            limits: r,
            onOpen: () => l(m.entry_id, y)
          },
          `${m.entry_id}-${y}`
        );
      }),
      (u === "all" || u === "rooms") && i.map((m) => /* @__PURE__ */ a.jsx(ep, { room: m, showReceiver: p, onOpen: o }, m.id))
    ] })
  ] }) });
}
function qf({ getHass: e, devices: t, status: n }) {
  var p, v;
  const [r, l] = b.useState(null), [o, i] = b.useState(null), s = t.length > 1, u = async (m, y, w) => {
    l(m);
    try {
      for (const T of y) await e().callWS(T);
      i({ ok: !0, text: w });
    } catch (T) {
      i({ ok: !1, text: Ue(T) });
    } finally {
      l(null);
    }
  }, c = [];
  for (const m of t)
    for (const y of m.channels) {
      const w = (p = n[m.entry_id]) == null ? void 0 : p[y];
      if (((v = w == null ? void 0 : w.status) == null ? void 0 : v.mode) === "boost") continue;
      const T = $t((w == null ? void 0 : w.boost_minutes) ?? 30), f = y === "water" ? "hot water" : "heating";
      c.push({
        id: `boost-${m.entry_id}-${y}`,
        label: `Boost ${f} · ${T}${s ? ` (${m.name})` : ""}`,
        icon: "rocket-launch",
        kind: y,
        msgs: [{ type: "hive_local/boost", entry_id: m.entry_id, channel: y }],
        done: `Boosting ${f} for ${T}`
      });
    }
  const g = t.flatMap(
    (m) => m.channels.filter((y) => {
      var T, f, d;
      const w = (d = (f = (T = n[m.entry_id]) == null ? void 0 : T[y]) == null ? void 0 : f.status) == null ? void 0 : d.mode;
      return w && w !== "schedule";
    }).map((y) => ({ d: m, c: y }))
  );
  return g.length && c.push({
    id: "schedule",
    label: "Everything back to schedule",
    icon: "calendar-clock",
    kind: "neutral",
    msgs: g.map(
      ({ d: m, c: y }) => {
        var w, T, f;
        return ((f = (T = (w = n[m.entry_id]) == null ? void 0 : w[y]) == null ? void 0 : T.status) == null ? void 0 : f.mode) === "boost" ? { type: "hive_local/cancel_boost", entry_id: m.entry_id, channel: y } : { type: "hive_local/mode", entry_id: m.entry_id, channel: y, mode: "schedule" };
      }
    ),
    done: "Back on the schedule"
  }), /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx("div", { className: "quick", children: c.map((m) => /* @__PURE__ */ a.jsxs("button", { className: `quick-action ${m.kind}`, disabled: r != null, onClick: () => u(m.id, m.msgs, m.done), children: [
      /* @__PURE__ */ a.jsx("span", { className: "quick-icon", children: /* @__PURE__ */ a.jsx(M, { name: r === m.id ? "timer-sand" : m.icon }) }),
      /* @__PURE__ */ a.jsx("span", { className: "quick-label", children: m.label })
    ] }, m.id)) }),
    o && /* @__PURE__ */ a.jsx("div", { className: `status ${o.ok ? "ok" : "error"}`, children: o.text })
  ] });
}
function ep({ room: e, showReceiver: t, onOpen: n }) {
  const r = e.target != null ? `${e.target}°` : e.target_range ? `${e.target_range[0]}–${e.target_range[1]}°` : null, l = `${e.valves.length} valve${e.valves.length === 1 ? "" : "s"}`;
  return /* @__PURE__ */ a.jsx("section", { className: `card device room-device ${e.heating ? "heating" : "idle"}`, children: /* @__PURE__ */ a.jsxs("div", { className: "device-head", role: "button", tabIndex: 0, onClick: n, onKeyDown: (o) => o.key === "Enter" && n(), children: [
    /* @__PURE__ */ a.jsxs("div", { className: "device-row", children: [
      /* @__PURE__ */ a.jsx("span", { className: "device-icon room", children: /* @__PURE__ */ a.jsx(M, { name: "home-thermometer-outline" }) }),
      /* @__PURE__ */ a.jsxs("div", { className: "device-name", children: [
        /* @__PURE__ */ a.jsx("span", { children: e.name }),
        /* @__PURE__ */ a.jsxs("span", { className: "muted small", children: [
          t && e.receiver_name ? `${e.receiver_name} · ${l}` : l,
          e.battery_low ? /* @__PURE__ */ a.jsxs("span", { className: "warn", children: [
            " · battery ",
            e.lowest_battery,
            "%"
          ] }) : e.unavailable.length ? /* @__PURE__ */ a.jsxs("span", { className: "warn", children: [
            " · ",
            e.unavailable.length,
            " not responding"
          ] }) : null
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("span", { className: "device-status", children: e.heating ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        "Heating to ",
        /* @__PURE__ */ a.jsx("b", { children: r }),
        " ",
        /* @__PURE__ */ a.jsx(M, { name: "fire", className: "status-icon heat" })
      ] }) : r ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        "Target ",
        /* @__PURE__ */ a.jsx("b", { children: r })
      ] }) : "No target" })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "device-row", children: /* @__PURE__ */ a.jsxs("div", { className: "device-big", children: [
      e.current_temperature != null ? e.current_temperature.toFixed(1) : "–",
      /* @__PURE__ */ a.jsx("span", { children: "°" }),
      /* @__PURE__ */ a.jsx("small", { children: e.temperature_source === "sensor" ? "Actual" : "Valves" })
    ] }) })
  ] }) });
}
function vc({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  showDevice: l,
  limits: o,
  onOpen: i,
  page: s = !1
}) {
  var I;
  const u = n === "water", c = (r == null ? void 0 : r.status) ?? null, { busy: g, result: p, send: v } = Zf(e, t.entry_id, n), m = !!c && c.mode !== "off" && c.heating, y = !c || c.mode === "off" ? "off" : m ? "heating" : "idle", w = !u && (c == null ? void 0 : c.setpoint) != null && c.setpoint <= 1, T = u || (c == null ? void 0 : c.setpoint) == null ? null : w ? (r == null ? void 0 : r.frost_temperature) ?? null : c.setpoint, f = [
    { id: "schedule", label: "Schedule" },
    { id: "manual", label: u ? "Always on" : "Manual" },
    { id: "off", label: "Off" }
  ], d = (r == null ? void 0 : r.boost_minutes) ?? 30, h = (r == null ? void 0 : r.boost_temperature) ?? 21, [k, _] = b.useState(!1), j = (o == null ? void 0 : o.boost_min_temp) ?? 5, x = (o == null ? void 0 : o.heat_max) ?? 32, P = (D) => Math.min(x, Math.max(j, Math.round(D * 2) / 2)), $ = [.../* @__PURE__ */ new Set([...Gf, d])].filter((D) => D <= ((o == null ? void 0 : o.boost_max_minutes) ?? 360)).sort((D, _e) => D - _e), [C, Z] = b.useState(null), oe = b.useRef();
  b.useEffect(() => () => window.clearTimeout(oe.current), []), b.useEffect(() => Z(null), [c == null ? void 0 : c.setpoint, c == null ? void 0 : c.mode]);
  const Le = !u && !!c && c.mode !== "off", rt = (D) => {
    const Ct = P((C ?? T ?? 20) + D);
    Z(Ct), window.clearTimeout(oe.current), oe.current = window.setTimeout(() => {
      v({ type: "hive_local/target", temperature: Ct }, `Set to ${Ct}°`).then(
        () => window.setTimeout(() => Z(null), 8e3)
      );
    }, 1200);
  }, Nt = C ?? T, _t = (D, _e) => v({ type: "hive_local/boost", minutes: D, ...u ? {} : { temperature: _e } }, `Boosting for ${$t(D)}`).then(
    () => _(!1)
  ), Me = c ? c.mode === "boost" ? "Boost to" : w && C == null ? "Frost" : c.mode === "manual" ? "Hold at" : "Target" : "", E = (c == null ? void 0 : c.mode) === "boost";
  let S = "Waiting for the receiver…";
  c && (c.mode === "off" ? S = "Off" : E ? S = u ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    "Boosting ",
    /* @__PURE__ */ a.jsx(M, { name: "rocket-launch", className: "status-icon" })
  ] }) : /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    "Boosting to ",
    /* @__PURE__ */ a.jsxs("b", { children: [
      c.setpoint,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ a.jsx(M, { name: "rocket-launch", className: "status-icon" })
  ] }) : u ? S = m ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    "Heating water ",
    /* @__PURE__ */ a.jsx(M, { name: "water", className: "status-icon" })
  ] }) : "Not heating now" : m ? S = /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    "Heating to ",
    /* @__PURE__ */ a.jsxs("b", { children: [
      T,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ a.jsx(M, { name: "fire", className: "status-icon" })
  ] }) : w ? S = /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    "Frost protection ",
    /* @__PURE__ */ a.jsxs("b", { children: [
      T,
      "°"
    ] })
  ] }) : S = T != null ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    "Target ",
    /* @__PURE__ */ a.jsxs("b", { children: [
      T,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ a.jsx(M, { name: "check-circle-outline", className: "status-icon done" })
  ] }) : "Idle");
  const z = c ? c.mode === "boost" ? c.boost_remaining != null ? `Boost · ${$t(c.boost_remaining)} left` : "Boost" : c.mode === "schedule" ? "On schedule" : (I = f.find((D) => D.id === c.mode)) == null ? void 0 : I.label : "", R = s;
  return /* @__PURE__ */ a.jsxs("section", { className: `card device ${n} ${y} ${s ? "page" : ""}`, children: [
    /* @__PURE__ */ a.jsxs(
      "div",
      {
        className: "device-head",
        ...s ? {} : { role: "button", tabIndex: 0, onClick: i, onKeyDown: (D) => D.key === "Enter" && D.target === D.currentTarget && (i == null ? void 0 : i()) },
        children: [
          /* @__PURE__ */ a.jsxs("div", { className: "device-row", children: [
            /* @__PURE__ */ a.jsx("span", { className: `device-icon ${n}`, children: /* @__PURE__ */ a.jsx(M, { name: u ? "water-boiler" : "radiator" }) }),
            /* @__PURE__ */ a.jsxs("div", { className: "device-name", children: [
              /* @__PURE__ */ a.jsx("span", { children: Bn[n] }),
              /* @__PURE__ */ a.jsx("span", { className: "muted small", children: l ? `${t.name} · ${z}` : z })
            ] }),
            /* @__PURE__ */ a.jsx("span", { className: "device-status", children: S })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "device-row", children: [
            /* @__PURE__ */ a.jsxs("div", { className: "device-big", children: [
              u ? c ? c.mode === "off" ? "Off" : m ? "On" : "Idle" : "–" : (c == null ? void 0 : c.current_temperature) != null ? c.current_temperature.toFixed(1) : "–",
              !u && /* @__PURE__ */ a.jsx("span", { children: "°" }),
              /* @__PURE__ */ a.jsx("small", { children: u ? "Now" : "Actual" })
            ] }),
            /* @__PURE__ */ a.jsxs(
              "button",
              {
                className: `device-action ${E ? "boosting" : ""}`,
                disabled: g || !c,
                onClick: (D) => {
                  D.stopPropagation(), _(!0);
                },
                children: [
                  /* @__PURE__ */ a.jsx(M, { name: "rocket-launch" }),
                  " ",
                  E ? "Boosting" : "Boost"
                ]
              }
            )
          ] })
        ]
      }
    ),
    R && /* @__PURE__ */ a.jsxs("div", { className: "device-body", children: [
      !u && /* @__PURE__ */ a.jsxs("div", { className: "target-row", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "target-text", children: [
          /* @__PURE__ */ a.jsx("span", { className: "target-label", children: Me || "Target" }),
          /* @__PURE__ */ a.jsx("span", { className: "muted small", children: c ? c.mode === "off" ? "Turn the heating on to set a target" : c.mode === "schedule" ? "Until the next scheduled change" : c.mode === "boost" ? "Keeps the boost time left" : "Held until you change it" : "" })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "target-control", children: [
          /* @__PURE__ */ a.jsx("button", { className: "round target-btn", disabled: !Le, onClick: () => rt(-0.5), "aria-label": "Lower the target", children: /* @__PURE__ */ a.jsx(M, { name: "minus" }) }),
          /* @__PURE__ */ a.jsx("span", { className: `target-value ${C != null ? "pending" : ""}`, children: Nt != null && (c == null ? void 0 : c.mode) !== "off" ? `${Nt.toFixed(1)}°` : "–" }),
          /* @__PURE__ */ a.jsx("button", { className: "round target-btn", disabled: !Le, onClick: () => rt(0.5), "aria-label": "Raise the target", children: /* @__PURE__ */ a.jsx(M, { name: "plus" }) })
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "segmented full", children: f.map((D) => /* @__PURE__ */ a.jsx(
        "button",
        {
          className: (c == null ? void 0 : c.mode) === D.id ? "on" : "",
          disabled: g || !c,
          onClick: () => v({ type: "hive_local/mode", mode: D.id }, D.id === "schedule" ? "Following the schedule" : D.label),
          children: D.label
        },
        D.id
      )) })
    ] }),
    (p == null ? void 0 : p.kind) === "error" && /* @__PURE__ */ a.jsx("div", { className: "status error", children: p.text }),
    k && /* @__PURE__ */ a.jsx(
      tp,
      {
        title: E ? "Boosting" : "Boost",
        subtitle: l ? `${t.name} · ${Bn[n]}` : Bn[n],
        water: u,
        boosting: E,
        remaining: (c == null ? void 0 : c.boost_remaining) ?? null,
        boostTarget: E ? (c == null ? void 0 : c.setpoint) ?? null : null,
        defaultMinutes: d,
        defaultTemp: h,
        durations: $,
        clampTemp: P,
        busy: g,
        onBoost: _t,
        onStop: () => v({ type: "hive_local/cancel_boost" }, "Boost cancelled").then(() => _(!1)),
        onClose: () => _(!1)
      }
    )
  ] });
}
function tp({
  title: e,
  subtitle: t,
  water: n,
  boosting: r,
  remaining: l,
  boostTarget: o,
  defaultMinutes: i,
  defaultTemp: s,
  durations: u,
  clampTemp: c,
  busy: g,
  onBoost: p,
  onStop: v,
  onClose: m
}) {
  const [y, w] = b.useState(i), [T, f] = b.useState(s);
  return b.useEffect(() => {
    const d = (h) => h.key === "Escape" && m();
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, [m]), /* @__PURE__ */ a.jsx("div", { className: "sheet-backdrop", onClick: (d) => {
    d.stopPropagation(), m();
  }, children: /* @__PURE__ */ a.jsxs("div", { className: `sheet ${n ? "water" : "heat"}`, role: "dialog", "aria-modal": "true", "aria-label": `${e} ${t}`, onClick: (d) => d.stopPropagation(), children: [
    /* @__PURE__ */ a.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ a.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ a.jsx("h2", { children: e }),
      /* @__PURE__ */ a.jsx("span", { className: "muted", children: t })
    ] }),
    r ? /* @__PURE__ */ a.jsxs("div", { className: "sheet-live", children: [
      /* @__PURE__ */ a.jsx(M, { name: "clock-outline" }),
      /* @__PURE__ */ a.jsxs("span", { children: [
        l != null ? `${$t(l)} left` : "Boosting",
        !n && o != null ? ` · to ${o}°` : ""
      ] })
    ] }) : /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      !n && /* @__PURE__ */ a.jsxs("div", { className: "sheet-field", children: [
        /* @__PURE__ */ a.jsx("span", { className: "sheet-label", children: "Temperature" }),
        /* @__PURE__ */ a.jsxs("div", { className: "sheet-temp", children: [
          /* @__PURE__ */ a.jsx("button", { className: "round sheet-step", onClick: () => f(c(T - 0.5)), "aria-label": "Lower", children: /* @__PURE__ */ a.jsx(M, { name: "minus" }) }),
          /* @__PURE__ */ a.jsxs("span", { className: "sheet-temp-value", children: [
            T.toFixed(1),
            "°"
          ] }),
          /* @__PURE__ */ a.jsx("button", { className: "round sheet-step", onClick: () => f(c(T + 0.5)), "aria-label": "Raise", children: /* @__PURE__ */ a.jsx(M, { name: "plus" }) })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "sheet-field", children: [
        /* @__PURE__ */ a.jsx("span", { className: "sheet-label", children: "How long" }),
        /* @__PURE__ */ a.jsx("div", { className: "sheet-lengths", role: "radiogroup", "aria-label": "How long", children: u.map((d) => /* @__PURE__ */ a.jsx("button", { role: "radio", "aria-checked": d === y, className: d === y ? "on" : "", onClick: () => w(d), children: $t(d) }, d)) })
      ] })
    ] }),
    r ? /* @__PURE__ */ a.jsxs("button", { className: "sheet-go stop", disabled: g, onClick: v, children: [
      /* @__PURE__ */ a.jsx("span", { className: "stop-square" }),
      " Stop boost"
    ] }) : /* @__PURE__ */ a.jsx("button", { className: "sheet-go", disabled: g, onClick: () => p(y, T), children: n ? `Boost hot water for ${$t(y)}` : `Boost to ${T.toFixed(1)}° for ${$t(y)}` }),
    /* @__PURE__ */ a.jsx("button", { className: "ghost sheet-cancel", onClick: m, children: "Cancel" })
  ] }) });
}
const np = ["monday", "tuesday", "wednesday", "thursday", "friday"], rp = ["saturday", "sunday"], zn = (e) => e[0].toUpperCase() + e.slice(1, 3), Br = (e) => {
  const [t, n] = e.split(":").map(Number);
  return t * 60 + n;
};
function lp({
  getHass: e,
  device: t,
  channel: n,
  limits: r,
  mode: l
}) {
  var E;
  const [o, i] = b.useState({}), [s, u] = b.useState({}), [c, g] = b.useState("monday"), [p, v] = b.useState({ kind: "idle" }), m = t.entry_id, y = n === "water", w = JSON.stringify(o) !== JSON.stringify(s), T = b.useCallback(async () => {
    v({ kind: "busy", text: "Reading from receiver…" });
    try {
      const S = await e().callWS({
        type: "hive_local/get",
        entry_id: m,
        channel: n
      });
      i(S.schedule), u(S.schedule);
      const z = Object.keys(S.schedule).length;
      v(
        S.complete ? { kind: "ok", text: "Schedule read from receiver" } : z ? { kind: "error", text: `Only got ${z}/7 days — try reading again` } : { kind: "error", text: "No reply. On Zigbee2MQTT, check the receiver's friendly name; on ZHA, check the receiver is online." }
      );
    } catch (S) {
      v({ kind: "error", text: Ue(S) });
    }
  }, [m, n, e]);
  b.useEffect(() => {
    T();
  }, [T]), b.useEffect(() => {
    if (p.kind !== "ok") return;
    const S = setTimeout(() => v({ kind: "idle" }), 4e3);
    return () => clearTimeout(S);
  }, [p]);
  const f = async () => {
    const S = Object.fromEntries(
      zt.filter((z) => {
        var R;
        return JSON.stringify(o[z]) !== JSON.stringify(s[z]) && ((R = o[z]) == null ? void 0 : R.length);
      }).map((z) => [z, o[z]])
    );
    if (Object.keys(S).length) {
      v({ kind: "busy", text: "Writing to receiver…" });
      try {
        const z = await e().callWS({
          type: "hive_local/set",
          entry_id: m,
          channel: n,
          schedule: S
        }), R = { ...o, ...z.schedule };
        i(R), u(R);
        const I = Object.keys(z.schedule).map((D) => D[0].toUpperCase() + D.slice(1, 3));
        v({
          kind: "ok",
          text: `Wrote ${I.join(", ")}. Read back to confirm the receiver kept it.`
        });
      } catch (z) {
        v({ kind: "error", text: Ue(z) });
      }
    }
  }, d = o[c] ?? [], h = r.max_transitions, k = (S) => i((z) => ({ ...z, [c]: [...S].sort((R, I) => Br(R.time) - Br(I.time)) })), _ = () => {
    const S = d[d.length - 1], z = S ? op(d, Br(S.time) + 60) : "06:00", R = y ? r.water_on : (S == null ? void 0 : S.setpoint) ?? 20;
    k([...d, { time: z, setpoint: R }]);
  }, j = (S) => i((z) => {
    const R = { ...z };
    for (const I of S) R[I] = d.map((D) => ({ ...D }));
    return R;
  }), x = b.useMemo(() => {
    const S = Object.values(o).flat().map((z) => z.setpoint).filter((z) => z > r.heat_min);
    return { lo: Math.min(15, ...S), hi: Math.max(24, ...S) };
  }, [o, r.heat_min]), P = zt[((/* @__PURE__ */ new Date()).getDay() + 6) % 7], [$, C] = b.useState(null), [Z, oe] = b.useState(!1), Le = zt.filter((S) => JSON.stringify(o[S]) !== JSON.stringify(s[S])), rt = zt[(zt.indexOf(c) + 1) % 7], Nt = (E = (o[rt] ?? [])[0]) == null ? void 0 : E.time, _t = (S) => y ? S.setpoint < r.water_on : S.setpoint <= r.heat_min;
  let Me = "Stored on the receiver, so it keeps running without Home Assistant.";
  return l === "schedule" ? Me = "Your schedule is running." : l === "manual" ? Me = `Your schedule isn't being used: ${y ? "hot water is always on" : "heating is on Manual"}.` : l === "off" ? Me = `Your schedule isn't being used: ${y ? "hot water" : "heating"} is off.` : l === "boost" && (Me = "Boosting now. Your schedule carries on after the boost."), /* @__PURE__ */ a.jsxs("div", { className: "sched", children: [
    /* @__PURE__ */ a.jsx("p", { className: "sched-status muted", children: Me }),
    /* @__PURE__ */ a.jsx("div", { className: "sched-days", role: "tablist", "aria-label": "Day", children: zt.map((S) => /* @__PURE__ */ a.jsxs(
      "button",
      {
        role: "tab",
        "aria-selected": S === c,
        "aria-label": S,
        className: `sched-day ${S === c ? "on" : ""} ${S === P ? "today" : ""}`,
        onClick: () => {
          g(S), C(null);
        },
        children: [
          S[0].toUpperCase(),
          Le.includes(S) && /* @__PURE__ */ a.jsx("i", { className: "sched-dot", "aria-label": "changed" })
        ]
      },
      S
    )) }),
    p.text && p.kind !== "idle" && /* @__PURE__ */ a.jsx("div", { className: `status ${p.kind}`, children: p.text }),
    /* @__PURE__ */ a.jsxs("div", { className: "sched-list", children: [
      d.length === 0 && /* @__PURE__ */ a.jsxs("p", { className: "muted sched-empty", children: [
        "Nothing scheduled on ",
        c[0].toUpperCase() + c.slice(1),
        " yet."
      ] }),
      d.map((S, z) => {
        var D;
        const R = ((D = d[z + 1]) == null ? void 0 : D.time) ?? (Nt ? `${Nt} (${zn(rt)})` : "00:00"), I = _t(S);
        return /* @__PURE__ */ a.jsxs("button", { className: "slot", onClick: () => C(z), children: [
          /* @__PURE__ */ a.jsx(
            "span",
            {
              className: `slot-badge ${I ? "off" : ""}`,
              style: I ? void 0 : { borderColor: y ? "var(--hl-brand)" : ip(S.setpoint, x, r) },
              children: I ? /* @__PURE__ */ a.jsx(M, { name: y ? "power" : "snowflake" }) : y ? "On" : `${S.setpoint}°`
            }
          ),
          /* @__PURE__ */ a.jsxs("span", { className: "slot-time", children: [
            S.time,
            " – ",
            R
          ] }),
          /* @__PURE__ */ a.jsx(M, { name: "chevron-right", className: "slot-chev" })
        ] }, z);
      }),
      /* @__PURE__ */ a.jsxs("button", { className: "slot slot-add", onClick: () => {
        _(), C(d.length);
      }, disabled: d.length >= h, children: [
        /* @__PURE__ */ a.jsx("span", { className: "slot-badge add", children: /* @__PURE__ */ a.jsx(M, { name: "plus" }) }),
        /* @__PURE__ */ a.jsx("span", { className: "slot-time", children: d.length >= h ? `${h} times a day at most` : "Add a time" })
      ] })
    ] }),
    w && /* @__PURE__ */ a.jsxs("div", { className: "sched-save", children: [
      /* @__PURE__ */ a.jsx(M, { name: "pencil-outline", className: "sched-save-icon" }),
      /* @__PURE__ */ a.jsx("span", { className: "sched-changed", title: `Changed: ${Le.map(zn).join(", ")}`, children: "Unsaved changes" }),
      /* @__PURE__ */ a.jsx("button", { className: "sched-undo", onClick: () => {
        i(s), C(null);
      }, children: "Undo" }),
      /* @__PURE__ */ a.jsx("button", { className: "sched-write", onClick: f, disabled: p.kind === "busy", children: "Save" })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: `fab-wrap ${w ? "raised" : ""}`, children: [
      Z && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        /* @__PURE__ */ a.jsx("div", { className: "fab-backdrop", onClick: () => oe(!1) }),
        /* @__PURE__ */ a.jsxs("div", { className: "fab-menu", role: "menu", children: [
          /* @__PURE__ */ a.jsxs("button", { role: "menuitem", onClick: () => {
            oe(!1), T();
          }, disabled: p.kind === "busy", children: [
            /* @__PURE__ */ a.jsx(M, { name: "download" }),
            " Read from the receiver"
          ] }),
          /* @__PURE__ */ a.jsxs("button", { role: "menuitem", onClick: () => {
            oe(!1), j(np);
          }, disabled: !d.length, children: [
            /* @__PURE__ */ a.jsx(M, { name: "content-copy" }),
            " Copy ",
            zn(c),
            " to weekdays"
          ] }),
          /* @__PURE__ */ a.jsxs("button", { role: "menuitem", onClick: () => {
            oe(!1), j(rp);
          }, disabled: !d.length, children: [
            /* @__PURE__ */ a.jsx(M, { name: "content-copy" }),
            " Copy ",
            zn(c),
            " to the weekend"
          ] }),
          /* @__PURE__ */ a.jsxs("button", { role: "menuitem", onClick: () => {
            oe(!1), j([...zt]);
          }, disabled: !d.length, children: [
            /* @__PURE__ */ a.jsx(M, { name: "content-copy" }),
            " Copy ",
            zn(c),
            " to every day"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("button", { className: "fab", "aria-label": "More", "aria-expanded": Z, onClick: () => oe(!Z), children: /* @__PURE__ */ a.jsx(M, { name: Z ? "close" : "dots-horizontal" }) })
    ] }),
    $ != null && d[$] && /* @__PURE__ */ a.jsx(
      ap,
      {
        slot: d[$],
        dayName: c[0].toUpperCase() + c.slice(1),
        isWater: y,
        limits: r,
        canDelete: !0,
        onChange: (S) => k(d.map((z, R) => R === $ ? S : z)),
        onDelete: () => {
          k(d.filter((S, z) => z !== $)), C(null);
        },
        onClose: () => C(null)
      }
    )
  ] });
}
function op(e, t) {
  const n = new Set(e.map((l) => Br(l.time)));
  let r = Math.min(t, 23 * 60 + 30);
  for (; n.has(r) && r < 1439; ) r += 15;
  return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function ip(e, t, n) {
  if (e <= n.heat_min) return "var(--hl-off-fill)";
  const r = Math.min(1, Math.max(0, (e - t.lo) / Math.max(1, t.hi - t.lo)));
  return `hsl(${Math.round(42 - 34 * r)} ${Math.round(88 + 4 * r)}% ${Math.round(64 - 14 * r)}%)`;
}
function ap({
  slot: e,
  dayName: t,
  isWater: n,
  limits: r,
  canDelete: l,
  onChange: o,
  onDelete: i,
  onClose: s
}) {
  b.useEffect(() => {
    const p = (v) => v.key === "Escape" && s();
    return window.addEventListener("keydown", p), () => window.removeEventListener("keydown", p);
  }, [s]);
  const u = n ? e.setpoint < r.water_on : e.setpoint <= r.heat_min, c = (p) => Math.min(r.heat_max, Math.max(5, Math.round(p * 2) / 2)), g = u ? 20 : e.setpoint;
  return /* @__PURE__ */ a.jsx("div", { className: "sheet-backdrop", onClick: s, children: /* @__PURE__ */ a.jsxs("div", { className: "sheet heat", role: "dialog", "aria-modal": "true", "aria-label": `Edit ${t} at ${e.time}`, onClick: (p) => p.stopPropagation(), children: [
    /* @__PURE__ */ a.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ a.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ a.jsx("h2", { children: e.time }),
      /* @__PURE__ */ a.jsx("span", { className: "muted", children: t })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ a.jsx("span", { className: "sheet-label", children: "Starts at" }),
      /* @__PURE__ */ a.jsx("input", { className: "sheet-time", type: "time", value: e.time, onChange: (p) => p.target.value && o({ ...e, time: p.target.value }) })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ a.jsx("span", { className: "sheet-label", children: n ? "Hot water" : "Heating" }),
      /* @__PURE__ */ a.jsxs("div", { className: "sheet-lengths", children: [
        /* @__PURE__ */ a.jsx("button", { className: u ? "" : "on", onClick: () => o({ ...e, setpoint: n ? r.water_on : g }), children: n ? "On" : "Heat to" }),
        /* @__PURE__ */ a.jsx("button", { className: u ? "on" : "", onClick: () => o({ ...e, setpoint: n ? r.water_off : r.heat_min }), children: "Off" })
      ] })
    ] }),
    !n && !u && /* @__PURE__ */ a.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ a.jsx("span", { className: "sheet-label", children: "Temperature" }),
      /* @__PURE__ */ a.jsxs("div", { className: "sheet-temp", children: [
        /* @__PURE__ */ a.jsx("button", { className: "round sheet-step", onClick: () => o({ ...e, setpoint: c(e.setpoint - 0.5) }), "aria-label": "Lower", children: /* @__PURE__ */ a.jsx(M, { name: "minus" }) }),
        /* @__PURE__ */ a.jsxs("span", { className: "sheet-temp-value", children: [
          e.setpoint.toFixed(1),
          "°"
        ] }),
        /* @__PURE__ */ a.jsx("button", { className: "round sheet-step", onClick: () => o({ ...e, setpoint: c(e.setpoint + 0.5) }), "aria-label": "Raise", children: /* @__PURE__ */ a.jsx(M, { name: "plus" }) })
      ] })
    ] }),
    !n && u && /* @__PURE__ */ a.jsx("p", { className: "muted small sheet-note", children: "Off means the thermostat only keeps the house above its frost protection temperature." }),
    /* @__PURE__ */ a.jsx("button", { className: "sheet-go", onClick: s, children: "Done" }),
    l && /* @__PURE__ */ a.jsxs("button", { className: "ghost sheet-cancel danger-text", onClick: i, children: [
      /* @__PURE__ */ a.jsx(M, { name: "delete-outline" }),
      " Remove this time"
    ] })
  ] }) });
}
const ts = [
  { id: 1, label: "D", name: "Day" },
  { id: 7, label: "W", name: "Week" },
  { id: 30, label: "M", name: "Month" }
], sp = 5 * 6e4, Hr = (e) => {
  const t = Math.round(e);
  return t < 60 ? `${t}m` : t % 60 ? `${Math.floor(t / 60)}h ${t % 60}m` : `${t / 60}h`;
}, Zo = (e, t) => new Date(e * 1e3).toLocaleDateString([], t), up = (e) => new Date(e * 1e3).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
function cp(e, t, n) {
  if (n === 1) return Zo(e, { weekday: "short", day: "numeric", month: "short" });
  const r = t - 86400, l = new Date(e * 1e3), o = new Date(r * 1e3), i = (s) => s.toLocaleDateString([], { month: "short" });
  return l.getMonth() === o.getMonth() ? `${l.getDate()}–${o.getDate()} ${i(o)}` : `${l.getDate()} ${i(l)} – ${o.getDate()} ${i(o)}`;
}
function dp(e) {
  if (e.period === 1) {
    const t = [];
    for (let n = 0; n < e.series.length; n += 4) {
      const r = e.series.slice(n, n + 4).filter((o) => o.heating != null);
      if (!r.length) continue;
      const l = r.map((o) => o.current).filter((o) => o != null);
      t.push({
        key: e.series[n].t,
        label: [up(e.series[n].t), ""],
        minutes: r.reduce((o, i) => o + (i.heating ?? 0) * 15, 0),
        avg: l.length ? l.reduce((o, i) => o + i, 0) / l.length : null,
        min: l.length ? Math.min(...l) : null,
        max: l.length ? Math.max(...l) : null
      });
    }
    return t.reverse();
  }
  return e.days.filter((t) => t.heating_minutes != null).map((t) => ({
    key: t.start,
    label: [Zo(t.start, { weekday: "short" }), Zo(t.start, { day: "numeric" })],
    minutes: t.heating_minutes,
    avg: t.temp_avg,
    min: t.temp_min,
    max: t.temp_max
  })).reverse();
}
function gc({ getHass: e, devices: t, channel: n }) {
  var $;
  const [r, l] = b.useState(($ = t[0]) == null ? void 0 : $.entry_id), o = t.find((C) => C.entry_id === r) ?? t[0], i = n ?? "heat", [s, u] = b.useState(7), [c, g] = b.useState("time"), [p, v] = b.useState(0), [m, y] = b.useState(null), [w, T] = b.useState(""), [f, d] = b.useState(!0), h = i === "water", k = h ? "time" : c, _ = b.useCallback(() => {
    o && e().callWS({ type: "hive_local/stats", entry_id: o.entry_id, channel: i, days: s, offset: p }).then((C) => {
      y(C), T("");
    }).catch((C) => T(Ue(C))).finally(() => d(!1));
  }, [e, o, i, s, p]);
  if (b.useEffect(() => {
    if (d(!0), _(), p) return;
    const C = setInterval(_, sp);
    return () => clearInterval(C);
  }, [_, p]), !o) return null;
  const j = m && m.period === s && m.offset === p ? m : null, x = j ? dp(j) : [], P = s === 1 ? "hour" : "day";
  return /* @__PURE__ */ a.jsxs("div", { className: "history", children: [
    !n && /* @__PURE__ */ a.jsx("h2", { className: "history-title", children: "Heating history" }),
    !n && t.length > 1 && /* @__PURE__ */ a.jsx("div", { className: "history-tabs", role: "tablist", children: t.map((C) => /* @__PURE__ */ a.jsx("button", { role: "tab", "aria-selected": C.entry_id === o.entry_id, className: C.entry_id === o.entry_id ? "on" : "", onClick: () => {
      l(C.entry_id), v(0);
    }, children: C.name }, C.entry_id)) }),
    /* @__PURE__ */ a.jsxs("div", { className: "history-controls", children: [
      /* @__PURE__ */ a.jsx("div", { className: "history-toggle", role: "radiogroup", "aria-label": "Period", children: ts.map((C) => /* @__PURE__ */ a.jsx("button", { role: "radio", "aria-checked": C.id === s, "aria-label": C.name, title: C.name, className: C.id === s ? "on" : "", onClick: () => {
        u(C.id), v(0);
      }, children: C.label }, C.id)) }),
      !h && /* @__PURE__ */ a.jsxs("div", { className: "history-toggle", role: "radiogroup", "aria-label": "Show", children: [
        /* @__PURE__ */ a.jsx("button", { role: "radio", "aria-checked": c === "time", title: "Time on", "aria-label": "Time on", className: `wide ${c === "time" ? "on" : ""}`, onClick: () => g("time"), children: /* @__PURE__ */ a.jsx(M, { name: "clock-outline" }) }),
        /* @__PURE__ */ a.jsx("button", { role: "radio", "aria-checked": c === "temp", title: "Temperature", "aria-label": "Temperature", className: `wide ${c === "temp" ? "on" : ""}`, onClick: () => g("temp"), children: /* @__PURE__ */ a.jsx(M, { name: "thermometer" }) })
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "history-date", children: [
      /* @__PURE__ */ a.jsx("button", { className: "round ghost", onClick: () => v(p + 1), "aria-label": "Earlier", children: /* @__PURE__ */ a.jsx(M, { name: "chevron-left" }) }),
      /* @__PURE__ */ a.jsxs("span", { className: "history-range", children: [
        /* @__PURE__ */ a.jsx(M, { name: "calendar-blank-outline" }),
        " ",
        j ? cp(j.start, j.period_end, s) : "…"
      ] }),
      /* @__PURE__ */ a.jsx("button", { className: "round ghost", onClick: () => v(Math.max(0, p - 1)), disabled: p === 0, "aria-label": "Later", children: /* @__PURE__ */ a.jsx(M, { name: "chevron-right" }) })
    ] }),
    w && /* @__PURE__ */ a.jsx("div", { className: "status error", children: w }),
    f && !j && /* @__PURE__ */ a.jsx("p", { className: "muted history-empty", children: "Loading…" }),
    j && !j.has_data && /* @__PURE__ */ a.jsxs("p", { className: "muted history-empty", children: [
      "No history for this ",
      ts.find((C) => C.id === s).name.toLowerCase(),
      ". Home Assistant keeps 10 days unless",
      " ",
      /* @__PURE__ */ a.jsx("code", { children: "purge_keep_days" }),
      " is raised."
    ] }),
    (j == null ? void 0 : j.has_data) && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsx(pp, { data: j, metric: k, water: h, units: P, rows: x }),
      /* @__PURE__ */ a.jsxs("div", { className: "history-rows", children: [
        x.length > 0 && !h && /* @__PURE__ */ a.jsxs("div", { className: "history-key muted small", title: "Lowest and highest room temperature", children: [
          /* @__PURE__ */ a.jsx(M, { name: "thermometer" }),
          " Low · high"
        ] }),
        x.map((C) => /* @__PURE__ */ a.jsx(hp, { row: C, metric: k, water: h, scale: fp(x, k, s) }, C.key))
      ] })
    ] })
  ] });
}
function fp(e, t, n) {
  if (t === "time") return { lo: 0, hi: Math.max(60, ...e.map((i) => i.minutes ?? 0)) };
  const r = e.map((i) => i.avg).filter((i) => i != null), l = r.length ? Math.floor(Math.min(...r)) - 2 : 10, o = r.length ? Math.ceil(Math.max(...r)) : 25;
  return { lo: l, hi: Math.max(o, l + 4) };
}
function pp({ data: e, metric: t, water: n, units: r, rows: l }) {
  const o = Math.max(1, l.filter((y) => y.minutes != null).length), i = e.previous, s = !!(i != null && i.has_data) && i.known_minutes >= 0.5 * e.known_minutes, u = s ? e.heating_minutes - i.heating_minutes : 0, c = e.temperature, [g, p, v, m] = t === "time" ? [n ? "Hot water on" : "Boiler on", Hr(e.heating_minutes), `Average per ${r}`, Hr(e.heating_minutes / o)] : ["Average", c.avg != null ? `${c.avg.toFixed(1)}°` : "–", "Lowest – highest", c.min != null && c.max != null ? `${c.min.toFixed(1)}–${c.max.toFixed(1)}°` : "–"];
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "history-summary", children: [
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("span", { className: "muted", children: g }),
        /* @__PURE__ */ a.jsx("b", { children: p })
      ] }),
      /* @__PURE__ */ a.jsx("i", {}),
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("span", { className: "muted", children: v }),
        /* @__PURE__ */ a.jsx("b", { children: m })
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("p", { className: "history-note muted small", children: [
      t === "time" && s && (Math.abs(u) < 1 ? "Same as the period before · " : `${Hr(Math.abs(u))} ${u > 0 ? "more" : "less"} than the period before · `),
      "Fired up ",
      e.cycles,
      " time",
      e.cycles === 1 ? "" : "s",
      e.boosts ? ` · ${e.boosts} boost${e.boosts === 1 ? "" : "s"}` : "",
      t === "temp" && e.target_avg != null ? ` · average target ${e.target_avg.toFixed(1)}°` : ""
    ] })
  ] });
}
function hp({ row: e, metric: t, water: n, scale: r }) {
  const l = t === "time" ? e.minutes : e.avg, o = l == null ? 0 : Math.max(0.02, Math.min(1, (l - r.lo) / (r.hi - r.lo || 1)));
  return /* @__PURE__ */ a.jsxs("div", { className: "history-row", children: [
    /* @__PURE__ */ a.jsxs("span", { className: "history-day", children: [
      e.label[0],
      " ",
      /* @__PURE__ */ a.jsx("span", { children: e.label[1] })
    ] }),
    /* @__PURE__ */ a.jsxs("span", { className: "history-bar", children: [
      l != null && l > 0 && /* @__PURE__ */ a.jsx("i", { style: { width: `${o * 100}%` } }),
      /* @__PURE__ */ a.jsx("span", { className: "history-value", children: l == null ? "–" : t === "time" ? Hr(l) : `${l.toFixed(1)}°` })
    ] }),
    !n && /* @__PURE__ */ a.jsxs("span", { className: "history-temps", title: "Lowest and highest room temperature", children: [
      e.min != null ? `${e.min.toFixed(0)}°` : "–",
      /* @__PURE__ */ a.jsx("span", { children: e.max != null ? `${e.max.toFixed(0)}°` : "–" })
    ] })
  ] });
}
const mp = [
  { id: "control", label: "Control" },
  { id: "schedule", label: "Schedule" },
  { id: "history", label: "History" }
];
function vp({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  limits: l,
  showDevice: o,
  tab: i,
  onTab: s,
  onBack: u
}) {
  const [c, g] = b.useState(i === "schedule");
  b.useEffect(() => {
    i === "schedule" && g(!0);
  }, [i]);
  const p = r == null ? void 0 : r.status, v = [
    o ? t.name : null,
    p ? p.mode === "schedule" ? "On schedule" : p.mode === "boost" ? "Boosting" : p.mode === "off" ? "Off" : n === "water" ? "Always on" : "Manual" : "Waiting for the receiver"
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ a.jsxs("div", { className: "device-page", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "page-head", children: [
      /* @__PURE__ */ a.jsx("button", { className: "round ghost", onClick: u, "aria-label": "Back to the overview", children: /* @__PURE__ */ a.jsx(M, { name: "chevron-left" }) }),
      /* @__PURE__ */ a.jsxs("div", { className: "page-title", children: [
        /* @__PURE__ */ a.jsx("h2", { children: Bn[n] }),
        /* @__PURE__ */ a.jsx("span", { className: "muted small", children: v })
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "page-tabs", role: "tablist", children: mp.map((m) => /* @__PURE__ */ a.jsx("button", { role: "tab", "aria-selected": m.id === i, className: m.id === i ? "on" : "", onClick: () => s(m.id), children: m.label }, m.id)) }),
    i === "control" && /* @__PURE__ */ a.jsx(vc, { getHass: e, device: t, channel: n, info: r, showDevice: !1, limits: l, page: !0 }),
    c && /* @__PURE__ */ a.jsx("div", { hidden: i !== "schedule", children: /* @__PURE__ */ a.jsx(lp, { getHass: e, device: t, channel: n, limits: l, mode: (p == null ? void 0 : p.mode) ?? null }) }),
    i === "history" && /* @__PURE__ */ a.jsx(gc, { getHass: e, devices: [t], channel: n })
  ] });
}
const gp = 20, yp = 6e4;
function xp({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onOpenDevice: l
}) {
  const [o, i] = b.useState(null), [s, u] = b.useState(""), [c, g] = b.useState(!1), p = b.useCallback(() => {
    e().callWS({ type: "hive_local/rooms/valves" }).then((m) => i(m.valves)).catch((m) => u(Ue(m)));
  }, [e]);
  b.useEffect(() => {
    p();
    const m = setInterval(p, yp);
    return () => clearInterval(m);
  }, [p]);
  const v = t.length > 1;
  return /* @__PURE__ */ a.jsxs("div", { className: "stack devices-page", children: [
    /* @__PURE__ */ a.jsx("h2", { className: "history-title", children: "Devices" }),
    s && /* @__PURE__ */ a.jsx("div", { className: "status error", children: s }),
    /* @__PURE__ */ a.jsxs("div", { className: "device-grid", children: [
      t.map((m) => /* @__PURE__ */ a.jsx(kp, { device: m, status: n, onOpen: (y) => l(m.entry_id, y) }, m.entry_id)),
      o == null ? void 0 : o.map((m) => /* @__PURE__ */ a.jsx(Sp, { valve: m }, m.entity_id))
    ] }),
    o && !o.length && /* @__PURE__ */ a.jsx("p", { className: "muted", children: "No Hive radiator valves yet. Pair them with ZHA or Zigbee2MQTT and they'll show up here." }),
    v && /* @__PURE__ */ a.jsx("p", { className: "muted small", children: "Each receiver is a heating zone." }),
    /* @__PURE__ */ a.jsx("div", { className: "fab-wrap", children: /* @__PURE__ */ a.jsx("button", { className: "fab", "aria-label": "Add a device", onClick: () => g(!0), children: /* @__PURE__ */ a.jsx(M, { name: "plus" }) }) }),
    c && /* @__PURE__ */ a.jsx(jp, { onClose: () => g(!1) })
  ] });
}
const wp = { z2m: "Zigbee2MQTT", zha: "ZHA" };
function yc({ items: e }) {
  return /* @__PURE__ */ a.jsx("div", { className: "facts", children: e.map((t) => /* @__PURE__ */ a.jsxs("span", { className: `fact ${t.warn ? "warn" : ""}`, children: [
    /* @__PURE__ */ a.jsx(M, { name: t.icon }),
    " ",
    t.text
  ] }, t.text)) });
}
function xc({ online: e, text: t }) {
  return /* @__PURE__ */ a.jsxs("span", { className: `online ${e ? "" : "no"}`, children: [
    /* @__PURE__ */ a.jsx("i", {}),
    t ?? (e ? "Online" : "Not responding")
  ] });
}
function kp({ device: e, status: t, onOpen: n }) {
  const r = e.channels.some((l) => {
    var o, i;
    return (i = (o = t[e.entry_id]) == null ? void 0 : o[l]) == null ? void 0 : i.status;
  });
  return /* @__PURE__ */ a.jsxs("section", { className: "card hw", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "hw-head", children: [
      /* @__PURE__ */ a.jsx("span", { className: "device-icon", children: /* @__PURE__ */ a.jsx(M, { name: "radiator" }) }),
      /* @__PURE__ */ a.jsxs("div", { className: "device-name", children: [
        /* @__PURE__ */ a.jsx("span", { children: e.name }),
        /* @__PURE__ */ a.jsxs("span", { className: "muted small", children: [
          "Hive receiver",
          e.model ? ` · ${e.model}` : ""
        ] })
      ] }),
      /* @__PURE__ */ a.jsx(xc, { online: r, text: r ? "Online" : "Waiting" })
    ] }),
    /* @__PURE__ */ a.jsx(
      yc,
      {
        items: [
          { icon: "zigbee", text: wp[e.transport ?? "z2m"] },
          { icon: "fire", text: e.channels.includes("water") ? "Heating and hot water" : "Heating only" }
        ]
      }
    ),
    /* @__PURE__ */ a.jsx("div", { className: "hw-links", children: e.channels.map((l) => /* @__PURE__ */ a.jsxs("button", { className: "hw-link", onClick: () => n(l), children: [
      Bn[l],
      " ",
      /* @__PURE__ */ a.jsx(M, { name: "chevron-right" })
    ] }, l)) })
  ] });
}
function Sp({ valve: e }) {
  const t = e.battery != null && !Number.isNaN(Number(e.battery)) ? Number(e.battery) : null, n = t != null && t < gp;
  return /* @__PURE__ */ a.jsxs("section", { className: `card hw ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ a.jsxs("div", { className: "hw-head", children: [
      /* @__PURE__ */ a.jsx("span", { className: "device-icon", children: /* @__PURE__ */ a.jsx(M, { name: "thermostat" }) }),
      /* @__PURE__ */ a.jsxs("div", { className: "device-name", children: [
        /* @__PURE__ */ a.jsx("span", { children: e.name }),
        /* @__PURE__ */ a.jsx("span", { className: "muted small", children: "Hive radiator valve" })
      ] }),
      /* @__PURE__ */ a.jsx(xc, { online: e.available })
    ] }),
    /* @__PURE__ */ a.jsx(
      yc,
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
function jp({ onClose: e }) {
  const [t, n] = b.useState(!1);
  b.useEffect(() => {
    const l = (o) => o.key === "Escape" && e();
    return window.addEventListener("keydown", l), () => window.removeEventListener("keydown", l);
  }, [e]);
  const r = () => {
    history.pushState(null, "", "/config/integrations/dashboard/add?domain=hive_local"), window.dispatchEvent(new CustomEvent("location-changed")), e();
  };
  return /* @__PURE__ */ a.jsx("div", { className: "sheet-backdrop", onClick: e, children: /* @__PURE__ */ a.jsxs("div", { className: "sheet heat", role: "dialog", "aria-modal": "true", "aria-label": "Add a device", onClick: (l) => l.stopPropagation(), children: [
    /* @__PURE__ */ a.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ a.jsx("div", { className: "sheet-title", children: /* @__PURE__ */ a.jsx("h2", { children: "Add a device" }) }),
    /* @__PURE__ */ a.jsxs("div", { className: "add-options", children: [
      /* @__PURE__ */ a.jsxs("button", { className: "add-option", onClick: r, children: [
        /* @__PURE__ */ a.jsx("span", { className: "device-icon", children: /* @__PURE__ */ a.jsx(M, { name: "radiator" }) }),
        /* @__PURE__ */ a.jsxs("span", { className: "add-text", children: [
          /* @__PURE__ */ a.jsx("b", { children: "Hive receiver" }),
          /* @__PURE__ */ a.jsx("span", { className: "muted small", children: "A boiler receiver (another heating zone). Opens Home Assistant's setup for Hive Local." })
        ] }),
        /* @__PURE__ */ a.jsx(M, { name: "chevron-right" })
      ] }),
      /* @__PURE__ */ a.jsxs("button", { className: "add-option", onClick: () => n(!t), children: [
        /* @__PURE__ */ a.jsx("span", { className: "device-icon", children: /* @__PURE__ */ a.jsx(M, { name: "thermostat" }) }),
        /* @__PURE__ */ a.jsxs("span", { className: "add-text", children: [
          /* @__PURE__ */ a.jsx("b", { children: "Radiator valve" }),
          /* @__PURE__ */ a.jsx("span", { className: "muted small", children: t ? "Pair it with ZHA or Zigbee2MQTT first (Settings → Devices & services). It then appears here, and you can put it in a room on the Rooms tab." : "A Hive radiator valve (UK7004240)." })
        ] }),
        /* @__PURE__ */ a.jsx(M, { name: t ? "chevron-up" : "chevron-down" })
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("button", { className: "ghost sheet-cancel", onClick: e, children: "Close" })
  ] }) });
}
function Np({ value: e, onChange: t }) {
  return /* @__PURE__ */ a.jsxs("div", { className: "stepper", children: [
    /* @__PURE__ */ a.jsx("button", { className: "round", onClick: () => t(e - 0.5), "aria-label": "Lower", children: /* @__PURE__ */ a.jsx(M, { name: "minus" }) }),
    /* @__PURE__ */ a.jsxs("span", { className: "stepper-value", children: [
      e.toFixed(1),
      "°"
    ] }),
    /* @__PURE__ */ a.jsx("button", { className: "round", onClick: () => t(e + 0.5), "aria-label": "Raise", children: /* @__PURE__ */ a.jsx(M, { name: "plus" }) })
  ] });
}
const _p = 20, hl = (e) => e == null ? "–" : `${e.toFixed(1)}°`;
function Cp({ getHass: e }) {
  const [t, n] = b.useState(null), [r, l] = b.useState([]), [o, i] = b.useState(null), [s, u] = b.useState("");
  return b.useEffect(() => {
    const c = e().connection.subscribeMessage(
      (g) => {
        n(g.rooms), l(g.receivers);
      },
      { type: "hive_local/rooms/subscribe" }
    );
    return c.catch((g) => u(Ue(g))), () => {
      c.then((g) => g()).catch(() => {
      });
    };
  }, [e]), s ? /* @__PURE__ */ a.jsx("div", { className: "status error", children: s }) : t ? /* @__PURE__ */ a.jsxs("div", { className: "stack rooms-page", children: [
    /* @__PURE__ */ a.jsx("h2", { className: "history-title", children: "Rooms" }),
    o === "new" && /* @__PURE__ */ a.jsx(ns, { getHass: e, onDone: () => i(null) }),
    !t.length && o !== "new" && /* @__PURE__ */ a.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ a.jsx(M, { name: "home-thermometer-outline" }),
      /* @__PURE__ */ a.jsx("p", { children: "No rooms yet. Tap + to add a room and pick its Hive radiator valves (on ZHA or Zigbee2MQTT)." })
    ] }),
    Ep(t, r).map(([c, g]) => /* @__PURE__ */ a.jsxs("section", { className: "zone", children: [
      c && /* @__PURE__ */ a.jsx("h3", { children: c }),
      /* @__PURE__ */ a.jsx("div", { className: "grid", children: g.map(
        (p) => o !== "new" && (o == null ? void 0 : o.id) === p.id ? /* @__PURE__ */ a.jsx(ns, { getHass: e, room: p, onDone: () => i(null) }, p.id) : /* @__PURE__ */ a.jsx(zp, { getHass: e, room: p, onEdit: () => i(p) }, p.id)
      ) })
    ] }, c ?? "all")),
    /* @__PURE__ */ a.jsx("div", { className: "fab-wrap", children: /* @__PURE__ */ a.jsx("button", { className: "fab", "aria-label": "Add a room", onClick: () => {
      i("new"), window.scrollTo({ top: 0 });
    }, children: /* @__PURE__ */ a.jsx(M, { name: "plus" }) }) })
  ] }) : null;
}
function Ep(e, t) {
  if (t.length <= 1) return e.length ? [[null, e]] : [];
  const n = t.map((l) => [`Heated by ${l.name}`, e.filter((o) => o.receiver === l.entry_id)]).filter(([, l]) => l.length), r = e.filter((l) => !t.some((o) => o.entry_id === l.receiver));
  return r.length && n.push(["Receiver not set", r]), n;
}
function zp({ getHass: e, room: t, onEdit: n }) {
  var p;
  const [r, l] = b.useState(null), [o, i] = b.useState(null), s = b.useRef(), u = r ?? t.target ?? ((p = t.target_range) == null ? void 0 : p[1]) ?? 20, c = (v) => {
    const m = Math.min(35, Math.max(5, v));
    l(m), i(null), window.clearTimeout(s.current), s.current = window.setTimeout(async () => {
      try {
        const y = await e().callWS({
          type: "hive_local/rooms/set_target",
          room_id: t.id,
          temperature: m
        });
        if (y.failed.length) {
          const w = t.valve_states.filter((T) => y.failed.includes(T.entity_id)).map((T) => T.name);
          i({ kind: "error", text: `Didn't take on ${w.join(", ")}. It may be asleep; try again shortly.` });
        }
      } catch (y) {
        i({ kind: "error", text: Ue(y) });
      } finally {
        l(null);
      }
    }, 700);
  }, g = t.temperature_source === "sensor" ? t.sensor_name : t.temperature_source === "valves" ? t.valve_states.filter((v) => v.available).length === 1 ? "From the valve" : "Average of the valves" : "No reading";
  return /* @__PURE__ */ a.jsxs("section", { className: `card room ${t.heating ? "heating" : ""}`, children: [
    /* @__PURE__ */ a.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ a.jsx(M, { name: "home-thermometer-outline", className: "title-icon" }),
        /* @__PURE__ */ a.jsx("h2", { children: t.name })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "chips", children: [
        t.heating ? /* @__PURE__ */ a.jsxs("span", { className: "chip heating", children: [
          /* @__PURE__ */ a.jsx(M, { name: "fire" }),
          " Heating"
        ] }) : /* @__PURE__ */ a.jsx("span", { className: "chip", children: "Idle" }),
        /* @__PURE__ */ a.jsx("button", { className: "ghost round", onClick: n, "aria-label": `Edit ${t.name}`, children: /* @__PURE__ */ a.jsx(M, { name: "pencil-outline" }) })
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "room-now", children: [
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsxs("div", { className: "room-temp", children: [
          t.current_temperature == null ? "–" : t.current_temperature.toFixed(1),
          /* @__PURE__ */ a.jsx("span", { className: "unit", children: "°C" })
        ] }),
        /* @__PURE__ */ a.jsx("div", { className: "muted small", children: g })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "room-target", children: [
        /* @__PURE__ */ a.jsx("span", { className: "muted small", children: t.target_range && r == null ? `Valves set to ${hl(t.target_range[0])}–${hl(t.target_range[1])}` : "Target" }),
        /* @__PURE__ */ a.jsx(Np, { value: u, onChange: c })
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("ul", { className: "valves", children: t.valve_states.map((v) => /* @__PURE__ */ a.jsx(bp, { valve: v, heating: t.heating_valves.includes(v.entity_id) }, v.entity_id)) }),
    o && /* @__PURE__ */ a.jsx("div", { className: `status ${o.kind}`, children: o.text })
  ] });
}
function bp({ valve: e, heating: t }) {
  const n = e.battery == null ? null : Number(e.battery), r = n != null && !Number.isNaN(n) && n <= _p;
  return /* @__PURE__ */ a.jsxs("li", { className: `valve ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ a.jsx(M, { name: t ? "fire" : "radiator", className: t ? "valve-icon heating" : "valve-icon" }),
    /* @__PURE__ */ a.jsx("span", { className: "valve-name", children: e.name }),
    e.available ? /* @__PURE__ */ a.jsxs("span", { className: "valve-temps", children: [
      hl(e.current_temperature),
      " ",
      /* @__PURE__ */ a.jsxs("span", { className: "muted", children: [
        "→ ",
        hl(e.target)
      ] })
    ] }) : /* @__PURE__ */ a.jsx("span", { className: "chip", children: "Unavailable" }),
    n != null && !Number.isNaN(n) && /* @__PURE__ */ a.jsxs("span", { className: `battery ${r ? "low" : ""}`, title: r ? "Battery low" : "Battery", children: [
      /* @__PURE__ */ a.jsx(M, { name: r ? "battery-alert-variant-outline" : "battery-outline" }),
      " ",
      Math.round(n),
      "%"
    ] })
  ] });
}
function ns({ getHass: e, room: t, onDone: n }) {
  const [r, l] = b.useState(null), [o, i] = b.useState((t == null ? void 0 : t.receiver) ?? ""), [s, u] = b.useState((t == null ? void 0 : t.name) ?? ""), [c, g] = b.useState(new Set((t == null ? void 0 : t.valves) ?? [])), [p, v] = b.useState((t == null ? void 0 : t.sensor) ?? ""), [m, y] = b.useState(!1), [w, T] = b.useState(!1), [f, d] = b.useState("");
  b.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/candidates" }).then(l).catch((x) => d(Ue(x)));
  }, [e]);
  const h = ((r == null ? void 0 : r.receivers.length) ?? 0) > 1, k = async (x) => {
    y(!0), d("");
    try {
      await e().callWS(x), n();
    } catch (P) {
      d(Ue(P)), y(!1);
    }
  }, _ = (x) => g((P) => {
    const $ = new Set(P);
    return $.has(x) ? $.delete(x) : $.add(x), $;
  }), j = /* @__PURE__ */ new Map();
  for (const x of (r == null ? void 0 : r.valves) ?? []) j.set(x.area ?? "No area", [...j.get(x.area ?? "No area") ?? [], x]);
  return /* @__PURE__ */ a.jsxs("section", { className: "card room-editor", children: [
    /* @__PURE__ */ a.jsx("h2", { children: t ? `Edit ${t.name}` : "New room" }),
    /* @__PURE__ */ a.jsxs(
      "form",
      {
        className: "stack",
        onSubmit: (x) => {
          x.preventDefault(), k({
            type: "hive_local/rooms/save",
            ...t ? { room_id: t.id } : {},
            name: s,
            valves: [...c],
            sensor: p || null,
            receiver: o || null
          });
        },
        children: [
          /* @__PURE__ */ a.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Name" }),
            /* @__PURE__ */ a.jsx("input", { id: `room-name-${(t == null ? void 0 : t.id) ?? "new"}`, type: "text", value: s, maxLength: 40, placeholder: "Lounge", onChange: (x) => u(x.target.value) })
          ] }),
          /* @__PURE__ */ a.jsxs("fieldset", { className: "field", children: [
            /* @__PURE__ */ a.jsx("legend", { children: "Hive radiator valves" }),
            !r && !f && /* @__PURE__ */ a.jsx("span", { className: "muted small", children: "Loading…" }),
            r && !r.valves.length && /* @__PURE__ */ a.jsx("span", { className: "muted small", children: "No Hive radiator valves found. Pair them with ZHA or Zigbee2MQTT first." }),
            [...j].map(([x, P]) => /* @__PURE__ */ a.jsxs("div", { className: "checklist", children: [
              /* @__PURE__ */ a.jsx("span", { className: "muted small", children: x }),
              P.map(($) => /* @__PURE__ */ a.jsxs("label", { className: "pick", children: [
                /* @__PURE__ */ a.jsx("input", { type: "checkbox", checked: c.has($.entity_id), onChange: () => _($.entity_id) }),
                " ",
                $.name
              ] }, $.entity_id))
            ] }, x))
          ] }),
          /* @__PURE__ */ a.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Room temperature from" }),
            /* @__PURE__ */ a.jsxs("select", { id: `room-sensor-${(t == null ? void 0 : t.id) ?? "new"}`, value: p, onChange: (x) => v(x.target.value), children: [
              /* @__PURE__ */ a.jsx("option", { value: "", children: "The valves (their average)" }),
              ((r == null ? void 0 : r.sensors) ?? []).map((x) => /* @__PURE__ */ a.jsxs("option", { value: x.entity_id, children: [
                x.name,
                x.area ? ` · ${x.area}` : ""
              ] }, x.entity_id))
            ] })
          ] }),
          h && /* @__PURE__ */ a.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Heated by" }),
            /* @__PURE__ */ a.jsxs("select", { id: `room-receiver-${(t == null ? void 0 : t.id) ?? "new"}`, value: o, onChange: (x) => i(x.target.value), children: [
              /* @__PURE__ */ a.jsx("option", { value: "", disabled: !0, children: "Choose the receiver for this room's radiators" }),
              r.receivers.map((x) => /* @__PURE__ */ a.jsx("option", { value: x.entry_id, children: x.name }, x.entry_id))
            ] })
          ] }),
          f && /* @__PURE__ */ a.jsx("div", { className: "status error", children: f }),
          /* @__PURE__ */ a.jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ a.jsx("button", { className: "primary", type: "submit", disabled: m || !s.trim() || !c.size || h && !o, children: t ? "Save" : "Add room" }),
            /* @__PURE__ */ a.jsx("button", { type: "button", className: "ghost", onClick: n, disabled: m, children: "Cancel" }),
            /* @__PURE__ */ a.jsx("span", { className: "spacer" }),
            t && (w ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
              /* @__PURE__ */ a.jsxs("span", { className: "muted small", children: [
                "Delete ",
                t.name,
                "? The valves aren't changed."
              ] }),
              /* @__PURE__ */ a.jsx("button", { type: "button", className: "danger", disabled: m, onClick: () => k({ type: "hive_local/rooms/delete", room_id: t.id }), children: "Delete" }),
              /* @__PURE__ */ a.jsx("button", { type: "button", className: "ghost", onClick: () => T(!1), children: "Keep" })
            ] }) : /* @__PURE__ */ a.jsxs("button", { type: "button", className: "danger", onClick: () => T(!0), disabled: m, children: [
              /* @__PURE__ */ a.jsx(M, { name: "delete-outline" }),
              " Delete room"
            ] }))
          ] })
        ]
      }
    )
  ] });
}
const Tp = [
  { id: "overview", label: "Overview", icon: "view-dashboard-outline" },
  { id: "rooms", label: "Rooms", icon: "home-thermometer-outline" },
  { id: "devices", label: "Devices", icon: "devices" },
  { id: "stats", label: "Stats", icon: "chart-box-outline" }
];
function Pp({ getHass: e, narrow: t, onToggleMenu: n }) {
  var _;
  const [r, l] = b.useState([]), [o, i] = b.useState(null), [s, u] = b.useState({}), [c, g] = b.useState("overview"), [p, v] = b.useState(null), [m, y] = b.useState("control"), [w, T] = b.useState("");
  b.useEffect(() => {
    e().callWS({ type: "hive_local/devices" }).then((x) => {
      l(x.devices), i(x.limits);
    }).catch((x) => T(Ue(x)));
    const j = e().connection.subscribeMessage(
      (x) => u(x.status),
      { type: "hive_local/subscribe" }
    );
    return () => {
      j.then((x) => x()).catch(() => {
      });
    };
  }, [e]);
  const f = (j, x) => {
    v({ entry: j, channel: x }), y("control");
  }, d = (j) => {
    g(j), v(null);
  }, h = p && r.find((j) => j.entry_id === p.entry), k = Tp;
  return /* @__PURE__ */ a.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ a.jsx("header", { children: /* @__PURE__ */ a.jsxs("div", { className: "toolbar-row", children: [
      t && /* @__PURE__ */ a.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ a.jsx(M, { name: "menu" }) }),
      /* @__PURE__ */ a.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ a.jsx(es, {}),
        /* @__PURE__ */ a.jsx("h1", { children: "Hive Local" })
      ] }),
      /* @__PURE__ */ a.jsx("nav", { className: "tabs", role: "tablist", children: k.map((j) => /* @__PURE__ */ a.jsxs("button", { role: "tab", "aria-selected": j.id === c, className: j.id === c ? "on" : "", onClick: () => d(j.id), children: [
        /* @__PURE__ */ a.jsx(M, { name: j.icon }),
        /* @__PURE__ */ a.jsx("span", { children: j.label })
      ] }, j.id)) })
    ] }) }),
    /* @__PURE__ */ a.jsxs("main", { children: [
      w && /* @__PURE__ */ a.jsx("div", { className: "status error", children: w }),
      !r.length && !w && /* @__PURE__ */ a.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ a.jsx(es, { size: 56 }),
        /* @__PURE__ */ a.jsx("p", { children: "No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local." })
      ] }),
      h && o ? /* @__PURE__ */ a.jsx(
        vp,
        {
          getHass: e,
          device: h,
          channel: p.channel,
          info: (_ = s[h.entry_id]) == null ? void 0 : _[p.channel],
          limits: o,
          showDevice: r.length > 1,
          tab: m,
          onTab: y,
          onBack: () => v(null)
        },
        `${p.entry}-${p.channel}`
      ) : /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        c === "overview" && /* @__PURE__ */ a.jsx(Jf, { getHass: e, devices: r, status: s, limits: o, onOpenDevice: f, onRooms: () => d("rooms") }),
        c === "rooms" && r.length > 0 && /* @__PURE__ */ a.jsx(Cp, { getHass: e }),
        c === "devices" && r.length > 0 && /* @__PURE__ */ a.jsx(xp, { getHass: e, devices: r, status: s, limits: o, onOpenDevice: f }),
        c === "stats" && r.length > 0 && /* @__PURE__ */ a.jsx(gc, { getHass: e, devices: r })
      ] })
    ] })
  ] });
}
const Lp = (
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
.danger-text { color: var(--error-color, #db4437); }

/* Rooms */
.dot-heating { width: 10px; height: 10px; border-radius: 50%; background: var(--hl-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hl-accent) 20%, transparent); flex: none; }
.zone { display: flex; flex-direction: column; gap: 10px; }
.zone h3 { margin: 4px 0 0; }
/* Room for the + button under the last room / device. */
.rooms-page, .devices-page { padding-bottom: 72px; }
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
class Mp extends HTMLElement {
  constructor() {
    super(...arguments);
    fr(this, "_hass");
    fr(this, "_narrow", !1);
    fr(this, "_root");
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
      r.textContent = Lp;
      const l = document.createElement("div");
      n.append(r, l), this._root = mc(l);
    }
    this._render();
  }
  disconnectedCallback() {
    var n, r;
    (n = this._root) == null || n.unmount(), this._root = void 0, (r = this.shadowRoot) == null || r.replaceChildren();
  }
  _render() {
    !this._root || !this._hass || this._root.render(
      /* @__PURE__ */ a.jsx(
        Pp,
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
customElements.get("hive-local-panel") || customElements.define("hive-local-panel", Mp);
