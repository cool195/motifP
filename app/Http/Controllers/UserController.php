<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Cache;
use Illuminate\Support\Facades\Storage;

class UserController extends BaseController
{
    const Token = 'eeec7a32dcb6115abfe4a871c6b08b47';

    public function register(Request $request)
    {
        $referer = $request->input('referer');
        return view('user.register', ['referer' => $referer]);
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
            Session::forget('user');
            Session::put('user', $result['data']);
            $result['redirectUrl'] = ($request->input('referer') && !strstr($request->input('referer'), 'login')) ? $request->input('referer') : "/daily";
        } else {
            $result['prompt_msg'] = $result['error_msg'];
        }
        return $result;
    }

    public function login(Request $request)
    {
        if (Session::has('user')) {
            //return redirect('daily');
        }

        $referer = $request->input('url') ? $request->input('url') : $request->header('referer');
        Session::put('redirectUrl', $referer);
        return view('user.login', ['referer' => $referer]);
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
            if ($_COOKIE['wishSpu']) {
                $this->addWishProduct($_COOKIE['wishSpu']);
            } elseif($_COOKIE['followDid']) {
                $this->addFollowDesigner($_COOKIE['followDid']);
            }
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
            $result['redirectUrl'] = "/login";
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
        $result['prompt_msg'] = "Password change failed, Please try agian!";
        if ($result['success']) {
            Session::forget('user');
            $result['prompt_msg'] = "Your password has been changed. Please login agian";
            $result['redirectUrl'] = "/login";
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
        $result['error_msg'] = "Modify Info Failed";
        if ($result['success']) {
            $result['prompt_msg'] = "Modify Info Success";
            $result['redirectUrl'] = "";
            $userInfo = $this->getUserDetailInfo($request);
            $user['nickname'] = $userInfo['data']['nickname'];
            $result['data'] = $userInfo['data'];
            Session::forget('user');
            Session::put('user', $user);
        }
        return $result;
    }

    private function updateUserInfo($params)
    {
        $result = $this->request('user', $params);
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

    public function uploadIcon(Request $request)
    {
        if ($request->hasFile('file')) {
            $API_URL = config('runtime.API_URL');
            $url = $API_URL['api'] . '/user?cmd=uploadicon&pin=' . Session::get('user.pin') . '&token=' . Session::get('user.token');

            $path = 'avatar/' . Session::get('user.pin') . '/' . $request->file('file')->getClientOriginalName();
            //上传头像
            if (Storage::put($path, file_get_contents($request->file('file')))) {
                $post_data = array(
                    "avatar" => new \CurlFile(storage_path('app/' . $path), $request->file('file')->getMimeType())
                );
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                $result = curl_exec($ch);
                curl_close($ch);
                //成功后删除头像目录
                $icon = json_decode($result);
                $params = array(
                    'cmd' => 'modify',
                    'pin' => Session::get('user.pin'),
                    'token' => Session::get('user.token'),
                    'icon' => $icon->data->url
                );
                $this->updateUserInfo($params);
                Session::put('user.icon', $icon->data->url);
                Storage::deleteDirectory('avatar/' . Session::get('user.pin'));
                return $result;
            } else {
                return ['success' => false];
            }
        }
    }

    public function wish(Request $request)
    {
        $params = array(
            'cmd' => 'list',
            'num' => $request->input('num', 1),
            'size' => $request->input('size', 9),
            'pin' => Session::get('user.pin'),
            'token' => Session::get('user.token')
        );
        $result = $this->request('wishlist', $params);
        if ($request->input('ajax')) {
            return $result;
        }
        return View('user.wishlist', ['data' => $result['data']]);
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

    public function noteAction(Request $request)
    {
        if($request->input('action') == 'wish'){
            setcookie('wishSpu', $request->input('spu'), time() + 300, '/');
        } elseif($request->input('action') == 'follow'){
            setcookie('followDid', $request->input('did'), time() + 300, '/');
        }
    }

    public function password()
    {
        return view('user.changepassword');
    }

    public function address()
    {
        return view('user.address');
    }

    public function profile()
    {
        return view('user.profile');
    }

    //添加couponcode
    public function verifyCoupon(Request $request)
    {
        $params = array(
            'cmd' => 'bind',
            'couponcode' => $request->input('cps'),
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('coupon', $params);
        return $result;
    }

    //我的code
    public function coupon(){
        $params = array(
            'cmd' => 'couponlist',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('cart', $params);
        return $result;
    }

    public function userCoupon(){
        $params = array(
            'cmd' => 'couponlist',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('coupon', $params);
        return $result;
    }
    
    public function invite($code = "")
    {
        return view('user.invite', ['code' => $code]);
    }
    
    public function inviteFriends()
    {
        $params = array(
            'cmd' => "detail",
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('user', $params);
        return view('user.invite-friend',['code'=>$result['data']['invite_code']]);
    }

    public function promotions()
    {
        return view('user.promotions');
    }


}