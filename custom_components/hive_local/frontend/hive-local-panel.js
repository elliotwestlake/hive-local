var Uc = Object.defineProperty;
var Bc = (e, t, n) => t in e ? Uc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var gr = (e, t, n) => Bc(e, typeof t != "symbol" ? t + "" : t, n);
var ya = { exports: {} }, kl = {}, wa = { exports: {} }, I = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cr = Symbol.for("react.element"), Wc = Symbol.for("react.portal"), Hc = Symbol.for("react.fragment"), Vc = Symbol.for("react.strict_mode"), Qc = Symbol.for("react.profiler"), Kc = Symbol.for("react.provider"), Yc = Symbol.for("react.context"), Gc = Symbol.for("react.forward_ref"), Xc = Symbol.for("react.suspense"), Zc = Symbol.for("react.memo"), Jc = Symbol.for("react.lazy"), ls = Symbol.iterator;
function qc(e) {
  return e === null || typeof e != "object" ? null : (e = ls && e[ls] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ka = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ja = Object.assign, Na = {};
function wn(e, t, n) {
  this.props = e, this.context = t, this.refs = Na, this.updater = n || ka;
}
wn.prototype.isReactComponent = {};
wn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
wn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Sa() {
}
Sa.prototype = wn.prototype;
function oi(e, t, n) {
  this.props = e, this.context = t, this.refs = Na, this.updater = n || ka;
}
var ii = oi.prototype = new Sa();
ii.constructor = oi;
ja(ii, wn.prototype);
ii.isPureReactComponent = !0;
var os = Array.isArray, _a = Object.prototype.hasOwnProperty, si = { current: null }, ba = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ca(e, t, n) {
  var r, l = {}, o = null, s = null;
  if (t != null) for (r in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (o = "" + t.key), t) _a.call(t, r) && !ba.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var u = Array(a), c = 0; c < a; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: cr, type: e, key: o, ref: s, props: l, _owner: si.current };
}
function ed(e, t) {
  return { $$typeof: cr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ai(e) {
  return typeof e == "object" && e !== null && e.$$typeof === cr;
}
function td(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var is = /\/+/g;
function Ol(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? td("" + e.key) : t.toString(36);
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
        case Wc:
          s = !0;
      }
  }
  if (s) return s = e, l = l(s), e = r === "" ? "." + Ol(s, 0) : r, os(l) ? (n = "", e != null && (n = e.replace(is, "$&/") + "/"), Fr(l, t, n, "", function(c) {
    return c;
  })) : l != null && (ai(l) && (l = ed(l, n + (!l.key || s && s.key === l.key ? "" : ("" + l.key).replace(is, "$&/") + "/") + e)), t.push(l)), 1;
  if (s = 0, r = r === "" ? "." : r + ":", os(e)) for (var a = 0; a < e.length; a++) {
    o = e[a];
    var u = r + Ol(o, a);
    s += Fr(o, t, n, u, l);
  }
  else if (u = qc(e), typeof u == "function") for (e = u.call(e), a = 0; !(o = e.next()).done; ) o = o.value, u = r + Ol(o, a++), s += Fr(o, t, n, u, l);
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
function nd(e) {
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
var ge = { current: null }, Dr = { transition: null }, rd = { ReactCurrentDispatcher: ge, ReactCurrentBatchConfig: Dr, ReactCurrentOwner: si };
function Ea() {
  throw Error("act(...) is not supported in production builds of React.");
}
I.Children = { map: vr, forEach: function(e, t, n) {
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
I.Component = wn;
I.Fragment = Hc;
I.Profiler = Qc;
I.PureComponent = oi;
I.StrictMode = Vc;
I.Suspense = Xc;
I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rd;
I.act = Ea;
I.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = ja({}, e.props), l = e.key, o = e.ref, s = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, s = si.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (u in t) _a.call(t, u) && !ba.hasOwnProperty(u) && (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
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
I.createContext = function(e) {
  return e = { $$typeof: Yc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Kc, _context: e }, e.Consumer = e;
};
I.createElement = Ca;
I.createFactory = function(e) {
  var t = Ca.bind(null, e);
  return t.type = e, t;
};
I.createRef = function() {
  return { current: null };
};
I.forwardRef = function(e) {
  return { $$typeof: Gc, render: e };
};
I.isValidElement = ai;
I.lazy = function(e) {
  return { $$typeof: Jc, _payload: { _status: -1, _result: e }, _init: nd };
};
I.memo = function(e, t) {
  return { $$typeof: Zc, type: e, compare: t === void 0 ? null : t };
};
I.startTransition = function(e) {
  var t = Dr.transition;
  Dr.transition = {};
  try {
    e();
  } finally {
    Dr.transition = t;
  }
};
I.unstable_act = Ea;
I.useCallback = function(e, t) {
  return ge.current.useCallback(e, t);
};
I.useContext = function(e) {
  return ge.current.useContext(e);
};
I.useDebugValue = function() {
};
I.useDeferredValue = function(e) {
  return ge.current.useDeferredValue(e);
};
I.useEffect = function(e, t) {
  return ge.current.useEffect(e, t);
};
I.useId = function() {
  return ge.current.useId();
};
I.useImperativeHandle = function(e, t, n) {
  return ge.current.useImperativeHandle(e, t, n);
};
I.useInsertionEffect = function(e, t) {
  return ge.current.useInsertionEffect(e, t);
};
I.useLayoutEffect = function(e, t) {
  return ge.current.useLayoutEffect(e, t);
};
I.useMemo = function(e, t) {
  return ge.current.useMemo(e, t);
};
I.useReducer = function(e, t, n) {
  return ge.current.useReducer(e, t, n);
};
I.useRef = function(e) {
  return ge.current.useRef(e);
};
I.useState = function(e) {
  return ge.current.useState(e);
};
I.useSyncExternalStore = function(e, t, n) {
  return ge.current.useSyncExternalStore(e, t, n);
};
I.useTransition = function() {
  return ge.current.useTransition();
};
I.version = "18.3.1";
wa.exports = I;
var _ = wa.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ld = _, od = Symbol.for("react.element"), id = Symbol.for("react.fragment"), sd = Object.prototype.hasOwnProperty, ad = ld.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ud = { key: !0, ref: !0, __self: !0, __source: !0 };
function za(e, t, n) {
  var r, l = {}, o = null, s = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (r in t) sd.call(t, r) && !ud.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: od, type: e, key: o, ref: s, props: l, _owner: ad.current };
}
kl.Fragment = id;
kl.jsx = za;
kl.jsxs = za;
ya.exports = kl;
var i = ya.exports, Ta = { exports: {} }, Ee = {}, $a = { exports: {} }, Pa = {};
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
  function t(P, F) {
    var z = P.length;
    P.push(F);
    e: for (; 0 < z; ) {
      var M = z - 1 >>> 1, D = P[M];
      if (0 < l(D, F)) P[M] = F, P[z] = D, z = M;
      else break e;
    }
  }
  function n(P) {
    return P.length === 0 ? null : P[0];
  }
  function r(P) {
    if (P.length === 0) return null;
    var F = P[0], z = P.pop();
    if (z !== F) {
      P[0] = z;
      e: for (var M = 0, D = P.length, K = D >>> 1; M < K; ) {
        var te = 2 * (M + 1) - 1, Vt = P[te], Ge = te + 1, Et = P[Ge];
        if (0 > l(Vt, z)) Ge < D && 0 > l(Et, Vt) ? (P[M] = Et, P[Ge] = z, M = Ge) : (P[M] = Vt, P[te] = z, M = te);
        else if (Ge < D && 0 > l(Et, z)) P[M] = Et, P[Ge] = z, M = Ge;
        else break e;
      }
    }
    return F;
  }
  function l(P, F) {
    var z = P.sortIndex - F.sortIndex;
    return z !== 0 ? z : P.id - F.id;
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
  var u = [], c = [], g = 1, m = null, h = 3, v = !1, w = !1, k = !1, C = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(P) {
    for (var F = n(c); F !== null; ) {
      if (F.callback === null) r(c);
      else if (F.startTime <= P) r(c), F.sortIndex = F.expirationTime, t(u, F);
      else break;
      F = n(c);
    }
  }
  function y(P) {
    if (k = !1, p(P), !w) if (n(u) !== null) w = !0, it(x);
    else {
      var F = n(c);
      F !== null && Ye(y, F.startTime - P);
    }
  }
  function x(P, F) {
    w = !1, k && (k = !1, f(j), j = -1), v = !0;
    var z = h;
    try {
      for (p(F), m = n(u); m !== null && (!(m.expirationTime > F) || P && !O()); ) {
        var M = m.callback;
        if (typeof M == "function") {
          m.callback = null, h = m.priorityLevel;
          var D = M(m.expirationTime <= F);
          F = e.unstable_now(), typeof D == "function" ? m.callback = D : m === n(u) && r(u), p(F);
        } else r(u);
        m = n(u);
      }
      if (m !== null) var K = !0;
      else {
        var te = n(c);
        te !== null && Ye(y, te.startTime - F), K = !1;
      }
      return K;
    } finally {
      m = null, h = z, v = !1;
    }
  }
  var S = !1, b = null, j = -1, N = 5, $ = -1;
  function O() {
    return !(e.unstable_now() - $ < N);
  }
  function R() {
    if (b !== null) {
      var P = e.unstable_now();
      $ = P;
      var F = !0;
      try {
        F = b(!0, P);
      } finally {
        F ? q() : (S = !1, b = null);
      }
    } else S = !1;
  }
  var q;
  if (typeof d == "function") q = function() {
    d(R);
  };
  else if (typeof MessageChannel < "u") {
    var xe = new MessageChannel(), Ct = xe.port2;
    xe.port1.onmessage = R, q = function() {
      Ct.postMessage(null);
    };
  } else q = function() {
    C(R, 0);
  };
  function it(P) {
    b = P, S || (S = !0, q());
  }
  function Ye(P, F) {
    j = C(function() {
      P(e.unstable_now());
    }, F);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(P) {
    P.callback = null;
  }, e.unstable_continueExecution = function() {
    w || v || (w = !0, it(x));
  }, e.unstable_forceFrameRate = function(P) {
    0 > P || 125 < P ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : N = 0 < P ? Math.floor(1e3 / P) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(P) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var F = 3;
        break;
      default:
        F = h;
    }
    var z = h;
    h = F;
    try {
      return P();
    } finally {
      h = z;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(P, F) {
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
    var z = h;
    h = P;
    try {
      return F();
    } finally {
      h = z;
    }
  }, e.unstable_scheduleCallback = function(P, F, z) {
    var M = e.unstable_now();
    switch (typeof z == "object" && z !== null ? (z = z.delay, z = typeof z == "number" && 0 < z ? M + z : M) : z = M, P) {
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
    return D = z + D, P = { id: g++, callback: F, priorityLevel: P, startTime: z, expirationTime: D, sortIndex: -1 }, z > M ? (P.sortIndex = z, t(c, P), n(u) === null && P === n(c) && (k ? (f(j), j = -1) : k = !0, Ye(y, z - M))) : (P.sortIndex = D, t(u, P), w || v || (w = !0, it(x))), P;
  }, e.unstable_shouldYield = O, e.unstable_wrapCallback = function(P) {
    var F = h;
    return function() {
      var z = h;
      h = F;
      try {
        return P.apply(this, arguments);
      } finally {
        h = z;
      }
    };
  };
})(Pa);
$a.exports = Pa;
var cd = $a.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dd = _, Ce = cd;
function E(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var La = /* @__PURE__ */ new Set(), Kn = {};
function Wt(e, t) {
  pn(e, t), pn(e + "Capture", t);
}
function pn(e, t) {
  for (Kn[e] = t, e = 0; e < t.length; e++) La.add(t[e]);
}
var tt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), co = Object.prototype.hasOwnProperty, pd = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ss = {}, as = {};
function fd(e) {
  return co.call(as, e) ? !0 : co.call(ss, e) ? !1 : pd.test(e) ? as[e] = !0 : (ss[e] = !0, !1);
}
function hd(e, t, n, r) {
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
function md(e, t, n, r) {
  if (t === null || typeof t > "u" || hd(e, t, n, r)) return !0;
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
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (md(t, n, l, r) && (n = null), r || l === null ? fd(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var ot = dd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, xr = Symbol.for("react.element"), Kt = Symbol.for("react.portal"), Yt = Symbol.for("react.fragment"), pi = Symbol.for("react.strict_mode"), po = Symbol.for("react.profiler"), Ma = Symbol.for("react.provider"), Ra = Symbol.for("react.context"), fi = Symbol.for("react.forward_ref"), fo = Symbol.for("react.suspense"), ho = Symbol.for("react.suspense_list"), hi = Symbol.for("react.memo"), at = Symbol.for("react.lazy"), Fa = Symbol.for("react.offscreen"), us = Symbol.iterator;
function Nn(e) {
  return e === null || typeof e != "object" ? null : (e = us && e[us] || e["@@iterator"], typeof e == "function" ? e : null);
}
var X = Object.assign, Il;
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
function gd(e) {
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
    case Yt:
      return "Fragment";
    case Kt:
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
    case Ra:
      return (e.displayName || "Context") + ".Consumer";
    case Ma:
      return (e._context.displayName || "Context") + ".Provider";
    case fi:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case hi:
      return t = e.displayName || null, t !== null ? t : mo(e.type) || "Memo";
    case at:
      t = e._payload, e = e._init;
      try {
        return mo(e(t));
      } catch {
      }
  }
  return null;
}
function vd(e) {
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
function jt(e) {
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
function Da(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function xd(e) {
  var t = Da(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
  e._valueTracker || (e._valueTracker = xd(e));
}
function Oa(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Da(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
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
  return X({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function cs(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = jt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Ia(e, t) {
  t = t.checked, t != null && di(e, "checked", t, !1);
}
function vo(e, t) {
  Ia(e, t);
  var n = jt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? xo(e, t.type, n) : t.hasOwnProperty("defaultValue") && xo(e, t.type, jt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function ds(e, t, n) {
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
function on(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + jt(n), t = null, l = 0; l < e.length; l++) {
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
  if (t.dangerouslySetInnerHTML != null) throw Error(E(91));
  return X({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function ps(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(E(92));
      if (Ln(n)) {
        if (1 < n.length) throw Error(E(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: jt(n) };
}
function Aa(e, t) {
  var n = jt(t.value), r = jt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function fs(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ua(e) {
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
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ua(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var wr, Ba = function(e) {
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
}, yd = ["Webkit", "ms", "Moz", "O"];
Object.keys(Fn).forEach(function(e) {
  yd.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Fn[t] = Fn[e];
  });
});
function Wa(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Fn.hasOwnProperty(e) && Fn[e] ? ("" + t).trim() : t + "px";
}
function Ha(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Wa(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var wd = X({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function ko(e, t) {
  if (t) {
    if (wd[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(E(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(E(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(E(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(E(62));
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
var So = null, sn = null, an = null;
function hs(e) {
  if (e = fr(e)) {
    if (typeof So != "function") throw Error(E(280));
    var t = e.stateNode;
    t && (t = bl(t), So(e.stateNode, e.type, t));
  }
}
function Va(e) {
  sn ? an ? an.push(e) : an = [e] : sn = e;
}
function Qa() {
  if (sn) {
    var e = sn, t = an;
    if (an = sn = null, hs(e), t) for (e = 0; e < t.length; e++) hs(t[e]);
  }
}
function Ka(e, t) {
  return e(t);
}
function Ya() {
}
var Bl = !1;
function Ga(e, t, n) {
  if (Bl) return e(t, n);
  Bl = !0;
  try {
    return Ka(e, t, n);
  } finally {
    Bl = !1, (sn !== null || an !== null) && (Ya(), Qa());
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
  if (n && typeof n != "function") throw Error(E(231, t, typeof n));
  return n;
}
var _o = !1;
if (tt) try {
  var Sn = {};
  Object.defineProperty(Sn, "passive", { get: function() {
    _o = !0;
  } }), window.addEventListener("test", Sn, Sn), window.removeEventListener("test", Sn, Sn);
} catch {
  _o = !1;
}
function kd(e, t, n, r, l, o, s, a, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (g) {
    this.onError(g);
  }
}
var Dn = !1, Zr = null, Jr = !1, bo = null, jd = { onError: function(e) {
  Dn = !0, Zr = e;
} };
function Nd(e, t, n, r, l, o, s, a, u) {
  Dn = !1, Zr = null, kd.apply(jd, arguments);
}
function Sd(e, t, n, r, l, o, s, a, u) {
  if (Nd.apply(this, arguments), Dn) {
    if (Dn) {
      var c = Zr;
      Dn = !1, Zr = null;
    } else throw Error(E(198));
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
function Xa(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function ms(e) {
  if (Ht(e) !== e) throw Error(E(188));
}
function _d(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Ht(e), t === null) throw Error(E(188));
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
        if (o === n) return ms(l), e;
        if (o === r) return ms(l), t;
        o = o.sibling;
      }
      throw Error(E(188));
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
        if (!s) throw Error(E(189));
      }
    }
    if (n.alternate !== r) throw Error(E(190));
  }
  if (n.tag !== 3) throw Error(E(188));
  return n.stateNode.current === n ? e : t;
}
function Za(e) {
  return e = _d(e), e !== null ? Ja(e) : null;
}
function Ja(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ja(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var qa = Ce.unstable_scheduleCallback, gs = Ce.unstable_cancelCallback, bd = Ce.unstable_shouldYield, Cd = Ce.unstable_requestPaint, J = Ce.unstable_now, Ed = Ce.unstable_getCurrentPriorityLevel, gi = Ce.unstable_ImmediatePriority, eu = Ce.unstable_UserBlockingPriority, qr = Ce.unstable_NormalPriority, zd = Ce.unstable_LowPriority, tu = Ce.unstable_IdlePriority, jl = null, Qe = null;
function Td(e) {
  if (Qe && typeof Qe.onCommitFiberRoot == "function") try {
    Qe.onCommitFiberRoot(jl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ae = Math.clz32 ? Math.clz32 : Ld, $d = Math.log, Pd = Math.LN2;
function Ld(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - ($d(e) / Pd | 0) | 0;
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
function Md(e, t) {
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
function Rd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var s = 31 - Ae(o), a = 1 << s, u = l[s];
    u === -1 ? (!(a & n) || a & r) && (l[s] = Md(a, t)) : u <= t && (e.expiredLanes |= a), o &= ~a;
  }
}
function Co(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function nu() {
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
function Fd(e, t) {
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
function ru(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var lu, xi, ou, iu, su, Eo = !1, Nr = [], ht = null, mt = null, gt = null, Xn = /* @__PURE__ */ new Map(), Zn = /* @__PURE__ */ new Map(), ct = [], Dd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function vs(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ht = null;
      break;
    case "dragenter":
    case "dragleave":
      mt = null;
      break;
    case "mouseover":
    case "mouseout":
      gt = null;
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
function Od(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ht = _n(ht, e, t, n, r, l), !0;
    case "dragenter":
      return mt = _n(mt, e, t, n, r, l), !0;
    case "mouseover":
      return gt = _n(gt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Xn.set(o, _n(Xn.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Zn.set(o, _n(Zn.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function au(e) {
  var t = Pt(e.target);
  if (t !== null) {
    var n = Ht(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Xa(n), t !== null) {
          e.blockedOn = t, su(e.priority, function() {
            ou(n);
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
function xs(e, t, n) {
  Or(e) && n.delete(t);
}
function Id() {
  Eo = !1, ht !== null && Or(ht) && (ht = null), mt !== null && Or(mt) && (mt = null), gt !== null && Or(gt) && (gt = null), Xn.forEach(xs), Zn.forEach(xs);
}
function bn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Eo || (Eo = !0, Ce.unstable_scheduleCallback(Ce.unstable_NormalPriority, Id)));
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
  for (ht !== null && bn(ht, e), mt !== null && bn(mt, e), gt !== null && bn(gt, e), Xn.forEach(t), Zn.forEach(t), n = 0; n < ct.length; n++) r = ct[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ct.length && (n = ct[0], n.blockedOn === null); ) au(n), n.blockedOn === null && ct.shift();
}
var un = ot.ReactCurrentBatchConfig, tl = !0;
function Ad(e, t, n, r) {
  var l = U, o = un.transition;
  un.transition = null;
  try {
    U = 1, yi(e, t, n, r);
  } finally {
    U = l, un.transition = o;
  }
}
function Ud(e, t, n, r) {
  var l = U, o = un.transition;
  un.transition = null;
  try {
    U = 4, yi(e, t, n, r);
  } finally {
    U = l, un.transition = o;
  }
}
function yi(e, t, n, r) {
  if (tl) {
    var l = zo(e, t, n, r);
    if (l === null) ql(e, t, r, nl, n), vs(e, r);
    else if (Od(l, e, t, n, r)) r.stopPropagation();
    else if (vs(e, r), t & 4 && -1 < Dd.indexOf(e)) {
      for (; l !== null; ) {
        var o = fr(l);
        if (o !== null && lu(o), o = zo(e, t, n, r), o === null && ql(e, t, r, nl, n), o === l) break;
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
    if (e = Xa(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return nl = e, null;
}
function uu(e) {
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
      switch (Ed()) {
        case gi:
          return 1;
        case eu:
          return 4;
        case qr:
        case zd:
          return 16;
        case tu:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var pt = null, wi = null, Ir = null;
function cu() {
  if (Ir) return Ir;
  var e, t = wi, n = t.length, r, l = "value" in pt ? pt.value : pt.textContent, o = l.length;
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
function ys() {
  return !1;
}
function ze(e) {
  function t(n, r, l, o, s) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = s, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(o) : o[a]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Sr : ys, this.isPropagationStopped = ys, this;
  }
  return X(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Sr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Sr);
  }, persist: function() {
  }, isPersistent: Sr }), t;
}
var kn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, ki = ze(kn), pr = X({}, kn, { view: 0, detail: 0 }), Bd = ze(pr), Hl, Vl, Cn, Nl = X({}, pr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ji, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Cn && (Cn && e.type === "mousemove" ? (Hl = e.screenX - Cn.screenX, Vl = e.screenY - Cn.screenY) : Vl = Hl = 0, Cn = e), Hl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Vl;
} }), ws = ze(Nl), Wd = X({}, Nl, { dataTransfer: 0 }), Hd = ze(Wd), Vd = X({}, pr, { relatedTarget: 0 }), Ql = ze(Vd), Qd = X({}, kn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Kd = ze(Qd), Yd = X({}, kn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Gd = ze(Yd), Xd = X({}, kn, { data: 0 }), ks = ze(Xd), Zd = {
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
}, Jd = {
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
}, qd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function ep(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = qd[e]) ? !!t[e] : !1;
}
function ji() {
  return ep;
}
var tp = X({}, pr, { key: function(e) {
  if (e.key) {
    var t = Zd[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Ar(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Jd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ji, charCode: function(e) {
  return e.type === "keypress" ? Ar(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Ar(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), np = ze(tp), rp = X({}, Nl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), js = ze(rp), lp = X({}, pr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ji }), op = ze(lp), ip = X({}, kn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), sp = ze(ip), ap = X({}, Nl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), up = ze(ap), cp = [9, 13, 27, 32], Ni = tt && "CompositionEvent" in window, On = null;
tt && "documentMode" in document && (On = document.documentMode);
var dp = tt && "TextEvent" in window && !On, du = tt && (!Ni || On && 8 < On && 11 >= On), Ns = " ", Ss = !1;
function pu(e, t) {
  switch (e) {
    case "keyup":
      return cp.indexOf(t.keyCode) !== -1;
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
function fu(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Gt = !1;
function pp(e, t) {
  switch (e) {
    case "compositionend":
      return fu(t);
    case "keypress":
      return t.which !== 32 ? null : (Ss = !0, Ns);
    case "textInput":
      return e = t.data, e === Ns && Ss ? null : e;
    default:
      return null;
  }
}
function fp(e, t) {
  if (Gt) return e === "compositionend" || !Ni && pu(e, t) ? (e = cu(), Ir = wi = pt = null, Gt = !1, e) : null;
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
      return du && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var hp = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function _s(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!hp[e.type] : t === "textarea";
}
function hu(e, t, n, r) {
  Va(r), t = rl(t, "onChange"), 0 < t.length && (n = new ki("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var In = null, qn = null;
function mp(e) {
  _u(e, 0);
}
function Sl(e) {
  var t = Jt(e);
  if (Oa(t)) return e;
}
function gp(e, t) {
  if (e === "change") return t;
}
var mu = !1;
if (tt) {
  var Kl;
  if (tt) {
    var Yl = "oninput" in document;
    if (!Yl) {
      var bs = document.createElement("div");
      bs.setAttribute("oninput", "return;"), Yl = typeof bs.oninput == "function";
    }
    Kl = Yl;
  } else Kl = !1;
  mu = Kl && (!document.documentMode || 9 < document.documentMode);
}
function Cs() {
  In && (In.detachEvent("onpropertychange", gu), qn = In = null);
}
function gu(e) {
  if (e.propertyName === "value" && Sl(qn)) {
    var t = [];
    hu(t, qn, e, mi(e)), Ga(mp, t);
  }
}
function vp(e, t, n) {
  e === "focusin" ? (Cs(), In = t, qn = n, In.attachEvent("onpropertychange", gu)) : e === "focusout" && Cs();
}
function xp(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Sl(qn);
}
function yp(e, t) {
  if (e === "click") return Sl(t);
}
function wp(e, t) {
  if (e === "input" || e === "change") return Sl(t);
}
function kp(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Be = typeof Object.is == "function" ? Object.is : kp;
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
function Es(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function zs(e, t) {
  var n = Es(e);
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
    n = Es(n);
  }
}
function vu(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? vu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function xu() {
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
function jp(e) {
  var t = xu(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && vu(n.ownerDocument.documentElement, n)) {
    if (r !== null && Si(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = zs(n, o);
        var s = zs(
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
var Np = tt && "documentMode" in document && 11 >= document.documentMode, Xt = null, To = null, An = null, $o = !1;
function Ts(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  $o || Xt == null || Xt !== Xr(r) || (r = Xt, "selectionStart" in r && Si(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), An && er(An, r) || (An = r, r = rl(To, "onSelect"), 0 < r.length && (t = new ki("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Xt)));
}
function _r(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Zt = { animationend: _r("Animation", "AnimationEnd"), animationiteration: _r("Animation", "AnimationIteration"), animationstart: _r("Animation", "AnimationStart"), transitionend: _r("Transition", "TransitionEnd") }, Gl = {}, yu = {};
tt && (yu = document.createElement("div").style, "AnimationEvent" in window || (delete Zt.animationend.animation, delete Zt.animationiteration.animation, delete Zt.animationstart.animation), "TransitionEvent" in window || delete Zt.transitionend.transition);
function _l(e) {
  if (Gl[e]) return Gl[e];
  if (!Zt[e]) return e;
  var t = Zt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in yu) return Gl[e] = t[n];
  return e;
}
var wu = _l("animationend"), ku = _l("animationiteration"), ju = _l("animationstart"), Nu = _l("transitionend"), Su = /* @__PURE__ */ new Map(), $s = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function St(e, t) {
  Su.set(e, t), Wt(t, [e]);
}
for (var Xl = 0; Xl < $s.length; Xl++) {
  var Zl = $s[Xl], Sp = Zl.toLowerCase(), _p = Zl[0].toUpperCase() + Zl.slice(1);
  St(Sp, "on" + _p);
}
St(wu, "onAnimationEnd");
St(ku, "onAnimationIteration");
St(ju, "onAnimationStart");
St("dblclick", "onDoubleClick");
St("focusin", "onFocus");
St("focusout", "onBlur");
St(Nu, "onTransitionEnd");
pn("onMouseEnter", ["mouseout", "mouseover"]);
pn("onMouseLeave", ["mouseout", "mouseover"]);
pn("onPointerEnter", ["pointerout", "pointerover"]);
pn("onPointerLeave", ["pointerout", "pointerover"]);
Wt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Wt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Wt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Wt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Wt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Wt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Rn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), bp = new Set("cancel close invalid load scroll toggle".split(" ").concat(Rn));
function Ps(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Sd(r, t, void 0, e), e.currentTarget = null;
}
function _u(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var s = r.length - 1; 0 <= s; s--) {
        var a = r[s], u = a.instance, c = a.currentTarget;
        if (a = a.listener, u !== o && l.isPropagationStopped()) break e;
        Ps(l, a, c), o = u;
      }
      else for (s = 0; s < r.length; s++) {
        if (a = r[s], u = a.instance, c = a.currentTarget, a = a.listener, u !== o && l.isPropagationStopped()) break e;
        Ps(l, a, c), o = u;
      }
    }
  }
  if (Jr) throw e = bo, Jr = !1, bo = null, e;
}
function H(e, t) {
  var n = t[Fo];
  n === void 0 && (n = t[Fo] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (bu(t, e, 2, !1), n.add(r));
}
function Jl(e, t, n) {
  var r = 0;
  t && (r |= 4), bu(n, e, r, t);
}
var br = "_reactListening" + Math.random().toString(36).slice(2);
function tr(e) {
  if (!e[br]) {
    e[br] = !0, La.forEach(function(n) {
      n !== "selectionchange" && (bp.has(n) || Jl(n, !1, e), Jl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[br] || (t[br] = !0, Jl("selectionchange", !1, t));
  }
}
function bu(e, t, n, r) {
  switch (uu(t)) {
    case 1:
      var l = Ad;
      break;
    case 4:
      l = Ud;
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
  Ga(function() {
    var c = o, g = mi(n), m = [];
    e: {
      var h = Su.get(e);
      if (h !== void 0) {
        var v = ki, w = e;
        switch (e) {
          case "keypress":
            if (Ar(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = np;
            break;
          case "focusin":
            w = "focus", v = Ql;
            break;
          case "focusout":
            w = "blur", v = Ql;
            break;
          case "beforeblur":
          case "afterblur":
            v = Ql;
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
            v = ws;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Hd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = op;
            break;
          case wu:
          case ku:
          case ju:
            v = Kd;
            break;
          case Nu:
            v = sp;
            break;
          case "scroll":
            v = Bd;
            break;
          case "wheel":
            v = up;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Gd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = js;
        }
        var k = (t & 4) !== 0, C = !k && e === "scroll", f = k ? h !== null ? h + "Capture" : null : h;
        k = [];
        for (var d = c, p; d !== null; ) {
          p = d;
          var y = p.stateNode;
          if (p.tag === 5 && y !== null && (p = y, f !== null && (y = Gn(d, f), y != null && k.push(nr(d, y, p)))), C) break;
          d = d.return;
        }
        0 < k.length && (h = new v(h, w, null, n, g), m.push({ event: h, listeners: k }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", h && n !== No && (w = n.relatedTarget || n.fromElement) && (Pt(w) || w[nt])) break e;
        if ((v || h) && (h = g.window === g ? g : (h = g.ownerDocument) ? h.defaultView || h.parentWindow : window, v ? (w = n.relatedTarget || n.toElement, v = c, w = w ? Pt(w) : null, w !== null && (C = Ht(w), w !== C || w.tag !== 5 && w.tag !== 6) && (w = null)) : (v = null, w = c), v !== w)) {
          if (k = ws, y = "onMouseLeave", f = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (k = js, y = "onPointerLeave", f = "onPointerEnter", d = "pointer"), C = v == null ? h : Jt(v), p = w == null ? h : Jt(w), h = new k(y, d + "leave", v, n, g), h.target = C, h.relatedTarget = p, y = null, Pt(g) === c && (k = new k(f, d + "enter", w, n, g), k.target = p, k.relatedTarget = C, y = k), C = y, v && w) t: {
            for (k = v, f = w, d = 0, p = k; p; p = Qt(p)) d++;
            for (p = 0, y = f; y; y = Qt(y)) p++;
            for (; 0 < d - p; ) k = Qt(k), d--;
            for (; 0 < p - d; ) f = Qt(f), p--;
            for (; d--; ) {
              if (k === f || f !== null && k === f.alternate) break t;
              k = Qt(k), f = Qt(f);
            }
            k = null;
          }
          else k = null;
          v !== null && Ls(m, h, v, k, !1), w !== null && C !== null && Ls(m, C, w, k, !0);
        }
      }
      e: {
        if (h = c ? Jt(c) : window, v = h.nodeName && h.nodeName.toLowerCase(), v === "select" || v === "input" && h.type === "file") var x = gp;
        else if (_s(h)) if (mu) x = wp;
        else {
          x = xp;
          var S = vp;
        }
        else (v = h.nodeName) && v.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (x = yp);
        if (x && (x = x(e, c))) {
          hu(m, x, n, g);
          break e;
        }
        S && S(e, h, c), e === "focusout" && (S = h._wrapperState) && S.controlled && h.type === "number" && xo(h, "number", h.value);
      }
      switch (S = c ? Jt(c) : window, e) {
        case "focusin":
          (_s(S) || S.contentEditable === "true") && (Xt = S, To = c, An = null);
          break;
        case "focusout":
          An = To = Xt = null;
          break;
        case "mousedown":
          $o = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          $o = !1, Ts(m, n, g);
          break;
        case "selectionchange":
          if (Np) break;
        case "keydown":
        case "keyup":
          Ts(m, n, g);
      }
      var b;
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
      else Gt ? pu(e, n) && (j = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (j = "onCompositionStart");
      j && (du && n.locale !== "ko" && (Gt || j !== "onCompositionStart" ? j === "onCompositionEnd" && Gt && (b = cu()) : (pt = g, wi = "value" in pt ? pt.value : pt.textContent, Gt = !0)), S = rl(c, j), 0 < S.length && (j = new ks(j, e, null, n, g), m.push({ event: j, listeners: S }), b ? j.data = b : (b = fu(n), b !== null && (j.data = b)))), (b = dp ? pp(e, n) : fp(e, n)) && (c = rl(c, "onBeforeInput"), 0 < c.length && (g = new ks("onBeforeInput", "beforeinput", null, n, g), m.push({ event: g, listeners: c }), g.data = b));
    }
    _u(m, t);
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
function Qt(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ls(e, t, n, r, l) {
  for (var o = t._reactName, s = []; n !== null && n !== r; ) {
    var a = n, u = a.alternate, c = a.stateNode;
    if (u !== null && u === r) break;
    a.tag === 5 && c !== null && (a = c, l ? (u = Gn(n, o), u != null && s.unshift(nr(n, u, a))) : l || (u = Gn(n, o), u != null && s.push(nr(n, u, a)))), n = n.return;
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var Cp = /\r\n?/g, Ep = /\u0000|\uFFFD/g;
function Ms(e) {
  return (typeof e == "string" ? e : "" + e).replace(Cp, `
`).replace(Ep, "");
}
function Cr(e, t, n) {
  if (t = Ms(t), Ms(e) !== t && n) throw Error(E(425));
}
function ll() {
}
var Po = null, Lo = null;
function Mo(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Ro = typeof setTimeout == "function" ? setTimeout : void 0, zp = typeof clearTimeout == "function" ? clearTimeout : void 0, Rs = typeof Promise == "function" ? Promise : void 0, Tp = typeof queueMicrotask == "function" ? queueMicrotask : typeof Rs < "u" ? function(e) {
  return Rs.resolve(null).then(e).catch($p);
} : Ro;
function $p(e) {
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
function Fs(e) {
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
var jn = Math.random().toString(36).slice(2), Ve = "__reactFiber$" + jn, rr = "__reactProps$" + jn, nt = "__reactContainer$" + jn, Fo = "__reactEvents$" + jn, Pp = "__reactListeners$" + jn, Lp = "__reactHandles$" + jn;
function Pt(e) {
  var t = e[Ve];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[nt] || n[Ve]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Fs(e); e !== null; ) {
        if (n = e[Ve]) return n;
        e = Fs(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function fr(e) {
  return e = e[Ve] || e[nt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Jt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(E(33));
}
function bl(e) {
  return e[rr] || null;
}
var Do = [], qt = -1;
function _t(e) {
  return { current: e };
}
function V(e) {
  0 > qt || (e.current = Do[qt], Do[qt] = null, qt--);
}
function W(e, t) {
  qt++, Do[qt] = e.current, e.current = t;
}
var Nt = {}, pe = _t(Nt), ke = _t(!1), Ot = Nt;
function fn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Nt;
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
function Ds(e, t, n) {
  if (pe.current !== Nt) throw Error(E(168));
  W(pe, t), W(ke, n);
}
function Cu(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(E(108, vd(e) || "Unknown", l));
  return X({}, n, r);
}
function il(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Nt, Ot = pe.current, W(pe, e), W(ke, ke.current), !0;
}
function Os(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(E(169));
  n ? (e = Cu(e, t, Ot), r.__reactInternalMemoizedMergedChildContext = e, V(ke), V(pe), W(pe, e)) : V(ke), W(ke, n);
}
var Ze = null, Cl = !1, to = !1;
function Eu(e) {
  Ze === null ? Ze = [e] : Ze.push(e);
}
function Mp(e) {
  Cl = !0, Eu(e);
}
function bt() {
  if (!to && Ze !== null) {
    to = !0;
    var e = 0, t = U;
    try {
      var n = Ze;
      for (U = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ze = null, Cl = !1;
    } catch (l) {
      throw Ze !== null && (Ze = Ze.slice(e + 1)), qa(gi, bt), l;
    } finally {
      U = t, to = !1;
    }
  }
  return null;
}
var en = [], tn = 0, sl = null, al = 0, Te = [], $e = 0, It = null, Je = 1, qe = "";
function Tt(e, t) {
  en[tn++] = al, en[tn++] = sl, sl = e, al = t;
}
function zu(e, t, n) {
  Te[$e++] = Je, Te[$e++] = qe, Te[$e++] = It, It = e;
  var r = Je;
  e = qe;
  var l = 32 - Ae(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - Ae(t) + l;
  if (30 < o) {
    var s = l - l % 5;
    o = (r & (1 << s) - 1).toString(32), r >>= s, l -= s, Je = 1 << 32 - Ae(t) + l | n << l | r, qe = o + e;
  } else Je = 1 << o | n << l | r, qe = e;
}
function _i(e) {
  e.return !== null && (Tt(e, 1), zu(e, 1, 0));
}
function bi(e) {
  for (; e === sl; ) sl = en[--tn], en[tn] = null, al = en[--tn], en[tn] = null;
  for (; e === It; ) It = Te[--$e], Te[$e] = null, qe = Te[--$e], Te[$e] = null, Je = Te[--$e], Te[$e] = null;
}
var be = null, _e = null, Q = !1, Ie = null;
function Tu(e, t) {
  var n = Pe(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Is(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, be = e, _e = vt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, be = e, _e = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = It !== null ? { id: Je, overflow: qe } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Pe(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, be = e, _e = null, !0) : !1;
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
      if (!Is(e, t)) {
        if (Oo(e)) throw Error(E(418));
        t = vt(n.nextSibling);
        var r = be;
        t && Is(e, t) ? Tu(r, n) : (e.flags = e.flags & -4097 | 2, Q = !1, be = e);
      }
    } else {
      if (Oo(e)) throw Error(E(418));
      e.flags = e.flags & -4097 | 2, Q = !1, be = e;
    }
  }
}
function As(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  be = e;
}
function Er(e) {
  if (e !== be) return !1;
  if (!Q) return As(e), Q = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Mo(e.type, e.memoizedProps)), t && (t = _e)) {
    if (Oo(e)) throw $u(), Error(E(418));
    for (; t; ) Tu(e, t), t = vt(t.nextSibling);
  }
  if (As(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(E(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              _e = vt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      _e = null;
    }
  } else _e = be ? vt(e.stateNode.nextSibling) : null;
  return !0;
}
function $u() {
  for (var e = _e; e; ) e = vt(e.nextSibling);
}
function hn() {
  _e = be = null, Q = !1;
}
function Ci(e) {
  Ie === null ? Ie = [e] : Ie.push(e);
}
var Rp = ot.ReactCurrentBatchConfig;
function En(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(E(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(E(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(s) {
        var a = l.refs;
        s === null ? delete a[o] : a[o] = s;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(E(284));
    if (!n._owner) throw Error(E(290, e));
  }
  return e;
}
function zr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(E(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Us(e) {
  var t = e._init;
  return t(e._payload);
}
function Pu(e) {
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
    return f = kt(f, d), f.index = 0, f.sibling = null, f;
  }
  function o(f, d, p) {
    return f.index = p, e ? (p = f.alternate, p !== null ? (p = p.index, p < d ? (f.flags |= 2, d) : p) : (f.flags |= 2, d)) : (f.flags |= 1048576, d);
  }
  function s(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function a(f, d, p, y) {
    return d === null || d.tag !== 6 ? (d = ao(p, f.mode, y), d.return = f, d) : (d = l(d, p), d.return = f, d);
  }
  function u(f, d, p, y) {
    var x = p.type;
    return x === Yt ? g(f, d, p.props.children, y, p.key) : d !== null && (d.elementType === x || typeof x == "object" && x !== null && x.$$typeof === at && Us(x) === d.type) ? (y = l(d, p.props), y.ref = En(f, d, p), y.return = f, y) : (y = Kr(p.type, p.key, p.props, null, f.mode, y), y.ref = En(f, d, p), y.return = f, y);
  }
  function c(f, d, p, y) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== p.containerInfo || d.stateNode.implementation !== p.implementation ? (d = uo(p, f.mode, y), d.return = f, d) : (d = l(d, p.children || []), d.return = f, d);
  }
  function g(f, d, p, y, x) {
    return d === null || d.tag !== 7 ? (d = Dt(p, f.mode, y, x), d.return = f, d) : (d = l(d, p), d.return = f, d);
  }
  function m(f, d, p) {
    if (typeof d == "string" && d !== "" || typeof d == "number") return d = ao("" + d, f.mode, p), d.return = f, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case xr:
          return p = Kr(d.type, d.key, d.props, null, f.mode, p), p.ref = En(f, null, d), p.return = f, p;
        case Kt:
          return d = uo(d, f.mode, p), d.return = f, d;
        case at:
          var y = d._init;
          return m(f, y(d._payload), p);
      }
      if (Ln(d) || Nn(d)) return d = Dt(d, f.mode, p, null), d.return = f, d;
      zr(f, d);
    }
    return null;
  }
  function h(f, d, p, y) {
    var x = d !== null ? d.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number") return x !== null ? null : a(f, d, "" + p, y);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case xr:
          return p.key === x ? u(f, d, p, y) : null;
        case Kt:
          return p.key === x ? c(f, d, p, y) : null;
        case at:
          return x = p._init, h(
            f,
            d,
            x(p._payload),
            y
          );
      }
      if (Ln(p) || Nn(p)) return x !== null ? null : g(f, d, p, y, null);
      zr(f, p);
    }
    return null;
  }
  function v(f, d, p, y, x) {
    if (typeof y == "string" && y !== "" || typeof y == "number") return f = f.get(p) || null, a(d, f, "" + y, x);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case xr:
          return f = f.get(y.key === null ? p : y.key) || null, u(d, f, y, x);
        case Kt:
          return f = f.get(y.key === null ? p : y.key) || null, c(d, f, y, x);
        case at:
          var S = y._init;
          return v(f, d, p, S(y._payload), x);
      }
      if (Ln(y) || Nn(y)) return f = f.get(p) || null, g(d, f, y, x, null);
      zr(d, y);
    }
    return null;
  }
  function w(f, d, p, y) {
    for (var x = null, S = null, b = d, j = d = 0, N = null; b !== null && j < p.length; j++) {
      b.index > j ? (N = b, b = null) : N = b.sibling;
      var $ = h(f, b, p[j], y);
      if ($ === null) {
        b === null && (b = N);
        break;
      }
      e && b && $.alternate === null && t(f, b), d = o($, d, j), S === null ? x = $ : S.sibling = $, S = $, b = N;
    }
    if (j === p.length) return n(f, b), Q && Tt(f, j), x;
    if (b === null) {
      for (; j < p.length; j++) b = m(f, p[j], y), b !== null && (d = o(b, d, j), S === null ? x = b : S.sibling = b, S = b);
      return Q && Tt(f, j), x;
    }
    for (b = r(f, b); j < p.length; j++) N = v(b, f, j, p[j], y), N !== null && (e && N.alternate !== null && b.delete(N.key === null ? j : N.key), d = o(N, d, j), S === null ? x = N : S.sibling = N, S = N);
    return e && b.forEach(function(O) {
      return t(f, O);
    }), Q && Tt(f, j), x;
  }
  function k(f, d, p, y) {
    var x = Nn(p);
    if (typeof x != "function") throw Error(E(150));
    if (p = x.call(p), p == null) throw Error(E(151));
    for (var S = x = null, b = d, j = d = 0, N = null, $ = p.next(); b !== null && !$.done; j++, $ = p.next()) {
      b.index > j ? (N = b, b = null) : N = b.sibling;
      var O = h(f, b, $.value, y);
      if (O === null) {
        b === null && (b = N);
        break;
      }
      e && b && O.alternate === null && t(f, b), d = o(O, d, j), S === null ? x = O : S.sibling = O, S = O, b = N;
    }
    if ($.done) return n(
      f,
      b
    ), Q && Tt(f, j), x;
    if (b === null) {
      for (; !$.done; j++, $ = p.next()) $ = m(f, $.value, y), $ !== null && (d = o($, d, j), S === null ? x = $ : S.sibling = $, S = $);
      return Q && Tt(f, j), x;
    }
    for (b = r(f, b); !$.done; j++, $ = p.next()) $ = v(b, f, j, $.value, y), $ !== null && (e && $.alternate !== null && b.delete($.key === null ? j : $.key), d = o($, d, j), S === null ? x = $ : S.sibling = $, S = $);
    return e && b.forEach(function(R) {
      return t(f, R);
    }), Q && Tt(f, j), x;
  }
  function C(f, d, p, y) {
    if (typeof p == "object" && p !== null && p.type === Yt && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case xr:
          e: {
            for (var x = p.key, S = d; S !== null; ) {
              if (S.key === x) {
                if (x = p.type, x === Yt) {
                  if (S.tag === 7) {
                    n(f, S.sibling), d = l(S, p.props.children), d.return = f, f = d;
                    break e;
                  }
                } else if (S.elementType === x || typeof x == "object" && x !== null && x.$$typeof === at && Us(x) === S.type) {
                  n(f, S.sibling), d = l(S, p.props), d.ref = En(f, S, p), d.return = f, f = d;
                  break e;
                }
                n(f, S);
                break;
              } else t(f, S);
              S = S.sibling;
            }
            p.type === Yt ? (d = Dt(p.props.children, f.mode, y, p.key), d.return = f, f = d) : (y = Kr(p.type, p.key, p.props, null, f.mode, y), y.ref = En(f, d, p), y.return = f, f = y);
          }
          return s(f);
        case Kt:
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
            d = uo(p, f.mode, y), d.return = f, f = d;
          }
          return s(f);
        case at:
          return S = p._init, C(f, d, S(p._payload), y);
      }
      if (Ln(p)) return w(f, d, p, y);
      if (Nn(p)) return k(f, d, p, y);
      zr(f, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, d !== null && d.tag === 6 ? (n(f, d.sibling), d = l(d, p), d.return = f, f = d) : (n(f, d), d = ao(p, f.mode, y), d.return = f, f = d), s(f)) : n(f, d);
  }
  return C;
}
var mn = Pu(!0), Lu = Pu(!1), ul = _t(null), cl = null, nn = null, Ei = null;
function zi() {
  Ei = nn = cl = null;
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
function cn(e, t) {
  cl = e, Ei = nn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (we = !0), e.firstContext = null);
}
function Me(e) {
  var t = e._currentValue;
  if (Ei !== e) if (e = { context: e, memoizedValue: t, next: null }, nn === null) {
    if (cl === null) throw Error(E(308));
    nn = e, cl.dependencies = { lanes: 0, firstContext: e };
  } else nn = nn.next = e;
  return t;
}
var Lt = null;
function $i(e) {
  Lt === null ? Lt = [e] : Lt.push(e);
}
function Mu(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, $i(t)) : (n.next = l.next, l.next = n), t.interleaved = n, rt(e, r);
}
function rt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var ut = !1;
function Pi(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Ru(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function et(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function xt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, A & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, rt(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, $i(r)) : (t.next = l.next, l.next = t), r.interleaved = t, rt(e, n);
}
function Ur(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, vi(e, n);
  }
}
function Bs(e, t) {
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
  ut = !1;
  var o = l.firstBaseUpdate, s = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var u = a, c = u.next;
    u.next = null, s === null ? o = c : s.next = c, s = u;
    var g = e.alternate;
    g !== null && (g = g.updateQueue, a = g.lastBaseUpdate, a !== s && (a === null ? g.firstBaseUpdate = c : a.next = c, g.lastBaseUpdate = u));
  }
  if (o !== null) {
    var m = l.baseState;
    s = 0, g = c = u = null, a = o;
    do {
      var h = a.lane, v = a.eventTime;
      if ((r & h) === h) {
        g !== null && (g = g.next = {
          eventTime: v,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var w = e, k = a;
          switch (h = t, v = n, k.tag) {
            case 1:
              if (w = k.payload, typeof w == "function") {
                m = w.call(v, m, h);
                break e;
              }
              m = w;
              break e;
            case 3:
              w.flags = w.flags & -65537 | 128;
            case 0:
              if (w = k.payload, h = typeof w == "function" ? w.call(v, m, h) : w, h == null) break e;
              m = X({}, m, h);
              break e;
            case 2:
              ut = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [a] : h.push(a));
      } else v = { eventTime: v, lane: h, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, g === null ? (c = g = v, u = m) : g = g.next = v, s |= h;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        h = a, a = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (g === null && (u = m), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = g, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        s |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Ut |= s, e.lanes = s, e.memoizedState = m;
  }
}
function Ws(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(E(191, l));
      l.call(r);
    }
  }
}
var hr = {}, Ke = _t(hr), lr = _t(hr), or = _t(hr);
function Mt(e) {
  if (e === hr) throw Error(E(174));
  return e;
}
function Li(e, t) {
  switch (W(or, t), W(lr, e), W(Ke, hr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : wo(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = wo(t, e);
  }
  V(Ke), W(Ke, t);
}
function gn() {
  V(Ke), V(lr), V(or);
}
function Fu(e) {
  Mt(or.current);
  var t = Mt(Ke.current), n = wo(t, e.type);
  t !== n && (W(lr, e), W(Ke, n));
}
function Mi(e) {
  lr.current === e && (V(Ke), V(lr));
}
var Y = _t(0);
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
var Br = ot.ReactCurrentDispatcher, ro = ot.ReactCurrentBatchConfig, At = 0, G = null, ne = null, le = null, fl = !1, Un = !1, ir = 0, Fp = 0;
function ue() {
  throw Error(E(321));
}
function Fi(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Be(e[n], t[n])) return !1;
  return !0;
}
function Di(e, t, n, r, l, o) {
  if (At = o, G = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Br.current = e === null || e.memoizedState === null ? Ap : Up, e = n(r, l), Un) {
    o = 0;
    do {
      if (Un = !1, ir = 0, 25 <= o) throw Error(E(301));
      o += 1, le = ne = null, t.updateQueue = null, Br.current = Bp, e = n(r, l);
    } while (Un);
  }
  if (Br.current = hl, t = ne !== null && ne.next !== null, At = 0, le = ne = G = null, fl = !1, t) throw Error(E(300));
  return e;
}
function Oi() {
  var e = ir !== 0;
  return ir = 0, e;
}
function He() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return le === null ? G.memoizedState = le = e : le = le.next = e, le;
}
function Re() {
  if (ne === null) {
    var e = G.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ne.next;
  var t = le === null ? G.memoizedState : le.next;
  if (t !== null) le = t, ne = e;
  else {
    if (e === null) throw Error(E(310));
    ne = e, e = { memoizedState: ne.memoizedState, baseState: ne.baseState, baseQueue: ne.baseQueue, queue: ne.queue, next: null }, le === null ? G.memoizedState = le = e : le = le.next = e;
  }
  return le;
}
function sr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function lo(e) {
  var t = Re(), n = t.queue;
  if (n === null) throw Error(E(311));
  n.lastRenderedReducer = e;
  var r = ne, l = r.baseQueue, o = n.pending;
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
      var g = c.lane;
      if ((At & g) === g) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var m = {
          lane: g,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (a = u = m, s = r) : u = u.next = m, G.lanes |= g, Ut |= g;
      }
      c = c.next;
    } while (c !== null && c !== o);
    u === null ? s = r : u.next = a, Be(r, t.memoizedState) || (we = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, G.lanes |= o, Ut |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function oo(e) {
  var t = Re(), n = t.queue;
  if (n === null) throw Error(E(311));
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
function Du() {
}
function Ou(e, t) {
  var n = G, r = Re(), l = t(), o = !Be(r.memoizedState, l);
  if (o && (r.memoizedState = l, we = !0), r = r.queue, Ii(Uu.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || le !== null && le.memoizedState.tag & 1) {
    if (n.flags |= 2048, ar(9, Au.bind(null, n, r, l, t), void 0, null), oe === null) throw Error(E(349));
    At & 30 || Iu(n, t, l);
  }
  return l;
}
function Iu(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = G.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, G.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Au(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Bu(t) && Wu(e);
}
function Uu(e, t, n) {
  return n(function() {
    Bu(t) && Wu(e);
  });
}
function Bu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Be(e, n);
  } catch {
    return !0;
  }
}
function Wu(e) {
  var t = rt(e, 1);
  t !== null && Ue(t, e, 1, -1);
}
function Hs(e) {
  var t = He();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: sr, lastRenderedState: e }, t.queue = e, e = e.dispatch = Ip.bind(null, G, e), [t.memoizedState, e];
}
function ar(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = G.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, G.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Hu() {
  return Re().memoizedState;
}
function Wr(e, t, n, r) {
  var l = He();
  G.flags |= e, l.memoizedState = ar(1 | t, n, void 0, r === void 0 ? null : r);
}
function El(e, t, n, r) {
  var l = Re();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ne !== null) {
    var s = ne.memoizedState;
    if (o = s.destroy, r !== null && Fi(r, s.deps)) {
      l.memoizedState = ar(t, n, o, r);
      return;
    }
  }
  G.flags |= e, l.memoizedState = ar(1 | t, n, o, r);
}
function Vs(e, t) {
  return Wr(8390656, 8, e, t);
}
function Ii(e, t) {
  return El(2048, 8, e, t);
}
function Vu(e, t) {
  return El(4, 2, e, t);
}
function Qu(e, t) {
  return El(4, 4, e, t);
}
function Ku(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Yu(e, t, n) {
  return n = n != null ? n.concat([e]) : null, El(4, 4, Ku.bind(null, t, e), n);
}
function Ai() {
}
function Gu(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Fi(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Xu(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Fi(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Zu(e, t, n) {
  return At & 21 ? (Be(n, t) || (n = nu(), G.lanes |= n, Ut |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, we = !0), e.memoizedState = n);
}
function Dp(e, t) {
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
function Ju() {
  return Re().memoizedState;
}
function Op(e, t, n) {
  var r = wt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, qu(e)) ec(t, n);
  else if (n = Mu(e, t, n, r), n !== null) {
    var l = he();
    Ue(n, e, r, l), tc(n, t, r);
  }
}
function Ip(e, t, n) {
  var r = wt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (qu(e)) ec(t, l);
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
    n = Mu(e, t, l, r), n !== null && (l = he(), Ue(n, e, r, l), tc(n, t, r));
  }
}
function qu(e) {
  var t = e.alternate;
  return e === G || t !== null && t === G;
}
function ec(e, t) {
  Un = fl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function tc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, vi(e, n);
  }
}
var hl = { readContext: Me, useCallback: ue, useContext: ue, useEffect: ue, useImperativeHandle: ue, useInsertionEffect: ue, useLayoutEffect: ue, useMemo: ue, useReducer: ue, useRef: ue, useState: ue, useDebugValue: ue, useDeferredValue: ue, useTransition: ue, useMutableSource: ue, useSyncExternalStore: ue, useId: ue, unstable_isNewReconciler: !1 }, Ap = { readContext: Me, useCallback: function(e, t) {
  return He().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Me, useEffect: Vs, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Wr(
    4194308,
    4,
    Ku.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Wr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Wr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = He();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = He();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Op.bind(null, G, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = He();
  return e = { current: e }, t.memoizedState = e;
}, useState: Hs, useDebugValue: Ai, useDeferredValue: function(e) {
  return He().memoizedState = e;
}, useTransition: function() {
  var e = Hs(!1), t = e[0];
  return e = Dp.bind(null, e[1]), He().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = G, l = He();
  if (Q) {
    if (n === void 0) throw Error(E(407));
    n = n();
  } else {
    if (n = t(), oe === null) throw Error(E(349));
    At & 30 || Iu(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Vs(Uu.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, ar(9, Au.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = He(), t = oe.identifierPrefix;
  if (Q) {
    var n = qe, r = Je;
    n = (r & ~(1 << 32 - Ae(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = ir++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Fp++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Up = {
  readContext: Me,
  useCallback: Gu,
  useContext: Me,
  useEffect: Ii,
  useImperativeHandle: Yu,
  useInsertionEffect: Vu,
  useLayoutEffect: Qu,
  useMemo: Xu,
  useReducer: lo,
  useRef: Hu,
  useState: function() {
    return lo(sr);
  },
  useDebugValue: Ai,
  useDeferredValue: function(e) {
    var t = Re();
    return Zu(t, ne.memoizedState, e);
  },
  useTransition: function() {
    var e = lo(sr)[0], t = Re().memoizedState;
    return [e, t];
  },
  useMutableSource: Du,
  useSyncExternalStore: Ou,
  useId: Ju,
  unstable_isNewReconciler: !1
}, Bp = { readContext: Me, useCallback: Gu, useContext: Me, useEffect: Ii, useImperativeHandle: Yu, useInsertionEffect: Vu, useLayoutEffect: Qu, useMemo: Xu, useReducer: oo, useRef: Hu, useState: function() {
  return oo(sr);
}, useDebugValue: Ai, useDeferredValue: function(e) {
  var t = Re();
  return ne === null ? t.memoizedState = e : Zu(t, ne.memoizedState, e);
}, useTransition: function() {
  var e = oo(sr)[0], t = Re().memoizedState;
  return [e, t];
}, useMutableSource: Du, useSyncExternalStore: Ou, useId: Ju, unstable_isNewReconciler: !1 };
function De(e, t) {
  if (e && e.defaultProps) {
    t = X({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Uo(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : X({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var zl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Ht(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), l = wt(e), o = et(r, l);
  o.payload = t, n != null && (o.callback = n), t = xt(e, o, l), t !== null && (Ue(t, e, l, r), Ur(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), l = wt(e), o = et(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = xt(e, o, l), t !== null && (Ue(t, e, l, r), Ur(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = he(), r = wt(e), l = et(n, r);
  l.tag = 2, t != null && (l.callback = t), t = xt(e, l, r), t !== null && (Ue(t, e, r, n), Ur(t, e, r));
} };
function Qs(e, t, n, r, l, o, s) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, s) : t.prototype && t.prototype.isPureReactComponent ? !er(n, r) || !er(l, o) : !0;
}
function nc(e, t, n) {
  var r = !1, l = Nt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Me(o) : (l = je(t) ? Ot : pe.current, r = t.contextTypes, o = (r = r != null) ? fn(e, l) : Nt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = zl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Ks(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && zl.enqueueReplaceState(t, t.state, null);
}
function Bo(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Pi(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = Me(o) : (o = je(t) ? Ot : pe.current, l.context = fn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Uo(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && zl.enqueueReplaceState(l, l.state, null), dl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function vn(e, t) {
  try {
    var n = "", r = t;
    do
      n += gd(r), r = r.return;
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
var Wp = typeof WeakMap == "function" ? WeakMap : Map;
function rc(e, t, n) {
  n = et(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    gl || (gl = !0, qo = r), Wo(e, t);
  }, n;
}
function lc(e, t, n) {
  n = et(-1, n), n.tag = 3;
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
    Wo(e, t), typeof r != "function" && (yt === null ? yt = /* @__PURE__ */ new Set([this]) : yt.add(this));
    var s = t.stack;
    this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
  }), n;
}
function Ys(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Wp();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = rf.bind(null, e, t, n), t.then(e, e));
}
function Gs(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Xs(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = et(-1, 1), t.tag = 2, xt(n, t, 1))), n.lanes |= 1), e);
}
var Hp = ot.ReactCurrentOwner, we = !1;
function fe(e, t, n, r) {
  t.child = e === null ? Lu(t, null, n, r) : mn(t, e.child, n, r);
}
function Zs(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return cn(t, l), r = Di(e, t, n, r, o, l), n = Oi(), e !== null && !we ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, lt(e, t, l)) : (Q && n && _i(t), t.flags |= 1, fe(e, t, r, l), t.child);
}
function Js(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Yi(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, oc(e, t, o, r, l)) : (e = Kr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var s = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : er, n(s, r) && e.ref === t.ref) return lt(e, t, l);
  }
  return t.flags |= 1, e = kt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function oc(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (er(o, r) && e.ref === t.ref) if (we = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (we = !0);
    else return t.lanes = e.lanes, lt(e, t, l);
  }
  return Ho(e, t, n, r, l);
}
function ic(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, W(ln, Se), Se |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, W(ln, Se), Se |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, W(ln, Se), Se |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, W(ln, Se), Se |= r;
  return fe(e, t, l, n), t.child;
}
function sc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ho(e, t, n, r, l) {
  var o = je(n) ? Ot : pe.current;
  return o = fn(t, o), cn(t, l), n = Di(e, t, n, r, o, l), r = Oi(), e !== null && !we ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, lt(e, t, l)) : (Q && r && _i(t), t.flags |= 1, fe(e, t, n, l), t.child);
}
function qs(e, t, n, r, l) {
  if (je(n)) {
    var o = !0;
    il(t);
  } else o = !1;
  if (cn(t, l), t.stateNode === null) Hr(e, t), nc(t, n, r), Bo(t, n, r, l), r = !0;
  else if (e === null) {
    var s = t.stateNode, a = t.memoizedProps;
    s.props = a;
    var u = s.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Me(c) : (c = je(n) ? Ot : pe.current, c = fn(t, c));
    var g = n.getDerivedStateFromProps, m = typeof g == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    m || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== r || u !== c) && Ks(t, s, r, c), ut = !1;
    var h = t.memoizedState;
    s.state = h, dl(t, r, s, l), u = t.memoizedState, a !== r || h !== u || ke.current || ut ? (typeof g == "function" && (Uo(t, n, g, r), u = t.memoizedState), (a = ut || Qs(t, n, a, r, h, u, c)) ? (m || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), s.props = r, s.state = u, s.context = c, r = a) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    s = t.stateNode, Ru(e, t), a = t.memoizedProps, c = t.type === t.elementType ? a : De(t.type, a), s.props = c, m = t.pendingProps, h = s.context, u = n.contextType, typeof u == "object" && u !== null ? u = Me(u) : (u = je(n) ? Ot : pe.current, u = fn(t, u));
    var v = n.getDerivedStateFromProps;
    (g = typeof v == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== m || h !== u) && Ks(t, s, r, u), ut = !1, h = t.memoizedState, s.state = h, dl(t, r, s, l);
    var w = t.memoizedState;
    a !== m || h !== w || ke.current || ut ? (typeof v == "function" && (Uo(t, n, v, r), w = t.memoizedState), (c = ut || Qs(t, n, c, r, h, w, u) || !1) ? (g || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, w, u), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, w, u)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = w), s.props = r, s.state = w, s.context = u, r = c) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Vo(e, t, n, r, o, l);
}
function Vo(e, t, n, r, l, o) {
  sc(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return l && Os(t, n, !1), lt(e, t, o);
  r = t.stateNode, Hp.current = t;
  var a = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && s ? (t.child = mn(t, e.child, null, o), t.child = mn(t, null, a, o)) : fe(e, t, a, o), t.memoizedState = r.state, l && Os(t, n, !0), t.child;
}
function ac(e) {
  var t = e.stateNode;
  t.pendingContext ? Ds(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ds(e, t.context, !1), Li(e, t.containerInfo);
}
function ea(e, t, n, r, l) {
  return hn(), Ci(l), t.flags |= 256, fe(e, t, n, r), t.child;
}
var Qo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ko(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function uc(e, t, n) {
  var r = t.pendingProps, l = Y.current, o = !1, s = (t.flags & 128) !== 0, a;
  if ((a = s) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), W(Y, l & 1), e === null)
    return Io(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, s = { mode: "hidden", children: s }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = s) : o = Pl(s, r, 0, null), e = Dt(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Ko(n), t.memoizedState = Qo, e) : Ui(t, s));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return Vp(e, t, s, r, a, l, n);
  if (o) {
    o = r.fallback, s = t.mode, l = e.child, a = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(s & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = kt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? o = kt(a, o) : (o = Dt(o, s, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, s = e.child.memoizedState, s = s === null ? Ko(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }, o.memoizedState = s, o.childLanes = e.childLanes & ~n, t.memoizedState = Qo, r;
  }
  return o = e.child, e = o.sibling, r = kt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Ui(e, t) {
  return t = Pl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Tr(e, t, n, r) {
  return r !== null && Ci(r), mn(t, e.child, null, n), e = Ui(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Vp(e, t, n, r, l, o, s) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = io(Error(E(422))), Tr(e, t, s, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Pl({ mode: "visible", children: r.children }, l, 0, null), o = Dt(o, l, s, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && mn(t, e.child, null, s), t.child.memoizedState = Ko(s), t.memoizedState = Qo, o);
  if (!(t.mode & 1)) return Tr(e, t, s, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, o = Error(E(419)), r = io(o, r, void 0), Tr(e, t, s, r);
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
      l = l & (r.suspendedLanes | s) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, rt(e, l), Ue(r, e, l, -1));
    }
    return Ki(), r = io(Error(E(421))), Tr(e, t, s, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = lf.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, _e = vt(l.nextSibling), be = t, Q = !0, Ie = null, e !== null && (Te[$e++] = Je, Te[$e++] = qe, Te[$e++] = It, Je = e.id, qe = e.overflow, It = t), t = Ui(t, r.children), t.flags |= 4096, t);
}
function ta(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ao(e.return, t, n);
}
function so(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function cc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (fe(e, t, r.children, n), r = Y.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && ta(e, n, t);
      else if (e.tag === 19) ta(e, n, t);
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
  if (W(Y, r), !(t.mode & 1)) t.memoizedState = null;
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
function lt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Ut |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(E(153));
  if (t.child !== null) {
    for (e = t.child, n = kt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = kt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Qp(e, t, n) {
  switch (t.tag) {
    case 3:
      ac(t), hn();
      break;
    case 5:
      Fu(t);
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
        return r.dehydrated !== null ? (W(Y, Y.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? uc(e, t, n) : (W(Y, Y.current & 1), e = lt(e, t, n), e !== null ? e.sibling : null);
      W(Y, Y.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return cc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), W(Y, Y.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, ic(e, t, n);
  }
  return lt(e, t, n);
}
var dc, Yo, pc, fc;
dc = function(e, t) {
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
pc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Mt(Ke.current);
    var o = null;
    switch (n) {
      case "input":
        l = go(e, l), r = go(e, r), o = [];
        break;
      case "select":
        l = X({}, l, { value: void 0 }), r = X({}, r, { value: void 0 }), o = [];
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
fc = function(e, t, n, r) {
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
function Kp(e, t, n) {
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
      return r = t.stateNode, gn(), V(ke), V(pe), Ri(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Er(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ie !== null && (ni(Ie), Ie = null))), Yo(e, t), ce(t), null;
    case 5:
      Mi(t);
      var l = Mt(or.current);
      if (n = t.type, e !== null && t.stateNode != null) pc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(E(166));
          return ce(t), null;
        }
        if (e = Mt(Ke.current), Er(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Ve] = t, r[rr] = o, e = (t.mode & 1) !== 0, n) {
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
              cs(r, o), H("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, H("invalid", r);
              break;
            case "textarea":
              ps(r, o), H("invalid", r);
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
              yr(r), ds(r, o, !0);
              break;
            case "textarea":
              yr(r), fs(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = ll);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          s = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ua(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = s.createElement(n, { is: r.is }) : (e = s.createElement(n), n === "select" && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[Ve] = t, e[rr] = r, dc(e, t, !1, !1), t.stateNode = e;
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
                cs(e, r), l = go(e, r), H("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = X({}, r, { value: void 0 }), H("invalid", e);
                break;
              case "textarea":
                ps(e, r), l = yo(e, r), H("invalid", e);
                break;
              default:
                l = r;
            }
            ko(n, l), a = l;
            for (o in a) if (a.hasOwnProperty(o)) {
              var u = a[o];
              o === "style" ? Ha(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Ba(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Yn(e, u) : typeof u == "number" && Yn(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Kn.hasOwnProperty(o) ? u != null && o === "onScroll" && H("scroll", e) : u != null && di(e, o, u, s));
            }
            switch (n) {
              case "input":
                yr(e), ds(e, r, !1);
                break;
              case "textarea":
                yr(e), fs(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + jt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? on(e, !!r.multiple, o, !1) : r.defaultValue != null && on(
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
      if (e && t.stateNode != null) fc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(E(166));
        if (n = Mt(or.current), Mt(Ke.current), Er(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ve] = t, (o = r.nodeValue !== n) && (e = be, e !== null)) switch (e.tag) {
            case 3:
              Cr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Cr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ve] = t, t.stateNode = r;
      }
      return ce(t), null;
    case 13:
      if (V(Y), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Q && _e !== null && t.mode & 1 && !(t.flags & 128)) $u(), hn(), t.flags |= 98560, o = !1;
        else if (o = Er(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(E(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(E(317));
            o[Ve] = t;
          } else hn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ce(t), o = !1;
        } else Ie !== null && (ni(Ie), Ie = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Y.current & 1 ? re === 0 && (re = 3) : Ki())), t.updateQueue !== null && (t.flags |= 4), ce(t), null);
    case 4:
      return gn(), Yo(e, t), e === null && tr(t.stateNode.containerInfo), ce(t), null;
    case 10:
      return Ti(t.type._context), ce(t), null;
    case 17:
      return je(t.type) && ol(), ce(t), null;
    case 19:
      if (V(Y), o = t.memoizedState, o === null) return ce(t), null;
      if (r = (t.flags & 128) !== 0, s = o.rendering, s === null) if (r) zn(o, !1);
      else {
        if (re !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (s = pl(e), s !== null) {
            for (t.flags |= 128, zn(o, !1), r = s.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, s = o.alternate, s === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = s.childLanes, o.lanes = s.lanes, o.child = s.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = s.memoizedProps, o.memoizedState = s.memoizedState, o.updateQueue = s.updateQueue, o.type = s.type, e = s.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return W(Y, Y.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && J() > xn && (t.flags |= 128, r = !0, zn(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = pl(s), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), zn(o, !0), o.tail === null && o.tailMode === "hidden" && !s.alternate && !Q) return ce(t), null;
        } else 2 * J() - o.renderingStartTime > xn && n !== 1073741824 && (t.flags |= 128, r = !0, zn(o, !1), t.lanes = 4194304);
        o.isBackwards ? (s.sibling = t.child, t.child = s) : (n = o.last, n !== null ? n.sibling = s : t.child = s, o.last = s);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = J(), t.sibling = null, n = Y.current, W(Y, r ? n & 1 | 2 : n & 1), t) : (ce(t), null);
    case 22:
    case 23:
      return Qi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Se & 1073741824 && (ce(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ce(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(E(156, t.tag));
}
function Yp(e, t) {
  switch (bi(t), t.tag) {
    case 1:
      return je(t.type) && ol(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return gn(), V(ke), V(pe), Ri(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Mi(t), null;
    case 13:
      if (V(Y), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(E(340));
        hn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return V(Y), null;
    case 4:
      return gn(), null;
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
var $r = !1, de = !1, Gp = typeof WeakSet == "function" ? WeakSet : Set, L = null;
function rn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    Z(e, t, r);
  }
  else n.current = null;
}
function Go(e, t, n) {
  try {
    n();
  } catch (r) {
    Z(e, t, r);
  }
}
var na = !1;
function Xp(e, t) {
  if (Po = tl, e = xu(), Si(e)) {
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
        var s = 0, a = -1, u = -1, c = 0, g = 0, m = e, h = null;
        t: for (; ; ) {
          for (var v; m !== n || l !== 0 && m.nodeType !== 3 || (a = s + l), m !== o || r !== 0 && m.nodeType !== 3 || (u = s + r), m.nodeType === 3 && (s += m.nodeValue.length), (v = m.firstChild) !== null; )
            h = m, m = v;
          for (; ; ) {
            if (m === e) break t;
            if (h === n && ++c === l && (a = s), h === o && ++g === r && (u = s), (v = m.nextSibling) !== null) break;
            m = h, h = m.parentNode;
          }
          m = v;
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
            var k = w.memoizedProps, C = w.memoizedState, f = t.stateNode, d = f.getSnapshotBeforeUpdate(t.elementType === t.type ? k : De(t.type, k), C);
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
          throw Error(E(163));
      }
    } catch (y) {
      Z(t, t.return, y);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, L = e;
      break;
    }
    L = t.return;
  }
  return w = na, na = !1, w;
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
function hc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, hc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ve], delete t[rr], delete t[Fo], delete t[Pp], delete t[Lp])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function mc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ra(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || mc(e.return)) return null;
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
function st(e, t, n) {
  for (n = n.child; n !== null; ) gc(e, t, n), n = n.sibling;
}
function gc(e, t, n) {
  if (Qe && typeof Qe.onCommitFiberUnmount == "function") try {
    Qe.onCommitFiberUnmount(jl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      de || rn(n, t);
    case 6:
      var r = ie, l = Oe;
      ie = null, st(e, t, n), ie = r, Oe = l, ie !== null && (Oe ? (e = ie, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ie.removeChild(n.stateNode));
      break;
    case 18:
      ie !== null && (Oe ? (e = ie, n = n.stateNode, e.nodeType === 8 ? eo(e.parentNode, n) : e.nodeType === 1 && eo(e, n), Jn(e)) : eo(ie, n.stateNode));
      break;
    case 4:
      r = ie, l = Oe, ie = n.stateNode.containerInfo, Oe = !0, st(e, t, n), ie = r, Oe = l;
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
      st(e, t, n);
      break;
    case 1:
      if (!de && (rn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        Z(n, t, a);
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
function la(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Gp()), t.forEach(function(r) {
      var l = of.bind(null, e, r);
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
      if (ie === null) throw Error(E(160));
      gc(o, s, l), ie = null, Oe = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (c) {
      Z(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) vc(t, e), t = t.sibling;
}
function vc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Fe(t, e), We(e), r & 4) {
        try {
          Bn(3, e, e.return), Tl(3, e);
        } catch (k) {
          Z(e, e.return, k);
        }
        try {
          Bn(5, e, e.return);
        } catch (k) {
          Z(e, e.return, k);
        }
      }
      break;
    case 1:
      Fe(t, e), We(e), r & 512 && n !== null && rn(n, n.return);
      break;
    case 5:
      if (Fe(t, e), We(e), r & 512 && n !== null && rn(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Yn(l, "");
        } catch (k) {
          Z(e, e.return, k);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, s = n !== null ? n.memoizedProps : o, a = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          a === "input" && o.type === "radio" && o.name != null && Ia(l, o), jo(a, s);
          var c = jo(a, o);
          for (s = 0; s < u.length; s += 2) {
            var g = u[s], m = u[s + 1];
            g === "style" ? Ha(l, m) : g === "dangerouslySetInnerHTML" ? Ba(l, m) : g === "children" ? Yn(l, m) : di(l, g, m, c);
          }
          switch (a) {
            case "input":
              vo(l, o);
              break;
            case "textarea":
              Aa(l, o);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var v = o.value;
              v != null ? on(l, !!o.multiple, v, !1) : h !== !!o.multiple && (o.defaultValue != null ? on(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : on(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[rr] = o;
        } catch (k) {
          Z(e, e.return, k);
        }
      }
      break;
    case 6:
      if (Fe(t, e), We(e), r & 4) {
        if (e.stateNode === null) throw Error(E(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (k) {
          Z(e, e.return, k);
        }
      }
      break;
    case 3:
      if (Fe(t, e), We(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Jn(t.containerInfo);
      } catch (k) {
        Z(e, e.return, k);
      }
      break;
    case 4:
      Fe(t, e), We(e);
      break;
    case 13:
      Fe(t, e), We(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Hi = J())), r & 4 && la(e);
      break;
    case 22:
      if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (de = (c = de) || g, Fe(t, e), de = c) : Fe(t, e), We(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !g && e.mode & 1) for (L = e, g = e.child; g !== null; ) {
          for (m = L = g; L !== null; ) {
            switch (h = L, v = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Bn(4, h, h.return);
                break;
              case 1:
                rn(h, h.return);
                var w = h.stateNode;
                if (typeof w.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, w.props = t.memoizedProps, w.state = t.memoizedState, w.componentWillUnmount();
                  } catch (k) {
                    Z(r, n, k);
                  }
                }
                break;
              case 5:
                rn(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  ia(m);
                  continue;
                }
            }
            v !== null ? (v.return = h, L = v) : ia(m);
          }
          g = g.sibling;
        }
        e: for (g = null, m = e; ; ) {
          if (m.tag === 5) {
            if (g === null) {
              g = m;
              try {
                l = m.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (a = m.stateNode, u = m.memoizedProps.style, s = u != null && u.hasOwnProperty("display") ? u.display : null, a.style.display = Wa("display", s));
              } catch (k) {
                Z(e, e.return, k);
              }
            }
          } else if (m.tag === 6) {
            if (g === null) try {
              m.stateNode.nodeValue = c ? "" : m.memoizedProps;
            } catch (k) {
              Z(e, e.return, k);
            }
          } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
            m.child.return = m, m = m.child;
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            g === m && (g = null), m = m.return;
          }
          g === m && (g = null), m.sibling.return = m.return, m = m.sibling;
        }
      }
      break;
    case 19:
      Fe(t, e), We(e), r & 4 && la(e);
      break;
    case 21:
      break;
    default:
      Fe(
        t,
        e
      ), We(e);
  }
}
function We(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (mc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(E(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Yn(l, ""), r.flags &= -33);
          var o = ra(e);
          Jo(e, o, l);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo, a = ra(e);
          Zo(e, a, s);
          break;
        default:
          throw Error(E(161));
      }
    } catch (u) {
      Z(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Zp(e, t, n) {
  L = e, xc(e);
}
function xc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; L !== null; ) {
    var l = L, o = l.child;
    if (l.tag === 22 && r) {
      var s = l.memoizedState !== null || $r;
      if (!s) {
        var a = l.alternate, u = a !== null && a.memoizedState !== null || de;
        a = $r;
        var c = de;
        if ($r = s, (de = u) && !c) for (L = l; L !== null; ) s = L, u = s.child, s.tag === 22 && s.memoizedState !== null ? sa(l) : u !== null ? (u.return = s, L = u) : sa(l);
        for (; o !== null; ) L = o, xc(o), o = o.sibling;
        L = l, $r = a, de = c;
      }
      oa(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, L = o) : oa(e);
  }
}
function oa(e) {
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
            o !== null && Ws(t, o, r);
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
              Ws(t, s, n);
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
                var g = c.memoizedState;
                if (g !== null) {
                  var m = g.dehydrated;
                  m !== null && Jn(m);
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
            throw Error(E(163));
        }
        de || t.flags & 512 && Xo(t);
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
function ia(e) {
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
function sa(e) {
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
            Xo(t);
          } catch (u) {
            Z(t, o, u);
          }
          break;
        case 5:
          var s = t.return;
          try {
            Xo(t);
          } catch (u) {
            Z(t, s, u);
          }
      }
    } catch (u) {
      Z(t, t.return, u);
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
var Jp = Math.ceil, ml = ot.ReactCurrentDispatcher, Bi = ot.ReactCurrentOwner, Le = ot.ReactCurrentBatchConfig, A = 0, oe = null, ee = null, se = 0, Se = 0, ln = _t(0), re = 0, ur = null, Ut = 0, $l = 0, Wi = 0, Wn = null, ye = null, Hi = 0, xn = 1 / 0, Xe = null, gl = !1, qo = null, yt = null, Pr = !1, ft = null, vl = 0, Hn = 0, ei = null, Vr = -1, Qr = 0;
function he() {
  return A & 6 ? J() : Vr !== -1 ? Vr : Vr = J();
}
function wt(e) {
  return e.mode & 1 ? A & 2 && se !== 0 ? se & -se : Rp.transition !== null ? (Qr === 0 && (Qr = nu()), Qr) : (e = U, e !== 0 || (e = window.event, e = e === void 0 ? 16 : uu(e.type)), e) : 1;
}
function Ue(e, t, n, r) {
  if (50 < Hn) throw Hn = 0, ei = null, Error(E(185));
  dr(e, n, r), (!(A & 2) || e !== oe) && (e === oe && (!(A & 2) && ($l |= n), re === 4 && dt(e, se)), Ne(e, r), n === 1 && A === 0 && !(t.mode & 1) && (xn = J() + 500, Cl && bt()));
}
function Ne(e, t) {
  var n = e.callbackNode;
  Rd(e, t);
  var r = el(e, e === oe ? se : 0);
  if (r === 0) n !== null && gs(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && gs(n), t === 1) e.tag === 0 ? Mp(aa.bind(null, e)) : Eu(aa.bind(null, e)), Tp(function() {
      !(A & 6) && bt();
    }), n = null;
    else {
      switch (ru(r)) {
        case 1:
          n = gi;
          break;
        case 4:
          n = eu;
          break;
        case 16:
          n = qr;
          break;
        case 536870912:
          n = tu;
          break;
        default:
          n = qr;
      }
      n = bc(n, yc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function yc(e, t) {
  if (Vr = -1, Qr = 0, A & 6) throw Error(E(327));
  var n = e.callbackNode;
  if (dn() && e.callbackNode !== n) return null;
  var r = el(e, e === oe ? se : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = xl(e, r);
  else {
    t = r;
    var l = A;
    A |= 2;
    var o = kc();
    (oe !== e || se !== t) && (Xe = null, xn = J() + 500, Ft(e, t));
    do
      try {
        tf();
        break;
      } catch (a) {
        wc(e, a);
      }
    while (!0);
    zi(), ml.current = o, A = l, ee !== null ? t = 0 : (oe = null, se = 0, t = re);
  }
  if (t !== 0) {
    if (t === 2 && (l = Co(e), l !== 0 && (r = l, t = ti(e, l))), t === 1) throw n = ur, Ft(e, 0), dt(e, r), Ne(e, J()), n;
    if (t === 6) dt(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !qp(l) && (t = xl(e, r), t === 2 && (o = Co(e), o !== 0 && (r = o, t = ti(e, o))), t === 1)) throw n = ur, Ft(e, 0), dt(e, r), Ne(e, J()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(E(345));
        case 2:
          $t(e, ye, Xe);
          break;
        case 3:
          if (dt(e, r), (r & 130023424) === r && (t = Hi + 500 - J(), 10 < t)) {
            if (el(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              he(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Ro($t.bind(null, e, ye, Xe), t);
            break;
          }
          $t(e, ye, Xe);
          break;
        case 4:
          if (dt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var s = 31 - Ae(r);
            o = 1 << s, s = t[s], s > l && (l = s), r &= ~o;
          }
          if (r = l, r = J() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Jp(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Ro($t.bind(null, e, ye, Xe), r);
            break;
          }
          $t(e, ye, Xe);
          break;
        case 5:
          $t(e, ye, Xe);
          break;
        default:
          throw Error(E(329));
      }
    }
  }
  return Ne(e, J()), e.callbackNode === n ? yc.bind(null, e) : null;
}
function ti(e, t) {
  var n = Wn;
  return e.current.memoizedState.isDehydrated && (Ft(e, t).flags |= 256), e = xl(e, t), e !== 2 && (t = ye, ye = n, t !== null && ni(t)), e;
}
function ni(e) {
  ye === null ? ye = e : ye.push.apply(ye, e);
}
function qp(e) {
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
function dt(e, t) {
  for (t &= ~Wi, t &= ~$l, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ae(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function aa(e) {
  if (A & 6) throw Error(E(327));
  dn();
  var t = el(e, 0);
  if (!(t & 1)) return Ne(e, J()), null;
  var n = xl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Co(e);
    r !== 0 && (t = r, n = ti(e, r));
  }
  if (n === 1) throw n = ur, Ft(e, 0), dt(e, t), Ne(e, J()), n;
  if (n === 6) throw Error(E(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, $t(e, ye, Xe), Ne(e, J()), null;
}
function Vi(e, t) {
  var n = A;
  A |= 1;
  try {
    return e(t);
  } finally {
    A = n, A === 0 && (xn = J() + 500, Cl && bt());
  }
}
function Bt(e) {
  ft !== null && ft.tag === 0 && !(A & 6) && dn();
  var t = A;
  A |= 1;
  var n = Le.transition, r = U;
  try {
    if (Le.transition = null, U = 1, e) return e();
  } finally {
    U = r, Le.transition = n, A = t, !(A & 6) && bt();
  }
}
function Qi() {
  Se = ln.current, V(ln);
}
function Ft(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, zp(n)), ee !== null) for (n = ee.return; n !== null; ) {
    var r = n;
    switch (bi(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && ol();
        break;
      case 3:
        gn(), V(ke), V(pe), Ri();
        break;
      case 5:
        Mi(r);
        break;
      case 4:
        gn();
        break;
      case 13:
        V(Y);
        break;
      case 19:
        V(Y);
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
  if (oe = e, ee = e = kt(e.current, null), se = Se = t, re = 0, ur = null, Wi = $l = Ut = 0, ye = Wn = null, Lt !== null) {
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
function wc(e, t) {
  do {
    var n = ee;
    try {
      if (zi(), Br.current = hl, fl) {
        for (var r = G.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        fl = !1;
      }
      if (At = 0, le = ne = G = null, Un = !1, ir = 0, Bi.current = null, n === null || n.return === null) {
        re = 1, ur = t, ee = null;
        break;
      }
      e: {
        var o = e, s = n.return, a = n, u = t;
        if (t = se, a.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, g = a, m = g.tag;
          if (!(g.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var h = g.alternate;
            h ? (g.updateQueue = h.updateQueue, g.memoizedState = h.memoizedState, g.lanes = h.lanes) : (g.updateQueue = null, g.memoizedState = null);
          }
          var v = Gs(s);
          if (v !== null) {
            v.flags &= -257, Xs(v, s, a, o, t), v.mode & 1 && Ys(o, c, t), t = v, u = c;
            var w = t.updateQueue;
            if (w === null) {
              var k = /* @__PURE__ */ new Set();
              k.add(u), t.updateQueue = k;
            } else w.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Ys(o, c, t), Ki();
              break e;
            }
            u = Error(E(426));
          }
        } else if (Q && a.mode & 1) {
          var C = Gs(s);
          if (C !== null) {
            !(C.flags & 65536) && (C.flags |= 256), Xs(C, s, a, o, t), Ci(vn(u, a));
            break e;
          }
        }
        o = u = vn(u, a), re !== 4 && (re = 2), Wn === null ? Wn = [o] : Wn.push(o), o = s;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var f = rc(o, u, t);
              Bs(o, f);
              break e;
            case 1:
              a = u;
              var d = o.type, p = o.stateNode;
              if (!(o.flags & 128) && (typeof d.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (yt === null || !yt.has(p)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var y = lc(o, a, t);
                Bs(o, y);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Nc(n);
    } catch (x) {
      t = x, ee === n && n !== null && (ee = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function kc() {
  var e = ml.current;
  return ml.current = hl, e === null ? hl : e;
}
function Ki() {
  (re === 0 || re === 3 || re === 2) && (re = 4), oe === null || !(Ut & 268435455) && !($l & 268435455) || dt(oe, se);
}
function xl(e, t) {
  var n = A;
  A |= 2;
  var r = kc();
  (oe !== e || se !== t) && (Xe = null, Ft(e, t));
  do
    try {
      ef();
      break;
    } catch (l) {
      wc(e, l);
    }
  while (!0);
  if (zi(), A = n, ml.current = r, ee !== null) throw Error(E(261));
  return oe = null, se = 0, re;
}
function ef() {
  for (; ee !== null; ) jc(ee);
}
function tf() {
  for (; ee !== null && !bd(); ) jc(ee);
}
function jc(e) {
  var t = _c(e.alternate, e, Se);
  e.memoizedProps = e.pendingProps, t === null ? Nc(e) : ee = t, Bi.current = null;
}
function Nc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Yp(n, t), n !== null) {
        n.flags &= 32767, ee = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        re = 6, ee = null;
        return;
      }
    } else if (n = Kp(n, t, Se), n !== null) {
      ee = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      ee = t;
      return;
    }
    ee = t = e;
  } while (t !== null);
  re === 0 && (re = 5);
}
function $t(e, t, n) {
  var r = U, l = Le.transition;
  try {
    Le.transition = null, U = 1, nf(e, t, n, r);
  } finally {
    Le.transition = l, U = r;
  }
  return null;
}
function nf(e, t, n, r) {
  do
    dn();
  while (ft !== null);
  if (A & 6) throw Error(E(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(E(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Fd(e, o), e === oe && (ee = oe = null, se = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Pr || (Pr = !0, bc(qr, function() {
    return dn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Le.transition, Le.transition = null;
    var s = U;
    U = 1;
    var a = A;
    A |= 4, Bi.current = null, Xp(e, n), vc(n, e), jp(Lo), tl = !!Po, Lo = Po = null, e.current = n, Zp(n), Cd(), A = a, U = s, Le.transition = o;
  } else e.current = n;
  if (Pr && (Pr = !1, ft = e, vl = l), o = e.pendingLanes, o === 0 && (yt = null), Td(n.stateNode), Ne(e, J()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (gl) throw gl = !1, e = qo, qo = null, e;
  return vl & 1 && e.tag !== 0 && dn(), o = e.pendingLanes, o & 1 ? e === ei ? Hn++ : (Hn = 0, ei = e) : Hn = 0, bt(), null;
}
function dn() {
  if (ft !== null) {
    var e = ru(vl), t = Le.transition, n = U;
    try {
      if (Le.transition = null, U = 16 > e ? 16 : e, ft === null) var r = !1;
      else {
        if (e = ft, ft = null, vl = 0, A & 6) throw Error(E(331));
        var l = A;
        for (A |= 4, L = e.current; L !== null; ) {
          var o = L, s = o.child;
          if (L.flags & 16) {
            var a = o.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var c = a[u];
                for (L = c; L !== null; ) {
                  var g = L;
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Bn(8, g, o);
                  }
                  var m = g.child;
                  if (m !== null) m.return = g, L = m;
                  else for (; L !== null; ) {
                    g = L;
                    var h = g.sibling, v = g.return;
                    if (hc(g), g === c) {
                      L = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = v, L = h;
                      break;
                    }
                    L = v;
                  }
                }
              }
              var w = o.alternate;
              if (w !== null) {
                var k = w.child;
                if (k !== null) {
                  w.child = null;
                  do {
                    var C = k.sibling;
                    k.sibling = null, k = C;
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
            } catch (x) {
              Z(a, a.return, x);
            }
            if (a === s) {
              L = null;
              break e;
            }
            var y = a.sibling;
            if (y !== null) {
              y.return = a.return, L = y;
              break e;
            }
            L = a.return;
          }
        }
        if (A = l, bt(), Qe && typeof Qe.onPostCommitFiberRoot == "function") try {
          Qe.onPostCommitFiberRoot(jl, e);
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
function ua(e, t, n) {
  t = vn(n, t), t = rc(e, t, 1), e = xt(e, t, 1), t = he(), e !== null && (dr(e, 1, t), Ne(e, t));
}
function Z(e, t, n) {
  if (e.tag === 3) ua(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      ua(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (yt === null || !yt.has(r))) {
        e = vn(n, e), e = lc(t, e, 1), t = xt(t, e, 1), e = he(), t !== null && (dr(t, 1, e), Ne(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function rf(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = he(), e.pingedLanes |= e.suspendedLanes & n, oe === e && (se & n) === n && (re === 4 || re === 3 && (se & 130023424) === se && 500 > J() - Hi ? Ft(e, 0) : Wi |= n), Ne(e, t);
}
function Sc(e, t) {
  t === 0 && (e.mode & 1 ? (t = jr, jr <<= 1, !(jr & 130023424) && (jr = 4194304)) : t = 1);
  var n = he();
  e = rt(e, t), e !== null && (dr(e, t, n), Ne(e, n));
}
function lf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Sc(e, n);
}
function of(e, t) {
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
      throw Error(E(314));
  }
  r !== null && r.delete(t), Sc(e, n);
}
var _c;
_c = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ke.current) we = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return we = !1, Qp(e, t, n);
    we = !!(e.flags & 131072);
  }
  else we = !1, Q && t.flags & 1048576 && zu(t, al, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Hr(e, t), e = t.pendingProps;
      var l = fn(t, pe.current);
      cn(t, n), l = Di(null, t, r, e, l, n);
      var o = Oi();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, je(r) ? (o = !0, il(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Pi(t), l.updater = zl, t.stateNode = l, l._reactInternals = t, Bo(t, r, e, n), t = Vo(null, t, r, !0, o, n)) : (t.tag = 0, Q && o && _i(t), fe(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Hr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = af(r), e = De(r, e), l) {
          case 0:
            t = Ho(null, t, r, e, n);
            break e;
          case 1:
            t = qs(null, t, r, e, n);
            break e;
          case 11:
            t = Zs(null, t, r, e, n);
            break e;
          case 14:
            t = Js(null, t, r, De(r.type, e), n);
            break e;
        }
        throw Error(E(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), Ho(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), qs(e, t, r, l, n);
    case 3:
      e: {
        if (ac(t), e === null) throw Error(E(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, Ru(e, t), dl(t, r, null, n);
        var s = t.memoizedState;
        if (r = s.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: s.cache, pendingSuspenseBoundaries: s.pendingSuspenseBoundaries, transitions: s.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = vn(Error(E(423)), t), t = ea(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = vn(Error(E(424)), t), t = ea(e, t, r, n, l);
          break e;
        } else for (_e = vt(t.stateNode.containerInfo.firstChild), be = t, Q = !0, Ie = null, n = Lu(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (hn(), r === l) {
            t = lt(e, t, n);
            break e;
          }
          fe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Fu(t), e === null && Io(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, s = l.children, Mo(r, l) ? s = null : o !== null && Mo(r, o) && (t.flags |= 32), sc(e, t), fe(e, t, s, n), t.child;
    case 6:
      return e === null && Io(t), null;
    case 13:
      return uc(e, t, n);
    case 4:
      return Li(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = mn(t, null, r, n) : fe(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), Zs(e, t, r, l, n);
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
            t = lt(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var a = o.dependencies;
          if (a !== null) {
            s = o.child;
            for (var u = a.firstContext; u !== null; ) {
              if (u.context === r) {
                if (o.tag === 1) {
                  u = et(-1, n & -n), u.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var g = c.pending;
                    g === null ? u.next = u : (u.next = g.next, g.next = u), c.pending = u;
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
            if (s = o.return, s === null) throw Error(E(341));
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
      return l = t.type, r = t.pendingProps.children, cn(t, n), l = Me(l), r = r(l), t.flags |= 1, fe(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = De(r, t.pendingProps), l = De(r.type, l), Js(e, t, r, l, n);
    case 15:
      return oc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), Hr(e, t), t.tag = 1, je(r) ? (e = !0, il(t)) : e = !1, cn(t, n), nc(t, r, l), Bo(t, r, l, n), Vo(null, t, r, !0, e, n);
    case 19:
      return cc(e, t, n);
    case 22:
      return ic(e, t, n);
  }
  throw Error(E(156, t.tag));
};
function bc(e, t) {
  return qa(e, t);
}
function sf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Pe(e, t, n, r) {
  return new sf(e, t, n, r);
}
function Yi(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function af(e) {
  if (typeof e == "function") return Yi(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === fi) return 11;
    if (e === hi) return 14;
  }
  return 2;
}
function kt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Pe(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Kr(e, t, n, r, l, o) {
  var s = 2;
  if (r = e, typeof e == "function") Yi(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else e: switch (e) {
    case Yt:
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
    case Fa:
      return Pl(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Ma:
          s = 10;
          break e;
        case Ra:
          s = 9;
          break e;
        case fi:
          s = 11;
          break e;
        case hi:
          s = 14;
          break e;
        case at:
          s = 16, r = null;
          break e;
      }
      throw Error(E(130, e == null ? e : typeof e, ""));
  }
  return t = Pe(s, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Dt(e, t, n, r) {
  return e = Pe(7, e, r, t), e.lanes = n, e;
}
function Pl(e, t, n, r) {
  return e = Pe(22, e, r, t), e.elementType = Fa, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ao(e, t, n) {
  return e = Pe(6, e, null, t), e.lanes = n, e;
}
function uo(e, t, n) {
  return t = Pe(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function uf(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Wl(0), this.expirationTimes = Wl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Wl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Gi(e, t, n, r, l, o, s, a, u) {
  return e = new uf(e, t, n, a, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Pe(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Pi(o), e;
}
function cf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Kt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function Cc(e) {
  if (!e) return Nt;
  e = e._reactInternals;
  e: {
    if (Ht(e) !== e || e.tag !== 1) throw Error(E(170));
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
    throw Error(E(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (je(n)) return Cu(e, n, t);
  }
  return t;
}
function Ec(e, t, n, r, l, o, s, a, u) {
  return e = Gi(n, r, !0, e, l, o, s, a, u), e.context = Cc(null), n = e.current, r = he(), l = wt(n), o = et(r, l), o.callback = t ?? null, xt(n, o, l), e.current.lanes = l, dr(e, l, r), Ne(e, r), e;
}
function Ll(e, t, n, r) {
  var l = t.current, o = he(), s = wt(l);
  return n = Cc(n), t.context === null ? t.context = n : t.pendingContext = n, t = et(o, s), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = xt(l, t, s), e !== null && (Ue(e, l, s, o), Ur(e, l, s)), s;
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
function ca(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Xi(e, t) {
  ca(e, t), (e = e.alternate) && ca(e, t);
}
function df() {
  return null;
}
var zc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Zi(e) {
  this._internalRoot = e;
}
Ml.prototype.render = Zi.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(E(409));
  Ll(e, t, null, null);
};
Ml.prototype.unmount = Zi.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Bt(function() {
      Ll(null, e, null, null);
    }), t[nt] = null;
  }
};
function Ml(e) {
  this._internalRoot = e;
}
Ml.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = iu();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ct.length && t !== 0 && t < ct[n].priority; n++) ;
    ct.splice(n, 0, e), n === 0 && au(e);
  }
};
function Ji(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Rl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function da() {
}
function pf(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = yl(s);
        o.call(c);
      };
    }
    var s = Ec(t, r, e, 0, null, !1, !1, "", da);
    return e._reactRootContainer = s, e[nt] = s.current, tr(e.nodeType === 8 ? e.parentNode : e), Bt(), s;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var c = yl(u);
      a.call(c);
    };
  }
  var u = Gi(e, 0, !1, null, null, !1, !1, "", da);
  return e._reactRootContainer = u, e[nt] = u.current, tr(e.nodeType === 8 ? e.parentNode : e), Bt(function() {
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
  } else s = pf(n, t, e, l, r);
  return yl(s);
}
lu = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Mn(t.pendingLanes);
        n !== 0 && (vi(t, n | 1), Ne(t, J()), !(A & 6) && (xn = J() + 500, bt()));
      }
      break;
    case 13:
      Bt(function() {
        var r = rt(e, 1);
        if (r !== null) {
          var l = he();
          Ue(r, e, 1, l);
        }
      }), Xi(e, 1);
  }
};
xi = function(e) {
  if (e.tag === 13) {
    var t = rt(e, 134217728);
    if (t !== null) {
      var n = he();
      Ue(t, e, 134217728, n);
    }
    Xi(e, 134217728);
  }
};
ou = function(e) {
  if (e.tag === 13) {
    var t = wt(e), n = rt(e, t);
    if (n !== null) {
      var r = he();
      Ue(n, e, t, r);
    }
    Xi(e, t);
  }
};
iu = function() {
  return U;
};
su = function(e, t) {
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
            if (!l) throw Error(E(90));
            Oa(r), vo(r, l);
          }
        }
      }
      break;
    case "textarea":
      Aa(e, n);
      break;
    case "select":
      t = n.value, t != null && on(e, !!n.multiple, t, !1);
  }
};
Ka = Vi;
Ya = Bt;
var ff = { usingClientEntryPoint: !1, Events: [fr, Jt, bl, Va, Qa, Vi] }, Tn = { findFiberByHostInstance: Pt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, hf = { bundleType: Tn.bundleType, version: Tn.version, rendererPackageName: Tn.rendererPackageName, rendererConfig: Tn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ot.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Za(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Tn.findFiberByHostInstance || df, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Lr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Lr.isDisabled && Lr.supportsFiber) try {
    jl = Lr.inject(hf), Qe = Lr;
  } catch {
  }
}
Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ff;
Ee.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ji(t)) throw Error(E(200));
  return cf(e, t, null, n);
};
Ee.createRoot = function(e, t) {
  if (!Ji(e)) throw Error(E(299));
  var n = !1, r = "", l = zc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Gi(e, 1, !1, null, null, n, !1, r, l), e[nt] = t.current, tr(e.nodeType === 8 ? e.parentNode : e), new Zi(t);
};
Ee.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(E(188)) : (e = Object.keys(e).join(","), Error(E(268, e)));
  return e = Za(t), e = e === null ? null : e.stateNode, e;
};
Ee.flushSync = function(e) {
  return Bt(e);
};
Ee.hydrate = function(e, t, n) {
  if (!Rl(t)) throw Error(E(200));
  return Fl(null, e, t, !0, n);
};
Ee.hydrateRoot = function(e, t, n) {
  if (!Ji(e)) throw Error(E(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", s = zc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = Ec(t, null, e, 1, n ?? null, l, !1, o, s), e[nt] = t.current, tr(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Ml(t);
};
Ee.render = function(e, t, n) {
  if (!Rl(t)) throw Error(E(200));
  return Fl(null, e, t, !1, n);
};
Ee.unmountComponentAtNode = function(e) {
  if (!Rl(e)) throw Error(E(40));
  return e._reactRootContainer ? (Bt(function() {
    Fl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[nt] = null;
    });
  }), !0) : !1;
};
Ee.unstable_batchedUpdates = Vi;
Ee.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Rl(n)) throw Error(E(200));
  if (e == null || e._reactInternals === void 0) throw Error(E(38));
  return Fl(e, t, n, !1, r);
};
Ee.version = "18.3.1-next-f1338f8080-20240426";
function Tc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Tc);
    } catch (e) {
      console.error(e);
    }
}
Tc(), Ta.exports = Ee;
var mf = Ta.exports, $c, pa = mf;
$c = pa.createRoot, pa.hydrateRoot;
function T({ name: e, className: t }) {
  return /* @__PURE__ */ i.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("ha-icon", { icon: `mdi:${e}` }) });
}
const gf = '<defs><linearGradient id="hl-mark-g" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#FFB547"/><stop offset="1" stop-color="#FF5A1F"/></linearGradient></defs><polygon points="256,62 452,222 452,446 60,446 60,222" fill="url(#hl-mark-g)" stroke="url(#hl-mark-g)" stroke-width="56" stroke-linejoin="round"/><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" fill="#fff" transform="translate(256 292) scale(10) translate(-12 -12)"/>';
function fa({ size: e = 28 }) {
  return /* @__PURE__ */ i.jsx(
    "svg",
    {
      className: "logo-mark",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      "aria-hidden": "true",
      dangerouslySetInnerHTML: { __html: gf }
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
], Vn = { heat: "Heating", water: "Hot water" }, vf = 3, Pc = (e) => e && typeof e == "object" && e.error && typeof e.error == "object" ? e.error : e, xf = (e) => {
  var t;
  return ((t = Pc(e)) == null ? void 0 : t.code) === vf;
}, me = (e) => {
  const t = Pc(e);
  if (typeof t == "string") return t;
  if (typeof (t == null ? void 0 : t.message) == "string" && t.message) return t.message;
  if ((t == null ? void 0 : t.code) !== void 0) return `Error: ${t.code}`;
  try {
    return JSON.stringify(t);
  } catch {
    return String(t);
  }
};
function Lc(e, t, n) {
  const [r, l] = _.useState(!1), [o, s] = _.useState(null);
  return { busy: r, result: o, send: async (u, c) => {
    l(!0);
    try {
      await e().callWS({ entry_id: t, channel: n, ...u }), s({ kind: "ok", text: c });
    } catch (g) {
      s({ kind: "error", text: me(g) });
    } finally {
      l(!1);
    }
  } };
}
const yf = new Intl.DateTimeFormat(void 0, { weekday: "short" }), wf = new Intl.DateTimeFormat(void 0, { weekday: "short", day: "numeric", month: "short" }), kf = new Intl.DateTimeFormat(void 0, { hour: "2-digit", minute: "2-digit" });
function yn(e) {
  const t = typeof e == "string" ? new Date(e) : e;
  return Number.isNaN(t.getTime()) ? "" : `${((t.getTime() - Date.now()) / 864e5 < 6 ? yf : wf).format(t)} ${kf.format(t)}`;
}
const Rt = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, Mr = (e) => String(e).padStart(2, "0"), ha = (e) => `${e.getFullYear()}-${Mr(e.getMonth() + 1)}-${Mr(e.getDate())}T${Mr(e.getHours())}:${Mr(e.getMinutes())}`;
function jf({
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
    return f.setDate(f.getDate() + 7), f.setHours(14, 0, 0, 0), ha(f);
  }), [c, g] = _.useState(n), m = (r == null ? void 0 : r.boost_min_temp) ?? 5, h = (r == null ? void 0 : r.heat_max) ?? 32, v = (f) => Math.min(h, Math.max(m, Math.round(f * 2) / 2));
  _.useEffect(() => {
    const f = (d) => d.key === "Escape" && s();
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [s]);
  const w = new Date(a), k = !Number.isNaN(w.getTime()) && w.getTime() > Date.now() + 6e4, C = [e && `heating holds ${c.toFixed(1)}°`, t && "hot water is off"].filter(Boolean).join(" and ");
  return /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: (f) => {
    f.stopPropagation(), s();
  }, children: /* @__PURE__ */ i.jsxs("div", { className: "sheet heat", role: "dialog", "aria-modal": "true", "aria-label": "Away", onClick: (f) => f.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ i.jsx("h2", { children: "Away" }),
      /* @__PURE__ */ i.jsxs("span", { className: "muted", children: [
        "Until you're back, ",
        C,
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
          min: ha(/* @__PURE__ */ new Date()),
          onChange: (f) => u(f.target.value)
        }
      )
    ] }),
    e && /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Heating while away" }),
      /* @__PURE__ */ i.jsxs("div", { className: "sheet-temp", children: [
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => g(v(c - 0.5)), "aria-label": "Lower", children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
        /* @__PURE__ */ i.jsxs("span", { className: "sheet-temp-value", children: [
          c.toFixed(1),
          "°"
        ] }),
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => g(v(c + 0.5)), "aria-label": "Raise", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("button", { className: "sheet-go", disabled: l || !k, onClick: () => o(w, c), children: k ? `Away until ${yn(w)}` : "Pick a time in the future" }),
    /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: s, children: "Cancel" })
  ] }) });
}
const Nf = [30, 60, 120, 180];
function Sf({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onOpenDevice: l,
  onOpenRoom: o
}) {
  const [s, a] = _.useState([]), [u, c] = _.useState("all");
  _.useEffect(() => {
    const v = e().connection.subscribeMessage((w) => a(w.rooms), {
      type: "hive_local/rooms/subscribe"
    });
    return () => {
      v.then((w) => w()).catch(() => {
      });
    };
  }, [e]);
  const g = t.flatMap((v) => v.channels.map((w) => {
    var k, C;
    return { d: v, c: w, s: ((C = (k = n[v.entry_id]) == null ? void 0 : k[w]) == null ? void 0 : C.status) ?? null };
  })), m = t.length > 1, h = [
    { id: "all", label: "All", icon: "" },
    { id: "heat", label: "Heating", icon: "radiator" },
    ...g.some(({ c: v }) => v === "water") ? [{ id: "water", label: "Hot water", icon: "water-boiler" }] : [],
    ...s.length ? [{ id: "rooms", label: "Rooms", icon: "home-thermometer-outline" }] : []
  ];
  return /* @__PURE__ */ i.jsx("div", { className: "home", children: t.length > 0 && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: "home-section", children: "Quick actions" }),
    /* @__PURE__ */ i.jsx(_f, { getHass: e, devices: t, status: n, limits: r }),
    /* @__PURE__ */ i.jsx("h3", { className: "home-section", children: "Your devices" }),
    h.length > 2 && /* @__PURE__ */ i.jsx("div", { className: "pills", role: "tablist", "aria-label": "Show", children: h.map((v) => /* @__PURE__ */ i.jsxs("button", { role: "tab", "aria-selected": u === v.id, className: `pill ${u === v.id ? "on" : ""}`, onClick: () => c(v.id), children: [
      v.icon && /* @__PURE__ */ i.jsx(T, { name: v.icon }),
      " ",
      v.label
    ] }, v.id)) }),
    /* @__PURE__ */ i.jsxs("div", { className: "device-grid", children: [
      g.filter(({ c: v }) => u === "all" || u === v).map(({ d: v, c: w }) => {
        var k;
        return /* @__PURE__ */ i.jsx(
          Mc,
          {
            getHass: e,
            device: v,
            channel: w,
            info: (k = n[v.entry_id]) == null ? void 0 : k[w],
            showDevice: m,
            limits: r,
            onOpen: () => l(v.entry_id, w)
          },
          `${v.entry_id}-${w}`
        );
      }),
      (u === "all" || u === "rooms") && s.map((v) => /* @__PURE__ */ i.jsx(bf, { room: v, showReceiver: m, onOpen: () => o(v.id) }, v.id))
    ] })
  ] }) });
}
function _f({ getHass: e, devices: t, status: n, limits: r }) {
  var f, d, p, y;
  const [l, o] = _.useState(null), [s, a] = _.useState(null), [u, c] = _.useState(!1), g = t.length > 1, m = async (x, S, b) => {
    o(x);
    try {
      for (const j of S) await e().callWS(j);
      return a({ ok: !0, text: b }), !0;
    } catch (j) {
      return a({ ok: !1, text: me(j) }), !1;
    } finally {
      o(null);
    }
  }, h = [], v = t.flatMap((x) => x.channels.map((S) => {
    var b;
    return { d: x, c: S, info: (b = n[x.entry_id]) == null ? void 0 : b[S] };
  })), w = v.map(({ info: x }) => x == null ? void 0 : x.holiday).find((x) => x), k = (f = v.find(({ c: x }) => x === "heat")) == null ? void 0 : f.info;
  w ? h.push({
    id: "holiday-end",
    label: `End holiday · away until ${yn(w.until)}`,
    icon: "home-import-outline",
    kind: "neutral",
    msgs: [{ type: "hive_local/holiday/cancel" }],
    done: "Welcome back: everything's back to what it was doing"
  }) : h.push({ id: "holiday", label: "Away until…", icon: "bag-suitcase", kind: "neutral", msgs: [], done: "", open: () => c(!0) });
  for (const x of t)
    for (const S of x.channels) {
      const b = (d = n[x.entry_id]) == null ? void 0 : d[S];
      if (((p = b == null ? void 0 : b.status) == null ? void 0 : p.mode) === "boost" && !((y = b == null ? void 0 : b.holiday) != null && y.holding)) continue;
      const j = Rt((b == null ? void 0 : b.boost_minutes) ?? 30), N = S === "water" ? "hot water" : "heating";
      h.push({
        id: `boost-${x.entry_id}-${S}`,
        label: `Boost ${N} · ${j}${g ? ` (${x.name})` : ""}`,
        icon: "rocket-launch",
        kind: S,
        msgs: [{ type: "hive_local/boost", entry_id: x.entry_id, channel: S }],
        done: `Boosting ${N} for ${j}`
      });
    }
  const C = t.flatMap(
    (x) => (
      // Channels on holiday are left to "End holiday".
      x.channels.filter((S) => {
        var j, N, $, O, R;
        const b = ($ = (N = (j = n[x.entry_id]) == null ? void 0 : j[S]) == null ? void 0 : N.status) == null ? void 0 : $.mode;
        return b && b !== "schedule" && !((R = (O = n[x.entry_id]) == null ? void 0 : O[S]) != null && R.holiday);
      }).map((S) => ({ d: x, c: S }))
    )
  );
  return C.length && h.push({
    id: "schedule",
    label: "Everything back to schedule",
    icon: "calendar-clock",
    kind: "neutral",
    msgs: C.map(
      ({ d: x, c: S }) => {
        var b, j, N;
        return ((N = (j = (b = n[x.entry_id]) == null ? void 0 : b[S]) == null ? void 0 : j.status) == null ? void 0 : N.mode) === "boost" ? { type: "hive_local/cancel_boost", entry_id: x.entry_id, channel: S } : { type: "hive_local/mode", entry_id: x.entry_id, channel: S, mode: "schedule" };
      }
    ),
    done: "Back on the schedule"
  }), /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx("div", { className: "quick", children: h.map((x) => /* @__PURE__ */ i.jsxs("button", { className: `quick-action ${x.kind}`, disabled: l != null, onClick: () => x.open ? x.open() : m(x.id, x.msgs, x.done), children: [
      /* @__PURE__ */ i.jsx("span", { className: "quick-icon", children: /* @__PURE__ */ i.jsx(T, { name: l === x.id ? "timer-sand" : x.icon }) }),
      /* @__PURE__ */ i.jsx("span", { className: "quick-label", children: x.label })
    ] }, x.id)) }),
    s && /* @__PURE__ */ i.jsx("div", { className: `status ${s.ok ? "ok" : "error"}`, children: s.text }),
    u && /* @__PURE__ */ i.jsx(
      jf,
      {
        hasHeat: v.some(({ c: x }) => x === "heat"),
        hasWater: v.some(({ c: x }) => x === "water"),
        frost: (k == null ? void 0 : k.frost_temperature) ?? 12,
        limits: r,
        busy: l != null,
        onGo: (x, S) => m("holiday", [{ type: "hive_local/holiday/set", until: x.toISOString(), temperature: S }], `Away until ${yn(x)}`).then(
          (b) => b && c(!1)
        ),
        onClose: () => c(!1)
      }
    )
  ] });
}
function bf({ room: e, showReceiver: t, onOpen: n }) {
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
function Mc({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  showDevice: l,
  limits: o,
  onOpen: s,
  page: a = !1
}) {
  var Et, es, ts, ns, rs;
  const u = n === "water", c = (r == null ? void 0 : r.status) ?? null, { busy: g, result: m, send: h } = Lc(e, t.entry_id, n), v = !!c && c.mode !== "off" && c.heating, w = !c || c.mode === "off" ? "off" : v ? "heating" : "idle", k = !u && (c == null ? void 0 : c.setpoint) != null && c.setpoint <= 1, C = u || (c == null ? void 0 : c.setpoint) == null ? null : k ? (r == null ? void 0 : r.frost_temperature) ?? null : c.setpoint, f = [
    { id: "schedule", label: "Schedule" },
    { id: "manual", label: u ? "Always on" : "Manual" },
    { id: "off", label: "Off" }
  ], d = (r == null ? void 0 : r.boost_minutes) ?? 30, p = (r == null ? void 0 : r.boost_temperature) ?? 21, [y, x] = _.useState(!1), S = (o == null ? void 0 : o.boost_min_temp) ?? 5, b = (o == null ? void 0 : o.heat_max) ?? 32, j = (B) => Math.min(b, Math.max(S, Math.round(B * 2) / 2)), N = [.../* @__PURE__ */ new Set([...Nf, d])].filter((B) => B <= ((o == null ? void 0 : o.boost_max_minutes) ?? 360)).sort((B, mr) => B - mr), [$, O] = _.useState(null), R = _.useRef();
  _.useEffect(() => () => window.clearTimeout(R.current), []), _.useEffect(() => O(null), [c == null ? void 0 : c.setpoint, c == null ? void 0 : c.mode]);
  const q = !u && !!c && c.mode !== "off", xe = (B) => {
    const Dl = j(($ ?? C ?? 20) + B);
    O(Dl), window.clearTimeout(R.current), R.current = window.setTimeout(() => {
      h({ type: "hive_local/target", temperature: Dl }, `Set to ${Dl}°`).then(
        () => window.setTimeout(() => O(null), 8e3)
      );
    }, 1200);
  }, Ct = $ ?? C, it = (B, mr) => h({ type: "hive_local/boost", minutes: B, ...u ? {} : { temperature: mr } }, `Boosting for ${Rt(B)}`).then(
    () => x(!1)
  ), Ye = !!((Et = r == null ? void 0 : r.holiday) != null && Et.holding), P = c ? Ye ? "Away at" : c.mode === "boost" ? "Boost to" : k && $ == null ? "Frost" : c.mode === "manual" ? "Hold at" : "Target" : "", F = (c == null ? void 0 : c.mode) === "boost" && !Ye, z = F ? ((es = r == null ? void 0 : r.preheat) == null ? void 0 : es.active_for) ?? null : null, M = z != null;
  let D = "Waiting for the receiver…";
  c && (c.mode === "off" ? D = "Off" : F ? D = u ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
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
  ] }) : u ? D = v ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Heating water ",
    /* @__PURE__ */ i.jsx(T, { name: "water", className: "status-icon" })
  ] }) : "Not heating now" : v ? D = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Heating to ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      C,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx(T, { name: "fire", className: "status-icon" })
  ] }) : k ? D = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Frost protection ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      C,
      "°"
    ] })
  ] }) : D = C != null ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Target ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      C,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx(T, { name: "check-circle-outline", className: "status-icon done" })
  ] }) : "Idle"), c && M && (D = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Pre-heating to ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      c.setpoint,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx(T, { name: "sun-clock", className: "status-icon" })
  ] }));
  const K = (r == null ? void 0 : r.holiday) ?? null, te = K ? `Away until ${yn(K.until)}` : null;
  c && K && !F && !v && (D = u ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Off while away ",
    /* @__PURE__ */ i.jsx(T, { name: "bag-suitcase", className: "status-icon away" })
  ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Away ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      c.setpoint,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx(T, { name: "bag-suitcase", className: "status-icon away" })
  ] }));
  const Vt = c ? te && !F ? te : M ? `Pre-heating for ${(ts = r == null ? void 0 : r.preheat) == null ? void 0 : ts.active_for}` : c.mode === "boost" ? c.boost_remaining != null ? `Boost · ${Rt(c.boost_remaining)} left` : "Boost" : c.mode === "schedule" ? "On schedule" : (ns = f.find((B) => B.id === c.mode)) == null ? void 0 : ns.label : "", Ge = a;
  return /* @__PURE__ */ i.jsxs("section", { className: `card device ${n} ${w} ${a ? "page" : ""}`, children: [
    /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "device-head",
        ...a ? {} : { role: "button", tabIndex: 0, onClick: s, onKeyDown: (B) => B.key === "Enter" && B.target === B.currentTarget && (s == null ? void 0 : s()) },
        children: [
          /* @__PURE__ */ i.jsxs("div", { className: "device-row", children: [
            /* @__PURE__ */ i.jsx("span", { className: `device-icon ${n}`, children: /* @__PURE__ */ i.jsx(T, { name: u ? "water-boiler" : "radiator" }) }),
            /* @__PURE__ */ i.jsxs("div", { className: "device-name", children: [
              /* @__PURE__ */ i.jsx("span", { children: Vn[n] }),
              /* @__PURE__ */ i.jsx("span", { className: "muted small", children: l ? `${t.name} · ${Vt}` : Vt })
            ] }),
            /* @__PURE__ */ i.jsx("span", { className: "device-status", children: D })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "device-row", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "device-big", children: [
              u ? c ? c.mode === "off" ? "Off" : v ? "On" : "Idle" : "–" : (c == null ? void 0 : c.current_temperature) != null ? c.current_temperature.toFixed(1) : "–",
              !u && /* @__PURE__ */ i.jsx("span", { children: "°" }),
              /* @__PURE__ */ i.jsx("small", { children: u ? "Now" : "Actual" })
            ] }),
            /* @__PURE__ */ i.jsxs(
              "button",
              {
                className: `device-action ${F ? "boosting" : ""}`,
                disabled: g || !c,
                onClick: (B) => {
                  B.stopPropagation(), x(!0);
                },
                children: [
                  /* @__PURE__ */ i.jsx(T, { name: M ? "sun-clock" : "rocket-launch" }),
                  " ",
                  M ? "Pre-heating" : F ? "Boosting" : "Boost"
                ]
              }
            )
          ] })
        ]
      }
    ),
    Ge && /* @__PURE__ */ i.jsxs("div", { className: "device-body", children: [
      !u && /* @__PURE__ */ i.jsxs("div", { className: "target-row", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "target-text", children: [
          /* @__PURE__ */ i.jsx("span", { className: "target-label", children: P || "Target" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: c ? Ye && K ? `While you're away, until ${yn(K.until)}` : c.mode === "off" ? "Turn the heating on to set a target" : c.mode === "schedule" ? "Until the next scheduled change" : c.mode === "boost" ? "Keeps the boost time left" : "Held until you change it" : "" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "target-control", children: [
          /* @__PURE__ */ i.jsx("button", { className: "round target-btn", disabled: !q, onClick: () => xe(-0.5), "aria-label": "Lower the target", children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
          /* @__PURE__ */ i.jsx("span", { className: `target-value ${$ != null ? "pending" : ""}`, children: Ct != null && (c == null ? void 0 : c.mode) !== "off" ? `${Ct.toFixed(1)}°` : "–" }),
          /* @__PURE__ */ i.jsx("button", { className: "round target-btn", disabled: !q, onClick: () => xe(0.5), "aria-label": "Raise the target", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
        ] })
      ] }),
      K && /* @__PURE__ */ i.jsxs("div", { className: "holiday-row", children: [
        /* @__PURE__ */ i.jsx(T, { name: "bag-suitcase" }),
        /* @__PURE__ */ i.jsxs("span", { className: "holiday-text", children: [
          te,
          ", then back to ",
          K.restore_mode === "schedule" ? "the schedule" : (rs = f.find((B) => B.id === K.restore_mode)) == null ? void 0 : rs.label.toLowerCase()
        ] }),
        /* @__PURE__ */ i.jsx("button", { className: "ghost", disabled: g, onClick: () => h({ type: "hive_local/holiday/cancel" }, "Holiday ended"), children: "End" })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "segmented full", children: f.map((B) => /* @__PURE__ */ i.jsx(
        "button",
        {
          className: (c == null ? void 0 : c.mode) === B.id ? "on" : "",
          disabled: g || !c,
          onClick: () => h({ type: "hive_local/mode", mode: B.id }, B.id === "schedule" ? "Following the schedule" : B.label),
          children: B.label
        },
        B.id
      )) })
    ] }),
    (m == null ? void 0 : m.kind) === "error" && /* @__PURE__ */ i.jsx("div", { className: "status error", children: m.text }),
    y && /* @__PURE__ */ i.jsx(
      Cf,
      {
        title: M ? "Pre-heating" : F ? "Boosting" : "Boost",
        subtitle: l ? `${t.name} · ${Vn[n]}` : Vn[n],
        water: u,
        boosting: F,
        preheatFor: z,
        remaining: (c == null ? void 0 : c.boost_remaining) ?? null,
        boostTarget: F ? (c == null ? void 0 : c.setpoint) ?? null : null,
        defaultMinutes: d,
        defaultTemp: p,
        durations: N,
        clampTemp: j,
        busy: g,
        onBoost: it,
        onStop: () => h({ type: "hive_local/cancel_boost" }, "Boost cancelled").then(() => x(!1)),
        onClose: () => x(!1)
      }
    )
  ] });
}
function Cf({
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
  clampTemp: g,
  busy: m,
  onBoost: h,
  onStop: v,
  onClose: w
}) {
  const [k, C] = _.useState(a), [f, d] = _.useState(u);
  return _.useEffect(() => {
    const p = (y) => y.key === "Escape" && w();
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
      /* @__PURE__ */ i.jsx(T, { name: "clock-outline" }),
      /* @__PURE__ */ i.jsx("span", { children: l ? `Warming up${s != null ? ` to ${s}°` : ""} for ${l}, when your schedule changes` : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        o != null ? `${Rt(o)} left` : "Boosting",
        !n && s != null ? ` · to ${s}°` : ""
      ] }) })
    ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      !n && /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
        /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Temperature" }),
        /* @__PURE__ */ i.jsxs("div", { className: "sheet-temp", children: [
          /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => d(g(f - 0.5)), "aria-label": "Lower", children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
          /* @__PURE__ */ i.jsxs("span", { className: "sheet-temp-value", children: [
            f.toFixed(1),
            "°"
          ] }),
          /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => d(g(f + 0.5)), "aria-label": "Raise", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
        /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "How long" }),
        /* @__PURE__ */ i.jsx("div", { className: "sheet-lengths", role: "radiogroup", "aria-label": "How long", children: c.map((p) => /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": p === k, className: p === k ? "on" : "", onClick: () => C(p), children: Rt(p) }, p)) })
      ] })
    ] }),
    r ? /* @__PURE__ */ i.jsxs("button", { className: "sheet-go stop", disabled: m, onClick: v, children: [
      /* @__PURE__ */ i.jsx("span", { className: "stop-square" }),
      " ",
      l ? "Stop pre-heating" : "Stop boost"
    ] }) : /* @__PURE__ */ i.jsx("button", { className: "sheet-go", disabled: m, onClick: () => h(k, f), children: n ? `Boost hot water for ${Rt(k)}` : `Boost to ${f.toFixed(1)}° for ${Rt(k)}` }),
    /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: w, children: "Cancel" })
  ] }) });
}
const Ef = [60, 90, 120, 180];
function zf({ getHass: e, device: t, info: n }) {
  const { busy: r, result: l, send: o } = Lc(e, t.entry_id, "heat"), s = [.../* @__PURE__ */ new Set([...Ef, n.max_lead])].sort((u, c) => u - c);
  let a;
  return n.enabled ? n.active_for ? a = `Pre-heating now, for ${n.active_for}.` : n.rate == null ? a = `Still learning how fast your home warms up (${n.warmups} of ${n.warmups_needed} warm-ups seen).` : n.schedule_known ? n.next ? a = `Next: starts ${n.next.start} to reach ${n.next.setpoint}° by ${n.next.at}.` : a = "Nothing to pre-heat for yet." : a = "Reading the heating schedule…" : a = "Start heating early, so it's warm by the time the schedule says.", /* @__PURE__ */ i.jsxs("section", { className: "card preheat", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "target-row", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "device-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "sun-clock" }) }),
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
const Tf = ["monday", "tuesday", "wednesday", "thursday", "friday"], $f = ["saturday", "sunday"], $n = (e) => e[0].toUpperCase() + e.slice(1, 3), Yr = (e) => {
  const [t, n] = e.split(":").map(Number);
  return t * 60 + n;
};
function Pf({
  getHass: e,
  device: t,
  channel: n,
  limits: r,
  mode: l,
  preheatFor: o
}) {
  var F;
  const [s, a] = _.useState({}), [u, c] = _.useState({}), [g, m] = _.useState("monday"), [h, v] = _.useState({ kind: "idle" }), w = t.entry_id, k = n === "water", C = JSON.stringify(s) !== JSON.stringify(u), f = _.useCallback(async () => {
    v({ kind: "busy", text: "Reading from receiver…" });
    try {
      const z = await e().callWS({
        type: "hive_local/get",
        entry_id: w,
        channel: n
      });
      a(z.schedule), c(z.schedule);
      const M = Object.keys(z.schedule).length;
      v(
        z.complete ? { kind: "ok", text: "Schedule read from receiver" } : M ? { kind: "error", text: `Only got ${M}/7 days — try reading again` } : { kind: "error", text: "No reply. On Zigbee2MQTT, check the receiver's friendly name; on ZHA, check the receiver is online." }
      );
    } catch (z) {
      v({ kind: "error", text: me(z) });
    }
  }, [w, n, e]);
  _.useEffect(() => {
    f();
  }, [f]), _.useEffect(() => {
    if (h.kind !== "ok") return;
    const z = setTimeout(() => v({ kind: "idle" }), 4e3);
    return () => clearTimeout(z);
  }, [h]);
  const d = async () => {
    const z = Object.fromEntries(
      zt.filter((M) => {
        var D;
        return JSON.stringify(s[M]) !== JSON.stringify(u[M]) && ((D = s[M]) == null ? void 0 : D.length);
      }).map((M) => [M, s[M]])
    );
    if (Object.keys(z).length) {
      v({ kind: "busy", text: "Writing to receiver…" });
      try {
        const M = await e().callWS({
          type: "hive_local/set",
          entry_id: w,
          channel: n,
          schedule: z
        }), D = { ...s, ...M.schedule };
        a(D), c(D);
        const K = Object.keys(M.schedule).map((te) => te[0].toUpperCase() + te.slice(1, 3));
        v({
          kind: "ok",
          text: `Wrote ${K.join(", ")}. Read back to confirm the receiver kept it.`
        });
      } catch (M) {
        v({ kind: "error", text: me(M) });
      }
    }
  }, p = s[g] ?? [], y = r.max_transitions, x = (z) => a((M) => ({ ...M, [g]: [...z].sort((D, K) => Yr(D.time) - Yr(K.time)) })), S = () => {
    const z = p[p.length - 1], M = z ? Lf(p, Yr(z.time) + 60) : "06:00", D = k ? r.water_on : (z == null ? void 0 : z.setpoint) ?? 20;
    x([...p, { time: M, setpoint: D }]);
  }, b = (z) => a((M) => {
    const D = { ...M };
    for (const K of z) D[K] = p.map((te) => ({ ...te }));
    return D;
  }), j = _.useMemo(() => {
    const z = Object.values(s).flat().map((M) => M.setpoint).filter((M) => M > r.heat_min);
    return { lo: Math.min(15, ...z), hi: Math.max(24, ...z) };
  }, [s, r.heat_min]), N = zt[((/* @__PURE__ */ new Date()).getDay() + 6) % 7], [$, O] = _.useState(null), [R, q] = _.useState(!1), xe = zt.filter((z) => JSON.stringify(s[z]) !== JSON.stringify(u[z])), Ct = zt[(zt.indexOf(g) + 1) % 7], it = (F = (s[Ct] ?? [])[0]) == null ? void 0 : F.time, Ye = (z) => k ? z.setpoint < r.water_on : z.setpoint <= r.heat_min;
  let P = "Stored on the receiver, so it keeps running without Home Assistant.";
  return l === "schedule" ? P = "Your schedule is running." : l === "manual" ? P = `Your schedule isn't being used: ${k ? "hot water is always on" : "heating is on Manual"}.` : l === "off" ? P = `Your schedule isn't being used: ${k ? "hot water" : "heating"} is off.` : l === "boost" && o ? P = `Your schedule is running, starting early so it's warm by ${o}.` : l === "boost" && (P = "Boosting now. Your schedule carries on after the boost."), /* @__PURE__ */ i.jsxs("div", { className: "sched", children: [
    /* @__PURE__ */ i.jsx("p", { className: "sched-status muted", children: P }),
    /* @__PURE__ */ i.jsx("div", { className: "sched-days", role: "tablist", "aria-label": "Day", children: zt.map((z) => /* @__PURE__ */ i.jsxs(
      "button",
      {
        role: "tab",
        "aria-selected": z === g,
        "aria-label": z,
        className: `sched-day ${z === g ? "on" : ""} ${z === N ? "today" : ""}`,
        onClick: () => {
          m(z), O(null);
        },
        children: [
          z[0].toUpperCase(),
          xe.includes(z) && /* @__PURE__ */ i.jsx("i", { className: "sched-dot", "aria-label": "changed" })
        ]
      },
      z
    )) }),
    h.text && h.kind !== "idle" && /* @__PURE__ */ i.jsx("div", { className: `status ${h.kind}`, children: h.text }),
    /* @__PURE__ */ i.jsxs("div", { className: "sched-list", children: [
      p.length === 0 && /* @__PURE__ */ i.jsxs("p", { className: "muted sched-empty", children: [
        "Nothing scheduled on ",
        g[0].toUpperCase() + g.slice(1),
        " yet."
      ] }),
      p.map((z, M) => {
        var te;
        const D = ((te = p[M + 1]) == null ? void 0 : te.time) ?? (it ? `${it} (${$n(Ct)})` : "00:00"), K = Ye(z);
        return /* @__PURE__ */ i.jsxs("button", { className: "slot", onClick: () => O(M), children: [
          /* @__PURE__ */ i.jsx(
            "span",
            {
              className: `slot-badge ${K ? "off" : ""}`,
              style: K ? void 0 : { borderColor: k ? "var(--hl-brand)" : Mf(z.setpoint, j, r) },
              children: K ? /* @__PURE__ */ i.jsx(T, { name: k ? "power" : "snowflake" }) : k ? "On" : `${z.setpoint}°`
            }
          ),
          /* @__PURE__ */ i.jsxs("span", { className: "slot-time", children: [
            z.time,
            " – ",
            D
          ] }),
          /* @__PURE__ */ i.jsx(T, { name: "chevron-right", className: "slot-chev" })
        ] }, M);
      }),
      /* @__PURE__ */ i.jsxs("button", { className: "slot slot-add", onClick: () => {
        S(), O(p.length);
      }, disabled: p.length >= y, children: [
        /* @__PURE__ */ i.jsx("span", { className: "slot-badge add", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) }),
        /* @__PURE__ */ i.jsx("span", { className: "slot-time", children: p.length >= y ? `${y} times a day at most` : "Add a time" })
      ] })
    ] }),
    C && /* @__PURE__ */ i.jsxs("div", { className: "sched-save", children: [
      /* @__PURE__ */ i.jsx(T, { name: "pencil-outline", className: "sched-save-icon" }),
      /* @__PURE__ */ i.jsx("span", { className: "sched-changed", title: `Changed: ${xe.map($n).join(", ")}`, children: "Unsaved changes" }),
      /* @__PURE__ */ i.jsx("button", { className: "sched-undo", onClick: () => {
        a(u), O(null);
      }, children: "Undo" }),
      /* @__PURE__ */ i.jsx("button", { className: "sched-write", onClick: d, disabled: h.kind === "busy", children: "Save" })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: `fab-wrap ${C ? "raised" : ""}`, children: [
      R && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx("div", { className: "fab-backdrop", onClick: () => q(!1) }),
        /* @__PURE__ */ i.jsxs("div", { className: "fab-menu", role: "menu", children: [
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            q(!1), f();
          }, disabled: h.kind === "busy", children: [
            /* @__PURE__ */ i.jsx(T, { name: "download" }),
            " Read from the receiver"
          ] }),
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            q(!1), b(Tf);
          }, disabled: !p.length, children: [
            /* @__PURE__ */ i.jsx(T, { name: "content-copy" }),
            " Copy ",
            $n(g),
            " to weekdays"
          ] }),
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            q(!1), b($f);
          }, disabled: !p.length, children: [
            /* @__PURE__ */ i.jsx(T, { name: "content-copy" }),
            " Copy ",
            $n(g),
            " to the weekend"
          ] }),
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            q(!1), b([...zt]);
          }, disabled: !p.length, children: [
            /* @__PURE__ */ i.jsx(T, { name: "content-copy" }),
            " Copy ",
            $n(g),
            " to every day"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("button", { className: "fab", "aria-label": "More", "aria-expanded": R, onClick: () => q(!R), children: /* @__PURE__ */ i.jsx(T, { name: R ? "close" : "dots-horizontal" }) })
    ] }),
    $ != null && p[$] && /* @__PURE__ */ i.jsx(
      Rf,
      {
        slot: p[$],
        dayName: g[0].toUpperCase() + g.slice(1),
        isWater: k,
        limits: r,
        canDelete: !0,
        onChange: (z) => x(p.map((M, D) => D === $ ? z : M)),
        onDelete: () => {
          x(p.filter((z, M) => M !== $)), O(null);
        },
        onClose: () => O(null)
      }
    )
  ] });
}
function Lf(e, t) {
  const n = new Set(e.map((l) => Yr(l.time)));
  let r = Math.min(t, 23 * 60 + 30);
  for (; n.has(r) && r < 1439; ) r += 15;
  return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function Mf(e, t, n) {
  if (e <= n.heat_min) return "var(--hl-off-fill)";
  const r = Math.min(1, Math.max(0, (e - t.lo) / Math.max(1, t.hi - t.lo)));
  return `hsl(${Math.round(42 - 34 * r)} ${Math.round(88 + 4 * r)}% ${Math.round(64 - 14 * r)}%)`;
}
function Rf({
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
    const m = (h) => h.key === "Escape" && a();
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [a]);
  const u = n ? e.setpoint < r.water_on : e.setpoint <= r.heat_min, c = (m) => Math.min(r.heat_max, Math.max(5, Math.round(m * 2) / 2)), g = u ? 20 : e.setpoint;
  return /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: a, children: /* @__PURE__ */ i.jsxs("div", { className: "sheet heat", role: "dialog", "aria-modal": "true", "aria-label": `Edit ${t} at ${e.time}`, onClick: (m) => m.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ i.jsx("h2", { children: e.time }),
      /* @__PURE__ */ i.jsx("span", { className: "muted", children: t })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Starts at" }),
      /* @__PURE__ */ i.jsx("input", { className: "sheet-time", type: "time", value: e.time, onChange: (m) => m.target.value && o({ ...e, time: m.target.value }) })
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
    /* @__PURE__ */ i.jsx("button", { className: "sheet-go", onClick: a, children: "Done" }),
    l && /* @__PURE__ */ i.jsxs("button", { className: "ghost sheet-cancel danger-text", onClick: s, children: [
      /* @__PURE__ */ i.jsx(T, { name: "delete-outline" }),
      " Remove this time"
    ] })
  ] }) });
}
const ma = [
  { id: 1, label: "D", name: "Day" },
  { id: 7, label: "W", name: "Week" },
  { id: 30, label: "M", name: "Month" }
], Ff = 5 * 6e4, Gr = (e) => {
  const t = Math.round(e);
  return t < 60 ? `${t}m` : t % 60 ? `${Math.floor(t / 60)}h ${t % 60}m` : `${t / 60}h`;
}, qi = (e, t, n = 2) => {
  try {
    return e.toLocaleString([], { style: "currency", currency: t, maximumFractionDigits: n, minimumFractionDigits: 2 });
  } catch {
    return `${e.toFixed(n)} ${t}`;
  }
}, ri = (e, t) => qi(e, t, 4), li = (e, t) => new Date(e * 1e3).toLocaleDateString([], t), Df = (e) => new Date(e * 1e3).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
function Of(e, t, n) {
  if (n === 1) return li(e, { weekday: "short", day: "numeric", month: "short" });
  const r = t - 86400, l = new Date(e * 1e3), o = new Date(r * 1e3), s = (a) => a.toLocaleDateString([], { month: "short" });
  return l.getMonth() === o.getMonth() ? `${l.getDate()}–${o.getDate()} ${s(o)}` : `${l.getDate()} ${s(l)} – ${o.getDate()} ${s(o)}`;
}
const ga = (e) => e.filter((t) => t != null);
function If(e) {
  if (e.period === 1) {
    const t = [];
    for (let n = 0; n < e.series.length; n += 4) {
      const r = e.series.slice(n, n + 4).filter((s) => s.heating != null);
      if (!r.length) continue;
      const l = ga(r.map((s) => s.current)), o = ga(e.series.slice(n, n + 4).map((s) => s.outdoor));
      t.push({
        key: e.series[n].t,
        label: [Df(e.series[n].t), ""],
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
function Rc({ getHass: e, devices: t, channel: n }) {
  var O;
  const [r, l] = _.useState((O = t[0]) == null ? void 0 : O.entry_id), o = t.find((R) => R.entry_id === r) ?? t[0], s = n ?? "heat", [a, u] = _.useState(7), [c, g] = _.useState("time"), [m, h] = _.useState(0), [v, w] = _.useState(null), [k, C] = _.useState(""), [f, d] = _.useState(!0), p = s === "water", y = _.useCallback(() => {
    o && e().callWS({ type: "hive_local/stats", entry_id: o.entry_id, channel: s, days: a, offset: m }).then((R) => {
      w(R), C("");
    }).catch((R) => {
      xf(R) || C(me(R));
    }).finally(() => d(!1));
  }, [e, o, s, a, m]);
  if (_.useEffect(() => {
    var q;
    const R = e().connection;
    return (q = R.addEventListener) == null || q.call(R, "ready", y), () => {
      var xe;
      return (xe = R.removeEventListener) == null ? void 0 : xe.call(R, "ready", y);
    };
  }, [e, y]), _.useEffect(() => {
    if (d(!0), y(), m) return;
    const R = setInterval(y, Ff);
    return () => clearInterval(R);
  }, [y, m]), !o) return null;
  const x = v && v.period === a && v.offset === m ? v : null, S = x ? If(x) : [], b = a === 1 ? "hour" : "day", j = !p && !!(x != null && x.outdoor), N = p ? null : (x == null ? void 0 : x.cost) ?? null, $ = p || c === "cost" && !N && x ? "time" : c;
  return /* @__PURE__ */ i.jsxs("div", { className: "history", children: [
    !n && /* @__PURE__ */ i.jsx("h2", { className: "history-title", children: "Heating history" }),
    !n && t.length > 1 && /* @__PURE__ */ i.jsx("div", { className: "history-tabs", role: "tablist", children: t.map((R) => /* @__PURE__ */ i.jsx("button", { role: "tab", "aria-selected": R.entry_id === o.entry_id, className: R.entry_id === o.entry_id ? "on" : "", onClick: () => {
      l(R.entry_id), h(0);
    }, children: R.name }, R.entry_id)) }),
    /* @__PURE__ */ i.jsxs("div", { className: "history-controls", children: [
      /* @__PURE__ */ i.jsx("div", { className: "history-toggle", role: "radiogroup", "aria-label": "Period", children: ma.map((R) => /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": R.id === a, "aria-label": R.name, title: R.name, className: R.id === a ? "on" : "", onClick: () => {
        u(R.id), h(0);
      }, children: R.label }, R.id)) }),
      !p && /* @__PURE__ */ i.jsxs("div", { className: "history-toggle", role: "radiogroup", "aria-label": "Show", children: [
        /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": $ === "time", title: "Time on", "aria-label": "Time on", className: `wide ${$ === "time" ? "on" : ""}`, onClick: () => g("time"), children: /* @__PURE__ */ i.jsx(T, { name: "clock-outline" }) }),
        /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": $ === "temp", title: "Temperature", "aria-label": "Temperature", className: `wide ${$ === "temp" ? "on" : ""}`, onClick: () => g("temp"), children: /* @__PURE__ */ i.jsx(T, { name: "thermometer" }) }),
        (N || c === "cost") && /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": $ === "cost", title: "Estimated cost", "aria-label": "Estimated cost", className: `wide ${$ === "cost" ? "on" : ""}`, onClick: () => g("cost"), children: /* @__PURE__ */ i.jsx(T, { name: "cash" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "history-date", children: [
      /* @__PURE__ */ i.jsx("button", { className: "round ghost", onClick: () => h(m + 1), "aria-label": "Earlier", children: /* @__PURE__ */ i.jsx(T, { name: "chevron-left" }) }),
      /* @__PURE__ */ i.jsxs("span", { className: "history-range", children: [
        /* @__PURE__ */ i.jsx(T, { name: "calendar-blank-outline" }),
        " ",
        x ? Of(x.start, x.period_end, a) : "…"
      ] }),
      /* @__PURE__ */ i.jsx("button", { className: "round ghost", onClick: () => h(Math.max(0, m - 1)), disabled: m === 0, "aria-label": "Later", children: /* @__PURE__ */ i.jsx(T, { name: "chevron-right" }) })
    ] }),
    k && /* @__PURE__ */ i.jsx("div", { className: "status error", children: k }),
    f && !x && /* @__PURE__ */ i.jsx("p", { className: "muted history-empty", children: "Loading…" }),
    x && !x.has_data && /* @__PURE__ */ i.jsxs("p", { className: "muted history-empty", children: [
      "No history for this ",
      ma.find((R) => R.id === a).name.toLowerCase(),
      ". Home Assistant keeps 10 days unless",
      " ",
      /* @__PURE__ */ i.jsx("code", { children: "purge_keep_days" }),
      " is raised."
    ] }),
    (x == null ? void 0 : x.has_data) && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx(Uf, { data: x, metric: $, water: p, units: b, rows: S, cost: N }),
      /* @__PURE__ */ i.jsxs("div", { className: "history-rows", children: [
        S.length > 0 && !p && /* @__PURE__ */ i.jsxs("div", { className: `history-key muted small ${j ? "with-outdoor" : ""}`, children: [
          j && /* @__PURE__ */ i.jsxs("span", { title: "Outside temperature", children: [
            /* @__PURE__ */ i.jsx(T, { name: "weather-partly-cloudy" }),
            " Outside"
          ] }),
          /* @__PURE__ */ i.jsxs("span", { title: "Lowest and highest room temperature", children: [
            /* @__PURE__ */ i.jsx(T, { name: "thermometer" }),
            " Low · high"
          ] })
        ] }),
        S.map((R) => /* @__PURE__ */ i.jsx(Hf, { row: R, metric: $, water: p, outdoor: j, cost: N, scale: Af(S, $, a) }, R.key))
      ] }),
      $ === "cost" && N && /* @__PURE__ */ i.jsxs("p", { className: "history-hint muted small", children: [
        "An estimate: the boiler's time on × ",
        N.kw.toFixed(1),
        " kW × ",
        ri(N.price, N.currency),
        " per kWh, at today's price.",
        " ",
        N.basis === "meter" ? "The kW is the boiler's average while on, learned from your gas meter." : `The kW is 40% of the boiler's ${N.boiler_kw ?? "?"} kW rating, as a modulating boiler rarely runs flat out. Pick a gas meter in Settings for a closer figure.`
      ] }),
      !p && x.outdoor_entity == null && /* @__PURE__ */ i.jsx("p", { className: "history-hint muted small", children: "To see the temperature outside here, pick a weather entity or outdoor sensor in the Settings tab." })
    ] })
  ] });
}
function Af(e, t, n) {
  if (t === "time" || t === "cost") return { lo: 0, hi: Math.max(60, ...e.map((s) => s.minutes ?? 0)) };
  const r = e.map((s) => s.avg).filter((s) => s != null), l = r.length ? Math.floor(Math.min(...r)) - 2 : 10, o = r.length ? Math.ceil(Math.max(...r)) : 25;
  return { lo: l, hi: Math.max(o, l + 4) };
}
function Uf({ data: e, metric: t, water: n, units: r, rows: l, cost: o }) {
  const s = Math.max(1, l.filter((C) => C.minutes != null).length), a = e.previous, u = !!(a != null && a.has_data) && a.known_minutes >= 0.5 * e.known_minutes, c = u ? e.heating_minutes - a.heating_minutes : 0, g = e.temperature, m = (C) => o ? qi(C / 60 * o.per_hour, o.currency) : "–", [h, v, w, k] = t === "cost" ? ["Estimated cost", m(e.heating_minutes), `Average per ${r}`, m(e.heating_minutes / s)] : t === "time" ? [n ? "Hot water on" : "Boiler on", Gr(e.heating_minutes), `Average per ${r}`, Gr(e.heating_minutes / s)] : ["Average", g.avg != null ? `${g.avg.toFixed(1)}°` : "–", "Lowest – highest", g.min != null && g.max != null ? `${g.min.toFixed(1)}–${g.max.toFixed(1)}°` : "–"];
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs("div", { className: "history-summary", children: [
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("span", { className: "muted", children: h }),
        /* @__PURE__ */ i.jsx("b", { children: v })
      ] }),
      /* @__PURE__ */ i.jsx("i", {}),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("span", { className: "muted", children: w }),
        /* @__PURE__ */ i.jsx("b", { children: k })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("p", { className: "history-note muted small", children: [
      t === "time" && u && (Math.abs(c) < 1 ? "Same as the period before · " : `${Gr(Math.abs(c))} ${c > 0 ? "more" : "less"} than the period before · `),
      t === "cost" && o && u && (Math.abs(c) < 1 ? "Same as the period before · " : `${m(Math.abs(c))} ${c > 0 ? "more" : "less"} than the period before · `),
      "Fired up ",
      e.cycles,
      " time",
      e.cycles === 1 ? "" : "s",
      e.boosts ? ` · ${e.boosts} boost${e.boosts === 1 ? "" : "s"}` : "",
      t === "temp" && e.target_avg != null ? ` · average target ${e.target_avg.toFixed(1)}°` : "",
      !n && Bf(e)
    ] })
  ] });
}
function Bf(e) {
  var o, s;
  const t = (o = e.outdoor) == null ? void 0 : o.avg;
  if (t == null) return "";
  const n = (s = e.previous) == null ? void 0 : s.outdoor_avg, r = n != null ? t - n : null, l = r == null ? "" : Math.abs(r) < 0.5 ? ", about the same as the period before" : `, ${Math.abs(r).toFixed(0)}° ${r < 0 ? "colder" : "milder"} than the period before`;
  return ` · ${t.toFixed(0)}° outside${l}`;
}
function Wf(e, t) {
  if (e == null || t == null) return "–";
  const [n, r] = [e.toFixed(0), t.toFixed(0)];
  return n === r ? `${n}°` : `${n}–${r}°`;
}
function Hf({ row: e, metric: t, water: n, outdoor: r, cost: l, scale: o }) {
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
    r && /* @__PURE__ */ i.jsx("span", { className: "history-outdoor", title: "Lowest and highest outside temperature", children: Wf(e.outMin, e.outMax) }),
    !n && /* @__PURE__ */ i.jsxs("span", { className: "history-temps", title: "Lowest and highest room temperature", children: [
      e.min != null ? `${e.min.toFixed(0)}°` : "–",
      /* @__PURE__ */ i.jsx("span", { children: e.max != null ? `${e.max.toFixed(0)}°` : "–" })
    ] })
  ] });
}
const Vf = [
  { id: "control", label: "Control" },
  { id: "schedule", label: "Schedule" },
  { id: "history", label: "History" }
];
function Qf({
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
  var v, w;
  const [c, g] = _.useState(s === "schedule");
  _.useEffect(() => {
    s === "schedule" && g(!0);
  }, [s]);
  const m = r == null ? void 0 : r.status, h = [
    o ? t.name : null,
    m ? r != null && r.holiday && (m.mode !== "boost" || r.holiday.holding) ? `Away until ${yn(r.holiday.until)}` : m.mode === "schedule" ? "On schedule" : m.mode === "boost" ? (v = r == null ? void 0 : r.preheat) != null && v.active_for ? `Pre-heating for ${r.preheat.active_for}` : "Boosting" : m.mode === "off" ? "Off" : n === "water" ? "Always on" : "Manual" : "Waiting for the receiver"
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ i.jsxs("div", { className: "device-page", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "page-head", children: [
      /* @__PURE__ */ i.jsx("button", { className: "round ghost", onClick: u, "aria-label": "Back to the overview", children: /* @__PURE__ */ i.jsx(T, { name: "chevron-left" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "page-title", children: [
        /* @__PURE__ */ i.jsx("h2", { children: Vn[n] }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: h })
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "page-tabs", role: "tablist", children: Vf.map((k) => /* @__PURE__ */ i.jsx("button", { role: "tab", "aria-selected": k.id === s, className: k.id === s ? "on" : "", onClick: () => a(k.id), children: k.label }, k.id)) }),
    s === "control" && /* @__PURE__ */ i.jsx(Mc, { getHass: e, device: t, channel: n, info: r, showDevice: !1, limits: l, page: !0 }),
    s === "control" && n === "heat" && (r == null ? void 0 : r.preheat) && /* @__PURE__ */ i.jsx(zf, { getHass: e, device: t, info: r.preheat }),
    c && /* @__PURE__ */ i.jsx("div", { hidden: s !== "schedule", children: /* @__PURE__ */ i.jsx(Pf, { getHass: e, device: t, channel: n, limits: l, mode: (m == null ? void 0 : m.mode) ?? null, preheatFor: (m == null ? void 0 : m.mode) === "boost" ? ((w = r == null ? void 0 : r.preheat) == null ? void 0 : w.active_for) ?? null : null }) }),
    s === "history" && /* @__PURE__ */ i.jsx(Rc, { getHass: e, devices: [t], channel: n })
  ] });
}
const Kf = 20, Yf = 6e4;
function Gf({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onOpenDevice: l
}) {
  const [o, s] = _.useState(null), [a, u] = _.useState(""), [c, g] = _.useState(!1), m = _.useCallback(() => {
    e().callWS({ type: "hive_local/rooms/valves" }).then((v) => s(v.valves)).catch((v) => u(me(v)));
  }, [e]);
  _.useEffect(() => {
    m();
    const v = setInterval(m, Yf);
    return () => clearInterval(v);
  }, [m]);
  const h = t.length > 1;
  return /* @__PURE__ */ i.jsxs("div", { className: "stack devices-page", children: [
    /* @__PURE__ */ i.jsx("h2", { className: "history-title", children: "Devices" }),
    a && /* @__PURE__ */ i.jsx("div", { className: "status error", children: a }),
    /* @__PURE__ */ i.jsxs("div", { className: "device-grid", children: [
      t.map((v) => /* @__PURE__ */ i.jsx(Zf, { device: v, status: n, onOpen: (w) => l(v.entry_id, w) }, v.entry_id)),
      o == null ? void 0 : o.map((v) => /* @__PURE__ */ i.jsx(Jf, { valve: v }, v.entity_id))
    ] }),
    o && !o.length && /* @__PURE__ */ i.jsx("p", { className: "muted", children: "No Hive radiator valves yet. Pair them with ZHA or Zigbee2MQTT and they'll show up here." }),
    h && /* @__PURE__ */ i.jsx("p", { className: "muted small", children: "Each receiver is a heating zone." }),
    /* @__PURE__ */ i.jsx("div", { className: "fab-wrap", children: /* @__PURE__ */ i.jsx("button", { className: "fab", "aria-label": "Add a device", onClick: () => g(!0), children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) }) }),
    c && /* @__PURE__ */ i.jsx(qf, { onClose: () => g(!1) })
  ] });
}
const Xf = { z2m: "Zigbee2MQTT", zha: "ZHA" };
function Fc({ items: e }) {
  return /* @__PURE__ */ i.jsx("div", { className: "facts", children: e.map((t) => /* @__PURE__ */ i.jsxs("span", { className: `fact ${t.warn ? "warn" : ""}`, children: [
    /* @__PURE__ */ i.jsx(T, { name: t.icon }),
    " ",
    t.text
  ] }, t.text)) });
}
function Dc({ online: e, text: t }) {
  return /* @__PURE__ */ i.jsxs("span", { className: `online ${e ? "" : "no"}`, children: [
    /* @__PURE__ */ i.jsx("i", {}),
    t ?? (e ? "Online" : "Not responding")
  ] });
}
function Zf({ device: e, status: t, onOpen: n }) {
  const r = e.channels.some((l) => {
    var o, s;
    return (s = (o = t[e.entry_id]) == null ? void 0 : o[l]) == null ? void 0 : s.status;
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
      /* @__PURE__ */ i.jsx(Dc, { online: r, text: r ? "Online" : "Waiting" })
    ] }),
    /* @__PURE__ */ i.jsx(
      Fc,
      {
        items: [
          { icon: "zigbee", text: Xf[e.transport ?? "z2m"] },
          { icon: "fire", text: e.channels.includes("water") ? "Heating and hot water" : "Heating only" }
        ]
      }
    ),
    /* @__PURE__ */ i.jsx("div", { className: "hw-links", children: e.channels.map((l) => /* @__PURE__ */ i.jsxs("button", { className: "hw-link", onClick: () => n(l), children: [
      Vn[l],
      " ",
      /* @__PURE__ */ i.jsx(T, { name: "chevron-right" })
    ] }, l)) })
  ] });
}
function Jf({ valve: e }) {
  const t = e.battery != null && !Number.isNaN(Number(e.battery)) ? Number(e.battery) : null, n = t != null && t < Kf;
  return /* @__PURE__ */ i.jsxs("section", { className: `card hw ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ i.jsxs("div", { className: "hw-head", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "thermostat" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "device-name", children: [
        /* @__PURE__ */ i.jsx("span", { children: e.name }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "Hive radiator valve" })
      ] }),
      /* @__PURE__ */ i.jsx(Dc, { online: e.available })
    ] }),
    /* @__PURE__ */ i.jsx(
      Fc,
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
function qf({ onClose: e }) {
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
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: t ? "Pair it with ZHA or Zigbee2MQTT first (Settings → Devices & services). It then appears here, and you can put it in a room in the Settings tab." : "A Hive radiator valve (UK7004240)." })
        ] }),
        /* @__PURE__ */ i.jsx(T, { name: t ? "chevron-up" : "chevron-down" })
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: e, children: "Close" })
  ] }) });
}
const Oc = 20, wl = (e) => e == null ? "–" : `${e.toFixed(1)}°`;
function eh({ valve: e, heating: t }) {
  const n = e.battery == null ? null : Number(e.battery), r = n != null && !Number.isNaN(n) && n <= Oc;
  return /* @__PURE__ */ i.jsxs("li", { className: `valve ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ i.jsx(T, { name: t ? "fire" : "radiator", className: t ? "valve-icon heating" : "valve-icon" }),
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
      /* @__PURE__ */ i.jsx(T, { name: r ? "battery-alert-variant-outline" : "battery-outline" }),
      " ",
      Math.round(n),
      "%"
    ] })
  ] });
}
const th = 8;
function nh({ getHass: e, valves: t, info: n, roomName: r, thisRoom: l, chosen: o, onToggle: s }) {
  const [a, u] = _.useState(null), [c, g] = _.useState(null), m = _.useRef();
  _.useEffect(() => () => window.clearTimeout(m.current), []);
  const [h, v] = _.useState(""), w = t.length > th, k = h.trim().toLowerCase(), C = r.trim().toLowerCase(), f = (j) => !!C && (j.area ?? "").toLowerCase() === C, d = (j) => {
    var $;
    const N = ($ = n.get(j.entity_id)) == null ? void 0 : $.room;
    return N && N !== l ? N : null;
  }, [p] = _.useState(() => new Set(o)), y = (j) => p.has(j.entity_id) ? 0 : f(j) ? 1 : d(j) ? 3 : 2, x = [...t].sort((j, N) => y(j) - y(N)), S = k ? x.filter((j) => j.name.toLowerCase().includes(k) || (j.area ?? "").toLowerCase().includes(k)) : x, b = async (j) => {
    g(null), u(j.entity_id);
    try {
      await e().callWS({ type: "hive_local/rooms/identify", entity_id: j.entity_id }), g({ kind: "ok", text: `${j.name} is flashing its light.` }), window.clearTimeout(m.current), m.current = window.setTimeout(() => {
        u(null), g(null);
      }, 1e4);
    } catch (N) {
      u(null), g({ kind: "error", text: me(N) });
    }
  };
  return t.length ? /* @__PURE__ */ i.jsxs("div", { className: "valve-picker", children: [
    w && /* @__PURE__ */ i.jsxs("label", { className: "valve-search", children: [
      /* @__PURE__ */ i.jsx(T, { name: "magnify" }),
      /* @__PURE__ */ i.jsx("input", { type: "search", value: h, placeholder: "Search valves or areas", "aria-label": "Search valves or areas", onChange: (j) => v(j.target.value) }),
      h && /* @__PURE__ */ i.jsx("button", { type: "button", className: "ghost round", "aria-label": "Clear the search", onClick: () => v(""), children: /* @__PURE__ */ i.jsx(T, { name: "close" }) })
    ] }),
    !S.length && k && /* @__PURE__ */ i.jsxs("span", { className: "muted small", children: [
      'No valves match "',
      h.trim(),
      '".'
    ] }),
    S.length > 0 && /* @__PURE__ */ i.jsx("div", { className: "valve-list", children: S.map((j) => {
      const N = n.get(j.entity_id), $ = o.has(j.entity_id), O = (N == null ? void 0 : N.battery) == null ? null : Number(N.battery), R = O != null && !Number.isNaN(O), q = R && O <= Oc, xe = d(j);
      return /* @__PURE__ */ i.jsxs("div", { className: `valve-pick ${$ ? "on" : ""}`, children: [
        /* @__PURE__ */ i.jsxs("button", { type: "button", role: "checkbox", "aria-checked": $, className: "valve-pick-main", onClick: () => s(j.entity_id), children: [
          /* @__PURE__ */ i.jsx("span", { className: `valve-check ${$ ? "on" : ""}`, "aria-hidden": "true", children: $ && /* @__PURE__ */ i.jsx(T, { name: "check" }) }),
          /* @__PURE__ */ i.jsxs("span", { className: "valve-pick-text", children: [
            /* @__PURE__ */ i.jsx("span", { children: j.name }),
            /* @__PURE__ */ i.jsx("span", { className: "muted small", children: [j.area ?? "No area", xe ? `in ${xe}` : null].filter(Boolean).join(" · ") })
          ] }),
          /* @__PURE__ */ i.jsx("span", { className: "valve-pick-read small", children: N && !N.available ? "Not responding" : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
            (N == null ? void 0 : N.current_temperature) != null ? `${N.current_temperature.toFixed(1)}°` : "",
            R && /* @__PURE__ */ i.jsxs("span", { className: q ? "warn" : "", children: [
              (N == null ? void 0 : N.current_temperature) != null ? " · " : "",
              Math.round(O),
              "%"
            ] })
          ] }) })
        ] }),
        (N == null ? void 0 : N.identify) && /* @__PURE__ */ i.jsxs("button", { type: "button", className: `valve-find ${a === j.entity_id ? "on" : ""}`, onClick: () => b(j), disabled: a === j.entity_id, "aria-label": `Find ${j.name}: flash its light`, children: [
          /* @__PURE__ */ i.jsx(T, { name: "lightbulb-on-outline" }),
          " ",
          /* @__PURE__ */ i.jsx("span", { className: "valve-find-label", children: a === j.entity_id ? "Flashing" : "Find" })
        ] })
      ] }, j.entity_id);
    }) }),
    c && /* @__PURE__ */ i.jsx("div", { className: `status ${c.kind} small`, children: c.text })
  ] }) : null;
}
function Ic({ dialog: e, label: t, onClose: n, children: r }) {
  return e ? /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: (l) => {
    l.stopPropagation(), n();
  }, children: /* @__PURE__ */ i.jsxs("div", { className: "sheet room-sheet room-editor", role: "dialog", "aria-modal": "true", "aria-label": t, onClick: (l) => l.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    r
  ] }) }) : /* @__PURE__ */ i.jsx("section", { className: "card room-editor", children: r });
}
function rh(e) {
  return /* @__PURE__ */ i.jsx(Ac, { ...e, dialog: !0 });
}
function Ac({ getHass: e, room: t, onDone: n, dialog: r }) {
  _.useEffect(() => {
    if (!r) return;
    const N = ($) => $.key === "Escape" && n();
    return window.addEventListener("keydown", N), () => window.removeEventListener("keydown", N);
  }, [r, n]);
  const [l, o] = _.useState(null), [s, a] = _.useState((t == null ? void 0 : t.receiver) ?? ""), [u, c] = _.useState((t == null ? void 0 : t.name) ?? ""), [g, m] = _.useState(new Set((t == null ? void 0 : t.valves) ?? [])), [h, v] = _.useState((t == null ? void 0 : t.sensor) ?? ""), [w, k] = _.useState(!1), [C, f] = _.useState(!1), [d, p] = _.useState(""), [y, x] = _.useState(/* @__PURE__ */ new Map());
  _.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/candidates" }).then(o).catch((N) => p(me(N))), e().callWS({ type: "hive_local/rooms/valves" }).then((N) => x(new Map(N.valves.map(($) => [$.entity_id, $])))).catch(() => {
    });
  }, [e]);
  const S = ((l == null ? void 0 : l.receivers.length) ?? 0) > 1, b = async (N) => {
    k(!0), p("");
    try {
      await e().callWS(N), n();
    } catch ($) {
      p(me($)), k(!1);
    }
  }, j = (N) => m(($) => {
    const O = new Set($);
    return O.has(N) ? O.delete(N) : O.add(N), O;
  });
  return /* @__PURE__ */ i.jsxs(Ic, { dialog: !!r, label: t ? `Edit ${t.name}` : "New room", onClose: n, children: [
    /* @__PURE__ */ i.jsx("h2", { children: t ? `Edit ${t.name}` : "New room" }),
    /* @__PURE__ */ i.jsxs(
      "form",
      {
        className: "stack",
        onSubmit: (N) => {
          N.preventDefault(), b({
            type: "hive_local/rooms/save",
            ...t ? { room_id: t.id } : {},
            name: u,
            valves: [...g],
            sensor: h || null,
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
              g.size > 0 && /* @__PURE__ */ i.jsxs("span", { className: "valve-count", children: [
                g.size,
                " chosen"
              ] })
            ] }),
            !l && !d && /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "Loading…" }),
            l && !l.valves.length && /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "No Hive radiator valves found. Pair them with ZHA or Zigbee2MQTT first." }),
            /* @__PURE__ */ i.jsx(nh, { getHass: e, valves: (l == null ? void 0 : l.valves) ?? [], info: y, roomName: u, thisRoom: (t == null ? void 0 : t.name) ?? null, chosen: g, onToggle: j })
          ] }),
          /* @__PURE__ */ i.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ i.jsx("span", { children: "Room temperature from" }),
            /* @__PURE__ */ i.jsxs("select", { id: `room-sensor-${(t == null ? void 0 : t.id) ?? "new"}`, value: h, onChange: (N) => v(N.target.value), children: [
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
            /* @__PURE__ */ i.jsx("button", { className: "primary", type: "submit", disabled: w || !u.trim() || !g.size || S && !s, children: t ? "Save" : "Add room" }),
            /* @__PURE__ */ i.jsx("button", { type: "button", className: "ghost", onClick: n, disabled: w, children: "Cancel" }),
            /* @__PURE__ */ i.jsx("span", { className: "spacer" }),
            t && (C ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
              /* @__PURE__ */ i.jsxs("span", { className: "muted small", children: [
                "Delete ",
                t.name,
                "? The valves aren't changed."
              ] }),
              /* @__PURE__ */ i.jsx("button", { type: "button", className: "danger", disabled: w, onClick: () => b({ type: "hive_local/rooms/delete", room_id: t.id }), children: "Delete" }),
              /* @__PURE__ */ i.jsx("button", { type: "button", className: "ghost", onClick: () => f(!1), children: "Keep" })
            ] }) : /* @__PURE__ */ i.jsxs("button", { type: "button", className: "danger", onClick: () => f(!0), disabled: w, children: [
              /* @__PURE__ */ i.jsx(T, { name: "delete-outline" }),
              " Delete room"
            ] }))
          ] })
        ]
      }
    )
  ] });
}
function lh({ getHass: e, roomId: t, several: n, onClose: r }) {
  var f;
  const [l, o] = _.useState(null), [s, a] = _.useState(!1), [u, c] = _.useState(null), [g, m] = _.useState(""), h = _.useRef();
  if (_.useEffect(() => {
    const d = e().connection.subscribeMessage(
      (p) => o(p.rooms.find((y) => y.id === t) ?? null),
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
  if (s) return /* @__PURE__ */ i.jsx(Ac, { getHass: e, room: l, onDone: () => a(!1), dialog: !0 });
  const v = u ?? l.target ?? ((f = l.target_range) == null ? void 0 : f[1]) ?? 20, w = (d) => {
    const p = Math.min(35, Math.max(5, d));
    c(p), m(""), window.clearTimeout(h.current), h.current = window.setTimeout(async () => {
      try {
        const y = await e().callWS({ type: "hive_local/rooms/set_target", room_id: l.id, temperature: p });
        if (y.failed.length) {
          const x = l.valve_states.filter((S) => y.failed.includes(S.entity_id)).map((S) => S.name);
          m(`Didn't take on ${x.join(", ")}. It may be asleep; try again shortly.`);
        }
      } catch (y) {
        m(me(y));
      } finally {
        c(null);
      }
    }, 700);
  }, k = `${l.valves.length} valve${l.valves.length === 1 ? "" : "s"}`, C = l.temperature_source === "sensor" ? l.sensor_name : l.temperature_source === "valves" ? "Average of the valves" : "No reading";
  return /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: (d) => {
    d.stopPropagation(), r();
  }, children: /* @__PURE__ */ i.jsxs("div", { className: "sheet heat room-sheet", role: "dialog", "aria-modal": "true", "aria-label": l.name, onClick: (d) => d.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ i.jsx("h2", { children: l.name }),
      /* @__PURE__ */ i.jsx("span", { className: "muted", children: [l.heating ? "Heating" : "Idle", n ? l.receiver_name : null, k].filter(Boolean).join(" · ") })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-live", children: [
      /* @__PURE__ */ i.jsx(T, { name: l.heating ? "fire" : "thermometer", className: l.heating ? "heating" : "" }),
      /* @__PURE__ */ i.jsxs("span", { children: [
        /* @__PURE__ */ i.jsx("b", { children: l.current_temperature == null ? "–" : `${l.current_temperature.toFixed(1)}°` }),
        " ",
        /* @__PURE__ */ i.jsx("span", { className: "muted", children: C })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: l.target_range && u == null ? `Target (valves set to ${wl(l.target_range[0])}–${wl(l.target_range[1])})` : "Target" }),
      /* @__PURE__ */ i.jsxs("div", { className: "sheet-temp", children: [
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => w(v - 0.5), "aria-label": "Lower", children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
        /* @__PURE__ */ i.jsxs("span", { className: "sheet-temp-value", children: [
          v.toFixed(1),
          "°"
        ] }),
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => w(v + 0.5), "aria-label": "Raise", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Valves" }),
      /* @__PURE__ */ i.jsx("ul", { className: "valves", children: l.valve_states.map((d) => /* @__PURE__ */ i.jsx(eh, { valve: d, heating: l.heating_valves.includes(d.entity_id) }, d.entity_id)) })
    ] }),
    g && /* @__PURE__ */ i.jsx("div", { className: "status error", children: g }),
    /* @__PURE__ */ i.jsxs("div", { className: "room-sheet-actions", children: [
      /* @__PURE__ */ i.jsxs("button", { className: "ghost", onClick: () => a(!0), children: [
        /* @__PURE__ */ i.jsx(T, { name: "pencil-outline" }),
        " Edit room"
      ] }),
      /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: r, children: "Close" })
    ] })
  ] }) });
}
function oh(e) {
  const t = e.toLowerCase();
  return /lounge|living|sitting|family|snug/.test(t) ? "sofa-outline" : /bed|nursery|guest/.test(t) ? "bed-outline" : /kitchen|dining/.test(t) ? "silverware-fork-knife" : /landing|hall|stair/.test(t) ? "stairs" : /study|office/.test(t) ? "desk" : /bath|shower|en-?suite|wc|toilet/.test(t) ? "shower" : "home-thermometer-outline";
}
function ih({ getHass: e, onDone: t }) {
  const [n, r] = _.useState(null), [l, o] = _.useState(/* @__PURE__ */ new Map()), [s, a] = _.useState(/* @__PURE__ */ new Set()), [u, c] = _.useState({}), [g, m] = _.useState(!1), [h, v] = _.useState("");
  _.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/suggest" }).then((y) => {
      r(y), a(new Set(y.rooms.map((x, S) => S)));
    }).catch((y) => v(me(y))), e().callWS({ type: "hive_local/rooms/candidates" }).then((y) => o(new Map([...y.valves, ...y.sensors].map((x) => [x.entity_id, x.name])))).catch(() => {
    });
  }, [e]);
  const w = ((n == null ? void 0 : n.receivers.length) ?? 0) > 1, k = ((n == null ? void 0 : n.rooms) ?? []).map((y, x) => [y, x]).filter(([, y]) => s.has(y)), C = k.length > 0 && (!w || k.every(([, y]) => u[y])), f = ((n == null ? void 0 : n.rooms) ?? []).reduce((y, x) => y + x.valves.length, 0), d = async () => {
    m(!0), v("");
    try {
      for (const [y, x] of k)
        await e().callWS({ type: "hive_local/rooms/save", name: y.name, valves: y.valves, sensor: y.sensor, receiver: u[x] ?? null });
      t();
    } catch (y) {
      v(me(y)), m(!1);
    }
  }, p = (y) => a((x) => {
    const S = new Set(x);
    return S.has(y) ? S.delete(y) : S.add(y), S;
  });
  return /* @__PURE__ */ i.jsxs(Ic, { dialog: !0, label: "Set up your rooms", onClose: t, children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Set up your rooms" }),
    !n && !h && /* @__PURE__ */ i.jsx("p", { className: "muted setup-intro", children: "Looking for your valves…" }),
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
      /* @__PURE__ */ i.jsx("div", { className: "setup-list", children: n.rooms.map((y, x) => {
        const S = s.has(x), b = y.valves.map((N) => l.get(N) ?? N).join(", "), j = y.sensor ? `Temperature: ${l.get(y.sensor) ?? y.sensor}` : y.valves.length === 1 ? "Temperature: from the valve" : "Temperature: average of the valves";
        return /* @__PURE__ */ i.jsxs("div", { className: `setup-room ${S ? "on" : ""}`, children: [
          /* @__PURE__ */ i.jsxs("button", { type: "button", role: "checkbox", "aria-checked": S, className: "setup-room-main", onClick: () => p(x), children: [
            /* @__PURE__ */ i.jsx("span", { className: `valve-check ${S ? "on" : ""}`, "aria-hidden": "true", children: S && /* @__PURE__ */ i.jsx(T, { name: "check" }) }),
            /* @__PURE__ */ i.jsxs("span", { className: "setup-room-text", children: [
              /* @__PURE__ */ i.jsx("span", { children: y.name }),
              /* @__PURE__ */ i.jsx("span", { className: "muted small", children: b }),
              /* @__PURE__ */ i.jsx("span", { className: "muted small", children: j })
            ] }),
            /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: oh(y.name) }) })
          ] }),
          w && S && /* @__PURE__ */ i.jsxs("select", { "aria-label": `Which receiver heats ${y.name}`, value: u[x] ?? "", onChange: (N) => c(($) => ({ ...$, [x]: N.target.value })), children: [
            /* @__PURE__ */ i.jsx("option", { value: "", disabled: !0, children: "Heated by…" }),
            n.receivers.map((N) => /* @__PURE__ */ i.jsx("option", { value: N.entry_id, children: N.name }, N.entry_id))
          ] })
        ] }, y.name);
      }) })
    ] }),
    h && /* @__PURE__ */ i.jsx("div", { className: "status error", children: h }),
    n && n.rooms.length > 0 && /* @__PURE__ */ i.jsx("button", { className: "sheet-go", style: { "--hl-accent": "var(--hl-brand)" }, disabled: g || !C, onClick: d, children: g ? "Creating…" : `Create ${k.length} room${k.length === 1 ? "" : "s"}` }),
    /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: t, disabled: g, children: n != null && n.rooms.length ? "I'll set them up myself" : "Close" })
  ] });
}
function sh({ getHass: e, devices: t, status: n }) {
  const [r, l] = _.useState(null), [o, s] = _.useState("");
  _.useEffect(() => {
    e().callWS({ type: "hive_local/settings" }).then(l).catch((c) => s(me(c)));
  }, [e]);
  const a = (c) => {
    l((g) => g && { ...g, ...c }), e().callWS({ type: "hive_local/settings/set", ...c }).then((g) => {
      l(g), s("");
    }).catch((g) => s(me(g)));
  }, u = (c) => a({ outdoor_entity: c || null });
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
        /* @__PURE__ */ i.jsxs("select", { "aria-label": "Outside temperature", value: (r == null ? void 0 : r.outdoor_entity) ?? "", onChange: (c) => u(c.target.value), disabled: !r, children: [
          /* @__PURE__ */ i.jsx("option", { value: "", children: "None" }),
          ((r == null ? void 0 : r.outdoor_candidates) ?? []).map((c) => /* @__PURE__ */ i.jsxs("option", { value: c.entity_id, children: [
            c.name,
            c.area ? ` · ${c.area}` : ""
          ] }, c.entity_id))
        ] })
      ] }) })
    ] }),
    r && /* @__PURE__ */ i.jsx(ah, { data: r, save: a }),
    /* @__PURE__ */ i.jsx(ch, { getHass: e }),
    t.map((c) => /* @__PURE__ */ i.jsxs("section", { className: "settings-section", children: [
      /* @__PURE__ */ i.jsx("h3", { children: t.length > 1 ? c.name : "Receiver" }),
      /* @__PURE__ */ i.jsx("div", { className: "settings-group", children: c.channels.map((g) => {
        var m;
        return /* @__PURE__ */ i.jsx(ph, { getHass: e, device: c, channel: g, info: (m = n[c.entry_id]) == null ? void 0 : m[g] }, g);
      }) })
    ] }, c.entry_id))
  ] });
}
const va = [6, 9, 12, 15, 18, 20, 24, 25, 28, 30, 32, 35, 40, 45, 50];
function ah({ data: e, save: t }) {
  const [n, r] = _.useState(null), l = _.useRef(null), o = _.useRef(), s = e.boiler_kw, a = (C) => {
    if (s == null) return t({ boiler_kw: 24 });
    const f = C > 0 ? va.find((d) => d > s) : [...va].reverse().find((d) => d < s);
    t({ boiler_kw: f ?? s });
  }, u = uh[e.currency], c = n ?? e.fixed_price, g = (C, f = 0) => {
    const d = l.current ?? e.fixed_price ?? 0.06, p = f > 15 ? 1e-3 : 1e-4, y = Math.max(0, Math.round((C > 0 ? Math.floor(d / p + 1e-6) + 1 : Math.ceil(d / p - 1e-6) - 1) * p * 1e4) / 1e4);
    l.current = y, r(y), window.clearTimeout(o.current), o.current = window.setTimeout(() => {
      t({ price_source: "fixed", fixed_price: y }), l.current = null, r(null);
    }, 800);
  }, m = (C) => (
    // A fixed price starts from whatever price was in use, so it's a few taps from right.
    t(C === "fixed" && e.fixed_price == null ? { price_source: C, fixed_price: e.price ?? 0.06 } : { price_source: C || null })
  ), h = e.fit, v = e.gas_meter ? h ? `Learned ${h.kw.toFixed(1)} kW while heating from ${h.days} days${h.baseline >= 0.5 ? ` (plus ${h.baseline.toFixed(0)} kWh a day for hot water and cooking)` : ""}.` : e.learned_at ? "Not enough yet: it needs at least 4 days of readings with the heating on. Checked every 6 hours." : "Learning from the last 14 days…" : "Learns the boiler's real average output from your gas use. Hot water and cooking on the same meter are allowed for.", w = (C) => C != null ? `${ri(C, e.currency)} per kWh` : null, k = e.price_source === "fixed" ? "Your unit rate, below." : e.price_source === "energy" && e.energy_price == null ? "The Energy dashboard has no gas price (or it can't be read)." : e.price_source && e.price_source !== "fixed" && e.price == null ? "That entity has no price right now." : w(e.price) ?? "Pick where the price comes from.";
  return /* @__PURE__ */ i.jsxs("section", { className: "settings-section", children: [
    /* @__PURE__ */ i.jsx("h3", { children: "Heating cost" }),
    /* @__PURE__ */ i.jsx("p", { className: "muted small settings-help", children: "An estimated cost in the heating history: the boiler's time on × its average output while on × the gas price. A modern boiler turns its flame down, so it averages well below its rating: a gas meter gives the real figure." }),
    /* @__PURE__ */ i.jsxs("div", { className: "settings-group", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "meter-gas-outline" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: "Gas meter" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: v })
        ] }),
        /* @__PURE__ */ i.jsxs("select", { "aria-label": "Gas meter", value: e.gas_meter ?? "", onChange: (C) => t({ gas_meter: C.target.value || null }), children: [
          /* @__PURE__ */ i.jsx("option", { value: "", children: "None" }),
          e.gas_meter_candidates.map((C) => /* @__PURE__ */ i.jsxs("option", { value: C.entity_id, children: [
            C.name,
            C.area ? ` · ${C.area}` : ""
          ] }, C.entity_id))
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "fire" }) }),
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
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "cash" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: "Gas price" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: k })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "settings-controls", children: /* @__PURE__ */ i.jsxs("select", { "aria-label": "Gas price", value: e.price_source ?? "", onChange: (C) => m(C.target.value), children: [
          /* @__PURE__ */ i.jsx("option", { value: "", children: "None" }),
          /* @__PURE__ */ i.jsx("option", { value: "energy", children: "Energy dashboard" }),
          /* @__PURE__ */ i.jsx("option", { value: "fixed", children: "Unit rate" }),
          e.price_candidates.map((C) => /* @__PURE__ */ i.jsxs("option", { value: C.entity_id, children: [
            C.name,
            " (",
            C.unit,
            ")"
          ] }, C.entity_id))
        ] }) })
      ] }),
      e.price_source === "fixed" && /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "tag-outline" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: "Unit rate" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "From your bill or tariff: the gas price per kWh, without the standing charge." })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "settings-controls", children: /* @__PURE__ */ i.jsx(
          Qn,
          {
            value: c == null ? "–" : u ? `${(c * 100).toFixed(2)}${u}` : ri(c, e.currency),
            onLower: (C) => g(-1, C),
            onRaise: (C) => g(1, C),
            hold: !0
          }
        ) })
      ] })
    ] })
  ] });
}
const uh = { GBP: "p", EUR: "c", USD: "¢", CAD: "¢", AUD: "c", NZD: "c", IEP: "p" };
function ch({ getHass: e }) {
  const [t, n] = _.useState(null), [r, l] = _.useState([]), [o, s] = _.useState(null), [a, u] = _.useState(!1), [c, g] = _.useState(0);
  _.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/suggest" }).then((h) => g(h.rooms.length)).catch(() => {
    });
  }, [e, t]), _.useEffect(() => {
    const h = e().connection.subscribeMessage(
      (v) => {
        n(v.rooms), l(v.receivers);
      },
      { type: "hive_local/rooms/subscribe" }
    );
    return () => {
      h.then((v) => v()).catch(() => {
      });
    };
  }, [e]);
  const m = r.length > 1;
  return /* @__PURE__ */ i.jsxs("section", { className: "settings-section", children: [
    /* @__PURE__ */ i.jsx("h3", { children: "Rooms" }),
    /* @__PURE__ */ i.jsx("p", { className: "muted small settings-help", children: "Group your Hive radiator valves into rooms. Each room then has a card on the Overview." }),
    /* @__PURE__ */ i.jsxs("div", { className: "settings-group", children: [
      (t ?? []).map((h) => /* @__PURE__ */ i.jsxs("button", { className: "settings-row link", onClick: () => s(h.id), children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "home-thermometer-outline" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: h.name }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: [
            `${h.valves.length} valve${h.valves.length === 1 ? "" : "s"}`,
            h.sensor_name ?? "temperature from the valves",
            m ? `heated by ${h.receiver_name}` : null
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
      /* @__PURE__ */ i.jsxs("button", { className: "settings-row link add", onClick: () => s("new"), children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) }),
        /* @__PURE__ */ i.jsx("div", { className: "settings-text", children: /* @__PURE__ */ i.jsx("span", { children: "Add a room" }) })
      ] })
    ] }),
    a && /* @__PURE__ */ i.jsx(ih, { getHass: e, onDone: () => u(!1) }),
    o && /* @__PURE__ */ i.jsx(
      rh,
      {
        getHass: e,
        room: o === "new" || t == null ? void 0 : t.find((h) => h.id === o),
        onDone: () => s(null)
      }
    )
  ] });
}
const dh = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, Rr = [15, 30, 45, 60, 90, 120, 180, 240, 360];
function ph({ getHass: e, device: t, channel: n, info: r }) {
  const [l, o] = _.useState(null), s = _.useRef(), a = l ?? r;
  if (!a) return null;
  const u = (m, h) => {
    const v = { ...a, [m]: h };
    o(v), window.clearTimeout(s.current), s.current = window.setTimeout(() => {
      e().callWS({ type: "hive_local/defaults", entry_id: t.entry_id, channel: n, [m]: h }).finally(() => o(null));
    }, 800);
  }, c = (m) => {
    const h = Rr.findIndex((w) => w >= a.boost_minutes), v = h < 0 ? Rr.length - 1 : h;
    return Rr[Math.min(Rr.length - 1, Math.max(0, v + m))];
  }, g = n === "water";
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: g ? "water-boiler" : "radiator" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
        /* @__PURE__ */ i.jsx("span", { children: g ? "Hot water boost" : "Heating boost" }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "What Boost does unless you choose otherwise." })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-controls", children: [
        /* @__PURE__ */ i.jsx(Qn, { label: "How long", value: dh(a.boost_minutes), onLower: () => u("boost_minutes", c(-1)), onRaise: () => u("boost_minutes", c(1)) }),
        !g && /* @__PURE__ */ i.jsx(Qn, { label: "Temperature", value: `${a.boost_temperature.toFixed(1)}°`, onLower: () => u("boost_temperature", Math.max(5, a.boost_temperature - 0.5)), onRaise: () => u("boost_temperature", Math.min(32, a.boost_temperature + 0.5)) })
      ] })
    ] }),
    !g && /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "snowflake" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
        /* @__PURE__ */ i.jsx("span", { children: "Frost protection" }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "The target shown while the schedule has the heating off. Only for display: the receiver isn't changed." })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "settings-controls", children: /* @__PURE__ */ i.jsx(Qn, { value: `${a.frost_temperature.toFixed(1)}°`, onLower: () => u("frost_temperature", Math.max(5, a.frost_temperature - 0.5)), onRaise: () => u("frost_temperature", Math.min(16, a.frost_temperature + 0.5)) }) })
    ] })
  ] });
}
function Qn({ label: e, value: t, onLower: n, onRaise: r, hold: l }) {
  const o = xa(n, l), s = xa(r, l);
  return /* @__PURE__ */ i.jsxs("div", { className: "adjust", children: [
    e && /* @__PURE__ */ i.jsx("span", { className: "muted small", children: e }),
    /* @__PURE__ */ i.jsxs("div", { className: "stepper", children: [
      /* @__PURE__ */ i.jsx("button", { className: "round", ...o, "aria-label": `Lower ${e ?? ""}`.trim(), children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
      /* @__PURE__ */ i.jsx("span", { className: "stepper-value", children: t }),
      /* @__PURE__ */ i.jsx("button", { className: "round", ...s, "aria-label": `Raise ${e ?? ""}`.trim(), children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
    ] })
  ] });
}
function xa(e, t) {
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
const fh = [
  { id: "overview", label: "Overview", icon: "view-dashboard-outline" },
  { id: "devices", label: "Devices", icon: "devices" },
  { id: "stats", label: "Stats", icon: "chart-box-outline" },
  { id: "settings", label: "Settings", icon: "tune-variant" }
];
function hh({ getHass: e, narrow: t, onToggleMenu: n }) {
  var b;
  const [r, l] = _.useState([]), [o, s] = _.useState(null), [a, u] = _.useState({}), [c, g] = _.useState("overview"), [m, h] = _.useState(null), [v, w] = _.useState("control"), [k, C] = _.useState(null), [f, d] = _.useState("");
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
    h({ entry: j, channel: N }), w("control");
  }, y = (j) => {
    g(j), h(null), C(null);
  }, x = m && r.find((j) => j.entry_id === m.entry), S = fh;
  return /* @__PURE__ */ i.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ i.jsx("header", { children: /* @__PURE__ */ i.jsxs("div", { className: "toolbar-row", children: [
      t && /* @__PURE__ */ i.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ i.jsx(T, { name: "menu" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ i.jsx(fa, {}),
        /* @__PURE__ */ i.jsx("h1", { children: "Hive Local" })
      ] }),
      /* @__PURE__ */ i.jsx("nav", { className: "tabs", role: "tablist", children: S.map((j) => /* @__PURE__ */ i.jsxs("button", { role: "tab", "aria-selected": j.id === c, className: j.id === c ? "on" : "", onClick: () => y(j.id), children: [
        /* @__PURE__ */ i.jsx(T, { name: j.icon }),
        /* @__PURE__ */ i.jsx("span", { children: j.label })
      ] }, j.id)) })
    ] }) }),
    /* @__PURE__ */ i.jsxs("main", { children: [
      f && /* @__PURE__ */ i.jsx("div", { className: "status error", children: f }),
      !r.length && !f && /* @__PURE__ */ i.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ i.jsx(fa, { size: 56 }),
        /* @__PURE__ */ i.jsx("p", { children: "No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local." })
      ] }),
      x && o ? /* @__PURE__ */ i.jsx(
        Qf,
        {
          getHass: e,
          device: x,
          channel: m.channel,
          info: (b = a[x.entry_id]) == null ? void 0 : b[m.channel],
          limits: o,
          showDevice: r.length > 1,
          tab: v,
          onTab: w,
          onBack: () => h(null)
        },
        `${m.entry}-${m.channel}`
      ) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        c === "overview" && /* @__PURE__ */ i.jsx(Sf, { getHass: e, devices: r, status: a, limits: o, onOpenDevice: p, onOpenRoom: C }),
        c === "devices" && r.length > 0 && /* @__PURE__ */ i.jsx(Gf, { getHass: e, devices: r, status: a, limits: o, onOpenDevice: p }),
        c === "stats" && r.length > 0 && /* @__PURE__ */ i.jsx(Rc, { getHass: e, devices: r }),
        c === "settings" && r.length > 0 && /* @__PURE__ */ i.jsx(sh, { getHass: e, devices: r, status: a })
      ] }),
      k && /* @__PURE__ */ i.jsx(
        lh,
        {
          getHass: e,
          roomId: k,
          several: r.length > 1,
          onClose: () => C(null)
        }
      )
    ] })
  ] });
}
const mh = (
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
class gh extends HTMLElement {
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
      r.textContent = mh;
      const l = document.createElement("div");
      n.append(r, l), this._root = $c(l);
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
        hh,
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
customElements.get("hive-local-panel") || customElements.define("hive-local-panel", gh);
