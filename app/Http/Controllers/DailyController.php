<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class DailyController extends BaseController
{
    /**
     * 显示列表.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        $params = array(
            'cmd' => 'list',
            'token' => Session::get('user.token'),
            'pagesize' => $request->input('pagesize', 10),
            'pagenum' => $request->input('pagenum', 1),
        );

        $result = $this->request('daily', $params);

        if ($request->input('ajax')) {
            return $result;
        }
        return View('daily.index', ['list' => $result['data']['list']]);
    }

    /**
     * 显示
     *
     * @param int $id
     * @return Response
     */
    public function show(Request $request, $id)
    {
        $params = array(
            'id' => $id
        );

        $result = $this->request("content", $params, 'topicf');
        $view = '';
        if (strstr($_SERVER['HTTP_USER_AGENT'], 'motif-android') || strstr($_SERVER['HTTP_USER_AGENT'], 'motif-ios')) {
            $view = 'daily.topicApp';
        } else {
            $view = 'daily.topic';
        }
        if($request->input('ajax')){
            return $result;
        }
        return View($view, ['topic' => $result['data'], 'topicID' => $id, 'shareFlag'=>true]);
    }

    /**
     * 商品详情服务模版
     *
     * @param int $id
     * @return Response
     */
    public function service($id)
    {
        $params = array(
            'id' => $id
        );

        $result = $this->request("template", $params, 'topicf');
        $view = '';
        if (strstr($_SERVER['HTTP_USER_AGENT'], 'motif-android') || strstr($_SERVER['HTTP_USER_AGENT'], 'motif-ios')) {
            $view = 'daily.topicApp';
        } else {
            $view = 'daily.topic';
        }

        return $result; //View($view, ['topic' => $result['data'], 'topicID' => $id, 'shareFlag' => false]);
    }

}
