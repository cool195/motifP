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
    /*public function index(Request $request)
    {
        $params = array(
            'cmd' => 'designerinfolist',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'size' => $request->input('size', 12),
            'start' => $request->input('start', 1),
        );

        $data = $this->request('designer', $params);
        $result = $this->getDesignerFollowedStatus($data);

        $networkReds = array();
        $designers = array();
        foreach ($result['data']['list'] as $key => &$list) {
            $list['spus'] = "";
            if (isset($list['products'])) {
                $spus = array();
                foreach ($list['products'] as $product) {
                    $spus[] = $product['spu'];
                }
                $list['spus'] = implode('_', $spus);
            }
            $list['seo_tag'] = implode(',', $list['seo_label']);
            if (2 == $list['designer_type']) {
                $networkReds[] = $list;
            } else {
                $designers[] = $list;
            }
        }

        foreach($result['data']['list'] as $key => &$list){
            if($key % 4 == 0 ){
                if(!empty($networkReds)){
                    $list = array_shift($networkReds);
                }else{
                    $list = array_shift($designers);
                }
            }else{
                if(!empty($designers)){
                    $list = array_shift($designers);
                }else{
                    $list = array_shift($networkReds);
                }
            }
        }

        if ($request->input('ajax')) {
            return $result;
        }
        return view('designer.index', ['list' => $result['data']['list'], 'start' => $result['data']['start']]);
    }*/

    public function index(Request $request)
    {

        $rstart = $request->input('rstart', 1);
        $redResult = array();
        $redCount = 0;
        if (-1 == $rstart) {
            $redResult['data']['list'] = array();
            $redResult['data']['start'] = -1;
            $redResult['success'] = true;
            $redCount = 0;
        } else {
            $redParams = array(
                'cmd' => 'designerinfolist',
                'token' => Session::get('user.token'),
                'pin' => Session::get('user.pin'),
                'dtype' => 2,
                //'size' => $request->input('size', 3),
                'size' => $request->input('rsize', 3),
                'start' => $request->input('rstart', 1),
            );

            $redData = $this->request('designer', $redParams);
            $redResult = $this->getDesignerFollowedStatus($redData);

            $redCount = count($redResult['data']['list']);
            if (!empty($redResult['data']['list'])) {
                foreach ($redResult['data']['list'] as $key => &$list) {
                    $list['spus'] = "";
                    if (isset($list['products'])) {
                        $spus = array();
                        foreach ($list['products'] as $product) {
                            $spus[] = $product['spu'];
                        }
                        $list['spus'] = implode('_', $spus);
                    }
                    $list['seo_tag'] = implode(',', $list['seo_label']);
                }
            }
        }

        $dstart = $request->input('dstart', 1);
        $designerResult = array();
        $designerCount = 0;
        if (-1 == $dstart) {
            $designerResult['data']['list'] = array();
            $designerResult['data']['start'] = -1;
            $designerResult['success'] = true;
            $designerCount = 0;
        } else {
            $designerParams = array(
                'cmd' => 'designerinfolist',
                'token' => Session::get('user.token'),
                'pin' => Session::get('user.pin'),
                'dtype' => 1,
                'size' => $request->input('dsize', 9),
                'start' => $request->input('dstart', 1),
            );
            $designerData = $this->request('designer', $designerParams);
            $designerResult = $this->getDesignerFollowedStatus($designerData);

            $designerCount = count($designerResult['data']['list']);
            if (!empty($designerResult['data']['list'])) {
                foreach ($designerResult['data']['list'] as $key => &$list) {
                    $list['spus'] = "";
                    if (isset($list['products'])) {
                        $spus = array();
                        foreach ($list['products'] as $product) {
                            $spus[] = $product['spu'];
                        }
                        $list['spus'] = implode('_', $spus);
                    }
                    $list['seo_tag'] = implode(',', $list['seo_label']);
                }
            }
        }

        $result = array();
        $result['success'] = $designerResult['success'] && $redResult['success'];
        $result['dstart'] = $designerResult['data']['start'];
        $result['rstart'] = $redResult['data']['start'];
        $result['dsize'] = $designerCount;
        $result['rsize'] = $redCount;
        $result['data']['list'] = array();

        for($i = 0; $i < $designerCount + $redCount; $i++){
            if($i % 4 == 0 ){
                if(count($redResult['data']['list']) !== 0){
                    $result['data']['list'][] = array_shift($redResult['data']['list']);
                }else {
                    if (count($designerResult['data']['list']) !== 0) {
                        $result['data']['list'][] = array_shift($designerResult['data']['list']);
                    }
                }
            }else{
                if(count($designerResult['data']['list']) !== 0){
                    $result['data']['list'][] = array_shift($designerResult['data']['list']);
                }else{
                    if(count($redResult['data']['list']) !== 0) {
                        $result['data']['list'][] = array_shift($redResult['data']['list']);
                    }
                }
            }
        }

        if ($request->input('ajax')) {
            return $result;
        }
        return view('designer.index', ['list' => $result['data']['list'], 'dstart' => $result['dstart'],'rstart' => $result['rstart']]);
    }

    private function getDesignerFollowedStatus(Array $result)
    {
        if (!empty($result['data']['list'])) {
            $followlist = $this->followList();
            $list = array();
            foreach ($result['data']['list'] as $value) {
                $value['isFollowed'] = 0;
                if (in_array($value['designerId'], $followlist)) {
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
        if (empty($result['data'])) {
            abort(404);
        }
        $result['data']['seo_tag'] = implode(',', $result['data']['seo_label']);
        //设计师商品动态模版
        $params = array(
            'cmd' => 'dmodel',
            'id' => $id,
        );
        $result['product'] = $this->request('designer', $params);
        if(!empty($result['product']['data']['spuInfos'])){
            foreach($result['product']['data']['spuInfos'] as &$product){
                $titleArray = explode(" ", $product['spuBase']['main_title']);
                $titleArray[] = $product['spuBase']['spu'];
                $product['spuBase']['seo_link'] = implode("-", $titleArray);
            }
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

        $result = $this->pregDesignerUrl($result);

        if ($request->input('ajax')) {
            return $result;
        }
        $maidian['utm_medium'] = $request->get('utm_medium');
        $maidian['utm_source'] = $request->get('utm_source');
        return View('designer.show', ['maidian' => $maidian,'designer' => $result['data'], 'productAll' => $result['productAll'], 'product' => $result['product']['data'], 'followList' => $this->followList()]);
    }


    private function pregDesignerUrl($result)
    {
        if(!empty($result['data']['instagram_link'])){
            $result['data']['instagram_link'] = $this->pregUrl($result['data']['instagram_link']);
        }
        if(!empty($data['data']['facebook_link'])){
            $result['data']['facebook_link'] = $this->pregUrl($result['data']['facebook_link']);
        }
        if(!empty($result['data']['youtube_link'])){
            $result['data']['youtube_link'] = $this->pregUrl($result['data']['youtube_link']);
        }
        if(!empty($result['data']['blog_link'])){
            $result['data']['blog_link'] = $this->pregUrl($result['data']['blog_link']);
        }
        if(!empty($result['data']['snapchat_link'])){
            $result['data']['snapchat_link'] = $this->pregUrl($result['data']['snapchat_link']);
        }
        return $result;
    }

    private function pregUrl($url)
    {
        $preg = '/^http:/';
        if(!preg_match($preg, $url)){
            $url = '//'.$url;
        }
        return $url;
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
        if ($request->input('ajax')) {
            return $result;
        }
        return View('user.following', ['data' => $result['data']]);

    }

    public function followList()
    {
        if (Session::get('user.pin')) {
            $value = Cache::remember(Session::get('user.pin') . 'followlist',60, function () {
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
