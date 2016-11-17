<link rel="stylesheet" href="{{config('runtime.Image_URL')}}/styles/vendor.css{{config('runtime.V')}}">
<script src="{{config('runtime.Image_URL')}}/scripts/vendor.js{{config('runtime.V')}}"></script>
<ul>
    <li>
        <a href="javascript:;" id="dailyClick"
           data-url='https://clk.motif.me/log.gif?t=dtc.100001&m=H5_M2016-1&pin=3e448648b3814c999b646f25cde12b2a&uuid=motiffffffffffffffffffffffffffff&v={"action":1,"type":1,"skipType":1,"skipId":99999,"sortNo":100",expid":0,"index":1,"ver":"1.0.1","src":"H5"}'>daily点击事件</a>
    </li>
</ul>
{{--详情页曝光--}}
<img src='https://clk.motif.me/log.gif?t=ptc.100001&m=H5_M2016-1&pin=3e448648b3814c999b646f25cde12b2a&uuid=motiffffffffffffffffffffffffffff&v={"spu":88888,"main_sku":2,"price":1558,"version":"1.0.1","ver":"9.2","src":"H5"}'
     hidden>
{{--daily曝光--}}
<img src='https://clk.motif.me/log.gif?t=dtc.100001&m=H5_M2016-1&pin=3e448648b3814c999b646f25cde12b2a&uuid=motiffffffffffffffffffffffffffff&v={"action":0,"type":1,"skipType":1,"skipId":99999,"sortNo":100",expid":0,"index":1,"ver":"1.0.1","src":"H5"}'
     hidden>
<script>
    $('#dailyClick').on('click', function () {
        $.ajax({
            url: $(this).data('url'),
            type: 'GET'
        })
    })
</script>