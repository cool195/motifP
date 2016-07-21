<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class BraintreeController extends BaseController
{

    //支付方式
    //PAYPAL("PayPal"),
    //CREDIT_CARD("Card"),
    //APPLE_PAY("ApplePay"),
    //ANDROID_PAY("AndroidPay"),
    //UNKNOWN("unknown");
    //
    //
    //卡类型
    //AMEX("AmericanExpress"),
    //DINERS("Diners"),
    //DISCOVER("Discover"),
    //JCB("JCB"),
    //MAESTRO("Maestro"),
    //MASTERCARD("MasterCard"),
    //VISA("Visa"),
    //UNION("ChinaUnionPay"),
    //UNKNOWN("unknown");

    //进入个人中心braintree绑定支付信息模版
    public function index(Request $request)
    {
        $methodlist = $this->methodlist();
        $methodlist['data']['cardlist'] = array('Diners' => 'diners-club', 'Discover' => 'discover', 'JCB' => 'jcb', 'Maestro' => 'maestro', 'AmericanExpress' => 'american-express', 'Visa' => 'visa', 'MasterCard' => 'master-card');
        $params = array(
            'cmd' => 'token',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'uuid' => @$_COOKIE['uid'],
        );
        $result = $this->request('pay', $params);
        $token = isset($result['data']['token']) ? $result['data']['token'] : '';
        $view = View('shopping.paymentmethod', ['token' => $token, 'methodlist' => $methodlist['data']]);
        if ('checkout' == $request->input('pageSrc')) {
            $view = View('shopping.checkpayment', [
                'token' => $token,
                'methodlist' => $methodlist['data'],
                'input' => $request->except('methodtoken', 'paym', 'cardType', 'showName'),
                'methodtoken' => $request->input('methodtoken'),
                'paym' => $request->input('paym'),
                'cardType' => $request->input('cardType'),
                'showName' => $request->input('showName')
            ]);
        }
        return $view;
    }

    //Braintree回调,绑定支付信息方法
    public function checkout(Request $request)
    {
        $params = array(
            'cmd' => 'method',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'nonce' => $request->input("nonce"),
        );
        $result = $this->request('pay', $params);
        $result['redirectUrl'] = "/braintree";
        return $result;
    }

    /*
	 * 跳转到添加支付卡页面
	 *
	 * @author zhangtao@evermarker.net
	 *
	 * */
    public function addCard(Request $request)
    {
        $params = array(
            'cmd' => 'token',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'uuid' => $_COOKIE['uid'],
        );
        $result = $this->request('pay', $params);
        $token = isset($result['data']['token']) ? $result['data']['token'] : '';
        $view = view('shopping.paymentaddCard', ['token' => $token]);
        if ("checkout" == $request->input('pageSrc')) {
            $input = $request->all();
            $view = View('shopping.paymentaddCard', ['token' => $token, 'input' => $input]);
        }
        return $view;

    }

    //获取支付列表
    public function methodlist()
    {

        $params = array(
            'cmd' => 'methodlist',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'src' => 'H5',
        );
        $result = $this->request('pay', $params);
        return $result;
    }

    //删除绑定
    public function delMethod(Request $request)
    {
        $params = array(
            'cmd' => 'delmethod',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'methodtoken' => $request->input('methodtoken')
        );
        $result = $this->request('pay', $params);

        if (empty($result)) {
            $result['success'] = false;
            $result['error_msg'] = "Data access failed";
            $result['data'] = array();
        }
        $result['redirectUrl'] = "/braintree";
        return $result;
    }
}