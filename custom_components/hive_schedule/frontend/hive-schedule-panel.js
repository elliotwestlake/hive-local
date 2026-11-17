var oc = Object.defineProperty;
var uc = (e, t, n) => t in e ? oc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ur = (e, t, n) => uc(e, typeof t != "symbol" ? t + "" : t, n);
var Ki = { exports: {} }, ul = {}, Yi = { exports: {} }, O = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jn = Symbol.for("react.element"), ic = Symbol.for("react.portal"), sc = Symbol.for("react.fragment"), ac = Symbol.for("react.strict_mode"), cc = Symbol.for("react.profiler"), fc = Symbol.for("react.provider"), dc = Symbol.for("react.context"), pc = Symbol.for("react.forward_ref"), mc = Symbol.for("react.suspense"), hc = Symbol.for("react.memo"), vc = Symbol.for("react.lazy"), Iu = Symbol.iterator;
function yc(e) {
  return e === null || typeof e != "object" ? null : (e = Iu && e[Iu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Xi = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Gi = Object.assign, Zi = {};
function cn(e, t, n) {
  this.props = e, this.context = t, this.refs = Zi, this.updater = n || Xi;
}
cn.prototype.isReactComponent = {};
cn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
cn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Ji() {
}
Ji.prototype = cn.prototype;
function Wo(e, t, n) {
  this.props = e, this.context = t, this.refs = Zi, this.updater = n || Xi;
}
var Bo = Wo.prototype = new Ji();
Bo.constructor = Wo;
Gi(Bo, cn.prototype);
Bo.isPureReactComponent = !0;
var Fu = Array.isArray, qi = Object.prototype.hasOwnProperty, Ho = { current: null }, bi = { key: !0, ref: !0, __self: !0, __source: !0 };
function es(e, t, n) {
  var r, l = {}, o = null, u = null;
  if (t != null) for (r in t.ref !== void 0 && (u = t.ref), t.key !== void 0 && (o = "" + t.key), t) qi.call(t, r) && !bi.hasOwnProperty(r) && (l[r] = t[r]);
  var i = arguments.length - 2;
  if (i === 1) l.children = n;
  else if (1 < i) {
    for (var s = Array(i), c = 0; c < i; c++) s[c] = arguments[c + 2];
    l.children = s;
  }
  if (e && e.defaultProps) for (r in i = e.defaultProps, i) l[r] === void 0 && (l[r] = i[r]);
  return { $$typeof: Jn, type: e, key: o, ref: u, props: l, _owner: Ho.current };
}
function gc(e, t) {
  return { $$typeof: Jn, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Qo(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Jn;
}
function wc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Uu = /\/+/g;
function El(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? wc("" + e.key) : t.toString(36);
}
function _r(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var u = !1;
  if (e === null) u = !0;
  else switch (o) {
    case "string":
    case "number":
      u = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case Jn:
        case ic:
          u = !0;
      }
  }
  if (u) return u = e, l = l(u), e = r === "" ? "." + El(u, 0) : r, Fu(l) ? (n = "", e != null && (n = e.replace(Uu, "$&/") + "/"), _r(l, t, n, "", function(c) {
    return c;
  })) : l != null && (Qo(l) && (l = gc(l, n + (!l.key || u && u.key === l.key ? "" : ("" + l.key).replace(Uu, "$&/") + "/") + e)), t.push(l)), 1;
  if (u = 0, r = r === "" ? "." : r + ":", Fu(e)) for (var i = 0; i < e.length; i++) {
    o = e[i];
    var s = r + El(o, i);
    u += _r(o, t, n, s, l);
  }
  else if (s = yc(e), typeof s == "function") for (e = s.call(e), i = 0; !(o = e.next()).done; ) o = o.value, s = r + El(o, i++), u += _r(o, t, n, s, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return u;
}
function ir(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return _r(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function kc(e) {
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
var ce = { current: null }, Cr = { transition: null }, Sc = { ReactCurrentDispatcher: ce, ReactCurrentBatchConfig: Cr, ReactCurrentOwner: Ho };
function ts() {
  throw Error("act(...) is not supported in production builds of React.");
}
O.Children = { map: ir, forEach: function(e, t, n) {
  ir(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return ir(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return ir(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Qo(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
O.Component = cn;
O.Fragment = sc;
O.Profiler = cc;
O.PureComponent = Wo;
O.StrictMode = ac;
O.Suspense = mc;
O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Sc;
O.act = ts;
O.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Gi({}, e.props), l = e.key, o = e.ref, u = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, u = Ho.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var i = e.type.defaultProps;
    for (s in t) qi.call(t, s) && !bi.hasOwnProperty(s) && (r[s] = t[s] === void 0 && i !== void 0 ? i[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    i = Array(s);
    for (var c = 0; c < s; c++) i[c] = arguments[c + 2];
    r.children = i;
  }
  return { $$typeof: Jn, type: e.type, key: l, ref: o, props: r, _owner: u };
};
O.createContext = function(e) {
  return e = { $$typeof: dc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: fc, _context: e }, e.Consumer = e;
};
O.createElement = es;
O.createFactory = function(e) {
  var t = es.bind(null, e);
  return t.type = e, t;
};
O.createRef = function() {
  return { current: null };
};
O.forwardRef = function(e) {
  return { $$typeof: pc, render: e };
};
O.isValidElement = Qo;
O.lazy = function(e) {
  return { $$typeof: vc, _payload: { _status: -1, _result: e }, _init: kc };
};
O.memo = function(e, t) {
  return { $$typeof: hc, type: e, compare: t === void 0 ? null : t };
};
O.startTransition = function(e) {
  var t = Cr.transition;
  Cr.transition = {};
  try {
    e();
  } finally {
    Cr.transition = t;
  }
};
O.unstable_act = ts;
O.useCallback = function(e, t) {
  return ce.current.useCallback(e, t);
};
O.useContext = function(e) {
  return ce.current.useContext(e);
};
O.useDebugValue = function() {
};
O.useDeferredValue = function(e) {
  return ce.current.useDeferredValue(e);
};
O.useEffect = function(e, t) {
  return ce.current.useEffect(e, t);
};
O.useId = function() {
  return ce.current.useId();
};
O.useImperativeHandle = function(e, t, n) {
  return ce.current.useImperativeHandle(e, t, n);
};
O.useInsertionEffect = function(e, t) {
  return ce.current.useInsertionEffect(e, t);
};
O.useLayoutEffect = function(e, t) {
  return ce.current.useLayoutEffect(e, t);
};
O.useMemo = function(e, t) {
  return ce.current.useMemo(e, t);
};
O.useReducer = function(e, t, n) {
  return ce.current.useReducer(e, t, n);
};
O.useRef = function(e) {
  return ce.current.useRef(e);
};
O.useState = function(e) {
  return ce.current.useState(e);
};
O.useSyncExternalStore = function(e, t, n) {
  return ce.current.useSyncExternalStore(e, t, n);
};
O.useTransition = function() {
  return ce.current.useTransition();
};
O.version = "18.3.1";
Yi.exports = O;
var de = Yi.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xc = de, Ec = Symbol.for("react.element"), _c = Symbol.for("react.fragment"), Cc = Object.prototype.hasOwnProperty, Nc = xc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Pc = { key: !0, ref: !0, __self: !0, __source: !0 };
function ns(e, t, n) {
  var r, l = {}, o = null, u = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (u = t.ref);
  for (r in t) Cc.call(t, r) && !Pc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Ec, type: e, key: o, ref: u, props: l, _owner: Nc.current };
}
ul.Fragment = _c;
ul.jsx = ns;
ul.jsxs = ns;
Ki.exports = ul;
var L = Ki.exports, rs = { exports: {} }, xe = {}, ls = { exports: {} }, os = {};
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
  function t(w, z) {
    var T = w.length;
    w.push(z);
    e: for (; 0 < T; ) {
      var U = T - 1 >>> 1, J = w[U];
      if (0 < l(J, z)) w[U] = z, w[T] = J, T = U;
      else break e;
    }
  }
  function n(w) {
    return w.length === 0 ? null : w[0];
  }
  function r(w) {
    if (w.length === 0) return null;
    var z = w[0], T = w.pop();
    if (T !== z) {
      w[0] = T;
      e: for (var U = 0, J = w.length, lr = J >>> 1; U < lr; ) {
        var St = 2 * (U + 1) - 1, xl = w[St], xt = St + 1, or = w[xt];
        if (0 > l(xl, T)) xt < J && 0 > l(or, xl) ? (w[U] = or, w[xt] = T, U = xt) : (w[U] = xl, w[St] = T, U = St);
        else if (xt < J && 0 > l(or, T)) w[U] = or, w[xt] = T, U = xt;
        else break e;
      }
    }
    return z;
  }
  function l(w, z) {
    var T = w.sortIndex - z.sortIndex;
    return T !== 0 ? T : w.id - z.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var u = Date, i = u.now();
    e.unstable_now = function() {
      return u.now() - i;
    };
  }
  var s = [], c = [], h = 1, m = null, p = 3, k = !1, S = !1, x = !1, I = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, a = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(w) {
    for (var z = n(c); z !== null; ) {
      if (z.callback === null) r(c);
      else if (z.startTime <= w) r(c), z.sortIndex = z.expirationTime, t(s, z);
      else break;
      z = n(c);
    }
  }
  function v(w) {
    if (x = !1, d(w), !S) if (n(s) !== null) S = !0, g(E);
    else {
      var z = n(c);
      z !== null && W(v, z.startTime - w);
    }
  }
  function E(w, z) {
    S = !1, x && (x = !1, f(P), P = -1), k = !0;
    var T = p;
    try {
      for (d(z), m = n(s); m !== null && (!(m.expirationTime > z) || w && !ee()); ) {
        var U = m.callback;
        if (typeof U == "function") {
          m.callback = null, p = m.priorityLevel;
          var J = U(m.expirationTime <= z);
          z = e.unstable_now(), typeof J == "function" ? m.callback = J : m === n(s) && r(s), d(z);
        } else r(s);
        m = n(s);
      }
      if (m !== null) var lr = !0;
      else {
        var St = n(c);
        St !== null && W(v, St.startTime - z), lr = !1;
      }
      return lr;
    } finally {
      m = null, p = T, k = !1;
    }
  }
  var C = !1, N = null, P = -1, j = 5, R = -1;
  function ee() {
    return !(e.unstable_now() - R < j);
  }
  function kt() {
    if (N !== null) {
      var w = e.unstable_now();
      R = w;
      var z = !0;
      try {
        z = N(!0, w);
      } finally {
        z ? We() : (C = !1, N = null);
      }
    } else C = !1;
  }
  var We;
  if (typeof a == "function") We = function() {
    a(kt);
  };
  else if (typeof MessageChannel < "u") {
    var nr = new MessageChannel(), rr = nr.port2;
    nr.port1.onmessage = kt, We = function() {
      rr.postMessage(null);
    };
  } else We = function() {
    I(kt, 0);
  };
  function g(w) {
    N = w, C || (C = !0, We());
  }
  function W(w, z) {
    P = I(function() {
      w(e.unstable_now());
    }, z);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(w) {
    w.callback = null;
  }, e.unstable_continueExecution = function() {
    S || k || (S = !0, g(E));
  }, e.unstable_forceFrameRate = function(w) {
    0 > w || 125 < w ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : j = 0 < w ? Math.floor(1e3 / w) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return p;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(s);
  }, e.unstable_next = function(w) {
    switch (p) {
      case 1:
      case 2:
      case 3:
        var z = 3;
        break;
      default:
        z = p;
    }
    var T = p;
    p = z;
    try {
      return w();
    } finally {
      p = T;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(w, z) {
    switch (w) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        w = 3;
    }
    var T = p;
    p = w;
    try {
      return z();
    } finally {
      p = T;
    }
  }, e.unstable_scheduleCallback = function(w, z, T) {
    var U = e.unstable_now();
    switch (typeof T == "object" && T !== null ? (T = T.delay, T = typeof T == "number" && 0 < T ? U + T : U) : T = U, w) {
      case 1:
        var J = -1;
        break;
      case 2:
        J = 250;
        break;
      case 5:
        J = 1073741823;
        break;
      case 4:
        J = 1e4;
        break;
      default:
        J = 5e3;
    }
    return J = T + J, w = { id: h++, callback: z, priorityLevel: w, startTime: T, expirationTime: J, sortIndex: -1 }, T > U ? (w.sortIndex = T, t(c, w), n(s) === null && w === n(c) && (x ? (f(P), P = -1) : x = !0, W(v, T - U))) : (w.sortIndex = J, t(s, w), S || k || (S = !0, g(E))), w;
  }, e.unstable_shouldYield = ee, e.unstable_wrapCallback = function(w) {
    var z = p;
    return function() {
      var T = p;
      p = z;
      try {
        return w.apply(this, arguments);
      } finally {
        p = T;
      }
    };
  };
})(os);
ls.exports = os;
var zc = ls.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tc = de, Se = zc;
function y(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var us = /* @__PURE__ */ new Set(), Mn = {};
function Dt(e, t) {
  nn(e, t), nn(e + "Capture", t);
}
function nn(e, t) {
  for (Mn[e] = t, e = 0; e < t.length; e++) us.add(t[e]);
}
var Xe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Gl = Object.prototype.hasOwnProperty, Lc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, $u = {}, Au = {};
function jc(e) {
  return Gl.call(Au, e) ? !0 : Gl.call($u, e) ? !1 : Lc.test(e) ? Au[e] = !0 : ($u[e] = !0, !1);
}
function Rc(e, t, n, r) {
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
function Oc(e, t, n, r) {
  if (t === null || typeof t > "u" || Rc(e, t, n, r)) return !0;
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
function fe(e, t, n, r, l, o, u) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = u;
}
var re = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  re[e] = new fe(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  re[t] = new fe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  re[e] = new fe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  re[e] = new fe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  re[e] = new fe(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  re[e] = new fe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  re[e] = new fe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  re[e] = new fe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  re[e] = new fe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ko = /[\-:]([a-z])/g;
function Yo(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Ko,
    Yo
  );
  re[t] = new fe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Ko, Yo);
  re[t] = new fe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Ko, Yo);
  re[t] = new fe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  re[e] = new fe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
re.xlinkHref = new fe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  re[e] = new fe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Xo(e, t, n, r) {
  var l = re.hasOwnProperty(t) ? re[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Oc(t, n, l, r) && (n = null), r || l === null ? jc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var qe = Tc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, sr = Symbol.for("react.element"), Ut = Symbol.for("react.portal"), $t = Symbol.for("react.fragment"), Go = Symbol.for("react.strict_mode"), Zl = Symbol.for("react.profiler"), is = Symbol.for("react.provider"), ss = Symbol.for("react.context"), Zo = Symbol.for("react.forward_ref"), Jl = Symbol.for("react.suspense"), ql = Symbol.for("react.suspense_list"), Jo = Symbol.for("react.memo"), et = Symbol.for("react.lazy"), as = Symbol.for("react.offscreen"), Vu = Symbol.iterator;
function pn(e) {
  return e === null || typeof e != "object" ? null : (e = Vu && e[Vu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Q = Object.assign, _l;
function Sn(e) {
  if (_l === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    _l = t && t[1] || "";
  }
  return `
` + _l + e;
}
var Cl = !1;
function Nl(e, t) {
  if (!e || Cl) return "";
  Cl = !0;
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
`), u = l.length - 1, i = o.length - 1; 1 <= u && 0 <= i && l[u] !== o[i]; ) i--;
      for (; 1 <= u && 0 <= i; u--, i--) if (l[u] !== o[i]) {
        if (u !== 1 || i !== 1)
          do
            if (u--, i--, 0 > i || l[u] !== o[i]) {
              var s = `
` + l[u].replace(" at new ", " at ");
              return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
            }
          while (1 <= u && 0 <= i);
        break;
      }
    }
  } finally {
    Cl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Sn(e) : "";
}
function Mc(e) {
  switch (e.tag) {
    case 5:
      return Sn(e.type);
    case 16:
      return Sn("Lazy");
    case 13:
      return Sn("Suspense");
    case 19:
      return Sn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Nl(e.type, !1), e;
    case 11:
      return e = Nl(e.type.render, !1), e;
    case 1:
      return e = Nl(e.type, !0), e;
    default:
      return "";
  }
}
function bl(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case $t:
      return "Fragment";
    case Ut:
      return "Portal";
    case Zl:
      return "Profiler";
    case Go:
      return "StrictMode";
    case Jl:
      return "Suspense";
    case ql:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case ss:
      return (e.displayName || "Context") + ".Consumer";
    case is:
      return (e._context.displayName || "Context") + ".Provider";
    case Zo:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Jo:
      return t = e.displayName || null, t !== null ? t : bl(e.type) || "Memo";
    case et:
      t = e._payload, e = e._init;
      try {
        return bl(e(t));
      } catch {
      }
  }
  return null;
}
function Dc(e) {
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
      return bl(t);
    case 8:
      return t === Go ? "StrictMode" : "Mode";
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
function ht(e) {
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
function cs(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Ic(e) {
  var t = cs(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, o = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(u) {
      r = "" + u, o.call(this, u);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(u) {
      r = "" + u;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function ar(e) {
  e._valueTracker || (e._valueTracker = Ic(e));
}
function fs(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = cs(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Ir(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function eo(e, t) {
  var n = t.checked;
  return Q({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Wu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = ht(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function ds(e, t) {
  t = t.checked, t != null && Xo(e, "checked", t, !1);
}
function to(e, t) {
  ds(e, t);
  var n = ht(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? no(e, t.type, n) : t.hasOwnProperty("defaultValue") && no(e, t.type, ht(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Bu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function no(e, t, n) {
  (t !== "number" || Ir(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var xn = Array.isArray;
function Zt(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + ht(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function ro(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(y(91));
  return Q({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Hu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(y(92));
      if (xn(n)) {
        if (1 < n.length) throw Error(y(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: ht(n) };
}
function ps(e, t) {
  var n = ht(t.value), r = ht(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Qu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function ms(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? ms(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var cr, hs = function(e) {
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
function Dn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Cn = {
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
}, Fc = ["Webkit", "ms", "Moz", "O"];
Object.keys(Cn).forEach(function(e) {
  Fc.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Cn[t] = Cn[e];
  });
});
function vs(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Cn.hasOwnProperty(e) && Cn[e] ? ("" + t).trim() : t + "px";
}
function ys(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = vs(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var Uc = Q({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function oo(e, t) {
  if (t) {
    if (Uc[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(y(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(y(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(y(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(y(62));
  }
}
function uo(e, t) {
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
var io = null;
function qo(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var so = null, Jt = null, qt = null;
function Ku(e) {
  if (e = er(e)) {
    if (typeof so != "function") throw Error(y(280));
    var t = e.stateNode;
    t && (t = fl(t), so(e.stateNode, e.type, t));
  }
}
function gs(e) {
  Jt ? qt ? qt.push(e) : qt = [e] : Jt = e;
}
function ws() {
  if (Jt) {
    var e = Jt, t = qt;
    if (qt = Jt = null, Ku(e), t) for (e = 0; e < t.length; e++) Ku(t[e]);
  }
}
function ks(e, t) {
  return e(t);
}
function Ss() {
}
var Pl = !1;
function xs(e, t, n) {
  if (Pl) return e(t, n);
  Pl = !0;
  try {
    return ks(e, t, n);
  } finally {
    Pl = !1, (Jt !== null || qt !== null) && (Ss(), ws());
  }
}
function In(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = fl(n);
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
  if (n && typeof n != "function") throw Error(y(231, t, typeof n));
  return n;
}
var ao = !1;
if (Xe) try {
  var mn = {};
  Object.defineProperty(mn, "passive", { get: function() {
    ao = !0;
  } }), window.addEventListener("test", mn, mn), window.removeEventListener("test", mn, mn);
} catch {
  ao = !1;
}
function $c(e, t, n, r, l, o, u, i, s) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (h) {
    this.onError(h);
  }
}
var Nn = !1, Fr = null, Ur = !1, co = null, Ac = { onError: function(e) {
  Nn = !0, Fr = e;
} };
function Vc(e, t, n, r, l, o, u, i, s) {
  Nn = !1, Fr = null, $c.apply(Ac, arguments);
}
function Wc(e, t, n, r, l, o, u, i, s) {
  if (Vc.apply(this, arguments), Nn) {
    if (Nn) {
      var c = Fr;
      Nn = !1, Fr = null;
    } else throw Error(y(198));
    Ur || (Ur = !0, co = c);
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
function Es(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Yu(e) {
  if (It(e) !== e) throw Error(y(188));
}
function Bc(e) {
  var t = e.alternate;
  if (!t) {
    if (t = It(e), t === null) throw Error(y(188));
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
        if (o === n) return Yu(l), e;
        if (o === r) return Yu(l), t;
        o = o.sibling;
      }
      throw Error(y(188));
    }
    if (n.return !== r.return) n = l, r = o;
    else {
      for (var u = !1, i = l.child; i; ) {
        if (i === n) {
          u = !0, n = l, r = o;
          break;
        }
        if (i === r) {
          u = !0, r = l, n = o;
          break;
        }
        i = i.sibling;
      }
      if (!u) {
        for (i = o.child; i; ) {
          if (i === n) {
            u = !0, n = o, r = l;
            break;
          }
          if (i === r) {
            u = !0, r = o, n = l;
            break;
          }
          i = i.sibling;
        }
        if (!u) throw Error(y(189));
      }
    }
    if (n.alternate !== r) throw Error(y(190));
  }
  if (n.tag !== 3) throw Error(y(188));
  return n.stateNode.current === n ? e : t;
}
function _s(e) {
  return e = Bc(e), e !== null ? Cs(e) : null;
}
function Cs(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Cs(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Ns = Se.unstable_scheduleCallback, Xu = Se.unstable_cancelCallback, Hc = Se.unstable_shouldYield, Qc = Se.unstable_requestPaint, Y = Se.unstable_now, Kc = Se.unstable_getCurrentPriorityLevel, bo = Se.unstable_ImmediatePriority, Ps = Se.unstable_UserBlockingPriority, $r = Se.unstable_NormalPriority, Yc = Se.unstable_LowPriority, zs = Se.unstable_IdlePriority, il = null, Ae = null;
function Xc(e) {
  if (Ae && typeof Ae.onCommitFiberRoot == "function") try {
    Ae.onCommitFiberRoot(il, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Me = Math.clz32 ? Math.clz32 : Jc, Gc = Math.log, Zc = Math.LN2;
function Jc(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Gc(e) / Zc | 0) | 0;
}
var fr = 64, dr = 4194304;
function En(e) {
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
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, u = n & 268435455;
  if (u !== 0) {
    var i = u & ~l;
    i !== 0 ? r = En(i) : (o &= u, o !== 0 && (r = En(o)));
  } else u = n & ~l, u !== 0 ? r = En(u) : o !== 0 && (r = En(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Me(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function qc(e, t) {
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
function bc(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var u = 31 - Me(o), i = 1 << u, s = l[u];
    s === -1 ? (!(i & n) || i & r) && (l[u] = qc(i, t)) : s <= t && (e.expiredLanes |= i), o &= ~i;
  }
}
function fo(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ts() {
  var e = fr;
  return fr <<= 1, !(fr & 4194240) && (fr = 64), e;
}
function zl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function qn(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Me(t), e[t] = n;
}
function ef(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Me(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function eu(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Me(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var D = 0;
function Ls(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var js, tu, Rs, Os, Ms, po = !1, pr = [], it = null, st = null, at = null, Fn = /* @__PURE__ */ new Map(), Un = /* @__PURE__ */ new Map(), nt = [], tf = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Gu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      it = null;
      break;
    case "dragenter":
    case "dragleave":
      st = null;
      break;
    case "mouseover":
    case "mouseout":
      at = null;
      break;
    case "pointerover":
    case "pointerout":
      Fn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Un.delete(t.pointerId);
  }
}
function hn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = er(t), t !== null && tu(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function nf(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return it = hn(it, e, t, n, r, l), !0;
    case "dragenter":
      return st = hn(st, e, t, n, r, l), !0;
    case "mouseover":
      return at = hn(at, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Fn.set(o, hn(Fn.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Un.set(o, hn(Un.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Ds(e) {
  var t = Ct(e.target);
  if (t !== null) {
    var n = It(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Es(n), t !== null) {
          e.blockedOn = t, Ms(e.priority, function() {
            Rs(n);
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
function Nr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = mo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      io = r, n.target.dispatchEvent(r), io = null;
    } else return t = er(n), t !== null && tu(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Zu(e, t, n) {
  Nr(e) && n.delete(t);
}
function rf() {
  po = !1, it !== null && Nr(it) && (it = null), st !== null && Nr(st) && (st = null), at !== null && Nr(at) && (at = null), Fn.forEach(Zu), Un.forEach(Zu);
}
function vn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, po || (po = !0, Se.unstable_scheduleCallback(Se.unstable_NormalPriority, rf)));
}
function $n(e) {
  function t(l) {
    return vn(l, e);
  }
  if (0 < pr.length) {
    vn(pr[0], e);
    for (var n = 1; n < pr.length; n++) {
      var r = pr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (it !== null && vn(it, e), st !== null && vn(st, e), at !== null && vn(at, e), Fn.forEach(t), Un.forEach(t), n = 0; n < nt.length; n++) r = nt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < nt.length && (n = nt[0], n.blockedOn === null); ) Ds(n), n.blockedOn === null && nt.shift();
}
var bt = qe.ReactCurrentBatchConfig, Vr = !0;
function lf(e, t, n, r) {
  var l = D, o = bt.transition;
  bt.transition = null;
  try {
    D = 1, nu(e, t, n, r);
  } finally {
    D = l, bt.transition = o;
  }
}
function of(e, t, n, r) {
  var l = D, o = bt.transition;
  bt.transition = null;
  try {
    D = 4, nu(e, t, n, r);
  } finally {
    D = l, bt.transition = o;
  }
}
function nu(e, t, n, r) {
  if (Vr) {
    var l = mo(e, t, n, r);
    if (l === null) Ul(e, t, r, Wr, n), Gu(e, r);
    else if (nf(l, e, t, n, r)) r.stopPropagation();
    else if (Gu(e, r), t & 4 && -1 < tf.indexOf(e)) {
      for (; l !== null; ) {
        var o = er(l);
        if (o !== null && js(o), o = mo(e, t, n, r), o === null && Ul(e, t, r, Wr, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Ul(e, t, r, null, n);
  }
}
var Wr = null;
function mo(e, t, n, r) {
  if (Wr = null, e = qo(r), e = Ct(e), e !== null) if (t = It(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Es(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Wr = e, null;
}
function Is(e) {
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
      switch (Kc()) {
        case bo:
          return 1;
        case Ps:
          return 4;
        case $r:
        case Yc:
          return 16;
        case zs:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var lt = null, ru = null, Pr = null;
function Fs() {
  if (Pr) return Pr;
  var e, t = ru, n = t.length, r, l = "value" in lt ? lt.value : lt.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var u = n - e;
  for (r = 1; r <= u && t[n - r] === l[o - r]; r++) ;
  return Pr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function zr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function mr() {
  return !0;
}
function Ju() {
  return !1;
}
function Ee(e) {
  function t(n, r, l, o, u) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = u, this.currentTarget = null;
    for (var i in e) e.hasOwnProperty(i) && (n = e[i], this[i] = n ? n(o) : o[i]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? mr : Ju, this.isPropagationStopped = Ju, this;
  }
  return Q(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = mr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = mr);
  }, persist: function() {
  }, isPersistent: mr }), t;
}
var fn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, lu = Ee(fn), bn = Q({}, fn, { view: 0, detail: 0 }), uf = Ee(bn), Tl, Ll, yn, sl = Q({}, bn, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ou, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== yn && (yn && e.type === "mousemove" ? (Tl = e.screenX - yn.screenX, Ll = e.screenY - yn.screenY) : Ll = Tl = 0, yn = e), Tl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ll;
} }), qu = Ee(sl), sf = Q({}, sl, { dataTransfer: 0 }), af = Ee(sf), cf = Q({}, bn, { relatedTarget: 0 }), jl = Ee(cf), ff = Q({}, fn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), df = Ee(ff), pf = Q({}, fn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), mf = Ee(pf), hf = Q({}, fn, { data: 0 }), bu = Ee(hf), vf = {
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
}, yf = {
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
}, gf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function wf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = gf[e]) ? !!t[e] : !1;
}
function ou() {
  return wf;
}
var kf = Q({}, bn, { key: function(e) {
  if (e.key) {
    var t = vf[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = zr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? yf[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ou, charCode: function(e) {
  return e.type === "keypress" ? zr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? zr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Sf = Ee(kf), xf = Q({}, sl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ei = Ee(xf), Ef = Q({}, bn, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ou }), _f = Ee(Ef), Cf = Q({}, fn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Nf = Ee(Cf), Pf = Q({}, sl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), zf = Ee(Pf), Tf = [9, 13, 27, 32], uu = Xe && "CompositionEvent" in window, Pn = null;
Xe && "documentMode" in document && (Pn = document.documentMode);
var Lf = Xe && "TextEvent" in window && !Pn, Us = Xe && (!uu || Pn && 8 < Pn && 11 >= Pn), ti = " ", ni = !1;
function $s(e, t) {
  switch (e) {
    case "keyup":
      return Tf.indexOf(t.keyCode) !== -1;
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
function As(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var At = !1;
function jf(e, t) {
  switch (e) {
    case "compositionend":
      return As(t);
    case "keypress":
      return t.which !== 32 ? null : (ni = !0, ti);
    case "textInput":
      return e = t.data, e === ti && ni ? null : e;
    default:
      return null;
  }
}
function Rf(e, t) {
  if (At) return e === "compositionend" || !uu && $s(e, t) ? (e = Fs(), Pr = ru = lt = null, At = !1, e) : null;
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
      return Us && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Of = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function ri(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Of[e.type] : t === "textarea";
}
function Vs(e, t, n, r) {
  gs(r), t = Br(t, "onChange"), 0 < t.length && (n = new lu("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var zn = null, An = null;
function Mf(e) {
  qs(e, 0);
}
function al(e) {
  var t = Bt(e);
  if (fs(t)) return e;
}
function Df(e, t) {
  if (e === "change") return t;
}
var Ws = !1;
if (Xe) {
  var Rl;
  if (Xe) {
    var Ol = "oninput" in document;
    if (!Ol) {
      var li = document.createElement("div");
      li.setAttribute("oninput", "return;"), Ol = typeof li.oninput == "function";
    }
    Rl = Ol;
  } else Rl = !1;
  Ws = Rl && (!document.documentMode || 9 < document.documentMode);
}
function oi() {
  zn && (zn.detachEvent("onpropertychange", Bs), An = zn = null);
}
function Bs(e) {
  if (e.propertyName === "value" && al(An)) {
    var t = [];
    Vs(t, An, e, qo(e)), xs(Mf, t);
  }
}
function If(e, t, n) {
  e === "focusin" ? (oi(), zn = t, An = n, zn.attachEvent("onpropertychange", Bs)) : e === "focusout" && oi();
}
function Ff(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return al(An);
}
function Uf(e, t) {
  if (e === "click") return al(t);
}
function $f(e, t) {
  if (e === "input" || e === "change") return al(t);
}
function Af(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ie = typeof Object.is == "function" ? Object.is : Af;
function Vn(e, t) {
  if (Ie(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Gl.call(t, l) || !Ie(e[l], t[l])) return !1;
  }
  return !0;
}
function ui(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ii(e, t) {
  var n = ui(e);
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
    n = ui(n);
  }
}
function Hs(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Hs(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Qs() {
  for (var e = window, t = Ir(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ir(e.document);
  }
  return t;
}
function iu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Vf(e) {
  var t = Qs(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Hs(n.ownerDocument.documentElement, n)) {
    if (r !== null && iu(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = ii(n, o);
        var u = ii(
          n,
          r
        );
        l && u && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== u.node || e.focusOffset !== u.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(u.node, u.offset)) : (t.setEnd(u.node, u.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Wf = Xe && "documentMode" in document && 11 >= document.documentMode, Vt = null, ho = null, Tn = null, vo = !1;
function si(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  vo || Vt == null || Vt !== Ir(r) || (r = Vt, "selectionStart" in r && iu(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Tn && Vn(Tn, r) || (Tn = r, r = Br(ho, "onSelect"), 0 < r.length && (t = new lu("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Vt)));
}
function hr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Wt = { animationend: hr("Animation", "AnimationEnd"), animationiteration: hr("Animation", "AnimationIteration"), animationstart: hr("Animation", "AnimationStart"), transitionend: hr("Transition", "TransitionEnd") }, Ml = {}, Ks = {};
Xe && (Ks = document.createElement("div").style, "AnimationEvent" in window || (delete Wt.animationend.animation, delete Wt.animationiteration.animation, delete Wt.animationstart.animation), "TransitionEvent" in window || delete Wt.transitionend.transition);
function cl(e) {
  if (Ml[e]) return Ml[e];
  if (!Wt[e]) return e;
  var t = Wt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Ks) return Ml[e] = t[n];
  return e;
}
var Ys = cl("animationend"), Xs = cl("animationiteration"), Gs = cl("animationstart"), Zs = cl("transitionend"), Js = /* @__PURE__ */ new Map(), ai = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function yt(e, t) {
  Js.set(e, t), Dt(t, [e]);
}
for (var Dl = 0; Dl < ai.length; Dl++) {
  var Il = ai[Dl], Bf = Il.toLowerCase(), Hf = Il[0].toUpperCase() + Il.slice(1);
  yt(Bf, "on" + Hf);
}
yt(Ys, "onAnimationEnd");
yt(Xs, "onAnimationIteration");
yt(Gs, "onAnimationStart");
yt("dblclick", "onDoubleClick");
yt("focusin", "onFocus");
yt("focusout", "onBlur");
yt(Zs, "onTransitionEnd");
nn("onMouseEnter", ["mouseout", "mouseover"]);
nn("onMouseLeave", ["mouseout", "mouseover"]);
nn("onPointerEnter", ["pointerout", "pointerover"]);
nn("onPointerLeave", ["pointerout", "pointerover"]);
Dt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Dt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Dt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Dt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Dt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Dt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var _n = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Qf = new Set("cancel close invalid load scroll toggle".split(" ").concat(_n));
function ci(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Wc(r, t, void 0, e), e.currentTarget = null;
}
function qs(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var u = r.length - 1; 0 <= u; u--) {
        var i = r[u], s = i.instance, c = i.currentTarget;
        if (i = i.listener, s !== o && l.isPropagationStopped()) break e;
        ci(l, i, c), o = s;
      }
      else for (u = 0; u < r.length; u++) {
        if (i = r[u], s = i.instance, c = i.currentTarget, i = i.listener, s !== o && l.isPropagationStopped()) break e;
        ci(l, i, c), o = s;
      }
    }
  }
  if (Ur) throw e = co, Ur = !1, co = null, e;
}
function $(e, t) {
  var n = t[So];
  n === void 0 && (n = t[So] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (bs(t, e, 2, !1), n.add(r));
}
function Fl(e, t, n) {
  var r = 0;
  t && (r |= 4), bs(n, e, r, t);
}
var vr = "_reactListening" + Math.random().toString(36).slice(2);
function Wn(e) {
  if (!e[vr]) {
    e[vr] = !0, us.forEach(function(n) {
      n !== "selectionchange" && (Qf.has(n) || Fl(n, !1, e), Fl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[vr] || (t[vr] = !0, Fl("selectionchange", !1, t));
  }
}
function bs(e, t, n, r) {
  switch (Is(t)) {
    case 1:
      var l = lf;
      break;
    case 4:
      l = of;
      break;
    default:
      l = nu;
  }
  n = l.bind(null, t, n, e), l = void 0, !ao || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Ul(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var u = r.tag;
    if (u === 3 || u === 4) {
      var i = r.stateNode.containerInfo;
      if (i === l || i.nodeType === 8 && i.parentNode === l) break;
      if (u === 4) for (u = r.return; u !== null; ) {
        var s = u.tag;
        if ((s === 3 || s === 4) && (s = u.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
        u = u.return;
      }
      for (; i !== null; ) {
        if (u = Ct(i), u === null) return;
        if (s = u.tag, s === 5 || s === 6) {
          r = o = u;
          continue e;
        }
        i = i.parentNode;
      }
    }
    r = r.return;
  }
  xs(function() {
    var c = o, h = qo(n), m = [];
    e: {
      var p = Js.get(e);
      if (p !== void 0) {
        var k = lu, S = e;
        switch (e) {
          case "keypress":
            if (zr(n) === 0) break e;
          case "keydown":
          case "keyup":
            k = Sf;
            break;
          case "focusin":
            S = "focus", k = jl;
            break;
          case "focusout":
            S = "blur", k = jl;
            break;
          case "beforeblur":
          case "afterblur":
            k = jl;
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
            k = qu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k = af;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k = _f;
            break;
          case Ys:
          case Xs:
          case Gs:
            k = df;
            break;
          case Zs:
            k = Nf;
            break;
          case "scroll":
            k = uf;
            break;
          case "wheel":
            k = zf;
            break;
          case "copy":
          case "cut":
          case "paste":
            k = mf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k = ei;
        }
        var x = (t & 4) !== 0, I = !x && e === "scroll", f = x ? p !== null ? p + "Capture" : null : p;
        x = [];
        for (var a = c, d; a !== null; ) {
          d = a;
          var v = d.stateNode;
          if (d.tag === 5 && v !== null && (d = v, f !== null && (v = In(a, f), v != null && x.push(Bn(a, v, d)))), I) break;
          a = a.return;
        }
        0 < x.length && (p = new k(p, S, null, n, h), m.push({ event: p, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (p = e === "mouseover" || e === "pointerover", k = e === "mouseout" || e === "pointerout", p && n !== io && (S = n.relatedTarget || n.fromElement) && (Ct(S) || S[Ge])) break e;
        if ((k || p) && (p = h.window === h ? h : (p = h.ownerDocument) ? p.defaultView || p.parentWindow : window, k ? (S = n.relatedTarget || n.toElement, k = c, S = S ? Ct(S) : null, S !== null && (I = It(S), S !== I || S.tag !== 5 && S.tag !== 6) && (S = null)) : (k = null, S = c), k !== S)) {
          if (x = qu, v = "onMouseLeave", f = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (x = ei, v = "onPointerLeave", f = "onPointerEnter", a = "pointer"), I = k == null ? p : Bt(k), d = S == null ? p : Bt(S), p = new x(v, a + "leave", k, n, h), p.target = I, p.relatedTarget = d, v = null, Ct(h) === c && (x = new x(f, a + "enter", S, n, h), x.target = d, x.relatedTarget = I, v = x), I = v, k && S) t: {
            for (x = k, f = S, a = 0, d = x; d; d = Ft(d)) a++;
            for (d = 0, v = f; v; v = Ft(v)) d++;
            for (; 0 < a - d; ) x = Ft(x), a--;
            for (; 0 < d - a; ) f = Ft(f), d--;
            for (; a--; ) {
              if (x === f || f !== null && x === f.alternate) break t;
              x = Ft(x), f = Ft(f);
            }
            x = null;
          }
          else x = null;
          k !== null && fi(m, p, k, x, !1), S !== null && I !== null && fi(m, I, S, x, !0);
        }
      }
      e: {
        if (p = c ? Bt(c) : window, k = p.nodeName && p.nodeName.toLowerCase(), k === "select" || k === "input" && p.type === "file") var E = Df;
        else if (ri(p)) if (Ws) E = $f;
        else {
          E = Ff;
          var C = If;
        }
        else (k = p.nodeName) && k.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (E = Uf);
        if (E && (E = E(e, c))) {
          Vs(m, E, n, h);
          break e;
        }
        C && C(e, p, c), e === "focusout" && (C = p._wrapperState) && C.controlled && p.type === "number" && no(p, "number", p.value);
      }
      switch (C = c ? Bt(c) : window, e) {
        case "focusin":
          (ri(C) || C.contentEditable === "true") && (Vt = C, ho = c, Tn = null);
          break;
        case "focusout":
          Tn = ho = Vt = null;
          break;
        case "mousedown":
          vo = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          vo = !1, si(m, n, h);
          break;
        case "selectionchange":
          if (Wf) break;
        case "keydown":
        case "keyup":
          si(m, n, h);
      }
      var N;
      if (uu) e: {
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
      else At ? $s(e, n) && (P = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      P && (Us && n.locale !== "ko" && (At || P !== "onCompositionStart" ? P === "onCompositionEnd" && At && (N = Fs()) : (lt = h, ru = "value" in lt ? lt.value : lt.textContent, At = !0)), C = Br(c, P), 0 < C.length && (P = new bu(P, e, null, n, h), m.push({ event: P, listeners: C }), N ? P.data = N : (N = As(n), N !== null && (P.data = N)))), (N = Lf ? jf(e, n) : Rf(e, n)) && (c = Br(c, "onBeforeInput"), 0 < c.length && (h = new bu("onBeforeInput", "beforeinput", null, n, h), m.push({ event: h, listeners: c }), h.data = N));
    }
    qs(m, t);
  });
}
function Bn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Br(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = In(e, n), o != null && r.unshift(Bn(e, o, l)), o = In(e, t), o != null && r.push(Bn(e, o, l))), e = e.return;
  }
  return r;
}
function Ft(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function fi(e, t, n, r, l) {
  for (var o = t._reactName, u = []; n !== null && n !== r; ) {
    var i = n, s = i.alternate, c = i.stateNode;
    if (s !== null && s === r) break;
    i.tag === 5 && c !== null && (i = c, l ? (s = In(n, o), s != null && u.unshift(Bn(n, s, i))) : l || (s = In(n, o), s != null && u.push(Bn(n, s, i)))), n = n.return;
  }
  u.length !== 0 && e.push({ event: t, listeners: u });
}
var Kf = /\r\n?/g, Yf = /\u0000|\uFFFD/g;
function di(e) {
  return (typeof e == "string" ? e : "" + e).replace(Kf, `
`).replace(Yf, "");
}
function yr(e, t, n) {
  if (t = di(t), di(e) !== t && n) throw Error(y(425));
}
function Hr() {
}
var yo = null, go = null;
function wo(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var ko = typeof setTimeout == "function" ? setTimeout : void 0, Xf = typeof clearTimeout == "function" ? clearTimeout : void 0, pi = typeof Promise == "function" ? Promise : void 0, Gf = typeof queueMicrotask == "function" ? queueMicrotask : typeof pi < "u" ? function(e) {
  return pi.resolve(null).then(e).catch(Zf);
} : ko;
function Zf(e) {
  setTimeout(function() {
    throw e;
  });
}
function $l(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), $n(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  $n(t);
}
function ct(e) {
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
function mi(e) {
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
var dn = Math.random().toString(36).slice(2), $e = "__reactFiber$" + dn, Hn = "__reactProps$" + dn, Ge = "__reactContainer$" + dn, So = "__reactEvents$" + dn, Jf = "__reactListeners$" + dn, qf = "__reactHandles$" + dn;
function Ct(e) {
  var t = e[$e];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ge] || n[$e]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = mi(e); e !== null; ) {
        if (n = e[$e]) return n;
        e = mi(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function er(e) {
  return e = e[$e] || e[Ge], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Bt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(y(33));
}
function fl(e) {
  return e[Hn] || null;
}
var xo = [], Ht = -1;
function gt(e) {
  return { current: e };
}
function A(e) {
  0 > Ht || (e.current = xo[Ht], xo[Ht] = null, Ht--);
}
function F(e, t) {
  Ht++, xo[Ht] = e.current, e.current = t;
}
var vt = {}, ie = gt(vt), he = gt(!1), Lt = vt;
function rn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return vt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function ve(e) {
  return e = e.childContextTypes, e != null;
}
function Qr() {
  A(he), A(ie);
}
function hi(e, t, n) {
  if (ie.current !== vt) throw Error(y(168));
  F(ie, t), F(he, n);
}
function ea(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(y(108, Dc(e) || "Unknown", l));
  return Q({}, n, r);
}
function Kr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || vt, Lt = ie.current, F(ie, e), F(he, he.current), !0;
}
function vi(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(y(169));
  n ? (e = ea(e, t, Lt), r.__reactInternalMemoizedMergedChildContext = e, A(he), A(ie), F(ie, e)) : A(he), F(he, n);
}
var He = null, dl = !1, Al = !1;
function ta(e) {
  He === null ? He = [e] : He.push(e);
}
function bf(e) {
  dl = !0, ta(e);
}
function wt() {
  if (!Al && He !== null) {
    Al = !0;
    var e = 0, t = D;
    try {
      var n = He;
      for (D = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      He = null, dl = !1;
    } catch (l) {
      throw He !== null && (He = He.slice(e + 1)), Ns(bo, wt), l;
    } finally {
      D = t, Al = !1;
    }
  }
  return null;
}
var Qt = [], Kt = 0, Yr = null, Xr = 0, _e = [], Ce = 0, jt = null, Qe = 1, Ke = "";
function Et(e, t) {
  Qt[Kt++] = Xr, Qt[Kt++] = Yr, Yr = e, Xr = t;
}
function na(e, t, n) {
  _e[Ce++] = Qe, _e[Ce++] = Ke, _e[Ce++] = jt, jt = e;
  var r = Qe;
  e = Ke;
  var l = 32 - Me(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - Me(t) + l;
  if (30 < o) {
    var u = l - l % 5;
    o = (r & (1 << u) - 1).toString(32), r >>= u, l -= u, Qe = 1 << 32 - Me(t) + l | n << l | r, Ke = o + e;
  } else Qe = 1 << o | n << l | r, Ke = e;
}
function su(e) {
  e.return !== null && (Et(e, 1), na(e, 1, 0));
}
function au(e) {
  for (; e === Yr; ) Yr = Qt[--Kt], Qt[Kt] = null, Xr = Qt[--Kt], Qt[Kt] = null;
  for (; e === jt; ) jt = _e[--Ce], _e[Ce] = null, Ke = _e[--Ce], _e[Ce] = null, Qe = _e[--Ce], _e[Ce] = null;
}
var ke = null, we = null, V = !1, Oe = null;
function ra(e, t) {
  var n = Ne(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function yi(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ke = e, we = ct(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ke = e, we = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = jt !== null ? { id: Qe, overflow: Ke } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ne(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ke = e, we = null, !0) : !1;
    default:
      return !1;
  }
}
function Eo(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function _o(e) {
  if (V) {
    var t = we;
    if (t) {
      var n = t;
      if (!yi(e, t)) {
        if (Eo(e)) throw Error(y(418));
        t = ct(n.nextSibling);
        var r = ke;
        t && yi(e, t) ? ra(r, n) : (e.flags = e.flags & -4097 | 2, V = !1, ke = e);
      }
    } else {
      if (Eo(e)) throw Error(y(418));
      e.flags = e.flags & -4097 | 2, V = !1, ke = e;
    }
  }
}
function gi(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ke = e;
}
function gr(e) {
  if (e !== ke) return !1;
  if (!V) return gi(e), V = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !wo(e.type, e.memoizedProps)), t && (t = we)) {
    if (Eo(e)) throw la(), Error(y(418));
    for (; t; ) ra(e, t), t = ct(t.nextSibling);
  }
  if (gi(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(y(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              we = ct(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      we = null;
    }
  } else we = ke ? ct(e.stateNode.nextSibling) : null;
  return !0;
}
function la() {
  for (var e = we; e; ) e = ct(e.nextSibling);
}
function ln() {
  we = ke = null, V = !1;
}
function cu(e) {
  Oe === null ? Oe = [e] : Oe.push(e);
}
var ed = qe.ReactCurrentBatchConfig;
function gn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(y(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(y(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(u) {
        var i = l.refs;
        u === null ? delete i[o] : i[o] = u;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(y(284));
    if (!n._owner) throw Error(y(290, e));
  }
  return e;
}
function wr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(y(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function wi(e) {
  var t = e._init;
  return t(e._payload);
}
function oa(e) {
  function t(f, a) {
    if (e) {
      var d = f.deletions;
      d === null ? (f.deletions = [a], f.flags |= 16) : d.push(a);
    }
  }
  function n(f, a) {
    if (!e) return null;
    for (; a !== null; ) t(f, a), a = a.sibling;
    return null;
  }
  function r(f, a) {
    for (f = /* @__PURE__ */ new Map(); a !== null; ) a.key !== null ? f.set(a.key, a) : f.set(a.index, a), a = a.sibling;
    return f;
  }
  function l(f, a) {
    return f = mt(f, a), f.index = 0, f.sibling = null, f;
  }
  function o(f, a, d) {
    return f.index = d, e ? (d = f.alternate, d !== null ? (d = d.index, d < a ? (f.flags |= 2, a) : d) : (f.flags |= 2, a)) : (f.flags |= 1048576, a);
  }
  function u(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function i(f, a, d, v) {
    return a === null || a.tag !== 6 ? (a = Yl(d, f.mode, v), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function s(f, a, d, v) {
    var E = d.type;
    return E === $t ? h(f, a, d.props.children, v, d.key) : a !== null && (a.elementType === E || typeof E == "object" && E !== null && E.$$typeof === et && wi(E) === a.type) ? (v = l(a, d.props), v.ref = gn(f, a, d), v.return = f, v) : (v = Dr(d.type, d.key, d.props, null, f.mode, v), v.ref = gn(f, a, d), v.return = f, v);
  }
  function c(f, a, d, v) {
    return a === null || a.tag !== 4 || a.stateNode.containerInfo !== d.containerInfo || a.stateNode.implementation !== d.implementation ? (a = Xl(d, f.mode, v), a.return = f, a) : (a = l(a, d.children || []), a.return = f, a);
  }
  function h(f, a, d, v, E) {
    return a === null || a.tag !== 7 ? (a = Tt(d, f.mode, v, E), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function m(f, a, d) {
    if (typeof a == "string" && a !== "" || typeof a == "number") return a = Yl("" + a, f.mode, d), a.return = f, a;
    if (typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case sr:
          return d = Dr(a.type, a.key, a.props, null, f.mode, d), d.ref = gn(f, null, a), d.return = f, d;
        case Ut:
          return a = Xl(a, f.mode, d), a.return = f, a;
        case et:
          var v = a._init;
          return m(f, v(a._payload), d);
      }
      if (xn(a) || pn(a)) return a = Tt(a, f.mode, d, null), a.return = f, a;
      wr(f, a);
    }
    return null;
  }
  function p(f, a, d, v) {
    var E = a !== null ? a.key : null;
    if (typeof d == "string" && d !== "" || typeof d == "number") return E !== null ? null : i(f, a, "" + d, v);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case sr:
          return d.key === E ? s(f, a, d, v) : null;
        case Ut:
          return d.key === E ? c(f, a, d, v) : null;
        case et:
          return E = d._init, p(
            f,
            a,
            E(d._payload),
            v
          );
      }
      if (xn(d) || pn(d)) return E !== null ? null : h(f, a, d, v, null);
      wr(f, d);
    }
    return null;
  }
  function k(f, a, d, v, E) {
    if (typeof v == "string" && v !== "" || typeof v == "number") return f = f.get(d) || null, i(a, f, "" + v, E);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case sr:
          return f = f.get(v.key === null ? d : v.key) || null, s(a, f, v, E);
        case Ut:
          return f = f.get(v.key === null ? d : v.key) || null, c(a, f, v, E);
        case et:
          var C = v._init;
          return k(f, a, d, C(v._payload), E);
      }
      if (xn(v) || pn(v)) return f = f.get(d) || null, h(a, f, v, E, null);
      wr(a, v);
    }
    return null;
  }
  function S(f, a, d, v) {
    for (var E = null, C = null, N = a, P = a = 0, j = null; N !== null && P < d.length; P++) {
      N.index > P ? (j = N, N = null) : j = N.sibling;
      var R = p(f, N, d[P], v);
      if (R === null) {
        N === null && (N = j);
        break;
      }
      e && N && R.alternate === null && t(f, N), a = o(R, a, P), C === null ? E = R : C.sibling = R, C = R, N = j;
    }
    if (P === d.length) return n(f, N), V && Et(f, P), E;
    if (N === null) {
      for (; P < d.length; P++) N = m(f, d[P], v), N !== null && (a = o(N, a, P), C === null ? E = N : C.sibling = N, C = N);
      return V && Et(f, P), E;
    }
    for (N = r(f, N); P < d.length; P++) j = k(N, f, P, d[P], v), j !== null && (e && j.alternate !== null && N.delete(j.key === null ? P : j.key), a = o(j, a, P), C === null ? E = j : C.sibling = j, C = j);
    return e && N.forEach(function(ee) {
      return t(f, ee);
    }), V && Et(f, P), E;
  }
  function x(f, a, d, v) {
    var E = pn(d);
    if (typeof E != "function") throw Error(y(150));
    if (d = E.call(d), d == null) throw Error(y(151));
    for (var C = E = null, N = a, P = a = 0, j = null, R = d.next(); N !== null && !R.done; P++, R = d.next()) {
      N.index > P ? (j = N, N = null) : j = N.sibling;
      var ee = p(f, N, R.value, v);
      if (ee === null) {
        N === null && (N = j);
        break;
      }
      e && N && ee.alternate === null && t(f, N), a = o(ee, a, P), C === null ? E = ee : C.sibling = ee, C = ee, N = j;
    }
    if (R.done) return n(
      f,
      N
    ), V && Et(f, P), E;
    if (N === null) {
      for (; !R.done; P++, R = d.next()) R = m(f, R.value, v), R !== null && (a = o(R, a, P), C === null ? E = R : C.sibling = R, C = R);
      return V && Et(f, P), E;
    }
    for (N = r(f, N); !R.done; P++, R = d.next()) R = k(N, f, P, R.value, v), R !== null && (e && R.alternate !== null && N.delete(R.key === null ? P : R.key), a = o(R, a, P), C === null ? E = R : C.sibling = R, C = R);
    return e && N.forEach(function(kt) {
      return t(f, kt);
    }), V && Et(f, P), E;
  }
  function I(f, a, d, v) {
    if (typeof d == "object" && d !== null && d.type === $t && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case sr:
          e: {
            for (var E = d.key, C = a; C !== null; ) {
              if (C.key === E) {
                if (E = d.type, E === $t) {
                  if (C.tag === 7) {
                    n(f, C.sibling), a = l(C, d.props.children), a.return = f, f = a;
                    break e;
                  }
                } else if (C.elementType === E || typeof E == "object" && E !== null && E.$$typeof === et && wi(E) === C.type) {
                  n(f, C.sibling), a = l(C, d.props), a.ref = gn(f, C, d), a.return = f, f = a;
                  break e;
                }
                n(f, C);
                break;
              } else t(f, C);
              C = C.sibling;
            }
            d.type === $t ? (a = Tt(d.props.children, f.mode, v, d.key), a.return = f, f = a) : (v = Dr(d.type, d.key, d.props, null, f.mode, v), v.ref = gn(f, a, d), v.return = f, f = v);
          }
          return u(f);
        case Ut:
          e: {
            for (C = d.key; a !== null; ) {
              if (a.key === C) if (a.tag === 4 && a.stateNode.containerInfo === d.containerInfo && a.stateNode.implementation === d.implementation) {
                n(f, a.sibling), a = l(a, d.children || []), a.return = f, f = a;
                break e;
              } else {
                n(f, a);
                break;
              }
              else t(f, a);
              a = a.sibling;
            }
            a = Xl(d, f.mode, v), a.return = f, f = a;
          }
          return u(f);
        case et:
          return C = d._init, I(f, a, C(d._payload), v);
      }
      if (xn(d)) return S(f, a, d, v);
      if (pn(d)) return x(f, a, d, v);
      wr(f, d);
    }
    return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, a !== null && a.tag === 6 ? (n(f, a.sibling), a = l(a, d), a.return = f, f = a) : (n(f, a), a = Yl(d, f.mode, v), a.return = f, f = a), u(f)) : n(f, a);
  }
  return I;
}
var on = oa(!0), ua = oa(!1), Gr = gt(null), Zr = null, Yt = null, fu = null;
function du() {
  fu = Yt = Zr = null;
}
function pu(e) {
  var t = Gr.current;
  A(Gr), e._currentValue = t;
}
function Co(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function en(e, t) {
  Zr = e, fu = Yt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (me = !0), e.firstContext = null);
}
function ze(e) {
  var t = e._currentValue;
  if (fu !== e) if (e = { context: e, memoizedValue: t, next: null }, Yt === null) {
    if (Zr === null) throw Error(y(308));
    Yt = e, Zr.dependencies = { lanes: 0, firstContext: e };
  } else Yt = Yt.next = e;
  return t;
}
var Nt = null;
function mu(e) {
  Nt === null ? Nt = [e] : Nt.push(e);
}
function ia(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, mu(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ze(e, r);
}
function Ze(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var tt = !1;
function hu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function sa(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ye(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ft(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, M & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ze(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, mu(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ze(e, n);
}
function Tr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, eu(e, n);
  }
}
function ki(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, o = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var u = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        o === null ? l = o = u : o = o.next = u, n = n.next;
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
  tt = !1;
  var o = l.firstBaseUpdate, u = l.lastBaseUpdate, i = l.shared.pending;
  if (i !== null) {
    l.shared.pending = null;
    var s = i, c = s.next;
    s.next = null, u === null ? o = c : u.next = c, u = s;
    var h = e.alternate;
    h !== null && (h = h.updateQueue, i = h.lastBaseUpdate, i !== u && (i === null ? h.firstBaseUpdate = c : i.next = c, h.lastBaseUpdate = s));
  }
  if (o !== null) {
    var m = l.baseState;
    u = 0, h = c = s = null, i = o;
    do {
      var p = i.lane, k = i.eventTime;
      if ((r & p) === p) {
        h !== null && (h = h.next = {
          eventTime: k,
          lane: 0,
          tag: i.tag,
          payload: i.payload,
          callback: i.callback,
          next: null
        });
        e: {
          var S = e, x = i;
          switch (p = t, k = n, x.tag) {
            case 1:
              if (S = x.payload, typeof S == "function") {
                m = S.call(k, m, p);
                break e;
              }
              m = S;
              break e;
            case 3:
              S.flags = S.flags & -65537 | 128;
            case 0:
              if (S = x.payload, p = typeof S == "function" ? S.call(k, m, p) : S, p == null) break e;
              m = Q({}, m, p);
              break e;
            case 2:
              tt = !0;
          }
        }
        i.callback !== null && i.lane !== 0 && (e.flags |= 64, p = l.effects, p === null ? l.effects = [i] : p.push(i));
      } else k = { eventTime: k, lane: p, tag: i.tag, payload: i.payload, callback: i.callback, next: null }, h === null ? (c = h = k, s = m) : h = h.next = k, u |= p;
      if (i = i.next, i === null) {
        if (i = l.shared.pending, i === null) break;
        p = i, i = p.next, p.next = null, l.lastBaseUpdate = p, l.shared.pending = null;
      }
    } while (!0);
    if (h === null && (s = m), l.baseState = s, l.firstBaseUpdate = c, l.lastBaseUpdate = h, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        u |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Ot |= u, e.lanes = u, e.memoizedState = m;
  }
}
function Si(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(y(191, l));
      l.call(r);
    }
  }
}
var tr = {}, Ve = gt(tr), Qn = gt(tr), Kn = gt(tr);
function Pt(e) {
  if (e === tr) throw Error(y(174));
  return e;
}
function vu(e, t) {
  switch (F(Kn, t), F(Qn, e), F(Ve, tr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : lo(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = lo(t, e);
  }
  A(Ve), F(Ve, t);
}
function un() {
  A(Ve), A(Qn), A(Kn);
}
function aa(e) {
  Pt(Kn.current);
  var t = Pt(Ve.current), n = lo(t, e.type);
  t !== n && (F(Qn, e), F(Ve, n));
}
function yu(e) {
  Qn.current === e && (A(Ve), A(Qn));
}
var B = gt(0);
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
var Vl = [];
function gu() {
  for (var e = 0; e < Vl.length; e++) Vl[e]._workInProgressVersionPrimary = null;
  Vl.length = 0;
}
var Lr = qe.ReactCurrentDispatcher, Wl = qe.ReactCurrentBatchConfig, Rt = 0, H = null, G = null, q = null, br = !1, Ln = !1, Yn = 0, td = 0;
function le() {
  throw Error(y(321));
}
function wu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ie(e[n], t[n])) return !1;
  return !0;
}
function ku(e, t, n, r, l, o) {
  if (Rt = o, H = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Lr.current = e === null || e.memoizedState === null ? od : ud, e = n(r, l), Ln) {
    o = 0;
    do {
      if (Ln = !1, Yn = 0, 25 <= o) throw Error(y(301));
      o += 1, q = G = null, t.updateQueue = null, Lr.current = id, e = n(r, l);
    } while (Ln);
  }
  if (Lr.current = el, t = G !== null && G.next !== null, Rt = 0, q = G = H = null, br = !1, t) throw Error(y(300));
  return e;
}
function Su() {
  var e = Yn !== 0;
  return Yn = 0, e;
}
function Ue() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return q === null ? H.memoizedState = q = e : q = q.next = e, q;
}
function Te() {
  if (G === null) {
    var e = H.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = G.next;
  var t = q === null ? H.memoizedState : q.next;
  if (t !== null) q = t, G = e;
  else {
    if (e === null) throw Error(y(310));
    G = e, e = { memoizedState: G.memoizedState, baseState: G.baseState, baseQueue: G.baseQueue, queue: G.queue, next: null }, q === null ? H.memoizedState = q = e : q = q.next = e;
  }
  return q;
}
function Xn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Bl(e) {
  var t = Te(), n = t.queue;
  if (n === null) throw Error(y(311));
  n.lastRenderedReducer = e;
  var r = G, l = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var u = l.next;
      l.next = o.next, o.next = u;
    }
    r.baseQueue = l = o, n.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var i = u = null, s = null, c = o;
    do {
      var h = c.lane;
      if ((Rt & h) === h) s !== null && (s = s.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var m = {
          lane: h,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        s === null ? (i = s = m, u = r) : s = s.next = m, H.lanes |= h, Ot |= h;
      }
      c = c.next;
    } while (c !== null && c !== o);
    s === null ? u = r : s.next = i, Ie(r, t.memoizedState) || (me = !0), t.memoizedState = r, t.baseState = u, t.baseQueue = s, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, H.lanes |= o, Ot |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Hl(e) {
  var t = Te(), n = t.queue;
  if (n === null) throw Error(y(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var u = l = l.next;
    do
      o = e(o, u.action), u = u.next;
    while (u !== l);
    Ie(o, t.memoizedState) || (me = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function ca() {
}
function fa(e, t) {
  var n = H, r = Te(), l = t(), o = !Ie(r.memoizedState, l);
  if (o && (r.memoizedState = l, me = !0), r = r.queue, xu(ma.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || q !== null && q.memoizedState.tag & 1) {
    if (n.flags |= 2048, Gn(9, pa.bind(null, n, r, l, t), void 0, null), b === null) throw Error(y(349));
    Rt & 30 || da(n, t, l);
  }
  return l;
}
function da(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = H.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, H.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function pa(e, t, n, r) {
  t.value = n, t.getSnapshot = r, ha(t) && va(e);
}
function ma(e, t, n) {
  return n(function() {
    ha(t) && va(e);
  });
}
function ha(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ie(e, n);
  } catch {
    return !0;
  }
}
function va(e) {
  var t = Ze(e, 1);
  t !== null && De(t, e, 1, -1);
}
function xi(e) {
  var t = Ue();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Xn, lastRenderedState: e }, t.queue = e, e = e.dispatch = ld.bind(null, H, e), [t.memoizedState, e];
}
function Gn(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = H.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, H.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function ya() {
  return Te().memoizedState;
}
function jr(e, t, n, r) {
  var l = Ue();
  H.flags |= e, l.memoizedState = Gn(1 | t, n, void 0, r === void 0 ? null : r);
}
function pl(e, t, n, r) {
  var l = Te();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (G !== null) {
    var u = G.memoizedState;
    if (o = u.destroy, r !== null && wu(r, u.deps)) {
      l.memoizedState = Gn(t, n, o, r);
      return;
    }
  }
  H.flags |= e, l.memoizedState = Gn(1 | t, n, o, r);
}
function Ei(e, t) {
  return jr(8390656, 8, e, t);
}
function xu(e, t) {
  return pl(2048, 8, e, t);
}
function ga(e, t) {
  return pl(4, 2, e, t);
}
function wa(e, t) {
  return pl(4, 4, e, t);
}
function ka(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Sa(e, t, n) {
  return n = n != null ? n.concat([e]) : null, pl(4, 4, ka.bind(null, t, e), n);
}
function Eu() {
}
function xa(e, t) {
  var n = Te();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && wu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Ea(e, t) {
  var n = Te();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && wu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function _a(e, t, n) {
  return Rt & 21 ? (Ie(n, t) || (n = Ts(), H.lanes |= n, Ot |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, me = !0), e.memoizedState = n);
}
function nd(e, t) {
  var n = D;
  D = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Wl.transition;
  Wl.transition = {};
  try {
    e(!1), t();
  } finally {
    D = n, Wl.transition = r;
  }
}
function Ca() {
  return Te().memoizedState;
}
function rd(e, t, n) {
  var r = pt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Na(e)) Pa(t, n);
  else if (n = ia(e, t, n, r), n !== null) {
    var l = ae();
    De(n, e, r, l), za(n, t, r);
  }
}
function ld(e, t, n) {
  var r = pt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Na(e)) Pa(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var u = t.lastRenderedState, i = o(u, n);
      if (l.hasEagerState = !0, l.eagerState = i, Ie(i, u)) {
        var s = t.interleaved;
        s === null ? (l.next = l, mu(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = ia(e, t, l, r), n !== null && (l = ae(), De(n, e, r, l), za(n, t, r));
  }
}
function Na(e) {
  var t = e.alternate;
  return e === H || t !== null && t === H;
}
function Pa(e, t) {
  Ln = br = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function za(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, eu(e, n);
  }
}
var el = { readContext: ze, useCallback: le, useContext: le, useEffect: le, useImperativeHandle: le, useInsertionEffect: le, useLayoutEffect: le, useMemo: le, useReducer: le, useRef: le, useState: le, useDebugValue: le, useDeferredValue: le, useTransition: le, useMutableSource: le, useSyncExternalStore: le, useId: le, unstable_isNewReconciler: !1 }, od = { readContext: ze, useCallback: function(e, t) {
  return Ue().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: ze, useEffect: Ei, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, jr(
    4194308,
    4,
    ka.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return jr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return jr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ue();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ue();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = rd.bind(null, H, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ue();
  return e = { current: e }, t.memoizedState = e;
}, useState: xi, useDebugValue: Eu, useDeferredValue: function(e) {
  return Ue().memoizedState = e;
}, useTransition: function() {
  var e = xi(!1), t = e[0];
  return e = nd.bind(null, e[1]), Ue().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = H, l = Ue();
  if (V) {
    if (n === void 0) throw Error(y(407));
    n = n();
  } else {
    if (n = t(), b === null) throw Error(y(349));
    Rt & 30 || da(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Ei(ma.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Gn(9, pa.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Ue(), t = b.identifierPrefix;
  if (V) {
    var n = Ke, r = Qe;
    n = (r & ~(1 << 32 - Me(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Yn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = td++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, ud = {
  readContext: ze,
  useCallback: xa,
  useContext: ze,
  useEffect: xu,
  useImperativeHandle: Sa,
  useInsertionEffect: ga,
  useLayoutEffect: wa,
  useMemo: Ea,
  useReducer: Bl,
  useRef: ya,
  useState: function() {
    return Bl(Xn);
  },
  useDebugValue: Eu,
  useDeferredValue: function(e) {
    var t = Te();
    return _a(t, G.memoizedState, e);
  },
  useTransition: function() {
    var e = Bl(Xn)[0], t = Te().memoizedState;
    return [e, t];
  },
  useMutableSource: ca,
  useSyncExternalStore: fa,
  useId: Ca,
  unstable_isNewReconciler: !1
}, id = { readContext: ze, useCallback: xa, useContext: ze, useEffect: xu, useImperativeHandle: Sa, useInsertionEffect: ga, useLayoutEffect: wa, useMemo: Ea, useReducer: Hl, useRef: ya, useState: function() {
  return Hl(Xn);
}, useDebugValue: Eu, useDeferredValue: function(e) {
  var t = Te();
  return G === null ? t.memoizedState = e : _a(t, G.memoizedState, e);
}, useTransition: function() {
  var e = Hl(Xn)[0], t = Te().memoizedState;
  return [e, t];
}, useMutableSource: ca, useSyncExternalStore: fa, useId: Ca, unstable_isNewReconciler: !1 };
function je(e, t) {
  if (e && e.defaultProps) {
    t = Q({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function No(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : Q({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var ml = { isMounted: function(e) {
  return (e = e._reactInternals) ? It(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = ae(), l = pt(e), o = Ye(r, l);
  o.payload = t, n != null && (o.callback = n), t = ft(e, o, l), t !== null && (De(t, e, l, r), Tr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = ae(), l = pt(e), o = Ye(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = ft(e, o, l), t !== null && (De(t, e, l, r), Tr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ae(), r = pt(e), l = Ye(n, r);
  l.tag = 2, t != null && (l.callback = t), t = ft(e, l, r), t !== null && (De(t, e, r, n), Tr(t, e, r));
} };
function _i(e, t, n, r, l, o, u) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, u) : t.prototype && t.prototype.isPureReactComponent ? !Vn(n, r) || !Vn(l, o) : !0;
}
function Ta(e, t, n) {
  var r = !1, l = vt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = ze(o) : (l = ve(t) ? Lt : ie.current, r = t.contextTypes, o = (r = r != null) ? rn(e, l) : vt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ml, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Ci(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && ml.enqueueReplaceState(t, t.state, null);
}
function Po(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, hu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = ze(o) : (o = ve(t) ? Lt : ie.current, l.context = rn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (No(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && ml.enqueueReplaceState(l, l.state, null), Jr(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function sn(e, t) {
  try {
    var n = "", r = t;
    do
      n += Mc(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Ql(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function zo(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var sd = typeof WeakMap == "function" ? WeakMap : Map;
function La(e, t, n) {
  n = Ye(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    nl || (nl = !0, Uo = r), zo(e, t);
  }, n;
}
function ja(e, t, n) {
  n = Ye(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      zo(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    zo(e, t), typeof r != "function" && (dt === null ? dt = /* @__PURE__ */ new Set([this]) : dt.add(this));
    var u = t.stack;
    this.componentDidCatch(t.value, { componentStack: u !== null ? u : "" });
  }), n;
}
function Ni(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new sd();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = xd.bind(null, e, t, n), t.then(e, e));
}
function Pi(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function zi(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ye(-1, 1), t.tag = 2, ft(n, t, 1))), n.lanes |= 1), e);
}
var ad = qe.ReactCurrentOwner, me = !1;
function se(e, t, n, r) {
  t.child = e === null ? ua(t, null, n, r) : on(t, e.child, n, r);
}
function Ti(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return en(t, l), r = ku(e, t, n, r, o, l), n = Su(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Je(e, t, l)) : (V && n && su(t), t.flags |= 1, se(e, t, r, l), t.child);
}
function Li(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !ju(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Ra(e, t, o, r, l)) : (e = Dr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var u = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Vn, n(u, r) && e.ref === t.ref) return Je(e, t, l);
  }
  return t.flags |= 1, e = mt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Ra(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Vn(o, r) && e.ref === t.ref) if (me = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (me = !0);
    else return t.lanes = e.lanes, Je(e, t, l);
  }
  return To(e, t, n, r, l);
}
function Oa(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, F(Gt, ge), ge |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, F(Gt, ge), ge |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, F(Gt, ge), ge |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, F(Gt, ge), ge |= r;
  return se(e, t, l, n), t.child;
}
function Ma(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function To(e, t, n, r, l) {
  var o = ve(n) ? Lt : ie.current;
  return o = rn(t, o), en(t, l), n = ku(e, t, n, r, o, l), r = Su(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Je(e, t, l)) : (V && r && su(t), t.flags |= 1, se(e, t, n, l), t.child);
}
function ji(e, t, n, r, l) {
  if (ve(n)) {
    var o = !0;
    Kr(t);
  } else o = !1;
  if (en(t, l), t.stateNode === null) Rr(e, t), Ta(t, n, r), Po(t, n, r, l), r = !0;
  else if (e === null) {
    var u = t.stateNode, i = t.memoizedProps;
    u.props = i;
    var s = u.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = ze(c) : (c = ve(n) ? Lt : ie.current, c = rn(t, c));
    var h = n.getDerivedStateFromProps, m = typeof h == "function" || typeof u.getSnapshotBeforeUpdate == "function";
    m || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== r || s !== c) && Ci(t, u, r, c), tt = !1;
    var p = t.memoizedState;
    u.state = p, Jr(t, r, u, l), s = t.memoizedState, i !== r || p !== s || he.current || tt ? (typeof h == "function" && (No(t, n, h, r), s = t.memoizedState), (i = tt || _i(t, n, i, r, p, s, c)) ? (m || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), u.props = r, u.state = s, u.context = c, r = i) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    u = t.stateNode, sa(e, t), i = t.memoizedProps, c = t.type === t.elementType ? i : je(t.type, i), u.props = c, m = t.pendingProps, p = u.context, s = n.contextType, typeof s == "object" && s !== null ? s = ze(s) : (s = ve(n) ? Lt : ie.current, s = rn(t, s));
    var k = n.getDerivedStateFromProps;
    (h = typeof k == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== m || p !== s) && Ci(t, u, r, s), tt = !1, p = t.memoizedState, u.state = p, Jr(t, r, u, l);
    var S = t.memoizedState;
    i !== m || p !== S || he.current || tt ? (typeof k == "function" && (No(t, n, k, r), S = t.memoizedState), (c = tt || _i(t, n, c, r, p, S, s) || !1) ? (h || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(r, S, s), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(r, S, s)), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = S), u.props = r, u.state = S, u.context = s, r = c) : (typeof u.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Lo(e, t, n, r, o, l);
}
function Lo(e, t, n, r, l, o) {
  Ma(e, t);
  var u = (t.flags & 128) !== 0;
  if (!r && !u) return l && vi(t, n, !1), Je(e, t, o);
  r = t.stateNode, ad.current = t;
  var i = u && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && u ? (t.child = on(t, e.child, null, o), t.child = on(t, null, i, o)) : se(e, t, i, o), t.memoizedState = r.state, l && vi(t, n, !0), t.child;
}
function Da(e) {
  var t = e.stateNode;
  t.pendingContext ? hi(e, t.pendingContext, t.pendingContext !== t.context) : t.context && hi(e, t.context, !1), vu(e, t.containerInfo);
}
function Ri(e, t, n, r, l) {
  return ln(), cu(l), t.flags |= 256, se(e, t, n, r), t.child;
}
var jo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ro(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ia(e, t, n) {
  var r = t.pendingProps, l = B.current, o = !1, u = (t.flags & 128) !== 0, i;
  if ((i = u) || (i = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), i ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), F(B, l & 1), e === null)
    return _o(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (u = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, u = { mode: "hidden", children: u }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = u) : o = yl(u, r, 0, null), e = Tt(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Ro(n), t.memoizedState = jo, e) : _u(t, u));
  if (l = e.memoizedState, l !== null && (i = l.dehydrated, i !== null)) return cd(e, t, u, r, i, l, n);
  if (o) {
    o = r.fallback, u = t.mode, l = e.child, i = l.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(u & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = mt(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), i !== null ? o = mt(i, o) : (o = Tt(o, u, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, u = e.child.memoizedState, u = u === null ? Ro(n) : { baseLanes: u.baseLanes | n, cachePool: null, transitions: u.transitions }, o.memoizedState = u, o.childLanes = e.childLanes & ~n, t.memoizedState = jo, r;
  }
  return o = e.child, e = o.sibling, r = mt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function _u(e, t) {
  return t = yl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function kr(e, t, n, r) {
  return r !== null && cu(r), on(t, e.child, null, n), e = _u(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function cd(e, t, n, r, l, o, u) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Ql(Error(y(422))), kr(e, t, u, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = yl({ mode: "visible", children: r.children }, l, 0, null), o = Tt(o, l, u, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && on(t, e.child, null, u), t.child.memoizedState = Ro(u), t.memoizedState = jo, o);
  if (!(t.mode & 1)) return kr(e, t, u, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var i = r.dgst;
    return r = i, o = Error(y(419)), r = Ql(o, r, void 0), kr(e, t, u, r);
  }
  if (i = (u & e.childLanes) !== 0, me || i) {
    if (r = b, r !== null) {
      switch (u & -u) {
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
      l = l & (r.suspendedLanes | u) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Ze(e, l), De(r, e, l, -1));
    }
    return Lu(), r = Ql(Error(y(421))), kr(e, t, u, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Ed.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, we = ct(l.nextSibling), ke = t, V = !0, Oe = null, e !== null && (_e[Ce++] = Qe, _e[Ce++] = Ke, _e[Ce++] = jt, Qe = e.id, Ke = e.overflow, jt = t), t = _u(t, r.children), t.flags |= 4096, t);
}
function Oi(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Co(e.return, t, n);
}
function Kl(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function Fa(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (se(e, t, r.children, n), r = B.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Oi(e, n, t);
      else if (e.tag === 19) Oi(e, n, t);
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
  if (F(B, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && qr(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Kl(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && qr(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Kl(t, !0, n, null, o);
      break;
    case "together":
      Kl(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Rr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Je(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Ot |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(y(153));
  if (t.child !== null) {
    for (e = t.child, n = mt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = mt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function fd(e, t, n) {
  switch (t.tag) {
    case 3:
      Da(t), ln();
      break;
    case 5:
      aa(t);
      break;
    case 1:
      ve(t.type) && Kr(t);
      break;
    case 4:
      vu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      F(Gr, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (F(B, B.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Ia(e, t, n) : (F(B, B.current & 1), e = Je(e, t, n), e !== null ? e.sibling : null);
      F(B, B.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Fa(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), F(B, B.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Oa(e, t, n);
  }
  return Je(e, t, n);
}
var Ua, Oo, $a, Aa;
Ua = function(e, t) {
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
Oo = function() {
};
$a = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Pt(Ve.current);
    var o = null;
    switch (n) {
      case "input":
        l = eo(e, l), r = eo(e, r), o = [];
        break;
      case "select":
        l = Q({}, l, { value: void 0 }), r = Q({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = ro(e, l), r = ro(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Hr);
    }
    oo(n, r);
    var u;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var i = l[c];
      for (u in i) i.hasOwnProperty(u) && (n || (n = {}), n[u] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Mn.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var s = r[c];
      if (i = l != null ? l[c] : void 0, r.hasOwnProperty(c) && s !== i && (s != null || i != null)) if (c === "style") if (i) {
        for (u in i) !i.hasOwnProperty(u) || s && s.hasOwnProperty(u) || (n || (n = {}), n[u] = "");
        for (u in s) s.hasOwnProperty(u) && i[u] !== s[u] && (n || (n = {}), n[u] = s[u]);
      } else n || (o || (o = []), o.push(
        c,
        n
      )), n = s;
      else c === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, i = i ? i.__html : void 0, s != null && i !== s && (o = o || []).push(c, s)) : c === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(c, "" + s) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Mn.hasOwnProperty(c) ? (s != null && c === "onScroll" && $("scroll", e), o || i === s || (o = [])) : (o = o || []).push(c, s));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
Aa = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function wn(e, t) {
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
function oe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function dd(e, t, n) {
  var r = t.pendingProps;
  switch (au(t), t.tag) {
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
      return oe(t), null;
    case 1:
      return ve(t.type) && Qr(), oe(t), null;
    case 3:
      return r = t.stateNode, un(), A(he), A(ie), gu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (gr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Oe !== null && (Vo(Oe), Oe = null))), Oo(e, t), oe(t), null;
    case 5:
      yu(t);
      var l = Pt(Kn.current);
      if (n = t.type, e !== null && t.stateNode != null) $a(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(y(166));
          return oe(t), null;
        }
        if (e = Pt(Ve.current), gr(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[$e] = t, r[Hn] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              $("cancel", r), $("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              $("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < _n.length; l++) $(_n[l], r);
              break;
            case "source":
              $("error", r);
              break;
            case "img":
            case "image":
            case "link":
              $(
                "error",
                r
              ), $("load", r);
              break;
            case "details":
              $("toggle", r);
              break;
            case "input":
              Wu(r, o), $("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, $("invalid", r);
              break;
            case "textarea":
              Hu(r, o), $("invalid", r);
          }
          oo(n, o), l = null;
          for (var u in o) if (o.hasOwnProperty(u)) {
            var i = o[u];
            u === "children" ? typeof i == "string" ? r.textContent !== i && (o.suppressHydrationWarning !== !0 && yr(r.textContent, i, e), l = ["children", i]) : typeof i == "number" && r.textContent !== "" + i && (o.suppressHydrationWarning !== !0 && yr(
              r.textContent,
              i,
              e
            ), l = ["children", "" + i]) : Mn.hasOwnProperty(u) && i != null && u === "onScroll" && $("scroll", r);
          }
          switch (n) {
            case "input":
              ar(r), Bu(r, o, !0);
              break;
            case "textarea":
              ar(r), Qu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Hr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          u = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = ms(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = u.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = u.createElement(n, { is: r.is }) : (e = u.createElement(n), n === "select" && (u = e, r.multiple ? u.multiple = !0 : r.size && (u.size = r.size))) : e = u.createElementNS(e, n), e[$e] = t, e[Hn] = r, Ua(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (u = uo(n, r), n) {
              case "dialog":
                $("cancel", e), $("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                $("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < _n.length; l++) $(_n[l], e);
                l = r;
                break;
              case "source":
                $("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                $(
                  "error",
                  e
                ), $("load", e), l = r;
                break;
              case "details":
                $("toggle", e), l = r;
                break;
              case "input":
                Wu(e, r), l = eo(e, r), $("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = Q({}, r, { value: void 0 }), $("invalid", e);
                break;
              case "textarea":
                Hu(e, r), l = ro(e, r), $("invalid", e);
                break;
              default:
                l = r;
            }
            oo(n, l), i = l;
            for (o in i) if (i.hasOwnProperty(o)) {
              var s = i[o];
              o === "style" ? ys(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && hs(e, s)) : o === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Dn(e, s) : typeof s == "number" && Dn(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Mn.hasOwnProperty(o) ? s != null && o === "onScroll" && $("scroll", e) : s != null && Xo(e, o, s, u));
            }
            switch (n) {
              case "input":
                ar(e), Bu(e, r, !1);
                break;
              case "textarea":
                ar(e), Qu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + ht(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? Zt(e, !!r.multiple, o, !1) : r.defaultValue != null && Zt(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Hr);
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
      return oe(t), null;
    case 6:
      if (e && t.stateNode != null) Aa(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(y(166));
        if (n = Pt(Kn.current), Pt(Ve.current), gr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[$e] = t, (o = r.nodeValue !== n) && (e = ke, e !== null)) switch (e.tag) {
            case 3:
              yr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && yr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[$e] = t, t.stateNode = r;
      }
      return oe(t), null;
    case 13:
      if (A(B), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (V && we !== null && t.mode & 1 && !(t.flags & 128)) la(), ln(), t.flags |= 98560, o = !1;
        else if (o = gr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(y(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(y(317));
            o[$e] = t;
          } else ln(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          oe(t), o = !1;
        } else Oe !== null && (Vo(Oe), Oe = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || B.current & 1 ? Z === 0 && (Z = 3) : Lu())), t.updateQueue !== null && (t.flags |= 4), oe(t), null);
    case 4:
      return un(), Oo(e, t), e === null && Wn(t.stateNode.containerInfo), oe(t), null;
    case 10:
      return pu(t.type._context), oe(t), null;
    case 17:
      return ve(t.type) && Qr(), oe(t), null;
    case 19:
      if (A(B), o = t.memoizedState, o === null) return oe(t), null;
      if (r = (t.flags & 128) !== 0, u = o.rendering, u === null) if (r) wn(o, !1);
      else {
        if (Z !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (u = qr(e), u !== null) {
            for (t.flags |= 128, wn(o, !1), r = u.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, u = o.alternate, u === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = u.childLanes, o.lanes = u.lanes, o.child = u.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = u.memoizedProps, o.memoizedState = u.memoizedState, o.updateQueue = u.updateQueue, o.type = u.type, e = u.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return F(B, B.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && Y() > an && (t.flags |= 128, r = !0, wn(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = qr(u), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), wn(o, !0), o.tail === null && o.tailMode === "hidden" && !u.alternate && !V) return oe(t), null;
        } else 2 * Y() - o.renderingStartTime > an && n !== 1073741824 && (t.flags |= 128, r = !0, wn(o, !1), t.lanes = 4194304);
        o.isBackwards ? (u.sibling = t.child, t.child = u) : (n = o.last, n !== null ? n.sibling = u : t.child = u, o.last = u);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Y(), t.sibling = null, n = B.current, F(B, r ? n & 1 | 2 : n & 1), t) : (oe(t), null);
    case 22:
    case 23:
      return Tu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ge & 1073741824 && (oe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : oe(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(y(156, t.tag));
}
function pd(e, t) {
  switch (au(t), t.tag) {
    case 1:
      return ve(t.type) && Qr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return un(), A(he), A(ie), gu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return yu(t), null;
    case 13:
      if (A(B), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(y(340));
        ln();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return A(B), null;
    case 4:
      return un(), null;
    case 10:
      return pu(t.type._context), null;
    case 22:
    case 23:
      return Tu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Sr = !1, ue = !1, md = typeof WeakSet == "function" ? WeakSet : Set, _ = null;
function Xt(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    K(e, t, r);
  }
  else n.current = null;
}
function Mo(e, t, n) {
  try {
    n();
  } catch (r) {
    K(e, t, r);
  }
}
var Mi = !1;
function hd(e, t) {
  if (yo = Vr, e = Qs(), iu(e)) {
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
        var u = 0, i = -1, s = -1, c = 0, h = 0, m = e, p = null;
        t: for (; ; ) {
          for (var k; m !== n || l !== 0 && m.nodeType !== 3 || (i = u + l), m !== o || r !== 0 && m.nodeType !== 3 || (s = u + r), m.nodeType === 3 && (u += m.nodeValue.length), (k = m.firstChild) !== null; )
            p = m, m = k;
          for (; ; ) {
            if (m === e) break t;
            if (p === n && ++c === l && (i = u), p === o && ++h === r && (s = u), (k = m.nextSibling) !== null) break;
            m = p, p = m.parentNode;
          }
          m = k;
        }
        n = i === -1 || s === -1 ? null : { start: i, end: s };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (go = { focusedElem: e, selectionRange: n }, Vr = !1, _ = t; _ !== null; ) if (t = _, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, _ = e;
  else for (; _ !== null; ) {
    t = _;
    try {
      var S = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (S !== null) {
            var x = S.memoizedProps, I = S.memoizedState, f = t.stateNode, a = f.getSnapshotBeforeUpdate(t.elementType === t.type ? x : je(t.type, x), I);
            f.__reactInternalSnapshotBeforeUpdate = a;
          }
          break;
        case 3:
          var d = t.stateNode.containerInfo;
          d.nodeType === 1 ? d.textContent = "" : d.nodeType === 9 && d.documentElement && d.removeChild(d.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(y(163));
      }
    } catch (v) {
      K(t, t.return, v);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, _ = e;
      break;
    }
    _ = t.return;
  }
  return S = Mi, Mi = !1, S;
}
function jn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Mo(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function hl(e, t) {
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
function Do(e) {
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
function Va(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Va(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[$e], delete t[Hn], delete t[So], delete t[Jf], delete t[qf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Wa(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Di(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Wa(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Io(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Hr));
  else if (r !== 4 && (e = e.child, e !== null)) for (Io(e, t, n), e = e.sibling; e !== null; ) Io(e, t, n), e = e.sibling;
}
function Fo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Fo(e, t, n), e = e.sibling; e !== null; ) Fo(e, t, n), e = e.sibling;
}
var te = null, Re = !1;
function be(e, t, n) {
  for (n = n.child; n !== null; ) Ba(e, t, n), n = n.sibling;
}
function Ba(e, t, n) {
  if (Ae && typeof Ae.onCommitFiberUnmount == "function") try {
    Ae.onCommitFiberUnmount(il, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ue || Xt(n, t);
    case 6:
      var r = te, l = Re;
      te = null, be(e, t, n), te = r, Re = l, te !== null && (Re ? (e = te, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : te.removeChild(n.stateNode));
      break;
    case 18:
      te !== null && (Re ? (e = te, n = n.stateNode, e.nodeType === 8 ? $l(e.parentNode, n) : e.nodeType === 1 && $l(e, n), $n(e)) : $l(te, n.stateNode));
      break;
    case 4:
      r = te, l = Re, te = n.stateNode.containerInfo, Re = !0, be(e, t, n), te = r, Re = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ue && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, u = o.destroy;
          o = o.tag, u !== void 0 && (o & 2 || o & 4) && Mo(n, t, u), l = l.next;
        } while (l !== r);
      }
      be(e, t, n);
      break;
    case 1:
      if (!ue && (Xt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (i) {
        K(n, t, i);
      }
      be(e, t, n);
      break;
    case 21:
      be(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ue = (r = ue) || n.memoizedState !== null, be(e, t, n), ue = r) : be(e, t, n);
      break;
    default:
      be(e, t, n);
  }
}
function Ii(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new md()), t.forEach(function(r) {
      var l = _d.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Le(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, u = t, i = u;
      e: for (; i !== null; ) {
        switch (i.tag) {
          case 5:
            te = i.stateNode, Re = !1;
            break e;
          case 3:
            te = i.stateNode.containerInfo, Re = !0;
            break e;
          case 4:
            te = i.stateNode.containerInfo, Re = !0;
            break e;
        }
        i = i.return;
      }
      if (te === null) throw Error(y(160));
      Ba(o, u, l), te = null, Re = !1;
      var s = l.alternate;
      s !== null && (s.return = null), l.return = null;
    } catch (c) {
      K(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Ha(t, e), t = t.sibling;
}
function Ha(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Le(t, e), Fe(e), r & 4) {
        try {
          jn(3, e, e.return), hl(3, e);
        } catch (x) {
          K(e, e.return, x);
        }
        try {
          jn(5, e, e.return);
        } catch (x) {
          K(e, e.return, x);
        }
      }
      break;
    case 1:
      Le(t, e), Fe(e), r & 512 && n !== null && Xt(n, n.return);
      break;
    case 5:
      if (Le(t, e), Fe(e), r & 512 && n !== null && Xt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Dn(l, "");
        } catch (x) {
          K(e, e.return, x);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, u = n !== null ? n.memoizedProps : o, i = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          i === "input" && o.type === "radio" && o.name != null && ds(l, o), uo(i, u);
          var c = uo(i, o);
          for (u = 0; u < s.length; u += 2) {
            var h = s[u], m = s[u + 1];
            h === "style" ? ys(l, m) : h === "dangerouslySetInnerHTML" ? hs(l, m) : h === "children" ? Dn(l, m) : Xo(l, h, m, c);
          }
          switch (i) {
            case "input":
              to(l, o);
              break;
            case "textarea":
              ps(l, o);
              break;
            case "select":
              var p = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var k = o.value;
              k != null ? Zt(l, !!o.multiple, k, !1) : p !== !!o.multiple && (o.defaultValue != null ? Zt(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : Zt(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Hn] = o;
        } catch (x) {
          K(e, e.return, x);
        }
      }
      break;
    case 6:
      if (Le(t, e), Fe(e), r & 4) {
        if (e.stateNode === null) throw Error(y(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (x) {
          K(e, e.return, x);
        }
      }
      break;
    case 3:
      if (Le(t, e), Fe(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        $n(t.containerInfo);
      } catch (x) {
        K(e, e.return, x);
      }
      break;
    case 4:
      Le(t, e), Fe(e);
      break;
    case 13:
      Le(t, e), Fe(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Pu = Y())), r & 4 && Ii(e);
      break;
    case 22:
      if (h = n !== null && n.memoizedState !== null, e.mode & 1 ? (ue = (c = ue) || h, Le(t, e), ue = c) : Le(t, e), Fe(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !h && e.mode & 1) for (_ = e, h = e.child; h !== null; ) {
          for (m = _ = h; _ !== null; ) {
            switch (p = _, k = p.child, p.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                jn(4, p, p.return);
                break;
              case 1:
                Xt(p, p.return);
                var S = p.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  r = p, n = p.return;
                  try {
                    t = r, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount();
                  } catch (x) {
                    K(r, n, x);
                  }
                }
                break;
              case 5:
                Xt(p, p.return);
                break;
              case 22:
                if (p.memoizedState !== null) {
                  Ui(m);
                  continue;
                }
            }
            k !== null ? (k.return = p, _ = k) : Ui(m);
          }
          h = h.sibling;
        }
        e: for (h = null, m = e; ; ) {
          if (m.tag === 5) {
            if (h === null) {
              h = m;
              try {
                l = m.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (i = m.stateNode, s = m.memoizedProps.style, u = s != null && s.hasOwnProperty("display") ? s.display : null, i.style.display = vs("display", u));
              } catch (x) {
                K(e, e.return, x);
              }
            }
          } else if (m.tag === 6) {
            if (h === null) try {
              m.stateNode.nodeValue = c ? "" : m.memoizedProps;
            } catch (x) {
              K(e, e.return, x);
            }
          } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
            m.child.return = m, m = m.child;
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            h === m && (h = null), m = m.return;
          }
          h === m && (h = null), m.sibling.return = m.return, m = m.sibling;
        }
      }
      break;
    case 19:
      Le(t, e), Fe(e), r & 4 && Ii(e);
      break;
    case 21:
      break;
    default:
      Le(
        t,
        e
      ), Fe(e);
  }
}
function Fe(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Wa(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(y(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Dn(l, ""), r.flags &= -33);
          var o = Di(e);
          Fo(e, o, l);
          break;
        case 3:
        case 4:
          var u = r.stateNode.containerInfo, i = Di(e);
          Io(e, i, u);
          break;
        default:
          throw Error(y(161));
      }
    } catch (s) {
      K(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function vd(e, t, n) {
  _ = e, Qa(e);
}
function Qa(e, t, n) {
  for (var r = (e.mode & 1) !== 0; _ !== null; ) {
    var l = _, o = l.child;
    if (l.tag === 22 && r) {
      var u = l.memoizedState !== null || Sr;
      if (!u) {
        var i = l.alternate, s = i !== null && i.memoizedState !== null || ue;
        i = Sr;
        var c = ue;
        if (Sr = u, (ue = s) && !c) for (_ = l; _ !== null; ) u = _, s = u.child, u.tag === 22 && u.memoizedState !== null ? $i(l) : s !== null ? (s.return = u, _ = s) : $i(l);
        for (; o !== null; ) _ = o, Qa(o), o = o.sibling;
        _ = l, Sr = i, ue = c;
      }
      Fi(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, _ = o) : Fi(e);
  }
}
function Fi(e) {
  for (; _ !== null; ) {
    var t = _;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ue || hl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !ue) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : je(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Si(t, o, r);
            break;
          case 3:
            var u = t.updateQueue;
            if (u !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              Si(t, u, n);
            }
            break;
          case 5:
            var i = t.stateNode;
            if (n === null && t.flags & 4) {
              n = i;
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
              var c = t.alternate;
              if (c !== null) {
                var h = c.memoizedState;
                if (h !== null) {
                  var m = h.dehydrated;
                  m !== null && $n(m);
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
            throw Error(y(163));
        }
        ue || t.flags & 512 && Do(t);
      } catch (p) {
        K(t, t.return, p);
      }
    }
    if (t === e) {
      _ = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, _ = n;
      break;
    }
    _ = t.return;
  }
}
function Ui(e) {
  for (; _ !== null; ) {
    var t = _;
    if (t === e) {
      _ = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, _ = n;
      break;
    }
    _ = t.return;
  }
}
function $i(e) {
  for (; _ !== null; ) {
    var t = _;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            hl(4, t);
          } catch (s) {
            K(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              K(t, l, s);
            }
          }
          var o = t.return;
          try {
            Do(t);
          } catch (s) {
            K(t, o, s);
          }
          break;
        case 5:
          var u = t.return;
          try {
            Do(t);
          } catch (s) {
            K(t, u, s);
          }
      }
    } catch (s) {
      K(t, t.return, s);
    }
    if (t === e) {
      _ = null;
      break;
    }
    var i = t.sibling;
    if (i !== null) {
      i.return = t.return, _ = i;
      break;
    }
    _ = t.return;
  }
}
var yd = Math.ceil, tl = qe.ReactCurrentDispatcher, Cu = qe.ReactCurrentOwner, Pe = qe.ReactCurrentBatchConfig, M = 0, b = null, X = null, ne = 0, ge = 0, Gt = gt(0), Z = 0, Zn = null, Ot = 0, vl = 0, Nu = 0, Rn = null, pe = null, Pu = 0, an = 1 / 0, Be = null, nl = !1, Uo = null, dt = null, xr = !1, ot = null, rl = 0, On = 0, $o = null, Or = -1, Mr = 0;
function ae() {
  return M & 6 ? Y() : Or !== -1 ? Or : Or = Y();
}
function pt(e) {
  return e.mode & 1 ? M & 2 && ne !== 0 ? ne & -ne : ed.transition !== null ? (Mr === 0 && (Mr = Ts()), Mr) : (e = D, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Is(e.type)), e) : 1;
}
function De(e, t, n, r) {
  if (50 < On) throw On = 0, $o = null, Error(y(185));
  qn(e, n, r), (!(M & 2) || e !== b) && (e === b && (!(M & 2) && (vl |= n), Z === 4 && rt(e, ne)), ye(e, r), n === 1 && M === 0 && !(t.mode & 1) && (an = Y() + 500, dl && wt()));
}
function ye(e, t) {
  var n = e.callbackNode;
  bc(e, t);
  var r = Ar(e, e === b ? ne : 0);
  if (r === 0) n !== null && Xu(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Xu(n), t === 1) e.tag === 0 ? bf(Ai.bind(null, e)) : ta(Ai.bind(null, e)), Gf(function() {
      !(M & 6) && wt();
    }), n = null;
    else {
      switch (Ls(r)) {
        case 1:
          n = bo;
          break;
        case 4:
          n = Ps;
          break;
        case 16:
          n = $r;
          break;
        case 536870912:
          n = zs;
          break;
        default:
          n = $r;
      }
      n = ba(n, Ka.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Ka(e, t) {
  if (Or = -1, Mr = 0, M & 6) throw Error(y(327));
  var n = e.callbackNode;
  if (tn() && e.callbackNode !== n) return null;
  var r = Ar(e, e === b ? ne : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ll(e, r);
  else {
    t = r;
    var l = M;
    M |= 2;
    var o = Xa();
    (b !== e || ne !== t) && (Be = null, an = Y() + 500, zt(e, t));
    do
      try {
        kd();
        break;
      } catch (i) {
        Ya(e, i);
      }
    while (!0);
    du(), tl.current = o, M = l, X !== null ? t = 0 : (b = null, ne = 0, t = Z);
  }
  if (t !== 0) {
    if (t === 2 && (l = fo(e), l !== 0 && (r = l, t = Ao(e, l))), t === 1) throw n = Zn, zt(e, 0), rt(e, r), ye(e, Y()), n;
    if (t === 6) rt(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !gd(l) && (t = ll(e, r), t === 2 && (o = fo(e), o !== 0 && (r = o, t = Ao(e, o))), t === 1)) throw n = Zn, zt(e, 0), rt(e, r), ye(e, Y()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(y(345));
        case 2:
          _t(e, pe, Be);
          break;
        case 3:
          if (rt(e, r), (r & 130023424) === r && (t = Pu + 500 - Y(), 10 < t)) {
            if (Ar(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              ae(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = ko(_t.bind(null, e, pe, Be), t);
            break;
          }
          _t(e, pe, Be);
          break;
        case 4:
          if (rt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var u = 31 - Me(r);
            o = 1 << u, u = t[u], u > l && (l = u), r &= ~o;
          }
          if (r = l, r = Y() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * yd(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = ko(_t.bind(null, e, pe, Be), r);
            break;
          }
          _t(e, pe, Be);
          break;
        case 5:
          _t(e, pe, Be);
          break;
        default:
          throw Error(y(329));
      }
    }
  }
  return ye(e, Y()), e.callbackNode === n ? Ka.bind(null, e) : null;
}
function Ao(e, t) {
  var n = Rn;
  return e.current.memoizedState.isDehydrated && (zt(e, t).flags |= 256), e = ll(e, t), e !== 2 && (t = pe, pe = n, t !== null && Vo(t)), e;
}
function Vo(e) {
  pe === null ? pe = e : pe.push.apply(pe, e);
}
function gd(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!Ie(o(), l)) return !1;
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
function rt(e, t) {
  for (t &= ~Nu, t &= ~vl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Me(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Ai(e) {
  if (M & 6) throw Error(y(327));
  tn();
  var t = Ar(e, 0);
  if (!(t & 1)) return ye(e, Y()), null;
  var n = ll(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = fo(e);
    r !== 0 && (t = r, n = Ao(e, r));
  }
  if (n === 1) throw n = Zn, zt(e, 0), rt(e, t), ye(e, Y()), n;
  if (n === 6) throw Error(y(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, _t(e, pe, Be), ye(e, Y()), null;
}
function zu(e, t) {
  var n = M;
  M |= 1;
  try {
    return e(t);
  } finally {
    M = n, M === 0 && (an = Y() + 500, dl && wt());
  }
}
function Mt(e) {
  ot !== null && ot.tag === 0 && !(M & 6) && tn();
  var t = M;
  M |= 1;
  var n = Pe.transition, r = D;
  try {
    if (Pe.transition = null, D = 1, e) return e();
  } finally {
    D = r, Pe.transition = n, M = t, !(M & 6) && wt();
  }
}
function Tu() {
  ge = Gt.current, A(Gt);
}
function zt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Xf(n)), X !== null) for (n = X.return; n !== null; ) {
    var r = n;
    switch (au(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Qr();
        break;
      case 3:
        un(), A(he), A(ie), gu();
        break;
      case 5:
        yu(r);
        break;
      case 4:
        un();
        break;
      case 13:
        A(B);
        break;
      case 19:
        A(B);
        break;
      case 10:
        pu(r.type._context);
        break;
      case 22:
      case 23:
        Tu();
    }
    n = n.return;
  }
  if (b = e, X = e = mt(e.current, null), ne = ge = t, Z = 0, Zn = null, Nu = vl = Ot = 0, pe = Rn = null, Nt !== null) {
    for (t = 0; t < Nt.length; t++) if (n = Nt[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var u = o.next;
        o.next = l, r.next = u;
      }
      n.pending = r;
    }
    Nt = null;
  }
  return e;
}
function Ya(e, t) {
  do {
    var n = X;
    try {
      if (du(), Lr.current = el, br) {
        for (var r = H.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        br = !1;
      }
      if (Rt = 0, q = G = H = null, Ln = !1, Yn = 0, Cu.current = null, n === null || n.return === null) {
        Z = 1, Zn = t, X = null;
        break;
      }
      e: {
        var o = e, u = n.return, i = n, s = t;
        if (t = ne, i.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var c = s, h = i, m = h.tag;
          if (!(h.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var p = h.alternate;
            p ? (h.updateQueue = p.updateQueue, h.memoizedState = p.memoizedState, h.lanes = p.lanes) : (h.updateQueue = null, h.memoizedState = null);
          }
          var k = Pi(u);
          if (k !== null) {
            k.flags &= -257, zi(k, u, i, o, t), k.mode & 1 && Ni(o, c, t), t = k, s = c;
            var S = t.updateQueue;
            if (S === null) {
              var x = /* @__PURE__ */ new Set();
              x.add(s), t.updateQueue = x;
            } else S.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              Ni(o, c, t), Lu();
              break e;
            }
            s = Error(y(426));
          }
        } else if (V && i.mode & 1) {
          var I = Pi(u);
          if (I !== null) {
            !(I.flags & 65536) && (I.flags |= 256), zi(I, u, i, o, t), cu(sn(s, i));
            break e;
          }
        }
        o = s = sn(s, i), Z !== 4 && (Z = 2), Rn === null ? Rn = [o] : Rn.push(o), o = u;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var f = La(o, s, t);
              ki(o, f);
              break e;
            case 1:
              i = s;
              var a = o.type, d = o.stateNode;
              if (!(o.flags & 128) && (typeof a.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (dt === null || !dt.has(d)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var v = ja(o, i, t);
                ki(o, v);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Za(n);
    } catch (E) {
      t = E, X === n && n !== null && (X = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Xa() {
  var e = tl.current;
  return tl.current = el, e === null ? el : e;
}
function Lu() {
  (Z === 0 || Z === 3 || Z === 2) && (Z = 4), b === null || !(Ot & 268435455) && !(vl & 268435455) || rt(b, ne);
}
function ll(e, t) {
  var n = M;
  M |= 2;
  var r = Xa();
  (b !== e || ne !== t) && (Be = null, zt(e, t));
  do
    try {
      wd();
      break;
    } catch (l) {
      Ya(e, l);
    }
  while (!0);
  if (du(), M = n, tl.current = r, X !== null) throw Error(y(261));
  return b = null, ne = 0, Z;
}
function wd() {
  for (; X !== null; ) Ga(X);
}
function kd() {
  for (; X !== null && !Hc(); ) Ga(X);
}
function Ga(e) {
  var t = qa(e.alternate, e, ge);
  e.memoizedProps = e.pendingProps, t === null ? Za(e) : X = t, Cu.current = null;
}
function Za(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = pd(n, t), n !== null) {
        n.flags &= 32767, X = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        Z = 6, X = null;
        return;
      }
    } else if (n = dd(n, t, ge), n !== null) {
      X = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      X = t;
      return;
    }
    X = t = e;
  } while (t !== null);
  Z === 0 && (Z = 5);
}
function _t(e, t, n) {
  var r = D, l = Pe.transition;
  try {
    Pe.transition = null, D = 1, Sd(e, t, n, r);
  } finally {
    Pe.transition = l, D = r;
  }
  return null;
}
function Sd(e, t, n, r) {
  do
    tn();
  while (ot !== null);
  if (M & 6) throw Error(y(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(y(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (ef(e, o), e === b && (X = b = null, ne = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || xr || (xr = !0, ba($r, function() {
    return tn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Pe.transition, Pe.transition = null;
    var u = D;
    D = 1;
    var i = M;
    M |= 4, Cu.current = null, hd(e, n), Ha(n, e), Vf(go), Vr = !!yo, go = yo = null, e.current = n, vd(n), Qc(), M = i, D = u, Pe.transition = o;
  } else e.current = n;
  if (xr && (xr = !1, ot = e, rl = l), o = e.pendingLanes, o === 0 && (dt = null), Xc(n.stateNode), ye(e, Y()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (nl) throw nl = !1, e = Uo, Uo = null, e;
  return rl & 1 && e.tag !== 0 && tn(), o = e.pendingLanes, o & 1 ? e === $o ? On++ : (On = 0, $o = e) : On = 0, wt(), null;
}
function tn() {
  if (ot !== null) {
    var e = Ls(rl), t = Pe.transition, n = D;
    try {
      if (Pe.transition = null, D = 16 > e ? 16 : e, ot === null) var r = !1;
      else {
        if (e = ot, ot = null, rl = 0, M & 6) throw Error(y(331));
        var l = M;
        for (M |= 4, _ = e.current; _ !== null; ) {
          var o = _, u = o.child;
          if (_.flags & 16) {
            var i = o.deletions;
            if (i !== null) {
              for (var s = 0; s < i.length; s++) {
                var c = i[s];
                for (_ = c; _ !== null; ) {
                  var h = _;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      jn(8, h, o);
                  }
                  var m = h.child;
                  if (m !== null) m.return = h, _ = m;
                  else for (; _ !== null; ) {
                    h = _;
                    var p = h.sibling, k = h.return;
                    if (Va(h), h === c) {
                      _ = null;
                      break;
                    }
                    if (p !== null) {
                      p.return = k, _ = p;
                      break;
                    }
                    _ = k;
                  }
                }
              }
              var S = o.alternate;
              if (S !== null) {
                var x = S.child;
                if (x !== null) {
                  S.child = null;
                  do {
                    var I = x.sibling;
                    x.sibling = null, x = I;
                  } while (x !== null);
                }
              }
              _ = o;
            }
          }
          if (o.subtreeFlags & 2064 && u !== null) u.return = o, _ = u;
          else e: for (; _ !== null; ) {
            if (o = _, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                jn(9, o, o.return);
            }
            var f = o.sibling;
            if (f !== null) {
              f.return = o.return, _ = f;
              break e;
            }
            _ = o.return;
          }
        }
        var a = e.current;
        for (_ = a; _ !== null; ) {
          u = _;
          var d = u.child;
          if (u.subtreeFlags & 2064 && d !== null) d.return = u, _ = d;
          else e: for (u = a; _ !== null; ) {
            if (i = _, i.flags & 2048) try {
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  hl(9, i);
              }
            } catch (E) {
              K(i, i.return, E);
            }
            if (i === u) {
              _ = null;
              break e;
            }
            var v = i.sibling;
            if (v !== null) {
              v.return = i.return, _ = v;
              break e;
            }
            _ = i.return;
          }
        }
        if (M = l, wt(), Ae && typeof Ae.onPostCommitFiberRoot == "function") try {
          Ae.onPostCommitFiberRoot(il, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      D = n, Pe.transition = t;
    }
  }
  return !1;
}
function Vi(e, t, n) {
  t = sn(n, t), t = La(e, t, 1), e = ft(e, t, 1), t = ae(), e !== null && (qn(e, 1, t), ye(e, t));
}
function K(e, t, n) {
  if (e.tag === 3) Vi(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Vi(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (dt === null || !dt.has(r))) {
        e = sn(n, e), e = ja(t, e, 1), t = ft(t, e, 1), e = ae(), t !== null && (qn(t, 1, e), ye(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function xd(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = ae(), e.pingedLanes |= e.suspendedLanes & n, b === e && (ne & n) === n && (Z === 4 || Z === 3 && (ne & 130023424) === ne && 500 > Y() - Pu ? zt(e, 0) : Nu |= n), ye(e, t);
}
function Ja(e, t) {
  t === 0 && (e.mode & 1 ? (t = dr, dr <<= 1, !(dr & 130023424) && (dr = 4194304)) : t = 1);
  var n = ae();
  e = Ze(e, t), e !== null && (qn(e, t, n), ye(e, n));
}
function Ed(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Ja(e, n);
}
function _d(e, t) {
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
      throw Error(y(314));
  }
  r !== null && r.delete(t), Ja(e, n);
}
var qa;
qa = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || he.current) me = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return me = !1, fd(e, t, n);
    me = !!(e.flags & 131072);
  }
  else me = !1, V && t.flags & 1048576 && na(t, Xr, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Rr(e, t), e = t.pendingProps;
      var l = rn(t, ie.current);
      en(t, n), l = ku(null, t, r, e, l, n);
      var o = Su();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ve(r) ? (o = !0, Kr(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, hu(t), l.updater = ml, t.stateNode = l, l._reactInternals = t, Po(t, r, e, n), t = Lo(null, t, r, !0, o, n)) : (t.tag = 0, V && o && su(t), se(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Rr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Nd(r), e = je(r, e), l) {
          case 0:
            t = To(null, t, r, e, n);
            break e;
          case 1:
            t = ji(null, t, r, e, n);
            break e;
          case 11:
            t = Ti(null, t, r, e, n);
            break e;
          case 14:
            t = Li(null, t, r, je(r.type, e), n);
            break e;
        }
        throw Error(y(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : je(r, l), To(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : je(r, l), ji(e, t, r, l, n);
    case 3:
      e: {
        if (Da(t), e === null) throw Error(y(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, sa(e, t), Jr(t, r, null, n);
        var u = t.memoizedState;
        if (r = u.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: u.cache, pendingSuspenseBoundaries: u.pendingSuspenseBoundaries, transitions: u.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = sn(Error(y(423)), t), t = Ri(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = sn(Error(y(424)), t), t = Ri(e, t, r, n, l);
          break e;
        } else for (we = ct(t.stateNode.containerInfo.firstChild), ke = t, V = !0, Oe = null, n = ua(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (ln(), r === l) {
            t = Je(e, t, n);
            break e;
          }
          se(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return aa(t), e === null && _o(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, u = l.children, wo(r, l) ? u = null : o !== null && wo(r, o) && (t.flags |= 32), Ma(e, t), se(e, t, u, n), t.child;
    case 6:
      return e === null && _o(t), null;
    case 13:
      return Ia(e, t, n);
    case 4:
      return vu(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = on(t, null, r, n) : se(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : je(r, l), Ti(e, t, r, l, n);
    case 7:
      return se(e, t, t.pendingProps, n), t.child;
    case 8:
      return se(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return se(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, u = l.value, F(Gr, r._currentValue), r._currentValue = u, o !== null) if (Ie(o.value, u)) {
          if (o.children === l.children && !he.current) {
            t = Je(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var i = o.dependencies;
          if (i !== null) {
            u = o.child;
            for (var s = i.firstContext; s !== null; ) {
              if (s.context === r) {
                if (o.tag === 1) {
                  s = Ye(-1, n & -n), s.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var h = c.pending;
                    h === null ? s.next = s : (s.next = h.next, h.next = s), c.pending = s;
                  }
                }
                o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Co(
                  o.return,
                  n,
                  t
                ), i.lanes |= n;
                break;
              }
              s = s.next;
            }
          } else if (o.tag === 10) u = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (u = o.return, u === null) throw Error(y(341));
            u.lanes |= n, i = u.alternate, i !== null && (i.lanes |= n), Co(u, n, t), u = o.sibling;
          } else u = o.child;
          if (u !== null) u.return = o;
          else for (u = o; u !== null; ) {
            if (u === t) {
              u = null;
              break;
            }
            if (o = u.sibling, o !== null) {
              o.return = u.return, u = o;
              break;
            }
            u = u.return;
          }
          o = u;
        }
        se(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, en(t, n), l = ze(l), r = r(l), t.flags |= 1, se(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = je(r, t.pendingProps), l = je(r.type, l), Li(e, t, r, l, n);
    case 15:
      return Ra(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : je(r, l), Rr(e, t), t.tag = 1, ve(r) ? (e = !0, Kr(t)) : e = !1, en(t, n), Ta(t, r, l), Po(t, r, l, n), Lo(null, t, r, !0, e, n);
    case 19:
      return Fa(e, t, n);
    case 22:
      return Oa(e, t, n);
  }
  throw Error(y(156, t.tag));
};
function ba(e, t) {
  return Ns(e, t);
}
function Cd(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ne(e, t, n, r) {
  return new Cd(e, t, n, r);
}
function ju(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Nd(e) {
  if (typeof e == "function") return ju(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Zo) return 11;
    if (e === Jo) return 14;
  }
  return 2;
}
function mt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ne(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Dr(e, t, n, r, l, o) {
  var u = 2;
  if (r = e, typeof e == "function") ju(e) && (u = 1);
  else if (typeof e == "string") u = 5;
  else e: switch (e) {
    case $t:
      return Tt(n.children, l, o, t);
    case Go:
      u = 8, l |= 8;
      break;
    case Zl:
      return e = Ne(12, n, t, l | 2), e.elementType = Zl, e.lanes = o, e;
    case Jl:
      return e = Ne(13, n, t, l), e.elementType = Jl, e.lanes = o, e;
    case ql:
      return e = Ne(19, n, t, l), e.elementType = ql, e.lanes = o, e;
    case as:
      return yl(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case is:
          u = 10;
          break e;
        case ss:
          u = 9;
          break e;
        case Zo:
          u = 11;
          break e;
        case Jo:
          u = 14;
          break e;
        case et:
          u = 16, r = null;
          break e;
      }
      throw Error(y(130, e == null ? e : typeof e, ""));
  }
  return t = Ne(u, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Tt(e, t, n, r) {
  return e = Ne(7, e, r, t), e.lanes = n, e;
}
function yl(e, t, n, r) {
  return e = Ne(22, e, r, t), e.elementType = as, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Yl(e, t, n) {
  return e = Ne(6, e, null, t), e.lanes = n, e;
}
function Xl(e, t, n) {
  return t = Ne(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Pd(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = zl(0), this.expirationTimes = zl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = zl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Ru(e, t, n, r, l, o, u, i, s) {
  return e = new Pd(e, t, n, i, s), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Ne(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, hu(o), e;
}
function zd(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Ut, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function ec(e) {
  if (!e) return vt;
  e = e._reactInternals;
  e: {
    if (It(e) !== e || e.tag !== 1) throw Error(y(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ve(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(y(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ve(n)) return ea(e, n, t);
  }
  return t;
}
function tc(e, t, n, r, l, o, u, i, s) {
  return e = Ru(n, r, !0, e, l, o, u, i, s), e.context = ec(null), n = e.current, r = ae(), l = pt(n), o = Ye(r, l), o.callback = t ?? null, ft(n, o, l), e.current.lanes = l, qn(e, l, r), ye(e, r), e;
}
function gl(e, t, n, r) {
  var l = t.current, o = ae(), u = pt(l);
  return n = ec(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ye(o, u), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ft(l, t, u), e !== null && (De(e, l, u, o), Tr(e, l, u)), u;
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
function Wi(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ou(e, t) {
  Wi(e, t), (e = e.alternate) && Wi(e, t);
}
function Td() {
  return null;
}
var nc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Mu(e) {
  this._internalRoot = e;
}
wl.prototype.render = Mu.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(y(409));
  gl(e, t, null, null);
};
wl.prototype.unmount = Mu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Mt(function() {
      gl(null, e, null, null);
    }), t[Ge] = null;
  }
};
function wl(e) {
  this._internalRoot = e;
}
wl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Os();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < nt.length && t !== 0 && t < nt[n].priority; n++) ;
    nt.splice(n, 0, e), n === 0 && Ds(e);
  }
};
function Du(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function kl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Bi() {
}
function Ld(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = ol(u);
        o.call(c);
      };
    }
    var u = tc(t, r, e, 0, null, !1, !1, "", Bi);
    return e._reactRootContainer = u, e[Ge] = u.current, Wn(e.nodeType === 8 ? e.parentNode : e), Mt(), u;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var i = r;
    r = function() {
      var c = ol(s);
      i.call(c);
    };
  }
  var s = Ru(e, 0, !1, null, null, !1, !1, "", Bi);
  return e._reactRootContainer = s, e[Ge] = s.current, Wn(e.nodeType === 8 ? e.parentNode : e), Mt(function() {
    gl(t, s, n, r);
  }), s;
}
function Sl(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var u = o;
    if (typeof l == "function") {
      var i = l;
      l = function() {
        var s = ol(u);
        i.call(s);
      };
    }
    gl(t, u, e, l);
  } else u = Ld(n, t, e, l, r);
  return ol(u);
}
js = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = En(t.pendingLanes);
        n !== 0 && (eu(t, n | 1), ye(t, Y()), !(M & 6) && (an = Y() + 500, wt()));
      }
      break;
    case 13:
      Mt(function() {
        var r = Ze(e, 1);
        if (r !== null) {
          var l = ae();
          De(r, e, 1, l);
        }
      }), Ou(e, 1);
  }
};
tu = function(e) {
  if (e.tag === 13) {
    var t = Ze(e, 134217728);
    if (t !== null) {
      var n = ae();
      De(t, e, 134217728, n);
    }
    Ou(e, 134217728);
  }
};
Rs = function(e) {
  if (e.tag === 13) {
    var t = pt(e), n = Ze(e, t);
    if (n !== null) {
      var r = ae();
      De(n, e, t, r);
    }
    Ou(e, t);
  }
};
Os = function() {
  return D;
};
Ms = function(e, t) {
  var n = D;
  try {
    return D = e, t();
  } finally {
    D = n;
  }
};
so = function(e, t, n) {
  switch (t) {
    case "input":
      if (to(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = fl(r);
            if (!l) throw Error(y(90));
            fs(r), to(r, l);
          }
        }
      }
      break;
    case "textarea":
      ps(e, n);
      break;
    case "select":
      t = n.value, t != null && Zt(e, !!n.multiple, t, !1);
  }
};
ks = zu;
Ss = Mt;
var jd = { usingClientEntryPoint: !1, Events: [er, Bt, fl, gs, ws, zu] }, kn = { findFiberByHostInstance: Ct, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Rd = { bundleType: kn.bundleType, version: kn.version, rendererPackageName: kn.rendererPackageName, rendererConfig: kn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: qe.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = _s(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: kn.findFiberByHostInstance || Td, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Er = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Er.isDisabled && Er.supportsFiber) try {
    il = Er.inject(Rd), Ae = Er;
  } catch {
  }
}
xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = jd;
xe.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Du(t)) throw Error(y(200));
  return zd(e, t, null, n);
};
xe.createRoot = function(e, t) {
  if (!Du(e)) throw Error(y(299));
  var n = !1, r = "", l = nc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Ru(e, 1, !1, null, null, n, !1, r, l), e[Ge] = t.current, Wn(e.nodeType === 8 ? e.parentNode : e), new Mu(t);
};
xe.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(y(188)) : (e = Object.keys(e).join(","), Error(y(268, e)));
  return e = _s(t), e = e === null ? null : e.stateNode, e;
};
xe.flushSync = function(e) {
  return Mt(e);
};
xe.hydrate = function(e, t, n) {
  if (!kl(t)) throw Error(y(200));
  return Sl(null, e, t, !0, n);
};
xe.hydrateRoot = function(e, t, n) {
  if (!Du(e)) throw Error(y(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", u = nc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (u = n.onRecoverableError)), t = tc(t, null, e, 1, n ?? null, l, !1, o, u), e[Ge] = t.current, Wn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new wl(t);
};
xe.render = function(e, t, n) {
  if (!kl(t)) throw Error(y(200));
  return Sl(null, e, t, !1, n);
};
xe.unmountComponentAtNode = function(e) {
  if (!kl(e)) throw Error(y(40));
  return e._reactRootContainer ? (Mt(function() {
    Sl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ge] = null;
    });
  }), !0) : !1;
};
xe.unstable_batchedUpdates = zu;
xe.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!kl(n)) throw Error(y(200));
  if (e == null || e._reactInternals === void 0) throw Error(y(38));
  return Sl(e, t, n, !1, r);
};
xe.version = "18.3.1-next-f1338f8080-20240426";
function rc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(rc);
    } catch (e) {
      console.error(e);
    }
}
rc(), rs.exports = xe;
var Od = rs.exports, lc, Hi = Od;
lc = Hi.createRoot, Hi.hydrateRoot;
const Qi = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
], Md = ["monday", "tuesday", "wednesday", "thursday", "friday"], Dd = ["saturday", "sunday"], Id = (e) => e[0].toUpperCase() + e.slice(1, 3), ut = (e) => {
  const [t, n] = e.split(":").map(Number);
  return t * 60 + n;
};
function Fd({ getHass: e, narrow: t, onToggleMenu: n }) {
  const [r, l] = de.useState([]), [o, u] = de.useState(null), [i, s] = de.useState(""), [c, h] = de.useState("heat"), [m, p] = de.useState({}), [k, S] = de.useState({}), [x, I] = de.useState("monday"), [f, a] = de.useState({ kind: "idle" }), d = r.find((g) => g.entry_id === i), v = c === "water", E = JSON.stringify(m) !== JSON.stringify(k);
  de.useEffect(() => {
    e().callWS({ type: "hive_schedule/devices" }).then((g) => {
      l(g.devices), u(g.limits), g.devices[0] && s(g.devices[0].entry_id);
    }).catch((g) => a({ kind: "error", text: String((g == null ? void 0 : g.message) ?? g) }));
  }, [e]);
  const C = de.useCallback(async () => {
    if (i) {
      a({ kind: "busy", text: "Reading from receiver…" });
      try {
        const g = await e().callWS({
          type: "hive_schedule/get",
          entry_id: i,
          channel: c
        });
        p(g.schedule), S(g.schedule);
        const W = Object.keys(g.schedule).length;
        a(
          g.complete ? { kind: "ok", text: "Schedule read from receiver" } : W ? { kind: "error", text: `Only got ${W}/7 days — try reading again` } : { kind: "error", text: "No reply. Is the receiver awake and does it support getWeeklySchedule?" }
        );
      } catch (g) {
        a({ kind: "error", text: (g == null ? void 0 : g.message) ?? String(g) });
      }
    }
  }, [i, c, e]);
  de.useEffect(() => {
    p({}), S({}), i && C();
  }, [i, c]);
  const N = async () => {
    a({ kind: "busy", text: "Writing to receiver…" });
    try {
      const g = await e().callWS({
        type: "hive_schedule/set",
        entry_id: i,
        channel: c,
        schedule: m
      });
      p(g.schedule), S(g.schedule), a({
        kind: "ok",
        text: `Sent ${g.commands} command${g.commands === 1 ? "" : "s"}. Read back to confirm the receiver kept it.`
      });
    } catch (g) {
      a({ kind: "error", text: (g == null ? void 0 : g.message) ?? String(g) });
    }
  }, P = async () => {
    try {
      await e().callWS({ type: "hive_schedule/mode", entry_id: i, channel: c, mode: "schedule" }), a({ kind: "ok", text: "Receiver set to follow its schedule" });
    } catch (g) {
      a({ kind: "error", text: (g == null ? void 0 : g.message) ?? String(g) });
    }
  }, j = m[x] ?? [], R = (o == null ? void 0 : o.max_transitions) ?? 6, ee = (g) => p((W) => ({ ...W, [x]: [...g].sort((w, z) => ut(w.time) - ut(z.time)) })), kt = () => {
    const g = j[j.length - 1], W = g ? Ud(j, ut(g.time) + 60) : "06:00", w = v ? (o == null ? void 0 : o.water_on) ?? 22 : (g == null ? void 0 : g.setpoint) ?? 20;
    ee([...j, { time: W, setpoint: w }]);
  }, We = (g) => p((W) => {
    const w = { ...W };
    for (const z of g) w[z] = j.map((T) => ({ ...T }));
    return w;
  }), nr = de.useMemo(() => {
    const g = Object.values(m).flat().map((W) => W.setpoint);
    return { lo: Math.min(5, ...g), hi: Math.max(22, ...g) };
  }, [m]);
  return /* @__PURE__ */ L.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ L.jsxs("header", { children: [
      t && /* @__PURE__ */ L.jsx("button", { className: "icon", onClick: n, "aria-label": "Menu", children: "☰" }),
      /* @__PURE__ */ L.jsx("h1", { children: "Heating Schedule" })
    ] }),
    /* @__PURE__ */ L.jsxs("main", { children: [
      !r.length && f.kind !== "error" && /* @__PURE__ */ L.jsx("p", { className: "muted", children: "No receivers configured. Add one under Settings → Devices & services." }),
      r.length > 0 && /* @__PURE__ */ L.jsxs("div", { className: "toolbar", children: [
        r.length > 1 && /* @__PURE__ */ L.jsx("select", { value: i, onChange: (g) => s(g.target.value), children: r.map((g) => /* @__PURE__ */ L.jsx("option", { value: g.entry_id, children: g.name }, g.entry_id)) }),
        d && d.channels.length > 1 && /* @__PURE__ */ L.jsx("div", { className: "segmented", children: d.channels.map((g) => /* @__PURE__ */ L.jsx("button", { className: g === c ? "on" : "", onClick: () => h(g), children: g === "heat" ? "Heating" : "Hot water" }, g)) }),
        /* @__PURE__ */ L.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ L.jsx("button", { onClick: C, disabled: f.kind === "busy", children: "Read" }),
        /* @__PURE__ */ L.jsx("button", { onClick: P, disabled: f.kind === "busy", children: "Follow schedule" }),
        /* @__PURE__ */ L.jsx("button", { className: "primary", onClick: N, disabled: !E || f.kind === "busy", children: "Write to receiver" })
      ] }),
      f.text && /* @__PURE__ */ L.jsx("div", { className: `status ${f.kind}`, children: f.text }),
      r.length > 0 && /* @__PURE__ */ L.jsx("section", { className: "card", children: /* @__PURE__ */ L.jsxs("div", { className: "week", children: [
        Qi.map((g) => /* @__PURE__ */ L.jsxs("button", { className: `row ${g === x ? "selected" : ""}`, onClick: () => I(g), children: [
          /* @__PURE__ */ L.jsx("span", { className: "day", children: Id(g) }),
          /* @__PURE__ */ L.jsx($d, { transitions: m[g], isWater: v, limits: o, range: nr })
        ] }, g)),
        /* @__PURE__ */ L.jsx("div", { className: "hours", children: [0, 6, 12, 18, 24].map((g) => /* @__PURE__ */ L.jsx("span", { style: { left: `${g / 24 * 100}%` }, children: String(g).padStart(2, "0") }, g)) })
      ] }) }),
      r.length > 0 && /* @__PURE__ */ L.jsxs("section", { className: "card", children: [
        /* @__PURE__ */ L.jsxs("div", { className: "card-head", children: [
          /* @__PURE__ */ L.jsx("h2", { children: x[0].toUpperCase() + x.slice(1) }),
          /* @__PURE__ */ L.jsxs("span", { className: "muted", children: [
            j.length,
            "/",
            R,
            " events"
          ] })
        ] }),
        j.length === 0 && /* @__PURE__ */ L.jsx("p", { className: "muted", children: "No events for this day yet." }),
        j.map((g, W) => /* @__PURE__ */ L.jsxs("div", { className: "transition", children: [
          /* @__PURE__ */ L.jsx(
            "input",
            {
              type: "time",
              value: g.time,
              onChange: (w) => ee(j.map((z, T) => T === W ? { ...z, time: w.target.value } : z))
            }
          ),
          v ? /* @__PURE__ */ L.jsxs("div", { className: "segmented", children: [
            ["on", "off"].map((w) => {
              const z = w === "on" ? (o == null ? void 0 : o.water_on) ?? 22 : (o == null ? void 0 : o.water_off) ?? 1;
              return /* @__PURE__ */ L.jsx(
                "button",
                {
                  className: g.setpoint === z ? "on" : "",
                  onClick: () => ee(j.map((T, U) => U === W ? { ...T, setpoint: z } : T)),
                  children: w === "on" ? "On" : "Off"
                },
                w
              );
            }),
            g.setpoint !== ((o == null ? void 0 : o.water_on) ?? 22) && g.setpoint !== ((o == null ? void 0 : o.water_off) ?? 1) && /* @__PURE__ */ L.jsxs("span", { className: "muted raw", title: "Value read from the receiver doesn't match WATER_ON/WATER_OFF in const.py", children: [
              g.setpoint,
              "°?"
            ] })
          ] }) : /* @__PURE__ */ L.jsxs("div", { className: "setpoint", children: [
            /* @__PURE__ */ L.jsx("button", { className: "icon", onClick: () => rr(W, -0.5), children: "−" }),
            /* @__PURE__ */ L.jsxs("span", { children: [
              g.setpoint.toFixed(1),
              "°"
            ] }),
            /* @__PURE__ */ L.jsx("button", { className: "icon", onClick: () => rr(W, 0.5), children: "+" })
          ] }),
          /* @__PURE__ */ L.jsx("button", { className: "icon danger", onClick: () => ee(j.filter((w, z) => z !== W)), "aria-label": "Remove", children: "✕" })
        ] }, W)),
        /* @__PURE__ */ L.jsxs("div", { className: "actions", children: [
          /* @__PURE__ */ L.jsx("button", { onClick: kt, disabled: j.length >= R, children: "+ Add event" }),
          /* @__PURE__ */ L.jsx("span", { className: "spacer" }),
          /* @__PURE__ */ L.jsx("span", { className: "muted", children: "Copy to:" }),
          /* @__PURE__ */ L.jsx("button", { onClick: () => We(Md), disabled: !j.length, children: "Weekdays" }),
          /* @__PURE__ */ L.jsx("button", { onClick: () => We(Dd), disabled: !j.length, children: "Weekend" }),
          /* @__PURE__ */ L.jsx("button", { onClick: () => We([...Qi]), disabled: !j.length, children: "All" })
        ] })
      ] })
    ] })
  ] });
  function rr(g, W) {
    const w = (o == null ? void 0 : o.heat_min) ?? 1, z = (o == null ? void 0 : o.heat_max) ?? 32;
    ee(
      j.map(
        (T, U) => U === g ? { ...T, setpoint: Math.min(z, Math.max(w, Math.round((T.setpoint + W) * 2) / 2)) } : T
      )
    );
  }
}
function Ud(e, t) {
  const n = new Set(e.map((l) => ut(l.time)));
  let r = Math.min(t, 23 * 60 + 30);
  for (; n.has(r) && r < 1439; ) r += 15;
  return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function $d({
  transitions: e,
  isWater: t,
  limits: n,
  range: r
}) {
  if (!(e != null && e.length)) return /* @__PURE__ */ L.jsx("div", { className: "timeline empty" });
  const l = [...e].sort((u, i) => ut(u.time) - ut(i.time)), o = [{ time: "00:00", setpoint: l[l.length - 1].setpoint }, ...l];
  return /* @__PURE__ */ L.jsx("div", { className: "timeline", children: o.map((u, i) => {
    const s = ut(u.time), c = i + 1 < o.length ? ut(o[i + 1].time) : 1440;
    if (c <= s) return null;
    const h = t ? u.setpoint >= ((n == null ? void 0 : n.water_on) ?? 22) : !1, m = (u.setpoint - r.lo) / Math.max(1, r.hi - r.lo);
    return /* @__PURE__ */ L.jsx(
      "span",
      {
        title: `${u.time} → ${t ? h ? "On" : "Off" : `${u.setpoint}°`}`,
        style: {
          left: `${s / 1440 * 100}%`,
          width: `${(c - s) / 1440 * 100}%`,
          opacity: t ? h ? 1 : 0.12 : 0.15 + 0.85 * m
        },
        children: !t && c - s >= 120 ? `${u.setpoint}°` : ""
      },
      i
    );
  }) });
}
const Ad = (
  /* css */
  `
:host { display: block; height: 100%; background: var(--primary-background-color); color: var(--primary-text-color); font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif); }
.panel { min-height: 100%; }
header { display: flex; align-items: center; gap: 8px; height: 56px; padding: 0 16px; background: var(--app-header-background-color, var(--primary-color)); color: var(--app-header-text-color, #fff); }
header h1 { font-size: 20px; font-weight: 400; margin: 0; }
main { max-width: 900px; margin: 0 auto; padding: 16px; display: flex; flex-direction: column; gap: 16px; }
.card { background: var(--card-background-color); border-radius: var(--ha-card-border-radius, 12px); box-shadow: var(--ha-card-box-shadow, none); border: 1px solid var(--divider-color); padding: 16px; }
.card-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 8px; }
h2 { font-size: 18px; font-weight: 500; margin: 0; }
.muted { color: var(--secondary-text-color); font-size: 14px; }
.toolbar, .actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.actions { margin-top: 12px; }
.spacer { flex: 1; }
button { font: inherit; font-size: 14px; padding: 6px 12px; border-radius: 8px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); cursor: pointer; }
button:disabled { opacity: .45; cursor: default; }
button.primary { background: var(--primary-color); color: var(--text-primary-color, #fff); border-color: transparent; }
button.icon { padding: 4px 10px; background: transparent; border-color: transparent; color: inherit; font-size: 18px; }
button.danger { color: var(--error-color); font-size: 14px; }
select, input[type=time] { font: inherit; padding: 6px 8px; border-radius: 8px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); color-scheme: light dark; }
.segmented { display: inline-flex; border: 1px solid var(--divider-color); border-radius: 8px; overflow: hidden; }
.segmented button { border: 0; border-radius: 0; }
.segmented .raw { padding: 6px 10px; }
.segmented button.on { background: var(--primary-color); color: var(--text-primary-color, #fff); }
.status { padding: 10px 14px; border-radius: 8px; font-size: 14px; border: 1px solid var(--divider-color); }
.status.ok { border-color: var(--success-color, #43a047); }
.status.error { border-color: var(--error-color); color: var(--error-color); }
.status.busy { opacity: .8; }
.week { display: flex; flex-direction: column; gap: 6px; position: relative; padding-bottom: 18px; }
.row { display: flex; align-items: center; gap: 12px; padding: 4px 6px; border: 1px solid transparent; background: transparent; text-align: left; }
.row.selected { border-color: var(--primary-color); }
.day { width: 36px; font-size: 13px; color: var(--secondary-text-color); }
.timeline { position: relative; flex: 1; height: 28px; border-radius: 6px; background: var(--secondary-background-color, rgba(127,127,127,.1)); overflow: hidden; }
.timeline span { position: absolute; top: 0; bottom: 0; background: var(--state-climate-heat-color, #ff8100); color: #fff; font-size: 11px; display: flex; align-items: center; padding-left: 4px; border-right: 1px solid var(--card-background-color); box-sizing: border-box; white-space: nowrap; overflow: hidden; }
.hours { position: absolute; left: 60px; right: 6px; bottom: 0; height: 14px; font-size: 11px; color: var(--secondary-text-color); }
.hours span { position: absolute; transform: translateX(-50%); }
.transition { display: flex; align-items: center; gap: 12px; padding: 6px 0; border-bottom: 1px solid var(--divider-color); }
.setpoint { display: flex; align-items: center; gap: 4px; min-width: 120px; }
.setpoint span { min-width: 48px; text-align: center; font-variant-numeric: tabular-nums; }
.transition .danger { margin-left: auto; }
`
);
class Vd extends HTMLElement {
  constructor() {
    super(...arguments);
    ur(this, "_hass");
    ur(this, "_narrow", !1);
    ur(this, "_root");
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
      r.textContent = Ad;
      const l = document.createElement("div");
      n.append(r, l), this._root = lc(l);
    }
    this._render();
  }
  disconnectedCallback() {
    var n, r;
    (n = this._root) == null || n.unmount(), this._root = void 0, (r = this.shadowRoot) == null || r.replaceChildren();
  }
  _render() {
    !this._root || !this._hass || this._root.render(
      /* @__PURE__ */ L.jsx(
        Fd,
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
customElements.get("hive-schedule-panel") || customElements.define("hive-schedule-panel", Vd);
