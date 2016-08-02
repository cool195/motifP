<?php
namespace App\libs;

use \PayPal\Api\Payer;
use \PayPal\Api\Item;
use \PayPal\Api\ItemList;
use \PayPal\Api\Details;
use \PayPal\Api\Amount;
use \PayPal\Api\Transaction;
use \PayPal\Api\RedirectUrls;
use \PayPal\Api\Payment;
use \PayPal\Rest\ApiContext;
use \PayPal\Exception\PayPalConnectionException;
use \PayPal\Auth\OAuthTokenCredential;
use \PayPal\Api\PaymentExecution;
use Illuminate\Http\Request;

Class PayOrder
{
    //出始化
    public static function initConfig()
    {
        //lijiang.hou-buyer2@gmail.com
        //gsx12345
        $mode = 'sandbox';//sandbox / live
        if (env('APP_ENV') == 'production') {
            $clientID = 'AeJ0JypMpSkBh2pvVrWMSg8Km_l6fcmWXUQ0oWxom2tz8nPzBB1rWu71bkL1j4S-TGsjGYrbfDZYiWWe';
            $secret = 'ECmKQFY0UdanCEXHr6bHQ1PCwivwmtEMWma30r3ejfOlvQVlSW6_rwuXp4leydeHrcqSCthauqka1BYU';
        } else {
            $clientID = 'AV8SZ3C16kSXKT4-vPI3pRf0Fo2j-kHLj9jDc3Eg346Q74XcbxJyAMlQsSPy3x5iiRFsXhn3xM57Pj4b';
            $secret = 'EApPC9Qkz0WFkK76gFbz8miNMgsMeZT27LTc24ABFpAcyUqMqBXiLKjR73xX-U7Q8Xlc_szx_5yGP52q';
            $mode = 'sandbox';
        }
        $paypalObj = new ApiContext(new OAuthTokenCredential($clientID, $secret));
        $paypalObj->setConfig(array('mode' => $mode));
        return $paypalObj;
    }

    public static function createOrder($orderid, $product, $price, $shipping)
    {
        $paypalObj = Self::initConfig();
        $total = $price + $shipping;
        $payer = new Payer();
        $payer->setPaymentMethod('paypal');

        $item = new Item();
        $item->setName($orderid)
            ->setCurrency('USD')
            ->setQuantity(1)
            ->setPrice($price);

        $itemList = new ItemList();
        $itemList->setItems([$item]);

        $details = new Details();
        $details->setShipping($shipping)
            ->setSubtotal($price);

        $amount = new Amount();
        $amount->setCurrency('USD')
            ->setTotal($total)
            ->setDetails($details);

        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setItemList($itemList)
            ->setDescription($product)
            ->setInvoiceNumber(uniqid());

        $redirectUrls = new RedirectUrls();

        $redirectUrls->setReturnUrl('http://' . $_SERVER['SERVER_NAME'] . '/paypalStatus?success=true')
            ->setCancelUrl('http://' . $_SERVER['SERVER_NAME'] . '/paypalStatus?success=false');

        $payment = new Payment();
        $payment->setIntent('sale')
            ->setPayer($payer)
            ->setRedirectUrls($redirectUrls)
            ->setTransactions([$transaction]);

        try {
            $payment->create($paypalObj);
        } catch (PayPalConnectionException $e) {
            echo $e->getData();
            die();
        }

        $approvalUrl = $payment->getApprovalLink();
        header("Location: {$approvalUrl}");
    }

    //paypal回调
    public static function paypalStatic(Request $request)
    {
        $paypalObj = Self::initConfig();
        if (!$request->input('paymentId') || !$request->input('success') || !$request->input('PayerID')) {
            return false;
        }

        if ((bool)$request->input('success') === 'false') {
            return false;
        }

        $paymentID = $request->input('paymentId');
        $payerId = $request->input('PayerID');

        $payment = Payment::get($paymentID, $paypalObj);

        $execute = new PaymentExecution();
        $execute->setPayerId($payerId);

        try {
            $result = $payment->execute($execute, $paypalObj);
            return $result;
        } catch (Exception $e) {
            return false;
        }
    }
}