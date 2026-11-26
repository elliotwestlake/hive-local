// \0rolldown/runtime.js
var e = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), t = /* @__PURE__ */ e(((e) => {
	var t = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.iterator;
	function p(e) {
		return typeof e != "object" || !e ? null : (e = f && e[f] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var m = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, h = Object.assign, g = {};
	function _(e, t, n) {
		this.props = e, this.context = t, this.refs = g, this.updater = n || m;
	}
	_.prototype.isReactComponent = {}, _.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, _.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function v() {}
	v.prototype = _.prototype;
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = g, this.updater = n || m;
	}
	var b = y.prototype = new v();
	b.constructor = y, h(b, _.prototype), b.isPureReactComponent = !0;
	var x = Array.isArray, S = Object.prototype.hasOwnProperty, C = { current: null }, w = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function T(e, n, r) {
		var i, a = {}, o = null, s = null;
		if (n != null) for (i in n.ref !== void 0 && (s = n.ref), n.key !== void 0 && (o = "" + n.key), n) S.call(n, i) && !w.hasOwnProperty(i) && (a[i] = n[i]);
		var c = arguments.length - 2;
		if (c === 1) a.children = r;
		else if (1 < c) {
			for (var l = Array(c), u = 0; u < c; u++) l[u] = arguments[u + 2];
			a.children = l;
		}
		if (e && e.defaultProps) for (i in c = e.defaultProps, c) a[i] === void 0 && (a[i] = c[i]);
		return {
			$$typeof: t,
			type: e,
			key: o,
			ref: s,
			props: a,
			_owner: C.current
		};
	}
	function E(e, n) {
		return {
			$$typeof: t,
			type: e.type,
			key: n,
			ref: e.ref,
			props: e.props,
			_owner: e._owner
		};
	}
	function D(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function O(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var k = /\/+/g;
	function A(e, t) {
		return typeof e == "object" && e && e.key != null ? O("" + e.key) : t.toString(36);
	}
	function ee(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n: c = !0;
			}
		}
		if (c) return c = e, o = o(c), e = a === "" ? "." + A(c, 0) : a, x(o) ? (i = "", e != null && (i = e.replace(k, "$&/") + "/"), ee(o, r, i, "", function(e) {
			return e;
		})) : o != null && (D(o) && (o = E(o, i + (!o.key || c && c.key === o.key ? "" : ("" + o.key).replace(k, "$&/") + "/") + e)), r.push(o)), 1;
		if (c = 0, a = a === "" ? "." : a + ":", x(e)) for (var l = 0; l < e.length; l++) {
			s = e[l];
			var u = a + A(s, l);
			c += ee(s, r, i, u, o);
		}
		else if (u = p(e), typeof u == "function") for (e = u.call(e), l = 0; !(s = e.next()).done;) s = s.value, u = a + A(s, l++), c += ee(s, r, i, u, o);
		else if (s === "object") throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		return c;
	}
	function j(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return ee(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function M(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var N = { current: null }, P = { transition: null }, te = {
		ReactCurrentDispatcher: N,
		ReactCurrentBatchConfig: P,
		ReactCurrentOwner: C
	};
	function ne() {
		throw Error("act(...) is not supported in production builds of React.");
	}
	e.Children = {
		map: j,
		forEach: function(e, t, n) {
			j(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return j(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return j(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!D(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	}, e.Component = _, e.Fragment = r, e.Profiler = a, e.PureComponent = y, e.StrictMode = i, e.Suspense = l, e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = te, e.act = ne, e.cloneElement = function(e, n, r) {
		if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
		var i = h({}, e.props), a = e.key, o = e.ref, s = e._owner;
		if (n != null) {
			if (n.ref !== void 0 && (o = n.ref, s = C.current), n.key !== void 0 && (a = "" + n.key), e.type && e.type.defaultProps) var c = e.type.defaultProps;
			for (l in n) S.call(n, l) && !w.hasOwnProperty(l) && (i[l] = n[l] === void 0 && c !== void 0 ? c[l] : n[l]);
		}
		var l = arguments.length - 2;
		if (l === 1) i.children = r;
		else if (1 < l) {
			c = Array(l);
			for (var u = 0; u < l; u++) c[u] = arguments[u + 2];
			i.children = c;
		}
		return {
			$$typeof: t,
			type: e.type,
			key: a,
			ref: o,
			props: i,
			_owner: s
		};
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null,
			_defaultValue: null,
			_globalName: null
		}, e.Provider = {
			$$typeof: o,
			_context: e
		}, e.Consumer = e;
	}, e.createElement = T, e.createFactory = function(e) {
		var t = T.bind(null, e);
		return t.type = e, t;
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = D, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: M
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = P.transition;
		P.transition = {};
		try {
			e();
		} finally {
			P.transition = t;
		}
	}, e.unstable_act = ne, e.useCallback = function(e, t) {
		return N.current.useCallback(e, t);
	}, e.useContext = function(e) {
		return N.current.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e) {
		return N.current.useDeferredValue(e);
	}, e.useEffect = function(e, t) {
		return N.current.useEffect(e, t);
	}, e.useId = function() {
		return N.current.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return N.current.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return N.current.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return N.current.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return N.current.useMemo(e, t);
	}, e.useReducer = function(e, t, n) {
		return N.current.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return N.current.useRef(e);
	}, e.useState = function(e) {
		return N.current.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return N.current.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return N.current.useTransition();
	}, e.version = "18.3.1";
})), n = /* @__PURE__ */ e(((e, n) => {
	n.exports = t();
})), r = /* @__PURE__ */ e(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = typeof setTimeout == "function" ? setTimeout : null, _ = typeof clearTimeout == "function" ? clearTimeout : null, v = typeof setImmediate < "u" ? setImmediate : null;
	typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
	function y(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function b(e) {
		if (h = !1, y(e), !m) {
			if (n(c) !== null) m = !0, j(x);
			else {
				var t = n(l);
				t !== null && M(b, t.startTime - e);
			}
		}
	}
	function x(t, i) {
		m = !1, h && (h = !1, _(w), w = -1), p = !0;
		var a = f;
		try {
			for (y(i), d = n(c); d !== null && (!(d.expirationTime > i) || t && !D());) {
				var o = d.callback;
				if (typeof o == "function") {
					d.callback = null, f = d.priorityLevel;
					var s = o(d.expirationTime <= i);
					i = e.unstable_now(), typeof s == "function" ? d.callback = s : d === n(c) && r(c), y(i);
				} else r(c);
				d = n(c);
			}
			if (d !== null) var u = !0;
			else {
				var g = n(l);
				g !== null && M(b, g.startTime - i), u = !1;
			}
			return u;
		} finally {
			d = null, f = a, p = !1;
		}
	}
	var S = !1, C = null, w = -1, T = 5, E = -1;
	function D() {
		return !(e.unstable_now() - E < T);
	}
	function O() {
		if (C !== null) {
			var t = e.unstable_now();
			E = t;
			var n = !0;
			try {
				n = C(!0, t);
			} finally {
				n ? k() : (S = !1, C = null);
			}
		} else S = !1;
	}
	var k;
	if (typeof v == "function") k = function() {
		v(O);
	};
	else if (typeof MessageChannel < "u") {
		var A = new MessageChannel(), ee = A.port2;
		A.port1.onmessage = O, k = function() {
			ee.postMessage(null);
		};
	} else k = function() {
		g(O, 0);
	};
	function j(e) {
		C = e, S || (S = !0, k());
	}
	function M(t, n) {
		w = g(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_continueExecution = function() {
		m || p || (m = !0, j(x));
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : T = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_getFirstCallbackNode = function() {
		return n(c);
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_pauseExecution = function() {}, e.unstable_requestPaint = function() {}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (_(w), w = -1) : h = !0, M(b, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, j(x))), r;
	}, e.unstable_shouldYield = D, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), i = /* @__PURE__ */ e(((e, t) => {
	t.exports = r();
})), a = /* @__PURE__ */ e(((e) => {
	var t = n(), r = i();
	function a(e) {
		for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	var o = /* @__PURE__ */ new Set(), s = {};
	function c(e, t) {
		l(e, t), l(e + "Capture", t);
	}
	function l(e, t) {
		for (s[e] = t, e = 0; e < t.length; e++) o.add(t[e]);
	}
	var u = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, d = Object.prototype.hasOwnProperty, f = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, p = {}, m = {};
	function h(e) {
		return d.call(m, e) ? !0 : d.call(p, e) ? !1 : f.test(e) ? m[e] = !0 : (p[e] = !0, !1);
	}
	function g(e, t, n, r) {
		if (n !== null && n.type === 0) return !1;
		switch (typeof t) {
			case "function":
			case "symbol": return !0;
			case "boolean": return r ? !1 : n === null ? (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-") : !n.acceptsBooleans;
			default: return !1;
		}
	}
	function _(e, t, n, r) {
		if (t == null || g(e, t, n, r)) return !0;
		if (r) return !1;
		if (n !== null) switch (n.type) {
			case 3: return !t;
			case 4: return !1 === t;
			case 5: return isNaN(t);
			case 6: return isNaN(t) || 1 > t;
		}
		return !1;
	}
	function v(e, t, n, r, i, a, o) {
		this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = a, this.removeEmptyString = o;
	}
	var y = {};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
		y[e] = new v(e, 0, !1, e, null, !1, !1);
	}), [
		["acceptCharset", "accept-charset"],
		["className", "class"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"]
	].forEach(function(e) {
		var t = e[0];
		y[t] = new v(t, 1, !1, e[1], null, !1, !1);
	}), [
		"contentEditable",
		"draggable",
		"spellCheck",
		"value"
	].forEach(function(e) {
		y[e] = new v(e, 2, !1, e.toLowerCase(), null, !1, !1);
	}), [
		"autoReverse",
		"externalResourcesRequired",
		"focusable",
		"preserveAlpha"
	].forEach(function(e) {
		y[e] = new v(e, 2, !1, e, null, !1, !1);
	}), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
		y[e] = new v(e, 3, !1, e.toLowerCase(), null, !1, !1);
	}), [
		"checked",
		"multiple",
		"muted",
		"selected"
	].forEach(function(e) {
		y[e] = new v(e, 3, !0, e, null, !1, !1);
	}), ["capture", "download"].forEach(function(e) {
		y[e] = new v(e, 4, !1, e, null, !1, !1);
	}), [
		"cols",
		"rows",
		"size",
		"span"
	].forEach(function(e) {
		y[e] = new v(e, 6, !1, e, null, !1, !1);
	}), ["rowSpan", "start"].forEach(function(e) {
		y[e] = new v(e, 5, !1, e.toLowerCase(), null, !1, !1);
	});
	var b = /[\-:]([a-z])/g;
	function x(e) {
		return e[1].toUpperCase();
	}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
		var t = e.replace(b, x);
		y[t] = new v(t, 1, !1, e, null, !1, !1);
	}), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
		var t = e.replace(b, x);
		y[t] = new v(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
	}), [
		"xml:base",
		"xml:lang",
		"xml:space"
	].forEach(function(e) {
		var t = e.replace(b, x);
		y[t] = new v(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
	}), ["tabIndex", "crossOrigin"].forEach(function(e) {
		y[e] = new v(e, 1, !1, e.toLowerCase(), null, !1, !1);
	}), y.xlinkHref = new v("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), [
		"src",
		"href",
		"action",
		"formAction"
	].forEach(function(e) {
		y[e] = new v(e, 1, !1, e.toLowerCase(), null, !0, !0);
	});
	function S(e, t, n, r) {
		var i = y.hasOwnProperty(t) ? y[t] : null;
		(i === null ? r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N" : i.type !== 0) && (_(t, n, i, r) && (n = null), r || i === null ? h(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type !== 3 && "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && !0 === n ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
	}
	var C = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, w = Symbol.for("react.element"), T = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), D = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), k = Symbol.for("react.provider"), A = Symbol.for("react.context"), ee = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), M = Symbol.for("react.suspense_list"), N = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), te = Symbol.for("react.offscreen"), ne = Symbol.iterator;
	function re(e) {
		return typeof e != "object" || !e ? null : (e = ne && e[ne] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var F = Object.assign, ie;
	function ae(e) {
		if (ie === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ie = t && t[1] || "";
		}
		return "\n" + ie + e;
	}
	var oe = !1;
	function se(e, t) {
		if (!e || oe) return "";
		oe = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			if (t) {
				if (t = function() {
					throw Error();
				}, Object.defineProperty(t.prototype, "props", { set: function() {
					throw Error();
				} }), typeof Reflect == "object" && Reflect.construct) {
					try {
						Reflect.construct(t, []);
					} catch (e) {
						var r = e;
					}
					Reflect.construct(e, [], t);
				} else {
					try {
						t.call();
					} catch (e) {
						r = e;
					}
					e.call(t.prototype);
				}
			} else {
				try {
					throw Error();
				} catch (e) {
					r = e;
				}
				e();
			}
		} catch (t) {
			if (t && r && typeof t.stack == "string") {
				for (var i = t.stack.split("\n"), a = r.stack.split("\n"), o = i.length - 1, s = a.length - 1; 1 <= o && 0 <= s && i[o] !== a[s];) s--;
				for (; 1 <= o && 0 <= s; o--, s--) if (i[o] !== a[s]) {
					if (o !== 1 || s !== 1) do
						if (o--, s--, 0 > s || i[o] !== a[s]) {
							var c = "\n" + i[o].replace(" at new ", " at ");
							return e.displayName && c.includes("<anonymous>") && (c = c.replace("<anonymous>", e.displayName)), c;
						}
					while (1 <= o && 0 <= s);
					break;
				}
			}
		} finally {
			oe = !1, Error.prepareStackTrace = n;
		}
		return (e = e ? e.displayName || e.name : "") ? ae(e) : "";
	}
	function ce(e) {
		switch (e.tag) {
			case 5: return ae(e.type);
			case 16: return ae("Lazy");
			case 13: return ae("Suspense");
			case 19: return ae("SuspenseList");
			case 0:
			case 2:
			case 15: return e = se(e.type, !1), e;
			case 11: return e = se(e.type.render, !1), e;
			case 1: return e = se(e.type, !0), e;
			default: return "";
		}
	}
	function le(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case E: return "Fragment";
			case T: return "Portal";
			case O: return "Profiler";
			case D: return "StrictMode";
			case j: return "Suspense";
			case M: return "SuspenseList";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case A: return (e.displayName || "Context") + ".Consumer";
			case k: return (e._context.displayName || "Context") + ".Provider";
			case ee:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case N: return t = e.displayName || null, t === null ? le(e.type) || "Memo" : t;
			case P:
				t = e._payload, e = e._init;
				try {
					return le(e(t));
				} catch {}
		}
		return null;
	}
	function ue(e) {
		var t = e.type;
		switch (e.tag) {
			case 24: return "Cache";
			case 9: return (t.displayName || "Context") + ".Consumer";
			case 10: return (t._context.displayName || "Context") + ".Provider";
			case 18: return "DehydratedFragment";
			case 11: return e = t.render, e = e.displayName || e.name || "", t.displayName || (e === "" ? "ForwardRef" : "ForwardRef(" + e + ")");
			case 7: return "Fragment";
			case 5: return t;
			case 4: return "Portal";
			case 3: return "Root";
			case 6: return "Text";
			case 16: return le(t);
			case 8: return t === D ? "StrictMode" : "Mode";
			case 22: return "Offscreen";
			case 12: return "Profiler";
			case 21: return "Scope";
			case 13: return "Suspense";
			case 19: return "SuspenseList";
			case 25: return "TracingMarker";
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
	function de(e) {
		switch (typeof e) {
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function fe(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function pe(e) {
		var t = fe(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
		if (!e.hasOwnProperty(t) && n !== void 0 && typeof n.get == "function" && typeof n.set == "function") {
			var i = n.get, a = n.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					r = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: n.enumerable }), {
				getValue: function() {
					return r;
				},
				setValue: function(e) {
					r = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function me(e) {
		e._valueTracker ||= pe(e);
	}
	function he(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = fe(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function I(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function ge(e, t) {
		var n = t.checked;
		return F({}, t, {
			defaultChecked: void 0,
			defaultValue: void 0,
			value: void 0,
			checked: n ?? e._wrapperState.initialChecked
		});
	}
	function _e(e, t) {
		var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked == null ? t.defaultChecked : t.checked;
		n = de(t.value == null ? n : t.value), e._wrapperState = {
			initialChecked: r,
			initialValue: n,
			controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
		};
	}
	function ve(e, t) {
		t = t.checked, t != null && S(e, "checked", t, !1);
	}
	function ye(e, t) {
		ve(e, t);
		var n = de(t.value), r = t.type;
		if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
		else if (r === "submit" || r === "reset") {
			e.removeAttribute("value");
			return;
		}
		t.hasOwnProperty("value") ? xe(e, t.type, n) : t.hasOwnProperty("defaultValue") && xe(e, t.type, de(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
	}
	function be(e, t, n) {
		if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
			var r = t.type;
			if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
			t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
		}
		n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
	}
	function xe(e, t, n) {
		(t !== "number" || I(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
	}
	var Se = Array.isArray;
	function Ce(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + de(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function we(e, t) {
		if (t.dangerouslySetInnerHTML != null) throw Error(a(91));
		return F({}, t, {
			value: void 0,
			defaultValue: void 0,
			children: "" + e._wrapperState.initialValue
		});
	}
	function Te(e, t) {
		var n = t.value;
		if (n == null) {
			if (n = t.children, t = t.defaultValue, n != null) {
				if (t != null) throw Error(a(92));
				if (Se(n)) {
					if (1 < n.length) throw Error(a(93));
					n = n[0];
				}
				t = n;
			}
			t ??= "", n = t;
		}
		e._wrapperState = { initialValue: de(n) };
	}
	function Ee(e, t) {
		var n = de(t.value), r = de(t.defaultValue);
		n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
	}
	function De(e) {
		var t = e.textContent;
		t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
	}
	function Oe(e) {
		switch (e) {
			case "svg": return "http://www.w3.org/2000/svg";
			case "math": return "http://www.w3.org/1998/Math/MathML";
			default: return "http://www.w3.org/1999/xhtml";
		}
	}
	function ke(e, t) {
		return e == null || e === "http://www.w3.org/1999/xhtml" ? Oe(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
	}
	var Ae, je = function(e) {
		return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
			MSApp.execUnsafeLocalFunction(function() {
				return e(t, n, r, i);
			});
		} : e;
	}(function(e, t) {
		if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
		else {
			for (Ae ||= document.createElement("div"), Ae.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Ae.firstChild; e.firstChild;) e.removeChild(e.firstChild);
			for (; t.firstChild;) e.appendChild(t.firstChild);
		}
	});
	function Me(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Ne = {
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
	}, Pe = [
		"Webkit",
		"ms",
		"Moz",
		"O"
	];
	Object.keys(Ne).forEach(function(e) {
		Pe.forEach(function(t) {
			t = t + e.charAt(0).toUpperCase() + e.substring(1), Ne[t] = Ne[e];
		});
	});
	function Fe(e, t, n) {
		return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Ne.hasOwnProperty(e) && Ne[e] ? ("" + t).trim() : t + "px";
	}
	function Ie(e, t) {
		for (var n in e = e.style, t) if (t.hasOwnProperty(n)) {
			var r = n.indexOf("--") === 0, i = Fe(n, t[n], r);
			n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
		}
	}
	var Le = F({ menuitem: !0 }, {
		area: !0,
		base: !0,
		br: !0,
		col: !0,
		embed: !0,
		hr: !0,
		img: !0,
		input: !0,
		keygen: !0,
		link: !0,
		meta: !0,
		param: !0,
		source: !0,
		track: !0,
		wbr: !0
	});
	function Re(e, t) {
		if (t) {
			if (Le[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(a(137, e));
			if (t.dangerouslySetInnerHTML != null) {
				if (t.children != null) throw Error(a(60));
				if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(a(61));
			}
			if (t.style != null && typeof t.style != "object") throw Error(a(62));
		}
	}
	function ze(e, t) {
		if (e.indexOf("-") === -1) return typeof t.is == "string";
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var Be = null;
	function Ve(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var He = null, Ue = null, We = null;
	function Ge(e) {
		if (e = Ui(e)) {
			if (typeof He != "function") throw Error(a(280));
			var t = e.stateNode;
			t && (t = Gi(t), He(e.stateNode, e.type, t));
		}
	}
	function Ke(e) {
		Ue ? We ? We.push(e) : We = [e] : Ue = e;
	}
	function qe() {
		if (Ue) {
			var e = Ue, t = We;
			if (We = Ue = null, Ge(e), t) for (e = 0; e < t.length; e++) Ge(t[e]);
		}
	}
	function Je(e, t) {
		return e(t);
	}
	function Ye() {}
	var Xe = !1;
	function Ze(e, t, n) {
		if (Xe) return e(t, n);
		Xe = !0;
		try {
			return Je(e, t, n);
		} finally {
			Xe = !1, (Ue !== null || We !== null) && (Ye(), qe());
		}
	}
	function Qe(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = Gi(n);
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
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
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(a(231, t, typeof n));
		return n;
	}
	var $e = !1;
	if (u) try {
		var et = {};
		Object.defineProperty(et, "passive", { get: function() {
			$e = !0;
		} }), window.addEventListener("test", et, et), window.removeEventListener("test", et, et);
	} catch {
		$e = !1;
	}
	function tt(e, t, n, r, i, a, o, s, c) {
		var l = Array.prototype.slice.call(arguments, 3);
		try {
			t.apply(n, l);
		} catch (e) {
			this.onError(e);
		}
	}
	var nt = !1, rt = null, it = !1, at = null, ot = { onError: function(e) {
		nt = !0, rt = e;
	} };
	function st(e, t, n, r, i, a, o, s, c) {
		nt = !1, rt = null, tt.apply(ot, arguments);
	}
	function ct(e, t, n, r, i, o, s, c, l) {
		if (st.apply(this, arguments), nt) {
			if (nt) {
				var u = rt;
				nt = !1, rt = null;
			} else throw Error(a(198));
			it || (it = !0, at = u);
		}
	}
	function lt(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function ut(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function dt(e) {
		if (lt(e) !== e) throw Error(a(188));
	}
	function ft(e) {
		var t = e.alternate;
		if (!t) {
			if (t = lt(e), t === null) throw Error(a(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var i = n.return;
			if (i === null) break;
			var o = i.alternate;
			if (o === null) {
				if (r = i.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (i.child === o.child) {
				for (o = i.child; o;) {
					if (o === n) return dt(i), e;
					if (o === r) return dt(i), t;
					o = o.sibling;
				}
				throw Error(a(188));
			}
			if (n.return !== r.return) n = i, r = o;
			else {
				for (var s = !1, c = i.child; c;) {
					if (c === n) {
						s = !0, n = i, r = o;
						break;
					}
					if (c === r) {
						s = !0, r = i, n = o;
						break;
					}
					c = c.sibling;
				}
				if (!s) {
					for (c = o.child; c;) {
						if (c === n) {
							s = !0, n = o, r = i;
							break;
						}
						if (c === r) {
							s = !0, r = o, n = i;
							break;
						}
						c = c.sibling;
					}
					if (!s) throw Error(a(189));
				}
			}
			if (n.alternate !== r) throw Error(a(190));
		}
		if (n.tag !== 3) throw Error(a(188));
		return n.stateNode.current === n ? e : t;
	}
	function pt(e) {
		return e = ft(e), e === null ? null : mt(e);
	}
	function mt(e) {
		if (e.tag === 5 || e.tag === 6) return e;
		for (e = e.child; e !== null;) {
			var t = mt(e);
			if (t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var ht = r.unstable_scheduleCallback, gt = r.unstable_cancelCallback, _t = r.unstable_shouldYield, vt = r.unstable_requestPaint, L = r.unstable_now, yt = r.unstable_getCurrentPriorityLevel, bt = r.unstable_ImmediatePriority, xt = r.unstable_UserBlockingPriority, St = r.unstable_NormalPriority, Ct = r.unstable_LowPriority, wt = r.unstable_IdlePriority, Tt = null, Et = null;
	function Dt(e) {
		if (Et && typeof Et.onCommitFiberRoot == "function") try {
			Et.onCommitFiberRoot(Tt, e, void 0, (e.current.flags & 128) == 128);
		} catch {}
	}
	var Ot = Math.clz32 ? Math.clz32 : jt, kt = Math.log, At = Math.LN2;
	function jt(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (kt(e) / At | 0) | 0;
	}
	var Mt = 64, Nt = 4194304;
	function Pt(e) {
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
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
			case 2097152: return e & 4194240;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864: return e & 130023424;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 1073741824;
			default: return e;
		}
	}
	function Ft(e, t) {
		var n = e.pendingLanes;
		if (n === 0) return 0;
		var r = 0, i = e.suspendedLanes, a = e.pingedLanes, o = n & 268435455;
		if (o !== 0) {
			var s = o & ~i;
			s === 0 ? (a &= o, a !== 0 && (r = Pt(a))) : r = Pt(s);
		} else o = n & ~i, o === 0 ? a !== 0 && (r = Pt(a)) : r = Pt(o);
		if (r === 0) return 0;
		if (t !== 0 && t !== r && (t & i) === 0 && (i = r & -r, a = t & -t, i >= a || i === 16 && a & 4194240)) return t;
		if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t;) n = 31 - Ot(t), i = 1 << n, r |= e[n], t &= ~i;
		return r;
	}
	function It(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4: return t + 250;
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
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864: return -1;
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function Lt(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes; 0 < a;) {
			var o = 31 - Ot(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = It(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
	}
	function Rt(e) {
		return e = e.pendingLanes & -1073741825, e === 0 ? e & 1073741824 ? 1073741824 : 0 : e;
	}
	function zt() {
		var e = Mt;
		return Mt <<= 1, !(Mt & 4194240) && (Mt = 64), e;
	}
	function Bt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Vt(e, t, n) {
		e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ot(t), e[t] = n;
	}
	function Ht(e, t) {
		var n = e.pendingLanes & ~t;
		e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
		var r = e.eventTimes;
		for (e = e.expirationTimes; 0 < n;) {
			var i = 31 - Ot(n), a = 1 << i;
			t[i] = 0, r[i] = -1, e[i] = -1, n &= ~a;
		}
	}
	function Ut(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Ot(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	var R = 0;
	function Wt(e) {
		return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
	}
	var Gt, Kt, qt, Jt, Yt, Xt = !1, Zt = [], Qt = null, $t = null, en = null, tn = /* @__PURE__ */ new Map(), nn = /* @__PURE__ */ new Map(), rn = [], an = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
	function on(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Qt = null;
				break;
			case "dragenter":
			case "dragleave":
				$t = null;
				break;
			case "mouseover":
			case "mouseout":
				en = null;
				break;
			case "pointerover":
			case "pointerout":
				tn.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": nn.delete(t.pointerId);
		}
	}
	function sn(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Ui(t), t !== null && Kt(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function cn(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Qt = sn(Qt, e, t, n, r, i), !0;
			case "dragenter": return $t = sn($t, e, t, n, r, i), !0;
			case "mouseover": return en = sn(en, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return tn.set(a, sn(tn.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, nn.set(a, sn(nn.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function ln(e) {
		var t = Hi(e.target);
		if (t !== null) {
			var n = lt(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = ut(n), t !== null) {
						e.blockedOn = t, Yt(e.priority, function() {
							qt(n);
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
	function un(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = xn(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				Be = r, n.target.dispatchEvent(r), Be = null;
			} else return t = Ui(n), t !== null && Kt(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function dn(e, t, n) {
		un(e) && n.delete(t);
	}
	function fn() {
		Xt = !1, Qt !== null && un(Qt) && (Qt = null), $t !== null && un($t) && ($t = null), en !== null && un(en) && (en = null), tn.forEach(dn), nn.forEach(dn);
	}
	function pn(e, t) {
		e.blockedOn === t && (e.blockedOn = null, Xt || (Xt = !0, r.unstable_scheduleCallback(r.unstable_NormalPriority, fn)));
	}
	function mn(e) {
		function t(t) {
			return pn(t, e);
		}
		if (0 < Zt.length) {
			pn(Zt[0], e);
			for (var n = 1; n < Zt.length; n++) {
				var r = Zt[n];
				r.blockedOn === e && (r.blockedOn = null);
			}
		}
		for (Qt !== null && pn(Qt, e), $t !== null && pn($t, e), en !== null && pn(en, e), tn.forEach(t), nn.forEach(t), n = 0; n < rn.length; n++) r = rn[n], r.blockedOn === e && (r.blockedOn = null);
		for (; 0 < rn.length && (n = rn[0], n.blockedOn === null);) ln(n), n.blockedOn === null && rn.shift();
	}
	var hn = C.ReactCurrentBatchConfig, gn = !0;
	function _n(e, t, n, r) {
		var i = R, a = hn.transition;
		hn.transition = null;
		try {
			R = 1, yn(e, t, n, r);
		} finally {
			R = i, hn.transition = a;
		}
	}
	function vn(e, t, n, r) {
		var i = R, a = hn.transition;
		hn.transition = null;
		try {
			R = 4, yn(e, t, n, r);
		} finally {
			R = i, hn.transition = a;
		}
	}
	function yn(e, t, n, r) {
		if (gn) {
			var i = xn(e, t, n, r);
			if (i === null) mi(e, t, r, bn, n), on(e, r);
			else if (cn(i, e, t, n, r)) r.stopPropagation();
			else if (on(e, r), t & 4 && -1 < an.indexOf(e)) {
				for (; i !== null;) {
					var a = Ui(i);
					if (a !== null && Gt(a), a = xn(e, t, n, r), a === null && mi(e, t, r, bn, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else mi(e, t, r, null, n);
		}
	}
	var bn = null;
	function xn(e, t, n, r) {
		if (bn = null, e = Ve(r), e = Hi(e), e !== null) {
			if (t = lt(e), t === null) e = null;
			else if (n = t.tag, n === 13) {
				if (e = ut(t), e !== null) return e;
				e = null;
			} else if (n === 3) {
				if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
				e = null;
			} else t !== e && (e = null);
		}
		return bn = e, null;
	}
	function Sn(e) {
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
			case "selectstart": return 1;
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
			case "pointerleave": return 4;
			case "message": switch (yt()) {
				case bt: return 1;
				case xt: return 4;
				case St:
				case Ct: return 16;
				case wt: return 536870912;
				default: return 16;
			}
			default: return 16;
		}
	}
	var Cn = null, wn = null, Tn = null;
	function En() {
		if (Tn) return Tn;
		var e, t = wn, n = t.length, r, i = "value" in Cn ? Cn.value : Cn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Tn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Dn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function On() {
		return !0;
	}
	function kn() {
		return !1;
	}
	function An(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? On : kn, this.isPropagationStopped = kn, this;
		}
		return F(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = On);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = On);
			},
			persist: function() {},
			isPersistent: On
		}), t;
	}
	var jn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Mn = An(jn), Nn = F({}, jn, {
		view: 0,
		detail: 0
	}), Pn = An(Nn), Fn, In, Ln, Rn = F({}, Nn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Yn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Ln && (Ln && e.type === "mousemove" ? (Fn = e.screenX - Ln.screenX, In = e.screenY - Ln.screenY) : In = Fn = 0, Ln = e), Fn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : In;
		}
	}), zn = An(Rn), Bn = An(F({}, Rn, { dataTransfer: 0 })), Vn = An(F({}, Nn, { relatedTarget: 0 })), Hn = An(F({}, jn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Un = An(F({}, jn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Wn = An(F({}, jn, { data: 0 })), Gn = {
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
	}, Kn = {
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
	}, qn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Jn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = qn[e]) ? !!t[e] : !1;
	}
	function Yn() {
		return Jn;
	}
	var Xn = An(F({}, Nn, {
		key: function(e) {
			if (e.key) {
				var t = Gn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Dn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Kn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Yn,
		charCode: function(e) {
			return e.type === "keypress" ? Dn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Dn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Zn = An(F({}, Rn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Qn = An(F({}, Nn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Yn
	})), $n = An(F({}, jn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), er = An(F({}, Rn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), tr = [
		9,
		13,
		27,
		32
	], nr = u && "CompositionEvent" in window, rr = null;
	u && "documentMode" in document && (rr = document.documentMode);
	var ir = u && "TextEvent" in window && !rr, ar = u && (!nr || rr && 8 < rr && 11 >= rr), or = " ", sr = !1;
	function cr(e, t) {
		switch (e) {
			case "keyup": return tr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function lr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var ur = !1;
	function dr(e, t) {
		switch (e) {
			case "compositionend": return lr(t);
			case "keypress": return t.which === 32 ? (sr = !0, or) : null;
			case "textInput": return e = t.data, e === or && sr ? null : e;
			default: return null;
		}
	}
	function fr(e, t) {
		if (ur) return e === "compositionend" || !nr && cr(e, t) ? (e = En(), Tn = wn = Cn = null, ur = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return ar && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var pr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function mr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!pr[e.type] : t === "textarea";
	}
	function hr(e, t, n, r) {
		Ke(r), t = gi(t, "onChange"), 0 < t.length && (n = new Mn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var gr = null, _r = null;
	function vr(e) {
		li(e, 0);
	}
	function yr(e) {
		if (he(Wi(e))) return e;
	}
	function br(e, t) {
		if (e === "change") return t;
	}
	var xr = !1;
	if (u) {
		var Sr;
		if (u) {
			var Cr = "oninput" in document;
			if (!Cr) {
				var wr = document.createElement("div");
				wr.setAttribute("oninput", "return;"), Cr = typeof wr.oninput == "function";
			}
			Sr = Cr;
		} else Sr = !1;
		xr = Sr && (!document.documentMode || 9 < document.documentMode);
	}
	function Tr() {
		gr && (gr.detachEvent("onpropertychange", Er), _r = gr = null);
	}
	function Er(e) {
		if (e.propertyName === "value" && yr(_r)) {
			var t = [];
			hr(t, _r, e, Ve(e)), Ze(vr, t);
		}
	}
	function Dr(e, t, n) {
		e === "focusin" ? (Tr(), gr = t, _r = n, gr.attachEvent("onpropertychange", Er)) : e === "focusout" && Tr();
	}
	function Or(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return yr(_r);
	}
	function kr(e, t) {
		if (e === "click") return yr(t);
	}
	function Ar(e, t) {
		if (e === "input" || e === "change") return yr(t);
	}
	function jr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Mr = typeof Object.is == "function" ? Object.is : jr;
	function Nr(e, t) {
		if (Mr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!d.call(t, i) || !Mr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Pr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Fr(e, t) {
		var n = Pr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Pr(n);
		}
	}
	function Ir(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ir(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Lr() {
		for (var e = window, t = I(); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = I(e.document);
		}
		return t;
	}
	function Rr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	function zr(e) {
		var t = Lr(), n = e.focusedElem, r = e.selectionRange;
		if (t !== n && n && n.ownerDocument && Ir(n.ownerDocument.documentElement, n)) {
			if (r !== null && Rr(n)) {
				if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
				else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
					e = e.getSelection();
					var i = n.textContent.length, a = Math.min(r.start, i);
					r = r.end === void 0 ? a : Math.min(r.end, i), !e.extend && a > r && (i = r, r = a, a = i), i = Fr(n, a);
					var o = Fr(n, r);
					i && o && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), a > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
				}
			}
			for (t = [], e = n; e = e.parentNode;) e.nodeType === 1 && t.push({
				element: e,
				left: e.scrollLeft,
				top: e.scrollTop
			});
			for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
		}
	}
	var Br = u && "documentMode" in document && 11 >= document.documentMode, Vr = null, Hr = null, Ur = null, Wr = !1;
	function Gr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Wr || Vr == null || Vr !== I(r) || (r = Vr, "selectionStart" in r && Rr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Ur && Nr(Ur, r) || (Ur = r, r = gi(Hr, "onSelect"), 0 < r.length && (t = new Mn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Vr)));
	}
	function Kr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var qr = {
		animationend: Kr("Animation", "AnimationEnd"),
		animationiteration: Kr("Animation", "AnimationIteration"),
		animationstart: Kr("Animation", "AnimationStart"),
		transitionend: Kr("Transition", "TransitionEnd")
	}, Jr = {}, Yr = {};
	u && (Yr = document.createElement("div").style, "AnimationEvent" in window || (delete qr.animationend.animation, delete qr.animationiteration.animation, delete qr.animationstart.animation), "TransitionEvent" in window || delete qr.transitionend.transition);
	function Xr(e) {
		if (Jr[e]) return Jr[e];
		if (!qr[e]) return e;
		var t = qr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Yr) return Jr[e] = t[n];
		return e;
	}
	var Zr = Xr("animationend"), Qr = Xr("animationiteration"), $r = Xr("animationstart"), ei = Xr("transitionend"), ti = /* @__PURE__ */ new Map(), ni = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	function ri(e, t) {
		ti.set(e, t), c(t, [e]);
	}
	for (var ii = 0; ii < ni.length; ii++) {
		var ai = ni[ii];
		ri(ai.toLowerCase(), "on" + (ai[0].toUpperCase() + ai.slice(1)));
	}
	ri(Zr, "onAnimationEnd"), ri(Qr, "onAnimationIteration"), ri($r, "onAnimationStart"), ri("dblclick", "onDoubleClick"), ri("focusin", "onFocus"), ri("focusout", "onBlur"), ri(ei, "onTransitionEnd"), l("onMouseEnter", ["mouseout", "mouseover"]), l("onMouseLeave", ["mouseout", "mouseover"]), l("onPointerEnter", ["pointerout", "pointerover"]), l("onPointerLeave", ["pointerout", "pointerover"]), c("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), c("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), c("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), c("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), c("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), c("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var oi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), si = new Set("cancel close invalid load scroll toggle".split(" ").concat(oi));
	function ci(e, t, n) {
		var r = e.type || "unknown-event";
		e.currentTarget = n, ct(r, t, void 0, e), e.currentTarget = null;
	}
	function li(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					ci(i, s, l), a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					ci(i, s, l), a = c;
				}
			}
		}
		if (it) throw e = at, it = !1, at = null, e;
	}
	function z(e, t) {
		var n = t[zi];
		n === void 0 && (n = t[zi] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (pi(t, e, 2, !1), n.add(r));
	}
	function ui(e, t, n) {
		var r = 0;
		t && (r |= 4), pi(n, e, r, t);
	}
	var di = "_reactListening" + Math.random().toString(36).slice(2);
	function fi(e) {
		if (!e[di]) {
			e[di] = !0, o.forEach(function(t) {
				t !== "selectionchange" && (si.has(t) || ui(t, !1, e), ui(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[di] || (t[di] = !0, ui("selectionchange", !1, t));
		}
	}
	function pi(e, t, n, r) {
		switch (Sn(t)) {
			case 1:
				var i = _n;
				break;
			case 4:
				i = vn;
				break;
			default: i = yn;
		}
		n = i.bind(null, t, n, e), i = void 0, !$e || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function mi(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var o = r.tag;
			if (o === 3 || o === 4) {
				var s = r.stateNode.containerInfo;
				if (s === i || s.nodeType === 8 && s.parentNode === i) break;
				if (o === 4) for (o = r.return; o !== null;) {
					var c = o.tag;
					if ((c === 3 || c === 4) && (c = o.stateNode.containerInfo, c === i || c.nodeType === 8 && c.parentNode === i)) return;
					o = o.return;
				}
				for (; s !== null;) {
					if (o = Hi(s), o === null) return;
					if (c = o.tag, c === 5 || c === 6) {
						r = a = o;
						continue a;
					}
					s = s.parentNode;
				}
			}
			r = r.return;
		}
		Ze(function() {
			var r = a, i = Ve(n), o = [];
			a: {
				var s = ti.get(e);
				if (s !== void 0) {
					var c = Mn, l = e;
					switch (e) {
						case "keypress": if (Dn(n) === 0) break a;
						case "keydown":
						case "keyup":
							c = Xn;
							break;
						case "focusin":
							l = "focus", c = Vn;
							break;
						case "focusout":
							l = "blur", c = Vn;
							break;
						case "beforeblur":
						case "afterblur":
							c = Vn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							c = zn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							c = Bn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							c = Qn;
							break;
						case Zr:
						case Qr:
						case $r:
							c = Hn;
							break;
						case ei:
							c = $n;
							break;
						case "scroll":
							c = Pn;
							break;
						case "wheel":
							c = er;
							break;
						case "copy":
						case "cut":
						case "paste":
							c = Un;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup": c = Zn;
					}
					var u = !!(t & 4), d = !u && e === "scroll", f = u ? s === null ? null : s + "Capture" : s;
					u = [];
					for (var p = r, m; p !== null;) {
						m = p;
						var h = m.stateNode;
						if (m.tag === 5 && h !== null && (m = h, f !== null && (h = Qe(p, f), h != null && u.push(hi(p, h, m)))), d) break;
						p = p.return;
					}
					0 < u.length && (s = new c(s, l, null, n, i), o.push({
						event: s,
						listeners: u
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== Be && (l = n.relatedTarget || n.fromElement) && (Hi(l) || l[Ri])) break a;
					if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Hi(l) : null, l !== null && (d = lt(l), l !== d || l.tag !== 5 && l.tag !== 6) && (l = null)) : (c = null, l = r), c !== l)) {
						if (u = zn, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = Zn, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = c == null ? s : Wi(c), m = l == null ? s : Wi(l), s = new u(h, p + "leave", c, n, i), s.target = d, s.relatedTarget = m, h = null, Hi(i) === r && (u = new u(f, p + "enter", l, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, c && l) b: {
							for (u = c, f = l, p = 0, m = u; m; m = _i(m)) p++;
							for (m = 0, h = f; h; h = _i(h)) m++;
							for (; 0 < p - m;) u = _i(u), p--;
							for (; 0 < m - p;) f = _i(f), m--;
							for (; p--;) {
								if (u === f || f !== null && u === f.alternate) break b;
								u = _i(u), f = _i(f);
							}
							u = null;
						}
						else u = null;
						c !== null && vi(o, s, c, u, !1), l !== null && d !== null && vi(o, d, l, u, !0);
					}
				}
				a: {
					if (s = r ? Wi(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var g = br;
					else if (mr(s)) {
						if (xr) g = Ar;
						else {
							g = Or;
							var _ = Dr;
						}
					} else (c = s.nodeName) && c.toLowerCase() === "input" && (s.type === "checkbox" || s.type === "radio") && (g = kr);
					if (g &&= g(e, r)) {
						hr(o, g, n, i);
						break a;
					}
					_ && _(e, s, r), e === "focusout" && (_ = s._wrapperState) && _.controlled && s.type === "number" && xe(s, "number", s.value);
				}
				switch (_ = r ? Wi(r) : window, e) {
					case "focusin":
						(mr(_) || _.contentEditable === "true") && (Vr = _, Hr = r, Ur = null);
						break;
					case "focusout":
						Ur = Hr = Vr = null;
						break;
					case "mousedown":
						Wr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Wr = !1, Gr(o, n, i);
						break;
					case "selectionchange": if (Br) break;
					case "keydown":
					case "keyup": Gr(o, n, i);
				}
				var v;
				if (nr) b: {
					switch (e) {
						case "compositionstart":
							var y = "onCompositionStart";
							break b;
						case "compositionend":
							y = "onCompositionEnd";
							break b;
						case "compositionupdate":
							y = "onCompositionUpdate";
							break b;
					}
					y = void 0;
				}
				else ur ? cr(e, n) && (y = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (y = "onCompositionStart");
				y && (ar && n.locale !== "ko" && (ur || y !== "onCompositionStart" ? y === "onCompositionEnd" && ur && (v = En()) : (Cn = i, wn = "value" in Cn ? Cn.value : Cn.textContent, ur = !0)), _ = gi(r, y), 0 < _.length && (y = new Wn(y, e, null, n, i), o.push({
					event: y,
					listeners: _
				}), v ? y.data = v : (v = lr(n), v !== null && (y.data = v)))), (v = ir ? dr(e, n) : fr(e, n)) && (r = gi(r, "onBeforeInput"), 0 < r.length && (i = new Wn("onBeforeInput", "beforeinput", null, n, i), o.push({
					event: i,
					listeners: r
				}), i.data = v));
			}
			li(o, t);
		});
	}
	function hi(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function gi(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			i.tag === 5 && a !== null && (i = a, a = Qe(e, n), a != null && r.unshift(hi(e, a, i)), a = Qe(e, t), a != null && r.push(hi(e, a, i))), e = e.return;
		}
		return r;
	}
	function _i(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5);
		return e || null;
	}
	function vi(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (c !== null && c === r) break;
			s.tag === 5 && l !== null && (s = l, i ? (c = Qe(n, a), c != null && o.unshift(hi(n, c, s))) : i || (c = Qe(n, a), c != null && o.push(hi(n, c, s)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var yi = /\r\n?/g, bi = /\u0000|\uFFFD/g;
	function xi(e) {
		return (typeof e == "string" ? e : "" + e).replace(yi, "\n").replace(bi, "");
	}
	function Si(e, t, n) {
		if (t = xi(t), xi(e) !== t && n) throw Error(a(425));
	}
	function Ci() {}
	var wi = null, Ti = null;
	function Ei(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Di = typeof setTimeout == "function" ? setTimeout : void 0, Oi = typeof clearTimeout == "function" ? clearTimeout : void 0, ki = typeof Promise == "function" ? Promise : void 0, Ai = typeof queueMicrotask == "function" ? queueMicrotask : ki === void 0 ? Di : function(e) {
		return ki.resolve(null).then(e).catch(ji);
	};
	function ji(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Mi(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$") {
					if (r === 0) {
						e.removeChild(i), mn(t);
						return;
					}
					r--;
				} else n !== "$" && n !== "$?" && n !== "$!" || r++;
			}
			n = i;
		} while (n);
		mn(t);
	}
	function Ni(e) {
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
	function Pi(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
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
	var Fi = Math.random().toString(36).slice(2), Ii = "__reactFiber$" + Fi, Li = "__reactProps$" + Fi, Ri = "__reactContainer$" + Fi, zi = "__reactEvents$" + Fi, Bi = "__reactListeners$" + Fi, Vi = "__reactHandles$" + Fi;
	function Hi(e) {
		var t = e[Ii];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[Ri] || n[Ii]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Pi(e); e !== null;) {
					if (n = e[Ii]) return n;
					e = Pi(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Ui(e) {
		return e = e[Ii] || e[Ri], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
	}
	function Wi(e) {
		if (e.tag === 5 || e.tag === 6) return e.stateNode;
		throw Error(a(33));
	}
	function Gi(e) {
		return e[Li] || null;
	}
	var Ki = [], qi = -1;
	function Ji(e) {
		return { current: e };
	}
	function B(e) {
		0 > qi || (e.current = Ki[qi], Ki[qi] = null, qi--);
	}
	function V(e, t) {
		qi++, Ki[qi] = e.current, e.current = t;
	}
	var Yi = {}, Xi = Ji(Yi), Zi = Ji(!1), Qi = Yi;
	function $i(e, t) {
		var n = e.type.contextTypes;
		if (!n) return Yi;
		var r = e.stateNode;
		if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
		var i = {}, a;
		for (a in n) i[a] = t[a];
		return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
	}
	function ea(e) {
		return e = e.childContextTypes, e != null;
	}
	function ta() {
		B(Zi), B(Xi);
	}
	function na(e, t, n) {
		if (Xi.current !== Yi) throw Error(a(168));
		V(Xi, t), V(Zi, n);
	}
	function ra(e, t, n) {
		var r = e.stateNode;
		if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
		for (var i in r = r.getChildContext(), r) if (!(i in t)) throw Error(a(108, ue(e) || "Unknown", i));
		return F({}, n, r);
	}
	function ia(e) {
		return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Yi, Qi = Xi.current, V(Xi, e), V(Zi, Zi.current), !0;
	}
	function aa(e, t, n) {
		var r = e.stateNode;
		if (!r) throw Error(a(169));
		n ? (e = ra(e, t, Qi), r.__reactInternalMemoizedMergedChildContext = e, B(Zi), B(Xi), V(Xi, e)) : B(Zi), V(Zi, n);
	}
	var oa = null, sa = !1, ca = !1;
	function la(e) {
		oa === null ? oa = [e] : oa.push(e);
	}
	function ua(e) {
		sa = !0, la(e);
	}
	function da() {
		if (!ca && oa !== null) {
			ca = !0;
			var e = 0, t = R;
			try {
				var n = oa;
				for (R = 1; e < n.length; e++) {
					var r = n[e];
					do
						r = r(!0);
					while (r !== null);
				}
				oa = null, sa = !1;
			} catch (t) {
				throw oa !== null && (oa = oa.slice(e + 1)), ht(bt, da), t;
			} finally {
				R = t, ca = !1;
			}
		}
		return null;
	}
	var fa = [], pa = 0, ma = null, ha = 0, ga = [], _a = 0, va = null, ya = 1, ba = "";
	function xa(e, t) {
		fa[pa++] = ha, fa[pa++] = ma, ma = e, ha = t;
	}
	function Sa(e, t, n) {
		ga[_a++] = ya, ga[_a++] = ba, ga[_a++] = va, va = e;
		var r = ya;
		e = ba;
		var i = 32 - Ot(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Ot(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, ya = 1 << 32 - Ot(t) + i | n << i | r, ba = a + e;
		} else ya = 1 << a | n << i | r, ba = e;
	}
	function Ca(e) {
		e.return !== null && (xa(e, 1), Sa(e, 1, 0));
	}
	function wa(e) {
		for (; e === ma;) ma = fa[--pa], fa[pa] = null, ha = fa[--pa], fa[pa] = null;
		for (; e === va;) va = ga[--_a], ga[_a] = null, ba = ga[--_a], ga[_a] = null, ya = ga[--_a], ga[_a] = null;
	}
	var Ta = null, Ea = null, H = !1, Da = null;
	function Oa(e, t) {
		var n = Kl(5, null, null, 0);
		n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
	}
	function ka(e, t) {
		switch (e.tag) {
			case 5:
				var n = e.type;
				return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null && (e.stateNode = t, Ta = e, Ea = Ni(t.firstChild), !0);
			case 6: return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null && (e.stateNode = t, Ta = e, Ea = null, !0);
			case 13: return t = t.nodeType === 8 ? t : null, t !== null && (n = va === null ? null : {
				id: ya,
				overflow: ba
			}, e.memoizedState = {
				dehydrated: t,
				treeContext: n,
				retryLane: 1073741824
			}, n = Kl(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ta = e, Ea = null, !0);
			default: return !1;
		}
	}
	function Aa(e) {
		return !!(e.mode & 1) && !(e.flags & 128);
	}
	function ja(e) {
		if (H) {
			var t = Ea;
			if (t) {
				var n = t;
				if (!ka(e, t)) {
					if (Aa(e)) throw Error(a(418));
					t = Ni(n.nextSibling);
					var r = Ta;
					t && ka(e, t) ? Oa(r, n) : (e.flags = e.flags & -4097 | 2, H = !1, Ta = e);
				}
			} else {
				if (Aa(e)) throw Error(a(418));
				e.flags = e.flags & -4097 | 2, H = !1, Ta = e;
			}
		}
	}
	function Ma(e) {
		for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
		Ta = e;
	}
	function Na(e) {
		if (e !== Ta) return !1;
		if (!H) return Ma(e), H = !0, !1;
		var t;
		if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ei(e.type, e.memoizedProps)), t &&= Ea) {
			if (Aa(e)) throw Pa(), Error(a(418));
			for (; t;) Oa(e, t), t = Ni(t.nextSibling);
		}
		if (Ma(e), e.tag === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(a(317));
			a: {
				for (e = e.nextSibling, t = 0; e;) {
					if (e.nodeType === 8) {
						var n = e.data;
						if (n === "/$") {
							if (t === 0) {
								Ea = Ni(e.nextSibling);
								break a;
							}
							t--;
						} else n !== "$" && n !== "$!" && n !== "$?" || t++;
					}
					e = e.nextSibling;
				}
				Ea = null;
			}
		} else Ea = Ta ? Ni(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Pa() {
		for (var e = Ea; e;) e = Ni(e.nextSibling);
	}
	function Fa() {
		Ea = Ta = null, H = !1;
	}
	function Ia(e) {
		Da === null ? Da = [e] : Da.push(e);
	}
	var La = C.ReactCurrentBatchConfig;
	function Ra(e, t, n) {
		if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
			if (n._owner) {
				if (n = n._owner, n) {
					if (n.tag !== 1) throw Error(a(309));
					var r = n.stateNode;
				}
				if (!r) throw Error(a(147, e));
				var i = r, o = "" + e;
				return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(e) {
					var t = i.refs;
					e === null ? delete t[o] : t[o] = e;
				}, t._stringRef = o, t);
			}
			if (typeof e != "string") throw Error(a(284));
			if (!n._owner) throw Error(a(290, e));
		}
		return e;
	}
	function za(e, t) {
		throw e = Object.prototype.toString.call(t), Error(a(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
	}
	function Ba(e) {
		var t = e._init;
		return t(e._payload);
	}
	function Va(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e, t) {
			for (e = /* @__PURE__ */ new Map(); t !== null;) t.key === null ? e.set(t.index, t) : e.set(t.key, t), t = t.sibling;
			return e;
		}
		function i(e, t) {
			return e = Yl(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 2, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 2), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = $l(n, e.mode, r), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var a = n.type;
			return a === E ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === a || typeof a == "object" && a && a.$$typeof === P && Ba(a) === t.type) ? (r = i(t, n.props), r.ref = Ra(e, t, n), r.return = e, r) : (r = Xl(n.type, n.key, n.props, null, e.mode, r), r.ref = Ra(e, t, n), r.return = e, r);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = eu(n, e.mode, r), t.return = e, t) : (t = i(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, a) {
			return t === null || t.tag !== 7 ? (t = Zl(n, e.mode, r, a), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number") return t = $l("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case w: return n = Xl(t.type, t.key, t.props, null, e.mode, n), n.ref = Ra(e, null, t), n.return = e, n;
					case T: return t = eu(t, e.mode, n), t.return = e, t;
					case P:
						var r = t._init;
						return f(e, r(t._payload), n);
				}
				if (Se(t) || re(t)) return t = Zl(t, e.mode, n, null), t.return = e, t;
				za(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case w: return n.key === i ? l(e, t, n, r) : null;
					case T: return n.key === i ? u(e, t, n, r) : null;
					case P: return i = n._init, p(e, t, i(n._payload), r);
				}
				if (Se(n) || re(n)) return i === null ? d(e, t, n, r, null) : null;
				za(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case w: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case T: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case P:
						var a = r._init;
						return m(e, t, n, a(r._payload), i);
				}
				if (Se(r) || re(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				za(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), H && xa(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return H && xa(i, h), l;
			}
			for (d = r(i, d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), H && xa(i, h), l;
		}
		function g(i, s, c, l) {
			var u = re(c);
			if (typeof u != "function") throw Error(a(150));
			if (c = u.call(c), c == null) throw Error(a(151));
			for (var d = u = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(i, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(i, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(i, h), H && xa(i, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(i, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return H && xa(i, g), u;
			}
			for (h = r(i, h); !v.done; g++, v = c.next()) v = m(h, i, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(i, e);
			}), H && xa(i, g), u;
		}
		function _(e, r, a, o) {
			if (typeof a == "object" && a && a.type === E && a.key === null && (a = a.props.children), typeof a == "object" && a) {
				switch (a.$$typeof) {
					case w:
						a: {
							for (var c = a.key, l = r; l !== null;) {
								if (l.key === c) {
									if (c = a.type, c === E) {
										if (l.tag === 7) {
											n(e, l.sibling), r = i(l, a.props.children), r.return = e, e = r;
											break a;
										}
									} else if (l.elementType === c || typeof c == "object" && c && c.$$typeof === P && Ba(c) === l.type) {
										n(e, l.sibling), r = i(l, a.props), r.ref = Ra(e, l, a), r.return = e, e = r;
										break a;
									}
									n(e, l);
									break;
								}
								t(e, l), l = l.sibling;
							}
							a.type === E ? (r = Zl(a.props.children, e.mode, o, a.key), r.return = e, e = r) : (o = Xl(a.type, a.key, a.props, null, e.mode, o), o.ref = Ra(e, r, a), o.return = e, e = o);
						}
						return s(e);
					case T:
						a: {
							for (l = a.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === a.containerInfo && r.stateNode.implementation === a.implementation) {
										n(e, r.sibling), r = i(r, a.children || []), r.return = e, e = r;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							r = eu(a, e.mode, o), r.return = e, e = r;
						}
						return s(e);
					case P: return l = a._init, _(e, r, l(a._payload), o);
				}
				if (Se(a)) return h(e, r, a, o);
				if (re(a)) return g(e, r, a, o);
				za(e, a);
			}
			return typeof a == "string" && a !== "" || typeof a == "number" ? (a = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), r = i(r, a), r.return = e, e = r) : (n(e, r), r = $l(a, e.mode, o), r.return = e, e = r), s(e)) : n(e, r);
		}
		return _;
	}
	var Ha = Va(!0), Ua = Va(!1), Wa = Ji(null), Ga = null, Ka = null, qa = null;
	function Ja() {
		qa = Ka = Ga = null;
	}
	function Ya(e) {
		var t = Wa.current;
		B(Wa), e._currentValue = t;
	}
	function Xa(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Za(e, t) {
		Ga = e, qa = Ka = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Ls = !0), e.firstContext = null);
	}
	function Qa(e) {
		var t = e._currentValue;
		if (qa !== e) {
			if (e = {
				context: e,
				memoizedValue: t,
				next: null
			}, Ka === null) {
				if (Ga === null) throw Error(a(308));
				Ka = e, Ga.dependencies = {
					lanes: 0,
					firstContext: e
				};
			} else Ka = Ka.next = e;
		}
		return t;
	}
	var $a = null;
	function eo(e) {
		$a === null ? $a = [e] : $a.push(e);
	}
	function to(e, t, n, r) {
		var i = t.interleaved;
		return i === null ? (n.next = n, eo(t)) : (n.next = i.next, i.next = n), t.interleaved = n, no(e, r);
	}
	function no(e, t) {
		e.lanes |= t;
		var n = e.alternate;
		for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
		return n.tag === 3 ? n.stateNode : null;
	}
	var ro = !1;
	function io(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				interleaved: null,
				lanes: 0
			},
			effects: null
		};
	}
	function ao(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			effects: e.effects
		});
	}
	function oo(e, t) {
		return {
			eventTime: e,
			lane: t,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function so(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Y & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, no(e, n);
		}
		return i = r.interleaved, i === null ? (t.next = t, eo(r)) : (t.next = i.next, i.next = t), r.interleaved = t, no(e, n);
	}
	function co(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194240)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Ut(e, n);
		}
	}
	function lo(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						eventTime: n.eventTime,
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: n.callback,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				effects: r.effects
			}, e.updateQueue = n;
		} else e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	function uo(e, t, n, r) {
		var i = e.updateQueue;
		ro = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane, p = s.eventTime;
				if ((r & f) === f) {
					u !== null && (u = u.next = {
						eventTime: p,
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: s.callback,
						next: null
					});
					a: {
						var m = e, h = s;
						switch (f = t, p = n, h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(p, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(p, d, f) : m, f == null) break a;
								d = F({}, d, f);
								break a;
							case 2: ro = !0;
						}
					}
					s.callback !== null && s.lane !== 0 && (e.flags |= 64, f = i.effects, f === null ? i.effects = [s] : f.push(s));
				} else p = {
					eventTime: p,
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					f = s, s = f.next, f.next = null, i.lastBaseUpdate = f, i.shared.pending = null;
				}
			} while (1);
			if (u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, t = i.shared.interleaved, t !== null) {
				i = t;
				do
					o |= i.lane, i = i.next;
				while (i !== t);
			} else a === null && (i.shared.lanes = 0);
			Yc |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function fo(e, t, n) {
		if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
			var r = e[t], i = r.callback;
			if (i !== null) {
				if (r.callback = null, r = n, typeof i != "function") throw Error(a(191, i));
				i.call(r);
			}
		}
	}
	var po = {}, mo = Ji(po), ho = Ji(po), go = Ji(po);
	function _o(e) {
		if (e === po) throw Error(a(174));
		return e;
	}
	function vo(e, t) {
		switch (V(go, t), V(ho, e), V(mo, po), e = t.nodeType, e) {
			case 9:
			case 11:
				t = (t = t.documentElement) ? t.namespaceURI : ke(null, "");
				break;
			default: e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ke(t, e);
		}
		B(mo), V(mo, t);
	}
	function yo() {
		B(mo), B(ho), B(go);
	}
	function bo(e) {
		_o(go.current);
		var t = _o(mo.current), n = ke(t, e.type);
		t !== n && (V(ho, e), V(mo, n));
	}
	function xo(e) {
		ho.current === e && (B(mo), B(ho));
	}
	var U = Ji(0);
	function So(e) {
		for (var t = e; t !== null;) {
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
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var Co = [];
	function wo() {
		for (var e = 0; e < Co.length; e++) Co[e]._workInProgressVersionPrimary = null;
		Co.length = 0;
	}
	var To = C.ReactCurrentDispatcher, Eo = C.ReactCurrentBatchConfig, Do = 0, W = null, G = null, K = null, Oo = !1, ko = !1, Ao = 0, jo = 0;
	function Mo() {
		throw Error(a(321));
	}
	function No(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Mr(e[n], t[n])) return !1;
		return !0;
	}
	function Po(e, t, n, r, i, o) {
		if (Do = o, W = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, To.current = e === null || e.memoizedState === null ? _s : vs, e = n(r, i), ko) {
			o = 0;
			do {
				if (ko = !1, Ao = 0, 25 <= o) throw Error(a(301));
				o += 1, K = G = null, t.updateQueue = null, To.current = ys, e = n(r, i);
			} while (ko);
		}
		if (To.current = gs, t = G !== null && G.next !== null, Do = 0, K = G = W = null, Oo = !1, t) throw Error(a(300));
		return e;
	}
	function Fo() {
		var e = Ao !== 0;
		return Ao = 0, e;
	}
	function Io() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return K === null ? W.memoizedState = K = e : K = K.next = e, K;
	}
	function Lo() {
		if (G === null) {
			var e = W.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = G.next;
		var t = K === null ? W.memoizedState : K.next;
		if (t !== null) K = t, G = e;
		else {
			if (e === null) throw Error(a(310));
			G = e, e = {
				memoizedState: G.memoizedState,
				baseState: G.baseState,
				baseQueue: G.baseQueue,
				queue: G.queue,
				next: null
			}, K === null ? W.memoizedState = K = e : K = K.next = e;
		}
		return K;
	}
	function Ro(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function zo(e) {
		var t = Lo(), n = t.queue;
		if (n === null) throw Error(a(311));
		n.lastRenderedReducer = e;
		var r = G, i = r.baseQueue, o = n.pending;
		if (o !== null) {
			if (i !== null) {
				var s = i.next;
				i.next = o.next, o.next = s;
			}
			r.baseQueue = i = o, n.pending = null;
		}
		if (i !== null) {
			o = i.next, r = r.baseState;
			var c = s = null, l = null, u = o;
			do {
				var d = u.lane;
				if ((Do & d) === d) l !== null && (l = l.next = {
					lane: 0,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}), r = u.hasEagerState ? u.eagerState : e(r, u.action);
				else {
					var f = {
						lane: d,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					};
					l === null ? (c = l = f, s = r) : l = l.next = f, W.lanes |= d, Yc |= d;
				}
				u = u.next;
			} while (u !== null && u !== o);
			l === null ? s = r : l.next = c, Mr(r, t.memoizedState) || (Ls = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = l, n.lastRenderedState = r;
		}
		if (e = n.interleaved, e !== null) {
			i = e;
			do
				o = i.lane, W.lanes |= o, Yc |= o, i = i.next;
			while (i !== e);
		} else i === null && (n.lanes = 0);
		return [t.memoizedState, n.dispatch];
	}
	function Bo(e) {
		var t = Lo(), n = t.queue;
		if (n === null) throw Error(a(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, i = n.pending, o = t.memoizedState;
		if (i !== null) {
			n.pending = null;
			var s = i = i.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== i);
			Mr(o, t.memoizedState) || (Ls = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Vo() {}
	function Ho(e, t) {
		var n = W, r = Lo(), i = t(), o = !Mr(r.memoizedState, i);
		if (o && (r.memoizedState = i, Ls = !0), r = r.queue, es(Go.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || K !== null && K.memoizedState.tag & 1) {
			if (n.flags |= 2048, Yo(9, Wo.bind(null, n, r, i, t), void 0, null), X === null) throw Error(a(349));
			Do & 30 || Uo(n, t, i);
		}
		return i;
	}
	function Uo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = W.updateQueue, t === null ? (t = {
			lastEffect: null,
			stores: null
		}, W.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Wo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Ko(t) && qo(e);
	}
	function Go(e, t, n) {
		return n(function() {
			Ko(t) && qo(e);
		});
	}
	function Ko(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Mr(e, n);
		} catch {
			return !0;
		}
	}
	function qo(e) {
		var t = no(e, 1);
		t !== null && hl(t, e, 1, -1);
	}
	function Jo(e) {
		var t = Io();
		return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
			pending: null,
			interleaved: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ro,
			lastRenderedState: e
		}, t.queue = e, e = e.dispatch = fs.bind(null, W, e), [t.memoizedState, e];
	}
	function Yo(e, t, n, r) {
		return e = {
			tag: e,
			create: t,
			destroy: n,
			deps: r,
			next: null
		}, t = W.updateQueue, t === null ? (t = {
			lastEffect: null,
			stores: null
		}, W.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
	}
	function Xo() {
		return Lo().memoizedState;
	}
	function Zo(e, t, n, r) {
		var i = Io();
		W.flags |= e, i.memoizedState = Yo(1 | t, n, void 0, r === void 0 ? null : r);
	}
	function Qo(e, t, n, r) {
		var i = Lo();
		r = r === void 0 ? null : r;
		var a = void 0;
		if (G !== null) {
			var o = G.memoizedState;
			if (a = o.destroy, r !== null && No(r, o.deps)) {
				i.memoizedState = Yo(t, n, a, r);
				return;
			}
		}
		W.flags |= e, i.memoizedState = Yo(1 | t, n, a, r);
	}
	function $o(e, t) {
		return Zo(8390656, 8, e, t);
	}
	function es(e, t) {
		return Qo(2048, 8, e, t);
	}
	function ts(e, t) {
		return Qo(4, 2, e, t);
	}
	function ns(e, t) {
		return Qo(4, 4, e, t);
	}
	function rs(e, t) {
		if (typeof t == "function") return e = e(), t(e), function() {
			t(null);
		};
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function is(e, t, n) {
		return n = n == null ? null : n.concat([e]), Qo(4, 4, rs.bind(null, t, e), n);
	}
	function as() {}
	function os(e, t) {
		var n = Lo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return r !== null && t !== null && No(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ss(e, t) {
		var n = Lo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return r !== null && t !== null && No(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
	}
	function cs(e, t, n) {
		return Do & 21 ? (Mr(n, t) || (n = zt(), W.lanes |= n, Yc |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ls = !0), e.memoizedState = n);
	}
	function ls(e, t) {
		var n = R;
		R = n !== 0 && 4 > n ? n : 4, e(!0);
		var r = Eo.transition;
		Eo.transition = {};
		try {
			e(!1), t();
		} finally {
			R = n, Eo.transition = r;
		}
	}
	function us() {
		return Lo().memoizedState;
	}
	function ds(e, t, n) {
		var r = ml(e);
		if (n = {
			lane: r,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ps(e)) ms(t, n);
		else if (n = to(e, t, n, r), n !== null) {
			var i = pl();
			hl(n, e, r, i), hs(n, t, r);
		}
	}
	function fs(e, t, n) {
		var r = ml(e), i = {
			lane: r,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (ps(e)) ms(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Mr(s, o)) {
					var c = t.interleaved;
					c === null ? (i.next = i, eo(t)) : (i.next = c.next, c.next = i), t.interleaved = i;
					return;
				}
			} catch {}
			n = to(e, t, i, r), n !== null && (i = pl(), hl(n, e, r, i), hs(n, t, r));
		}
	}
	function ps(e) {
		var t = e.alternate;
		return e === W || t !== null && t === W;
	}
	function ms(e, t) {
		ko = Oo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function hs(e, t, n) {
		if (n & 4194240) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Ut(e, n);
		}
	}
	var gs = {
		readContext: Qa,
		useCallback: Mo,
		useContext: Mo,
		useEffect: Mo,
		useImperativeHandle: Mo,
		useInsertionEffect: Mo,
		useLayoutEffect: Mo,
		useMemo: Mo,
		useReducer: Mo,
		useRef: Mo,
		useState: Mo,
		useDebugValue: Mo,
		useDeferredValue: Mo,
		useTransition: Mo,
		useMutableSource: Mo,
		useSyncExternalStore: Mo,
		useId: Mo,
		unstable_isNewReconciler: !1
	}, _s = {
		readContext: Qa,
		useCallback: function(e, t) {
			return Io().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Qa,
		useEffect: $o,
		useImperativeHandle: function(e, t, n) {
			return n = n == null ? null : n.concat([e]), Zo(4194308, 4, rs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Zo(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			return Zo(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Io();
			return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
		},
		useReducer: function(e, t, n) {
			var r = Io();
			return t = n === void 0 ? t : n(t), r.memoizedState = r.baseState = t, e = {
				pending: null,
				interleaved: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: t
			}, r.queue = e, e = e.dispatch = ds.bind(null, W, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Io();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: Jo,
		useDebugValue: as,
		useDeferredValue: function(e) {
			return Io().memoizedState = e;
		},
		useTransition: function() {
			var e = Jo(!1), t = e[0];
			return e = ls.bind(null, e[1]), Io().memoizedState = e, [t, e];
		},
		useMutableSource: function() {},
		useSyncExternalStore: function(e, t, n) {
			var r = W, i = Io();
			if (H) {
				if (n === void 0) throw Error(a(407));
				n = n();
			} else {
				if (n = t(), X === null) throw Error(a(349));
				Do & 30 || Uo(r, t, n);
			}
			i.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return i.queue = o, $o(Go.bind(null, r, o, e), [e]), r.flags |= 2048, Yo(9, Wo.bind(null, r, o, n, t), void 0, null), n;
		},
		useId: function() {
			var e = Io(), t = X.identifierPrefix;
			if (H) {
				var n = ba, r = ya;
				n = (r & ~(1 << 32 - Ot(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Ao++, 0 < n && (t += "H" + n.toString(32)), t += ":";
			} else n = jo++, t = ":" + t + "r" + n.toString(32) + ":";
			return e.memoizedState = t;
		},
		unstable_isNewReconciler: !1
	}, vs = {
		readContext: Qa,
		useCallback: os,
		useContext: Qa,
		useEffect: es,
		useImperativeHandle: is,
		useInsertionEffect: ts,
		useLayoutEffect: ns,
		useMemo: ss,
		useReducer: zo,
		useRef: Xo,
		useState: function() {
			return zo(Ro);
		},
		useDebugValue: as,
		useDeferredValue: function(e) {
			return cs(Lo(), G.memoizedState, e);
		},
		useTransition: function() {
			return [zo(Ro)[0], Lo().memoizedState];
		},
		useMutableSource: Vo,
		useSyncExternalStore: Ho,
		useId: us,
		unstable_isNewReconciler: !1
	}, ys = {
		readContext: Qa,
		useCallback: os,
		useContext: Qa,
		useEffect: es,
		useImperativeHandle: is,
		useInsertionEffect: ts,
		useLayoutEffect: ns,
		useMemo: ss,
		useReducer: Bo,
		useRef: Xo,
		useState: function() {
			return Bo(Ro);
		},
		useDebugValue: as,
		useDeferredValue: function(e) {
			var t = Lo();
			return G === null ? t.memoizedState = e : cs(t, G.memoizedState, e);
		},
		useTransition: function() {
			return [Bo(Ro)[0], Lo().memoizedState];
		},
		useMutableSource: Vo,
		useSyncExternalStore: Ho,
		useId: us,
		unstable_isNewReconciler: !1
	};
	function bs(e, t) {
		if (e && e.defaultProps) {
			for (var n in t = F({}, t), e = e.defaultProps, e) t[n] === void 0 && (t[n] = e[n]);
			return t;
		}
		return t;
	}
	function xs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : F({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ss = {
		isMounted: function(e) {
			return (e = e._reactInternals) ? lt(e) === e : !1;
		},
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pl(), i = ml(e), a = oo(r, i);
			a.payload = t, n != null && (a.callback = n), t = so(e, a, i), t !== null && (hl(t, e, i, r), co(t, e, i));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pl(), i = ml(e), a = oo(r, i);
			a.tag = 1, a.payload = t, n != null && (a.callback = n), t = so(e, a, i), t !== null && (hl(t, e, i, r), co(t, e, i));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pl(), r = ml(e), i = oo(n, r);
			i.tag = 2, t != null && (i.callback = t), t = so(e, i, r), t !== null && (hl(t, e, r, n), co(t, e, r));
		}
	};
	function Cs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Nr(n, r) || !Nr(i, a) : !0;
	}
	function ws(e, t, n) {
		var r = !1, i = Yi, a = t.contextType;
		return typeof a == "object" && a ? a = Qa(a) : (i = ea(t) ? Qi : Xi.current, r = t.contextTypes, a = (r = r != null) ? $i(e, i) : Yi), t = new t(n, a), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Ss, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = a), t;
	}
	function Ts(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ss.enqueueReplaceState(t, t.state, null);
	}
	function Es(e, t, n, r) {
		var i = e.stateNode;
		i.props = n, i.state = e.memoizedState, i.refs = {}, io(e);
		var a = t.contextType;
		typeof a == "object" && a ? i.context = Qa(a) : (a = ea(t) ? Qi : Xi.current, i.context = $i(e, a)), i.state = e.memoizedState, a = t.getDerivedStateFromProps, typeof a == "function" && (xs(e, t, a, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && Ss.enqueueReplaceState(i, i.state, null), uo(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
	}
	function Ds(e, t) {
		try {
			var n = "", r = t;
			do
				n += ce(r), r = r.return;
			while (r);
			var i = n;
		} catch (e) {
			i = "\nError generating stack: " + e.message + "\n" + e.stack;
		}
		return {
			value: e,
			source: t,
			stack: i,
			digest: null
		};
	}
	function Os(e, t, n) {
		return {
			value: e,
			source: null,
			stack: n ?? null,
			digest: t ?? null
		};
	}
	function ks(e, t) {
		try {
			console.error(t.value);
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	var As = typeof WeakMap == "function" ? WeakMap : Map;
	function js(e, t, n) {
		n = oo(-1, n), n.tag = 3, n.payload = { element: null };
		var r = t.value;
		return n.callback = function() {
			rl || (rl = !0, il = r), ks(e, t);
		}, n;
	}
	function Ms(e, t, n) {
		n = oo(-1, n), n.tag = 3;
		var r = e.type.getDerivedStateFromError;
		if (typeof r == "function") {
			var i = t.value;
			n.payload = function() {
				return r(i);
			}, n.callback = function() {
				ks(e, t);
			};
		}
		var a = e.stateNode;
		return a !== null && typeof a.componentDidCatch == "function" && (n.callback = function() {
			ks(e, t), typeof r != "function" && (al === null ? al = /* @__PURE__ */ new Set([this]) : al.add(this));
			var n = t.stack;
			this.componentDidCatch(t.value, { componentStack: n === null ? "" : n });
		}), n;
	}
	function Ns(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new As();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (i.add(n), e = zl.bind(null, e, t, n), t.then(e, e));
	}
	function Ps(e) {
		do {
			var t;
			if ((t = e.tag === 13) && (t = e.memoizedState, t = t === null || t.dehydrated !== null), t) return e;
			e = e.return;
		} while (e !== null);
		return null;
	}
	function Fs(e, t, n, r, i) {
		return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = oo(-1, 1), t.tag = 2, so(n, t, 1))), n.lanes |= 1), e);
	}
	var Is = C.ReactCurrentOwner, Ls = !1;
	function Rs(e, t, n, r) {
		t.child = e === null ? Ua(t, null, n, r) : Ha(t, e.child, n, r);
	}
	function zs(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		return Za(t, i), r = Po(e, t, n, r, a, i), n = Fo(), e !== null && !Ls ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, ac(e, t, i)) : (H && n && Ca(t), t.flags |= 1, Rs(e, t, r, i), t.child);
	}
	function Bs(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !ql(a) && a.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = a, Vs(e, t, a, r, i)) : (e = Xl(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, (e.lanes & i) === 0) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Nr : n, n(o, r) && e.ref === t.ref) return ac(e, t, i);
		}
		return t.flags |= 1, e = Yl(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Vs(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Nr(a, r) && e.ref === t.ref) {
				if (Ls = !1, t.pendingProps = r = a, (e.lanes & i) !== 0) e.flags & 131072 && (Ls = !0);
				else return t.lanes = e.lanes, ac(e, t, i);
			}
		}
		return Ws(e, t, n, r, i);
	}
	function Hs(e, t, n) {
		var r = t.pendingProps, i = r.children, a = e === null ? null : e.memoizedState;
		if (r.mode === "hidden") {
			if (!(t.mode & 1)) t.memoizedState = {
				baseLanes: 0,
				cachePool: null,
				transitions: null
			}, V(qc, Kc), Kc |= n;
			else {
				if (!(n & 1073741824)) return e = a === null ? n : a.baseLanes | n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
					baseLanes: e,
					cachePool: null,
					transitions: null
				}, t.updateQueue = null, V(qc, Kc), Kc |= e, null;
				t.memoizedState = {
					baseLanes: 0,
					cachePool: null,
					transitions: null
				}, r = a === null ? n : a.baseLanes, V(qc, Kc), Kc |= r;
			}
		} else a === null ? r = n : (r = a.baseLanes | n, t.memoizedState = null), V(qc, Kc), Kc |= r;
		return Rs(e, t, i, n), t.child;
	}
	function Us(e, t) {
		var n = t.ref;
		(e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
	}
	function Ws(e, t, n, r, i) {
		var a = ea(n) ? Qi : Xi.current;
		return a = $i(t, a), Za(t, i), n = Po(e, t, n, r, a, i), r = Fo(), e !== null && !Ls ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, ac(e, t, i)) : (H && r && Ca(t), t.flags |= 1, Rs(e, t, n, i), t.child);
	}
	function Gs(e, t, n, r, i) {
		if (ea(n)) {
			var a = !0;
			ia(t);
		} else a = !1;
		if (Za(t, i), t.stateNode === null) ic(e, t), ws(t, n, r), Es(t, n, r, i), r = !0;
		else if (e === null) {
			var o = t.stateNode, s = t.memoizedProps;
			o.props = s;
			var c = o.context, l = n.contextType;
			typeof l == "object" && l ? l = Qa(l) : (l = ea(n) ? Qi : Xi.current, l = $i(t, l));
			var u = n.getDerivedStateFromProps, d = typeof u == "function" || typeof o.getSnapshotBeforeUpdate == "function";
			d || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== r || c !== l) && Ts(t, o, r, l), ro = !1;
			var f = t.memoizedState;
			o.state = f, uo(t, r, o, i), c = t.memoizedState, s !== r || f !== c || Zi.current || ro ? (typeof u == "function" && (xs(t, n, u, r), c = t.memoizedState), (s = ro || Cs(t, n, s, r, f, c, l)) ? (d || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), o.props = r, o.state = c, o.context = l, r = s) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			o = t.stateNode, ao(e, t), s = t.memoizedProps, l = t.type === t.elementType ? s : bs(t.type, s), o.props = l, d = t.pendingProps, f = o.context, c = n.contextType, typeof c == "object" && c ? c = Qa(c) : (c = ea(n) ? Qi : Xi.current, c = $i(t, c));
			var p = n.getDerivedStateFromProps;
			(u = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== d || f !== c) && Ts(t, o, r, c), ro = !1, f = t.memoizedState, o.state = f, uo(t, r, o, i);
			var m = t.memoizedState;
			s !== d || f !== m || Zi.current || ro ? (typeof p == "function" && (xs(t, n, p, r), m = t.memoizedState), (l = ro || Cs(t, n, l, r, f, m, c) || !1) ? (u || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, m, c), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, m, c)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), o.props = r, o.state = m, o.context = c, r = l) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return Ks(e, t, n, r, a, i);
	}
	function Ks(e, t, n, r, i, a) {
		Us(e, t);
		var o = !!(t.flags & 128);
		if (!r && !o) return i && aa(t, n, !1), ac(e, t, a);
		r = t.stateNode, Is.current = t;
		var s = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
		return t.flags |= 1, e !== null && o ? (t.child = Ha(t, e.child, null, a), t.child = Ha(t, null, s, a)) : Rs(e, t, s, a), t.memoizedState = r.state, i && aa(t, n, !0), t.child;
	}
	function qs(e) {
		var t = e.stateNode;
		t.pendingContext ? na(e, t.pendingContext, t.pendingContext !== t.context) : t.context && na(e, t.context, !1), vo(e, t.containerInfo);
	}
	function Js(e, t, n, r, i) {
		return Fa(), Ia(i), t.flags |= 256, Rs(e, t, n, r), t.child;
	}
	var Ys = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0
	};
	function Xs(e) {
		return {
			baseLanes: e,
			cachePool: null,
			transitions: null
		};
	}
	function Zs(e, t, n) {
		var r = t.pendingProps, i = U.current, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(i & 2)), s ? (a = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), V(U, i & 1), e === null) return ja(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.lanes = t.mode & 1 ? e.data === "$!" ? 8 : 1073741824 : 1, null) : (o = r.children, e = r.fallback, a ? (r = t.mode, a = t.child, o = {
			mode: "hidden",
			children: o
		}, !(r & 1) && a !== null ? (a.childLanes = 0, a.pendingProps = o) : a = Ql(o, r, 0, null), e = Zl(e, r, n, null), a.return = t, e.return = t, a.sibling = e, t.child = a, t.child.memoizedState = Xs(n), t.memoizedState = Ys, e) : Qs(t, o));
		if (i = e.memoizedState, i !== null && (s = i.dehydrated, s !== null)) return ec(e, t, o, r, s, i, n);
		if (a) {
			a = r.fallback, o = t.mode, i = e.child, s = i.sibling;
			var c = {
				mode: "hidden",
				children: r.children
			};
			return !(o & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = Yl(i, c), r.subtreeFlags = i.subtreeFlags & 14680064), s === null ? (a = Zl(a, o, n, null), a.flags |= 2) : a = Yl(s, a), a.return = t, r.return = t, r.sibling = a, t.child = r, r = a, a = t.child, o = e.child.memoizedState, o = o === null ? Xs(n) : {
				baseLanes: o.baseLanes | n,
				cachePool: null,
				transitions: o.transitions
			}, a.memoizedState = o, a.childLanes = e.childLanes & ~n, t.memoizedState = Ys, r;
		}
		return a = e.child, e = a.sibling, r = Yl(a, {
			mode: "visible",
			children: r.children
		}), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
	}
	function Qs(e, t) {
		return t = Ql({
			mode: "visible",
			children: t
		}, e.mode, 0, null), t.return = e, e.child = t;
	}
	function $s(e, t, n, r) {
		return r !== null && Ia(r), Ha(t, e.child, null, n), e = Qs(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function ec(e, t, n, r, i, o, s) {
		if (n) return t.flags & 256 ? (t.flags &= -257, r = Os(Error(a(422))), $s(e, t, s, r)) : t.memoizedState === null ? (o = r.fallback, i = t.mode, r = Ql({
			mode: "visible",
			children: r.children
		}, i, 0, null), o = Zl(o, i, s, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Ha(t, e.child, null, s), t.child.memoizedState = Xs(s), t.memoizedState = Ys, o) : (t.child = e.child, t.flags |= 128, null);
		if (!(t.mode & 1)) return $s(e, t, s, null);
		if (i.data === "$!") {
			if (r = i.nextSibling && i.nextSibling.dataset, r) var c = r.dgst;
			return r = c, o = Error(a(419)), r = Os(o, r, void 0), $s(e, t, s, r);
		}
		if (c = (s & e.childLanes) !== 0, Ls || c) {
			if (r = X, r !== null) {
				switch (s & -s) {
					case 4:
						i = 2;
						break;
					case 16:
						i = 8;
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
						i = 32;
						break;
					case 536870912:
						i = 268435456;
						break;
					default: i = 0;
				}
				i = (i & (r.suspendedLanes | s)) === 0 ? i : 0, i !== 0 && i !== o.retryLane && (o.retryLane = i, no(e, i), hl(r, e, i, -1));
			}
			return kl(), r = Os(Error(a(421))), $s(e, t, s, r);
		}
		return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Vl.bind(null, e), i._reactRetry = t, null) : (e = o.treeContext, Ea = Ni(i.nextSibling), Ta = t, H = !0, Da = null, e !== null && (ga[_a++] = ya, ga[_a++] = ba, ga[_a++] = va, ya = e.id, ba = e.overflow, va = t), t = Qs(t, r.children), t.flags |= 4096, t);
	}
	function tc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Xa(e.return, t, n);
	}
	function nc(e, t, n, r, i) {
		var a = e.memoizedState;
		a === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i
		} : (a.isBackwards = t, a.rendering = null, a.renderingStartTime = 0, a.last = r, a.tail = n, a.tailMode = i);
	}
	function rc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		if (Rs(e, t, r.children, n), r = U.current, r & 2) r = r & 1 | 2, t.flags |= 128;
		else {
			if (e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && tc(e, n, t);
				else if (e.tag === 19) tc(e, n, t);
				else if (e.child !== null) {
					e.child.return = e, e = e.child;
					continue;
				}
				if (e === t) break a;
				for (; e.sibling === null;) {
					if (e.return === null || e.return === t) break a;
					e = e.return;
				}
				e.sibling.return = e.return, e = e.sibling;
			}
			r &= 1;
		}
		if (V(U, r), !(t.mode & 1)) t.memoizedState = null;
		else switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && So(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), nc(t, !1, i, n, a);
				break;
			case "backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && So(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				nc(t, !0, n, null, a);
				break;
			case "together":
				nc(t, !1, null, null, void 0);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function ic(e, t) {
		!(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
	}
	function ac(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Yc |= t.lanes, (n & t.childLanes) === 0) return null;
		if (e !== null && t.child !== e.child) throw Error(a(153));
		if (t.child !== null) {
			for (e = t.child, n = Yl(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Yl(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function oc(e, t, n) {
		switch (t.tag) {
			case 3:
				qs(t), Fa();
				break;
			case 5:
				bo(t);
				break;
			case 1:
				ea(t.type) && ia(t);
				break;
			case 4:
				vo(t, t.stateNode.containerInfo);
				break;
			case 10:
				var r = t.type._context, i = t.memoizedProps.value;
				V(Wa, r._currentValue), r._currentValue = i;
				break;
			case 13:
				if (r = t.memoizedState, r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (V(U, U.current & 1), e = ac(e, t, n), e === null ? null : e.sibling) : Zs(e, t, n) : (V(U, U.current & 1), t.flags |= 128, null);
				V(U, U.current & 1);
				break;
			case 19:
				if (r = (n & t.childLanes) !== 0, e.flags & 128) {
					if (r) return rc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), V(U, U.current), r) break;
				return null;
			case 22:
			case 23: return t.lanes = 0, Hs(e, t, n);
		}
		return ac(e, t, n);
	}
	var sc = function(e, t) {
		for (var n = t.child; n !== null;) {
			if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
			else if (n.tag !== 4 && n.child !== null) {
				n.child.return = n, n = n.child;
				continue;
			}
			if (n === t) break;
			for (; n.sibling === null;) {
				if (n.return === null || n.return === t) return;
				n = n.return;
			}
			n.sibling.return = n.return, n = n.sibling;
		}
	}, cc = function(e, t, n, r) {
		var i = e.memoizedProps;
		if (i !== r) {
			e = t.stateNode, _o(mo.current);
			var a = null;
			switch (n) {
				case "input":
					i = ge(e, i), r = ge(e, r), a = [];
					break;
				case "select":
					i = F({}, i, { value: void 0 }), r = F({}, r, { value: void 0 }), a = [];
					break;
				case "textarea":
					i = we(e, i), r = we(e, r), a = [];
					break;
				default: typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Ci);
			}
			Re(n, r);
			var o;
			for (u in n = null, i) if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null) {
				if (u === "style") {
					var c = i[u];
					for (o in c) c.hasOwnProperty(o) && (n ||= {}, n[o] = "");
				} else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (s.hasOwnProperty(u) ? a ||= [] : (a ||= []).push(u, null));
			}
			for (u in r) {
				var l = r[u];
				if (c = i?.[u], r.hasOwnProperty(u) && l !== c && (l != null || c != null)) {
					if (u === "style") {
						if (c) {
							for (o in c) !c.hasOwnProperty(o) || l && l.hasOwnProperty(o) || (n ||= {}, n[o] = "");
							for (o in l) l.hasOwnProperty(o) && c[o] !== l[o] && (n ||= {}, n[o] = l[o]);
						} else n || (a ||= [], a.push(u, n)), n = l;
					} else u === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, c = c ? c.__html : void 0, l != null && c !== l && (a ||= []).push(u, l)) : u === "children" ? typeof l != "string" && typeof l != "number" || (a ||= []).push(u, "" + l) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (s.hasOwnProperty(u) ? (l != null && u === "onScroll" && z("scroll", e), a || c === l || (a = [])) : (a ||= []).push(u, l));
				}
			}
			n && (a ||= []).push("style", n);
			var u = a;
			(t.updateQueue = u) && (t.flags |= 4);
		}
	}, lc = function(e, t, n, r) {
		n !== r && (t.flags |= 4);
	};
	function uc(e, t) {
		if (!H) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function dc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function fc(e, t, n) {
		var r = t.pendingProps;
		switch (wa(t), t.tag) {
			case 2:
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return dc(t), null;
			case 1: return ea(t.type) && ta(), dc(t), null;
			case 3: return r = t.stateNode, yo(), B(Zi), B(Xi), wo(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Na(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Da !== null && (yl(Da), Da = null))), dc(t), null;
			case 5:
				xo(t);
				var i = _o(go.current);
				if (n = t.type, e !== null && t.stateNode != null) cc(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(a(166));
						return dc(t), null;
					}
					if (e = _o(mo.current), Na(t)) {
						r = t.stateNode, n = t.type;
						var o = t.memoizedProps;
						switch (r[Ii] = t, r[Li] = o, e = !!(t.mode & 1), n) {
							case "dialog":
								z("cancel", r), z("close", r);
								break;
							case "iframe":
							case "object":
							case "embed":
								z("load", r);
								break;
							case "video":
							case "audio":
								for (i = 0; i < oi.length; i++) z(oi[i], r);
								break;
							case "source":
								z("error", r);
								break;
							case "img":
							case "image":
							case "link":
								z("error", r), z("load", r);
								break;
							case "details":
								z("toggle", r);
								break;
							case "input":
								_e(r, o), z("invalid", r);
								break;
							case "select":
								r._wrapperState = { wasMultiple: !!o.multiple }, z("invalid", r);
								break;
							case "textarea": Te(r, o), z("invalid", r);
						}
						for (var c in Re(n, o), i = null, o) if (o.hasOwnProperty(c)) {
							var l = o[c];
							c === "children" ? typeof l == "string" ? r.textContent !== l && (!0 !== o.suppressHydrationWarning && Si(r.textContent, l, e), i = ["children", l]) : typeof l == "number" && r.textContent !== "" + l && (!0 !== o.suppressHydrationWarning && Si(r.textContent, l, e), i = ["children", "" + l]) : s.hasOwnProperty(c) && l != null && c === "onScroll" && z("scroll", r);
						}
						switch (n) {
							case "input":
								me(r), be(r, o, !0);
								break;
							case "textarea":
								me(r), De(r);
								break;
							case "select":
							case "option": break;
							default: typeof o.onClick == "function" && (r.onclick = Ci);
						}
						r = i, t.updateQueue = r, r !== null && (t.flags |= 4);
					} else {
						c = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Oe(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = c.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = c.createElement(n, { is: r.is }) : (e = c.createElement(n), n === "select" && (c = e, r.multiple ? c.multiple = !0 : r.size && (c.size = r.size))) : e = c.createElementNS(e, n), e[Ii] = t, e[Li] = r, sc(e, t, !1, !1), t.stateNode = e;
						a: {
							switch (c = ze(n, r), n) {
								case "dialog":
									z("cancel", e), z("close", e), i = r;
									break;
								case "iframe":
								case "object":
								case "embed":
									z("load", e), i = r;
									break;
								case "video":
								case "audio":
									for (i = 0; i < oi.length; i++) z(oi[i], e);
									i = r;
									break;
								case "source":
									z("error", e), i = r;
									break;
								case "img":
								case "image":
								case "link":
									z("error", e), z("load", e), i = r;
									break;
								case "details":
									z("toggle", e), i = r;
									break;
								case "input":
									_e(e, r), i = ge(e, r), z("invalid", e);
									break;
								case "option":
									i = r;
									break;
								case "select":
									e._wrapperState = { wasMultiple: !!r.multiple }, i = F({}, r, { value: void 0 }), z("invalid", e);
									break;
								case "textarea":
									Te(e, r), i = we(e, r), z("invalid", e);
									break;
								default: i = r;
							}
							for (o in Re(n, i), l = i, l) if (l.hasOwnProperty(o)) {
								var u = l[o];
								o === "style" ? Ie(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && je(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Me(e, u) : typeof u == "number" && Me(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (s.hasOwnProperty(o) ? u != null && o === "onScroll" && z("scroll", e) : u != null && S(e, o, u, c));
							}
							switch (n) {
								case "input":
									me(e), be(e, r, !1);
									break;
								case "textarea":
									me(e), De(e);
									break;
								case "option":
									r.value != null && e.setAttribute("value", "" + de(r.value));
									break;
								case "select":
									e.multiple = !!r.multiple, o = r.value, o == null ? r.defaultValue != null && Ce(e, !!r.multiple, r.defaultValue, !0) : Ce(e, !!r.multiple, o, !1);
									break;
								default: typeof i.onClick == "function" && (e.onclick = Ci);
							}
							switch (n) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									r = !!r.autoFocus;
									break a;
								case "img":
									r = !0;
									break a;
								default: r = !1;
							}
						}
						r && (t.flags |= 4);
					}
					t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
				}
				return dc(t), null;
			case 6:
				if (e && t.stateNode != null) lc(e, t, e.memoizedProps, r);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(a(166));
					if (n = _o(go.current), _o(mo.current), Na(t)) {
						if (r = t.stateNode, n = t.memoizedProps, r[Ii] = t, (o = r.nodeValue !== n) && (e = Ta, e !== null)) switch (e.tag) {
							case 3:
								Si(r.nodeValue, n, !!(e.mode & 1));
								break;
							case 5: !0 !== e.memoizedProps.suppressHydrationWarning && Si(r.nodeValue, n, !!(e.mode & 1));
						}
						o && (t.flags |= 4);
					} else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ii] = t, t.stateNode = r;
				}
				return dc(t), null;
			case 13:
				if (B(U), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (H && Ea !== null && t.mode & 1 && !(t.flags & 128)) Pa(), Fa(), t.flags |= 98560, o = !1;
					else if (o = Na(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!o) throw Error(a(318));
							if (o = t.memoizedState, o = o === null ? null : o.dehydrated, !o) throw Error(a(317));
							o[Ii] = t;
						} else Fa(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						dc(t), o = !1;
					} else Da !== null && (yl(Da), Da = null), o = !0;
					if (!o) return t.flags & 65536 ? t : null;
				}
				return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || U.current & 1 ? Q === 0 && (Q = 3) : kl())), t.updateQueue !== null && (t.flags |= 4), dc(t), null);
			case 4: return yo(), e === null && fi(t.stateNode.containerInfo), dc(t), null;
			case 10: return Ya(t.type._context), dc(t), null;
			case 17: return ea(t.type) && ta(), dc(t), null;
			case 19:
				if (B(U), o = t.memoizedState, o === null) return dc(t), null;
				if (r = !!(t.flags & 128), c = o.rendering, c === null) {
					if (r) uc(o, !1);
					else {
						if (Q !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (c = So(e), c !== null) {
								for (t.flags |= 128, uc(o, !1), r = c.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null;) o = n, e = r, o.flags &= 14680066, c = o.alternate, c === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = c.childLanes, o.lanes = c.lanes, o.child = c.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = c.memoizedProps, o.memoizedState = c.memoizedState, o.updateQueue = c.updateQueue, o.type = c.type, e = c.dependencies, o.dependencies = e === null ? null : {
									lanes: e.lanes,
									firstContext: e.firstContext
								}), n = n.sibling;
								return V(U, U.current & 1 | 2), t.child;
							}
							e = e.sibling;
						}
						o.tail !== null && L() > tl && (t.flags |= 128, r = !0, uc(o, !1), t.lanes = 4194304);
					}
				} else {
					if (!r) {
						if (e = So(c), e !== null) {
							if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), uc(o, !0), o.tail === null && o.tailMode === "hidden" && !c.alternate && !H) return dc(t), null;
						} else 2 * L() - o.renderingStartTime > tl && n !== 1073741824 && (t.flags |= 128, r = !0, uc(o, !1), t.lanes = 4194304);
					}
					o.isBackwards ? (c.sibling = t.child, t.child = c) : (n = o.last, n === null ? t.child = c : n.sibling = c, o.last = c);
				}
				return o.tail === null ? (dc(t), null) : (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = L(), t.sibling = null, n = U.current, V(U, r ? n & 1 | 2 : n & 1), t);
			case 22:
			case 23: return Tl(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Kc & 1073741824 && (dc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : dc(t), null;
			case 24: return null;
			case 25: return null;
		}
		throw Error(a(156, t.tag));
	}
	function pc(e, t) {
		switch (wa(t), t.tag) {
			case 1: return ea(t.type) && ta(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return yo(), B(Zi), B(Xi), wo(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 5: return xo(t), null;
			case 13:
				if (B(U), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(a(340));
					Fa();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return B(U), null;
			case 4: return yo(), null;
			case 10: return Ya(t.type._context), null;
			case 22:
			case 23: return Tl(), null;
			case 24: return null;
			default: return null;
		}
	}
	var mc = !1, hc = !1, gc = typeof WeakSet == "function" ? WeakSet : Set, q = null;
	function _c(e, t) {
		var n = e.ref;
		if (n !== null) {
			if (typeof n == "function") try {
				n(null);
			} catch (n) {
				$(e, t, n);
			}
			else n.current = null;
		}
	}
	function vc(e, t, n) {
		try {
			n();
		} catch (n) {
			$(e, t, n);
		}
	}
	var yc = !1;
	function bc(e, t) {
		if (wi = gn, e = Lr(), Rr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var i = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || i !== 0 && f.nodeType !== 3 || (c = s + i), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === i && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (Ti = {
			focusedElem: e,
			selectionRange: n
		}, gn = !1, q = t; q !== null;) if (t = q, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, q = e;
		else for (; q !== null;) {
			t = q;
			try {
				var h = t.alternate;
				if (t.flags & 1024) switch (t.tag) {
					case 0:
					case 11:
					case 15: break;
					case 1:
						if (h !== null) {
							var g = h.memoizedProps, _ = h.memoizedState, v = t.stateNode;
							v.__reactInternalSnapshotBeforeUpdate = v.getSnapshotBeforeUpdate(t.elementType === t.type ? g : bs(t.type, g), _);
						}
						break;
					case 3:
						var y = t.stateNode.containerInfo;
						y.nodeType === 1 ? y.textContent = "" : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
						break;
					case 5:
					case 6:
					case 4:
					case 17: break;
					default: throw Error(a(163));
				}
			} catch (e) {
				$(t, t.return, e);
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, q = e;
				break;
			}
			q = t.return;
		}
		return h = yc, yc = !1, h;
	}
	function xc(e, t, n) {
		var r = t.updateQueue;
		if (r = r === null ? null : r.lastEffect, r !== null) {
			var i = r = r.next;
			do {
				if ((i.tag & e) === e) {
					var a = i.destroy;
					i.destroy = void 0, a !== void 0 && vc(t, n, a);
				}
				i = i.next;
			} while (i !== r);
		}
	}
	function Sc(e, t) {
		if (t = t.updateQueue, t = t === null ? null : t.lastEffect, t !== null) {
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
	function Cc(e) {
		var t = e.ref;
		if (t !== null) {
			var n = e.stateNode;
			switch (e.tag) {
				case 5:
					e = n;
					break;
				default: e = n;
			}
			typeof t == "function" ? t(e) : t.current = e;
		}
	}
	function wc(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, wc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ii], delete t[Li], delete t[zi], delete t[Bi], delete t[Vi])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	function Tc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 4;
	}
	function Ec(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Tc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Dc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ci));
		else if (r !== 4 && (e = e.child, e !== null)) for (Dc(e, t, n), e = e.sibling; e !== null;) Dc(e, t, n), e = e.sibling;
	}
	function Oc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (e = e.child, e !== null)) for (Oc(e, t, n), e = e.sibling; e !== null;) Oc(e, t, n), e = e.sibling;
	}
	var J = null, kc = !1;
	function Ac(e, t, n) {
		for (n = n.child; n !== null;) jc(e, t, n), n = n.sibling;
	}
	function jc(e, t, n) {
		if (Et && typeof Et.onCommitFiberUnmount == "function") try {
			Et.onCommitFiberUnmount(Tt, n);
		} catch {}
		switch (n.tag) {
			case 5: hc || _c(n, t);
			case 6:
				var r = J, i = kc;
				J = null, Ac(e, t, n), J = r, kc = i, J !== null && (kc ? (e = J, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : J.removeChild(n.stateNode));
				break;
			case 18:
				J !== null && (kc ? (e = J, n = n.stateNode, e.nodeType === 8 ? Mi(e.parentNode, n) : e.nodeType === 1 && Mi(e, n), mn(e)) : Mi(J, n.stateNode));
				break;
			case 4:
				r = J, i = kc, J = n.stateNode.containerInfo, kc = !0, Ac(e, t, n), J = r, kc = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				if (!hc && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
					i = r = r.next;
					do {
						var a = i, o = a.destroy;
						a = a.tag, o !== void 0 && (a & 2 || a & 4) && vc(n, t, o), i = i.next;
					} while (i !== r);
				}
				Ac(e, t, n);
				break;
			case 1:
				if (!hc && (_c(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
					r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
				} catch (e) {
					$(n, t, e);
				}
				Ac(e, t, n);
				break;
			case 21:
				Ac(e, t, n);
				break;
			case 22:
				n.mode & 1 ? (hc = (r = hc) || n.memoizedState !== null, Ac(e, t, n), hc = r) : Ac(e, t, n);
				break;
			default: Ac(e, t, n);
		}
	}
	function Mc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			e.updateQueue = null;
			var n = e.stateNode;
			n === null && (n = e.stateNode = new gc()), t.forEach(function(t) {
				var r = Hl.bind(null, e, t);
				n.has(t) || (n.add(t), t.then(r, r));
			});
		}
	}
	function Nc(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			try {
				var o = e, s = t, c = s;
				a: for (; c !== null;) {
					switch (c.tag) {
						case 5:
							J = c.stateNode, kc = !1;
							break a;
						case 3:
							J = c.stateNode.containerInfo, kc = !0;
							break a;
						case 4:
							J = c.stateNode.containerInfo, kc = !0;
							break a;
					}
					c = c.return;
				}
				if (J === null) throw Error(a(160));
				jc(o, s, i), J = null, kc = !1;
				var l = i.alternate;
				l !== null && (l.return = null), i.return = null;
			} catch (e) {
				$(i, t, e);
			}
		}
		if (t.subtreeFlags & 12854) for (t = t.child; t !== null;) Pc(t, e), t = t.sibling;
	}
	function Pc(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (Nc(t, e), Fc(e), r & 4) {
					try {
						xc(3, e, e.return), Sc(3, e);
					} catch (t) {
						$(e, e.return, t);
					}
					try {
						xc(5, e, e.return);
					} catch (t) {
						$(e, e.return, t);
					}
				}
				break;
			case 1:
				Nc(t, e), Fc(e), r & 512 && n !== null && _c(n, n.return);
				break;
			case 5:
				if (Nc(t, e), Fc(e), r & 512 && n !== null && _c(n, n.return), e.flags & 32) {
					var i = e.stateNode;
					try {
						Me(i, "");
					} catch (t) {
						$(e, e.return, t);
					}
				}
				if (r & 4 && (i = e.stateNode, i != null)) {
					var o = e.memoizedProps, s = n === null ? o : n.memoizedProps, c = e.type, l = e.updateQueue;
					if (e.updateQueue = null, l !== null) try {
						c === "input" && o.type === "radio" && o.name != null && ve(i, o), ze(c, s);
						var u = ze(c, o);
						for (s = 0; s < l.length; s += 2) {
							var d = l[s], f = l[s + 1];
							d === "style" ? Ie(i, f) : d === "dangerouslySetInnerHTML" ? je(i, f) : d === "children" ? Me(i, f) : S(i, d, f, u);
						}
						switch (c) {
							case "input":
								ye(i, o);
								break;
							case "textarea":
								Ee(i, o);
								break;
							case "select":
								var p = i._wrapperState.wasMultiple;
								i._wrapperState.wasMultiple = !!o.multiple;
								var m = o.value;
								m == null ? p !== !!o.multiple && (o.defaultValue == null ? Ce(i, !!o.multiple, o.multiple ? [] : "", !1) : Ce(i, !!o.multiple, o.defaultValue, !0)) : Ce(i, !!o.multiple, m, !1);
						}
						i[Li] = o;
					} catch (t) {
						$(e, e.return, t);
					}
				}
				break;
			case 6:
				if (Nc(t, e), Fc(e), r & 4) {
					if (e.stateNode === null) throw Error(a(162));
					i = e.stateNode, o = e.memoizedProps;
					try {
						i.nodeValue = o;
					} catch (t) {
						$(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Nc(t, e), Fc(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					mn(t.containerInfo);
				} catch (t) {
					$(e, e.return, t);
				}
				break;
			case 4:
				Nc(t, e), Fc(e);
				break;
			case 13:
				Nc(t, e), Fc(e), i = e.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || (el = L())), r & 4 && Mc(e);
				break;
			case 22:
				if (d = n !== null && n.memoizedState !== null, e.mode & 1 ? (hc = (u = hc) || d, Nc(t, e), hc = u) : Nc(t, e), Fc(e), r & 8192) {
					if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !d && e.mode & 1) for (q = e, d = e.child; d !== null;) {
						for (f = q = d; q !== null;) {
							switch (p = q, m = p.child, p.tag) {
								case 0:
								case 11:
								case 14:
								case 15:
									xc(4, p, p.return);
									break;
								case 1:
									_c(p, p.return);
									var h = p.stateNode;
									if (typeof h.componentWillUnmount == "function") {
										r = p, n = p.return;
										try {
											t = r, h.props = t.memoizedProps, h.state = t.memoizedState, h.componentWillUnmount();
										} catch (e) {
											$(r, n, e);
										}
									}
									break;
								case 5:
									_c(p, p.return);
									break;
								case 22: if (p.memoizedState !== null) {
									zc(f);
									continue;
								}
							}
							m === null ? zc(f) : (m.return = p, q = m);
						}
						d = d.sibling;
					}
					a: for (d = null, f = e;;) {
						if (f.tag === 5) {
							if (d === null) {
								d = f;
								try {
									i = f.stateNode, u ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (c = f.stateNode, l = f.memoizedProps.style, s = l != null && l.hasOwnProperty("display") ? l.display : null, c.style.display = Fe("display", s));
								} catch (t) {
									$(e, e.return, t);
								}
							}
						} else if (f.tag === 6) {
							if (d === null) try {
								f.stateNode.nodeValue = u ? "" : f.memoizedProps;
							} catch (t) {
								$(e, e.return, t);
							}
						} else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
							f.child.return = f, f = f.child;
							continue;
						}
						if (f === e) break a;
						for (; f.sibling === null;) {
							if (f.return === null || f.return === e) break a;
							d === f && (d = null), f = f.return;
						}
						d === f && (d = null), f.sibling.return = f.return, f = f.sibling;
					}
				}
				break;
			case 19:
				Nc(t, e), Fc(e), r & 4 && Mc(e);
				break;
			case 21: break;
			default: Nc(t, e), Fc(e);
		}
	}
	function Fc(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				a: {
					for (var n = e.return; n !== null;) {
						if (Tc(n)) {
							var r = n;
							break a;
						}
						n = n.return;
					}
					throw Error(a(160));
				}
				switch (r.tag) {
					case 5:
						var i = r.stateNode;
						r.flags & 32 && (Me(i, ""), r.flags &= -33), Oc(e, Ec(e), i);
						break;
					case 3:
					case 4:
						var o = r.stateNode.containerInfo;
						Dc(e, Ec(e), o);
						break;
					default: throw Error(a(161));
				}
			} catch (t) {
				$(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Ic(e, t, n) {
		q = e, Lc(e, t, n);
	}
	function Lc(e, t, n) {
		for (var r = !!(e.mode & 1); q !== null;) {
			var i = q, a = i.child;
			if (i.tag === 22 && r) {
				var o = i.memoizedState !== null || mc;
				if (!o) {
					var s = i.alternate, c = s !== null && s.memoizedState !== null || hc;
					s = mc;
					var l = hc;
					if (mc = o, (hc = c) && !l) for (q = i; q !== null;) o = q, c = o.child, o.tag === 22 && o.memoizedState !== null || c === null ? Bc(i) : (c.return = o, q = c);
					for (; a !== null;) q = a, Lc(a, t, n), a = a.sibling;
					q = i, mc = s, hc = l;
				}
				Rc(e, t, n);
			} else i.subtreeFlags & 8772 && a !== null ? (a.return = i, q = a) : Rc(e, t, n);
		}
	}
	function Rc(e) {
		for (; q !== null;) {
			var t = q;
			if (t.flags & 8772) {
				var n = t.alternate;
				try {
					if (t.flags & 8772) switch (t.tag) {
						case 0:
						case 11:
						case 15:
							hc || Sc(5, t);
							break;
						case 1:
							var r = t.stateNode;
							if (t.flags & 4 && !hc) {
								if (n === null) r.componentDidMount();
								else {
									var i = t.elementType === t.type ? n.memoizedProps : bs(t.type, n.memoizedProps);
									r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
								}
							}
							var o = t.updateQueue;
							o !== null && fo(t, o, r);
							break;
						case 3:
							var s = t.updateQueue;
							if (s !== null) {
								if (n = null, t.child !== null) switch (t.child.tag) {
									case 5:
										n = t.child.stateNode;
										break;
									case 1: n = t.child.stateNode;
								}
								fo(t, s, n);
							}
							break;
						case 5:
							var c = t.stateNode;
							if (n === null && t.flags & 4) {
								n = c;
								var l = t.memoizedProps;
								switch (t.type) {
									case "button":
									case "input":
									case "select":
									case "textarea":
										l.autoFocus && n.focus();
										break;
									case "img": l.src && (n.src = l.src);
								}
							}
							break;
						case 6: break;
						case 4: break;
						case 12: break;
						case 13:
							if (t.memoizedState === null) {
								var u = t.alternate;
								if (u !== null) {
									var d = u.memoizedState;
									if (d !== null) {
										var f = d.dehydrated;
										f !== null && mn(f);
									}
								}
							}
							break;
						case 19:
						case 17:
						case 21:
						case 22:
						case 23:
						case 25: break;
						default: throw Error(a(163));
					}
					hc || t.flags & 512 && Cc(t);
				} catch (e) {
					$(t, t.return, e);
				}
			}
			if (t === e) {
				q = null;
				break;
			}
			if (n = t.sibling, n !== null) {
				n.return = t.return, q = n;
				break;
			}
			q = t.return;
		}
	}
	function zc(e) {
		for (; q !== null;) {
			var t = q;
			if (t === e) {
				q = null;
				break;
			}
			var n = t.sibling;
			if (n !== null) {
				n.return = t.return, q = n;
				break;
			}
			q = t.return;
		}
	}
	function Bc(e) {
		for (; q !== null;) {
			var t = q;
			try {
				switch (t.tag) {
					case 0:
					case 11:
					case 15:
						var n = t.return;
						try {
							Sc(4, t);
						} catch (e) {
							$(t, n, e);
						}
						break;
					case 1:
						var r = t.stateNode;
						if (typeof r.componentDidMount == "function") {
							var i = t.return;
							try {
								r.componentDidMount();
							} catch (e) {
								$(t, i, e);
							}
						}
						var a = t.return;
						try {
							Cc(t);
						} catch (e) {
							$(t, a, e);
						}
						break;
					case 5:
						var o = t.return;
						try {
							Cc(t);
						} catch (e) {
							$(t, o, e);
						}
				}
			} catch (e) {
				$(t, t.return, e);
			}
			if (t === e) {
				q = null;
				break;
			}
			var s = t.sibling;
			if (s !== null) {
				s.return = t.return, q = s;
				break;
			}
			q = t.return;
		}
	}
	var Vc = Math.ceil, Hc = C.ReactCurrentDispatcher, Uc = C.ReactCurrentOwner, Wc = C.ReactCurrentBatchConfig, Y = 0, X = null, Z = null, Gc = 0, Kc = 0, qc = Ji(0), Q = 0, Jc = null, Yc = 0, Xc = 0, Zc = 0, Qc = null, $c = null, el = 0, tl = Infinity, nl = null, rl = !1, il = null, al = null, ol = !1, sl = null, cl = 0, ll = 0, ul = null, dl = -1, fl = 0;
	function pl() {
		return Y & 6 ? L() : dl === -1 ? dl = L() : dl;
	}
	function ml(e) {
		return e.mode & 1 ? Y & 2 && Gc !== 0 ? Gc & -Gc : La.transition === null ? (e = R, e === 0 && (e = window.event, e = e === void 0 ? 16 : Sn(e.type)), e) : (fl === 0 && (fl = zt()), fl) : 1;
	}
	function hl(e, t, n, r) {
		if (50 < ll) throw ll = 0, ul = null, Error(a(185));
		Vt(e, n, r), Y & 2 && e === X || (e === X && (!(Y & 2) && (Xc |= n), Q === 4 && xl(e, Gc)), gl(e, r), n === 1 && Y === 0 && !(t.mode & 1) && (tl = L() + 500, sa && da()));
	}
	function gl(e, t) {
		var n = e.callbackNode;
		Lt(e, t);
		var r = Ft(e, e === X ? Gc : 0);
		if (r === 0) n !== null && gt(n), e.callbackNode = null, e.callbackPriority = 0;
		else if (t = r & -r, e.callbackPriority !== t) {
			if (n != null && gt(n), t === 1) e.tag === 0 ? ua(Sl.bind(null, e)) : la(Sl.bind(null, e)), Ai(function() {
				!(Y & 6) && da();
			}), n = null;
			else {
				switch (Wt(r)) {
					case 1:
						n = bt;
						break;
					case 4:
						n = xt;
						break;
					case 16:
						n = St;
						break;
					case 536870912:
						n = wt;
						break;
					default: n = St;
				}
				n = Wl(n, _l.bind(null, e));
			}
			e.callbackPriority = t, e.callbackNode = n;
		}
	}
	function _l(e, t) {
		if (dl = -1, fl = 0, Y & 6) throw Error(a(327));
		var n = e.callbackNode;
		if (Ll() && e.callbackNode !== n) return null;
		var r = Ft(e, e === X ? Gc : 0);
		if (r === 0) return null;
		if (r & 30 || (r & e.expiredLanes) !== 0 || t) t = Al(e, r);
		else {
			t = r;
			var i = Y;
			Y |= 2;
			var o = Ol();
			(X !== e || Gc !== t) && (nl = null, tl = L() + 500, El(e, t));
			do
				try {
					Ml();
					break;
				} catch (t) {
					Dl(e, t);
				}
			while (1);
			Ja(), Hc.current = o, Y = i, Z === null ? (X = null, Gc = 0, t = Q) : t = 0;
		}
		if (t !== 0) {
			if (t === 2 && (i = Rt(e), i !== 0 && (r = i, t = vl(e, i))), t === 1) throw n = Jc, El(e, 0), xl(e, r), gl(e, L()), n;
			if (t === 6) xl(e, r);
			else {
				if (i = e.current.alternate, !(r & 30) && !bl(i) && (t = Al(e, r), t === 2 && (o = Rt(e), o !== 0 && (r = o, t = vl(e, o))), t === 1)) throw n = Jc, El(e, 0), xl(e, r), gl(e, L()), n;
				switch (e.finishedWork = i, e.finishedLanes = r, t) {
					case 0:
					case 1: throw Error(a(345));
					case 2:
						Fl(e, $c, nl);
						break;
					case 3:
						if (xl(e, r), (r & 130023424) === r && (t = el + 500 - L(), 10 < t)) {
							if (Ft(e, 0) !== 0) break;
							if (i = e.suspendedLanes, (i & r) !== r) {
								pl(), e.pingedLanes |= e.suspendedLanes & i;
								break;
							}
							e.timeoutHandle = Di(Fl.bind(null, e, $c, nl), t);
							break;
						}
						Fl(e, $c, nl);
						break;
					case 4:
						if (xl(e, r), (r & 4194240) === r) break;
						for (t = e.eventTimes, i = -1; 0 < r;) {
							var s = 31 - Ot(r);
							o = 1 << s, s = t[s], s > i && (i = s), r &= ~o;
						}
						if (r = i, r = L() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Vc(r / 1960)) - r, 10 < r) {
							e.timeoutHandle = Di(Fl.bind(null, e, $c, nl), r);
							break;
						}
						Fl(e, $c, nl);
						break;
					case 5:
						Fl(e, $c, nl);
						break;
					default: throw Error(a(329));
				}
			}
		}
		return gl(e, L()), e.callbackNode === n ? _l.bind(null, e) : null;
	}
	function vl(e, t) {
		var n = Qc;
		return e.current.memoizedState.isDehydrated && (El(e, t).flags |= 256), e = Al(e, t), e !== 2 && (t = $c, $c = n, t !== null && yl(t)), e;
	}
	function yl(e) {
		$c === null ? $c = e : $c.push.apply($c, e);
	}
	function bl(e) {
		for (var t = e;;) {
			if (t.flags & 16384) {
				var n = t.updateQueue;
				if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
					var i = n[r], a = i.getSnapshot;
					i = i.value;
					try {
						if (!Mr(a(), i)) return !1;
					} catch {
						return !1;
					}
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function xl(e, t) {
		for (t &= ~Zc, t &= ~Xc, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
			var n = 31 - Ot(t), r = 1 << n;
			e[n] = -1, t &= ~r;
		}
	}
	function Sl(e) {
		if (Y & 6) throw Error(a(327));
		Ll();
		var t = Ft(e, 0);
		if (!(t & 1)) return gl(e, L()), null;
		var n = Al(e, t);
		if (e.tag !== 0 && n === 2) {
			var r = Rt(e);
			r !== 0 && (t = r, n = vl(e, r));
		}
		if (n === 1) throw n = Jc, El(e, 0), xl(e, t), gl(e, L()), n;
		if (n === 6) throw Error(a(345));
		return e.finishedWork = e.current.alternate, e.finishedLanes = t, Fl(e, $c, nl), gl(e, L()), null;
	}
	function Cl(e, t) {
		var n = Y;
		Y |= 1;
		try {
			return e(t);
		} finally {
			Y = n, Y === 0 && (tl = L() + 500, sa && da());
		}
	}
	function wl(e) {
		sl !== null && sl.tag === 0 && !(Y & 6) && Ll();
		var t = Y;
		Y |= 1;
		var n = Wc.transition, r = R;
		try {
			if (Wc.transition = null, R = 1, e) return e();
		} finally {
			R = r, Wc.transition = n, Y = t, !(Y & 6) && da();
		}
	}
	function Tl() {
		Kc = qc.current, B(qc);
	}
	function El(e, t) {
		e.finishedWork = null, e.finishedLanes = 0;
		var n = e.timeoutHandle;
		if (n !== -1 && (e.timeoutHandle = -1, Oi(n)), Z !== null) for (n = Z.return; n !== null;) {
			var r = n;
			switch (wa(r), r.tag) {
				case 1:
					r = r.type.childContextTypes, r != null && ta();
					break;
				case 3:
					yo(), B(Zi), B(Xi), wo();
					break;
				case 5:
					xo(r);
					break;
				case 4:
					yo();
					break;
				case 13:
					B(U);
					break;
				case 19:
					B(U);
					break;
				case 10:
					Ya(r.type._context);
					break;
				case 22:
				case 23: Tl();
			}
			n = n.return;
		}
		if (X = e, Z = e = Yl(e.current, null), Gc = Kc = t, Q = 0, Jc = null, Zc = Xc = Yc = 0, $c = Qc = null, $a !== null) {
			for (t = 0; t < $a.length; t++) if (n = $a[t], r = n.interleaved, r !== null) {
				n.interleaved = null;
				var i = r.next, a = n.pending;
				if (a !== null) {
					var o = a.next;
					a.next = i, r.next = o;
				}
				n.pending = r;
			}
			$a = null;
		}
		return e;
	}
	function Dl(e, t) {
		do {
			var n = Z;
			try {
				if (Ja(), To.current = gs, Oo) {
					for (var r = W.memoizedState; r !== null;) {
						var i = r.queue;
						i !== null && (i.pending = null), r = r.next;
					}
					Oo = !1;
				}
				if (Do = 0, K = G = W = null, ko = !1, Ao = 0, Uc.current = null, n === null || n.return === null) {
					Q = 1, Jc = t, Z = null;
					break;
				}
				a: {
					var o = e, s = n.return, c = n, l = t;
					if (t = Gc, c.flags |= 32768, typeof l == "object" && l && typeof l.then == "function") {
						var u = l, d = c, f = d.tag;
						if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
							var p = d.alternate;
							p ? (d.updateQueue = p.updateQueue, d.memoizedState = p.memoizedState, d.lanes = p.lanes) : (d.updateQueue = null, d.memoizedState = null);
						}
						var m = Ps(s);
						if (m !== null) {
							m.flags &= -257, Fs(m, s, c, o, t), m.mode & 1 && Ns(o, u, t), t = m, l = u;
							var h = t.updateQueue;
							if (h === null) {
								var g = /* @__PURE__ */ new Set();
								g.add(l), t.updateQueue = g;
							} else h.add(l);
							break a;
						}
						if (!(t & 1)) {
							Ns(o, u, t), kl();
							break a;
						}
						l = Error(a(426));
					} else if (H && c.mode & 1) {
						var _ = Ps(s);
						if (_ !== null) {
							!(_.flags & 65536) && (_.flags |= 256), Fs(_, s, c, o, t), Ia(Ds(l, c));
							break a;
						}
					}
					o = l = Ds(l, c), Q !== 4 && (Q = 2), Qc === null ? Qc = [o] : Qc.push(o), o = s;
					do {
						switch (o.tag) {
							case 3:
								o.flags |= 65536, t &= -t, o.lanes |= t;
								var v = js(o, l, t);
								lo(o, v);
								break a;
							case 1:
								c = l;
								var y = o.type, b = o.stateNode;
								if (!(o.flags & 128) && (typeof y.getDerivedStateFromError == "function" || b !== null && typeof b.componentDidCatch == "function" && (al === null || !al.has(b)))) {
									o.flags |= 65536, t &= -t, o.lanes |= t;
									var x = Ms(o, c, t);
									lo(o, x);
									break a;
								}
						}
						o = o.return;
					} while (o !== null);
				}
				Pl(n);
			} catch (e) {
				t = e, Z === n && n !== null && (Z = n = n.return);
				continue;
			}
			break;
		} while (1);
	}
	function Ol() {
		var e = Hc.current;
		return Hc.current = gs, e === null ? gs : e;
	}
	function kl() {
		(Q === 0 || Q === 3 || Q === 2) && (Q = 4), X === null || !(Yc & 268435455) && !(Xc & 268435455) || xl(X, Gc);
	}
	function Al(e, t) {
		var n = Y;
		Y |= 2;
		var r = Ol();
		(X !== e || Gc !== t) && (nl = null, El(e, t));
		do
			try {
				jl();
				break;
			} catch (t) {
				Dl(e, t);
			}
		while (1);
		if (Ja(), Y = n, Hc.current = r, Z !== null) throw Error(a(261));
		return X = null, Gc = 0, Q;
	}
	function jl() {
		for (; Z !== null;) Nl(Z);
	}
	function Ml() {
		for (; Z !== null && !_t();) Nl(Z);
	}
	function Nl(e) {
		var t = Ul(e.alternate, e, Kc);
		e.memoizedProps = e.pendingProps, t === null ? Pl(e) : Z = t, Uc.current = null;
	}
	function Pl(e) {
		var t = e;
		do {
			var n = t.alternate;
			if (e = t.return, t.flags & 32768) {
				if (n = pc(n, t), n !== null) {
					n.flags &= 32767, Z = n;
					return;
				}
				if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
				else {
					Q = 6, Z = null;
					return;
				}
			} else if (n = fc(n, t, Kc), n !== null) {
				Z = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Z = t;
				return;
			}
			Z = t = e;
		} while (t !== null);
		Q === 0 && (Q = 5);
	}
	function Fl(e, t, n) {
		var r = R, i = Wc.transition;
		try {
			Wc.transition = null, R = 1, Il(e, t, n, r);
		} finally {
			Wc.transition = i, R = r;
		}
		return null;
	}
	function Il(e, t, n, r) {
		do
			Ll();
		while (sl !== null);
		if (Y & 6) throw Error(a(327));
		n = e.finishedWork;
		var i = e.finishedLanes;
		if (n === null) return null;
		if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(a(177));
		e.callbackNode = null, e.callbackPriority = 0;
		var o = n.lanes | n.childLanes;
		if (Ht(e, o), e === X && (Z = X = null, Gc = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || ol || (ol = !0, Wl(St, function() {
			return Ll(), null;
		})), o = !!(n.flags & 15990), n.subtreeFlags & 15990 || o) {
			o = Wc.transition, Wc.transition = null;
			var s = R;
			R = 1;
			var c = Y;
			Y |= 4, Uc.current = null, bc(e, n), Pc(n, e), zr(Ti), gn = !!wi, Ti = wi = null, e.current = n, Ic(n, e, i), vt(), Y = c, R = s, Wc.transition = o;
		} else e.current = n;
		if (ol && (ol = !1, sl = e, cl = i), o = e.pendingLanes, o === 0 && (al = null), Dt(n.stateNode, r), gl(e, L()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) i = t[n], r(i.value, {
			componentStack: i.stack,
			digest: i.digest
		});
		if (rl) throw rl = !1, e = il, il = null, e;
		return cl & 1 && e.tag !== 0 && Ll(), o = e.pendingLanes, o & 1 ? e === ul ? ll++ : (ll = 0, ul = e) : ll = 0, da(), null;
	}
	function Ll() {
		if (sl !== null) {
			var e = Wt(cl), t = Wc.transition, n = R;
			try {
				if (Wc.transition = null, R = 16 > e ? 16 : e, sl === null) var r = !1;
				else {
					if (e = sl, sl = null, cl = 0, Y & 6) throw Error(a(331));
					var i = Y;
					for (Y |= 4, q = e.current; q !== null;) {
						var o = q, s = o.child;
						if (q.flags & 16) {
							var c = o.deletions;
							if (c !== null) {
								for (var l = 0; l < c.length; l++) {
									var u = c[l];
									for (q = u; q !== null;) {
										var d = q;
										switch (d.tag) {
											case 0:
											case 11:
											case 15: xc(8, d, o);
										}
										var f = d.child;
										if (f !== null) f.return = d, q = f;
										else for (; q !== null;) {
											d = q;
											var p = d.sibling, m = d.return;
											if (wc(d), d === u) {
												q = null;
												break;
											}
											if (p !== null) {
												p.return = m, q = p;
												break;
											}
											q = m;
										}
									}
								}
								var h = o.alternate;
								if (h !== null) {
									var g = h.child;
									if (g !== null) {
										h.child = null;
										do {
											var _ = g.sibling;
											g.sibling = null, g = _;
										} while (g !== null);
									}
								}
								q = o;
							}
						}
						if (o.subtreeFlags & 2064 && s !== null) s.return = o, q = s;
						else b: for (; q !== null;) {
							if (o = q, o.flags & 2048) switch (o.tag) {
								case 0:
								case 11:
								case 15: xc(9, o, o.return);
							}
							var v = o.sibling;
							if (v !== null) {
								v.return = o.return, q = v;
								break b;
							}
							q = o.return;
						}
					}
					var y = e.current;
					for (q = y; q !== null;) {
						s = q;
						var b = s.child;
						if (s.subtreeFlags & 2064 && b !== null) b.return = s, q = b;
						else b: for (s = y; q !== null;) {
							if (c = q, c.flags & 2048) try {
								switch (c.tag) {
									case 0:
									case 11:
									case 15: Sc(9, c);
								}
							} catch (e) {
								$(c, c.return, e);
							}
							if (c === s) {
								q = null;
								break b;
							}
							var x = c.sibling;
							if (x !== null) {
								x.return = c.return, q = x;
								break b;
							}
							q = c.return;
						}
					}
					if (Y = i, da(), Et && typeof Et.onPostCommitFiberRoot == "function") try {
						Et.onPostCommitFiberRoot(Tt, e);
					} catch {}
					r = !0;
				}
				return r;
			} finally {
				R = n, Wc.transition = t;
			}
		}
		return !1;
	}
	function Rl(e, t, n) {
		t = Ds(n, t), t = js(e, t, 1), e = so(e, t, 1), t = pl(), e !== null && (Vt(e, 1, t), gl(e, t));
	}
	function $(e, t, n) {
		if (e.tag === 3) Rl(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Rl(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (al === null || !al.has(r))) {
					e = Ds(n, e), e = Ms(t, e, 1), t = so(t, e, 1), e = pl(), t !== null && (Vt(t, 1, e), gl(t, e));
					break;
				}
			}
			t = t.return;
		}
	}
	function zl(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), t = pl(), e.pingedLanes |= e.suspendedLanes & n, X === e && (Gc & n) === n && (Q === 4 || Q === 3 && (Gc & 130023424) === Gc && 500 > L() - el ? El(e, 0) : Zc |= n), gl(e, t);
	}
	function Bl(e, t) {
		t === 0 && (e.mode & 1 ? (t = Nt, Nt <<= 1, !(Nt & 130023424) && (Nt = 4194304)) : t = 1);
		var n = pl();
		e = no(e, t), e !== null && (Vt(e, t, n), gl(e, n));
	}
	function Vl(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Bl(e, n);
	}
	function Hl(e, t) {
		var n = 0;
		switch (e.tag) {
			case 13:
				var r = e.stateNode, i = e.memoizedState;
				i !== null && (n = i.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			default: throw Error(a(314));
		}
		r !== null && r.delete(t), Bl(e, n);
	}
	var Ul = function(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps || Zi.current) Ls = !0;
			else {
				if ((e.lanes & n) === 0 && !(t.flags & 128)) return Ls = !1, oc(e, t, n);
				Ls = !!(e.flags & 131072);
			}
		} else Ls = !1, H && t.flags & 1048576 && Sa(t, ha, t.index);
		switch (t.lanes = 0, t.tag) {
			case 2:
				var r = t.type;
				ic(e, t), e = t.pendingProps;
				var i = $i(t, Xi.current);
				Za(t, n), i = Po(null, t, r, e, i, n);
				var o = Fo();
				return t.flags |= 1, typeof i == "object" && i && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ea(r) ? (o = !0, ia(t)) : o = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, io(t), i.updater = Ss, t.stateNode = i, i._reactInternals = t, Es(t, r, e, n), t = Ks(null, t, r, !0, o, n)) : (t.tag = 0, H && o && Ca(t), Rs(null, t, i, n), t = t.child), t;
			case 16:
				r = t.elementType;
				a: {
					switch (ic(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = Jl(r), e = bs(r, e), i) {
						case 0:
							t = Ws(null, t, r, e, n);
							break a;
						case 1:
							t = Gs(null, t, r, e, n);
							break a;
						case 11:
							t = zs(null, t, r, e, n);
							break a;
						case 14:
							t = Bs(null, t, r, bs(r.type, e), n);
							break a;
					}
					throw Error(a(306, r, ""));
				}
				return t;
			case 0: return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : bs(r, i), Ws(e, t, r, i, n);
			case 1: return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : bs(r, i), Gs(e, t, r, i, n);
			case 3:
				a: {
					if (qs(t), e === null) throw Error(a(387));
					r = t.pendingProps, o = t.memoizedState, i = o.element, ao(e, t), uo(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache,
							pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
							transitions: s.transitions
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							i = Ds(Error(a(423)), t), t = Js(e, t, r, n, i);
							break a;
						}
						if (r !== i) {
							i = Ds(Error(a(424)), t), t = Js(e, t, r, n, i);
							break a;
						}
						for (Ea = Ni(t.stateNode.containerInfo.firstChild), Ta = t, H = !0, Da = null, n = Ua(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					} else {
						if (Fa(), r === i) {
							t = ac(e, t, n);
							break a;
						}
						Rs(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 5: return bo(t), e === null && ja(t), r = t.type, i = t.pendingProps, o = e === null ? null : e.memoizedProps, s = i.children, Ei(r, i) ? s = null : o !== null && Ei(r, o) && (t.flags |= 32), Us(e, t), Rs(e, t, s, n), t.child;
			case 6: return e === null && ja(t), null;
			case 13: return Zs(e, t, n);
			case 4: return vo(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ha(t, null, r, n) : Rs(e, t, r, n), t.child;
			case 11: return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : bs(r, i), zs(e, t, r, i, n);
			case 7: return Rs(e, t, t.pendingProps, n), t.child;
			case 8: return Rs(e, t, t.pendingProps.children, n), t.child;
			case 12: return Rs(e, t, t.pendingProps.children, n), t.child;
			case 10:
				a: {
					if (r = t.type._context, i = t.pendingProps, o = t.memoizedProps, s = i.value, V(Wa, r._currentValue), r._currentValue = s, o !== null) {
						if (Mr(o.value, s)) {
							if (o.children === i.children && !Zi.current) {
								t = ac(e, t, n);
								break a;
							}
						} else for (o = t.child, o !== null && (o.return = t); o !== null;) {
							var c = o.dependencies;
							if (c !== null) {
								s = o.child;
								for (var l = c.firstContext; l !== null;) {
									if (l.context === r) {
										if (o.tag === 1) {
											l = oo(-1, n & -n), l.tag = 2;
											var u = o.updateQueue;
											if (u !== null) {
												u = u.shared;
												var d = u.pending;
												d === null ? l.next = l : (l.next = d.next, d.next = l), u.pending = l;
											}
										}
										o.lanes |= n, l = o.alternate, l !== null && (l.lanes |= n), Xa(o.return, n, t), c.lanes |= n;
										break;
									}
									l = l.next;
								}
							} else if (o.tag === 10) s = o.type === t.type ? null : o.child;
							else if (o.tag === 18) {
								if (s = o.return, s === null) throw Error(a(341));
								s.lanes |= n, c = s.alternate, c !== null && (c.lanes |= n), Xa(s, n, t), s = o.sibling;
							} else s = o.child;
							if (s !== null) s.return = o;
							else for (s = o; s !== null;) {
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
					}
					Rs(e, t, i.children, n), t = t.child;
				}
				return t;
			case 9: return i = t.type, r = t.pendingProps.children, Za(t, n), i = Qa(i), r = r(i), t.flags |= 1, Rs(e, t, r, n), t.child;
			case 14: return r = t.type, i = bs(r, t.pendingProps), i = bs(r.type, i), Bs(e, t, r, i, n);
			case 15: return Vs(e, t, t.type, t.pendingProps, n);
			case 17: return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : bs(r, i), ic(e, t), t.tag = 1, ea(r) ? (e = !0, ia(t)) : e = !1, Za(t, n), ws(t, r, i), Es(t, r, i, n), Ks(null, t, r, !0, e, n);
			case 19: return rc(e, t, n);
			case 22: return Hs(e, t, n);
		}
		throw Error(a(156, t.tag));
	};
	function Wl(e, t) {
		return ht(e, t);
	}
	function Gl(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Kl(e, t, n, r) {
		return new Gl(e, t, n, r);
	}
	function ql(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Jl(e) {
		if (typeof e == "function") return +!!ql(e);
		if (e != null) {
			if (e = e.$$typeof, e === ee) return 11;
			if (e === N) return 14;
		}
		return 2;
	}
	function Yl(e, t) {
		var n = e.alternate;
		return n === null ? (n = Kl(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
	}
	function Xl(e, t, n, r, i, o) {
		var s = 2;
		if (r = e, typeof e == "function") ql(e) && (s = 1);
		else if (typeof e == "string") s = 5;
		else a: switch (e) {
			case E: return Zl(n.children, i, o, t);
			case D:
				s = 8, i |= 8;
				break;
			case O: return e = Kl(12, n, t, i | 2), e.elementType = O, e.lanes = o, e;
			case j: return e = Kl(13, n, t, i), e.elementType = j, e.lanes = o, e;
			case M: return e = Kl(19, n, t, i), e.elementType = M, e.lanes = o, e;
			case te: return Ql(n, i, o, t);
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case k:
						s = 10;
						break a;
					case A:
						s = 9;
						break a;
					case ee:
						s = 11;
						break a;
					case N:
						s = 14;
						break a;
					case P:
						s = 16, r = null;
						break a;
				}
				throw Error(a(130, e == null ? e : typeof e, ""));
		}
		return t = Kl(s, n, t, i), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function Zl(e, t, n, r) {
		return e = Kl(7, e, r, t), e.lanes = n, e;
	}
	function Ql(e, t, n, r) {
		return e = Kl(22, e, r, t), e.elementType = te, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
	}
	function $l(e, t, n) {
		return e = Kl(6, e, null, t), e.lanes = n, e;
	}
	function eu(e, t, n) {
		return t = Kl(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	function tu(e, t, n, r, i) {
		this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Bt(0), this.expirationTimes = Bt(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Bt(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
	}
	function nu(e, t, n, r, i, a, o, s, c) {
		return e = new tu(e, t, n, s, c), t === 1 ? (t = 1, !0 === a && (t |= 8)) : t = 0, a = Kl(3, null, null, t), e.current = a, a.stateNode = e, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: null,
			transitions: null,
			pendingSuspenseBoundaries: null
		}, io(a), e;
	}
	function ru(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: T,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	function iu(e) {
		if (!e) return Yi;
		e = e._reactInternals;
		a: {
			if (lt(e) !== e || e.tag !== 1) throw Error(a(170));
			var t = e;
			do {
				switch (t.tag) {
					case 3:
						t = t.stateNode.context;
						break a;
					case 1: if (ea(t.type)) {
						t = t.stateNode.__reactInternalMemoizedMergedChildContext;
						break a;
					}
				}
				t = t.return;
			} while (t !== null);
			throw Error(a(171));
		}
		if (e.tag === 1) {
			var n = e.type;
			if (ea(n)) return ra(e, n, t);
		}
		return t;
	}
	function au(e, t, n, r, i, a, o, s, c) {
		return e = nu(n, r, !0, e, i, a, o, s, c), e.context = iu(null), n = e.current, r = pl(), i = ml(n), a = oo(r, i), a.callback = t ?? null, so(n, a, i), e.current.lanes = i, Vt(e, i, r), gl(e, r), e;
	}
	function ou(e, t, n, r) {
		var i = t.current, a = pl(), o = ml(i);
		return n = iu(n), t.context === null ? t.context = n : t.pendingContext = n, t = oo(a, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = so(i, t, o), e !== null && (hl(e, i, o, a), co(e, i, o)), o;
	}
	function su(e) {
		if (e = e.current, !e.child) return null;
		switch (e.child.tag) {
			case 5: return e.child.stateNode;
			default: return e.child.stateNode;
		}
	}
	function cu(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function lu(e, t) {
		cu(e, t), (e = e.alternate) && cu(e, t);
	}
	function uu() {
		return null;
	}
	var du = typeof reportError == "function" ? reportError : function(e) {
		console.error(e);
	};
	function fu(e) {
		this._internalRoot = e;
	}
	pu.prototype.render = fu.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(a(409));
		ou(e, t, null, null);
	}, pu.prototype.unmount = fu.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			wl(function() {
				ou(null, e, null, null);
			}), t[Ri] = null;
		}
	};
	function pu(e) {
		this._internalRoot = e;
	}
	pu.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Jt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < rn.length && t !== 0 && t < rn[n].priority; n++);
			rn.splice(n, 0, e), n === 0 && ln(e);
		}
	};
	function mu(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function hu(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
	}
	function gu() {}
	function _u(e, t, n, r, i) {
		if (i) {
			if (typeof r == "function") {
				var a = r;
				r = function() {
					var e = su(o);
					a.call(e);
				};
			}
			var o = au(t, r, e, 0, null, !1, !1, "", gu);
			return e._reactRootContainer = o, e[Ri] = o.current, fi(e.nodeType === 8 ? e.parentNode : e), wl(), o;
		}
		for (; i = e.lastChild;) e.removeChild(i);
		if (typeof r == "function") {
			var s = r;
			r = function() {
				var e = su(c);
				s.call(e);
			};
		}
		var c = nu(e, 0, !1, null, null, !1, !1, "", gu);
		return e._reactRootContainer = c, e[Ri] = c.current, fi(e.nodeType === 8 ? e.parentNode : e), wl(function() {
			ou(t, c, n, r);
		}), c;
	}
	function vu(e, t, n, r, i) {
		var a = n._reactRootContainer;
		if (a) {
			var o = a;
			if (typeof i == "function") {
				var s = i;
				i = function() {
					var e = su(o);
					s.call(e);
				};
			}
			ou(t, o, e, i);
		} else o = _u(n, t, e, i, r);
		return su(o);
	}
	Gt = function(e) {
		switch (e.tag) {
			case 3:
				var t = e.stateNode;
				if (t.current.memoizedState.isDehydrated) {
					var n = Pt(t.pendingLanes);
					n !== 0 && (Ut(t, n | 1), gl(t, L()), !(Y & 6) && (tl = L() + 500, da()));
				}
				break;
			case 13: wl(function() {
				var t = no(e, 1);
				t !== null && hl(t, e, 1, pl());
			}), lu(e, 1);
		}
	}, Kt = function(e) {
		if (e.tag === 13) {
			var t = no(e, 134217728);
			t !== null && hl(t, e, 134217728, pl()), lu(e, 134217728);
		}
	}, qt = function(e) {
		if (e.tag === 13) {
			var t = ml(e), n = no(e, t);
			n !== null && hl(n, e, t, pl()), lu(e, t);
		}
	}, Jt = function() {
		return R;
	}, Yt = function(e, t) {
		var n = R;
		try {
			return R = e, t();
		} finally {
			R = n;
		}
	}, He = function(e, t, n) {
		switch (t) {
			case "input":
				if (ye(e, n), t = n.name, n.type === "radio" && t != null) {
					for (n = e; n.parentNode;) n = n.parentNode;
					for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + "][type=\"radio\"]"), t = 0; t < n.length; t++) {
						var r = n[t];
						if (r !== e && r.form === e.form) {
							var i = Gi(r);
							if (!i) throw Error(a(90));
							he(r), ye(r, i);
						}
					}
				}
				break;
			case "textarea":
				Ee(e, n);
				break;
			case "select": t = n.value, t != null && Ce(e, !!n.multiple, t, !1);
		}
	}, Je = Cl, Ye = wl;
	var yu = {
		usingClientEntryPoint: !1,
		Events: [
			Ui,
			Wi,
			Gi,
			Ke,
			qe,
			Cl
		]
	}, bu = {
		findFiberByHostInstance: Hi,
		bundleType: 0,
		version: "18.3.1",
		rendererPackageName: "react-dom"
	}, xu = {
		bundleType: bu.bundleType,
		version: bu.version,
		rendererPackageName: bu.rendererPackageName,
		rendererConfig: bu.rendererConfig,
		overrideHookState: null,
		overrideHookStateDeletePath: null,
		overrideHookStateRenamePath: null,
		overrideProps: null,
		overridePropsDeletePath: null,
		overridePropsRenamePath: null,
		setErrorHandler: null,
		setSuspenseHandler: null,
		scheduleUpdate: null,
		currentDispatcherRef: C.ReactCurrentDispatcher,
		findHostInstanceByFiber: function(e) {
			return e = pt(e), e === null ? null : e.stateNode;
		},
		findFiberByHostInstance: bu.findFiberByHostInstance || uu,
		findHostInstancesForRefresh: null,
		scheduleRefresh: null,
		scheduleRoot: null,
		setRefreshHandler: null,
		getCurrentFiber: null,
		reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Su = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Su.isDisabled && Su.supportsFiber) try {
			Tt = Su.inject(xu), Et = Su;
		} catch {}
	}
	e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = yu, e.createPortal = function(e, t) {
		var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!mu(t)) throw Error(a(200));
		return ru(e, t, null, n);
	}, e.createRoot = function(e, t) {
		if (!mu(e)) throw Error(a(299));
		var n = !1, r = "", i = du;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = nu(e, 1, !1, null, null, n, !1, r, i), e[Ri] = t.current, fi(e.nodeType === 8 ? e.parentNode : e), new fu(t);
	}, e.findDOMNode = function(e) {
		if (e == null) return null;
		if (e.nodeType === 1) return e;
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(a(188)) : (e = Object.keys(e).join(","), Error(a(268, e)));
		return e = pt(t), e = e === null ? null : e.stateNode, e;
	}, e.flushSync = function(e) {
		return wl(e);
	}, e.hydrate = function(e, t, n) {
		if (!hu(t)) throw Error(a(200));
		return vu(null, e, t, !0, n);
	}, e.hydrateRoot = function(e, t, n) {
		if (!mu(e)) throw Error(a(405));
		var r = n != null && n.hydratedSources || null, i = !1, o = "", s = du;
		if (n != null && (!0 === n.unstable_strictMode && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = au(t, null, e, 1, n ?? null, i, !1, o, s), e[Ri] = t.current, fi(e), r) for (e = 0; e < r.length; e++) n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(n, i);
		return new pu(t);
	}, e.render = function(e, t, n) {
		if (!hu(t)) throw Error(a(200));
		return vu(null, e, t, !1, n);
	}, e.unmountComponentAtNode = function(e) {
		if (!hu(e)) throw Error(a(40));
		return e._reactRootContainer ? (wl(function() {
			vu(null, null, e, !1, function() {
				e._reactRootContainer = null, e[Ri] = null;
			});
		}), !0) : !1;
	}, e.unstable_batchedUpdates = Cl, e.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
		if (!hu(n)) throw Error(a(200));
		if (e == null || e._reactInternals === void 0) throw Error(a(38));
		return vu(e, t, n, !1, r);
	}, e.version = "18.3.1-next-f1338f8080-20240426";
})), o = /* @__PURE__ */ e(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = a();
})), s = /* @__PURE__ */ e(((e) => {
	var t = o();
	e.createRoot = t.createRoot, e.hydrateRoot = t.hydrateRoot;
})), c = /* @__PURE__ */ e(((e) => {
	var t = n(), r = Symbol.for("react.element"), i = Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, o = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function c(e, t, n) {
		var i, c = {}, l = null, u = null;
		for (i in n !== void 0 && (l = "" + n), t.key !== void 0 && (l = "" + t.key), t.ref !== void 0 && (u = t.ref), t) a.call(t, i) && !s.hasOwnProperty(i) && (c[i] = t[i]);
		if (e && e.defaultProps) for (i in t = e.defaultProps, t) c[i] === void 0 && (c[i] = t[i]);
		return {
			$$typeof: r,
			type: e,
			key: l,
			ref: u,
			props: c,
			_owner: o.current
		};
	}
	e.Fragment = i, e.jsx = c, e.jsxs = c;
})), l = /* @__PURE__ */ e(((e, t) => {
	t.exports = c();
})), u = n(), d = s(), f = l();
function p({ name: e, className: t }) {
	return /* @__PURE__ */ (0, f.jsx)("span", {
		className: `icon-wrap ${t ?? ""}`,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, f.jsx)("ha-icon", { icon: `mdi:${e}` })
	});
}
// src/Logo.tsx
var m = "<defs><linearGradient id=\"hl-mark-g\" x1=\"0\" y1=\"0\" x2=\"0.35\" y2=\"1\"><stop offset=\"0\" stop-color=\"#FFB547\"/><stop offset=\"1\" stop-color=\"#FF5A1F\"/></linearGradient></defs><polygon points=\"256,62 452,222 452,446 60,446 60,222\" fill=\"url(#hl-mark-g)\" stroke=\"url(#hl-mark-g)\" stroke-width=\"56\" stroke-linejoin=\"round\"/><path d=\"M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z\" fill=\"#fff\" transform=\"translate(256 292) scale(10) translate(-12 -12)\"/>";
function h({ size: e = 28 }) {
	return /* @__PURE__ */ (0, f.jsx)("svg", {
		className: "logo-mark",
		viewBox: "0 0 512 512",
		width: e,
		height: e,
		"aria-hidden": "true",
		dangerouslySetInnerHTML: { __html: m }
	});
}
// src/types.ts
var g = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday"
], _ = {
	heat: "Heating",
	water: "Hot water"
}, v = (e) => e && typeof e == "object" && e.error && typeof e.error == "object" ? e.error : e, y = (e) => v(e)?.code === 3, b = (e) => {
	let t = v(e);
	if (typeof t == "string") return t;
	if (typeof t?.message == "string" && t.message) return t.message;
	if (t?.code !== void 0) return `Error: ${t.code}`;
	try {
		return JSON.stringify(t);
	} catch {
		return String(t);
	}
};
// src/api.ts
function x(e, t, n) {
	let [r, i] = (0, u.useState)(!1), [a, o] = (0, u.useState)(null);
	return {
		busy: r,
		result: a,
		send: async (r, a) => {
			i(!0);
			try {
				await e().callWS({
					entry_id: t,
					channel: n,
					...r
				}), o({
					kind: "ok",
					text: a
				});
			} catch (e) {
				o({
					kind: "error",
					text: b(e)
				});
			} finally {
				i(!1);
			}
		}
	};
}
var S = new Intl.DateTimeFormat(void 0, { weekday: "short" }), C = new Intl.DateTimeFormat(void 0, {
	weekday: "short",
	day: "numeric",
	month: "short"
}), w = new Intl.DateTimeFormat(void 0, {
	hour: "2-digit",
	minute: "2-digit"
});
function T(e) {
	let t = typeof e == "string" ? new Date(e) : e;
	return Number.isNaN(t.getTime()) ? "" : `${((t.getTime() - Date.now()) / 864e5 < 6 ? S : C).format(t)} ${w.format(t)}`;
}
var E = (e) => e.length === 0 ? "rooms" : e.length <= 2 ? e.join(" and ") : `${e.length} rooms`, D = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, O = (e) => String(e).padStart(2, "0"), k = (e) => `${e.getFullYear()}-${O(e.getMonth() + 1)}-${O(e.getDate())}T${O(e.getHours())}:${O(e.getMinutes())}`;
function A({ hasHeat: e, hasWater: t, frost: n, limits: r, busy: i, onGo: a, onClose: o }) {
	let [s, c] = (0, u.useState)(() => {
		let e = /* @__PURE__ */ new Date();
		return e.setDate(e.getDate() + 7), e.setHours(14, 0, 0, 0), k(e);
	}), [l, d] = (0, u.useState)(n), m = r?.boost_min_temp ?? 5, h = r?.heat_max ?? 32, g = (e) => Math.min(h, Math.max(m, Math.round(e * 2) / 2));
	(0, u.useEffect)(() => {
		let e = (e) => e.key === "Escape" && o();
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [o]);
	let _ = new Date(s), v = !Number.isNaN(_.getTime()) && _.getTime() > Date.now() + 6e4, y = [e && `heating holds ${l.toFixed(1)}°`, t && "hot water is off"].filter(Boolean).join(" and ");
	return /* @__PURE__ */ (0, f.jsx)("div", {
		className: "sheet-backdrop",
		onClick: (e) => {
			e.stopPropagation(), o();
		},
		children: /* @__PURE__ */ (0, f.jsxs)("div", {
			className: "sheet heat",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Away",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, f.jsx)("span", { className: "sheet-handle" }),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "sheet-title",
					children: [/* @__PURE__ */ (0, f.jsx)("h2", { children: "Away" }), /* @__PURE__ */ (0, f.jsxs)("span", {
						className: "muted",
						children: [
							"Until you're back, ",
							y,
							". Then everything goes back to what it was doing."
						]
					})]
				}),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "sheet-field",
					children: [/* @__PURE__ */ (0, f.jsx)("span", {
						className: "sheet-label",
						children: "Back on"
					}), /* @__PURE__ */ (0, f.jsx)("input", {
						className: "sheet-time",
						type: "datetime-local",
						value: s,
						min: k(/* @__PURE__ */ new Date()),
						onChange: (e) => c(e.target.value)
					})]
				}),
				e && /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "sheet-field",
					children: [/* @__PURE__ */ (0, f.jsx)("span", {
						className: "sheet-label",
						children: "Heating while away"
					}), /* @__PURE__ */ (0, f.jsxs)("div", {
						className: "sheet-temp",
						children: [
							/* @__PURE__ */ (0, f.jsx)("button", {
								className: "round sheet-step",
								onClick: () => d(g(l - .5)),
								"aria-label": "Lower",
								children: /* @__PURE__ */ (0, f.jsx)(p, { name: "minus" })
							}),
							/* @__PURE__ */ (0, f.jsxs)("span", {
								className: "sheet-temp-value",
								children: [l.toFixed(1), "°"]
							}),
							/* @__PURE__ */ (0, f.jsx)("button", {
								className: "round sheet-step",
								onClick: () => d(g(l + .5)),
								"aria-label": "Raise",
								children: /* @__PURE__ */ (0, f.jsx)(p, { name: "plus" })
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, f.jsx)("button", {
					className: "sheet-go",
					disabled: i || !v,
					onClick: () => a(_, l),
					children: v ? `Away until ${T(_)}` : "Pick a time in the future"
				}),
				/* @__PURE__ */ (0, f.jsx)("button", {
					className: "ghost sheet-cancel",
					onClick: o,
					children: "Cancel"
				})
			]
		})
	});
}
// src/Overview.tsx
var ee = [
	30,
	60,
	120,
	180
];
function j({ getHass: e, devices: t, status: n, limits: r, onOpenDevice: i, onOpenRoom: a }) {
	let [o, s] = (0, u.useState)([]), [c, l] = (0, u.useState)("all");
	(0, u.useEffect)(() => {
		let t = e().connection.subscribeMessage((e) => s(e.rooms), { type: "hive_local/rooms/subscribe" });
		return () => {
			t.then((e) => e()).catch(() => {});
		};
	}, [e]);
	let d = t.flatMap((e) => e.channels.map((t) => ({
		d: e,
		c: t,
		s: n[e.entry_id]?.[t]?.status ?? null
	}))), m = t.length > 1, h = [
		{
			id: "all",
			label: "All",
			icon: ""
		},
		{
			id: "heat",
			label: "Heating",
			icon: "radiator"
		},
		...d.some(({ c: e }) => e === "water") ? [{
			id: "water",
			label: "Hot water",
			icon: "water-boiler"
		}] : [],
		...o.length ? [{
			id: "rooms",
			label: "Rooms",
			icon: "home-thermometer-outline"
		}] : []
	];
	return /* @__PURE__ */ (0, f.jsx)("div", {
		className: "home",
		children: t.length > 0 && /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
			/* @__PURE__ */ (0, f.jsx)("h3", {
				className: "home-section",
				children: "Quick actions"
			}),
			/* @__PURE__ */ (0, f.jsx)(M, {
				getHass: e,
				devices: t,
				status: n,
				limits: r
			}),
			/* @__PURE__ */ (0, f.jsx)("h3", {
				className: "home-section",
				children: "Your devices"
			}),
			h.length > 2 && /* @__PURE__ */ (0, f.jsx)("div", {
				className: "pills",
				role: "tablist",
				"aria-label": "Show",
				children: h.map((e) => /* @__PURE__ */ (0, f.jsxs)("button", {
					role: "tab",
					"aria-selected": c === e.id,
					className: `pill ${c === e.id ? "on" : ""}`,
					onClick: () => l(e.id),
					children: [
						e.icon && /* @__PURE__ */ (0, f.jsx)(p, { name: e.icon }),
						" ",
						e.label
					]
				}, e.id))
			}),
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "device-grid",
				children: [d.filter(({ c: e }) => c === "all" || c === e).map(({ d: t, c: a }) => /* @__PURE__ */ (0, f.jsx)(te, {
					getHass: e,
					device: t,
					channel: a,
					info: n[t.entry_id]?.[a],
					showDevice: m,
					limits: r,
					onOpen: () => i(t.entry_id, a)
				}, `${t.entry_id}-${a}`)), (c === "all" || c === "rooms") && o.map((i) => {
					let o = n[i.receiver ?? t[0]?.entry_id ?? ""]?.heat;
					return /* @__PURE__ */ (0, f.jsx)(P, {
						getHass: e,
						room: i,
						showReceiver: m,
						limits: r,
						defaultMinutes: o?.boost_minutes ?? 60,
						defaultTemp: o?.boost_temperature ?? 21,
						onOpen: () => a(i.id)
					}, i.id);
				})]
			})
		] })
	});
}
function M({ getHass: e, devices: t, status: n, limits: r }) {
	let [i, a] = (0, u.useState)(null), [o, s] = (0, u.useState)(null), [c, l] = (0, u.useState)(!1), d = t.length > 1, m = async (t, n, r) => {
		a(t);
		try {
			for (let t of n) await e().callWS(t);
			return s({
				ok: !0,
				text: r
			}), !0;
		} catch (e) {
			return s({
				ok: !1,
				text: b(e)
			}), !1;
		} finally {
			a(null);
		}
	}, h = [], g = t.flatMap((e) => e.channels.map((t) => ({
		d: e,
		c: t,
		info: n[e.entry_id]?.[t]
	}))), _ = g.map(({ info: e }) => e?.holiday).find((e) => e), v = g.find(({ c: e }) => e === "heat")?.info;
	_ ? h.push({
		id: "holiday-end",
		label: `End holiday · away until ${T(_.until)}`,
		icon: "home-import-outline",
		kind: "neutral",
		msgs: [{ type: "hive_local/holiday/cancel" }],
		done: "Welcome back: everything's back to what it was doing"
	}) : h.push({
		id: "holiday",
		label: "Away until…",
		icon: "bag-suitcase",
		kind: "neutral",
		msgs: [],
		done: "",
		open: () => l(!0)
	});
	for (let e of t) for (let t of e.channels) {
		let r = n[e.entry_id]?.[t];
		if (r?.status?.mode === "boost" && !r?.holiday?.holding) continue;
		let i = D(r?.boost_minutes ?? 30), a = t === "water" ? "hot water" : "heating";
		h.push({
			id: `boost-${e.entry_id}-${t}`,
			label: `Boost ${a} · ${i}${d ? ` (${e.name})` : ""}`,
			icon: "rocket-launch",
			kind: t,
			msgs: [{
				type: "hive_local/boost",
				entry_id: e.entry_id,
				channel: t
			}],
			done: `Boosting ${a} for ${i}`
		});
	}
	let y = t.flatMap((e) => e.channels.filter((t) => {
		let r = n[e.entry_id]?.[t], i = r?.status?.mode;
		return i && i !== "schedule" && !r?.holiday && !r?.demand?.active;
	}).map((t) => ({
		d: e,
		c: t
	})));
	return y.length && h.push({
		id: "schedule",
		label: "Everything back to schedule",
		icon: "calendar-clock",
		kind: "neutral",
		msgs: y.map(({ d: e, c: t }) => n[e.entry_id]?.[t]?.status?.mode === "boost" ? {
			type: "hive_local/cancel_boost",
			entry_id: e.entry_id,
			channel: t
		} : {
			type: "hive_local/mode",
			entry_id: e.entry_id,
			channel: t,
			mode: "schedule"
		}),
		done: "Back on the schedule"
	}), /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
		/* @__PURE__ */ (0, f.jsx)("div", {
			className: "quick",
			children: h.map((e) => /* @__PURE__ */ (0, f.jsxs)("button", {
				className: `quick-action ${e.kind}`,
				disabled: i != null,
				onClick: () => e.open ? e.open() : m(e.id, e.msgs, e.done),
				children: [/* @__PURE__ */ (0, f.jsx)("span", {
					className: "quick-icon",
					children: /* @__PURE__ */ (0, f.jsx)(p, { name: i === e.id ? "timer-sand" : e.icon })
				}), /* @__PURE__ */ (0, f.jsx)("span", {
					className: "quick-label",
					children: e.label
				})]
			}, e.id))
		}),
		o && /* @__PURE__ */ (0, f.jsx)("div", {
			className: `status ${o.ok ? "ok" : "error"}`,
			children: o.text
		}),
		c && /* @__PURE__ */ (0, f.jsx)(A, {
			hasHeat: g.some(({ c: e }) => e === "heat"),
			hasWater: g.some(({ c: e }) => e === "water"),
			frost: v?.frost_temperature ?? 12,
			limits: r,
			busy: i != null,
			onGo: (e, t) => m("holiday", [{
				type: "hive_local/holiday/set",
				until: e.toISOString(),
				temperature: t
			}], `Away until ${T(e)}`).then((e) => e && l(!1)),
			onClose: () => l(!1)
		})
	] });
}
var N = [
	30,
	60,
	120,
	180
];
function P({ getHass: e, room: t, showReceiver: n, limits: r, defaultMinutes: i, defaultTemp: a, onOpen: o, page: s }) {
	let [c, l] = (0, u.useState)(!1), [d, m] = (0, u.useState)(!1), [h, g] = (0, u.useState)(""), _ = async (n) => {
		m(!0);
		try {
			await e().callWS({
				room_id: t.id,
				...n
			}), g(""), l(!1);
		} catch (e) {
			g(b(e));
		} finally {
			m(!1);
		}
	}, v = t.boost ?? null, y = v ? `${v.temperature}°` : t.target == null ? t.target_range ? `${t.target_range[0]}–${t.target_range[1]}°` : null : `${t.target}°`, x = v ? `Boost · ${D(v.remaining)} left` : `${t.valves.length} valve${t.valves.length === 1 ? "" : "s"}`, S = (e) => Math.min(r?.heat_max ?? 32, Math.max(5, Math.round(e * 2) / 2)), C = Math.min(360, Math.max(15, i)), w = [.../* @__PURE__ */ new Set([...N, C])].sort((e, t) => e - t);
	return /* @__PURE__ */ (0, f.jsxs)("section", {
		className: `card device room-device ${t.heating ? "heating" : "idle"}`,
		children: [
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "device-head",
				...s ? {} : {
					role: "button",
					tabIndex: 0,
					onClick: o,
					onKeyDown: (e) => e.key === "Enter" && o?.()
				},
				children: [/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "device-row",
					children: [
						/* @__PURE__ */ (0, f.jsx)("span", {
							className: "device-icon room",
							children: /* @__PURE__ */ (0, f.jsx)(p, { name: "home-thermometer-outline" })
						}),
						/* @__PURE__ */ (0, f.jsxs)("div", {
							className: "device-name",
							children: [/* @__PURE__ */ (0, f.jsx)("span", { children: t.name }), /* @__PURE__ */ (0, f.jsxs)("span", {
								className: "muted small",
								children: [n && t.receiver_name ? `${t.receiver_name} · ${x}` : x, t.battery_low ? /* @__PURE__ */ (0, f.jsxs)("span", {
									className: "warn",
									children: [
										" · battery ",
										t.lowest_battery,
										"%"
									]
								}) : t.unavailable.length ? /* @__PURE__ */ (0, f.jsxs)("span", {
									className: "warn",
									children: [
										" · ",
										t.unavailable.length,
										" not responding"
									]
								}) : null]
							})]
						}),
						/* @__PURE__ */ (0, f.jsx)("span", {
							className: "device-status",
							children: t.heating ? /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
								"Heating to ",
								/* @__PURE__ */ (0, f.jsx)("b", { children: y }),
								" ",
								/* @__PURE__ */ (0, f.jsx)(p, {
									name: "fire",
									className: "status-icon heat"
								})
							] }) : y ? /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: ["Target ", /* @__PURE__ */ (0, f.jsx)("b", { children: y })] }) : "No target"
						})
					]
				}), /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "device-row",
					children: [/* @__PURE__ */ (0, f.jsxs)("div", {
						className: "device-big",
						children: [
							t.current_temperature == null ? "–" : t.current_temperature.toFixed(1),
							/* @__PURE__ */ (0, f.jsx)("span", { children: "°" }),
							/* @__PURE__ */ (0, f.jsx)("small", { children: t.temperature_source === "sensor" ? "Actual" : "Valves" })
						]
					}), /* @__PURE__ */ (0, f.jsxs)("button", {
						className: `device-action ${v ? "boosting" : ""}`,
						disabled: d,
						onClick: (e) => {
							e.stopPropagation(), l(!0);
						},
						children: [
							/* @__PURE__ */ (0, f.jsx)(p, { name: "rocket-launch" }),
							" ",
							v ? "Boosting" : "Boost"
						]
					})]
				})]
			}),
			h && /* @__PURE__ */ (0, f.jsx)("div", {
				className: "status error",
				children: h
			}),
			c && /* @__PURE__ */ (0, f.jsx)(ne, {
				title: v ? "Boosting" : "Boost",
				subtitle: t.name,
				water: !1,
				boosting: !!v,
				preheatFor: null,
				remaining: v?.remaining ?? null,
				boostTarget: v?.temperature ?? null,
				defaultMinutes: C,
				defaultTemp: S(a),
				durations: w,
				clampTemp: S,
				busy: d,
				onBoost: (e, t) => _({
					type: "hive_local/rooms/boost",
					minutes: e,
					temperature: t
				}),
				onStop: () => _({ type: "hive_local/rooms/cancel_boost" }),
				onClose: () => l(!1)
			})
		]
	});
}
function te({ getHass: e, device: t, channel: n, info: r, showDevice: i, limits: a, onOpen: o, page: s = !1 }) {
	let c = n === "water", l = r?.status ?? null, { busy: d, result: m, send: h } = x(e, t.entry_id, n), g = !!l && l.mode !== "off" && l.heating, v = !l || l.mode === "off" ? "off" : g ? "heating" : "idle", y = !c && l?.setpoint != null && l.setpoint <= 1, b = c || l?.setpoint == null ? null : y ? r?.frost_temperature ?? null : l.setpoint, S = [
		{
			id: "schedule",
			label: "Schedule"
		},
		{
			id: "manual",
			label: c ? "Always on" : "Manual"
		},
		{
			id: "off",
			label: "Off"
		}
	], C = r?.boost_minutes ?? 30, w = r?.boost_temperature ?? 21, [O, k] = (0, u.useState)(!1), A = a?.boost_min_temp ?? 5, j = a?.heat_max ?? 32, M = (e) => Math.min(j, Math.max(A, Math.round(e * 2) / 2)), N = [.../* @__PURE__ */ new Set([...ee, C])].filter((e) => e <= (a?.boost_max_minutes ?? 360)).sort((e, t) => e - t), [P, te] = (0, u.useState)(null), re = (0, u.useRef)();
	(0, u.useEffect)(() => () => window.clearTimeout(re.current), []), (0, u.useEffect)(() => te(null), [l?.setpoint, l?.mode]);
	let F = !c && !!l && l.mode !== "off", ie = (e) => {
		let t = M((P ?? b ?? 20) + e);
		te(t), window.clearTimeout(re.current), re.current = window.setTimeout(() => {
			h({
				type: "hive_local/target",
				temperature: t
			}, `Set to ${t}°`).then(() => window.setTimeout(() => te(null), 8e3));
		}, 1200);
	}, ae = P ?? b, oe = (e, t) => h({
		type: "hive_local/boost",
		minutes: e,
		...c ? {} : { temperature: t }
	}, `Boosting for ${D(e)}`).then(() => k(!1)), se = !!r?.holiday?.holding, ce = l ? se ? "Away at" : l.mode === "boost" ? "Boost to" : y && P == null ? "Frost" : l.mode === "manual" ? "Hold at" : "Target" : "", le = l?.mode === "boost" && !se, ue = le ? r?.preheat?.active_for ?? null : null, de = ue != null, fe = le && !de && r?.demand?.active ? E(r.demand.rooms) : null, pe = "Waiting for the receiver…";
	l && (pe = l.mode === "off" ? "Off" : le ? c ? /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: ["Boosting ", /* @__PURE__ */ (0, f.jsx)(p, {
		name: "rocket-launch",
		className: "status-icon"
	})] }) : /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
		"Boosting to ",
		/* @__PURE__ */ (0, f.jsxs)("b", { children: [l.setpoint, "°"] }),
		" ",
		/* @__PURE__ */ (0, f.jsx)(p, {
			name: "rocket-launch",
			className: "status-icon"
		})
	] }) : c ? g ? /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: ["Heating water ", /* @__PURE__ */ (0, f.jsx)(p, {
		name: "water",
		className: "status-icon"
	})] }) : "Not heating now" : g ? /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
		"Heating to ",
		/* @__PURE__ */ (0, f.jsxs)("b", { children: [b, "°"] }),
		" ",
		/* @__PURE__ */ (0, f.jsx)(p, {
			name: "fire",
			className: "status-icon"
		})
	] }) : y ? /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: ["Frost protection ", /* @__PURE__ */ (0, f.jsxs)("b", { children: [b, "°"] })] }) : b == null ? "Idle" : /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
		"Target ",
		/* @__PURE__ */ (0, f.jsxs)("b", { children: [b, "°"] }),
		" ",
		/* @__PURE__ */ (0, f.jsx)(p, {
			name: "check-circle-outline",
			className: "status-icon done"
		})
	] })), l && de && (pe = /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
		"Pre-heating to ",
		/* @__PURE__ */ (0, f.jsxs)("b", { children: [l.setpoint, "°"] }),
		" ",
		/* @__PURE__ */ (0, f.jsx)(p, {
			name: "sun-clock",
			className: "status-icon"
		})
	] })), l && fe && (pe = /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: ["Heating for rooms ", /* @__PURE__ */ (0, f.jsx)(p, {
		name: "home-thermometer-outline",
		className: "status-icon"
	})] }));
	let me = r?.holiday ?? null, he = me ? `Away until ${T(me.until)}` : null;
	l && me && !le && !g && (pe = c ? /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: ["Off while away ", /* @__PURE__ */ (0, f.jsx)(p, {
		name: "bag-suitcase",
		className: "status-icon away"
	})] }) : /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
		"Away ",
		/* @__PURE__ */ (0, f.jsxs)("b", { children: [l.setpoint, "°"] }),
		" ",
		/* @__PURE__ */ (0, f.jsx)(p, {
			name: "bag-suitcase",
			className: "status-icon away"
		})
	] }));
	let I = l ? he && !le ? he : de ? `Pre-heating for ${r?.preheat?.active_for}` : fe ? `Heating for ${fe}` : l.mode === "boost" ? l.boost_remaining == null ? "Boost" : `Boost · ${D(l.boost_remaining)} left` : l.mode === "schedule" ? "On schedule" : S.find((e) => e.id === l.mode)?.label : "", ge = s;
	return /* @__PURE__ */ (0, f.jsxs)("section", {
		className: `card device ${n} ${v} ${s ? "page" : ""}`,
		children: [
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "device-head",
				...s ? {} : {
					role: "button",
					tabIndex: 0,
					onClick: o,
					onKeyDown: (e) => e.key === "Enter" && e.target === e.currentTarget && o?.()
				},
				children: [/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "device-row",
					children: [
						/* @__PURE__ */ (0, f.jsx)("span", {
							className: `device-icon ${n}`,
							children: /* @__PURE__ */ (0, f.jsx)(p, { name: c ? "water-boiler" : "radiator" })
						}),
						/* @__PURE__ */ (0, f.jsxs)("div", {
							className: "device-name",
							children: [/* @__PURE__ */ (0, f.jsx)("span", { children: _[n] }), /* @__PURE__ */ (0, f.jsx)("span", {
								className: "muted small",
								children: i ? `${t.name} · ${I}` : I
							})]
						}),
						/* @__PURE__ */ (0, f.jsx)("span", {
							className: "device-status",
							children: pe
						})
					]
				}), /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "device-row",
					children: [/* @__PURE__ */ (0, f.jsxs)("div", {
						className: "device-big",
						children: [
							c ? l ? l.mode === "off" ? "Off" : g ? "On" : "Idle" : "–" : l?.current_temperature == null ? "–" : l.current_temperature.toFixed(1),
							!c && /* @__PURE__ */ (0, f.jsx)("span", { children: "°" }),
							/* @__PURE__ */ (0, f.jsx)("small", { children: c ? "Now" : "Actual" })
						]
					}), /* @__PURE__ */ (0, f.jsxs)("button", {
						className: `device-action ${le ? "boosting" : ""}`,
						disabled: d || !l,
						onClick: (e) => {
							e.stopPropagation(), k(!0);
						},
						children: [
							/* @__PURE__ */ (0, f.jsx)(p, { name: de ? "sun-clock" : fe ? "home-thermometer-outline" : "rocket-launch" }),
							" ",
							de ? "Pre-heating" : fe ? "For rooms" : le ? "Boosting" : "Boost"
						]
					})]
				})]
			}),
			ge && /* @__PURE__ */ (0, f.jsxs)("div", {
				className: "device-body",
				children: [
					!c && /* @__PURE__ */ (0, f.jsxs)("div", {
						className: "target-row",
						children: [/* @__PURE__ */ (0, f.jsxs)("div", {
							className: "target-text",
							children: [/* @__PURE__ */ (0, f.jsx)("span", {
								className: "target-label",
								children: ce || "Target"
							}), /* @__PURE__ */ (0, f.jsx)("span", {
								className: "muted small",
								children: l ? se && me ? `While you're away, until ${T(me.until)}` : l.mode === "off" ? "Turn the heating on to set a target" : l.mode === "schedule" ? "Until the next scheduled change" : l.mode === "boost" ? "Keeps the boost time left" : "Held until you change it" : ""
							})]
						}), /* @__PURE__ */ (0, f.jsxs)("div", {
							className: "target-control",
							children: [
								/* @__PURE__ */ (0, f.jsx)("button", {
									className: "round target-btn",
									disabled: !F,
									onClick: () => ie(-.5),
									"aria-label": "Lower the target",
									children: /* @__PURE__ */ (0, f.jsx)(p, { name: "minus" })
								}),
								/* @__PURE__ */ (0, f.jsx)("span", {
									className: `target-value ${P == null ? "" : "pending"}`,
									children: ae != null && l?.mode !== "off" ? `${ae.toFixed(1)}°` : "–"
								}),
								/* @__PURE__ */ (0, f.jsx)("button", {
									className: "round target-btn",
									disabled: !F,
									onClick: () => ie(.5),
									"aria-label": "Raise the target",
									children: /* @__PURE__ */ (0, f.jsx)(p, { name: "plus" })
								})
							]
						})]
					}),
					me && /* @__PURE__ */ (0, f.jsxs)("div", {
						className: "holiday-row",
						children: [
							/* @__PURE__ */ (0, f.jsx)(p, { name: "bag-suitcase" }),
							/* @__PURE__ */ (0, f.jsxs)("span", {
								className: "holiday-text",
								children: [
									he,
									", then back to ",
									me.restore_mode === "schedule" ? "the schedule" : S.find((e) => e.id === me.restore_mode)?.label.toLowerCase()
								]
							}),
							/* @__PURE__ */ (0, f.jsx)("button", {
								className: "ghost",
								disabled: d,
								onClick: () => h({ type: "hive_local/holiday/cancel" }, "Holiday ended"),
								children: "End"
							})
						]
					}),
					/* @__PURE__ */ (0, f.jsx)("div", {
						className: "segmented full",
						children: S.map((e) => /* @__PURE__ */ (0, f.jsx)("button", {
							className: l?.mode === e.id || (de || fe) && e.id === "schedule" ? "on" : "",
							disabled: d || !l,
							onClick: () => h({
								type: "hive_local/mode",
								mode: e.id
							}, e.id === "schedule" ? "Following the schedule" : e.label),
							children: e.label
						}, e.id))
					})
				]
			}),
			m?.kind === "error" && /* @__PURE__ */ (0, f.jsx)("div", {
				className: "status error",
				children: m.text
			}),
			O && /* @__PURE__ */ (0, f.jsx)(ne, {
				title: de ? "Pre-heating" : fe ? "Heating for rooms" : le ? "Boosting" : "Boost",
				subtitle: i ? `${t.name} · ${_[n]}` : _[n],
				water: c,
				boosting: le,
				preheatFor: ue,
				demandFor: fe,
				remaining: l?.boost_remaining ?? null,
				boostTarget: le ? l?.setpoint ?? null : null,
				defaultMinutes: C,
				defaultTemp: w,
				durations: N,
				clampTemp: M,
				busy: d,
				onBoost: oe,
				onStop: () => h({ type: "hive_local/cancel_boost" }, fe ? "Back to the schedule" : "Boost cancelled").then(() => k(!1)),
				onClose: () => k(!1)
			})
		]
	});
}
function ne({ title: e, subtitle: t, water: n, boosting: r, preheatFor: i, demandFor: a, remaining: o, boostTarget: s, defaultMinutes: c, defaultTemp: l, durations: d, clampTemp: m, busy: h, onBoost: g, onStop: _, onClose: v }) {
	let [y, b] = (0, u.useState)(c), [x, S] = (0, u.useState)(l);
	return (0, u.useEffect)(() => {
		let e = (e) => e.key === "Escape" && v();
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [v]), /* @__PURE__ */ (0, f.jsx)("div", {
		className: "sheet-backdrop",
		onClick: (e) => {
			e.stopPropagation(), v();
		},
		children: /* @__PURE__ */ (0, f.jsxs)("div", {
			className: `sheet ${n ? "water" : "heat"}`,
			role: "dialog",
			"aria-modal": "true",
			"aria-label": `${e} ${t}`,
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, f.jsx)("span", { className: "sheet-handle" }),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "sheet-title",
					children: [/* @__PURE__ */ (0, f.jsx)("h2", { children: e }), /* @__PURE__ */ (0, f.jsx)("span", {
						className: "muted",
						children: t
					})]
				}),
				r ? /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "sheet-live",
					children: [/* @__PURE__ */ (0, f.jsx)(p, { name: "clock-outline" }), /* @__PURE__ */ (0, f.jsx)("span", { children: i ? `Warming up${s == null ? "" : ` to ${s}°`} for ${i}, when your schedule changes` : a ? `Heating for ${a} until warm, then back to your schedule` : /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [o == null ? "Boosting" : `${D(o)} left`, !n && s != null ? ` · to ${s}°` : ""] }) })]
				}) : /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [!n && /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "sheet-field",
					children: [/* @__PURE__ */ (0, f.jsx)("span", {
						className: "sheet-label",
						children: "Temperature"
					}), /* @__PURE__ */ (0, f.jsxs)("div", {
						className: "sheet-temp",
						children: [
							/* @__PURE__ */ (0, f.jsx)("button", {
								className: "round sheet-step",
								onClick: () => S(m(x - .5)),
								"aria-label": "Lower",
								children: /* @__PURE__ */ (0, f.jsx)(p, { name: "minus" })
							}),
							/* @__PURE__ */ (0, f.jsxs)("span", {
								className: "sheet-temp-value",
								children: [x.toFixed(1), "°"]
							}),
							/* @__PURE__ */ (0, f.jsx)("button", {
								className: "round sheet-step",
								onClick: () => S(m(x + .5)),
								"aria-label": "Raise",
								children: /* @__PURE__ */ (0, f.jsx)(p, { name: "plus" })
							})
						]
					})]
				}), /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "sheet-field",
					children: [/* @__PURE__ */ (0, f.jsx)("span", {
						className: "sheet-label",
						children: "How long"
					}), /* @__PURE__ */ (0, f.jsx)("div", {
						className: "sheet-lengths",
						role: "radiogroup",
						"aria-label": "How long",
						children: d.map((e) => /* @__PURE__ */ (0, f.jsx)("button", {
							role: "radio",
							"aria-checked": e === y,
							className: e === y ? "on" : "",
							onClick: () => b(e),
							children: D(e)
						}, e))
					})]
				})] }),
				r ? /* @__PURE__ */ (0, f.jsxs)("button", {
					className: "sheet-go stop",
					disabled: h,
					onClick: _,
					children: [
						/* @__PURE__ */ (0, f.jsx)("span", { className: "stop-square" }),
						" ",
						i ? "Stop pre-heating" : a ? "Stop for now" : "Stop boost"
					]
				}) : /* @__PURE__ */ (0, f.jsx)("button", {
					className: "sheet-go",
					disabled: h,
					onClick: () => g(y, x),
					children: n ? `Boost hot water for ${D(y)}` : `Boost to ${x.toFixed(1)}° for ${D(y)}`
				}),
				/* @__PURE__ */ (0, f.jsx)("button", {
					className: "ghost sheet-cancel",
					onClick: v,
					children: "Cancel"
				})
			]
		})
	});
}
// src/Preheat.tsx
var re = [
	60,
	90,
	120,
	180
];
function F({ getHass: e, device: t, info: n }) {
	let { busy: r, result: i, send: a } = x(e, t.entry_id, "heat"), o = [.../* @__PURE__ */ new Set([...re, n.max_lead])].sort((e, t) => e - t), s;
	return s = n.enabled ? n.active_for ? `Pre-heating now, for ${n.active_for}.` : n.rate == null && n.rate_known === !1 ? "Working out how fast your home warms up…" : n.rate == null ? `Still learning how fast your home warms up (${n.warmups} of ${n.warmups_needed} warm-ups seen).` : n.schedule_known ? n.next?.skipped ? `Not pre-heating for ${n.next.at}: it was stopped early. Turn pre-heat off and on to start it again.` : n.next ? `Next: starts ${n.next.start} to reach ${n.next.setpoint}° by ${n.next.at}.` : "Nothing to pre-heat for yet." : "Reading the heating schedule…" : "Start heating early, so it's warm by the time the schedule says.", /* @__PURE__ */ (0, f.jsxs)("section", {
		className: "card preheat",
		children: [
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "target-row",
				children: [/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "device-row",
					children: [/* @__PURE__ */ (0, f.jsx)("span", {
						className: "device-icon",
						children: /* @__PURE__ */ (0, f.jsx)(p, { name: "sun-clock" })
					}), /* @__PURE__ */ (0, f.jsxs)("div", {
						className: "target-text",
						children: [/* @__PURE__ */ (0, f.jsx)("span", {
							className: "target-label",
							children: "Pre-heat"
						}), /* @__PURE__ */ (0, f.jsx)("span", {
							className: "muted small",
							children: s
						})]
					})]
				}), /* @__PURE__ */ (0, f.jsx)("div", {
					className: "segmented",
					role: "radiogroup",
					"aria-label": "Pre-heat",
					children: [!0, !1].map((e) => /* @__PURE__ */ (0, f.jsx)("button", {
						role: "radio",
						"aria-checked": n.enabled === e,
						className: n.enabled === e ? "on" : "",
						disabled: r,
						onClick: () => a({
							type: "hive_local/preheat",
							enabled: e
						}, e ? "Pre-heat on" : "Pre-heat off"),
						children: e ? "On" : "Off"
					}, String(e)))
				})]
			}),
			n.enabled && /* @__PURE__ */ (0, f.jsxs)("div", {
				className: "target-row",
				children: [/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "target-text",
					children: [/* @__PURE__ */ (0, f.jsx)("span", { children: "Start at most" }), /* @__PURE__ */ (0, f.jsx)("span", {
						className: "muted small",
						children: n.rate == null ? "Before the scheduled time" : `Your home warms about ${n.rate.toFixed(1)}° an hour`
					})]
				}), /* @__PURE__ */ (0, f.jsx)("div", {
					className: "segmented",
					role: "radiogroup",
					"aria-label": "Start at most",
					children: o.map((e) => /* @__PURE__ */ (0, f.jsx)("button", {
						role: "radio",
						"aria-checked": n.max_lead === e,
						className: n.max_lead === e ? "on" : "",
						disabled: r,
						onClick: () => a({
							type: "hive_local/preheat",
							max_lead: e
						}, "Saved"),
						children: e % 60 ? `${e / 60} h`.replace(".5 h", "½ h") : `${e / 60} h`
					}, e))
				})]
			}),
			i?.kind === "error" && /* @__PURE__ */ (0, f.jsx)("div", {
				className: "status error",
				children: i.text
			})
		]
	});
}
// src/ScheduleEditor.tsx
var ie = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday"
], ae = ["saturday", "sunday"], oe = (e) => e[0].toUpperCase() + e.slice(1, 3), se = (e) => {
	let [t, n] = e.split(":").map(Number);
	return t * 60 + n;
};
function ce({ getHass: e, device: t, channel: n, limits: r, mode: i, preheatFor: a, demandFor: o, source: s }) {
	let [c, l] = (0, u.useState)({}), [d, m] = (0, u.useState)({}), [h, _] = (0, u.useState)("monday"), [v, y] = (0, u.useState)({ kind: "idle" }), [x, S] = (0, u.useState)(!1), C = t?.entry_id, w = n === "water", T = JSON.stringify(c) !== JSON.stringify(d), E = s?.noun ?? "receiver", D = (0, u.useCallback)(async () => {
		y({
			kind: "busy",
			text: `Reading from the ${E}…`
		}), S(!0), s?.onReading?.(!0);
		try {
			let t = s ? await s.read() : await e().callWS({
				type: "hive_local/get",
				entry_id: C,
				channel: n
			});
			l(t.edited ?? t.schedule), m(t.schedule);
			let r = Object.keys(t.schedule).length;
			y(t.complete && t.note ? {
				kind: "ok",
				text: t.note
			} : t.complete ? {
				kind: "ok",
				text: `Schedule read from the ${E}`
			} : r ? {
				kind: "error",
				text: `Only got ${r}/7 days — try reading again`
			} : {
				kind: "error",
				text: s ? `No reply from the ${E}. They sleep between check-ins: press a valve's dial to wake it and try again.` : "No reply. On Zigbee2MQTT, check the receiver's friendly name; on ZHA, check the receiver is online."
			});
		} catch (e) {
			y({
				kind: "error",
				text: b(e)
			});
		} finally {
			S(!1), s?.onReading?.(!1);
		}
	}, [
		C,
		n,
		e,
		E
	]);
	(0, u.useEffect)(() => {
		D();
	}, [D]), (0, u.useEffect)(() => {
		if (v.kind !== "ok") return;
		let e = setTimeout(() => y({ kind: "idle" }), 4e3);
		return () => clearTimeout(e);
	}, [v]);
	let O = async () => {
		let t = Object.fromEntries(g.filter((e) => JSON.stringify(c[e]) !== JSON.stringify(d[e]) && c[e]?.length).map((e) => [e, c[e]]));
		if (Object.keys(t).length) {
			y({
				kind: "busy",
				text: `Writing to the ${E}…`
			});
			try {
				let r = s ? await s.write(t) : await e().callWS({
					type: "hive_local/set",
					entry_id: C,
					channel: n,
					schedule: t
				}), i = {
					...c,
					...r.schedule
				};
				l(i), m(i);
				let a = Object.keys(r.schedule).map((e) => e[0].toUpperCase() + e.slice(1, 3));
				y({
					kind: r.error ? "error" : "ok",
					text: r.note ?? `Wrote ${a.join(", ")}. Read back to confirm the ${E} kept it.`
				});
			} catch (e) {
				y({
					kind: "error",
					text: b(e)
				});
			}
		}
	}, k = c[h] ?? [], A = r.max_transitions, ee = (e) => l((t) => ({
		...t,
		[h]: [...e].sort((e, t) => se(e.time) - se(t.time))
	})), j = () => {
		let e = k[k.length - 1], t = e ? le(k, se(e.time) + 60) : "06:00", n = w ? r.water_on : e?.setpoint ?? 20;
		ee([...k, {
			time: t,
			setpoint: n
		}]);
	}, M = (e) => l((t) => {
		let n = { ...t };
		for (let t of e) n[t] = k.map((e) => ({ ...e }));
		return n;
	}), N = (0, u.useMemo)(() => {
		let e = Object.values(c).flat().map((e) => e.setpoint).filter((e) => e > r.heat_min);
		return {
			lo: Math.min(15, ...e),
			hi: Math.max(24, ...e)
		};
	}, [c, r.heat_min]), P = g[((/* @__PURE__ */ new Date()).getDay() + 6) % 7], [te, ne] = (0, u.useState)(null), [re, F] = (0, u.useState)(!1), ce = g.filter((e) => JSON.stringify(c[e]) !== JSON.stringify(d[e])), pe = g[(g.indexOf(h) + 1) % 7], me = (c[pe] ?? [])[0]?.time, he = (e) => w ? e.setpoint < r.water_on : fe(e.setpoint, r), I = "Stored on the receiver, so it keeps running without Home Assistant.";
	return s?.statusLine ? I = s.statusLine : i === "schedule" ? I = "Your schedule is running." : i === "manual" ? I = `Your schedule isn't being used: ${w ? "hot water is always on" : "heating is on Manual"}.` : i === "off" ? I = `Your schedule isn't being used: ${w ? "hot water" : "heating"} is off.` : i === "boost" && a ? I = `Your schedule is running, starting early so it's warm by ${a}.` : i === "boost" && o ? I = `Your schedule is running, with extra heat for ${o}.` : i === "boost" && (I = "Boosting now. Your schedule carries on after the boost."), /* @__PURE__ */ (0, f.jsxs)("div", {
		className: `sched ${s?.embedded ? "embedded" : ""}`,
		children: [
			/* @__PURE__ */ (0, f.jsx)("p", {
				className: "sched-status muted",
				children: I
			}),
			/* @__PURE__ */ (0, f.jsx)("div", {
				className: "sched-days",
				role: "tablist",
				"aria-label": "Day",
				children: g.map((e) => /* @__PURE__ */ (0, f.jsxs)("button", {
					role: "tab",
					"aria-selected": e === h,
					"aria-label": e,
					className: `sched-day ${e === h ? "on" : ""} ${e === P ? "today" : ""}`,
					onClick: () => {
						_(e), ne(null);
					},
					children: [e[0].toUpperCase(), ce.includes(e) && /* @__PURE__ */ (0, f.jsx)("i", {
						className: "sched-dot",
						"aria-label": "changed"
					})]
				}, e))
			}),
			v.text && v.kind !== "idle" && /* @__PURE__ */ (0, f.jsx)("div", {
				className: `status ${v.kind}`,
				children: v.text
			}),
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "sched-list",
				children: [
					k.length === 0 && /* @__PURE__ */ (0, f.jsxs)("p", {
						className: "muted sched-empty",
						children: [
							"Nothing scheduled on ",
							h[0].toUpperCase() + h.slice(1),
							" yet."
						]
					}),
					k.map((e, t) => {
						let n = k[t + 1]?.time ?? (me ? `${me} (${oe(pe)})` : "00:00"), i = he(e);
						return /* @__PURE__ */ (0, f.jsxs)("button", {
							className: "slot",
							onClick: () => ne(t),
							disabled: x,
							children: [
								/* @__PURE__ */ (0, f.jsx)("span", {
									className: `slot-badge ${i ? "off" : ""}`,
									style: i ? void 0 : { borderColor: w ? "var(--hl-brand)" : ue(e.setpoint, N, r) },
									children: i ? /* @__PURE__ */ (0, f.jsx)(p, { name: w ? "power" : "snowflake" }) : w ? "On" : `${e.setpoint}°`
								}),
								/* @__PURE__ */ (0, f.jsxs)("span", {
									className: "slot-time",
									children: [
										e.time,
										" – ",
										n
									]
								}),
								/* @__PURE__ */ (0, f.jsx)(p, {
									name: "chevron-right",
									className: "slot-chev"
								})
							]
						}, t);
					}),
					/* @__PURE__ */ (0, f.jsxs)("button", {
						className: "slot slot-add",
						onClick: () => {
							j(), ne(k.length);
						},
						disabled: x || k.length >= A,
						children: [/* @__PURE__ */ (0, f.jsx)("span", {
							className: "slot-badge add",
							children: /* @__PURE__ */ (0, f.jsx)(p, { name: "plus" })
						}), /* @__PURE__ */ (0, f.jsx)("span", {
							className: "slot-time",
							children: k.length >= A ? `${A} times a day at most` : "Add a time"
						})]
					})
				]
			}),
			T && /* @__PURE__ */ (0, f.jsxs)("div", {
				className: "sched-save",
				children: [
					/* @__PURE__ */ (0, f.jsx)(p, {
						name: "pencil-outline",
						className: "sched-save-icon"
					}),
					/* @__PURE__ */ (0, f.jsx)("span", {
						className: "sched-changed",
						title: `Changed: ${ce.map(oe).join(", ")}`,
						children: "Unsaved changes"
					}),
					/* @__PURE__ */ (0, f.jsx)("button", {
						className: "sched-undo",
						onClick: () => {
							l(d), ne(null);
						},
						disabled: x,
						children: "Undo"
					}),
					/* @__PURE__ */ (0, f.jsx)("button", {
						className: "sched-write",
						onClick: O,
						disabled: v.kind === "busy",
						children: "Save"
					})
				]
			}),
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: `fab-wrap ${T ? "raised" : ""}`,
				children: [re && /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [/* @__PURE__ */ (0, f.jsx)("div", {
					className: "fab-backdrop",
					onClick: () => F(!1)
				}), /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "fab-menu",
					role: "menu",
					children: [
						/* @__PURE__ */ (0, f.jsxs)("button", {
							role: "menuitem",
							onClick: () => {
								F(!1), D();
							},
							disabled: v.kind === "busy",
							children: [
								/* @__PURE__ */ (0, f.jsx)(p, { name: "download" }),
								" Read from the ",
								E
							]
						}),
						/* @__PURE__ */ (0, f.jsxs)("button", {
							role: "menuitem",
							onClick: () => {
								F(!1), M(ie);
							},
							disabled: x || !k.length,
							children: [
								/* @__PURE__ */ (0, f.jsx)(p, { name: "content-copy" }),
								" Copy ",
								oe(h),
								" to weekdays"
							]
						}),
						/* @__PURE__ */ (0, f.jsxs)("button", {
							role: "menuitem",
							onClick: () => {
								F(!1), M(ae);
							},
							disabled: x || !k.length,
							children: [
								/* @__PURE__ */ (0, f.jsx)(p, { name: "content-copy" }),
								" Copy ",
								oe(h),
								" to the weekend"
							]
						}),
						/* @__PURE__ */ (0, f.jsxs)("button", {
							role: "menuitem",
							onClick: () => {
								F(!1), M([...g]);
							},
							disabled: x || !k.length,
							children: [
								/* @__PURE__ */ (0, f.jsx)(p, { name: "content-copy" }),
								" Copy ",
								oe(h),
								" to every day"
							]
						})
					]
				})] }), /* @__PURE__ */ (0, f.jsx)("button", {
					className: "fab",
					"aria-label": "More",
					"aria-expanded": re,
					onClick: () => F(!re),
					children: /* @__PURE__ */ (0, f.jsx)(p, { name: re ? "close" : "dots-horizontal" })
				})]
			}),
			te != null && k[te] && /* @__PURE__ */ (0, f.jsx)(de, {
				slot: k[te],
				dayName: h[0].toUpperCase() + h.slice(1),
				isWater: w,
				limits: r,
				canDelete: !0,
				onChange: (e) => ee(k.map((t, n) => n === te ? e : t)),
				onDelete: () => {
					ee(k.filter((e, t) => t !== te)), ne(null);
				},
				onClose: () => ne(null)
			})
		]
	});
}
function le(e, t) {
	let n = new Set(e.map((e) => se(e.time))), r = Math.min(t, 1410);
	for (; n.has(r) && r < 1439;) r += 15;
	return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function ue(e, t, n) {
	if (e <= n.heat_min) return "var(--hl-off-fill)";
	let r = Math.min(1, Math.max(0, (e - t.lo) / Math.max(1, t.hi - t.lo)));
	return `hsl(${Math.round(42 - 34 * r)} ${Math.round(88 + 4 * r)}% ${Math.round(64 - 14 * r)}%)`;
}
function de({ slot: e, dayName: t, isWater: n, limits: r, canDelete: i, onChange: a, onDelete: o, onClose: s }) {
	(0, u.useEffect)(() => {
		let e = (e) => e.key === "Escape" && s();
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [s]);
	let c = n ? e.setpoint < r.water_on : fe(e.setpoint, r), l = (e) => Math.min(r.heat_max, Math.max(5, Math.round(e * 2) / 2)), d = c ? 20 : e.setpoint;
	return /* @__PURE__ */ (0, f.jsx)("div", {
		className: "sheet-backdrop",
		onClick: s,
		children: /* @__PURE__ */ (0, f.jsxs)("div", {
			className: "sheet heat",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": `Edit ${t} at ${e.time}`,
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, f.jsx)("span", { className: "sheet-handle" }),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "sheet-title",
					children: [/* @__PURE__ */ (0, f.jsx)("h2", { children: e.time }), /* @__PURE__ */ (0, f.jsx)("span", {
						className: "muted",
						children: t
					})]
				}),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "sheet-field",
					children: [/* @__PURE__ */ (0, f.jsx)("span", {
						className: "sheet-label",
						children: "Starts at"
					}), /* @__PURE__ */ (0, f.jsx)("input", {
						className: "sheet-time",
						type: "time",
						value: e.time,
						onChange: (t) => t.target.value && a({
							...e,
							time: t.target.value
						})
					})]
				}),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "sheet-field",
					children: [/* @__PURE__ */ (0, f.jsx)("span", {
						className: "sheet-label",
						children: n ? "Hot water" : "Heating"
					}), /* @__PURE__ */ (0, f.jsxs)("div", {
						className: "sheet-lengths",
						children: [/* @__PURE__ */ (0, f.jsx)("button", {
							className: c ? "" : "on",
							onClick: () => a({
								...e,
								setpoint: n ? r.water_on : d
							}),
							children: n ? "On" : "Heat to"
						}), /* @__PURE__ */ (0, f.jsx)("button", {
							className: c ? "on" : "",
							onClick: () => a({
								...e,
								setpoint: n ? r.water_off : r.frost ?? r.heat_min
							}),
							children: "Off"
						})]
					})]
				}),
				!n && !c && /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "sheet-field",
					children: [/* @__PURE__ */ (0, f.jsx)("span", {
						className: "sheet-label",
						children: "Temperature"
					}), /* @__PURE__ */ (0, f.jsxs)("div", {
						className: "sheet-temp",
						children: [
							/* @__PURE__ */ (0, f.jsx)("button", {
								className: "round sheet-step",
								onClick: () => a({
									...e,
									setpoint: l(e.setpoint - .5)
								}),
								"aria-label": "Lower",
								children: /* @__PURE__ */ (0, f.jsx)(p, { name: "minus" })
							}),
							/* @__PURE__ */ (0, f.jsxs)("span", {
								className: "sheet-temp-value",
								children: [e.setpoint.toFixed(1), "°"]
							}),
							/* @__PURE__ */ (0, f.jsx)("button", {
								className: "round sheet-step",
								onClick: () => a({
									...e,
									setpoint: l(e.setpoint + .5)
								}),
								"aria-label": "Raise",
								children: /* @__PURE__ */ (0, f.jsx)(p, { name: "plus" })
							})
						]
					})]
				}),
				!n && c && /* @__PURE__ */ (0, f.jsx)("p", {
					className: "muted small sheet-note",
					children: r.frost == null ? "Off means the thermostat only keeps the house above its frost protection temperature." : `Off holds the room at frost protection, ${r.frost}° (a Hive valve can't switch off). Change it in Settings → Frost protection.`
				}),
				/* @__PURE__ */ (0, f.jsx)("button", {
					className: "sheet-go",
					onClick: s,
					children: "Done"
				}),
				i && /* @__PURE__ */ (0, f.jsxs)("button", {
					className: "ghost sheet-cancel danger-text",
					onClick: o,
					children: [/* @__PURE__ */ (0, f.jsx)(p, { name: "delete-outline" }), " Remove this time"]
				})
			]
		})
	});
}
function fe(e, t) {
	return e <= t.heat_min || t.frost != null && e === t.frost;
}
// src/Stats.tsx
var pe = [
	{
		id: 1,
		label: "D",
		name: "Day"
	},
	{
		id: 7,
		label: "W",
		name: "Week"
	},
	{
		id: 30,
		label: "M",
		name: "Month"
	}
], me = 3e5, he = (e) => {
	let t = Math.round(e);
	return t < 60 ? `${t}m` : t % 60 ? `${Math.floor(t / 60)}h ${t % 60}m` : `${t / 60}h`;
}, I = (e, t, n = 2) => {
	try {
		return e.toLocaleString([], {
			style: "currency",
			currency: t,
			maximumFractionDigits: n,
			minimumFractionDigits: 2
		});
	} catch {
		return `${e.toFixed(n)} ${t}`;
	}
}, ge = (e, t) => I(e, t, 4), _e = (e, t) => (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString([], t), ve = (e) => (/* @__PURE__ */ new Date(e * 1e3)).toLocaleTimeString([], {
	hour: "2-digit",
	minute: "2-digit"
});
function ye(e, t, n) {
	if (n === 1) return _e(e, {
		weekday: "short",
		day: "numeric",
		month: "short"
	});
	let r = t - 86400, i = /* @__PURE__ */ new Date(e * 1e3), a = /* @__PURE__ */ new Date(r * 1e3), o = (e) => e.toLocaleDateString([], { month: "short" });
	return i.getMonth() === a.getMonth() ? `${i.getDate()}–${a.getDate()} ${o(a)}` : `${i.getDate()} ${o(i)} – ${a.getDate()} ${o(a)}`;
}
var be = (e) => e.filter((e) => e != null);
function xe(e) {
	if (e.period === 1) {
		let t = [];
		for (let n = 0; n < e.series.length; n += 4) {
			let r = e.series.slice(n, n + 4).filter((e) => e.heating != null);
			if (!r.length) continue;
			let i = be(r.map((e) => e.current)), a = be(e.series.slice(n, n + 4).map((e) => e.outdoor));
			t.push({
				key: e.series[n].t,
				label: [ve(e.series[n].t), ""],
				minutes: r.reduce((e, t) => e + (t.heating ?? 0) * 15, 0),
				avg: i.length ? i.reduce((e, t) => e + t, 0) / i.length : null,
				min: i.length ? Math.min(...i) : null,
				max: i.length ? Math.max(...i) : null,
				outMin: a.length ? Math.min(...a) : null,
				outMax: a.length ? Math.max(...a) : null
			});
		}
		return t.reverse();
	}
	return e.days.filter((e) => e.heating_minutes != null).map((e) => ({
		key: e.start,
		label: [_e(e.start, { weekday: "short" }), _e(e.start, { day: "numeric" })],
		minutes: e.heating_minutes,
		avg: e.temp_avg,
		min: e.temp_min,
		max: e.temp_max,
		outMin: e.outdoor_min,
		outMax: e.outdoor_max
	})).reverse();
}
function Se({ getHass: e, devices: t, channel: n, roomId: r }) {
	let i = n ?? (r ? "heat" : void 0), [a, o] = (0, u.useState)(t[0]?.entry_id), s = t.find((e) => e.entry_id === a) ?? t[0], c = i ?? "heat", [l, d] = (0, u.useState)(7), [m, h] = (0, u.useState)("time"), [g, _] = (0, u.useState)(0), [v, x] = (0, u.useState)(null), [S, C] = (0, u.useState)(""), [w, T] = (0, u.useState)(!0), E = c === "water", D = (0, u.useCallback)(() => {
		(s || r) && e().callWS(r ? {
			type: "hive_local/rooms/stats",
			room_id: r,
			days: l,
			offset: g
		} : {
			type: "hive_local/stats",
			entry_id: s.entry_id,
			channel: c,
			days: l,
			offset: g
		}).then((e) => {
			x(e), C("");
		}).catch((e) => {
			y(e) || C(b(e));
		}).finally(() => T(!1));
	}, [
		e,
		s,
		c,
		l,
		g,
		r
	]);
	if ((0, u.useEffect)(() => {
		let t = e().connection;
		return t.addEventListener?.("ready", D), () => t.removeEventListener?.("ready", D);
	}, [e, D]), (0, u.useEffect)(() => {
		if (T(!0), D(), g) return;
		let e = setInterval(D, me);
		return () => clearInterval(e);
	}, [D, g]), !s && !r) return null;
	let O = v && v.period === l && v.offset === g ? v : null, k = O ? xe(O) : [], A = l === 1 ? "hour" : "day", ee = !E && !!O?.outdoor, j = E ? null : O?.cost ?? null, M = E || m === "cost" && !j && O ? "time" : m;
	return /* @__PURE__ */ (0, f.jsxs)("div", {
		className: "history",
		children: [
			!i && /* @__PURE__ */ (0, f.jsx)("h2", {
				className: "history-title",
				children: "Heating history"
			}),
			!i && t.length > 1 && /* @__PURE__ */ (0, f.jsx)("div", {
				className: "history-tabs",
				role: "tablist",
				children: t.map((e) => /* @__PURE__ */ (0, f.jsx)("button", {
					role: "tab",
					"aria-selected": e.entry_id === s.entry_id,
					className: e.entry_id === s.entry_id ? "on" : "",
					onClick: () => {
						o(e.entry_id), _(0);
					},
					children: e.name
				}, e.entry_id))
			}),
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "history-controls",
				children: [/* @__PURE__ */ (0, f.jsx)("div", {
					className: "history-toggle",
					role: "radiogroup",
					"aria-label": "Period",
					children: pe.map((e) => /* @__PURE__ */ (0, f.jsx)("button", {
						role: "radio",
						"aria-checked": e.id === l,
						"aria-label": e.name,
						title: e.name,
						className: e.id === l ? "on" : "",
						onClick: () => {
							d(e.id), _(0);
						},
						children: e.label
					}, e.id))
				}), !E && /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "history-toggle",
					role: "radiogroup",
					"aria-label": "Show",
					children: [
						/* @__PURE__ */ (0, f.jsx)("button", {
							role: "radio",
							"aria-checked": M === "time",
							title: "Time on",
							"aria-label": "Time on",
							className: `wide ${M === "time" ? "on" : ""}`,
							onClick: () => h("time"),
							children: /* @__PURE__ */ (0, f.jsx)(p, { name: "clock-outline" })
						}),
						/* @__PURE__ */ (0, f.jsx)("button", {
							role: "radio",
							"aria-checked": M === "temp",
							title: "Temperature",
							"aria-label": "Temperature",
							className: `wide ${M === "temp" ? "on" : ""}`,
							onClick: () => h("temp"),
							children: /* @__PURE__ */ (0, f.jsx)(p, { name: "thermometer" })
						}),
						(j || m === "cost") && /* @__PURE__ */ (0, f.jsx)("button", {
							role: "radio",
							"aria-checked": M === "cost",
							title: "Estimated cost",
							"aria-label": "Estimated cost",
							className: `wide ${M === "cost" ? "on" : ""}`,
							onClick: () => h("cost"),
							children: /* @__PURE__ */ (0, f.jsx)(p, { name: "cash" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "history-date",
				children: [
					/* @__PURE__ */ (0, f.jsx)("button", {
						className: "round ghost",
						onClick: () => _(g + 1),
						"aria-label": "Earlier",
						children: /* @__PURE__ */ (0, f.jsx)(p, { name: "chevron-left" })
					}),
					/* @__PURE__ */ (0, f.jsxs)("span", {
						className: "history-range",
						children: [
							/* @__PURE__ */ (0, f.jsx)(p, { name: "calendar-blank-outline" }),
							" ",
							O ? ye(O.start, O.period_end, l) : "…"
						]
					}),
					/* @__PURE__ */ (0, f.jsx)("button", {
						className: "round ghost",
						onClick: () => _(Math.max(0, g - 1)),
						disabled: g === 0,
						"aria-label": "Later",
						children: /* @__PURE__ */ (0, f.jsx)(p, { name: "chevron-right" })
					})
				]
			}),
			S && /* @__PURE__ */ (0, f.jsx)("div", {
				className: "status error",
				children: S
			}),
			w && !O && /* @__PURE__ */ (0, f.jsx)("p", {
				className: "muted history-empty",
				children: "Loading…"
			}),
			O && !O.has_data && /* @__PURE__ */ (0, f.jsxs)("p", {
				className: "muted history-empty",
				children: [
					"No history for this ",
					pe.find((e) => e.id === l).name.toLowerCase(),
					". Home Assistant keeps 10 days unless",
					" ",
					/* @__PURE__ */ (0, f.jsx)("code", { children: "purge_keep_days" }),
					" is raised."
				]
			}),
			O?.has_data && /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
				/* @__PURE__ */ (0, f.jsx)(we, {
					data: O,
					metric: M,
					water: E,
					room: !!r,
					units: A,
					rows: k,
					cost: j
				}),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "history-rows",
					children: [k.length > 0 && !E && /* @__PURE__ */ (0, f.jsxs)("div", {
						className: `history-key muted small ${ee ? "with-outdoor" : ""}`,
						children: [ee && /* @__PURE__ */ (0, f.jsxs)("span", {
							title: "Outside temperature",
							children: [/* @__PURE__ */ (0, f.jsx)(p, { name: "weather-partly-cloudy" }), " Outside"]
						}), /* @__PURE__ */ (0, f.jsxs)("span", {
							title: "Lowest and highest room temperature",
							children: [/* @__PURE__ */ (0, f.jsx)(p, { name: "thermometer" }), " Low · high"]
						})]
					}), k.map((e) => /* @__PURE__ */ (0, f.jsx)(De, {
						row: e,
						metric: M,
						water: E,
						outdoor: ee,
						cost: j,
						scale: Ce(k, M, l)
					}, e.key))]
				}),
				M === "cost" && j && /* @__PURE__ */ (0, f.jsxs)("p", {
					className: "history-hint muted small",
					children: [
						"An estimate: the boiler's time on × ",
						j.kw.toFixed(1),
						" kW × ",
						ge(j.price, j.currency),
						" per kWh, at today's price.",
						" ",
						j.basis === "meter" ? "The kW is the boiler's average while on, learned from your gas meter." : `The kW is 40% of the boiler's ${j.boiler_kw ?? "?"} kW rating, as a modulating boiler rarely runs flat out. Pick a gas meter in Settings for a closer figure.`
					]
				}),
				!E && O.outdoor_entity == null && /* @__PURE__ */ (0, f.jsx)("p", {
					className: "history-hint muted small",
					children: "To see the temperature outside here, pick a weather entity or outdoor sensor in the Settings tab."
				})
			] })
		]
	});
}
function Ce(e, t, n) {
	if (t === "time" || t === "cost") return {
		lo: 0,
		hi: Math.max(60, ...e.map((e) => e.minutes ?? 0))
	};
	let r = e.map((e) => e.avg).filter((e) => e != null), i = r.length ? Math.floor(Math.min(...r)) - 2 : 10, a = r.length ? Math.ceil(Math.max(...r)) : 25;
	return {
		lo: i,
		hi: Math.max(a, i + 4)
	};
}
function we({ data: e, metric: t, water: n, room: r, units: i, rows: a, cost: o }) {
	let s = Math.max(1, a.filter((e) => e.minutes != null).length), c = e.previous, l = !!c?.has_data && c.known_minutes >= .5 * e.known_minutes, u = l ? e.heating_minutes - c.heating_minutes : 0, d = e.temperature, p = (e) => o ? I(e / 60 * o.per_hour, o.currency) : "–", [m, h, g, _] = t === "cost" ? [
		"Estimated cost",
		p(e.heating_minutes),
		`Average per ${i}`,
		p(e.heating_minutes / s)
	] : t === "time" ? [
		n ? "Hot water on" : r ? "Valves heating" : "Boiler on",
		he(e.heating_minutes),
		`Average per ${i}`,
		he(e.heating_minutes / s)
	] : [
		"Average",
		d.avg == null ? "–" : `${d.avg.toFixed(1)}°`,
		"Lowest – highest",
		d.min != null && d.max != null ? `${d.min.toFixed(1)}–${d.max.toFixed(1)}°` : "–"
	];
	return /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [/* @__PURE__ */ (0, f.jsxs)("div", {
		className: "history-summary",
		children: [
			/* @__PURE__ */ (0, f.jsxs)("div", { children: [/* @__PURE__ */ (0, f.jsx)("span", {
				className: "muted",
				children: m
			}), /* @__PURE__ */ (0, f.jsx)("b", { children: h })] }),
			/* @__PURE__ */ (0, f.jsx)("i", {}),
			/* @__PURE__ */ (0, f.jsxs)("div", { children: [/* @__PURE__ */ (0, f.jsx)("span", {
				className: "muted",
				children: g
			}), /* @__PURE__ */ (0, f.jsx)("b", { children: _ })] })
		]
	}), /* @__PURE__ */ (0, f.jsxs)("p", {
		className: "history-note muted small",
		children: [
			t === "time" && l && (Math.abs(u) < 1 ? "Same as the period before · " : `${he(Math.abs(u))} ${u > 0 ? "more" : "less"} than the period before · `),
			t === "cost" && o && l && (Math.abs(u) < 1 ? "Same as the period before · " : `${p(Math.abs(u))} ${u > 0 ? "more" : "less"} than the period before · `),
			r ? "Started heating" : "Fired up",
			" ",
			e.cycles,
			" time",
			e.cycles === 1 ? "" : "s",
			e.boosts ? ` · ${e.boosts} boost${e.boosts === 1 ? "" : "s"}` : "",
			t === "temp" && e.target_avg != null ? ` · average target ${e.target_avg.toFixed(1)}°` : "",
			!n && Te(e)
		]
	})] });
}
function Te(e) {
	let t = e.outdoor?.avg;
	if (t == null) return "";
	let n = e.previous?.outdoor_avg, r = n == null ? null : t - n, i = r == null ? "" : Math.abs(r) < .5 ? ", about the same as the period before" : `, ${Math.abs(r).toFixed(0)}° ${r < 0 ? "colder" : "milder"} than the period before`;
	return ` · ${t.toFixed(0)}° outside${i}`;
}
function Ee(e, t) {
	if (e == null || t == null) return "–";
	let [n, r] = [e.toFixed(0), t.toFixed(0)];
	return n === r ? `${n}°` : `${n}–${r}°`;
}
function De({ row: e, metric: t, water: n, outdoor: r, cost: i, scale: a }) {
	let o = t === "temp" ? e.avg : e.minutes, s = o == null ? "–" : t === "time" ? he(o) : t === "cost" && i ? I(o / 60 * i.per_hour, i.currency) : `${o.toFixed(1)}°`, c = o == null ? 0 : Math.max(.02, Math.min(1, (o - a.lo) / (a.hi - a.lo || 1)));
	return /* @__PURE__ */ (0, f.jsxs)("div", {
		className: `history-row ${r ? "with-outdoor" : ""}`,
		children: [
			/* @__PURE__ */ (0, f.jsxs)("span", {
				className: "history-day",
				children: [
					e.label[0],
					" ",
					/* @__PURE__ */ (0, f.jsx)("span", { children: e.label[1] })
				]
			}),
			/* @__PURE__ */ (0, f.jsxs)("span", {
				className: "history-bar",
				children: [o != null && o > 0 && /* @__PURE__ */ (0, f.jsx)("i", { style: { width: `${c * 100}%` } }), /* @__PURE__ */ (0, f.jsx)("span", {
					className: "history-value",
					children: s
				})]
			}),
			r && /* @__PURE__ */ (0, f.jsx)("span", {
				className: "history-outdoor",
				title: "Lowest and highest outside temperature",
				children: Ee(e.outMin, e.outMax)
			}),
			!n && /* @__PURE__ */ (0, f.jsxs)("span", {
				className: "history-temps",
				title: "Lowest and highest room temperature",
				children: [e.min == null ? "–" : `${e.min.toFixed(0)}°`, /* @__PURE__ */ (0, f.jsx)("span", { children: e.max == null ? "–" : `${e.max.toFixed(0)}°` })]
			})
		]
	});
}
// src/DevicePage.tsx
var Oe = [
	{
		id: "control",
		label: "Control"
	},
	{
		id: "schedule",
		label: "Schedule"
	},
	{
		id: "history",
		label: "History"
	}
];
function ke({ getHass: e, device: t, channel: n, info: r, limits: i, showDevice: a, tab: o, onTab: s, onBack: c }) {
	let [l, d] = (0, u.useState)(o === "schedule");
	(0, u.useEffect)(() => {
		o === "schedule" && d(!0);
	}, [o]);
	let m = r?.status, h = [a ? t.name : null, m ? r?.holiday && (m.mode !== "boost" || r.holiday.holding) ? `Away until ${T(r.holiday.until)}` : m.mode === "schedule" ? "On schedule" : m.mode === "boost" ? r?.preheat?.active_for ? `Pre-heating for ${r.preheat.active_for}` : r?.demand?.active ? `Heating for ${E(r.demand.rooms)}` : "Boosting" : m.mode === "off" ? "Off" : n === "water" ? "Always on" : "Manual" : "Waiting for the receiver"].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, f.jsxs)("div", {
		className: "device-page",
		children: [
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "page-head",
				children: [/* @__PURE__ */ (0, f.jsx)("button", {
					className: "round ghost",
					onClick: c,
					"aria-label": "Back to the overview",
					children: /* @__PURE__ */ (0, f.jsx)(p, { name: "chevron-left" })
				}), /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "page-title",
					children: [/* @__PURE__ */ (0, f.jsx)("h2", { children: _[n] }), /* @__PURE__ */ (0, f.jsx)("span", {
						className: "muted small",
						children: h
					})]
				})]
			}),
			/* @__PURE__ */ (0, f.jsx)("div", {
				className: "page-tabs",
				role: "tablist",
				children: Oe.map((e) => /* @__PURE__ */ (0, f.jsx)("button", {
					role: "tab",
					"aria-selected": e.id === o,
					className: e.id === o ? "on" : "",
					onClick: () => s(e.id),
					children: e.label
				}, e.id))
			}),
			o === "control" && /* @__PURE__ */ (0, f.jsx)(te, {
				getHass: e,
				device: t,
				channel: n,
				info: r,
				showDevice: !1,
				limits: i,
				page: !0
			}),
			o === "control" && n === "heat" && r?.preheat && /* @__PURE__ */ (0, f.jsx)(F, {
				getHass: e,
				device: t,
				info: r.preheat
			}),
			l && /* @__PURE__ */ (0, f.jsx)("div", {
				hidden: o !== "schedule",
				children: /* @__PURE__ */ (0, f.jsx)(ce, {
					getHass: e,
					device: t,
					channel: n,
					limits: i,
					mode: m?.mode ?? null,
					preheatFor: m?.mode === "boost" ? r?.preheat?.active_for ?? null : null,
					demandFor: m?.mode === "boost" && r?.demand?.active ? E(r.demand.rooms) : null
				})
			}),
			o === "history" && /* @__PURE__ */ (0, f.jsx)(Se, {
				getHass: e,
				devices: [t],
				channel: n
			})
		]
	});
}
// src/Devices.tsx
var Ae = 20, je = 6e4;
function Me({ getHass: e, devices: t, status: n, limits: r, onOpenDevice: i }) {
	let [a, o] = (0, u.useState)(null), [s, c] = (0, u.useState)(""), [l, d] = (0, u.useState)(!1), m = (0, u.useCallback)(() => {
		e().callWS({ type: "hive_local/rooms/valves" }).then((e) => o(e.valves)).catch((e) => c(b(e)));
	}, [e]);
	(0, u.useEffect)(() => {
		m();
		let e = setInterval(m, je);
		return () => clearInterval(e);
	}, [m]);
	let h = t.length > 1;
	return /* @__PURE__ */ (0, f.jsxs)("div", {
		className: "stack devices-page",
		children: [
			/* @__PURE__ */ (0, f.jsx)("h2", {
				className: "history-title",
				children: "Devices"
			}),
			s && /* @__PURE__ */ (0, f.jsx)("div", {
				className: "status error",
				children: s
			}),
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "device-grid",
				children: [t.map((e) => /* @__PURE__ */ (0, f.jsx)(Ie, {
					device: e,
					status: n,
					onOpen: (t) => i(e.entry_id, t)
				}, e.entry_id)), a?.map((e) => /* @__PURE__ */ (0, f.jsx)(Le, { valve: e }, e.entity_id))]
			}),
			a && !a.length && /* @__PURE__ */ (0, f.jsx)("p", {
				className: "muted",
				children: "No Hive radiator valves yet. Pair them with ZHA or Zigbee2MQTT and they'll show up here."
			}),
			h && /* @__PURE__ */ (0, f.jsx)("p", {
				className: "muted small",
				children: "Each receiver is a heating zone."
			}),
			/* @__PURE__ */ (0, f.jsx)("div", {
				className: "fab-wrap",
				children: /* @__PURE__ */ (0, f.jsx)("button", {
					className: "fab",
					"aria-label": "Add a device",
					onClick: () => d(!0),
					children: /* @__PURE__ */ (0, f.jsx)(p, { name: "plus" })
				})
			}),
			l && /* @__PURE__ */ (0, f.jsx)(Re, { onClose: () => d(!1) })
		]
	});
}
var Ne = {
	z2m: "Zigbee2MQTT",
	zha: "ZHA"
};
function Pe({ items: e }) {
	return /* @__PURE__ */ (0, f.jsx)("div", {
		className: "facts",
		children: e.map((e) => /* @__PURE__ */ (0, f.jsxs)("span", {
			className: `fact ${e.warn ? "warn" : ""}`,
			children: [
				/* @__PURE__ */ (0, f.jsx)(p, { name: e.icon }),
				" ",
				e.text
			]
		}, e.text))
	});
}
function Fe({ online: e, text: t }) {
	return /* @__PURE__ */ (0, f.jsxs)("span", {
		className: `online ${e ? "" : "no"}`,
		children: [/* @__PURE__ */ (0, f.jsx)("i", {}), t ?? (e ? "Online" : "Not responding")]
	});
}
function Ie({ device: e, status: t, onOpen: n }) {
	let r = e.channels.some((n) => t[e.entry_id]?.[n]?.status);
	return /* @__PURE__ */ (0, f.jsxs)("section", {
		className: "card hw",
		children: [
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "hw-head",
				children: [
					/* @__PURE__ */ (0, f.jsx)("span", {
						className: "device-icon",
						children: /* @__PURE__ */ (0, f.jsx)(p, { name: "radiator" })
					}),
					/* @__PURE__ */ (0, f.jsxs)("div", {
						className: "device-name",
						children: [/* @__PURE__ */ (0, f.jsx)("span", { children: e.name }), /* @__PURE__ */ (0, f.jsxs)("span", {
							className: "muted small",
							children: ["Hive receiver", e.model ? ` · ${e.model}` : ""]
						})]
					}),
					/* @__PURE__ */ (0, f.jsx)(Fe, {
						online: r,
						text: r ? "Online" : "Waiting"
					})
				]
			}),
			/* @__PURE__ */ (0, f.jsx)(Pe, { items: [{
				icon: "zigbee",
				text: Ne[e.transport ?? "z2m"]
			}, {
				icon: "fire",
				text: e.channels.includes("water") ? "Heating and hot water" : "Heating only"
			}] }),
			/* @__PURE__ */ (0, f.jsx)("div", {
				className: "hw-links",
				children: e.channels.map((e) => /* @__PURE__ */ (0, f.jsxs)("button", {
					className: "hw-link",
					onClick: () => n(e),
					children: [
						_[e],
						" ",
						/* @__PURE__ */ (0, f.jsx)(p, { name: "chevron-right" })
					]
				}, e))
			})
		]
	});
}
function Le({ valve: e }) {
	let t = e.battery != null && !Number.isNaN(Number(e.battery)) ? Number(e.battery) : null, n = t != null && t < Ae;
	return /* @__PURE__ */ (0, f.jsxs)("section", {
		className: `card hw ${e.available ? "" : "off"}`,
		children: [/* @__PURE__ */ (0, f.jsxs)("div", {
			className: "hw-head",
			children: [
				/* @__PURE__ */ (0, f.jsx)("span", {
					className: "device-icon",
					children: /* @__PURE__ */ (0, f.jsx)(p, { name: "thermostat" })
				}),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "device-name",
					children: [/* @__PURE__ */ (0, f.jsx)("span", { children: e.name }), /* @__PURE__ */ (0, f.jsx)("span", {
						className: "muted small",
						children: "Hive radiator valve"
					})]
				}),
				/* @__PURE__ */ (0, f.jsx)(Fe, { online: e.available })
			]
		}), /* @__PURE__ */ (0, f.jsx)(Pe, { items: [
			{
				icon: "home-outline",
				text: e.room ?? "Not in a room"
			},
			...t == null ? [] : [{
				icon: n ? "battery-alert-variant-outline" : "battery-high",
				text: `Battery ${t}%`,
				warn: n
			}],
			...e.available && e.current_temperature != null ? [{
				icon: "thermometer",
				text: `${Number(e.current_temperature).toFixed(1)}° now`
			}] : []
		] })]
	});
}
function Re({ onClose: e }) {
	let [t, n] = (0, u.useState)(!1);
	return (0, u.useEffect)(() => {
		let t = (t) => t.key === "Escape" && e();
		return window.addEventListener("keydown", t), () => window.removeEventListener("keydown", t);
	}, [e]), /* @__PURE__ */ (0, f.jsx)("div", {
		className: "sheet-backdrop",
		onClick: e,
		children: /* @__PURE__ */ (0, f.jsxs)("div", {
			className: "sheet heat",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Add a device",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, f.jsx)("span", { className: "sheet-handle" }),
				/* @__PURE__ */ (0, f.jsx)("div", {
					className: "sheet-title",
					children: /* @__PURE__ */ (0, f.jsx)("h2", { children: "Add a device" })
				}),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "add-options",
					children: [/* @__PURE__ */ (0, f.jsxs)("button", {
						className: "add-option",
						onClick: () => {
							history.pushState(null, "", "/config/integrations/dashboard/add?domain=hive_local"), window.dispatchEvent(new CustomEvent("location-changed")), e();
						},
						children: [
							/* @__PURE__ */ (0, f.jsx)("span", {
								className: "device-icon",
								children: /* @__PURE__ */ (0, f.jsx)(p, { name: "radiator" })
							}),
							/* @__PURE__ */ (0, f.jsxs)("span", {
								className: "add-text",
								children: [/* @__PURE__ */ (0, f.jsx)("b", { children: "Hive receiver" }), /* @__PURE__ */ (0, f.jsx)("span", {
									className: "muted small",
									children: "A boiler receiver (another heating zone). Opens Home Assistant's setup for Hive Local."
								})]
							}),
							/* @__PURE__ */ (0, f.jsx)(p, { name: "chevron-right" })
						]
					}), /* @__PURE__ */ (0, f.jsxs)("button", {
						className: "add-option",
						onClick: () => n(!t),
						children: [
							/* @__PURE__ */ (0, f.jsx)("span", {
								className: "device-icon",
								children: /* @__PURE__ */ (0, f.jsx)(p, { name: "thermostat" })
							}),
							/* @__PURE__ */ (0, f.jsxs)("span", {
								className: "add-text",
								children: [/* @__PURE__ */ (0, f.jsx)("b", { children: "Radiator valve" }), /* @__PURE__ */ (0, f.jsx)("span", {
									className: "muted small",
									children: t ? "Pair it with ZHA or Zigbee2MQTT first (Settings → Devices & services). It then appears here, and you can put it in a room in the Settings tab." : "A Hive radiator valve (UK7004240)."
								})]
							}),
							/* @__PURE__ */ (0, f.jsx)(p, { name: t ? "chevron-up" : "chevron-down" })
						]
					})]
				}),
				/* @__PURE__ */ (0, f.jsx)("button", {
					className: "ghost sheet-cancel",
					onClick: e,
					children: "Close"
				})
			]
		})
	});
}
// src/Rooms.tsx
var ze = 20, Be = (e) => e == null ? "–" : `${e.toFixed(1)}°`;
function Ve({ valve: e, heating: t }) {
	let n = e.battery == null ? null : Number(e.battery), r = n != null && !Number.isNaN(n) && n <= ze;
	return /* @__PURE__ */ (0, f.jsxs)("li", {
		className: `valve ${e.available ? "" : "off"}`,
		children: [
			/* @__PURE__ */ (0, f.jsx)(p, {
				name: t ? "fire" : "radiator",
				className: t ? "valve-icon heating" : "valve-icon"
			}),
			/* @__PURE__ */ (0, f.jsx)("span", {
				className: "valve-name",
				children: e.name
			}),
			e.available ? /* @__PURE__ */ (0, f.jsxs)("span", {
				className: "valve-temps",
				children: [
					Be(e.current_temperature),
					" ",
					/* @__PURE__ */ (0, f.jsxs)("span", {
						className: "muted",
						children: ["→ ", Be(e.target)]
					})
				]
			}) : /* @__PURE__ */ (0, f.jsx)("span", {
				className: "chip",
				children: "Unavailable"
			}),
			n != null && !Number.isNaN(n) && /* @__PURE__ */ (0, f.jsxs)("span", {
				className: `battery ${r ? "low" : ""}`,
				title: r ? "Battery low" : "Battery",
				children: [
					/* @__PURE__ */ (0, f.jsx)(p, { name: r ? "battery-alert-variant-outline" : "battery-outline" }),
					" ",
					Math.round(n),
					"%"
				]
			})
		]
	});
}
function He(e) {
	if (!e.sensor || !e.external_sensor) return null;
	let t = e.valve_states.length, n = (t) => e.valve_states.filter((e) => e.external_sensor === t).map((e) => e.name);
	if (e.external_sensor === "off") return {
		text: t === 1 ? "The valve uses its own sensor" : "The valves use their own sensors",
		warn: !1
	};
	if (e.external_sensor === "using") return {
		text: t === 1 ? "The valve uses the room sensor" : "The valves use the room sensor",
		warn: !1
	};
	if (e.external_sensor === "unsupported") return {
		text: t === 1 ? "This valve can't use the room sensor" : "These valves can't use the room sensor",
		warn: !1
	};
	if (e.temperature_source !== "sensor") return {
		text: "Room sensor not responding: the valves use their own",
		warn: !0
	};
	if (e.external_sensor === "partly") {
		let e = n("unsupported"), r = n("using").length;
		return {
			text: `${r} of ${t} valves ${r === 1 ? "uses" : "use"} the room sensor${e.length ? `; ${e.join(", ")} can't` : ""}`,
			warn: !1
		};
	}
	return {
		text: "Giving the valves the room temperature…",
		warn: !1
	};
}
var Ue = 8;
function We({ getHass: e, valves: t, info: n, roomName: r, thisRoom: i, chosen: a, onToggle: o }) {
	let [s, c] = (0, u.useState)(null), [l, d] = (0, u.useState)(null), m = (0, u.useRef)();
	(0, u.useEffect)(() => () => window.clearTimeout(m.current), []);
	let [h, g] = (0, u.useState)(""), _ = t.length > Ue, v = h.trim().toLowerCase(), y = r.trim().toLowerCase(), x = (e) => !!y && (e.area ?? "").toLowerCase() === y, S = (e) => {
		let t = n.get(e.entity_id)?.room;
		return t && t !== i ? t : null;
	}, [C] = (0, u.useState)(() => new Set(a)), w = (e) => C.has(e.entity_id) ? 0 : x(e) ? 1 : S(e) ? 3 : 2, T = [...t].sort((e, t) => w(e) - w(t)), E = v ? T.filter((e) => e.name.toLowerCase().includes(v) || (e.area ?? "").toLowerCase().includes(v)) : T, D = async (t) => {
		d(null), c(t.entity_id);
		try {
			await e().callWS({
				type: "hive_local/rooms/identify",
				entity_id: t.entity_id
			}), d({
				kind: "ok",
				text: `${t.name} is flashing its light.`
			}), window.clearTimeout(m.current), m.current = window.setTimeout(() => {
				c(null), d(null);
			}, 1e4);
		} catch (e) {
			c(null), d({
				kind: "error",
				text: b(e)
			});
		}
	};
	return t.length ? /* @__PURE__ */ (0, f.jsxs)("div", {
		className: "valve-picker",
		children: [
			_ && /* @__PURE__ */ (0, f.jsxs)("label", {
				className: "valve-search",
				children: [
					/* @__PURE__ */ (0, f.jsx)(p, { name: "magnify" }),
					/* @__PURE__ */ (0, f.jsx)("input", {
						type: "search",
						value: h,
						placeholder: "Search valves or areas",
						"aria-label": "Search valves or areas",
						onChange: (e) => g(e.target.value)
					}),
					h && /* @__PURE__ */ (0, f.jsx)("button", {
						type: "button",
						className: "ghost round",
						"aria-label": "Clear the search",
						onClick: () => g(""),
						children: /* @__PURE__ */ (0, f.jsx)(p, { name: "close" })
					})
				]
			}),
			!E.length && v && /* @__PURE__ */ (0, f.jsxs)("span", {
				className: "muted small",
				children: [
					"No valves match \"",
					h.trim(),
					"\"."
				]
			}),
			E.length > 0 && /* @__PURE__ */ (0, f.jsx)("div", {
				className: "valve-list",
				children: E.map((e) => {
					let t = n.get(e.entity_id), r = a.has(e.entity_id), i = t?.battery == null ? null : Number(t.battery), c = i != null && !Number.isNaN(i), l = c && i <= ze, u = S(e);
					return /* @__PURE__ */ (0, f.jsxs)("div", {
						className: `valve-pick ${r ? "on" : ""}`,
						children: [/* @__PURE__ */ (0, f.jsxs)("button", {
							type: "button",
							role: "checkbox",
							"aria-checked": r,
							className: "valve-pick-main",
							onClick: () => o(e.entity_id),
							children: [
								/* @__PURE__ */ (0, f.jsx)("span", {
									className: `valve-check ${r ? "on" : ""}`,
									"aria-hidden": "true",
									children: r && /* @__PURE__ */ (0, f.jsx)(p, { name: "check" })
								}),
								/* @__PURE__ */ (0, f.jsxs)("span", {
									className: "valve-pick-text",
									children: [/* @__PURE__ */ (0, f.jsx)("span", { children: e.name }), /* @__PURE__ */ (0, f.jsx)("span", {
										className: "muted small",
										children: [e.area ?? "No area", u ? `in ${u}` : null].filter(Boolean).join(" · ")
									})]
								}),
								/* @__PURE__ */ (0, f.jsx)("span", {
									className: "valve-pick-read small",
									children: t && !t.available ? "Not responding" : /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [t?.current_temperature == null ? "" : `${t.current_temperature.toFixed(1)}°`, c && /* @__PURE__ */ (0, f.jsxs)("span", {
										className: l ? "warn" : "",
										children: [
											t?.current_temperature == null ? "" : " · ",
											Math.round(i),
											"%"
										]
									})] })
								})
							]
						}), t?.identify && /* @__PURE__ */ (0, f.jsxs)("button", {
							type: "button",
							className: `valve-find ${s === e.entity_id ? "on" : ""}`,
							onClick: () => D(e),
							disabled: s === e.entity_id,
							"aria-label": `Find ${e.name}: flash its light`,
							children: [
								/* @__PURE__ */ (0, f.jsx)(p, { name: "lightbulb-on-outline" }),
								" ",
								/* @__PURE__ */ (0, f.jsx)("span", {
									className: "valve-find-label",
									children: s === e.entity_id ? "Flashing" : "Find"
								})
							]
						})]
					}, e.entity_id);
				})
			}),
			l && /* @__PURE__ */ (0, f.jsx)("div", {
				className: `status ${l.kind} small`,
				children: l.text
			})
		]
	}) : null;
}
function Ge({ dialog: e, label: t, onClose: n, children: r }) {
	return e ? /* @__PURE__ */ (0, f.jsx)("div", {
		className: "sheet-backdrop",
		onClick: (e) => {
			e.stopPropagation(), n();
		},
		children: /* @__PURE__ */ (0, f.jsxs)("div", {
			className: "sheet room-sheet room-editor",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": t,
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, f.jsx)("span", { className: "sheet-handle" }), r]
		})
	}) : /* @__PURE__ */ (0, f.jsx)("section", {
		className: "card room-editor",
		children: r
	});
}
function Ke(e) {
	return /* @__PURE__ */ (0, f.jsx)(qe, {
		...e,
		dialog: !0
	});
}
function qe({ getHass: e, room: t, onDone: n, dialog: r }) {
	(0, u.useEffect)(() => {
		if (!r) return;
		let e = (e) => e.key === "Escape" && n();
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [r, n]);
	let [i, a] = (0, u.useState)(null), [o, s] = (0, u.useState)(t?.receiver ?? ""), [c, l] = (0, u.useState)(t?.name ?? ""), [d, m] = (0, u.useState)(new Set(t?.valves ?? [])), [h, g] = (0, u.useState)(t?.sensor ?? ""), [_, v] = (0, u.useState)(t?.sensor_on_valves ?? !0), [y, x] = (0, u.useState)(!1), [S, C] = (0, u.useState)(!1), [w, T] = (0, u.useState)(""), [E, D] = (0, u.useState)(/* @__PURE__ */ new Map());
	(0, u.useEffect)(() => {
		e().callWS({ type: "hive_local/rooms/candidates" }).then(a).catch((e) => T(b(e))), e().callWS({ type: "hive_local/rooms/valves" }).then((e) => D(new Map(e.valves.map((e) => [e.entity_id, e])))).catch(() => {});
	}, [e]);
	let O = (i?.receivers.length ?? 0) > 1, k = t && t.sensor === h && _ && (t.sensor_on_valves ?? !0) ? He(t) : null, A = async (t) => {
		x(!0), T("");
		try {
			await e().callWS(t), n();
		} catch (e) {
			T(b(e)), x(!1);
		}
	};
	return /* @__PURE__ */ (0, f.jsxs)(Ge, {
		dialog: !!r,
		label: t ? `Edit ${t.name}` : "New room",
		onClose: n,
		children: [/* @__PURE__ */ (0, f.jsx)("h2", { children: t ? `Edit ${t.name}` : "New room" }), /* @__PURE__ */ (0, f.jsxs)("form", {
			className: "stack",
			onSubmit: (e) => {
				e.preventDefault(), A({
					type: "hive_local/rooms/save",
					...t ? { room_id: t.id } : {},
					name: c,
					valves: [...d],
					sensor: h || null,
					receiver: o || null,
					sensor_on_valves: _
				});
			},
			children: [
				/* @__PURE__ */ (0, f.jsxs)("label", {
					className: "field",
					children: [/* @__PURE__ */ (0, f.jsx)("span", { children: "Name" }), /* @__PURE__ */ (0, f.jsx)("input", {
						id: `room-name-${t?.id ?? "new"}`,
						type: "text",
						value: c,
						maxLength: 40,
						placeholder: "Lounge",
						onChange: (e) => l(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, f.jsxs)("fieldset", {
					className: "field",
					children: [
						/* @__PURE__ */ (0, f.jsxs)("legend", { children: ["Hive radiator valves", d.size > 0 && /* @__PURE__ */ (0, f.jsxs)("span", {
							className: "valve-count",
							children: [d.size, " chosen"]
						})] }),
						!i && !w && /* @__PURE__ */ (0, f.jsx)("span", {
							className: "muted small",
							children: "Loading…"
						}),
						i && !i.valves.length && /* @__PURE__ */ (0, f.jsx)("span", {
							className: "muted small",
							children: "No Hive radiator valves found. Pair them with ZHA or Zigbee2MQTT first."
						}),
						/* @__PURE__ */ (0, f.jsx)(We, {
							getHass: e,
							valves: i?.valves ?? [],
							info: E,
							roomName: c,
							thisRoom: t?.name ?? null,
							chosen: d,
							onToggle: (e) => m((t) => {
								let n = new Set(t);
								return n.has(e) ? n.delete(e) : n.add(e), n;
							})
						})
					]
				}),
				/* @__PURE__ */ (0, f.jsxs)("label", {
					className: "field",
					children: [/* @__PURE__ */ (0, f.jsx)("span", { children: "Room temperature from" }), /* @__PURE__ */ (0, f.jsxs)("select", {
						id: `room-sensor-${t?.id ?? "new"}`,
						value: h,
						onChange: (e) => g(e.target.value),
						children: [/* @__PURE__ */ (0, f.jsx)("option", {
							value: "",
							children: "The valves (their average)"
						}), (i?.sensors ?? []).map((e) => /* @__PURE__ */ (0, f.jsxs)("option", {
							value: e.entity_id,
							children: [e.name, e.area ? ` · ${e.area}` : ""]
						}, e.entity_id))]
					})]
				}),
				h && /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "sensor-toggle",
					children: [/* @__PURE__ */ (0, f.jsxs)("button", {
						type: "button",
						role: "checkbox",
						"aria-checked": _,
						className: "sensor-toggle-main",
						onClick: () => v((e) => !e),
						children: [/* @__PURE__ */ (0, f.jsx)("span", {
							className: `valve-check ${_ ? "on" : ""}`,
							"aria-hidden": "true",
							children: _ && /* @__PURE__ */ (0, f.jsx)(p, { name: "check" })
						}), /* @__PURE__ */ (0, f.jsxs)("span", {
							className: "valve-pick-text",
							children: [/* @__PURE__ */ (0, f.jsx)("span", { children: "Use the room sensor on the valves" }), /* @__PURE__ */ (0, f.jsx)("span", {
								className: "muted small",
								children: "The valves heat to this reading instead of their own, taken beside the radiator."
							})]
						})]
					}), k && /* @__PURE__ */ (0, f.jsxs)("span", {
						className: `small ${k.warn ? "warn" : "muted"}`,
						children: [k.text, "."]
					})]
				}),
				O && /* @__PURE__ */ (0, f.jsxs)("label", {
					className: "field",
					children: [/* @__PURE__ */ (0, f.jsx)("span", { children: "Heated by" }), /* @__PURE__ */ (0, f.jsxs)("select", {
						id: `room-receiver-${t?.id ?? "new"}`,
						value: o,
						onChange: (e) => s(e.target.value),
						children: [/* @__PURE__ */ (0, f.jsx)("option", {
							value: "",
							disabled: !0,
							children: "Choose the receiver for this room's radiators"
						}), i.receivers.map((e) => /* @__PURE__ */ (0, f.jsx)("option", {
							value: e.entry_id,
							children: e.name
						}, e.entry_id))]
					})]
				}),
				w && /* @__PURE__ */ (0, f.jsx)("div", {
					className: "status error",
					children: w
				}),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "actions",
					children: [
						/* @__PURE__ */ (0, f.jsx)("button", {
							className: "primary",
							type: "submit",
							disabled: y || !c.trim() || !d.size || O && !o,
							children: t ? "Save" : "Add room"
						}),
						/* @__PURE__ */ (0, f.jsx)("button", {
							type: "button",
							className: "ghost",
							onClick: n,
							disabled: y,
							children: "Cancel"
						}),
						/* @__PURE__ */ (0, f.jsx)("span", { className: "spacer" }),
						t && (S ? /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
							/* @__PURE__ */ (0, f.jsxs)("span", {
								className: "muted small",
								children: [
									"Delete ",
									t.name,
									"? The valves aren't changed."
								]
							}),
							/* @__PURE__ */ (0, f.jsx)("button", {
								type: "button",
								className: "danger",
								disabled: y,
								onClick: () => A({
									type: "hive_local/rooms/delete",
									room_id: t.id
								}),
								children: "Delete"
							}),
							/* @__PURE__ */ (0, f.jsx)("button", {
								type: "button",
								className: "ghost",
								onClick: () => C(!1),
								children: "Keep"
							})
						] }) : /* @__PURE__ */ (0, f.jsxs)("button", {
							type: "button",
							className: "danger",
							onClick: () => C(!0),
							disabled: y,
							children: [/* @__PURE__ */ (0, f.jsx)(p, { name: "delete-outline" }), " Delete room"]
						}))
					]
				})
			]
		})]
	});
}
var Je = [
	{
		id: "schedule",
		label: "Schedule"
	},
	{
		id: "manual",
		label: "Manual"
	},
	{
		id: "off",
		label: "Off"
	}
];
function Ye(e) {
	return e.boost ? `Boost · ${D(e.boost.remaining)} left` : e.mode === "schedule" ? "On the valves' schedule" : e.mode === "off" ? "Off" : "Manual";
}
function Xe({ getHass: e, room: t }) {
	let [n, r] = (0, u.useState)(!1), [i, a] = (0, u.useState)(null), [o, s] = (0, u.useState)(!1), [c, l] = (0, u.useState)(""), d = (0, u.useRef)();
	(0, u.useEffect)(() => () => window.clearTimeout(d.current), []);
	let m = t.mode ?? "manual", h = (e) => `Didn't take on ${t.valve_states.filter((t) => e.includes(t.entity_id)).map((e) => e.name).join(", ")}. It may be asleep: press its dial to wake it and try again.`, g = i ?? t.boost?.temperature ?? t.target ?? t.target_range?.[1] ?? 20, _ = m !== "off" || !!t.boost, v = (n) => {
		let r = Math.min(32, Math.max(5, n));
		a(r), l(""), window.clearTimeout(d.current), d.current = window.setTimeout(async () => {
			try {
				let n = await e().callWS({
					type: "hive_local/rooms/set_target",
					room_id: t.id,
					temperature: r
				});
				n.failed.length && l(h(n.failed));
			} catch (e) {
				l(b(e));
			} finally {
				a(null);
			}
		}, 1200);
	}, y = async (n) => {
		s(!0), l("");
		try {
			let r = await e().callWS({
				type: "hive_local/rooms/mode",
				room_id: t.id,
				mode: n
			});
			r.failed.length && l(h(r.failed));
		} catch (e) {
			l(b(e));
		} finally {
			s(!1);
		}
	}, x = He(t), S = t.boost ? "Keeps the boost's time left" : m === "off" ? "Turn the room on to set a target" : m === "schedule" ? "Until the valves' next scheduled change" : t.target_range && i == null ? `The valves are set to ${Be(t.target_range[0])}–${Be(t.target_range[1])}` : "Held until you change it";
	return /* @__PURE__ */ (0, f.jsxs)("section", {
		className: "card room-control",
		children: [
			x && /* @__PURE__ */ (0, f.jsxs)("div", {
				className: `room-sensor-note small ${x.warn ? "warn" : "muted"}`,
				children: [
					/* @__PURE__ */ (0, f.jsx)(p, { name: x.warn ? "thermometer-alert" : "thermometer-check" }),
					" ",
					x.text
				]
			}),
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "target-row",
				children: [/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "target-text",
					children: [/* @__PURE__ */ (0, f.jsx)("span", {
						className: "target-label",
						children: t.boost ? "Boost to" : m === "off" ? "Off" : "Target"
					}), /* @__PURE__ */ (0, f.jsx)("span", {
						className: "muted small",
						children: S
					})]
				}), /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "target-control",
					children: [
						/* @__PURE__ */ (0, f.jsx)("button", {
							className: "round target-btn",
							disabled: !_,
							onClick: () => v(g - .5),
							"aria-label": "Lower the target",
							children: /* @__PURE__ */ (0, f.jsx)(p, { name: "minus" })
						}),
						/* @__PURE__ */ (0, f.jsx)("span", {
							className: `target-value ${i == null ? "" : "pending"}`,
							children: _ ? `${g.toFixed(1)}°` : "–"
						}),
						/* @__PURE__ */ (0, f.jsx)("button", {
							className: "round target-btn",
							disabled: !_,
							onClick: () => v(g + .5),
							"aria-label": "Raise the target",
							children: /* @__PURE__ */ (0, f.jsx)(p, { name: "plus" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, f.jsx)("div", {
				className: "segmented full",
				role: "radiogroup",
				"aria-label": "Mode",
				children: Je.map((e) => /* @__PURE__ */ (0, f.jsx)("button", {
					role: "radio",
					"aria-checked": m === e.id,
					className: m === e.id ? "on" : "",
					disabled: o,
					onClick: () => m !== e.id && y(e.id),
					children: e.label
				}, e.id))
			}),
			m === "schedule" && /* @__PURE__ */ (0, f.jsx)("p", {
				className: "muted small room-mode-note",
				children: "The valves follow the schedule kept on them (the Schedule tab)."
			}),
			m === "off" && /* @__PURE__ */ (0, f.jsxs)("p", {
				className: "muted small room-mode-note",
				children: [
					"A Hive valve can't switch off, so they hold the room at frost protection, ",
					t.frost ?? 12,
					"° (Settings → Frost protection). Their targets come back when you turn the room on."
				]
			}),
			c && /* @__PURE__ */ (0, f.jsx)("div", {
				className: "status error",
				children: c
			}),
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "sheet-field",
				children: [/* @__PURE__ */ (0, f.jsx)("span", {
					className: "sheet-label",
					children: "Valves"
				}), /* @__PURE__ */ (0, f.jsx)("ul", {
					className: "valves",
					children: t.valve_states.map((e) => /* @__PURE__ */ (0, f.jsx)(Ve, {
						valve: e,
						heating: t.heating_valves.includes(e.entity_id)
					}, e.entity_id))
				})]
			}),
			/* @__PURE__ */ (0, f.jsx)("div", {
				className: "room-sheet-actions",
				children: /* @__PURE__ */ (0, f.jsxs)("button", {
					className: "ghost",
					onClick: () => r(!0),
					children: [/* @__PURE__ */ (0, f.jsx)(p, { name: "pencil-outline" }), " Edit room"]
				})
			}),
			n && /* @__PURE__ */ (0, f.jsx)(qe, {
				getHass: e,
				room: t,
				onDone: () => r(!1),
				dialog: !0
			})
		]
	});
}
function Ze(e) {
	let t = e.toLowerCase();
	return /lounge|living|sitting|family|snug/.test(t) ? "sofa-outline" : /bed|nursery|guest/.test(t) ? "bed-outline" : /kitchen|dining/.test(t) ? "silverware-fork-knife" : /landing|hall|stair/.test(t) ? "stairs" : /study|office/.test(t) ? "desk" : /bath|shower|en-?suite|wc|toilet/.test(t) ? "shower" : "home-thermometer-outline";
}
function Qe({ getHass: e, onDone: t }) {
	let [n, r] = (0, u.useState)(null), [i, a] = (0, u.useState)(/* @__PURE__ */ new Map()), [o, s] = (0, u.useState)(/* @__PURE__ */ new Set()), [c, l] = (0, u.useState)({}), [d, m] = (0, u.useState)(!1), [h, g] = (0, u.useState)("");
	(0, u.useEffect)(() => {
		e().callWS({ type: "hive_local/rooms/suggest" }).then((e) => {
			r(e), s(new Set(e.rooms.map((e, t) => t)));
		}).catch((e) => g(b(e))), e().callWS({ type: "hive_local/rooms/candidates" }).then((e) => a(new Map([...e.valves, ...e.sensors].map((e) => [e.entity_id, e.name])))).catch(() => {});
	}, [e]);
	let _ = (n?.receivers.length ?? 0) > 1, v = (n?.rooms ?? []).map((e, t) => [e, t]).filter(([, e]) => o.has(e)), y = v.length > 0 && (!_ || v.every(([, e]) => c[e])), x = (n?.rooms ?? []).reduce((e, t) => e + t.valves.length, 0), S = async () => {
		m(!0), g("");
		try {
			for (let [t, n] of v) await e().callWS({
				type: "hive_local/rooms/save",
				name: t.name,
				valves: t.valves,
				sensor: t.sensor,
				receiver: c[n] ?? null
			});
			t();
		} catch (e) {
			g(b(e)), m(!1);
		}
	}, C = (e) => s((t) => {
		let n = new Set(t);
		return n.has(e) ? n.delete(e) : n.add(e), n;
	});
	return /* @__PURE__ */ (0, f.jsxs)(Ge, {
		dialog: !0,
		label: "Set up your rooms",
		onClose: t,
		children: [
			/* @__PURE__ */ (0, f.jsx)("h2", { children: "Set up your rooms" }),
			!n && !h && /* @__PURE__ */ (0, f.jsx)("p", {
				className: "muted setup-intro",
				children: "Looking for your valves…"
			}),
			n && !n.rooms.length && /* @__PURE__ */ (0, f.jsx)("p", {
				className: "muted setup-intro",
				children: "Every Hive radiator valve with an area is already in a room. Give the others an area in Home Assistant, or add rooms by hand."
			}),
			n && n.rooms.length > 0 && /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [/* @__PURE__ */ (0, f.jsxs)("p", {
				className: "muted setup-intro",
				children: [
					"Found ",
					x,
					" Hive radiator valve",
					x === 1 ? "" : "s",
					" in ",
					n.rooms.length,
					" area",
					n.rooms.length === 1 ? "" : "s",
					". Pick the rooms to create. You can rename or change any of them later."
				]
			}), /* @__PURE__ */ (0, f.jsx)("div", {
				className: "setup-list",
				children: n.rooms.map((e, t) => {
					let r = o.has(t), a = e.valves.map((e) => i.get(e) ?? e).join(", "), s = e.sensor ? `Temperature: ${i.get(e.sensor) ?? e.sensor}` : e.valves.length === 1 ? "Temperature: from the valve" : "Temperature: average of the valves";
					return /* @__PURE__ */ (0, f.jsxs)("div", {
						className: `setup-room ${r ? "on" : ""}`,
						children: [/* @__PURE__ */ (0, f.jsxs)("button", {
							type: "button",
							role: "checkbox",
							"aria-checked": r,
							className: "setup-room-main",
							onClick: () => C(t),
							children: [
								/* @__PURE__ */ (0, f.jsx)("span", {
									className: `valve-check ${r ? "on" : ""}`,
									"aria-hidden": "true",
									children: r && /* @__PURE__ */ (0, f.jsx)(p, { name: "check" })
								}),
								/* @__PURE__ */ (0, f.jsxs)("span", {
									className: "setup-room-text",
									children: [
										/* @__PURE__ */ (0, f.jsx)("span", { children: e.name }),
										/* @__PURE__ */ (0, f.jsx)("span", {
											className: "muted small",
											children: a
										}),
										/* @__PURE__ */ (0, f.jsx)("span", {
											className: "muted small",
											children: s
										})
									]
								}),
								/* @__PURE__ */ (0, f.jsx)("span", {
									className: "device-icon",
									children: /* @__PURE__ */ (0, f.jsx)(p, { name: Ze(e.name) })
								})
							]
						}), _ && r && /* @__PURE__ */ (0, f.jsxs)("select", {
							"aria-label": `Which receiver heats ${e.name}`,
							value: c[t] ?? "",
							onChange: (e) => l((n) => ({
								...n,
								[t]: e.target.value
							})),
							children: [/* @__PURE__ */ (0, f.jsx)("option", {
								value: "",
								disabled: !0,
								children: "Heated by…"
							}), n.receivers.map((e) => /* @__PURE__ */ (0, f.jsx)("option", {
								value: e.entry_id,
								children: e.name
							}, e.entry_id))]
						})]
					}, e.name);
				})
			})] }),
			h && /* @__PURE__ */ (0, f.jsx)("div", {
				className: "status error",
				children: h
			}),
			n && n.rooms.length > 0 && /* @__PURE__ */ (0, f.jsx)("button", {
				className: "sheet-go",
				style: { "--hl-accent": "var(--hl-brand)" },
				disabled: d || !y,
				onClick: S,
				children: d ? "Creating…" : `Create ${v.length} room${v.length === 1 ? "" : "s"}`
			}),
			/* @__PURE__ */ (0, f.jsx)("button", {
				className: "ghost sheet-cancel",
				onClick: t,
				disabled: d,
				children: n?.rooms.length ? "I'll set them up myself" : "Close"
			})
		]
	});
}
// src/Settings.tsx
function $e({ getHass: e, devices: t, status: n, onSetup: r }) {
	let [i, a] = (0, u.useState)(null), [o, s] = (0, u.useState)("");
	(0, u.useEffect)(() => {
		e().callWS({ type: "hive_local/settings" }).then(a).catch((e) => s(b(e)));
	}, [e]);
	let c = (t) => {
		a((e) => e && {
			...e,
			...t
		}), e().callWS({
			type: "hive_local/settings/set",
			...t
		}).then((e) => {
			a(e), s("");
		}).catch((e) => s(b(e)));
	}, l = (e) => c({ outdoor_entity: e || null });
	return /* @__PURE__ */ (0, f.jsxs)("div", {
		className: "settings",
		children: [
			/* @__PURE__ */ (0, f.jsx)("h2", {
				className: "history-title",
				children: "Settings"
			}),
			o && /* @__PURE__ */ (0, f.jsx)("div", {
				className: "status error",
				children: o
			}),
			/* @__PURE__ */ (0, f.jsxs)("section", {
				className: "settings-section",
				children: [/* @__PURE__ */ (0, f.jsx)("h3", { children: "Outside temperature" }), /* @__PURE__ */ (0, f.jsx)("div", {
					className: "settings-group",
					children: /* @__PURE__ */ (0, f.jsxs)("div", {
						className: "settings-row",
						children: [
							/* @__PURE__ */ (0, f.jsx)("span", {
								className: "device-icon",
								children: /* @__PURE__ */ (0, f.jsx)(p, { name: "weather-partly-cloudy" })
							}),
							/* @__PURE__ */ (0, f.jsxs)("div", {
								className: "settings-text",
								children: [/* @__PURE__ */ (0, f.jsx)("span", { children: "Weather or outdoor sensor" }), /* @__PURE__ */ (0, f.jsx)("span", {
									className: "muted small",
									children: "Shown in the heating history, next to the boiler's time on."
								})]
							}),
							/* @__PURE__ */ (0, f.jsxs)("select", {
								"aria-label": "Outside temperature",
								value: i?.outdoor_entity ?? "",
								onChange: (e) => l(e.target.value),
								disabled: !i,
								children: [/* @__PURE__ */ (0, f.jsx)("option", {
									value: "",
									children: "None"
								}), (i?.outdoor_candidates ?? []).map((e) => /* @__PURE__ */ (0, f.jsxs)("option", {
									value: e.entity_id,
									children: [e.name, e.area ? ` · ${e.area}` : ""]
								}, e.entity_id))]
							})
						]
					})
				})]
			}),
			i && /* @__PURE__ */ (0, f.jsx)(rt, {
				data: i,
				save: c
			}),
			/* @__PURE__ */ (0, f.jsx)(at, { getHass: e }),
			t.map((r) => /* @__PURE__ */ (0, f.jsxs)("section", {
				className: "settings-section",
				children: [/* @__PURE__ */ (0, f.jsx)("h3", { children: t.length > 1 ? r.name : "Receiver" }), /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "settings-group",
					children: [r.channels.map((t) => /* @__PURE__ */ (0, f.jsx)(ct, {
						getHass: e,
						device: r,
						channel: t,
						info: n[r.entry_id]?.[t]
					}, t)), n[r.entry_id]?.heat?.demand && /* @__PURE__ */ (0, f.jsx)(ut, {
						getHass: e,
						device: r,
						info: n[r.entry_id].heat.demand
					})]
				})]
			}, r.entry_id)),
			/* @__PURE__ */ (0, f.jsx)(tt, { getHass: e }),
			r && /* @__PURE__ */ (0, f.jsxs)("section", {
				className: "settings-section",
				children: [/* @__PURE__ */ (0, f.jsx)("h3", { children: "Setup" }), /* @__PURE__ */ (0, f.jsx)("div", {
					className: "settings-group",
					children: /* @__PURE__ */ (0, f.jsxs)("button", {
						className: "settings-row link",
						onClick: r,
						children: [
							/* @__PURE__ */ (0, f.jsx)("span", {
								className: "device-icon",
								children: /* @__PURE__ */ (0, f.jsx)(p, { name: "map-marker-path" })
							}),
							/* @__PURE__ */ (0, f.jsxs)("div", {
								className: "settings-text",
								children: [/* @__PURE__ */ (0, f.jsx)("span", { children: "Run setup again" }), /* @__PURE__ */ (0, f.jsx)("span", {
									className: "muted small",
									children: "Rooms, rooms calling for heat, duplicate entities and the outside temperature, one step at a time."
								})]
							}),
							/* @__PURE__ */ (0, f.jsx)(p, {
								name: "chevron-right",
								className: "slot-chev"
							})
						]
					})
				})]
			})
		]
	});
}
var et = (e, t, n = `${t}s`) => `${e} ${e === 1 ? t : n}`;
function tt({ getHass: e, bare: t, empty: n }) {
	let [r, i] = (0, u.useState)(null), [a, o] = (0, u.useState)(!1), [s, c] = (0, u.useState)(""), l = (t) => {
		o(!0), e().callWS({ type: t }).then((e) => {
			i(e), c("");
		}).catch((e) => c(b(e))).finally(() => o(!1));
	};
	if ((0, u.useEffect)(() => l("hive_local/tidy"), [e]), !r || !r.receiver.length && !r.valves.length) return n && r ? /* @__PURE__ */ (0, f.jsx)("p", {
		className: "muted",
		children: n
	}) : null;
	let d = [r.receiver.length ? `${et(r.receiver.length, "receiver thermostat")} from ZHA or Zigbee2MQTT ${r.receiver.length === 1 ? "is" : "are"} disabled` : null, r.valves.length ? `${et(r.valves.length, "room valve")} ${r.valves.length === 1 ? "is" : "are"} hidden` : null].filter(Boolean), m = r.pending ? "Hive Local's heating and room entities replace them. Valves are only hidden: rooms still use them." : `Done: ${d.join(", and ")}. Switch any back in their entity settings, or Undo.`, h = /* @__PURE__ */ (0, f.jsx)("div", {
		className: "settings-group",
		children: /* @__PURE__ */ (0, f.jsxs)("div", {
			className: "settings-row",
			children: [
				/* @__PURE__ */ (0, f.jsx)("span", {
					className: "device-icon",
					children: /* @__PURE__ */ (0, f.jsx)(p, { name: "broom" })
				}),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "settings-text",
					children: [/* @__PURE__ */ (0, f.jsx)("span", { children: r.pending ? "Tidy up duplicate entities" : "Duplicate entities tidied up" }), /* @__PURE__ */ (0, f.jsx)("span", {
						className: "muted small",
						children: m
					})]
				}),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "settings-controls",
					children: [r.undoable > 0 && /* @__PURE__ */ (0, f.jsx)("button", {
						className: "ghost",
						disabled: a,
						onClick: () => l("hive_local/tidy/undo"),
						children: "Undo"
					}), r.pending > 0 && /* @__PURE__ */ (0, f.jsxs)("button", {
						className: "device-action tidy-action",
						disabled: a,
						onClick: () => l("hive_local/tidy/apply"),
						children: ["Tidy up ", r.pending]
					})]
				})
			]
		})
	});
	return t ? /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [s && /* @__PURE__ */ (0, f.jsx)("div", {
		className: "status error",
		children: s
	}), h] }) : /* @__PURE__ */ (0, f.jsxs)("section", {
		className: "settings-section",
		children: [
			/* @__PURE__ */ (0, f.jsx)("h3", { children: "Entities" }),
			s && /* @__PURE__ */ (0, f.jsx)("div", {
				className: "status error",
				children: s
			}),
			h
		]
	});
}
var nt = [
	6,
	9,
	12,
	15,
	18,
	20,
	24,
	25,
	28,
	30,
	32,
	35,
	40,
	45,
	50
];
function rt({ data: e, save: t }) {
	let [n, r] = (0, u.useState)(null), i = (0, u.useRef)(null), a = (0, u.useRef)(), o = e.boiler_kw, s = (e) => {
		if (o == null) return t({ boiler_kw: 24 });
		t({ boiler_kw: (e > 0 ? nt.find((e) => e > o) : [...nt].reverse().find((e) => e < o)) ?? o });
	}, c = it[e.currency], l = n ?? e.fixed_price, d = (n, o = 0) => {
		let s = i.current ?? e.fixed_price ?? .06, c = o > 15 ? .001 : 1e-4, l = Math.max(0, Math.round((n > 0 ? Math.floor(s / c + 1e-6) + 1 : Math.ceil(s / c - 1e-6) - 1) * c * 1e4) / 1e4);
		i.current = l, r(l), window.clearTimeout(a.current), a.current = window.setTimeout(() => {
			t({
				price_source: "fixed",
				fixed_price: l
			}), i.current = null, r(null);
		}, 800);
	}, m = (n) => t(n === "fixed" && e.fixed_price == null ? {
		price_source: n,
		fixed_price: e.price ?? .06
	} : { price_source: n || null }), h = e.fit, g = e.gas_meter ? h ? `Learned ${h.kw.toFixed(1)} kW while heating from ${h.days} days${h.baseline >= .5 ? ` (plus ${h.baseline.toFixed(0)} kWh a day for hot water and cooking)` : ""}.` : e.learned_at ? "Not enough yet: it needs at least 4 days of readings with the heating on. Checked every 6 hours." : "Learning from the last 14 days…" : "Learns the boiler's real average output from your gas use. Hot water and cooking on the same meter are allowed for.", _ = e.price_source === "fixed" ? "Your unit rate, below." : e.price_source === "energy" && e.energy_price == null ? "The Energy dashboard has no gas price (or it can't be read)." : e.price_source && e.price_source !== "fixed" && e.price == null ? "That entity has no price right now." : ((t) => t == null ? null : `${ge(t, e.currency)} per kWh`)(e.price) ?? "Pick where the price comes from.";
	return /* @__PURE__ */ (0, f.jsxs)("section", {
		className: "settings-section",
		children: [
			/* @__PURE__ */ (0, f.jsx)("h3", { children: "Heating cost" }),
			/* @__PURE__ */ (0, f.jsx)("p", {
				className: "muted small settings-help",
				children: "An estimated cost in the heating history: the boiler's time on × its average output while on × the gas price. A modern boiler turns its flame down, so it averages well below its rating: a gas meter gives the real figure."
			}),
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "settings-group",
				children: [
					/* @__PURE__ */ (0, f.jsxs)("div", {
						className: "settings-row",
						children: [
							/* @__PURE__ */ (0, f.jsx)("span", {
								className: "device-icon",
								children: /* @__PURE__ */ (0, f.jsx)(p, { name: "meter-gas-outline" })
							}),
							/* @__PURE__ */ (0, f.jsxs)("div", {
								className: "settings-text",
								children: [/* @__PURE__ */ (0, f.jsx)("span", { children: "Gas meter" }), /* @__PURE__ */ (0, f.jsx)("span", {
									className: "muted small",
									children: g
								})]
							}),
							/* @__PURE__ */ (0, f.jsxs)("select", {
								"aria-label": "Gas meter",
								value: e.gas_meter ?? "",
								onChange: (e) => t({ gas_meter: e.target.value || null }),
								children: [/* @__PURE__ */ (0, f.jsx)("option", {
									value: "",
									children: "None"
								}), e.gas_meter_candidates.map((e) => /* @__PURE__ */ (0, f.jsxs)("option", {
									value: e.entity_id,
									children: [e.name, e.area ? ` · ${e.area}` : ""]
								}, e.entity_id))]
							})
						]
					}),
					/* @__PURE__ */ (0, f.jsxs)("div", {
						className: "settings-row",
						children: [
							/* @__PURE__ */ (0, f.jsx)("span", {
								className: "device-icon",
								children: /* @__PURE__ */ (0, f.jsx)(p, { name: "fire" })
							}),
							/* @__PURE__ */ (0, f.jsxs)("div", {
								className: "settings-text",
								children: [/* @__PURE__ */ (0, f.jsx)("span", { children: "Boiler rating" }), /* @__PURE__ */ (0, f.jsx)("span", {
									className: "muted small",
									children: e.output_basis === "meter" ? "Not needed while the gas meter gives the output." : `Its heating output in kW, from the manual or label (often 24–35 kW for a combi). Counted at ${Math.round(e.modulation * 100)}% without a gas meter.`
								})]
							}),
							/* @__PURE__ */ (0, f.jsxs)("div", {
								className: "settings-controls",
								children: [/* @__PURE__ */ (0, f.jsx)(dt, {
									value: o == null ? "Not set" : `${o.toLocaleString()} kW`,
									onLower: () => s(-1),
									onRaise: () => s(1)
								}), o != null && /* @__PURE__ */ (0, f.jsx)("button", {
									className: "ghost small",
									onClick: () => t({ boiler_kw: null }),
									children: "Clear"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, f.jsxs)("div", {
						className: "settings-row",
						children: [
							/* @__PURE__ */ (0, f.jsx)("span", {
								className: "device-icon",
								children: /* @__PURE__ */ (0, f.jsx)(p, { name: "cash" })
							}),
							/* @__PURE__ */ (0, f.jsxs)("div", {
								className: "settings-text",
								children: [/* @__PURE__ */ (0, f.jsx)("span", { children: "Gas price" }), /* @__PURE__ */ (0, f.jsx)("span", {
									className: "muted small",
									children: _
								})]
							}),
							/* @__PURE__ */ (0, f.jsx)("div", {
								className: "settings-controls",
								children: /* @__PURE__ */ (0, f.jsxs)("select", {
									"aria-label": "Gas price",
									value: e.price_source ?? "",
									onChange: (e) => m(e.target.value),
									children: [
										/* @__PURE__ */ (0, f.jsx)("option", {
											value: "",
											children: "None"
										}),
										/* @__PURE__ */ (0, f.jsx)("option", {
											value: "energy",
											children: "Energy dashboard"
										}),
										/* @__PURE__ */ (0, f.jsx)("option", {
											value: "fixed",
											children: "Unit rate"
										}),
										e.price_candidates.map((e) => /* @__PURE__ */ (0, f.jsxs)("option", {
											value: e.entity_id,
											children: [
												e.name,
												" (",
												e.unit,
												")"
											]
										}, e.entity_id))
									]
								})
							})
						]
					}),
					e.price_source === "fixed" && /* @__PURE__ */ (0, f.jsxs)("div", {
						className: "settings-row",
						children: [
							/* @__PURE__ */ (0, f.jsx)("span", {
								className: "device-icon",
								children: /* @__PURE__ */ (0, f.jsx)(p, { name: "tag-outline" })
							}),
							/* @__PURE__ */ (0, f.jsxs)("div", {
								className: "settings-text",
								children: [/* @__PURE__ */ (0, f.jsx)("span", { children: "Unit rate" }), /* @__PURE__ */ (0, f.jsx)("span", {
									className: "muted small",
									children: "From your bill or tariff: the gas price per kWh, without the standing charge."
								})]
							}),
							/* @__PURE__ */ (0, f.jsx)("div", {
								className: "settings-controls",
								children: /* @__PURE__ */ (0, f.jsx)(dt, {
									value: l == null ? "–" : c ? `${(l * 100).toFixed(2)}${c}` : ge(l, e.currency),
									onLower: (e) => d(-1, e),
									onRaise: (e) => d(1, e),
									hold: !0
								})
							})
						]
					})
				]
			})
		]
	});
}
var it = {
	GBP: "p",
	EUR: "c",
	USD: "¢",
	CAD: "¢",
	AUD: "c",
	NZD: "c",
	IEP: "p"
};
function at({ getHass: e }) {
	let [t, n] = (0, u.useState)(null), [r, i] = (0, u.useState)([]), [a, o] = (0, u.useState)(null), [s, c] = (0, u.useState)(!1), [l, d] = (0, u.useState)(0);
	(0, u.useEffect)(() => {
		e().callWS({ type: "hive_local/rooms/suggest" }).then((e) => d(e.rooms.length)).catch(() => {});
	}, [e, t]), (0, u.useEffect)(() => {
		let t = e().connection.subscribeMessage((e) => {
			n(e.rooms), i(e.receivers);
		}, { type: "hive_local/rooms/subscribe" });
		return () => {
			t.then((e) => e()).catch(() => {});
		};
	}, [e]);
	let m = r.length > 1;
	return /* @__PURE__ */ (0, f.jsxs)("section", {
		className: "settings-section",
		children: [
			/* @__PURE__ */ (0, f.jsx)("h3", { children: "Rooms" }),
			/* @__PURE__ */ (0, f.jsx)("p", {
				className: "muted small settings-help",
				children: "Group your Hive radiator valves into rooms. Each room then has a card on the Overview."
			}),
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "settings-group",
				children: [
					(t ?? []).map((e) => /* @__PURE__ */ (0, f.jsxs)("button", {
						className: "settings-row link",
						onClick: () => o(e.id),
						children: [
							/* @__PURE__ */ (0, f.jsx)("span", {
								className: "device-icon",
								children: /* @__PURE__ */ (0, f.jsx)(p, { name: "home-thermometer-outline" })
							}),
							/* @__PURE__ */ (0, f.jsxs)("div", {
								className: "settings-text",
								children: [/* @__PURE__ */ (0, f.jsx)("span", { children: e.name }), /* @__PURE__ */ (0, f.jsx)("span", {
									className: "muted small",
									children: [
										`${e.valves.length} valve${e.valves.length === 1 ? "" : "s"}`,
										e.sensor_name ?? "temperature from the valves",
										m ? `heated by ${e.receiver_name}` : null
									].filter(Boolean).join(" · ")
								})]
							}),
							/* @__PURE__ */ (0, f.jsx)(p, {
								name: "chevron-right",
								className: "settings-chevron"
							})
						]
					}, e.id)),
					l > 0 && /* @__PURE__ */ (0, f.jsxs)("button", {
						className: "settings-row link add",
						onClick: () => c(!0),
						children: [/* @__PURE__ */ (0, f.jsx)("span", {
							className: "device-icon",
							children: /* @__PURE__ */ (0, f.jsx)(p, { name: "auto-fix" })
						}), /* @__PURE__ */ (0, f.jsxs)("div", {
							className: "settings-text",
							children: [/* @__PURE__ */ (0, f.jsx)("span", { children: t?.length ? "Add rooms from your areas" : "Set up rooms from your areas" }), /* @__PURE__ */ (0, f.jsxs)("span", {
								className: "muted small",
								children: [
									l,
									" area",
									l === 1 ? " has" : "s have",
									" Hive valves that aren't in a room yet"
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, f.jsxs)("button", {
						className: "settings-row link add",
						onClick: () => o("new"),
						children: [/* @__PURE__ */ (0, f.jsx)("span", {
							className: "device-icon",
							children: /* @__PURE__ */ (0, f.jsx)(p, { name: "plus" })
						}), /* @__PURE__ */ (0, f.jsx)("div", {
							className: "settings-text",
							children: /* @__PURE__ */ (0, f.jsx)("span", { children: "Add a room" })
						})]
					})
				]
			}),
			s && /* @__PURE__ */ (0, f.jsx)(Qe, {
				getHass: e,
				onDone: () => c(!1)
			}),
			a && /* @__PURE__ */ (0, f.jsx)(Ke, {
				getHass: e,
				room: a === "new" ? void 0 : t?.find((e) => e.id === a),
				onDone: () => o(null)
			})
		]
	});
}
var ot = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, st = [
	15,
	30,
	45,
	60,
	90,
	120,
	180,
	240,
	360
];
function ct({ getHass: e, device: t, channel: n, info: r }) {
	let [i, a] = (0, u.useState)(null), o = (0, u.useRef)(), s = i ?? r;
	if (!s) return null;
	let c = (r, i) => {
		let c = {
			...s,
			[r]: i
		};
		a(c), window.clearTimeout(o.current), o.current = window.setTimeout(() => {
			e().callWS({
				type: "hive_local/defaults",
				entry_id: t.entry_id,
				channel: n,
				[r]: i
			}).finally(() => a(null));
		}, 800);
	}, l = (e) => {
		let t = st.findIndex((e) => e >= s.boost_minutes), n = t < 0 ? st.length - 1 : t;
		return st[Math.min(st.length - 1, Math.max(0, n + e))];
	}, d = n === "water";
	return /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [/* @__PURE__ */ (0, f.jsxs)("div", {
		className: "settings-row",
		children: [
			/* @__PURE__ */ (0, f.jsx)("span", {
				className: "device-icon",
				children: /* @__PURE__ */ (0, f.jsx)(p, { name: d ? "water-boiler" : "radiator" })
			}),
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "settings-text",
				children: [/* @__PURE__ */ (0, f.jsx)("span", { children: d ? "Hot water boost" : "Heating boost" }), /* @__PURE__ */ (0, f.jsx)("span", {
					className: "muted small",
					children: "What Boost does unless you choose otherwise."
				})]
			}),
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "settings-controls",
				children: [/* @__PURE__ */ (0, f.jsx)(dt, {
					label: "How long",
					value: ot(s.boost_minutes),
					onLower: () => c("boost_minutes", l(-1)),
					onRaise: () => c("boost_minutes", l(1))
				}), !d && /* @__PURE__ */ (0, f.jsx)(dt, {
					label: "Temperature",
					value: `${s.boost_temperature.toFixed(1)}°`,
					onLower: () => c("boost_temperature", Math.max(5, s.boost_temperature - .5)),
					onRaise: () => c("boost_temperature", Math.min(32, s.boost_temperature + .5))
				})]
			})
		]
	}), !d && /* @__PURE__ */ (0, f.jsxs)("div", {
		className: "settings-row",
		children: [
			/* @__PURE__ */ (0, f.jsx)("span", {
				className: "device-icon",
				children: /* @__PURE__ */ (0, f.jsx)(p, { name: "snowflake" })
			}),
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "settings-text",
				children: [/* @__PURE__ */ (0, f.jsx)("span", { children: "Frost protection" }), /* @__PURE__ */ (0, f.jsx)("span", {
					className: "muted small",
					children: "The target shown while the schedule has the heating off. Only for display: the receiver isn't changed."
				})]
			}),
			/* @__PURE__ */ (0, f.jsx)("div", {
				className: "settings-controls",
				children: /* @__PURE__ */ (0, f.jsx)(dt, {
					value: `${s.frost_temperature.toFixed(1)}°`,
					onLower: () => c("frost_temperature", Math.max(5, s.frost_temperature - .5)),
					onRaise: () => c("frost_temperature", Math.min(16, s.frost_temperature + .5))
				})
			})
		]
	})] });
}
var lt = {
	warm: "On. The rooms are warm.",
	no_rooms: "On, but no room has recent valve readings.",
	stopped: "Stopped for now: it starts again once the rooms are warm.",
	mode: "On. It only acts while the heating is on Schedule.",
	schedule_off: "On. The schedule has the heating off now.",
	heating: "On. The receiver is already heating.",
	holiday: "On, but not while you're away.",
	preheat: "On. Pre-heating comes first.",
	waiting: "On. The boiler rests a few minutes between requests."
};
function ut({ getHass: e, device: t, info: n }) {
	let { busy: r, result: i, send: a } = x(e, t.entry_id, "heat"), o = n.enabled ? n.active ? `On. Heating for ${E(n.rooms)} now.` : lt[n.reason ?? ""] ?? "On." : "When a room this receiver heats is cold, or one of its valves is heating, the heating comes on for it. Each request lasts 30 min at a time, so it stops by itself if Home Assistant does.", s = (e, t, n) => /* @__PURE__ */ (0, f.jsx)("div", {
		className: "segmented",
		role: "radiogroup",
		"aria-label": n,
		children: [!0, !1].map((i) => /* @__PURE__ */ (0, f.jsx)("button", {
			role: "radio",
			"aria-checked": e === i,
			className: e === i ? "on" : "",
			disabled: r,
			onClick: () => a({
				type: "hive_local/demand",
				[t]: i
			}, i ? `${n}: on` : `${n}: off`),
			children: i ? "On" : "Off"
		}, String(i)))
	});
	return /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
		/* @__PURE__ */ (0, f.jsxs)("div", {
			className: "settings-row",
			children: [
				/* @__PURE__ */ (0, f.jsx)("span", {
					className: "device-icon",
					children: /* @__PURE__ */ (0, f.jsx)(p, { name: "home-thermometer-outline" })
				}),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "settings-text",
					children: [/* @__PURE__ */ (0, f.jsx)("span", { children: "Rooms call for heat" }), /* @__PURE__ */ (0, f.jsx)("span", {
						className: "muted small",
						children: o
					})]
				}),
				/* @__PURE__ */ (0, f.jsx)("div", {
					className: "settings-controls",
					children: s(n.enabled, "enabled", "Rooms call for heat")
				})
			]
		}),
		n.enabled && /* @__PURE__ */ (0, f.jsxs)("div", {
			className: "settings-row",
			children: [
				/* @__PURE__ */ (0, f.jsx)("span", {
					className: "device-icon",
					children: /* @__PURE__ */ (0, f.jsx)(p, { name: "calendar-remove-outline" })
				}),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "settings-text",
					children: [/* @__PURE__ */ (0, f.jsx)("span", { children: "Outside the schedule" }), /* @__PURE__ */ (0, f.jsx)("span", {
						className: "muted small",
						children: "Rooms can heat while the schedule has the heating off. Never while the heating is Off."
					})]
				}),
				/* @__PURE__ */ (0, f.jsx)("div", {
					className: "settings-controls",
					children: s(n.outside_schedule, "outside_schedule", "Outside the schedule")
				})
			]
		}),
		i?.kind === "error" && /* @__PURE__ */ (0, f.jsx)("div", {
			className: "status error",
			children: i.text
		})
	] });
}
function dt({ label: e, value: t, onLower: n, onRaise: r, hold: i }) {
	let a = ft(n, i), o = ft(r, i);
	return /* @__PURE__ */ (0, f.jsxs)("div", {
		className: "adjust",
		children: [e && /* @__PURE__ */ (0, f.jsx)("span", {
			className: "muted small",
			children: e
		}), /* @__PURE__ */ (0, f.jsxs)("div", {
			className: "stepper",
			children: [
				/* @__PURE__ */ (0, f.jsx)("button", {
					className: "round",
					...a,
					"aria-label": `Lower ${e ?? ""}`.trim(),
					children: /* @__PURE__ */ (0, f.jsx)(p, { name: "minus" })
				}),
				/* @__PURE__ */ (0, f.jsx)("span", {
					className: "stepper-value",
					children: t
				}),
				/* @__PURE__ */ (0, f.jsx)("button", {
					className: "round",
					...o,
					"aria-label": `Raise ${e ?? ""}`.trim(),
					children: /* @__PURE__ */ (0, f.jsx)(p, { name: "plus" })
				})
			]
		})]
	});
}
function ft(e, t) {
	let n = (0, u.useRef)(e);
	n.current = e;
	let r = (0, u.useRef)(), i = () => window.clearTimeout(r.current);
	return (0, u.useEffect)(() => i, []), t ? {
		onPointerDown: (e) => {
			if (e.button !== 0) return;
			n.current(0);
			let t = 400, i = 0, a = () => {
				i += 1, n.current(i), t = i < 5 ? 150 : i < 20 ? 70 : 30, r.current = window.setTimeout(a, t);
			};
			r.current = window.setTimeout(a, t);
		},
		onPointerUp: i,
		onPointerLeave: i,
		onPointerCancel: i,
		onContextMenu: (e) => e.preventDefault(),
		onClick: (t) => {
			t.detail === 0 && e(0);
		}
	} : { onClick: () => e(0) };
}
// src/Onboarding.tsx
var pt = {
	rooms: "Your rooms",
	demand: "Rooms call for heat",
	tidy: "Tidy up duplicate entities",
	outside: "Outside temperature",
	done: "You're all set"
};
function mt({ getHass: e, devices: t, status: n, onDone: r }) {
	let i = t.filter((e) => e.channels.includes("heat")), a = [
		"rooms",
		...i.length ? ["demand"] : [],
		"tidy",
		"outside",
		"done"
	], [o, s] = (0, u.useState)(0), c = a[o], l = o === a.length - 1;
	return (0, u.useEffect)(() => {
		let e = (e) => e.key === "Escape" && r();
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [r]), /* @__PURE__ */ (0, f.jsx)("div", {
		className: "sheet-backdrop",
		onClick: (e) => e.stopPropagation(),
		children: /* @__PURE__ */ (0, f.jsxs)("div", {
			className: "sheet room-sheet onboarding",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Set up Hive Local",
			children: [
				/* @__PURE__ */ (0, f.jsx)("span", { className: "sheet-handle" }),
				/* @__PURE__ */ (0, f.jsx)("div", {
					className: "onboarding-dots",
					"aria-hidden": "true",
					children: a.map((e, t) => /* @__PURE__ */ (0, f.jsx)("i", { className: t === o ? "on" : t < o ? "past" : "" }, e))
				}),
				/* @__PURE__ */ (0, f.jsx)("h2", { children: pt[c] }),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "onboarding-body",
					children: [
						c === "rooms" && /* @__PURE__ */ (0, f.jsx)(ht, { getHass: e }),
						c === "demand" && /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [/* @__PURE__ */ (0, f.jsx)("p", {
							className: "muted",
							children: "Lets a cold room bring the heating on even when the receiver's own thermostat is warm enough. Off unless you turn it on."
						}), /* @__PURE__ */ (0, f.jsx)("div", {
							className: "settings-group",
							children: i.map((t) => n[t.entry_id]?.heat?.demand ? /* @__PURE__ */ (0, f.jsx)(ut, {
								getHass: e,
								device: t,
								info: n[t.entry_id].heat.demand
							}, t.entry_id) : null)
						})] }),
						c === "tidy" && /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [/* @__PURE__ */ (0, f.jsx)("p", {
							className: "muted",
							children: "ZHA or Zigbee2MQTT makes its own thermostat for the receiver and for each valve."
						}), /* @__PURE__ */ (0, f.jsx)(tt, {
							getHass: e,
							bare: !0,
							empty: "Nothing to tidy up: no duplicates found."
						})] }),
						c === "outside" && /* @__PURE__ */ (0, f.jsx)(gt, { getHass: e }),
						c === "done" && /* @__PURE__ */ (0, f.jsxs)("p", {
							className: "muted",
							children: [
								"Everything here is in ",
								/* @__PURE__ */ (0, f.jsx)("b", { children: "Settings" }),
								", along with boost defaults, frost protection and the gas price for cost estimates. Tap a room on the Overview to set its temperature, boost it or give its valves a schedule."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "onboarding-actions",
					children: [o > 0 && !l && /* @__PURE__ */ (0, f.jsx)("button", {
						className: "ghost",
						onClick: () => s(o - 1),
						children: "Back"
					}), /* @__PURE__ */ (0, f.jsx)("button", {
						className: "sheet-go",
						style: { "--hl-accent": "var(--hl-brand)" },
						onClick: () => l ? r() : s(o + 1),
						children: l ? "Go to the Overview" : "Next"
					})]
				}),
				!l && /* @__PURE__ */ (0, f.jsx)("button", {
					className: "ghost sheet-cancel",
					onClick: r,
					children: "Skip setup"
				})
			]
		})
	});
}
function ht({ getHass: e }) {
	let [t, n] = (0, u.useState)(null), [r, i] = (0, u.useState)(0), [a, o] = (0, u.useState)(!1), [s, c] = (0, u.useState)(""), l = () => e().callWS({ type: "hive_local/rooms/suggest" }).then((e) => n(e.rooms.length)).catch((e) => c(b(e)));
	return (0, u.useEffect)(() => {
		l(), e().callWS({ type: "hive_local/rooms/valves" }).then((e) => i(new Set(e.valves.map((e) => e.room).filter(Boolean)).size)).catch(() => {});
	}, [e]), /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
		/* @__PURE__ */ (0, f.jsx)("p", {
			className: "muted",
			children: "A room groups its Hive radiator valves, so you can set, boost and schedule them together. Give a room a temperature sensor and the valves heat to its reading instead of their own, taken beside the radiator."
		}),
		s && /* @__PURE__ */ (0, f.jsx)("div", {
			className: "status error",
			children: s
		}),
		/* @__PURE__ */ (0, f.jsx)("div", {
			className: "settings-group",
			children: /* @__PURE__ */ (0, f.jsxs)("div", {
				className: "settings-row",
				children: [
					/* @__PURE__ */ (0, f.jsx)("span", {
						className: "device-icon",
						children: /* @__PURE__ */ (0, f.jsx)(p, { name: "home-thermometer-outline" })
					}),
					/* @__PURE__ */ (0, f.jsxs)("div", {
						className: "settings-text",
						children: [/* @__PURE__ */ (0, f.jsx)("span", { children: t == null ? "Looking for your valves…" : t ? `${t} ${t === 1 ? "area has" : "areas have"} Hive valves that aren't in a room yet` : r ? "Every Hive valve with an area is in a room" : "No Hive radiator valves found" }), /* @__PURE__ */ (0, f.jsxs)("span", {
							className: "muted small",
							children: [r ? `${r} ${r === 1 ? "room" : "rooms"} so far. ` : "", t === 0 && !r ? "Pair them with ZHA or Zigbee2MQTT and give them an area; you can add rooms later in Settings." : "You can add or change rooms later in Settings."]
						})]
					}),
					!!t && /* @__PURE__ */ (0, f.jsx)("button", {
						className: "device-action tidy-action",
						onClick: () => o(!0),
						children: "Set up rooms"
					})
				]
			})
		}),
		a && /* @__PURE__ */ (0, f.jsx)(Qe, {
			getHass: e,
			onDone: () => {
				o(!1), l(), e().callWS({ type: "hive_local/rooms/valves" }).then((e) => i(new Set(e.valves.map((e) => e.room).filter(Boolean)).size)).catch(() => {});
			}
		})
	] });
}
function gt({ getHass: e }) {
	let [t, n] = (0, u.useState)(null), [r, i] = (0, u.useState)("");
	(0, u.useEffect)(() => {
		e().callWS({ type: "hive_local/settings" }).then(n).catch((e) => i(b(e)));
	}, [e]);
	let a = (t) => {
		n((e) => e && {
			...e,
			outdoor_entity: t || null
		}), e().callWS({
			type: "hive_local/settings/set",
			outdoor_entity: t || null
		}).catch((e) => i(b(e)));
	};
	return /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
		/* @__PURE__ */ (0, f.jsx)("p", {
			className: "muted",
			children: "Shown in the heating history next to how long the boiler was on, so a cold week makes sense."
		}),
		r && /* @__PURE__ */ (0, f.jsx)("div", {
			className: "status error",
			children: r
		}),
		/* @__PURE__ */ (0, f.jsx)("div", {
			className: "settings-group",
			children: /* @__PURE__ */ (0, f.jsxs)("div", {
				className: "settings-row",
				children: [
					/* @__PURE__ */ (0, f.jsx)("span", {
						className: "device-icon",
						children: /* @__PURE__ */ (0, f.jsx)(p, { name: "weather-partly-cloudy" })
					}),
					/* @__PURE__ */ (0, f.jsx)("div", {
						className: "settings-text",
						children: /* @__PURE__ */ (0, f.jsx)("span", { children: "Weather or outdoor sensor" })
					}),
					/* @__PURE__ */ (0, f.jsxs)("select", {
						"aria-label": "Outside temperature",
						value: t?.outdoor_entity ?? "",
						onChange: (e) => a(e.target.value),
						disabled: !t,
						children: [/* @__PURE__ */ (0, f.jsx)("option", {
							value: "",
							children: "None"
						}), (t?.outdoor_candidates ?? []).map((e) => /* @__PURE__ */ (0, f.jsxs)("option", {
							value: e.entity_id,
							children: [e.name, e.area ? ` · ${e.area}` : ""]
						}, e.entity_id))]
					})
				]
			})
		})
	] });
}
// src/RoomSchedule.tsx
var _t = {
	max_transitions: 6,
	heat_min: 5,
	heat_max: 32,
	boost_min_temp: 5,
	boost_max_minutes: 360,
	water_on: 22,
	water_off: 1
}, vt = (e) => e[0].toUpperCase() + e.slice(1, 3);
function L(e) {
	return e == null ? "its clock isn't set" : `its clock is ${Math.round(Math.abs(e) / 60)} min ${e < 0 ? "behind" : "ahead"}`;
}
function yt({ getHass: e, room: t, onClose: n, page: r }) {
	let [i, a] = (0, u.useState)([]), [o, s] = (0, u.useState)([]), [c, l] = (0, u.useState)(_t);
	(0, u.useEffect)(() => {
		let e = (e) => !r && e.key === "Escape" && n?.();
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [n, r]);
	let d = (0, u.useMemo)(() => ({
		noun: "valves",
		embedded: !r,
		statusLine: t.mode === "schedule" ? "Your schedule is running. It's kept on each valve, so it runs without Home Assistant; saving writes the changed days to every valve." : `Your schedule isn't being used: the room is ${t.mode === "off" ? "off" : "on Manual"}. Choose Schedule on the Control tab to use it.`,
		read: async () => {
			let n = await e().callWS({
				type: "hive_local/rooms/schedule/get",
				room_id: t.id
			});
			a(n.valves), s(n.differs), l({
				..._t,
				...n.limits
			});
			let r = n.limits.frost;
			if (r == null) return n;
			let i = 0, o = Object.fromEntries(Object.entries(n.schedule).map(([e, t]) => [e, (t ?? []).map((e) => e.setpoint <= _t.heat_min && e.setpoint !== r ? (i++, {
				...e,
				setpoint: r
			}) : e)]));
			return i ? {
				...n,
				edited: o,
				note: `Off used to keep the valves at ${_t.heat_min}°; it's now frost protection, ${r}°. Save to write the change to the valves.`
			} : n;
		},
		write: async (n) => {
			let r = await e().callWS({
				type: "hive_local/rooms/schedule/set",
				room_id: t.id,
				schedule: n
			}), i = g.filter((e) => e in r.schedule).map(vt).join(", "), a = r.valves.filter((e) => e.clock?.set).map((e) => e.name), o = r.valves.filter((e) => e.error), s = [o.length ? `Wrote ${i} to ${r.valves.length - o.length} of ${r.valves.length} valves. ${o.map((e) => `${e.name}: ${e.error}`).join(" ")}` : `Wrote ${i} to ${r.valves.length === 1 ? "the valve" : `all ${r.valves.length} valves`}. Read back to confirm they kept it.`, a.length ? `Set the clock on ${a.join(", ")}.` : ""];
			return {
				schedule: r.schedule,
				note: s.filter(Boolean).join(" "),
				error: o.length > 0
			};
		}
	}), [
		e,
		t.id,
		t.mode
	]), m = [];
	for (let e of i) e.error ? m.push(`${e.name} didn't answer: ${e.error}`) : e.complete || m.push(`${e.name} sent ${e.days} of 7 days.`), e.clock && !e.clock.ok && !e.error && m.push(`${e.name}: ${L(e.clock.offset)}. It's set when you save.`);
	let h = t.mode === "schedule" ? i.filter((e) => e.schedule_mode === !1) : [];
	h.length && m.push(`${h.map((e) => e.name).join(", ")} ${h.length === 1 ? "isn't" : "aren't"} following the schedule yet: choose Manual and then Schedule again on the Control tab.`), o.length && i.length > 1 && m.push(`The valves have different times on ${o.map(vt).join(", ")}. This shows ${i.find((e) => e.days)?.name ?? "the first valve"}'s; saving a day writes it to them all.`);
	let _ = /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
		r ? null : /* @__PURE__ */ (0, f.jsxs)("div", {
			className: "room-schedule-head",
			children: [/* @__PURE__ */ (0, f.jsx)("button", {
				className: "round ghost",
				onClick: () => n?.(),
				"aria-label": "Back to the room",
				children: /* @__PURE__ */ (0, f.jsx)(p, { name: "chevron-left" })
			}), /* @__PURE__ */ (0, f.jsxs)("div", {
				className: "page-title",
				children: [/* @__PURE__ */ (0, f.jsx)("h2", { children: "Schedule" }), /* @__PURE__ */ (0, f.jsxs)("span", {
					className: "muted small",
					children: [
						t.name,
						" · ",
						t.valves.length,
						" valve",
						t.valves.length === 1 ? "" : "s"
					]
				})]
			})]
		}),
		m.length > 0 && /* @__PURE__ */ (0, f.jsx)("ul", {
			className: "room-schedule-notes small",
			children: m.map((e) => /* @__PURE__ */ (0, f.jsx)("li", { children: e }, e))
		}),
		/* @__PURE__ */ (0, f.jsx)(ce, {
			getHass: e,
			limits: c,
			source: d
		}),
		/* @__PURE__ */ (0, f.jsx)("p", {
			className: "muted small room-schedule-note",
			children: "The valves sleep between check-ins, so reading or saving can take up to a couple of minutes; pressing a valve's dial wakes it. On ZHA, each valve's clock is checked first and set if it's wrong, or the schedule would run at the wrong times."
		})
	] });
	return r ? /* @__PURE__ */ (0, f.jsx)("div", {
		className: "room-schedule room-schedule-page",
		children: _
	}) : /* @__PURE__ */ (0, f.jsx)("div", {
		className: "sheet-backdrop",
		onClick: (e) => {
			e.stopPropagation(), n?.();
		},
		children: /* @__PURE__ */ (0, f.jsxs)("div", {
			className: "sheet heat room-sheet room-schedule",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": `${t.name} schedule`,
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, f.jsx)("span", { className: "sheet-handle" }), _]
		})
	});
}
// src/RoomPage.tsx
var bt = [
	{
		id: "control",
		label: "Control"
	},
	{
		id: "schedule",
		label: "Schedule"
	},
	{
		id: "history",
		label: "History"
	}
];
function xt({ getHass: e, roomId: t, devices: n, status: r, limits: i, tab: a, onTab: o, onBack: s }) {
	let [c, l] = (0, u.useState)(null), [d, m] = (0, u.useState)(!1);
	(0, u.useEffect)(() => {
		let n = e().connection.subscribeMessage((e) => {
			let n = e.rooms.find((e) => e.id === t) ?? null;
			l(n), m(!n);
		}, { type: "hive_local/rooms/subscribe" });
		return () => {
			n.then((e) => e()).catch(() => {});
		};
	}, [e, t]), (0, u.useEffect)(() => {
		d && s();
	}, [d, s]);
	let [h, g] = (0, u.useState)(a === "schedule");
	if ((0, u.useEffect)(() => {
		a === "schedule" && g(!0);
	}, [a]), !c) return null;
	let _ = n.length > 1, v = r[c.receiver ?? n[0]?.entry_id ?? ""]?.heat, y = [_ ? c.receiver_name : null, Ye(c)].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, f.jsxs)("div", {
		className: "device-page room-page",
		children: [
			/* @__PURE__ */ (0, f.jsxs)("div", {
				className: "page-head",
				children: [/* @__PURE__ */ (0, f.jsx)("button", {
					className: "round ghost",
					onClick: s,
					"aria-label": "Back to the overview",
					children: /* @__PURE__ */ (0, f.jsx)(p, { name: "chevron-left" })
				}), /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "page-title",
					children: [/* @__PURE__ */ (0, f.jsx)("h2", { children: c.name }), /* @__PURE__ */ (0, f.jsx)("span", {
						className: "muted small",
						children: y
					})]
				})]
			}),
			/* @__PURE__ */ (0, f.jsx)("div", {
				className: "page-tabs",
				role: "tablist",
				children: bt.map((e) => /* @__PURE__ */ (0, f.jsx)("button", {
					role: "tab",
					"aria-selected": e.id === a,
					className: e.id === a ? "on" : "",
					onClick: () => o(e.id),
					children: e.label
				}, e.id))
			}),
			a === "control" && /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [/* @__PURE__ */ (0, f.jsx)(P, {
				getHass: e,
				room: c,
				showReceiver: !1,
				limits: i,
				defaultMinutes: v?.boost_minutes ?? 60,
				defaultTemp: v?.boost_temperature ?? 21,
				page: !0
			}), /* @__PURE__ */ (0, f.jsx)(Xe, {
				getHass: e,
				room: c
			})] }),
			h && /* @__PURE__ */ (0, f.jsx)("div", {
				hidden: a !== "schedule",
				children: /* @__PURE__ */ (0, f.jsx)(yt, {
					getHass: e,
					room: c,
					page: !0
				})
			}),
			a === "history" && /* @__PURE__ */ (0, f.jsx)(Se, {
				getHass: e,
				devices: n,
				roomId: c.id
			})
		]
	});
}
// src/App.tsx
var St = [
	{
		id: "overview",
		label: "Overview",
		icon: "view-dashboard-outline"
	},
	{
		id: "devices",
		label: "Devices",
		icon: "devices"
	},
	{
		id: "stats",
		label: "Stats",
		icon: "chart-box-outline"
	},
	{
		id: "settings",
		label: "Settings",
		icon: "tune-variant"
	}
];
function Ct({ getHass: e, narrow: t, onToggleMenu: n }) {
	let [r, i] = (0, u.useState)([]), [a, o] = (0, u.useState)(null), [s, c] = (0, u.useState)({}), [l, d] = (0, u.useState)("overview"), [m, g] = (0, u.useState)(null), [_, v] = (0, u.useState)("control"), [y, x] = (0, u.useState)(null), [S, C] = (0, u.useState)(""), [w, T] = (0, u.useState)(!1);
	(0, u.useEffect)(() => {
		e().callWS({ type: "hive_local/devices" }).then((e) => {
			i(e.devices), o(e.limits);
		}).catch((e) => C(b(e))), e().callWS({ type: "hive_local/settings" }).then((e) => T(e.onboarded === !1)).catch(() => {});
		let t = e().connection.subscribeMessage((e) => c(e.status), { type: "hive_local/subscribe" });
		return () => {
			t.then((e) => e()).catch(() => {});
		};
	}, [e]);
	let E = (e) => {
		x(e), v("control");
	}, D = (0, u.useCallback)(() => x(null), []), O = (e, t) => {
		g({
			entry: e,
			channel: t
		}), v("control");
	}, k = (e) => {
		d(e), g(null), x(null);
	}, A = m && r.find((e) => e.entry_id === m.entry);
	return /* @__PURE__ */ (0, f.jsxs)("div", {
		className: "panel",
		children: [
			/* @__PURE__ */ (0, f.jsx)("header", { children: /* @__PURE__ */ (0, f.jsxs)("div", {
				className: "toolbar-row",
				children: [
					t && /* @__PURE__ */ (0, f.jsx)("button", {
						className: "menu",
						onClick: n,
						"aria-label": "Menu",
						children: /* @__PURE__ */ (0, f.jsx)(p, { name: "menu" })
					}),
					/* @__PURE__ */ (0, f.jsxs)("div", {
						className: "brand",
						children: [/* @__PURE__ */ (0, f.jsx)(h, {}), /* @__PURE__ */ (0, f.jsx)("h1", { children: "Hive Local" })]
					}),
					/* @__PURE__ */ (0, f.jsx)("nav", {
						className: "tabs",
						role: "tablist",
						children: St.map((e) => /* @__PURE__ */ (0, f.jsxs)("button", {
							role: "tab",
							"aria-selected": e.id === l,
							className: e.id === l ? "on" : "",
							onClick: () => k(e.id),
							children: [/* @__PURE__ */ (0, f.jsx)(p, { name: e.icon }), /* @__PURE__ */ (0, f.jsx)("span", { children: e.label })]
						}, e.id))
					})
				]
			}) }),
			/* @__PURE__ */ (0, f.jsxs)("main", { children: [
				S && /* @__PURE__ */ (0, f.jsx)("div", {
					className: "status error",
					children: S
				}),
				!r.length && !S && /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "empty-state",
					children: [/* @__PURE__ */ (0, f.jsx)(h, { size: 56 }), /* @__PURE__ */ (0, f.jsx)("p", { children: "No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local." })]
				}),
				A && a ? /* @__PURE__ */ (0, f.jsx)(ke, {
					getHass: e,
					device: A,
					channel: m.channel,
					info: s[A.entry_id]?.[m.channel],
					limits: a,
					showDevice: r.length > 1,
					tab: _,
					onTab: v,
					onBack: () => g(null)
				}, `${m.entry}-${m.channel}`) : y ? /* @__PURE__ */ (0, f.jsx)(xt, {
					getHass: e,
					roomId: y,
					devices: r,
					status: s,
					limits: a,
					tab: _,
					onTab: v,
					onBack: D
				}, y) : /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
					l === "overview" && /* @__PURE__ */ (0, f.jsx)(j, {
						getHass: e,
						devices: r,
						status: s,
						limits: a,
						onOpenDevice: O,
						onOpenRoom: E
					}),
					l === "devices" && r.length > 0 && /* @__PURE__ */ (0, f.jsx)(Me, {
						getHass: e,
						devices: r,
						status: s,
						limits: a,
						onOpenDevice: O
					}),
					l === "stats" && r.length > 0 && /* @__PURE__ */ (0, f.jsx)(Se, {
						getHass: e,
						devices: r
					}),
					l === "settings" && r.length > 0 && /* @__PURE__ */ (0, f.jsx)($e, {
						getHass: e,
						devices: r,
						status: s,
						onSetup: () => T(!0)
					})
				] })
			] }),
			w && r.length > 0 && /* @__PURE__ */ (0, f.jsx)(mt, {
				getHass: e,
				devices: r,
				status: s,
				onDone: () => {
					T(!1), d("overview"), e().callWS({
						type: "hive_local/settings/set",
						onboarded: !0
					}).catch(() => {});
				}
			})
		]
	});
}
// src/styles.ts
var wt = "\n:host {\n  /* One accent for everything that's on or active (heating, hot water, boosting, the selected tab):\n     HA's heating orange. Heating and hot water share it. */\n  --hl-brand: var(--state-climate-heat-color, #ff8100);\n  --hl-heat: var(--hl-brand);\n  /* Main buttons and selected chips use the accent too, not HA's blue. */\n  --hl-accent: var(--hl-brand);\n  --hl-water: var(--hl-brand);\n  --hl-idle: var(--secondary-text-color, #727272);\n  --hl-off: var(--disabled-text-color, #9e9e9e);\n  --hl-off-fill: color-mix(in srgb, var(--secondary-text-color, #888) 18%, transparent);\n  --hl-radius: 18px;\n  --hl-soft: color-mix(in srgb, var(--primary-text-color, #000) 6%, transparent);\n  display: block; height: 100%;\n  background: var(--primary-background-color);\n  color: var(--primary-text-color);\n  font-family: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, Roboto, sans-serif));\n  -webkit-font-smoothing: antialiased;\n}\n* { box-sizing: border-box; }\n.panel { min-height: 100%; background: var(--primary-background-color); }\n.icon-wrap { display: inline-flex; align-items: center; justify-content: center; line-height: 0; --mdc-icon-size: 20px; }\n.spacer { flex: 1; }\n.muted { color: var(--secondary-text-color); font-size: 14px; }\n.small { font-size: 12px; }\n\n/* Header: logo and title, with the tabs inline beside them (they wrap to a row of their own when there's no room) */\nheader { position: sticky; top: 0; z-index: 2; background: var(--app-header-background-color, var(--primary-color)); color: var(--app-header-text-color, #fff); border-bottom: var(--app-header-border-bottom, none); }\n/* In the companion app HA already places the panel below the status bar / Dynamic Island,\n   leaving that strip in its own colour. Paint the header's colour up into it, as HA's own\n   top bars reach it. Nothing shows where there's no safe area (desktop, browsers). */\nheader::before { content: \"\"; position: absolute; left: 0; right: 0; bottom: 100%; height: env(safe-area-inset-top, 0px); background: inherit; pointer-events: none; }\n.toolbar-row { display: flex; align-items: center; flex-wrap: wrap; column-gap: 20px; min-height: 56px; padding: 0 16px; }\n.brand { display: flex; align-items: center; gap: 10px; height: 56px; flex: none; }\n.toolbar-row h1 { font-size: 20px; font-weight: 400; margin: 0; white-space: nowrap; }\n.logo-mark { display: block; flex: none; }\n.empty-state .logo-mark { opacity: .9; }\n.toolbar-row .menu { background: transparent; border: 0; color: inherit; padding: 8px; margin-left: -8px; margin-right: -10px; border-radius: 50%; }\n.toolbar-row .menu:hover { background: rgba(255,255,255,.12); }\n/* Pills. flex-shrink 0: when they don't fit beside the logo, the tabs wrap onto their own row instead of squashing. */\n.tabs { display: flex; align-items: center; gap: 4px; flex: 1 0 auto; padding: 10px 0; margin: 0 -8px 0 -4px; overflow-x: auto; scrollbar-width: none; }\n.tabs::-webkit-scrollbar { display: none; }\n.tabs button { flex: none; display: inline-flex; align-items: center; gap: 8px; height: 36px; border: 0; border-radius: 999px; background: transparent; color: inherit; opacity: .75; padding: 0 14px; font-weight: 500; letter-spacing: .01em; }\n.tabs button:hover:not(:disabled) { opacity: .95; background: color-mix(in srgb, currentColor 7%, transparent); }\n.tabs button:active:not(:disabled) { transform: none; }\n.tabs button.on, .tabs button.on:hover:not(:disabled) { opacity: 1; background: color-mix(in srgb, currentColor 13%, transparent); }\n.tabs .icon-wrap { --mdc-icon-size: 18px; }\n\nmain { max-width: 1040px; margin: 0 auto; padding: 20px 16px 32px; display: flex; flex-direction: column; gap: 16px; }\n.stack { display: flex; flex-direction: column; gap: 16px; }\n\n/* Cards */\n.card { background: var(--card-background-color); border-radius: var(--hl-radius); border: 1px solid var(--divider-color); padding: 18px; display: flex; flex-direction: column; gap: 14px; }\n.card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }\n.title { display: flex; align-items: center; gap: 12px; }\n.title-icon { width: 40px; height: 40px; flex: none; border-radius: 10px; --mdc-icon-size: 22px; color: var(--secondary-text-color); background: var(--hl-soft); }\n.card.heat { --hl-accent: var(--hl-heat); }\n.card.water { --hl-accent: var(--hl-water); }\nh2 { font-size: 18px; font-weight: 500; margin: 0; }\nh3 { font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: .06em; color: var(--secondary-text-color); margin: 6px 0 -4px; }\n\n/* Controls */\nbutton { font: inherit; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 14px; border-radius: 10px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); cursor: pointer; transition: background .15s, border-color .15s, opacity .15s, transform .1s; }\nbutton:hover:not(:disabled) { background: var(--hl-soft); }\nbutton:active:not(:disabled) { transform: scale(.98); }\nbutton:disabled { opacity: .45; cursor: default; }\nbutton:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }\nbutton.primary { background: var(--hl-accent, var(--primary-color)); color: var(--text-primary-color, #fff); border-color: transparent; }\nbutton.primary:hover:not(:disabled) { background: var(--hl-accent, var(--primary-color)); filter: brightness(1.08); }\nbutton.ghost { border-color: transparent; background: transparent; color: var(--secondary-text-color); padding-right: 6px; }\nbutton.round { width: 36px; height: 36px; padding: 0; border-radius: 50%; }\nbutton.danger { color: var(--error-color); border-color: transparent; background: transparent; }\nselect, input[type=time], input[type=text] { font: inherit; font-size: 14px; padding: 8px 10px; border-radius: 10px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); color-scheme: light dark; }\n.toolbar, .actions, .inline-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }\n.inline-row { gap: 12px; }\n\n.segmented { display: inline-flex; padding: 3px; gap: 3px; border-radius: 12px; background: var(--hl-soft); }\n.segmented.full { display: flex; }\n.segmented.full button { flex: 1; }\n.segmented button { border: 0; border-radius: 9px; background: transparent; padding: 7px 12px; color: var(--secondary-text-color); }\n.segmented button.on { background: var(--card-background-color); color: var(--primary-text-color); font-weight: 500; }\n.segmented .raw { padding: 7px 10px; }\n\n.chip { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; padding: 4px 10px; border-radius: 999px; background: var(--hl-soft); color: var(--secondary-text-color); white-space: nowrap; }\n.chip .icon-wrap { --mdc-icon-size: 14px; }\n.chip.mode-boost { background: color-mix(in srgb, var(--hl-heat) 16%, transparent); color: var(--hl-heat); }\n.water .chip.mode-boost { background: color-mix(in srgb, var(--hl-water) 16%, transparent); color: var(--hl-water); }\n.chip.unsaved { background: color-mix(in srgb, var(--warning-color, #ffa600) 18%, transparent); color: var(--warning-color, #ffa600); }\n.channel-switch { align-self: flex-start; }\n.channel-switch .icon-wrap { --mdc-icon-size: 18px; }\n.chips { display: flex; flex-wrap: wrap; gap: 8px; }\n.chip-btn { border-radius: 999px; padding: 6px 14px; }\n.chip-btn.on { background: color-mix(in srgb, var(--hl-accent, var(--primary-color)) 16%, transparent); border-color: var(--hl-accent, var(--primary-color)); color: var(--hl-accent, var(--primary-color)); font-weight: 500; }\n\n.status { padding: 10px 14px; border-radius: 10px; font-size: 14px; background: var(--hl-soft); }\n.status.ok { background: color-mix(in srgb, var(--success-color, #43a047) 14%, transparent); }\n.status.error { background: color-mix(in srgb, var(--error-color, #db4437) 14%, transparent); color: var(--error-color); }\n.status.busy { opacity: .8; }\n\n.empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 48px 16px; color: var(--secondary-text-color); }\n.empty-state .icon-wrap { --mdc-icon-size: 48px; opacity: .5; }\n\n/* Overview: quick actions, filter pills and device cards */\n.home { display: flex; flex-direction: column; gap: 12px; }\n.home-section { font-size: 19px; font-weight: 700; letter-spacing: -.01em; text-transform: none; letter-spacing: 0; color: var(--primary-text-color); margin: 6px 0 0; }\n.quick { display: flex; gap: 10px; overflow-x: auto; scrollbar-width: none; padding: 2px 2px 6px; margin: 0 -2px; }\n.quick::-webkit-scrollbar { display: none; }\n.quick-action { flex: none; padding: 0; gap: 0; border-radius: 14px; overflow: hidden; align-items: stretch; background: var(--card-background-color); }\n.quick-icon { padding-left: 14px; display: flex; align-items: center; justify-content: center; color: var(--secondary-text-color); }\n.quick-icon .icon-wrap { --mdc-icon-size: 22px; }\n.quick-label { padding: 14px 16px 14px 10px; white-space: nowrap; }\n.pills { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding: 2px; }\n.pills::-webkit-scrollbar { display: none; }\n.pill { flex: none; border-radius: 999px; padding: 8px 16px; background: var(--card-background-color); }\n.pill .icon-wrap { --mdc-icon-size: 18px; }\n.pill.on, .pill.on:hover:not(:disabled) { background: var(--hl-brand); color: #fff; border-color: transparent; font-weight: 500; }\n/* Cards in a row share its height. */\n.device-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 12px; align-items: stretch; }\n.card.device { padding: 0; gap: 0; overflow: hidden; height: 100%; }\n.device-head { flex: 1; display: flex; flex-direction: column; gap: 12px; padding: 18px 18px 20px; cursor: pointer; outline: none; transition: background .15s; }\n.device-head:hover { background: color-mix(in srgb, var(--primary-text-color) 3%, transparent); }\n.device-head:focus-visible { box-shadow: inset 0 0 0 2px var(--primary-color); }\n.device-row { display: flex; align-items: center; gap: 12px; }\n/* Our own icon tile: a rounded square with the logo's warm gradient (not a diamond). */\n/* Icons: grey, in a shaded rounded box. */\n.device-icon { width: 40px; height: 40px; flex: none; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--secondary-text-color); background: var(--hl-soft); }\n.device-icon .icon-wrap { --mdc-icon-size: 22px; }\n.device-name { display: flex; flex-direction: column; min-width: 0; flex: 1; font-size: 17px; font-weight: 500; }\n.device-name .small { font-weight: 400; }\n.device-status { font-size: 14px; color: var(--secondary-text-color); white-space: nowrap; display: inline-flex; align-items: center; gap: 4px; }\n.device-status b { color: var(--primary-text-color); font-weight: 600; }\n.status-icon { --mdc-icon-size: 18px; color: var(--hl-heat); }\n.water .status-icon { color: var(--hl-water); }\n.device-big { flex: 1; font-size: 54px; font-weight: 400; line-height: 1; letter-spacing: -.02em; font-variant-numeric: tabular-nums; display: grid; grid-template-columns: auto 1fr; }\n.device-big span { font-size: 30px; line-height: 1.1; }\n.device-big small { grid-column: 1 / -1; font-size: 13px; letter-spacing: 0; color: var(--secondary-text-color); margin-top: 4px; font-weight: 400; }\n.device-action { min-width: 120px; height: 50px; border-radius: 14px; border: 0; font-size: 17px; font-weight: 500; color: var(--hl-brand); background: color-mix(in srgb, var(--hl-brand) 12%, transparent); }\n.device-action:hover:not(:disabled) { background: color-mix(in srgb, var(--hl-brand) 20%, transparent); }\n.device-action.boosting, .device-action.boosting:hover:not(:disabled) { color: #fff; background: var(--hl-accent); }\n.status-icon.done { color: var(--success-color, #43a047); }\n.status-icon.away { color: var(--secondary-text-color); }\n.stop-square { width: 16px; height: 16px; border-radius: 3px; background: currentColor; }\n.device.heat { --hl-accent: var(--hl-heat); }\n.device.water { --hl-accent: var(--hl-water); }\n.device-name .warn { color: var(--warning-color, #ffa600); font-weight: 500; }\n\n\n.device-body { display: flex; flex-direction: column; gap: 14px; padding: 4px 16px 16px; border-top: 1px solid var(--divider-color); }\n.schedule-link { align-self: center; }\n\n/* Boost sheet: slides up from the bottom on phones, a centred dialog on wider screens */\n.sheet-backdrop { position: fixed; inset: 0; z-index: 10; display: flex; align-items: center; justify-content: center; padding: 16px; background: rgba(0,0,0,.45); animation: hl-fade .15s ease-out; }\n.sheet { width: 100%; max-width: 440px; display: flex; flex-direction: column; gap: 18px; padding: 14px 20px 18px; border-radius: 24px; background: var(--card-background-color); color: var(--primary-text-color); }\n.sheet.heat { --hl-accent: var(--hl-heat); }\n.sheet.water { --hl-accent: var(--hl-water); }\n.sheet-handle { align-self: center; width: 40px; height: 4px; border-radius: 2px; background: var(--divider-color); }\n.sheet-title { display: flex; flex-direction: column; align-items: center; gap: 2px; text-align: center; }\n.sheet-title h2 { font-size: 24px; }\n.sheet-field { display: flex; flex-direction: column; gap: 10px; }\n.sheet-label { font-size: 14px; color: var(--secondary-text-color); }\n.sheet-temp { display: flex; align-items: center; gap: 12px; }\n.sheet-step { width: 52px; height: 52px; flex: none; border-color: var(--divider-color); }\n.sheet-step .icon-wrap { --mdc-icon-size: 24px; }\n.sheet-temp-value { flex: 1; text-align: center; padding: 14px 0; border-radius: 18px; color: #fff; font-size: 44px; font-weight: 300; font-variant-numeric: tabular-nums; background: linear-gradient(135deg, #FF9F43, #F0532B); }\n.sheet-lengths { display: grid; grid-template-columns: repeat(auto-fit, minmax(64px, 1fr)); gap: 8px; }\n.sheet-lengths button { height: 46px; padding: 0 6px; border-radius: 12px; }\n.sheet-lengths button.on, .sheet-lengths button.on:hover:not(:disabled) { background: var(--hl-accent); border-color: transparent; color: #fff; font-weight: 500; }\n.sheet-live { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 18px; padding: 8px 0; }\n.sheet-live .icon-wrap { --mdc-icon-size: 22px; color: var(--secondary-text-color); }\n.sheet-go { height: 52px; border: 0; border-radius: 14px; font-size: 16px; font-weight: 600; color: #fff; background: var(--hl-accent); }\n.sheet-go:hover:not(:disabled) { background: var(--hl-accent); filter: brightness(1.06); }\n.sheet-go.stop { color: var(--error-color, #db4437); background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent); }\n.sheet-cancel { align-self: center; padding: 8px 16px; font-size: 15px; }\n@keyframes hl-fade { from { opacity: 0; } }\n@keyframes hl-rise { from { transform: translateY(40px); opacity: 0; } }\n\n/* Device controls (opened from a card) */\n.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }\n.channel { gap: 16px; }\n.holiday-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; background: var(--hl-soft); }\n.holiday-row > .icon-wrap { --mdc-icon-size: 20px; color: var(--secondary-text-color); }\n.holiday-text { flex: 1; }\n.holiday-row > button { padding: 6px 12px; }\n.target-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding-top: 8px; }\n.target-text { display: flex; flex-direction: column; gap: 2px; }\n.target-label { font-size: 16px; font-weight: 500; }\n.target-control { display: inline-flex; align-items: center; gap: 6px; padding: 4px; border-radius: 999px; background: var(--hl-soft); }\n.target-btn { width: 44px; height: 44px; background: var(--card-background-color); }\n.target-btn .icon-wrap { --mdc-icon-size: 22px; }\n.target-value { min-width: 76px; text-align: center; font-size: 24px; font-weight: 500; font-variant-numeric: tabular-nums; }\n.target-value.pending { color: var(--hl-heat); }\n.card-actions { display: flex; align-items: center; gap: 8px; }\n\n.stepper { background: var(--card-background-color); }\n.stepper { display: inline-flex; align-items: center; gap: 4px; padding: 2px; border-radius: 999px; background: var(--hl-soft); }\n.stepper button.round { border-color: transparent; background: transparent; width: 32px; height: 32px; }\n.stepper button.round:hover { background: var(--card-background-color); }\n.stepper-value { min-width: 56px; text-align: center; font-variant-numeric: tabular-nums; font-weight: 500; }\n\n/* Schedule: a status line, a strip of day circles, and the day's time slots */\n.sched { display: flex; flex-direction: column; gap: 14px; position: relative; padding-bottom: 72px; }\n\n.sched-status { margin: 0; font-size: 14px; }\n.sched-days { display: flex; justify-content: space-between; gap: 4px; padding: 12px 10px; border-radius: 16px; background: color-mix(in srgb, var(--hl-brand) 7%, var(--card-background-color)); border: 1px solid var(--divider-color); }\n.sched-day { position: relative; width: 44px; height: 44px; padding: 0; border-radius: 50%; border: 2px solid transparent; background: transparent; font-size: 18px; font-weight: 500; color: var(--primary-text-color); }\n.sched-day:hover:not(:disabled) { background: color-mix(in srgb, var(--hl-brand) 10%, transparent); }\n.sched-day.today { border-color: var(--hl-brand); color: var(--hl-brand); }\n.sched-day.on, .sched-day.on:hover:not(:disabled) { background: var(--hl-brand); border-color: var(--hl-brand); color: #fff; }\n.sched-dot { position: absolute; top: 2px; right: 2px; width: 8px; height: 8px; border-radius: 50%; background: var(--warning-color, #ffa600); border: 2px solid var(--card-background-color); }\n.sched-list { display: flex; flex-direction: column; gap: 4px; }\n.sched-empty { margin: 8px 4px; }\n.slot { justify-content: flex-start; gap: 18px; padding: 10px 8px; border: 0; border-radius: 16px; background: transparent; text-align: left; }\n.slot:hover:not(:disabled) { background: var(--hl-soft); }\n.slot-badge { width: 58px; height: 58px; flex: none; border-radius: 50%; border: 3px solid var(--hl-brand); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 500; color: var(--primary-text-color); font-variant-numeric: tabular-nums; }\n.slot-badge.off { border-color: var(--divider-color); color: var(--secondary-text-color); }\n.slot-badge.off .icon-wrap, .slot-badge.add .icon-wrap { --mdc-icon-size: 24px; }\n.slot-badge.add { border: 2px dashed var(--divider-color); color: var(--secondary-text-color); }\n.slot-time { flex: 1; font-size: 20px; font-variant-numeric: tabular-nums; }\n.slot-add .slot-time { font-size: 16px; color: var(--secondary-text-color); }\n.slot-chev { color: var(--secondary-text-color); }\n/* Unwritten changes: a dark bar across the bottom, above the tab bar on phones. */\n.sched-save { position: sticky; bottom: 16px; z-index: 2; display: flex; align-items: center; gap: 10px; padding: 8px 8px 8px 16px; border-radius: 16px; background: var(--primary-text-color); color: var(--card-background-color); }\n.sched-save-icon { --mdc-icon-size: 20px; opacity: .8; }\n.sched-undo { border: 0; background: transparent; color: inherit; opacity: .8; padding: 10px 12px; }\n.sched-undo:hover:not(:disabled) { background: color-mix(in srgb, var(--card-background-color) 12%, transparent); opacity: 1; }\n.sched-write { border: 0; border-radius: 12px; padding: 10px 20px; background: var(--hl-brand); color: #fff; font-weight: 600; }\n.sched-write:hover:not(:disabled) { background: var(--hl-brand); filter: brightness(1.06); }\n.fab-wrap.raised { bottom: 96px; }\n.sched-changed { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 15px; }\n.fab-wrap { position: fixed; right: 24px; bottom: 24px; z-index: 4; }\n.fab { width: 56px; height: 56px; padding: 0; border-radius: 50%; border: 0; background: var(--hl-brand); color: #fff; }\n.fab:hover:not(:disabled) { background: var(--hl-brand); filter: brightness(1.06); }\n.fab .icon-wrap { --mdc-icon-size: 26px; }\n.fab-backdrop { position: fixed; inset: 0; }\n.fab-menu { position: absolute; right: 0; bottom: 66px; min-width: 260px; display: flex; flex-direction: column; padding: 6px; border-radius: 16px; background: var(--card-background-color); border: 1px solid var(--divider-color); }\n.fab-menu button { justify-content: flex-start; gap: 10px; border: 0; border-radius: 10px; padding: 12px; background: transparent; }\n.fab-menu button:hover:not(:disabled) { background: var(--hl-soft); }\n.sheet-time { font: inherit; font-size: 28px; padding: 10px 14px; border-radius: 14px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); color-scheme: light dark; text-align: center; }\n.sheet-note { margin: -6px 0 0; text-align: center; }\n.room-sheet { max-height: calc(100vh - 32px); overflow-y: auto; }\n.room-sheet .sheet-live .heating { color: var(--hl-heat); }\n.room-sheet-actions { display: flex; justify-content: space-between; align-items: center; }\n.room-sheet-actions .sheet-cancel { align-self: auto; }\n.room-sensor-note { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: -8px; text-align: center; --mdc-icon-size: 16px; }\n.room-sensor-note.warn { color: var(--warning-color, #ffa600); }\n.sensor-toggle { display: flex; flex-direction: column; gap: 6px; max-width: 420px; }\n.sensor-toggle-main { justify-content: flex-start; gap: 12px; padding: 11px 14px; border: 1px solid var(--divider-color); border-radius: 12px; background: transparent; text-align: left; }\n.sensor-toggle-main:hover:not(:disabled) { background: transparent; }\n.sensor-toggle .warn { color: var(--warning-color, #ffa600); }\n.room-sheet-row { display: flex; align-items: center; gap: 10px; width: 100%; padding: 12px 14px; border-radius: 14px; border: 1px solid var(--divider-color); background: transparent; text-align: left; justify-content: flex-start; }\n.room-sheet-row > span:nth-child(2) { flex: 1; }\n.room-sheet-row .icon-wrap { color: var(--secondary-text-color); }\n.room-schedule { max-width: 520px; gap: 14px; }\n.room-schedule-head { display: flex; align-items: center; gap: 10px; }\n.room-schedule-head .page-title { flex: 1; min-width: 0; }\n.room-schedule-head h2 { font-size: 20px; }\n.room-schedule-note { margin: 0; }\n.room-schedule-mode { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; border: 1px solid var(--divider-color); }\n.room-schedule-mode-text { flex: 1; }\n.room-schedule-mode .icon-wrap { color: var(--secondary-text-color); }\n.room-schedule-notes { margin: 0; padding: 10px 14px 10px 28px; border-radius: 10px; background: color-mix(in srgb, var(--warning-color, #ffa600) 12%, transparent); display: flex; flex-direction: column; gap: 4px; }\n/* In a dialog the save bar and the ... button stick to its bottom instead of the page's. */\n.sched.embedded { padding-bottom: 0; }\n.sched.embedded .sched-save { bottom: 0; }\n.sched.embedded .fab-wrap { position: sticky; right: auto; bottom: 0; align-self: flex-end; }\n.sched.embedded .fab-wrap.raised { bottom: 64px; }\n.valve-count { margin-left: 8px; padding: 2px 8px; border-radius: 999px; font-size: 12px; background: color-mix(in srgb, var(--hl-brand) 14%, transparent); color: var(--hl-brand); }\n.valve-picker { display: flex; flex-direction: column; gap: 8px; }\n.valve-search { display: flex; align-items: center; gap: 8px; padding: 0 6px 0 12px; border-radius: 12px; background: var(--hl-soft); color: var(--secondary-text-color); --mdc-icon-size: 20px; }\n.valve-search input { flex: 1; min-width: 0; font: inherit; font-size: 15px; padding: 10px 0; border: 0; background: transparent; color: var(--primary-text-color); outline: none; }\n.valve-search input::-webkit-search-cancel-button { display: none; }\n.valve-search .round { width: 30px; height: 30px; }\n.valve-search:focus-within { outline: 2px solid var(--primary-color); outline-offset: 0; }\n.valve-list { display: flex; flex-direction: column; border: 1px solid var(--divider-color); border-radius: 14px; overflow-y: auto; max-height: 300px; overscroll-behavior: contain; }\n.valve-pick { flex: none; display: flex; align-items: center; gap: 8px; padding-right: 10px; }\n.valve-pick + .valve-pick { border-top: 1px solid var(--divider-color); }\n.valve-pick.on { background: color-mix(in srgb, var(--hl-brand) 7%, transparent); }\n.valve-pick-main { flex: 1; min-width: 0; justify-content: flex-start; gap: 12px; padding: 11px 6px 11px 14px; border: 0; border-radius: 0; background: transparent; text-align: left; }\n.valve-pick-main:hover:not(:disabled) { background: transparent; }\n.valve-check { width: 22px; height: 22px; flex: none; border-radius: 50%; border: 1.5px solid var(--divider-color); display: flex; align-items: center; justify-content: center; --mdc-icon-size: 16px; color: #fff; }\n.valve-check.on { background: var(--hl-brand); border-color: var(--hl-brand); }\n.valve-pick-text { flex: 1; min-width: 0; display: flex; flex-direction: column; font-size: 14.5px; }\n.valve-pick-read { color: var(--secondary-text-color); white-space: nowrap; font-variant-numeric: tabular-nums; }\n.valve-pick .warn { color: var(--warning-color, #ffa600); }\n.valve-find { flex: none; padding: 5px 10px; border-radius: 999px; font-size: 12.5px; color: var(--secondary-text-color); --mdc-icon-size: 16px; }\n.valve-find.on, .valve-find.on:disabled { opacity: 1; border-color: var(--hl-brand); color: var(--hl-brand); background: color-mix(in srgb, var(--hl-brand) 10%, transparent); }\n.setup-intro { text-align: center; margin: -6px 8px 0; line-height: 1.45; }\n.setup-list { display: flex; flex-direction: column; gap: 8px; }\n.setup-room { display: flex; flex-direction: column; gap: 8px; border: 1px solid var(--divider-color); border-radius: 14px; padding-bottom: 0; }\n.setup-room.on { border-color: var(--hl-brand); background: color-mix(in srgb, var(--hl-brand) 6%, transparent); }\n.setup-room.on select { margin: 0 14px 12px 48px; }\n.setup-room-main { justify-content: flex-start; align-items: flex-start; gap: 12px; padding: 12px 14px; border: 0; background: transparent; text-align: left; }\n.setup-room-main:hover:not(:disabled) { background: transparent; }\n.setup-room-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; font-size: 15px; font-weight: 500; }\n.setup-room-text .muted { font-weight: 400; }\n.room-sheet.room-editor h2 { text-align: center; font-size: 22px; }\n.danger-text { color: var(--error-color, #db4437); }\n\n/* Rooms */\n.dot-heating { width: 10px; height: 10px; border-radius: 50%; background: var(--hl-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hl-accent) 20%, transparent); flex: none; }\n.zone { display: flex; flex-direction: column; gap: 10px; }\n.zone h3 { margin: 4px 0 0; }\n/* Room for the + button under the last room / device. */\n.devices-page { padding-bottom: 72px; }\n.add-options { display: flex; flex-direction: column; gap: 8px; }\n.add-option { justify-content: flex-start; gap: 14px; padding: 14px; border-radius: 16px; text-align: left; }\n.add-text { flex: 1; display: flex; flex-direction: column; gap: 2px; }\n.add-text b { font-size: 16px; font-weight: 500; }\n.room.heating { --hl-accent: var(--hl-heat); }\n.chip.heating { background: color-mix(in srgb, var(--hl-heat) 16%, transparent); color: var(--hl-heat); }\n.room-now { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; }\n.room-temp { font-size: 44px; font-weight: 300; line-height: 1; font-variant-numeric: tabular-nums; }\n.room-temp .unit { font-size: 18px; margin-left: 2px; color: var(--secondary-text-color); vertical-align: top; }\n.room-target { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }\n.valves { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }\n.valve { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-top: 1px solid var(--divider-color); font-size: 14px; }\n.valve.off { opacity: .6; }\n.valve-icon { color: var(--secondary-text-color); --mdc-icon-size: 18px; }\n.valve-icon.heating { color: var(--hl-heat); }\n.valve-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.valve-temps { font-variant-numeric: tabular-nums; white-space: nowrap; }\n.battery { display: inline-flex; align-items: center; gap: 3px; font-size: 12px; color: var(--secondary-text-color); font-variant-numeric: tabular-nums; }\n.battery .icon-wrap { --mdc-icon-size: 16px; }\n.battery.low { color: var(--warning-color, #ffa600); font-weight: 500; }\n.room-editor h2 { margin: 0; }\n.field { display: flex; flex-direction: column; gap: 6px; border: 0; padding: 0; margin: 0; min-width: 0; }\n.field > span, .field legend { font-size: 13px; font-weight: 500; color: var(--secondary-text-color); padding: 0; margin-bottom: 6px; }\n.field input[type=text], .field select { width: 100%; max-width: 420px; }\n.checklist { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 16px; padding: 6px 0; }\n.checklist > .muted { width: 100%; }\n.pick { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; cursor: pointer; }\n\n/* A device's own page (heating or hot water), opened from its Overview card */\n.device-page { display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 640px; margin: 0 auto; }\n.device-page .history { max-width: none; }\n.page-head { display: flex; align-items: center; gap: 6px; margin-left: -8px; }\n.page-head .round { width: 44px; height: 44px; }\n.page-head .round .icon-wrap { --mdc-icon-size: 26px; }\n.page-title { display: flex; flex-direction: column; }\n.page-title h2 { font-size: 24px; font-weight: 700; }\n.page-tabs { margin-top: -6px; }\n.card.device.page .device-head, .device-head.static { cursor: default; }\n.device-head.static:hover { background: transparent; }\n.room-device.off { opacity: .6; }\n/* Devices tab: about the hardware, not controlling it */\n.card.hw { gap: 12px; padding: 18px; }\n.card.hw.off .device-name, .card.hw.off .facts { opacity: .6; }\n.hw-head { display: flex; align-items: center; gap: 12px; }\n.online { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--secondary-text-color); white-space: nowrap; }\n.online i { width: 8px; height: 8px; border-radius: 50%; background: var(--success-color, #43a047); }\n.online.no { color: var(--warning-color, #ffa600); }\n.online.no i { background: var(--warning-color, #ffa600); }\n.facts { display: flex; flex-wrap: wrap; gap: 6px; }\n.fact { display: inline-flex; align-items: center; gap: 5px; padding: 5px 10px; border-radius: 999px; background: var(--hl-soft); font-size: 13px; color: var(--secondary-text-color); }\n.fact .icon-wrap { --mdc-icon-size: 15px; }\n.fact.warn { color: var(--warning-color, #ffa600); background: color-mix(in srgb, var(--warning-color, #ffa600) 14%, transparent); font-weight: 500; }\n.hw-links { display: flex; gap: 8px; border-top: 1px solid var(--divider-color); margin: 0 -18px -18px; padding: 6px 8px; }\n.hw-link { flex: 1; justify-content: space-between; border: 0; background: transparent; padding: 10px; font-weight: 500; }\n.hw-link .icon-wrap { color: var(--secondary-text-color); }\n/* The page title already names it. */\n.card.device.page .device-icon, .card.device.page .device-name { display: none; }\n.history-title { font-size: 24px; font-weight: 700; margin: 4px 0 -4px; }\n.card.device.page .device-head:hover { background: transparent; }\n\n/* Stats: heating history, after the Hive app's */\n.history { display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 640px; margin: 0 auto; }\n/* Underlined tabs: receivers on Stats, Control · Schedule · History on a device page. */\n.history-tabs, .page-tabs { display: flex; border-bottom: 1px solid var(--divider-color); overflow-x: auto; scrollbar-width: none; }\n.history-tabs button, .page-tabs button { flex: 1 0 auto; border: 0; border-radius: 0; background: transparent; padding: 12px 16px; color: var(--secondary-text-color); border-bottom: 2px solid transparent; margin-bottom: -1px; }\n.history-tabs button.on, .page-tabs button.on { color: var(--hl-brand); border-bottom-color: var(--hl-brand); font-weight: 500; }\n.history-controls { display: flex; justify-content: space-between; gap: 12px; }\n.history-toggle { display: inline-flex; gap: 2px; padding: 4px; border-radius: 999px; background: var(--hl-soft); }\n.history-toggle button { min-width: 44px; height: 40px; padding: 0 14px; border: 0; border-radius: 999px; background: transparent; font-weight: 600; color: var(--primary-text-color); }\n.history-toggle button.wide { min-width: 60px; }\n.history-toggle button.on, .history-toggle button.on:hover:not(:disabled) { background: var(--hl-brand); color: #fff; }\n.history-toggle .icon-wrap { --mdc-icon-size: 22px; }\n.history-date { display: flex; align-items: center; justify-content: space-between; }\n.history-date .round { width: 40px; height: 40px; }\n.history-range { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 999px; background: color-mix(in srgb, var(--hl-brand) 10%, transparent); color: var(--hl-brand); font-weight: 500; }\n.history-range .icon-wrap { --mdc-icon-size: 18px; }\n.history-summary { display: flex; align-items: center; padding: 22px 12px; border-radius: 18px; background: color-mix(in srgb, var(--hl-brand) 7%, var(--card-background-color)); border: 1px solid var(--divider-color); }\n.history-summary > div { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; }\n.history-summary b { font-size: 30px; font-weight: 500; letter-spacing: -.01em; font-variant-numeric: tabular-nums; }\n.history-summary i { width: 1px; align-self: stretch; background: var(--divider-color); }\n.history-note { margin: -6px 0 0; text-align: center; }\n.history-empty { text-align: center; margin: 24px 0; }\n.history-rows { display: flex; flex-direction: column; gap: 6px; }\n.history-key { align-self: flex-end; display: inline-flex; align-items: center; gap: 4px; }\n.history-key .icon-wrap { --mdc-icon-size: 16px; }\n.history-row { display: grid; grid-template-columns: 64px 1fr auto; align-items: center; gap: 12px; min-height: 40px; }\n.history-day { font-size: 15px; color: var(--secondary-text-color); white-space: nowrap; }\n.history-day span { display: inline-block; min-width: 20px; margin-left: 4px; }\n.history-bar { display: flex; align-items: center; gap: 8px; min-width: 0; }\n.history-bar i { display: block; height: 14px; max-width: calc(100% - 64px); border-radius: 999px; background: var(--hl-brand); flex: none; }\n.history-value { font-size: 15px; font-variant-numeric: tabular-nums; white-space: nowrap; }\n.history-temps { display: inline-flex; gap: 10px; padding: 4px 10px; border-radius: 10px; background: var(--hl-soft); font-size: 13px; color: var(--secondary-text-color); font-variant-numeric: tabular-nums; }\n.history-temps span { color: var(--primary-text-color); }\n.history-row.with-outdoor { grid-template-columns: 64px 1fr auto auto; }\n.history-key.with-outdoor { display: flex; justify-content: flex-end; gap: 16px; align-self: stretch; }\n.history-key span { display: inline-flex; align-items: center; gap: 4px; }\n.history-outdoor { min-width: 52px; text-align: right; font-size: 13px; color: var(--secondary-text-color); font-variant-numeric: tabular-nums; white-space: nowrap; }\n.history-hint { text-align: center; margin: 0; }\n\n/* Settings: grouped rows, like a phone's settings */\n.settings { display: flex; flex-direction: column; gap: 24px; width: 100%; max-width: 640px; margin: 0 auto; }\n.settings-section { display: flex; flex-direction: column; gap: 8px; }\n.settings-section h3 { margin: 0 4px; font-size: 13px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; color: var(--secondary-text-color); }\n.settings-help { margin: -2px 4px 2px; }\n.settings-group { display: flex; flex-direction: column; border: 1px solid var(--divider-color); border-radius: var(--hl-radius); background: var(--card-background-color); overflow: hidden; }\n.settings-row { display: flex; align-items: center; gap: 14px; padding: 14px 16px; min-height: 64px; flex-wrap: wrap; text-align: left; width: 100%; border: 0; border-radius: 0; background: transparent; justify-content: flex-start; transition: background .15s; }\n.settings-group > * + * { border-top: 1px solid var(--divider-color); }\n.settings-row.link:hover:not(:disabled) { background: var(--hl-soft); }\n.settings-row.add .settings-text > span:first-child { color: var(--hl-brand); font-weight: 500; }\n.settings-text { flex: 1 1 180px; display: flex; flex-direction: column; gap: 2px; min-width: 0; font-size: 15px; }\n.settings-row select { max-width: 220px; }\n.onboarding { max-width: 560px; gap: 14px; }\n.onboarding h2 { margin: 0; text-align: center; }\n.onboarding-body { display: flex; flex-direction: column; gap: 12px; }\n.onboarding-body p { margin: 0; line-height: 1.45; }\n.onboarding-dots { display: flex; justify-content: center; gap: 6px; }\n.onboarding-dots i { width: 8px; height: 8px; border-radius: 50%; background: var(--divider-color); }\n.onboarding-dots i.past { background: color-mix(in srgb, var(--hl-brand) 45%, transparent); }\n.onboarding-dots i.on { background: var(--hl-brand); width: 20px; border-radius: 4px; }\n.onboarding-actions { display: flex; gap: 10px; justify-content: flex-end; align-items: center; }\n.onboarding-actions .sheet-go { flex: 1; }\n.room-control { display: flex; flex-direction: column; gap: 14px; }\n.room-control .room-sensor-note { margin-top: 0; justify-content: flex-start; text-align: left; }\n.room-mode-note { margin: -4px 0 0; }\n.room-schedule-page { max-width: none; display: flex; flex-direction: column; gap: 12px; }\n.room-schedule-page .room-schedule-head { justify-content: flex-end; }\n.tidy-action { min-width: 0; height: 40px; padding: 0 18px; font-size: 15px; }\n.stepper .round { touch-action: manipulation; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; }\n.settings-chevron { color: var(--secondary-text-color); }\n.settings-controls { display: flex; gap: 16px; flex-wrap: wrap; margin-left: auto; }\n.adjust { display: flex; flex-direction: column; align-items: center; gap: 4px; }\n.adjust .stepper-value { min-width: 72px; text-align: center; }\n@media (max-width: 600px) { .settings-controls { width: 100%; justify-content: flex-end; } .valve-find-label { display: none; } .valve-find { width: 36px; height: 36px; padding: 0; } }\ncode { font-size: 12px; padding: 1px 5px; border-radius: 5px; background: var(--hl-soft); }\n\n@media (max-width: 600px) {\n  /* Room at the bottom for the tab bar (and the phone's home indicator). */\n  main { padding: 12px 8px calc(88px + env(safe-area-inset-bottom)); gap: 12px; }\n  .card { padding: 14px; }\n  .grid { grid-template-columns: 1fr; }\n  .device-grid { grid-template-columns: 1fr; }\n    .device-big { font-size: 46px; }\n  .sheet-backdrop { align-items: flex-end; padding: 0; }\n  .fab-wrap { right: 16px; bottom: calc(84px + env(safe-area-inset-bottom)); }\n  /* Above the bottom tab bar. */\n  .sched-save { bottom: calc(84px + env(safe-area-inset-bottom)); }\n  .fab-wrap.raised { bottom: calc(156px + env(safe-area-inset-bottom)); }\n  .sched.embedded .sched-save, .sched.embedded .fab-wrap { bottom: 0; right: auto; }\n  .sched.embedded .fab-wrap.raised { bottom: 64px; }\n  .sheet { max-width: none; border-radius: 24px 24px 0 0; padding-bottom: calc(18px + env(safe-area-inset-bottom)); animation: hl-rise .2s ease-out; }\n  /* Phones: the tabs become a bar along the bottom, in thumb reach. */\n  .tabs { position: fixed; left: 0; right: 0; bottom: 0; z-index: 3; margin: 0; gap: 0; justify-content: space-around;\n    padding: 6px 8px calc(6px + env(safe-area-inset-bottom)); overflow: visible;\n    background: var(--card-background-color); color: var(--primary-text-color); border-top: 1px solid var(--divider-color); }\n  .tabs button { flex: 1 1 0; flex-direction: column; gap: 2px; height: 54px; padding: 0; border-radius: 14px; font-size: 11.5px; letter-spacing: 0; opacity: .7; }\n  .tabs button:hover:not(:disabled) { background: transparent; }\n  .tabs button.on, .tabs button.on:hover:not(:disabled) { background: transparent; color: var(--hl-heat); opacity: 1; }\n  .tabs .icon-wrap { --mdc-icon-size: 22px; padding: 3px 16px; border-radius: 999px; transition: background .15s; }\n  .tabs button.on .icon-wrap { background: color-mix(in srgb, var(--hl-heat) 16%, transparent); }\n}\n", Tt = class extends HTMLElement {
	_hass;
	_narrow = !1;
	_root;
	set hass(e) {
		let t = !this._hass;
		this._hass = e, t && this._render();
	}
	set narrow(e) {
		e !== this._narrow && (this._narrow = e, this._render());
	}
	connectedCallback() {
		if (!this._root) {
			let e = this.shadowRoot ?? this.attachShadow({ mode: "open" }), t = document.createElement("style");
			t.textContent = wt;
			let n = document.createElement("div");
			e.append(t, n), this._root = (0, d.createRoot)(n);
		}
		this._render();
	}
	disconnectedCallback() {
		this._root?.unmount(), this._root = void 0, this.shadowRoot?.replaceChildren();
	}
	_render() {
		this._root && this._hass && this._root.render(/* @__PURE__ */ (0, f.jsx)(Ct, {
			getHass: () => this._hass,
			narrow: this._narrow,
			onToggleMenu: () => this.dispatchEvent(new Event("hass-toggle-menu", {
				bubbles: !0,
				composed: !0
			}))
		}));
	}
};
customElements.get("hive-local-panel") || customElements.define("hive-local-panel", Tt);
