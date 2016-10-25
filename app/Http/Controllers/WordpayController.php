<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\libs\MCrypt;

class WordpayController extends BaseController
{
    public function getPayList()
    {
        $params = array(
            'cmd' => 'plist',
            'uuid' => $_COOKIE['uid'],
            'src' => 'h5',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('pay', $params);
        return $result;
    }

    public function addCreditCard(Request $request)
    {
        $expiry = explode('/',$request->input('expiry'));
        $cardInfo = MCrypt::encrypt(trim($expiry[0]) . trim($expiry[1]) . $request->input('card') . '/' . $request->input('cvv'));
        $params = array(
            'cmd' => 'acrd',
            'uuid' => $_COOKIE['uid'],
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'ci' => $cardInfo,
        );

        $params['tel'] = $request->input('tel');
        $params['name'] = $request->input('name');
        $params['addr1'] = $request->input('addr1');
        $params['addr2'] = $request->input('addr2');
        $params['city'] = $request->input('city');
        $params['state'] = $request->input('state');
        $params['zip'] = $request->input('zip');
        $params['country'] = $request->input('country');
        $params['csn'] = $request->input('csn');
        $params['ctype'] = $request->get('card_type');
        $result = $this->request('pay', $params);
        return $result;

    }

    public function delCreditCard(Request $request)
    {
        $params = array(
            'cmd' => 'dcrd',
            'pin' => Session::get('user.pin'),
            'token' => Session::get('user.token'),
            'cd' => $request->input('card_id'),
        );

        $result = $this->request('pay', $params);
        return $result;
    }

    //获取地址列表
    private function addrList()
    {
        $params = array(
            'cmd' => 'list',
            'uuid' => $_COOKIE['uid'],
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('useraddr', $params);
        if (empty($result)) {
            $result['success'] = false;
            $result['error_msg'] = "Data access failed";
            $result['data'] = array();
        }
        return $result;
    }

    public function selAddr($aid)
    {
        $address = $this->addrList();
        Session::forget('user.checkout.address');
        foreach ($address['data']['list'] as $value) {
            if ($value['receiving_id'] == $aid) {
                Session::put('user.checkout.address', $value);
                return $value;
            }
        }
    }

    private function getShippingMethod($country = 0, $price = 0)
    {
        $params = array(
            'cmd' => 'logis',
            'token' => Session::get('user.token')
        );
        if($price != 0){
            $params['amount'] = $price;
            $params['country'] = $country;
        }
        $result = $this->request('general', $params);

        return $result['data']['list'];
    }

    public function selShip($type)
    {
        $shippingMethods = $this->getShippingMethod();
        Session::forget('user.checkout.selship');
        foreach($shippingMethods as $value){
            if($value['logistics_type'] == $type){
                Session::put('user.checkout.selship', $value);
                return $value;
            }
        }
    }

    private function getCouponInfo()
    {
        $params = array(
            'cmd' => 'couponlist',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('cart', $params);
        foreach ($result['data']['list'] as &$value) {
            $value['start_time'] = date("M d, Y", ($value['start_time'] / 1000));
            $value['expiry_time'] = date("M d, Y", ($value['expiry_time'] / 1000));
        }
        return $result;
    }

    public function selCode($bindid)
    {
        $coupon = $this->getCouponInfo();
        Session::forget('user.checkout.couponInfo');
        foreach ($coupon['data']['list'] as $value) {
            if ($value['bind_id'] == $bindid) {
                Session::put('user.checkout.couponInfo', $value);
                error_log(print_r("------------------\n", "\n"), 3, '/tmp/myerror.log');
                error_log(print_r(Session::get('user.checkout.couponInfo'), "\n"), 3, '/tmp/myerror.log');
                return $value;
            }
        }
    }



}