var Sc = Object.defineProperty;
var _c = (e, t, n) => t in e ? Sc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ur = (e, t, n) => _c(e, typeof t != "symbol" ? t + "" : t, n);
var la = { exports: {} }, fl = {}, oa = { exports: {} }, O = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nr = Symbol.for("react.element"), Nc = Symbol.for("react.portal"), jc = Symbol.for("react.fragment"), Cc = Symbol.for("react.strict_mode"), Ec = Symbol.for("react.profiler"), zc = Symbol.for("react.provider"), Pc = Symbol.for("react.context"), Tc = Symbol.for("react.forward_ref"), Lc = Symbol.for("react.suspense"), Mc = Symbol.for("react.memo"), Rc = Symbol.for("react.lazy"), Vi = Symbol.iterator;
function $c(e) {
  return e === null || typeof e != "object" ? null : (e = Vi && e[Vi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ia = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, sa = Object.assign, aa = {};
function mn(e, t, n) {
  this.props = e, this.context = t, this.refs = aa, this.updater = n || ia;
}
mn.prototype.isReactComponent = {};
mn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
mn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ua() {
}
ua.prototype = mn.prototype;
function Zo(e, t, n) {
  this.props = e, this.context = t, this.refs = aa, this.updater = n || ia;
}
var Jo = Zo.prototype = new ua();
Jo.constructor = Zo;
sa(Jo, mn.prototype);
Jo.isPureReactComponent = !0;
var Qi = Array.isArray, ca = Object.prototype.hasOwnProperty, qo = { current: null }, da = { key: !0, ref: !0, __self: !0, __source: !0 };
function fa(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) ca.call(t, r) && !da.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var a = Array(s), d = 0; d < s; d++) a[d] = arguments[d + 2];
    l.children = a;
  }
  if (e && e.defaultProps) for (r in s = e.defaultProps, s) l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: nr, type: e, key: o, ref: i, props: l, _owner: qo.current };
}
function Oc(e, t) {
  return { $$typeof: nr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function bo(e) {
  return typeof e == "object" && e !== null && e.$$typeof === nr;
}
function Dc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Ki = /\/+/g;
function Pl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Dc("" + e.key) : t.toString(36);
}
function zr(e, t, n, r, l) {
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
        case nr:
        case Nc:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + Pl(i, 0) : r, Qi(l) ? (n = "", e != null && (n = e.replace(Ki, "$&/") + "/"), zr(l, t, n, "", function(d) {
    return d;
  })) : l != null && (bo(l) && (l = Oc(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Ki, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Qi(e)) for (var s = 0; s < e.length; s++) {
    o = e[s];
    var a = r + Pl(o, s);
    i += zr(o, t, n, a, l);
  }
  else if (a = $c(e), typeof a == "function") for (e = a.call(e), s = 0; !(o = e.next()).done; ) o = o.value, a = r + Pl(o, s++), i += zr(o, t, n, a, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function cr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return zr(e, r, "", "", function(o) {
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
var pe = { current: null }, Pr = { transition: null }, Ic = { ReactCurrentDispatcher: pe, ReactCurrentBatchConfig: Pr, ReactCurrentOwner: qo };
function pa() {
  throw Error("act(...) is not supported in production builds of React.");
}
O.Children = { map: cr, forEach: function(e, t, n) {
  cr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return cr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return cr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!bo(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
O.Component = mn;
O.Fragment = jc;
O.Profiler = Ec;
O.PureComponent = Zo;
O.StrictMode = Cc;
O.Suspense = Lc;
O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ic;
O.act = pa;
O.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = sa({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = qo.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
    for (a in t) ca.call(t, a) && !da.hasOwnProperty(a) && (r[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    s = Array(a);
    for (var d = 0; d < a; d++) s[d] = arguments[d + 2];
    r.children = s;
  }
  return { $$typeof: nr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
O.createContext = function(e) {
  return e = { $$typeof: Pc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: zc, _context: e }, e.Consumer = e;
};
O.createElement = fa;
O.createFactory = function(e) {
  var t = fa.bind(null, e);
  return t.type = e, t;
};
O.createRef = function() {
  return { current: null };
};
O.forwardRef = function(e) {
  return { $$typeof: Tc, render: e };
};
O.isValidElement = bo;
O.lazy = function(e) {
  return { $$typeof: Rc, _payload: { _status: -1, _result: e }, _init: Fc };
};
O.memo = function(e, t) {
  return { $$typeof: Mc, type: e, compare: t === void 0 ? null : t };
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
O.unstable_act = pa;
O.useCallback = function(e, t) {
  return pe.current.useCallback(e, t);
};
O.useContext = function(e) {
  return pe.current.useContext(e);
};
O.useDebugValue = function() {
};
O.useDeferredValue = function(e) {
  return pe.current.useDeferredValue(e);
};
O.useEffect = function(e, t) {
  return pe.current.useEffect(e, t);
};
O.useId = function() {
  return pe.current.useId();
};
O.useImperativeHandle = function(e, t, n) {
  return pe.current.useImperativeHandle(e, t, n);
};
O.useInsertionEffect = function(e, t) {
  return pe.current.useInsertionEffect(e, t);
};
O.useLayoutEffect = function(e, t) {
  return pe.current.useLayoutEffect(e, t);
};
O.useMemo = function(e, t) {
  return pe.current.useMemo(e, t);
};
O.useReducer = function(e, t, n) {
  return pe.current.useReducer(e, t, n);
};
O.useRef = function(e) {
  return pe.current.useRef(e);
};
O.useState = function(e) {
  return pe.current.useState(e);
};
O.useSyncExternalStore = function(e, t, n) {
  return pe.current.useSyncExternalStore(e, t, n);
};
O.useTransition = function() {
  return pe.current.useTransition();
};
O.version = "18.3.1";
oa.exports = O;
var L = oa.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uc = L, Ac = Symbol.for("react.element"), Bc = Symbol.for("react.fragment"), Wc = Object.prototype.hasOwnProperty, Hc = Uc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Vc = { key: !0, ref: !0, __self: !0, __source: !0 };
function ha(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) Wc.call(t, r) && !Vc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Ac, type: e, key: o, ref: i, props: l, _owner: Hc.current };
}
fl.Fragment = Bc;
fl.jsx = ha;
fl.jsxs = ha;
la.exports = fl;
var u = la.exports, ma = { exports: {} }, Ce = {}, va = { exports: {} }, ga = {};
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
  function t(j, P) {
    var M = j.length;
    j.push(P);
    e: for (; 0 < M; ) {
      var Z = M - 1 >>> 1, te = j[Z];
      if (0 < l(te, P)) j[Z] = P, j[M] = te, M = Z;
      else break e;
    }
  }
  function n(j) {
    return j.length === 0 ? null : j[0];
  }
  function r(j) {
    if (j.length === 0) return null;
    var P = j[0], M = j.pop();
    if (M !== P) {
      j[0] = M;
      e: for (var Z = 0, te = j.length, sr = te >>> 1; Z < sr; ) {
        var Ct = 2 * (Z + 1) - 1, zl = j[Ct], Et = Ct + 1, ar = j[Et];
        if (0 > l(zl, M)) Et < te && 0 > l(ar, zl) ? (j[Z] = ar, j[Et] = M, Z = Et) : (j[Z] = zl, j[Ct] = M, Z = Ct);
        else if (Et < te && 0 > l(ar, M)) j[Z] = ar, j[Et] = M, Z = Et;
        else break e;
      }
    }
    return P;
  }
  function l(j, P) {
    var M = j.sortIndex - P.sortIndex;
    return M !== 0 ? M : j.id - P.id;
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
  var a = [], d = [], v = 1, m = null, h = 3, y = !1, x = !1, k = !1, T = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(j) {
    for (var P = n(d); P !== null; ) {
      if (P.callback === null) r(d);
      else if (P.startTime <= j) r(d), P.sortIndex = P.expirationTime, t(a, P);
      else break;
      P = n(d);
    }
  }
  function g(j) {
    if (k = !1, p(j), !x) if (n(a) !== null) x = !0, G(w);
    else {
      var P = n(d);
      P !== null && me(g, P.startTime - j);
    }
  }
  function w(j, P) {
    x = !1, k && (k = !1, f(E), E = -1), y = !0;
    var M = h;
    try {
      for (p(P), m = n(a); m !== null && (!(m.expirationTime > P) || j && !ke()); ) {
        var Z = m.callback;
        if (typeof Z == "function") {
          m.callback = null, h = m.priorityLevel;
          var te = Z(m.expirationTime <= P);
          P = e.unstable_now(), typeof te == "function" ? m.callback = te : m === n(a) && r(a), p(P);
        } else r(a);
        m = n(a);
      }
      if (m !== null) var sr = !0;
      else {
        var Ct = n(d);
        Ct !== null && me(g, Ct.startTime - P), sr = !1;
      }
      return sr;
    } finally {
      m = null, h = M, y = !1;
    }
  }
  var N = !1, _ = null, E = -1, D = 5, $ = -1;
  function ke() {
    return !(e.unstable_now() - $ < D);
  }
  function nt() {
    if (_ !== null) {
      var j = e.unstable_now();
      $ = j;
      var P = !0;
      try {
        P = _(!0, j);
      } finally {
        P ? z() : (N = !1, _ = null);
      }
    } else N = !1;
  }
  var z;
  if (typeof c == "function") z = function() {
    c(nt);
  };
  else if (typeof MessageChannel < "u") {
    var R = new MessageChannel(), B = R.port2;
    R.port1.onmessage = nt, z = function() {
      B.postMessage(null);
    };
  } else z = function() {
    T(nt, 0);
  };
  function G(j) {
    _ = j, N || (N = !0, z());
  }
  function me(j, P) {
    E = T(function() {
      j(e.unstable_now());
    }, P);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(j) {
    j.callback = null;
  }, e.unstable_continueExecution = function() {
    x || y || (x = !0, G(w));
  }, e.unstable_forceFrameRate = function(j) {
    0 > j || 125 < j ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < j ? Math.floor(1e3 / j) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(a);
  }, e.unstable_next = function(j) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var P = 3;
        break;
      default:
        P = h;
    }
    var M = h;
    h = P;
    try {
      return j();
    } finally {
      h = M;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(j, P) {
    switch (j) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        j = 3;
    }
    var M = h;
    h = j;
    try {
      return P();
    } finally {
      h = M;
    }
  }, e.unstable_scheduleCallback = function(j, P, M) {
    var Z = e.unstable_now();
    switch (typeof M == "object" && M !== null ? (M = M.delay, M = typeof M == "number" && 0 < M ? Z + M : Z) : M = Z, j) {
      case 1:
        var te = -1;
        break;
      case 2:
        te = 250;
        break;
      case 5:
        te = 1073741823;
        break;
      case 4:
        te = 1e4;
        break;
      default:
        te = 5e3;
    }
    return te = M + te, j = { id: v++, callback: P, priorityLevel: j, startTime: M, expirationTime: te, sortIndex: -1 }, M > Z ? (j.sortIndex = M, t(d, j), n(a) === null && j === n(d) && (k ? (f(E), E = -1) : k = !0, me(g, M - Z))) : (j.sortIndex = te, t(a, j), x || y || (x = !0, G(w))), j;
  }, e.unstable_shouldYield = ke, e.unstable_wrapCallback = function(j) {
    var P = h;
    return function() {
      var M = h;
      h = P;
      try {
        return j.apply(this, arguments);
      } finally {
        h = M;
      }
    };
  };
})(ga);
va.exports = ga;
var Qc = va.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kc = L, je = Qc;
function S(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ya = /* @__PURE__ */ new Set(), Un = {};
function At(e, t) {
  an(e, t), an(e + "Capture", t);
}
function an(e, t) {
  for (Un[e] = t, e = 0; e < t.length; e++) ya.add(t[e]);
}
var Je = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), to = Object.prototype.hasOwnProperty, Yc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Yi = {}, Xi = {};
function Xc(e) {
  return to.call(Xi, e) ? !0 : to.call(Yi, e) ? !1 : Yc.test(e) ? Xi[e] = !0 : (Yi[e] = !0, !1);
}
function Gc(e, t, n, r) {
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
function Zc(e, t, n, r) {
  if (t === null || typeof t > "u" || Gc(e, t, n, r)) return !0;
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
function he(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var ie = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ie[e] = new he(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ie[t] = new he(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ie[e] = new he(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ie[e] = new he(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ie[e] = new he(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ie[e] = new he(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ie[e] = new he(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ie[e] = new he(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ie[e] = new he(e, 5, !1, e.toLowerCase(), null, !1, !1);
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
  ie[t] = new he(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ei, ti);
  ie[t] = new he(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ei, ti);
  ie[t] = new he(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ie[e] = new he(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ie.xlinkHref = new he("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ie[e] = new he(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ni(e, t, n, r) {
  var l = ie.hasOwnProperty(t) ? ie[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Zc(t, n, l, r) && (n = null), r || l === null ? Xc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var tt = Kc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, dr = Symbol.for("react.element"), Ht = Symbol.for("react.portal"), Vt = Symbol.for("react.fragment"), ri = Symbol.for("react.strict_mode"), no = Symbol.for("react.profiler"), xa = Symbol.for("react.provider"), wa = Symbol.for("react.context"), li = Symbol.for("react.forward_ref"), ro = Symbol.for("react.suspense"), lo = Symbol.for("react.suspense_list"), oi = Symbol.for("react.memo"), lt = Symbol.for("react.lazy"), ka = Symbol.for("react.offscreen"), Gi = Symbol.iterator;
function yn(e) {
  return e === null || typeof e != "object" ? null : (e = Gi && e[Gi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Y = Object.assign, Tl;
function Cn(e) {
  if (Tl === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Tl = t && t[1] || "";
  }
  return `
` + Tl + e;
}
var Ll = !1;
function Ml(e, t) {
  if (!e || Ll) return "";
  Ll = !0;
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
`), i = l.length - 1, s = o.length - 1; 1 <= i && 0 <= s && l[i] !== o[s]; ) s--;
      for (; 1 <= i && 0 <= s; i--, s--) if (l[i] !== o[s]) {
        if (i !== 1 || s !== 1)
          do
            if (i--, s--, 0 > s || l[i] !== o[s]) {
              var a = `
` + l[i].replace(" at new ", " at ");
              return e.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", e.displayName)), a;
            }
          while (1 <= i && 0 <= s);
        break;
      }
    }
  } finally {
    Ll = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Cn(e) : "";
}
function Jc(e) {
  switch (e.tag) {
    case 5:
      return Cn(e.type);
    case 16:
      return Cn("Lazy");
    case 13:
      return Cn("Suspense");
    case 19:
      return Cn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ml(e.type, !1), e;
    case 11:
      return e = Ml(e.type.render, !1), e;
    case 1:
      return e = Ml(e.type, !0), e;
    default:
      return "";
  }
}
function oo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Vt:
      return "Fragment";
    case Ht:
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
    case wa:
      return (e.displayName || "Context") + ".Consumer";
    case xa:
      return (e._context.displayName || "Context") + ".Provider";
    case li:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case oi:
      return t = e.displayName || null, t !== null ? t : oo(e.type) || "Memo";
    case lt:
      t = e._payload, e = e._init;
      try {
        return oo(e(t));
      } catch {
      }
  }
  return null;
}
function qc(e) {
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
function wt(e) {
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
function Sa(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function bc(e) {
  var t = Sa(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function fr(e) {
  e._valueTracker || (e._valueTracker = bc(e));
}
function _a(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Sa(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Ar(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function io(e, t) {
  var n = t.checked;
  return Y({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Zi(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = wt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Na(e, t) {
  t = t.checked, t != null && ni(e, "checked", t, !1);
}
function so(e, t) {
  Na(e, t);
  var n = wt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? ao(e, t.type, n) : t.hasOwnProperty("defaultValue") && ao(e, t.type, wt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Ji(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function ao(e, t, n) {
  (t !== "number" || Ar(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var En = Array.isArray;
function tn(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + wt(n), t = null, l = 0; l < e.length; l++) {
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
  if (t.dangerouslySetInnerHTML != null) throw Error(S(91));
  return Y({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function qi(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(S(92));
      if (En(n)) {
        if (1 < n.length) throw Error(S(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: wt(n) };
}
function ja(e, t) {
  var n = wt(t.value), r = wt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function bi(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ca(e) {
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
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ca(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var pr, Ea = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (pr = pr || document.createElement("div"), pr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = pr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function An(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Tn = {
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
}, ed = ["Webkit", "ms", "Moz", "O"];
Object.keys(Tn).forEach(function(e) {
  ed.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Tn[t] = Tn[e];
  });
});
function za(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Tn.hasOwnProperty(e) && Tn[e] ? ("" + t).trim() : t + "px";
}
function Pa(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = za(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var td = Y({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function fo(e, t) {
  if (t) {
    if (td[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(S(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(S(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(S(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(S(62));
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
var mo = null, nn = null, rn = null;
function es(e) {
  if (e = or(e)) {
    if (typeof mo != "function") throw Error(S(280));
    var t = e.stateNode;
    t && (t = gl(t), mo(e.stateNode, e.type, t));
  }
}
function Ta(e) {
  nn ? rn ? rn.push(e) : rn = [e] : nn = e;
}
function La() {
  if (nn) {
    var e = nn, t = rn;
    if (rn = nn = null, es(e), t) for (e = 0; e < t.length; e++) es(t[e]);
  }
}
function Ma(e, t) {
  return e(t);
}
function Ra() {
}
var Rl = !1;
function $a(e, t, n) {
  if (Rl) return e(t, n);
  Rl = !0;
  try {
    return Ma(e, t, n);
  } finally {
    Rl = !1, (nn !== null || rn !== null) && (Ra(), La());
  }
}
function Bn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = gl(n);
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
  if (n && typeof n != "function") throw Error(S(231, t, typeof n));
  return n;
}
var vo = !1;
if (Je) try {
  var xn = {};
  Object.defineProperty(xn, "passive", { get: function() {
    vo = !0;
  } }), window.addEventListener("test", xn, xn), window.removeEventListener("test", xn, xn);
} catch {
  vo = !1;
}
function nd(e, t, n, r, l, o, i, s, a) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (v) {
    this.onError(v);
  }
}
var Ln = !1, Br = null, Wr = !1, go = null, rd = { onError: function(e) {
  Ln = !0, Br = e;
} };
function ld(e, t, n, r, l, o, i, s, a) {
  Ln = !1, Br = null, nd.apply(rd, arguments);
}
function od(e, t, n, r, l, o, i, s, a) {
  if (ld.apply(this, arguments), Ln) {
    if (Ln) {
      var d = Br;
      Ln = !1, Br = null;
    } else throw Error(S(198));
    Wr || (Wr = !0, go = d);
  }
}
function Bt(e) {
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
function Oa(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function ts(e) {
  if (Bt(e) !== e) throw Error(S(188));
}
function id(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Bt(e), t === null) throw Error(S(188));
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
        if (o === n) return ts(l), e;
        if (o === r) return ts(l), t;
        o = o.sibling;
      }
      throw Error(S(188));
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
        if (!i) throw Error(S(189));
      }
    }
    if (n.alternate !== r) throw Error(S(190));
  }
  if (n.tag !== 3) throw Error(S(188));
  return n.stateNode.current === n ? e : t;
}
function Da(e) {
  return e = id(e), e !== null ? Fa(e) : null;
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
var Ia = je.unstable_scheduleCallback, ns = je.unstable_cancelCallback, sd = je.unstable_shouldYield, ad = je.unstable_requestPaint, J = je.unstable_now, ud = je.unstable_getCurrentPriorityLevel, si = je.unstable_ImmediatePriority, Ua = je.unstable_UserBlockingPriority, Hr = je.unstable_NormalPriority, cd = je.unstable_LowPriority, Aa = je.unstable_IdlePriority, pl = null, Ve = null;
function dd(e) {
  if (Ve && typeof Ve.onCommitFiberRoot == "function") try {
    Ve.onCommitFiberRoot(pl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ie = Math.clz32 ? Math.clz32 : hd, fd = Math.log, pd = Math.LN2;
function hd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (fd(e) / pd | 0) | 0;
}
var hr = 64, mr = 4194304;
function zn(e) {
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
function Vr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var s = i & ~l;
    s !== 0 ? r = zn(s) : (o &= i, o !== 0 && (r = zn(o)));
  } else i = n & ~l, i !== 0 ? r = zn(i) : o !== 0 && (r = zn(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Ie(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function md(e, t) {
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
function vd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - Ie(o), s = 1 << i, a = l[i];
    a === -1 ? (!(s & n) || s & r) && (l[i] = md(s, t)) : a <= t && (e.expiredLanes |= s), o &= ~s;
  }
}
function yo(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ba() {
  var e = hr;
  return hr <<= 1, !(hr & 4194240) && (hr = 64), e;
}
function $l(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function rr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ie(t), e[t] = n;
}
function gd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Ie(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function ai(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Ie(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var U = 0;
function Wa(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Ha, ui, Va, Qa, Ka, xo = !1, vr = [], ft = null, pt = null, ht = null, Wn = /* @__PURE__ */ new Map(), Hn = /* @__PURE__ */ new Map(), it = [], yd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function rs(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ft = null;
      break;
    case "dragenter":
    case "dragleave":
      pt = null;
      break;
    case "mouseover":
    case "mouseout":
      ht = null;
      break;
    case "pointerover":
    case "pointerout":
      Wn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Hn.delete(t.pointerId);
  }
}
function wn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = or(t), t !== null && ui(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function xd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ft = wn(ft, e, t, n, r, l), !0;
    case "dragenter":
      return pt = wn(pt, e, t, n, r, l), !0;
    case "mouseover":
      return ht = wn(ht, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Wn.set(o, wn(Wn.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Hn.set(o, wn(Hn.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Ya(e) {
  var t = Tt(e.target);
  if (t !== null) {
    var n = Bt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Oa(n), t !== null) {
          e.blockedOn = t, Ka(e.priority, function() {
            Va(n);
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
function Tr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = wo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ho = r, n.target.dispatchEvent(r), ho = null;
    } else return t = or(n), t !== null && ui(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function ls(e, t, n) {
  Tr(e) && n.delete(t);
}
function wd() {
  xo = !1, ft !== null && Tr(ft) && (ft = null), pt !== null && Tr(pt) && (pt = null), ht !== null && Tr(ht) && (ht = null), Wn.forEach(ls), Hn.forEach(ls);
}
function kn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, xo || (xo = !0, je.unstable_scheduleCallback(je.unstable_NormalPriority, wd)));
}
function Vn(e) {
  function t(l) {
    return kn(l, e);
  }
  if (0 < vr.length) {
    kn(vr[0], e);
    for (var n = 1; n < vr.length; n++) {
      var r = vr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ft !== null && kn(ft, e), pt !== null && kn(pt, e), ht !== null && kn(ht, e), Wn.forEach(t), Hn.forEach(t), n = 0; n < it.length; n++) r = it[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < it.length && (n = it[0], n.blockedOn === null); ) Ya(n), n.blockedOn === null && it.shift();
}
var ln = tt.ReactCurrentBatchConfig, Qr = !0;
function kd(e, t, n, r) {
  var l = U, o = ln.transition;
  ln.transition = null;
  try {
    U = 1, ci(e, t, n, r);
  } finally {
    U = l, ln.transition = o;
  }
}
function Sd(e, t, n, r) {
  var l = U, o = ln.transition;
  ln.transition = null;
  try {
    U = 4, ci(e, t, n, r);
  } finally {
    U = l, ln.transition = o;
  }
}
function ci(e, t, n, r) {
  if (Qr) {
    var l = wo(e, t, n, r);
    if (l === null) Vl(e, t, r, Kr, n), rs(e, r);
    else if (xd(l, e, t, n, r)) r.stopPropagation();
    else if (rs(e, r), t & 4 && -1 < yd.indexOf(e)) {
      for (; l !== null; ) {
        var o = or(l);
        if (o !== null && Ha(o), o = wo(e, t, n, r), o === null && Vl(e, t, r, Kr, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Vl(e, t, r, null, n);
  }
}
var Kr = null;
function wo(e, t, n, r) {
  if (Kr = null, e = ii(r), e = Tt(e), e !== null) if (t = Bt(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Oa(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Kr = e, null;
}
function Xa(e) {
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
      switch (ud()) {
        case si:
          return 1;
        case Ua:
          return 4;
        case Hr:
        case cd:
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
var at = null, di = null, Lr = null;
function Ga() {
  if (Lr) return Lr;
  var e, t = di, n = t.length, r, l = "value" in at ? at.value : at.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return Lr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Mr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function gr() {
  return !0;
}
function os() {
  return !1;
}
function Ee(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(o) : o[s]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? gr : os, this.isPropagationStopped = os, this;
  }
  return Y(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = gr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = gr);
  }, persist: function() {
  }, isPersistent: gr }), t;
}
var vn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, fi = Ee(vn), lr = Y({}, vn, { view: 0, detail: 0 }), _d = Ee(lr), Ol, Dl, Sn, hl = Y({}, lr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: pi, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Sn && (Sn && e.type === "mousemove" ? (Ol = e.screenX - Sn.screenX, Dl = e.screenY - Sn.screenY) : Dl = Ol = 0, Sn = e), Ol);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Dl;
} }), is = Ee(hl), Nd = Y({}, hl, { dataTransfer: 0 }), jd = Ee(Nd), Cd = Y({}, lr, { relatedTarget: 0 }), Fl = Ee(Cd), Ed = Y({}, vn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), zd = Ee(Ed), Pd = Y({}, vn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Td = Ee(Pd), Ld = Y({}, vn, { data: 0 }), ss = Ee(Ld), Md = {
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
}, Rd = {
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
}, $d = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Od(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = $d[e]) ? !!t[e] : !1;
}
function pi() {
  return Od;
}
var Dd = Y({}, lr, { key: function(e) {
  if (e.key) {
    var t = Md[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Mr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Rd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: pi, charCode: function(e) {
  return e.type === "keypress" ? Mr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Mr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Fd = Ee(Dd), Id = Y({}, hl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), as = Ee(Id), Ud = Y({}, lr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: pi }), Ad = Ee(Ud), Bd = Y({}, vn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Wd = Ee(Bd), Hd = Y({}, hl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Vd = Ee(Hd), Qd = [9, 13, 27, 32], hi = Je && "CompositionEvent" in window, Mn = null;
Je && "documentMode" in document && (Mn = document.documentMode);
var Kd = Je && "TextEvent" in window && !Mn, Za = Je && (!hi || Mn && 8 < Mn && 11 >= Mn), us = " ", cs = !1;
function Ja(e, t) {
  switch (e) {
    case "keyup":
      return Qd.indexOf(t.keyCode) !== -1;
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
function qa(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Qt = !1;
function Yd(e, t) {
  switch (e) {
    case "compositionend":
      return qa(t);
    case "keypress":
      return t.which !== 32 ? null : (cs = !0, us);
    case "textInput":
      return e = t.data, e === us && cs ? null : e;
    default:
      return null;
  }
}
function Xd(e, t) {
  if (Qt) return e === "compositionend" || !hi && Ja(e, t) ? (e = Ga(), Lr = di = at = null, Qt = !1, e) : null;
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
      return Za && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Gd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function ds(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Gd[e.type] : t === "textarea";
}
function ba(e, t, n, r) {
  Ta(r), t = Yr(t, "onChange"), 0 < t.length && (n = new fi("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Rn = null, Qn = null;
function Zd(e) {
  cu(e, 0);
}
function ml(e) {
  var t = Xt(e);
  if (_a(t)) return e;
}
function Jd(e, t) {
  if (e === "change") return t;
}
var eu = !1;
if (Je) {
  var Il;
  if (Je) {
    var Ul = "oninput" in document;
    if (!Ul) {
      var fs = document.createElement("div");
      fs.setAttribute("oninput", "return;"), Ul = typeof fs.oninput == "function";
    }
    Il = Ul;
  } else Il = !1;
  eu = Il && (!document.documentMode || 9 < document.documentMode);
}
function ps() {
  Rn && (Rn.detachEvent("onpropertychange", tu), Qn = Rn = null);
}
function tu(e) {
  if (e.propertyName === "value" && ml(Qn)) {
    var t = [];
    ba(t, Qn, e, ii(e)), $a(Zd, t);
  }
}
function qd(e, t, n) {
  e === "focusin" ? (ps(), Rn = t, Qn = n, Rn.attachEvent("onpropertychange", tu)) : e === "focusout" && ps();
}
function bd(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return ml(Qn);
}
function ef(e, t) {
  if (e === "click") return ml(t);
}
function tf(e, t) {
  if (e === "input" || e === "change") return ml(t);
}
function nf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ae = typeof Object.is == "function" ? Object.is : nf;
function Kn(e, t) {
  if (Ae(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!to.call(t, l) || !Ae(e[l], t[l])) return !1;
  }
  return !0;
}
function hs(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ms(e, t) {
  var n = hs(e);
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
    n = hs(n);
  }
}
function nu(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? nu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function ru() {
  for (var e = window, t = Ar(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ar(e.document);
  }
  return t;
}
function mi(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function rf(e) {
  var t = ru(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && nu(n.ownerDocument.documentElement, n)) {
    if (r !== null && mi(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = ms(n, o);
        var i = ms(
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
var lf = Je && "documentMode" in document && 11 >= document.documentMode, Kt = null, ko = null, $n = null, So = !1;
function vs(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  So || Kt == null || Kt !== Ar(r) || (r = Kt, "selectionStart" in r && mi(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), $n && Kn($n, r) || ($n = r, r = Yr(ko, "onSelect"), 0 < r.length && (t = new fi("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Kt)));
}
function yr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Yt = { animationend: yr("Animation", "AnimationEnd"), animationiteration: yr("Animation", "AnimationIteration"), animationstart: yr("Animation", "AnimationStart"), transitionend: yr("Transition", "TransitionEnd") }, Al = {}, lu = {};
Je && (lu = document.createElement("div").style, "AnimationEvent" in window || (delete Yt.animationend.animation, delete Yt.animationiteration.animation, delete Yt.animationstart.animation), "TransitionEvent" in window || delete Yt.transitionend.transition);
function vl(e) {
  if (Al[e]) return Al[e];
  if (!Yt[e]) return e;
  var t = Yt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in lu) return Al[e] = t[n];
  return e;
}
var ou = vl("animationend"), iu = vl("animationiteration"), su = vl("animationstart"), au = vl("transitionend"), uu = /* @__PURE__ */ new Map(), gs = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function _t(e, t) {
  uu.set(e, t), At(t, [e]);
}
for (var Bl = 0; Bl < gs.length; Bl++) {
  var Wl = gs[Bl], of = Wl.toLowerCase(), sf = Wl[0].toUpperCase() + Wl.slice(1);
  _t(of, "on" + sf);
}
_t(ou, "onAnimationEnd");
_t(iu, "onAnimationIteration");
_t(su, "onAnimationStart");
_t("dblclick", "onDoubleClick");
_t("focusin", "onFocus");
_t("focusout", "onBlur");
_t(au, "onTransitionEnd");
an("onMouseEnter", ["mouseout", "mouseover"]);
an("onMouseLeave", ["mouseout", "mouseover"]);
an("onPointerEnter", ["pointerout", "pointerover"]);
an("onPointerLeave", ["pointerout", "pointerover"]);
At("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
At("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
At("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
At("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
At("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
At("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Pn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), af = new Set("cancel close invalid load scroll toggle".split(" ").concat(Pn));
function ys(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, od(r, t, void 0, e), e.currentTarget = null;
}
function cu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var s = r[i], a = s.instance, d = s.currentTarget;
        if (s = s.listener, a !== o && l.isPropagationStopped()) break e;
        ys(l, s, d), o = a;
      }
      else for (i = 0; i < r.length; i++) {
        if (s = r[i], a = s.instance, d = s.currentTarget, s = s.listener, a !== o && l.isPropagationStopped()) break e;
        ys(l, s, d), o = a;
      }
    }
  }
  if (Wr) throw e = go, Wr = !1, go = null, e;
}
function W(e, t) {
  var n = t[Eo];
  n === void 0 && (n = t[Eo] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (du(t, e, 2, !1), n.add(r));
}
function Hl(e, t, n) {
  var r = 0;
  t && (r |= 4), du(n, e, r, t);
}
var xr = "_reactListening" + Math.random().toString(36).slice(2);
function Yn(e) {
  if (!e[xr]) {
    e[xr] = !0, ya.forEach(function(n) {
      n !== "selectionchange" && (af.has(n) || Hl(n, !1, e), Hl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[xr] || (t[xr] = !0, Hl("selectionchange", !1, t));
  }
}
function du(e, t, n, r) {
  switch (Xa(t)) {
    case 1:
      var l = kd;
      break;
    case 4:
      l = Sd;
      break;
    default:
      l = ci;
  }
  n = l.bind(null, t, n, e), l = void 0, !vo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Vl(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var i = r.tag;
    if (i === 3 || i === 4) {
      var s = r.stateNode.containerInfo;
      if (s === l || s.nodeType === 8 && s.parentNode === l) break;
      if (i === 4) for (i = r.return; i !== null; ) {
        var a = i.tag;
        if ((a === 3 || a === 4) && (a = i.stateNode.containerInfo, a === l || a.nodeType === 8 && a.parentNode === l)) return;
        i = i.return;
      }
      for (; s !== null; ) {
        if (i = Tt(s), i === null) return;
        if (a = i.tag, a === 5 || a === 6) {
          r = o = i;
          continue e;
        }
        s = s.parentNode;
      }
    }
    r = r.return;
  }
  $a(function() {
    var d = o, v = ii(n), m = [];
    e: {
      var h = uu.get(e);
      if (h !== void 0) {
        var y = fi, x = e;
        switch (e) {
          case "keypress":
            if (Mr(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = Fd;
            break;
          case "focusin":
            x = "focus", y = Fl;
            break;
          case "focusout":
            x = "blur", y = Fl;
            break;
          case "beforeblur":
          case "afterblur":
            y = Fl;
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
            y = is;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = jd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Ad;
            break;
          case ou:
          case iu:
          case su:
            y = zd;
            break;
          case au:
            y = Wd;
            break;
          case "scroll":
            y = _d;
            break;
          case "wheel":
            y = Vd;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Td;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = as;
        }
        var k = (t & 4) !== 0, T = !k && e === "scroll", f = k ? h !== null ? h + "Capture" : null : h;
        k = [];
        for (var c = d, p; c !== null; ) {
          p = c;
          var g = p.stateNode;
          if (p.tag === 5 && g !== null && (p = g, f !== null && (g = Bn(c, f), g != null && k.push(Xn(c, g, p)))), T) break;
          c = c.return;
        }
        0 < k.length && (h = new y(h, x, null, n, v), m.push({ event: h, listeners: k }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", h && n !== ho && (x = n.relatedTarget || n.fromElement) && (Tt(x) || x[qe])) break e;
        if ((y || h) && (h = v.window === v ? v : (h = v.ownerDocument) ? h.defaultView || h.parentWindow : window, y ? (x = n.relatedTarget || n.toElement, y = d, x = x ? Tt(x) : null, x !== null && (T = Bt(x), x !== T || x.tag !== 5 && x.tag !== 6) && (x = null)) : (y = null, x = d), y !== x)) {
          if (k = is, g = "onMouseLeave", f = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (k = as, g = "onPointerLeave", f = "onPointerEnter", c = "pointer"), T = y == null ? h : Xt(y), p = x == null ? h : Xt(x), h = new k(g, c + "leave", y, n, v), h.target = T, h.relatedTarget = p, g = null, Tt(v) === d && (k = new k(f, c + "enter", x, n, v), k.target = p, k.relatedTarget = T, g = k), T = g, y && x) t: {
            for (k = y, f = x, c = 0, p = k; p; p = Wt(p)) c++;
            for (p = 0, g = f; g; g = Wt(g)) p++;
            for (; 0 < c - p; ) k = Wt(k), c--;
            for (; 0 < p - c; ) f = Wt(f), p--;
            for (; c--; ) {
              if (k === f || f !== null && k === f.alternate) break t;
              k = Wt(k), f = Wt(f);
            }
            k = null;
          }
          else k = null;
          y !== null && xs(m, h, y, k, !1), x !== null && T !== null && xs(m, T, x, k, !0);
        }
      }
      e: {
        if (h = d ? Xt(d) : window, y = h.nodeName && h.nodeName.toLowerCase(), y === "select" || y === "input" && h.type === "file") var w = Jd;
        else if (ds(h)) if (eu) w = tf;
        else {
          w = bd;
          var N = qd;
        }
        else (y = h.nodeName) && y.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (w = ef);
        if (w && (w = w(e, d))) {
          ba(m, w, n, v);
          break e;
        }
        N && N(e, h, d), e === "focusout" && (N = h._wrapperState) && N.controlled && h.type === "number" && ao(h, "number", h.value);
      }
      switch (N = d ? Xt(d) : window, e) {
        case "focusin":
          (ds(N) || N.contentEditable === "true") && (Kt = N, ko = d, $n = null);
          break;
        case "focusout":
          $n = ko = Kt = null;
          break;
        case "mousedown":
          So = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          So = !1, vs(m, n, v);
          break;
        case "selectionchange":
          if (lf) break;
        case "keydown":
        case "keyup":
          vs(m, n, v);
      }
      var _;
      if (hi) e: {
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
      else Qt ? Ja(e, n) && (E = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (E = "onCompositionStart");
      E && (Za && n.locale !== "ko" && (Qt || E !== "onCompositionStart" ? E === "onCompositionEnd" && Qt && (_ = Ga()) : (at = v, di = "value" in at ? at.value : at.textContent, Qt = !0)), N = Yr(d, E), 0 < N.length && (E = new ss(E, e, null, n, v), m.push({ event: E, listeners: N }), _ ? E.data = _ : (_ = qa(n), _ !== null && (E.data = _)))), (_ = Kd ? Yd(e, n) : Xd(e, n)) && (d = Yr(d, "onBeforeInput"), 0 < d.length && (v = new ss("onBeforeInput", "beforeinput", null, n, v), m.push({ event: v, listeners: d }), v.data = _));
    }
    cu(m, t);
  });
}
function Xn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Yr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Bn(e, n), o != null && r.unshift(Xn(e, o, l)), o = Bn(e, t), o != null && r.push(Xn(e, o, l))), e = e.return;
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
function xs(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var s = n, a = s.alternate, d = s.stateNode;
    if (a !== null && a === r) break;
    s.tag === 5 && d !== null && (s = d, l ? (a = Bn(n, o), a != null && i.unshift(Xn(n, a, s))) : l || (a = Bn(n, o), a != null && i.push(Xn(n, a, s)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var uf = /\r\n?/g, cf = /\u0000|\uFFFD/g;
function ws(e) {
  return (typeof e == "string" ? e : "" + e).replace(uf, `
`).replace(cf, "");
}
function wr(e, t, n) {
  if (t = ws(t), ws(e) !== t && n) throw Error(S(425));
}
function Xr() {
}
var _o = null, No = null;
function jo(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Co = typeof setTimeout == "function" ? setTimeout : void 0, df = typeof clearTimeout == "function" ? clearTimeout : void 0, ks = typeof Promise == "function" ? Promise : void 0, ff = typeof queueMicrotask == "function" ? queueMicrotask : typeof ks < "u" ? function(e) {
  return ks.resolve(null).then(e).catch(pf);
} : Co;
function pf(e) {
  setTimeout(function() {
    throw e;
  });
}
function Ql(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Vn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Vn(t);
}
function mt(e) {
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
function Ss(e) {
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
var gn = Math.random().toString(36).slice(2), He = "__reactFiber$" + gn, Gn = "__reactProps$" + gn, qe = "__reactContainer$" + gn, Eo = "__reactEvents$" + gn, hf = "__reactListeners$" + gn, mf = "__reactHandles$" + gn;
function Tt(e) {
  var t = e[He];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[qe] || n[He]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ss(e); e !== null; ) {
        if (n = e[He]) return n;
        e = Ss(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function or(e) {
  return e = e[He] || e[qe], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Xt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(S(33));
}
function gl(e) {
  return e[Gn] || null;
}
var zo = [], Gt = -1;
function Nt(e) {
  return { current: e };
}
function H(e) {
  0 > Gt || (e.current = zo[Gt], zo[Gt] = null, Gt--);
}
function A(e, t) {
  Gt++, zo[Gt] = e.current, e.current = t;
}
var kt = {}, ce = Nt(kt), ye = Nt(!1), Ot = kt;
function un(e, t) {
  var n = e.type.contextTypes;
  if (!n) return kt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function xe(e) {
  return e = e.childContextTypes, e != null;
}
function Gr() {
  H(ye), H(ce);
}
function _s(e, t, n) {
  if (ce.current !== kt) throw Error(S(168));
  A(ce, t), A(ye, n);
}
function fu(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(S(108, qc(e) || "Unknown", l));
  return Y({}, n, r);
}
function Zr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || kt, Ot = ce.current, A(ce, e), A(ye, ye.current), !0;
}
function Ns(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(S(169));
  n ? (e = fu(e, t, Ot), r.__reactInternalMemoizedMergedChildContext = e, H(ye), H(ce), A(ce, e)) : H(ye), A(ye, n);
}
var Ye = null, yl = !1, Kl = !1;
function pu(e) {
  Ye === null ? Ye = [e] : Ye.push(e);
}
function vf(e) {
  yl = !0, pu(e);
}
function jt() {
  if (!Kl && Ye !== null) {
    Kl = !0;
    var e = 0, t = U;
    try {
      var n = Ye;
      for (U = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ye = null, yl = !1;
    } catch (l) {
      throw Ye !== null && (Ye = Ye.slice(e + 1)), Ia(si, jt), l;
    } finally {
      U = t, Kl = !1;
    }
  }
  return null;
}
var Zt = [], Jt = 0, Jr = null, qr = 0, ze = [], Pe = 0, Dt = null, Xe = 1, Ge = "";
function zt(e, t) {
  Zt[Jt++] = qr, Zt[Jt++] = Jr, Jr = e, qr = t;
}
function hu(e, t, n) {
  ze[Pe++] = Xe, ze[Pe++] = Ge, ze[Pe++] = Dt, Dt = e;
  var r = Xe;
  e = Ge;
  var l = 32 - Ie(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - Ie(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, Xe = 1 << 32 - Ie(t) + l | n << l | r, Ge = o + e;
  } else Xe = 1 << o | n << l | r, Ge = e;
}
function vi(e) {
  e.return !== null && (zt(e, 1), hu(e, 1, 0));
}
function gi(e) {
  for (; e === Jr; ) Jr = Zt[--Jt], Zt[Jt] = null, qr = Zt[--Jt], Zt[Jt] = null;
  for (; e === Dt; ) Dt = ze[--Pe], ze[Pe] = null, Ge = ze[--Pe], ze[Pe] = null, Xe = ze[--Pe], ze[Pe] = null;
}
var Ne = null, _e = null, V = !1, Fe = null;
function mu(e, t) {
  var n = Te(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function js(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Ne = e, _e = mt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Ne = e, _e = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Dt !== null ? { id: Xe, overflow: Ge } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Te(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ne = e, _e = null, !0) : !1;
    default:
      return !1;
  }
}
function Po(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function To(e) {
  if (V) {
    var t = _e;
    if (t) {
      var n = t;
      if (!js(e, t)) {
        if (Po(e)) throw Error(S(418));
        t = mt(n.nextSibling);
        var r = Ne;
        t && js(e, t) ? mu(r, n) : (e.flags = e.flags & -4097 | 2, V = !1, Ne = e);
      }
    } else {
      if (Po(e)) throw Error(S(418));
      e.flags = e.flags & -4097 | 2, V = !1, Ne = e;
    }
  }
}
function Cs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Ne = e;
}
function kr(e) {
  if (e !== Ne) return !1;
  if (!V) return Cs(e), V = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !jo(e.type, e.memoizedProps)), t && (t = _e)) {
    if (Po(e)) throw vu(), Error(S(418));
    for (; t; ) mu(e, t), t = mt(t.nextSibling);
  }
  if (Cs(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(S(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              _e = mt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      _e = null;
    }
  } else _e = Ne ? mt(e.stateNode.nextSibling) : null;
  return !0;
}
function vu() {
  for (var e = _e; e; ) e = mt(e.nextSibling);
}
function cn() {
  _e = Ne = null, V = !1;
}
function yi(e) {
  Fe === null ? Fe = [e] : Fe.push(e);
}
var gf = tt.ReactCurrentBatchConfig;
function _n(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(S(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(S(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var s = l.refs;
        i === null ? delete s[o] : s[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(S(284));
    if (!n._owner) throw Error(S(290, e));
  }
  return e;
}
function Sr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(S(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Es(e) {
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
    return f = xt(f, c), f.index = 0, f.sibling = null, f;
  }
  function o(f, c, p) {
    return f.index = p, e ? (p = f.alternate, p !== null ? (p = p.index, p < c ? (f.flags |= 2, c) : p) : (f.flags |= 2, c)) : (f.flags |= 1048576, c);
  }
  function i(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function s(f, c, p, g) {
    return c === null || c.tag !== 6 ? (c = bl(p, f.mode, g), c.return = f, c) : (c = l(c, p), c.return = f, c);
  }
  function a(f, c, p, g) {
    var w = p.type;
    return w === Vt ? v(f, c, p.props.children, g, p.key) : c !== null && (c.elementType === w || typeof w == "object" && w !== null && w.$$typeof === lt && Es(w) === c.type) ? (g = l(c, p.props), g.ref = _n(f, c, p), g.return = f, g) : (g = Ur(p.type, p.key, p.props, null, f.mode, g), g.ref = _n(f, c, p), g.return = f, g);
  }
  function d(f, c, p, g) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== p.containerInfo || c.stateNode.implementation !== p.implementation ? (c = eo(p, f.mode, g), c.return = f, c) : (c = l(c, p.children || []), c.return = f, c);
  }
  function v(f, c, p, g, w) {
    return c === null || c.tag !== 7 ? (c = $t(p, f.mode, g, w), c.return = f, c) : (c = l(c, p), c.return = f, c);
  }
  function m(f, c, p) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = bl("" + c, f.mode, p), c.return = f, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case dr:
          return p = Ur(c.type, c.key, c.props, null, f.mode, p), p.ref = _n(f, null, c), p.return = f, p;
        case Ht:
          return c = eo(c, f.mode, p), c.return = f, c;
        case lt:
          var g = c._init;
          return m(f, g(c._payload), p);
      }
      if (En(c) || yn(c)) return c = $t(c, f.mode, p, null), c.return = f, c;
      Sr(f, c);
    }
    return null;
  }
  function h(f, c, p, g) {
    var w = c !== null ? c.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number") return w !== null ? null : s(f, c, "" + p, g);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case dr:
          return p.key === w ? a(f, c, p, g) : null;
        case Ht:
          return p.key === w ? d(f, c, p, g) : null;
        case lt:
          return w = p._init, h(
            f,
            c,
            w(p._payload),
            g
          );
      }
      if (En(p) || yn(p)) return w !== null ? null : v(f, c, p, g, null);
      Sr(f, p);
    }
    return null;
  }
  function y(f, c, p, g, w) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return f = f.get(p) || null, s(c, f, "" + g, w);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case dr:
          return f = f.get(g.key === null ? p : g.key) || null, a(c, f, g, w);
        case Ht:
          return f = f.get(g.key === null ? p : g.key) || null, d(c, f, g, w);
        case lt:
          var N = g._init;
          return y(f, c, p, N(g._payload), w);
      }
      if (En(g) || yn(g)) return f = f.get(p) || null, v(c, f, g, w, null);
      Sr(c, g);
    }
    return null;
  }
  function x(f, c, p, g) {
    for (var w = null, N = null, _ = c, E = c = 0, D = null; _ !== null && E < p.length; E++) {
      _.index > E ? (D = _, _ = null) : D = _.sibling;
      var $ = h(f, _, p[E], g);
      if ($ === null) {
        _ === null && (_ = D);
        break;
      }
      e && _ && $.alternate === null && t(f, _), c = o($, c, E), N === null ? w = $ : N.sibling = $, N = $, _ = D;
    }
    if (E === p.length) return n(f, _), V && zt(f, E), w;
    if (_ === null) {
      for (; E < p.length; E++) _ = m(f, p[E], g), _ !== null && (c = o(_, c, E), N === null ? w = _ : N.sibling = _, N = _);
      return V && zt(f, E), w;
    }
    for (_ = r(f, _); E < p.length; E++) D = y(_, f, E, p[E], g), D !== null && (e && D.alternate !== null && _.delete(D.key === null ? E : D.key), c = o(D, c, E), N === null ? w = D : N.sibling = D, N = D);
    return e && _.forEach(function(ke) {
      return t(f, ke);
    }), V && zt(f, E), w;
  }
  function k(f, c, p, g) {
    var w = yn(p);
    if (typeof w != "function") throw Error(S(150));
    if (p = w.call(p), p == null) throw Error(S(151));
    for (var N = w = null, _ = c, E = c = 0, D = null, $ = p.next(); _ !== null && !$.done; E++, $ = p.next()) {
      _.index > E ? (D = _, _ = null) : D = _.sibling;
      var ke = h(f, _, $.value, g);
      if (ke === null) {
        _ === null && (_ = D);
        break;
      }
      e && _ && ke.alternate === null && t(f, _), c = o(ke, c, E), N === null ? w = ke : N.sibling = ke, N = ke, _ = D;
    }
    if ($.done) return n(
      f,
      _
    ), V && zt(f, E), w;
    if (_ === null) {
      for (; !$.done; E++, $ = p.next()) $ = m(f, $.value, g), $ !== null && (c = o($, c, E), N === null ? w = $ : N.sibling = $, N = $);
      return V && zt(f, E), w;
    }
    for (_ = r(f, _); !$.done; E++, $ = p.next()) $ = y(_, f, E, $.value, g), $ !== null && (e && $.alternate !== null && _.delete($.key === null ? E : $.key), c = o($, c, E), N === null ? w = $ : N.sibling = $, N = $);
    return e && _.forEach(function(nt) {
      return t(f, nt);
    }), V && zt(f, E), w;
  }
  function T(f, c, p, g) {
    if (typeof p == "object" && p !== null && p.type === Vt && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case dr:
          e: {
            for (var w = p.key, N = c; N !== null; ) {
              if (N.key === w) {
                if (w = p.type, w === Vt) {
                  if (N.tag === 7) {
                    n(f, N.sibling), c = l(N, p.props.children), c.return = f, f = c;
                    break e;
                  }
                } else if (N.elementType === w || typeof w == "object" && w !== null && w.$$typeof === lt && Es(w) === N.type) {
                  n(f, N.sibling), c = l(N, p.props), c.ref = _n(f, N, p), c.return = f, f = c;
                  break e;
                }
                n(f, N);
                break;
              } else t(f, N);
              N = N.sibling;
            }
            p.type === Vt ? (c = $t(p.props.children, f.mode, g, p.key), c.return = f, f = c) : (g = Ur(p.type, p.key, p.props, null, f.mode, g), g.ref = _n(f, c, p), g.return = f, f = g);
          }
          return i(f);
        case Ht:
          e: {
            for (N = p.key; c !== null; ) {
              if (c.key === N) if (c.tag === 4 && c.stateNode.containerInfo === p.containerInfo && c.stateNode.implementation === p.implementation) {
                n(f, c.sibling), c = l(c, p.children || []), c.return = f, f = c;
                break e;
              } else {
                n(f, c);
                break;
              }
              else t(f, c);
              c = c.sibling;
            }
            c = eo(p, f.mode, g), c.return = f, f = c;
          }
          return i(f);
        case lt:
          return N = p._init, T(f, c, N(p._payload), g);
      }
      if (En(p)) return x(f, c, p, g);
      if (yn(p)) return k(f, c, p, g);
      Sr(f, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, c !== null && c.tag === 6 ? (n(f, c.sibling), c = l(c, p), c.return = f, f = c) : (n(f, c), c = bl(p, f.mode, g), c.return = f, f = c), i(f)) : n(f, c);
  }
  return T;
}
var dn = gu(!0), yu = gu(!1), br = Nt(null), el = null, qt = null, xi = null;
function wi() {
  xi = qt = el = null;
}
function ki(e) {
  var t = br.current;
  H(br), e._currentValue = t;
}
function Lo(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function on(e, t) {
  el = e, xi = qt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (ge = !0), e.firstContext = null);
}
function Me(e) {
  var t = e._currentValue;
  if (xi !== e) if (e = { context: e, memoizedValue: t, next: null }, qt === null) {
    if (el === null) throw Error(S(308));
    qt = e, el.dependencies = { lanes: 0, firstContext: e };
  } else qt = qt.next = e;
  return t;
}
var Lt = null;
function Si(e) {
  Lt === null ? Lt = [e] : Lt.push(e);
}
function xu(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Si(t)) : (n.next = l.next, l.next = n), t.interleaved = n, be(e, r);
}
function be(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var ot = !1;
function _i(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function wu(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ze(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function vt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, I & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, be(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Si(r)) : (t.next = l.next, l.next = t), r.interleaved = t, be(e, n);
}
function Rr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ai(e, n);
  }
}
function zs(e, t) {
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
function tl(e, t, n, r) {
  var l = e.updateQueue;
  ot = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var a = s, d = a.next;
    a.next = null, i === null ? o = d : i.next = d, i = a;
    var v = e.alternate;
    v !== null && (v = v.updateQueue, s = v.lastBaseUpdate, s !== i && (s === null ? v.firstBaseUpdate = d : s.next = d, v.lastBaseUpdate = a));
  }
  if (o !== null) {
    var m = l.baseState;
    i = 0, v = d = a = null, s = o;
    do {
      var h = s.lane, y = s.eventTime;
      if ((r & h) === h) {
        v !== null && (v = v.next = {
          eventTime: y,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var x = e, k = s;
          switch (h = t, y = n, k.tag) {
            case 1:
              if (x = k.payload, typeof x == "function") {
                m = x.call(y, m, h);
                break e;
              }
              m = x;
              break e;
            case 3:
              x.flags = x.flags & -65537 | 128;
            case 0:
              if (x = k.payload, h = typeof x == "function" ? x.call(y, m, h) : x, h == null) break e;
              m = Y({}, m, h);
              break e;
            case 2:
              ot = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [s] : h.push(s));
      } else y = { eventTime: y, lane: h, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, v === null ? (d = v = y, a = m) : v = v.next = y, i |= h;
      if (s = s.next, s === null) {
        if (s = l.shared.pending, s === null) break;
        h = s, s = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (a = m), l.baseState = a, l.firstBaseUpdate = d, l.lastBaseUpdate = v, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    It |= i, e.lanes = i, e.memoizedState = m;
  }
}
function Ps(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(S(191, l));
      l.call(r);
    }
  }
}
var ir = {}, Qe = Nt(ir), Zn = Nt(ir), Jn = Nt(ir);
function Mt(e) {
  if (e === ir) throw Error(S(174));
  return e;
}
function Ni(e, t) {
  switch (A(Jn, t), A(Zn, e), A(Qe, ir), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : co(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = co(t, e);
  }
  H(Qe), A(Qe, t);
}
function fn() {
  H(Qe), H(Zn), H(Jn);
}
function ku(e) {
  Mt(Jn.current);
  var t = Mt(Qe.current), n = co(t, e.type);
  t !== n && (A(Zn, e), A(Qe, n));
}
function ji(e) {
  Zn.current === e && (H(Qe), H(Zn));
}
var Q = Nt(0);
function nl(e) {
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
var Yl = [];
function Ci() {
  for (var e = 0; e < Yl.length; e++) Yl[e]._workInProgressVersionPrimary = null;
  Yl.length = 0;
}
var $r = tt.ReactCurrentDispatcher, Xl = tt.ReactCurrentBatchConfig, Ft = 0, K = null, b = null, ne = null, rl = !1, On = !1, qn = 0, yf = 0;
function se() {
  throw Error(S(321));
}
function Ei(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ae(e[n], t[n])) return !1;
  return !0;
}
function zi(e, t, n, r, l, o) {
  if (Ft = o, K = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, $r.current = e === null || e.memoizedState === null ? Sf : _f, e = n(r, l), On) {
    o = 0;
    do {
      if (On = !1, qn = 0, 25 <= o) throw Error(S(301));
      o += 1, ne = b = null, t.updateQueue = null, $r.current = Nf, e = n(r, l);
    } while (On);
  }
  if ($r.current = ll, t = b !== null && b.next !== null, Ft = 0, ne = b = K = null, rl = !1, t) throw Error(S(300));
  return e;
}
function Pi() {
  var e = qn !== 0;
  return qn = 0, e;
}
function We() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ne === null ? K.memoizedState = ne = e : ne = ne.next = e, ne;
}
function Re() {
  if (b === null) {
    var e = K.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = b.next;
  var t = ne === null ? K.memoizedState : ne.next;
  if (t !== null) ne = t, b = e;
  else {
    if (e === null) throw Error(S(310));
    b = e, e = { memoizedState: b.memoizedState, baseState: b.baseState, baseQueue: b.baseQueue, queue: b.queue, next: null }, ne === null ? K.memoizedState = ne = e : ne = ne.next = e;
  }
  return ne;
}
function bn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Gl(e) {
  var t = Re(), n = t.queue;
  if (n === null) throw Error(S(311));
  n.lastRenderedReducer = e;
  var r = b, l = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      l.next = o.next, o.next = i;
    }
    r.baseQueue = l = o, n.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var s = i = null, a = null, d = o;
    do {
      var v = d.lane;
      if ((Ft & v) === v) a !== null && (a = a.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var m = {
          lane: v,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        a === null ? (s = a = m, i = r) : a = a.next = m, K.lanes |= v, It |= v;
      }
      d = d.next;
    } while (d !== null && d !== o);
    a === null ? i = r : a.next = s, Ae(r, t.memoizedState) || (ge = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = a, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, K.lanes |= o, It |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Zl(e) {
  var t = Re(), n = t.queue;
  if (n === null) throw Error(S(311));
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
function Su() {
}
function _u(e, t) {
  var n = K, r = Re(), l = t(), o = !Ae(r.memoizedState, l);
  if (o && (r.memoizedState = l, ge = !0), r = r.queue, Ti(Cu.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || ne !== null && ne.memoizedState.tag & 1) {
    if (n.flags |= 2048, er(9, ju.bind(null, n, r, l, t), void 0, null), re === null) throw Error(S(349));
    Ft & 30 || Nu(n, t, l);
  }
  return l;
}
function Nu(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = K.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, K.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
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
    return !Ae(e, n);
  } catch {
    return !0;
  }
}
function zu(e) {
  var t = be(e, 1);
  t !== null && Ue(t, e, 1, -1);
}
function Ts(e) {
  var t = We();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: bn, lastRenderedState: e }, t.queue = e, e = e.dispatch = kf.bind(null, K, e), [t.memoizedState, e];
}
function er(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = K.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, K.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Pu() {
  return Re().memoizedState;
}
function Or(e, t, n, r) {
  var l = We();
  K.flags |= e, l.memoizedState = er(1 | t, n, void 0, r === void 0 ? null : r);
}
function xl(e, t, n, r) {
  var l = Re();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (b !== null) {
    var i = b.memoizedState;
    if (o = i.destroy, r !== null && Ei(r, i.deps)) {
      l.memoizedState = er(t, n, o, r);
      return;
    }
  }
  K.flags |= e, l.memoizedState = er(1 | t, n, o, r);
}
function Ls(e, t) {
  return Or(8390656, 8, e, t);
}
function Ti(e, t) {
  return xl(2048, 8, e, t);
}
function Tu(e, t) {
  return xl(4, 2, e, t);
}
function Lu(e, t) {
  return xl(4, 4, e, t);
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
  return n = n != null ? n.concat([e]) : null, xl(4, 4, Mu.bind(null, t, e), n);
}
function Li() {
}
function $u(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ei(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Ou(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ei(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Du(e, t, n) {
  return Ft & 21 ? (Ae(n, t) || (n = Ba(), K.lanes |= n, It |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, ge = !0), e.memoizedState = n);
}
function xf(e, t) {
  var n = U;
  U = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Xl.transition;
  Xl.transition = {};
  try {
    e(!1), t();
  } finally {
    U = n, Xl.transition = r;
  }
}
function Fu() {
  return Re().memoizedState;
}
function wf(e, t, n) {
  var r = yt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Iu(e)) Uu(t, n);
  else if (n = xu(e, t, n, r), n !== null) {
    var l = fe();
    Ue(n, e, r, l), Au(n, t, r);
  }
}
function kf(e, t, n) {
  var r = yt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Iu(e)) Uu(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, s = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = s, Ae(s, i)) {
        var a = t.interleaved;
        a === null ? (l.next = l, Si(t)) : (l.next = a.next, a.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = xu(e, t, l, r), n !== null && (l = fe(), Ue(n, e, r, l), Au(n, t, r));
  }
}
function Iu(e) {
  var t = e.alternate;
  return e === K || t !== null && t === K;
}
function Uu(e, t) {
  On = rl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Au(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ai(e, n);
  }
}
var ll = { readContext: Me, useCallback: se, useContext: se, useEffect: se, useImperativeHandle: se, useInsertionEffect: se, useLayoutEffect: se, useMemo: se, useReducer: se, useRef: se, useState: se, useDebugValue: se, useDeferredValue: se, useTransition: se, useMutableSource: se, useSyncExternalStore: se, useId: se, unstable_isNewReconciler: !1 }, Sf = { readContext: Me, useCallback: function(e, t) {
  return We().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Me, useEffect: Ls, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Or(
    4194308,
    4,
    Mu.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Or(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Or(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = We();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = We();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = wf.bind(null, K, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = We();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ts, useDebugValue: Li, useDeferredValue: function(e) {
  return We().memoizedState = e;
}, useTransition: function() {
  var e = Ts(!1), t = e[0];
  return e = xf.bind(null, e[1]), We().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = K, l = We();
  if (V) {
    if (n === void 0) throw Error(S(407));
    n = n();
  } else {
    if (n = t(), re === null) throw Error(S(349));
    Ft & 30 || Nu(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Ls(Cu.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, er(9, ju.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = We(), t = re.identifierPrefix;
  if (V) {
    var n = Ge, r = Xe;
    n = (r & ~(1 << 32 - Ie(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = qn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = yf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, _f = {
  readContext: Me,
  useCallback: $u,
  useContext: Me,
  useEffect: Ti,
  useImperativeHandle: Ru,
  useInsertionEffect: Tu,
  useLayoutEffect: Lu,
  useMemo: Ou,
  useReducer: Gl,
  useRef: Pu,
  useState: function() {
    return Gl(bn);
  },
  useDebugValue: Li,
  useDeferredValue: function(e) {
    var t = Re();
    return Du(t, b.memoizedState, e);
  },
  useTransition: function() {
    var e = Gl(bn)[0], t = Re().memoizedState;
    return [e, t];
  },
  useMutableSource: Su,
  useSyncExternalStore: _u,
  useId: Fu,
  unstable_isNewReconciler: !1
}, Nf = { readContext: Me, useCallback: $u, useContext: Me, useEffect: Ti, useImperativeHandle: Ru, useInsertionEffect: Tu, useLayoutEffect: Lu, useMemo: Ou, useReducer: Zl, useRef: Pu, useState: function() {
  return Zl(bn);
}, useDebugValue: Li, useDeferredValue: function(e) {
  var t = Re();
  return b === null ? t.memoizedState = e : Du(t, b.memoizedState, e);
}, useTransition: function() {
  var e = Zl(bn)[0], t = Re().memoizedState;
  return [e, t];
}, useMutableSource: Su, useSyncExternalStore: _u, useId: Fu, unstable_isNewReconciler: !1 };
function Oe(e, t) {
  if (e && e.defaultProps) {
    t = Y({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Mo(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : Y({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var wl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Bt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = fe(), l = yt(e), o = Ze(r, l);
  o.payload = t, n != null && (o.callback = n), t = vt(e, o, l), t !== null && (Ue(t, e, l, r), Rr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = fe(), l = yt(e), o = Ze(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = vt(e, o, l), t !== null && (Ue(t, e, l, r), Rr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = fe(), r = yt(e), l = Ze(n, r);
  l.tag = 2, t != null && (l.callback = t), t = vt(e, l, r), t !== null && (Ue(t, e, r, n), Rr(t, e, r));
} };
function Ms(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Kn(n, r) || !Kn(l, o) : !0;
}
function Bu(e, t, n) {
  var r = !1, l = kt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Me(o) : (l = xe(t) ? Ot : ce.current, r = t.contextTypes, o = (r = r != null) ? un(e, l) : kt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = wl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Rs(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && wl.enqueueReplaceState(t, t.state, null);
}
function Ro(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, _i(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = Me(o) : (o = xe(t) ? Ot : ce.current, l.context = un(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Mo(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && wl.enqueueReplaceState(l, l.state, null), tl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function pn(e, t) {
  try {
    var n = "", r = t;
    do
      n += Jc(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Jl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function $o(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var jf = typeof WeakMap == "function" ? WeakMap : Map;
function Wu(e, t, n) {
  n = Ze(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    il || (il = !0, Vo = r), $o(e, t);
  }, n;
}
function Hu(e, t, n) {
  n = Ze(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      $o(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    $o(e, t), typeof r != "function" && (gt === null ? gt = /* @__PURE__ */ new Set([this]) : gt.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function $s(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new jf();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Uf.bind(null, e, t, n), t.then(e, e));
}
function Os(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ds(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ze(-1, 1), t.tag = 2, vt(n, t, 1))), n.lanes |= 1), e);
}
var Cf = tt.ReactCurrentOwner, ge = !1;
function de(e, t, n, r) {
  t.child = e === null ? yu(t, null, n, r) : dn(t, e.child, n, r);
}
function Fs(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return on(t, l), r = zi(e, t, n, r, o, l), n = Pi(), e !== null && !ge ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, et(e, t, l)) : (V && n && vi(t), t.flags |= 1, de(e, t, r, l), t.child);
}
function Is(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Ui(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Vu(e, t, o, r, l)) : (e = Ur(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Kn, n(i, r) && e.ref === t.ref) return et(e, t, l);
  }
  return t.flags |= 1, e = xt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Vu(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Kn(o, r) && e.ref === t.ref) if (ge = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (ge = !0);
    else return t.lanes = e.lanes, et(e, t, l);
  }
  return Oo(e, t, n, r, l);
}
function Qu(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, A(en, Se), Se |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, A(en, Se), Se |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, A(en, Se), Se |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, A(en, Se), Se |= r;
  return de(e, t, l, n), t.child;
}
function Ku(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Oo(e, t, n, r, l) {
  var o = xe(n) ? Ot : ce.current;
  return o = un(t, o), on(t, l), n = zi(e, t, n, r, o, l), r = Pi(), e !== null && !ge ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, et(e, t, l)) : (V && r && vi(t), t.flags |= 1, de(e, t, n, l), t.child);
}
function Us(e, t, n, r, l) {
  if (xe(n)) {
    var o = !0;
    Zr(t);
  } else o = !1;
  if (on(t, l), t.stateNode === null) Dr(e, t), Bu(t, n, r), Ro(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, s = t.memoizedProps;
    i.props = s;
    var a = i.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = Me(d) : (d = xe(n) ? Ot : ce.current, d = un(t, d));
    var v = n.getDerivedStateFromProps, m = typeof v == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    m || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== r || a !== d) && Rs(t, i, r, d), ot = !1;
    var h = t.memoizedState;
    i.state = h, tl(t, r, i, l), a = t.memoizedState, s !== r || h !== a || ye.current || ot ? (typeof v == "function" && (Mo(t, n, v, r), a = t.memoizedState), (s = ot || Ms(t, n, s, r, h, a, d)) ? (m || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = a), i.props = r, i.state = a, i.context = d, r = s) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, wu(e, t), s = t.memoizedProps, d = t.type === t.elementType ? s : Oe(t.type, s), i.props = d, m = t.pendingProps, h = i.context, a = n.contextType, typeof a == "object" && a !== null ? a = Me(a) : (a = xe(n) ? Ot : ce.current, a = un(t, a));
    var y = n.getDerivedStateFromProps;
    (v = typeof y == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== m || h !== a) && Rs(t, i, r, a), ot = !1, h = t.memoizedState, i.state = h, tl(t, r, i, l);
    var x = t.memoizedState;
    s !== m || h !== x || ye.current || ot ? (typeof y == "function" && (Mo(t, n, y, r), x = t.memoizedState), (d = ot || Ms(t, n, d, r, h, x, a) || !1) ? (v || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, x, a), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, x, a)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = x), i.props = r, i.state = x, i.context = a, r = d) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Do(e, t, n, r, o, l);
}
function Do(e, t, n, r, l, o) {
  Ku(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && Ns(t, n, !1), et(e, t, o);
  r = t.stateNode, Cf.current = t;
  var s = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = dn(t, e.child, null, o), t.child = dn(t, null, s, o)) : de(e, t, s, o), t.memoizedState = r.state, l && Ns(t, n, !0), t.child;
}
function Yu(e) {
  var t = e.stateNode;
  t.pendingContext ? _s(e, t.pendingContext, t.pendingContext !== t.context) : t.context && _s(e, t.context, !1), Ni(e, t.containerInfo);
}
function As(e, t, n, r, l) {
  return cn(), yi(l), t.flags |= 256, de(e, t, n, r), t.child;
}
var Fo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Io(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Xu(e, t, n) {
  var r = t.pendingProps, l = Q.current, o = !1, i = (t.flags & 128) !== 0, s;
  if ((s = i) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), A(Q, l & 1), e === null)
    return To(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = _l(i, r, 0, null), e = $t(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Io(n), t.memoizedState = Fo, e) : Mi(t, i));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null)) return Ef(e, t, i, r, s, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, s = l.sibling;
    var a = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = a, t.deletions = null) : (r = xt(l, a), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? o = xt(s, o) : (o = $t(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? Io(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = Fo, r;
  }
  return o = e.child, e = o.sibling, r = xt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Mi(e, t) {
  return t = _l({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function _r(e, t, n, r) {
  return r !== null && yi(r), dn(t, e.child, null, n), e = Mi(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Ef(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Jl(Error(S(422))), _r(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = _l({ mode: "visible", children: r.children }, l, 0, null), o = $t(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && dn(t, e.child, null, i), t.child.memoizedState = Io(i), t.memoizedState = Fo, o);
  if (!(t.mode & 1)) return _r(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var s = r.dgst;
    return r = s, o = Error(S(419)), r = Jl(o, r, void 0), _r(e, t, i, r);
  }
  if (s = (i & e.childLanes) !== 0, ge || s) {
    if (r = re, r !== null) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, be(e, l), Ue(r, e, l, -1));
    }
    return Ii(), r = Jl(Error(S(421))), _r(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Af.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, _e = mt(l.nextSibling), Ne = t, V = !0, Fe = null, e !== null && (ze[Pe++] = Xe, ze[Pe++] = Ge, ze[Pe++] = Dt, Xe = e.id, Ge = e.overflow, Dt = t), t = Mi(t, r.children), t.flags |= 4096, t);
}
function Bs(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Lo(e.return, t, n);
}
function ql(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function Gu(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (de(e, t, r.children, n), r = Q.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Bs(e, n, t);
      else if (e.tag === 19) Bs(e, n, t);
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
  if (A(Q, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && nl(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), ql(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && nl(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      ql(t, !0, n, null, o);
      break;
    case "together":
      ql(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Dr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function et(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), It |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(S(153));
  if (t.child !== null) {
    for (e = t.child, n = xt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = xt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function zf(e, t, n) {
  switch (t.tag) {
    case 3:
      Yu(t), cn();
      break;
    case 5:
      ku(t);
      break;
    case 1:
      xe(t.type) && Zr(t);
      break;
    case 4:
      Ni(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      A(br, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (A(Q, Q.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Xu(e, t, n) : (A(Q, Q.current & 1), e = et(e, t, n), e !== null ? e.sibling : null);
      A(Q, Q.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Gu(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), A(Q, Q.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Qu(e, t, n);
  }
  return et(e, t, n);
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
    e = t.stateNode, Mt(Qe.current);
    var o = null;
    switch (n) {
      case "input":
        l = io(e, l), r = io(e, r), o = [];
        break;
      case "select":
        l = Y({}, l, { value: void 0 }), r = Y({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = uo(e, l), r = uo(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Xr);
    }
    fo(n, r);
    var i;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var s = l[d];
      for (i in s) s.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Un.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in r) {
      var a = r[d];
      if (s = l != null ? l[d] : void 0, r.hasOwnProperty(d) && a !== s && (a != null || s != null)) if (d === "style") if (s) {
        for (i in s) !s.hasOwnProperty(i) || a && a.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in a) a.hasOwnProperty(i) && s[i] !== a[i] && (n || (n = {}), n[i] = a[i]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = a;
      else d === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, s = s ? s.__html : void 0, a != null && s !== a && (o = o || []).push(d, a)) : d === "children" ? typeof a != "string" && typeof a != "number" || (o = o || []).push(d, "" + a) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Un.hasOwnProperty(d) ? (a != null && d === "onScroll" && W("scroll", e), o || s === a || (o = [])) : (o = o || []).push(d, a));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
qu = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Nn(e, t) {
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
function Pf(e, t, n) {
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
      return xe(t.type) && Gr(), ae(t), null;
    case 3:
      return r = t.stateNode, fn(), H(ye), H(ce), Ci(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (kr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Fe !== null && (Yo(Fe), Fe = null))), Uo(e, t), ae(t), null;
    case 5:
      ji(t);
      var l = Mt(Jn.current);
      if (n = t.type, e !== null && t.stateNode != null) Ju(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(S(166));
          return ae(t), null;
        }
        if (e = Mt(Qe.current), kr(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[He] = t, r[Gn] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              W("cancel", r), W("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              W("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Pn.length; l++) W(Pn[l], r);
              break;
            case "source":
              W("error", r);
              break;
            case "img":
            case "image":
            case "link":
              W(
                "error",
                r
              ), W("load", r);
              break;
            case "details":
              W("toggle", r);
              break;
            case "input":
              Zi(r, o), W("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, W("invalid", r);
              break;
            case "textarea":
              qi(r, o), W("invalid", r);
          }
          fo(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var s = o[i];
            i === "children" ? typeof s == "string" ? r.textContent !== s && (o.suppressHydrationWarning !== !0 && wr(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (o.suppressHydrationWarning !== !0 && wr(
              r.textContent,
              s,
              e
            ), l = ["children", "" + s]) : Un.hasOwnProperty(i) && s != null && i === "onScroll" && W("scroll", r);
          }
          switch (n) {
            case "input":
              fr(r), Ji(r, o, !0);
              break;
            case "textarea":
              fr(r), bi(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Xr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ca(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[He] = t, e[Gn] = r, Zu(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = po(n, r), n) {
              case "dialog":
                W("cancel", e), W("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                W("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Pn.length; l++) W(Pn[l], e);
                l = r;
                break;
              case "source":
                W("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                W(
                  "error",
                  e
                ), W("load", e), l = r;
                break;
              case "details":
                W("toggle", e), l = r;
                break;
              case "input":
                Zi(e, r), l = io(e, r), W("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = Y({}, r, { value: void 0 }), W("invalid", e);
                break;
              case "textarea":
                qi(e, r), l = uo(e, r), W("invalid", e);
                break;
              default:
                l = r;
            }
            fo(n, l), s = l;
            for (o in s) if (s.hasOwnProperty(o)) {
              var a = s[o];
              o === "style" ? Pa(e, a) : o === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && Ea(e, a)) : o === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && An(e, a) : typeof a == "number" && An(e, "" + a) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Un.hasOwnProperty(o) ? a != null && o === "onScroll" && W("scroll", e) : a != null && ni(e, o, a, i));
            }
            switch (n) {
              case "input":
                fr(e), Ji(e, r, !1);
                break;
              case "textarea":
                fr(e), bi(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + wt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? tn(e, !!r.multiple, o, !1) : r.defaultValue != null && tn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Xr);
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
        if (typeof r != "string" && t.stateNode === null) throw Error(S(166));
        if (n = Mt(Jn.current), Mt(Qe.current), kr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[He] = t, (o = r.nodeValue !== n) && (e = Ne, e !== null)) switch (e.tag) {
            case 3:
              wr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && wr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[He] = t, t.stateNode = r;
      }
      return ae(t), null;
    case 13:
      if (H(Q), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (V && _e !== null && t.mode & 1 && !(t.flags & 128)) vu(), cn(), t.flags |= 98560, o = !1;
        else if (o = kr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(S(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(S(317));
            o[He] = t;
          } else cn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ae(t), o = !1;
        } else Fe !== null && (Yo(Fe), Fe = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Q.current & 1 ? ee === 0 && (ee = 3) : Ii())), t.updateQueue !== null && (t.flags |= 4), ae(t), null);
    case 4:
      return fn(), Uo(e, t), e === null && Yn(t.stateNode.containerInfo), ae(t), null;
    case 10:
      return ki(t.type._context), ae(t), null;
    case 17:
      return xe(t.type) && Gr(), ae(t), null;
    case 19:
      if (H(Q), o = t.memoizedState, o === null) return ae(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) Nn(o, !1);
      else {
        if (ee !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = nl(e), i !== null) {
            for (t.flags |= 128, Nn(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return A(Q, Q.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && J() > hn && (t.flags |= 128, r = !0, Nn(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = nl(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Nn(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !V) return ae(t), null;
        } else 2 * J() - o.renderingStartTime > hn && n !== 1073741824 && (t.flags |= 128, r = !0, Nn(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = J(), t.sibling = null, n = Q.current, A(Q, r ? n & 1 | 2 : n & 1), t) : (ae(t), null);
    case 22:
    case 23:
      return Fi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Se & 1073741824 && (ae(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ae(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(S(156, t.tag));
}
function Tf(e, t) {
  switch (gi(t), t.tag) {
    case 1:
      return xe(t.type) && Gr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return fn(), H(ye), H(ce), Ci(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return ji(t), null;
    case 13:
      if (H(Q), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(S(340));
        cn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return H(Q), null;
    case 4:
      return fn(), null;
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
var Nr = !1, ue = !1, Lf = typeof WeakSet == "function" ? WeakSet : Set, C = null;
function bt(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    X(e, t, r);
  }
  else n.current = null;
}
function Ao(e, t, n) {
  try {
    n();
  } catch (r) {
    X(e, t, r);
  }
}
var Ws = !1;
function Mf(e, t) {
  if (_o = Qr, e = ru(), mi(e)) {
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
        var i = 0, s = -1, a = -1, d = 0, v = 0, m = e, h = null;
        t: for (; ; ) {
          for (var y; m !== n || l !== 0 && m.nodeType !== 3 || (s = i + l), m !== o || r !== 0 && m.nodeType !== 3 || (a = i + r), m.nodeType === 3 && (i += m.nodeValue.length), (y = m.firstChild) !== null; )
            h = m, m = y;
          for (; ; ) {
            if (m === e) break t;
            if (h === n && ++d === l && (s = i), h === o && ++v === r && (a = i), (y = m.nextSibling) !== null) break;
            m = h, h = m.parentNode;
          }
          m = y;
        }
        n = s === -1 || a === -1 ? null : { start: s, end: a };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (No = { focusedElem: e, selectionRange: n }, Qr = !1, C = t; C !== null; ) if (t = C, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, C = e;
  else for (; C !== null; ) {
    t = C;
    try {
      var x = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (x !== null) {
            var k = x.memoizedProps, T = x.memoizedState, f = t.stateNode, c = f.getSnapshotBeforeUpdate(t.elementType === t.type ? k : Oe(t.type, k), T);
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
          throw Error(S(163));
      }
    } catch (g) {
      X(t, t.return, g);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, C = e;
      break;
    }
    C = t.return;
  }
  return x = Ws, Ws = !1, x;
}
function Dn(e, t, n) {
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
function kl(e, t) {
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
  t !== null && (e.alternate = null, bu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[He], delete t[Gn], delete t[Eo], delete t[hf], delete t[mf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function ec(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Hs(e) {
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
function Wo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Xr));
  else if (r !== 4 && (e = e.child, e !== null)) for (Wo(e, t, n), e = e.sibling; e !== null; ) Wo(e, t, n), e = e.sibling;
}
function Ho(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Ho(e, t, n), e = e.sibling; e !== null; ) Ho(e, t, n), e = e.sibling;
}
var le = null, De = !1;
function rt(e, t, n) {
  for (n = n.child; n !== null; ) tc(e, t, n), n = n.sibling;
}
function tc(e, t, n) {
  if (Ve && typeof Ve.onCommitFiberUnmount == "function") try {
    Ve.onCommitFiberUnmount(pl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ue || bt(n, t);
    case 6:
      var r = le, l = De;
      le = null, rt(e, t, n), le = r, De = l, le !== null && (De ? (e = le, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : le.removeChild(n.stateNode));
      break;
    case 18:
      le !== null && (De ? (e = le, n = n.stateNode, e.nodeType === 8 ? Ql(e.parentNode, n) : e.nodeType === 1 && Ql(e, n), Vn(e)) : Ql(le, n.stateNode));
      break;
    case 4:
      r = le, l = De, le = n.stateNode.containerInfo, De = !0, rt(e, t, n), le = r, De = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ue && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && Ao(n, t, i), l = l.next;
        } while (l !== r);
      }
      rt(e, t, n);
      break;
    case 1:
      if (!ue && (bt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (s) {
        X(n, t, s);
      }
      rt(e, t, n);
      break;
    case 21:
      rt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ue = (r = ue) || n.memoizedState !== null, rt(e, t, n), ue = r) : rt(e, t, n);
      break;
    default:
      rt(e, t, n);
  }
}
function Vs(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Lf()), t.forEach(function(r) {
      var l = Bf.bind(null, e, r);
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
            le = s.stateNode, De = !1;
            break e;
          case 3:
            le = s.stateNode.containerInfo, De = !0;
            break e;
          case 4:
            le = s.stateNode.containerInfo, De = !0;
            break e;
        }
        s = s.return;
      }
      if (le === null) throw Error(S(160));
      tc(o, i, l), le = null, De = !1;
      var a = l.alternate;
      a !== null && (a.return = null), l.return = null;
    } catch (d) {
      X(l, t, d);
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
      if ($e(t, e), Be(e), r & 4) {
        try {
          Dn(3, e, e.return), kl(3, e);
        } catch (k) {
          X(e, e.return, k);
        }
        try {
          Dn(5, e, e.return);
        } catch (k) {
          X(e, e.return, k);
        }
      }
      break;
    case 1:
      $e(t, e), Be(e), r & 512 && n !== null && bt(n, n.return);
      break;
    case 5:
      if ($e(t, e), Be(e), r & 512 && n !== null && bt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          An(l, "");
        } catch (k) {
          X(e, e.return, k);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, s = e.type, a = e.updateQueue;
        if (e.updateQueue = null, a !== null) try {
          s === "input" && o.type === "radio" && o.name != null && Na(l, o), po(s, i);
          var d = po(s, o);
          for (i = 0; i < a.length; i += 2) {
            var v = a[i], m = a[i + 1];
            v === "style" ? Pa(l, m) : v === "dangerouslySetInnerHTML" ? Ea(l, m) : v === "children" ? An(l, m) : ni(l, v, m, d);
          }
          switch (s) {
            case "input":
              so(l, o);
              break;
            case "textarea":
              ja(l, o);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var y = o.value;
              y != null ? tn(l, !!o.multiple, y, !1) : h !== !!o.multiple && (o.defaultValue != null ? tn(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : tn(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Gn] = o;
        } catch (k) {
          X(e, e.return, k);
        }
      }
      break;
    case 6:
      if ($e(t, e), Be(e), r & 4) {
        if (e.stateNode === null) throw Error(S(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (k) {
          X(e, e.return, k);
        }
      }
      break;
    case 3:
      if ($e(t, e), Be(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Vn(t.containerInfo);
      } catch (k) {
        X(e, e.return, k);
      }
      break;
    case 4:
      $e(t, e), Be(e);
      break;
    case 13:
      $e(t, e), Be(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Oi = J())), r & 4 && Vs(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (ue = (d = ue) || v, $e(t, e), ue = d) : $e(t, e), Be(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !v && e.mode & 1) for (C = e, v = e.child; v !== null; ) {
          for (m = C = v; C !== null; ) {
            switch (h = C, y = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Dn(4, h, h.return);
                break;
              case 1:
                bt(h, h.return);
                var x = h.stateNode;
                if (typeof x.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, x.props = t.memoizedProps, x.state = t.memoizedState, x.componentWillUnmount();
                  } catch (k) {
                    X(r, n, k);
                  }
                }
                break;
              case 5:
                bt(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Ks(m);
                  continue;
                }
            }
            y !== null ? (y.return = h, C = y) : Ks(m);
          }
          v = v.sibling;
        }
        e: for (v = null, m = e; ; ) {
          if (m.tag === 5) {
            if (v === null) {
              v = m;
              try {
                l = m.stateNode, d ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (s = m.stateNode, a = m.memoizedProps.style, i = a != null && a.hasOwnProperty("display") ? a.display : null, s.style.display = za("display", i));
              } catch (k) {
                X(e, e.return, k);
              }
            }
          } else if (m.tag === 6) {
            if (v === null) try {
              m.stateNode.nodeValue = d ? "" : m.memoizedProps;
            } catch (k) {
              X(e, e.return, k);
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
      $e(t, e), Be(e), r & 4 && Vs(e);
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
          if (ec(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(S(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (An(l, ""), r.flags &= -33);
          var o = Hs(e);
          Ho(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, s = Hs(e);
          Wo(e, s, i);
          break;
        default:
          throw Error(S(161));
      }
    } catch (a) {
      X(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Rf(e, t, n) {
  C = e, rc(e);
}
function rc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; C !== null; ) {
    var l = C, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Nr;
      if (!i) {
        var s = l.alternate, a = s !== null && s.memoizedState !== null || ue;
        s = Nr;
        var d = ue;
        if (Nr = i, (ue = a) && !d) for (C = l; C !== null; ) i = C, a = i.child, i.tag === 22 && i.memoizedState !== null ? Ys(l) : a !== null ? (a.return = i, C = a) : Ys(l);
        for (; o !== null; ) C = o, rc(o), o = o.sibling;
        C = l, Nr = s, ue = d;
      }
      Qs(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, C = o) : Qs(e);
  }
}
function Qs(e) {
  for (; C !== null; ) {
    var t = C;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ue || kl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !ue) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Oe(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Ps(t, o, r);
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
              Ps(t, i, n);
            }
            break;
          case 5:
            var s = t.stateNode;
            if (n === null && t.flags & 4) {
              n = s;
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
                  m !== null && Vn(m);
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
            throw Error(S(163));
        }
        ue || t.flags & 512 && Bo(t);
      } catch (h) {
        X(t, t.return, h);
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
function Ks(e) {
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
function Ys(e) {
  for (; C !== null; ) {
    var t = C;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            kl(4, t);
          } catch (a) {
            X(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              X(t, l, a);
            }
          }
          var o = t.return;
          try {
            Bo(t);
          } catch (a) {
            X(t, o, a);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Bo(t);
          } catch (a) {
            X(t, i, a);
          }
      }
    } catch (a) {
      X(t, t.return, a);
    }
    if (t === e) {
      C = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      s.return = t.return, C = s;
      break;
    }
    C = t.return;
  }
}
var $f = Math.ceil, ol = tt.ReactCurrentDispatcher, Ri = tt.ReactCurrentOwner, Le = tt.ReactCurrentBatchConfig, I = 0, re = null, q = null, oe = 0, Se = 0, en = Nt(0), ee = 0, tr = null, It = 0, Sl = 0, $i = 0, Fn = null, ve = null, Oi = 0, hn = 1 / 0, Ke = null, il = !1, Vo = null, gt = null, jr = !1, ut = null, sl = 0, In = 0, Qo = null, Fr = -1, Ir = 0;
function fe() {
  return I & 6 ? J() : Fr !== -1 ? Fr : Fr = J();
}
function yt(e) {
  return e.mode & 1 ? I & 2 && oe !== 0 ? oe & -oe : gf.transition !== null ? (Ir === 0 && (Ir = Ba()), Ir) : (e = U, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Xa(e.type)), e) : 1;
}
function Ue(e, t, n, r) {
  if (50 < In) throw In = 0, Qo = null, Error(S(185));
  rr(e, n, r), (!(I & 2) || e !== re) && (e === re && (!(I & 2) && (Sl |= n), ee === 4 && st(e, oe)), we(e, r), n === 1 && I === 0 && !(t.mode & 1) && (hn = J() + 500, yl && jt()));
}
function we(e, t) {
  var n = e.callbackNode;
  vd(e, t);
  var r = Vr(e, e === re ? oe : 0);
  if (r === 0) n !== null && ns(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && ns(n), t === 1) e.tag === 0 ? vf(Xs.bind(null, e)) : pu(Xs.bind(null, e)), ff(function() {
      !(I & 6) && jt();
    }), n = null;
    else {
      switch (Wa(r)) {
        case 1:
          n = si;
          break;
        case 4:
          n = Ua;
          break;
        case 16:
          n = Hr;
          break;
        case 536870912:
          n = Aa;
          break;
        default:
          n = Hr;
      }
      n = dc(n, lc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function lc(e, t) {
  if (Fr = -1, Ir = 0, I & 6) throw Error(S(327));
  var n = e.callbackNode;
  if (sn() && e.callbackNode !== n) return null;
  var r = Vr(e, e === re ? oe : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = al(e, r);
  else {
    t = r;
    var l = I;
    I |= 2;
    var o = ic();
    (re !== e || oe !== t) && (Ke = null, hn = J() + 500, Rt(e, t));
    do
      try {
        Ff();
        break;
      } catch (s) {
        oc(e, s);
      }
    while (!0);
    wi(), ol.current = o, I = l, q !== null ? t = 0 : (re = null, oe = 0, t = ee);
  }
  if (t !== 0) {
    if (t === 2 && (l = yo(e), l !== 0 && (r = l, t = Ko(e, l))), t === 1) throw n = tr, Rt(e, 0), st(e, r), we(e, J()), n;
    if (t === 6) st(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Of(l) && (t = al(e, r), t === 2 && (o = yo(e), o !== 0 && (r = o, t = Ko(e, o))), t === 1)) throw n = tr, Rt(e, 0), st(e, r), we(e, J()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(S(345));
        case 2:
          Pt(e, ve, Ke);
          break;
        case 3:
          if (st(e, r), (r & 130023424) === r && (t = Oi + 500 - J(), 10 < t)) {
            if (Vr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              fe(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Co(Pt.bind(null, e, ve, Ke), t);
            break;
          }
          Pt(e, ve, Ke);
          break;
        case 4:
          if (st(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - Ie(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = J() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * $f(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Co(Pt.bind(null, e, ve, Ke), r);
            break;
          }
          Pt(e, ve, Ke);
          break;
        case 5:
          Pt(e, ve, Ke);
          break;
        default:
          throw Error(S(329));
      }
    }
  }
  return we(e, J()), e.callbackNode === n ? lc.bind(null, e) : null;
}
function Ko(e, t) {
  var n = Fn;
  return e.current.memoizedState.isDehydrated && (Rt(e, t).flags |= 256), e = al(e, t), e !== 2 && (t = ve, ve = n, t !== null && Yo(t)), e;
}
function Yo(e) {
  ve === null ? ve = e : ve.push.apply(ve, e);
}
function Of(e) {
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
  for (t &= ~$i, t &= ~Sl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ie(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Xs(e) {
  if (I & 6) throw Error(S(327));
  sn();
  var t = Vr(e, 0);
  if (!(t & 1)) return we(e, J()), null;
  var n = al(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = yo(e);
    r !== 0 && (t = r, n = Ko(e, r));
  }
  if (n === 1) throw n = tr, Rt(e, 0), st(e, t), we(e, J()), n;
  if (n === 6) throw Error(S(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Pt(e, ve, Ke), we(e, J()), null;
}
function Di(e, t) {
  var n = I;
  I |= 1;
  try {
    return e(t);
  } finally {
    I = n, I === 0 && (hn = J() + 500, yl && jt());
  }
}
function Ut(e) {
  ut !== null && ut.tag === 0 && !(I & 6) && sn();
  var t = I;
  I |= 1;
  var n = Le.transition, r = U;
  try {
    if (Le.transition = null, U = 1, e) return e();
  } finally {
    U = r, Le.transition = n, I = t, !(I & 6) && jt();
  }
}
function Fi() {
  Se = en.current, H(en);
}
function Rt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, df(n)), q !== null) for (n = q.return; n !== null; ) {
    var r = n;
    switch (gi(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Gr();
        break;
      case 3:
        fn(), H(ye), H(ce), Ci();
        break;
      case 5:
        ji(r);
        break;
      case 4:
        fn();
        break;
      case 13:
        H(Q);
        break;
      case 19:
        H(Q);
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
  if (re = e, q = e = xt(e.current, null), oe = Se = t, ee = 0, tr = null, $i = Sl = It = 0, ve = Fn = null, Lt !== null) {
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
function oc(e, t) {
  do {
    var n = q;
    try {
      if (wi(), $r.current = ll, rl) {
        for (var r = K.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        rl = !1;
      }
      if (Ft = 0, ne = b = K = null, On = !1, qn = 0, Ri.current = null, n === null || n.return === null) {
        ee = 1, tr = t, q = null;
        break;
      }
      e: {
        var o = e, i = n.return, s = n, a = t;
        if (t = oe, s.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
          var d = a, v = s, m = v.tag;
          if (!(v.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var h = v.alternate;
            h ? (v.updateQueue = h.updateQueue, v.memoizedState = h.memoizedState, v.lanes = h.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var y = Os(i);
          if (y !== null) {
            y.flags &= -257, Ds(y, i, s, o, t), y.mode & 1 && $s(o, d, t), t = y, a = d;
            var x = t.updateQueue;
            if (x === null) {
              var k = /* @__PURE__ */ new Set();
              k.add(a), t.updateQueue = k;
            } else x.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              $s(o, d, t), Ii();
              break e;
            }
            a = Error(S(426));
          }
        } else if (V && s.mode & 1) {
          var T = Os(i);
          if (T !== null) {
            !(T.flags & 65536) && (T.flags |= 256), Ds(T, i, s, o, t), yi(pn(a, s));
            break e;
          }
        }
        o = a = pn(a, s), ee !== 4 && (ee = 2), Fn === null ? Fn = [o] : Fn.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var f = Wu(o, a, t);
              zs(o, f);
              break e;
            case 1:
              s = a;
              var c = o.type, p = o.stateNode;
              if (!(o.flags & 128) && (typeof c.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (gt === null || !gt.has(p)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var g = Hu(o, s, t);
                zs(o, g);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      ac(n);
    } catch (w) {
      t = w, q === n && n !== null && (q = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function ic() {
  var e = ol.current;
  return ol.current = ll, e === null ? ll : e;
}
function Ii() {
  (ee === 0 || ee === 3 || ee === 2) && (ee = 4), re === null || !(It & 268435455) && !(Sl & 268435455) || st(re, oe);
}
function al(e, t) {
  var n = I;
  I |= 2;
  var r = ic();
  (re !== e || oe !== t) && (Ke = null, Rt(e, t));
  do
    try {
      Df();
      break;
    } catch (l) {
      oc(e, l);
    }
  while (!0);
  if (wi(), I = n, ol.current = r, q !== null) throw Error(S(261));
  return re = null, oe = 0, ee;
}
function Df() {
  for (; q !== null; ) sc(q);
}
function Ff() {
  for (; q !== null && !sd(); ) sc(q);
}
function sc(e) {
  var t = cc(e.alternate, e, Se);
  e.memoizedProps = e.pendingProps, t === null ? ac(e) : q = t, Ri.current = null;
}
function ac(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Tf(n, t), n !== null) {
        n.flags &= 32767, q = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ee = 6, q = null;
        return;
      }
    } else if (n = Pf(n, t, Se), n !== null) {
      q = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      q = t;
      return;
    }
    q = t = e;
  } while (t !== null);
  ee === 0 && (ee = 5);
}
function Pt(e, t, n) {
  var r = U, l = Le.transition;
  try {
    Le.transition = null, U = 1, If(e, t, n, r);
  } finally {
    Le.transition = l, U = r;
  }
  return null;
}
function If(e, t, n, r) {
  do
    sn();
  while (ut !== null);
  if (I & 6) throw Error(S(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(S(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (gd(e, o), e === re && (q = re = null, oe = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || jr || (jr = !0, dc(Hr, function() {
    return sn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Le.transition, Le.transition = null;
    var i = U;
    U = 1;
    var s = I;
    I |= 4, Ri.current = null, Mf(e, n), nc(n, e), rf(No), Qr = !!_o, No = _o = null, e.current = n, Rf(n), ad(), I = s, U = i, Le.transition = o;
  } else e.current = n;
  if (jr && (jr = !1, ut = e, sl = l), o = e.pendingLanes, o === 0 && (gt = null), dd(n.stateNode), we(e, J()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (il) throw il = !1, e = Vo, Vo = null, e;
  return sl & 1 && e.tag !== 0 && sn(), o = e.pendingLanes, o & 1 ? e === Qo ? In++ : (In = 0, Qo = e) : In = 0, jt(), null;
}
function sn() {
  if (ut !== null) {
    var e = Wa(sl), t = Le.transition, n = U;
    try {
      if (Le.transition = null, U = 16 > e ? 16 : e, ut === null) var r = !1;
      else {
        if (e = ut, ut = null, sl = 0, I & 6) throw Error(S(331));
        var l = I;
        for (I |= 4, C = e.current; C !== null; ) {
          var o = C, i = o.child;
          if (C.flags & 16) {
            var s = o.deletions;
            if (s !== null) {
              for (var a = 0; a < s.length; a++) {
                var d = s[a];
                for (C = d; C !== null; ) {
                  var v = C;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Dn(8, v, o);
                  }
                  var m = v.child;
                  if (m !== null) m.return = v, C = m;
                  else for (; C !== null; ) {
                    v = C;
                    var h = v.sibling, y = v.return;
                    if (bu(v), v === d) {
                      C = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = y, C = h;
                      break;
                    }
                    C = y;
                  }
                }
              }
              var x = o.alternate;
              if (x !== null) {
                var k = x.child;
                if (k !== null) {
                  x.child = null;
                  do {
                    var T = k.sibling;
                    k.sibling = null, k = T;
                  } while (k !== null);
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
                Dn(9, o, o.return);
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
            if (s = C, s.flags & 2048) try {
              switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  kl(9, s);
              }
            } catch (w) {
              X(s, s.return, w);
            }
            if (s === i) {
              C = null;
              break e;
            }
            var g = s.sibling;
            if (g !== null) {
              g.return = s.return, C = g;
              break e;
            }
            C = s.return;
          }
        }
        if (I = l, jt(), Ve && typeof Ve.onPostCommitFiberRoot == "function") try {
          Ve.onPostCommitFiberRoot(pl, e);
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
function Gs(e, t, n) {
  t = pn(n, t), t = Wu(e, t, 1), e = vt(e, t, 1), t = fe(), e !== null && (rr(e, 1, t), we(e, t));
}
function X(e, t, n) {
  if (e.tag === 3) Gs(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Gs(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (gt === null || !gt.has(r))) {
        e = pn(n, e), e = Hu(t, e, 1), t = vt(t, e, 1), e = fe(), t !== null && (rr(t, 1, e), we(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Uf(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = fe(), e.pingedLanes |= e.suspendedLanes & n, re === e && (oe & n) === n && (ee === 4 || ee === 3 && (oe & 130023424) === oe && 500 > J() - Oi ? Rt(e, 0) : $i |= n), we(e, t);
}
function uc(e, t) {
  t === 0 && (e.mode & 1 ? (t = mr, mr <<= 1, !(mr & 130023424) && (mr = 4194304)) : t = 1);
  var n = fe();
  e = be(e, t), e !== null && (rr(e, t, n), we(e, n));
}
function Af(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), uc(e, n);
}
function Bf(e, t) {
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
      throw Error(S(314));
  }
  r !== null && r.delete(t), uc(e, n);
}
var cc;
cc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ye.current) ge = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return ge = !1, zf(e, t, n);
    ge = !!(e.flags & 131072);
  }
  else ge = !1, V && t.flags & 1048576 && hu(t, qr, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Dr(e, t), e = t.pendingProps;
      var l = un(t, ce.current);
      on(t, n), l = zi(null, t, r, e, l, n);
      var o = Pi();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, xe(r) ? (o = !0, Zr(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, _i(t), l.updater = wl, t.stateNode = l, l._reactInternals = t, Ro(t, r, e, n), t = Do(null, t, r, !0, o, n)) : (t.tag = 0, V && o && vi(t), de(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Dr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Hf(r), e = Oe(r, e), l) {
          case 0:
            t = Oo(null, t, r, e, n);
            break e;
          case 1:
            t = Us(null, t, r, e, n);
            break e;
          case 11:
            t = Fs(null, t, r, e, n);
            break e;
          case 14:
            t = Is(null, t, r, Oe(r.type, e), n);
            break e;
        }
        throw Error(S(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Oe(r, l), Oo(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Oe(r, l), Us(e, t, r, l, n);
    case 3:
      e: {
        if (Yu(t), e === null) throw Error(S(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, wu(e, t), tl(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = pn(Error(S(423)), t), t = As(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = pn(Error(S(424)), t), t = As(e, t, r, n, l);
          break e;
        } else for (_e = mt(t.stateNode.containerInfo.firstChild), Ne = t, V = !0, Fe = null, n = yu(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (cn(), r === l) {
            t = et(e, t, n);
            break e;
          }
          de(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return ku(t), e === null && To(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, jo(r, l) ? i = null : o !== null && jo(r, o) && (t.flags |= 32), Ku(e, t), de(e, t, i, n), t.child;
    case 6:
      return e === null && To(t), null;
    case 13:
      return Xu(e, t, n);
    case 4:
      return Ni(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = dn(t, null, r, n) : de(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Oe(r, l), Fs(e, t, r, l, n);
    case 7:
      return de(e, t, t.pendingProps, n), t.child;
    case 8:
      return de(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return de(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, A(br, r._currentValue), r._currentValue = i, o !== null) if (Ae(o.value, i)) {
          if (o.children === l.children && !ye.current) {
            t = et(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var s = o.dependencies;
          if (s !== null) {
            i = o.child;
            for (var a = s.firstContext; a !== null; ) {
              if (a.context === r) {
                if (o.tag === 1) {
                  a = Ze(-1, n & -n), a.tag = 2;
                  var d = o.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var v = d.pending;
                    v === null ? a.next = a : (a.next = v.next, v.next = a), d.pending = a;
                  }
                }
                o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), Lo(
                  o.return,
                  n,
                  t
                ), s.lanes |= n;
                break;
              }
              a = a.next;
            }
          } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (i = o.return, i === null) throw Error(S(341));
            i.lanes |= n, s = i.alternate, s !== null && (s.lanes |= n), Lo(i, n, t), i = o.sibling;
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
        de(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, on(t, n), l = Me(l), r = r(l), t.flags |= 1, de(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Oe(r, t.pendingProps), l = Oe(r.type, l), Is(e, t, r, l, n);
    case 15:
      return Vu(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Oe(r, l), Dr(e, t), t.tag = 1, xe(r) ? (e = !0, Zr(t)) : e = !1, on(t, n), Bu(t, r, l), Ro(t, r, l, n), Do(null, t, r, !0, e, n);
    case 19:
      return Gu(e, t, n);
    case 22:
      return Qu(e, t, n);
  }
  throw Error(S(156, t.tag));
};
function dc(e, t) {
  return Ia(e, t);
}
function Wf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Te(e, t, n, r) {
  return new Wf(e, t, n, r);
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
function xt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Te(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Ur(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") Ui(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case Vt:
      return $t(n.children, l, o, t);
    case ri:
      i = 8, l |= 8;
      break;
    case no:
      return e = Te(12, n, t, l | 2), e.elementType = no, e.lanes = o, e;
    case ro:
      return e = Te(13, n, t, l), e.elementType = ro, e.lanes = o, e;
    case lo:
      return e = Te(19, n, t, l), e.elementType = lo, e.lanes = o, e;
    case ka:
      return _l(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case xa:
          i = 10;
          break e;
        case wa:
          i = 9;
          break e;
        case li:
          i = 11;
          break e;
        case oi:
          i = 14;
          break e;
        case lt:
          i = 16, r = null;
          break e;
      }
      throw Error(S(130, e == null ? e : typeof e, ""));
  }
  return t = Te(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function $t(e, t, n, r) {
  return e = Te(7, e, r, t), e.lanes = n, e;
}
function _l(e, t, n, r) {
  return e = Te(22, e, r, t), e.elementType = ka, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function bl(e, t, n) {
  return e = Te(6, e, null, t), e.lanes = n, e;
}
function eo(e, t, n) {
  return t = Te(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Vf(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = $l(0), this.expirationTimes = $l(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $l(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Ai(e, t, n, r, l, o, i, s, a) {
  return e = new Vf(e, t, n, s, a), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Te(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, _i(o), e;
}
function Qf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Ht, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function fc(e) {
  if (!e) return kt;
  e = e._reactInternals;
  e: {
    if (Bt(e) !== e || e.tag !== 1) throw Error(S(170));
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
    throw Error(S(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (xe(n)) return fu(e, n, t);
  }
  return t;
}
function pc(e, t, n, r, l, o, i, s, a) {
  return e = Ai(n, r, !0, e, l, o, i, s, a), e.context = fc(null), n = e.current, r = fe(), l = yt(n), o = Ze(r, l), o.callback = t ?? null, vt(n, o, l), e.current.lanes = l, rr(e, l, r), we(e, r), e;
}
function Nl(e, t, n, r) {
  var l = t.current, o = fe(), i = yt(l);
  return n = fc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ze(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = vt(l, t, i), e !== null && (Ue(e, l, i, o), Rr(e, l, i)), i;
}
function ul(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Zs(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Bi(e, t) {
  Zs(e, t), (e = e.alternate) && Zs(e, t);
}
function Kf() {
  return null;
}
var hc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Wi(e) {
  this._internalRoot = e;
}
jl.prototype.render = Wi.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(S(409));
  Nl(e, t, null, null);
};
jl.prototype.unmount = Wi.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ut(function() {
      Nl(null, e, null, null);
    }), t[qe] = null;
  }
};
function jl(e) {
  this._internalRoot = e;
}
jl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Qa();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < it.length && t !== 0 && t < it[n].priority; n++) ;
    it.splice(n, 0, e), n === 0 && Ya(e);
  }
};
function Hi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Cl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Js() {
}
function Yf(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var d = ul(i);
        o.call(d);
      };
    }
    var i = pc(t, r, e, 0, null, !1, !1, "", Js);
    return e._reactRootContainer = i, e[qe] = i.current, Yn(e.nodeType === 8 ? e.parentNode : e), Ut(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var d = ul(a);
      s.call(d);
    };
  }
  var a = Ai(e, 0, !1, null, null, !1, !1, "", Js);
  return e._reactRootContainer = a, e[qe] = a.current, Yn(e.nodeType === 8 ? e.parentNode : e), Ut(function() {
    Nl(t, a, n, r);
  }), a;
}
function El(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var s = l;
      l = function() {
        var a = ul(i);
        s.call(a);
      };
    }
    Nl(t, i, e, l);
  } else i = Yf(n, t, e, l, r);
  return ul(i);
}
Ha = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = zn(t.pendingLanes);
        n !== 0 && (ai(t, n | 1), we(t, J()), !(I & 6) && (hn = J() + 500, jt()));
      }
      break;
    case 13:
      Ut(function() {
        var r = be(e, 1);
        if (r !== null) {
          var l = fe();
          Ue(r, e, 1, l);
        }
      }), Bi(e, 1);
  }
};
ui = function(e) {
  if (e.tag === 13) {
    var t = be(e, 134217728);
    if (t !== null) {
      var n = fe();
      Ue(t, e, 134217728, n);
    }
    Bi(e, 134217728);
  }
};
Va = function(e) {
  if (e.tag === 13) {
    var t = yt(e), n = be(e, t);
    if (n !== null) {
      var r = fe();
      Ue(n, e, t, r);
    }
    Bi(e, t);
  }
};
Qa = function() {
  return U;
};
Ka = function(e, t) {
  var n = U;
  try {
    return U = e, t();
  } finally {
    U = n;
  }
};
mo = function(e, t, n) {
  switch (t) {
    case "input":
      if (so(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = gl(r);
            if (!l) throw Error(S(90));
            _a(r), so(r, l);
          }
        }
      }
      break;
    case "textarea":
      ja(e, n);
      break;
    case "select":
      t = n.value, t != null && tn(e, !!n.multiple, t, !1);
  }
};
Ma = Di;
Ra = Ut;
var Xf = { usingClientEntryPoint: !1, Events: [or, Xt, gl, Ta, La, Di] }, jn = { findFiberByHostInstance: Tt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Gf = { bundleType: jn.bundleType, version: jn.version, rendererPackageName: jn.rendererPackageName, rendererConfig: jn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: tt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Da(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: jn.findFiberByHostInstance || Kf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Cr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Cr.isDisabled && Cr.supportsFiber) try {
    pl = Cr.inject(Gf), Ve = Cr;
  } catch {
  }
}
Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Xf;
Ce.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Hi(t)) throw Error(S(200));
  return Qf(e, t, null, n);
};
Ce.createRoot = function(e, t) {
  if (!Hi(e)) throw Error(S(299));
  var n = !1, r = "", l = hc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Ai(e, 1, !1, null, null, n, !1, r, l), e[qe] = t.current, Yn(e.nodeType === 8 ? e.parentNode : e), new Wi(t);
};
Ce.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(S(188)) : (e = Object.keys(e).join(","), Error(S(268, e)));
  return e = Da(t), e = e === null ? null : e.stateNode, e;
};
Ce.flushSync = function(e) {
  return Ut(e);
};
Ce.hydrate = function(e, t, n) {
  if (!Cl(t)) throw Error(S(200));
  return El(null, e, t, !0, n);
};
Ce.hydrateRoot = function(e, t, n) {
  if (!Hi(e)) throw Error(S(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = hc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = pc(t, null, e, 1, n ?? null, l, !1, o, i), e[qe] = t.current, Yn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new jl(t);
};
Ce.render = function(e, t, n) {
  if (!Cl(t)) throw Error(S(200));
  return El(null, e, t, !1, n);
};
Ce.unmountComponentAtNode = function(e) {
  if (!Cl(e)) throw Error(S(40));
  return e._reactRootContainer ? (Ut(function() {
    El(null, null, e, !1, function() {
      e._reactRootContainer = null, e[qe] = null;
    });
  }), !0) : !1;
};
Ce.unstable_batchedUpdates = Di;
Ce.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Cl(n)) throw Error(S(200));
  if (e == null || e._reactInternals === void 0) throw Error(S(38));
  return El(e, t, n, !1, r);
};
Ce.version = "18.3.1-next-f1338f8080-20240426";
function mc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(mc);
    } catch (e) {
      console.error(e);
    }
}
mc(), ma.exports = Ce;
var Zf = ma.exports, vc, qs = Zf;
vc = qs.createRoot, qs.hydrateRoot;
const Er = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
], gc = { heat: "Heating", water: "Hot water" }, St = (e) => String((e == null ? void 0 : e.message) ?? e);
function yc(e, t, n) {
  const [r, l] = L.useState(!1), [o, i] = L.useState(null);
  return { busy: r, result: o, send: async (a, d) => {
    l(!0);
    try {
      await e().callWS({ entry_id: t, channel: n, ...a }), i({ kind: "ok", text: d });
    } catch (v) {
      i({ kind: "error", text: St(v) });
    } finally {
      l(!1);
    }
  } };
}
const ct = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`;
function F({ name: e, className: t }) {
  return /* @__PURE__ */ u.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("ha-icon", { icon: `mdi:${e}` }) });
}
const Jf = [15, 30, 45, 60, 90, 120, 180, 240, 360];
function qf({
  getHass: e,
  device: t,
  limits: n,
  status: r
}) {
  return /* @__PURE__ */ u.jsx("div", { className: "stack", children: t.channels.map((l) => /* @__PURE__ */ u.jsx(
    bf,
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
function bf({
  getHass: e,
  entryId: t,
  channel: n,
  limits: r,
  info: l
}) {
  const o = n === "water", i = (l == null ? void 0 : l.status) ?? null, { busy: s, result: a, send: d } = yc(e, t, n), [v, m] = L.useState(20), [h, y] = L.useState((l == null ? void 0 : l.boost_minutes) ?? 30), [x, k] = L.useState((l == null ? void 0 : l.boost_temperature) ?? 21);
  L.useEffect(() => {
    l && y(l.boost_minutes);
  }, [l == null ? void 0 : l.boost_minutes]), L.useEffect(() => {
    l && k(l.boost_temperature);
  }, [l == null ? void 0 : l.boost_temperature]), L.useEffect(() => {
    (i == null ? void 0 : i.mode) === "manual" && i.setpoint != null && i.setpoint >= r.boost_min_temp && m(i.setpoint);
  }, [i == null ? void 0 : i.mode, i == null ? void 0 : i.setpoint]);
  const T = (w) => d(
    { type: "hive_local/mode", mode: w, ...w === "manual" && !o ? { setpoint: v } : {} },
    w === "schedule" ? "Following the schedule" : w === "off" ? "Turned off" : o ? "Always on" : `Holding ${v}°`
  ), f = [
    { id: "schedule", label: "Schedule", icon: "calendar-clock", hint: "Follow the schedule on the receiver" },
    o ? { id: "manual", label: "Always on", icon: "water-boiler", hint: "Keep the hot water on" } : { id: "manual", label: "Manual", icon: "hand-back-right", hint: "Hold one temperature" },
    { id: "off", label: "Off", icon: "power", hint: o ? "No hot water" : "Frost protection only" }
  ], c = (i == null ? void 0 : i.mode) === "boost", p = (w) => Math.min(r.heat_max, Math.max(r.boost_min_temp, Math.round(w * 2) / 2)), g = [.../* @__PURE__ */ new Set([...Jf, h])].filter((w) => w <= r.boost_max_minutes).sort((w, N) => w - N);
  return /* @__PURE__ */ u.jsxs("section", { className: `card ${n}`, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ u.jsx(F, { name: o ? "water-boiler" : "radiator", className: "title-icon" }),
        /* @__PURE__ */ u.jsx("h2", { children: gc[n] })
      ] }),
      !i && /* @__PURE__ */ u.jsx("span", { className: "muted", children: "Waiting for the receiver…" })
    ] }),
    /* @__PURE__ */ u.jsx("h3", { children: "Mode" }),
    /* @__PURE__ */ u.jsx("div", { className: "mode-grid", children: f.map((w) => /* @__PURE__ */ u.jsxs(
      "button",
      {
        className: `mode-tile ${(i == null ? void 0 : i.mode) === w.id ? "on" : ""}`,
        disabled: s,
        onClick: () => T(w.id),
        children: [
          /* @__PURE__ */ u.jsx(F, { name: w.icon }),
          /* @__PURE__ */ u.jsx("span", { className: "mode-label", children: w.label }),
          /* @__PURE__ */ u.jsx("span", { className: "muted small", children: w.hint })
        ]
      },
      w.id
    )) }),
    !o && (i == null ? void 0 : i.mode) === "manual" && /* @__PURE__ */ u.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ u.jsx("span", { className: "muted", children: "Hold at" }),
      /* @__PURE__ */ u.jsx(Xo, { value: v, onChange: (w) => m(p(w)) }),
      i.setpoint !== v && /* @__PURE__ */ u.jsx("button", { className: "primary", disabled: s, onClick: () => T("manual"), children: "Apply" })
    ] }),
    /* @__PURE__ */ u.jsx("h3", { children: "Boost" }),
    c ? /* @__PURE__ */ u.jsxs("div", { className: "boost-live", children: [
      /* @__PURE__ */ u.jsx(F, { name: "rocket-launch", className: "boost-icon" }),
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsxs("div", { className: "boost-title", children: [
          "Boosting",
          !o && (i == null ? void 0 : i.setpoint) != null ? ` to ${i.setpoint}°` : ""
        ] }),
        /* @__PURE__ */ u.jsx("div", { className: "muted", children: (i == null ? void 0 : i.boost_remaining) != null ? `${ct(i.boost_remaining)} left` : "Time left unknown" })
      ] }),
      /* @__PURE__ */ u.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ u.jsx("button", { disabled: s, onClick: () => d({ type: "hive_local/cancel_boost" }, "Boost cancelled"), children: "Cancel boost" })
    ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("div", { className: "chips", role: "radiogroup", "aria-label": "Boost duration", children: g.map((w) => /* @__PURE__ */ u.jsx("button", { role: "radio", "aria-checked": w === h, className: `chip-btn ${w === h ? "on" : ""}`, onClick: () => y(w), children: ct(w) }, w)) }),
      /* @__PURE__ */ u.jsxs("div", { className: "inline-row", children: [
        !o && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx("span", { className: "muted", children: "Temperature" }),
          /* @__PURE__ */ u.jsx(Xo, { value: x, onChange: (w) => k(p(w)) })
        ] }),
        /* @__PURE__ */ u.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ u.jsxs(
          "button",
          {
            className: "primary",
            disabled: s,
            onClick: () => d(
              { type: "hive_local/boost", minutes: h, ...o ? {} : { temperature: x } },
              `Boosting for ${ct(h)}`
            ),
            children: [
              /* @__PURE__ */ u.jsx(F, { name: "rocket-launch" }),
              " Boost ",
              ct(h)
            ]
          }
        )
      ] })
    ] }),
    a && /* @__PURE__ */ u.jsx("div", { className: `status ${a.kind}`, children: a.text })
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
const ep = '<defs><linearGradient id="hl-mark-g" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#FFB547"/><stop offset="1" stop-color="#FF5A1F"/></linearGradient></defs><polygon points="256,62 452,222 452,446 60,446 60,222" fill="url(#hl-mark-g)" stroke="url(#hl-mark-g)" stroke-width="56" stroke-linejoin="round"/><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" fill="#fff" transform="translate(256 292) scale(10) translate(-12 -12)"/>';
function bs({ size: e = 28 }) {
  return /* @__PURE__ */ u.jsx(
    "svg",
    {
      className: "logo-mark",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      "aria-hidden": "true",
      dangerouslySetInnerHTML: { __html: ep }
    }
  );
}
const ea = 5, tp = 30, np = 135, xc = 270, cl = 80, ta = (e) => Math.min(1, Math.max(0, (e - ea) / (tp - ea)));
function Go(e) {
  const t = (np + xc * e) * Math.PI / 180;
  return { x: 100 + cl * Math.cos(t), y: 100 + cl * Math.sin(t) };
}
function na(e, t) {
  const n = Go(e), r = Go(t), l = xc * (t - e) > 180 ? 1 : 0;
  return `M ${n.x} ${n.y} A ${cl} ${cl} 0 ${l} 1 ${r.x} ${r.y}`;
}
function rp({
  current: e,
  target: t,
  state: n,
  caption: r
}) {
  const l = e != null ? Go(ta(e)) : null;
  return /* @__PURE__ */ u.jsxs("div", { className: `dial ${n}`, children: [
    /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 200 200", role: "img", "aria-label": r, children: [
      /* @__PURE__ */ u.jsx("path", { className: "track", d: na(0, 1) }),
      t != null && n !== "off" && /* @__PURE__ */ u.jsx("path", { className: "value", d: na(0, Math.max(5e-3, ta(t))) }),
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
function lp({
  getHass: e,
  devices: t,
  status: n,
  onOpen: r
}) {
  return /* @__PURE__ */ u.jsx("div", { className: "grid", children: t.flatMap(
    (l) => l.channels.map((o) => {
      var i;
      return /* @__PURE__ */ u.jsx(
        ip,
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
const op = {
  schedule: "calendar-clock",
  manual: "hand-back-right",
  off: "power",
  boost: "rocket-launch"
};
function ip({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  showDevice: l,
  onOpen: o
}) {
  var c;
  const i = n === "water", s = (r == null ? void 0 : r.status) ?? null, { busy: a, result: d, send: v } = yc(e, t.entry_id, n), m = !!s && s.mode !== "off" && s.heating, h = !s || s.mode === "off" ? "off" : m ? "heating" : "idle", y = !i && (s == null ? void 0 : s.setpoint) != null && s.setpoint <= 1, x = i || (s == null ? void 0 : s.setpoint) == null ? null : y ? (r == null ? void 0 : r.frost_temperature) ?? null : s.setpoint, k = [
    { id: "schedule", label: "Schedule" },
    { id: "manual", label: i ? "Always on" : "Manual" },
    { id: "off", label: "Off" }
  ], T = (r == null ? void 0 : r.boost_minutes) ?? 30;
  let f = "Waiting for the receiver…";
  return s && (s.mode === "off" ? f = "Off" : i ? f = m ? "Heating water" : "Not heating" : f = `${m ? "Heating" : "Idle"}${x != null ? ` · ${y ? "frost" : "target"} ${x}°` : ""}`), /* @__PURE__ */ u.jsxs("section", { className: `card channel ${n} ${h}`, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ u.jsx(F, { name: i ? "water-boiler" : "radiator", className: "title-icon" }),
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("h2", { children: gc[n] }),
          l && /* @__PURE__ */ u.jsx("div", { className: "muted small", children: t.name })
        ] })
      ] }),
      s && /* @__PURE__ */ u.jsxs("span", { className: `chip mode-${s.mode}`, children: [
        /* @__PURE__ */ u.jsx(F, { name: op[s.mode] }),
        s.mode === "boost" ? s.boost_remaining != null ? `Boost · ${ct(s.boost_remaining)} left` : "Boost" : (c = k.find((p) => p.id === s.mode)) == null ? void 0 : c.label
      ] })
    ] }),
    i ? /* @__PURE__ */ u.jsxs("div", { className: `water-state ${h}`, children: [
      /* @__PURE__ */ u.jsx("div", { className: "water-orb", children: /* @__PURE__ */ u.jsx(F, { name: h === "off" ? "water-boiler-off" : "water-boiler" }) }),
      /* @__PURE__ */ u.jsx("div", { className: "dial-caption", children: f })
    ] }) : /* @__PURE__ */ u.jsx(rp, { current: (s == null ? void 0 : s.current_temperature) ?? null, target: x, state: h, caption: f }),
    /* @__PURE__ */ u.jsx("div", { className: "segmented full", children: k.map((p) => /* @__PURE__ */ u.jsx(
      "button",
      {
        className: (s == null ? void 0 : s.mode) === p.id ? "on" : "",
        disabled: a || !s,
        onClick: () => v({ type: "hive_local/mode", mode: p.id }, p.id === "schedule" ? "Following the schedule" : p.label),
        children: p.label
      },
      p.id
    )) }),
    /* @__PURE__ */ u.jsxs("div", { className: "card-actions", children: [
      (s == null ? void 0 : s.mode) === "boost" ? /* @__PURE__ */ u.jsxs("button", { className: "boost-btn cancel", disabled: a, onClick: () => v({ type: "hive_local/cancel_boost" }, "Boost cancelled"), children: [
        /* @__PURE__ */ u.jsx(F, { name: "close" }),
        " Cancel boost"
      ] }) : /* @__PURE__ */ u.jsxs(
        "button",
        {
          className: "boost-btn",
          disabled: a || !s,
          onClick: () => v({ type: "hive_local/boost" }, `Boosting for ${ct(T)}`),
          children: [
            /* @__PURE__ */ u.jsx(F, { name: "rocket-launch" }),
            " Boost ",
            ct(T),
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
const sp = {
  heat: { schedule: "Schedule", manual: "Manual", off: "Off", boost: "Boost" },
  water: { schedule: "Schedule", manual: "Always on", off: "Off", boost: "Boost" }
};
function ap(e, t) {
  if (!t) return "Waiting for the receiver…";
  const n = t.mode === "boost" && t.boost_remaining != null ? `Boost · ${ct(t.boost_remaining)} left` : sp[e][t.mode] ?? t.mode;
  return e === "water" ? `${n} · ${t.heating ? "heating water" : "idle"}` : `${t.current_temperature == null ? "–" : `${t.current_temperature.toFixed(1)}°`} · ${n}${t.heating ? " · heating" : ""}`;
}
function up({ devices: e, status: t, channel: n, onOpen: r }) {
  return /* @__PURE__ */ u.jsx("div", { className: "grid", children: e.map((l) => {
    var i, s;
    const o = (s = (i = t[l.entry_id]) == null ? void 0 : i[n]) == null ? void 0 : s.status;
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
const cp = ["monday", "tuesday", "wednesday", "thursday", "friday"], dp = ["saturday", "sunday"], fp = (e) => e[0].toUpperCase() + e.slice(1, 3), dt = (e) => {
  const [t, n] = e.split(":").map(Number);
  return t * 60 + n;
};
function wc({
  getHass: e,
  target: t,
  limits: n
}) {
  const r = t.kind === "room", l = t.kind === "receiver" ? t.channel : "heat", o = r ? "the valves" : "the receiver", i = t.kind === "room" ? t.saved ?? {} : {}, [s, a] = L.useState(i), [d, v] = L.useState(i), [m, h] = L.useState("monday"), [y, x] = L.useState(
    r && Object.keys(i).length ? { kind: "idle", text: "Last schedule written to or read from the valves. Read to check them now." } : { kind: "idle" }
  ), k = t.kind === "receiver" ? `${t.device.entry_id}-${t.channel}` : t.roomId, T = l === "water", f = JSON.stringify(s) !== JSON.stringify(d), c = L.useCallback(async () => {
    x({ kind: "busy", text: r ? "Reading from the valves. They can take up to a minute to wake…" : "Reading from receiver…" });
    try {
      const z = await e().callWS(
        t.kind === "room" ? { type: "hive_local/rooms/schedule/get", room_id: t.roomId } : { type: "hive_local/get", entry_id: t.device.entry_id, channel: l }
      );
      a(z.schedule), v(z.schedule);
      const R = Object.keys(z.schedule).length;
      x(
        z.complete ? { kind: "ok", text: z.valve ? `Schedule read from ${z.valve}` : "Schedule read from receiver" } : R ? { kind: "error", text: `Only got ${R}/7 days — try reading again` } : { kind: "error", text: "No reply. On Zigbee2MQTT, check the receiver's friendly name; on ZHA, check the receiver is online." }
      );
    } catch (z) {
      x({ kind: "error", text: St(z) });
    }
  }, [k, e]);
  L.useEffect(() => {
    (!r || !Object.keys(i).length) && c();
  }, [c]);
  const p = async () => {
    const z = Object.fromEntries(
      Er.filter((R) => {
        var B;
        return JSON.stringify(s[R]) !== JSON.stringify(d[R]) && ((B = s[R]) == null ? void 0 : B.length);
      }).map((R) => [R, s[R]])
    );
    if (Object.keys(z).length) {
      x({ kind: "busy", text: `Writing to ${o}…` });
      try {
        const R = await e().callWS(
          t.kind === "room" ? { type: "hive_local/rooms/schedule/set", room_id: t.roomId, schedule: z } : { type: "hive_local/set", entry_id: t.device.entry_id, channel: l, schedule: z }
        ), B = Object.keys(R.schedule).map((P) => P[0].toUpperCase() + P.slice(1, 3)).join(", "), G = Object.entries(R.results ?? {}).filter(([, P]) => P !== "ok"), me = Object.entries(R.results ?? {}).filter(([, P]) => P === "ok").map(([P]) => P);
        if (R.results && !me.length) {
          x({ kind: "error", text: `No valve took it. ${G.map(([P, M]) => `${P}: ${M}`).join("; ")}` });
          return;
        }
        const j = { ...s, ...R.schedule };
        a(j), v(j), x(
          G.length ? { kind: "error", text: `Wrote ${B} to ${me.join(", ")}, but not ${G.map(([P, M]) => `${P} (${M})`).join(", ")}. Write again once it's awake.` } : { kind: "ok", text: `Wrote ${B}${r ? ` to ${me.join(", ")}` : ""}. Read back to confirm ${o} kept it.` }
        );
      } catch (R) {
        x({ kind: "error", text: St(R) });
      }
    }
  }, g = s[m] ?? [], w = n.max_transitions, N = (z) => a((R) => ({ ...R, [m]: [...z].sort((B, G) => dt(B.time) - dt(G.time)) })), _ = () => {
    const z = g[g.length - 1], R = z ? pp(g, dt(z.time) + 60) : "06:00", B = T ? n.water_on : (z == null ? void 0 : z.setpoint) ?? 20;
    N([...g, { time: R, setpoint: B }]);
  }, E = (z) => a((R) => {
    const B = { ...R };
    for (const G of z) B[G] = g.map((me) => ({ ...me }));
    return B;
  }), D = L.useMemo(() => {
    const z = Object.values(s).flat().map((R) => R.setpoint).filter((R) => R > n.heat_min);
    return { lo: Math.min(15, ...z), hi: Math.max(24, ...z) };
  }, [s, n.heat_min]), $ = Er[((/* @__PURE__ */ new Date()).getDay() + 6) % 7], ke = hp();
  return /* @__PURE__ */ u.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ u.jsxs("section", { className: `card ${l}`, children: [
      /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "title", children: [
          /* @__PURE__ */ u.jsx(F, { name: T ? "water-boiler" : "radiator", className: "title-icon" }),
          /* @__PURE__ */ u.jsxs("div", { children: [
            /* @__PURE__ */ u.jsx("h2", { children: t.kind === "room" ? `${t.name} schedule` : T ? "Hot water schedule" : "Heating schedule" }),
            /* @__PURE__ */ u.jsxs("div", { className: "muted small", children: [
              "Stored on ",
              o,
              ", so it keeps running without HA."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: "toolbar", children: [
          f && /* @__PURE__ */ u.jsx("span", { className: "chip unsaved", children: "Unsaved changes" }),
          /* @__PURE__ */ u.jsxs("button", { onClick: c, disabled: y.kind === "busy", children: [
            /* @__PURE__ */ u.jsx(F, { name: "download" }),
            " Read"
          ] }),
          /* @__PURE__ */ u.jsxs("button", { className: "primary", onClick: p, disabled: !f || y.kind === "busy", children: [
            /* @__PURE__ */ u.jsx(F, { name: "upload" }),
            " ",
            r ? "Write to valves" : "Write to receiver"
          ] })
        ] })
      ] }),
      y.text && /* @__PURE__ */ u.jsx("div", { className: `status ${y.kind}`, children: y.text }),
      /* @__PURE__ */ u.jsxs("div", { className: "week", children: [
        Er.map((z) => /* @__PURE__ */ u.jsxs("button", { className: `row ${z === m ? "selected" : ""}`, onClick: () => h(z), children: [
          /* @__PURE__ */ u.jsx("span", { className: `day ${z === $ ? "today" : ""}`, children: fp(z) }),
          /* @__PURE__ */ u.jsx(
            mp,
            {
              transitions: s[z],
              isWater: T,
              limits: n,
              range: D,
              now: z === $ ? ke : null
            }
          )
        ] }, z)),
        /* @__PURE__ */ u.jsxs("div", { className: "row hours-row", children: [
          /* @__PURE__ */ u.jsx("span", { className: "day" }),
          /* @__PURE__ */ u.jsx("div", { className: "hours", children: [0, 3, 6, 9, 12, 15, 18, 21, 24].map((z) => /* @__PURE__ */ u.jsx("span", { style: { left: `${z / 24 * 100}%` }, children: String(z).padStart(2, "0") }, z)) })
        ] })
      ] }),
      !T && /* @__PURE__ */ u.jsxs("div", { className: "legend", children: [
        /* @__PURE__ */ u.jsx("span", { className: "muted small", children: "Cooler" }),
        /* @__PURE__ */ u.jsx("span", { className: "legend-bar" }),
        /* @__PURE__ */ u.jsx("span", { className: "muted small", children: "Warmer" }),
        /* @__PURE__ */ u.jsx("span", { className: "legend-off" }),
        /* @__PURE__ */ u.jsxs("span", { className: "muted small", children: [
          "Off (",
          n.heat_min,
          "°)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("section", { className: "card", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ u.jsx("h2", { children: m[0].toUpperCase() + m.slice(1) }),
        /* @__PURE__ */ u.jsxs("span", { className: "chip", children: [
          g.length,
          "/",
          w,
          " events"
        ] })
      ] }),
      g.length === 0 && /* @__PURE__ */ u.jsx("p", { className: "muted", children: "No events for this day yet." }),
      /* @__PURE__ */ u.jsx("div", { className: "events", children: g.map((z, R) => /* @__PURE__ */ u.jsxs("div", { className: "transition", children: [
        /* @__PURE__ */ u.jsx(
          "span",
          {
            className: "swatch",
            style: { background: T ? z.setpoint >= n.water_on ? "var(--hl-water)" : "var(--hl-off-fill)" : kc(z.setpoint, D, n) }
          }
        ),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            type: "time",
            value: z.time,
            onChange: (B) => N(g.map((G, me) => me === R ? { ...G, time: B.target.value } : G))
          }
        ),
        T ? /* @__PURE__ */ u.jsxs("div", { className: "segmented", children: [
          ["on", "off"].map((B) => {
            const G = B === "on" ? n.water_on : n.water_off;
            return /* @__PURE__ */ u.jsx(
              "button",
              {
                className: z.setpoint === G ? "on" : "",
                onClick: () => N(g.map((me, j) => j === R ? { ...me, setpoint: G } : me)),
                children: B === "on" ? "On" : "Off"
              },
              B
            );
          }),
          z.setpoint !== n.water_on && z.setpoint !== n.water_off && /* @__PURE__ */ u.jsxs("span", { className: "muted raw", title: "Value read from the receiver doesn't match WATER_ON/WATER_OFF in const.py", children: [
            z.setpoint,
            "°?"
          ] })
        ] }) : /* @__PURE__ */ u.jsxs("div", { className: "stepper", children: [
          /* @__PURE__ */ u.jsx("button", { className: "round", onClick: () => nt(R, -0.5), "aria-label": "Lower", children: /* @__PURE__ */ u.jsx(F, { name: "minus" }) }),
          /* @__PURE__ */ u.jsx("span", { className: "stepper-value", children: z.setpoint <= n.heat_min ? "Off" : `${z.setpoint.toFixed(1)}°` }),
          /* @__PURE__ */ u.jsx("button", { className: "round", onClick: () => nt(R, 0.5), "aria-label": "Raise", children: /* @__PURE__ */ u.jsx(F, { name: "plus" }) })
        ] }),
        /* @__PURE__ */ u.jsx("button", { className: "round danger", onClick: () => N(g.filter((B, G) => G !== R)), "aria-label": "Remove", children: /* @__PURE__ */ u.jsx(F, { name: "delete-outline" }) })
      ] }, R)) }),
      /* @__PURE__ */ u.jsxs("div", { className: "actions", children: [
        /* @__PURE__ */ u.jsxs("button", { onClick: _, disabled: g.length >= w, children: [
          /* @__PURE__ */ u.jsx(F, { name: "plus" }),
          " Add event"
        ] }),
        /* @__PURE__ */ u.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ u.jsx("span", { className: "muted small", children: "Copy this day to" }),
        /* @__PURE__ */ u.jsxs("div", { className: "segmented", children: [
          /* @__PURE__ */ u.jsx("button", { onClick: () => E(cp), disabled: !g.length, children: "Weekdays" }),
          /* @__PURE__ */ u.jsx("button", { onClick: () => E(dp), disabled: !g.length, children: "Weekend" }),
          /* @__PURE__ */ u.jsx("button", { onClick: () => E([...Er]), disabled: !g.length, children: "All" })
        ] })
      ] })
    ] })
  ] });
  function nt(z, R) {
    N(
      g.map(
        (B, G) => G === z ? { ...B, setpoint: Math.min(n.heat_max, Math.max(n.heat_min, Math.round((B.setpoint + R) * 2) / 2)) } : B
      )
    );
  }
}
function pp(e, t) {
  const n = new Set(e.map((l) => dt(l.time)));
  let r = Math.min(t, 23 * 60 + 30);
  for (; n.has(r) && r < 1439; ) r += 15;
  return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function hp() {
  const e = () => {
    const r = /* @__PURE__ */ new Date();
    return r.getHours() * 60 + r.getMinutes();
  }, [t, n] = L.useState(e);
  return L.useEffect(() => {
    const r = setInterval(() => n(e()), 6e4);
    return () => clearInterval(r);
  }, []), t;
}
function kc(e, t, n) {
  if (e <= n.heat_min) return "var(--hl-off-fill)";
  const r = Math.min(1, Math.max(0, (e - t.lo) / Math.max(1, t.hi - t.lo)));
  return `hsl(${Math.round(42 - 34 * r)} ${Math.round(88 + 4 * r)}% ${Math.round(64 - 14 * r)}%)`;
}
function mp({
  transitions: e,
  isWater: t,
  limits: n,
  range: r,
  now: l
}) {
  const o = l != null && /* @__PURE__ */ u.jsx("i", { className: "now", style: { left: `${l / 1440 * 100}%` } });
  if (!(e != null && e.length)) return /* @__PURE__ */ u.jsx("div", { className: "timeline empty", children: o });
  const i = [...e].sort((a, d) => dt(a.time) - dt(d.time)), s = [{ time: "00:00", setpoint: i[i.length - 1].setpoint }, ...i];
  return /* @__PURE__ */ u.jsxs("div", { className: "timeline", children: [
    s.map((a, d) => {
      const v = dt(a.time), m = d + 1 < s.length ? dt(s[d + 1].time) : 1440;
      if (m <= v) return null;
      const h = t ? a.setpoint < n.water_on : a.setpoint <= n.heat_min;
      return /* @__PURE__ */ u.jsx(
        "span",
        {
          className: h ? "off" : "",
          title: `${a.time} → ${t ? h ? "Off" : "On" : h ? "Off" : `${a.setpoint}°`}`,
          style: {
            left: `${v / 1440 * 100}%`,
            width: `${(m - v) / 1440 * 100}%`,
            background: h ? void 0 : t ? "var(--hl-water)" : kc(a.setpoint, r, n)
          },
          children: !t && !h && m - v >= 120 ? `${a.setpoint}°` : ""
        },
        d
      );
    }),
    o
  ] });
}
const vp = 20, dl = (e) => e == null ? "–" : `${e.toFixed(1)}°`;
function gp({ getHass: e, limits: t }) {
  const [n, r] = L.useState(null), [l, o] = L.useState(null), [i, s] = L.useState([]), [a, d] = L.useState(null), [v, m] = L.useState("");
  if (L.useEffect(() => {
    const y = e().connection.subscribeMessage(
      (x) => {
        r(x.rooms), s(x.receivers);
      },
      { type: "hive_local/rooms/subscribe" }
    );
    return y.catch((x) => m(St(x))), () => {
      y.then((x) => x()).catch(() => {
      });
    };
  }, [e]), v) return /* @__PURE__ */ u.jsx("div", { className: "status error", children: v });
  if (!n) return null;
  const h = n.find((y) => y.id === l);
  return h ? /* @__PURE__ */ u.jsxs("section", { className: "receiver-section", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "receiver-crumb", children: [
      /* @__PURE__ */ u.jsxs("button", { className: "ghost", onClick: () => o(null), children: [
        /* @__PURE__ */ u.jsx(F, { name: "chevron-left" }),
        " All rooms"
      ] }),
      /* @__PURE__ */ u.jsx("h2", { children: h.name })
    ] }),
    /* @__PURE__ */ u.jsx(
      wc,
      {
        getHass: e,
        target: { kind: "room", roomId: h.id, name: h.name, saved: h.schedule },
        limits: { ...t, heat_min: t.valve_min, heat_max: t.valve_max }
      },
      h.id
    )
  ] }) : /* @__PURE__ */ u.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "rooms-head", children: [
      /* @__PURE__ */ u.jsx("p", { className: "muted", children: "Group your Hive radiator valves into rooms, on ZHA or Zigbee2MQTT. Add a temperature sensor to a room for a better reading than the valves' own." }),
      a !== "new" && /* @__PURE__ */ u.jsxs("button", { className: "primary", onClick: () => d("new"), children: [
        /* @__PURE__ */ u.jsx(F, { name: "plus" }),
        " Add room"
      ] })
    ] }),
    a === "new" && /* @__PURE__ */ u.jsx(ra, { getHass: e, onDone: () => d(null) }),
    !n.length && a !== "new" && /* @__PURE__ */ u.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ u.jsx(F, { name: "home-thermometer-outline" }),
      /* @__PURE__ */ u.jsx("p", { children: "No rooms yet. Add a room and pick its Hive radiator valves." })
    ] }),
    yp(n, i).map(([y, x]) => /* @__PURE__ */ u.jsxs("section", { className: "zone", children: [
      y && /* @__PURE__ */ u.jsx("h3", { children: y }),
      /* @__PURE__ */ u.jsx("div", { className: "grid", children: x.map(
        (k) => a !== "new" && (a == null ? void 0 : a.id) === k.id ? /* @__PURE__ */ u.jsx(ra, { getHass: e, room: k, onDone: () => d(null) }, k.id) : /* @__PURE__ */ u.jsx(xp, { getHass: e, room: k, onEdit: () => d(k), onSchedule: () => o(k.id) }, k.id)
      ) })
    ] }, y ?? "all"))
  ] });
}
function yp(e, t) {
  if (t.length <= 1) return e.length ? [[null, e]] : [];
  const n = t.map((l) => [`Heated by ${l.name}`, e.filter((o) => o.receiver === l.entry_id)]).filter(([, l]) => l.length), r = e.filter((l) => !t.some((o) => o.entry_id === l.receiver));
  return r.length && n.push(["Receiver not set", r]), n;
}
function xp({ getHass: e, room: t, onEdit: n, onSchedule: r }) {
  var h;
  const [l, o] = L.useState(null), [i, s] = L.useState(null), a = L.useRef(), d = l ?? t.target ?? ((h = t.target_range) == null ? void 0 : h[1]) ?? 20, v = (y) => {
    const x = Math.min(35, Math.max(5, y));
    o(x), s(null), window.clearTimeout(a.current), a.current = window.setTimeout(async () => {
      try {
        const k = await e().callWS({
          type: "hive_local/rooms/set_target",
          room_id: t.id,
          temperature: x
        });
        if (k.failed.length) {
          const T = t.valve_states.filter((f) => k.failed.includes(f.entity_id)).map((f) => f.name);
          s({ kind: "error", text: `Didn't take on ${T.join(", ")}. It may be asleep; try again shortly.` });
        }
      } catch (k) {
        s({ kind: "error", text: St(k) });
      } finally {
        o(null);
      }
    }, 700);
  }, m = t.temperature_source === "sensor" ? t.sensor_name : t.temperature_source === "valves" ? t.valve_states.filter((y) => y.available).length === 1 ? "From the valve" : "Average of the valves" : "No reading";
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
        /* @__PURE__ */ u.jsx("div", { className: "muted small", children: m })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "room-target", children: [
        /* @__PURE__ */ u.jsx("span", { className: "muted small", children: t.target_range && l == null ? `Valves set to ${dl(t.target_range[0])}–${dl(t.target_range[1])}` : "Target" }),
        /* @__PURE__ */ u.jsx(Xo, { value: d, onChange: v })
      ] })
    ] }),
    /* @__PURE__ */ u.jsx("ul", { className: "valves", children: t.valve_states.map((y) => /* @__PURE__ */ u.jsx(wp, { valve: y, heating: t.heating_valves.includes(y.entity_id) }, y.entity_id)) }),
    /* @__PURE__ */ u.jsx("div", { className: "card-actions", children: /* @__PURE__ */ u.jsxs("button", { className: "ghost", onClick: r, children: [
      /* @__PURE__ */ u.jsx(F, { name: "calendar-clock" }),
      " ",
      t.schedule ? "Schedule" : "Set a schedule"
    ] }) }),
    i && /* @__PURE__ */ u.jsx("div", { className: `status ${i.kind}`, children: i.text })
  ] });
}
function wp({ valve: e, heating: t }) {
  const n = e.battery == null ? null : Number(e.battery), r = n != null && !Number.isNaN(n) && n <= vp;
  return /* @__PURE__ */ u.jsxs("li", { className: `valve ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ u.jsx(F, { name: t ? "fire" : "radiator", className: t ? "valve-icon heating" : "valve-icon" }),
    /* @__PURE__ */ u.jsx("span", { className: "valve-name", children: e.name }),
    e.available ? /* @__PURE__ */ u.jsxs("span", { className: "valve-temps", children: [
      dl(e.current_temperature),
      " ",
      /* @__PURE__ */ u.jsxs("span", { className: "muted", children: [
        "→ ",
        dl(e.target)
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
function ra({ getHass: e, room: t, onDone: n }) {
  const [r, l] = L.useState(null), [o, i] = L.useState((t == null ? void 0 : t.receiver) ?? ""), [s, a] = L.useState((t == null ? void 0 : t.name) ?? ""), [d, v] = L.useState(new Set((t == null ? void 0 : t.valves) ?? [])), [m, h] = L.useState((t == null ? void 0 : t.sensor) ?? ""), [y, x] = L.useState(!1), [k, T] = L.useState(!1), [f, c] = L.useState("");
  L.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/candidates" }).then(l).catch((_) => c(St(_)));
  }, [e]);
  const p = ((r == null ? void 0 : r.receivers.length) ?? 0) > 1, g = async (_) => {
    x(!0), c("");
    try {
      await e().callWS(_), n();
    } catch (E) {
      c(St(E)), x(!1);
    }
  }, w = (_) => v((E) => {
    const D = new Set(E);
    return D.has(_) ? D.delete(_) : D.add(_), D;
  }), N = /* @__PURE__ */ new Map();
  for (const _ of (r == null ? void 0 : r.valves) ?? []) N.set(_.area ?? "No area", [...N.get(_.area ?? "No area") ?? [], _]);
  return /* @__PURE__ */ u.jsxs("section", { className: "card room-editor", children: [
    /* @__PURE__ */ u.jsx("h2", { children: t ? `Edit ${t.name}` : "New room" }),
    /* @__PURE__ */ u.jsxs(
      "form",
      {
        className: "stack",
        onSubmit: (_) => {
          _.preventDefault(), g({
            type: "hive_local/rooms/save",
            ...t ? { room_id: t.id } : {},
            name: s,
            valves: [...d],
            sensor: m || null,
            receiver: o || null
          });
        },
        children: [
          /* @__PURE__ */ u.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ u.jsx("span", { children: "Name" }),
            /* @__PURE__ */ u.jsx("input", { id: `room-name-${(t == null ? void 0 : t.id) ?? "new"}`, type: "text", value: s, maxLength: 40, placeholder: "Lounge", onChange: (_) => a(_.target.value) })
          ] }),
          /* @__PURE__ */ u.jsxs("fieldset", { className: "field", children: [
            /* @__PURE__ */ u.jsx("legend", { children: "Hive radiator valves" }),
            !r && !f && /* @__PURE__ */ u.jsx("span", { className: "muted small", children: "Loading…" }),
            r && !r.valves.length && /* @__PURE__ */ u.jsx("span", { className: "muted small", children: "No Hive radiator valves found. Pair them with ZHA or Zigbee2MQTT first." }),
            [...N].map(([_, E]) => /* @__PURE__ */ u.jsxs("div", { className: "checklist", children: [
              /* @__PURE__ */ u.jsx("span", { className: "muted small", children: _ }),
              E.map((D) => /* @__PURE__ */ u.jsxs("label", { className: "pick", children: [
                /* @__PURE__ */ u.jsx("input", { type: "checkbox", checked: d.has(D.entity_id), onChange: () => w(D.entity_id) }),
                " ",
                D.name
              ] }, D.entity_id))
            ] }, _))
          ] }),
          /* @__PURE__ */ u.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ u.jsx("span", { children: "Room temperature from" }),
            /* @__PURE__ */ u.jsxs("select", { id: `room-sensor-${(t == null ? void 0 : t.id) ?? "new"}`, value: m, onChange: (_) => h(_.target.value), children: [
              /* @__PURE__ */ u.jsx("option", { value: "", children: "The valves (their average)" }),
              ((r == null ? void 0 : r.sensors) ?? []).map((_) => /* @__PURE__ */ u.jsxs("option", { value: _.entity_id, children: [
                _.name,
                _.area ? ` · ${_.area}` : ""
              ] }, _.entity_id))
            ] })
          ] }),
          p && /* @__PURE__ */ u.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ u.jsx("span", { children: "Heated by" }),
            /* @__PURE__ */ u.jsxs("select", { id: `room-receiver-${(t == null ? void 0 : t.id) ?? "new"}`, value: o, onChange: (_) => i(_.target.value), children: [
              /* @__PURE__ */ u.jsx("option", { value: "", disabled: !0, children: "Choose the receiver for this room's radiators" }),
              r.receivers.map((_) => /* @__PURE__ */ u.jsx("option", { value: _.entry_id, children: _.name }, _.entry_id))
            ] })
          ] }),
          f && /* @__PURE__ */ u.jsx("div", { className: "status error", children: f }),
          /* @__PURE__ */ u.jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ u.jsx("button", { className: "primary", type: "submit", disabled: y || !s.trim() || !d.size || p && !o, children: t ? "Save" : "Add room" }),
            /* @__PURE__ */ u.jsx("button", { type: "button", className: "ghost", onClick: n, disabled: y, children: "Cancel" }),
            /* @__PURE__ */ u.jsx("span", { className: "spacer" }),
            t && (k ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
              /* @__PURE__ */ u.jsxs("span", { className: "muted small", children: [
                "Delete ",
                t.name,
                "? The valves aren't changed."
              ] }),
              /* @__PURE__ */ u.jsx("button", { type: "button", className: "danger", disabled: y, onClick: () => g({ type: "hive_local/rooms/delete", room_id: t.id }), children: "Delete" }),
              /* @__PURE__ */ u.jsx("button", { type: "button", className: "ghost", onClick: () => T(!1), children: "Keep" })
            ] }) : /* @__PURE__ */ u.jsxs("button", { type: "button", className: "danger", onClick: () => T(!0), disabled: y, children: [
              /* @__PURE__ */ u.jsx(F, { name: "delete-outline" }),
              " Delete room"
            ] }))
          ] })
        ]
      }
    )
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
  const [r, l] = L.useState([]), [o, i] = L.useState(null), [s, a] = L.useState({}), [d, v] = L.useState("overview"), [m, h] = L.useState(null), [y, x] = L.useState("");
  L.useEffect(() => {
    e().callWS({ type: "hive_local/devices" }).then((p) => {
      l(p.devices), i(p.limits);
    }).catch((p) => x(St(p)));
    const c = e().connection.subscribeMessage(
      (p) => a(p.status),
      { type: "hive_local/subscribe" }
    );
    return () => {
      c.then((p) => p()).catch(() => {
      });
    };
  }, [e]);
  const k = (c, p, g) => {
    if (c.length <= 1)
      return c.map((N) => /* @__PURE__ */ u.jsxs("section", { className: "receiver-section", children: [
        r.length > 1 && /* @__PURE__ */ u.jsx("div", { className: "receiver-crumb", children: /* @__PURE__ */ u.jsx("h2", { children: N.name }) }),
        g(N)
      ] }, N.entry_id));
    const w = c.find((N) => N.entry_id === m);
    return w ? /* @__PURE__ */ u.jsxs("section", { className: "receiver-section", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "receiver-crumb", children: [
        /* @__PURE__ */ u.jsxs("button", { className: "ghost", onClick: () => h(null), children: [
          /* @__PURE__ */ u.jsx(F, { name: "chevron-left" }),
          " All receivers"
        ] }),
        /* @__PURE__ */ u.jsx("h2", { children: w.name })
      ] }),
      g(w)
    ] }) : /* @__PURE__ */ u.jsx(up, { devices: c, status: s, channel: p, onOpen: h });
  }, T = r.some((c) => c.channels.includes("water")), f = kp.filter((c) => c.id !== "water" || T);
  return /* @__PURE__ */ u.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ u.jsxs("header", { children: [
      /* @__PURE__ */ u.jsxs("div", { className: "toolbar-row", children: [
        t && /* @__PURE__ */ u.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ u.jsx(F, { name: "menu" }) }),
        /* @__PURE__ */ u.jsx(bs, {}),
        /* @__PURE__ */ u.jsx("h1", { children: "Hive Local" }),
        /* @__PURE__ */ u.jsx("span", { className: "spacer" })
      ] }),
      /* @__PURE__ */ u.jsx("nav", { className: "tabs", role: "tablist", children: f.map((c) => /* @__PURE__ */ u.jsxs("button", { role: "tab", "aria-selected": c.id === d, className: c.id === d ? "on" : "", onClick: () => v(c.id), children: [
        /* @__PURE__ */ u.jsx(F, { name: c.icon }),
        /* @__PURE__ */ u.jsx("span", { children: c.label })
      ] }, c.id)) })
    ] }),
    /* @__PURE__ */ u.jsxs("main", { children: [
      y && /* @__PURE__ */ u.jsx("div", { className: "status error", children: y }),
      !r.length && !y && /* @__PURE__ */ u.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ u.jsx(bs, { size: 56 }),
        /* @__PURE__ */ u.jsx("p", { children: "No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local." })
      ] }),
      d === "overview" && /* @__PURE__ */ u.jsx(lp, { getHass: e, devices: r, status: s, onOpen: (c) => {
        v("controls"), h(c);
      } }),
      d === "rooms" && r.length > 0 && o && /* @__PURE__ */ u.jsx(gp, { getHass: e, limits: o }),
      (d === "heat" || d === "water") && o && k(
        r.filter((c) => c.channels.includes(d)),
        d,
        (c) => /* @__PURE__ */ u.jsx(wc, { getHass: e, target: { kind: "receiver", device: c, channel: d }, limits: o }, `${c.entry_id}-${d}`)
      ),
      d === "controls" && o && k(r, "heat", (c) => /* @__PURE__ */ u.jsx(qf, { getHass: e, device: c, limits: o, status: s[c.entry_id] ?? {} }))
    ] })
  ] });
}
const _p = (
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
class Np extends HTMLElement {
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
      r.textContent = _p;
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
customElements.get("hive-local-panel") || customElements.define("hive-local-panel", Np);
