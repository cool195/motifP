<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cache;

class ShoppingController extends BaseController
{
    public function index(Request $request, $cidTitle = 0)
    {
        $cid = 0;
        $categories = $this->getShoppingCategoryList();
        if(is_numeric($cidTitle)){
            $url = '/shop';
            foreach($categories as $category){
                if($cidTitle == $category['category_id']){
                    $url = '/shop/'.$category['seo_link'];
                }
            }
            return redirect($url);
        }else{
            $titleArray = explode("-", $cidTitle);
            end($titleArray);
            $cid = current($titleArray);
        }

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
        if($result['success']){
            foreach($result['data']['list'] as &$list){
                $list['seo_link'] = $list['category_name'].'-'.$list['category_id'];
            }
        }
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
            'extra_kv' => $request->input('extra_kv', "")
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

                $titleArray = explode(" ", $value['main_title']);
                $titleArray[] = $value['spu'];
                $value['seo_link'] = implode("-", $titleArray);

                $list[] = $value;
            }
            $result['data']['list'] = $list;
        }
        return $result;
    }

    private function wishlist()
    {
        if (Session::get('user.pin')) {
            $value = Cache::remember(Session::get('user.pin') . $_COOKIE['uid'] . 'wishlist', 60, function () {
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

    public function search(Request $request)
    {
        $params = array(
            'cmd' => 'search',
            'pin' => Session::get('user.pin'),
            'token' => Session::get('user.token'),
            'page' => $request->input('page', 1),
            'limit' => $request->input('limit', 16),
            'kw' => $request->input('kw'),
            'uuid' => $_COOKIE['uid']
        );

        $categories = $this->getShoppingCategoryList();
        $result = $this->request('search', $params);
        if($result['success']){
            $wishlist = $this->wishlist();
            foreach($result['data']['list'] as &$value){
                $value['spuBase']['isWished'] = 0;
                if(in_array($value['spuBase']['spu'], $wishlist)){
                    $value['spuBase']['isWished'] = 1;
                }

                $titleArray = explode(" ", $value['spuBase']['main_title']);
                $titleArray[] = $value['spuBase']['spu'];
                $value['spuBase']['seo_link'] = implode("-", $titleArray);

            }
        }
        if($request->input('ajax')) {
            return $result;
        }

        return view('shopping.search', ['productAll'=>$result['data'], 'categories'=>$categories, 'kw'=>$request->input('kw')]);
    }

}