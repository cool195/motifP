<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

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
            'pagesize' => $request->input('pagesize', 20),
            'pagenum' => $request->input('pagenum', 1),
        );

        $result = $this->request('daily', $params);
        if(!empty($result['data']['list'])){
            foreach ($result['data']['list'] as &$value){
                $pathArr = explode('/',$value['imgPath']);
                $WH = explode('X',$pathArr[3]);
                $value['weight'] = $WH[0];
                $value['height'] = $WH[1];
            }
        }
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
            'cmd' => 'topic',
            'id' => $id
        );

        $result = $this->request("topicf", $params);
        if(empty($result['data'])){
            abort(404);
        }
        if($request->input('ajax')){
            return $result;
        }
        return View('daily.topic', ['topic' => $result['data'], 'topicID' => $id, 'shareFlag'=>true]);
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
            'cmd' => 'template',
            'id' => $id
        );

        $result = $this->request("topicf", $params);
        return $result;
    }

    public function staticShow($id)
    {
        $result = $this->service($id);
        
        return View('daily.topic', ['topic' => $result['data'], 'topicID' => $id, 'shareFlag' => false]);
    }

    public function subscribe(Request $request)
    {
        $email = $request->input('email');
        $name = $request->input('name');
        $success = Storage::append('email.txt', $name." : ".$email);
        $result = array();
        $result['success'] = $success;
        return $result;
    }

}
