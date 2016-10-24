<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cache;

class ShoppingController extends BaseController
{
    public function index(Request $request, $cid = 0)
    {
        $categories = $this->getShoppingCategoryList();
        $productAll = $this->getShoppingProductList($request, $cid);
        $search = $this->request('sea', ['cmd' => 'list']);
        return View('shopping.index', ['Shopping'=>true,'categories' => $categories, 'productAll' => $productAll['data'], 'cid'=>$cid, 'search' => $search['data']]);
    }

    public function getShoppingCategoryList()
    {
        $params = array(
            'cmd' => 'categorylist',
        );
        $result = $this->request('product', $params);
        return $result['data']['list'];
    }

    public function getShoppingProductList(Request $request, $cid = 0)
    {
        $params = array(
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'recid' => $request->input('recid', '100000'),
            'uuid' => $_COOKIE['uid'],
            'cid' => $request->input('cid', $cid),
            'pagenum' => $request->input('pagenum', 1),
            'pagesize' => $request->input('pagesize', 32),
            'extra' => $request->input('extra_kv', "")
        );
        $data = $this->request('rec', $params);
        $result = $this->getListWishedStatus($data);
        return $result;
    }

    private function getListWishedStatus(Array $result)
    {
        if (!empty($result['data']['list'])) {
            $wishlist = $this->wishlist();
            $list = array();
            foreach($result['data']['list'] as $value){
                $value['isWished'] = 0;
                if(in_array($value['spu'], $wishlist)){
                    $value['isWished'] = 1;
                }
                $list[] = $value;
            }
            $result['data']['list'] = $list;
        }
        return $result;
    }

    private function wishlist()
    {
        if (Session::get('user.pin')) {

            $value = Cache::rememberForever(Session::get('user.pin') . 'wishlist', function () {
                $params = array(
                    'cmd' => 'list',
                    'num' => 1,
                    'size' => 500,
                    'pin' => Session::get('user.pin'),
                    'token' => Session::get('user.token')
                );
                $result = $this->request('wishlist', $params);
                $result['cacheList'] = array();
                if ($result['success'] && $result['data']['amount'] > 0) {
                    foreach ($result['data']['list'] as $value) {
                        $result['cacheList'][] = $value['spu'];
                    }
                }
                return $result['cacheList'];
            });
            return $value;
        }
        return false;
    }

    public function checkStock(Request $request)
    {
        $params = array(
            'cmd' => 'checkstock',
            'skus' => $request->input('skus')
        );
        $result = $this->request('stock', $params);
        return $result;
    }
}