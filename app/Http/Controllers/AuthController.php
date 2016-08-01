<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class AuthController extends BaseController
{
    const Token = 'eeec7a32dcb6115abfe4a871c6b08b47';

    //google login
    public function googleLogin(Request $request)
    {
        $params = array(
            'cmd' => 'tplogin',
            'uuid' => $_COOKIE['uid'],
            'type' => 4,
            'token' => self::Token,
        );

        $params['reinfo'] = json_encode(array(
                'email' => $request->get('email'),
                'id' => $request->get('id'),
                'name' => $request->get('name'),
                'type' => 4,
                'avatar' => urlencode($request->get('avatar')),
            )
        );
        $result = $this->request("user", $params);
        if ($result['success']) {
            $result['redirectUrl'] = Session::get('redirectUrl') ? Session::get('redirectUrl') : "/daily";
            Session::forget('user');
            Session::put('user', $result['data']);
        }
        return $result;
    }

    //facebook login
    public function facebookLogin(Request $request)
    {
        $params = array(
            'cmd' => 'tplogin',
            'uuid' => $_COOKIE['uid'],
            'type' => 2,
            'token' => self::Token,
        );

        $params['reinfo'] = json_encode(array(
                'email' => $request->get('email'),
                'id' => $request->get('id'),
                'name' => $request->get('name'),
                'type' => 2,
                'avatar' => urlencode($request->get('avatar')),
            )
        );
        $result = $this->request("user", $params);
        if ($result['success']) {
            $result['redirectUrl'] = Session::get('redirectUrl') ? Session::get('redirectUrl') : "/daily";
            Session::forget('user');
            Session::put('user', $result['data']);
        }
        return $result;
    }

    //facebook 没有绑定邮箱
    public function addFacebookEmail(Request $request)
    {
        $params = array(
            'id' => $request->get('id'),
            'name' => $request->get('name'),
            'avatar' => urldecode($request->get('avatar')),
        );
        return view('shopping.fbaddemail', ['params' => $params]);
    }
}

?>