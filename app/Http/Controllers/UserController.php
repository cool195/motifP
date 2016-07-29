<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Cache;

class UserController extends BaseController
{
    const Token = 'eeec7a32dcb6115abfe4a871c6b08b47';

    public function register()
    {
        return view('user.register');
    }

    public function signup(Request $request)
    {
        $email = $request->input('email');
        $params = array(
            'cmd' => 'signup',
            'uuid' => $_COOKIE['uid'],
            'email' => $email,
            'pw' => md5($request->input('pw')),
            'nick' => $request->input('nick'),
            'token' => self::Token,
        );
        $result = $this->request('user', $params);
        if ($result['success']) {
            $result['redirectUrl'] = "/login";
        }
        return $result;
    }

    public function login()
    {
        return view('user.login');
    }

    public function signin(Request $request)
    {
        $params = array(
            'cmd' => "login",
            'uuid' => $_COOKIE['uid'],
            'email' => $request->input('email'),
            'pw' => md5($request->input('pw')),
            'token' => self::Token,
        );
        $result = $this->request('user', $params);
        if ($result['success']) {
            $result['redirectUrl'] = ($request->input('referer') && !strstr($request->input('referer'), 'register')) ? $request->input('referer') : "/daily";
            Session::forget('user');
            Session::put('user', $result['data']);
        }
        return $result;
    }

    public function signout()
    {
        Session::forget('user');
        return redirect('/login');
    }

    public function reset(Request $request)
    {
        if($request->input('pw')) {
            if($request->input('pw') != $request->input('lastpw')) {
                return array('success' => false, 'error_msg' => 'Passwords do not match');
            }
            $params = array(
                'cmd' => 'modifyfgtpwd',
                'pw' => md5($request->input('pw')),
                'tp' => $request->input('tp'),
                'sig' => $request->input('sig'),
                'token' => self::Token
            );
            $result = $this->request('user', $params);
            $result['redirectUrl'] ="/login";
            return $result;
        } else {
            return view('user.resetpassword', ['tp' => $request->input('tp'), 'sig' => $request->input('sig')]);
        }
    }

    public function forgetPassword(Request $request)
    {
        $params = array(
            'cmd' => "forgetpwd",
            'uuid' => $_COOKIE['uid'],
            'email' => $request->input('email'),
            'token' => self::Token,
            //'pin' => Session::get('user.pin'),
        );
        $result = $this->request('user', $params);
        if (!empty($result) && $result['success']) {
            $result['redirectUrl'] = "/login";
            $result['prompt_msg'] = "We have send you an email to your email address";
        }
        return $result;
    }

    public function modifyUserPwd(Request $request)
    {
        $params = array(
            'cmd' => "modifypwd",
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'oldpw' => md5($request->input('oldpw')),
            'pw' => md5($request->input('pw')),
        );
        $result = $this->request('user', $params);
        if (empty($result)) {
            $result['success'] = false;
            $result['error_msg'] = "Data access failed";
            $result['data'] = array();
        } else {
            $result['prompt_msg'] = "Password change failed, Please try agian!";
            if ($result['success']) {
                Session::forget('user');
                $result['prompt_msg'] = "Your password has been changed. Please login agian";
                $result['redirectUrl'] = "/login";
            }
        }
        return $result;
    }

    public function getUserDetailInfo()
    {
        $params = array(
            'cmd' => "detail",
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('user', $params);
        return $result;
    }

    public function modifyUserInfo(Request $request)
    {
        $user = Session::get('user');
        $params = array(
            'cmd' => 'modify',
            'pin' => $user['pin'],
            'nick' => $request->input('nick'),
            'token' => $user['token']
        );
        $result = $this->request('user', $params);
        if (empty($result)) {
            $result['success'] = false;
            $result['error_msg'] = "Data access failed";
            $result['data'] = array();
        } else {
            $result['error_msg'] = "Modify Info Failed";
            if ($result['success']) {
                $result['prompt_msg'] = "Modify Info Success";
                $result['redirectUrl'] = "/user/setting";
                $userInfo = $this->getUserDetailInfo($request);
                $user['nickname'] = $userInfo['data']['nickname'];
                Session::forget('user');
                Session::put('user', $user);
            }
        }

        return $result;
    }

    //APP同步登录
    public function rsyncLogin(Request $request)
    {
        Session::put('user', array(
            'login_email' => $request->input('email'),
            'nickname' => $request->input('name'),
            'pin' => $request->input('pin'),
            'token' => $request->input('token'),
            'uuid' => $_COOKIE['uid'],
        ));
        if (Session::get('user.pin')) {
            return array('success' => true);
        } else {
            return array('success' => false);
        }
    }

    public function modifyForgetPwd(Request $request)
    {
        if ($request->input('pw')) {
            if ($request->input('pw') != $request->input('lastpw')) {
                return array('success' => false, 'error_msg' => 'Passwords do not match');
            }
            $params = array(
                'cmd' => 'modifyfgtpwd',
                'pw' => md5($request->input('pw')),
                'tp' => $request->input('tp'),
                'sig' => $request->input('sig'),
                'token' => self::Token
            );
            $result = $this->request('user', $params);
            if ($result['success']) {
                $result['redirectUrl'] = "/login";
            }
            return $result;
        } else {
            $params = array(
                'tp' => $request->input('tp'),
                'sig' => $request->input('sig'),
            );
            return View('shopping.forgetpwd', ['params' => $params]);
        }
    }

    public function uploadIcon()
    {
        $params = array(
            'cmd' => 'uploadicon',
            'pin' => Session::get('user.pin'),
            'token' => self::Token
        );
        $result = $this->request('user', $params);
        return $result;
    }

    //我收藏的商品
    public function wishlist()
    {
        if (Session::get('user.pin')) {

            $value = Cache::rememberForever(Session::get('user.pin') . 'wishlist', function () {
                $params = array(
                    'cmd' => 'list',
                    'num' => 1,
                    'size' => 500,
                    'pin' => Session::get('user.pin'),
                    'token' => Session::get('user.token')
                );
                $result = $this->request('wishlist', $params);
                $result['cacheList'] = array();
                if ($result['success'] && $result['data']['amount'] > 0) {
                    foreach ($result['data']['list'] as $value) {
                        $result['cacheList'][] = $value['spu'];
                    }
                }
                return $result['cacheList'];
            });
            return $value;
        }
        return false;
    }

    //添加删除收藏
    public function updateWishList($spu)
    {
        $params = array(
            'cmd' => $this->isWishList($spu) ? 'del' : 'add',
            'spu' => $spu,
            'pin' => Session::get('user.pin'),
            'token' => Session::get('user.token')
        );
        $result = $this->request('wishlist', $params);
        if ($result['success']) {
            Cache::forget(Session::get('user.pin') . 'wishlist');
        }
        return $result;
    }

    //是否收藏
    public function isWishList($spu)
    {
        $params = array(
            'cmd' => 'is',
            'spu' => $spu,
            'pin' => Session::get('user.pin'),
            'token' => Session::get('user.token')
        );
        $result = $this->request('wishlist', $params);
        return $result['data']['isFC'];
    }
}