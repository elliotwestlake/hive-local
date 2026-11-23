var zc = Object.defineProperty;
var Pc = (e, t, n) => t in e ? zc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var pr = (e, t, n) => Pc(e, typeof t != "symbol" ? t + "" : t, n);
var ss = { exports: {} }, gl = {}, us = { exports: {} }, I = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ar = Symbol.for("react.element"), Tc = Symbol.for("react.portal"), $c = Symbol.for("react.fragment"), Lc = Symbol.for("react.strict_mode"), Mc = Symbol.for("react.profiler"), Rc = Symbol.for("react.provider"), Oc = Symbol.for("react.context"), Fc = Symbol.for("react.forward_ref"), Dc = Symbol.for("react.suspense"), Ic = Symbol.for("react.memo"), Ac = Symbol.for("react.lazy"), Xi = Symbol.iterator;
function Uc(e) {
  return e === null || typeof e != "object" ? null : (e = Xi && e[Xi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var cs = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ds = Object.assign, fs = {};
function xn(e, t, n) {
  this.props = e, this.context = t, this.refs = fs, this.updater = n || cs;
}
xn.prototype.isReactComponent = {};
xn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
xn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ps() {
}
ps.prototype = xn.prototype;
function ti(e, t, n) {
  this.props = e, this.context = t, this.refs = fs, this.updater = n || cs;
}
var ni = ti.prototype = new ps();
ni.constructor = ti;
ds(ni, xn.prototype);
ni.isPureReactComponent = !0;
var Gi = Array.isArray, hs = Object.prototype.hasOwnProperty, ri = { current: null }, ms = { key: !0, ref: !0, __self: !0, __source: !0 };
function vs(e, t, n) {
  var r, l = {}, o = null, a = null;
  if (t != null) for (r in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t) hs.call(t, r) && !ms.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in s = e.defaultProps, s) l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: ar, type: e, key: o, ref: a, props: l, _owner: ri.current };
}
function Bc(e, t) {
  return { $$typeof: ar, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function li(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ar;
}
function Hc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Zi = /\/+/g;
function Ml(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Hc("" + e.key) : t.toString(36);
}
function $r(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else switch (o) {
    case "string":
    case "number":
      a = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case ar:
        case Tc:
          a = !0;
      }
  }
  if (a) return a = e, l = l(a), e = r === "" ? "." + Ml(a, 0) : r, Gi(l) ? (n = "", e != null && (n = e.replace(Zi, "$&/") + "/"), $r(l, t, n, "", function(c) {
    return c;
  })) : l != null && (li(l) && (l = Bc(l, n + (!l.key || a && a.key === l.key ? "" : ("" + l.key).replace(Zi, "$&/") + "/") + e)), t.push(l)), 1;
  if (a = 0, r = r === "" ? "." : r + ":", Gi(e)) for (var s = 0; s < e.length; s++) {
    o = e[s];
    var u = r + Ml(o, s);
    a += $r(o, t, n, u, l);
  }
  else if (u = Uc(e), typeof u == "function") for (e = u.call(e), s = 0; !(o = e.next()).done; ) o = o.value, u = r + Ml(o, s++), a += $r(o, t, n, u, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return a;
}
function hr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return $r(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Wc(e) {
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
var ve = { current: null }, Lr = { transition: null }, Vc = { ReactCurrentDispatcher: ve, ReactCurrentBatchConfig: Lr, ReactCurrentOwner: ri };
function gs() {
  throw Error("act(...) is not supported in production builds of React.");
}
I.Children = { map: hr, forEach: function(e, t, n) {
  hr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return hr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return hr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!li(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
I.Component = xn;
I.Fragment = $c;
I.Profiler = Mc;
I.PureComponent = ti;
I.StrictMode = Lc;
I.Suspense = Dc;
I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Vc;
I.act = gs;
I.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = ds({}, e.props), l = e.key, o = e.ref, a = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, a = ri.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
    for (u in t) hs.call(t, u) && !ms.hasOwnProperty(u) && (r[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    s = Array(u);
    for (var c = 0; c < u; c++) s[c] = arguments[c + 2];
    r.children = s;
  }
  return { $$typeof: ar, type: e.type, key: l, ref: o, props: r, _owner: a };
};
I.createContext = function(e) {
  return e = { $$typeof: Oc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Rc, _context: e }, e.Consumer = e;
};
I.createElement = vs;
I.createFactory = function(e) {
  var t = vs.bind(null, e);
  return t.type = e, t;
};
I.createRef = function() {
  return { current: null };
};
I.forwardRef = function(e) {
  return { $$typeof: Fc, render: e };
};
I.isValidElement = li;
I.lazy = function(e) {
  return { $$typeof: Ac, _payload: { _status: -1, _result: e }, _init: Wc };
};
I.memo = function(e, t) {
  return { $$typeof: Ic, type: e, compare: t === void 0 ? null : t };
};
I.startTransition = function(e) {
  var t = Lr.transition;
  Lr.transition = {};
  try {
    e();
  } finally {
    Lr.transition = t;
  }
};
I.unstable_act = gs;
I.useCallback = function(e, t) {
  return ve.current.useCallback(e, t);
};
I.useContext = function(e) {
  return ve.current.useContext(e);
};
I.useDebugValue = function() {
};
I.useDeferredValue = function(e) {
  return ve.current.useDeferredValue(e);
};
I.useEffect = function(e, t) {
  return ve.current.useEffect(e, t);
};
I.useId = function() {
  return ve.current.useId();
};
I.useImperativeHandle = function(e, t, n) {
  return ve.current.useImperativeHandle(e, t, n);
};
I.useInsertionEffect = function(e, t) {
  return ve.current.useInsertionEffect(e, t);
};
I.useLayoutEffect = function(e, t) {
  return ve.current.useLayoutEffect(e, t);
};
I.useMemo = function(e, t) {
  return ve.current.useMemo(e, t);
};
I.useReducer = function(e, t, n) {
  return ve.current.useReducer(e, t, n);
};
I.useRef = function(e) {
  return ve.current.useRef(e);
};
I.useState = function(e) {
  return ve.current.useState(e);
};
I.useSyncExternalStore = function(e, t, n) {
  return ve.current.useSyncExternalStore(e, t, n);
};
I.useTransition = function() {
  return ve.current.useTransition();
};
I.version = "18.3.1";
us.exports = I;
var S = us.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qc = S, Kc = Symbol.for("react.element"), Yc = Symbol.for("react.fragment"), Xc = Object.prototype.hasOwnProperty, Gc = Qc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Zc = { key: !0, ref: !0, __self: !0, __source: !0 };
function xs(e, t, n) {
  var r, l = {}, o = null, a = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (r in t) Xc.call(t, r) && !Zc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Kc, type: e, key: o, ref: a, props: l, _owner: Gc.current };
}
gl.Fragment = Yc;
gl.jsx = xs;
gl.jsxs = xs;
ss.exports = gl;
var i = ss.exports, ys = { exports: {} }, be = {}, ws = { exports: {} }, ks = {};
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
  function t(P, O) {
    var _ = P.length;
    P.push(O);
    e: for (; 0 < _; ) {
      var M = _ - 1 >>> 1, D = P[M];
      if (0 < l(D, O)) P[M] = O, P[_] = D, _ = M;
      else break e;
    }
  }
  function n(P) {
    return P.length === 0 ? null : P[0];
  }
  function r(P) {
    if (P.length === 0) return null;
    var O = P[0], _ = P.pop();
    if (_ !== O) {
      P[0] = _;
      e: for (var M = 0, D = P.length, se = D >>> 1; M < se; ) {
        var ne = 2 * (M + 1) - 1, Wt = P[ne], Qe = ne + 1, U = P[Qe];
        if (0 > l(Wt, _)) Qe < D && 0 > l(U, Wt) ? (P[M] = U, P[Qe] = _, M = Qe) : (P[M] = Wt, P[ne] = _, M = ne);
        else if (Qe < D && 0 > l(U, _)) P[M] = U, P[Qe] = _, M = Qe;
        else break e;
      }
    }
    return O;
  }
  function l(P, O) {
    var _ = P.sortIndex - O.sortIndex;
    return _ !== 0 ? _ : P.id - O.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var a = Date, s = a.now();
    e.unstable_now = function() {
      return a.now() - s;
    };
  }
  var u = [], c = [], g = 1, v = null, h = 3, m = !1, y = !1, w = !1, $ = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function f(P) {
    for (var O = n(c); O !== null; ) {
      if (O.callback === null) r(c);
      else if (O.startTime <= P) r(c), O.sortIndex = O.expirationTime, t(u, O);
      else break;
      O = n(c);
    }
  }
  function x(P) {
    if (w = !1, f(P), !y) if (n(u) !== null) y = !0, We(k);
    else {
      var O = n(c);
      O !== null && Ve(x, O.startTime - P);
    }
  }
  function k(P, O) {
    y = !1, w && (w = !1, p(C), C = -1), m = !0;
    var _ = h;
    try {
      for (f(O), v = n(u); v !== null && (!(v.expirationTime > O) || P && !E()); ) {
        var M = v.callback;
        if (typeof M == "function") {
          v.callback = null, h = v.priorityLevel;
          var D = M(v.expirationTime <= O);
          O = e.unstable_now(), typeof D == "function" ? v.callback = D : v === n(u) && r(u), f(O);
        } else r(u);
        v = n(u);
      }
      if (v !== null) var se = !0;
      else {
        var ne = n(c);
        ne !== null && Ve(x, ne.startTime - O), se = !1;
      }
      return se;
    } finally {
      v = null, h = _, m = !1;
    }
  }
  var j = !1, z = null, C = -1, b = 5, R = -1;
  function E() {
    return !(e.unstable_now() - R < b);
  }
  function F() {
    if (z !== null) {
      var P = e.unstable_now();
      R = P;
      var O = !0;
      try {
        O = z(!0, P);
      } finally {
        O ? W() : (j = !1, z = null);
      }
    } else j = !1;
  }
  var W;
  if (typeof d == "function") W = function() {
    d(F);
  };
  else if (typeof MessageChannel < "u") {
    var Se = new MessageChannel(), He = Se.port2;
    Se.port1.onmessage = F, W = function() {
      He.postMessage(null);
    };
  } else W = function() {
    $(F, 0);
  };
  function We(P) {
    z = P, j || (j = !0, W());
  }
  function Ve(P, O) {
    C = $(function() {
      P(e.unstable_now());
    }, O);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(P) {
    P.callback = null;
  }, e.unstable_continueExecution = function() {
    y || m || (y = !0, We(k));
  }, e.unstable_forceFrameRate = function(P) {
    0 > P || 125 < P ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : b = 0 < P ? Math.floor(1e3 / P) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(P) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var O = 3;
        break;
      default:
        O = h;
    }
    var _ = h;
    h = O;
    try {
      return P();
    } finally {
      h = _;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(P, O) {
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
    var _ = h;
    h = P;
    try {
      return O();
    } finally {
      h = _;
    }
  }, e.unstable_scheduleCallback = function(P, O, _) {
    var M = e.unstable_now();
    switch (typeof _ == "object" && _ !== null ? (_ = _.delay, _ = typeof _ == "number" && 0 < _ ? M + _ : M) : _ = M, P) {
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
    return D = _ + D, P = { id: g++, callback: O, priorityLevel: P, startTime: _, expirationTime: D, sortIndex: -1 }, _ > M ? (P.sortIndex = _, t(c, P), n(u) === null && P === n(c) && (w ? (p(C), C = -1) : w = !0, Ve(x, _ - M))) : (P.sortIndex = D, t(u, P), y || m || (y = !0, We(k))), P;
  }, e.unstable_shouldYield = E, e.unstable_wrapCallback = function(P) {
    var O = h;
    return function() {
      var _ = h;
      h = O;
      try {
        return P.apply(this, arguments);
      } finally {
        h = _;
      }
    };
  };
})(ks);
ws.exports = ks;
var Jc = ws.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qc = S, Ee = Jc;
function N(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var js = /* @__PURE__ */ new Set(), Wn = {};
function Bt(e, t) {
  dn(e, t), dn(e + "Capture", t);
}
function dn(e, t) {
  for (Wn[e] = t, e = 0; e < t.length; e++) js.add(t[e]);
}
var rt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ao = Object.prototype.hasOwnProperty, ed = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ji = {}, qi = {};
function td(e) {
  return ao.call(qi, e) ? !0 : ao.call(Ji, e) ? !1 : ed.test(e) ? qi[e] = !0 : (Ji[e] = !0, !1);
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
function ge(e, t, n, r, l, o, a) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = a;
}
var ae = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ae[e] = new ge(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ae[t] = new ge(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ae[e] = new ge(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ae[e] = new ge(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ae[e] = new ge(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ae[e] = new ge(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ae[e] = new ge(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ae[e] = new ge(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ae[e] = new ge(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var oi = /[\-:]([a-z])/g;
function ii(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    oi,
    ii
  );
  ae[t] = new ge(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(oi, ii);
  ae[t] = new ge(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(oi, ii);
  ae[t] = new ge(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ae[e] = new ge(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ae.xlinkHref = new ge("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ae[e] = new ge(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ai(e, t, n, r) {
  var l = ae.hasOwnProperty(t) ? ae[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (rd(t, n, l, r) && (n = null), r || l === null ? td(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var at = qc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, mr = Symbol.for("react.element"), Qt = Symbol.for("react.portal"), Kt = Symbol.for("react.fragment"), si = Symbol.for("react.strict_mode"), so = Symbol.for("react.profiler"), Ss = Symbol.for("react.provider"), Ns = Symbol.for("react.context"), ui = Symbol.for("react.forward_ref"), uo = Symbol.for("react.suspense"), co = Symbol.for("react.suspense_list"), ci = Symbol.for("react.memo"), ut = Symbol.for("react.lazy"), _s = Symbol.for("react.offscreen"), ea = Symbol.iterator;
function kn(e) {
  return e === null || typeof e != "object" ? null : (e = ea && e[ea] || e["@@iterator"], typeof e == "function" ? e : null);
}
var G = Object.assign, Rl;
function Pn(e) {
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
function Fl(e, t) {
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
`), a = l.length - 1, s = o.length - 1; 1 <= a && 0 <= s && l[a] !== o[s]; ) s--;
      for (; 1 <= a && 0 <= s; a--, s--) if (l[a] !== o[s]) {
        if (a !== 1 || s !== 1)
          do
            if (a--, s--, 0 > s || l[a] !== o[s]) {
              var u = `
` + l[a].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= a && 0 <= s);
        break;
      }
    }
  } finally {
    Ol = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Pn(e) : "";
}
function ld(e) {
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
      return e = Fl(e.type, !1), e;
    case 11:
      return e = Fl(e.type.render, !1), e;
    case 1:
      return e = Fl(e.type, !0), e;
    default:
      return "";
  }
}
function fo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Kt:
      return "Fragment";
    case Qt:
      return "Portal";
    case so:
      return "Profiler";
    case si:
      return "StrictMode";
    case uo:
      return "Suspense";
    case co:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Ns:
      return (e.displayName || "Context") + ".Consumer";
    case Ss:
      return (e._context.displayName || "Context") + ".Provider";
    case ui:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case ci:
      return t = e.displayName || null, t !== null ? t : fo(e.type) || "Memo";
    case ut:
      t = e._payload, e = e._init;
      try {
        return fo(e(t));
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
      return fo(t);
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
function St(e) {
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
function Cs(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function id(e) {
  var t = Cs(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, o = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(a) {
      r = "" + a, o.call(this, a);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(a) {
      r = "" + a;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function vr(e) {
  e._valueTracker || (e._valueTracker = id(e));
}
function Es(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Cs(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Qr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function po(e, t) {
  var n = t.checked;
  return G({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function ta(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = St(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function bs(e, t) {
  t = t.checked, t != null && ai(e, "checked", t, !1);
}
function ho(e, t) {
  bs(e, t);
  var n = St(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? mo(e, t.type, n) : t.hasOwnProperty("defaultValue") && mo(e, t.type, St(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function na(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function mo(e, t, n) {
  (t !== "number" || Qr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Tn = Array.isArray;
function ln(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + St(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function vo(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
  return G({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function ra(e, t) {
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
  e._wrapperState = { initialValue: St(n) };
}
function zs(e, t) {
  var n = St(t.value), r = St(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function la(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ps(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function go(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ps(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var gr, Ts = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (gr = gr || document.createElement("div"), gr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = gr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
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
}, ad = ["Webkit", "ms", "Moz", "O"];
Object.keys(Mn).forEach(function(e) {
  ad.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Mn[t] = Mn[e];
  });
});
function $s(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Mn.hasOwnProperty(e) && Mn[e] ? ("" + t).trim() : t + "px";
}
function Ls(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = $s(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var sd = G({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function xo(e, t) {
  if (t) {
    if (sd[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(N(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(N(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(N(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(N(62));
  }
}
function yo(e, t) {
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
var wo = null;
function di(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var ko = null, on = null, an = null;
function oa(e) {
  if (e = cr(e)) {
    if (typeof ko != "function") throw Error(N(280));
    var t = e.stateNode;
    t && (t = jl(t), ko(e.stateNode, e.type, t));
  }
}
function Ms(e) {
  on ? an ? an.push(e) : an = [e] : on = e;
}
function Rs() {
  if (on) {
    var e = on, t = an;
    if (an = on = null, oa(e), t) for (e = 0; e < t.length; e++) oa(t[e]);
  }
}
function Os(e, t) {
  return e(t);
}
function Fs() {
}
var Dl = !1;
function Ds(e, t, n) {
  if (Dl) return e(t, n);
  Dl = !0;
  try {
    return Os(e, t, n);
  } finally {
    Dl = !1, (on !== null || an !== null) && (Fs(), Rs());
  }
}
function Qn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = jl(n);
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
var jo = !1;
if (rt) try {
  var jn = {};
  Object.defineProperty(jn, "passive", { get: function() {
    jo = !0;
  } }), window.addEventListener("test", jn, jn), window.removeEventListener("test", jn, jn);
} catch {
  jo = !1;
}
function ud(e, t, n, r, l, o, a, s, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (g) {
    this.onError(g);
  }
}
var Rn = !1, Kr = null, Yr = !1, So = null, cd = { onError: function(e) {
  Rn = !0, Kr = e;
} };
function dd(e, t, n, r, l, o, a, s, u) {
  Rn = !1, Kr = null, ud.apply(cd, arguments);
}
function fd(e, t, n, r, l, o, a, s, u) {
  if (dd.apply(this, arguments), Rn) {
    if (Rn) {
      var c = Kr;
      Rn = !1, Kr = null;
    } else throw Error(N(198));
    Yr || (Yr = !0, So = c);
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
function Is(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function ia(e) {
  if (Ht(e) !== e) throw Error(N(188));
}
function pd(e) {
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
        if (o === n) return ia(l), e;
        if (o === r) return ia(l), t;
        o = o.sibling;
      }
      throw Error(N(188));
    }
    if (n.return !== r.return) n = l, r = o;
    else {
      for (var a = !1, s = l.child; s; ) {
        if (s === n) {
          a = !0, n = l, r = o;
          break;
        }
        if (s === r) {
          a = !0, r = l, n = o;
          break;
        }
        s = s.sibling;
      }
      if (!a) {
        for (s = o.child; s; ) {
          if (s === n) {
            a = !0, n = o, r = l;
            break;
          }
          if (s === r) {
            a = !0, r = o, n = l;
            break;
          }
          s = s.sibling;
        }
        if (!a) throw Error(N(189));
      }
    }
    if (n.alternate !== r) throw Error(N(190));
  }
  if (n.tag !== 3) throw Error(N(188));
  return n.stateNode.current === n ? e : t;
}
function As(e) {
  return e = pd(e), e !== null ? Us(e) : null;
}
function Us(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Us(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Bs = Ee.unstable_scheduleCallback, aa = Ee.unstable_cancelCallback, hd = Ee.unstable_shouldYield, md = Ee.unstable_requestPaint, J = Ee.unstable_now, vd = Ee.unstable_getCurrentPriorityLevel, fi = Ee.unstable_ImmediatePriority, Hs = Ee.unstable_UserBlockingPriority, Xr = Ee.unstable_NormalPriority, gd = Ee.unstable_LowPriority, Ws = Ee.unstable_IdlePriority, xl = null, Ge = null;
function xd(e) {
  if (Ge && typeof Ge.onCommitFiberRoot == "function") try {
    Ge.onCommitFiberRoot(xl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ae = Math.clz32 ? Math.clz32 : kd, yd = Math.log, wd = Math.LN2;
function kd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (yd(e) / wd | 0) | 0;
}
var xr = 64, yr = 4194304;
function $n(e) {
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
function Gr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, a = n & 268435455;
  if (a !== 0) {
    var s = a & ~l;
    s !== 0 ? r = $n(s) : (o &= a, o !== 0 && (r = $n(o)));
  } else a = n & ~l, a !== 0 ? r = $n(a) : o !== 0 && (r = $n(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Ae(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function jd(e, t) {
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
function Sd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var a = 31 - Ae(o), s = 1 << a, u = l[a];
    u === -1 ? (!(s & n) || s & r) && (l[a] = jd(s, t)) : u <= t && (e.expiredLanes |= s), o &= ~s;
  }
}
function No(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Vs() {
  var e = xr;
  return xr <<= 1, !(xr & 4194240) && (xr = 64), e;
}
function Il(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function sr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ae(t), e[t] = n;
}
function Nd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Ae(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function pi(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Ae(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var B = 0;
function Qs(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Ks, hi, Ys, Xs, Gs, _o = !1, wr = [], mt = null, vt = null, gt = null, Kn = /* @__PURE__ */ new Map(), Yn = /* @__PURE__ */ new Map(), dt = [], _d = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function sa(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      mt = null;
      break;
    case "dragenter":
    case "dragleave":
      vt = null;
      break;
    case "mouseover":
    case "mouseout":
      gt = null;
      break;
    case "pointerover":
    case "pointerout":
      Kn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Yn.delete(t.pointerId);
  }
}
function Sn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = cr(t), t !== null && hi(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Cd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return mt = Sn(mt, e, t, n, r, l), !0;
    case "dragenter":
      return vt = Sn(vt, e, t, n, r, l), !0;
    case "mouseover":
      return gt = Sn(gt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Kn.set(o, Sn(Kn.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Yn.set(o, Sn(Yn.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Zs(e) {
  var t = Tt(e.target);
  if (t !== null) {
    var n = Ht(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Is(n), t !== null) {
          e.blockedOn = t, Gs(e.priority, function() {
            Ys(n);
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
function Mr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Co(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      wo = r, n.target.dispatchEvent(r), wo = null;
    } else return t = cr(n), t !== null && hi(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function ua(e, t, n) {
  Mr(e) && n.delete(t);
}
function Ed() {
  _o = !1, mt !== null && Mr(mt) && (mt = null), vt !== null && Mr(vt) && (vt = null), gt !== null && Mr(gt) && (gt = null), Kn.forEach(ua), Yn.forEach(ua);
}
function Nn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, _o || (_o = !0, Ee.unstable_scheduleCallback(Ee.unstable_NormalPriority, Ed)));
}
function Xn(e) {
  function t(l) {
    return Nn(l, e);
  }
  if (0 < wr.length) {
    Nn(wr[0], e);
    for (var n = 1; n < wr.length; n++) {
      var r = wr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (mt !== null && Nn(mt, e), vt !== null && Nn(vt, e), gt !== null && Nn(gt, e), Kn.forEach(t), Yn.forEach(t), n = 0; n < dt.length; n++) r = dt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < dt.length && (n = dt[0], n.blockedOn === null); ) Zs(n), n.blockedOn === null && dt.shift();
}
var sn = at.ReactCurrentBatchConfig, Zr = !0;
function bd(e, t, n, r) {
  var l = B, o = sn.transition;
  sn.transition = null;
  try {
    B = 1, mi(e, t, n, r);
  } finally {
    B = l, sn.transition = o;
  }
}
function zd(e, t, n, r) {
  var l = B, o = sn.transition;
  sn.transition = null;
  try {
    B = 4, mi(e, t, n, r);
  } finally {
    B = l, sn.transition = o;
  }
}
function mi(e, t, n, r) {
  if (Zr) {
    var l = Co(e, t, n, r);
    if (l === null) Xl(e, t, r, Jr, n), sa(e, r);
    else if (Cd(l, e, t, n, r)) r.stopPropagation();
    else if (sa(e, r), t & 4 && -1 < _d.indexOf(e)) {
      for (; l !== null; ) {
        var o = cr(l);
        if (o !== null && Ks(o), o = Co(e, t, n, r), o === null && Xl(e, t, r, Jr, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Xl(e, t, r, null, n);
  }
}
var Jr = null;
function Co(e, t, n, r) {
  if (Jr = null, e = di(r), e = Tt(e), e !== null) if (t = Ht(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Is(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Jr = e, null;
}
function Js(e) {
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
        case fi:
          return 1;
        case Hs:
          return 4;
        case Xr:
        case gd:
          return 16;
        case Ws:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var pt = null, vi = null, Rr = null;
function qs() {
  if (Rr) return Rr;
  var e, t = vi, n = t.length, r, l = "value" in pt ? pt.value : pt.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === l[o - r]; r++) ;
  return Rr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Or(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function kr() {
  return !0;
}
function ca() {
  return !1;
}
function ze(e) {
  function t(n, r, l, o, a) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = a, this.currentTarget = null;
    for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(o) : o[s]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? kr : ca, this.isPropagationStopped = ca, this;
  }
  return G(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = kr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = kr);
  }, persist: function() {
  }, isPersistent: kr }), t;
}
var yn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, gi = ze(yn), ur = G({}, yn, { view: 0, detail: 0 }), Pd = ze(ur), Al, Ul, _n, yl = G({}, ur, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: xi, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== _n && (_n && e.type === "mousemove" ? (Al = e.screenX - _n.screenX, Ul = e.screenY - _n.screenY) : Ul = Al = 0, _n = e), Al);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ul;
} }), da = ze(yl), Td = G({}, yl, { dataTransfer: 0 }), $d = ze(Td), Ld = G({}, ur, { relatedTarget: 0 }), Bl = ze(Ld), Md = G({}, yn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Rd = ze(Md), Od = G({}, yn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Fd = ze(Od), Dd = G({}, yn, { data: 0 }), fa = ze(Dd), Id = {
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
}, Ad = {
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
}, Ud = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Bd(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Ud[e]) ? !!t[e] : !1;
}
function xi() {
  return Bd;
}
var Hd = G({}, ur, { key: function(e) {
  if (e.key) {
    var t = Id[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Or(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Ad[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: xi, charCode: function(e) {
  return e.type === "keypress" ? Or(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Or(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Wd = ze(Hd), Vd = G({}, yl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), pa = ze(Vd), Qd = G({}, ur, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: xi }), Kd = ze(Qd), Yd = G({}, yn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = ze(Yd), Gd = G({}, yl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = ze(Gd), Jd = [9, 13, 27, 32], yi = rt && "CompositionEvent" in window, On = null;
rt && "documentMode" in document && (On = document.documentMode);
var qd = rt && "TextEvent" in window && !On, eu = rt && (!yi || On && 8 < On && 11 >= On), ha = " ", ma = !1;
function tu(e, t) {
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
function nu(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Yt = !1;
function ef(e, t) {
  switch (e) {
    case "compositionend":
      return nu(t);
    case "keypress":
      return t.which !== 32 ? null : (ma = !0, ha);
    case "textInput":
      return e = t.data, e === ha && ma ? null : e;
    default:
      return null;
  }
}
function tf(e, t) {
  if (Yt) return e === "compositionend" || !yi && tu(e, t) ? (e = qs(), Rr = vi = pt = null, Yt = !1, e) : null;
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
      return eu && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var nf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function va(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!nf[e.type] : t === "textarea";
}
function ru(e, t, n, r) {
  Ms(r), t = qr(t, "onChange"), 0 < t.length && (n = new gi("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Fn = null, Gn = null;
function rf(e) {
  hu(e, 0);
}
function wl(e) {
  var t = Zt(e);
  if (Es(t)) return e;
}
function lf(e, t) {
  if (e === "change") return t;
}
var lu = !1;
if (rt) {
  var Hl;
  if (rt) {
    var Wl = "oninput" in document;
    if (!Wl) {
      var ga = document.createElement("div");
      ga.setAttribute("oninput", "return;"), Wl = typeof ga.oninput == "function";
    }
    Hl = Wl;
  } else Hl = !1;
  lu = Hl && (!document.documentMode || 9 < document.documentMode);
}
function xa() {
  Fn && (Fn.detachEvent("onpropertychange", ou), Gn = Fn = null);
}
function ou(e) {
  if (e.propertyName === "value" && wl(Gn)) {
    var t = [];
    ru(t, Gn, e, di(e)), Ds(rf, t);
  }
}
function of(e, t, n) {
  e === "focusin" ? (xa(), Fn = t, Gn = n, Fn.attachEvent("onpropertychange", ou)) : e === "focusout" && xa();
}
function af(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return wl(Gn);
}
function sf(e, t) {
  if (e === "click") return wl(t);
}
function uf(e, t) {
  if (e === "input" || e === "change") return wl(t);
}
function cf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Be = typeof Object.is == "function" ? Object.is : cf;
function Zn(e, t) {
  if (Be(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ao.call(t, l) || !Be(e[l], t[l])) return !1;
  }
  return !0;
}
function ya(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function wa(e, t) {
  var n = ya(e);
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
    n = ya(n);
  }
}
function iu(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? iu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function au() {
  for (var e = window, t = Qr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Qr(e.document);
  }
  return t;
}
function wi(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function df(e) {
  var t = au(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && iu(n.ownerDocument.documentElement, n)) {
    if (r !== null && wi(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = wa(n, o);
        var a = wa(
          n,
          r
        );
        l && a && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== a.node || e.focusOffset !== a.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(a.node, a.offset)) : (t.setEnd(a.node, a.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var ff = rt && "documentMode" in document && 11 >= document.documentMode, Xt = null, Eo = null, Dn = null, bo = !1;
function ka(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  bo || Xt == null || Xt !== Qr(r) || (r = Xt, "selectionStart" in r && wi(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Dn && Zn(Dn, r) || (Dn = r, r = qr(Eo, "onSelect"), 0 < r.length && (t = new gi("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Xt)));
}
function jr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Gt = { animationend: jr("Animation", "AnimationEnd"), animationiteration: jr("Animation", "AnimationIteration"), animationstart: jr("Animation", "AnimationStart"), transitionend: jr("Transition", "TransitionEnd") }, Vl = {}, su = {};
rt && (su = document.createElement("div").style, "AnimationEvent" in window || (delete Gt.animationend.animation, delete Gt.animationiteration.animation, delete Gt.animationstart.animation), "TransitionEvent" in window || delete Gt.transitionend.transition);
function kl(e) {
  if (Vl[e]) return Vl[e];
  if (!Gt[e]) return e;
  var t = Gt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in su) return Vl[e] = t[n];
  return e;
}
var uu = kl("animationend"), cu = kl("animationiteration"), du = kl("animationstart"), fu = kl("transitionend"), pu = /* @__PURE__ */ new Map(), ja = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function _t(e, t) {
  pu.set(e, t), Bt(t, [e]);
}
for (var Ql = 0; Ql < ja.length; Ql++) {
  var Kl = ja[Ql], pf = Kl.toLowerCase(), hf = Kl[0].toUpperCase() + Kl.slice(1);
  _t(pf, "on" + hf);
}
_t(uu, "onAnimationEnd");
_t(cu, "onAnimationIteration");
_t(du, "onAnimationStart");
_t("dblclick", "onDoubleClick");
_t("focusin", "onFocus");
_t("focusout", "onBlur");
_t(fu, "onTransitionEnd");
dn("onMouseEnter", ["mouseout", "mouseover"]);
dn("onMouseLeave", ["mouseout", "mouseover"]);
dn("onPointerEnter", ["pointerout", "pointerover"]);
dn("onPointerLeave", ["pointerout", "pointerover"]);
Bt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Bt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Bt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Bt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Bt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Bt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ln = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ln));
function Sa(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, fd(r, t, void 0, e), e.currentTarget = null;
}
function hu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var a = r.length - 1; 0 <= a; a--) {
        var s = r[a], u = s.instance, c = s.currentTarget;
        if (s = s.listener, u !== o && l.isPropagationStopped()) break e;
        Sa(l, s, c), o = u;
      }
      else for (a = 0; a < r.length; a++) {
        if (s = r[a], u = s.instance, c = s.currentTarget, s = s.listener, u !== o && l.isPropagationStopped()) break e;
        Sa(l, s, c), o = u;
      }
    }
  }
  if (Yr) throw e = So, Yr = !1, So = null, e;
}
function V(e, t) {
  var n = t[Lo];
  n === void 0 && (n = t[Lo] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (mu(t, e, 2, !1), n.add(r));
}
function Yl(e, t, n) {
  var r = 0;
  t && (r |= 4), mu(n, e, r, t);
}
var Sr = "_reactListening" + Math.random().toString(36).slice(2);
function Jn(e) {
  if (!e[Sr]) {
    e[Sr] = !0, js.forEach(function(n) {
      n !== "selectionchange" && (mf.has(n) || Yl(n, !1, e), Yl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Sr] || (t[Sr] = !0, Yl("selectionchange", !1, t));
  }
}
function mu(e, t, n, r) {
  switch (Js(t)) {
    case 1:
      var l = bd;
      break;
    case 4:
      l = zd;
      break;
    default:
      l = mi;
  }
  n = l.bind(null, t, n, e), l = void 0, !jo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Xl(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var a = r.tag;
    if (a === 3 || a === 4) {
      var s = r.stateNode.containerInfo;
      if (s === l || s.nodeType === 8 && s.parentNode === l) break;
      if (a === 4) for (a = r.return; a !== null; ) {
        var u = a.tag;
        if ((u === 3 || u === 4) && (u = a.stateNode.containerInfo, u === l || u.nodeType === 8 && u.parentNode === l)) return;
        a = a.return;
      }
      for (; s !== null; ) {
        if (a = Tt(s), a === null) return;
        if (u = a.tag, u === 5 || u === 6) {
          r = o = a;
          continue e;
        }
        s = s.parentNode;
      }
    }
    r = r.return;
  }
  Ds(function() {
    var c = o, g = di(n), v = [];
    e: {
      var h = pu.get(e);
      if (h !== void 0) {
        var m = gi, y = e;
        switch (e) {
          case "keypress":
            if (Or(n) === 0) break e;
          case "keydown":
          case "keyup":
            m = Wd;
            break;
          case "focusin":
            y = "focus", m = Bl;
            break;
          case "focusout":
            y = "blur", m = Bl;
            break;
          case "beforeblur":
          case "afterblur":
            m = Bl;
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
            m = da;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            m = $d;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = Kd;
            break;
          case uu:
          case cu:
          case du:
            m = Rd;
            break;
          case fu:
            m = Xd;
            break;
          case "scroll":
            m = Pd;
            break;
          case "wheel":
            m = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = Fd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            m = pa;
        }
        var w = (t & 4) !== 0, $ = !w && e === "scroll", p = w ? h !== null ? h + "Capture" : null : h;
        w = [];
        for (var d = c, f; d !== null; ) {
          f = d;
          var x = f.stateNode;
          if (f.tag === 5 && x !== null && (f = x, p !== null && (x = Qn(d, p), x != null && w.push(qn(d, x, f)))), $) break;
          d = d.return;
        }
        0 < w.length && (h = new m(h, y, null, n, g), v.push({ event: h, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", m = e === "mouseout" || e === "pointerout", h && n !== wo && (y = n.relatedTarget || n.fromElement) && (Tt(y) || y[lt])) break e;
        if ((m || h) && (h = g.window === g ? g : (h = g.ownerDocument) ? h.defaultView || h.parentWindow : window, m ? (y = n.relatedTarget || n.toElement, m = c, y = y ? Tt(y) : null, y !== null && ($ = Ht(y), y !== $ || y.tag !== 5 && y.tag !== 6) && (y = null)) : (m = null, y = c), m !== y)) {
          if (w = da, x = "onMouseLeave", p = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (w = pa, x = "onPointerLeave", p = "onPointerEnter", d = "pointer"), $ = m == null ? h : Zt(m), f = y == null ? h : Zt(y), h = new w(x, d + "leave", m, n, g), h.target = $, h.relatedTarget = f, x = null, Tt(g) === c && (w = new w(p, d + "enter", y, n, g), w.target = f, w.relatedTarget = $, x = w), $ = x, m && y) t: {
            for (w = m, p = y, d = 0, f = w; f; f = Vt(f)) d++;
            for (f = 0, x = p; x; x = Vt(x)) f++;
            for (; 0 < d - f; ) w = Vt(w), d--;
            for (; 0 < f - d; ) p = Vt(p), f--;
            for (; d--; ) {
              if (w === p || p !== null && w === p.alternate) break t;
              w = Vt(w), p = Vt(p);
            }
            w = null;
          }
          else w = null;
          m !== null && Na(v, h, m, w, !1), y !== null && $ !== null && Na(v, $, y, w, !0);
        }
      }
      e: {
        if (h = c ? Zt(c) : window, m = h.nodeName && h.nodeName.toLowerCase(), m === "select" || m === "input" && h.type === "file") var k = lf;
        else if (va(h)) if (lu) k = uf;
        else {
          k = af;
          var j = of;
        }
        else (m = h.nodeName) && m.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (k = sf);
        if (k && (k = k(e, c))) {
          ru(v, k, n, g);
          break e;
        }
        j && j(e, h, c), e === "focusout" && (j = h._wrapperState) && j.controlled && h.type === "number" && mo(h, "number", h.value);
      }
      switch (j = c ? Zt(c) : window, e) {
        case "focusin":
          (va(j) || j.contentEditable === "true") && (Xt = j, Eo = c, Dn = null);
          break;
        case "focusout":
          Dn = Eo = Xt = null;
          break;
        case "mousedown":
          bo = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          bo = !1, ka(v, n, g);
          break;
        case "selectionchange":
          if (ff) break;
        case "keydown":
        case "keyup":
          ka(v, n, g);
      }
      var z;
      if (yi) e: {
        switch (e) {
          case "compositionstart":
            var C = "onCompositionStart";
            break e;
          case "compositionend":
            C = "onCompositionEnd";
            break e;
          case "compositionupdate":
            C = "onCompositionUpdate";
            break e;
        }
        C = void 0;
      }
      else Yt ? tu(e, n) && (C = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (C = "onCompositionStart");
      C && (eu && n.locale !== "ko" && (Yt || C !== "onCompositionStart" ? C === "onCompositionEnd" && Yt && (z = qs()) : (pt = g, vi = "value" in pt ? pt.value : pt.textContent, Yt = !0)), j = qr(c, C), 0 < j.length && (C = new fa(C, e, null, n, g), v.push({ event: C, listeners: j }), z ? C.data = z : (z = nu(n), z !== null && (C.data = z)))), (z = qd ? ef(e, n) : tf(e, n)) && (c = qr(c, "onBeforeInput"), 0 < c.length && (g = new fa("onBeforeInput", "beforeinput", null, n, g), v.push({ event: g, listeners: c }), g.data = z));
    }
    hu(v, t);
  });
}
function qn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function qr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Qn(e, n), o != null && r.unshift(qn(e, o, l)), o = Qn(e, t), o != null && r.push(qn(e, o, l))), e = e.return;
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
function Na(e, t, n, r, l) {
  for (var o = t._reactName, a = []; n !== null && n !== r; ) {
    var s = n, u = s.alternate, c = s.stateNode;
    if (u !== null && u === r) break;
    s.tag === 5 && c !== null && (s = c, l ? (u = Qn(n, o), u != null && a.unshift(qn(n, u, s))) : l || (u = Qn(n, o), u != null && a.push(qn(n, u, s)))), n = n.return;
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var vf = /\r\n?/g, gf = /\u0000|\uFFFD/g;
function _a(e) {
  return (typeof e == "string" ? e : "" + e).replace(vf, `
`).replace(gf, "");
}
function Nr(e, t, n) {
  if (t = _a(t), _a(e) !== t && n) throw Error(N(425));
}
function el() {
}
var zo = null, Po = null;
function To(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var $o = typeof setTimeout == "function" ? setTimeout : void 0, xf = typeof clearTimeout == "function" ? clearTimeout : void 0, Ca = typeof Promise == "function" ? Promise : void 0, yf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ca < "u" ? function(e) {
  return Ca.resolve(null).then(e).catch(wf);
} : $o;
function wf(e) {
  setTimeout(function() {
    throw e;
  });
}
function Gl(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Xn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Xn(t);
}
function xt(e) {
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
function Ea(e) {
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
var wn = Math.random().toString(36).slice(2), Xe = "__reactFiber$" + wn, er = "__reactProps$" + wn, lt = "__reactContainer$" + wn, Lo = "__reactEvents$" + wn, kf = "__reactListeners$" + wn, jf = "__reactHandles$" + wn;
function Tt(e) {
  var t = e[Xe];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[lt] || n[Xe]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ea(e); e !== null; ) {
        if (n = e[Xe]) return n;
        e = Ea(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function cr(e) {
  return e = e[Xe] || e[lt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Zt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(N(33));
}
function jl(e) {
  return e[er] || null;
}
var Mo = [], Jt = -1;
function Ct(e) {
  return { current: e };
}
function Q(e) {
  0 > Jt || (e.current = Mo[Jt], Mo[Jt] = null, Jt--);
}
function H(e, t) {
  Jt++, Mo[Jt] = e.current, e.current = t;
}
var Nt = {}, fe = Ct(Nt), we = Ct(!1), Ft = Nt;
function fn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Nt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function ke(e) {
  return e = e.childContextTypes, e != null;
}
function tl() {
  Q(we), Q(fe);
}
function ba(e, t, n) {
  if (fe.current !== Nt) throw Error(N(168));
  H(fe, t), H(we, n);
}
function vu(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(N(108, od(e) || "Unknown", l));
  return G({}, n, r);
}
function nl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Nt, Ft = fe.current, H(fe, e), H(we, we.current), !0;
}
function za(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(N(169));
  n ? (e = vu(e, t, Ft), r.__reactInternalMemoizedMergedChildContext = e, Q(we), Q(fe), H(fe, e)) : Q(we), H(we, n);
}
var qe = null, Sl = !1, Zl = !1;
function gu(e) {
  qe === null ? qe = [e] : qe.push(e);
}
function Sf(e) {
  Sl = !0, gu(e);
}
function Et() {
  if (!Zl && qe !== null) {
    Zl = !0;
    var e = 0, t = B;
    try {
      var n = qe;
      for (B = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      qe = null, Sl = !1;
    } catch (l) {
      throw qe !== null && (qe = qe.slice(e + 1)), Bs(fi, Et), l;
    } finally {
      B = t, Zl = !1;
    }
  }
  return null;
}
var qt = [], en = 0, rl = null, ll = 0, Pe = [], Te = 0, Dt = null, et = 1, tt = "";
function zt(e, t) {
  qt[en++] = ll, qt[en++] = rl, rl = e, ll = t;
}
function xu(e, t, n) {
  Pe[Te++] = et, Pe[Te++] = tt, Pe[Te++] = Dt, Dt = e;
  var r = et;
  e = tt;
  var l = 32 - Ae(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - Ae(t) + l;
  if (30 < o) {
    var a = l - l % 5;
    o = (r & (1 << a) - 1).toString(32), r >>= a, l -= a, et = 1 << 32 - Ae(t) + l | n << l | r, tt = o + e;
  } else et = 1 << o | n << l | r, tt = e;
}
function ki(e) {
  e.return !== null && (zt(e, 1), xu(e, 1, 0));
}
function ji(e) {
  for (; e === rl; ) rl = qt[--en], qt[en] = null, ll = qt[--en], qt[en] = null;
  for (; e === Dt; ) Dt = Pe[--Te], Pe[Te] = null, tt = Pe[--Te], Pe[Te] = null, et = Pe[--Te], Pe[Te] = null;
}
var Ce = null, _e = null, K = !1, Ie = null;
function yu(e, t) {
  var n = $e(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Pa(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Ce = e, _e = xt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Ce = e, _e = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Dt !== null ? { id: et, overflow: tt } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = $e(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ce = e, _e = null, !0) : !1;
    default:
      return !1;
  }
}
function Ro(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Oo(e) {
  if (K) {
    var t = _e;
    if (t) {
      var n = t;
      if (!Pa(e, t)) {
        if (Ro(e)) throw Error(N(418));
        t = xt(n.nextSibling);
        var r = Ce;
        t && Pa(e, t) ? yu(r, n) : (e.flags = e.flags & -4097 | 2, K = !1, Ce = e);
      }
    } else {
      if (Ro(e)) throw Error(N(418));
      e.flags = e.flags & -4097 | 2, K = !1, Ce = e;
    }
  }
}
function Ta(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Ce = e;
}
function _r(e) {
  if (e !== Ce) return !1;
  if (!K) return Ta(e), K = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !To(e.type, e.memoizedProps)), t && (t = _e)) {
    if (Ro(e)) throw wu(), Error(N(418));
    for (; t; ) yu(e, t), t = xt(t.nextSibling);
  }
  if (Ta(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(N(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              _e = xt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      _e = null;
    }
  } else _e = Ce ? xt(e.stateNode.nextSibling) : null;
  return !0;
}
function wu() {
  for (var e = _e; e; ) e = xt(e.nextSibling);
}
function pn() {
  _e = Ce = null, K = !1;
}
function Si(e) {
  Ie === null ? Ie = [e] : Ie.push(e);
}
var Nf = at.ReactCurrentBatchConfig;
function Cn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(N(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(N(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(a) {
        var s = l.refs;
        a === null ? delete s[o] : s[o] = a;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(N(284));
    if (!n._owner) throw Error(N(290, e));
  }
  return e;
}
function Cr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(N(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function $a(e) {
  var t = e._init;
  return t(e._payload);
}
function ku(e) {
  function t(p, d) {
    if (e) {
      var f = p.deletions;
      f === null ? (p.deletions = [d], p.flags |= 16) : f.push(d);
    }
  }
  function n(p, d) {
    if (!e) return null;
    for (; d !== null; ) t(p, d), d = d.sibling;
    return null;
  }
  function r(p, d) {
    for (p = /* @__PURE__ */ new Map(); d !== null; ) d.key !== null ? p.set(d.key, d) : p.set(d.index, d), d = d.sibling;
    return p;
  }
  function l(p, d) {
    return p = jt(p, d), p.index = 0, p.sibling = null, p;
  }
  function o(p, d, f) {
    return p.index = f, e ? (f = p.alternate, f !== null ? (f = f.index, f < d ? (p.flags |= 2, d) : f) : (p.flags |= 2, d)) : (p.flags |= 1048576, d);
  }
  function a(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function s(p, d, f, x) {
    return d === null || d.tag !== 6 ? (d = lo(f, p.mode, x), d.return = p, d) : (d = l(d, f), d.return = p, d);
  }
  function u(p, d, f, x) {
    var k = f.type;
    return k === Kt ? g(p, d, f.props.children, x, f.key) : d !== null && (d.elementType === k || typeof k == "object" && k !== null && k.$$typeof === ut && $a(k) === d.type) ? (x = l(d, f.props), x.ref = Cn(p, d, f), x.return = p, x) : (x = Hr(f.type, f.key, f.props, null, p.mode, x), x.ref = Cn(p, d, f), x.return = p, x);
  }
  function c(p, d, f, x) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== f.containerInfo || d.stateNode.implementation !== f.implementation ? (d = oo(f, p.mode, x), d.return = p, d) : (d = l(d, f.children || []), d.return = p, d);
  }
  function g(p, d, f, x, k) {
    return d === null || d.tag !== 7 ? (d = Ot(f, p.mode, x, k), d.return = p, d) : (d = l(d, f), d.return = p, d);
  }
  function v(p, d, f) {
    if (typeof d == "string" && d !== "" || typeof d == "number") return d = lo("" + d, p.mode, f), d.return = p, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case mr:
          return f = Hr(d.type, d.key, d.props, null, p.mode, f), f.ref = Cn(p, null, d), f.return = p, f;
        case Qt:
          return d = oo(d, p.mode, f), d.return = p, d;
        case ut:
          var x = d._init;
          return v(p, x(d._payload), f);
      }
      if (Tn(d) || kn(d)) return d = Ot(d, p.mode, f, null), d.return = p, d;
      Cr(p, d);
    }
    return null;
  }
  function h(p, d, f, x) {
    var k = d !== null ? d.key : null;
    if (typeof f == "string" && f !== "" || typeof f == "number") return k !== null ? null : s(p, d, "" + f, x);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case mr:
          return f.key === k ? u(p, d, f, x) : null;
        case Qt:
          return f.key === k ? c(p, d, f, x) : null;
        case ut:
          return k = f._init, h(
            p,
            d,
            k(f._payload),
            x
          );
      }
      if (Tn(f) || kn(f)) return k !== null ? null : g(p, d, f, x, null);
      Cr(p, f);
    }
    return null;
  }
  function m(p, d, f, x, k) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return p = p.get(f) || null, s(d, p, "" + x, k);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case mr:
          return p = p.get(x.key === null ? f : x.key) || null, u(d, p, x, k);
        case Qt:
          return p = p.get(x.key === null ? f : x.key) || null, c(d, p, x, k);
        case ut:
          var j = x._init;
          return m(p, d, f, j(x._payload), k);
      }
      if (Tn(x) || kn(x)) return p = p.get(f) || null, g(d, p, x, k, null);
      Cr(d, x);
    }
    return null;
  }
  function y(p, d, f, x) {
    for (var k = null, j = null, z = d, C = d = 0, b = null; z !== null && C < f.length; C++) {
      z.index > C ? (b = z, z = null) : b = z.sibling;
      var R = h(p, z, f[C], x);
      if (R === null) {
        z === null && (z = b);
        break;
      }
      e && z && R.alternate === null && t(p, z), d = o(R, d, C), j === null ? k = R : j.sibling = R, j = R, z = b;
    }
    if (C === f.length) return n(p, z), K && zt(p, C), k;
    if (z === null) {
      for (; C < f.length; C++) z = v(p, f[C], x), z !== null && (d = o(z, d, C), j === null ? k = z : j.sibling = z, j = z);
      return K && zt(p, C), k;
    }
    for (z = r(p, z); C < f.length; C++) b = m(z, p, C, f[C], x), b !== null && (e && b.alternate !== null && z.delete(b.key === null ? C : b.key), d = o(b, d, C), j === null ? k = b : j.sibling = b, j = b);
    return e && z.forEach(function(E) {
      return t(p, E);
    }), K && zt(p, C), k;
  }
  function w(p, d, f, x) {
    var k = kn(f);
    if (typeof k != "function") throw Error(N(150));
    if (f = k.call(f), f == null) throw Error(N(151));
    for (var j = k = null, z = d, C = d = 0, b = null, R = f.next(); z !== null && !R.done; C++, R = f.next()) {
      z.index > C ? (b = z, z = null) : b = z.sibling;
      var E = h(p, z, R.value, x);
      if (E === null) {
        z === null && (z = b);
        break;
      }
      e && z && E.alternate === null && t(p, z), d = o(E, d, C), j === null ? k = E : j.sibling = E, j = E, z = b;
    }
    if (R.done) return n(
      p,
      z
    ), K && zt(p, C), k;
    if (z === null) {
      for (; !R.done; C++, R = f.next()) R = v(p, R.value, x), R !== null && (d = o(R, d, C), j === null ? k = R : j.sibling = R, j = R);
      return K && zt(p, C), k;
    }
    for (z = r(p, z); !R.done; C++, R = f.next()) R = m(z, p, C, R.value, x), R !== null && (e && R.alternate !== null && z.delete(R.key === null ? C : R.key), d = o(R, d, C), j === null ? k = R : j.sibling = R, j = R);
    return e && z.forEach(function(F) {
      return t(p, F);
    }), K && zt(p, C), k;
  }
  function $(p, d, f, x) {
    if (typeof f == "object" && f !== null && f.type === Kt && f.key === null && (f = f.props.children), typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case mr:
          e: {
            for (var k = f.key, j = d; j !== null; ) {
              if (j.key === k) {
                if (k = f.type, k === Kt) {
                  if (j.tag === 7) {
                    n(p, j.sibling), d = l(j, f.props.children), d.return = p, p = d;
                    break e;
                  }
                } else if (j.elementType === k || typeof k == "object" && k !== null && k.$$typeof === ut && $a(k) === j.type) {
                  n(p, j.sibling), d = l(j, f.props), d.ref = Cn(p, j, f), d.return = p, p = d;
                  break e;
                }
                n(p, j);
                break;
              } else t(p, j);
              j = j.sibling;
            }
            f.type === Kt ? (d = Ot(f.props.children, p.mode, x, f.key), d.return = p, p = d) : (x = Hr(f.type, f.key, f.props, null, p.mode, x), x.ref = Cn(p, d, f), x.return = p, p = x);
          }
          return a(p);
        case Qt:
          e: {
            for (j = f.key; d !== null; ) {
              if (d.key === j) if (d.tag === 4 && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                n(p, d.sibling), d = l(d, f.children || []), d.return = p, p = d;
                break e;
              } else {
                n(p, d);
                break;
              }
              else t(p, d);
              d = d.sibling;
            }
            d = oo(f, p.mode, x), d.return = p, p = d;
          }
          return a(p);
        case ut:
          return j = f._init, $(p, d, j(f._payload), x);
      }
      if (Tn(f)) return y(p, d, f, x);
      if (kn(f)) return w(p, d, f, x);
      Cr(p, f);
    }
    return typeof f == "string" && f !== "" || typeof f == "number" ? (f = "" + f, d !== null && d.tag === 6 ? (n(p, d.sibling), d = l(d, f), d.return = p, p = d) : (n(p, d), d = lo(f, p.mode, x), d.return = p, p = d), a(p)) : n(p, d);
  }
  return $;
}
var hn = ku(!0), ju = ku(!1), ol = Ct(null), il = null, tn = null, Ni = null;
function _i() {
  Ni = tn = il = null;
}
function Ci(e) {
  var t = ol.current;
  Q(ol), e._currentValue = t;
}
function Fo(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function un(e, t) {
  il = e, Ni = tn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (ye = !0), e.firstContext = null);
}
function Me(e) {
  var t = e._currentValue;
  if (Ni !== e) if (e = { context: e, memoizedValue: t, next: null }, tn === null) {
    if (il === null) throw Error(N(308));
    tn = e, il.dependencies = { lanes: 0, firstContext: e };
  } else tn = tn.next = e;
  return t;
}
var $t = null;
function Ei(e) {
  $t === null ? $t = [e] : $t.push(e);
}
function Su(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Ei(t)) : (n.next = l.next, l.next = n), t.interleaved = n, ot(e, r);
}
function ot(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var ct = !1;
function bi(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Nu(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function nt(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function yt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, A & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, ot(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Ei(r)) : (t.next = l.next, l.next = t), r.interleaved = t, ot(e, n);
}
function Fr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, pi(e, n);
  }
}
function La(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, o = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var a = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        o === null ? l = o = a : o = o.next = a, n = n.next;
      } while (n !== null);
      o === null ? l = o = t : o = o.next = t;
    } else l = o = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function al(e, t, n, r) {
  var l = e.updateQueue;
  ct = !1;
  var o = l.firstBaseUpdate, a = l.lastBaseUpdate, s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var u = s, c = u.next;
    u.next = null, a === null ? o = c : a.next = c, a = u;
    var g = e.alternate;
    g !== null && (g = g.updateQueue, s = g.lastBaseUpdate, s !== a && (s === null ? g.firstBaseUpdate = c : s.next = c, g.lastBaseUpdate = u));
  }
  if (o !== null) {
    var v = l.baseState;
    a = 0, g = c = u = null, s = o;
    do {
      var h = s.lane, m = s.eventTime;
      if ((r & h) === h) {
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
          switch (h = t, m = n, w.tag) {
            case 1:
              if (y = w.payload, typeof y == "function") {
                v = y.call(m, v, h);
                break e;
              }
              v = y;
              break e;
            case 3:
              y.flags = y.flags & -65537 | 128;
            case 0:
              if (y = w.payload, h = typeof y == "function" ? y.call(m, v, h) : y, h == null) break e;
              v = G({}, v, h);
              break e;
            case 2:
              ct = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [s] : h.push(s));
      } else m = { eventTime: m, lane: h, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, g === null ? (c = g = m, u = v) : g = g.next = m, a |= h;
      if (s = s.next, s === null) {
        if (s = l.shared.pending, s === null) break;
        h = s, s = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (g === null && (u = v), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = g, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        a |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    At |= a, e.lanes = a, e.memoizedState = v;
  }
}
function Ma(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(N(191, l));
      l.call(r);
    }
  }
}
var dr = {}, Ze = Ct(dr), tr = Ct(dr), nr = Ct(dr);
function Lt(e) {
  if (e === dr) throw Error(N(174));
  return e;
}
function zi(e, t) {
  switch (H(nr, t), H(tr, e), H(Ze, dr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : go(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = go(t, e);
  }
  Q(Ze), H(Ze, t);
}
function mn() {
  Q(Ze), Q(tr), Q(nr);
}
function _u(e) {
  Lt(nr.current);
  var t = Lt(Ze.current), n = go(t, e.type);
  t !== n && (H(tr, e), H(Ze, n));
}
function Pi(e) {
  tr.current === e && (Q(Ze), Q(tr));
}
var Y = Ct(0);
function sl(e) {
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
var Jl = [];
function Ti() {
  for (var e = 0; e < Jl.length; e++) Jl[e]._workInProgressVersionPrimary = null;
  Jl.length = 0;
}
var Dr = at.ReactCurrentDispatcher, ql = at.ReactCurrentBatchConfig, It = 0, X = null, ee = null, re = null, ul = !1, In = !1, rr = 0, _f = 0;
function ue() {
  throw Error(N(321));
}
function $i(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Be(e[n], t[n])) return !1;
  return !0;
}
function Li(e, t, n, r, l, o) {
  if (It = o, X = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Dr.current = e === null || e.memoizedState === null ? zf : Pf, e = n(r, l), In) {
    o = 0;
    do {
      if (In = !1, rr = 0, 25 <= o) throw Error(N(301));
      o += 1, re = ee = null, t.updateQueue = null, Dr.current = Tf, e = n(r, l);
    } while (In);
  }
  if (Dr.current = cl, t = ee !== null && ee.next !== null, It = 0, re = ee = X = null, ul = !1, t) throw Error(N(300));
  return e;
}
function Mi() {
  var e = rr !== 0;
  return rr = 0, e;
}
function Ye() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return re === null ? X.memoizedState = re = e : re = re.next = e, re;
}
function Re() {
  if (ee === null) {
    var e = X.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ee.next;
  var t = re === null ? X.memoizedState : re.next;
  if (t !== null) re = t, ee = e;
  else {
    if (e === null) throw Error(N(310));
    ee = e, e = { memoizedState: ee.memoizedState, baseState: ee.baseState, baseQueue: ee.baseQueue, queue: ee.queue, next: null }, re === null ? X.memoizedState = re = e : re = re.next = e;
  }
  return re;
}
function lr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function eo(e) {
  var t = Re(), n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = ee, l = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var a = l.next;
      l.next = o.next, o.next = a;
    }
    r.baseQueue = l = o, n.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var s = a = null, u = null, c = o;
    do {
      var g = c.lane;
      if ((It & g) === g) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var v = {
          lane: g,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (s = u = v, a = r) : u = u.next = v, X.lanes |= g, At |= g;
      }
      c = c.next;
    } while (c !== null && c !== o);
    u === null ? a = r : u.next = s, Be(r, t.memoizedState) || (ye = !0), t.memoizedState = r, t.baseState = a, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, X.lanes |= o, At |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function to(e) {
  var t = Re(), n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var a = l = l.next;
    do
      o = e(o, a.action), a = a.next;
    while (a !== l);
    Be(o, t.memoizedState) || (ye = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function Cu() {
}
function Eu(e, t) {
  var n = X, r = Re(), l = t(), o = !Be(r.memoizedState, l);
  if (o && (r.memoizedState = l, ye = !0), r = r.queue, Ri(Pu.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || re !== null && re.memoizedState.tag & 1) {
    if (n.flags |= 2048, or(9, zu.bind(null, n, r, l, t), void 0, null), le === null) throw Error(N(349));
    It & 30 || bu(n, t, l);
  }
  return l;
}
function bu(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = X.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, X.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function zu(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Tu(t) && $u(e);
}
function Pu(e, t, n) {
  return n(function() {
    Tu(t) && $u(e);
  });
}
function Tu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Be(e, n);
  } catch {
    return !0;
  }
}
function $u(e) {
  var t = ot(e, 1);
  t !== null && Ue(t, e, 1, -1);
}
function Ra(e) {
  var t = Ye();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: lr, lastRenderedState: e }, t.queue = e, e = e.dispatch = bf.bind(null, X, e), [t.memoizedState, e];
}
function or(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = X.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, X.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Lu() {
  return Re().memoizedState;
}
function Ir(e, t, n, r) {
  var l = Ye();
  X.flags |= e, l.memoizedState = or(1 | t, n, void 0, r === void 0 ? null : r);
}
function Nl(e, t, n, r) {
  var l = Re();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ee !== null) {
    var a = ee.memoizedState;
    if (o = a.destroy, r !== null && $i(r, a.deps)) {
      l.memoizedState = or(t, n, o, r);
      return;
    }
  }
  X.flags |= e, l.memoizedState = or(1 | t, n, o, r);
}
function Oa(e, t) {
  return Ir(8390656, 8, e, t);
}
function Ri(e, t) {
  return Nl(2048, 8, e, t);
}
function Mu(e, t) {
  return Nl(4, 2, e, t);
}
function Ru(e, t) {
  return Nl(4, 4, e, t);
}
function Ou(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Fu(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Nl(4, 4, Ou.bind(null, t, e), n);
}
function Oi() {
}
function Du(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && $i(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Iu(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && $i(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Au(e, t, n) {
  return It & 21 ? (Be(n, t) || (n = Vs(), X.lanes |= n, At |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, ye = !0), e.memoizedState = n);
}
function Cf(e, t) {
  var n = B;
  B = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = ql.transition;
  ql.transition = {};
  try {
    e(!1), t();
  } finally {
    B = n, ql.transition = r;
  }
}
function Uu() {
  return Re().memoizedState;
}
function Ef(e, t, n) {
  var r = kt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Bu(e)) Hu(t, n);
  else if (n = Su(e, t, n, r), n !== null) {
    var l = he();
    Ue(n, e, r, l), Wu(n, t, r);
  }
}
function bf(e, t, n) {
  var r = kt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Bu(e)) Hu(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var a = t.lastRenderedState, s = o(a, n);
      if (l.hasEagerState = !0, l.eagerState = s, Be(s, a)) {
        var u = t.interleaved;
        u === null ? (l.next = l, Ei(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Su(e, t, l, r), n !== null && (l = he(), Ue(n, e, r, l), Wu(n, t, r));
  }
}
function Bu(e) {
  var t = e.alternate;
  return e === X || t !== null && t === X;
}
function Hu(e, t) {
  In = ul = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Wu(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, pi(e, n);
  }
}
var cl = { readContext: Me, useCallback: ue, useContext: ue, useEffect: ue, useImperativeHandle: ue, useInsertionEffect: ue, useLayoutEffect: ue, useMemo: ue, useReducer: ue, useRef: ue, useState: ue, useDebugValue: ue, useDeferredValue: ue, useTransition: ue, useMutableSource: ue, useSyncExternalStore: ue, useId: ue, unstable_isNewReconciler: !1 }, zf = { readContext: Me, useCallback: function(e, t) {
  return Ye().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Me, useEffect: Oa, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ir(
    4194308,
    4,
    Ou.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Ir(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Ir(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ye();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ye();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Ef.bind(null, X, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ye();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ra, useDebugValue: Oi, useDeferredValue: function(e) {
  return Ye().memoizedState = e;
}, useTransition: function() {
  var e = Ra(!1), t = e[0];
  return e = Cf.bind(null, e[1]), Ye().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = X, l = Ye();
  if (K) {
    if (n === void 0) throw Error(N(407));
    n = n();
  } else {
    if (n = t(), le === null) throw Error(N(349));
    It & 30 || bu(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Oa(Pu.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, or(9, zu.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Ye(), t = le.identifierPrefix;
  if (K) {
    var n = tt, r = et;
    n = (r & ~(1 << 32 - Ae(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = rr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = _f++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Pf = {
  readContext: Me,
  useCallback: Du,
  useContext: Me,
  useEffect: Ri,
  useImperativeHandle: Fu,
  useInsertionEffect: Mu,
  useLayoutEffect: Ru,
  useMemo: Iu,
  useReducer: eo,
  useRef: Lu,
  useState: function() {
    return eo(lr);
  },
  useDebugValue: Oi,
  useDeferredValue: function(e) {
    var t = Re();
    return Au(t, ee.memoizedState, e);
  },
  useTransition: function() {
    var e = eo(lr)[0], t = Re().memoizedState;
    return [e, t];
  },
  useMutableSource: Cu,
  useSyncExternalStore: Eu,
  useId: Uu,
  unstable_isNewReconciler: !1
}, Tf = { readContext: Me, useCallback: Du, useContext: Me, useEffect: Ri, useImperativeHandle: Fu, useInsertionEffect: Mu, useLayoutEffect: Ru, useMemo: Iu, useReducer: to, useRef: Lu, useState: function() {
  return to(lr);
}, useDebugValue: Oi, useDeferredValue: function(e) {
  var t = Re();
  return ee === null ? t.memoizedState = e : Au(t, ee.memoizedState, e);
}, useTransition: function() {
  var e = to(lr)[0], t = Re().memoizedState;
  return [e, t];
}, useMutableSource: Cu, useSyncExternalStore: Eu, useId: Uu, unstable_isNewReconciler: !1 };
function Fe(e, t) {
  if (e && e.defaultProps) {
    t = G({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Do(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : G({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var _l = { isMounted: function(e) {
  return (e = e._reactInternals) ? Ht(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), l = kt(e), o = nt(r, l);
  o.payload = t, n != null && (o.callback = n), t = yt(e, o, l), t !== null && (Ue(t, e, l, r), Fr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), l = kt(e), o = nt(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = yt(e, o, l), t !== null && (Ue(t, e, l, r), Fr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = he(), r = kt(e), l = nt(n, r);
  l.tag = 2, t != null && (l.callback = t), t = yt(e, l, r), t !== null && (Ue(t, e, r, n), Fr(t, e, r));
} };
function Fa(e, t, n, r, l, o, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, a) : t.prototype && t.prototype.isPureReactComponent ? !Zn(n, r) || !Zn(l, o) : !0;
}
function Vu(e, t, n) {
  var r = !1, l = Nt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Me(o) : (l = ke(t) ? Ft : fe.current, r = t.contextTypes, o = (r = r != null) ? fn(e, l) : Nt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = _l, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Da(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && _l.enqueueReplaceState(t, t.state, null);
}
function Io(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, bi(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = Me(o) : (o = ke(t) ? Ft : fe.current, l.context = fn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Do(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && _l.enqueueReplaceState(l, l.state, null), al(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function vn(e, t) {
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
function no(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Ao(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var $f = typeof WeakMap == "function" ? WeakMap : Map;
function Qu(e, t, n) {
  n = nt(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    fl || (fl = !0, Go = r), Ao(e, t);
  }, n;
}
function Ku(e, t, n) {
  n = nt(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Ao(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Ao(e, t), typeof r != "function" && (wt === null ? wt = /* @__PURE__ */ new Set([this]) : wt.add(this));
    var a = t.stack;
    this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
  }), n;
}
function Ia(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new $f();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Qf.bind(null, e, t, n), t.then(e, e));
}
function Aa(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ua(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = nt(-1, 1), t.tag = 2, yt(n, t, 1))), n.lanes |= 1), e);
}
var Lf = at.ReactCurrentOwner, ye = !1;
function pe(e, t, n, r) {
  t.child = e === null ? ju(t, null, n, r) : hn(t, e.child, n, r);
}
function Ba(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return un(t, l), r = Li(e, t, n, r, o, l), n = Mi(), e !== null && !ye ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, it(e, t, l)) : (K && n && ki(t), t.flags |= 1, pe(e, t, r, l), t.child);
}
function Ha(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Wi(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Yu(e, t, o, r, l)) : (e = Hr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var a = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Zn, n(a, r) && e.ref === t.ref) return it(e, t, l);
  }
  return t.flags |= 1, e = jt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Yu(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Zn(o, r) && e.ref === t.ref) if (ye = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (ye = !0);
    else return t.lanes = e.lanes, it(e, t, l);
  }
  return Uo(e, t, n, r, l);
}
function Xu(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, H(rn, Ne), Ne |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, H(rn, Ne), Ne |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, H(rn, Ne), Ne |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, H(rn, Ne), Ne |= r;
  return pe(e, t, l, n), t.child;
}
function Gu(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Uo(e, t, n, r, l) {
  var o = ke(n) ? Ft : fe.current;
  return o = fn(t, o), un(t, l), n = Li(e, t, n, r, o, l), r = Mi(), e !== null && !ye ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, it(e, t, l)) : (K && r && ki(t), t.flags |= 1, pe(e, t, n, l), t.child);
}
function Wa(e, t, n, r, l) {
  if (ke(n)) {
    var o = !0;
    nl(t);
  } else o = !1;
  if (un(t, l), t.stateNode === null) Ar(e, t), Vu(t, n, r), Io(t, n, r, l), r = !0;
  else if (e === null) {
    var a = t.stateNode, s = t.memoizedProps;
    a.props = s;
    var u = a.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Me(c) : (c = ke(n) ? Ft : fe.current, c = fn(t, c));
    var g = n.getDerivedStateFromProps, v = typeof g == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    v || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s !== r || u !== c) && Da(t, a, r, c), ct = !1;
    var h = t.memoizedState;
    a.state = h, al(t, r, a, l), u = t.memoizedState, s !== r || h !== u || we.current || ct ? (typeof g == "function" && (Do(t, n, g, r), u = t.memoizedState), (s = ct || Fa(t, n, s, r, h, u, c)) ? (v || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), a.props = r, a.state = u, a.context = c, r = s) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    a = t.stateNode, Nu(e, t), s = t.memoizedProps, c = t.type === t.elementType ? s : Fe(t.type, s), a.props = c, v = t.pendingProps, h = a.context, u = n.contextType, typeof u == "object" && u !== null ? u = Me(u) : (u = ke(n) ? Ft : fe.current, u = fn(t, u));
    var m = n.getDerivedStateFromProps;
    (g = typeof m == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s !== v || h !== u) && Da(t, a, r, u), ct = !1, h = t.memoizedState, a.state = h, al(t, r, a, l);
    var y = t.memoizedState;
    s !== v || h !== y || we.current || ct ? (typeof m == "function" && (Do(t, n, m, r), y = t.memoizedState), (c = ct || Fa(t, n, c, r, h, y, u) || !1) ? (g || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, y, u), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, y, u)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = y), a.props = r, a.state = y, a.context = u, r = c) : (typeof a.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Bo(e, t, n, r, o, l);
}
function Bo(e, t, n, r, l, o) {
  Gu(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return l && za(t, n, !1), it(e, t, o);
  r = t.stateNode, Lf.current = t;
  var s = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && a ? (t.child = hn(t, e.child, null, o), t.child = hn(t, null, s, o)) : pe(e, t, s, o), t.memoizedState = r.state, l && za(t, n, !0), t.child;
}
function Zu(e) {
  var t = e.stateNode;
  t.pendingContext ? ba(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ba(e, t.context, !1), zi(e, t.containerInfo);
}
function Va(e, t, n, r, l) {
  return pn(), Si(l), t.flags |= 256, pe(e, t, n, r), t.child;
}
var Ho = { dehydrated: null, treeContext: null, retryLane: 0 };
function Wo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ju(e, t, n) {
  var r = t.pendingProps, l = Y.current, o = !1, a = (t.flags & 128) !== 0, s;
  if ((s = a) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), H(Y, l & 1), e === null)
    return Oo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = bl(a, r, 0, null), e = Ot(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Wo(n), t.memoizedState = Ho, e) : Fi(t, a));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null)) return Mf(e, t, a, r, s, l, n);
  if (o) {
    o = r.fallback, a = t.mode, l = e.child, s = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(a & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = jt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? o = jt(s, o) : (o = Ot(o, a, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, a = e.child.memoizedState, a = a === null ? Wo(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = Ho, r;
  }
  return o = e.child, e = o.sibling, r = jt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Fi(e, t) {
  return t = bl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Er(e, t, n, r) {
  return r !== null && Si(r), hn(t, e.child, null, n), e = Fi(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Mf(e, t, n, r, l, o, a) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = no(Error(N(422))), Er(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = bl({ mode: "visible", children: r.children }, l, 0, null), o = Ot(o, l, a, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && hn(t, e.child, null, a), t.child.memoizedState = Wo(a), t.memoizedState = Ho, o);
  if (!(t.mode & 1)) return Er(e, t, a, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var s = r.dgst;
    return r = s, o = Error(N(419)), r = no(o, r, void 0), Er(e, t, a, r);
  }
  if (s = (a & e.childLanes) !== 0, ye || s) {
    if (r = le, r !== null) {
      switch (a & -a) {
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
      l = l & (r.suspendedLanes | a) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, ot(e, l), Ue(r, e, l, -1));
    }
    return Hi(), r = no(Error(N(421))), Er(e, t, a, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Kf.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, _e = xt(l.nextSibling), Ce = t, K = !0, Ie = null, e !== null && (Pe[Te++] = et, Pe[Te++] = tt, Pe[Te++] = Dt, et = e.id, tt = e.overflow, Dt = t), t = Fi(t, r.children), t.flags |= 4096, t);
}
function Qa(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Fo(e.return, t, n);
}
function ro(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function qu(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (pe(e, t, r.children, n), r = Y.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Qa(e, n, t);
      else if (e.tag === 19) Qa(e, n, t);
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
  if (H(Y, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && sl(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), ro(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && sl(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      ro(t, !0, n, null, o);
      break;
    case "together":
      ro(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Ar(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function it(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), At |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(N(153));
  if (t.child !== null) {
    for (e = t.child, n = jt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = jt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Rf(e, t, n) {
  switch (t.tag) {
    case 3:
      Zu(t), pn();
      break;
    case 5:
      _u(t);
      break;
    case 1:
      ke(t.type) && nl(t);
      break;
    case 4:
      zi(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      H(ol, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (H(Y, Y.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Ju(e, t, n) : (H(Y, Y.current & 1), e = it(e, t, n), e !== null ? e.sibling : null);
      H(Y, Y.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return qu(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), H(Y, Y.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Xu(e, t, n);
  }
  return it(e, t, n);
}
var ec, Vo, tc, nc;
ec = function(e, t) {
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
Vo = function() {
};
tc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Lt(Ze.current);
    var o = null;
    switch (n) {
      case "input":
        l = po(e, l), r = po(e, r), o = [];
        break;
      case "select":
        l = G({}, l, { value: void 0 }), r = G({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = vo(e, l), r = vo(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = el);
    }
    xo(n, r);
    var a;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var s = l[c];
      for (a in s) s.hasOwnProperty(a) && (n || (n = {}), n[a] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Wn.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (s = l != null ? l[c] : void 0, r.hasOwnProperty(c) && u !== s && (u != null || s != null)) if (c === "style") if (s) {
        for (a in s) !s.hasOwnProperty(a) || u && u.hasOwnProperty(a) || (n || (n = {}), n[a] = "");
        for (a in u) u.hasOwnProperty(a) && s[a] !== u[a] && (n || (n = {}), n[a] = u[a]);
      } else n || (o || (o = []), o.push(
        c,
        n
      )), n = u;
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, s = s ? s.__html : void 0, u != null && s !== u && (o = o || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Wn.hasOwnProperty(c) ? (u != null && c === "onScroll" && V("scroll", e), o || s === u || (o = [])) : (o = o || []).push(c, u));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
nc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function En(e, t) {
  if (!K) switch (e.tailMode) {
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
function Of(e, t, n) {
  var r = t.pendingProps;
  switch (ji(t), t.tag) {
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
      return ke(t.type) && tl(), ce(t), null;
    case 3:
      return r = t.stateNode, mn(), Q(we), Q(fe), Ti(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (_r(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ie !== null && (qo(Ie), Ie = null))), Vo(e, t), ce(t), null;
    case 5:
      Pi(t);
      var l = Lt(nr.current);
      if (n = t.type, e !== null && t.stateNode != null) tc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(N(166));
          return ce(t), null;
        }
        if (e = Lt(Ze.current), _r(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Xe] = t, r[er] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              V("cancel", r), V("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              V("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Ln.length; l++) V(Ln[l], r);
              break;
            case "source":
              V("error", r);
              break;
            case "img":
            case "image":
            case "link":
              V(
                "error",
                r
              ), V("load", r);
              break;
            case "details":
              V("toggle", r);
              break;
            case "input":
              ta(r, o), V("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, V("invalid", r);
              break;
            case "textarea":
              ra(r, o), V("invalid", r);
          }
          xo(n, o), l = null;
          for (var a in o) if (o.hasOwnProperty(a)) {
            var s = o[a];
            a === "children" ? typeof s == "string" ? r.textContent !== s && (o.suppressHydrationWarning !== !0 && Nr(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (o.suppressHydrationWarning !== !0 && Nr(
              r.textContent,
              s,
              e
            ), l = ["children", "" + s]) : Wn.hasOwnProperty(a) && s != null && a === "onScroll" && V("scroll", r);
          }
          switch (n) {
            case "input":
              vr(r), na(r, o, !0);
              break;
            case "textarea":
              vr(r), la(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = el);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          a = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ps(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = a.createElement(n, { is: r.is }) : (e = a.createElement(n), n === "select" && (a = e, r.multiple ? a.multiple = !0 : r.size && (a.size = r.size))) : e = a.createElementNS(e, n), e[Xe] = t, e[er] = r, ec(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (a = yo(n, r), n) {
              case "dialog":
                V("cancel", e), V("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                V("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Ln.length; l++) V(Ln[l], e);
                l = r;
                break;
              case "source":
                V("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                V(
                  "error",
                  e
                ), V("load", e), l = r;
                break;
              case "details":
                V("toggle", e), l = r;
                break;
              case "input":
                ta(e, r), l = po(e, r), V("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = G({}, r, { value: void 0 }), V("invalid", e);
                break;
              case "textarea":
                ra(e, r), l = vo(e, r), V("invalid", e);
                break;
              default:
                l = r;
            }
            xo(n, l), s = l;
            for (o in s) if (s.hasOwnProperty(o)) {
              var u = s[o];
              o === "style" ? Ls(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Ts(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Vn(e, u) : typeof u == "number" && Vn(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Wn.hasOwnProperty(o) ? u != null && o === "onScroll" && V("scroll", e) : u != null && ai(e, o, u, a));
            }
            switch (n) {
              case "input":
                vr(e), na(e, r, !1);
                break;
              case "textarea":
                vr(e), la(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + St(r.value));
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
                typeof l.onClick == "function" && (e.onclick = el);
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
      if (e && t.stateNode != null) nc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(N(166));
        if (n = Lt(nr.current), Lt(Ze.current), _r(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Xe] = t, (o = r.nodeValue !== n) && (e = Ce, e !== null)) switch (e.tag) {
            case 3:
              Nr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Nr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Xe] = t, t.stateNode = r;
      }
      return ce(t), null;
    case 13:
      if (Q(Y), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (K && _e !== null && t.mode & 1 && !(t.flags & 128)) wu(), pn(), t.flags |= 98560, o = !1;
        else if (o = _r(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(N(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(N(317));
            o[Xe] = t;
          } else pn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ce(t), o = !1;
        } else Ie !== null && (qo(Ie), Ie = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Y.current & 1 ? te === 0 && (te = 3) : Hi())), t.updateQueue !== null && (t.flags |= 4), ce(t), null);
    case 4:
      return mn(), Vo(e, t), e === null && Jn(t.stateNode.containerInfo), ce(t), null;
    case 10:
      return Ci(t.type._context), ce(t), null;
    case 17:
      return ke(t.type) && tl(), ce(t), null;
    case 19:
      if (Q(Y), o = t.memoizedState, o === null) return ce(t), null;
      if (r = (t.flags & 128) !== 0, a = o.rendering, a === null) if (r) En(o, !1);
      else {
        if (te !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (a = sl(e), a !== null) {
            for (t.flags |= 128, En(o, !1), r = a.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return H(Y, Y.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && J() > gn && (t.flags |= 128, r = !0, En(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = sl(a), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), En(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !K) return ce(t), null;
        } else 2 * J() - o.renderingStartTime > gn && n !== 1073741824 && (t.flags |= 128, r = !0, En(o, !1), t.lanes = 4194304);
        o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = J(), t.sibling = null, n = Y.current, H(Y, r ? n & 1 | 2 : n & 1), t) : (ce(t), null);
    case 22:
    case 23:
      return Bi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Ne & 1073741824 && (ce(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ce(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(N(156, t.tag));
}
function Ff(e, t) {
  switch (ji(t), t.tag) {
    case 1:
      return ke(t.type) && tl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return mn(), Q(we), Q(fe), Ti(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Pi(t), null;
    case 13:
      if (Q(Y), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(N(340));
        pn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Q(Y), null;
    case 4:
      return mn(), null;
    case 10:
      return Ci(t.type._context), null;
    case 22:
    case 23:
      return Bi(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var br = !1, de = !1, Df = typeof WeakSet == "function" ? WeakSet : Set, L = null;
function nn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    Z(e, t, r);
  }
  else n.current = null;
}
function Qo(e, t, n) {
  try {
    n();
  } catch (r) {
    Z(e, t, r);
  }
}
var Ka = !1;
function If(e, t) {
  if (zo = Zr, e = au(), wi(e)) {
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
        var a = 0, s = -1, u = -1, c = 0, g = 0, v = e, h = null;
        t: for (; ; ) {
          for (var m; v !== n || l !== 0 && v.nodeType !== 3 || (s = a + l), v !== o || r !== 0 && v.nodeType !== 3 || (u = a + r), v.nodeType === 3 && (a += v.nodeValue.length), (m = v.firstChild) !== null; )
            h = v, v = m;
          for (; ; ) {
            if (v === e) break t;
            if (h === n && ++c === l && (s = a), h === o && ++g === r && (u = a), (m = v.nextSibling) !== null) break;
            v = h, h = v.parentNode;
          }
          v = m;
        }
        n = s === -1 || u === -1 ? null : { start: s, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Po = { focusedElem: e, selectionRange: n }, Zr = !1, L = t; L !== null; ) if (t = L, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, L = e;
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
            var w = y.memoizedProps, $ = y.memoizedState, p = t.stateNode, d = p.getSnapshotBeforeUpdate(t.elementType === t.type ? w : Fe(t.type, w), $);
            p.__reactInternalSnapshotBeforeUpdate = d;
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
          throw Error(N(163));
      }
    } catch (x) {
      Z(t, t.return, x);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, L = e;
      break;
    }
    L = t.return;
  }
  return y = Ka, Ka = !1, y;
}
function An(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Qo(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Cl(e, t) {
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
function Ko(e) {
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
function rc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, rc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Xe], delete t[er], delete t[Lo], delete t[kf], delete t[jf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function lc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ya(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || lc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Yo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = el));
  else if (r !== 4 && (e = e.child, e !== null)) for (Yo(e, t, n), e = e.sibling; e !== null; ) Yo(e, t, n), e = e.sibling;
}
function Xo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Xo(e, t, n), e = e.sibling; e !== null; ) Xo(e, t, n), e = e.sibling;
}
var oe = null, De = !1;
function st(e, t, n) {
  for (n = n.child; n !== null; ) oc(e, t, n), n = n.sibling;
}
function oc(e, t, n) {
  if (Ge && typeof Ge.onCommitFiberUnmount == "function") try {
    Ge.onCommitFiberUnmount(xl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      de || nn(n, t);
    case 6:
      var r = oe, l = De;
      oe = null, st(e, t, n), oe = r, De = l, oe !== null && (De ? (e = oe, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : oe.removeChild(n.stateNode));
      break;
    case 18:
      oe !== null && (De ? (e = oe, n = n.stateNode, e.nodeType === 8 ? Gl(e.parentNode, n) : e.nodeType === 1 && Gl(e, n), Xn(e)) : Gl(oe, n.stateNode));
      break;
    case 4:
      r = oe, l = De, oe = n.stateNode.containerInfo, De = !0, st(e, t, n), oe = r, De = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!de && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, a = o.destroy;
          o = o.tag, a !== void 0 && (o & 2 || o & 4) && Qo(n, t, a), l = l.next;
        } while (l !== r);
      }
      st(e, t, n);
      break;
    case 1:
      if (!de && (nn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (s) {
        Z(n, t, s);
      }
      st(e, t, n);
      break;
    case 21:
      st(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (de = (r = de) || n.memoizedState !== null, st(e, t, n), de = r) : st(e, t, n);
      break;
    default:
      st(e, t, n);
  }
}
function Xa(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Df()), t.forEach(function(r) {
      var l = Yf.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Oe(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, a = t, s = a;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 5:
            oe = s.stateNode, De = !1;
            break e;
          case 3:
            oe = s.stateNode.containerInfo, De = !0;
            break e;
          case 4:
            oe = s.stateNode.containerInfo, De = !0;
            break e;
        }
        s = s.return;
      }
      if (oe === null) throw Error(N(160));
      oc(o, a, l), oe = null, De = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (c) {
      Z(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) ic(t, e), t = t.sibling;
}
function ic(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Oe(t, e), Ke(e), r & 4) {
        try {
          An(3, e, e.return), Cl(3, e);
        } catch (w) {
          Z(e, e.return, w);
        }
        try {
          An(5, e, e.return);
        } catch (w) {
          Z(e, e.return, w);
        }
      }
      break;
    case 1:
      Oe(t, e), Ke(e), r & 512 && n !== null && nn(n, n.return);
      break;
    case 5:
      if (Oe(t, e), Ke(e), r & 512 && n !== null && nn(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Vn(l, "");
        } catch (w) {
          Z(e, e.return, w);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, s = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          s === "input" && o.type === "radio" && o.name != null && bs(l, o), yo(s, a);
          var c = yo(s, o);
          for (a = 0; a < u.length; a += 2) {
            var g = u[a], v = u[a + 1];
            g === "style" ? Ls(l, v) : g === "dangerouslySetInnerHTML" ? Ts(l, v) : g === "children" ? Vn(l, v) : ai(l, g, v, c);
          }
          switch (s) {
            case "input":
              ho(l, o);
              break;
            case "textarea":
              zs(l, o);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var m = o.value;
              m != null ? ln(l, !!o.multiple, m, !1) : h !== !!o.multiple && (o.defaultValue != null ? ln(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : ln(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[er] = o;
        } catch (w) {
          Z(e, e.return, w);
        }
      }
      break;
    case 6:
      if (Oe(t, e), Ke(e), r & 4) {
        if (e.stateNode === null) throw Error(N(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (w) {
          Z(e, e.return, w);
        }
      }
      break;
    case 3:
      if (Oe(t, e), Ke(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Xn(t.containerInfo);
      } catch (w) {
        Z(e, e.return, w);
      }
      break;
    case 4:
      Oe(t, e), Ke(e);
      break;
    case 13:
      Oe(t, e), Ke(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Ai = J())), r & 4 && Xa(e);
      break;
    case 22:
      if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (de = (c = de) || g, Oe(t, e), de = c) : Oe(t, e), Ke(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !g && e.mode & 1) for (L = e, g = e.child; g !== null; ) {
          for (v = L = g; L !== null; ) {
            switch (h = L, m = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                An(4, h, h.return);
                break;
              case 1:
                nn(h, h.return);
                var y = h.stateNode;
                if (typeof y.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, y.props = t.memoizedProps, y.state = t.memoizedState, y.componentWillUnmount();
                  } catch (w) {
                    Z(r, n, w);
                  }
                }
                break;
              case 5:
                nn(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Za(v);
                  continue;
                }
            }
            m !== null ? (m.return = h, L = m) : Za(v);
          }
          g = g.sibling;
        }
        e: for (g = null, v = e; ; ) {
          if (v.tag === 5) {
            if (g === null) {
              g = v;
              try {
                l = v.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (s = v.stateNode, u = v.memoizedProps.style, a = u != null && u.hasOwnProperty("display") ? u.display : null, s.style.display = $s("display", a));
              } catch (w) {
                Z(e, e.return, w);
              }
            }
          } else if (v.tag === 6) {
            if (g === null) try {
              v.stateNode.nodeValue = c ? "" : v.memoizedProps;
            } catch (w) {
              Z(e, e.return, w);
            }
          } else if ((v.tag !== 22 && v.tag !== 23 || v.memoizedState === null || v === e) && v.child !== null) {
            v.child.return = v, v = v.child;
            continue;
          }
          if (v === e) break e;
          for (; v.sibling === null; ) {
            if (v.return === null || v.return === e) break e;
            g === v && (g = null), v = v.return;
          }
          g === v && (g = null), v.sibling.return = v.return, v = v.sibling;
        }
      }
      break;
    case 19:
      Oe(t, e), Ke(e), r & 4 && Xa(e);
      break;
    case 21:
      break;
    default:
      Oe(
        t,
        e
      ), Ke(e);
  }
}
function Ke(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (lc(n)) {
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
          var o = Ya(e);
          Xo(e, o, l);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo, s = Ya(e);
          Yo(e, s, a);
          break;
        default:
          throw Error(N(161));
      }
    } catch (u) {
      Z(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Af(e, t, n) {
  L = e, ac(e);
}
function ac(e, t, n) {
  for (var r = (e.mode & 1) !== 0; L !== null; ) {
    var l = L, o = l.child;
    if (l.tag === 22 && r) {
      var a = l.memoizedState !== null || br;
      if (!a) {
        var s = l.alternate, u = s !== null && s.memoizedState !== null || de;
        s = br;
        var c = de;
        if (br = a, (de = u) && !c) for (L = l; L !== null; ) a = L, u = a.child, a.tag === 22 && a.memoizedState !== null ? Ja(l) : u !== null ? (u.return = a, L = u) : Ja(l);
        for (; o !== null; ) L = o, ac(o), o = o.sibling;
        L = l, br = s, de = c;
      }
      Ga(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, L = o) : Ga(e);
  }
}
function Ga(e) {
  for (; L !== null; ) {
    var t = L;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            de || Cl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !de) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Fe(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Ma(t, o, r);
            break;
          case 3:
            var a = t.updateQueue;
            if (a !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              Ma(t, a, n);
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
                  var v = g.dehydrated;
                  v !== null && Xn(v);
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
        de || t.flags & 512 && Ko(t);
      } catch (h) {
        Z(t, t.return, h);
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
function Za(e) {
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
function Ja(e) {
  for (; L !== null; ) {
    var t = L;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Cl(4, t);
          } catch (u) {
            Z(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              Z(t, l, u);
            }
          }
          var o = t.return;
          try {
            Ko(t);
          } catch (u) {
            Z(t, o, u);
          }
          break;
        case 5:
          var a = t.return;
          try {
            Ko(t);
          } catch (u) {
            Z(t, a, u);
          }
      }
    } catch (u) {
      Z(t, t.return, u);
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
var Uf = Math.ceil, dl = at.ReactCurrentDispatcher, Di = at.ReactCurrentOwner, Le = at.ReactCurrentBatchConfig, A = 0, le = null, q = null, ie = 0, Ne = 0, rn = Ct(0), te = 0, ir = null, At = 0, El = 0, Ii = 0, Un = null, xe = null, Ai = 0, gn = 1 / 0, Je = null, fl = !1, Go = null, wt = null, zr = !1, ht = null, pl = 0, Bn = 0, Zo = null, Ur = -1, Br = 0;
function he() {
  return A & 6 ? J() : Ur !== -1 ? Ur : Ur = J();
}
function kt(e) {
  return e.mode & 1 ? A & 2 && ie !== 0 ? ie & -ie : Nf.transition !== null ? (Br === 0 && (Br = Vs()), Br) : (e = B, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Js(e.type)), e) : 1;
}
function Ue(e, t, n, r) {
  if (50 < Bn) throw Bn = 0, Zo = null, Error(N(185));
  sr(e, n, r), (!(A & 2) || e !== le) && (e === le && (!(A & 2) && (El |= n), te === 4 && ft(e, ie)), je(e, r), n === 1 && A === 0 && !(t.mode & 1) && (gn = J() + 500, Sl && Et()));
}
function je(e, t) {
  var n = e.callbackNode;
  Sd(e, t);
  var r = Gr(e, e === le ? ie : 0);
  if (r === 0) n !== null && aa(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && aa(n), t === 1) e.tag === 0 ? Sf(qa.bind(null, e)) : gu(qa.bind(null, e)), yf(function() {
      !(A & 6) && Et();
    }), n = null;
    else {
      switch (Qs(r)) {
        case 1:
          n = fi;
          break;
        case 4:
          n = Hs;
          break;
        case 16:
          n = Xr;
          break;
        case 536870912:
          n = Ws;
          break;
        default:
          n = Xr;
      }
      n = mc(n, sc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function sc(e, t) {
  if (Ur = -1, Br = 0, A & 6) throw Error(N(327));
  var n = e.callbackNode;
  if (cn() && e.callbackNode !== n) return null;
  var r = Gr(e, e === le ? ie : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = hl(e, r);
  else {
    t = r;
    var l = A;
    A |= 2;
    var o = cc();
    (le !== e || ie !== t) && (Je = null, gn = J() + 500, Rt(e, t));
    do
      try {
        Wf();
        break;
      } catch (s) {
        uc(e, s);
      }
    while (!0);
    _i(), dl.current = o, A = l, q !== null ? t = 0 : (le = null, ie = 0, t = te);
  }
  if (t !== 0) {
    if (t === 2 && (l = No(e), l !== 0 && (r = l, t = Jo(e, l))), t === 1) throw n = ir, Rt(e, 0), ft(e, r), je(e, J()), n;
    if (t === 6) ft(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Bf(l) && (t = hl(e, r), t === 2 && (o = No(e), o !== 0 && (r = o, t = Jo(e, o))), t === 1)) throw n = ir, Rt(e, 0), ft(e, r), je(e, J()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          Pt(e, xe, Je);
          break;
        case 3:
          if (ft(e, r), (r & 130023424) === r && (t = Ai + 500 - J(), 10 < t)) {
            if (Gr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              he(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = $o(Pt.bind(null, e, xe, Je), t);
            break;
          }
          Pt(e, xe, Je);
          break;
        case 4:
          if (ft(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var a = 31 - Ae(r);
            o = 1 << a, a = t[a], a > l && (l = a), r &= ~o;
          }
          if (r = l, r = J() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Uf(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = $o(Pt.bind(null, e, xe, Je), r);
            break;
          }
          Pt(e, xe, Je);
          break;
        case 5:
          Pt(e, xe, Je);
          break;
        default:
          throw Error(N(329));
      }
    }
  }
  return je(e, J()), e.callbackNode === n ? sc.bind(null, e) : null;
}
function Jo(e, t) {
  var n = Un;
  return e.current.memoizedState.isDehydrated && (Rt(e, t).flags |= 256), e = hl(e, t), e !== 2 && (t = xe, xe = n, t !== null && qo(t)), e;
}
function qo(e) {
  xe === null ? xe = e : xe.push.apply(xe, e);
}
function Bf(e) {
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
function ft(e, t) {
  for (t &= ~Ii, t &= ~El, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ae(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function qa(e) {
  if (A & 6) throw Error(N(327));
  cn();
  var t = Gr(e, 0);
  if (!(t & 1)) return je(e, J()), null;
  var n = hl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = No(e);
    r !== 0 && (t = r, n = Jo(e, r));
  }
  if (n === 1) throw n = ir, Rt(e, 0), ft(e, t), je(e, J()), n;
  if (n === 6) throw Error(N(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Pt(e, xe, Je), je(e, J()), null;
}
function Ui(e, t) {
  var n = A;
  A |= 1;
  try {
    return e(t);
  } finally {
    A = n, A === 0 && (gn = J() + 500, Sl && Et());
  }
}
function Ut(e) {
  ht !== null && ht.tag === 0 && !(A & 6) && cn();
  var t = A;
  A |= 1;
  var n = Le.transition, r = B;
  try {
    if (Le.transition = null, B = 1, e) return e();
  } finally {
    B = r, Le.transition = n, A = t, !(A & 6) && Et();
  }
}
function Bi() {
  Ne = rn.current, Q(rn);
}
function Rt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, xf(n)), q !== null) for (n = q.return; n !== null; ) {
    var r = n;
    switch (ji(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && tl();
        break;
      case 3:
        mn(), Q(we), Q(fe), Ti();
        break;
      case 5:
        Pi(r);
        break;
      case 4:
        mn();
        break;
      case 13:
        Q(Y);
        break;
      case 19:
        Q(Y);
        break;
      case 10:
        Ci(r.type._context);
        break;
      case 22:
      case 23:
        Bi();
    }
    n = n.return;
  }
  if (le = e, q = e = jt(e.current, null), ie = Ne = t, te = 0, ir = null, Ii = El = At = 0, xe = Un = null, $t !== null) {
    for (t = 0; t < $t.length; t++) if (n = $t[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var a = o.next;
        o.next = l, r.next = a;
      }
      n.pending = r;
    }
    $t = null;
  }
  return e;
}
function uc(e, t) {
  do {
    var n = q;
    try {
      if (_i(), Dr.current = cl, ul) {
        for (var r = X.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        ul = !1;
      }
      if (It = 0, re = ee = X = null, In = !1, rr = 0, Di.current = null, n === null || n.return === null) {
        te = 1, ir = t, q = null;
        break;
      }
      e: {
        var o = e, a = n.return, s = n, u = t;
        if (t = ie, s.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, g = s, v = g.tag;
          if (!(g.mode & 1) && (v === 0 || v === 11 || v === 15)) {
            var h = g.alternate;
            h ? (g.updateQueue = h.updateQueue, g.memoizedState = h.memoizedState, g.lanes = h.lanes) : (g.updateQueue = null, g.memoizedState = null);
          }
          var m = Aa(a);
          if (m !== null) {
            m.flags &= -257, Ua(m, a, s, o, t), m.mode & 1 && Ia(o, c, t), t = m, u = c;
            var y = t.updateQueue;
            if (y === null) {
              var w = /* @__PURE__ */ new Set();
              w.add(u), t.updateQueue = w;
            } else y.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Ia(o, c, t), Hi();
              break e;
            }
            u = Error(N(426));
          }
        } else if (K && s.mode & 1) {
          var $ = Aa(a);
          if ($ !== null) {
            !($.flags & 65536) && ($.flags |= 256), Ua($, a, s, o, t), Si(vn(u, s));
            break e;
          }
        }
        o = u = vn(u, s), te !== 4 && (te = 2), Un === null ? Un = [o] : Un.push(o), o = a;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var p = Qu(o, u, t);
              La(o, p);
              break e;
            case 1:
              s = u;
              var d = o.type, f = o.stateNode;
              if (!(o.flags & 128) && (typeof d.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (wt === null || !wt.has(f)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var x = Ku(o, s, t);
                La(o, x);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      fc(n);
    } catch (k) {
      t = k, q === n && n !== null && (q = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function cc() {
  var e = dl.current;
  return dl.current = cl, e === null ? cl : e;
}
function Hi() {
  (te === 0 || te === 3 || te === 2) && (te = 4), le === null || !(At & 268435455) && !(El & 268435455) || ft(le, ie);
}
function hl(e, t) {
  var n = A;
  A |= 2;
  var r = cc();
  (le !== e || ie !== t) && (Je = null, Rt(e, t));
  do
    try {
      Hf();
      break;
    } catch (l) {
      uc(e, l);
    }
  while (!0);
  if (_i(), A = n, dl.current = r, q !== null) throw Error(N(261));
  return le = null, ie = 0, te;
}
function Hf() {
  for (; q !== null; ) dc(q);
}
function Wf() {
  for (; q !== null && !hd(); ) dc(q);
}
function dc(e) {
  var t = hc(e.alternate, e, Ne);
  e.memoizedProps = e.pendingProps, t === null ? fc(e) : q = t, Di.current = null;
}
function fc(e) {
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
    } else if (n = Of(n, t, Ne), n !== null) {
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
function Pt(e, t, n) {
  var r = B, l = Le.transition;
  try {
    Le.transition = null, B = 1, Vf(e, t, n, r);
  } finally {
    Le.transition = l, B = r;
  }
  return null;
}
function Vf(e, t, n, r) {
  do
    cn();
  while (ht !== null);
  if (A & 6) throw Error(N(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(N(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Nd(e, o), e === le && (q = le = null, ie = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || zr || (zr = !0, mc(Xr, function() {
    return cn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Le.transition, Le.transition = null;
    var a = B;
    B = 1;
    var s = A;
    A |= 4, Di.current = null, If(e, n), ic(n, e), df(Po), Zr = !!zo, Po = zo = null, e.current = n, Af(n), md(), A = s, B = a, Le.transition = o;
  } else e.current = n;
  if (zr && (zr = !1, ht = e, pl = l), o = e.pendingLanes, o === 0 && (wt = null), xd(n.stateNode), je(e, J()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (fl) throw fl = !1, e = Go, Go = null, e;
  return pl & 1 && e.tag !== 0 && cn(), o = e.pendingLanes, o & 1 ? e === Zo ? Bn++ : (Bn = 0, Zo = e) : Bn = 0, Et(), null;
}
function cn() {
  if (ht !== null) {
    var e = Qs(pl), t = Le.transition, n = B;
    try {
      if (Le.transition = null, B = 16 > e ? 16 : e, ht === null) var r = !1;
      else {
        if (e = ht, ht = null, pl = 0, A & 6) throw Error(N(331));
        var l = A;
        for (A |= 4, L = e.current; L !== null; ) {
          var o = L, a = o.child;
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
                      An(8, g, o);
                  }
                  var v = g.child;
                  if (v !== null) v.return = g, L = v;
                  else for (; L !== null; ) {
                    g = L;
                    var h = g.sibling, m = g.return;
                    if (rc(g), g === c) {
                      L = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = m, L = h;
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
                    var $ = w.sibling;
                    w.sibling = null, w = $;
                  } while (w !== null);
                }
              }
              L = o;
            }
          }
          if (o.subtreeFlags & 2064 && a !== null) a.return = o, L = a;
          else e: for (; L !== null; ) {
            if (o = L, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                An(9, o, o.return);
            }
            var p = o.sibling;
            if (p !== null) {
              p.return = o.return, L = p;
              break e;
            }
            L = o.return;
          }
        }
        var d = e.current;
        for (L = d; L !== null; ) {
          a = L;
          var f = a.child;
          if (a.subtreeFlags & 2064 && f !== null) f.return = a, L = f;
          else e: for (a = d; L !== null; ) {
            if (s = L, s.flags & 2048) try {
              switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  Cl(9, s);
              }
            } catch (k) {
              Z(s, s.return, k);
            }
            if (s === a) {
              L = null;
              break e;
            }
            var x = s.sibling;
            if (x !== null) {
              x.return = s.return, L = x;
              break e;
            }
            L = s.return;
          }
        }
        if (A = l, Et(), Ge && typeof Ge.onPostCommitFiberRoot == "function") try {
          Ge.onPostCommitFiberRoot(xl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      B = n, Le.transition = t;
    }
  }
  return !1;
}
function es(e, t, n) {
  t = vn(n, t), t = Qu(e, t, 1), e = yt(e, t, 1), t = he(), e !== null && (sr(e, 1, t), je(e, t));
}
function Z(e, t, n) {
  if (e.tag === 3) es(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      es(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (wt === null || !wt.has(r))) {
        e = vn(n, e), e = Ku(t, e, 1), t = yt(t, e, 1), e = he(), t !== null && (sr(t, 1, e), je(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Qf(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = he(), e.pingedLanes |= e.suspendedLanes & n, le === e && (ie & n) === n && (te === 4 || te === 3 && (ie & 130023424) === ie && 500 > J() - Ai ? Rt(e, 0) : Ii |= n), je(e, t);
}
function pc(e, t) {
  t === 0 && (e.mode & 1 ? (t = yr, yr <<= 1, !(yr & 130023424) && (yr = 4194304)) : t = 1);
  var n = he();
  e = ot(e, t), e !== null && (sr(e, t, n), je(e, n));
}
function Kf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), pc(e, n);
}
function Yf(e, t) {
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
  r !== null && r.delete(t), pc(e, n);
}
var hc;
hc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || we.current) ye = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return ye = !1, Rf(e, t, n);
    ye = !!(e.flags & 131072);
  }
  else ye = !1, K && t.flags & 1048576 && xu(t, ll, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Ar(e, t), e = t.pendingProps;
      var l = fn(t, fe.current);
      un(t, n), l = Li(null, t, r, e, l, n);
      var o = Mi();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ke(r) ? (o = !0, nl(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, bi(t), l.updater = _l, t.stateNode = l, l._reactInternals = t, Io(t, r, e, n), t = Bo(null, t, r, !0, o, n)) : (t.tag = 0, K && o && ki(t), pe(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Ar(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Gf(r), e = Fe(r, e), l) {
          case 0:
            t = Uo(null, t, r, e, n);
            break e;
          case 1:
            t = Wa(null, t, r, e, n);
            break e;
          case 11:
            t = Ba(null, t, r, e, n);
            break e;
          case 14:
            t = Ha(null, t, r, Fe(r.type, e), n);
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
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), Uo(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), Wa(e, t, r, l, n);
    case 3:
      e: {
        if (Zu(t), e === null) throw Error(N(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, Nu(e, t), al(t, r, null, n);
        var a = t.memoizedState;
        if (r = a.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = vn(Error(N(423)), t), t = Va(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = vn(Error(N(424)), t), t = Va(e, t, r, n, l);
          break e;
        } else for (_e = xt(t.stateNode.containerInfo.firstChild), Ce = t, K = !0, Ie = null, n = ju(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (pn(), r === l) {
            t = it(e, t, n);
            break e;
          }
          pe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return _u(t), e === null && Oo(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, a = l.children, To(r, l) ? a = null : o !== null && To(r, o) && (t.flags |= 32), Gu(e, t), pe(e, t, a, n), t.child;
    case 6:
      return e === null && Oo(t), null;
    case 13:
      return Ju(e, t, n);
    case 4:
      return zi(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = hn(t, null, r, n) : pe(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), Ba(e, t, r, l, n);
    case 7:
      return pe(e, t, t.pendingProps, n), t.child;
    case 8:
      return pe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return pe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, a = l.value, H(ol, r._currentValue), r._currentValue = a, o !== null) if (Be(o.value, a)) {
          if (o.children === l.children && !we.current) {
            t = it(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var s = o.dependencies;
          if (s !== null) {
            a = o.child;
            for (var u = s.firstContext; u !== null; ) {
              if (u.context === r) {
                if (o.tag === 1) {
                  u = nt(-1, n & -n), u.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var g = c.pending;
                    g === null ? u.next = u : (u.next = g.next, g.next = u), c.pending = u;
                  }
                }
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Fo(
                  o.return,
                  n,
                  t
                ), s.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (o.tag === 10) a = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (a = o.return, a === null) throw Error(N(341));
            a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), Fo(a, n, t), a = o.sibling;
          } else a = o.child;
          if (a !== null) a.return = o;
          else for (a = o; a !== null; ) {
            if (a === t) {
              a = null;
              break;
            }
            if (o = a.sibling, o !== null) {
              o.return = a.return, a = o;
              break;
            }
            a = a.return;
          }
          o = a;
        }
        pe(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, un(t, n), l = Me(l), r = r(l), t.flags |= 1, pe(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Fe(r, t.pendingProps), l = Fe(r.type, l), Ha(e, t, r, l, n);
    case 15:
      return Yu(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), Ar(e, t), t.tag = 1, ke(r) ? (e = !0, nl(t)) : e = !1, un(t, n), Vu(t, r, l), Io(t, r, l, n), Bo(null, t, r, !0, e, n);
    case 19:
      return qu(e, t, n);
    case 22:
      return Xu(e, t, n);
  }
  throw Error(N(156, t.tag));
};
function mc(e, t) {
  return Bs(e, t);
}
function Xf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function $e(e, t, n, r) {
  return new Xf(e, t, n, r);
}
function Wi(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Gf(e) {
  if (typeof e == "function") return Wi(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ui) return 11;
    if (e === ci) return 14;
  }
  return 2;
}
function jt(e, t) {
  var n = e.alternate;
  return n === null ? (n = $e(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Hr(e, t, n, r, l, o) {
  var a = 2;
  if (r = e, typeof e == "function") Wi(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else e: switch (e) {
    case Kt:
      return Ot(n.children, l, o, t);
    case si:
      a = 8, l |= 8;
      break;
    case so:
      return e = $e(12, n, t, l | 2), e.elementType = so, e.lanes = o, e;
    case uo:
      return e = $e(13, n, t, l), e.elementType = uo, e.lanes = o, e;
    case co:
      return e = $e(19, n, t, l), e.elementType = co, e.lanes = o, e;
    case _s:
      return bl(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Ss:
          a = 10;
          break e;
        case Ns:
          a = 9;
          break e;
        case ui:
          a = 11;
          break e;
        case ci:
          a = 14;
          break e;
        case ut:
          a = 16, r = null;
          break e;
      }
      throw Error(N(130, e == null ? e : typeof e, ""));
  }
  return t = $e(a, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Ot(e, t, n, r) {
  return e = $e(7, e, r, t), e.lanes = n, e;
}
function bl(e, t, n, r) {
  return e = $e(22, e, r, t), e.elementType = _s, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function lo(e, t, n) {
  return e = $e(6, e, null, t), e.lanes = n, e;
}
function oo(e, t, n) {
  return t = $e(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Zf(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Il(0), this.expirationTimes = Il(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Il(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Vi(e, t, n, r, l, o, a, s, u) {
  return e = new Zf(e, t, n, s, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = $e(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, bi(o), e;
}
function Jf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Qt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function vc(e) {
  if (!e) return Nt;
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
          if (ke(t.type)) {
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
    if (ke(n)) return vu(e, n, t);
  }
  return t;
}
function gc(e, t, n, r, l, o, a, s, u) {
  return e = Vi(n, r, !0, e, l, o, a, s, u), e.context = vc(null), n = e.current, r = he(), l = kt(n), o = nt(r, l), o.callback = t ?? null, yt(n, o, l), e.current.lanes = l, sr(e, l, r), je(e, r), e;
}
function zl(e, t, n, r) {
  var l = t.current, o = he(), a = kt(l);
  return n = vc(n), t.context === null ? t.context = n : t.pendingContext = n, t = nt(o, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = yt(l, t, a), e !== null && (Ue(e, l, a, o), Fr(e, l, a)), a;
}
function ml(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function ts(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Qi(e, t) {
  ts(e, t), (e = e.alternate) && ts(e, t);
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
Pl.prototype.render = Ki.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(N(409));
  zl(e, t, null, null);
};
Pl.prototype.unmount = Ki.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ut(function() {
      zl(null, e, null, null);
    }), t[lt] = null;
  }
};
function Pl(e) {
  this._internalRoot = e;
}
Pl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Xs();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < dt.length && t !== 0 && t < dt[n].priority; n++) ;
    dt.splice(n, 0, e), n === 0 && Zs(e);
  }
};
function Yi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Tl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function ns() {
}
function ep(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = ml(a);
        o.call(c);
      };
    }
    var a = gc(t, r, e, 0, null, !1, !1, "", ns);
    return e._reactRootContainer = a, e[lt] = a.current, Jn(e.nodeType === 8 ? e.parentNode : e), Ut(), a;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var c = ml(u);
      s.call(c);
    };
  }
  var u = Vi(e, 0, !1, null, null, !1, !1, "", ns);
  return e._reactRootContainer = u, e[lt] = u.current, Jn(e.nodeType === 8 ? e.parentNode : e), Ut(function() {
    zl(t, u, n, r);
  }), u;
}
function $l(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof l == "function") {
      var s = l;
      l = function() {
        var u = ml(a);
        s.call(u);
      };
    }
    zl(t, a, e, l);
  } else a = ep(n, t, e, l, r);
  return ml(a);
}
Ks = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = $n(t.pendingLanes);
        n !== 0 && (pi(t, n | 1), je(t, J()), !(A & 6) && (gn = J() + 500, Et()));
      }
      break;
    case 13:
      Ut(function() {
        var r = ot(e, 1);
        if (r !== null) {
          var l = he();
          Ue(r, e, 1, l);
        }
      }), Qi(e, 1);
  }
};
hi = function(e) {
  if (e.tag === 13) {
    var t = ot(e, 134217728);
    if (t !== null) {
      var n = he();
      Ue(t, e, 134217728, n);
    }
    Qi(e, 134217728);
  }
};
Ys = function(e) {
  if (e.tag === 13) {
    var t = kt(e), n = ot(e, t);
    if (n !== null) {
      var r = he();
      Ue(n, e, t, r);
    }
    Qi(e, t);
  }
};
Xs = function() {
  return B;
};
Gs = function(e, t) {
  var n = B;
  try {
    return B = e, t();
  } finally {
    B = n;
  }
};
ko = function(e, t, n) {
  switch (t) {
    case "input":
      if (ho(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = jl(r);
            if (!l) throw Error(N(90));
            Es(r), ho(r, l);
          }
        }
      }
      break;
    case "textarea":
      zs(e, n);
      break;
    case "select":
      t = n.value, t != null && ln(e, !!n.multiple, t, !1);
  }
};
Os = Ui;
Fs = Ut;
var tp = { usingClientEntryPoint: !1, Events: [cr, Zt, jl, Ms, Rs, Ui] }, bn = { findFiberByHostInstance: Tt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, np = { bundleType: bn.bundleType, version: bn.version, rendererPackageName: bn.rendererPackageName, rendererConfig: bn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: at.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = As(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: bn.findFiberByHostInstance || qf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Pr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Pr.isDisabled && Pr.supportsFiber) try {
    xl = Pr.inject(np), Ge = Pr;
  } catch {
  }
}
be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tp;
be.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Yi(t)) throw Error(N(200));
  return Jf(e, t, null, n);
};
be.createRoot = function(e, t) {
  if (!Yi(e)) throw Error(N(299));
  var n = !1, r = "", l = xc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Vi(e, 1, !1, null, null, n, !1, r, l), e[lt] = t.current, Jn(e.nodeType === 8 ? e.parentNode : e), new Ki(t);
};
be.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(N(188)) : (e = Object.keys(e).join(","), Error(N(268, e)));
  return e = As(t), e = e === null ? null : e.stateNode, e;
};
be.flushSync = function(e) {
  return Ut(e);
};
be.hydrate = function(e, t, n) {
  if (!Tl(t)) throw Error(N(200));
  return $l(null, e, t, !0, n);
};
be.hydrateRoot = function(e, t, n) {
  if (!Yi(e)) throw Error(N(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", a = xc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = gc(t, null, e, 1, n ?? null, l, !1, o, a), e[lt] = t.current, Jn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Pl(t);
};
be.render = function(e, t, n) {
  if (!Tl(t)) throw Error(N(200));
  return $l(null, e, t, !1, n);
};
be.unmountComponentAtNode = function(e) {
  if (!Tl(e)) throw Error(N(40));
  return e._reactRootContainer ? (Ut(function() {
    $l(null, null, e, !1, function() {
      e._reactRootContainer = null, e[lt] = null;
    });
  }), !0) : !1;
};
be.unstable_batchedUpdates = Ui;
be.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Tl(n)) throw Error(N(200));
  if (e == null || e._reactInternals === void 0) throw Error(N(38));
  return $l(e, t, n, !1, r);
};
be.version = "18.3.1-next-f1338f8080-20240426";
function yc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(yc);
    } catch (e) {
      console.error(e);
    }
}
yc(), ys.exports = be;
var rp = ys.exports, wc, rs = rp;
wc = rs.createRoot, rs.hydrateRoot;
function T({ name: e, className: t }) {
  return /* @__PURE__ */ i.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("ha-icon", { icon: `mdi:${e}` }) });
}
const lp = '<defs><linearGradient id="hl-mark-g" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#FFB547"/><stop offset="1" stop-color="#FF5A1F"/></linearGradient></defs><polygon points="256,62 452,222 452,446 60,446 60,222" fill="url(#hl-mark-g)" stroke="url(#hl-mark-g)" stroke-width="56" stroke-linejoin="round"/><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" fill="#fff" transform="translate(256 292) scale(10) translate(-12 -12)"/>';
function ls({ size: e = 28 }) {
  return /* @__PURE__ */ i.jsx(
    "svg",
    {
      className: "logo-mark",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      "aria-hidden": "true",
      dangerouslySetInnerHTML: { __html: lp }
    }
  );
}
const bt = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
], Hn = { heat: "Heating", water: "Hot water" }, me = (e) => String((e == null ? void 0 : e.message) ?? e);
function kc(e, t, n) {
  const [r, l] = S.useState(!1), [o, a] = S.useState(null);
  return { busy: r, result: o, send: async (u, c) => {
    l(!0);
    try {
      await e().callWS({ entry_id: t, channel: n, ...u }), a({ kind: "ok", text: c });
    } catch (g) {
      a({ kind: "error", text: me(g) });
    } finally {
      l(!1);
    }
  } };
}
const Mt = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, op = [30, 60, 120, 180];
function ip({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onOpenDevice: l,
  onOpenRoom: o
}) {
  const [a, s] = S.useState([]), [u, c] = S.useState("all");
  S.useEffect(() => {
    const m = e().connection.subscribeMessage((y) => s(y.rooms), {
      type: "hive_local/rooms/subscribe"
    });
    return () => {
      m.then((y) => y()).catch(() => {
      });
    };
  }, [e]);
  const g = t.flatMap((m) => m.channels.map((y) => {
    var w, $;
    return { d: m, c: y, s: (($ = (w = n[m.entry_id]) == null ? void 0 : w[y]) == null ? void 0 : $.status) ?? null };
  })), v = t.length > 1, h = [
    { id: "all", label: "All", icon: "" },
    { id: "heat", label: "Heating", icon: "radiator" },
    ...g.some(({ c: m }) => m === "water") ? [{ id: "water", label: "Hot water", icon: "water-boiler" }] : [],
    ...a.length ? [{ id: "rooms", label: "Rooms", icon: "home-thermometer-outline" }] : []
  ];
  return /* @__PURE__ */ i.jsx("div", { className: "home", children: t.length > 0 && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: "home-section", children: "Quick actions" }),
    /* @__PURE__ */ i.jsx(ap, { getHass: e, devices: t, status: n }),
    /* @__PURE__ */ i.jsx("h3", { className: "home-section", children: "Your devices" }),
    h.length > 2 && /* @__PURE__ */ i.jsx("div", { className: "pills", role: "tablist", "aria-label": "Show", children: h.map((m) => /* @__PURE__ */ i.jsxs("button", { role: "tab", "aria-selected": u === m.id, className: `pill ${u === m.id ? "on" : ""}`, onClick: () => c(m.id), children: [
      m.icon && /* @__PURE__ */ i.jsx(T, { name: m.icon }),
      " ",
      m.label
    ] }, m.id)) }),
    /* @__PURE__ */ i.jsxs("div", { className: "device-grid", children: [
      g.filter(({ c: m }) => u === "all" || u === m).map(({ d: m, c: y }) => {
        var w;
        return /* @__PURE__ */ i.jsx(
          jc,
          {
            getHass: e,
            device: m,
            channel: y,
            info: (w = n[m.entry_id]) == null ? void 0 : w[y],
            showDevice: v,
            limits: r,
            onOpen: () => l(m.entry_id, y)
          },
          `${m.entry_id}-${y}`
        );
      }),
      (u === "all" || u === "rooms") && a.map((m) => /* @__PURE__ */ i.jsx(sp, { room: m, showReceiver: v, onOpen: () => o(m.id) }, m.id))
    ] })
  ] }) });
}
function ap({ getHass: e, devices: t, status: n }) {
  var v, h;
  const [r, l] = S.useState(null), [o, a] = S.useState(null), s = t.length > 1, u = async (m, y, w) => {
    l(m);
    try {
      for (const $ of y) await e().callWS($);
      a({ ok: !0, text: w });
    } catch ($) {
      a({ ok: !1, text: me($) });
    } finally {
      l(null);
    }
  }, c = [];
  for (const m of t)
    for (const y of m.channels) {
      const w = (v = n[m.entry_id]) == null ? void 0 : v[y];
      if (((h = w == null ? void 0 : w.status) == null ? void 0 : h.mode) === "boost") continue;
      const $ = Mt((w == null ? void 0 : w.boost_minutes) ?? 30), p = y === "water" ? "hot water" : "heating";
      c.push({
        id: `boost-${m.entry_id}-${y}`,
        label: `Boost ${p} · ${$}${s ? ` (${m.name})` : ""}`,
        icon: "rocket-launch",
        kind: y,
        msgs: [{ type: "hive_local/boost", entry_id: m.entry_id, channel: y }],
        done: `Boosting ${p} for ${$}`
      });
    }
  const g = t.flatMap(
    (m) => m.channels.filter((y) => {
      var $, p, d;
      const w = (d = (p = ($ = n[m.entry_id]) == null ? void 0 : $[y]) == null ? void 0 : p.status) == null ? void 0 : d.mode;
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
        var w, $, p;
        return ((p = ($ = (w = n[m.entry_id]) == null ? void 0 : w[y]) == null ? void 0 : $.status) == null ? void 0 : p.mode) === "boost" ? { type: "hive_local/cancel_boost", entry_id: m.entry_id, channel: y } : { type: "hive_local/mode", entry_id: m.entry_id, channel: y, mode: "schedule" };
      }
    ),
    done: "Back on the schedule"
  }), /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx("div", { className: "quick", children: c.map((m) => /* @__PURE__ */ i.jsxs("button", { className: `quick-action ${m.kind}`, disabled: r != null, onClick: () => u(m.id, m.msgs, m.done), children: [
      /* @__PURE__ */ i.jsx("span", { className: "quick-icon", children: /* @__PURE__ */ i.jsx(T, { name: r === m.id ? "timer-sand" : m.icon }) }),
      /* @__PURE__ */ i.jsx("span", { className: "quick-label", children: m.label })
    ] }, m.id)) }),
    o && /* @__PURE__ */ i.jsx("div", { className: `status ${o.ok ? "ok" : "error"}`, children: o.text })
  ] });
}
function sp({ room: e, showReceiver: t, onOpen: n }) {
  const r = e.target != null ? `${e.target}°` : e.target_range ? `${e.target_range[0]}–${e.target_range[1]}°` : null, l = `${e.valves.length} valve${e.valves.length === 1 ? "" : "s"}`;
  return /* @__PURE__ */ i.jsx("section", { className: `card device room-device ${e.heating ? "heating" : "idle"}`, children: /* @__PURE__ */ i.jsxs("div", { className: "device-head", role: "button", tabIndex: 0, onClick: n, onKeyDown: (o) => o.key === "Enter" && n(), children: [
    /* @__PURE__ */ i.jsxs("div", { className: "device-row", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon room", children: /* @__PURE__ */ i.jsx(T, { name: "home-thermometer-outline" }) }),
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
        /* @__PURE__ */ i.jsx(T, { name: "fire", className: "status-icon heat" })
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
function jc({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  showDevice: l,
  limits: o,
  onOpen: a,
  page: s = !1
}) {
  var ne, Wt, Qe;
  const u = n === "water", c = (r == null ? void 0 : r.status) ?? null, { busy: g, result: v, send: h } = kc(e, t.entry_id, n), m = !!c && c.mode !== "off" && c.heating, y = !c || c.mode === "off" ? "off" : m ? "heating" : "idle", w = !u && (c == null ? void 0 : c.setpoint) != null && c.setpoint <= 1, $ = u || (c == null ? void 0 : c.setpoint) == null ? null : w ? (r == null ? void 0 : r.frost_temperature) ?? null : c.setpoint, p = [
    { id: "schedule", label: "Schedule" },
    { id: "manual", label: u ? "Always on" : "Manual" },
    { id: "off", label: "Off" }
  ], d = (r == null ? void 0 : r.boost_minutes) ?? 30, f = (r == null ? void 0 : r.boost_temperature) ?? 21, [x, k] = S.useState(!1), j = (o == null ? void 0 : o.boost_min_temp) ?? 5, z = (o == null ? void 0 : o.heat_max) ?? 32, C = (U) => Math.min(z, Math.max(j, Math.round(U * 2) / 2)), b = [.../* @__PURE__ */ new Set([...op, d])].filter((U) => U <= ((o == null ? void 0 : o.boost_max_minutes) ?? 360)).sort((U, fr) => U - fr), [R, E] = S.useState(null), F = S.useRef();
  S.useEffect(() => () => window.clearTimeout(F.current), []), S.useEffect(() => E(null), [c == null ? void 0 : c.setpoint, c == null ? void 0 : c.mode]);
  const W = !u && !!c && c.mode !== "off", Se = (U) => {
    const Ll = C((R ?? $ ?? 20) + U);
    E(Ll), window.clearTimeout(F.current), F.current = window.setTimeout(() => {
      h({ type: "hive_local/target", temperature: Ll }, `Set to ${Ll}°`).then(
        () => window.setTimeout(() => E(null), 8e3)
      );
    }, 1200);
  }, He = R ?? $, We = (U, fr) => h({ type: "hive_local/boost", minutes: U, ...u ? {} : { temperature: fr } }, `Boosting for ${Mt(U)}`).then(
    () => k(!1)
  ), Ve = c ? c.mode === "boost" ? "Boost to" : w && R == null ? "Frost" : c.mode === "manual" ? "Hold at" : "Target" : "", P = (c == null ? void 0 : c.mode) === "boost", O = P ? ((ne = r == null ? void 0 : r.preheat) == null ? void 0 : ne.active_for) ?? null : null, _ = O != null;
  let M = "Waiting for the receiver…";
  c && (c.mode === "off" ? M = "Off" : P ? M = u ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Boosting ",
    /* @__PURE__ */ i.jsx(T, { name: "rocket-launch", className: "status-icon" })
  ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Boosting to ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      c.setpoint,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx(T, { name: "rocket-launch", className: "status-icon" })
  ] }) : u ? M = m ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Heating water ",
    /* @__PURE__ */ i.jsx(T, { name: "water", className: "status-icon" })
  ] }) : "Not heating now" : m ? M = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Heating to ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      $,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx(T, { name: "fire", className: "status-icon" })
  ] }) : w ? M = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Frost protection ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      $,
      "°"
    ] })
  ] }) : M = $ != null ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Target ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      $,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx(T, { name: "check-circle-outline", className: "status-icon done" })
  ] }) : "Idle"), c && _ && (M = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Pre-heating to ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      c.setpoint,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx(T, { name: "sun-clock", className: "status-icon" })
  ] }));
  const D = c ? _ ? `Pre-heating for ${(Wt = r == null ? void 0 : r.preheat) == null ? void 0 : Wt.active_for}` : c.mode === "boost" ? c.boost_remaining != null ? `Boost · ${Mt(c.boost_remaining)} left` : "Boost" : c.mode === "schedule" ? "On schedule" : (Qe = p.find((U) => U.id === c.mode)) == null ? void 0 : Qe.label : "", se = s;
  return /* @__PURE__ */ i.jsxs("section", { className: `card device ${n} ${y} ${s ? "page" : ""}`, children: [
    /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "device-head",
        ...s ? {} : { role: "button", tabIndex: 0, onClick: a, onKeyDown: (U) => U.key === "Enter" && U.target === U.currentTarget && (a == null ? void 0 : a()) },
        children: [
          /* @__PURE__ */ i.jsxs("div", { className: "device-row", children: [
            /* @__PURE__ */ i.jsx("span", { className: `device-icon ${n}`, children: /* @__PURE__ */ i.jsx(T, { name: u ? "water-boiler" : "radiator" }) }),
            /* @__PURE__ */ i.jsxs("div", { className: "device-name", children: [
              /* @__PURE__ */ i.jsx("span", { children: Hn[n] }),
              /* @__PURE__ */ i.jsx("span", { className: "muted small", children: l ? `${t.name} · ${D}` : D })
            ] }),
            /* @__PURE__ */ i.jsx("span", { className: "device-status", children: M })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "device-row", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "device-big", children: [
              u ? c ? c.mode === "off" ? "Off" : m ? "On" : "Idle" : "–" : (c == null ? void 0 : c.current_temperature) != null ? c.current_temperature.toFixed(1) : "–",
              !u && /* @__PURE__ */ i.jsx("span", { children: "°" }),
              /* @__PURE__ */ i.jsx("small", { children: u ? "Now" : "Actual" })
            ] }),
            /* @__PURE__ */ i.jsxs(
              "button",
              {
                className: `device-action ${P ? "boosting" : ""}`,
                disabled: g || !c,
                onClick: (U) => {
                  U.stopPropagation(), k(!0);
                },
                children: [
                  /* @__PURE__ */ i.jsx(T, { name: _ ? "sun-clock" : "rocket-launch" }),
                  " ",
                  _ ? "Pre-heating" : P ? "Boosting" : "Boost"
                ]
              }
            )
          ] })
        ]
      }
    ),
    se && /* @__PURE__ */ i.jsxs("div", { className: "device-body", children: [
      !u && /* @__PURE__ */ i.jsxs("div", { className: "target-row", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "target-text", children: [
          /* @__PURE__ */ i.jsx("span", { className: "target-label", children: Ve || "Target" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: c ? c.mode === "off" ? "Turn the heating on to set a target" : c.mode === "schedule" ? "Until the next scheduled change" : c.mode === "boost" ? "Keeps the boost time left" : "Held until you change it" : "" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "target-control", children: [
          /* @__PURE__ */ i.jsx("button", { className: "round target-btn", disabled: !W, onClick: () => Se(-0.5), "aria-label": "Lower the target", children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
          /* @__PURE__ */ i.jsx("span", { className: `target-value ${R != null ? "pending" : ""}`, children: He != null && (c == null ? void 0 : c.mode) !== "off" ? `${He.toFixed(1)}°` : "–" }),
          /* @__PURE__ */ i.jsx("button", { className: "round target-btn", disabled: !W, onClick: () => Se(0.5), "aria-label": "Raise the target", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "segmented full", children: p.map((U) => /* @__PURE__ */ i.jsx(
        "button",
        {
          className: (c == null ? void 0 : c.mode) === U.id ? "on" : "",
          disabled: g || !c,
          onClick: () => h({ type: "hive_local/mode", mode: U.id }, U.id === "schedule" ? "Following the schedule" : U.label),
          children: U.label
        },
        U.id
      )) })
    ] }),
    (v == null ? void 0 : v.kind) === "error" && /* @__PURE__ */ i.jsx("div", { className: "status error", children: v.text }),
    x && /* @__PURE__ */ i.jsx(
      up,
      {
        title: _ ? "Pre-heating" : P ? "Boosting" : "Boost",
        subtitle: l ? `${t.name} · ${Hn[n]}` : Hn[n],
        water: u,
        boosting: P,
        preheatFor: O,
        remaining: (c == null ? void 0 : c.boost_remaining) ?? null,
        boostTarget: P ? (c == null ? void 0 : c.setpoint) ?? null : null,
        defaultMinutes: d,
        defaultTemp: f,
        durations: b,
        clampTemp: C,
        busy: g,
        onBoost: We,
        onStop: () => h({ type: "hive_local/cancel_boost" }, "Boost cancelled").then(() => k(!1)),
        onClose: () => k(!1)
      }
    )
  ] });
}
function up({
  title: e,
  subtitle: t,
  water: n,
  boosting: r,
  preheatFor: l,
  remaining: o,
  boostTarget: a,
  defaultMinutes: s,
  defaultTemp: u,
  durations: c,
  clampTemp: g,
  busy: v,
  onBoost: h,
  onStop: m,
  onClose: y
}) {
  const [w, $] = S.useState(s), [p, d] = S.useState(u);
  return S.useEffect(() => {
    const f = (x) => x.key === "Escape" && y();
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [y]), /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: (f) => {
    f.stopPropagation(), y();
  }, children: /* @__PURE__ */ i.jsxs("div", { className: `sheet ${n ? "water" : "heat"}`, role: "dialog", "aria-modal": "true", "aria-label": `${e} ${t}`, onClick: (f) => f.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ i.jsx("h2", { children: e }),
      /* @__PURE__ */ i.jsx("span", { className: "muted", children: t })
    ] }),
    r ? /* @__PURE__ */ i.jsxs("div", { className: "sheet-live", children: [
      /* @__PURE__ */ i.jsx(T, { name: "clock-outline" }),
      /* @__PURE__ */ i.jsx("span", { children: l ? `Warming up${a != null ? ` to ${a}°` : ""} for ${l}, when your schedule changes` : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        o != null ? `${Mt(o)} left` : "Boosting",
        !n && a != null ? ` · to ${a}°` : ""
      ] }) })
    ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      !n && /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
        /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Temperature" }),
        /* @__PURE__ */ i.jsxs("div", { className: "sheet-temp", children: [
          /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => d(g(p - 0.5)), "aria-label": "Lower", children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
          /* @__PURE__ */ i.jsxs("span", { className: "sheet-temp-value", children: [
            p.toFixed(1),
            "°"
          ] }),
          /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => d(g(p + 0.5)), "aria-label": "Raise", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
        /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "How long" }),
        /* @__PURE__ */ i.jsx("div", { className: "sheet-lengths", role: "radiogroup", "aria-label": "How long", children: c.map((f) => /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": f === w, className: f === w ? "on" : "", onClick: () => $(f), children: Mt(f) }, f)) })
      ] })
    ] }),
    r ? /* @__PURE__ */ i.jsxs("button", { className: "sheet-go stop", disabled: v, onClick: m, children: [
      /* @__PURE__ */ i.jsx("span", { className: "stop-square" }),
      " ",
      l ? "Stop pre-heating" : "Stop boost"
    ] }) : /* @__PURE__ */ i.jsx("button", { className: "sheet-go", disabled: v, onClick: () => h(w, p), children: n ? `Boost hot water for ${Mt(w)}` : `Boost to ${p.toFixed(1)}° for ${Mt(w)}` }),
    /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: y, children: "Cancel" })
  ] }) });
}
const cp = [60, 90, 120, 180];
function dp({ getHass: e, device: t, info: n }) {
  const { busy: r, result: l, send: o } = kc(e, t.entry_id, "heat"), a = [.../* @__PURE__ */ new Set([...cp, n.max_lead])].sort((u, c) => u - c);
  let s;
  return n.enabled ? n.active_for ? s = `Pre-heating now, for ${n.active_for}.` : n.rate == null ? s = `Still learning how fast your home warms up (${n.warmups} of ${n.warmups_needed} warm-ups seen).` : n.schedule_known ? n.next ? s = `Next: starts ${n.next.start} to reach ${n.next.setpoint}° by ${n.next.at}.` : s = "Nothing to pre-heat for yet." : s = "Reading the heating schedule…" : s = "Start heating early, so it's warm by the time the schedule says.", /* @__PURE__ */ i.jsxs("section", { className: "card preheat", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "target-row", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "device-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "sun-clock" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "target-text", children: [
          /* @__PURE__ */ i.jsx("span", { className: "target-label", children: "Pre-heat" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: s })
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
      /* @__PURE__ */ i.jsx("div", { className: "segmented", role: "radiogroup", "aria-label": "Start at most", children: a.map((u) => /* @__PURE__ */ i.jsx(
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
const fp = ["monday", "tuesday", "wednesday", "thursday", "friday"], pp = ["saturday", "sunday"], zn = (e) => e[0].toUpperCase() + e.slice(1, 3), Wr = (e) => {
  const [t, n] = e.split(":").map(Number);
  return t * 60 + n;
};
function hp({
  getHass: e,
  device: t,
  channel: n,
  limits: r,
  mode: l,
  preheatFor: o
}) {
  var O;
  const [a, s] = S.useState({}), [u, c] = S.useState({}), [g, v] = S.useState("monday"), [h, m] = S.useState({ kind: "idle" }), y = t.entry_id, w = n === "water", $ = JSON.stringify(a) !== JSON.stringify(u), p = S.useCallback(async () => {
    m({ kind: "busy", text: "Reading from receiver…" });
    try {
      const _ = await e().callWS({
        type: "hive_local/get",
        entry_id: y,
        channel: n
      });
      s(_.schedule), c(_.schedule);
      const M = Object.keys(_.schedule).length;
      m(
        _.complete ? { kind: "ok", text: "Schedule read from receiver" } : M ? { kind: "error", text: `Only got ${M}/7 days — try reading again` } : { kind: "error", text: "No reply. On Zigbee2MQTT, check the receiver's friendly name; on ZHA, check the receiver is online." }
      );
    } catch (_) {
      m({ kind: "error", text: me(_) });
    }
  }, [y, n, e]);
  S.useEffect(() => {
    p();
  }, [p]), S.useEffect(() => {
    if (h.kind !== "ok") return;
    const _ = setTimeout(() => m({ kind: "idle" }), 4e3);
    return () => clearTimeout(_);
  }, [h]);
  const d = async () => {
    const _ = Object.fromEntries(
      bt.filter((M) => {
        var D;
        return JSON.stringify(a[M]) !== JSON.stringify(u[M]) && ((D = a[M]) == null ? void 0 : D.length);
      }).map((M) => [M, a[M]])
    );
    if (Object.keys(_).length) {
      m({ kind: "busy", text: "Writing to receiver…" });
      try {
        const M = await e().callWS({
          type: "hive_local/set",
          entry_id: y,
          channel: n,
          schedule: _
        }), D = { ...a, ...M.schedule };
        s(D), c(D);
        const se = Object.keys(M.schedule).map((ne) => ne[0].toUpperCase() + ne.slice(1, 3));
        m({
          kind: "ok",
          text: `Wrote ${se.join(", ")}. Read back to confirm the receiver kept it.`
        });
      } catch (M) {
        m({ kind: "error", text: me(M) });
      }
    }
  }, f = a[g] ?? [], x = r.max_transitions, k = (_) => s((M) => ({ ...M, [g]: [..._].sort((D, se) => Wr(D.time) - Wr(se.time)) })), j = () => {
    const _ = f[f.length - 1], M = _ ? mp(f, Wr(_.time) + 60) : "06:00", D = w ? r.water_on : (_ == null ? void 0 : _.setpoint) ?? 20;
    k([...f, { time: M, setpoint: D }]);
  }, z = (_) => s((M) => {
    const D = { ...M };
    for (const se of _) D[se] = f.map((ne) => ({ ...ne }));
    return D;
  }), C = S.useMemo(() => {
    const _ = Object.values(a).flat().map((M) => M.setpoint).filter((M) => M > r.heat_min);
    return { lo: Math.min(15, ..._), hi: Math.max(24, ..._) };
  }, [a, r.heat_min]), b = bt[((/* @__PURE__ */ new Date()).getDay() + 6) % 7], [R, E] = S.useState(null), [F, W] = S.useState(!1), Se = bt.filter((_) => JSON.stringify(a[_]) !== JSON.stringify(u[_])), He = bt[(bt.indexOf(g) + 1) % 7], We = (O = (a[He] ?? [])[0]) == null ? void 0 : O.time, Ve = (_) => w ? _.setpoint < r.water_on : _.setpoint <= r.heat_min;
  let P = "Stored on the receiver, so it keeps running without Home Assistant.";
  return l === "schedule" ? P = "Your schedule is running." : l === "manual" ? P = `Your schedule isn't being used: ${w ? "hot water is always on" : "heating is on Manual"}.` : l === "off" ? P = `Your schedule isn't being used: ${w ? "hot water" : "heating"} is off.` : l === "boost" && o ? P = `Your schedule is running, starting early so it's warm by ${o}.` : l === "boost" && (P = "Boosting now. Your schedule carries on after the boost."), /* @__PURE__ */ i.jsxs("div", { className: "sched", children: [
    /* @__PURE__ */ i.jsx("p", { className: "sched-status muted", children: P }),
    /* @__PURE__ */ i.jsx("div", { className: "sched-days", role: "tablist", "aria-label": "Day", children: bt.map((_) => /* @__PURE__ */ i.jsxs(
      "button",
      {
        role: "tab",
        "aria-selected": _ === g,
        "aria-label": _,
        className: `sched-day ${_ === g ? "on" : ""} ${_ === b ? "today" : ""}`,
        onClick: () => {
          v(_), E(null);
        },
        children: [
          _[0].toUpperCase(),
          Se.includes(_) && /* @__PURE__ */ i.jsx("i", { className: "sched-dot", "aria-label": "changed" })
        ]
      },
      _
    )) }),
    h.text && h.kind !== "idle" && /* @__PURE__ */ i.jsx("div", { className: `status ${h.kind}`, children: h.text }),
    /* @__PURE__ */ i.jsxs("div", { className: "sched-list", children: [
      f.length === 0 && /* @__PURE__ */ i.jsxs("p", { className: "muted sched-empty", children: [
        "Nothing scheduled on ",
        g[0].toUpperCase() + g.slice(1),
        " yet."
      ] }),
      f.map((_, M) => {
        var ne;
        const D = ((ne = f[M + 1]) == null ? void 0 : ne.time) ?? (We ? `${We} (${zn(He)})` : "00:00"), se = Ve(_);
        return /* @__PURE__ */ i.jsxs("button", { className: "slot", onClick: () => E(M), children: [
          /* @__PURE__ */ i.jsx(
            "span",
            {
              className: `slot-badge ${se ? "off" : ""}`,
              style: se ? void 0 : { borderColor: w ? "var(--hl-brand)" : vp(_.setpoint, C, r) },
              children: se ? /* @__PURE__ */ i.jsx(T, { name: w ? "power" : "snowflake" }) : w ? "On" : `${_.setpoint}°`
            }
          ),
          /* @__PURE__ */ i.jsxs("span", { className: "slot-time", children: [
            _.time,
            " – ",
            D
          ] }),
          /* @__PURE__ */ i.jsx(T, { name: "chevron-right", className: "slot-chev" })
        ] }, M);
      }),
      /* @__PURE__ */ i.jsxs("button", { className: "slot slot-add", onClick: () => {
        j(), E(f.length);
      }, disabled: f.length >= x, children: [
        /* @__PURE__ */ i.jsx("span", { className: "slot-badge add", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) }),
        /* @__PURE__ */ i.jsx("span", { className: "slot-time", children: f.length >= x ? `${x} times a day at most` : "Add a time" })
      ] })
    ] }),
    $ && /* @__PURE__ */ i.jsxs("div", { className: "sched-save", children: [
      /* @__PURE__ */ i.jsx(T, { name: "pencil-outline", className: "sched-save-icon" }),
      /* @__PURE__ */ i.jsx("span", { className: "sched-changed", title: `Changed: ${Se.map(zn).join(", ")}`, children: "Unsaved changes" }),
      /* @__PURE__ */ i.jsx("button", { className: "sched-undo", onClick: () => {
        s(u), E(null);
      }, children: "Undo" }),
      /* @__PURE__ */ i.jsx("button", { className: "sched-write", onClick: d, disabled: h.kind === "busy", children: "Save" })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: `fab-wrap ${$ ? "raised" : ""}`, children: [
      F && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx("div", { className: "fab-backdrop", onClick: () => W(!1) }),
        /* @__PURE__ */ i.jsxs("div", { className: "fab-menu", role: "menu", children: [
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            W(!1), p();
          }, disabled: h.kind === "busy", children: [
            /* @__PURE__ */ i.jsx(T, { name: "download" }),
            " Read from the receiver"
          ] }),
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            W(!1), z(fp);
          }, disabled: !f.length, children: [
            /* @__PURE__ */ i.jsx(T, { name: "content-copy" }),
            " Copy ",
            zn(g),
            " to weekdays"
          ] }),
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            W(!1), z(pp);
          }, disabled: !f.length, children: [
            /* @__PURE__ */ i.jsx(T, { name: "content-copy" }),
            " Copy ",
            zn(g),
            " to the weekend"
          ] }),
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            W(!1), z([...bt]);
          }, disabled: !f.length, children: [
            /* @__PURE__ */ i.jsx(T, { name: "content-copy" }),
            " Copy ",
            zn(g),
            " to every day"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("button", { className: "fab", "aria-label": "More", "aria-expanded": F, onClick: () => W(!F), children: /* @__PURE__ */ i.jsx(T, { name: F ? "close" : "dots-horizontal" }) })
    ] }),
    R != null && f[R] && /* @__PURE__ */ i.jsx(
      gp,
      {
        slot: f[R],
        dayName: g[0].toUpperCase() + g.slice(1),
        isWater: w,
        limits: r,
        canDelete: !0,
        onChange: (_) => k(f.map((M, D) => D === R ? _ : M)),
        onDelete: () => {
          k(f.filter((_, M) => M !== R)), E(null);
        },
        onClose: () => E(null)
      }
    )
  ] });
}
function mp(e, t) {
  const n = new Set(e.map((l) => Wr(l.time)));
  let r = Math.min(t, 23 * 60 + 30);
  for (; n.has(r) && r < 1439; ) r += 15;
  return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function vp(e, t, n) {
  if (e <= n.heat_min) return "var(--hl-off-fill)";
  const r = Math.min(1, Math.max(0, (e - t.lo) / Math.max(1, t.hi - t.lo)));
  return `hsl(${Math.round(42 - 34 * r)} ${Math.round(88 + 4 * r)}% ${Math.round(64 - 14 * r)}%)`;
}
function gp({
  slot: e,
  dayName: t,
  isWater: n,
  limits: r,
  canDelete: l,
  onChange: o,
  onDelete: a,
  onClose: s
}) {
  S.useEffect(() => {
    const v = (h) => h.key === "Escape" && s();
    return window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v);
  }, [s]);
  const u = n ? e.setpoint < r.water_on : e.setpoint <= r.heat_min, c = (v) => Math.min(r.heat_max, Math.max(5, Math.round(v * 2) / 2)), g = u ? 20 : e.setpoint;
  return /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: s, children: /* @__PURE__ */ i.jsxs("div", { className: "sheet heat", role: "dialog", "aria-modal": "true", "aria-label": `Edit ${t} at ${e.time}`, onClick: (v) => v.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ i.jsx("h2", { children: e.time }),
      /* @__PURE__ */ i.jsx("span", { className: "muted", children: t })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Starts at" }),
      /* @__PURE__ */ i.jsx("input", { className: "sheet-time", type: "time", value: e.time, onChange: (v) => v.target.value && o({ ...e, time: v.target.value }) })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: n ? "Hot water" : "Heating" }),
      /* @__PURE__ */ i.jsxs("div", { className: "sheet-lengths", children: [
        /* @__PURE__ */ i.jsx("button", { className: u ? "" : "on", onClick: () => o({ ...e, setpoint: n ? r.water_on : g }), children: n ? "On" : "Heat to" }),
        /* @__PURE__ */ i.jsx("button", { className: u ? "on" : "", onClick: () => o({ ...e, setpoint: n ? r.water_off : r.heat_min }), children: "Off" })
      ] })
    ] }),
    !n && !u && /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Temperature" }),
      /* @__PURE__ */ i.jsxs("div", { className: "sheet-temp", children: [
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => o({ ...e, setpoint: c(e.setpoint - 0.5) }), "aria-label": "Lower", children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
        /* @__PURE__ */ i.jsxs("span", { className: "sheet-temp-value", children: [
          e.setpoint.toFixed(1),
          "°"
        ] }),
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => o({ ...e, setpoint: c(e.setpoint + 0.5) }), "aria-label": "Raise", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
      ] })
    ] }),
    !n && u && /* @__PURE__ */ i.jsx("p", { className: "muted small sheet-note", children: "Off means the thermostat only keeps the house above its frost protection temperature." }),
    /* @__PURE__ */ i.jsx("button", { className: "sheet-go", onClick: s, children: "Done" }),
    l && /* @__PURE__ */ i.jsxs("button", { className: "ghost sheet-cancel danger-text", onClick: a, children: [
      /* @__PURE__ */ i.jsx(T, { name: "delete-outline" }),
      " Remove this time"
    ] })
  ] }) });
}
const os = [
  { id: 1, label: "D", name: "Day" },
  { id: 7, label: "W", name: "Week" },
  { id: 30, label: "M", name: "Month" }
], xp = 5 * 6e4, Vr = (e) => {
  const t = Math.round(e);
  return t < 60 ? `${t}m` : t % 60 ? `${Math.floor(t / 60)}h ${t % 60}m` : `${t / 60}h`;
}, ei = (e, t) => new Date(e * 1e3).toLocaleDateString([], t), yp = (e) => new Date(e * 1e3).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
function wp(e, t, n) {
  if (n === 1) return ei(e, { weekday: "short", day: "numeric", month: "short" });
  const r = t - 86400, l = new Date(e * 1e3), o = new Date(r * 1e3), a = (s) => s.toLocaleDateString([], { month: "short" });
  return l.getMonth() === o.getMonth() ? `${l.getDate()}–${o.getDate()} ${a(o)}` : `${l.getDate()} ${a(l)} – ${o.getDate()} ${a(o)}`;
}
const is = (e) => e.filter((t) => t != null);
function kp(e) {
  if (e.period === 1) {
    const t = [];
    for (let n = 0; n < e.series.length; n += 4) {
      const r = e.series.slice(n, n + 4).filter((a) => a.heating != null);
      if (!r.length) continue;
      const l = is(r.map((a) => a.current)), o = is(e.series.slice(n, n + 4).map((a) => a.outdoor));
      t.push({
        key: e.series[n].t,
        label: [yp(e.series[n].t), ""],
        minutes: r.reduce((a, s) => a + (s.heating ?? 0) * 15, 0),
        avg: l.length ? l.reduce((a, s) => a + s, 0) / l.length : null,
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
    label: [ei(t.start, { weekday: "short" }), ei(t.start, { day: "numeric" })],
    minutes: t.heating_minutes,
    avg: t.temp_avg,
    min: t.temp_min,
    max: t.temp_max,
    outMin: t.outdoor_min,
    outMax: t.outdoor_max
  })).reverse();
}
function Sc({ getHass: e, devices: t, channel: n }) {
  var R;
  const [r, l] = S.useState((R = t[0]) == null ? void 0 : R.entry_id), o = t.find((E) => E.entry_id === r) ?? t[0], a = n ?? "heat", [s, u] = S.useState(7), [c, g] = S.useState("time"), [v, h] = S.useState(0), [m, y] = S.useState(null), [w, $] = S.useState(""), [p, d] = S.useState(!0), f = a === "water", x = f ? "time" : c, k = S.useCallback(() => {
    o && e().callWS({ type: "hive_local/stats", entry_id: o.entry_id, channel: a, days: s, offset: v }).then((E) => {
      y(E), $("");
    }).catch((E) => $(me(E))).finally(() => d(!1));
  }, [e, o, a, s, v]);
  if (S.useEffect(() => {
    if (d(!0), k(), v) return;
    const E = setInterval(k, xp);
    return () => clearInterval(E);
  }, [k, v]), !o) return null;
  const j = m && m.period === s && m.offset === v ? m : null, z = j ? kp(j) : [], C = s === 1 ? "hour" : "day", b = !f && !!(j != null && j.outdoor);
  return /* @__PURE__ */ i.jsxs("div", { className: "history", children: [
    !n && /* @__PURE__ */ i.jsx("h2", { className: "history-title", children: "Heating history" }),
    !n && t.length > 1 && /* @__PURE__ */ i.jsx("div", { className: "history-tabs", role: "tablist", children: t.map((E) => /* @__PURE__ */ i.jsx("button", { role: "tab", "aria-selected": E.entry_id === o.entry_id, className: E.entry_id === o.entry_id ? "on" : "", onClick: () => {
      l(E.entry_id), h(0);
    }, children: E.name }, E.entry_id)) }),
    /* @__PURE__ */ i.jsxs("div", { className: "history-controls", children: [
      /* @__PURE__ */ i.jsx("div", { className: "history-toggle", role: "radiogroup", "aria-label": "Period", children: os.map((E) => /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": E.id === s, "aria-label": E.name, title: E.name, className: E.id === s ? "on" : "", onClick: () => {
        u(E.id), h(0);
      }, children: E.label }, E.id)) }),
      !f && /* @__PURE__ */ i.jsxs("div", { className: "history-toggle", role: "radiogroup", "aria-label": "Show", children: [
        /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": c === "time", title: "Time on", "aria-label": "Time on", className: `wide ${c === "time" ? "on" : ""}`, onClick: () => g("time"), children: /* @__PURE__ */ i.jsx(T, { name: "clock-outline" }) }),
        /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": c === "temp", title: "Temperature", "aria-label": "Temperature", className: `wide ${c === "temp" ? "on" : ""}`, onClick: () => g("temp"), children: /* @__PURE__ */ i.jsx(T, { name: "thermometer" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "history-date", children: [
      /* @__PURE__ */ i.jsx("button", { className: "round ghost", onClick: () => h(v + 1), "aria-label": "Earlier", children: /* @__PURE__ */ i.jsx(T, { name: "chevron-left" }) }),
      /* @__PURE__ */ i.jsxs("span", { className: "history-range", children: [
        /* @__PURE__ */ i.jsx(T, { name: "calendar-blank-outline" }),
        " ",
        j ? wp(j.start, j.period_end, s) : "…"
      ] }),
      /* @__PURE__ */ i.jsx("button", { className: "round ghost", onClick: () => h(Math.max(0, v - 1)), disabled: v === 0, "aria-label": "Later", children: /* @__PURE__ */ i.jsx(T, { name: "chevron-right" }) })
    ] }),
    w && /* @__PURE__ */ i.jsx("div", { className: "status error", children: w }),
    p && !j && /* @__PURE__ */ i.jsx("p", { className: "muted history-empty", children: "Loading…" }),
    j && !j.has_data && /* @__PURE__ */ i.jsxs("p", { className: "muted history-empty", children: [
      "No history for this ",
      os.find((E) => E.id === s).name.toLowerCase(),
      ". Home Assistant keeps 10 days unless",
      " ",
      /* @__PURE__ */ i.jsx("code", { children: "purge_keep_days" }),
      " is raised."
    ] }),
    (j == null ? void 0 : j.has_data) && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx(Sp, { data: j, metric: x, water: f, units: C, rows: z }),
      /* @__PURE__ */ i.jsxs("div", { className: "history-rows", children: [
        z.length > 0 && !f && /* @__PURE__ */ i.jsxs("div", { className: `history-key muted small ${b ? "with-outdoor" : ""}`, children: [
          b && /* @__PURE__ */ i.jsxs("span", { title: "Outside temperature", children: [
            /* @__PURE__ */ i.jsx(T, { name: "weather-partly-cloudy" }),
            " Outside"
          ] }),
          /* @__PURE__ */ i.jsxs("span", { title: "Lowest and highest room temperature", children: [
            /* @__PURE__ */ i.jsx(T, { name: "thermometer" }),
            " Low · high"
          ] })
        ] }),
        z.map((E) => /* @__PURE__ */ i.jsx(Cp, { row: E, metric: x, water: f, outdoor: b, scale: jp(z, x, s) }, E.key))
      ] }),
      !f && j.outdoor_entity == null && /* @__PURE__ */ i.jsx("p", { className: "history-hint muted small", children: "To see the temperature outside here, pick a weather entity or outdoor sensor in Hive Local's settings (Settings › Devices & services › Hive Local › Configure)." })
    ] })
  ] });
}
function jp(e, t, n) {
  if (t === "time") return { lo: 0, hi: Math.max(60, ...e.map((a) => a.minutes ?? 0)) };
  const r = e.map((a) => a.avg).filter((a) => a != null), l = r.length ? Math.floor(Math.min(...r)) - 2 : 10, o = r.length ? Math.ceil(Math.max(...r)) : 25;
  return { lo: l, hi: Math.max(o, l + 4) };
}
function Sp({ data: e, metric: t, water: n, units: r, rows: l }) {
  const o = Math.max(1, l.filter((y) => y.minutes != null).length), a = e.previous, s = !!(a != null && a.has_data) && a.known_minutes >= 0.5 * e.known_minutes, u = s ? e.heating_minutes - a.heating_minutes : 0, c = e.temperature, [g, v, h, m] = t === "time" ? [n ? "Hot water on" : "Boiler on", Vr(e.heating_minutes), `Average per ${r}`, Vr(e.heating_minutes / o)] : ["Average", c.avg != null ? `${c.avg.toFixed(1)}°` : "–", "Lowest – highest", c.min != null && c.max != null ? `${c.min.toFixed(1)}–${c.max.toFixed(1)}°` : "–"];
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs("div", { className: "history-summary", children: [
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("span", { className: "muted", children: g }),
        /* @__PURE__ */ i.jsx("b", { children: v })
      ] }),
      /* @__PURE__ */ i.jsx("i", {}),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("span", { className: "muted", children: h }),
        /* @__PURE__ */ i.jsx("b", { children: m })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("p", { className: "history-note muted small", children: [
      t === "time" && s && (Math.abs(u) < 1 ? "Same as the period before · " : `${Vr(Math.abs(u))} ${u > 0 ? "more" : "less"} than the period before · `),
      "Fired up ",
      e.cycles,
      " time",
      e.cycles === 1 ? "" : "s",
      e.boosts ? ` · ${e.boosts} boost${e.boosts === 1 ? "" : "s"}` : "",
      t === "temp" && e.target_avg != null ? ` · average target ${e.target_avg.toFixed(1)}°` : "",
      !n && Np(e)
    ] })
  ] });
}
function Np(e) {
  var o, a;
  const t = (o = e.outdoor) == null ? void 0 : o.avg;
  if (t == null) return "";
  const n = (a = e.previous) == null ? void 0 : a.outdoor_avg, r = n != null ? t - n : null, l = r == null ? "" : Math.abs(r) < 0.5 ? ", about the same as the period before" : `, ${Math.abs(r).toFixed(0)}° ${r < 0 ? "colder" : "milder"} than the period before`;
  return ` · ${t.toFixed(0)}° outside${l}`;
}
function _p(e, t) {
  if (e == null || t == null) return "–";
  const [n, r] = [e.toFixed(0), t.toFixed(0)];
  return n === r ? `${n}°` : `${n}–${r}°`;
}
function Cp({ row: e, metric: t, water: n, outdoor: r, scale: l }) {
  const o = t === "time" ? e.minutes : e.avg, a = o == null ? 0 : Math.max(0.02, Math.min(1, (o - l.lo) / (l.hi - l.lo || 1)));
  return /* @__PURE__ */ i.jsxs("div", { className: `history-row ${r ? "with-outdoor" : ""}`, children: [
    /* @__PURE__ */ i.jsxs("span", { className: "history-day", children: [
      e.label[0],
      " ",
      /* @__PURE__ */ i.jsx("span", { children: e.label[1] })
    ] }),
    /* @__PURE__ */ i.jsxs("span", { className: "history-bar", children: [
      o != null && o > 0 && /* @__PURE__ */ i.jsx("i", { style: { width: `${a * 100}%` } }),
      /* @__PURE__ */ i.jsx("span", { className: "history-value", children: o == null ? "–" : t === "time" ? Vr(o) : `${o.toFixed(1)}°` })
    ] }),
    r && /* @__PURE__ */ i.jsx("span", { className: "history-outdoor", title: "Lowest and highest outside temperature", children: _p(e.outMin, e.outMax) }),
    !n && /* @__PURE__ */ i.jsxs("span", { className: "history-temps", title: "Lowest and highest room temperature", children: [
      e.min != null ? `${e.min.toFixed(0)}°` : "–",
      /* @__PURE__ */ i.jsx("span", { children: e.max != null ? `${e.max.toFixed(0)}°` : "–" })
    ] })
  ] });
}
const Ep = [
  { id: "control", label: "Control" },
  { id: "schedule", label: "Schedule" },
  { id: "history", label: "History" }
];
function bp({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  limits: l,
  showDevice: o,
  tab: a,
  onTab: s,
  onBack: u
}) {
  var m, y;
  const [c, g] = S.useState(a === "schedule");
  S.useEffect(() => {
    a === "schedule" && g(!0);
  }, [a]);
  const v = r == null ? void 0 : r.status, h = [
    o ? t.name : null,
    v ? v.mode === "schedule" ? "On schedule" : v.mode === "boost" ? (m = r == null ? void 0 : r.preheat) != null && m.active_for ? `Pre-heating for ${r.preheat.active_for}` : "Boosting" : v.mode === "off" ? "Off" : n === "water" ? "Always on" : "Manual" : "Waiting for the receiver"
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ i.jsxs("div", { className: "device-page", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "page-head", children: [
      /* @__PURE__ */ i.jsx("button", { className: "round ghost", onClick: u, "aria-label": "Back to the overview", children: /* @__PURE__ */ i.jsx(T, { name: "chevron-left" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "page-title", children: [
        /* @__PURE__ */ i.jsx("h2", { children: Hn[n] }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: h })
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "page-tabs", role: "tablist", children: Ep.map((w) => /* @__PURE__ */ i.jsx("button", { role: "tab", "aria-selected": w.id === a, className: w.id === a ? "on" : "", onClick: () => s(w.id), children: w.label }, w.id)) }),
    a === "control" && /* @__PURE__ */ i.jsx(jc, { getHass: e, device: t, channel: n, info: r, showDevice: !1, limits: l, page: !0 }),
    a === "control" && n === "heat" && (r == null ? void 0 : r.preheat) && /* @__PURE__ */ i.jsx(dp, { getHass: e, device: t, info: r.preheat }),
    c && /* @__PURE__ */ i.jsx("div", { hidden: a !== "schedule", children: /* @__PURE__ */ i.jsx(hp, { getHass: e, device: t, channel: n, limits: l, mode: (v == null ? void 0 : v.mode) ?? null, preheatFor: (v == null ? void 0 : v.mode) === "boost" ? ((y = r == null ? void 0 : r.preheat) == null ? void 0 : y.active_for) ?? null : null }) }),
    a === "history" && /* @__PURE__ */ i.jsx(Sc, { getHass: e, devices: [t], channel: n })
  ] });
}
const zp = 20, Pp = 6e4;
function Tp({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onOpenDevice: l
}) {
  const [o, a] = S.useState(null), [s, u] = S.useState(""), [c, g] = S.useState(!1), v = S.useCallback(() => {
    e().callWS({ type: "hive_local/rooms/valves" }).then((m) => a(m.valves)).catch((m) => u(me(m)));
  }, [e]);
  S.useEffect(() => {
    v();
    const m = setInterval(v, Pp);
    return () => clearInterval(m);
  }, [v]);
  const h = t.length > 1;
  return /* @__PURE__ */ i.jsxs("div", { className: "stack devices-page", children: [
    /* @__PURE__ */ i.jsx("h2", { className: "history-title", children: "Devices" }),
    s && /* @__PURE__ */ i.jsx("div", { className: "status error", children: s }),
    /* @__PURE__ */ i.jsxs("div", { className: "device-grid", children: [
      t.map((m) => /* @__PURE__ */ i.jsx(Lp, { device: m, status: n, onOpen: (y) => l(m.entry_id, y) }, m.entry_id)),
      o == null ? void 0 : o.map((m) => /* @__PURE__ */ i.jsx(Mp, { valve: m }, m.entity_id))
    ] }),
    o && !o.length && /* @__PURE__ */ i.jsx("p", { className: "muted", children: "No Hive radiator valves yet. Pair them with ZHA or Zigbee2MQTT and they'll show up here." }),
    h && /* @__PURE__ */ i.jsx("p", { className: "muted small", children: "Each receiver is a heating zone." }),
    /* @__PURE__ */ i.jsx("div", { className: "fab-wrap", children: /* @__PURE__ */ i.jsx("button", { className: "fab", "aria-label": "Add a device", onClick: () => g(!0), children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) }) }),
    c && /* @__PURE__ */ i.jsx(Rp, { onClose: () => g(!1) })
  ] });
}
const $p = { z2m: "Zigbee2MQTT", zha: "ZHA" };
function Nc({ items: e }) {
  return /* @__PURE__ */ i.jsx("div", { className: "facts", children: e.map((t) => /* @__PURE__ */ i.jsxs("span", { className: `fact ${t.warn ? "warn" : ""}`, children: [
    /* @__PURE__ */ i.jsx(T, { name: t.icon }),
    " ",
    t.text
  ] }, t.text)) });
}
function _c({ online: e, text: t }) {
  return /* @__PURE__ */ i.jsxs("span", { className: `online ${e ? "" : "no"}`, children: [
    /* @__PURE__ */ i.jsx("i", {}),
    t ?? (e ? "Online" : "Not responding")
  ] });
}
function Lp({ device: e, status: t, onOpen: n }) {
  const r = e.channels.some((l) => {
    var o, a;
    return (a = (o = t[e.entry_id]) == null ? void 0 : o[l]) == null ? void 0 : a.status;
  });
  return /* @__PURE__ */ i.jsxs("section", { className: "card hw", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "hw-head", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "radiator" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "device-name", children: [
        /* @__PURE__ */ i.jsx("span", { children: e.name }),
        /* @__PURE__ */ i.jsxs("span", { className: "muted small", children: [
          "Hive receiver",
          e.model ? ` · ${e.model}` : ""
        ] })
      ] }),
      /* @__PURE__ */ i.jsx(_c, { online: r, text: r ? "Online" : "Waiting" })
    ] }),
    /* @__PURE__ */ i.jsx(
      Nc,
      {
        items: [
          { icon: "zigbee", text: $p[e.transport ?? "z2m"] },
          { icon: "fire", text: e.channels.includes("water") ? "Heating and hot water" : "Heating only" }
        ]
      }
    ),
    /* @__PURE__ */ i.jsx("div", { className: "hw-links", children: e.channels.map((l) => /* @__PURE__ */ i.jsxs("button", { className: "hw-link", onClick: () => n(l), children: [
      Hn[l],
      " ",
      /* @__PURE__ */ i.jsx(T, { name: "chevron-right" })
    ] }, l)) })
  ] });
}
function Mp({ valve: e }) {
  const t = e.battery != null && !Number.isNaN(Number(e.battery)) ? Number(e.battery) : null, n = t != null && t < zp;
  return /* @__PURE__ */ i.jsxs("section", { className: `card hw ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ i.jsxs("div", { className: "hw-head", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "thermostat" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "device-name", children: [
        /* @__PURE__ */ i.jsx("span", { children: e.name }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "Hive radiator valve" })
      ] }),
      /* @__PURE__ */ i.jsx(_c, { online: e.available })
    ] }),
    /* @__PURE__ */ i.jsx(
      Nc,
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
function Rp({ onClose: e }) {
  const [t, n] = S.useState(!1);
  S.useEffect(() => {
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
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "radiator" }) }),
        /* @__PURE__ */ i.jsxs("span", { className: "add-text", children: [
          /* @__PURE__ */ i.jsx("b", { children: "Hive receiver" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "A boiler receiver (another heating zone). Opens Home Assistant's setup for Hive Local." })
        ] }),
        /* @__PURE__ */ i.jsx(T, { name: "chevron-right" })
      ] }),
      /* @__PURE__ */ i.jsxs("button", { className: "add-option", onClick: () => n(!t), children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "thermostat" }) }),
        /* @__PURE__ */ i.jsxs("span", { className: "add-text", children: [
          /* @__PURE__ */ i.jsx("b", { children: "Radiator valve" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: t ? "Pair it with ZHA or Zigbee2MQTT first (Settings → Devices & services). It then appears here, and you can put it in a room on the Rooms tab." : "A Hive radiator valve (UK7004240)." })
        ] }),
        /* @__PURE__ */ i.jsx(T, { name: t ? "chevron-up" : "chevron-down" })
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: e, children: "Close" })
  ] }) });
}
const Cc = 20, vl = (e) => e == null ? "–" : `${e.toFixed(1)}°`;
function Op({ valve: e, heating: t }) {
  const n = e.battery == null ? null : Number(e.battery), r = n != null && !Number.isNaN(n) && n <= Cc;
  return /* @__PURE__ */ i.jsxs("li", { className: `valve ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ i.jsx(T, { name: t ? "fire" : "radiator", className: t ? "valve-icon heating" : "valve-icon" }),
    /* @__PURE__ */ i.jsx("span", { className: "valve-name", children: e.name }),
    e.available ? /* @__PURE__ */ i.jsxs("span", { className: "valve-temps", children: [
      vl(e.current_temperature),
      " ",
      /* @__PURE__ */ i.jsxs("span", { className: "muted", children: [
        "→ ",
        vl(e.target)
      ] })
    ] }) : /* @__PURE__ */ i.jsx("span", { className: "chip", children: "Unavailable" }),
    n != null && !Number.isNaN(n) && /* @__PURE__ */ i.jsxs("span", { className: `battery ${r ? "low" : ""}`, title: r ? "Battery low" : "Battery", children: [
      /* @__PURE__ */ i.jsx(T, { name: r ? "battery-alert-variant-outline" : "battery-outline" }),
      " ",
      Math.round(n),
      "%"
    ] })
  ] });
}
const Fp = 8, as = 5;
function Dp({ getHass: e, valves: t, info: n, roomName: r, thisRoom: l, chosen: o, onToggle: a }) {
  const [s, u] = S.useState(null), [c, g] = S.useState(null), v = S.useRef();
  S.useEffect(() => () => window.clearTimeout(v.current), []);
  const [h, m] = S.useState(""), [y, w] = S.useState(!1), $ = t.length > Fp, p = h.trim().toLowerCase(), d = r.trim().toLowerCase(), f = (E) => !!d && (E.area ?? "").toLowerCase() === d, x = (E) => {
    var W;
    const F = (W = n.get(E.entity_id)) == null ? void 0 : W.room;
    return F && F !== l ? F : null;
  }, [k] = S.useState(() => new Set(o)), j = (E) => k.has(E.entity_id) ? 0 : f(E) ? 1 : x(E) ? 3 : 2, z = [...t].sort((E, F) => j(E) - j(F));
  let C;
  p ? C = z.filter((E) => E.name.toLowerCase().includes(p) || (E.area ?? "").toLowerCase().includes(p)) : y ? C = z : C = z.filter((F) => j(F) < 3).filter((F, W) => k.has(F.entity_id) || o.has(F.entity_id) || W < as);
  const b = p ? 0 : t.length - C.length, R = async (E) => {
    g(null), u(E.entity_id);
    try {
      await e().callWS({ type: "hive_local/rooms/identify", entity_id: E.entity_id }), g({ kind: "ok", text: `${E.name} is flashing its light.` }), window.clearTimeout(v.current), v.current = window.setTimeout(() => {
        u(null), g(null);
      }, 1e4);
    } catch (F) {
      u(null), g({ kind: "error", text: me(F) });
    }
  };
  return t.length ? /* @__PURE__ */ i.jsxs("div", { className: "valve-picker", children: [
    $ && /* @__PURE__ */ i.jsxs("label", { className: "valve-search", children: [
      /* @__PURE__ */ i.jsx(T, { name: "magnify" }),
      /* @__PURE__ */ i.jsx("input", { type: "search", value: h, placeholder: "Search valves or areas", "aria-label": "Search valves or areas", onChange: (E) => m(E.target.value) }),
      h && /* @__PURE__ */ i.jsx("button", { type: "button", className: "ghost round", "aria-label": "Clear the search", onClick: () => m(""), children: /* @__PURE__ */ i.jsx(T, { name: "close" }) })
    ] }),
    !C.length && p && /* @__PURE__ */ i.jsxs("span", { className: "muted small", children: [
      'No valves match "',
      h.trim(),
      '".'
    ] }),
    !C.length && !p && /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "Every valve is in another room. Search, or show them all, to move one here." }),
    C.length > 0 && /* @__PURE__ */ i.jsx("div", { className: "valve-list", children: C.map((E) => {
      const F = n.get(E.entity_id), W = o.has(E.entity_id), Se = (F == null ? void 0 : F.battery) == null ? null : Number(F.battery), He = Se != null && !Number.isNaN(Se), We = He && Se <= Cc, Ve = x(E);
      return /* @__PURE__ */ i.jsxs("div", { className: `valve-pick ${W ? "on" : ""}`, children: [
        /* @__PURE__ */ i.jsxs("button", { type: "button", role: "checkbox", "aria-checked": W, className: "valve-pick-main", onClick: () => a(E.entity_id), children: [
          /* @__PURE__ */ i.jsx("span", { className: `valve-check ${W ? "on" : ""}`, "aria-hidden": "true", children: W && /* @__PURE__ */ i.jsx(T, { name: "check" }) }),
          /* @__PURE__ */ i.jsxs("span", { className: "valve-pick-text", children: [
            /* @__PURE__ */ i.jsx("span", { children: E.name }),
            /* @__PURE__ */ i.jsx("span", { className: "muted small", children: [E.area ?? "No area", Ve ? `in ${Ve}` : null].filter(Boolean).join(" · ") })
          ] }),
          /* @__PURE__ */ i.jsx("span", { className: "valve-pick-read small", children: F && !F.available ? "Not responding" : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
            (F == null ? void 0 : F.current_temperature) != null ? `${F.current_temperature.toFixed(1)}°` : "",
            He && /* @__PURE__ */ i.jsxs("span", { className: We ? "warn" : "", children: [
              (F == null ? void 0 : F.current_temperature) != null ? " · " : "",
              Math.round(Se),
              "%"
            ] })
          ] }) })
        ] }),
        (F == null ? void 0 : F.identify) && /* @__PURE__ */ i.jsxs("button", { type: "button", className: `valve-find ${s === E.entity_id ? "on" : ""}`, onClick: () => R(E), disabled: s === E.entity_id, "aria-label": `Find ${E.name}: flash its light`, children: [
          /* @__PURE__ */ i.jsx(T, { name: "lightbulb-on-outline" }),
          " ",
          /* @__PURE__ */ i.jsx("span", { className: "valve-find-label", children: s === E.entity_id ? "Flashing" : "Find" })
        ] })
      ] }, E.entity_id);
    }) }),
    b > 0 && /* @__PURE__ */ i.jsxs("button", { type: "button", className: "ghost valve-more", onClick: () => w(!0), children: [
      /* @__PURE__ */ i.jsx(T, { name: "chevron-down" }),
      " Show all ",
      t.length,
      " valves"
    ] }),
    y && !p && t.length > as && /* @__PURE__ */ i.jsxs("button", { type: "button", className: "ghost valve-more", onClick: () => w(!1), children: [
      /* @__PURE__ */ i.jsx(T, { name: "chevron-up" }),
      " Show fewer"
    ] }),
    c && /* @__PURE__ */ i.jsx("div", { className: `status ${c.kind} small`, children: c.text })
  ] }) : null;
}
function Ec({ dialog: e, label: t, onClose: n, children: r }) {
  return e ? /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: (l) => {
    l.stopPropagation(), n();
  }, children: /* @__PURE__ */ i.jsxs("div", { className: "sheet room-sheet room-editor", role: "dialog", "aria-modal": "true", "aria-label": t, onClick: (l) => l.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    r
  ] }) }) : /* @__PURE__ */ i.jsx("section", { className: "card room-editor", children: r });
}
function Ip(e) {
  return /* @__PURE__ */ i.jsx(bc, { ...e, dialog: !0 });
}
function bc({ getHass: e, room: t, onDone: n, dialog: r }) {
  S.useEffect(() => {
    if (!r) return;
    const b = (R) => R.key === "Escape" && n();
    return window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b);
  }, [r, n]);
  const [l, o] = S.useState(null), [a, s] = S.useState((t == null ? void 0 : t.receiver) ?? ""), [u, c] = S.useState((t == null ? void 0 : t.name) ?? ""), [g, v] = S.useState(new Set((t == null ? void 0 : t.valves) ?? [])), [h, m] = S.useState((t == null ? void 0 : t.sensor) ?? ""), [y, w] = S.useState(!1), [$, p] = S.useState(!1), [d, f] = S.useState(""), [x, k] = S.useState(/* @__PURE__ */ new Map());
  S.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/candidates" }).then(o).catch((b) => f(me(b))), e().callWS({ type: "hive_local/rooms/valves" }).then((b) => k(new Map(b.valves.map((R) => [R.entity_id, R])))).catch(() => {
    });
  }, [e]);
  const j = ((l == null ? void 0 : l.receivers.length) ?? 0) > 1, z = async (b) => {
    w(!0), f("");
    try {
      await e().callWS(b), n();
    } catch (R) {
      f(me(R)), w(!1);
    }
  }, C = (b) => v((R) => {
    const E = new Set(R);
    return E.has(b) ? E.delete(b) : E.add(b), E;
  });
  return /* @__PURE__ */ i.jsxs(Ec, { dialog: !!r, label: t ? `Edit ${t.name}` : "New room", onClose: n, children: [
    /* @__PURE__ */ i.jsx("h2", { children: t ? `Edit ${t.name}` : "New room" }),
    /* @__PURE__ */ i.jsxs(
      "form",
      {
        className: "stack",
        onSubmit: (b) => {
          b.preventDefault(), z({
            type: "hive_local/rooms/save",
            ...t ? { room_id: t.id } : {},
            name: u,
            valves: [...g],
            sensor: h || null,
            receiver: a || null
          });
        },
        children: [
          /* @__PURE__ */ i.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ i.jsx("span", { children: "Name" }),
            /* @__PURE__ */ i.jsx("input", { id: `room-name-${(t == null ? void 0 : t.id) ?? "new"}`, type: "text", value: u, maxLength: 40, placeholder: "Lounge", onChange: (b) => c(b.target.value) })
          ] }),
          /* @__PURE__ */ i.jsxs("fieldset", { className: "field", children: [
            /* @__PURE__ */ i.jsxs("legend", { children: [
              "Hive radiator valves",
              g.size > 0 && /* @__PURE__ */ i.jsxs("span", { className: "valve-count", children: [
                g.size,
                " chosen"
              ] })
            ] }),
            !l && !d && /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "Loading…" }),
            l && !l.valves.length && /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "No Hive radiator valves found. Pair them with ZHA or Zigbee2MQTT first." }),
            /* @__PURE__ */ i.jsx(Dp, { getHass: e, valves: (l == null ? void 0 : l.valves) ?? [], info: x, roomName: u, thisRoom: (t == null ? void 0 : t.name) ?? null, chosen: g, onToggle: C })
          ] }),
          /* @__PURE__ */ i.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ i.jsx("span", { children: "Room temperature from" }),
            /* @__PURE__ */ i.jsxs("select", { id: `room-sensor-${(t == null ? void 0 : t.id) ?? "new"}`, value: h, onChange: (b) => m(b.target.value), children: [
              /* @__PURE__ */ i.jsx("option", { value: "", children: "The valves (their average)" }),
              ((l == null ? void 0 : l.sensors) ?? []).map((b) => /* @__PURE__ */ i.jsxs("option", { value: b.entity_id, children: [
                b.name,
                b.area ? ` · ${b.area}` : ""
              ] }, b.entity_id))
            ] })
          ] }),
          j && /* @__PURE__ */ i.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ i.jsx("span", { children: "Heated by" }),
            /* @__PURE__ */ i.jsxs("select", { id: `room-receiver-${(t == null ? void 0 : t.id) ?? "new"}`, value: a, onChange: (b) => s(b.target.value), children: [
              /* @__PURE__ */ i.jsx("option", { value: "", disabled: !0, children: "Choose the receiver for this room's radiators" }),
              l.receivers.map((b) => /* @__PURE__ */ i.jsx("option", { value: b.entry_id, children: b.name }, b.entry_id))
            ] })
          ] }),
          d && /* @__PURE__ */ i.jsx("div", { className: "status error", children: d }),
          /* @__PURE__ */ i.jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ i.jsx("button", { className: "primary", type: "submit", disabled: y || !u.trim() || !g.size || j && !a, children: t ? "Save" : "Add room" }),
            /* @__PURE__ */ i.jsx("button", { type: "button", className: "ghost", onClick: n, disabled: y, children: "Cancel" }),
            /* @__PURE__ */ i.jsx("span", { className: "spacer" }),
            t && ($ ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
              /* @__PURE__ */ i.jsxs("span", { className: "muted small", children: [
                "Delete ",
                t.name,
                "? The valves aren't changed."
              ] }),
              /* @__PURE__ */ i.jsx("button", { type: "button", className: "danger", disabled: y, onClick: () => z({ type: "hive_local/rooms/delete", room_id: t.id }), children: "Delete" }),
              /* @__PURE__ */ i.jsx("button", { type: "button", className: "ghost", onClick: () => p(!1), children: "Keep" })
            ] }) : /* @__PURE__ */ i.jsxs("button", { type: "button", className: "danger", onClick: () => p(!0), disabled: y, children: [
              /* @__PURE__ */ i.jsx(T, { name: "delete-outline" }),
              " Delete room"
            ] }))
          ] })
        ]
      }
    )
  ] });
}
function Ap({ getHass: e, roomId: t, several: n, onClose: r }) {
  var p;
  const [l, o] = S.useState(null), [a, s] = S.useState(!1), [u, c] = S.useState(null), [g, v] = S.useState(""), h = S.useRef();
  if (S.useEffect(() => {
    const d = e().connection.subscribeMessage(
      (f) => o(f.rooms.find((x) => x.id === t) ?? null),
      { type: "hive_local/rooms/subscribe" }
    );
    return () => {
      d.then((f) => f()).catch(() => {
      });
    };
  }, [e, t]), S.useEffect(() => {
    if (a) return;
    const d = (f) => f.key === "Escape" && r();
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, [r, a]), !l) return null;
  if (a) return /* @__PURE__ */ i.jsx(bc, { getHass: e, room: l, onDone: () => s(!1), dialog: !0 });
  const m = u ?? l.target ?? ((p = l.target_range) == null ? void 0 : p[1]) ?? 20, y = (d) => {
    const f = Math.min(35, Math.max(5, d));
    c(f), v(""), window.clearTimeout(h.current), h.current = window.setTimeout(async () => {
      try {
        const x = await e().callWS({ type: "hive_local/rooms/set_target", room_id: l.id, temperature: f });
        if (x.failed.length) {
          const k = l.valve_states.filter((j) => x.failed.includes(j.entity_id)).map((j) => j.name);
          v(`Didn't take on ${k.join(", ")}. It may be asleep; try again shortly.`);
        }
      } catch (x) {
        v(me(x));
      } finally {
        c(null);
      }
    }, 700);
  }, w = `${l.valves.length} valve${l.valves.length === 1 ? "" : "s"}`, $ = l.temperature_source === "sensor" ? l.sensor_name : l.temperature_source === "valves" ? "Average of the valves" : "No reading";
  return /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: (d) => {
    d.stopPropagation(), r();
  }, children: /* @__PURE__ */ i.jsxs("div", { className: "sheet heat room-sheet", role: "dialog", "aria-modal": "true", "aria-label": l.name, onClick: (d) => d.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ i.jsx("h2", { children: l.name }),
      /* @__PURE__ */ i.jsx("span", { className: "muted", children: [l.heating ? "Heating" : "Idle", n ? l.receiver_name : null, w].filter(Boolean).join(" · ") })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-live", children: [
      /* @__PURE__ */ i.jsx(T, { name: l.heating ? "fire" : "thermometer", className: l.heating ? "heating" : "" }),
      /* @__PURE__ */ i.jsxs("span", { children: [
        /* @__PURE__ */ i.jsx("b", { children: l.current_temperature == null ? "–" : `${l.current_temperature.toFixed(1)}°` }),
        " ",
        /* @__PURE__ */ i.jsx("span", { className: "muted", children: $ })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: l.target_range && u == null ? `Target (valves set to ${vl(l.target_range[0])}–${vl(l.target_range[1])})` : "Target" }),
      /* @__PURE__ */ i.jsxs("div", { className: "sheet-temp", children: [
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => y(m - 0.5), "aria-label": "Lower", children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
        /* @__PURE__ */ i.jsxs("span", { className: "sheet-temp-value", children: [
          m.toFixed(1),
          "°"
        ] }),
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => y(m + 0.5), "aria-label": "Raise", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Valves" }),
      /* @__PURE__ */ i.jsx("ul", { className: "valves", children: l.valve_states.map((d) => /* @__PURE__ */ i.jsx(Op, { valve: d, heating: l.heating_valves.includes(d.entity_id) }, d.entity_id)) })
    ] }),
    g && /* @__PURE__ */ i.jsx("div", { className: "status error", children: g }),
    /* @__PURE__ */ i.jsxs("div", { className: "room-sheet-actions", children: [
      /* @__PURE__ */ i.jsxs("button", { className: "ghost", onClick: () => s(!0), children: [
        /* @__PURE__ */ i.jsx(T, { name: "pencil-outline" }),
        " Edit room"
      ] }),
      /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: r, children: "Close" })
    ] })
  ] }) });
}
function Up(e) {
  const t = e.toLowerCase();
  return /lounge|living|sitting|family|snug/.test(t) ? "sofa-outline" : /bed|nursery|guest/.test(t) ? "bed-outline" : /kitchen|dining/.test(t) ? "silverware-fork-knife" : /landing|hall|stair/.test(t) ? "stairs" : /study|office/.test(t) ? "desk" : /bath|shower|en-?suite|wc|toilet/.test(t) ? "shower" : "home-thermometer-outline";
}
function Bp({ getHass: e, onDone: t }) {
  const [n, r] = S.useState(null), [l, o] = S.useState(/* @__PURE__ */ new Map()), [a, s] = S.useState(/* @__PURE__ */ new Set()), [u, c] = S.useState({}), [g, v] = S.useState(!1), [h, m] = S.useState("");
  S.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/suggest" }).then((x) => {
      r(x), s(new Set(x.rooms.map((k, j) => j)));
    }).catch((x) => m(me(x))), e().callWS({ type: "hive_local/rooms/candidates" }).then((x) => o(new Map([...x.valves, ...x.sensors].map((k) => [k.entity_id, k.name])))).catch(() => {
    });
  }, [e]);
  const y = ((n == null ? void 0 : n.receivers.length) ?? 0) > 1, w = ((n == null ? void 0 : n.rooms) ?? []).map((x, k) => [x, k]).filter(([, x]) => a.has(x)), $ = w.length > 0 && (!y || w.every(([, x]) => u[x])), p = ((n == null ? void 0 : n.rooms) ?? []).reduce((x, k) => x + k.valves.length, 0), d = async () => {
    v(!0), m("");
    try {
      for (const [x, k] of w)
        await e().callWS({ type: "hive_local/rooms/save", name: x.name, valves: x.valves, sensor: x.sensor, receiver: u[k] ?? null });
      t();
    } catch (x) {
      m(me(x)), v(!1);
    }
  }, f = (x) => s((k) => {
    const j = new Set(k);
    return j.has(x) ? j.delete(x) : j.add(x), j;
  });
  return /* @__PURE__ */ i.jsxs(Ec, { dialog: !0, label: "Set up your rooms", onClose: t, children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Set up your rooms" }),
    !n && !h && /* @__PURE__ */ i.jsx("p", { className: "muted setup-intro", children: "Looking for your valves…" }),
    n && !n.rooms.length && /* @__PURE__ */ i.jsx("p", { className: "muted setup-intro", children: "Every Hive radiator valve with an area is already in a room. Give the others an area in Home Assistant, or add rooms by hand." }),
    n && n.rooms.length > 0 && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs("p", { className: "muted setup-intro", children: [
        "Found ",
        p,
        " Hive radiator valve",
        p === 1 ? "" : "s",
        " in ",
        n.rooms.length,
        " area",
        n.rooms.length === 1 ? "" : "s",
        ". Pick the rooms to create. You can rename or change any of them later."
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "setup-list", children: n.rooms.map((x, k) => {
        const j = a.has(k), z = x.valves.map((b) => l.get(b) ?? b).join(", "), C = x.sensor ? `Temperature: ${l.get(x.sensor) ?? x.sensor}` : x.valves.length === 1 ? "Temperature: from the valve" : "Temperature: average of the valves";
        return /* @__PURE__ */ i.jsxs("div", { className: `setup-room ${j ? "on" : ""}`, children: [
          /* @__PURE__ */ i.jsxs("button", { type: "button", role: "checkbox", "aria-checked": j, className: "setup-room-main", onClick: () => f(k), children: [
            /* @__PURE__ */ i.jsx("span", { className: `valve-check ${j ? "on" : ""}`, "aria-hidden": "true", children: j && /* @__PURE__ */ i.jsx(T, { name: "check" }) }),
            /* @__PURE__ */ i.jsxs("span", { className: "setup-room-text", children: [
              /* @__PURE__ */ i.jsx("span", { children: x.name }),
              /* @__PURE__ */ i.jsx("span", { className: "muted small", children: z }),
              /* @__PURE__ */ i.jsx("span", { className: "muted small", children: C })
            ] }),
            /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: Up(x.name) }) })
          ] }),
          y && j && /* @__PURE__ */ i.jsxs("select", { "aria-label": `Which receiver heats ${x.name}`, value: u[k] ?? "", onChange: (b) => c((R) => ({ ...R, [k]: b.target.value })), children: [
            /* @__PURE__ */ i.jsx("option", { value: "", disabled: !0, children: "Heated by…" }),
            n.receivers.map((b) => /* @__PURE__ */ i.jsx("option", { value: b.entry_id, children: b.name }, b.entry_id))
          ] })
        ] }, x.name);
      }) })
    ] }),
    h && /* @__PURE__ */ i.jsx("div", { className: "status error", children: h }),
    n && n.rooms.length > 0 && /* @__PURE__ */ i.jsx("button", { className: "sheet-go", style: { "--hl-accent": "var(--hl-brand)" }, disabled: g || !$, onClick: d, children: g ? "Creating…" : `Create ${w.length} room${w.length === 1 ? "" : "s"}` }),
    /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: t, disabled: g, children: n != null && n.rooms.length ? "I'll set them up myself" : "Close" })
  ] });
}
function Hp({ getHass: e, devices: t, status: n }) {
  const [r, l] = S.useState(null), [o, a] = S.useState("");
  S.useEffect(() => {
    e().callWS({ type: "hive_local/settings" }).then(l).catch((u) => a(me(u)));
  }, [e]);
  const s = (u) => {
    l((c) => c && { ...c, outdoor_entity: u || null }), e().callWS({ type: "hive_local/settings/set", outdoor_entity: u || null }).catch((c) => a(me(c)));
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "settings", children: [
    /* @__PURE__ */ i.jsx("h2", { className: "history-title", children: "Settings" }),
    o && /* @__PURE__ */ i.jsx("div", { className: "status error", children: o }),
    /* @__PURE__ */ i.jsxs("section", { className: "settings-section", children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Outside temperature" }),
      /* @__PURE__ */ i.jsx("div", { className: "settings-group", children: /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "weather-partly-cloudy" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: "Weather or outdoor sensor" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "Shown in the heating history, next to the boiler's time on." })
        ] }),
        /* @__PURE__ */ i.jsxs("select", { "aria-label": "Outside temperature", value: (r == null ? void 0 : r.outdoor_entity) ?? "", onChange: (u) => s(u.target.value), disabled: !r, children: [
          /* @__PURE__ */ i.jsx("option", { value: "", children: "None" }),
          ((r == null ? void 0 : r.outdoor_candidates) ?? []).map((u) => /* @__PURE__ */ i.jsx("option", { value: u.entity_id, children: u.name }, u.entity_id))
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ i.jsx(Wp, { getHass: e }),
    t.map((u) => /* @__PURE__ */ i.jsxs("section", { className: "settings-section", children: [
      /* @__PURE__ */ i.jsx("h3", { children: t.length > 1 ? u.name : "Receiver" }),
      /* @__PURE__ */ i.jsx("div", { className: "settings-group", children: u.channels.map((c) => {
        var g;
        return /* @__PURE__ */ i.jsx(Qp, { getHass: e, device: u, channel: c, info: (g = n[u.entry_id]) == null ? void 0 : g[c] }, c);
      }) })
    ] }, u.entry_id))
  ] });
}
function Wp({ getHass: e }) {
  const [t, n] = S.useState(null), [r, l] = S.useState([]), [o, a] = S.useState(null), [s, u] = S.useState(!1), [c, g] = S.useState(0);
  S.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/suggest" }).then((h) => g(h.rooms.length)).catch(() => {
    });
  }, [e, t]), S.useEffect(() => {
    const h = e().connection.subscribeMessage(
      (m) => {
        n(m.rooms), l(m.receivers);
      },
      { type: "hive_local/rooms/subscribe" }
    );
    return () => {
      h.then((m) => m()).catch(() => {
      });
    };
  }, [e]);
  const v = r.length > 1;
  return /* @__PURE__ */ i.jsxs("section", { className: "settings-section", children: [
    /* @__PURE__ */ i.jsx("h3", { children: "Rooms" }),
    /* @__PURE__ */ i.jsx("p", { className: "muted small settings-help", children: "Group your Hive radiator valves into rooms. Each room then has a card on the Overview." }),
    /* @__PURE__ */ i.jsxs("div", { className: "settings-group", children: [
      (t ?? []).map((h) => /* @__PURE__ */ i.jsxs("button", { className: "settings-row link", onClick: () => a(h.id), children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "home-thermometer-outline" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: h.name }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: [
            `${h.valves.length} valve${h.valves.length === 1 ? "" : "s"}`,
            h.sensor_name ?? "temperature from the valves",
            v ? `heated by ${h.receiver_name}` : null
          ].filter(Boolean).join(" · ") })
        ] }),
        /* @__PURE__ */ i.jsx(T, { name: "chevron-right", className: "settings-chevron" })
      ] }, h.id)),
      c > 0 && /* @__PURE__ */ i.jsxs("button", { className: "settings-row link add", onClick: () => u(!0), children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "auto-fix" }) }),
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
      /* @__PURE__ */ i.jsxs("button", { className: "settings-row link add", onClick: () => a("new"), children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) }),
        /* @__PURE__ */ i.jsx("div", { className: "settings-text", children: /* @__PURE__ */ i.jsx("span", { children: "Add a room" }) })
      ] })
    ] }),
    s && /* @__PURE__ */ i.jsx(Bp, { getHass: e, onDone: () => u(!1) }),
    o && /* @__PURE__ */ i.jsx(
      Ip,
      {
        getHass: e,
        room: o === "new" || t == null ? void 0 : t.find((h) => h.id === o),
        onDone: () => a(null)
      }
    )
  ] });
}
const Vp = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, Tr = [15, 30, 45, 60, 90, 120, 180, 240, 360];
function Qp({ getHass: e, device: t, channel: n, info: r }) {
  const [l, o] = S.useState(null), a = S.useRef(), s = l ?? r;
  if (!s) return null;
  const u = (v, h) => {
    const m = { ...s, [v]: h };
    o(m), window.clearTimeout(a.current), a.current = window.setTimeout(() => {
      e().callWS({ type: "hive_local/defaults", entry_id: t.entry_id, channel: n, [v]: h }).finally(() => o(null));
    }, 800);
  }, c = (v) => {
    const h = Tr.findIndex((y) => y >= s.boost_minutes), m = h < 0 ? Tr.length - 1 : h;
    return Tr[Math.min(Tr.length - 1, Math.max(0, m + v))];
  }, g = n === "water";
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: g ? "water-boiler" : "radiator" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
        /* @__PURE__ */ i.jsx("span", { children: g ? "Hot water boost" : "Heating boost" }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "What Boost does unless you choose otherwise." })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-controls", children: [
        /* @__PURE__ */ i.jsx(io, { label: "How long", value: Vp(s.boost_minutes), onLower: () => u("boost_minutes", c(-1)), onRaise: () => u("boost_minutes", c(1)) }),
        !g && /* @__PURE__ */ i.jsx(io, { label: "Temperature", value: `${s.boost_temperature.toFixed(1)}°`, onLower: () => u("boost_temperature", Math.max(5, s.boost_temperature - 0.5)), onRaise: () => u("boost_temperature", Math.min(32, s.boost_temperature + 0.5)) })
      ] })
    ] }),
    !g && /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "snowflake" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
        /* @__PURE__ */ i.jsx("span", { children: "Frost protection" }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "The target shown while the schedule has the heating off. Only for display: the receiver isn't changed." })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "settings-controls", children: /* @__PURE__ */ i.jsx(io, { value: `${s.frost_temperature.toFixed(1)}°`, onLower: () => u("frost_temperature", Math.max(5, s.frost_temperature - 0.5)), onRaise: () => u("frost_temperature", Math.min(16, s.frost_temperature + 0.5)) }) })
    ] })
  ] });
}
function io({ label: e, value: t, onLower: n, onRaise: r }) {
  return /* @__PURE__ */ i.jsxs("div", { className: "adjust", children: [
    e && /* @__PURE__ */ i.jsx("span", { className: "muted small", children: e }),
    /* @__PURE__ */ i.jsxs("div", { className: "stepper", children: [
      /* @__PURE__ */ i.jsx("button", { className: "round", onClick: n, "aria-label": `Lower ${e ?? ""}`.trim(), children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
      /* @__PURE__ */ i.jsx("span", { className: "stepper-value", children: t }),
      /* @__PURE__ */ i.jsx("button", { className: "round", onClick: r, "aria-label": `Raise ${e ?? ""}`.trim(), children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
    ] })
  ] });
}
const Kp = [
  { id: "overview", label: "Overview", icon: "view-dashboard-outline" },
  { id: "devices", label: "Devices", icon: "devices" },
  { id: "stats", label: "Stats", icon: "chart-box-outline" },
  { id: "settings", label: "Settings", icon: "tune-variant" }
];
function Yp({ getHass: e, narrow: t, onToggleMenu: n }) {
  var z;
  const [r, l] = S.useState([]), [o, a] = S.useState(null), [s, u] = S.useState({}), [c, g] = S.useState("overview"), [v, h] = S.useState(null), [m, y] = S.useState("control"), [w, $] = S.useState(null), [p, d] = S.useState("");
  S.useEffect(() => {
    e().callWS({ type: "hive_local/devices" }).then((b) => {
      l(b.devices), a(b.limits);
    }).catch((b) => d(me(b)));
    const C = e().connection.subscribeMessage(
      (b) => u(b.status),
      { type: "hive_local/subscribe" }
    );
    return () => {
      C.then((b) => b()).catch(() => {
      });
    };
  }, [e]);
  const f = (C, b) => {
    h({ entry: C, channel: b }), y("control");
  }, x = (C) => {
    g(C), h(null), $(null);
  }, k = v && r.find((C) => C.entry_id === v.entry), j = Kp;
  return /* @__PURE__ */ i.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ i.jsx("header", { children: /* @__PURE__ */ i.jsxs("div", { className: "toolbar-row", children: [
      t && /* @__PURE__ */ i.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ i.jsx(T, { name: "menu" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ i.jsx(ls, {}),
        /* @__PURE__ */ i.jsx("h1", { children: "Hive Local" })
      ] }),
      /* @__PURE__ */ i.jsx("nav", { className: "tabs", role: "tablist", children: j.map((C) => /* @__PURE__ */ i.jsxs("button", { role: "tab", "aria-selected": C.id === c, className: C.id === c ? "on" : "", onClick: () => x(C.id), children: [
        /* @__PURE__ */ i.jsx(T, { name: C.icon }),
        /* @__PURE__ */ i.jsx("span", { children: C.label })
      ] }, C.id)) })
    ] }) }),
    /* @__PURE__ */ i.jsxs("main", { children: [
      p && /* @__PURE__ */ i.jsx("div", { className: "status error", children: p }),
      !r.length && !p && /* @__PURE__ */ i.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ i.jsx(ls, { size: 56 }),
        /* @__PURE__ */ i.jsx("p", { children: "No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local." })
      ] }),
      k && o ? /* @__PURE__ */ i.jsx(
        bp,
        {
          getHass: e,
          device: k,
          channel: v.channel,
          info: (z = s[k.entry_id]) == null ? void 0 : z[v.channel],
          limits: o,
          showDevice: r.length > 1,
          tab: m,
          onTab: y,
          onBack: () => h(null)
        },
        `${v.entry}-${v.channel}`
      ) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        c === "overview" && /* @__PURE__ */ i.jsx(ip, { getHass: e, devices: r, status: s, limits: o, onOpenDevice: f, onOpenRoom: $ }),
        c === "devices" && r.length > 0 && /* @__PURE__ */ i.jsx(Tp, { getHass: e, devices: r, status: s, limits: o, onOpenDevice: f }),
        c === "stats" && r.length > 0 && /* @__PURE__ */ i.jsx(Sc, { getHass: e, devices: r }),
        c === "settings" && r.length > 0 && /* @__PURE__ */ i.jsx(Hp, { getHass: e, devices: r, status: s })
      ] }),
      w && /* @__PURE__ */ i.jsx(
        Ap,
        {
          getHass: e,
          roomId: w,
          several: r.length > 1,
          onClose: () => $(null)
        }
      )
    ] })
  ] });
}
const Xp = (
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
.valve-more { align-self: flex-start; padding: 6px 8px; color: var(--hl-brand); font-weight: 500; --mdc-icon-size: 18px; }
.valve-list { display: flex; flex-direction: column; border: 1px solid var(--divider-color); border-radius: 14px; overflow: hidden; }
.valve-pick { display: flex; align-items: center; gap: 8px; padding-right: 10px; }
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
class Gp extends HTMLElement {
  constructor() {
    super(...arguments);
    pr(this, "_hass");
    pr(this, "_narrow", !1);
    pr(this, "_root");
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
      r.textContent = Xp;
      const l = document.createElement("div");
      n.append(r, l), this._root = wc(l);
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
        Yp,
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
customElements.get("hive-local-panel") || customElements.define("hive-local-panel", Gp);
