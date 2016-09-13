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
            if ($_COOKIE['wishSpu']) {
                $this->addWishProduct($_COOKIE['wishSpu']);
            } elseif($_COOKIE['followDid']){
                $this->addFollowDesigner($_COOKIE['followDid']);
            }
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
            if ($_COOKIE['wishSpu']) {
                $this->addWishProduct($_COOKIE['wishSpu']);
            } elseif($_COOKIE['followDid']){
                $this->addFollowDesigner($_COOKIE['followDid']);
            }
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

    //验证是否新用户
    public function faceBookAuthStatus($trdid)
    {
        $params = array(
            'cmd' => 'email',
            'type' => 2,
            'trdid' => $trdid,
            'token' => self::Token,
        );
        $result = $this->request('openapi', '', "user", $params);
        $result['status'] = $result['data']['email'] ? true : false;
        return $result;
    }

    private function addWishProduct($spu, $action = false)
    {
        if ($action) {
            $params = array(
                'cmd' => 'is',
                'spu' => $spu,
                'pin' => Session::get('user.pin'),
                'token' => Session::get('user.token')
            );
            $result = $this->request('wishlist', $params);
            $cmd = $result['data']['isFC'] ? 'del' : 'add';
        } else {
            $cmd = 'add';
        }

        $params = array(
            'cmd' => $cmd,
            'spu' => $spu,
            'pin' => Session::get('user.pin'),
            'token' => Session::get('user.token')
        );
        $result = $this->request('wishlist', $params);
        $result['cmd'] = $cmd == 'add' ? true : false;
        Cache::forget(Session::get('user.pin') . 'wishlist');
        return $result;
    }

    private function addFollowDesigner($did, $action = false)
    {
        if ($action) {
            $params = array(
                'cmd' => 'is',
                'did' => $did,
                'token' => Session::get('user.token'),
                'pin' => Session::get('user.pin')
            );
            $result = $this->request('follow', $params);
            $cmd = $result['data']['isFC'] ? 'del' : 'add';
        } else {
            $cmd = 'add';
        }

        $params = array(
            'cmd' => $cmd,
            'did' => $did,
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin')
        );
        $result = $this->request('follow', $params);
        $result['cmd'] = $cmd == 'add' ? true : false;
        Cache::forget(Session::get('user.pin') . 'followlist');
        return $result;
    }

}

?>