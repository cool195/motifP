<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class ShoppingController extends BaseController
{
    public function getShoppingCategoryList()
    {
        $params = array(
            'cmd' => 'categorylist',
        );
        $result = $this->request('product', $params);
        return $result;
    }

    public function getShoppingProductList(Request $request)
    {
        $params = array(
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'recid' => $request->input('recid', '100000'),
            'uuid' => $_COOKIE['uid'],
            'cid' => $request->input('cid', '0'),
            'pagenum' => $request->input('pagenum', 1),
            'pagesize' => $request->input('pagesize', 5),
            'extra' => $request->input('extra_kv', "")
        );
        $result = $this->request('rec', $params);
        return $result;
    }

    public function checkStock(Request $request)
    {
        $params = array(
            'cmd' => 'checkstock',
            'skus' => $request->input('skus')
        );
        $result = $this->request('stock', $params);
        $result['params'] = $params;
        return $result;
    }
}