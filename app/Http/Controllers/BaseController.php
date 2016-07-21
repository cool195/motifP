<?php

namespace App\Http\Controllers;

use Cache;
use Ixudra\Curl\Facades\Curl;

error_reporting(0);

class BaseController extends Controller
{
    /**
     * 接口环境地址数组
     *
     * @var array
     */
    protected $ApiUrl = [
        'openapi_local' => array('api' => 'http://192.168.0.230', 'rec' => 'http://192.168.0.230'),//本地
        'openapi_test' => array('api' => 'http://54.222.233.255', 'rec' => 'http://54.222.233.255'),//预发布
        'openapi' => array('api' => 'https://api.motif.me', 'rec' => 'https://rec.motif.me'),//生产
    ];

    function __construct()
    {
        if (empty($_COOKIE['uid'])) {
            setcookie('uid', md5($_SERVER['HTTP_USER_AGENT'] . time() . rand(1, 1000)), time() + 86400 * 300);
        }
    }

    protected function request($service, array $params, $path = null, $method = true, $cacheTime = 0)
    {

        $ApiName = $_SERVER['SERVER_NAME'] == 'motif.me' ? 'openapi' : ($_SERVER['SERVER_NAME'] == 'test.motif.me' ? 'openapi_test' : 'openapi_local');
        $Api = $service == 'rec' ? $this->ApiUrl[$ApiName]['rec'] : $this->ApiUrl[$ApiName]['api'];
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
        return $method ? $curl->get() : $curl->post();
    }
}
