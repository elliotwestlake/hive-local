var Lc = Object.defineProperty;
var Mc = (e, t, n) => t in e ? Lc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var hr = (e, t, n) => Mc(e, typeof t != "symbol" ? t + "" : t, n);
var da = { exports: {} }, xl = {}, fa = { exports: {} }, D = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ar = Symbol.for("react.element"), Rc = Symbol.for("react.portal"), Oc = Symbol.for("react.fragment"), Fc = Symbol.for("react.strict_mode"), Dc = Symbol.for("react.profiler"), Ic = Symbol.for("react.provider"), Ac = Symbol.for("react.context"), Uc = Symbol.for("react.forward_ref"), Bc = Symbol.for("react.suspense"), Wc = Symbol.for("react.memo"), Hc = Symbol.for("react.lazy"), Zi = Symbol.iterator;
function Vc(e) {
  return e === null || typeof e != "object" ? null : (e = Zi && e[Zi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var pa = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ha = Object.assign, ma = {};
function xn(e, t, n) {
  this.props = e, this.context = t, this.refs = ma, this.updater = n || pa;
}
xn.prototype.isReactComponent = {};
xn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
xn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ga() {
}
ga.prototype = xn.prototype;
function ni(e, t, n) {
  this.props = e, this.context = t, this.refs = ma, this.updater = n || pa;
}
var ri = ni.prototype = new ga();
ri.constructor = ni;
ha(ri, xn.prototype);
ri.isPureReactComponent = !0;
var Ji = Array.isArray, va = Object.prototype.hasOwnProperty, li = { current: null }, xa = { key: !0, ref: !0, __self: !0, __source: !0 };
function ya(e, t, n) {
  var r, l = {}, o = null, s = null;
  if (t != null) for (r in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (o = "" + t.key), t) va.call(t, r) && !xa.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var u = Array(a), c = 0; c < a; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: ar, type: e, key: o, ref: s, props: l, _owner: li.current };
}
function Qc(e, t) {
  return { $$typeof: ar, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function oi(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ar;
}
function Kc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var qi = /\/+/g;
function Rl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Kc("" + e.key) : t.toString(36);
}
function Lr(e, t, n, r, l) {
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
        case ar:
        case Rc:
          s = !0;
      }
  }
  if (s) return s = e, l = l(s), e = r === "" ? "." + Rl(s, 0) : r, Ji(l) ? (n = "", e != null && (n = e.replace(qi, "$&/") + "/"), Lr(l, t, n, "", function(c) {
    return c;
  })) : l != null && (oi(l) && (l = Qc(l, n + (!l.key || s && s.key === l.key ? "" : ("" + l.key).replace(qi, "$&/") + "/") + e)), t.push(l)), 1;
  if (s = 0, r = r === "" ? "." : r + ":", Ji(e)) for (var a = 0; a < e.length; a++) {
    o = e[a];
    var u = r + Rl(o, a);
    s += Lr(o, t, n, u, l);
  }
  else if (u = Vc(e), typeof u == "function") for (e = u.call(e), a = 0; !(o = e.next()).done; ) o = o.value, u = r + Rl(o, a++), s += Lr(o, t, n, u, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return s;
}
function mr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Lr(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Yc(e) {
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
var ge = { current: null }, Mr = { transition: null }, Gc = { ReactCurrentDispatcher: ge, ReactCurrentBatchConfig: Mr, ReactCurrentOwner: li };
function wa() {
  throw Error("act(...) is not supported in production builds of React.");
}
D.Children = { map: mr, forEach: function(e, t, n) {
  mr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return mr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return mr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!oi(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
D.Component = xn;
D.Fragment = Oc;
D.Profiler = Dc;
D.PureComponent = ni;
D.StrictMode = Fc;
D.Suspense = Bc;
D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Gc;
D.act = wa;
D.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = ha({}, e.props), l = e.key, o = e.ref, s = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, s = li.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (u in t) va.call(t, u) && !xa.hasOwnProperty(u) && (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    a = Array(u);
    for (var c = 0; c < u; c++) a[c] = arguments[c + 2];
    r.children = a;
  }
  return { $$typeof: ar, type: e.type, key: l, ref: o, props: r, _owner: s };
};
D.createContext = function(e) {
  return e = { $$typeof: Ac, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Ic, _context: e }, e.Consumer = e;
};
D.createElement = ya;
D.createFactory = function(e) {
  var t = ya.bind(null, e);
  return t.type = e, t;
};
D.createRef = function() {
  return { current: null };
};
D.forwardRef = function(e) {
  return { $$typeof: Uc, render: e };
};
D.isValidElement = oi;
D.lazy = function(e) {
  return { $$typeof: Hc, _payload: { _status: -1, _result: e }, _init: Yc };
};
D.memo = function(e, t) {
  return { $$typeof: Wc, type: e, compare: t === void 0 ? null : t };
};
D.startTransition = function(e) {
  var t = Mr.transition;
  Mr.transition = {};
  try {
    e();
  } finally {
    Mr.transition = t;
  }
};
D.unstable_act = wa;
D.useCallback = function(e, t) {
  return ge.current.useCallback(e, t);
};
D.useContext = function(e) {
  return ge.current.useContext(e);
};
D.useDebugValue = function() {
};
D.useDeferredValue = function(e) {
  return ge.current.useDeferredValue(e);
};
D.useEffect = function(e, t) {
  return ge.current.useEffect(e, t);
};
D.useId = function() {
  return ge.current.useId();
};
D.useImperativeHandle = function(e, t, n) {
  return ge.current.useImperativeHandle(e, t, n);
};
D.useInsertionEffect = function(e, t) {
  return ge.current.useInsertionEffect(e, t);
};
D.useLayoutEffect = function(e, t) {
  return ge.current.useLayoutEffect(e, t);
};
D.useMemo = function(e, t) {
  return ge.current.useMemo(e, t);
};
D.useReducer = function(e, t, n) {
  return ge.current.useReducer(e, t, n);
};
D.useRef = function(e) {
  return ge.current.useRef(e);
};
D.useState = function(e) {
  return ge.current.useState(e);
};
D.useSyncExternalStore = function(e, t, n) {
  return ge.current.useSyncExternalStore(e, t, n);
};
D.useTransition = function() {
  return ge.current.useTransition();
};
D.version = "18.3.1";
fa.exports = D;
var N = fa.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xc = N, Zc = Symbol.for("react.element"), Jc = Symbol.for("react.fragment"), qc = Object.prototype.hasOwnProperty, ed = Xc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, td = { key: !0, ref: !0, __self: !0, __source: !0 };
function ka(e, t, n) {
  var r, l = {}, o = null, s = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (r in t) qc.call(t, r) && !td.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Zc, type: e, key: o, ref: s, props: l, _owner: ed.current };
}
xl.Fragment = Jc;
xl.jsx = ka;
xl.jsxs = ka;
da.exports = xl;
var i = da.exports, ja = { exports: {} }, Ee = {}, Sa = { exports: {} }, Na = {};
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
    var E = z.length;
    z.push(O);
    e: for (; 0 < E; ) {
      var M = E - 1 >>> 1, F = z[M];
      if (0 < l(F, O)) z[M] = O, z[E] = F, E = M;
      else break e;
    }
  }
  function n(z) {
    return z.length === 0 ? null : z[0];
  }
  function r(z) {
    if (z.length === 0) return null;
    var O = z[0], E = z.pop();
    if (E !== O) {
      z[0] = E;
      e: for (var M = 0, F = z.length, ae = F >>> 1; M < ae; ) {
        var ne = 2 * (M + 1) - 1, Ht = z[ne], We = ne + 1, U = z[We];
        if (0 > l(Ht, E)) We < F && 0 > l(U, Ht) ? (z[M] = U, z[We] = E, M = We) : (z[M] = Ht, z[ne] = E, M = ne);
        else if (We < F && 0 > l(U, E)) z[M] = U, z[We] = E, M = We;
        else break e;
      }
    }
    return O;
  }
  function l(z, O) {
    var E = z.sortIndex - O.sortIndex;
    return E !== 0 ? E : z.id - O.id;
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
  var u = [], c = [], v = 1, m = null, h = 3, g = !1, y = !1, w = !1, _ = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
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
    if (w = !1, f(z), !y) if (n(u) !== null) y = !0, ot(k);
    else {
      var O = n(c);
      O !== null && Ct(x, O.startTime - z);
    }
  }
  function k(z, O) {
    y = !1, w && (w = !1, p(j), j = -1), g = !0;
    var E = h;
    try {
      for (f(O), m = n(u); m !== null && (!(m.expirationTime > O) || z && !I()); ) {
        var M = m.callback;
        if (typeof M == "function") {
          m.callback = null, h = m.priorityLevel;
          var F = M(m.expirationTime <= O);
          O = e.unstable_now(), typeof F == "function" ? m.callback = F : m === n(u) && r(u), f(O);
        } else r(u);
        m = n(u);
      }
      if (m !== null) var ae = !0;
      else {
        var ne = n(c);
        ne !== null && Ct(x, ne.startTime - O), ae = !1;
      }
      return ae;
    } finally {
      m = null, h = E, g = !1;
    }
  }
  var C = !1, $ = null, j = -1, S = 5, P = -1;
  function I() {
    return !(e.unstable_now() - P < S);
  }
  function R() {
    if ($ !== null) {
      var z = e.unstable_now();
      P = z;
      var O = !0;
      try {
        O = $(!0, z);
      } finally {
        O ? J() : (C = !1, $ = null);
      }
    } else C = !1;
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
    _(R, 0);
  };
  function ot(z) {
    $ = z, C || (C = !0, J());
  }
  function Ct(z, O) {
    j = _(function() {
      z(e.unstable_now());
    }, O);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(z) {
    z.callback = null;
  }, e.unstable_continueExecution = function() {
    y || g || (y = !0, ot(k));
  }, e.unstable_forceFrameRate = function(z) {
    0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : S = 0 < z ? Math.floor(1e3 / z) : 5;
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
    var E = h;
    h = O;
    try {
      return z();
    } finally {
      h = E;
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
    var E = h;
    h = z;
    try {
      return O();
    } finally {
      h = E;
    }
  }, e.unstable_scheduleCallback = function(z, O, E) {
    var M = e.unstable_now();
    switch (typeof E == "object" && E !== null ? (E = E.delay, E = typeof E == "number" && 0 < E ? M + E : M) : E = M, z) {
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
    return F = E + F, z = { id: v++, callback: O, priorityLevel: z, startTime: E, expirationTime: F, sortIndex: -1 }, E > M ? (z.sortIndex = E, t(c, z), n(u) === null && z === n(c) && (w ? (p(j), j = -1) : w = !0, Ct(x, E - M))) : (z.sortIndex = F, t(u, z), y || g || (y = !0, ot(k))), z;
  }, e.unstable_shouldYield = I, e.unstable_wrapCallback = function(z) {
    var O = h;
    return function() {
      var E = h;
      h = O;
      try {
        return z.apply(this, arguments);
      } finally {
        h = E;
      }
    };
  };
})(Na);
Sa.exports = Na;
var nd = Sa.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rd = N, Ce = nd;
function b(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var _a = /* @__PURE__ */ new Set(), Vn = {};
function Bt(e, t) {
  dn(e, t), dn(e + "Capture", t);
}
function dn(e, t) {
  for (Vn[e] = t, e = 0; e < t.length; e++) _a.add(t[e]);
}
var et = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), so = Object.prototype.hasOwnProperty, ld = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, es = {}, ts = {};
function od(e) {
  return so.call(ts, e) ? !0 : so.call(es, e) ? !1 : ld.test(e) ? ts[e] = !0 : (es[e] = !0, !1);
}
function id(e, t, n, r) {
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
function sd(e, t, n, r) {
  if (t === null || typeof t > "u" || id(e, t, n, r)) return !0;
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
var se = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  se[e] = new ve(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  se[t] = new ve(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  se[e] = new ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  se[e] = new ve(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  se[e] = new ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  se[e] = new ve(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  se[e] = new ve(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  se[e] = new ve(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  se[e] = new ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ii = /[\-:]([a-z])/g;
function si(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ii,
    si
  );
  se[t] = new ve(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ii, si);
  se[t] = new ve(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ii, si);
  se[t] = new ve(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  se[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
se.xlinkHref = new ve("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  se[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ai(e, t, n, r) {
  var l = se.hasOwnProperty(t) ? se[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (sd(t, n, l, r) && (n = null), r || l === null ? od(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var lt = rd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, gr = Symbol.for("react.element"), Qt = Symbol.for("react.portal"), Kt = Symbol.for("react.fragment"), ui = Symbol.for("react.strict_mode"), ao = Symbol.for("react.profiler"), ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), ci = Symbol.for("react.forward_ref"), uo = Symbol.for("react.suspense"), co = Symbol.for("react.suspense_list"), di = Symbol.for("react.memo"), st = Symbol.for("react.lazy"), Ea = Symbol.for("react.offscreen"), ns = Symbol.iterator;
function kn(e) {
  return e === null || typeof e != "object" ? null : (e = ns && e[ns] || e["@@iterator"], typeof e == "function" ? e : null);
}
var G = Object.assign, Ol;
function Pn(e) {
  if (Ol === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Ol = t && t[1] || "";
  }
  return `
` + Ol + e;
}
var Fl = !1;
function Dl(e, t) {
  if (!e || Fl) return "";
  Fl = !0;
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
    Fl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Pn(e) : "";
}
function ad(e) {
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
      return e = Dl(e.type, !1), e;
    case 11:
      return e = Dl(e.type.render, !1), e;
    case 1:
      return e = Dl(e.type, !0), e;
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
    case ao:
      return "Profiler";
    case ui:
      return "StrictMode";
    case uo:
      return "Suspense";
    case co:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Ca:
      return (e.displayName || "Context") + ".Consumer";
    case ba:
      return (e._context.displayName || "Context") + ".Provider";
    case ci:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case di:
      return t = e.displayName || null, t !== null ? t : fo(e.type) || "Memo";
    case st:
      t = e._payload, e = e._init;
      try {
        return fo(e(t));
      } catch {
      }
  }
  return null;
}
function ud(e) {
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
      return t === ui ? "StrictMode" : "Mode";
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
function za(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function cd(e) {
  var t = za(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function vr(e) {
  e._valueTracker || (e._valueTracker = cd(e));
}
function Pa(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = za(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Kr(e) {
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
function rs(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = kt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Ta(e, t) {
  t = t.checked, t != null && ai(e, "checked", t, !1);
}
function ho(e, t) {
  Ta(e, t);
  var n = kt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? mo(e, t.type, n) : t.hasOwnProperty("defaultValue") && mo(e, t.type, kt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function ls(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function mo(e, t, n) {
  (t !== "number" || Kr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
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
function go(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(b(91));
  return G({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function os(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(b(92));
      if (Tn(n)) {
        if (1 < n.length) throw Error(b(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: kt(n) };
}
function $a(e, t) {
  var n = kt(t.value), r = kt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function is(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function La(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function vo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? La(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var xr, Ma = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (xr = xr || document.createElement("div"), xr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = xr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Qn(e, t) {
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
}, dd = ["Webkit", "ms", "Moz", "O"];
Object.keys(Mn).forEach(function(e) {
  dd.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Mn[t] = Mn[e];
  });
});
function Ra(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Mn.hasOwnProperty(e) && Mn[e] ? ("" + t).trim() : t + "px";
}
function Oa(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Ra(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var fd = G({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function xo(e, t) {
  if (t) {
    if (fd[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(b(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(b(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(b(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(b(62));
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
function fi(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var ko = null, on = null, sn = null;
function ss(e) {
  if (e = dr(e)) {
    if (typeof ko != "function") throw Error(b(280));
    var t = e.stateNode;
    t && (t = Sl(t), ko(e.stateNode, e.type, t));
  }
}
function Fa(e) {
  on ? sn ? sn.push(e) : sn = [e] : on = e;
}
function Da() {
  if (on) {
    var e = on, t = sn;
    if (sn = on = null, ss(e), t) for (e = 0; e < t.length; e++) ss(t[e]);
  }
}
function Ia(e, t) {
  return e(t);
}
function Aa() {
}
var Il = !1;
function Ua(e, t, n) {
  if (Il) return e(t, n);
  Il = !0;
  try {
    return Ia(e, t, n);
  } finally {
    Il = !1, (on !== null || sn !== null) && (Aa(), Da());
  }
}
function Kn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Sl(n);
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
  if (n && typeof n != "function") throw Error(b(231, t, typeof n));
  return n;
}
var jo = !1;
if (et) try {
  var jn = {};
  Object.defineProperty(jn, "passive", { get: function() {
    jo = !0;
  } }), window.addEventListener("test", jn, jn), window.removeEventListener("test", jn, jn);
} catch {
  jo = !1;
}
function pd(e, t, n, r, l, o, s, a, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (v) {
    this.onError(v);
  }
}
var Rn = !1, Yr = null, Gr = !1, So = null, hd = { onError: function(e) {
  Rn = !0, Yr = e;
} };
function md(e, t, n, r, l, o, s, a, u) {
  Rn = !1, Yr = null, pd.apply(hd, arguments);
}
function gd(e, t, n, r, l, o, s, a, u) {
  if (md.apply(this, arguments), Rn) {
    if (Rn) {
      var c = Yr;
      Rn = !1, Yr = null;
    } else throw Error(b(198));
    Gr || (Gr = !0, So = c);
  }
}
function Wt(e) {
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
function Ba(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function as(e) {
  if (Wt(e) !== e) throw Error(b(188));
}
function vd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Wt(e), t === null) throw Error(b(188));
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
        if (o === n) return as(l), e;
        if (o === r) return as(l), t;
        o = o.sibling;
      }
      throw Error(b(188));
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
        if (!s) throw Error(b(189));
      }
    }
    if (n.alternate !== r) throw Error(b(190));
  }
  if (n.tag !== 3) throw Error(b(188));
  return n.stateNode.current === n ? e : t;
}
function Wa(e) {
  return e = vd(e), e !== null ? Ha(e) : null;
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
var Va = Ce.unstable_scheduleCallback, us = Ce.unstable_cancelCallback, xd = Ce.unstable_shouldYield, yd = Ce.unstable_requestPaint, Z = Ce.unstable_now, wd = Ce.unstable_getCurrentPriorityLevel, pi = Ce.unstable_ImmediatePriority, Qa = Ce.unstable_UserBlockingPriority, Xr = Ce.unstable_NormalPriority, kd = Ce.unstable_LowPriority, Ka = Ce.unstable_IdlePriority, yl = null, Ke = null;
function jd(e) {
  if (Ke && typeof Ke.onCommitFiberRoot == "function") try {
    Ke.onCommitFiberRoot(yl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ae = Math.clz32 ? Math.clz32 : _d, Sd = Math.log, Nd = Math.LN2;
function _d(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Sd(e) / Nd | 0) | 0;
}
var yr = 64, wr = 4194304;
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
function Zr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, s = n & 268435455;
  if (s !== 0) {
    var a = s & ~l;
    a !== 0 ? r = $n(a) : (o &= s, o !== 0 && (r = $n(o)));
  } else s = n & ~l, s !== 0 ? r = $n(s) : o !== 0 && (r = $n(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Ae(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function bd(e, t) {
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
function Cd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var s = 31 - Ae(o), a = 1 << s, u = l[s];
    u === -1 ? (!(a & n) || a & r) && (l[s] = bd(a, t)) : u <= t && (e.expiredLanes |= a), o &= ~a;
  }
}
function No(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ya() {
  var e = yr;
  return yr <<= 1, !(yr & 4194240) && (yr = 64), e;
}
function Al(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ur(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ae(t), e[t] = n;
}
function Ed(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Ae(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function hi(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Ae(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var B = 0;
function Ga(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Xa, mi, Za, Ja, qa, _o = !1, kr = [], pt = null, ht = null, mt = null, Yn = /* @__PURE__ */ new Map(), Gn = /* @__PURE__ */ new Map(), ut = [], zd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function cs(e, t) {
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
      Yn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Gn.delete(t.pointerId);
  }
}
function Sn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = dr(t), t !== null && mi(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Pd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return pt = Sn(pt, e, t, n, r, l), !0;
    case "dragenter":
      return ht = Sn(ht, e, t, n, r, l), !0;
    case "mouseover":
      return mt = Sn(mt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Yn.set(o, Sn(Yn.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Gn.set(o, Sn(Gn.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function eu(e) {
  var t = Tt(e.target);
  if (t !== null) {
    var n = Wt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ba(n), t !== null) {
          e.blockedOn = t, qa(e.priority, function() {
            Za(n);
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
function Rr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = bo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      wo = r, n.target.dispatchEvent(r), wo = null;
    } else return t = dr(n), t !== null && mi(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function ds(e, t, n) {
  Rr(e) && n.delete(t);
}
function Td() {
  _o = !1, pt !== null && Rr(pt) && (pt = null), ht !== null && Rr(ht) && (ht = null), mt !== null && Rr(mt) && (mt = null), Yn.forEach(ds), Gn.forEach(ds);
}
function Nn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, _o || (_o = !0, Ce.unstable_scheduleCallback(Ce.unstable_NormalPriority, Td)));
}
function Xn(e) {
  function t(l) {
    return Nn(l, e);
  }
  if (0 < kr.length) {
    Nn(kr[0], e);
    for (var n = 1; n < kr.length; n++) {
      var r = kr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (pt !== null && Nn(pt, e), ht !== null && Nn(ht, e), mt !== null && Nn(mt, e), Yn.forEach(t), Gn.forEach(t), n = 0; n < ut.length; n++) r = ut[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ut.length && (n = ut[0], n.blockedOn === null); ) eu(n), n.blockedOn === null && ut.shift();
}
var an = lt.ReactCurrentBatchConfig, Jr = !0;
function $d(e, t, n, r) {
  var l = B, o = an.transition;
  an.transition = null;
  try {
    B = 1, gi(e, t, n, r);
  } finally {
    B = l, an.transition = o;
  }
}
function Ld(e, t, n, r) {
  var l = B, o = an.transition;
  an.transition = null;
  try {
    B = 4, gi(e, t, n, r);
  } finally {
    B = l, an.transition = o;
  }
}
function gi(e, t, n, r) {
  if (Jr) {
    var l = bo(e, t, n, r);
    if (l === null) Xl(e, t, r, qr, n), cs(e, r);
    else if (Pd(l, e, t, n, r)) r.stopPropagation();
    else if (cs(e, r), t & 4 && -1 < zd.indexOf(e)) {
      for (; l !== null; ) {
        var o = dr(l);
        if (o !== null && Xa(o), o = bo(e, t, n, r), o === null && Xl(e, t, r, qr, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Xl(e, t, r, null, n);
  }
}
var qr = null;
function bo(e, t, n, r) {
  if (qr = null, e = fi(r), e = Tt(e), e !== null) if (t = Wt(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ba(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return qr = e, null;
}
function tu(e) {
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
      switch (wd()) {
        case pi:
          return 1;
        case Qa:
          return 4;
        case Xr:
        case kd:
          return 16;
        case Ka:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var dt = null, vi = null, Or = null;
function nu() {
  if (Or) return Or;
  var e, t = vi, n = t.length, r, l = "value" in dt ? dt.value : dt.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === l[o - r]; r++) ;
  return Or = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Fr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function jr() {
  return !0;
}
function fs() {
  return !1;
}
function ze(e) {
  function t(n, r, l, o, s) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = s, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(o) : o[a]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? jr : fs, this.isPropagationStopped = fs, this;
  }
  return G(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = jr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = jr);
  }, persist: function() {
  }, isPersistent: jr }), t;
}
var yn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, xi = ze(yn), cr = G({}, yn, { view: 0, detail: 0 }), Md = ze(cr), Ul, Bl, _n, wl = G({}, cr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: yi, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== _n && (_n && e.type === "mousemove" ? (Ul = e.screenX - _n.screenX, Bl = e.screenY - _n.screenY) : Bl = Ul = 0, _n = e), Ul);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Bl;
} }), ps = ze(wl), Rd = G({}, wl, { dataTransfer: 0 }), Od = ze(Rd), Fd = G({}, cr, { relatedTarget: 0 }), Wl = ze(Fd), Dd = G({}, yn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Id = ze(Dd), Ad = G({}, yn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Ud = ze(Ad), Bd = G({}, yn, { data: 0 }), hs = ze(Bd), Wd = {
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
}, Hd = {
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
}, Vd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Qd(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Vd[e]) ? !!t[e] : !1;
}
function yi() {
  return Qd;
}
var Kd = G({}, cr, { key: function(e) {
  if (e.key) {
    var t = Wd[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Fr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Hd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: yi, charCode: function(e) {
  return e.type === "keypress" ? Fr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Fr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Yd = ze(Kd), Gd = G({}, wl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ms = ze(Gd), Xd = G({}, cr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: yi }), Zd = ze(Xd), Jd = G({}, yn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), qd = ze(Jd), ef = G({}, wl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), tf = ze(ef), nf = [9, 13, 27, 32], wi = et && "CompositionEvent" in window, On = null;
et && "documentMode" in document && (On = document.documentMode);
var rf = et && "TextEvent" in window && !On, ru = et && (!wi || On && 8 < On && 11 >= On), gs = " ", vs = !1;
function lu(e, t) {
  switch (e) {
    case "keyup":
      return nf.indexOf(t.keyCode) !== -1;
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
function ou(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Yt = !1;
function lf(e, t) {
  switch (e) {
    case "compositionend":
      return ou(t);
    case "keypress":
      return t.which !== 32 ? null : (vs = !0, gs);
    case "textInput":
      return e = t.data, e === gs && vs ? null : e;
    default:
      return null;
  }
}
function of(e, t) {
  if (Yt) return e === "compositionend" || !wi && lu(e, t) ? (e = nu(), Or = vi = dt = null, Yt = !1, e) : null;
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
      return ru && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var sf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function xs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!sf[e.type] : t === "textarea";
}
function iu(e, t, n, r) {
  Fa(r), t = el(t, "onChange"), 0 < t.length && (n = new xi("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Fn = null, Zn = null;
function af(e) {
  vu(e, 0);
}
function kl(e) {
  var t = Zt(e);
  if (Pa(t)) return e;
}
function uf(e, t) {
  if (e === "change") return t;
}
var su = !1;
if (et) {
  var Hl;
  if (et) {
    var Vl = "oninput" in document;
    if (!Vl) {
      var ys = document.createElement("div");
      ys.setAttribute("oninput", "return;"), Vl = typeof ys.oninput == "function";
    }
    Hl = Vl;
  } else Hl = !1;
  su = Hl && (!document.documentMode || 9 < document.documentMode);
}
function ws() {
  Fn && (Fn.detachEvent("onpropertychange", au), Zn = Fn = null);
}
function au(e) {
  if (e.propertyName === "value" && kl(Zn)) {
    var t = [];
    iu(t, Zn, e, fi(e)), Ua(af, t);
  }
}
function cf(e, t, n) {
  e === "focusin" ? (ws(), Fn = t, Zn = n, Fn.attachEvent("onpropertychange", au)) : e === "focusout" && ws();
}
function df(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return kl(Zn);
}
function ff(e, t) {
  if (e === "click") return kl(t);
}
function pf(e, t) {
  if (e === "input" || e === "change") return kl(t);
}
function hf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Be = typeof Object.is == "function" ? Object.is : hf;
function Jn(e, t) {
  if (Be(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!so.call(t, l) || !Be(e[l], t[l])) return !1;
  }
  return !0;
}
function ks(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function js(e, t) {
  var n = ks(e);
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
    n = ks(n);
  }
}
function uu(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? uu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function cu() {
  for (var e = window, t = Kr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Kr(e.document);
  }
  return t;
}
function ki(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function mf(e) {
  var t = cu(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && uu(n.ownerDocument.documentElement, n)) {
    if (r !== null && ki(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = js(n, o);
        var s = js(
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
var gf = et && "documentMode" in document && 11 >= document.documentMode, Gt = null, Co = null, Dn = null, Eo = !1;
function Ss(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Eo || Gt == null || Gt !== Kr(r) || (r = Gt, "selectionStart" in r && ki(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Dn && Jn(Dn, r) || (Dn = r, r = el(Co, "onSelect"), 0 < r.length && (t = new xi("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Gt)));
}
function Sr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Xt = { animationend: Sr("Animation", "AnimationEnd"), animationiteration: Sr("Animation", "AnimationIteration"), animationstart: Sr("Animation", "AnimationStart"), transitionend: Sr("Transition", "TransitionEnd") }, Ql = {}, du = {};
et && (du = document.createElement("div").style, "AnimationEvent" in window || (delete Xt.animationend.animation, delete Xt.animationiteration.animation, delete Xt.animationstart.animation), "TransitionEvent" in window || delete Xt.transitionend.transition);
function jl(e) {
  if (Ql[e]) return Ql[e];
  if (!Xt[e]) return e;
  var t = Xt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in du) return Ql[e] = t[n];
  return e;
}
var fu = jl("animationend"), pu = jl("animationiteration"), hu = jl("animationstart"), mu = jl("transitionend"), gu = /* @__PURE__ */ new Map(), Ns = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function St(e, t) {
  gu.set(e, t), Bt(t, [e]);
}
for (var Kl = 0; Kl < Ns.length; Kl++) {
  var Yl = Ns[Kl], vf = Yl.toLowerCase(), xf = Yl[0].toUpperCase() + Yl.slice(1);
  St(vf, "on" + xf);
}
St(fu, "onAnimationEnd");
St(pu, "onAnimationIteration");
St(hu, "onAnimationStart");
St("dblclick", "onDoubleClick");
St("focusin", "onFocus");
St("focusout", "onBlur");
St(mu, "onTransitionEnd");
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
var Ln = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), yf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ln));
function _s(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, gd(r, t, void 0, e), e.currentTarget = null;
}
function vu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var s = r.length - 1; 0 <= s; s--) {
        var a = r[s], u = a.instance, c = a.currentTarget;
        if (a = a.listener, u !== o && l.isPropagationStopped()) break e;
        _s(l, a, c), o = u;
      }
      else for (s = 0; s < r.length; s++) {
        if (a = r[s], u = a.instance, c = a.currentTarget, a = a.listener, u !== o && l.isPropagationStopped()) break e;
        _s(l, a, c), o = u;
      }
    }
  }
  if (Gr) throw e = So, Gr = !1, So = null, e;
}
function H(e, t) {
  var n = t[Lo];
  n === void 0 && (n = t[Lo] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (xu(t, e, 2, !1), n.add(r));
}
function Gl(e, t, n) {
  var r = 0;
  t && (r |= 4), xu(n, e, r, t);
}
var Nr = "_reactListening" + Math.random().toString(36).slice(2);
function qn(e) {
  if (!e[Nr]) {
    e[Nr] = !0, _a.forEach(function(n) {
      n !== "selectionchange" && (yf.has(n) || Gl(n, !1, e), Gl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Nr] || (t[Nr] = !0, Gl("selectionchange", !1, t));
  }
}
function xu(e, t, n, r) {
  switch (tu(t)) {
    case 1:
      var l = $d;
      break;
    case 4:
      l = Ld;
      break;
    default:
      l = gi;
  }
  n = l.bind(null, t, n, e), l = void 0, !jo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Xl(e, t, n, r, l) {
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
        if (s = Tt(a), s === null) return;
        if (u = s.tag, u === 5 || u === 6) {
          r = o = s;
          continue e;
        }
        a = a.parentNode;
      }
    }
    r = r.return;
  }
  Ua(function() {
    var c = o, v = fi(n), m = [];
    e: {
      var h = gu.get(e);
      if (h !== void 0) {
        var g = xi, y = e;
        switch (e) {
          case "keypress":
            if (Fr(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = Yd;
            break;
          case "focusin":
            y = "focus", g = Wl;
            break;
          case "focusout":
            y = "blur", g = Wl;
            break;
          case "beforeblur":
          case "afterblur":
            g = Wl;
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
            g = ps;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = Od;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = Zd;
            break;
          case fu:
          case pu:
          case hu:
            g = Id;
            break;
          case mu:
            g = qd;
            break;
          case "scroll":
            g = Md;
            break;
          case "wheel":
            g = tf;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = Ud;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = ms;
        }
        var w = (t & 4) !== 0, _ = !w && e === "scroll", p = w ? h !== null ? h + "Capture" : null : h;
        w = [];
        for (var d = c, f; d !== null; ) {
          f = d;
          var x = f.stateNode;
          if (f.tag === 5 && x !== null && (f = x, p !== null && (x = Kn(d, p), x != null && w.push(er(d, x, f)))), _) break;
          d = d.return;
        }
        0 < w.length && (h = new g(h, y, null, n, v), m.push({ event: h, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", g = e === "mouseout" || e === "pointerout", h && n !== wo && (y = n.relatedTarget || n.fromElement) && (Tt(y) || y[tt])) break e;
        if ((g || h) && (h = v.window === v ? v : (h = v.ownerDocument) ? h.defaultView || h.parentWindow : window, g ? (y = n.relatedTarget || n.toElement, g = c, y = y ? Tt(y) : null, y !== null && (_ = Wt(y), y !== _ || y.tag !== 5 && y.tag !== 6) && (y = null)) : (g = null, y = c), g !== y)) {
          if (w = ps, x = "onMouseLeave", p = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (w = ms, x = "onPointerLeave", p = "onPointerEnter", d = "pointer"), _ = g == null ? h : Zt(g), f = y == null ? h : Zt(y), h = new w(x, d + "leave", g, n, v), h.target = _, h.relatedTarget = f, x = null, Tt(v) === c && (w = new w(p, d + "enter", y, n, v), w.target = f, w.relatedTarget = _, x = w), _ = x, g && y) t: {
            for (w = g, p = y, d = 0, f = w; f; f = Vt(f)) d++;
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
          g !== null && bs(m, h, g, w, !1), y !== null && _ !== null && bs(m, _, y, w, !0);
        }
      }
      e: {
        if (h = c ? Zt(c) : window, g = h.nodeName && h.nodeName.toLowerCase(), g === "select" || g === "input" && h.type === "file") var k = uf;
        else if (xs(h)) if (su) k = pf;
        else {
          k = df;
          var C = cf;
        }
        else (g = h.nodeName) && g.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (k = ff);
        if (k && (k = k(e, c))) {
          iu(m, k, n, v);
          break e;
        }
        C && C(e, h, c), e === "focusout" && (C = h._wrapperState) && C.controlled && h.type === "number" && mo(h, "number", h.value);
      }
      switch (C = c ? Zt(c) : window, e) {
        case "focusin":
          (xs(C) || C.contentEditable === "true") && (Gt = C, Co = c, Dn = null);
          break;
        case "focusout":
          Dn = Co = Gt = null;
          break;
        case "mousedown":
          Eo = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Eo = !1, Ss(m, n, v);
          break;
        case "selectionchange":
          if (gf) break;
        case "keydown":
        case "keyup":
          Ss(m, n, v);
      }
      var $;
      if (wi) e: {
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
      else Yt ? lu(e, n) && (j = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (j = "onCompositionStart");
      j && (ru && n.locale !== "ko" && (Yt || j !== "onCompositionStart" ? j === "onCompositionEnd" && Yt && ($ = nu()) : (dt = v, vi = "value" in dt ? dt.value : dt.textContent, Yt = !0)), C = el(c, j), 0 < C.length && (j = new hs(j, e, null, n, v), m.push({ event: j, listeners: C }), $ ? j.data = $ : ($ = ou(n), $ !== null && (j.data = $)))), ($ = rf ? lf(e, n) : of(e, n)) && (c = el(c, "onBeforeInput"), 0 < c.length && (v = new hs("onBeforeInput", "beforeinput", null, n, v), m.push({ event: v, listeners: c }), v.data = $));
    }
    vu(m, t);
  });
}
function er(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function el(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Kn(e, n), o != null && r.unshift(er(e, o, l)), o = Kn(e, t), o != null && r.push(er(e, o, l))), e = e.return;
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
function bs(e, t, n, r, l) {
  for (var o = t._reactName, s = []; n !== null && n !== r; ) {
    var a = n, u = a.alternate, c = a.stateNode;
    if (u !== null && u === r) break;
    a.tag === 5 && c !== null && (a = c, l ? (u = Kn(n, o), u != null && s.unshift(er(n, u, a))) : l || (u = Kn(n, o), u != null && s.push(er(n, u, a)))), n = n.return;
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var wf = /\r\n?/g, kf = /\u0000|\uFFFD/g;
function Cs(e) {
  return (typeof e == "string" ? e : "" + e).replace(wf, `
`).replace(kf, "");
}
function _r(e, t, n) {
  if (t = Cs(t), Cs(e) !== t && n) throw Error(b(425));
}
function tl() {
}
var zo = null, Po = null;
function To(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var $o = typeof setTimeout == "function" ? setTimeout : void 0, jf = typeof clearTimeout == "function" ? clearTimeout : void 0, Es = typeof Promise == "function" ? Promise : void 0, Sf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Es < "u" ? function(e) {
  return Es.resolve(null).then(e).catch(Nf);
} : $o;
function Nf(e) {
  setTimeout(function() {
    throw e;
  });
}
function Zl(e, t) {
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
function zs(e) {
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
var wn = Math.random().toString(36).slice(2), Qe = "__reactFiber$" + wn, tr = "__reactProps$" + wn, tt = "__reactContainer$" + wn, Lo = "__reactEvents$" + wn, _f = "__reactListeners$" + wn, bf = "__reactHandles$" + wn;
function Tt(e) {
  var t = e[Qe];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[tt] || n[Qe]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = zs(e); e !== null; ) {
        if (n = e[Qe]) return n;
        e = zs(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function dr(e) {
  return e = e[Qe] || e[tt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Zt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(b(33));
}
function Sl(e) {
  return e[tr] || null;
}
var Mo = [], Jt = -1;
function Nt(e) {
  return { current: e };
}
function V(e) {
  0 > Jt || (e.current = Mo[Jt], Mo[Jt] = null, Jt--);
}
function W(e, t) {
  Jt++, Mo[Jt] = e.current, e.current = t;
}
var jt = {}, fe = Nt(jt), ke = Nt(!1), Ft = jt;
function fn(e, t) {
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
function nl() {
  V(ke), V(fe);
}
function Ps(e, t, n) {
  if (fe.current !== jt) throw Error(b(168));
  W(fe, t), W(ke, n);
}
function yu(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(b(108, ud(e) || "Unknown", l));
  return G({}, n, r);
}
function rl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || jt, Ft = fe.current, W(fe, e), W(ke, ke.current), !0;
}
function Ts(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(b(169));
  n ? (e = yu(e, t, Ft), r.__reactInternalMemoizedMergedChildContext = e, V(ke), V(fe), W(fe, e)) : V(ke), W(ke, n);
}
var Xe = null, Nl = !1, Jl = !1;
function wu(e) {
  Xe === null ? Xe = [e] : Xe.push(e);
}
function Cf(e) {
  Nl = !0, wu(e);
}
function _t() {
  if (!Jl && Xe !== null) {
    Jl = !0;
    var e = 0, t = B;
    try {
      var n = Xe;
      for (B = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Xe = null, Nl = !1;
    } catch (l) {
      throw Xe !== null && (Xe = Xe.slice(e + 1)), Va(pi, _t), l;
    } finally {
      B = t, Jl = !1;
    }
  }
  return null;
}
var qt = [], en = 0, ll = null, ol = 0, Pe = [], Te = 0, Dt = null, Ze = 1, Je = "";
function zt(e, t) {
  qt[en++] = ol, qt[en++] = ll, ll = e, ol = t;
}
function ku(e, t, n) {
  Pe[Te++] = Ze, Pe[Te++] = Je, Pe[Te++] = Dt, Dt = e;
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
function ji(e) {
  e.return !== null && (zt(e, 1), ku(e, 1, 0));
}
function Si(e) {
  for (; e === ll; ) ll = qt[--en], qt[en] = null, ol = qt[--en], qt[en] = null;
  for (; e === Dt; ) Dt = Pe[--Te], Pe[Te] = null, Je = Pe[--Te], Pe[Te] = null, Ze = Pe[--Te], Pe[Te] = null;
}
var be = null, _e = null, Q = !1, Ie = null;
function ju(e, t) {
  var n = $e(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function $s(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, be = e, _e = gt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, be = e, _e = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Dt !== null ? { id: Ze, overflow: Je } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = $e(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, be = e, _e = null, !0) : !1;
    default:
      return !1;
  }
}
function Ro(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Oo(e) {
  if (Q) {
    var t = _e;
    if (t) {
      var n = t;
      if (!$s(e, t)) {
        if (Ro(e)) throw Error(b(418));
        t = gt(n.nextSibling);
        var r = be;
        t && $s(e, t) ? ju(r, n) : (e.flags = e.flags & -4097 | 2, Q = !1, be = e);
      }
    } else {
      if (Ro(e)) throw Error(b(418));
      e.flags = e.flags & -4097 | 2, Q = !1, be = e;
    }
  }
}
function Ls(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  be = e;
}
function br(e) {
  if (e !== be) return !1;
  if (!Q) return Ls(e), Q = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !To(e.type, e.memoizedProps)), t && (t = _e)) {
    if (Ro(e)) throw Su(), Error(b(418));
    for (; t; ) ju(e, t), t = gt(t.nextSibling);
  }
  if (Ls(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(b(317));
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
function Su() {
  for (var e = _e; e; ) e = gt(e.nextSibling);
}
function pn() {
  _e = be = null, Q = !1;
}
function Ni(e) {
  Ie === null ? Ie = [e] : Ie.push(e);
}
var Ef = lt.ReactCurrentBatchConfig;
function bn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(b(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(b(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(s) {
        var a = l.refs;
        s === null ? delete a[o] : a[o] = s;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(b(284));
    if (!n._owner) throw Error(b(290, e));
  }
  return e;
}
function Cr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(b(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Ms(e) {
  var t = e._init;
  return t(e._payload);
}
function Nu(e) {
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
  function s(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function a(p, d, f, x) {
    return d === null || d.tag !== 6 ? (d = oo(f, p.mode, x), d.return = p, d) : (d = l(d, f), d.return = p, d);
  }
  function u(p, d, f, x) {
    var k = f.type;
    return k === Kt ? v(p, d, f.props.children, x, f.key) : d !== null && (d.elementType === k || typeof k == "object" && k !== null && k.$$typeof === st && Ms(k) === d.type) ? (x = l(d, f.props), x.ref = bn(p, d, f), x.return = p, x) : (x = Hr(f.type, f.key, f.props, null, p.mode, x), x.ref = bn(p, d, f), x.return = p, x);
  }
  function c(p, d, f, x) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== f.containerInfo || d.stateNode.implementation !== f.implementation ? (d = io(f, p.mode, x), d.return = p, d) : (d = l(d, f.children || []), d.return = p, d);
  }
  function v(p, d, f, x, k) {
    return d === null || d.tag !== 7 ? (d = Ot(f, p.mode, x, k), d.return = p, d) : (d = l(d, f), d.return = p, d);
  }
  function m(p, d, f) {
    if (typeof d == "string" && d !== "" || typeof d == "number") return d = oo("" + d, p.mode, f), d.return = p, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case gr:
          return f = Hr(d.type, d.key, d.props, null, p.mode, f), f.ref = bn(p, null, d), f.return = p, f;
        case Qt:
          return d = io(d, p.mode, f), d.return = p, d;
        case st:
          var x = d._init;
          return m(p, x(d._payload), f);
      }
      if (Tn(d) || kn(d)) return d = Ot(d, p.mode, f, null), d.return = p, d;
      Cr(p, d);
    }
    return null;
  }
  function h(p, d, f, x) {
    var k = d !== null ? d.key : null;
    if (typeof f == "string" && f !== "" || typeof f == "number") return k !== null ? null : a(p, d, "" + f, x);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case gr:
          return f.key === k ? u(p, d, f, x) : null;
        case Qt:
          return f.key === k ? c(p, d, f, x) : null;
        case st:
          return k = f._init, h(
            p,
            d,
            k(f._payload),
            x
          );
      }
      if (Tn(f) || kn(f)) return k !== null ? null : v(p, d, f, x, null);
      Cr(p, f);
    }
    return null;
  }
  function g(p, d, f, x, k) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return p = p.get(f) || null, a(d, p, "" + x, k);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case gr:
          return p = p.get(x.key === null ? f : x.key) || null, u(d, p, x, k);
        case Qt:
          return p = p.get(x.key === null ? f : x.key) || null, c(d, p, x, k);
        case st:
          var C = x._init;
          return g(p, d, f, C(x._payload), k);
      }
      if (Tn(x) || kn(x)) return p = p.get(f) || null, v(d, p, x, k, null);
      Cr(d, x);
    }
    return null;
  }
  function y(p, d, f, x) {
    for (var k = null, C = null, $ = d, j = d = 0, S = null; $ !== null && j < f.length; j++) {
      $.index > j ? (S = $, $ = null) : S = $.sibling;
      var P = h(p, $, f[j], x);
      if (P === null) {
        $ === null && ($ = S);
        break;
      }
      e && $ && P.alternate === null && t(p, $), d = o(P, d, j), C === null ? k = P : C.sibling = P, C = P, $ = S;
    }
    if (j === f.length) return n(p, $), Q && zt(p, j), k;
    if ($ === null) {
      for (; j < f.length; j++) $ = m(p, f[j], x), $ !== null && (d = o($, d, j), C === null ? k = $ : C.sibling = $, C = $);
      return Q && zt(p, j), k;
    }
    for ($ = r(p, $); j < f.length; j++) S = g($, p, j, f[j], x), S !== null && (e && S.alternate !== null && $.delete(S.key === null ? j : S.key), d = o(S, d, j), C === null ? k = S : C.sibling = S, C = S);
    return e && $.forEach(function(I) {
      return t(p, I);
    }), Q && zt(p, j), k;
  }
  function w(p, d, f, x) {
    var k = kn(f);
    if (typeof k != "function") throw Error(b(150));
    if (f = k.call(f), f == null) throw Error(b(151));
    for (var C = k = null, $ = d, j = d = 0, S = null, P = f.next(); $ !== null && !P.done; j++, P = f.next()) {
      $.index > j ? (S = $, $ = null) : S = $.sibling;
      var I = h(p, $, P.value, x);
      if (I === null) {
        $ === null && ($ = S);
        break;
      }
      e && $ && I.alternate === null && t(p, $), d = o(I, d, j), C === null ? k = I : C.sibling = I, C = I, $ = S;
    }
    if (P.done) return n(
      p,
      $
    ), Q && zt(p, j), k;
    if ($ === null) {
      for (; !P.done; j++, P = f.next()) P = m(p, P.value, x), P !== null && (d = o(P, d, j), C === null ? k = P : C.sibling = P, C = P);
      return Q && zt(p, j), k;
    }
    for ($ = r(p, $); !P.done; j++, P = f.next()) P = g($, p, j, P.value, x), P !== null && (e && P.alternate !== null && $.delete(P.key === null ? j : P.key), d = o(P, d, j), C === null ? k = P : C.sibling = P, C = P);
    return e && $.forEach(function(R) {
      return t(p, R);
    }), Q && zt(p, j), k;
  }
  function _(p, d, f, x) {
    if (typeof f == "object" && f !== null && f.type === Kt && f.key === null && (f = f.props.children), typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case gr:
          e: {
            for (var k = f.key, C = d; C !== null; ) {
              if (C.key === k) {
                if (k = f.type, k === Kt) {
                  if (C.tag === 7) {
                    n(p, C.sibling), d = l(C, f.props.children), d.return = p, p = d;
                    break e;
                  }
                } else if (C.elementType === k || typeof k == "object" && k !== null && k.$$typeof === st && Ms(k) === C.type) {
                  n(p, C.sibling), d = l(C, f.props), d.ref = bn(p, C, f), d.return = p, p = d;
                  break e;
                }
                n(p, C);
                break;
              } else t(p, C);
              C = C.sibling;
            }
            f.type === Kt ? (d = Ot(f.props.children, p.mode, x, f.key), d.return = p, p = d) : (x = Hr(f.type, f.key, f.props, null, p.mode, x), x.ref = bn(p, d, f), x.return = p, p = x);
          }
          return s(p);
        case Qt:
          e: {
            for (C = f.key; d !== null; ) {
              if (d.key === C) if (d.tag === 4 && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                n(p, d.sibling), d = l(d, f.children || []), d.return = p, p = d;
                break e;
              } else {
                n(p, d);
                break;
              }
              else t(p, d);
              d = d.sibling;
            }
            d = io(f, p.mode, x), d.return = p, p = d;
          }
          return s(p);
        case st:
          return C = f._init, _(p, d, C(f._payload), x);
      }
      if (Tn(f)) return y(p, d, f, x);
      if (kn(f)) return w(p, d, f, x);
      Cr(p, f);
    }
    return typeof f == "string" && f !== "" || typeof f == "number" ? (f = "" + f, d !== null && d.tag === 6 ? (n(p, d.sibling), d = l(d, f), d.return = p, p = d) : (n(p, d), d = oo(f, p.mode, x), d.return = p, p = d), s(p)) : n(p, d);
  }
  return _;
}
var hn = Nu(!0), _u = Nu(!1), il = Nt(null), sl = null, tn = null, _i = null;
function bi() {
  _i = tn = sl = null;
}
function Ci(e) {
  var t = il.current;
  V(il), e._currentValue = t;
}
function Fo(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function un(e, t) {
  sl = e, _i = tn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (we = !0), e.firstContext = null);
}
function Me(e) {
  var t = e._currentValue;
  if (_i !== e) if (e = { context: e, memoizedValue: t, next: null }, tn === null) {
    if (sl === null) throw Error(b(308));
    tn = e, sl.dependencies = { lanes: 0, firstContext: e };
  } else tn = tn.next = e;
  return t;
}
var $t = null;
function Ei(e) {
  $t === null ? $t = [e] : $t.push(e);
}
function bu(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Ei(t)) : (n.next = l.next, l.next = n), t.interleaved = n, nt(e, r);
}
function nt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var at = !1;
function zi(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Cu(e, t) {
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
  return l = r.interleaved, l === null ? (t.next = t, Ei(r)) : (t.next = l.next, l.next = t), r.interleaved = t, nt(e, n);
}
function Dr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, hi(e, n);
  }
}
function Rs(e, t) {
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
function al(e, t, n, r) {
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
    var m = l.baseState;
    s = 0, v = c = u = null, a = o;
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
          var y = e, w = a;
          switch (h = t, g = n, w.tag) {
            case 1:
              if (y = w.payload, typeof y == "function") {
                m = y.call(g, m, h);
                break e;
              }
              m = y;
              break e;
            case 3:
              y.flags = y.flags & -65537 | 128;
            case 0:
              if (y = w.payload, h = typeof y == "function" ? y.call(g, m, h) : y, h == null) break e;
              m = G({}, m, h);
              break e;
            case 2:
              at = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [a] : h.push(a));
      } else g = { eventTime: g, lane: h, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, v === null ? (c = v = g, u = m) : v = v.next = g, s |= h;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        h = a, a = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (u = m), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = v, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        s |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    At |= s, e.lanes = s, e.memoizedState = m;
  }
}
function Os(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(b(191, l));
      l.call(r);
    }
  }
}
var fr = {}, Ye = Nt(fr), nr = Nt(fr), rr = Nt(fr);
function Lt(e) {
  if (e === fr) throw Error(b(174));
  return e;
}
function Pi(e, t) {
  switch (W(rr, t), W(nr, e), W(Ye, fr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : vo(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = vo(t, e);
  }
  V(Ye), W(Ye, t);
}
function mn() {
  V(Ye), V(nr), V(rr);
}
function Eu(e) {
  Lt(rr.current);
  var t = Lt(Ye.current), n = vo(t, e.type);
  t !== n && (W(nr, e), W(Ye, n));
}
function Ti(e) {
  nr.current === e && (V(Ye), V(nr));
}
var K = Nt(0);
function ul(e) {
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
var ql = [];
function $i() {
  for (var e = 0; e < ql.length; e++) ql[e]._workInProgressVersionPrimary = null;
  ql.length = 0;
}
var Ir = lt.ReactCurrentDispatcher, eo = lt.ReactCurrentBatchConfig, It = 0, Y = null, ee = null, re = null, cl = !1, In = !1, lr = 0, zf = 0;
function ue() {
  throw Error(b(321));
}
function Li(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Be(e[n], t[n])) return !1;
  return !0;
}
function Mi(e, t, n, r, l, o) {
  if (It = o, Y = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ir.current = e === null || e.memoizedState === null ? Lf : Mf, e = n(r, l), In) {
    o = 0;
    do {
      if (In = !1, lr = 0, 25 <= o) throw Error(b(301));
      o += 1, re = ee = null, t.updateQueue = null, Ir.current = Rf, e = n(r, l);
    } while (In);
  }
  if (Ir.current = dl, t = ee !== null && ee.next !== null, It = 0, re = ee = Y = null, cl = !1, t) throw Error(b(300));
  return e;
}
function Ri() {
  var e = lr !== 0;
  return lr = 0, e;
}
function Ve() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return re === null ? Y.memoizedState = re = e : re = re.next = e, re;
}
function Re() {
  if (ee === null) {
    var e = Y.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ee.next;
  var t = re === null ? Y.memoizedState : re.next;
  if (t !== null) re = t, ee = e;
  else {
    if (e === null) throw Error(b(310));
    ee = e, e = { memoizedState: ee.memoizedState, baseState: ee.baseState, baseQueue: ee.baseQueue, queue: ee.queue, next: null }, re === null ? Y.memoizedState = re = e : re = re.next = e;
  }
  return re;
}
function or(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function to(e) {
  var t = Re(), n = t.queue;
  if (n === null) throw Error(b(311));
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
      if ((It & v) === v) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var m = {
          lane: v,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (a = u = m, s = r) : u = u.next = m, Y.lanes |= v, At |= v;
      }
      c = c.next;
    } while (c !== null && c !== o);
    u === null ? s = r : u.next = a, Be(r, t.memoizedState) || (we = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, Y.lanes |= o, At |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function no(e) {
  var t = Re(), n = t.queue;
  if (n === null) throw Error(b(311));
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
function zu() {
}
function Pu(e, t) {
  var n = Y, r = Re(), l = t(), o = !Be(r.memoizedState, l);
  if (o && (r.memoizedState = l, we = !0), r = r.queue, Oi(Lu.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || re !== null && re.memoizedState.tag & 1) {
    if (n.flags |= 2048, ir(9, $u.bind(null, n, r, l, t), void 0, null), le === null) throw Error(b(349));
    It & 30 || Tu(n, t, l);
  }
  return l;
}
function Tu(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Y.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Y.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function $u(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Mu(t) && Ru(e);
}
function Lu(e, t, n) {
  return n(function() {
    Mu(t) && Ru(e);
  });
}
function Mu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Be(e, n);
  } catch {
    return !0;
  }
}
function Ru(e) {
  var t = nt(e, 1);
  t !== null && Ue(t, e, 1, -1);
}
function Fs(e) {
  var t = Ve();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: or, lastRenderedState: e }, t.queue = e, e = e.dispatch = $f.bind(null, Y, e), [t.memoizedState, e];
}
function ir(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Y.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Y.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ou() {
  return Re().memoizedState;
}
function Ar(e, t, n, r) {
  var l = Ve();
  Y.flags |= e, l.memoizedState = ir(1 | t, n, void 0, r === void 0 ? null : r);
}
function _l(e, t, n, r) {
  var l = Re();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ee !== null) {
    var s = ee.memoizedState;
    if (o = s.destroy, r !== null && Li(r, s.deps)) {
      l.memoizedState = ir(t, n, o, r);
      return;
    }
  }
  Y.flags |= e, l.memoizedState = ir(1 | t, n, o, r);
}
function Ds(e, t) {
  return Ar(8390656, 8, e, t);
}
function Oi(e, t) {
  return _l(2048, 8, e, t);
}
function Fu(e, t) {
  return _l(4, 2, e, t);
}
function Du(e, t) {
  return _l(4, 4, e, t);
}
function Iu(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Au(e, t, n) {
  return n = n != null ? n.concat([e]) : null, _l(4, 4, Iu.bind(null, t, e), n);
}
function Fi() {
}
function Uu(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Li(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Bu(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Li(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Wu(e, t, n) {
  return It & 21 ? (Be(n, t) || (n = Ya(), Y.lanes |= n, At |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, we = !0), e.memoizedState = n);
}
function Pf(e, t) {
  var n = B;
  B = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = eo.transition;
  eo.transition = {};
  try {
    e(!1), t();
  } finally {
    B = n, eo.transition = r;
  }
}
function Hu() {
  return Re().memoizedState;
}
function Tf(e, t, n) {
  var r = yt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Vu(e)) Qu(t, n);
  else if (n = bu(e, t, n, r), n !== null) {
    var l = he();
    Ue(n, e, r, l), Ku(n, t, r);
  }
}
function $f(e, t, n) {
  var r = yt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Vu(e)) Qu(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var s = t.lastRenderedState, a = o(s, n);
      if (l.hasEagerState = !0, l.eagerState = a, Be(a, s)) {
        var u = t.interleaved;
        u === null ? (l.next = l, Ei(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = bu(e, t, l, r), n !== null && (l = he(), Ue(n, e, r, l), Ku(n, t, r));
  }
}
function Vu(e) {
  var t = e.alternate;
  return e === Y || t !== null && t === Y;
}
function Qu(e, t) {
  In = cl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Ku(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, hi(e, n);
  }
}
var dl = { readContext: Me, useCallback: ue, useContext: ue, useEffect: ue, useImperativeHandle: ue, useInsertionEffect: ue, useLayoutEffect: ue, useMemo: ue, useReducer: ue, useRef: ue, useState: ue, useDebugValue: ue, useDeferredValue: ue, useTransition: ue, useMutableSource: ue, useSyncExternalStore: ue, useId: ue, unstable_isNewReconciler: !1 }, Lf = { readContext: Me, useCallback: function(e, t) {
  return Ve().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Me, useEffect: Ds, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ar(
    4194308,
    4,
    Iu.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Ar(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Ar(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ve();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ve();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Tf.bind(null, Y, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ve();
  return e = { current: e }, t.memoizedState = e;
}, useState: Fs, useDebugValue: Fi, useDeferredValue: function(e) {
  return Ve().memoizedState = e;
}, useTransition: function() {
  var e = Fs(!1), t = e[0];
  return e = Pf.bind(null, e[1]), Ve().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Y, l = Ve();
  if (Q) {
    if (n === void 0) throw Error(b(407));
    n = n();
  } else {
    if (n = t(), le === null) throw Error(b(349));
    It & 30 || Tu(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Ds(Lu.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, ir(9, $u.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Ve(), t = le.identifierPrefix;
  if (Q) {
    var n = Je, r = Ze;
    n = (r & ~(1 << 32 - Ae(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = lr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = zf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Mf = {
  readContext: Me,
  useCallback: Uu,
  useContext: Me,
  useEffect: Oi,
  useImperativeHandle: Au,
  useInsertionEffect: Fu,
  useLayoutEffect: Du,
  useMemo: Bu,
  useReducer: to,
  useRef: Ou,
  useState: function() {
    return to(or);
  },
  useDebugValue: Fi,
  useDeferredValue: function(e) {
    var t = Re();
    return Wu(t, ee.memoizedState, e);
  },
  useTransition: function() {
    var e = to(or)[0], t = Re().memoizedState;
    return [e, t];
  },
  useMutableSource: zu,
  useSyncExternalStore: Pu,
  useId: Hu,
  unstable_isNewReconciler: !1
}, Rf = { readContext: Me, useCallback: Uu, useContext: Me, useEffect: Oi, useImperativeHandle: Au, useInsertionEffect: Fu, useLayoutEffect: Du, useMemo: Bu, useReducer: no, useRef: Ou, useState: function() {
  return no(or);
}, useDebugValue: Fi, useDeferredValue: function(e) {
  var t = Re();
  return ee === null ? t.memoizedState = e : Wu(t, ee.memoizedState, e);
}, useTransition: function() {
  var e = no(or)[0], t = Re().memoizedState;
  return [e, t];
}, useMutableSource: zu, useSyncExternalStore: Pu, useId: Hu, unstable_isNewReconciler: !1 };
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
var bl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Wt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), l = yt(e), o = qe(r, l);
  o.payload = t, n != null && (o.callback = n), t = vt(e, o, l), t !== null && (Ue(t, e, l, r), Dr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), l = yt(e), o = qe(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = vt(e, o, l), t !== null && (Ue(t, e, l, r), Dr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = he(), r = yt(e), l = qe(n, r);
  l.tag = 2, t != null && (l.callback = t), t = vt(e, l, r), t !== null && (Ue(t, e, r, n), Dr(t, e, r));
} };
function Is(e, t, n, r, l, o, s) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, s) : t.prototype && t.prototype.isPureReactComponent ? !Jn(n, r) || !Jn(l, o) : !0;
}
function Yu(e, t, n) {
  var r = !1, l = jt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Me(o) : (l = je(t) ? Ft : fe.current, r = t.contextTypes, o = (r = r != null) ? fn(e, l) : jt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = bl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function As(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && bl.enqueueReplaceState(t, t.state, null);
}
function Io(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, zi(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = Me(o) : (o = je(t) ? Ft : fe.current, l.context = fn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Do(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && bl.enqueueReplaceState(l, l.state, null), al(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function gn(e, t) {
  try {
    var n = "", r = t;
    do
      n += ad(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ro(e, t, n) {
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
var Of = typeof WeakMap == "function" ? WeakMap : Map;
function Gu(e, t, n) {
  n = qe(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    pl || (pl = !0, Xo = r), Ao(e, t);
  }, n;
}
function Xu(e, t, n) {
  n = qe(-1, n), n.tag = 3;
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
    var s = t.stack;
    this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
  }), n;
}
function Us(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Of();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Xf.bind(null, e, t, n), t.then(e, e));
}
function Bs(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ws(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = qe(-1, 1), t.tag = 2, vt(n, t, 1))), n.lanes |= 1), e);
}
var Ff = lt.ReactCurrentOwner, we = !1;
function pe(e, t, n, r) {
  t.child = e === null ? _u(t, null, n, r) : hn(t, e.child, n, r);
}
function Hs(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return un(t, l), r = Mi(e, t, n, r, o, l), n = Ri(), e !== null && !we ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, rt(e, t, l)) : (Q && n && ji(t), t.flags |= 1, pe(e, t, r, l), t.child);
}
function Vs(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Vi(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Zu(e, t, o, r, l)) : (e = Hr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var s = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Jn, n(s, r) && e.ref === t.ref) return rt(e, t, l);
  }
  return t.flags |= 1, e = wt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Zu(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Jn(o, r) && e.ref === t.ref) if (we = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (we = !0);
    else return t.lanes = e.lanes, rt(e, t, l);
  }
  return Uo(e, t, n, r, l);
}
function Ju(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, W(rn, Ne), Ne |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, W(rn, Ne), Ne |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, W(rn, Ne), Ne |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, W(rn, Ne), Ne |= r;
  return pe(e, t, l, n), t.child;
}
function qu(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Uo(e, t, n, r, l) {
  var o = je(n) ? Ft : fe.current;
  return o = fn(t, o), un(t, l), n = Mi(e, t, n, r, o, l), r = Ri(), e !== null && !we ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, rt(e, t, l)) : (Q && r && ji(t), t.flags |= 1, pe(e, t, n, l), t.child);
}
function Qs(e, t, n, r, l) {
  if (je(n)) {
    var o = !0;
    rl(t);
  } else o = !1;
  if (un(t, l), t.stateNode === null) Ur(e, t), Yu(t, n, r), Io(t, n, r, l), r = !0;
  else if (e === null) {
    var s = t.stateNode, a = t.memoizedProps;
    s.props = a;
    var u = s.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Me(c) : (c = je(n) ? Ft : fe.current, c = fn(t, c));
    var v = n.getDerivedStateFromProps, m = typeof v == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    m || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== r || u !== c) && As(t, s, r, c), at = !1;
    var h = t.memoizedState;
    s.state = h, al(t, r, s, l), u = t.memoizedState, a !== r || h !== u || ke.current || at ? (typeof v == "function" && (Do(t, n, v, r), u = t.memoizedState), (a = at || Is(t, n, a, r, h, u, c)) ? (m || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), s.props = r, s.state = u, s.context = c, r = a) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    s = t.stateNode, Cu(e, t), a = t.memoizedProps, c = t.type === t.elementType ? a : Fe(t.type, a), s.props = c, m = t.pendingProps, h = s.context, u = n.contextType, typeof u == "object" && u !== null ? u = Me(u) : (u = je(n) ? Ft : fe.current, u = fn(t, u));
    var g = n.getDerivedStateFromProps;
    (v = typeof g == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== m || h !== u) && As(t, s, r, u), at = !1, h = t.memoizedState, s.state = h, al(t, r, s, l);
    var y = t.memoizedState;
    a !== m || h !== y || ke.current || at ? (typeof g == "function" && (Do(t, n, g, r), y = t.memoizedState), (c = at || Is(t, n, c, r, h, y, u) || !1) ? (v || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, y, u), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, y, u)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = y), s.props = r, s.state = y, s.context = u, r = c) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Bo(e, t, n, r, o, l);
}
function Bo(e, t, n, r, l, o) {
  qu(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return l && Ts(t, n, !1), rt(e, t, o);
  r = t.stateNode, Ff.current = t;
  var a = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && s ? (t.child = hn(t, e.child, null, o), t.child = hn(t, null, a, o)) : pe(e, t, a, o), t.memoizedState = r.state, l && Ts(t, n, !0), t.child;
}
function ec(e) {
  var t = e.stateNode;
  t.pendingContext ? Ps(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ps(e, t.context, !1), Pi(e, t.containerInfo);
}
function Ks(e, t, n, r, l) {
  return pn(), Ni(l), t.flags |= 256, pe(e, t, n, r), t.child;
}
var Wo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ho(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function tc(e, t, n) {
  var r = t.pendingProps, l = K.current, o = !1, s = (t.flags & 128) !== 0, a;
  if ((a = s) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), W(K, l & 1), e === null)
    return Oo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, s = { mode: "hidden", children: s }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = s) : o = zl(s, r, 0, null), e = Ot(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Ho(n), t.memoizedState = Wo, e) : Di(t, s));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return Df(e, t, s, r, a, l, n);
  if (o) {
    o = r.fallback, s = t.mode, l = e.child, a = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(s & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = wt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? o = wt(a, o) : (o = Ot(o, s, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, s = e.child.memoizedState, s = s === null ? Ho(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }, o.memoizedState = s, o.childLanes = e.childLanes & ~n, t.memoizedState = Wo, r;
  }
  return o = e.child, e = o.sibling, r = wt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Di(e, t) {
  return t = zl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Er(e, t, n, r) {
  return r !== null && Ni(r), hn(t, e.child, null, n), e = Di(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Df(e, t, n, r, l, o, s) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ro(Error(b(422))), Er(e, t, s, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = zl({ mode: "visible", children: r.children }, l, 0, null), o = Ot(o, l, s, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && hn(t, e.child, null, s), t.child.memoizedState = Ho(s), t.memoizedState = Wo, o);
  if (!(t.mode & 1)) return Er(e, t, s, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, o = Error(b(419)), r = ro(o, r, void 0), Er(e, t, s, r);
  }
  if (a = (s & e.childLanes) !== 0, we || a) {
    if (r = le, r !== null) {
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
    return Hi(), r = ro(Error(b(421))), Er(e, t, s, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Zf.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, _e = gt(l.nextSibling), be = t, Q = !0, Ie = null, e !== null && (Pe[Te++] = Ze, Pe[Te++] = Je, Pe[Te++] = Dt, Ze = e.id, Je = e.overflow, Dt = t), t = Di(t, r.children), t.flags |= 4096, t);
}
function Ys(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Fo(e.return, t, n);
}
function lo(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function nc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (pe(e, t, r.children, n), r = K.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Ys(e, n, t);
      else if (e.tag === 19) Ys(e, n, t);
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
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && ul(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), lo(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && ul(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      lo(t, !0, n, null, o);
      break;
    case "together":
      lo(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Ur(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function rt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), At |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(b(153));
  if (t.child !== null) {
    for (e = t.child, n = wt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = wt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function If(e, t, n) {
  switch (t.tag) {
    case 3:
      ec(t), pn();
      break;
    case 5:
      Eu(t);
      break;
    case 1:
      je(t.type) && rl(t);
      break;
    case 4:
      Pi(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      W(il, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (W(K, K.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? tc(e, t, n) : (W(K, K.current & 1), e = rt(e, t, n), e !== null ? e.sibling : null);
      W(K, K.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return nc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), W(K, K.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Ju(e, t, n);
  }
  return rt(e, t, n);
}
var rc, Vo, lc, oc;
rc = function(e, t) {
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
lc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Lt(Ye.current);
    var o = null;
    switch (n) {
      case "input":
        l = po(e, l), r = po(e, r), o = [];
        break;
      case "select":
        l = G({}, l, { value: void 0 }), r = G({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = go(e, l), r = go(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = tl);
    }
    xo(n, r);
    var s;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var a = l[c];
      for (s in a) a.hasOwnProperty(s) && (n || (n = {}), n[s] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Vn.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (a = l != null ? l[c] : void 0, r.hasOwnProperty(c) && u !== a && (u != null || a != null)) if (c === "style") if (a) {
        for (s in a) !a.hasOwnProperty(s) || u && u.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
        for (s in u) u.hasOwnProperty(s) && a[s] !== u[s] && (n || (n = {}), n[s] = u[s]);
      } else n || (o || (o = []), o.push(
        c,
        n
      )), n = u;
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, a = a ? a.__html : void 0, u != null && a !== u && (o = o || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Vn.hasOwnProperty(c) ? (u != null && c === "onScroll" && H("scroll", e), o || a === u || (o = [])) : (o = o || []).push(c, u));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
oc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Cn(e, t) {
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
function Af(e, t, n) {
  var r = t.pendingProps;
  switch (Si(t), t.tag) {
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
      return je(t.type) && nl(), ce(t), null;
    case 3:
      return r = t.stateNode, mn(), V(ke), V(fe), $i(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (br(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ie !== null && (qo(Ie), Ie = null))), Vo(e, t), ce(t), null;
    case 5:
      Ti(t);
      var l = Lt(rr.current);
      if (n = t.type, e !== null && t.stateNode != null) lc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(b(166));
          return ce(t), null;
        }
        if (e = Lt(Ye.current), br(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Qe] = t, r[tr] = o, e = (t.mode & 1) !== 0, n) {
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
              rs(r, o), H("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, H("invalid", r);
              break;
            case "textarea":
              os(r, o), H("invalid", r);
          }
          xo(n, o), l = null;
          for (var s in o) if (o.hasOwnProperty(s)) {
            var a = o[s];
            s === "children" ? typeof a == "string" ? r.textContent !== a && (o.suppressHydrationWarning !== !0 && _r(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (o.suppressHydrationWarning !== !0 && _r(
              r.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Vn.hasOwnProperty(s) && a != null && s === "onScroll" && H("scroll", r);
          }
          switch (n) {
            case "input":
              vr(r), ls(r, o, !0);
              break;
            case "textarea":
              vr(r), is(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = tl);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          s = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = La(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = s.createElement(n, { is: r.is }) : (e = s.createElement(n), n === "select" && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[Qe] = t, e[tr] = r, rc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (s = yo(n, r), n) {
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
                rs(e, r), l = po(e, r), H("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = G({}, r, { value: void 0 }), H("invalid", e);
                break;
              case "textarea":
                os(e, r), l = go(e, r), H("invalid", e);
                break;
              default:
                l = r;
            }
            xo(n, l), a = l;
            for (o in a) if (a.hasOwnProperty(o)) {
              var u = a[o];
              o === "style" ? Oa(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Ma(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Qn(e, u) : typeof u == "number" && Qn(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Vn.hasOwnProperty(o) ? u != null && o === "onScroll" && H("scroll", e) : u != null && ai(e, o, u, s));
            }
            switch (n) {
              case "input":
                vr(e), ls(e, r, !1);
                break;
              case "textarea":
                vr(e), is(e);
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
                typeof l.onClick == "function" && (e.onclick = tl);
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
      if (e && t.stateNode != null) oc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(b(166));
        if (n = Lt(rr.current), Lt(Ye.current), br(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Qe] = t, (o = r.nodeValue !== n) && (e = be, e !== null)) switch (e.tag) {
            case 3:
              _r(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && _r(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Qe] = t, t.stateNode = r;
      }
      return ce(t), null;
    case 13:
      if (V(K), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Q && _e !== null && t.mode & 1 && !(t.flags & 128)) Su(), pn(), t.flags |= 98560, o = !1;
        else if (o = br(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(b(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(b(317));
            o[Qe] = t;
          } else pn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ce(t), o = !1;
        } else Ie !== null && (qo(Ie), Ie = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || K.current & 1 ? te === 0 && (te = 3) : Hi())), t.updateQueue !== null && (t.flags |= 4), ce(t), null);
    case 4:
      return mn(), Vo(e, t), e === null && qn(t.stateNode.containerInfo), ce(t), null;
    case 10:
      return Ci(t.type._context), ce(t), null;
    case 17:
      return je(t.type) && nl(), ce(t), null;
    case 19:
      if (V(K), o = t.memoizedState, o === null) return ce(t), null;
      if (r = (t.flags & 128) !== 0, s = o.rendering, s === null) if (r) Cn(o, !1);
      else {
        if (te !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (s = ul(e), s !== null) {
            for (t.flags |= 128, Cn(o, !1), r = s.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, s = o.alternate, s === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = s.childLanes, o.lanes = s.lanes, o.child = s.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = s.memoizedProps, o.memoizedState = s.memoizedState, o.updateQueue = s.updateQueue, o.type = s.type, e = s.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return W(K, K.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && Z() > vn && (t.flags |= 128, r = !0, Cn(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = ul(s), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Cn(o, !0), o.tail === null && o.tailMode === "hidden" && !s.alternate && !Q) return ce(t), null;
        } else 2 * Z() - o.renderingStartTime > vn && n !== 1073741824 && (t.flags |= 128, r = !0, Cn(o, !1), t.lanes = 4194304);
        o.isBackwards ? (s.sibling = t.child, t.child = s) : (n = o.last, n !== null ? n.sibling = s : t.child = s, o.last = s);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Z(), t.sibling = null, n = K.current, W(K, r ? n & 1 | 2 : n & 1), t) : (ce(t), null);
    case 22:
    case 23:
      return Wi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Ne & 1073741824 && (ce(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ce(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(b(156, t.tag));
}
function Uf(e, t) {
  switch (Si(t), t.tag) {
    case 1:
      return je(t.type) && nl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return mn(), V(ke), V(fe), $i(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Ti(t), null;
    case 13:
      if (V(K), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(b(340));
        pn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return V(K), null;
    case 4:
      return mn(), null;
    case 10:
      return Ci(t.type._context), null;
    case 22:
    case 23:
      return Wi(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var zr = !1, de = !1, Bf = typeof WeakSet == "function" ? WeakSet : Set, L = null;
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
var Gs = !1;
function Wf(e, t) {
  if (zo = Jr, e = cu(), ki(e)) {
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
        var s = 0, a = -1, u = -1, c = 0, v = 0, m = e, h = null;
        t: for (; ; ) {
          for (var g; m !== n || l !== 0 && m.nodeType !== 3 || (a = s + l), m !== o || r !== 0 && m.nodeType !== 3 || (u = s + r), m.nodeType === 3 && (s += m.nodeValue.length), (g = m.firstChild) !== null; )
            h = m, m = g;
          for (; ; ) {
            if (m === e) break t;
            if (h === n && ++c === l && (a = s), h === o && ++v === r && (u = s), (g = m.nextSibling) !== null) break;
            m = h, h = m.parentNode;
          }
          m = g;
        }
        n = a === -1 || u === -1 ? null : { start: a, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Po = { focusedElem: e, selectionRange: n }, Jr = !1, L = t; L !== null; ) if (t = L, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, L = e;
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
            var w = y.memoizedProps, _ = y.memoizedState, p = t.stateNode, d = p.getSnapshotBeforeUpdate(t.elementType === t.type ? w : Fe(t.type, w), _);
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
          throw Error(b(163));
      }
    } catch (x) {
      X(t, t.return, x);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, L = e;
      break;
    }
    L = t.return;
  }
  return y = Gs, Gs = !1, y;
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
function ic(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, ic(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Qe], delete t[tr], delete t[Lo], delete t[_f], delete t[bf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function sc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Xs(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || sc(e.return)) return null;
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
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = tl));
  else if (r !== 4 && (e = e.child, e !== null)) for (Yo(e, t, n), e = e.sibling; e !== null; ) Yo(e, t, n), e = e.sibling;
}
function Go(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Go(e, t, n), e = e.sibling; e !== null; ) Go(e, t, n), e = e.sibling;
}
var oe = null, De = !1;
function it(e, t, n) {
  for (n = n.child; n !== null; ) ac(e, t, n), n = n.sibling;
}
function ac(e, t, n) {
  if (Ke && typeof Ke.onCommitFiberUnmount == "function") try {
    Ke.onCommitFiberUnmount(yl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      de || nn(n, t);
    case 6:
      var r = oe, l = De;
      oe = null, it(e, t, n), oe = r, De = l, oe !== null && (De ? (e = oe, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : oe.removeChild(n.stateNode));
      break;
    case 18:
      oe !== null && (De ? (e = oe, n = n.stateNode, e.nodeType === 8 ? Zl(e.parentNode, n) : e.nodeType === 1 && Zl(e, n), Xn(e)) : Zl(oe, n.stateNode));
      break;
    case 4:
      r = oe, l = De, oe = n.stateNode.containerInfo, De = !0, it(e, t, n), oe = r, De = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!de && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, s = o.destroy;
          o = o.tag, s !== void 0 && (o & 2 || o & 4) && Qo(n, t, s), l = l.next;
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
function Zs(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Bf()), t.forEach(function(r) {
      var l = Jf.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Oe(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, s = t, a = s;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            oe = a.stateNode, De = !1;
            break e;
          case 3:
            oe = a.stateNode.containerInfo, De = !0;
            break e;
          case 4:
            oe = a.stateNode.containerInfo, De = !0;
            break e;
        }
        a = a.return;
      }
      if (oe === null) throw Error(b(160));
      ac(o, s, l), oe = null, De = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (c) {
      X(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) uc(t, e), t = t.sibling;
}
function uc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Oe(t, e), He(e), r & 4) {
        try {
          An(3, e, e.return), Cl(3, e);
        } catch (w) {
          X(e, e.return, w);
        }
        try {
          An(5, e, e.return);
        } catch (w) {
          X(e, e.return, w);
        }
      }
      break;
    case 1:
      Oe(t, e), He(e), r & 512 && n !== null && nn(n, n.return);
      break;
    case 5:
      if (Oe(t, e), He(e), r & 512 && n !== null && nn(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Qn(l, "");
        } catch (w) {
          X(e, e.return, w);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, s = n !== null ? n.memoizedProps : o, a = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          a === "input" && o.type === "radio" && o.name != null && Ta(l, o), yo(a, s);
          var c = yo(a, o);
          for (s = 0; s < u.length; s += 2) {
            var v = u[s], m = u[s + 1];
            v === "style" ? Oa(l, m) : v === "dangerouslySetInnerHTML" ? Ma(l, m) : v === "children" ? Qn(l, m) : ai(l, v, m, c);
          }
          switch (a) {
            case "input":
              ho(l, o);
              break;
            case "textarea":
              $a(l, o);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var g = o.value;
              g != null ? ln(l, !!o.multiple, g, !1) : h !== !!o.multiple && (o.defaultValue != null ? ln(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : ln(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[tr] = o;
        } catch (w) {
          X(e, e.return, w);
        }
      }
      break;
    case 6:
      if (Oe(t, e), He(e), r & 4) {
        if (e.stateNode === null) throw Error(b(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (w) {
          X(e, e.return, w);
        }
      }
      break;
    case 3:
      if (Oe(t, e), He(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Xn(t.containerInfo);
      } catch (w) {
        X(e, e.return, w);
      }
      break;
    case 4:
      Oe(t, e), He(e);
      break;
    case 13:
      Oe(t, e), He(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Ui = Z())), r & 4 && Zs(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (de = (c = de) || v, Oe(t, e), de = c) : Oe(t, e), He(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !v && e.mode & 1) for (L = e, v = e.child; v !== null; ) {
          for (m = L = v; L !== null; ) {
            switch (h = L, g = h.child, h.tag) {
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
                    X(r, n, w);
                  }
                }
                break;
              case 5:
                nn(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  qs(m);
                  continue;
                }
            }
            g !== null ? (g.return = h, L = g) : qs(m);
          }
          v = v.sibling;
        }
        e: for (v = null, m = e; ; ) {
          if (m.tag === 5) {
            if (v === null) {
              v = m;
              try {
                l = m.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (a = m.stateNode, u = m.memoizedProps.style, s = u != null && u.hasOwnProperty("display") ? u.display : null, a.style.display = Ra("display", s));
              } catch (w) {
                X(e, e.return, w);
              }
            }
          } else if (m.tag === 6) {
            if (v === null) try {
              m.stateNode.nodeValue = c ? "" : m.memoizedProps;
            } catch (w) {
              X(e, e.return, w);
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
      Oe(t, e), He(e), r & 4 && Zs(e);
      break;
    case 21:
      break;
    default:
      Oe(
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
          if (sc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(b(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Qn(l, ""), r.flags &= -33);
          var o = Xs(e);
          Go(e, o, l);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo, a = Xs(e);
          Yo(e, a, s);
          break;
        default:
          throw Error(b(161));
      }
    } catch (u) {
      X(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Hf(e, t, n) {
  L = e, cc(e);
}
function cc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; L !== null; ) {
    var l = L, o = l.child;
    if (l.tag === 22 && r) {
      var s = l.memoizedState !== null || zr;
      if (!s) {
        var a = l.alternate, u = a !== null && a.memoizedState !== null || de;
        a = zr;
        var c = de;
        if (zr = s, (de = u) && !c) for (L = l; L !== null; ) s = L, u = s.child, s.tag === 22 && s.memoizedState !== null ? ea(l) : u !== null ? (u.return = s, L = u) : ea(l);
        for (; o !== null; ) L = o, cc(o), o = o.sibling;
        L = l, zr = a, de = c;
      }
      Js(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, L = o) : Js(e);
  }
}
function Js(e) {
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
            o !== null && Os(t, o, r);
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
              Os(t, s, n);
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
                  var m = v.dehydrated;
                  m !== null && Xn(m);
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
            throw Error(b(163));
        }
        de || t.flags & 512 && Ko(t);
      } catch (h) {
        X(t, t.return, h);
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
function qs(e) {
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
function ea(e) {
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
          var s = t.return;
          try {
            Ko(t);
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
var Vf = Math.ceil, fl = lt.ReactCurrentDispatcher, Ii = lt.ReactCurrentOwner, Le = lt.ReactCurrentBatchConfig, A = 0, le = null, q = null, ie = 0, Ne = 0, rn = Nt(0), te = 0, sr = null, At = 0, El = 0, Ai = 0, Un = null, ye = null, Ui = 0, vn = 1 / 0, Ge = null, pl = !1, Xo = null, xt = null, Pr = !1, ft = null, hl = 0, Bn = 0, Zo = null, Br = -1, Wr = 0;
function he() {
  return A & 6 ? Z() : Br !== -1 ? Br : Br = Z();
}
function yt(e) {
  return e.mode & 1 ? A & 2 && ie !== 0 ? ie & -ie : Ef.transition !== null ? (Wr === 0 && (Wr = Ya()), Wr) : (e = B, e !== 0 || (e = window.event, e = e === void 0 ? 16 : tu(e.type)), e) : 1;
}
function Ue(e, t, n, r) {
  if (50 < Bn) throw Bn = 0, Zo = null, Error(b(185));
  ur(e, n, r), (!(A & 2) || e !== le) && (e === le && (!(A & 2) && (El |= n), te === 4 && ct(e, ie)), Se(e, r), n === 1 && A === 0 && !(t.mode & 1) && (vn = Z() + 500, Nl && _t()));
}
function Se(e, t) {
  var n = e.callbackNode;
  Cd(e, t);
  var r = Zr(e, e === le ? ie : 0);
  if (r === 0) n !== null && us(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && us(n), t === 1) e.tag === 0 ? Cf(ta.bind(null, e)) : wu(ta.bind(null, e)), Sf(function() {
      !(A & 6) && _t();
    }), n = null;
    else {
      switch (Ga(r)) {
        case 1:
          n = pi;
          break;
        case 4:
          n = Qa;
          break;
        case 16:
          n = Xr;
          break;
        case 536870912:
          n = Ka;
          break;
        default:
          n = Xr;
      }
      n = xc(n, dc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function dc(e, t) {
  if (Br = -1, Wr = 0, A & 6) throw Error(b(327));
  var n = e.callbackNode;
  if (cn() && e.callbackNode !== n) return null;
  var r = Zr(e, e === le ? ie : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ml(e, r);
  else {
    t = r;
    var l = A;
    A |= 2;
    var o = pc();
    (le !== e || ie !== t) && (Ge = null, vn = Z() + 500, Rt(e, t));
    do
      try {
        Yf();
        break;
      } catch (a) {
        fc(e, a);
      }
    while (!0);
    bi(), fl.current = o, A = l, q !== null ? t = 0 : (le = null, ie = 0, t = te);
  }
  if (t !== 0) {
    if (t === 2 && (l = No(e), l !== 0 && (r = l, t = Jo(e, l))), t === 1) throw n = sr, Rt(e, 0), ct(e, r), Se(e, Z()), n;
    if (t === 6) ct(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Qf(l) && (t = ml(e, r), t === 2 && (o = No(e), o !== 0 && (r = o, t = Jo(e, o))), t === 1)) throw n = sr, Rt(e, 0), ct(e, r), Se(e, Z()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(b(345));
        case 2:
          Pt(e, ye, Ge);
          break;
        case 3:
          if (ct(e, r), (r & 130023424) === r && (t = Ui + 500 - Z(), 10 < t)) {
            if (Zr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              he(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = $o(Pt.bind(null, e, ye, Ge), t);
            break;
          }
          Pt(e, ye, Ge);
          break;
        case 4:
          if (ct(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var s = 31 - Ae(r);
            o = 1 << s, s = t[s], s > l && (l = s), r &= ~o;
          }
          if (r = l, r = Z() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Vf(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = $o(Pt.bind(null, e, ye, Ge), r);
            break;
          }
          Pt(e, ye, Ge);
          break;
        case 5:
          Pt(e, ye, Ge);
          break;
        default:
          throw Error(b(329));
      }
    }
  }
  return Se(e, Z()), e.callbackNode === n ? dc.bind(null, e) : null;
}
function Jo(e, t) {
  var n = Un;
  return e.current.memoizedState.isDehydrated && (Rt(e, t).flags |= 256), e = ml(e, t), e !== 2 && (t = ye, ye = n, t !== null && qo(t)), e;
}
function qo(e) {
  ye === null ? ye = e : ye.push.apply(ye, e);
}
function Qf(e) {
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
  for (t &= ~Ai, t &= ~El, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ae(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ta(e) {
  if (A & 6) throw Error(b(327));
  cn();
  var t = Zr(e, 0);
  if (!(t & 1)) return Se(e, Z()), null;
  var n = ml(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = No(e);
    r !== 0 && (t = r, n = Jo(e, r));
  }
  if (n === 1) throw n = sr, Rt(e, 0), ct(e, t), Se(e, Z()), n;
  if (n === 6) throw Error(b(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Pt(e, ye, Ge), Se(e, Z()), null;
}
function Bi(e, t) {
  var n = A;
  A |= 1;
  try {
    return e(t);
  } finally {
    A = n, A === 0 && (vn = Z() + 500, Nl && _t());
  }
}
function Ut(e) {
  ft !== null && ft.tag === 0 && !(A & 6) && cn();
  var t = A;
  A |= 1;
  var n = Le.transition, r = B;
  try {
    if (Le.transition = null, B = 1, e) return e();
  } finally {
    B = r, Le.transition = n, A = t, !(A & 6) && _t();
  }
}
function Wi() {
  Ne = rn.current, V(rn);
}
function Rt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, jf(n)), q !== null) for (n = q.return; n !== null; ) {
    var r = n;
    switch (Si(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && nl();
        break;
      case 3:
        mn(), V(ke), V(fe), $i();
        break;
      case 5:
        Ti(r);
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
        Ci(r.type._context);
        break;
      case 22:
      case 23:
        Wi();
    }
    n = n.return;
  }
  if (le = e, q = e = wt(e.current, null), ie = Ne = t, te = 0, sr = null, Ai = El = At = 0, ye = Un = null, $t !== null) {
    for (t = 0; t < $t.length; t++) if (n = $t[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var s = o.next;
        o.next = l, r.next = s;
      }
      n.pending = r;
    }
    $t = null;
  }
  return e;
}
function fc(e, t) {
  do {
    var n = q;
    try {
      if (bi(), Ir.current = dl, cl) {
        for (var r = Y.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        cl = !1;
      }
      if (It = 0, re = ee = Y = null, In = !1, lr = 0, Ii.current = null, n === null || n.return === null) {
        te = 1, sr = t, q = null;
        break;
      }
      e: {
        var o = e, s = n.return, a = n, u = t;
        if (t = ie, a.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, v = a, m = v.tag;
          if (!(v.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var h = v.alternate;
            h ? (v.updateQueue = h.updateQueue, v.memoizedState = h.memoizedState, v.lanes = h.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var g = Bs(s);
          if (g !== null) {
            g.flags &= -257, Ws(g, s, a, o, t), g.mode & 1 && Us(o, c, t), t = g, u = c;
            var y = t.updateQueue;
            if (y === null) {
              var w = /* @__PURE__ */ new Set();
              w.add(u), t.updateQueue = w;
            } else y.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Us(o, c, t), Hi();
              break e;
            }
            u = Error(b(426));
          }
        } else if (Q && a.mode & 1) {
          var _ = Bs(s);
          if (_ !== null) {
            !(_.flags & 65536) && (_.flags |= 256), Ws(_, s, a, o, t), Ni(gn(u, a));
            break e;
          }
        }
        o = u = gn(u, a), te !== 4 && (te = 2), Un === null ? Un = [o] : Un.push(o), o = s;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var p = Gu(o, u, t);
              Rs(o, p);
              break e;
            case 1:
              a = u;
              var d = o.type, f = o.stateNode;
              if (!(o.flags & 128) && (typeof d.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (xt === null || !xt.has(f)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var x = Xu(o, a, t);
                Rs(o, x);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      mc(n);
    } catch (k) {
      t = k, q === n && n !== null && (q = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function pc() {
  var e = fl.current;
  return fl.current = dl, e === null ? dl : e;
}
function Hi() {
  (te === 0 || te === 3 || te === 2) && (te = 4), le === null || !(At & 268435455) && !(El & 268435455) || ct(le, ie);
}
function ml(e, t) {
  var n = A;
  A |= 2;
  var r = pc();
  (le !== e || ie !== t) && (Ge = null, Rt(e, t));
  do
    try {
      Kf();
      break;
    } catch (l) {
      fc(e, l);
    }
  while (!0);
  if (bi(), A = n, fl.current = r, q !== null) throw Error(b(261));
  return le = null, ie = 0, te;
}
function Kf() {
  for (; q !== null; ) hc(q);
}
function Yf() {
  for (; q !== null && !xd(); ) hc(q);
}
function hc(e) {
  var t = vc(e.alternate, e, Ne);
  e.memoizedProps = e.pendingProps, t === null ? mc(e) : q = t, Ii.current = null;
}
function mc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Uf(n, t), n !== null) {
        n.flags &= 32767, q = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        te = 6, q = null;
        return;
      }
    } else if (n = Af(n, t, Ne), n !== null) {
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
    Le.transition = null, B = 1, Gf(e, t, n, r);
  } finally {
    Le.transition = l, B = r;
  }
  return null;
}
function Gf(e, t, n, r) {
  do
    cn();
  while (ft !== null);
  if (A & 6) throw Error(b(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(b(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Ed(e, o), e === le && (q = le = null, ie = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Pr || (Pr = !0, xc(Xr, function() {
    return cn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Le.transition, Le.transition = null;
    var s = B;
    B = 1;
    var a = A;
    A |= 4, Ii.current = null, Wf(e, n), uc(n, e), mf(Po), Jr = !!zo, Po = zo = null, e.current = n, Hf(n), yd(), A = a, B = s, Le.transition = o;
  } else e.current = n;
  if (Pr && (Pr = !1, ft = e, hl = l), o = e.pendingLanes, o === 0 && (xt = null), jd(n.stateNode), Se(e, Z()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (pl) throw pl = !1, e = Xo, Xo = null, e;
  return hl & 1 && e.tag !== 0 && cn(), o = e.pendingLanes, o & 1 ? e === Zo ? Bn++ : (Bn = 0, Zo = e) : Bn = 0, _t(), null;
}
function cn() {
  if (ft !== null) {
    var e = Ga(hl), t = Le.transition, n = B;
    try {
      if (Le.transition = null, B = 16 > e ? 16 : e, ft === null) var r = !1;
      else {
        if (e = ft, ft = null, hl = 0, A & 6) throw Error(b(331));
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
                      An(8, v, o);
                  }
                  var m = v.child;
                  if (m !== null) m.return = v, L = m;
                  else for (; L !== null; ) {
                    v = L;
                    var h = v.sibling, g = v.return;
                    if (ic(v), v === c) {
                      L = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = g, L = h;
                      break;
                    }
                    L = g;
                  }
                }
              }
              var y = o.alternate;
              if (y !== null) {
                var w = y.child;
                if (w !== null) {
                  y.child = null;
                  do {
                    var _ = w.sibling;
                    w.sibling = null, w = _;
                  } while (w !== null);
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
          s = L;
          var f = s.child;
          if (s.subtreeFlags & 2064 && f !== null) f.return = s, L = f;
          else e: for (s = d; L !== null; ) {
            if (a = L, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Cl(9, a);
              }
            } catch (k) {
              X(a, a.return, k);
            }
            if (a === s) {
              L = null;
              break e;
            }
            var x = a.sibling;
            if (x !== null) {
              x.return = a.return, L = x;
              break e;
            }
            L = a.return;
          }
        }
        if (A = l, _t(), Ke && typeof Ke.onPostCommitFiberRoot == "function") try {
          Ke.onPostCommitFiberRoot(yl, e);
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
function na(e, t, n) {
  t = gn(n, t), t = Gu(e, t, 1), e = vt(e, t, 1), t = he(), e !== null && (ur(e, 1, t), Se(e, t));
}
function X(e, t, n) {
  if (e.tag === 3) na(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      na(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (xt === null || !xt.has(r))) {
        e = gn(n, e), e = Xu(t, e, 1), t = vt(t, e, 1), e = he(), t !== null && (ur(t, 1, e), Se(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Xf(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = he(), e.pingedLanes |= e.suspendedLanes & n, le === e && (ie & n) === n && (te === 4 || te === 3 && (ie & 130023424) === ie && 500 > Z() - Ui ? Rt(e, 0) : Ai |= n), Se(e, t);
}
function gc(e, t) {
  t === 0 && (e.mode & 1 ? (t = wr, wr <<= 1, !(wr & 130023424) && (wr = 4194304)) : t = 1);
  var n = he();
  e = nt(e, t), e !== null && (ur(e, t, n), Se(e, n));
}
function Zf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), gc(e, n);
}
function Jf(e, t) {
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
      throw Error(b(314));
  }
  r !== null && r.delete(t), gc(e, n);
}
var vc;
vc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ke.current) we = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return we = !1, If(e, t, n);
    we = !!(e.flags & 131072);
  }
  else we = !1, Q && t.flags & 1048576 && ku(t, ol, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Ur(e, t), e = t.pendingProps;
      var l = fn(t, fe.current);
      un(t, n), l = Mi(null, t, r, e, l, n);
      var o = Ri();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, je(r) ? (o = !0, rl(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, zi(t), l.updater = bl, t.stateNode = l, l._reactInternals = t, Io(t, r, e, n), t = Bo(null, t, r, !0, o, n)) : (t.tag = 0, Q && o && ji(t), pe(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Ur(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = ep(r), e = Fe(r, e), l) {
          case 0:
            t = Uo(null, t, r, e, n);
            break e;
          case 1:
            t = Qs(null, t, r, e, n);
            break e;
          case 11:
            t = Hs(null, t, r, e, n);
            break e;
          case 14:
            t = Vs(null, t, r, Fe(r.type, e), n);
            break e;
        }
        throw Error(b(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), Uo(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), Qs(e, t, r, l, n);
    case 3:
      e: {
        if (ec(t), e === null) throw Error(b(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, Cu(e, t), al(t, r, null, n);
        var s = t.memoizedState;
        if (r = s.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: s.cache, pendingSuspenseBoundaries: s.pendingSuspenseBoundaries, transitions: s.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = gn(Error(b(423)), t), t = Ks(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = gn(Error(b(424)), t), t = Ks(e, t, r, n, l);
          break e;
        } else for (_e = gt(t.stateNode.containerInfo.firstChild), be = t, Q = !0, Ie = null, n = _u(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (pn(), r === l) {
            t = rt(e, t, n);
            break e;
          }
          pe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Eu(t), e === null && Oo(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, s = l.children, To(r, l) ? s = null : o !== null && To(r, o) && (t.flags |= 32), qu(e, t), pe(e, t, s, n), t.child;
    case 6:
      return e === null && Oo(t), null;
    case 13:
      return tc(e, t, n);
    case 4:
      return Pi(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = hn(t, null, r, n) : pe(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), Hs(e, t, r, l, n);
    case 7:
      return pe(e, t, t.pendingProps, n), t.child;
    case 8:
      return pe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return pe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, s = l.value, W(il, r._currentValue), r._currentValue = s, o !== null) if (Be(o.value, s)) {
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
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Fo(
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
            if (s = o.return, s === null) throw Error(b(341));
            s.lanes |= n, a = s.alternate, a !== null && (a.lanes |= n), Fo(s, n, t), s = o.sibling;
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
        pe(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, un(t, n), l = Me(l), r = r(l), t.flags |= 1, pe(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Fe(r, t.pendingProps), l = Fe(r.type, l), Vs(e, t, r, l, n);
    case 15:
      return Zu(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), Ur(e, t), t.tag = 1, je(r) ? (e = !0, rl(t)) : e = !1, un(t, n), Yu(t, r, l), Io(t, r, l, n), Bo(null, t, r, !0, e, n);
    case 19:
      return nc(e, t, n);
    case 22:
      return Ju(e, t, n);
  }
  throw Error(b(156, t.tag));
};
function xc(e, t) {
  return Va(e, t);
}
function qf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function $e(e, t, n, r) {
  return new qf(e, t, n, r);
}
function Vi(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function ep(e) {
  if (typeof e == "function") return Vi(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ci) return 11;
    if (e === di) return 14;
  }
  return 2;
}
function wt(e, t) {
  var n = e.alternate;
  return n === null ? (n = $e(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Hr(e, t, n, r, l, o) {
  var s = 2;
  if (r = e, typeof e == "function") Vi(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else e: switch (e) {
    case Kt:
      return Ot(n.children, l, o, t);
    case ui:
      s = 8, l |= 8;
      break;
    case ao:
      return e = $e(12, n, t, l | 2), e.elementType = ao, e.lanes = o, e;
    case uo:
      return e = $e(13, n, t, l), e.elementType = uo, e.lanes = o, e;
    case co:
      return e = $e(19, n, t, l), e.elementType = co, e.lanes = o, e;
    case Ea:
      return zl(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case ba:
          s = 10;
          break e;
        case Ca:
          s = 9;
          break e;
        case ci:
          s = 11;
          break e;
        case di:
          s = 14;
          break e;
        case st:
          s = 16, r = null;
          break e;
      }
      throw Error(b(130, e == null ? e : typeof e, ""));
  }
  return t = $e(s, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Ot(e, t, n, r) {
  return e = $e(7, e, r, t), e.lanes = n, e;
}
function zl(e, t, n, r) {
  return e = $e(22, e, r, t), e.elementType = Ea, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function oo(e, t, n) {
  return e = $e(6, e, null, t), e.lanes = n, e;
}
function io(e, t, n) {
  return t = $e(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function tp(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Al(0), this.expirationTimes = Al(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Al(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Qi(e, t, n, r, l, o, s, a, u) {
  return e = new tp(e, t, n, a, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = $e(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, zi(o), e;
}
function np(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Qt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function yc(e) {
  if (!e) return jt;
  e = e._reactInternals;
  e: {
    if (Wt(e) !== e || e.tag !== 1) throw Error(b(170));
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
    throw Error(b(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (je(n)) return yu(e, n, t);
  }
  return t;
}
function wc(e, t, n, r, l, o, s, a, u) {
  return e = Qi(n, r, !0, e, l, o, s, a, u), e.context = yc(null), n = e.current, r = he(), l = yt(n), o = qe(r, l), o.callback = t ?? null, vt(n, o, l), e.current.lanes = l, ur(e, l, r), Se(e, r), e;
}
function Pl(e, t, n, r) {
  var l = t.current, o = he(), s = yt(l);
  return n = yc(n), t.context === null ? t.context = n : t.pendingContext = n, t = qe(o, s), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = vt(l, t, s), e !== null && (Ue(e, l, s, o), Dr(e, l, s)), s;
}
function gl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function ra(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ki(e, t) {
  ra(e, t), (e = e.alternate) && ra(e, t);
}
function rp() {
  return null;
}
var kc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Yi(e) {
  this._internalRoot = e;
}
Tl.prototype.render = Yi.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(b(409));
  Pl(e, t, null, null);
};
Tl.prototype.unmount = Yi.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ut(function() {
      Pl(null, e, null, null);
    }), t[tt] = null;
  }
};
function Tl(e) {
  this._internalRoot = e;
}
Tl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Ja();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ut.length && t !== 0 && t < ut[n].priority; n++) ;
    ut.splice(n, 0, e), n === 0 && eu(e);
  }
};
function Gi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function $l(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function la() {
}
function lp(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = gl(s);
        o.call(c);
      };
    }
    var s = wc(t, r, e, 0, null, !1, !1, "", la);
    return e._reactRootContainer = s, e[tt] = s.current, qn(e.nodeType === 8 ? e.parentNode : e), Ut(), s;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var c = gl(u);
      a.call(c);
    };
  }
  var u = Qi(e, 0, !1, null, null, !1, !1, "", la);
  return e._reactRootContainer = u, e[tt] = u.current, qn(e.nodeType === 8 ? e.parentNode : e), Ut(function() {
    Pl(t, u, n, r);
  }), u;
}
function Ll(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var s = o;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var u = gl(s);
        a.call(u);
      };
    }
    Pl(t, s, e, l);
  } else s = lp(n, t, e, l, r);
  return gl(s);
}
Xa = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = $n(t.pendingLanes);
        n !== 0 && (hi(t, n | 1), Se(t, Z()), !(A & 6) && (vn = Z() + 500, _t()));
      }
      break;
    case 13:
      Ut(function() {
        var r = nt(e, 1);
        if (r !== null) {
          var l = he();
          Ue(r, e, 1, l);
        }
      }), Ki(e, 1);
  }
};
mi = function(e) {
  if (e.tag === 13) {
    var t = nt(e, 134217728);
    if (t !== null) {
      var n = he();
      Ue(t, e, 134217728, n);
    }
    Ki(e, 134217728);
  }
};
Za = function(e) {
  if (e.tag === 13) {
    var t = yt(e), n = nt(e, t);
    if (n !== null) {
      var r = he();
      Ue(n, e, t, r);
    }
    Ki(e, t);
  }
};
Ja = function() {
  return B;
};
qa = function(e, t) {
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
            var l = Sl(r);
            if (!l) throw Error(b(90));
            Pa(r), ho(r, l);
          }
        }
      }
      break;
    case "textarea":
      $a(e, n);
      break;
    case "select":
      t = n.value, t != null && ln(e, !!n.multiple, t, !1);
  }
};
Ia = Bi;
Aa = Ut;
var op = { usingClientEntryPoint: !1, Events: [dr, Zt, Sl, Fa, Da, Bi] }, En = { findFiberByHostInstance: Tt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, ip = { bundleType: En.bundleType, version: En.version, rendererPackageName: En.rendererPackageName, rendererConfig: En.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: lt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Wa(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: En.findFiberByHostInstance || rp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Tr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Tr.isDisabled && Tr.supportsFiber) try {
    yl = Tr.inject(ip), Ke = Tr;
  } catch {
  }
}
Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = op;
Ee.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Gi(t)) throw Error(b(200));
  return np(e, t, null, n);
};
Ee.createRoot = function(e, t) {
  if (!Gi(e)) throw Error(b(299));
  var n = !1, r = "", l = kc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Qi(e, 1, !1, null, null, n, !1, r, l), e[tt] = t.current, qn(e.nodeType === 8 ? e.parentNode : e), new Yi(t);
};
Ee.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(b(188)) : (e = Object.keys(e).join(","), Error(b(268, e)));
  return e = Wa(t), e = e === null ? null : e.stateNode, e;
};
Ee.flushSync = function(e) {
  return Ut(e);
};
Ee.hydrate = function(e, t, n) {
  if (!$l(t)) throw Error(b(200));
  return Ll(null, e, t, !0, n);
};
Ee.hydrateRoot = function(e, t, n) {
  if (!Gi(e)) throw Error(b(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", s = kc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = wc(t, null, e, 1, n ?? null, l, !1, o, s), e[tt] = t.current, qn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Tl(t);
};
Ee.render = function(e, t, n) {
  if (!$l(t)) throw Error(b(200));
  return Ll(null, e, t, !1, n);
};
Ee.unmountComponentAtNode = function(e) {
  if (!$l(e)) throw Error(b(40));
  return e._reactRootContainer ? (Ut(function() {
    Ll(null, null, e, !1, function() {
      e._reactRootContainer = null, e[tt] = null;
    });
  }), !0) : !1;
};
Ee.unstable_batchedUpdates = Bi;
Ee.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!$l(n)) throw Error(b(200));
  if (e == null || e._reactInternals === void 0) throw Error(b(38));
  return Ll(e, t, n, !1, r);
};
Ee.version = "18.3.1-next-f1338f8080-20240426";
function jc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(jc);
    } catch (e) {
      console.error(e);
    }
}
jc(), ja.exports = Ee;
var sp = ja.exports, Sc, oa = sp;
Sc = oa.createRoot, oa.hydrateRoot;
function T({ name: e, className: t }) {
  return /* @__PURE__ */ i.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("ha-icon", { icon: `mdi:${e}` }) });
}
const ap = '<defs><linearGradient id="hl-mark-g" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#FFB547"/><stop offset="1" stop-color="#FF5A1F"/></linearGradient></defs><polygon points="256,62 452,222 452,446 60,446 60,222" fill="url(#hl-mark-g)" stroke="url(#hl-mark-g)" stroke-width="56" stroke-linejoin="round"/><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" fill="#fff" transform="translate(256 292) scale(10) translate(-12 -12)"/>';
function ia({ size: e = 28 }) {
  return /* @__PURE__ */ i.jsx(
    "svg",
    {
      className: "logo-mark",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      "aria-hidden": "true",
      dangerouslySetInnerHTML: { __html: ap }
    }
  );
}
const Et = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
], Wn = { heat: "Heating", water: "Hot water" }, up = 3, Nc = (e) => e && typeof e == "object" && e.error && typeof e.error == "object" ? e.error : e, cp = (e) => {
  var t;
  return ((t = Nc(e)) == null ? void 0 : t.code) === up;
}, me = (e) => {
  const t = Nc(e);
  if (typeof t == "string") return t;
  if (typeof (t == null ? void 0 : t.message) == "string" && t.message) return t.message;
  if ((t == null ? void 0 : t.code) !== void 0) return `Error: ${t.code}`;
  try {
    return JSON.stringify(t);
  } catch {
    return String(t);
  }
};
function _c(e, t, n) {
  const [r, l] = N.useState(!1), [o, s] = N.useState(null);
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
const Mt = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, dp = [30, 60, 120, 180];
function fp({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onOpenDevice: l,
  onOpenRoom: o
}) {
  const [s, a] = N.useState([]), [u, c] = N.useState("all");
  N.useEffect(() => {
    const g = e().connection.subscribeMessage((y) => a(y.rooms), {
      type: "hive_local/rooms/subscribe"
    });
    return () => {
      g.then((y) => y()).catch(() => {
      });
    };
  }, [e]);
  const v = t.flatMap((g) => g.channels.map((y) => {
    var w, _;
    return { d: g, c: y, s: ((_ = (w = n[g.entry_id]) == null ? void 0 : w[y]) == null ? void 0 : _.status) ?? null };
  })), m = t.length > 1, h = [
    { id: "all", label: "All", icon: "" },
    { id: "heat", label: "Heating", icon: "radiator" },
    ...v.some(({ c: g }) => g === "water") ? [{ id: "water", label: "Hot water", icon: "water-boiler" }] : [],
    ...s.length ? [{ id: "rooms", label: "Rooms", icon: "home-thermometer-outline" }] : []
  ];
  return /* @__PURE__ */ i.jsx("div", { className: "home", children: t.length > 0 && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: "home-section", children: "Quick actions" }),
    /* @__PURE__ */ i.jsx(pp, { getHass: e, devices: t, status: n }),
    /* @__PURE__ */ i.jsx("h3", { className: "home-section", children: "Your devices" }),
    h.length > 2 && /* @__PURE__ */ i.jsx("div", { className: "pills", role: "tablist", "aria-label": "Show", children: h.map((g) => /* @__PURE__ */ i.jsxs("button", { role: "tab", "aria-selected": u === g.id, className: `pill ${u === g.id ? "on" : ""}`, onClick: () => c(g.id), children: [
      g.icon && /* @__PURE__ */ i.jsx(T, { name: g.icon }),
      " ",
      g.label
    ] }, g.id)) }),
    /* @__PURE__ */ i.jsxs("div", { className: "device-grid", children: [
      v.filter(({ c: g }) => u === "all" || u === g).map(({ d: g, c: y }) => {
        var w;
        return /* @__PURE__ */ i.jsx(
          bc,
          {
            getHass: e,
            device: g,
            channel: y,
            info: (w = n[g.entry_id]) == null ? void 0 : w[y],
            showDevice: m,
            limits: r,
            onOpen: () => l(g.entry_id, y)
          },
          `${g.entry_id}-${y}`
        );
      }),
      (u === "all" || u === "rooms") && s.map((g) => /* @__PURE__ */ i.jsx(hp, { room: g, showReceiver: m, onOpen: () => o(g.id) }, g.id))
    ] })
  ] }) });
}
function pp({ getHass: e, devices: t, status: n }) {
  var m, h;
  const [r, l] = N.useState(null), [o, s] = N.useState(null), a = t.length > 1, u = async (g, y, w) => {
    l(g);
    try {
      for (const _ of y) await e().callWS(_);
      s({ ok: !0, text: w });
    } catch (_) {
      s({ ok: !1, text: me(_) });
    } finally {
      l(null);
    }
  }, c = [];
  for (const g of t)
    for (const y of g.channels) {
      const w = (m = n[g.entry_id]) == null ? void 0 : m[y];
      if (((h = w == null ? void 0 : w.status) == null ? void 0 : h.mode) === "boost") continue;
      const _ = Mt((w == null ? void 0 : w.boost_minutes) ?? 30), p = y === "water" ? "hot water" : "heating";
      c.push({
        id: `boost-${g.entry_id}-${y}`,
        label: `Boost ${p} · ${_}${a ? ` (${g.name})` : ""}`,
        icon: "rocket-launch",
        kind: y,
        msgs: [{ type: "hive_local/boost", entry_id: g.entry_id, channel: y }],
        done: `Boosting ${p} for ${_}`
      });
    }
  const v = t.flatMap(
    (g) => g.channels.filter((y) => {
      var _, p, d;
      const w = (d = (p = (_ = n[g.entry_id]) == null ? void 0 : _[y]) == null ? void 0 : p.status) == null ? void 0 : d.mode;
      return w && w !== "schedule";
    }).map((y) => ({ d: g, c: y }))
  );
  return v.length && c.push({
    id: "schedule",
    label: "Everything back to schedule",
    icon: "calendar-clock",
    kind: "neutral",
    msgs: v.map(
      ({ d: g, c: y }) => {
        var w, _, p;
        return ((p = (_ = (w = n[g.entry_id]) == null ? void 0 : w[y]) == null ? void 0 : _.status) == null ? void 0 : p.mode) === "boost" ? { type: "hive_local/cancel_boost", entry_id: g.entry_id, channel: y } : { type: "hive_local/mode", entry_id: g.entry_id, channel: y, mode: "schedule" };
      }
    ),
    done: "Back on the schedule"
  }), /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx("div", { className: "quick", children: c.map((g) => /* @__PURE__ */ i.jsxs("button", { className: `quick-action ${g.kind}`, disabled: r != null, onClick: () => u(g.id, g.msgs, g.done), children: [
      /* @__PURE__ */ i.jsx("span", { className: "quick-icon", children: /* @__PURE__ */ i.jsx(T, { name: r === g.id ? "timer-sand" : g.icon }) }),
      /* @__PURE__ */ i.jsx("span", { className: "quick-label", children: g.label })
    ] }, g.id)) }),
    o && /* @__PURE__ */ i.jsx("div", { className: `status ${o.ok ? "ok" : "error"}`, children: o.text })
  ] });
}
function hp({ room: e, showReceiver: t, onOpen: n }) {
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
function bc({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  showDevice: l,
  limits: o,
  onOpen: s,
  page: a = !1
}) {
  var ne, Ht, We;
  const u = n === "water", c = (r == null ? void 0 : r.status) ?? null, { busy: v, result: m, send: h } = _c(e, t.entry_id, n), g = !!c && c.mode !== "off" && c.heating, y = !c || c.mode === "off" ? "off" : g ? "heating" : "idle", w = !u && (c == null ? void 0 : c.setpoint) != null && c.setpoint <= 1, _ = u || (c == null ? void 0 : c.setpoint) == null ? null : w ? (r == null ? void 0 : r.frost_temperature) ?? null : c.setpoint, p = [
    { id: "schedule", label: "Schedule" },
    { id: "manual", label: u ? "Always on" : "Manual" },
    { id: "off", label: "Off" }
  ], d = (r == null ? void 0 : r.boost_minutes) ?? 30, f = (r == null ? void 0 : r.boost_temperature) ?? 21, [x, k] = N.useState(!1), C = (o == null ? void 0 : o.boost_min_temp) ?? 5, $ = (o == null ? void 0 : o.heat_max) ?? 32, j = (U) => Math.min($, Math.max(C, Math.round(U * 2) / 2)), S = [.../* @__PURE__ */ new Set([...dp, d])].filter((U) => U <= ((o == null ? void 0 : o.boost_max_minutes) ?? 360)).sort((U, pr) => U - pr), [P, I] = N.useState(null), R = N.useRef();
  N.useEffect(() => () => window.clearTimeout(R.current), []), N.useEffect(() => I(null), [c == null ? void 0 : c.setpoint, c == null ? void 0 : c.mode]);
  const J = !u && !!c && c.mode !== "off", xe = (U) => {
    const Ml = j((P ?? _ ?? 20) + U);
    I(Ml), window.clearTimeout(R.current), R.current = window.setTimeout(() => {
      h({ type: "hive_local/target", temperature: Ml }, `Set to ${Ml}°`).then(
        () => window.setTimeout(() => I(null), 8e3)
      );
    }, 1200);
  }, bt = P ?? _, ot = (U, pr) => h({ type: "hive_local/boost", minutes: U, ...u ? {} : { temperature: pr } }, `Boosting for ${Mt(U)}`).then(
    () => k(!1)
  ), Ct = c ? c.mode === "boost" ? "Boost to" : w && P == null ? "Frost" : c.mode === "manual" ? "Hold at" : "Target" : "", z = (c == null ? void 0 : c.mode) === "boost", O = z ? ((ne = r == null ? void 0 : r.preheat) == null ? void 0 : ne.active_for) ?? null : null, E = O != null;
  let M = "Waiting for the receiver…";
  c && (c.mode === "off" ? M = "Off" : z ? M = u ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
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
  ] }) : u ? M = g ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Heating water ",
    /* @__PURE__ */ i.jsx(T, { name: "water", className: "status-icon" })
  ] }) : "Not heating now" : g ? M = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Heating to ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      _,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx(T, { name: "fire", className: "status-icon" })
  ] }) : w ? M = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Frost protection ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      _,
      "°"
    ] })
  ] }) : M = _ != null ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Target ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      _,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx(T, { name: "check-circle-outline", className: "status-icon done" })
  ] }) : "Idle"), c && E && (M = /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    "Pre-heating to ",
    /* @__PURE__ */ i.jsxs("b", { children: [
      c.setpoint,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ i.jsx(T, { name: "sun-clock", className: "status-icon" })
  ] }));
  const F = c ? E ? `Pre-heating for ${(Ht = r == null ? void 0 : r.preheat) == null ? void 0 : Ht.active_for}` : c.mode === "boost" ? c.boost_remaining != null ? `Boost · ${Mt(c.boost_remaining)} left` : "Boost" : c.mode === "schedule" ? "On schedule" : (We = p.find((U) => U.id === c.mode)) == null ? void 0 : We.label : "", ae = a;
  return /* @__PURE__ */ i.jsxs("section", { className: `card device ${n} ${y} ${a ? "page" : ""}`, children: [
    /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "device-head",
        ...a ? {} : { role: "button", tabIndex: 0, onClick: s, onKeyDown: (U) => U.key === "Enter" && U.target === U.currentTarget && (s == null ? void 0 : s()) },
        children: [
          /* @__PURE__ */ i.jsxs("div", { className: "device-row", children: [
            /* @__PURE__ */ i.jsx("span", { className: `device-icon ${n}`, children: /* @__PURE__ */ i.jsx(T, { name: u ? "water-boiler" : "radiator" }) }),
            /* @__PURE__ */ i.jsxs("div", { className: "device-name", children: [
              /* @__PURE__ */ i.jsx("span", { children: Wn[n] }),
              /* @__PURE__ */ i.jsx("span", { className: "muted small", children: l ? `${t.name} · ${F}` : F })
            ] }),
            /* @__PURE__ */ i.jsx("span", { className: "device-status", children: M })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "device-row", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "device-big", children: [
              u ? c ? c.mode === "off" ? "Off" : g ? "On" : "Idle" : "–" : (c == null ? void 0 : c.current_temperature) != null ? c.current_temperature.toFixed(1) : "–",
              !u && /* @__PURE__ */ i.jsx("span", { children: "°" }),
              /* @__PURE__ */ i.jsx("small", { children: u ? "Now" : "Actual" })
            ] }),
            /* @__PURE__ */ i.jsxs(
              "button",
              {
                className: `device-action ${z ? "boosting" : ""}`,
                disabled: v || !c,
                onClick: (U) => {
                  U.stopPropagation(), k(!0);
                },
                children: [
                  /* @__PURE__ */ i.jsx(T, { name: E ? "sun-clock" : "rocket-launch" }),
                  " ",
                  E ? "Pre-heating" : z ? "Boosting" : "Boost"
                ]
              }
            )
          ] })
        ]
      }
    ),
    ae && /* @__PURE__ */ i.jsxs("div", { className: "device-body", children: [
      !u && /* @__PURE__ */ i.jsxs("div", { className: "target-row", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "target-text", children: [
          /* @__PURE__ */ i.jsx("span", { className: "target-label", children: Ct || "Target" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: c ? c.mode === "off" ? "Turn the heating on to set a target" : c.mode === "schedule" ? "Until the next scheduled change" : c.mode === "boost" ? "Keeps the boost time left" : "Held until you change it" : "" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "target-control", children: [
          /* @__PURE__ */ i.jsx("button", { className: "round target-btn", disabled: !J, onClick: () => xe(-0.5), "aria-label": "Lower the target", children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
          /* @__PURE__ */ i.jsx("span", { className: `target-value ${P != null ? "pending" : ""}`, children: bt != null && (c == null ? void 0 : c.mode) !== "off" ? `${bt.toFixed(1)}°` : "–" }),
          /* @__PURE__ */ i.jsx("button", { className: "round target-btn", disabled: !J, onClick: () => xe(0.5), "aria-label": "Raise the target", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "segmented full", children: p.map((U) => /* @__PURE__ */ i.jsx(
        "button",
        {
          className: (c == null ? void 0 : c.mode) === U.id ? "on" : "",
          disabled: v || !c,
          onClick: () => h({ type: "hive_local/mode", mode: U.id }, U.id === "schedule" ? "Following the schedule" : U.label),
          children: U.label
        },
        U.id
      )) })
    ] }),
    (m == null ? void 0 : m.kind) === "error" && /* @__PURE__ */ i.jsx("div", { className: "status error", children: m.text }),
    x && /* @__PURE__ */ i.jsx(
      mp,
      {
        title: E ? "Pre-heating" : z ? "Boosting" : "Boost",
        subtitle: l ? `${t.name} · ${Wn[n]}` : Wn[n],
        water: u,
        boosting: z,
        preheatFor: O,
        remaining: (c == null ? void 0 : c.boost_remaining) ?? null,
        boostTarget: z ? (c == null ? void 0 : c.setpoint) ?? null : null,
        defaultMinutes: d,
        defaultTemp: f,
        durations: S,
        clampTemp: j,
        busy: v,
        onBoost: ot,
        onStop: () => h({ type: "hive_local/cancel_boost" }, "Boost cancelled").then(() => k(!1)),
        onClose: () => k(!1)
      }
    )
  ] });
}
function mp({
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
  busy: m,
  onBoost: h,
  onStop: g,
  onClose: y
}) {
  const [w, _] = N.useState(a), [p, d] = N.useState(u);
  return N.useEffect(() => {
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
      /* @__PURE__ */ i.jsx("span", { children: l ? `Warming up${s != null ? ` to ${s}°` : ""} for ${l}, when your schedule changes` : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        o != null ? `${Mt(o)} left` : "Boosting",
        !n && s != null ? ` · to ${s}°` : ""
      ] }) })
    ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      !n && /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
        /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Temperature" }),
        /* @__PURE__ */ i.jsxs("div", { className: "sheet-temp", children: [
          /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => d(v(p - 0.5)), "aria-label": "Lower", children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
          /* @__PURE__ */ i.jsxs("span", { className: "sheet-temp-value", children: [
            p.toFixed(1),
            "°"
          ] }),
          /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => d(v(p + 0.5)), "aria-label": "Raise", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
        /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "How long" }),
        /* @__PURE__ */ i.jsx("div", { className: "sheet-lengths", role: "radiogroup", "aria-label": "How long", children: c.map((f) => /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": f === w, className: f === w ? "on" : "", onClick: () => _(f), children: Mt(f) }, f)) })
      ] })
    ] }),
    r ? /* @__PURE__ */ i.jsxs("button", { className: "sheet-go stop", disabled: m, onClick: g, children: [
      /* @__PURE__ */ i.jsx("span", { className: "stop-square" }),
      " ",
      l ? "Stop pre-heating" : "Stop boost"
    ] }) : /* @__PURE__ */ i.jsx("button", { className: "sheet-go", disabled: m, onClick: () => h(w, p), children: n ? `Boost hot water for ${Mt(w)}` : `Boost to ${p.toFixed(1)}° for ${Mt(w)}` }),
    /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: y, children: "Cancel" })
  ] }) });
}
const gp = [60, 90, 120, 180];
function vp({ getHass: e, device: t, info: n }) {
  const { busy: r, result: l, send: o } = _c(e, t.entry_id, "heat"), s = [.../* @__PURE__ */ new Set([...gp, n.max_lead])].sort((u, c) => u - c);
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
const xp = ["monday", "tuesday", "wednesday", "thursday", "friday"], yp = ["saturday", "sunday"], zn = (e) => e[0].toUpperCase() + e.slice(1, 3), Vr = (e) => {
  const [t, n] = e.split(":").map(Number);
  return t * 60 + n;
};
function wp({
  getHass: e,
  device: t,
  channel: n,
  limits: r,
  mode: l,
  preheatFor: o
}) {
  var O;
  const [s, a] = N.useState({}), [u, c] = N.useState({}), [v, m] = N.useState("monday"), [h, g] = N.useState({ kind: "idle" }), y = t.entry_id, w = n === "water", _ = JSON.stringify(s) !== JSON.stringify(u), p = N.useCallback(async () => {
    g({ kind: "busy", text: "Reading from receiver…" });
    try {
      const E = await e().callWS({
        type: "hive_local/get",
        entry_id: y,
        channel: n
      });
      a(E.schedule), c(E.schedule);
      const M = Object.keys(E.schedule).length;
      g(
        E.complete ? { kind: "ok", text: "Schedule read from receiver" } : M ? { kind: "error", text: `Only got ${M}/7 days — try reading again` } : { kind: "error", text: "No reply. On Zigbee2MQTT, check the receiver's friendly name; on ZHA, check the receiver is online." }
      );
    } catch (E) {
      g({ kind: "error", text: me(E) });
    }
  }, [y, n, e]);
  N.useEffect(() => {
    p();
  }, [p]), N.useEffect(() => {
    if (h.kind !== "ok") return;
    const E = setTimeout(() => g({ kind: "idle" }), 4e3);
    return () => clearTimeout(E);
  }, [h]);
  const d = async () => {
    const E = Object.fromEntries(
      Et.filter((M) => {
        var F;
        return JSON.stringify(s[M]) !== JSON.stringify(u[M]) && ((F = s[M]) == null ? void 0 : F.length);
      }).map((M) => [M, s[M]])
    );
    if (Object.keys(E).length) {
      g({ kind: "busy", text: "Writing to receiver…" });
      try {
        const M = await e().callWS({
          type: "hive_local/set",
          entry_id: y,
          channel: n,
          schedule: E
        }), F = { ...s, ...M.schedule };
        a(F), c(F);
        const ae = Object.keys(M.schedule).map((ne) => ne[0].toUpperCase() + ne.slice(1, 3));
        g({
          kind: "ok",
          text: `Wrote ${ae.join(", ")}. Read back to confirm the receiver kept it.`
        });
      } catch (M) {
        g({ kind: "error", text: me(M) });
      }
    }
  }, f = s[v] ?? [], x = r.max_transitions, k = (E) => a((M) => ({ ...M, [v]: [...E].sort((F, ae) => Vr(F.time) - Vr(ae.time)) })), C = () => {
    const E = f[f.length - 1], M = E ? kp(f, Vr(E.time) + 60) : "06:00", F = w ? r.water_on : (E == null ? void 0 : E.setpoint) ?? 20;
    k([...f, { time: M, setpoint: F }]);
  }, $ = (E) => a((M) => {
    const F = { ...M };
    for (const ae of E) F[ae] = f.map((ne) => ({ ...ne }));
    return F;
  }), j = N.useMemo(() => {
    const E = Object.values(s).flat().map((M) => M.setpoint).filter((M) => M > r.heat_min);
    return { lo: Math.min(15, ...E), hi: Math.max(24, ...E) };
  }, [s, r.heat_min]), S = Et[((/* @__PURE__ */ new Date()).getDay() + 6) % 7], [P, I] = N.useState(null), [R, J] = N.useState(!1), xe = Et.filter((E) => JSON.stringify(s[E]) !== JSON.stringify(u[E])), bt = Et[(Et.indexOf(v) + 1) % 7], ot = (O = (s[bt] ?? [])[0]) == null ? void 0 : O.time, Ct = (E) => w ? E.setpoint < r.water_on : E.setpoint <= r.heat_min;
  let z = "Stored on the receiver, so it keeps running without Home Assistant.";
  return l === "schedule" ? z = "Your schedule is running." : l === "manual" ? z = `Your schedule isn't being used: ${w ? "hot water is always on" : "heating is on Manual"}.` : l === "off" ? z = `Your schedule isn't being used: ${w ? "hot water" : "heating"} is off.` : l === "boost" && o ? z = `Your schedule is running, starting early so it's warm by ${o}.` : l === "boost" && (z = "Boosting now. Your schedule carries on after the boost."), /* @__PURE__ */ i.jsxs("div", { className: "sched", children: [
    /* @__PURE__ */ i.jsx("p", { className: "sched-status muted", children: z }),
    /* @__PURE__ */ i.jsx("div", { className: "sched-days", role: "tablist", "aria-label": "Day", children: Et.map((E) => /* @__PURE__ */ i.jsxs(
      "button",
      {
        role: "tab",
        "aria-selected": E === v,
        "aria-label": E,
        className: `sched-day ${E === v ? "on" : ""} ${E === S ? "today" : ""}`,
        onClick: () => {
          m(E), I(null);
        },
        children: [
          E[0].toUpperCase(),
          xe.includes(E) && /* @__PURE__ */ i.jsx("i", { className: "sched-dot", "aria-label": "changed" })
        ]
      },
      E
    )) }),
    h.text && h.kind !== "idle" && /* @__PURE__ */ i.jsx("div", { className: `status ${h.kind}`, children: h.text }),
    /* @__PURE__ */ i.jsxs("div", { className: "sched-list", children: [
      f.length === 0 && /* @__PURE__ */ i.jsxs("p", { className: "muted sched-empty", children: [
        "Nothing scheduled on ",
        v[0].toUpperCase() + v.slice(1),
        " yet."
      ] }),
      f.map((E, M) => {
        var ne;
        const F = ((ne = f[M + 1]) == null ? void 0 : ne.time) ?? (ot ? `${ot} (${zn(bt)})` : "00:00"), ae = Ct(E);
        return /* @__PURE__ */ i.jsxs("button", { className: "slot", onClick: () => I(M), children: [
          /* @__PURE__ */ i.jsx(
            "span",
            {
              className: `slot-badge ${ae ? "off" : ""}`,
              style: ae ? void 0 : { borderColor: w ? "var(--hl-brand)" : jp(E.setpoint, j, r) },
              children: ae ? /* @__PURE__ */ i.jsx(T, { name: w ? "power" : "snowflake" }) : w ? "On" : `${E.setpoint}°`
            }
          ),
          /* @__PURE__ */ i.jsxs("span", { className: "slot-time", children: [
            E.time,
            " – ",
            F
          ] }),
          /* @__PURE__ */ i.jsx(T, { name: "chevron-right", className: "slot-chev" })
        ] }, M);
      }),
      /* @__PURE__ */ i.jsxs("button", { className: "slot slot-add", onClick: () => {
        C(), I(f.length);
      }, disabled: f.length >= x, children: [
        /* @__PURE__ */ i.jsx("span", { className: "slot-badge add", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) }),
        /* @__PURE__ */ i.jsx("span", { className: "slot-time", children: f.length >= x ? `${x} times a day at most` : "Add a time" })
      ] })
    ] }),
    _ && /* @__PURE__ */ i.jsxs("div", { className: "sched-save", children: [
      /* @__PURE__ */ i.jsx(T, { name: "pencil-outline", className: "sched-save-icon" }),
      /* @__PURE__ */ i.jsx("span", { className: "sched-changed", title: `Changed: ${xe.map(zn).join(", ")}`, children: "Unsaved changes" }),
      /* @__PURE__ */ i.jsx("button", { className: "sched-undo", onClick: () => {
        a(u), I(null);
      }, children: "Undo" }),
      /* @__PURE__ */ i.jsx("button", { className: "sched-write", onClick: d, disabled: h.kind === "busy", children: "Save" })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: `fab-wrap ${_ ? "raised" : ""}`, children: [
      R && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx("div", { className: "fab-backdrop", onClick: () => J(!1) }),
        /* @__PURE__ */ i.jsxs("div", { className: "fab-menu", role: "menu", children: [
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            J(!1), p();
          }, disabled: h.kind === "busy", children: [
            /* @__PURE__ */ i.jsx(T, { name: "download" }),
            " Read from the receiver"
          ] }),
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            J(!1), $(xp);
          }, disabled: !f.length, children: [
            /* @__PURE__ */ i.jsx(T, { name: "content-copy" }),
            " Copy ",
            zn(v),
            " to weekdays"
          ] }),
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            J(!1), $(yp);
          }, disabled: !f.length, children: [
            /* @__PURE__ */ i.jsx(T, { name: "content-copy" }),
            " Copy ",
            zn(v),
            " to the weekend"
          ] }),
          /* @__PURE__ */ i.jsxs("button", { role: "menuitem", onClick: () => {
            J(!1), $([...Et]);
          }, disabled: !f.length, children: [
            /* @__PURE__ */ i.jsx(T, { name: "content-copy" }),
            " Copy ",
            zn(v),
            " to every day"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("button", { className: "fab", "aria-label": "More", "aria-expanded": R, onClick: () => J(!R), children: /* @__PURE__ */ i.jsx(T, { name: R ? "close" : "dots-horizontal" }) })
    ] }),
    P != null && f[P] && /* @__PURE__ */ i.jsx(
      Sp,
      {
        slot: f[P],
        dayName: v[0].toUpperCase() + v.slice(1),
        isWater: w,
        limits: r,
        canDelete: !0,
        onChange: (E) => k(f.map((M, F) => F === P ? E : M)),
        onDelete: () => {
          k(f.filter((E, M) => M !== P)), I(null);
        },
        onClose: () => I(null)
      }
    )
  ] });
}
function kp(e, t) {
  const n = new Set(e.map((l) => Vr(l.time)));
  let r = Math.min(t, 23 * 60 + 30);
  for (; n.has(r) && r < 1439; ) r += 15;
  return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function jp(e, t, n) {
  if (e <= n.heat_min) return "var(--hl-off-fill)";
  const r = Math.min(1, Math.max(0, (e - t.lo) / Math.max(1, t.hi - t.lo)));
  return `hsl(${Math.round(42 - 34 * r)} ${Math.round(88 + 4 * r)}% ${Math.round(64 - 14 * r)}%)`;
}
function Sp({
  slot: e,
  dayName: t,
  isWater: n,
  limits: r,
  canDelete: l,
  onChange: o,
  onDelete: s,
  onClose: a
}) {
  N.useEffect(() => {
    const m = (h) => h.key === "Escape" && a();
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [a]);
  const u = n ? e.setpoint < r.water_on : e.setpoint <= r.heat_min, c = (m) => Math.min(r.heat_max, Math.max(5, Math.round(m * 2) / 2)), v = u ? 20 : e.setpoint;
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
        /* @__PURE__ */ i.jsx("button", { className: u ? "" : "on", onClick: () => o({ ...e, setpoint: n ? r.water_on : v }), children: n ? "On" : "Heat to" }),
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
const sa = [
  { id: 1, label: "D", name: "Day" },
  { id: 7, label: "W", name: "Week" },
  { id: 30, label: "M", name: "Month" }
], Np = 5 * 6e4, Qr = (e) => {
  const t = Math.round(e);
  return t < 60 ? `${t}m` : t % 60 ? `${Math.floor(t / 60)}h ${t % 60}m` : `${t / 60}h`;
}, Xi = (e, t, n = 2) => {
  try {
    return e.toLocaleString([], { style: "currency", currency: t, maximumFractionDigits: n, minimumFractionDigits: 2 });
  } catch {
    return `${e.toFixed(n)} ${t}`;
  }
}, ei = (e, t) => Xi(e, t, 4), ti = (e, t) => new Date(e * 1e3).toLocaleDateString([], t), _p = (e) => new Date(e * 1e3).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
function bp(e, t, n) {
  if (n === 1) return ti(e, { weekday: "short", day: "numeric", month: "short" });
  const r = t - 86400, l = new Date(e * 1e3), o = new Date(r * 1e3), s = (a) => a.toLocaleDateString([], { month: "short" });
  return l.getMonth() === o.getMonth() ? `${l.getDate()}–${o.getDate()} ${s(o)}` : `${l.getDate()} ${s(l)} – ${o.getDate()} ${s(o)}`;
}
const aa = (e) => e.filter((t) => t != null);
function Cp(e) {
  if (e.period === 1) {
    const t = [];
    for (let n = 0; n < e.series.length; n += 4) {
      const r = e.series.slice(n, n + 4).filter((s) => s.heating != null);
      if (!r.length) continue;
      const l = aa(r.map((s) => s.current)), o = aa(e.series.slice(n, n + 4).map((s) => s.outdoor));
      t.push({
        key: e.series[n].t,
        label: [_p(e.series[n].t), ""],
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
    label: [ti(t.start, { weekday: "short" }), ti(t.start, { day: "numeric" })],
    minutes: t.heating_minutes,
    avg: t.temp_avg,
    min: t.temp_min,
    max: t.temp_max,
    outMin: t.outdoor_min,
    outMax: t.outdoor_max
  })).reverse();
}
function Cc({ getHass: e, devices: t, channel: n }) {
  var I;
  const [r, l] = N.useState((I = t[0]) == null ? void 0 : I.entry_id), o = t.find((R) => R.entry_id === r) ?? t[0], s = n ?? "heat", [a, u] = N.useState(7), [c, v] = N.useState("time"), [m, h] = N.useState(0), [g, y] = N.useState(null), [w, _] = N.useState(""), [p, d] = N.useState(!0), f = s === "water", x = N.useCallback(() => {
    o && e().callWS({ type: "hive_local/stats", entry_id: o.entry_id, channel: s, days: a, offset: m }).then((R) => {
      y(R), _("");
    }).catch((R) => {
      cp(R) || _(me(R));
    }).finally(() => d(!1));
  }, [e, o, s, a, m]);
  if (N.useEffect(() => {
    var J;
    const R = e().connection;
    return (J = R.addEventListener) == null || J.call(R, "ready", x), () => {
      var xe;
      return (xe = R.removeEventListener) == null ? void 0 : xe.call(R, "ready", x);
    };
  }, [e, x]), N.useEffect(() => {
    if (d(!0), x(), m) return;
    const R = setInterval(x, Np);
    return () => clearInterval(R);
  }, [x, m]), !o) return null;
  const k = g && g.period === a && g.offset === m ? g : null, C = k ? Cp(k) : [], $ = a === 1 ? "hour" : "day", j = !f && !!(k != null && k.outdoor), S = f ? null : (k == null ? void 0 : k.cost) ?? null, P = f || c === "cost" && !S && k ? "time" : c;
  return /* @__PURE__ */ i.jsxs("div", { className: "history", children: [
    !n && /* @__PURE__ */ i.jsx("h2", { className: "history-title", children: "Heating history" }),
    !n && t.length > 1 && /* @__PURE__ */ i.jsx("div", { className: "history-tabs", role: "tablist", children: t.map((R) => /* @__PURE__ */ i.jsx("button", { role: "tab", "aria-selected": R.entry_id === o.entry_id, className: R.entry_id === o.entry_id ? "on" : "", onClick: () => {
      l(R.entry_id), h(0);
    }, children: R.name }, R.entry_id)) }),
    /* @__PURE__ */ i.jsxs("div", { className: "history-controls", children: [
      /* @__PURE__ */ i.jsx("div", { className: "history-toggle", role: "radiogroup", "aria-label": "Period", children: sa.map((R) => /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": R.id === a, "aria-label": R.name, title: R.name, className: R.id === a ? "on" : "", onClick: () => {
        u(R.id), h(0);
      }, children: R.label }, R.id)) }),
      !f && /* @__PURE__ */ i.jsxs("div", { className: "history-toggle", role: "radiogroup", "aria-label": "Show", children: [
        /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": P === "time", title: "Time on", "aria-label": "Time on", className: `wide ${P === "time" ? "on" : ""}`, onClick: () => v("time"), children: /* @__PURE__ */ i.jsx(T, { name: "clock-outline" }) }),
        /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": P === "temp", title: "Temperature", "aria-label": "Temperature", className: `wide ${P === "temp" ? "on" : ""}`, onClick: () => v("temp"), children: /* @__PURE__ */ i.jsx(T, { name: "thermometer" }) }),
        (S || c === "cost") && /* @__PURE__ */ i.jsx("button", { role: "radio", "aria-checked": P === "cost", title: "Estimated cost", "aria-label": "Estimated cost", className: `wide ${P === "cost" ? "on" : ""}`, onClick: () => v("cost"), children: /* @__PURE__ */ i.jsx(T, { name: "cash" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "history-date", children: [
      /* @__PURE__ */ i.jsx("button", { className: "round ghost", onClick: () => h(m + 1), "aria-label": "Earlier", children: /* @__PURE__ */ i.jsx(T, { name: "chevron-left" }) }),
      /* @__PURE__ */ i.jsxs("span", { className: "history-range", children: [
        /* @__PURE__ */ i.jsx(T, { name: "calendar-blank-outline" }),
        " ",
        k ? bp(k.start, k.period_end, a) : "…"
      ] }),
      /* @__PURE__ */ i.jsx("button", { className: "round ghost", onClick: () => h(Math.max(0, m - 1)), disabled: m === 0, "aria-label": "Later", children: /* @__PURE__ */ i.jsx(T, { name: "chevron-right" }) })
    ] }),
    w && /* @__PURE__ */ i.jsx("div", { className: "status error", children: w }),
    p && !k && /* @__PURE__ */ i.jsx("p", { className: "muted history-empty", children: "Loading…" }),
    k && !k.has_data && /* @__PURE__ */ i.jsxs("p", { className: "muted history-empty", children: [
      "No history for this ",
      sa.find((R) => R.id === a).name.toLowerCase(),
      ". Home Assistant keeps 10 days unless",
      " ",
      /* @__PURE__ */ i.jsx("code", { children: "purge_keep_days" }),
      " is raised."
    ] }),
    (k == null ? void 0 : k.has_data) && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx(zp, { data: k, metric: P, water: f, units: $, rows: C, cost: S }),
      /* @__PURE__ */ i.jsxs("div", { className: "history-rows", children: [
        C.length > 0 && !f && /* @__PURE__ */ i.jsxs("div", { className: `history-key muted small ${j ? "with-outdoor" : ""}`, children: [
          j && /* @__PURE__ */ i.jsxs("span", { title: "Outside temperature", children: [
            /* @__PURE__ */ i.jsx(T, { name: "weather-partly-cloudy" }),
            " Outside"
          ] }),
          /* @__PURE__ */ i.jsxs("span", { title: "Lowest and highest room temperature", children: [
            /* @__PURE__ */ i.jsx(T, { name: "thermometer" }),
            " Low · high"
          ] })
        ] }),
        C.map((R) => /* @__PURE__ */ i.jsx($p, { row: R, metric: P, water: f, outdoor: j, cost: S, scale: Ep(C, P, a) }, R.key))
      ] }),
      P === "cost" && S && /* @__PURE__ */ i.jsxs("p", { className: "history-hint muted small", children: [
        "An estimate: the boiler's time on × ",
        S.kw.toFixed(1),
        " kW × ",
        ei(S.price, S.currency),
        " per kWh, at today's price.",
        " ",
        S.basis === "meter" ? "The kW is the boiler's average while on, learned from your gas meter." : `The kW is 40% of the boiler's ${S.boiler_kw ?? "?"} kW rating, as a modulating boiler rarely runs flat out. Pick a gas meter in Settings for a closer figure.`
      ] }),
      !f && k.outdoor_entity == null && /* @__PURE__ */ i.jsx("p", { className: "history-hint muted small", children: "To see the temperature outside here, pick a weather entity or outdoor sensor in the Settings tab." })
    ] })
  ] });
}
function Ep(e, t, n) {
  if (t === "time" || t === "cost") return { lo: 0, hi: Math.max(60, ...e.map((s) => s.minutes ?? 0)) };
  const r = e.map((s) => s.avg).filter((s) => s != null), l = r.length ? Math.floor(Math.min(...r)) - 2 : 10, o = r.length ? Math.ceil(Math.max(...r)) : 25;
  return { lo: l, hi: Math.max(o, l + 4) };
}
function zp({ data: e, metric: t, water: n, units: r, rows: l, cost: o }) {
  const s = Math.max(1, l.filter((_) => _.minutes != null).length), a = e.previous, u = !!(a != null && a.has_data) && a.known_minutes >= 0.5 * e.known_minutes, c = u ? e.heating_minutes - a.heating_minutes : 0, v = e.temperature, m = (_) => o ? Xi(_ / 60 * o.per_hour, o.currency) : "–", [h, g, y, w] = t === "cost" ? ["Estimated cost", m(e.heating_minutes), `Average per ${r}`, m(e.heating_minutes / s)] : t === "time" ? [n ? "Hot water on" : "Boiler on", Qr(e.heating_minutes), `Average per ${r}`, Qr(e.heating_minutes / s)] : ["Average", v.avg != null ? `${v.avg.toFixed(1)}°` : "–", "Lowest – highest", v.min != null && v.max != null ? `${v.min.toFixed(1)}–${v.max.toFixed(1)}°` : "–"];
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs("div", { className: "history-summary", children: [
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("span", { className: "muted", children: h }),
        /* @__PURE__ */ i.jsx("b", { children: g })
      ] }),
      /* @__PURE__ */ i.jsx("i", {}),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("span", { className: "muted", children: y }),
        /* @__PURE__ */ i.jsx("b", { children: w })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("p", { className: "history-note muted small", children: [
      t === "time" && u && (Math.abs(c) < 1 ? "Same as the period before · " : `${Qr(Math.abs(c))} ${c > 0 ? "more" : "less"} than the period before · `),
      t === "cost" && o && u && (Math.abs(c) < 1 ? "Same as the period before · " : `${m(Math.abs(c))} ${c > 0 ? "more" : "less"} than the period before · `),
      "Fired up ",
      e.cycles,
      " time",
      e.cycles === 1 ? "" : "s",
      e.boosts ? ` · ${e.boosts} boost${e.boosts === 1 ? "" : "s"}` : "",
      t === "temp" && e.target_avg != null ? ` · average target ${e.target_avg.toFixed(1)}°` : "",
      !n && Pp(e)
    ] })
  ] });
}
function Pp(e) {
  var o, s;
  const t = (o = e.outdoor) == null ? void 0 : o.avg;
  if (t == null) return "";
  const n = (s = e.previous) == null ? void 0 : s.outdoor_avg, r = n != null ? t - n : null, l = r == null ? "" : Math.abs(r) < 0.5 ? ", about the same as the period before" : `, ${Math.abs(r).toFixed(0)}° ${r < 0 ? "colder" : "milder"} than the period before`;
  return ` · ${t.toFixed(0)}° outside${l}`;
}
function Tp(e, t) {
  if (e == null || t == null) return "–";
  const [n, r] = [e.toFixed(0), t.toFixed(0)];
  return n === r ? `${n}°` : `${n}–${r}°`;
}
function $p({ row: e, metric: t, water: n, outdoor: r, cost: l, scale: o }) {
  const s = t === "temp" ? e.avg : e.minutes, a = s == null ? "–" : t === "time" ? Qr(s) : t === "cost" && l ? Xi(s / 60 * l.per_hour, l.currency) : `${s.toFixed(1)}°`, u = s == null ? 0 : Math.max(0.02, Math.min(1, (s - o.lo) / (o.hi - o.lo || 1)));
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
    r && /* @__PURE__ */ i.jsx("span", { className: "history-outdoor", title: "Lowest and highest outside temperature", children: Tp(e.outMin, e.outMax) }),
    !n && /* @__PURE__ */ i.jsxs("span", { className: "history-temps", title: "Lowest and highest room temperature", children: [
      e.min != null ? `${e.min.toFixed(0)}°` : "–",
      /* @__PURE__ */ i.jsx("span", { children: e.max != null ? `${e.max.toFixed(0)}°` : "–" })
    ] })
  ] });
}
const Lp = [
  { id: "control", label: "Control" },
  { id: "schedule", label: "Schedule" },
  { id: "history", label: "History" }
];
function Mp({
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
  var g, y;
  const [c, v] = N.useState(s === "schedule");
  N.useEffect(() => {
    s === "schedule" && v(!0);
  }, [s]);
  const m = r == null ? void 0 : r.status, h = [
    o ? t.name : null,
    m ? m.mode === "schedule" ? "On schedule" : m.mode === "boost" ? (g = r == null ? void 0 : r.preheat) != null && g.active_for ? `Pre-heating for ${r.preheat.active_for}` : "Boosting" : m.mode === "off" ? "Off" : n === "water" ? "Always on" : "Manual" : "Waiting for the receiver"
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ i.jsxs("div", { className: "device-page", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "page-head", children: [
      /* @__PURE__ */ i.jsx("button", { className: "round ghost", onClick: u, "aria-label": "Back to the overview", children: /* @__PURE__ */ i.jsx(T, { name: "chevron-left" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "page-title", children: [
        /* @__PURE__ */ i.jsx("h2", { children: Wn[n] }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: h })
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "page-tabs", role: "tablist", children: Lp.map((w) => /* @__PURE__ */ i.jsx("button", { role: "tab", "aria-selected": w.id === s, className: w.id === s ? "on" : "", onClick: () => a(w.id), children: w.label }, w.id)) }),
    s === "control" && /* @__PURE__ */ i.jsx(bc, { getHass: e, device: t, channel: n, info: r, showDevice: !1, limits: l, page: !0 }),
    s === "control" && n === "heat" && (r == null ? void 0 : r.preheat) && /* @__PURE__ */ i.jsx(vp, { getHass: e, device: t, info: r.preheat }),
    c && /* @__PURE__ */ i.jsx("div", { hidden: s !== "schedule", children: /* @__PURE__ */ i.jsx(wp, { getHass: e, device: t, channel: n, limits: l, mode: (m == null ? void 0 : m.mode) ?? null, preheatFor: (m == null ? void 0 : m.mode) === "boost" ? ((y = r == null ? void 0 : r.preheat) == null ? void 0 : y.active_for) ?? null : null }) }),
    s === "history" && /* @__PURE__ */ i.jsx(Cc, { getHass: e, devices: [t], channel: n })
  ] });
}
const Rp = 20, Op = 6e4;
function Fp({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onOpenDevice: l
}) {
  const [o, s] = N.useState(null), [a, u] = N.useState(""), [c, v] = N.useState(!1), m = N.useCallback(() => {
    e().callWS({ type: "hive_local/rooms/valves" }).then((g) => s(g.valves)).catch((g) => u(me(g)));
  }, [e]);
  N.useEffect(() => {
    m();
    const g = setInterval(m, Op);
    return () => clearInterval(g);
  }, [m]);
  const h = t.length > 1;
  return /* @__PURE__ */ i.jsxs("div", { className: "stack devices-page", children: [
    /* @__PURE__ */ i.jsx("h2", { className: "history-title", children: "Devices" }),
    a && /* @__PURE__ */ i.jsx("div", { className: "status error", children: a }),
    /* @__PURE__ */ i.jsxs("div", { className: "device-grid", children: [
      t.map((g) => /* @__PURE__ */ i.jsx(Ip, { device: g, status: n, onOpen: (y) => l(g.entry_id, y) }, g.entry_id)),
      o == null ? void 0 : o.map((g) => /* @__PURE__ */ i.jsx(Ap, { valve: g }, g.entity_id))
    ] }),
    o && !o.length && /* @__PURE__ */ i.jsx("p", { className: "muted", children: "No Hive radiator valves yet. Pair them with ZHA or Zigbee2MQTT and they'll show up here." }),
    h && /* @__PURE__ */ i.jsx("p", { className: "muted small", children: "Each receiver is a heating zone." }),
    /* @__PURE__ */ i.jsx("div", { className: "fab-wrap", children: /* @__PURE__ */ i.jsx("button", { className: "fab", "aria-label": "Add a device", onClick: () => v(!0), children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) }) }),
    c && /* @__PURE__ */ i.jsx(Up, { onClose: () => v(!1) })
  ] });
}
const Dp = { z2m: "Zigbee2MQTT", zha: "ZHA" };
function Ec({ items: e }) {
  return /* @__PURE__ */ i.jsx("div", { className: "facts", children: e.map((t) => /* @__PURE__ */ i.jsxs("span", { className: `fact ${t.warn ? "warn" : ""}`, children: [
    /* @__PURE__ */ i.jsx(T, { name: t.icon }),
    " ",
    t.text
  ] }, t.text)) });
}
function zc({ online: e, text: t }) {
  return /* @__PURE__ */ i.jsxs("span", { className: `online ${e ? "" : "no"}`, children: [
    /* @__PURE__ */ i.jsx("i", {}),
    t ?? (e ? "Online" : "Not responding")
  ] });
}
function Ip({ device: e, status: t, onOpen: n }) {
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
      /* @__PURE__ */ i.jsx(zc, { online: r, text: r ? "Online" : "Waiting" })
    ] }),
    /* @__PURE__ */ i.jsx(
      Ec,
      {
        items: [
          { icon: "zigbee", text: Dp[e.transport ?? "z2m"] },
          { icon: "fire", text: e.channels.includes("water") ? "Heating and hot water" : "Heating only" }
        ]
      }
    ),
    /* @__PURE__ */ i.jsx("div", { className: "hw-links", children: e.channels.map((l) => /* @__PURE__ */ i.jsxs("button", { className: "hw-link", onClick: () => n(l), children: [
      Wn[l],
      " ",
      /* @__PURE__ */ i.jsx(T, { name: "chevron-right" })
    ] }, l)) })
  ] });
}
function Ap({ valve: e }) {
  const t = e.battery != null && !Number.isNaN(Number(e.battery)) ? Number(e.battery) : null, n = t != null && t < Rp;
  return /* @__PURE__ */ i.jsxs("section", { className: `card hw ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ i.jsxs("div", { className: "hw-head", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "thermostat" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "device-name", children: [
        /* @__PURE__ */ i.jsx("span", { children: e.name }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "Hive radiator valve" })
      ] }),
      /* @__PURE__ */ i.jsx(zc, { online: e.available })
    ] }),
    /* @__PURE__ */ i.jsx(
      Ec,
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
function Up({ onClose: e }) {
  const [t, n] = N.useState(!1);
  N.useEffect(() => {
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
const Pc = 20, vl = (e) => e == null ? "–" : `${e.toFixed(1)}°`;
function Bp({ valve: e, heating: t }) {
  const n = e.battery == null ? null : Number(e.battery), r = n != null && !Number.isNaN(n) && n <= Pc;
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
const Wp = 8;
function Hp({ getHass: e, valves: t, info: n, roomName: r, thisRoom: l, chosen: o, onToggle: s }) {
  const [a, u] = N.useState(null), [c, v] = N.useState(null), m = N.useRef();
  N.useEffect(() => () => window.clearTimeout(m.current), []);
  const [h, g] = N.useState(""), y = t.length > Wp, w = h.trim().toLowerCase(), _ = r.trim().toLowerCase(), p = (j) => !!_ && (j.area ?? "").toLowerCase() === _, d = (j) => {
    var P;
    const S = (P = n.get(j.entity_id)) == null ? void 0 : P.room;
    return S && S !== l ? S : null;
  }, [f] = N.useState(() => new Set(o)), x = (j) => f.has(j.entity_id) ? 0 : p(j) ? 1 : d(j) ? 3 : 2, k = [...t].sort((j, S) => x(j) - x(S)), C = w ? k.filter((j) => j.name.toLowerCase().includes(w) || (j.area ?? "").toLowerCase().includes(w)) : k, $ = async (j) => {
    v(null), u(j.entity_id);
    try {
      await e().callWS({ type: "hive_local/rooms/identify", entity_id: j.entity_id }), v({ kind: "ok", text: `${j.name} is flashing its light.` }), window.clearTimeout(m.current), m.current = window.setTimeout(() => {
        u(null), v(null);
      }, 1e4);
    } catch (S) {
      u(null), v({ kind: "error", text: me(S) });
    }
  };
  return t.length ? /* @__PURE__ */ i.jsxs("div", { className: "valve-picker", children: [
    y && /* @__PURE__ */ i.jsxs("label", { className: "valve-search", children: [
      /* @__PURE__ */ i.jsx(T, { name: "magnify" }),
      /* @__PURE__ */ i.jsx("input", { type: "search", value: h, placeholder: "Search valves or areas", "aria-label": "Search valves or areas", onChange: (j) => g(j.target.value) }),
      h && /* @__PURE__ */ i.jsx("button", { type: "button", className: "ghost round", "aria-label": "Clear the search", onClick: () => g(""), children: /* @__PURE__ */ i.jsx(T, { name: "close" }) })
    ] }),
    !C.length && w && /* @__PURE__ */ i.jsxs("span", { className: "muted small", children: [
      'No valves match "',
      h.trim(),
      '".'
    ] }),
    C.length > 0 && /* @__PURE__ */ i.jsx("div", { className: "valve-list", children: C.map((j) => {
      const S = n.get(j.entity_id), P = o.has(j.entity_id), I = (S == null ? void 0 : S.battery) == null ? null : Number(S.battery), R = I != null && !Number.isNaN(I), J = R && I <= Pc, xe = d(j);
      return /* @__PURE__ */ i.jsxs("div", { className: `valve-pick ${P ? "on" : ""}`, children: [
        /* @__PURE__ */ i.jsxs("button", { type: "button", role: "checkbox", "aria-checked": P, className: "valve-pick-main", onClick: () => s(j.entity_id), children: [
          /* @__PURE__ */ i.jsx("span", { className: `valve-check ${P ? "on" : ""}`, "aria-hidden": "true", children: P && /* @__PURE__ */ i.jsx(T, { name: "check" }) }),
          /* @__PURE__ */ i.jsxs("span", { className: "valve-pick-text", children: [
            /* @__PURE__ */ i.jsx("span", { children: j.name }),
            /* @__PURE__ */ i.jsx("span", { className: "muted small", children: [j.area ?? "No area", xe ? `in ${xe}` : null].filter(Boolean).join(" · ") })
          ] }),
          /* @__PURE__ */ i.jsx("span", { className: "valve-pick-read small", children: S && !S.available ? "Not responding" : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
            (S == null ? void 0 : S.current_temperature) != null ? `${S.current_temperature.toFixed(1)}°` : "",
            R && /* @__PURE__ */ i.jsxs("span", { className: J ? "warn" : "", children: [
              (S == null ? void 0 : S.current_temperature) != null ? " · " : "",
              Math.round(I),
              "%"
            ] })
          ] }) })
        ] }),
        (S == null ? void 0 : S.identify) && /* @__PURE__ */ i.jsxs("button", { type: "button", className: `valve-find ${a === j.entity_id ? "on" : ""}`, onClick: () => $(j), disabled: a === j.entity_id, "aria-label": `Find ${j.name}: flash its light`, children: [
          /* @__PURE__ */ i.jsx(T, { name: "lightbulb-on-outline" }),
          " ",
          /* @__PURE__ */ i.jsx("span", { className: "valve-find-label", children: a === j.entity_id ? "Flashing" : "Find" })
        ] })
      ] }, j.entity_id);
    }) }),
    c && /* @__PURE__ */ i.jsx("div", { className: `status ${c.kind} small`, children: c.text })
  ] }) : null;
}
function Tc({ dialog: e, label: t, onClose: n, children: r }) {
  return e ? /* @__PURE__ */ i.jsx("div", { className: "sheet-backdrop", onClick: (l) => {
    l.stopPropagation(), n();
  }, children: /* @__PURE__ */ i.jsxs("div", { className: "sheet room-sheet room-editor", role: "dialog", "aria-modal": "true", "aria-label": t, onClick: (l) => l.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx("span", { className: "sheet-handle" }),
    r
  ] }) }) : /* @__PURE__ */ i.jsx("section", { className: "card room-editor", children: r });
}
function Vp(e) {
  return /* @__PURE__ */ i.jsx($c, { ...e, dialog: !0 });
}
function $c({ getHass: e, room: t, onDone: n, dialog: r }) {
  N.useEffect(() => {
    if (!r) return;
    const S = (P) => P.key === "Escape" && n();
    return window.addEventListener("keydown", S), () => window.removeEventListener("keydown", S);
  }, [r, n]);
  const [l, o] = N.useState(null), [s, a] = N.useState((t == null ? void 0 : t.receiver) ?? ""), [u, c] = N.useState((t == null ? void 0 : t.name) ?? ""), [v, m] = N.useState(new Set((t == null ? void 0 : t.valves) ?? [])), [h, g] = N.useState((t == null ? void 0 : t.sensor) ?? ""), [y, w] = N.useState(!1), [_, p] = N.useState(!1), [d, f] = N.useState(""), [x, k] = N.useState(/* @__PURE__ */ new Map());
  N.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/candidates" }).then(o).catch((S) => f(me(S))), e().callWS({ type: "hive_local/rooms/valves" }).then((S) => k(new Map(S.valves.map((P) => [P.entity_id, P])))).catch(() => {
    });
  }, [e]);
  const C = ((l == null ? void 0 : l.receivers.length) ?? 0) > 1, $ = async (S) => {
    w(!0), f("");
    try {
      await e().callWS(S), n();
    } catch (P) {
      f(me(P)), w(!1);
    }
  }, j = (S) => m((P) => {
    const I = new Set(P);
    return I.has(S) ? I.delete(S) : I.add(S), I;
  });
  return /* @__PURE__ */ i.jsxs(Tc, { dialog: !!r, label: t ? `Edit ${t.name}` : "New room", onClose: n, children: [
    /* @__PURE__ */ i.jsx("h2", { children: t ? `Edit ${t.name}` : "New room" }),
    /* @__PURE__ */ i.jsxs(
      "form",
      {
        className: "stack",
        onSubmit: (S) => {
          S.preventDefault(), $({
            type: "hive_local/rooms/save",
            ...t ? { room_id: t.id } : {},
            name: u,
            valves: [...v],
            sensor: h || null,
            receiver: s || null
          });
        },
        children: [
          /* @__PURE__ */ i.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ i.jsx("span", { children: "Name" }),
            /* @__PURE__ */ i.jsx("input", { id: `room-name-${(t == null ? void 0 : t.id) ?? "new"}`, type: "text", value: u, maxLength: 40, placeholder: "Lounge", onChange: (S) => c(S.target.value) })
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
            /* @__PURE__ */ i.jsx(Hp, { getHass: e, valves: (l == null ? void 0 : l.valves) ?? [], info: x, roomName: u, thisRoom: (t == null ? void 0 : t.name) ?? null, chosen: v, onToggle: j })
          ] }),
          /* @__PURE__ */ i.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ i.jsx("span", { children: "Room temperature from" }),
            /* @__PURE__ */ i.jsxs("select", { id: `room-sensor-${(t == null ? void 0 : t.id) ?? "new"}`, value: h, onChange: (S) => g(S.target.value), children: [
              /* @__PURE__ */ i.jsx("option", { value: "", children: "The valves (their average)" }),
              ((l == null ? void 0 : l.sensors) ?? []).map((S) => /* @__PURE__ */ i.jsxs("option", { value: S.entity_id, children: [
                S.name,
                S.area ? ` · ${S.area}` : ""
              ] }, S.entity_id))
            ] })
          ] }),
          C && /* @__PURE__ */ i.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ i.jsx("span", { children: "Heated by" }),
            /* @__PURE__ */ i.jsxs("select", { id: `room-receiver-${(t == null ? void 0 : t.id) ?? "new"}`, value: s, onChange: (S) => a(S.target.value), children: [
              /* @__PURE__ */ i.jsx("option", { value: "", disabled: !0, children: "Choose the receiver for this room's radiators" }),
              l.receivers.map((S) => /* @__PURE__ */ i.jsx("option", { value: S.entry_id, children: S.name }, S.entry_id))
            ] })
          ] }),
          d && /* @__PURE__ */ i.jsx("div", { className: "status error", children: d }),
          /* @__PURE__ */ i.jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ i.jsx("button", { className: "primary", type: "submit", disabled: y || !u.trim() || !v.size || C && !s, children: t ? "Save" : "Add room" }),
            /* @__PURE__ */ i.jsx("button", { type: "button", className: "ghost", onClick: n, disabled: y, children: "Cancel" }),
            /* @__PURE__ */ i.jsx("span", { className: "spacer" }),
            t && (_ ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
              /* @__PURE__ */ i.jsxs("span", { className: "muted small", children: [
                "Delete ",
                t.name,
                "? The valves aren't changed."
              ] }),
              /* @__PURE__ */ i.jsx("button", { type: "button", className: "danger", disabled: y, onClick: () => $({ type: "hive_local/rooms/delete", room_id: t.id }), children: "Delete" }),
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
function Qp({ getHass: e, roomId: t, several: n, onClose: r }) {
  var p;
  const [l, o] = N.useState(null), [s, a] = N.useState(!1), [u, c] = N.useState(null), [v, m] = N.useState(""), h = N.useRef();
  if (N.useEffect(() => {
    const d = e().connection.subscribeMessage(
      (f) => o(f.rooms.find((x) => x.id === t) ?? null),
      { type: "hive_local/rooms/subscribe" }
    );
    return () => {
      d.then((f) => f()).catch(() => {
      });
    };
  }, [e, t]), N.useEffect(() => {
    if (s) return;
    const d = (f) => f.key === "Escape" && r();
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, [r, s]), !l) return null;
  if (s) return /* @__PURE__ */ i.jsx($c, { getHass: e, room: l, onDone: () => a(!1), dialog: !0 });
  const g = u ?? l.target ?? ((p = l.target_range) == null ? void 0 : p[1]) ?? 20, y = (d) => {
    const f = Math.min(35, Math.max(5, d));
    c(f), m(""), window.clearTimeout(h.current), h.current = window.setTimeout(async () => {
      try {
        const x = await e().callWS({ type: "hive_local/rooms/set_target", room_id: l.id, temperature: f });
        if (x.failed.length) {
          const k = l.valve_states.filter((C) => x.failed.includes(C.entity_id)).map((C) => C.name);
          m(`Didn't take on ${k.join(", ")}. It may be asleep; try again shortly.`);
        }
      } catch (x) {
        m(me(x));
      } finally {
        c(null);
      }
    }, 700);
  }, w = `${l.valves.length} valve${l.valves.length === 1 ? "" : "s"}`, _ = l.temperature_source === "sensor" ? l.sensor_name : l.temperature_source === "valves" ? "Average of the valves" : "No reading";
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
        /* @__PURE__ */ i.jsx("span", { className: "muted", children: _ })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: l.target_range && u == null ? `Target (valves set to ${vl(l.target_range[0])}–${vl(l.target_range[1])})` : "Target" }),
      /* @__PURE__ */ i.jsxs("div", { className: "sheet-temp", children: [
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => y(g - 0.5), "aria-label": "Lower", children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
        /* @__PURE__ */ i.jsxs("span", { className: "sheet-temp-value", children: [
          g.toFixed(1),
          "°"
        ] }),
        /* @__PURE__ */ i.jsx("button", { className: "round sheet-step", onClick: () => y(g + 0.5), "aria-label": "Raise", children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ i.jsx("span", { className: "sheet-label", children: "Valves" }),
      /* @__PURE__ */ i.jsx("ul", { className: "valves", children: l.valve_states.map((d) => /* @__PURE__ */ i.jsx(Bp, { valve: d, heating: l.heating_valves.includes(d.entity_id) }, d.entity_id)) })
    ] }),
    v && /* @__PURE__ */ i.jsx("div", { className: "status error", children: v }),
    /* @__PURE__ */ i.jsxs("div", { className: "room-sheet-actions", children: [
      /* @__PURE__ */ i.jsxs("button", { className: "ghost", onClick: () => a(!0), children: [
        /* @__PURE__ */ i.jsx(T, { name: "pencil-outline" }),
        " Edit room"
      ] }),
      /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: r, children: "Close" })
    ] })
  ] }) });
}
function Kp(e) {
  const t = e.toLowerCase();
  return /lounge|living|sitting|family|snug/.test(t) ? "sofa-outline" : /bed|nursery|guest/.test(t) ? "bed-outline" : /kitchen|dining/.test(t) ? "silverware-fork-knife" : /landing|hall|stair/.test(t) ? "stairs" : /study|office/.test(t) ? "desk" : /bath|shower|en-?suite|wc|toilet/.test(t) ? "shower" : "home-thermometer-outline";
}
function Yp({ getHass: e, onDone: t }) {
  const [n, r] = N.useState(null), [l, o] = N.useState(/* @__PURE__ */ new Map()), [s, a] = N.useState(/* @__PURE__ */ new Set()), [u, c] = N.useState({}), [v, m] = N.useState(!1), [h, g] = N.useState("");
  N.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/suggest" }).then((x) => {
      r(x), a(new Set(x.rooms.map((k, C) => C)));
    }).catch((x) => g(me(x))), e().callWS({ type: "hive_local/rooms/candidates" }).then((x) => o(new Map([...x.valves, ...x.sensors].map((k) => [k.entity_id, k.name])))).catch(() => {
    });
  }, [e]);
  const y = ((n == null ? void 0 : n.receivers.length) ?? 0) > 1, w = ((n == null ? void 0 : n.rooms) ?? []).map((x, k) => [x, k]).filter(([, x]) => s.has(x)), _ = w.length > 0 && (!y || w.every(([, x]) => u[x])), p = ((n == null ? void 0 : n.rooms) ?? []).reduce((x, k) => x + k.valves.length, 0), d = async () => {
    m(!0), g("");
    try {
      for (const [x, k] of w)
        await e().callWS({ type: "hive_local/rooms/save", name: x.name, valves: x.valves, sensor: x.sensor, receiver: u[k] ?? null });
      t();
    } catch (x) {
      g(me(x)), m(!1);
    }
  }, f = (x) => a((k) => {
    const C = new Set(k);
    return C.has(x) ? C.delete(x) : C.add(x), C;
  });
  return /* @__PURE__ */ i.jsxs(Tc, { dialog: !0, label: "Set up your rooms", onClose: t, children: [
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
        const C = s.has(k), $ = x.valves.map((S) => l.get(S) ?? S).join(", "), j = x.sensor ? `Temperature: ${l.get(x.sensor) ?? x.sensor}` : x.valves.length === 1 ? "Temperature: from the valve" : "Temperature: average of the valves";
        return /* @__PURE__ */ i.jsxs("div", { className: `setup-room ${C ? "on" : ""}`, children: [
          /* @__PURE__ */ i.jsxs("button", { type: "button", role: "checkbox", "aria-checked": C, className: "setup-room-main", onClick: () => f(k), children: [
            /* @__PURE__ */ i.jsx("span", { className: `valve-check ${C ? "on" : ""}`, "aria-hidden": "true", children: C && /* @__PURE__ */ i.jsx(T, { name: "check" }) }),
            /* @__PURE__ */ i.jsxs("span", { className: "setup-room-text", children: [
              /* @__PURE__ */ i.jsx("span", { children: x.name }),
              /* @__PURE__ */ i.jsx("span", { className: "muted small", children: $ }),
              /* @__PURE__ */ i.jsx("span", { className: "muted small", children: j })
            ] }),
            /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: Kp(x.name) }) })
          ] }),
          y && C && /* @__PURE__ */ i.jsxs("select", { "aria-label": `Which receiver heats ${x.name}`, value: u[k] ?? "", onChange: (S) => c((P) => ({ ...P, [k]: S.target.value })), children: [
            /* @__PURE__ */ i.jsx("option", { value: "", disabled: !0, children: "Heated by…" }),
            n.receivers.map((S) => /* @__PURE__ */ i.jsx("option", { value: S.entry_id, children: S.name }, S.entry_id))
          ] })
        ] }, x.name);
      }) })
    ] }),
    h && /* @__PURE__ */ i.jsx("div", { className: "status error", children: h }),
    n && n.rooms.length > 0 && /* @__PURE__ */ i.jsx("button", { className: "sheet-go", style: { "--hl-accent": "var(--hl-brand)" }, disabled: v || !_, onClick: d, children: v ? "Creating…" : `Create ${w.length} room${w.length === 1 ? "" : "s"}` }),
    /* @__PURE__ */ i.jsx("button", { className: "ghost sheet-cancel", onClick: t, disabled: v, children: n != null && n.rooms.length ? "I'll set them up myself" : "Close" })
  ] });
}
function Gp({ getHass: e, devices: t, status: n }) {
  const [r, l] = N.useState(null), [o, s] = N.useState("");
  N.useEffect(() => {
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
    r && /* @__PURE__ */ i.jsx(Xp, { data: r, save: a }),
    /* @__PURE__ */ i.jsx(Jp, { getHass: e }),
    t.map((c) => /* @__PURE__ */ i.jsxs("section", { className: "settings-section", children: [
      /* @__PURE__ */ i.jsx("h3", { children: t.length > 1 ? c.name : "Receiver" }),
      /* @__PURE__ */ i.jsx("div", { className: "settings-group", children: c.channels.map((v) => {
        var m;
        return /* @__PURE__ */ i.jsx(eh, { getHass: e, device: c, channel: v, info: (m = n[c.entry_id]) == null ? void 0 : m[v] }, v);
      }) })
    ] }, c.entry_id))
  ] });
}
const ua = [6, 9, 12, 15, 18, 20, 24, 25, 28, 30, 32, 35, 40, 45, 50];
function Xp({ data: e, save: t }) {
  const [n, r] = N.useState(null), l = N.useRef(null), o = N.useRef(), s = e.boiler_kw, a = (_) => {
    if (s == null) return t({ boiler_kw: 24 });
    const p = _ > 0 ? ua.find((d) => d > s) : [...ua].reverse().find((d) => d < s);
    t({ boiler_kw: p ?? s });
  }, u = Zp[e.currency], c = n ?? e.fixed_price, v = (_, p = 0) => {
    const d = l.current ?? e.fixed_price ?? 0.06, f = p > 15 ? 1e-3 : 1e-4, x = Math.max(0, Math.round((_ > 0 ? Math.floor(d / f + 1e-6) + 1 : Math.ceil(d / f - 1e-6) - 1) * f * 1e4) / 1e4);
    l.current = x, r(x), window.clearTimeout(o.current), o.current = window.setTimeout(() => {
      t({ price_source: "fixed", fixed_price: x }), l.current = null, r(null);
    }, 800);
  }, m = (_) => (
    // A fixed price starts from whatever price was in use, so it's a few taps from right.
    t(_ === "fixed" && e.fixed_price == null ? { price_source: _, fixed_price: e.price ?? 0.06 } : { price_source: _ || null })
  ), h = e.fit, g = e.gas_meter ? h ? `Learned ${h.kw.toFixed(1)} kW while heating from ${h.days} days${h.baseline >= 0.5 ? ` (plus ${h.baseline.toFixed(0)} kWh a day for hot water and cooking)` : ""}.` : e.learned_at ? "Not enough yet: it needs at least 4 days of readings with the heating on. Checked every 6 hours." : "Learning from the last 14 days…" : "Learns the boiler's real average output from your gas use. Hot water and cooking on the same meter are allowed for.", y = (_) => _ != null ? `${ei(_, e.currency)} per kWh` : null, w = e.price_source === "fixed" ? "Your unit rate, below." : e.price_source === "energy" && e.energy_price == null ? "The Energy dashboard has no gas price (or it can't be read)." : e.price_source && e.price_source !== "fixed" && e.price == null ? "That entity has no price right now." : y(e.price) ?? "Pick where the price comes from.";
  return /* @__PURE__ */ i.jsxs("section", { className: "settings-section", children: [
    /* @__PURE__ */ i.jsx("h3", { children: "Heating cost" }),
    /* @__PURE__ */ i.jsx("p", { className: "muted small settings-help", children: "An estimated cost in the heating history: the boiler's time on × its average output while on × the gas price. A modern boiler turns its flame down, so it averages well below its rating: a gas meter gives the real figure." }),
    /* @__PURE__ */ i.jsxs("div", { className: "settings-group", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "meter-gas-outline" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: "Gas meter" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: g })
        ] }),
        /* @__PURE__ */ i.jsxs("select", { "aria-label": "Gas meter", value: e.gas_meter ?? "", onChange: (_) => t({ gas_meter: _.target.value || null }), children: [
          /* @__PURE__ */ i.jsx("option", { value: "", children: "None" }),
          e.gas_meter_candidates.map((_) => /* @__PURE__ */ i.jsxs("option", { value: _.entity_id, children: [
            _.name,
            _.area ? ` · ${_.area}` : ""
          ] }, _.entity_id))
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "fire" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: "Boiler rating" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: e.output_basis === "meter" ? "Not needed while the gas meter gives the output." : `Its heating output in kW, from the manual or label (often 24–35 kW for a combi). Counted at ${Math.round(e.modulation * 100)}% without a gas meter.` })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-controls", children: [
          /* @__PURE__ */ i.jsx(Hn, { value: s != null ? `${s.toLocaleString()} kW` : "Not set", onLower: () => a(-1), onRaise: () => a(1) }),
          s != null && /* @__PURE__ */ i.jsx("button", { className: "ghost small", onClick: () => t({ boiler_kw: null }), children: "Clear" })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "cash" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: "Gas price" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: w })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "settings-controls", children: /* @__PURE__ */ i.jsxs("select", { "aria-label": "Gas price", value: e.price_source ?? "", onChange: (_) => m(_.target.value), children: [
          /* @__PURE__ */ i.jsx("option", { value: "", children: "None" }),
          /* @__PURE__ */ i.jsx("option", { value: "energy", children: "Energy dashboard" }),
          /* @__PURE__ */ i.jsx("option", { value: "fixed", children: "Unit rate" }),
          e.price_candidates.map((_) => /* @__PURE__ */ i.jsxs("option", { value: _.entity_id, children: [
            _.name,
            " (",
            _.unit,
            ")"
          ] }, _.entity_id))
        ] }) })
      ] }),
      e.price_source === "fixed" && /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "tag-outline" }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ i.jsx("span", { children: "Unit rate" }),
          /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "From your bill or tariff: the gas price per kWh, without the standing charge." })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "settings-controls", children: /* @__PURE__ */ i.jsx(
          Hn,
          {
            value: c == null ? "–" : u ? `${(c * 100).toFixed(2)}${u}` : ei(c, e.currency),
            onLower: (_) => v(-1, _),
            onRaise: (_) => v(1, _),
            hold: !0
          }
        ) })
      ] })
    ] })
  ] });
}
const Zp = { GBP: "p", EUR: "c", USD: "¢", CAD: "¢", AUD: "c", NZD: "c", IEP: "p" };
function Jp({ getHass: e }) {
  const [t, n] = N.useState(null), [r, l] = N.useState([]), [o, s] = N.useState(null), [a, u] = N.useState(!1), [c, v] = N.useState(0);
  N.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/suggest" }).then((h) => v(h.rooms.length)).catch(() => {
    });
  }, [e, t]), N.useEffect(() => {
    const h = e().connection.subscribeMessage(
      (g) => {
        n(g.rooms), l(g.receivers);
      },
      { type: "hive_local/rooms/subscribe" }
    );
    return () => {
      h.then((g) => g()).catch(() => {
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
    a && /* @__PURE__ */ i.jsx(Yp, { getHass: e, onDone: () => u(!1) }),
    o && /* @__PURE__ */ i.jsx(
      Vp,
      {
        getHass: e,
        room: o === "new" || t == null ? void 0 : t.find((h) => h.id === o),
        onDone: () => s(null)
      }
    )
  ] });
}
const qp = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, $r = [15, 30, 45, 60, 90, 120, 180, 240, 360];
function eh({ getHass: e, device: t, channel: n, info: r }) {
  const [l, o] = N.useState(null), s = N.useRef(), a = l ?? r;
  if (!a) return null;
  const u = (m, h) => {
    const g = { ...a, [m]: h };
    o(g), window.clearTimeout(s.current), s.current = window.setTimeout(() => {
      e().callWS({ type: "hive_local/defaults", entry_id: t.entry_id, channel: n, [m]: h }).finally(() => o(null));
    }, 800);
  }, c = (m) => {
    const h = $r.findIndex((y) => y >= a.boost_minutes), g = h < 0 ? $r.length - 1 : h;
    return $r[Math.min($r.length - 1, Math.max(0, g + m))];
  }, v = n === "water";
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: v ? "water-boiler" : "radiator" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
        /* @__PURE__ */ i.jsx("span", { children: v ? "Hot water boost" : "Heating boost" }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "What Boost does unless you choose otherwise." })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-controls", children: [
        /* @__PURE__ */ i.jsx(Hn, { label: "How long", value: qp(a.boost_minutes), onLower: () => u("boost_minutes", c(-1)), onRaise: () => u("boost_minutes", c(1)) }),
        !v && /* @__PURE__ */ i.jsx(Hn, { label: "Temperature", value: `${a.boost_temperature.toFixed(1)}°`, onLower: () => u("boost_temperature", Math.max(5, a.boost_temperature - 0.5)), onRaise: () => u("boost_temperature", Math.min(32, a.boost_temperature + 0.5)) })
      ] })
    ] }),
    !v && /* @__PURE__ */ i.jsxs("div", { className: "settings-row", children: [
      /* @__PURE__ */ i.jsx("span", { className: "device-icon", children: /* @__PURE__ */ i.jsx(T, { name: "snowflake" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "settings-text", children: [
        /* @__PURE__ */ i.jsx("span", { children: "Frost protection" }),
        /* @__PURE__ */ i.jsx("span", { className: "muted small", children: "The target shown while the schedule has the heating off. Only for display: the receiver isn't changed." })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "settings-controls", children: /* @__PURE__ */ i.jsx(Hn, { value: `${a.frost_temperature.toFixed(1)}°`, onLower: () => u("frost_temperature", Math.max(5, a.frost_temperature - 0.5)), onRaise: () => u("frost_temperature", Math.min(16, a.frost_temperature + 0.5)) }) })
    ] })
  ] });
}
function Hn({ label: e, value: t, onLower: n, onRaise: r, hold: l }) {
  const o = ca(n, l), s = ca(r, l);
  return /* @__PURE__ */ i.jsxs("div", { className: "adjust", children: [
    e && /* @__PURE__ */ i.jsx("span", { className: "muted small", children: e }),
    /* @__PURE__ */ i.jsxs("div", { className: "stepper", children: [
      /* @__PURE__ */ i.jsx("button", { className: "round", ...o, "aria-label": `Lower ${e ?? ""}`.trim(), children: /* @__PURE__ */ i.jsx(T, { name: "minus" }) }),
      /* @__PURE__ */ i.jsx("span", { className: "stepper-value", children: t }),
      /* @__PURE__ */ i.jsx("button", { className: "round", ...s, "aria-label": `Raise ${e ?? ""}`.trim(), children: /* @__PURE__ */ i.jsx(T, { name: "plus" }) })
    ] })
  ] });
}
function ca(e, t) {
  const n = N.useRef(e);
  n.current = e;
  const r = N.useRef(), l = () => window.clearTimeout(r.current);
  return N.useEffect(() => l, []), t ? {
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
const th = [
  { id: "overview", label: "Overview", icon: "view-dashboard-outline" },
  { id: "devices", label: "Devices", icon: "devices" },
  { id: "stats", label: "Stats", icon: "chart-box-outline" },
  { id: "settings", label: "Settings", icon: "tune-variant" }
];
function nh({ getHass: e, narrow: t, onToggleMenu: n }) {
  var $;
  const [r, l] = N.useState([]), [o, s] = N.useState(null), [a, u] = N.useState({}), [c, v] = N.useState("overview"), [m, h] = N.useState(null), [g, y] = N.useState("control"), [w, _] = N.useState(null), [p, d] = N.useState("");
  N.useEffect(() => {
    e().callWS({ type: "hive_local/devices" }).then((S) => {
      l(S.devices), s(S.limits);
    }).catch((S) => d(me(S)));
    const j = e().connection.subscribeMessage(
      (S) => u(S.status),
      { type: "hive_local/subscribe" }
    );
    return () => {
      j.then((S) => S()).catch(() => {
      });
    };
  }, [e]);
  const f = (j, S) => {
    h({ entry: j, channel: S }), y("control");
  }, x = (j) => {
    v(j), h(null), _(null);
  }, k = m && r.find((j) => j.entry_id === m.entry), C = th;
  return /* @__PURE__ */ i.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ i.jsx("header", { children: /* @__PURE__ */ i.jsxs("div", { className: "toolbar-row", children: [
      t && /* @__PURE__ */ i.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ i.jsx(T, { name: "menu" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ i.jsx(ia, {}),
        /* @__PURE__ */ i.jsx("h1", { children: "Hive Local" })
      ] }),
      /* @__PURE__ */ i.jsx("nav", { className: "tabs", role: "tablist", children: C.map((j) => /* @__PURE__ */ i.jsxs("button", { role: "tab", "aria-selected": j.id === c, className: j.id === c ? "on" : "", onClick: () => x(j.id), children: [
        /* @__PURE__ */ i.jsx(T, { name: j.icon }),
        /* @__PURE__ */ i.jsx("span", { children: j.label })
      ] }, j.id)) })
    ] }) }),
    /* @__PURE__ */ i.jsxs("main", { children: [
      p && /* @__PURE__ */ i.jsx("div", { className: "status error", children: p }),
      !r.length && !p && /* @__PURE__ */ i.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ i.jsx(ia, { size: 56 }),
        /* @__PURE__ */ i.jsx("p", { children: "No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local." })
      ] }),
      k && o ? /* @__PURE__ */ i.jsx(
        Mp,
        {
          getHass: e,
          device: k,
          channel: m.channel,
          info: ($ = a[k.entry_id]) == null ? void 0 : $[m.channel],
          limits: o,
          showDevice: r.length > 1,
          tab: g,
          onTab: y,
          onBack: () => h(null)
        },
        `${m.entry}-${m.channel}`
      ) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        c === "overview" && /* @__PURE__ */ i.jsx(fp, { getHass: e, devices: r, status: a, limits: o, onOpenDevice: f, onOpenRoom: _ }),
        c === "devices" && r.length > 0 && /* @__PURE__ */ i.jsx(Fp, { getHass: e, devices: r, status: a, limits: o, onOpenDevice: f }),
        c === "stats" && r.length > 0 && /* @__PURE__ */ i.jsx(Cc, { getHass: e, devices: r }),
        c === "settings" && r.length > 0 && /* @__PURE__ */ i.jsx(Gp, { getHass: e, devices: r, status: a })
      ] }),
      w && /* @__PURE__ */ i.jsx(
        Qp,
        {
          getHass: e,
          roomId: w,
          several: r.length > 1,
          onClose: () => _(null)
        }
      )
    ] })
  ] });
}
const rh = (
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
class lh extends HTMLElement {
  constructor() {
    super(...arguments);
    hr(this, "_hass");
    hr(this, "_narrow", !1);
    hr(this, "_root");
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
      r.textContent = rh;
      const l = document.createElement("div");
      n.append(r, l), this._root = Sc(l);
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
        nh,
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
customElements.get("hive-local-panel") || customElements.define("hive-local-panel", lh);
