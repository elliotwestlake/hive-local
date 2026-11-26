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
	function ee(e, t) {
		return typeof e == "object" && e && e.key != null ? O("" + e.key) : t.toString(36);
	}
	function te(e, r, i, a, o) {
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
		if (c) return c = e, o = o(c), e = a === "" ? "." + ee(c, 0) : a, x(o) ? (i = "", e != null && (i = e.replace(k, "$&/") + "/"), te(o, r, i, "", function(e) {
			return e;
		})) : o != null && (D(o) && (o = E(o, i + (!o.key || c && c.key === o.key ? "" : ("" + o.key).replace(k, "$&/") + "/") + e)), r.push(o)), 1;
		if (c = 0, a = a === "" ? "." : a + ":", x(e)) for (var l = 0; l < e.length; l++) {
			s = e[l];
			var u = a + ee(s, l);
			c += te(s, r, i, u, o);
		}
		else if (u = p(e), typeof u == "function") for (e = u.call(e), l = 0; !(s = e.next()).done;) s = s.value, u = a + ee(s, l++), c += te(s, r, i, u, o);
		else if (s === "object") throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		return c;
	}
	function A(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return te(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function j(e) {
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
	var M = { current: null }, N = { transition: null }, ne = {
		ReactCurrentDispatcher: M,
		ReactCurrentBatchConfig: N,
		ReactCurrentOwner: C
	};
	function re() {
		throw Error("act(...) is not supported in production builds of React.");
	}
	e.Children = {
		map: A,
		forEach: function(e, t, n) {
			A(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return A(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return A(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!D(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	}, e.Component = _, e.Fragment = r, e.Profiler = a, e.PureComponent = y, e.StrictMode = i, e.Suspense = l, e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ne, e.act = re, e.cloneElement = function(e, n, r) {
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
			_init: j
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = N.transition;
		N.transition = {};
		try {
			e();
		} finally {
			N.transition = t;
		}
	}, e.unstable_act = re, e.useCallback = function(e, t) {
		return M.current.useCallback(e, t);
	}, e.useContext = function(e) {
		return M.current.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e) {
		return M.current.useDeferredValue(e);
	}, e.useEffect = function(e, t) {
		return M.current.useEffect(e, t);
	}, e.useId = function() {
		return M.current.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return M.current.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return M.current.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return M.current.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return M.current.useMemo(e, t);
	}, e.useReducer = function(e, t, n) {
		return M.current.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return M.current.useRef(e);
	}, e.useState = function(e) {
		return M.current.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return M.current.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return M.current.useTransition();
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
			if (n(c) !== null) m = !0, A(x);
			else {
				var t = n(l);
				t !== null && j(b, t.startTime - e);
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
				g !== null && j(b, g.startTime - i), u = !1;
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
		var ee = new MessageChannel(), te = ee.port2;
		ee.port1.onmessage = O, k = function() {
			te.postMessage(null);
		};
	} else k = function() {
		g(O, 0);
	};
	function A(e) {
		C = e, S || (S = !0, k());
	}
	function j(t, n) {
		w = g(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_continueExecution = function() {
		m || p || (m = !0, A(x));
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
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (_(w), w = -1) : h = !0, j(b, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, A(x))), r;
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
	var C = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, w = Symbol.for("react.element"), T = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), D = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), k = Symbol.for("react.provider"), ee = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), A = Symbol.for("react.suspense"), j = Symbol.for("react.suspense_list"), M = Symbol.for("react.memo"), N = Symbol.for("react.lazy"), ne = Symbol.for("react.offscreen"), re = Symbol.iterator;
	function ie(e) {
		return typeof e != "object" || !e ? null : (e = re && e[re] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var P = Object.assign, ae;
	function oe(e) {
		if (ae === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ae = t && t[1] || "";
		}
		return "\n" + ae + e;
	}
	var se = !1;
	function ce(e, t) {
		if (!e || se) return "";
		se = !0;
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
			se = !1, Error.prepareStackTrace = n;
		}
		return (e = e ? e.displayName || e.name : "") ? oe(e) : "";
	}
	function le(e) {
		switch (e.tag) {
			case 5: return oe(e.type);
			case 16: return oe("Lazy");
			case 13: return oe("Suspense");
			case 19: return oe("SuspenseList");
			case 0:
			case 2:
			case 15: return e = ce(e.type, !1), e;
			case 11: return e = ce(e.type.render, !1), e;
			case 1: return e = ce(e.type, !0), e;
			default: return "";
		}
	}
	function ue(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case E: return "Fragment";
			case T: return "Portal";
			case O: return "Profiler";
			case D: return "StrictMode";
			case A: return "Suspense";
			case j: return "SuspenseList";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case ee: return (e.displayName || "Context") + ".Consumer";
			case k: return (e._context.displayName || "Context") + ".Provider";
			case te:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case M: return t = e.displayName || null, t === null ? ue(e.type) || "Memo" : t;
			case N:
				t = e._payload, e = e._init;
				try {
					return ue(e(t));
				} catch {}
		}
		return null;
	}
	function de(e) {
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
			case 16: return ue(t);
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
	function fe(e) {
		switch (typeof e) {
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function pe(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function me(e) {
		var t = pe(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
	function he(e) {
		e._valueTracker ||= me(e);
	}
	function ge(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = pe(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function F(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function _e(e, t) {
		var n = t.checked;
		return P({}, t, {
			defaultChecked: void 0,
			defaultValue: void 0,
			value: void 0,
			checked: n ?? e._wrapperState.initialChecked
		});
	}
	function ve(e, t) {
		var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked == null ? t.defaultChecked : t.checked;
		n = fe(t.value == null ? n : t.value), e._wrapperState = {
			initialChecked: r,
			initialValue: n,
			controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
		};
	}
	function ye(e, t) {
		t = t.checked, t != null && S(e, "checked", t, !1);
	}
	function be(e, t) {
		ye(e, t);
		var n = fe(t.value), r = t.type;
		if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
		else if (r === "submit" || r === "reset") {
			e.removeAttribute("value");
			return;
		}
		t.hasOwnProperty("value") ? Se(e, t.type, n) : t.hasOwnProperty("defaultValue") && Se(e, t.type, fe(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
	}
	function xe(e, t, n) {
		if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
			var r = t.type;
			if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
			t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
		}
		n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
	}
	function Se(e, t, n) {
		(t !== "number" || F(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
	}
	var Ce = Array.isArray;
	function we(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + fe(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Te(e, t) {
		if (t.dangerouslySetInnerHTML != null) throw Error(a(91));
		return P({}, t, {
			value: void 0,
			defaultValue: void 0,
			children: "" + e._wrapperState.initialValue
		});
	}
	function Ee(e, t) {
		var n = t.value;
		if (n == null) {
			if (n = t.children, t = t.defaultValue, n != null) {
				if (t != null) throw Error(a(92));
				if (Ce(n)) {
					if (1 < n.length) throw Error(a(93));
					n = n[0];
				}
				t = n;
			}
			t ??= "", n = t;
		}
		e._wrapperState = { initialValue: fe(n) };
	}
	function De(e, t) {
		var n = fe(t.value), r = fe(t.defaultValue);
		n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
	}
	function Oe(e) {
		var t = e.textContent;
		t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
	}
	function ke(e) {
		switch (e) {
			case "svg": return "http://www.w3.org/2000/svg";
			case "math": return "http://www.w3.org/1998/Math/MathML";
			default: return "http://www.w3.org/1999/xhtml";
		}
	}
	function Ae(e, t) {
		return e == null || e === "http://www.w3.org/1999/xhtml" ? ke(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
	}
	var je, Me = function(e) {
		return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
			MSApp.execUnsafeLocalFunction(function() {
				return e(t, n, r, i);
			});
		} : e;
	}(function(e, t) {
		if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
		else {
			for (je ||= document.createElement("div"), je.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = je.firstChild; e.firstChild;) e.removeChild(e.firstChild);
			for (; t.firstChild;) e.appendChild(t.firstChild);
		}
	});
	function Ne(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Pe = {
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
	}, Fe = [
		"Webkit",
		"ms",
		"Moz",
		"O"
	];
	Object.keys(Pe).forEach(function(e) {
		Fe.forEach(function(t) {
			t = t + e.charAt(0).toUpperCase() + e.substring(1), Pe[t] = Pe[e];
		});
	});
	function Ie(e, t, n) {
		return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Pe.hasOwnProperty(e) && Pe[e] ? ("" + t).trim() : t + "px";
	}
	function Le(e, t) {
		for (var n in e = e.style, t) if (t.hasOwnProperty(n)) {
			var r = n.indexOf("--") === 0, i = Ie(n, t[n], r);
			n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
		}
	}
	var Re = P({ menuitem: !0 }, {
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
	function ze(e, t) {
		if (t) {
			if (Re[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(a(137, e));
			if (t.dangerouslySetInnerHTML != null) {
				if (t.children != null) throw Error(a(60));
				if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(a(61));
			}
			if (t.style != null && typeof t.style != "object") throw Error(a(62));
		}
	}
	function Be(e, t) {
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
	var Ve = null;
	function He(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Ue = null, We = null, Ge = null;
	function Ke(e) {
		if (e = Wi(e)) {
			if (typeof Ue != "function") throw Error(a(280));
			var t = e.stateNode;
			t && (t = Ki(t), Ue(e.stateNode, e.type, t));
		}
	}
	function qe(e) {
		We ? Ge ? Ge.push(e) : Ge = [e] : We = e;
	}
	function Je() {
		if (We) {
			var e = We, t = Ge;
			if (Ge = We = null, Ke(e), t) for (e = 0; e < t.length; e++) Ke(t[e]);
		}
	}
	function Ye(e, t) {
		return e(t);
	}
	function Xe() {}
	var Ze = !1;
	function Qe(e, t, n) {
		if (Ze) return e(t, n);
		Ze = !0;
		try {
			return Ye(e, t, n);
		} finally {
			Ze = !1, (We !== null || Ge !== null) && (Xe(), Je());
		}
	}
	function $e(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = Ki(n);
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
	var et = !1;
	if (u) try {
		var tt = {};
		Object.defineProperty(tt, "passive", { get: function() {
			et = !0;
		} }), window.addEventListener("test", tt, tt), window.removeEventListener("test", tt, tt);
	} catch {
		et = !1;
	}
	function nt(e, t, n, r, i, a, o, s, c) {
		var l = Array.prototype.slice.call(arguments, 3);
		try {
			t.apply(n, l);
		} catch (e) {
			this.onError(e);
		}
	}
	var rt = !1, it = null, at = !1, ot = null, st = { onError: function(e) {
		rt = !0, it = e;
	} };
	function ct(e, t, n, r, i, a, o, s, c) {
		rt = !1, it = null, nt.apply(st, arguments);
	}
	function lt(e, t, n, r, i, o, s, c, l) {
		if (ct.apply(this, arguments), rt) {
			if (rt) {
				var u = it;
				rt = !1, it = null;
			} else throw Error(a(198));
			at || (at = !0, ot = u);
		}
	}
	function ut(e) {
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
	function dt(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function ft(e) {
		if (ut(e) !== e) throw Error(a(188));
	}
	function pt(e) {
		var t = e.alternate;
		if (!t) {
			if (t = ut(e), t === null) throw Error(a(188));
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
					if (o === n) return ft(i), e;
					if (o === r) return ft(i), t;
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
	function mt(e) {
		return e = pt(e), e === null ? null : ht(e);
	}
	function ht(e) {
		if (e.tag === 5 || e.tag === 6) return e;
		for (e = e.child; e !== null;) {
			var t = ht(e);
			if (t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var gt = r.unstable_scheduleCallback, _t = r.unstable_cancelCallback, vt = r.unstable_shouldYield, yt = r.unstable_requestPaint, I = r.unstable_now, bt = r.unstable_getCurrentPriorityLevel, xt = r.unstable_ImmediatePriority, St = r.unstable_UserBlockingPriority, Ct = r.unstable_NormalPriority, wt = r.unstable_LowPriority, Tt = r.unstable_IdlePriority, Et = null, Dt = null;
	function Ot(e) {
		if (Dt && typeof Dt.onCommitFiberRoot == "function") try {
			Dt.onCommitFiberRoot(Et, e, void 0, (e.current.flags & 128) == 128);
		} catch {}
	}
	var kt = Math.clz32 ? Math.clz32 : Mt, At = Math.log, jt = Math.LN2;
	function Mt(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (At(e) / jt | 0) | 0;
	}
	var Nt = 64, Pt = 4194304;
	function Ft(e) {
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
	function It(e, t) {
		var n = e.pendingLanes;
		if (n === 0) return 0;
		var r = 0, i = e.suspendedLanes, a = e.pingedLanes, o = n & 268435455;
		if (o !== 0) {
			var s = o & ~i;
			s === 0 ? (a &= o, a !== 0 && (r = Ft(a))) : r = Ft(s);
		} else o = n & ~i, o === 0 ? a !== 0 && (r = Ft(a)) : r = Ft(o);
		if (r === 0) return 0;
		if (t !== 0 && t !== r && (t & i) === 0 && (i = r & -r, a = t & -t, i >= a || i === 16 && a & 4194240)) return t;
		if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t;) n = 31 - kt(t), i = 1 << n, r |= e[n], t &= ~i;
		return r;
	}
	function Lt(e, t) {
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
	function Rt(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes; 0 < a;) {
			var o = 31 - kt(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Lt(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
	}
	function zt(e) {
		return e = e.pendingLanes & -1073741825, e === 0 ? e & 1073741824 ? 1073741824 : 0 : e;
	}
	function Bt() {
		var e = Nt;
		return Nt <<= 1, !(Nt & 4194240) && (Nt = 64), e;
	}
	function Vt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Ht(e, t, n) {
		e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - kt(t), e[t] = n;
	}
	function Ut(e, t) {
		var n = e.pendingLanes & ~t;
		e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
		var r = e.eventTimes;
		for (e = e.expirationTimes; 0 < n;) {
			var i = 31 - kt(n), a = 1 << i;
			t[i] = 0, r[i] = -1, e[i] = -1, n &= ~a;
		}
	}
	function Wt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - kt(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	var L = 0;
	function Gt(e) {
		return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
	}
	var Kt, qt, Jt, Yt, Xt, Zt = !1, Qt = [], $t = null, en = null, tn = null, nn = /* @__PURE__ */ new Map(), rn = /* @__PURE__ */ new Map(), an = [], on = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
	function sn(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				$t = null;
				break;
			case "dragenter":
			case "dragleave":
				en = null;
				break;
			case "mouseover":
			case "mouseout":
				tn = null;
				break;
			case "pointerover":
			case "pointerout":
				nn.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": rn.delete(t.pointerId);
		}
	}
	function cn(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Wi(t), t !== null && qt(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function ln(e, t, n, r, i) {
		switch (t) {
			case "focusin": return $t = cn($t, e, t, n, r, i), !0;
			case "dragenter": return en = cn(en, e, t, n, r, i), !0;
			case "mouseover": return tn = cn(tn, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return nn.set(a, cn(nn.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, rn.set(a, cn(rn.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function un(e) {
		var t = Ui(e.target);
		if (t !== null) {
			var n = ut(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = dt(n), t !== null) {
						e.blockedOn = t, Xt(e.priority, function() {
							Jt(n);
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
	function dn(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = Sn(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				Ve = r, n.target.dispatchEvent(r), Ve = null;
			} else return t = Wi(n), t !== null && qt(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function fn(e, t, n) {
		dn(e) && n.delete(t);
	}
	function pn() {
		Zt = !1, $t !== null && dn($t) && ($t = null), en !== null && dn(en) && (en = null), tn !== null && dn(tn) && (tn = null), nn.forEach(fn), rn.forEach(fn);
	}
	function mn(e, t) {
		e.blockedOn === t && (e.blockedOn = null, Zt || (Zt = !0, r.unstable_scheduleCallback(r.unstable_NormalPriority, pn)));
	}
	function hn(e) {
		function t(t) {
			return mn(t, e);
		}
		if (0 < Qt.length) {
			mn(Qt[0], e);
			for (var n = 1; n < Qt.length; n++) {
				var r = Qt[n];
				r.blockedOn === e && (r.blockedOn = null);
			}
		}
		for ($t !== null && mn($t, e), en !== null && mn(en, e), tn !== null && mn(tn, e), nn.forEach(t), rn.forEach(t), n = 0; n < an.length; n++) r = an[n], r.blockedOn === e && (r.blockedOn = null);
		for (; 0 < an.length && (n = an[0], n.blockedOn === null);) un(n), n.blockedOn === null && an.shift();
	}
	var gn = C.ReactCurrentBatchConfig, _n = !0;
	function vn(e, t, n, r) {
		var i = L, a = gn.transition;
		gn.transition = null;
		try {
			L = 1, bn(e, t, n, r);
		} finally {
			L = i, gn.transition = a;
		}
	}
	function yn(e, t, n, r) {
		var i = L, a = gn.transition;
		gn.transition = null;
		try {
			L = 4, bn(e, t, n, r);
		} finally {
			L = i, gn.transition = a;
		}
	}
	function bn(e, t, n, r) {
		if (_n) {
			var i = Sn(e, t, n, r);
			if (i === null) hi(e, t, r, xn, n), sn(e, r);
			else if (ln(i, e, t, n, r)) r.stopPropagation();
			else if (sn(e, r), t & 4 && -1 < on.indexOf(e)) {
				for (; i !== null;) {
					var a = Wi(i);
					if (a !== null && Kt(a), a = Sn(e, t, n, r), a === null && hi(e, t, r, xn, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else hi(e, t, r, null, n);
		}
	}
	var xn = null;
	function Sn(e, t, n, r) {
		if (xn = null, e = He(r), e = Ui(e), e !== null) {
			if (t = ut(e), t === null) e = null;
			else if (n = t.tag, n === 13) {
				if (e = dt(t), e !== null) return e;
				e = null;
			} else if (n === 3) {
				if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
				e = null;
			} else t !== e && (e = null);
		}
		return xn = e, null;
	}
	function Cn(e) {
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
			case "message": switch (bt()) {
				case xt: return 1;
				case St: return 4;
				case Ct:
				case wt: return 16;
				case Tt: return 536870912;
				default: return 16;
			}
			default: return 16;
		}
	}
	var wn = null, Tn = null, En = null;
	function Dn() {
		if (En) return En;
		var e, t = Tn, n = t.length, r, i = "value" in wn ? wn.value : wn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return En = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function On(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function kn() {
		return !0;
	}
	function An() {
		return !1;
	}
	function jn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? kn : An, this.isPropagationStopped = An, this;
		}
		return P(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = kn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = kn);
			},
			persist: function() {},
			isPersistent: kn
		}), t;
	}
	var Mn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Nn = jn(Mn), Pn = P({}, Mn, {
		view: 0,
		detail: 0
	}), Fn = jn(Pn), In, Ln, Rn, zn = P({}, Pn, {
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
		getModifierState: Xn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Rn && (Rn && e.type === "mousemove" ? (In = e.screenX - Rn.screenX, Ln = e.screenY - Rn.screenY) : Ln = In = 0, Rn = e), In);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Ln;
		}
	}), Bn = jn(zn), Vn = jn(P({}, zn, { dataTransfer: 0 })), Hn = jn(P({}, Pn, { relatedTarget: 0 })), Un = jn(P({}, Mn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Wn = jn(P({}, Mn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Gn = jn(P({}, Mn, { data: 0 })), Kn = {
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
	}, qn = {
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
	}, Jn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Yn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Jn[e]) ? !!t[e] : !1;
	}
	function Xn() {
		return Yn;
	}
	var Zn = jn(P({}, Pn, {
		key: function(e) {
			if (e.key) {
				var t = Kn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = On(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? qn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Xn,
		charCode: function(e) {
			return e.type === "keypress" ? On(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? On(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Qn = jn(P({}, zn, {
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
	})), $n = jn(P({}, Pn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Xn
	})), er = jn(P({}, Mn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), tr = jn(P({}, zn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), nr = [
		9,
		13,
		27,
		32
	], rr = u && "CompositionEvent" in window, ir = null;
	u && "documentMode" in document && (ir = document.documentMode);
	var ar = u && "TextEvent" in window && !ir, or = u && (!rr || ir && 8 < ir && 11 >= ir), sr = " ", cr = !1;
	function lr(e, t) {
		switch (e) {
			case "keyup": return nr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function ur(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var dr = !1;
	function fr(e, t) {
		switch (e) {
			case "compositionend": return ur(t);
			case "keypress": return t.which === 32 ? (cr = !0, sr) : null;
			case "textInput": return e = t.data, e === sr && cr ? null : e;
			default: return null;
		}
	}
	function pr(e, t) {
		if (dr) return e === "compositionend" || !rr && lr(e, t) ? (e = Dn(), En = Tn = wn = null, dr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return or && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var mr = {
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
	function hr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!mr[e.type] : t === "textarea";
	}
	function gr(e, t, n, r) {
		qe(r), t = _i(t, "onChange"), 0 < t.length && (n = new Nn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var _r = null, vr = null;
	function yr(e) {
		ui(e, 0);
	}
	function br(e) {
		if (ge(Gi(e))) return e;
	}
	function xr(e, t) {
		if (e === "change") return t;
	}
	var Sr = !1;
	if (u) {
		var Cr;
		if (u) {
			var wr = "oninput" in document;
			if (!wr) {
				var Tr = document.createElement("div");
				Tr.setAttribute("oninput", "return;"), wr = typeof Tr.oninput == "function";
			}
			Cr = wr;
		} else Cr = !1;
		Sr = Cr && (!document.documentMode || 9 < document.documentMode);
	}
	function Er() {
		_r && (_r.detachEvent("onpropertychange", Dr), vr = _r = null);
	}
	function Dr(e) {
		if (e.propertyName === "value" && br(vr)) {
			var t = [];
			gr(t, vr, e, He(e)), Qe(yr, t);
		}
	}
	function Or(e, t, n) {
		e === "focusin" ? (Er(), _r = t, vr = n, _r.attachEvent("onpropertychange", Dr)) : e === "focusout" && Er();
	}
	function kr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return br(vr);
	}
	function Ar(e, t) {
		if (e === "click") return br(t);
	}
	function jr(e, t) {
		if (e === "input" || e === "change") return br(t);
	}
	function Mr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Nr = typeof Object.is == "function" ? Object.is : Mr;
	function Pr(e, t) {
		if (Nr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!d.call(t, i) || !Nr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Fr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Ir(e, t) {
		var n = Fr(e);
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
			n = Fr(n);
		}
	}
	function Lr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Lr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Rr() {
		for (var e = window, t = F(); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = F(e.document);
		}
		return t;
	}
	function zr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	function Br(e) {
		var t = Rr(), n = e.focusedElem, r = e.selectionRange;
		if (t !== n && n && n.ownerDocument && Lr(n.ownerDocument.documentElement, n)) {
			if (r !== null && zr(n)) {
				if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
				else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
					e = e.getSelection();
					var i = n.textContent.length, a = Math.min(r.start, i);
					r = r.end === void 0 ? a : Math.min(r.end, i), !e.extend && a > r && (i = r, r = a, a = i), i = Ir(n, a);
					var o = Ir(n, r);
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
	var Vr = u && "documentMode" in document && 11 >= document.documentMode, Hr = null, Ur = null, Wr = null, Gr = !1;
	function Kr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Gr || Hr == null || Hr !== F(r) || (r = Hr, "selectionStart" in r && zr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Wr && Pr(Wr, r) || (Wr = r, r = _i(Ur, "onSelect"), 0 < r.length && (t = new Nn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Hr)));
	}
	function qr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Jr = {
		animationend: qr("Animation", "AnimationEnd"),
		animationiteration: qr("Animation", "AnimationIteration"),
		animationstart: qr("Animation", "AnimationStart"),
		transitionend: qr("Transition", "TransitionEnd")
	}, Yr = {}, Xr = {};
	u && (Xr = document.createElement("div").style, "AnimationEvent" in window || (delete Jr.animationend.animation, delete Jr.animationiteration.animation, delete Jr.animationstart.animation), "TransitionEvent" in window || delete Jr.transitionend.transition);
	function Zr(e) {
		if (Yr[e]) return Yr[e];
		if (!Jr[e]) return e;
		var t = Jr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Xr) return Yr[e] = t[n];
		return e;
	}
	var Qr = Zr("animationend"), $r = Zr("animationiteration"), ei = Zr("animationstart"), ti = Zr("transitionend"), ni = /* @__PURE__ */ new Map(), ri = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	function ii(e, t) {
		ni.set(e, t), c(t, [e]);
	}
	for (var ai = 0; ai < ri.length; ai++) {
		var oi = ri[ai];
		ii(oi.toLowerCase(), "on" + (oi[0].toUpperCase() + oi.slice(1)));
	}
	ii(Qr, "onAnimationEnd"), ii($r, "onAnimationIteration"), ii(ei, "onAnimationStart"), ii("dblclick", "onDoubleClick"), ii("focusin", "onFocus"), ii("focusout", "onBlur"), ii(ti, "onTransitionEnd"), l("onMouseEnter", ["mouseout", "mouseover"]), l("onMouseLeave", ["mouseout", "mouseover"]), l("onPointerEnter", ["pointerout", "pointerover"]), l("onPointerLeave", ["pointerout", "pointerover"]), c("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), c("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), c("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), c("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), c("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), c("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var si = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), ci = new Set("cancel close invalid load scroll toggle".split(" ").concat(si));
	function li(e, t, n) {
		var r = e.type || "unknown-event";
		e.currentTarget = n, lt(r, t, void 0, e), e.currentTarget = null;
	}
	function ui(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					li(i, s, l), a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					li(i, s, l), a = c;
				}
			}
		}
		if (at) throw e = ot, at = !1, ot = null, e;
	}
	function R(e, t) {
		var n = t[Bi];
		n === void 0 && (n = t[Bi] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (mi(t, e, 2, !1), n.add(r));
	}
	function di(e, t, n) {
		var r = 0;
		t && (r |= 4), mi(n, e, r, t);
	}
	var fi = "_reactListening" + Math.random().toString(36).slice(2);
	function pi(e) {
		if (!e[fi]) {
			e[fi] = !0, o.forEach(function(t) {
				t !== "selectionchange" && (ci.has(t) || di(t, !1, e), di(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[fi] || (t[fi] = !0, di("selectionchange", !1, t));
		}
	}
	function mi(e, t, n, r) {
		switch (Cn(t)) {
			case 1:
				var i = vn;
				break;
			case 4:
				i = yn;
				break;
			default: i = bn;
		}
		n = i.bind(null, t, n, e), i = void 0, !et || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function hi(e, t, n, r, i) {
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
					if (o = Ui(s), o === null) return;
					if (c = o.tag, c === 5 || c === 6) {
						r = a = o;
						continue a;
					}
					s = s.parentNode;
				}
			}
			r = r.return;
		}
		Qe(function() {
			var r = a, i = He(n), o = [];
			a: {
				var s = ni.get(e);
				if (s !== void 0) {
					var c = Nn, l = e;
					switch (e) {
						case "keypress": if (On(n) === 0) break a;
						case "keydown":
						case "keyup":
							c = Zn;
							break;
						case "focusin":
							l = "focus", c = Hn;
							break;
						case "focusout":
							l = "blur", c = Hn;
							break;
						case "beforeblur":
						case "afterblur":
							c = Hn;
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
							c = Bn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							c = Vn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							c = $n;
							break;
						case Qr:
						case $r:
						case ei:
							c = Un;
							break;
						case ti:
							c = er;
							break;
						case "scroll":
							c = Fn;
							break;
						case "wheel":
							c = tr;
							break;
						case "copy":
						case "cut":
						case "paste":
							c = Wn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup": c = Qn;
					}
					var u = !!(t & 4), d = !u && e === "scroll", f = u ? s === null ? null : s + "Capture" : s;
					u = [];
					for (var p = r, m; p !== null;) {
						m = p;
						var h = m.stateNode;
						if (m.tag === 5 && h !== null && (m = h, f !== null && (h = $e(p, f), h != null && u.push(gi(p, h, m)))), d) break;
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
					if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== Ve && (l = n.relatedTarget || n.fromElement) && (Ui(l) || l[zi])) break a;
					if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Ui(l) : null, l !== null && (d = ut(l), l !== d || l.tag !== 5 && l.tag !== 6) && (l = null)) : (c = null, l = r), c !== l)) {
						if (u = Bn, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = Qn, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = c == null ? s : Gi(c), m = l == null ? s : Gi(l), s = new u(h, p + "leave", c, n, i), s.target = d, s.relatedTarget = m, h = null, Ui(i) === r && (u = new u(f, p + "enter", l, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, c && l) b: {
							for (u = c, f = l, p = 0, m = u; m; m = vi(m)) p++;
							for (m = 0, h = f; h; h = vi(h)) m++;
							for (; 0 < p - m;) u = vi(u), p--;
							for (; 0 < m - p;) f = vi(f), m--;
							for (; p--;) {
								if (u === f || f !== null && u === f.alternate) break b;
								u = vi(u), f = vi(f);
							}
							u = null;
						}
						else u = null;
						c !== null && yi(o, s, c, u, !1), l !== null && d !== null && yi(o, d, l, u, !0);
					}
				}
				a: {
					if (s = r ? Gi(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var g = xr;
					else if (hr(s)) {
						if (Sr) g = jr;
						else {
							g = kr;
							var _ = Or;
						}
					} else (c = s.nodeName) && c.toLowerCase() === "input" && (s.type === "checkbox" || s.type === "radio") && (g = Ar);
					if (g &&= g(e, r)) {
						gr(o, g, n, i);
						break a;
					}
					_ && _(e, s, r), e === "focusout" && (_ = s._wrapperState) && _.controlled && s.type === "number" && Se(s, "number", s.value);
				}
				switch (_ = r ? Gi(r) : window, e) {
					case "focusin":
						(hr(_) || _.contentEditable === "true") && (Hr = _, Ur = r, Wr = null);
						break;
					case "focusout":
						Wr = Ur = Hr = null;
						break;
					case "mousedown":
						Gr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Gr = !1, Kr(o, n, i);
						break;
					case "selectionchange": if (Vr) break;
					case "keydown":
					case "keyup": Kr(o, n, i);
				}
				var v;
				if (rr) b: {
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
				else dr ? lr(e, n) && (y = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (y = "onCompositionStart");
				y && (or && n.locale !== "ko" && (dr || y !== "onCompositionStart" ? y === "onCompositionEnd" && dr && (v = Dn()) : (wn = i, Tn = "value" in wn ? wn.value : wn.textContent, dr = !0)), _ = _i(r, y), 0 < _.length && (y = new Gn(y, e, null, n, i), o.push({
					event: y,
					listeners: _
				}), v ? y.data = v : (v = ur(n), v !== null && (y.data = v)))), (v = ar ? fr(e, n) : pr(e, n)) && (r = _i(r, "onBeforeInput"), 0 < r.length && (i = new Gn("onBeforeInput", "beforeinput", null, n, i), o.push({
					event: i,
					listeners: r
				}), i.data = v));
			}
			ui(o, t);
		});
	}
	function gi(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function _i(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			i.tag === 5 && a !== null && (i = a, a = $e(e, n), a != null && r.unshift(gi(e, a, i)), a = $e(e, t), a != null && r.push(gi(e, a, i))), e = e.return;
		}
		return r;
	}
	function vi(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5);
		return e || null;
	}
	function yi(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (c !== null && c === r) break;
			s.tag === 5 && l !== null && (s = l, i ? (c = $e(n, a), c != null && o.unshift(gi(n, c, s))) : i || (c = $e(n, a), c != null && o.push(gi(n, c, s)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var bi = /\r\n?/g, xi = /\u0000|\uFFFD/g;
	function Si(e) {
		return (typeof e == "string" ? e : "" + e).replace(bi, "\n").replace(xi, "");
	}
	function Ci(e, t, n) {
		if (t = Si(t), Si(e) !== t && n) throw Error(a(425));
	}
	function wi() {}
	var Ti = null, Ei = null;
	function Di(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Oi = typeof setTimeout == "function" ? setTimeout : void 0, ki = typeof clearTimeout == "function" ? clearTimeout : void 0, Ai = typeof Promise == "function" ? Promise : void 0, ji = typeof queueMicrotask == "function" ? queueMicrotask : Ai === void 0 ? Oi : function(e) {
		return Ai.resolve(null).then(e).catch(Mi);
	};
	function Mi(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Ni(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$") {
					if (r === 0) {
						e.removeChild(i), hn(t);
						return;
					}
					r--;
				} else n !== "$" && n !== "$?" && n !== "$!" || r++;
			}
			n = i;
		} while (n);
		hn(t);
	}
	function Pi(e) {
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
	function Fi(e) {
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
	var Ii = Math.random().toString(36).slice(2), Li = "__reactFiber$" + Ii, Ri = "__reactProps$" + Ii, zi = "__reactContainer$" + Ii, Bi = "__reactEvents$" + Ii, Vi = "__reactListeners$" + Ii, Hi = "__reactHandles$" + Ii;
	function Ui(e) {
		var t = e[Li];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[zi] || n[Li]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Fi(e); e !== null;) {
					if (n = e[Li]) return n;
					e = Fi(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Wi(e) {
		return e = e[Li] || e[zi], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
	}
	function Gi(e) {
		if (e.tag === 5 || e.tag === 6) return e.stateNode;
		throw Error(a(33));
	}
	function Ki(e) {
		return e[Ri] || null;
	}
	var qi = [], Ji = -1;
	function Yi(e) {
		return { current: e };
	}
	function z(e) {
		0 > Ji || (e.current = qi[Ji], qi[Ji] = null, Ji--);
	}
	function B(e, t) {
		Ji++, qi[Ji] = e.current, e.current = t;
	}
	var Xi = {}, Zi = Yi(Xi), Qi = Yi(!1), $i = Xi;
	function ea(e, t) {
		var n = e.type.contextTypes;
		if (!n) return Xi;
		var r = e.stateNode;
		if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
		var i = {}, a;
		for (a in n) i[a] = t[a];
		return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
	}
	function ta(e) {
		return e = e.childContextTypes, e != null;
	}
	function na() {
		z(Qi), z(Zi);
	}
	function ra(e, t, n) {
		if (Zi.current !== Xi) throw Error(a(168));
		B(Zi, t), B(Qi, n);
	}
	function ia(e, t, n) {
		var r = e.stateNode;
		if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
		for (var i in r = r.getChildContext(), r) if (!(i in t)) throw Error(a(108, de(e) || "Unknown", i));
		return P({}, n, r);
	}
	function aa(e) {
		return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Xi, $i = Zi.current, B(Zi, e), B(Qi, Qi.current), !0;
	}
	function oa(e, t, n) {
		var r = e.stateNode;
		if (!r) throw Error(a(169));
		n ? (e = ia(e, t, $i), r.__reactInternalMemoizedMergedChildContext = e, z(Qi), z(Zi), B(Zi, e)) : z(Qi), B(Qi, n);
	}
	var sa = null, ca = !1, la = !1;
	function ua(e) {
		sa === null ? sa = [e] : sa.push(e);
	}
	function da(e) {
		ca = !0, ua(e);
	}
	function fa() {
		if (!la && sa !== null) {
			la = !0;
			var e = 0, t = L;
			try {
				var n = sa;
				for (L = 1; e < n.length; e++) {
					var r = n[e];
					do
						r = r(!0);
					while (r !== null);
				}
				sa = null, ca = !1;
			} catch (t) {
				throw sa !== null && (sa = sa.slice(e + 1)), gt(xt, fa), t;
			} finally {
				L = t, la = !1;
			}
		}
		return null;
	}
	var pa = [], ma = 0, ha = null, ga = 0, _a = [], va = 0, ya = null, ba = 1, xa = "";
	function Sa(e, t) {
		pa[ma++] = ga, pa[ma++] = ha, ha = e, ga = t;
	}
	function Ca(e, t, n) {
		_a[va++] = ba, _a[va++] = xa, _a[va++] = ya, ya = e;
		var r = ba;
		e = xa;
		var i = 32 - kt(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - kt(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, ba = 1 << 32 - kt(t) + i | n << i | r, xa = a + e;
		} else ba = 1 << a | n << i | r, xa = e;
	}
	function wa(e) {
		e.return !== null && (Sa(e, 1), Ca(e, 1, 0));
	}
	function Ta(e) {
		for (; e === ha;) ha = pa[--ma], pa[ma] = null, ga = pa[--ma], pa[ma] = null;
		for (; e === ya;) ya = _a[--va], _a[va] = null, xa = _a[--va], _a[va] = null, ba = _a[--va], _a[va] = null;
	}
	var Ea = null, Da = null, V = !1, Oa = null;
	function ka(e, t) {
		var n = Kl(5, null, null, 0);
		n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
	}
	function Aa(e, t) {
		switch (e.tag) {
			case 5:
				var n = e.type;
				return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null && (e.stateNode = t, Ea = e, Da = Pi(t.firstChild), !0);
			case 6: return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null && (e.stateNode = t, Ea = e, Da = null, !0);
			case 13: return t = t.nodeType === 8 ? t : null, t !== null && (n = ya === null ? null : {
				id: ba,
				overflow: xa
			}, e.memoizedState = {
				dehydrated: t,
				treeContext: n,
				retryLane: 1073741824
			}, n = Kl(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ea = e, Da = null, !0);
			default: return !1;
		}
	}
	function ja(e) {
		return !!(e.mode & 1) && !(e.flags & 128);
	}
	function Ma(e) {
		if (V) {
			var t = Da;
			if (t) {
				var n = t;
				if (!Aa(e, t)) {
					if (ja(e)) throw Error(a(418));
					t = Pi(n.nextSibling);
					var r = Ea;
					t && Aa(e, t) ? ka(r, n) : (e.flags = e.flags & -4097 | 2, V = !1, Ea = e);
				}
			} else {
				if (ja(e)) throw Error(a(418));
				e.flags = e.flags & -4097 | 2, V = !1, Ea = e;
			}
		}
	}
	function Na(e) {
		for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
		Ea = e;
	}
	function Pa(e) {
		if (e !== Ea) return !1;
		if (!V) return Na(e), V = !0, !1;
		var t;
		if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Di(e.type, e.memoizedProps)), t &&= Da) {
			if (ja(e)) throw Fa(), Error(a(418));
			for (; t;) ka(e, t), t = Pi(t.nextSibling);
		}
		if (Na(e), e.tag === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(a(317));
			a: {
				for (e = e.nextSibling, t = 0; e;) {
					if (e.nodeType === 8) {
						var n = e.data;
						if (n === "/$") {
							if (t === 0) {
								Da = Pi(e.nextSibling);
								break a;
							}
							t--;
						} else n !== "$" && n !== "$!" && n !== "$?" || t++;
					}
					e = e.nextSibling;
				}
				Da = null;
			}
		} else Da = Ea ? Pi(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Fa() {
		for (var e = Da; e;) e = Pi(e.nextSibling);
	}
	function Ia() {
		Da = Ea = null, V = !1;
	}
	function La(e) {
		Oa === null ? Oa = [e] : Oa.push(e);
	}
	var Ra = C.ReactCurrentBatchConfig;
	function za(e, t, n) {
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
	function Ba(e, t) {
		throw e = Object.prototype.toString.call(t), Error(a(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
	}
	function Va(e) {
		var t = e._init;
		return t(e._payload);
	}
	function Ha(e) {
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
			return a === E ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === a || typeof a == "object" && a && a.$$typeof === N && Va(a) === t.type) ? (r = i(t, n.props), r.ref = za(e, t, n), r.return = e, r) : (r = Xl(n.type, n.key, n.props, null, e.mode, r), r.ref = za(e, t, n), r.return = e, r);
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
					case w: return n = Xl(t.type, t.key, t.props, null, e.mode, n), n.ref = za(e, null, t), n.return = e, n;
					case T: return t = eu(t, e.mode, n), t.return = e, t;
					case N:
						var r = t._init;
						return f(e, r(t._payload), n);
				}
				if (Ce(t) || ie(t)) return t = Zl(t, e.mode, n, null), t.return = e, t;
				Ba(e, t);
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
					case N: return i = n._init, p(e, t, i(n._payload), r);
				}
				if (Ce(n) || ie(n)) return i === null ? d(e, t, n, r, null) : null;
				Ba(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case w: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case T: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case N:
						var a = r._init;
						return m(e, t, n, a(r._payload), i);
				}
				if (Ce(r) || ie(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				Ba(t, r);
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
			if (h === s.length) return n(i, d), V && Sa(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return V && Sa(i, h), l;
			}
			for (d = r(i, d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), V && Sa(i, h), l;
		}
		function g(i, s, c, l) {
			var u = ie(c);
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
			if (v.done) return n(i, h), V && Sa(i, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(i, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return V && Sa(i, g), u;
			}
			for (h = r(i, h); !v.done; g++, v = c.next()) v = m(h, i, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(i, e);
			}), V && Sa(i, g), u;
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
									} else if (l.elementType === c || typeof c == "object" && c && c.$$typeof === N && Va(c) === l.type) {
										n(e, l.sibling), r = i(l, a.props), r.ref = za(e, l, a), r.return = e, e = r;
										break a;
									}
									n(e, l);
									break;
								}
								t(e, l), l = l.sibling;
							}
							a.type === E ? (r = Zl(a.props.children, e.mode, o, a.key), r.return = e, e = r) : (o = Xl(a.type, a.key, a.props, null, e.mode, o), o.ref = za(e, r, a), o.return = e, e = o);
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
					case N: return l = a._init, _(e, r, l(a._payload), o);
				}
				if (Ce(a)) return h(e, r, a, o);
				if (ie(a)) return g(e, r, a, o);
				Ba(e, a);
			}
			return typeof a == "string" && a !== "" || typeof a == "number" ? (a = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), r = i(r, a), r.return = e, e = r) : (n(e, r), r = $l(a, e.mode, o), r.return = e, e = r), s(e)) : n(e, r);
		}
		return _;
	}
	var Ua = Ha(!0), Wa = Ha(!1), Ga = Yi(null), Ka = null, qa = null, Ja = null;
	function Ya() {
		Ja = qa = Ka = null;
	}
	function Xa(e) {
		var t = Ga.current;
		z(Ga), e._currentValue = t;
	}
	function Za(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Qa(e, t) {
		Ka = e, Ja = qa = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Rs = !0), e.firstContext = null);
	}
	function $a(e) {
		var t = e._currentValue;
		if (Ja !== e) {
			if (e = {
				context: e,
				memoizedValue: t,
				next: null
			}, qa === null) {
				if (Ka === null) throw Error(a(308));
				qa = e, Ka.dependencies = {
					lanes: 0,
					firstContext: e
				};
			} else qa = qa.next = e;
		}
		return t;
	}
	var eo = null;
	function to(e) {
		eo === null ? eo = [e] : eo.push(e);
	}
	function no(e, t, n, r) {
		var i = t.interleaved;
		return i === null ? (n.next = n, to(t)) : (n.next = i.next, i.next = n), t.interleaved = n, ro(e, r);
	}
	function ro(e, t) {
		e.lanes |= t;
		var n = e.alternate;
		for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
		return n.tag === 3 ? n.stateNode : null;
	}
	var io = !1;
	function ao(e) {
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
	function oo(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			effects: e.effects
		});
	}
	function so(e, t) {
		return {
			eventTime: e,
			lane: t,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function co(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, J & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, ro(e, n);
		}
		return i = r.interleaved, i === null ? (t.next = t, to(r)) : (t.next = i.next, i.next = t), r.interleaved = t, ro(e, n);
	}
	function lo(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194240)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Wt(e, n);
		}
	}
	function uo(e, t) {
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
	function fo(e, t, n, r) {
		var i = e.updateQueue;
		io = !1;
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
								d = P({}, d, f);
								break a;
							case 2: io = !0;
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
	function po(e, t, n) {
		if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
			var r = e[t], i = r.callback;
			if (i !== null) {
				if (r.callback = null, r = n, typeof i != "function") throw Error(a(191, i));
				i.call(r);
			}
		}
	}
	var mo = {}, ho = Yi(mo), go = Yi(mo), _o = Yi(mo);
	function vo(e) {
		if (e === mo) throw Error(a(174));
		return e;
	}
	function yo(e, t) {
		switch (B(_o, t), B(go, e), B(ho, mo), e = t.nodeType, e) {
			case 9:
			case 11:
				t = (t = t.documentElement) ? t.namespaceURI : Ae(null, "");
				break;
			default: e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Ae(t, e);
		}
		z(ho), B(ho, t);
	}
	function bo() {
		z(ho), z(go), z(_o);
	}
	function xo(e) {
		vo(_o.current);
		var t = vo(ho.current), n = Ae(t, e.type);
		t !== n && (B(go, e), B(ho, n));
	}
	function So(e) {
		go.current === e && (z(ho), z(go));
	}
	var H = Yi(0);
	function Co(e) {
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
	var wo = [];
	function To() {
		for (var e = 0; e < wo.length; e++) wo[e]._workInProgressVersionPrimary = null;
		wo.length = 0;
	}
	var Eo = C.ReactCurrentDispatcher, Do = C.ReactCurrentBatchConfig, Oo = 0, U = null, W = null, G = null, ko = !1, Ao = !1, jo = 0, Mo = 0;
	function No() {
		throw Error(a(321));
	}
	function Po(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Nr(e[n], t[n])) return !1;
		return !0;
	}
	function Fo(e, t, n, r, i, o) {
		if (Oo = o, U = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Eo.current = e === null || e.memoizedState === null ? vs : ys, e = n(r, i), Ao) {
			o = 0;
			do {
				if (Ao = !1, jo = 0, 25 <= o) throw Error(a(301));
				o += 1, G = W = null, t.updateQueue = null, Eo.current = bs, e = n(r, i);
			} while (Ao);
		}
		if (Eo.current = _s, t = W !== null && W.next !== null, Oo = 0, G = W = U = null, ko = !1, t) throw Error(a(300));
		return e;
	}
	function Io() {
		var e = jo !== 0;
		return jo = 0, e;
	}
	function Lo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return G === null ? U.memoizedState = G = e : G = G.next = e, G;
	}
	function Ro() {
		if (W === null) {
			var e = U.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = W.next;
		var t = G === null ? U.memoizedState : G.next;
		if (t !== null) G = t, W = e;
		else {
			if (e === null) throw Error(a(310));
			W = e, e = {
				memoizedState: W.memoizedState,
				baseState: W.baseState,
				baseQueue: W.baseQueue,
				queue: W.queue,
				next: null
			}, G === null ? U.memoizedState = G = e : G = G.next = e;
		}
		return G;
	}
	function zo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Bo(e) {
		var t = Ro(), n = t.queue;
		if (n === null) throw Error(a(311));
		n.lastRenderedReducer = e;
		var r = W, i = r.baseQueue, o = n.pending;
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
				if ((Oo & d) === d) l !== null && (l = l.next = {
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
					l === null ? (c = l = f, s = r) : l = l.next = f, U.lanes |= d, Yc |= d;
				}
				u = u.next;
			} while (u !== null && u !== o);
			l === null ? s = r : l.next = c, Nr(r, t.memoizedState) || (Rs = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = l, n.lastRenderedState = r;
		}
		if (e = n.interleaved, e !== null) {
			i = e;
			do
				o = i.lane, U.lanes |= o, Yc |= o, i = i.next;
			while (i !== e);
		} else i === null && (n.lanes = 0);
		return [t.memoizedState, n.dispatch];
	}
	function Vo(e) {
		var t = Ro(), n = t.queue;
		if (n === null) throw Error(a(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, i = n.pending, o = t.memoizedState;
		if (i !== null) {
			n.pending = null;
			var s = i = i.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== i);
			Nr(o, t.memoizedState) || (Rs = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Ho() {}
	function Uo(e, t) {
		var n = U, r = Ro(), i = t(), o = !Nr(r.memoizedState, i);
		if (o && (r.memoizedState = i, Rs = !0), r = r.queue, ts(Ko.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || G !== null && G.memoizedState.tag & 1) {
			if (n.flags |= 2048, Xo(9, Go.bind(null, n, r, i, t), void 0, null), Y === null) throw Error(a(349));
			Oo & 30 || Wo(n, t, i);
		}
		return i;
	}
	function Wo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = U.updateQueue, t === null ? (t = {
			lastEffect: null,
			stores: null
		}, U.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Go(e, t, n, r) {
		t.value = n, t.getSnapshot = r, qo(t) && Jo(e);
	}
	function Ko(e, t, n) {
		return n(function() {
			qo(t) && Jo(e);
		});
	}
	function qo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Nr(e, n);
		} catch {
			return !0;
		}
	}
	function Jo(e) {
		var t = ro(e, 1);
		t !== null && hl(t, e, 1, -1);
	}
	function Yo(e) {
		var t = Lo();
		return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
			pending: null,
			interleaved: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: zo,
			lastRenderedState: e
		}, t.queue = e, e = e.dispatch = ps.bind(null, U, e), [t.memoizedState, e];
	}
	function Xo(e, t, n, r) {
		return e = {
			tag: e,
			create: t,
			destroy: n,
			deps: r,
			next: null
		}, t = U.updateQueue, t === null ? (t = {
			lastEffect: null,
			stores: null
		}, U.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
	}
	function Zo() {
		return Ro().memoizedState;
	}
	function Qo(e, t, n, r) {
		var i = Lo();
		U.flags |= e, i.memoizedState = Xo(1 | t, n, void 0, r === void 0 ? null : r);
	}
	function $o(e, t, n, r) {
		var i = Ro();
		r = r === void 0 ? null : r;
		var a = void 0;
		if (W !== null) {
			var o = W.memoizedState;
			if (a = o.destroy, r !== null && Po(r, o.deps)) {
				i.memoizedState = Xo(t, n, a, r);
				return;
			}
		}
		U.flags |= e, i.memoizedState = Xo(1 | t, n, a, r);
	}
	function es(e, t) {
		return Qo(8390656, 8, e, t);
	}
	function ts(e, t) {
		return $o(2048, 8, e, t);
	}
	function ns(e, t) {
		return $o(4, 2, e, t);
	}
	function rs(e, t) {
		return $o(4, 4, e, t);
	}
	function is(e, t) {
		if (typeof t == "function") return e = e(), t(e), function() {
			t(null);
		};
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function as(e, t, n) {
		return n = n == null ? null : n.concat([e]), $o(4, 4, is.bind(null, t, e), n);
	}
	function os() {}
	function ss(e, t) {
		var n = Ro();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return r !== null && t !== null && Po(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function cs(e, t) {
		var n = Ro();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return r !== null && t !== null && Po(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
	}
	function ls(e, t, n) {
		return Oo & 21 ? (Nr(n, t) || (n = Bt(), U.lanes |= n, Yc |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Rs = !0), e.memoizedState = n);
	}
	function us(e, t) {
		var n = L;
		L = n !== 0 && 4 > n ? n : 4, e(!0);
		var r = Do.transition;
		Do.transition = {};
		try {
			e(!1), t();
		} finally {
			L = n, Do.transition = r;
		}
	}
	function ds() {
		return Ro().memoizedState;
	}
	function fs(e, t, n) {
		var r = ml(e);
		if (n = {
			lane: r,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ms(e)) hs(t, n);
		else if (n = no(e, t, n, r), n !== null) {
			var i = pl();
			hl(n, e, r, i), gs(n, t, r);
		}
	}
	function ps(e, t, n) {
		var r = ml(e), i = {
			lane: r,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (ms(e)) hs(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Nr(s, o)) {
					var c = t.interleaved;
					c === null ? (i.next = i, to(t)) : (i.next = c.next, c.next = i), t.interleaved = i;
					return;
				}
			} catch {}
			n = no(e, t, i, r), n !== null && (i = pl(), hl(n, e, r, i), gs(n, t, r));
		}
	}
	function ms(e) {
		var t = e.alternate;
		return e === U || t !== null && t === U;
	}
	function hs(e, t) {
		Ao = ko = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function gs(e, t, n) {
		if (n & 4194240) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Wt(e, n);
		}
	}
	var _s = {
		readContext: $a,
		useCallback: No,
		useContext: No,
		useEffect: No,
		useImperativeHandle: No,
		useInsertionEffect: No,
		useLayoutEffect: No,
		useMemo: No,
		useReducer: No,
		useRef: No,
		useState: No,
		useDebugValue: No,
		useDeferredValue: No,
		useTransition: No,
		useMutableSource: No,
		useSyncExternalStore: No,
		useId: No,
		unstable_isNewReconciler: !1
	}, vs = {
		readContext: $a,
		useCallback: function(e, t) {
			return Lo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: $a,
		useEffect: es,
		useImperativeHandle: function(e, t, n) {
			return n = n == null ? null : n.concat([e]), Qo(4194308, 4, is.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Qo(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			return Qo(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Lo();
			return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
		},
		useReducer: function(e, t, n) {
			var r = Lo();
			return t = n === void 0 ? t : n(t), r.memoizedState = r.baseState = t, e = {
				pending: null,
				interleaved: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: t
			}, r.queue = e, e = e.dispatch = fs.bind(null, U, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Lo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: Yo,
		useDebugValue: os,
		useDeferredValue: function(e) {
			return Lo().memoizedState = e;
		},
		useTransition: function() {
			var e = Yo(!1), t = e[0];
			return e = us.bind(null, e[1]), Lo().memoizedState = e, [t, e];
		},
		useMutableSource: function() {},
		useSyncExternalStore: function(e, t, n) {
			var r = U, i = Lo();
			if (V) {
				if (n === void 0) throw Error(a(407));
				n = n();
			} else {
				if (n = t(), Y === null) throw Error(a(349));
				Oo & 30 || Wo(r, t, n);
			}
			i.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return i.queue = o, es(Ko.bind(null, r, o, e), [e]), r.flags |= 2048, Xo(9, Go.bind(null, r, o, n, t), void 0, null), n;
		},
		useId: function() {
			var e = Lo(), t = Y.identifierPrefix;
			if (V) {
				var n = xa, r = ba;
				n = (r & ~(1 << 32 - kt(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = jo++, 0 < n && (t += "H" + n.toString(32)), t += ":";
			} else n = Mo++, t = ":" + t + "r" + n.toString(32) + ":";
			return e.memoizedState = t;
		},
		unstable_isNewReconciler: !1
	}, ys = {
		readContext: $a,
		useCallback: ss,
		useContext: $a,
		useEffect: ts,
		useImperativeHandle: as,
		useInsertionEffect: ns,
		useLayoutEffect: rs,
		useMemo: cs,
		useReducer: Bo,
		useRef: Zo,
		useState: function() {
			return Bo(zo);
		},
		useDebugValue: os,
		useDeferredValue: function(e) {
			return ls(Ro(), W.memoizedState, e);
		},
		useTransition: function() {
			return [Bo(zo)[0], Ro().memoizedState];
		},
		useMutableSource: Ho,
		useSyncExternalStore: Uo,
		useId: ds,
		unstable_isNewReconciler: !1
	}, bs = {
		readContext: $a,
		useCallback: ss,
		useContext: $a,
		useEffect: ts,
		useImperativeHandle: as,
		useInsertionEffect: ns,
		useLayoutEffect: rs,
		useMemo: cs,
		useReducer: Vo,
		useRef: Zo,
		useState: function() {
			return Vo(zo);
		},
		useDebugValue: os,
		useDeferredValue: function(e) {
			var t = Ro();
			return W === null ? t.memoizedState = e : ls(t, W.memoizedState, e);
		},
		useTransition: function() {
			return [Vo(zo)[0], Ro().memoizedState];
		},
		useMutableSource: Ho,
		useSyncExternalStore: Uo,
		useId: ds,
		unstable_isNewReconciler: !1
	};
	function xs(e, t) {
		if (e && e.defaultProps) {
			for (var n in t = P({}, t), e = e.defaultProps, e) t[n] === void 0 && (t[n] = e[n]);
			return t;
		}
		return t;
	}
	function Ss(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : P({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Cs = {
		isMounted: function(e) {
			return (e = e._reactInternals) ? ut(e) === e : !1;
		},
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pl(), i = ml(e), a = so(r, i);
			a.payload = t, n != null && (a.callback = n), t = co(e, a, i), t !== null && (hl(t, e, i, r), lo(t, e, i));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pl(), i = ml(e), a = so(r, i);
			a.tag = 1, a.payload = t, n != null && (a.callback = n), t = co(e, a, i), t !== null && (hl(t, e, i, r), lo(t, e, i));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pl(), r = ml(e), i = so(n, r);
			i.tag = 2, t != null && (i.callback = t), t = co(e, i, r), t !== null && (hl(t, e, r, n), lo(t, e, r));
		}
	};
	function ws(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Pr(n, r) || !Pr(i, a) : !0;
	}
	function Ts(e, t, n) {
		var r = !1, i = Xi, a = t.contextType;
		return typeof a == "object" && a ? a = $a(a) : (i = ta(t) ? $i : Zi.current, r = t.contextTypes, a = (r = r != null) ? ea(e, i) : Xi), t = new t(n, a), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Cs, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = a), t;
	}
	function Es(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Cs.enqueueReplaceState(t, t.state, null);
	}
	function Ds(e, t, n, r) {
		var i = e.stateNode;
		i.props = n, i.state = e.memoizedState, i.refs = {}, ao(e);
		var a = t.contextType;
		typeof a == "object" && a ? i.context = $a(a) : (a = ta(t) ? $i : Zi.current, i.context = ea(e, a)), i.state = e.memoizedState, a = t.getDerivedStateFromProps, typeof a == "function" && (Ss(e, t, a, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && Cs.enqueueReplaceState(i, i.state, null), fo(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
	}
	function Os(e, t) {
		try {
			var n = "", r = t;
			do
				n += le(r), r = r.return;
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
	function ks(e, t, n) {
		return {
			value: e,
			source: null,
			stack: n ?? null,
			digest: t ?? null
		};
	}
	function As(e, t) {
		try {
			console.error(t.value);
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	var js = typeof WeakMap == "function" ? WeakMap : Map;
	function Ms(e, t, n) {
		n = so(-1, n), n.tag = 3, n.payload = { element: null };
		var r = t.value;
		return n.callback = function() {
			rl || (rl = !0, il = r), As(e, t);
		}, n;
	}
	function Ns(e, t, n) {
		n = so(-1, n), n.tag = 3;
		var r = e.type.getDerivedStateFromError;
		if (typeof r == "function") {
			var i = t.value;
			n.payload = function() {
				return r(i);
			}, n.callback = function() {
				As(e, t);
			};
		}
		var a = e.stateNode;
		return a !== null && typeof a.componentDidCatch == "function" && (n.callback = function() {
			As(e, t), typeof r != "function" && (al === null ? al = /* @__PURE__ */ new Set([this]) : al.add(this));
			var n = t.stack;
			this.componentDidCatch(t.value, { componentStack: n === null ? "" : n });
		}), n;
	}
	function Ps(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new js();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (i.add(n), e = zl.bind(null, e, t, n), t.then(e, e));
	}
	function Fs(e) {
		do {
			var t;
			if ((t = e.tag === 13) && (t = e.memoizedState, t = t === null || t.dehydrated !== null), t) return e;
			e = e.return;
		} while (e !== null);
		return null;
	}
	function Is(e, t, n, r, i) {
		return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = so(-1, 1), t.tag = 2, co(n, t, 1))), n.lanes |= 1), e);
	}
	var Ls = C.ReactCurrentOwner, Rs = !1;
	function zs(e, t, n, r) {
		t.child = e === null ? Wa(t, null, n, r) : Ua(t, e.child, n, r);
	}
	function Bs(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		return Qa(t, i), r = Fo(e, t, n, r, a, i), n = Io(), e !== null && !Rs ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, oc(e, t, i)) : (V && n && wa(t), t.flags |= 1, zs(e, t, r, i), t.child);
	}
	function Vs(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !ql(a) && a.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = a, Hs(e, t, a, r, i)) : (e = Xl(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, (e.lanes & i) === 0) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Pr : n, n(o, r) && e.ref === t.ref) return oc(e, t, i);
		}
		return t.flags |= 1, e = Yl(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Hs(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Pr(a, r) && e.ref === t.ref) {
				if (Rs = !1, t.pendingProps = r = a, (e.lanes & i) !== 0) e.flags & 131072 && (Rs = !0);
				else return t.lanes = e.lanes, oc(e, t, i);
			}
		}
		return Gs(e, t, n, r, i);
	}
	function Us(e, t, n) {
		var r = t.pendingProps, i = r.children, a = e === null ? null : e.memoizedState;
		if (r.mode === "hidden") {
			if (!(t.mode & 1)) t.memoizedState = {
				baseLanes: 0,
				cachePool: null,
				transitions: null
			}, B(qc, Kc), Kc |= n;
			else {
				if (!(n & 1073741824)) return e = a === null ? n : a.baseLanes | n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
					baseLanes: e,
					cachePool: null,
					transitions: null
				}, t.updateQueue = null, B(qc, Kc), Kc |= e, null;
				t.memoizedState = {
					baseLanes: 0,
					cachePool: null,
					transitions: null
				}, r = a === null ? n : a.baseLanes, B(qc, Kc), Kc |= r;
			}
		} else a === null ? r = n : (r = a.baseLanes | n, t.memoizedState = null), B(qc, Kc), Kc |= r;
		return zs(e, t, i, n), t.child;
	}
	function Ws(e, t) {
		var n = t.ref;
		(e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
	}
	function Gs(e, t, n, r, i) {
		var a = ta(n) ? $i : Zi.current;
		return a = ea(t, a), Qa(t, i), n = Fo(e, t, n, r, a, i), r = Io(), e !== null && !Rs ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, oc(e, t, i)) : (V && r && wa(t), t.flags |= 1, zs(e, t, n, i), t.child);
	}
	function Ks(e, t, n, r, i) {
		if (ta(n)) {
			var a = !0;
			aa(t);
		} else a = !1;
		if (Qa(t, i), t.stateNode === null) ac(e, t), Ts(t, n, r), Ds(t, n, r, i), r = !0;
		else if (e === null) {
			var o = t.stateNode, s = t.memoizedProps;
			o.props = s;
			var c = o.context, l = n.contextType;
			typeof l == "object" && l ? l = $a(l) : (l = ta(n) ? $i : Zi.current, l = ea(t, l));
			var u = n.getDerivedStateFromProps, d = typeof u == "function" || typeof o.getSnapshotBeforeUpdate == "function";
			d || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== r || c !== l) && Es(t, o, r, l), io = !1;
			var f = t.memoizedState;
			o.state = f, fo(t, r, o, i), c = t.memoizedState, s !== r || f !== c || Qi.current || io ? (typeof u == "function" && (Ss(t, n, u, r), c = t.memoizedState), (s = io || ws(t, n, s, r, f, c, l)) ? (d || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), o.props = r, o.state = c, o.context = l, r = s) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			o = t.stateNode, oo(e, t), s = t.memoizedProps, l = t.type === t.elementType ? s : xs(t.type, s), o.props = l, d = t.pendingProps, f = o.context, c = n.contextType, typeof c == "object" && c ? c = $a(c) : (c = ta(n) ? $i : Zi.current, c = ea(t, c));
			var p = n.getDerivedStateFromProps;
			(u = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== d || f !== c) && Es(t, o, r, c), io = !1, f = t.memoizedState, o.state = f, fo(t, r, o, i);
			var m = t.memoizedState;
			s !== d || f !== m || Qi.current || io ? (typeof p == "function" && (Ss(t, n, p, r), m = t.memoizedState), (l = io || ws(t, n, l, r, f, m, c) || !1) ? (u || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, m, c), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, m, c)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), o.props = r, o.state = m, o.context = c, r = l) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return qs(e, t, n, r, a, i);
	}
	function qs(e, t, n, r, i, a) {
		Ws(e, t);
		var o = !!(t.flags & 128);
		if (!r && !o) return i && oa(t, n, !1), oc(e, t, a);
		r = t.stateNode, Ls.current = t;
		var s = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
		return t.flags |= 1, e !== null && o ? (t.child = Ua(t, e.child, null, a), t.child = Ua(t, null, s, a)) : zs(e, t, s, a), t.memoizedState = r.state, i && oa(t, n, !0), t.child;
	}
	function Js(e) {
		var t = e.stateNode;
		t.pendingContext ? ra(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ra(e, t.context, !1), yo(e, t.containerInfo);
	}
	function Ys(e, t, n, r, i) {
		return Ia(), La(i), t.flags |= 256, zs(e, t, n, r), t.child;
	}
	var Xs = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0
	};
	function Zs(e) {
		return {
			baseLanes: e,
			cachePool: null,
			transitions: null
		};
	}
	function Qs(e, t, n) {
		var r = t.pendingProps, i = H.current, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(i & 2)), s ? (a = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), B(H, i & 1), e === null) return Ma(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.lanes = t.mode & 1 ? e.data === "$!" ? 8 : 1073741824 : 1, null) : (o = r.children, e = r.fallback, a ? (r = t.mode, a = t.child, o = {
			mode: "hidden",
			children: o
		}, !(r & 1) && a !== null ? (a.childLanes = 0, a.pendingProps = o) : a = Ql(o, r, 0, null), e = Zl(e, r, n, null), a.return = t, e.return = t, a.sibling = e, t.child = a, t.child.memoizedState = Zs(n), t.memoizedState = Xs, e) : $s(t, o));
		if (i = e.memoizedState, i !== null && (s = i.dehydrated, s !== null)) return tc(e, t, o, r, s, i, n);
		if (a) {
			a = r.fallback, o = t.mode, i = e.child, s = i.sibling;
			var c = {
				mode: "hidden",
				children: r.children
			};
			return !(o & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = Yl(i, c), r.subtreeFlags = i.subtreeFlags & 14680064), s === null ? (a = Zl(a, o, n, null), a.flags |= 2) : a = Yl(s, a), a.return = t, r.return = t, r.sibling = a, t.child = r, r = a, a = t.child, o = e.child.memoizedState, o = o === null ? Zs(n) : {
				baseLanes: o.baseLanes | n,
				cachePool: null,
				transitions: o.transitions
			}, a.memoizedState = o, a.childLanes = e.childLanes & ~n, t.memoizedState = Xs, r;
		}
		return a = e.child, e = a.sibling, r = Yl(a, {
			mode: "visible",
			children: r.children
		}), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
	}
	function $s(e, t) {
		return t = Ql({
			mode: "visible",
			children: t
		}, e.mode, 0, null), t.return = e, e.child = t;
	}
	function ec(e, t, n, r) {
		return r !== null && La(r), Ua(t, e.child, null, n), e = $s(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function tc(e, t, n, r, i, o, s) {
		if (n) return t.flags & 256 ? (t.flags &= -257, r = ks(Error(a(422))), ec(e, t, s, r)) : t.memoizedState === null ? (o = r.fallback, i = t.mode, r = Ql({
			mode: "visible",
			children: r.children
		}, i, 0, null), o = Zl(o, i, s, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Ua(t, e.child, null, s), t.child.memoizedState = Zs(s), t.memoizedState = Xs, o) : (t.child = e.child, t.flags |= 128, null);
		if (!(t.mode & 1)) return ec(e, t, s, null);
		if (i.data === "$!") {
			if (r = i.nextSibling && i.nextSibling.dataset, r) var c = r.dgst;
			return r = c, o = Error(a(419)), r = ks(o, r, void 0), ec(e, t, s, r);
		}
		if (c = (s & e.childLanes) !== 0, Rs || c) {
			if (r = Y, r !== null) {
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
				i = (i & (r.suspendedLanes | s)) === 0 ? i : 0, i !== 0 && i !== o.retryLane && (o.retryLane = i, ro(e, i), hl(r, e, i, -1));
			}
			return kl(), r = ks(Error(a(421))), ec(e, t, s, r);
		}
		return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Vl.bind(null, e), i._reactRetry = t, null) : (e = o.treeContext, Da = Pi(i.nextSibling), Ea = t, V = !0, Oa = null, e !== null && (_a[va++] = ba, _a[va++] = xa, _a[va++] = ya, ba = e.id, xa = e.overflow, ya = t), t = $s(t, r.children), t.flags |= 4096, t);
	}
	function nc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Za(e.return, t, n);
	}
	function rc(e, t, n, r, i) {
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
	function ic(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		if (zs(e, t, r.children, n), r = H.current, r & 2) r = r & 1 | 2, t.flags |= 128;
		else {
			if (e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && nc(e, n, t);
				else if (e.tag === 19) nc(e, n, t);
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
		if (B(H, r), !(t.mode & 1)) t.memoizedState = null;
		else switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && Co(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), rc(t, !1, i, n, a);
				break;
			case "backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && Co(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				rc(t, !0, n, null, a);
				break;
			case "together":
				rc(t, !1, null, null, void 0);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function ac(e, t) {
		!(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
	}
	function oc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Yc |= t.lanes, (n & t.childLanes) === 0) return null;
		if (e !== null && t.child !== e.child) throw Error(a(153));
		if (t.child !== null) {
			for (e = t.child, n = Yl(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Yl(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function sc(e, t, n) {
		switch (t.tag) {
			case 3:
				Js(t), Ia();
				break;
			case 5:
				xo(t);
				break;
			case 1:
				ta(t.type) && aa(t);
				break;
			case 4:
				yo(t, t.stateNode.containerInfo);
				break;
			case 10:
				var r = t.type._context, i = t.memoizedProps.value;
				B(Ga, r._currentValue), r._currentValue = i;
				break;
			case 13:
				if (r = t.memoizedState, r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (B(H, H.current & 1), e = oc(e, t, n), e === null ? null : e.sibling) : Qs(e, t, n) : (B(H, H.current & 1), t.flags |= 128, null);
				B(H, H.current & 1);
				break;
			case 19:
				if (r = (n & t.childLanes) !== 0, e.flags & 128) {
					if (r) return ic(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), B(H, H.current), r) break;
				return null;
			case 22:
			case 23: return t.lanes = 0, Us(e, t, n);
		}
		return oc(e, t, n);
	}
	var cc = function(e, t) {
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
	}, lc = function(e, t, n, r) {
		var i = e.memoizedProps;
		if (i !== r) {
			e = t.stateNode, vo(ho.current);
			var a = null;
			switch (n) {
				case "input":
					i = _e(e, i), r = _e(e, r), a = [];
					break;
				case "select":
					i = P({}, i, { value: void 0 }), r = P({}, r, { value: void 0 }), a = [];
					break;
				case "textarea":
					i = Te(e, i), r = Te(e, r), a = [];
					break;
				default: typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = wi);
			}
			ze(n, r);
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
					} else u === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, c = c ? c.__html : void 0, l != null && c !== l && (a ||= []).push(u, l)) : u === "children" ? typeof l != "string" && typeof l != "number" || (a ||= []).push(u, "" + l) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (s.hasOwnProperty(u) ? (l != null && u === "onScroll" && R("scroll", e), a || c === l || (a = [])) : (a ||= []).push(u, l));
				}
			}
			n && (a ||= []).push("style", n);
			var u = a;
			(t.updateQueue = u) && (t.flags |= 4);
		}
	}, uc = function(e, t, n, r) {
		n !== r && (t.flags |= 4);
	};
	function dc(e, t) {
		if (!V) switch (e.tailMode) {
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
	function fc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function pc(e, t, n) {
		var r = t.pendingProps;
		switch (Ta(t), t.tag) {
			case 2:
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return fc(t), null;
			case 1: return ta(t.type) && na(), fc(t), null;
			case 3: return r = t.stateNode, bo(), z(Qi), z(Zi), To(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Pa(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Oa !== null && (yl(Oa), Oa = null))), fc(t), null;
			case 5:
				So(t);
				var i = vo(_o.current);
				if (n = t.type, e !== null && t.stateNode != null) lc(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(a(166));
						return fc(t), null;
					}
					if (e = vo(ho.current), Pa(t)) {
						r = t.stateNode, n = t.type;
						var o = t.memoizedProps;
						switch (r[Li] = t, r[Ri] = o, e = !!(t.mode & 1), n) {
							case "dialog":
								R("cancel", r), R("close", r);
								break;
							case "iframe":
							case "object":
							case "embed":
								R("load", r);
								break;
							case "video":
							case "audio":
								for (i = 0; i < si.length; i++) R(si[i], r);
								break;
							case "source":
								R("error", r);
								break;
							case "img":
							case "image":
							case "link":
								R("error", r), R("load", r);
								break;
							case "details":
								R("toggle", r);
								break;
							case "input":
								ve(r, o), R("invalid", r);
								break;
							case "select":
								r._wrapperState = { wasMultiple: !!o.multiple }, R("invalid", r);
								break;
							case "textarea": Ee(r, o), R("invalid", r);
						}
						for (var c in ze(n, o), i = null, o) if (o.hasOwnProperty(c)) {
							var l = o[c];
							c === "children" ? typeof l == "string" ? r.textContent !== l && (!0 !== o.suppressHydrationWarning && Ci(r.textContent, l, e), i = ["children", l]) : typeof l == "number" && r.textContent !== "" + l && (!0 !== o.suppressHydrationWarning && Ci(r.textContent, l, e), i = ["children", "" + l]) : s.hasOwnProperty(c) && l != null && c === "onScroll" && R("scroll", r);
						}
						switch (n) {
							case "input":
								he(r), xe(r, o, !0);
								break;
							case "textarea":
								he(r), Oe(r);
								break;
							case "select":
							case "option": break;
							default: typeof o.onClick == "function" && (r.onclick = wi);
						}
						r = i, t.updateQueue = r, r !== null && (t.flags |= 4);
					} else {
						c = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = ke(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = c.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = c.createElement(n, { is: r.is }) : (e = c.createElement(n), n === "select" && (c = e, r.multiple ? c.multiple = !0 : r.size && (c.size = r.size))) : e = c.createElementNS(e, n), e[Li] = t, e[Ri] = r, cc(e, t, !1, !1), t.stateNode = e;
						a: {
							switch (c = Be(n, r), n) {
								case "dialog":
									R("cancel", e), R("close", e), i = r;
									break;
								case "iframe":
								case "object":
								case "embed":
									R("load", e), i = r;
									break;
								case "video":
								case "audio":
									for (i = 0; i < si.length; i++) R(si[i], e);
									i = r;
									break;
								case "source":
									R("error", e), i = r;
									break;
								case "img":
								case "image":
								case "link":
									R("error", e), R("load", e), i = r;
									break;
								case "details":
									R("toggle", e), i = r;
									break;
								case "input":
									ve(e, r), i = _e(e, r), R("invalid", e);
									break;
								case "option":
									i = r;
									break;
								case "select":
									e._wrapperState = { wasMultiple: !!r.multiple }, i = P({}, r, { value: void 0 }), R("invalid", e);
									break;
								case "textarea":
									Ee(e, r), i = Te(e, r), R("invalid", e);
									break;
								default: i = r;
							}
							for (o in ze(n, i), l = i, l) if (l.hasOwnProperty(o)) {
								var u = l[o];
								o === "style" ? Le(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Me(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Ne(e, u) : typeof u == "number" && Ne(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (s.hasOwnProperty(o) ? u != null && o === "onScroll" && R("scroll", e) : u != null && S(e, o, u, c));
							}
							switch (n) {
								case "input":
									he(e), xe(e, r, !1);
									break;
								case "textarea":
									he(e), Oe(e);
									break;
								case "option":
									r.value != null && e.setAttribute("value", "" + fe(r.value));
									break;
								case "select":
									e.multiple = !!r.multiple, o = r.value, o == null ? r.defaultValue != null && we(e, !!r.multiple, r.defaultValue, !0) : we(e, !!r.multiple, o, !1);
									break;
								default: typeof i.onClick == "function" && (e.onclick = wi);
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
				return fc(t), null;
			case 6:
				if (e && t.stateNode != null) uc(e, t, e.memoizedProps, r);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(a(166));
					if (n = vo(_o.current), vo(ho.current), Pa(t)) {
						if (r = t.stateNode, n = t.memoizedProps, r[Li] = t, (o = r.nodeValue !== n) && (e = Ea, e !== null)) switch (e.tag) {
							case 3:
								Ci(r.nodeValue, n, !!(e.mode & 1));
								break;
							case 5: !0 !== e.memoizedProps.suppressHydrationWarning && Ci(r.nodeValue, n, !!(e.mode & 1));
						}
						o && (t.flags |= 4);
					} else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Li] = t, t.stateNode = r;
				}
				return fc(t), null;
			case 13:
				if (z(H), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (V && Da !== null && t.mode & 1 && !(t.flags & 128)) Fa(), Ia(), t.flags |= 98560, o = !1;
					else if (o = Pa(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!o) throw Error(a(318));
							if (o = t.memoizedState, o = o === null ? null : o.dehydrated, !o) throw Error(a(317));
							o[Li] = t;
						} else Ia(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						fc(t), o = !1;
					} else Oa !== null && (yl(Oa), Oa = null), o = !0;
					if (!o) return t.flags & 65536 ? t : null;
				}
				return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || H.current & 1 ? Q === 0 && (Q = 3) : kl())), t.updateQueue !== null && (t.flags |= 4), fc(t), null);
			case 4: return bo(), e === null && pi(t.stateNode.containerInfo), fc(t), null;
			case 10: return Xa(t.type._context), fc(t), null;
			case 17: return ta(t.type) && na(), fc(t), null;
			case 19:
				if (z(H), o = t.memoizedState, o === null) return fc(t), null;
				if (r = !!(t.flags & 128), c = o.rendering, c === null) {
					if (r) dc(o, !1);
					else {
						if (Q !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (c = Co(e), c !== null) {
								for (t.flags |= 128, dc(o, !1), r = c.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null;) o = n, e = r, o.flags &= 14680066, c = o.alternate, c === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = c.childLanes, o.lanes = c.lanes, o.child = c.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = c.memoizedProps, o.memoizedState = c.memoizedState, o.updateQueue = c.updateQueue, o.type = c.type, e = c.dependencies, o.dependencies = e === null ? null : {
									lanes: e.lanes,
									firstContext: e.firstContext
								}), n = n.sibling;
								return B(H, H.current & 1 | 2), t.child;
							}
							e = e.sibling;
						}
						o.tail !== null && I() > tl && (t.flags |= 128, r = !0, dc(o, !1), t.lanes = 4194304);
					}
				} else {
					if (!r) {
						if (e = Co(c), e !== null) {
							if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), dc(o, !0), o.tail === null && o.tailMode === "hidden" && !c.alternate && !V) return fc(t), null;
						} else 2 * I() - o.renderingStartTime > tl && n !== 1073741824 && (t.flags |= 128, r = !0, dc(o, !1), t.lanes = 4194304);
					}
					o.isBackwards ? (c.sibling = t.child, t.child = c) : (n = o.last, n === null ? t.child = c : n.sibling = c, o.last = c);
				}
				return o.tail === null ? (fc(t), null) : (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = I(), t.sibling = null, n = H.current, B(H, r ? n & 1 | 2 : n & 1), t);
			case 22:
			case 23: return Tl(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Kc & 1073741824 && (fc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : fc(t), null;
			case 24: return null;
			case 25: return null;
		}
		throw Error(a(156, t.tag));
	}
	function mc(e, t) {
		switch (Ta(t), t.tag) {
			case 1: return ta(t.type) && na(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return bo(), z(Qi), z(Zi), To(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 5: return So(t), null;
			case 13:
				if (z(H), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(a(340));
					Ia();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return z(H), null;
			case 4: return bo(), null;
			case 10: return Xa(t.type._context), null;
			case 22:
			case 23: return Tl(), null;
			case 24: return null;
			default: return null;
		}
	}
	var hc = !1, gc = !1, _c = typeof WeakSet == "function" ? WeakSet : Set, K = null;
	function vc(e, t) {
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
	function yc(e, t, n) {
		try {
			n();
		} catch (n) {
			$(e, t, n);
		}
	}
	var bc = !1;
	function xc(e, t) {
		if (Ti = _n, e = Rr(), zr(e)) {
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
		for (Ei = {
			focusedElem: e,
			selectionRange: n
		}, _n = !1, K = t; K !== null;) if (t = K, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, K = e;
		else for (; K !== null;) {
			t = K;
			try {
				var h = t.alternate;
				if (t.flags & 1024) switch (t.tag) {
					case 0:
					case 11:
					case 15: break;
					case 1:
						if (h !== null) {
							var g = h.memoizedProps, _ = h.memoizedState, v = t.stateNode;
							v.__reactInternalSnapshotBeforeUpdate = v.getSnapshotBeforeUpdate(t.elementType === t.type ? g : xs(t.type, g), _);
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
				e.return = t.return, K = e;
				break;
			}
			K = t.return;
		}
		return h = bc, bc = !1, h;
	}
	function Sc(e, t, n) {
		var r = t.updateQueue;
		if (r = r === null ? null : r.lastEffect, r !== null) {
			var i = r = r.next;
			do {
				if ((i.tag & e) === e) {
					var a = i.destroy;
					i.destroy = void 0, a !== void 0 && yc(t, n, a);
				}
				i = i.next;
			} while (i !== r);
		}
	}
	function Cc(e, t) {
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
	function wc(e) {
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
	function Tc(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, Tc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Li], delete t[Ri], delete t[Bi], delete t[Vi], delete t[Hi])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	function Ec(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 4;
	}
	function Dc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Ec(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Oc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = wi));
		else if (r !== 4 && (e = e.child, e !== null)) for (Oc(e, t, n), e = e.sibling; e !== null;) Oc(e, t, n), e = e.sibling;
	}
	function kc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (e = e.child, e !== null)) for (kc(e, t, n), e = e.sibling; e !== null;) kc(e, t, n), e = e.sibling;
	}
	var q = null, Ac = !1;
	function jc(e, t, n) {
		for (n = n.child; n !== null;) Mc(e, t, n), n = n.sibling;
	}
	function Mc(e, t, n) {
		if (Dt && typeof Dt.onCommitFiberUnmount == "function") try {
			Dt.onCommitFiberUnmount(Et, n);
		} catch {}
		switch (n.tag) {
			case 5: gc || vc(n, t);
			case 6:
				var r = q, i = Ac;
				q = null, jc(e, t, n), q = r, Ac = i, q !== null && (Ac ? (e = q, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : q.removeChild(n.stateNode));
				break;
			case 18:
				q !== null && (Ac ? (e = q, n = n.stateNode, e.nodeType === 8 ? Ni(e.parentNode, n) : e.nodeType === 1 && Ni(e, n), hn(e)) : Ni(q, n.stateNode));
				break;
			case 4:
				r = q, i = Ac, q = n.stateNode.containerInfo, Ac = !0, jc(e, t, n), q = r, Ac = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				if (!gc && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
					i = r = r.next;
					do {
						var a = i, o = a.destroy;
						a = a.tag, o !== void 0 && (a & 2 || a & 4) && yc(n, t, o), i = i.next;
					} while (i !== r);
				}
				jc(e, t, n);
				break;
			case 1:
				if (!gc && (vc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
					r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
				} catch (e) {
					$(n, t, e);
				}
				jc(e, t, n);
				break;
			case 21:
				jc(e, t, n);
				break;
			case 22:
				n.mode & 1 ? (gc = (r = gc) || n.memoizedState !== null, jc(e, t, n), gc = r) : jc(e, t, n);
				break;
			default: jc(e, t, n);
		}
	}
	function Nc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			e.updateQueue = null;
			var n = e.stateNode;
			n === null && (n = e.stateNode = new _c()), t.forEach(function(t) {
				var r = Hl.bind(null, e, t);
				n.has(t) || (n.add(t), t.then(r, r));
			});
		}
	}
	function Pc(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			try {
				var o = e, s = t, c = s;
				a: for (; c !== null;) {
					switch (c.tag) {
						case 5:
							q = c.stateNode, Ac = !1;
							break a;
						case 3:
							q = c.stateNode.containerInfo, Ac = !0;
							break a;
						case 4:
							q = c.stateNode.containerInfo, Ac = !0;
							break a;
					}
					c = c.return;
				}
				if (q === null) throw Error(a(160));
				Mc(o, s, i), q = null, Ac = !1;
				var l = i.alternate;
				l !== null && (l.return = null), i.return = null;
			} catch (e) {
				$(i, t, e);
			}
		}
		if (t.subtreeFlags & 12854) for (t = t.child; t !== null;) Fc(t, e), t = t.sibling;
	}
	function Fc(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (Pc(t, e), Ic(e), r & 4) {
					try {
						Sc(3, e, e.return), Cc(3, e);
					} catch (t) {
						$(e, e.return, t);
					}
					try {
						Sc(5, e, e.return);
					} catch (t) {
						$(e, e.return, t);
					}
				}
				break;
			case 1:
				Pc(t, e), Ic(e), r & 512 && n !== null && vc(n, n.return);
				break;
			case 5:
				if (Pc(t, e), Ic(e), r & 512 && n !== null && vc(n, n.return), e.flags & 32) {
					var i = e.stateNode;
					try {
						Ne(i, "");
					} catch (t) {
						$(e, e.return, t);
					}
				}
				if (r & 4 && (i = e.stateNode, i != null)) {
					var o = e.memoizedProps, s = n === null ? o : n.memoizedProps, c = e.type, l = e.updateQueue;
					if (e.updateQueue = null, l !== null) try {
						c === "input" && o.type === "radio" && o.name != null && ye(i, o), Be(c, s);
						var u = Be(c, o);
						for (s = 0; s < l.length; s += 2) {
							var d = l[s], f = l[s + 1];
							d === "style" ? Le(i, f) : d === "dangerouslySetInnerHTML" ? Me(i, f) : d === "children" ? Ne(i, f) : S(i, d, f, u);
						}
						switch (c) {
							case "input":
								be(i, o);
								break;
							case "textarea":
								De(i, o);
								break;
							case "select":
								var p = i._wrapperState.wasMultiple;
								i._wrapperState.wasMultiple = !!o.multiple;
								var m = o.value;
								m == null ? p !== !!o.multiple && (o.defaultValue == null ? we(i, !!o.multiple, o.multiple ? [] : "", !1) : we(i, !!o.multiple, o.defaultValue, !0)) : we(i, !!o.multiple, m, !1);
						}
						i[Ri] = o;
					} catch (t) {
						$(e, e.return, t);
					}
				}
				break;
			case 6:
				if (Pc(t, e), Ic(e), r & 4) {
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
				if (Pc(t, e), Ic(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					hn(t.containerInfo);
				} catch (t) {
					$(e, e.return, t);
				}
				break;
			case 4:
				Pc(t, e), Ic(e);
				break;
			case 13:
				Pc(t, e), Ic(e), i = e.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || (el = I())), r & 4 && Nc(e);
				break;
			case 22:
				if (d = n !== null && n.memoizedState !== null, e.mode & 1 ? (gc = (u = gc) || d, Pc(t, e), gc = u) : Pc(t, e), Ic(e), r & 8192) {
					if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !d && e.mode & 1) for (K = e, d = e.child; d !== null;) {
						for (f = K = d; K !== null;) {
							switch (p = K, m = p.child, p.tag) {
								case 0:
								case 11:
								case 14:
								case 15:
									Sc(4, p, p.return);
									break;
								case 1:
									vc(p, p.return);
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
									vc(p, p.return);
									break;
								case 22: if (p.memoizedState !== null) {
									Bc(f);
									continue;
								}
							}
							m === null ? Bc(f) : (m.return = p, K = m);
						}
						d = d.sibling;
					}
					a: for (d = null, f = e;;) {
						if (f.tag === 5) {
							if (d === null) {
								d = f;
								try {
									i = f.stateNode, u ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (c = f.stateNode, l = f.memoizedProps.style, s = l != null && l.hasOwnProperty("display") ? l.display : null, c.style.display = Ie("display", s));
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
				Pc(t, e), Ic(e), r & 4 && Nc(e);
				break;
			case 21: break;
			default: Pc(t, e), Ic(e);
		}
	}
	function Ic(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				a: {
					for (var n = e.return; n !== null;) {
						if (Ec(n)) {
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
						r.flags & 32 && (Ne(i, ""), r.flags &= -33), kc(e, Dc(e), i);
						break;
					case 3:
					case 4:
						var o = r.stateNode.containerInfo;
						Oc(e, Dc(e), o);
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
	function Lc(e, t, n) {
		K = e, Rc(e, t, n);
	}
	function Rc(e, t, n) {
		for (var r = !!(e.mode & 1); K !== null;) {
			var i = K, a = i.child;
			if (i.tag === 22 && r) {
				var o = i.memoizedState !== null || hc;
				if (!o) {
					var s = i.alternate, c = s !== null && s.memoizedState !== null || gc;
					s = hc;
					var l = gc;
					if (hc = o, (gc = c) && !l) for (K = i; K !== null;) o = K, c = o.child, o.tag === 22 && o.memoizedState !== null || c === null ? Vc(i) : (c.return = o, K = c);
					for (; a !== null;) K = a, Rc(a, t, n), a = a.sibling;
					K = i, hc = s, gc = l;
				}
				zc(e, t, n);
			} else i.subtreeFlags & 8772 && a !== null ? (a.return = i, K = a) : zc(e, t, n);
		}
	}
	function zc(e) {
		for (; K !== null;) {
			var t = K;
			if (t.flags & 8772) {
				var n = t.alternate;
				try {
					if (t.flags & 8772) switch (t.tag) {
						case 0:
						case 11:
						case 15:
							gc || Cc(5, t);
							break;
						case 1:
							var r = t.stateNode;
							if (t.flags & 4 && !gc) {
								if (n === null) r.componentDidMount();
								else {
									var i = t.elementType === t.type ? n.memoizedProps : xs(t.type, n.memoizedProps);
									r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
								}
							}
							var o = t.updateQueue;
							o !== null && po(t, o, r);
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
								po(t, s, n);
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
										f !== null && hn(f);
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
					gc || t.flags & 512 && wc(t);
				} catch (e) {
					$(t, t.return, e);
				}
			}
			if (t === e) {
				K = null;
				break;
			}
			if (n = t.sibling, n !== null) {
				n.return = t.return, K = n;
				break;
			}
			K = t.return;
		}
	}
	function Bc(e) {
		for (; K !== null;) {
			var t = K;
			if (t === e) {
				K = null;
				break;
			}
			var n = t.sibling;
			if (n !== null) {
				n.return = t.return, K = n;
				break;
			}
			K = t.return;
		}
	}
	function Vc(e) {
		for (; K !== null;) {
			var t = K;
			try {
				switch (t.tag) {
					case 0:
					case 11:
					case 15:
						var n = t.return;
						try {
							Cc(4, t);
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
							wc(t);
						} catch (e) {
							$(t, a, e);
						}
						break;
					case 5:
						var o = t.return;
						try {
							wc(t);
						} catch (e) {
							$(t, o, e);
						}
				}
			} catch (e) {
				$(t, t.return, e);
			}
			if (t === e) {
				K = null;
				break;
			}
			var s = t.sibling;
			if (s !== null) {
				s.return = t.return, K = s;
				break;
			}
			K = t.return;
		}
	}
	var Hc = Math.ceil, Uc = C.ReactCurrentDispatcher, Wc = C.ReactCurrentOwner, Gc = C.ReactCurrentBatchConfig, J = 0, Y = null, X = null, Z = 0, Kc = 0, qc = Yi(0), Q = 0, Jc = null, Yc = 0, Xc = 0, Zc = 0, Qc = null, $c = null, el = 0, tl = Infinity, nl = null, rl = !1, il = null, al = null, ol = !1, sl = null, cl = 0, ll = 0, ul = null, dl = -1, fl = 0;
	function pl() {
		return J & 6 ? I() : dl === -1 ? dl = I() : dl;
	}
	function ml(e) {
		return e.mode & 1 ? J & 2 && Z !== 0 ? Z & -Z : Ra.transition === null ? (e = L, e === 0 && (e = window.event, e = e === void 0 ? 16 : Cn(e.type)), e) : (fl === 0 && (fl = Bt()), fl) : 1;
	}
	function hl(e, t, n, r) {
		if (50 < ll) throw ll = 0, ul = null, Error(a(185));
		Ht(e, n, r), J & 2 && e === Y || (e === Y && (!(J & 2) && (Xc |= n), Q === 4 && xl(e, Z)), gl(e, r), n === 1 && J === 0 && !(t.mode & 1) && (tl = I() + 500, ca && fa()));
	}
	function gl(e, t) {
		var n = e.callbackNode;
		Rt(e, t);
		var r = It(e, e === Y ? Z : 0);
		if (r === 0) n !== null && _t(n), e.callbackNode = null, e.callbackPriority = 0;
		else if (t = r & -r, e.callbackPriority !== t) {
			if (n != null && _t(n), t === 1) e.tag === 0 ? da(Sl.bind(null, e)) : ua(Sl.bind(null, e)), ji(function() {
				!(J & 6) && fa();
			}), n = null;
			else {
				switch (Gt(r)) {
					case 1:
						n = xt;
						break;
					case 4:
						n = St;
						break;
					case 16:
						n = Ct;
						break;
					case 536870912:
						n = Tt;
						break;
					default: n = Ct;
				}
				n = Wl(n, _l.bind(null, e));
			}
			e.callbackPriority = t, e.callbackNode = n;
		}
	}
	function _l(e, t) {
		if (dl = -1, fl = 0, J & 6) throw Error(a(327));
		var n = e.callbackNode;
		if (Ll() && e.callbackNode !== n) return null;
		var r = It(e, e === Y ? Z : 0);
		if (r === 0) return null;
		if (r & 30 || (r & e.expiredLanes) !== 0 || t) t = Al(e, r);
		else {
			t = r;
			var i = J;
			J |= 2;
			var o = Ol();
			(Y !== e || Z !== t) && (nl = null, tl = I() + 500, El(e, t));
			do
				try {
					Ml();
					break;
				} catch (t) {
					Dl(e, t);
				}
			while (1);
			Ya(), Uc.current = o, J = i, X === null ? (Y = null, Z = 0, t = Q) : t = 0;
		}
		if (t !== 0) {
			if (t === 2 && (i = zt(e), i !== 0 && (r = i, t = vl(e, i))), t === 1) throw n = Jc, El(e, 0), xl(e, r), gl(e, I()), n;
			if (t === 6) xl(e, r);
			else {
				if (i = e.current.alternate, !(r & 30) && !bl(i) && (t = Al(e, r), t === 2 && (o = zt(e), o !== 0 && (r = o, t = vl(e, o))), t === 1)) throw n = Jc, El(e, 0), xl(e, r), gl(e, I()), n;
				switch (e.finishedWork = i, e.finishedLanes = r, t) {
					case 0:
					case 1: throw Error(a(345));
					case 2:
						Fl(e, $c, nl);
						break;
					case 3:
						if (xl(e, r), (r & 130023424) === r && (t = el + 500 - I(), 10 < t)) {
							if (It(e, 0) !== 0) break;
							if (i = e.suspendedLanes, (i & r) !== r) {
								pl(), e.pingedLanes |= e.suspendedLanes & i;
								break;
							}
							e.timeoutHandle = Oi(Fl.bind(null, e, $c, nl), t);
							break;
						}
						Fl(e, $c, nl);
						break;
					case 4:
						if (xl(e, r), (r & 4194240) === r) break;
						for (t = e.eventTimes, i = -1; 0 < r;) {
							var s = 31 - kt(r);
							o = 1 << s, s = t[s], s > i && (i = s), r &= ~o;
						}
						if (r = i, r = I() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Hc(r / 1960)) - r, 10 < r) {
							e.timeoutHandle = Oi(Fl.bind(null, e, $c, nl), r);
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
		return gl(e, I()), e.callbackNode === n ? _l.bind(null, e) : null;
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
						if (!Nr(a(), i)) return !1;
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
			var n = 31 - kt(t), r = 1 << n;
			e[n] = -1, t &= ~r;
		}
	}
	function Sl(e) {
		if (J & 6) throw Error(a(327));
		Ll();
		var t = It(e, 0);
		if (!(t & 1)) return gl(e, I()), null;
		var n = Al(e, t);
		if (e.tag !== 0 && n === 2) {
			var r = zt(e);
			r !== 0 && (t = r, n = vl(e, r));
		}
		if (n === 1) throw n = Jc, El(e, 0), xl(e, t), gl(e, I()), n;
		if (n === 6) throw Error(a(345));
		return e.finishedWork = e.current.alternate, e.finishedLanes = t, Fl(e, $c, nl), gl(e, I()), null;
	}
	function Cl(e, t) {
		var n = J;
		J |= 1;
		try {
			return e(t);
		} finally {
			J = n, J === 0 && (tl = I() + 500, ca && fa());
		}
	}
	function wl(e) {
		sl !== null && sl.tag === 0 && !(J & 6) && Ll();
		var t = J;
		J |= 1;
		var n = Gc.transition, r = L;
		try {
			if (Gc.transition = null, L = 1, e) return e();
		} finally {
			L = r, Gc.transition = n, J = t, !(J & 6) && fa();
		}
	}
	function Tl() {
		Kc = qc.current, z(qc);
	}
	function El(e, t) {
		e.finishedWork = null, e.finishedLanes = 0;
		var n = e.timeoutHandle;
		if (n !== -1 && (e.timeoutHandle = -1, ki(n)), X !== null) for (n = X.return; n !== null;) {
			var r = n;
			switch (Ta(r), r.tag) {
				case 1:
					r = r.type.childContextTypes, r != null && na();
					break;
				case 3:
					bo(), z(Qi), z(Zi), To();
					break;
				case 5:
					So(r);
					break;
				case 4:
					bo();
					break;
				case 13:
					z(H);
					break;
				case 19:
					z(H);
					break;
				case 10:
					Xa(r.type._context);
					break;
				case 22:
				case 23: Tl();
			}
			n = n.return;
		}
		if (Y = e, X = e = Yl(e.current, null), Z = Kc = t, Q = 0, Jc = null, Zc = Xc = Yc = 0, $c = Qc = null, eo !== null) {
			for (t = 0; t < eo.length; t++) if (n = eo[t], r = n.interleaved, r !== null) {
				n.interleaved = null;
				var i = r.next, a = n.pending;
				if (a !== null) {
					var o = a.next;
					a.next = i, r.next = o;
				}
				n.pending = r;
			}
			eo = null;
		}
		return e;
	}
	function Dl(e, t) {
		do {
			var n = X;
			try {
				if (Ya(), Eo.current = _s, ko) {
					for (var r = U.memoizedState; r !== null;) {
						var i = r.queue;
						i !== null && (i.pending = null), r = r.next;
					}
					ko = !1;
				}
				if (Oo = 0, G = W = U = null, Ao = !1, jo = 0, Wc.current = null, n === null || n.return === null) {
					Q = 1, Jc = t, X = null;
					break;
				}
				a: {
					var o = e, s = n.return, c = n, l = t;
					if (t = Z, c.flags |= 32768, typeof l == "object" && l && typeof l.then == "function") {
						var u = l, d = c, f = d.tag;
						if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
							var p = d.alternate;
							p ? (d.updateQueue = p.updateQueue, d.memoizedState = p.memoizedState, d.lanes = p.lanes) : (d.updateQueue = null, d.memoizedState = null);
						}
						var m = Fs(s);
						if (m !== null) {
							m.flags &= -257, Is(m, s, c, o, t), m.mode & 1 && Ps(o, u, t), t = m, l = u;
							var h = t.updateQueue;
							if (h === null) {
								var g = /* @__PURE__ */ new Set();
								g.add(l), t.updateQueue = g;
							} else h.add(l);
							break a;
						}
						if (!(t & 1)) {
							Ps(o, u, t), kl();
							break a;
						}
						l = Error(a(426));
					} else if (V && c.mode & 1) {
						var _ = Fs(s);
						if (_ !== null) {
							!(_.flags & 65536) && (_.flags |= 256), Is(_, s, c, o, t), La(Os(l, c));
							break a;
						}
					}
					o = l = Os(l, c), Q !== 4 && (Q = 2), Qc === null ? Qc = [o] : Qc.push(o), o = s;
					do {
						switch (o.tag) {
							case 3:
								o.flags |= 65536, t &= -t, o.lanes |= t;
								var v = Ms(o, l, t);
								uo(o, v);
								break a;
							case 1:
								c = l;
								var y = o.type, b = o.stateNode;
								if (!(o.flags & 128) && (typeof y.getDerivedStateFromError == "function" || b !== null && typeof b.componentDidCatch == "function" && (al === null || !al.has(b)))) {
									o.flags |= 65536, t &= -t, o.lanes |= t;
									var x = Ns(o, c, t);
									uo(o, x);
									break a;
								}
						}
						o = o.return;
					} while (o !== null);
				}
				Pl(n);
			} catch (e) {
				t = e, X === n && n !== null && (X = n = n.return);
				continue;
			}
			break;
		} while (1);
	}
	function Ol() {
		var e = Uc.current;
		return Uc.current = _s, e === null ? _s : e;
	}
	function kl() {
		(Q === 0 || Q === 3 || Q === 2) && (Q = 4), Y === null || !(Yc & 268435455) && !(Xc & 268435455) || xl(Y, Z);
	}
	function Al(e, t) {
		var n = J;
		J |= 2;
		var r = Ol();
		(Y !== e || Z !== t) && (nl = null, El(e, t));
		do
			try {
				jl();
				break;
			} catch (t) {
				Dl(e, t);
			}
		while (1);
		if (Ya(), J = n, Uc.current = r, X !== null) throw Error(a(261));
		return Y = null, Z = 0, Q;
	}
	function jl() {
		for (; X !== null;) Nl(X);
	}
	function Ml() {
		for (; X !== null && !vt();) Nl(X);
	}
	function Nl(e) {
		var t = Ul(e.alternate, e, Kc);
		e.memoizedProps = e.pendingProps, t === null ? Pl(e) : X = t, Wc.current = null;
	}
	function Pl(e) {
		var t = e;
		do {
			var n = t.alternate;
			if (e = t.return, t.flags & 32768) {
				if (n = mc(n, t), n !== null) {
					n.flags &= 32767, X = n;
					return;
				}
				if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
				else {
					Q = 6, X = null;
					return;
				}
			} else if (n = pc(n, t, Kc), n !== null) {
				X = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				X = t;
				return;
			}
			X = t = e;
		} while (t !== null);
		Q === 0 && (Q = 5);
	}
	function Fl(e, t, n) {
		var r = L, i = Gc.transition;
		try {
			Gc.transition = null, L = 1, Il(e, t, n, r);
		} finally {
			Gc.transition = i, L = r;
		}
		return null;
	}
	function Il(e, t, n, r) {
		do
			Ll();
		while (sl !== null);
		if (J & 6) throw Error(a(327));
		n = e.finishedWork;
		var i = e.finishedLanes;
		if (n === null) return null;
		if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(a(177));
		e.callbackNode = null, e.callbackPriority = 0;
		var o = n.lanes | n.childLanes;
		if (Ut(e, o), e === Y && (X = Y = null, Z = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || ol || (ol = !0, Wl(Ct, function() {
			return Ll(), null;
		})), o = !!(n.flags & 15990), n.subtreeFlags & 15990 || o) {
			o = Gc.transition, Gc.transition = null;
			var s = L;
			L = 1;
			var c = J;
			J |= 4, Wc.current = null, xc(e, n), Fc(n, e), Br(Ei), _n = !!Ti, Ei = Ti = null, e.current = n, Lc(n, e, i), yt(), J = c, L = s, Gc.transition = o;
		} else e.current = n;
		if (ol && (ol = !1, sl = e, cl = i), o = e.pendingLanes, o === 0 && (al = null), Ot(n.stateNode, r), gl(e, I()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) i = t[n], r(i.value, {
			componentStack: i.stack,
			digest: i.digest
		});
		if (rl) throw rl = !1, e = il, il = null, e;
		return cl & 1 && e.tag !== 0 && Ll(), o = e.pendingLanes, o & 1 ? e === ul ? ll++ : (ll = 0, ul = e) : ll = 0, fa(), null;
	}
	function Ll() {
		if (sl !== null) {
			var e = Gt(cl), t = Gc.transition, n = L;
			try {
				if (Gc.transition = null, L = 16 > e ? 16 : e, sl === null) var r = !1;
				else {
					if (e = sl, sl = null, cl = 0, J & 6) throw Error(a(331));
					var i = J;
					for (J |= 4, K = e.current; K !== null;) {
						var o = K, s = o.child;
						if (K.flags & 16) {
							var c = o.deletions;
							if (c !== null) {
								for (var l = 0; l < c.length; l++) {
									var u = c[l];
									for (K = u; K !== null;) {
										var d = K;
										switch (d.tag) {
											case 0:
											case 11:
											case 15: Sc(8, d, o);
										}
										var f = d.child;
										if (f !== null) f.return = d, K = f;
										else for (; K !== null;) {
											d = K;
											var p = d.sibling, m = d.return;
											if (Tc(d), d === u) {
												K = null;
												break;
											}
											if (p !== null) {
												p.return = m, K = p;
												break;
											}
											K = m;
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
								K = o;
							}
						}
						if (o.subtreeFlags & 2064 && s !== null) s.return = o, K = s;
						else b: for (; K !== null;) {
							if (o = K, o.flags & 2048) switch (o.tag) {
								case 0:
								case 11:
								case 15: Sc(9, o, o.return);
							}
							var v = o.sibling;
							if (v !== null) {
								v.return = o.return, K = v;
								break b;
							}
							K = o.return;
						}
					}
					var y = e.current;
					for (K = y; K !== null;) {
						s = K;
						var b = s.child;
						if (s.subtreeFlags & 2064 && b !== null) b.return = s, K = b;
						else b: for (s = y; K !== null;) {
							if (c = K, c.flags & 2048) try {
								switch (c.tag) {
									case 0:
									case 11:
									case 15: Cc(9, c);
								}
							} catch (e) {
								$(c, c.return, e);
							}
							if (c === s) {
								K = null;
								break b;
							}
							var x = c.sibling;
							if (x !== null) {
								x.return = c.return, K = x;
								break b;
							}
							K = c.return;
						}
					}
					if (J = i, fa(), Dt && typeof Dt.onPostCommitFiberRoot == "function") try {
						Dt.onPostCommitFiberRoot(Et, e);
					} catch {}
					r = !0;
				}
				return r;
			} finally {
				L = n, Gc.transition = t;
			}
		}
		return !1;
	}
	function Rl(e, t, n) {
		t = Os(n, t), t = Ms(e, t, 1), e = co(e, t, 1), t = pl(), e !== null && (Ht(e, 1, t), gl(e, t));
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
					e = Os(n, e), e = Ns(t, e, 1), t = co(t, e, 1), e = pl(), t !== null && (Ht(t, 1, e), gl(t, e));
					break;
				}
			}
			t = t.return;
		}
	}
	function zl(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), t = pl(), e.pingedLanes |= e.suspendedLanes & n, Y === e && (Z & n) === n && (Q === 4 || Q === 3 && (Z & 130023424) === Z && 500 > I() - el ? El(e, 0) : Zc |= n), gl(e, t);
	}
	function Bl(e, t) {
		t === 0 && (e.mode & 1 ? (t = Pt, Pt <<= 1, !(Pt & 130023424) && (Pt = 4194304)) : t = 1);
		var n = pl();
		e = ro(e, t), e !== null && (Ht(e, t, n), gl(e, n));
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
			if (e.memoizedProps !== t.pendingProps || Qi.current) Rs = !0;
			else {
				if ((e.lanes & n) === 0 && !(t.flags & 128)) return Rs = !1, sc(e, t, n);
				Rs = !!(e.flags & 131072);
			}
		} else Rs = !1, V && t.flags & 1048576 && Ca(t, ga, t.index);
		switch (t.lanes = 0, t.tag) {
			case 2:
				var r = t.type;
				ac(e, t), e = t.pendingProps;
				var i = ea(t, Zi.current);
				Qa(t, n), i = Fo(null, t, r, e, i, n);
				var o = Io();
				return t.flags |= 1, typeof i == "object" && i && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ta(r) ? (o = !0, aa(t)) : o = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, ao(t), i.updater = Cs, t.stateNode = i, i._reactInternals = t, Ds(t, r, e, n), t = qs(null, t, r, !0, o, n)) : (t.tag = 0, V && o && wa(t), zs(null, t, i, n), t = t.child), t;
			case 16:
				r = t.elementType;
				a: {
					switch (ac(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = Jl(r), e = xs(r, e), i) {
						case 0:
							t = Gs(null, t, r, e, n);
							break a;
						case 1:
							t = Ks(null, t, r, e, n);
							break a;
						case 11:
							t = Bs(null, t, r, e, n);
							break a;
						case 14:
							t = Vs(null, t, r, xs(r.type, e), n);
							break a;
					}
					throw Error(a(306, r, ""));
				}
				return t;
			case 0: return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : xs(r, i), Gs(e, t, r, i, n);
			case 1: return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : xs(r, i), Ks(e, t, r, i, n);
			case 3:
				a: {
					if (Js(t), e === null) throw Error(a(387));
					r = t.pendingProps, o = t.memoizedState, i = o.element, oo(e, t), fo(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache,
							pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
							transitions: s.transitions
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							i = Os(Error(a(423)), t), t = Ys(e, t, r, n, i);
							break a;
						}
						if (r !== i) {
							i = Os(Error(a(424)), t), t = Ys(e, t, r, n, i);
							break a;
						}
						for (Da = Pi(t.stateNode.containerInfo.firstChild), Ea = t, V = !0, Oa = null, n = Wa(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					} else {
						if (Ia(), r === i) {
							t = oc(e, t, n);
							break a;
						}
						zs(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 5: return xo(t), e === null && Ma(t), r = t.type, i = t.pendingProps, o = e === null ? null : e.memoizedProps, s = i.children, Di(r, i) ? s = null : o !== null && Di(r, o) && (t.flags |= 32), Ws(e, t), zs(e, t, s, n), t.child;
			case 6: return e === null && Ma(t), null;
			case 13: return Qs(e, t, n);
			case 4: return yo(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ua(t, null, r, n) : zs(e, t, r, n), t.child;
			case 11: return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : xs(r, i), Bs(e, t, r, i, n);
			case 7: return zs(e, t, t.pendingProps, n), t.child;
			case 8: return zs(e, t, t.pendingProps.children, n), t.child;
			case 12: return zs(e, t, t.pendingProps.children, n), t.child;
			case 10:
				a: {
					if (r = t.type._context, i = t.pendingProps, o = t.memoizedProps, s = i.value, B(Ga, r._currentValue), r._currentValue = s, o !== null) {
						if (Nr(o.value, s)) {
							if (o.children === i.children && !Qi.current) {
								t = oc(e, t, n);
								break a;
							}
						} else for (o = t.child, o !== null && (o.return = t); o !== null;) {
							var c = o.dependencies;
							if (c !== null) {
								s = o.child;
								for (var l = c.firstContext; l !== null;) {
									if (l.context === r) {
										if (o.tag === 1) {
											l = so(-1, n & -n), l.tag = 2;
											var u = o.updateQueue;
											if (u !== null) {
												u = u.shared;
												var d = u.pending;
												d === null ? l.next = l : (l.next = d.next, d.next = l), u.pending = l;
											}
										}
										o.lanes |= n, l = o.alternate, l !== null && (l.lanes |= n), Za(o.return, n, t), c.lanes |= n;
										break;
									}
									l = l.next;
								}
							} else if (o.tag === 10) s = o.type === t.type ? null : o.child;
							else if (o.tag === 18) {
								if (s = o.return, s === null) throw Error(a(341));
								s.lanes |= n, c = s.alternate, c !== null && (c.lanes |= n), Za(s, n, t), s = o.sibling;
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
					zs(e, t, i.children, n), t = t.child;
				}
				return t;
			case 9: return i = t.type, r = t.pendingProps.children, Qa(t, n), i = $a(i), r = r(i), t.flags |= 1, zs(e, t, r, n), t.child;
			case 14: return r = t.type, i = xs(r, t.pendingProps), i = xs(r.type, i), Vs(e, t, r, i, n);
			case 15: return Hs(e, t, t.type, t.pendingProps, n);
			case 17: return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : xs(r, i), ac(e, t), t.tag = 1, ta(r) ? (e = !0, aa(t)) : e = !1, Qa(t, n), Ts(t, r, i), Ds(t, r, i, n), qs(null, t, r, !0, e, n);
			case 19: return ic(e, t, n);
			case 22: return Us(e, t, n);
		}
		throw Error(a(156, t.tag));
	};
	function Wl(e, t) {
		return gt(e, t);
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
			if (e = e.$$typeof, e === te) return 11;
			if (e === M) return 14;
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
			case A: return e = Kl(13, n, t, i), e.elementType = A, e.lanes = o, e;
			case j: return e = Kl(19, n, t, i), e.elementType = j, e.lanes = o, e;
			case ne: return Ql(n, i, o, t);
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case k:
						s = 10;
						break a;
					case ee:
						s = 9;
						break a;
					case te:
						s = 11;
						break a;
					case M:
						s = 14;
						break a;
					case N:
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
		return e = Kl(22, e, r, t), e.elementType = ne, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
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
		this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Vt(0), this.expirationTimes = Vt(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Vt(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
	}
	function nu(e, t, n, r, i, a, o, s, c) {
		return e = new tu(e, t, n, s, c), t === 1 ? (t = 1, !0 === a && (t |= 8)) : t = 0, a = Kl(3, null, null, t), e.current = a, a.stateNode = e, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: null,
			transitions: null,
			pendingSuspenseBoundaries: null
		}, ao(a), e;
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
		if (!e) return Xi;
		e = e._reactInternals;
		a: {
			if (ut(e) !== e || e.tag !== 1) throw Error(a(170));
			var t = e;
			do {
				switch (t.tag) {
					case 3:
						t = t.stateNode.context;
						break a;
					case 1: if (ta(t.type)) {
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
			if (ta(n)) return ia(e, n, t);
		}
		return t;
	}
	function au(e, t, n, r, i, a, o, s, c) {
		return e = nu(n, r, !0, e, i, a, o, s, c), e.context = iu(null), n = e.current, r = pl(), i = ml(n), a = so(r, i), a.callback = t ?? null, co(n, a, i), e.current.lanes = i, Ht(e, i, r), gl(e, r), e;
	}
	function ou(e, t, n, r) {
		var i = t.current, a = pl(), o = ml(i);
		return n = iu(n), t.context === null ? t.context = n : t.pendingContext = n, t = so(a, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = co(i, t, o), e !== null && (hl(e, i, o, a), lo(e, i, o)), o;
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
			}), t[zi] = null;
		}
	};
	function pu(e) {
		this._internalRoot = e;
	}
	pu.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Yt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < an.length && t !== 0 && t < an[n].priority; n++);
			an.splice(n, 0, e), n === 0 && un(e);
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
			return e._reactRootContainer = o, e[zi] = o.current, pi(e.nodeType === 8 ? e.parentNode : e), wl(), o;
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
		return e._reactRootContainer = c, e[zi] = c.current, pi(e.nodeType === 8 ? e.parentNode : e), wl(function() {
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
	Kt = function(e) {
		switch (e.tag) {
			case 3:
				var t = e.stateNode;
				if (t.current.memoizedState.isDehydrated) {
					var n = Ft(t.pendingLanes);
					n !== 0 && (Wt(t, n | 1), gl(t, I()), !(J & 6) && (tl = I() + 500, fa()));
				}
				break;
			case 13: wl(function() {
				var t = ro(e, 1);
				t !== null && hl(t, e, 1, pl());
			}), lu(e, 1);
		}
	}, qt = function(e) {
		if (e.tag === 13) {
			var t = ro(e, 134217728);
			t !== null && hl(t, e, 134217728, pl()), lu(e, 134217728);
		}
	}, Jt = function(e) {
		if (e.tag === 13) {
			var t = ml(e), n = ro(e, t);
			n !== null && hl(n, e, t, pl()), lu(e, t);
		}
	}, Yt = function() {
		return L;
	}, Xt = function(e, t) {
		var n = L;
		try {
			return L = e, t();
		} finally {
			L = n;
		}
	}, Ue = function(e, t, n) {
		switch (t) {
			case "input":
				if (be(e, n), t = n.name, n.type === "radio" && t != null) {
					for (n = e; n.parentNode;) n = n.parentNode;
					for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + "][type=\"radio\"]"), t = 0; t < n.length; t++) {
						var r = n[t];
						if (r !== e && r.form === e.form) {
							var i = Ki(r);
							if (!i) throw Error(a(90));
							ge(r), be(r, i);
						}
					}
				}
				break;
			case "textarea":
				De(e, n);
				break;
			case "select": t = n.value, t != null && we(e, !!n.multiple, t, !1);
		}
	}, Ye = Cl, Xe = wl;
	var yu = {
		usingClientEntryPoint: !1,
		Events: [
			Wi,
			Gi,
			Ki,
			qe,
			Je,
			Cl
		]
	}, bu = {
		findFiberByHostInstance: Ui,
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
			return e = mt(e), e === null ? null : e.stateNode;
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
			Et = Su.inject(xu), Dt = Su;
		} catch {}
	}
	e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = yu, e.createPortal = function(e, t) {
		var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!mu(t)) throw Error(a(200));
		return ru(e, t, null, n);
	}, e.createRoot = function(e, t) {
		if (!mu(e)) throw Error(a(299));
		var n = !1, r = "", i = du;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = nu(e, 1, !1, null, null, n, !1, r, i), e[zi] = t.current, pi(e.nodeType === 8 ? e.parentNode : e), new fu(t);
	}, e.findDOMNode = function(e) {
		if (e == null) return null;
		if (e.nodeType === 1) return e;
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(a(188)) : (e = Object.keys(e).join(","), Error(a(268, e)));
		return e = mt(t), e = e === null ? null : e.stateNode, e;
	}, e.flushSync = function(e) {
		return wl(e);
	}, e.hydrate = function(e, t, n) {
		if (!hu(t)) throw Error(a(200));
		return vu(null, e, t, !0, n);
	}, e.hydrateRoot = function(e, t, n) {
		if (!mu(e)) throw Error(a(405));
		var r = n != null && n.hydratedSources || null, i = !1, o = "", s = du;
		if (n != null && (!0 === n.unstable_strictMode && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = au(t, null, e, 1, n ?? null, i, !1, o, s), e[zi] = t.current, pi(e), r) for (e = 0; e < r.length; e++) n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(n, i);
		return new pu(t);
	}, e.render = function(e, t, n) {
		if (!hu(t)) throw Error(a(200));
		return vu(null, e, t, !1, n);
	}, e.unmountComponentAtNode = function(e) {
		if (!hu(e)) throw Error(a(40));
		return e._reactRootContainer ? (wl(function() {
			vu(null, null, e, !1, function() {
				e._reactRootContainer = null, e[zi] = null;
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
function ee({ hasHeat: e, hasWater: t, frost: n, limits: r, busy: i, onGo: a, onClose: o }) {
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
var te = [
	30,
	60,
	120,
	180
];
function A({ getHass: e, devices: t, status: n, limits: r, onOpenDevice: i, onOpenRoom: a }) {
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
			/* @__PURE__ */ (0, f.jsx)(j, {
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
				children: [d.filter(({ c: e }) => c === "all" || c === e).map(({ d: t, c: a }) => /* @__PURE__ */ (0, f.jsx)(ne, {
					getHass: e,
					device: t,
					channel: a,
					info: n[t.entry_id]?.[a],
					showDevice: m,
					limits: r,
					onOpen: () => i(t.entry_id, a)
				}, `${t.entry_id}-${a}`)), (c === "all" || c === "rooms") && o.map((i) => {
					let o = n[i.receiver ?? t[0]?.entry_id ?? ""]?.heat;
					return /* @__PURE__ */ (0, f.jsx)(N, {
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
function j({ getHass: e, devices: t, status: n, limits: r }) {
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
		c && /* @__PURE__ */ (0, f.jsx)(ee, {
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
var M = [
	30,
	60,
	120,
	180
];
function N({ getHass: e, room: t, showReceiver: n, limits: r, defaultMinutes: i, defaultTemp: a, onOpen: o, page: s }) {
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
	}, v = t.boost ?? null, y = v ? `${v.temperature}°` : t.target == null ? t.target_range ? `${t.target_range[0]}–${t.target_range[1]}°` : null : `${t.target}°`, x = v ? `Boost · ${D(v.remaining)} left` : `${t.valves.length} valve${t.valves.length === 1 ? "" : "s"}`, S = (e) => Math.min(r?.heat_max ?? 32, Math.max(5, Math.round(e * 2) / 2)), C = Math.min(360, Math.max(15, i)), w = [.../* @__PURE__ */ new Set([...M, C])].sort((e, t) => e - t);
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
			c && /* @__PURE__ */ (0, f.jsx)(re, {
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
function ne({ getHass: e, device: t, channel: n, info: r, showDevice: i, limits: a, onOpen: o, page: s = !1 }) {
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
	], C = r?.boost_minutes ?? 30, w = r?.boost_temperature ?? 21, [O, k] = (0, u.useState)(!1), ee = a?.boost_min_temp ?? 5, A = a?.heat_max ?? 32, j = (e) => Math.min(A, Math.max(ee, Math.round(e * 2) / 2)), M = [.../* @__PURE__ */ new Set([...te, C])].filter((e) => e <= (a?.boost_max_minutes ?? 360)).sort((e, t) => e - t), [N, ne] = (0, u.useState)(null), ie = (0, u.useRef)();
	(0, u.useEffect)(() => () => window.clearTimeout(ie.current), []), (0, u.useEffect)(() => ne(null), [l?.setpoint, l?.mode]);
	let P = !c && !!l && l.mode !== "off", ae = (e) => {
		let t = j((N ?? b ?? 20) + e);
		ne(t), window.clearTimeout(ie.current), ie.current = window.setTimeout(() => {
			h({
				type: "hive_local/target",
				temperature: t
			}, `Set to ${t}°`).then(() => window.setTimeout(() => ne(null), 8e3));
		}, 1200);
	}, oe = N ?? b, se = (e, t) => h({
		type: "hive_local/boost",
		minutes: e,
		...c ? {} : { temperature: t }
	}, `Boosting for ${D(e)}`).then(() => k(!1)), ce = !!r?.holiday?.holding, le = l ? ce ? "Away at" : l.mode === "boost" ? "Boost to" : y && N == null ? "Frost" : l.mode === "manual" ? "Hold at" : "Target" : "", ue = l?.mode === "boost" && !ce, de = ue ? r?.preheat?.active_for ?? null : null, fe = de != null, pe = ue && !fe && r?.demand?.active ? E(r.demand.rooms) : null, me = "Waiting for the receiver…";
	l && (me = l.mode === "off" ? "Off" : ue ? c ? /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: ["Boosting ", /* @__PURE__ */ (0, f.jsx)(p, {
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
	] })), l && fe && (me = /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
		"Pre-heating to ",
		/* @__PURE__ */ (0, f.jsxs)("b", { children: [l.setpoint, "°"] }),
		" ",
		/* @__PURE__ */ (0, f.jsx)(p, {
			name: "sun-clock",
			className: "status-icon"
		})
	] })), l && pe && (me = /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: ["Heating for rooms ", /* @__PURE__ */ (0, f.jsx)(p, {
		name: "home-thermometer-outline",
		className: "status-icon"
	})] }));
	let he = r?.holiday ?? null, ge = he ? `Away until ${T(he.until)}` : null;
	l && he && !ue && !g && (me = c ? /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: ["Off while away ", /* @__PURE__ */ (0, f.jsx)(p, {
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
	let F = l ? ge && !ue ? ge : fe ? `Pre-heating for ${r?.preheat?.active_for}` : pe ? `Heating for ${pe}` : l.mode === "boost" ? l.boost_remaining == null ? "Boost" : `Boost · ${D(l.boost_remaining)} left` : l.mode === "schedule" ? "On schedule" : S.find((e) => e.id === l.mode)?.label : "", _e = s;
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
								children: i ? `${t.name} · ${F}` : F
							})]
						}),
						/* @__PURE__ */ (0, f.jsx)("span", {
							className: "device-status",
							children: me
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
						className: `device-action ${ue ? "boosting" : ""}`,
						disabled: d || !l,
						onClick: (e) => {
							e.stopPropagation(), k(!0);
						},
						children: [
							/* @__PURE__ */ (0, f.jsx)(p, { name: fe ? "sun-clock" : pe ? "home-thermometer-outline" : "rocket-launch" }),
							" ",
							fe ? "Pre-heating" : pe ? "For rooms" : ue ? "Boosting" : "Boost"
						]
					})]
				})]
			}),
			_e && /* @__PURE__ */ (0, f.jsxs)("div", {
				className: "device-body",
				children: [
					!c && /* @__PURE__ */ (0, f.jsxs)("div", {
						className: "target-row",
						children: [/* @__PURE__ */ (0, f.jsxs)("div", {
							className: "target-text",
							children: [/* @__PURE__ */ (0, f.jsx)("span", {
								className: "target-label",
								children: le || "Target"
							}), /* @__PURE__ */ (0, f.jsx)("span", {
								className: "muted small",
								children: l ? ce && he ? `While you're away, until ${T(he.until)}` : l.mode === "off" ? "Turn the heating on to set a target" : l.mode === "schedule" ? "Until the next scheduled change" : l.mode === "boost" ? "Keeps the boost time left" : "Held until you change it" : ""
							})]
						}), /* @__PURE__ */ (0, f.jsxs)("div", {
							className: "target-control",
							children: [
								/* @__PURE__ */ (0, f.jsx)("button", {
									className: "round target-btn",
									disabled: !P,
									onClick: () => ae(-.5),
									"aria-label": "Lower the target",
									children: /* @__PURE__ */ (0, f.jsx)(p, { name: "minus" })
								}),
								/* @__PURE__ */ (0, f.jsx)("span", {
									className: `target-value ${N == null ? "" : "pending"}`,
									children: oe != null && l?.mode !== "off" ? `${oe.toFixed(1)}°` : "–"
								}),
								/* @__PURE__ */ (0, f.jsx)("button", {
									className: "round target-btn",
									disabled: !P,
									onClick: () => ae(.5),
									"aria-label": "Raise the target",
									children: /* @__PURE__ */ (0, f.jsx)(p, { name: "plus" })
								})
							]
						})]
					}),
					he && /* @__PURE__ */ (0, f.jsxs)("div", {
						className: "holiday-row",
						children: [
							/* @__PURE__ */ (0, f.jsx)(p, { name: "bag-suitcase" }),
							/* @__PURE__ */ (0, f.jsxs)("span", {
								className: "holiday-text",
								children: [
									ge,
									", then back to ",
									he.restore_mode === "schedule" ? "the schedule" : S.find((e) => e.id === he.restore_mode)?.label.toLowerCase()
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
							className: l?.mode === e.id || (fe || pe) && e.id === "schedule" ? "on" : "",
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
			O && /* @__PURE__ */ (0, f.jsx)(re, {
				title: fe ? "Pre-heating" : pe ? "Heating for rooms" : ue ? "Boosting" : "Boost",
				subtitle: i ? `${t.name} · ${_[n]}` : _[n],
				water: c,
				boosting: ue,
				preheatFor: de,
				demandFor: pe,
				remaining: l?.boost_remaining ?? null,
				boostTarget: ue ? l?.setpoint ?? null : null,
				defaultMinutes: C,
				defaultTemp: w,
				durations: M,
				clampTemp: j,
				busy: d,
				onBoost: se,
				onStop: () => h({ type: "hive_local/cancel_boost" }, pe ? "Back to the schedule" : "Boost cancelled").then(() => k(!1)),
				onClose: () => k(!1)
			})
		]
	});
}
function re({ title: e, subtitle: t, water: n, boosting: r, preheatFor: i, demandFor: a, remaining: o, boostTarget: s, defaultMinutes: c, defaultTemp: l, durations: d, clampTemp: m, busy: h, onBoost: g, onStop: _, onClose: v }) {
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
var ie = [
	60,
	90,
	120,
	180
];
function P({ getHass: e, device: t, info: n }) {
	let { busy: r, result: i, send: a } = x(e, t.entry_id, "heat"), o = [.../* @__PURE__ */ new Set([...ie, n.max_lead])].sort((e, t) => e - t), s;
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
var ae = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday"
], oe = ["saturday", "sunday"], se = (e) => e[0].toUpperCase() + e.slice(1, 3), ce = (e) => {
	let [t, n] = e.split(":").map(Number);
	return t * 60 + n;
};
function le({ getHass: e, device: t, channel: n, limits: r, mode: i, preheatFor: a, demandFor: o, source: s }) {
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
	}, k = c[h] ?? [], ee = r.max_transitions, te = (e) => l((t) => ({
		...t,
		[h]: [...e].sort((e, t) => ce(e.time) - ce(t.time))
	})), A = () => {
		let e = k[k.length - 1], t = e ? ue(k, ce(e.time) + 60) : "06:00", n = w ? r.water_on : e?.setpoint ?? 20;
		te([...k, {
			time: t,
			setpoint: n
		}]);
	}, j = (e) => l((t) => {
		let n = { ...t };
		for (let t of e) n[t] = k.map((e) => ({ ...e }));
		return n;
	}), M = (0, u.useMemo)(() => {
		let e = Object.values(c).flat().map((e) => e.setpoint).filter((e) => e > r.heat_min);
		return {
			lo: Math.min(15, ...e),
			hi: Math.max(24, ...e)
		};
	}, [c, r.heat_min]), N = g[((/* @__PURE__ */ new Date()).getDay() + 6) % 7], [ne, re] = (0, u.useState)(null), [ie, P] = (0, u.useState)(!1), le = g.filter((e) => JSON.stringify(c[e]) !== JSON.stringify(d[e])), me = g[(g.indexOf(h) + 1) % 7], he = (c[me] ?? [])[0]?.time, ge = (e) => w ? e.setpoint < r.water_on : pe(e.setpoint, r), F = "Stored on the receiver, so it keeps running without Home Assistant.";
	return s?.statusLine ? F = s.statusLine : i === "schedule" ? F = "Your schedule is running." : i === "manual" ? F = `Your schedule isn't being used: ${w ? "hot water is always on" : "heating is on Manual"}.` : i === "off" ? F = `Your schedule isn't being used: ${w ? "hot water" : "heating"} is off.` : i === "boost" && a ? F = `Your schedule is running, starting early so it's warm by ${a}.` : i === "boost" && o ? F = `Your schedule is running, with extra heat for ${o}.` : i === "boost" && (F = "Boosting now. Your schedule carries on after the boost."), /* @__PURE__ */ (0, f.jsxs)("div", {
		className: `sched ${s?.embedded ? "embedded" : ""}`,
		children: [
			/* @__PURE__ */ (0, f.jsx)("p", {
				className: "sched-status muted",
				children: F
			}),
			/* @__PURE__ */ (0, f.jsx)("div", {
				className: "sched-days",
				role: "tablist",
				"aria-label": "Day",
				children: g.map((e) => /* @__PURE__ */ (0, f.jsxs)("button", {
					role: "tab",
					"aria-selected": e === h,
					"aria-label": e,
					className: `sched-day ${e === h ? "on" : ""} ${e === N ? "today" : ""}`,
					onClick: () => {
						_(e), re(null);
					},
					children: [e[0].toUpperCase(), le.includes(e) && /* @__PURE__ */ (0, f.jsx)("i", {
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
						let n = k[t + 1]?.time ?? (he ? `${he} (${se(me)})` : "00:00"), i = ge(e);
						return /* @__PURE__ */ (0, f.jsxs)("button", {
							className: "slot",
							onClick: () => re(t),
							disabled: x,
							children: [
								/* @__PURE__ */ (0, f.jsx)("span", {
									className: `slot-badge ${i ? "off" : ""}`,
									style: i ? void 0 : { borderColor: w ? "var(--hl-brand)" : de(e.setpoint, M, r) },
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
							A(), re(k.length);
						},
						disabled: x || k.length >= ee,
						children: [/* @__PURE__ */ (0, f.jsx)("span", {
							className: "slot-badge add",
							children: /* @__PURE__ */ (0, f.jsx)(p, { name: "plus" })
						}), /* @__PURE__ */ (0, f.jsx)("span", {
							className: "slot-time",
							children: k.length >= ee ? `${ee} times a day at most` : "Add a time"
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
						title: `Changed: ${le.map(se).join(", ")}`,
						children: "Unsaved changes"
					}),
					/* @__PURE__ */ (0, f.jsx)("button", {
						className: "sched-undo",
						onClick: () => {
							l(d), re(null);
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
				children: [ie && /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [/* @__PURE__ */ (0, f.jsx)("div", {
					className: "fab-backdrop",
					onClick: () => P(!1)
				}), /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "fab-menu",
					role: "menu",
					children: [
						/* @__PURE__ */ (0, f.jsxs)("button", {
							role: "menuitem",
							onClick: () => {
								P(!1), D();
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
								P(!1), j(ae);
							},
							disabled: x || !k.length,
							children: [
								/* @__PURE__ */ (0, f.jsx)(p, { name: "content-copy" }),
								" Copy ",
								se(h),
								" to weekdays"
							]
						}),
						/* @__PURE__ */ (0, f.jsxs)("button", {
							role: "menuitem",
							onClick: () => {
								P(!1), j(oe);
							},
							disabled: x || !k.length,
							children: [
								/* @__PURE__ */ (0, f.jsx)(p, { name: "content-copy" }),
								" Copy ",
								se(h),
								" to the weekend"
							]
						}),
						/* @__PURE__ */ (0, f.jsxs)("button", {
							role: "menuitem",
							onClick: () => {
								P(!1), j([...g]);
							},
							disabled: x || !k.length,
							children: [
								/* @__PURE__ */ (0, f.jsx)(p, { name: "content-copy" }),
								" Copy ",
								se(h),
								" to every day"
							]
						})
					]
				})] }), /* @__PURE__ */ (0, f.jsx)("button", {
					className: "fab",
					"aria-label": "More",
					"aria-expanded": ie,
					onClick: () => P(!ie),
					children: /* @__PURE__ */ (0, f.jsx)(p, { name: ie ? "close" : "dots-horizontal" })
				})]
			}),
			ne != null && k[ne] && /* @__PURE__ */ (0, f.jsx)(fe, {
				slot: k[ne],
				dayName: h[0].toUpperCase() + h.slice(1),
				isWater: w,
				limits: r,
				canDelete: !0,
				onChange: (e) => te(k.map((t, n) => n === ne ? e : t)),
				onDelete: () => {
					te(k.filter((e, t) => t !== ne)), re(null);
				},
				onClose: () => re(null)
			})
		]
	});
}
function ue(e, t) {
	let n = new Set(e.map((e) => ce(e.time))), r = Math.min(t, 1410);
	for (; n.has(r) && r < 1439;) r += 15;
	return `${String(Math.floor(r / 60)).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
}
function de(e, t, n) {
	if (e <= n.heat_min) return "var(--hl-off-fill)";
	let r = Math.min(1, Math.max(0, (e - t.lo) / Math.max(1, t.hi - t.lo)));
	return `hsl(${Math.round(42 - 34 * r)} ${Math.round(88 + 4 * r)}% ${Math.round(64 - 14 * r)}%)`;
}
function fe({ slot: e, dayName: t, isWater: n, limits: r, canDelete: i, onChange: a, onDelete: o, onClose: s }) {
	(0, u.useEffect)(() => {
		let e = (e) => e.key === "Escape" && s();
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [s]);
	let c = n ? e.setpoint < r.water_on : pe(e.setpoint, r), l = (e) => Math.min(r.heat_max, Math.max(5, Math.round(e * 2) / 2)), d = c ? 20 : e.setpoint;
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
function pe(e, t) {
	return e <= t.heat_min || t.frost != null && e === t.frost;
}
// src/Stats.tsx
var me = [
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
], he = 3e5, ge = (e) => {
	let t = Math.round(e);
	return t < 60 ? `${t}m` : t % 60 ? `${Math.floor(t / 60)}h ${t % 60}m` : `${t / 60}h`;
}, F = (e, t, n = 2) => {
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
}, _e = (e, t) => F(e, t, 4), ve = (e, t) => (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString([], t), ye = (e) => (/* @__PURE__ */ new Date(e * 1e3)).toLocaleTimeString([], {
	hour: "2-digit",
	minute: "2-digit"
});
function be(e, t, n) {
	if (n === 1) return ve(e, {
		weekday: "short",
		day: "numeric",
		month: "short"
	});
	let r = t - 86400, i = /* @__PURE__ */ new Date(e * 1e3), a = /* @__PURE__ */ new Date(r * 1e3), o = (e) => e.toLocaleDateString([], { month: "short" });
	return i.getMonth() === a.getMonth() ? `${i.getDate()}–${a.getDate()} ${o(a)}` : `${i.getDate()} ${o(i)} – ${a.getDate()} ${o(a)}`;
}
var xe = (e) => e.filter((e) => e != null);
function Se(e) {
	if (e.period === 1) {
		let t = [];
		for (let n = 0; n < e.series.length; n += 4) {
			let r = e.series.slice(n, n + 4).filter((e) => e.heating != null);
			if (!r.length) continue;
			let i = xe(r.map((e) => e.current)), a = xe(e.series.slice(n, n + 4).map((e) => e.outdoor));
			t.push({
				key: e.series[n].t,
				label: [ye(e.series[n].t), ""],
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
		label: [ve(e.start, { weekday: "short" }), ve(e.start, { day: "numeric" })],
		minutes: e.heating_minutes,
		avg: e.temp_avg,
		min: e.temp_min,
		max: e.temp_max,
		outMin: e.outdoor_min,
		outMax: e.outdoor_max
	})).reverse();
}
function Ce({ getHass: e, devices: t, channel: n, roomId: r }) {
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
		let e = setInterval(D, he);
		return () => clearInterval(e);
	}, [D, g]), !s && !r) return null;
	let O = v && v.period === l && v.offset === g ? v : null, k = O ? Se(O) : [], ee = l === 1 ? "hour" : "day", te = !E && !!O?.outdoor, A = E ? null : O?.cost ?? null, j = E || m === "cost" && !A && O ? "time" : m;
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
					children: me.map((e) => /* @__PURE__ */ (0, f.jsx)("button", {
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
							"aria-checked": j === "time",
							title: "Time on",
							"aria-label": "Time on",
							className: `wide ${j === "time" ? "on" : ""}`,
							onClick: () => h("time"),
							children: /* @__PURE__ */ (0, f.jsx)(p, { name: "clock-outline" })
						}),
						/* @__PURE__ */ (0, f.jsx)("button", {
							role: "radio",
							"aria-checked": j === "temp",
							title: "Temperature",
							"aria-label": "Temperature",
							className: `wide ${j === "temp" ? "on" : ""}`,
							onClick: () => h("temp"),
							children: /* @__PURE__ */ (0, f.jsx)(p, { name: "thermometer" })
						}),
						(A || m === "cost") && /* @__PURE__ */ (0, f.jsx)("button", {
							role: "radio",
							"aria-checked": j === "cost",
							title: "Estimated cost",
							"aria-label": "Estimated cost",
							className: `wide ${j === "cost" ? "on" : ""}`,
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
							O ? be(O.start, O.period_end, l) : "…"
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
					me.find((e) => e.id === l).name.toLowerCase(),
					". Home Assistant keeps 10 days unless",
					" ",
					/* @__PURE__ */ (0, f.jsx)("code", { children: "purge_keep_days" }),
					" is raised."
				]
			}),
			O?.has_data && /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
				/* @__PURE__ */ (0, f.jsx)(Te, {
					data: O,
					metric: j,
					water: E,
					room: !!r,
					units: ee,
					rows: k,
					cost: A
				}),
				/* @__PURE__ */ (0, f.jsxs)("div", {
					className: "history-rows",
					children: [k.length > 0 && !E && /* @__PURE__ */ (0, f.jsxs)("div", {
						className: `history-key muted small ${te ? "with-outdoor" : ""}`,
						children: [te && /* @__PURE__ */ (0, f.jsxs)("span", {
							title: "Outside temperature",
							children: [/* @__PURE__ */ (0, f.jsx)(p, { name: "weather-partly-cloudy" }), " Outside"]
						}), /* @__PURE__ */ (0, f.jsxs)("span", {
							title: "Lowest and highest room temperature",
							children: [/* @__PURE__ */ (0, f.jsx)(p, { name: "thermometer" }), " Low · high"]
						})]
					}), k.map((e) => /* @__PURE__ */ (0, f.jsx)(Oe, {
						row: e,
						metric: j,
						water: E,
						outdoor: te,
						cost: A,
						scale: we(k, j, l)
					}, e.key))]
				}),
				j === "cost" && A && /* @__PURE__ */ (0, f.jsxs)("p", {
					className: "history-hint muted small",
					children: [
						"An estimate: the boiler's time on × ",
						A.kw.toFixed(1),
						" kW × ",
						_e(A.price, A.currency),
						" per kWh, at today's price.",
						" ",
						A.basis === "meter" ? "The kW is the boiler's average while on, learned from your gas meter." : `The kW is 40% of the boiler's ${A.boiler_kw ?? "?"} kW rating, as a modulating boiler rarely runs flat out. Pick a gas meter in Settings for a closer figure.`
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
function we(e, t, n) {
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
function Te({ data: e, metric: t, water: n, room: r, units: i, rows: a, cost: o }) {
	let s = Math.max(1, a.filter((e) => e.minutes != null).length), c = e.previous, l = !!c?.has_data && c.known_minutes >= .5 * e.known_minutes, u = l ? e.heating_minutes - c.heating_minutes : 0, d = e.temperature, p = (e) => o ? F(e / 60 * o.per_hour, o.currency) : "–", [m, h, g, _] = t === "cost" ? [
		"Estimated cost",
		p(e.heating_minutes),
		`Average per ${i}`,
		p(e.heating_minutes / s)
	] : t === "time" ? [
		n ? "Hot water on" : r ? "Valves heating" : "Boiler on",
		ge(e.heating_minutes),
		`Average per ${i}`,
		ge(e.heating_minutes / s)
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
			t === "time" && l && (Math.abs(u) < 1 ? "Same as the period before · " : `${ge(Math.abs(u))} ${u > 0 ? "more" : "less"} than the period before · `),
			t === "cost" && o && l && (Math.abs(u) < 1 ? "Same as the period before · " : `${p(Math.abs(u))} ${u > 0 ? "more" : "less"} than the period before · `),
			r ? "Started heating" : "Fired up",
			" ",
			e.cycles,
			" time",
			e.cycles === 1 ? "" : "s",
			e.boosts ? ` · ${e.boosts} boost${e.boosts === 1 ? "" : "s"}` : "",
			t === "temp" && e.target_avg != null ? ` · average target ${e.target_avg.toFixed(1)}°` : "",
			!n && Ee(e)
		]
	})] });
}
function Ee(e) {
	let t = e.outdoor?.avg;
	if (t == null) return "";
	let n = e.previous?.outdoor_avg, r = n == null ? null : t - n, i = r == null ? "" : Math.abs(r) < .5 ? ", about the same as the period before" : `, ${Math.abs(r).toFixed(0)}° ${r < 0 ? "colder" : "milder"} than the period before`;
	return ` · ${t.toFixed(0)}° outside${i}`;
}
function De(e, t) {
	if (e == null || t == null) return "–";
	let [n, r] = [e.toFixed(0), t.toFixed(0)];
	return n === r ? `${n}°` : `${n}–${r}°`;
}
function Oe({ row: e, metric: t, water: n, outdoor: r, cost: i, scale: a }) {
	let o = t === "temp" ? e.avg : e.minutes, s = o == null ? "–" : t === "time" ? ge(o) : t === "cost" && i ? F(o / 60 * i.per_hour, i.currency) : `${o.toFixed(1)}°`, c = o == null ? 0 : Math.max(.02, Math.min(1, (o - a.lo) / (a.hi - a.lo || 1)));
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
				children: De(e.outMin, e.outMax)
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
var ke = [
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
function Ae({ getHass: e, device: t, channel: n, info: r, limits: i, showDevice: a, tab: o, onTab: s, onBack: c }) {
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
				children: ke.map((e) => /* @__PURE__ */ (0, f.jsx)("button", {
					role: "tab",
					"aria-selected": e.id === o,
					className: e.id === o ? "on" : "",
					onClick: () => s(e.id),
					children: e.label
				}, e.id))
			}),
			o === "control" && /* @__PURE__ */ (0, f.jsx)(ne, {
				getHass: e,
				device: t,
				channel: n,
				info: r,
				showDevice: !1,
				limits: i,
				page: !0
			}),
			o === "control" && n === "heat" && r?.preheat && /* @__PURE__ */ (0, f.jsx)(P, {
				getHass: e,
				device: t,
				info: r.preheat
			}),
			l && /* @__PURE__ */ (0, f.jsx)("div", {
				hidden: o !== "schedule",
				children: /* @__PURE__ */ (0, f.jsx)(le, {
					getHass: e,
					device: t,
					channel: n,
					limits: i,
					mode: m?.mode ?? null,
					preheatFor: m?.mode === "boost" ? r?.preheat?.active_for ?? null : null,
					demandFor: m?.mode === "boost" && r?.demand?.active ? E(r.demand.rooms) : null
				})
			}),
			o === "history" && /* @__PURE__ */ (0, f.jsx)(Ce, {
				getHass: e,
				devices: [t],
				channel: n
			})
		]
	});
}
// src/Devices.tsx
var je = 20, Me = 6e4;
function Ne({ getHass: e, devices: t, status: n, limits: r, onOpenDevice: i }) {
	let [a, o] = (0, u.useState)(null), [s, c] = (0, u.useState)(""), [l, d] = (0, u.useState)(!1), m = (0, u.useCallback)(() => {
		e().callWS({ type: "hive_local/rooms/valves" }).then((e) => o(e.valves)).catch((e) => c(b(e)));
	}, [e]);
	(0, u.useEffect)(() => {
		m();
		let e = setInterval(m, Me);
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
				children: [t.map((e) => /* @__PURE__ */ (0, f.jsx)(Le, {
					device: e,
					status: n,
					onOpen: (t) => i(e.entry_id, t)
				}, e.entry_id)), a?.map((e) => /* @__PURE__ */ (0, f.jsx)(Re, { valve: e }, e.entity_id))]
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
			l && /* @__PURE__ */ (0, f.jsx)(ze, { onClose: () => d(!1) })
		]
	});
}
var Pe = {
	z2m: "Zigbee2MQTT",
	zha: "ZHA"
};
function Fe({ items: e }) {
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
function Ie({ online: e, text: t }) {
	return /* @__PURE__ */ (0, f.jsxs)("span", {
		className: `online ${e ? "" : "no"}`,
		children: [/* @__PURE__ */ (0, f.jsx)("i", {}), t ?? (e ? "Online" : "Not responding")]
	});
}
function Le({ device: e, status: t, onOpen: n }) {
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
					/* @__PURE__ */ (0, f.jsx)(Ie, {
						online: r,
						text: r ? "Online" : "Waiting"
					})
				]
			}),
			/* @__PURE__ */ (0, f.jsx)(Fe, { items: [{
				icon: "zigbee",
				text: Pe[e.transport ?? "z2m"]
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
function Re({ valve: e }) {
	let t = e.battery != null && !Number.isNaN(Number(e.battery)) ? Number(e.battery) : null, n = t != null && t < je;
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
				/* @__PURE__ */ (0, f.jsx)(Ie, { online: e.available })
			]
		}), /* @__PURE__ */ (0, f.jsx)(Fe, { items: [
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
function ze({ onClose: e }) {
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
var Be = 20, Ve = (e) => e == null ? "–" : `${e.toFixed(1)}°`;
function He({ valve: e, heating: t }) {
	let n = e.battery == null ? null : Number(e.battery), r = n != null && !Number.isNaN(n) && n <= Be;
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
					Ve(e.current_temperature),
					" ",
					/* @__PURE__ */ (0, f.jsxs)("span", {
						className: "muted",
						children: ["→ ", Ve(e.target)]
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
function Ue(e) {
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
var We = 8;
function Ge({ getHass: e, valves: t, info: n, roomName: r, thisRoom: i, chosen: a, onToggle: o }) {
	let [s, c] = (0, u.useState)(null), [l, d] = (0, u.useState)(null), m = (0, u.useRef)();
	(0, u.useEffect)(() => () => window.clearTimeout(m.current), []);
	let [h, g] = (0, u.useState)(""), _ = t.length > We, v = h.trim().toLowerCase(), y = r.trim().toLowerCase(), x = (e) => !!y && (e.area ?? "").toLowerCase() === y, S = (e) => {
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
					let t = n.get(e.entity_id), r = a.has(e.entity_id), i = t?.battery == null ? null : Number(t.battery), c = i != null && !Number.isNaN(i), l = c && i <= Be, u = S(e);
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
function Ke({ dialog: e, label: t, onClose: n, children: r }) {
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
function qe(e) {
	return /* @__PURE__ */ (0, f.jsx)(Je, {
		...e,
		dialog: !0
	});
}
function Je({ getHass: e, room: t, onDone: n, dialog: r }) {
	(0, u.useEffect)(() => {
		if (!r) return;
		let e = (e) => e.key === "Escape" && n();
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [r, n]);
	let [i, a] = (0, u.useState)(null), [o, s] = (0, u.useState)(t?.receiver ?? ""), [c, l] = (0, u.useState)(t?.name ?? ""), [d, m] = (0, u.useState)(new Set(t?.valves ?? [])), [h, g] = (0, u.useState)(t?.sensor ?? ""), [_, v] = (0, u.useState)(t?.sensor_on_valves ?? !0), [y, x] = (0, u.useState)(!1), [S, C] = (0, u.useState)(!1), [w, T] = (0, u.useState)(""), [E, D] = (0, u.useState)(/* @__PURE__ */ new Map());
	(0, u.useEffect)(() => {
		e().callWS({ type: "hive_local/rooms/candidates" }).then(a).catch((e) => T(b(e))), e().callWS({ type: "hive_local/rooms/valves" }).then((e) => D(new Map(e.valves.map((e) => [e.entity_id, e])))).catch(() => {});
	}, [e]);
	let O = (i?.receivers.length ?? 0) > 1, k = t && t.sensor === h && _ && (t.sensor_on_valves ?? !0) ? Ue(t) : null, ee = async (t) => {
		x(!0), T("");
		try {
			await e().callWS(t), n();
		} catch (e) {
			T(b(e)), x(!1);
		}
	};
	return /* @__PURE__ */ (0, f.jsxs)(Ke, {
		dialog: !!r,
		label: t ? `Edit ${t.name}` : "New room",
		onClose: n,
		children: [/* @__PURE__ */ (0, f.jsx)("h2", { children: t ? `Edit ${t.name}` : "New room" }), /* @__PURE__ */ (0, f.jsxs)("form", {
			className: "stack",
			onSubmit: (e) => {
				e.preventDefault(), ee({
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
						/* @__PURE__ */ (0, f.jsx)(Ge, {
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
								onClick: () => ee({
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
var Ye = [
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
function Xe(e) {
	return e.boost ? `Boost · ${D(e.boost.remaining)} left` : e.mode === "schedule" ? "On the valves' schedule" : e.mode === "off" ? "Off" : "Manual";
}
function Ze({ getHass: e, room: t }) {
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
	}, x = Ue(t), S = t.boost ? "Keeps the boost's time left" : m === "off" ? "Turn the room on to set a target" : m === "schedule" ? "Until the valves' next scheduled change" : t.target_range && i == null ? `The valves are set to ${Ve(t.target_range[0])}–${Ve(t.target_range[1])}` : "Held until you change it";
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
				children: Ye.map((e) => /* @__PURE__ */ (0, f.jsx)("button", {
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
				children: "The valves follow the schedule kept on them (the Schedule tab). Experimental."
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
					children: t.valve_states.map((e) => /* @__PURE__ */ (0, f.jsx)(He, {
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
			n && /* @__PURE__ */ (0, f.jsx)(Je, {
				getHass: e,
				room: t,
				onDone: () => r(!1),
				dialog: !0
			})
		]
	});
}
function Qe(e) {
	let t = e.toLowerCase();
	return /lounge|living|sitting|family|snug/.test(t) ? "sofa-outline" : /bed|nursery|guest/.test(t) ? "bed-outline" : /kitchen|dining/.test(t) ? "silverware-fork-knife" : /landing|hall|stair/.test(t) ? "stairs" : /study|office/.test(t) ? "desk" : /bath|shower|en-?suite|wc|toilet/.test(t) ? "shower" : "home-thermometer-outline";
}
function $e({ getHass: e, onDone: t }) {
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
	return /* @__PURE__ */ (0, f.jsxs)(Ke, {
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
									children: /* @__PURE__ */ (0, f.jsx)(p, { name: Qe(e.name) })
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
// src/RoomSchedule.tsx
var et = {
	max_transitions: 6,
	heat_min: 5,
	heat_max: 32,
	boost_min_temp: 5,
	boost_max_minutes: 360,
	water_on: 22,
	water_off: 1
}, tt = (e) => e[0].toUpperCase() + e.slice(1, 3);
function nt(e) {
	return e == null ? "its clock isn't set" : `its clock is ${Math.round(Math.abs(e) / 60)} min ${e < 0 ? "behind" : "ahead"}`;
}
function rt({ getHass: e, room: t, onClose: n, page: r }) {
	let [i, a] = (0, u.useState)([]), [o, s] = (0, u.useState)([]), [c, l] = (0, u.useState)(et), [d, m] = (0, u.useState)(!1), [h, _] = (0, u.useState)(!1), [v, y] = (0, u.useState)(null);
	(0, u.useEffect)(() => {
		let e = (e) => !r && e.key === "Escape" && n?.();
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [n, r]);
	let x = (0, u.useMemo)(() => ({
		noun: "valves",
		embedded: !r,
		onReading: _,
		statusLine: "Kept on each valve, so it runs without Home Assistant. Saving writes the changed days to every valve in the room.",
		read: async () => {
			let n = await e().callWS({
				type: "hive_local/rooms/schedule/get",
				room_id: t.id
			});
			a(n.valves), s(n.differs), l({
				...et,
				...n.limits
			});
			let r = n.limits.frost;
			if (r == null) return n;
			let i = 0, o = Object.fromEntries(Object.entries(n.schedule).map(([e, t]) => [e, (t ?? []).map((e) => e.setpoint <= et.heat_min && e.setpoint !== r ? (i++, {
				...e,
				setpoint: r
			}) : e)]));
			return i ? {
				...n,
				edited: o,
				note: `Off used to keep the valves at ${et.heat_min}°; it's now frost protection, ${r}°. Save to write the change to the valves.`
			} : n;
		},
		write: async (n) => {
			let r = await e().callWS({
				type: "hive_local/rooms/schedule/set",
				room_id: t.id,
				schedule: n
			}), i = g.filter((e) => e in r.schedule).map(tt).join(", "), a = r.valves.filter((e) => e.clock?.set).map((e) => e.name), o = r.valves.filter((e) => e.error), s = [o.length ? `Wrote ${i} to ${r.valves.length - o.length} of ${r.valves.length} valves. ${o.map((e) => `${e.name}: ${e.error}`).join(" ")}` : `Wrote ${i} to ${r.valves.length === 1 ? "the valve" : `all ${r.valves.length} valves`}. Read back to confirm they kept it.`, a.length ? `Set the clock on ${a.join(", ")}.` : ""];
			return {
				schedule: r.schedule,
				note: s.filter(Boolean).join(" "),
				error: o.length > 0
			};
		}
	}), [e, t.id]), S = i.filter((e) => e.schedule_mode === !1), C = i.length > 0 && i.every((e) => e.schedule_mode === !0), w = async (n) => {
		m(!0), y(null);
		try {
			let r = await e().callWS({
				type: "hive_local/rooms/schedule/mode",
				room_id: t.id,
				enabled: n
			}), o = i.filter((e) => r.failed.includes(e.entity_id)).map((e) => e.name);
			o.length ? y({
				kind: "error",
				text: `Didn't take on ${o.join(", ")}. It may be asleep: press its dial to wake it and try again.`
			}) : (y({
				kind: "ok",
				text: n ? "The valves now follow their schedule." : "The valves stay at their target now."
			}), a((e) => e.map((e) => ({
				...e,
				schedule_mode: n
			}))));
		} catch (e) {
			y({
				kind: "error",
				text: b(e)
			});
		} finally {
			m(!1);
		}
	}, T = [];
	for (let e of i) e.error ? T.push(`${e.name} didn't answer: ${e.error}`) : e.complete || T.push(`${e.name} sent ${e.days} of 7 days.`), e.clock && !e.clock.ok && !e.error && T.push(`${e.name}: ${nt(e.clock.offset)}. It's set when you save.`);
	o.length && i.length > 1 && T.push(`The valves have different times on ${o.map(tt).join(", ")}. This shows ${i.find((e) => e.days)?.name ?? "the first valve"}'s; saving a day writes it to them all.`);
	let E = /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
		r ? /* @__PURE__ */ (0, f.jsx)("div", {
			className: "room-schedule-head",
			children: /* @__PURE__ */ (0, f.jsx)("span", {
				className: "chip unsaved",
				children: "Experimental"
			})
		}) : /* @__PURE__ */ (0, f.jsxs)("div", {
			className: "room-schedule-head",
			children: [
				/* @__PURE__ */ (0, f.jsx)("button", {
					className: "round ghost",
					onClick: () => n?.(),
					"aria-label": "Back to the room",
					children: /* @__PURE__ */ (0, f.jsx)(p, { name: "chevron-left" })
				}),
				/* @__PURE__ */ (0, f.jsxs)("div", {
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
				}),
				/* @__PURE__ */ (0, f.jsx)("span", {
					className: "chip unsaved",
					children: "Experimental"
				})
			]
		}),
		/* @__PURE__ */ (0, f.jsx)("p", {
			className: "muted small room-schedule-note",
			children: "Not yet tried on real Hive valves. The valves sleep between check-ins, so reading or saving can take up to a couple of minutes; pressing a valve's dial wakes it. On ZHA, each valve's clock is checked first and set if it's wrong, or the schedule would run at the wrong times."
		}),
		i.length > 0 && /* @__PURE__ */ (0, f.jsxs)("div", {
			className: "room-schedule-mode",
			children: [
				/* @__PURE__ */ (0, f.jsx)(p, { name: C ? "calendar-check-outline" : "calendar-remove-outline" }),
				/* @__PURE__ */ (0, f.jsx)("span", {
					className: "small room-schedule-mode-text",
					children: C ? "The valves follow this schedule." : S.length ? `${S.length === i.length ? "The valves don't" : `${S.map((e) => e.name).join(", ")} doesn't`} follow a schedule: ${S.length === 1 ? "it stays" : "they stay"} at the target.` : "Couldn't tell whether the valves follow a schedule."
				}),
				/* @__PURE__ */ (0, f.jsx)("button", {
					className: "ghost",
					onClick: () => w(!C),
					disabled: d || h,
					children: C ? "Stop" : "Use it"
				})
			]
		}),
		v && /* @__PURE__ */ (0, f.jsx)("div", {
			className: `status ${v.kind} small`,
			children: v.text
		}),
		T.length > 0 && /* @__PURE__ */ (0, f.jsx)("ul", {
			className: "room-schedule-notes small",
			children: T.map((e) => /* @__PURE__ */ (0, f.jsx)("li", { children: e }, e))
		}),
		/* @__PURE__ */ (0, f.jsx)(le, {
			getHass: e,
			limits: c,
			source: x
		})
	] });
	return r ? /* @__PURE__ */ (0, f.jsx)("div", {
		className: "room-schedule room-schedule-page",
		children: E
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
			children: [/* @__PURE__ */ (0, f.jsx)("span", { className: "sheet-handle" }), E]
		})
	});
}
// src/RoomPage.tsx
var it = [
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
function at({ getHass: e, roomId: t, devices: n, status: r, limits: i, tab: a, onTab: o, onBack: s }) {
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
	let _ = n.length > 1, v = r[c.receiver ?? n[0]?.entry_id ?? ""]?.heat, y = [_ ? c.receiver_name : null, Xe(c)].filter(Boolean).join(" · ");
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
				children: it.map((e) => /* @__PURE__ */ (0, f.jsx)("button", {
					role: "tab",
					"aria-selected": e.id === a,
					className: e.id === a ? "on" : "",
					onClick: () => o(e.id),
					children: e.label
				}, e.id))
			}),
			a === "control" && /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [/* @__PURE__ */ (0, f.jsx)(N, {
				getHass: e,
				room: c,
				showReceiver: !1,
				limits: i,
				defaultMinutes: v?.boost_minutes ?? 60,
				defaultTemp: v?.boost_temperature ?? 21,
				page: !0
			}), /* @__PURE__ */ (0, f.jsx)(Ze, {
				getHass: e,
				room: c
			})] }),
			h && /* @__PURE__ */ (0, f.jsx)("div", {
				hidden: a !== "schedule",
				children: /* @__PURE__ */ (0, f.jsx)(rt, {
					getHass: e,
					room: c,
					page: !0
				})
			}),
			a === "history" && /* @__PURE__ */ (0, f.jsx)(Ce, {
				getHass: e,
				devices: n,
				roomId: c.id
			})
		]
	});
}
// src/Settings.tsx
function ot({ getHass: e, devices: t, status: n }) {
	let [r, i] = (0, u.useState)(null), [a, o] = (0, u.useState)("");
	(0, u.useEffect)(() => {
		e().callWS({ type: "hive_local/settings" }).then(i).catch((e) => o(b(e)));
	}, [e]);
	let s = (t) => {
		i((e) => e && {
			...e,
			...t
		}), e().callWS({
			type: "hive_local/settings/set",
			...t
		}).then((e) => {
			i(e), o("");
		}).catch((e) => o(b(e)));
	}, c = (e) => s({ outdoor_entity: e || null });
	return /* @__PURE__ */ (0, f.jsxs)("div", {
		className: "settings",
		children: [
			/* @__PURE__ */ (0, f.jsx)("h2", {
				className: "history-title",
				children: "Settings"
			}),
			a && /* @__PURE__ */ (0, f.jsx)("div", {
				className: "status error",
				children: a
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
								value: r?.outdoor_entity ?? "",
								onChange: (e) => c(e.target.value),
								disabled: !r,
								children: [/* @__PURE__ */ (0, f.jsx)("option", {
									value: "",
									children: "None"
								}), (r?.outdoor_candidates ?? []).map((e) => /* @__PURE__ */ (0, f.jsxs)("option", {
									value: e.entity_id,
									children: [e.name, e.area ? ` · ${e.area}` : ""]
								}, e.entity_id))]
							})
						]
					})
				})]
			}),
			r && /* @__PURE__ */ (0, f.jsx)(ut, {
				data: r,
				save: s
			}),
			/* @__PURE__ */ (0, f.jsx)(ft, { getHass: e }),
			t.map((r) => /* @__PURE__ */ (0, f.jsxs)("section", {
				className: "settings-section",
				children: [/* @__PURE__ */ (0, f.jsx)("h3", { children: t.length > 1 ? r.name : "Receiver" }), /* @__PURE__ */ (0, f.jsxs)("div", {
					className: "settings-group",
					children: [r.channels.map((t) => /* @__PURE__ */ (0, f.jsx)(ht, {
						getHass: e,
						device: r,
						channel: t,
						info: n[r.entry_id]?.[t]
					}, t)), n[r.entry_id]?.heat?.demand && /* @__PURE__ */ (0, f.jsx)(_t, {
						getHass: e,
						device: r,
						info: n[r.entry_id].heat.demand
					})]
				})]
			}, r.entry_id)),
			/* @__PURE__ */ (0, f.jsx)(ct, { getHass: e })
		]
	});
}
var st = (e, t, n = `${t}s`) => `${e} ${e === 1 ? t : n}`;
function ct({ getHass: e }) {
	let [t, n] = (0, u.useState)(null), [r, i] = (0, u.useState)(!1), [a, o] = (0, u.useState)(""), s = (t) => {
		i(!0), e().callWS({ type: t }).then((e) => {
			n(e), o("");
		}).catch((e) => o(b(e))).finally(() => i(!1));
	};
	if ((0, u.useEffect)(() => s("hive_local/tidy"), [e]), !t || !t.receiver.length && !t.valves.length) return null;
	let c = [t.receiver.length ? `${st(t.receiver.length, "receiver thermostat")} from ZHA or Zigbee2MQTT ${t.receiver.length === 1 ? "is" : "are"} disabled` : null, t.valves.length ? `${st(t.valves.length, "room valve")} ${t.valves.length === 1 ? "is" : "are"} hidden` : null].filter(Boolean), l = t.pending ? "Hive Local's heating and room entities replace them. Valves are only hidden: rooms still use them." : `Done: ${c.join(", and ")}. Switch any back in their entity settings, or Undo.`;
	return /* @__PURE__ */ (0, f.jsxs)("section", {
		className: "settings-section",
		children: [
			/* @__PURE__ */ (0, f.jsx)("h3", { children: "Entities" }),
			a && /* @__PURE__ */ (0, f.jsx)("div", {
				className: "status error",
				children: a
			}),
			/* @__PURE__ */ (0, f.jsx)("div", {
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
							children: [/* @__PURE__ */ (0, f.jsx)("span", { children: t.pending ? "Tidy up duplicate entities" : "Duplicate entities tidied up" }), /* @__PURE__ */ (0, f.jsx)("span", {
								className: "muted small",
								children: l
							})]
						}),
						/* @__PURE__ */ (0, f.jsxs)("div", {
							className: "settings-controls",
							children: [t.undoable > 0 && /* @__PURE__ */ (0, f.jsx)("button", {
								className: "ghost",
								disabled: r,
								onClick: () => s("hive_local/tidy/undo"),
								children: "Undo"
							}), t.pending > 0 && /* @__PURE__ */ (0, f.jsxs)("button", {
								className: "device-action tidy-action",
								disabled: r,
								onClick: () => s("hive_local/tidy/apply"),
								children: ["Tidy up ", t.pending]
							})]
						})
					]
				})
			})
		]
	});
}
var lt = [
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
function ut({ data: e, save: t }) {
	let [n, r] = (0, u.useState)(null), i = (0, u.useRef)(null), a = (0, u.useRef)(), o = e.boiler_kw, s = (e) => {
		if (o == null) return t({ boiler_kw: 24 });
		t({ boiler_kw: (e > 0 ? lt.find((e) => e > o) : [...lt].reverse().find((e) => e < o)) ?? o });
	}, c = dt[e.currency], l = n ?? e.fixed_price, d = (n, o = 0) => {
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
	} : { price_source: n || null }), h = e.fit, g = e.gas_meter ? h ? `Learned ${h.kw.toFixed(1)} kW while heating from ${h.days} days${h.baseline >= .5 ? ` (plus ${h.baseline.toFixed(0)} kWh a day for hot water and cooking)` : ""}.` : e.learned_at ? "Not enough yet: it needs at least 4 days of readings with the heating on. Checked every 6 hours." : "Learning from the last 14 days…" : "Learns the boiler's real average output from your gas use. Hot water and cooking on the same meter are allowed for.", _ = e.price_source === "fixed" ? "Your unit rate, below." : e.price_source === "energy" && e.energy_price == null ? "The Energy dashboard has no gas price (or it can't be read)." : e.price_source && e.price_source !== "fixed" && e.price == null ? "That entity has no price right now." : ((t) => t == null ? null : `${_e(t, e.currency)} per kWh`)(e.price) ?? "Pick where the price comes from.";
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
								children: [/* @__PURE__ */ (0, f.jsx)(vt, {
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
								children: /* @__PURE__ */ (0, f.jsx)(vt, {
									value: l == null ? "–" : c ? `${(l * 100).toFixed(2)}${c}` : _e(l, e.currency),
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
var dt = {
	GBP: "p",
	EUR: "c",
	USD: "¢",
	CAD: "¢",
	AUD: "c",
	NZD: "c",
	IEP: "p"
};
function ft({ getHass: e }) {
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
			s && /* @__PURE__ */ (0, f.jsx)($e, {
				getHass: e,
				onDone: () => c(!1)
			}),
			a && /* @__PURE__ */ (0, f.jsx)(qe, {
				getHass: e,
				room: a === "new" ? void 0 : t?.find((e) => e.id === a),
				onDone: () => o(null)
			})
		]
	});
}
var pt = (e) => e < 60 ? `${e} min` : e % 60 ? `${Math.floor(e / 60)} h ${e % 60} min` : `${e / 60} h`, mt = [
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
function ht({ getHass: e, device: t, channel: n, info: r }) {
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
		let t = mt.findIndex((e) => e >= s.boost_minutes), n = t < 0 ? mt.length - 1 : t;
		return mt[Math.min(mt.length - 1, Math.max(0, n + e))];
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
				children: [/* @__PURE__ */ (0, f.jsx)(vt, {
					label: "How long",
					value: pt(s.boost_minutes),
					onLower: () => c("boost_minutes", l(-1)),
					onRaise: () => c("boost_minutes", l(1))
				}), !d && /* @__PURE__ */ (0, f.jsx)(vt, {
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
				children: /* @__PURE__ */ (0, f.jsx)(vt, {
					value: `${s.frost_temperature.toFixed(1)}°`,
					onLower: () => c("frost_temperature", Math.max(5, s.frost_temperature - .5)),
					onRaise: () => c("frost_temperature", Math.min(16, s.frost_temperature + .5))
				})
			})
		]
	})] });
}
var gt = {
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
function _t({ getHass: e, device: t, info: n }) {
	let { busy: r, result: i, send: a } = x(e, t.entry_id, "heat"), o = n.enabled ? n.active ? `On. Heating for ${E(n.rooms)} now.` : gt[n.reason ?? ""] ?? "On." : "When a room this receiver heats is cold, or one of its valves is heating, the heating comes on for it. Each request lasts 30 min at a time, so it stops by itself if Home Assistant does.", s = (e, t, n) => /* @__PURE__ */ (0, f.jsx)("div", {
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
function vt({ label: e, value: t, onLower: n, onRaise: r, hold: i }) {
	let a = yt(n, i), o = yt(r, i);
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
function yt(e, t) {
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
// src/App.tsx
var I = [
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
function bt({ getHass: e, narrow: t, onToggleMenu: n }) {
	let [r, i] = (0, u.useState)([]), [a, o] = (0, u.useState)(null), [s, c] = (0, u.useState)({}), [l, d] = (0, u.useState)("overview"), [m, g] = (0, u.useState)(null), [_, v] = (0, u.useState)("control"), [y, x] = (0, u.useState)(null), [S, C] = (0, u.useState)("");
	(0, u.useEffect)(() => {
		e().callWS({ type: "hive_local/devices" }).then((e) => {
			i(e.devices), o(e.limits);
		}).catch((e) => C(b(e)));
		let t = e().connection.subscribeMessage((e) => c(e.status), { type: "hive_local/subscribe" });
		return () => {
			t.then((e) => e()).catch(() => {});
		};
	}, [e]);
	let w = (e) => {
		x(e), v("control");
	}, T = (0, u.useCallback)(() => x(null), []), E = (e, t) => {
		g({
			entry: e,
			channel: t
		}), v("control");
	}, D = (e) => {
		d(e), g(null), x(null);
	}, O = m && r.find((e) => e.entry_id === m.entry);
	return /* @__PURE__ */ (0, f.jsxs)("div", {
		className: "panel",
		children: [/* @__PURE__ */ (0, f.jsx)("header", { children: /* @__PURE__ */ (0, f.jsxs)("div", {
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
					children: I.map((e) => /* @__PURE__ */ (0, f.jsxs)("button", {
						role: "tab",
						"aria-selected": e.id === l,
						className: e.id === l ? "on" : "",
						onClick: () => D(e.id),
						children: [/* @__PURE__ */ (0, f.jsx)(p, { name: e.icon }), /* @__PURE__ */ (0, f.jsx)("span", { children: e.label })]
					}, e.id))
				})
			]
		}) }), /* @__PURE__ */ (0, f.jsxs)("main", { children: [
			S && /* @__PURE__ */ (0, f.jsx)("div", {
				className: "status error",
				children: S
			}),
			!r.length && !S && /* @__PURE__ */ (0, f.jsxs)("div", {
				className: "empty-state",
				children: [/* @__PURE__ */ (0, f.jsx)(h, { size: 56 }), /* @__PURE__ */ (0, f.jsx)("p", { children: "No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local." })]
			}),
			O && a ? /* @__PURE__ */ (0, f.jsx)(Ae, {
				getHass: e,
				device: O,
				channel: m.channel,
				info: s[O.entry_id]?.[m.channel],
				limits: a,
				showDevice: r.length > 1,
				tab: _,
				onTab: v,
				onBack: () => g(null)
			}, `${m.entry}-${m.channel}`) : y ? /* @__PURE__ */ (0, f.jsx)(at, {
				getHass: e,
				roomId: y,
				devices: r,
				status: s,
				limits: a,
				tab: _,
				onTab: v,
				onBack: T
			}, y) : /* @__PURE__ */ (0, f.jsxs)(f.Fragment, { children: [
				l === "overview" && /* @__PURE__ */ (0, f.jsx)(A, {
					getHass: e,
					devices: r,
					status: s,
					limits: a,
					onOpenDevice: E,
					onOpenRoom: w
				}),
				l === "devices" && r.length > 0 && /* @__PURE__ */ (0, f.jsx)(Ne, {
					getHass: e,
					devices: r,
					status: s,
					limits: a,
					onOpenDevice: E
				}),
				l === "stats" && r.length > 0 && /* @__PURE__ */ (0, f.jsx)(Ce, {
					getHass: e,
					devices: r
				}),
				l === "settings" && r.length > 0 && /* @__PURE__ */ (0, f.jsx)(ot, {
					getHass: e,
					devices: r,
					status: s
				})
			] })
		] })]
	});
}
// src/styles.ts
var xt = "\n:host {\n  /* One accent for everything that's on or active (heating, hot water, boosting, the selected tab):\n     HA's heating orange. Heating and hot water share it. */\n  --hl-brand: var(--state-climate-heat-color, #ff8100);\n  --hl-heat: var(--hl-brand);\n  /* Main buttons and selected chips use the accent too, not HA's blue. */\n  --hl-accent: var(--hl-brand);\n  --hl-water: var(--hl-brand);\n  --hl-idle: var(--secondary-text-color, #727272);\n  --hl-off: var(--disabled-text-color, #9e9e9e);\n  --hl-off-fill: color-mix(in srgb, var(--secondary-text-color, #888) 18%, transparent);\n  --hl-radius: 18px;\n  --hl-soft: color-mix(in srgb, var(--primary-text-color, #000) 6%, transparent);\n  display: block; height: 100%;\n  background: var(--primary-background-color);\n  color: var(--primary-text-color);\n  font-family: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, Roboto, sans-serif));\n  -webkit-font-smoothing: antialiased;\n}\n* { box-sizing: border-box; }\n.panel { min-height: 100%; background: var(--primary-background-color); }\n.icon-wrap { display: inline-flex; align-items: center; justify-content: center; line-height: 0; --mdc-icon-size: 20px; }\n.spacer { flex: 1; }\n.muted { color: var(--secondary-text-color); font-size: 14px; }\n.small { font-size: 12px; }\n\n/* Header: logo and title, with the tabs inline beside them (they wrap to a row of their own when there's no room) */\nheader { position: sticky; top: 0; z-index: 2; background: var(--app-header-background-color, var(--primary-color)); color: var(--app-header-text-color, #fff); border-bottom: var(--app-header-border-bottom, none); }\n/* In the companion app HA already places the panel below the status bar / Dynamic Island,\n   leaving that strip in its own colour. Paint the header's colour up into it, as HA's own\n   top bars reach it. Nothing shows where there's no safe area (desktop, browsers). */\nheader::before { content: \"\"; position: absolute; left: 0; right: 0; bottom: 100%; height: env(safe-area-inset-top, 0px); background: inherit; pointer-events: none; }\n.toolbar-row { display: flex; align-items: center; flex-wrap: wrap; column-gap: 20px; min-height: 56px; padding: 0 16px; }\n.brand { display: flex; align-items: center; gap: 10px; height: 56px; flex: none; }\n.toolbar-row h1 { font-size: 20px; font-weight: 400; margin: 0; white-space: nowrap; }\n.logo-mark { display: block; flex: none; }\n.empty-state .logo-mark { opacity: .9; }\n.toolbar-row .menu { background: transparent; border: 0; color: inherit; padding: 8px; margin-left: -8px; margin-right: -10px; border-radius: 50%; }\n.toolbar-row .menu:hover { background: rgba(255,255,255,.12); }\n/* Pills. flex-shrink 0: when they don't fit beside the logo, the tabs wrap onto their own row instead of squashing. */\n.tabs { display: flex; align-items: center; gap: 4px; flex: 1 0 auto; padding: 10px 0; margin: 0 -8px 0 -4px; overflow-x: auto; scrollbar-width: none; }\n.tabs::-webkit-scrollbar { display: none; }\n.tabs button { flex: none; display: inline-flex; align-items: center; gap: 8px; height: 36px; border: 0; border-radius: 999px; background: transparent; color: inherit; opacity: .75; padding: 0 14px; font-weight: 500; letter-spacing: .01em; }\n.tabs button:hover:not(:disabled) { opacity: .95; background: color-mix(in srgb, currentColor 7%, transparent); }\n.tabs button:active:not(:disabled) { transform: none; }\n.tabs button.on, .tabs button.on:hover:not(:disabled) { opacity: 1; background: color-mix(in srgb, currentColor 13%, transparent); }\n.tabs .icon-wrap { --mdc-icon-size: 18px; }\n\nmain { max-width: 1040px; margin: 0 auto; padding: 20px 16px 32px; display: flex; flex-direction: column; gap: 16px; }\n.stack { display: flex; flex-direction: column; gap: 16px; }\n\n/* Cards */\n.card { background: var(--card-background-color); border-radius: var(--hl-radius); border: 1px solid var(--divider-color); padding: 18px; display: flex; flex-direction: column; gap: 14px; }\n.card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }\n.title { display: flex; align-items: center; gap: 12px; }\n.title-icon { width: 40px; height: 40px; flex: none; border-radius: 10px; --mdc-icon-size: 22px; color: var(--secondary-text-color); background: var(--hl-soft); }\n.card.heat { --hl-accent: var(--hl-heat); }\n.card.water { --hl-accent: var(--hl-water); }\nh2 { font-size: 18px; font-weight: 500; margin: 0; }\nh3 { font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: .06em; color: var(--secondary-text-color); margin: 6px 0 -4px; }\n\n/* Controls */\nbutton { font: inherit; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 14px; border-radius: 10px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); cursor: pointer; transition: background .15s, border-color .15s, opacity .15s, transform .1s; }\nbutton:hover:not(:disabled) { background: var(--hl-soft); }\nbutton:active:not(:disabled) { transform: scale(.98); }\nbutton:disabled { opacity: .45; cursor: default; }\nbutton:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }\nbutton.primary { background: var(--hl-accent, var(--primary-color)); color: var(--text-primary-color, #fff); border-color: transparent; }\nbutton.primary:hover:not(:disabled) { background: var(--hl-accent, var(--primary-color)); filter: brightness(1.08); }\nbutton.ghost { border-color: transparent; background: transparent; color: var(--secondary-text-color); padding-right: 6px; }\nbutton.round { width: 36px; height: 36px; padding: 0; border-radius: 50%; }\nbutton.danger { color: var(--error-color); border-color: transparent; background: transparent; }\nselect, input[type=time], input[type=text] { font: inherit; font-size: 14px; padding: 8px 10px; border-radius: 10px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); color-scheme: light dark; }\n.toolbar, .actions, .inline-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }\n.inline-row { gap: 12px; }\n\n.segmented { display: inline-flex; padding: 3px; gap: 3px; border-radius: 12px; background: var(--hl-soft); }\n.segmented.full { display: flex; }\n.segmented.full button { flex: 1; }\n.segmented button { border: 0; border-radius: 9px; background: transparent; padding: 7px 12px; color: var(--secondary-text-color); }\n.segmented button.on { background: var(--card-background-color); color: var(--primary-text-color); font-weight: 500; }\n.segmented .raw { padding: 7px 10px; }\n\n.chip { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; padding: 4px 10px; border-radius: 999px; background: var(--hl-soft); color: var(--secondary-text-color); white-space: nowrap; }\n.chip .icon-wrap { --mdc-icon-size: 14px; }\n.chip.mode-boost { background: color-mix(in srgb, var(--hl-heat) 16%, transparent); color: var(--hl-heat); }\n.water .chip.mode-boost { background: color-mix(in srgb, var(--hl-water) 16%, transparent); color: var(--hl-water); }\n.chip.unsaved { background: color-mix(in srgb, var(--warning-color, #ffa600) 18%, transparent); color: var(--warning-color, #ffa600); }\n.channel-switch { align-self: flex-start; }\n.channel-switch .icon-wrap { --mdc-icon-size: 18px; }\n.chips { display: flex; flex-wrap: wrap; gap: 8px; }\n.chip-btn { border-radius: 999px; padding: 6px 14px; }\n.chip-btn.on { background: color-mix(in srgb, var(--hl-accent, var(--primary-color)) 16%, transparent); border-color: var(--hl-accent, var(--primary-color)); color: var(--hl-accent, var(--primary-color)); font-weight: 500; }\n\n.status { padding: 10px 14px; border-radius: 10px; font-size: 14px; background: var(--hl-soft); }\n.status.ok { background: color-mix(in srgb, var(--success-color, #43a047) 14%, transparent); }\n.status.error { background: color-mix(in srgb, var(--error-color, #db4437) 14%, transparent); color: var(--error-color); }\n.status.busy { opacity: .8; }\n\n.empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 48px 16px; color: var(--secondary-text-color); }\n.empty-state .icon-wrap { --mdc-icon-size: 48px; opacity: .5; }\n\n/* Overview: quick actions, filter pills and device cards */\n.home { display: flex; flex-direction: column; gap: 12px; }\n.home-section { font-size: 19px; font-weight: 700; letter-spacing: -.01em; text-transform: none; letter-spacing: 0; color: var(--primary-text-color); margin: 6px 0 0; }\n.quick { display: flex; gap: 10px; overflow-x: auto; scrollbar-width: none; padding: 2px 2px 6px; margin: 0 -2px; }\n.quick::-webkit-scrollbar { display: none; }\n.quick-action { flex: none; padding: 0; gap: 0; border-radius: 14px; overflow: hidden; align-items: stretch; background: var(--card-background-color); }\n.quick-icon { padding-left: 14px; display: flex; align-items: center; justify-content: center; color: var(--secondary-text-color); }\n.quick-icon .icon-wrap { --mdc-icon-size: 22px; }\n.quick-label { padding: 14px 16px 14px 10px; white-space: nowrap; }\n.pills { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding: 2px; }\n.pills::-webkit-scrollbar { display: none; }\n.pill { flex: none; border-radius: 999px; padding: 8px 16px; background: var(--card-background-color); }\n.pill .icon-wrap { --mdc-icon-size: 18px; }\n.pill.on, .pill.on:hover:not(:disabled) { background: var(--hl-brand); color: #fff; border-color: transparent; font-weight: 500; }\n/* Cards in a row share its height. */\n.device-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 12px; align-items: stretch; }\n.card.device { padding: 0; gap: 0; overflow: hidden; height: 100%; }\n.device-head { flex: 1; display: flex; flex-direction: column; gap: 12px; padding: 18px 18px 20px; cursor: pointer; outline: none; transition: background .15s; }\n.device-head:hover { background: color-mix(in srgb, var(--primary-text-color) 3%, transparent); }\n.device-head:focus-visible { box-shadow: inset 0 0 0 2px var(--primary-color); }\n.device-row { display: flex; align-items: center; gap: 12px; }\n/* Our own icon tile: a rounded square with the logo's warm gradient (not a diamond). */\n/* Icons: grey, in a shaded rounded box. */\n.device-icon { width: 40px; height: 40px; flex: none; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--secondary-text-color); background: var(--hl-soft); }\n.device-icon .icon-wrap { --mdc-icon-size: 22px; }\n.device-name { display: flex; flex-direction: column; min-width: 0; flex: 1; font-size: 17px; font-weight: 500; }\n.device-name .small { font-weight: 400; }\n.device-status { font-size: 14px; color: var(--secondary-text-color); white-space: nowrap; display: inline-flex; align-items: center; gap: 4px; }\n.device-status b { color: var(--primary-text-color); font-weight: 600; }\n.status-icon { --mdc-icon-size: 18px; color: var(--hl-heat); }\n.water .status-icon { color: var(--hl-water); }\n.device-big { flex: 1; font-size: 54px; font-weight: 400; line-height: 1; letter-spacing: -.02em; font-variant-numeric: tabular-nums; display: grid; grid-template-columns: auto 1fr; }\n.device-big span { font-size: 30px; line-height: 1.1; }\n.device-big small { grid-column: 1 / -1; font-size: 13px; letter-spacing: 0; color: var(--secondary-text-color); margin-top: 4px; font-weight: 400; }\n.device-action { min-width: 120px; height: 50px; border-radius: 14px; border: 0; font-size: 17px; font-weight: 500; color: var(--hl-brand); background: color-mix(in srgb, var(--hl-brand) 12%, transparent); }\n.device-action:hover:not(:disabled) { background: color-mix(in srgb, var(--hl-brand) 20%, transparent); }\n.device-action.boosting, .device-action.boosting:hover:not(:disabled) { color: #fff; background: var(--hl-accent); }\n.status-icon.done { color: var(--success-color, #43a047); }\n.status-icon.away { color: var(--secondary-text-color); }\n.stop-square { width: 16px; height: 16px; border-radius: 3px; background: currentColor; }\n.device.heat { --hl-accent: var(--hl-heat); }\n.device.water { --hl-accent: var(--hl-water); }\n.device-name .warn { color: var(--warning-color, #ffa600); font-weight: 500; }\n\n\n.device-body { display: flex; flex-direction: column; gap: 14px; padding: 4px 16px 16px; border-top: 1px solid var(--divider-color); }\n.schedule-link { align-self: center; }\n\n/* Boost sheet: slides up from the bottom on phones, a centred dialog on wider screens */\n.sheet-backdrop { position: fixed; inset: 0; z-index: 10; display: flex; align-items: center; justify-content: center; padding: 16px; background: rgba(0,0,0,.45); animation: hl-fade .15s ease-out; }\n.sheet { width: 100%; max-width: 440px; display: flex; flex-direction: column; gap: 18px; padding: 14px 20px 18px; border-radius: 24px; background: var(--card-background-color); color: var(--primary-text-color); }\n.sheet.heat { --hl-accent: var(--hl-heat); }\n.sheet.water { --hl-accent: var(--hl-water); }\n.sheet-handle { align-self: center; width: 40px; height: 4px; border-radius: 2px; background: var(--divider-color); }\n.sheet-title { display: flex; flex-direction: column; align-items: center; gap: 2px; text-align: center; }\n.sheet-title h2 { font-size: 24px; }\n.sheet-field { display: flex; flex-direction: column; gap: 10px; }\n.sheet-label { font-size: 14px; color: var(--secondary-text-color); }\n.sheet-temp { display: flex; align-items: center; gap: 12px; }\n.sheet-step { width: 52px; height: 52px; flex: none; border-color: var(--divider-color); }\n.sheet-step .icon-wrap { --mdc-icon-size: 24px; }\n.sheet-temp-value { flex: 1; text-align: center; padding: 14px 0; border-radius: 18px; color: #fff; font-size: 44px; font-weight: 300; font-variant-numeric: tabular-nums; background: linear-gradient(135deg, #FF9F43, #F0532B); }\n.sheet-lengths { display: grid; grid-template-columns: repeat(auto-fit, minmax(64px, 1fr)); gap: 8px; }\n.sheet-lengths button { height: 46px; padding: 0 6px; border-radius: 12px; }\n.sheet-lengths button.on, .sheet-lengths button.on:hover:not(:disabled) { background: var(--hl-accent); border-color: transparent; color: #fff; font-weight: 500; }\n.sheet-live { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 18px; padding: 8px 0; }\n.sheet-live .icon-wrap { --mdc-icon-size: 22px; color: var(--secondary-text-color); }\n.sheet-go { height: 52px; border: 0; border-radius: 14px; font-size: 16px; font-weight: 600; color: #fff; background: var(--hl-accent); }\n.sheet-go:hover:not(:disabled) { background: var(--hl-accent); filter: brightness(1.06); }\n.sheet-go.stop { color: var(--error-color, #db4437); background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent); }\n.sheet-cancel { align-self: center; padding: 8px 16px; font-size: 15px; }\n@keyframes hl-fade { from { opacity: 0; } }\n@keyframes hl-rise { from { transform: translateY(40px); opacity: 0; } }\n\n/* Device controls (opened from a card) */\n.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }\n.channel { gap: 16px; }\n.holiday-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; background: var(--hl-soft); }\n.holiday-row > .icon-wrap { --mdc-icon-size: 20px; color: var(--secondary-text-color); }\n.holiday-text { flex: 1; }\n.holiday-row > button { padding: 6px 12px; }\n.target-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding-top: 8px; }\n.target-text { display: flex; flex-direction: column; gap: 2px; }\n.target-label { font-size: 16px; font-weight: 500; }\n.target-control { display: inline-flex; align-items: center; gap: 6px; padding: 4px; border-radius: 999px; background: var(--hl-soft); }\n.target-btn { width: 44px; height: 44px; background: var(--card-background-color); }\n.target-btn .icon-wrap { --mdc-icon-size: 22px; }\n.target-value { min-width: 76px; text-align: center; font-size: 24px; font-weight: 500; font-variant-numeric: tabular-nums; }\n.target-value.pending { color: var(--hl-heat); }\n.card-actions { display: flex; align-items: center; gap: 8px; }\n\n.stepper { background: var(--card-background-color); }\n.stepper { display: inline-flex; align-items: center; gap: 4px; padding: 2px; border-radius: 999px; background: var(--hl-soft); }\n.stepper button.round { border-color: transparent; background: transparent; width: 32px; height: 32px; }\n.stepper button.round:hover { background: var(--card-background-color); }\n.stepper-value { min-width: 56px; text-align: center; font-variant-numeric: tabular-nums; font-weight: 500; }\n\n/* Schedule: a status line, a strip of day circles, and the day's time slots */\n.sched { display: flex; flex-direction: column; gap: 14px; position: relative; padding-bottom: 72px; }\n\n.sched-status { margin: 0; font-size: 14px; }\n.sched-days { display: flex; justify-content: space-between; gap: 4px; padding: 12px 10px; border-radius: 16px; background: color-mix(in srgb, var(--hl-brand) 7%, var(--card-background-color)); border: 1px solid var(--divider-color); }\n.sched-day { position: relative; width: 44px; height: 44px; padding: 0; border-radius: 50%; border: 2px solid transparent; background: transparent; font-size: 18px; font-weight: 500; color: var(--primary-text-color); }\n.sched-day:hover:not(:disabled) { background: color-mix(in srgb, var(--hl-brand) 10%, transparent); }\n.sched-day.today { border-color: var(--hl-brand); color: var(--hl-brand); }\n.sched-day.on, .sched-day.on:hover:not(:disabled) { background: var(--hl-brand); border-color: var(--hl-brand); color: #fff; }\n.sched-dot { position: absolute; top: 2px; right: 2px; width: 8px; height: 8px; border-radius: 50%; background: var(--warning-color, #ffa600); border: 2px solid var(--card-background-color); }\n.sched-list { display: flex; flex-direction: column; gap: 4px; }\n.sched-empty { margin: 8px 4px; }\n.slot { justify-content: flex-start; gap: 18px; padding: 10px 8px; border: 0; border-radius: 16px; background: transparent; text-align: left; }\n.slot:hover:not(:disabled) { background: var(--hl-soft); }\n.slot-badge { width: 58px; height: 58px; flex: none; border-radius: 50%; border: 3px solid var(--hl-brand); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 500; color: var(--primary-text-color); font-variant-numeric: tabular-nums; }\n.slot-badge.off { border-color: var(--divider-color); color: var(--secondary-text-color); }\n.slot-badge.off .icon-wrap, .slot-badge.add .icon-wrap { --mdc-icon-size: 24px; }\n.slot-badge.add { border: 2px dashed var(--divider-color); color: var(--secondary-text-color); }\n.slot-time { flex: 1; font-size: 20px; font-variant-numeric: tabular-nums; }\n.slot-add .slot-time { font-size: 16px; color: var(--secondary-text-color); }\n.slot-chev { color: var(--secondary-text-color); }\n/* Unwritten changes: a dark bar across the bottom, above the tab bar on phones. */\n.sched-save { position: sticky; bottom: 16px; z-index: 2; display: flex; align-items: center; gap: 10px; padding: 8px 8px 8px 16px; border-radius: 16px; background: var(--primary-text-color); color: var(--card-background-color); }\n.sched-save-icon { --mdc-icon-size: 20px; opacity: .8; }\n.sched-undo { border: 0; background: transparent; color: inherit; opacity: .8; padding: 10px 12px; }\n.sched-undo:hover:not(:disabled) { background: color-mix(in srgb, var(--card-background-color) 12%, transparent); opacity: 1; }\n.sched-write { border: 0; border-radius: 12px; padding: 10px 20px; background: var(--hl-brand); color: #fff; font-weight: 600; }\n.sched-write:hover:not(:disabled) { background: var(--hl-brand); filter: brightness(1.06); }\n.fab-wrap.raised { bottom: 96px; }\n.sched-changed { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 15px; }\n.fab-wrap { position: fixed; right: 24px; bottom: 24px; z-index: 4; }\n.fab { width: 56px; height: 56px; padding: 0; border-radius: 50%; border: 0; background: var(--hl-brand); color: #fff; }\n.fab:hover:not(:disabled) { background: var(--hl-brand); filter: brightness(1.06); }\n.fab .icon-wrap { --mdc-icon-size: 26px; }\n.fab-backdrop { position: fixed; inset: 0; }\n.fab-menu { position: absolute; right: 0; bottom: 66px; min-width: 260px; display: flex; flex-direction: column; padding: 6px; border-radius: 16px; background: var(--card-background-color); border: 1px solid var(--divider-color); }\n.fab-menu button { justify-content: flex-start; gap: 10px; border: 0; border-radius: 10px; padding: 12px; background: transparent; }\n.fab-menu button:hover:not(:disabled) { background: var(--hl-soft); }\n.sheet-time { font: inherit; font-size: 28px; padding: 10px 14px; border-radius: 14px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); color-scheme: light dark; text-align: center; }\n.sheet-note { margin: -6px 0 0; text-align: center; }\n.room-sheet { max-height: calc(100vh - 32px); overflow-y: auto; }\n.room-sheet .sheet-live .heating { color: var(--hl-heat); }\n.room-sheet-actions { display: flex; justify-content: space-between; align-items: center; }\n.room-sheet-actions .sheet-cancel { align-self: auto; }\n.room-sensor-note { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: -8px; text-align: center; --mdc-icon-size: 16px; }\n.room-sensor-note.warn { color: var(--warning-color, #ffa600); }\n.sensor-toggle { display: flex; flex-direction: column; gap: 6px; max-width: 420px; }\n.sensor-toggle-main { justify-content: flex-start; gap: 12px; padding: 11px 14px; border: 1px solid var(--divider-color); border-radius: 12px; background: transparent; text-align: left; }\n.sensor-toggle-main:hover:not(:disabled) { background: transparent; }\n.sensor-toggle .warn { color: var(--warning-color, #ffa600); }\n.room-sheet-row { display: flex; align-items: center; gap: 10px; width: 100%; padding: 12px 14px; border-radius: 14px; border: 1px solid var(--divider-color); background: transparent; text-align: left; justify-content: flex-start; }\n.room-sheet-row > span:nth-child(2) { flex: 1; }\n.room-sheet-row .icon-wrap { color: var(--secondary-text-color); }\n.room-schedule { max-width: 520px; gap: 14px; }\n.room-schedule-head { display: flex; align-items: center; gap: 10px; }\n.room-schedule-head .page-title { flex: 1; min-width: 0; }\n.room-schedule-head h2 { font-size: 20px; }\n.room-schedule-note { margin: 0; }\n.room-schedule-mode { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; border: 1px solid var(--divider-color); }\n.room-schedule-mode-text { flex: 1; }\n.room-schedule-mode .icon-wrap { color: var(--secondary-text-color); }\n.room-schedule-notes { margin: 0; padding: 10px 14px 10px 28px; border-radius: 10px; background: color-mix(in srgb, var(--warning-color, #ffa600) 12%, transparent); display: flex; flex-direction: column; gap: 4px; }\n/* In a dialog the save bar and the ... button stick to its bottom instead of the page's. */\n.sched.embedded { padding-bottom: 0; }\n.sched.embedded .sched-save { bottom: 0; }\n.sched.embedded .fab-wrap { position: sticky; right: auto; bottom: 0; align-self: flex-end; }\n.sched.embedded .fab-wrap.raised { bottom: 64px; }\n.valve-count { margin-left: 8px; padding: 2px 8px; border-radius: 999px; font-size: 12px; background: color-mix(in srgb, var(--hl-brand) 14%, transparent); color: var(--hl-brand); }\n.valve-picker { display: flex; flex-direction: column; gap: 8px; }\n.valve-search { display: flex; align-items: center; gap: 8px; padding: 0 6px 0 12px; border-radius: 12px; background: var(--hl-soft); color: var(--secondary-text-color); --mdc-icon-size: 20px; }\n.valve-search input { flex: 1; min-width: 0; font: inherit; font-size: 15px; padding: 10px 0; border: 0; background: transparent; color: var(--primary-text-color); outline: none; }\n.valve-search input::-webkit-search-cancel-button { display: none; }\n.valve-search .round { width: 30px; height: 30px; }\n.valve-search:focus-within { outline: 2px solid var(--primary-color); outline-offset: 0; }\n.valve-list { display: flex; flex-direction: column; border: 1px solid var(--divider-color); border-radius: 14px; overflow-y: auto; max-height: 300px; overscroll-behavior: contain; }\n.valve-pick { flex: none; display: flex; align-items: center; gap: 8px; padding-right: 10px; }\n.valve-pick + .valve-pick { border-top: 1px solid var(--divider-color); }\n.valve-pick.on { background: color-mix(in srgb, var(--hl-brand) 7%, transparent); }\n.valve-pick-main { flex: 1; min-width: 0; justify-content: flex-start; gap: 12px; padding: 11px 6px 11px 14px; border: 0; border-radius: 0; background: transparent; text-align: left; }\n.valve-pick-main:hover:not(:disabled) { background: transparent; }\n.valve-check { width: 22px; height: 22px; flex: none; border-radius: 50%; border: 1.5px solid var(--divider-color); display: flex; align-items: center; justify-content: center; --mdc-icon-size: 16px; color: #fff; }\n.valve-check.on { background: var(--hl-brand); border-color: var(--hl-brand); }\n.valve-pick-text { flex: 1; min-width: 0; display: flex; flex-direction: column; font-size: 14.5px; }\n.valve-pick-read { color: var(--secondary-text-color); white-space: nowrap; font-variant-numeric: tabular-nums; }\n.valve-pick .warn { color: var(--warning-color, #ffa600); }\n.valve-find { flex: none; padding: 5px 10px; border-radius: 999px; font-size: 12.5px; color: var(--secondary-text-color); --mdc-icon-size: 16px; }\n.valve-find.on, .valve-find.on:disabled { opacity: 1; border-color: var(--hl-brand); color: var(--hl-brand); background: color-mix(in srgb, var(--hl-brand) 10%, transparent); }\n.setup-intro { text-align: center; margin: -6px 8px 0; line-height: 1.45; }\n.setup-list { display: flex; flex-direction: column; gap: 8px; }\n.setup-room { display: flex; flex-direction: column; gap: 8px; border: 1px solid var(--divider-color); border-radius: 14px; padding-bottom: 0; }\n.setup-room.on { border-color: var(--hl-brand); background: color-mix(in srgb, var(--hl-brand) 6%, transparent); }\n.setup-room.on select { margin: 0 14px 12px 48px; }\n.setup-room-main { justify-content: flex-start; align-items: flex-start; gap: 12px; padding: 12px 14px; border: 0; background: transparent; text-align: left; }\n.setup-room-main:hover:not(:disabled) { background: transparent; }\n.setup-room-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; font-size: 15px; font-weight: 500; }\n.setup-room-text .muted { font-weight: 400; }\n.room-sheet.room-editor h2 { text-align: center; font-size: 22px; }\n.danger-text { color: var(--error-color, #db4437); }\n\n/* Rooms */\n.dot-heating { width: 10px; height: 10px; border-radius: 50%; background: var(--hl-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hl-accent) 20%, transparent); flex: none; }\n.zone { display: flex; flex-direction: column; gap: 10px; }\n.zone h3 { margin: 4px 0 0; }\n/* Room for the + button under the last room / device. */\n.devices-page { padding-bottom: 72px; }\n.add-options { display: flex; flex-direction: column; gap: 8px; }\n.add-option { justify-content: flex-start; gap: 14px; padding: 14px; border-radius: 16px; text-align: left; }\n.add-text { flex: 1; display: flex; flex-direction: column; gap: 2px; }\n.add-text b { font-size: 16px; font-weight: 500; }\n.room.heating { --hl-accent: var(--hl-heat); }\n.chip.heating { background: color-mix(in srgb, var(--hl-heat) 16%, transparent); color: var(--hl-heat); }\n.room-now { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; }\n.room-temp { font-size: 44px; font-weight: 300; line-height: 1; font-variant-numeric: tabular-nums; }\n.room-temp .unit { font-size: 18px; margin-left: 2px; color: var(--secondary-text-color); vertical-align: top; }\n.room-target { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }\n.valves { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }\n.valve { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-top: 1px solid var(--divider-color); font-size: 14px; }\n.valve.off { opacity: .6; }\n.valve-icon { color: var(--secondary-text-color); --mdc-icon-size: 18px; }\n.valve-icon.heating { color: var(--hl-heat); }\n.valve-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.valve-temps { font-variant-numeric: tabular-nums; white-space: nowrap; }\n.battery { display: inline-flex; align-items: center; gap: 3px; font-size: 12px; color: var(--secondary-text-color); font-variant-numeric: tabular-nums; }\n.battery .icon-wrap { --mdc-icon-size: 16px; }\n.battery.low { color: var(--warning-color, #ffa600); font-weight: 500; }\n.room-editor h2 { margin: 0; }\n.field { display: flex; flex-direction: column; gap: 6px; border: 0; padding: 0; margin: 0; min-width: 0; }\n.field > span, .field legend { font-size: 13px; font-weight: 500; color: var(--secondary-text-color); padding: 0; margin-bottom: 6px; }\n.field input[type=text], .field select { width: 100%; max-width: 420px; }\n.checklist { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 16px; padding: 6px 0; }\n.checklist > .muted { width: 100%; }\n.pick { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; cursor: pointer; }\n\n/* A device's own page (heating or hot water), opened from its Overview card */\n.device-page { display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 640px; margin: 0 auto; }\n.device-page .history { max-width: none; }\n.page-head { display: flex; align-items: center; gap: 6px; margin-left: -8px; }\n.page-head .round { width: 44px; height: 44px; }\n.page-head .round .icon-wrap { --mdc-icon-size: 26px; }\n.page-title { display: flex; flex-direction: column; }\n.page-title h2 { font-size: 24px; font-weight: 700; }\n.page-tabs { margin-top: -6px; }\n.card.device.page .device-head, .device-head.static { cursor: default; }\n.device-head.static:hover { background: transparent; }\n.room-device.off { opacity: .6; }\n/* Devices tab: about the hardware, not controlling it */\n.card.hw { gap: 12px; padding: 18px; }\n.card.hw.off .device-name, .card.hw.off .facts { opacity: .6; }\n.hw-head { display: flex; align-items: center; gap: 12px; }\n.online { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--secondary-text-color); white-space: nowrap; }\n.online i { width: 8px; height: 8px; border-radius: 50%; background: var(--success-color, #43a047); }\n.online.no { color: var(--warning-color, #ffa600); }\n.online.no i { background: var(--warning-color, #ffa600); }\n.facts { display: flex; flex-wrap: wrap; gap: 6px; }\n.fact { display: inline-flex; align-items: center; gap: 5px; padding: 5px 10px; border-radius: 999px; background: var(--hl-soft); font-size: 13px; color: var(--secondary-text-color); }\n.fact .icon-wrap { --mdc-icon-size: 15px; }\n.fact.warn { color: var(--warning-color, #ffa600); background: color-mix(in srgb, var(--warning-color, #ffa600) 14%, transparent); font-weight: 500; }\n.hw-links { display: flex; gap: 8px; border-top: 1px solid var(--divider-color); margin: 0 -18px -18px; padding: 6px 8px; }\n.hw-link { flex: 1; justify-content: space-between; border: 0; background: transparent; padding: 10px; font-weight: 500; }\n.hw-link .icon-wrap { color: var(--secondary-text-color); }\n/* The page title already names it. */\n.card.device.page .device-icon, .card.device.page .device-name { display: none; }\n.history-title { font-size: 24px; font-weight: 700; margin: 4px 0 -4px; }\n.card.device.page .device-head:hover { background: transparent; }\n\n/* Stats: heating history, after the Hive app's */\n.history { display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 640px; margin: 0 auto; }\n/* Underlined tabs: receivers on Stats, Control · Schedule · History on a device page. */\n.history-tabs, .page-tabs { display: flex; border-bottom: 1px solid var(--divider-color); overflow-x: auto; scrollbar-width: none; }\n.history-tabs button, .page-tabs button { flex: 1 0 auto; border: 0; border-radius: 0; background: transparent; padding: 12px 16px; color: var(--secondary-text-color); border-bottom: 2px solid transparent; margin-bottom: -1px; }\n.history-tabs button.on, .page-tabs button.on { color: var(--hl-brand); border-bottom-color: var(--hl-brand); font-weight: 500; }\n.history-controls { display: flex; justify-content: space-between; gap: 12px; }\n.history-toggle { display: inline-flex; gap: 2px; padding: 4px; border-radius: 999px; background: var(--hl-soft); }\n.history-toggle button { min-width: 44px; height: 40px; padding: 0 14px; border: 0; border-radius: 999px; background: transparent; font-weight: 600; color: var(--primary-text-color); }\n.history-toggle button.wide { min-width: 60px; }\n.history-toggle button.on, .history-toggle button.on:hover:not(:disabled) { background: var(--hl-brand); color: #fff; }\n.history-toggle .icon-wrap { --mdc-icon-size: 22px; }\n.history-date { display: flex; align-items: center; justify-content: space-between; }\n.history-date .round { width: 40px; height: 40px; }\n.history-range { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 999px; background: color-mix(in srgb, var(--hl-brand) 10%, transparent); color: var(--hl-brand); font-weight: 500; }\n.history-range .icon-wrap { --mdc-icon-size: 18px; }\n.history-summary { display: flex; align-items: center; padding: 22px 12px; border-radius: 18px; background: color-mix(in srgb, var(--hl-brand) 7%, var(--card-background-color)); border: 1px solid var(--divider-color); }\n.history-summary > div { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; }\n.history-summary b { font-size: 30px; font-weight: 500; letter-spacing: -.01em; font-variant-numeric: tabular-nums; }\n.history-summary i { width: 1px; align-self: stretch; background: var(--divider-color); }\n.history-note { margin: -6px 0 0; text-align: center; }\n.history-empty { text-align: center; margin: 24px 0; }\n.history-rows { display: flex; flex-direction: column; gap: 6px; }\n.history-key { align-self: flex-end; display: inline-flex; align-items: center; gap: 4px; }\n.history-key .icon-wrap { --mdc-icon-size: 16px; }\n.history-row { display: grid; grid-template-columns: 64px 1fr auto; align-items: center; gap: 12px; min-height: 40px; }\n.history-day { font-size: 15px; color: var(--secondary-text-color); white-space: nowrap; }\n.history-day span { display: inline-block; min-width: 20px; margin-left: 4px; }\n.history-bar { display: flex; align-items: center; gap: 8px; min-width: 0; }\n.history-bar i { display: block; height: 14px; max-width: calc(100% - 64px); border-radius: 999px; background: var(--hl-brand); flex: none; }\n.history-value { font-size: 15px; font-variant-numeric: tabular-nums; white-space: nowrap; }\n.history-temps { display: inline-flex; gap: 10px; padding: 4px 10px; border-radius: 10px; background: var(--hl-soft); font-size: 13px; color: var(--secondary-text-color); font-variant-numeric: tabular-nums; }\n.history-temps span { color: var(--primary-text-color); }\n.history-row.with-outdoor { grid-template-columns: 64px 1fr auto auto; }\n.history-key.with-outdoor { display: flex; justify-content: flex-end; gap: 16px; align-self: stretch; }\n.history-key span { display: inline-flex; align-items: center; gap: 4px; }\n.history-outdoor { min-width: 52px; text-align: right; font-size: 13px; color: var(--secondary-text-color); font-variant-numeric: tabular-nums; white-space: nowrap; }\n.history-hint { text-align: center; margin: 0; }\n\n/* Settings: grouped rows, like a phone's settings */\n.settings { display: flex; flex-direction: column; gap: 24px; width: 100%; max-width: 640px; margin: 0 auto; }\n.settings-section { display: flex; flex-direction: column; gap: 8px; }\n.settings-section h3 { margin: 0 4px; font-size: 13px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; color: var(--secondary-text-color); }\n.settings-help { margin: -2px 4px 2px; }\n.settings-group { display: flex; flex-direction: column; border: 1px solid var(--divider-color); border-radius: var(--hl-radius); background: var(--card-background-color); overflow: hidden; }\n.settings-row { display: flex; align-items: center; gap: 14px; padding: 14px 16px; min-height: 64px; flex-wrap: wrap; text-align: left; width: 100%; border: 0; border-radius: 0; background: transparent; justify-content: flex-start; transition: background .15s; }\n.settings-group > * + * { border-top: 1px solid var(--divider-color); }\n.settings-row.link:hover:not(:disabled) { background: var(--hl-soft); }\n.settings-row.add .settings-text > span:first-child { color: var(--hl-brand); font-weight: 500; }\n.settings-text { flex: 1 1 180px; display: flex; flex-direction: column; gap: 2px; min-width: 0; font-size: 15px; }\n.settings-row select { max-width: 220px; }\n.room-control { display: flex; flex-direction: column; gap: 14px; }\n.room-control .room-sensor-note { margin-top: 0; justify-content: flex-start; text-align: left; }\n.room-mode-note { margin: -4px 0 0; }\n.room-schedule-page { max-width: none; display: flex; flex-direction: column; gap: 12px; }\n.room-schedule-page .room-schedule-head { justify-content: flex-end; }\n.tidy-action { min-width: 0; height: 40px; padding: 0 18px; font-size: 15px; }\n.stepper .round { touch-action: manipulation; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; }\n.settings-chevron { color: var(--secondary-text-color); }\n.settings-controls { display: flex; gap: 16px; flex-wrap: wrap; margin-left: auto; }\n.adjust { display: flex; flex-direction: column; align-items: center; gap: 4px; }\n.adjust .stepper-value { min-width: 72px; text-align: center; }\n@media (max-width: 600px) { .settings-controls { width: 100%; justify-content: flex-end; } .valve-find-label { display: none; } .valve-find { width: 36px; height: 36px; padding: 0; } }\ncode { font-size: 12px; padding: 1px 5px; border-radius: 5px; background: var(--hl-soft); }\n\n@media (max-width: 600px) {\n  /* Room at the bottom for the tab bar (and the phone's home indicator). */\n  main { padding: 12px 8px calc(88px + env(safe-area-inset-bottom)); gap: 12px; }\n  .card { padding: 14px; }\n  .grid { grid-template-columns: 1fr; }\n  .device-grid { grid-template-columns: 1fr; }\n    .device-big { font-size: 46px; }\n  .sheet-backdrop { align-items: flex-end; padding: 0; }\n  .fab-wrap { right: 16px; bottom: calc(84px + env(safe-area-inset-bottom)); }\n  /* Above the bottom tab bar. */\n  .sched-save { bottom: calc(84px + env(safe-area-inset-bottom)); }\n  .fab-wrap.raised { bottom: calc(156px + env(safe-area-inset-bottom)); }\n  .sched.embedded .sched-save, .sched.embedded .fab-wrap { bottom: 0; right: auto; }\n  .sched.embedded .fab-wrap.raised { bottom: 64px; }\n  .sheet { max-width: none; border-radius: 24px 24px 0 0; padding-bottom: calc(18px + env(safe-area-inset-bottom)); animation: hl-rise .2s ease-out; }\n  /* Phones: the tabs become a bar along the bottom, in thumb reach. */\n  .tabs { position: fixed; left: 0; right: 0; bottom: 0; z-index: 3; margin: 0; gap: 0; justify-content: space-around;\n    padding: 6px 8px calc(6px + env(safe-area-inset-bottom)); overflow: visible;\n    background: var(--card-background-color); color: var(--primary-text-color); border-top: 1px solid var(--divider-color); }\n  .tabs button { flex: 1 1 0; flex-direction: column; gap: 2px; height: 54px; padding: 0; border-radius: 14px; font-size: 11.5px; letter-spacing: 0; opacity: .7; }\n  .tabs button:hover:not(:disabled) { background: transparent; }\n  .tabs button.on, .tabs button.on:hover:not(:disabled) { background: transparent; color: var(--hl-heat); opacity: 1; }\n  .tabs .icon-wrap { --mdc-icon-size: 22px; padding: 3px 16px; border-radius: 999px; transition: background .15s; }\n  .tabs button.on .icon-wrap { background: color-mix(in srgb, var(--hl-heat) 16%, transparent); }\n}\n", St = class extends HTMLElement {
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
			t.textContent = xt;
			let n = document.createElement("div");
			e.append(t, n), this._root = (0, d.createRoot)(n);
		}
		this._render();
	}
	disconnectedCallback() {
		this._root?.unmount(), this._root = void 0, this.shadowRoot?.replaceChildren();
	}
	_render() {
		this._root && this._hass && this._root.render(/* @__PURE__ */ (0, f.jsx)(bt, {
			getHass: () => this._hass,
			narrow: this._narrow,
			onToggleMenu: () => this.dispatchEvent(new Event("hass-toggle-menu", {
				bubbles: !0,
				composed: !0
			}))
		}));
	}
};
customElements.get("hive-local-panel") || customElements.define("hive-local-panel", St);
