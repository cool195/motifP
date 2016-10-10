<?php

namespace App\Http\Controllers;

class PageController extends BaseController
{
    //aboutMotif
    public function error()
    {
        return View('error');
    }

    //aboutMotif
    public function aboutMotif()
    {
        return View('Other.page-aboutMotif');
    }

    //cancellationPolicy
    public function cancellation()
    {
        return View('Other.page-cancellation');
    }

    //contactUs
    public function contactUs()
    {
        return View('Other.page-contactUs');
    }

    public function description()
    {
        return View('Other.page-description');
    }

    public function faq()
    {
        return View('Other.page-FAQ');
    }

    public function privacyPolicy()
    {
        return View('Other.page-privacyPolicy');
    }

    public function sizeGuide()
    {
        return View('Other.page-sizeGuide');
    }

    public function termsService()
    {
        return View('Other.page-termsService');
    }

    public function userAgreement()
    {
        return View('Other.page-userAgreement');
    }

    public function saleInfo()
    {
        return view('Other.page-saleinfo');
    }

    public function payment()
    {
        return view('Other.page-payment');
    }

    public function download()
    {
        return view('Other.download');
    }

}

?>