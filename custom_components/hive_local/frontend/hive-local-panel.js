var Pc = Object.defineProperty;
var Mc = (e, t, n) => t in e ? Pc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var dr = (e, t, n) => Mc(e, typeof t != "symbol" ? t + "" : t, n);
var ua = { exports: {} }, ml = {}, ca = { exports: {} }, O = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lr = Symbol.for("react.element"), Tc = Symbol.for("react.portal"), Lc = Symbol.for("react.fragment"), $c = Symbol.for("react.strict_mode"), Rc = Symbol.for("react.profiler"), Oc = Symbol.for("react.provider"), Dc = Symbol.for("react.context"), Fc = Symbol.for("react.forward_ref"), Ic = Symbol.for("react.suspense"), Ac = Symbol.for("react.memo"), Uc = Symbol.for("react.lazy"), bi = Symbol.iterator;
function Bc(e) {
  return e === null || typeof e != "object" ? null : (e = bi && e[bi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var da = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, fa = Object.assign, pa = {};
function vn(e, t, n) {
  this.props = e, this.context = t, this.refs = pa, this.updater = n || da;
}
vn.prototype.isReactComponent = {};
vn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
vn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ha() {
}
ha.prototype = vn.prototype;
function ei(e, t, n) {
  this.props = e, this.context = t, this.refs = pa, this.updater = n || da;
}
var ti = ei.prototype = new ha();
ti.constructor = ei;
fa(ti, vn.prototype);
ti.isPureReactComponent = !0;
var Gi = Array.isArray, ma = Object.prototype.hasOwnProperty, ni = { current: null }, va = { key: !0, ref: !0, __self: !0, __source: !0 };
function ga(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) ma.call(t, r) && !va.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var u = Array(a), d = 0; d < a; d++) u[d] = arguments[d + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: lr, type: e, key: o, ref: i, props: l, _owner: ni.current };
}
function Hc(e, t) {
  return { $$typeof: lr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ri(e) {
  return typeof e == "object" && e !== null && e.$$typeof === lr;
}
function Wc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Zi = /\/+/g;
function $l(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Wc("" + e.key) : t.toString(36);
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
        case lr:
        case Tc:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + $l(i, 0) : r, Gi(l) ? (n = "", e != null && (n = e.replace(Zi, "$&/") + "/"), Tr(l, t, n, "", function(d) {
    return d;
  })) : l != null && (ri(l) && (l = Hc(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Zi, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Gi(e)) for (var a = 0; a < e.length; a++) {
    o = e[a];
    var u = r + $l(o, a);
    i += Tr(o, t, n, u, l);
  }
  else if (u = Bc(e), typeof u == "function") for (e = u.call(e), a = 0; !(o = e.next()).done; ) o = o.value, u = r + $l(o, a++), i += Tr(o, t, n, u, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function fr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Tr(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Vc(e) {
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
var he = { current: null }, Lr = { transition: null }, Qc = { ReactCurrentDispatcher: he, ReactCurrentBatchConfig: Lr, ReactCurrentOwner: ni };
function ya() {
  throw Error("act(...) is not supported in production builds of React.");
}
O.Children = { map: fr, forEach: function(e, t, n) {
  fr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return fr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return fr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!ri(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
O.Component = vn;
O.Fragment = Lc;
O.Profiler = Rc;
O.PureComponent = ei;
O.StrictMode = $c;
O.Suspense = Ic;
O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Qc;
O.act = ya;
O.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = fa({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = ni.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (u in t) ma.call(t, u) && !va.hasOwnProperty(u) && (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    a = Array(u);
    for (var d = 0; d < u; d++) a[d] = arguments[d + 2];
    r.children = a;
  }
  return { $$typeof: lr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
O.createContext = function(e) {
  return e = { $$typeof: Dc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Oc, _context: e }, e.Consumer = e;
};
O.createElement = ga;
O.createFactory = function(e) {
  var t = ga.bind(null, e);
  return t.type = e, t;
};
O.createRef = function() {
  return { current: null };
};
O.forwardRef = function(e) {
  return { $$typeof: Fc, render: e };
};
O.isValidElement = ri;
O.lazy = function(e) {
  return { $$typeof: Uc, _payload: { _status: -1, _result: e }, _init: Vc };
};
O.memo = function(e, t) {
  return { $$typeof: Ac, type: e, compare: t === void 0 ? null : t };
};
O.startTransition = function(e) {
  var t = Lr.transition;
  Lr.transition = {};
  try {
    e();
  } finally {
    Lr.transition = t;
  }
};
O.unstable_act = ya;
O.useCallback = function(e, t) {
  return he.current.useCallback(e, t);
};
O.useContext = function(e) {
  return he.current.useContext(e);
};
O.useDebugValue = function() {
};
O.useDeferredValue = function(e) {
  return he.current.useDeferredValue(e);
};
O.useEffect = function(e, t) {
  return he.current.useEffect(e, t);
};
O.useId = function() {
  return he.current.useId();
};
O.useImperativeHandle = function(e, t, n) {
  return he.current.useImperativeHandle(e, t, n);
};
O.useInsertionEffect = function(e, t) {
  return he.current.useInsertionEffect(e, t);
};
O.useLayoutEffect = function(e, t) {
  return he.current.useLayoutEffect(e, t);
};
O.useMemo = function(e, t) {
  return he.current.useMemo(e, t);
};
O.useReducer = function(e, t, n) {
  return he.current.useReducer(e, t, n);
};
O.useRef = function(e) {
  return he.current.useRef(e);
};
O.useState = function(e) {
  return he.current.useState(e);
};
O.useSyncExternalStore = function(e, t, n) {
  return he.current.useSyncExternalStore(e, t, n);
};
O.useTransition = function() {
  return he.current.useTransition();
};
O.version = "18.3.1";
ca.exports = O;
var T = ca.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kc = T, Yc = Symbol.for("react.element"), Xc = Symbol.for("react.fragment"), bc = Object.prototype.hasOwnProperty, Gc = Kc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Zc = { key: !0, ref: !0, __self: !0, __source: !0 };
function xa(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) bc.call(t, r) && !Zc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Yc, type: e, key: o, ref: i, props: l, _owner: Gc.current };
}
ml.Fragment = Xc;
ml.jsx = xa;
ml.jsxs = xa;
ua.exports = ml;
var s = ua.exports, wa = { exports: {} }, _e = {}, ka = { exports: {} }, Sa = {};
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
  function t(P, $) {
    var R = P.length;
    P.push($);
    e: for (; 0 < R; ) {
      var Z = R - 1 >>> 1, ne = P[Z];
      if (0 < l(ne, $)) P[Z] = $, P[R] = ne, R = Z;
      else break e;
    }
  }
  function n(P) {
    return P.length === 0 ? null : P[0];
  }
  function r(P) {
    if (P.length === 0) return null;
    var $ = P[0], R = P.pop();
    if (R !== $) {
      P[0] = R;
      e: for (var Z = 0, ne = P.length, ur = ne >>> 1; Z < ur; ) {
        var Et = 2 * (Z + 1) - 1, Ll = P[Et], zt = Et + 1, cr = P[zt];
        if (0 > l(Ll, R)) zt < ne && 0 > l(cr, Ll) ? (P[Z] = cr, P[zt] = R, Z = zt) : (P[Z] = Ll, P[Et] = R, Z = Et);
        else if (zt < ne && 0 > l(cr, R)) P[Z] = cr, P[zt] = R, Z = zt;
        else break e;
      }
    }
    return $;
  }
  function l(P, $) {
    var R = P.sortIndex - $.sortIndex;
    return R !== 0 ? R : P.id - $.id;
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
  var u = [], d = [], v = 1, m = null, h = 3, g = !1, w = !1, k = !1, M = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function f(P) {
    for (var $ = n(d); $ !== null; ) {
      if ($.callback === null) r(d);
      else if ($.startTime <= P) r(d), $.sortIndex = $.expirationTime, t(u, $);
      else break;
      $ = n(d);
    }
  }
  function x(P) {
    if (k = !1, f(P), !w) if (n(u) !== null) w = !0, Ct(y);
    else {
      var $ = n(d);
      $ !== null && Tl(x, $.startTime - P);
    }
  }
  function y(P, $) {
    w = !1, k && (k = !1, p(E), E = -1), g = !0;
    var R = h;
    try {
      for (f($), m = n(u); m !== null && (!(m.expirationTime > $) || P && !_()); ) {
        var Z = m.callback;
        if (typeof Z == "function") {
          m.callback = null, h = m.priorityLevel;
          var ne = Z(m.expirationTime <= $);
          $ = e.unstable_now(), typeof ne == "function" ? m.callback = ne : m === n(u) && r(u), f($);
        } else r(u);
        m = n(u);
      }
      if (m !== null) var ur = !0;
      else {
        var Et = n(d);
        Et !== null && Tl(x, Et.startTime - $), ur = !1;
      }
      return ur;
    } finally {
      m = null, h = R, g = !1;
    }
  }
  var C = !1, S = null, E = -1, L = 5, N = -1;
  function _() {
    return !(e.unstable_now() - N < L);
  }
  function D() {
    if (S !== null) {
      var P = e.unstable_now();
      N = P;
      var $ = !0;
      try {
        $ = S(!0, P);
      } finally {
        $ ? U() : (C = !1, S = null);
      }
    } else C = !1;
  }
  var U;
  if (typeof c == "function") U = function() {
    c(D);
  };
  else if (typeof MessageChannel < "u") {
    var G = new MessageChannel(), rt = G.port2;
    G.port1.onmessage = D, U = function() {
      rt.postMessage(null);
    };
  } else U = function() {
    M(D, 0);
  };
  function Ct(P) {
    S = P, C || (C = !0, U());
  }
  function Tl(P, $) {
    E = M(function() {
      P(e.unstable_now());
    }, $);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(P) {
    P.callback = null;
  }, e.unstable_continueExecution = function() {
    w || g || (w = !0, Ct(y));
  }, e.unstable_forceFrameRate = function(P) {
    0 > P || 125 < P ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : L = 0 < P ? Math.floor(1e3 / P) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(P) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var $ = 3;
        break;
      default:
        $ = h;
    }
    var R = h;
    h = $;
    try {
      return P();
    } finally {
      h = R;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(P, $) {
    switch (P) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        P = 3;
    }
    var R = h;
    h = P;
    try {
      return $();
    } finally {
      h = R;
    }
  }, e.unstable_scheduleCallback = function(P, $, R) {
    var Z = e.unstable_now();
    switch (typeof R == "object" && R !== null ? (R = R.delay, R = typeof R == "number" && 0 < R ? Z + R : Z) : R = Z, P) {
      case 1:
        var ne = -1;
        break;
      case 2:
        ne = 250;
        break;
      case 5:
        ne = 1073741823;
        break;
      case 4:
        ne = 1e4;
        break;
      default:
        ne = 5e3;
    }
    return ne = R + ne, P = { id: v++, callback: $, priorityLevel: P, startTime: R, expirationTime: ne, sortIndex: -1 }, R > Z ? (P.sortIndex = R, t(d, P), n(u) === null && P === n(d) && (k ? (p(E), E = -1) : k = !0, Tl(x, R - Z))) : (P.sortIndex = ne, t(u, P), w || g || (w = !0, Ct(y))), P;
  }, e.unstable_shouldYield = _, e.unstable_wrapCallback = function(P) {
    var $ = h;
    return function() {
      var R = h;
      h = $;
      try {
        return P.apply(this, arguments);
      } finally {
        h = R;
      }
    };
  };
})(Sa);
ka.exports = Sa;
var Jc = ka.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qc = T, Ne = Jc;
function j(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ja = /* @__PURE__ */ new Set(), Bn = {};
function Bt(e, t) {
  un(e, t), un(e + "Capture", t);
}
function un(e, t) {
  for (Bn[e] = t, e = 0; e < t.length; e++) ja.add(t[e]);
}
var Ze = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), oo = Object.prototype.hasOwnProperty, ed = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ji = {}, qi = {};
function td(e) {
  return oo.call(qi, e) ? !0 : oo.call(Ji, e) ? !1 : ed.test(e) ? qi[e] = !0 : (Ji[e] = !0, !1);
}
function nd(e, t, n, r) {
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
function rd(e, t, n, r) {
  if (t === null || typeof t > "u" || nd(e, t, n, r)) return !0;
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
function me(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var se = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  se[e] = new me(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  se[t] = new me(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  se[e] = new me(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  se[e] = new me(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  se[e] = new me(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  se[e] = new me(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  se[e] = new me(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  se[e] = new me(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  se[e] = new me(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var li = /[\-:]([a-z])/g;
function oi(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    li,
    oi
  );
  se[t] = new me(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(li, oi);
  se[t] = new me(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(li, oi);
  se[t] = new me(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  se[e] = new me(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
se.xlinkHref = new me("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  se[e] = new me(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ii(e, t, n, r) {
  var l = se.hasOwnProperty(t) ? se[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (rd(t, n, l, r) && (n = null), r || l === null ? td(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var nt = qc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, pr = Symbol.for("react.element"), Vt = Symbol.for("react.portal"), Qt = Symbol.for("react.fragment"), si = Symbol.for("react.strict_mode"), io = Symbol.for("react.profiler"), Na = Symbol.for("react.provider"), _a = Symbol.for("react.context"), ai = Symbol.for("react.forward_ref"), so = Symbol.for("react.suspense"), ao = Symbol.for("react.suspense_list"), ui = Symbol.for("react.memo"), ot = Symbol.for("react.lazy"), Ca = Symbol.for("react.offscreen"), es = Symbol.iterator;
function xn(e) {
  return e === null || typeof e != "object" ? null : (e = es && e[es] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Y = Object.assign, Rl;
function En(e) {
  if (Rl === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Rl = t && t[1] || "";
  }
  return `
` + Rl + e;
}
var Ol = !1;
function Dl(e, t) {
  if (!e || Ol) return "";
  Ol = !0;
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
              var u = `
` + l[i].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= i && 0 <= a);
        break;
      }
    }
  } finally {
    Ol = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? En(e) : "";
}
function ld(e) {
  switch (e.tag) {
    case 5:
      return En(e.type);
    case 16:
      return En("Lazy");
    case 13:
      return En("Suspense");
    case 19:
      return En("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Dl(e.type, !1), e;
    case 11:
      return e = Dl(e.type.render, !1), e;
    case 1:
      return e = Dl(e.type, !0), e;
    default:
      return "";
  }
}
function uo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Qt:
      return "Fragment";
    case Vt:
      return "Portal";
    case io:
      return "Profiler";
    case si:
      return "StrictMode";
    case so:
      return "Suspense";
    case ao:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case _a:
      return (e.displayName || "Context") + ".Consumer";
    case Na:
      return (e._context.displayName || "Context") + ".Provider";
    case ai:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case ui:
      return t = e.displayName || null, t !== null ? t : uo(e.type) || "Memo";
    case ot:
      t = e._payload, e = e._init;
      try {
        return uo(e(t));
      } catch {
      }
  }
  return null;
}
function od(e) {
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
      return uo(t);
    case 8:
      return t === si ? "StrictMode" : "Mode";
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
function Ea(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function id(e) {
  var t = Ea(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function hr(e) {
  e._valueTracker || (e._valueTracker = id(e));
}
function za(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Ea(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Wr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function co(e, t) {
  var n = t.checked;
  return Y({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function ts(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = kt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Pa(e, t) {
  t = t.checked, t != null && ii(e, "checked", t, !1);
}
function fo(e, t) {
  Pa(e, t);
  var n = kt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? po(e, t.type, n) : t.hasOwnProperty("defaultValue") && po(e, t.type, kt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function ns(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function po(e, t, n) {
  (t !== "number" || Wr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var zn = Array.isArray;
function nn(e, t, n, r) {
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
function ho(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(j(91));
  return Y({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function rs(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(j(92));
      if (zn(n)) {
        if (1 < n.length) throw Error(j(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: kt(n) };
}
function Ma(e, t) {
  var n = kt(t.value), r = kt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ls(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ta(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function mo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ta(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var mr, La = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (mr = mr || document.createElement("div"), mr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = mr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Hn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Ln = {
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
}, sd = ["Webkit", "ms", "Moz", "O"];
Object.keys(Ln).forEach(function(e) {
  sd.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Ln[t] = Ln[e];
  });
});
function $a(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Ln.hasOwnProperty(e) && Ln[e] ? ("" + t).trim() : t + "px";
}
function Ra(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = $a(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var ad = Y({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function vo(e, t) {
  if (t) {
    if (ad[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(j(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(j(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(j(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(j(62));
  }
}
function go(e, t) {
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
var yo = null;
function ci(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var xo = null, rn = null, ln = null;
function os(e) {
  if (e = sr(e)) {
    if (typeof xo != "function") throw Error(j(280));
    var t = e.stateNode;
    t && (t = wl(t), xo(e.stateNode, e.type, t));
  }
}
function Oa(e) {
  rn ? ln ? ln.push(e) : ln = [e] : rn = e;
}
function Da() {
  if (rn) {
    var e = rn, t = ln;
    if (ln = rn = null, os(e), t) for (e = 0; e < t.length; e++) os(t[e]);
  }
}
function Fa(e, t) {
  return e(t);
}
function Ia() {
}
var Fl = !1;
function Aa(e, t, n) {
  if (Fl) return e(t, n);
  Fl = !0;
  try {
    return Fa(e, t, n);
  } finally {
    Fl = !1, (rn !== null || ln !== null) && (Ia(), Da());
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
  if (n && typeof n != "function") throw Error(j(231, t, typeof n));
  return n;
}
var wo = !1;
if (Ze) try {
  var wn = {};
  Object.defineProperty(wn, "passive", { get: function() {
    wo = !0;
  } }), window.addEventListener("test", wn, wn), window.removeEventListener("test", wn, wn);
} catch {
  wo = !1;
}
function ud(e, t, n, r, l, o, i, a, u) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (v) {
    this.onError(v);
  }
}
var $n = !1, Vr = null, Qr = !1, ko = null, cd = { onError: function(e) {
  $n = !0, Vr = e;
} };
function dd(e, t, n, r, l, o, i, a, u) {
  $n = !1, Vr = null, ud.apply(cd, arguments);
}
function fd(e, t, n, r, l, o, i, a, u) {
  if (dd.apply(this, arguments), $n) {
    if ($n) {
      var d = Vr;
      $n = !1, Vr = null;
    } else throw Error(j(198));
    Qr || (Qr = !0, ko = d);
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
function Ua(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function is(e) {
  if (Ht(e) !== e) throw Error(j(188));
}
function pd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Ht(e), t === null) throw Error(j(188));
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
        if (o === n) return is(l), e;
        if (o === r) return is(l), t;
        o = o.sibling;
      }
      throw Error(j(188));
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
        if (!i) throw Error(j(189));
      }
    }
    if (n.alternate !== r) throw Error(j(190));
  }
  if (n.tag !== 3) throw Error(j(188));
  return n.stateNode.current === n ? e : t;
}
function Ba(e) {
  return e = pd(e), e !== null ? Ha(e) : null;
}
function Ha(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ha(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Wa = Ne.unstable_scheduleCallback, ss = Ne.unstable_cancelCallback, hd = Ne.unstable_shouldYield, md = Ne.unstable_requestPaint, J = Ne.unstable_now, vd = Ne.unstable_getCurrentPriorityLevel, di = Ne.unstable_ImmediatePriority, Va = Ne.unstable_UserBlockingPriority, Kr = Ne.unstable_NormalPriority, gd = Ne.unstable_LowPriority, Qa = Ne.unstable_IdlePriority, vl = null, We = null;
function yd(e) {
  if (We && typeof We.onCommitFiberRoot == "function") try {
    We.onCommitFiberRoot(vl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Fe = Math.clz32 ? Math.clz32 : kd, xd = Math.log, wd = Math.LN2;
function kd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (xd(e) / wd | 0) | 0;
}
var vr = 64, gr = 4194304;
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
    var a = i & ~l;
    a !== 0 ? r = Pn(a) : (o &= i, o !== 0 && (r = Pn(o)));
  } else i = n & ~l, i !== 0 ? r = Pn(i) : o !== 0 && (r = Pn(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Fe(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Sd(e, t) {
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
function jd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - Fe(o), a = 1 << i, u = l[i];
    u === -1 ? (!(a & n) || a & r) && (l[i] = Sd(a, t)) : u <= t && (e.expiredLanes |= a), o &= ~a;
  }
}
function So(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ka() {
  var e = vr;
  return vr <<= 1, !(vr & 4194240) && (vr = 64), e;
}
function Il(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function or(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Fe(t), e[t] = n;
}
function Nd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Fe(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function fi(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Fe(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var A = 0;
function Ya(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Xa, pi, ba, Ga, Za, jo = !1, yr = [], pt = null, ht = null, mt = null, Vn = /* @__PURE__ */ new Map(), Qn = /* @__PURE__ */ new Map(), st = [], _d = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function as(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      pt = null;
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
      Vn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Qn.delete(t.pointerId);
  }
}
function kn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = sr(t), t !== null && pi(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Cd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return pt = kn(pt, e, t, n, r, l), !0;
    case "dragenter":
      return ht = kn(ht, e, t, n, r, l), !0;
    case "mouseover":
      return mt = kn(mt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Vn.set(o, kn(Vn.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Qn.set(o, kn(Qn.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Ja(e) {
  var t = Tt(e.target);
  if (t !== null) {
    var n = Ht(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ua(n), t !== null) {
          e.blockedOn = t, Za(e.priority, function() {
            ba(n);
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
function $r(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = No(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      yo = r, n.target.dispatchEvent(r), yo = null;
    } else return t = sr(n), t !== null && pi(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function us(e, t, n) {
  $r(e) && n.delete(t);
}
function Ed() {
  jo = !1, pt !== null && $r(pt) && (pt = null), ht !== null && $r(ht) && (ht = null), mt !== null && $r(mt) && (mt = null), Vn.forEach(us), Qn.forEach(us);
}
function Sn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, jo || (jo = !0, Ne.unstable_scheduleCallback(Ne.unstable_NormalPriority, Ed)));
}
function Kn(e) {
  function t(l) {
    return Sn(l, e);
  }
  if (0 < yr.length) {
    Sn(yr[0], e);
    for (var n = 1; n < yr.length; n++) {
      var r = yr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (pt !== null && Sn(pt, e), ht !== null && Sn(ht, e), mt !== null && Sn(mt, e), Vn.forEach(t), Qn.forEach(t), n = 0; n < st.length; n++) r = st[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < st.length && (n = st[0], n.blockedOn === null); ) Ja(n), n.blockedOn === null && st.shift();
}
var on = nt.ReactCurrentBatchConfig, Xr = !0;
function zd(e, t, n, r) {
  var l = A, o = on.transition;
  on.transition = null;
  try {
    A = 1, hi(e, t, n, r);
  } finally {
    A = l, on.transition = o;
  }
}
function Pd(e, t, n, r) {
  var l = A, o = on.transition;
  on.transition = null;
  try {
    A = 4, hi(e, t, n, r);
  } finally {
    A = l, on.transition = o;
  }
}
function hi(e, t, n, r) {
  if (Xr) {
    var l = No(e, t, n, r);
    if (l === null) Xl(e, t, r, br, n), as(e, r);
    else if (Cd(l, e, t, n, r)) r.stopPropagation();
    else if (as(e, r), t & 4 && -1 < _d.indexOf(e)) {
      for (; l !== null; ) {
        var o = sr(l);
        if (o !== null && Xa(o), o = No(e, t, n, r), o === null && Xl(e, t, r, br, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Xl(e, t, r, null, n);
  }
}
var br = null;
function No(e, t, n, r) {
  if (br = null, e = ci(r), e = Tt(e), e !== null) if (t = Ht(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ua(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return br = e, null;
}
function qa(e) {
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
      switch (vd()) {
        case di:
          return 1;
        case Va:
          return 4;
        case Kr:
        case gd:
          return 16;
        case Qa:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ut = null, mi = null, Rr = null;
function eu() {
  if (Rr) return Rr;
  var e, t = mi, n = t.length, r, l = "value" in ut ? ut.value : ut.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return Rr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Or(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function xr() {
  return !0;
}
function cs() {
  return !1;
}
function Ce(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(o) : o[a]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? xr : cs, this.isPropagationStopped = cs, this;
  }
  return Y(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = xr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = xr);
  }, persist: function() {
  }, isPersistent: xr }), t;
}
var gn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, vi = Ce(gn), ir = Y({}, gn, { view: 0, detail: 0 }), Md = Ce(ir), Al, Ul, jn, gl = Y({}, ir, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: gi, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== jn && (jn && e.type === "mousemove" ? (Al = e.screenX - jn.screenX, Ul = e.screenY - jn.screenY) : Ul = Al = 0, jn = e), Al);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ul;
} }), ds = Ce(gl), Td = Y({}, gl, { dataTransfer: 0 }), Ld = Ce(Td), $d = Y({}, ir, { relatedTarget: 0 }), Bl = Ce($d), Rd = Y({}, gn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Od = Ce(Rd), Dd = Y({}, gn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Fd = Ce(Dd), Id = Y({}, gn, { data: 0 }), fs = Ce(Id), Ad = {
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
}, Ud = {
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
}, Bd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Hd(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Bd[e]) ? !!t[e] : !1;
}
function gi() {
  return Hd;
}
var Wd = Y({}, ir, { key: function(e) {
  if (e.key) {
    var t = Ad[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Or(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Ud[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: gi, charCode: function(e) {
  return e.type === "keypress" ? Or(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Or(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Vd = Ce(Wd), Qd = Y({}, gl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ps = Ce(Qd), Kd = Y({}, ir, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: gi }), Yd = Ce(Kd), Xd = Y({}, gn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), bd = Ce(Xd), Gd = Y({}, gl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = Ce(Gd), Jd = [9, 13, 27, 32], yi = Ze && "CompositionEvent" in window, Rn = null;
Ze && "documentMode" in document && (Rn = document.documentMode);
var qd = Ze && "TextEvent" in window && !Rn, tu = Ze && (!yi || Rn && 8 < Rn && 11 >= Rn), hs = " ", ms = !1;
function nu(e, t) {
  switch (e) {
    case "keyup":
      return Jd.indexOf(t.keyCode) !== -1;
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
function ru(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Kt = !1;
function ef(e, t) {
  switch (e) {
    case "compositionend":
      return ru(t);
    case "keypress":
      return t.which !== 32 ? null : (ms = !0, hs);
    case "textInput":
      return e = t.data, e === hs && ms ? null : e;
    default:
      return null;
  }
}
function tf(e, t) {
  if (Kt) return e === "compositionend" || !yi && nu(e, t) ? (e = eu(), Rr = mi = ut = null, Kt = !1, e) : null;
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
      return tu && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var nf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function vs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!nf[e.type] : t === "textarea";
}
function lu(e, t, n, r) {
  Oa(r), t = Gr(t, "onChange"), 0 < t.length && (n = new vi("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var On = null, Yn = null;
function rf(e) {
  mu(e, 0);
}
function yl(e) {
  var t = bt(e);
  if (za(t)) return e;
}
function lf(e, t) {
  if (e === "change") return t;
}
var ou = !1;
if (Ze) {
  var Hl;
  if (Ze) {
    var Wl = "oninput" in document;
    if (!Wl) {
      var gs = document.createElement("div");
      gs.setAttribute("oninput", "return;"), Wl = typeof gs.oninput == "function";
    }
    Hl = Wl;
  } else Hl = !1;
  ou = Hl && (!document.documentMode || 9 < document.documentMode);
}
function ys() {
  On && (On.detachEvent("onpropertychange", iu), Yn = On = null);
}
function iu(e) {
  if (e.propertyName === "value" && yl(Yn)) {
    var t = [];
    lu(t, Yn, e, ci(e)), Aa(rf, t);
  }
}
function of(e, t, n) {
  e === "focusin" ? (ys(), On = t, Yn = n, On.attachEvent("onpropertychange", iu)) : e === "focusout" && ys();
}
function sf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return yl(Yn);
}
function af(e, t) {
  if (e === "click") return yl(t);
}
function uf(e, t) {
  if (e === "input" || e === "change") return yl(t);
}
function cf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ae = typeof Object.is == "function" ? Object.is : cf;
function Xn(e, t) {
  if (Ae(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!oo.call(t, l) || !Ae(e[l], t[l])) return !1;
  }
  return !0;
}
function xs(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ws(e, t) {
  var n = xs(e);
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
    n = xs(n);
  }
}
function su(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? su(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function au() {
  for (var e = window, t = Wr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Wr(e.document);
  }
  return t;
}
function xi(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function df(e) {
  var t = au(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && su(n.ownerDocument.documentElement, n)) {
    if (r !== null && xi(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = ws(n, o);
        var i = ws(
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
var ff = Ze && "documentMode" in document && 11 >= document.documentMode, Yt = null, _o = null, Dn = null, Co = !1;
function ks(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Co || Yt == null || Yt !== Wr(r) || (r = Yt, "selectionStart" in r && xi(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Dn && Xn(Dn, r) || (Dn = r, r = Gr(_o, "onSelect"), 0 < r.length && (t = new vi("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Yt)));
}
function wr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Xt = { animationend: wr("Animation", "AnimationEnd"), animationiteration: wr("Animation", "AnimationIteration"), animationstart: wr("Animation", "AnimationStart"), transitionend: wr("Transition", "TransitionEnd") }, Vl = {}, uu = {};
Ze && (uu = document.createElement("div").style, "AnimationEvent" in window || (delete Xt.animationend.animation, delete Xt.animationiteration.animation, delete Xt.animationstart.animation), "TransitionEvent" in window || delete Xt.transitionend.transition);
function xl(e) {
  if (Vl[e]) return Vl[e];
  if (!Xt[e]) return e;
  var t = Xt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in uu) return Vl[e] = t[n];
  return e;
}
var cu = xl("animationend"), du = xl("animationiteration"), fu = xl("animationstart"), pu = xl("transitionend"), hu = /* @__PURE__ */ new Map(), Ss = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function jt(e, t) {
  hu.set(e, t), Bt(t, [e]);
}
for (var Ql = 0; Ql < Ss.length; Ql++) {
  var Kl = Ss[Ql], pf = Kl.toLowerCase(), hf = Kl[0].toUpperCase() + Kl.slice(1);
  jt(pf, "on" + hf);
}
jt(cu, "onAnimationEnd");
jt(du, "onAnimationIteration");
jt(fu, "onAnimationStart");
jt("dblclick", "onDoubleClick");
jt("focusin", "onFocus");
jt("focusout", "onBlur");
jt(pu, "onTransitionEnd");
un("onMouseEnter", ["mouseout", "mouseover"]);
un("onMouseLeave", ["mouseout", "mouseover"]);
un("onPointerEnter", ["pointerout", "pointerover"]);
un("onPointerLeave", ["pointerout", "pointerover"]);
Bt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Bt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Bt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Bt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Bt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Bt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Mn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Mn));
function js(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, fd(r, t, void 0, e), e.currentTarget = null;
}
function mu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var a = r[i], u = a.instance, d = a.currentTarget;
        if (a = a.listener, u !== o && l.isPropagationStopped()) break e;
        js(l, a, d), o = u;
      }
      else for (i = 0; i < r.length; i++) {
        if (a = r[i], u = a.instance, d = a.currentTarget, a = a.listener, u !== o && l.isPropagationStopped()) break e;
        js(l, a, d), o = u;
      }
    }
  }
  if (Qr) throw e = ko, Qr = !1, ko = null, e;
}
function H(e, t) {
  var n = t[To];
  n === void 0 && (n = t[To] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (vu(t, e, 2, !1), n.add(r));
}
function Yl(e, t, n) {
  var r = 0;
  t && (r |= 4), vu(n, e, r, t);
}
var kr = "_reactListening" + Math.random().toString(36).slice(2);
function bn(e) {
  if (!e[kr]) {
    e[kr] = !0, ja.forEach(function(n) {
      n !== "selectionchange" && (mf.has(n) || Yl(n, !1, e), Yl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[kr] || (t[kr] = !0, Yl("selectionchange", !1, t));
  }
}
function vu(e, t, n, r) {
  switch (qa(t)) {
    case 1:
      var l = zd;
      break;
    case 4:
      l = Pd;
      break;
    default:
      l = hi;
  }
  n = l.bind(null, t, n, e), l = void 0, !wo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Xl(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var i = r.tag;
    if (i === 3 || i === 4) {
      var a = r.stateNode.containerInfo;
      if (a === l || a.nodeType === 8 && a.parentNode === l) break;
      if (i === 4) for (i = r.return; i !== null; ) {
        var u = i.tag;
        if ((u === 3 || u === 4) && (u = i.stateNode.containerInfo, u === l || u.nodeType === 8 && u.parentNode === l)) return;
        i = i.return;
      }
      for (; a !== null; ) {
        if (i = Tt(a), i === null) return;
        if (u = i.tag, u === 5 || u === 6) {
          r = o = i;
          continue e;
        }
        a = a.parentNode;
      }
    }
    r = r.return;
  }
  Aa(function() {
    var d = o, v = ci(n), m = [];
    e: {
      var h = hu.get(e);
      if (h !== void 0) {
        var g = vi, w = e;
        switch (e) {
          case "keypress":
            if (Or(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = Vd;
            break;
          case "focusin":
            w = "focus", g = Bl;
            break;
          case "focusout":
            w = "blur", g = Bl;
            break;
          case "beforeblur":
          case "afterblur":
            g = Bl;
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
            g = ds;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = Ld;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = Yd;
            break;
          case cu:
          case du:
          case fu:
            g = Od;
            break;
          case pu:
            g = bd;
            break;
          case "scroll":
            g = Md;
            break;
          case "wheel":
            g = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = Fd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = ps;
        }
        var k = (t & 4) !== 0, M = !k && e === "scroll", p = k ? h !== null ? h + "Capture" : null : h;
        k = [];
        for (var c = d, f; c !== null; ) {
          f = c;
          var x = f.stateNode;
          if (f.tag === 5 && x !== null && (f = x, p !== null && (x = Wn(c, p), x != null && k.push(Gn(c, x, f)))), M) break;
          c = c.return;
        }
        0 < k.length && (h = new g(h, w, null, n, v), m.push({ event: h, listeners: k }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", g = e === "mouseout" || e === "pointerout", h && n !== yo && (w = n.relatedTarget || n.fromElement) && (Tt(w) || w[Je])) break e;
        if ((g || h) && (h = v.window === v ? v : (h = v.ownerDocument) ? h.defaultView || h.parentWindow : window, g ? (w = n.relatedTarget || n.toElement, g = d, w = w ? Tt(w) : null, w !== null && (M = Ht(w), w !== M || w.tag !== 5 && w.tag !== 6) && (w = null)) : (g = null, w = d), g !== w)) {
          if (k = ds, x = "onMouseLeave", p = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (k = ps, x = "onPointerLeave", p = "onPointerEnter", c = "pointer"), M = g == null ? h : bt(g), f = w == null ? h : bt(w), h = new k(x, c + "leave", g, n, v), h.target = M, h.relatedTarget = f, x = null, Tt(v) === d && (k = new k(p, c + "enter", w, n, v), k.target = f, k.relatedTarget = M, x = k), M = x, g && w) t: {
            for (k = g, p = w, c = 0, f = k; f; f = Wt(f)) c++;
            for (f = 0, x = p; x; x = Wt(x)) f++;
            for (; 0 < c - f; ) k = Wt(k), c--;
            for (; 0 < f - c; ) p = Wt(p), f--;
            for (; c--; ) {
              if (k === p || p !== null && k === p.alternate) break t;
              k = Wt(k), p = Wt(p);
            }
            k = null;
          }
          else k = null;
          g !== null && Ns(m, h, g, k, !1), w !== null && M !== null && Ns(m, M, w, k, !0);
        }
      }
      e: {
        if (h = d ? bt(d) : window, g = h.nodeName && h.nodeName.toLowerCase(), g === "select" || g === "input" && h.type === "file") var y = lf;
        else if (vs(h)) if (ou) y = uf;
        else {
          y = sf;
          var C = of;
        }
        else (g = h.nodeName) && g.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (y = af);
        if (y && (y = y(e, d))) {
          lu(m, y, n, v);
          break e;
        }
        C && C(e, h, d), e === "focusout" && (C = h._wrapperState) && C.controlled && h.type === "number" && po(h, "number", h.value);
      }
      switch (C = d ? bt(d) : window, e) {
        case "focusin":
          (vs(C) || C.contentEditable === "true") && (Yt = C, _o = d, Dn = null);
          break;
        case "focusout":
          Dn = _o = Yt = null;
          break;
        case "mousedown":
          Co = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Co = !1, ks(m, n, v);
          break;
        case "selectionchange":
          if (ff) break;
        case "keydown":
        case "keyup":
          ks(m, n, v);
      }
      var S;
      if (yi) e: {
        switch (e) {
          case "compositionstart":
            var E = "onCompositionStart";
            break e;
          case "compositionend":
            E = "onCompositionEnd";
            break e;
          case "compositionupdate":
            E = "onCompositionUpdate";
            break e;
        }
        E = void 0;
      }
      else Kt ? nu(e, n) && (E = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (E = "onCompositionStart");
      E && (tu && n.locale !== "ko" && (Kt || E !== "onCompositionStart" ? E === "onCompositionEnd" && Kt && (S = eu()) : (ut = v, mi = "value" in ut ? ut.value : ut.textContent, Kt = !0)), C = Gr(d, E), 0 < C.length && (E = new fs(E, e, null, n, v), m.push({ event: E, listeners: C }), S ? E.data = S : (S = ru(n), S !== null && (E.data = S)))), (S = qd ? ef(e, n) : tf(e, n)) && (d = Gr(d, "onBeforeInput"), 0 < d.length && (v = new fs("onBeforeInput", "beforeinput", null, n, v), m.push({ event: v, listeners: d }), v.data = S));
    }
    mu(m, t);
  });
}
function Gn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Gr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Wn(e, n), o != null && r.unshift(Gn(e, o, l)), o = Wn(e, t), o != null && r.push(Gn(e, o, l))), e = e.return;
  }
  return r;
}
function Wt(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ns(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var a = n, u = a.alternate, d = a.stateNode;
    if (u !== null && u === r) break;
    a.tag === 5 && d !== null && (a = d, l ? (u = Wn(n, o), u != null && i.unshift(Gn(n, u, a))) : l || (u = Wn(n, o), u != null && i.push(Gn(n, u, a)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var vf = /\r\n?/g, gf = /\u0000|\uFFFD/g;
function _s(e) {
  return (typeof e == "string" ? e : "" + e).replace(vf, `
`).replace(gf, "");
}
function Sr(e, t, n) {
  if (t = _s(t), _s(e) !== t && n) throw Error(j(425));
}
function Zr() {
}
var Eo = null, zo = null;
function Po(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Mo = typeof setTimeout == "function" ? setTimeout : void 0, yf = typeof clearTimeout == "function" ? clearTimeout : void 0, Cs = typeof Promise == "function" ? Promise : void 0, xf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Cs < "u" ? function(e) {
  return Cs.resolve(null).then(e).catch(wf);
} : Mo;
function wf(e) {
  setTimeout(function() {
    throw e;
  });
}
function bl(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Kn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Kn(t);
}
function vt(e) {
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
function Es(e) {
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
var yn = Math.random().toString(36).slice(2), He = "__reactFiber$" + yn, Zn = "__reactProps$" + yn, Je = "__reactContainer$" + yn, To = "__reactEvents$" + yn, kf = "__reactListeners$" + yn, Sf = "__reactHandles$" + yn;
function Tt(e) {
  var t = e[He];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Je] || n[He]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Es(e); e !== null; ) {
        if (n = e[He]) return n;
        e = Es(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function sr(e) {
  return e = e[He] || e[Je], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function bt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(j(33));
}
function wl(e) {
  return e[Zn] || null;
}
var Lo = [], Gt = -1;
function Nt(e) {
  return { current: e };
}
function W(e) {
  0 > Gt || (e.current = Lo[Gt], Lo[Gt] = null, Gt--);
}
function B(e, t) {
  Gt++, Lo[Gt] = e.current, e.current = t;
}
var St = {}, de = Nt(St), ye = Nt(!1), Dt = St;
function cn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return St;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function xe(e) {
  return e = e.childContextTypes, e != null;
}
function Jr() {
  W(ye), W(de);
}
function zs(e, t, n) {
  if (de.current !== St) throw Error(j(168));
  B(de, t), B(ye, n);
}
function gu(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(j(108, od(e) || "Unknown", l));
  return Y({}, n, r);
}
function qr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || St, Dt = de.current, B(de, e), B(ye, ye.current), !0;
}
function Ps(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(j(169));
  n ? (e = gu(e, t, Dt), r.__reactInternalMemoizedMergedChildContext = e, W(ye), W(de), B(de, e)) : W(ye), B(ye, n);
}
var Ke = null, kl = !1, Gl = !1;
function yu(e) {
  Ke === null ? Ke = [e] : Ke.push(e);
}
function jf(e) {
  kl = !0, yu(e);
}
function _t() {
  if (!Gl && Ke !== null) {
    Gl = !0;
    var e = 0, t = A;
    try {
      var n = Ke;
      for (A = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ke = null, kl = !1;
    } catch (l) {
      throw Ke !== null && (Ke = Ke.slice(e + 1)), Wa(di, _t), l;
    } finally {
      A = t, Gl = !1;
    }
  }
  return null;
}
var Zt = [], Jt = 0, el = null, tl = 0, Ee = [], ze = 0, Ft = null, Xe = 1, be = "";
function Pt(e, t) {
  Zt[Jt++] = tl, Zt[Jt++] = el, el = e, tl = t;
}
function xu(e, t, n) {
  Ee[ze++] = Xe, Ee[ze++] = be, Ee[ze++] = Ft, Ft = e;
  var r = Xe;
  e = be;
  var l = 32 - Fe(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - Fe(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, Xe = 1 << 32 - Fe(t) + l | n << l | r, be = o + e;
  } else Xe = 1 << o | n << l | r, be = e;
}
function wi(e) {
  e.return !== null && (Pt(e, 1), xu(e, 1, 0));
}
function ki(e) {
  for (; e === el; ) el = Zt[--Jt], Zt[Jt] = null, tl = Zt[--Jt], Zt[Jt] = null;
  for (; e === Ft; ) Ft = Ee[--ze], Ee[ze] = null, be = Ee[--ze], Ee[ze] = null, Xe = Ee[--ze], Ee[ze] = null;
}
var je = null, Se = null, V = !1, De = null;
function wu(e, t) {
  var n = Pe(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Ms(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, je = e, Se = vt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, je = e, Se = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Ft !== null ? { id: Xe, overflow: be } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Pe(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, je = e, Se = null, !0) : !1;
    default:
      return !1;
  }
}
function $o(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ro(e) {
  if (V) {
    var t = Se;
    if (t) {
      var n = t;
      if (!Ms(e, t)) {
        if ($o(e)) throw Error(j(418));
        t = vt(n.nextSibling);
        var r = je;
        t && Ms(e, t) ? wu(r, n) : (e.flags = e.flags & -4097 | 2, V = !1, je = e);
      }
    } else {
      if ($o(e)) throw Error(j(418));
      e.flags = e.flags & -4097 | 2, V = !1, je = e;
    }
  }
}
function Ts(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  je = e;
}
function jr(e) {
  if (e !== je) return !1;
  if (!V) return Ts(e), V = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Po(e.type, e.memoizedProps)), t && (t = Se)) {
    if ($o(e)) throw ku(), Error(j(418));
    for (; t; ) wu(e, t), t = vt(t.nextSibling);
  }
  if (Ts(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(j(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Se = vt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Se = null;
    }
  } else Se = je ? vt(e.stateNode.nextSibling) : null;
  return !0;
}
function ku() {
  for (var e = Se; e; ) e = vt(e.nextSibling);
}
function dn() {
  Se = je = null, V = !1;
}
function Si(e) {
  De === null ? De = [e] : De.push(e);
}
var Nf = nt.ReactCurrentBatchConfig;
function Nn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(j(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(j(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var a = l.refs;
        i === null ? delete a[o] : a[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(j(284));
    if (!n._owner) throw Error(j(290, e));
  }
  return e;
}
function Nr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(j(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Ls(e) {
  var t = e._init;
  return t(e._payload);
}
function Su(e) {
  function t(p, c) {
    if (e) {
      var f = p.deletions;
      f === null ? (p.deletions = [c], p.flags |= 16) : f.push(c);
    }
  }
  function n(p, c) {
    if (!e) return null;
    for (; c !== null; ) t(p, c), c = c.sibling;
    return null;
  }
  function r(p, c) {
    for (p = /* @__PURE__ */ new Map(); c !== null; ) c.key !== null ? p.set(c.key, c) : p.set(c.index, c), c = c.sibling;
    return p;
  }
  function l(p, c) {
    return p = wt(p, c), p.index = 0, p.sibling = null, p;
  }
  function o(p, c, f) {
    return p.index = f, e ? (f = p.alternate, f !== null ? (f = f.index, f < c ? (p.flags |= 2, c) : f) : (p.flags |= 2, c)) : (p.flags |= 1048576, c);
  }
  function i(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function a(p, c, f, x) {
    return c === null || c.tag !== 6 ? (c = ro(f, p.mode, x), c.return = p, c) : (c = l(c, f), c.return = p, c);
  }
  function u(p, c, f, x) {
    var y = f.type;
    return y === Qt ? v(p, c, f.props.children, x, f.key) : c !== null && (c.elementType === y || typeof y == "object" && y !== null && y.$$typeof === ot && Ls(y) === c.type) ? (x = l(c, f.props), x.ref = Nn(p, c, f), x.return = p, x) : (x = Hr(f.type, f.key, f.props, null, p.mode, x), x.ref = Nn(p, c, f), x.return = p, x);
  }
  function d(p, c, f, x) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== f.containerInfo || c.stateNode.implementation !== f.implementation ? (c = lo(f, p.mode, x), c.return = p, c) : (c = l(c, f.children || []), c.return = p, c);
  }
  function v(p, c, f, x, y) {
    return c === null || c.tag !== 7 ? (c = Ot(f, p.mode, x, y), c.return = p, c) : (c = l(c, f), c.return = p, c);
  }
  function m(p, c, f) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = ro("" + c, p.mode, f), c.return = p, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case pr:
          return f = Hr(c.type, c.key, c.props, null, p.mode, f), f.ref = Nn(p, null, c), f.return = p, f;
        case Vt:
          return c = lo(c, p.mode, f), c.return = p, c;
        case ot:
          var x = c._init;
          return m(p, x(c._payload), f);
      }
      if (zn(c) || xn(c)) return c = Ot(c, p.mode, f, null), c.return = p, c;
      Nr(p, c);
    }
    return null;
  }
  function h(p, c, f, x) {
    var y = c !== null ? c.key : null;
    if (typeof f == "string" && f !== "" || typeof f == "number") return y !== null ? null : a(p, c, "" + f, x);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case pr:
          return f.key === y ? u(p, c, f, x) : null;
        case Vt:
          return f.key === y ? d(p, c, f, x) : null;
        case ot:
          return y = f._init, h(
            p,
            c,
            y(f._payload),
            x
          );
      }
      if (zn(f) || xn(f)) return y !== null ? null : v(p, c, f, x, null);
      Nr(p, f);
    }
    return null;
  }
  function g(p, c, f, x, y) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return p = p.get(f) || null, a(c, p, "" + x, y);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case pr:
          return p = p.get(x.key === null ? f : x.key) || null, u(c, p, x, y);
        case Vt:
          return p = p.get(x.key === null ? f : x.key) || null, d(c, p, x, y);
        case ot:
          var C = x._init;
          return g(p, c, f, C(x._payload), y);
      }
      if (zn(x) || xn(x)) return p = p.get(f) || null, v(c, p, x, y, null);
      Nr(c, x);
    }
    return null;
  }
  function w(p, c, f, x) {
    for (var y = null, C = null, S = c, E = c = 0, L = null; S !== null && E < f.length; E++) {
      S.index > E ? (L = S, S = null) : L = S.sibling;
      var N = h(p, S, f[E], x);
      if (N === null) {
        S === null && (S = L);
        break;
      }
      e && S && N.alternate === null && t(p, S), c = o(N, c, E), C === null ? y = N : C.sibling = N, C = N, S = L;
    }
    if (E === f.length) return n(p, S), V && Pt(p, E), y;
    if (S === null) {
      for (; E < f.length; E++) S = m(p, f[E], x), S !== null && (c = o(S, c, E), C === null ? y = S : C.sibling = S, C = S);
      return V && Pt(p, E), y;
    }
    for (S = r(p, S); E < f.length; E++) L = g(S, p, E, f[E], x), L !== null && (e && L.alternate !== null && S.delete(L.key === null ? E : L.key), c = o(L, c, E), C === null ? y = L : C.sibling = L, C = L);
    return e && S.forEach(function(_) {
      return t(p, _);
    }), V && Pt(p, E), y;
  }
  function k(p, c, f, x) {
    var y = xn(f);
    if (typeof y != "function") throw Error(j(150));
    if (f = y.call(f), f == null) throw Error(j(151));
    for (var C = y = null, S = c, E = c = 0, L = null, N = f.next(); S !== null && !N.done; E++, N = f.next()) {
      S.index > E ? (L = S, S = null) : L = S.sibling;
      var _ = h(p, S, N.value, x);
      if (_ === null) {
        S === null && (S = L);
        break;
      }
      e && S && _.alternate === null && t(p, S), c = o(_, c, E), C === null ? y = _ : C.sibling = _, C = _, S = L;
    }
    if (N.done) return n(
      p,
      S
    ), V && Pt(p, E), y;
    if (S === null) {
      for (; !N.done; E++, N = f.next()) N = m(p, N.value, x), N !== null && (c = o(N, c, E), C === null ? y = N : C.sibling = N, C = N);
      return V && Pt(p, E), y;
    }
    for (S = r(p, S); !N.done; E++, N = f.next()) N = g(S, p, E, N.value, x), N !== null && (e && N.alternate !== null && S.delete(N.key === null ? E : N.key), c = o(N, c, E), C === null ? y = N : C.sibling = N, C = N);
    return e && S.forEach(function(D) {
      return t(p, D);
    }), V && Pt(p, E), y;
  }
  function M(p, c, f, x) {
    if (typeof f == "object" && f !== null && f.type === Qt && f.key === null && (f = f.props.children), typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case pr:
          e: {
            for (var y = f.key, C = c; C !== null; ) {
              if (C.key === y) {
                if (y = f.type, y === Qt) {
                  if (C.tag === 7) {
                    n(p, C.sibling), c = l(C, f.props.children), c.return = p, p = c;
                    break e;
                  }
                } else if (C.elementType === y || typeof y == "object" && y !== null && y.$$typeof === ot && Ls(y) === C.type) {
                  n(p, C.sibling), c = l(C, f.props), c.ref = Nn(p, C, f), c.return = p, p = c;
                  break e;
                }
                n(p, C);
                break;
              } else t(p, C);
              C = C.sibling;
            }
            f.type === Qt ? (c = Ot(f.props.children, p.mode, x, f.key), c.return = p, p = c) : (x = Hr(f.type, f.key, f.props, null, p.mode, x), x.ref = Nn(p, c, f), x.return = p, p = x);
          }
          return i(p);
        case Vt:
          e: {
            for (C = f.key; c !== null; ) {
              if (c.key === C) if (c.tag === 4 && c.stateNode.containerInfo === f.containerInfo && c.stateNode.implementation === f.implementation) {
                n(p, c.sibling), c = l(c, f.children || []), c.return = p, p = c;
                break e;
              } else {
                n(p, c);
                break;
              }
              else t(p, c);
              c = c.sibling;
            }
            c = lo(f, p.mode, x), c.return = p, p = c;
          }
          return i(p);
        case ot:
          return C = f._init, M(p, c, C(f._payload), x);
      }
      if (zn(f)) return w(p, c, f, x);
      if (xn(f)) return k(p, c, f, x);
      Nr(p, f);
    }
    return typeof f == "string" && f !== "" || typeof f == "number" ? (f = "" + f, c !== null && c.tag === 6 ? (n(p, c.sibling), c = l(c, f), c.return = p, p = c) : (n(p, c), c = ro(f, p.mode, x), c.return = p, p = c), i(p)) : n(p, c);
  }
  return M;
}
var fn = Su(!0), ju = Su(!1), nl = Nt(null), rl = null, qt = null, ji = null;
function Ni() {
  ji = qt = rl = null;
}
function _i(e) {
  var t = nl.current;
  W(nl), e._currentValue = t;
}
function Oo(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function sn(e, t) {
  rl = e, ji = qt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (ge = !0), e.firstContext = null);
}
function Te(e) {
  var t = e._currentValue;
  if (ji !== e) if (e = { context: e, memoizedValue: t, next: null }, qt === null) {
    if (rl === null) throw Error(j(308));
    qt = e, rl.dependencies = { lanes: 0, firstContext: e };
  } else qt = qt.next = e;
  return t;
}
var Lt = null;
function Ci(e) {
  Lt === null ? Lt = [e] : Lt.push(e);
}
function Nu(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Ci(t)) : (n.next = l.next, l.next = n), t.interleaved = n, qe(e, r);
}
function qe(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var it = !1;
function Ei(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function _u(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ge(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function gt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, I & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, qe(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Ci(r)) : (t.next = l.next, l.next = t), r.interleaved = t, qe(e, n);
}
function Dr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, fi(e, n);
  }
}
function $s(e, t) {
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
function ll(e, t, n, r) {
  var l = e.updateQueue;
  it = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var u = a, d = u.next;
    u.next = null, i === null ? o = d : i.next = d, i = u;
    var v = e.alternate;
    v !== null && (v = v.updateQueue, a = v.lastBaseUpdate, a !== i && (a === null ? v.firstBaseUpdate = d : a.next = d, v.lastBaseUpdate = u));
  }
  if (o !== null) {
    var m = l.baseState;
    i = 0, v = d = u = null, a = o;
    do {
      var h = a.lane, g = a.eventTime;
      if ((r & h) === h) {
        v !== null && (v = v.next = {
          eventTime: g,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var w = e, k = a;
          switch (h = t, g = n, k.tag) {
            case 1:
              if (w = k.payload, typeof w == "function") {
                m = w.call(g, m, h);
                break e;
              }
              m = w;
              break e;
            case 3:
              w.flags = w.flags & -65537 | 128;
            case 0:
              if (w = k.payload, h = typeof w == "function" ? w.call(g, m, h) : w, h == null) break e;
              m = Y({}, m, h);
              break e;
            case 2:
              it = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [a] : h.push(a));
      } else g = { eventTime: g, lane: h, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, v === null ? (d = v = g, u = m) : v = v.next = g, i |= h;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        h = a, a = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (u = m), l.baseState = u, l.firstBaseUpdate = d, l.lastBaseUpdate = v, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    At |= i, e.lanes = i, e.memoizedState = m;
  }
}
function Rs(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(j(191, l));
      l.call(r);
    }
  }
}
var ar = {}, Ve = Nt(ar), Jn = Nt(ar), qn = Nt(ar);
function $t(e) {
  if (e === ar) throw Error(j(174));
  return e;
}
function zi(e, t) {
  switch (B(qn, t), B(Jn, e), B(Ve, ar), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : mo(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = mo(t, e);
  }
  W(Ve), B(Ve, t);
}
function pn() {
  W(Ve), W(Jn), W(qn);
}
function Cu(e) {
  $t(qn.current);
  var t = $t(Ve.current), n = mo(t, e.type);
  t !== n && (B(Jn, e), B(Ve, n));
}
function Pi(e) {
  Jn.current === e && (W(Ve), W(Jn));
}
var Q = Nt(0);
function ol(e) {
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
var Zl = [];
function Mi() {
  for (var e = 0; e < Zl.length; e++) Zl[e]._workInProgressVersionPrimary = null;
  Zl.length = 0;
}
var Fr = nt.ReactCurrentDispatcher, Jl = nt.ReactCurrentBatchConfig, It = 0, K = null, ee = null, re = null, il = !1, Fn = !1, er = 0, _f = 0;
function ae() {
  throw Error(j(321));
}
function Ti(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ae(e[n], t[n])) return !1;
  return !0;
}
function Li(e, t, n, r, l, o) {
  if (It = o, K = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Fr.current = e === null || e.memoizedState === null ? Pf : Mf, e = n(r, l), Fn) {
    o = 0;
    do {
      if (Fn = !1, er = 0, 25 <= o) throw Error(j(301));
      o += 1, re = ee = null, t.updateQueue = null, Fr.current = Tf, e = n(r, l);
    } while (Fn);
  }
  if (Fr.current = sl, t = ee !== null && ee.next !== null, It = 0, re = ee = K = null, il = !1, t) throw Error(j(300));
  return e;
}
function $i() {
  var e = er !== 0;
  return er = 0, e;
}
function Be() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return re === null ? K.memoizedState = re = e : re = re.next = e, re;
}
function Le() {
  if (ee === null) {
    var e = K.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ee.next;
  var t = re === null ? K.memoizedState : re.next;
  if (t !== null) re = t, ee = e;
  else {
    if (e === null) throw Error(j(310));
    ee = e, e = { memoizedState: ee.memoizedState, baseState: ee.baseState, baseQueue: ee.baseQueue, queue: ee.queue, next: null }, re === null ? K.memoizedState = re = e : re = re.next = e;
  }
  return re;
}
function tr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ql(e) {
  var t = Le(), n = t.queue;
  if (n === null) throw Error(j(311));
  n.lastRenderedReducer = e;
  var r = ee, l = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      l.next = o.next, o.next = i;
    }
    r.baseQueue = l = o, n.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var a = i = null, u = null, d = o;
    do {
      var v = d.lane;
      if ((It & v) === v) u !== null && (u = u.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var m = {
          lane: v,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        u === null ? (a = u = m, i = r) : u = u.next = m, K.lanes |= v, At |= v;
      }
      d = d.next;
    } while (d !== null && d !== o);
    u === null ? i = r : u.next = a, Ae(r, t.memoizedState) || (ge = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, K.lanes |= o, At |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function eo(e) {
  var t = Le(), n = t.queue;
  if (n === null) throw Error(j(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    Ae(o, t.memoizedState) || (ge = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function Eu() {
}
function zu(e, t) {
  var n = K, r = Le(), l = t(), o = !Ae(r.memoizedState, l);
  if (o && (r.memoizedState = l, ge = !0), r = r.queue, Ri(Tu.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || re !== null && re.memoizedState.tag & 1) {
    if (n.flags |= 2048, nr(9, Mu.bind(null, n, r, l, t), void 0, null), le === null) throw Error(j(349));
    It & 30 || Pu(n, t, l);
  }
  return l;
}
function Pu(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = K.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, K.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Mu(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Lu(t) && $u(e);
}
function Tu(e, t, n) {
  return n(function() {
    Lu(t) && $u(e);
  });
}
function Lu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ae(e, n);
  } catch {
    return !0;
  }
}
function $u(e) {
  var t = qe(e, 1);
  t !== null && Ie(t, e, 1, -1);
}
function Os(e) {
  var t = Be();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: tr, lastRenderedState: e }, t.queue = e, e = e.dispatch = zf.bind(null, K, e), [t.memoizedState, e];
}
function nr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = K.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, K.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ru() {
  return Le().memoizedState;
}
function Ir(e, t, n, r) {
  var l = Be();
  K.flags |= e, l.memoizedState = nr(1 | t, n, void 0, r === void 0 ? null : r);
}
function Sl(e, t, n, r) {
  var l = Le();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ee !== null) {
    var i = ee.memoizedState;
    if (o = i.destroy, r !== null && Ti(r, i.deps)) {
      l.memoizedState = nr(t, n, o, r);
      return;
    }
  }
  K.flags |= e, l.memoizedState = nr(1 | t, n, o, r);
}
function Ds(e, t) {
  return Ir(8390656, 8, e, t);
}
function Ri(e, t) {
  return Sl(2048, 8, e, t);
}
function Ou(e, t) {
  return Sl(4, 2, e, t);
}
function Du(e, t) {
  return Sl(4, 4, e, t);
}
function Fu(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Iu(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Sl(4, 4, Fu.bind(null, t, e), n);
}
function Oi() {
}
function Au(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ti(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Uu(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ti(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Bu(e, t, n) {
  return It & 21 ? (Ae(n, t) || (n = Ka(), K.lanes |= n, At |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, ge = !0), e.memoizedState = n);
}
function Cf(e, t) {
  var n = A;
  A = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Jl.transition;
  Jl.transition = {};
  try {
    e(!1), t();
  } finally {
    A = n, Jl.transition = r;
  }
}
function Hu() {
  return Le().memoizedState;
}
function Ef(e, t, n) {
  var r = xt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Wu(e)) Vu(t, n);
  else if (n = Nu(e, t, n, r), n !== null) {
    var l = pe();
    Ie(n, e, r, l), Qu(n, t, r);
  }
}
function zf(e, t, n) {
  var r = xt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Wu(e)) Vu(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, a = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = a, Ae(a, i)) {
        var u = t.interleaved;
        u === null ? (l.next = l, Ci(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Nu(e, t, l, r), n !== null && (l = pe(), Ie(n, e, r, l), Qu(n, t, r));
  }
}
function Wu(e) {
  var t = e.alternate;
  return e === K || t !== null && t === K;
}
function Vu(e, t) {
  Fn = il = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Qu(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, fi(e, n);
  }
}
var sl = { readContext: Te, useCallback: ae, useContext: ae, useEffect: ae, useImperativeHandle: ae, useInsertionEffect: ae, useLayoutEffect: ae, useMemo: ae, useReducer: ae, useRef: ae, useState: ae, useDebugValue: ae, useDeferredValue: ae, useTransition: ae, useMutableSource: ae, useSyncExternalStore: ae, useId: ae, unstable_isNewReconciler: !1 }, Pf = { readContext: Te, useCallback: function(e, t) {
  return Be().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Te, useEffect: Ds, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ir(
    4194308,
    4,
    Fu.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Ir(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Ir(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Be();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Be();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Ef.bind(null, K, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Be();
  return e = { current: e }, t.memoizedState = e;
}, useState: Os, useDebugValue: Oi, useDeferredValue: function(e) {
  return Be().memoizedState = e;
}, useTransition: function() {
  var e = Os(!1), t = e[0];
  return e = Cf.bind(null, e[1]), Be().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = K, l = Be();
  if (V) {
    if (n === void 0) throw Error(j(407));
    n = n();
  } else {
    if (n = t(), le === null) throw Error(j(349));
    It & 30 || Pu(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Ds(Tu.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, nr(9, Mu.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Be(), t = le.identifierPrefix;
  if (V) {
    var n = be, r = Xe;
    n = (r & ~(1 << 32 - Fe(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = er++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = _f++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Mf = {
  readContext: Te,
  useCallback: Au,
  useContext: Te,
  useEffect: Ri,
  useImperativeHandle: Iu,
  useInsertionEffect: Ou,
  useLayoutEffect: Du,
  useMemo: Uu,
  useReducer: ql,
  useRef: Ru,
  useState: function() {
    return ql(tr);
  },
  useDebugValue: Oi,
  useDeferredValue: function(e) {
    var t = Le();
    return Bu(t, ee.memoizedState, e);
  },
  useTransition: function() {
    var e = ql(tr)[0], t = Le().memoizedState;
    return [e, t];
  },
  useMutableSource: Eu,
  useSyncExternalStore: zu,
  useId: Hu,
  unstable_isNewReconciler: !1
}, Tf = { readContext: Te, useCallback: Au, useContext: Te, useEffect: Ri, useImperativeHandle: Iu, useInsertionEffect: Ou, useLayoutEffect: Du, useMemo: Uu, useReducer: eo, useRef: Ru, useState: function() {
  return eo(tr);
}, useDebugValue: Oi, useDeferredValue: function(e) {
  var t = Le();
  return ee === null ? t.memoizedState = e : Bu(t, ee.memoizedState, e);
}, useTransition: function() {
  var e = eo(tr)[0], t = Le().memoizedState;
  return [e, t];
}, useMutableSource: Eu, useSyncExternalStore: zu, useId: Hu, unstable_isNewReconciler: !1 };
function Re(e, t) {
  if (e && e.defaultProps) {
    t = Y({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Do(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : Y({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var jl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Ht(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = pe(), l = xt(e), o = Ge(r, l);
  o.payload = t, n != null && (o.callback = n), t = gt(e, o, l), t !== null && (Ie(t, e, l, r), Dr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = pe(), l = xt(e), o = Ge(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = gt(e, o, l), t !== null && (Ie(t, e, l, r), Dr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = pe(), r = xt(e), l = Ge(n, r);
  l.tag = 2, t != null && (l.callback = t), t = gt(e, l, r), t !== null && (Ie(t, e, r, n), Dr(t, e, r));
} };
function Fs(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Xn(n, r) || !Xn(l, o) : !0;
}
function Ku(e, t, n) {
  var r = !1, l = St, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Te(o) : (l = xe(t) ? Dt : de.current, r = t.contextTypes, o = (r = r != null) ? cn(e, l) : St), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = jl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Is(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && jl.enqueueReplaceState(t, t.state, null);
}
function Fo(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Ei(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = Te(o) : (o = xe(t) ? Dt : de.current, l.context = cn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Do(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && jl.enqueueReplaceState(l, l.state, null), ll(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function hn(e, t) {
  try {
    var n = "", r = t;
    do
      n += ld(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function to(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Io(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Lf = typeof WeakMap == "function" ? WeakMap : Map;
function Yu(e, t, n) {
  n = Ge(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    ul || (ul = !0, Xo = r), Io(e, t);
  }, n;
}
function Xu(e, t, n) {
  n = Ge(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Io(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Io(e, t), typeof r != "function" && (yt === null ? yt = /* @__PURE__ */ new Set([this]) : yt.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function As(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Lf();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Kf.bind(null, e, t, n), t.then(e, e));
}
function Us(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Bs(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ge(-1, 1), t.tag = 2, gt(n, t, 1))), n.lanes |= 1), e);
}
var $f = nt.ReactCurrentOwner, ge = !1;
function fe(e, t, n, r) {
  t.child = e === null ? ju(t, null, n, r) : fn(t, e.child, n, r);
}
function Hs(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return sn(t, l), r = Li(e, t, n, r, o, l), n = $i(), e !== null && !ge ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, et(e, t, l)) : (V && n && wi(t), t.flags |= 1, fe(e, t, r, l), t.child);
}
function Ws(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Wi(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, bu(e, t, o, r, l)) : (e = Hr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Xn, n(i, r) && e.ref === t.ref) return et(e, t, l);
  }
  return t.flags |= 1, e = wt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function bu(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Xn(o, r) && e.ref === t.ref) if (ge = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (ge = !0);
    else return t.lanes = e.lanes, et(e, t, l);
  }
  return Ao(e, t, n, r, l);
}
function Gu(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, B(tn, ke), ke |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, B(tn, ke), ke |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, B(tn, ke), ke |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, B(tn, ke), ke |= r;
  return fe(e, t, l, n), t.child;
}
function Zu(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ao(e, t, n, r, l) {
  var o = xe(n) ? Dt : de.current;
  return o = cn(t, o), sn(t, l), n = Li(e, t, n, r, o, l), r = $i(), e !== null && !ge ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, et(e, t, l)) : (V && r && wi(t), t.flags |= 1, fe(e, t, n, l), t.child);
}
function Vs(e, t, n, r, l) {
  if (xe(n)) {
    var o = !0;
    qr(t);
  } else o = !1;
  if (sn(t, l), t.stateNode === null) Ar(e, t), Ku(t, n, r), Fo(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, a = t.memoizedProps;
    i.props = a;
    var u = i.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = Te(d) : (d = xe(n) ? Dt : de.current, d = cn(t, d));
    var v = n.getDerivedStateFromProps, m = typeof v == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    m || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== r || u !== d) && Is(t, i, r, d), it = !1;
    var h = t.memoizedState;
    i.state = h, ll(t, r, i, l), u = t.memoizedState, a !== r || h !== u || ye.current || it ? (typeof v == "function" && (Do(t, n, v, r), u = t.memoizedState), (a = it || Fs(t, n, a, r, h, u, d)) ? (m || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), i.props = r, i.state = u, i.context = d, r = a) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, _u(e, t), a = t.memoizedProps, d = t.type === t.elementType ? a : Re(t.type, a), i.props = d, m = t.pendingProps, h = i.context, u = n.contextType, typeof u == "object" && u !== null ? u = Te(u) : (u = xe(n) ? Dt : de.current, u = cn(t, u));
    var g = n.getDerivedStateFromProps;
    (v = typeof g == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== m || h !== u) && Is(t, i, r, u), it = !1, h = t.memoizedState, i.state = h, ll(t, r, i, l);
    var w = t.memoizedState;
    a !== m || h !== w || ye.current || it ? (typeof g == "function" && (Do(t, n, g, r), w = t.memoizedState), (d = it || Fs(t, n, d, r, h, w, u) || !1) ? (v || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, w, u), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, w, u)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = w), i.props = r, i.state = w, i.context = u, r = d) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Uo(e, t, n, r, o, l);
}
function Uo(e, t, n, r, l, o) {
  Zu(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && Ps(t, n, !1), et(e, t, o);
  r = t.stateNode, $f.current = t;
  var a = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = fn(t, e.child, null, o), t.child = fn(t, null, a, o)) : fe(e, t, a, o), t.memoizedState = r.state, l && Ps(t, n, !0), t.child;
}
function Ju(e) {
  var t = e.stateNode;
  t.pendingContext ? zs(e, t.pendingContext, t.pendingContext !== t.context) : t.context && zs(e, t.context, !1), zi(e, t.containerInfo);
}
function Qs(e, t, n, r, l) {
  return dn(), Si(l), t.flags |= 256, fe(e, t, n, r), t.child;
}
var Bo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ho(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function qu(e, t, n) {
  var r = t.pendingProps, l = Q.current, o = !1, i = (t.flags & 128) !== 0, a;
  if ((a = i) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), B(Q, l & 1), e === null)
    return Ro(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = Cl(i, r, 0, null), e = Ot(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Ho(n), t.memoizedState = Bo, e) : Di(t, i));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return Rf(e, t, i, r, a, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, a = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = wt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? o = wt(a, o) : (o = Ot(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? Ho(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = Bo, r;
  }
  return o = e.child, e = o.sibling, r = wt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Di(e, t) {
  return t = Cl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function _r(e, t, n, r) {
  return r !== null && Si(r), fn(t, e.child, null, n), e = Di(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Rf(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = to(Error(j(422))), _r(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Cl({ mode: "visible", children: r.children }, l, 0, null), o = Ot(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && fn(t, e.child, null, i), t.child.memoizedState = Ho(i), t.memoizedState = Bo, o);
  if (!(t.mode & 1)) return _r(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, o = Error(j(419)), r = to(o, r, void 0), _r(e, t, i, r);
  }
  if (a = (i & e.childLanes) !== 0, ge || a) {
    if (r = le, r !== null) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, qe(e, l), Ie(r, e, l, -1));
    }
    return Hi(), r = to(Error(j(421))), _r(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Yf.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Se = vt(l.nextSibling), je = t, V = !0, De = null, e !== null && (Ee[ze++] = Xe, Ee[ze++] = be, Ee[ze++] = Ft, Xe = e.id, be = e.overflow, Ft = t), t = Di(t, r.children), t.flags |= 4096, t);
}
function Ks(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Oo(e.return, t, n);
}
function no(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function ec(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (fe(e, t, r.children, n), r = Q.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Ks(e, n, t);
      else if (e.tag === 19) Ks(e, n, t);
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
  if (B(Q, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && ol(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), no(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && ol(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      no(t, !0, n, null, o);
      break;
    case "together":
      no(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Ar(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function et(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), At |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(j(153));
  if (t.child !== null) {
    for (e = t.child, n = wt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = wt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Of(e, t, n) {
  switch (t.tag) {
    case 3:
      Ju(t), dn();
      break;
    case 5:
      Cu(t);
      break;
    case 1:
      xe(t.type) && qr(t);
      break;
    case 4:
      zi(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      B(nl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (B(Q, Q.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? qu(e, t, n) : (B(Q, Q.current & 1), e = et(e, t, n), e !== null ? e.sibling : null);
      B(Q, Q.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return ec(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), B(Q, Q.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Gu(e, t, n);
  }
  return et(e, t, n);
}
var tc, Wo, nc, rc;
tc = function(e, t) {
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
Wo = function() {
};
nc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, $t(Ve.current);
    var o = null;
    switch (n) {
      case "input":
        l = co(e, l), r = co(e, r), o = [];
        break;
      case "select":
        l = Y({}, l, { value: void 0 }), r = Y({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = ho(e, l), r = ho(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Zr);
    }
    vo(n, r);
    var i;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var a = l[d];
      for (i in a) a.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Bn.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in r) {
      var u = r[d];
      if (a = l != null ? l[d] : void 0, r.hasOwnProperty(d) && u !== a && (u != null || a != null)) if (d === "style") if (a) {
        for (i in a) !a.hasOwnProperty(i) || u && u.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in u) u.hasOwnProperty(i) && a[i] !== u[i] && (n || (n = {}), n[i] = u[i]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = u;
      else d === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, a = a ? a.__html : void 0, u != null && a !== u && (o = o || []).push(d, u)) : d === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(d, "" + u) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Bn.hasOwnProperty(d) ? (u != null && d === "onScroll" && H("scroll", e), o || a === u || (o = [])) : (o = o || []).push(d, u));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
rc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function _n(e, t) {
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
function ue(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Df(e, t, n) {
  var r = t.pendingProps;
  switch (ki(t), t.tag) {
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
      return ue(t), null;
    case 1:
      return xe(t.type) && Jr(), ue(t), null;
    case 3:
      return r = t.stateNode, pn(), W(ye), W(de), Mi(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (jr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, De !== null && (Zo(De), De = null))), Wo(e, t), ue(t), null;
    case 5:
      Pi(t);
      var l = $t(qn.current);
      if (n = t.type, e !== null && t.stateNode != null) nc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(j(166));
          return ue(t), null;
        }
        if (e = $t(Ve.current), jr(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[He] = t, r[Zn] = o, e = (t.mode & 1) !== 0, n) {
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
              for (l = 0; l < Mn.length; l++) H(Mn[l], r);
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
              ts(r, o), H("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, H("invalid", r);
              break;
            case "textarea":
              rs(r, o), H("invalid", r);
          }
          vo(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var a = o[i];
            i === "children" ? typeof a == "string" ? r.textContent !== a && (o.suppressHydrationWarning !== !0 && Sr(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (o.suppressHydrationWarning !== !0 && Sr(
              r.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Bn.hasOwnProperty(i) && a != null && i === "onScroll" && H("scroll", r);
          }
          switch (n) {
            case "input":
              hr(r), ns(r, o, !0);
              break;
            case "textarea":
              hr(r), ls(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Zr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ta(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[He] = t, e[Zn] = r, tc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = go(n, r), n) {
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
                for (l = 0; l < Mn.length; l++) H(Mn[l], e);
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
                ts(e, r), l = co(e, r), H("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = Y({}, r, { value: void 0 }), H("invalid", e);
                break;
              case "textarea":
                rs(e, r), l = ho(e, r), H("invalid", e);
                break;
              default:
                l = r;
            }
            vo(n, l), a = l;
            for (o in a) if (a.hasOwnProperty(o)) {
              var u = a[o];
              o === "style" ? Ra(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && La(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Hn(e, u) : typeof u == "number" && Hn(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Bn.hasOwnProperty(o) ? u != null && o === "onScroll" && H("scroll", e) : u != null && ii(e, o, u, i));
            }
            switch (n) {
              case "input":
                hr(e), ns(e, r, !1);
                break;
              case "textarea":
                hr(e), ls(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + kt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? nn(e, !!r.multiple, o, !1) : r.defaultValue != null && nn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Zr);
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
      return ue(t), null;
    case 6:
      if (e && t.stateNode != null) rc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(j(166));
        if (n = $t(qn.current), $t(Ve.current), jr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[He] = t, (o = r.nodeValue !== n) && (e = je, e !== null)) switch (e.tag) {
            case 3:
              Sr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Sr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[He] = t, t.stateNode = r;
      }
      return ue(t), null;
    case 13:
      if (W(Q), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (V && Se !== null && t.mode & 1 && !(t.flags & 128)) ku(), dn(), t.flags |= 98560, o = !1;
        else if (o = jr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(j(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(j(317));
            o[He] = t;
          } else dn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ue(t), o = !1;
        } else De !== null && (Zo(De), De = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Q.current & 1 ? te === 0 && (te = 3) : Hi())), t.updateQueue !== null && (t.flags |= 4), ue(t), null);
    case 4:
      return pn(), Wo(e, t), e === null && bn(t.stateNode.containerInfo), ue(t), null;
    case 10:
      return _i(t.type._context), ue(t), null;
    case 17:
      return xe(t.type) && Jr(), ue(t), null;
    case 19:
      if (W(Q), o = t.memoizedState, o === null) return ue(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) _n(o, !1);
      else {
        if (te !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = ol(e), i !== null) {
            for (t.flags |= 128, _n(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return B(Q, Q.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && J() > mn && (t.flags |= 128, r = !0, _n(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = ol(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), _n(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !V) return ue(t), null;
        } else 2 * J() - o.renderingStartTime > mn && n !== 1073741824 && (t.flags |= 128, r = !0, _n(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = J(), t.sibling = null, n = Q.current, B(Q, r ? n & 1 | 2 : n & 1), t) : (ue(t), null);
    case 22:
    case 23:
      return Bi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ke & 1073741824 && (ue(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ue(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(j(156, t.tag));
}
function Ff(e, t) {
  switch (ki(t), t.tag) {
    case 1:
      return xe(t.type) && Jr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return pn(), W(ye), W(de), Mi(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Pi(t), null;
    case 13:
      if (W(Q), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(j(340));
        dn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return W(Q), null;
    case 4:
      return pn(), null;
    case 10:
      return _i(t.type._context), null;
    case 22:
    case 23:
      return Bi(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Cr = !1, ce = !1, If = typeof WeakSet == "function" ? WeakSet : Set, z = null;
function en(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    b(e, t, r);
  }
  else n.current = null;
}
function Vo(e, t, n) {
  try {
    n();
  } catch (r) {
    b(e, t, r);
  }
}
var Ys = !1;
function Af(e, t) {
  if (Eo = Xr, e = au(), xi(e)) {
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
        var i = 0, a = -1, u = -1, d = 0, v = 0, m = e, h = null;
        t: for (; ; ) {
          for (var g; m !== n || l !== 0 && m.nodeType !== 3 || (a = i + l), m !== o || r !== 0 && m.nodeType !== 3 || (u = i + r), m.nodeType === 3 && (i += m.nodeValue.length), (g = m.firstChild) !== null; )
            h = m, m = g;
          for (; ; ) {
            if (m === e) break t;
            if (h === n && ++d === l && (a = i), h === o && ++v === r && (u = i), (g = m.nextSibling) !== null) break;
            m = h, h = m.parentNode;
          }
          m = g;
        }
        n = a === -1 || u === -1 ? null : { start: a, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (zo = { focusedElem: e, selectionRange: n }, Xr = !1, z = t; z !== null; ) if (t = z, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, z = e;
  else for (; z !== null; ) {
    t = z;
    try {
      var w = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (w !== null) {
            var k = w.memoizedProps, M = w.memoizedState, p = t.stateNode, c = p.getSnapshotBeforeUpdate(t.elementType === t.type ? k : Re(t.type, k), M);
            p.__reactInternalSnapshotBeforeUpdate = c;
          }
          break;
        case 3:
          var f = t.stateNode.containerInfo;
          f.nodeType === 1 ? f.textContent = "" : f.nodeType === 9 && f.documentElement && f.removeChild(f.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(j(163));
      }
    } catch (x) {
      b(t, t.return, x);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, z = e;
      break;
    }
    z = t.return;
  }
  return w = Ys, Ys = !1, w;
}
function In(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Vo(t, n, o);
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
function Qo(e) {
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
function lc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, lc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[He], delete t[Zn], delete t[To], delete t[kf], delete t[Sf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function oc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Xs(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || oc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ko(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Zr));
  else if (r !== 4 && (e = e.child, e !== null)) for (Ko(e, t, n), e = e.sibling; e !== null; ) Ko(e, t, n), e = e.sibling;
}
function Yo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Yo(e, t, n), e = e.sibling; e !== null; ) Yo(e, t, n), e = e.sibling;
}
var oe = null, Oe = !1;
function lt(e, t, n) {
  for (n = n.child; n !== null; ) ic(e, t, n), n = n.sibling;
}
function ic(e, t, n) {
  if (We && typeof We.onCommitFiberUnmount == "function") try {
    We.onCommitFiberUnmount(vl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ce || en(n, t);
    case 6:
      var r = oe, l = Oe;
      oe = null, lt(e, t, n), oe = r, Oe = l, oe !== null && (Oe ? (e = oe, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : oe.removeChild(n.stateNode));
      break;
    case 18:
      oe !== null && (Oe ? (e = oe, n = n.stateNode, e.nodeType === 8 ? bl(e.parentNode, n) : e.nodeType === 1 && bl(e, n), Kn(e)) : bl(oe, n.stateNode));
      break;
    case 4:
      r = oe, l = Oe, oe = n.stateNode.containerInfo, Oe = !0, lt(e, t, n), oe = r, Oe = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ce && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && Vo(n, t, i), l = l.next;
        } while (l !== r);
      }
      lt(e, t, n);
      break;
    case 1:
      if (!ce && (en(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        b(n, t, a);
      }
      lt(e, t, n);
      break;
    case 21:
      lt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ce = (r = ce) || n.memoizedState !== null, lt(e, t, n), ce = r) : lt(e, t, n);
      break;
    default:
      lt(e, t, n);
  }
}
function bs(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new If()), t.forEach(function(r) {
      var l = Xf.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function $e(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, a = i;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            oe = a.stateNode, Oe = !1;
            break e;
          case 3:
            oe = a.stateNode.containerInfo, Oe = !0;
            break e;
          case 4:
            oe = a.stateNode.containerInfo, Oe = !0;
            break e;
        }
        a = a.return;
      }
      if (oe === null) throw Error(j(160));
      ic(o, i, l), oe = null, Oe = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (d) {
      b(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) sc(t, e), t = t.sibling;
}
function sc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ($e(t, e), Ue(e), r & 4) {
        try {
          In(3, e, e.return), Nl(3, e);
        } catch (k) {
          b(e, e.return, k);
        }
        try {
          In(5, e, e.return);
        } catch (k) {
          b(e, e.return, k);
        }
      }
      break;
    case 1:
      $e(t, e), Ue(e), r & 512 && n !== null && en(n, n.return);
      break;
    case 5:
      if ($e(t, e), Ue(e), r & 512 && n !== null && en(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Hn(l, "");
        } catch (k) {
          b(e, e.return, k);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, a = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          a === "input" && o.type === "radio" && o.name != null && Pa(l, o), go(a, i);
          var d = go(a, o);
          for (i = 0; i < u.length; i += 2) {
            var v = u[i], m = u[i + 1];
            v === "style" ? Ra(l, m) : v === "dangerouslySetInnerHTML" ? La(l, m) : v === "children" ? Hn(l, m) : ii(l, v, m, d);
          }
          switch (a) {
            case "input":
              fo(l, o);
              break;
            case "textarea":
              Ma(l, o);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var g = o.value;
              g != null ? nn(l, !!o.multiple, g, !1) : h !== !!o.multiple && (o.defaultValue != null ? nn(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : nn(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Zn] = o;
        } catch (k) {
          b(e, e.return, k);
        }
      }
      break;
    case 6:
      if ($e(t, e), Ue(e), r & 4) {
        if (e.stateNode === null) throw Error(j(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (k) {
          b(e, e.return, k);
        }
      }
      break;
    case 3:
      if ($e(t, e), Ue(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Kn(t.containerInfo);
      } catch (k) {
        b(e, e.return, k);
      }
      break;
    case 4:
      $e(t, e), Ue(e);
      break;
    case 13:
      $e(t, e), Ue(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Ai = J())), r & 4 && bs(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (ce = (d = ce) || v, $e(t, e), ce = d) : $e(t, e), Ue(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !v && e.mode & 1) for (z = e, v = e.child; v !== null; ) {
          for (m = z = v; z !== null; ) {
            switch (h = z, g = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                In(4, h, h.return);
                break;
              case 1:
                en(h, h.return);
                var w = h.stateNode;
                if (typeof w.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, w.props = t.memoizedProps, w.state = t.memoizedState, w.componentWillUnmount();
                  } catch (k) {
                    b(r, n, k);
                  }
                }
                break;
              case 5:
                en(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Zs(m);
                  continue;
                }
            }
            g !== null ? (g.return = h, z = g) : Zs(m);
          }
          v = v.sibling;
        }
        e: for (v = null, m = e; ; ) {
          if (m.tag === 5) {
            if (v === null) {
              v = m;
              try {
                l = m.stateNode, d ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (a = m.stateNode, u = m.memoizedProps.style, i = u != null && u.hasOwnProperty("display") ? u.display : null, a.style.display = $a("display", i));
              } catch (k) {
                b(e, e.return, k);
              }
            }
          } else if (m.tag === 6) {
            if (v === null) try {
              m.stateNode.nodeValue = d ? "" : m.memoizedProps;
            } catch (k) {
              b(e, e.return, k);
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
      $e(t, e), Ue(e), r & 4 && bs(e);
      break;
    case 21:
      break;
    default:
      $e(
        t,
        e
      ), Ue(e);
  }
}
function Ue(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (oc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(j(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Hn(l, ""), r.flags &= -33);
          var o = Xs(e);
          Yo(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, a = Xs(e);
          Ko(e, a, i);
          break;
        default:
          throw Error(j(161));
      }
    } catch (u) {
      b(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Uf(e, t, n) {
  z = e, ac(e);
}
function ac(e, t, n) {
  for (var r = (e.mode & 1) !== 0; z !== null; ) {
    var l = z, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Cr;
      if (!i) {
        var a = l.alternate, u = a !== null && a.memoizedState !== null || ce;
        a = Cr;
        var d = ce;
        if (Cr = i, (ce = u) && !d) for (z = l; z !== null; ) i = z, u = i.child, i.tag === 22 && i.memoizedState !== null ? Js(l) : u !== null ? (u.return = i, z = u) : Js(l);
        for (; o !== null; ) z = o, ac(o), o = o.sibling;
        z = l, Cr = a, ce = d;
      }
      Gs(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, z = o) : Gs(e);
  }
}
function Gs(e) {
  for (; z !== null; ) {
    var t = z;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ce || Nl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !ce) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Re(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Rs(t, o, r);
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
              Rs(t, i, n);
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
              var d = t.alternate;
              if (d !== null) {
                var v = d.memoizedState;
                if (v !== null) {
                  var m = v.dehydrated;
                  m !== null && Kn(m);
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
            throw Error(j(163));
        }
        ce || t.flags & 512 && Qo(t);
      } catch (h) {
        b(t, t.return, h);
      }
    }
    if (t === e) {
      z = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, z = n;
      break;
    }
    z = t.return;
  }
}
function Zs(e) {
  for (; z !== null; ) {
    var t = z;
    if (t === e) {
      z = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, z = n;
      break;
    }
    z = t.return;
  }
}
function Js(e) {
  for (; z !== null; ) {
    var t = z;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Nl(4, t);
          } catch (u) {
            b(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              b(t, l, u);
            }
          }
          var o = t.return;
          try {
            Qo(t);
          } catch (u) {
            b(t, o, u);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Qo(t);
          } catch (u) {
            b(t, i, u);
          }
      }
    } catch (u) {
      b(t, t.return, u);
    }
    if (t === e) {
      z = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, z = a;
      break;
    }
    z = t.return;
  }
}
var Bf = Math.ceil, al = nt.ReactCurrentDispatcher, Fi = nt.ReactCurrentOwner, Me = nt.ReactCurrentBatchConfig, I = 0, le = null, q = null, ie = 0, ke = 0, tn = Nt(0), te = 0, rr = null, At = 0, _l = 0, Ii = 0, An = null, ve = null, Ai = 0, mn = 1 / 0, Qe = null, ul = !1, Xo = null, yt = null, Er = !1, ct = null, cl = 0, Un = 0, bo = null, Ur = -1, Br = 0;
function pe() {
  return I & 6 ? J() : Ur !== -1 ? Ur : Ur = J();
}
function xt(e) {
  return e.mode & 1 ? I & 2 && ie !== 0 ? ie & -ie : Nf.transition !== null ? (Br === 0 && (Br = Ka()), Br) : (e = A, e !== 0 || (e = window.event, e = e === void 0 ? 16 : qa(e.type)), e) : 1;
}
function Ie(e, t, n, r) {
  if (50 < Un) throw Un = 0, bo = null, Error(j(185));
  or(e, n, r), (!(I & 2) || e !== le) && (e === le && (!(I & 2) && (_l |= n), te === 4 && at(e, ie)), we(e, r), n === 1 && I === 0 && !(t.mode & 1) && (mn = J() + 500, kl && _t()));
}
function we(e, t) {
  var n = e.callbackNode;
  jd(e, t);
  var r = Yr(e, e === le ? ie : 0);
  if (r === 0) n !== null && ss(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && ss(n), t === 1) e.tag === 0 ? jf(qs.bind(null, e)) : yu(qs.bind(null, e)), xf(function() {
      !(I & 6) && _t();
    }), n = null;
    else {
      switch (Ya(r)) {
        case 1:
          n = di;
          break;
        case 4:
          n = Va;
          break;
        case 16:
          n = Kr;
          break;
        case 536870912:
          n = Qa;
          break;
        default:
          n = Kr;
      }
      n = vc(n, uc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function uc(e, t) {
  if (Ur = -1, Br = 0, I & 6) throw Error(j(327));
  var n = e.callbackNode;
  if (an() && e.callbackNode !== n) return null;
  var r = Yr(e, e === le ? ie : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = dl(e, r);
  else {
    t = r;
    var l = I;
    I |= 2;
    var o = dc();
    (le !== e || ie !== t) && (Qe = null, mn = J() + 500, Rt(e, t));
    do
      try {
        Vf();
        break;
      } catch (a) {
        cc(e, a);
      }
    while (!0);
    Ni(), al.current = o, I = l, q !== null ? t = 0 : (le = null, ie = 0, t = te);
  }
  if (t !== 0) {
    if (t === 2 && (l = So(e), l !== 0 && (r = l, t = Go(e, l))), t === 1) throw n = rr, Rt(e, 0), at(e, r), we(e, J()), n;
    if (t === 6) at(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Hf(l) && (t = dl(e, r), t === 2 && (o = So(e), o !== 0 && (r = o, t = Go(e, o))), t === 1)) throw n = rr, Rt(e, 0), at(e, r), we(e, J()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(j(345));
        case 2:
          Mt(e, ve, Qe);
          break;
        case 3:
          if (at(e, r), (r & 130023424) === r && (t = Ai + 500 - J(), 10 < t)) {
            if (Yr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              pe(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Mo(Mt.bind(null, e, ve, Qe), t);
            break;
          }
          Mt(e, ve, Qe);
          break;
        case 4:
          if (at(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - Fe(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = J() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Bf(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Mo(Mt.bind(null, e, ve, Qe), r);
            break;
          }
          Mt(e, ve, Qe);
          break;
        case 5:
          Mt(e, ve, Qe);
          break;
        default:
          throw Error(j(329));
      }
    }
  }
  return we(e, J()), e.callbackNode === n ? uc.bind(null, e) : null;
}
function Go(e, t) {
  var n = An;
  return e.current.memoizedState.isDehydrated && (Rt(e, t).flags |= 256), e = dl(e, t), e !== 2 && (t = ve, ve = n, t !== null && Zo(t)), e;
}
function Zo(e) {
  ve === null ? ve = e : ve.push.apply(ve, e);
}
function Hf(e) {
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
function at(e, t) {
  for (t &= ~Ii, t &= ~_l, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Fe(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function qs(e) {
  if (I & 6) throw Error(j(327));
  an();
  var t = Yr(e, 0);
  if (!(t & 1)) return we(e, J()), null;
  var n = dl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = So(e);
    r !== 0 && (t = r, n = Go(e, r));
  }
  if (n === 1) throw n = rr, Rt(e, 0), at(e, t), we(e, J()), n;
  if (n === 6) throw Error(j(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Mt(e, ve, Qe), we(e, J()), null;
}
function Ui(e, t) {
  var n = I;
  I |= 1;
  try {
    return e(t);
  } finally {
    I = n, I === 0 && (mn = J() + 500, kl && _t());
  }
}
function Ut(e) {
  ct !== null && ct.tag === 0 && !(I & 6) && an();
  var t = I;
  I |= 1;
  var n = Me.transition, r = A;
  try {
    if (Me.transition = null, A = 1, e) return e();
  } finally {
    A = r, Me.transition = n, I = t, !(I & 6) && _t();
  }
}
function Bi() {
  ke = tn.current, W(tn);
}
function Rt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, yf(n)), q !== null) for (n = q.return; n !== null; ) {
    var r = n;
    switch (ki(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Jr();
        break;
      case 3:
        pn(), W(ye), W(de), Mi();
        break;
      case 5:
        Pi(r);
        break;
      case 4:
        pn();
        break;
      case 13:
        W(Q);
        break;
      case 19:
        W(Q);
        break;
      case 10:
        _i(r.type._context);
        break;
      case 22:
      case 23:
        Bi();
    }
    n = n.return;
  }
  if (le = e, q = e = wt(e.current, null), ie = ke = t, te = 0, rr = null, Ii = _l = At = 0, ve = An = null, Lt !== null) {
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
function cc(e, t) {
  do {
    var n = q;
    try {
      if (Ni(), Fr.current = sl, il) {
        for (var r = K.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        il = !1;
      }
      if (It = 0, re = ee = K = null, Fn = !1, er = 0, Fi.current = null, n === null || n.return === null) {
        te = 1, rr = t, q = null;
        break;
      }
      e: {
        var o = e, i = n.return, a = n, u = t;
        if (t = ie, a.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var d = u, v = a, m = v.tag;
          if (!(v.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var h = v.alternate;
            h ? (v.updateQueue = h.updateQueue, v.memoizedState = h.memoizedState, v.lanes = h.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var g = Us(i);
          if (g !== null) {
            g.flags &= -257, Bs(g, i, a, o, t), g.mode & 1 && As(o, d, t), t = g, u = d;
            var w = t.updateQueue;
            if (w === null) {
              var k = /* @__PURE__ */ new Set();
              k.add(u), t.updateQueue = k;
            } else w.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              As(o, d, t), Hi();
              break e;
            }
            u = Error(j(426));
          }
        } else if (V && a.mode & 1) {
          var M = Us(i);
          if (M !== null) {
            !(M.flags & 65536) && (M.flags |= 256), Bs(M, i, a, o, t), Si(hn(u, a));
            break e;
          }
        }
        o = u = hn(u, a), te !== 4 && (te = 2), An === null ? An = [o] : An.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var p = Yu(o, u, t);
              $s(o, p);
              break e;
            case 1:
              a = u;
              var c = o.type, f = o.stateNode;
              if (!(o.flags & 128) && (typeof c.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (yt === null || !yt.has(f)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var x = Xu(o, a, t);
                $s(o, x);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      pc(n);
    } catch (y) {
      t = y, q === n && n !== null && (q = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function dc() {
  var e = al.current;
  return al.current = sl, e === null ? sl : e;
}
function Hi() {
  (te === 0 || te === 3 || te === 2) && (te = 4), le === null || !(At & 268435455) && !(_l & 268435455) || at(le, ie);
}
function dl(e, t) {
  var n = I;
  I |= 2;
  var r = dc();
  (le !== e || ie !== t) && (Qe = null, Rt(e, t));
  do
    try {
      Wf();
      break;
    } catch (l) {
      cc(e, l);
    }
  while (!0);
  if (Ni(), I = n, al.current = r, q !== null) throw Error(j(261));
  return le = null, ie = 0, te;
}
function Wf() {
  for (; q !== null; ) fc(q);
}
function Vf() {
  for (; q !== null && !hd(); ) fc(q);
}
function fc(e) {
  var t = mc(e.alternate, e, ke);
  e.memoizedProps = e.pendingProps, t === null ? pc(e) : q = t, Fi.current = null;
}
function pc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Ff(n, t), n !== null) {
        n.flags &= 32767, q = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        te = 6, q = null;
        return;
      }
    } else if (n = Df(n, t, ke), n !== null) {
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
function Mt(e, t, n) {
  var r = A, l = Me.transition;
  try {
    Me.transition = null, A = 1, Qf(e, t, n, r);
  } finally {
    Me.transition = l, A = r;
  }
  return null;
}
function Qf(e, t, n, r) {
  do
    an();
  while (ct !== null);
  if (I & 6) throw Error(j(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(j(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Nd(e, o), e === le && (q = le = null, ie = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Er || (Er = !0, vc(Kr, function() {
    return an(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Me.transition, Me.transition = null;
    var i = A;
    A = 1;
    var a = I;
    I |= 4, Fi.current = null, Af(e, n), sc(n, e), df(zo), Xr = !!Eo, zo = Eo = null, e.current = n, Uf(n), md(), I = a, A = i, Me.transition = o;
  } else e.current = n;
  if (Er && (Er = !1, ct = e, cl = l), o = e.pendingLanes, o === 0 && (yt = null), yd(n.stateNode), we(e, J()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (ul) throw ul = !1, e = Xo, Xo = null, e;
  return cl & 1 && e.tag !== 0 && an(), o = e.pendingLanes, o & 1 ? e === bo ? Un++ : (Un = 0, bo = e) : Un = 0, _t(), null;
}
function an() {
  if (ct !== null) {
    var e = Ya(cl), t = Me.transition, n = A;
    try {
      if (Me.transition = null, A = 16 > e ? 16 : e, ct === null) var r = !1;
      else {
        if (e = ct, ct = null, cl = 0, I & 6) throw Error(j(331));
        var l = I;
        for (I |= 4, z = e.current; z !== null; ) {
          var o = z, i = o.child;
          if (z.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var d = a[u];
                for (z = d; z !== null; ) {
                  var v = z;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      In(8, v, o);
                  }
                  var m = v.child;
                  if (m !== null) m.return = v, z = m;
                  else for (; z !== null; ) {
                    v = z;
                    var h = v.sibling, g = v.return;
                    if (lc(v), v === d) {
                      z = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = g, z = h;
                      break;
                    }
                    z = g;
                  }
                }
              }
              var w = o.alternate;
              if (w !== null) {
                var k = w.child;
                if (k !== null) {
                  w.child = null;
                  do {
                    var M = k.sibling;
                    k.sibling = null, k = M;
                  } while (k !== null);
                }
              }
              z = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, z = i;
          else e: for (; z !== null; ) {
            if (o = z, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                In(9, o, o.return);
            }
            var p = o.sibling;
            if (p !== null) {
              p.return = o.return, z = p;
              break e;
            }
            z = o.return;
          }
        }
        var c = e.current;
        for (z = c; z !== null; ) {
          i = z;
          var f = i.child;
          if (i.subtreeFlags & 2064 && f !== null) f.return = i, z = f;
          else e: for (i = c; z !== null; ) {
            if (a = z, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Nl(9, a);
              }
            } catch (y) {
              b(a, a.return, y);
            }
            if (a === i) {
              z = null;
              break e;
            }
            var x = a.sibling;
            if (x !== null) {
              x.return = a.return, z = x;
              break e;
            }
            z = a.return;
          }
        }
        if (I = l, _t(), We && typeof We.onPostCommitFiberRoot == "function") try {
          We.onPostCommitFiberRoot(vl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      A = n, Me.transition = t;
    }
  }
  return !1;
}
function ea(e, t, n) {
  t = hn(n, t), t = Yu(e, t, 1), e = gt(e, t, 1), t = pe(), e !== null && (or(e, 1, t), we(e, t));
}
function b(e, t, n) {
  if (e.tag === 3) ea(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      ea(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (yt === null || !yt.has(r))) {
        e = hn(n, e), e = Xu(t, e, 1), t = gt(t, e, 1), e = pe(), t !== null && (or(t, 1, e), we(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Kf(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = pe(), e.pingedLanes |= e.suspendedLanes & n, le === e && (ie & n) === n && (te === 4 || te === 3 && (ie & 130023424) === ie && 500 > J() - Ai ? Rt(e, 0) : Ii |= n), we(e, t);
}
function hc(e, t) {
  t === 0 && (e.mode & 1 ? (t = gr, gr <<= 1, !(gr & 130023424) && (gr = 4194304)) : t = 1);
  var n = pe();
  e = qe(e, t), e !== null && (or(e, t, n), we(e, n));
}
function Yf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), hc(e, n);
}
function Xf(e, t) {
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
      throw Error(j(314));
  }
  r !== null && r.delete(t), hc(e, n);
}
var mc;
mc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ye.current) ge = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return ge = !1, Of(e, t, n);
    ge = !!(e.flags & 131072);
  }
  else ge = !1, V && t.flags & 1048576 && xu(t, tl, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Ar(e, t), e = t.pendingProps;
      var l = cn(t, de.current);
      sn(t, n), l = Li(null, t, r, e, l, n);
      var o = $i();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, xe(r) ? (o = !0, qr(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Ei(t), l.updater = jl, t.stateNode = l, l._reactInternals = t, Fo(t, r, e, n), t = Uo(null, t, r, !0, o, n)) : (t.tag = 0, V && o && wi(t), fe(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Ar(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Gf(r), e = Re(r, e), l) {
          case 0:
            t = Ao(null, t, r, e, n);
            break e;
          case 1:
            t = Vs(null, t, r, e, n);
            break e;
          case 11:
            t = Hs(null, t, r, e, n);
            break e;
          case 14:
            t = Ws(null, t, r, Re(r.type, e), n);
            break e;
        }
        throw Error(j(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Ao(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Vs(e, t, r, l, n);
    case 3:
      e: {
        if (Ju(t), e === null) throw Error(j(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, _u(e, t), ll(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = hn(Error(j(423)), t), t = Qs(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = hn(Error(j(424)), t), t = Qs(e, t, r, n, l);
          break e;
        } else for (Se = vt(t.stateNode.containerInfo.firstChild), je = t, V = !0, De = null, n = ju(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (dn(), r === l) {
            t = et(e, t, n);
            break e;
          }
          fe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Cu(t), e === null && Ro(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Po(r, l) ? i = null : o !== null && Po(r, o) && (t.flags |= 32), Zu(e, t), fe(e, t, i, n), t.child;
    case 6:
      return e === null && Ro(t), null;
    case 13:
      return qu(e, t, n);
    case 4:
      return zi(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = fn(t, null, r, n) : fe(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Hs(e, t, r, l, n);
    case 7:
      return fe(e, t, t.pendingProps, n), t.child;
    case 8:
      return fe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return fe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, B(nl, r._currentValue), r._currentValue = i, o !== null) if (Ae(o.value, i)) {
          if (o.children === l.children && !ye.current) {
            t = et(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var a = o.dependencies;
          if (a !== null) {
            i = o.child;
            for (var u = a.firstContext; u !== null; ) {
              if (u.context === r) {
                if (o.tag === 1) {
                  u = Ge(-1, n & -n), u.tag = 2;
                  var d = o.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var v = d.pending;
                    v === null ? u.next = u : (u.next = v.next, v.next = u), d.pending = u;
                  }
                }
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Oo(
                  o.return,
                  n,
                  t
                ), a.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (i = o.return, i === null) throw Error(j(341));
            i.lanes |= n, a = i.alternate, a !== null && (a.lanes |= n), Oo(i, n, t), i = o.sibling;
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
        fe(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, sn(t, n), l = Te(l), r = r(l), t.flags |= 1, fe(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Re(r, t.pendingProps), l = Re(r.type, l), Ws(e, t, r, l, n);
    case 15:
      return bu(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Ar(e, t), t.tag = 1, xe(r) ? (e = !0, qr(t)) : e = !1, sn(t, n), Ku(t, r, l), Fo(t, r, l, n), Uo(null, t, r, !0, e, n);
    case 19:
      return ec(e, t, n);
    case 22:
      return Gu(e, t, n);
  }
  throw Error(j(156, t.tag));
};
function vc(e, t) {
  return Wa(e, t);
}
function bf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Pe(e, t, n, r) {
  return new bf(e, t, n, r);
}
function Wi(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Gf(e) {
  if (typeof e == "function") return Wi(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ai) return 11;
    if (e === ui) return 14;
  }
  return 2;
}
function wt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Pe(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Hr(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") Wi(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case Qt:
      return Ot(n.children, l, o, t);
    case si:
      i = 8, l |= 8;
      break;
    case io:
      return e = Pe(12, n, t, l | 2), e.elementType = io, e.lanes = o, e;
    case so:
      return e = Pe(13, n, t, l), e.elementType = so, e.lanes = o, e;
    case ao:
      return e = Pe(19, n, t, l), e.elementType = ao, e.lanes = o, e;
    case Ca:
      return Cl(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Na:
          i = 10;
          break e;
        case _a:
          i = 9;
          break e;
        case ai:
          i = 11;
          break e;
        case ui:
          i = 14;
          break e;
        case ot:
          i = 16, r = null;
          break e;
      }
      throw Error(j(130, e == null ? e : typeof e, ""));
  }
  return t = Pe(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Ot(e, t, n, r) {
  return e = Pe(7, e, r, t), e.lanes = n, e;
}
function Cl(e, t, n, r) {
  return e = Pe(22, e, r, t), e.elementType = Ca, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ro(e, t, n) {
  return e = Pe(6, e, null, t), e.lanes = n, e;
}
function lo(e, t, n) {
  return t = Pe(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Zf(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Il(0), this.expirationTimes = Il(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Il(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Vi(e, t, n, r, l, o, i, a, u) {
  return e = new Zf(e, t, n, a, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Pe(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ei(o), e;
}
function Jf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Vt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function gc(e) {
  if (!e) return St;
  e = e._reactInternals;
  e: {
    if (Ht(e) !== e || e.tag !== 1) throw Error(j(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (xe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(j(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (xe(n)) return gu(e, n, t);
  }
  return t;
}
function yc(e, t, n, r, l, o, i, a, u) {
  return e = Vi(n, r, !0, e, l, o, i, a, u), e.context = gc(null), n = e.current, r = pe(), l = xt(n), o = Ge(r, l), o.callback = t ?? null, gt(n, o, l), e.current.lanes = l, or(e, l, r), we(e, r), e;
}
function El(e, t, n, r) {
  var l = t.current, o = pe(), i = xt(l);
  return n = gc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ge(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = gt(l, t, i), e !== null && (Ie(e, l, i, o), Dr(e, l, i)), i;
}
function fl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function ta(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Qi(e, t) {
  ta(e, t), (e = e.alternate) && ta(e, t);
}
function qf() {
  return null;
}
var xc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Ki(e) {
  this._internalRoot = e;
}
zl.prototype.render = Ki.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(j(409));
  El(e, t, null, null);
};
zl.prototype.unmount = Ki.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ut(function() {
      El(null, e, null, null);
    }), t[Je] = null;
  }
};
function zl(e) {
  this._internalRoot = e;
}
zl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Ga();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < st.length && t !== 0 && t < st[n].priority; n++) ;
    st.splice(n, 0, e), n === 0 && Ja(e);
  }
};
function Yi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Pl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function na() {
}
function ep(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = fl(i);
        o.call(d);
      };
    }
    var i = yc(t, r, e, 0, null, !1, !1, "", na);
    return e._reactRootContainer = i, e[Je] = i.current, bn(e.nodeType === 8 ? e.parentNode : e), Ut(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var d = fl(u);
      a.call(d);
    };
  }
  var u = Vi(e, 0, !1, null, null, !1, !1, "", na);
  return e._reactRootContainer = u, e[Je] = u.current, bn(e.nodeType === 8 ? e.parentNode : e), Ut(function() {
    El(t, u, n, r);
  }), u;
}
function Ml(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var u = fl(i);
        a.call(u);
      };
    }
    El(t, i, e, l);
  } else i = ep(n, t, e, l, r);
  return fl(i);
}
Xa = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Pn(t.pendingLanes);
        n !== 0 && (fi(t, n | 1), we(t, J()), !(I & 6) && (mn = J() + 500, _t()));
      }
      break;
    case 13:
      Ut(function() {
        var r = qe(e, 1);
        if (r !== null) {
          var l = pe();
          Ie(r, e, 1, l);
        }
      }), Qi(e, 1);
  }
};
pi = function(e) {
  if (e.tag === 13) {
    var t = qe(e, 134217728);
    if (t !== null) {
      var n = pe();
      Ie(t, e, 134217728, n);
    }
    Qi(e, 134217728);
  }
};
ba = function(e) {
  if (e.tag === 13) {
    var t = xt(e), n = qe(e, t);
    if (n !== null) {
      var r = pe();
      Ie(n, e, t, r);
    }
    Qi(e, t);
  }
};
Ga = function() {
  return A;
};
Za = function(e, t) {
  var n = A;
  try {
    return A = e, t();
  } finally {
    A = n;
  }
};
xo = function(e, t, n) {
  switch (t) {
    case "input":
      if (fo(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = wl(r);
            if (!l) throw Error(j(90));
            za(r), fo(r, l);
          }
        }
      }
      break;
    case "textarea":
      Ma(e, n);
      break;
    case "select":
      t = n.value, t != null && nn(e, !!n.multiple, t, !1);
  }
};
Fa = Ui;
Ia = Ut;
var tp = { usingClientEntryPoint: !1, Events: [sr, bt, wl, Oa, Da, Ui] }, Cn = { findFiberByHostInstance: Tt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, np = { bundleType: Cn.bundleType, version: Cn.version, rendererPackageName: Cn.rendererPackageName, rendererConfig: Cn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: nt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ba(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Cn.findFiberByHostInstance || qf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var zr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!zr.isDisabled && zr.supportsFiber) try {
    vl = zr.inject(np), We = zr;
  } catch {
  }
}
_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tp;
_e.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Yi(t)) throw Error(j(200));
  return Jf(e, t, null, n);
};
_e.createRoot = function(e, t) {
  if (!Yi(e)) throw Error(j(299));
  var n = !1, r = "", l = xc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Vi(e, 1, !1, null, null, n, !1, r, l), e[Je] = t.current, bn(e.nodeType === 8 ? e.parentNode : e), new Ki(t);
};
_e.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(j(188)) : (e = Object.keys(e).join(","), Error(j(268, e)));
  return e = Ba(t), e = e === null ? null : e.stateNode, e;
};
_e.flushSync = function(e) {
  return Ut(e);
};
_e.hydrate = function(e, t, n) {
  if (!Pl(t)) throw Error(j(200));
  return Ml(null, e, t, !0, n);
};
_e.hydrateRoot = function(e, t, n) {
  if (!Yi(e)) throw Error(j(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = xc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = yc(t, null, e, 1, n ?? null, l, !1, o, i), e[Je] = t.current, bn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new zl(t);
};
_e.render = function(e, t, n) {
  if (!Pl(t)) throw Error(j(200));
  return Ml(null, e, t, !1, n);
};
_e.unmountComponentAtNode = function(e) {
  if (!Pl(e)) throw Error(j(40));
  return e._reactRootContainer ? (Ut(function() {
    Ml(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Je] = null;
    });
  }), !0) : !1;
};
_e.unstable_batchedUpdates = Ui;
_e.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Pl(n)) throw Error(j(200));
  if (e == null || e._reactInternals === void 0) throw Error(j(38));
  return Ml(e, t, n, !1, r);
};
_e.version = "18.3.1-next-f1338f8080-20240426";
function wc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(wc);
    } catch (e) {
      console.error(e);
    }
}
wc(), wa.exports = _e;
var rp = wa.exports, kc, ra = rp;
kc = ra.createRoot, ra.hydrateRoot;
const Pr = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
], Xi = { heat: "Heating", water: "Hot water" }, tt = (e) => String((e == null ? void 0 : e.message) ?? e);
function Sc(e, t, n) {
  const [r, l] = T.useState(!1), [o, i] = T.useState(null);
  return { busy: r, result: o, send: async (u, d) => {
    l(!0);
    try {
      await e().callWS({ entry_id: t, channel: n, ...u }), i({ kind: "ok", text: d });
    } catch (v) {
      i({ kind: "error", text: tt(v) });
    } finally {
      l(!1);
    }
  } };
}
const dt = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`;
function F({ name: e, className: t }) {
  return /* @__PURE__ */ s.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("ha-icon", { icon: `mdi:${e}` }) });
}
const lp = [15, 30, 45, 60, 90, 120, 180, 240, 360];
function op({
  getHass: e,
  device: t,
  limits: n,
  status: r
}) {
  return /* @__PURE__ */ s.jsx("div", { className: "stack", children: t.channels.map((l) => /* @__PURE__ */ s.jsx(
    ip,
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
function ip({
  getHass: e,
  entryId: t,
  channel: n,
  limits: r,
  info: l
}) {
  const o = n === "water", i = (l == null ? void 0 : l.status) ?? null, { busy: a, result: u, send: d } = Sc(e, t, n), [v, m] = T.useState(20), [h, g] = T.useState((l == null ? void 0 : l.boost_minutes) ?? 30), [w, k] = T.useState((l == null ? void 0 : l.boost_temperature) ?? 21);
  T.useEffect(() => {
    l && g(l.boost_minutes);
  }, [l == null ? void 0 : l.boost_minutes]), T.useEffect(() => {
    l && k(l.boost_temperature);
  }, [l == null ? void 0 : l.boost_temperature]), T.useEffect(() => {
    (i == null ? void 0 : i.mode) === "manual" && i.setpoint != null && i.setpoint >= r.boost_min_temp && m(i.setpoint);
  }, [i == null ? void 0 : i.mode, i == null ? void 0 : i.setpoint]);
  const M = (y) => d(
    { type: "hive_local/mode", mode: y, ...y === "manual" && !o ? { setpoint: v } : {} },
    y === "schedule" ? "Following the schedule" : y === "off" ? "Turned off" : o ? "Always on" : `Holding ${v}°`
  ), p = [
    { id: "schedule", label: "Schedule", icon: "calendar-clock", hint: "Follow the schedule on the receiver" },
    o ? { id: "manual", label: "Always on", icon: "water-boiler", hint: "Keep the hot water on" } : { id: "manual", label: "Manual", icon: "hand-back-right", hint: "Hold one temperature" },
    { id: "off", label: "Off", icon: "power", hint: o ? "No hot water" : "Frost protection only" }
  ], c = (i == null ? void 0 : i.mode) === "boost", f = (y) => Math.min(r.heat_max, Math.max(r.boost_min_temp, Math.round(y * 2) / 2)), x = [.../* @__PURE__ */ new Set([...lp, h])].filter((y) => y <= r.boost_max_minutes).sort((y, C) => y - C);
  return /* @__PURE__ */ s.jsxs("section", { className: `card ${n}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ s.jsx(F, { name: o ? "water-boiler" : "radiator", className: "title-icon" }),
        /* @__PURE__ */ s.jsx("h2", { children: Xi[n] })
      ] }),
      !i && /* @__PURE__ */ s.jsx("span", { className: "muted", children: "Waiting for the receiver…" })
    ] }),
    /* @__PURE__ */ s.jsx("h3", { children: "Mode" }),
    /* @__PURE__ */ s.jsx("div", { className: "mode-grid", children: p.map((y) => /* @__PURE__ */ s.jsxs(
      "button",
      {
        className: `mode-tile ${(i == null ? void 0 : i.mode) === y.id ? "on" : ""}`,
        disabled: a,
        onClick: () => M(y.id),
        children: [
          /* @__PURE__ */ s.jsx(F, { name: y.icon }),
          /* @__PURE__ */ s.jsx("span", { className: "mode-label", children: y.label }),
          /* @__PURE__ */ s.jsx("span", { className: "muted small", children: y.hint })
        ]
      },
      y.id
    )) }),
    !o && (i == null ? void 0 : i.mode) === "manual" && /* @__PURE__ */ s.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "muted", children: "Hold at" }),
      /* @__PURE__ */ s.jsx(Jo, { value: v, onChange: (y) => m(f(y)) }),
      i.setpoint !== v && /* @__PURE__ */ s.jsx("button", { className: "primary", disabled: a, onClick: () => M("manual"), children: "Apply" })
    ] }),
    /* @__PURE__ */ s.jsx("h3", { children: "Boost" }),
    c ? /* @__PURE__ */ s.jsxs("div", { className: "boost-live", children: [
      /* @__PURE__ */ s.jsx(F, { name: "rocket-launch", className: "boost-icon" }),
      /* @__PURE__ */ s.jsxs("div", { children: [
        /* @__PURE__ */ s.jsxs("div", { className: "boost-title", children: [
          "Boosting",
          !o && (i == null ? void 0 : i.setpoint) != null ? ` to ${i.setpoint}°` : ""
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "muted", children: (i == null ? void 0 : i.boost_remaining) != null ? `${dt(i.boost_remaining)} left` : "Time left unknown" })
      ] }),
      /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ s.jsx("button", { disabled: a, onClick: () => d({ type: "hive_local/cancel_boost" }, "Boost cancelled"), children: "Cancel boost" })
    ] }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("div", { className: "chips", role: "radiogroup", "aria-label": "Boost duration", children: x.map((y) => /* @__PURE__ */ s.jsx("button", { role: "radio", "aria-checked": y === h, className: `chip-btn ${y === h ? "on" : ""}`, onClick: () => g(y), children: dt(y) }, y)) }),
      /* @__PURE__ */ s.jsxs("div", { className: "inline-row", children: [
        !o && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          /* @__PURE__ */ s.jsx("span", { className: "muted", children: "Temperature" }),
          /* @__PURE__ */ s.jsx(Jo, { value: w, onChange: (y) => k(f(y)) })
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: "primary",
            disabled: a,
            onClick: () => d(
              { type: "hive_local/boost", minutes: h, ...o ? {} : { temperature: w } },
              `Boosting for ${dt(h)}`
            ),
            children: [
              /* @__PURE__ */ s.jsx(F, { name: "rocket-launch" }),
              " Boost ",
              dt(h)
            ]
          }
        )
      ] })
    ] }),
    u && /* @__PURE__ */ s.jsx("div", { className: `status ${u.kind}`, children: u.text })
  ] });
}
function Jo({ value: e, onChange: t }) {
  return /* @__PURE__ */ s.jsxs("div", { className: "stepper", children: [
    /* @__PURE__ */ s.jsx("button", { className: "round", onClick: () => t(e - 0.5), "aria-label": "Lower", children: /* @__PURE__ */ s.jsx(F, { name: "minus" }) }),
    /* @__PURE__ */ s.jsxs("span", { className: "stepper-value", children: [
      e.toFixed(1),
      "°"
    ] }),
    /* @__PURE__ */ s.jsx("button", { className: "round", onClick: () => t(e + 0.5), "aria-label": "Raise", children: /* @__PURE__ */ s.jsx(F, { name: "plus" }) })
  ] });
}
const sp = '<defs><linearGradient id="hl-mark-g" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#FFB547"/><stop offset="1" stop-color="#FF5A1F"/></linearGradient></defs><polygon points="256,62 452,222 452,446 60,446 60,222" fill="url(#hl-mark-g)" stroke="url(#hl-mark-g)" stroke-width="56" stroke-linejoin="round"/><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" fill="#fff" transform="translate(256 292) scale(10) translate(-12 -12)"/>';
function la({ size: e = 28 }) {
  return /* @__PURE__ */ s.jsx(
    "svg",
    {
      className: "logo-mark",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      "aria-hidden": "true",
      dangerouslySetInnerHTML: { __html: sp }
    }
  );
}
const oa = 5, ap = 30, up = 135, jc = 270, pl = 80, ia = (e) => Math.min(1, Math.max(0, (e - oa) / (ap - oa)));
function qo(e) {
  const t = (up + jc * e) * Math.PI / 180;
  return { x: 100 + pl * Math.cos(t), y: 100 + pl * Math.sin(t) };
}
function sa(e, t) {
  const n = qo(e), r = qo(t), l = jc * (t - e) > 180 ? 1 : 0;
  return `M ${n.x} ${n.y} A ${pl} ${pl} 0 ${l} 1 ${r.x} ${r.y}`;
}
function cp({
  current: e,
  target: t,
  state: n,
  caption: r
}) {
  const l = e != null ? qo(ia(e)) : null;
  return /* @__PURE__ */ s.jsxs("div", { className: `dial ${n}`, children: [
    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 200 200", role: "img", "aria-label": r, children: [
      /* @__PURE__ */ s.jsx("path", { className: "track", d: sa(0, 1) }),
      t != null && n !== "off" && /* @__PURE__ */ s.jsx("path", { className: "value", d: sa(0, Math.max(5e-3, ia(t))) }),
      l && /* @__PURE__ */ s.jsx("circle", { className: "dot", cx: l.x, cy: l.y, r: "7" })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "dial-center", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "dial-temp", children: [
        e != null ? e.toFixed(1) : "–",
        /* @__PURE__ */ s.jsx("span", { className: "unit", children: "°C" })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "dial-caption", children: r })
    ] })
  ] });
}
function dp({
  getHass: e,
  devices: t,
  status: n,
  onOpen: r
}) {
  return /* @__PURE__ */ s.jsx("div", { className: "grid", children: t.flatMap(
    (l) => l.channels.map((o) => {
      var i;
      return /* @__PURE__ */ s.jsx(
        pp,
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
const fp = {
  schedule: "calendar-clock",
  manual: "hand-back-right",
  off: "power",
  boost: "rocket-launch"
};
function pp({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  showDevice: l,
  onOpen: o
}) {
  var c;
  const i = n === "water", a = (r == null ? void 0 : r.status) ?? null, { busy: u, result: d, send: v } = Sc(e, t.entry_id, n), m = !!a && a.mode !== "off" && a.heating, h = !a || a.mode === "off" ? "off" : m ? "heating" : "idle", g = !i && (a == null ? void 0 : a.setpoint) != null && a.setpoint <= 1, w = i || (a == null ? void 0 : a.setpoint) == null ? null : g ? (r == null ? void 0 : r.frost_temperature) ?? null : a.setpoint, k = [
    { id: "schedule", label: "Schedule" },
    { id: "manual", label: i ? "Always on" : "Manual" },
    { id: "off", label: "Off" }
  ], M = (r == null ? void 0 : r.boost_minutes) ?? 30;
  let p = "Waiting for the receiver…";
  return a && (a.mode === "off" ? p = "Off" : i ? p = m ? "Heating water" : "Not heating" : p = `${m ? "Heating" : "Idle"}${w != null ? ` · ${g ? "frost" : "target"} ${w}°` : ""}`), /* @__PURE__ */ s.jsxs("section", { className: `card channel ${n} ${h}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ s.jsx(F, { name: i ? "water-boiler" : "radiator", className: "title-icon" }),
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsx("h2", { children: Xi[n] }),
          l && /* @__PURE__ */ s.jsx("div", { className: "muted small", children: t.name })
        ] })
      ] }),
      a && /* @__PURE__ */ s.jsxs("span", { className: `chip mode-${a.mode}`, children: [
        /* @__PURE__ */ s.jsx(F, { name: fp[a.mode] }),
        a.mode === "boost" ? a.boost_remaining != null ? `Boost · ${dt(a.boost_remaining)} left` : "Boost" : (c = k.find((f) => f.id === a.mode)) == null ? void 0 : c.label
      ] })
    ] }),
    i ? /* @__PURE__ */ s.jsxs("div", { className: `water-state ${h}`, children: [
      /* @__PURE__ */ s.jsx("div", { className: "water-orb", children: /* @__PURE__ */ s.jsx(F, { name: h === "off" ? "water-boiler-off" : "water-boiler" }) }),
      /* @__PURE__ */ s.jsx("div", { className: "dial-caption", children: p })
    ] }) : /* @__PURE__ */ s.jsx(cp, { current: (a == null ? void 0 : a.current_temperature) ?? null, target: w, state: h, caption: p }),
    /* @__PURE__ */ s.jsx("div", { className: "segmented full", children: k.map((f) => /* @__PURE__ */ s.jsx(
      "button",
      {
        className: (a == null ? void 0 : a.mode) === f.id ? "on" : "",
        disabled: u || !a,
        onClick: () => v({ type: "hive_local/mode", mode: f.id }, f.id === "schedule" ? "Following the schedule" : f.label),
        children: f.label
      },
      f.id
    )) }),
    /* @__PURE__ */ s.jsxs("div", { className: "card-actions", children: [
      (a == null ? void 0 : a.mode) === "boost" ? /* @__PURE__ */ s.jsxs("button", { className: "boost-btn cancel", disabled: u, onClick: () => v({ type: "hive_local/cancel_boost" }, "Boost cancelled"), children: [
        /* @__PURE__ */ s.jsx(F, { name: "close" }),
        " Cancel boost"
      ] }) : /* @__PURE__ */ s.jsxs(
        "button",
        {
          className: "boost-btn",
          disabled: u || !a,
          onClick: () => v({ type: "hive_local/boost" }, `Boosting for ${dt(M)}`),
          children: [
            /* @__PURE__ */ s.jsx(F, { name: "rocket-launch" }),
            " Boost ",
            dt(M),
            !i && r ? ` · ${r.boost_temperature}°` : ""
          ]
        }
      ),
      /* @__PURE__ */ s.jsxs("button", { className: "ghost", onClick: o, children: [
        "More ",
        /* @__PURE__ */ s.jsx(F, { name: "chevron-right" })
      ] })
    ] }),
    (d == null ? void 0 : d.kind) === "error" && /* @__PURE__ */ s.jsx("div", { className: "status error", children: d.text })
  ] });
}
const hp = {
  heat: { schedule: "Schedule", manual: "Manual", off: "Off", boost: "Boost" },
  water: { schedule: "Schedule", manual: "Always on", off: "Off", boost: "Boost" }
};
function mp(e, t) {
  if (!t) return "Waiting for the receiver…";
  const n = t.mode === "boost" && t.boost_remaining != null ? `Boost · ${dt(t.boost_remaining)} left` : hp[e][t.mode] ?? t.mode;
  return e === "water" ? `${n} · ${t.heating ? "heating water" : "idle"}` : `${t.current_temperature == null ? "–" : `${t.current_temperature.toFixed(1)}°`} · ${n}${t.heating ? " · heating" : ""}`;
}
function vp({ devices: e, status: t, channel: n, onOpen: r }) {
  return /* @__PURE__ */ s.jsx("div", { className: "grid", children: e.map((l) => {
    var i, a;
    const o = (a = (i = t[l.entry_id]) == null ? void 0 : i[n]) == null ? void 0 : a.status;
    return /* @__PURE__ */ s.jsxs("button", { className: `card receiver-card ${n}`, onClick: () => r(l.entry_id), children: [
      /* @__PURE__ */ s.jsx(F, { name: n === "water" ? "water-boiler" : "radiator", className: "title-icon" }),
      /* @__PURE__ */ s.jsxs("span", { className: "receiver-text", children: [
        /* @__PURE__ */ s.jsx("span", { className: "receiver-name", children: l.name }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: mp(n, o) })
      ] }),
      (o == null ? void 0 : o.heating) && /* @__PURE__ */ s.jsx("span", { className: "dot-heating", "aria-label": "Heating" }),
      /* @__PURE__ */ s.jsx(F, { name: "chevron-right" })
    ] }, l.entry_id);
  }) });
}
const gp = 20, hl = (e) => e == null ? "–" : `${e.toFixed(1)}°`;
function yp({ getHass: e }) {
  const [t, n] = T.useState(null), [r, l] = T.useState([]), [o, i] = T.useState(null), [a, u] = T.useState("");
  return T.useEffect(() => {
    const d = e().connection.subscribeMessage(
      (v) => {
        n(v.rooms), l(v.receivers);
      },
      { type: "hive_local/rooms/subscribe" }
    );
    return d.catch((v) => u(tt(v))), () => {
      d.then((v) => v()).catch(() => {
      });
    };
  }, [e]), a ? /* @__PURE__ */ s.jsx("div", { className: "status error", children: a }) : t ? /* @__PURE__ */ s.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "rooms-head", children: [
      /* @__PURE__ */ s.jsx("p", { className: "muted", children: "Group your Hive radiator valves into rooms, on ZHA or Zigbee2MQTT. Add a temperature sensor to a room for a better reading than the valves' own." }),
      o !== "new" && /* @__PURE__ */ s.jsxs("button", { className: "primary", onClick: () => i("new"), children: [
        /* @__PURE__ */ s.jsx(F, { name: "plus" }),
        " Add room"
      ] })
    ] }),
    o === "new" && /* @__PURE__ */ s.jsx(aa, { getHass: e, onDone: () => i(null) }),
    !t.length && o !== "new" && /* @__PURE__ */ s.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ s.jsx(F, { name: "home-thermometer-outline" }),
      /* @__PURE__ */ s.jsx("p", { children: "No rooms yet. Add a room and pick its Hive radiator valves." })
    ] }),
    xp(t, r).map(([d, v]) => /* @__PURE__ */ s.jsxs("section", { className: "zone", children: [
      d && /* @__PURE__ */ s.jsx("h3", { children: d }),
      /* @__PURE__ */ s.jsx("div", { className: "grid", children: v.map(
        (m) => o !== "new" && (o == null ? void 0 : o.id) === m.id ? /* @__PURE__ */ s.jsx(aa, { getHass: e, room: m, onDone: () => i(null) }, m.id) : /* @__PURE__ */ s.jsx(wp, { getHass: e, room: m, onEdit: () => i(m) }, m.id)
      ) })
    ] }, d ?? "all"))
  ] }) : null;
}
function xp(e, t) {
  if (t.length <= 1) return e.length ? [[null, e]] : [];
  const n = t.map((l) => [`Heated by ${l.name}`, e.filter((o) => o.receiver === l.entry_id)]).filter(([, l]) => l.length), r = e.filter((l) => !t.some((o) => o.entry_id === l.receiver));
  return r.length && n.push(["Receiver not set", r]), n;
}
function wp({ getHass: e, room: t, onEdit: n }) {
  var m;
  const [r, l] = T.useState(null), [o, i] = T.useState(null), a = T.useRef(), u = r ?? t.target ?? ((m = t.target_range) == null ? void 0 : m[1]) ?? 20, d = (h) => {
    const g = Math.min(35, Math.max(5, h));
    l(g), i(null), window.clearTimeout(a.current), a.current = window.setTimeout(async () => {
      try {
        const w = await e().callWS({
          type: "hive_local/rooms/set_target",
          room_id: t.id,
          temperature: g
        });
        if (w.failed.length) {
          const k = t.valve_states.filter((M) => w.failed.includes(M.entity_id)).map((M) => M.name);
          i({ kind: "error", text: `Didn't take on ${k.join(", ")}. It may be asleep; try again shortly.` });
        }
      } catch (w) {
        i({ kind: "error", text: tt(w) });
      } finally {
        l(null);
      }
    }, 700);
  }, v = t.temperature_source === "sensor" ? t.sensor_name : t.temperature_source === "valves" ? t.valve_states.filter((h) => h.available).length === 1 ? "From the valve" : "Average of the valves" : "No reading";
  return /* @__PURE__ */ s.jsxs("section", { className: `card room ${t.heating ? "heating" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ s.jsx(F, { name: "home-thermometer-outline", className: "title-icon" }),
        /* @__PURE__ */ s.jsx("h2", { children: t.name })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "chips", children: [
        t.heating ? /* @__PURE__ */ s.jsxs("span", { className: "chip heating", children: [
          /* @__PURE__ */ s.jsx(F, { name: "fire" }),
          " Heating"
        ] }) : /* @__PURE__ */ s.jsx("span", { className: "chip", children: "Idle" }),
        /* @__PURE__ */ s.jsx("button", { className: "ghost round", onClick: n, "aria-label": `Edit ${t.name}`, children: /* @__PURE__ */ s.jsx(F, { name: "pencil-outline" }) })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "room-now", children: [
      /* @__PURE__ */ s.jsxs("div", { children: [
        /* @__PURE__ */ s.jsxs("div", { className: "room-temp", children: [
          t.current_temperature == null ? "–" : t.current_temperature.toFixed(1),
          /* @__PURE__ */ s.jsx("span", { className: "unit", children: "°C" })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "muted small", children: v })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "room-target", children: [
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: t.target_range && r == null ? `Valves set to ${hl(t.target_range[0])}–${hl(t.target_range[1])}` : "Target" }),
        /* @__PURE__ */ s.jsx(Jo, { value: u, onChange: d })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("ul", { className: "valves", children: t.valve_states.map((h) => /* @__PURE__ */ s.jsx(kp, { valve: h, heating: t.heating_valves.includes(h.entity_id) }, h.entity_id)) }),
    o && /* @__PURE__ */ s.jsx("div", { className: `status ${o.kind}`, children: o.text })
  ] });
}
function kp({ valve: e, heating: t }) {
  const n = e.battery == null ? null : Number(e.battery), r = n != null && !Number.isNaN(n) && n <= gp;
  return /* @__PURE__ */ s.jsxs("li", { className: `valve ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ s.jsx(F, { name: t ? "fire" : "radiator", className: t ? "valve-icon heating" : "valve-icon" }),
    /* @__PURE__ */ s.jsx("span", { className: "valve-name", children: e.name }),
    e.available ? /* @__PURE__ */ s.jsxs("span", { className: "valve-temps", children: [
      hl(e.current_temperature),
      " ",
      /* @__PURE__ */ s.jsxs("span", { className: "muted", children: [
        "→ ",
        hl(e.target)
      ] })
    ] }) : /* @__PURE__ */ s.jsx("span", { className: "chip", children: "Unavailable" }),
    n != null && !Number.isNaN(n) && /* @__PURE__ */ s.jsxs("span", { className: `battery ${r ? "low" : ""}`, title: r ? "Battery low" : "Battery", children: [
      /* @__PURE__ */ s.jsx(F, { name: r ? "battery-alert-variant-outline" : "battery-outline" }),
      " ",
      Math.round(n),
      "%"
    ] })
  ] });
}
function aa({ getHass: e, room: t, onDone: n }) {
  const [r, l] = T.useState(null), [o, i] = T.useState((t == null ? void 0 : t.receiver) ?? ""), [a, u] = T.useState((t == null ? void 0 : t.name) ?? ""), [d, v] = T.useState(new Set((t == null ? void 0 : t.valves) ?? [])), [m, h] = T.useState((t == null ? void 0 : t.sensor) ?? ""), [g, w] = T.useState(!1), [k, M] = T.useState(!1), [p, c] = T.useState("");
  T.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/candidates" }).then(l).catch((S) => c(tt(S)));
  }, [e]);
  const f = ((r == null ? void 0 : r.receivers.length) ?? 0) > 1, x = async (S) => {
    w(!0), c("");
    try {
      await e().callWS(S), n();
    } catch (E) {
      c(tt(E)), w(!1);
    }
  }, y = (S) => v((E) => {
    const L = new Set(E);
    return L.has(S) ? L.delete(S) : L.add(S), L;
  }), C = /* @__PURE__ */ new Map();
  for (const S of (r == null ? void 0 : r.valves) ?? []) C.set(S.area ?? "No area", [...C.get(S.area ?? "No area") ?? [], S]);
  return /* @__PURE__ */ s.jsxs("section", { className: "card room-editor", children: [
    /* @__PURE__ */ s.jsx("h2", { children: t ? `Edit ${t.name}` : "New room" }),
    /* @__PURE__ */ s.jsxs(
      "form",
      {
        className: "stack",
        onSubmit: (S) => {
          S.preventDefault(), x({
            type: "hive_local/rooms/save",
            ...t ? { room_id: t.id } : {},
            name: a,
            valves: [...d],
            sensor: m || null,
            receiver: o || null
          });
        },
        children: [
          /* @__PURE__ */ s.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ s.jsx("span", { children: "Name" }),
            /* @__PURE__ */ s.jsx("input", { id: `room-name-${(t == null ? void 0 : t.id) ?? "new"}`, type: "text", value: a, maxLength: 40, placeholder: "Lounge", onChange: (S) => u(S.target.value) })
          ] }),
          /* @__PURE__ */ s.jsxs("fieldset", { className: "field", children: [
            /* @__PURE__ */ s.jsx("legend", { children: "Hive radiator valves" }),
            !r && !p && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Loading…" }),
            r && !r.valves.length && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "No Hive radiator valves found. Pair them with ZHA or Zigbee2MQTT first." }),
            [...C].map(([S, E]) => /* @__PURE__ */ s.jsxs("div", { className: "checklist", children: [
              /* @__PURE__ */ s.jsx("span", { className: "muted small", children: S }),
              E.map((L) => /* @__PURE__ */ s.jsxs("label", { className: "pick", children: [
                /* @__PURE__ */ s.jsx("input", { type: "checkbox", checked: d.has(L.entity_id), onChange: () => y(L.entity_id) }),
                " ",
                L.name
              ] }, L.entity_id))
            ] }, S))
          ] }),
          /* @__PURE__ */ s.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ s.jsx("span", { children: "Room temperature from" }),
            /* @__PURE__ */ s.jsxs("select", { id: `room-sensor-${(t == null ? void 0 : t.id) ?? "new"}`, value: m, onChange: (S) => h(S.target.value), children: [
              /* @__PURE__ */ s.jsx("option", { value: "", children: "The valves (their average)" }),
              ((r == null ? void 0 : r.sensors) ?? []).map((S) => /* @__PURE__ */ s.jsxs("option", { value: S.entity_id, children: [
                S.name,
                S.area ? ` · ${S.area}` : ""
              ] }, S.entity_id))
            ] })
          ] }),
          f && /* @__PURE__ */ s.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ s.jsx("span", { children: "Heated by" }),
            /* @__PURE__ */ s.jsxs("select", { id: `room-receiver-${(t == null ? void 0 : t.id) ?? "new"}`, value: o, onChange: (S) => i(S.target.value), children: [
              /* @__PURE__ */ s.jsx("option", { value: "", disabled: !0, children: "Choose the receiver for this room's radiators" }),
              r.receivers.map((S) => /* @__PURE__ */ s.jsx("option", { value: S.entry_id, children: S.name }, S.entry_id))
            ] })
          ] }),
          p && /* @__PURE__ */ s.jsx("div", { className: "status error", children: p }),
          /* @__PURE__ */ s.jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ s.jsx("button", { className: "primary", type: "submit", disabled: g || !a.trim() || !d.size || f && !o, children: t ? "Save" : "Add room" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "ghost", onClick: n, disabled: g, children: "Cancel" }),
            /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
            t && (k ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsxs("span", { className: "muted small", children: [
                "Delete ",
                t.name,
                "? The valves aren't changed."
              ] }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "danger", disabled: g, onClick: () => x({ type: "hive_local/rooms/delete", room_id: t.id }), children: "Delete" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "ghost", onClick: () => M(!1), children: "Keep" })
            ] }) : /* @__PURE__ */ s.jsxs("button", { type: "button", className: "danger", onClick: () => M(!0), disabled: g, children: [
              /* @__PURE__ */ s.jsx(F, { name: "delete-outline" }),
              " Delete room"
            ] }))
          ] })
        ]
      }
    )
  ] });
}
const Sp = ["monday", "tuesday", "wednesday", "thursday", "friday"], jp = ["saturday", "sunday"], Np = (e) => e[0].toUpperCase() + e.slice(1, 3), ft = (e) => {
  const [t, n] = e.split(":").map(Number);
  return t * 60 + n;
};
function _p({
  getHass: e,
  device: t,
  channel: n,
  limits: r
}) {
  const [l, o] = T.useState({}), [i, a] = T.useState({}), [u, d] = T.useState("monday"), [v, m] = T.useState({ kind: "idle" }), h = t.entry_id, g = n === "water", w = JSON.stringify(l) !== JSON.stringify(i), k = T.useCallback(async () => {
    m({ kind: "busy", text: "Reading from receiver…" });
    try {
      const N = await e().callWS({
        type: "hive_local/get",
        entry_id: h,
        channel: n
      });
      o(N.schedule), a(N.schedule);
      const _ = Object.keys(N.schedule).length;
      m(
        N.complete ? { kind: "ok", text: "Schedule read from receiver" } : _ ? { kind: "error", text: `Only got ${_}/7 days — try reading again` } : { kind: "error", text: "No reply. On Zigbee2MQTT, check the receiver's friendly name; on ZHA, check the receiver is online." }
      );
    } catch (N) {
      m({ kind: "error", text: tt(N) });
    }
  }, [h, n, e]);
  T.useEffect(() => {
    k();
  }, [k]);
  const M = async () => {
    const N = Object.fromEntries(
      Pr.filter((_) => {
        var D;
        return JSON.stringify(l[_]) !== JSON.stringify(i[_]) && ((D = l[_]) == null ? void 0 : D.length);
      }).map((_) => [_, l[_]])
    );
    if (Object.keys(N).length) {
      m({ kind: "busy", text: "Writing to receiver…" });
      try {
        const _ = await e().callWS({
          type: "hive_local/set",
          entry_id: h,
          channel: n,
          schedule: N
        }), D = { ...l, ..._.schedule };
        o(D), a(D);
        const U = Object.keys(_.schedule).map((G) => G[0].toUpperCase() + G.slice(1, 3));
        m({
          kind: "ok",
          text: `Wrote ${U.join(", ")}. Read back to confirm the receiver kept it.`
        });
      } catch (_) {
        m({ kind: "error", text: tt(_) });
      }
    }
  }, p = l[u] ?? [], c = r.max_transitions, f = (N) => o((_) => ({ ..._, [u]: [...N].sort((D, U) => ft(D.time) - ft(U.time)) })), x = () => {
    const N = p[p.length - 1], _ = N ? Cp(p, ft(N.time) + 60) : "06:00", D = g ? r.water_on : (N == null ? void 0 : N.setpoint) ?? 20;
    f([...p, { time: _, setpoint: D }]);
  }, y = (N) => o((_) => {
    const D = { ..._ };
    for (const U of N) D[U] = p.map((G) => ({ ...G }));
    return D;
  }), C = T.useMemo(() => {
    const N = Object.values(l).flat().map((_) => _.setpoint).filter((_) => _ > r.heat_min);
    return { lo: Math.min(15, ...N), hi: Math.max(24, ...N) };
  }, [l, r.heat_min]), S = Pr[((/* @__PURE__ */ new Date()).getDay() + 6) % 7], E = Ep();
  return /* @__PURE__ */ s.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ s.jsxs("section", { className: `card ${n}`, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title", children: [
          /* @__PURE__ */ s.jsx(F, { name: g ? "water-boiler" : "radiator", className: "title-icon" }),
          /* @__PURE__ */ s.jsxs("div", { children: [
            /* @__PURE__ */ s.jsx("h2", { children: g ? "Hot water schedule" : "Heating schedule" }),
            /* @__PURE__ */ s.jsx("div", { className: "muted small", children: "Stored on the receiver, so it keeps running without HA." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toolbar", children: [
          w && /* @__PURE__ */ s.jsx("span", { className: "chip unsaved", children: "Unsaved changes" }),
          /* @__PURE__ */ s.jsxs("button", { onClick: k, disabled: v.kind === "busy", children: [
            /* @__PURE__ */ s.jsx(F, { name: "download" }),
            " Read"
          ] }),
          /* @__PURE__ */ s.jsxs("button", { className: "primary", onClick: M, disabled: !w || v.kind === "busy", children: [
            /* @__PURE__ */ s.jsx(F, { name: "upload" }),
            " Write to receiver"
          ] })
        ] })
      ] }),
      v.text && /* @__PURE__ */ s.jsx("div", { className: `status ${v.kind}`, children: v.text }),
      /* @__PURE__ */ s.jsxs("div", { className: "week", children: [
        Pr.map((N) => /* @__PURE__ */ s.jsxs("button", { className: `row ${N === u ? "selected" : ""}`, onClick: () => d(N), children: [
          /* @__PURE__ */ s.jsx("span", { className: `day ${N === S ? "today" : ""}`, children: Np(N) }),
          /* @__PURE__ */ s.jsx(
            zp,
            {
              transitions: l[N],
              isWater: g,
              limits: r,
              range: C,
              now: N === S ? E : null
            }
          )
        ] }, N)),
        /* @__PURE__ */ s.jsxs("div", { className: "row hours-row", children: [
          /* @__PURE__ */ s.jsx("span", { className: "day" }),
          /* @__PURE__ */ s.jsx("div", { className: "hours", children: [0, 3, 6, 9, 12, 15, 18, 21, 24].map((N) => /* @__PURE__ */ s.jsx("span", { style: { left: `${N / 24 * 100}%` }, children: String(N).padStart(2, "0") }, N)) })
        ] })
      ] }),
      !g && /* @__PURE__ */ s.jsxs("div", { className: "legend", children: [
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Cooler" }),
        /* @__PURE__ */ s.jsx("span", { className: "legend-bar" }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Warmer" }),
        /* @__PURE__ */ s.jsx("span", { className: "legend-off" }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Off (1°)" })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("section", { className: "card", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ s.jsx("h2", { children: u[0].toUpperCase() + u.slice(1) }),
        /* @__PURE__ */ s.jsxs("span", { className: "chip", children: [
          p.length,
          "/",
          c,
          " events"
        ] })
      ] }),
      p.length === 0 && /* @__PURE__ */ s.jsx("p", { className: "muted", children: "No events for this day yet." }),
      /* @__PURE__ */ s.jsx("div", { className: "events", children: p.map((N, _) => /* @__PURE__ */ s.jsxs("div", { className: "transition", children: [
        /* @__PURE__ */ s.jsx(
          "span",
          {
            className: "swatch",
            style: { background: g ? N.setpoint >= r.water_on ? "var(--hl-water)" : "var(--hl-off-fill)" : Nc(N.setpoint, C, r) }
          }
        ),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            type: "time",
            value: N.time,
            onChange: (D) => f(p.map((U, G) => G === _ ? { ...U, time: D.target.value } : U))
          }
        ),
        g ? /* @__PURE__ */ s.jsxs("div", { className: "segmented", children: [
          ["on", "off"].map((D) => {
            const U = D === "on" ? r.water_on : r.water_off;
            return /* @__PURE__ */ s.jsx(
              "button",
              {
                className: N.setpoint === U ? "on" : "",
                onClick: () => f(p.map((G, rt) => rt === _ ? { ...G, setpoint: U } : G)),
                children: D === "on" ? "On" : "Off"
              },
              D
            );
          }),
          N.setpoint !== r.water_on && N.setpoint !== r.water_off && /* @__PURE__ */ s.jsxs("span", { className: "muted raw", title: "Value read from the receiver doesn't match WATER_ON/WATER_OFF in const.py", children: [
            N.setpoint,
            "°?"
          ] })
        ] }) : /* @__PURE__ */ s.jsxs("div", { className: "stepper", children: [
          /* @__PURE__ */ s.jsx("button", { className: "round", onClick: () => L(_, -0.5), "aria-label": "Lower", children: /* @__PURE__ */ s.jsx(F, { name: "minus" }) }),
          /* @__PURE__ */ s.jsx("span", { className: "stepper-value", children: N.setpoint <= r.heat_min ? "Off" : `${N.setpoint.toFixed(1)}°` }),
          /* @__PURE__ */ s.jsx("button", { className: "round", onClick: () => L(_, 0.5), "aria-label": "Raise", children: /* @__PURE__ */ s.jsx(F, { name: "plus" }) })
        ] }),
        /* @__PURE__ */ s.jsx("button", { className: "round danger", onClick: () => f(p.filter((D, U) => U !== _)), "aria-label": "Remove", children: /* @__PURE__ */ s.jsx(F, { name: "delete-outline" }) })
      ] }, _)) }),
      /* @__PURE__ */ s.jsxs("div", { className: "actions", children: [
        /* @__PURE__ */ s.jsxs("button", { onClick: x, disabled: p.length >= c, children: [
          /* @__PURE__ */ s.jsx(F, { name: "plus" }),
          " Add event"
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Copy this day to" }),
        /* @__PURE__ */ s.jsxs("div", { className: "segmented", children: [
          /* @__PURE__ */ s.jsx("button", { onClick: () => y(Sp), disabled: !p.length, children: "Weekdays" }),
          /* @__PURE__ */ s.jsx("button", { onClick: () => y(jp), disabled: !p.length, children: "Weekend" }),
          /* @__PURE__ */ s.jsx("button", { onClick: () => y([...Pr]), disabled: !p.length, children: "All" })
        ] })
      ] })
    ] })
  ] });
  function L(N, _) {
    f(
      p.map(
        (D, U) => U === N ? { ...D, setpoint: Math.min(r.heat_max, Math.max(r.heat_min, Math.round((D.setpoint + _) * 2) / 2)) } : D
      )
    );
  }
}
function Cp(e, t) {
  const n = new Set(e.map((l) => ft(l.time)));
  let r = Math.min(t, 23 * 60 + 30);
  for (; n.has(r) && r < 1439; ) r += 15;
  return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function Ep() {
  const e = () => {
    const r = /* @__PURE__ */ new Date();
    return r.getHours() * 60 + r.getMinutes();
  }, [t, n] = T.useState(e);
  return T.useEffect(() => {
    const r = setInterval(() => n(e()), 6e4);
    return () => clearInterval(r);
  }, []), t;
}
function Nc(e, t, n) {
  if (e <= n.heat_min) return "var(--hl-off-fill)";
  const r = Math.min(1, Math.max(0, (e - t.lo) / Math.max(1, t.hi - t.lo)));
  return `hsl(${Math.round(42 - 34 * r)} ${Math.round(88 + 4 * r)}% ${Math.round(64 - 14 * r)}%)`;
}
function zp({
  transitions: e,
  isWater: t,
  limits: n,
  range: r,
  now: l
}) {
  const o = l != null && /* @__PURE__ */ s.jsx("i", { className: "now", style: { left: `${l / 1440 * 100}%` } });
  if (!(e != null && e.length)) return /* @__PURE__ */ s.jsx("div", { className: "timeline empty", children: o });
  const i = [...e].sort((u, d) => ft(u.time) - ft(d.time)), a = [{ time: "00:00", setpoint: i[i.length - 1].setpoint }, ...i];
  return /* @__PURE__ */ s.jsxs("div", { className: "timeline", children: [
    a.map((u, d) => {
      const v = ft(u.time), m = d + 1 < a.length ? ft(a[d + 1].time) : 1440;
      if (m <= v) return null;
      const h = t ? u.setpoint < n.water_on : u.setpoint <= n.heat_min;
      return /* @__PURE__ */ s.jsx(
        "span",
        {
          className: h ? "off" : "",
          title: `${u.time} → ${t ? h ? "Off" : "On" : h ? "Off" : `${u.setpoint}°`}`,
          style: {
            left: `${v / 1440 * 100}%`,
            width: `${(m - v) / 1440 * 100}%`,
            background: h ? void 0 : t ? "var(--hl-water)" : Nc(u.setpoint, r, n)
          },
          children: !t && !h && m - v >= 120 ? `${u.setpoint}°` : ""
        },
        d
      );
    }),
    o
  ] });
}
const Pp = [
  { id: 1, label: "Today" },
  { id: 7, label: "7 days" },
  { id: 30, label: "30 days" }
], Mp = {
  1: "yesterday by this time",
  7: "the 7 days before",
  30: "the 30 days before"
}, Tp = 5 * 6e4, Ye = (e) => {
  const t = Math.round(e);
  return t < 60 ? `${t}m` : t % 60 ? `${Math.floor(t / 60)}h ${t % 60}m` : `${t / 60}h`;
}, Tn = (e) => new Date(e * 1e3).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), _c = (e) => new Date(e * 1e3).toLocaleDateString([], { weekday: "short" }), Cc = (e) => new Date(e * 1e3).toLocaleDateString([], { day: "numeric", month: "short" }), Ec = (e) => new Date(e * 1e3).toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });
function Lp({ getHass: e, devices: t }) {
  const [n, r] = T.useState(7);
  return /* @__PURE__ */ s.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "rooms-head", children: [
      /* @__PURE__ */ s.jsx("p", { className: "muted", children: "How long the boiler ran, how often it fired up and how warm it was, from Home Assistant's history." }),
      /* @__PURE__ */ s.jsx("div", { className: "segmented", role: "radiogroup", "aria-label": "Period", children: Pp.map((l) => /* @__PURE__ */ s.jsx("button", { role: "radio", "aria-checked": l.id === n, className: l.id === n ? "on" : "", onClick: () => r(l.id), children: l.label }, l.id)) })
    ] }),
    t.flatMap(
      (l) => l.channels.map((o) => /* @__PURE__ */ s.jsx($p, { getHass: e, device: l, channel: o, period: n, showDevice: t.length > 1 }, `${l.entry_id}-${o}`))
    )
  ] });
}
function $p({
  getHass: e,
  device: t,
  channel: n,
  period: r,
  showDevice: l
}) {
  const [o, i] = T.useState(null), [a, u] = T.useState(""), [d, v] = T.useState(!0), m = n === "water", h = T.useCallback(() => {
    e().callWS({ type: "hive_local/stats", entry_id: t.entry_id, channel: n, days: r }).then((w) => {
      i(w), u("");
    }).catch((w) => u(tt(w))).finally(() => v(!1));
  }, [e, t.entry_id, n, r]);
  T.useEffect(() => {
    v(!0), i(null), h();
    const w = setInterval(h, Tp);
    return () => clearInterval(w);
  }, [h]);
  const g = (o == null ? void 0 : o.period) === r ? o : null;
  return /* @__PURE__ */ s.jsxs("section", { className: `card stats ${n}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ s.jsx(F, { name: m ? "water-boiler" : "radiator", className: "title-icon" }),
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsx("h2", { children: Xi[n] }),
          l && /* @__PURE__ */ s.jsx("div", { className: "muted small", children: t.name })
        ] })
      ] }),
      d && /* @__PURE__ */ s.jsx("span", { className: "chip", children: "Loading…" })
    ] }),
    a && /* @__PURE__ */ s.jsx("div", { className: "status error", children: a }),
    g && !g.has_data && /* @__PURE__ */ s.jsxs("div", { className: "status", children: [
      "No history for ",
      /* @__PURE__ */ s.jsx("code", { children: g.entity_id }),
      " in this period yet. Stats build up as Home Assistant records the receiver."
    ] }),
    (g == null ? void 0 : g.has_data) && /* @__PURE__ */ s.jsx(Rp, { data: g, water: m })
  ] });
}
function Rp({ data: e, water: t }) {
  const n = (e.end - e.start) / 60, r = e.previous, l = !!(r != null && r.has_data) && r.known_minutes >= 0.5 * e.known_minutes, o = l ? e.heating_minutes - r.heating_minutes : 0, i = e.known_minutes ? e.heating_minutes / e.known_minutes : 0, a = e.temperature, u = t ? "Hot water on" : "Boiler on";
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsxs("div", { className: "kpis", children: [
      /* @__PURE__ */ s.jsx(Mr, { label: u, value: Ye(e.heating_minutes), children: l ? /* @__PURE__ */ s.jsxs("span", { className: "delta", children: [
        /* @__PURE__ */ s.jsx(F, { name: Math.abs(o) < 1 ? "approximately-equal" : o > 0 ? "arrow-up" : "arrow-down" }),
        Math.abs(o) < 1 ? "Same as" : `${Ye(Math.abs(o))} ${o > 0 ? "more" : "less"} than`,
        " ",
        Mp[e.period]
      ] }) : `${Math.round(i * 100)}% of the time` }),
      /* @__PURE__ */ s.jsx(Mr, { label: "Times it fired up", value: String(e.cycles), children: e.cycles ? `About ${Ye(e.heating_minutes / e.cycles)} each` : "Not at all" }),
      !t && /* @__PURE__ */ s.jsxs(Mr, { label: "Average temperature", value: a.avg != null ? `${a.avg.toFixed(1)}°` : "–", children: [
        a.min != null && a.max != null ? `${a.min.toFixed(1)}° to ${a.max.toFixed(1)}°` : "No readings",
        e.target_avg != null && ` · target ${e.target_avg.toFixed(1)}°`
      ] }),
      /* @__PURE__ */ s.jsx(Mr, { label: "Boosts", value: String(e.boosts), children: e.mode_minutes.boost ? `${Ye(e.mode_minutes.boost)} boosting` : "None" })
    ] }),
    e.known_minutes < 0.9 * n && /* @__PURE__ */ s.jsxs("div", { className: "status small", children: [
      "History covers ",
      Ye(e.known_minutes),
      " of this period. Home Assistant's recorder keeps 10 days unless",
      " ",
      /* @__PURE__ */ s.jsx("code", { children: "purge_keep_days" }),
      " is raised, and nothing is recorded while the receiver is unavailable."
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "stats-block", children: [
      /* @__PURE__ */ s.jsx("h3", { children: t ? "When it was on" : "Temperature and heating" }),
      /* @__PURE__ */ s.jsx(Ip, { series: e.series, period: e.period, now: e.end, water: t })
    ] }),
    e.period > 1 && /* @__PURE__ */ s.jsxs("div", { className: "stats-block", children: [
      /* @__PURE__ */ s.jsx("h3", { children: t ? "On per day" : "Boiler on per day" }),
      /* @__PURE__ */ s.jsx(Ap, { days: e.days, period: e.period, water: t })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "stats-block", children: [
      /* @__PURE__ */ s.jsx("h3", { children: "Time in each mode" }),
      /* @__PURE__ */ s.jsx(Up, { minutes: e.mode_minutes, total: e.known_minutes, water: t })
    ] })
  ] });
}
function Mr({ label: e, value: t, children: n }) {
  return /* @__PURE__ */ s.jsxs("div", { className: "kpi", children: [
    /* @__PURE__ */ s.jsx("div", { className: "kpi-label", children: e }),
    /* @__PURE__ */ s.jsx("div", { className: "kpi-value", children: t }),
    /* @__PURE__ */ s.jsx("div", { className: "kpi-sub", children: n })
  ] });
}
function zc() {
  const e = T.useRef(null), [t, n] = T.useState(0);
  return T.useLayoutEffect(() => {
    const r = e.current;
    if (!r) return;
    n(r.clientWidth);
    const l = new ResizeObserver(([o]) => n(o.contentRect.width));
    return l.observe(r), () => l.disconnect();
  }, []), [e, t];
}
const X = { left: 34, right: 10, top: 10 };
function Op(e, t, n) {
  return n === 1 ? `${Tn(e.t)}–${Tn(e.t + t)}` : `${Ec(e.t)}, ${Tn(e.t)}–${Tn(e.t + t)}`;
}
function Dp(e, t, n) {
  const r = [];
  if (n === 1) {
    for (let i = 0; i <= 24; i += 6) r.push({ t: e + i * 3600, label: i === 24 ? "" : Tn(e + i * 3600) });
    return r;
  }
  const l = Math.round((t - e) / 86400), o = n === 7 ? 1 : 5;
  for (let i = 0; i < l; i += o) {
    const a = e + i * 86400;
    r.push({ t: a, label: n === 7 ? _c(a) : Cc(a) });
  }
  return r;
}
function Fp(e) {
  if (!e.length) return [15, 25, 2];
  let t = Math.floor(Math.min(...e) - 0.5), n = Math.ceil(Math.max(...e) + 0.5);
  if (n - t < 4) {
    const l = (n + t) / 2;
    t = Math.floor(l - 2), n = Math.ceil(l + 2);
  }
  const r = n - t > 10 ? 4 : n - t > 5 ? 2 : 1;
  return t = Math.floor(t / r) * r, n = Math.ceil(n / r) * r, [t, n, r];
}
function Ip({ series: e, period: t, now: n, water: r }) {
  const [l, o] = zc(), [i, a] = T.useState(null);
  if (!e.length) return null;
  const u = e.length > 1 ? e[1].t - e[0].t : 3600, d = e[0].t, v = e[e.length - 1].t + u, m = r ? 0 : 170, h = X.top + m + (r ? 0 : 10), g = r ? 36 : 14, w = h + g + 24, k = Math.max(0, o - X.left - X.right), M = (_) => X.left + (_ - d) / (v - d) * k, p = r ? [] : e.flatMap((_) => [_.current, _.target]).filter((_) => _ != null), [c, f, x] = Fp(p), y = (_) => X.top + m - (_ - c) / (f - c) * m, C = [];
  for (let _ = c; _ <= f; _ += x) C.push(_);
  const S = (_, D) => {
    let U = "", G = !1;
    return e.forEach((rt) => {
      const Ct = _(rt);
      if (Ct == null) {
        G = !1;
        return;
      }
      D ? U += `${G ? "L" : "M"}${M(rt.t)},${y(Ct)}H${M(rt.t + u)}` : U += `${G ? "L" : "M"}${M(rt.t + u / 2)},${y(Ct)}`, G = !0;
    }), U;
  }, E = (_) => {
    const D = _.currentTarget.getBoundingClientRect(), U = d + (_.clientX - D.left - X.left) / k * (v - d), G = Math.floor((U - d) / u);
    a(G >= 0 && G < e.length ? G : null);
  }, L = i != null ? e[i] : null, N = r ? "var(--hl-water)" : "var(--hl-heat)";
  return /* @__PURE__ */ s.jsxs("div", { className: "chart", ref: l, children: [
    !r && /* @__PURE__ */ s.jsxs("div", { className: "chart-legend", "aria-hidden": "true", children: [
      /* @__PURE__ */ s.jsxs("span", { children: [
        /* @__PURE__ */ s.jsx("i", { className: "key line" }),
        " Temperature"
      ] }),
      /* @__PURE__ */ s.jsxs("span", { children: [
        /* @__PURE__ */ s.jsx("i", { className: "key dashed" }),
        " Target"
      ] }),
      /* @__PURE__ */ s.jsxs("span", { children: [
        /* @__PURE__ */ s.jsx("i", { className: "key band" }),
        " Heating"
      ] })
    ] }),
    o > 0 && /* @__PURE__ */ s.jsxs(
      "svg",
      {
        width: o,
        height: w,
        onPointerMove: E,
        onPointerLeave: () => a(null),
        role: "img",
        "aria-label": r ? "When hot water was on" : "Temperature, target and heating over time",
        children: [
          !r && C.map((_) => /* @__PURE__ */ s.jsxs("g", { children: [
            /* @__PURE__ */ s.jsx("line", { className: "grid-line", x1: X.left, x2: X.left + k, y1: y(_), y2: y(_) }),
            /* @__PURE__ */ s.jsxs("text", { className: "axis", x: X.left - 6, y: y(_) + 4, textAnchor: "end", children: [
              _,
              "°"
            ] })
          ] }, _)),
          Dp(d, v, t).map(({ t: _, label: D }) => /* @__PURE__ */ s.jsxs("g", { children: [
            /* @__PURE__ */ s.jsx("line", { className: "grid-line", x1: M(_), x2: M(_), y1: X.top, y2: h + g }),
            D && /* @__PURE__ */ s.jsx("text", { className: "axis", x: M(_) + 3, y: h + g + 16, children: D })
          ] }, _)),
          /* @__PURE__ */ s.jsx("rect", { className: "strip-bg", x: X.left, y: h, width: k, height: g, rx: 4 }),
          e.map(
            (_) => _.heating ? /* @__PURE__ */ s.jsx(
              "rect",
              {
                x: Math.floor(M(_.t)),
                y: h,
                width: Math.max(1, Math.ceil(M(_.t + u)) - Math.floor(M(_.t))),
                height: g,
                fill: N,
                opacity: 0.2 + 0.8 * _.heating
              },
              _.t
            ) : null
          ),
          r && /* @__PURE__ */ s.jsx("text", { className: "axis", x: X.left - 6, y: h + g / 2 + 4, textAnchor: "end", children: "On" }),
          !r && /* @__PURE__ */ s.jsx("path", { className: "target-line", d: S((_) => _.target, !0) }),
          !r && /* @__PURE__ */ s.jsx("path", { className: "temp-line", d: S((_) => _.current, !1) }),
          n < v && /* @__PURE__ */ s.jsx("line", { className: "now-line", x1: M(n), x2: M(n), y1: X.top, y2: h + g }),
          L && /* @__PURE__ */ s.jsxs("g", { className: "crosshair", children: [
            /* @__PURE__ */ s.jsx("line", { x1: M(L.t + u / 2), x2: M(L.t + u / 2), y1: X.top, y2: h + g }),
            !r && L.current != null && /* @__PURE__ */ s.jsx("circle", { cx: M(L.t + u / 2), cy: y(L.current), r: 4.5 })
          ] })
        ]
      }
    ),
    L && /* @__PURE__ */ s.jsxs("div", { className: "tooltip", style: { left: Math.min(Math.max(M(L.t + u / 2), 90), o - 90) }, children: [
      /* @__PURE__ */ s.jsx("div", { className: "tooltip-title", children: Op(L, u, t) }),
      L.heating == null ? /* @__PURE__ */ s.jsx("div", { children: "No data" }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        !r && /* @__PURE__ */ s.jsxs("div", { children: [
          "Temperature ",
          /* @__PURE__ */ s.jsx("b", { children: L.current != null ? `${L.current.toFixed(1)}°` : "–" })
        ] }),
        !r && /* @__PURE__ */ s.jsxs("div", { children: [
          "Target ",
          /* @__PURE__ */ s.jsx("b", { children: L.target != null ? `${L.target.toFixed(1)}°` : "Off" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { children: [
          r ? "On" : "Heating",
          " ",
          /* @__PURE__ */ s.jsx("b", { children: Ye(L.heating * u / 60) })
        ] })
      ] })
    ] })
  ] });
}
function Ap({ days: e, period: t, water: n }) {
  const [r, l] = zc(), [o, i] = T.useState(null), a = 150, u = 112, d = 8, v = Math.max(0, l - X.left - X.right), m = Math.max(60, ...e.map((f) => f.heating_minutes ?? 0)), h = m > 12 * 60 ? 240 : m > 6 * 60 ? 120 : m > 3 * 60 ? 60 : 30, g = Math.ceil(m / h) * h, w = (f) => d + u - f / g * u, k = v / e.length, M = Math.min(8, Math.max(2, k * 0.25)), p = [];
  for (let f = 0; f <= g; f += h) p.push(f);
  const c = o != null ? e[o] : null;
  return /* @__PURE__ */ s.jsxs("div", { className: "chart", ref: r, children: [
    l > 0 && /* @__PURE__ */ s.jsxs("svg", { width: l, height: a, role: "img", "aria-label": n ? "Hot water on per day" : "Boiler on per day", onPointerLeave: () => i(null), children: [
      p.map((f) => /* @__PURE__ */ s.jsxs("g", { children: [
        /* @__PURE__ */ s.jsx("line", { className: f ? "grid-line" : "baseline", x1: X.left, x2: X.left + v, y1: w(f), y2: w(f) }),
        /* @__PURE__ */ s.jsx("text", { className: "axis", x: X.left - 6, y: w(f) + 4, textAnchor: "end", children: f ? `${f / 60}h` : "0" })
      ] }, f)),
      e.map((f, x) => {
        const y = Math.max(1, Math.min(44, k - M)), C = X.left + x * k + (k - y) / 2, S = f.heating_minutes ?? 0, E = w(S), L = d + u - E, N = Math.min(4, y / 2, L), _ = t === 7 || x % 5 === 0;
        return /* @__PURE__ */ s.jsxs("g", { onPointerEnter: () => i(x), children: [
          /* @__PURE__ */ s.jsx("rect", { x: X.left + x * k, y: d, width: k, height: u, fill: "transparent" }),
          L > 0 && /* @__PURE__ */ s.jsx(
            "path",
            {
              className: `bar ${o === x ? "hover" : ""}`,
              style: { fill: n ? "var(--hl-water)" : "var(--hl-heat)" },
              d: `M${C},${d + u}V${E + N}Q${C},${E} ${C + N},${E}H${C + y - N}Q${C + y},${E} ${C + y},${E + N}V${d + u}Z`
            }
          ),
          _ && /* @__PURE__ */ s.jsx("text", { className: "axis", x: C + y / 2, y: a - 10, textAnchor: "middle", children: t === 7 ? _c(f.start) : Cc(f.start) })
        ] }, f.start);
      })
    ] }),
    c && /* @__PURE__ */ s.jsxs("div", { className: "tooltip", style: { left: Math.min(Math.max(X.left + (o + 0.5) * k, 80), l - 80) }, children: [
      /* @__PURE__ */ s.jsx("div", { className: "tooltip-title", children: Ec(c.start) }),
      c.heating_minutes == null ? /* @__PURE__ */ s.jsx("div", { children: "No data" }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsxs("div", { children: [
          n ? "On" : "Boiler on",
          " ",
          /* @__PURE__ */ s.jsx("b", { children: Ye(c.heating_minutes) })
        ] }),
        !n && c.temp_avg != null && /* @__PURE__ */ s.jsxs("div", { children: [
          "Average ",
          /* @__PURE__ */ s.jsxs("b", { children: [
            c.temp_avg.toFixed(1),
            "°"
          ] })
        ] }),
        c.known_minutes < 1380 && /* @__PURE__ */ s.jsxs("div", { className: "muted small", children: [
          "History for ",
          Ye(c.known_minutes)
        ] })
      ] })
    ] })
  ] });
}
function Up({ minutes: e, total: t, water: n }) {
  const r = [
    { id: "schedule", label: "Schedule", icon: "calendar-clock" },
    { id: "manual", label: n ? "Always on" : "Manual", icon: "hand-back-right" },
    { id: "boost", label: "Boost", icon: "rocket-launch" },
    { id: "off", label: "Off", icon: "power" }
  ];
  return /* @__PURE__ */ s.jsx("div", { className: "modes", children: r.map((l) => {
    const o = t ? e[l.id] / t : 0;
    return /* @__PURE__ */ s.jsxs("div", { className: "mode-row", children: [
      /* @__PURE__ */ s.jsx(F, { name: l.icon }),
      /* @__PURE__ */ s.jsx("span", { className: "mode-name", children: l.label }),
      /* @__PURE__ */ s.jsx("span", { className: "mode-bar", children: /* @__PURE__ */ s.jsx("i", { style: { width: `${o * 100}%` } }) }),
      /* @__PURE__ */ s.jsx("span", { className: "mode-time", children: Ye(e[l.id]) }),
      /* @__PURE__ */ s.jsxs("span", { className: "mode-share", children: [
        Math.round(o * 100),
        "%"
      ] })
    ] }, l.id);
  }) });
}
const Bp = [
  { id: "overview", label: "Overview", icon: "view-dashboard-outline" },
  { id: "rooms", label: "Rooms", icon: "home-thermometer-outline" },
  { id: "heat", label: "Heating", icon: "radiator" },
  { id: "water", label: "Hot water", icon: "water-boiler" },
  { id: "controls", label: "Boost & mode", icon: "tune-variant" },
  { id: "stats", label: "Stats", icon: "chart-box-outline" }
];
function Hp({ getHass: e, narrow: t, onToggleMenu: n }) {
  const [r, l] = T.useState([]), [o, i] = T.useState(null), [a, u] = T.useState({}), [d, v] = T.useState("overview"), [m, h] = T.useState(null), [g, w] = T.useState("");
  T.useEffect(() => {
    e().callWS({ type: "hive_local/devices" }).then((f) => {
      l(f.devices), i(f.limits);
    }).catch((f) => w(tt(f)));
    const c = e().connection.subscribeMessage(
      (f) => u(f.status),
      { type: "hive_local/subscribe" }
    );
    return () => {
      c.then((f) => f()).catch(() => {
      });
    };
  }, [e]);
  const k = (c, f, x) => {
    if (c.length <= 1)
      return c.map((C) => /* @__PURE__ */ s.jsxs("section", { className: "receiver-section", children: [
        r.length > 1 && /* @__PURE__ */ s.jsx("div", { className: "receiver-crumb", children: /* @__PURE__ */ s.jsx("h2", { children: C.name }) }),
        x(C)
      ] }, C.entry_id));
    const y = c.find((C) => C.entry_id === m);
    return y ? /* @__PURE__ */ s.jsxs("section", { className: "receiver-section", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "receiver-crumb", children: [
        /* @__PURE__ */ s.jsxs("button", { className: "ghost", onClick: () => h(null), children: [
          /* @__PURE__ */ s.jsx(F, { name: "chevron-left" }),
          " All receivers"
        ] }),
        /* @__PURE__ */ s.jsx("h2", { children: y.name })
      ] }),
      x(y)
    ] }) : /* @__PURE__ */ s.jsx(vp, { devices: c, status: a, channel: f, onOpen: h });
  }, M = r.some((c) => c.channels.includes("water")), p = Bp.filter((c) => c.id !== "water" || M);
  return /* @__PURE__ */ s.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ s.jsx("header", { children: /* @__PURE__ */ s.jsxs("div", { className: "toolbar-row", children: [
      t && /* @__PURE__ */ s.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ s.jsx(F, { name: "menu" }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ s.jsx(la, {}),
        /* @__PURE__ */ s.jsx("h1", { children: "Hive Local" })
      ] }),
      /* @__PURE__ */ s.jsx("nav", { className: "tabs", role: "tablist", children: p.map((c) => /* @__PURE__ */ s.jsxs("button", { role: "tab", "aria-selected": c.id === d, className: c.id === d ? "on" : "", onClick: () => v(c.id), children: [
        /* @__PURE__ */ s.jsx(F, { name: c.icon }),
        /* @__PURE__ */ s.jsx("span", { children: c.label })
      ] }, c.id)) })
    ] }) }),
    /* @__PURE__ */ s.jsxs("main", { children: [
      g && /* @__PURE__ */ s.jsx("div", { className: "status error", children: g }),
      !r.length && !g && /* @__PURE__ */ s.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ s.jsx(la, { size: 56 }),
        /* @__PURE__ */ s.jsx("p", { children: "No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local." })
      ] }),
      d === "overview" && /* @__PURE__ */ s.jsx(dp, { getHass: e, devices: r, status: a, onOpen: (c) => {
        v("controls"), h(c);
      } }),
      d === "rooms" && r.length > 0 && /* @__PURE__ */ s.jsx(yp, { getHass: e }),
      (d === "heat" || d === "water") && o && k(
        r.filter((c) => c.channels.includes(d)),
        d,
        (c) => /* @__PURE__ */ s.jsx(_p, { getHass: e, device: c, channel: d, limits: o }, `${c.entry_id}-${d}`)
      ),
      d === "stats" && r.length > 0 && /* @__PURE__ */ s.jsx(Lp, { getHass: e, devices: r }),
      d === "controls" && o && k(r, "heat", (c) => /* @__PURE__ */ s.jsx(op, { getHass: e, device: c, limits: o, status: a[c.entry_id] ?? {} }))
    ] })
  ] });
}
const Wp = (
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

/* Stats */
.stats { gap: 18px; }
.kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 10px; }
.kpi { padding: 12px 14px; border-radius: 12px; background: var(--hl-soft); display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.kpi-label { font-size: 13px; color: var(--secondary-text-color); }
.kpi-value { font-size: 28px; font-weight: 400; font-variant-numeric: tabular-nums; line-height: 1.2; }
.kpi-sub { font-size: 12px; color: var(--secondary-text-color); }
.delta { display: inline-flex; align-items: center; gap: 2px; }
.delta .icon-wrap { --mdc-icon-size: 14px; }
.stats-block { display: flex; flex-direction: column; gap: 10px; }
.stats-block h3 { margin: 0; }
.chart { position: relative; width: 100%; }
.chart svg { display: block; overflow: visible; touch-action: pan-y; }
.chart .axis { font-size: 11px; fill: var(--secondary-text-color); font-variant-numeric: tabular-nums; }
.chart .grid-line { stroke: var(--divider-color); stroke-width: 1; opacity: .7; }
.chart .baseline { stroke: var(--divider-color); stroke-width: 1; }
.chart .strip-bg { fill: var(--hl-soft); }
.chart .temp-line { fill: none; stroke: var(--primary-text-color); stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }
.chart .target-line { fill: none; stroke: var(--hl-heat); stroke-width: 2; stroke-dasharray: 5 4; opacity: .9; }
.chart .now-line { stroke: var(--secondary-text-color); stroke-width: 1; stroke-dasharray: 2 3; }
.chart .crosshair line { stroke: var(--secondary-text-color); stroke-width: 1; }
.chart .crosshair circle { fill: var(--primary-text-color); stroke: var(--card-background-color); stroke-width: 2; }
.chart .bar { transition: opacity .15s; }
.chart .bar.hover { opacity: .75; }
.chart-legend { display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: 12px; color: var(--secondary-text-color); margin-bottom: 6px; }
.chart-legend span { display: inline-flex; align-items: center; gap: 6px; }
.key { display: inline-block; width: 18px; height: 0; border-top: 2px solid var(--primary-text-color); }
.key.dashed { border-top: 2px dashed var(--hl-heat); }
.key.band { height: 10px; border: 0; border-radius: 3px; background: var(--hl-heat); }
.tooltip { position: absolute; top: 0; transform: translate(-50%, -100%); margin-top: -6px; pointer-events: none; z-index: 1; background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 10px; box-shadow: 0 4px 14px rgba(0,0,0,.14); padding: 8px 10px; font-size: 12px; line-height: 1.5; white-space: nowrap; }
.tooltip-title { font-weight: 500; margin-bottom: 2px; }
.tooltip b { font-weight: 500; font-variant-numeric: tabular-nums; margin-left: 4px; }
.modes { display: flex; flex-direction: column; gap: 6px; }
.mode-row { display: grid; grid-template-columns: 20px 84px 1fr 64px 40px; align-items: center; gap: 10px; font-size: 14px; }
.mode-row .icon-wrap { --mdc-icon-size: 18px; color: var(--secondary-text-color); }
.mode-bar { height: 8px; border-radius: 4px; background: var(--hl-soft); overflow: hidden; }
.mode-bar i { display: block; height: 100%; border-radius: 4px; background: var(--hl-accent); }
.mode-time, .mode-share { text-align: right; font-variant-numeric: tabular-nums; }
.mode-share { color: var(--secondary-text-color); font-size: 12px; }
code { font-size: 12px; padding: 1px 5px; border-radius: 5px; background: var(--hl-soft); }

@media (max-width: 600px) {
  main { padding: 12px 8px 24px; gap: 12px; }
  .card { padding: 14px; }
  .grid { grid-template-columns: 1fr; }
  .mode-grid { grid-template-columns: 1fr; }
  .mode-tile { flex-direction: row; align-items: center; gap: 10px; }
  .mode-tile .icon-wrap { margin: 0; }
  .mode-tile .small { margin-left: auto; text-align: right; }
  /* Labels always visible on phones; drop the icons to make room. */
  /* Phones: the tabs get their own row and scroll sideways if they still don't fit. */
  .tabs { gap: 0; flex: 1 1 100%; min-width: 0; padding: 0 0 8px; margin: 0 -10px; }
  .tabs button { padding: 0 7px; height: 30px; font-size: 12.5px; letter-spacing: 0; }
  .mode-row { grid-template-columns: 18px 72px 1fr 56px; }
  .mode-share { display: none; }
  .tabs .icon-wrap { display: none; }
}
`
);
class Vp extends HTMLElement {
  constructor() {
    super(...arguments);
    dr(this, "_hass");
    dr(this, "_narrow", !1);
    dr(this, "_root");
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
      r.textContent = Wp;
      const l = document.createElement("div");
      n.append(r, l), this._root = kc(l);
    }
    this._render();
  }
  disconnectedCallback() {
    var n, r;
    (n = this._root) == null || n.unmount(), this._root = void 0, (r = this.shadowRoot) == null || r.replaceChildren();
  }
  _render() {
    !this._root || !this._hass || this._root.render(
      /* @__PURE__ */ s.jsx(
        Hp,
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
customElements.get("hive-local-panel") || customElements.define("hive-local-panel", Vp);
