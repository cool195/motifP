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
            'size' => $size = $request->input("size", 500),
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
                        $lineOrderList[] = $lineOrder;
                    }
                    $subOrder['lineOrderList'] = $lineOrderList;
                    $subOrderList[] = $subOrder;
                }
                $order['subOrderList'] = $subOrderList;
                $orderList[] = $order;
            }
        }

        $result['data']['list'] = $orderList;
        return $result;
    }

    public function orderDetail(Request $request, $subno)
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
        if ($request->input('ajax')) {
            return $result;
        }
        return view('order.orderdetail', ['data' => $result['data']]);
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
                $lineOrderList[] = $lineOrder;
            }
            $result['data']['lineOrderList'] = $lineOrderList;
        }
        return $result;
    }

    public function orderSubmit(Request $request)
    {
        $params = array(
            'cmd' => 'ordsubmit',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'aid' => $request->input('aid'),
            'paym' => $request->input('paym', "Oceanpay"),
            'cps' => $request->input('cps'),
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
            return redirect("/orderdetail/$orderid");
        }
    }
}