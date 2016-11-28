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
        foreach ($result['data']['list'] as &$list) {
            $list['spus'] = "";
            if (isset($list['products'])) {
                $spus = array();
                foreach ($list['products'] as $product) {
                    $spus[] = $product['spu'];
                }
                $list['spus'] = implode('_', $spus);
            }
//            if (isset($list['describe']) && strlen($list['describe']) > 300) {
//                $list['describe'] = mb_substr($list['describe'], 0, 300);
//                $list['describe'] = $list['describe'] . "...";
//            }
        }
        if ($request->input('ajax')) {
            return $result;
        }
        return view('designer.index', ['list' => $result['data']['list'], 'start' => $result['data']['start']]);
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
        //设计师商品动态模版
        $params = array(
            'cmd' => 'dmodel',
            'id' => $id,
        );
        $result['product'] = $this->request('designer', $params);

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

        if ($request->input('ajax')) {
            return $result;
        }
        $maidian['utm_medium'] = $request->get('utm_medium');
        $maidian['utm_source'] = $request->get('utm_source');
        return View('designer.show', ['maidian' => $maidian,'designer' => $result['data'], 'productAll' => $result['productAll'], 'product' => $result['product']['data'], 'followList' => $this->followList()]);
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
