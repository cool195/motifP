<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class WordpayController extends BaseController
{
    public function getPayList(Request $request)
    {
        $params = array(
            'cmd' => 'plist',
            'src' => 'PC',
            'pin' => Session::get('user.pin'),
            'token' => Session::get('user.token')
        );
        $result = $this->request('pay', $params);
        return $result;
    }

    public function addCreditCard(Request $request)
    {
        $expiry = explode('/',$request->input('expiry'));
        $cardInfo = MCrypt::encrypt(trim($expiry[0]) . trim($expiry[1]) . $request->input('card') . '/' . $request->input('cvv'));
        $params = array(
            'cmd' => 'acrd',
            'uuid' => $_COOKIE['uid'],
            'src' => 'PC',
            'token' => Session::get('user.token'),
            'pin' => Session::get('user.pin'),
            'ci' => $cardInfo,
        );

        $params['tel'] = $request->input('tel');
        $params['name'] = $request->input('name');
        $params['addr1'] = $request->input('addr1');
        $params['addr2'] = $request->input('addr2');
        $params['city'] = $request->input('city');
        $params['state'] = $request->input('state');
        $params['zip'] = $request->input('zip');
        $params['country'] = $request->input('country');
        $params['csn'] = $request->input('csn');

        $result = $this->request('pay', $params);
        return $result;

    }

    public function delCreditCard(Request $request)
    {
        $params = array(
            'cmd' => 'dcrd',
            'pin' => Session::get('user.pin'),
            'token' => Session::get('user.token'),
            'cd' => $request->input('card_id'),
        );

        $result = $this->request('pay', $params);
        return $result;
    }


}