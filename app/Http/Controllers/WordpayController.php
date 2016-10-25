<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

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
            'src' => 'PC',
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
        foreach ($address['data']['list'] as $value) {
            if ($value['receiving_id'] == $aid) {
                Session::forget('user.checkout.address');
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
        foreach($shippingMethods as $value){
            if($value['logistics_type'] == $type){
                Session::forget('user.checkout.selship');
                Session::put('user.checkout.selship', $value);
                return $value;
            }
        }
    }

}