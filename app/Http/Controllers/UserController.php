<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class UserController extends BaseController
{
    const Token = 'eeec7a32dcb6115abfe4a871c6b08b47';

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

    public function loginCheck(Request $request)
    {
        $email = $request->input('email');
        $params = array(
            'cmd' => "login",
            'uuid' => $_COOKIE['uid'],
            'email' => $email,
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




}