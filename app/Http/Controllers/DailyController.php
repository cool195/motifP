<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
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
        return $result;//View('daily.index');
    }

    /**
     * 创建新表单
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * 存储器
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * 显示
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $params = array(
            'id' => $id
        );

        $result = $this->request('openapi', 'topicf', "content", $params);
        $view = '';
        if (strstr($_SERVER['HTTP_USER_AGENT'], 'motif-android') || strstr($_SERVER['HTTP_USER_AGENT'], 'motif-ios')) {
            $view = 'daily.topicApp';
        } else {
            $view = 'daily.topic';
        }

        return View($view, ['topic' => $result['data'], 'topicID' => $id, 'shareFlag'=>true]);
    }

    /**
     * 显示编辑页面
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * 更新
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * 移除
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
