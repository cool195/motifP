<!DOCTYPE html>
<html lang="en">
<head>
    <title>Contact Service</title>
    <script src="/scripts/vendor.js"></script>
    <script src="/scripts/common.js"></script>
</head>

<body>
    <form method="post" id="form-askQuestion" action="/askshopping">
        <input type="hidden" name="id" value="{{$id}}">
        <input type="hidden" name="skiptype" value="{{$skiptype}}">
        <input type="text" id="email" name="email" value="{{Session::get('user.login_email')}}">
        <textarea name="content" id="content"></textarea>
        <br/>
        <a href="{{Session::has('referer') ? Session::get('referer') : '/orderlist'}}">Cancel</a>
        <a href="javascript:void(0)" data-role="submit" data-spu="123" id="askSend">Send</a>
    </form>


</body>

</html>