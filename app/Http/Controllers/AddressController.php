<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class AddressController extends BaseController
{
    public function getUserAddrList()
    {
        $params = array(
            'cmd' => 'list',
            'uuid' => $_COOKIE['uid'],
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('useraddr', $params);
        return $result;
    }

    public function getUserDefaultAddr()
    {
        $params = array(
            'cmd' => 'gdefault',
            'uuid' => @$_COOKIE['uid'],
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('useraddr', $params);
        return $result;
    }

    public function addUserAddr(Request $request)
    {

        $params = array(
            'cmd' => 'add',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'email' => $request->input('email'),
            'tel' => $request->input('tel'),
            'name' => $request->input("name"),
            'addr1' => $request->input("addr1"),
            'addr2' => $request->input("addr2"),
            'city' => $request->input("city"),
            'state' => $request->input("state"),
            'zip' => $request->input("zip"),
            'idnum' => $request->input("idnum"),
            'country' => $request->input("country"),
            'isd' => $request->input("isd", 0),
        );

        $system = "";
        $service = "useraddr";
        $result = $this->request('useraddr', $params);
        if ($result['success']) {
            $result['redirectUrl'] = "/user/shippingaddress";
        }
        return $result;
    }

    public function modifyUserAddr(Request $request)
    {

        $params = array(
            'cmd' => 'modify',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'aid' => $request->input('aid'),
            'email' => $request->input('email'),
            'tel' => $request->input('tel'),
            'name' => $request->input("name"),
            'addr1' => $request->input("addr1"),
            'addr2' => $request->input("addr2"),
            'city' => $request->input("city"),
            'state' => $request->input("state"),
            'zip' => $request->input("zip"),
            'idnum' => $request->input("idnum"),
            'country' => $request->input("country"),
            'isd' => $request->input("isd", 0),
        );

        $result = $this->request('useraddr', $params);
        return $result;

    }

    public function modifyUserDefaultAddr(Request $request)
    {

        $params = array(
            'cmd' => 'mdefault',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'aid' => $request->input('aid'),
            'isd' => $request->input('isd')
        );
        $result = $this->request('useraddr', $params);
        return $result;
    }

    public function delUserAddr(Request $request)
    {

        $params = array(
            'cmd' => "del",
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'aid' => $request->input('aid'),
        );
        $result = $this->request('useraddr', $params);
        return $result;
    }

    public function getCountry()
    {
        $params = array(
            'cmd' => 'country',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin')
        );
        $result = $this->request('useraddr', $params);
        if($result['success']) {
            $commonlist = array();
            for ($index = 0; $index < $result['data']['amount']; $index++) {
                $commonlist[] = array_shift($result['data']['list']);
            }
            $result['data']['commonlist'] = $commonlist;
        }
        return $result;
    }


}