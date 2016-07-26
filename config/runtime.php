<?php

if (env('APP_ENV') == 'production') {
    //生产
    $CDN_URL = 'http://cdn.motif.me';
    $Image_URL = 'http://image.motif.me';
    $API_URL = array('api' => 'https://api.motif.me', 'rec' => 'https://rec.motif.me');
} elseif (env('APP_ENV') == 'publish') {
    //预发布
    $CDN_URL = 'https://s3-us-west-1.amazonaws.com/emimagetest';
    $Image_URL = '';
    $API_URL = array('api' => 'http://54.222.233.255', 'rec' => 'http://54.222.233.255');
} else {
    //测试
    $CDN_URL = 'https://s3-us-west-1.amazonaws.com/emimagetest';
    $Image_URL = '';
    $API_URL = array('api' => 'http://192.168.0.230', 'rec' => 'http://192.168.0.230');
}
return [
    'CDN_URL' => $CDN_URL,
    'API_URL' => $API_URL,
    'Image_URL' => $Image_URL,
];
