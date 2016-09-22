<?php

namespace App\Http\Controllers;

use Cache;
use Ixudra\Curl\Facades\Curl;

error_reporting(0);

class BaseController extends Controller
{

    function __construct()
    {
        if (empty($_COOKIE['uid'])) {
            setcookie('uid', md5($_SERVER['HTTP_USER_AGENT'] . time() . rand(1, 1000)), time() + 86400 * 300, '/');
        }
    }

    protected function request($service, array $params, $path = null, $method = true, $cacheTime = 0)
    {
        $params['src'] = 'pc';
        $ApiURL = config('runtime.API_URL');
        $Api = $service == 'rec' ? $ApiURL['rec'] : $ApiURL['api'];
        $Api = $path == null ? $Api : $Api . '/' . $path . '/';
        $Api .= '/' . $service;
        if ($cacheTime > 0) {
            $key = md5(json_encode($params));
            if (!$return = Cache::get($key)) {
                $return = $this->send($Api, $params, $method);
                $return['cache'] = array('cache' => true, 'date' => date('Y-m-d H:i:s', time()));
                Cache::put($key, $return, $cacheTime / 60);
            }
        } else {
            $return = $this->send($Api, $params, $method);
            $return['cache'] = array('cache' => false, 'date' => date('Y-m-d H:i:s', time()));
        }

        return $return;
    }

    private function send($Api, $params, $method)
    {
        $curl = Curl::to($Api)->withData($params);
        //添加日志
        //$curl = Curl::to($Api)->withData($params)->enableDebug();
        return $method ? $curl->get() : $curl->post();
    }
}
