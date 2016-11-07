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
                $AUrl = 'https://control.kochava.com/v1/cpi/click?campaign_id=kocom-em-motif-fjb4e9bc0a17b1ec7764&network_id=5237&device_id=device_id&site_id=1&append_app_conv_trk_params=1';
                $IosUrl = 'https://control.kochava.com/v1/cpi/click?campaign_id=komotif-kvced5a84d7bcc8fb267&network_id=5237&device_id=device_id&site_id=1';
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
