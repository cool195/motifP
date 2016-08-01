<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Cache;

class AddressController extends BaseController
{

    /**
     * 显示地址列表.
     *
     * @return Response
     */
    public function index()
    {
        $params = array(
            'cmd' => 'list',
            'uuid' => $_COOKIE['uid'],
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('useraddr', $params);
        if($result['success'] && !empty($result['data']['list'])){
            $addrList = array();
            foreach($result['data']['success'] as $list){
                $addrList[$list['receiving_id']] = $list['receiving_id'];
            }
            $result['data']['list'] = $addrList;
        }
        return $result;
    }

    /**
     * 添加地址 POST
     *
     * @param Request $request
     * @return Response 
     */
    public function store(Request $request)
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
            'country' => $request->input("country"),
            'isd' => $request->input("isd", 0),
        );
        $result = $this->request('useraddr', $params);
        return $result;
    }

    /**
     * 更新地址 PUT|PATCH
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
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
            'idnum' => $id,
            'country' => $request->input("country"),
            'isd' => $request->input("isd", 0),
        );

        $result = $this->request('useraddr', $params);
        return $result;
    }

    /**
     * 移除 DELETE
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        $params = array(
            'cmd' => "del",
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'aid' => $id,
        );
        $result = $this->request('useraddr', $params);
        return $result;
    }
    
    public function getAddrDetail($aid)
    {
        $result = $this->index();
        $addr = array();
        if(!empty($result['data']['list'][$aid])){
            $addr = $result['data']['list'][$aid];
        }else{
            $result = $this->getUserDefaultAddr();
            $addr = $result['data'];
        }
        return $addr;
    }

    //获取默认地址
    public function getUserDefaultAddr()
    {
        $params = array(
            'cmd' => 'gdefault',
            'uuid' => $_COOKIE['uid'],
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
        );
        $result = $this->request('useraddr', $params);
        return $result;
    }

    //修改默认地址
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

    //获取国家列表
    public function getCountry()
    {
        $value = Cache::remember('countrylist', 1000, function () {
            $params = array(
                'cmd' => 'country',
                'token' => Session::get('user.token'),
                'pin' => Session::get('user.pin')
            );
            $result = $this->request('useraddr', $params);
            if ($result['success']) {
                return $result['data']['list'];
            }
            return array();
        });
        return $value;
    }


}