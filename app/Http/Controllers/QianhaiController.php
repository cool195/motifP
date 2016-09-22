<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class QianhaiController extends BaseController
{

    //请求钱海支付
    public function index(Request $request)
    {
        $params = array(
            'cmd' => 'payinfo',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'ordno' => $request->input('orderid'),
        );
        $addrData = $this->request('order', $params);

        $secureCode = config('runtime.QIANHAI_Code');
        $postUrl = config('runtime.QIANHAI_URL');
        $postData = array(
            'account' => config('runtime.QIANHAI_Account'),
            'terminal' => config('runtime.QIANHAI_Terminal'),
            'backUrl' => 'http://' . $_SERVER['HTTP_HOST'] . '/qianhai',
            'noticeUrl' => config('runtime.API_URL').'/oceanpaycb',
            'methods' => 'Credit Card',
            'pages' => '0',
            'order_number' => $request->input('orderid'),
            'order_currency' => 'USD',
            'order_amount' => $request->input('totalPrice'),
            'billing_firstName' => str_replace('<', '&lt;', str_replace('>', '&gt;', str_replace('"', '&quot;', str_replace("'", '&#039;', trim($addrData['data']['userAddr']['name']))))),
            'billing_lastName' => 'N/A',
            'billing_email' => Session::get('user.login_email'),
            'billing_phone' => $addrData['data']['userAddr']['telephone'] ? $addrData['data']['userAddr']['telephone'] : 'N/A',
            'billing_country' => $addrData['data']['userAddr']['country_name_sn'] ? $addrData['data']['userAddr']['country_name_sn'] : 'N/A',
            'billing_city' => $addrData['data']['userAddr']['city'] ? $addrData['data']['userAddr']['city'] : 'N/A',
            'billing_address' => $addrData['data']['userAddr']['detail_address1'] ? $addrData['data']['userAddr']['detail_address1'] : 'N/A',
            'billing_zip' => $addrData['data']['userAddr']['zip'] ? $addrData['data']['userAddr']['zip'] : 'N/A',
            'productSku' => 'N/A',
            'productName' => 'N/A',
            'productNum' => 'N/A'
        );

        $postData['signValue'] = hash("sha256", $postData['account'] . $postData['terminal'] . $postData['backUrl'] . $postData['order_number'] . $postData['order_currency'] . $postData['order_amount'] . $postData['billing_firstName'] . $postData['billing_lastName'] . $postData['billing_email'] . $secureCode);
        $postStr = "<form style='display:none;' id='payform' name='payform' method='post' action='$postUrl'>";
        foreach ($postData as $k => $value) {
            $postStr .= "<input name='$k' type='text' value='$value'>";
        }
        $postStr .= "</form><script type='text/javascript'>function load_submit(){document.payform.submit()}load_submit();</script>";
        echo $postStr;
    }

    //钱海回调
    public function checkStatus(Request $request)
    {
        if ($request->input('payment_status') == 1) {
            $params = array(
                'cmd' => "dopay",
                'uuid' => $_COOKIE['uid'],
                'token' => Session::get('user.token'),
                'pin' => Session::get('user.pin'),
                'orderid' => $request->input('order_number'),
                'paytype' => 'Oceanpay',
                'showname' => 'QianhaiCard',
                'devicedata' => "PC",
                'nonce' => '{"order_number":"' . $request->input('order_number') . '","payment_id":"' . $request->input('payment_id') . '","order_amount":"' . $request->input('order_amount') . '","payment_status":"' . $request->input('payment_status') . '","methods":"' . $request->input('payment_Method') . '","card_number":"' . $request->input('card_number') . '"}',
            );
            $this->request("pay", $params);
            return redirect('/success?orderid=' . $request->input('order_number'));
        } else {
            return redirect('/order/orderdetail/' . $request->input('order_number'));
        }
    }
}