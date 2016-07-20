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
    public function index()
    {
        return Session::get();
        $params = array('recid' => '100000', 'pin' => 'xuzhijie', 'uuid' => 'asdfasdfasdfasdf', 'pagesize' => 20, 'cid' => 0);

        return $this->request('rec', $params, false, 15);
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
        Cache::add('juchao', 'value', 10);
        return Cache::get('juchao');
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
