@include('header')

<!-- 内容 -->
<section class="m-y-40x">
    <div class="container">
        <div class="myHome-content">
            @include('user.left', ['title' => 'promotions'])

            <div class="right">
                <div class="rightContent">
                    <!-- Promotions -->
                    <div class="box-shadow bg-white promotion-content">
                        <!--新增促销码-->
                        <div class="p-a-20x addPromotionCode disabled">
                            <a href="#" class="goback-toAdd"><i class="iconfont icon-arrow-left font-size-lg p-r-10x"></i></a>
                            <div class="empty-content">
                                <i class="iconfont icon-ticket"></i>
                                <p class="helveBold font-size-llxx m-t-40x">Add New Promotions</p>
                                    <span class="addCode-input m-t-40x">
                                        <input type="text" class="form-control contrlo-lg text-primary" placeholder="Enter Your Promotions Code Here">
                                    </span>
                                <div class="text-center m-t-30x">
                                    <a href="javascript:void(0)"
                                       class="btn btn-primary btn-lg btn-200 profile-save">Apply</a>
                                </div>
                            </div>
                        </div>

                        <!-- Coupons and Promotions-->
                        <div class="p-a-20x showPromotionCode">
                            <div class="flex flex-alignCenter flex-fullJustified">
                                <span class="font-size-md sanBold">Coupons and Promotions</span>
                                    <span class="font-size-md pull-right">
                                        <a class="btn btn-secondary btn-md btn-addNewCode" href="#"><i class="iconfont icon-add font-size-md p-r-5x"></i>Add New Promotion Code</a>
                                    </span>
                            </div>
                            <div class="row p-x-10x p-t-20x">
                                <div class="col-md-6">
                                    <div class="m-a-10x">
                                        <div class="row promotion-item">
                                            <div class="col-md-8">
                                                <div class="p-t-20x text-right">
                                                    <div class="helveBold font-size-sm">10% Off For Your First
                                                        Orde
                                                    </div>
                                                    <span class="font-size-sm">Expire: Jul 31, 2016</span>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="p-left">
                                                    <span class="helveBold">10%</span>
                                                    <div class="font-size-lx helveBold">OFF</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="m-a-10x">
                                        <div class="row promotion-item">
                                            <div class="col-md-8">
                                                <div class="p-t-20x text-right">
                                                    <div class="helveBold font-size-sm">10% Off For Your First
                                                        Orde
                                                    </div>
                                                    <span class="font-size-sm">Expire: Jul 31, 2016</span>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="p-left">
                                                    <span class="helveBold">10%</span>
                                                    <div class="font-size-lx helveBold">OFF</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="m-a-10x">
                                        <div class="row promotion-item">
                                            <div class="col-md-8">
                                                <div class="p-t-20x text-right">
                                                    <div class="helveBold font-size-sm">10% Off For Your First
                                                        Orde
                                                    </div>
                                                    <span class="font-size-sm">Expire: Jul 31, 2016</span>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="p-left">
                                                    <span class="helveBold">10%</span>
                                                    <div class="font-size-lx helveBold">OFF</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

@include('footer')
