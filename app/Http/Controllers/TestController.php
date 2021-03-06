<?php

namespace App\Http\Controllers;

class TestController extends BaseController
{
    public function index()
    {
        $randomKey = str_random(6);
        $encryptStr = $this->encrypt($randomKey,"0320181234567890123456/720");
        $start = substr($encryptStr, 0, 4);
        $end = substr($encryptStr, 4);
        $aesStr = ($start . $randomKey . $end);
        return [$randomKey,$encryptStr,$aesStr];
    }

    public function encrypt($key, $data)
    {
        if (empty($key) || empty($data)) {
            return "";
        }
        $input = '';
        $keyLonger = strlen($key) < strlen($data) ? false : true;
        $len = $keyLonger ? strlen($data) : strlen($key);

        for ($i = 0; $i < $len * 2; $i++) {
            if ($i % 2 == 0) {
                $input .= $key[$i / 2];
            } else {
                $input .= $data[$i / 2];
            }
        }

        if (!$keyLonger) {
            // 剩余的都补上data
            $input .= substr($data,strlen($key),strlen($data)-strlen($key)).'1';
        } else {
            // 剩余的都补上key
            $input .= substr($key,strlen($data),strlen($key)-strlen($data)).'2';
        }
        return base64_encode($input);
    }
}