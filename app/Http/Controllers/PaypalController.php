<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\libs\PayOrder;
use Illuminate\Support\Facades\Session;

class PaypalController extends BaseController
{
    //lijiang.hou-buyer3@gmail.com
    //12345678
    //请求paypal支付
    public function index(Request $request)
    {
        PayOrder::createOrder($request->input('orderid'), $request->input('orderDetail'), $request->input('totalPrice'), $request->input('shippingPrice'));
    }

    //paypal回调
    public function paypal(Request $request)
    {
        $skipUrl = 'cart/ordercheckout?pay=error';
        $params = array(
            'cmd' => "payord",
            'uuid' => $_COOKIE['uid'],
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'paytype' => 'PayPalNative',
            'showname' => 'PayPal',
            'devicedata' => "PC",
        );

        $result = PayOrder::paypalStatic($request);

        if ($result) {
            $params['orderid'] = $result->transactions[0]->item_list->items[0]->name;
            $params['nonce'] = '{"response_type":"payment","response":{"id":"' . $result->id . '","state":"' . $result->state . '","create_time":"' . $result->create_time . '","intent":"' . $result->intent . '"}}';
        } else {
            $params['orderid'] = $request->get('orderid');
            $params['nonce'] = '';
        }

        $content = $this->request("pay", $params);

        if (!empty($content) && $content['success'] && $content['data']['id']) {
            Session::forget('user.checkout');
            $skipUrl = '/success?orderid=' . $params['orderid'];
        }

        return redirect($skipUrl);
    }
}