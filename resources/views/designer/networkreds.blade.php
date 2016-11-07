<!DOCTYPE html>
<html lang="en">
<head>
    <title>Designer Detail</title>
</head>
<body>

<script type="text/javascript">

    var url = "{!! $designerUrl !!}";


        var Agent = navigator.userAgent;
        if (/iPhone/i.test(Agent)) {
            window.location.href = "motif://o.c?a=url&url="+url;
            setTimeout(function () {
                window.location.href = "{!! $AUrl !!}";
            }, 2000);
        } else if (/Android/i.test(Agent) || /Linux/i.test(Agent)) {
            window.location.href = "motif://o.c?a=url&url="+url;
            setTimeout(function () {
                window.location.href = "{!! $IosUrl !!}";
            }, 2000);
        } else {
            window.location.href = url;
        }

</script>

<script src="{{config('runtime.Image_URL')}}/scripts/wl.js{{config('runtime.V')}}"></script>
<!-- Google Tag Manager -->
<script>(function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(), event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-K9J99M');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) -->
<noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K9J99M"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->

<script>
    !function (f, b, e, v, n, t, s) {
        if (f.fbq)return;
        n = f.fbq = function () {
            n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq)f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window,
            document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', '1777634412449097');
    fbq('track', "PageView");</script>
<noscript><img height="1" width="1" style="display:none"
               src="https://www.facebook.com/tr?id=1777634412449097&ev=PageView&noscript=1"
    /></noscript>
</body>
</html>
