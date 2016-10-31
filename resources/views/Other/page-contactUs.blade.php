@include('header', ['title' => 'Contact Us'])
<!--内容-->
<div class="container">
    <div class="content-wrap">
        <h2 class="helveBold text-main font-size-lxx m-b-20x m-x-20x">Contact Us</h2>
        <div class="bg-white content box-shadow">
            <p>Customer Support Email: <a href="mailto:service@motif.me">Service@motif.me</a></p>
            <p>Want to partner with us? <a href="mailto:service@motif.me">Creators@motif.me</a></p>
            <p>Other business enquiries? <a href="mailto:Business@motif.me">Business@motif.me</a></p>
            <p>Contact Us on Facebook:
                <a target="_blank" href="@if(!strstr($_SERVER['HTTP_USER_AGENT'], 'motif-android') && !strstr($_SERVER['HTTP_USER_AGENT'], 'motif-ios')){{'https://www.facebook.com/motifme'}}@else{{'motif://o.c?a=outurl&url='.urlencode('https://www.facebook.com/motifme')}}@endif" class="btn-facebook">facebook</a>
            </p>
            {{--<p>--}}
                {{--BUMPERR LTD <br />--}}
                {{--71-75, Shelton Street, Covent Garden, London, WC2H 9JQ, UNITED KINGDOM (This address is only for billing, not for return).--}}
            {{--</p>--}}
        </div>
    </div>
</div>

@include('footer')
