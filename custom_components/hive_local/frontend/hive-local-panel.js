var bc = Object.defineProperty;
var zc = (e, t, n) => t in e ? bc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var pr = (e, t, n) => zc(e, typeof t != "symbol" ? t + "" : t, n);
var as = { exports: {} }, gl = {}, ss = { exports: {} }, D = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ar = Symbol.for("react.element"), Pc = Symbol.for("react.portal"), Tc = Symbol.for("react.fragment"), $c = Symbol.for("react.strict_mode"), Lc = Symbol.for("react.profiler"), Mc = Symbol.for("react.provider"), Rc = Symbol.for("react.context"), Oc = Symbol.for("react.forward_ref"), Fc = Symbol.for("react.suspense"), Dc = Symbol.for("react.memo"), Ic = Symbol.for("react.lazy"), Xi = Symbol.iterator;
function Ac(e) {
  return e === null || typeof e != "object" ? null : (e = Xi && e[Xi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var us = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, cs = Object.assign, ds = {};
function xn(e, t, n) {
  this.props = e, this.context = t, this.refs = ds, this.updater = n || us;
}
xn.prototype.isReactComponent = {};
xn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
xn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function fs() {
}
fs.prototype = xn.prototype;
function ti(e, t, n) {
  this.props = e, this.context = t, this.refs = ds, this.updater = n || us;
}
var ni = ti.prototype = new fs();
ni.constructor = ti;
cs(ni, xn.prototype);
ni.isPureReactComponent = !0;
var Gi = Array.isArray, ps = Object.prototype.hasOwnProperty, ri = { current: null }, hs = { key: !0, ref: !0, __self: !0, __source: !0 };
function ms(e, t, n) {
  var r, l = {}, o = null, a = null;
  if (t != null) for (r in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t) ps.call(t, r) && !hs.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in s = e.defaultProps, s) l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: ar, type: e, key: o, ref: a, props: l, _owner: ri.current };
}
function Uc(e, t) {
  return { $$typeof: ar, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function li(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ar;
}
function Bc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Zi = /\/+/g;
function Ml(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Bc("" + e.key) : t.toString(36);
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
        case Pc:
          a = !0;
      }
  }
  if (a) return a = e, l = l(a), e = r === "" ? "." + Ml(a, 0) : r, Gi(l) ? (n = "", e != null && (n = e.replace(Zi, "$&/") + "/"), $r(l, t, n, "", function(c) {
    return c;
  })) : l != null && (li(l) && (l = Uc(l, n + (!l.key || a && a.key === l.key ? "" : ("" + l.key).replace(Zi, "$&/") + "/") + e)), t.push(l)), 1;
  if (a = 0, r = r === "" ? "." : r + ":", Gi(e)) for (var s = 0; s < e.length; s++) {
    o = e[s];
    var u = r + Ml(o, s);
    a += $r(o, t, n, u, l);
  }
  else if (u = Ac(e), typeof u == "function") for (e = u.call(e), s = 0; !(o = e.next()).done; ) o = o.value, u = r + Ml(o, s++), a += $r(o, t, n, u, l);
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
function Hc(e) {
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
var me = { current: null }, Lr = { transition: null }, Wc = { ReactCurrentDispatcher: me, ReactCurrentBatchConfig: Lr, ReactCurrentOwner: ri };
function vs() {
  throw Error("act(...) is not supported in production builds of React.");
}
D.Children = { map: hr, forEach: function(e, t, n) {
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
D.Component = xn;
D.Fragment = Tc;
D.Profiler = Lc;
D.PureComponent = ti;
D.StrictMode = $c;
D.Suspense = Fc;
D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Wc;
D.act = vs;
D.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = cs({}, e.props), l = e.key, o = e.ref, a = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, a = ri.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
    for (u in t) ps.call(t, u) && !hs.hasOwnProperty(u) && (r[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u]);
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
D.createContext = function(e) {
  return e = { $$typeof: Rc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Mc, _context: e }, e.Consumer = e;
};
D.createElement = ms;
D.createFactory = function(e) {
  var t = ms.bind(null, e);
  return t.type = e, t;
};
D.createRef = function() {
  return { current: null };
};
D.forwardRef = function(e) {
  return { $$typeof: Oc, render: e };
};
D.isValidElement = li;
D.lazy = function(e) {
  return { $$typeof: Ic, _payload: { _status: -1, _result: e }, _init: Hc };
};
D.memo = function(e, t) {
  return { $$typeof: Dc, type: e, compare: t === void 0 ? null : t };
};
D.startTransition = function(e) {
  var t = Lr.transition;
  Lr.transition = {};
  try {
    e();
  } finally {
    Lr.transition = t;
  }
};
D.unstable_act = vs;
D.useCallback = function(e, t) {
  return me.current.useCallback(e, t);
};
D.useContext = function(e) {
  return me.current.useContext(e);
};
D.useDebugValue = function() {
};
D.useDeferredValue = function(e) {
  return me.current.useDeferredValue(e);
};
D.useEffect = function(e, t) {
  return me.current.useEffect(e, t);
};
D.useId = function() {
  return me.current.useId();
};
D.useImperativeHandle = function(e, t, n) {
  return me.current.useImperativeHandle(e, t, n);
};
D.useInsertionEffect = function(e, t) {
  return me.current.useInsertionEffect(e, t);
};
D.useLayoutEffect = function(e, t) {
  return me.current.useLayoutEffect(e, t);
};
D.useMemo = function(e, t) {
  return me.current.useMemo(e, t);
};
D.useReducer = function(e, t, n) {
  return me.current.useReducer(e, t, n);
};
D.useRef = function(e) {
  return me.current.useRef(e);
};
D.useState = function(e) {
  return me.current.useState(e);
};
D.useSyncExternalStore = function(e, t, n) {
  return me.current.useSyncExternalStore(e, t, n);
};
D.useTransition = function() {
  return me.current.useTransition();
};
D.version = "18.3.1";
ss.exports = D;
var S = ss.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vc = S, Qc = Symbol.for("react.element"), Kc = Symbol.for("react.fragment"), Yc = Object.prototype.hasOwnProperty, Xc = Vc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Gc = { key: !0, ref: !0, __self: !0, __source: !0 };
function gs(e, t, n) {
  var r, l = {}, o = null, a = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (r in t) Yc.call(t, r) && !Gc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Qc, type: e, key: o, ref: a, props: l, _owner: Xc.current };
}
gl.Fragment = Kc;
gl.jsx = gs;
gl.jsxs = gs;
as.exports = gl;
var i = as.exports, xs = { exports: {} }, Ee = {}, ys = { exports: {} }, ws = {};
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
  function t(z, O) {
    var _ = z.length;
    z.push(O);
    e: for (; 0 < _; ) {
      var L = _ - 1 >>> 1, F = z[L];
      if (0 < l(F, O)) z[L] = O, z[_] = F, _ = L;
      else break e;
    }
  }
  function n(z) {
    return z.length === 0 ? null : z[0];
  }
  function r(z) {
    if (z.length === 0) return null;
    var O = z[0], _ = z.pop();
    if (_ !== O) {
      z[0] = _;
      e: for (var L = 0, F = z.length, ie = F >>> 1; L < ie; ) {
        var ee = 2 * (L + 1) - 1, Wt = z[ee], Be = ee + 1, A = z[Be];
        if (0 > l(Wt, _)) Be < F && 0 > l(A, Wt) ? (z[L] = A, z[Be] = _, L = Be) : (z[L] = Wt, z[ee] = _, L = ee);
        else if (Be < F && 0 > l(A, _)) z[L] = A, z[Be] = _, L = Be;
        else break e;
      }
    }
    return O;
  }
  function l(z, O) {
    var _ = z.sortIndex - O.sortIndex;
    return _ !== 0 ? _ : z.id - O.id;
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
  var u = [], c = [], g = 1, v = null, h = 3, m = !1, w = !1, y = !1, C = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function f(z) {
    for (var O = n(c); O !== null; ) {
      if (O.callback === null) r(c);
      else if (O.startTime <= z) r(c), O.sortIndex = O.expirationTime, t(u, O);
      else break;
      O = n(c);
    }
  }
  function x(z) {
    if (y = !1, f(z), !w) if (n(u) !== null) w = !0, ot(k);
    else {
      var O = n(c);
      O !== null && Et(x, O.startTime - z);
    }
  }
  function k(z, O) {
    w = !1, y && (y = !1, p(b), b = -1), m = !0;
    var _ = h;
    try {
      for (f(O), v = n(u); v !== null && (!(v.expirationTime > O) || z && !R()); ) {
        var L = v.callback;
        if (typeof L == "function") {
          v.callback = null, h = v.priorityLevel;
          var F = L(v.expirationTime <= O);
          O = e.unstable_now(), typeof F == "function" ? v.callback = F : v === n(u) && r(u), f(O);
        } else r(u);
        v = n(u);
      }
      if (v !== null) var ie = !0;
      else {
        var ee = n(c);
        ee !== null && Et(x, ee.startTime - O), ie = !1;
      }
      return ie;
    } finally {
      v = null, h = _, m = !1;
    }
  }
  var j = !1, P = null, b = -1, E = 5, M = -1;
  function R() {
    return !(e.unstable_now() - M < E);
  }
  function ge() {
    if (P !== null) {
      var z = e.unstable_now();
      M = z;
      var O = !0;
      try {
        O = P(!0, z);
      } finally {
        O ? de() : (j = !1, P = null);
      }
    } else j = !1;
  }
  var de;
  if (typeof d == "function") de = function() {
    d(ge);
  };
  else if (typeof MessageChannel < "u") {
    var lt = new MessageChannel(), Ct = lt.port2;
    lt.port1.onmessage = ge, de = function() {
      Ct.postMessage(null);
    };
  } else de = function() {
    C(ge, 0);
  };
  function ot(z) {
    P = z, j || (j = !0, de());
  }
  function Et(z, O) {
    b = C(function() {
      z(e.unstable_now());
    }, O);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(z) {
    z.callback = null;
  }, e.unstable_continueExecution = function() {
    w || m || (w = !0, ot(k));
  }, e.unstable_forceFrameRate = function(z) {
    0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : E = 0 < z ? Math.floor(1e3 / z) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(z) {
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
      return z();
    } finally {
      h = _;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(z, O) {
    switch (z) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        z = 3;
    }
    var _ = h;
    h = z;
    try {
      return O();
    } finally {
      h = _;
    }
  }, e.unstable_scheduleCallback = function(z, O, _) {
    var L = e.unstable_now();
    switch (typeof _ == "object" && _ !== null ? (_ = _.delay, _ = typeof _ == "number" && 0 < _ ? L + _ : L) : _ = L, z) {
      case 1:
        var F = -1;
        break;
      case 2:
        F = 250;
        break;
      case 5:
        F = 1073741823;
        break;
      case 4:
        F = 1e4;
        break;
      default:
        F = 5e3;
    }
    return F = _ + F, z = { id: g++, callback: O, priorityLevel: z, startTime: _, expirationTime: F, sortIndex: -1 }, _ > L ? (z.sortIndex = _, t(c, z), n(u) === null && z === n(c) && (y ? (p(b), b = -1) : y = !0, Et(x, _ - L))) : (z.sortIndex = F, t(u, z), w || m || (w = !0, ot(k))), z;
  }, e.unstable_shouldYield = R, e.unstable_wrapCallback = function(z) {
    var O = h;
    return function() {
      var _ = h;
      h = O;
      try {
        return z.apply(this, arguments);
      } finally {
        h = _;
      }
    };
  };
})(ws);
ys.exports = ws;
var Zc = ys.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jc = S, Ce = Zc;
function N(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ks = /* @__PURE__ */ new Set(), Wn = {};
function Bt(e, t) {
  dn(e, t), dn(e + "Capture", t);
}
function dn(e, t) {
  for (Wn[e] = t, e = 0; e < t.length; e++) ks.add(t[e]);
}
var qe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ao = Object.prototype.hasOwnProperty, qc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ji = {}, qi = {};
function ed(e) {
  return ao.call(qi, e) ? !0 : ao.call(Ji, e) ? !1 : qc.test(e) ? qi[e] = !0 : (Ji[e] = !0, !1);
}
function td(e, t, n, r) {
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
function nd(e, t, n, r) {
  if (t === null || typeof t > "u" || td(e, t, n, r)) return !0;
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
function ve(e, t, n, r, l, o, a) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = a;
}
var oe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  oe[e] = new ve(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  oe[t] = new ve(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  oe[e] = new ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  oe[e] = new ve(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  oe[e] = new ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  oe[e] = new ve(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  oe[e] = new ve(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  oe[e] = new ve(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  oe[e] = new ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
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
  oe[t] = new ve(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(oi, ii);
  oe[t] = new ve(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(oi, ii);
  oe[t] = new ve(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  oe[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
oe.xlinkHref = new ve("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  oe[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ai(e, t, n, r) {
  var l = oe.hasOwnProperty(t) ? oe[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (nd(t, n, l, r) && (n = null), r || l === null ? ed(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var rt = Jc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, mr = Symbol.for("react.element"), Qt = Symbol.for("react.portal"), Kt = Symbol.for("react.fragment"), si = Symbol.for("react.strict_mode"), so = Symbol.for("react.profiler"), js = Symbol.for("react.provider"), Ss = Symbol.for("react.context"), ui = Symbol.for("react.forward_ref"), uo = Symbol.for("react.suspense"), co = Symbol.for("react.suspense_list"), ci = Symbol.for("react.memo"), at = Symbol.for("react.lazy"), Ns = Symbol.for("react.offscreen"), ea = Symbol.iterator;
function kn(e) {
  return e === null || typeof e != "object" ? null : (e = ea && e[ea] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Y = Object.assign, Rl;
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
function rd(e) {
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
    case Ss:
      return (e.displayName || "Context") + ".Consumer";
    case js:
      return (e._context.displayName || "Context") + ".Provider";
    case ui:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case ci:
      return t = e.displayName || null, t !== null ? t : fo(e.type) || "Memo";
    case at:
      t = e._payload, e = e._init;
      try {
        return fo(e(t));
      } catch {
      }
  }
  return null;
}
function ld(e) {
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
function _s(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function od(e) {
  var t = _s(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
  e._valueTracker || (e._valueTracker = od(e));
}
function Cs(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = _s(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
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
  return Y({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function ta(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = kt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Es(e, t) {
  t = t.checked, t != null && ai(e, "checked", t, !1);
}
function ho(e, t) {
  Es(e, t);
  var n = kt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? mo(e, t.type, n) : t.hasOwnProperty("defaultValue") && mo(e, t.type, kt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
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
function vo(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
  return Y({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
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
  e._wrapperState = { initialValue: kt(n) };
}
function bs(e, t) {
  var n = kt(t.value), r = kt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function la(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function zs(e) {
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
  return e == null || e === "http://www.w3.org/1999/xhtml" ? zs(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var gr, Ps = function(e) {
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
}, id = ["Webkit", "ms", "Moz", "O"];
Object.keys(Mn).forEach(function(e) {
  id.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Mn[t] = Mn[e];
  });
});
function Ts(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Mn.hasOwnProperty(e) && Mn[e] ? ("" + t).trim() : t + "px";
}
function $s(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Ts(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var ad = Y({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function xo(e, t) {
  if (t) {
    if (ad[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(N(137, e));
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
function Ls(e) {
  on ? an ? an.push(e) : an = [e] : on = e;
}
function Ms() {
  if (on) {
    var e = on, t = an;
    if (an = on = null, oa(e), t) for (e = 0; e < t.length; e++) oa(t[e]);
  }
}
function Rs(e, t) {
  return e(t);
}
function Os() {
}
var Dl = !1;
function Fs(e, t, n) {
  if (Dl) return e(t, n);
  Dl = !0;
  try {
    return Rs(e, t, n);
  } finally {
    Dl = !1, (on !== null || an !== null) && (Os(), Ms());
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
if (qe) try {
  var jn = {};
  Object.defineProperty(jn, "passive", { get: function() {
    jo = !0;
  } }), window.addEventListener("test", jn, jn), window.removeEventListener("test", jn, jn);
} catch {
  jo = !1;
}
function sd(e, t, n, r, l, o, a, s, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (g) {
    this.onError(g);
  }
}
var Rn = !1, Kr = null, Yr = !1, So = null, ud = { onError: function(e) {
  Rn = !0, Kr = e;
} };
function cd(e, t, n, r, l, o, a, s, u) {
  Rn = !1, Kr = null, sd.apply(ud, arguments);
}
function dd(e, t, n, r, l, o, a, s, u) {
  if (cd.apply(this, arguments), Rn) {
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
function Ds(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function ia(e) {
  if (Ht(e) !== e) throw Error(N(188));
}
function fd(e) {
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
function Is(e) {
  return e = fd(e), e !== null ? As(e) : null;
}
function As(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = As(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Us = Ce.unstable_scheduleCallback, aa = Ce.unstable_cancelCallback, pd = Ce.unstable_shouldYield, hd = Ce.unstable_requestPaint, G = Ce.unstable_now, md = Ce.unstable_getCurrentPriorityLevel, fi = Ce.unstable_ImmediatePriority, Bs = Ce.unstable_UserBlockingPriority, Xr = Ce.unstable_NormalPriority, vd = Ce.unstable_LowPriority, Hs = Ce.unstable_IdlePriority, xl = null, Qe = null;
function gd(e) {
  if (Qe && typeof Qe.onCommitFiberRoot == "function") try {
    Qe.onCommitFiberRoot(xl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ie = Math.clz32 ? Math.clz32 : wd, xd = Math.log, yd = Math.LN2;
function wd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (xd(e) / yd | 0) | 0;
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
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Ie(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function kd(e, t) {
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
    var a = 31 - Ie(o), s = 1 << a, u = l[a];
    u === -1 ? (!(s & n) || s & r) && (l[a] = kd(s, t)) : u <= t && (e.expiredLanes |= s), o &= ~s;
  }
}
function No(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ws() {
  var e = xr;
  return xr <<= 1, !(xr & 4194240) && (xr = 64), e;
}
function Il(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function sr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ie(t), e[t] = n;
}
function Sd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Ie(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function pi(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Ie(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var U = 0;
function Vs(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Qs, hi, Ks, Ys, Xs, _o = !1, wr = [], pt = null, ht = null, mt = null, Kn = /* @__PURE__ */ new Map(), Yn = /* @__PURE__ */ new Map(), ut = [], Nd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function sa(e, t) {
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
function _d(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return pt = Sn(pt, e, t, n, r, l), !0;
    case "dragenter":
      return ht = Sn(ht, e, t, n, r, l), !0;
    case "mouseover":
      return mt = Sn(mt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Kn.set(o, Sn(Kn.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Yn.set(o, Sn(Yn.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Gs(e) {
  var t = Tt(e.target);
  if (t !== null) {
    var n = Ht(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ds(n), t !== null) {
          e.blockedOn = t, Xs(e.priority, function() {
            Ks(n);
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
function Cd() {
  _o = !1, pt !== null && Mr(pt) && (pt = null), ht !== null && Mr(ht) && (ht = null), mt !== null && Mr(mt) && (mt = null), Kn.forEach(ua), Yn.forEach(ua);
}
function Nn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, _o || (_o = !0, Ce.unstable_scheduleCallback(Ce.unstable_NormalPriority, Cd)));
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
  for (pt !== null && Nn(pt, e), ht !== null && Nn(ht, e), mt !== null && Nn(mt, e), Kn.forEach(t), Yn.forEach(t), n = 0; n < ut.length; n++) r = ut[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ut.length && (n = ut[0], n.blockedOn === null); ) Gs(n), n.blockedOn === null && ut.shift();
}
var sn = rt.ReactCurrentBatchConfig, Zr = !0;
function Ed(e, t, n, r) {
  var l = U, o = sn.transition;
  sn.transition = null;
  try {
    U = 1, mi(e, t, n, r);
  } finally {
    U = l, sn.transition = o;
  }
}
function bd(e, t, n, r) {
  var l = U, o = sn.transition;
  sn.transition = null;
  try {
    U = 4, mi(e, t, n, r);
  } finally {
    U = l, sn.transition = o;
  }
}
function mi(e, t, n, r) {
  if (Zr) {
    var l = Co(e, t, n, r);
    if (l === null) Xl(e, t, r, Jr, n), sa(e, r);
    else if (_d(l, e, t, n, r)) r.stopPropagation();
    else if (sa(e, r), t & 4 && -1 < Nd.indexOf(e)) {
      for (; l !== null; ) {
        var o = cr(l);
        if (o !== null && Qs(o), o = Co(e, t, n, r), o === null && Xl(e, t, r, Jr, n), o === l) break;
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
    if (e = Ds(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Jr = e, null;
}
function Zs(e) {
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
      switch (md()) {
        case fi:
          return 1;
        case Bs:
          return 4;
        case Xr:
        case vd:
          return 16;
        case Hs:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var dt = null, vi = null, Rr = null;
function Js() {
  if (Rr) return Rr;
  var e, t = vi, n = t.length, r, l = "value" in dt ? dt.value : dt.textContent, o = l.length;
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
function be(e) {
  function t(n, r, l, o, a) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = a, this.currentTarget = null;
    for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(o) : o[s]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? kr : ca, this.isPropagationStopped = ca, this;
  }
  return Y(t.prototype, { preventDefault: function() {
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
}, defaultPrevented: 0, isTrusted: 0 }, gi = be(yn), ur = Y({}, yn, { view: 0, detail: 0 }), zd = be(ur), Al, Ul, _n, yl = Y({}, ur, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: xi, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== _n && (_n && e.type === "mousemove" ? (Al = e.screenX - _n.screenX, Ul = e.screenY - _n.screenY) : Ul = Al = 0, _n = e), Al);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ul;
} }), da = be(yl), Pd = Y({}, yl, { dataTransfer: 0 }), Td = be(Pd), $d = Y({}, ur, { relatedTarget: 0 }), Bl = be($d), Ld = Y({}, yn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Md = be(Ld), Rd = Y({}, yn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Od = be(Rd), Fd = Y({}, yn, { data: 0 }), fa = be(Fd), Dd = {
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
}, Id = {
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
}, Ad = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Ud(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Ad[e]) ? !!t[e] : !1;
}
function xi() {
  return Ud;
}
var Bd = Y({}, ur, { key: function(e) {
  if (e.key) {
    var t = Dd[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Or(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Id[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: xi, charCode: function(e) {
  return e.type === "keypress" ? Or(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Or(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Hd = be(Bd), Wd = Y({}, yl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), pa = be(Wd), Vd = Y({}, ur, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: xi }), Qd = be(Vd), Kd = Y({}, yn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Yd = be(Kd), Xd = Y({}, yl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Gd = be(Xd), Zd = [9, 13, 27, 32], yi = qe && "CompositionEvent" in window, On = null;
qe && "documentMode" in document && (On = document.documentMode);
var Jd = qe && "TextEvent" in window && !On, qs = qe && (!yi || On && 8 < On && 11 >= On), ha = " ", ma = !1;
function eu(e, t) {
  switch (e) {
    case "keyup":
      return Zd.indexOf(t.keyCode) !== -1;
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
function tu(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Yt = !1;
function qd(e, t) {
  switch (e) {
    case "compositionend":
      return tu(t);
    case "keypress":
      return t.which !== 32 ? null : (ma = !0, ha);
    case "textInput":
      return e = t.data, e === ha && ma ? null : e;
    default:
      return null;
  }
}
function ef(e, t) {
  if (Yt) return e === "compositionend" || !yi && eu(e, t) ? (e = Js(), Rr = vi = dt = null, Yt = !1, e) : null;
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
      return qs && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var tf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function va(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!tf[e.type] : t === "textarea";
}
function nu(e, t, n, r) {
  Ls(r), t = qr(t, "onChange"), 0 < t.length && (n = new gi("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Fn = null, Gn = null;
function nf(e) {
  pu(e, 0);
}
function wl(e) {
  var t = Zt(e);
  if (Cs(t)) return e;
}
function rf(e, t) {
  if (e === "change") return t;
}
var ru = !1;
if (qe) {
  var Hl;
  if (qe) {
    var Wl = "oninput" in document;
    if (!Wl) {
      var ga = document.createElement("div");
      ga.setAttribute("oninput", "return;"), Wl = typeof ga.oninput == "function";
    }
    Hl = Wl;
  } else Hl = !1;
  ru = Hl && (!document.documentMode || 9 < document.documentMode);
}
function xa() {
  Fn && (Fn.detachEvent("onpropertychange", lu), Gn = Fn = null);
}
function lu(e) {
  if (e.propertyName === "value" && wl(Gn)) {
    var t = [];
    nu(t, Gn, e, di(e)), Fs(nf, t);
  }
}
function lf(e, t, n) {
  e === "focusin" ? (xa(), Fn = t, Gn = n, Fn.attachEvent("onpropertychange", lu)) : e === "focusout" && xa();
}
function of(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return wl(Gn);
}
function af(e, t) {
  if (e === "click") return wl(t);
}
function sf(e, t) {
  if (e === "input" || e === "change") return wl(t);
}
function uf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ue = typeof Object.is == "function" ? Object.is : uf;
function Zn(e, t) {
  if (Ue(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ao.call(t, l) || !Ue(e[l], t[l])) return !1;
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
function ou(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ou(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function iu() {
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
function cf(e) {
  var t = iu(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && ou(n.ownerDocument.documentElement, n)) {
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
var df = qe && "documentMode" in document && 11 >= document.documentMode, Xt = null, Eo = null, Dn = null, bo = !1;
function ka(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  bo || Xt == null || Xt !== Qr(r) || (r = Xt, "selectionStart" in r && wi(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Dn && Zn(Dn, r) || (Dn = r, r = qr(Eo, "onSelect"), 0 < r.length && (t = new gi("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Xt)));
}
function jr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Gt = { animationend: jr("Animation", "AnimationEnd"), animationiteration: jr("Animation", "AnimationIteration"), animationstart: jr("Animation", "AnimationStart"), transitionend: jr("Transition", "TransitionEnd") }, Vl = {}, au = {};
qe && (au = document.createElement("div").style, "AnimationEvent" in window || (delete Gt.animationend.animation, delete Gt.animationiteration.animation, delete Gt.animationstart.animation), "TransitionEvent" in window || delete Gt.transitionend.transition);
function kl(e) {
  if (Vl[e]) return Vl[e];
  if (!Gt[e]) return e;
  var t = Gt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in au) return Vl[e] = t[n];
  return e;
}
var su = kl("animationend"), uu = kl("animationiteration"), cu = kl("animationstart"), du = kl("transitionend"), fu = /* @__PURE__ */ new Map(), ja = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function St(e, t) {
  fu.set(e, t), Bt(t, [e]);
}
for (var Ql = 0; Ql < ja.length; Ql++) {
  var Kl = ja[Ql], ff = Kl.toLowerCase(), pf = Kl[0].toUpperCase() + Kl.slice(1);
  St(ff, "on" + pf);
}
St(su, "onAnimationEnd");
St(uu, "onAnimationIteration");
St(cu, "onAnimationStart");
St("dblclick", "onDoubleClick");
St("focusin", "onFocus");
St("focusout", "onBlur");
St(du, "onTransitionEnd");
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
var Ln = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), hf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ln));
function Sa(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, dd(r, t, void 0, e), e.currentTarget = null;
}
function pu(e, t) {
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
function H(e, t) {
  var n = t[Lo];
  n === void 0 && (n = t[Lo] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (hu(t, e, 2, !1), n.add(r));
}
function Yl(e, t, n) {
  var r = 0;
  t && (r |= 4), hu(n, e, r, t);
}
var Sr = "_reactListening" + Math.random().toString(36).slice(2);
function Jn(e) {
  if (!e[Sr]) {
    e[Sr] = !0, ks.forEach(function(n) {
      n !== "selectionchange" && (hf.has(n) || Yl(n, !1, e), Yl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Sr] || (t[Sr] = !0, Yl("selectionchange", !1, t));
  }
}
function hu(e, t, n, r) {
  switch (Zs(t)) {
    case 1:
      var l = Ed;
      break;
    case 4:
      l = bd;
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
  Fs(function() {
    var c = o, g = di(n), v = [];
    e: {
      var h = fu.get(e);
      if (h !== void 0) {
        var m = gi, w = e;
        switch (e) {
          case "keypress":
            if (Or(n) === 0) break e;
          case "keydown":
          case "keyup":
            m = Hd;
            break;
          case "focusin":
            w = "focus", m = Bl;
            break;
          case "focusout":
            w = "blur", m = Bl;
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
            m = Td;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = Qd;
            break;
          case su:
          case uu:
          case cu:
            m = Md;
            break;
          case du:
            m = Yd;
            break;
          case "scroll":
            m = zd;
            break;
          case "wheel":
            m = Gd;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = Od;
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
        var y = (t & 4) !== 0, C = !y && e === "scroll", p = y ? h !== null ? h + "Capture" : null : h;
        y = [];
        for (var d = c, f; d !== null; ) {
          f = d;
          var x = f.stateNode;
          if (f.tag === 5 && x !== null && (f = x, p !== null && (x = Qn(d, p), x != null && y.push(qn(d, x, f)))), C) break;
          d = d.return;
        }
        0 < y.length && (h = new m(h, w, null, n, g), v.push({ event: h, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", m = e === "mouseout" || e === "pointerout", h && n !== wo && (w = n.relatedTarget || n.fromElement) && (Tt(w) || w[et])) break e;
        if ((m || h) && (h = g.window === g ? g : (h = g.ownerDocument) ? h.defaultView || h.parentWindow : window, m ? (w = n.relatedTarget || n.toElement, m = c, w = w ? Tt(w) : null, w !== null && (C = Ht(w), w !== C || w.tag !== 5 && w.tag !== 6) && (w = null)) : (m = null, w = c), m !== w)) {
          if (y = da, x = "onMouseLeave", p = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (y = pa, x = "onPointerLeave", p = "onPointerEnter", d = "pointer"), C = m == null ? h : Zt(m), f = w == null ? h : Zt(w), h = new y(x, d + "leave", m, n, g), h.target = C, h.relatedTarget = f, x = null, Tt(g) === c && (y = new y(p, d + "enter", w, n, g), y.target = f, y.relatedTarget = C, x = y), C = x, m && w) t: {
            for (y = m, p = w, d = 0, f = y; f; f = Vt(f)) d++;
            for (f = 0, x = p; x; x = Vt(x)) f++;
            for (; 0 < d - f; ) y = Vt(y), d--;
            for (; 0 < f - d; ) p = Vt(p), f--;
            for (; d--; ) {
              if (y === p || p !== null && y === p.alternate) break t;
              y = Vt(y), p = Vt(p);
            }
            y = null;
          }
          else y = null;
          m !== null && Na(v, h, m, y, !1), w !== null && C !== null && Na(v, C, w, y, !0);
        }
      }
      e: {
        if (h = c ? Zt(c) : window, m = h.nodeName && h.nodeName.toLowerCase(), m === "select" || m === "input" && h.type === "file") var k = rf;
        else if (va(h)) if (ru) k = sf;
        else {
          k = of;
          var j = lf;
        }
        else (m = h.nodeName) && m.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (k = af);
        if (k && (k = k(e, c))) {
          nu(v, k, n, g);
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
          if (df) break;
        case "keydown":
        case "keyup":
          ka(v, n, g);
      }
      var P;
      if (yi) e: {
        switch (e) {
          case "compositionstart":
            var b = "onCompositionStart";
            break e;
          case "compositionend":
            b = "onCompositionEnd";
            break e;
          case "compositionupdate":
            b = "onCompositionUpdate";
            break e;
        }
        b = void 0;
      }
      else Yt ? eu(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
      b && (qs && n.locale !== "ko" && (Yt || b !== "onCompositionStart" ? b === "onCompositionEnd" && Yt && (P = Js()) : (dt = g, vi = "value" in dt ? dt.value : dt.textContent, Yt = !0)), j = qr(c, b), 0 < j.length && (b = new fa(b, e, null, n, g), v.push({ event: b, listeners: j }), P ? b.data = P : (P = tu(n), P !== null && (b.data = P)))), (P = Jd ? qd(e, n) : ef(e, n)) && (c = qr(c, "onBeforeInput"), 0 < c.length && (g = new fa("onBeforeInput", "beforeinput", null, n, g), v.push({ event: g, listeners: c }), g.data = P));
    }
    pu(v, t);
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
var mf = /\r\n?/g, vf = /\u0000|\uFFFD/g;
function _a(e) {
  return (typeof e == "string" ? e : "" + e).replace(mf, `
`).replace(vf, "");
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
var $o = typeof setTimeout == "function" ? setTimeout : void 0, gf = typeof clearTimeout == "function" ? clearTimeout : void 0, Ca = typeof Promise == "function" ? Promise : void 0, xf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ca < "u" ? function(e) {
  return Ca.resolve(null).then(e).catch(yf);
} : $o;
function yf(e) {
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
var wn = Math.random().toString(36).slice(2), Ve = "__reactFiber$" + wn, er = "__reactProps$" + wn, et = "__reactContainer$" + wn, Lo = "__reactEvents$" + wn, wf = "__reactListeners$" + wn, kf = "__reactHandles$" + wn;
function Tt(e) {
  var t = e[Ve];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[et] || n[Ve]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ea(e); e !== null; ) {
        if (n = e[Ve]) return n;
        e = Ea(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function cr(e) {
  return e = e[Ve] || e[et], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Zt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(N(33));
}
function jl(e) {
  return e[er] || null;
}
var Mo = [], Jt = -1;
function Nt(e) {
  return { current: e };
}
function W(e) {
  0 > Jt || (e.current = Mo[Jt], Mo[Jt] = null, Jt--);
}
function B(e, t) {
  Jt++, Mo[Jt] = e.current, e.current = t;
}
var jt = {}, ce = Nt(jt), we = Nt(!1), Ft = jt;
function fn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return jt;
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
  W(we), W(ce);
}
function ba(e, t, n) {
  if (ce.current !== jt) throw Error(N(168));
  B(ce, t), B(we, n);
}
function mu(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(N(108, ld(e) || "Unknown", l));
  return Y({}, n, r);
}
function nl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || jt, Ft = ce.current, B(ce, e), B(we, we.current), !0;
}
function za(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(N(169));
  n ? (e = mu(e, t, Ft), r.__reactInternalMemoizedMergedChildContext = e, W(we), W(ce), B(ce, e)) : W(we), B(we, n);
}
var Xe = null, Sl = !1, Zl = !1;
function vu(e) {
  Xe === null ? Xe = [e] : Xe.push(e);
}
function jf(e) {
  Sl = !0, vu(e);
}
function _t() {
  if (!Zl && Xe !== null) {
    Zl = !0;
    var e = 0, t = U;
    try {
      var n = Xe;
      for (U = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Xe = null, Sl = !1;
    } catch (l) {
      throw Xe !== null && (Xe = Xe.slice(e + 1)), Us(fi, _t), l;
    } finally {
      U = t, Zl = !1;
    }
  }
  return null;
}
var qt = [], en = 0, rl = null, ll = 0, ze = [], Pe = 0, Dt = null, Ge = 1, Ze = "";
function zt(e, t) {
  qt[en++] = ll, qt[en++] = rl, rl = e, ll = t;
}
function gu(e, t, n) {
  ze[Pe++] = Ge, ze[Pe++] = Ze, ze[Pe++] = Dt, Dt = e;
  var r = Ge;
  e = Ze;
  var l = 32 - Ie(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - Ie(t) + l;
  if (30 < o) {
    var a = l - l % 5;
    o = (r & (1 << a) - 1).toString(32), r >>= a, l -= a, Ge = 1 << 32 - Ie(t) + l | n << l | r, Ze = o + e;
  } else Ge = 1 << o | n << l | r, Ze = e;
}
function ki(e) {
  e.return !== null && (zt(e, 1), gu(e, 1, 0));
}
function ji(e) {
  for (; e === rl; ) rl = qt[--en], qt[en] = null, ll = qt[--en], qt[en] = null;
  for (; e === Dt; ) Dt = ze[--Pe], ze[Pe] = null, Ze = ze[--Pe], ze[Pe] = null, Ge = ze[--Pe], ze[Pe] = null;
}
var _e = null, Ne = null, V = !1, De = null;
function xu(e, t) {
  var n = Te(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Pa(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, _e = e, Ne = vt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, _e = e, Ne = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Dt !== null ? { id: Ge, overflow: Ze } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Te(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, _e = e, Ne = null, !0) : !1;
    default:
      return !1;
  }
}
function Ro(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Oo(e) {
  if (V) {
    var t = Ne;
    if (t) {
      var n = t;
      if (!Pa(e, t)) {
        if (Ro(e)) throw Error(N(418));
        t = vt(n.nextSibling);
        var r = _e;
        t && Pa(e, t) ? xu(r, n) : (e.flags = e.flags & -4097 | 2, V = !1, _e = e);
      }
    } else {
      if (Ro(e)) throw Error(N(418));
      e.flags = e.flags & -4097 | 2, V = !1, _e = e;
    }
  }
}
function Ta(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  _e = e;
}
function _r(e) {
  if (e !== _e) return !1;
  if (!V) return Ta(e), V = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !To(e.type, e.memoizedProps)), t && (t = Ne)) {
    if (Ro(e)) throw yu(), Error(N(418));
    for (; t; ) xu(e, t), t = vt(t.nextSibling);
  }
  if (Ta(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(N(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ne = vt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Ne = null;
    }
  } else Ne = _e ? vt(e.stateNode.nextSibling) : null;
  return !0;
}
function yu() {
  for (var e = Ne; e; ) e = vt(e.nextSibling);
}
function pn() {
  Ne = _e = null, V = !1;
}
function Si(e) {
  De === null ? De = [e] : De.push(e);
}
var Sf = rt.ReactCurrentBatchConfig;
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
function wu(e) {
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
    return p = wt(p, d), p.index = 0, p.sibling = null, p;
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
    return k === Kt ? g(p, d, f.props.children, x, f.key) : d !== null && (d.elementType === k || typeof k == "object" && k !== null && k.$$typeof === at && $a(k) === d.type) ? (x = l(d, f.props), x.ref = Cn(p, d, f), x.return = p, x) : (x = Hr(f.type, f.key, f.props, null, p.mode, x), x.ref = Cn(p, d, f), x.return = p, x);
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
        case at:
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
        case at:
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
        case at:
          var j = x._init;
          return m(p, d, f, j(x._payload), k);
      }
      if (Tn(x) || kn(x)) return p = p.get(f) || null, g(d, p, x, k, null);
      Cr(d, x);
    }
    return null;
  }
  function w(p, d, f, x) {
    for (var k = null, j = null, P = d, b = d = 0, E = null; P !== null && b < f.length; b++) {
      P.index > b ? (E = P, P = null) : E = P.sibling;
      var M = h(p, P, f[b], x);
      if (M === null) {
        P === null && (P = E);
        break;
      }
      e && P && M.alternate === null && t(p, P), d = o(M, d, b), j === null ? k = M : j.sibling = M, j = M, P = E;
    }
    if (b === f.length) return n(p, P), V && zt(p, b), k;
    if (P === null) {
      for (; b < f.length; b++) P = v(p, f[b], x), P !== null && (d = o(P, d, b), j === null ? k = P : j.sibling = P, j = P);
      return V && zt(p, b), k;
    }
    for (P = r(p, P); b < f.length; b++) E = m(P, p, b, f[b], x), E !== null && (e && E.alternate !== null && P.delete(E.key === null ? b : E.key), d = o(E, d, b), j === null ? k = E : j.sibling = E, j = E);
    return e && P.forEach(function(R) {
      return t(p, R);
    }), V && zt(p, b), k;
  }
  function y(p, d, f, x) {
    var k = kn(f);
    if (typeof k != "function") throw Error(N(150));
    if (f = k.call(f), f == null) throw Error(N(151));
    for (var j = k = null, P = d, b = d = 0, E = null, M = f.next(); P !== null && !M.done; b++, M = f.next()) {
      P.index > b ? (E = P, P = null) : E = P.sibling;
      var R = h(p, P, M.value, x);
      if (R === null) {
        P === null && (P = E);
        break;
      }
      e && P && R.alternate === null && t(p, P), d = o(R, d, b), j === null ? k = R : j.sibling = R, j = R, P = E;
    }
    if (M.done) return n(
      p,
      P
    ), V && zt(p, b), k;
    if (P === null) {
      for (; !M.done; b++, M = f.next()) M = v(p, M.value, x), M !== null && (d = o(M, d, b), j === null ? k = M : j.sibling = M, j = M);
      return V && zt(p, b), k;
    }
    for (P = r(p, P); !M.done; b++, M = f.next()) M = m(P, p, b, M.value, x), M !== null && (e && M.alternate !== null && P.delete(M.key === null ? b : M.key), d = o(M, d, b), j === null ? k = M : j.sibling = M, j = M);
    return e && P.forEach(function(ge) {
      return t(p, ge);
    }), V && zt(p, b), k;
  }
  function C(p, d, f, x) {
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
                } else if (j.elementType === k || typeof k == "object" && k !== null && k.$$typeof === at && $a(k) === j.type) {
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
        case at:
          return j = f._init, C(p, d, j(f._payload), x);
      }
      if (Tn(f)) return w(p, d, f, x);
      if (kn(f)) return y(p, d, f, x);
      Cr(p, f);
    }
    return typeof f == "string" && f !== "" || typeof f == "number" ? (f = "" + f, d !== null && d.tag === 6 ? (n(p, d.sibling), d = l(d, f), d.return = p, p = d) : (n(p, d), d = lo(f, p.mode, x), d.return = p, p = d), a(p)) : n(p, d);
  }
  return C;
}
var hn = wu(!0), ku = wu(!1), ol = Nt(null), il = null, tn = null, Ni = null;
function _i() {
  Ni = tn = il = null;
}
function Ci(e) {
  var t = ol.current;
  W(ol), e._currentValue = t;
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
function Le(e) {
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
function ju(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Ei(t)) : (n.next = l.next, l.next = n), t.interleaved = n, tt(e, r);
}
function tt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var st = !1;
function bi(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Su(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Je(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function gt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, I & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, tt(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Ei(r)) : (t.next = l.next, l.next = t), r.interleaved = t, tt(e, n);
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
  st = !1;
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
          var w = e, y = s;
          switch (h = t, m = n, y.tag) {
            case 1:
              if (w = y.payload, typeof w == "function") {
                v = w.call(m, v, h);
                break e;
              }
              v = w;
              break e;
            case 3:
              w.flags = w.flags & -65537 | 128;
            case 0:
              if (w = y.payload, h = typeof w == "function" ? w.call(m, v, h) : w, h == null) break e;
              v = Y({}, v, h);
              break e;
            case 2:
              st = !0;
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
var dr = {}, Ke = Nt(dr), tr = Nt(dr), nr = Nt(dr);
function Lt(e) {
  if (e === dr) throw Error(N(174));
  return e;
}
function zi(e, t) {
  switch (B(nr, t), B(tr, e), B(Ke, dr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : go(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = go(t, e);
  }
  W(Ke), B(Ke, t);
}
function mn() {
  W(Ke), W(tr), W(nr);
}
function Nu(e) {
  Lt(nr.current);
  var t = Lt(Ke.current), n = go(t, e.type);
  t !== n && (B(tr, e), B(Ke, n));
}
function Pi(e) {
  tr.current === e && (W(Ke), W(tr));
}
var Q = Nt(0);
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
var Dr = rt.ReactCurrentDispatcher, ql = rt.ReactCurrentBatchConfig, It = 0, K = null, J = null, te = null, ul = !1, In = !1, rr = 0, Nf = 0;
function ae() {
  throw Error(N(321));
}
function $i(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ue(e[n], t[n])) return !1;
  return !0;
}
function Li(e, t, n, r, l, o) {
  if (It = o, K = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Dr.current = e === null || e.memoizedState === null ? bf : zf, e = n(r, l), In) {
    o = 0;
    do {
      if (In = !1, rr = 0, 25 <= o) throw Error(N(301));
      o += 1, te = J = null, t.updateQueue = null, Dr.current = Pf, e = n(r, l);
    } while (In);
  }
  if (Dr.current = cl, t = J !== null && J.next !== null, It = 0, te = J = K = null, ul = !1, t) throw Error(N(300));
  return e;
}
function Mi() {
  var e = rr !== 0;
  return rr = 0, e;
}
function We() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return te === null ? K.memoizedState = te = e : te = te.next = e, te;
}
function Me() {
  if (J === null) {
    var e = K.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = J.next;
  var t = te === null ? K.memoizedState : te.next;
  if (t !== null) te = t, J = e;
  else {
    if (e === null) throw Error(N(310));
    J = e, e = { memoizedState: J.memoizedState, baseState: J.baseState, baseQueue: J.baseQueue, queue: J.queue, next: null }, te === null ? K.memoizedState = te = e : te = te.next = e;
  }
  return te;
}
function lr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function eo(e) {
  var t = Me(), n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = J, l = r.baseQueue, o = n.pending;
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
        u === null ? (s = u = v, a = r) : u = u.next = v, K.lanes |= g, At |= g;
      }
      c = c.next;
    } while (c !== null && c !== o);
    u === null ? a = r : u.next = s, Ue(r, t.memoizedState) || (ye = !0), t.memoizedState = r, t.baseState = a, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, K.lanes |= o, At |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function to(e) {
  var t = Me(), n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var a = l = l.next;
    do
      o = e(o, a.action), a = a.next;
    while (a !== l);
    Ue(o, t.memoizedState) || (ye = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function _u() {
}
function Cu(e, t) {
  var n = K, r = Me(), l = t(), o = !Ue(r.memoizedState, l);
  if (o && (r.memoizedState = l, ye = !0), r = r.queue, Ri(zu.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || te !== null && te.memoizedState.tag & 1) {
    if (n.flags |= 2048, or(9, bu.bind(null, n, r, l, t), void 0, null), ne === null) throw Error(N(349));
    It & 30 || Eu(n, t, l);
  }
  return l;
}
function Eu(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = K.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, K.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function bu(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Pu(t) && Tu(e);
}
function zu(e, t, n) {
  return n(function() {
    Pu(t) && Tu(e);
  });
}
function Pu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ue(e, n);
  } catch {
    return !0;
  }
}
function Tu(e) {
  var t = tt(e, 1);
  t !== null && Ae(t, e, 1, -1);
}
function Ra(e) {
  var t = We();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: lr, lastRenderedState: e }, t.queue = e, e = e.dispatch = Ef.bind(null, K, e), [t.memoizedState, e];
}
function or(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = K.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, K.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function $u() {
  return Me().memoizedState;
}
function Ir(e, t, n, r) {
  var l = We();
  K.flags |= e, l.memoizedState = or(1 | t, n, void 0, r === void 0 ? null : r);
}
function Nl(e, t, n, r) {
  var l = Me();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (J !== null) {
    var a = J.memoizedState;
    if (o = a.destroy, r !== null && $i(r, a.deps)) {
      l.memoizedState = or(t, n, o, r);
      return;
    }
  }
  K.flags |= e, l.memoizedState = or(1 | t, n, o, r);
}
function Oa(e, t) {
  return Ir(8390656, 8, e, t);
}
function Ri(e, t) {
  return Nl(2048, 8, e, t);
}
function Lu(e, t) {
  return Nl(4, 2, e, t);
}
function Mu(e, t) {
  return Nl(4, 4, e, t);
}
function Ru(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Ou(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Nl(4, 4, Ru.bind(null, t, e), n);
}
function Oi() {
}
function Fu(e, t) {
  var n = Me();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && $i(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Du(e, t) {
  var n = Me();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && $i(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Iu(e, t, n) {
  return It & 21 ? (Ue(n, t) || (n = Ws(), K.lanes |= n, At |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, ye = !0), e.memoizedState = n);
}
function _f(e, t) {
  var n = U;
  U = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = ql.transition;
  ql.transition = {};
  try {
    e(!1), t();
  } finally {
    U = n, ql.transition = r;
  }
}
function Au() {
  return Me().memoizedState;
}
function Cf(e, t, n) {
  var r = yt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Uu(e)) Bu(t, n);
  else if (n = ju(e, t, n, r), n !== null) {
    var l = pe();
    Ae(n, e, r, l), Hu(n, t, r);
  }
}
function Ef(e, t, n) {
  var r = yt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Uu(e)) Bu(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var a = t.lastRenderedState, s = o(a, n);
      if (l.hasEagerState = !0, l.eagerState = s, Ue(s, a)) {
        var u = t.interleaved;
        u === null ? (l.next = l, Ei(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = ju(e, t, l, r), n !== null && (l = pe(), Ae(n, e, r, l), Hu(n, t, r));
  }
}
function Uu(e) {
  var t = e.alternate;
  return e === K || t !== null && t === K;
}
function Bu(e, t) {
  In = ul = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Hu(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, pi(e, n);
  }
}
var cl = { readContext: Le, useCallback: ae, useContext: ae, useEffect: ae, useImperativeHandle: ae, useInsertionEffect: ae, useLayoutEffect: ae, useMemo: ae, useReducer: ae, useRef: ae, useState: ae, useDebugValue: ae, useDeferredValue: ae, useTransition: ae, useMutableSource: ae, useSyncExternalStore: ae, useId: ae, unstable_isNewReconciler: !1 }, bf = { readContext: Le, useCallback: function(e, t) {
  return We().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Le, useEffect: Oa, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ir(
    4194308,
    4,
    Ru.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Ir(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Ir(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = We();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = We();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Cf.bind(null, K, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = We();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ra, useDebugValue: Oi, useDeferredValue: function(e) {
  return We().memoizedState = e;
}, useTransition: function() {
  var e = Ra(!1), t = e[0];
  return e = _f.bind(null, e[1]), We().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = K, l = We();
  if (V) {
    if (n === void 0) throw Error(N(407));
    n = n();
  } else {
    if (n = t(), ne === null) throw Error(N(349));
    It & 30 || Eu(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Oa(zu.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, or(9, bu.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = We(), t = ne.identifierPrefix;
  if (V) {
    var n = Ze, r = Ge;
    n = (r & ~(1 << 32 - Ie(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = rr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Nf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, zf = {
  readContext: Le,
  useCallback: Fu,
  useContext: Le,
  useEffect: Ri,
  useImperativeHandle: Ou,
  useInsertionEffect: Lu,
  useLayoutEffect: Mu,
  useMemo: Du,
  useReducer: eo,
  useRef: $u,
  useState: function() {
    return eo(lr);
  },
  useDebugValue: Oi,
  useDeferredValue: function(e) {
    var t = Me();
    return Iu(t, J.memoizedState, e);
  },
  useTransition: function() {
    var e = eo(lr)[0], t = Me().memoizedState;
    return [e, t];
  },
  useMutableSource: _u,
  useSyncExternalStore: Cu,
  useId: Au,
  unstable_isNewReconciler: !1
}, Pf = { readContext: Le, useCallback: Fu, useContext: Le, useEffect: Ri, useImperativeHandle: Ou, useInsertionEffect: Lu, useLayoutEffect: Mu, useMemo: Du, useReducer: to, useRef: $u, useState: function() {
  return to(lr);
}, useDebugValue: Oi, useDeferredValue: function(e) {
  var t = Me();
  return J === null ? t.memoizedState = e : Iu(t, J.memoizedState, e);
}, useTransition: function() {
  var e = to(lr)[0], t = Me().memoizedState;
  return [e, t];
}, useMutableSource: _u, useSyncExternalStore: Cu, useId: Au, unstable_isNewReconciler: !1 };
function Oe(e, t) {
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
var _l = { isMounted: function(e) {
  return (e = e._reactInternals) ? Ht(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = pe(), l = yt(e), o = Je(r, l);
  o.payload = t, n != null && (o.callback = n), t = gt(e, o, l), t !== null && (Ae(t, e, l, r), Fr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = pe(), l = yt(e), o = Je(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = gt(e, o, l), t !== null && (Ae(t, e, l, r), Fr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = pe(), r = yt(e), l = Je(n, r);
  l.tag = 2, t != null && (l.callback = t), t = gt(e, l, r), t !== null && (Ae(t, e, r, n), Fr(t, e, r));
} };
function Fa(e, t, n, r, l, o, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, a) : t.prototype && t.prototype.isPureReactComponent ? !Zn(n, r) || !Zn(l, o) : !0;
}
function Wu(e, t, n) {
  var r = !1, l = jt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Le(o) : (l = ke(t) ? Ft : ce.current, r = t.contextTypes, o = (r = r != null) ? fn(e, l) : jt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = _l, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Da(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && _l.enqueueReplaceState(t, t.state, null);
}
function Io(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, bi(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = Le(o) : (o = ke(t) ? Ft : ce.current, l.context = fn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Do(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && _l.enqueueReplaceState(l, l.state, null), al(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function vn(e, t) {
  try {
    var n = "", r = t;
    do
      n += rd(r), r = r.return;
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
var Tf = typeof WeakMap == "function" ? WeakMap : Map;
function Vu(e, t, n) {
  n = Je(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    fl || (fl = !0, Go = r), Ao(e, t);
  }, n;
}
function Qu(e, t, n) {
  n = Je(-1, n), n.tag = 3;
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
    Ao(e, t), typeof r != "function" && (xt === null ? xt = /* @__PURE__ */ new Set([this]) : xt.add(this));
    var a = t.stack;
    this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
  }), n;
}
function Ia(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Tf();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Vf.bind(null, e, t, n), t.then(e, e));
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
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Je(-1, 1), t.tag = 2, gt(n, t, 1))), n.lanes |= 1), e);
}
var $f = rt.ReactCurrentOwner, ye = !1;
function fe(e, t, n, r) {
  t.child = e === null ? ku(t, null, n, r) : hn(t, e.child, n, r);
}
function Ba(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return un(t, l), r = Li(e, t, n, r, o, l), n = Mi(), e !== null && !ye ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, nt(e, t, l)) : (V && n && ki(t), t.flags |= 1, fe(e, t, r, l), t.child);
}
function Ha(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Wi(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Ku(e, t, o, r, l)) : (e = Hr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var a = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Zn, n(a, r) && e.ref === t.ref) return nt(e, t, l);
  }
  return t.flags |= 1, e = wt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Ku(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Zn(o, r) && e.ref === t.ref) if (ye = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (ye = !0);
    else return t.lanes = e.lanes, nt(e, t, l);
  }
  return Uo(e, t, n, r, l);
}
function Yu(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, B(rn, Se), Se |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, B(rn, Se), Se |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, B(rn, Se), Se |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, B(rn, Se), Se |= r;
  return fe(e, t, l, n), t.child;
}
function Xu(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Uo(e, t, n, r, l) {
  var o = ke(n) ? Ft : ce.current;
  return o = fn(t, o), un(t, l), n = Li(e, t, n, r, o, l), r = Mi(), e !== null && !ye ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, nt(e, t, l)) : (V && r && ki(t), t.flags |= 1, fe(e, t, n, l), t.child);
}
function Wa(e, t, n, r, l) {
  if (ke(n)) {
    var o = !0;
    nl(t);
  } else o = !1;
  if (un(t, l), t.stateNode === null) Ar(e, t), Wu(t, n, r), Io(t, n, r, l), r = !0;
  else if (e === null) {
    var a = t.stateNode, s = t.memoizedProps;
    a.props = s;
    var u = a.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Le(c) : (c = ke(n) ? Ft : ce.current, c = fn(t, c));
    var g = n.getDerivedStateFromProps, v = typeof g == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    v || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s !== r || u !== c) && Da(t, a, r, c), st = !1;
    var h = t.memoizedState;
    a.state = h, al(t, r, a, l), u = t.memoizedState, s !== r || h !== u || we.current || st ? (typeof g == "function" && (Do(t, n, g, r), u = t.memoizedState), (s = st || Fa(t, n, s, r, h, u, c)) ? (v || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), a.props = r, a.state = u, a.context = c, r = s) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    a = t.stateNode, Su(e, t), s = t.memoizedProps, c = t.type === t.elementType ? s : Oe(t.type, s), a.props = c, v = t.pendingProps, h = a.context, u = n.contextType, typeof u == "object" && u !== null ? u = Le(u) : (u = ke(n) ? Ft : ce.current, u = fn(t, u));
    var m = n.getDerivedStateFromProps;
    (g = typeof m == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s !== v || h !== u) && Da(t, a, r, u), st = !1, h = t.memoizedState, a.state = h, al(t, r, a, l);
    var w = t.memoizedState;
    s !== v || h !== w || we.current || st ? (typeof m == "function" && (Do(t, n, m, r), w = t.memoizedState), (c = st || Fa(t, n, c, r, h, w, u) || !1) ? (g || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, w, u), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, w, u)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = w), a.props = r, a.state = w, a.context = u, r = c) : (typeof a.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Bo(e, t, n, r, o, l);
}
function Bo(e, t, n, r, l, o) {
  Xu(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return l && za(t, n, !1), nt(e, t, o);
  r = t.stateNode, $f.current = t;
  var s = a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && a ? (t.child = hn(t, e.child, null, o), t.child = hn(t, null, s, o)) : fe(e, t, s, o), t.memoizedState = r.state, l && za(t, n, !0), t.child;
}
function Gu(e) {
  var t = e.stateNode;
  t.pendingContext ? ba(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ba(e, t.context, !1), zi(e, t.containerInfo);
}
function Va(e, t, n, r, l) {
  return pn(), Si(l), t.flags |= 256, fe(e, t, n, r), t.child;
}
var Ho = { dehydrated: null, treeContext: null, retryLane: 0 };
function Wo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Zu(e, t, n) {
  var r = t.pendingProps, l = Q.current, o = !1, a = (t.flags & 128) !== 0, s;
  if ((s = a) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), B(Q, l & 1), e === null)
    return Oo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = bl(a, r, 0, null), e = Ot(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Wo(n), t.memoizedState = Ho, e) : Fi(t, a));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null)) return Lf(e, t, a, r, s, l, n);
  if (o) {
    o = r.fallback, a = t.mode, l = e.child, s = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(a & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = wt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? o = wt(s, o) : (o = Ot(o, a, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, a = e.child.memoizedState, a = a === null ? Wo(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = Ho, r;
  }
  return o = e.child, e = o.sibling, r = wt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Fi(e, t) {
  return t = bl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Er(e, t, n, r) {
  return r !== null && Si(r), hn(t, e.child, null, n), e = Fi(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Lf(e, t, n, r, l, o, a) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = no(Error(N(422))), Er(e, t, a, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = bl({ mode: "visible", children: r.children }, l, 0, null), o = Ot(o, l, a, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && hn(t, e.child, null, a), t.child.memoizedState = Wo(a), t.memoizedState = Ho, o);
  if (!(t.mode & 1)) return Er(e, t, a, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var s = r.dgst;
    return r = s, o = Error(N(419)), r = no(o, r, void 0), Er(e, t, a, r);
  }
  if (s = (a & e.childLanes) !== 0, ye || s) {
    if (r = ne, r !== null) {
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
      l = l & (r.suspendedLanes | a) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, tt(e, l), Ae(r, e, l, -1));
    }
    return Hi(), r = no(Error(N(421))), Er(e, t, a, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Qf.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Ne = vt(l.nextSibling), _e = t, V = !0, De = null, e !== null && (ze[Pe++] = Ge, ze[Pe++] = Ze, ze[Pe++] = Dt, Ge = e.id, Ze = e.overflow, Dt = t), t = Fi(t, r.children), t.flags |= 4096, t);
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
function Ju(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (fe(e, t, r.children, n), r = Q.current, r & 2) r = r & 1 | 2, t.flags |= 128;
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
  if (B(Q, r), !(t.mode & 1)) t.memoizedState = null;
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
function nt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), At |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(N(153));
  if (t.child !== null) {
    for (e = t.child, n = wt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = wt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Mf(e, t, n) {
  switch (t.tag) {
    case 3:
      Gu(t), pn();
      break;
    case 5:
      Nu(t);
      break;
    case 1:
      ke(t.type) && nl(t);
      break;
    case 4:
      zi(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      B(ol, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (B(Q, Q.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Zu(e, t, n) : (B(Q, Q.current & 1), e = nt(e, t, n), e !== null ? e.sibling : null);
      B(Q, Q.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Ju(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), B(Q, Q.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Yu(e, t, n);
  }
  return nt(e, t, n);
}
var qu, Vo, ec, tc;
qu = function(e, t) {
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
ec = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Lt(Ke.current);
    var o = null;
    switch (n) {
      case "input":
        l = po(e, l), r = po(e, r), o = [];
        break;
      case "select":
        l = Y({}, l, { value: void 0 }), r = Y({}, r, { value: void 0 }), o = [];
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
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, s = s ? s.__html : void 0, u != null && s !== u && (o = o || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Wn.hasOwnProperty(c) ? (u != null && c === "onScroll" && H("scroll", e), o || s === u || (o = [])) : (o = o || []).push(c, u));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
tc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function En(e, t) {
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
function se(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Rf(e, t, n) {
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
      return se(t), null;
    case 1:
      return ke(t.type) && tl(), se(t), null;
    case 3:
      return r = t.stateNode, mn(), W(we), W(ce), Ti(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (_r(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, De !== null && (qo(De), De = null))), Vo(e, t), se(t), null;
    case 5:
      Pi(t);
      var l = Lt(nr.current);
      if (n = t.type, e !== null && t.stateNode != null) ec(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(N(166));
          return se(t), null;
        }
        if (e = Lt(Ke.current), _r(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Ve] = t, r[er] = o, e = (t.mode & 1) !== 0, n) {
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
              for (l = 0; l < Ln.length; l++) H(Ln[l], r);
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
              ta(r, o), H("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, H("invalid", r);
              break;
            case "textarea":
              ra(r, o), H("invalid", r);
          }
          xo(n, o), l = null;
          for (var a in o) if (o.hasOwnProperty(a)) {
            var s = o[a];
            a === "children" ? typeof s == "string" ? r.textContent !== s && (o.suppressHydrationWarning !== !0 && Nr(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (o.suppressHydrationWarning !== !0 && Nr(
              r.textContent,
              s,
              e
            ), l = ["children", "" + s]) : Wn.hasOwnProperty(a) && s != null && a === "onScroll" && H("scroll", r);
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
          a = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = zs(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = a.createElement(n, { is: r.is }) : (e = a.createElement(n), n === "select" && (a = e, r.multiple ? a.multiple = !0 : r.size && (a.size = r.size))) : e = a.createElementNS(e, n), e[Ve] = t, e[er] = r, qu(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (a = yo(n, r), n) {
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
                for (l = 0; l < Ln.length; l++) H(Ln[l], e);
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
                ta(e, r), l = po(e, r), H("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = Y({}, r, { value: void 0 }), H("invalid", e);
                break;
              case "textarea":
                ra(e, r), l = vo(e, r), H("invalid", e);
                break;
              default:
                l = r;
            }
            xo(n, l), s = l;
            for (o in s) if (s.hasOwnProperty(o)) {
              var u = s[o];
              o === "style" ? $s(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Ps(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Vn(e, u) : typeof u == "number" && Vn(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Wn.hasOwnProperty(o) ? u != null && o === "onScroll" && H("scroll", e) : u != null && ai(e, o, u, a));
            }
            switch (n) {
              case "input":
                vr(e), na(e, r, !1);
                break;
              case "textarea":
                vr(e), la(e);
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
      return se(t), null;
    case 6:
      if (e && t.stateNode != null) tc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(N(166));
        if (n = Lt(nr.current), Lt(Ke.current), _r(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ve] = t, (o = r.nodeValue !== n) && (e = _e, e !== null)) switch (e.tag) {
            case 3:
              Nr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Nr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ve] = t, t.stateNode = r;
      }
      return se(t), null;
    case 13:
      if (W(Q), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (V && Ne !== null && t.mode & 1 && !(t.flags & 128)) yu(), pn(), t.flags |= 98560, o = !1;
        else if (o = _r(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(N(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(N(317));
            o[Ve] = t;
          } else pn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          se(t), o = !1;
        } else De !== null && (qo(De), De = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Q.current & 1 ? q === 0 && (q = 3) : Hi())), t.updateQueue !== null && (t.flags |= 4), se(t), null);
    case 4:
      return mn(), Vo(e, t), e === null && Jn(t.stateNode.containerInfo), se(t), null;
    case 10:
      return Ci(t.type._context), se(t), null;
    case 17:
      return ke(t.type) && tl(), se(t), null;
    case 19:
      if (W(Q), o = t.memoizedState, o === null) return se(t), null;
      if (r = (t.flags & 128) !== 0, a = o.rendering, a === null) if (r) En(o, !1);
      else {
        if (q !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (a = sl(e), a !== null) {
            for (t.flags |= 128, En(o, !1), r = a.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return B(Q, Q.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && G() > gn && (t.flags |= 128, r = !0, En(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = sl(a), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), En(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !V) return se(t), null;
        } else 2 * G() - o.renderingStartTime > gn && n !== 1073741824 && (t.flags |= 128, r = !0, En(o, !1), t.lanes = 4194304);
        o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = G(), t.sibling = null, n = Q.current, B(Q, r ? n & 1 | 2 : n & 1), t) : (se(t), null);
    case 22:
    case 23:
      return Bi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Se & 1073741824 && (se(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : se(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(N(156, t.tag));
}
function Of(e, t) {
  switch (ji(t), t.tag) {
    case 1:
      return ke(t.type) && tl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return mn(), W(we), W(ce), Ti(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Pi(t), null;
    case 13:
      if (W(Q), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(N(340));
        pn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return W(Q), null;
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
var br = !1, ue = !1, Ff = typeof WeakSet == "function" ? WeakSet : Set, $ = null;
function nn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    X(e, t, r);
  }
  else n.current = null;
}
function Qo(e, t, n) {
  try {
    n();
  } catch (r) {
    X(e, t, r);
  }
}
var Ka = !1;
function Df(e, t) {
  if (zo = Zr, e = iu(), wi(e)) {
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
  for (Po = { focusedElem: e, selectionRange: n }, Zr = !1, $ = t; $ !== null; ) if (t = $, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, $ = e;
  else for (; $ !== null; ) {
    t = $;
    try {
      var w = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (w !== null) {
            var y = w.memoizedProps, C = w.memoizedState, p = t.stateNode, d = p.getSnapshotBeforeUpdate(t.elementType === t.type ? y : Oe(t.type, y), C);
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
      X(t, t.return, x);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, $ = e;
      break;
    }
    $ = t.return;
  }
  return w = Ka, Ka = !1, w;
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
function nc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, nc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ve], delete t[er], delete t[Lo], delete t[wf], delete t[kf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function rc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ya(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || rc(e.return)) return null;
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
var re = null, Fe = !1;
function it(e, t, n) {
  for (n = n.child; n !== null; ) lc(e, t, n), n = n.sibling;
}
function lc(e, t, n) {
  if (Qe && typeof Qe.onCommitFiberUnmount == "function") try {
    Qe.onCommitFiberUnmount(xl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ue || nn(n, t);
    case 6:
      var r = re, l = Fe;
      re = null, it(e, t, n), re = r, Fe = l, re !== null && (Fe ? (e = re, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : re.removeChild(n.stateNode));
      break;
    case 18:
      re !== null && (Fe ? (e = re, n = n.stateNode, e.nodeType === 8 ? Gl(e.parentNode, n) : e.nodeType === 1 && Gl(e, n), Xn(e)) : Gl(re, n.stateNode));
      break;
    case 4:
      r = re, l = Fe, re = n.stateNode.containerInfo, Fe = !0, it(e, t, n), re = r, Fe = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ue && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, a = o.destroy;
          o = o.tag, a !== void 0 && (o & 2 || o & 4) && Qo(n, t, a), l = l.next;
        } while (l !== r);
      }
      it(e, t, n);
      break;
    case 1:
      if (!ue && (nn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (s) {
        X(n, t, s);
      }
      it(e, t, n);
      break;
    case 21:
      it(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ue = (r = ue) || n.memoizedState !== null, it(e, t, n), ue = r) : it(e, t, n);
      break;
    default:
      it(e, t, n);
  }
}
function Xa(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Ff()), t.forEach(function(r) {
      var l = Kf.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Re(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, a = t, s = a;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 5:
            re = s.stateNode, Fe = !1;
            break e;
          case 3:
            re = s.stateNode.containerInfo, Fe = !0;
            break e;
          case 4:
            re = s.stateNode.containerInfo, Fe = !0;
            break e;
        }
        s = s.return;
      }
      if (re === null) throw Error(N(160));
      lc(o, a, l), re = null, Fe = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (c) {
      X(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) oc(t, e), t = t.sibling;
}
function oc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Re(t, e), He(e), r & 4) {
        try {
          An(3, e, e.return), Cl(3, e);
        } catch (y) {
          X(e, e.return, y);
        }
        try {
          An(5, e, e.return);
        } catch (y) {
          X(e, e.return, y);
        }
      }
      break;
    case 1:
      Re(t, e), He(e), r & 512 && n !== null && nn(n, n.return);
      break;
    case 5:
      if (Re(t, e), He(e), r & 512 && n !== null && nn(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Vn(l, "");
        } catch (y) {
          X(e, e.return, y);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, s = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          s === "input" && o.type === "radio" && o.name != null && Es(l, o), yo(s, a);
          var c = yo(s, o);
          for (a = 0; a < u.length; a += 2) {
            var g = u[a], v = u[a + 1];
            g === "style" ? $s(l, v) : g === "dangerouslySetInnerHTML" ? Ps(l, v) : g === "children" ? Vn(l, v) : ai(l, g, v, c);
          }
          switch (s) {
            case "input":
              ho(l, o);
              break;
            case "textarea":
              bs(l, o);
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
        } catch (y) {
          X(e, e.return, y);
        }
      }
      break;
    case 6:
      if (Re(t, e), He(e), r & 4) {
        if (e.stateNode === null) throw Error(N(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (y) {
          X(e, e.return, y);
        }
      }
      break;
    case 3:
      if (Re(t, e), He(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Xn(t.containerInfo);
      } catch (y) {
        X(e, e.return, y);
      }
      break;
    case 4:
      Re(t, e), He(e);
      break;
    case 13:
      Re(t, e), He(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Ai = G())), r & 4 && Xa(e);
      break;
    case 22:
      if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (ue = (c = ue) || g, Re(t, e), ue = c) : Re(t, e), He(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !g && e.mode & 1) for ($ = e, g = e.child; g !== null; ) {
          for (v = $ = g; $ !== null; ) {
            switch (h = $, m = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                An(4, h, h.return);
                break;
              case 1:
                nn(h, h.return);
                var w = h.stateNode;
                if (typeof w.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, w.props = t.memoizedProps, w.state = t.memoizedState, w.componentWillUnmount();
                  } catch (y) {
                    X(r, n, y);
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
            m !== null ? (m.return = h, $ = m) : Za(v);
          }
          g = g.sibling;
        }
        e: for (g = null, v = e; ; ) {
          if (v.tag === 5) {
            if (g === null) {
              g = v;
              try {
                l = v.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (s = v.stateNode, u = v.memoizedProps.style, a = u != null && u.hasOwnProperty("display") ? u.display : null, s.style.display = Ts("display", a));
              } catch (y) {
                X(e, e.return, y);
              }
            }
          } else if (v.tag === 6) {
            if (g === null) try {
              v.stateNode.nodeValue = c ? "" : v.memoizedProps;
            } catch (y) {
              X(e, e.return, y);
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
      Re(t, e), He(e), r & 4 && Xa(e);
      break;
    case 21:
      break;
    default:
      Re(
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
          if (rc(n)) {
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
      X(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function If(e, t, n) {
  $ = e, ic(e);
}
function ic(e, t, n) {
  for (var r = (e.mode & 1) !== 0; $ !== null; ) {
    var l = $, o = l.child;
    if (l.tag === 22 && r) {
      var a = l.memoizedState !== null || br;
      if (!a) {
        var s = l.alternate, u = s !== null && s.memoizedState !== null || ue;
        s = br;
        var c = ue;
        if (br = a, (ue = u) && !c) for ($ = l; $ !== null; ) a = $, u = a.child, a.tag === 22 && a.memoizedState !== null ? Ja(l) : u !== null ? (u.return = a, $ = u) : Ja(l);
        for (; o !== null; ) $ = o, ic(o), o = o.sibling;
        $ = l, br = s, ue = c;
      }
      Ga(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, $ = o) : Ga(e);
  }
}
function Ga(e) {
  for (; $ !== null; ) {
    var t = $;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ue || Cl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !ue) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Oe(t.type, n.memoizedProps);
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
        ue || t.flags & 512 && Ko(t);
      } catch (h) {
        X(t, t.return, h);
      }
    }
    if (t === e) {
      $ = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, $ = n;
      break;
    }
    $ = t.return;
  }
}
function Za(e) {
  for (; $ !== null; ) {
    var t = $;
    if (t === e) {
      $ = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, $ = n;
      break;
    }
    $ = t.return;
  }
}
function Ja(e) {
  for (; $ !== null; ) {
    var t = $;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Cl(4, t);
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
            Ko(t);
          } catch (u) {
            X(t, o, u);
          }
          break;
        case 5:
          var a = t.return;
          try {
            Ko(t);
          } catch (u) {
            X(t, a, u);
          }
      }
    } catch (u) {
      X(t, t.return, u);
    }
    if (t === e) {
      $ = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      s.return = t.return, $ = s;
      break;
    }
    $ = t.return;
  }
}
var Af = Math.ceil, dl = rt.ReactCurrentDispatcher, Di = rt.ReactCurrentOwner, $e = rt.ReactCurrentBatchConfig, I = 0, ne = null, Z = null, le = 0, Se = 0, rn = Nt(0), q = 0, ir = null, At = 0, El = 0, Ii = 0, Un = null, xe = null, Ai = 0, gn = 1 / 0, Ye = null, fl = !1, Go = null, xt = null, zr = !1, ft = null, pl = 0, Bn = 0, Zo = null, Ur = -1, Br = 0;
function pe() {
  return I & 6 ? G() : Ur !== -1 ? Ur : Ur = G();
}
function yt(e) {
  return e.mode & 1 ? I & 2 && le !== 0 ? le & -le : Sf.transition !== null ? (Br === 0 && (Br = Ws()), Br) : (e = U, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Zs(e.type)), e) : 1;
}
function Ae(e, t, n, r) {
  if (50 < Bn) throw Bn = 0, Zo = null, Error(N(185));
  sr(e, n, r), (!(I & 2) || e !== ne) && (e === ne && (!(I & 2) && (El |= n), q === 4 && ct(e, le)), je(e, r), n === 1 && I === 0 && !(t.mode & 1) && (gn = G() + 500, Sl && _t()));
}
function je(e, t) {
  var n = e.callbackNode;
  jd(e, t);
  var r = Gr(e, e === ne ? le : 0);
  if (r === 0) n !== null && aa(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && aa(n), t === 1) e.tag === 0 ? jf(qa.bind(null, e)) : vu(qa.bind(null, e)), xf(function() {
      !(I & 6) && _t();
    }), n = null;
    else {
      switch (Vs(r)) {
        case 1:
          n = fi;
          break;
        case 4:
          n = Bs;
          break;
        case 16:
          n = Xr;
          break;
        case 536870912:
          n = Hs;
          break;
        default:
          n = Xr;
      }
      n = hc(n, ac.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function ac(e, t) {
  if (Ur = -1, Br = 0, I & 6) throw Error(N(327));
  var n = e.callbackNode;
  if (cn() && e.callbackNode !== n) return null;
  var r = Gr(e, e === ne ? le : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = hl(e, r);
  else {
    t = r;
    var l = I;
    I |= 2;
    var o = uc();
    (ne !== e || le !== t) && (Ye = null, gn = G() + 500, Rt(e, t));
    do
      try {
        Hf();
        break;
      } catch (s) {
        sc(e, s);
      }
    while (!0);
    _i(), dl.current = o, I = l, Z !== null ? t = 0 : (ne = null, le = 0, t = q);
  }
  if (t !== 0) {
    if (t === 2 && (l = No(e), l !== 0 && (r = l, t = Jo(e, l))), t === 1) throw n = ir, Rt(e, 0), ct(e, r), je(e, G()), n;
    if (t === 6) ct(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Uf(l) && (t = hl(e, r), t === 2 && (o = No(e), o !== 0 && (r = o, t = Jo(e, o))), t === 1)) throw n = ir, Rt(e, 0), ct(e, r), je(e, G()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          Pt(e, xe, Ye);
          break;
        case 3:
          if (ct(e, r), (r & 130023424) === r && (t = Ai + 500 - G(), 10 < t)) {
            if (Gr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              pe(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = $o(Pt.bind(null, e, xe, Ye), t);
            break;
          }
          Pt(e, xe, Ye);
          break;
        case 4:
          if (ct(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var a = 31 - Ie(r);
            o = 1 << a, a = t[a], a > l && (l = a), r &= ~o;
          }
          if (r = l, r = G() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Af(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = $o(Pt.bind(null, e, xe, Ye), r);
            break;
          }
          Pt(e, xe, Ye);
          break;
        case 5:
          Pt(e, xe, Ye);
          break;
        default:
          throw Error(N(329));
      }
    }
  }
  return je(e, G()), e.callbackNode === n ? ac.bind(null, e) : null;
}
function Jo(e, t) {
  var n = Un;
  return e.current.memoizedState.isDehydrated && (Rt(e, t).flags |= 256), e = hl(e, t), e !== 2 && (t = xe, xe = n, t !== null && qo(t)), e;
}
function qo(e) {
  xe === null ? xe = e : xe.push.apply(xe, e);
}
function Uf(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!Ue(o(), l)) return !1;
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
  for (t &= ~Ii, t &= ~El, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ie(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function qa(e) {
  if (I & 6) throw Error(N(327));
  cn();
  var t = Gr(e, 0);
  if (!(t & 1)) return je(e, G()), null;
  var n = hl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = No(e);
    r !== 0 && (t = r, n = Jo(e, r));
  }
  if (n === 1) throw n = ir, Rt(e, 0), ct(e, t), je(e, G()), n;
  if (n === 6) throw Error(N(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Pt(e, xe, Ye), je(e, G()), null;
}
function Ui(e, t) {
  var n = I;
  I |= 1;
  try {
    return e(t);
  } finally {
    I = n, I === 0 && (gn = G() + 500, Sl && _t());
  }
}
function Ut(e) {
  ft !== null && ft.tag === 0 && !(I & 6) && cn();
  var t = I;
  I |= 1;
  var n = $e.transition, r = U;
  try {
    if ($e.transition = null, U = 1, e) return e();
  } finally {
    U = r, $e.transition = n, I = t, !(I & 6) && _t();
  }
}
function Bi() {
  Se = rn.current, W(rn);
}
function Rt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, gf(n)), Z !== null) for (n = Z.return; n !== null; ) {
    var r = n;
    switch (ji(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && tl();
        break;
      case 3:
        mn(), W(we), W(ce), Ti();
        break;
      case 5:
        Pi(r);
        break;
      case 4:
        mn();
        break;
      case 13:
        W(Q);
        break;
      case 19:
        W(Q);
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
  if (ne = e, Z = e = wt(e.current, null), le = Se = t, q = 0, ir = null, Ii = El = At = 0, xe = Un = null, $t !== null) {
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
function sc(e, t) {
  do {
    var n = Z;
    try {
      if (_i(), Dr.current = cl, ul) {
        for (var r = K.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        ul = !1;
      }
      if (It = 0, te = J = K = null, In = !1, rr = 0, Di.current = null, n === null || n.return === null) {
        q = 1, ir = t, Z = null;
        break;
      }
      e: {
        var o = e, a = n.return, s = n, u = t;
        if (t = le, s.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, g = s, v = g.tag;
          if (!(g.mode & 1) && (v === 0 || v === 11 || v === 15)) {
            var h = g.alternate;
            h ? (g.updateQueue = h.updateQueue, g.memoizedState = h.memoizedState, g.lanes = h.lanes) : (g.updateQueue = null, g.memoizedState = null);
          }
          var m = Aa(a);
          if (m !== null) {
            m.flags &= -257, Ua(m, a, s, o, t), m.mode & 1 && Ia(o, c, t), t = m, u = c;
            var w = t.updateQueue;
            if (w === null) {
              var y = /* @__PURE__ */ new Set();
              y.add(u), t.updateQueue = y;
            } else w.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Ia(o, c, t), Hi();
              break e;
            }
            u = Error(N(426));
          }
        } else if (V && s.mode & 1) {
          var C = Aa(a);
          if (C !== null) {
            !(C.flags & 65536) && (C.flags |= 256), Ua(C, a, s, o, t), Si(vn(u, s));
            break e;
          }
        }
        o = u = vn(u, s), q !== 4 && (q = 2), Un === null ? Un = [o] : Un.push(o), o = a;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var p = Vu(o, u, t);
              La(o, p);
              break e;
            case 1:
              s = u;
              var d = o.type, f = o.stateNode;
              if (!(o.flags & 128) && (typeof d.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (xt === null || !xt.has(f)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var x = Qu(o, s, t);
                La(o, x);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      dc(n);
    } catch (k) {
      t = k, Z === n && n !== null && (Z = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function uc() {
  var e = dl.current;
  return dl.current = cl, e === null ? cl : e;
}
function Hi() {
  (q === 0 || q === 3 || q === 2) && (q = 4), ne === null || !(At & 268435455) && !(El & 268435455) || ct(ne, le);
}
function hl(e, t) {
  var n = I;
  I |= 2;
  var r = uc();
  (ne !== e || le !== t) && (Ye = null, Rt(e, t));
  do
    try {
      Bf();
      break;
    } catch (l) {
      sc(e, l);
    }
  while (!0);
  if (_i(), I = n, dl.current = r, Z !== null) throw Error(N(261));
  return ne = null, le = 0, q;
}
function Bf() {
  for (; Z !== null; ) cc(Z);
}
function Hf() {
  for (; Z !== null && !pd(); ) cc(Z);
}
function cc(e) {
  var t = pc(e.alternate, e, Se);
  e.memoizedProps = e.pendingProps, t === null ? dc(e) : Z = t, Di.current = null;
}
function dc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Of(n, t), n !== null) {
        n.flags &= 32767, Z = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        q = 6, Z = null;
        return;
      }
    } else if (n = Rf(n, t, Se), n !== null) {
      Z = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      Z = t;
      return;
    }
    Z = t = e;
  } while (t !== null);
  q === 0 && (q = 5);
}
function Pt(e, t, n) {
  var r = U, l = $e.transition;
  try {
    $e.transition = null, U = 1, Wf(e, t, n, r);
  } finally {
    $e.transition = l, U = r;
  }
  return null;
}
function Wf(e, t, n, r) {
  do
    cn();
  while (ft !== null);
  if (I & 6) throw Error(N(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(N(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Sd(e, o), e === ne && (Z = ne = null, le = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || zr || (zr = !0, hc(Xr, function() {
    return cn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = $e.transition, $e.transition = null;
    var a = U;
    U = 1;
    var s = I;
    I |= 4, Di.current = null, Df(e, n), oc(n, e), cf(Po), Zr = !!zo, Po = zo = null, e.current = n, If(n), hd(), I = s, U = a, $e.transition = o;
  } else e.current = n;
  if (zr && (zr = !1, ft = e, pl = l), o = e.pendingLanes, o === 0 && (xt = null), gd(n.stateNode), je(e, G()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (fl) throw fl = !1, e = Go, Go = null, e;
  return pl & 1 && e.tag !== 0 && cn(), o = e.pendingLanes, o & 1 ? e === Zo ? Bn++ : (Bn = 0, Zo = e) : Bn = 0, _t(), null;
}
function cn() {
  if (ft !== null) {
    var e = Vs(pl), t = $e.transition, n = U;
    try {
      if ($e.transition = null, U = 16 > e ? 16 : e, ft === null) var r = !1;
      else {
        if (e = ft, ft = null, pl = 0, I & 6) throw Error(N(331));
        var l = I;
        for (I |= 4, $ = e.current; $ !== null; ) {
          var o = $, a = o.child;
          if ($.flags & 16) {
            var s = o.deletions;
            if (s !== null) {
              for (var u = 0; u < s.length; u++) {
                var c = s[u];
                for ($ = c; $ !== null; ) {
                  var g = $;
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      An(8, g, o);
                  }
                  var v = g.child;
                  if (v !== null) v.return = g, $ = v;
                  else for (; $ !== null; ) {
                    g = $;
                    var h = g.sibling, m = g.return;
                    if (nc(g), g === c) {
                      $ = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = m, $ = h;
                      break;
                    }
                    $ = m;
                  }
                }
              }
              var w = o.alternate;
              if (w !== null) {
                var y = w.child;
                if (y !== null) {
                  w.child = null;
                  do {
                    var C = y.sibling;
                    y.sibling = null, y = C;
                  } while (y !== null);
                }
              }
              $ = o;
            }
          }
          if (o.subtreeFlags & 2064 && a !== null) a.return = o, $ = a;
          else e: for (; $ !== null; ) {
            if (o = $, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                An(9, o, o.return);
            }
            var p = o.sibling;
            if (p !== null) {
              p.return = o.return, $ = p;
              break e;
            }
            $ = o.return;
          }
        }
        var d = e.current;
        for ($ = d; $ !== null; ) {
          a = $;
          var f = a.child;
          if (a.subtreeFlags & 2064 && f !== null) f.return = a, $ = f;
          else e: for (a = d; $ !== null; ) {
            if (s = $, s.flags & 2048) try {
              switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  Cl(9, s);
              }
            } catch (k) {
              X(s, s.return, k);
            }
            if (s === a) {
              $ = null;
              break e;
            }
            var x = s.sibling;
            if (x !== null) {
              x.return = s.return, $ = x;
              break e;
            }
            $ = s.return;
          }
        }
        if (I = l, _t(), Qe && typeof Qe.onPostCommitFiberRoot == "function") try {
          Qe.onPostCommitFiberRoot(xl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      U = n, $e.transition = t;
    }
  }
  return !1;
}
function es(e, t, n) {
  t = vn(n, t), t = Vu(e, t, 1), e = gt(e, t, 1), t = pe(), e !== null && (sr(e, 1, t), je(e, t));
}
function X(e, t, n) {
  if (e.tag === 3) es(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      es(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (xt === null || !xt.has(r))) {
        e = vn(n, e), e = Qu(t, e, 1), t = gt(t, e, 1), e = pe(), t !== null && (sr(t, 1, e), je(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Vf(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = pe(), e.pingedLanes |= e.suspendedLanes & n, ne === e && (le & n) === n && (q === 4 || q === 3 && (le & 130023424) === le && 500 > G() - Ai ? Rt(e, 0) : Ii |= n), je(e, t);
}
function fc(e, t) {
  t === 0 && (e.mode & 1 ? (t = yr, yr <<= 1, !(yr & 130023424) && (yr = 4194304)) : t = 1);
  var n = pe();
  e = tt(e, t), e !== null && (sr(e, t, n), je(e, n));
}
function Qf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), fc(e, n);
}
function Kf(e, t) {
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
  r !== null && r.delete(t), fc(e, n);
}
var pc;
pc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || we.current) ye = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return ye = !1, Mf(e, t, n);
    ye = !!(e.flags & 131072);
  }
  else ye = !1, V && t.flags & 1048576 && gu(t, ll, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Ar(e, t), e = t.pendingProps;
      var l = fn(t, ce.current);
      un(t, n), l = Li(null, t, r, e, l, n);
      var o = Mi();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ke(r) ? (o = !0, nl(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, bi(t), l.updater = _l, t.stateNode = l, l._reactInternals = t, Io(t, r, e, n), t = Bo(null, t, r, !0, o, n)) : (t.tag = 0, V && o && ki(t), fe(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Ar(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Xf(r), e = Oe(r, e), l) {
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
            t = Ha(null, t, r, Oe(r.type, e), n);
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
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Oe(r, l), Uo(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Oe(r, l), Wa(e, t, r, l, n);
    case 3:
      e: {
        if (Gu(t), e === null) throw Error(N(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, Su(e, t), al(t, r, null, n);
        var a = t.memoizedState;
        if (r = a.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = vn(Error(N(423)), t), t = Va(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = vn(Error(N(424)), t), t = Va(e, t, r, n, l);
          break e;
        } else for (Ne = vt(t.stateNode.containerInfo.firstChild), _e = t, V = !0, De = null, n = ku(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (pn(), r === l) {
            t = nt(e, t, n);
            break e;
          }
          fe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Nu(t), e === null && Oo(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, a = l.children, To(r, l) ? a = null : o !== null && To(r, o) && (t.flags |= 32), Xu(e, t), fe(e, t, a, n), t.child;
    case 6:
      return e === null && Oo(t), null;
    case 13:
      return Zu(e, t, n);
    case 4:
      return zi(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = hn(t, null, r, n) : fe(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Oe(r, l), Ba(e, t, r, l, n);
    case 7:
      return fe(e, t, t.pendingProps, n), t.child;
    case 8:
      return fe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return fe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, a = l.value, B(ol, r._currentValue), r._currentValue = a, o !== null) if (Ue(o.value, a)) {
          if (o.children === l.children && !we.current) {
            t = nt(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var s = o.dependencies;
          if (s !== null) {
            a = o.child;
            for (var u = s.firstContext; u !== null; ) {
              if (u.context === r) {
                if (o.tag === 1) {
                  u = Je(-1, n & -n), u.tag = 2;
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
        fe(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, un(t, n), l = Le(l), r = r(l), t.flags |= 1, fe(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Oe(r, t.pendingProps), l = Oe(r.type, l), Ha(e, t, r, l, n);
    case 15:
      return Ku(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Oe(r, l), Ar(e, t), t.tag = 1, ke(r) ? (e = !0, nl(t)) : e = !1, un(t, n), Wu(t, r, l), Io(t, r, l, n), Bo(null, t, r, !0, e, n);
    case 19:
      return Ju(e, t, n);
    case 22:
      return Yu(e, t, n);
  }
  throw Error(N(156, t.tag));
};
function hc(e, t) {
  return Us(e, t);
}
function Yf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Te(e, t, n, r) {
  return new Yf(e, t, n, r);
}
function Wi(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Xf(e) {
  if (typeof e == "function") return Wi(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ui) return 11;
    if (e === ci) return 14;
  }
  return 2;
}
function wt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Te(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
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
      return e = Te(12, n, t, l | 2), e.elementType = so, e.lanes = o, e;
    case uo:
      return e = Te(13, n, t, l), e.elementType = uo, e.lanes = o, e;
    case co:
      return e = Te(19, n, t, l), e.elementType = co, e.lanes = o, e;
    case Ns:
      return bl(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case js:
          a = 10;
          break e;
        case Ss:
          a = 9;
          break e;
        case ui:
          a = 11;
          break e;
        case ci:
          a = 14;
          break e;
        case at:
          a = 16, r = null;
          break e;
      }
      throw Error(N(130, e == null ? e : typeof e, ""));
  }
  return t = Te(a, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Ot(e, t, n, r) {
  return e = Te(7, e, r, t), e.lanes = n, e;
}
function bl(e, t, n, r) {
  return e = Te(22, e, r, t), e.elementType = Ns, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function lo(e, t, n) {
  return e = Te(6, e, null, t), e.lanes = n, e;
}
function oo(e, t, n) {
  return t = Te(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Gf(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Il(0), this.expirationTimes = Il(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Il(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Vi(e, t, n, r, l, o, a, s, u) {
  return e = new Gf(e, t, n, s, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Te(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, bi(o), e;
}
function Zf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Qt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function mc(e) {
  if (!e) return jt;
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
    if (ke(n)) return mu(e, n, t);
  }
  return t;
}
function vc(e, t, n, r, l, o, a, s, u) {
  return e = Vi(n, r, !0, e, l, o, a, s, u), e.context = mc(null), n = e.current, r = pe(), l = yt(n), o = Je(r, l), o.callback = t ?? null, gt(n, o, l), e.current.lanes = l, sr(e, l, r), je(e, r), e;
}
function zl(e, t, n, r) {
  var l = t.current, o = pe(), a = yt(l);
  return n = mc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Je(o, a), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = gt(l, t, a), e !== null && (Ae(e, l, a, o), Fr(e, l, a)), a;
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
function Jf() {
  return null;
}
var gc = typeof reportError == "function" ? reportError : function(e) {
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
    }), t[et] = null;
  }
};
function Pl(e) {
  this._internalRoot = e;
}
Pl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Ys();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ut.length && t !== 0 && t < ut[n].priority; n++) ;
    ut.splice(n, 0, e), n === 0 && Gs(e);
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
function qf(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = ml(a);
        o.call(c);
      };
    }
    var a = vc(t, r, e, 0, null, !1, !1, "", ns);
    return e._reactRootContainer = a, e[et] = a.current, Jn(e.nodeType === 8 ? e.parentNode : e), Ut(), a;
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
  return e._reactRootContainer = u, e[et] = u.current, Jn(e.nodeType === 8 ? e.parentNode : e), Ut(function() {
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
  } else a = qf(n, t, e, l, r);
  return ml(a);
}
Qs = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = $n(t.pendingLanes);
        n !== 0 && (pi(t, n | 1), je(t, G()), !(I & 6) && (gn = G() + 500, _t()));
      }
      break;
    case 13:
      Ut(function() {
        var r = tt(e, 1);
        if (r !== null) {
          var l = pe();
          Ae(r, e, 1, l);
        }
      }), Qi(e, 1);
  }
};
hi = function(e) {
  if (e.tag === 13) {
    var t = tt(e, 134217728);
    if (t !== null) {
      var n = pe();
      Ae(t, e, 134217728, n);
    }
    Qi(e, 134217728);
  }
};
Ks = function(e) {
  if (e.tag === 13) {
    var t = yt(e), n = tt(e, t);
    if (n !== null) {
      var r = pe();
      Ae(n, e, t, r);
    }
    Qi(e, t);
  }
};
Ys = function() {
  return U;
};
Xs = function(e, t) {
  var n = U;
  try {
    return U = e, t();
  } finally {
    U = n;
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
            Cs(r), ho(r, l);
          }
        }
      }
      break;
    case "textarea":
      bs(e, n);
      break;
    case "select":
      t = n.value, t != null && ln(e, !!n.multiple, t, !1);
  }
};
Rs = Ui;
Os = Ut;
var ep = { usingClientEntryPoint: !1, Events: [cr, Zt, jl, Ls, Ms, Ui] }, bn = { findFiberByHostInstance: Tt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, tp = { bundleType: bn.bundleType, version: bn.version, rendererPackageName: bn.rendererPackageName, rendererConfig: bn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: rt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Is(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: bn.findFiberByHostInstance || Jf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Pr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Pr.isDisabled && Pr.supportsFiber) try {
    xl = Pr.inject(tp), Qe = Pr;
  } catch {
  }
}
Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ep;
Ee.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Yi(t)) throw Error(N(200));
  return Zf(e, t, null, n);
};
Ee.createRoot = function(e, t) {
  if (!Yi(e)) throw Error(N(299));
  var n = !1, r = "", l = gc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Vi(e, 1, !1, null, null, n, !1, r, l), e[et] = t.current, Jn(e.nodeType === 8 ? e.parentNode : e), new Ki(t);
};
Ee.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(N(188)) : (e = Object.keys(e).join(","), Error(N(268, e)));
  return e = Is(t), e = e === null ? null : e.stateNode, e;
};
Ee.flushSync = function(e) {
  return Ut(e);
};
Ee.hydrate = function(e, t, n) {
  if (!Tl(t)) throw Error(N(200));
  return $l(null, e, t, !0, n);
};
Ee.hydrateRoot = function(e, t, n) {
  if (!Yi(e)) throw Error(N(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", a = gc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = vc(t, null, e, 1, n ?? null, l, !1, o, a), e[et] = t.current, Jn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Pl(t);
};
Ee.render = function(e, t, n) {
  if (!Tl(t)) throw Error(N(200));
  return $l(null, e, t, !1, n);
};
Ee.unmountComponentAtNode = function(e) {
  if (!Tl(e)) throw Error(N(40));
  return e._reactRootContainer ? (Ut(function() {
    $l(null, null, e, !1, function() {
      e._reactRootContainer = null, e[et] = null;
    });
  }), !0) : !1;
};
Ee.unstable_batchedUpdates = Ui;
Ee.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Tl(n)) throw Error(N(200));
  if (e == null || e._reactInternals === void 0) throw Error(N(38));
  return $l(e, t, n, !1, r);
};
Ee.version = "18.3.1-next-f1338f8080-20240426";
function xc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(xc);
    } catch (e) {
      console.error(e);
    }
}
xc(), xs.exports = Ee;
var np = xs.exports, yc, rs = np;
yc = rs.createRoot, rs.hydrateRoot;
function T({ name: e, className: t }) {
  return /* @__PURE__ */ i.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("ha-icon", { icon: `mdi:${e}` }) });
}
const rp = '<defs><linearGradient id="hl-mark-g" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#FFB547"/><stop offset="1" stop-color="#FF5A1F"/></linearGradient></defs><polygon points="256,62 452,222 452,446 60,446 60,222" fill="url(#hl-mark-g)" stroke="url(#hl-mark-g)" stroke-width="56" stroke-linejoin="round"/><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" fill="#fff" transform="translate(256 292) scale(10) translate(-12 -12)"/>';
function ls({ size: e = 28 }) {
  return /* @__PURE__ */ i.jsx(
    "svg",
    {
      className: "logo-mark",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      "aria-hidden": "true",
      dangerouslySetInnerHTML: { __html: rp }
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
], Hn = { heat: "Heating", water: "Hot water" }, he = (e) => String((e == null ? void 0 : e.message) ?? e);
function wc(e, t, n) {
  const [r, l] = S.useState(!1), [o, a] = S.useState(null);
  return { busy: r, result: o, send: async (u, c) => {
    l(!0);
    try {
      await e().callWS({ entry_id: t, channel: n, ...u }), a({ kind: "ok", text: c });
    } catch (g) {
      a({ kind: "error", text: he(g) });
    } finally {
      l(!1);
    }
  } };
}
const Mt = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, lp = [30, 60, 120, 180];
function op({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onOpenDevice: l,
  onOpenRoom: o
}) {
  const [a, s] = S.useState([]), [u, c] = S.useState("all");
  S.useEffect(() => {
    const m = e().connection.subscribeMessage((w) => s(w.rooms), {
      type: "hive_local/rooms/subscribe"
    });
    return () => {
      m.then((w) => w()).catch(() => {
      });
    };
  }, [e]);
  const g = t.flatMap((m) => m.channels.map((w) => {
    var y, C;
    return { d: m, c: w, s: ((C = (y = n[m.entry_id]) == null ? void 0 : y[w]) == null ? void 0 : C.status) ?? null };
  })), v = t.length > 1, h = [
    { id: "all", label: "All", icon: "" },
    { id: "heat", label: "Heating", icon: "radiator" },
    ...g.some(({ c: m }) => m === "water") ? [{ id: "water", label: "Hot water", icon: "water-boiler" }] : [],
    ...a.length ? [{ id: "rooms", label: "Rooms", icon: "home-thermometer-outline" }] : []
  ];
  return /* @__PURE__ */ i.jsx("div", { className: "home", children: t.length > 0 && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: "home-section", children: "Quick actions" }),
    /* @__PURE__ */ i.jsx(ip, { getHass: e, devices: t, status: n }),
    /* @__PURE__ */ i.jsx("h3", { className: "home-section", children: "Your devices" }),
    h.length > 2 && /* @__PURE__ */ i.jsx("div", { className: "pills", role: "tablist", "aria-label": "Show", children: h.map((m) => /* @__PURE__ */ i.jsxs("button", { role: "tab", "aria-selected": u === m.id, className: `pill ${u === m.id ? "on" : ""}`, onClick: () => c(m.id), children: [
      m.icon && /* @__PURE__ */ i.jsx(T, { name: m.icon }),
      " ",
      m.label
    ] }, m.id)) }),
    /* @__PURE__ */ i.jsxs("div", { className: "device-grid", children: [
      g.filter(({ c: m }) => u === "all" || u === m).map(({ d: m, c: w }) => {
        var y;
        return /* @__PURE__ */ i.jsx(
          kc,
          {
            getHass: e,
            device: m,
            channel: w,
            info: (y = n[m.entry_id]) == null ? void 0 : y[w],
            showDevice: v,
            limits: r,
            onOpen: () => l(m.entry_id, w)
          },
          `${m.entry_id}-${w}`
        );
      }),
      (u === "all" || u === "rooms") && a.map((m) => /* @__PURE__ */ i.jsx(ap, { room: m, showReceiver: v, onOpen: () => o(m.id) }, m.id))
    ] })
  ] }) });
}
function ip({ getHass: e, devices: t, status: n }) {
  var v, h;
  const [r, l] = S.useState(null), [o, a] = S.useState(null), s = t.length > 1, u = async (m, w, y) => {
    l(m);
    try {
      for (const C of w) await e().callWS(C);
      a({ ok: !0, text: y });
    } catch (C) {
      a({ ok: !1, text: he(C) });
    } finally {
      l(null);
    }
  }, c = [];
  for (const m of t)
    for (const w of m.channels) {
      const y = (v = n[m.entry_id]) == null ? void 0 : v[w];
      if (((h = y == null ? void 0 : y.status) == null ? void 0 : h.mode) === "boost") continue;
      const C = Mt((y == null ? void 0 : y.boost_minutes) ?? 30), p = w === "water" ? "hot water" : "heating";
      c.push({
        id: `boost-${m.entry_id}-${w}`,
        label: `Boost ${p} · ${C}${s ? ` (${m.name})` : ""}`,
        icon: "rocket-launch",
        kind: w,
        msgs: [{ type: "hive_local/boost", entry_id: m.entry_id, channel: w }],
        done: `Boosting ${p} for ${C}`
      });
    }
  const g = t.flatMap(
    (m) => m.channels.filter((w) => {
      var C, p, d;
      const y = (d = (p = (C = n[m.entry_id]) == null ? void 0 : C[w]) == null ? void 0 : p.status) == null ? void 0 : d.mode;
      return y && y !== "schedule";
    }).map((w) => ({ d: m, c: w }))
  );
  return g.length && c.push({
    id: "schedule",
    label: "Everything back to schedule",
    icon: "calendar-clock",
    kind: "neutral",
    msgs: g.map(
      ({ d: m, c: w }) => {
        var y, C, p;
        return ((p = (C = (y = n[m.entry_id]) == null ? void 0 : y[w]) == null ? void 0 : C.status) == null ? void 0 : p.mode) === "boost" ? { type: "hive_local/cancel_boost", entry_id: m.entry_id, channel: w } : { type: "hive_local/mode", entry_id: m.entry_id, channel: w, mode: "schedule" };
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
function ap({ room: e, showReceiver: t, onOpen: n }) {
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
function kc({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  showDevice: l,
  limits: o,
  onOpen: a,
  page: s = !1
}) {
  var ee, Wt, Be;
  const u = n === "water", c = (r == null ? void 0 : r.status) ?? null, { busy: g, result: v, send: h } = wc(e, t.entry_id, n), m = !!c && c.mode !== "off" && c.heating, w = !c || c.mode === "off" ? "off" : m ? "heating" : "idle", y = !u && (c == null ? void 0 : c.setpoint) != null && c.setpoint <= 1, C = u || (c == null ? void 0 : c.setpoint) == null ? null : y ? (r == null ? void 0 : r.frost_temperature) ?? null : c.setpoint, p = [
    { id: "schedule", label: "Schedule" },
    { id: "manual", label: u ? "Always on" : "Manual" },
    { id: "off", label: "Off" }
  ], d = (r == null ? void 0 : r.boost_minutes) ?? 30, f = (r == null ? void 0 : r.boost_temperature) ?? 21, [x, k] = S.useState(!1), j = (o == null ? void 0 : o.boost_min_temp) ?? 5, P = (o == null ? void 0 : o.heat_max) ?? 32, b = (A) => Math.min(P, Math.max(j, Math.round(A * 2) / 2)), E = [.../* @__PURE__ */ new Set([...lp, d])].filter((A) => A <= ((o == null ? void 0 : o.boost_max_minutes) ?? 360)).sort((A, fr) => A - fr), [M, R] = S.useState(null), ge = S.useRef();
  S.useEffect(() => () => window.clearTimeout(ge.current), []), S.useEffect(() => R(null), [c == null ? void 0 : c.setpoint, c == null ? void 0 : c.mode]);
  const de = !u && !!c && c.mode !== "off", lt = (A) => {
    const Ll = b((M ?? C ?? 20) + A);
    R(Ll), window.clearTimeout(ge.current), ge.current = window.setTimeout(() => {
      h({ type: "hive_local/target", temperature: Ll }, `Set to ${Ll}°`).then(
        () => window.setTimeout(() => R(null), 8e3)
      );
    }, 1200);
  }, Ct = M ?? C, ot = (A, fr) => h({ type: "hive_local/boost", minutes: A, ...u ? {} : { temperature: fr } }, `Boosting for ${Mt(A)}`).then(
    () => k(!1)
  ), Et = c ? c.mode === "boost" ? "Boost to" : y && M == null ? "Frost" : c.mode === "manual" ? "Hold at" : "Target" : "", z = (c == null ? void 0 : c.mode) === "boost", O = z ? ((ee = r == null ? void 0 : r.preheat) == null ? void 0 : ee.active_for) ?? null : null, _ = O != null;
  let L = "Waiting for the receiver…";
  c && (c.mode === "off" ? L = "Off" : z ? L = u ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
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
  ] }) : u ? L = m ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Heating water ",
    /* @__PURE__ */ i.jsx(T, { name: "water", className: "status-icon" })
  ] }) : "Not heating now" : m ? L = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Heating to ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      C,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx(T, { name: "fire", className: "status-icon" })
  ] }) : y ? L = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Frost protection ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      C,
      "°"
    ] })
  ] }) : L = C != null ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Target ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      C,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx(T, { name: "check-circle-outline", className: "status-icon done" })
  ] }) : "Idle"), c && _ && (L = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Pre-heating to ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      c.setpoint,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx(T, { name: "sun-clock", className: "status-icon" })
  ] }));
  const F = c ? _ ? `Pre-heating for ${(Wt = r == null ? void 0 : r.preheat) == null ? void 0 : Wt.active_for}` : c.mode === "boost" ? c.boost_remaining != null ? `Boost · ${Mt(c.boost_remaining)} left` : "Boost" : c.mode === "schedule" ? "On schedule" : (Be = p.find((A) => A.id === c.mode)) == null ? void 0 : Be.label : "", ie = s;
  return /* @__PURE__ */ i.jsxs("section", { className: `card device ${n} ${w} ${s ? "page" : ""}`, children: [
    /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "device-head",
        ...s ? {} : { role: "button", tabIndex: 0, onClick: a, onKeyDown: (A) => A.key === "Enter" && A.target === A.currentTarget && (a == null ? void 0 : a()) },
        children: [
          /* @__PURE__ */ i.jsxs("div", { className: "device-row", children: [
            /* @__PURE__ */ i.jsx("span", { className: `device-icon ${n}`, children: /* @__PURE__ */ i.jsx(T, { name: u ? "water-boiler" : "radiator" }) }),
            /* @__PURE__ */ i.jsxs("div", { className: "device-name", children: [
              /* @__PURE__ */ i.jsx("span", { children: Hn[n] }),
              /* @__PURE__ */ i.jsx("span", { className: "muted small", children: l ? `${t.name} · ${F}` : F })
            ] }),
            /* @__PURE__ */ i.jsx("span", { className: "device-status", children: L })
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
                className: `device-action ${z ? "boosting" : ""}`,
                disabled: g || !c,
                onClick: (A) => {
                  A.stopPropagation(), k(!0);
                },
                children: [
                  /* @__PURE__ */ i.jsx(T, { name: _ ? "sun-clock" : "rocket-launch" }),
                  " ",
                  _ ? "Pre-heating" : z ? "Boosting" : "Boost"
                ]
              }
            )
          ] })
        ]
      }
    ),
    ie && /* @__PURE__ */ i.jsxs("div", { className: "device-body", children: [
      !u && /* @__PURE__ */ i.jsxs("div", { className: "target-row", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "target-text", children: [
          /* @__PURE__ */ i.jsx("span", { className: "target-label", children: Et || "Target" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: c ? c.mode === "off" ? "Turn the heating on to set a target" : c.mode === "schedule" ? "Until the next scheduled change" : c.mode === "boost" ? "Keeps the boost time left" : "Held until you change it" : "" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "target-control", children: [
          /* @__PURE__ */ i.jsx("button", { className: "round target-btn", disabled: !de, onClick: () => lt(-0.5), "aria-label": "Lower the target", children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
          /* @__PURE__ */ i.jsx("span", { className: `target-value ${M != null ? "pending" : ""}`, children: Ct != null && (c == null ? void 0 : c.mode) !== "off" ? `${Ct.toFixed(1)}°` : "–" }),
          /* @__PURE__ */ i.jsx("button", { className: "round target-btn", disabled: !de, onClick: () => lt(0.5), "aria-label": "Raise the target", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "segmented full", children: p.map((A) => /* @__PURE__ */ i.jsx(
        "button",
        {
          className: (c == null ? void 0 : c.mode) === A.id ? "on" : "",
          disabled: g || !c,
          onClick: () => h({ type: "hive_local/mode", mode: A.id }, A.id === "schedule" ? "Following the schedule" : A.label),
          children: A.label
        },
        A.id
      )) })
    ] }),
    (v == null ? void 0 : v.kind) === "error" && /* @__PURE__ */ i.jsx("div", { className: "status error", children: v.text }),
    x && /* @__PURE__ */ i.jsx(
      sp,
      {
        title: _ ? "Pre-heating" : z ? "Boosting" : "Boost",
        subtitle: l ? `${t.name} · ${Hn[n]}` : Hn[n],
        water: u,
        boosting: z,
        preheatFor: O,
        remaining: (c == null ? void 0 : c.boost_remaining) ?? null,
        boostTarget: z ? (c == null ? void 0 : c.setpoint) ?? null : null,
        defaultMinutes: d,
        defaultTemp: f,
        durations: E,
        clampTemp: b,
        busy: g,
        onBoost: ot,
        onStop: () => h({ type: "hive_local/cancel_boost" }, "Boost cancelled").then(() => k(!1)),
        onClose: () => k(!1)
      }
    )
  ] });
}
function sp({
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
  onClose: w
}) {
  const [y, C] = S.useState(s), [p, d] = S.useState(u);
  return S.useEffect(() => {
    const f = (x) => x.key === "Escape" && w();
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [w]), /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: (f) => {
    f.stopPropagation(), w();
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
        /* @__PURE__ */ i.jsx("div", { className: "sheet-lengths", role: "radiogroup", "aria-label": "How long", children: c.map((f) => /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": f === y, className: f === y ? "on" : "", onClick: () => C(f), children: Mt(f) }, f)) })
      ] })
    ] }),
    r ? /* @__PURE__ */ i.jsxs("button", { className: "sheet-go stop", disabled: v, onClick: m, children: [
      /* @__PURE__ */ i.jsx("span", { className: "stop-square" }),
      " ",
      l ? "Stop pre-heating" : "Stop boost"
    ] }) : /* @__PURE__ */ i.jsx("button", { className: "sheet-go", disabled: v, onClick: () => h(y, p), children: n ? `Boost hot water for ${Mt(y)}` : `Boost to ${p.toFixed(1)}° for ${Mt(y)}` }),
    /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: w, children: "Cancel" })
  ] }) });
}
const up = [60, 90, 120, 180];
function cp({ getHass: e, device: t, info: n }) {
  const { busy: r, result: l, send: o } = wc(e, t.entry_id, "heat"), a = [.../* @__PURE__ */ new Set([...up, n.max_lead])].sort((u, c) => u - c);
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
const dp = ["monday", "tuesday", "wednesday", "thursday", "friday"], fp = ["saturday", "sunday"], zn = (e) => e[0].toUpperCase() + e.slice(1, 3), Wr = (e) => {
  const [t, n] = e.split(":").map(Number);
  return t * 60 + n;
};
function pp({
  getHass: e,
  device: t,
  channel: n,
  limits: r,
  mode: l,
  preheatFor: o
}) {
  var O;
  const [a, s] = S.useState({}), [u, c] = S.useState({}), [g, v] = S.useState("monday"), [h, m] = S.useState({ kind: "idle" }), w = t.entry_id, y = n === "water", C = JSON.stringify(a) !== JSON.stringify(u), p = S.useCallback(async () => {
    m({ kind: "busy", text: "Reading from receiver…" });
    try {
      const _ = await e().callWS({
        type: "hive_local/get",
        entry_id: w,
        channel: n
      });
      s(_.schedule), c(_.schedule);
      const L = Object.keys(_.schedule).length;
      m(
        _.complete ? { kind: "ok", text: "Schedule read from receiver" } : L ? { kind: "error", text: `Only got ${L}/7 days — try reading again` } : { kind: "error", text: "No reply. On Zigbee2MQTT, check the receiver's friendly name; on ZHA, check the receiver is online." }
      );
    } catch (_) {
      m({ kind: "error", text: he(_) });
    }
  }, [w, n, e]);
  S.useEffect(() => {
    p();
  }, [p]), S.useEffect(() => {
    if (h.kind !== "ok") return;
    const _ = setTimeout(() => m({ kind: "idle" }), 4e3);
    return () => clearTimeout(_);
  }, [h]);
  const d = async () => {
    const _ = Object.fromEntries(
      bt.filter((L) => {
        var F;
        return JSON.stringify(a[L]) !== JSON.stringify(u[L]) && ((F = a[L]) == null ? void 0 : F.length);
      }).map((L) => [L, a[L]])
    );
    if (Object.keys(_).length) {
      m({ kind: "busy", text: "Writing to receiver…" });
      try {
        const L = await e().callWS({
          type: "hive_local/set",
          entry_id: w,
          channel: n,
          schedule: _
        }), F = { ...a, ...L.schedule };
        s(F), c(F);
        const ie = Object.keys(L.schedule).map((ee) => ee[0].toUpperCase() + ee.slice(1, 3));
        m({
          kind: "ok",
          text: `Wrote ${ie.join(", ")}. Read back to confirm the receiver kept it.`
        });
      } catch (L) {
        m({ kind: "error", text: he(L) });
      }
    }
  }, f = a[g] ?? [], x = r.max_transitions, k = (_) => s((L) => ({ ...L, [g]: [..._].sort((F, ie) => Wr(F.time) - Wr(ie.time)) })), j = () => {
    const _ = f[f.length - 1], L = _ ? hp(f, Wr(_.time) + 60) : "06:00", F = y ? r.water_on : (_ == null ? void 0 : _.setpoint) ?? 20;
    k([...f, { time: L, setpoint: F }]);
  }, P = (_) => s((L) => {
    const F = { ...L };
    for (const ie of _) F[ie] = f.map((ee) => ({ ...ee }));
    return F;
  }), b = S.useMemo(() => {
    const _ = Object.values(a).flat().map((L) => L.setpoint).filter((L) => L > r.heat_min);
    return { lo: Math.min(15, ..._), hi: Math.max(24, ..._) };
  }, [a, r.heat_min]), E = bt[((/* @__PURE__ */ new Date()).getDay() + 6) % 7], [M, R] = S.useState(null), [ge, de] = S.useState(!1), lt = bt.filter((_) => JSON.stringify(a[_]) !== JSON.stringify(u[_])), Ct = bt[(bt.indexOf(g) + 1) % 7], ot = (O = (a[Ct] ?? [])[0]) == null ? void 0 : O.time, Et = (_) => y ? _.setpoint < r.water_on : _.setpoint <= r.heat_min;
  let z = "Stored on the receiver, so it keeps running without Home Assistant.";
  return l === "schedule" ? z = "Your schedule is running." : l === "manual" ? z = `Your schedule isn't being used: ${y ? "hot water is always on" : "heating is on Manual"}.` : l === "off" ? z = `Your schedule isn't being used: ${y ? "hot water" : "heating"} is off.` : l === "boost" && o ? z = `Your schedule is running, starting early so it's warm by ${o}.` : l === "boost" && (z = "Boosting now. Your schedule carries on after the boost."), /* @__PURE__ */ i.jsxs("div", { className: "sched", children: [
    /* @__PURE__ */ i.jsx("p", { className: "sched-status muted", children: z }),
    /* @__PURE__ */ i.jsx("div", { className: "sched-days", role: "tablist", "aria-label": "Day", children: bt.map((_) => /* @__PURE__ */ i.jsxs(
      "button",
      {
        role: "tab",
        "aria-selected": _ === g,
        "aria-label": _,
        className: `sched-day ${_ === g ? "on" : ""} ${_ === E ? "today" : ""}`,
        onClick: () => {
          v(_), R(null);
        },
        children: [
          _[0].toUpperCase(),
          lt.includes(_) && /* @__PURE__ */ i.jsx("i", { className: "sched-dot", "aria-label": "changed" })
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
      f.map((_, L) => {
        var ee;
        const F = ((ee = f[L + 1]) == null ? void 0 : ee.time) ?? (ot ? `${ot} (${zn(Ct)})` : "00:00"), ie = Et(_);
        return /* @__PURE__ */ i.jsxs("button", { className: "slot", onClick: () => R(L), children: [
          /* @__PURE__ */ i.jsx(
            "span",
            {
              className: `slot-badge ${ie ? "off" : ""}`,
              style: ie ? void 0 : { borderColor: y ? "var(--hl-brand)" : mp(_.setpoint, b, r) },
              children: ie ? /* @__PURE__ */ i.jsx(T, { name: y ? "power" : "snowflake" }) : y ? "On" : `${_.setpoint}°`
            }
          ),
          /* @__PURE__ */ i.jsxs("span", { className: "slot-time", children: [
            _.time,
            " – ",
            F
          ] }),
          /* @__PURE__ */ i.jsx(T, { name: "chevron-right", className: "slot-chev" })
        ] }, L);
      }),
      /* @__PURE__ */ i.jsxs("button", { className: "slot slot-add", onClick: () => {
        j(), R(f.length);
      }, disabled: f.length >= x, children: [
        /* @__PURE__ */ i.jsx("span", { className: "slot-badge add", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) }),
        /* @__PURE__ */ i.jsx("span", { className: "slot-time", children: f.length >= x ? `${x} times a day at most` : "Add a time" })
      ] })
    ] }),
    C && /* @__PURE__ */ i.jsxs("div", { className: "sched-save", children: [
      /* @__PURE__ */ i.jsx(T, { name: "pencil-outline", className: "sched-save-icon" }),
      /* @__PURE__ */ i.jsx("span", { className: "sched-changed", title: `Changed: ${lt.map(zn).join(", ")}`, children: "Unsaved changes" }),
      /* @__PURE__ */ i.jsx("button", { className: "sched-undo", onClick: () => {
        s(u), R(null);
      }, children: "Undo" }),
      /* @__PURE__ */ i.jsx("button", { className: "sched-write", onClick: d, disabled: h.kind === "busy", children: "Save" })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: `fab-wrap ${C ? "raised" : ""}`, children: [
      ge && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx("div", { className: "fab-backdrop", onClick: () => de(!1) }),
        /* @__PURE__ */ i.jsxs("div", { className: "fab-menu", role: "menu", children: [
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            de(!1), p();
          }, disabled: h.kind === "busy", children: [
            /* @__PURE__ */ i.jsx(T, { name: "download" }),
            " Read from the receiver"
          ] }),
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            de(!1), P(dp);
          }, disabled: !f.length, children: [
            /* @__PURE__ */ i.jsx(T, { name: "content-copy" }),
            " Copy ",
            zn(g),
            " to weekdays"
          ] }),
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            de(!1), P(fp);
          }, disabled: !f.length, children: [
            /* @__PURE__ */ i.jsx(T, { name: "content-copy" }),
            " Copy ",
            zn(g),
            " to the weekend"
          ] }),
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            de(!1), P([...bt]);
          }, disabled: !f.length, children: [
            /* @__PURE__ */ i.jsx(T, { name: "content-copy" }),
            " Copy ",
            zn(g),
            " to every day"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("button", { className: "fab", "aria-label": "More", "aria-expanded": ge, onClick: () => de(!ge), children: /* @__PURE__ */ i.jsx(T, { name: ge ? "close" : "dots-horizontal" }) })
    ] }),
    M != null && f[M] && /* @__PURE__ */ i.jsx(
      vp,
      {
        slot: f[M],
        dayName: g[0].toUpperCase() + g.slice(1),
        isWater: y,
        limits: r,
        canDelete: !0,
        onChange: (_) => k(f.map((L, F) => F === M ? _ : L)),
        onDelete: () => {
          k(f.filter((_, L) => L !== M)), R(null);
        },
        onClose: () => R(null)
      }
    )
  ] });
}
function hp(e, t) {
  const n = new Set(e.map((l) => Wr(l.time)));
  let r = Math.min(t, 23 * 60 + 30);
  for (; n.has(r) && r < 1439; ) r += 15;
  return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function mp(e, t, n) {
  if (e <= n.heat_min) return "var(--hl-off-fill)";
  const r = Math.min(1, Math.max(0, (e - t.lo) / Math.max(1, t.hi - t.lo)));
  return `hsl(${Math.round(42 - 34 * r)} ${Math.round(88 + 4 * r)}% ${Math.round(64 - 14 * r)}%)`;
}
function vp({
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
], gp = 5 * 6e4, Vr = (e) => {
  const t = Math.round(e);
  return t < 60 ? `${t}m` : t % 60 ? `${Math.floor(t / 60)}h ${t % 60}m` : `${t / 60}h`;
}, ei = (e, t) => new Date(e * 1e3).toLocaleDateString([], t), xp = (e) => new Date(e * 1e3).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
function yp(e, t, n) {
  if (n === 1) return ei(e, { weekday: "short", day: "numeric", month: "short" });
  const r = t - 86400, l = new Date(e * 1e3), o = new Date(r * 1e3), a = (s) => s.toLocaleDateString([], { month: "short" });
  return l.getMonth() === o.getMonth() ? `${l.getDate()}–${o.getDate()} ${a(o)}` : `${l.getDate()} ${a(l)} – ${o.getDate()} ${a(o)}`;
}
const is = (e) => e.filter((t) => t != null);
function wp(e) {
  if (e.period === 1) {
    const t = [];
    for (let n = 0; n < e.series.length; n += 4) {
      const r = e.series.slice(n, n + 4).filter((a) => a.heating != null);
      if (!r.length) continue;
      const l = is(r.map((a) => a.current)), o = is(e.series.slice(n, n + 4).map((a) => a.outdoor));
      t.push({
        key: e.series[n].t,
        label: [xp(e.series[n].t), ""],
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
function jc({ getHass: e, devices: t, channel: n }) {
  var M;
  const [r, l] = S.useState((M = t[0]) == null ? void 0 : M.entry_id), o = t.find((R) => R.entry_id === r) ?? t[0], a = n ?? "heat", [s, u] = S.useState(7), [c, g] = S.useState("time"), [v, h] = S.useState(0), [m, w] = S.useState(null), [y, C] = S.useState(""), [p, d] = S.useState(!0), f = a === "water", x = f ? "time" : c, k = S.useCallback(() => {
    o && e().callWS({ type: "hive_local/stats", entry_id: o.entry_id, channel: a, days: s, offset: v }).then((R) => {
      w(R), C("");
    }).catch((R) => C(he(R))).finally(() => d(!1));
  }, [e, o, a, s, v]);
  if (S.useEffect(() => {
    if (d(!0), k(), v) return;
    const R = setInterval(k, gp);
    return () => clearInterval(R);
  }, [k, v]), !o) return null;
  const j = m && m.period === s && m.offset === v ? m : null, P = j ? wp(j) : [], b = s === 1 ? "hour" : "day", E = !f && !!(j != null && j.outdoor);
  return /* @__PURE__ */ i.jsxs("div", { className: "history", children: [
    !n && /* @__PURE__ */ i.jsx("h2", { className: "history-title", children: "Heating history" }),
    !n && t.length > 1 && /* @__PURE__ */ i.jsx("div", { className: "history-tabs", role: "tablist", children: t.map((R) => /* @__PURE__ */ i.jsx("button", { role: "tab", "aria-selected": R.entry_id === o.entry_id, className: R.entry_id === o.entry_id ? "on" : "", onClick: () => {
      l(R.entry_id), h(0);
    }, children: R.name }, R.entry_id)) }),
    /* @__PURE__ */ i.jsxs("div", { className: "history-controls", children: [
      /* @__PURE__ */ i.jsx("div", { className: "history-toggle", role: "radiogroup", "aria-label": "Period", children: os.map((R) => /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": R.id === s, "aria-label": R.name, title: R.name, className: R.id === s ? "on" : "", onClick: () => {
        u(R.id), h(0);
      }, children: R.label }, R.id)) }),
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
        j ? yp(j.start, j.period_end, s) : "…"
      ] }),
      /* @__PURE__ */ i.jsx("button", { className: "round ghost", onClick: () => h(Math.max(0, v - 1)), disabled: v === 0, "aria-label": "Later", children: /* @__PURE__ */ i.jsx(T, { name: "chevron-right" }) })
    ] }),
    y && /* @__PURE__ */ i.jsx("div", { className: "status error", children: y }),
    p && !j && /* @__PURE__ */ i.jsx("p", { className: "muted history-empty", children: "Loading…" }),
    j && !j.has_data && /* @__PURE__ */ i.jsxs("p", { className: "muted history-empty", children: [
      "No history for this ",
      os.find((R) => R.id === s).name.toLowerCase(),
      ". Home Assistant keeps 10 days unless",
      " ",
      /* @__PURE__ */ i.jsx("code", { children: "purge_keep_days" }),
      " is raised."
    ] }),
    (j == null ? void 0 : j.has_data) && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx(jp, { data: j, metric: x, water: f, units: b, rows: P }),
      /* @__PURE__ */ i.jsxs("div", { className: "history-rows", children: [
        P.length > 0 && !f && /* @__PURE__ */ i.jsxs("div", { className: `history-key muted small ${E ? "with-outdoor" : ""}`, children: [
          E && /* @__PURE__ */ i.jsxs("span", { title: "Outside temperature", children: [
            /* @__PURE__ */ i.jsx(T, { name: "weather-partly-cloudy" }),
            " Outside"
          ] }),
          /* @__PURE__ */ i.jsxs("span", { title: "Lowest and highest room temperature", children: [
            /* @__PURE__ */ i.jsx(T, { name: "thermometer" }),
            " Low · high"
          ] })
        ] }),
        P.map((R) => /* @__PURE__ */ i.jsx(_p, { row: R, metric: x, water: f, outdoor: E, scale: kp(P, x, s) }, R.key))
      ] }),
      !f && j.outdoor_entity == null && /* @__PURE__ */ i.jsx("p", { className: "history-hint muted small", children: "To see the temperature outside here, pick a weather entity or outdoor sensor in Hive Local's settings (Settings › Devices & services › Hive Local › Configure)." })
    ] })
  ] });
}
function kp(e, t, n) {
  if (t === "time") return { lo: 0, hi: Math.max(60, ...e.map((a) => a.minutes ?? 0)) };
  const r = e.map((a) => a.avg).filter((a) => a != null), l = r.length ? Math.floor(Math.min(...r)) - 2 : 10, o = r.length ? Math.ceil(Math.max(...r)) : 25;
  return { lo: l, hi: Math.max(o, l + 4) };
}
function jp({ data: e, metric: t, water: n, units: r, rows: l }) {
  const o = Math.max(1, l.filter((w) => w.minutes != null).length), a = e.previous, s = !!(a != null && a.has_data) && a.known_minutes >= 0.5 * e.known_minutes, u = s ? e.heating_minutes - a.heating_minutes : 0, c = e.temperature, [g, v, h, m] = t === "time" ? [n ? "Hot water on" : "Boiler on", Vr(e.heating_minutes), `Average per ${r}`, Vr(e.heating_minutes / o)] : ["Average", c.avg != null ? `${c.avg.toFixed(1)}°` : "–", "Lowest – highest", c.min != null && c.max != null ? `${c.min.toFixed(1)}–${c.max.toFixed(1)}°` : "–"];
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
      !n && Sp(e)
    ] })
  ] });
}
function Sp(e) {
  var o, a;
  const t = (o = e.outdoor) == null ? void 0 : o.avg;
  if (t == null) return "";
  const n = (a = e.previous) == null ? void 0 : a.outdoor_avg, r = n != null ? t - n : null, l = r == null ? "" : Math.abs(r) < 0.5 ? ", about the same as the period before" : `, ${Math.abs(r).toFixed(0)}° ${r < 0 ? "colder" : "milder"} than the period before`;
  return ` · ${t.toFixed(0)}° outside${l}`;
}
function Np(e, t) {
  if (e == null || t == null) return "–";
  const [n, r] = [e.toFixed(0), t.toFixed(0)];
  return n === r ? `${n}°` : `${n}–${r}°`;
}
function _p({ row: e, metric: t, water: n, outdoor: r, scale: l }) {
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
    r && /* @__PURE__ */ i.jsx("span", { className: "history-outdoor", title: "Lowest and highest outside temperature", children: Np(e.outMin, e.outMax) }),
    !n && /* @__PURE__ */ i.jsxs("span", { className: "history-temps", title: "Lowest and highest room temperature", children: [
      e.min != null ? `${e.min.toFixed(0)}°` : "–",
      /* @__PURE__ */ i.jsx("span", { children: e.max != null ? `${e.max.toFixed(0)}°` : "–" })
    ] })
  ] });
}
const Cp = [
  { id: "control", label: "Control" },
  { id: "schedule", label: "Schedule" },
  { id: "history", label: "History" }
];
function Ep({
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
  var m, w;
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
    /* @__PURE__ */ i.jsx("div", { className: "page-tabs", role: "tablist", children: Cp.map((y) => /* @__PURE__ */ i.jsx("button", { role: "tab", "aria-selected": y.id === a, className: y.id === a ? "on" : "", onClick: () => s(y.id), children: y.label }, y.id)) }),
    a === "control" && /* @__PURE__ */ i.jsx(kc, { getHass: e, device: t, channel: n, info: r, showDevice: !1, limits: l, page: !0 }),
    a === "control" && n === "heat" && (r == null ? void 0 : r.preheat) && /* @__PURE__ */ i.jsx(cp, { getHass: e, device: t, info: r.preheat }),
    c && /* @__PURE__ */ i.jsx("div", { hidden: a !== "schedule", children: /* @__PURE__ */ i.jsx(pp, { getHass: e, device: t, channel: n, limits: l, mode: (v == null ? void 0 : v.mode) ?? null, preheatFor: (v == null ? void 0 : v.mode) === "boost" ? ((w = r == null ? void 0 : r.preheat) == null ? void 0 : w.active_for) ?? null : null }) }),
    a === "history" && /* @__PURE__ */ i.jsx(jc, { getHass: e, devices: [t], channel: n })
  ] });
}
const bp = 20, zp = 6e4;
function Pp({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onOpenDevice: l
}) {
  const [o, a] = S.useState(null), [s, u] = S.useState(""), [c, g] = S.useState(!1), v = S.useCallback(() => {
    e().callWS({ type: "hive_local/rooms/valves" }).then((m) => a(m.valves)).catch((m) => u(he(m)));
  }, [e]);
  S.useEffect(() => {
    v();
    const m = setInterval(v, zp);
    return () => clearInterval(m);
  }, [v]);
  const h = t.length > 1;
  return /* @__PURE__ */ i.jsxs("div", { className: "stack devices-page", children: [
    /* @__PURE__ */ i.jsx("h2", { className: "history-title", children: "Devices" }),
    s && /* @__PURE__ */ i.jsx("div", { className: "status error", children: s }),
    /* @__PURE__ */ i.jsxs("div", { className: "device-grid", children: [
      t.map((m) => /* @__PURE__ */ i.jsx($p, { device: m, status: n, onOpen: (w) => l(m.entry_id, w) }, m.entry_id)),
      o == null ? void 0 : o.map((m) => /* @__PURE__ */ i.jsx(Lp, { valve: m }, m.entity_id))
    ] }),
    o && !o.length && /* @__PURE__ */ i.jsx("p", { className: "muted", children: "No Hive radiator valves yet. Pair them with ZHA or Zigbee2MQTT and they'll show up here." }),
    h && /* @__PURE__ */ i.jsx("p", { className: "muted small", children: "Each receiver is a heating zone." }),
    /* @__PURE__ */ i.jsx("div", { className: "fab-wrap", children: /* @__PURE__ */ i.jsx("button", { className: "fab", "aria-label": "Add a device", onClick: () => g(!0), children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) }) }),
    c && /* @__PURE__ */ i.jsx(Mp, { onClose: () => g(!1) })
  ] });
}
const Tp = { z2m: "Zigbee2MQTT", zha: "ZHA" };
function Sc({ items: e }) {
  return /* @__PURE__ */ i.jsx("div", { className: "facts", children: e.map((t) => /* @__PURE__ */ i.jsxs("span", { className: `fact ${t.warn ? "warn" : ""}`, children: [
    /* @__PURE__ */ i.jsx(T, { name: t.icon }),
    " ",
    t.text
  ] }, t.text)) });
}
function Nc({ online: e, text: t }) {
  return /* @__PURE__ */ i.jsxs("span", { className: `online ${e ? "" : "no"}`, children: [
    /* @__PURE__ */ i.jsx("i", {}),
    t ?? (e ? "Online" : "Not responding")
  ] });
}
function $p({ device: e, status: t, onOpen: n }) {
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
      /* @__PURE__ */ i.jsx(Nc, { online: r, text: r ? "Online" : "Waiting" })
    ] }),
    /* @__PURE__ */ i.jsx(
      Sc,
      {
        items: [
          { icon: "zigbee", text: Tp[e.transport ?? "z2m"] },
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
function Lp({ valve: e }) {
  const t = e.battery != null && !Number.isNaN(Number(e.battery)) ? Number(e.battery) : null, n = t != null && t < bp;
  return /* @__PURE__ */ i.jsxs("section", { className: `card hw ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ i.jsxs("div", { className: "hw-head", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "thermostat" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "device-name", children: [
        /* @__PURE__ */ i.jsx("span", { children: e.name }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "Hive radiator valve" })
      ] }),
      /* @__PURE__ */ i.jsx(Nc, { online: e.available })
    ] }),
    /* @__PURE__ */ i.jsx(
      Sc,
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
function Mp({ onClose: e }) {
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
const _c = 20, vl = (e) => e == null ? "–" : `${e.toFixed(1)}°`;
function Rp({ valve: e, heating: t }) {
  const n = e.battery == null ? null : Number(e.battery), r = n != null && !Number.isNaN(n) && n <= _c;
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
function Op({ getHass: e, valves: t, info: n, roomName: r, thisRoom: l, chosen: o, onToggle: a }) {
  const [s, u] = S.useState(null), [c, g] = S.useState(null), v = S.useRef();
  S.useEffect(() => () => window.clearTimeout(v.current), []);
  const h = r.trim().toLowerCase(), m = [...t].sort((y, C) => +((C.area ?? "").toLowerCase() === h) - +((y.area ?? "").toLowerCase() === h)), w = async (y) => {
    g(null), u(y.entity_id);
    try {
      await e().callWS({ type: "hive_local/rooms/identify", entity_id: y.entity_id }), g({ kind: "ok", text: `${y.name} is flashing its light.` }), window.clearTimeout(v.current), v.current = window.setTimeout(() => {
        u(null), g(null);
      }, 1e4);
    } catch (C) {
      u(null), g({ kind: "error", text: he(C) });
    }
  };
  return m.length ? /* @__PURE__ */ i.jsxs("div", { className: "valve-picker", children: [
    /* @__PURE__ */ i.jsx("div", { className: "valve-list", children: m.map((y) => {
      const C = n.get(y.entity_id), p = o.has(y.entity_id), d = (C == null ? void 0 : C.battery) == null ? null : Number(C.battery), f = d != null && !Number.isNaN(d), x = f && d <= _c, k = C != null && C.room && C.room !== l ? C.room : null;
      return /* @__PURE__ */ i.jsxs("div", { className: `valve-pick ${p ? "on" : ""}`, children: [
        /* @__PURE__ */ i.jsxs("button", { type: "button", role: "checkbox", "aria-checked": p, className: "valve-pick-main", onClick: () => a(y.entity_id), children: [
          /* @__PURE__ */ i.jsx("span", { className: `valve-check ${p ? "on" : ""}`, "aria-hidden": "true", children: p && /* @__PURE__ */ i.jsx(T, { name: "check" }) }),
          /* @__PURE__ */ i.jsxs("span", { className: "valve-pick-text", children: [
            /* @__PURE__ */ i.jsx("span", { children: y.name }),
            /* @__PURE__ */ i.jsx("span", { className: "muted small", children: [y.area ?? "No area", k ? `in ${k}` : null].filter(Boolean).join(" · ") })
          ] }),
          /* @__PURE__ */ i.jsx("span", { className: "valve-pick-read small", children: C && !C.available ? "Not responding" : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
            (C == null ? void 0 : C.current_temperature) != null ? `${C.current_temperature.toFixed(1)}°` : "",
            f && /* @__PURE__ */ i.jsxs("span", { className: x ? "warn" : "", children: [
              (C == null ? void 0 : C.current_temperature) != null ? " · " : "",
              Math.round(d),
              "%"
            ] })
          ] }) })
        ] }),
        (C == null ? void 0 : C.identify) && /* @__PURE__ */ i.jsxs("button", { type: "button", className: `valve-find ${s === y.entity_id ? "on" : ""}`, onClick: () => w(y), disabled: s === y.entity_id, "aria-label": `Find ${y.name}: flash its light`, children: [
          /* @__PURE__ */ i.jsx(T, { name: "lightbulb-on-outline" }),
          " ",
          /* @__PURE__ */ i.jsx("span", { className: "valve-find-label", children: s === y.entity_id ? "Flashing" : "Find" })
        ] })
      ] }, y.entity_id);
    }) }),
    c && /* @__PURE__ */ i.jsx("div", { className: `status ${c.kind} small`, children: c.text })
  ] }) : null;
}
function Cc({ dialog: e, label: t, onClose: n, children: r }) {
  return e ? /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: (l) => {
    l.stopPropagation(), n();
  }, children: /* @__PURE__ */ i.jsxs("div", { className: "sheet room-sheet room-editor", role: "dialog", "aria-modal": "true", "aria-label": t, onClick: (l) => l.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    r
  ] }) }) : /* @__PURE__ */ i.jsx("section", { className: "card room-editor", children: r });
}
function Fp(e) {
  return /* @__PURE__ */ i.jsx(Ec, { ...e, dialog: !0 });
}
function Ec({ getHass: e, room: t, onDone: n, dialog: r }) {
  S.useEffect(() => {
    if (!r) return;
    const E = (M) => M.key === "Escape" && n();
    return window.addEventListener("keydown", E), () => window.removeEventListener("keydown", E);
  }, [r, n]);
  const [l, o] = S.useState(null), [a, s] = S.useState((t == null ? void 0 : t.receiver) ?? ""), [u, c] = S.useState((t == null ? void 0 : t.name) ?? ""), [g, v] = S.useState(new Set((t == null ? void 0 : t.valves) ?? [])), [h, m] = S.useState((t == null ? void 0 : t.sensor) ?? ""), [w, y] = S.useState(!1), [C, p] = S.useState(!1), [d, f] = S.useState(""), [x, k] = S.useState(/* @__PURE__ */ new Map());
  S.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/candidates" }).then(o).catch((E) => f(he(E))), e().callWS({ type: "hive_local/rooms/valves" }).then((E) => k(new Map(E.valves.map((M) => [M.entity_id, M])))).catch(() => {
    });
  }, [e]);
  const j = ((l == null ? void 0 : l.receivers.length) ?? 0) > 1, P = async (E) => {
    y(!0), f("");
    try {
      await e().callWS(E), n();
    } catch (M) {
      f(he(M)), y(!1);
    }
  }, b = (E) => v((M) => {
    const R = new Set(M);
    return R.has(E) ? R.delete(E) : R.add(E), R;
  });
  return /* @__PURE__ */ i.jsxs(Cc, { dialog: !!r, label: t ? `Edit ${t.name}` : "New room", onClose: n, children: [
    /* @__PURE__ */ i.jsx("h2", { children: t ? `Edit ${t.name}` : "New room" }),
    /* @__PURE__ */ i.jsxs(
      "form",
      {
        className: "stack",
        onSubmit: (E) => {
          E.preventDefault(), P({
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
            /* @__PURE__ */ i.jsx("input", { id: `room-name-${(t == null ? void 0 : t.id) ?? "new"}`, type: "text", value: u, maxLength: 40, placeholder: "Lounge", onChange: (E) => c(E.target.value) })
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
            /* @__PURE__ */ i.jsx(Op, { getHass: e, valves: (l == null ? void 0 : l.valves) ?? [], info: x, roomName: u, thisRoom: (t == null ? void 0 : t.name) ?? null, chosen: g, onToggle: b })
          ] }),
          /* @__PURE__ */ i.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ i.jsx("span", { children: "Room temperature from" }),
            /* @__PURE__ */ i.jsxs("select", { id: `room-sensor-${(t == null ? void 0 : t.id) ?? "new"}`, value: h, onChange: (E) => m(E.target.value), children: [
              /* @__PURE__ */ i.jsx("option", { value: "", children: "The valves (their average)" }),
              ((l == null ? void 0 : l.sensors) ?? []).map((E) => /* @__PURE__ */ i.jsxs("option", { value: E.entity_id, children: [
                E.name,
                E.area ? ` · ${E.area}` : ""
              ] }, E.entity_id))
            ] })
          ] }),
          j && /* @__PURE__ */ i.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ i.jsx("span", { children: "Heated by" }),
            /* @__PURE__ */ i.jsxs("select", { id: `room-receiver-${(t == null ? void 0 : t.id) ?? "new"}`, value: a, onChange: (E) => s(E.target.value), children: [
              /* @__PURE__ */ i.jsx("option", { value: "", disabled: !0, children: "Choose the receiver for this room's radiators" }),
              l.receivers.map((E) => /* @__PURE__ */ i.jsx("option", { value: E.entry_id, children: E.name }, E.entry_id))
            ] })
          ] }),
          d && /* @__PURE__ */ i.jsx("div", { className: "status error", children: d }),
          /* @__PURE__ */ i.jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ i.jsx("button", { className: "primary", type: "submit", disabled: w || !u.trim() || !g.size || j && !a, children: t ? "Save" : "Add room" }),
            /* @__PURE__ */ i.jsx("button", { type: "button", className: "ghost", onClick: n, disabled: w, children: "Cancel" }),
            /* @__PURE__ */ i.jsx("span", { className: "spacer" }),
            t && (C ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
              /* @__PURE__ */ i.jsxs("span", { className: "muted small", children: [
                "Delete ",
                t.name,
                "? The valves aren't changed."
              ] }),
              /* @__PURE__ */ i.jsx("button", { type: "button", className: "danger", disabled: w, onClick: () => P({ type: "hive_local/rooms/delete", room_id: t.id }), children: "Delete" }),
              /* @__PURE__ */ i.jsx("button", { type: "button", className: "ghost", onClick: () => p(!1), children: "Keep" })
            ] }) : /* @__PURE__ */ i.jsxs("button", { type: "button", className: "danger", onClick: () => p(!0), disabled: w, children: [
              /* @__PURE__ */ i.jsx(T, { name: "delete-outline" }),
              " Delete room"
            ] }))
          ] })
        ]
      }
    )
  ] });
}
function Dp({ getHass: e, roomId: t, several: n, onClose: r }) {
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
  if (a) return /* @__PURE__ */ i.jsx(Ec, { getHass: e, room: l, onDone: () => s(!1), dialog: !0 });
  const m = u ?? l.target ?? ((p = l.target_range) == null ? void 0 : p[1]) ?? 20, w = (d) => {
    const f = Math.min(35, Math.max(5, d));
    c(f), v(""), window.clearTimeout(h.current), h.current = window.setTimeout(async () => {
      try {
        const x = await e().callWS({ type: "hive_local/rooms/set_target", room_id: l.id, temperature: f });
        if (x.failed.length) {
          const k = l.valve_states.filter((j) => x.failed.includes(j.entity_id)).map((j) => j.name);
          v(`Didn't take on ${k.join(", ")}. It may be asleep; try again shortly.`);
        }
      } catch (x) {
        v(he(x));
      } finally {
        c(null);
      }
    }, 700);
  }, y = `${l.valves.length} valve${l.valves.length === 1 ? "" : "s"}`, C = l.temperature_source === "sensor" ? l.sensor_name : l.temperature_source === "valves" ? "Average of the valves" : "No reading";
  return /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: (d) => {
    d.stopPropagation(), r();
  }, children: /* @__PURE__ */ i.jsxs("div", { className: "sheet heat room-sheet", role: "dialog", "aria-modal": "true", "aria-label": l.name, onClick: (d) => d.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ i.jsx("h2", { children: l.name }),
      /* @__PURE__ */ i.jsx("span", { className: "muted", children: [l.heating ? "Heating" : "Idle", n ? l.receiver_name : null, y].filter(Boolean).join(" · ") })
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
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: l.target_range && u == null ? `Target (valves set to ${vl(l.target_range[0])}–${vl(l.target_range[1])})` : "Target" }),
      /* @__PURE__ */ i.jsxs("div", { className: "sheet-temp", children: [
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => w(m - 0.5), "aria-label": "Lower", children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
        /* @__PURE__ */ i.jsxs("span", { className: "sheet-temp-value", children: [
          m.toFixed(1),
          "°"
        ] }),
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => w(m + 0.5), "aria-label": "Raise", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Valves" }),
      /* @__PURE__ */ i.jsx("ul", { className: "valves", children: l.valve_states.map((d) => /* @__PURE__ */ i.jsx(Rp, { valve: d, heating: l.heating_valves.includes(d.entity_id) }, d.entity_id)) })
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
function Ip(e) {
  const t = e.toLowerCase();
  return /lounge|living|sitting|family|snug/.test(t) ? "sofa-outline" : /bed|nursery|guest/.test(t) ? "bed-outline" : /kitchen|dining/.test(t) ? "silverware-fork-knife" : /landing|hall|stair/.test(t) ? "stairs" : /study|office/.test(t) ? "desk" : /bath|shower|en-?suite|wc|toilet/.test(t) ? "shower" : "home-thermometer-outline";
}
function Ap({ getHass: e, onDone: t }) {
  const [n, r] = S.useState(null), [l, o] = S.useState(/* @__PURE__ */ new Map()), [a, s] = S.useState(/* @__PURE__ */ new Set()), [u, c] = S.useState({}), [g, v] = S.useState(!1), [h, m] = S.useState("");
  S.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/suggest" }).then((x) => {
      r(x), s(new Set(x.rooms.map((k, j) => j)));
    }).catch((x) => m(he(x))), e().callWS({ type: "hive_local/rooms/candidates" }).then((x) => o(new Map([...x.valves, ...x.sensors].map((k) => [k.entity_id, k.name])))).catch(() => {
    });
  }, [e]);
  const w = ((n == null ? void 0 : n.receivers.length) ?? 0) > 1, y = ((n == null ? void 0 : n.rooms) ?? []).map((x, k) => [x, k]).filter(([, x]) => a.has(x)), C = y.length > 0 && (!w || y.every(([, x]) => u[x])), p = ((n == null ? void 0 : n.rooms) ?? []).reduce((x, k) => x + k.valves.length, 0), d = async () => {
    v(!0), m("");
    try {
      for (const [x, k] of y)
        await e().callWS({ type: "hive_local/rooms/save", name: x.name, valves: x.valves, sensor: x.sensor, receiver: u[k] ?? null });
      t();
    } catch (x) {
      m(he(x)), v(!1);
    }
  }, f = (x) => s((k) => {
    const j = new Set(k);
    return j.has(x) ? j.delete(x) : j.add(x), j;
  });
  return /* @__PURE__ */ i.jsxs(Cc, { dialog: !0, label: "Set up your rooms", onClose: t, children: [
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
        const j = a.has(k), P = x.valves.map((E) => l.get(E) ?? E).join(", "), b = x.sensor ? `Temperature: ${l.get(x.sensor) ?? x.sensor}` : x.valves.length === 1 ? "Temperature: from the valve" : "Temperature: average of the valves";
        return /* @__PURE__ */ i.jsxs("div", { className: `setup-room ${j ? "on" : ""}`, children: [
          /* @__PURE__ */ i.jsxs("button", { type: "button", role: "checkbox", "aria-checked": j, className: "setup-room-main", onClick: () => f(k), children: [
            /* @__PURE__ */ i.jsx("span", { className: `valve-check ${j ? "on" : ""}`, "aria-hidden": "true", children: j && /* @__PURE__ */ i.jsx(T, { name: "check" }) }),
            /* @__PURE__ */ i.jsxs("span", { className: "setup-room-text", children: [
              /* @__PURE__ */ i.jsx("span", { children: x.name }),
              /* @__PURE__ */ i.jsx("span", { className: "muted small", children: P }),
              /* @__PURE__ */ i.jsx("span", { className: "muted small", children: b })
            ] }),
            /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: Ip(x.name) }) })
          ] }),
          w && j && /* @__PURE__ */ i.jsxs("select", { "aria-label": `Which receiver heats ${x.name}`, value: u[k] ?? "", onChange: (E) => c((M) => ({ ...M, [k]: E.target.value })), children: [
            /* @__PURE__ */ i.jsx("option", { value: "", disabled: !0, children: "Heated by…" }),
            n.receivers.map((E) => /* @__PURE__ */ i.jsx("option", { value: E.entry_id, children: E.name }, E.entry_id))
          ] })
        ] }, x.name);
      }) })
    ] }),
    h && /* @__PURE__ */ i.jsx("div", { className: "status error", children: h }),
    n && n.rooms.length > 0 && /* @__PURE__ */ i.jsx("button", { className: "sheet-go", style: { "--hl-accent": "var(--hl-brand)" }, disabled: g || !C, onClick: d, children: g ? "Creating…" : `Create ${y.length} room${y.length === 1 ? "" : "s"}` }),
    /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: t, disabled: g, children: n != null && n.rooms.length ? "I'll set them up myself" : "Close" })
  ] });
}
function Up({ getHass: e, devices: t, status: n }) {
  const [r, l] = S.useState(null), [o, a] = S.useState("");
  S.useEffect(() => {
    e().callWS({ type: "hive_local/settings" }).then(l).catch((u) => a(he(u)));
  }, [e]);
  const s = (u) => {
    l((c) => c && { ...c, outdoor_entity: u || null }), e().callWS({ type: "hive_local/settings/set", outdoor_entity: u || null }).catch((c) => a(he(c)));
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
    /* @__PURE__ */ i.jsx(Bp, { getHass: e }),
    t.map((u) => /* @__PURE__ */ i.jsxs("section", { className: "settings-section", children: [
      /* @__PURE__ */ i.jsx("h3", { children: t.length > 1 ? u.name : "Receiver" }),
      /* @__PURE__ */ i.jsx("div", { className: "settings-group", children: u.channels.map((c) => {
        var g;
        return /* @__PURE__ */ i.jsx(Wp, { getHass: e, device: u, channel: c, info: (g = n[u.entry_id]) == null ? void 0 : g[c] }, c);
      }) })
    ] }, u.entry_id))
  ] });
}
function Bp({ getHass: e }) {
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
    s && /* @__PURE__ */ i.jsx(Ap, { getHass: e, onDone: () => u(!1) }),
    o && /* @__PURE__ */ i.jsx(
      Fp,
      {
        getHass: e,
        room: o === "new" || t == null ? void 0 : t.find((h) => h.id === o),
        onDone: () => a(null)
      }
    )
  ] });
}
const Hp = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, Tr = [15, 30, 45, 60, 90, 120, 180, 240, 360];
function Wp({ getHass: e, device: t, channel: n, info: r }) {
  const [l, o] = S.useState(null), a = S.useRef(), s = l ?? r;
  if (!s) return null;
  const u = (v, h) => {
    const m = { ...s, [v]: h };
    o(m), window.clearTimeout(a.current), a.current = window.setTimeout(() => {
      e().callWS({ type: "hive_local/defaults", entry_id: t.entry_id, channel: n, [v]: h }).finally(() => o(null));
    }, 800);
  }, c = (v) => {
    const h = Tr.findIndex((w) => w >= s.boost_minutes), m = h < 0 ? Tr.length - 1 : h;
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
        /* @__PURE__ */ i.jsx(io, { label: "How long", value: Hp(s.boost_minutes), onLower: () => u("boost_minutes", c(-1)), onRaise: () => u("boost_minutes", c(1)) }),
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
const Vp = [
  { id: "overview", label: "Overview", icon: "view-dashboard-outline" },
  { id: "devices", label: "Devices", icon: "devices" },
  { id: "stats", label: "Stats", icon: "chart-box-outline" },
  { id: "settings", label: "Settings", icon: "tune-variant" }
];
function Qp({ getHass: e, narrow: t, onToggleMenu: n }) {
  var P;
  const [r, l] = S.useState([]), [o, a] = S.useState(null), [s, u] = S.useState({}), [c, g] = S.useState("overview"), [v, h] = S.useState(null), [m, w] = S.useState("control"), [y, C] = S.useState(null), [p, d] = S.useState("");
  S.useEffect(() => {
    e().callWS({ type: "hive_local/devices" }).then((E) => {
      l(E.devices), a(E.limits);
    }).catch((E) => d(he(E)));
    const b = e().connection.subscribeMessage(
      (E) => u(E.status),
      { type: "hive_local/subscribe" }
    );
    return () => {
      b.then((E) => E()).catch(() => {
      });
    };
  }, [e]);
  const f = (b, E) => {
    h({ entry: b, channel: E }), w("control");
  }, x = (b) => {
    g(b), h(null), C(null);
  }, k = v && r.find((b) => b.entry_id === v.entry), j = Vp;
  return /* @__PURE__ */ i.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ i.jsx("header", { children: /* @__PURE__ */ i.jsxs("div", { className: "toolbar-row", children: [
      t && /* @__PURE__ */ i.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ i.jsx(T, { name: "menu" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ i.jsx(ls, {}),
        /* @__PURE__ */ i.jsx("h1", { children: "Hive Local" })
      ] }),
      /* @__PURE__ */ i.jsx("nav", { className: "tabs", role: "tablist", children: j.map((b) => /* @__PURE__ */ i.jsxs("button", { role: "tab", "aria-selected": b.id === c, className: b.id === c ? "on" : "", onClick: () => x(b.id), children: [
        /* @__PURE__ */ i.jsx(T, { name: b.icon }),
        /* @__PURE__ */ i.jsx("span", { children: b.label })
      ] }, b.id)) })
    ] }) }),
    /* @__PURE__ */ i.jsxs("main", { children: [
      p && /* @__PURE__ */ i.jsx("div", { className: "status error", children: p }),
      !r.length && !p && /* @__PURE__ */ i.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ i.jsx(ls, { size: 56 }),
        /* @__PURE__ */ i.jsx("p", { children: "No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local." })
      ] }),
      k && o ? /* @__PURE__ */ i.jsx(
        Ep,
        {
          getHass: e,
          device: k,
          channel: v.channel,
          info: (P = s[k.entry_id]) == null ? void 0 : P[v.channel],
          limits: o,
          showDevice: r.length > 1,
          tab: m,
          onTab: w,
          onBack: () => h(null)
        },
        `${v.entry}-${v.channel}`
      ) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        c === "overview" && /* @__PURE__ */ i.jsx(op, { getHass: e, devices: r, status: s, limits: o, onOpenDevice: f, onOpenRoom: C }),
        c === "devices" && r.length > 0 && /* @__PURE__ */ i.jsx(Pp, { getHass: e, devices: r, status: s, limits: o, onOpenDevice: f }),
        c === "stats" && r.length > 0 && /* @__PURE__ */ i.jsx(jc, { getHass: e, devices: r }),
        c === "settings" && r.length > 0 && /* @__PURE__ */ i.jsx(Up, { getHass: e, devices: r, status: s })
      ] }),
      y && /* @__PURE__ */ i.jsx(
        Dp,
        {
          getHass: e,
          roomId: y,
          several: r.length > 1,
          onClose: () => C(null)
        }
      )
    ] })
  ] });
}
const Kp = (
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
class Yp extends HTMLElement {
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
      r.textContent = Kp;
      const l = document.createElement("div");
      n.append(r, l), this._root = yc(l);
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
        Qp,
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
customElements.get("hive-local-panel") || customElements.define("hive-local-panel", Yp);
