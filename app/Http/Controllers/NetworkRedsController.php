<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class NetworkRedsController extends BaseController
{

    public function index(Request $request)
    {
        $designerUrl = '/designer';
        $queryString = $request->getQueryString();
        $mrefer = $request->get('mrefer');
        $msource = $request->get('msource');
        switch ($request->path()) {
            case 'a':
                $designerUrl = '/designer/79';
                break;
            case 'b':
                $designerUrl = '/designer/83';
                break;
        }

        $designerUrl = ($this->isMobile() ? 'http://m.motif.me' : 'http://www.motif.me') . $designerUrl;
        $ref = urlencode($request->header('referer'));
        $clk = 'http://clk.motif.me/log.gif?t=route.600001&m=PC_M2016-1&pin=' . Session::get('user.pin') . '&uuid=' . $_COOKIE['uid'] . '&ref=' . $ref . '&v={"mrefer":"' . $mrefer . '","msource":"' . $msource . '"}';
        file_get_contents($clk);
        return View('designer.networkreds', ['designerUrl' => $designerUrl, 'queryString' => $queryString, 'mrefer' => $mrefer, 'msource' => $msource]);
    }


    private function isMobile()
    {
        if (isset($_SERVER['HTTP_X_WAP_PROFILE'])) {
            return true;
        }

        if (isset($_SERVER['HTTP_VIA'])) {
            return stristr($_SERVER['HTTP_VIA'], "wap") ? true : false;
        }

        if (isset ($_SERVER['HTTP_USER_AGENT'])) {
            $clientkeywords = array(
                'nokia',
                'sony',
                'ericsson',
                'mot',
                'samsung',
                'htc',
                'sgh',
                'lg',
                'sharp',
                'sie-',
                'philips',
                'panasonic',
                'alcatel',
                'lenovo',
                'iphone',
                'ipod',
                'blackberry',
                'meizu',
                'android',
                'netfront',
                'symbian',
                'ucweb',
                'windowsce',
                'palm',
                'operamini',
                'operamobi',
                'openwave',
                'nexusone',
                'cldc',
                'midp',
                'wap',
                'mobile'
            );

            if (preg_match("/(" . implode('|', $clientkeywords) . ")/i", strtolower($_SERVER['HTTP_USER_AGENT']))) {
                return true;
            }
        }

        if (isset($_SERVER['HTTP_ACCEPT'])) {
            if ((strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') !== false) && (strpos($_SERVER['HTTP_ACCEPT'], 'text/html') === false || (strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') < strpos($_SERVER['HTTP_ACCEPT'], 'text/html')))) {
                return true;
            }
        }

        return false;

    }
}
