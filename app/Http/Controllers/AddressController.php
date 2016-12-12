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
            foreach($result['data']['list'] as $list){
                $addrList[$list['receiving_id']] = $list;
            }
            $result['data']['list'] = $addrList;
        }
        
        if(Session::has('user.checkout.address.receiving_id')){
            //$result['data']['selAddr'] = Session::get('user.checkout.address');
            foreach($result['data']['list'] as &$list){
                $list['isSel'] = 0;
                if($list['receiving_id'] == Session::get('user.checkout.address.receiving_id')){
                    $list['isSel'] = 1;
                }
            }

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
            'email' => Session::get('user.login_email'),
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
            'aid' => $id,
            'email' => Session::get('user.login_email'),
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

    /**
     * 移除 DELETE
     *
     * @param int $id
     * @return Response
     */
    public function destroy($aid)
    {
        $params = array(
            'cmd' => "del",
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'aid' => $aid,
        );
        $result = $this->request('useraddr', $params);
        return $result;
    }

    /*
     * 查看地址详情 GET
     *
     * @params int $aid
     * @return array;
     *
     * */
    public function show($aid)
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
    public function getCountry($scope = 0)
    {
        $params = array(
            'cmd' => 'country',
            'scope' => $scope,
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin')
        );
        $result = $this->request('addr', $params);
        if ($result['success']) {
            return $result['data']['list'];
        }
        return array();
    }

    //获取洲列表
    public function getState($id)
    {
        $params = array(
            'cmd' => 'state',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'countryid' => $id
        );
        $result = $this->request('addr', $params);

        return $result['data']['list'];

    }
}