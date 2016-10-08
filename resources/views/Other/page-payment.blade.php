@include('header')

        <!-- 支付-->
<div class="container">
    <div class="content-wrap">
        <h2 class="helveBold text-main font-size-lxx m-b-20x m-x-20x">Payment</h2>
        <div class="bg-white box-shadow m-t-20x">
            <div class="p-a-20x text-primary">
                <p class="m-b-30x">At the checkout, you can proceed as a guest or create an online
                    account with us once you have placed your order. By creating an online account, you
                    can enjoy a quicker checkout process in the future and save your delivery and
                    payment details. If you are an existing customer, you will be able to log in to your
                    account.
                </p>
                <div>
                    <p class="m-b-20x sanBold"><strong>METHOD OF PAYMENT</strong></p>
                    <p class="m-b-20x">
                        <strong class="sanBold">PayPal</strong> <br>We also accept Payal as a method of payment. If you select
                        this
                        option in the checkout, you will be redirected to PayPal
                        where you can either create an
                        account
                        or login to an existing account and arrange payment of your
                        order. You will be redirected to
                        the
                        website once your order is received.
                    </p>
                    <p class="m-b-20x">
                        <strong class="sanBold">Credit card</strong> <br>
                        We accept the following cards for payment of pur chases made online<img class="m-x-10x"
                                                                                                src="{{config('runtime.Image_URL')}}/images/payment/cards.png"
                                                                                                alt="">
                        Payment will be taken from your
                        credit or debit card as soon as you have placed your order. To ensure safe shopping, we are
                        GoDaddy SSL certified which will automatically creates an en crypted connec
                        tion with customer’s browser and protect all the sensitive information. 
                    </p>
                    <p class="m-b-20x">
                        <strong class="sanBold">Coupon Code:</strong> <br>
                        Please fill in the Coupon Code you have in the box
                        while
                        making payment.
                    </p>
                    <p class="m-b-20x"><strong class="sanBold">Declined PayPal Transactions</strong></p>
                    <p class="m-b-20x">
                        There are several reasons your payment may have been declined by PayPal:
                    </p>
                    <p class="m-b-20x p-l-15x">
                        1) Suspicion of fraud or incorrect billing information<br>
                        2) Invalid credit card or account linked to PayPal (or none linked)<br>
                        3) Insufficient funds
                    </p>
                    <p class="m-b-20x">
                        For more information, please log in to your PayPal account, or contact PayPal Customer
                        Support.
                    </p>
                    <p class="m-b-0x">If you are experiencing difficulties with your payment or order please
                        contact
                        our Customer Service Team via Live Chat or email <a href="mailto:service@motif.me"
                                                                            class="text-underLine">service@motif.me</a>.
                    </p>
                </div>
            </div>
        </div>

    </div>
</div>

@include('footer')