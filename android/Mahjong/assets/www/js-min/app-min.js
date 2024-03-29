(function ($) {
    function O() {
        var a = SunCalc.getPosition(j, m, k);
        p = a.azimuth;
        z = Math.max(0.01, Math.PI / 4 - Math.max(0, -a.altitude))
    }
    function l(a, i) {
        var b = Math.cos(i),
            c = Math.cos(z),
            d = Math.sin(i),
            f = Math.sin(z),
            g = b * Math.cos(a - p);
        b *= Math.sin(a - p);
        var h = 2 / (1 + (d * f + g * c)),
            j = r / s * G;
        return {
            x: H / 2 + h * b * j,
            y: r / 2 - h * (d * c - g * f) * j
        }
    }
    function A(a) {
        var i, e, c;
        for (i = 0, e = a.length; i < e; i++) c = a[i], i ? b.lineTo(c.x, c.y) : b.moveTo(c.x, c.y)
    }
    function I(a, i, e, c) {
        var d = i.x,
            f = i.y;
        e && c && (i = Math.atan2(e.y - i.y, e.x - i.x), d += c * Math.cos(i), f += c * Math.sin(i));
        b.fillText(a, d, f)
    }
    function P(a, i) {
        var b = [],
            c, d;
        for (c = 0; c <= i; c++) d = -Math.PI + 2 * Math.PI * (c / i), b.push(l(d, a));
        return b
    }
    function aa(a, i, e) {
        var c, d;
        for (c in a) if (a.hasOwnProperty(c)) d = SunCalc.getPosition(a[c], m, k), d = l(d.azimuth, d.altitude), b.beginPath(), b.arc(d.x, d.y, e, 0, Math.PI * 2, !1), b.save(), b.fillStyle = i, b.fill(), b.restore()
    }
    function ba(a, i, e) {
        b.beginPath();
        var c = SunCalc.getPosition(j, m, k),
            c = l(c.azimuth, c.altitude),
            d = r / s * 3;
        b.arc(c.x, c.y, d, 0, Math.PI * 2, !1);
        b.save();
        b.globalAlpha = e;
        i ? (e = b.createRadialGradient(c.x, c.y, 0, c.x, c.y, d), e.addColorStop(0.3, a), e.addColorStop(1, i), b.fillStyle = e) : b.fillStyle = a;
        b.fill();
        b.restore()
    }
    function w(a, i, e, c) {
        b.beginPath();
        var d = a,
            f = new Date(d);
        f.setHours(0);
        f.setMinutes(0);
        for (var g = (new Date(f)).setDate(d.getDate() + 1), a = [], d = new Date(f); d < g;) a.push(new Date(d)), d.setTime(d.valueOf() + 15E5);
        a.push(g);
        var d = [],
            h;
        for (f = 0, g = a.length; f < g; f++) h = SunCalc.getPosition(a[f], m, k), h = l(h.azimuth, h.altitude), d.push(h);
        A(d);
        b.save();
        b.strokeStyle = i;
        b.lineWidth = e;
        b.lineCap = "round";
        b.globalAlpha = c;
        b.stroke();
        b.restore()
    }
    function ca(a) {
        var i = new Date;
        i.setMonth(a ? 5 : 11);
        i.setDate(21);
        return i
    }
    function B(a) {
        return 60 * a.getHours() + a.getMinutes()
    }
    function Da(a, i, b) {
        var c = [],
            d, f, g, h, j, l;
        for (j = 0, l = a.length; j < l; j++) g = a[j], h = i[j], !g || !h ? c.push(null) : (d = Math.round(g[0] + (h[0] - g[0]) * b), f = Math.round(g[1] + (h[1] - g[1]) * b), g = Math.round(g[2] + (h[2] - g[2]) * b), c.push([d, f, g]));
        return c
    }
    function C(a) {
        return a ? "rgb(" + a.join(",") + ")" : null
    }
    function Ea(a) {
        var b = "nightEnd,dawn,sunrise,goldenHourEnd,solarNoon,goldenHour,sunset,dusk,night".split(","),
            b = b.filter(function (b) {
                return !isNaN(a[b])
            }),
            e = B(j);
        b.sort(function (b, i) {
            var c = B(a[b]),
                d = B(a[i]);
            return (1440 + e - c) % 1440 - (1440 + e - d) % 1440
        });
        var c = b[0],
            b = b[b.length - 1],
            d = B(a[c]),
            f = B(a[b]) - d;
        return Da(da[c], da[b], f ? (e - d) / f : 0)
    }
    function x() {
        var a = document.createElement("div");
        a.className = "label";
        Q.appendChild(a);
        this.setContent = function (b, e) {
            a.innerHTML = b + "<br /><b>" + e + "</b>"
        };
        this.setPos = function (b, e, c) {
            a.style.left = b.x + e + "px";
            a.style.top = b.y + c + "px"
        }
    }
    function ea(a) {
        return a < 10 ? "0" + a : a
    }
    function R(a) {
        return ea(a.getHours()) + ":" + ea(a.getMinutes())
    }
    function Fa(a, b) {
        return " " + b.toLowerCase()
    }
    function fa() {
        var a = ca(!0),
            i = ca(!1),
            e = SunCalc.getTimes(j, m, k);
        delete e.sunriseEnd;
        delete e.sunsetStart;
        e.solarMidnight = new Date(e.solarNoon.valueOf() - 432E5);
        e.midnight = new Date(j);
        e.midnight.setHours(0);
        e.midnight.setMinutes(0);
        var c = Ea(e),
            d = C(c[3]),
            f = C(c[4]),
            g = l(p, Math.PI / 6),
            h = l(p, -Math.PI / 4),
            g = b.createLinearGradient(g.x, g.y, h.x, h.y);
        g.addColorStop(0, d);
        g.addColorStop(1, f);
        b.save();
        b.fillStyle = g;
        b.fillRect(0, 0, H, r);
        b.restore();
        w(a, "#ffc268", 3, 0.25);
        w(i, "#a4f8ff", 3, 0.15);
        w(j, "#f6ec5a", 4, 0.25);
        aa(e, "#ADD82B", 5);
        ba("#fff98a", 0, 0.3);
        d = C(c[0]);
        f = C(c[1]);
        g = C(c[2]);
        b.beginPath();
        A(P(0, 36));
        b.save();
        var h = l(p, Math.PI / 2),
            v = l(p, 0),
            h = b.createLinearGradient(h.x, h.y, v.x, v.y);
        h.addColorStop(0, d);
        f && h.addColorStop(0.5, f);
        h.addColorStop(1, g);
        b.fillStyle = h;
        b.fill();
        b.restore();
        b.textBaseline = "middle";
        b.textAlign = "center";
        c = c[0];
        d = (c[0] + c[1] + c[2]) / 768;
        c = 0.25 + d * 0.4;
        d = Math.min(0.5 + d, 1);
        b.save();
        b.font = "12px Tahoma, Verdana, sans-serif";
        b.fillStyle = "white";
        b.globalAlpha = d;
        b.beginPath();
        for (var f = 10, d = 90 / f, f = 360 / f, v = Math.round(f / 2), t, g = 1; g < d; g++) h = g / d * Math.PI / 2, t = P(h, f), h = Math.round(h * G) + "\u00b0", A(t), I(h, t[v]);
        I("90\u00b0", l(0, Math.PI / 2), l(0, Math.PI / 2 - 0.01), 12);
        for (g = 0; g < f; g++) {
            v = h = -Math.PI + g / f * 2 * Math.PI;
            t = d;
            for (var n = [], J = void 0, q = void 0, J = 0; J <= t; J++) q = Math.PI / 2 * (J / t), n.push(l(v, q));
            t = n;
            h = Math.round(h * G) + "\u00b0";
            A(t);
            I(h, t[0])
        }
        b.restore();
        b.save();
        b.strokeStyle = "#fff";
        b.globalAlpha = c;
        b.stroke();
        b.restore();
        b.save();
        b.font = "bold 18px Tahoma, Verdana, sans-serif";
        b.fillStyle = "#eaff00";
        c = "东,西南,西,西北,北,东北,东,东南".split(",");
        for (d = 0, f = c.length; d < f; d++) h = d * Math.PI / 4, g = l(h, 0), h = l(h, -0.01), I(c[d], g, h, 20);
        b.restore();
        c = Math.max(H, r) / 25;
        d = 15 + c;
        f = r - 15 - c;
        g = Math.PI / 2 + p;
        h = s / 2 * S;
        b.save();
        b.beginPath();
        b.arc(d, f, c, 0, 2 * Math.PI, !1);
        b.globalAlpha = 0.7;
        b.fillStyle = "#67dcff";
        b.strokeStyle = "white";
        b.lineWidth = 2;
        b.fill();
        b.stroke();
        b.beginPath();
        b.moveTo(d, f);
        b.arc(d, f, c, g - h, g + h, !1);
        b.fillStyle = "yellow";
        b.fill();
        b.globalAlpha = 1;
        b.font = "bold 14px Tahoma, Verdana, sans-serif";
        b.fillStyle = "white";
        b.fillText("N", d, f - c + 7);
        b.restore();
        b.save();
        b.beginPath();
        A(P(0, 36));
        b.clip();
        w(a, "#ffc268", 3, 0.7);
        w(i, "#a4f8ff", 3, 0.7);
        w(j, "#f6ec5a", 4, 0.9);
        aa(e, "#f6ec5a", 5);
        ba("#fff98a", "#ffbb43", 1);
        b.restore();
        var o;
        Q.style.display = "none";
        for (o in e) if (e.hasOwnProperty(o) && !isNaN(e[o]) && o !== "midnight") {
            c = x.get(o);
            if (K || D) d = R(e[o]), c.setContent(o.replace(/([A-Z])/g, Fa), d);
            d = SunCalc.getPosition(e[o], m, k);
            c.setPos(l(d.azimuth, d.altitude), 2, 2)
        }
        c = x.get("sun");
        d = SunCalc.getPosition(j, m, k);
        e = r / s * 3;
        c.setContent("at " + Math.round(d.altitude * G) + "\u00b0", R(j));
        c.setPos(l(d.azimuth, d.altitude), e + 5, -18);
        D && (a = SunCalc.getTimes(a, m, k), T = SunCalc.getPosition(a.solarNoon, m, k), a = SunCalc.getTimes(i, m, k), U = SunCalc.getPosition(a.solarNoon, m, k));
        i = x.get("june21");
        a = x.get("dec21");
        i.setContent("夏至", "六月 21");
        a.setContent("冬至", "十二月 21");
        i.setPos(l(T.azimuth, T.altitude), -40, -16);
        a.setPos(l(U.azimuth, U.altitude), -40, -16);
        Q.style.display = "";
        ga();
        D = K = !1
    }
    function q() {
        ha(fa, E)
    }
    function Ga() {
        window.scrollTo(0, 0);
        var a = document.body.offsetHeight;
        E.width = H = document.body.offsetWidth;
        E.height = r = a;
        fa()
    }
    function ia() {
        ha(Ga, E)
    }
    function ja(a) {
        var b = a.clientY - ka,
            e = s / r * S;
        p = la - (a.clientX - ma) * e;
        z = Math.min(Math.max(na + b * e, 0.01), Math.PI / 2);
        q()
    }
    function Ha() {
        document.onmousemove = null;
        document.onmouseup = null;
        document.body.style.cursor = ""
    }
    function V(a) {
        ma = a.clientX;
        ka = a.clientY;
        la = p;
        na = z;
        if (!u) document.onmousemove = ja, document.onmouseup = Ha, document.selection && document.selection.empty && document.selection.empty(), document.body.style.cursor = "move", a.preventDefault()
    }

    function Ia() {
        return !1
    }
    function oa(a) {
        var b = 0;
        a.wheelDelta && (b = a.wheelDelta / 120);
        a.detail && (b = -a.detail / 3);
        s = Math.min(Math.max(s - b * 10, 60), 230);
        q()
    }
    function pa(a, b, e) {
        function c(a) {
            b.style.left = a * 100 + "%"
        }
        function d(a) {
            k = m / 100 + (a.pageX - l) / j;
            k = Math.min(Math.max(0, k), 0.9999);
            c(k);
            e(k)
        }
        function f() {
            if (!u) document.onmousemove = null, document.onmouseup = null, document.body.style.cursor = "";
            b.className = ""
        }
        function g(a) {
            l = a.pageX;
            m = parseFloat(b.style.left);
            if (!u) document.onmousemove = d, document.onmouseup = f, document.body.style.cursor = "e-resize";
            b.className = "handle-active";
            u || a.stopPropagation();
            return !1
        }
        function h(a) {
            k = a.layerX / j;
            c(k);
            e(k);
            g(a)
        }
        var j = a.offsetWidth,
            l, m, k;
        
        window.addEventListener("resize", function () {
            j = a.offsetWidth
        }, !1);
        this.setValue = function (a) {
            c(a)
        };
        if (u) {
            var n = function (a) {
                    d(a.touches[0]);
                    a.preventDefault()
                },
                o = function () {
                    f();
                    document.removeEventListener("touchmove", n, !1);
                    document.removeEventListener("touchend", o, !1)
                };
            b.addEventListener("touchstart", function (a) {
                g(a.touches[0]);
                document.addEventListener("touchmove", n, !1);
                document.addEventListener("touchend", o, !1);
                a.preventDefault();
                a.stopPropagation()
            }, !1)
        } else b.onmousedown = g, a.onmousedown = h
    }
    function W(a) {
        a.addEventListener("mousedown", function (a) {
            a.stopPropagation()
        }, !1)
    }
    var j, m = 40.71,
        k = -74,
        s = 110,
        p, z;
    j = new Date;
    O();
    var K = !0,
        D = !0,
        ga = !0,
        E = document.getElementById("canvas"),
        b = E.getContext("2d"),
        H, r, S = Math.PI / 180,
        G = 1 / S,
        n = [0, 0, 0],
        y = [27, 32, 58],
        qa = [48, 56, 94],
        ra = [50, 90, 100],
        L = [103, 130, 173],
        sa = [255, 255, 0],
        X = [1, 178, 229],
        ta = [175, 240, 255],
        ua = [47, 196, 235],
        F = [15, 127, 21],
        M = [115, 149, 85],
        Y = [51, 216, 60],
        da = {
            nightEnd: [n, n, y, ra, n],
            dawn: [y, y, L, M, n],
            sunrise: [qa, L, sa, F, M],
            goldenHourEnd: [X, ua, ta, Y, F],
            solarNoon: [
                [0, 145, 205], X, [138, 232, 255], Y, F],
            goldenHour: [X, ua, ta, Y, F],
            sunset: [qa, L, sa, F, M],
            dusk: [y, y, L, M, n],
            night: [n, n, y, ra, n]
        },
        Q = document.getElementById("labels"),
        va = {};
    x.get = function (a) {
        var b = va[a];
        b || (b = va[a] = new x);
        return b
    };
    var T, U, ha = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function (a) {
                setTimeout(a, 1E3 / 60)
            }
        }();
    window.onresize = ia;
	var u = document.documentElement.hasOwnProperty("ontouchstart"),
	ma, ka, la, na;
	if (!u) document.onmousedown = V, document.onselectstart = Ia;
	window.addEventListener("DOMMouseScroll", oa, !1);
    document.onmousewheel = window.onmousewheel = oa;
    if (u) {
        var Z = function (a) {
                for (var b = 0, e = a.targetTouches.length, c = 0, d = 0, f; b < e; b++) f = a.targetTouches[b], c += f.clientX / e, d += f.clientY / e;
                return {
                    clientX: c,
                    clientY: d
                }
            },
            wa = function (a) {
                ja(Z(a));
                a.preventDefault()
            },
            xa = function (a) {
                a.targetTouches.length > 0 && V(Z(a));
                document.removeEventListener("touchmove", wa, !1);
                document.removeEventListener("touchend", xa, !1)
            };
        document.addEventListener("touchstart", function (a) {
            V(Z(a));
            document.addEventListener("touchmove", wa, !1);
            document.addEventListener("touchend", xa, !1)
        }, !1);
        var ya;
        document.addEventListener("gesturestart", function () {
            ya = s
        }, !1);
        document.addEventListener("gesturechange", function (a) {
            s = Math.min(Math.max(ya / a.scale, 60), 230);
            q();
            a.preventDefault()
        }, !1)
    }
    var za = document.getElementById("time-handle"),
        Aa = document.getElementById("date-handle"),
        Ja = new pa(document.getElementById("time-slider"), za, function (a) {
            a *= 1440;
            j.setHours(Math.floor(a / 60));
            j.setMinutes(a % 60);
            K = !0;
            q()
        }),
        Ba = new Date(j.getFullYear(), 0, 1),
        Ka = new pa(document.getElementById("date-slider"), Aa, function (a) {
            a = new Date(Ba.valueOf() + Math.ceil(a * 864E5) * 365);
            a.setHours(j.getHours());
            a.setMinutes(j.getMinutes());
            j = a;
            K = !0;
            q()
        }),
        ga = function () {
            za.innerHTML = R(j);
            Aa.innerHTML = "一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月".split(",")[j.getMonth()] + " " + j.getDate();
            Ja.setValue((j.getHours() * 60 + j.getMinutes()) / 1440);
            Ka.setValue((j - Ba) / 31536E6)
        };
    $.Location = {};
    $.Location.handleGeoIpResponse = function (a) {
        var b = [];
        a.city ? b.push(a.city) : a.region_name && b.push(a.region_name);
        a.country_name && b.push(a.country_name);
        location.value = b.join(", ");
        m = a.latitude;
        k = a.longitude;
        O();
        D = !0;
        q()
    };
    var N = document.getElementById("detect"),
        Ca = navigator.geolocation;
    Ca ? N.onclick = function () {
        N.disabled = !0;
        Ca.getCurrentPosition(function (a) {
            m = a.coords.latitude;
            k = a.coords.longitude;
            location.value = m + ", " + k;
            D = !0;
            O();
            q();
            N.disabled = !1
        });
        return !1
    } : N.disabled = !0;
    W(document.getElementById("controls"));
    W(document.getElementById("logo"));
    W(document.getElementById("copy"));
    ia();
    (function (a) {
        var b = document.createElement("script");
        b.charset = "utf-8";
        b.src = a;
        document.body.appendChild(b)
    })("http://freegeoip.net/json/?callback=Location.handleGeoIpResponse")
})(this);