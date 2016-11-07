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
        $utm_medium = $request->get('utm_medium');
        $utm_source = $request->get('utm_source');
        switch ($request->path()) {
            case 'cassandra':
                $designerUrl = '/designer/103';
                $designerID = '103';
                $designerUrl = ($this->isMobile() ? 'http://m.motif.me' : 'https://www.motif.me') . $designerUrl . ($utm_medium ? '?utm_medium='.$utm_medium.'&utm_source='.$utm_source : '');
                $AUrl = 'https://c89mm.app.goo.gl/?link=http://m.motif.me/designer/103&al=motif://o.c?a%3Durl%26url%3Dhttp%253A%252F%252Fm.motif.me%252Fdesigner%252F103%253Futm_medium%253D1%2526utm_source%253Dyoutube&apn=me.motif.motif&ad=1';
                $IosUrl = $designerUrl;
                break;
            case 'rae':
                $designerUrl = '/designer/99';
                $designerID = '99';
                $designerUrl = ($this->isMobile() ? 'http://m.motif.me' : 'https://www.motif.me') . $designerUrl . ($utm_medium ? '?utm_medium='.$utm_medium.'&utm_source='.$utm_source : '');
                $AUrl = $designerUrl;
                $IosUrl = $designerUrl;
                break;
            case 'RAE':
                $designerUrl = '/designer/99';
                $designerID = '99';
                $designerUrl = ($this->isMobile() ? 'http://m.motif.me' : 'https://www.motif.me') . $designerUrl . ($utm_medium ? '?utm_medium='.$utm_medium.'&utm_source='.$utm_source : '');
                $AUrl = $designerUrl;
                $IosUrl = $designerUrl;
                break;
            case 'Rae':
                $designerUrl = '/designer/99';
                $designerID = '99';
                $designerUrl = ($this->isMobile() ? 'http://m.motif.me' : 'https://www.motif.me') . $designerUrl . ($utm_medium ? '?utm_medium='.$utm_medium.'&utm_source='.$utm_source : '');
                $AUrl = $designerUrl;
                $IosUrl = $designerUrl;
                break;
        }


        $ref = urlencode($request->header('referer'));
        $clk = 'https://clk.motif.me/log.gif?t=route.600001&m=PC_M2016-1&pin=' . Session::get('user.pin') . '&uuid=' . $_COOKIE['uid'] . '&ref=' . $ref . '&v={"DesignerName":"'.$request->path().'","designerID":"'.$designerID.'","utm_medium":"' . $utm_medium . '","utm_source":"' . $utm_source . '"}';
        file_get_contents($clk);
        return View('designer.networkreds', ['designerUrl' => $designerUrl, 'AUrl' => $AUrl, 'IosUrl' => $IosUrl]);
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
