var kc = Object.defineProperty;
var Sc = (e, t, n) => t in e ? kc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var hr = (e, t, n) => Sc(e, typeof t != "symbol" ? t + "" : t, n);
var ra = { exports: {} }, gl = {}, la = { exports: {} }, I = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ar = Symbol.for("react.element"), jc = Symbol.for("react.portal"), Nc = Symbol.for("react.fragment"), _c = Symbol.for("react.strict_mode"), Cc = Symbol.for("react.profiler"), Ec = Symbol.for("react.provider"), zc = Symbol.for("react.context"), Pc = Symbol.for("react.forward_ref"), Tc = Symbol.for("react.suspense"), Mc = Symbol.for("react.memo"), $c = Symbol.for("react.lazy"), Qi = Symbol.iterator;
function Lc(e) {
  return e === null || typeof e != "object" ? null : (e = Qi && e[Qi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var oa = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ia = Object.assign, sa = {};
function xn(e, t, n) {
  this.props = e, this.context = t, this.refs = sa, this.updater = n || oa;
}
xn.prototype.isReactComponent = {};
xn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
xn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function aa() {
}
aa.prototype = xn.prototype;
function Jo(e, t, n) {
  this.props = e, this.context = t, this.refs = sa, this.updater = n || oa;
}
var qo = Jo.prototype = new aa();
qo.constructor = Jo;
ia(qo, xn.prototype);
qo.isPureReactComponent = !0;
var Ki = Array.isArray, ua = Object.prototype.hasOwnProperty, ei = { current: null }, ca = { key: !0, ref: !0, __self: !0, __source: !0 };
function da(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) ua.call(t, r) && !ca.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var a = Array(u), d = 0; d < u; d++) a[d] = arguments[d + 2];
    l.children = a;
  }
  if (e && e.defaultProps) for (r in u = e.defaultProps, u) l[r] === void 0 && (l[r] = u[r]);
  return { $$typeof: ar, type: e, key: o, ref: i, props: l, _owner: ei.current };
}
function Rc(e, t) {
  return { $$typeof: ar, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ti(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ar;
}
function Oc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Yi = /\/+/g;
function Ll(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Oc("" + e.key) : t.toString(36);
}
function Rr(e, t, n, r, l) {
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
        case ar:
        case jc:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + Ll(i, 0) : r, Ki(l) ? (n = "", e != null && (n = e.replace(Yi, "$&/") + "/"), Rr(l, t, n, "", function(d) {
    return d;
  })) : l != null && (ti(l) && (l = Rc(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Yi, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Ki(e)) for (var u = 0; u < e.length; u++) {
    o = e[u];
    var a = r + Ll(o, u);
    i += Rr(o, t, n, a, l);
  }
  else if (a = Lc(e), typeof a == "function") for (e = a.call(e), u = 0; !(o = e.next()).done; ) o = o.value, a = r + Ll(o, u++), i += Rr(o, t, n, a, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function mr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Rr(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Fc(e) {
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
var me = { current: null }, Or = { transition: null }, Dc = { ReactCurrentDispatcher: me, ReactCurrentBatchConfig: Or, ReactCurrentOwner: ei };
function fa() {
  throw Error("act(...) is not supported in production builds of React.");
}
I.Children = { map: mr, forEach: function(e, t, n) {
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
  if (!ti(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
I.Component = xn;
I.Fragment = Nc;
I.Profiler = Cc;
I.PureComponent = Jo;
I.StrictMode = _c;
I.Suspense = Tc;
I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Dc;
I.act = fa;
I.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = ia({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = ei.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (a in t) ua.call(t, a) && !ca.hasOwnProperty(a) && (r[a] = t[a] === void 0 && u !== void 0 ? u[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    u = Array(a);
    for (var d = 0; d < a; d++) u[d] = arguments[d + 2];
    r.children = u;
  }
  return { $$typeof: ar, type: e.type, key: l, ref: o, props: r, _owner: i };
};
I.createContext = function(e) {
  return e = { $$typeof: zc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Ec, _context: e }, e.Consumer = e;
};
I.createElement = da;
I.createFactory = function(e) {
  var t = da.bind(null, e);
  return t.type = e, t;
};
I.createRef = function() {
  return { current: null };
};
I.forwardRef = function(e) {
  return { $$typeof: Pc, render: e };
};
I.isValidElement = ti;
I.lazy = function(e) {
  return { $$typeof: $c, _payload: { _status: -1, _result: e }, _init: Fc };
};
I.memo = function(e, t) {
  return { $$typeof: Mc, type: e, compare: t === void 0 ? null : t };
};
I.startTransition = function(e) {
  var t = Or.transition;
  Or.transition = {};
  try {
    e();
  } finally {
    Or.transition = t;
  }
};
I.unstable_act = fa;
I.useCallback = function(e, t) {
  return me.current.useCallback(e, t);
};
I.useContext = function(e) {
  return me.current.useContext(e);
};
I.useDebugValue = function() {
};
I.useDeferredValue = function(e) {
  return me.current.useDeferredValue(e);
};
I.useEffect = function(e, t) {
  return me.current.useEffect(e, t);
};
I.useId = function() {
  return me.current.useId();
};
I.useImperativeHandle = function(e, t, n) {
  return me.current.useImperativeHandle(e, t, n);
};
I.useInsertionEffect = function(e, t) {
  return me.current.useInsertionEffect(e, t);
};
I.useLayoutEffect = function(e, t) {
  return me.current.useLayoutEffect(e, t);
};
I.useMemo = function(e, t) {
  return me.current.useMemo(e, t);
};
I.useReducer = function(e, t, n) {
  return me.current.useReducer(e, t, n);
};
I.useRef = function(e) {
  return me.current.useRef(e);
};
I.useState = function(e) {
  return me.current.useState(e);
};
I.useSyncExternalStore = function(e, t, n) {
  return me.current.useSyncExternalStore(e, t, n);
};
I.useTransition = function() {
  return me.current.useTransition();
};
I.version = "18.3.1";
la.exports = I;
var $ = la.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ic = $, Ac = Symbol.for("react.element"), Uc = Symbol.for("react.fragment"), bc = Object.prototype.hasOwnProperty, Bc = Ic.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Hc = { key: !0, ref: !0, __self: !0, __source: !0 };
function pa(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) bc.call(t, r) && !Hc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Ac, type: e, key: o, ref: i, props: l, _owner: Bc.current };
}
gl.Fragment = Uc;
gl.jsx = pa;
gl.jsxs = pa;
ra.exports = gl;
var s = ra.exports, ha = { exports: {} }, Ce = {}, ma = { exports: {} }, va = {};
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
  function t(T, L) {
    var O = T.length;
    T.push(L);
    e: for (; 0 < O; ) {
      var Q = O - 1 >>> 1, q = T[Q];
      if (0 < l(q, L)) T[Q] = L, T[O] = q, O = Q;
      else break e;
    }
  }
  function n(T) {
    return T.length === 0 ? null : T[0];
  }
  function r(T) {
    if (T.length === 0) return null;
    var L = T[0], O = T.pop();
    if (O !== L) {
      T[0] = O;
      e: for (var Q = 0, q = T.length, Mt = q >>> 1; Q < Mt; ) {
        var A = 2 * (Q + 1) - 1, at = T[A], Re = A + 1, pr = T[Re];
        if (0 > l(at, O)) Re < q && 0 > l(pr, at) ? (T[Q] = pr, T[Re] = O, Q = Re) : (T[Q] = at, T[A] = O, Q = A);
        else if (Re < q && 0 > l(pr, O)) T[Q] = pr, T[Re] = O, Q = Re;
        else break e;
      }
    }
    return L;
  }
  function l(T, L) {
    var O = T.sortIndex - L.sortIndex;
    return O !== 0 ? O : T.id - L.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var i = Date, u = i.now();
    e.unstable_now = function() {
      return i.now() - u;
    };
  }
  var a = [], d = [], g = 1, v = null, h = 3, m = !1, y = !1, x = !1, z = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(T) {
    for (var L = n(d); L !== null; ) {
      if (L.callback === null) r(d);
      else if (L.startTime <= T) r(d), L.sortIndex = L.expirationTime, t(a, L);
      else break;
      L = n(d);
    }
  }
  function w(T) {
    if (x = !1, p(T), !y) if (n(a) !== null) y = !0, Xe(_);
    else {
      var L = n(d);
      L !== null && st(w, L.startTime - T);
    }
  }
  function _(T, L) {
    y = !1, x && (x = !1, f(P), P = -1), m = !0;
    var O = h;
    try {
      for (p(L), v = n(a); v !== null && (!(v.expirationTime > L) || T && !j()); ) {
        var Q = v.callback;
        if (typeof Q == "function") {
          v.callback = null, h = v.priorityLevel;
          var q = Q(v.expirationTime <= L);
          L = e.unstable_now(), typeof q == "function" ? v.callback = q : v === n(a) && r(a), p(L);
        } else r(a);
        v = n(a);
      }
      if (v !== null) var Mt = !0;
      else {
        var A = n(d);
        A !== null && st(w, A.startTime - L), Mt = !1;
      }
      return Mt;
    } finally {
      v = null, h = O, m = !1;
    }
  }
  var E = !1, S = null, P = -1, C = 5, k = -1;
  function j() {
    return !(e.unstable_now() - k < C);
  }
  function D() {
    if (S !== null) {
      var T = e.unstable_now();
      k = T;
      var L = !0;
      try {
        L = S(!0, T);
      } finally {
        L ? R() : (E = !1, S = null);
      }
    } else E = !1;
  }
  var R;
  if (typeof c == "function") R = function() {
    c(D);
  };
  else if (typeof MessageChannel < "u") {
    var V = new MessageChannel(), Be = V.port2;
    V.port1.onmessage = D, R = function() {
      Be.postMessage(null);
    };
  } else R = function() {
    z(D, 0);
  };
  function Xe(T) {
    S = T, E || (E = !0, R());
  }
  function st(T, L) {
    P = z(function() {
      T(e.unstable_now());
    }, L);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(T) {
    T.callback = null;
  }, e.unstable_continueExecution = function() {
    y || m || (y = !0, Xe(_));
  }, e.unstable_forceFrameRate = function(T) {
    0 > T || 125 < T ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : C = 0 < T ? Math.floor(1e3 / T) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(a);
  }, e.unstable_next = function(T) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var L = 3;
        break;
      default:
        L = h;
    }
    var O = h;
    h = L;
    try {
      return T();
    } finally {
      h = O;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(T, L) {
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
    var O = h;
    h = T;
    try {
      return L();
    } finally {
      h = O;
    }
  }, e.unstable_scheduleCallback = function(T, L, O) {
    var Q = e.unstable_now();
    switch (typeof O == "object" && O !== null ? (O = O.delay, O = typeof O == "number" && 0 < O ? Q + O : Q) : O = Q, T) {
      case 1:
        var q = -1;
        break;
      case 2:
        q = 250;
        break;
      case 5:
        q = 1073741823;
        break;
      case 4:
        q = 1e4;
        break;
      default:
        q = 5e3;
    }
    return q = O + q, T = { id: g++, callback: L, priorityLevel: T, startTime: O, expirationTime: q, sortIndex: -1 }, O > Q ? (T.sortIndex = O, t(d, T), n(a) === null && T === n(d) && (x ? (f(P), P = -1) : x = !0, st(w, O - Q))) : (T.sortIndex = q, t(a, T), y || m || (y = !0, Xe(_))), T;
  }, e.unstable_shouldYield = j, e.unstable_wrapCallback = function(T) {
    var L = h;
    return function() {
      var O = h;
      h = L;
      try {
        return T.apply(this, arguments);
      } finally {
        h = O;
      }
    };
  };
})(va);
ma.exports = va;
var Wc = ma.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vc = $, _e = Wc;
function N(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ga = /* @__PURE__ */ new Set(), Vn = {};
function Wt(e, t) {
  fn(e, t), fn(e + "Capture", t);
}
function fn(e, t) {
  for (Vn[e] = t, e = 0; e < t.length; e++) ga.add(t[e]);
}
var nt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), oo = Object.prototype.hasOwnProperty, Qc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Xi = {}, Gi = {};
function Kc(e) {
  return oo.call(Gi, e) ? !0 : oo.call(Xi, e) ? !1 : Qc.test(e) ? Gi[e] = !0 : (Xi[e] = !0, !1);
}
function Yc(e, t, n, r) {
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
function Xc(e, t, n, r) {
  if (t === null || typeof t > "u" || Yc(e, t, n, r)) return !0;
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
function ve(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
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
var ni = /[\-:]([a-z])/g;
function ri(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ni,
    ri
  );
  ae[t] = new ve(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ni, ri);
  ae[t] = new ve(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ni, ri);
  ae[t] = new ve(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ae[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ae.xlinkHref = new ve("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ae[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function li(e, t, n, r) {
  var l = ae.hasOwnProperty(t) ? ae[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Xc(t, n, l, r) && (n = null), r || l === null ? Kc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var it = Vc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, vr = Symbol.for("react.element"), Kt = Symbol.for("react.portal"), Yt = Symbol.for("react.fragment"), oi = Symbol.for("react.strict_mode"), io = Symbol.for("react.profiler"), ya = Symbol.for("react.provider"), xa = Symbol.for("react.context"), ii = Symbol.for("react.forward_ref"), so = Symbol.for("react.suspense"), ao = Symbol.for("react.suspense_list"), si = Symbol.for("react.memo"), ct = Symbol.for("react.lazy"), wa = Symbol.for("react.offscreen"), Zi = Symbol.iterator;
function Sn(e) {
  return e === null || typeof e != "object" ? null : (e = Zi && e[Zi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var G = Object.assign, Rl;
function Tn(e) {
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
`), i = l.length - 1, u = o.length - 1; 1 <= i && 0 <= u && l[i] !== o[u]; ) u--;
      for (; 1 <= i && 0 <= u; i--, u--) if (l[i] !== o[u]) {
        if (i !== 1 || u !== 1)
          do
            if (i--, u--, 0 > u || l[i] !== o[u]) {
              var a = `
` + l[i].replace(" at new ", " at ");
              return e.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", e.displayName)), a;
            }
          while (1 <= i && 0 <= u);
        break;
      }
    }
  } finally {
    Ol = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Tn(e) : "";
}
function Gc(e) {
  switch (e.tag) {
    case 5:
      return Tn(e.type);
    case 16:
      return Tn("Lazy");
    case 13:
      return Tn("Suspense");
    case 19:
      return Tn("SuspenseList");
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
function uo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Yt:
      return "Fragment";
    case Kt:
      return "Portal";
    case io:
      return "Profiler";
    case oi:
      return "StrictMode";
    case so:
      return "Suspense";
    case ao:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case xa:
      return (e.displayName || "Context") + ".Consumer";
    case ya:
      return (e._context.displayName || "Context") + ".Provider";
    case ii:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case si:
      return t = e.displayName || null, t !== null ? t : uo(e.type) || "Memo";
    case ct:
      t = e._payload, e = e._init;
      try {
        return uo(e(t));
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
      return uo(t);
    case 8:
      return t === oi ? "StrictMode" : "Mode";
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
function Ct(e) {
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
function ka(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Jc(e) {
  var t = ka(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function gr(e) {
  e._valueTracker || (e._valueTracker = Jc(e));
}
function Sa(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = ka(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Qr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function co(e, t) {
  var n = t.checked;
  return G({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Ji(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = Ct(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function ja(e, t) {
  t = t.checked, t != null && li(e, "checked", t, !1);
}
function fo(e, t) {
  ja(e, t);
  var n = Ct(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? po(e, t.type, n) : t.hasOwnProperty("defaultValue") && po(e, t.type, Ct(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function qi(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function po(e, t, n) {
  (t !== "number" || Qr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Mn = Array.isArray;
function on(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Ct(n), t = null, l = 0; l < e.length; l++) {
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
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
  return G({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function es(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(N(92));
      if (Mn(n)) {
        if (1 < n.length) throw Error(N(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Ct(n) };
}
function Na(e, t) {
  var n = Ct(t.value), r = Ct(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ts(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function _a(e) {
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
  return e == null || e === "http://www.w3.org/1999/xhtml" ? _a(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var yr, Ca = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (yr = yr || document.createElement("div"), yr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = yr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
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
var On = {
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
}, qc = ["Webkit", "ms", "Moz", "O"];
Object.keys(On).forEach(function(e) {
  qc.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), On[t] = On[e];
  });
});
function Ea(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || On.hasOwnProperty(e) && On[e] ? ("" + t).trim() : t + "px";
}
function za(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Ea(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var ed = G({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function vo(e, t) {
  if (t) {
    if (ed[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(N(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(N(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(N(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(N(62));
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
function ai(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var xo = null, sn = null, an = null;
function ns(e) {
  if (e = dr(e)) {
    if (typeof xo != "function") throw Error(N(280));
    var t = e.stateNode;
    t && (t = Sl(t), xo(e.stateNode, e.type, t));
  }
}
function Pa(e) {
  sn ? an ? an.push(e) : an = [e] : sn = e;
}
function Ta() {
  if (sn) {
    var e = sn, t = an;
    if (an = sn = null, ns(e), t) for (e = 0; e < t.length; e++) ns(t[e]);
  }
}
function Ma(e, t) {
  return e(t);
}
function $a() {
}
var Dl = !1;
function La(e, t, n) {
  if (Dl) return e(t, n);
  Dl = !0;
  try {
    return Ma(e, t, n);
  } finally {
    Dl = !1, (sn !== null || an !== null) && ($a(), Ta());
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
  if (n && typeof n != "function") throw Error(N(231, t, typeof n));
  return n;
}
var wo = !1;
if (nt) try {
  var jn = {};
  Object.defineProperty(jn, "passive", { get: function() {
    wo = !0;
  } }), window.addEventListener("test", jn, jn), window.removeEventListener("test", jn, jn);
} catch {
  wo = !1;
}
function td(e, t, n, r, l, o, i, u, a) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (g) {
    this.onError(g);
  }
}
var Fn = !1, Kr = null, Yr = !1, ko = null, nd = { onError: function(e) {
  Fn = !0, Kr = e;
} };
function rd(e, t, n, r, l, o, i, u, a) {
  Fn = !1, Kr = null, td.apply(nd, arguments);
}
function ld(e, t, n, r, l, o, i, u, a) {
  if (rd.apply(this, arguments), Fn) {
    if (Fn) {
      var d = Kr;
      Fn = !1, Kr = null;
    } else throw Error(N(198));
    Yr || (Yr = !0, ko = d);
  }
}
function Vt(e) {
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
function Ra(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function rs(e) {
  if (Vt(e) !== e) throw Error(N(188));
}
function od(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Vt(e), t === null) throw Error(N(188));
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
        if (o === n) return rs(l), e;
        if (o === r) return rs(l), t;
        o = o.sibling;
      }
      throw Error(N(188));
    }
    if (n.return !== r.return) n = l, r = o;
    else {
      for (var i = !1, u = l.child; u; ) {
        if (u === n) {
          i = !0, n = l, r = o;
          break;
        }
        if (u === r) {
          i = !0, r = l, n = o;
          break;
        }
        u = u.sibling;
      }
      if (!i) {
        for (u = o.child; u; ) {
          if (u === n) {
            i = !0, n = o, r = l;
            break;
          }
          if (u === r) {
            i = !0, r = o, n = l;
            break;
          }
          u = u.sibling;
        }
        if (!i) throw Error(N(189));
      }
    }
    if (n.alternate !== r) throw Error(N(190));
  }
  if (n.tag !== 3) throw Error(N(188));
  return n.stateNode.current === n ? e : t;
}
function Oa(e) {
  return e = od(e), e !== null ? Fa(e) : null;
}
function Fa(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Fa(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Da = _e.unstable_scheduleCallback, ls = _e.unstable_cancelCallback, id = _e.unstable_shouldYield, sd = _e.unstable_requestPaint, ee = _e.unstable_now, ad = _e.unstable_getCurrentPriorityLevel, ui = _e.unstable_ImmediatePriority, Ia = _e.unstable_UserBlockingPriority, Xr = _e.unstable_NormalPriority, ud = _e.unstable_LowPriority, Aa = _e.unstable_IdlePriority, yl = null, Qe = null;
function cd(e) {
  if (Qe && typeof Qe.onCommitFiberRoot == "function") try {
    Qe.onCommitFiberRoot(yl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ae = Math.clz32 ? Math.clz32 : pd, dd = Math.log, fd = Math.LN2;
function pd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (dd(e) / fd | 0) | 0;
}
var xr = 64, wr = 4194304;
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
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var u = i & ~l;
    u !== 0 ? r = $n(u) : (o &= i, o !== 0 && (r = $n(o)));
  } else i = n & ~l, i !== 0 ? r = $n(i) : o !== 0 && (r = $n(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Ae(t), l = 1 << n, r |= e[n], t &= ~l;
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
    var i = 31 - Ae(o), u = 1 << i, a = l[i];
    a === -1 ? (!(u & n) || u & r) && (l[i] = hd(u, t)) : a <= t && (e.expiredLanes |= u), o &= ~u;
  }
}
function So(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ua() {
  var e = xr;
  return xr <<= 1, !(xr & 4194240) && (xr = 64), e;
}
function Il(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ur(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ae(t), e[t] = n;
}
function vd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Ae(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function ci(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Ae(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var b = 0;
function ba(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Ba, di, Ha, Wa, Va, jo = !1, kr = [], yt = null, xt = null, wt = null, Yn = /* @__PURE__ */ new Map(), Xn = /* @__PURE__ */ new Map(), ft = [], gd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function os(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      yt = null;
      break;
    case "dragenter":
    case "dragleave":
      xt = null;
      break;
    case "mouseover":
    case "mouseout":
      wt = null;
      break;
    case "pointerover":
    case "pointerout":
      Yn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Xn.delete(t.pointerId);
  }
}
function Nn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = dr(t), t !== null && di(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function yd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return yt = Nn(yt, e, t, n, r, l), !0;
    case "dragenter":
      return xt = Nn(xt, e, t, n, r, l), !0;
    case "mouseover":
      return wt = Nn(wt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Yn.set(o, Nn(Yn.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Xn.set(o, Nn(Xn.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Qa(e) {
  var t = Rt(e.target);
  if (t !== null) {
    var n = Vt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ra(n), t !== null) {
          e.blockedOn = t, Va(e.priority, function() {
            Ha(n);
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
function Fr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = No(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      yo = r, n.target.dispatchEvent(r), yo = null;
    } else return t = dr(n), t !== null && di(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function is(e, t, n) {
  Fr(e) && n.delete(t);
}
function xd() {
  jo = !1, yt !== null && Fr(yt) && (yt = null), xt !== null && Fr(xt) && (xt = null), wt !== null && Fr(wt) && (wt = null), Yn.forEach(is), Xn.forEach(is);
}
function _n(e, t) {
  e.blockedOn === t && (e.blockedOn = null, jo || (jo = !0, _e.unstable_scheduleCallback(_e.unstable_NormalPriority, xd)));
}
function Gn(e) {
  function t(l) {
    return _n(l, e);
  }
  if (0 < kr.length) {
    _n(kr[0], e);
    for (var n = 1; n < kr.length; n++) {
      var r = kr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (yt !== null && _n(yt, e), xt !== null && _n(xt, e), wt !== null && _n(wt, e), Yn.forEach(t), Xn.forEach(t), n = 0; n < ft.length; n++) r = ft[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ft.length && (n = ft[0], n.blockedOn === null); ) Qa(n), n.blockedOn === null && ft.shift();
}
var un = it.ReactCurrentBatchConfig, Zr = !0;
function wd(e, t, n, r) {
  var l = b, o = un.transition;
  un.transition = null;
  try {
    b = 1, fi(e, t, n, r);
  } finally {
    b = l, un.transition = o;
  }
}
function kd(e, t, n, r) {
  var l = b, o = un.transition;
  un.transition = null;
  try {
    b = 4, fi(e, t, n, r);
  } finally {
    b = l, un.transition = o;
  }
}
function fi(e, t, n, r) {
  if (Zr) {
    var l = No(e, t, n, r);
    if (l === null) Yl(e, t, r, Jr, n), os(e, r);
    else if (yd(l, e, t, n, r)) r.stopPropagation();
    else if (os(e, r), t & 4 && -1 < gd.indexOf(e)) {
      for (; l !== null; ) {
        var o = dr(l);
        if (o !== null && Ba(o), o = No(e, t, n, r), o === null && Yl(e, t, r, Jr, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Yl(e, t, r, null, n);
  }
}
var Jr = null;
function No(e, t, n, r) {
  if (Jr = null, e = ai(r), e = Rt(e), e !== null) if (t = Vt(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ra(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Jr = e, null;
}
function Ka(e) {
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
        case ui:
          return 1;
        case Ia:
          return 4;
        case Xr:
        case ud:
          return 16;
        case Aa:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ht = null, pi = null, Dr = null;
function Ya() {
  if (Dr) return Dr;
  var e, t = pi, n = t.length, r, l = "value" in ht ? ht.value : ht.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return Dr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Ir(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Sr() {
  return !0;
}
function ss() {
  return !1;
}
function Ee(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(o) : o[u]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Sr : ss, this.isPropagationStopped = ss, this;
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
}, defaultPrevented: 0, isTrusted: 0 }, hi = Ee(wn), cr = G({}, wn, { view: 0, detail: 0 }), Sd = Ee(cr), Al, Ul, Cn, xl = G({}, cr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: mi, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Cn && (Cn && e.type === "mousemove" ? (Al = e.screenX - Cn.screenX, Ul = e.screenY - Cn.screenY) : Ul = Al = 0, Cn = e), Al);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ul;
} }), as = Ee(xl), jd = G({}, xl, { dataTransfer: 0 }), Nd = Ee(jd), _d = G({}, cr, { relatedTarget: 0 }), bl = Ee(_d), Cd = G({}, wn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Ed = Ee(Cd), zd = G({}, wn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Pd = Ee(zd), Td = G({}, wn, { data: 0 }), us = Ee(Td), Md = {
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
}, $d = {
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
function Rd(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Ld[e]) ? !!t[e] : !1;
}
function mi() {
  return Rd;
}
var Od = G({}, cr, { key: function(e) {
  if (e.key) {
    var t = Md[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Ir(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? $d[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: mi, charCode: function(e) {
  return e.type === "keypress" ? Ir(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Ir(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Fd = Ee(Od), Dd = G({}, xl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), cs = Ee(Dd), Id = G({}, cr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: mi }), Ad = Ee(Id), Ud = G({}, wn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), bd = Ee(Ud), Bd = G({}, xl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Hd = Ee(Bd), Wd = [9, 13, 27, 32], vi = nt && "CompositionEvent" in window, Dn = null;
nt && "documentMode" in document && (Dn = document.documentMode);
var Vd = nt && "TextEvent" in window && !Dn, Xa = nt && (!vi || Dn && 8 < Dn && 11 >= Dn), ds = " ", fs = !1;
function Ga(e, t) {
  switch (e) {
    case "keyup":
      return Wd.indexOf(t.keyCode) !== -1;
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
function Za(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Xt = !1;
function Qd(e, t) {
  switch (e) {
    case "compositionend":
      return Za(t);
    case "keypress":
      return t.which !== 32 ? null : (fs = !0, ds);
    case "textInput":
      return e = t.data, e === ds && fs ? null : e;
    default:
      return null;
  }
}
function Kd(e, t) {
  if (Xt) return e === "compositionend" || !vi && Ga(e, t) ? (e = Ya(), Dr = pi = ht = null, Xt = !1, e) : null;
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
      return Xa && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Yd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function ps(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Yd[e.type] : t === "textarea";
}
function Ja(e, t, n, r) {
  Pa(r), t = qr(t, "onChange"), 0 < t.length && (n = new hi("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var In = null, Zn = null;
function Xd(e) {
  uu(e, 0);
}
function wl(e) {
  var t = Jt(e);
  if (Sa(t)) return e;
}
function Gd(e, t) {
  if (e === "change") return t;
}
var qa = !1;
if (nt) {
  var Bl;
  if (nt) {
    var Hl = "oninput" in document;
    if (!Hl) {
      var hs = document.createElement("div");
      hs.setAttribute("oninput", "return;"), Hl = typeof hs.oninput == "function";
    }
    Bl = Hl;
  } else Bl = !1;
  qa = Bl && (!document.documentMode || 9 < document.documentMode);
}
function ms() {
  In && (In.detachEvent("onpropertychange", eu), Zn = In = null);
}
function eu(e) {
  if (e.propertyName === "value" && wl(Zn)) {
    var t = [];
    Ja(t, Zn, e, ai(e)), La(Xd, t);
  }
}
function Zd(e, t, n) {
  e === "focusin" ? (ms(), In = t, Zn = n, In.attachEvent("onpropertychange", eu)) : e === "focusout" && ms();
}
function Jd(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return wl(Zn);
}
function qd(e, t) {
  if (e === "click") return wl(t);
}
function ef(e, t) {
  if (e === "input" || e === "change") return wl(t);
}
function tf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var be = typeof Object.is == "function" ? Object.is : tf;
function Jn(e, t) {
  if (be(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!oo.call(t, l) || !be(e[l], t[l])) return !1;
  }
  return !0;
}
function vs(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function gs(e, t) {
  var n = vs(e);
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
    n = vs(n);
  }
}
function tu(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? tu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function nu() {
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
function gi(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function nf(e) {
  var t = nu(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && tu(n.ownerDocument.documentElement, n)) {
    if (r !== null && gi(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = gs(n, o);
        var i = gs(
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
var rf = nt && "documentMode" in document && 11 >= document.documentMode, Gt = null, _o = null, An = null, Co = !1;
function ys(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Co || Gt == null || Gt !== Qr(r) || (r = Gt, "selectionStart" in r && gi(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), An && Jn(An, r) || (An = r, r = qr(_o, "onSelect"), 0 < r.length && (t = new hi("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Gt)));
}
function jr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Zt = { animationend: jr("Animation", "AnimationEnd"), animationiteration: jr("Animation", "AnimationIteration"), animationstart: jr("Animation", "AnimationStart"), transitionend: jr("Transition", "TransitionEnd") }, Wl = {}, ru = {};
nt && (ru = document.createElement("div").style, "AnimationEvent" in window || (delete Zt.animationend.animation, delete Zt.animationiteration.animation, delete Zt.animationstart.animation), "TransitionEvent" in window || delete Zt.transitionend.transition);
function kl(e) {
  if (Wl[e]) return Wl[e];
  if (!Zt[e]) return e;
  var t = Zt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in ru) return Wl[e] = t[n];
  return e;
}
var lu = kl("animationend"), ou = kl("animationiteration"), iu = kl("animationstart"), su = kl("transitionend"), au = /* @__PURE__ */ new Map(), xs = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function zt(e, t) {
  au.set(e, t), Wt(t, [e]);
}
for (var Vl = 0; Vl < xs.length; Vl++) {
  var Ql = xs[Vl], lf = Ql.toLowerCase(), of = Ql[0].toUpperCase() + Ql.slice(1);
  zt(lf, "on" + of);
}
zt(lu, "onAnimationEnd");
zt(ou, "onAnimationIteration");
zt(iu, "onAnimationStart");
zt("dblclick", "onDoubleClick");
zt("focusin", "onFocus");
zt("focusout", "onBlur");
zt(su, "onTransitionEnd");
fn("onMouseEnter", ["mouseout", "mouseover"]);
fn("onMouseLeave", ["mouseout", "mouseover"]);
fn("onPointerEnter", ["pointerout", "pointerover"]);
fn("onPointerLeave", ["pointerout", "pointerover"]);
Wt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Wt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Wt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Wt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Wt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Wt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ln = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), sf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ln));
function ws(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, ld(r, t, void 0, e), e.currentTarget = null;
}
function uu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var u = r[i], a = u.instance, d = u.currentTarget;
        if (u = u.listener, a !== o && l.isPropagationStopped()) break e;
        ws(l, u, d), o = a;
      }
      else for (i = 0; i < r.length; i++) {
        if (u = r[i], a = u.instance, d = u.currentTarget, u = u.listener, a !== o && l.isPropagationStopped()) break e;
        ws(l, u, d), o = a;
      }
    }
  }
  if (Yr) throw e = ko, Yr = !1, ko = null, e;
}
function H(e, t) {
  var n = t[Mo];
  n === void 0 && (n = t[Mo] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (cu(t, e, 2, !1), n.add(r));
}
function Kl(e, t, n) {
  var r = 0;
  t && (r |= 4), cu(n, e, r, t);
}
var Nr = "_reactListening" + Math.random().toString(36).slice(2);
function qn(e) {
  if (!e[Nr]) {
    e[Nr] = !0, ga.forEach(function(n) {
      n !== "selectionchange" && (sf.has(n) || Kl(n, !1, e), Kl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Nr] || (t[Nr] = !0, Kl("selectionchange", !1, t));
  }
}
function cu(e, t, n, r) {
  switch (Ka(t)) {
    case 1:
      var l = wd;
      break;
    case 4:
      l = kd;
      break;
    default:
      l = fi;
  }
  n = l.bind(null, t, n, e), l = void 0, !wo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Yl(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var i = r.tag;
    if (i === 3 || i === 4) {
      var u = r.stateNode.containerInfo;
      if (u === l || u.nodeType === 8 && u.parentNode === l) break;
      if (i === 4) for (i = r.return; i !== null; ) {
        var a = i.tag;
        if ((a === 3 || a === 4) && (a = i.stateNode.containerInfo, a === l || a.nodeType === 8 && a.parentNode === l)) return;
        i = i.return;
      }
      for (; u !== null; ) {
        if (i = Rt(u), i === null) return;
        if (a = i.tag, a === 5 || a === 6) {
          r = o = i;
          continue e;
        }
        u = u.parentNode;
      }
    }
    r = r.return;
  }
  La(function() {
    var d = o, g = ai(n), v = [];
    e: {
      var h = au.get(e);
      if (h !== void 0) {
        var m = hi, y = e;
        switch (e) {
          case "keypress":
            if (Ir(n) === 0) break e;
          case "keydown":
          case "keyup":
            m = Fd;
            break;
          case "focusin":
            y = "focus", m = bl;
            break;
          case "focusout":
            y = "blur", m = bl;
            break;
          case "beforeblur":
          case "afterblur":
            m = bl;
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
            m = as;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            m = Nd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = Ad;
            break;
          case lu:
          case ou:
          case iu:
            m = Ed;
            break;
          case su:
            m = bd;
            break;
          case "scroll":
            m = Sd;
            break;
          case "wheel":
            m = Hd;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = Pd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            m = cs;
        }
        var x = (t & 4) !== 0, z = !x && e === "scroll", f = x ? h !== null ? h + "Capture" : null : h;
        x = [];
        for (var c = d, p; c !== null; ) {
          p = c;
          var w = p.stateNode;
          if (p.tag === 5 && w !== null && (p = w, f !== null && (w = Kn(c, f), w != null && x.push(er(c, w, p)))), z) break;
          c = c.return;
        }
        0 < x.length && (h = new m(h, y, null, n, g), v.push({ event: h, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", m = e === "mouseout" || e === "pointerout", h && n !== yo && (y = n.relatedTarget || n.fromElement) && (Rt(y) || y[rt])) break e;
        if ((m || h) && (h = g.window === g ? g : (h = g.ownerDocument) ? h.defaultView || h.parentWindow : window, m ? (y = n.relatedTarget || n.toElement, m = d, y = y ? Rt(y) : null, y !== null && (z = Vt(y), y !== z || y.tag !== 5 && y.tag !== 6) && (y = null)) : (m = null, y = d), m !== y)) {
          if (x = as, w = "onMouseLeave", f = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (x = cs, w = "onPointerLeave", f = "onPointerEnter", c = "pointer"), z = m == null ? h : Jt(m), p = y == null ? h : Jt(y), h = new x(w, c + "leave", m, n, g), h.target = z, h.relatedTarget = p, w = null, Rt(g) === d && (x = new x(f, c + "enter", y, n, g), x.target = p, x.relatedTarget = z, w = x), z = w, m && y) t: {
            for (x = m, f = y, c = 0, p = x; p; p = Qt(p)) c++;
            for (p = 0, w = f; w; w = Qt(w)) p++;
            for (; 0 < c - p; ) x = Qt(x), c--;
            for (; 0 < p - c; ) f = Qt(f), p--;
            for (; c--; ) {
              if (x === f || f !== null && x === f.alternate) break t;
              x = Qt(x), f = Qt(f);
            }
            x = null;
          }
          else x = null;
          m !== null && ks(v, h, m, x, !1), y !== null && z !== null && ks(v, z, y, x, !0);
        }
      }
      e: {
        if (h = d ? Jt(d) : window, m = h.nodeName && h.nodeName.toLowerCase(), m === "select" || m === "input" && h.type === "file") var _ = Gd;
        else if (ps(h)) if (qa) _ = ef;
        else {
          _ = Jd;
          var E = Zd;
        }
        else (m = h.nodeName) && m.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (_ = qd);
        if (_ && (_ = _(e, d))) {
          Ja(v, _, n, g);
          break e;
        }
        E && E(e, h, d), e === "focusout" && (E = h._wrapperState) && E.controlled && h.type === "number" && po(h, "number", h.value);
      }
      switch (E = d ? Jt(d) : window, e) {
        case "focusin":
          (ps(E) || E.contentEditable === "true") && (Gt = E, _o = d, An = null);
          break;
        case "focusout":
          An = _o = Gt = null;
          break;
        case "mousedown":
          Co = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Co = !1, ys(v, n, g);
          break;
        case "selectionchange":
          if (rf) break;
        case "keydown":
        case "keyup":
          ys(v, n, g);
      }
      var S;
      if (vi) e: {
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
      else Xt ? Ga(e, n) && (P = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      P && (Xa && n.locale !== "ko" && (Xt || P !== "onCompositionStart" ? P === "onCompositionEnd" && Xt && (S = Ya()) : (ht = g, pi = "value" in ht ? ht.value : ht.textContent, Xt = !0)), E = qr(d, P), 0 < E.length && (P = new us(P, e, null, n, g), v.push({ event: P, listeners: E }), S ? P.data = S : (S = Za(n), S !== null && (P.data = S)))), (S = Vd ? Qd(e, n) : Kd(e, n)) && (d = qr(d, "onBeforeInput"), 0 < d.length && (g = new us("onBeforeInput", "beforeinput", null, n, g), v.push({ event: g, listeners: d }), g.data = S));
    }
    uu(v, t);
  });
}
function er(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function qr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Kn(e, n), o != null && r.unshift(er(e, o, l)), o = Kn(e, t), o != null && r.push(er(e, o, l))), e = e.return;
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
function ks(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var u = n, a = u.alternate, d = u.stateNode;
    if (a !== null && a === r) break;
    u.tag === 5 && d !== null && (u = d, l ? (a = Kn(n, o), a != null && i.unshift(er(n, a, u))) : l || (a = Kn(n, o), a != null && i.push(er(n, a, u)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var af = /\r\n?/g, uf = /\u0000|\uFFFD/g;
function Ss(e) {
  return (typeof e == "string" ? e : "" + e).replace(af, `
`).replace(uf, "");
}
function _r(e, t, n) {
  if (t = Ss(t), Ss(e) !== t && n) throw Error(N(425));
}
function el() {
}
var Eo = null, zo = null;
function Po(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var To = typeof setTimeout == "function" ? setTimeout : void 0, cf = typeof clearTimeout == "function" ? clearTimeout : void 0, js = typeof Promise == "function" ? Promise : void 0, df = typeof queueMicrotask == "function" ? queueMicrotask : typeof js < "u" ? function(e) {
  return js.resolve(null).then(e).catch(ff);
} : To;
function ff(e) {
  setTimeout(function() {
    throw e;
  });
}
function Xl(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Gn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Gn(t);
}
function kt(e) {
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
function Ns(e) {
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
var kn = Math.random().toString(36).slice(2), Ve = "__reactFiber$" + kn, tr = "__reactProps$" + kn, rt = "__reactContainer$" + kn, Mo = "__reactEvents$" + kn, pf = "__reactListeners$" + kn, hf = "__reactHandles$" + kn;
function Rt(e) {
  var t = e[Ve];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[rt] || n[Ve]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ns(e); e !== null; ) {
        if (n = e[Ve]) return n;
        e = Ns(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function dr(e) {
  return e = e[Ve] || e[rt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Jt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(N(33));
}
function Sl(e) {
  return e[tr] || null;
}
var $o = [], qt = -1;
function Pt(e) {
  return { current: e };
}
function W(e) {
  0 > qt || (e.current = $o[qt], $o[qt] = null, qt--);
}
function B(e, t) {
  qt++, $o[qt] = e.current, e.current = t;
}
var Et = {}, fe = Pt(Et), xe = Pt(!1), At = Et;
function pn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Et;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function we(e) {
  return e = e.childContextTypes, e != null;
}
function tl() {
  W(xe), W(fe);
}
function _s(e, t, n) {
  if (fe.current !== Et) throw Error(N(168));
  B(fe, t), B(xe, n);
}
function du(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(N(108, Zc(e) || "Unknown", l));
  return G({}, n, r);
}
function nl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Et, At = fe.current, B(fe, e), B(xe, xe.current), !0;
}
function Cs(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(N(169));
  n ? (e = du(e, t, At), r.__reactInternalMemoizedMergedChildContext = e, W(xe), W(fe), B(fe, e)) : W(xe), B(xe, n);
}
var Ze = null, jl = !1, Gl = !1;
function fu(e) {
  Ze === null ? Ze = [e] : Ze.push(e);
}
function mf(e) {
  jl = !0, fu(e);
}
function Tt() {
  if (!Gl && Ze !== null) {
    Gl = !0;
    var e = 0, t = b;
    try {
      var n = Ze;
      for (b = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ze = null, jl = !1;
    } catch (l) {
      throw Ze !== null && (Ze = Ze.slice(e + 1)), Da(ui, Tt), l;
    } finally {
      b = t, Gl = !1;
    }
  }
  return null;
}
var en = [], tn = 0, rl = null, ll = 0, ze = [], Pe = 0, Ut = null, qe = 1, et = "";
function $t(e, t) {
  en[tn++] = ll, en[tn++] = rl, rl = e, ll = t;
}
function pu(e, t, n) {
  ze[Pe++] = qe, ze[Pe++] = et, ze[Pe++] = Ut, Ut = e;
  var r = qe;
  e = et;
  var l = 32 - Ae(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - Ae(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, qe = 1 << 32 - Ae(t) + l | n << l | r, et = o + e;
  } else qe = 1 << o | n << l | r, et = e;
}
function yi(e) {
  e.return !== null && ($t(e, 1), pu(e, 1, 0));
}
function xi(e) {
  for (; e === rl; ) rl = en[--tn], en[tn] = null, ll = en[--tn], en[tn] = null;
  for (; e === Ut; ) Ut = ze[--Pe], ze[Pe] = null, et = ze[--Pe], ze[Pe] = null, qe = ze[--Pe], ze[Pe] = null;
}
var Ne = null, je = null, K = !1, Ie = null;
function hu(e, t) {
  var n = Te(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Es(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Ne = e, je = kt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Ne = e, je = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Ut !== null ? { id: qe, overflow: et } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Te(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ne = e, je = null, !0) : !1;
    default:
      return !1;
  }
}
function Lo(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ro(e) {
  if (K) {
    var t = je;
    if (t) {
      var n = t;
      if (!Es(e, t)) {
        if (Lo(e)) throw Error(N(418));
        t = kt(n.nextSibling);
        var r = Ne;
        t && Es(e, t) ? hu(r, n) : (e.flags = e.flags & -4097 | 2, K = !1, Ne = e);
      }
    } else {
      if (Lo(e)) throw Error(N(418));
      e.flags = e.flags & -4097 | 2, K = !1, Ne = e;
    }
  }
}
function zs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Ne = e;
}
function Cr(e) {
  if (e !== Ne) return !1;
  if (!K) return zs(e), K = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Po(e.type, e.memoizedProps)), t && (t = je)) {
    if (Lo(e)) throw mu(), Error(N(418));
    for (; t; ) hu(e, t), t = kt(t.nextSibling);
  }
  if (zs(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(N(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              je = kt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      je = null;
    }
  } else je = Ne ? kt(e.stateNode.nextSibling) : null;
  return !0;
}
function mu() {
  for (var e = je; e; ) e = kt(e.nextSibling);
}
function hn() {
  je = Ne = null, K = !1;
}
function wi(e) {
  Ie === null ? Ie = [e] : Ie.push(e);
}
var vf = it.ReactCurrentBatchConfig;
function En(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(N(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(N(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var u = l.refs;
        i === null ? delete u[o] : u[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(N(284));
    if (!n._owner) throw Error(N(290, e));
  }
  return e;
}
function Er(e, t) {
  throw e = Object.prototype.toString.call(t), Error(N(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Ps(e) {
  var t = e._init;
  return t(e._payload);
}
function vu(e) {
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
    return f = _t(f, c), f.index = 0, f.sibling = null, f;
  }
  function o(f, c, p) {
    return f.index = p, e ? (p = f.alternate, p !== null ? (p = p.index, p < c ? (f.flags |= 2, c) : p) : (f.flags |= 2, c)) : (f.flags |= 1048576, c);
  }
  function i(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function u(f, c, p, w) {
    return c === null || c.tag !== 6 ? (c = ro(p, f.mode, w), c.return = f, c) : (c = l(c, p), c.return = f, c);
  }
  function a(f, c, p, w) {
    var _ = p.type;
    return _ === Yt ? g(f, c, p.props.children, w, p.key) : c !== null && (c.elementType === _ || typeof _ == "object" && _ !== null && _.$$typeof === ct && Ps(_) === c.type) ? (w = l(c, p.props), w.ref = En(f, c, p), w.return = f, w) : (w = Vr(p.type, p.key, p.props, null, f.mode, w), w.ref = En(f, c, p), w.return = f, w);
  }
  function d(f, c, p, w) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== p.containerInfo || c.stateNode.implementation !== p.implementation ? (c = lo(p, f.mode, w), c.return = f, c) : (c = l(c, p.children || []), c.return = f, c);
  }
  function g(f, c, p, w, _) {
    return c === null || c.tag !== 7 ? (c = It(p, f.mode, w, _), c.return = f, c) : (c = l(c, p), c.return = f, c);
  }
  function v(f, c, p) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = ro("" + c, f.mode, p), c.return = f, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case vr:
          return p = Vr(c.type, c.key, c.props, null, f.mode, p), p.ref = En(f, null, c), p.return = f, p;
        case Kt:
          return c = lo(c, f.mode, p), c.return = f, c;
        case ct:
          var w = c._init;
          return v(f, w(c._payload), p);
      }
      if (Mn(c) || Sn(c)) return c = It(c, f.mode, p, null), c.return = f, c;
      Er(f, c);
    }
    return null;
  }
  function h(f, c, p, w) {
    var _ = c !== null ? c.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number") return _ !== null ? null : u(f, c, "" + p, w);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case vr:
          return p.key === _ ? a(f, c, p, w) : null;
        case Kt:
          return p.key === _ ? d(f, c, p, w) : null;
        case ct:
          return _ = p._init, h(
            f,
            c,
            _(p._payload),
            w
          );
      }
      if (Mn(p) || Sn(p)) return _ !== null ? null : g(f, c, p, w, null);
      Er(f, p);
    }
    return null;
  }
  function m(f, c, p, w, _) {
    if (typeof w == "string" && w !== "" || typeof w == "number") return f = f.get(p) || null, u(c, f, "" + w, _);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case vr:
          return f = f.get(w.key === null ? p : w.key) || null, a(c, f, w, _);
        case Kt:
          return f = f.get(w.key === null ? p : w.key) || null, d(c, f, w, _);
        case ct:
          var E = w._init;
          return m(f, c, p, E(w._payload), _);
      }
      if (Mn(w) || Sn(w)) return f = f.get(p) || null, g(c, f, w, _, null);
      Er(c, w);
    }
    return null;
  }
  function y(f, c, p, w) {
    for (var _ = null, E = null, S = c, P = c = 0, C = null; S !== null && P < p.length; P++) {
      S.index > P ? (C = S, S = null) : C = S.sibling;
      var k = h(f, S, p[P], w);
      if (k === null) {
        S === null && (S = C);
        break;
      }
      e && S && k.alternate === null && t(f, S), c = o(k, c, P), E === null ? _ = k : E.sibling = k, E = k, S = C;
    }
    if (P === p.length) return n(f, S), K && $t(f, P), _;
    if (S === null) {
      for (; P < p.length; P++) S = v(f, p[P], w), S !== null && (c = o(S, c, P), E === null ? _ = S : E.sibling = S, E = S);
      return K && $t(f, P), _;
    }
    for (S = r(f, S); P < p.length; P++) C = m(S, f, P, p[P], w), C !== null && (e && C.alternate !== null && S.delete(C.key === null ? P : C.key), c = o(C, c, P), E === null ? _ = C : E.sibling = C, E = C);
    return e && S.forEach(function(j) {
      return t(f, j);
    }), K && $t(f, P), _;
  }
  function x(f, c, p, w) {
    var _ = Sn(p);
    if (typeof _ != "function") throw Error(N(150));
    if (p = _.call(p), p == null) throw Error(N(151));
    for (var E = _ = null, S = c, P = c = 0, C = null, k = p.next(); S !== null && !k.done; P++, k = p.next()) {
      S.index > P ? (C = S, S = null) : C = S.sibling;
      var j = h(f, S, k.value, w);
      if (j === null) {
        S === null && (S = C);
        break;
      }
      e && S && j.alternate === null && t(f, S), c = o(j, c, P), E === null ? _ = j : E.sibling = j, E = j, S = C;
    }
    if (k.done) return n(
      f,
      S
    ), K && $t(f, P), _;
    if (S === null) {
      for (; !k.done; P++, k = p.next()) k = v(f, k.value, w), k !== null && (c = o(k, c, P), E === null ? _ = k : E.sibling = k, E = k);
      return K && $t(f, P), _;
    }
    for (S = r(f, S); !k.done; P++, k = p.next()) k = m(S, f, P, k.value, w), k !== null && (e && k.alternate !== null && S.delete(k.key === null ? P : k.key), c = o(k, c, P), E === null ? _ = k : E.sibling = k, E = k);
    return e && S.forEach(function(D) {
      return t(f, D);
    }), K && $t(f, P), _;
  }
  function z(f, c, p, w) {
    if (typeof p == "object" && p !== null && p.type === Yt && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case vr:
          e: {
            for (var _ = p.key, E = c; E !== null; ) {
              if (E.key === _) {
                if (_ = p.type, _ === Yt) {
                  if (E.tag === 7) {
                    n(f, E.sibling), c = l(E, p.props.children), c.return = f, f = c;
                    break e;
                  }
                } else if (E.elementType === _ || typeof _ == "object" && _ !== null && _.$$typeof === ct && Ps(_) === E.type) {
                  n(f, E.sibling), c = l(E, p.props), c.ref = En(f, E, p), c.return = f, f = c;
                  break e;
                }
                n(f, E);
                break;
              } else t(f, E);
              E = E.sibling;
            }
            p.type === Yt ? (c = It(p.props.children, f.mode, w, p.key), c.return = f, f = c) : (w = Vr(p.type, p.key, p.props, null, f.mode, w), w.ref = En(f, c, p), w.return = f, f = w);
          }
          return i(f);
        case Kt:
          e: {
            for (E = p.key; c !== null; ) {
              if (c.key === E) if (c.tag === 4 && c.stateNode.containerInfo === p.containerInfo && c.stateNode.implementation === p.implementation) {
                n(f, c.sibling), c = l(c, p.children || []), c.return = f, f = c;
                break e;
              } else {
                n(f, c);
                break;
              }
              else t(f, c);
              c = c.sibling;
            }
            c = lo(p, f.mode, w), c.return = f, f = c;
          }
          return i(f);
        case ct:
          return E = p._init, z(f, c, E(p._payload), w);
      }
      if (Mn(p)) return y(f, c, p, w);
      if (Sn(p)) return x(f, c, p, w);
      Er(f, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, c !== null && c.tag === 6 ? (n(f, c.sibling), c = l(c, p), c.return = f, f = c) : (n(f, c), c = ro(p, f.mode, w), c.return = f, f = c), i(f)) : n(f, c);
  }
  return z;
}
var mn = vu(!0), gu = vu(!1), ol = Pt(null), il = null, nn = null, ki = null;
function Si() {
  ki = nn = il = null;
}
function ji(e) {
  var t = ol.current;
  W(ol), e._currentValue = t;
}
function Oo(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function cn(e, t) {
  il = e, ki = nn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (ye = !0), e.firstContext = null);
}
function $e(e) {
  var t = e._currentValue;
  if (ki !== e) if (e = { context: e, memoizedValue: t, next: null }, nn === null) {
    if (il === null) throw Error(N(308));
    nn = e, il.dependencies = { lanes: 0, firstContext: e };
  } else nn = nn.next = e;
  return t;
}
var Ot = null;
function Ni(e) {
  Ot === null ? Ot = [e] : Ot.push(e);
}
function yu(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Ni(t)) : (n.next = l.next, l.next = n), t.interleaved = n, lt(e, r);
}
function lt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var dt = !1;
function _i(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function xu(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function tt(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function St(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, U & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, lt(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Ni(r)) : (t.next = l.next, l.next = t), r.interleaved = t, lt(e, n);
}
function Ar(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ci(e, n);
  }
}
function Ts(e, t) {
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
function sl(e, t, n, r) {
  var l = e.updateQueue;
  dt = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var a = u, d = a.next;
    a.next = null, i === null ? o = d : i.next = d, i = a;
    var g = e.alternate;
    g !== null && (g = g.updateQueue, u = g.lastBaseUpdate, u !== i && (u === null ? g.firstBaseUpdate = d : u.next = d, g.lastBaseUpdate = a));
  }
  if (o !== null) {
    var v = l.baseState;
    i = 0, g = d = a = null, u = o;
    do {
      var h = u.lane, m = u.eventTime;
      if ((r & h) === h) {
        g !== null && (g = g.next = {
          eventTime: m,
          lane: 0,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        });
        e: {
          var y = e, x = u;
          switch (h = t, m = n, x.tag) {
            case 1:
              if (y = x.payload, typeof y == "function") {
                v = y.call(m, v, h);
                break e;
              }
              v = y;
              break e;
            case 3:
              y.flags = y.flags & -65537 | 128;
            case 0:
              if (y = x.payload, h = typeof y == "function" ? y.call(m, v, h) : y, h == null) break e;
              v = G({}, v, h);
              break e;
            case 2:
              dt = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [u] : h.push(u));
      } else m = { eventTime: m, lane: h, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, g === null ? (d = g = m, a = v) : g = g.next = m, i |= h;
      if (u = u.next, u === null) {
        if (u = l.shared.pending, u === null) break;
        h = u, u = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (g === null && (a = v), l.baseState = a, l.firstBaseUpdate = d, l.lastBaseUpdate = g, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Bt |= i, e.lanes = i, e.memoizedState = v;
  }
}
function Ms(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(N(191, l));
      l.call(r);
    }
  }
}
var fr = {}, Ke = Pt(fr), nr = Pt(fr), rr = Pt(fr);
function Ft(e) {
  if (e === fr) throw Error(N(174));
  return e;
}
function Ci(e, t) {
  switch (B(rr, t), B(nr, e), B(Ke, fr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : mo(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = mo(t, e);
  }
  W(Ke), B(Ke, t);
}
function vn() {
  W(Ke), W(nr), W(rr);
}
function wu(e) {
  Ft(rr.current);
  var t = Ft(Ke.current), n = mo(t, e.type);
  t !== n && (B(nr, e), B(Ke, n));
}
function Ei(e) {
  nr.current === e && (W(Ke), W(nr));
}
var Y = Pt(0);
function al(e) {
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
function zi() {
  for (var e = 0; e < Zl.length; e++) Zl[e]._workInProgressVersionPrimary = null;
  Zl.length = 0;
}
var Ur = it.ReactCurrentDispatcher, Jl = it.ReactCurrentBatchConfig, bt = 0, X = null, ne = null, le = null, ul = !1, Un = !1, lr = 0, gf = 0;
function ue() {
  throw Error(N(321));
}
function Pi(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!be(e[n], t[n])) return !1;
  return !0;
}
function Ti(e, t, n, r, l, o) {
  if (bt = o, X = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ur.current = e === null || e.memoizedState === null ? kf : Sf, e = n(r, l), Un) {
    o = 0;
    do {
      if (Un = !1, lr = 0, 25 <= o) throw Error(N(301));
      o += 1, le = ne = null, t.updateQueue = null, Ur.current = jf, e = n(r, l);
    } while (Un);
  }
  if (Ur.current = cl, t = ne !== null && ne.next !== null, bt = 0, le = ne = X = null, ul = !1, t) throw Error(N(300));
  return e;
}
function Mi() {
  var e = lr !== 0;
  return lr = 0, e;
}
function We() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return le === null ? X.memoizedState = le = e : le = le.next = e, le;
}
function Le() {
  if (ne === null) {
    var e = X.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ne.next;
  var t = le === null ? X.memoizedState : le.next;
  if (t !== null) le = t, ne = e;
  else {
    if (e === null) throw Error(N(310));
    ne = e, e = { memoizedState: ne.memoizedState, baseState: ne.baseState, baseQueue: ne.baseQueue, queue: ne.queue, next: null }, le === null ? X.memoizedState = le = e : le = le.next = e;
  }
  return le;
}
function or(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ql(e) {
  var t = Le(), n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = ne, l = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      l.next = o.next, o.next = i;
    }
    r.baseQueue = l = o, n.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var u = i = null, a = null, d = o;
    do {
      var g = d.lane;
      if ((bt & g) === g) a !== null && (a = a.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var v = {
          lane: g,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        a === null ? (u = a = v, i = r) : a = a.next = v, X.lanes |= g, Bt |= g;
      }
      d = d.next;
    } while (d !== null && d !== o);
    a === null ? i = r : a.next = u, be(r, t.memoizedState) || (ye = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = a, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, X.lanes |= o, Bt |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function eo(e) {
  var t = Le(), n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    be(o, t.memoizedState) || (ye = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function ku() {
}
function Su(e, t) {
  var n = X, r = Le(), l = t(), o = !be(r.memoizedState, l);
  if (o && (r.memoizedState = l, ye = !0), r = r.queue, $i(_u.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || le !== null && le.memoizedState.tag & 1) {
    if (n.flags |= 2048, ir(9, Nu.bind(null, n, r, l, t), void 0, null), oe === null) throw Error(N(349));
    bt & 30 || ju(n, t, l);
  }
  return l;
}
function ju(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = X.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, X.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
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
    return !be(e, n);
  } catch {
    return !0;
  }
}
function Eu(e) {
  var t = lt(e, 1);
  t !== null && Ue(t, e, 1, -1);
}
function $s(e) {
  var t = We();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: or, lastRenderedState: e }, t.queue = e, e = e.dispatch = wf.bind(null, X, e), [t.memoizedState, e];
}
function ir(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = X.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, X.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function zu() {
  return Le().memoizedState;
}
function br(e, t, n, r) {
  var l = We();
  X.flags |= e, l.memoizedState = ir(1 | t, n, void 0, r === void 0 ? null : r);
}
function Nl(e, t, n, r) {
  var l = Le();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ne !== null) {
    var i = ne.memoizedState;
    if (o = i.destroy, r !== null && Pi(r, i.deps)) {
      l.memoizedState = ir(t, n, o, r);
      return;
    }
  }
  X.flags |= e, l.memoizedState = ir(1 | t, n, o, r);
}
function Ls(e, t) {
  return br(8390656, 8, e, t);
}
function $i(e, t) {
  return Nl(2048, 8, e, t);
}
function Pu(e, t) {
  return Nl(4, 2, e, t);
}
function Tu(e, t) {
  return Nl(4, 4, e, t);
}
function Mu(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function $u(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Nl(4, 4, Mu.bind(null, t, e), n);
}
function Li() {
}
function Lu(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Pi(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Ru(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Pi(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Ou(e, t, n) {
  return bt & 21 ? (be(n, t) || (n = Ua(), X.lanes |= n, Bt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, ye = !0), e.memoizedState = n);
}
function yf(e, t) {
  var n = b;
  b = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Jl.transition;
  Jl.transition = {};
  try {
    e(!1), t();
  } finally {
    b = n, Jl.transition = r;
  }
}
function Fu() {
  return Le().memoizedState;
}
function xf(e, t, n) {
  var r = Nt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Du(e)) Iu(t, n);
  else if (n = yu(e, t, n, r), n !== null) {
    var l = he();
    Ue(n, e, r, l), Au(n, t, r);
  }
}
function wf(e, t, n) {
  var r = Nt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Du(e)) Iu(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, u = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = u, be(u, i)) {
        var a = t.interleaved;
        a === null ? (l.next = l, Ni(t)) : (l.next = a.next, a.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = yu(e, t, l, r), n !== null && (l = he(), Ue(n, e, r, l), Au(n, t, r));
  }
}
function Du(e) {
  var t = e.alternate;
  return e === X || t !== null && t === X;
}
function Iu(e, t) {
  Un = ul = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Au(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ci(e, n);
  }
}
var cl = { readContext: $e, useCallback: ue, useContext: ue, useEffect: ue, useImperativeHandle: ue, useInsertionEffect: ue, useLayoutEffect: ue, useMemo: ue, useReducer: ue, useRef: ue, useState: ue, useDebugValue: ue, useDeferredValue: ue, useTransition: ue, useMutableSource: ue, useSyncExternalStore: ue, useId: ue, unstable_isNewReconciler: !1 }, kf = { readContext: $e, useCallback: function(e, t) {
  return We().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: $e, useEffect: Ls, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, br(
    4194308,
    4,
    Mu.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return br(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return br(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = We();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = We();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = xf.bind(null, X, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = We();
  return e = { current: e }, t.memoizedState = e;
}, useState: $s, useDebugValue: Li, useDeferredValue: function(e) {
  return We().memoizedState = e;
}, useTransition: function() {
  var e = $s(!1), t = e[0];
  return e = yf.bind(null, e[1]), We().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = X, l = We();
  if (K) {
    if (n === void 0) throw Error(N(407));
    n = n();
  } else {
    if (n = t(), oe === null) throw Error(N(349));
    bt & 30 || ju(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Ls(_u.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, ir(9, Nu.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = We(), t = oe.identifierPrefix;
  if (K) {
    var n = et, r = qe;
    n = (r & ~(1 << 32 - Ae(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = lr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = gf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Sf = {
  readContext: $e,
  useCallback: Lu,
  useContext: $e,
  useEffect: $i,
  useImperativeHandle: $u,
  useInsertionEffect: Pu,
  useLayoutEffect: Tu,
  useMemo: Ru,
  useReducer: ql,
  useRef: zu,
  useState: function() {
    return ql(or);
  },
  useDebugValue: Li,
  useDeferredValue: function(e) {
    var t = Le();
    return Ou(t, ne.memoizedState, e);
  },
  useTransition: function() {
    var e = ql(or)[0], t = Le().memoizedState;
    return [e, t];
  },
  useMutableSource: ku,
  useSyncExternalStore: Su,
  useId: Fu,
  unstable_isNewReconciler: !1
}, jf = { readContext: $e, useCallback: Lu, useContext: $e, useEffect: $i, useImperativeHandle: $u, useInsertionEffect: Pu, useLayoutEffect: Tu, useMemo: Ru, useReducer: eo, useRef: zu, useState: function() {
  return eo(or);
}, useDebugValue: Li, useDeferredValue: function(e) {
  var t = Le();
  return ne === null ? t.memoizedState = e : Ou(t, ne.memoizedState, e);
}, useTransition: function() {
  var e = eo(or)[0], t = Le().memoizedState;
  return [e, t];
}, useMutableSource: ku, useSyncExternalStore: Su, useId: Fu, unstable_isNewReconciler: !1 };
function Fe(e, t) {
  if (e && e.defaultProps) {
    t = G({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Fo(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : G({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var _l = { isMounted: function(e) {
  return (e = e._reactInternals) ? Vt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), l = Nt(e), o = tt(r, l);
  o.payload = t, n != null && (o.callback = n), t = St(e, o, l), t !== null && (Ue(t, e, l, r), Ar(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), l = Nt(e), o = tt(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = St(e, o, l), t !== null && (Ue(t, e, l, r), Ar(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = he(), r = Nt(e), l = tt(n, r);
  l.tag = 2, t != null && (l.callback = t), t = St(e, l, r), t !== null && (Ue(t, e, r, n), Ar(t, e, r));
} };
function Rs(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Jn(n, r) || !Jn(l, o) : !0;
}
function Uu(e, t, n) {
  var r = !1, l = Et, o = t.contextType;
  return typeof o == "object" && o !== null ? o = $e(o) : (l = we(t) ? At : fe.current, r = t.contextTypes, o = (r = r != null) ? pn(e, l) : Et), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = _l, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Os(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && _l.enqueueReplaceState(t, t.state, null);
}
function Do(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, _i(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = $e(o) : (o = we(t) ? At : fe.current, l.context = pn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Fo(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && _l.enqueueReplaceState(l, l.state, null), sl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function gn(e, t) {
  try {
    var n = "", r = t;
    do
      n += Gc(r), r = r.return;
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
var Nf = typeof WeakMap == "function" ? WeakMap : Map;
function bu(e, t, n) {
  n = tt(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    fl || (fl = !0, Yo = r), Io(e, t);
  }, n;
}
function Bu(e, t, n) {
  n = tt(-1, n), n.tag = 3;
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
    Io(e, t), typeof r != "function" && (jt === null ? jt = /* @__PURE__ */ new Set([this]) : jt.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function Fs(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Nf();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = If.bind(null, e, t, n), t.then(e, e));
}
function Ds(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Is(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = tt(-1, 1), t.tag = 2, St(n, t, 1))), n.lanes |= 1), e);
}
var _f = it.ReactCurrentOwner, ye = !1;
function pe(e, t, n, r) {
  t.child = e === null ? gu(t, null, n, r) : mn(t, e.child, n, r);
}
function As(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return cn(t, l), r = Ti(e, t, n, r, o, l), n = Mi(), e !== null && !ye ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, ot(e, t, l)) : (K && n && yi(t), t.flags |= 1, pe(e, t, r, l), t.child);
}
function Us(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !bi(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Hu(e, t, o, r, l)) : (e = Vr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Jn, n(i, r) && e.ref === t.ref) return ot(e, t, l);
  }
  return t.flags |= 1, e = _t(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Hu(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Jn(o, r) && e.ref === t.ref) if (ye = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (ye = !0);
    else return t.lanes = e.lanes, ot(e, t, l);
  }
  return Ao(e, t, n, r, l);
}
function Wu(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, B(ln, Se), Se |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, B(ln, Se), Se |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, B(ln, Se), Se |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, B(ln, Se), Se |= r;
  return pe(e, t, l, n), t.child;
}
function Vu(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ao(e, t, n, r, l) {
  var o = we(n) ? At : fe.current;
  return o = pn(t, o), cn(t, l), n = Ti(e, t, n, r, o, l), r = Mi(), e !== null && !ye ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, ot(e, t, l)) : (K && r && yi(t), t.flags |= 1, pe(e, t, n, l), t.child);
}
function bs(e, t, n, r, l) {
  if (we(n)) {
    var o = !0;
    nl(t);
  } else o = !1;
  if (cn(t, l), t.stateNode === null) Br(e, t), Uu(t, n, r), Do(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, u = t.memoizedProps;
    i.props = u;
    var a = i.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = $e(d) : (d = we(n) ? At : fe.current, d = pn(t, d));
    var g = n.getDerivedStateFromProps, v = typeof g == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    v || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== r || a !== d) && Os(t, i, r, d), dt = !1;
    var h = t.memoizedState;
    i.state = h, sl(t, r, i, l), a = t.memoizedState, u !== r || h !== a || xe.current || dt ? (typeof g == "function" && (Fo(t, n, g, r), a = t.memoizedState), (u = dt || Rs(t, n, u, r, h, a, d)) ? (v || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = a), i.props = r, i.state = a, i.context = d, r = u) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, xu(e, t), u = t.memoizedProps, d = t.type === t.elementType ? u : Fe(t.type, u), i.props = d, v = t.pendingProps, h = i.context, a = n.contextType, typeof a == "object" && a !== null ? a = $e(a) : (a = we(n) ? At : fe.current, a = pn(t, a));
    var m = n.getDerivedStateFromProps;
    (g = typeof m == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== v || h !== a) && Os(t, i, r, a), dt = !1, h = t.memoizedState, i.state = h, sl(t, r, i, l);
    var y = t.memoizedState;
    u !== v || h !== y || xe.current || dt ? (typeof m == "function" && (Fo(t, n, m, r), y = t.memoizedState), (d = dt || Rs(t, n, d, r, h, y, a) || !1) ? (g || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, y, a), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, y, a)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = y), i.props = r, i.state = y, i.context = a, r = d) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Uo(e, t, n, r, o, l);
}
function Uo(e, t, n, r, l, o) {
  Vu(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && Cs(t, n, !1), ot(e, t, o);
  r = t.stateNode, _f.current = t;
  var u = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = mn(t, e.child, null, o), t.child = mn(t, null, u, o)) : pe(e, t, u, o), t.memoizedState = r.state, l && Cs(t, n, !0), t.child;
}
function Qu(e) {
  var t = e.stateNode;
  t.pendingContext ? _s(e, t.pendingContext, t.pendingContext !== t.context) : t.context && _s(e, t.context, !1), Ci(e, t.containerInfo);
}
function Bs(e, t, n, r, l) {
  return hn(), wi(l), t.flags |= 256, pe(e, t, n, r), t.child;
}
var bo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Bo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ku(e, t, n) {
  var r = t.pendingProps, l = Y.current, o = !1, i = (t.flags & 128) !== 0, u;
  if ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), B(Y, l & 1), e === null)
    return Ro(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = zl(i, r, 0, null), e = It(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Bo(n), t.memoizedState = bo, e) : Ri(t, i));
  if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return Cf(e, t, i, r, u, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, u = l.sibling;
    var a = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = a, t.deletions = null) : (r = _t(l, a), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? o = _t(u, o) : (o = It(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? Bo(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = bo, r;
  }
  return o = e.child, e = o.sibling, r = _t(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Ri(e, t) {
  return t = zl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function zr(e, t, n, r) {
  return r !== null && wi(r), mn(t, e.child, null, n), e = Ri(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Cf(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = to(Error(N(422))), zr(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = zl({ mode: "visible", children: r.children }, l, 0, null), o = It(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && mn(t, e.child, null, i), t.child.memoizedState = Bo(i), t.memoizedState = bo, o);
  if (!(t.mode & 1)) return zr(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
    return r = u, o = Error(N(419)), r = to(o, r, void 0), zr(e, t, i, r);
  }
  if (u = (i & e.childLanes) !== 0, ye || u) {
    if (r = oe, r !== null) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, lt(e, l), Ue(r, e, l, -1));
    }
    return Ui(), r = to(Error(N(421))), zr(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Af.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, je = kt(l.nextSibling), Ne = t, K = !0, Ie = null, e !== null && (ze[Pe++] = qe, ze[Pe++] = et, ze[Pe++] = Ut, qe = e.id, et = e.overflow, Ut = t), t = Ri(t, r.children), t.flags |= 4096, t);
}
function Hs(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Oo(e.return, t, n);
}
function no(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function Yu(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (pe(e, t, r.children, n), r = Y.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Hs(e, n, t);
      else if (e.tag === 19) Hs(e, n, t);
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
  if (B(Y, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && al(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), no(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && al(e) === null) {
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
function Br(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function ot(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Bt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(N(153));
  if (t.child !== null) {
    for (e = t.child, n = _t(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = _t(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Ef(e, t, n) {
  switch (t.tag) {
    case 3:
      Qu(t), hn();
      break;
    case 5:
      wu(t);
      break;
    case 1:
      we(t.type) && nl(t);
      break;
    case 4:
      Ci(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      B(ol, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (B(Y, Y.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Ku(e, t, n) : (B(Y, Y.current & 1), e = ot(e, t, n), e !== null ? e.sibling : null);
      B(Y, Y.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Yu(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), B(Y, Y.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Wu(e, t, n);
  }
  return ot(e, t, n);
}
var Xu, Ho, Gu, Zu;
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
Ho = function() {
};
Gu = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Ft(Ke.current);
    var o = null;
    switch (n) {
      case "input":
        l = co(e, l), r = co(e, r), o = [];
        break;
      case "select":
        l = G({}, l, { value: void 0 }), r = G({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = ho(e, l), r = ho(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = el);
    }
    vo(n, r);
    var i;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var u = l[d];
      for (i in u) u.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Vn.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in r) {
      var a = r[d];
      if (u = l != null ? l[d] : void 0, r.hasOwnProperty(d) && a !== u && (a != null || u != null)) if (d === "style") if (u) {
        for (i in u) !u.hasOwnProperty(i) || a && a.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in a) a.hasOwnProperty(i) && u[i] !== a[i] && (n || (n = {}), n[i] = a[i]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = a;
      else d === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, u = u ? u.__html : void 0, a != null && u !== a && (o = o || []).push(d, a)) : d === "children" ? typeof a != "string" && typeof a != "number" || (o = o || []).push(d, "" + a) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Vn.hasOwnProperty(d) ? (a != null && d === "onScroll" && H("scroll", e), o || u === a || (o = [])) : (o = o || []).push(d, a));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
Zu = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function zn(e, t) {
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
function zf(e, t, n) {
  var r = t.pendingProps;
  switch (xi(t), t.tag) {
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
      return we(t.type) && tl(), ce(t), null;
    case 3:
      return r = t.stateNode, vn(), W(xe), W(fe), zi(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Cr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ie !== null && (Zo(Ie), Ie = null))), Ho(e, t), ce(t), null;
    case 5:
      Ei(t);
      var l = Ft(rr.current);
      if (n = t.type, e !== null && t.stateNode != null) Gu(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(N(166));
          return ce(t), null;
        }
        if (e = Ft(Ke.current), Cr(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Ve] = t, r[tr] = o, e = (t.mode & 1) !== 0, n) {
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
              Ji(r, o), H("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, H("invalid", r);
              break;
            case "textarea":
              es(r, o), H("invalid", r);
          }
          vo(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var u = o[i];
            i === "children" ? typeof u == "string" ? r.textContent !== u && (o.suppressHydrationWarning !== !0 && _r(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (o.suppressHydrationWarning !== !0 && _r(
              r.textContent,
              u,
              e
            ), l = ["children", "" + u]) : Vn.hasOwnProperty(i) && u != null && i === "onScroll" && H("scroll", r);
          }
          switch (n) {
            case "input":
              gr(r), qi(r, o, !0);
              break;
            case "textarea":
              gr(r), ts(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = el);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = _a(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[Ve] = t, e[tr] = r, Xu(e, t, !1, !1), t.stateNode = e;
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
                Ji(e, r), l = co(e, r), H("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = G({}, r, { value: void 0 }), H("invalid", e);
                break;
              case "textarea":
                es(e, r), l = ho(e, r), H("invalid", e);
                break;
              default:
                l = r;
            }
            vo(n, l), u = l;
            for (o in u) if (u.hasOwnProperty(o)) {
              var a = u[o];
              o === "style" ? za(e, a) : o === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && Ca(e, a)) : o === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && Qn(e, a) : typeof a == "number" && Qn(e, "" + a) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Vn.hasOwnProperty(o) ? a != null && o === "onScroll" && H("scroll", e) : a != null && li(e, o, a, i));
            }
            switch (n) {
              case "input":
                gr(e), qi(e, r, !1);
                break;
              case "textarea":
                gr(e), ts(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Ct(r.value));
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
      if (e && t.stateNode != null) Zu(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(N(166));
        if (n = Ft(rr.current), Ft(Ke.current), Cr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ve] = t, (o = r.nodeValue !== n) && (e = Ne, e !== null)) switch (e.tag) {
            case 3:
              _r(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && _r(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ve] = t, t.stateNode = r;
      }
      return ce(t), null;
    case 13:
      if (W(Y), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (K && je !== null && t.mode & 1 && !(t.flags & 128)) mu(), hn(), t.flags |= 98560, o = !1;
        else if (o = Cr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(N(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(N(317));
            o[Ve] = t;
          } else hn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ce(t), o = !1;
        } else Ie !== null && (Zo(Ie), Ie = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Y.current & 1 ? re === 0 && (re = 3) : Ui())), t.updateQueue !== null && (t.flags |= 4), ce(t), null);
    case 4:
      return vn(), Ho(e, t), e === null && qn(t.stateNode.containerInfo), ce(t), null;
    case 10:
      return ji(t.type._context), ce(t), null;
    case 17:
      return we(t.type) && tl(), ce(t), null;
    case 19:
      if (W(Y), o = t.memoizedState, o === null) return ce(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) zn(o, !1);
      else {
        if (re !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = al(e), i !== null) {
            for (t.flags |= 128, zn(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return B(Y, Y.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && ee() > yn && (t.flags |= 128, r = !0, zn(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = al(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), zn(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !K) return ce(t), null;
        } else 2 * ee() - o.renderingStartTime > yn && n !== 1073741824 && (t.flags |= 128, r = !0, zn(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = ee(), t.sibling = null, n = Y.current, B(Y, r ? n & 1 | 2 : n & 1), t) : (ce(t), null);
    case 22:
    case 23:
      return Ai(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Se & 1073741824 && (ce(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ce(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(N(156, t.tag));
}
function Pf(e, t) {
  switch (xi(t), t.tag) {
    case 1:
      return we(t.type) && tl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return vn(), W(xe), W(fe), zi(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Ei(t), null;
    case 13:
      if (W(Y), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(N(340));
        hn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return W(Y), null;
    case 4:
      return vn(), null;
    case 10:
      return ji(t.type._context), null;
    case 22:
    case 23:
      return Ai(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Pr = !1, de = !1, Tf = typeof WeakSet == "function" ? WeakSet : Set, M = null;
function rn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    J(e, t, r);
  }
  else n.current = null;
}
function Wo(e, t, n) {
  try {
    n();
  } catch (r) {
    J(e, t, r);
  }
}
var Ws = !1;
function Mf(e, t) {
  if (Eo = Zr, e = nu(), gi(e)) {
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
        var i = 0, u = -1, a = -1, d = 0, g = 0, v = e, h = null;
        t: for (; ; ) {
          for (var m; v !== n || l !== 0 && v.nodeType !== 3 || (u = i + l), v !== o || r !== 0 && v.nodeType !== 3 || (a = i + r), v.nodeType === 3 && (i += v.nodeValue.length), (m = v.firstChild) !== null; )
            h = v, v = m;
          for (; ; ) {
            if (v === e) break t;
            if (h === n && ++d === l && (u = i), h === o && ++g === r && (a = i), (m = v.nextSibling) !== null) break;
            v = h, h = v.parentNode;
          }
          v = m;
        }
        n = u === -1 || a === -1 ? null : { start: u, end: a };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (zo = { focusedElem: e, selectionRange: n }, Zr = !1, M = t; M !== null; ) if (t = M, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, M = e;
  else for (; M !== null; ) {
    t = M;
    try {
      var y = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (y !== null) {
            var x = y.memoizedProps, z = y.memoizedState, f = t.stateNode, c = f.getSnapshotBeforeUpdate(t.elementType === t.type ? x : Fe(t.type, x), z);
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
          throw Error(N(163));
      }
    } catch (w) {
      J(t, t.return, w);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, M = e;
      break;
    }
    M = t.return;
  }
  return y = Ws, Ws = !1, y;
}
function bn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Wo(t, n, o);
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
function Vo(e) {
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
  t !== null && (e.alternate = null, Ju(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ve], delete t[tr], delete t[Mo], delete t[pf], delete t[hf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function qu(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Vs(e) {
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
function Qo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = el));
  else if (r !== 4 && (e = e.child, e !== null)) for (Qo(e, t, n), e = e.sibling; e !== null; ) Qo(e, t, n), e = e.sibling;
}
function Ko(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Ko(e, t, n), e = e.sibling; e !== null; ) Ko(e, t, n), e = e.sibling;
}
var ie = null, De = !1;
function ut(e, t, n) {
  for (n = n.child; n !== null; ) ec(e, t, n), n = n.sibling;
}
function ec(e, t, n) {
  if (Qe && typeof Qe.onCommitFiberUnmount == "function") try {
    Qe.onCommitFiberUnmount(yl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      de || rn(n, t);
    case 6:
      var r = ie, l = De;
      ie = null, ut(e, t, n), ie = r, De = l, ie !== null && (De ? (e = ie, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ie.removeChild(n.stateNode));
      break;
    case 18:
      ie !== null && (De ? (e = ie, n = n.stateNode, e.nodeType === 8 ? Xl(e.parentNode, n) : e.nodeType === 1 && Xl(e, n), Gn(e)) : Xl(ie, n.stateNode));
      break;
    case 4:
      r = ie, l = De, ie = n.stateNode.containerInfo, De = !0, ut(e, t, n), ie = r, De = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!de && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && Wo(n, t, i), l = l.next;
        } while (l !== r);
      }
      ut(e, t, n);
      break;
    case 1:
      if (!de && (rn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (u) {
        J(n, t, u);
      }
      ut(e, t, n);
      break;
    case 21:
      ut(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (de = (r = de) || n.memoizedState !== null, ut(e, t, n), de = r) : ut(e, t, n);
      break;
    default:
      ut(e, t, n);
  }
}
function Qs(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Tf()), t.forEach(function(r) {
      var l = Uf.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Oe(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, u = i;
      e: for (; u !== null; ) {
        switch (u.tag) {
          case 5:
            ie = u.stateNode, De = !1;
            break e;
          case 3:
            ie = u.stateNode.containerInfo, De = !0;
            break e;
          case 4:
            ie = u.stateNode.containerInfo, De = !0;
            break e;
        }
        u = u.return;
      }
      if (ie === null) throw Error(N(160));
      ec(o, i, l), ie = null, De = !1;
      var a = l.alternate;
      a !== null && (a.return = null), l.return = null;
    } catch (d) {
      J(l, t, d);
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
      if (Oe(t, e), He(e), r & 4) {
        try {
          bn(3, e, e.return), Cl(3, e);
        } catch (x) {
          J(e, e.return, x);
        }
        try {
          bn(5, e, e.return);
        } catch (x) {
          J(e, e.return, x);
        }
      }
      break;
    case 1:
      Oe(t, e), He(e), r & 512 && n !== null && rn(n, n.return);
      break;
    case 5:
      if (Oe(t, e), He(e), r & 512 && n !== null && rn(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Qn(l, "");
        } catch (x) {
          J(e, e.return, x);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, u = e.type, a = e.updateQueue;
        if (e.updateQueue = null, a !== null) try {
          u === "input" && o.type === "radio" && o.name != null && ja(l, o), go(u, i);
          var d = go(u, o);
          for (i = 0; i < a.length; i += 2) {
            var g = a[i], v = a[i + 1];
            g === "style" ? za(l, v) : g === "dangerouslySetInnerHTML" ? Ca(l, v) : g === "children" ? Qn(l, v) : li(l, g, v, d);
          }
          switch (u) {
            case "input":
              fo(l, o);
              break;
            case "textarea":
              Na(l, o);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var m = o.value;
              m != null ? on(l, !!o.multiple, m, !1) : h !== !!o.multiple && (o.defaultValue != null ? on(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : on(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[tr] = o;
        } catch (x) {
          J(e, e.return, x);
        }
      }
      break;
    case 6:
      if (Oe(t, e), He(e), r & 4) {
        if (e.stateNode === null) throw Error(N(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (x) {
          J(e, e.return, x);
        }
      }
      break;
    case 3:
      if (Oe(t, e), He(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Gn(t.containerInfo);
      } catch (x) {
        J(e, e.return, x);
      }
      break;
    case 4:
      Oe(t, e), He(e);
      break;
    case 13:
      Oe(t, e), He(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Di = ee())), r & 4 && Qs(e);
      break;
    case 22:
      if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (de = (d = de) || g, Oe(t, e), de = d) : Oe(t, e), He(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !g && e.mode & 1) for (M = e, g = e.child; g !== null; ) {
          for (v = M = g; M !== null; ) {
            switch (h = M, m = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                bn(4, h, h.return);
                break;
              case 1:
                rn(h, h.return);
                var y = h.stateNode;
                if (typeof y.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, y.props = t.memoizedProps, y.state = t.memoizedState, y.componentWillUnmount();
                  } catch (x) {
                    J(r, n, x);
                  }
                }
                break;
              case 5:
                rn(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Ys(v);
                  continue;
                }
            }
            m !== null ? (m.return = h, M = m) : Ys(v);
          }
          g = g.sibling;
        }
        e: for (g = null, v = e; ; ) {
          if (v.tag === 5) {
            if (g === null) {
              g = v;
              try {
                l = v.stateNode, d ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (u = v.stateNode, a = v.memoizedProps.style, i = a != null && a.hasOwnProperty("display") ? a.display : null, u.style.display = Ea("display", i));
              } catch (x) {
                J(e, e.return, x);
              }
            }
          } else if (v.tag === 6) {
            if (g === null) try {
              v.stateNode.nodeValue = d ? "" : v.memoizedProps;
            } catch (x) {
              J(e, e.return, x);
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
      Oe(t, e), He(e), r & 4 && Qs(e);
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
          r.flags & 32 && (Qn(l, ""), r.flags &= -33);
          var o = Vs(e);
          Ko(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, u = Vs(e);
          Qo(e, u, i);
          break;
        default:
          throw Error(N(161));
      }
    } catch (a) {
      J(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function $f(e, t, n) {
  M = e, nc(e);
}
function nc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; M !== null; ) {
    var l = M, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Pr;
      if (!i) {
        var u = l.alternate, a = u !== null && u.memoizedState !== null || de;
        u = Pr;
        var d = de;
        if (Pr = i, (de = a) && !d) for (M = l; M !== null; ) i = M, a = i.child, i.tag === 22 && i.memoizedState !== null ? Xs(l) : a !== null ? (a.return = i, M = a) : Xs(l);
        for (; o !== null; ) M = o, nc(o), o = o.sibling;
        M = l, Pr = u, de = d;
      }
      Ks(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, M = o) : Ks(e);
  }
}
function Ks(e) {
  for (; M !== null; ) {
    var t = M;
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
            o !== null && Ms(t, o, r);
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
              Ms(t, i, n);
            }
            break;
          case 5:
            var u = t.stateNode;
            if (n === null && t.flags & 4) {
              n = u;
              var a = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  a.autoFocus && n.focus();
                  break;
                case "img":
                  a.src && (n.src = a.src);
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
                var g = d.memoizedState;
                if (g !== null) {
                  var v = g.dehydrated;
                  v !== null && Gn(v);
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
        de || t.flags & 512 && Vo(t);
      } catch (h) {
        J(t, t.return, h);
      }
    }
    if (t === e) {
      M = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, M = n;
      break;
    }
    M = t.return;
  }
}
function Ys(e) {
  for (; M !== null; ) {
    var t = M;
    if (t === e) {
      M = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, M = n;
      break;
    }
    M = t.return;
  }
}
function Xs(e) {
  for (; M !== null; ) {
    var t = M;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Cl(4, t);
          } catch (a) {
            J(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              J(t, l, a);
            }
          }
          var o = t.return;
          try {
            Vo(t);
          } catch (a) {
            J(t, o, a);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Vo(t);
          } catch (a) {
            J(t, i, a);
          }
      }
    } catch (a) {
      J(t, t.return, a);
    }
    if (t === e) {
      M = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      u.return = t.return, M = u;
      break;
    }
    M = t.return;
  }
}
var Lf = Math.ceil, dl = it.ReactCurrentDispatcher, Oi = it.ReactCurrentOwner, Me = it.ReactCurrentBatchConfig, U = 0, oe = null, te = null, se = 0, Se = 0, ln = Pt(0), re = 0, sr = null, Bt = 0, El = 0, Fi = 0, Bn = null, ge = null, Di = 0, yn = 1 / 0, Ge = null, fl = !1, Yo = null, jt = null, Tr = !1, mt = null, pl = 0, Hn = 0, Xo = null, Hr = -1, Wr = 0;
function he() {
  return U & 6 ? ee() : Hr !== -1 ? Hr : Hr = ee();
}
function Nt(e) {
  return e.mode & 1 ? U & 2 && se !== 0 ? se & -se : vf.transition !== null ? (Wr === 0 && (Wr = Ua()), Wr) : (e = b, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ka(e.type)), e) : 1;
}
function Ue(e, t, n, r) {
  if (50 < Hn) throw Hn = 0, Xo = null, Error(N(185));
  ur(e, n, r), (!(U & 2) || e !== oe) && (e === oe && (!(U & 2) && (El |= n), re === 4 && pt(e, se)), ke(e, r), n === 1 && U === 0 && !(t.mode & 1) && (yn = ee() + 500, jl && Tt()));
}
function ke(e, t) {
  var n = e.callbackNode;
  md(e, t);
  var r = Gr(e, e === oe ? se : 0);
  if (r === 0) n !== null && ls(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && ls(n), t === 1) e.tag === 0 ? mf(Gs.bind(null, e)) : fu(Gs.bind(null, e)), df(function() {
      !(U & 6) && Tt();
    }), n = null;
    else {
      switch (ba(r)) {
        case 1:
          n = ui;
          break;
        case 4:
          n = Ia;
          break;
        case 16:
          n = Xr;
          break;
        case 536870912:
          n = Aa;
          break;
        default:
          n = Xr;
      }
      n = cc(n, rc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function rc(e, t) {
  if (Hr = -1, Wr = 0, U & 6) throw Error(N(327));
  var n = e.callbackNode;
  if (dn() && e.callbackNode !== n) return null;
  var r = Gr(e, e === oe ? se : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = hl(e, r);
  else {
    t = r;
    var l = U;
    U |= 2;
    var o = oc();
    (oe !== e || se !== t) && (Ge = null, yn = ee() + 500, Dt(e, t));
    do
      try {
        Ff();
        break;
      } catch (u) {
        lc(e, u);
      }
    while (!0);
    Si(), dl.current = o, U = l, te !== null ? t = 0 : (oe = null, se = 0, t = re);
  }
  if (t !== 0) {
    if (t === 2 && (l = So(e), l !== 0 && (r = l, t = Go(e, l))), t === 1) throw n = sr, Dt(e, 0), pt(e, r), ke(e, ee()), n;
    if (t === 6) pt(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Rf(l) && (t = hl(e, r), t === 2 && (o = So(e), o !== 0 && (r = o, t = Go(e, o))), t === 1)) throw n = sr, Dt(e, 0), pt(e, r), ke(e, ee()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          Lt(e, ge, Ge);
          break;
        case 3:
          if (pt(e, r), (r & 130023424) === r && (t = Di + 500 - ee(), 10 < t)) {
            if (Gr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              he(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = To(Lt.bind(null, e, ge, Ge), t);
            break;
          }
          Lt(e, ge, Ge);
          break;
        case 4:
          if (pt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - Ae(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = ee() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Lf(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = To(Lt.bind(null, e, ge, Ge), r);
            break;
          }
          Lt(e, ge, Ge);
          break;
        case 5:
          Lt(e, ge, Ge);
          break;
        default:
          throw Error(N(329));
      }
    }
  }
  return ke(e, ee()), e.callbackNode === n ? rc.bind(null, e) : null;
}
function Go(e, t) {
  var n = Bn;
  return e.current.memoizedState.isDehydrated && (Dt(e, t).flags |= 256), e = hl(e, t), e !== 2 && (t = ge, ge = n, t !== null && Zo(t)), e;
}
function Zo(e) {
  ge === null ? ge = e : ge.push.apply(ge, e);
}
function Rf(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!be(o(), l)) return !1;
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
function pt(e, t) {
  for (t &= ~Fi, t &= ~El, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ae(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Gs(e) {
  if (U & 6) throw Error(N(327));
  dn();
  var t = Gr(e, 0);
  if (!(t & 1)) return ke(e, ee()), null;
  var n = hl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = So(e);
    r !== 0 && (t = r, n = Go(e, r));
  }
  if (n === 1) throw n = sr, Dt(e, 0), pt(e, t), ke(e, ee()), n;
  if (n === 6) throw Error(N(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Lt(e, ge, Ge), ke(e, ee()), null;
}
function Ii(e, t) {
  var n = U;
  U |= 1;
  try {
    return e(t);
  } finally {
    U = n, U === 0 && (yn = ee() + 500, jl && Tt());
  }
}
function Ht(e) {
  mt !== null && mt.tag === 0 && !(U & 6) && dn();
  var t = U;
  U |= 1;
  var n = Me.transition, r = b;
  try {
    if (Me.transition = null, b = 1, e) return e();
  } finally {
    b = r, Me.transition = n, U = t, !(U & 6) && Tt();
  }
}
function Ai() {
  Se = ln.current, W(ln);
}
function Dt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, cf(n)), te !== null) for (n = te.return; n !== null; ) {
    var r = n;
    switch (xi(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && tl();
        break;
      case 3:
        vn(), W(xe), W(fe), zi();
        break;
      case 5:
        Ei(r);
        break;
      case 4:
        vn();
        break;
      case 13:
        W(Y);
        break;
      case 19:
        W(Y);
        break;
      case 10:
        ji(r.type._context);
        break;
      case 22:
      case 23:
        Ai();
    }
    n = n.return;
  }
  if (oe = e, te = e = _t(e.current, null), se = Se = t, re = 0, sr = null, Fi = El = Bt = 0, ge = Bn = null, Ot !== null) {
    for (t = 0; t < Ot.length; t++) if (n = Ot[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var i = o.next;
        o.next = l, r.next = i;
      }
      n.pending = r;
    }
    Ot = null;
  }
  return e;
}
function lc(e, t) {
  do {
    var n = te;
    try {
      if (Si(), Ur.current = cl, ul) {
        for (var r = X.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        ul = !1;
      }
      if (bt = 0, le = ne = X = null, Un = !1, lr = 0, Oi.current = null, n === null || n.return === null) {
        re = 1, sr = t, te = null;
        break;
      }
      e: {
        var o = e, i = n.return, u = n, a = t;
        if (t = se, u.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
          var d = a, g = u, v = g.tag;
          if (!(g.mode & 1) && (v === 0 || v === 11 || v === 15)) {
            var h = g.alternate;
            h ? (g.updateQueue = h.updateQueue, g.memoizedState = h.memoizedState, g.lanes = h.lanes) : (g.updateQueue = null, g.memoizedState = null);
          }
          var m = Ds(i);
          if (m !== null) {
            m.flags &= -257, Is(m, i, u, o, t), m.mode & 1 && Fs(o, d, t), t = m, a = d;
            var y = t.updateQueue;
            if (y === null) {
              var x = /* @__PURE__ */ new Set();
              x.add(a), t.updateQueue = x;
            } else y.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              Fs(o, d, t), Ui();
              break e;
            }
            a = Error(N(426));
          }
        } else if (K && u.mode & 1) {
          var z = Ds(i);
          if (z !== null) {
            !(z.flags & 65536) && (z.flags |= 256), Is(z, i, u, o, t), wi(gn(a, u));
            break e;
          }
        }
        o = a = gn(a, u), re !== 4 && (re = 2), Bn === null ? Bn = [o] : Bn.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var f = bu(o, a, t);
              Ts(o, f);
              break e;
            case 1:
              u = a;
              var c = o.type, p = o.stateNode;
              if (!(o.flags & 128) && (typeof c.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (jt === null || !jt.has(p)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var w = Bu(o, u, t);
                Ts(o, w);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      sc(n);
    } catch (_) {
      t = _, te === n && n !== null && (te = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function oc() {
  var e = dl.current;
  return dl.current = cl, e === null ? cl : e;
}
function Ui() {
  (re === 0 || re === 3 || re === 2) && (re = 4), oe === null || !(Bt & 268435455) && !(El & 268435455) || pt(oe, se);
}
function hl(e, t) {
  var n = U;
  U |= 2;
  var r = oc();
  (oe !== e || se !== t) && (Ge = null, Dt(e, t));
  do
    try {
      Of();
      break;
    } catch (l) {
      lc(e, l);
    }
  while (!0);
  if (Si(), U = n, dl.current = r, te !== null) throw Error(N(261));
  return oe = null, se = 0, re;
}
function Of() {
  for (; te !== null; ) ic(te);
}
function Ff() {
  for (; te !== null && !id(); ) ic(te);
}
function ic(e) {
  var t = uc(e.alternate, e, Se);
  e.memoizedProps = e.pendingProps, t === null ? sc(e) : te = t, Oi.current = null;
}
function sc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Pf(n, t), n !== null) {
        n.flags &= 32767, te = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        re = 6, te = null;
        return;
      }
    } else if (n = zf(n, t, Se), n !== null) {
      te = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      te = t;
      return;
    }
    te = t = e;
  } while (t !== null);
  re === 0 && (re = 5);
}
function Lt(e, t, n) {
  var r = b, l = Me.transition;
  try {
    Me.transition = null, b = 1, Df(e, t, n, r);
  } finally {
    Me.transition = l, b = r;
  }
  return null;
}
function Df(e, t, n, r) {
  do
    dn();
  while (mt !== null);
  if (U & 6) throw Error(N(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(N(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (vd(e, o), e === oe && (te = oe = null, se = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Tr || (Tr = !0, cc(Xr, function() {
    return dn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Me.transition, Me.transition = null;
    var i = b;
    b = 1;
    var u = U;
    U |= 4, Oi.current = null, Mf(e, n), tc(n, e), nf(zo), Zr = !!Eo, zo = Eo = null, e.current = n, $f(n), sd(), U = u, b = i, Me.transition = o;
  } else e.current = n;
  if (Tr && (Tr = !1, mt = e, pl = l), o = e.pendingLanes, o === 0 && (jt = null), cd(n.stateNode), ke(e, ee()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (fl) throw fl = !1, e = Yo, Yo = null, e;
  return pl & 1 && e.tag !== 0 && dn(), o = e.pendingLanes, o & 1 ? e === Xo ? Hn++ : (Hn = 0, Xo = e) : Hn = 0, Tt(), null;
}
function dn() {
  if (mt !== null) {
    var e = ba(pl), t = Me.transition, n = b;
    try {
      if (Me.transition = null, b = 16 > e ? 16 : e, mt === null) var r = !1;
      else {
        if (e = mt, mt = null, pl = 0, U & 6) throw Error(N(331));
        var l = U;
        for (U |= 4, M = e.current; M !== null; ) {
          var o = M, i = o.child;
          if (M.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var a = 0; a < u.length; a++) {
                var d = u[a];
                for (M = d; M !== null; ) {
                  var g = M;
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      bn(8, g, o);
                  }
                  var v = g.child;
                  if (v !== null) v.return = g, M = v;
                  else for (; M !== null; ) {
                    g = M;
                    var h = g.sibling, m = g.return;
                    if (Ju(g), g === d) {
                      M = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = m, M = h;
                      break;
                    }
                    M = m;
                  }
                }
              }
              var y = o.alternate;
              if (y !== null) {
                var x = y.child;
                if (x !== null) {
                  y.child = null;
                  do {
                    var z = x.sibling;
                    x.sibling = null, x = z;
                  } while (x !== null);
                }
              }
              M = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, M = i;
          else e: for (; M !== null; ) {
            if (o = M, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                bn(9, o, o.return);
            }
            var f = o.sibling;
            if (f !== null) {
              f.return = o.return, M = f;
              break e;
            }
            M = o.return;
          }
        }
        var c = e.current;
        for (M = c; M !== null; ) {
          i = M;
          var p = i.child;
          if (i.subtreeFlags & 2064 && p !== null) p.return = i, M = p;
          else e: for (i = c; M !== null; ) {
            if (u = M, u.flags & 2048) try {
              switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  Cl(9, u);
              }
            } catch (_) {
              J(u, u.return, _);
            }
            if (u === i) {
              M = null;
              break e;
            }
            var w = u.sibling;
            if (w !== null) {
              w.return = u.return, M = w;
              break e;
            }
            M = u.return;
          }
        }
        if (U = l, Tt(), Qe && typeof Qe.onPostCommitFiberRoot == "function") try {
          Qe.onPostCommitFiberRoot(yl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      b = n, Me.transition = t;
    }
  }
  return !1;
}
function Zs(e, t, n) {
  t = gn(n, t), t = bu(e, t, 1), e = St(e, t, 1), t = he(), e !== null && (ur(e, 1, t), ke(e, t));
}
function J(e, t, n) {
  if (e.tag === 3) Zs(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Zs(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (jt === null || !jt.has(r))) {
        e = gn(n, e), e = Bu(t, e, 1), t = St(t, e, 1), e = he(), t !== null && (ur(t, 1, e), ke(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function If(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = he(), e.pingedLanes |= e.suspendedLanes & n, oe === e && (se & n) === n && (re === 4 || re === 3 && (se & 130023424) === se && 500 > ee() - Di ? Dt(e, 0) : Fi |= n), ke(e, t);
}
function ac(e, t) {
  t === 0 && (e.mode & 1 ? (t = wr, wr <<= 1, !(wr & 130023424) && (wr = 4194304)) : t = 1);
  var n = he();
  e = lt(e, t), e !== null && (ur(e, t, n), ke(e, n));
}
function Af(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), ac(e, n);
}
function Uf(e, t) {
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
  r !== null && r.delete(t), ac(e, n);
}
var uc;
uc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || xe.current) ye = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return ye = !1, Ef(e, t, n);
    ye = !!(e.flags & 131072);
  }
  else ye = !1, K && t.flags & 1048576 && pu(t, ll, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Br(e, t), e = t.pendingProps;
      var l = pn(t, fe.current);
      cn(t, n), l = Ti(null, t, r, e, l, n);
      var o = Mi();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, we(r) ? (o = !0, nl(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, _i(t), l.updater = _l, t.stateNode = l, l._reactInternals = t, Do(t, r, e, n), t = Uo(null, t, r, !0, o, n)) : (t.tag = 0, K && o && yi(t), pe(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Br(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Bf(r), e = Fe(r, e), l) {
          case 0:
            t = Ao(null, t, r, e, n);
            break e;
          case 1:
            t = bs(null, t, r, e, n);
            break e;
          case 11:
            t = As(null, t, r, e, n);
            break e;
          case 14:
            t = Us(null, t, r, Fe(r.type, e), n);
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
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), Ao(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), bs(e, t, r, l, n);
    case 3:
      e: {
        if (Qu(t), e === null) throw Error(N(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, xu(e, t), sl(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = gn(Error(N(423)), t), t = Bs(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = gn(Error(N(424)), t), t = Bs(e, t, r, n, l);
          break e;
        } else for (je = kt(t.stateNode.containerInfo.firstChild), Ne = t, K = !0, Ie = null, n = gu(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (hn(), r === l) {
            t = ot(e, t, n);
            break e;
          }
          pe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return wu(t), e === null && Ro(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Po(r, l) ? i = null : o !== null && Po(r, o) && (t.flags |= 32), Vu(e, t), pe(e, t, i, n), t.child;
    case 6:
      return e === null && Ro(t), null;
    case 13:
      return Ku(e, t, n);
    case 4:
      return Ci(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = mn(t, null, r, n) : pe(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), As(e, t, r, l, n);
    case 7:
      return pe(e, t, t.pendingProps, n), t.child;
    case 8:
      return pe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return pe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, B(ol, r._currentValue), r._currentValue = i, o !== null) if (be(o.value, i)) {
          if (o.children === l.children && !xe.current) {
            t = ot(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var u = o.dependencies;
          if (u !== null) {
            i = o.child;
            for (var a = u.firstContext; a !== null; ) {
              if (a.context === r) {
                if (o.tag === 1) {
                  a = tt(-1, n & -n), a.tag = 2;
                  var d = o.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var g = d.pending;
                    g === null ? a.next = a : (a.next = g.next, g.next = a), d.pending = a;
                  }
                }
                o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), Oo(
                  o.return,
                  n,
                  t
                ), u.lanes |= n;
                break;
              }
              a = a.next;
            }
          } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (i = o.return, i === null) throw Error(N(341));
            i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), Oo(i, n, t), i = o.sibling;
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
        pe(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, cn(t, n), l = $e(l), r = r(l), t.flags |= 1, pe(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Fe(r, t.pendingProps), l = Fe(r.type, l), Us(e, t, r, l, n);
    case 15:
      return Hu(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Fe(r, l), Br(e, t), t.tag = 1, we(r) ? (e = !0, nl(t)) : e = !1, cn(t, n), Uu(t, r, l), Do(t, r, l, n), Uo(null, t, r, !0, e, n);
    case 19:
      return Yu(e, t, n);
    case 22:
      return Wu(e, t, n);
  }
  throw Error(N(156, t.tag));
};
function cc(e, t) {
  return Da(e, t);
}
function bf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Te(e, t, n, r) {
  return new bf(e, t, n, r);
}
function bi(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Bf(e) {
  if (typeof e == "function") return bi(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ii) return 11;
    if (e === si) return 14;
  }
  return 2;
}
function _t(e, t) {
  var n = e.alternate;
  return n === null ? (n = Te(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Vr(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") bi(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case Yt:
      return It(n.children, l, o, t);
    case oi:
      i = 8, l |= 8;
      break;
    case io:
      return e = Te(12, n, t, l | 2), e.elementType = io, e.lanes = o, e;
    case so:
      return e = Te(13, n, t, l), e.elementType = so, e.lanes = o, e;
    case ao:
      return e = Te(19, n, t, l), e.elementType = ao, e.lanes = o, e;
    case wa:
      return zl(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case ya:
          i = 10;
          break e;
        case xa:
          i = 9;
          break e;
        case ii:
          i = 11;
          break e;
        case si:
          i = 14;
          break e;
        case ct:
          i = 16, r = null;
          break e;
      }
      throw Error(N(130, e == null ? e : typeof e, ""));
  }
  return t = Te(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function It(e, t, n, r) {
  return e = Te(7, e, r, t), e.lanes = n, e;
}
function zl(e, t, n, r) {
  return e = Te(22, e, r, t), e.elementType = wa, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ro(e, t, n) {
  return e = Te(6, e, null, t), e.lanes = n, e;
}
function lo(e, t, n) {
  return t = Te(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Hf(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Il(0), this.expirationTimes = Il(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Il(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Bi(e, t, n, r, l, o, i, u, a) {
  return e = new Hf(e, t, n, u, a), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Te(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, _i(o), e;
}
function Wf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Kt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function dc(e) {
  if (!e) return Et;
  e = e._reactInternals;
  e: {
    if (Vt(e) !== e || e.tag !== 1) throw Error(N(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (we(t.type)) {
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
    if (we(n)) return du(e, n, t);
  }
  return t;
}
function fc(e, t, n, r, l, o, i, u, a) {
  return e = Bi(n, r, !0, e, l, o, i, u, a), e.context = dc(null), n = e.current, r = he(), l = Nt(n), o = tt(r, l), o.callback = t ?? null, St(n, o, l), e.current.lanes = l, ur(e, l, r), ke(e, r), e;
}
function Pl(e, t, n, r) {
  var l = t.current, o = he(), i = Nt(l);
  return n = dc(n), t.context === null ? t.context = n : t.pendingContext = n, t = tt(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = St(l, t, i), e !== null && (Ue(e, l, i, o), Ar(e, l, i)), i;
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
function Js(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Hi(e, t) {
  Js(e, t), (e = e.alternate) && Js(e, t);
}
function Vf() {
  return null;
}
var pc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Wi(e) {
  this._internalRoot = e;
}
Tl.prototype.render = Wi.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(N(409));
  Pl(e, t, null, null);
};
Tl.prototype.unmount = Wi.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ht(function() {
      Pl(null, e, null, null);
    }), t[rt] = null;
  }
};
function Tl(e) {
  this._internalRoot = e;
}
Tl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Wa();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ft.length && t !== 0 && t < ft[n].priority; n++) ;
    ft.splice(n, 0, e), n === 0 && Qa(e);
  }
};
function Vi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Ml(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function qs() {
}
function Qf(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = ml(i);
        o.call(d);
      };
    }
    var i = fc(t, r, e, 0, null, !1, !1, "", qs);
    return e._reactRootContainer = i, e[rt] = i.current, qn(e.nodeType === 8 ? e.parentNode : e), Ht(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function() {
      var d = ml(a);
      u.call(d);
    };
  }
  var a = Bi(e, 0, !1, null, null, !1, !1, "", qs);
  return e._reactRootContainer = a, e[rt] = a.current, qn(e.nodeType === 8 ? e.parentNode : e), Ht(function() {
    Pl(t, a, n, r);
  }), a;
}
function $l(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var u = l;
      l = function() {
        var a = ml(i);
        u.call(a);
      };
    }
    Pl(t, i, e, l);
  } else i = Qf(n, t, e, l, r);
  return ml(i);
}
Ba = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = $n(t.pendingLanes);
        n !== 0 && (ci(t, n | 1), ke(t, ee()), !(U & 6) && (yn = ee() + 500, Tt()));
      }
      break;
    case 13:
      Ht(function() {
        var r = lt(e, 1);
        if (r !== null) {
          var l = he();
          Ue(r, e, 1, l);
        }
      }), Hi(e, 1);
  }
};
di = function(e) {
  if (e.tag === 13) {
    var t = lt(e, 134217728);
    if (t !== null) {
      var n = he();
      Ue(t, e, 134217728, n);
    }
    Hi(e, 134217728);
  }
};
Ha = function(e) {
  if (e.tag === 13) {
    var t = Nt(e), n = lt(e, t);
    if (n !== null) {
      var r = he();
      Ue(n, e, t, r);
    }
    Hi(e, t);
  }
};
Wa = function() {
  return b;
};
Va = function(e, t) {
  var n = b;
  try {
    return b = e, t();
  } finally {
    b = n;
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
            var l = Sl(r);
            if (!l) throw Error(N(90));
            Sa(r), fo(r, l);
          }
        }
      }
      break;
    case "textarea":
      Na(e, n);
      break;
    case "select":
      t = n.value, t != null && on(e, !!n.multiple, t, !1);
  }
};
Ma = Ii;
$a = Ht;
var Kf = { usingClientEntryPoint: !1, Events: [dr, Jt, Sl, Pa, Ta, Ii] }, Pn = { findFiberByHostInstance: Rt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Yf = { bundleType: Pn.bundleType, version: Pn.version, rendererPackageName: Pn.rendererPackageName, rendererConfig: Pn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: it.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Oa(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Pn.findFiberByHostInstance || Vf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Mr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Mr.isDisabled && Mr.supportsFiber) try {
    yl = Mr.inject(Yf), Qe = Mr;
  } catch {
  }
}
Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Kf;
Ce.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Vi(t)) throw Error(N(200));
  return Wf(e, t, null, n);
};
Ce.createRoot = function(e, t) {
  if (!Vi(e)) throw Error(N(299));
  var n = !1, r = "", l = pc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Bi(e, 1, !1, null, null, n, !1, r, l), e[rt] = t.current, qn(e.nodeType === 8 ? e.parentNode : e), new Wi(t);
};
Ce.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(N(188)) : (e = Object.keys(e).join(","), Error(N(268, e)));
  return e = Oa(t), e = e === null ? null : e.stateNode, e;
};
Ce.flushSync = function(e) {
  return Ht(e);
};
Ce.hydrate = function(e, t, n) {
  if (!Ml(t)) throw Error(N(200));
  return $l(null, e, t, !0, n);
};
Ce.hydrateRoot = function(e, t, n) {
  if (!Vi(e)) throw Error(N(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = pc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = fc(t, null, e, 1, n ?? null, l, !1, o, i), e[rt] = t.current, qn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Tl(t);
};
Ce.render = function(e, t, n) {
  if (!Ml(t)) throw Error(N(200));
  return $l(null, e, t, !1, n);
};
Ce.unmountComponentAtNode = function(e) {
  if (!Ml(e)) throw Error(N(40));
  return e._reactRootContainer ? (Ht(function() {
    $l(null, null, e, !1, function() {
      e._reactRootContainer = null, e[rt] = null;
    });
  }), !0) : !1;
};
Ce.unstable_batchedUpdates = Ii;
Ce.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Ml(n)) throw Error(N(200));
  if (e == null || e._reactInternals === void 0) throw Error(N(38));
  return $l(e, t, n, !1, r);
};
Ce.version = "18.3.1-next-f1338f8080-20240426";
function hc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(hc);
    } catch (e) {
      console.error(e);
    }
}
hc(), ha.exports = Ce;
var Xf = ha.exports, mc, ea = Xf;
mc = ea.createRoot, ea.hydrateRoot;
function F({ name: e, className: t }) {
  return /* @__PURE__ */ s.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("ha-icon", { icon: `mdi:${e}` }) });
}
const Gf = '<defs><linearGradient id="hl-mark-g" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#FFB547"/><stop offset="1" stop-color="#FF5A1F"/></linearGradient></defs><polygon points="256,62 452,222 452,446 60,446 60,222" fill="url(#hl-mark-g)" stroke="url(#hl-mark-g)" stroke-width="56" stroke-linejoin="round"/><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" fill="#fff" transform="translate(256 292) scale(10) translate(-12 -12)"/>';
function ta({ size: e = 28 }) {
  return /* @__PURE__ */ s.jsx(
    "svg",
    {
      className: "logo-mark",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      "aria-hidden": "true",
      dangerouslySetInnerHTML: { __html: Gf }
    }
  );
}
const $r = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
], Wn = { heat: "Heating", water: "Hot water" }, Ye = (e) => String((e == null ? void 0 : e.message) ?? e);
function Zf(e, t, n) {
  const [r, l] = $.useState(!1), [o, i] = $.useState(null);
  return { busy: r, result: o, send: async (a, d) => {
    l(!0);
    try {
      await e().callWS({ entry_id: t, channel: n, ...a }), i({ kind: "ok", text: d });
    } catch (g) {
      i({ kind: "error", text: Ye(g) });
    } finally {
      l(!1);
    }
  } };
}
const vt = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, Jf = [30, 60, 120, 180];
function qf({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onSchedule: l,
  onRooms: o
}) {
  const [i, u] = $.useState([]), [a, d] = $.useState("all");
  $.useEffect(() => {
    const m = e().connection.subscribeMessage((y) => u(y.rooms), {
      type: "hive_local/rooms/subscribe"
    });
    return () => {
      m.then((y) => y()).catch(() => {
      });
    };
  }, [e]);
  const g = t.flatMap((m) => m.channels.map((y) => {
    var x, z;
    return { d: m, c: y, s: ((z = (x = n[m.entry_id]) == null ? void 0 : x[y]) == null ? void 0 : z.status) ?? null };
  })), v = t.length > 1, h = [
    { id: "all", label: "All", icon: "" },
    { id: "heat", label: "Heating", icon: "radiator" },
    ...g.some(({ c: m }) => m === "water") ? [{ id: "water", label: "Hot water", icon: "water-boiler" }] : [],
    ...i.length ? [{ id: "rooms", label: "Rooms", icon: "home-thermometer-outline" }] : []
  ];
  return /* @__PURE__ */ s.jsx("div", { className: "home", children: t.length > 0 && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("h3", { className: "home-section", children: "Quick actions" }),
    /* @__PURE__ */ s.jsx(ep, { getHass: e, devices: t, status: n }),
    /* @__PURE__ */ s.jsx("h3", { className: "home-section", children: "Your devices" }),
    h.length > 2 && /* @__PURE__ */ s.jsx("div", { className: "pills", role: "tablist", "aria-label": "Show", children: h.map((m) => /* @__PURE__ */ s.jsxs("button", { role: "tab", "aria-selected": a === m.id, className: `pill ${a === m.id ? "on" : ""}`, onClick: () => d(m.id), children: [
      m.icon && /* @__PURE__ */ s.jsx(F, { name: m.icon }),
      " ",
      m.label
    ] }, m.id)) }),
    /* @__PURE__ */ s.jsxs("div", { className: "device-grid", children: [
      g.filter(({ c: m }) => a === "all" || a === m).map(({ d: m, c: y }) => {
        var x;
        return /* @__PURE__ */ s.jsx(
          np,
          {
            getHass: e,
            device: m,
            channel: y,
            info: (x = n[m.entry_id]) == null ? void 0 : x[y],
            showDevice: v,
            limits: r,
            onSchedule: () => l(m.entry_id, y)
          },
          `${m.entry_id}-${y}`
        );
      }),
      (a === "all" || a === "rooms") && i.map((m) => /* @__PURE__ */ s.jsx(tp, { room: m, showReceiver: v, onOpen: o }, m.id))
    ] })
  ] }) });
}
function ep({ getHass: e, devices: t, status: n }) {
  var v, h;
  const [r, l] = $.useState(null), [o, i] = $.useState(null), u = t.length > 1, a = async (m, y, x) => {
    l(m);
    try {
      for (const z of y) await e().callWS(z);
      i({ ok: !0, text: x });
    } catch (z) {
      i({ ok: !1, text: Ye(z) });
    } finally {
      l(null);
    }
  }, d = [];
  for (const m of t)
    for (const y of m.channels) {
      const x = (v = n[m.entry_id]) == null ? void 0 : v[y];
      if (((h = x == null ? void 0 : x.status) == null ? void 0 : h.mode) === "boost") continue;
      const z = vt((x == null ? void 0 : x.boost_minutes) ?? 30), f = y === "water" ? "hot water" : "heating";
      d.push({
        id: `boost-${m.entry_id}-${y}`,
        label: `Boost ${f} · ${z}${u ? ` (${m.name})` : ""}`,
        icon: "rocket-launch",
        kind: y,
        msgs: [{ type: "hive_local/boost", entry_id: m.entry_id, channel: y }],
        done: `Boosting ${f} for ${z}`
      });
    }
  const g = t.flatMap(
    (m) => m.channels.filter((y) => {
      var z, f, c;
      const x = (c = (f = (z = n[m.entry_id]) == null ? void 0 : z[y]) == null ? void 0 : f.status) == null ? void 0 : c.mode;
      return x && x !== "schedule";
    }).map((y) => ({ d: m, c: y }))
  );
  return g.length && d.push({
    id: "schedule",
    label: "Everything back to schedule",
    icon: "calendar-clock",
    kind: "neutral",
    msgs: g.map(
      ({ d: m, c: y }) => {
        var x, z, f;
        return ((f = (z = (x = n[m.entry_id]) == null ? void 0 : x[y]) == null ? void 0 : z.status) == null ? void 0 : f.mode) === "boost" ? { type: "hive_local/cancel_boost", entry_id: m.entry_id, channel: y } : { type: "hive_local/mode", entry_id: m.entry_id, channel: y, mode: "schedule" };
      }
    ),
    done: "Back on the schedule"
  }), /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "quick", children: d.map((m) => /* @__PURE__ */ s.jsxs("button", { className: `quick-action ${m.kind}`, disabled: r != null, onClick: () => a(m.id, m.msgs, m.done), children: [
      /* @__PURE__ */ s.jsx("span", { className: "quick-icon", children: /* @__PURE__ */ s.jsx(F, { name: r === m.id ? "timer-sand" : m.icon }) }),
      /* @__PURE__ */ s.jsx("span", { className: "quick-label", children: m.label })
    ] }, m.id)) }),
    o && /* @__PURE__ */ s.jsx("div", { className: `status ${o.ok ? "ok" : "error"}`, children: o.text })
  ] });
}
function tp({ room: e, showReceiver: t, onOpen: n }) {
  const r = e.target != null ? `${e.target}°` : e.target_range ? `${e.target_range[0]}–${e.target_range[1]}°` : null, l = `${e.valves.length} valve${e.valves.length === 1 ? "" : "s"}`;
  return /* @__PURE__ */ s.jsx("section", { className: `card device room-device ${e.heating ? "heating" : "idle"}`, children: /* @__PURE__ */ s.jsxs("div", { className: "device-head", role: "button", tabIndex: 0, onClick: n, onKeyDown: (o) => o.key === "Enter" && n(), children: [
    /* @__PURE__ */ s.jsxs("div", { className: "device-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "device-icon room", children: /* @__PURE__ */ s.jsx(F, { name: "home-thermometer-outline" }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "device-name", children: [
        /* @__PURE__ */ s.jsx("span", { children: e.name }),
        /* @__PURE__ */ s.jsxs("span", { className: "muted small", children: [
          t && e.receiver_name ? `${e.receiver_name} · ${l}` : l,
          e.battery_low ? /* @__PURE__ */ s.jsxs("span", { className: "warn", children: [
            " · battery ",
            e.lowest_battery,
            "%"
          ] }) : e.unavailable.length ? /* @__PURE__ */ s.jsxs("span", { className: "warn", children: [
            " · ",
            e.unavailable.length,
            " not responding"
          ] }) : null
        ] })
      ] }),
      /* @__PURE__ */ s.jsx("span", { className: "device-status", children: e.heating ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        "Heating to ",
        /* @__PURE__ */ s.jsx("b", { children: r }),
        " ",
        /* @__PURE__ */ s.jsx(F, { name: "fire", className: "status-icon heat" })
      ] }) : r ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        "Target ",
        /* @__PURE__ */ s.jsx("b", { children: r })
      ] }) : "No target" })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "device-row", children: /* @__PURE__ */ s.jsxs("div", { className: "device-big", children: [
      e.current_temperature != null ? e.current_temperature.toFixed(1) : "–",
      /* @__PURE__ */ s.jsx("span", { children: "°" }),
      /* @__PURE__ */ s.jsx("small", { children: e.temperature_source === "sensor" ? "Actual" : "Valves" })
    ] }) })
  ] }) });
}
function np({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  showDevice: l,
  limits: o,
  onSchedule: i
}) {
  var Mt;
  const u = n === "water", a = (r == null ? void 0 : r.status) ?? null, { busy: d, result: g, send: v } = Zf(e, t.entry_id, n), h = !!a && a.mode !== "off" && a.heating, m = !a || a.mode === "off" ? "off" : h ? "heating" : "idle", y = !u && (a == null ? void 0 : a.setpoint) != null && a.setpoint <= 1, x = u || (a == null ? void 0 : a.setpoint) == null ? null : y ? (r == null ? void 0 : r.frost_temperature) ?? null : a.setpoint, z = [
    { id: "schedule", label: "Schedule" },
    { id: "manual", label: u ? "Always on" : "Manual" },
    { id: "off", label: "Off" }
  ], f = (r == null ? void 0 : r.boost_minutes) ?? 30, c = (r == null ? void 0 : r.boost_temperature) ?? 21, [p, w] = $.useState(!1), _ = (o == null ? void 0 : o.boost_min_temp) ?? 5, E = (o == null ? void 0 : o.heat_max) ?? 32, S = (A) => Math.min(E, Math.max(_, Math.round(A * 2) / 2)), P = [.../* @__PURE__ */ new Set([...Jf, f])].filter((A) => A <= ((o == null ? void 0 : o.boost_max_minutes) ?? 360)).sort((A, at) => A - at), [C, k] = $.useState(null), j = $.useRef();
  $.useEffect(() => () => window.clearTimeout(j.current), []), $.useEffect(() => k(null), [a == null ? void 0 : a.setpoint, a == null ? void 0 : a.mode]);
  const D = !u && !!a && a.mode !== "off", R = (A) => {
    const Re = S((C ?? x ?? 20) + A);
    k(Re), window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      v({ type: "hive_local/target", temperature: Re }, `Set to ${Re}°`).then(
        () => window.setTimeout(() => k(null), 8e3)
      );
    }, 1200);
  }, V = C ?? x, Be = (A, at) => v({ type: "hive_local/boost", minutes: A, ...u ? {} : { temperature: at } }, `Boosting for ${vt(A)}`).then(
    () => w(!1)
  ), Xe = a ? a.mode === "boost" ? "Boost to" : y && C == null ? "Frost" : a.mode === "manual" ? "Hold at" : "Target" : "", [st, T] = $.useState(!1), L = (a == null ? void 0 : a.mode) === "boost";
  let O = "Waiting for the receiver…";
  a && (a.mode === "off" ? O = "Off" : L ? O = u ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    "Boosting ",
    /* @__PURE__ */ s.jsx(F, { name: "rocket-launch", className: "status-icon" })
  ] }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    "Boosting to ",
    /* @__PURE__ */ s.jsxs("b", { children: [
      a.setpoint,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ s.jsx(F, { name: "rocket-launch", className: "status-icon" })
  ] }) : u ? O = h ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    "Heating water ",
    /* @__PURE__ */ s.jsx(F, { name: "water", className: "status-icon" })
  ] }) : "Not heating now" : h ? O = /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    "Heating to ",
    /* @__PURE__ */ s.jsxs("b", { children: [
      x,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ s.jsx(F, { name: "fire", className: "status-icon" })
  ] }) : y ? O = /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    "Frost protection ",
    /* @__PURE__ */ s.jsxs("b", { children: [
      x,
      "°"
    ] })
  ] }) : O = x != null ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    "Target ",
    /* @__PURE__ */ s.jsxs("b", { children: [
      x,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ s.jsx(F, { name: "check-circle-outline", className: "status-icon done" })
  ] }) : "Idle");
  const Q = a ? a.mode === "boost" ? a.boost_remaining != null ? `Boost · ${vt(a.boost_remaining)} left` : "Boost" : a.mode === "schedule" ? "On schedule" : (Mt = z.find((A) => A.id === a.mode)) == null ? void 0 : Mt.label : "", q = () => T(!st);
  return /* @__PURE__ */ s.jsxs("section", { className: `card device ${n} ${m} ${st ? "open" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "device-head", role: "button", tabIndex: 0, "aria-expanded": st, onClick: q, onKeyDown: (A) => A.key === "Enter" && A.target === A.currentTarget && q(), children: [
      /* @__PURE__ */ s.jsxs("div", { className: "device-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: `device-icon ${n}`, children: /* @__PURE__ */ s.jsx(F, { name: u ? "water-boiler" : "radiator" }) }),
        /* @__PURE__ */ s.jsxs("div", { className: "device-name", children: [
          /* @__PURE__ */ s.jsx("span", { children: Wn[n] }),
          /* @__PURE__ */ s.jsx("span", { className: "muted small", children: l ? `${t.name} · ${Q}` : Q })
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "device-status", children: O })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "device-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "device-big", children: [
          u ? a ? a.mode === "off" ? "Off" : h ? "On" : "Idle" : "–" : (a == null ? void 0 : a.current_temperature) != null ? a.current_temperature.toFixed(1) : "–",
          !u && /* @__PURE__ */ s.jsx("span", { children: "°" }),
          /* @__PURE__ */ s.jsx("small", { children: u ? "Now" : "Actual" })
        ] }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            className: `device-action ${L ? "boosting" : ""}`,
            disabled: d || !a,
            onClick: (A) => {
              A.stopPropagation(), w(!0);
            },
            children: [
              /* @__PURE__ */ s.jsx(F, { name: "rocket-launch" }),
              " ",
              L ? "Boosting" : "Boost"
            ]
          }
        )
      ] })
    ] }),
    st && /* @__PURE__ */ s.jsxs("div", { className: "device-body", children: [
      !u && /* @__PURE__ */ s.jsxs("div", { className: "target-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "target-text", children: [
          /* @__PURE__ */ s.jsx("span", { className: "target-label", children: Xe || "Target" }),
          /* @__PURE__ */ s.jsx("span", { className: "muted small", children: a ? a.mode === "off" ? "Turn the heating on to set a target" : a.mode === "schedule" ? "Until the next scheduled change" : a.mode === "boost" ? "Keeps the boost time left" : "Held until you change it" : "" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "target-control", children: [
          /* @__PURE__ */ s.jsx("button", { className: "round target-btn", disabled: !D, onClick: () => R(-0.5), "aria-label": "Lower the target", children: /* @__PURE__ */ s.jsx(F, { name: "minus" }) }),
          /* @__PURE__ */ s.jsx("span", { className: `target-value ${C != null ? "pending" : ""}`, children: V != null && (a == null ? void 0 : a.mode) !== "off" ? `${V.toFixed(1)}°` : "–" }),
          /* @__PURE__ */ s.jsx("button", { className: "round target-btn", disabled: !D, onClick: () => R(0.5), "aria-label": "Raise the target", children: /* @__PURE__ */ s.jsx(F, { name: "plus" }) })
        ] })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "segmented full", children: z.map((A) => /* @__PURE__ */ s.jsx(
        "button",
        {
          className: (a == null ? void 0 : a.mode) === A.id ? "on" : "",
          disabled: d || !a,
          onClick: () => v({ type: "hive_local/mode", mode: A.id }, A.id === "schedule" ? "Following the schedule" : A.label),
          children: A.label
        },
        A.id
      )) }),
      /* @__PURE__ */ s.jsxs("button", { className: "ghost schedule-link", onClick: i, children: [
        /* @__PURE__ */ s.jsx(F, { name: "calendar-clock" }),
        " Open the ",
        u ? "hot water" : "heating",
        " schedule ",
        /* @__PURE__ */ s.jsx(F, { name: "chevron-right" })
      ] })
    ] }),
    (g == null ? void 0 : g.kind) === "error" && /* @__PURE__ */ s.jsx("div", { className: "status error", children: g.text }),
    p && /* @__PURE__ */ s.jsx(
      rp,
      {
        title: L ? "Boosting" : "Boost",
        subtitle: l ? `${t.name} · ${Wn[n]}` : Wn[n],
        water: u,
        boosting: L,
        remaining: (a == null ? void 0 : a.boost_remaining) ?? null,
        boostTarget: L ? (a == null ? void 0 : a.setpoint) ?? null : null,
        defaultMinutes: f,
        defaultTemp: c,
        durations: P,
        clampTemp: S,
        busy: d,
        onBoost: Be,
        onStop: () => v({ type: "hive_local/cancel_boost" }, "Boost cancelled").then(() => w(!1)),
        onClose: () => w(!1)
      }
    )
  ] });
}
function rp({
  title: e,
  subtitle: t,
  water: n,
  boosting: r,
  remaining: l,
  boostTarget: o,
  defaultMinutes: i,
  defaultTemp: u,
  durations: a,
  clampTemp: d,
  busy: g,
  onBoost: v,
  onStop: h,
  onClose: m
}) {
  const [y, x] = $.useState(i), [z, f] = $.useState(u);
  return $.useEffect(() => {
    const c = (p) => p.key === "Escape" && m();
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, [m]), /* @__PURE__ */ s.jsx("div", { className: "sheet-backdrop", onClick: (c) => {
    c.stopPropagation(), m();
  }, children: /* @__PURE__ */ s.jsxs("div", { className: `sheet ${n ? "water" : "heat"}`, role: "dialog", "aria-modal": "true", "aria-label": `${e} ${t}`, onClick: (c) => c.stopPropagation(), children: [
    /* @__PURE__ */ s.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ s.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ s.jsx("h2", { children: e }),
      /* @__PURE__ */ s.jsx("span", { className: "muted", children: t })
    ] }),
    r ? /* @__PURE__ */ s.jsxs("div", { className: "sheet-live", children: [
      /* @__PURE__ */ s.jsx(F, { name: "clock-outline" }),
      /* @__PURE__ */ s.jsxs("span", { children: [
        l != null ? `${vt(l)} left` : "Boosting",
        !n && o != null ? ` · to ${o}°` : ""
      ] })
    ] }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      !n && /* @__PURE__ */ s.jsxs("div", { className: "sheet-field", children: [
        /* @__PURE__ */ s.jsx("span", { className: "sheet-label", children: "Temperature" }),
        /* @__PURE__ */ s.jsxs("div", { className: "sheet-temp", children: [
          /* @__PURE__ */ s.jsx("button", { className: "round sheet-step", onClick: () => f(d(z - 0.5)), "aria-label": "Lower", children: /* @__PURE__ */ s.jsx(F, { name: "minus" }) }),
          /* @__PURE__ */ s.jsxs("span", { className: "sheet-temp-value", children: [
            z.toFixed(1),
            "°"
          ] }),
          /* @__PURE__ */ s.jsx("button", { className: "round sheet-step", onClick: () => f(d(z + 0.5)), "aria-label": "Raise", children: /* @__PURE__ */ s.jsx(F, { name: "plus" }) })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "sheet-field", children: [
        /* @__PURE__ */ s.jsx("span", { className: "sheet-label", children: "How long" }),
        /* @__PURE__ */ s.jsx("div", { className: "sheet-lengths", role: "radiogroup", "aria-label": "How long", children: a.map((c) => /* @__PURE__ */ s.jsx("button", { role: "radio", "aria-checked": c === y, className: c === y ? "on" : "", onClick: () => x(c), children: vt(c) }, c)) })
      ] })
    ] }),
    r ? /* @__PURE__ */ s.jsxs("button", { className: "sheet-go stop", disabled: g, onClick: h, children: [
      /* @__PURE__ */ s.jsx("span", { className: "stop-square" }),
      " Stop boost"
    ] }) : /* @__PURE__ */ s.jsx("button", { className: "sheet-go", disabled: g, onClick: () => v(y, z), children: n ? `Boost hot water for ${vt(y)}` : `Boost to ${z.toFixed(1)}° for ${vt(y)}` }),
    /* @__PURE__ */ s.jsx("button", { className: "ghost sheet-cancel", onClick: m, children: "Cancel" })
  ] }) });
}
const lp = {
  heat: { schedule: "Schedule", manual: "Manual", off: "Off", boost: "Boost" },
  water: { schedule: "Schedule", manual: "Always on", off: "Off", boost: "Boost" }
};
function op(e, t) {
  if (!t) return "Waiting for the receiver…";
  const n = t.mode === "boost" && t.boost_remaining != null ? `Boost · ${vt(t.boost_remaining)} left` : lp[e][t.mode] ?? t.mode;
  return e === "water" ? `${n} · ${t.heating ? "heating water" : "idle"}` : `${t.current_temperature == null ? "–" : `${t.current_temperature.toFixed(1)}°`} · ${n}${t.heating ? " · heating" : ""}`;
}
function ip({ devices: e, status: t, channel: n, onOpen: r }) {
  return /* @__PURE__ */ s.jsx("div", { className: "grid", children: e.map((l) => {
    var i, u;
    const o = (u = (i = t[l.entry_id]) == null ? void 0 : i[n]) == null ? void 0 : u.status;
    return /* @__PURE__ */ s.jsxs("button", { className: `card receiver-card ${n}`, onClick: () => r(l.entry_id), children: [
      /* @__PURE__ */ s.jsx(F, { name: n === "water" ? "water-boiler" : "radiator", className: "title-icon" }),
      /* @__PURE__ */ s.jsxs("span", { className: "receiver-text", children: [
        /* @__PURE__ */ s.jsx("span", { className: "receiver-name", children: l.name }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: op(n, o) })
      ] }),
      (o == null ? void 0 : o.heating) && /* @__PURE__ */ s.jsx("span", { className: "dot-heating", "aria-label": "Heating" }),
      /* @__PURE__ */ s.jsx(F, { name: "chevron-right" })
    ] }, l.entry_id);
  }) });
}
function sp({ value: e, onChange: t }) {
  return /* @__PURE__ */ s.jsxs("div", { className: "stepper", children: [
    /* @__PURE__ */ s.jsx("button", { className: "round", onClick: () => t(e - 0.5), "aria-label": "Lower", children: /* @__PURE__ */ s.jsx(F, { name: "minus" }) }),
    /* @__PURE__ */ s.jsxs("span", { className: "stepper-value", children: [
      e.toFixed(1),
      "°"
    ] }),
    /* @__PURE__ */ s.jsx("button", { className: "round", onClick: () => t(e + 0.5), "aria-label": "Raise", children: /* @__PURE__ */ s.jsx(F, { name: "plus" }) })
  ] });
}
const ap = 20, vl = (e) => e == null ? "–" : `${e.toFixed(1)}°`;
function up({ getHass: e }) {
  const [t, n] = $.useState(null), [r, l] = $.useState([]), [o, i] = $.useState(null), [u, a] = $.useState("");
  return $.useEffect(() => {
    const d = e().connection.subscribeMessage(
      (g) => {
        n(g.rooms), l(g.receivers);
      },
      { type: "hive_local/rooms/subscribe" }
    );
    return d.catch((g) => a(Ye(g))), () => {
      d.then((g) => g()).catch(() => {
      });
    };
  }, [e]), u ? /* @__PURE__ */ s.jsx("div", { className: "status error", children: u }) : t ? /* @__PURE__ */ s.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "rooms-head", children: [
      /* @__PURE__ */ s.jsx("p", { className: "muted", children: "Group your Hive radiator valves into rooms, on ZHA or Zigbee2MQTT. Add a temperature sensor to a room for a better reading than the valves' own." }),
      o !== "new" && /* @__PURE__ */ s.jsxs("button", { className: "primary", onClick: () => i("new"), children: [
        /* @__PURE__ */ s.jsx(F, { name: "plus" }),
        " Add room"
      ] })
    ] }),
    o === "new" && /* @__PURE__ */ s.jsx(na, { getHass: e, onDone: () => i(null) }),
    !t.length && o !== "new" && /* @__PURE__ */ s.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ s.jsx(F, { name: "home-thermometer-outline" }),
      /* @__PURE__ */ s.jsx("p", { children: "No rooms yet. Add a room and pick its Hive radiator valves." })
    ] }),
    cp(t, r).map(([d, g]) => /* @__PURE__ */ s.jsxs("section", { className: "zone", children: [
      d && /* @__PURE__ */ s.jsx("h3", { children: d }),
      /* @__PURE__ */ s.jsx("div", { className: "grid", children: g.map(
        (v) => o !== "new" && (o == null ? void 0 : o.id) === v.id ? /* @__PURE__ */ s.jsx(na, { getHass: e, room: v, onDone: () => i(null) }, v.id) : /* @__PURE__ */ s.jsx(dp, { getHass: e, room: v, onEdit: () => i(v) }, v.id)
      ) })
    ] }, d ?? "all"))
  ] }) : null;
}
function cp(e, t) {
  if (t.length <= 1) return e.length ? [[null, e]] : [];
  const n = t.map((l) => [`Heated by ${l.name}`, e.filter((o) => o.receiver === l.entry_id)]).filter(([, l]) => l.length), r = e.filter((l) => !t.some((o) => o.entry_id === l.receiver));
  return r.length && n.push(["Receiver not set", r]), n;
}
function dp({ getHass: e, room: t, onEdit: n }) {
  var v;
  const [r, l] = $.useState(null), [o, i] = $.useState(null), u = $.useRef(), a = r ?? t.target ?? ((v = t.target_range) == null ? void 0 : v[1]) ?? 20, d = (h) => {
    const m = Math.min(35, Math.max(5, h));
    l(m), i(null), window.clearTimeout(u.current), u.current = window.setTimeout(async () => {
      try {
        const y = await e().callWS({
          type: "hive_local/rooms/set_target",
          room_id: t.id,
          temperature: m
        });
        if (y.failed.length) {
          const x = t.valve_states.filter((z) => y.failed.includes(z.entity_id)).map((z) => z.name);
          i({ kind: "error", text: `Didn't take on ${x.join(", ")}. It may be asleep; try again shortly.` });
        }
      } catch (y) {
        i({ kind: "error", text: Ye(y) });
      } finally {
        l(null);
      }
    }, 700);
  }, g = t.temperature_source === "sensor" ? t.sensor_name : t.temperature_source === "valves" ? t.valve_states.filter((h) => h.available).length === 1 ? "From the valve" : "Average of the valves" : "No reading";
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
        /* @__PURE__ */ s.jsx("div", { className: "muted small", children: g })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "room-target", children: [
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: t.target_range && r == null ? `Valves set to ${vl(t.target_range[0])}–${vl(t.target_range[1])}` : "Target" }),
        /* @__PURE__ */ s.jsx(sp, { value: a, onChange: d })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("ul", { className: "valves", children: t.valve_states.map((h) => /* @__PURE__ */ s.jsx(fp, { valve: h, heating: t.heating_valves.includes(h.entity_id) }, h.entity_id)) }),
    o && /* @__PURE__ */ s.jsx("div", { className: `status ${o.kind}`, children: o.text })
  ] });
}
function fp({ valve: e, heating: t }) {
  const n = e.battery == null ? null : Number(e.battery), r = n != null && !Number.isNaN(n) && n <= ap;
  return /* @__PURE__ */ s.jsxs("li", { className: `valve ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ s.jsx(F, { name: t ? "fire" : "radiator", className: t ? "valve-icon heating" : "valve-icon" }),
    /* @__PURE__ */ s.jsx("span", { className: "valve-name", children: e.name }),
    e.available ? /* @__PURE__ */ s.jsxs("span", { className: "valve-temps", children: [
      vl(e.current_temperature),
      " ",
      /* @__PURE__ */ s.jsxs("span", { className: "muted", children: [
        "→ ",
        vl(e.target)
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
function na({ getHass: e, room: t, onDone: n }) {
  const [r, l] = $.useState(null), [o, i] = $.useState((t == null ? void 0 : t.receiver) ?? ""), [u, a] = $.useState((t == null ? void 0 : t.name) ?? ""), [d, g] = $.useState(new Set((t == null ? void 0 : t.valves) ?? [])), [v, h] = $.useState((t == null ? void 0 : t.sensor) ?? ""), [m, y] = $.useState(!1), [x, z] = $.useState(!1), [f, c] = $.useState("");
  $.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/candidates" }).then(l).catch((S) => c(Ye(S)));
  }, [e]);
  const p = ((r == null ? void 0 : r.receivers.length) ?? 0) > 1, w = async (S) => {
    y(!0), c("");
    try {
      await e().callWS(S), n();
    } catch (P) {
      c(Ye(P)), y(!1);
    }
  }, _ = (S) => g((P) => {
    const C = new Set(P);
    return C.has(S) ? C.delete(S) : C.add(S), C;
  }), E = /* @__PURE__ */ new Map();
  for (const S of (r == null ? void 0 : r.valves) ?? []) E.set(S.area ?? "No area", [...E.get(S.area ?? "No area") ?? [], S]);
  return /* @__PURE__ */ s.jsxs("section", { className: "card room-editor", children: [
    /* @__PURE__ */ s.jsx("h2", { children: t ? `Edit ${t.name}` : "New room" }),
    /* @__PURE__ */ s.jsxs(
      "form",
      {
        className: "stack",
        onSubmit: (S) => {
          S.preventDefault(), w({
            type: "hive_local/rooms/save",
            ...t ? { room_id: t.id } : {},
            name: u,
            valves: [...d],
            sensor: v || null,
            receiver: o || null
          });
        },
        children: [
          /* @__PURE__ */ s.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ s.jsx("span", { children: "Name" }),
            /* @__PURE__ */ s.jsx("input", { id: `room-name-${(t == null ? void 0 : t.id) ?? "new"}`, type: "text", value: u, maxLength: 40, placeholder: "Lounge", onChange: (S) => a(S.target.value) })
          ] }),
          /* @__PURE__ */ s.jsxs("fieldset", { className: "field", children: [
            /* @__PURE__ */ s.jsx("legend", { children: "Hive radiator valves" }),
            !r && !f && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Loading…" }),
            r && !r.valves.length && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "No Hive radiator valves found. Pair them with ZHA or Zigbee2MQTT first." }),
            [...E].map(([S, P]) => /* @__PURE__ */ s.jsxs("div", { className: "checklist", children: [
              /* @__PURE__ */ s.jsx("span", { className: "muted small", children: S }),
              P.map((C) => /* @__PURE__ */ s.jsxs("label", { className: "pick", children: [
                /* @__PURE__ */ s.jsx("input", { type: "checkbox", checked: d.has(C.entity_id), onChange: () => _(C.entity_id) }),
                " ",
                C.name
              ] }, C.entity_id))
            ] }, S))
          ] }),
          /* @__PURE__ */ s.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ s.jsx("span", { children: "Room temperature from" }),
            /* @__PURE__ */ s.jsxs("select", { id: `room-sensor-${(t == null ? void 0 : t.id) ?? "new"}`, value: v, onChange: (S) => h(S.target.value), children: [
              /* @__PURE__ */ s.jsx("option", { value: "", children: "The valves (their average)" }),
              ((r == null ? void 0 : r.sensors) ?? []).map((S) => /* @__PURE__ */ s.jsxs("option", { value: S.entity_id, children: [
                S.name,
                S.area ? ` · ${S.area}` : ""
              ] }, S.entity_id))
            ] })
          ] }),
          p && /* @__PURE__ */ s.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ s.jsx("span", { children: "Heated by" }),
            /* @__PURE__ */ s.jsxs("select", { id: `room-receiver-${(t == null ? void 0 : t.id) ?? "new"}`, value: o, onChange: (S) => i(S.target.value), children: [
              /* @__PURE__ */ s.jsx("option", { value: "", disabled: !0, children: "Choose the receiver for this room's radiators" }),
              r.receivers.map((S) => /* @__PURE__ */ s.jsx("option", { value: S.entry_id, children: S.name }, S.entry_id))
            ] })
          ] }),
          f && /* @__PURE__ */ s.jsx("div", { className: "status error", children: f }),
          /* @__PURE__ */ s.jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ s.jsx("button", { className: "primary", type: "submit", disabled: m || !u.trim() || !d.size || p && !o, children: t ? "Save" : "Add room" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "ghost", onClick: n, disabled: m, children: "Cancel" }),
            /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
            t && (x ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsxs("span", { className: "muted small", children: [
                "Delete ",
                t.name,
                "? The valves aren't changed."
              ] }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "danger", disabled: m, onClick: () => w({ type: "hive_local/rooms/delete", room_id: t.id }), children: "Delete" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "ghost", onClick: () => z(!1), children: "Keep" })
            ] }) : /* @__PURE__ */ s.jsxs("button", { type: "button", className: "danger", onClick: () => z(!0), disabled: m, children: [
              /* @__PURE__ */ s.jsx(F, { name: "delete-outline" }),
              " Delete room"
            ] }))
          ] })
        ]
      }
    )
  ] });
}
const pp = ["monday", "tuesday", "wednesday", "thursday", "friday"], hp = ["saturday", "sunday"], mp = (e) => e[0].toUpperCase() + e.slice(1, 3), gt = (e) => {
  const [t, n] = e.split(":").map(Number);
  return t * 60 + n;
};
function vp({
  getHass: e,
  device: t,
  channel: n,
  limits: r
}) {
  const [l, o] = $.useState({}), [i, u] = $.useState({}), [a, d] = $.useState("monday"), [g, v] = $.useState({ kind: "idle" }), h = t.entry_id, m = n === "water", y = JSON.stringify(l) !== JSON.stringify(i), x = $.useCallback(async () => {
    v({ kind: "busy", text: "Reading from receiver…" });
    try {
      const k = await e().callWS({
        type: "hive_local/get",
        entry_id: h,
        channel: n
      });
      o(k.schedule), u(k.schedule);
      const j = Object.keys(k.schedule).length;
      v(
        k.complete ? { kind: "ok", text: "Schedule read from receiver" } : j ? { kind: "error", text: `Only got ${j}/7 days — try reading again` } : { kind: "error", text: "No reply. On Zigbee2MQTT, check the receiver's friendly name; on ZHA, check the receiver is online." }
      );
    } catch (k) {
      v({ kind: "error", text: Ye(k) });
    }
  }, [h, n, e]);
  $.useEffect(() => {
    x();
  }, [x]);
  const z = async () => {
    const k = Object.fromEntries(
      $r.filter((j) => {
        var D;
        return JSON.stringify(l[j]) !== JSON.stringify(i[j]) && ((D = l[j]) == null ? void 0 : D.length);
      }).map((j) => [j, l[j]])
    );
    if (Object.keys(k).length) {
      v({ kind: "busy", text: "Writing to receiver…" });
      try {
        const j = await e().callWS({
          type: "hive_local/set",
          entry_id: h,
          channel: n,
          schedule: k
        }), D = { ...l, ...j.schedule };
        o(D), u(D);
        const R = Object.keys(j.schedule).map((V) => V[0].toUpperCase() + V.slice(1, 3));
        v({
          kind: "ok",
          text: `Wrote ${R.join(", ")}. Read back to confirm the receiver kept it.`
        });
      } catch (j) {
        v({ kind: "error", text: Ye(j) });
      }
    }
  }, f = l[a] ?? [], c = r.max_transitions, p = (k) => o((j) => ({ ...j, [a]: [...k].sort((D, R) => gt(D.time) - gt(R.time)) })), w = () => {
    const k = f[f.length - 1], j = k ? gp(f, gt(k.time) + 60) : "06:00", D = m ? r.water_on : (k == null ? void 0 : k.setpoint) ?? 20;
    p([...f, { time: j, setpoint: D }]);
  }, _ = (k) => o((j) => {
    const D = { ...j };
    for (const R of k) D[R] = f.map((V) => ({ ...V }));
    return D;
  }), E = $.useMemo(() => {
    const k = Object.values(l).flat().map((j) => j.setpoint).filter((j) => j > r.heat_min);
    return { lo: Math.min(15, ...k), hi: Math.max(24, ...k) };
  }, [l, r.heat_min]), S = $r[((/* @__PURE__ */ new Date()).getDay() + 6) % 7], P = yp();
  return /* @__PURE__ */ s.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ s.jsxs("section", { className: `card ${n}`, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title", children: [
          /* @__PURE__ */ s.jsx(F, { name: m ? "water-boiler" : "radiator", className: "title-icon" }),
          /* @__PURE__ */ s.jsxs("div", { children: [
            /* @__PURE__ */ s.jsx("h2", { children: m ? "Hot water schedule" : "Heating schedule" }),
            /* @__PURE__ */ s.jsx("div", { className: "muted small", children: "Stored on the receiver, so it keeps running without HA." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toolbar", children: [
          y && /* @__PURE__ */ s.jsx("span", { className: "chip unsaved", children: "Unsaved changes" }),
          /* @__PURE__ */ s.jsxs("button", { onClick: x, disabled: g.kind === "busy", children: [
            /* @__PURE__ */ s.jsx(F, { name: "download" }),
            " Read"
          ] }),
          /* @__PURE__ */ s.jsxs("button", { className: "primary", onClick: z, disabled: !y || g.kind === "busy", children: [
            /* @__PURE__ */ s.jsx(F, { name: "upload" }),
            " Write to receiver"
          ] })
        ] })
      ] }),
      g.text && /* @__PURE__ */ s.jsx("div", { className: `status ${g.kind}`, children: g.text }),
      /* @__PURE__ */ s.jsxs("div", { className: "week", children: [
        $r.map((k) => /* @__PURE__ */ s.jsxs("button", { className: `row ${k === a ? "selected" : ""}`, onClick: () => d(k), children: [
          /* @__PURE__ */ s.jsx("span", { className: `day ${k === S ? "today" : ""}`, children: mp(k) }),
          /* @__PURE__ */ s.jsx(
            xp,
            {
              transitions: l[k],
              isWater: m,
              limits: r,
              range: E,
              now: k === S ? P : null
            }
          )
        ] }, k)),
        /* @__PURE__ */ s.jsxs("div", { className: "row hours-row", children: [
          /* @__PURE__ */ s.jsx("span", { className: "day" }),
          /* @__PURE__ */ s.jsx("div", { className: "hours", children: [0, 3, 6, 9, 12, 15, 18, 21, 24].map((k) => /* @__PURE__ */ s.jsx("span", { style: { left: `${k / 24 * 100}%` }, children: String(k).padStart(2, "0") }, k)) })
        ] })
      ] }),
      !m && /* @__PURE__ */ s.jsxs("div", { className: "legend", children: [
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Cooler" }),
        /* @__PURE__ */ s.jsx("span", { className: "legend-bar" }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Warmer" }),
        /* @__PURE__ */ s.jsx("span", { className: "legend-off" }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Off (1°)" })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("section", { className: "card", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ s.jsx("h2", { children: a[0].toUpperCase() + a.slice(1) }),
        /* @__PURE__ */ s.jsxs("span", { className: "chip", children: [
          f.length,
          "/",
          c,
          " events"
        ] })
      ] }),
      f.length === 0 && /* @__PURE__ */ s.jsx("p", { className: "muted", children: "No events for this day yet." }),
      /* @__PURE__ */ s.jsx("div", { className: "events", children: f.map((k, j) => /* @__PURE__ */ s.jsxs("div", { className: "transition", children: [
        /* @__PURE__ */ s.jsx(
          "span",
          {
            className: "swatch",
            style: { background: m ? k.setpoint >= r.water_on ? "var(--hl-water)" : "var(--hl-off-fill)" : vc(k.setpoint, E, r) }
          }
        ),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            type: "time",
            value: k.time,
            onChange: (D) => p(f.map((R, V) => V === j ? { ...R, time: D.target.value } : R))
          }
        ),
        m ? /* @__PURE__ */ s.jsxs("div", { className: "segmented", children: [
          ["on", "off"].map((D) => {
            const R = D === "on" ? r.water_on : r.water_off;
            return /* @__PURE__ */ s.jsx(
              "button",
              {
                className: k.setpoint === R ? "on" : "",
                onClick: () => p(f.map((V, Be) => Be === j ? { ...V, setpoint: R } : V)),
                children: D === "on" ? "On" : "Off"
              },
              D
            );
          }),
          k.setpoint !== r.water_on && k.setpoint !== r.water_off && /* @__PURE__ */ s.jsxs("span", { className: "muted raw", title: "Value read from the receiver doesn't match WATER_ON/WATER_OFF in const.py", children: [
            k.setpoint,
            "°?"
          ] })
        ] }) : /* @__PURE__ */ s.jsxs("div", { className: "stepper", children: [
          /* @__PURE__ */ s.jsx("button", { className: "round", onClick: () => C(j, -0.5), "aria-label": "Lower", children: /* @__PURE__ */ s.jsx(F, { name: "minus" }) }),
          /* @__PURE__ */ s.jsx("span", { className: "stepper-value", children: k.setpoint <= r.heat_min ? "Off" : `${k.setpoint.toFixed(1)}°` }),
          /* @__PURE__ */ s.jsx("button", { className: "round", onClick: () => C(j, 0.5), "aria-label": "Raise", children: /* @__PURE__ */ s.jsx(F, { name: "plus" }) })
        ] }),
        /* @__PURE__ */ s.jsx("button", { className: "round danger", onClick: () => p(f.filter((D, R) => R !== j)), "aria-label": "Remove", children: /* @__PURE__ */ s.jsx(F, { name: "delete-outline" }) })
      ] }, j)) }),
      /* @__PURE__ */ s.jsxs("div", { className: "actions", children: [
        /* @__PURE__ */ s.jsxs("button", { onClick: w, disabled: f.length >= c, children: [
          /* @__PURE__ */ s.jsx(F, { name: "plus" }),
          " Add event"
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Copy this day to" }),
        /* @__PURE__ */ s.jsxs("div", { className: "segmented", children: [
          /* @__PURE__ */ s.jsx("button", { onClick: () => _(pp), disabled: !f.length, children: "Weekdays" }),
          /* @__PURE__ */ s.jsx("button", { onClick: () => _(hp), disabled: !f.length, children: "Weekend" }),
          /* @__PURE__ */ s.jsx("button", { onClick: () => _([...$r]), disabled: !f.length, children: "All" })
        ] })
      ] })
    ] })
  ] });
  function C(k, j) {
    p(
      f.map(
        (D, R) => R === k ? { ...D, setpoint: Math.min(r.heat_max, Math.max(r.heat_min, Math.round((D.setpoint + j) * 2) / 2)) } : D
      )
    );
  }
}
function gp(e, t) {
  const n = new Set(e.map((l) => gt(l.time)));
  let r = Math.min(t, 23 * 60 + 30);
  for (; n.has(r) && r < 1439; ) r += 15;
  return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function yp() {
  const e = () => {
    const r = /* @__PURE__ */ new Date();
    return r.getHours() * 60 + r.getMinutes();
  }, [t, n] = $.useState(e);
  return $.useEffect(() => {
    const r = setInterval(() => n(e()), 6e4);
    return () => clearInterval(r);
  }, []), t;
}
function vc(e, t, n) {
  if (e <= n.heat_min) return "var(--hl-off-fill)";
  const r = Math.min(1, Math.max(0, (e - t.lo) / Math.max(1, t.hi - t.lo)));
  return `hsl(${Math.round(42 - 34 * r)} ${Math.round(88 + 4 * r)}% ${Math.round(64 - 14 * r)}%)`;
}
function xp({
  transitions: e,
  isWater: t,
  limits: n,
  range: r,
  now: l
}) {
  const o = l != null && /* @__PURE__ */ s.jsx("i", { className: "now", style: { left: `${l / 1440 * 100}%` } });
  if (!(e != null && e.length)) return /* @__PURE__ */ s.jsx("div", { className: "timeline empty", children: o });
  const i = [...e].sort((a, d) => gt(a.time) - gt(d.time)), u = [{ time: "00:00", setpoint: i[i.length - 1].setpoint }, ...i];
  return /* @__PURE__ */ s.jsxs("div", { className: "timeline", children: [
    u.map((a, d) => {
      const g = gt(a.time), v = d + 1 < u.length ? gt(u[d + 1].time) : 1440;
      if (v <= g) return null;
      const h = t ? a.setpoint < n.water_on : a.setpoint <= n.heat_min;
      return /* @__PURE__ */ s.jsx(
        "span",
        {
          className: h ? "off" : "",
          title: `${a.time} → ${t ? h ? "Off" : "On" : h ? "Off" : `${a.setpoint}°`}`,
          style: {
            left: `${g / 1440 * 100}%`,
            width: `${(v - g) / 1440 * 100}%`,
            background: h ? void 0 : t ? "var(--hl-water)" : vc(a.setpoint, r, n)
          },
          children: !t && !h && v - g >= 120 ? `${a.setpoint}°` : ""
        },
        d
      );
    }),
    o
  ] });
}
const wp = [
  { id: 1, label: "Today" },
  { id: 7, label: "7 days" },
  { id: 30, label: "30 days" }
], kp = {
  1: "yesterday by this time",
  7: "the 7 days before",
  30: "the 30 days before"
}, Sp = 5 * 6e4, Je = (e) => {
  const t = Math.round(e);
  return t < 60 ? `${t}m` : t % 60 ? `${Math.floor(t / 60)}h ${t % 60}m` : `${t / 60}h`;
}, Rn = (e) => new Date(e * 1e3).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), gc = (e) => new Date(e * 1e3).toLocaleDateString([], { weekday: "short" }), yc = (e) => new Date(e * 1e3).toLocaleDateString([], { day: "numeric", month: "short" }), xc = (e) => new Date(e * 1e3).toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });
function jp({ getHass: e, devices: t }) {
  const [n, r] = $.useState(7);
  return /* @__PURE__ */ s.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "rooms-head", children: [
      /* @__PURE__ */ s.jsx("p", { className: "muted", children: "How long the boiler ran, how often it fired up and how warm it was, from Home Assistant's history." }),
      /* @__PURE__ */ s.jsx("div", { className: "segmented", role: "radiogroup", "aria-label": "Period", children: wp.map((l) => /* @__PURE__ */ s.jsx("button", { role: "radio", "aria-checked": l.id === n, className: l.id === n ? "on" : "", onClick: () => r(l.id), children: l.label }, l.id)) })
    ] }),
    t.flatMap(
      (l) => l.channels.map((o) => /* @__PURE__ */ s.jsx(Np, { getHass: e, device: l, channel: o, period: n, showDevice: t.length > 1 }, `${l.entry_id}-${o}`))
    )
  ] });
}
function Np({
  getHass: e,
  device: t,
  channel: n,
  period: r,
  showDevice: l
}) {
  const [o, i] = $.useState(null), [u, a] = $.useState(""), [d, g] = $.useState(!0), v = n === "water", h = $.useCallback(() => {
    e().callWS({ type: "hive_local/stats", entry_id: t.entry_id, channel: n, days: r }).then((y) => {
      i(y), a("");
    }).catch((y) => a(Ye(y))).finally(() => g(!1));
  }, [e, t.entry_id, n, r]);
  $.useEffect(() => {
    g(!0), i(null), h();
    const y = setInterval(h, Sp);
    return () => clearInterval(y);
  }, [h]);
  const m = (o == null ? void 0 : o.period) === r ? o : null;
  return /* @__PURE__ */ s.jsxs("section", { className: `card stats ${n}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ s.jsx(F, { name: v ? "water-boiler" : "radiator", className: "title-icon" }),
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsx("h2", { children: Wn[n] }),
          l && /* @__PURE__ */ s.jsx("div", { className: "muted small", children: t.name })
        ] })
      ] }),
      d && /* @__PURE__ */ s.jsx("span", { className: "chip", children: "Loading…" })
    ] }),
    u && /* @__PURE__ */ s.jsx("div", { className: "status error", children: u }),
    m && !m.has_data && /* @__PURE__ */ s.jsxs("div", { className: "status", children: [
      "No history for ",
      /* @__PURE__ */ s.jsx("code", { children: m.entity_id }),
      " in this period yet. Stats build up as Home Assistant records the receiver."
    ] }),
    (m == null ? void 0 : m.has_data) && /* @__PURE__ */ s.jsx(_p, { data: m, water: v })
  ] });
}
function _p({ data: e, water: t }) {
  const n = (e.end - e.start) / 60, r = e.previous, l = !!(r != null && r.has_data) && r.known_minutes >= 0.5 * e.known_minutes, o = l ? e.heating_minutes - r.heating_minutes : 0, i = e.known_minutes ? e.heating_minutes / e.known_minutes : 0, u = e.temperature, a = t ? "Hot water on" : "Boiler on";
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsxs("div", { className: "kpis", children: [
      /* @__PURE__ */ s.jsx(Lr, { label: a, value: Je(e.heating_minutes), children: l ? /* @__PURE__ */ s.jsxs("span", { className: "delta", children: [
        /* @__PURE__ */ s.jsx(F, { name: Math.abs(o) < 1 ? "approximately-equal" : o > 0 ? "arrow-up" : "arrow-down" }),
        Math.abs(o) < 1 ? "Same as" : `${Je(Math.abs(o))} ${o > 0 ? "more" : "less"} than`,
        " ",
        kp[e.period]
      ] }) : `${Math.round(i * 100)}% of the time` }),
      /* @__PURE__ */ s.jsx(Lr, { label: "Times it fired up", value: String(e.cycles), children: e.cycles ? `About ${Je(e.heating_minutes / e.cycles)} each` : "Not at all" }),
      !t && /* @__PURE__ */ s.jsxs(Lr, { label: "Average temperature", value: u.avg != null ? `${u.avg.toFixed(1)}°` : "–", children: [
        u.min != null && u.max != null ? `${u.min.toFixed(1)}° to ${u.max.toFixed(1)}°` : "No readings",
        e.target_avg != null && ` · target ${e.target_avg.toFixed(1)}°`
      ] }),
      /* @__PURE__ */ s.jsx(Lr, { label: "Boosts", value: String(e.boosts), children: e.mode_minutes.boost ? `${Je(e.mode_minutes.boost)} boosting` : "None" })
    ] }),
    e.known_minutes < 0.9 * n && /* @__PURE__ */ s.jsxs("div", { className: "status small", children: [
      "History covers ",
      Je(e.known_minutes),
      " of this period. Home Assistant's recorder keeps 10 days unless",
      " ",
      /* @__PURE__ */ s.jsx("code", { children: "purge_keep_days" }),
      " is raised, and nothing is recorded while the receiver is unavailable."
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "stats-block", children: [
      /* @__PURE__ */ s.jsx("h3", { children: t ? "When it was on" : "Temperature and heating" }),
      /* @__PURE__ */ s.jsx(Pp, { series: e.series, period: e.period, now: e.end, water: t })
    ] }),
    e.period > 1 && /* @__PURE__ */ s.jsxs("div", { className: "stats-block", children: [
      /* @__PURE__ */ s.jsx("h3", { children: t ? "On per day" : "Boiler on per day" }),
      /* @__PURE__ */ s.jsx(Tp, { days: e.days, period: e.period, water: t })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "stats-block", children: [
      /* @__PURE__ */ s.jsx("h3", { children: "Time in each mode" }),
      /* @__PURE__ */ s.jsx(Mp, { minutes: e.mode_minutes, total: e.known_minutes, water: t })
    ] })
  ] });
}
function Lr({ label: e, value: t, children: n }) {
  return /* @__PURE__ */ s.jsxs("div", { className: "kpi", children: [
    /* @__PURE__ */ s.jsx("div", { className: "kpi-label", children: e }),
    /* @__PURE__ */ s.jsx("div", { className: "kpi-value", children: t }),
    /* @__PURE__ */ s.jsx("div", { className: "kpi-sub", children: n })
  ] });
}
function wc() {
  const e = $.useRef(null), [t, n] = $.useState(0);
  return $.useLayoutEffect(() => {
    const r = e.current;
    if (!r) return;
    n(r.clientWidth);
    const l = new ResizeObserver(([o]) => n(o.contentRect.width));
    return l.observe(r), () => l.disconnect();
  }, []), [e, t];
}
const Z = { left: 34, right: 10, top: 10 };
function Cp(e, t, n) {
  return n === 1 ? `${Rn(e.t)}–${Rn(e.t + t)}` : `${xc(e.t)}, ${Rn(e.t)}–${Rn(e.t + t)}`;
}
function Ep(e, t, n) {
  const r = [];
  if (n === 1) {
    for (let i = 0; i <= 24; i += 6) r.push({ t: e + i * 3600, label: i === 24 ? "" : Rn(e + i * 3600) });
    return r;
  }
  const l = Math.round((t - e) / 86400), o = n === 7 ? 1 : 5;
  for (let i = 0; i < l; i += o) {
    const u = e + i * 86400;
    r.push({ t: u, label: n === 7 ? gc(u) : yc(u) });
  }
  return r;
}
function zp(e) {
  if (!e.length) return [15, 25, 2];
  let t = Math.floor(Math.min(...e) - 0.5), n = Math.ceil(Math.max(...e) + 0.5);
  if (n - t < 4) {
    const l = (n + t) / 2;
    t = Math.floor(l - 2), n = Math.ceil(l + 2);
  }
  const r = n - t > 10 ? 4 : n - t > 5 ? 2 : 1;
  return t = Math.floor(t / r) * r, n = Math.ceil(n / r) * r, [t, n, r];
}
function Pp({ series: e, period: t, now: n, water: r }) {
  const [l, o] = wc(), [i, u] = $.useState(null);
  if (!e.length) return null;
  const a = e.length > 1 ? e[1].t - e[0].t : 3600, d = e[0].t, g = e[e.length - 1].t + a, v = r ? 0 : 170, h = Z.top + v + (r ? 0 : 10), m = r ? 36 : 14, y = h + m + 24, x = Math.max(0, o - Z.left - Z.right), z = (j) => Z.left + (j - d) / (g - d) * x, f = r ? [] : e.flatMap((j) => [j.current, j.target]).filter((j) => j != null), [c, p, w] = zp(f), _ = (j) => Z.top + v - (j - c) / (p - c) * v, E = [];
  for (let j = c; j <= p; j += w) E.push(j);
  const S = (j, D) => {
    let R = "", V = !1;
    return e.forEach((Be) => {
      const Xe = j(Be);
      if (Xe == null) {
        V = !1;
        return;
      }
      D ? R += `${V ? "L" : "M"}${z(Be.t)},${_(Xe)}H${z(Be.t + a)}` : R += `${V ? "L" : "M"}${z(Be.t + a / 2)},${_(Xe)}`, V = !0;
    }), R;
  }, P = (j) => {
    const D = j.currentTarget.getBoundingClientRect(), R = d + (j.clientX - D.left - Z.left) / x * (g - d), V = Math.floor((R - d) / a);
    u(V >= 0 && V < e.length ? V : null);
  }, C = i != null ? e[i] : null, k = r ? "var(--hl-water)" : "var(--hl-heat)";
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
        height: y,
        onPointerMove: P,
        onPointerLeave: () => u(null),
        role: "img",
        "aria-label": r ? "When hot water was on" : "Temperature, target and heating over time",
        children: [
          !r && E.map((j) => /* @__PURE__ */ s.jsxs("g", { children: [
            /* @__PURE__ */ s.jsx("line", { className: "grid-line", x1: Z.left, x2: Z.left + x, y1: _(j), y2: _(j) }),
            /* @__PURE__ */ s.jsxs("text", { className: "axis", x: Z.left - 6, y: _(j) + 4, textAnchor: "end", children: [
              j,
              "°"
            ] })
          ] }, j)),
          Ep(d, g, t).map(({ t: j, label: D }) => /* @__PURE__ */ s.jsxs("g", { children: [
            /* @__PURE__ */ s.jsx("line", { className: "grid-line", x1: z(j), x2: z(j), y1: Z.top, y2: h + m }),
            D && /* @__PURE__ */ s.jsx("text", { className: "axis", x: z(j) + 3, y: h + m + 16, children: D })
          ] }, j)),
          /* @__PURE__ */ s.jsx("rect", { className: "strip-bg", x: Z.left, y: h, width: x, height: m, rx: 4 }),
          e.map(
            (j) => j.heating ? /* @__PURE__ */ s.jsx(
              "rect",
              {
                x: Math.floor(z(j.t)),
                y: h,
                width: Math.max(1, Math.ceil(z(j.t + a)) - Math.floor(z(j.t))),
                height: m,
                fill: k,
                opacity: 0.2 + 0.8 * j.heating
              },
              j.t
            ) : null
          ),
          r && /* @__PURE__ */ s.jsx("text", { className: "axis", x: Z.left - 6, y: h + m / 2 + 4, textAnchor: "end", children: "On" }),
          !r && /* @__PURE__ */ s.jsx("path", { className: "target-line", d: S((j) => j.target, !0) }),
          !r && /* @__PURE__ */ s.jsx("path", { className: "temp-line", d: S((j) => j.current, !1) }),
          n < g && /* @__PURE__ */ s.jsx("line", { className: "now-line", x1: z(n), x2: z(n), y1: Z.top, y2: h + m }),
          C && /* @__PURE__ */ s.jsxs("g", { className: "crosshair", children: [
            /* @__PURE__ */ s.jsx("line", { x1: z(C.t + a / 2), x2: z(C.t + a / 2), y1: Z.top, y2: h + m }),
            !r && C.current != null && /* @__PURE__ */ s.jsx("circle", { cx: z(C.t + a / 2), cy: _(C.current), r: 4.5 })
          ] })
        ]
      }
    ),
    C && /* @__PURE__ */ s.jsxs("div", { className: "tooltip", style: { left: Math.min(Math.max(z(C.t + a / 2), 90), o - 90) }, children: [
      /* @__PURE__ */ s.jsx("div", { className: "tooltip-title", children: Cp(C, a, t) }),
      C.heating == null ? /* @__PURE__ */ s.jsx("div", { children: "No data" }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        !r && /* @__PURE__ */ s.jsxs("div", { children: [
          "Temperature ",
          /* @__PURE__ */ s.jsx("b", { children: C.current != null ? `${C.current.toFixed(1)}°` : "–" })
        ] }),
        !r && /* @__PURE__ */ s.jsxs("div", { children: [
          "Target ",
          /* @__PURE__ */ s.jsx("b", { children: C.target != null ? `${C.target.toFixed(1)}°` : "Off" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { children: [
          r ? "On" : "Heating",
          " ",
          /* @__PURE__ */ s.jsx("b", { children: Je(C.heating * a / 60) })
        ] })
      ] })
    ] })
  ] });
}
function Tp({ days: e, period: t, water: n }) {
  const [r, l] = wc(), [o, i] = $.useState(null), u = 150, a = 112, d = 8, g = Math.max(0, l - Z.left - Z.right), v = Math.max(60, ...e.map((p) => p.heating_minutes ?? 0)), h = v > 12 * 60 ? 240 : v > 6 * 60 ? 120 : v > 3 * 60 ? 60 : 30, m = Math.ceil(v / h) * h, y = (p) => d + a - p / m * a, x = g / e.length, z = Math.min(8, Math.max(2, x * 0.25)), f = [];
  for (let p = 0; p <= m; p += h) f.push(p);
  const c = o != null ? e[o] : null;
  return /* @__PURE__ */ s.jsxs("div", { className: "chart", ref: r, children: [
    l > 0 && /* @__PURE__ */ s.jsxs("svg", { width: l, height: u, role: "img", "aria-label": n ? "Hot water on per day" : "Boiler on per day", onPointerLeave: () => i(null), children: [
      f.map((p) => /* @__PURE__ */ s.jsxs("g", { children: [
        /* @__PURE__ */ s.jsx("line", { className: p ? "grid-line" : "baseline", x1: Z.left, x2: Z.left + g, y1: y(p), y2: y(p) }),
        /* @__PURE__ */ s.jsx("text", { className: "axis", x: Z.left - 6, y: y(p) + 4, textAnchor: "end", children: p ? `${p / 60}h` : "0" })
      ] }, p)),
      e.map((p, w) => {
        const _ = Math.max(1, Math.min(44, x - z)), E = Z.left + w * x + (x - _) / 2, S = p.heating_minutes ?? 0, P = y(S), C = d + a - P, k = Math.min(4, _ / 2, C), j = t === 7 || w % 5 === 0;
        return /* @__PURE__ */ s.jsxs("g", { onPointerEnter: () => i(w), children: [
          /* @__PURE__ */ s.jsx("rect", { x: Z.left + w * x, y: d, width: x, height: a, fill: "transparent" }),
          C > 0 && /* @__PURE__ */ s.jsx(
            "path",
            {
              className: `bar ${o === w ? "hover" : ""}`,
              style: { fill: n ? "var(--hl-water)" : "var(--hl-heat)" },
              d: `M${E},${d + a}V${P + k}Q${E},${P} ${E + k},${P}H${E + _ - k}Q${E + _},${P} ${E + _},${P + k}V${d + a}Z`
            }
          ),
          j && /* @__PURE__ */ s.jsx("text", { className: "axis", x: E + _ / 2, y: u - 10, textAnchor: "middle", children: t === 7 ? gc(p.start) : yc(p.start) })
        ] }, p.start);
      })
    ] }),
    c && /* @__PURE__ */ s.jsxs("div", { className: "tooltip", style: { left: Math.min(Math.max(Z.left + (o + 0.5) * x, 80), l - 80) }, children: [
      /* @__PURE__ */ s.jsx("div", { className: "tooltip-title", children: xc(c.start) }),
      c.heating_minutes == null ? /* @__PURE__ */ s.jsx("div", { children: "No data" }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsxs("div", { children: [
          n ? "On" : "Boiler on",
          " ",
          /* @__PURE__ */ s.jsx("b", { children: Je(c.heating_minutes) })
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
          Je(c.known_minutes)
        ] })
      ] })
    ] })
  ] });
}
function Mp({ minutes: e, total: t, water: n }) {
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
      /* @__PURE__ */ s.jsx("span", { className: "mode-time", children: Je(e[l.id]) }),
      /* @__PURE__ */ s.jsxs("span", { className: "mode-share", children: [
        Math.round(o * 100),
        "%"
      ] })
    ] }, l.id);
  }) });
}
const $p = [
  { id: "overview", label: "Overview", icon: "view-dashboard-outline" },
  { id: "rooms", label: "Rooms", icon: "home-thermometer-outline" },
  { id: "schedule", label: "Schedule", icon: "calendar-clock" },
  { id: "stats", label: "Stats", icon: "chart-box-outline" }
];
function Lp({ getHass: e, narrow: t, onToggleMenu: n }) {
  const [r, l] = $.useState([]), [o, i] = $.useState(null), [u, a] = $.useState({}), [d, g] = $.useState("overview"), [v, h] = $.useState(null), [m, y] = $.useState("heat"), [x, z] = $.useState(/* @__PURE__ */ new Set()), [f, c] = $.useState("");
  $.useEffect(() => {
    e().callWS({ type: "hive_local/devices" }).then((k) => {
      l(k.devices), i(k.limits);
    }).catch((k) => c(Ye(k)));
    const C = e().connection.subscribeMessage(
      (k) => a(k.status),
      { type: "hive_local/subscribe" }
    );
    return () => {
      C.then((k) => k()).catch(() => {
      });
    };
  }, [e]);
  const p = (C) => {
    if (r.length <= 1) return r.map((j) => /* @__PURE__ */ s.jsx("section", { className: "receiver-section", children: C(j) }, j.entry_id));
    const k = r.find((j) => j.entry_id === v);
    return k ? /* @__PURE__ */ s.jsxs("section", { className: "receiver-section", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "receiver-crumb", children: [
        /* @__PURE__ */ s.jsxs("button", { className: "ghost", onClick: () => h(null), children: [
          /* @__PURE__ */ s.jsx(F, { name: "chevron-left" }),
          " All receivers"
        ] }),
        /* @__PURE__ */ s.jsx("h2", { children: k.name })
      ] }),
      C(k)
    ] }) : /* @__PURE__ */ s.jsx(ip, { devices: r, status: u, channel: "heat", onOpen: h });
  }, w = r.length <= 1 ? r[0] : r.find((C) => C.entry_id === v), _ = d === "schedule" && w ? `${w.entry_id}-${w.channels.includes(m) ? m : w.channels[0]}` : null;
  $.useEffect(() => {
    _ && z((C) => C.has(_) ? C : new Set(C).add(_));
  }, [_]);
  const E = (C, k) => {
    h(C), y(k), g("schedule");
  }, S = (C, k) => {
    const j = C.channels.includes(m) ? m : C.channels[0], D = (R) => `${C.entry_id}-${R}`;
    return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      C.channels.length > 1 && /* @__PURE__ */ s.jsx("div", { className: "segmented channel-switch", role: "tablist", "aria-label": "Schedule", children: C.channels.map((R) => /* @__PURE__ */ s.jsxs("button", { role: "tab", "aria-selected": R === j, className: R === j ? "on" : "", onClick: () => y(R), children: [
        /* @__PURE__ */ s.jsx(F, { name: R === "water" ? "water-boiler" : "radiator" }),
        " ",
        Wn[R]
      ] }, R)) }),
      C.channels.filter((R) => R === j || x.has(D(R))).map((R) => /* @__PURE__ */ s.jsx("div", { hidden: R !== j, children: /* @__PURE__ */ s.jsx(vp, { getHass: e, device: C, channel: R, limits: k }) }, D(R)))
    ] });
  }, P = $p;
  return /* @__PURE__ */ s.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ s.jsx("header", { children: /* @__PURE__ */ s.jsxs("div", { className: "toolbar-row", children: [
      t && /* @__PURE__ */ s.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ s.jsx(F, { name: "menu" }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ s.jsx(ta, {}),
        /* @__PURE__ */ s.jsx("h1", { children: "Hive Local" })
      ] }),
      /* @__PURE__ */ s.jsx("nav", { className: "tabs", role: "tablist", children: P.map((C) => /* @__PURE__ */ s.jsxs("button", { role: "tab", "aria-selected": C.id === d, className: C.id === d ? "on" : "", onClick: () => g(C.id), children: [
        /* @__PURE__ */ s.jsx(F, { name: C.icon }),
        /* @__PURE__ */ s.jsx("span", { children: C.label })
      ] }, C.id)) })
    ] }) }),
    /* @__PURE__ */ s.jsxs("main", { children: [
      f && /* @__PURE__ */ s.jsx("div", { className: "status error", children: f }),
      !r.length && !f && /* @__PURE__ */ s.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ s.jsx(ta, { size: 56 }),
        /* @__PURE__ */ s.jsx("p", { children: "No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local." })
      ] }),
      d === "overview" && /* @__PURE__ */ s.jsx(qf, { getHass: e, devices: r, status: u, limits: o, onSchedule: E, onRooms: () => g("rooms") }),
      d === "rooms" && r.length > 0 && /* @__PURE__ */ s.jsx(up, { getHass: e }),
      d === "schedule" && o && p((C) => S(C, o)),
      d === "stats" && r.length > 0 && /* @__PURE__ */ s.jsx(jp, { getHass: e, devices: r })
    ] })
  ] });
}
const Rp = (
  /* css */
  `
:host {
  /* One accent for everything that's on or active (heating, hot water, boosting, the selected tab):
     HA's heating orange. Heating and hot water share it. */
  --hl-brand: var(--state-climate-heat-color, #ff8100);
  --hl-heat: var(--hl-brand);
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
/* Cards in a row share its height; an opened card takes the whole row so its neighbours don't stretch. */
.device-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 12px; align-items: stretch; }
.device.open { grid-column: 1 / -1; }
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
.tooltip { position: absolute; top: 0; transform: translate(-50%, -100%); margin-top: -6px; pointer-events: none; z-index: 1; background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 10px; padding: 8px 10px; font-size: 12px; line-height: 1.5; white-space: nowrap; }
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
  /* Room at the bottom for the tab bar (and the phone's home indicator). */
  main { padding: 12px 8px calc(88px + env(safe-area-inset-bottom)); gap: 12px; }
  .card { padding: 14px; }
  .grid { grid-template-columns: 1fr; }
  .device-grid { grid-template-columns: 1fr; }
    .device-big { font-size: 46px; }
  .sheet-backdrop { align-items: flex-end; padding: 0; }
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
  .mode-row { grid-template-columns: 18px 72px 1fr 56px; }
  .mode-share { display: none; }
  .kpis { grid-template-columns: 1fr 1fr; gap: 8px; }
  .kpi { padding: 10px 12px; }
  .kpi-value { font-size: 24px; }
}
`
);
class Op extends HTMLElement {
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
      r.textContent = Rp;
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
      /* @__PURE__ */ s.jsx(
        Lp,
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
customElements.get("hive-local-panel") || customElements.define("hive-local-panel", Op);
