<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class OrderController extends BaseController
{
    public function orderList(Request $request)
    {
        $params = array(
            'cmd' => 'ordlist',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'num' => $request->input("num", 1),
            'size' => $size = $request->input("size", 10),
        );
        $result = $this->request('order', $params);
        if (!empty($result) && $result['success']) {
            $result = $this->resultJsonDecode($result);
        }
        if ($request->input('ajax')) {
            return $result;
        }
        return view('order.orderlist', ['data' => $result['data']]);
    }

    private function resultJsonDecode(Array $result)
    {
        $orderList = array();
        if (isset($result['data']['list'])) {
            foreach ($result['data']['list'] as $order) {
                $subOrderList = array();
                foreach ($order['subOrderList'] as $subOrder) {
                    $lineOrderList = array();
                    foreach ($subOrder['lineOrderList'] as $lineOrder) {
                        if (!empty($lineOrder['attrValues'])) {
                            $lineOrder['attrValues'] = json_decode($lineOrder['attrValues'], true);
                        }
                        if (!empty($lineOrder['vas_info'])) {
                            $lineOrder['vas_info'] = json_decode($lineOrder['vas_info'], true);
                        }

                        $titleArray = explode(" ", $lineOrder['main_title']);
                        $titleArray[] = $lineOrder['spu'];
                        $lineOrder['seo_link'] = implode("-", $titleArray);

                        $lineOrderList[] = $lineOrder;
                    }
                    $subOrder['lineOrderList'] = $lineOrderList;
                    $subOrder['format_create_time'] = date("M d, Y" ,strtotime($subOrder['create_time']));
                    $subOrderList[] = $subOrder;
                }
                $order['subOrderList'] = $subOrderList;
                $order['format_create_time'] = date("M d, Y" ,strtotime($order['create_time']));
                $orderList[] = $order;
            }
        }

        $result['data']['list'] = $orderList;
        return $result;
    }

    public function orderDetail(Request $request, $subno)
    {
        $result = $this->getOrderDetail($subno);
        $payinfo = $this->getOrderPayInfo($subno);
        $result['data']['payinfo'] = $payinfo['data'];
        if ($request->input('ajax')) {
            return $result;
        }

        return view('order.orderdetail', ['data' => $result['data']]);
    }

    private function getOrderDetail($subno)
    {
        $params = array(
            'cmd' => 'detail',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'subno' => $subno,
        );
        $result = $this->request('order', $params);
        if (!empty($result) && $result['success']) {
            $result = $this->jsonDecodeOrderDetailResult($result);
        }
        return $result;
    }

    private function getOrderPayInfo($orderid){
        $params = array(
            'cmd' => 'payinfo',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'orderid' => $orderid,
        );
        $result = $this->request('pay', $params);
        return $result;
    }

    private function jsonDecodeOrderDetailResult(Array $result)
    {
        if (!empty($result['data']['lineOrderList'])) {
            $lineOrderList = array();
            foreach ($result['data']['lineOrderList'] as $lineOrder) {
                if (isset($lineOrder['attrValues'])) {
                    $lineOrder['attrValues'] = json_decode($lineOrder['attrValues'], true);
                }
                if (isset($lineOrder['vas_info'])) {
                    $lineOrder['vas_info'] = json_decode($lineOrder['vas_info'], true);
                }

                $titleArray = explode(" ", $lineOrder['main_title']);
                $titleArray[] = $lineOrder['spu'];
                $lineOrder['seo_link'] = implode("-", $titleArray);

                $lineOrderList[] = $lineOrder;
            }
            $result['data']['lineOrderList'] = $lineOrderList;
        }
        return $result;
    }

    public function orderConfirmed(Request $request)
    {
        $view = View('order.orderconfirmed');
        if($request->has('orderid')){
            $result = $this->getOrderDetail($request->input('orderid'));
            $params = array(
                'cmd' => "detail",
                'token' => Session::get('user.token'),
                'pin' => Session::get('user.pin'),
            );
            $code = $this->request('user', $params);
            $view = View('order.orderconfirmed', ['order' => $result['data'], 'code' => $code['data']['invite_code']]);
        }

        return $view;
    }

    public function orderSubmit(Request $request)
    {
        $params = array(
            'cmd' => 'ordsubmit',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'aid' => $request->input('aid'),
            'paym' => $request->input('paym', "Oceanpay"),
            'cps' => $request->input('bindid'),
            'remark' => $request->input('remark'),
            'stype' => $request->input('stype'),
            'src' => "PC",
            'ver' => 1
        );
        $result = $this->request("order", $params);
        if (!empty($result) && $result['success']) {
            if ($params['paym'] == 'Oceanpay') {
                $result['redirectUrl'] = "/qianhai?orderid=" . $result['data']['orderID'] . "&totalPrice=" . $result['data']['pay_amount'] / 100;
            } else {
                $result['redirectUrl'] = "/paypal?orderid=" . $result['data']['orderID'] . "&orderDetail=" . $result['data']['shortInfo'] . "&totalPrice=" . $result['data']['pay_amount'] / 100;
            }
            return $result;
        } else {
            return $result;
        }

    }

    //New 提交订单并支付
    public function payOrder(Request $request)
    {
        $params = array(
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'aid' => Session::has('user.checkout.address.receiving_id') ? Session::get('user.checkout.address.receiving_id') : $request->input('aid'),
            'paym' => Session::get('user.checkout.paywith.pay_method'),
            'cps' => Session::get('user.checkout.couponInfo.bind_id'),
            'remark' => $request->input('remark'),
            'stype' => Session::has('user.checkout.selship.logistics_type') ? Session::get('user.checkout.selship.logistics_type') : $request->input('stype')
        );
        if ($params['paym'] == 'PayPalNative') {
            $params['cmd'] = 'ordsubmit';
        }else{
            $params['cmd'] = 'ordpay';
            $params['payid'] = Session::get('user.checkout.paywith.withCard.card_id');
        }

        $result = $this->request("order", $params);

        if (!empty($result) && $result['success']) {
            if ($params['paym'] == 'PayPalNative') {
                $result['redirectUrl'] = "/paypal?orderid=" . $result['data']['orderID'] . "&orderDetail=" . $result['data']['shortInfo'] . "&totalPrice=" . $result['data']['pay_amount'] / 100;
            } else {
                Session::forget('user.checkout');
                $result['redirectUrl'] = '/success?orderid=' . $result['data']['orderID'];
            }
        } else {
            //支付失败
            $result['redirectUrl'] = '/cart/ordercheckout';
        }
        return $result;
    }

    //重新获取订单信息
    public function orderPayInfo($orderid, $paytype)
    {
        $params = array(
            'cmd' => "payinfo",
            'ordno' => $orderid,
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin')
        );
        $result = $this->request("order", $params);

        if ($result['success']) {
            if ($paytype == 1) {
                return redirect("/paypal?orderid={$orderid}&orderDetail={$orderid}&totalPrice=" . $result['data']['pay_amount'] / 100);
            } else {
                return redirect("/qianhai?orderid={$orderid}&totalPrice=" . $result['data']['pay_amount'] / 100);
            }
        } else {
            return redirect("/order/orderdetail/$orderid");
        }
    }
}