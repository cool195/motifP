<?php

if (env('APP_ENV') == 'production') {
    //生产
    $CDN_URL = 'http://cdn.motif.me';
    $Image_URL = '';
    $API_URL = array('api' => 'https://api.motif.me', 'rec' => 'https://rec.motif.me');
    $QianHai_URL = 'https://secure.oceanpayment.com/gateway/service/pay';
    $paypalclientID = 'AeJ0JypMpSkBh2pvVrWMSg8Km_l6fcmWXUQ0oWxom2tz8nPzBB1rWu71bkL1j4S-TGsjGYrbfDZYiWWe';
    $paypalsecret = 'ECmKQFY0UdanCEXHr6bHQ1PCwivwmtEMWma30r3ejfOlvQVlSW6_rwuXp4leydeHrcqSCthauqka1BYU';
    $paypalmode = "live";
} elseif (env('APP_ENV') == 'publish') {
    //预发布
    $CDN_URL = 'https://s3-us-west-1.amazonaws.com/emimagetest';
    $Image_URL = '';
    $API_URL = array('api' => 'http://54.222.233.255', 'rec' => 'http://54.222.233.255');
    $QianHai_URL = 'https://secure.oceanpayment.com/gateway/service/test';
    $paypalclientID = 'AV8SZ3C16kSXKT4-vPI3pRf0Fo2j-kHLj9jDc3Eg346Q74XcbxJyAMlQsSPy3x5iiRFsXhn3xM57Pj4b';
    $paypalsecret = 'EApPC9Qkz0WFkK76gFbz8miNMgsMeZT27LTc24ABFpAcyUqMqBXiLKjR73xX-U7Q8Xlc_szx_5yGP52q';
    $paypalmode = 'sandbox';
} else {
    //测试
    $CDN_URL = 'https://s3-us-west-1.amazonaws.com/emimagetest';
    $Image_URL = '';
    $API_URL = array('api' => 'http://192.168.0.230', 'rec' => 'http://192.168.0.230');
    $QianHai_URL = 'https://secure.oceanpayment.com/gateway/service/test';
    $paypalclientID = 'AV8SZ3C16kSXKT4-vPI3pRf0Fo2j-kHLj9jDc3Eg346Q74XcbxJyAMlQsSPy3x5iiRFsXhn3xM57Pj4b';
    $paypalsecret = 'EApPC9Qkz0WFkK76gFbz8miNMgsMeZT27LTc24ABFpAcyUqMqBXiLKjR73xX-U7Q8Xlc_szx_5yGP52q';
    $paypalmode = 'sandbox';
}

return [
    'CDN_URL' => $CDN_URL,
    'API_URL' => $API_URL,
    'Image_URL' => $Image_URL,
    'QIANHAI_URL' => $QianHai_URL,
    'PAYPAL_ID' => $paypalclientID,
    'PAYPAL_SECRET' => $paypalsecret,
    'PAYPAL_MODE' => $paypalmode,
];
