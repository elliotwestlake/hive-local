var Pc = Object.defineProperty;
var Tc = (e, t, n) => t in e ? Pc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var fr = (e, t, n) => Tc(e, typeof t != "symbol" ? t + "" : t, n);
var ca = { exports: {} }, vl = {}, da = { exports: {} }, F = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var or = Symbol.for("react.element"), Mc = Symbol.for("react.portal"), Lc = Symbol.for("react.fragment"), $c = Symbol.for("react.strict_mode"), Rc = Symbol.for("react.profiler"), Oc = Symbol.for("react.provider"), Dc = Symbol.for("react.context"), Fc = Symbol.for("react.forward_ref"), Ic = Symbol.for("react.suspense"), Ac = Symbol.for("react.memo"), Uc = Symbol.for("react.lazy"), Xi = Symbol.iterator;
function Bc(e) {
  return e === null || typeof e != "object" ? null : (e = Xi && e[Xi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var fa = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, pa = Object.assign, ha = {};
function gn(e, t, n) {
  this.props = e, this.context = t, this.refs = ha, this.updater = n || fa;
}
gn.prototype.isReactComponent = {};
gn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
gn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ma() {
}
ma.prototype = gn.prototype;
function ei(e, t, n) {
  this.props = e, this.context = t, this.refs = ha, this.updater = n || fa;
}
var ti = ei.prototype = new ma();
ti.constructor = ei;
pa(ti, gn.prototype);
ti.isPureReactComponent = !0;
var Gi = Array.isArray, va = Object.prototype.hasOwnProperty, ni = { current: null }, ga = { key: !0, ref: !0, __self: !0, __source: !0 };
function ya(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) va.call(t, r) && !ga.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var a = Array(u), d = 0; d < u; d++) a[d] = arguments[d + 2];
    l.children = a;
  }
  if (e && e.defaultProps) for (r in u = e.defaultProps, u) l[r] === void 0 && (l[r] = u[r]);
  return { $$typeof: or, type: e, key: o, ref: i, props: l, _owner: ni.current };
}
function Hc(e, t) {
  return { $$typeof: or, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ri(e) {
  return typeof e == "object" && e !== null && e.$$typeof === or;
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
function Lr(e, t, n, r, l) {
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
        case or:
        case Mc:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + $l(i, 0) : r, Gi(l) ? (n = "", e != null && (n = e.replace(Zi, "$&/") + "/"), Lr(l, t, n, "", function(d) {
    return d;
  })) : l != null && (ri(l) && (l = Hc(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Zi, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Gi(e)) for (var u = 0; u < e.length; u++) {
    o = e[u];
    var a = r + $l(o, u);
    i += Lr(o, t, n, a, l);
  }
  else if (a = Bc(e), typeof a == "function") for (e = a.call(e), u = 0; !(o = e.next()).done; ) o = o.value, a = r + $l(o, u++), i += Lr(o, t, n, a, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function pr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Lr(e, r, "", "", function(o) {
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
var he = { current: null }, $r = { transition: null }, Qc = { ReactCurrentDispatcher: he, ReactCurrentBatchConfig: $r, ReactCurrentOwner: ni };
function xa() {
  throw Error("act(...) is not supported in production builds of React.");
}
F.Children = { map: pr, forEach: function(e, t, n) {
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
  if (!ri(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
F.Component = gn;
F.Fragment = Lc;
F.Profiler = Rc;
F.PureComponent = ei;
F.StrictMode = $c;
F.Suspense = Ic;
F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Qc;
F.act = xa;
F.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = pa({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = ni.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (a in t) va.call(t, a) && !ga.hasOwnProperty(a) && (r[a] = t[a] === void 0 && u !== void 0 ? u[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    u = Array(a);
    for (var d = 0; d < a; d++) u[d] = arguments[d + 2];
    r.children = u;
  }
  return { $$typeof: or, type: e.type, key: l, ref: o, props: r, _owner: i };
};
F.createContext = function(e) {
  return e = { $$typeof: Dc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Oc, _context: e }, e.Consumer = e;
};
F.createElement = ya;
F.createFactory = function(e) {
  var t = ya.bind(null, e);
  return t.type = e, t;
};
F.createRef = function() {
  return { current: null };
};
F.forwardRef = function(e) {
  return { $$typeof: Fc, render: e };
};
F.isValidElement = ri;
F.lazy = function(e) {
  return { $$typeof: Uc, _payload: { _status: -1, _result: e }, _init: Vc };
};
F.memo = function(e, t) {
  return { $$typeof: Ac, type: e, compare: t === void 0 ? null : t };
};
F.startTransition = function(e) {
  var t = $r.transition;
  $r.transition = {};
  try {
    e();
  } finally {
    $r.transition = t;
  }
};
F.unstable_act = xa;
F.useCallback = function(e, t) {
  return he.current.useCallback(e, t);
};
F.useContext = function(e) {
  return he.current.useContext(e);
};
F.useDebugValue = function() {
};
F.useDeferredValue = function(e) {
  return he.current.useDeferredValue(e);
};
F.useEffect = function(e, t) {
  return he.current.useEffect(e, t);
};
F.useId = function() {
  return he.current.useId();
};
F.useImperativeHandle = function(e, t, n) {
  return he.current.useImperativeHandle(e, t, n);
};
F.useInsertionEffect = function(e, t) {
  return he.current.useInsertionEffect(e, t);
};
F.useLayoutEffect = function(e, t) {
  return he.current.useLayoutEffect(e, t);
};
F.useMemo = function(e, t) {
  return he.current.useMemo(e, t);
};
F.useReducer = function(e, t, n) {
  return he.current.useReducer(e, t, n);
};
F.useRef = function(e) {
  return he.current.useRef(e);
};
F.useState = function(e) {
  return he.current.useState(e);
};
F.useSyncExternalStore = function(e, t, n) {
  return he.current.useSyncExternalStore(e, t, n);
};
F.useTransition = function() {
  return he.current.useTransition();
};
F.version = "18.3.1";
da.exports = F;
var L = da.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bc = L, Kc = Symbol.for("react.element"), Yc = Symbol.for("react.fragment"), Xc = Object.prototype.hasOwnProperty, Gc = bc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Zc = { key: !0, ref: !0, __self: !0, __source: !0 };
function wa(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) Xc.call(t, r) && !Zc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Kc, type: e, key: o, ref: i, props: l, _owner: Gc.current };
}
vl.Fragment = Yc;
vl.jsx = wa;
vl.jsxs = wa;
ca.exports = vl;
var s = ca.exports, ka = { exports: {} }, _e = {}, Sa = { exports: {} }, Na = {};
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
  function t(T, P) {
    var O = T.length;
    T.push(P);
    e: for (; 0 < O; ) {
      var Z = O - 1 >>> 1, ne = T[Z];
      if (0 < l(ne, P)) T[Z] = P, T[O] = ne, O = Z;
      else break e;
    }
  }
  function n(T) {
    return T.length === 0 ? null : T[0];
  }
  function r(T) {
    if (T.length === 0) return null;
    var P = T[0], O = T.pop();
    if (O !== P) {
      T[0] = O;
      e: for (var Z = 0, ne = T.length, cr = ne >>> 1; Z < cr; ) {
        var Ct = 2 * (Z + 1) - 1, Ll = T[Ct], zt = Ct + 1, dr = T[zt];
        if (0 > l(Ll, O)) zt < ne && 0 > l(dr, Ll) ? (T[Z] = dr, T[zt] = O, Z = zt) : (T[Z] = Ll, T[Ct] = O, Z = Ct);
        else if (zt < ne && 0 > l(dr, O)) T[Z] = dr, T[zt] = O, Z = zt;
        else break e;
      }
    }
    return P;
  }
  function l(T, P) {
    var O = T.sortIndex - P.sortIndex;
    return O !== 0 ? O : T.id - P.id;
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
  var a = [], d = [], v = 1, m = null, h = 3, g = !1, k = !1, N = !1, $ = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(T) {
    for (var P = n(d); P !== null; ) {
      if (P.callback === null) r(d);
      else if (P.startTime <= T) r(d), P.sortIndex = P.expirationTime, t(a, P);
      else break;
      P = n(d);
    }
  }
  function y(T) {
    if (N = !1, p(T), !k) if (n(a) !== null) k = !0, Be(j);
    else {
      var P = n(d);
      P !== null && Ke(y, P.startTime - T);
    }
  }
  function j(T, P) {
    k = !1, N && (N = !1, f(z), z = -1), g = !0;
    var O = h;
    try {
      for (p(P), m = n(a); m !== null && (!(m.expirationTime > P) || T && !S()); ) {
        var Z = m.callback;
        if (typeof Z == "function") {
          m.callback = null, h = m.priorityLevel;
          var ne = Z(m.expirationTime <= P);
          P = e.unstable_now(), typeof ne == "function" ? m.callback = ne : m === n(a) && r(a), p(P);
        } else r(a);
        m = n(a);
      }
      if (m !== null) var cr = !0;
      else {
        var Ct = n(d);
        Ct !== null && Ke(y, Ct.startTime - P), cr = !1;
      }
      return cr;
    } finally {
      m = null, h = O, g = !1;
    }
  }
  var C = !1, w = null, z = -1, E = 5, x = -1;
  function S() {
    return !(e.unstable_now() - x < E);
  }
  function D() {
    if (w !== null) {
      var T = e.unstable_now();
      x = T;
      var P = !0;
      try {
        P = w(!0, T);
      } finally {
        P ? R() : (C = !1, w = null);
      }
    } else C = !1;
  }
  var R;
  if (typeof c == "function") R = function() {
    c(D);
  };
  else if (typeof MessageChannel < "u") {
    var V = new MessageChannel(), Ue = V.port2;
    V.port1.onmessage = D, R = function() {
      Ue.postMessage(null);
    };
  } else R = function() {
    $(D, 0);
  };
  function Be(T) {
    w = T, C || (C = !0, R());
  }
  function Ke(T, P) {
    z = $(function() {
      T(e.unstable_now());
    }, P);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(T) {
    T.callback = null;
  }, e.unstable_continueExecution = function() {
    k || g || (k = !0, Be(j));
  }, e.unstable_forceFrameRate = function(T) {
    0 > T || 125 < T ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : E = 0 < T ? Math.floor(1e3 / T) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(a);
  }, e.unstable_next = function(T) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var P = 3;
        break;
      default:
        P = h;
    }
    var O = h;
    h = P;
    try {
      return T();
    } finally {
      h = O;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(T, P) {
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
      return P();
    } finally {
      h = O;
    }
  }, e.unstable_scheduleCallback = function(T, P, O) {
    var Z = e.unstable_now();
    switch (typeof O == "object" && O !== null ? (O = O.delay, O = typeof O == "number" && 0 < O ? Z + O : Z) : O = Z, T) {
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
    return ne = O + ne, T = { id: v++, callback: P, priorityLevel: T, startTime: O, expirationTime: ne, sortIndex: -1 }, O > Z ? (T.sortIndex = O, t(d, T), n(a) === null && T === n(d) && (N ? (f(z), z = -1) : N = !0, Ke(y, O - Z))) : (T.sortIndex = ne, t(a, T), k || g || (k = !0, Be(j))), T;
  }, e.unstable_shouldYield = S, e.unstable_wrapCallback = function(T) {
    var P = h;
    return function() {
      var O = h;
      h = P;
      try {
        return T.apply(this, arguments);
      } finally {
        h = O;
      }
    };
  };
})(Na);
Sa.exports = Na;
var Jc = Sa.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qc = L, je = Jc;
function _(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ja = /* @__PURE__ */ new Set(), Hn = {};
function Bt(e, t) {
  cn(e, t), cn(e + "Capture", t);
}
function cn(e, t) {
  for (Hn[e] = t, e = 0; e < t.length; e++) ja.add(t[e]);
}
var et = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), oo = Object.prototype.hasOwnProperty, ed = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ji = {}, qi = {};
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
var ot = qc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, hr = Symbol.for("react.element"), Qt = Symbol.for("react.portal"), bt = Symbol.for("react.fragment"), si = Symbol.for("react.strict_mode"), io = Symbol.for("react.profiler"), _a = Symbol.for("react.provider"), Ea = Symbol.for("react.context"), ai = Symbol.for("react.forward_ref"), so = Symbol.for("react.suspense"), ao = Symbol.for("react.suspense_list"), ui = Symbol.for("react.memo"), st = Symbol.for("react.lazy"), Ca = Symbol.for("react.offscreen"), es = Symbol.iterator;
function wn(e) {
  return e === null || typeof e != "object" ? null : (e = es && e[es] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Y = Object.assign, Rl;
function zn(e) {
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
  return (e = e ? e.displayName || e.name : "") ? zn(e) : "";
}
function ld(e) {
  switch (e.tag) {
    case 5:
      return zn(e.type);
    case 16:
      return zn("Lazy");
    case 13:
      return zn("Suspense");
    case 19:
      return zn("SuspenseList");
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
    case bt:
      return "Fragment";
    case Qt:
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
    case Ea:
      return (e.displayName || "Context") + ".Consumer";
    case _a:
      return (e._context.displayName || "Context") + ".Provider";
    case ai:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case ui:
      return t = e.displayName || null, t !== null ? t : uo(e.type) || "Memo";
    case st:
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
function za(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function id(e) {
  var t = za(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
  e._valueTracker || (e._valueTracker = id(e));
}
function Pa(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = za(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Vr(e) {
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
  n = St(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Ta(e, t) {
  t = t.checked, t != null && ii(e, "checked", t, !1);
}
function fo(e, t) {
  Ta(e, t);
  var n = St(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? po(e, t.type, n) : t.hasOwnProperty("defaultValue") && po(e, t.type, St(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
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
  (t !== "number" || Vr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Pn = Array.isArray;
function rn(e, t, n, r) {
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
function ho(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(_(91));
  return Y({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function rs(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(_(92));
      if (Pn(n)) {
        if (1 < n.length) throw Error(_(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: St(n) };
}
function Ma(e, t) {
  var n = St(t.value), r = St(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ls(e) {
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
function mo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? La(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var vr, $a = function(e) {
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
function Wn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var $n = {
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
Object.keys($n).forEach(function(e) {
  sd.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), $n[t] = $n[e];
  });
});
function Ra(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || $n.hasOwnProperty(e) && $n[e] ? ("" + t).trim() : t + "px";
}
function Oa(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Ra(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var ad = Y({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function vo(e, t) {
  if (t) {
    if (ad[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(_(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(_(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(_(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(_(62));
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
var xo = null, ln = null, on = null;
function os(e) {
  if (e = ar(e)) {
    if (typeof xo != "function") throw Error(_(280));
    var t = e.stateNode;
    t && (t = kl(t), xo(e.stateNode, e.type, t));
  }
}
function Da(e) {
  ln ? on ? on.push(e) : on = [e] : ln = e;
}
function Fa() {
  if (ln) {
    var e = ln, t = on;
    if (on = ln = null, os(e), t) for (e = 0; e < t.length; e++) os(t[e]);
  }
}
function Ia(e, t) {
  return e(t);
}
function Aa() {
}
var Fl = !1;
function Ua(e, t, n) {
  if (Fl) return e(t, n);
  Fl = !0;
  try {
    return Ia(e, t, n);
  } finally {
    Fl = !1, (ln !== null || on !== null) && (Aa(), Fa());
  }
}
function Vn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = kl(n);
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
  if (n && typeof n != "function") throw Error(_(231, t, typeof n));
  return n;
}
var wo = !1;
if (et) try {
  var kn = {};
  Object.defineProperty(kn, "passive", { get: function() {
    wo = !0;
  } }), window.addEventListener("test", kn, kn), window.removeEventListener("test", kn, kn);
} catch {
  wo = !1;
}
function ud(e, t, n, r, l, o, i, u, a) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (v) {
    this.onError(v);
  }
}
var Rn = !1, Qr = null, br = !1, ko = null, cd = { onError: function(e) {
  Rn = !0, Qr = e;
} };
function dd(e, t, n, r, l, o, i, u, a) {
  Rn = !1, Qr = null, ud.apply(cd, arguments);
}
function fd(e, t, n, r, l, o, i, u, a) {
  if (dd.apply(this, arguments), Rn) {
    if (Rn) {
      var d = Qr;
      Rn = !1, Qr = null;
    } else throw Error(_(198));
    br || (br = !0, ko = d);
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
function Ba(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function is(e) {
  if (Ht(e) !== e) throw Error(_(188));
}
function pd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Ht(e), t === null) throw Error(_(188));
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
      throw Error(_(188));
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
        if (!i) throw Error(_(189));
      }
    }
    if (n.alternate !== r) throw Error(_(190));
  }
  if (n.tag !== 3) throw Error(_(188));
  return n.stateNode.current === n ? e : t;
}
function Ha(e) {
  return e = pd(e), e !== null ? Wa(e) : null;
}
function Wa(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Wa(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Va = je.unstable_scheduleCallback, ss = je.unstable_cancelCallback, hd = je.unstable_shouldYield, md = je.unstable_requestPaint, J = je.unstable_now, vd = je.unstable_getCurrentPriorityLevel, di = je.unstable_ImmediatePriority, Qa = je.unstable_UserBlockingPriority, Kr = je.unstable_NormalPriority, gd = je.unstable_LowPriority, ba = je.unstable_IdlePriority, gl = null, Qe = null;
function yd(e) {
  if (Qe && typeof Qe.onCommitFiberRoot == "function") try {
    Qe.onCommitFiberRoot(gl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Fe = Math.clz32 ? Math.clz32 : kd, xd = Math.log, wd = Math.LN2;
function kd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (xd(e) / wd | 0) | 0;
}
var gr = 64, yr = 4194304;
function Tn(e) {
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
    var u = i & ~l;
    u !== 0 ? r = Tn(u) : (o &= i, o !== 0 && (r = Tn(o)));
  } else i = n & ~l, i !== 0 ? r = Tn(i) : o !== 0 && (r = Tn(o));
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
function Nd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - Fe(o), u = 1 << i, a = l[i];
    a === -1 ? (!(u & n) || u & r) && (l[i] = Sd(u, t)) : a <= t && (e.expiredLanes |= u), o &= ~u;
  }
}
function So(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ka() {
  var e = gr;
  return gr <<= 1, !(gr & 4194240) && (gr = 64), e;
}
function Il(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ir(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Fe(t), e[t] = n;
}
function jd(e, t) {
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
var U = 0;
function Ya(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Xa, pi, Ga, Za, Ja, No = !1, xr = [], ht = null, mt = null, vt = null, Qn = /* @__PURE__ */ new Map(), bn = /* @__PURE__ */ new Map(), ut = [], _d = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function as(e, t) {
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
      vt = null;
      break;
    case "pointerover":
    case "pointerout":
      Qn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      bn.delete(t.pointerId);
  }
}
function Sn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = ar(t), t !== null && pi(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Ed(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ht = Sn(ht, e, t, n, r, l), !0;
    case "dragenter":
      return mt = Sn(mt, e, t, n, r, l), !0;
    case "mouseover":
      return vt = Sn(vt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Qn.set(o, Sn(Qn.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, bn.set(o, Sn(bn.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function qa(e) {
  var t = Mt(e.target);
  if (t !== null) {
    var n = Ht(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ba(n), t !== null) {
          e.blockedOn = t, Ja(e.priority, function() {
            Ga(n);
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
    var n = jo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      yo = r, n.target.dispatchEvent(r), yo = null;
    } else return t = ar(n), t !== null && pi(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function us(e, t, n) {
  Rr(e) && n.delete(t);
}
function Cd() {
  No = !1, ht !== null && Rr(ht) && (ht = null), mt !== null && Rr(mt) && (mt = null), vt !== null && Rr(vt) && (vt = null), Qn.forEach(us), bn.forEach(us);
}
function Nn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, No || (No = !0, je.unstable_scheduleCallback(je.unstable_NormalPriority, Cd)));
}
function Kn(e) {
  function t(l) {
    return Nn(l, e);
  }
  if (0 < xr.length) {
    Nn(xr[0], e);
    for (var n = 1; n < xr.length; n++) {
      var r = xr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ht !== null && Nn(ht, e), mt !== null && Nn(mt, e), vt !== null && Nn(vt, e), Qn.forEach(t), bn.forEach(t), n = 0; n < ut.length; n++) r = ut[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ut.length && (n = ut[0], n.blockedOn === null); ) qa(n), n.blockedOn === null && ut.shift();
}
var sn = ot.ReactCurrentBatchConfig, Xr = !0;
function zd(e, t, n, r) {
  var l = U, o = sn.transition;
  sn.transition = null;
  try {
    U = 1, hi(e, t, n, r);
  } finally {
    U = l, sn.transition = o;
  }
}
function Pd(e, t, n, r) {
  var l = U, o = sn.transition;
  sn.transition = null;
  try {
    U = 4, hi(e, t, n, r);
  } finally {
    U = l, sn.transition = o;
  }
}
function hi(e, t, n, r) {
  if (Xr) {
    var l = jo(e, t, n, r);
    if (l === null) Yl(e, t, r, Gr, n), as(e, r);
    else if (Ed(l, e, t, n, r)) r.stopPropagation();
    else if (as(e, r), t & 4 && -1 < _d.indexOf(e)) {
      for (; l !== null; ) {
        var o = ar(l);
        if (o !== null && Xa(o), o = jo(e, t, n, r), o === null && Yl(e, t, r, Gr, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Yl(e, t, r, null, n);
  }
}
var Gr = null;
function jo(e, t, n, r) {
  if (Gr = null, e = ci(r), e = Mt(e), e !== null) if (t = Ht(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ba(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Gr = e, null;
}
function eu(e) {
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
        case Qa:
          return 4;
        case Kr:
        case gd:
          return 16;
        case ba:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var dt = null, mi = null, Or = null;
function tu() {
  if (Or) return Or;
  var e, t = mi, n = t.length, r, l = "value" in dt ? dt.value : dt.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return Or = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Dr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function wr() {
  return !0;
}
function cs() {
  return !1;
}
function Ee(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(o) : o[u]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? wr : cs, this.isPropagationStopped = cs, this;
  }
  return Y(t.prototype, { preventDefault: function() {
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
}, defaultPrevented: 0, isTrusted: 0 }, vi = Ee(yn), sr = Y({}, yn, { view: 0, detail: 0 }), Td = Ee(sr), Al, Ul, jn, yl = Y({}, sr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: gi, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== jn && (jn && e.type === "mousemove" ? (Al = e.screenX - jn.screenX, Ul = e.screenY - jn.screenY) : Ul = Al = 0, jn = e), Al);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ul;
} }), ds = Ee(yl), Md = Y({}, yl, { dataTransfer: 0 }), Ld = Ee(Md), $d = Y({}, sr, { relatedTarget: 0 }), Bl = Ee($d), Rd = Y({}, yn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Od = Ee(Rd), Dd = Y({}, yn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Fd = Ee(Dd), Id = Y({}, yn, { data: 0 }), fs = Ee(Id), Ad = {
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
var Wd = Y({}, sr, { key: function(e) {
  if (e.key) {
    var t = Ad[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Dr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Ud[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: gi, charCode: function(e) {
  return e.type === "keypress" ? Dr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Dr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Vd = Ee(Wd), Qd = Y({}, yl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ps = Ee(Qd), bd = Y({}, sr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: gi }), Kd = Ee(bd), Yd = Y({}, yn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = Ee(Yd), Gd = Y({}, yl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = Ee(Gd), Jd = [9, 13, 27, 32], yi = et && "CompositionEvent" in window, On = null;
et && "documentMode" in document && (On = document.documentMode);
var qd = et && "TextEvent" in window && !On, nu = et && (!yi || On && 8 < On && 11 >= On), hs = " ", ms = !1;
function ru(e, t) {
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
function lu(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Kt = !1;
function ef(e, t) {
  switch (e) {
    case "compositionend":
      return lu(t);
    case "keypress":
      return t.which !== 32 ? null : (ms = !0, hs);
    case "textInput":
      return e = t.data, e === hs && ms ? null : e;
    default:
      return null;
  }
}
function tf(e, t) {
  if (Kt) return e === "compositionend" || !yi && ru(e, t) ? (e = tu(), Or = mi = dt = null, Kt = !1, e) : null;
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
      return nu && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var nf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function vs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!nf[e.type] : t === "textarea";
}
function ou(e, t, n, r) {
  Da(r), t = Zr(t, "onChange"), 0 < t.length && (n = new vi("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Dn = null, Yn = null;
function rf(e) {
  vu(e, 0);
}
function xl(e) {
  var t = Gt(e);
  if (Pa(t)) return e;
}
function lf(e, t) {
  if (e === "change") return t;
}
var iu = !1;
if (et) {
  var Hl;
  if (et) {
    var Wl = "oninput" in document;
    if (!Wl) {
      var gs = document.createElement("div");
      gs.setAttribute("oninput", "return;"), Wl = typeof gs.oninput == "function";
    }
    Hl = Wl;
  } else Hl = !1;
  iu = Hl && (!document.documentMode || 9 < document.documentMode);
}
function ys() {
  Dn && (Dn.detachEvent("onpropertychange", su), Yn = Dn = null);
}
function su(e) {
  if (e.propertyName === "value" && xl(Yn)) {
    var t = [];
    ou(t, Yn, e, ci(e)), Ua(rf, t);
  }
}
function of(e, t, n) {
  e === "focusin" ? (ys(), Dn = t, Yn = n, Dn.attachEvent("onpropertychange", su)) : e === "focusout" && ys();
}
function sf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return xl(Yn);
}
function af(e, t) {
  if (e === "click") return xl(t);
}
function uf(e, t) {
  if (e === "input" || e === "change") return xl(t);
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
function au(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? au(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function uu() {
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
function xi(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function df(e) {
  var t = uu(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && au(n.ownerDocument.documentElement, n)) {
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
var ff = et && "documentMode" in document && 11 >= document.documentMode, Yt = null, _o = null, Fn = null, Eo = !1;
function ks(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Eo || Yt == null || Yt !== Vr(r) || (r = Yt, "selectionStart" in r && xi(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Fn && Xn(Fn, r) || (Fn = r, r = Zr(_o, "onSelect"), 0 < r.length && (t = new vi("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Yt)));
}
function kr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Xt = { animationend: kr("Animation", "AnimationEnd"), animationiteration: kr("Animation", "AnimationIteration"), animationstart: kr("Animation", "AnimationStart"), transitionend: kr("Transition", "TransitionEnd") }, Vl = {}, cu = {};
et && (cu = document.createElement("div").style, "AnimationEvent" in window || (delete Xt.animationend.animation, delete Xt.animationiteration.animation, delete Xt.animationstart.animation), "TransitionEvent" in window || delete Xt.transitionend.transition);
function wl(e) {
  if (Vl[e]) return Vl[e];
  if (!Xt[e]) return e;
  var t = Xt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in cu) return Vl[e] = t[n];
  return e;
}
var du = wl("animationend"), fu = wl("animationiteration"), pu = wl("animationstart"), hu = wl("transitionend"), mu = /* @__PURE__ */ new Map(), Ss = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function jt(e, t) {
  mu.set(e, t), Bt(t, [e]);
}
for (var Ql = 0; Ql < Ss.length; Ql++) {
  var bl = Ss[Ql], pf = bl.toLowerCase(), hf = bl[0].toUpperCase() + bl.slice(1);
  jt(pf, "on" + hf);
}
jt(du, "onAnimationEnd");
jt(fu, "onAnimationIteration");
jt(pu, "onAnimationStart");
jt("dblclick", "onDoubleClick");
jt("focusin", "onFocus");
jt("focusout", "onBlur");
jt(hu, "onTransitionEnd");
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
var Mn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Mn));
function Ns(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, fd(r, t, void 0, e), e.currentTarget = null;
}
function vu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var u = r[i], a = u.instance, d = u.currentTarget;
        if (u = u.listener, a !== o && l.isPropagationStopped()) break e;
        Ns(l, u, d), o = a;
      }
      else for (i = 0; i < r.length; i++) {
        if (u = r[i], a = u.instance, d = u.currentTarget, u = u.listener, a !== o && l.isPropagationStopped()) break e;
        Ns(l, u, d), o = a;
      }
    }
  }
  if (br) throw e = ko, br = !1, ko = null, e;
}
function H(e, t) {
  var n = t[Mo];
  n === void 0 && (n = t[Mo] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (gu(t, e, 2, !1), n.add(r));
}
function Kl(e, t, n) {
  var r = 0;
  t && (r |= 4), gu(n, e, r, t);
}
var Sr = "_reactListening" + Math.random().toString(36).slice(2);
function Gn(e) {
  if (!e[Sr]) {
    e[Sr] = !0, ja.forEach(function(n) {
      n !== "selectionchange" && (mf.has(n) || Kl(n, !1, e), Kl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Sr] || (t[Sr] = !0, Kl("selectionchange", !1, t));
  }
}
function gu(e, t, n, r) {
  switch (eu(t)) {
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
        if (i = Mt(u), i === null) return;
        if (a = i.tag, a === 5 || a === 6) {
          r = o = i;
          continue e;
        }
        u = u.parentNode;
      }
    }
    r = r.return;
  }
  Ua(function() {
    var d = o, v = ci(n), m = [];
    e: {
      var h = mu.get(e);
      if (h !== void 0) {
        var g = vi, k = e;
        switch (e) {
          case "keypress":
            if (Dr(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = Vd;
            break;
          case "focusin":
            k = "focus", g = Bl;
            break;
          case "focusout":
            k = "blur", g = Bl;
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
            g = Kd;
            break;
          case du:
          case fu:
          case pu:
            g = Od;
            break;
          case hu:
            g = Xd;
            break;
          case "scroll":
            g = Td;
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
        var N = (t & 4) !== 0, $ = !N && e === "scroll", f = N ? h !== null ? h + "Capture" : null : h;
        N = [];
        for (var c = d, p; c !== null; ) {
          p = c;
          var y = p.stateNode;
          if (p.tag === 5 && y !== null && (p = y, f !== null && (y = Vn(c, f), y != null && N.push(Zn(c, y, p)))), $) break;
          c = c.return;
        }
        0 < N.length && (h = new g(h, k, null, n, v), m.push({ event: h, listeners: N }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", g = e === "mouseout" || e === "pointerout", h && n !== yo && (k = n.relatedTarget || n.fromElement) && (Mt(k) || k[tt])) break e;
        if ((g || h) && (h = v.window === v ? v : (h = v.ownerDocument) ? h.defaultView || h.parentWindow : window, g ? (k = n.relatedTarget || n.toElement, g = d, k = k ? Mt(k) : null, k !== null && ($ = Ht(k), k !== $ || k.tag !== 5 && k.tag !== 6) && (k = null)) : (g = null, k = d), g !== k)) {
          if (N = ds, y = "onMouseLeave", f = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (N = ps, y = "onPointerLeave", f = "onPointerEnter", c = "pointer"), $ = g == null ? h : Gt(g), p = k == null ? h : Gt(k), h = new N(y, c + "leave", g, n, v), h.target = $, h.relatedTarget = p, y = null, Mt(v) === d && (N = new N(f, c + "enter", k, n, v), N.target = p, N.relatedTarget = $, y = N), $ = y, g && k) t: {
            for (N = g, f = k, c = 0, p = N; p; p = Wt(p)) c++;
            for (p = 0, y = f; y; y = Wt(y)) p++;
            for (; 0 < c - p; ) N = Wt(N), c--;
            for (; 0 < p - c; ) f = Wt(f), p--;
            for (; c--; ) {
              if (N === f || f !== null && N === f.alternate) break t;
              N = Wt(N), f = Wt(f);
            }
            N = null;
          }
          else N = null;
          g !== null && js(m, h, g, N, !1), k !== null && $ !== null && js(m, $, k, N, !0);
        }
      }
      e: {
        if (h = d ? Gt(d) : window, g = h.nodeName && h.nodeName.toLowerCase(), g === "select" || g === "input" && h.type === "file") var j = lf;
        else if (vs(h)) if (iu) j = uf;
        else {
          j = sf;
          var C = of;
        }
        else (g = h.nodeName) && g.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (j = af);
        if (j && (j = j(e, d))) {
          ou(m, j, n, v);
          break e;
        }
        C && C(e, h, d), e === "focusout" && (C = h._wrapperState) && C.controlled && h.type === "number" && po(h, "number", h.value);
      }
      switch (C = d ? Gt(d) : window, e) {
        case "focusin":
          (vs(C) || C.contentEditable === "true") && (Yt = C, _o = d, Fn = null);
          break;
        case "focusout":
          Fn = _o = Yt = null;
          break;
        case "mousedown":
          Eo = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Eo = !1, ks(m, n, v);
          break;
        case "selectionchange":
          if (ff) break;
        case "keydown":
        case "keyup":
          ks(m, n, v);
      }
      var w;
      if (yi) e: {
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
      else Kt ? ru(e, n) && (z = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (z = "onCompositionStart");
      z && (nu && n.locale !== "ko" && (Kt || z !== "onCompositionStart" ? z === "onCompositionEnd" && Kt && (w = tu()) : (dt = v, mi = "value" in dt ? dt.value : dt.textContent, Kt = !0)), C = Zr(d, z), 0 < C.length && (z = new fs(z, e, null, n, v), m.push({ event: z, listeners: C }), w ? z.data = w : (w = lu(n), w !== null && (z.data = w)))), (w = qd ? ef(e, n) : tf(e, n)) && (d = Zr(d, "onBeforeInput"), 0 < d.length && (v = new fs("onBeforeInput", "beforeinput", null, n, v), m.push({ event: v, listeners: d }), v.data = w));
    }
    vu(m, t);
  });
}
function Zn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Zr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Vn(e, n), o != null && r.unshift(Zn(e, o, l)), o = Vn(e, t), o != null && r.push(Zn(e, o, l))), e = e.return;
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
function js(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var u = n, a = u.alternate, d = u.stateNode;
    if (a !== null && a === r) break;
    u.tag === 5 && d !== null && (u = d, l ? (a = Vn(n, o), a != null && i.unshift(Zn(n, a, u))) : l || (a = Vn(n, o), a != null && i.push(Zn(n, a, u)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var vf = /\r\n?/g, gf = /\u0000|\uFFFD/g;
function _s(e) {
  return (typeof e == "string" ? e : "" + e).replace(vf, `
`).replace(gf, "");
}
function Nr(e, t, n) {
  if (t = _s(t), _s(e) !== t && n) throw Error(_(425));
}
function Jr() {
}
var Co = null, zo = null;
function Po(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var To = typeof setTimeout == "function" ? setTimeout : void 0, yf = typeof clearTimeout == "function" ? clearTimeout : void 0, Es = typeof Promise == "function" ? Promise : void 0, xf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Es < "u" ? function(e) {
  return Es.resolve(null).then(e).catch(wf);
} : To;
function wf(e) {
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
        e.removeChild(l), Kn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Kn(t);
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
function Cs(e) {
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
var xn = Math.random().toString(36).slice(2), Ve = "__reactFiber$" + xn, Jn = "__reactProps$" + xn, tt = "__reactContainer$" + xn, Mo = "__reactEvents$" + xn, kf = "__reactListeners$" + xn, Sf = "__reactHandles$" + xn;
function Mt(e) {
  var t = e[Ve];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[tt] || n[Ve]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Cs(e); e !== null; ) {
        if (n = e[Ve]) return n;
        e = Cs(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function ar(e) {
  return e = e[Ve] || e[tt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Gt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(_(33));
}
function kl(e) {
  return e[Jn] || null;
}
var Lo = [], Zt = -1;
function _t(e) {
  return { current: e };
}
function W(e) {
  0 > Zt || (e.current = Lo[Zt], Lo[Zt] = null, Zt--);
}
function B(e, t) {
  Zt++, Lo[Zt] = e.current, e.current = t;
}
var Nt = {}, de = _t(Nt), ye = _t(!1), Dt = Nt;
function dn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Nt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function xe(e) {
  return e = e.childContextTypes, e != null;
}
function qr() {
  W(ye), W(de);
}
function zs(e, t, n) {
  if (de.current !== Nt) throw Error(_(168));
  B(de, t), B(ye, n);
}
function yu(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(_(108, od(e) || "Unknown", l));
  return Y({}, n, r);
}
function el(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Nt, Dt = de.current, B(de, e), B(ye, ye.current), !0;
}
function Ps(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(_(169));
  n ? (e = yu(e, t, Dt), r.__reactInternalMemoizedMergedChildContext = e, W(ye), W(de), B(de, e)) : W(ye), B(ye, n);
}
var Xe = null, Sl = !1, Gl = !1;
function xu(e) {
  Xe === null ? Xe = [e] : Xe.push(e);
}
function Nf(e) {
  Sl = !0, xu(e);
}
function Et() {
  if (!Gl && Xe !== null) {
    Gl = !0;
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
      throw Xe !== null && (Xe = Xe.slice(e + 1)), Va(di, Et), l;
    } finally {
      U = t, Gl = !1;
    }
  }
  return null;
}
var Jt = [], qt = 0, tl = null, nl = 0, Ce = [], ze = 0, Ft = null, Ze = 1, Je = "";
function Pt(e, t) {
  Jt[qt++] = nl, Jt[qt++] = tl, tl = e, nl = t;
}
function wu(e, t, n) {
  Ce[ze++] = Ze, Ce[ze++] = Je, Ce[ze++] = Ft, Ft = e;
  var r = Ze;
  e = Je;
  var l = 32 - Fe(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - Fe(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, Ze = 1 << 32 - Fe(t) + l | n << l | r, Je = o + e;
  } else Ze = 1 << o | n << l | r, Je = e;
}
function wi(e) {
  e.return !== null && (Pt(e, 1), wu(e, 1, 0));
}
function ki(e) {
  for (; e === tl; ) tl = Jt[--qt], Jt[qt] = null, nl = Jt[--qt], Jt[qt] = null;
  for (; e === Ft; ) Ft = Ce[--ze], Ce[ze] = null, Je = Ce[--ze], Ce[ze] = null, Ze = Ce[--ze], Ce[ze] = null;
}
var Ne = null, Se = null, Q = !1, De = null;
function ku(e, t) {
  var n = Pe(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Ts(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Ne = e, Se = gt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Ne = e, Se = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Ft !== null ? { id: Ze, overflow: Je } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Pe(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ne = e, Se = null, !0) : !1;
    default:
      return !1;
  }
}
function $o(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ro(e) {
  if (Q) {
    var t = Se;
    if (t) {
      var n = t;
      if (!Ts(e, t)) {
        if ($o(e)) throw Error(_(418));
        t = gt(n.nextSibling);
        var r = Ne;
        t && Ts(e, t) ? ku(r, n) : (e.flags = e.flags & -4097 | 2, Q = !1, Ne = e);
      }
    } else {
      if ($o(e)) throw Error(_(418));
      e.flags = e.flags & -4097 | 2, Q = !1, Ne = e;
    }
  }
}
function Ms(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Ne = e;
}
function jr(e) {
  if (e !== Ne) return !1;
  if (!Q) return Ms(e), Q = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Po(e.type, e.memoizedProps)), t && (t = Se)) {
    if ($o(e)) throw Su(), Error(_(418));
    for (; t; ) ku(e, t), t = gt(t.nextSibling);
  }
  if (Ms(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(_(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Se = gt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Se = null;
    }
  } else Se = Ne ? gt(e.stateNode.nextSibling) : null;
  return !0;
}
function Su() {
  for (var e = Se; e; ) e = gt(e.nextSibling);
}
function fn() {
  Se = Ne = null, Q = !1;
}
function Si(e) {
  De === null ? De = [e] : De.push(e);
}
var jf = ot.ReactCurrentBatchConfig;
function _n(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(_(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(_(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var u = l.refs;
        i === null ? delete u[o] : u[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(_(284));
    if (!n._owner) throw Error(_(290, e));
  }
  return e;
}
function _r(e, t) {
  throw e = Object.prototype.toString.call(t), Error(_(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Ls(e) {
  var t = e._init;
  return t(e._payload);
}
function Nu(e) {
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
    return f = kt(f, c), f.index = 0, f.sibling = null, f;
  }
  function o(f, c, p) {
    return f.index = p, e ? (p = f.alternate, p !== null ? (p = p.index, p < c ? (f.flags |= 2, c) : p) : (f.flags |= 2, c)) : (f.flags |= 1048576, c);
  }
  function i(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function u(f, c, p, y) {
    return c === null || c.tag !== 6 ? (c = ro(p, f.mode, y), c.return = f, c) : (c = l(c, p), c.return = f, c);
  }
  function a(f, c, p, y) {
    var j = p.type;
    return j === bt ? v(f, c, p.props.children, y, p.key) : c !== null && (c.elementType === j || typeof j == "object" && j !== null && j.$$typeof === st && Ls(j) === c.type) ? (y = l(c, p.props), y.ref = _n(f, c, p), y.return = f, y) : (y = Wr(p.type, p.key, p.props, null, f.mode, y), y.ref = _n(f, c, p), y.return = f, y);
  }
  function d(f, c, p, y) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== p.containerInfo || c.stateNode.implementation !== p.implementation ? (c = lo(p, f.mode, y), c.return = f, c) : (c = l(c, p.children || []), c.return = f, c);
  }
  function v(f, c, p, y, j) {
    return c === null || c.tag !== 7 ? (c = Ot(p, f.mode, y, j), c.return = f, c) : (c = l(c, p), c.return = f, c);
  }
  function m(f, c, p) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = ro("" + c, f.mode, p), c.return = f, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case hr:
          return p = Wr(c.type, c.key, c.props, null, f.mode, p), p.ref = _n(f, null, c), p.return = f, p;
        case Qt:
          return c = lo(c, f.mode, p), c.return = f, c;
        case st:
          var y = c._init;
          return m(f, y(c._payload), p);
      }
      if (Pn(c) || wn(c)) return c = Ot(c, f.mode, p, null), c.return = f, c;
      _r(f, c);
    }
    return null;
  }
  function h(f, c, p, y) {
    var j = c !== null ? c.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number") return j !== null ? null : u(f, c, "" + p, y);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case hr:
          return p.key === j ? a(f, c, p, y) : null;
        case Qt:
          return p.key === j ? d(f, c, p, y) : null;
        case st:
          return j = p._init, h(
            f,
            c,
            j(p._payload),
            y
          );
      }
      if (Pn(p) || wn(p)) return j !== null ? null : v(f, c, p, y, null);
      _r(f, p);
    }
    return null;
  }
  function g(f, c, p, y, j) {
    if (typeof y == "string" && y !== "" || typeof y == "number") return f = f.get(p) || null, u(c, f, "" + y, j);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case hr:
          return f = f.get(y.key === null ? p : y.key) || null, a(c, f, y, j);
        case Qt:
          return f = f.get(y.key === null ? p : y.key) || null, d(c, f, y, j);
        case st:
          var C = y._init;
          return g(f, c, p, C(y._payload), j);
      }
      if (Pn(y) || wn(y)) return f = f.get(p) || null, v(c, f, y, j, null);
      _r(c, y);
    }
    return null;
  }
  function k(f, c, p, y) {
    for (var j = null, C = null, w = c, z = c = 0, E = null; w !== null && z < p.length; z++) {
      w.index > z ? (E = w, w = null) : E = w.sibling;
      var x = h(f, w, p[z], y);
      if (x === null) {
        w === null && (w = E);
        break;
      }
      e && w && x.alternate === null && t(f, w), c = o(x, c, z), C === null ? j = x : C.sibling = x, C = x, w = E;
    }
    if (z === p.length) return n(f, w), Q && Pt(f, z), j;
    if (w === null) {
      for (; z < p.length; z++) w = m(f, p[z], y), w !== null && (c = o(w, c, z), C === null ? j = w : C.sibling = w, C = w);
      return Q && Pt(f, z), j;
    }
    for (w = r(f, w); z < p.length; z++) E = g(w, f, z, p[z], y), E !== null && (e && E.alternate !== null && w.delete(E.key === null ? z : E.key), c = o(E, c, z), C === null ? j = E : C.sibling = E, C = E);
    return e && w.forEach(function(S) {
      return t(f, S);
    }), Q && Pt(f, z), j;
  }
  function N(f, c, p, y) {
    var j = wn(p);
    if (typeof j != "function") throw Error(_(150));
    if (p = j.call(p), p == null) throw Error(_(151));
    for (var C = j = null, w = c, z = c = 0, E = null, x = p.next(); w !== null && !x.done; z++, x = p.next()) {
      w.index > z ? (E = w, w = null) : E = w.sibling;
      var S = h(f, w, x.value, y);
      if (S === null) {
        w === null && (w = E);
        break;
      }
      e && w && S.alternate === null && t(f, w), c = o(S, c, z), C === null ? j = S : C.sibling = S, C = S, w = E;
    }
    if (x.done) return n(
      f,
      w
    ), Q && Pt(f, z), j;
    if (w === null) {
      for (; !x.done; z++, x = p.next()) x = m(f, x.value, y), x !== null && (c = o(x, c, z), C === null ? j = x : C.sibling = x, C = x);
      return Q && Pt(f, z), j;
    }
    for (w = r(f, w); !x.done; z++, x = p.next()) x = g(w, f, z, x.value, y), x !== null && (e && x.alternate !== null && w.delete(x.key === null ? z : x.key), c = o(x, c, z), C === null ? j = x : C.sibling = x, C = x);
    return e && w.forEach(function(D) {
      return t(f, D);
    }), Q && Pt(f, z), j;
  }
  function $(f, c, p, y) {
    if (typeof p == "object" && p !== null && p.type === bt && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case hr:
          e: {
            for (var j = p.key, C = c; C !== null; ) {
              if (C.key === j) {
                if (j = p.type, j === bt) {
                  if (C.tag === 7) {
                    n(f, C.sibling), c = l(C, p.props.children), c.return = f, f = c;
                    break e;
                  }
                } else if (C.elementType === j || typeof j == "object" && j !== null && j.$$typeof === st && Ls(j) === C.type) {
                  n(f, C.sibling), c = l(C, p.props), c.ref = _n(f, C, p), c.return = f, f = c;
                  break e;
                }
                n(f, C);
                break;
              } else t(f, C);
              C = C.sibling;
            }
            p.type === bt ? (c = Ot(p.props.children, f.mode, y, p.key), c.return = f, f = c) : (y = Wr(p.type, p.key, p.props, null, f.mode, y), y.ref = _n(f, c, p), y.return = f, f = y);
          }
          return i(f);
        case Qt:
          e: {
            for (C = p.key; c !== null; ) {
              if (c.key === C) if (c.tag === 4 && c.stateNode.containerInfo === p.containerInfo && c.stateNode.implementation === p.implementation) {
                n(f, c.sibling), c = l(c, p.children || []), c.return = f, f = c;
                break e;
              } else {
                n(f, c);
                break;
              }
              else t(f, c);
              c = c.sibling;
            }
            c = lo(p, f.mode, y), c.return = f, f = c;
          }
          return i(f);
        case st:
          return C = p._init, $(f, c, C(p._payload), y);
      }
      if (Pn(p)) return k(f, c, p, y);
      if (wn(p)) return N(f, c, p, y);
      _r(f, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, c !== null && c.tag === 6 ? (n(f, c.sibling), c = l(c, p), c.return = f, f = c) : (n(f, c), c = ro(p, f.mode, y), c.return = f, f = c), i(f)) : n(f, c);
  }
  return $;
}
var pn = Nu(!0), ju = Nu(!1), rl = _t(null), ll = null, en = null, Ni = null;
function ji() {
  Ni = en = ll = null;
}
function _i(e) {
  var t = rl.current;
  W(rl), e._currentValue = t;
}
function Oo(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function an(e, t) {
  ll = e, Ni = en = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (ge = !0), e.firstContext = null);
}
function Me(e) {
  var t = e._currentValue;
  if (Ni !== e) if (e = { context: e, memoizedValue: t, next: null }, en === null) {
    if (ll === null) throw Error(_(308));
    en = e, ll.dependencies = { lanes: 0, firstContext: e };
  } else en = en.next = e;
  return t;
}
var Lt = null;
function Ei(e) {
  Lt === null ? Lt = [e] : Lt.push(e);
}
function _u(e, t, n, r) {
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
function Ci(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Eu(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function qe(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function yt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, A & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, nt(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Ei(r)) : (t.next = l.next, l.next = t), r.interleaved = t, nt(e, n);
}
function Fr(e, t, n) {
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
function ol(e, t, n, r) {
  var l = e.updateQueue;
  at = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var a = u, d = a.next;
    a.next = null, i === null ? o = d : i.next = d, i = a;
    var v = e.alternate;
    v !== null && (v = v.updateQueue, u = v.lastBaseUpdate, u !== i && (u === null ? v.firstBaseUpdate = d : u.next = d, v.lastBaseUpdate = a));
  }
  if (o !== null) {
    var m = l.baseState;
    i = 0, v = d = a = null, u = o;
    do {
      var h = u.lane, g = u.eventTime;
      if ((r & h) === h) {
        v !== null && (v = v.next = {
          eventTime: g,
          lane: 0,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        });
        e: {
          var k = e, N = u;
          switch (h = t, g = n, N.tag) {
            case 1:
              if (k = N.payload, typeof k == "function") {
                m = k.call(g, m, h);
                break e;
              }
              m = k;
              break e;
            case 3:
              k.flags = k.flags & -65537 | 128;
            case 0:
              if (k = N.payload, h = typeof k == "function" ? k.call(g, m, h) : k, h == null) break e;
              m = Y({}, m, h);
              break e;
            case 2:
              at = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [u] : h.push(u));
      } else g = { eventTime: g, lane: h, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, v === null ? (d = v = g, a = m) : v = v.next = g, i |= h;
      if (u = u.next, u === null) {
        if (u = l.shared.pending, u === null) break;
        h = u, u = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (a = m), l.baseState = a, l.firstBaseUpdate = d, l.lastBaseUpdate = v, t = l.shared.interleaved, t !== null) {
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
      if (r.callback = null, r = n, typeof l != "function") throw Error(_(191, l));
      l.call(r);
    }
  }
}
var ur = {}, be = _t(ur), qn = _t(ur), er = _t(ur);
function $t(e) {
  if (e === ur) throw Error(_(174));
  return e;
}
function zi(e, t) {
  switch (B(er, t), B(qn, e), B(be, ur), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : mo(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = mo(t, e);
  }
  W(be), B(be, t);
}
function hn() {
  W(be), W(qn), W(er);
}
function Cu(e) {
  $t(er.current);
  var t = $t(be.current), n = mo(t, e.type);
  t !== n && (B(qn, e), B(be, n));
}
function Pi(e) {
  qn.current === e && (W(be), W(qn));
}
var b = _t(0);
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
var Zl = [];
function Ti() {
  for (var e = 0; e < Zl.length; e++) Zl[e]._workInProgressVersionPrimary = null;
  Zl.length = 0;
}
var Ir = ot.ReactCurrentDispatcher, Jl = ot.ReactCurrentBatchConfig, It = 0, K = null, ee = null, re = null, sl = !1, In = !1, tr = 0, _f = 0;
function ae() {
  throw Error(_(321));
}
function Mi(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ae(e[n], t[n])) return !1;
  return !0;
}
function Li(e, t, n, r, l, o) {
  if (It = o, K = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ir.current = e === null || e.memoizedState === null ? Pf : Tf, e = n(r, l), In) {
    o = 0;
    do {
      if (In = !1, tr = 0, 25 <= o) throw Error(_(301));
      o += 1, re = ee = null, t.updateQueue = null, Ir.current = Mf, e = n(r, l);
    } while (In);
  }
  if (Ir.current = al, t = ee !== null && ee.next !== null, It = 0, re = ee = K = null, sl = !1, t) throw Error(_(300));
  return e;
}
function $i() {
  var e = tr !== 0;
  return tr = 0, e;
}
function We() {
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
    if (e === null) throw Error(_(310));
    ee = e, e = { memoizedState: ee.memoizedState, baseState: ee.baseState, baseQueue: ee.baseQueue, queue: ee.queue, next: null }, re === null ? K.memoizedState = re = e : re = re.next = e;
  }
  return re;
}
function nr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ql(e) {
  var t = Le(), n = t.queue;
  if (n === null) throw Error(_(311));
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
    var u = i = null, a = null, d = o;
    do {
      var v = d.lane;
      if ((It & v) === v) a !== null && (a = a.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var m = {
          lane: v,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        a === null ? (u = a = m, i = r) : a = a.next = m, K.lanes |= v, At |= v;
      }
      d = d.next;
    } while (d !== null && d !== o);
    a === null ? i = r : a.next = u, Ae(r, t.memoizedState) || (ge = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = a, n.lastRenderedState = r;
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
  if (n === null) throw Error(_(311));
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
function zu() {
}
function Pu(e, t) {
  var n = K, r = Le(), l = t(), o = !Ae(r.memoizedState, l);
  if (o && (r.memoizedState = l, ge = !0), r = r.queue, Ri(Lu.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || re !== null && re.memoizedState.tag & 1) {
    if (n.flags |= 2048, rr(9, Mu.bind(null, n, r, l, t), void 0, null), le === null) throw Error(_(349));
    It & 30 || Tu(n, t, l);
  }
  return l;
}
function Tu(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = K.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, K.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Mu(e, t, n, r) {
  t.value = n, t.getSnapshot = r, $u(t) && Ru(e);
}
function Lu(e, t, n) {
  return n(function() {
    $u(t) && Ru(e);
  });
}
function $u(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ae(e, n);
  } catch {
    return !0;
  }
}
function Ru(e) {
  var t = nt(e, 1);
  t !== null && Ie(t, e, 1, -1);
}
function Os(e) {
  var t = We();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: nr, lastRenderedState: e }, t.queue = e, e = e.dispatch = zf.bind(null, K, e), [t.memoizedState, e];
}
function rr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = K.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, K.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ou() {
  return Le().memoizedState;
}
function Ar(e, t, n, r) {
  var l = We();
  K.flags |= e, l.memoizedState = rr(1 | t, n, void 0, r === void 0 ? null : r);
}
function Nl(e, t, n, r) {
  var l = Le();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ee !== null) {
    var i = ee.memoizedState;
    if (o = i.destroy, r !== null && Mi(r, i.deps)) {
      l.memoizedState = rr(t, n, o, r);
      return;
    }
  }
  K.flags |= e, l.memoizedState = rr(1 | t, n, o, r);
}
function Ds(e, t) {
  return Ar(8390656, 8, e, t);
}
function Ri(e, t) {
  return Nl(2048, 8, e, t);
}
function Du(e, t) {
  return Nl(4, 2, e, t);
}
function Fu(e, t) {
  return Nl(4, 4, e, t);
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
  return n = n != null ? n.concat([e]) : null, Nl(4, 4, Iu.bind(null, t, e), n);
}
function Oi() {
}
function Uu(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Mi(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Bu(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Mi(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Hu(e, t, n) {
  return It & 21 ? (Ae(n, t) || (n = Ka(), K.lanes |= n, At |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, ge = !0), e.memoizedState = n);
}
function Ef(e, t) {
  var n = U;
  U = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Jl.transition;
  Jl.transition = {};
  try {
    e(!1), t();
  } finally {
    U = n, Jl.transition = r;
  }
}
function Wu() {
  return Le().memoizedState;
}
function Cf(e, t, n) {
  var r = wt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Vu(e)) Qu(t, n);
  else if (n = _u(e, t, n, r), n !== null) {
    var l = pe();
    Ie(n, e, r, l), bu(n, t, r);
  }
}
function zf(e, t, n) {
  var r = wt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Vu(e)) Qu(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, u = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = u, Ae(u, i)) {
        var a = t.interleaved;
        a === null ? (l.next = l, Ei(t)) : (l.next = a.next, a.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = _u(e, t, l, r), n !== null && (l = pe(), Ie(n, e, r, l), bu(n, t, r));
  }
}
function Vu(e) {
  var t = e.alternate;
  return e === K || t !== null && t === K;
}
function Qu(e, t) {
  In = sl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function bu(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, fi(e, n);
  }
}
var al = { readContext: Me, useCallback: ae, useContext: ae, useEffect: ae, useImperativeHandle: ae, useInsertionEffect: ae, useLayoutEffect: ae, useMemo: ae, useReducer: ae, useRef: ae, useState: ae, useDebugValue: ae, useDeferredValue: ae, useTransition: ae, useMutableSource: ae, useSyncExternalStore: ae, useId: ae, unstable_isNewReconciler: !1 }, Pf = { readContext: Me, useCallback: function(e, t) {
  return We().memoizedState = [e, t === void 0 ? null : t], e;
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
  var n = We();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = We();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Cf.bind(null, K, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = We();
  return e = { current: e }, t.memoizedState = e;
}, useState: Os, useDebugValue: Oi, useDeferredValue: function(e) {
  return We().memoizedState = e;
}, useTransition: function() {
  var e = Os(!1), t = e[0];
  return e = Ef.bind(null, e[1]), We().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = K, l = We();
  if (Q) {
    if (n === void 0) throw Error(_(407));
    n = n();
  } else {
    if (n = t(), le === null) throw Error(_(349));
    It & 30 || Tu(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Ds(Lu.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, rr(9, Mu.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = We(), t = le.identifierPrefix;
  if (Q) {
    var n = Je, r = Ze;
    n = (r & ~(1 << 32 - Fe(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = tr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = _f++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Tf = {
  readContext: Me,
  useCallback: Uu,
  useContext: Me,
  useEffect: Ri,
  useImperativeHandle: Au,
  useInsertionEffect: Du,
  useLayoutEffect: Fu,
  useMemo: Bu,
  useReducer: ql,
  useRef: Ou,
  useState: function() {
    return ql(nr);
  },
  useDebugValue: Oi,
  useDeferredValue: function(e) {
    var t = Le();
    return Hu(t, ee.memoizedState, e);
  },
  useTransition: function() {
    var e = ql(nr)[0], t = Le().memoizedState;
    return [e, t];
  },
  useMutableSource: zu,
  useSyncExternalStore: Pu,
  useId: Wu,
  unstable_isNewReconciler: !1
}, Mf = { readContext: Me, useCallback: Uu, useContext: Me, useEffect: Ri, useImperativeHandle: Au, useInsertionEffect: Du, useLayoutEffect: Fu, useMemo: Bu, useReducer: eo, useRef: Ou, useState: function() {
  return eo(nr);
}, useDebugValue: Oi, useDeferredValue: function(e) {
  var t = Le();
  return ee === null ? t.memoizedState = e : Hu(t, ee.memoizedState, e);
}, useTransition: function() {
  var e = eo(nr)[0], t = Le().memoizedState;
  return [e, t];
}, useMutableSource: zu, useSyncExternalStore: Pu, useId: Wu, unstable_isNewReconciler: !1 };
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
  var r = pe(), l = wt(e), o = qe(r, l);
  o.payload = t, n != null && (o.callback = n), t = yt(e, o, l), t !== null && (Ie(t, e, l, r), Fr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = pe(), l = wt(e), o = qe(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = yt(e, o, l), t !== null && (Ie(t, e, l, r), Fr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = pe(), r = wt(e), l = qe(n, r);
  l.tag = 2, t != null && (l.callback = t), t = yt(e, l, r), t !== null && (Ie(t, e, r, n), Fr(t, e, r));
} };
function Fs(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Xn(n, r) || !Xn(l, o) : !0;
}
function Ku(e, t, n) {
  var r = !1, l = Nt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Me(o) : (l = xe(t) ? Dt : de.current, r = t.contextTypes, o = (r = r != null) ? dn(e, l) : Nt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = jl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Is(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && jl.enqueueReplaceState(t, t.state, null);
}
function Fo(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Ci(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = Me(o) : (o = xe(t) ? Dt : de.current, l.context = dn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Do(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && jl.enqueueReplaceState(l, l.state, null), ol(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function mn(e, t) {
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
  n = qe(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    cl || (cl = !0, Yo = r), Io(e, t);
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
      Io(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Io(e, t), typeof r != "function" && (xt === null ? xt = /* @__PURE__ */ new Set([this]) : xt.add(this));
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
  l.has(n) || (l.add(n), e = bf.bind(null, e, t, n), t.then(e, e));
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
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = qe(-1, 1), t.tag = 2, yt(n, t, 1))), n.lanes |= 1), e);
}
var $f = ot.ReactCurrentOwner, ge = !1;
function fe(e, t, n, r) {
  t.child = e === null ? ju(t, null, n, r) : pn(t, e.child, n, r);
}
function Hs(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return an(t, l), r = Li(e, t, n, r, o, l), n = $i(), e !== null && !ge ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, rt(e, t, l)) : (Q && n && wi(t), t.flags |= 1, fe(e, t, r, l), t.child);
}
function Ws(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Wi(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Gu(e, t, o, r, l)) : (e = Wr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Xn, n(i, r) && e.ref === t.ref) return rt(e, t, l);
  }
  return t.flags |= 1, e = kt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Gu(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Xn(o, r) && e.ref === t.ref) if (ge = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (ge = !0);
    else return t.lanes = e.lanes, rt(e, t, l);
  }
  return Ao(e, t, n, r, l);
}
function Zu(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, B(nn, ke), ke |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, B(nn, ke), ke |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, B(nn, ke), ke |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, B(nn, ke), ke |= r;
  return fe(e, t, l, n), t.child;
}
function Ju(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ao(e, t, n, r, l) {
  var o = xe(n) ? Dt : de.current;
  return o = dn(t, o), an(t, l), n = Li(e, t, n, r, o, l), r = $i(), e !== null && !ge ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, rt(e, t, l)) : (Q && r && wi(t), t.flags |= 1, fe(e, t, n, l), t.child);
}
function Vs(e, t, n, r, l) {
  if (xe(n)) {
    var o = !0;
    el(t);
  } else o = !1;
  if (an(t, l), t.stateNode === null) Ur(e, t), Ku(t, n, r), Fo(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, u = t.memoizedProps;
    i.props = u;
    var a = i.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = Me(d) : (d = xe(n) ? Dt : de.current, d = dn(t, d));
    var v = n.getDerivedStateFromProps, m = typeof v == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    m || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== r || a !== d) && Is(t, i, r, d), at = !1;
    var h = t.memoizedState;
    i.state = h, ol(t, r, i, l), a = t.memoizedState, u !== r || h !== a || ye.current || at ? (typeof v == "function" && (Do(t, n, v, r), a = t.memoizedState), (u = at || Fs(t, n, u, r, h, a, d)) ? (m || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = a), i.props = r, i.state = a, i.context = d, r = u) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, Eu(e, t), u = t.memoizedProps, d = t.type === t.elementType ? u : Re(t.type, u), i.props = d, m = t.pendingProps, h = i.context, a = n.contextType, typeof a == "object" && a !== null ? a = Me(a) : (a = xe(n) ? Dt : de.current, a = dn(t, a));
    var g = n.getDerivedStateFromProps;
    (v = typeof g == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== m || h !== a) && Is(t, i, r, a), at = !1, h = t.memoizedState, i.state = h, ol(t, r, i, l);
    var k = t.memoizedState;
    u !== m || h !== k || ye.current || at ? (typeof g == "function" && (Do(t, n, g, r), k = t.memoizedState), (d = at || Fs(t, n, d, r, h, k, a) || !1) ? (v || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, k, a), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, k, a)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = k), i.props = r, i.state = k, i.context = a, r = d) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Uo(e, t, n, r, o, l);
}
function Uo(e, t, n, r, l, o) {
  Ju(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && Ps(t, n, !1), rt(e, t, o);
  r = t.stateNode, $f.current = t;
  var u = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = pn(t, e.child, null, o), t.child = pn(t, null, u, o)) : fe(e, t, u, o), t.memoizedState = r.state, l && Ps(t, n, !0), t.child;
}
function qu(e) {
  var t = e.stateNode;
  t.pendingContext ? zs(e, t.pendingContext, t.pendingContext !== t.context) : t.context && zs(e, t.context, !1), zi(e, t.containerInfo);
}
function Qs(e, t, n, r, l) {
  return fn(), Si(l), t.flags |= 256, fe(e, t, n, r), t.child;
}
var Bo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ho(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function ec(e, t, n) {
  var r = t.pendingProps, l = b.current, o = !1, i = (t.flags & 128) !== 0, u;
  if ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), B(b, l & 1), e === null)
    return Ro(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = Cl(i, r, 0, null), e = Ot(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Ho(n), t.memoizedState = Bo, e) : Di(t, i));
  if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return Rf(e, t, i, r, u, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, u = l.sibling;
    var a = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = a, t.deletions = null) : (r = kt(l, a), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? o = kt(u, o) : (o = Ot(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? Ho(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = Bo, r;
  }
  return o = e.child, e = o.sibling, r = kt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Di(e, t) {
  return t = Cl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Er(e, t, n, r) {
  return r !== null && Si(r), pn(t, e.child, null, n), e = Di(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Rf(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = to(Error(_(422))), Er(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Cl({ mode: "visible", children: r.children }, l, 0, null), o = Ot(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && pn(t, e.child, null, i), t.child.memoizedState = Ho(i), t.memoizedState = Bo, o);
  if (!(t.mode & 1)) return Er(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
    return r = u, o = Error(_(419)), r = to(o, r, void 0), Er(e, t, i, r);
  }
  if (u = (i & e.childLanes) !== 0, ge || u) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, nt(e, l), Ie(r, e, l, -1));
    }
    return Hi(), r = to(Error(_(421))), Er(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Kf.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Se = gt(l.nextSibling), Ne = t, Q = !0, De = null, e !== null && (Ce[ze++] = Ze, Ce[ze++] = Je, Ce[ze++] = Ft, Ze = e.id, Je = e.overflow, Ft = t), t = Di(t, r.children), t.flags |= 4096, t);
}
function bs(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Oo(e.return, t, n);
}
function no(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function tc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (fe(e, t, r.children, n), r = b.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && bs(e, n, t);
      else if (e.tag === 19) bs(e, n, t);
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
  if (B(b, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && il(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), no(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && il(e) === null) {
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
function Ur(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function rt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), At |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(_(153));
  if (t.child !== null) {
    for (e = t.child, n = kt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = kt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Of(e, t, n) {
  switch (t.tag) {
    case 3:
      qu(t), fn();
      break;
    case 5:
      Cu(t);
      break;
    case 1:
      xe(t.type) && el(t);
      break;
    case 4:
      zi(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      B(rl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (B(b, b.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? ec(e, t, n) : (B(b, b.current & 1), e = rt(e, t, n), e !== null ? e.sibling : null);
      B(b, b.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return tc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), B(b, b.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Zu(e, t, n);
  }
  return rt(e, t, n);
}
var nc, Wo, rc, lc;
nc = function(e, t) {
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
rc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, $t(be.current);
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
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Jr);
    }
    vo(n, r);
    var i;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var u = l[d];
      for (i in u) u.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Hn.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in r) {
      var a = r[d];
      if (u = l != null ? l[d] : void 0, r.hasOwnProperty(d) && a !== u && (a != null || u != null)) if (d === "style") if (u) {
        for (i in u) !u.hasOwnProperty(i) || a && a.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in a) a.hasOwnProperty(i) && u[i] !== a[i] && (n || (n = {}), n[i] = a[i]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = a;
      else d === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, u = u ? u.__html : void 0, a != null && u !== a && (o = o || []).push(d, a)) : d === "children" ? typeof a != "string" && typeof a != "number" || (o = o || []).push(d, "" + a) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Hn.hasOwnProperty(d) ? (a != null && d === "onScroll" && H("scroll", e), o || u === a || (o = [])) : (o = o || []).push(d, a));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
lc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function En(e, t) {
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
      return xe(t.type) && qr(), ue(t), null;
    case 3:
      return r = t.stateNode, hn(), W(ye), W(de), Ti(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (jr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, De !== null && (Zo(De), De = null))), Wo(e, t), ue(t), null;
    case 5:
      Pi(t);
      var l = $t(er.current);
      if (n = t.type, e !== null && t.stateNode != null) rc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(_(166));
          return ue(t), null;
        }
        if (e = $t(be.current), jr(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Ve] = t, r[Jn] = o, e = (t.mode & 1) !== 0, n) {
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
            var u = o[i];
            i === "children" ? typeof u == "string" ? r.textContent !== u && (o.suppressHydrationWarning !== !0 && Nr(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (o.suppressHydrationWarning !== !0 && Nr(
              r.textContent,
              u,
              e
            ), l = ["children", "" + u]) : Hn.hasOwnProperty(i) && u != null && i === "onScroll" && H("scroll", r);
          }
          switch (n) {
            case "input":
              mr(r), ns(r, o, !0);
              break;
            case "textarea":
              mr(r), ls(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Jr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = La(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[Ve] = t, e[Jn] = r, nc(e, t, !1, !1), t.stateNode = e;
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
            vo(n, l), u = l;
            for (o in u) if (u.hasOwnProperty(o)) {
              var a = u[o];
              o === "style" ? Oa(e, a) : o === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && $a(e, a)) : o === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && Wn(e, a) : typeof a == "number" && Wn(e, "" + a) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Hn.hasOwnProperty(o) ? a != null && o === "onScroll" && H("scroll", e) : a != null && ii(e, o, a, i));
            }
            switch (n) {
              case "input":
                mr(e), ns(e, r, !1);
                break;
              case "textarea":
                mr(e), ls(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + St(r.value));
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
      return ue(t), null;
    case 6:
      if (e && t.stateNode != null) lc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(_(166));
        if (n = $t(er.current), $t(be.current), jr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ve] = t, (o = r.nodeValue !== n) && (e = Ne, e !== null)) switch (e.tag) {
            case 3:
              Nr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Nr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ve] = t, t.stateNode = r;
      }
      return ue(t), null;
    case 13:
      if (W(b), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Q && Se !== null && t.mode & 1 && !(t.flags & 128)) Su(), fn(), t.flags |= 98560, o = !1;
        else if (o = jr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(_(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(_(317));
            o[Ve] = t;
          } else fn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ue(t), o = !1;
        } else De !== null && (Zo(De), De = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || b.current & 1 ? te === 0 && (te = 3) : Hi())), t.updateQueue !== null && (t.flags |= 4), ue(t), null);
    case 4:
      return hn(), Wo(e, t), e === null && Gn(t.stateNode.containerInfo), ue(t), null;
    case 10:
      return _i(t.type._context), ue(t), null;
    case 17:
      return xe(t.type) && qr(), ue(t), null;
    case 19:
      if (W(b), o = t.memoizedState, o === null) return ue(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) En(o, !1);
      else {
        if (te !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = il(e), i !== null) {
            for (t.flags |= 128, En(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return B(b, b.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && J() > vn && (t.flags |= 128, r = !0, En(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = il(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), En(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !Q) return ue(t), null;
        } else 2 * J() - o.renderingStartTime > vn && n !== 1073741824 && (t.flags |= 128, r = !0, En(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = J(), t.sibling = null, n = b.current, B(b, r ? n & 1 | 2 : n & 1), t) : (ue(t), null);
    case 22:
    case 23:
      return Bi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ke & 1073741824 && (ue(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ue(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(_(156, t.tag));
}
function Ff(e, t) {
  switch (ki(t), t.tag) {
    case 1:
      return xe(t.type) && qr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return hn(), W(ye), W(de), Ti(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Pi(t), null;
    case 13:
      if (W(b), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(_(340));
        fn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return W(b), null;
    case 4:
      return hn(), null;
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
var Cr = !1, ce = !1, If = typeof WeakSet == "function" ? WeakSet : Set, M = null;
function tn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    G(e, t, r);
  }
  else n.current = null;
}
function Vo(e, t, n) {
  try {
    n();
  } catch (r) {
    G(e, t, r);
  }
}
var Ks = !1;
function Af(e, t) {
  if (Co = Xr, e = uu(), xi(e)) {
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
        var i = 0, u = -1, a = -1, d = 0, v = 0, m = e, h = null;
        t: for (; ; ) {
          for (var g; m !== n || l !== 0 && m.nodeType !== 3 || (u = i + l), m !== o || r !== 0 && m.nodeType !== 3 || (a = i + r), m.nodeType === 3 && (i += m.nodeValue.length), (g = m.firstChild) !== null; )
            h = m, m = g;
          for (; ; ) {
            if (m === e) break t;
            if (h === n && ++d === l && (u = i), h === o && ++v === r && (a = i), (g = m.nextSibling) !== null) break;
            m = h, h = m.parentNode;
          }
          m = g;
        }
        n = u === -1 || a === -1 ? null : { start: u, end: a };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (zo = { focusedElem: e, selectionRange: n }, Xr = !1, M = t; M !== null; ) if (t = M, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, M = e;
  else for (; M !== null; ) {
    t = M;
    try {
      var k = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (k !== null) {
            var N = k.memoizedProps, $ = k.memoizedState, f = t.stateNode, c = f.getSnapshotBeforeUpdate(t.elementType === t.type ? N : Re(t.type, N), $);
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
          throw Error(_(163));
      }
    } catch (y) {
      G(t, t.return, y);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, M = e;
      break;
    }
    M = t.return;
  }
  return k = Ks, Ks = !1, k;
}
function An(e, t, n) {
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
function _l(e, t) {
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
function oc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, oc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ve], delete t[Jn], delete t[Mo], delete t[kf], delete t[Sf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function ic(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ys(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || ic(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function bo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Jr));
  else if (r !== 4 && (e = e.child, e !== null)) for (bo(e, t, n), e = e.sibling; e !== null; ) bo(e, t, n), e = e.sibling;
}
function Ko(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Ko(e, t, n), e = e.sibling; e !== null; ) Ko(e, t, n), e = e.sibling;
}
var oe = null, Oe = !1;
function it(e, t, n) {
  for (n = n.child; n !== null; ) sc(e, t, n), n = n.sibling;
}
function sc(e, t, n) {
  if (Qe && typeof Qe.onCommitFiberUnmount == "function") try {
    Qe.onCommitFiberUnmount(gl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ce || tn(n, t);
    case 6:
      var r = oe, l = Oe;
      oe = null, it(e, t, n), oe = r, Oe = l, oe !== null && (Oe ? (e = oe, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : oe.removeChild(n.stateNode));
      break;
    case 18:
      oe !== null && (Oe ? (e = oe, n = n.stateNode, e.nodeType === 8 ? Xl(e.parentNode, n) : e.nodeType === 1 && Xl(e, n), Kn(e)) : Xl(oe, n.stateNode));
      break;
    case 4:
      r = oe, l = Oe, oe = n.stateNode.containerInfo, Oe = !0, it(e, t, n), oe = r, Oe = l;
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
      it(e, t, n);
      break;
    case 1:
      if (!ce && (tn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (u) {
        G(n, t, u);
      }
      it(e, t, n);
      break;
    case 21:
      it(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ce = (r = ce) || n.memoizedState !== null, it(e, t, n), ce = r) : it(e, t, n);
      break;
    default:
      it(e, t, n);
  }
}
function Xs(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new If()), t.forEach(function(r) {
      var l = Yf.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function $e(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, u = i;
      e: for (; u !== null; ) {
        switch (u.tag) {
          case 5:
            oe = u.stateNode, Oe = !1;
            break e;
          case 3:
            oe = u.stateNode.containerInfo, Oe = !0;
            break e;
          case 4:
            oe = u.stateNode.containerInfo, Oe = !0;
            break e;
        }
        u = u.return;
      }
      if (oe === null) throw Error(_(160));
      sc(o, i, l), oe = null, Oe = !1;
      var a = l.alternate;
      a !== null && (a.return = null), l.return = null;
    } catch (d) {
      G(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) ac(t, e), t = t.sibling;
}
function ac(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ($e(t, e), He(e), r & 4) {
        try {
          An(3, e, e.return), _l(3, e);
        } catch (N) {
          G(e, e.return, N);
        }
        try {
          An(5, e, e.return);
        } catch (N) {
          G(e, e.return, N);
        }
      }
      break;
    case 1:
      $e(t, e), He(e), r & 512 && n !== null && tn(n, n.return);
      break;
    case 5:
      if ($e(t, e), He(e), r & 512 && n !== null && tn(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Wn(l, "");
        } catch (N) {
          G(e, e.return, N);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, u = e.type, a = e.updateQueue;
        if (e.updateQueue = null, a !== null) try {
          u === "input" && o.type === "radio" && o.name != null && Ta(l, o), go(u, i);
          var d = go(u, o);
          for (i = 0; i < a.length; i += 2) {
            var v = a[i], m = a[i + 1];
            v === "style" ? Oa(l, m) : v === "dangerouslySetInnerHTML" ? $a(l, m) : v === "children" ? Wn(l, m) : ii(l, v, m, d);
          }
          switch (u) {
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
              g != null ? rn(l, !!o.multiple, g, !1) : h !== !!o.multiple && (o.defaultValue != null ? rn(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : rn(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Jn] = o;
        } catch (N) {
          G(e, e.return, N);
        }
      }
      break;
    case 6:
      if ($e(t, e), He(e), r & 4) {
        if (e.stateNode === null) throw Error(_(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (N) {
          G(e, e.return, N);
        }
      }
      break;
    case 3:
      if ($e(t, e), He(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Kn(t.containerInfo);
      } catch (N) {
        G(e, e.return, N);
      }
      break;
    case 4:
      $e(t, e), He(e);
      break;
    case 13:
      $e(t, e), He(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Ai = J())), r & 4 && Xs(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (ce = (d = ce) || v, $e(t, e), ce = d) : $e(t, e), He(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !v && e.mode & 1) for (M = e, v = e.child; v !== null; ) {
          for (m = M = v; M !== null; ) {
            switch (h = M, g = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                An(4, h, h.return);
                break;
              case 1:
                tn(h, h.return);
                var k = h.stateNode;
                if (typeof k.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, k.props = t.memoizedProps, k.state = t.memoizedState, k.componentWillUnmount();
                  } catch (N) {
                    G(r, n, N);
                  }
                }
                break;
              case 5:
                tn(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Zs(m);
                  continue;
                }
            }
            g !== null ? (g.return = h, M = g) : Zs(m);
          }
          v = v.sibling;
        }
        e: for (v = null, m = e; ; ) {
          if (m.tag === 5) {
            if (v === null) {
              v = m;
              try {
                l = m.stateNode, d ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (u = m.stateNode, a = m.memoizedProps.style, i = a != null && a.hasOwnProperty("display") ? a.display : null, u.style.display = Ra("display", i));
              } catch (N) {
                G(e, e.return, N);
              }
            }
          } else if (m.tag === 6) {
            if (v === null) try {
              m.stateNode.nodeValue = d ? "" : m.memoizedProps;
            } catch (N) {
              G(e, e.return, N);
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
      $e(t, e), He(e), r & 4 && Xs(e);
      break;
    case 21:
      break;
    default:
      $e(
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
          if (ic(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(_(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Wn(l, ""), r.flags &= -33);
          var o = Ys(e);
          Ko(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, u = Ys(e);
          bo(e, u, i);
          break;
        default:
          throw Error(_(161));
      }
    } catch (a) {
      G(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Uf(e, t, n) {
  M = e, uc(e);
}
function uc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; M !== null; ) {
    var l = M, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Cr;
      if (!i) {
        var u = l.alternate, a = u !== null && u.memoizedState !== null || ce;
        u = Cr;
        var d = ce;
        if (Cr = i, (ce = a) && !d) for (M = l; M !== null; ) i = M, a = i.child, i.tag === 22 && i.memoizedState !== null ? Js(l) : a !== null ? (a.return = i, M = a) : Js(l);
        for (; o !== null; ) M = o, uc(o), o = o.sibling;
        M = l, Cr = u, ce = d;
      }
      Gs(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, M = o) : Gs(e);
  }
}
function Gs(e) {
  for (; M !== null; ) {
    var t = M;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ce || _l(5, t);
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
            throw Error(_(163));
        }
        ce || t.flags & 512 && Qo(t);
      } catch (h) {
        G(t, t.return, h);
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
function Zs(e) {
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
function Js(e) {
  for (; M !== null; ) {
    var t = M;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            _l(4, t);
          } catch (a) {
            G(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              G(t, l, a);
            }
          }
          var o = t.return;
          try {
            Qo(t);
          } catch (a) {
            G(t, o, a);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Qo(t);
          } catch (a) {
            G(t, i, a);
          }
      }
    } catch (a) {
      G(t, t.return, a);
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
var Bf = Math.ceil, ul = ot.ReactCurrentDispatcher, Fi = ot.ReactCurrentOwner, Te = ot.ReactCurrentBatchConfig, A = 0, le = null, q = null, ie = 0, ke = 0, nn = _t(0), te = 0, lr = null, At = 0, El = 0, Ii = 0, Un = null, ve = null, Ai = 0, vn = 1 / 0, Ye = null, cl = !1, Yo = null, xt = null, zr = !1, ft = null, dl = 0, Bn = 0, Xo = null, Br = -1, Hr = 0;
function pe() {
  return A & 6 ? J() : Br !== -1 ? Br : Br = J();
}
function wt(e) {
  return e.mode & 1 ? A & 2 && ie !== 0 ? ie & -ie : jf.transition !== null ? (Hr === 0 && (Hr = Ka()), Hr) : (e = U, e !== 0 || (e = window.event, e = e === void 0 ? 16 : eu(e.type)), e) : 1;
}
function Ie(e, t, n, r) {
  if (50 < Bn) throw Bn = 0, Xo = null, Error(_(185));
  ir(e, n, r), (!(A & 2) || e !== le) && (e === le && (!(A & 2) && (El |= n), te === 4 && ct(e, ie)), we(e, r), n === 1 && A === 0 && !(t.mode & 1) && (vn = J() + 500, Sl && Et()));
}
function we(e, t) {
  var n = e.callbackNode;
  Nd(e, t);
  var r = Yr(e, e === le ? ie : 0);
  if (r === 0) n !== null && ss(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && ss(n), t === 1) e.tag === 0 ? Nf(qs.bind(null, e)) : xu(qs.bind(null, e)), xf(function() {
      !(A & 6) && Et();
    }), n = null;
    else {
      switch (Ya(r)) {
        case 1:
          n = di;
          break;
        case 4:
          n = Qa;
          break;
        case 16:
          n = Kr;
          break;
        case 536870912:
          n = ba;
          break;
        default:
          n = Kr;
      }
      n = gc(n, cc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function cc(e, t) {
  if (Br = -1, Hr = 0, A & 6) throw Error(_(327));
  var n = e.callbackNode;
  if (un() && e.callbackNode !== n) return null;
  var r = Yr(e, e === le ? ie : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = fl(e, r);
  else {
    t = r;
    var l = A;
    A |= 2;
    var o = fc();
    (le !== e || ie !== t) && (Ye = null, vn = J() + 500, Rt(e, t));
    do
      try {
        Vf();
        break;
      } catch (u) {
        dc(e, u);
      }
    while (!0);
    ji(), ul.current = o, A = l, q !== null ? t = 0 : (le = null, ie = 0, t = te);
  }
  if (t !== 0) {
    if (t === 2 && (l = So(e), l !== 0 && (r = l, t = Go(e, l))), t === 1) throw n = lr, Rt(e, 0), ct(e, r), we(e, J()), n;
    if (t === 6) ct(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Hf(l) && (t = fl(e, r), t === 2 && (o = So(e), o !== 0 && (r = o, t = Go(e, o))), t === 1)) throw n = lr, Rt(e, 0), ct(e, r), we(e, J()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(_(345));
        case 2:
          Tt(e, ve, Ye);
          break;
        case 3:
          if (ct(e, r), (r & 130023424) === r && (t = Ai + 500 - J(), 10 < t)) {
            if (Yr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              pe(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = To(Tt.bind(null, e, ve, Ye), t);
            break;
          }
          Tt(e, ve, Ye);
          break;
        case 4:
          if (ct(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - Fe(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = J() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Bf(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = To(Tt.bind(null, e, ve, Ye), r);
            break;
          }
          Tt(e, ve, Ye);
          break;
        case 5:
          Tt(e, ve, Ye);
          break;
        default:
          throw Error(_(329));
      }
    }
  }
  return we(e, J()), e.callbackNode === n ? cc.bind(null, e) : null;
}
function Go(e, t) {
  var n = Un;
  return e.current.memoizedState.isDehydrated && (Rt(e, t).flags |= 256), e = fl(e, t), e !== 2 && (t = ve, ve = n, t !== null && Zo(t)), e;
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
function ct(e, t) {
  for (t &= ~Ii, t &= ~El, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Fe(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function qs(e) {
  if (A & 6) throw Error(_(327));
  un();
  var t = Yr(e, 0);
  if (!(t & 1)) return we(e, J()), null;
  var n = fl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = So(e);
    r !== 0 && (t = r, n = Go(e, r));
  }
  if (n === 1) throw n = lr, Rt(e, 0), ct(e, t), we(e, J()), n;
  if (n === 6) throw Error(_(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Tt(e, ve, Ye), we(e, J()), null;
}
function Ui(e, t) {
  var n = A;
  A |= 1;
  try {
    return e(t);
  } finally {
    A = n, A === 0 && (vn = J() + 500, Sl && Et());
  }
}
function Ut(e) {
  ft !== null && ft.tag === 0 && !(A & 6) && un();
  var t = A;
  A |= 1;
  var n = Te.transition, r = U;
  try {
    if (Te.transition = null, U = 1, e) return e();
  } finally {
    U = r, Te.transition = n, A = t, !(A & 6) && Et();
  }
}
function Bi() {
  ke = nn.current, W(nn);
}
function Rt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, yf(n)), q !== null) for (n = q.return; n !== null; ) {
    var r = n;
    switch (ki(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && qr();
        break;
      case 3:
        hn(), W(ye), W(de), Ti();
        break;
      case 5:
        Pi(r);
        break;
      case 4:
        hn();
        break;
      case 13:
        W(b);
        break;
      case 19:
        W(b);
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
  if (le = e, q = e = kt(e.current, null), ie = ke = t, te = 0, lr = null, Ii = El = At = 0, ve = Un = null, Lt !== null) {
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
function dc(e, t) {
  do {
    var n = q;
    try {
      if (ji(), Ir.current = al, sl) {
        for (var r = K.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        sl = !1;
      }
      if (It = 0, re = ee = K = null, In = !1, tr = 0, Fi.current = null, n === null || n.return === null) {
        te = 1, lr = t, q = null;
        break;
      }
      e: {
        var o = e, i = n.return, u = n, a = t;
        if (t = ie, u.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
          var d = a, v = u, m = v.tag;
          if (!(v.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var h = v.alternate;
            h ? (v.updateQueue = h.updateQueue, v.memoizedState = h.memoizedState, v.lanes = h.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var g = Us(i);
          if (g !== null) {
            g.flags &= -257, Bs(g, i, u, o, t), g.mode & 1 && As(o, d, t), t = g, a = d;
            var k = t.updateQueue;
            if (k === null) {
              var N = /* @__PURE__ */ new Set();
              N.add(a), t.updateQueue = N;
            } else k.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              As(o, d, t), Hi();
              break e;
            }
            a = Error(_(426));
          }
        } else if (Q && u.mode & 1) {
          var $ = Us(i);
          if ($ !== null) {
            !($.flags & 65536) && ($.flags |= 256), Bs($, i, u, o, t), Si(mn(a, u));
            break e;
          }
        }
        o = a = mn(a, u), te !== 4 && (te = 2), Un === null ? Un = [o] : Un.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var f = Yu(o, a, t);
              $s(o, f);
              break e;
            case 1:
              u = a;
              var c = o.type, p = o.stateNode;
              if (!(o.flags & 128) && (typeof c.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (xt === null || !xt.has(p)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var y = Xu(o, u, t);
                $s(o, y);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      hc(n);
    } catch (j) {
      t = j, q === n && n !== null && (q = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function fc() {
  var e = ul.current;
  return ul.current = al, e === null ? al : e;
}
function Hi() {
  (te === 0 || te === 3 || te === 2) && (te = 4), le === null || !(At & 268435455) && !(El & 268435455) || ct(le, ie);
}
function fl(e, t) {
  var n = A;
  A |= 2;
  var r = fc();
  (le !== e || ie !== t) && (Ye = null, Rt(e, t));
  do
    try {
      Wf();
      break;
    } catch (l) {
      dc(e, l);
    }
  while (!0);
  if (ji(), A = n, ul.current = r, q !== null) throw Error(_(261));
  return le = null, ie = 0, te;
}
function Wf() {
  for (; q !== null; ) pc(q);
}
function Vf() {
  for (; q !== null && !hd(); ) pc(q);
}
function pc(e) {
  var t = vc(e.alternate, e, ke);
  e.memoizedProps = e.pendingProps, t === null ? hc(e) : q = t, Fi.current = null;
}
function hc(e) {
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
function Tt(e, t, n) {
  var r = U, l = Te.transition;
  try {
    Te.transition = null, U = 1, Qf(e, t, n, r);
  } finally {
    Te.transition = l, U = r;
  }
  return null;
}
function Qf(e, t, n, r) {
  do
    un();
  while (ft !== null);
  if (A & 6) throw Error(_(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(_(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (jd(e, o), e === le && (q = le = null, ie = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || zr || (zr = !0, gc(Kr, function() {
    return un(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Te.transition, Te.transition = null;
    var i = U;
    U = 1;
    var u = A;
    A |= 4, Fi.current = null, Af(e, n), ac(n, e), df(zo), Xr = !!Co, zo = Co = null, e.current = n, Uf(n), md(), A = u, U = i, Te.transition = o;
  } else e.current = n;
  if (zr && (zr = !1, ft = e, dl = l), o = e.pendingLanes, o === 0 && (xt = null), yd(n.stateNode), we(e, J()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (cl) throw cl = !1, e = Yo, Yo = null, e;
  return dl & 1 && e.tag !== 0 && un(), o = e.pendingLanes, o & 1 ? e === Xo ? Bn++ : (Bn = 0, Xo = e) : Bn = 0, Et(), null;
}
function un() {
  if (ft !== null) {
    var e = Ya(dl), t = Te.transition, n = U;
    try {
      if (Te.transition = null, U = 16 > e ? 16 : e, ft === null) var r = !1;
      else {
        if (e = ft, ft = null, dl = 0, A & 6) throw Error(_(331));
        var l = A;
        for (A |= 4, M = e.current; M !== null; ) {
          var o = M, i = o.child;
          if (M.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var a = 0; a < u.length; a++) {
                var d = u[a];
                for (M = d; M !== null; ) {
                  var v = M;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      An(8, v, o);
                  }
                  var m = v.child;
                  if (m !== null) m.return = v, M = m;
                  else for (; M !== null; ) {
                    v = M;
                    var h = v.sibling, g = v.return;
                    if (oc(v), v === d) {
                      M = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = g, M = h;
                      break;
                    }
                    M = g;
                  }
                }
              }
              var k = o.alternate;
              if (k !== null) {
                var N = k.child;
                if (N !== null) {
                  k.child = null;
                  do {
                    var $ = N.sibling;
                    N.sibling = null, N = $;
                  } while (N !== null);
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
                An(9, o, o.return);
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
                  _l(9, u);
              }
            } catch (j) {
              G(u, u.return, j);
            }
            if (u === i) {
              M = null;
              break e;
            }
            var y = u.sibling;
            if (y !== null) {
              y.return = u.return, M = y;
              break e;
            }
            M = u.return;
          }
        }
        if (A = l, Et(), Qe && typeof Qe.onPostCommitFiberRoot == "function") try {
          Qe.onPostCommitFiberRoot(gl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      U = n, Te.transition = t;
    }
  }
  return !1;
}
function ea(e, t, n) {
  t = mn(n, t), t = Yu(e, t, 1), e = yt(e, t, 1), t = pe(), e !== null && (ir(e, 1, t), we(e, t));
}
function G(e, t, n) {
  if (e.tag === 3) ea(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      ea(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (xt === null || !xt.has(r))) {
        e = mn(n, e), e = Xu(t, e, 1), t = yt(t, e, 1), e = pe(), t !== null && (ir(t, 1, e), we(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function bf(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = pe(), e.pingedLanes |= e.suspendedLanes & n, le === e && (ie & n) === n && (te === 4 || te === 3 && (ie & 130023424) === ie && 500 > J() - Ai ? Rt(e, 0) : Ii |= n), we(e, t);
}
function mc(e, t) {
  t === 0 && (e.mode & 1 ? (t = yr, yr <<= 1, !(yr & 130023424) && (yr = 4194304)) : t = 1);
  var n = pe();
  e = nt(e, t), e !== null && (ir(e, t, n), we(e, n));
}
function Kf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), mc(e, n);
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
      throw Error(_(314));
  }
  r !== null && r.delete(t), mc(e, n);
}
var vc;
vc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ye.current) ge = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return ge = !1, Of(e, t, n);
    ge = !!(e.flags & 131072);
  }
  else ge = !1, Q && t.flags & 1048576 && wu(t, nl, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Ur(e, t), e = t.pendingProps;
      var l = dn(t, de.current);
      an(t, n), l = Li(null, t, r, e, l, n);
      var o = $i();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, xe(r) ? (o = !0, el(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Ci(t), l.updater = jl, t.stateNode = l, l._reactInternals = t, Fo(t, r, e, n), t = Uo(null, t, r, !0, o, n)) : (t.tag = 0, Q && o && wi(t), fe(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Ur(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Gf(r), e = Re(r, e), l) {
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
        throw Error(_(
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
        if (qu(t), e === null) throw Error(_(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, Eu(e, t), ol(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = mn(Error(_(423)), t), t = Qs(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = mn(Error(_(424)), t), t = Qs(e, t, r, n, l);
          break e;
        } else for (Se = gt(t.stateNode.containerInfo.firstChild), Ne = t, Q = !0, De = null, n = ju(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
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
      return Cu(t), e === null && Ro(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Po(r, l) ? i = null : o !== null && Po(r, o) && (t.flags |= 32), Ju(e, t), fe(e, t, i, n), t.child;
    case 6:
      return e === null && Ro(t), null;
    case 13:
      return ec(e, t, n);
    case 4:
      return zi(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = pn(t, null, r, n) : fe(e, t, r, n), t.child;
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
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, B(rl, r._currentValue), r._currentValue = i, o !== null) if (Ae(o.value, i)) {
          if (o.children === l.children && !ye.current) {
            t = rt(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var u = o.dependencies;
          if (u !== null) {
            i = o.child;
            for (var a = u.firstContext; a !== null; ) {
              if (a.context === r) {
                if (o.tag === 1) {
                  a = qe(-1, n & -n), a.tag = 2;
                  var d = o.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var v = d.pending;
                    v === null ? a.next = a : (a.next = v.next, v.next = a), d.pending = a;
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
            if (i = o.return, i === null) throw Error(_(341));
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
        fe(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, an(t, n), l = Me(l), r = r(l), t.flags |= 1, fe(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Re(r, t.pendingProps), l = Re(r.type, l), Ws(e, t, r, l, n);
    case 15:
      return Gu(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Ur(e, t), t.tag = 1, xe(r) ? (e = !0, el(t)) : e = !1, an(t, n), Ku(t, r, l), Fo(t, r, l, n), Uo(null, t, r, !0, e, n);
    case 19:
      return tc(e, t, n);
    case 22:
      return Zu(e, t, n);
  }
  throw Error(_(156, t.tag));
};
function gc(e, t) {
  return Va(e, t);
}
function Xf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Pe(e, t, n, r) {
  return new Xf(e, t, n, r);
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
function kt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Pe(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Wr(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") Wi(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case bt:
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
        case _a:
          i = 10;
          break e;
        case Ea:
          i = 9;
          break e;
        case ai:
          i = 11;
          break e;
        case ui:
          i = 14;
          break e;
        case st:
          i = 16, r = null;
          break e;
      }
      throw Error(_(130, e == null ? e : typeof e, ""));
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
function Vi(e, t, n, r, l, o, i, u, a) {
  return e = new Zf(e, t, n, u, a), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Pe(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ci(o), e;
}
function Jf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Qt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function yc(e) {
  if (!e) return Nt;
  e = e._reactInternals;
  e: {
    if (Ht(e) !== e || e.tag !== 1) throw Error(_(170));
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
    throw Error(_(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (xe(n)) return yu(e, n, t);
  }
  return t;
}
function xc(e, t, n, r, l, o, i, u, a) {
  return e = Vi(n, r, !0, e, l, o, i, u, a), e.context = yc(null), n = e.current, r = pe(), l = wt(n), o = qe(r, l), o.callback = t ?? null, yt(n, o, l), e.current.lanes = l, ir(e, l, r), we(e, r), e;
}
function zl(e, t, n, r) {
  var l = t.current, o = pe(), i = wt(l);
  return n = yc(n), t.context === null ? t.context = n : t.pendingContext = n, t = qe(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = yt(l, t, i), e !== null && (Ie(e, l, i, o), Fr(e, l, i)), i;
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
var wc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function bi(e) {
  this._internalRoot = e;
}
Pl.prototype.render = bi.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(_(409));
  zl(e, t, null, null);
};
Pl.prototype.unmount = bi.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ut(function() {
      zl(null, e, null, null);
    }), t[tt] = null;
  }
};
function Pl(e) {
  this._internalRoot = e;
}
Pl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Za();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ut.length && t !== 0 && t < ut[n].priority; n++) ;
    ut.splice(n, 0, e), n === 0 && qa(e);
  }
};
function Ki(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Tl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function na() {
}
function ep(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = pl(i);
        o.call(d);
      };
    }
    var i = xc(t, r, e, 0, null, !1, !1, "", na);
    return e._reactRootContainer = i, e[tt] = i.current, Gn(e.nodeType === 8 ? e.parentNode : e), Ut(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function() {
      var d = pl(a);
      u.call(d);
    };
  }
  var a = Vi(e, 0, !1, null, null, !1, !1, "", na);
  return e._reactRootContainer = a, e[tt] = a.current, Gn(e.nodeType === 8 ? e.parentNode : e), Ut(function() {
    zl(t, a, n, r);
  }), a;
}
function Ml(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var u = l;
      l = function() {
        var a = pl(i);
        u.call(a);
      };
    }
    zl(t, i, e, l);
  } else i = ep(n, t, e, l, r);
  return pl(i);
}
Xa = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Tn(t.pendingLanes);
        n !== 0 && (fi(t, n | 1), we(t, J()), !(A & 6) && (vn = J() + 500, Et()));
      }
      break;
    case 13:
      Ut(function() {
        var r = nt(e, 1);
        if (r !== null) {
          var l = pe();
          Ie(r, e, 1, l);
        }
      }), Qi(e, 1);
  }
};
pi = function(e) {
  if (e.tag === 13) {
    var t = nt(e, 134217728);
    if (t !== null) {
      var n = pe();
      Ie(t, e, 134217728, n);
    }
    Qi(e, 134217728);
  }
};
Ga = function(e) {
  if (e.tag === 13) {
    var t = wt(e), n = nt(e, t);
    if (n !== null) {
      var r = pe();
      Ie(n, e, t, r);
    }
    Qi(e, t);
  }
};
Za = function() {
  return U;
};
Ja = function(e, t) {
  var n = U;
  try {
    return U = e, t();
  } finally {
    U = n;
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
            var l = kl(r);
            if (!l) throw Error(_(90));
            Pa(r), fo(r, l);
          }
        }
      }
      break;
    case "textarea":
      Ma(e, n);
      break;
    case "select":
      t = n.value, t != null && rn(e, !!n.multiple, t, !1);
  }
};
Ia = Ui;
Aa = Ut;
var tp = { usingClientEntryPoint: !1, Events: [ar, Gt, kl, Da, Fa, Ui] }, Cn = { findFiberByHostInstance: Mt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, np = { bundleType: Cn.bundleType, version: Cn.version, rendererPackageName: Cn.rendererPackageName, rendererConfig: Cn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ot.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ha(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Cn.findFiberByHostInstance || qf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Pr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Pr.isDisabled && Pr.supportsFiber) try {
    gl = Pr.inject(np), Qe = Pr;
  } catch {
  }
}
_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tp;
_e.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ki(t)) throw Error(_(200));
  return Jf(e, t, null, n);
};
_e.createRoot = function(e, t) {
  if (!Ki(e)) throw Error(_(299));
  var n = !1, r = "", l = wc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Vi(e, 1, !1, null, null, n, !1, r, l), e[tt] = t.current, Gn(e.nodeType === 8 ? e.parentNode : e), new bi(t);
};
_e.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(_(188)) : (e = Object.keys(e).join(","), Error(_(268, e)));
  return e = Ha(t), e = e === null ? null : e.stateNode, e;
};
_e.flushSync = function(e) {
  return Ut(e);
};
_e.hydrate = function(e, t, n) {
  if (!Tl(t)) throw Error(_(200));
  return Ml(null, e, t, !0, n);
};
_e.hydrateRoot = function(e, t, n) {
  if (!Ki(e)) throw Error(_(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = wc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = xc(t, null, e, 1, n ?? null, l, !1, o, i), e[tt] = t.current, Gn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Pl(t);
};
_e.render = function(e, t, n) {
  if (!Tl(t)) throw Error(_(200));
  return Ml(null, e, t, !1, n);
};
_e.unmountComponentAtNode = function(e) {
  if (!Tl(e)) throw Error(_(40));
  return e._reactRootContainer ? (Ut(function() {
    Ml(null, null, e, !1, function() {
      e._reactRootContainer = null, e[tt] = null;
    });
  }), !0) : !1;
};
_e.unstable_batchedUpdates = Ui;
_e.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Tl(n)) throw Error(_(200));
  if (e == null || e._reactInternals === void 0) throw Error(_(38));
  return Ml(e, t, n, !1, r);
};
_e.version = "18.3.1-next-f1338f8080-20240426";
function kc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(kc);
    } catch (e) {
      console.error(e);
    }
}
kc(), ka.exports = _e;
var rp = ka.exports, Sc, ra = rp;
Sc = ra.createRoot, ra.hydrateRoot;
function I({ name: e, className: t }) {
  return /* @__PURE__ */ s.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("ha-icon", { icon: `mdi:${e}` }) });
}
const lp = '<defs><linearGradient id="hl-mark-g" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#FFB547"/><stop offset="1" stop-color="#FF5A1F"/></linearGradient></defs><polygon points="256,62 452,222 452,446 60,446 60,222" fill="url(#hl-mark-g)" stroke="url(#hl-mark-g)" stroke-width="56" stroke-linejoin="round"/><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" fill="#fff" transform="translate(256 292) scale(10) translate(-12 -12)"/>';
function la({ size: e = 28 }) {
  return /* @__PURE__ */ s.jsx(
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
const Tr = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
], Yi = { heat: "Heating", water: "Hot water" }, lt = (e) => String((e == null ? void 0 : e.message) ?? e);
function op(e, t, n) {
  const [r, l] = L.useState(!1), [o, i] = L.useState(null);
  return { busy: r, result: o, send: async (a, d) => {
    l(!0);
    try {
      await e().callWS({ entry_id: t, channel: n, ...a }), i({ kind: "ok", text: d });
    } catch (v) {
      i({ kind: "error", text: lt(v) });
    } finally {
      l(!1);
    }
  } };
}
const Vt = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, oa = 5, ip = 30, sp = 135, Nc = 270, hl = 80, ia = (e) => Math.min(1, Math.max(0, (e - oa) / (ip - oa)));
function Jo(e) {
  const t = (sp + Nc * e) * Math.PI / 180;
  return { x: 100 + hl * Math.cos(t), y: 100 + hl * Math.sin(t) };
}
function sa(e, t) {
  const n = Jo(e), r = Jo(t), l = Nc * (t - e) > 180 ? 1 : 0;
  return `M ${n.x} ${n.y} A ${hl} ${hl} 0 ${l} 1 ${r.x} ${r.y}`;
}
function ap({
  current: e,
  target: t,
  state: n,
  caption: r
}) {
  const l = e != null ? Jo(ia(e)) : null;
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
function qo({ value: e, onChange: t }) {
  return /* @__PURE__ */ s.jsxs("div", { className: "stepper", children: [
    /* @__PURE__ */ s.jsx("button", { className: "round", onClick: () => t(e - 0.5), "aria-label": "Lower", children: /* @__PURE__ */ s.jsx(I, { name: "minus" }) }),
    /* @__PURE__ */ s.jsxs("span", { className: "stepper-value", children: [
      e.toFixed(1),
      "°"
    ] }),
    /* @__PURE__ */ s.jsx("button", { className: "round", onClick: () => t(e + 0.5), "aria-label": "Raise", children: /* @__PURE__ */ s.jsx(I, { name: "plus" }) })
  ] });
}
const up = [15, 30, 45, 60, 90, 120, 180, 240, 360];
function cp({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onSchedule: l
}) {
  return /* @__PURE__ */ s.jsx("div", { className: "grid", children: t.flatMap(
    (o) => o.channels.map((i) => {
      var u;
      return /* @__PURE__ */ s.jsx(
        dp,
        {
          getHass: e,
          device: o,
          channel: i,
          info: (u = n[o.entry_id]) == null ? void 0 : u[i],
          showDevice: t.length > 1,
          limits: r,
          onSchedule: () => l(o.entry_id, i)
        },
        `${o.entry_id}-${i}`
      );
    })
  ) });
}
const aa = {
  schedule: "calendar-clock",
  manual: "hand-back-right",
  off: "power",
  boost: "rocket-launch"
};
function dp({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  showDevice: l,
  limits: o,
  onSchedule: i
}) {
  var T;
  const u = n === "water", a = (r == null ? void 0 : r.status) ?? null, { busy: d, result: v, send: m } = op(e, t.entry_id, n), h = !!a && a.mode !== "off" && a.heating, g = !a || a.mode === "off" ? "off" : h ? "heating" : "idle", k = !u && (a == null ? void 0 : a.setpoint) != null && a.setpoint <= 1, N = u || (a == null ? void 0 : a.setpoint) == null ? null : k ? (r == null ? void 0 : r.frost_temperature) ?? null : a.setpoint, $ = [
    { id: "schedule", label: "Schedule" },
    { id: "manual", label: u ? "Always on" : "Manual" },
    { id: "off", label: "Off" }
  ], f = (r == null ? void 0 : r.boost_minutes) ?? 30, c = (r == null ? void 0 : r.boost_temperature) ?? 21, [p, y] = L.useState(!1), [j, C] = L.useState(f), [w, z] = L.useState(c);
  L.useEffect(() => C(f), [f]), L.useEffect(() => z(c), [c]);
  const [E, x] = L.useState(20), S = (a == null ? void 0 : a.mode) === "manual" && a.setpoint != null ? a.setpoint : null;
  L.useEffect(() => {
    S != null && x(S);
  }, [S]);
  const D = (o == null ? void 0 : o.boost_min_temp) ?? 5, R = (o == null ? void 0 : o.heat_max) ?? 32, V = (P) => Math.min(R, Math.max(D, Math.round(P * 2) / 2)), Ue = [.../* @__PURE__ */ new Set([...up, j])].filter((P) => P <= ((o == null ? void 0 : o.boost_max_minutes) ?? 360)).sort((P, O) => P - O), Be = (P, O) => m({ type: "hive_local/boost", minutes: P, ...u ? {} : { temperature: O } }, `Boosting for ${Vt(P)}`).then(
    () => y(!1)
  );
  let Ke = "Waiting for the receiver…";
  return a && (a.mode === "off" ? Ke = "Off" : u ? Ke = h ? "Heating water" : "Not heating" : Ke = `${h ? "Heating" : "Idle"}${N != null ? ` · ${k ? "frost" : "target"} ${N}°` : ""}`), /* @__PURE__ */ s.jsxs("section", { className: `card channel ${n} ${g}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ s.jsx(I, { name: u ? "water-boiler" : "radiator", className: "title-icon" }),
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsx("h2", { children: Yi[n] }),
          l && /* @__PURE__ */ s.jsx("div", { className: "muted small", children: t.name })
        ] })
      ] }),
      a && (a.mode === "schedule" ? /* @__PURE__ */ s.jsxs("button", { className: "chip chip-link", onClick: i, title: "Open the schedule", children: [
        /* @__PURE__ */ s.jsx(I, { name: aa.schedule }),
        " Schedule ",
        /* @__PURE__ */ s.jsx(I, { name: "chevron-right" })
      ] }) : /* @__PURE__ */ s.jsxs("span", { className: `chip mode-${a.mode}`, children: [
        /* @__PURE__ */ s.jsx(I, { name: aa[a.mode] }),
        a.mode === "boost" ? a.boost_remaining != null ? `Boost · ${Vt(a.boost_remaining)} left` : "Boost" : (T = $.find((P) => P.id === a.mode)) == null ? void 0 : T.label
      ] }))
    ] }),
    u ? /* @__PURE__ */ s.jsxs("div", { className: `water-state ${g}`, children: [
      /* @__PURE__ */ s.jsx("div", { className: "water-orb", children: /* @__PURE__ */ s.jsx(I, { name: g === "off" ? "water-boiler-off" : "water-boiler" }) }),
      /* @__PURE__ */ s.jsx("div", { className: "dial-caption", children: Ke })
    ] }) : /* @__PURE__ */ s.jsx(ap, { current: (a == null ? void 0 : a.current_temperature) ?? null, target: N, state: g, caption: Ke }),
    /* @__PURE__ */ s.jsx("div", { className: "segmented full", children: $.map((P) => /* @__PURE__ */ s.jsx(
      "button",
      {
        className: (a == null ? void 0 : a.mode) === P.id ? "on" : "",
        disabled: d || !a,
        onClick: () => m({ type: "hive_local/mode", mode: P.id }, P.id === "schedule" ? "Following the schedule" : P.label),
        children: P.label
      },
      P.id
    )) }),
    !u && (a == null ? void 0 : a.mode) === "manual" && /* @__PURE__ */ s.jsxs("div", { className: "inline-row hold-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "muted", children: "Hold at" }),
      /* @__PURE__ */ s.jsx(qo, { value: E, onChange: (P) => x(V(P)) }),
      /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
      S !== E && /* @__PURE__ */ s.jsx(
        "button",
        {
          className: "primary",
          disabled: d,
          onClick: () => m({ type: "hive_local/mode", mode: "manual", setpoint: E }, `Holding ${E}°`),
          children: "Apply"
        }
      )
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "card-actions", children: (a == null ? void 0 : a.mode) === "boost" ? /* @__PURE__ */ s.jsxs("button", { className: "boost-btn cancel", disabled: d, onClick: () => m({ type: "hive_local/cancel_boost" }, "Boost cancelled"), children: [
      /* @__PURE__ */ s.jsx(I, { name: "close" }),
      " Cancel boost"
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: "split", children: [
      /* @__PURE__ */ s.jsxs("button", { className: "boost-btn", disabled: d || !a, onClick: () => Be(f, c), children: [
        /* @__PURE__ */ s.jsx(I, { name: "rocket-launch" }),
        " Boost ",
        Vt(f),
        u ? "" : ` · ${c}°`
      ] }),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          className: `boost-btn boost-more ${p ? "on" : ""}`,
          disabled: !a,
          "aria-label": "Boost options",
          "aria-expanded": p,
          onClick: () => y(!p),
          children: /* @__PURE__ */ s.jsx(I, { name: p ? "chevron-up" : "chevron-down" })
        }
      )
    ] }) }),
    p && (a == null ? void 0 : a.mode) !== "boost" && /* @__PURE__ */ s.jsxs("div", { className: "boost-options", children: [
      /* @__PURE__ */ s.jsx("div", { className: "chips", role: "radiogroup", "aria-label": "Boost length", children: Ue.map((P) => /* @__PURE__ */ s.jsx("button", { role: "radio", "aria-checked": P === j, className: `chip-btn ${P === j ? "on" : ""}`, onClick: () => C(P), children: Vt(P) }, P)) }),
      /* @__PURE__ */ s.jsxs("div", { className: "inline-row", children: [
        !u && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          /* @__PURE__ */ s.jsx("span", { className: "muted", children: "Temperature" }),
          /* @__PURE__ */ s.jsx(qo, { value: w, onChange: (P) => z(V(P)) })
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ s.jsxs("button", { className: "primary", disabled: d, onClick: () => Be(j, w), children: [
          /* @__PURE__ */ s.jsx(I, { name: "rocket-launch" }),
          " Boost ",
          Vt(j)
        ] })
      ] })
    ] }),
    (v == null ? void 0 : v.kind) === "error" && /* @__PURE__ */ s.jsx("div", { className: "status error", children: v.text })
  ] });
}
const fp = {
  heat: { schedule: "Schedule", manual: "Manual", off: "Off", boost: "Boost" },
  water: { schedule: "Schedule", manual: "Always on", off: "Off", boost: "Boost" }
};
function pp(e, t) {
  if (!t) return "Waiting for the receiver…";
  const n = t.mode === "boost" && t.boost_remaining != null ? `Boost · ${Vt(t.boost_remaining)} left` : fp[e][t.mode] ?? t.mode;
  return e === "water" ? `${n} · ${t.heating ? "heating water" : "idle"}` : `${t.current_temperature == null ? "–" : `${t.current_temperature.toFixed(1)}°`} · ${n}${t.heating ? " · heating" : ""}`;
}
function hp({ devices: e, status: t, channel: n, onOpen: r }) {
  return /* @__PURE__ */ s.jsx("div", { className: "grid", children: e.map((l) => {
    var i, u;
    const o = (u = (i = t[l.entry_id]) == null ? void 0 : i[n]) == null ? void 0 : u.status;
    return /* @__PURE__ */ s.jsxs("button", { className: `card receiver-card ${n}`, onClick: () => r(l.entry_id), children: [
      /* @__PURE__ */ s.jsx(I, { name: n === "water" ? "water-boiler" : "radiator", className: "title-icon" }),
      /* @__PURE__ */ s.jsxs("span", { className: "receiver-text", children: [
        /* @__PURE__ */ s.jsx("span", { className: "receiver-name", children: l.name }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: pp(n, o) })
      ] }),
      (o == null ? void 0 : o.heating) && /* @__PURE__ */ s.jsx("span", { className: "dot-heating", "aria-label": "Heating" }),
      /* @__PURE__ */ s.jsx(I, { name: "chevron-right" })
    ] }, l.entry_id);
  }) });
}
const mp = 20, ml = (e) => e == null ? "–" : `${e.toFixed(1)}°`;
function vp({ getHass: e }) {
  const [t, n] = L.useState(null), [r, l] = L.useState([]), [o, i] = L.useState(null), [u, a] = L.useState("");
  return L.useEffect(() => {
    const d = e().connection.subscribeMessage(
      (v) => {
        n(v.rooms), l(v.receivers);
      },
      { type: "hive_local/rooms/subscribe" }
    );
    return d.catch((v) => a(lt(v))), () => {
      d.then((v) => v()).catch(() => {
      });
    };
  }, [e]), u ? /* @__PURE__ */ s.jsx("div", { className: "status error", children: u }) : t ? /* @__PURE__ */ s.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "rooms-head", children: [
      /* @__PURE__ */ s.jsx("p", { className: "muted", children: "Group your Hive radiator valves into rooms, on ZHA or Zigbee2MQTT. Add a temperature sensor to a room for a better reading than the valves' own." }),
      o !== "new" && /* @__PURE__ */ s.jsxs("button", { className: "primary", onClick: () => i("new"), children: [
        /* @__PURE__ */ s.jsx(I, { name: "plus" }),
        " Add room"
      ] })
    ] }),
    o === "new" && /* @__PURE__ */ s.jsx(ua, { getHass: e, onDone: () => i(null) }),
    !t.length && o !== "new" && /* @__PURE__ */ s.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ s.jsx(I, { name: "home-thermometer-outline" }),
      /* @__PURE__ */ s.jsx("p", { children: "No rooms yet. Add a room and pick its Hive radiator valves." })
    ] }),
    gp(t, r).map(([d, v]) => /* @__PURE__ */ s.jsxs("section", { className: "zone", children: [
      d && /* @__PURE__ */ s.jsx("h3", { children: d }),
      /* @__PURE__ */ s.jsx("div", { className: "grid", children: v.map(
        (m) => o !== "new" && (o == null ? void 0 : o.id) === m.id ? /* @__PURE__ */ s.jsx(ua, { getHass: e, room: m, onDone: () => i(null) }, m.id) : /* @__PURE__ */ s.jsx(yp, { getHass: e, room: m, onEdit: () => i(m) }, m.id)
      ) })
    ] }, d ?? "all"))
  ] }) : null;
}
function gp(e, t) {
  if (t.length <= 1) return e.length ? [[null, e]] : [];
  const n = t.map((l) => [`Heated by ${l.name}`, e.filter((o) => o.receiver === l.entry_id)]).filter(([, l]) => l.length), r = e.filter((l) => !t.some((o) => o.entry_id === l.receiver));
  return r.length && n.push(["Receiver not set", r]), n;
}
function yp({ getHass: e, room: t, onEdit: n }) {
  var m;
  const [r, l] = L.useState(null), [o, i] = L.useState(null), u = L.useRef(), a = r ?? t.target ?? ((m = t.target_range) == null ? void 0 : m[1]) ?? 20, d = (h) => {
    const g = Math.min(35, Math.max(5, h));
    l(g), i(null), window.clearTimeout(u.current), u.current = window.setTimeout(async () => {
      try {
        const k = await e().callWS({
          type: "hive_local/rooms/set_target",
          room_id: t.id,
          temperature: g
        });
        if (k.failed.length) {
          const N = t.valve_states.filter(($) => k.failed.includes($.entity_id)).map(($) => $.name);
          i({ kind: "error", text: `Didn't take on ${N.join(", ")}. It may be asleep; try again shortly.` });
        }
      } catch (k) {
        i({ kind: "error", text: lt(k) });
      } finally {
        l(null);
      }
    }, 700);
  }, v = t.temperature_source === "sensor" ? t.sensor_name : t.temperature_source === "valves" ? t.valve_states.filter((h) => h.available).length === 1 ? "From the valve" : "Average of the valves" : "No reading";
  return /* @__PURE__ */ s.jsxs("section", { className: `card room ${t.heating ? "heating" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ s.jsx(I, { name: "home-thermometer-outline", className: "title-icon" }),
        /* @__PURE__ */ s.jsx("h2", { children: t.name })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "chips", children: [
        t.heating ? /* @__PURE__ */ s.jsxs("span", { className: "chip heating", children: [
          /* @__PURE__ */ s.jsx(I, { name: "fire" }),
          " Heating"
        ] }) : /* @__PURE__ */ s.jsx("span", { className: "chip", children: "Idle" }),
        /* @__PURE__ */ s.jsx("button", { className: "ghost round", onClick: n, "aria-label": `Edit ${t.name}`, children: /* @__PURE__ */ s.jsx(I, { name: "pencil-outline" }) })
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
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: t.target_range && r == null ? `Valves set to ${ml(t.target_range[0])}–${ml(t.target_range[1])}` : "Target" }),
        /* @__PURE__ */ s.jsx(qo, { value: a, onChange: d })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("ul", { className: "valves", children: t.valve_states.map((h) => /* @__PURE__ */ s.jsx(xp, { valve: h, heating: t.heating_valves.includes(h.entity_id) }, h.entity_id)) }),
    o && /* @__PURE__ */ s.jsx("div", { className: `status ${o.kind}`, children: o.text })
  ] });
}
function xp({ valve: e, heating: t }) {
  const n = e.battery == null ? null : Number(e.battery), r = n != null && !Number.isNaN(n) && n <= mp;
  return /* @__PURE__ */ s.jsxs("li", { className: `valve ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ s.jsx(I, { name: t ? "fire" : "radiator", className: t ? "valve-icon heating" : "valve-icon" }),
    /* @__PURE__ */ s.jsx("span", { className: "valve-name", children: e.name }),
    e.available ? /* @__PURE__ */ s.jsxs("span", { className: "valve-temps", children: [
      ml(e.current_temperature),
      " ",
      /* @__PURE__ */ s.jsxs("span", { className: "muted", children: [
        "→ ",
        ml(e.target)
      ] })
    ] }) : /* @__PURE__ */ s.jsx("span", { className: "chip", children: "Unavailable" }),
    n != null && !Number.isNaN(n) && /* @__PURE__ */ s.jsxs("span", { className: `battery ${r ? "low" : ""}`, title: r ? "Battery low" : "Battery", children: [
      /* @__PURE__ */ s.jsx(I, { name: r ? "battery-alert-variant-outline" : "battery-outline" }),
      " ",
      Math.round(n),
      "%"
    ] })
  ] });
}
function ua({ getHass: e, room: t, onDone: n }) {
  const [r, l] = L.useState(null), [o, i] = L.useState((t == null ? void 0 : t.receiver) ?? ""), [u, a] = L.useState((t == null ? void 0 : t.name) ?? ""), [d, v] = L.useState(new Set((t == null ? void 0 : t.valves) ?? [])), [m, h] = L.useState((t == null ? void 0 : t.sensor) ?? ""), [g, k] = L.useState(!1), [N, $] = L.useState(!1), [f, c] = L.useState("");
  L.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/candidates" }).then(l).catch((w) => c(lt(w)));
  }, [e]);
  const p = ((r == null ? void 0 : r.receivers.length) ?? 0) > 1, y = async (w) => {
    k(!0), c("");
    try {
      await e().callWS(w), n();
    } catch (z) {
      c(lt(z)), k(!1);
    }
  }, j = (w) => v((z) => {
    const E = new Set(z);
    return E.has(w) ? E.delete(w) : E.add(w), E;
  }), C = /* @__PURE__ */ new Map();
  for (const w of (r == null ? void 0 : r.valves) ?? []) C.set(w.area ?? "No area", [...C.get(w.area ?? "No area") ?? [], w]);
  return /* @__PURE__ */ s.jsxs("section", { className: "card room-editor", children: [
    /* @__PURE__ */ s.jsx("h2", { children: t ? `Edit ${t.name}` : "New room" }),
    /* @__PURE__ */ s.jsxs(
      "form",
      {
        className: "stack",
        onSubmit: (w) => {
          w.preventDefault(), y({
            type: "hive_local/rooms/save",
            ...t ? { room_id: t.id } : {},
            name: u,
            valves: [...d],
            sensor: m || null,
            receiver: o || null
          });
        },
        children: [
          /* @__PURE__ */ s.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ s.jsx("span", { children: "Name" }),
            /* @__PURE__ */ s.jsx("input", { id: `room-name-${(t == null ? void 0 : t.id) ?? "new"}`, type: "text", value: u, maxLength: 40, placeholder: "Lounge", onChange: (w) => a(w.target.value) })
          ] }),
          /* @__PURE__ */ s.jsxs("fieldset", { className: "field", children: [
            /* @__PURE__ */ s.jsx("legend", { children: "Hive radiator valves" }),
            !r && !f && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Loading…" }),
            r && !r.valves.length && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "No Hive radiator valves found. Pair them with ZHA or Zigbee2MQTT first." }),
            [...C].map(([w, z]) => /* @__PURE__ */ s.jsxs("div", { className: "checklist", children: [
              /* @__PURE__ */ s.jsx("span", { className: "muted small", children: w }),
              z.map((E) => /* @__PURE__ */ s.jsxs("label", { className: "pick", children: [
                /* @__PURE__ */ s.jsx("input", { type: "checkbox", checked: d.has(E.entity_id), onChange: () => j(E.entity_id) }),
                " ",
                E.name
              ] }, E.entity_id))
            ] }, w))
          ] }),
          /* @__PURE__ */ s.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ s.jsx("span", { children: "Room temperature from" }),
            /* @__PURE__ */ s.jsxs("select", { id: `room-sensor-${(t == null ? void 0 : t.id) ?? "new"}`, value: m, onChange: (w) => h(w.target.value), children: [
              /* @__PURE__ */ s.jsx("option", { value: "", children: "The valves (their average)" }),
              ((r == null ? void 0 : r.sensors) ?? []).map((w) => /* @__PURE__ */ s.jsxs("option", { value: w.entity_id, children: [
                w.name,
                w.area ? ` · ${w.area}` : ""
              ] }, w.entity_id))
            ] })
          ] }),
          p && /* @__PURE__ */ s.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ s.jsx("span", { children: "Heated by" }),
            /* @__PURE__ */ s.jsxs("select", { id: `room-receiver-${(t == null ? void 0 : t.id) ?? "new"}`, value: o, onChange: (w) => i(w.target.value), children: [
              /* @__PURE__ */ s.jsx("option", { value: "", disabled: !0, children: "Choose the receiver for this room's radiators" }),
              r.receivers.map((w) => /* @__PURE__ */ s.jsx("option", { value: w.entry_id, children: w.name }, w.entry_id))
            ] })
          ] }),
          f && /* @__PURE__ */ s.jsx("div", { className: "status error", children: f }),
          /* @__PURE__ */ s.jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ s.jsx("button", { className: "primary", type: "submit", disabled: g || !u.trim() || !d.size || p && !o, children: t ? "Save" : "Add room" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "ghost", onClick: n, disabled: g, children: "Cancel" }),
            /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
            t && (N ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsxs("span", { className: "muted small", children: [
                "Delete ",
                t.name,
                "? The valves aren't changed."
              ] }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "danger", disabled: g, onClick: () => y({ type: "hive_local/rooms/delete", room_id: t.id }), children: "Delete" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "ghost", onClick: () => $(!1), children: "Keep" })
            ] }) : /* @__PURE__ */ s.jsxs("button", { type: "button", className: "danger", onClick: () => $(!0), disabled: g, children: [
              /* @__PURE__ */ s.jsx(I, { name: "delete-outline" }),
              " Delete room"
            ] }))
          ] })
        ]
      }
    )
  ] });
}
const wp = ["monday", "tuesday", "wednesday", "thursday", "friday"], kp = ["saturday", "sunday"], Sp = (e) => e[0].toUpperCase() + e.slice(1, 3), pt = (e) => {
  const [t, n] = e.split(":").map(Number);
  return t * 60 + n;
};
function Np({
  getHass: e,
  device: t,
  channel: n,
  limits: r
}) {
  const [l, o] = L.useState({}), [i, u] = L.useState({}), [a, d] = L.useState("monday"), [v, m] = L.useState({ kind: "idle" }), h = t.entry_id, g = n === "water", k = JSON.stringify(l) !== JSON.stringify(i), N = L.useCallback(async () => {
    m({ kind: "busy", text: "Reading from receiver…" });
    try {
      const x = await e().callWS({
        type: "hive_local/get",
        entry_id: h,
        channel: n
      });
      o(x.schedule), u(x.schedule);
      const S = Object.keys(x.schedule).length;
      m(
        x.complete ? { kind: "ok", text: "Schedule read from receiver" } : S ? { kind: "error", text: `Only got ${S}/7 days — try reading again` } : { kind: "error", text: "No reply. On Zigbee2MQTT, check the receiver's friendly name; on ZHA, check the receiver is online." }
      );
    } catch (x) {
      m({ kind: "error", text: lt(x) });
    }
  }, [h, n, e]);
  L.useEffect(() => {
    N();
  }, [N]);
  const $ = async () => {
    const x = Object.fromEntries(
      Tr.filter((S) => {
        var D;
        return JSON.stringify(l[S]) !== JSON.stringify(i[S]) && ((D = l[S]) == null ? void 0 : D.length);
      }).map((S) => [S, l[S]])
    );
    if (Object.keys(x).length) {
      m({ kind: "busy", text: "Writing to receiver…" });
      try {
        const S = await e().callWS({
          type: "hive_local/set",
          entry_id: h,
          channel: n,
          schedule: x
        }), D = { ...l, ...S.schedule };
        o(D), u(D);
        const R = Object.keys(S.schedule).map((V) => V[0].toUpperCase() + V.slice(1, 3));
        m({
          kind: "ok",
          text: `Wrote ${R.join(", ")}. Read back to confirm the receiver kept it.`
        });
      } catch (S) {
        m({ kind: "error", text: lt(S) });
      }
    }
  }, f = l[a] ?? [], c = r.max_transitions, p = (x) => o((S) => ({ ...S, [a]: [...x].sort((D, R) => pt(D.time) - pt(R.time)) })), y = () => {
    const x = f[f.length - 1], S = x ? jp(f, pt(x.time) + 60) : "06:00", D = g ? r.water_on : (x == null ? void 0 : x.setpoint) ?? 20;
    p([...f, { time: S, setpoint: D }]);
  }, j = (x) => o((S) => {
    const D = { ...S };
    for (const R of x) D[R] = f.map((V) => ({ ...V }));
    return D;
  }), C = L.useMemo(() => {
    const x = Object.values(l).flat().map((S) => S.setpoint).filter((S) => S > r.heat_min);
    return { lo: Math.min(15, ...x), hi: Math.max(24, ...x) };
  }, [l, r.heat_min]), w = Tr[((/* @__PURE__ */ new Date()).getDay() + 6) % 7], z = _p();
  return /* @__PURE__ */ s.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ s.jsxs("section", { className: `card ${n}`, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "title", children: [
          /* @__PURE__ */ s.jsx(I, { name: g ? "water-boiler" : "radiator", className: "title-icon" }),
          /* @__PURE__ */ s.jsxs("div", { children: [
            /* @__PURE__ */ s.jsx("h2", { children: g ? "Hot water schedule" : "Heating schedule" }),
            /* @__PURE__ */ s.jsx("div", { className: "muted small", children: "Stored on the receiver, so it keeps running without HA." })
          ] })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "toolbar", children: [
          k && /* @__PURE__ */ s.jsx("span", { className: "chip unsaved", children: "Unsaved changes" }),
          /* @__PURE__ */ s.jsxs("button", { onClick: N, disabled: v.kind === "busy", children: [
            /* @__PURE__ */ s.jsx(I, { name: "download" }),
            " Read"
          ] }),
          /* @__PURE__ */ s.jsxs("button", { className: "primary", onClick: $, disabled: !k || v.kind === "busy", children: [
            /* @__PURE__ */ s.jsx(I, { name: "upload" }),
            " Write to receiver"
          ] })
        ] })
      ] }),
      v.text && /* @__PURE__ */ s.jsx("div", { className: `status ${v.kind}`, children: v.text }),
      /* @__PURE__ */ s.jsxs("div", { className: "week", children: [
        Tr.map((x) => /* @__PURE__ */ s.jsxs("button", { className: `row ${x === a ? "selected" : ""}`, onClick: () => d(x), children: [
          /* @__PURE__ */ s.jsx("span", { className: `day ${x === w ? "today" : ""}`, children: Sp(x) }),
          /* @__PURE__ */ s.jsx(
            Ep,
            {
              transitions: l[x],
              isWater: g,
              limits: r,
              range: C,
              now: x === w ? z : null
            }
          )
        ] }, x)),
        /* @__PURE__ */ s.jsxs("div", { className: "row hours-row", children: [
          /* @__PURE__ */ s.jsx("span", { className: "day" }),
          /* @__PURE__ */ s.jsx("div", { className: "hours", children: [0, 3, 6, 9, 12, 15, 18, 21, 24].map((x) => /* @__PURE__ */ s.jsx("span", { style: { left: `${x / 24 * 100}%` }, children: String(x).padStart(2, "0") }, x)) })
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
        /* @__PURE__ */ s.jsx("h2", { children: a[0].toUpperCase() + a.slice(1) }),
        /* @__PURE__ */ s.jsxs("span", { className: "chip", children: [
          f.length,
          "/",
          c,
          " events"
        ] })
      ] }),
      f.length === 0 && /* @__PURE__ */ s.jsx("p", { className: "muted", children: "No events for this day yet." }),
      /* @__PURE__ */ s.jsx("div", { className: "events", children: f.map((x, S) => /* @__PURE__ */ s.jsxs("div", { className: "transition", children: [
        /* @__PURE__ */ s.jsx(
          "span",
          {
            className: "swatch",
            style: { background: g ? x.setpoint >= r.water_on ? "var(--hl-water)" : "var(--hl-off-fill)" : jc(x.setpoint, C, r) }
          }
        ),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            type: "time",
            value: x.time,
            onChange: (D) => p(f.map((R, V) => V === S ? { ...R, time: D.target.value } : R))
          }
        ),
        g ? /* @__PURE__ */ s.jsxs("div", { className: "segmented", children: [
          ["on", "off"].map((D) => {
            const R = D === "on" ? r.water_on : r.water_off;
            return /* @__PURE__ */ s.jsx(
              "button",
              {
                className: x.setpoint === R ? "on" : "",
                onClick: () => p(f.map((V, Ue) => Ue === S ? { ...V, setpoint: R } : V)),
                children: D === "on" ? "On" : "Off"
              },
              D
            );
          }),
          x.setpoint !== r.water_on && x.setpoint !== r.water_off && /* @__PURE__ */ s.jsxs("span", { className: "muted raw", title: "Value read from the receiver doesn't match WATER_ON/WATER_OFF in const.py", children: [
            x.setpoint,
            "°?"
          ] })
        ] }) : /* @__PURE__ */ s.jsxs("div", { className: "stepper", children: [
          /* @__PURE__ */ s.jsx("button", { className: "round", onClick: () => E(S, -0.5), "aria-label": "Lower", children: /* @__PURE__ */ s.jsx(I, { name: "minus" }) }),
          /* @__PURE__ */ s.jsx("span", { className: "stepper-value", children: x.setpoint <= r.heat_min ? "Off" : `${x.setpoint.toFixed(1)}°` }),
          /* @__PURE__ */ s.jsx("button", { className: "round", onClick: () => E(S, 0.5), "aria-label": "Raise", children: /* @__PURE__ */ s.jsx(I, { name: "plus" }) })
        ] }),
        /* @__PURE__ */ s.jsx("button", { className: "round danger", onClick: () => p(f.filter((D, R) => R !== S)), "aria-label": "Remove", children: /* @__PURE__ */ s.jsx(I, { name: "delete-outline" }) })
      ] }, S)) }),
      /* @__PURE__ */ s.jsxs("div", { className: "actions", children: [
        /* @__PURE__ */ s.jsxs("button", { onClick: y, disabled: f.length >= c, children: [
          /* @__PURE__ */ s.jsx(I, { name: "plus" }),
          " Add event"
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Copy this day to" }),
        /* @__PURE__ */ s.jsxs("div", { className: "segmented", children: [
          /* @__PURE__ */ s.jsx("button", { onClick: () => j(wp), disabled: !f.length, children: "Weekdays" }),
          /* @__PURE__ */ s.jsx("button", { onClick: () => j(kp), disabled: !f.length, children: "Weekend" }),
          /* @__PURE__ */ s.jsx("button", { onClick: () => j([...Tr]), disabled: !f.length, children: "All" })
        ] })
      ] })
    ] })
  ] });
  function E(x, S) {
    p(
      f.map(
        (D, R) => R === x ? { ...D, setpoint: Math.min(r.heat_max, Math.max(r.heat_min, Math.round((D.setpoint + S) * 2) / 2)) } : D
      )
    );
  }
}
function jp(e, t) {
  const n = new Set(e.map((l) => pt(l.time)));
  let r = Math.min(t, 23 * 60 + 30);
  for (; n.has(r) && r < 1439; ) r += 15;
  return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function _p() {
  const e = () => {
    const r = /* @__PURE__ */ new Date();
    return r.getHours() * 60 + r.getMinutes();
  }, [t, n] = L.useState(e);
  return L.useEffect(() => {
    const r = setInterval(() => n(e()), 6e4);
    return () => clearInterval(r);
  }, []), t;
}
function jc(e, t, n) {
  if (e <= n.heat_min) return "var(--hl-off-fill)";
  const r = Math.min(1, Math.max(0, (e - t.lo) / Math.max(1, t.hi - t.lo)));
  return `hsl(${Math.round(42 - 34 * r)} ${Math.round(88 + 4 * r)}% ${Math.round(64 - 14 * r)}%)`;
}
function Ep({
  transitions: e,
  isWater: t,
  limits: n,
  range: r,
  now: l
}) {
  const o = l != null && /* @__PURE__ */ s.jsx("i", { className: "now", style: { left: `${l / 1440 * 100}%` } });
  if (!(e != null && e.length)) return /* @__PURE__ */ s.jsx("div", { className: "timeline empty", children: o });
  const i = [...e].sort((a, d) => pt(a.time) - pt(d.time)), u = [{ time: "00:00", setpoint: i[i.length - 1].setpoint }, ...i];
  return /* @__PURE__ */ s.jsxs("div", { className: "timeline", children: [
    u.map((a, d) => {
      const v = pt(a.time), m = d + 1 < u.length ? pt(u[d + 1].time) : 1440;
      if (m <= v) return null;
      const h = t ? a.setpoint < n.water_on : a.setpoint <= n.heat_min;
      return /* @__PURE__ */ s.jsx(
        "span",
        {
          className: h ? "off" : "",
          title: `${a.time} → ${t ? h ? "Off" : "On" : h ? "Off" : `${a.setpoint}°`}`,
          style: {
            left: `${v / 1440 * 100}%`,
            width: `${(m - v) / 1440 * 100}%`,
            background: h ? void 0 : t ? "var(--hl-water)" : jc(a.setpoint, r, n)
          },
          children: !t && !h && m - v >= 120 ? `${a.setpoint}°` : ""
        },
        d
      );
    }),
    o
  ] });
}
const Cp = [
  { id: 1, label: "Today" },
  { id: 7, label: "7 days" },
  { id: 30, label: "30 days" }
], zp = {
  1: "yesterday by this time",
  7: "the 7 days before",
  30: "the 30 days before"
}, Pp = 5 * 6e4, Ge = (e) => {
  const t = Math.round(e);
  return t < 60 ? `${t}m` : t % 60 ? `${Math.floor(t / 60)}h ${t % 60}m` : `${t / 60}h`;
}, Ln = (e) => new Date(e * 1e3).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), _c = (e) => new Date(e * 1e3).toLocaleDateString([], { weekday: "short" }), Ec = (e) => new Date(e * 1e3).toLocaleDateString([], { day: "numeric", month: "short" }), Cc = (e) => new Date(e * 1e3).toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });
function Tp({ getHass: e, devices: t }) {
  const [n, r] = L.useState(7);
  return /* @__PURE__ */ s.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "rooms-head", children: [
      /* @__PURE__ */ s.jsx("p", { className: "muted", children: "How long the boiler ran, how often it fired up and how warm it was, from Home Assistant's history." }),
      /* @__PURE__ */ s.jsx("div", { className: "segmented", role: "radiogroup", "aria-label": "Period", children: Cp.map((l) => /* @__PURE__ */ s.jsx("button", { role: "radio", "aria-checked": l.id === n, className: l.id === n ? "on" : "", onClick: () => r(l.id), children: l.label }, l.id)) })
    ] }),
    t.flatMap(
      (l) => l.channels.map((o) => /* @__PURE__ */ s.jsx(Mp, { getHass: e, device: l, channel: o, period: n, showDevice: t.length > 1 }, `${l.entry_id}-${o}`))
    )
  ] });
}
function Mp({
  getHass: e,
  device: t,
  channel: n,
  period: r,
  showDevice: l
}) {
  const [o, i] = L.useState(null), [u, a] = L.useState(""), [d, v] = L.useState(!0), m = n === "water", h = L.useCallback(() => {
    e().callWS({ type: "hive_local/stats", entry_id: t.entry_id, channel: n, days: r }).then((k) => {
      i(k), a("");
    }).catch((k) => a(lt(k))).finally(() => v(!1));
  }, [e, t.entry_id, n, r]);
  L.useEffect(() => {
    v(!0), i(null), h();
    const k = setInterval(h, Pp);
    return () => clearInterval(k);
  }, [h]);
  const g = (o == null ? void 0 : o.period) === r ? o : null;
  return /* @__PURE__ */ s.jsxs("section", { className: `card stats ${n}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ s.jsx(I, { name: m ? "water-boiler" : "radiator", className: "title-icon" }),
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsx("h2", { children: Yi[n] }),
          l && /* @__PURE__ */ s.jsx("div", { className: "muted small", children: t.name })
        ] })
      ] }),
      d && /* @__PURE__ */ s.jsx("span", { className: "chip", children: "Loading…" })
    ] }),
    u && /* @__PURE__ */ s.jsx("div", { className: "status error", children: u }),
    g && !g.has_data && /* @__PURE__ */ s.jsxs("div", { className: "status", children: [
      "No history for ",
      /* @__PURE__ */ s.jsx("code", { children: g.entity_id }),
      " in this period yet. Stats build up as Home Assistant records the receiver."
    ] }),
    (g == null ? void 0 : g.has_data) && /* @__PURE__ */ s.jsx(Lp, { data: g, water: m })
  ] });
}
function Lp({ data: e, water: t }) {
  const n = (e.end - e.start) / 60, r = e.previous, l = !!(r != null && r.has_data) && r.known_minutes >= 0.5 * e.known_minutes, o = l ? e.heating_minutes - r.heating_minutes : 0, i = e.known_minutes ? e.heating_minutes / e.known_minutes : 0, u = e.temperature, a = t ? "Hot water on" : "Boiler on";
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsxs("div", { className: "kpis", children: [
      /* @__PURE__ */ s.jsx(Mr, { label: a, value: Ge(e.heating_minutes), children: l ? /* @__PURE__ */ s.jsxs("span", { className: "delta", children: [
        /* @__PURE__ */ s.jsx(I, { name: Math.abs(o) < 1 ? "approximately-equal" : o > 0 ? "arrow-up" : "arrow-down" }),
        Math.abs(o) < 1 ? "Same as" : `${Ge(Math.abs(o))} ${o > 0 ? "more" : "less"} than`,
        " ",
        zp[e.period]
      ] }) : `${Math.round(i * 100)}% of the time` }),
      /* @__PURE__ */ s.jsx(Mr, { label: "Times it fired up", value: String(e.cycles), children: e.cycles ? `About ${Ge(e.heating_minutes / e.cycles)} each` : "Not at all" }),
      !t && /* @__PURE__ */ s.jsxs(Mr, { label: "Average temperature", value: u.avg != null ? `${u.avg.toFixed(1)}°` : "–", children: [
        u.min != null && u.max != null ? `${u.min.toFixed(1)}° to ${u.max.toFixed(1)}°` : "No readings",
        e.target_avg != null && ` · target ${e.target_avg.toFixed(1)}°`
      ] }),
      /* @__PURE__ */ s.jsx(Mr, { label: "Boosts", value: String(e.boosts), children: e.mode_minutes.boost ? `${Ge(e.mode_minutes.boost)} boosting` : "None" })
    ] }),
    e.known_minutes < 0.9 * n && /* @__PURE__ */ s.jsxs("div", { className: "status small", children: [
      "History covers ",
      Ge(e.known_minutes),
      " of this period. Home Assistant's recorder keeps 10 days unless",
      " ",
      /* @__PURE__ */ s.jsx("code", { children: "purge_keep_days" }),
      " is raised, and nothing is recorded while the receiver is unavailable."
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "stats-block", children: [
      /* @__PURE__ */ s.jsx("h3", { children: t ? "When it was on" : "Temperature and heating" }),
      /* @__PURE__ */ s.jsx(Dp, { series: e.series, period: e.period, now: e.end, water: t })
    ] }),
    e.period > 1 && /* @__PURE__ */ s.jsxs("div", { className: "stats-block", children: [
      /* @__PURE__ */ s.jsx("h3", { children: t ? "On per day" : "Boiler on per day" }),
      /* @__PURE__ */ s.jsx(Fp, { days: e.days, period: e.period, water: t })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "stats-block", children: [
      /* @__PURE__ */ s.jsx("h3", { children: "Time in each mode" }),
      /* @__PURE__ */ s.jsx(Ip, { minutes: e.mode_minutes, total: e.known_minutes, water: t })
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
  const e = L.useRef(null), [t, n] = L.useState(0);
  return L.useLayoutEffect(() => {
    const r = e.current;
    if (!r) return;
    n(r.clientWidth);
    const l = new ResizeObserver(([o]) => n(o.contentRect.width));
    return l.observe(r), () => l.disconnect();
  }, []), [e, t];
}
const X = { left: 34, right: 10, top: 10 };
function $p(e, t, n) {
  return n === 1 ? `${Ln(e.t)}–${Ln(e.t + t)}` : `${Cc(e.t)}, ${Ln(e.t)}–${Ln(e.t + t)}`;
}
function Rp(e, t, n) {
  const r = [];
  if (n === 1) {
    for (let i = 0; i <= 24; i += 6) r.push({ t: e + i * 3600, label: i === 24 ? "" : Ln(e + i * 3600) });
    return r;
  }
  const l = Math.round((t - e) / 86400), o = n === 7 ? 1 : 5;
  for (let i = 0; i < l; i += o) {
    const u = e + i * 86400;
    r.push({ t: u, label: n === 7 ? _c(u) : Ec(u) });
  }
  return r;
}
function Op(e) {
  if (!e.length) return [15, 25, 2];
  let t = Math.floor(Math.min(...e) - 0.5), n = Math.ceil(Math.max(...e) + 0.5);
  if (n - t < 4) {
    const l = (n + t) / 2;
    t = Math.floor(l - 2), n = Math.ceil(l + 2);
  }
  const r = n - t > 10 ? 4 : n - t > 5 ? 2 : 1;
  return t = Math.floor(t / r) * r, n = Math.ceil(n / r) * r, [t, n, r];
}
function Dp({ series: e, period: t, now: n, water: r }) {
  const [l, o] = zc(), [i, u] = L.useState(null);
  if (!e.length) return null;
  const a = e.length > 1 ? e[1].t - e[0].t : 3600, d = e[0].t, v = e[e.length - 1].t + a, m = r ? 0 : 170, h = X.top + m + (r ? 0 : 10), g = r ? 36 : 14, k = h + g + 24, N = Math.max(0, o - X.left - X.right), $ = (S) => X.left + (S - d) / (v - d) * N, f = r ? [] : e.flatMap((S) => [S.current, S.target]).filter((S) => S != null), [c, p, y] = Op(f), j = (S) => X.top + m - (S - c) / (p - c) * m, C = [];
  for (let S = c; S <= p; S += y) C.push(S);
  const w = (S, D) => {
    let R = "", V = !1;
    return e.forEach((Ue) => {
      const Be = S(Ue);
      if (Be == null) {
        V = !1;
        return;
      }
      D ? R += `${V ? "L" : "M"}${$(Ue.t)},${j(Be)}H${$(Ue.t + a)}` : R += `${V ? "L" : "M"}${$(Ue.t + a / 2)},${j(Be)}`, V = !0;
    }), R;
  }, z = (S) => {
    const D = S.currentTarget.getBoundingClientRect(), R = d + (S.clientX - D.left - X.left) / N * (v - d), V = Math.floor((R - d) / a);
    u(V >= 0 && V < e.length ? V : null);
  }, E = i != null ? e[i] : null, x = r ? "var(--hl-water)" : "var(--hl-heat)";
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
        height: k,
        onPointerMove: z,
        onPointerLeave: () => u(null),
        role: "img",
        "aria-label": r ? "When hot water was on" : "Temperature, target and heating over time",
        children: [
          !r && C.map((S) => /* @__PURE__ */ s.jsxs("g", { children: [
            /* @__PURE__ */ s.jsx("line", { className: "grid-line", x1: X.left, x2: X.left + N, y1: j(S), y2: j(S) }),
            /* @__PURE__ */ s.jsxs("text", { className: "axis", x: X.left - 6, y: j(S) + 4, textAnchor: "end", children: [
              S,
              "°"
            ] })
          ] }, S)),
          Rp(d, v, t).map(({ t: S, label: D }) => /* @__PURE__ */ s.jsxs("g", { children: [
            /* @__PURE__ */ s.jsx("line", { className: "grid-line", x1: $(S), x2: $(S), y1: X.top, y2: h + g }),
            D && /* @__PURE__ */ s.jsx("text", { className: "axis", x: $(S) + 3, y: h + g + 16, children: D })
          ] }, S)),
          /* @__PURE__ */ s.jsx("rect", { className: "strip-bg", x: X.left, y: h, width: N, height: g, rx: 4 }),
          e.map(
            (S) => S.heating ? /* @__PURE__ */ s.jsx(
              "rect",
              {
                x: Math.floor($(S.t)),
                y: h,
                width: Math.max(1, Math.ceil($(S.t + a)) - Math.floor($(S.t))),
                height: g,
                fill: x,
                opacity: 0.2 + 0.8 * S.heating
              },
              S.t
            ) : null
          ),
          r && /* @__PURE__ */ s.jsx("text", { className: "axis", x: X.left - 6, y: h + g / 2 + 4, textAnchor: "end", children: "On" }),
          !r && /* @__PURE__ */ s.jsx("path", { className: "target-line", d: w((S) => S.target, !0) }),
          !r && /* @__PURE__ */ s.jsx("path", { className: "temp-line", d: w((S) => S.current, !1) }),
          n < v && /* @__PURE__ */ s.jsx("line", { className: "now-line", x1: $(n), x2: $(n), y1: X.top, y2: h + g }),
          E && /* @__PURE__ */ s.jsxs("g", { className: "crosshair", children: [
            /* @__PURE__ */ s.jsx("line", { x1: $(E.t + a / 2), x2: $(E.t + a / 2), y1: X.top, y2: h + g }),
            !r && E.current != null && /* @__PURE__ */ s.jsx("circle", { cx: $(E.t + a / 2), cy: j(E.current), r: 4.5 })
          ] })
        ]
      }
    ),
    E && /* @__PURE__ */ s.jsxs("div", { className: "tooltip", style: { left: Math.min(Math.max($(E.t + a / 2), 90), o - 90) }, children: [
      /* @__PURE__ */ s.jsx("div", { className: "tooltip-title", children: $p(E, a, t) }),
      E.heating == null ? /* @__PURE__ */ s.jsx("div", { children: "No data" }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        !r && /* @__PURE__ */ s.jsxs("div", { children: [
          "Temperature ",
          /* @__PURE__ */ s.jsx("b", { children: E.current != null ? `${E.current.toFixed(1)}°` : "–" })
        ] }),
        !r && /* @__PURE__ */ s.jsxs("div", { children: [
          "Target ",
          /* @__PURE__ */ s.jsx("b", { children: E.target != null ? `${E.target.toFixed(1)}°` : "Off" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { children: [
          r ? "On" : "Heating",
          " ",
          /* @__PURE__ */ s.jsx("b", { children: Ge(E.heating * a / 60) })
        ] })
      ] })
    ] })
  ] });
}
function Fp({ days: e, period: t, water: n }) {
  const [r, l] = zc(), [o, i] = L.useState(null), u = 150, a = 112, d = 8, v = Math.max(0, l - X.left - X.right), m = Math.max(60, ...e.map((p) => p.heating_minutes ?? 0)), h = m > 12 * 60 ? 240 : m > 6 * 60 ? 120 : m > 3 * 60 ? 60 : 30, g = Math.ceil(m / h) * h, k = (p) => d + a - p / g * a, N = v / e.length, $ = Math.min(8, Math.max(2, N * 0.25)), f = [];
  for (let p = 0; p <= g; p += h) f.push(p);
  const c = o != null ? e[o] : null;
  return /* @__PURE__ */ s.jsxs("div", { className: "chart", ref: r, children: [
    l > 0 && /* @__PURE__ */ s.jsxs("svg", { width: l, height: u, role: "img", "aria-label": n ? "Hot water on per day" : "Boiler on per day", onPointerLeave: () => i(null), children: [
      f.map((p) => /* @__PURE__ */ s.jsxs("g", { children: [
        /* @__PURE__ */ s.jsx("line", { className: p ? "grid-line" : "baseline", x1: X.left, x2: X.left + v, y1: k(p), y2: k(p) }),
        /* @__PURE__ */ s.jsx("text", { className: "axis", x: X.left - 6, y: k(p) + 4, textAnchor: "end", children: p ? `${p / 60}h` : "0" })
      ] }, p)),
      e.map((p, y) => {
        const j = Math.max(1, Math.min(44, N - $)), C = X.left + y * N + (N - j) / 2, w = p.heating_minutes ?? 0, z = k(w), E = d + a - z, x = Math.min(4, j / 2, E), S = t === 7 || y % 5 === 0;
        return /* @__PURE__ */ s.jsxs("g", { onPointerEnter: () => i(y), children: [
          /* @__PURE__ */ s.jsx("rect", { x: X.left + y * N, y: d, width: N, height: a, fill: "transparent" }),
          E > 0 && /* @__PURE__ */ s.jsx(
            "path",
            {
              className: `bar ${o === y ? "hover" : ""}`,
              style: { fill: n ? "var(--hl-water)" : "var(--hl-heat)" },
              d: `M${C},${d + a}V${z + x}Q${C},${z} ${C + x},${z}H${C + j - x}Q${C + j},${z} ${C + j},${z + x}V${d + a}Z`
            }
          ),
          S && /* @__PURE__ */ s.jsx("text", { className: "axis", x: C + j / 2, y: u - 10, textAnchor: "middle", children: t === 7 ? _c(p.start) : Ec(p.start) })
        ] }, p.start);
      })
    ] }),
    c && /* @__PURE__ */ s.jsxs("div", { className: "tooltip", style: { left: Math.min(Math.max(X.left + (o + 0.5) * N, 80), l - 80) }, children: [
      /* @__PURE__ */ s.jsx("div", { className: "tooltip-title", children: Cc(c.start) }),
      c.heating_minutes == null ? /* @__PURE__ */ s.jsx("div", { children: "No data" }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsxs("div", { children: [
          n ? "On" : "Boiler on",
          " ",
          /* @__PURE__ */ s.jsx("b", { children: Ge(c.heating_minutes) })
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
          Ge(c.known_minutes)
        ] })
      ] })
    ] })
  ] });
}
function Ip({ minutes: e, total: t, water: n }) {
  const r = [
    { id: "schedule", label: "Schedule", icon: "calendar-clock" },
    { id: "manual", label: n ? "Always on" : "Manual", icon: "hand-back-right" },
    { id: "boost", label: "Boost", icon: "rocket-launch" },
    { id: "off", label: "Off", icon: "power" }
  ];
  return /* @__PURE__ */ s.jsx("div", { className: "modes", children: r.map((l) => {
    const o = t ? e[l.id] / t : 0;
    return /* @__PURE__ */ s.jsxs("div", { className: "mode-row", children: [
      /* @__PURE__ */ s.jsx(I, { name: l.icon }),
      /* @__PURE__ */ s.jsx("span", { className: "mode-name", children: l.label }),
      /* @__PURE__ */ s.jsx("span", { className: "mode-bar", children: /* @__PURE__ */ s.jsx("i", { style: { width: `${o * 100}%` } }) }),
      /* @__PURE__ */ s.jsx("span", { className: "mode-time", children: Ge(e[l.id]) }),
      /* @__PURE__ */ s.jsxs("span", { className: "mode-share", children: [
        Math.round(o * 100),
        "%"
      ] })
    ] }, l.id);
  }) });
}
const Ap = [
  { id: "overview", label: "Overview", icon: "view-dashboard-outline" },
  { id: "rooms", label: "Rooms", icon: "home-thermometer-outline" },
  { id: "schedule", label: "Schedule", icon: "calendar-clock" },
  { id: "stats", label: "Stats", icon: "chart-box-outline" }
];
function Up({ getHass: e, narrow: t, onToggleMenu: n }) {
  const [r, l] = L.useState([]), [o, i] = L.useState(null), [u, a] = L.useState({}), [d, v] = L.useState("overview"), [m, h] = L.useState(null), [g, k] = L.useState("heat"), [N, $] = L.useState(/* @__PURE__ */ new Set()), [f, c] = L.useState("");
  L.useEffect(() => {
    e().callWS({ type: "hive_local/devices" }).then((x) => {
      l(x.devices), i(x.limits);
    }).catch((x) => c(lt(x)));
    const E = e().connection.subscribeMessage(
      (x) => a(x.status),
      { type: "hive_local/subscribe" }
    );
    return () => {
      E.then((x) => x()).catch(() => {
      });
    };
  }, [e]);
  const p = (E) => {
    if (r.length <= 1) return r.map((S) => /* @__PURE__ */ s.jsx("section", { className: "receiver-section", children: E(S) }, S.entry_id));
    const x = r.find((S) => S.entry_id === m);
    return x ? /* @__PURE__ */ s.jsxs("section", { className: "receiver-section", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "receiver-crumb", children: [
        /* @__PURE__ */ s.jsxs("button", { className: "ghost", onClick: () => h(null), children: [
          /* @__PURE__ */ s.jsx(I, { name: "chevron-left" }),
          " All receivers"
        ] }),
        /* @__PURE__ */ s.jsx("h2", { children: x.name })
      ] }),
      E(x)
    ] }) : /* @__PURE__ */ s.jsx(hp, { devices: r, status: u, channel: "heat", onOpen: h });
  }, y = r.length <= 1 ? r[0] : r.find((E) => E.entry_id === m), j = d === "schedule" && y ? `${y.entry_id}-${y.channels.includes(g) ? g : y.channels[0]}` : null;
  L.useEffect(() => {
    j && $((E) => E.has(j) ? E : new Set(E).add(j));
  }, [j]);
  const C = (E, x) => {
    h(E), k(x), v("schedule");
  }, w = (E, x) => {
    const S = E.channels.includes(g) ? g : E.channels[0], D = (R) => `${E.entry_id}-${R}`;
    return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      E.channels.length > 1 && /* @__PURE__ */ s.jsx("div", { className: "segmented channel-switch", role: "tablist", "aria-label": "Schedule", children: E.channels.map((R) => /* @__PURE__ */ s.jsxs("button", { role: "tab", "aria-selected": R === S, className: R === S ? "on" : "", onClick: () => k(R), children: [
        /* @__PURE__ */ s.jsx(I, { name: R === "water" ? "water-boiler" : "radiator" }),
        " ",
        Yi[R]
      ] }, R)) }),
      E.channels.filter((R) => R === S || N.has(D(R))).map((R) => /* @__PURE__ */ s.jsx("div", { hidden: R !== S, children: /* @__PURE__ */ s.jsx(Np, { getHass: e, device: E, channel: R, limits: x }) }, D(R)))
    ] });
  }, z = Ap;
  return /* @__PURE__ */ s.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ s.jsx("header", { children: /* @__PURE__ */ s.jsxs("div", { className: "toolbar-row", children: [
      t && /* @__PURE__ */ s.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ s.jsx(I, { name: "menu" }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ s.jsx(la, {}),
        /* @__PURE__ */ s.jsx("h1", { children: "Hive Local" })
      ] }),
      /* @__PURE__ */ s.jsx("nav", { className: "tabs", role: "tablist", children: z.map((E) => /* @__PURE__ */ s.jsxs("button", { role: "tab", "aria-selected": E.id === d, className: E.id === d ? "on" : "", onClick: () => v(E.id), children: [
        /* @__PURE__ */ s.jsx(I, { name: E.icon }),
        /* @__PURE__ */ s.jsx("span", { children: E.label })
      ] }, E.id)) })
    ] }) }),
    /* @__PURE__ */ s.jsxs("main", { children: [
      f && /* @__PURE__ */ s.jsx("div", { className: "status error", children: f }),
      !r.length && !f && /* @__PURE__ */ s.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ s.jsx(la, { size: 56 }),
        /* @__PURE__ */ s.jsx("p", { children: "No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local." })
      ] }),
      d === "overview" && /* @__PURE__ */ s.jsx(cp, { getHass: e, devices: r, status: u, limits: o, onSchedule: C }),
      d === "rooms" && r.length > 0 && /* @__PURE__ */ s.jsx(vp, { getHass: e }),
      d === "schedule" && o && p((E) => w(E, o)),
      d === "stats" && r.length > 0 && /* @__PURE__ */ s.jsx(Tp, { getHass: e, devices: r })
    ] })
  ] });
}
const Bp = (
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
.chip-link { border: 0; cursor: pointer; padding: 4px 6px 4px 10px; gap: 4px; }
.chip-link:hover:not(:disabled) { background: color-mix(in srgb, var(--primary-text-color) 10%, transparent); color: var(--primary-text-color); }
.chip-link .icon-wrap:last-child { --mdc-icon-size: 16px; margin-left: -2px; }
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

/* Boost split button and its options */
.split { flex: 1; display: flex; gap: 2px; }
.split .boost-btn:first-child { border-radius: 10px 4px 4px 10px; }
.boost-more { flex: none; width: 44px; padding: 0; border-radius: 4px 10px 10px 4px; }
.boost-more.on { background: color-mix(in srgb, var(--hl-accent) 24%, transparent); }
.boost-options { display: flex; flex-direction: column; gap: 12px; padding: 14px; margin-top: -4px; border-radius: 14px; background: var(--hl-soft); }
.boost-options .chip-btn { background: var(--card-background-color); }
.boost-options .chip-btn.on { background: color-mix(in srgb, var(--hl-accent) 16%, var(--card-background-color)); }
.boost-options .stepper { background: var(--card-background-color); }
.hold-row { margin-top: -4px; }
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
  /* Room at the bottom for the tab bar (and the phone's home indicator). */
  main { padding: 12px 8px calc(88px + env(safe-area-inset-bottom)); gap: 12px; }
  .card { padding: 14px; }
  .grid { grid-template-columns: 1fr; }
  /* Phones: the tabs become a bar along the bottom, in thumb reach. */
  .tabs { position: fixed; left: 0; right: 0; bottom: 0; z-index: 3; margin: 0; gap: 0; justify-content: space-around;
    padding: 6px 8px calc(6px + env(safe-area-inset-bottom)); overflow: visible;
    background: var(--card-background-color); color: var(--primary-text-color); border-top: 1px solid var(--divider-color); box-shadow: 0 -2px 10px rgba(0,0,0,.06); }
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
class Hp extends HTMLElement {
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
      r.textContent = Bp;
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
      /* @__PURE__ */ s.jsx(
        Up,
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
customElements.get("hive-local-panel") || customElements.define("hive-local-panel", Hp);
