<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends BaseController
{
    public function index(Request $request)
    {

    }

    public function getCartAmount()
    {
        $params = array(
            'cmd' => 'amount',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('cart', $params);
        if($result['success']){
            if(empty($result['data']['saveAmout'])){
                $result['data']['saveAmout'] = 0;
            }
            if(empty($result['data']['skusAmout'])){
                $result['data']['skusAmout'] = 0;
            }
        }
        return $result;
    }

    public function getCartList()
    {
        $params = array(
            'cmd' =>"cartlist",
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('cart', $params);
        return $result;
    }

    public function getCartSaveList()
    {
        $params = array(
            'cmd' => 'savelist',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('cart', $params);
        return $result;
    }

    public function addCart(Request $request)
    {
        $params = array(
            'cmd' => 'addsku',
            'operate' => json_encode($request->input('operate')),
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('cart', $params);
        return $result;
    }

    public function addBatchCart(Request $request)
    {
        $params = array(
            'cmd' => 'batchaddskus',
            'operate' => json_encode($request->input('operate')),
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $system = "";
        $service = "cart";
        $result = $this->request('cart', $params);
        if(!empty($result) && $result['success']){
            $result['redirectUrl'] = '/cart';
        }
        return $result;
    }

    public function alterCartProQtty(Request $request)
    {
        $params = array(
            'cmd' => 'alterqtty',
            'sku' => $request->input('sku'),
            'qtty' => $request->input('qtty'),
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('cart', $params);
        return $result;
    }

    public function promptlyBuy(Request $request)
    {

        $params = array(
            'cmd' => 'promptlybuy',
            'operate' => json_encode($request->input('operate')),
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('cart', $params);
        if($result['success']){
            $result['redirectUrl'] = '/cart/ordercheckout';
        }
        return $result;
    }

    public function operateCartProduct(Request $request)
    {
        $cmdSelector = array("select", "cancal", "delsku", "save", "movetocart", "delsave");
        $cmd = $request->input('cmd');
        $result = "";
        if(in_array($cmd, $cmdSelector))
        {
            $params = array(
                'cmd' => $cmd,
                'sku' => $request->input('sku'),
                'token' => Session::get('user.token'),
                'pin' => Session::get('user.pin'),
            );
            $result = $this->request('cart', $params);
            if(!empty($result) && $result['success']){
                return $result;
            }
        }
    }

    public function verifyCoupon(Request $request)
    {
        $params = array(
            'cmd' => 'verifycoupon',
            'couponcode' => $request->input('couponcode', $request->input('cps')),
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('cart', $params);
        return $result;
    }
}