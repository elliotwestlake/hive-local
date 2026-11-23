var Cc = Object.defineProperty;
var Ec = (e, t, n) => t in e ? Cc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var pr = (e, t, n) => Ec(e, typeof t != "symbol" ? t + "" : t, n);
var sa = { exports: {} }, vl = {}, aa = { exports: {} }, F = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sr = Symbol.for("react.element"), bc = Symbol.for("react.portal"), zc = Symbol.for("react.fragment"), Pc = Symbol.for("react.strict_mode"), Tc = Symbol.for("react.profiler"), $c = Symbol.for("react.provider"), Lc = Symbol.for("react.context"), Mc = Symbol.for("react.forward_ref"), Rc = Symbol.for("react.suspense"), Oc = Symbol.for("react.memo"), Dc = Symbol.for("react.lazy"), Xi = Symbol.iterator;
function Fc(e) {
  return e === null || typeof e != "object" ? null : (e = Xi && e[Xi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ua = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ca = Object.assign, da = {};
function xn(e, t, n) {
  this.props = e, this.context = t, this.refs = da, this.updater = n || ua;
}
xn.prototype.isReactComponent = {};
xn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
xn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function fa() {
}
fa.prototype = xn.prototype;
function ti(e, t, n) {
  this.props = e, this.context = t, this.refs = da, this.updater = n || ua;
}
var ni = ti.prototype = new fa();
ni.constructor = ti;
ca(ni, xn.prototype);
ni.isPureReactComponent = !0;
var Zi = Array.isArray, pa = Object.prototype.hasOwnProperty, ri = { current: null }, ha = { key: !0, ref: !0, __self: !0, __source: !0 };
function ma(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) pa.call(t, r) && !ha.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var a = Array(u), c = 0; c < u; c++) a[c] = arguments[c + 2];
    l.children = a;
  }
  if (e && e.defaultProps) for (r in u = e.defaultProps, u) l[r] === void 0 && (l[r] = u[r]);
  return { $$typeof: sr, type: e, key: o, ref: i, props: l, _owner: ri.current };
}
function Ic(e, t) {
  return { $$typeof: sr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function li(e) {
  return typeof e == "object" && e !== null && e.$$typeof === sr;
}
function Ac(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Gi = /\/+/g;
function Ml(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Ac("" + e.key) : t.toString(36);
}
function $r(e, t, n, r, l) {
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
        case sr:
        case bc:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + Ml(i, 0) : r, Zi(l) ? (n = "", e != null && (n = e.replace(Gi, "$&/") + "/"), $r(l, t, n, "", function(c) {
    return c;
  })) : l != null && (li(l) && (l = Ic(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Gi, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Zi(e)) for (var u = 0; u < e.length; u++) {
    o = e[u];
    var a = r + Ml(o, u);
    i += $r(o, t, n, a, l);
  }
  else if (a = Fc(e), typeof a == "function") for (e = a.call(e), u = 0; !(o = e.next()).done; ) o = o.value, a = r + Ml(o, u++), i += $r(o, t, n, a, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function hr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return $r(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Uc(e) {
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
var he = { current: null }, Lr = { transition: null }, Bc = { ReactCurrentDispatcher: he, ReactCurrentBatchConfig: Lr, ReactCurrentOwner: ri };
function ga() {
  throw Error("act(...) is not supported in production builds of React.");
}
F.Children = { map: hr, forEach: function(e, t, n) {
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
F.Component = xn;
F.Fragment = zc;
F.Profiler = Tc;
F.PureComponent = ti;
F.StrictMode = Pc;
F.Suspense = Rc;
F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bc;
F.act = ga;
F.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = ca({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = ri.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (a in t) pa.call(t, a) && !ha.hasOwnProperty(a) && (r[a] = t[a] === void 0 && u !== void 0 ? u[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    u = Array(a);
    for (var c = 0; c < a; c++) u[c] = arguments[c + 2];
    r.children = u;
  }
  return { $$typeof: sr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
F.createContext = function(e) {
  return e = { $$typeof: Lc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: $c, _context: e }, e.Consumer = e;
};
F.createElement = ma;
F.createFactory = function(e) {
  var t = ma.bind(null, e);
  return t.type = e, t;
};
F.createRef = function() {
  return { current: null };
};
F.forwardRef = function(e) {
  return { $$typeof: Mc, render: e };
};
F.isValidElement = li;
F.lazy = function(e) {
  return { $$typeof: Dc, _payload: { _status: -1, _result: e }, _init: Uc };
};
F.memo = function(e, t) {
  return { $$typeof: Oc, type: e, compare: t === void 0 ? null : t };
};
F.startTransition = function(e) {
  var t = Lr.transition;
  Lr.transition = {};
  try {
    e();
  } finally {
    Lr.transition = t;
  }
};
F.unstable_act = ga;
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
aa.exports = F;
var C = aa.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hc = C, Vc = Symbol.for("react.element"), Wc = Symbol.for("react.fragment"), Qc = Object.prototype.hasOwnProperty, Kc = Hc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Yc = { key: !0, ref: !0, __self: !0, __source: !0 };
function va(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) Qc.call(t, r) && !Yc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Vc, type: e, key: o, ref: i, props: l, _owner: Kc.current };
}
vl.Fragment = Wc;
vl.jsx = va;
vl.jsxs = va;
sa.exports = vl;
var s = sa.exports, xa = { exports: {} }, Ce = {}, ya = { exports: {} }, wa = {};
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
  function t(E, O) {
    var S = E.length;
    E.push(O);
    e: for (; 0 < S; ) {
      var $ = S - 1 >>> 1, D = E[$];
      if (0 < l(D, O)) E[$] = O, E[S] = D, S = $;
      else break e;
    }
  }
  function n(E) {
    return E.length === 0 ? null : E[0];
  }
  function r(E) {
    if (E.length === 0) return null;
    var O = E[0], S = E.pop();
    if (S !== O) {
      E[0] = S;
      e: for (var $ = 0, D = E.length, ie = D >>> 1; $ < ie; ) {
        var ee = 2 * ($ + 1) - 1, Vt = E[ee], Be = ee + 1, A = E[Be];
        if (0 > l(Vt, S)) Be < D && 0 > l(A, Vt) ? (E[$] = A, E[Be] = S, $ = Be) : (E[$] = Vt, E[ee] = S, $ = ee);
        else if (Be < D && 0 > l(A, S)) E[$] = A, E[Be] = S, $ = Be;
        else break e;
      }
    }
    return O;
  }
  function l(E, O) {
    var S = E.sortIndex - O.sortIndex;
    return S !== 0 ? S : E.id - O.id;
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
  var a = [], c = [], v = 1, h = null, g = 3, m = !1, x = !1, y = !1, T = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function f(E) {
    for (var O = n(c); O !== null; ) {
      if (O.callback === null) r(c);
      else if (O.startTime <= E) r(c), O.sortIndex = O.expirationTime, t(a, O);
      else break;
      O = n(c);
    }
  }
  function w(E) {
    if (y = !1, f(E), !x) if (n(a) !== null) x = !0, ot(N);
    else {
      var O = n(c);
      O !== null && Et(w, O.startTime - E);
    }
  }
  function N(E, O) {
    x = !1, y && (y = !1, p(k), k = -1), m = !0;
    var S = g;
    try {
      for (f(O), h = n(a); h !== null && (!(h.expirationTime > O) || E && !M()); ) {
        var $ = h.callback;
        if (typeof $ == "function") {
          h.callback = null, g = h.priorityLevel;
          var D = $(h.expirationTime <= O);
          O = e.unstable_now(), typeof D == "function" ? h.callback = D : h === n(a) && r(a), f(O);
        } else r(a);
        h = n(a);
      }
      if (h !== null) var ie = !0;
      else {
        var ee = n(c);
        ee !== null && Et(w, ee.startTime - O), ie = !1;
      }
      return ie;
    } finally {
      h = null, g = S, m = !1;
    }
  }
  var _ = !1, b = null, k = -1, R = 5, L = -1;
  function M() {
    return !(e.unstable_now() - L < R);
  }
  function ge() {
    if (b !== null) {
      var E = e.unstable_now();
      L = E;
      var O = !0;
      try {
        O = b(!0, E);
      } finally {
        O ? de() : (_ = !1, b = null);
      }
    } else _ = !1;
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
    T(ge, 0);
  };
  function ot(E) {
    b = E, _ || (_ = !0, de());
  }
  function Et(E, O) {
    k = T(function() {
      E(e.unstable_now());
    }, O);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(E) {
    E.callback = null;
  }, e.unstable_continueExecution = function() {
    x || m || (x = !0, ot(N));
  }, e.unstable_forceFrameRate = function(E) {
    0 > E || 125 < E ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : R = 0 < E ? Math.floor(1e3 / E) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return g;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(a);
  }, e.unstable_next = function(E) {
    switch (g) {
      case 1:
      case 2:
      case 3:
        var O = 3;
        break;
      default:
        O = g;
    }
    var S = g;
    g = O;
    try {
      return E();
    } finally {
      g = S;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(E, O) {
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
    var S = g;
    g = E;
    try {
      return O();
    } finally {
      g = S;
    }
  }, e.unstable_scheduleCallback = function(E, O, S) {
    var $ = e.unstable_now();
    switch (typeof S == "object" && S !== null ? (S = S.delay, S = typeof S == "number" && 0 < S ? $ + S : $) : S = $, E) {
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
    return D = S + D, E = { id: v++, callback: O, priorityLevel: E, startTime: S, expirationTime: D, sortIndex: -1 }, S > $ ? (E.sortIndex = S, t(c, E), n(a) === null && E === n(c) && (y ? (p(k), k = -1) : y = !0, Et(w, S - $))) : (E.sortIndex = D, t(a, E), x || m || (x = !0, ot(N))), E;
  }, e.unstable_shouldYield = M, e.unstable_wrapCallback = function(E) {
    var O = g;
    return function() {
      var S = g;
      g = O;
      try {
        return E.apply(this, arguments);
      } finally {
        g = S;
      }
    };
  };
})(wa);
ya.exports = wa;
var Xc = ya.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zc = C, _e = Xc;
function j(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ka = /* @__PURE__ */ new Set(), Vn = {};
function Bt(e, t) {
  dn(e, t), dn(e + "Capture", t);
}
function dn(e, t) {
  for (Vn[e] = t, e = 0; e < t.length; e++) ka.add(t[e]);
}
var qe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), so = Object.prototype.hasOwnProperty, Gc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ji = {}, qi = {};
function Jc(e) {
  return so.call(qi, e) ? !0 : so.call(Ji, e) ? !1 : Gc.test(e) ? qi[e] = !0 : (Ji[e] = !0, !1);
}
function qc(e, t, n, r) {
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
function ed(e, t, n, r) {
  if (t === null || typeof t > "u" || qc(e, t, n, r)) return !0;
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
var oe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  oe[e] = new me(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  oe[t] = new me(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  oe[e] = new me(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  oe[e] = new me(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  oe[e] = new me(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  oe[e] = new me(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  oe[e] = new me(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  oe[e] = new me(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  oe[e] = new me(e, 5, !1, e.toLowerCase(), null, !1, !1);
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
  oe[t] = new me(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(oi, ii);
  oe[t] = new me(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(oi, ii);
  oe[t] = new me(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  oe[e] = new me(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
oe.xlinkHref = new me("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  oe[e] = new me(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function si(e, t, n, r) {
  var l = oe.hasOwnProperty(t) ? oe[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (ed(t, n, l, r) && (n = null), r || l === null ? Jc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var rt = Zc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, mr = Symbol.for("react.element"), Qt = Symbol.for("react.portal"), Kt = Symbol.for("react.fragment"), ai = Symbol.for("react.strict_mode"), ao = Symbol.for("react.profiler"), ja = Symbol.for("react.provider"), Sa = Symbol.for("react.context"), ui = Symbol.for("react.forward_ref"), uo = Symbol.for("react.suspense"), co = Symbol.for("react.suspense_list"), ci = Symbol.for("react.memo"), st = Symbol.for("react.lazy"), Na = Symbol.for("react.offscreen"), es = Symbol.iterator;
function kn(e) {
  return e === null || typeof e != "object" ? null : (e = es && e[es] || e["@@iterator"], typeof e == "function" ? e : null);
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
  return (e = e ? e.displayName || e.name : "") ? Pn(e) : "";
}
function td(e) {
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
    case ai:
      return "StrictMode";
    case uo:
      return "Suspense";
    case co:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Sa:
      return (e.displayName || "Context") + ".Consumer";
    case ja:
      return (e._context.displayName || "Context") + ".Provider";
    case ui:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case ci:
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
function nd(e) {
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
      return t === ai ? "StrictMode" : "Mode";
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
function _a(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function rd(e) {
  var t = _a(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
  e._valueTracker || (e._valueTracker = rd(e));
}
function Ca(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = _a(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
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
function ts(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = kt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Ea(e, t) {
  t = t.checked, t != null && si(e, "checked", t, !1);
}
function ho(e, t) {
  Ea(e, t);
  var n = kt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? mo(e, t.type, n) : t.hasOwnProperty("defaultValue") && mo(e, t.type, kt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function ns(e, t, n) {
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
function go(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(j(91));
  return Y({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function rs(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(j(92));
      if (Tn(n)) {
        if (1 < n.length) throw Error(j(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: kt(n) };
}
function ba(e, t) {
  var n = kt(t.value), r = kt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ls(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function za(e) {
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
  return e == null || e === "http://www.w3.org/1999/xhtml" ? za(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var vr, Pa = function(e) {
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
}, ld = ["Webkit", "ms", "Moz", "O"];
Object.keys(Mn).forEach(function(e) {
  ld.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Mn[t] = Mn[e];
  });
});
function Ta(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Mn.hasOwnProperty(e) && Mn[e] ? ("" + t).trim() : t + "px";
}
function $a(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Ta(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var od = Y({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function xo(e, t) {
  if (t) {
    if (od[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(j(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(j(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(j(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(j(62));
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
var ko = null, on = null, sn = null;
function os(e) {
  if (e = cr(e)) {
    if (typeof ko != "function") throw Error(j(280));
    var t = e.stateNode;
    t && (t = jl(t), ko(e.stateNode, e.type, t));
  }
}
function La(e) {
  on ? sn ? sn.push(e) : sn = [e] : on = e;
}
function Ma() {
  if (on) {
    var e = on, t = sn;
    if (sn = on = null, os(e), t) for (e = 0; e < t.length; e++) os(t[e]);
  }
}
function Ra(e, t) {
  return e(t);
}
function Oa() {
}
var Fl = !1;
function Da(e, t, n) {
  if (Fl) return e(t, n);
  Fl = !0;
  try {
    return Ra(e, t, n);
  } finally {
    Fl = !1, (on !== null || sn !== null) && (Oa(), Ma());
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
  if (n && typeof n != "function") throw Error(j(231, t, typeof n));
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
function id(e, t, n, r, l, o, i, u, a) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (v) {
    this.onError(v);
  }
}
var Rn = !1, Kr = null, Yr = !1, So = null, sd = { onError: function(e) {
  Rn = !0, Kr = e;
} };
function ad(e, t, n, r, l, o, i, u, a) {
  Rn = !1, Kr = null, id.apply(sd, arguments);
}
function ud(e, t, n, r, l, o, i, u, a) {
  if (ad.apply(this, arguments), Rn) {
    if (Rn) {
      var c = Kr;
      Rn = !1, Kr = null;
    } else throw Error(j(198));
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
function Fa(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function is(e) {
  if (Ht(e) !== e) throw Error(j(188));
}
function cd(e) {
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
        if (!i) throw Error(j(189));
      }
    }
    if (n.alternate !== r) throw Error(j(190));
  }
  if (n.tag !== 3) throw Error(j(188));
  return n.stateNode.current === n ? e : t;
}
function Ia(e) {
  return e = cd(e), e !== null ? Aa(e) : null;
}
function Aa(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Aa(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Ua = _e.unstable_scheduleCallback, ss = _e.unstable_cancelCallback, dd = _e.unstable_shouldYield, fd = _e.unstable_requestPaint, Z = _e.unstable_now, pd = _e.unstable_getCurrentPriorityLevel, fi = _e.unstable_ImmediatePriority, Ba = _e.unstable_UserBlockingPriority, Xr = _e.unstable_NormalPriority, hd = _e.unstable_LowPriority, Ha = _e.unstable_IdlePriority, xl = null, Qe = null;
function md(e) {
  if (Qe && typeof Qe.onCommitFiberRoot == "function") try {
    Qe.onCommitFiberRoot(xl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ie = Math.clz32 ? Math.clz32 : xd, gd = Math.log, vd = Math.LN2;
function xd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (gd(e) / vd | 0) | 0;
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
function Zr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var u = i & ~l;
    u !== 0 ? r = $n(u) : (o &= i, o !== 0 && (r = $n(o)));
  } else i = n & ~l, i !== 0 ? r = $n(i) : o !== 0 && (r = $n(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Ie(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function yd(e, t) {
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
function wd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - Ie(o), u = 1 << i, a = l[i];
    a === -1 ? (!(u & n) || u & r) && (l[i] = yd(u, t)) : a <= t && (e.expiredLanes |= u), o &= ~u;
  }
}
function No(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Va() {
  var e = xr;
  return xr <<= 1, !(xr & 4194240) && (xr = 64), e;
}
function Il(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ar(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ie(t), e[t] = n;
}
function kd(e, t) {
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
function Wa(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Qa, hi, Ka, Ya, Xa, _o = !1, wr = [], pt = null, ht = null, mt = null, Kn = /* @__PURE__ */ new Map(), Yn = /* @__PURE__ */ new Map(), ut = [], jd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
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
function Sd(e, t, n, r, l) {
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
function Za(e) {
  var t = Tt(e.target);
  if (t !== null) {
    var n = Ht(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Fa(n), t !== null) {
          e.blockedOn = t, Xa(e.priority, function() {
            Ka(n);
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
function us(e, t, n) {
  Mr(e) && n.delete(t);
}
function Nd() {
  _o = !1, pt !== null && Mr(pt) && (pt = null), ht !== null && Mr(ht) && (ht = null), mt !== null && Mr(mt) && (mt = null), Kn.forEach(us), Yn.forEach(us);
}
function Nn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, _o || (_o = !0, _e.unstable_scheduleCallback(_e.unstable_NormalPriority, Nd)));
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
  for (; 0 < ut.length && (n = ut[0], n.blockedOn === null); ) Za(n), n.blockedOn === null && ut.shift();
}
var an = rt.ReactCurrentBatchConfig, Gr = !0;
function _d(e, t, n, r) {
  var l = U, o = an.transition;
  an.transition = null;
  try {
    U = 1, mi(e, t, n, r);
  } finally {
    U = l, an.transition = o;
  }
}
function Cd(e, t, n, r) {
  var l = U, o = an.transition;
  an.transition = null;
  try {
    U = 4, mi(e, t, n, r);
  } finally {
    U = l, an.transition = o;
  }
}
function mi(e, t, n, r) {
  if (Gr) {
    var l = Co(e, t, n, r);
    if (l === null) Xl(e, t, r, Jr, n), as(e, r);
    else if (Sd(l, e, t, n, r)) r.stopPropagation();
    else if (as(e, r), t & 4 && -1 < jd.indexOf(e)) {
      for (; l !== null; ) {
        var o = cr(l);
        if (o !== null && Qa(o), o = Co(e, t, n, r), o === null && Xl(e, t, r, Jr, n), o === l) break;
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
    if (e = Fa(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Jr = e, null;
}
function Ga(e) {
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
      switch (pd()) {
        case fi:
          return 1;
        case Ba:
          return 4;
        case Xr:
        case hd:
          return 16;
        case Ha:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var dt = null, gi = null, Rr = null;
function Ja() {
  if (Rr) return Rr;
  var e, t = gi, n = t.length, r, l = "value" in dt ? dt.value : dt.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return Rr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Or(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function kr() {
  return !0;
}
function cs() {
  return !1;
}
function Ee(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(o) : o[u]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? kr : cs, this.isPropagationStopped = cs, this;
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
}, defaultPrevented: 0, isTrusted: 0 }, vi = Ee(yn), ur = Y({}, yn, { view: 0, detail: 0 }), Ed = Ee(ur), Al, Ul, _n, yl = Y({}, ur, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: xi, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== _n && (_n && e.type === "mousemove" ? (Al = e.screenX - _n.screenX, Ul = e.screenY - _n.screenY) : Ul = Al = 0, _n = e), Al);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ul;
} }), ds = Ee(yl), bd = Y({}, yl, { dataTransfer: 0 }), zd = Ee(bd), Pd = Y({}, ur, { relatedTarget: 0 }), Bl = Ee(Pd), Td = Y({}, yn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), $d = Ee(Td), Ld = Y({}, yn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Md = Ee(Ld), Rd = Y({}, yn, { data: 0 }), fs = Ee(Rd), Od = {
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
}, Dd = {
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
}, Fd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Id(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Fd[e]) ? !!t[e] : !1;
}
function xi() {
  return Id;
}
var Ad = Y({}, ur, { key: function(e) {
  if (e.key) {
    var t = Od[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Or(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Dd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: xi, charCode: function(e) {
  return e.type === "keypress" ? Or(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Or(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Ud = Ee(Ad), Bd = Y({}, yl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ps = Ee(Bd), Hd = Y({}, ur, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: xi }), Vd = Ee(Hd), Wd = Y({}, yn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Qd = Ee(Wd), Kd = Y({}, yl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Yd = Ee(Kd), Xd = [9, 13, 27, 32], yi = qe && "CompositionEvent" in window, On = null;
qe && "documentMode" in document && (On = document.documentMode);
var Zd = qe && "TextEvent" in window && !On, qa = qe && (!yi || On && 8 < On && 11 >= On), hs = " ", ms = !1;
function eu(e, t) {
  switch (e) {
    case "keyup":
      return Xd.indexOf(t.keyCode) !== -1;
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
function Gd(e, t) {
  switch (e) {
    case "compositionend":
      return tu(t);
    case "keypress":
      return t.which !== 32 ? null : (ms = !0, hs);
    case "textInput":
      return e = t.data, e === hs && ms ? null : e;
    default:
      return null;
  }
}
function Jd(e, t) {
  if (Yt) return e === "compositionend" || !yi && eu(e, t) ? (e = Ja(), Rr = gi = dt = null, Yt = !1, e) : null;
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
      return qa && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var qd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function gs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!qd[e.type] : t === "textarea";
}
function nu(e, t, n, r) {
  La(r), t = qr(t, "onChange"), 0 < t.length && (n = new vi("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Dn = null, Zn = null;
function ef(e) {
  pu(e, 0);
}
function wl(e) {
  var t = Gt(e);
  if (Ca(t)) return e;
}
function tf(e, t) {
  if (e === "change") return t;
}
var ru = !1;
if (qe) {
  var Hl;
  if (qe) {
    var Vl = "oninput" in document;
    if (!Vl) {
      var vs = document.createElement("div");
      vs.setAttribute("oninput", "return;"), Vl = typeof vs.oninput == "function";
    }
    Hl = Vl;
  } else Hl = !1;
  ru = Hl && (!document.documentMode || 9 < document.documentMode);
}
function xs() {
  Dn && (Dn.detachEvent("onpropertychange", lu), Zn = Dn = null);
}
function lu(e) {
  if (e.propertyName === "value" && wl(Zn)) {
    var t = [];
    nu(t, Zn, e, di(e)), Da(ef, t);
  }
}
function nf(e, t, n) {
  e === "focusin" ? (xs(), Dn = t, Zn = n, Dn.attachEvent("onpropertychange", lu)) : e === "focusout" && xs();
}
function rf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return wl(Zn);
}
function lf(e, t) {
  if (e === "click") return wl(t);
}
function of(e, t) {
  if (e === "input" || e === "change") return wl(t);
}
function sf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ue = typeof Object.is == "function" ? Object.is : sf;
function Gn(e, t) {
  if (Ue(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!so.call(t, l) || !Ue(e[l], t[l])) return !1;
  }
  return !0;
}
function ys(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ws(e, t) {
  var n = ys(e);
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
    n = ys(n);
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
function af(e) {
  var t = iu(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && ou(n.ownerDocument.documentElement, n)) {
    if (r !== null && wi(n)) {
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
var uf = qe && "documentMode" in document && 11 >= document.documentMode, Xt = null, Eo = null, Fn = null, bo = !1;
function ks(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  bo || Xt == null || Xt !== Qr(r) || (r = Xt, "selectionStart" in r && wi(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Fn && Gn(Fn, r) || (Fn = r, r = qr(Eo, "onSelect"), 0 < r.length && (t = new vi("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Xt)));
}
function jr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Zt = { animationend: jr("Animation", "AnimationEnd"), animationiteration: jr("Animation", "AnimationIteration"), animationstart: jr("Animation", "AnimationStart"), transitionend: jr("Transition", "TransitionEnd") }, Wl = {}, su = {};
qe && (su = document.createElement("div").style, "AnimationEvent" in window || (delete Zt.animationend.animation, delete Zt.animationiteration.animation, delete Zt.animationstart.animation), "TransitionEvent" in window || delete Zt.transitionend.transition);
function kl(e) {
  if (Wl[e]) return Wl[e];
  if (!Zt[e]) return e;
  var t = Zt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in su) return Wl[e] = t[n];
  return e;
}
var au = kl("animationend"), uu = kl("animationiteration"), cu = kl("animationstart"), du = kl("transitionend"), fu = /* @__PURE__ */ new Map(), js = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function St(e, t) {
  fu.set(e, t), Bt(t, [e]);
}
for (var Ql = 0; Ql < js.length; Ql++) {
  var Kl = js[Ql], cf = Kl.toLowerCase(), df = Kl[0].toUpperCase() + Kl.slice(1);
  St(cf, "on" + df);
}
St(au, "onAnimationEnd");
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
var Ln = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), ff = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ln));
function Ss(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, ud(r, t, void 0, e), e.currentTarget = null;
}
function pu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var u = r[i], a = u.instance, c = u.currentTarget;
        if (u = u.listener, a !== o && l.isPropagationStopped()) break e;
        Ss(l, u, c), o = a;
      }
      else for (i = 0; i < r.length; i++) {
        if (u = r[i], a = u.instance, c = u.currentTarget, u = u.listener, a !== o && l.isPropagationStopped()) break e;
        Ss(l, u, c), o = a;
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
    e[Sr] = !0, ka.forEach(function(n) {
      n !== "selectionchange" && (ff.has(n) || Yl(n, !1, e), Yl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Sr] || (t[Sr] = !0, Yl("selectionchange", !1, t));
  }
}
function hu(e, t, n, r) {
  switch (Ga(t)) {
    case 1:
      var l = _d;
      break;
    case 4:
      l = Cd;
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
        if (i = Tt(u), i === null) return;
        if (a = i.tag, a === 5 || a === 6) {
          r = o = i;
          continue e;
        }
        u = u.parentNode;
      }
    }
    r = r.return;
  }
  Da(function() {
    var c = o, v = di(n), h = [];
    e: {
      var g = fu.get(e);
      if (g !== void 0) {
        var m = vi, x = e;
        switch (e) {
          case "keypress":
            if (Or(n) === 0) break e;
          case "keydown":
          case "keyup":
            m = Ud;
            break;
          case "focusin":
            x = "focus", m = Bl;
            break;
          case "focusout":
            x = "blur", m = Bl;
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
            m = ds;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            m = zd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = Vd;
            break;
          case au:
          case uu:
          case cu:
            m = $d;
            break;
          case du:
            m = Qd;
            break;
          case "scroll":
            m = Ed;
            break;
          case "wheel":
            m = Yd;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = Md;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            m = ps;
        }
        var y = (t & 4) !== 0, T = !y && e === "scroll", p = y ? g !== null ? g + "Capture" : null : g;
        y = [];
        for (var d = c, f; d !== null; ) {
          f = d;
          var w = f.stateNode;
          if (f.tag === 5 && w !== null && (f = w, p !== null && (w = Qn(d, p), w != null && y.push(qn(d, w, f)))), T) break;
          d = d.return;
        }
        0 < y.length && (g = new m(g, x, null, n, v), h.push({ event: g, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (g = e === "mouseover" || e === "pointerover", m = e === "mouseout" || e === "pointerout", g && n !== wo && (x = n.relatedTarget || n.fromElement) && (Tt(x) || x[et])) break e;
        if ((m || g) && (g = v.window === v ? v : (g = v.ownerDocument) ? g.defaultView || g.parentWindow : window, m ? (x = n.relatedTarget || n.toElement, m = c, x = x ? Tt(x) : null, x !== null && (T = Ht(x), x !== T || x.tag !== 5 && x.tag !== 6) && (x = null)) : (m = null, x = c), m !== x)) {
          if (y = ds, w = "onMouseLeave", p = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (y = ps, w = "onPointerLeave", p = "onPointerEnter", d = "pointer"), T = m == null ? g : Gt(m), f = x == null ? g : Gt(x), g = new y(w, d + "leave", m, n, v), g.target = T, g.relatedTarget = f, w = null, Tt(v) === c && (y = new y(p, d + "enter", x, n, v), y.target = f, y.relatedTarget = T, w = y), T = w, m && x) t: {
            for (y = m, p = x, d = 0, f = y; f; f = Wt(f)) d++;
            for (f = 0, w = p; w; w = Wt(w)) f++;
            for (; 0 < d - f; ) y = Wt(y), d--;
            for (; 0 < f - d; ) p = Wt(p), f--;
            for (; d--; ) {
              if (y === p || p !== null && y === p.alternate) break t;
              y = Wt(y), p = Wt(p);
            }
            y = null;
          }
          else y = null;
          m !== null && Ns(h, g, m, y, !1), x !== null && T !== null && Ns(h, T, x, y, !0);
        }
      }
      e: {
        if (g = c ? Gt(c) : window, m = g.nodeName && g.nodeName.toLowerCase(), m === "select" || m === "input" && g.type === "file") var N = tf;
        else if (gs(g)) if (ru) N = of;
        else {
          N = rf;
          var _ = nf;
        }
        else (m = g.nodeName) && m.toLowerCase() === "input" && (g.type === "checkbox" || g.type === "radio") && (N = lf);
        if (N && (N = N(e, c))) {
          nu(h, N, n, v);
          break e;
        }
        _ && _(e, g, c), e === "focusout" && (_ = g._wrapperState) && _.controlled && g.type === "number" && mo(g, "number", g.value);
      }
      switch (_ = c ? Gt(c) : window, e) {
        case "focusin":
          (gs(_) || _.contentEditable === "true") && (Xt = _, Eo = c, Fn = null);
          break;
        case "focusout":
          Fn = Eo = Xt = null;
          break;
        case "mousedown":
          bo = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          bo = !1, ks(h, n, v);
          break;
        case "selectionchange":
          if (uf) break;
        case "keydown":
        case "keyup":
          ks(h, n, v);
      }
      var b;
      if (yi) e: {
        switch (e) {
          case "compositionstart":
            var k = "onCompositionStart";
            break e;
          case "compositionend":
            k = "onCompositionEnd";
            break e;
          case "compositionupdate":
            k = "onCompositionUpdate";
            break e;
        }
        k = void 0;
      }
      else Yt ? eu(e, n) && (k = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (k = "onCompositionStart");
      k && (qa && n.locale !== "ko" && (Yt || k !== "onCompositionStart" ? k === "onCompositionEnd" && Yt && (b = Ja()) : (dt = v, gi = "value" in dt ? dt.value : dt.textContent, Yt = !0)), _ = qr(c, k), 0 < _.length && (k = new fs(k, e, null, n, v), h.push({ event: k, listeners: _ }), b ? k.data = b : (b = tu(n), b !== null && (k.data = b)))), (b = Zd ? Gd(e, n) : Jd(e, n)) && (c = qr(c, "onBeforeInput"), 0 < c.length && (v = new fs("onBeforeInput", "beforeinput", null, n, v), h.push({ event: v, listeners: c }), v.data = b));
    }
    pu(h, t);
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
function Wt(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ns(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var u = n, a = u.alternate, c = u.stateNode;
    if (a !== null && a === r) break;
    u.tag === 5 && c !== null && (u = c, l ? (a = Qn(n, o), a != null && i.unshift(qn(n, a, u))) : l || (a = Qn(n, o), a != null && i.push(qn(n, a, u)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var pf = /\r\n?/g, hf = /\u0000|\uFFFD/g;
function _s(e) {
  return (typeof e == "string" ? e : "" + e).replace(pf, `
`).replace(hf, "");
}
function Nr(e, t, n) {
  if (t = _s(t), _s(e) !== t && n) throw Error(j(425));
}
function el() {
}
var zo = null, Po = null;
function To(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var $o = typeof setTimeout == "function" ? setTimeout : void 0, mf = typeof clearTimeout == "function" ? clearTimeout : void 0, Cs = typeof Promise == "function" ? Promise : void 0, gf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Cs < "u" ? function(e) {
  return Cs.resolve(null).then(e).catch(vf);
} : $o;
function vf(e) {
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
var wn = Math.random().toString(36).slice(2), We = "__reactFiber$" + wn, er = "__reactProps$" + wn, et = "__reactContainer$" + wn, Lo = "__reactEvents$" + wn, xf = "__reactListeners$" + wn, yf = "__reactHandles$" + wn;
function Tt(e) {
  var t = e[We];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[et] || n[We]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Es(e); e !== null; ) {
        if (n = e[We]) return n;
        e = Es(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function cr(e) {
  return e = e[We] || e[et], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Gt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(j(33));
}
function jl(e) {
  return e[er] || null;
}
var Mo = [], Jt = -1;
function Nt(e) {
  return { current: e };
}
function V(e) {
  0 > Jt || (e.current = Mo[Jt], Mo[Jt] = null, Jt--);
}
function B(e, t) {
  Jt++, Mo[Jt] = e.current, e.current = t;
}
var jt = {}, ce = Nt(jt), ye = Nt(!1), Dt = jt;
function fn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return jt;
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
  V(ye), V(ce);
}
function bs(e, t, n) {
  if (ce.current !== jt) throw Error(j(168));
  B(ce, t), B(ye, n);
}
function mu(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(j(108, nd(e) || "Unknown", l));
  return Y({}, n, r);
}
function nl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || jt, Dt = ce.current, B(ce, e), B(ye, ye.current), !0;
}
function zs(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(j(169));
  n ? (e = mu(e, t, Dt), r.__reactInternalMemoizedMergedChildContext = e, V(ye), V(ce), B(ce, e)) : V(ye), B(ye, n);
}
var Xe = null, Sl = !1, Gl = !1;
function gu(e) {
  Xe === null ? Xe = [e] : Xe.push(e);
}
function wf(e) {
  Sl = !0, gu(e);
}
function _t() {
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
      throw Xe !== null && (Xe = Xe.slice(e + 1)), Ua(fi, _t), l;
    } finally {
      U = t, Gl = !1;
    }
  }
  return null;
}
var qt = [], en = 0, rl = null, ll = 0, be = [], ze = 0, Ft = null, Ze = 1, Ge = "";
function zt(e, t) {
  qt[en++] = ll, qt[en++] = rl, rl = e, ll = t;
}
function vu(e, t, n) {
  be[ze++] = Ze, be[ze++] = Ge, be[ze++] = Ft, Ft = e;
  var r = Ze;
  e = Ge;
  var l = 32 - Ie(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - Ie(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, Ze = 1 << 32 - Ie(t) + l | n << l | r, Ge = o + e;
  } else Ze = 1 << o | n << l | r, Ge = e;
}
function ki(e) {
  e.return !== null && (zt(e, 1), vu(e, 1, 0));
}
function ji(e) {
  for (; e === rl; ) rl = qt[--en], qt[en] = null, ll = qt[--en], qt[en] = null;
  for (; e === Ft; ) Ft = be[--ze], be[ze] = null, Ge = be[--ze], be[ze] = null, Ze = be[--ze], be[ze] = null;
}
var Ne = null, Se = null, W = !1, Fe = null;
function xu(e, t) {
  var n = Pe(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Ps(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Ne = e, Se = gt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Ne = e, Se = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Ft !== null ? { id: Ze, overflow: Ge } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Pe(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ne = e, Se = null, !0) : !1;
    default:
      return !1;
  }
}
function Ro(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Oo(e) {
  if (W) {
    var t = Se;
    if (t) {
      var n = t;
      if (!Ps(e, t)) {
        if (Ro(e)) throw Error(j(418));
        t = gt(n.nextSibling);
        var r = Ne;
        t && Ps(e, t) ? xu(r, n) : (e.flags = e.flags & -4097 | 2, W = !1, Ne = e);
      }
    } else {
      if (Ro(e)) throw Error(j(418));
      e.flags = e.flags & -4097 | 2, W = !1, Ne = e;
    }
  }
}
function Ts(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Ne = e;
}
function _r(e) {
  if (e !== Ne) return !1;
  if (!W) return Ts(e), W = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !To(e.type, e.memoizedProps)), t && (t = Se)) {
    if (Ro(e)) throw yu(), Error(j(418));
    for (; t; ) xu(e, t), t = gt(t.nextSibling);
  }
  if (Ts(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(j(317));
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
function yu() {
  for (var e = Se; e; ) e = gt(e.nextSibling);
}
function pn() {
  Se = Ne = null, W = !1;
}
function Si(e) {
  Fe === null ? Fe = [e] : Fe.push(e);
}
var kf = rt.ReactCurrentBatchConfig;
function Cn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(j(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(j(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var u = l.refs;
        i === null ? delete u[o] : u[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(j(284));
    if (!n._owner) throw Error(j(290, e));
  }
  return e;
}
function Cr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(j(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function $s(e) {
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
  function i(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function u(p, d, f, w) {
    return d === null || d.tag !== 6 ? (d = lo(f, p.mode, w), d.return = p, d) : (d = l(d, f), d.return = p, d);
  }
  function a(p, d, f, w) {
    var N = f.type;
    return N === Kt ? v(p, d, f.props.children, w, f.key) : d !== null && (d.elementType === N || typeof N == "object" && N !== null && N.$$typeof === st && $s(N) === d.type) ? (w = l(d, f.props), w.ref = Cn(p, d, f), w.return = p, w) : (w = Hr(f.type, f.key, f.props, null, p.mode, w), w.ref = Cn(p, d, f), w.return = p, w);
  }
  function c(p, d, f, w) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== f.containerInfo || d.stateNode.implementation !== f.implementation ? (d = oo(f, p.mode, w), d.return = p, d) : (d = l(d, f.children || []), d.return = p, d);
  }
  function v(p, d, f, w, N) {
    return d === null || d.tag !== 7 ? (d = Ot(f, p.mode, w, N), d.return = p, d) : (d = l(d, f), d.return = p, d);
  }
  function h(p, d, f) {
    if (typeof d == "string" && d !== "" || typeof d == "number") return d = lo("" + d, p.mode, f), d.return = p, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case mr:
          return f = Hr(d.type, d.key, d.props, null, p.mode, f), f.ref = Cn(p, null, d), f.return = p, f;
        case Qt:
          return d = oo(d, p.mode, f), d.return = p, d;
        case st:
          var w = d._init;
          return h(p, w(d._payload), f);
      }
      if (Tn(d) || kn(d)) return d = Ot(d, p.mode, f, null), d.return = p, d;
      Cr(p, d);
    }
    return null;
  }
  function g(p, d, f, w) {
    var N = d !== null ? d.key : null;
    if (typeof f == "string" && f !== "" || typeof f == "number") return N !== null ? null : u(p, d, "" + f, w);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case mr:
          return f.key === N ? a(p, d, f, w) : null;
        case Qt:
          return f.key === N ? c(p, d, f, w) : null;
        case st:
          return N = f._init, g(
            p,
            d,
            N(f._payload),
            w
          );
      }
      if (Tn(f) || kn(f)) return N !== null ? null : v(p, d, f, w, null);
      Cr(p, f);
    }
    return null;
  }
  function m(p, d, f, w, N) {
    if (typeof w == "string" && w !== "" || typeof w == "number") return p = p.get(f) || null, u(d, p, "" + w, N);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case mr:
          return p = p.get(w.key === null ? f : w.key) || null, a(d, p, w, N);
        case Qt:
          return p = p.get(w.key === null ? f : w.key) || null, c(d, p, w, N);
        case st:
          var _ = w._init;
          return m(p, d, f, _(w._payload), N);
      }
      if (Tn(w) || kn(w)) return p = p.get(f) || null, v(d, p, w, N, null);
      Cr(d, w);
    }
    return null;
  }
  function x(p, d, f, w) {
    for (var N = null, _ = null, b = d, k = d = 0, R = null; b !== null && k < f.length; k++) {
      b.index > k ? (R = b, b = null) : R = b.sibling;
      var L = g(p, b, f[k], w);
      if (L === null) {
        b === null && (b = R);
        break;
      }
      e && b && L.alternate === null && t(p, b), d = o(L, d, k), _ === null ? N = L : _.sibling = L, _ = L, b = R;
    }
    if (k === f.length) return n(p, b), W && zt(p, k), N;
    if (b === null) {
      for (; k < f.length; k++) b = h(p, f[k], w), b !== null && (d = o(b, d, k), _ === null ? N = b : _.sibling = b, _ = b);
      return W && zt(p, k), N;
    }
    for (b = r(p, b); k < f.length; k++) R = m(b, p, k, f[k], w), R !== null && (e && R.alternate !== null && b.delete(R.key === null ? k : R.key), d = o(R, d, k), _ === null ? N = R : _.sibling = R, _ = R);
    return e && b.forEach(function(M) {
      return t(p, M);
    }), W && zt(p, k), N;
  }
  function y(p, d, f, w) {
    var N = kn(f);
    if (typeof N != "function") throw Error(j(150));
    if (f = N.call(f), f == null) throw Error(j(151));
    for (var _ = N = null, b = d, k = d = 0, R = null, L = f.next(); b !== null && !L.done; k++, L = f.next()) {
      b.index > k ? (R = b, b = null) : R = b.sibling;
      var M = g(p, b, L.value, w);
      if (M === null) {
        b === null && (b = R);
        break;
      }
      e && b && M.alternate === null && t(p, b), d = o(M, d, k), _ === null ? N = M : _.sibling = M, _ = M, b = R;
    }
    if (L.done) return n(
      p,
      b
    ), W && zt(p, k), N;
    if (b === null) {
      for (; !L.done; k++, L = f.next()) L = h(p, L.value, w), L !== null && (d = o(L, d, k), _ === null ? N = L : _.sibling = L, _ = L);
      return W && zt(p, k), N;
    }
    for (b = r(p, b); !L.done; k++, L = f.next()) L = m(b, p, k, L.value, w), L !== null && (e && L.alternate !== null && b.delete(L.key === null ? k : L.key), d = o(L, d, k), _ === null ? N = L : _.sibling = L, _ = L);
    return e && b.forEach(function(ge) {
      return t(p, ge);
    }), W && zt(p, k), N;
  }
  function T(p, d, f, w) {
    if (typeof f == "object" && f !== null && f.type === Kt && f.key === null && (f = f.props.children), typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case mr:
          e: {
            for (var N = f.key, _ = d; _ !== null; ) {
              if (_.key === N) {
                if (N = f.type, N === Kt) {
                  if (_.tag === 7) {
                    n(p, _.sibling), d = l(_, f.props.children), d.return = p, p = d;
                    break e;
                  }
                } else if (_.elementType === N || typeof N == "object" && N !== null && N.$$typeof === st && $s(N) === _.type) {
                  n(p, _.sibling), d = l(_, f.props), d.ref = Cn(p, _, f), d.return = p, p = d;
                  break e;
                }
                n(p, _);
                break;
              } else t(p, _);
              _ = _.sibling;
            }
            f.type === Kt ? (d = Ot(f.props.children, p.mode, w, f.key), d.return = p, p = d) : (w = Hr(f.type, f.key, f.props, null, p.mode, w), w.ref = Cn(p, d, f), w.return = p, p = w);
          }
          return i(p);
        case Qt:
          e: {
            for (_ = f.key; d !== null; ) {
              if (d.key === _) if (d.tag === 4 && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                n(p, d.sibling), d = l(d, f.children || []), d.return = p, p = d;
                break e;
              } else {
                n(p, d);
                break;
              }
              else t(p, d);
              d = d.sibling;
            }
            d = oo(f, p.mode, w), d.return = p, p = d;
          }
          return i(p);
        case st:
          return _ = f._init, T(p, d, _(f._payload), w);
      }
      if (Tn(f)) return x(p, d, f, w);
      if (kn(f)) return y(p, d, f, w);
      Cr(p, f);
    }
    return typeof f == "string" && f !== "" || typeof f == "number" ? (f = "" + f, d !== null && d.tag === 6 ? (n(p, d.sibling), d = l(d, f), d.return = p, p = d) : (n(p, d), d = lo(f, p.mode, w), d.return = p, p = d), i(p)) : n(p, d);
  }
  return T;
}
var hn = wu(!0), ku = wu(!1), ol = Nt(null), il = null, tn = null, Ni = null;
function _i() {
  Ni = tn = il = null;
}
function Ci(e) {
  var t = ol.current;
  V(ol), e._currentValue = t;
}
function Do(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function un(e, t) {
  il = e, Ni = tn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (xe = !0), e.firstContext = null);
}
function $e(e) {
  var t = e._currentValue;
  if (Ni !== e) if (e = { context: e, memoizedValue: t, next: null }, tn === null) {
    if (il === null) throw Error(j(308));
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
var at = !1;
function bi(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Su(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Je(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function vt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, I & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, tt(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Ei(r)) : (t.next = l.next, l.next = t), r.interleaved = t, tt(e, n);
}
function Dr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, pi(e, n);
  }
}
function Ls(e, t) {
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
  at = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var a = u, c = a.next;
    a.next = null, i === null ? o = c : i.next = c, i = a;
    var v = e.alternate;
    v !== null && (v = v.updateQueue, u = v.lastBaseUpdate, u !== i && (u === null ? v.firstBaseUpdate = c : u.next = c, v.lastBaseUpdate = a));
  }
  if (o !== null) {
    var h = l.baseState;
    i = 0, v = c = a = null, u = o;
    do {
      var g = u.lane, m = u.eventTime;
      if ((r & g) === g) {
        v !== null && (v = v.next = {
          eventTime: m,
          lane: 0,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        });
        e: {
          var x = e, y = u;
          switch (g = t, m = n, y.tag) {
            case 1:
              if (x = y.payload, typeof x == "function") {
                h = x.call(m, h, g);
                break e;
              }
              h = x;
              break e;
            case 3:
              x.flags = x.flags & -65537 | 128;
            case 0:
              if (x = y.payload, g = typeof x == "function" ? x.call(m, h, g) : x, g == null) break e;
              h = Y({}, h, g);
              break e;
            case 2:
              at = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, g = l.effects, g === null ? l.effects = [u] : g.push(u));
      } else m = { eventTime: m, lane: g, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, v === null ? (c = v = m, a = h) : v = v.next = m, i |= g;
      if (u = u.next, u === null) {
        if (u = l.shared.pending, u === null) break;
        g = u, u = g.next, g.next = null, l.lastBaseUpdate = g, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (a = h), l.baseState = a, l.firstBaseUpdate = c, l.lastBaseUpdate = v, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    At |= i, e.lanes = i, e.memoizedState = h;
  }
}
function Ms(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(j(191, l));
      l.call(r);
    }
  }
}
var dr = {}, Ke = Nt(dr), tr = Nt(dr), nr = Nt(dr);
function Lt(e) {
  if (e === dr) throw Error(j(174));
  return e;
}
function zi(e, t) {
  switch (B(nr, t), B(tr, e), B(Ke, dr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : vo(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = vo(t, e);
  }
  V(Ke), B(Ke, t);
}
function mn() {
  V(Ke), V(tr), V(nr);
}
function Nu(e) {
  Lt(nr.current);
  var t = Lt(Ke.current), n = vo(t, e.type);
  t !== n && (B(tr, e), B(Ke, n));
}
function Pi(e) {
  tr.current === e && (V(Ke), V(tr));
}
var Q = Nt(0);
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
var Jl = [];
function Ti() {
  for (var e = 0; e < Jl.length; e++) Jl[e]._workInProgressVersionPrimary = null;
  Jl.length = 0;
}
var Fr = rt.ReactCurrentDispatcher, ql = rt.ReactCurrentBatchConfig, It = 0, K = null, J = null, te = null, ul = !1, In = !1, rr = 0, jf = 0;
function se() {
  throw Error(j(321));
}
function $i(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ue(e[n], t[n])) return !1;
  return !0;
}
function Li(e, t, n, r, l, o) {
  if (It = o, K = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Fr.current = e === null || e.memoizedState === null ? Cf : Ef, e = n(r, l), In) {
    o = 0;
    do {
      if (In = !1, rr = 0, 25 <= o) throw Error(j(301));
      o += 1, te = J = null, t.updateQueue = null, Fr.current = bf, e = n(r, l);
    } while (In);
  }
  if (Fr.current = cl, t = J !== null && J.next !== null, It = 0, te = J = K = null, ul = !1, t) throw Error(j(300));
  return e;
}
function Mi() {
  var e = rr !== 0;
  return rr = 0, e;
}
function Ve() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return te === null ? K.memoizedState = te = e : te = te.next = e, te;
}
function Le() {
  if (J === null) {
    var e = K.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = J.next;
  var t = te === null ? K.memoizedState : te.next;
  if (t !== null) te = t, J = e;
  else {
    if (e === null) throw Error(j(310));
    J = e, e = { memoizedState: J.memoizedState, baseState: J.baseState, baseQueue: J.baseQueue, queue: J.queue, next: null }, te === null ? K.memoizedState = te = e : te = te.next = e;
  }
  return te;
}
function lr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function eo(e) {
  var t = Le(), n = t.queue;
  if (n === null) throw Error(j(311));
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
    var u = i = null, a = null, c = o;
    do {
      var v = c.lane;
      if ((It & v) === v) a !== null && (a = a.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var h = {
          lane: v,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        a === null ? (u = a = h, i = r) : a = a.next = h, K.lanes |= v, At |= v;
      }
      c = c.next;
    } while (c !== null && c !== o);
    a === null ? i = r : a.next = u, Ue(r, t.memoizedState) || (xe = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = a, n.lastRenderedState = r;
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
    Ue(o, t.memoizedState) || (xe = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function _u() {
}
function Cu(e, t) {
  var n = K, r = Le(), l = t(), o = !Ue(r.memoizedState, l);
  if (o && (r.memoizedState = l, xe = !0), r = r.queue, Ri(zu.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || te !== null && te.memoizedState.tag & 1) {
    if (n.flags |= 2048, or(9, bu.bind(null, n, r, l, t), void 0, null), ne === null) throw Error(j(349));
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
function Rs(e) {
  var t = Ve();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: lr, lastRenderedState: e }, t.queue = e, e = e.dispatch = _f.bind(null, K, e), [t.memoizedState, e];
}
function or(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = K.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, K.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function $u() {
  return Le().memoizedState;
}
function Ir(e, t, n, r) {
  var l = Ve();
  K.flags |= e, l.memoizedState = or(1 | t, n, void 0, r === void 0 ? null : r);
}
function Nl(e, t, n, r) {
  var l = Le();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (J !== null) {
    var i = J.memoizedState;
    if (o = i.destroy, r !== null && $i(r, i.deps)) {
      l.memoizedState = or(t, n, o, r);
      return;
    }
  }
  K.flags |= e, l.memoizedState = or(1 | t, n, o, r);
}
function Os(e, t) {
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
function Du(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && $i(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Fu(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && $i(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Iu(e, t, n) {
  return It & 21 ? (Ue(n, t) || (n = Va(), K.lanes |= n, At |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, xe = !0), e.memoizedState = n);
}
function Sf(e, t) {
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
  return Le().memoizedState;
}
function Nf(e, t, n) {
  var r = yt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Uu(e)) Bu(t, n);
  else if (n = ju(e, t, n, r), n !== null) {
    var l = pe();
    Ae(n, e, r, l), Hu(n, t, r);
  }
}
function _f(e, t, n) {
  var r = yt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Uu(e)) Bu(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, u = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = u, Ue(u, i)) {
        var a = t.interleaved;
        a === null ? (l.next = l, Ei(t)) : (l.next = a.next, a.next = l), t.interleaved = l;
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
var cl = { readContext: $e, useCallback: se, useContext: se, useEffect: se, useImperativeHandle: se, useInsertionEffect: se, useLayoutEffect: se, useMemo: se, useReducer: se, useRef: se, useState: se, useDebugValue: se, useDeferredValue: se, useTransition: se, useMutableSource: se, useSyncExternalStore: se, useId: se, unstable_isNewReconciler: !1 }, Cf = { readContext: $e, useCallback: function(e, t) {
  return Ve().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: $e, useEffect: Os, useImperativeHandle: function(e, t, n) {
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
  var n = Ve();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ve();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Nf.bind(null, K, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ve();
  return e = { current: e }, t.memoizedState = e;
}, useState: Rs, useDebugValue: Oi, useDeferredValue: function(e) {
  return Ve().memoizedState = e;
}, useTransition: function() {
  var e = Rs(!1), t = e[0];
  return e = Sf.bind(null, e[1]), Ve().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = K, l = Ve();
  if (W) {
    if (n === void 0) throw Error(j(407));
    n = n();
  } else {
    if (n = t(), ne === null) throw Error(j(349));
    It & 30 || Eu(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Os(zu.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, or(9, bu.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Ve(), t = ne.identifierPrefix;
  if (W) {
    var n = Ge, r = Ze;
    n = (r & ~(1 << 32 - Ie(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = rr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = jf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Ef = {
  readContext: $e,
  useCallback: Du,
  useContext: $e,
  useEffect: Ri,
  useImperativeHandle: Ou,
  useInsertionEffect: Lu,
  useLayoutEffect: Mu,
  useMemo: Fu,
  useReducer: eo,
  useRef: $u,
  useState: function() {
    return eo(lr);
  },
  useDebugValue: Oi,
  useDeferredValue: function(e) {
    var t = Le();
    return Iu(t, J.memoizedState, e);
  },
  useTransition: function() {
    var e = eo(lr)[0], t = Le().memoizedState;
    return [e, t];
  },
  useMutableSource: _u,
  useSyncExternalStore: Cu,
  useId: Au,
  unstable_isNewReconciler: !1
}, bf = { readContext: $e, useCallback: Du, useContext: $e, useEffect: Ri, useImperativeHandle: Ou, useInsertionEffect: Lu, useLayoutEffect: Mu, useMemo: Fu, useReducer: to, useRef: $u, useState: function() {
  return to(lr);
}, useDebugValue: Oi, useDeferredValue: function(e) {
  var t = Le();
  return J === null ? t.memoizedState = e : Iu(t, J.memoizedState, e);
}, useTransition: function() {
  var e = to(lr)[0], t = Le().memoizedState;
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
function Fo(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : Y({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var _l = { isMounted: function(e) {
  return (e = e._reactInternals) ? Ht(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = pe(), l = yt(e), o = Je(r, l);
  o.payload = t, n != null && (o.callback = n), t = vt(e, o, l), t !== null && (Ae(t, e, l, r), Dr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = pe(), l = yt(e), o = Je(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = vt(e, o, l), t !== null && (Ae(t, e, l, r), Dr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = pe(), r = yt(e), l = Je(n, r);
  l.tag = 2, t != null && (l.callback = t), t = vt(e, l, r), t !== null && (Ae(t, e, r, n), Dr(t, e, r));
} };
function Ds(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Gn(n, r) || !Gn(l, o) : !0;
}
function Vu(e, t, n) {
  var r = !1, l = jt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = $e(o) : (l = we(t) ? Dt : ce.current, r = t.contextTypes, o = (r = r != null) ? fn(e, l) : jt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = _l, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Fs(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && _l.enqueueReplaceState(t, t.state, null);
}
function Io(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, bi(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = $e(o) : (o = we(t) ? Dt : ce.current, l.context = fn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Fo(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && _l.enqueueReplaceState(l, l.state, null), sl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function gn(e, t) {
  try {
    var n = "", r = t;
    do
      n += td(r), r = r.return;
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
var zf = typeof WeakMap == "function" ? WeakMap : Map;
function Wu(e, t, n) {
  n = Je(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    fl || (fl = !0, Zo = r), Ao(e, t);
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
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function Is(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new zf();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Hf.bind(null, e, t, n), t.then(e, e));
}
function As(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Us(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Je(-1, 1), t.tag = 2, vt(n, t, 1))), n.lanes |= 1), e);
}
var Pf = rt.ReactCurrentOwner, xe = !1;
function fe(e, t, n, r) {
  t.child = e === null ? ku(t, null, n, r) : hn(t, e.child, n, r);
}
function Bs(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return un(t, l), r = Li(e, t, n, r, o, l), n = Mi(), e !== null && !xe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, nt(e, t, l)) : (W && n && ki(t), t.flags |= 1, fe(e, t, r, l), t.child);
}
function Hs(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Vi(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Ku(e, t, o, r, l)) : (e = Hr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Gn, n(i, r) && e.ref === t.ref) return nt(e, t, l);
  }
  return t.flags |= 1, e = wt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Ku(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Gn(o, r) && e.ref === t.ref) if (xe = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (xe = !0);
    else return t.lanes = e.lanes, nt(e, t, l);
  }
  return Uo(e, t, n, r, l);
}
function Yu(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, B(rn, je), je |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, B(rn, je), je |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, B(rn, je), je |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, B(rn, je), je |= r;
  return fe(e, t, l, n), t.child;
}
function Xu(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Uo(e, t, n, r, l) {
  var o = we(n) ? Dt : ce.current;
  return o = fn(t, o), un(t, l), n = Li(e, t, n, r, o, l), r = Mi(), e !== null && !xe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, nt(e, t, l)) : (W && r && ki(t), t.flags |= 1, fe(e, t, n, l), t.child);
}
function Vs(e, t, n, r, l) {
  if (we(n)) {
    var o = !0;
    nl(t);
  } else o = !1;
  if (un(t, l), t.stateNode === null) Ar(e, t), Vu(t, n, r), Io(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, u = t.memoizedProps;
    i.props = u;
    var a = i.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = $e(c) : (c = we(n) ? Dt : ce.current, c = fn(t, c));
    var v = n.getDerivedStateFromProps, h = typeof v == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    h || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== r || a !== c) && Fs(t, i, r, c), at = !1;
    var g = t.memoizedState;
    i.state = g, sl(t, r, i, l), a = t.memoizedState, u !== r || g !== a || ye.current || at ? (typeof v == "function" && (Fo(t, n, v, r), a = t.memoizedState), (u = at || Ds(t, n, u, r, g, a, c)) ? (h || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = a), i.props = r, i.state = a, i.context = c, r = u) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, Su(e, t), u = t.memoizedProps, c = t.type === t.elementType ? u : Oe(t.type, u), i.props = c, h = t.pendingProps, g = i.context, a = n.contextType, typeof a == "object" && a !== null ? a = $e(a) : (a = we(n) ? Dt : ce.current, a = fn(t, a));
    var m = n.getDerivedStateFromProps;
    (v = typeof m == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== h || g !== a) && Fs(t, i, r, a), at = !1, g = t.memoizedState, i.state = g, sl(t, r, i, l);
    var x = t.memoizedState;
    u !== h || g !== x || ye.current || at ? (typeof m == "function" && (Fo(t, n, m, r), x = t.memoizedState), (c = at || Ds(t, n, c, r, g, x, a) || !1) ? (v || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, x, a), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, x, a)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = x), i.props = r, i.state = x, i.context = a, r = c) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Bo(e, t, n, r, o, l);
}
function Bo(e, t, n, r, l, o) {
  Xu(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && zs(t, n, !1), nt(e, t, o);
  r = t.stateNode, Pf.current = t;
  var u = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = hn(t, e.child, null, o), t.child = hn(t, null, u, o)) : fe(e, t, u, o), t.memoizedState = r.state, l && zs(t, n, !0), t.child;
}
function Zu(e) {
  var t = e.stateNode;
  t.pendingContext ? bs(e, t.pendingContext, t.pendingContext !== t.context) : t.context && bs(e, t.context, !1), zi(e, t.containerInfo);
}
function Ws(e, t, n, r, l) {
  return pn(), Si(l), t.flags |= 256, fe(e, t, n, r), t.child;
}
var Ho = { dehydrated: null, treeContext: null, retryLane: 0 };
function Vo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Gu(e, t, n) {
  var r = t.pendingProps, l = Q.current, o = !1, i = (t.flags & 128) !== 0, u;
  if ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), B(Q, l & 1), e === null)
    return Oo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = bl(i, r, 0, null), e = Ot(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Vo(n), t.memoizedState = Ho, e) : Di(t, i));
  if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return Tf(e, t, i, r, u, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, u = l.sibling;
    var a = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = a, t.deletions = null) : (r = wt(l, a), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? o = wt(u, o) : (o = Ot(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? Vo(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = Ho, r;
  }
  return o = e.child, e = o.sibling, r = wt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Di(e, t) {
  return t = bl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Er(e, t, n, r) {
  return r !== null && Si(r), hn(t, e.child, null, n), e = Di(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Tf(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = no(Error(j(422))), Er(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = bl({ mode: "visible", children: r.children }, l, 0, null), o = Ot(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && hn(t, e.child, null, i), t.child.memoizedState = Vo(i), t.memoizedState = Ho, o);
  if (!(t.mode & 1)) return Er(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
    return r = u, o = Error(j(419)), r = no(o, r, void 0), Er(e, t, i, r);
  }
  if (u = (i & e.childLanes) !== 0, xe || u) {
    if (r = ne, r !== null) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, tt(e, l), Ae(r, e, l, -1));
    }
    return Hi(), r = no(Error(j(421))), Er(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Vf.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Se = gt(l.nextSibling), Ne = t, W = !0, Fe = null, e !== null && (be[ze++] = Ze, be[ze++] = Ge, be[ze++] = Ft, Ze = e.id, Ge = e.overflow, Ft = t), t = Di(t, r.children), t.flags |= 4096, t);
}
function Qs(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Do(e.return, t, n);
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
      if (e.tag === 13) e.memoizedState !== null && Qs(e, n, t);
      else if (e.tag === 19) Qs(e, n, t);
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
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && al(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), ro(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && al(e) === null) {
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
  if (e !== null && t.child !== e.child) throw Error(j(153));
  if (t.child !== null) {
    for (e = t.child, n = wt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = wt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function $f(e, t, n) {
  switch (t.tag) {
    case 3:
      Zu(t), pn();
      break;
    case 5:
      Nu(t);
      break;
    case 1:
      we(t.type) && nl(t);
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
        return r.dehydrated !== null ? (B(Q, Q.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Gu(e, t, n) : (B(Q, Q.current & 1), e = nt(e, t, n), e !== null ? e.sibling : null);
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
var qu, Wo, ec, tc;
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
Wo = function() {
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
        l = go(e, l), r = go(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = el);
    }
    xo(n, r);
    var i;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var u = l[c];
      for (i in u) u.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Vn.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var a = r[c];
      if (u = l != null ? l[c] : void 0, r.hasOwnProperty(c) && a !== u && (a != null || u != null)) if (c === "style") if (u) {
        for (i in u) !u.hasOwnProperty(i) || a && a.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in a) a.hasOwnProperty(i) && u[i] !== a[i] && (n || (n = {}), n[i] = a[i]);
      } else n || (o || (o = []), o.push(
        c,
        n
      )), n = a;
      else c === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, u = u ? u.__html : void 0, a != null && u !== a && (o = o || []).push(c, a)) : c === "children" ? typeof a != "string" && typeof a != "number" || (o = o || []).push(c, "" + a) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Vn.hasOwnProperty(c) ? (a != null && c === "onScroll" && H("scroll", e), o || u === a || (o = [])) : (o = o || []).push(c, a));
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
  if (!W) switch (e.tailMode) {
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
function Lf(e, t, n) {
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
      return ae(t), null;
    case 1:
      return we(t.type) && tl(), ae(t), null;
    case 3:
      return r = t.stateNode, mn(), V(ye), V(ce), Ti(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (_r(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Fe !== null && (qo(Fe), Fe = null))), Wo(e, t), ae(t), null;
    case 5:
      Pi(t);
      var l = Lt(nr.current);
      if (n = t.type, e !== null && t.stateNode != null) ec(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(j(166));
          return ae(t), null;
        }
        if (e = Lt(Ke.current), _r(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[We] = t, r[er] = o, e = (t.mode & 1) !== 0, n) {
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
              ts(r, o), H("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, H("invalid", r);
              break;
            case "textarea":
              rs(r, o), H("invalid", r);
          }
          xo(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var u = o[i];
            i === "children" ? typeof u == "string" ? r.textContent !== u && (o.suppressHydrationWarning !== !0 && Nr(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (o.suppressHydrationWarning !== !0 && Nr(
              r.textContent,
              u,
              e
            ), l = ["children", "" + u]) : Vn.hasOwnProperty(i) && u != null && i === "onScroll" && H("scroll", r);
          }
          switch (n) {
            case "input":
              gr(r), ns(r, o, !0);
              break;
            case "textarea":
              gr(r), ls(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = el);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = za(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[We] = t, e[er] = r, qu(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = yo(n, r), n) {
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
                ts(e, r), l = po(e, r), H("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = Y({}, r, { value: void 0 }), H("invalid", e);
                break;
              case "textarea":
                rs(e, r), l = go(e, r), H("invalid", e);
                break;
              default:
                l = r;
            }
            xo(n, l), u = l;
            for (o in u) if (u.hasOwnProperty(o)) {
              var a = u[o];
              o === "style" ? $a(e, a) : o === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && Pa(e, a)) : o === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && Wn(e, a) : typeof a == "number" && Wn(e, "" + a) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Vn.hasOwnProperty(o) ? a != null && o === "onScroll" && H("scroll", e) : a != null && si(e, o, a, i));
            }
            switch (n) {
              case "input":
                gr(e), ns(e, r, !1);
                break;
              case "textarea":
                gr(e), ls(e);
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
      return ae(t), null;
    case 6:
      if (e && t.stateNode != null) tc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(j(166));
        if (n = Lt(nr.current), Lt(Ke.current), _r(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[We] = t, (o = r.nodeValue !== n) && (e = Ne, e !== null)) switch (e.tag) {
            case 3:
              Nr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Nr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[We] = t, t.stateNode = r;
      }
      return ae(t), null;
    case 13:
      if (V(Q), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (W && Se !== null && t.mode & 1 && !(t.flags & 128)) yu(), pn(), t.flags |= 98560, o = !1;
        else if (o = _r(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(j(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(j(317));
            o[We] = t;
          } else pn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ae(t), o = !1;
        } else Fe !== null && (qo(Fe), Fe = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Q.current & 1 ? q === 0 && (q = 3) : Hi())), t.updateQueue !== null && (t.flags |= 4), ae(t), null);
    case 4:
      return mn(), Wo(e, t), e === null && Jn(t.stateNode.containerInfo), ae(t), null;
    case 10:
      return Ci(t.type._context), ae(t), null;
    case 17:
      return we(t.type) && tl(), ae(t), null;
    case 19:
      if (V(Q), o = t.memoizedState, o === null) return ae(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) En(o, !1);
      else {
        if (q !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = al(e), i !== null) {
            for (t.flags |= 128, En(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return B(Q, Q.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && Z() > vn && (t.flags |= 128, r = !0, En(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = al(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), En(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !W) return ae(t), null;
        } else 2 * Z() - o.renderingStartTime > vn && n !== 1073741824 && (t.flags |= 128, r = !0, En(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Z(), t.sibling = null, n = Q.current, B(Q, r ? n & 1 | 2 : n & 1), t) : (ae(t), null);
    case 22:
    case 23:
      return Bi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? je & 1073741824 && (ae(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ae(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(j(156, t.tag));
}
function Mf(e, t) {
  switch (ji(t), t.tag) {
    case 1:
      return we(t.type) && tl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return mn(), V(ye), V(ce), Ti(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Pi(t), null;
    case 13:
      if (V(Q), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(j(340));
        pn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return V(Q), null;
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
var br = !1, ue = !1, Rf = typeof WeakSet == "function" ? WeakSet : Set, z = null;
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
var Ks = !1;
function Of(e, t) {
  if (zo = Gr, e = iu(), wi(e)) {
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
        var i = 0, u = -1, a = -1, c = 0, v = 0, h = e, g = null;
        t: for (; ; ) {
          for (var m; h !== n || l !== 0 && h.nodeType !== 3 || (u = i + l), h !== o || r !== 0 && h.nodeType !== 3 || (a = i + r), h.nodeType === 3 && (i += h.nodeValue.length), (m = h.firstChild) !== null; )
            g = h, h = m;
          for (; ; ) {
            if (h === e) break t;
            if (g === n && ++c === l && (u = i), g === o && ++v === r && (a = i), (m = h.nextSibling) !== null) break;
            h = g, g = h.parentNode;
          }
          h = m;
        }
        n = u === -1 || a === -1 ? null : { start: u, end: a };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Po = { focusedElem: e, selectionRange: n }, Gr = !1, z = t; z !== null; ) if (t = z, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, z = e;
  else for (; z !== null; ) {
    t = z;
    try {
      var x = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (x !== null) {
            var y = x.memoizedProps, T = x.memoizedState, p = t.stateNode, d = p.getSnapshotBeforeUpdate(t.elementType === t.type ? y : Oe(t.type, y), T);
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
          throw Error(j(163));
      }
    } catch (w) {
      X(t, t.return, w);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, z = e;
      break;
    }
    z = t.return;
  }
  return x = Ks, Ks = !1, x;
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
  t !== null && (e.alternate = null, nc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[We], delete t[er], delete t[Lo], delete t[xf], delete t[yf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function rc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ys(e) {
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
var re = null, De = !1;
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
      var r = re, l = De;
      re = null, it(e, t, n), re = r, De = l, re !== null && (De ? (e = re, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : re.removeChild(n.stateNode));
      break;
    case 18:
      re !== null && (De ? (e = re, n = n.stateNode, e.nodeType === 8 ? Zl(e.parentNode, n) : e.nodeType === 1 && Zl(e, n), Xn(e)) : Zl(re, n.stateNode));
      break;
    case 4:
      r = re, l = De, re = n.stateNode.containerInfo, De = !0, it(e, t, n), re = r, De = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ue && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && Qo(n, t, i), l = l.next;
        } while (l !== r);
      }
      it(e, t, n);
      break;
    case 1:
      if (!ue && (nn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (u) {
        X(n, t, u);
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
function Xs(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Rf()), t.forEach(function(r) {
      var l = Wf.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Re(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, u = i;
      e: for (; u !== null; ) {
        switch (u.tag) {
          case 5:
            re = u.stateNode, De = !1;
            break e;
          case 3:
            re = u.stateNode.containerInfo, De = !0;
            break e;
          case 4:
            re = u.stateNode.containerInfo, De = !0;
            break e;
        }
        u = u.return;
      }
      if (re === null) throw Error(j(160));
      lc(o, i, l), re = null, De = !1;
      var a = l.alternate;
      a !== null && (a.return = null), l.return = null;
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
          Wn(l, "");
        } catch (y) {
          X(e, e.return, y);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, u = e.type, a = e.updateQueue;
        if (e.updateQueue = null, a !== null) try {
          u === "input" && o.type === "radio" && o.name != null && Ea(l, o), yo(u, i);
          var c = yo(u, o);
          for (i = 0; i < a.length; i += 2) {
            var v = a[i], h = a[i + 1];
            v === "style" ? $a(l, h) : v === "dangerouslySetInnerHTML" ? Pa(l, h) : v === "children" ? Wn(l, h) : si(l, v, h, c);
          }
          switch (u) {
            case "input":
              ho(l, o);
              break;
            case "textarea":
              ba(l, o);
              break;
            case "select":
              var g = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var m = o.value;
              m != null ? ln(l, !!o.multiple, m, !1) : g !== !!o.multiple && (o.defaultValue != null ? ln(
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
        if (e.stateNode === null) throw Error(j(162));
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
      Re(t, e), He(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Ai = Z())), r & 4 && Xs(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (ue = (c = ue) || v, Re(t, e), ue = c) : Re(t, e), He(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !v && e.mode & 1) for (z = e, v = e.child; v !== null; ) {
          for (h = z = v; z !== null; ) {
            switch (g = z, m = g.child, g.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                An(4, g, g.return);
                break;
              case 1:
                nn(g, g.return);
                var x = g.stateNode;
                if (typeof x.componentWillUnmount == "function") {
                  r = g, n = g.return;
                  try {
                    t = r, x.props = t.memoizedProps, x.state = t.memoizedState, x.componentWillUnmount();
                  } catch (y) {
                    X(r, n, y);
                  }
                }
                break;
              case 5:
                nn(g, g.return);
                break;
              case 22:
                if (g.memoizedState !== null) {
                  Gs(h);
                  continue;
                }
            }
            m !== null ? (m.return = g, z = m) : Gs(h);
          }
          v = v.sibling;
        }
        e: for (v = null, h = e; ; ) {
          if (h.tag === 5) {
            if (v === null) {
              v = h;
              try {
                l = h.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (u = h.stateNode, a = h.memoizedProps.style, i = a != null && a.hasOwnProperty("display") ? a.display : null, u.style.display = Ta("display", i));
              } catch (y) {
                X(e, e.return, y);
              }
            }
          } else if (h.tag === 6) {
            if (v === null) try {
              h.stateNode.nodeValue = c ? "" : h.memoizedProps;
            } catch (y) {
              X(e, e.return, y);
            }
          } else if ((h.tag !== 22 && h.tag !== 23 || h.memoizedState === null || h === e) && h.child !== null) {
            h.child.return = h, h = h.child;
            continue;
          }
          if (h === e) break e;
          for (; h.sibling === null; ) {
            if (h.return === null || h.return === e) break e;
            v === h && (v = null), h = h.return;
          }
          v === h && (v = null), h.sibling.return = h.return, h = h.sibling;
        }
      }
      break;
    case 19:
      Re(t, e), He(e), r & 4 && Xs(e);
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
        throw Error(j(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Wn(l, ""), r.flags &= -33);
          var o = Ys(e);
          Xo(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, u = Ys(e);
          Yo(e, u, i);
          break;
        default:
          throw Error(j(161));
      }
    } catch (a) {
      X(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Df(e, t, n) {
  z = e, ic(e);
}
function ic(e, t, n) {
  for (var r = (e.mode & 1) !== 0; z !== null; ) {
    var l = z, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || br;
      if (!i) {
        var u = l.alternate, a = u !== null && u.memoizedState !== null || ue;
        u = br;
        var c = ue;
        if (br = i, (ue = a) && !c) for (z = l; z !== null; ) i = z, a = i.child, i.tag === 22 && i.memoizedState !== null ? Js(l) : a !== null ? (a.return = i, z = a) : Js(l);
        for (; o !== null; ) z = o, ic(o), o = o.sibling;
        z = l, br = u, ue = c;
      }
      Zs(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, z = o) : Zs(e);
  }
}
function Zs(e) {
  for (; z !== null; ) {
    var t = z;
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
              var c = t.alternate;
              if (c !== null) {
                var v = c.memoizedState;
                if (v !== null) {
                  var h = v.dehydrated;
                  h !== null && Xn(h);
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
        ue || t.flags & 512 && Ko(t);
      } catch (g) {
        X(t, t.return, g);
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
function Gs(e) {
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
            Cl(4, t);
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
            Ko(t);
          } catch (a) {
            X(t, o, a);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Ko(t);
          } catch (a) {
            X(t, i, a);
          }
      }
    } catch (a) {
      X(t, t.return, a);
    }
    if (t === e) {
      z = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      u.return = t.return, z = u;
      break;
    }
    z = t.return;
  }
}
var Ff = Math.ceil, dl = rt.ReactCurrentDispatcher, Fi = rt.ReactCurrentOwner, Te = rt.ReactCurrentBatchConfig, I = 0, ne = null, G = null, le = 0, je = 0, rn = Nt(0), q = 0, ir = null, At = 0, El = 0, Ii = 0, Un = null, ve = null, Ai = 0, vn = 1 / 0, Ye = null, fl = !1, Zo = null, xt = null, zr = !1, ft = null, pl = 0, Bn = 0, Go = null, Ur = -1, Br = 0;
function pe() {
  return I & 6 ? Z() : Ur !== -1 ? Ur : Ur = Z();
}
function yt(e) {
  return e.mode & 1 ? I & 2 && le !== 0 ? le & -le : kf.transition !== null ? (Br === 0 && (Br = Va()), Br) : (e = U, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ga(e.type)), e) : 1;
}
function Ae(e, t, n, r) {
  if (50 < Bn) throw Bn = 0, Go = null, Error(j(185));
  ar(e, n, r), (!(I & 2) || e !== ne) && (e === ne && (!(I & 2) && (El |= n), q === 4 && ct(e, le)), ke(e, r), n === 1 && I === 0 && !(t.mode & 1) && (vn = Z() + 500, Sl && _t()));
}
function ke(e, t) {
  var n = e.callbackNode;
  wd(e, t);
  var r = Zr(e, e === ne ? le : 0);
  if (r === 0) n !== null && ss(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && ss(n), t === 1) e.tag === 0 ? wf(qs.bind(null, e)) : gu(qs.bind(null, e)), gf(function() {
      !(I & 6) && _t();
    }), n = null;
    else {
      switch (Wa(r)) {
        case 1:
          n = fi;
          break;
        case 4:
          n = Ba;
          break;
        case 16:
          n = Xr;
          break;
        case 536870912:
          n = Ha;
          break;
        default:
          n = Xr;
      }
      n = hc(n, sc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function sc(e, t) {
  if (Ur = -1, Br = 0, I & 6) throw Error(j(327));
  var n = e.callbackNode;
  if (cn() && e.callbackNode !== n) return null;
  var r = Zr(e, e === ne ? le : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = hl(e, r);
  else {
    t = r;
    var l = I;
    I |= 2;
    var o = uc();
    (ne !== e || le !== t) && (Ye = null, vn = Z() + 500, Rt(e, t));
    do
      try {
        Uf();
        break;
      } catch (u) {
        ac(e, u);
      }
    while (!0);
    _i(), dl.current = o, I = l, G !== null ? t = 0 : (ne = null, le = 0, t = q);
  }
  if (t !== 0) {
    if (t === 2 && (l = No(e), l !== 0 && (r = l, t = Jo(e, l))), t === 1) throw n = ir, Rt(e, 0), ct(e, r), ke(e, Z()), n;
    if (t === 6) ct(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !If(l) && (t = hl(e, r), t === 2 && (o = No(e), o !== 0 && (r = o, t = Jo(e, o))), t === 1)) throw n = ir, Rt(e, 0), ct(e, r), ke(e, Z()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(j(345));
        case 2:
          Pt(e, ve, Ye);
          break;
        case 3:
          if (ct(e, r), (r & 130023424) === r && (t = Ai + 500 - Z(), 10 < t)) {
            if (Zr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              pe(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = $o(Pt.bind(null, e, ve, Ye), t);
            break;
          }
          Pt(e, ve, Ye);
          break;
        case 4:
          if (ct(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - Ie(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = Z() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Ff(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = $o(Pt.bind(null, e, ve, Ye), r);
            break;
          }
          Pt(e, ve, Ye);
          break;
        case 5:
          Pt(e, ve, Ye);
          break;
        default:
          throw Error(j(329));
      }
    }
  }
  return ke(e, Z()), e.callbackNode === n ? sc.bind(null, e) : null;
}
function Jo(e, t) {
  var n = Un;
  return e.current.memoizedState.isDehydrated && (Rt(e, t).flags |= 256), e = hl(e, t), e !== 2 && (t = ve, ve = n, t !== null && qo(t)), e;
}
function qo(e) {
  ve === null ? ve = e : ve.push.apply(ve, e);
}
function If(e) {
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
function qs(e) {
  if (I & 6) throw Error(j(327));
  cn();
  var t = Zr(e, 0);
  if (!(t & 1)) return ke(e, Z()), null;
  var n = hl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = No(e);
    r !== 0 && (t = r, n = Jo(e, r));
  }
  if (n === 1) throw n = ir, Rt(e, 0), ct(e, t), ke(e, Z()), n;
  if (n === 6) throw Error(j(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Pt(e, ve, Ye), ke(e, Z()), null;
}
function Ui(e, t) {
  var n = I;
  I |= 1;
  try {
    return e(t);
  } finally {
    I = n, I === 0 && (vn = Z() + 500, Sl && _t());
  }
}
function Ut(e) {
  ft !== null && ft.tag === 0 && !(I & 6) && cn();
  var t = I;
  I |= 1;
  var n = Te.transition, r = U;
  try {
    if (Te.transition = null, U = 1, e) return e();
  } finally {
    U = r, Te.transition = n, I = t, !(I & 6) && _t();
  }
}
function Bi() {
  je = rn.current, V(rn);
}
function Rt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, mf(n)), G !== null) for (n = G.return; n !== null; ) {
    var r = n;
    switch (ji(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && tl();
        break;
      case 3:
        mn(), V(ye), V(ce), Ti();
        break;
      case 5:
        Pi(r);
        break;
      case 4:
        mn();
        break;
      case 13:
        V(Q);
        break;
      case 19:
        V(Q);
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
  if (ne = e, G = e = wt(e.current, null), le = je = t, q = 0, ir = null, Ii = El = At = 0, ve = Un = null, $t !== null) {
    for (t = 0; t < $t.length; t++) if (n = $t[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var i = o.next;
        o.next = l, r.next = i;
      }
      n.pending = r;
    }
    $t = null;
  }
  return e;
}
function ac(e, t) {
  do {
    var n = G;
    try {
      if (_i(), Fr.current = cl, ul) {
        for (var r = K.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        ul = !1;
      }
      if (It = 0, te = J = K = null, In = !1, rr = 0, Fi.current = null, n === null || n.return === null) {
        q = 1, ir = t, G = null;
        break;
      }
      e: {
        var o = e, i = n.return, u = n, a = t;
        if (t = le, u.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
          var c = a, v = u, h = v.tag;
          if (!(v.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var g = v.alternate;
            g ? (v.updateQueue = g.updateQueue, v.memoizedState = g.memoizedState, v.lanes = g.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var m = As(i);
          if (m !== null) {
            m.flags &= -257, Us(m, i, u, o, t), m.mode & 1 && Is(o, c, t), t = m, a = c;
            var x = t.updateQueue;
            if (x === null) {
              var y = /* @__PURE__ */ new Set();
              y.add(a), t.updateQueue = y;
            } else x.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              Is(o, c, t), Hi();
              break e;
            }
            a = Error(j(426));
          }
        } else if (W && u.mode & 1) {
          var T = As(i);
          if (T !== null) {
            !(T.flags & 65536) && (T.flags |= 256), Us(T, i, u, o, t), Si(gn(a, u));
            break e;
          }
        }
        o = a = gn(a, u), q !== 4 && (q = 2), Un === null ? Un = [o] : Un.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var p = Wu(o, a, t);
              Ls(o, p);
              break e;
            case 1:
              u = a;
              var d = o.type, f = o.stateNode;
              if (!(o.flags & 128) && (typeof d.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (xt === null || !xt.has(f)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var w = Qu(o, u, t);
                Ls(o, w);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      dc(n);
    } catch (N) {
      t = N, G === n && n !== null && (G = n = n.return);
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
      Af();
      break;
    } catch (l) {
      ac(e, l);
    }
  while (!0);
  if (_i(), I = n, dl.current = r, G !== null) throw Error(j(261));
  return ne = null, le = 0, q;
}
function Af() {
  for (; G !== null; ) cc(G);
}
function Uf() {
  for (; G !== null && !dd(); ) cc(G);
}
function cc(e) {
  var t = pc(e.alternate, e, je);
  e.memoizedProps = e.pendingProps, t === null ? dc(e) : G = t, Fi.current = null;
}
function dc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Mf(n, t), n !== null) {
        n.flags &= 32767, G = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        q = 6, G = null;
        return;
      }
    } else if (n = Lf(n, t, je), n !== null) {
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
function Pt(e, t, n) {
  var r = U, l = Te.transition;
  try {
    Te.transition = null, U = 1, Bf(e, t, n, r);
  } finally {
    Te.transition = l, U = r;
  }
  return null;
}
function Bf(e, t, n, r) {
  do
    cn();
  while (ft !== null);
  if (I & 6) throw Error(j(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(j(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (kd(e, o), e === ne && (G = ne = null, le = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || zr || (zr = !0, hc(Xr, function() {
    return cn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Te.transition, Te.transition = null;
    var i = U;
    U = 1;
    var u = I;
    I |= 4, Fi.current = null, Of(e, n), oc(n, e), af(Po), Gr = !!zo, Po = zo = null, e.current = n, Df(n), fd(), I = u, U = i, Te.transition = o;
  } else e.current = n;
  if (zr && (zr = !1, ft = e, pl = l), o = e.pendingLanes, o === 0 && (xt = null), md(n.stateNode), ke(e, Z()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (fl) throw fl = !1, e = Zo, Zo = null, e;
  return pl & 1 && e.tag !== 0 && cn(), o = e.pendingLanes, o & 1 ? e === Go ? Bn++ : (Bn = 0, Go = e) : Bn = 0, _t(), null;
}
function cn() {
  if (ft !== null) {
    var e = Wa(pl), t = Te.transition, n = U;
    try {
      if (Te.transition = null, U = 16 > e ? 16 : e, ft === null) var r = !1;
      else {
        if (e = ft, ft = null, pl = 0, I & 6) throw Error(j(331));
        var l = I;
        for (I |= 4, z = e.current; z !== null; ) {
          var o = z, i = o.child;
          if (z.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var a = 0; a < u.length; a++) {
                var c = u[a];
                for (z = c; z !== null; ) {
                  var v = z;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      An(8, v, o);
                  }
                  var h = v.child;
                  if (h !== null) h.return = v, z = h;
                  else for (; z !== null; ) {
                    v = z;
                    var g = v.sibling, m = v.return;
                    if (nc(v), v === c) {
                      z = null;
                      break;
                    }
                    if (g !== null) {
                      g.return = m, z = g;
                      break;
                    }
                    z = m;
                  }
                }
              }
              var x = o.alternate;
              if (x !== null) {
                var y = x.child;
                if (y !== null) {
                  x.child = null;
                  do {
                    var T = y.sibling;
                    y.sibling = null, y = T;
                  } while (y !== null);
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
                An(9, o, o.return);
            }
            var p = o.sibling;
            if (p !== null) {
              p.return = o.return, z = p;
              break e;
            }
            z = o.return;
          }
        }
        var d = e.current;
        for (z = d; z !== null; ) {
          i = z;
          var f = i.child;
          if (i.subtreeFlags & 2064 && f !== null) f.return = i, z = f;
          else e: for (i = d; z !== null; ) {
            if (u = z, u.flags & 2048) try {
              switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  Cl(9, u);
              }
            } catch (N) {
              X(u, u.return, N);
            }
            if (u === i) {
              z = null;
              break e;
            }
            var w = u.sibling;
            if (w !== null) {
              w.return = u.return, z = w;
              break e;
            }
            z = u.return;
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
      U = n, Te.transition = t;
    }
  }
  return !1;
}
function ea(e, t, n) {
  t = gn(n, t), t = Wu(e, t, 1), e = vt(e, t, 1), t = pe(), e !== null && (ar(e, 1, t), ke(e, t));
}
function X(e, t, n) {
  if (e.tag === 3) ea(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      ea(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (xt === null || !xt.has(r))) {
        e = gn(n, e), e = Qu(t, e, 1), t = vt(t, e, 1), e = pe(), t !== null && (ar(t, 1, e), ke(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Hf(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = pe(), e.pingedLanes |= e.suspendedLanes & n, ne === e && (le & n) === n && (q === 4 || q === 3 && (le & 130023424) === le && 500 > Z() - Ai ? Rt(e, 0) : Ii |= n), ke(e, t);
}
function fc(e, t) {
  t === 0 && (e.mode & 1 ? (t = yr, yr <<= 1, !(yr & 130023424) && (yr = 4194304)) : t = 1);
  var n = pe();
  e = tt(e, t), e !== null && (ar(e, t, n), ke(e, n));
}
function Vf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), fc(e, n);
}
function Wf(e, t) {
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
  r !== null && r.delete(t), fc(e, n);
}
var pc;
pc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ye.current) xe = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return xe = !1, $f(e, t, n);
    xe = !!(e.flags & 131072);
  }
  else xe = !1, W && t.flags & 1048576 && vu(t, ll, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Ar(e, t), e = t.pendingProps;
      var l = fn(t, ce.current);
      un(t, n), l = Li(null, t, r, e, l, n);
      var o = Mi();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, we(r) ? (o = !0, nl(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, bi(t), l.updater = _l, t.stateNode = l, l._reactInternals = t, Io(t, r, e, n), t = Bo(null, t, r, !0, o, n)) : (t.tag = 0, W && o && ki(t), fe(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Ar(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Kf(r), e = Oe(r, e), l) {
          case 0:
            t = Uo(null, t, r, e, n);
            break e;
          case 1:
            t = Vs(null, t, r, e, n);
            break e;
          case 11:
            t = Bs(null, t, r, e, n);
            break e;
          case 14:
            t = Hs(null, t, r, Oe(r.type, e), n);
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
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Oe(r, l), Uo(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Oe(r, l), Vs(e, t, r, l, n);
    case 3:
      e: {
        if (Zu(t), e === null) throw Error(j(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, Su(e, t), sl(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = gn(Error(j(423)), t), t = Ws(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = gn(Error(j(424)), t), t = Ws(e, t, r, n, l);
          break e;
        } else for (Se = gt(t.stateNode.containerInfo.firstChild), Ne = t, W = !0, Fe = null, n = ku(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
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
      return Nu(t), e === null && Oo(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, To(r, l) ? i = null : o !== null && To(r, o) && (t.flags |= 32), Xu(e, t), fe(e, t, i, n), t.child;
    case 6:
      return e === null && Oo(t), null;
    case 13:
      return Gu(e, t, n);
    case 4:
      return zi(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = hn(t, null, r, n) : fe(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Oe(r, l), Bs(e, t, r, l, n);
    case 7:
      return fe(e, t, t.pendingProps, n), t.child;
    case 8:
      return fe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return fe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, B(ol, r._currentValue), r._currentValue = i, o !== null) if (Ue(o.value, i)) {
          if (o.children === l.children && !ye.current) {
            t = nt(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var u = o.dependencies;
          if (u !== null) {
            i = o.child;
            for (var a = u.firstContext; a !== null; ) {
              if (a.context === r) {
                if (o.tag === 1) {
                  a = Je(-1, n & -n), a.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var v = c.pending;
                    v === null ? a.next = a : (a.next = v.next, v.next = a), c.pending = a;
                  }
                }
                o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), Do(
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
            if (i = o.return, i === null) throw Error(j(341));
            i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), Do(i, n, t), i = o.sibling;
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
      return l = t.type, r = t.pendingProps.children, un(t, n), l = $e(l), r = r(l), t.flags |= 1, fe(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Oe(r, t.pendingProps), l = Oe(r.type, l), Hs(e, t, r, l, n);
    case 15:
      return Ku(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Oe(r, l), Ar(e, t), t.tag = 1, we(r) ? (e = !0, nl(t)) : e = !1, un(t, n), Vu(t, r, l), Io(t, r, l, n), Bo(null, t, r, !0, e, n);
    case 19:
      return Ju(e, t, n);
    case 22:
      return Yu(e, t, n);
  }
  throw Error(j(156, t.tag));
};
function hc(e, t) {
  return Ua(e, t);
}
function Qf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Pe(e, t, n, r) {
  return new Qf(e, t, n, r);
}
function Vi(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Kf(e) {
  if (typeof e == "function") return Vi(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ui) return 11;
    if (e === ci) return 14;
  }
  return 2;
}
function wt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Pe(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Hr(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") Vi(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case Kt:
      return Ot(n.children, l, o, t);
    case ai:
      i = 8, l |= 8;
      break;
    case ao:
      return e = Pe(12, n, t, l | 2), e.elementType = ao, e.lanes = o, e;
    case uo:
      return e = Pe(13, n, t, l), e.elementType = uo, e.lanes = o, e;
    case co:
      return e = Pe(19, n, t, l), e.elementType = co, e.lanes = o, e;
    case Na:
      return bl(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case ja:
          i = 10;
          break e;
        case Sa:
          i = 9;
          break e;
        case ui:
          i = 11;
          break e;
        case ci:
          i = 14;
          break e;
        case st:
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
function bl(e, t, n, r) {
  return e = Pe(22, e, r, t), e.elementType = Na, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function lo(e, t, n) {
  return e = Pe(6, e, null, t), e.lanes = n, e;
}
function oo(e, t, n) {
  return t = Pe(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Yf(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Il(0), this.expirationTimes = Il(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Il(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Wi(e, t, n, r, l, o, i, u, a) {
  return e = new Yf(e, t, n, u, a), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Pe(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, bi(o), e;
}
function Xf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Qt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function mc(e) {
  if (!e) return jt;
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
          if (we(t.type)) {
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
    if (we(n)) return mu(e, n, t);
  }
  return t;
}
function gc(e, t, n, r, l, o, i, u, a) {
  return e = Wi(n, r, !0, e, l, o, i, u, a), e.context = mc(null), n = e.current, r = pe(), l = yt(n), o = Je(r, l), o.callback = t ?? null, vt(n, o, l), e.current.lanes = l, ar(e, l, r), ke(e, r), e;
}
function zl(e, t, n, r) {
  var l = t.current, o = pe(), i = yt(l);
  return n = mc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Je(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = vt(l, t, i), e !== null && (Ae(e, l, i, o), Dr(e, l, i)), i;
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
function ta(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Qi(e, t) {
  ta(e, t), (e = e.alternate) && ta(e, t);
}
function Zf() {
  return null;
}
var vc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Ki(e) {
  this._internalRoot = e;
}
Pl.prototype.render = Ki.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(j(409));
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
    var t = Ya();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ut.length && t !== 0 && t < ut[n].priority; n++) ;
    ut.splice(n, 0, e), n === 0 && Za(e);
  }
};
function Yi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Tl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function na() {
}
function Gf(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = ml(i);
        o.call(c);
      };
    }
    var i = gc(t, r, e, 0, null, !1, !1, "", na);
    return e._reactRootContainer = i, e[et] = i.current, Jn(e.nodeType === 8 ? e.parentNode : e), Ut(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function() {
      var c = ml(a);
      u.call(c);
    };
  }
  var a = Wi(e, 0, !1, null, null, !1, !1, "", na);
  return e._reactRootContainer = a, e[et] = a.current, Jn(e.nodeType === 8 ? e.parentNode : e), Ut(function() {
    zl(t, a, n, r);
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
    zl(t, i, e, l);
  } else i = Gf(n, t, e, l, r);
  return ml(i);
}
Qa = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = $n(t.pendingLanes);
        n !== 0 && (pi(t, n | 1), ke(t, Z()), !(I & 6) && (vn = Z() + 500, _t()));
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
Ka = function(e) {
  if (e.tag === 13) {
    var t = yt(e), n = tt(e, t);
    if (n !== null) {
      var r = pe();
      Ae(n, e, t, r);
    }
    Qi(e, t);
  }
};
Ya = function() {
  return U;
};
Xa = function(e, t) {
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
            if (!l) throw Error(j(90));
            Ca(r), ho(r, l);
          }
        }
      }
      break;
    case "textarea":
      ba(e, n);
      break;
    case "select":
      t = n.value, t != null && ln(e, !!n.multiple, t, !1);
  }
};
Ra = Ui;
Oa = Ut;
var Jf = { usingClientEntryPoint: !1, Events: [cr, Gt, jl, La, Ma, Ui] }, bn = { findFiberByHostInstance: Tt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, qf = { bundleType: bn.bundleType, version: bn.version, rendererPackageName: bn.rendererPackageName, rendererConfig: bn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: rt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ia(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: bn.findFiberByHostInstance || Zf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Pr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Pr.isDisabled && Pr.supportsFiber) try {
    xl = Pr.inject(qf), Qe = Pr;
  } catch {
  }
}
Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Jf;
Ce.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Yi(t)) throw Error(j(200));
  return Xf(e, t, null, n);
};
Ce.createRoot = function(e, t) {
  if (!Yi(e)) throw Error(j(299));
  var n = !1, r = "", l = vc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Wi(e, 1, !1, null, null, n, !1, r, l), e[et] = t.current, Jn(e.nodeType === 8 ? e.parentNode : e), new Ki(t);
};
Ce.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(j(188)) : (e = Object.keys(e).join(","), Error(j(268, e)));
  return e = Ia(t), e = e === null ? null : e.stateNode, e;
};
Ce.flushSync = function(e) {
  return Ut(e);
};
Ce.hydrate = function(e, t, n) {
  if (!Tl(t)) throw Error(j(200));
  return $l(null, e, t, !0, n);
};
Ce.hydrateRoot = function(e, t, n) {
  if (!Yi(e)) throw Error(j(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = vc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = gc(t, null, e, 1, n ?? null, l, !1, o, i), e[et] = t.current, Jn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Pl(t);
};
Ce.render = function(e, t, n) {
  if (!Tl(t)) throw Error(j(200));
  return $l(null, e, t, !1, n);
};
Ce.unmountComponentAtNode = function(e) {
  if (!Tl(e)) throw Error(j(40));
  return e._reactRootContainer ? (Ut(function() {
    $l(null, null, e, !1, function() {
      e._reactRootContainer = null, e[et] = null;
    });
  }), !0) : !1;
};
Ce.unstable_batchedUpdates = Ui;
Ce.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Tl(n)) throw Error(j(200));
  if (e == null || e._reactInternals === void 0) throw Error(j(38));
  return $l(e, t, n, !1, r);
};
Ce.version = "18.3.1-next-f1338f8080-20240426";
function xc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(xc);
    } catch (e) {
      console.error(e);
    }
}
xc(), xa.exports = Ce;
var ep = xa.exports, yc, ra = ep;
yc = ra.createRoot, ra.hydrateRoot;
function P({ name: e, className: t }) {
  return /* @__PURE__ */ s.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("ha-icon", { icon: `mdi:${e}` }) });
}
const tp = '<defs><linearGradient id="hl-mark-g" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#FFB547"/><stop offset="1" stop-color="#FF5A1F"/></linearGradient></defs><polygon points="256,62 452,222 452,446 60,446 60,222" fill="url(#hl-mark-g)" stroke="url(#hl-mark-g)" stroke-width="56" stroke-linejoin="round"/><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z" fill="#fff" transform="translate(256 292) scale(10) translate(-12 -12)"/>';
function la({ size: e = 28 }) {
  return /* @__PURE__ */ s.jsx(
    "svg",
    {
      className: "logo-mark",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      "aria-hidden": "true",
      dangerouslySetInnerHTML: { __html: tp }
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
], Hn = { heat: "Heating", water: "Hot water" }, Me = (e) => String((e == null ? void 0 : e.message) ?? e);
function wc(e, t, n) {
  const [r, l] = C.useState(!1), [o, i] = C.useState(null);
  return { busy: r, result: o, send: async (a, c) => {
    l(!0);
    try {
      await e().callWS({ entry_id: t, channel: n, ...a }), i({ kind: "ok", text: c });
    } catch (v) {
      i({ kind: "error", text: Me(v) });
    } finally {
      l(!1);
    }
  } };
}
const Mt = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, np = [30, 60, 120, 180];
function rp({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onOpenDevice: l,
  onOpenRoom: o
}) {
  const [i, u] = C.useState([]), [a, c] = C.useState("all");
  C.useEffect(() => {
    const m = e().connection.subscribeMessage((x) => u(x.rooms), {
      type: "hive_local/rooms/subscribe"
    });
    return () => {
      m.then((x) => x()).catch(() => {
      });
    };
  }, [e]);
  const v = t.flatMap((m) => m.channels.map((x) => {
    var y, T;
    return { d: m, c: x, s: ((T = (y = n[m.entry_id]) == null ? void 0 : y[x]) == null ? void 0 : T.status) ?? null };
  })), h = t.length > 1, g = [
    { id: "all", label: "All", icon: "" },
    { id: "heat", label: "Heating", icon: "radiator" },
    ...v.some(({ c: m }) => m === "water") ? [{ id: "water", label: "Hot water", icon: "water-boiler" }] : [],
    ...i.length ? [{ id: "rooms", label: "Rooms", icon: "home-thermometer-outline" }] : []
  ];
  return /* @__PURE__ */ s.jsx("div", { className: "home", children: t.length > 0 && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("h3", { className: "home-section", children: "Quick actions" }),
    /* @__PURE__ */ s.jsx(lp, { getHass: e, devices: t, status: n }),
    /* @__PURE__ */ s.jsx("h3", { className: "home-section", children: "Your devices" }),
    g.length > 2 && /* @__PURE__ */ s.jsx("div", { className: "pills", role: "tablist", "aria-label": "Show", children: g.map((m) => /* @__PURE__ */ s.jsxs("button", { role: "tab", "aria-selected": a === m.id, className: `pill ${a === m.id ? "on" : ""}`, onClick: () => c(m.id), children: [
      m.icon && /* @__PURE__ */ s.jsx(P, { name: m.icon }),
      " ",
      m.label
    ] }, m.id)) }),
    /* @__PURE__ */ s.jsxs("div", { className: "device-grid", children: [
      v.filter(({ c: m }) => a === "all" || a === m).map(({ d: m, c: x }) => {
        var y;
        return /* @__PURE__ */ s.jsx(
          kc,
          {
            getHass: e,
            device: m,
            channel: x,
            info: (y = n[m.entry_id]) == null ? void 0 : y[x],
            showDevice: h,
            limits: r,
            onOpen: () => l(m.entry_id, x)
          },
          `${m.entry_id}-${x}`
        );
      }),
      (a === "all" || a === "rooms") && i.map((m) => /* @__PURE__ */ s.jsx(op, { room: m, showReceiver: h, onOpen: () => o(m.id) }, m.id))
    ] })
  ] }) });
}
function lp({ getHass: e, devices: t, status: n }) {
  var h, g;
  const [r, l] = C.useState(null), [o, i] = C.useState(null), u = t.length > 1, a = async (m, x, y) => {
    l(m);
    try {
      for (const T of x) await e().callWS(T);
      i({ ok: !0, text: y });
    } catch (T) {
      i({ ok: !1, text: Me(T) });
    } finally {
      l(null);
    }
  }, c = [];
  for (const m of t)
    for (const x of m.channels) {
      const y = (h = n[m.entry_id]) == null ? void 0 : h[x];
      if (((g = y == null ? void 0 : y.status) == null ? void 0 : g.mode) === "boost") continue;
      const T = Mt((y == null ? void 0 : y.boost_minutes) ?? 30), p = x === "water" ? "hot water" : "heating";
      c.push({
        id: `boost-${m.entry_id}-${x}`,
        label: `Boost ${p} · ${T}${u ? ` (${m.name})` : ""}`,
        icon: "rocket-launch",
        kind: x,
        msgs: [{ type: "hive_local/boost", entry_id: m.entry_id, channel: x }],
        done: `Boosting ${p} for ${T}`
      });
    }
  const v = t.flatMap(
    (m) => m.channels.filter((x) => {
      var T, p, d;
      const y = (d = (p = (T = n[m.entry_id]) == null ? void 0 : T[x]) == null ? void 0 : p.status) == null ? void 0 : d.mode;
      return y && y !== "schedule";
    }).map((x) => ({ d: m, c: x }))
  );
  return v.length && c.push({
    id: "schedule",
    label: "Everything back to schedule",
    icon: "calendar-clock",
    kind: "neutral",
    msgs: v.map(
      ({ d: m, c: x }) => {
        var y, T, p;
        return ((p = (T = (y = n[m.entry_id]) == null ? void 0 : y[x]) == null ? void 0 : T.status) == null ? void 0 : p.mode) === "boost" ? { type: "hive_local/cancel_boost", entry_id: m.entry_id, channel: x } : { type: "hive_local/mode", entry_id: m.entry_id, channel: x, mode: "schedule" };
      }
    ),
    done: "Back on the schedule"
  }), /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: "quick", children: c.map((m) => /* @__PURE__ */ s.jsxs("button", { className: `quick-action ${m.kind}`, disabled: r != null, onClick: () => a(m.id, m.msgs, m.done), children: [
      /* @__PURE__ */ s.jsx("span", { className: "quick-icon", children: /* @__PURE__ */ s.jsx(P, { name: r === m.id ? "timer-sand" : m.icon }) }),
      /* @__PURE__ */ s.jsx("span", { className: "quick-label", children: m.label })
    ] }, m.id)) }),
    o && /* @__PURE__ */ s.jsx("div", { className: `status ${o.ok ? "ok" : "error"}`, children: o.text })
  ] });
}
function op({ room: e, showReceiver: t, onOpen: n }) {
  const r = e.target != null ? `${e.target}°` : e.target_range ? `${e.target_range[0]}–${e.target_range[1]}°` : null, l = `${e.valves.length} valve${e.valves.length === 1 ? "" : "s"}`;
  return /* @__PURE__ */ s.jsx("section", { className: `card device room-device ${e.heating ? "heating" : "idle"}`, children: /* @__PURE__ */ s.jsxs("div", { className: "device-head", role: "button", tabIndex: 0, onClick: n, onKeyDown: (o) => o.key === "Enter" && n(), children: [
    /* @__PURE__ */ s.jsxs("div", { className: "device-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "device-icon room", children: /* @__PURE__ */ s.jsx(P, { name: "home-thermometer-outline" }) }),
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
        /* @__PURE__ */ s.jsx(P, { name: "fire", className: "status-icon heat" })
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
function kc({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  showDevice: l,
  limits: o,
  onOpen: i,
  page: u = !1
}) {
  var ee, Vt, Be;
  const a = n === "water", c = (r == null ? void 0 : r.status) ?? null, { busy: v, result: h, send: g } = wc(e, t.entry_id, n), m = !!c && c.mode !== "off" && c.heating, x = !c || c.mode === "off" ? "off" : m ? "heating" : "idle", y = !a && (c == null ? void 0 : c.setpoint) != null && c.setpoint <= 1, T = a || (c == null ? void 0 : c.setpoint) == null ? null : y ? (r == null ? void 0 : r.frost_temperature) ?? null : c.setpoint, p = [
    { id: "schedule", label: "Schedule" },
    { id: "manual", label: a ? "Always on" : "Manual" },
    { id: "off", label: "Off" }
  ], d = (r == null ? void 0 : r.boost_minutes) ?? 30, f = (r == null ? void 0 : r.boost_temperature) ?? 21, [w, N] = C.useState(!1), _ = (o == null ? void 0 : o.boost_min_temp) ?? 5, b = (o == null ? void 0 : o.heat_max) ?? 32, k = (A) => Math.min(b, Math.max(_, Math.round(A * 2) / 2)), R = [.../* @__PURE__ */ new Set([...np, d])].filter((A) => A <= ((o == null ? void 0 : o.boost_max_minutes) ?? 360)).sort((A, fr) => A - fr), [L, M] = C.useState(null), ge = C.useRef();
  C.useEffect(() => () => window.clearTimeout(ge.current), []), C.useEffect(() => M(null), [c == null ? void 0 : c.setpoint, c == null ? void 0 : c.mode]);
  const de = !a && !!c && c.mode !== "off", lt = (A) => {
    const Ll = k((L ?? T ?? 20) + A);
    M(Ll), window.clearTimeout(ge.current), ge.current = window.setTimeout(() => {
      g({ type: "hive_local/target", temperature: Ll }, `Set to ${Ll}°`).then(
        () => window.setTimeout(() => M(null), 8e3)
      );
    }, 1200);
  }, Ct = L ?? T, ot = (A, fr) => g({ type: "hive_local/boost", minutes: A, ...a ? {} : { temperature: fr } }, `Boosting for ${Mt(A)}`).then(
    () => N(!1)
  ), Et = c ? c.mode === "boost" ? "Boost to" : y && L == null ? "Frost" : c.mode === "manual" ? "Hold at" : "Target" : "", E = (c == null ? void 0 : c.mode) === "boost", O = E ? ((ee = r == null ? void 0 : r.preheat) == null ? void 0 : ee.active_for) ?? null : null, S = O != null;
  let $ = "Waiting for the receiver…";
  c && (c.mode === "off" ? $ = "Off" : E ? $ = a ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    "Boosting ",
    /* @__PURE__ */ s.jsx(P, { name: "rocket-launch", className: "status-icon" })
  ] }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    "Boosting to ",
    /* @__PURE__ */ s.jsxs("b", { children: [
      c.setpoint,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ s.jsx(P, { name: "rocket-launch", className: "status-icon" })
  ] }) : a ? $ = m ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    "Heating water ",
    /* @__PURE__ */ s.jsx(P, { name: "water", className: "status-icon" })
  ] }) : "Not heating now" : m ? $ = /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    "Heating to ",
    /* @__PURE__ */ s.jsxs("b", { children: [
      T,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ s.jsx(P, { name: "fire", className: "status-icon" })
  ] }) : y ? $ = /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    "Frost protection ",
    /* @__PURE__ */ s.jsxs("b", { children: [
      T,
      "°"
    ] })
  ] }) : $ = T != null ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    "Target ",
    /* @__PURE__ */ s.jsxs("b", { children: [
      T,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ s.jsx(P, { name: "check-circle-outline", className: "status-icon done" })
  ] }) : "Idle"), c && S && ($ = /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    "Pre-heating to ",
    /* @__PURE__ */ s.jsxs("b", { children: [
      c.setpoint,
      "°"
    ] }),
    " ",
    /* @__PURE__ */ s.jsx(P, { name: "sun-clock", className: "status-icon" })
  ] }));
  const D = c ? S ? `Pre-heating for ${(Vt = r == null ? void 0 : r.preheat) == null ? void 0 : Vt.active_for}` : c.mode === "boost" ? c.boost_remaining != null ? `Boost · ${Mt(c.boost_remaining)} left` : "Boost" : c.mode === "schedule" ? "On schedule" : (Be = p.find((A) => A.id === c.mode)) == null ? void 0 : Be.label : "", ie = u;
  return /* @__PURE__ */ s.jsxs("section", { className: `card device ${n} ${x} ${u ? "page" : ""}`, children: [
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "device-head",
        ...u ? {} : { role: "button", tabIndex: 0, onClick: i, onKeyDown: (A) => A.key === "Enter" && A.target === A.currentTarget && (i == null ? void 0 : i()) },
        children: [
          /* @__PURE__ */ s.jsxs("div", { className: "device-row", children: [
            /* @__PURE__ */ s.jsx("span", { className: `device-icon ${n}`, children: /* @__PURE__ */ s.jsx(P, { name: a ? "water-boiler" : "radiator" }) }),
            /* @__PURE__ */ s.jsxs("div", { className: "device-name", children: [
              /* @__PURE__ */ s.jsx("span", { children: Hn[n] }),
              /* @__PURE__ */ s.jsx("span", { className: "muted small", children: l ? `${t.name} · ${D}` : D })
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "device-status", children: $ })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "device-row", children: [
            /* @__PURE__ */ s.jsxs("div", { className: "device-big", children: [
              a ? c ? c.mode === "off" ? "Off" : m ? "On" : "Idle" : "–" : (c == null ? void 0 : c.current_temperature) != null ? c.current_temperature.toFixed(1) : "–",
              !a && /* @__PURE__ */ s.jsx("span", { children: "°" }),
              /* @__PURE__ */ s.jsx("small", { children: a ? "Now" : "Actual" })
            ] }),
            /* @__PURE__ */ s.jsxs(
              "button",
              {
                className: `device-action ${E ? "boosting" : ""}`,
                disabled: v || !c,
                onClick: (A) => {
                  A.stopPropagation(), N(!0);
                },
                children: [
                  /* @__PURE__ */ s.jsx(P, { name: S ? "sun-clock" : "rocket-launch" }),
                  " ",
                  S ? "Pre-heating" : E ? "Boosting" : "Boost"
                ]
              }
            )
          ] })
        ]
      }
    ),
    ie && /* @__PURE__ */ s.jsxs("div", { className: "device-body", children: [
      !a && /* @__PURE__ */ s.jsxs("div", { className: "target-row", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "target-text", children: [
          /* @__PURE__ */ s.jsx("span", { className: "target-label", children: Et || "Target" }),
          /* @__PURE__ */ s.jsx("span", { className: "muted small", children: c ? c.mode === "off" ? "Turn the heating on to set a target" : c.mode === "schedule" ? "Until the next scheduled change" : c.mode === "boost" ? "Keeps the boost time left" : "Held until you change it" : "" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "target-control", children: [
          /* @__PURE__ */ s.jsx("button", { className: "round target-btn", disabled: !de, onClick: () => lt(-0.5), "aria-label": "Lower the target", children: /* @__PURE__ */ s.jsx(P, { name: "minus" }) }),
          /* @__PURE__ */ s.jsx("span", { className: `target-value ${L != null ? "pending" : ""}`, children: Ct != null && (c == null ? void 0 : c.mode) !== "off" ? `${Ct.toFixed(1)}°` : "–" }),
          /* @__PURE__ */ s.jsx("button", { className: "round target-btn", disabled: !de, onClick: () => lt(0.5), "aria-label": "Raise the target", children: /* @__PURE__ */ s.jsx(P, { name: "plus" }) })
        ] })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "segmented full", children: p.map((A) => /* @__PURE__ */ s.jsx(
        "button",
        {
          className: (c == null ? void 0 : c.mode) === A.id ? "on" : "",
          disabled: v || !c,
          onClick: () => g({ type: "hive_local/mode", mode: A.id }, A.id === "schedule" ? "Following the schedule" : A.label),
          children: A.label
        },
        A.id
      )) })
    ] }),
    (h == null ? void 0 : h.kind) === "error" && /* @__PURE__ */ s.jsx("div", { className: "status error", children: h.text }),
    w && /* @__PURE__ */ s.jsx(
      ip,
      {
        title: S ? "Pre-heating" : E ? "Boosting" : "Boost",
        subtitle: l ? `${t.name} · ${Hn[n]}` : Hn[n],
        water: a,
        boosting: E,
        preheatFor: O,
        remaining: (c == null ? void 0 : c.boost_remaining) ?? null,
        boostTarget: E ? (c == null ? void 0 : c.setpoint) ?? null : null,
        defaultMinutes: d,
        defaultTemp: f,
        durations: R,
        clampTemp: k,
        busy: v,
        onBoost: ot,
        onStop: () => g({ type: "hive_local/cancel_boost" }, "Boost cancelled").then(() => N(!1)),
        onClose: () => N(!1)
      }
    )
  ] });
}
function ip({
  title: e,
  subtitle: t,
  water: n,
  boosting: r,
  preheatFor: l,
  remaining: o,
  boostTarget: i,
  defaultMinutes: u,
  defaultTemp: a,
  durations: c,
  clampTemp: v,
  busy: h,
  onBoost: g,
  onStop: m,
  onClose: x
}) {
  const [y, T] = C.useState(u), [p, d] = C.useState(a);
  return C.useEffect(() => {
    const f = (w) => w.key === "Escape" && x();
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [x]), /* @__PURE__ */ s.jsx("div", { className: "sheet-backdrop", onClick: (f) => {
    f.stopPropagation(), x();
  }, children: /* @__PURE__ */ s.jsxs("div", { className: `sheet ${n ? "water" : "heat"}`, role: "dialog", "aria-modal": "true", "aria-label": `${e} ${t}`, onClick: (f) => f.stopPropagation(), children: [
    /* @__PURE__ */ s.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ s.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ s.jsx("h2", { children: e }),
      /* @__PURE__ */ s.jsx("span", { className: "muted", children: t })
    ] }),
    r ? /* @__PURE__ */ s.jsxs("div", { className: "sheet-live", children: [
      /* @__PURE__ */ s.jsx(P, { name: "clock-outline" }),
      /* @__PURE__ */ s.jsx("span", { children: l ? `Warming up${i != null ? ` to ${i}°` : ""} for ${l}, when your schedule changes` : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        o != null ? `${Mt(o)} left` : "Boosting",
        !n && i != null ? ` · to ${i}°` : ""
      ] }) })
    ] }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      !n && /* @__PURE__ */ s.jsxs("div", { className: "sheet-field", children: [
        /* @__PURE__ */ s.jsx("span", { className: "sheet-label", children: "Temperature" }),
        /* @__PURE__ */ s.jsxs("div", { className: "sheet-temp", children: [
          /* @__PURE__ */ s.jsx("button", { className: "round sheet-step", onClick: () => d(v(p - 0.5)), "aria-label": "Lower", children: /* @__PURE__ */ s.jsx(P, { name: "minus" }) }),
          /* @__PURE__ */ s.jsxs("span", { className: "sheet-temp-value", children: [
            p.toFixed(1),
            "°"
          ] }),
          /* @__PURE__ */ s.jsx("button", { className: "round sheet-step", onClick: () => d(v(p + 0.5)), "aria-label": "Raise", children: /* @__PURE__ */ s.jsx(P, { name: "plus" }) })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "sheet-field", children: [
        /* @__PURE__ */ s.jsx("span", { className: "sheet-label", children: "How long" }),
        /* @__PURE__ */ s.jsx("div", { className: "sheet-lengths", role: "radiogroup", "aria-label": "How long", children: c.map((f) => /* @__PURE__ */ s.jsx("button", { role: "radio", "aria-checked": f === y, className: f === y ? "on" : "", onClick: () => T(f), children: Mt(f) }, f)) })
      ] })
    ] }),
    r ? /* @__PURE__ */ s.jsxs("button", { className: "sheet-go stop", disabled: h, onClick: m, children: [
      /* @__PURE__ */ s.jsx("span", { className: "stop-square" }),
      " ",
      l ? "Stop pre-heating" : "Stop boost"
    ] }) : /* @__PURE__ */ s.jsx("button", { className: "sheet-go", disabled: h, onClick: () => g(y, p), children: n ? `Boost hot water for ${Mt(y)}` : `Boost to ${p.toFixed(1)}° for ${Mt(y)}` }),
    /* @__PURE__ */ s.jsx("button", { className: "ghost sheet-cancel", onClick: x, children: "Cancel" })
  ] }) });
}
const sp = [60, 90, 120, 180];
function ap({ getHass: e, device: t, info: n }) {
  const { busy: r, result: l, send: o } = wc(e, t.entry_id, "heat"), i = [.../* @__PURE__ */ new Set([...sp, n.max_lead])].sort((a, c) => a - c);
  let u;
  return n.enabled ? n.active_for ? u = `Pre-heating now, for ${n.active_for}.` : n.rate == null ? u = `Still learning how fast your home warms up (${n.warmups} of ${n.warmups_needed} warm-ups seen).` : n.schedule_known ? n.next ? u = `Next: starts ${n.next.start} to reach ${n.next.setpoint}° by ${n.next.at}.` : u = "Nothing to pre-heat for yet." : u = "Reading the heating schedule…" : u = "Start heating early, so it's warm by the time the schedule says.", /* @__PURE__ */ s.jsxs("section", { className: "card preheat", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "target-row", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "device-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "device-icon", children: /* @__PURE__ */ s.jsx(P, { name: "sun-clock" }) }),
        /* @__PURE__ */ s.jsxs("div", { className: "target-text", children: [
          /* @__PURE__ */ s.jsx("span", { className: "target-label", children: "Pre-heat" }),
          /* @__PURE__ */ s.jsx("span", { className: "muted small", children: u })
        ] })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "segmented", role: "radiogroup", "aria-label": "Pre-heat", children: [!0, !1].map((a) => /* @__PURE__ */ s.jsx(
        "button",
        {
          role: "radio",
          "aria-checked": n.enabled === a,
          className: n.enabled === a ? "on" : "",
          disabled: r,
          onClick: () => o({ type: "hive_local/preheat", enabled: a }, a ? "Pre-heat on" : "Pre-heat off"),
          children: a ? "On" : "Off"
        },
        String(a)
      )) })
    ] }),
    n.enabled && /* @__PURE__ */ s.jsxs("div", { className: "target-row", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "target-text", children: [
        /* @__PURE__ */ s.jsx("span", { children: "Start at most" }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: n.rate != null ? `Your home warms about ${n.rate.toFixed(1)}° an hour` : "Before the scheduled time" })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "segmented", role: "radiogroup", "aria-label": "Start at most", children: i.map((a) => /* @__PURE__ */ s.jsx(
        "button",
        {
          role: "radio",
          "aria-checked": n.max_lead === a,
          className: n.max_lead === a ? "on" : "",
          disabled: r,
          onClick: () => o({ type: "hive_local/preheat", max_lead: a }, "Saved"),
          children: a % 60 ? `${a / 60} h`.replace(".5 h", "½ h") : `${a / 60} h`
        },
        a
      )) })
    ] }),
    (l == null ? void 0 : l.kind) === "error" && /* @__PURE__ */ s.jsx("div", { className: "status error", children: l.text })
  ] });
}
const up = ["monday", "tuesday", "wednesday", "thursday", "friday"], cp = ["saturday", "sunday"], zn = (e) => e[0].toUpperCase() + e.slice(1, 3), Vr = (e) => {
  const [t, n] = e.split(":").map(Number);
  return t * 60 + n;
};
function dp({
  getHass: e,
  device: t,
  channel: n,
  limits: r,
  mode: l,
  preheatFor: o
}) {
  var O;
  const [i, u] = C.useState({}), [a, c] = C.useState({}), [v, h] = C.useState("monday"), [g, m] = C.useState({ kind: "idle" }), x = t.entry_id, y = n === "water", T = JSON.stringify(i) !== JSON.stringify(a), p = C.useCallback(async () => {
    m({ kind: "busy", text: "Reading from receiver…" });
    try {
      const S = await e().callWS({
        type: "hive_local/get",
        entry_id: x,
        channel: n
      });
      u(S.schedule), c(S.schedule);
      const $ = Object.keys(S.schedule).length;
      m(
        S.complete ? { kind: "ok", text: "Schedule read from receiver" } : $ ? { kind: "error", text: `Only got ${$}/7 days — try reading again` } : { kind: "error", text: "No reply. On Zigbee2MQTT, check the receiver's friendly name; on ZHA, check the receiver is online." }
      );
    } catch (S) {
      m({ kind: "error", text: Me(S) });
    }
  }, [x, n, e]);
  C.useEffect(() => {
    p();
  }, [p]), C.useEffect(() => {
    if (g.kind !== "ok") return;
    const S = setTimeout(() => m({ kind: "idle" }), 4e3);
    return () => clearTimeout(S);
  }, [g]);
  const d = async () => {
    const S = Object.fromEntries(
      bt.filter(($) => {
        var D;
        return JSON.stringify(i[$]) !== JSON.stringify(a[$]) && ((D = i[$]) == null ? void 0 : D.length);
      }).map(($) => [$, i[$]])
    );
    if (Object.keys(S).length) {
      m({ kind: "busy", text: "Writing to receiver…" });
      try {
        const $ = await e().callWS({
          type: "hive_local/set",
          entry_id: x,
          channel: n,
          schedule: S
        }), D = { ...i, ...$.schedule };
        u(D), c(D);
        const ie = Object.keys($.schedule).map((ee) => ee[0].toUpperCase() + ee.slice(1, 3));
        m({
          kind: "ok",
          text: `Wrote ${ie.join(", ")}. Read back to confirm the receiver kept it.`
        });
      } catch ($) {
        m({ kind: "error", text: Me($) });
      }
    }
  }, f = i[v] ?? [], w = r.max_transitions, N = (S) => u(($) => ({ ...$, [v]: [...S].sort((D, ie) => Vr(D.time) - Vr(ie.time)) })), _ = () => {
    const S = f[f.length - 1], $ = S ? fp(f, Vr(S.time) + 60) : "06:00", D = y ? r.water_on : (S == null ? void 0 : S.setpoint) ?? 20;
    N([...f, { time: $, setpoint: D }]);
  }, b = (S) => u(($) => {
    const D = { ...$ };
    for (const ie of S) D[ie] = f.map((ee) => ({ ...ee }));
    return D;
  }), k = C.useMemo(() => {
    const S = Object.values(i).flat().map(($) => $.setpoint).filter(($) => $ > r.heat_min);
    return { lo: Math.min(15, ...S), hi: Math.max(24, ...S) };
  }, [i, r.heat_min]), R = bt[((/* @__PURE__ */ new Date()).getDay() + 6) % 7], [L, M] = C.useState(null), [ge, de] = C.useState(!1), lt = bt.filter((S) => JSON.stringify(i[S]) !== JSON.stringify(a[S])), Ct = bt[(bt.indexOf(v) + 1) % 7], ot = (O = (i[Ct] ?? [])[0]) == null ? void 0 : O.time, Et = (S) => y ? S.setpoint < r.water_on : S.setpoint <= r.heat_min;
  let E = "Stored on the receiver, so it keeps running without Home Assistant.";
  return l === "schedule" ? E = "Your schedule is running." : l === "manual" ? E = `Your schedule isn't being used: ${y ? "hot water is always on" : "heating is on Manual"}.` : l === "off" ? E = `Your schedule isn't being used: ${y ? "hot water" : "heating"} is off.` : l === "boost" && o ? E = `Your schedule is running, starting early so it's warm by ${o}.` : l === "boost" && (E = "Boosting now. Your schedule carries on after the boost."), /* @__PURE__ */ s.jsxs("div", { className: "sched", children: [
    /* @__PURE__ */ s.jsx("p", { className: "sched-status muted", children: E }),
    /* @__PURE__ */ s.jsx("div", { className: "sched-days", role: "tablist", "aria-label": "Day", children: bt.map((S) => /* @__PURE__ */ s.jsxs(
      "button",
      {
        role: "tab",
        "aria-selected": S === v,
        "aria-label": S,
        className: `sched-day ${S === v ? "on" : ""} ${S === R ? "today" : ""}`,
        onClick: () => {
          h(S), M(null);
        },
        children: [
          S[0].toUpperCase(),
          lt.includes(S) && /* @__PURE__ */ s.jsx("i", { className: "sched-dot", "aria-label": "changed" })
        ]
      },
      S
    )) }),
    g.text && g.kind !== "idle" && /* @__PURE__ */ s.jsx("div", { className: `status ${g.kind}`, children: g.text }),
    /* @__PURE__ */ s.jsxs("div", { className: "sched-list", children: [
      f.length === 0 && /* @__PURE__ */ s.jsxs("p", { className: "muted sched-empty", children: [
        "Nothing scheduled on ",
        v[0].toUpperCase() + v.slice(1),
        " yet."
      ] }),
      f.map((S, $) => {
        var ee;
        const D = ((ee = f[$ + 1]) == null ? void 0 : ee.time) ?? (ot ? `${ot} (${zn(Ct)})` : "00:00"), ie = Et(S);
        return /* @__PURE__ */ s.jsxs("button", { className: "slot", onClick: () => M($), children: [
          /* @__PURE__ */ s.jsx(
            "span",
            {
              className: `slot-badge ${ie ? "off" : ""}`,
              style: ie ? void 0 : { borderColor: y ? "var(--hl-brand)" : pp(S.setpoint, k, r) },
              children: ie ? /* @__PURE__ */ s.jsx(P, { name: y ? "power" : "snowflake" }) : y ? "On" : `${S.setpoint}°`
            }
          ),
          /* @__PURE__ */ s.jsxs("span", { className: "slot-time", children: [
            S.time,
            " – ",
            D
          ] }),
          /* @__PURE__ */ s.jsx(P, { name: "chevron-right", className: "slot-chev" })
        ] }, $);
      }),
      /* @__PURE__ */ s.jsxs("button", { className: "slot slot-add", onClick: () => {
        _(), M(f.length);
      }, disabled: f.length >= w, children: [
        /* @__PURE__ */ s.jsx("span", { className: "slot-badge add", children: /* @__PURE__ */ s.jsx(P, { name: "plus" }) }),
        /* @__PURE__ */ s.jsx("span", { className: "slot-time", children: f.length >= w ? `${w} times a day at most` : "Add a time" })
      ] })
    ] }),
    T && /* @__PURE__ */ s.jsxs("div", { className: "sched-save", children: [
      /* @__PURE__ */ s.jsx(P, { name: "pencil-outline", className: "sched-save-icon" }),
      /* @__PURE__ */ s.jsx("span", { className: "sched-changed", title: `Changed: ${lt.map(zn).join(", ")}`, children: "Unsaved changes" }),
      /* @__PURE__ */ s.jsx("button", { className: "sched-undo", onClick: () => {
        u(a), M(null);
      }, children: "Undo" }),
      /* @__PURE__ */ s.jsx("button", { className: "sched-write", onClick: d, disabled: g.kind === "busy", children: "Save" })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: `fab-wrap ${T ? "raised" : ""}`, children: [
      ge && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "fab-backdrop", onClick: () => de(!1) }),
        /* @__PURE__ */ s.jsxs("div", { className: "fab-menu", role: "menu", children: [
          /* @__PURE__ */ s.jsxs("button", { role: "menuitem", onClick: () => {
            de(!1), p();
          }, disabled: g.kind === "busy", children: [
            /* @__PURE__ */ s.jsx(P, { name: "download" }),
            " Read from the receiver"
          ] }),
          /* @__PURE__ */ s.jsxs("button", { role: "menuitem", onClick: () => {
            de(!1), b(up);
          }, disabled: !f.length, children: [
            /* @__PURE__ */ s.jsx(P, { name: "content-copy" }),
            " Copy ",
            zn(v),
            " to weekdays"
          ] }),
          /* @__PURE__ */ s.jsxs("button", { role: "menuitem", onClick: () => {
            de(!1), b(cp);
          }, disabled: !f.length, children: [
            /* @__PURE__ */ s.jsx(P, { name: "content-copy" }),
            " Copy ",
            zn(v),
            " to the weekend"
          ] }),
          /* @__PURE__ */ s.jsxs("button", { role: "menuitem", onClick: () => {
            de(!1), b([...bt]);
          }, disabled: !f.length, children: [
            /* @__PURE__ */ s.jsx(P, { name: "content-copy" }),
            " Copy ",
            zn(v),
            " to every day"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsx("button", { className: "fab", "aria-label": "More", "aria-expanded": ge, onClick: () => de(!ge), children: /* @__PURE__ */ s.jsx(P, { name: ge ? "close" : "dots-horizontal" }) })
    ] }),
    L != null && f[L] && /* @__PURE__ */ s.jsx(
      hp,
      {
        slot: f[L],
        dayName: v[0].toUpperCase() + v.slice(1),
        isWater: y,
        limits: r,
        canDelete: !0,
        onChange: (S) => N(f.map(($, D) => D === L ? S : $)),
        onDelete: () => {
          N(f.filter((S, $) => $ !== L)), M(null);
        },
        onClose: () => M(null)
      }
    )
  ] });
}
function fp(e, t) {
  const n = new Set(e.map((l) => Vr(l.time)));
  let r = Math.min(t, 23 * 60 + 30);
  for (; n.has(r) && r < 1439; ) r += 15;
  return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function pp(e, t, n) {
  if (e <= n.heat_min) return "var(--hl-off-fill)";
  const r = Math.min(1, Math.max(0, (e - t.lo) / Math.max(1, t.hi - t.lo)));
  return `hsl(${Math.round(42 - 34 * r)} ${Math.round(88 + 4 * r)}% ${Math.round(64 - 14 * r)}%)`;
}
function hp({
  slot: e,
  dayName: t,
  isWater: n,
  limits: r,
  canDelete: l,
  onChange: o,
  onDelete: i,
  onClose: u
}) {
  C.useEffect(() => {
    const h = (g) => g.key === "Escape" && u();
    return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
  }, [u]);
  const a = n ? e.setpoint < r.water_on : e.setpoint <= r.heat_min, c = (h) => Math.min(r.heat_max, Math.max(5, Math.round(h * 2) / 2)), v = a ? 20 : e.setpoint;
  return /* @__PURE__ */ s.jsx("div", { className: "sheet-backdrop", onClick: u, children: /* @__PURE__ */ s.jsxs("div", { className: "sheet heat", role: "dialog", "aria-modal": "true", "aria-label": `Edit ${t} at ${e.time}`, onClick: (h) => h.stopPropagation(), children: [
    /* @__PURE__ */ s.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ s.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ s.jsx("h2", { children: e.time }),
      /* @__PURE__ */ s.jsx("span", { className: "muted", children: t })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ s.jsx("span", { className: "sheet-label", children: "Starts at" }),
      /* @__PURE__ */ s.jsx("input", { className: "sheet-time", type: "time", value: e.time, onChange: (h) => h.target.value && o({ ...e, time: h.target.value }) })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ s.jsx("span", { className: "sheet-label", children: n ? "Hot water" : "Heating" }),
      /* @__PURE__ */ s.jsxs("div", { className: "sheet-lengths", children: [
        /* @__PURE__ */ s.jsx("button", { className: a ? "" : "on", onClick: () => o({ ...e, setpoint: n ? r.water_on : v }), children: n ? "On" : "Heat to" }),
        /* @__PURE__ */ s.jsx("button", { className: a ? "on" : "", onClick: () => o({ ...e, setpoint: n ? r.water_off : r.heat_min }), children: "Off" })
      ] })
    ] }),
    !n && !a && /* @__PURE__ */ s.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ s.jsx("span", { className: "sheet-label", children: "Temperature" }),
      /* @__PURE__ */ s.jsxs("div", { className: "sheet-temp", children: [
        /* @__PURE__ */ s.jsx("button", { className: "round sheet-step", onClick: () => o({ ...e, setpoint: c(e.setpoint - 0.5) }), "aria-label": "Lower", children: /* @__PURE__ */ s.jsx(P, { name: "minus" }) }),
        /* @__PURE__ */ s.jsxs("span", { className: "sheet-temp-value", children: [
          e.setpoint.toFixed(1),
          "°"
        ] }),
        /* @__PURE__ */ s.jsx("button", { className: "round sheet-step", onClick: () => o({ ...e, setpoint: c(e.setpoint + 0.5) }), "aria-label": "Raise", children: /* @__PURE__ */ s.jsx(P, { name: "plus" }) })
      ] })
    ] }),
    !n && a && /* @__PURE__ */ s.jsx("p", { className: "muted small sheet-note", children: "Off means the thermostat only keeps the house above its frost protection temperature." }),
    /* @__PURE__ */ s.jsx("button", { className: "sheet-go", onClick: u, children: "Done" }),
    l && /* @__PURE__ */ s.jsxs("button", { className: "ghost sheet-cancel danger-text", onClick: i, children: [
      /* @__PURE__ */ s.jsx(P, { name: "delete-outline" }),
      " Remove this time"
    ] })
  ] }) });
}
const oa = [
  { id: 1, label: "D", name: "Day" },
  { id: 7, label: "W", name: "Week" },
  { id: 30, label: "M", name: "Month" }
], mp = 5 * 6e4, Wr = (e) => {
  const t = Math.round(e);
  return t < 60 ? `${t}m` : t % 60 ? `${Math.floor(t / 60)}h ${t % 60}m` : `${t / 60}h`;
}, ei = (e, t) => new Date(e * 1e3).toLocaleDateString([], t), gp = (e) => new Date(e * 1e3).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
function vp(e, t, n) {
  if (n === 1) return ei(e, { weekday: "short", day: "numeric", month: "short" });
  const r = t - 86400, l = new Date(e * 1e3), o = new Date(r * 1e3), i = (u) => u.toLocaleDateString([], { month: "short" });
  return l.getMonth() === o.getMonth() ? `${l.getDate()}–${o.getDate()} ${i(o)}` : `${l.getDate()} ${i(l)} – ${o.getDate()} ${i(o)}`;
}
const ia = (e) => e.filter((t) => t != null);
function xp(e) {
  if (e.period === 1) {
    const t = [];
    for (let n = 0; n < e.series.length; n += 4) {
      const r = e.series.slice(n, n + 4).filter((i) => i.heating != null);
      if (!r.length) continue;
      const l = ia(r.map((i) => i.current)), o = ia(e.series.slice(n, n + 4).map((i) => i.outdoor));
      t.push({
        key: e.series[n].t,
        label: [gp(e.series[n].t), ""],
        minutes: r.reduce((i, u) => i + (u.heating ?? 0) * 15, 0),
        avg: l.length ? l.reduce((i, u) => i + u, 0) / l.length : null,
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
  var L;
  const [r, l] = C.useState((L = t[0]) == null ? void 0 : L.entry_id), o = t.find((M) => M.entry_id === r) ?? t[0], i = n ?? "heat", [u, a] = C.useState(7), [c, v] = C.useState("time"), [h, g] = C.useState(0), [m, x] = C.useState(null), [y, T] = C.useState(""), [p, d] = C.useState(!0), f = i === "water", w = f ? "time" : c, N = C.useCallback(() => {
    o && e().callWS({ type: "hive_local/stats", entry_id: o.entry_id, channel: i, days: u, offset: h }).then((M) => {
      x(M), T("");
    }).catch((M) => T(Me(M))).finally(() => d(!1));
  }, [e, o, i, u, h]);
  if (C.useEffect(() => {
    if (d(!0), N(), h) return;
    const M = setInterval(N, mp);
    return () => clearInterval(M);
  }, [N, h]), !o) return null;
  const _ = m && m.period === u && m.offset === h ? m : null, b = _ ? xp(_) : [], k = u === 1 ? "hour" : "day", R = !f && !!(_ != null && _.outdoor);
  return /* @__PURE__ */ s.jsxs("div", { className: "history", children: [
    !n && /* @__PURE__ */ s.jsx("h2", { className: "history-title", children: "Heating history" }),
    !n && t.length > 1 && /* @__PURE__ */ s.jsx("div", { className: "history-tabs", role: "tablist", children: t.map((M) => /* @__PURE__ */ s.jsx("button", { role: "tab", "aria-selected": M.entry_id === o.entry_id, className: M.entry_id === o.entry_id ? "on" : "", onClick: () => {
      l(M.entry_id), g(0);
    }, children: M.name }, M.entry_id)) }),
    /* @__PURE__ */ s.jsxs("div", { className: "history-controls", children: [
      /* @__PURE__ */ s.jsx("div", { className: "history-toggle", role: "radiogroup", "aria-label": "Period", children: oa.map((M) => /* @__PURE__ */ s.jsx("button", { role: "radio", "aria-checked": M.id === u, "aria-label": M.name, title: M.name, className: M.id === u ? "on" : "", onClick: () => {
        a(M.id), g(0);
      }, children: M.label }, M.id)) }),
      !f && /* @__PURE__ */ s.jsxs("div", { className: "history-toggle", role: "radiogroup", "aria-label": "Show", children: [
        /* @__PURE__ */ s.jsx("button", { role: "radio", "aria-checked": c === "time", title: "Time on", "aria-label": "Time on", className: `wide ${c === "time" ? "on" : ""}`, onClick: () => v("time"), children: /* @__PURE__ */ s.jsx(P, { name: "clock-outline" }) }),
        /* @__PURE__ */ s.jsx("button", { role: "radio", "aria-checked": c === "temp", title: "Temperature", "aria-label": "Temperature", className: `wide ${c === "temp" ? "on" : ""}`, onClick: () => v("temp"), children: /* @__PURE__ */ s.jsx(P, { name: "thermometer" }) })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "history-date", children: [
      /* @__PURE__ */ s.jsx("button", { className: "round ghost", onClick: () => g(h + 1), "aria-label": "Earlier", children: /* @__PURE__ */ s.jsx(P, { name: "chevron-left" }) }),
      /* @__PURE__ */ s.jsxs("span", { className: "history-range", children: [
        /* @__PURE__ */ s.jsx(P, { name: "calendar-blank-outline" }),
        " ",
        _ ? vp(_.start, _.period_end, u) : "…"
      ] }),
      /* @__PURE__ */ s.jsx("button", { className: "round ghost", onClick: () => g(Math.max(0, h - 1)), disabled: h === 0, "aria-label": "Later", children: /* @__PURE__ */ s.jsx(P, { name: "chevron-right" }) })
    ] }),
    y && /* @__PURE__ */ s.jsx("div", { className: "status error", children: y }),
    p && !_ && /* @__PURE__ */ s.jsx("p", { className: "muted history-empty", children: "Loading…" }),
    _ && !_.has_data && /* @__PURE__ */ s.jsxs("p", { className: "muted history-empty", children: [
      "No history for this ",
      oa.find((M) => M.id === u).name.toLowerCase(),
      ". Home Assistant keeps 10 days unless",
      " ",
      /* @__PURE__ */ s.jsx("code", { children: "purge_keep_days" }),
      " is raised."
    ] }),
    (_ == null ? void 0 : _.has_data) && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx(wp, { data: _, metric: w, water: f, units: k, rows: b }),
      /* @__PURE__ */ s.jsxs("div", { className: "history-rows", children: [
        b.length > 0 && !f && /* @__PURE__ */ s.jsxs("div", { className: `history-key muted small ${R ? "with-outdoor" : ""}`, children: [
          R && /* @__PURE__ */ s.jsxs("span", { title: "Outside temperature", children: [
            /* @__PURE__ */ s.jsx(P, { name: "weather-partly-cloudy" }),
            " Outside"
          ] }),
          /* @__PURE__ */ s.jsxs("span", { title: "Lowest and highest room temperature", children: [
            /* @__PURE__ */ s.jsx(P, { name: "thermometer" }),
            " Low · high"
          ] })
        ] }),
        b.map((M) => /* @__PURE__ */ s.jsx(Sp, { row: M, metric: w, water: f, outdoor: R, scale: yp(b, w, u) }, M.key))
      ] }),
      !f && _.outdoor_entity == null && /* @__PURE__ */ s.jsx("p", { className: "history-hint muted small", children: "To see the temperature outside here, pick a weather entity or outdoor sensor in Hive Local's settings (Settings › Devices & services › Hive Local › Configure)." })
    ] })
  ] });
}
function yp(e, t, n) {
  if (t === "time") return { lo: 0, hi: Math.max(60, ...e.map((i) => i.minutes ?? 0)) };
  const r = e.map((i) => i.avg).filter((i) => i != null), l = r.length ? Math.floor(Math.min(...r)) - 2 : 10, o = r.length ? Math.ceil(Math.max(...r)) : 25;
  return { lo: l, hi: Math.max(o, l + 4) };
}
function wp({ data: e, metric: t, water: n, units: r, rows: l }) {
  const o = Math.max(1, l.filter((x) => x.minutes != null).length), i = e.previous, u = !!(i != null && i.has_data) && i.known_minutes >= 0.5 * e.known_minutes, a = u ? e.heating_minutes - i.heating_minutes : 0, c = e.temperature, [v, h, g, m] = t === "time" ? [n ? "Hot water on" : "Boiler on", Wr(e.heating_minutes), `Average per ${r}`, Wr(e.heating_minutes / o)] : ["Average", c.avg != null ? `${c.avg.toFixed(1)}°` : "–", "Lowest – highest", c.min != null && c.max != null ? `${c.min.toFixed(1)}–${c.max.toFixed(1)}°` : "–"];
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsxs("div", { className: "history-summary", children: [
      /* @__PURE__ */ s.jsxs("div", { children: [
        /* @__PURE__ */ s.jsx("span", { className: "muted", children: v }),
        /* @__PURE__ */ s.jsx("b", { children: h })
      ] }),
      /* @__PURE__ */ s.jsx("i", {}),
      /* @__PURE__ */ s.jsxs("div", { children: [
        /* @__PURE__ */ s.jsx("span", { className: "muted", children: g }),
        /* @__PURE__ */ s.jsx("b", { children: m })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("p", { className: "history-note muted small", children: [
      t === "time" && u && (Math.abs(a) < 1 ? "Same as the period before · " : `${Wr(Math.abs(a))} ${a > 0 ? "more" : "less"} than the period before · `),
      "Fired up ",
      e.cycles,
      " time",
      e.cycles === 1 ? "" : "s",
      e.boosts ? ` · ${e.boosts} boost${e.boosts === 1 ? "" : "s"}` : "",
      t === "temp" && e.target_avg != null ? ` · average target ${e.target_avg.toFixed(1)}°` : "",
      !n && kp(e)
    ] })
  ] });
}
function kp(e) {
  var o, i;
  const t = (o = e.outdoor) == null ? void 0 : o.avg;
  if (t == null) return "";
  const n = (i = e.previous) == null ? void 0 : i.outdoor_avg, r = n != null ? t - n : null, l = r == null ? "" : Math.abs(r) < 0.5 ? ", about the same as the period before" : `, ${Math.abs(r).toFixed(0)}° ${r < 0 ? "colder" : "milder"} than the period before`;
  return ` · ${t.toFixed(0)}° outside${l}`;
}
function jp(e, t) {
  if (e == null || t == null) return "–";
  const [n, r] = [e.toFixed(0), t.toFixed(0)];
  return n === r ? `${n}°` : `${n}–${r}°`;
}
function Sp({ row: e, metric: t, water: n, outdoor: r, scale: l }) {
  const o = t === "time" ? e.minutes : e.avg, i = o == null ? 0 : Math.max(0.02, Math.min(1, (o - l.lo) / (l.hi - l.lo || 1)));
  return /* @__PURE__ */ s.jsxs("div", { className: `history-row ${r ? "with-outdoor" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("span", { className: "history-day", children: [
      e.label[0],
      " ",
      /* @__PURE__ */ s.jsx("span", { children: e.label[1] })
    ] }),
    /* @__PURE__ */ s.jsxs("span", { className: "history-bar", children: [
      o != null && o > 0 && /* @__PURE__ */ s.jsx("i", { style: { width: `${i * 100}%` } }),
      /* @__PURE__ */ s.jsx("span", { className: "history-value", children: o == null ? "–" : t === "time" ? Wr(o) : `${o.toFixed(1)}°` })
    ] }),
    r && /* @__PURE__ */ s.jsx("span", { className: "history-outdoor", title: "Lowest and highest outside temperature", children: jp(e.outMin, e.outMax) }),
    !n && /* @__PURE__ */ s.jsxs("span", { className: "history-temps", title: "Lowest and highest room temperature", children: [
      e.min != null ? `${e.min.toFixed(0)}°` : "–",
      /* @__PURE__ */ s.jsx("span", { children: e.max != null ? `${e.max.toFixed(0)}°` : "–" })
    ] })
  ] });
}
const Np = [
  { id: "control", label: "Control" },
  { id: "schedule", label: "Schedule" },
  { id: "history", label: "History" }
];
function _p({
  getHass: e,
  device: t,
  channel: n,
  info: r,
  limits: l,
  showDevice: o,
  tab: i,
  onTab: u,
  onBack: a
}) {
  var m, x;
  const [c, v] = C.useState(i === "schedule");
  C.useEffect(() => {
    i === "schedule" && v(!0);
  }, [i]);
  const h = r == null ? void 0 : r.status, g = [
    o ? t.name : null,
    h ? h.mode === "schedule" ? "On schedule" : h.mode === "boost" ? (m = r == null ? void 0 : r.preheat) != null && m.active_for ? `Pre-heating for ${r.preheat.active_for}` : "Boosting" : h.mode === "off" ? "Off" : n === "water" ? "Always on" : "Manual" : "Waiting for the receiver"
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ s.jsxs("div", { className: "device-page", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "page-head", children: [
      /* @__PURE__ */ s.jsx("button", { className: "round ghost", onClick: a, "aria-label": "Back to the overview", children: /* @__PURE__ */ s.jsx(P, { name: "chevron-left" }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "page-title", children: [
        /* @__PURE__ */ s.jsx("h2", { children: Hn[n] }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: g })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "page-tabs", role: "tablist", children: Np.map((y) => /* @__PURE__ */ s.jsx("button", { role: "tab", "aria-selected": y.id === i, className: y.id === i ? "on" : "", onClick: () => u(y.id), children: y.label }, y.id)) }),
    i === "control" && /* @__PURE__ */ s.jsx(kc, { getHass: e, device: t, channel: n, info: r, showDevice: !1, limits: l, page: !0 }),
    i === "control" && n === "heat" && (r == null ? void 0 : r.preheat) && /* @__PURE__ */ s.jsx(ap, { getHass: e, device: t, info: r.preheat }),
    c && /* @__PURE__ */ s.jsx("div", { hidden: i !== "schedule", children: /* @__PURE__ */ s.jsx(dp, { getHass: e, device: t, channel: n, limits: l, mode: (h == null ? void 0 : h.mode) ?? null, preheatFor: (h == null ? void 0 : h.mode) === "boost" ? ((x = r == null ? void 0 : r.preheat) == null ? void 0 : x.active_for) ?? null : null }) }),
    i === "history" && /* @__PURE__ */ s.jsx(jc, { getHass: e, devices: [t], channel: n })
  ] });
}
const Cp = 20, Ep = 6e4;
function bp({
  getHass: e,
  devices: t,
  status: n,
  limits: r,
  onOpenDevice: l
}) {
  const [o, i] = C.useState(null), [u, a] = C.useState(""), [c, v] = C.useState(!1), h = C.useCallback(() => {
    e().callWS({ type: "hive_local/rooms/valves" }).then((m) => i(m.valves)).catch((m) => a(Me(m)));
  }, [e]);
  C.useEffect(() => {
    h();
    const m = setInterval(h, Ep);
    return () => clearInterval(m);
  }, [h]);
  const g = t.length > 1;
  return /* @__PURE__ */ s.jsxs("div", { className: "stack devices-page", children: [
    /* @__PURE__ */ s.jsx("h2", { className: "history-title", children: "Devices" }),
    u && /* @__PURE__ */ s.jsx("div", { className: "status error", children: u }),
    /* @__PURE__ */ s.jsxs("div", { className: "device-grid", children: [
      t.map((m) => /* @__PURE__ */ s.jsx(Pp, { device: m, status: n, onOpen: (x) => l(m.entry_id, x) }, m.entry_id)),
      o == null ? void 0 : o.map((m) => /* @__PURE__ */ s.jsx(Tp, { valve: m }, m.entity_id))
    ] }),
    o && !o.length && /* @__PURE__ */ s.jsx("p", { className: "muted", children: "No Hive radiator valves yet. Pair them with ZHA or Zigbee2MQTT and they'll show up here." }),
    g && /* @__PURE__ */ s.jsx("p", { className: "muted small", children: "Each receiver is a heating zone." }),
    /* @__PURE__ */ s.jsx("div", { className: "fab-wrap", children: /* @__PURE__ */ s.jsx("button", { className: "fab", "aria-label": "Add a device", onClick: () => v(!0), children: /* @__PURE__ */ s.jsx(P, { name: "plus" }) }) }),
    c && /* @__PURE__ */ s.jsx($p, { onClose: () => v(!1) })
  ] });
}
const zp = { z2m: "Zigbee2MQTT", zha: "ZHA" };
function Sc({ items: e }) {
  return /* @__PURE__ */ s.jsx("div", { className: "facts", children: e.map((t) => /* @__PURE__ */ s.jsxs("span", { className: `fact ${t.warn ? "warn" : ""}`, children: [
    /* @__PURE__ */ s.jsx(P, { name: t.icon }),
    " ",
    t.text
  ] }, t.text)) });
}
function Nc({ online: e, text: t }) {
  return /* @__PURE__ */ s.jsxs("span", { className: `online ${e ? "" : "no"}`, children: [
    /* @__PURE__ */ s.jsx("i", {}),
    t ?? (e ? "Online" : "Not responding")
  ] });
}
function Pp({ device: e, status: t, onOpen: n }) {
  const r = e.channels.some((l) => {
    var o, i;
    return (i = (o = t[e.entry_id]) == null ? void 0 : o[l]) == null ? void 0 : i.status;
  });
  return /* @__PURE__ */ s.jsxs("section", { className: "card hw", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "hw-head", children: [
      /* @__PURE__ */ s.jsx("span", { className: "device-icon", children: /* @__PURE__ */ s.jsx(P, { name: "radiator" }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "device-name", children: [
        /* @__PURE__ */ s.jsx("span", { children: e.name }),
        /* @__PURE__ */ s.jsxs("span", { className: "muted small", children: [
          "Hive receiver",
          e.model ? ` · ${e.model}` : ""
        ] })
      ] }),
      /* @__PURE__ */ s.jsx(Nc, { online: r, text: r ? "Online" : "Waiting" })
    ] }),
    /* @__PURE__ */ s.jsx(
      Sc,
      {
        items: [
          { icon: "zigbee", text: zp[e.transport ?? "z2m"] },
          { icon: "fire", text: e.channels.includes("water") ? "Heating and hot water" : "Heating only" }
        ]
      }
    ),
    /* @__PURE__ */ s.jsx("div", { className: "hw-links", children: e.channels.map((l) => /* @__PURE__ */ s.jsxs("button", { className: "hw-link", onClick: () => n(l), children: [
      Hn[l],
      " ",
      /* @__PURE__ */ s.jsx(P, { name: "chevron-right" })
    ] }, l)) })
  ] });
}
function Tp({ valve: e }) {
  const t = e.battery != null && !Number.isNaN(Number(e.battery)) ? Number(e.battery) : null, n = t != null && t < Cp;
  return /* @__PURE__ */ s.jsxs("section", { className: `card hw ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "hw-head", children: [
      /* @__PURE__ */ s.jsx("span", { className: "device-icon", children: /* @__PURE__ */ s.jsx(P, { name: "thermostat" }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "device-name", children: [
        /* @__PURE__ */ s.jsx("span", { children: e.name }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Hive radiator valve" })
      ] }),
      /* @__PURE__ */ s.jsx(Nc, { online: e.available })
    ] }),
    /* @__PURE__ */ s.jsx(
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
function $p({ onClose: e }) {
  const [t, n] = C.useState(!1);
  C.useEffect(() => {
    const l = (o) => o.key === "Escape" && e();
    return window.addEventListener("keydown", l), () => window.removeEventListener("keydown", l);
  }, [e]);
  const r = () => {
    history.pushState(null, "", "/config/integrations/dashboard/add?domain=hive_local"), window.dispatchEvent(new CustomEvent("location-changed")), e();
  };
  return /* @__PURE__ */ s.jsx("div", { className: "sheet-backdrop", onClick: e, children: /* @__PURE__ */ s.jsxs("div", { className: "sheet heat", role: "dialog", "aria-modal": "true", "aria-label": "Add a device", onClick: (l) => l.stopPropagation(), children: [
    /* @__PURE__ */ s.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ s.jsx("div", { className: "sheet-title", children: /* @__PURE__ */ s.jsx("h2", { children: "Add a device" }) }),
    /* @__PURE__ */ s.jsxs("div", { className: "add-options", children: [
      /* @__PURE__ */ s.jsxs("button", { className: "add-option", onClick: r, children: [
        /* @__PURE__ */ s.jsx("span", { className: "device-icon", children: /* @__PURE__ */ s.jsx(P, { name: "radiator" }) }),
        /* @__PURE__ */ s.jsxs("span", { className: "add-text", children: [
          /* @__PURE__ */ s.jsx("b", { children: "Hive receiver" }),
          /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "A boiler receiver (another heating zone). Opens Home Assistant's setup for Hive Local." })
        ] }),
        /* @__PURE__ */ s.jsx(P, { name: "chevron-right" })
      ] }),
      /* @__PURE__ */ s.jsxs("button", { className: "add-option", onClick: () => n(!t), children: [
        /* @__PURE__ */ s.jsx("span", { className: "device-icon", children: /* @__PURE__ */ s.jsx(P, { name: "thermostat" }) }),
        /* @__PURE__ */ s.jsxs("span", { className: "add-text", children: [
          /* @__PURE__ */ s.jsx("b", { children: "Radiator valve" }),
          /* @__PURE__ */ s.jsx("span", { className: "muted small", children: t ? "Pair it with ZHA or Zigbee2MQTT first (Settings → Devices & services). It then appears here, and you can put it in a room on the Rooms tab." : "A Hive radiator valve (UK7004240)." })
        ] }),
        /* @__PURE__ */ s.jsx(P, { name: t ? "chevron-up" : "chevron-down" })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("button", { className: "ghost sheet-cancel", onClick: e, children: "Close" })
  ] }) });
}
const Lp = 20, gl = (e) => e == null ? "–" : `${e.toFixed(1)}°`;
function Mp({ valve: e, heating: t }) {
  const n = e.battery == null ? null : Number(e.battery), r = n != null && !Number.isNaN(n) && n <= Lp;
  return /* @__PURE__ */ s.jsxs("li", { className: `valve ${e.available ? "" : "off"}`, children: [
    /* @__PURE__ */ s.jsx(P, { name: t ? "fire" : "radiator", className: t ? "valve-icon heating" : "valve-icon" }),
    /* @__PURE__ */ s.jsx("span", { className: "valve-name", children: e.name }),
    e.available ? /* @__PURE__ */ s.jsxs("span", { className: "valve-temps", children: [
      gl(e.current_temperature),
      " ",
      /* @__PURE__ */ s.jsxs("span", { className: "muted", children: [
        "→ ",
        gl(e.target)
      ] })
    ] }) : /* @__PURE__ */ s.jsx("span", { className: "chip", children: "Unavailable" }),
    n != null && !Number.isNaN(n) && /* @__PURE__ */ s.jsxs("span", { className: `battery ${r ? "low" : ""}`, title: r ? "Battery low" : "Battery", children: [
      /* @__PURE__ */ s.jsx(P, { name: r ? "battery-alert-variant-outline" : "battery-outline" }),
      " ",
      Math.round(n),
      "%"
    ] })
  ] });
}
function Rp({ dialog: e, label: t, onClose: n, children: r }) {
  return e ? /* @__PURE__ */ s.jsx("div", { className: "sheet-backdrop", onClick: (l) => {
    l.stopPropagation(), n();
  }, children: /* @__PURE__ */ s.jsxs("div", { className: "sheet room-sheet room-editor", role: "dialog", "aria-modal": "true", "aria-label": t, onClick: (l) => l.stopPropagation(), children: [
    /* @__PURE__ */ s.jsx("span", { className: "sheet-handle" }),
    r
  ] }) }) : /* @__PURE__ */ s.jsx("section", { className: "card room-editor", children: r });
}
function Op(e) {
  return /* @__PURE__ */ s.jsx(_c, { ...e, dialog: !0 });
}
function _c({ getHass: e, room: t, onDone: n, dialog: r }) {
  C.useEffect(() => {
    if (!r) return;
    const k = (R) => R.key === "Escape" && n();
    return window.addEventListener("keydown", k), () => window.removeEventListener("keydown", k);
  }, [r, n]);
  const [l, o] = C.useState(null), [i, u] = C.useState((t == null ? void 0 : t.receiver) ?? ""), [a, c] = C.useState((t == null ? void 0 : t.name) ?? ""), [v, h] = C.useState(new Set((t == null ? void 0 : t.valves) ?? [])), [g, m] = C.useState((t == null ? void 0 : t.sensor) ?? ""), [x, y] = C.useState(!1), [T, p] = C.useState(!1), [d, f] = C.useState("");
  C.useEffect(() => {
    e().callWS({ type: "hive_local/rooms/candidates" }).then(o).catch((k) => f(Me(k)));
  }, [e]);
  const w = ((l == null ? void 0 : l.receivers.length) ?? 0) > 1, N = async (k) => {
    y(!0), f("");
    try {
      await e().callWS(k), n();
    } catch (R) {
      f(Me(R)), y(!1);
    }
  }, _ = (k) => h((R) => {
    const L = new Set(R);
    return L.has(k) ? L.delete(k) : L.add(k), L;
  }), b = /* @__PURE__ */ new Map();
  for (const k of (l == null ? void 0 : l.valves) ?? []) b.set(k.area ?? "No area", [...b.get(k.area ?? "No area") ?? [], k]);
  return /* @__PURE__ */ s.jsxs(Rp, { dialog: !!r, label: t ? `Edit ${t.name}` : "New room", onClose: n, children: [
    /* @__PURE__ */ s.jsx("h2", { children: t ? `Edit ${t.name}` : "New room" }),
    /* @__PURE__ */ s.jsxs(
      "form",
      {
        className: "stack",
        onSubmit: (k) => {
          k.preventDefault(), N({
            type: "hive_local/rooms/save",
            ...t ? { room_id: t.id } : {},
            name: a,
            valves: [...v],
            sensor: g || null,
            receiver: i || null
          });
        },
        children: [
          /* @__PURE__ */ s.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ s.jsx("span", { children: "Name" }),
            /* @__PURE__ */ s.jsx("input", { id: `room-name-${(t == null ? void 0 : t.id) ?? "new"}`, type: "text", value: a, maxLength: 40, placeholder: "Lounge", onChange: (k) => c(k.target.value) })
          ] }),
          /* @__PURE__ */ s.jsxs("fieldset", { className: "field", children: [
            /* @__PURE__ */ s.jsx("legend", { children: "Hive radiator valves" }),
            !l && !d && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Loading…" }),
            l && !l.valves.length && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "No Hive radiator valves found. Pair them with ZHA or Zigbee2MQTT first." }),
            [...b].map(([k, R]) => /* @__PURE__ */ s.jsxs("div", { className: "checklist", children: [
              /* @__PURE__ */ s.jsx("span", { className: "muted small", children: k }),
              R.map((L) => /* @__PURE__ */ s.jsxs("label", { className: "pick", children: [
                /* @__PURE__ */ s.jsx("input", { type: "checkbox", checked: v.has(L.entity_id), onChange: () => _(L.entity_id) }),
                " ",
                L.name
              ] }, L.entity_id))
            ] }, k))
          ] }),
          /* @__PURE__ */ s.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ s.jsx("span", { children: "Room temperature from" }),
            /* @__PURE__ */ s.jsxs("select", { id: `room-sensor-${(t == null ? void 0 : t.id) ?? "new"}`, value: g, onChange: (k) => m(k.target.value), children: [
              /* @__PURE__ */ s.jsx("option", { value: "", children: "The valves (their average)" }),
              ((l == null ? void 0 : l.sensors) ?? []).map((k) => /* @__PURE__ */ s.jsxs("option", { value: k.entity_id, children: [
                k.name,
                k.area ? ` · ${k.area}` : ""
              ] }, k.entity_id))
            ] })
          ] }),
          w && /* @__PURE__ */ s.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ s.jsx("span", { children: "Heated by" }),
            /* @__PURE__ */ s.jsxs("select", { id: `room-receiver-${(t == null ? void 0 : t.id) ?? "new"}`, value: i, onChange: (k) => u(k.target.value), children: [
              /* @__PURE__ */ s.jsx("option", { value: "", disabled: !0, children: "Choose the receiver for this room's radiators" }),
              l.receivers.map((k) => /* @__PURE__ */ s.jsx("option", { value: k.entry_id, children: k.name }, k.entry_id))
            ] })
          ] }),
          d && /* @__PURE__ */ s.jsx("div", { className: "status error", children: d }),
          /* @__PURE__ */ s.jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ s.jsx("button", { className: "primary", type: "submit", disabled: x || !a.trim() || !v.size || w && !i, children: t ? "Save" : "Add room" }),
            /* @__PURE__ */ s.jsx("button", { type: "button", className: "ghost", onClick: n, disabled: x, children: "Cancel" }),
            /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
            t && (T ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsxs("span", { className: "muted small", children: [
                "Delete ",
                t.name,
                "? The valves aren't changed."
              ] }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "danger", disabled: x, onClick: () => N({ type: "hive_local/rooms/delete", room_id: t.id }), children: "Delete" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", className: "ghost", onClick: () => p(!1), children: "Keep" })
            ] }) : /* @__PURE__ */ s.jsxs("button", { type: "button", className: "danger", onClick: () => p(!0), disabled: x, children: [
              /* @__PURE__ */ s.jsx(P, { name: "delete-outline" }),
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
  const [l, o] = C.useState(null), [i, u] = C.useState(!1), [a, c] = C.useState(null), [v, h] = C.useState(""), g = C.useRef();
  if (C.useEffect(() => {
    const d = e().connection.subscribeMessage(
      (f) => o(f.rooms.find((w) => w.id === t) ?? null),
      { type: "hive_local/rooms/subscribe" }
    );
    return () => {
      d.then((f) => f()).catch(() => {
      });
    };
  }, [e, t]), C.useEffect(() => {
    if (i) return;
    const d = (f) => f.key === "Escape" && r();
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, [r, i]), !l) return null;
  if (i) return /* @__PURE__ */ s.jsx(_c, { getHass: e, room: l, onDone: () => u(!1), dialog: !0 });
  const m = a ?? l.target ?? ((p = l.target_range) == null ? void 0 : p[1]) ?? 20, x = (d) => {
    const f = Math.min(35, Math.max(5, d));
    c(f), h(""), window.clearTimeout(g.current), g.current = window.setTimeout(async () => {
      try {
        const w = await e().callWS({ type: "hive_local/rooms/set_target", room_id: l.id, temperature: f });
        if (w.failed.length) {
          const N = l.valve_states.filter((_) => w.failed.includes(_.entity_id)).map((_) => _.name);
          h(`Didn't take on ${N.join(", ")}. It may be asleep; try again shortly.`);
        }
      } catch (w) {
        h(Me(w));
      } finally {
        c(null);
      }
    }, 700);
  }, y = `${l.valves.length} valve${l.valves.length === 1 ? "" : "s"}`, T = l.temperature_source === "sensor" ? l.sensor_name : l.temperature_source === "valves" ? "Average of the valves" : "No reading";
  return /* @__PURE__ */ s.jsx("div", { className: "sheet-backdrop", onClick: (d) => {
    d.stopPropagation(), r();
  }, children: /* @__PURE__ */ s.jsxs("div", { className: "sheet heat room-sheet", role: "dialog", "aria-modal": "true", "aria-label": l.name, onClick: (d) => d.stopPropagation(), children: [
    /* @__PURE__ */ s.jsx("span", { className: "sheet-handle" }),
    /* @__PURE__ */ s.jsxs("div", { className: "sheet-title", children: [
      /* @__PURE__ */ s.jsx("h2", { children: l.name }),
      /* @__PURE__ */ s.jsx("span", { className: "muted", children: [l.heating ? "Heating" : "Idle", n ? l.receiver_name : null, y].filter(Boolean).join(" · ") })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "sheet-live", children: [
      /* @__PURE__ */ s.jsx(P, { name: l.heating ? "fire" : "thermometer", className: l.heating ? "heating" : "" }),
      /* @__PURE__ */ s.jsxs("span", { children: [
        /* @__PURE__ */ s.jsx("b", { children: l.current_temperature == null ? "–" : `${l.current_temperature.toFixed(1)}°` }),
        " ",
        /* @__PURE__ */ s.jsx("span", { className: "muted", children: T })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ s.jsx("span", { className: "sheet-label", children: l.target_range && a == null ? `Target (valves set to ${gl(l.target_range[0])}–${gl(l.target_range[1])})` : "Target" }),
      /* @__PURE__ */ s.jsxs("div", { className: "sheet-temp", children: [
        /* @__PURE__ */ s.jsx("button", { className: "round sheet-step", onClick: () => x(m - 0.5), "aria-label": "Lower", children: /* @__PURE__ */ s.jsx(P, { name: "minus" }) }),
        /* @__PURE__ */ s.jsxs("span", { className: "sheet-temp-value", children: [
          m.toFixed(1),
          "°"
        ] }),
        /* @__PURE__ */ s.jsx("button", { className: "round sheet-step", onClick: () => x(m + 0.5), "aria-label": "Raise", children: /* @__PURE__ */ s.jsx(P, { name: "plus" }) })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "sheet-field", children: [
      /* @__PURE__ */ s.jsx("span", { className: "sheet-label", children: "Valves" }),
      /* @__PURE__ */ s.jsx("ul", { className: "valves", children: l.valve_states.map((d) => /* @__PURE__ */ s.jsx(Mp, { valve: d, heating: l.heating_valves.includes(d.entity_id) }, d.entity_id)) })
    ] }),
    v && /* @__PURE__ */ s.jsx("div", { className: "status error", children: v }),
    /* @__PURE__ */ s.jsxs("div", { className: "room-sheet-actions", children: [
      /* @__PURE__ */ s.jsxs("button", { className: "ghost", onClick: () => u(!0), children: [
        /* @__PURE__ */ s.jsx(P, { name: "pencil-outline" }),
        " Edit room"
      ] }),
      /* @__PURE__ */ s.jsx("button", { className: "ghost sheet-cancel", onClick: r, children: "Close" })
    ] })
  ] }) });
}
function Fp({ getHass: e, devices: t, status: n }) {
  const [r, l] = C.useState(null), [o, i] = C.useState("");
  C.useEffect(() => {
    e().callWS({ type: "hive_local/settings" }).then(l).catch((a) => i(Me(a)));
  }, [e]);
  const u = (a) => {
    l((c) => c && { ...c, outdoor_entity: a || null }), e().callWS({ type: "hive_local/settings/set", outdoor_entity: a || null }).catch((c) => i(Me(c)));
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "settings", children: [
    /* @__PURE__ */ s.jsx("h2", { className: "history-title", children: "Settings" }),
    o && /* @__PURE__ */ s.jsx("div", { className: "status error", children: o }),
    /* @__PURE__ */ s.jsxs("section", { className: "settings-section", children: [
      /* @__PURE__ */ s.jsx("h3", { children: "Outside temperature" }),
      /* @__PURE__ */ s.jsx("div", { className: "settings-group", children: /* @__PURE__ */ s.jsxs("div", { className: "settings-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "device-icon", children: /* @__PURE__ */ s.jsx(P, { name: "weather-partly-cloudy" }) }),
        /* @__PURE__ */ s.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ s.jsx("span", { children: "Weather or outdoor sensor" }),
          /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Shown in the heating history, next to the boiler's time on." })
        ] }),
        /* @__PURE__ */ s.jsxs("select", { "aria-label": "Outside temperature", value: (r == null ? void 0 : r.outdoor_entity) ?? "", onChange: (a) => u(a.target.value), disabled: !r, children: [
          /* @__PURE__ */ s.jsx("option", { value: "", children: "None" }),
          ((r == null ? void 0 : r.outdoor_candidates) ?? []).map((a) => /* @__PURE__ */ s.jsx("option", { value: a.entity_id, children: a.name }, a.entity_id))
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ s.jsx(Ip, { getHass: e }),
    t.map((a) => /* @__PURE__ */ s.jsxs("section", { className: "settings-section", children: [
      /* @__PURE__ */ s.jsx("h3", { children: t.length > 1 ? a.name : "Receiver" }),
      /* @__PURE__ */ s.jsx("div", { className: "settings-group", children: a.channels.map((c) => {
        var v;
        return /* @__PURE__ */ s.jsx(Up, { getHass: e, device: a, channel: c, info: (v = n[a.entry_id]) == null ? void 0 : v[c] }, c);
      }) })
    ] }, a.entry_id))
  ] });
}
function Ip({ getHass: e }) {
  const [t, n] = C.useState(null), [r, l] = C.useState([]), [o, i] = C.useState(null);
  C.useEffect(() => {
    const a = e().connection.subscribeMessage(
      (c) => {
        n(c.rooms), l(c.receivers);
      },
      { type: "hive_local/rooms/subscribe" }
    );
    return () => {
      a.then((c) => c()).catch(() => {
      });
    };
  }, [e]);
  const u = r.length > 1;
  return /* @__PURE__ */ s.jsxs("section", { className: "settings-section", children: [
    /* @__PURE__ */ s.jsx("h3", { children: "Rooms" }),
    /* @__PURE__ */ s.jsx("p", { className: "muted small settings-help", children: "Group your Hive radiator valves into rooms. Each room then has a card on the Overview." }),
    /* @__PURE__ */ s.jsxs("div", { className: "settings-group", children: [
      (t ?? []).map((a) => /* @__PURE__ */ s.jsxs("button", { className: "settings-row link", onClick: () => i(a.id), children: [
        /* @__PURE__ */ s.jsx("span", { className: "device-icon", children: /* @__PURE__ */ s.jsx(P, { name: "home-thermometer-outline" }) }),
        /* @__PURE__ */ s.jsxs("div", { className: "settings-text", children: [
          /* @__PURE__ */ s.jsx("span", { children: a.name }),
          /* @__PURE__ */ s.jsx("span", { className: "muted small", children: [
            `${a.valves.length} valve${a.valves.length === 1 ? "" : "s"}`,
            a.sensor_name ?? "temperature from the valves",
            u ? `heated by ${a.receiver_name}` : null
          ].filter(Boolean).join(" · ") })
        ] }),
        /* @__PURE__ */ s.jsx(P, { name: "chevron-right", className: "settings-chevron" })
      ] }, a.id)),
      /* @__PURE__ */ s.jsxs("button", { className: "settings-row link add", onClick: () => i("new"), children: [
        /* @__PURE__ */ s.jsx("span", { className: "device-icon", children: /* @__PURE__ */ s.jsx(P, { name: "plus" }) }),
        /* @__PURE__ */ s.jsx("div", { className: "settings-text", children: /* @__PURE__ */ s.jsx("span", { children: "Add a room" }) })
      ] })
    ] }),
    o && /* @__PURE__ */ s.jsx(
      Op,
      {
        getHass: e,
        room: o === "new" || t == null ? void 0 : t.find((a) => a.id === o),
        onDone: () => i(null)
      }
    )
  ] });
}
const Ap = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, Tr = [15, 30, 45, 60, 90, 120, 180, 240, 360];
function Up({ getHass: e, device: t, channel: n, info: r }) {
  const [l, o] = C.useState(null), i = C.useRef(), u = l ?? r;
  if (!u) return null;
  const a = (h, g) => {
    const m = { ...u, [h]: g };
    o(m), window.clearTimeout(i.current), i.current = window.setTimeout(() => {
      e().callWS({ type: "hive_local/defaults", entry_id: t.entry_id, channel: n, [h]: g }).finally(() => o(null));
    }, 800);
  }, c = (h) => {
    const g = Tr.findIndex((x) => x >= u.boost_minutes), m = g < 0 ? Tr.length - 1 : g;
    return Tr[Math.min(Tr.length - 1, Math.max(0, m + h))];
  }, v = n === "water";
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsxs("div", { className: "settings-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "device-icon", children: /* @__PURE__ */ s.jsx(P, { name: v ? "water-boiler" : "radiator" }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "settings-text", children: [
        /* @__PURE__ */ s.jsx("span", { children: v ? "Hot water boost" : "Heating boost" }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "What Boost does unless you choose otherwise." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "settings-controls", children: [
        /* @__PURE__ */ s.jsx(io, { label: "How long", value: Ap(u.boost_minutes), onLower: () => a("boost_minutes", c(-1)), onRaise: () => a("boost_minutes", c(1)) }),
        !v && /* @__PURE__ */ s.jsx(io, { label: "Temperature", value: `${u.boost_temperature.toFixed(1)}°`, onLower: () => a("boost_temperature", Math.max(5, u.boost_temperature - 0.5)), onRaise: () => a("boost_temperature", Math.min(32, u.boost_temperature + 0.5)) })
      ] })
    ] }),
    !v && /* @__PURE__ */ s.jsxs("div", { className: "settings-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "device-icon", children: /* @__PURE__ */ s.jsx(P, { name: "snowflake" }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "settings-text", children: [
        /* @__PURE__ */ s.jsx("span", { children: "Frost protection" }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "The target shown while the schedule has the heating off. Only for display: the receiver isn't changed." })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "settings-controls", children: /* @__PURE__ */ s.jsx(io, { value: `${u.frost_temperature.toFixed(1)}°`, onLower: () => a("frost_temperature", Math.max(5, u.frost_temperature - 0.5)), onRaise: () => a("frost_temperature", Math.min(16, u.frost_temperature + 0.5)) }) })
    ] })
  ] });
}
function io({ label: e, value: t, onLower: n, onRaise: r }) {
  return /* @__PURE__ */ s.jsxs("div", { className: "adjust", children: [
    e && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: e }),
    /* @__PURE__ */ s.jsxs("div", { className: "stepper", children: [
      /* @__PURE__ */ s.jsx("button", { className: "round", onClick: n, "aria-label": `Lower ${e ?? ""}`.trim(), children: /* @__PURE__ */ s.jsx(P, { name: "minus" }) }),
      /* @__PURE__ */ s.jsx("span", { className: "stepper-value", children: t }),
      /* @__PURE__ */ s.jsx("button", { className: "round", onClick: r, "aria-label": `Raise ${e ?? ""}`.trim(), children: /* @__PURE__ */ s.jsx(P, { name: "plus" }) })
    ] })
  ] });
}
const Bp = [
  { id: "overview", label: "Overview", icon: "view-dashboard-outline" },
  { id: "devices", label: "Devices", icon: "devices" },
  { id: "stats", label: "Stats", icon: "chart-box-outline" },
  { id: "settings", label: "Settings", icon: "tune-variant" }
];
function Hp({ getHass: e, narrow: t, onToggleMenu: n }) {
  var b;
  const [r, l] = C.useState([]), [o, i] = C.useState(null), [u, a] = C.useState({}), [c, v] = C.useState("overview"), [h, g] = C.useState(null), [m, x] = C.useState("control"), [y, T] = C.useState(null), [p, d] = C.useState("");
  C.useEffect(() => {
    e().callWS({ type: "hive_local/devices" }).then((R) => {
      l(R.devices), i(R.limits);
    }).catch((R) => d(Me(R)));
    const k = e().connection.subscribeMessage(
      (R) => a(R.status),
      { type: "hive_local/subscribe" }
    );
    return () => {
      k.then((R) => R()).catch(() => {
      });
    };
  }, [e]);
  const f = (k, R) => {
    g({ entry: k, channel: R }), x("control");
  }, w = (k) => {
    v(k), g(null), T(null);
  }, N = h && r.find((k) => k.entry_id === h.entry), _ = Bp;
  return /* @__PURE__ */ s.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ s.jsx("header", { children: /* @__PURE__ */ s.jsxs("div", { className: "toolbar-row", children: [
      t && /* @__PURE__ */ s.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ s.jsx(P, { name: "menu" }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ s.jsx(la, {}),
        /* @__PURE__ */ s.jsx("h1", { children: "Hive Local" })
      ] }),
      /* @__PURE__ */ s.jsx("nav", { className: "tabs", role: "tablist", children: _.map((k) => /* @__PURE__ */ s.jsxs("button", { role: "tab", "aria-selected": k.id === c, className: k.id === c ? "on" : "", onClick: () => w(k.id), children: [
        /* @__PURE__ */ s.jsx(P, { name: k.icon }),
        /* @__PURE__ */ s.jsx("span", { children: k.label })
      ] }, k.id)) })
    ] }) }),
    /* @__PURE__ */ s.jsxs("main", { children: [
      p && /* @__PURE__ */ s.jsx("div", { className: "status error", children: p }),
      !r.length && !p && /* @__PURE__ */ s.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ s.jsx(la, { size: 56 }),
        /* @__PURE__ */ s.jsx("p", { children: "No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local." })
      ] }),
      N && o ? /* @__PURE__ */ s.jsx(
        _p,
        {
          getHass: e,
          device: N,
          channel: h.channel,
          info: (b = u[N.entry_id]) == null ? void 0 : b[h.channel],
          limits: o,
          showDevice: r.length > 1,
          tab: m,
          onTab: x,
          onBack: () => g(null)
        },
        `${h.entry}-${h.channel}`
      ) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        c === "overview" && /* @__PURE__ */ s.jsx(rp, { getHass: e, devices: r, status: u, limits: o, onOpenDevice: f, onOpenRoom: T }),
        c === "devices" && r.length > 0 && /* @__PURE__ */ s.jsx(bp, { getHass: e, devices: r, status: u, limits: o, onOpenDevice: f }),
        c === "stats" && r.length > 0 && /* @__PURE__ */ s.jsx(jc, { getHass: e, devices: r }),
        c === "settings" && r.length > 0 && /* @__PURE__ */ s.jsx(Fp, { getHass: e, devices: r, status: u })
      ] }),
      y && /* @__PURE__ */ s.jsx(
        Dp,
        {
          getHass: e,
          roomId: y,
          several: r.length > 1,
          onClose: () => T(null)
        }
      )
    ] })
  ] });
}
const Vp = (
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
.settings-row.add .settings-text span { color: var(--hl-brand); font-weight: 500; }
.settings-text { flex: 1 1 180px; display: flex; flex-direction: column; gap: 2px; min-width: 0; font-size: 15px; }
.settings-row select { max-width: 220px; }
.settings-chevron { color: var(--secondary-text-color); }
.settings-controls { display: flex; gap: 16px; flex-wrap: wrap; margin-left: auto; }
.adjust { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.adjust .stepper-value { min-width: 72px; text-align: center; }
@media (max-width: 600px) { .settings-controls { width: 100%; justify-content: flex-end; } }
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
class Wp extends HTMLElement {
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
      r.textContent = Vp;
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
customElements.get("hive-local-panel") || customElements.define("hive-local-panel", Wp);
