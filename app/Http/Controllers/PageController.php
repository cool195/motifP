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
    public function aboutmotif()
    {
        return View('Other.page-aboutMotif');
    }

    //cancellationPolicy
    public function cancellationPolicy()
    {
        return View('Other.page-cancellationPolicy');
    }

    //contactUs
    public function contactUs()
    {
        return View('Other.page-contactUs');
    }

    //shippingreturns
    public function shippingreturns()
    {
        return View('Other.page-shippingreturns');
    }

    //payments
    public function payments()
    {
        return View('Other.page-payment');
    }

    //faq
    public function faq()
    {
        return View('Other.page-FAQ');
    }

    //motifGuarantee
    public function motifGuarantee()
    {
        return View('Other.page-motifGuarantee');
    }

    //privacyPolicy
    public function privacyPolicy()
    {
        return View('Other.page-privacyPolicy');
    }

    //sizeGuide
    public function sizeGuide()
    {
        return View('Other.page-sizeGuide');
    }

    //termsService
    public function termsService()
    {
        return View('Other.page-termsService');
    }

    //userAgreement
    public function userAgreement()
    {
        return View('Other.page-userAgreement');
    }

    public function pcPrivacyPolicy()
    {
        return View('Other.pc-privacyPolicy');
    }

    public function pcTermsService()
    {
        return view('Other.pc-termsService');
    }

}

?>