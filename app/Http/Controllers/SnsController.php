<?php
/**
 * Created by PhpStorm.
 * User: zhangtao
 * Date: 17/2/22
 * Time: 上午10:30
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

Class SnsController extends BaseController
{

    public function sendMessage(Request $request)
    {
        $params = array();
        if(Session::has('user')){
            $update = array(
                'cmd' => 'update',
                'uuid' => Session::get('user.uuid'),
                'pin' => Session::get('user.pin'),
                'version' => '1.0',
                'src' => 'PC',
                'devtoken' => Session::get('user.pin'),
                'operate' => 2,
                'isblock' => 0
            );
            $this->request("sns", $update);

            $params['cmd'] = "list";
            $params['pin'] = Session::get('user.pin');
        }else{
            $params['cmd'] = 'comlist';
            //$params['ts'] = '1487733855';
            $params['ts'] = time();
        }
        $result = $this->request("sns", $params);
        if($result['success']){
            foreach($result['data']['list'] as &$list){
                $list['landing_page'] = $this->urlTransfer($list['landing_page']);
            }
        }
        return $result;
    }

    public function urlTransfer($url)
    {
        $urlArr = parse_url($url);
        parse_str($urlArr['query'], $parr);
        switch($parr['a']){
            case 'pd':
                $url = "/detail/".$parr['spu'];
                break;
            case 'url';
                $url = $parr['url'];
                break;
            case 'outurl';
                $url = $parr['url'];
                break;
            case 'daily';
                $url = '/daily';
                break;
            case 'designerlist';
                $url = '/designer';
                break;
            case 'shoppinglist';
                $url = '/shopping'.$parr['cid'];
                break;
            case 'orderlist';
                $url = '/order/orderlist';
                break;
            case 'cart';
                $url = '/cart';
                break;
            case 'login';
                $url = '/login';
                break;
            case 'register';
                $url = '/register';
                break;
            case 'orderdetail';
                $url = '/order/orderdetail/'. $parr['id'];
        }
        return $url;
    }

    public function updateMessageStatus(Request $request)
    {
        $params = array(
            'cmd' => 'modify',
            'pin' => Session::get('user.pin'),
            'id' => $request->input('id'),
            'status' => $request->input('status')
        );
        $result = $this->request('sns', $params);
        return $result;
    }

}

