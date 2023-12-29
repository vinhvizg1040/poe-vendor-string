!function () {
    "use strict";
    var a = window.location, r = window.document, o = r.currentScript, l = "https://plausible.vz.is/api/event";

    function s(t, e) {
        t && console.warn("Ignoring Event: " + t), e && e.callback && e.callback()
    }

    function t(t, e) {
        if (/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(a.hostname) || "file:" === a.protocol) return s("localhost", e);
        if (window._phantom || window.__nightmare || window.navigator.webdriver || window.Cypress) return s(null, e);
        try {
            if ("true" === window.localStorage.plausible_ignore) return s("localStorage flag", e)
        } catch (t) {
        }
        var n = {},
            i = (n.n = t, n.u = a.href, n.d = o.getAttribute("data-domain"), n.r = r.referrer || null, e && e.meta && (n.m = JSON.stringify(e.meta)), e && e.props && (n.p = e.props), new XMLHttpRequest);
        i.open("POST", l, !0), i.setRequestHeader("Content-Type", "text/plain"), i.send(JSON.stringify(n)), i.onreadystatechange = function () {
            4 === i.readyState && e && e.callback && e.callback()
        }
    }

    var e = window.plausible && window.plausible.q || [];
    window.plausible = t;
    for (var n, i = 0; i < e.length; i++) t.apply(this, e[i]);

    function p() {
        n !== a.pathname && (n = a.pathname, t("pageview"))
    }

    var c, w = window.history;
    w.pushState && (c = w.pushState, w.pushState = function () {
        c.apply(this, arguments), p()
    }, window.addEventListener("popstate", p)), "prerender" === r.visibilityState ? r.addEventListener("visibilitychange", function () {
        n || "visible" !== r.visibilityState || p()
    }) : p()
}();