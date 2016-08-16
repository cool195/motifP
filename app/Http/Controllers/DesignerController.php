<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

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

        $result = $this->request('designer', $params);

        if ($request->input('ajax')) {
            return $result;
        }
        return view('designer.index', ['list' => $result['data']['list']]);
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
            'id' => $id,
        );
        $result['product'] = $this->request('content', $params, 'designerf');

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
        return View($view, ['designer' => $result['data'], 'productAll' => $result['productAll'], 'product' => $result['product']['data']]);
    }


    /**
     * 关注或取消设计师
     *
     * @param int $id
     * @return Response
     */
    public function follow($id)
    {
        $followParams = array(
            'cmd' => 'is',
            'pin' => Session::get('user.pin'),
            'token' => Session::get('user.token'),
            'did' => $id,
        );
        $follow = $this->request('follow', $followParams);
        if ($follow['data']['isFC']) {
            //取消关注
            $followParams = array(
                'cmd' => 'del',
                'pin' => Session::get('user.pin'),
                'token' => Session::get('user.token'),
                'did' => $id,
            );
            $follow = $this->request('follow', $followParams);
        } else {
            //关注
            $followParams = array(
                'cmd' => 'add',
                'pin' => Session::get('user.pin'),
                'token' => Session::get('user.token'),
                'did' => $id,
            );
            $follow = $this->request('follow', $followParams);
        }
        return $follow;

    }
}
