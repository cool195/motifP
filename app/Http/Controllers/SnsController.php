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
                $url = "https://www.motif.me/detail/".$parr['spu'];
                break;
            case 'url';
                $url = $parr['url'];
                break;
            case 'outurl';
                $url = $parr['url'];
                break;
            case 'daily';
                $url = 'https://www.motif.me/trending';
                break;
            case 'designerlist';
                $url = 'https://www.motif.me/collection';
                break;
            case 'shoppinglist';
                $url = 'https://www.motif.me/shop'.$parr['cid'];
                break;
            case 'orderlist';
                $url = 'https://www.motif.me/order/orderlist';
                break;
            case 'cart';
                $url = 'https://www.motif.me/cart';
                break;
            case 'login';
                $url = 'https://www.motif.me/login';
                break;
            case 'register';
                $url = 'https://www.motif.me/register';
                break;
            case 'orderdetail';
                $url = 'https://www.motif.me/order/orderdetail/'. $parr['id'];
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

