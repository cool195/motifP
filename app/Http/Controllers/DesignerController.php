<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cache;

class DesignerController extends BaseController
{
    /**
     * 显示列表.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        $params = array(
            'cmd' => 'designerinfolist',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'size' => $request->input('size', 10),
            'start' => $request->input('start', 1),
        );

        $data = $this->request('designer', $params);
        $result = $this->getDesignerFollowedStatus($data);
        if ($request->input('ajax')) {
            return $result;
        }
        return view('designer.index', ['list' => $result['data']['list'], 'start' =>$result['data']['start']]);
    }

    private function getDesignerFollowedStatus(Array $result)
    {
        if(!empty($result['data']['list'])){
            $followlist = $this->followList();
            $list = array();
            foreach($result['data']['list'] as $value){
                $value['isFollowed'] = 0;
                if(in_array($value['designerId'], $followlist)){
                    $value['isFollowed'] = 1;
                }
                $list[] = $value;
            }
            $result['data']['list'] = $list;
        }
        return $result;
    }


    /**
     * 显示
     *
     * @param int $id
     * @return Response
     */
    public function show(Request $request, $id)
    {
        //设计师详情
        $params = array(
            'cmd' => 'designerdetail',
            'pin' => Session::get('user.pin'),
            'token' => Session::get('user.token'),
            'd_id' => $id,
        );

        $result = $this->request('designer', $params);
        //设计师商品动态模版
        $params = array(
            'cmd' => 'dmodel',
            'id' => $id,
        );
        $result['product'] = $this->request('designer', $params);
        $product = $result['product'];
        foreach ($product['data']['infos'] as $value){
            if($value['type']=='product' && isset($value['spus'])){
                $_spu = $value['spus'][0];
                break;
            }
        }
        
        if (isset($_spu) && $product['data']['spuInfos'][$_spu]['spuBase']['sale_type'] == 1 && isset($product['data']['spuInfos'][$_spu]['skuPrice']['skuPromotion']) && $product['data']['spuInfos'][$_spu]['spuBase']['isPutOn'] == 1 && $product['data']['spuInfos'][$_spu]['stockStatus'] == 'YES') {
            $params = array(
                'cmd' => 'productdetail',
                'spu' => $_spu
            );
            $pre_product = $this->request('product', $params);
            $result['pre_product'] = $pre_product;

        }

        //设计师商品
        $params = array(
            'recid' => '100004',
            'pagenum' => 1,
            'pagesize' => 50,
            'uuid' => $_COOKIE['uid'],
            'extra_kv' => 'designerId:' . $id,
            'pin' => Session::get('user.pin'),
        );
        $result['productAll'] = $this->request('rec', $params);


        $view = '';
        $result['data']['osType'] = strstr($_SERVER['HTTP_USER_AGENT'], 'motif-ios') ? 'ios' : 'android';
        if ($_GET['test'] || strstr($_SERVER['HTTP_USER_AGENT'], 'motif-android') || strstr($_SERVER['HTTP_USER_AGENT'], 'motif-ios')) {

            if ($request->input('token') || !empty($_COOKIE['PIN'])) {
                if ($request->input('token')) {
                    Session::put('user', array(
                        'login_email' => $request->input('email'),
                        'nickname' => $request->input('name'),
                        'pin' => $request->input('pin'),
                        'token' => $request->input('token'),
                        'uuid' => $_COOKIE['uid'],
                    ));
                } else {
                    Session::put('user', array(
                        'login_email' => $_COOKIE['EMAIL'],
                        'nickname' => urldecode($_COOKIE['NAME']),
                        'pin' => $_COOKIE['PIN'],
                        'token' => $_COOKIE['TOKEN'],
                        'uuid' => $_COOKIE['UUID'],
                    ));
                }

                $followParams = array(
                    'cmd' => 'is',
                    'pin' => Session::get('user.pin'),
                    'token' => Session::get('user.token'),
                    'did' => $result['data']['designer_id'],
                );
                $follow = $this->request('follow', $followParams);
                $result['data']['followStatus'] = $follow['data']['isFC'];


            } else {
                Session::forget('user');
            }
            $view = 'designer.showApp';
        } else {
            $view = 'designer.show';
        }
        if($request->input('ajax')){
            return $result;
        }

        return View($view, ['pre_product'=>$pre_product['data'],'designer' => $result['data'], 'productAll' => $result['productAll'], 'product' => $result['product']['data'], 'followList' => $this->followList()]);
    }

    public function following(Request $request)
    {
        $params = array(
            'cmd' => 'list',
            'pin' => Session::get('user.pin'),
            'token' => Session::get('user.token'),
            'num' => $request->input('num', 1),
            'size' => $request->input('size', 8)
        ); 
        $result = $this->request('follow', $params);
        if($request->input('ajax')){
            return $result;
        }
        return View('user.following', ['data' => $result['data']]);

    }

    public function followList()
    {
        if(Session::get('user.pin')) {
           $value = Cache::rememberForever(Session::get('user.pin') . 'followlist', function() {
               $params = array(
                   'cmd' => 'list',
                   'pin' => Session::get('user.pin'),
                   'token' => Session::get('user.token'),
                   'num' => 1,
                   'size' => 500
               );
               $result = $this->request('follow', $params);
               if ($result['success'] && $result['data']['amount'] > 0) {
                   foreach ($result['data']['list'] as $value) {
                       $result['cacheList'][] = $value['userId'];
                   }
               }
               return $result['cacheList'];
           });
           return $value;
        }
        return false;
    }

    /**
     * 关注或取消设计师
     *
     * @param int $id
     * @return Response
     */
    public function follow($id)
    {
        $params = array(
            'cmd' => $this->isFollowed($id) ? 'del' : 'add',
            'did' => $id,
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin')
        );
        $result = $this->request('follow', $params);
        if ($result['success']) {
            Cache::forget(Session::get('user.pin') . 'followlist');
        }
        return $result;
    }
    
    public function isFollowed($id)
    {
        $params = array(
            'cmd' => 'is',
            'did' => $id,
            'pin' => Session::get('user.pin'),
            'token' => Session::get('user.token')
        );
        $result = $this->request('follow', $params);
        return $result['data']['isFC'];
    }
}
