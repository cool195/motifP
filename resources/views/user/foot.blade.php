<footer class="login-footer">
    <div class="container p-x-40x">
        <div class="text-center p-t-20x m-b-40x loginFooter-contactUs"><a href="/contactus" class="text-link">Contact Us</a></div>
        <div class="text-center p-t-10x m-b-10x text-primary font-size-xs">Copyright © 2016 Motif Group LLC. All rights reserved.</div>
    </div>
</footer>

@if (env('APP_ENV') == 'production') {
<script src="{{config('runtime.CLK_URL')}}/wl.js"></script>
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

@endif
