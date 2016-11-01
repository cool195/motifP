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

        if ($result['success']) {
            if (Session::has('user.checkout.paywith')) {
                $result = $this->setCardActived($result);
            } else {
                $result = $this->findLast($result);
            }
        }

        return $result;
    }

    private function setCardActived(&$result)
    {
        foreach ($result['data']['list'] as &$value) {
            if (isset($value['creditCards'])) {
                foreach ($value['creditCards'] as &$card) {
                    if ($card['card_id'] == Session::get('user.checkout.paywith.withCard.card_id')) {
                        $card['actived'] = 1;
                    }
                }
            } else {
                if (Session::get('user.checkout.paywith.pay_type') == $value['pay_type']) {
                    $value['actived'] = 1;
                }
            }
        }
        return $result;
    }

    private function findLast(&$result)
    {
        foreach ($result['data']['list'] as $value) {
            if (isset($value['creditCards'])) {
                foreach ($value['creditCards'] as $card) {
                    if (isset($card['isLast']) && $card['isLast'] == 1) {
                        $value['withCard'] = $card;
                        Session::put('user.checkout.paywith', $value);
                        Session::forget('user.checkout.paywith.creditCards');
                        return $result;
                    }
                }
            } else {
                Session::put('user.checkout.paywith', $value);
                Session::forget('user.checkout.paywith.creditCards');
                if (isset($value['isLast']) && $value['isLast'] == 1) {
                    return $result;
                }
            }
        }
        return $result;
    }


    public function addCreditCard(Request $request)
    {
        $expiry = explode('/', $request->input('expiry'));
        $cardInfo = MCrypt::encrypt(trim($expiry[0]) . '20' . trim($expiry[1]) . str_replace(' ', '', $request->get('card')) . '/' . $request->get('cvv'));
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
        foreach ($address['data']['list'] as $value) {
            if ($value['receiving_id'] == $aid) {
                Session::put('user.checkout.address', $value);
                return Session::get('user.checkout.address');
            }
        }
    }

    private function getShippingMethod($country = 0, $price = 0)
    {
        $params = array(
            'cmd' => 'logis',
            'token' => Session::get('user.token')
        );
        if ($price != 0) {
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
        foreach ($shippingMethods as $value) {
            if ($value['logistics_type'] == $type) {
                Session::put('user.checkout.selship', $value);
                return $value;
            }
        }
    }

    public function test()
    {
        return Session::get('user.checkout');
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

    //选择支付方式
    public function paywith($type, $cardid)
    {
        $payList = $this->getPayList();
        foreach ($payList['data']['list'] as $value) {
            if ($cardid > 0 && isset($value['creditCards'])) {
                foreach ($value['creditCards'] as $card) {
                    if ($card['card_id'] == $cardid) {
                        $value['withCard'] = $card;
                        Session::put('user.checkout.paywith', $value);
                        Session::forget('user.checkout.paywith.creditCards');
                        return $value;
                    }
                }
            } else {
                if ($value['pay_type'] == $type) {
                    Session::put('user.checkout.paywith', $value);
                    Session::forget('user.checkout.paywith.creditCards');
                    return $value;
                }
            }
        }
    }

    public function selCode($bindid)
    {
        $coupon = $this->getCouponInfo();
        Session::forget('user.checkout.couponInfo');
        foreach ($coupon['data']['list'] as $value) {
            if ($value['bind_id'] == $bindid) {
                Session::put('user.checkout.couponInfo', $value);
                return $value;
            }
        }
    }


}