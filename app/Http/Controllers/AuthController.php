<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Cache;
use Log;

class AuthController extends BaseController
{
    const Token = 'eeec7a32dcb6115abfe4a871c6b08b47';

    /**
     * @return string
     */
    public function logInfo(Request $request)
    {
        Log::info($request->all());
    }

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
                'name' => $request->get('name',$request->get('email')),
                'type' => 4,
                'avatar' => urlencode($request->get('avatar')),
            )
        );
        Log::info($params);
        $result = $this->request("user", $params);
        if ($result['success']) {
            //$result['redirectUrl'] = Session::get('redirectUrl') ? Session::get('redirectUrl') : "/daily";
            $result['redirectUrl'] = ($request->input('referer') && !strstr($request->input('referer'), 'register')) ? $request->input('referer') : "/daily";
            Session::forget('user');
            Session::put('user', $result['data']);
            Cache::forget($result['data']['token']);
            Cache::put($result['data']['token'], $result['data'], ($result['data']['tokenTtl'] / 60));
            if ($_COOKIE['wishSpu']) {
                $this->addWishProduct($_COOKIE['wishSpu']);
            } elseif($_COOKIE['followDid']){
                $this->addFollowDesigner($_COOKIE['followDid']);
            }
            $this->mergeCartSkus();
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
        Log::info($params);
        $result = $this->request("user", $params);
        if ($result['success']) {
            //$result['redirectUrl'] = Session::get('redirectUrl') ? Session::get('redirectUrl') : "/daily";
            $result['redirectUrl'] = ($request->input('referer') && !strstr($request->input('referer'), 'register')) ? $request->input('referer') : "/daily";
            Session::forget('user');
            Session::put('user', $result['data']);
            Cache::forget($result['data']['token']);
            Cache::put($result['data']['token'], $result['data'], ($result['data']['tokenTtl'] / 60));
            if ($_COOKIE['wishSpu']) {
                $this->addWishProduct($_COOKIE['wishSpu']);
            } elseif($_COOKIE['followDid']){
                $this->addFollowDesigner($_COOKIE['followDid']);
            }
            $this->mergeCartSkus();
        }
        error_log(print_r("------------------\n", "\n"), 3, '/tmp/myerror.log');
        error_log(print_r($result, "\n"), 3, '/tmp/myerror.log');
        return $result;
    }

    //facebook 没有绑定邮箱
    public function addFacebookEmail(Request $request)
    {
        $params = array(
            'id' => $request->get('id'),
            'name' => $request->get('name'),
            'avatar' => $request->get('avatar'),
        );
        return view('user.fbaddemail', ['params' => $params]);
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