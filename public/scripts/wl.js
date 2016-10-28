/*! c9lient v0.0.1 !*/
!
function($) {
    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,

    meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };
    $.toJSON = "object" == typeof JSON && JSON.stringify ? JSON.stringify: function(a) {
        if (null === a) return "null";
        var b = typeof a;
        if ("undefined" === b) return void 0;
        if ("number" === b || "boolean" === b) return "" + a;
        if ("string" === b) return $.quoteString(a);
        if ("object" === b) {
            if ("function" == typeof a.toJSON) return $.toJSON(a.toJSON());
            if (a.constructor === Date) {
                var c = a.getUTCMonth() + 1,
                d = a.getUTCDate(),
                e = a.getUTCFullYear(),
                f = a.getUTCHours(),
                g = a.getUTCMinutes(),
                h = a.getUTCSeconds(),
                i = a.getUTCMilliseconds();
                return 10 > c && (c = "0" + c),
                10 > d && (d = "0" + d),
                10 > f && (f = "0" + f),
                10 > g && (g = "0" + g),
                10 > h && (h = "0" + h),
                100 > i && (i = "0" + i),
                10 > i && (i = "0" + i),
                '"' + e + "-" + c + "-" + d + "T" + f + ":" + g + ":" + h + "." + i + 'Z"'
            }
            if (a.constructor === Array) {
                for (var j = [], k = 0; k < a.length; k++) j.push($.toJSON(a[k]) || "null");
                return "[" + j.join(",") + "]"
            }
            var l, m, n = [];
            for (var o in a) {
                if (b = typeof o, "number" === b) l = '"' + o + '"';
                else {
                    if ("string" !== b) continue;
                    l = $.quoteString(o)
                }
                b = typeof a[o],
                "function" !== b && "undefined" !== b && (m = $.toJSON(a[o]), n.push(l + ":" + m))
            }
            return "{" + n.join(",") + "}"
        }
    },
    $.evalJSON = "object" == typeof JSON && JSON.parse ? JSON.parse: function(src) {
        return eval("(" + src + ")")
    },
    $.secureEvalJSON = "object" == typeof JSON && JSON.parse ? JSON.parse: function(src) {
        var filtered = src.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "");
        if (/^[\],:{}\s]*$/.test(filtered)) return eval("(" + src + ")");
        throw new SyntaxError("Error parsing JSON, source is not valid.")
    },
    $.quoteString = function(a) {
        return a.match(escapeable) ? '"' + a.replace(escapeable,
        function(a) {
            var b = meta[a];
            return "string" == typeof b ? b: (b = a.charCodeAt(), "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16))
        }) + '"': '"' + a + '"'
    }
} (jQuery || $);
function setCookieMills(a, b, c) {
    var d = new Date;
    d.setTime(d.getTime() + c);
    var e = ".evermarker.com";
    document.cookie = a + "=" + escape(b) + ";expires=" + d.toGMTString() + ";path=/;domain=" + e
}
function getCookie(a) {
    var b = document.cookie.match(new RegExp("(^| )" + a + "=([^;]*)(;|$)"));
    return null != b ? unescape(b[2]) : null
}
function deleteCookie(a) {
    var b = getCookie(a);
    null != b && setCookieMills(a, "", -1)
}
function seClick(a, b, c) {
    var d = "seWids" + a,
    e = getCookie(d);
    if (null != e) {
        var f = e.toString().indexOf(c);
        0 > f && (e = e + "," + c)
    } else e = c;
    setCookieMills(d, e, 864e5),
    log(2, 2, b, c)
}
function appendJSONCookie(cookieName, key, wid, Mills) {
    var ns = eval("(" + getCookie(cookieName) + ")"); (null == ns || "" == ns) && (ns = new Object),
    null == ns[key] && (ns[key] = "");
    var pos = ns[key].indexOf(wid);
    0 > pos && (ns[key] = ns[key] + "," + wid),
    setCookieMills(cookieName, $.toJSON(ns), Mills)
}
function reBook(a, b, c) {
    var d = "_rtbook",
    e = b.toString().split("#")[0];
    appendJSONCookie(d, a, e, 864e5),
    log(3, a, e, c)
}
function fe(a, b, c) {
    log("f", a, b, c)
}
function reClick2012(a, b, c) {
    var d = "reHome2012",
    e = b.toString().split("#")[0];
    appendJSONCookie(d, a, e, 864e5),
    log(3, a, e, c)
}
function reClickCube(a, b) {
    var c = "_rdCube";
    appendJSONCookie(c, "p" + a, b, 864e5)
}
function mark(a, b) {
    log(1, b, a)
}
function isMeta(a) {
    if (a.metaKey || a.altKey || a.ctrlKey || a.shiftKey) return ! 0;
    var b = a.which,
    c = a.button;
    return b || void 0 === c ? 2 === b ? !0 : 2 === c ? !0 : !1 : 1 & !c && 2 & !c && 4 & c
}
document.onclick = function(a) {
    //alert('onclick')
    if (a = a || event, a.clientX || a.clientY || a.pageX || a.pageY) {
        var b = document,
        c = window,
        d = tag = a.srcElement || a.target,
        e = $(tag).attr("clstag"),
        f = $(tag).attr("href"),
        g = "";
        while (!e) {
            if (tag = tag.parentNode, !tag || "BODY" == tag.nodeName) break;
            e = $(tag).attr("clstag"),
            f || (f = $(tag).attr("href"), d = tag)
        }
        if (e) {
            var h = e.split("|"),
            i = h[1],
            j = h[2],
            k = h[3];
            if ("keycount" === i && JA) {
                var l = JA.util.Nt();
                f ? (JA.tracker.aloading(j, k, ["Q", f]), JA.tracker.ngloader("other.000000", {
                    t1: j,
                    t2: k,
                    p0: JA.util.join(["Q", f]),
                    cb: l.jdcb
                })) : (JA.tracker.aloading(j, k, ["Q"]), JA.tracker.ngloader("other.000000", {
                    t1: j,
                    t2: k,
                    p0: JA.util.join(["Q"]),
                    cb: l.jdcb
                })),
                g = j + "|" + k,
                f && /http:\/\/.*?/.exec(f) && "_blank" !== $(d).attr("target") && !isMeta(a) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1, setTimeout(function() {
                    var a = b.createElement("a");
                    a.href = f,
                    a.target = "_self",
                    b.body.appendChild(a),
                    "undefined" != typeof a.click ? a.click() : c.location.href = f,
                    b.body.removeChild(a)
                },
                200))
            }
        }
    }
};
function HashMap() {
    this.values = new Object
}
HashMap.prototype.Set = function(a, b) {
    this.values[a] = b
},
HashMap.prototype.Get = function(a) {
    return this.values[a]
},
HashMap.prototype.Contains = function(a) {
    return this.values.hasOwnProperty(a)
},
HashMap.prototype.Remove = function(a) {
    delete this.values[a]
};
var SucInfoMethod = {
    Init: function() {
        this.orderDetailMap = new HashMap,
        this.rSM = new HashMap;
        for (var a = SucInfo_OrderDetail.toString().split(","), b = 0; b < a.length; b++) {
            var c = a[b].split(":");
            this.orderDetailMap.Set(c[0], c[1]),
            this.sku = c[0]
        }
    },
    GetSkuNum: function(a) {
        return this.orderDetailMap.Get(a)
    },
    Contains: function(a) {
        return this.orderDetailMap.Contains(a)
    },
    GetDefaultSku: function() {
        return this.sku
    },
    ARS: function(a) {
        this.rSM.Set(a, 0)
    },
    RSContains: function(a) {
        return this.rSM.Contains(a) ? 1 : 0
    }
};
function RecommendTrans(recName, tag, logtype) {
    for (var cookieNames = recName.split(","), i = 0; i < cookieNames.length; i++) {
        var recCookies = eval("(" + getCookie(cookieNames[i]) + ")");
        for (var k in recCookies)"" != recCookies[k] && ("cai2012" == k ? loginfo(recCookies[k], k.toString(), "R", logtype) : loginfo(recCookies[k], k.toString(), tag, logtype))
    }
}
function simpleMold(a, b, c, d, e) {
    for (var f = 0; f < a.length; f++) {
        var g = getCookie(c + a[f]);
        null != g && "" != g && loginfo(g, a[f], b, d, e)
    }
}
function complexMold(cookieArrary, tag, prefix, logtype, flag) {
    for (var i = 0; i < cookieArrary.length; i++) {
        var items = eval("(" + getCookie(prefix + cookieArrary[i]) + ")");
        if (null != items) for (var k in items)"" != items[k] && loginfo(items[k], k.toString(), tag, logtype, flag)
    }
}
function loginfo(a, b, c, d, e) {
    for (var f = a.split(","), g = SucInfo_OrderId, h = SucInfo_OrderType, i = SucInfo_OrderDetail, j = 0; j < f.length; j++) if (f[j].length > 0) {
        var k = f[j].toString().split("#")[0];
        SucInfoMethod.Contains(k) && (e ? (log(d, c, b.concat(".o"), g, h, i, k + ":" + SucInfoMethod.GetSkuNum(k)), log("4", "R" + b.concat(".o"), g, h, i, k, SucInfoMethod.GetSkuNum(k))) : log(d, c + b, g, h, i, k, SucInfoMethod.GetSkuNum(k)))
    }
}
function isChecked() {
    return SucInfo_OrderId = window.SucInfo_OrderId || JA.util.getParameter(document.location.href, "suc_orderid") || void 0,
    SucInfo_OrderType = window.SucInfo_OrderType || JA.util.getParameter(document.location.href, "suc_ordertype") || void 0,
    SucInfo_OrderDetail = window.SucInfo_OrderDetail || decodeURIComponent(JA.util.getParameter(document.location.href, "suc_sku")) || void 0,
    SucInfo_OrderId && SucInfo_OrderDetail
}
function funLoad() {
    var a = getCookie("pin");
    null != a && a.length > 0 && setCookieMills("rpin", a, 2592e5)
}
function Clublog() {
    var a = this.location.pathname.toLowerCase(),
    b = this.location.hostname.toLowerCase();
    a.indexOf("/cart.html", 0) >= 0 || a.indexOf("shoppingcart", 0) >= 0 ? log("R2&Page", "Show") : a.indexOf("user_home", 0) >= 0 ? log("R3&Page", "Show") : a.indexOf("initcart.html", 0) >= 0 || a.indexOf("addtocart.html", 0) >= 0 || a.indexOf("initcart.aspx", 0) >= 0 ? log("R4R5&Page", "Show") : a.indexOf("normal/list.action", 0) >= 0 || a.indexOf("orderlist.aspx", 0) >= 0 ? log("DDR&Page", "Show") : "home.360buy.com" == b && "/" == a && log("R3&Page", "Show")
}
function getHistory() {
    var a = decodeURIComponent(escape(getCookie("pin"))),
    b = getCookie("_ghis"),
    c = window.document.location.host.toLowerCase().indexOf("360buy.com") >= 0 ? "360buy": "jd";
    if (null == b && null != a) {
        var d = "http://gh." + c + ".com/BuyHistory.aspx?mid=" + encodeURIComponent(a);
        $.ajax({
            url: d,
            type: "GET",
            dataType: "jsonp",
            success: function(a) {
                var b = a.SSkus,
                c = a.UserInsterest;
                b.toString().length > 0 && setCookieMills("_ghis", b.toString().substring(0, 51)),
                c.toString().length > 0 && setCookieMills("_ghit", c)
            }
        })
    }
} !
function() {
    function HashMap() {
        this.values = new Object
    }
    HashMap.prototype.Set = function(a, b) {
        this.values[a] = b
    },
    HashMap.prototype.Get = function(a) {
        return this.values[a]
    },
    HashMap.prototype.Contains = function(a) {
        return this.values.hasOwnProperty(a)
    },
    HashMap.prototype.Remove = function(a) {
        delete this.values[a]
    };
    function SortedHashMap(a, b) {
        this.IComparer = a,
        this.IGetKey = b,
        this.a = new Array,
        this.h = new HashMap
    }
    SortedHashMap.prototype.Add = function(a, b) {
        this.ContainsKey(a) && this.Remove(a),
        this.a.push(b),
        this.a.sort(this.IComparer);
        for (var c = 0; c < this.a.length; c++) {
            var a = this.IGetKey(this.a[c]);
            this.h.Set(a, c)
        }
    },
    SortedHashMap.prototype.Insert = function(a, b) {
        for (var c = 0,
        d = this.a.length; d > c; c++) if (this.a[c].s === a.s) {
            this.a.splice(c, 1);
            break
        }
        this.a.length >= b && this.a.splice(b - 1, 1),
        this.a.unshift(a)
    },
    SortedHashMap.prototype.Get = function(a) {
        return this.a[this.h.Get(a)]
    },
    SortedHashMap.prototype.Count = function() {
        return this.a.length
    },
    SortedHashMap.prototype.Remove = function(a) {
        if (this.h.Contains(a)) {
            var b = this.h.Get(a);
            this.a.splice(b, 1),
            this.h.Remove(a)
        }
    },
    SortedHashMap.prototype.ContainsKey = function(a) {
        return this.h.Contains(a)
    },
    SortedHashMap.prototype.Clear = function() {
        this.a = new Array,
        this.h = new HashMap
    },
    SortedHashMap.prototype.GetJson = function() {
        return $.toJSON(this.a)
    };
    function ThirdType(a, b, c) {
        this.t = a,
        this.v = 5,
        this.s = 0,
        arguments.length > 1 && (this.s = b),
        arguments.length > 2 && (this.v = c)
    }
    ThirdType.prototype.Increase = function() {
        this.v = this.v + 2
    },
    ThirdType.prototype.Decrease = function() {
        this.v = this.v - 1
    },
    ThirdType.prototype.SetSku = function(a) {
        this.s = a
    },
    Ttracker = {
        IComparer: function(a, b) {
            return b.v - a.v
        },
        IGetKey: function(a) {
            return a.t
        },
        isbook: function(a) {
            return a > 1e7 && 2e7 > a
        },
        trace: function() {
            if ("object" == typeof pageConfig && "object" == typeof pageConfig.product) {
                var a = pageConfig.product.cat instanceof Array && pageConfig.product.cat[2];
                if (a) {
                    var b = $("#name").attr("PshowSkuid") || pageConfig.product.skuid;
                    this.view(a, b),
                    this.viewtypewid()
                }
            }
        },
        viewtypewid: function() {
            var a = Ttracker.util.Vv("typewid");
            a && Ttracker.util.Wv("typewid", "", -63072e6)
        },
        viewhisotry: function(t, s, cname) {
            var nview = {
                t: t,
                s: s
            },
            bookmap = new SortedHashMap(this.IComparer, this.IGetKey),
            bview = Ttracker.util.Vv(cname);
            if (bview) try {
                if (bview.indexOf(".") > 0) for (var viewarray = bview.split("|"), j = viewarray.length - 1; j >= 0; j--) {
                    var book = viewarray[j].split(".");
                    bookmap.Insert({
                        t: Number(book[0]),
                        s: Number(book[1])
                    },
                    8)
                } else {
                    var bviews = eval("(" + bview + ")");
                    if (bviews.length > 0 && void 0 != bviews[0].d) Ttracker.util.Wv(cname, "", -63072e6);
                    else for (var i = bviews.length - 1; i >= 0; i--) bookmap.Insert(bviews[i], 8)
                }
            } catch(e) {
                Ttracker.util.Wv(cname, "", -63072e6)
            }
            bookmap.Insert(nview, 8);
            for (var cvalue = "",
            k = 0,
            klen = bookmap.a.length; klen > k; k++) cvalue += bookmap.a[k].t + "." + bookmap.a[k].s + (k == klen - 1 ? "": "|");
            cvalue && Ttracker.util.Wv(cname, cvalue, 63072e6)
        },
        viewrate: function(t, s, cname) {
            var ntw = {
                t: t,
                s: s,
                v: 5
            },
            sitesortmap = new SortedHashMap(this.IComparer, this.IGetKey),
            vrate = Ttracker.util.Vv(cname);
            if (vrate) try {
                if (vrate.indexOf(".") > 0) for (var ratearray = vrate.split("|"), j = ratearray.length - 1; j >= 0; j--) {
                    var tw = ratearray[j].split("."),
                    tv = Number(tw[2] || 0),
                    tid = Number(tw[0]);
                    tv = t === tid ? tv: tv - 1,
                    sitesortmap.Add(Number(tw[0]), {
                        t: Number(tw[0]),
                        s: Number(tw[1]),
                        v: tv
                    },
                    8)
                } else {
                    var vrates = eval("(" + vrate + ")");
                    if (vrates.length > 0 && void 0 != vrates[0].d) Ttracker.util.Wv(cname, "", -63072e6);
                    else for (var i = 0; i < vrates.length; i++) {
                        var rate = vrates[i];
                        rate.t != t && (rate.v -= 1),
                        sitesortmap.Add(rate.t, rate)
                    }
                }
            } catch(e) {
                Ttracker.util.Wv(cname, "", -63072e6)
            }
            if (sitesortmap.ContainsKey(t)) {
                var curtt = sitesortmap.Get(t);
                curtt.s = s ? s: curtt.s,
                curtt.v += 2
            } else sitesortmap.Add(t, ntw);
            if (sitesortmap.Count() > 8) {
                var del = sitesortmap.a[sitesortmap.Count() - 1];
                sitesortmap.Remove(del.t)
            }
            for (var cvalue = "",
            k = 0,
            klen = sitesortmap.a.length; klen > k; k++) cvalue += sitesortmap.a[k].t + "." + sitesortmap.a[k].s + "." + sitesortmap.a[k].v + (k == klen - 1 ? "": "|");
            cvalue && Ttracker.util.Wv(cname, cvalue, 63072e6)
        },
        view: function(a, b) {}
    },
    Ttracker.util = {
        Wv: function(a, b, c) {
            var d = ".evermarker.com";
            a = a + "=" + b + "; path=/; ",
            c && (a += "expires=" + new Date((new Date).getTime() + c).toGMTString() + "; "),
            a += "domain=" + d + ";",
            document.cookie = a
        },
        Vv: function(a) {
            for (var b = [], c = document.cookie.split(";"), a = RegExp("^\\s*" + a + "=\\s*(.*?)\\s*$"), d = 0; d < c.length; d++) {
                var e = c[d].match(a);
                e && b.push(e[1])
            }
            return b[0]
        }
    },
    Ttracker.trace()
} (),
function() {
    var a = window,
    b = document,
    c = encodeURIComponent,
    d = decodeURIComponent,
    e = void 0,
    f = "push",
    g = "join",
    h = "split",
    i = "length",
    j = "indexOf",
    k = "prototype",
    l = "toLowerCase",
    m = {};
    m.util = {
        join: function(a) {
            if (a instanceof Array) {
                for (var b = "",
                c = 0,
                d = a.length; d > c; c++) b += a[c] + (c == d - 1 ? "": "|||");
                return b
            }
            return a
        },
        getParameter: function(a, b) {
            var d = new RegExp("(?:^|&|[?]|[/])" + b + "=([^&]*)"),
            e = d.exec(a);
            return e ? c(e[1]) : ""
        },
        Wv: function(a, c, d, e) {
            a = a + "=" + c + "; path=/; ",
            e && (a += "expires=" + new Date((new Date).getTime() + e).toGMTString() + "; "),
            d && (a += "domain=" + d + ";"),
            b.cookie = a
        },
        Vv: function(a) {
            for (var c = [], d = b.cookie[h](";"), e = RegExp("^\\s*" + a + "=\\s*(.*?)\\s*$"), g = 0; g < d[i]; g++) {
                var j = d[g].match(e);
                j && c[f](j[1])
            }
            return c
        }
    };
    var n = 0;
    function o(a) {
        return (a ? "_": "") + n++
    }
    var p = o(),
    q = o(),
    r = o(),
    s = o(),
    t = o(),
    u = o(),
    v = o(),
    w = o(),
    x = o(),
    y = o(),
    z = o(),
    A = o(),
    B = o(),
    C = o(),
    D = o(),
    E = o(),
    F = o(),
    G = o(),
    H = o(),
    I = o(),
    J = o(),
    K = o(),
    L = o(),
    M = o(),
    N = o(),
    O = o(),
    P = o(),
    Q = o(),
    R = o(),
    S = o(),
    T = o(),
    U = o(),
    V = o(),
    W = o(),
    X = o(),
    Y = o(),
    Z = o(),
    _ = function() {
        var a = {};
        this.set = function(b, c) {
            a[b] = c
        },
        this.get = function(b) {
            return a[b] !== e ? a[b] : null
        },
        this.m = function(b) {
            var c = this.get(b),
            d = c == e || "" === c ? 0 : 1 * c;
            a[b] = d + 1
        },
        this.set(p, "UA-J2011-1");
        var b = "evermarker.com";
        this.set(s, b),
        this.set(r, ea()),
        this.set(t, Math.round((new Date).getTime() / 1e3)),
        this.set(u, 15552e6),
        this.set(v, 1296e6),
        this.set(w, 18e5),
        this.set(C, ga());
        var c = ka();
        this.set(D, cname),
        this.set(E, c.version),
        this.set(F, la());
        var d = fa();
        this.set(G, d.D),
        this.set(H, d.C),
        this.set(I, d.language),
        this.set(J, d.javaEnabled),
        this.set(K, d.characterSet),
        this.set(Q, aa),
        this.set(V, (new Date).getTime());
        var f = m.util.Vv("pin");
        this.set(Y, f[i] ? f[0] : "-");
        var g = "",
        h; (h = m.util.Vv("pinId")) && h[i] && (g = h[0]),
        this.set(Z, g || "-")
    },
    aa = "baidu:wd,baidu:word,haosou.com:q,so.com:q,so.360.cn:q,360so.com:q,360sou.com:q,baidu:q1,m.baidu:word,m.baidu:w,wap.soso:key,m.so:q,page.yicha:key,sz.roboo:q,i.easou:q,wap.sogou:keyword,google:q,soso:w,sogou:query,youdao:q,ucweb:keyword,ucweb:word,114so:kw,yahoo:p,yahoo:q,live:q,msn:q,bing:q,aol:query,aol:q,daum:q,eniro:search_word,naver:query,pchome:q,images.google:q,lycos:query,ask:q,netscape:query,cnn:query,about:terms,mamma:q,voila:rdata,virgilio:qs,alice:qs,yandex:text,najdi:q,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,kvasir:q,ozu:q,terra:query,rambler:query".split(","),
    ba = function() {
        return Math.round((new Date).getTime() / 1e3)
    },
    ca = function() {
        return Math.round(2147483647 * Math.random())
    },
    da = function() {
        return ca() ^ 2147483647 & ja()
    },
    ea = function() {
        return ia(b.domain)
    },
    fa = function() {
        var c = {},
        d = a.navigator,
        e = a.screen;
        return c.D = e ? e.width + "x" + e.height: "-",
        c.C = e ? e.colorDepth + "-bit": "-",
        c.language = (d && (d.language || d.browserLanguage) || "-")[l](),
        c.javaEnabled = d && d.javaEnabled() ? 1 : 0,
        c.characterSet = b.characterSet || b.charset || "-",
        c
    },
    ga = function() {
        var a, b, c, d;
        if (c = "ShockwaveFlash", (a = (a = window.navigator) ? a.plugins: e) && a[i] > 0) for (b = 0; b < a[i] && !d; b++) c = a[b],
        c.name[j]("Shockwave Flash") > -1 && (d = c.description[h]("Shockwave Flash ")[1]);
        else {
            c = c + "." + c;
            try {
                b = new ActiveXObject(c + ".7"),
                d = b.GetVariable("$version")
            } catch(f) {}
            if (!d) try {
                b = new ActiveXObject(c + ".6"),
                d = "WIN 6,0,21,0",
                b.AllowScriptAccess = "always",
                d = b.GetVariable("$version")
            } catch(g) {}
            if (!d) try {
                b = new ActiveXObject(c),
                d = b.GetVariable("$version")
            } catch(k) {}
            d && (d = d[h](" ")[1][h](","), d = d[0] + "." + d[1] + " r" + d[2])
        }
        var l = m.util.Vv("_r2");
        a = d ? d + (l[i] > 0 ? "_" + l[0] : "") : "-";
        var n = m.util.Vv("limgs");
        return a += n[i] > 0 ? "_" + n[0] : ""
    },
    ha = function(a) {
        return e == a || "-" == a || "" == a
    },
    ia = function(a) {
        var b = 1,
        c = 0,
        d;
        if (!ha(a)) for (b = 0, d = a[i] - 1; d >= 0; d--) c = a.charCodeAt(d),
        b = (b << 6 & 268435455) + c + (c << 14),
        c = 266338304 & b,
        b = 0 != c ? b ^ c >> 21 : b;
        return b
    },
    ja = function() {
        for (var c = fa(), d = c, e = a.navigator, d = e.appName + e.version + d.language + e.platform + e.userAgent + d.javaEnabled + d.D + d.C + (b.cookie ? b.cookie: "") + (b.referrer ? b.referrer: ""), e = d.length, f = a.history.length; f > 0;) d += f--^e++;
        return ia(d)
    },
    ka = function() {
        var a = {
            name: "other",
            version: "0"
        },
        b = navigator.userAgent.toLowerCase();
        browserRegExp = {
            se360: /360se/,
            se360_2x: /qihu/,
            ie: /msie[ ]([\w.]+)/,
            firefox: /firefox[|\/]([\w.]+)/,
            chrome: /chrome[|\/]([\w.]+)/,
            safari: /version[|\/]([\w.]+)(\s\w.+)?\s?safari/,
            opera: /opera[|\/]([\w.]+)/
        };
        for (var c in browserRegExp) {
            var d = browserRegExp[c].exec(b);
            if (d) {
                a.name = c,
                a.version = d[1] || "0";
                break
            }
        }
        return a
    },
    la = function() {
        var a = /(win|android|linux|nokia|ipad|iphone|ipod|mac|sunos|solaris)/.exec(navigator.platform.toLowerCase());
        return null == a ? "other": a[0]
    },
    ma = function() {
        for (var a = "",
        b = ["jwotest_product", "jwotest_list", "jwotest_cart", "jwotest_orderinfo", "jwotest_homepage", "jwotest_other1", "jwotest_other2", "jwotest_other3"], c = 0, e = b.length; e > c; c++) {
            var f = m.util.Vv(b[c]);
            if (0 != f[i]) {
                var h = d(f[0]).match(/=(.*?)&/gi),
                j = [];
                null != h && ($.each(h,
                function(a, b) {
                    j.push(0 == a ? "T" + b.substring(1, b.length - 1) : b.substring(1, b.length - 1))
                }), a += j[g]("-") + ";")
            }
        }
        return a
    },
    na = function(a) {
        a.set(x, b.location.hostname),
        a.set(y, b.title.replace(/\$/g, "")),
        a.set(z, b.location.pathname),
        a.set(A, b.referrer.replace(/\$/g, "")),
        a.set(B, b.location.href);
        var c = m.util.Vv("__jda"),
        d = c[i] > 0 ? c[0][h](".") : null;
        a.set(q, d && !ha(d[1]) ? d[1] : da()),
        a.set(L, d ? d[2] : a.get(t)),
        a.set(M, d ? d[3] : a.get(t)),
        a.set(N, d ? d[4] : a.get(t)),
        a.set(O, d ? d[5] : 1);
        var e = m.util.Vv("__jdv"),
        f = e[i] > 0 ? e[0][h]("|") : null,
        g = f && 5 == f.length ? 1 : 0;
        a.set(R, f ? f[0 + g] : "direct"),
        a.set(S, f ? f[1 + g] : "-"),
        a.set(T, f ? f[2 + g] : "none"),
        a.set(U, f ? f[3 + g] : "-");
        var j = m.util.Vv("__jdb"),
        k = j[i] > 0 ? j[0][h](".") : null,
        g = k && 4 == k.length ? 1 : 0;
        a.set(P, k ? k[0 + g] : 0),
        a.set(W, ma() || "-");
        var l = JA.util.Vv("clickid"),
        n = l[i] && l[0];
        return a.set(X, n),
        !0
    },
    oa = function() {
        var a = m.util.Vv("__jdb"),
        b = a[i] > 0 ? a[0][h](".") : null;
        return b && 1 == b.length ? 1 * b[0] : b && 4 == b.length ? 1 * b[1] : 0
    },
    pa = function(a) {
        var c = b.location.search,
        d = b.referrer,
        e = a.get(s),
        g = m.util.getParameter(c, "utm_source"),
        k = [],
        n = a.get(R),
        o = a.get(S),
        p = a.get(T),
        q = 0 == m.util.Vv("__jdb")[i];
        if (g) {
            var r = m.util.getParameter(c, "utm_campaign"),
            t = m.util.getParameter(c, "utm_medium"),
            u = m.util.getParameter(c, "utm_term");
            k[f](g),
            k[f](r || "-"),
            k[f](t || "-"),
            k[f](u || "not set"),
            a.set(U, k[3])
        } else {
            var v = d && d[h]("/")[2],
            w = !1;
            if (v && v[j](e) < 0) {
                for (var x = a.get(Q), y = 0; y < x.length; y++) {
                    var z = x[y][h](":");
                    if (v[j](z[0][l]()) > -1 && d[j]((z[1] + "=")[l]()) > -1) {
                        var A = m.util.getParameter(d, z[1]);
                        k[f](z[0]),
                        k[f]("-"),
                        k[f]("organic"),
                        k[f](A || "not set"),
                        a.set(U, k[3]),
                        w = !0;
                        break
                    }
                }
                w || (v[j]("zol.com.cn") > -1 ? (k[f]("zol.com.cn"), k[f]("-"), k[f]("cpc"), k[f]("not set")) : (k[f](v), k[f]("-"), k[f]("referral"), k[f]("-")))
            }
        }
        q || !q && k[i] > 0 && (k[0] !== n || k[1] !== o || k[2] !== p) && "referral" !== k[2] ? (a.set(R, k[0] || a.get(R)), a.set(S, k[1] || a.get(S)), a.set(T, k[2] || a.get(T)), a.set(U, k[3] || a.get(U)), wa(a)) : sa(a)
    },
    qa = function(a, b) {
        var c = b.split(".");
        a.set(L, c[2]),
        a.set(M, c[4]),
        a.set(N, ba()),
        a.m(O),
        a.set(P, 1)
    },
    ra = function(a) {
        var b = a.get(t);
        a.set(q, da()),
        a.set(L, b),
        a.set(M, b),
        a.set(N, b),
        a.set(O, 1),
        a.set(P, 1)
    },
    sa = function(a) {
        a.m(P)
    },
    ta = function(a) {
        return [a.get(r), a.get(q) || "-", a.get(L) || "-", a.get(M) || "-", a.get(N) || "-", a.get(O) || 1][g](".")
    },
    ua = function(a) {
        return [a.get(r), a.get(P) || 1, a.get(q) + "|" + a.get(O) || 1, a.get(N) || a.get(t)][g](".")
    },
    va = function(a) {
        return [a.get(r), a.get(R) || b.domain, a.get(S) || "(direct)", a.get(T) || "direct", a.get(U) || "-"][g]("|")
    },
    wa = function(a) {
        var b = m.util.Vv("__jda");
        0 == b.length ? ra(a) : qa(a, b[0])
    },
    xa = new _,
    ya = function() {
        this.a = {},
        this.add = function(a, b) {
            this.a[a] = b
        },
        this.get = function(a) {
            return this.a[a]
        },
        this.toString = function() {
            return this.a[g]("&")
        }
    },
    za = function(a, b) {
        b.add("jdac", a.get(p)),
        b.add("jduid", a.get(q)),
        b.add("jdsid", a.get(q) + "|" + a.get(O)),
        b.add("jdje", a.get(J)),
        b.add("jdsc", a.get(H)),
        b.add("jdsr", a.get(G)),
        b.add("jdul", a.get(I)),
        b.add("jdcs", a.get(K)),
        b.add("jddt", a.get(y) || "-"),
        b.add("jdmr", c(a.get(A))),
        b.add("jdhn", a.get(x) || "-"),
        b.add("jdfl", a.get(C)),
        b.add("jdos", a.get(F)),
        b.add("jdbr", a.get(D)),
        b.add("jdbv", a.get(E)),
        b.add("jdwb", a.get(L)),
        b.add("jdxb", a.get(M)),
        b.add("jdyb", a.get(N)),
        b.add("jdzb", a.get(O)),
        b.add("jdcb", a.get(P)),
        b.add("jdusc", a.get(R) || "direct"),
        b.add("jducp", a.get(S) || "-"),
        b.add("jdumd", a.get(T) || "-"),
        b.add("jduct", a.get(U) || "-"),
        b.add("jdlt", "object" != typeof jdpts ? 0 : void 0 == jdpts._st ? 0 : a.get(V) - jdpts._st),
        b.add("jdtad", a.get(W)),
        b.add("jdak", a.get(X)),
        b.add("pinid", a.get(Z))
    },
    Aa = function(a, b, d, e) {
        b.add("jdac", a.get(p)),
        b.add("jduid", a.get(q)),
        b.add("jdsid", a.get(q) + "|" + a.get(O)),
        b.add("jdje", "-"),
        b.add("jdsc", "-"),
        b.add("jdsr", "-"),
        b.add("jdul", "-"),
        b.add("jdcs", "-"),
        b.add("jddt", "-"),
        b.add("jdmr", c(a.get(A))),
        b.add("jdhn", "-"),
        b.add("jdfl", "-"),
        b.add("jdos", "-"),
        b.add("jdbr", "-"),
        b.add("jdbv", "-"),
        b.add("jdwb", "-"),
        b.add("jdxb", "-"),
        b.add("jdyb", "-"),
        b.add("jdzb", a.get(O)),
        b.add("jdcb", e ? oa() + e: a.get(P)),
        b.add("jdusc", "-"),
        b.add("jducp", "-"),
        b.add("jdumd", "-"),
        b.add("jduct", "-"),
        b.add("jdlt", 0),
        b.add("jdtad", d),
        b.add("jdak", a.get(X)),
        b.add("pinid", a.get(Z))
    },
    Ba = function() {
        na(xa) && pa(xa);
        var a = new ya,
        b = xa.get(s);
        return za(xa, a),
        m.util.Wv("__jda", ta(xa), b, xa.get(u)),
        m.util.Wv("__jdb", ua(xa), b, xa.get(w)),
        m.util.Wv("__jdc", xa.get(r), b),
        m.util.Wv("__jdv", va(xa), b, xa.get(v)),
        m.util.Wv("clickid", "0", b, -846e5),
        a.a
    },
    Ca = function() {
        var a = new ya;
        return za(xa, a),
        a.a
    },
    Da = function(a, b) {
        var c = new ya;
        return Aa(xa, c, a, b),
        c.a
    },
    Ea = function(a) {
        var b = document.createElement("img");
        return b.width = 1,
        b.height = 1,
        b.src = a,
        b
    },
    Fa = function(a) {
        var b = Ea(a);
        b.onload = b.onerror = function() {
            b.onload = null,
            b.onerror = null
        }
    };
    m.util.Nt = Ca,
    m.tracker = {
        sendOld: function(a, b, c, d) {},
        sendNew: function(a, d) {
            var e = Ca(),
            f = ("https:" == document.location.protocol ? "https://clk": "http://clk") + ".evermarker.com/log.gif?t=" + a + "&m=" + xa.get(p) + "&pin=" + c(xa.get(Y)) + "&uid=" + e.jduid + "&sid=" + e.jdsid + (e.jdak ? "&cul=" + document.location.href + c("&clickid=" + e.jdak) : "") + "&v=" + c(d) + "&ref=" + c(b.referrer) + "&rm=" + (new Date).getTime();
            Fa(f)
        },
        ngloader: function(a, b) {
            var c = Ca(),
            d = {
                je: c.jdje,
                sc: c.jdsc,
                sr: c.jdsr,
                ul: c.jdul,
                cs: c.jdcs,
                dt: c.jddt,
                hn: c.jdhn,
                fl: c.jdfl,
                os: c.jdos,
                br: c.jdbr,
                bv: c.jdbv,
                wb: c.jdwb,
                xb: c.jdxb,
                yb: c.jdyb,
                zb: c.jdzb,
                cb: c.jdcb,
                usc: c.jdusc,
                ucp: c.jducp,
                umd: c.jdumd,
                uct: c.jduct,
                ct: (new Date).getTime(),
                lt: c.jdlt,
                tad: c.jdtad
            };
            this.ngaloader(a, d, b)
        },
        ngaloader: function(a, b, c) {
            var d = "";
            for (var e in b) d += e + "=" + b[e] + "$";
            if (c) for (var e in c) d += e + "=" + c[e] + "$";
            d += "pinid=" + xa.get(Z) + "$",
            d = d.substring(0, d.length - 1),
            this.sendNew(a, d)
        },
        ngloaderJSON: function(a, b) {
            var c = Ca();
            b.pinid = xa.get(Z),
            b.je = c.jdje,
            b.sc = c.jdsc,
            b.sr = c.jdsr,
            b.ul = c.jdul,
            b.cs = c.jdcs,
            b.dt = c.jddt,
            b.hn = c.jdhn,
            b.fl = c.jdfl,
            b.os = c.jdos,
            b.br = c.jdbr,
            b.bv = c.jdbv,
            b.wb = c.jdwb,
            b.xb = c.jdxb,
            b.yb = c.jdyb,
            b.zb = c.jdzb,
            b.cb = c.jdcb,
            b.usc = c.jdusc,
            b.ucp = c.jducp,
            b.umd = c.jdumd,
            b.uct = c.jduct,
            b.ct = (new Date).getTime(),
            b.lt = c.jdlt,
            b.tad = c.jdtad,
            this.sendNew(a, $.toJSON(b))
        },
        bloading: function(a, b, c) {
            var d = Ba();
            this.loading(a, b, d, c);
            var e = {
                je: d.jdje,
                sc: d.jdsc,
                sr: d.jdsr,
                ul: d.jdul,
                cs: d.jdcs,
                dt: d.jddt,
                hn: d.jdhn,
                fl: d.jdfl,
                os: d.jdos,
                br: d.jdbr,
                bv: d.jdbv,
                wb: d.jdwb,
                xb: d.jdxb,
                yb: d.jdyb,
                zb: d.jdzb,
                cb: d.jdcb,
                usc: d.jdusc,
                ucp: d.jducp,
                umd: d.jdumd,
                uct: d.jduct,
                lt: d.jdlt,
                ct: c,
                tad: d.jdtad
            };
            this.ngaloader("www.100000", e),
            d.jduid % 1e3 === 1 && this.ngloader("jsver.000000", {
                jsfile: "wl",
                jsver: "20141223"
            })
        },
        loading: function(a, b, c, d) {
            this.sendOld(a, b, c, JA.util.join(d))
        },
        aloading: function(a, b, c) {
            var d = Ca();
            this.loading(a, b, d, c)
        },
        aloadingJSON: function(a, b, c) {
            var d = Ca();
            this.sendOld(a, b, d, $.toJSON(c))
        },
        adshow: function(a) {
            var b = Da(a);
            this.loading("AD", "IM", b, "")
        },
        adclick: function(a) {
            var b = Da(a, 1);
            this.loading("AD", "CL", b, "")
        }
    },
    window.JA = m,
    m.tracker.bloading("J", "A", (new Date).getTime());
    var Ga = 5 === $(".w .crumb a").length && /e.evermarker.com\/products\/(\d*)-(\d*)-(\d*).html[\w\W]*?e.evermarker.com\/(\d*).html/.exec($(".w .crumb").html()); (window.pageConfig && window.pageConfig.product && window.pageConfig.product.cat || Ga) && m.tracker.ngloader("item.010001", {
        sku: Ga[4] || window.pageConfig.product.skuid,
        cid1: Ga[1] || window.pageConfig.product.cat[0],
        cid2: Ga[2] || window.pageConfig.product.cat[1],
        cid3: Ga[3] || window.pageConfig.product.cat[2],
        brand: Ga ? "0": window.pageConfig.product.brand
    }),
    function() {
        if (isChecked()) {
            SucInfoMethod.Init();
            var a = getCookie("_distM");
            if (a && a == SucInfo_OrderId) return ! 0;
            for (var b = ["p000", "p100", "np000", "np100"], c = 0; c < b.length; c++) {
                var d = getCookie(b[c]);
                null != d && "" != d && log("HomePageOrder", b[c])
            }
            var e = "1:2:3:4:5:1a:1b:BR1:BR2:BR3:BR4:BR5:DDR:GR1:GR2:GR3:GR4:VR1:VR2:VR3:VR4:VR5:NR:CR1:CR2:CR3:SR1:SR2:SR3:SR4:Indiv&Simi:Indiv&OthC:Indiv&AllC:Zd";
            simpleMold(e.split(":"), "R", "reWids", "4");
            var f = "Club,ThirdRec,AttRec,OCRec,SORec,EBRec,BookSpecial,BookTrack,BookHis,Coupon,GlobalTrack,GlobalHis,History,historyreco_s,historyreco_c";
            complexMold(f.split(","), "R", "reWids", "4");
            var g = ["v", "TrackRec", "TrackHis", "CouDan", "CarAcc", "Zd", "Tc", "g", "s", "Book", "BookSpecial", "BookTrack", "BookHis", "GlobalTrack", "GlobalHis", "History", "Hiss", "Hisc", "simi", "GThirdRec", "PtoAccy", "AtoAccy"];
            complexMold(g, "o", "rod", "d", !0),
            RecommendTrans("reHome2012,_rtbook", "N", "4"),
            complexMold(["_rdCube"], "Cube", "", "4"),
            simpleMold(["SEO"], "S", "seWids", "4"),
            setCookieMills("_distM", SucInfo_OrderId, 864e5),
            setCookieMills("_ghis", "", -1),
            log("7", "2", SucInfo_OrderId, SucInfo_OrderType, SucInfo_OrderDetail);
            var h = Ca();
            JA && JA.tracker.ngloader("order.100000", {
                orderid: SucInfo_OrderId,
                ordertype: SucInfo_OrderType,
                orderdetail: SucInfo_OrderDetail,
                cb: h.jdcb
            })
        }
    } ()
} ();
function log(a, b) {

    var c = Array.prototype.slice.call(arguments);
    c = c && c.slice(2),
    JA && JA.tracker.aloading(a, b, c),
    // 
    
    JA && JA.tracker.ngloader("other.000000", {
        t1: a,
        t2: b,
        p0: encodeURIComponent(JA.util.join(c))
    })
}
function logJSON(a, b, c) {
    return JA ? (JA.tracker.aloadingJSON(a, b, c), void JA.tracker.ngloaderJSON("other.000000", {
        t1: a,
        t2: b,
        p0: c
    })) : !1
} !
function() {
    "object" == typeof jdpts && jdpts._cls && log(jdpts._cls.split(".")[0], jdpts._cls.split(".")[1])
} (),
Clublog();


