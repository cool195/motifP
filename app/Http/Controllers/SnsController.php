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
            $params['cmd'] = "list";
            $params['pin'] = Session::get('user.pin');
        }else{
            $params['cmd'] = 'comlist';
            //$params['ts'] = '1487733855';
            $params['ts'] = time();
        }
        $result = $this->request("sns", $params);
        return $result;
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

