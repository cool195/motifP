<link rel="stylesheet" href="{{config('runtime.Image_URL')}}/styles/vendor.css{{config('runtime.V')}}">
<script src="{{config('runtime.Image_URL')}}/scripts/vendor.js{{config('runtime.V')}}"></script>
<ul>
    <li>
        <a href="javascript:;" id="dailyClick"
           data-url='https://clk.motif.me/log.gif?time={{time()}}&t=dtc.100001&m=H5_M2016-1&pin=3e448648b3814c999b646f25cde12b2a&uuid=motiffffffffffffffffffffffffffff&v={"action":1,"type":1,"skipType":1,"skipId":99999,"sortNo":100",expid":0,"index":1,"ver":"1.0.1","src":"H5"}'>daily点击事件</a>
    </li>
</ul>
{{--详情页曝光--}}
<img src='https://clk.motif.me/log.gif?time={{time()}}&t=ptc.100001&m=H5_M2016-1&pin=3e448648b3814c999b646f25cde12b2a&uuid=motiffffffffffffffffffffffffffff&v={"spu":88888,"main_sku":2,"price":1558,"version":"1.0.1","ver":"9.2","src":"H5"}'
     hidden>
{{--daily曝光--}}
<img src='https://clk.motif.me/log.gif?time={{time()}}&t=dtc.100001&m=H5_M2016-1&pin=3e448648b3814c999b646f25cde12b2a&uuid=motiffffffffffffffffffffffffffff&v={"action":0,"type":1,"skipType":1,"skipId":99999,"sortNo":100",expid":0,"index":1,"ver":"1.0.1","src":"H5"}'
     hidden>
<script>
    $('#dailyClick').on('click', function () {
        $.ajax({
            url: $(this).data('url'),
            type: 'GET'
        })
    })
</script>
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