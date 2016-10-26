<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends BaseController
{
    public function cart(Request $request)
    {
        //字典表
        $params = array(
            'cmd' => 'config',
        );
        $config = $this->request('general', $params);
        $config['data']['cart_checkout_top_notification'];

        $cartList = $this->getCartList();
        $saveList = $this->getCartSaveList();
        if($request->input('ajax')){
            $result = array();
            $result['cart'] = $cartList['data'];
            $result['save'] = $cartList['data'];
            return $result;
        }
        return view('cart.cart', ['CartCheck'=>true,'cart' => $cartList['data'], 'save' => $saveList['data'],'config'=>$config['data']['cart_checkout_top_notification']]);
    }

    public function checkout(Request $request)
    {

        //字典表
        $params = array(
            'cmd' => 'config',
        );
        $config = $this->request('general', $params);
        $config['data']['cart_checkout_top_notification'];

        if(Session::has('user.checkout.address.receiving_id')){
            $result['data'] = Session::get('user.checkout.address');
        }else{
            //获取默认地址
            $params = array(
                'cmd' => 'gdefault',
                'uuid' => $_COOKIE['uid'],
                'token' => Session::get('user.token'),
                'pin' => Session::get('user.pin'),
            );
            $result = $this->request('useraddr', $params);
        }

        $_accountList = $this->getCartAccountList($request,-1,"","",$result['data']['receiving_id']);
        $logisticsList = $this->getLogisticsList($result['data']['country_name_sn'],$_accountList['data']['total_amount']+$_accountList['data']['vas_amount']);
        $accountList = $this->getCartAccountList($request,$logisticsList['data']['list'][0]['logistics_type'],"","",$result['data']['receiving_id']);
        if(empty($accountList['data'])){
            return redirect('cart');
        }
        return view('cart.checkout', ['CartCheck'=>true,'accountList' => $accountList['data'], 'logisticsList' => $logisticsList['data'],'config'=>$config['data']['cart_checkout_top_notification']]);
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

    public function getCartAccountList(Request $request, $logisticstype = 1, $bindid = "", $paytype = "",$aid)
    {
        $params = array(
            'cmd'=>'accountlist',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'logisticstype' => $request->input('logisticstype', $logisticstype),
            'paytype' => $request->input('paytype', $paytype),
            'bindid' => $request->input('bindid', $bindid),
            'addressid' => $request->input('aid', $aid)
        );

        $result = $this->request('cart', $params);
        return $result;
    }

    private function getLogisticsList($country=0,$price=0)
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
        
        return $result;
    }

    public function getshiplist(Request $request)
    {
        $params = array(
            'cmd' => 'logis',
            'token' => Session::get('user.token')
        );
        if($request->input('price') != 0){
            $params['amount'] = $request->input('price');
            $params['country'] = $request->input('country');
        }
        $result = $this->request('general', $params);
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
            $result['redirectUrl'] = '/checkout';
        }
        return $result;
    }

    public function operateCartProduct(Request $request)
    {
        $cmdSelector = array("select", "cancal", "delsku", "save", "movetocart", "delsave");
        $cmd = $request->input('cmd');
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
}